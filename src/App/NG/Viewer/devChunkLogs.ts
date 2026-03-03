// @ts-nocheck

const WORKER_HOOK_FLAG = '__octoWorkerChunkErrorAggregatorInstalled';
const WORKER_WRAPPER_FLAG = '__octoWorkerWrapperInstalled';
const CHUNK_LOG_FLAG = '__octoChunkLogAggregatorInstalled';

declare global {
  interface Window {
    [WORKER_HOOK_FLAG]?: boolean;
    [WORKER_WRAPPER_FLAG]?: boolean;
    [CHUNK_LOG_FLAG]?: boolean;
  }
}

function workerChunkHookSource(): string {
  const hookFn = function installWorkerChunkErrorAggregator(): void {
    const FLAG = '__octoWorkerChunkErrorAggregatorInstalled';
    if ((self as any)[FLAG]) {
      return;
    }
    (self as any)[FLAG] = true;

    const chunkPattern = /^Error retrieving chunk\s+([^:]+):\s*(.+)$/;
    const originalError = console.error ? console.error.bind(console) : null;
    const originalWarn = console.warn ? console.warn.bind(console) : null;
    const fallbackLogger = originalWarn || originalError || (console.log ? console.log.bind(console) : () => undefined);

    const state: {
      total: number;
      chunks: Map<string, number>;
      lastMessage: string | null;
      firstTimestamp: number | null;
      timer: ReturnType<typeof setTimeout> | null;
    } = {
      total: 0,
      chunks: new Map(),
      lastMessage: null,
      firstTimestamp: null,
      timer: null,
    };

    const normaliseArg = (arg: unknown): string => {
      if (typeof arg === 'string') return arg;
      if (arg && typeof (arg as any).message === 'string') return (arg as any).message as string;
      if (arg instanceof Error) return `${arg.name}: ${arg.message}`;
      try {
        return String(arg);
      } catch (_) {
        return '[object]';
      }
    };

    const flush = () => {
      state.timer = null;
      if (!state.total) return;

      const summaryEntries = Array.from(state.chunks.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id, count]) => `${id}x${count}`)
        .join(', ');

      const elapsed = state.firstTimestamp ? `${Math.round((Date.now() - state.firstTimestamp) / 1000)}s` : 'recent';
      const message = `[OctoEnhancements] Suppressed ${state.total} chunk errors (${state.chunks.size} ids over ${elapsed}).`
        + (summaryEntries ? ` Sample: ${summaryEntries}.` : '')
        + (state.lastMessage ? ` Last: ${state.lastMessage}` : '');

      fallbackLogger?.(message);
      state.total = 0;
      state.chunks.clear();
      state.lastMessage = null;
      state.firstTimestamp = null;
    };

    const scheduleFlush = () => {
      if (state.timer !== null) return;
      state.timer = setTimeout(flush, 1500);
    };

    const handleArgs = (args: unknown[]): boolean => {
      if (!args || !args.length) return false;
      let preview: string;
      try {
        preview = args.map(normaliseArg).join(' ');
      } catch (_) {
        preview = '';
      }

      const match = chunkPattern.exec(preview);
      if (!match) return false;

      const chunkId = match[1];
      state.total += 1;
      state.chunks.set(chunkId, (state.chunks.get(chunkId) || 0) + 1);
      state.lastMessage = match[2];
      if (!state.firstTimestamp) {
        state.firstTimestamp = Date.now();
      }
      scheduleFlush();
      return true;
    };

    const patch = (methodName: 'warn' | 'error', original: typeof console.error | null) => {
      if (!original) return;
      (console as any)[methodName] = function patchedConsoleMethod(...args: unknown[]) {
        if (handleArgs(args)) return;
        return original(...args as [unknown]);
      };
    };

    patch('error', originalError as any);
    patch('warn', originalWarn as any);

    if (typeof self.addEventListener === 'function') {
      const cleanup = () => flush();
      self.addEventListener('beforeunload', cleanup);
      self.addEventListener('unload', cleanup);
      (self as any).addEventListener?.('close', cleanup);
    }
  };

  return `(${hookFn.toString()})();\n`;
}

function createClassicChunkWorkerWrapperSource(originalUrl: string): string {
  const hookSource = workerChunkHookSource();
  return `${hookSource}importScripts(${JSON.stringify(originalUrl)});`;
}

function createModuleChunkWorkerWrapperSource(originalUrl: string): string {
  const hookSource = workerChunkHookSource();
  return `${hookSource}import(${JSON.stringify(originalUrl)});`;
}

