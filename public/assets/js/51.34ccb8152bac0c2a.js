"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  (globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || []).push([["51"], { 5898: function(e, t, r) {
    r.d(t, { LD: () => n, Wd: () => i, Yn: () => o, yP: () => s });
    let s = "CredentialsProvider", n = "CredentialsProvider.get", o = "CredentialsManager", i = "CredentialsManager.get";
  }, 5675: function(e, t, r) {
    r.d(t, { Yz: () => n, i6: () => o });
    class s {
      constructor() {
        __publicField(this, "baseUrl");
        __publicField(this, "collection");
        __publicField(this, "experiment");
        __publicField(this, "channel");
        __publicField(this, "resolution");
      }
    }
    class n extends s {
      constructor() {
        super(...arguments);
        __publicField(this, "encoding");
        __publicField(this, "window");
      }
      static stringify(e2) {
        return `boss:volume:${e2.baseUrl}/${e2.collection}/${e2.experiment}/${e2.channel}/${e2.resolution}/${e2.encoding}`;
      }
    }
    __publicField(n, "RPC_ID", "boss/VolumeChunkSource");
    class o {
      constructor() {
        __publicField(this, "baseUrl");
      }
      static stringify(e2) {
        return `boss:mesh:${e2.baseUrl}`;
      }
    }
    __publicField(o, "RPC_ID", "boss/MeshChunkSource");
  }, 3488: function(e, t, r) {
    r.d(t, { Jb: () => u, LV: () => o, WM: () => c, f5: () => i, i6: () => a, ke: () => n, zT: () => l });
    var s, n = ((s = {})[s.RAW = 0] = "RAW", s[s.JPEG = 1] = "JPEG", s[s.COMPRESSED_SEGMENTATION = 2] = "COMPRESSED_SEGMENTATION", s);
    class o {
      constructor() {
        __publicField(this, "instance");
        __publicField(this, "volumeId");
        __publicField(this, "scaleIndex");
        __publicField(this, "encoding");
        __publicField(this, "jpegQuality");
        __publicField(this, "changeSpec");
      }
    }
    __publicField(o, "RPC_ID", "brainmaps/VolumeChunkSource");
    class i {
      constructor() {
        __publicField(this, "instance");
        __publicField(this, "volumeId");
        __publicField(this, "info");
        __publicField(this, "changeSpec");
      }
    }
    __publicField(i, "RPC_ID", "brainmaps/MultiscaleMeshSource");
    class a {
      constructor() {
        __publicField(this, "instance");
        __publicField(this, "volumeId");
        __publicField(this, "meshName");
        __publicField(this, "changeSpec");
      }
    }
    __publicField(a, "RPC_ID", "brainmaps/MeshSource");
    class l {
      constructor() {
        __publicField(this, "instance");
        __publicField(this, "volumeId");
        __publicField(this, "meshName");
        __publicField(this, "changeSpec");
      }
    }
    __publicField(l, "RPC_ID", "brainmaps/SkeletonSource");
    class u {
      constructor() {
        __publicField(this, "instance");
        __publicField(this, "volumeId");
        __publicField(this, "changestack");
        __publicField(this, "upperVoxelBound");
      }
    }
    __publicField(u, "RPC_ID", "brainmaps/Annotation");
    class c {
      constructor() {
        __publicField(this, "instance");
        __publicField(this, "volumeId");
        __publicField(this, "changestack");
      }
    }
    __publicField(c, "RPC_ID", "brainmaps/AnnotationSpatialIndex");
  }, 7484: function(e, t, r) {
    r.d(t, { W: () => n, j: () => o });
    var s, n = ((s = {})[s.JPG = 0] = "JPG", s[s.JPEG = 1] = "JPEG", s[s.PNG = 2] = "PNG", s);
    class o {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "encoding");
        __publicField(this, "format");
        __publicField(this, "tilesize");
        __publicField(this, "overlap");
      }
    }
    __publicField(o, "RPC_ID", "deepzoom/ImageTileSource");
  }, 2600: function(e, t, r) {
    r.d(t, { Yz: () => i, i6: () => l, ke: () => n, zT: () => a });
    var s, n = ((s = {})[s.JPEG = 0] = "JPEG", s[s.RAW = 1] = "RAW", s[s.COMPRESSED_SEGMENTATION = 2] = "COMPRESSED_SEGMENTATION", s[s.COMPRESSED_SEGMENTATIONARRAY = 3] = "COMPRESSED_SEGMENTATIONARRAY", s);
    class o {
      constructor() {
        __publicField(this, "baseUrl");
        __publicField(this, "nodeKey");
        __publicField(this, "dataInstanceKey");
        __publicField(this, "authServer");
        __publicField(this, "user");
      }
    }
    class i extends o {
      constructor() {
        super(...arguments);
        __publicField(this, "dataScale");
        __publicField(this, "encoding");
      }
    }
    __publicField(i, "RPC_ID", "dvid/VolumeChunkSource");
    class a extends o {
    }
    __publicField(a, "RPC_ID", "dvid/SkeletonSource");
    class l extends o {
    }
    __publicField(l, "RPC_ID", "dvid/MeshSource");
  }, 835: function(e, t, r) {
    r.d(t, { Y: () => o, k: () => n });
    var s, n = ((s = {})[s.RAW = 0] = "RAW", s[s.ZLIB = 1] = "ZLIB", s[s.GZIP = 2] = "GZIP", s[s.BLOSC = 3] = "BLOSC", s[s.ZSTD = 4] = "ZSTD", s);
    class o {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "encoding");
      }
    }
    __publicField(o, "RPC_ID", "n5/VolumeChunkSource");
  }, 2147: function(e, t, r) {
    r.d(t, { L: () => n, _: () => s });
    let s = "nifti/getNiftiVolumeInfo";
    class n {
      constructor() {
        __publicField(this, "url");
      }
    }
    __publicField(n, "RPC_ID", "nifti/VolumeChunkSource");
  }, 602: function(e, t, r) {
    r.d(t, { Jb: () => p, WM: () => d, Yz: () => a, f5: () => h, i6: () => l, ke: () => i, qm: () => u, wC: () => c, zT: () => f });
    var s, n, o, i = ((s = {})[s.RAW = 0] = "RAW", s[s.JPEG = 1] = "JPEG", s[s.COMPRESSED_SEGMENTATION = 2] = "COMPRESSED_SEGMENTATION", s[s.COMPRESSO = 3] = "COMPRESSO", s[s.PNG = 4] = "PNG", s[s.JXL = 5] = "JXL", s);
    class a {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "encoding");
        __publicField(this, "sharding");
      }
    }
    __publicField(a, "RPC_ID", "precomputed/VolumeChunkSource");
    class l {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "lod");
      }
    }
    __publicField(l, "RPC_ID", "precomputed/MeshSource");
    var u = ((n = {})[n.RAW = 0] = "RAW", n[n.GZIP = 1] = "GZIP", n), c = ((o = {})[o.IDENTITY = 0] = "IDENTITY", o[o.MURMURHASH3_X86_128 = 1] = "MURMURHASH3_X86_128", o);
    class h {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "metadata");
      }
    }
    __publicField(h, "RPC_ID", "precomputed/MultiscaleMeshSource");
    class f {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "metadata");
      }
    }
    __publicField(f, "RPC_ID", "precomputed/SkeletonSource");
    class d {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "sharding");
      }
    }
    __publicField(d, "RPC_ID", "precomputed/AnnotationSpatialIndexSource");
    class p {
      constructor() {
        __publicField(this, "rank");
        __publicField(this, "relationships");
        __publicField(this, "properties");
        __publicField(this, "byId");
        __publicField(this, "type");
      }
    }
    __publicField(p, "RPC_ID", "precomputed/AnnotationSource");
  }, 3074: function(e, t, r) {
    r.d(t, { xd: () => o });
    class s {
      constructor() {
        __publicField(this, "baseUrl");
        __publicField(this, "owner");
        __publicField(this, "project");
        __publicField(this, "stack");
        __publicField(this, "channel");
      }
    }
    class n extends s {
      constructor() {
        super(...arguments);
        __publicField(this, "minIntensity");
        __publicField(this, "maxIntensity");
        __publicField(this, "maxTileSpecsToRender");
        __publicField(this, "filter");
      }
    }
    class o extends n {
      constructor() {
        super(...arguments);
        __publicField(this, "dims");
        __publicField(this, "level");
        __publicField(this, "encoding");
      }
    }
    __publicField(o, "RPC_ID", "render/TileChunkSource");
  }, 6758: function(e, t, r) {
    r.d(t, { Y: () => s });
    class s {
      constructor() {
        __publicField(this, "url");
        __publicField(this, "metadata");
      }
    }
    __publicField(s, "RPC_ID", "zarr/VolumeChunkSource");
  }, 6363: function(e, t, r) {
    r.d(t, { i: () => n });
    var s, n = ((s = {})[s.arrayToArray = 0] = "arrayToArray", s[s.arrayToBytes = 1] = "arrayToBytes", s[s.bytesToBytes = 2] = "bytesToBytes", s);
  }, 6252: function(e, t, r) {
    r.d(t, { $: () => n });
    var s, n = ((s = {})[s.DEFAULT = 0] = "DEFAULT", s[s.V2 = 1] = "V2", s);
  }, 1425: function(e, t, r) {
    r.d(t, { B: () => s });
    function s(e2, t2) {
      return t2 >>>= 0, e2 >>>= 0, e2 = 5 * (e2 = ((e2 = (e2 ^ (t2 = Math.imul(t2 = ((t2 = Math.imul(t2, 3432918353) >>> 0) << 15 | t2 >>> 17) >>> 0, 461845907) >>> 0)) >>> 0) << 13 | e2 >>> 19) >>> 0) + 3864292196 >>> 0;
    }
  }, 7439: function(e, t, r) {
    var s = r(4758);
    function n(e2) {
      let t2 = e2.match(/^([0-9]+)-([0-9]+)$/);
      if (null !== t2) {
        let e3 = Number(t2[1]), r2 = Number(t2[2]);
        if (r2 >= e3) return { offset: e3, length: r2 - e3 };
      }
      throw Error(`Invalid key ${JSON.stringify(e2)} for "byte-range:", expected "<begin>-<end>"`);
    }
    class o {
      constructor(e2) {
        __publicField(this, "base");
        this.base = e2;
      }
      getUrl(e2) {
        return this.base.getUrl() + `|byte-range:${e2}`;
      }
      async stat(e2, t2) {
        let { length: r2 } = n(e2);
        return { totalSize: r2 };
      }
      async read(e2, t2) {
        let r2 = n(e2);
        return new s.uX(this.base, r2).read(t2);
      }
      get supportsOffsetReads() {
        return true;
      }
      get supportsSuffixReads() {
        return true;
      }
      get singleKey() {
        return true;
      }
    }
    var i = r(6985), a = r(9858), l = r(6923);
    a.u.registerKvStoreAdapterProvider(function() {
      return { scheme: "byte-range", description: "byte range slicing", getKvStore: (e2, t2) => ((0, l.uh)(e2), { store: new o(new i.f2(t2.store, t2.path)), path: e2.suffix ?? "" }) };
    });
  }, 8580: function(e, t, r) {
    r.d(t, { e: () => i });
    var s = r(4881), n = r(6985), o = r(6923);
    class i {
      constructor() {
        __publicField(this, "baseKvStoreProviders", /* @__PURE__ */ new Map());
        __publicField(this, "kvStoreAdapterProviders", /* @__PURE__ */ new Map());
        __publicField(this, "autoDetectRegistry", new s._E());
      }
      getKvStore(e2) {
        let t2;
        let r2 = (0, o.pN)(e2);
        {
          let e3 = r2[0];
          t2 = this.getBaseKvStoreProvider(e3).getKvStore(e3);
        }
        for (let e3 = 1; e3 < r2.length; ++e3) t2 = this.applyKvStoreAdapterUrl(t2, r2[e3]);
        return t2;
      }
      getFileHandle(e2) {
        let { store: t2, path: r2 } = this.getKvStore(e2);
        return new n.f2(t2, r2);
      }
      getBaseKvStoreProvider(e2) {
        let t2 = this.baseKvStoreProviders.get(e2.scheme);
        if (void 0 === t2) {
          let t3 = this.describeProtocolUsage(e2.scheme), r2 = `Invalid base kvstore protocol "${e2.scheme}:"`;
          throw void 0 !== t3 && (r2 += `; ${t3}`), Error(r2);
        }
        return t2;
      }
      getKvStoreAdapterProvider(e2) {
        let t2 = this.kvStoreAdapterProviders.get(e2.scheme);
        if (void 0 === t2) {
          let t3 = this.describeProtocolUsage(e2.scheme), r2 = `Invalid kvstore adapter protocol "${e2.scheme}:"`;
          throw void 0 !== t3 && (r2 += `; ${t3}`), Error(r2 += `; supported schemes: ${JSON.stringify(Array.from(this.kvStoreAdapterProviders.keys()))}`);
        }
        return t2;
      }
      applyKvStoreAdapterUrl(e2, t2) {
        return this.getKvStoreAdapterProvider(t2).getKvStore(t2, e2);
      }
      describeProtocolUsage(e2) {
        return this.baseKvStoreProviders.has(e2) ? `"${e2}:" may only be used as a base kvstore protocol` : this.kvStoreAdapterProviders.has(e2) ? `"${e2}:" may only be used as a kvstore adapter protocol` : void 0;
      }
      stat(e2, t2 = {}) {
        let r2 = this.getKvStore(e2);
        return r2.store.stat(r2.path, t2);
      }
      read(e2, t2 = {}) {
        let r2 = this.getKvStore(e2);
        return (0, n.BF)(r2.store, r2.path, t2);
      }
      list(e2, t2 = {}) {
        let r2 = this.getKvStore(e2);
        return (0, n.RQ)(r2.store, r2.path, t2);
      }
      resolveRelativePath(e2, t2) {
        let r2 = this.getKvStore(e2);
        return r2.store.getUrl((0, o.i1)(r2.path, t2));
      }
    }
  }, 6594: function(e, t, r) {
    r.d(t, { J: () => c });
    var s = r(119), n = r(6923), o = r(2258), i = r(290), a = r(7734), l = r(6224);
    function u(e2) {
      var t2 = "function" == typeof SuppressedError ? SuppressedError : function(e3, t3, r2) {
        var s2 = Error(r2);
        return s2.name = "SuppressedError", s2.error = e3, s2.suppressed = t3, s2;
      };
      return (u = function(e3) {
        function r2(r3) {
          e3.error = e3.hasError ? new t2(r3, e3.error, "An error was suppressed during disposal.") : r3, e3.hasError = true;
        }
        var s2, n2 = 0;
        return function t3() {
          for (; s2 = e3.stack.pop(); ) try {
            if (!s2.async && 1 === n2) return n2 = 0, e3.stack.push(s2), Promise.resolve().then(t3);
            if (s2.dispose) {
              var o2 = s2.dispose.call(s2.value);
              if (s2.async) return n2 |= 2, Promise.resolve(o2).then(t3, function(e4) {
                return r2(e4), t3();
              });
            } else n2 |= 1;
          } catch (e4) {
            r2(e4);
          }
          if (1 === n2) return e3.hasError ? Promise.reject(e3.error) : Promise.resolve();
          if (e3.hasError) throw e3.error;
        }();
      })(e2);
    }
    class c {
      constructor(e2, t2 = `gs://${e2}/`, r2 = o.ru) {
        __publicField(this, "bucket");
        __publicField(this, "baseUrlForDisplay");
        __publicField(this, "fetchOkImpl");
        this.bucket = e2, this.baseUrlForDisplay = t2, this.fetchOkImpl = r2;
      }
      getObjectUrl(e2) {
        return `https://storage.googleapis.com/storage/v1/b/${this.bucket}/o/${encodeURIComponent(e2)}?alt=media&neuroglancer=${(0, l.c0)()}`;
      }
      stat(e2, t2) {
        return (0, s.l)(this, e2, this.getObjectUrl(e2), t2, this.fetchOkImpl);
      }
      read(e2, t2) {
        return (0, s.i)(this, e2, this.getObjectUrl(e2), t2, this.fetchOkImpl);
      }
      async list(e2, t2) {
        let r2 = { stack: [], error: void 0, hasError: false };
        try {
          let { progressListener: s2 } = t2;
          !function(e3, t3, r3) {
            if (null != t3) {
              var s3, n3;
              if ("object" != typeof t3 && "function" != typeof t3) throw TypeError("Object expected.");
              if (r3) {
                if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
                s3 = t3[Symbol.asyncDispose];
              }
              if (void 0 === s3) {
                if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
                s3 = t3[Symbol.dispose], r3 && (n3 = s3);
              }
              if ("function" != typeof s3) throw TypeError("Object not disposable.");
              n3 && (s3 = function() {
                try {
                  n3.call(this);
                } catch (e4) {
                  return Promise.reject(e4);
                }
              }), e3.stack.push({ value: t3, dispose: s3, async: r3 });
            } else r3 && e3.stack.push({ async: true });
          }(r2, void 0 === s2 ? void 0 : new a.Vi(s2, { message: `Listing prefix ${this.getUrl(e2)}` }), false);
          let n2 = await this.fetchOkImpl(`https://storage.googleapis.com/storage/v1/b/${this.bucket}/o?delimiter=${encodeURIComponent("/")}&prefix=${encodeURIComponent(e2)}&neuroglancerOrigin=${encodeURIComponent(location.origin)}`, { signal: t2.signal, progressListener: t2.progressListener }), o2 = await n2.json();
          (0, i.PT)(o2);
          let l2 = (0, i.Kh)(o2, "prefixes", i.zE, []).map((e3) => e3.substring(0, e3.length - 1)), u2 = (0, i.Kh)(o2, "items", (e3) => (0, i.m7)(e3, (e4) => ((0, i.PT)(e4), (0, i.uq)(e4, "name", i.ZE))), []).filter((e3) => !e3.endsWith("_$folder$")).map((e3) => ({ key: e3 }));
          return { directories: l2, entries: u2 };
        } catch (e3) {
          r2.error = e3, r2.hasError = true;
        } finally {
          u(r2);
        }
      }
      getUrl(e2) {
        return this.baseUrlForDisplay + (0, n.aU)(e2);
      }
      get supportsOffsetReads() {
        return true;
      }
      get supportsSuffixReads() {
        return true;
      }
    }
  }, 2298: function(e, t, r) {
    var s = r(9739), n = r(6594);
    r(9858).u.registerBaseKvStoreProvider(function(e2) {
      return { scheme: "gs", description: s.Z ? "Google Cloud Storage" : "Google Cloud Storage (anonymous)", getKvStore(e3) {
        let t2 = (e3.suffix ?? "").match(/^\/\/([^/]+)(\/.*)?$/);
        if (null === t2) throw Error("Invalid URL, expected `gs://<bucket>/<path>`");
        let [, r2, s2] = t2;
        return { store: new n.J(r2), path: decodeURIComponent((s2 ?? "").substring(1)) };
      } };
    });
  }, 4634: function(e, t, r) {
    r.d(t, { Ll: () => n });
    var s = r(2136);
    class n {
      constructor(e2, t2) {
        __publicField(this, "base");
        __publicField(this, "format");
        this.base = e2, this.format = t2;
      }
      async stat(e2) {
        return await this.base.stat(e2), { totalSize: void 0 };
      }
      async read(e2) {
        let { byteRange: t2 } = e2;
        if (void 0 === t2) {
          let t3 = await this.base.read(e2);
          if (void 0 === t3) return;
          return { response: new Response((0, s.Nk)(t3.response, this.format)), offset: 0, length: void 0, totalSize: void 0 };
        }
        if ("suffixLength" in t2 || 0 !== t2.offset) throw Error(`Byte range with offset not supported: ${JSON.stringify(t2)}`);
        let r2 = new Uint8Array(t2.length), n2 = [], o = 0, i = t2.length + 100;
        for (; ; ) {
          let t3 = await this.base.read({ ...e2, byteRange: { offset: o, length: i - o } });
          if (void 0 === t3) return;
          {
            let e3 = new Uint8Array(await t3.response.arrayBuffer());
            n2.push(e3), o += e3.length;
          }
          let s2 = new DecompressionStream("gzip"), a = s2.writable.getWriter(), l = [];
          for (let e3 of n2) l.push(a.write(e3));
          l.push(a.close());
          let u = s2.readable.getReader(), c = 0;
          try {
            for (; c < r2.length; ) {
              let { value: e3 } = await u.read();
              if (void 0 === e3) break;
              let t4 = r2.length - c;
              e3.length > t4 && (e3 = e3.subarray(0, t4)), r2.set(e3, c), c += e3.length;
            }
            if (c === r2.length || o === t3.totalSize) return c < r2.length && (r2 = r2.subarray(0, c)), { response: new Response(r2), offset: 0, length: r2.length, totalSize: void 0 };
          } finally {
            await u.cancel(), await Promise.allSettled(l);
          }
          i += Math.min(100, r2.length - c);
        }
      }
      getUrl() {
        return this.base.getUrl() + "|gzip";
      }
    }
  }, 8679: function(e, t, r) {
    var s = r(4634), n = r(2136);
    class o {
      constructor(e2, t2, r2) {
        __publicField(this, "base");
        __publicField(this, "scheme");
        __publicField(this, "format");
        this.base = e2, this.scheme = t2, this.format = r2;
      }
      getUrl(e2) {
        return this.validatePath(e2), this.base.getUrl() + `|${this.scheme}`;
      }
      validatePath(e2) {
        if (e2) throw Error(`"${this.scheme}:" does not support non-empty path ${JSON.stringify(e2)}`);
      }
      async stat(e2, t2) {
        return this.validatePath(e2), await this.base.stat(t2), { totalSize: void 0 };
      }
      async read(e2, t2) {
        return this.validatePath(e2), new s.Ll(this.base, this.format).read(t2);
      }
      get supportsOffsetReads() {
        return false;
      }
      get supportsSuffixReads() {
        return false;
      }
      get singleKey() {
        return true;
      }
    }
    async function i(e2) {
      return (0, n.fK)(e2.prefix) ? [{ suffix: "gzip:", description: "gzip-compressed" }] : [];
    }
    var a = r(6985), l = r(9858), u = r(6923);
    l.u.registerKvStoreAdapterProvider(() => {
      var e2, t2;
      return t2 = "gzip", { scheme: e2 = "gzip", description: `transparent ${e2} decoding`, getKvStore: (r2, s2) => ((0, u.zY)(r2), { store: new o(new a.f2(s2.store, s2.path), e2, t2), path: "" }) };
    }), function(e2) {
      e2.registerFileFormat({ prefixLength: 3, suffixLength: 0, match: i });
    }(l.u.autoDetectRegistry);
  }, 3078: function(e, t, r) {
    r.d(t, { X: () => a, Z: () => i });
    var s = r(119), n = r(6923), o = r(2258);
    class i {
      constructor(e2, t2, r2 = t2, s2 = o.ru) {
        __publicField(this, "sharedKvStoreContext");
        __publicField(this, "baseUrl");
        __publicField(this, "baseUrlForDisplay");
        __publicField(this, "fetchOkImpl");
        this.sharedKvStoreContext = e2, this.baseUrl = t2, this.baseUrlForDisplay = r2, this.fetchOkImpl = s2;
      }
      stat(e2, t2) {
        return (0, s.l)(this, e2, (0, n.Lj)(this.baseUrl, e2), t2, this.fetchOkImpl);
      }
      read(e2, t2) {
        return (0, s.i)(this, e2, (0, n.Lj)(this.baseUrl, e2), t2, this.fetchOkImpl);
      }
      getUrl(e2) {
        return (0, n.Lj)(this.baseUrlForDisplay, e2);
      }
      get supportsOffsetReads() {
        return true;
      }
      get supportsSuffixReads() {
        return true;
      }
    }
    function a(e2, t2) {
      for (let r2 of ["http", "https"]) e2.registerBaseKvStoreProvider((e3) => function(e4, t3, r3) {
        return { scheme: e4, description: `${e4} (unauthenticated)`, getKvStore(e5) {
          try {
            let { baseUrl: s2, path: o2 } = (0, n.f0)(e5.url);
            return { store: new r3(t3, s2), path: o2 };
          } catch (t4) {
            throw Error(`Invalid URL ${JSON.stringify(e5.url)}`, { cause: t4 });
          }
        } };
      }(r2, e3, t2));
    }
  }, 119: function(e, t, r) {
    r.d(t, { i: () => c, l: () => d });
    var s = r(4758), n = r(6985), o = r(2258);
    function i(e2) {
      if (void 0 !== e2) return `bytes=${e2.offset}-${e2.offset + e2.length - 1}`;
    }
    let a = -1 !== navigator.userAgent.indexOf("Chrome") ? "no-store" : "default";
    function l(e2, t2) {
      return new URL(e2).pathname + "/" === new URL(t2.url).pathname;
    }
    function u(e2) {
      let t2;
      let r2 = e2.match(/bytes ([0-9]+)-([0-9]+)\/([0-9]+|\*)/);
      if (null === r2) throw Error(`Invalid content-range header: ${JSON.stringify(e2)}`);
      let s2 = parseInt(r2[1], 10), n2 = parseInt(r2[2], 10);
      return "*" !== r2[3] && (t2 = parseInt(r2[3], 10)), { offset: s2, length: n2 - s2 + 1, totalSize: t2 };
    }
    async function c(e2, t2, r2, n2, p = o.ru) {
      let g;
      try {
        let o2, c2, f2, v;
        let { byteRange: m } = n2;
        if (void 0 !== m) {
          if ("suffixLength" in m) {
            let a2 = await d(e2, t2, r2, n2, p);
            if (void 0 === a2) return;
            let { totalSize: l2 } = a2;
            if (void 0 === l2) throw Error(`Failed to determine total size of ${e2.getUrl(t2)} in order to fetch suffix ${JSON.stringify(m)}`);
            if (g = (0, s.z2)({ offset: 0, length: l2 }, m).outer, 0 === g.length) return { ...g, totalSize: l2, response: new Response(new Uint8Array(0)) };
            o2 = i(g);
          } else g = m, o2 = 0 === g.length ? i({ offset: Math.max(g.offset - 1, 0), length: 1 }) : i(g);
        }
        let S = { signal: n2.signal, progressListener: n2.progressListener };
        void 0 !== o2 && (S.headers = { range: o2 }, S.cache = a);
        let y = await p(r2, S);
        if (l(r2, y)) return;
        if (206 === y.status) {
          let e3 = y.headers.get("content-range");
          if (null === e3) {
            if (void 0 !== g) c2 = g.offset;
            else throw Error("Unexpected HTTP 206 response when no byte range specified.");
          }
          null !== e3 && ({ offset: c2, length: f2, totalSize: v } = u(e3));
        } else f2 = v = h(y.headers);
        return void 0 === c2 && (c2 = 0), void 0 === f2 && (f2 = h(y.headers)), g?.length === 0 && (y = new Response(new Uint8Array(0)), c2 = g.offset, f2 = 0), { response: y, offset: c2, length: f2, totalSize: v };
      } catch (r3) {
        if (r3 instanceof o.oo && 416 === r3.status && g?.length === 0 && 0 === g.offset) return { response: new Response(new Uint8Array(0)), offset: 0, length: 0, totalSize: 0 };
        return f(e2, t2, n2, r3);
      }
    }
    function h(e2) {
      let t2 = e2.get("content-length");
      if (null === e2.get("content-encoding") && null !== t2) {
        let e3 = Number(t2);
        if (!Number.isFinite(e3) || e3 < 0) throw Error("Invalid content-length: {contentLength}");
        return e3;
      }
    }
    function f(e2, t2, r2, s2) {
      if ((0, o.XD)(s2)) {
        if (true === r2.throwIfMissing) throw new n.dR(new n.f2(e2, t2), { cause: s2 });
        return;
      }
      throw s2;
    }
    async function d(e2, t2, r2, s2, n2 = o.ru) {
      try {
        let e3 = await n2(r2, { method: "HEAD", signal: s2.signal, progressListener: s2.progressListener });
        if (l(r2, e3)) return;
        return { totalSize: h(e3.headers) };
      } catch (r3) {
        if (!(r3 instanceof o.oo) || 405 !== r3.status && 501 !== r3.status) return f(e2, t2, s2, r3);
      }
      try {
        let e3;
        let t3 = await n2(r2, { signal: s2.signal, progressListener: s2.progressListener, headers: { range: "bytes=0-0" } });
        if (l(r2, t3)) return;
        if (200 === t3.status) e3 = h(t3.headers);
        else {
          let r3 = t3.headers.get("content-range");
          null !== r3 && ({ totalSize: e3 } = u(r3));
        }
        return { totalSize: e3 };
      } catch (r3) {
        if (r3 instanceof o.oo && 416 === r3.status) return { totalSize: 0 };
        return f(e2, t2, s2, r3);
      }
    }
  }, 5139: function(e, t, r) {
    r.d(t, { X: () => i });
    var s = r(7399), n = r(6923);
    let o = "middleauth+";
    function i(e2, t2) {
      for (let r2 of ["https"]) e2.registerBaseKvStoreProvider((e3) => function(e4, t3, r3) {
        return { scheme: o + e4, description: `${e4} with middleauth`, getKvStore(e5) {
          let i2 = e5.url.substring(o.length), a = t3.credentialsManager.getCredentialsProvider("middleauthapp", new URL(i2).origin);
          try {
            let { baseUrl: e6, path: l } = (0, n.f0)(i2);
            return { store: new r3(t3, e6, o + e6, (0, s.d)(a)), path: l };
          } catch (t4) {
            throw Error(`Invalid URL ${JSON.stringify(e5.url)}`, { cause: t4 });
          }
        } };
      }(r2, e3, t2));
    }
  }, 8366: function(e, t, r) {
    var s = r(9739), n = r(7399), o = r(6594), i = r(9858);
    let a = "gs+ngauth+";
    for (let e2 of ["http", "https"]) i.u.registerBaseKvStoreProvider((t2) => function(e3, t3) {
      return { scheme: e3, description: s.Z ? "Google Cloud Storage" : "Google Cloud Storage (ngauth)", getKvStore(e4) {
        var r2;
        let i2 = (e4.suffix ?? "").match(/^\/\/([^/]+)\/([^/]+)(\/.*)?$/);
        if (null === i2) throw Error(`Invalid URL, expected ${e4.scheme}://<ngauth-server>/<bucket>/<path>`);
        let [, l, u, c] = i2, h = e4.scheme.substring(a.length) + "://" + l, f = (r2 = t3.credentialsManager, s.Z ? r2.getCredentialsProvider("gcs", { bucket: u }) : r2.getCredentialsProvider("ngauth_gcs", { authServer: h, bucket: u }));
        return { store: new o.J(u, `${e4.scheme}://${l}/${u}/`, (0, n.d)(f)), path: decodeURIComponent((c ?? "").substring(1)) };
      } };
    }(`${a}${e2}`, t2));
  }, 9922: function(e, t, r) {
    r.d(t, { k: () => o, r: () => i });
    var s = r(8274), n = r(6923);
    function o(e2, t2) {
      let { version: r2, baseUrl: o2 } = e2, i2 = void 0 === r2 ? "" : `@${(0, s.ko)(r2)}/`;
      return o2 + `|ocdbt:${i2}${(0, n.aU)(t2)}`;
    }
    function i(e2, t2) {
      (0, n.uh)(e2);
      try {
        let [, r2, o2] = (e2.suffix ?? "").match(/^(?:@([^/]*)(?:\/|$))?(.*)$/);
        return { baseUrl: t2.store.getUrl((0, n.V8)(t2.path)), version: (0, s.wy)(r2), path: decodeURIComponent(o2) };
      } catch (t3) {
        throw Error(`Invalid URL: ${e2.url}`, { cause: t3 });
      }
    }
  }, 9858: function(e, t, r) {
    r.d(t, { X: () => n, u: () => o });
    var s = r(4881);
    class n {
      constructor() {
        __publicField(this, "baseKvStoreProviders", []);
        __publicField(this, "kvStoreAdapterProviders", []);
        __publicField(this, "autoDetectRegistry", new s._E());
      }
      registerBaseKvStoreProvider(e2) {
        this.baseKvStoreProviders.push(e2);
      }
      registerKvStoreAdapterProvider(e2) {
        this.kvStoreAdapterProviders.push(e2);
      }
      applyToContext(e2) {
        let { kvStoreContext: t2 } = e2;
        for (let r2 of ["baseKvStoreProviders", "kvStoreAdapterProviders"]) {
          let s2 = t2[r2];
          for (let t3 of this[r2]) {
            let r3 = t3(e2), { scheme: n2 } = r3;
            if (s2.has(n2)) throw Error(`Duplicate kvstore scheme ${n2}`);
            s2.set(n2, r3);
          }
        }
        this.autoDetectRegistry.copyTo(e2.kvStoreContext.autoDetectRegistry);
      }
    }
    let o = new n();
  }, 3126: function(e, t, r) {
    r.d(t, { S: () => u, X: () => c });
    var s = r(119), n = r(732), o = r(6923), i = r(2258), a = r(7734);
    function l(e2) {
      var t2 = "function" == typeof SuppressedError ? SuppressedError : function(e3, t3, r2) {
        var s2 = Error(r2);
        return s2.name = "SuppressedError", s2.error = e3, s2.suppressed = t3, s2;
      };
      return (l = function(e3) {
        function r2(r3) {
          e3.error = e3.hasError ? new t2(r3, e3.error, "An error was suppressed during disposal.") : r3, e3.hasError = true;
        }
        var s2, n2 = 0;
        return function t3() {
          for (; s2 = e3.stack.pop(); ) try {
            if (!s2.async && 1 === n2) return n2 = 0, e3.stack.push(s2), Promise.resolve().then(t3);
            if (s2.dispose) {
              var o2 = s2.dispose.call(s2.value);
              if (s2.async) return n2 |= 2, Promise.resolve(o2).then(t3, function(e4) {
                return r2(e4), t3();
              });
            } else n2 |= 1;
          } catch (e4) {
            r2(e4);
          }
          if (1 === n2) return e3.hasError ? Promise.reject(e3.error) : Promise.resolve();
          if (e3.hasError) throw e3.error;
        }();
      })(e2);
    }
    class u {
      constructor(e2, t2, r2, s2, n2 = i.ru) {
        __publicField(this, "sharedKvStoreContext");
        __publicField(this, "baseUrl");
        __publicField(this, "baseUrlForDisplay");
        __publicField(this, "knownToBeVirtualHostedStyle");
        __publicField(this, "fetchOkImpl");
        this.sharedKvStoreContext = e2, this.baseUrl = t2, this.baseUrlForDisplay = r2, this.knownToBeVirtualHostedStyle = s2, this.fetchOkImpl = n2;
      }
      stat(e2, t2) {
        let r2 = (0, o.Lj)(this.baseUrl, e2);
        return (0, s.l)(this, e2, r2, t2, this.fetchOkImpl);
      }
      read(e2, t2) {
        let r2 = (0, o.Lj)(this.baseUrl, e2);
        return (0, s.i)(this, e2, r2, t2, this.fetchOkImpl);
      }
      list(e2, t2) {
        let r2 = { stack: [], error: void 0, hasError: false };
        try {
          let { progressListener: s2 } = t2;
          if (!function(e3, t3, r3) {
            if (null != t3) {
              var s3, n2;
              if ("object" != typeof t3 && "function" != typeof t3) throw TypeError("Object expected.");
              if (r3) {
                if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
                s3 = t3[Symbol.asyncDispose];
              }
              if (void 0 === s3) {
                if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
                s3 = t3[Symbol.dispose], r3 && (n2 = s3);
              }
              if ("function" != typeof s3) throw TypeError("Object not disposable.");
              n2 && (s3 = function() {
                try {
                  n2.call(this);
                } catch (e4) {
                  return Promise.reject(e4);
                }
              }), e3.stack.push({ value: t3, dispose: s3, async: r3 });
            } else r3 && e3.stack.push({ async: true });
          }(r2, void 0 === s2 ? void 0 : new a.Vi(s2, { message: `Listing prefix ${this.getUrl(e2)}` }), false), this.knownToBeVirtualHostedStyle) return (0, n.ib)(this.baseUrl, e2, this.fetchOkImpl, t2);
          return (0, n.g6)((0, o.Lj)(this.baseUrl, e2), this.baseUrlForDisplay, this.sharedKvStoreContext.chunkManager.memoize, this.fetchOkImpl, t2);
        } catch (e3) {
          r2.error = e3, r2.hasError = true;
        } finally {
          l(r2);
        }
      }
      getUrl(e2) {
        return (0, o.Lj)(this.baseUrlForDisplay, e2);
      }
      get supportsOffsetReads() {
        return true;
      }
      get supportsSuffixReads() {
        return true;
      }
    }
    function c(e2, t2) {
      for (let r2 of (e2.registerBaseKvStoreProvider((e3) => ({ scheme: "s3", description: "S3 (anonymous)", getKvStore(r3) {
        let s2 = (r3.suffix ?? "").match(/^\/\/([^/]+)(\/.*)?$/);
        if (null === s2) throw Error("Invalid URL, expected `s3://<bucket>/<path>`");
        let [, n2, o2] = s2;
        return { store: new t2(e3, `https://${n2}.s3.amazonaws.com/`, `s3://${n2}/`, true), path: decodeURIComponent((o2 ?? "").substring(1)) };
      } })), ["http", "https"])) e2.registerBaseKvStoreProvider((e3) => function(e4, t3, r3) {
        return { scheme: `s3+${t3}`, description: `S3-compatible ${t3} server`, getKvStore(s2) {
          let n2 = (s2.suffix ?? "").match(/^\/\/([^/]+)(\/.*)?$/);
          if (null === n2) throw Error("Invalid URL, expected `s3+${httpScheme}://<host>/<path>`");
          let [, o2, i2] = n2;
          return { store: new r3(e4, `${t3}://${o2}/`, `s3+${t3}://${o2}/`, false), path: decodeURIComponent((i2 ?? "").substring(1)) };
        } };
      }(e3, r2, t2));
    }
  }, 6249: function(e, t, r) {
    r.d(t, { Bg: () => i, F0: () => s, aJ: () => a, cn: () => o, md: () => n });
    let s = "SharedKvStoreContext", n = "SharedKvStoreContext.stat", o = "SharedKvStoreContext.read", i = "SharedKvStoreContext.list", a = "SharedKvStoreContext.completeUrl";
  }, 7688: function(e, t, r) {
    r.d(t, { Ff: () => i, k_: () => l, nL: () => n, q7: () => o, ve: () => s });
    let s = "mesh/MeshLayer", n = "mesh/MultiscaleMeshLayer", o = "mesh/FragmentSource", i = "mesh/MultiscaleFragmentSource";
    var a, l = ((a = {})[a.float32 = 0] = "float32", a[a.uint10 = 1] = "uint10", a[a.uint16 = 2] = "uint16", a);
  }, 9443: function(e, t, r) {
    r.d(t, { w: () => s });
    let s = "perspective_view/PerspectiveView";
  }, 1395: function(e, t, r) {
    r.d(t, { ny: () => s, rC: () => o, ti: () => n, uH: () => i });
    let s = "rendered_view.addLayer", n = "rendered_view.removeLayer", o = "SharedProjectionParameters", i = "SharedProjectionParameters.changed";
  }, 8956: function(e, t, r) {
    r.d(t, { J6: () => a, Sk: () => o, V4: () => s, Wl: () => n });
    let s = "single_mesh/SingleMeshLayer", n = "single_mesh/getSingleMeshInfo", o = "";
    class i {
      constructor() {
        __publicField(this, "meshSourceUrl");
      }
    }
    class a extends i {
      constructor() {
        super(...arguments);
        __publicField(this, "info");
      }
    }
    __publicField(a, "RPC_ID", "single_mesh/SingleMeshSource");
  }, 5105: function(e, t, r) {
    r.d(t, { f: () => s });
    let s = "skeleton/SkeletonLayer";
  }, 9023: function(e, t, r) {
    r.d(t, { d: () => o });
    var s = r(3783), n = r(3853);
    class o {
      constructor(e2, t2, r2) {
        __publicField(this, "size");
        __publicField(this, "transform");
        __publicField(this, "invTransform");
        __publicField(this, "detTransform");
        __publicField(this, "finiteRank");
        this.size = s.R3.clone(e2), this.transform = s._E.clone(t2), this.finiteRank = r2;
        let o2 = s._E.create(), i = n.SO(o2, 4, t2, 4, 4);
        if (0 === i) throw Error("Transform is singular");
        this.invTransform = o2, this.detTransform = i;
      }
      toObject() {
        return { size: this.size, transform: this.transform, finiteRank: this.finiteRank };
      }
      static fromObject(e2) {
        return new o(e2.size, e2.transform, e2.finiteRank);
      }
      globalToLocalSpatial(e2, t2) {
        return s.R3.transformMat4(e2, t2, this.invTransform);
      }
      localSpatialVectorToGlobal(e2, t2) {
        return (0, s.vx)(e2, t2, this.transform);
      }
      globalToLocalNormal(e2, t2) {
        return (0, s._Z)(e2, t2, this.transform);
      }
    }
  }, 5901: function(e, t, r) {
    r.d(t, { H: () => s });
    function s(e2) {
      let t2 = -1;
      return Object.assign(() => {
        -1 === t2 && (t2 = requestAnimationFrame(() => {
          t2 = -1, e2();
        }));
      }, { flush: () => {
        -1 !== t2 && (t2 = -1, e2());
      }, cancel: () => {
        -1 !== t2 && (cancelAnimationFrame(t2), t2 = -1);
      } });
    }
  }, 658: function(e, t, r) {
    r.d(t, { D: () => c });
    var s = r(4066), n = r(3719), o = r(686);
    class i {
      constructor(e2) {
        __publicField(this, "value");
        __publicField(this, "rank");
        __publicField(this, "parent");
        __publicField(this, "next");
        __publicField(this, "prev");
        __publicField(this, "min");
        this.value = e2, this.rank = 0, this.parent = this, this.next = this, this.prev = this, this.min = e2;
      }
    }
    function a(e2) {
      let t2 = e2, r2 = e2.parent;
      for (; r2 !== e2; ) r2 = (e2 = r2).parent;
      for (e2 = t2.parent; r2 !== e2; ) t2.parent = r2, e2 = (t2 = e2).parent;
      return r2;
    }
    function* l(e2) {
      let t2 = e2;
      do
        yield t2.value, t2 = t2.next;
      while (t2 !== e2);
    }
    function u(e2) {
      return e2.parent === e2;
    }
    class c {
      constructor() {
        __publicField(this, "map", /* @__PURE__ */ new Map());
        __publicField(this, "visibleSegmentEquivalencePolicy", new n.SN(s.BA.MIN_REPRESENTATIVE));
        __publicField(this, "generation", 0);
      }
      has(e2) {
        return this.map.has(e2);
      }
      get(e2) {
        let t2 = this.map.get(e2);
        return void 0 === t2 ? e2 : a(t2).min;
      }
      isMinElement(e2) {
        return e2 === this.get(e2);
      }
      makeSet(e2) {
        let { map: t2 } = this, r2 = t2.get(e2);
        return void 0 === r2 ? (r2 = new i(e2), t2.set(e2, r2), r2) : a(r2);
      }
      link(e2, t2) {
        let r2 = this.makeSet(e2), n2 = this.makeSet(t2);
        if (r2 === n2) return false;
        this.generation++;
        let o2 = function(e3, t3) {
          let r3 = e3.rank, s2 = t3.rank;
          return r3 > s2 ? (t3.parent = e3, e3) : (e3.parent = t3, r3 === s2 && (t3.rank = s2 + 1), t3);
        }(r2, n2);
        !function(e3, t3) {
          let r3 = e3.prev, s2 = t3.prev;
          t3.prev = r3, r3.next = t3, e3.prev = s2, s2.next = e3;
        }(r2, n2);
        let i2 = r2.min, a2 = n2.min, l2 = (this.visibleSegmentEquivalencePolicy.value & s.BA.MAX_REPRESENTATIVE) != 0;
        return o2.min = i2 < a2 === l2 ? a2 : i2, true;
      }
      linkAll(e2) {
        for (let t2 = 1, r2 = e2.length; t2 < r2; ++t2) this.link(e2[0], e2[t2]);
      }
      deleteSet(e2) {
        let { map: t2 } = this, r2 = false;
        for (let s2 of this.setElements(e2)) t2.delete(s2), r2 = true;
        return r2 && ++this.generation, r2;
      }
      *setElements(e2) {
        let t2 = this.map.get(e2);
        void 0 === t2 ? yield e2 : yield* l(t2);
      }
      clear() {
        let { map: e2 } = this;
        return 0 !== e2.size && (++this.generation, e2.clear(), true);
      }
      get size() {
        return this.map.size;
      }
      *mappings() {
        for (let e2 of this.map.values()) yield [e2.value, a(e2).min];
      }
      *roots() {
        for (let e2 of this.map.values()) u(e2) && (yield e2.value);
      }
      [Symbol.iterator]() {
        return this.mappings();
      }
      toJSON() {
        let e2 = [];
        for (let t2 of this.map.values()) if (u(t2)) {
          let r2 = [];
          for (let e3 of l(t2)) r2.push(e3);
          r2.sort(o._f), e2.push(r2);
        }
        return e2.sort((e3, t2) => (0, o._f)(e3[0], t2[0])), e2.map((e3) => e3.map((e4) => e4.toString()));
      }
    }
  }, 9739: function(e, t, r) {
    r.d(t, { Z: () => s });
    let s = false;
  }, 5931: function(e, t, r) {
    r.d(t, { i: () => n });
    let s = new Float32Array(1);
    function n(e2) {
      s[0] = e2, e2 = s[0];
      for (let t2 = 1; t2 < 21; ++t2) {
        let r2 = e2.toPrecision(t2);
        if (s[0] = parseFloat(r2), s[0] === e2) return r2;
      }
      return e2.toString();
    }
  }, 2258: function(e, t, r) {
    r.d(t, { $C: () => n, XD: () => i, oo: () => s, ru: () => o });
    class s extends Error {
      constructor(e2, t2, r2, s2, n2) {
        let o2 = `Fetching ${JSON.stringify(e2)} resulted in HTTP error ${t2}`;
        r2 && (o2 += `: ${r2}`);
        super(o2 += ".", n2);
        __publicField(this, "url");
        __publicField(this, "status");
        __publicField(this, "statusText");
        __publicField(this, "response");
        this.name = "HttpError", this.message = o2, this.url = e2, this.status = t2, this.statusText = r2, s2 && (this.response = s2);
      }
      static fromResponse(e2) {
        return new s(e2.url, e2.status, e2.statusText, e2);
      }
      static fromRequestError(e2, t2) {
        if (t2 instanceof TypeError) {
          let r2;
          return new s("string" == typeof e2 ? e2 : e2.url, 0, "Network or CORS error", void 0, { cause: t2 });
        }
        return t2;
      }
    }
    function n(e2) {
      return Math.min(2 ** e2 * 500, 5e3) * (1 + Math.random());
    }
    async function o(e2, t2) {
      for (let r2 = 0; ; ) {
        let o2;
        t2?.signal?.throwIfAborted();
        try {
          o2 = await fetch(e2, t2);
        } catch (t3) {
          throw s.fromRequestError(e2, t3);
        }
        if (!o2.ok) {
          let { status: e3 } = o2;
          if ((429 === e3 || 503 === e3 || 504 === e3) && 32 != ++r2) {
            await new Promise((e4) => setTimeout(e4, n(r2 - 1)));
            continue;
          }
          throw s.fromResponse(o2);
        }
        return o2;
      }
    }
    function i(e2) {
      return e2 instanceof s && (0 === e2.status || 403 === e2.status || 404 === e2.status);
    }
  }, 7902: function(e, t, r) {
    r.d(t, { Z: () => s });
    function s(e2) {
      let { next: t2, prev: r2 } = e2;
      return { insertAfter(e3, s2) {
        let n = e3[t2];
        s2[t2] = n, s2[r2] = e3, e3[t2] = s2, n[r2] = s2;
      }, insertBefore(e3, s2) {
        let n = e3[r2];
        s2[r2] = n, s2[t2] = e3, e3[r2] = s2, n[t2] = s2;
      }, front(e3) {
        let r3 = e3[t2];
        return r3 === e3 ? null : r3;
      }, back(e3) {
        let t3 = e3[r2];
        return t3 === e3 ? null : t3;
      }, pop(e3) {
        let s2 = e3[t2], n = e3[r2];
        return s2[r2] = n, n[t2] = s2, e3[t2] = null, e3[r2] = null, e3;
      }, *iterator(e3) {
        for (let r3 = e3[t2]; r3 !== e3; r3 = r3[t2]) yield r3;
      }, *reverseIterator(e3) {
        for (let t3 = e3[r2]; t3 !== e3; t3 = t3[r2]) yield t3;
      }, initializeHead(e3) {
        e3[t2] = e3[r2] = e3;
      } };
    }
  }, 4571: function(e, t, r) {
    r.d(t, { E7: () => u, O1: () => l, PW: () => a });
    var s = r(2606), n = r(106), o = r(290), i = r(7734);
    class a {
      constructor() {
        __publicField(this, "map", /* @__PURE__ */ new Map());
      }
      get(e2, t2) {
        let { map: r2 } = this, s2 = r2.get(e2);
        return void 0 === s2 ? ((s2 = t2()).registerDisposer(() => {
          r2.delete(e2);
        }), r2.set(e2, s2)) : s2.addRef(), s2;
      }
    }
    class l extends a {
      get(e2, t2) {
        return "string" != typeof e2 && (e2 = (0, o.hd)(e2)), super.get(e2, t2);
      }
      getUncounted(e2, t2) {
        return this.get(e2, () => new n.IF(t2())).value;
      }
      getAsync(e2, t2, r2) {
        return this.getUncounted(e2, () => u(r2))(t2);
      }
    }
    function u(e2) {
      let t2, r2, n2;
      let o2 = false;
      return async (a2) => {
        if (o2) return n2;
        let { signal: l2 } = a2;
        if (l2?.throwIfAborted(), void 0 === n2 || r2.signal.aborted) {
          t2 = new i.Zi();
          let a3 = r2 = new s.eg();
          n2 = (async () => {
            try {
              return await e2({ signal: a3.signal, progressListener: t2 });
            } catch (e3) {
              throw a3.signal.aborted && (n2 = void 0), e3;
            } finally {
              void 0 !== n2 && (o2 = true), t2 = void 0, a3[Symbol.dispose](), r2 === a3 && (r2 = void 0);
            }
          })();
        }
        r2.addConsumer(l2);
        let u2 = t2;
        u2.addListener(a2.progressListener);
        try {
          return await (0, s.oi)(n2, l2);
        } finally {
          u2.removeListener(a2.progressListener);
        }
      };
    }
  }, 2374: function(e, t, r) {
    r(549), r(2679);
  }, 6235: function(e, t, r) {
    r.d(t, { B: () => s });
    function s(e2, t2) {
      return e2 < t2 ? -1 : e2 > t2 ? 1 : 0;
    }
  }, 5580: function(e, t, r) {
    r.d(t, { B: () => o });
    var s = r(290), n = r(566);
    class o {
      constructor(e2, t2, r2 = t2) {
        __publicField(this, "enumType");
        __publicField(this, "value_");
        __publicField(this, "defaultValue");
        __publicField(this, "changed");
        this.enumType = e2, this.value_ = t2, this.defaultValue = r2, this.changed = new n.K_();
      }
      set value(e2) {
        this.value_ !== e2 && (this.value_ = e2, this.changed.dispatch());
      }
      get value() {
        return this.value_;
      }
      reset() {
        this.value = this.defaultValue;
      }
      restoreState(e2) {
        this.value = (0, s.CT)(e2, this.enumType);
      }
      toJSON() {
        if (this.value_ !== this.defaultValue) return this.enumType[this.value_].toLowerCase();
      }
    }
  }, 4186: function(e, t, r) {
    r.d(t, { $: () => i, u: () => o });
    var s, n = r(5580), o = ((s = {})[s.OFF = 0] = "OFF", s[s.ON = 1] = "ON", s[s.FORCE = 2] = "FORCE", s[s.PREVIEW = 3] = "PREVIEW", s);
    class i extends n.B {
      constructor(e2, t2 = e2) {
        super(o, e2, t2);
      }
    }
  }, 9652: function(e, t, r) {
    r.d(t, { B: () => n });
    var s = r(4571);
    function n(e2) {
      let t2 = e2.getContext("webgl2", { antialias: false, stencil: true });
      if (null == t2) throw Error("WebGL not supported.");
      for (let e3 of (t2.memoize = new s.PW(), t2.maxTextureSize = t2.getParameter(WebGL2RenderingContext.MAX_TEXTURE_SIZE), t2.max3dTextureSize = t2.getParameter(WebGL2RenderingContext.MAX_3D_TEXTURE_SIZE), t2.maxTextureImageUnits = t2.getParameter(WebGL2RenderingContext.MAX_TEXTURE_IMAGE_UNITS), t2.tempTextureUnit = t2.maxTextureImageUnits - 1, ["EXT_color_buffer_float"])) if (!t2.getExtension(e3)) throw Error(`${e3} extension not available`);
      for (let e3 of ["EXT_float_blend"]) t2.getExtension(e3);
      return t2;
    }
  } }]);
})();