export function installWorkerChunkWrapper(): void {
  if (typeof window === 'undefined') return;
  if (window[WORKER_WRAPPER_FLAG]) return;
  if (typeof Worker !== 'function') return;

  window[WORKER_WRAPPER_FLAG] = true;

  const OriginalWorker = Worker;

  const resolveScriptUrl = (input: string | URL): URL | null => {
    try {
      if (input instanceof URL) return input;
      if (typeof input === 'string') return new URL(input, document.baseURI);
    } catch (_) {
      return null;
    }
    return null;
  };

  const shouldWrap = (urlObj: URL | null): boolean => {
    if (!urlObj) return false;
    if (urlObj.protocol === 'blob:') return false;
    if (urlObj.origin !== window.location.origin) return false;
    if (!/\.js($|\?)/.test(urlObj.pathname)) return false;
    return true;
  };

  const WrappedWorker: typeof Worker = function WrappedWorker(scriptURL: string | URL, options?: WorkerOptions): Worker {
    const urlObj = resolveScriptUrl(scriptURL);
    const isModule = options && typeof options === 'object' && options.type === 'module';

    if (shouldWrap(urlObj)) {
      const wrapperSource = isModule
        ? createModuleChunkWorkerWrapperSource(urlObj.toString())
        : createClassicChunkWorkerWrapperSource(urlObj.toString());
      const blob = new Blob([wrapperSource], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      const worker = new OriginalWorker(blobUrl, options);
      setTimeout(() => {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch (_) {
          /* ignore */
        }
      }, 4000);
      return worker;
    }

    if (urlObj instanceof URL) {
      return new OriginalWorker(urlObj, options);
    }
    return new OriginalWorker(scriptURL as any, options);
  } as any;

  WrappedWorker.prototype = OriginalWorker.prototype;
  Object.setPrototypeOf(WrappedWorker, OriginalWorker);
  window.Worker = WrappedWorker;
}

export function installChunkLogAggregator(): void {
  if (typeof window === 'undefined') return;
  if (window[CHUNK_LOG_FLAG]) return;

  window[CHUNK_LOG_FLAG] = true;

  const chunkPattern = /^\s*Error retrieving chunk\s+([^:]+):\s*(.+)$/;
  const trackedMethods: Array<'log' | 'warn' | 'error'> = ['log', 'warn', 'error'];
  const originals = new Map<string, (...args: unknown[]) => void>();
  const state: {
    total: number;
    chunks: Map<string, number>;
    timer: ReturnType<typeof setTimeout> | null;
    lastMessage: string | null;
    firstTimestamp: number | null;
  } = {
    total: 0,
    chunks: new Map(),
    timer: null,
    lastMessage: null,
    firstTimestamp: null,
  };

  const reset = () => {
    state.total = 0;
    state.chunks.clear();
    state.lastMessage = null;
    state.firstTimestamp = null;
  };

  const flush = () => {
    state.timer = null;
    if (!state.total) return;

    const summary = Array.from(state.chunks.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id, count]) => `${id}x${count}`)
      .join(', ');

    const elapsed = state.firstTimestamp ? `${Math.round((Date.now() - state.firstTimestamp) / 1000)}s` : 'recent';
    const message = `[OctoEnhancements] Suppressed ${state.total} Neuroglancer chunk errors (${state.chunks.size} ids over ${elapsed}).`
      + (summary ? ` Sample: ${summary}.` : '')
      + (state.lastMessage ? ` Last: ${state.lastMessage}` : '');

    const originalWarn = originals.get('warn') || console.warn;
    originalWarn.call(console, message);
    reset();
  };

  const scheduleFlush = () => {
    if (state.timer) return;
    state.timer = setTimeout(flush, 1500);
  };

  const stringifyArg = (arg: unknown): string => {
    if (typeof arg === 'string') return arg;
    if (arg instanceof Error) return `${arg.name || 'Error'}: ${arg.message}`;
    if (arg && typeof (arg as any).toString === 'function' && (arg as any).toString !== Object.prototype.toString) {
      try {
        return String((arg as any).toString());
      } catch (_) {
        /* ignore */
      }
    }
    try {
      return JSON.stringify(arg);
    } catch (_) {
      return String(arg);
    }
  };

  const handleArgs = (args: unknown[]): boolean => {
    if (!args.length) return false;
    const preview = args.map(stringifyArg).join(' ');
    const match = chunkPattern.exec(preview);
    if (!match) return false;

    const chunkId = match[1];
    const message = match[2];
    state.total += 1;
    state.lastMessage = message;
    state.firstTimestamp = state.firstTimestamp || Date.now();
    state.chunks.set(chunkId, (state.chunks.get(chunkId) || 0) + 1);
    scheduleFlush();
    return true;
  };

  const consoleProto = Object.getPrototypeOf(console) as Console;

  trackedMethods.forEach((method) => {
    const existing = (console as any)[method];
    if (typeof existing === 'function') {
      const original = existing.bind(console);
      originals.set(method, original);
      (console as any)[method] = function patchedConsoleMethod(...args: unknown[]) {
        if (handleArgs(args)) return;
        return original(...args);
      };
      (console as any)[method].toString = original.toString.bind(original);
      (console as any)[method].__original = original;
    }

    if (consoleProto && typeof (consoleProto as any)[method] === 'function' && !(consoleProto as any)[method].__octoPatched) {
      const protoOriginal = (consoleProto as any)[method];
      (consoleProto as any)[method] = function patchedConsoleProtoMethod(this: Console, ...args: unknown[]) {
        if (handleArgs(args)) return;
        return protoOriginal.apply(this, args);
      };
      (consoleProto as any)[method].__octoPatched = true;
    }
  });

  try {
    (originals.get('info') || console.info)?.call(console, '[OctoEnhancements] Chunk error aggregation active.');
  } catch (_) {
    /* ignore */
  }

  const finalFlush = () => {
    if (state.timer) {
      clearTimeout(state.timer);
      state.timer = null;
    }
    flush();
  };

  window.addEventListener('beforeunload', finalFlush, { once: true });
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') {
        finalFlush();
      }
    },
    { capture: true }
  );
}

export function installDevChunkLogging(): void {
  installWorkerChunkWrapper();
  installChunkLogAggregator();
}
