(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  (() => {
    "use strict";
    var e = { 8522: function(e2, t2, r2) {
      e2.exports = r2.p + "../wasm/09f21dcf7b4f13e8.wasm";
    }, 4406: function(e2, t2, r2) {
      r2.d(t2, { Q: () => s, q: () => i });
      var n = r2(2258);
      async function i(e3, t3, r3, i2, s2) {
        let a;
        for (let o = 0; ; ) {
          r3.signal?.throwIfAborted(), o > 1 && await new Promise((e4) => setTimeout(e4, (0, n.$C)(o - 2))), a = await e3.get(a, { signal: r3.signal ?? void 0, progressListener: r3.progressListener });
          try {
            return await (0, n.ru)("function" == typeof t3 ? t3(a.credentials) : t3, i2(a.credentials, r3));
          } catch (e4) {
            if (e4 instanceof n.oo && "refresh" === s2(e4, a.credentials)) {
              if (3 == ++o) throw e4;
              continue;
            }
            throw e4;
          }
        }
      }
      function s(e3, t3, r3) {
        return (n2, s2 = {}) => i(e3, n2, s2, t3, r3);
      }
    }, 7399: function(e2, t2, r2) {
      r2.d(t2, { d: () => l, i: () => o });
      var n = r2(4406), i = r2(2258);
      function s(e3, t3) {
        if (!e3.accessToken) return t3;
        let r3 = new Headers(t3.headers);
        return r3.set("Authorization", `${e3.tokenType} ${e3.accessToken}`), { ...t3, headers: r3 };
      }
      function a(e3, t3) {
        let { status: r3 } = e3;
        if (401 === r3 || 403 === r3 && !t3.accessToken) return "refresh";
        throw e3 instanceof Error && void 0 !== t3.email && (e3.message += `  (Using credentials for ${JSON.stringify(t3.email)})`), e3;
      }
      function o(e3, t3, r3) {
        return void 0 === e3 ? (0, i.ru)(t3, r3) : (0, n.q)(e3, t3, r3, s, a);
      }
      function l(e3) {
        return void 0 === e3 ? i.ru : (0, n.Q)(e3, s, a);
      }
    }, 4881: function(e2, t2, r2) {
      function n(e3) {
        return async (t3) => {
          let r3 = [];
          for (let n2 of await Promise.allSettled(e3.map((e4) => e4.match(t3)))) "fulfilled" === n2.status && r3.push(...n2.value);
          return r3;
        };
      }
      r2.d(t2, { _E: () => i }), r2(6985), r2(7734);
      class i {
        constructor() {
          __publicField(this, "directorySpecs", []);
          __publicField(this, "fileSpecs", []);
          __publicField(this, "_directorySpec");
          __publicField(this, "_fileSpec");
        }
        registerDirectoryFormat(e3) {
          this.directorySpecs.push(e3), this._directorySpec = void 0;
        }
        registerFileFormat(e3) {
          this.fileSpecs.push(e3), this._fileSpec = void 0;
        }
        copyTo(e3) {
          e3.directorySpecs.push(...this.directorySpecs), e3.fileSpecs.push(...this.fileSpecs), e3._fileSpec = void 0, e3._directorySpec = void 0;
        }
        get directorySpec() {
          return this._directorySpec ?? (this._directorySpec = this.getDirectorySpec());
        }
        getDirectorySpec() {
          return function(e3) {
            let t3 = /* @__PURE__ */ new Set(), r3 = /* @__PURE__ */ new Set();
            for (let n2 of e3) {
              let { fileNames: e4, subDirectories: i2 } = n2;
              if (void 0 !== e4) for (let r4 of e4) t3.add(r4);
              if (void 0 !== i2) for (let e5 of i2) r3.add(e5);
            }
            return { fileNames: t3, subDirectories: r3, match: n(e3) };
          }(this.directorySpecs);
        }
        get fileSpec() {
          return this._fileSpec ?? (this._fileSpec = this.getFileSpec());
        }
        getFileSpec() {
          let { fileSpecs: e3 } = this;
          return function(e4) {
            let t3 = 0, r3 = 0;
            for (let n2 of e4) t3 = Math.max(t3, n2.prefixLength), r3 = Math.max(r3, n2.suffixLength);
            return { prefixLength: t3, suffixLength: r3, match: n(e4) };
          }([...e3]);
        }
      }
    }, 4758: function(e2, t2, r2) {
      r2.d(t2, { _J: () => s, uX: () => a, z2: () => i });
      var n = r2(6985);
      function i(e3, t3) {
        if (void 0 === t3) return { outer: e3, inner: { offset: 0, length: e3.length } };
        if ("suffixLength" in t3) {
          let r3 = Math.min(e3.length, t3.suffixLength);
          return { outer: { offset: e3.offset + (e3.length - r3), length: r3 }, inner: { offset: e3.length - r3, length: r3 } };
        }
        if (t3.offset + t3.length > e3.length) throw Error(`Requested byte range ${JSON.stringify(t3)} not valid for value of length ${e3.length}`);
        return { outer: { offset: e3.offset + t3.offset, length: t3.length }, inner: t3 };
      }
      function s(e3, t3) {
        let { outer: { offset: r3, length: n2 } } = i({ offset: 0, length: e3.length }, t3);
        return { offset: r3, length: n2, totalSize: e3.length, response: new Response(e3.subarray(r3, r3 + n2)) };
      }
      class a {
        constructor(e3, t3) {
          __publicField(this, "base");
          __publicField(this, "byteRange");
          this.base = e3, this.byteRange = t3;
        }
        async stat(e3) {
          return { totalSize: this.byteRange.length };
        }
        async read(e3) {
          let { byteRange: t3 } = this, { outer: r3, inner: s2 } = i(t3, e3.byteRange);
          return 0 === r3.length ? { response: new Response(new Uint8Array(0)), totalSize: t3.length, ...s2 } : { response: (await (0, n.iT)(this.base, { signal: e3.signal, byteRange: r3, strictByteRange: true, throwIfMissing: true })).response, totalSize: t3.length, ...s2 };
        }
        getUrl() {
          let { offset: e3, length: t3 } = this.byteRange;
          return `${this.base.getUrl()}|range:${e3}-${e3 + t3}`;
        }
      }
    }, 6985: function(e2, t2, r2) {
      r2.d(t2, { BF: () => s, Mt: () => u, RQ: () => o, dR: () => i, f2: () => l, iT: () => a });
      var n = r2(6235);
      class i extends Error {
        constructor(e3, t3) {
          super(`${e3.getUrl()} not found`, t3);
        }
      }
      async function s(e3, t3, r3 = {}) {
        return a(new l(e3, t3), r3);
      }
      async function a(e3, t3 = {}) {
        let r3 = await e3.read(t3);
        if (t3?.throwIfMissing === true && void 0 === r3) throw new i(e3);
        if (t3?.strictByteRange === true && void 0 !== r3) {
          let { byteRange: n2 } = t3, { offset: i2, length: s2 } = r3;
          if (void 0 !== n2 && ("suffixLength" in n2 ? s2 !== n2.suffixLength : i2 !== n2.offset || void 0 !== s2 && s2 !== n2.length)) throw Error(`Received truncated response for ${e3.getUrl()}, expected ${JSON.stringify(n2)} but received offset=${i2}, length=${s2}`);
        }
        return r3;
      }
      async function o(e3, t3, r3 = {}) {
        if (!e3.list) throw Error("Listing not supported");
        return function(e4, t4, r4, n2) {
          switch (n2) {
            case "suffix": {
              let r5 = t4.length;
              return { directories: e4.directories.map((e5) => e5.substring(r5)), entries: e4.entries.map(({ key: e5, ...t5 }) => ({ ...t5, key: e5.substring(r5) })) };
            }
            case "url":
              return { directories: e4.directories.map((e5) => r4.getUrl(e5)), entries: e4.entries.map(({ key: e5, ...t5 }) => ({ ...t5, key: r4.getUrl(e5) })) };
            default:
              return e4;
          }
        }(await e3.list(t3, r3), t3, e3, r3.responseKeys);
      }
      class l {
        constructor(e3, t3) {
          __publicField(this, "store");
          __publicField(this, "key");
          this.store = e3, this.key = t3;
        }
        stat(e3) {
          return this.store.stat(this.key, e3);
        }
        read(e3) {
          return this.store.read(this.key, e3);
        }
        getUrl() {
          return this.store.getUrl(this.key);
        }
      }
      function u(e3) {
        return e3.entries.sort(({ key: e4 }, { key: t3 }) => (0, n.B)(e4, t3)), e3.directories.sort(n.B), e3;
      }
    }, 8274: function(e2, t2, r2) {
      function n(e3) {
        if (void 0 === e3) return "HEAD";
        if ("generationNumber" in e3) return `v${e3.generationNumber}`;
        let { commitTime: t3 } = e3;
        return a(t3);
      }
      function i(e3) {
        if (void 0 === e3) return;
        let t3 = e3.match(/^(?:v([1-9]\d*)|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z))$/);
        if (null === t3) throw Error(`Invalid OCDBT version specifier: ${JSON.stringify(e3)}`);
        let [, r3] = t3;
        if (void 0 !== r3) {
          let e4 = BigInt(r3);
          if (e4 > 0xffffffffffffffffn) throw Error(`Invalid generation number: ${e4}`);
          return { generationNumber: e4 };
        }
        return { commitTime: function(e4) {
          let t4 = e4.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:(\.\d*))?Z$/);
          if (null === t4) throw Error(`Invalid commit timestamp: ${JSON.stringify(e4)}`);
          let [, r4, n2] = t4;
          return s(Date.parse(r4 + "Z"), n2);
        }(e3) };
      }
      function s(e3, t3) {
        let r3 = 1000000n * BigInt(e3);
        return void 0 !== t3 && t3.length > 1 && (r3 += BigInt(Math.min(999999999, Math.round(1e9 * Number(t3))))), r3;
      }
      function a(e3) {
        let t3 = e3 % 1000000000n, r3 = e3 / 1000000000n;
        t3 < 0n && (t3 += 1000000000n, r3 -= 1n);
        let n2 = new Date(1e3 * Number(r3)).toISOString();
        if (24 !== n2.length) throw Error(`Invalid commit time: ${e3} -> ${n2}`);
        return n2 = n2.slice(0, 19), 0n !== t3 && (n2 += "." + t3.toString().padStart(9, "0").replace(/0+$/, "")), n2 += "Z";
      }
      r2.d(t2, { Qf: () => u, ZU: () => a, ko: () => n, wy: () => i });
      let o = RegExp("^(\\d{0,4})(?:(?<=\\d{4})-(\\d{0,2})(?:(?<=\\d{2})-(\\d{0,2})(?:(?<=\\d{2})T(\\d{0,2})(?:(?<=\\d{2}):(\\d{0,2})(?:(?<=\\d{2}):(\\d{0,2})(?:(?<=\\d{2})(\\.\\d*)?(Z)?)?)?)?)?)?)?$");
      function l(e3, t3, r3, n2, i2) {
        let s2 = parseInt((t3 = t3 ?? "").padEnd(r3, "0"), 10), a2 = parseInt(t3.padEnd(r3, "9"), 10);
        if (s2 > i2) throw Error(`Invalid ${e3} prefix: ${t3}`);
        return [Math.max(n2, s2), Math.min(i2, a2)];
      }
      function u(e3) {
        let t3 = e3.match(o);
        if (null === t3) throw Error(`Expected prefix of ISO-8601 "YYYY-MM-DDThh:mm:ss.sssssssssZ" format, but received: ${JSON.stringify(e3)}`);
        let r3 = l("year", t3[1], 4, 0, 9999), n2 = l("month", t3[2], 2, 1, 12), i2 = function(e4, t4) {
          let r4 = /* @__PURE__ */ new Date(0);
          return r4.setUTCFullYear(e4), r4.setUTCMonth(t4), r4.setUTCDate(0), r4.getUTCDate();
        }(r3[1], n2[1]), a2 = l("day", t3[3], 2, 1, i2), u2 = l("hour", t3[4], 2, 0, 23), h = l("minute", t3[5], 2, 0, 59), c = l("second", t3[6], 2, 0, 59), d = t3[7] ?? ".", f = t3[8], g = d.padEnd(10, "0"), p = void 0 === f ? d.padEnd(10, "9") : g, m = [g, p];
        function y(e4) {
          let t4 = /* @__PURE__ */ new Date(0);
          return t4.setUTCFullYear(r3[e4]), t4.setUTCMonth(n2[e4] - 1), t4.setUTCDate(a2[e4]), t4.setUTCHours(u2[e4]), t4.setUTCMinutes(h[e4]), t4.setUTCSeconds(c[e4]), s(t4.getTime(), m[e4]);
        }
        return [y(0), y(1)];
      }
    }, 732: function(e2, t2, r2) {
      r2.d(t2, { g6: () => l, ib: () => s });
      var n = r2(6923);
      let i = ["http://doc.s3.amazonaws.com/2006-03-01/", "http://s3.amazonaws.com/doc/2006-03-01/"];
      async function s(e3, t3, r3, n2) {
        try {
          let s2 = await r3(`${e3}?list-type=2&prefix=${encodeURIComponent(t3)}&delimiter=${encodeURIComponent("/")}&encoding-type=url`, { headers: { accept: "application/xml,text/xml" }, signal: n2.signal, progressListener: n2.progressListener }), a2 = s2.headers.get("content-type");
          if (null === a2 || null === /\b(application\/xml|text\/xml|text\/html)\b/i.exec(a2)) throw Error(`Expected XML content-type but received: ${a2}`);
          let o2 = await s2.text(), l2 = new DOMParser().parseFromString(o2, "application/xml"), { documentElement: u } = l2;
          if (!i.includes(u.namespaceURI) || "ListBucketResult" !== u.tagName) throw Error(`Received unexpected XML root element <${u.tagName} xmlns="${u.namespaceURI}">`);
          let h = u.namespaceURI, c = () => h, d = l2.evaluate("//CommonPrefixes/Prefix", l2, c, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), f = [];
          for (let e4 = 0, t4 = d.snapshotLength; e4 < t4; ++e4) {
            let t5 = d.snapshotItem(e4).textContent;
            null !== t5 && (t5 = decodeURIComponent(t5), f.push(t5.substring(0, t5.length - 1)));
          }
          let g = [], p = l2.evaluate("//Contents/Key", l2, c, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
          for (let e4 = 0, t4 = p.snapshotLength; e4 < t4; ++e4) {
            let t5 = p.snapshotItem(e4).textContent;
            null !== t5 && g.push({ key: decodeURIComponent(t5) });
          }
          return { directories: f, entries: g };
        } catch (e4) {
          throw Error("S3-compatible listing not supported", { cause: e4 });
        }
      }
      function a(e3, t3, r3) {
        let { baseUrl: i2, path: a2 } = (0, n.f0)(e3);
        return s(i2, a2, t3, r3);
      }
      async function o(e3, t3, r3) {
        let i2 = function(e4) {
          let t4 = new URL(e4), r4 = t4.pathname.match(/^\/([^/]+)(?:\/(.*))$/);
          if (null === r4) return;
          let [, n2, i3] = r4;
          return { bucketUrl: `${t4.origin}/${n2}/${t4.search}`, bucket: decodeURIComponent(n2), prefix: decodeURIComponent(i3) };
        }(e3);
        if (void 0 === i2) throw Error(`Path-style S3 URL ${JSON.stringify(e3)} must specify bucket`);
        let { bucketUrl: a2, bucket: o2, prefix: l2 } = i2, u = await s(a2, l2, t3, r3), h = (0, n.aU)(o2) + "/";
        return { entries: u.entries.map((e4) => ({ key: h + e4.key })), directories: u.directories.map((e4) => h + e4) };
      }
      async function l(e3, t3, r3, n2, i2) {
        let s2 = r3.getUncounted("s3:urlkind", () => /* @__PURE__ */ new Map()), l2 = s2.get(t3);
        if ("virtual" === l2) return await a(e3, n2, i2);
        if ("path" === l2) return await o(e3, n2, i2);
        if (null !== l2) try {
          let { result: r4, urlKind: l3 } = await Promise.any([a(e3, n2, i2).then((e4) => ({ result: e4, urlKind: "virtual" })), o(e3, n2, i2).then((e4) => ({ result: e4, urlKind: "path" }))]);
          return s2.set(t3, l3), r4;
        } catch (e4) {
          throw i2.signal?.throwIfAborted(), s2.set(t3, null), Error("Neither virtual hosted nor path-style S3 listing supported", { cause: e4 });
        }
        throw Error("Neither virtual hosted nor path-style S3 listing supported");
      }
    }, 6923: function(e2, t2, r2) {
      function n(e3) {
        return e3.match(/.*?([^|]*)$/)[1];
      }
      r2.d(t2, { Lj: () => g, V8: () => u, Vo: () => l, Yq: () => o, aU: () => f, f0: () => p, i1: () => d, kw: () => n, mq: () => s, pN: () => a, uh: () => h, zY: () => c });
      let i = /^(?:([a-zA-Z][a-zA-Z0-9-+.]*):)?(.*)$/;
      function s(e3) {
        let t3 = e3.match(i), r3 = t3[1], n2 = t3[2];
        return void 0 === r3 ? { url: e3, scheme: e3, suffix: void 0 } : { url: e3, scheme: r3, suffix: n2 };
      }
      function a(e3) {
        return e3.split("|").map(s);
      }
      function o(e3, ...t3) {
        let [, r3, n2] = e3.match(/^(.*?[^|?#]*)([^|]*)$/);
        for (let e4 of t3) e4.startsWith("/") && (e4 = e4.substring(1)), "" !== e4 && (r3 = function(e5) {
          let t4 = e5.match(/^((?:.*?\|)?)([a-zA-Z][a-zA-Z0-9-+.]*)(?:(:[^?#|]*)((?:[?#][^|]*)?))?$/);
          if (null === t4) throw Error(`Invalid URL: ${e5}`);
          let [, r4, n3, i2, s2] = t4;
          return void 0 === i2 ? `${r4}${n3}:` : ":" === i2 || i2.endsWith("/") ? e5 : `${r4}${n3}${i2}/${s2 ?? ""}`;
        }(r3) + f(e4));
        return r3 + n2;
      }
      function l(e3, ...t3) {
        for (let r3 of t3) r3.startsWith("/") && (r3 = r3.substring(1)), "" !== r3 && (e3 = u(e3) + r3);
        return e3;
      }
      function u(e3) {
        var t3;
        return "" === (t3 = e3) || t3.endsWith("/") || (e3 += "/"), e3;
      }
      function h(e3) {
        let { suffix: t3 } = e3;
        if (void 0 !== t3 && t3.match(/[#?]/)) throw Error(`Invalid URL ${e3.url}: query parameters and/or fragment not supported`);
      }
      function c(e3) {
        if (e3.suffix) throw Error(`Invalid URL syntax ${JSON.stringify(e3.url)}, expected "${e3.scheme}:"`);
      }
      function d(e3, t3) {
        let r3 = e3;
        for (let n2 of (e3.endsWith("/") && (e3 = e3.substring(0, e3.length - 1)), t3.split("/"))) if ("" !== n2 && "." !== n2) {
          if (".." === n2) {
            let n3 = e3.lastIndexOf("/");
            if (n3 <= 0) throw Error(`Invalid relative path ${JSON.stringify(t3)} from base path ${JSON.stringify(r3)}`);
            e3 = e3.substring(0, n3);
            continue;
          }
          "" !== e3 && (e3 += "/"), e3 += n2;
        }
        return t3.endsWith("/") && (e3 += "/"), e3;
      }
      function f(e3) {
        return encodeURI(e3).replace(/[?#@]/g, (e4) => `%${e4.charCodeAt(0).toString(16).toUpperCase()}`);
      }
      function g(e3, t3) {
        let { base: r3, queryAndFragment: n2 } = function(e4) {
          let [, t4, r4] = e4.match(/^(.*?[^|?#]*)([^|]*)$/);
          return { base: t4, queryAndFragment: r4 };
        }(e3);
        return r3 + f(t3) + n2;
      }
      function p(e3) {
        let t3 = new URL(e3);
        if (t3.hash) throw Error("fragment not supported");
        if (t3.username || t3.password) throw Error("basic auth credentials not supported");
        return { baseUrl: `${t3.origin}/${t3.search}`, path: decodeURIComponent(t3.pathname.substring(1)) };
      }
    }, 4066: function(e2, t2, r2) {
      r2.d(t2, { BA: () => i });
      var n, i = ((n = {})[n.MIN_REPRESENTATIVE = 0] = "MIN_REPRESENTATIVE", n[n.MAX_REPRESENTATIVE = 1] = "MAX_REPRESENTATIVE", n[n.REPRESENTATIVE_EXCLUDED = 2] = "REPRESENTATIVE_EXCLUDED", n[n.NONREPRESENTATIVE_EXCLUDED = 4] = "NONREPRESENTATIVE_EXCLUDED", n);
    }, 3719: function(e2, t2, r2) {
      r2.d(t2, { SN: () => a, TU: () => o, Uw: () => l });
      var n = r2(2902), i = r2(106), s = r2(566);
      class a {
        constructor(e3) {
          __publicField(this, "value_");
          __publicField(this, "changed");
          this.value_ = e3, this.changed = new s.K_();
        }
        get value() {
          return this.value_;
        }
        set value(e3) {
          e3 !== this.value_ && (this.value_ = e3, this.changed.dispatch());
        }
      }
      class o extends a {
        constructor(e3, t3, r3 = e3) {
          super(e3);
          __publicField(this, "validator");
          __publicField(this, "defaultValue");
          this.validator = t3, this.defaultValue = r3;
        }
        toJSON() {
          let { value_: e3 } = this;
          if (e3 !== this.defaultValue) return this.value_;
        }
        reset() {
          this.value = this.defaultValue;
        }
        restoreState(e3) {
          if (void 0 !== e3) {
            let { validator: t3 } = this;
            try {
              this.value = t3(e3);
              return;
            } catch {
            }
          }
          this.value = this.defaultValue;
        }
      }
      function l(e3, ...t3) {
        let r3 = t3.map((e4) => e4.value), s2 = t3.length, a2 = new i.gj(), o2 = e3(a2, ...r3), u = (0, n.Z)(() => {
          let n2 = false;
          for (let e4 = 0; e4 < s2; ++e4) {
            let i2 = t3[e4].value;
            r3[e4] !== i2 && (r3[e4] = i2, n2 = true);
          }
          n2 && (a2.dispose(), o2 = e3(a2 = new i.gj(), ...r3));
        }, 0), h = t3.map((e4) => e4.changed.add(u));
        return { flush() {
          u.flush();
        }, dispose() {
          u.cancel(), (0, i.k1)(h), a2.dispose();
        }, get value() {
          return u.flush(), o2;
        } };
      }
      i.gj, i.gj, i.gj, i.gj, i.gj, i.gj;
    }, 2606: function(e2, t2, r2) {
      function n(e3, t3) {
        if (void 0 !== e3) {
          if (e3.aborted) {
            t3(e3.reason);
            return;
          }
          return e3.addEventListener("abort", r3, { once: true }), { [Symbol.dispose]() {
            e3.removeEventListener("abort", r3);
          } };
        }
        function r3() {
          t3(this.reason);
        }
      }
      r2.d(t2, { L0: () => s, eg: () => i, oi: () => a });
      class i {
        constructor() {
          __publicField(this, "consumers", /* @__PURE__ */ new Map());
          __publicField(this, "controller", new AbortController());
          __publicField(this, "retainCount", 0);
        }
        get signal() {
          return this.controller.signal;
        }
        addConsumer(e3) {
          if (!this.controller.signal.aborted) {
            if (void 0 !== e3) {
              if (e3.aborted) return;
              let t3 = this;
              e3.addEventListener("abort", function e4() {
                t3.consumers.delete(e4), 0 == --t3.retainCount && (t3.controller.abort(), t3[Symbol.dispose]());
              }, { once: true });
            }
            ++this.retainCount;
          }
        }
        [Symbol.dispose]() {
          for (let [e3, t3] of this.consumers) t3.removeEventListener("abort", e3);
          this.consumers.clear(), this.retainCount = 0;
        }
        start() {
          0 === this.retainCount && this.controller.abort();
        }
      }
      function s(e3, t3) {
        let { promise: r3, resolve: i2, reject: s2 } = Promise.withResolvers(), a2 = n(e3, t3);
        return { promise: r3, resolve: (e4) => {
          a2?.[Symbol.dispose](), i2(e4);
        }, reject: (e4) => {
          a2?.[Symbol.dispose](), s2(e4);
        } };
      }
      function a(e3, t3) {
        return void 0 === t3 ? e3 : t3.aborted ? Promise.reject(t3.reason) : new Promise((r3, i2) => {
          let s2 = n(t3, (e4) => {
            i2(e4);
          });
          e3.then((e4) => {
            s2?.[Symbol.dispose](), r3(e4);
          }, (e4) => {
            s2?.[Symbol.dispose](), i2(e4);
          });
        });
      }
    }, 686: function(e2, t2, r2) {
      function n(e3, t3) {
        return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
      }
      function i() {
        let e3 = 4294967296 * Math.random() >>> 0;
        return BigInt(4294967296 * Math.random() >>> 0) | BigInt(e3) << 32n;
      }
      r2.d(t2, { Nr: () => s, _f: () => n, ff: () => i });
      let s = 0xffffffffffffffffn;
    }, 106: function(e2, t2, r2) {
      function n(e3) {
        for (let r3 = e3.length; r3 > 0; --r3) {
          var t3;
          "object" == typeof (t3 = e3[r3 - 1]) ? t3.dispose() : t3();
        }
      }
      r2.d(t2, { IF: () => s, gj: () => i, k1: () => n });
      class i {
        constructor() {
          __publicField(this, "refCount", 1);
          __publicField(this, "wasDisposed");
          __publicField(this, "disposers");
          __publicField(this, "disposedStacks");
        }
        addRef() {
          return ++this.refCount, this;
        }
        dispose() {
          0 == --this.refCount && this.refCountReachedZero();
        }
        [Symbol.dispose]() {
          this.dispose();
        }
        refCountReachedZero() {
          this.disposed();
          let { disposers: e3 } = this;
          void 0 !== e3 && (n(e3), this.disposers = void 0), this.wasDisposed = true;
        }
        disposed() {
        }
        registerDisposer(e3) {
          let { disposers: t3 } = this;
          return null == t3 ? this.disposers = [e3] : t3.push(e3), e3;
        }
        unregisterDisposer(e3) {
          let { disposers: t3 } = this;
          if (null != t3) {
            let r3 = t3.indexOf(e3);
            -1 !== r3 && t3.splice(r3, 1);
          }
          return e3;
        }
        registerEventListener(e3, t3, r3, n2) {
          this.registerDisposer((e3.addEventListener(t3, r3, n2), () => e3.removeEventListener(t3, r3, n2)));
        }
        registerCancellable(e3) {
          return this.registerDisposer(() => {
            e3.cancel();
          }), e3;
        }
      }
      class s extends i {
        constructor(e3) {
          super();
          __publicField(this, "value");
          this.value = e3;
        }
      }
    }, 3783: function(e2, t2, r2) {
      r2.d(t2, { $k: () => h, Fi: () => p, R3: () => i, Rq: () => v, V2: () => S, _E: () => n, _Z: () => g, b$: () => l, bZ: () => m, e6: () => w, gf: () => a, iG: () => b, m0: () => d, n_: () => c, rn: () => u, th: () => y, vh: () => s, vx: () => f, wO: () => o });
      var n = r2(5975), i = r2(7160), s = r2(8333), a = r2(2945), o = r2(5600);
      n.create(), i.fromValues(1, 0, 0), i.fromValues(0, 1, 0), i.fromValues(0, 0, 1);
      let l = i.fromValues(0, 0, 0);
      s.fromValues(0, 0, 0, 0);
      let u = i.fromValues(1, 1, 1), h = i.fromValues(1 / 0, 1 / 0, 1 / 0);
      function c(e3) {
        return e3[0] * e3[1] * e3[2];
      }
      function d(e3) {
        return `${e3[0]},${e3[1]},${e3[2]}`;
      }
      function f(e3, t3, r3) {
        let n2 = t3[0], i2 = t3[1], s2 = t3[2];
        return e3[0] = r3[0] * n2 + r3[4] * i2 + r3[8] * s2, e3[1] = r3[1] * n2 + r3[5] * i2 + r3[9] * s2, e3[2] = r3[2] * n2 + r3[6] * i2 + r3[10] * s2, e3;
      }
      function g(e3, t3, r3) {
        let n2 = t3[0], i2 = t3[1], s2 = t3[2];
        return e3[0] = r3[0] * n2 + r3[1] * i2 + r3[2] * s2, e3[1] = r3[4] * n2 + r3[5] * i2 + r3[6] * s2, e3[2] = r3[8] * n2 + r3[9] * i2 + r3[10] * s2, e3;
      }
      function p(e3, t3, r3, i2, s2) {
        return e3[0] = i2[0], e3[1] = i2[1], e3[2] = i2[2] * s2, n.fromRotationTranslationScale(e3, r3, t3, e3);
      }
      function m(e3, t3) {
        let r3 = t3[0], n2 = t3[1], i2 = t3[2], s2 = t3[4], a2 = t3[5], o2 = t3[6], l2 = t3[8], u2 = t3[9], h2 = t3[10];
        return e3[0] = r3, e3[1] = n2, e3[2] = i2, e3[3] = s2, e3[4] = a2, e3[5] = o2, e3[6] = l2, e3[7] = u2, e3[8] = h2, e3;
      }
      function y(e3, t3) {
        let r3 = t3[0], n2 = t3[1], i2 = t3[2], s2 = t3[3], a2 = t3[4], o2 = t3[5], l2 = t3[6], u2 = t3[7], h2 = t3[8], c2 = t3[9], d2 = t3[10], f2 = t3[11], g2 = t3[12], p2 = t3[13], m2 = t3[14], y2 = t3[15];
        e3[0] = s2 + r3, e3[1] = u2 + a2, e3[2] = f2 + h2, e3[3] = y2 + g2, e3[4] = s2 - r3, e3[5] = u2 - a2, e3[6] = f2 - h2, e3[7] = y2 - g2, e3[8] = s2 + n2, e3[9] = u2 + o2, e3[10] = f2 + c2, e3[11] = y2 + p2, e3[12] = s2 - n2, e3[13] = u2 - o2, e3[14] = f2 - c2, e3[15] = y2 - p2;
        let v2 = s2 + i2, b2 = u2 + l2, w2 = f2 + d2, S2 = s2 - i2, E = u2 - l2, k = f2 - d2, I = Math.sqrt(v2 ** 2 + b2 ** 2 + w2 ** 2);
        e3[16] = v2 / I, e3[17] = b2 / I, e3[18] = w2 / I, e3[19] = (y2 + m2) / I;
        let M = Math.sqrt(S2 ** 2 + E ** 2 + k ** 2);
        return e3[20] = S2 / M, e3[21] = E / M, e3[22] = k / M, e3[23] = (y2 - m2) / M, e3;
      }
      function v(e3, t3, r3, n2, i2, s2, a2) {
        for (let o2 = 0; o2 < 6; ++o2) {
          let l2 = a2[4 * o2], u2 = a2[4 * o2 + 1], h2 = a2[4 * o2 + 2];
          if (Math.max(l2 * e3, l2 * n2) + Math.max(u2 * t3, u2 * i2) + Math.max(h2 * r3, h2 * s2) + a2[4 * o2 + 3] < 0) return false;
        }
        return true;
      }
      function b(e3, t3, r3, n2, i2, s2, a2) {
        for (let o2 = 0; o2 < 4; ++o2) {
          let l2 = a2[4 * o2], u2 = a2[4 * o2 + 1], h2 = a2[4 * o2 + 2];
          if (Math.max(l2 * e3, l2 * n2) + Math.max(u2 * t3, u2 * i2) + Math.max(h2 * r3, h2 * s2) + a2[4 * o2 + 3] < 0) return false;
        }
        {
          let o2 = a2[20], l2 = a2[21], u2 = a2[22], h2 = a2[23], c2 = Math.max(o2 * e3, o2 * n2) + Math.max(l2 * t3, l2 * i2) + Math.max(u2 * r3, u2 * s2), d2 = 1e-6 * Math.abs(h2);
          if (Math.min(o2 * e3, o2 * n2) + Math.min(l2 * t3, l2 * i2) + Math.min(u2 * r3, u2 * s2) > -h2 + d2 || c2 < -h2 - d2) return false;
        }
        return true;
      }
      function w(e3) {
        if (1 === e3[15]) {
          let t4 = 2 / Math.abs(e3[10]);
          return 2 / Math.abs(e3[0]) * (2 / Math.abs(e3[5])) * t4;
        }
        let t3 = e3[10], r3 = 2 * e3[14] / (2 * t3 - 2);
        return 4 / (e3[0] * e3[5]) / 3 * (Math.abs((t3 - 1) * r3 / (t3 + 1)) ** 3 - Math.abs(r3) ** 3);
      }
      function S(e3) {
        if (1 === e3[15]) return 2 / Math.abs(e3[10]);
        let t3 = e3[10], r3 = 2 * e3[14] / (2 * t3 - 2);
        return Math.abs((t3 - 1) * r3 / (t3 + 1) - r3);
      }
      a.create(), i.create();
    }, 2136: function(e2, t2, r2) {
      function n(e3) {
        let t3 = new Uint8Array(e3.buffer, e3.byteOffset, e3.byteLength);
        return t3.length >= 3 && 31 === t3[0] && 139 === t3[1] && 8 === t3[2];
      }
      async function i(e3, t3, r3) {
        try {
          let n2 = s(e3 instanceof Response ? e3 : new Response(e3), t3, r3);
          return await new Response(n2).arrayBuffer();
        } catch {
          throw r3?.throwIfAborted(), Error(`Failed to decode ${t3}`);
        }
      }
      function s(e3, t3, r3) {
        return e3.body.pipeThrough(new DecompressionStream(t3), { signal: r3 });
      }
      r2.d(t2, { Nk: () => s, fK: () => n, lL: () => i });
    }, 290: function(e2, t2, r2) {
      r2.d(t2, { C$: () => v, CT: () => I, Iw: () => m, JG: () => T, Kh: () => E, PT: () => y, Qu: () => x, ZE: () => b, _b: () => l, c6: () => f, f6: () => g, hd: () => function e3(t3) {
        if ("object" == typeof t3) {
          if (null === t3) return "null";
          if (Array.isArray(t3)) {
            let r4 = "[", n3 = t3.length, i3 = 0;
            if (0 < n3) for (r4 += e3(t3[i3]); ++i3 < n3; ) r4 += ",", r4 += e3(t3[i3]);
            return r4 + "]";
          }
          let r3 = "{", n2 = Object.keys(t3).sort(), i2 = 0, s2 = n2.length;
          if (i2 < s2) {
            let a2 = n2[i2];
            for (r3 += JSON.stringify(a2), r3 += ":", r3 += e3(t3[a2]); ++i2 < s2; ) r3 += ",", r3 += JSON.stringify(a2 = n2[i2]), r3 += ":", r3 += e3(t3[a2]);
          }
          return r3 + "}";
        }
        return "bigint" == typeof t3 ? t3.toString() : JSON.stringify(t3);
      }, j2: () => k, jz: () => s, kt: () => w, lu: () => a, m7: () => p, nH: () => i, o7: () => o, tw: () => C, uq: () => S, zE: () => M });
      var n = r2(686);
      function i(e3) {
        let t3 = typeof e3;
        if ("number" === t3 || "string" === t3) {
          let t4 = parseFloat("" + e3);
          if (!Number.isNaN(t4)) return t4;
        }
        throw Error(`Expected floating-point number, but received: ${JSON.stringify(e3)}.`);
      }
      function s(e3) {
        let t3 = i(e3);
        if (Number.isFinite(t3)) return t3;
        throw Error(`Expected finite floating-point number, but received: ${t3}.`);
      }
      function a(e3) {
        let t3 = i(e3);
        if (Number.isFinite(t3) && t3 >= 0) return t3;
        throw Error(`Expected finite non-negative floating-point number, but received: ${t3}.`);
      }
      function o(e3) {
        let t3 = s(e3);
        if (t3 > 0) return t3;
        throw Error(`Expected positive finite floating-point number, but received: ${t3}.`);
      }
      function l(e3, t3) {
        let r3 = e3.length;
        if (!Array.isArray(t3) || t3.length !== r3) throw Error("Incompatible sizes");
        for (let e4 = 0; e4 < r3; ++e4) if (!Number.isFinite(parseFloat(t3[e4]))) throw Error("Non-finite value.");
        for (let n2 = 0; n2 < r3; ++n2) e3[n2] = parseFloat(t3[n2]);
        return e3;
      }
      r2(3783);
      let u = /('(?:[^'\\]|(?:\\.))*')/, h = /("(?:[^"\\]|(?:\\.))*")/, c = RegExp(`${u.source}|${h.source}`);
      RegExp(`${h.source}|${u.source}`);
      let d = /^((?:[^"'\\]|(?:\\[^']))*)("|\\')/;
      function f(e3) {
        return JSON.parse(function(e4) {
          let t3 = "";
          for (; e4.length > 0; ) {
            let r3, n2;
            let i2 = e4.match(c);
            if (null === i2) r3 = e4, e4 = "", n2 = "";
            else {
              r3 = e4.substr(0, i2.index), e4 = e4.substr(i2.index + i2[0].length);
              let t4 = i2[1];
              n2 = void 0 !== t4 ? function(e5, t5, r4, n3) {
                if (e5.length >= 2 && "'" === e5.charAt(0) && "'" === e5.charAt(e5.length - 1)) {
                  let i3 = e5.substr(1, e5.length - 2), s2 = '"';
                  for (; i3.length > 0; ) {
                    let e6 = i3.match(n3);
                    if (null === e6) {
                      s2 += i3;
                      break;
                    }
                    s2 += e6[1], '"' === e6[2] ? (s2 += "\\", s2 += r4) : s2 += t5, i3 = i3.substr(e6.index + e6[0].length);
                  }
                  return s2 + r4;
                }
                return e5;
              }(t4, "'", '"', d) : i2[2];
            }
            t3 += r3.replace(/\(/g, "[").replace(/\)/g, "]").replace("True", "true").replace("False", "false").replace(/,\s*([}\]])/g, "$1"), t3 += n2;
          }
          return t3;
        }(e3));
      }
      function g(e3, t3) {
        if (!Array.isArray(e3)) throw Error(`Expected array, but received: ${JSON.stringify(e3)}.`);
        if (void 0 !== t3 && e3.length !== t3) throw Error(`Expected array of length ${t3}, but received: ${JSON.stringify(e3)}.`);
        return e3;
      }
      function p(e3, t3) {
        if (!Array.isArray(e3)) throw Error(`Expected array, but received: ${JSON.stringify(e3)}.`);
        return e3.map(t3);
      }
      function m(e3, t3, r3) {
        let n2 = e3.length;
        if (!Array.isArray(t3) || t3.length !== n2) throw Error(`Expected length ${n2} array, but received: ${JSON.stringify(t3)}.`);
        for (let i2 = 0; i2 < n2; ++i2) e3[i2] = r3(t3[i2], i2);
        return e3;
      }
      function y(e3) {
        if ("object" != typeof e3 || null == e3 || Array.isArray(e3)) throw Error(`Expected JSON object, but received: ${JSON.stringify(e3)}.`);
        return e3;
      }
      function v(e3) {
        let t3 = parseInt(e3, 10);
        if (!Number.isInteger(t3)) throw Error(`Expected integer, but received: ${JSON.stringify(e3)}.`);
        return t3;
      }
      function b(e3) {
        if ("string" != typeof e3) throw Error(`Expected string, but received: ${JSON.stringify(e3)}.`);
        return e3;
      }
      function w(e3) {
        if (void 0 !== e3) return b(e3);
      }
      function S(e3, t3, r3) {
        let n2 = Object.prototype.hasOwnProperty.call(e3, t3) ? e3[t3] : void 0;
        try {
          return r3(n2);
        } catch (e4) {
          throw Error(`Error parsing ${JSON.stringify(t3)} property: ${e4.message}`);
        }
      }
      function E(e3, t3, r3, n2) {
        return S(e3, t3, (e4) => void 0 === e4 ? n2 : r3(e4));
      }
      function k(e3) {
        if ("number" != typeof e3 || !Number.isFinite(e3) || e3 < 0 || e3 > 1) throw Error(`Expected floating point number in [0,1], but received: ${JSON.stringify(e3)}.`);
        return e3;
      }
      function I(e3, t3, r3 = /^[a-zA-Z]/) {
        if ("string" == typeof e3 && null !== e3.match(r3)) {
          let r4 = e3.toUpperCase();
          if (Object.prototype.hasOwnProperty.call(t3, r4)) return t3[r4];
        }
        throw Error(`Invalid enum value: ${JSON.stringify(e3)}.`);
      }
      function M(e3) {
        if (!Array.isArray(e3)) throw Error(`Expected array, received: ${JSON.stringify(e3)}.`);
        for (let t3 of e3) if ("string" != typeof t3) throw Error(`Expected string, received: ${JSON.stringify(t3)}.`);
        return e3;
      }
      function x(e3) {
        if (!Array.isArray(e3)) throw Error(`Expected array, received: ${JSON.stringify(e3)}.`);
        for (let t3 of e3) if (!Number.isInteger(t3)) throw Error(`Expected integer, received: ${JSON.stringify(t3)}.`);
        return e3;
      }
      function T(e3) {
        if ("boolean" != typeof e3) throw Error(`Expected boolean, received: ${JSON.stringify(e3)}`);
        return e3;
      }
      function C(e3) {
        let t3;
        switch (typeof e3) {
          case "string":
            if (null === e3.match(/^(?:0|[1-9][0-9]*)$/)) throw Error(`Expected base-10 number, but received: ${JSON.stringify(e3)}`);
            t3 = BigInt(e3);
            break;
          case "number":
            t3 = BigInt(e3);
            break;
          case "bigint":
            t3 = e3;
            break;
          default:
            throw Error(`Expected uint64 value, but received: ${JSON.stringify(e3)}`);
        }
        if (t3 < 0n || t3 > n.Nr) throw Error(`Expected uint64 value, but received: ${t3}`);
        return t3;
      }
    }, 3853: function(e2, t2, r2) {
      let n;
      function i(e3, t3, r3 = t3) {
        return function(e4, t4, r4) {
          for (let n2 = 0; n2 < r4; ++n2) {
            let i2 = t4 * n2;
            e4.fill(0, i2, i2 + r4), e4[i2 + n2] = 1;
          }
          return e4;
        }(new e3(t3 * r3), t3, Math.min(t3, r3));
      }
      function s(e3, t3, r3, i2, s2) {
        return !function(e4, t4, r4, n2, i3, s3) {
          for (let a = 0; a < s3; ++a) {
            let s4 = a * n2, o = a * t4;
            for (let t5 = 0; t5 < i3; ++t5) e4[o + t5] = r4[s4 + t5];
          }
        }(e3, t3, r3, i2, s2, s2), function(e4, t4, r4) {
          let i3 = 1;
          (void 0 === n || n.length < r4) && (n = new Uint32Array(r4));
          for (let e5 = 0; e5 < r4; ++e5) n[e5] = e5;
          for (let s3 = 0; s3 < r4; ++s3) {
            let a = t4 * s3, o = s3;
            {
              let t5 = Math.abs(e4[a + s3]);
              for (let n2 = s3 + 1; n2 < r4; ++n2) {
                let r5 = Math.abs(e4[a + n2]);
                r5 > t5 && (t5 = r5, o = n2);
              }
            }
            if (s3 !== o) {
              i3 *= -1;
              for (let n2 = 0; n2 < r4; ++n2) {
                let r5 = t4 * n2, i4 = e4[r5 + s3];
                e4[r5 + s3] = e4[r5 + o], e4[r5 + o] = i4;
              }
              {
                let e5 = n[s3];
                n[s3] = n[o], n[o] = e5;
              }
            }
            let l = e4[a + s3], u = 1 / l;
            i3 *= l;
            for (let n2 = 0; n2 < r4; ++n2) e4[t4 * n2 + s3] *= u;
            e4[a + s3] = u;
            for (let n2 = 0; n2 < r4; ++n2) {
              if (n2 === s3) continue;
              let i4 = -e4[t4 * s3 + n2];
              for (let a2 = 0; a2 < r4; ++a2) {
                let r5 = t4 * a2;
                e4[r5 + n2] += i4 * e4[r5 + s3];
              }
              e4[t4 * s3 + n2] = i4 * u;
            }
          }
          for (let i4 = 0; i4 < r4; ++i4) {
            let s3 = n[i4];
            for (; s3 !== i4; ) {
              let a = t4 * i4, o = t4 * s3;
              for (let t5 = 0; t5 < r4; ++t5) {
                let r5 = a + t5, n2 = o + t5, i5 = e4[r5];
                e4[r5] = e4[n2], e4[n2] = i5;
              }
              let l = n[i4] = n[s3];
              n[s3] = s3, s3 = l;
            }
          }
          return i3;
        }(e3, t3, s2);
      }
      r2.d(t2, { SO: () => s, XD: () => i });
    }, 7734: function(e2, t2, r2) {
      r2.d(t2, { Vi: () => n, Zi: () => l });
      class n {
        constructor(e3, t3) {
          __publicField(this, "listener");
          __publicField(this, "id");
          __publicField(this, "startTime");
          __publicField(this, "message");
          this.listener = e3;
          let { id: r3 = Math.random(), startTime: n2 = Date.now(), message: i2 } = t3;
          this.id = r3, this.startTime = n2, this.message = i2, e3.addSpan(this);
        }
        [Symbol.dispose]() {
          this.listener.removeSpan(this.id);
        }
      }
      class i {
        constructor() {
          __publicField(this, "items", /* @__PURE__ */ new Map());
        }
        add(e3) {
          let { items: t3 } = this, r3 = (t3.get(e3) ?? 0) + 1;
          return t3.set(e3, r3), r3;
        }
        delete(e3) {
          let { items: t3 } = this, r3 = t3.get(e3);
          return r3 > 1 ? (r3 -= 1, t3.set(e3, r3), r3) : (t3.delete(e3), 0);
        }
        has(e3) {
          return this.items.has(e3);
        }
        keys() {
          return this.items.keys();
        }
        entries() {
          return this.items.entries();
        }
        [Symbol.iterator]() {
          return this.items.keys();
        }
      }
      class s {
        constructor(e3) {
          __publicField(this, "getKey");
          __publicField(this, "items");
          this.getKey = e3, this.items = /* @__PURE__ */ new Map();
        }
        add(e3) {
          let { items: t3 } = this, r3 = this.getKey(e3), n2 = t3.get(r3);
          return void 0 === n2 ? (t3.set(r3, { value: e3, count: 1 }), 1) : n2.count += 1;
        }
        delete(e3) {
          return this.deleteKey(this.getKey(e3));
        }
        deleteKey(e3) {
          let { items: t3 } = this, r3 = t3.get(e3);
          return void 0 !== r3 && r3.count > 1 ? r3.count -= 1 : (t3.delete(e3), 0);
        }
        has(e3) {
          return this.items.has(this.getKey(e3));
        }
        *[Symbol.iterator]() {
          for (let e3 of this.items.values()) yield e3.value;
        }
      }
      function a(e3) {
        return e3.id;
      }
      class o extends s {
        constructor() {
          super(a);
        }
      }
      class l {
        constructor() {
          __publicField(this, "spans", new o());
          __publicField(this, "listeners", new i());
        }
        addSpan(e3) {
          if (1 === this.spans.add(e3)) for (let t3 of this.listeners) t3.addSpan(e3);
        }
        removeSpan(e3) {
          if (0 === this.spans.deleteKey(e3)) for (let t3 of this.listeners) t3.removeSpan(e3);
        }
        addListener(e3) {
          if (void 0 !== e3 && 1 === this.listeners.add(e3)) for (let t3 of this.spans) e3.addSpan(t3);
        }
        removeListener(e3) {
          if (void 0 !== e3 && 0 === this.listeners.delete(e3)) for (let t3 of this.spans) e3.removeSpan(t3.id);
        }
      }
    }, 6224: function(e2, t2, r2) {
      function n(e3 = 128) {
        let t3 = Math.ceil(e3 / 32), r3 = new Uint32Array(t3);
        crypto.getRandomValues(r3);
        let i2 = "";
        for (let e4 = 0; e4 < t3; ++e4) i2 += ("00000000" + r3[e4].toString(16)).slice(-8);
        return i2;
      }
      function i(e3) {
        let t3 = new Uint8Array(e3.buffer, e3.byteOffset, e3.byteLength);
        for (let e4 = 0, r3 = t3.length; e4 < r3; e4 += 65536) crypto.getRandomValues(t3.subarray(e4, Math.min(r3, e4 + 65536)));
        return e3;
      }
      r2.d(t2, { PP: () => i, c0: () => n });
    }, 566: function(e2, t2, r2) {
      r2.d(t2, { K_: () => i, MZ: () => n });
      class n {
        constructor() {
          __publicField(this, "handlers", /* @__PURE__ */ new Set());
          __publicField(this, "count", 0);
          __publicField(this, "dispatch");
          let e3 = this;
          this.dispatch = function() {
            ++e3.count, e3.handlers.forEach((e4) => {
              e4.apply(this, arguments);
            });
          };
        }
        add(e3) {
          return this.handlers.add(e3), () => this.remove(e3);
        }
        addOnce(e3) {
          let { handlers: t3 } = this;
          t3.add(function r3(...n2) {
            t3.delete(r3), e3(...n2);
          });
        }
        remove(e3) {
          return this.handlers.delete(e3);
        }
        dispose() {
          this.handlers = void 0;
        }
      }
      class i extends n {
      }
    }, 1949: function(e2, t2, r2) {
      let n, i, s;
      r2(2374);
      var a, o, l, u, h, c, d, f, g, p, m, y, v, b, w, S, E, k = r2(3719), I = r2(2606), M = r2(106), x = r2(7734);
      let T = !("undefined" != typeof Window && self instanceof Window), C = "rpc.promise.response", N = "rpc.promise.cancel", $ = "rpc.promise.addProgressSpan", R = "rpc.promise.removeProgressSpan", P = "rpc.ready", O = /* @__PURE__ */ new Map();
      function U(e10, t10) {
        O.set(e10, t10);
      }
      class _ {
        constructor(e10, t10) {
          __publicField(this, "rpc");
          __publicField(this, "id");
          this.rpc = e10, this.id = t10;
        }
        addSpan(e10) {
          this.rpc.invoke($, { id: this.id, span: { id: e10.id, message: e10.message, startTime: e10.startTime } });
        }
        removeSpan(e10) {
          this.rpc.invoke(R, { id: this.id, spanId: e10 });
        }
      }
      function A(e10, t10) {
        U(e10, function(e11) {
          let r10;
          let n10 = e11.id, i10 = new AbortController();
          true === e11.progressListener && (r10 = new _(this, n10));
          let s10 = t10.call(this, e11, { signal: i10.signal, progressListener: r10 });
          this.set(n10, { promise: s10, abortController: i10 }), s10.then(({ value: e12, transfers: t11 }) => {
            this.delete(n10), this.invoke(C, { id: n10, value: e12 }, t11);
          }, (e12) => {
            this.delete(n10), this.invoke(C, { id: n10, error: e12 });
          });
        });
      }
      U(N, function(e10) {
        let t10 = e10.id, r10 = this.get(t10);
        if (void 0 !== r10) {
          let { abortController: e11 } = r10;
          e11.abort();
        }
      }), U(C, function(e10) {
        let t10 = e10.id, { resolve: r10, reject: n10 } = this.get(t10);
        this.delete(t10), Object.prototype.hasOwnProperty.call(e10, "value") ? r10(e10.value) : n10(e10.error);
      }), U($, function(e10) {
        let t10 = e10.id, { progressListener: r10 } = this.get(t10);
        new x.Vi(r10, e10.span);
      }), U(R, function(e10) {
        let t10 = e10.id, { progressListener: r10 } = this.get(t10);
        r10.removeSpan(e10.spanId);
      }), U(P, function(e10) {
        this.onPeerReady();
      });
      let L = T ? -1 : 0;
      class D extends M.gj {
        constructor() {
          super(...arguments);
          __publicField(this, "rpc", null);
          __publicField(this, "rpcId", null);
          __publicField(this, "isOwner");
          __publicField(this, "unreferencedGeneration");
          __publicField(this, "referencedGeneration");
        }
        initializeSharedObject(e10, t10 = e10.newId()) {
          this.rpc = e10, this.rpcId = t10, this.isOwner = false, e10.set(t10, this);
        }
        initializeCounterpart(e10, t10 = {}) {
          this.initializeSharedObject(e10), this.unreferencedGeneration = 0, this.referencedGeneration = 0, this.isOwner = true, t10.id = this.rpcId, t10.type = this.RPC_TYPE_ID, e10.invoke("SharedObject.new", t10);
        }
        dispose() {
          super.dispose();
        }
        addCounterpartRef() {
          return { id: this.rpcId, gen: ++this.referencedGeneration };
        }
        refCountReachedZero() {
          true === this.isOwner ? this.referencedGeneration === this.unreferencedGeneration && this.ownerDispose() : false === this.isOwner ? this.rpc.invoke("SharedObject.refCountReachedZero", { id: this.rpcId, gen: this.referencedGeneration }) : super.refCountReachedZero();
        }
        ownerDispose() {
          let { rpc: e10, rpcId: t10 } = this;
          super.refCountReachedZero(), e10.delete(t10), e10.invoke("SharedObject.dispose", { id: t10 });
        }
        counterpartRefCountReachedZero(e10) {
          this.unreferencedGeneration = e10, 0 === this.refCount && e10 === this.referencedGeneration && this.ownerDispose();
        }
      }
      function z(e10, t10, r10 = {}) {
        null != t10 && e10.initializeSharedObject(t10, r10.id);
      }
      class B extends D {
        constructor(e10, t10 = {}) {
          super(), z(this, e10, t10);
        }
      }
      U("SharedObject.dispose", function(e10) {
        let t10 = this.get(e10.id);
        if (0 !== t10.refCount) throw Error("Attempted to dispose object with non-zero reference count.");
        t10.disposed(), this.delete(t10.rpcId), t10.rpcId = null, t10.rpc = null;
      }), U("SharedObject.refCountReachedZero", function(e10) {
        let t10 = this.get(e10.id), r10 = e10.gen;
        t10.counterpartRefCountReachedZero(r10);
      });
      let j = /* @__PURE__ */ new Map();
      function F(e10) {
        return (t10) => {
          if (void 0 !== e10) t10.prototype.RPC_TYPE_ID = e10;
          else if (void 0 === (e10 = t10.prototype.RPC_TYPE_ID)) throw Error("RPC_TYPE_ID should have already been defined");
          j.set(e10, t10);
        };
      }
      U("SharedObject.new", function(e10) {
        let t10 = e10.type, r10 = new (j.get(t10))(this, e10);
        --r10.refCount;
      });
      let V = "SharedWatchableValue.changed";
      class G extends B {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          __publicField(this, "base");
          __publicField(this, "updatingValue_", false);
          void 0 !== e10 && (this.base = new k.SN(t10.value), this.setupChangedHandler());
        }
        initializeCounterpart(e10, t10 = {}) {
          t10.value = this.value, super.initializeCounterpart(e10, t10);
        }
        setupChangedHandler() {
          this.registerDisposer(this.base.changed.add(() => {
            if (this.updatingValue_) this.updatingValue_ = false;
            else {
              let { rpc: e10 } = this;
              null !== e10 && e10.invoke(V, { id: this.rpcId, value: this.value });
            }
          }));
        }
        static makeFromExisting(e10, t10) {
          let r10 = new G();
          return r10.base = t10, r10.setupChangedHandler(), r10.initializeCounterpart(e10), r10;
        }
        static make(e10, t10) {
          return G.makeFromExisting(e10, new k.SN(t10));
        }
        get value() {
          return this.base.value;
        }
        set value(e10) {
          this.base.value = e10;
        }
        get changed() {
          return this.base.changed;
        }
      }
      G = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F("SharedWatchableValue")], G), U(V, function(e10) {
        let t10 = this.get(e10.id);
        t10.updatingValue_ = true, t10.base.value = e10.value, t10.updatingValue_ = false;
      });
      var K = r2(8709), q = ((a = {})[a.GPU_MEMORY = 0] = "GPU_MEMORY", a[a.SYSTEM_MEMORY = 1] = "SYSTEM_MEMORY", a[a.SYSTEM_MEMORY_WORKER = 2] = "SYSTEM_MEMORY_WORKER", a[a.DOWNLOADING = 3] = "DOWNLOADING", a[a.QUEUED = 4] = "QUEUED", a[a.NEW = 5] = "NEW", a[a.FAILED = 6] = "FAILED", a[a.EXPIRED = 7] = "EXPIRED", a), Y = ((o = {})[o.FIRST_TIER = 0] = "FIRST_TIER", o[o.FIRST_ORDERED_TIER = 0] = "FIRST_ORDERED_TIER", o[o.VISIBLE = 0] = "VISIBLE", o[o.PREFETCH = 1] = "PREFETCH", o[o.LAST_ORDERED_TIER = 1] = "LAST_ORDERED_TIER", o[o.RECENT = 2] = "RECENT", o[o.LAST_TIER = 2] = "LAST_TIER", o), J = ((l = {})[l.totalTime = 0] = "totalTime", l[l.totalChunks = 1] = "totalChunks", l), W = ((u = {})[u.numChunks = 0] = "numChunks", u[u.systemMemoryBytes = 1] = "systemMemoryBytes", u[u.gpuMemoryBytes = 2] = "gpuMemoryBytes", u), Z = r2(7902), X = r2(4571);
      function Q(e10) {
        let { child: t10, next: r10, prev: n10, compare: i10 } = e10;
        function s10(e11) {
          let i11 = e11[t10];
          if (null === i11) return null;
          let s11 = null;
          for (; ; ) {
            let e12, t11;
            let n11 = i11[r10];
            if (null === n11 ? (e12 = null, t11 = i11) : (e12 = n11[r10], t11 = a10(i11, n11)), t11[r10] = s11, s11 = t11, null === e12) break;
            i11 = e12;
          }
          let o11 = s11;
          for (s11 = s11[r10]; null !== s11; ) {
            let e12 = s11[r10];
            o11 = a10(o11, s11), s11 = e12;
          }
          return o11[n10] = null, o11[r10] = null, o11;
        }
        function a10(e11, s11) {
          if (null === s11) return e11;
          if (null === e11) return s11;
          if (i10(s11, e11)) {
            let t11 = e11;
            e11 = s11, s11 = t11;
          }
          let a11 = e11[t10];
          return s11[r10] = a11, s11[n10] = e11, null !== a11 && (a11[n10] = s11), e11[t10] = s11, e11;
        }
        function o10(e11) {
          let i11 = s10(e11);
          return e11[r10] = null, e11[n10] = null, e11[t10] = null, i11;
        }
        function* l2(e11) {
          if (null !== e11) {
            let n11 = e11[t10];
            for (yield e11; null !== n11; ) {
              let e12 = n11[r10];
              yield* l2(n11), n11 = e12;
            }
          }
        }
        return { compare: i10, meld: a10, removeMin: o10, remove: function(e11, i11) {
          if (e11 === i11) return o10(e11);
          let l3 = i11[n10], u2 = i11[r10];
          l3[t10] === i11 ? l3[t10] = u2 : l3[r10] = u2, null !== u2 && (u2[n10] = l3);
          let h2 = a10(e11, s10(i11));
          return i11[r10] = null, i11[n10] = null, i11[t10] = null, h2;
        }, entries: l2, removedEntries: function* (e11) {
          if (null !== e11) {
            let i11 = e11[t10];
            for (e11[t10] = null, e11[r10] = null, e11[n10] = null, yield e11; null !== i11; ) {
              let e12 = i11[r10];
              i11[t10] = null, i11[r10] = null, i11[n10] = null, yield* l2(i11), i11 = e12;
            }
          }
        } };
      }
      var H = r2(566);
      function ee(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      let et = 0;
      class er {
        constructor() {
          __publicField(this, "child0", null);
          __publicField(this, "next0", null);
          __publicField(this, "prev0", null);
          __publicField(this, "child1", null);
          __publicField(this, "next1", null);
          __publicField(this, "prev1", null);
          __publicField(this, "source", null);
          __publicField(this, "key", null);
          __publicField(this, "state_", q.NEW);
          __publicField(this, "error", null);
          __publicField(this, "markGeneration", -1);
          __publicField(this, "priority", 0);
          __publicField(this, "newPriority", 0);
          __publicField(this, "priorityTier", Y.RECENT);
          __publicField(this, "newPriorityTier", Y.RECENT);
          __publicField(this, "systemMemoryBytes_", 0);
          __publicField(this, "gpuMemoryBytes_", 0);
          __publicField(this, "downloadSlots_", 1);
          __publicField(this, "isComputational", false);
          __publicField(this, "requestedState", q.NEW);
          __publicField(this, "newRequestedState", q.NEW);
          __publicField(this, "downloadAbortController");
        }
        initialize(e10) {
          this.key = e10, this.priority = Number.NEGATIVE_INFINITY, this.priorityTier = Y.RECENT, this.newPriority = Number.NEGATIVE_INFINITY, this.newPriorityTier = Y.RECENT, this.error = null, this.state = q.NEW, this.requestedState = q.NEW, this.newRequestedState = q.NEW;
        }
        updatePriorityProperties() {
          this.priorityTier = this.newPriorityTier, this.priority = this.newPriority, this.newPriorityTier = Y.RECENT, this.newPriority = Number.NEGATIVE_INFINITY, this.requestedState = this.newRequestedState, this.newRequestedState = q.NEW;
        }
        dispose() {
          this.source = null, this.error = null;
        }
        get chunkManager() {
          return this.source.chunkManager;
        }
        get queueManager() {
          return this.source.chunkManager.queueManager;
        }
        downloadFailed(e10) {
          this.error = e10, this.queueManager.updateChunkState(this, q.FAILED);
        }
        downloadSucceeded() {
          this.requestedState === q.SYSTEM_MEMORY ? (this.queueManager.moveChunkToFrontend(this), this.queueManager.updateChunkState(this, q.SYSTEM_MEMORY)) : this.queueManager.updateChunkState(this, q.SYSTEM_MEMORY_WORKER);
        }
        freeSystemMemory() {
        }
        serialize(e10, t10) {
          e10.id = this.key, e10.source = this.source.rpcId, e10.new = true;
        }
        toString() {
          return this.key;
        }
        set state(e10) {
          if (e10 === this.state_) return;
          let t10 = this.state_;
          this.state_ = e10, this.source.chunkStateChanged(this, t10);
        }
        get state() {
          return this.state_;
        }
        set systemMemoryBytes(e10) {
          ei(this, -1), this.chunkManager.queueManager.adjustCapacitiesForChunk(this, false), this.systemMemoryBytes_ = e10, this.chunkManager.queueManager.adjustCapacitiesForChunk(this, true), ei(this, 1), this.chunkManager.queueManager.scheduleUpdate();
        }
        get systemMemoryBytes() {
          return this.systemMemoryBytes_;
        }
        set gpuMemoryBytes(e10) {
          ei(this, -1), this.chunkManager.queueManager.adjustCapacitiesForChunk(this, false), this.gpuMemoryBytes_ = e10, this.chunkManager.queueManager.adjustCapacitiesForChunk(this, true), ei(this, 1), this.chunkManager.queueManager.scheduleUpdate();
        }
        get gpuMemoryBytes() {
          return this.gpuMemoryBytes_;
        }
        get downloadSlots() {
          return this.downloadSlots_;
        }
        set downloadSlots(e10) {
          e10 !== this.downloadSlots_ && (ei(this, -1), this.chunkManager.queueManager.adjustCapacitiesForChunk(this, false), this.downloadSlots_ = e10, this.chunkManager.queueManager.adjustCapacitiesForChunk(this, true), ei(this, 1), this.chunkManager.queueManager.scheduleUpdate());
        }
        registerListener(e10) {
          return !!this.source && this.source.registerChunkListener(this.key, e10);
        }
        unregisterListener(e10) {
          return !!this.source && this.source.unregisterChunkListener(this.key, e10);
        }
        static priorityLess(e10, t10) {
          return e10.priority < t10.priority;
        }
        static priorityGreater(e10, t10) {
          return e10.priority > t10.priority;
        }
      }
      class en extends D {
        constructor(e10) {
          super();
          __publicField(this, "chunkManager");
          __publicField(this, "listeners_");
          __publicField(this, "chunks");
          __publicField(this, "freeChunks");
          __publicField(this, "statistics");
          __publicField(this, "sourceQueueLevel");
          this.chunkManager = e10, this.listeners_ = /* @__PURE__ */ new Map(), this.chunks = /* @__PURE__ */ new Map(), this.freeChunks = [], this.statistics = new Float64Array(74), this.sourceQueueLevel = 0, e10.queueManager.sources.add(this);
        }
        disposed() {
          this.chunkManager.queueManager.sources.delete(this), super.disposed();
        }
        getNewChunk_(e10) {
          let t10 = this.freeChunks, r10 = t10.length;
          if (r10 > 0) {
            let e11 = t10[r10 - 1];
            return t10.length = r10 - 1, e11.source = this, e11;
          }
          let n10 = new e10();
          return n10.source = this, n10;
        }
        addChunk(e10) {
          let { chunks: t10 } = this;
          0 === t10.size && this.addRef(), t10.set(e10.key, e10), ei(e10, 1);
        }
        removeChunk(e10) {
          let { chunks: t10, freeChunks: r10 } = this;
          t10.delete(e10.key), e10.dispose(), r10[r10.length] = e10, 0 === t10.size && this.dispose();
        }
        registerChunkListener(e10, t10) {
          return this.listeners_.has(e10) ? this.listeners_.get(e10).push(t10) : this.listeners_.set(e10, [t10]), true;
        }
        unregisterChunkListener(e10, t10) {
          if (!this.listeners_.has(e10)) return false;
          let r10 = this.listeners_.get(e10), n10 = r10.indexOf(t10);
          return !(n10 < 0) && (r10.splice(n10, 1), 0 === r10.length && this.listeners_.delete(e10), true);
        }
        chunkStateChanged(e10, t10) {
          let { key: r10 } = e10;
          if (null === r10) return;
          let n10 = this.listeners_.get(r10);
          if (void 0 !== n10) for (let r11 of n10.slice()) r11(e10, t10);
        }
      }
      function ei(e10, t10) {
        let { statistics: r10 } = e10.source, { systemMemoryBytes: n10, gpuMemoryBytes: i10 } = e10, s10 = 3 * e10.state + e10.priorityTier;
        r10[3 * s10 + W.numChunks] += t10, r10[3 * s10 + W.systemMemoryBytes] += t10 * n10, r10[3 * s10 + W.gpuMemoryBytes] += t10 * i10;
      }
      class es extends en {
        constructor(e10, t10) {
          super(e10.get(t10.chunkManager)), z(this, e10, t10);
        }
      }
      function ea(e10) {
        let t10 = e10.downloadAbortController;
        e10.downloadAbortController = void 0, t10.abort(new DOMException("chunk download cancelled", "AbortError"));
      }
      class eo {
        constructor(e10, t10) {
          __publicField(this, "heapOperations");
          __publicField(this, "linkedListOperations");
          __publicField(this, "heapRoots");
          __publicField(this, "recentHead");
          this.heapOperations = e10, this.linkedListOperations = t10, this.heapRoots = [null, null], this.recentHead = new er(), t10.initializeHead(this.recentHead);
        }
        add(e10) {
          let t10 = e10.priorityTier;
          if (t10 === Y.RECENT) this.linkedListOperations.insertAfter(this.recentHead, e10);
          else {
            let { heapRoots: r10 } = this;
            r10[t10] = this.heapOperations.meld(r10[t10], e10);
          }
        }
        *candidates() {
          if (this.heapOperations.compare === er.priorityLess) {
            let { linkedListOperations: e10, recentHead: t10 } = this;
            for (; ; ) {
              let r11 = e10.back(t10);
              if (null == r11) break;
              yield r11;
            }
            let { heapRoots: r10 } = this;
            for (let e11 = Y.LAST_ORDERED_TIER; e11 >= Y.FIRST_ORDERED_TIER; --e11) for (; ; ) {
              let t11 = r10[e11];
              if (null == t11) break;
              yield t11;
            }
          } else {
            let e10 = this.heapRoots;
            for (let t11 = Y.FIRST_ORDERED_TIER; t11 <= Y.LAST_ORDERED_TIER; ++t11) for (; ; ) {
              let r11 = e10[t11];
              if (null == r11) break;
              yield r11;
            }
            let { linkedListOperations: t10, recentHead: r10 } = this;
            for (; ; ) {
              let e11 = t10.front(r10);
              if (null == e11) break;
              yield e11;
            }
          }
        }
        delete(e10) {
          let t10 = e10.priorityTier;
          if (t10 === Y.RECENT) this.linkedListOperations.pop(e10);
          else {
            let r10 = this.heapRoots;
            r10[t10] = this.heapOperations.remove(r10[t10], e10);
          }
        }
      }
      let el = (0, Z.Z)({ next: "next0", prev: "prev0" }), eu = (0, Z.Z)({ next: "next1", prev: "prev1" });
      function eh(e10) {
        return new eo(Q({ compare: e10, child: "child1", next: "next1", prev: "prev1" }), eu);
      }
      function ec(e10, t10, r10, n10, i10, s10) {
        for (; t10.availableItems < 1 || t10.availableSize < e10; ) {
          let e11 = i10.next().value;
          if (void 0 === e11) return false;
          let t11 = e11.priorityTier;
          if (t11 < r10 || t11 === r10 && e11.priority >= n10) return false;
          s10(e11);
        }
        return true;
      }
      class ed extends M.gj {
        constructor(e10, t10) {
          super();
          __publicField(this, "itemLimit");
          __publicField(this, "sizeLimit");
          __publicField(this, "currentSize");
          __publicField(this, "currentItems");
          __publicField(this, "capacityChanged");
          this.itemLimit = e10, this.sizeLimit = t10, this.currentSize = 0, this.currentItems = 0, this.capacityChanged = new H.K_(), this.registerDisposer(e10.changed.add(this.capacityChanged.dispatch)), this.registerDisposer(t10.changed.add(this.capacityChanged.dispatch));
        }
        adjust(e10, t10) {
          this.currentItems -= e10, this.currentSize -= t10;
        }
        get availableSize() {
          return this.sizeLimit.value - this.currentSize;
        }
        get availableItems() {
          return this.itemLimit.value - this.currentItems;
        }
        toString() {
          return `bytes=${this.currentSize}/${this.sizeLimit.value},items=${this.currentItems}/${this.itemLimit.value}`;
        }
      }
      class ef extends B {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "gpuMemoryCapacity");
          __publicField(this, "systemMemoryCapacity");
          __publicField(this, "downloadCapacity");
          __publicField(this, "computeCapacity");
          __publicField(this, "enablePrefetch");
          __publicField(this, "sources", /* @__PURE__ */ new Set());
          __publicField(this, "queuedDownloadPromotionQueue", [eh(er.priorityGreater), eh(er.priorityGreater)]);
          __publicField(this, "queuedComputePromotionQueue", eh(er.priorityGreater));
          __publicField(this, "downloadEvictionQueue", [eh(er.priorityLess), eh(er.priorityLess)]);
          __publicField(this, "computeEvictionQueue", eh(er.priorityLess));
          __publicField(this, "systemMemoryEvictionQueue", new eo(Q({ compare: er.priorityLess, child: "child0", next: "next0", prev: "prev0" }), el));
          __publicField(this, "gpuMemoryPromotionQueue", eh(er.priorityGreater));
          __publicField(this, "gpuMemoryEvictionQueue", eh(er.priorityLess));
          __publicField(this, "updatePending", null);
          __publicField(this, "gpuMemoryChanged", new H.K_());
          __publicField(this, "numQueued", 0);
          __publicField(this, "numFailed", 0);
          __publicField(this, "gpuMemoryGeneration", 0);
          let r10 = (t11) => {
            let r11 = this.registerDisposer(new ed(e10.get(t11.itemLimit), e10.get(t11.sizeLimit)));
            return r11.capacityChanged.add(() => this.scheduleUpdate()), r11;
          };
          this.gpuMemoryCapacity = r10(t10.gpuMemoryCapacity), this.systemMemoryCapacity = r10(t10.systemMemoryCapacity), this.enablePrefetch = e10.get(t10.enablePrefetch), this.downloadCapacity = [r10(t10.downloadCapacity), r10(t10.downloadCapacity)], this.computeCapacity = r10(t10.computeCapacity);
        }
        scheduleUpdate() {
          null === this.updatePending && (this.updatePending = setTimeout(this.process.bind(this), 0));
        }
        *chunkQueuesForChunk(e10) {
          switch (e10.state) {
            case q.QUEUED:
              e10.isComputational ? yield this.queuedComputePromotionQueue : yield this.queuedDownloadPromotionQueue[e10.source.sourceQueueLevel];
              break;
            case q.DOWNLOADING:
              e10.isComputational ? yield this.computeEvictionQueue : (yield this.downloadEvictionQueue[e10.source.sourceQueueLevel], yield this.systemMemoryEvictionQueue);
              break;
            case q.SYSTEM_MEMORY_WORKER:
            case q.SYSTEM_MEMORY:
              yield this.systemMemoryEvictionQueue, e10.requestedState === q.GPU_MEMORY && (yield this.gpuMemoryPromotionQueue);
              break;
            case q.GPU_MEMORY:
              yield this.systemMemoryEvictionQueue, yield this.gpuMemoryEvictionQueue;
          }
        }
        adjustCapacitiesForChunk(e10, t10) {
          let r10 = t10 ? -1 : 1;
          switch (e10.state) {
            case q.FAILED:
              this.numFailed -= r10;
              break;
            case q.QUEUED:
              this.numQueued -= r10;
              break;
            case q.DOWNLOADING:
              (e10.isComputational ? this.computeCapacity : this.downloadCapacity[e10.source.sourceQueueLevel]).adjust(r10 * e10.downloadSlots, r10 * e10.systemMemoryBytes), this.systemMemoryCapacity.adjust(r10, r10 * e10.systemMemoryBytes);
              break;
            case q.SYSTEM_MEMORY:
            case q.SYSTEM_MEMORY_WORKER:
              this.systemMemoryCapacity.adjust(r10, r10 * e10.systemMemoryBytes);
              break;
            case q.GPU_MEMORY:
              this.systemMemoryCapacity.adjust(r10, r10 * e10.systemMemoryBytes), this.gpuMemoryCapacity.adjust(r10, r10 * e10.gpuMemoryBytes);
          }
        }
        removeChunkFromQueues_(e10) {
          for (let t10 of (ei(e10, -1), this.chunkQueuesForChunk(e10))) t10.delete(e10);
        }
        addChunkToQueues_(e10) {
          if (e10.state === q.QUEUED && e10.priorityTier === Y.RECENT) {
            let { source: t10 } = e10;
            return t10.removeChunk(e10), this.adjustCapacitiesForChunk(e10, false), false;
          }
          for (let t10 of (ei(e10, 1), this.chunkQueuesForChunk(e10))) t10.add(e10);
          return true;
        }
        performChunkPriorityUpdate(e10) {
          if (e10.priorityTier === e10.newPriorityTier && e10.priority === e10.newPriority) {
            e10.newPriorityTier = Y.RECENT, e10.newPriority = Number.NEGATIVE_INFINITY;
            return;
          }
          this.removeChunkFromQueues_(e10), e10.updatePriorityProperties(), e10.state === q.NEW && (e10.state = q.QUEUED, this.adjustCapacitiesForChunk(e10, true)), this.addChunkToQueues_(e10);
        }
        updateChunkState(e10, t10) {
          t10 !== e10.state && (this.adjustCapacitiesForChunk(e10, false), this.removeChunkFromQueues_(e10), e10.state = t10, this.adjustCapacitiesForChunk(e10, true), this.addChunkToQueues_(e10), this.scheduleUpdate());
        }
        markRecentlyUsed(e10) {
          this.removeChunkFromQueues_(e10), this.addChunkToQueues_(e10);
        }
        processGPUPromotions_() {
          let e10 = this;
          function t10(t11) {
            e10.freeChunkGPUMemory(t11), t11.source.chunkManager.queueManager.updateChunkState(t11, q.SYSTEM_MEMORY);
          }
          let r10 = this.gpuMemoryPromotionQueue.candidates(), n10 = this.gpuMemoryEvictionQueue.candidates(), i10 = this.gpuMemoryCapacity;
          for (; ; ) {
            let e11 = r10.next().value;
            if (void 0 === e11) break;
            let s10 = e11.priorityTier, a10 = e11.priority;
            if (!ec(e11.gpuMemoryBytes, i10, s10, a10, n10, t10)) break;
            this.copyChunkToGPU(e11), this.updateChunkState(e11, q.GPU_MEMORY);
          }
        }
        freeChunkGPUMemory(e10) {
          ++this.gpuMemoryGeneration, this.rpc.invoke("Chunk.update", { id: e10.key, state: q.SYSTEM_MEMORY, source: e10.source.rpcId });
        }
        freeChunkSystemMemory(e10) {
          e10.state === q.SYSTEM_MEMORY_WORKER ? e10.freeSystemMemory() : this.rpc.invoke("Chunk.update", { id: e10.key, state: q.EXPIRED, source: e10.source.rpcId });
        }
        retrieveChunkData(e10) {
          return this.rpc.promiseInvoke("Chunk.retrieve", { key: e10.key, source: e10.source.rpcId });
        }
        copyChunkToGPU(e10) {
          ++this.gpuMemoryGeneration;
          let t10 = this.rpc;
          if (e10.state === q.SYSTEM_MEMORY) t10.invoke("Chunk.update", { id: e10.key, source: e10.source.rpcId, state: q.GPU_MEMORY });
          else {
            let r10 = {}, n10 = [];
            e10.serialize(r10, n10), r10.state = q.GPU_MEMORY, t10.invoke("Chunk.update", r10, n10);
          }
        }
        moveChunkToFrontend(e10) {
          let t10 = this.rpc, r10 = {}, n10 = [];
          e10.serialize(r10, n10), r10.state = q.SYSTEM_MEMORY, t10.invoke("Chunk.update", r10, n10);
        }
        processQueuePromotions_() {
          let e10 = (e11) => {
            switch (e11.state) {
              case q.DOWNLOADING:
                ea(e11);
                break;
              case q.GPU_MEMORY:
                this.freeChunkGPUMemory(e11);
              case q.SYSTEM_MEMORY_WORKER:
              case q.SYSTEM_MEMORY:
                this.freeChunkSystemMemory(e11);
            }
            this.updateChunkState(e11, q.QUEUED);
          }, t10 = (t11, r10, n10) => {
            let i10 = this.systemMemoryEvictionQueue.candidates(), s10 = this.systemMemoryCapacity;
            for (; ; ) {
              let a10 = t11.next();
              if (a10.done) return;
              let o10 = a10.value, l2 = o10.priorityTier, u2 = o10.priority;
              if (!ec(0, n10, l2, u2, r10, e10) || !ec(0, s10, l2, u2, i10, e10)) return;
              this.updateChunkState(o10, q.DOWNLOADING), function(e11) {
                let t12 = e11.downloadAbortController = new AbortController(), r11 = Date.now();
                e11.source.download(e11, t12.signal).then(() => {
                  if (e11.downloadAbortController === t12) {
                    e11.downloadAbortController = void 0;
                    let t13 = Date.now(), { statistics: n11 } = e11.source;
                    n11[72 + J.totalTime] += t13 - r11, ++n11[72 + J.totalChunks], e11.downloadSucceeded();
                  }
                }, (r12) => {
                  e11.downloadAbortController === t12 && (e11.downloadAbortController = void 0, e11.downloadFailed(r12), console.log(`Error retrieving chunk ${e11}: ${r12}`));
                });
              }(o10);
            }
          };
          for (let e11 = 0; e11 < 2; ++e11) t10(this.queuedDownloadPromotionQueue[e11].candidates(), this.downloadEvictionQueue[e11].candidates(), this.downloadCapacity[e11]);
          t10(this.queuedComputePromotionQueue.candidates(), this.computeEvictionQueue.candidates(), this.computeCapacity);
        }
        process() {
          if (!this.updatePending) return;
          this.updatePending = null;
          let e10 = this.gpuMemoryGeneration;
          this.processGPUPromotions_(), this.processQueuePromotions_(), this.logStatistics(), this.gpuMemoryGeneration !== e10 && this.gpuMemoryChanged.dispatch();
        }
        logStatistics() {
        }
        invalidateSourceCache(e10) {
          for (let t10 of e10.chunks.values()) {
            switch (t10.state) {
              case q.DOWNLOADING:
                ea(t10);
                break;
              case q.SYSTEM_MEMORY_WORKER:
                t10.freeSystemMemory();
            }
            this.updateChunkState(t10, q.QUEUED);
          }
          this.rpc.invoke("Chunk.update", { source: e10.rpcId }), this.scheduleUpdate();
        }
      }
      ef = ee([F("ChunkQueueManager")], ef);
      class eg extends B {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkManagerGeneration", -1);
          __publicField(this, "numVisibleChunksNeeded", 0);
          __publicField(this, "numVisibleChunksAvailable", 0);
          __publicField(this, "numPrefetchChunksNeeded", 0);
          __publicField(this, "numPrefetchChunksAvailable", 0);
        }
      }
      class ep extends B {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "queueManager");
          __publicField(this, "existingTierChunks", []);
          __publicField(this, "newTierChunks", []);
          __publicField(this, "updatePending", null);
          __publicField(this, "recomputeChunkPriorities", new H.K_());
          __publicField(this, "recomputeChunkPrioritiesLate", new H.K_());
          __publicField(this, "memoize", new X.O1());
          __publicField(this, "layers", []);
          __publicField(this, "sendLayerChunkStatistics", this.registerCancellable((0, K.Z)(() => {
            this.rpc.invoke("ChunkManager.chunkLayerStatistics", { id: this.rpcId, layers: this.layers.map((e10) => ({ id: e10.rpcId, numVisibleChunksAvailable: e10.numVisibleChunksAvailable, numVisibleChunksNeeded: e10.numVisibleChunksNeeded, numPrefetchChunksAvailable: e10.numPrefetchChunksAvailable, numPrefetchChunksNeeded: e10.numPrefetchChunksNeeded })) });
          }, 200)));
          this.queueManager = e10.get(t10.chunkQueueManager).addRef(), this.registerDisposer(this.queueManager.gpuMemoryChanged.add(this.registerCancellable((0, K.Z)(() => this.scheduleUpdateChunkPriorities(), 200, { leading: false, trailing: true }))));
          for (let e11 = Y.FIRST_TIER; e11 <= Y.LAST_TIER; ++e11) e11 !== Y.RECENT && (this.existingTierChunks[e11] = []);
        }
        scheduleUpdateChunkPriorities() {
          null === this.updatePending && (this.updatePending = setTimeout(this.recomputeChunkPriorities_.bind(this), 0));
        }
        registerLayer(e10) {
          let t10 = this.recomputeChunkPriorities.count;
          e10.chunkManagerGeneration !== t10 && (e10.chunkManagerGeneration = t10, this.layers.push(e10), e10.numVisibleChunksAvailable = 0, e10.numVisibleChunksNeeded = 0, e10.numPrefetchChunksAvailable = 0, e10.numPrefetchChunksNeeded = 0);
        }
        recomputeChunkPriorities_() {
          this.updatePending = null, this.layers.length = 0, this.recomputeChunkPriorities.dispatch(), this.recomputeChunkPrioritiesLate.dispatch(), this.updateQueueState([Y.VISIBLE, Y.PREFETCH]), this.sendLayerChunkStatistics();
        }
        requestChunk(e10, t10, r10, n10 = q.GPU_MEMORY) {
          if (Number.isNaN(r10)) return;
          if (t10 === Y.RECENT) throw Error("Not going to request a chunk with the RECENT tier");
          e10.newRequestedState = Math.min(e10.newRequestedState, n10), e10.newPriorityTier === Y.RECENT && this.newTierChunks.push(e10);
          let i10 = e10.newPriorityTier;
          (t10 < i10 || t10 === i10 && r10 > e10.newPriority) && (e10.newPriorityTier = t10, e10.newPriority = r10);
        }
        updateQueueState(e10) {
          let t10 = this.existingTierChunks, r10 = this.queueManager;
          for (let n11 of e10) {
            let e11 = t10[n11];
            for (let t11 of e11) t11.newPriorityTier === Y.RECENT && r10.performChunkPriorityUpdate(t11);
            e11.length = 0;
          }
          let n10 = this.newTierChunks;
          for (let e11 of n10) r10.performChunkPriorityUpdate(e11), t10[e11.priorityTier].push(e11);
          n10.length = 0, this.queueManager.scheduleUpdate();
        }
      }
      function em(e10, t10) {
        var r10;
        class n10 extends e10 {
          constructor(...e11) {
            super(...e11);
            __publicField(this, "parameters");
            let t11 = e11[1];
            this.parameters = t11.parameters;
          }
        }
        return ee([(r10 = t10.RPC_ID, (e11) => {
          e11.prototype.RPC_TYPE_ID = r10;
        })], n10);
      }
      function ey(e10) {
        return class extends e10 {
          constructor(...e11) {
            super(...e11);
            __publicField(this, "chunkManager");
            let t10 = e11[0], r10 = e11[1];
            this.chunkManager = t10.get(r10.chunkManager);
          }
        };
      }
      ep = ee([F("ChunkManager")], ep), U("ChunkSource.invalidate", function(e10) {
        let t10 = this.get(e10.id);
        t10.chunkManager.queueManager.invalidateSourceCache(t10);
      }), A("ChunkQueueManager.requestChunkStatistics", function(e10) {
        let t10 = this.get(e10.queue), r10 = /* @__PURE__ */ new Map();
        for (let e11 of t10.sources) r10.set(e11.rpcId, e11.statistics);
        return Promise.resolve({ value: r10 });
      });
      class ev extends M.gj {
      }
      function eb(e10) {
        let t10, r10;
        return async (n10, i10) => ((void 0 === r10 || void 0 !== n10 && t10?.generation === n10.generation) && (t10 = void 0, r10 = (0, X.E7)(async (r11) => t10 = await e10(n10, r11))), r10(i10 ?? {}));
      }
      class ew extends M.gj {
        constructor(e10) {
          super();
          __publicField(this, "base");
          __publicField(this, "memoize");
          this.base = e10, this.memoize = new X.O1();
        }
        getCredentialsProvider(e10, t10) {
          return this.memoize.get({ key: e10, parameters: t10 }, () => this.registerDisposer(this.base.getCredentialsProvider(e10, t10).addRef()));
        }
      }
      var eS = r2(5898);
      function eE(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      class ek extends B {
        constructor() {
          super(...arguments);
          __publicField(this, "get", eb((e10, t10) => this.rpc.promiseInvoke(eS.LD, { providerId: this.rpcId, invalidCredentials: e10 }, { signal: t10.signal, progressListener: t10.progressListener })));
        }
      }
      function eI() {
        return (e10) => class extends e10 {
          constructor(...e11) {
            super(...e11);
            __publicField(this, "credentialsProvider");
            let t10 = e11[1];
            this.credentialsProvider = this.rpc.getOptionalRef(t10.credentialsProvider);
          }
        };
      }
      ek = eE([F(eS.yP)], ek);
      class eM extends ev {
        constructor(e10, t10, r10, n10) {
          super();
          __publicField(this, "rpc");
          __publicField(this, "managerId");
          __publicField(this, "key");
          __publicField(this, "parameters");
          __publicField(this, "get");
          this.rpc = e10, this.managerId = t10, this.key = r10, this.parameters = n10, this.get = eb((e11, t11) => this.rpc.promiseInvoke(eS.Wd, { managerId: this.managerId, key: this.key, parameters: this.parameters, invalidCredentials: e11 }, { signal: t11.signal, progressListener: t11.progressListener }));
        }
      }
      class ex extends B {
        constructor() {
          super(...arguments);
          __publicField(this, "impl", new ew(this.makeBaseCredentialsManager()));
        }
        makeBaseCredentialsManager() {
          return { getCredentialsProvider: (e10, t10) => new eM(this.rpc, this.rpcId, e10, t10) };
        }
        getCredentialsProvider(e10, t10) {
          return this.impl.getCredentialsProvider(e10, t10);
        }
      }
      ex = eE([F(eS.Yn)], ex);
      var eT = r2(8580), eC = r2(9858), eN = r2(6249);
      class e$ extends B {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "kvStoreContext");
          __publicField(this, "chunkManager");
          __publicField(this, "credentialsManager");
          this.chunkManager = e10.get(t10.chunkManager), this.credentialsManager = e10.get(t10.credentialsManager), this.kvStoreContext = new eT.e(), eC.u.applyToContext(this), eR.applyToContext(this);
        }
      }
      e$ = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F(eN.F0)], e$);
      let eR = new eC.X();
      function eP(e10) {
        return class extends e10 {
          constructor(...e11) {
            super(...e11);
            __publicField(this, "sharedKvStoreContext");
            let t10 = e11[1];
            this.sharedKvStoreContext = this.rpc.get(t10.sharedKvStoreContext);
          }
        };
      }
      var eO = r2(1395);
      class eU extends M.gj {
        constructor(e10) {
          super();
          __publicField(this, "view");
          __publicField(this, "state");
          this.view = e10, this.state = void 0;
        }
      }
      class e_ extends eg {
        constructor() {
          super(...arguments);
          __publicField(this, "attachments", /* @__PURE__ */ new Map());
        }
        attach(e10) {
        }
      }
      U(eO.ny, function(e10) {
        let t10 = this.get(e10.view), r10 = this.get(e10.layer), n10 = new eU(t10);
        r10.attachments.set(t10, n10), r10.attach(n10);
      }), U(eO.ti, function(e10) {
        let t10 = this.get(e10.view), r10 = this.get(e10.layer), n10 = r10.attachments.get(t10);
        r10.attachments.delete(t10), n10.dispose();
      });
      class eA extends B {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "value");
          __publicField(this, "oldValue");
          __publicField(this, "changed", new H.MZ());
          this.value = t10.value, this.oldValue = Object.assign({}, this.value);
        }
      }
      function eL(e10, t10, r10, n10 = 0, i10 = e10.length) {
        for (; n10 < i10; ) {
          let s10 = n10 + i10 - 1 >> 1, a10 = r10(t10, e10[s10]);
          if (a10 > 0) n10 = s10 + 1;
          else {
            if (!(a10 < 0)) return s10;
            i10 = s10;
          }
        }
        return ~n10;
      }
      function eD(e10, t10, r10) {
        let n10 = t10 - e10;
        for (; n10 > 0; ) {
          let t11 = Math.floor(n10 / 2), i10 = e10 + t11;
          r10(i10) ? n10 = t11 : (e10 = i10 + 1, n10 -= t11 + 1);
        }
        return e10;
      }
      function ez(e10, t10) {
        let r10 = e10.length;
        if (t10.length !== r10) return false;
        for (let n10 = 0; n10 < r10; ++n10) if (e10[n10] !== t10[n10]) return false;
        return true;
      }
      eA = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F(eO.rC)], eA), U(eO.uH, function(e10) {
        let t10 = this.get(e10.id), { value: r10, oldValue: n10 } = t10;
        Object.assign(n10, r10), Object.assign(r10, e10.value), t10.changed.dispatch(n10, r10);
      });
      var eB = r2(3783), ej = r2(290);
      let eF = [{ prefix: "Y", exponent: 24, longPrefix: "yotta" }, { prefix: "Z", exponent: 21, longPrefix: "zetta" }, { prefix: "E", exponent: 18, longPrefix: "exa" }, { prefix: "P", exponent: 15, longPrefix: "peta" }, { prefix: "T", exponent: 12, longPrefix: "tera" }, { prefix: "G", exponent: 9, longPrefix: "giga" }, { prefix: "M", exponent: 6, longPrefix: "mega" }, { prefix: "k", exponent: 3, longPrefix: "kilo" }, { prefix: "", exponent: 0, longPrefix: "" }, { prefix: "m", exponent: -3, longPrefix: "milli" }, { prefix: "\xB5", exponent: -6, longPrefix: "micro" }, { prefix: "n", exponent: -9, longPrefix: "nano" }, { prefix: "p", exponent: -12, longPrefix: "pico" }, { prefix: "f", exponent: -15, longPrefix: "femto" }, { prefix: "a", exponent: -18, longPrefix: "atto" }, { prefix: "z", exponent: -21, longPrefix: "zepto" }, { prefix: "y", exponent: -24, longPrefix: "yocto" }, { prefix: "h", exponent: 2, longPrefix: "hecto" }, { prefix: "da", exponent: 1, longPrefix: "deca" }, { prefix: "d", exponent: -1, longPrefix: "deci" }, { prefix: "c", exponent: -2, longPrefix: "centi" }], eV = [{ prefix: "u", exponent: -6 }, ...eF], eG = /* @__PURE__ */ new Map();
      eG.set("", { unit: "", exponent: 0 });
      let eK = /* @__PURE__ */ new Map();
      for (let { prefix: e10, exponent: t10 } of eV) for (let r10 of (eK.set(t10, e10), ["m", "s", "Hz", "rad/s"])) eG.set(`${e10}${r10}`, { unit: r10, exponent: t10 });
      let eq = new Float32Array(0), eY = new Float64Array(0);
      function eJ(e10) {
        let { names: t10, units: r10, scales: n10 } = e10, { valid: i10 = true, rank: s10 = t10.length, timestamps: a10 = t10.map(() => Number.NEGATIVE_INFINITY), ids: o10 = t10.map((e11, t11) => -t11), boundingBoxes: l2 = [] } = e10, { coordinateArrays: u2 = Array(s10) } = e10, { bounds: h2 = function(e11, t11) {
          let r11 = new Float64Array(t11), n11 = new Float64Array(t11);
          r11.fill(Number.NEGATIVE_INFINITY), n11.fill(Number.POSITIVE_INFINITY);
          let i11 = Array(t11);
          i11.fill(0);
          let s11 = Array(t11);
          for (let a11 of (s11.fill(0), e11)) for (let e12 = 0; e12 < t11; ++e12) {
            let o11 = function(e13, t12, r12) {
              let { box: { lowerBounds: n12, upperBounds: i12 }, transform: s12 } = e13, a12 = n12.length, o12 = s12[r12 * a12 + t12], l4 = o12, u4 = o12, h3 = false;
              for (let e14 = 0; e14 < a12; ++e14) {
                let a13 = s12[r12 * e14 + t12];
                if (0 === a13) continue;
                let o13 = a13 * n12[e14], c2 = a13 * i12[e14];
                l4 += Math.min(o13, c2), u4 += Math.max(o13, c2), h3 = true;
              }
              if (h3) return { lower: l4, upper: u4 };
            }(a11, e12, t11);
            if (void 0 === o11) continue;
            let { lower: l3, upper: u3 } = o11;
            if (Number.isFinite(l3) && Number.isFinite(u3)) {
              let t12, r12, n12, a12;
              1e-3 > Math.abs(l3 - (t12 = Math.round(l3))) && 1e-3 > Math.abs(u3 - (r12 = Math.round(u3))) ? (++s11[e12], l3 = t12, u3 = r12) : 1e-3 > Math.abs(l3 - (n12 = Math.floor(l3)) - 0.5) && 1e-3 > Math.abs(u3 - (a12 = Math.floor(u3)) - 0.5) && (++i11[e12], l3 = n12 + 0.5, u3 = a12 + 0.5);
            }
            r11[e12] = r11[e12] === Number.NEGATIVE_INFINITY ? l3 : Math.min(r11[e12], l3), n11[e12] = n11[e12] === Number.POSITIVE_INFINITY ? u3 : Math.max(n11[e12], u3);
          }
          return { lowerBounds: r11, upperBounds: n11, voxelCenterAtIntegerCoordinates: s11.map((e12, t12) => i11[t12] > 0 && 0 === e12) };
        }(l2, s10) } = e10;
        return { valid: i10, rank: s10, names: t10, timestamps: a10, ids: o10, units: r10, scales: n10, boundingBoxes: l2, bounds: h2, coordinateArrays: u2 };
      }
      Float64Array.of(1, 1, 1);
      let eW = eJ({ valid: false, names: [], units: [], scales: eY, boundingBoxes: [] });
      eJ({ valid: true, names: [], units: [], scales: eY, boundingBoxes: [] }), k.SN;
      function eZ(e10, t10) {
        let r10 = (e10 + t10) / 2;
        return Number.isFinite(r10) || (r10 = Math.min(Math.max(0, e10), t10)), r10;
      }
      function eX(e10, t10 = false) {
        if (t10) {
          let t11 = Number(e10);
          if (Number.isInteger(t11) && t11 >= 0) return true;
        }
        return null !== e10.match(/^[a-zA-Z][a-zA-Z_0-9]*['^]?$/);
      }
      /* @__PURE__ */ new WeakMap();
      var eQ = r2(5580);
      (h = {})[h.LINKED = 0] = "LINKED", h[h.RELATIVE = 1] = "RELATIVE", h[h.UNLINKED = 2] = "UNLINKED", (c = {})[c.LINKED = 0] = "LINKED", c[c.UNLINKED = 2] = "UNLINKED", eQ.B, eQ.B, eB.R3.create(), eB.gf.create();
      M.gj;
      var eH = ((d = {})[d.STOP = 0] = "STOP", d[d.LOOP = 1] = "LOOP", d[d.REVERSE = 2] = "REVERSE", d);
      class e0 {
        constructor() {
          __publicField(this, "velocity", 10);
          __publicField(this, "atBoundary", 2);
          __publicField(this, "paused", true);
        }
      }
      function e1(e10) {
        return (0, ej.PT)(e10), { velocity: (0, ej.Kh)(e10, "velocity", ej.jz, 10), atBoundary: (0, ej.Kh)(e10, "atBoundary", (e11) => (0, ej.CT)(e11, eH), 0), paused: (0, ej.Kh)(e10, "paused", ej.JG, true) };
      }
      M.gj, M.gj, M.gj;
      class e22 extends M.gj {
        constructor(e10) {
          super();
          __publicField(this, "orientation");
          __publicField(this, "changed", new H.K_());
          null == e10 && (e10 = eB.gf.create()), this.orientation = e10;
        }
        toJSON() {
          let { orientation: e10 } = this;
          if (eB.gf.normalize(this.orientation, this.orientation), 0 !== e10[0] || 0 !== e10[1] || 0 !== e10[2] || 1 !== e10[3]) return Array.prototype.slice.call(this.orientation);
        }
        restoreState(e10) {
          try {
            (0, ej._b)(this.orientation, e10), eB.gf.normalize(this.orientation, this.orientation);
          } catch {
            eB.gf.identity(this.orientation);
          }
          this.changed.dispatch();
        }
        reset() {
          eB.gf.identity(this.orientation), this.changed.dispatch();
        }
        snap() {
          let e10 = eB.wO.create();
          eB.wO.fromQuat(e10, this.orientation);
          let t10 = [false, false, false];
          for (let r10 = 0; r10 < 3; ++r10) {
            let n10 = 0, i10 = 0;
            for (let s10 = 0; s10 < 3; ++s10) {
              let a10 = e10[3 * r10 + s10];
              e10[3 * r10 + s10] = 0, !t10[s10] && Math.abs(a10) > Math.abs(n10) && (n10 = a10, i10 = s10);
            }
            e10[3 * r10 + i10] = Math.sign(n10), t10[i10] = true;
          }
          eB.gf.fromMat3(this.orientation, e10), this.changed.dispatch();
        }
        static makeRelative(e10, t10) {
          let r10 = new e22(eB.gf.multiply(eB.gf.create(), e10.orientation, t10)), n10 = false;
          r10.registerDisposer(e10.changed.add(() => {
            n10 || (i10 = true, eB.gf.multiply(r10.orientation, e10.orientation, t10), r10.changed.dispatch(), i10 = false);
          }));
          let i10 = false, s10 = eB.gf.invert(eB.gf.create(), t10);
          return r10.registerDisposer(r10.changed.add(() => {
            i10 || (n10 = true, eB.gf.multiply(e10.orientation, r10.orientation, s10), e10.changed.dispatch(), n10 = false);
          })), r10;
        }
        assign(e10) {
          eB.gf.copy(this.orientation, e10.orientation), this.changed.dispatch();
        }
      }
      M.gj;
      function e3(e10, t10) {
        var r10, n10;
        let i10 = e10.displayDimensionRenderInfo;
        return i10 === t10 || (r10 = i10, n10 = t10, !!(ez(r10.globalDimensionNames, n10.globalDimensionNames) && ez(r10.displayDimensionIndices, n10.displayDimensionIndices) && ez(r10.canonicalVoxelFactors, n10.canonicalVoxelFactors) && ez(r10.voxelPhysicalScales, n10.voxelPhysicalScales) && r10.canonicalVoxelPhysicalSize === n10.canonicalVoxelPhysicalSize && ez(r10.displayDimensionUnits, n10.displayDimensionUnits) && ez(r10.displayDimensionScales, n10.displayDimensionScales)) && (e10.displayDimensionRenderInfo = t10, true));
      }
      M.gj, M.gj, M.gj, M.gj, M.gj, M.gj;
      var e4 = r2(2902);
      r2(5901);
      var e6 = r2(4186);
      r2(9652);
      class e8 {
        constructor() {
          __publicField(this, "width", 0);
          __publicField(this, "height", 0);
          __publicField(this, "logicalWidth", 0);
          __publicField(this, "logicalHeight", 0);
          __publicField(this, "visibleLeftFraction", 0);
          __publicField(this, "visibleTopFraction", 0);
          __publicField(this, "visibleWidthFraction", 0);
          __publicField(this, "visibleHeightFraction", 0);
        }
      }
      M.gj, k.TU, M.gj, new Uint32Array(0), new Uint32Array(0);
      var e5 = r2(9023), e9 = ((f = {})[f.UINT8 = 0] = "UINT8", f[f.INT8 = 1] = "INT8", f[f.UINT16 = 2] = "UINT16", f[f.INT16 = 3] = "INT16", f[f.UINT32 = 4] = "UINT32", f[f.INT32 = 5] = "INT32", f[f.UINT64 = 6] = "UINT64", f[f.FLOAT32 = 7] = "FLOAT32", f);
      let e7 = { 0: 1, 1: 1, 2: 2, 3: 2, 4: 4, 5: 4, 6: 8, 7: 4 }, te = { 0: Uint8Array, 1: Int8Array, 2: Uint16Array, 3: Int16Array, 4: Uint32Array, 5: Int32Array, 6: BigUint64Array, 7: Float32Array };
      function tt(e10, t10, r10 = 0, n10 = t10.byteLength) {
        let i10 = e7[e10];
        return new te[e10](t10, r10, n10 / i10);
      }
      let tr = eB._E.create();
      function tn(e10, t10, r10) {
        let { curPositionInChunks: n10, fixedPositionWithinChunk: i10 } = e10, { nonDisplayLowerClipBound: s10, nonDisplayUpperClipBound: a10 } = e10, { rank: o10, chunkDataSize: l2 } = e10.source.spec;
        if (!function(e11, t11, r11, n11, i11) {
          let s11 = t11.length, a11 = r11.length, o11 = e11.length, l3 = true;
          for (let u2 = 0; u2 < n11; ++u2) {
            let h2 = u2, c2 = 0;
            for (let e12 = 0; e12 < s11; ++e12) c2 += i11[h2 + e12 * n11] * t11[e12];
            h2 += s11 * n11;
            for (let e12 = 0; e12 < a11; ++e12) c2 += i11[h2 + e12 * n11] * r11[e12];
            c2 += i11[h2 + a11 * n11], u2 < o11 ? e11[u2] = c2 : (c2 < 0 || c2 >= 1) && (l3 = false);
          }
          return l3;
        }(n10, t10, r10, e10.layerRank, e10.fixedLayerToChunkTransform)) return false;
        for (let e11 = 0; e11 < o10; ++e11) {
          let t11 = n10[e11];
          if (t11 < s10[e11] || t11 >= a10[e11]) return false;
          let r11 = l2[e11], o11 = n10[e11] = Math.floor(t11 / r11);
          i10[e11] = t11 - o11 * r11;
        }
        return true;
      }
      let ti = new e5.d(eB.R3.create(), eB._E.create(), 0);
      class ts extends D {
        constructor(e10) {
          super();
          __publicField(this, "projectionParameters");
          __publicField(this, "visibleLayers");
          __publicField(this, "visibleSourcesStale");
          this.projectionParameters = e10, this.visibleLayers = /* @__PURE__ */ new Map(), this.visibleSourcesStale = true, this.registerDisposer(e10.changed.add((e11, t10) => {
            (function(e12, t11) {
              if (e12.displayDimensionRenderInfo !== t11.displayDimensionRenderInfo || e12.pixelSize !== t11.pixelSize) return true;
              let { viewMatrix: r10 } = e12, { viewMatrix: n10 } = t11;
              for (let e13 = 0; e13 < 12; ++e13) if (r10[e13] !== n10[e13]) return true;
              return false;
            })(e11, t10) && this.invalidateVisibleSources(), this.invalidateVisibleChunks();
          }));
        }
        invalidateVisibleSources() {
          this.visibleSourcesStale = true;
        }
        invalidateVisibleChunks() {
        }
        updateVisibleSources() {
          if (!this.visibleSourcesStale) return;
          this.visibleSourcesStale = false;
          let e10 = this.projectionParameters.value.displayDimensionRenderInfo, { visibleLayers: t10 } = this;
          for (let [r10, n10] of t10) {
            let { allSources: t11, visibleSources: i10 } = n10;
            if (i10.length = 0, 0 === t11.length || !e3(n10, e10)) continue;
            let s10 = function(e11, t12) {
              let r11 = t12.length, n11 = 0;
              if (r11 > 1) {
                let i11 = 0;
                for (let s11 = 0; s11 < r11; ++s11) {
                  let { chunkLayout: r12 } = t12[s11], a11 = function(e12, t13) {
                    let r13 = 0, n12 = Math.abs(e12.detTransform), { transform: i12, size: s12 } = e12;
                    for (let e13 = 0; e13 < 3; ++e13) {
                      let a12 = 0;
                      for (let r14 = 0; r14 < 3; ++r14) a12 += t13[4 * r14 + 2] * i12[4 * e13 + r14];
                      let o10 = s12[e13];
                      r13 += Math.abs(a12) * o10, n12 *= o10;
                    }
                    return n12 / r13;
                  }(r12, e11);
                  a11 > i11 && (i11 = a11, n11 = s11);
                }
              }
              return n11;
            }(this.projectionParameters.value.viewMatrix, t11.map((e11) => e11[0])), a10 = t11[s10];
            for (let e11 of r10.filterVisibleSources(this, a10)) i10.push(e11);
            i10.reverse();
          }
        }
      }
      let ta = new Float32Array(3), to = new Float32Array(3), tl = eB._E.create(), tu = new Float32Array(24);
      function th(e10, t10, r10, n10) {
        let { lowerChunkDisplayBound: i10, upperChunkDisplayBound: s10 } = t10;
        for (let e11 = 0; e11 < 3; ++e11) ta[e11] = Math.max(ta[e11], i10[e11]), to[e11] = Math.min(to[e11], s10[e11]);
        let { curPositionInChunks: a10, chunkDisplayDimensionIndices: o10 } = t10;
        !function t11() {
          if (!n10(ta[0], ta[1], ta[2], to[0], to[1], to[2], e10)) return;
          let i11 = 0, s11 = Math.max(0, to[0] - ta[0]), l2 = s11;
          for (let e11 = 1; e11 < 3; ++e11) {
            let t12 = Math.max(0, to[e11] - ta[e11]);
            l2 *= t12, t12 > s11 && (s11 = t12, i11 = e11);
          }
          if (0 === l2) return;
          if (1 === l2) {
            a10[o10[0]] = ta[0], a10[o10[1]] = ta[1], a10[o10[2]] = ta[2], r10(ta, e10);
            return;
          }
          let u2 = ta[i11], h2 = to[i11], c2 = Math.floor(0.5 * (u2 + h2));
          to[i11] = c2, t11(), to[i11] = h2, ta[i11] = c2, t11(), ta[i11] = u2;
        }();
      }
      function tc(e10, t10, r10, n10) {
        if (!tn(r10, e10.globalPosition, t10)) return;
        let { size: i10 } = r10.chunkLayout, s10 = eB._E.multiply(tl, e10.viewProjectionMat, r10.chunkLayout.transform);
        for (let e11 = 0; e11 < 3; ++e11) {
          let t11 = i10[e11];
          for (let r11 = 0; r11 < 4; ++r11) s10[4 * e11 + r11] *= t11;
        }
        (0, eB.th)(tu, s10), ta.fill(Number.NEGATIVE_INFINITY), to.fill(Number.POSITIVE_INFINITY), th(tu, r10, n10, eB.Rq);
      }
      function td(e10, t10, r10, n10, i10) {
        if (!tn(r10, e10.globalPosition, t10)) return;
        let { size: s10 } = n10, a10 = eB._E.multiply(tl, e10.viewProjectionMat, n10.transform);
        for (let e11 = 0; e11 < 3; ++e11) {
          let t11 = s10[e11];
          for (let r11 = 0; r11 < 4; ++r11) a10[4 * e11 + r11] *= t11;
        }
        eB._E.invert(tr, a10);
        for (let e11 = 0; e11 < 3; ++e11) {
          let t11 = tr[12 + e11] + 1e-3 / s10[e11], r11 = Math.abs(tr[e11]), n11 = Math.abs(tr[4 + e11]);
          ta[e11] = Math.floor(t11 - r11 - n11), to[e11] = Math.floor(t11 + r11 + n11 + 1);
        }
        for (let e11 = 0; e11 < 3; ++e11) {
          let t11 = a10[4 * e11], r11 = a10[4 * e11 + 1], n11 = a10[4 * e11 + 2];
          tu[e11] = t11, tu[4 + e11] = -t11, tu[8 + e11] = +r11, tu[12 + e11] = -r11, tu[16 + e11] = +n11, tu[20 + e11] = -n11;
        }
        {
          let e11 = a10[12], t11 = a10[13], r11 = a10[14];
          tu[3] = 1 + e11, tu[7] = 1 - e11, tu[11] = 1 + t11, tu[15] = 1 - t11, tu[19] = r11, tu[23] = -r11;
        }
        th(tu, r10, i10, eB.iG);
      }
      function tf(e10, t10) {
        let { finiteRank: r10 } = t10;
        if (3 === r10) return t10;
        ti.finiteRank = r10, eB.R3.copy(ti.size, t10.size);
        let n10 = eB._E.copy(ti.transform, t10.transform), i10 = eB._E.copy(ti.invTransform, t10.invTransform);
        ti.detTransform = t10.detTransform;
        let { invViewMatrix: s10, width: a10, height: o10 } = e10, l2 = (0, eB.V2)(e10.projectionMat);
        for (let e11 = r10; e11 < 3; ++e11) {
          let t11 = s10[12 + e11], r11 = t11, i11 = t11, u2 = Math.abs(s10[e11] * a10);
          r11 -= u2, i11 += u2;
          let h2 = Math.abs(s10[e11 + 4] * o10);
          r11 -= h2, i11 += h2;
          let c2 = Math.abs(s10[e11 + 8] * l2);
          r11 -= c2;
          let d2 = Math.max(1, (i11 += c2) - r11);
          n10[12 + e11] = r11, n10[5 * e11] = d2;
        }
        return eB._E.invert(i10, n10), ti;
      }
      class tg {
        constructor(e10 = 50, t10 = 1e3) {
          __publicField(this, "velocityHalfLifeMilliseconds");
          __publicField(this, "modelHalfLifeMilliseconds");
          __publicField(this, "lastTime");
          __publicField(this, "rank");
          __publicField(this, "numSamples");
          __publicField(this, "prevPosition");
          __publicField(this, "velocity");
          __publicField(this, "mean");
          __publicField(this, "variance");
          this.velocityHalfLifeMilliseconds = e10, this.modelHalfLifeMilliseconds = t10, this.lastTime = Number.NEGATIVE_INFINITY, this.rank = 0, this.numSamples = 0, this.prevPosition = new Float32Array(), this.velocity = new Float32Array(), this.mean = new Float32Array(), this.variance = new Float32Array();
        }
        reset(e10) {
          this.lastTime = Number.NEGATIVE_INFINITY, this.rank = e10, this.numSamples = 0, this.velocity = new Float32Array(e10), this.prevPosition = new Float32Array(e10), this.mean = new Float32Array(e10), this.variance = new Float32Array(e10);
        }
        addSample(e10, t10 = Date.now()) {
          let r10 = e10.length;
          r10 !== this.rank && this.reset(r10);
          let n10 = this.numSamples;
          if (++this.numSamples, 0 === this.numSamples) {
            this.prevPosition.set(e10), this.lastTime = t10;
            return;
          }
          let i10 = t10 - this.lastTime;
          this.lastTime = t10;
          let s10 = 1 - 2 ** -(i10 / this.velocityHalfLifeMilliseconds), a10 = 1 - 2 ** -(i10 / this.modelHalfLifeMilliseconds), { velocity: o10, prevPosition: l2, mean: u2, variance: h2 } = this;
          for (let t11 = 0; t11 < r10; ++t11) {
            let r11 = (e10[t11] - l2[t11]) / Math.max(i10, 1);
            l2[t11] = e10[t11];
            let c2 = o10[t11], d2 = o10[t11] = c2 + s10 * (r11 - c2);
            if (1 === n10) u2[t11] = d2;
            else {
              let e11 = u2[t11], r12 = h2[t11], n11 = d2 - e11;
              u2[t11] = e11 + a10 * n11, h2[t11] = (1 - a10) * (r12 + a10 * n11 * n11);
            }
          }
        }
      }
      function tp(e10) {
        return class extends e10 {
          constructor(...e11) {
            super(...e11);
            __publicField(this, "visibility");
            let t10 = e11[0], r10 = e11[1];
            this.visibility = t10.get(r10.visibility), this.registerDisposer(this.visibility.changed.add(() => this.chunkManager.scheduleUpdateChunkPriorities()));
          }
        };
      }
      function tm(e10) {
        return e10 === Number.POSITIVE_INFINITY ? Y.VISIBLE : Y.PREFETCH;
      }
      function ty(e10) {
        return e10 === Number.POSITIVE_INFINITY ? 0 : 1e13 * e10;
      }
      function tv(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      let tb = eB.R3.create(), tw = eB.R3.create(), tS = eB.R3.create();
      function tE(e10) {
        for (let t10 of e10) for (let e11 of t10) e11.source.dispose();
      }
      let tk = tp(ey(class extends ts {
        constructor(e10, t10) {
          super(e10.get(t10.projectionParameters)), this.initializeSharedObject(e10, t10.id);
        }
      }));
      class tI extends tk {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "velocityEstimator", new tg());
          __publicField(this, "handleLayerChanged", () => {
            this.chunkManager.scheduleUpdateChunkPriorities();
          });
          this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
            this.updateVisibleChunks();
          })), this.registerDisposer(this.projectionParameters.changed.add(() => {
            this.velocityEstimator.addSample(this.projectionParameters.value.globalPosition);
          }));
        }
        invalidateVisibleChunks() {
          super.invalidateVisibleChunks(), this.chunkManager.scheduleUpdateChunkPriorities();
        }
        updateVisibleChunks() {
          let e10 = this.projectionParameters.value, t10 = this.chunkManager, r10 = this.visibility.value;
          if (r10 === Number.NEGATIVE_INFINITY) return;
          this.updateVisibleSources();
          let { centerDataPosition: n10 } = e10, i10 = tm(r10), s10 = ty(r10);
          s10 += -1e12;
          let a10 = [];
          for (let [r11, o10] of (this.velocityEstimator.addSample(this.projectionParameters.value.globalPosition), this.visibleLayers)) {
            t10.registerLayer(r11);
            let { visibleSources: l2 } = o10;
            for (let o11 = 0, u2 = l2.length; o11 < u2; ++o11) {
              let u3 = l2[o11], h2 = t10.queueManager.enablePrefetch.value ? function(e11, t11) {
                let r12 = [], n11 = e11.rank, { combinedGlobalLocalToChunkTransform: i11, layerRank: s11 } = t11, { rank: a11, chunkDataSize: o12 } = t11.source.spec, { mean: l3, variance: u4 } = e11;
                for (let e12 = 0; e12 < a11; ++e12) {
                  let a12 = t11.chunkDisplayDimensionIndices.includes(e12), h3 = 0, c3 = 0;
                  for (let t12 = 0; t12 < n11; ++t12) {
                    let r13 = l3[t12], n12 = u4[t12], a13 = i11[t12 * s11 + e12];
                    h3 += a13 * r13, c3 += a13 * a13 * n12;
                  }
                  if (h3 > 0.1) continue;
                  let d3 = o12[e12], f3 = a12 ? 0 : t11.fixedPositionWithinChunk[e12] / d3, g3 = h3 / d3 * 2e3, p3 = Math.sqrt(2 * c3) / d3 * 2e3;
                  if (1e-3 > Math.abs(g3) && p3 < 1e-3) continue;
                  p3 = Math.max(1e-6, p3);
                  let m2 = (e13) => 0.5 * (1 + function(e14) {
                    let t12 = 1 / (1 + 0.3275911 * Math.abs(e14)), r13 = 1 - ((((1.061405429 * t12 + -1.453152027) * t12 + 1.421413741) * t12 + -0.284496736) * t12 + 0.254829592) * t12 * Math.exp(-e14 * e14);
                    return Math.sign(e14) * r13;
                  }((e13 - g3) / p3)), y2 = t11.curPositionInChunks[e12], v2 = Math.floor(t11.lowerClipBound[e12] / d3), b2 = Math.ceil(t11.upperClipBound[e12] / d3) - 1, w2 = r12.length;
                  for (let t12 = 1; t12 <= 32 && (a12 || !(y2 + t12 > b2)); ++t12) {
                    let n12 = 1 - m2(t12 - f3);
                    if (n12 < 0.05) break;
                    r12.push(e12, t12, v2, b2, n12, 0);
                  }
                  let S2 = r12.length;
                  for (let e13 = w2, t12 = r12.length; e13 < t12; e13 += tN) r12[e13 + tN - 1] = S2;
                  w2 = S2;
                  for (let t12 = 1; t12 <= 32 && (a12 || !(y2 - t12 < v2)); ++t12) {
                    let n12 = m2(-t12 + 1 - f3);
                    if (n12 < 0.05) break;
                    r12.push(e12, -t12, v2, b2, n12, 0);
                  }
                  S2 = r12.length;
                  for (let e13 = w2, t12 = r12.length; e13 < t12; e13 += tN) r12[e13 + tN - 1] = S2;
                }
                return r12;
              }(this.velocityEstimator, u3) : [], { chunkLayout: c2 } = u3;
              c2.globalToLocalSpatial(tw, n10);
              let { size: d2, finiteRank: f2 } = c2;
              eB.R3.copy(tS, d2);
              for (let e11 = f2; e11 < 3; ++e11) tS[e11] = 0, tw[e11] = 0;
              let g2 = s10 + 1e9 * o11;
              a10.length = 0;
              let p2 = ++et;
              if (td(e10, u3.renderLayer.localPosition.value, u3, tf(e10, u3.chunkLayout), (e11) => {
                eB.R3.multiply(tb, e11, tS);
                let n11 = -eB.R3.distance(tw, tb), { curPositionInChunks: s11 } = u3, o12 = u3.source.getChunk(s11);
                t10.requestChunk(o12, i10, g2 + n11), ++r11.numVisibleChunksNeeded, o12.state === q.GPU_MEMORY && ++r11.numVisibleChunksAvailable, a10.push(o12), o12.markGeneration = p2;
              }), 0 !== h2.length) {
                let { curPositionInChunks: e11 } = u3;
                for (let n11 of a10) {
                  e11.set(n11.chunkGridPosition);
                  for (let n12 = 0, i11 = h2.length; n12 < i11; ) {
                    let i12 = h2[n12], s11 = h2[n12 + 2], a11 = h2[n12 + 3], o12 = h2[n12 + 4], l3 = h2[n12 + 5], c3 = e11[i12], d3 = c3 + h2[n12 + 1];
                    if (d3 < s11 || d3 > a11) {
                      n12 = l3;
                      continue;
                    }
                    e11[i12] = d3;
                    let f3 = u3.source.getChunk(e11);
                    if (e11[i12] = c3, f3.markGeneration === p2) {
                      n12 = l3;
                      continue;
                    }
                    t10.requestChunk(f3, Y.PREFETCH, g2 + o12), ++r11.numPrefetchChunksNeeded, f3.state === q.GPU_MEMORY && ++r11.numPrefetchChunksAvailable, n12 += tN;
                  }
                }
              }
            }
          }
        }
        removeVisibleLayer(e10) {
          let { visibleLayers: t10 } = this, r10 = t10.get(e10);
          t10.delete(e10), tE(r10.allSources), e10.renderScaleTarget.changed.remove(this.invalidateVisibleSources), e10.localPosition.changed.remove(this.handleLayerChanged), this.invalidateVisibleSources();
        }
        addVisibleLayer(e10, t10, r10) {
          let n10 = this.visibleLayers.get(e10);
          void 0 === n10 ? (n10 = { allSources: t10, visibleSources: [], displayDimensionRenderInfo: r10 }, this.visibleLayers.set(e10, n10), e10.renderScaleTarget.changed.add(() => this.invalidateVisibleSources()), e10.localPosition.changed.add(this.handleLayerChanged)) : (tE(n10.allSources), n10.allSources = t10, n10.visibleSources.length = 0, n10.displayDimensionRenderInfo = r10), this.invalidateVisibleSources();
        }
        disposed() {
          for (let e10 of this.visibleLayers.keys()) this.removeVisibleLayer(e10);
          super.disposed();
        }
        invalidateVisibleSources() {
          super.invalidateVisibleSources(), this.chunkManager.scheduleUpdateChunkPriorities();
        }
      }
      function tM(e10, t10, r10) {
        return t10.map((t11) => t11.map((t12) => {
          let n10 = e10.getRef(t12.source), i10 = t12.chunkLayout, { rank: s10 } = n10.spec;
          return { renderLayer: r10, source: n10, chunkLayout: e5.d.fromObject(i10), layerRank: t12.layerRank, nonDisplayLowerClipBound: t12.nonDisplayLowerClipBound, nonDisplayUpperClipBound: t12.nonDisplayUpperClipBound, lowerClipBound: t12.lowerClipBound, upperClipBound: t12.upperClipBound, lowerClipDisplayBound: t12.lowerClipDisplayBound, upperClipDisplayBound: t12.upperClipDisplayBound, lowerChunkDisplayBound: t12.lowerChunkDisplayBound, upperChunkDisplayBound: t12.upperChunkDisplayBound, effectiveVoxelSize: t12.effectiveVoxelSize, chunkDisplayDimensionIndices: t12.chunkDisplayDimensionIndices, fixedLayerToChunkTransform: t12.fixedLayerToChunkTransform, combinedGlobalLocalToChunkTransform: t12.combinedGlobalLocalToChunkTransform, curPositionInChunks: new Float32Array(s10), fixedPositionWithinChunk: new Uint32Array(s10) };
        }));
      }
      tI = tv([F("SliceView")], tI), U("SliceView.addVisibleLayer", function(e10) {
        let t10 = this.get(e10.id), r10 = this.get(e10.layerId), n10 = tM(this, e10.sources, r10);
        t10.addVisibleLayer(r10, n10, e10.displayDimensionRenderInfo);
      }), U("SliceView.removeVisibleLayer", function(e10) {
        let t10 = this.get(e10.id), r10 = this.get(e10.layerId);
        t10.removeVisibleLayer(r10);
      });
      class tx extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkGridPosition");
          __publicField(this, "source", null);
        }
        initializeVolumeChunk(e10, t10) {
          super.initialize(e10), this.chunkGridPosition = Float32Array.from(t10);
        }
        serialize(e10, t10) {
          super.serialize(e10, t10), e10.chunkGridPosition = this.chunkGridPosition;
        }
        downloadSucceeded() {
          super.downloadSucceeded();
        }
        freeSystemMemory() {
        }
        toString() {
          return this.source.toString() + ":" + (0, eB.m0)(this.chunkGridPosition);
        }
      }
      class tT extends es {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "spec");
          this.spec = t10.spec;
        }
        getChunk(e10) {
          let t10 = e10.join(), r10 = this.chunks.get(t10);
          return void 0 === r10 && ((r10 = this.getNewChunk_(this.chunkConstructor)).initializeVolumeChunk(t10, e10), this.addChunk(r10)), r10;
        }
      }
      class tC extends B {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "renderScaleTarget");
          __publicField(this, "localPosition");
          __publicField(this, "numVisibleChunksNeeded");
          __publicField(this, "numVisibleChunksAvailable");
          __publicField(this, "numPrefetchChunksNeeded");
          __publicField(this, "numPrefetchChunksAvailable");
          __publicField(this, "chunkManagerGeneration");
          this.renderScaleTarget = e10.get(t10.renderScaleTarget), this.localPosition = e10.get(t10.localPosition), this.numVisibleChunksNeeded = 0, this.numVisibleChunksAvailable = 0, this.numPrefetchChunksAvailable = 0, this.numPrefetchChunksNeeded = 0, this.chunkManagerGeneration = -1;
        }
        filterVisibleSources(e10, t10) {
          return function* (e11, t11, r10) {
            let n10;
            let i10 = 1.1 * e11.projectionParameters.value.pixelSize, s10 = r10[0].effectiveVoxelSize, a10 = t11.renderScaleTarget.value, o10 = (e12) => {
              let t12 = i10 * a10;
              for (let r11 = 0; r11 < 3; ++r11) {
                let n11 = e12[r11];
                if (n11 > t12 && n11 > 1.01 * s10[r11]) return true;
              }
              return false;
            }, l2 = (e12, t12) => {
              let r11 = i10 * a10;
              for (let n11 = 0; n11 < 3; ++n11) {
                let i11 = e12[n11], s11 = t12[n11];
                if (Math.abs(r11 - i11) < Math.abs(r11 - s11) && i11 < 1.01 * s11) return true;
              }
              return false;
            }, u2 = r10.length - 1;
            for (; ; ) {
              let e12 = r10[u2];
              if (void 0 !== n10 && !l2(e12.effectiveVoxelSize, n10) || (yield e12, 0 === u2 || !o10(e12.effectiveVoxelSize))) break;
              n10 = e12.effectiveVoxelSize, --u2;
            }
          }(e10, this, t10);
        }
      }
      tC = tv([F("sliceview/RenderLayer")], tC);
      let tN = 6;
      A("ChunkManager.requestChunk", async function(e10, t10) {
        let r10;
        let n10 = this.get(e10.source), { chunkManager: i10 } = n10, s10 = n10.getChunk(e10.chunkGridPosition), a10 = s10.key;
        if (s10.state <= q.SYSTEM_MEMORY) return { value: void 0 };
        if (s10.state === q.FAILED) throw s10.error;
        let o10 = i10.recomputeChunkPriorities.add(() => {
          i10.requestChunk(s10, Y.VISIBLE, Number.POSITIVE_INFINITY, q.SYSTEM_MEMORY);
        });
        i10.scheduleUpdateChunkPriorities();
        let l2 = new Promise((e11, t11) => {
          r10 = (r11) => {
            if (r11.state === q.FAILED) {
              t11(r11.error);
              return;
            }
            r11.state <= q.SYSTEM_MEMORY && e11();
          };
        });
        n10.registerChunkListener(a10, r10);
        try {
          return await (0, I.oi)(l2, t10.signal), { value: void 0 };
        } finally {
          n10.unregisterChunkListener(a10, r10), o10(), i10.scheduleUpdateChunkPriorities();
        }
      });
      var t$ = r2(9443);
      class tR extends B {
        constructor(...e10) {
          super(...e10);
          __publicField(this, "visibility");
          __publicField(this, "projectionParameters");
          let t10 = e10[0], r10 = e10[1];
          this.visibility = t10.get(r10.visibility), this.projectionParameters = t10.get(r10.projectionParameters);
        }
      }
      tR = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F(t$.w)], tR);
      class tP extends e_ {
      }
      let tO = eB.wO.create(), tU = eB.R3.create(), t_ = eB.R3.create(), tA = eB.R3.create(), tL = eB.R3.create();
      class tD extends ey(e_) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "localPosition");
          __publicField(this, "renderScaleTarget");
          this.renderScaleTarget = e10.get(t10.renderScaleTarget), this.localPosition = e10.get(t10.localPosition);
          let r10 = () => this.chunkManager.scheduleUpdateChunkPriorities();
          this.registerDisposer(this.localPosition.changed.add(r10)), this.registerDisposer(this.renderScaleTarget.changed.add(r10)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
        }
        attach(e10) {
          let t10 = () => this.chunkManager.scheduleUpdateChunkPriorities(), { view: r10 } = e10;
          e10.registerDisposer(t10), e10.registerDisposer(r10.projectionParameters.changed.add(t10)), e10.registerDisposer(r10.visibility.changed.add(t10)), e10.state = { displayDimensionRenderInfo: r10.projectionParameters.value.displayDimensionRenderInfo, transformedSources: [] };
        }
        recomputeChunkPriorities() {
          for (let e10 of this.attachments.values()) {
            let t10;
            let { view: r10 } = e10, n10 = r10.visibility.value;
            if (n10 === Number.NEGATIVE_INFINITY) continue;
            let i10 = e10.state, { transformedSources: s10 } = i10;
            if (0 === s10.length || !e3(i10, r10.projectionParameters.value.displayDimensionRenderInfo)) continue;
            let a10 = r10.projectionParameters.value, o10 = tm(n10), l2 = ty(n10);
            l2 += -1e12;
            let { globalPosition: u2, displayDimensionRenderInfo: { displayDimensionIndices: h2 } } = a10;
            for (let e11 = 0; e11 < 3; ++e11) {
              let t11 = h2[e11];
              tL[e11] = -1 === t11 ? 0 : u2[t11];
            }
            let { chunkManager: c2 } = this;
            c2.registerLayer(this), function(e11, t11, r11, n11, i11, s11) {
              if (0 === n11.length) return;
              let { viewMatrix: a11, projectionMat: o11, displayDimensionRenderInfo: l3 } = e11, { voxelPhysicalScales: u3 } = l3, h3 = (0, eB.n_)(u3), c3 = (0, eB.V2)(o11), d2 = (c3 / r11) ** 3, f2 = eB.wO.determinant((0, eB.bZ)(tO, a11)), g2 = { spatialScales: /* @__PURE__ */ new Map(), activeIndex: -1 }, p2 = (e12) => Math.abs(n11[e12].chunkLayout.detTransform * f2), m2 = n11.length - 1, y2 = p2(m2);
              for (let e12 = m2; e12 >= 0; --e12) {
                let t12 = p2(e12), r12 = Math.cbrt(t12 * h3 / f2), n12 = c3 / Math.cbrt(t12);
                g2.spatialScales.set(r12, n12), t12 - d2 >= 0 && (y2 = t12, m2 = e12), g2.activeIndex = m2;
              }
              let v2 = Math.cbrt(y2 * h3 / f2), b2 = c3 / Math.cbrt(y2), w2 = true, S2 = n11[m2];
              tc(e11, t11, S2, (e12, t12) => {
                w2 && (i11(S2, m2, v2, b2, t12, g2), w2 = false), s11(S2, m2, e12);
              });
            }(a10, this.localPosition.value, this.renderScaleTarget.value, s10[0], (e11, r11) => {
              let { chunkLayout: n11 } = e11;
              n11.globalToLocalSpatial(t_, tL);
              let { size: i11, finiteRank: a11 } = n11;
              eB.R3.copy(tA, i11);
              for (let e12 = a11; e12 < 3; ++e12) tA[e12] = 0, t_[e12] = 0;
              let o11 = s10[0].length - 1 - r11;
              t10 = l2 + 1e9 * o11;
            }, (e11, r11, n11) => {
              eB.R3.multiply(tU, n11, tA);
              let i11 = -eB.R3.distance(t_, tU), s11 = e11.source.getChunk(e11.curPositionInChunks);
              ++this.numVisibleChunksNeeded, c2.requestChunk(s11, o10, t10 + i11), s11.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable;
            });
          }
        }
      }
      tD = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F("volume_rendering/VolumeRenderingRenderLayer")], tD), U("volume_rendering/VolumeRenderingRenderLayer/update", function(e10) {
        let t10 = this.get(e10.view), r10 = this.get(e10.layer), n10 = r10.attachments.get(t10);
        n10.state.transformedSources = tM(this, e10.sources, r10), n10.state.displayDimensionRenderInfo = e10.displayDimensionRenderInfo, r10.chunkManager.scheduleUpdateChunkPriorities();
      });
      let tz = "annotation.commit", tB = eB.wO.create();
      var tj = r2(658);
      let tF = "DisjointUint64Sets.add", tV = "DisjointUint64Sets.clear", tG = "DisjointUint64Sets.highBitRepresentativeChanged", tK = "DisjointUint64Sets.deleteSet";
      class tq extends B {
        constructor() {
          super(...arguments);
          __publicField(this, "disjointSets", new tj.D());
          __publicField(this, "changed", new H.K_());
        }
        get value() {
          return this;
        }
        static makeWithCounterpart(e10, t10) {
          let r10 = new tq();
          return r10.disjointSets.visibleSegmentEquivalencePolicy = t10, r10.registerDisposer(t10.changed.add(() => {
            tY(r10);
          })), r10.initializeCounterpart(e10), t10.value && tY(r10), r10;
        }
        link(e10, t10) {
          if (this.disjointSets.link(e10, t10)) {
            let { rpc: r10 } = this;
            return r10 && r10.invoke(tF, { id: this.rpcId, a: e10, b: t10 }), this.changed.dispatch(), true;
          }
          return false;
        }
        linkAll(e10) {
          for (let t10 = 1, r10 = e10.length; t10 < r10; ++t10) this.link(e10[0], e10[t10]);
        }
        has(e10) {
          return this.disjointSets.has(e10);
        }
        get(e10) {
          return this.disjointSets.get(e10);
        }
        clear() {
          if (this.disjointSets.clear()) {
            let { rpc: e10 } = this;
            e10 && e10.invoke(tV, { id: this.rpcId }), this.changed.dispatch();
          }
        }
        setElements(e10) {
          return this.disjointSets.setElements(e10);
        }
        deleteSet(e10) {
          if (this.disjointSets.deleteSet(e10)) {
            let { rpc: t10 } = this;
            t10 && t10.invoke(tK, { id: this.rpcId, x: e10 }), this.changed.dispatch();
          }
        }
        get size() {
          return this.disjointSets.size;
        }
        toJSON() {
          return this.disjointSets.toJSON();
        }
        restoreState(e10) {
          void 0 !== e10 && (0, ej.m7)(e10, (e11) => {
            let t10;
            (0, ej.m7)(e11, (e12) => {
              let r10 = (0, ej.tw)(e12);
              void 0 !== t10 && this.link(t10, r10), t10 = r10;
            });
          });
        }
        assignFrom(e10) {
          for (let [t10, r10] of (this.clear(), e10 instanceof tq && (e10 = e10.disjointSets), e10)) this.link(t10, r10);
        }
      }
      function tY(e10) {
        e10.rpc.invoke(tG, { id: e10.rpcId, value: e10.disjointSets.visibleSegmentEquivalencePolicy.value });
      }
      tq = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F("DisjointUint64Sets")], tq), U(tF, function(e10) {
        let t10 = this.get(e10.id);
        t10.disjointSets.link(e10.a, e10.b) && t10.changed.dispatch();
      }), U(tV, function(e10) {
        let t10 = this.get(e10.id);
        t10.disjointSets.clear() && t10.changed.dispatch();
      }), U(tG, function(e10) {
        this.get(e10.id).disjointSets.visibleSegmentEquivalencePolicy.value = e10.value;
      }), U(tK, function(e10) {
        let t10 = this.get(e10.id);
        t10.disjointSets.deleteSet(e10.x) && t10.changed.dispatch();
      });
      var tJ = r2(1425), tW = r2(686), tZ = r2(6224);
      let tX = 0n, tQ = 0n;
      class tH {
        constructor(e10 = tH.generateHashSeeds(3)) {
          __publicField(this, "hashSeeds");
          __publicField(this, "loadFactor");
          __publicField(this, "size");
          __publicField(this, "table");
          __publicField(this, "tableSize");
          __publicField(this, "empty");
          __publicField(this, "maxRehashAttempts");
          __publicField(this, "maxAttempts");
          __publicField(this, "capacity");
          __publicField(this, "generation");
          __publicField(this, "mungedEmptyKey");
          this.hashSeeds = e10, this.loadFactor = 0.8, this.size = 0, this.empty = 0xffffffffffffffffn, this.maxRehashAttempts = 5, this.maxAttempts = 5, this.generation = 0;
          let t10 = 8;
          for (; t10 < 2 * e10.length; ) t10 *= 2;
          this.allocate(t10);
        }
        updateHashFunctions(e10) {
          this.hashSeeds = tH.generateHashSeeds(e10), this.mungedEmptyKey = void 0;
        }
        tableWithMungedEmptyKey(e10) {
          let t10 = this.hashSeeds.length, r10 = Array(t10);
          for (let e11 = 0; e11 < t10; ++e11) r10[e11] = this.getHash(e11, this.empty);
          let { mungedEmptyKey: n10 } = this;
          if (void 0 === n10) e: for (; ; ) {
            n10 = (0, tW.ff)();
            for (let e11 = 0; e11 < t10; ++e11) {
              let i11 = this.getHash(e11, n10);
              for (let e12 = 0; e12 < t10; ++e12) if (r10[e12] === i11) continue e;
            }
            this.mungedEmptyKey = n10;
            break;
          }
          let { table: i10, empty: s10 } = this;
          for (let e11 = 0; e11 < t10; ++e11) {
            let t11 = r10[e11];
            i10[t11] === s10 && (i10[t11] = n10);
          }
          try {
            e10(i10);
          } finally {
            for (let e11 = 0; e11 < t10; ++e11) {
              let t11 = r10[e11];
              i10[t11] === n10 && (i10[t11] = s10);
            }
          }
        }
        static generateHashSeeds(e10 = 3) {
          return (0, tZ.PP)(new Uint32Array(e10));
        }
        getHash(e10, t10) {
          let r10 = this.hashSeeds[e10];
          return r10 = (0, tJ.B)(r10, Number(4294967295n & t10)), r10 = (0, tJ.B)(r10, Number(t10 >> 32n)), this.entryStride * (r10 & this.tableSize - 1);
        }
        *keys() {
          let { empty: e10, entryStride: t10 } = this, { table: r10 } = this;
          for (let n10 = 0, i10 = r10.length; n10 < i10; n10 += t10) {
            let t11 = r10[n10];
            t11 !== e10 && (yield t11);
          }
        }
        indexOf(e10) {
          let { table: t10, empty: r10 } = this;
          if (e10 === r10) return -1;
          for (let r11 = 0, n10 = this.hashSeeds.length; r11 < n10; ++r11) {
            let n11 = this.getHash(r11, e10);
            if (t10[n11] === e10) return n11;
          }
          return -1;
        }
        chooseAnotherEmptyKey() {
          let e10;
          let { empty: t10, table: r10, entryStride: n10 } = this;
          for (; (e10 = (0, tW.ff)()) === t10 || this.has(e10); ) ;
          this.empty = e10;
          for (let i10 = 0, s10 = r10.length; i10 < s10; i10 += n10) r10[i10] === t10 && (r10[i10] = e10);
        }
        has(e10) {
          return -1 !== this.indexOf(e10);
        }
        delete(e10) {
          let t10 = this.indexOf(e10);
          if (-1 !== t10) {
            let { table: e11 } = this;
            return e11[t10] = this.empty, ++this.generation, this.size--, true;
          }
          return false;
        }
        clearTable() {
          let { table: e10, empty: t10 } = this;
          e10.fill(t10);
        }
        clear() {
          return 0 !== this.size && (this.size = 0, ++this.generation, this.clearTable(), true);
        }
        reserve(e10) {
          return e10 > this.capacity && (this.backupPending(), this.grow(e10), this.restorePending(), true);
        }
        swapPending(e10, t10) {
          let r10 = tX;
          this.storePending(e10, t10), e10[t10] = r10;
        }
        storePending(e10, t10) {
          tX = e10[t10];
        }
        backupPending() {
          tQ = tX;
        }
        restorePending() {
          tX = tQ;
        }
        tryToInsert() {
          let e10 = 0, { empty: t10, maxAttempts: r10, table: n10 } = this, i10 = this.hashSeeds.length, s10 = Math.floor(Math.random() * i10);
          for (; ; ) {
            let a10 = this.getHash(s10, tX);
            if (this.swapPending(n10, a10), tX === t10) return true;
            if (++e10 === r10) break;
            s10 = (s10 + Math.floor(Math.random() * (i10 - 1)) + 1) % i10;
          }
          return false;
        }
        allocate(e10) {
          this.tableSize = e10;
          let { entryStride: t10 } = this;
          this.table = new BigUint64Array(e10 * t10), this.maxAttempts = e10, this.clearTable(), this.capacity = e10 * this.loadFactor, this.mungedEmptyKey = void 0;
        }
        rehash(e10, t10) {
          this.allocate(t10), this.updateHashFunctions(this.hashSeeds.length);
          let { empty: r10, entryStride: n10 } = this;
          for (let t11 = 0, i10 = e10.length; t11 < i10; t11 += n10) if (e10[t11] !== r10 && (this.storePending(e10, t11), !this.tryToInsert())) return false;
          return true;
        }
        grow(e10) {
          let t10 = this.table, { tableSize: r10 } = this;
          for (; r10 < e10; ) r10 *= 2;
          for (; ; ) {
            for (let e11 = 0; e11 < this.maxRehashAttempts; ++e11) if (this.rehash(t10, r10)) return;
            r10 *= 2;
          }
        }
        insertInternal() {
          for (++this.generation, tX === this.empty && this.chooseAnotherEmptyKey(), ++this.size > this.capacity && (this.backupPending(), this.grow(2 * this.tableSize), this.restorePending()); !this.tryToInsert(); ) this.backupPending(), this.grow(this.tableSize), this.restorePending();
        }
      }
      class t0 extends tH {
        add(e10) {
          return !this.has(e10) && (tX = e10, this.insertInternal(), true);
        }
        [Symbol.iterator]() {
          return this.keys();
        }
      }
      t0.prototype.entryStride = 1;
      let t1 = 0n, t22 = 0n;
      class t3 extends tH {
        set(e10, t10) {
          return !this.has(e10) && (tX = e10, t1 = t10, this.insertInternal(), true);
        }
        get(e10) {
          let t10 = this.indexOf(e10);
          if (-1 !== t10) return this.table[t10 + 1];
        }
        swapPending(e10, t10) {
          let r10 = t1;
          super.swapPending(e10, t10), e10[t10 + 1] = r10;
        }
        storePending(e10, t10) {
          super.storePending(e10, t10), t1 = e10[t10 + 1];
        }
        backupPending() {
          super.backupPending(), t22 = t1;
        }
        restorePending() {
          super.restorePending(), t1 = t22;
        }
        [Symbol.iterator]() {
          return this.entries();
        }
        *entries() {
          let { empty: e10, entryStride: t10 } = this, { table: r10 } = this;
          for (let n10 = 0, i10 = r10.length; n10 < i10; n10 += t10) {
            let t11 = r10[n10];
            if (t11 !== e10) {
              let e11 = r10[n10 + 1];
              yield [t11, e11];
            }
          }
        }
      }
      t3.prototype.entryStride = 2;
      class t4 extends B {
        constructor() {
          super(...arguments);
          __publicField(this, "hashTable", new t3());
          __publicField(this, "changed", new H.MZ());
        }
        get value() {
          return this;
        }
        static makeWithCounterpart(e10) {
          let t10 = new t4();
          return t10.initializeCounterpart(e10), t10;
        }
        set_(e10, t10) {
          return this.hashTable.set(e10, t10);
        }
        set(e10, t10) {
          if (this.set_(e10, t10)) {
            let { rpc: r10 } = this;
            r10 && r10.invoke("Uint64Map.set", { id: this.rpcId, key: e10, value: t10 }), this.changed.dispatch(e10, true);
          }
        }
        has(e10) {
          return this.hashTable.has(e10);
        }
        get(e10) {
          return this.hashTable.get(e10);
        }
        [Symbol.iterator]() {
          return this.hashTable.entries();
        }
        delete_(e10) {
          return this.hashTable.delete(e10);
        }
        delete(e10) {
          if (this.delete_(e10)) {
            let { rpc: t10 } = this;
            t10 && t10.invoke("Uint64Map.delete", { id: this.rpcId, key: e10 }), this.changed.dispatch(e10, false);
          }
        }
        get size() {
          return this.hashTable.size;
        }
        assignFrom(e10) {
          for (let [t10, r10] of (this.clear(), e10)) this.set(t10, r10);
        }
        clear() {
          if (this.hashTable.clear()) {
            let { rpc: e10 } = this;
            e10 && e10.invoke("Uint64Map.clear", { id: this.rpcId }), this.changed.dispatch(null, false);
          }
        }
        toJSON() {
          let e10 = {};
          for (let [t10, r10] of this.hashTable.entries()) e10[t10.toString()] = r10.toString();
          return e10;
        }
      }
      t4 = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F("Uint64Map")], t4), U("Uint64Map.set", function(e10) {
        let t10 = this.get(e10.id);
        t10.set_(e10.key, e10.value) && t10.changed.dispatch();
      }), U("Uint64Map.delete", function(e10) {
        let t10 = this.get(e10.id);
        t10.delete_(e10.key) && t10.changed.dispatch();
      }), U("Uint64Map.clear", function(e10) {
        let t10 = this.get(e10.id);
        t10.hashTable.clear() && t10.changed.dispatch();
      });
      class t6 extends B {
        constructor() {
          super(...arguments);
          __publicField(this, "hashTable", new t0());
          __publicField(this, "changed", new H.MZ());
        }
        get value() {
          return this;
        }
        static makeWithCounterpart(e10) {
          let t10 = new t6();
          return t10.initializeCounterpart(e10), t10;
        }
        set(e10, t10) {
          t10 ? this.add(e10) : this.delete(e10);
        }
        reserve_(e10) {
          return this.hashTable.reserve(e10);
        }
        reserve(e10) {
          if (this.reserve_(e10)) {
            let { rpc: t10 } = this;
            t10 && t10.invoke("Uint64Set.reserve", { id: this.rpcId, value: e10 });
          }
        }
        add_(e10) {
          let t10 = false;
          for (let r10 of e10) t10 = this.hashTable.add(r10) || t10;
          return t10;
        }
        add(e10) {
          let t10 = "bigint" == typeof e10 ? [e10] : e10;
          if (this.add_(t10)) {
            let { rpc: r10 } = this;
            r10 && r10.invoke("Uint64Set.add", { id: this.rpcId, value: t10 }), this.changed.dispatch(e10, true);
          }
        }
        has(e10) {
          return this.hashTable.has(e10);
        }
        [Symbol.iterator]() {
          return this.hashTable.keys();
        }
        keys() {
          return this.hashTable.keys();
        }
        delete_(e10) {
          let t10 = false;
          for (let r10 of e10) t10 = this.hashTable.delete(r10) || t10;
          return t10;
        }
        delete(e10) {
          let t10 = "bigint" == typeof e10 ? [e10] : e10;
          if (this.delete_(t10)) {
            let { rpc: r10 } = this;
            r10 && r10.invoke("Uint64Set.delete", { id: this.rpcId, value: t10 }), this.changed.dispatch(e10, false);
          }
        }
        get size() {
          return this.hashTable.size;
        }
        clear() {
          if (this.hashTable.clear()) {
            let { rpc: e10 } = this;
            e10 && e10.invoke("Uint64Set.clear", { id: this.rpcId }), this.changed.dispatch(null, false);
          }
        }
        toJSON() {
          let e10 = [];
          for (let t10 of this.keys()) e10.push(t10.toString());
          return e10.sort(), e10;
        }
        assignFrom(e10) {
          for (let t10 of (this.clear(), e10.keys())) this.add(t10);
        }
      }
      t6 = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F("Uint64Set")], t6), U("Uint64Set.reserve", function(e10) {
        let t10 = this.get(e10.id);
        t10.reserve_(e10.value) && t10.changed.dispatch();
      }), U("Uint64Set.add", function(e10) {
        let t10 = this.get(e10.id);
        t10.add_(e10.value) && t10.changed.dispatch();
      }), U("Uint64Set.delete", function(e10) {
        let t10 = this.get(e10.id);
        t10.delete_(e10.value) && t10.changed.dispatch();
      }), U("Uint64Set.clear", function(e10) {
        let t10 = this.get(e10.id);
        t10.hashTable.clear() && t10.changed.dispatch();
      });
      var t8 = r2(4066);
      let t5 = ["visibleSegments", "segmentEquivalences", "temporaryVisibleSegments", "temporarySegmentEquivalences", "useTemporaryVisibleSegments", "useTemporarySegmentEquivalences"];
      function t9(e10, t10, r10) {
        e10.registerDisposer(t10.visibleSegments.changed.add(r10)), e10.registerDisposer(t10.segmentEquivalences.changed.add(r10));
      }
      function t7(e10, t10, r10) {
        e10.registerDisposer(t10.temporaryVisibleSegments.changed.add(r10)), e10.registerDisposer(t10.temporarySegmentEquivalences.changed.add(r10)), e10.registerDisposer(t10.useTemporaryVisibleSegments.changed.add(r10)), e10.registerDisposer(t10.useTemporarySegmentEquivalences.changed.add(r10));
      }
      function re(e10) {
        return e10.toString();
      }
      function rt(e10, t10) {
        let r10 = e10.useTemporaryVisibleSegments.value ? e10.temporaryVisibleSegments : e10.visibleSegments, n10 = e10.useTemporarySegmentEquivalences.value ? e10.temporarySegmentEquivalences : e10.segmentEquivalences, i10 = n10.disjointSets.visibleSegmentEquivalencePolicy.value;
        for (let e11 of r10.keys()) if (i10 & t8.BA.NONREPRESENTATIVE_EXCLUDED) {
          let r11 = n10.get(e11);
          t10(e11, r11);
        } else {
          if (!n10.disjointSets.isMinElement(e11)) continue;
          for (let r11 of n10.setElements(e11)) (!(i10 & t8.BA.REPRESENTATIVE_EXCLUDED) || !(i10 & t8.BA.MAX_REPRESENTATIVE) || (0x8000000000000000n & r11) === 0n) && t10(r11, e11);
        }
      }
      function rr(e10, t10, r10 = {}) {
        for (let n10 of t5) r10[n10] = e10.get(t10[n10]);
        return r10;
      }
      let rn = (e10) => class extends e10 {
        constructor(...e11) {
          let [t10, r10] = e11;
          super(t10, r10);
          __publicField(this, "visibleSegments");
          __publicField(this, "selectedSegments");
          __publicField(this, "segmentEquivalences");
          __publicField(this, "temporaryVisibleSegments");
          __publicField(this, "temporarySegmentEquivalences");
          __publicField(this, "useTemporaryVisibleSegments");
          __publicField(this, "useTemporarySegmentEquivalences");
          __publicField(this, "transform");
          __publicField(this, "renderScaleTarget");
          rr(t10, r10, this), this.transform = t10.get(r10.transform), this.renderScaleTarget = t10.get(r10.renderScaleTarget);
          let n10 = () => {
            this.chunkManager.scheduleUpdateChunkPriorities();
          };
          t7(this, this, n10), t9(this, this, n10), this.registerDisposer(this.transform.changed.add(n10)), this.registerDisposer(this.renderScaleTarget.changed.add(n10));
        }
      };
      function ri(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      class rs extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "annotation");
        }
        freeSystemMemory() {
          this.annotation = void 0;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10), e10.annotation = this.annotation;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = this.gpuMemoryBytes = 0, super.downloadSucceeded();
        }
      }
      class ra {
        constructor() {
          __publicField(this, "data");
          __publicField(this, "typeToOffset");
          __publicField(this, "typeToIds");
          __publicField(this, "typeToIdMaps");
        }
        serialize(e10, t10) {
          e10.data = this.data, e10.typeToOffset = this.typeToOffset, e10.typeToIds = this.typeToIds, e10.typeToIdMaps = this.typeToIdMaps, t10.push(this.data.buffer);
        }
        get numBytes() {
          return this.data.byteLength;
        }
      }
      function ro(e10) {
        return class extends e10 {
          constructor() {
            super(...arguments);
            __publicField(this, "data");
          }
          serialize(e11, t10) {
            super.serialize(e11, t10);
            let { data: r10 } = this;
            void 0 !== r10 && (r10.serialize(e11, t10), this.data = void 0);
          }
          downloadSucceeded() {
            let { data: e11 } = this;
            this.systemMemoryBytes = this.gpuMemoryBytes = void 0 === e11 ? 0 : e11.numBytes, super.downloadSucceeded();
          }
          freeSystemMemory() {
            this.data = void 0;
          }
        };
      }
      class rl extends ro(tx) {
      }
      class ru extends ro(er) {
        constructor() {
          super(...arguments);
          __publicField(this, "objectId");
        }
      }
      class rh extends es {
        constructor() {
          super(...arguments);
          __publicField(this, "parent");
        }
        getChunk(e10) {
          let { chunks: t10 } = this, r10 = t10.get(e10);
          return void 0 === r10 && ((r10 = this.getNewChunk_(rs)).initialize(e10), this.addChunk(r10)), r10;
        }
        download(e10, t10) {
          return this.parent.downloadMetadata(e10, t10);
        }
      }
      rh = ri([F("annotation.MetadataChunkSource")], rh);
      class rc extends tT {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "parent");
          this.parent = e10.get(t10.parent);
        }
      }
      rc.prototype.chunkConstructor = rl;
      class rd extends es {
        constructor() {
          super(...arguments);
          __publicField(this, "parent");
          __publicField(this, "relationshipIndex");
        }
        getChunk(e10) {
          let t10 = re(e10), { chunks: r10 } = this, n10 = r10.get(t10);
          return void 0 === n10 && ((n10 = this.getNewChunk_(ru)).initialize(t10), n10.objectId = e10, this.addChunk(n10)), n10;
        }
        download(e10, t10) {
          return this.parent.downloadSegmentFilteredGeometry(e10, this.relationshipIndex, t10);
        }
      }
      rd = ri([F("annotation.SubsetGeometryChunkSource")], rd);
      class rf extends B {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "references", /* @__PURE__ */ new Set());
          __publicField(this, "chunkManager");
          __publicField(this, "metadataChunkSource");
          __publicField(this, "segmentFilteredSources");
          let r10 = this.chunkManager = e10.get(t10.chunkManager), n10 = this.metadataChunkSource = this.registerDisposer(e10.getRef(t10.metadataChunkSource));
          this.segmentFilteredSources = t10.segmentFilteredSource.map((t11, r11) => {
            let n11 = this.registerDisposer(e10.getRef(t11));
            return n11.parent = this, n11.relationshipIndex = r11, n11;
          }), n10.parent = this, this.registerDisposer(r10.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
        }
        recomputeChunkPriorities() {
          let { chunkManager: e10, metadataChunkSource: t10 } = this;
          for (let r10 of this.references) e10.requestChunk(t10.getChunk(r10), Y.VISIBLE, 200);
        }
        add(e10) {
          throw Error("Not implemented");
        }
        delete(e10) {
          throw Error("Not implemented");
        }
        update(e10, t10) {
          throw Error("Not implemented");
        }
      }
      U("annotation.reference.add", function(e10) {
        let t10 = this.get(e10.id);
        t10.references.add(e10.annotation), t10.chunkManager.scheduleUpdateChunkPriorities();
      }), U("annotation.reference.delete", function(e10) {
        let t10 = this.get(e10.id);
        t10.references.delete(e10.annotation), t10.chunkManager.scheduleUpdateChunkPriorities();
      }), U("annotation.commit", function(e10) {
        let t10;
        let r10 = this.get(e10.id), n10 = e10.annotationId, i10 = e10.newAnnotation;
        (void 0 === n10 ? r10.add(i10).then((e11) => ({ ...i10, id: e11 })) : null === i10 ? r10.delete(n10).then(() => null) : r10.update(n10, i10).then(() => i10)).then((e11) => {
          r10.wasDisposed || this.invoke(tz, { id: r10.rpcId, annotationId: n10 || i10.id, newAnnotation: e11 });
        }, (e11) => {
          r10.wasDisposed || this.invoke(tz, { id: r10.rpcId, annotationId: n10 || i10?.id, error: e11.message });
        });
      });
      class rg extends ey(e_) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "localPosition");
          __publicField(this, "renderScaleTarget");
          this.renderScaleTarget = e10.get(t10.renderScaleTarget), this.localPosition = e10.get(t10.localPosition);
          let r10 = () => this.chunkManager.scheduleUpdateChunkPriorities();
          this.registerDisposer(this.localPosition.changed.add(r10)), this.registerDisposer(this.renderScaleTarget.changed.add(r10)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
        }
        attach(e10) {
          let t10 = () => this.chunkManager.scheduleUpdateChunkPriorities(), { view: r10 } = e10;
          e10.registerDisposer(t10), e10.registerDisposer(r10.projectionParameters.changed.add(t10)), e10.registerDisposer(r10.visibility.changed.add(t10)), e10.state = { displayDimensionRenderInfo: r10.projectionParameters.value.displayDimensionRenderInfo, transformedSources: [] };
        }
        recomputeChunkPriorities() {
          for (let e10 of (this.chunkManager.registerLayer(this), this.attachments.values())) {
            let { view: t10 } = e10, r10 = t10.visibility.value;
            if (r10 === Number.NEGATIVE_INFINITY) continue;
            let n10 = e10.state, { transformedSources: i10 } = n10;
            if (0 === i10.length || !e3(n10, t10.projectionParameters.value.displayDimensionRenderInfo)) continue;
            let s10 = tm(r10), a10 = ty(r10), o10 = t10.projectionParameters.value, { chunkManager: l2 } = this;
            !function(e11, t11, r11, n11, i11, s11) {
              let { displayDimensionRenderInfo: a11, viewMatrix: o11, projectionMat: l3, width: u2, height: h2 } = e11, { voxelPhysicalScales: c2 } = a11, d2 = Math.abs(eB.wO.determinant((0, eB.bZ)(tB, o11))), f2 = (0, eB.n_)(c2), g2 = (0, eB.e6)(l3) / d2 * f2;
              if (0 === n11.length) return;
              let p2 = n11[0], m2 = Math.abs(p2.chunkLayout.detTransform) * f2, { lowerClipDisplayBound: y2, upperClipDisplayBound: v2 } = p2;
              for (let e12 = 0; e12 < 3; ++e12) m2 *= v2[e12] - y2[e12];
              let b2 = Math.min(m2, g2), w2 = u2 * h2, S2 = w2 / r11 ** 2 / b2, E2 = 0;
              for (let r12 = n11.length - 1; r12 >= 0 && E2 < S2; --r12) {
                let a12 = n11[r12], o12 = a12.source.spec, { chunkLayout: l4 } = a12, u3 = (0, eB.n_)(l4.size) * Math.abs(l4.detTransform) * f2, { limit: h3, rank: c3 } = o12, { nonDisplayLowerClipBound: d3, nonDisplayUpperClipBound: g3 } = a12, p3 = 1;
                for (let e12 = 0; e12 < c3; ++e12) {
                  let t12 = g3[e12] - d3[e12];
                  Number.isFinite(t12) && (p3 /= t12);
                }
                let m3 = true, y3 = E2 + h3 * p3 / u3, v3 = (1 / y3) ** (1 / 3), k2 = Math.sqrt(w2 / (y3 * b2)), I2 = Math.min(1, (S2 - E2) * u3 / p3 / o12.limit);
                tc(e11, t11, a12, () => {
                  m3 && (i11(a12, r12), m3 = false), s11(a12, r12, I2, v3, k2);
                }), E2 = y3;
              }
            }(o10, this.localPosition.value, this.renderScaleTarget.value, i10[0], () => {
            }, (e11, t11) => {
              let r11 = e11.source.getChunk(e11.curPositionInChunks);
              ++this.numVisibleChunksNeeded, r11.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable, l2.requestChunk(r11, s10, a10 + 0 + 1e9 * t11);
            });
          }
        }
      }
      rg = ri([F("annotation/SpatiallyIndexedRenderLayer")], rg), U("annotation/PerspectiveRenderLayer:updateSources", function(e10) {
        let t10 = this.get(e10.view), r10 = this.get(e10.layer), n10 = r10.attachments.get(t10);
        n10.state.transformedSources = tM(this, e10.sources, r10), n10.state.displayDimensionRenderInfo = e10.displayDimensionRenderInfo, r10.chunkManager.scheduleUpdateChunkPriorities();
      });
      class rp extends tp(ey(eg)) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "source");
          __publicField(this, "segmentationStates");
          this.source = e10.get(t10.source), this.segmentationStates = new k.SN(this.getSegmentationState(t10.segmentationStates));
          let r10 = () => this.chunkManager.scheduleUpdateChunkPriorities();
          this.registerDisposer((0, k.Uw)((e11, t11) => {
            if (void 0 !== t11) {
              for (let n10 of t11) null != n10 && (t9(e11, n10, r10), t7(e11, n10, r10));
              r10();
            }
          }, this.segmentationStates)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
        }
        recomputeChunkPriorities() {
          let e10 = this.visibility.value;
          if (e10 === Number.NEGATIVE_INFINITY) return;
          let { segmentationStates: { value: t10 }, source: { segmentFilteredSources: r10 } } = this;
          if (void 0 === t10) return;
          let { chunkManager: n10 } = this;
          n10.registerLayer(this);
          let i10 = t10.length;
          for (let s10 = 0; s10 < i10; ++s10) {
            let i11 = t10[s10];
            if (null == i11) continue;
            let a10 = tm(e10), o10 = ty(e10), l2 = r10[s10];
            rt(i11, (e11) => {
              let t11 = l2.getChunk(e11);
              ++this.numVisibleChunksNeeded, t11.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable, n10.requestChunk(t11, a10, o10 + 60);
            });
          }
        }
        getSegmentationState(e10) {
          if (void 0 !== e10) return e10.map((e11) => null == e11 ? e11 : rr(this.rpc, e11));
        }
      }
      rp = ri([F("annotation/RenderLayer")], rp), U("annotation/RenderLayer.updateSegmentation", function(e10) {
        let t10 = this.get(e10.id);
        t10.segmentationStates.value = t10.getSegmentationState(e10.segmentationStates);
      });
      var rm = r2(4406), ry = r2(2258);
      async function rv(e10, t10, r10) {
        return (0, ry.ru)(t10, r10).catch((n10) => {
          if (500 !== n10.status && 401 !== n10.status && 403 !== n10.status && 504 !== n10.status) throw n10;
          return (0, rm.q)(e10, t10, r10, (e11) => {
            let t11 = new Headers(r10.headers);
            return t11.set("Authorization", `Bearer ${e11}`), { ...r10, headers: t11 };
          }, (e11) => {
            let { status: t11 } = e11;
            if (403 === t11 || 401 === t11) return "refresh";
            throw e11;
          });
        });
      }
      var rb = r2(5675), rw = r2(7688), rS = ((g = {})[g.LITTLE = 0] = "LITTLE", g[g.BIG = 1] = "BIG", g);
      let rE = 17 === new Uint8Array(Uint16Array.of(4386).buffer)[0] ? 1 : 0;
      function rk(e10) {
        let t10 = new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength);
        for (let e11 = 0, r10 = t10.length; e11 < r10; e11 += 2) {
          let r11 = t10[e11];
          t10[e11] = t10[e11 + 1], t10[e11 + 1] = r11;
        }
      }
      function rI(e10) {
        let t10 = new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength);
        for (let e11 = 0, r10 = t10.length; e11 < r10; e11 += 4) {
          let r11 = t10[e11];
          t10[e11] = t10[e11 + 3], t10[e11 + 3] = r11, r11 = t10[e11 + 1], t10[e11 + 1] = t10[e11 + 2], t10[e11 + 2] = r11;
        }
      }
      function rM(e10) {
        let t10 = new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength);
        for (let e11 = 0, r10 = t10.length; e11 < r10; e11 += 8) {
          let r11 = t10[e11];
          t10[e11] = t10[e11 + 7], t10[e11 + 7] = r11, r11 = t10[e11 + 1], t10[e11 + 1] = t10[e11 + 6], t10[e11 + 6] = r11, r11 = t10[e11 + 2], t10[e11 + 2] = t10[e11 + 5], t10[e11 + 5] = r11, r11 = t10[e11 + 3], t10[e11 + 3] = t10[e11 + 4], t10[e11 + 4] = r11;
        }
      }
      function rx(e10, t10, r10 = rE) {
        t10 !== r10 && rI(e10);
      }
      function rT(e10, t10, r10, n10 = rE) {
        if (t10 !== n10 && 1 !== r10) switch (r10) {
          case 2:
            rk(e10);
            break;
          case 4:
            rI(e10);
            break;
          case 8:
            rM(e10);
        }
      }
      function rC(e10, t10, r10, n10, i10, s10) {
        let a10 = Math.max(e10, t10, r10), o10 = 0, l2 = 0n;
        function u2(e11) {
          l2 |= BigInt(e11) << BigInt(o10++);
        }
        for (let o11 = 0; o11 < a10; ++o11) o11 < e10 && u2(n10 >> o11 & 1), o11 < t10 && u2(i10 >> o11 & 1), o11 < r10 && u2(s10 >> o11 & 1);
        return l2;
      }
      function rN(e10, t10, r10, n10, i10, s10) {
        var a10, o10, l2, u2;
        let h2 = r10, c2 = s10;
        return (a10 = h2 ^ c2) < (o10 = t10 ^ i10) && a10 < (a10 ^ o10) && (h2 = t10, c2 = i10), (l2 = h2 ^ c2) < (u2 = e10 ^ n10) && l2 < (l2 ^ u2) && (h2 = e10, c2 = n10), h2 < c2;
      }
      function r$(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      class rR extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "objectId", 0n);
          __publicField(this, "fragmentIds");
        }
        initializeManifestChunk(e10, t10) {
          super.initialize(e10), this.objectId = t10;
        }
        freeSystemMemory() {
          this.fragmentIds = null;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10), e10.fragmentIds = this.fragmentIds;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = 100, this.gpuMemoryBytes = 0, super.downloadSucceeded(), this.priorityTier < Y.RECENT && this.source.chunkManager.scheduleUpdateChunkPriorities();
        }
        toString() {
          return this.objectId.toString();
        }
      }
      function rP(e10, t10, r10) {
        let { vertexPositions: n10, indices: i10, vertexNormals: s10, strips: a10 } = e10;
        t10.vertexPositions = n10, t10.indices = i10, t10.strips = a10, t10.vertexNormals = s10;
        let o10 = n10.buffer;
        r10.push(o10);
        let l2 = i10.buffer;
        l2 !== o10 && r10.push(l2), r10.push(s10.buffer);
      }
      function rO(e10) {
        let { vertexPositions: t10, indices: r10, vertexNormals: n10 } = e10;
        return t10.byteLength + r10.byteLength + n10.byteLength;
      }
      class rU extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "manifestChunk", null);
          __publicField(this, "fragmentId", null);
          __publicField(this, "meshData", null);
        }
        initializeFragmentChunk(e10, t10, r10) {
          super.initialize(e10), this.manifestChunk = t10, this.fragmentId = r10;
        }
        freeSystemMemory() {
          this.manifestChunk = null, this.meshData = null, this.fragmentId = null;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10), rP(this.meshData, e10, t10), this.meshData = null;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = this.gpuMemoryBytes = rO(this.meshData), super.downloadSucceeded();
        }
      }
      function r_(e10, t10, r10) {
        (0, ej.PT)(t10), e10.fragmentIds = (0, ej.uq)(t10, r10, ej.zE);
      }
      function rA(e10, t10) {
        let r10 = eB.R3.create(), n10 = eB.R3.create(), i10 = eB.R3.create(), s10 = new Float32Array(e10.length), a10 = t10.length;
        for (let o11 = 0; o11 < a10; o11 += 3) {
          let a11 = 3 * t10[o11], l2 = 3 * t10[o11 + 1], u2 = 3 * t10[o11 + 2];
          for (let t11 = 0; t11 < 3; ++t11) n10[t11] = e10[l2 + t11] - e10[a11 + t11], i10[t11] = e10[u2 + t11] - e10[l2 + t11];
          eB.R3.cross(r10, n10, i10), eB.R3.normalize(r10, r10);
          for (let e11 = 0; e11 < 3; ++e11) {
            let n11 = 3 * t10[o11 + e11];
            for (let e12 = 0; e12 < 3; ++e12) s10[n11 + e12] += r10[e12];
          }
        }
        let o10 = s10.length;
        for (let e11 = 0; e11 < o10; e11 += 3) {
          let t11 = s10.subarray(e11, e11 + 3);
          eB.R3.normalize(t11, t11);
        }
        return s10;
      }
      function rL(e10) {
        return Math.min(Math.max(-127, 127 * e10 + 0.5), 127) >>> 0;
      }
      function rD(e10, t10, r10, n10, i10, s10, a10) {
        let o10;
        let l2 = new Float32Array(t10, n10, 3 * i10);
        rx(l2, r10), void 0 === s10 && (s10 = n10 + 12 * i10), void 0 !== a10 && (o10 = a10 * e10);
        let u2 = void 0 === o10 ? new Uint32Array(t10, s10) : new Uint32Array(t10, s10, o10);
        if (u2.length % e10 != 0) throw Error(`Number of indices is not a multiple of ${e10}: ${u2.length}.`);
        return rx(u2, r10), { vertexPositions: l2, indices: u2 };
      }
      class rz extends es {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "fragmentSource");
          (this.fragmentSource = this.registerDisposer(e10.getRef(t10.fragmentSource))).meshSource = this;
        }
        getChunk(e10) {
          let t10 = re(e10), r10 = this.chunks.get(t10);
          return void 0 === r10 && ((r10 = this.getNewChunk_(rR)).initializeManifestChunk(t10, e10), this.addChunk(r10)), r10;
        }
        getFragmentKey(e10, t10) {
          return { key: `${e10}/${t10}`, fragmentId: t10 };
        }
        getFragmentChunk(e10, t10) {
          let r10 = this.fragmentSource, { key: n10, fragmentId: i10 } = this.getFragmentKey(e10.key, t10), s10 = r10.chunks.get(n10);
          return void 0 === s10 && ((s10 = r10.getNewChunk_(rU)).initializeFragmentChunk(n10, e10, i10), r10.addChunk(s10)), s10;
        }
      }
      class rB extends es {
        constructor() {
          super(...arguments);
          __publicField(this, "meshSource", null);
        }
        download(e10, t10) {
          return this.meshSource.downloadFragment(e10, t10);
        }
      }
      rB = r$([F(rw.q7)], rB);
      class rj extends rn(tp(ey(tP))) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "source");
          this.source = this.registerDisposer(e10.getRef(t10.source)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
            this.updateChunkPriorities();
          }));
        }
        attach(e10) {
          let t10 = () => {
            this.chunkManager.scheduleUpdateChunkPriorities();
          }, { view: r10 } = e10;
          e10.registerDisposer(r10.visibility.changed.add(t10)), e10.registerDisposer(t10), t10();
        }
        updateChunkPriorities() {
          let e10 = this.visibility.value;
          if (e10 === Number.NEGATIVE_INFINITY) return;
          this.chunkManager.registerLayer(this);
          let t10 = tm(e10), r10 = ty(e10), { source: n10, chunkManager: i10 } = this;
          rt(this, (e11) => {
            let s10 = n10.getChunk(e11);
            ++this.numVisibleChunksNeeded, i10.requestChunk(s10, t10, r10 + 100);
            let a10 = s10.state;
            if (a10 === q.SYSTEM_MEMORY_WORKER || a10 === q.SYSTEM_MEMORY || a10 === q.GPU_MEMORY) for (let e12 of (++this.numVisibleChunksAvailable, s10.fragmentIds)) {
              let a11 = n10.getFragmentChunk(s10, e12);
              ++this.numVisibleChunksNeeded, i10.requestChunk(a11, t10, r10 + 50), a11.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable;
            }
          });
        }
      }
      rj = r$([F(rw.ve)], rj);
      class rF extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "objectId", 0n);
          __publicField(this, "manifest");
        }
        initializeManifestChunk(e10, t10) {
          super.initialize(e10), this.objectId = t10;
        }
        freeSystemMemory() {
          this.manifest = void 0;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10), e10.manifest = this.manifest;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = this.manifest.octree.byteLength, this.gpuMemoryBytes = 0, super.downloadSucceeded(), this.priorityTier < Y.RECENT && this.source.chunkManager.scheduleUpdateChunkPriorities();
        }
        toString() {
          return this.objectId.toString();
        }
      }
      class rV extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "subChunkOffsets", null);
          __publicField(this, "meshData", null);
          __publicField(this, "lod", 0);
          __publicField(this, "chunkIndex", 0);
          __publicField(this, "manifestChunk", null);
        }
        freeSystemMemory() {
          this.meshData = this.subChunkOffsets = null;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10), rP(this.meshData, e10, t10);
          let { subChunkOffsets: r10 } = this;
          e10.subChunkOffsets = r10, t10.push(r10.buffer), this.meshData = this.subChunkOffsets = null;
        }
        downloadSucceeded() {
          let { subChunkOffsets: e10 } = this;
          this.systemMemoryBytes = this.gpuMemoryBytes = rO(this.meshData), this.systemMemoryBytes += e10.byteLength, super.downloadSucceeded();
        }
      }
      class rG extends es {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "fragmentSource");
          __publicField(this, "format");
          let r10 = this.fragmentSource = this.registerDisposer(e10.getRef(t10.fragmentSource));
          this.format = t10.format, r10.meshSource = this;
        }
        getChunk(e10) {
          let t10 = re(e10), r10 = this.chunks.get(t10);
          return void 0 === r10 && ((r10 = this.getNewChunk_(rF)).initializeManifestChunk(t10, e10), this.addChunk(r10)), r10;
        }
        getFragmentChunk(e10, t10, r10) {
          let n10 = `${e10.key}/${t10}:${r10}`, i10 = this.fragmentSource, s10 = i10.chunks.get(n10);
          return void 0 === s10 && ((s10 = i10.getNewChunk_(rV)).initialize(n10), s10.lod = t10, s10.chunkIndex = r10, s10.manifestChunk = e10, i10.addChunk(s10)), s10;
        }
      }
      class rK extends es {
        constructor() {
          super(...arguments);
          __publicField(this, "meshSource", null);
        }
        download(e10, t10) {
          return this.meshSource.downloadFragment(e10, t10);
        }
      }
      rK = r$([F(rw.Ff)], rK);
      let rq = eB._E.create();
      class rY extends rn(tp(ey(tP))) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "source");
          this.source = this.registerDisposer(e10.getRef(t10.source)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
            this.updateChunkPriorities();
          }));
        }
        attach(e10) {
          let t10 = () => this.chunkManager.scheduleUpdateChunkPriorities(), { view: r10 } = e10;
          e10.registerDisposer(r10.projectionParameters.changed.add(t10)), e10.registerDisposer(r10.visibility.changed.add(t10)), e10.registerDisposer(t10), t10();
        }
        updateChunkPriorities() {
          let e10 = this.visibility.value;
          if (e10 === Number.NEGATIVE_INFINITY) return;
          let { transform: { value: t10 } } = this;
          if (void 0 !== t10.error) return;
          let r10 = [];
          this.chunkManager.registerLayer(this);
          {
            let t11 = tm(e10), n11 = ty(e10), { source: i11, chunkManager: s10 } = this;
            rt(this, (e11) => {
              let a10 = i11.getChunk(e11);
              ++this.numVisibleChunksNeeded, s10.requestChunk(a10, t11, n11 + 100);
              let o10 = a10.state;
              (o10 === q.SYSTEM_MEMORY_WORKER || o10 === q.SYSTEM_MEMORY || o10 === q.GPU_MEMORY) && (r10.push(a10), ++this.numVisibleChunksAvailable);
            });
          }
          if (0 === r10.length) return;
          let { source: n10, chunkManager: i10 } = this;
          for (let { view: e11 } of this.attachments.values()) {
            let s10 = e11.visibility.value;
            if (s10 === Number.NEGATIVE_INFINITY) continue;
            let a10 = tm(s10), o10 = ty(s10), l2 = e11.projectionParameters.value;
            try {
              !function(e12, t11, r11) {
                e12.fill(0), e12[15] = 1;
                let n11 = true, { displayDimensionIndices: i11 } = t11, { globalToRenderLayerDimensions: s11, modelToRenderLayerTransform: a11 } = r11, o11 = r11.rank;
                for (let t12 = 0; t12 < 3; ++t12) {
                  let r12 = i11[t12];
                  if (-1 === r12) {
                    n11 = false;
                    continue;
                  }
                  let l3 = s11[r12];
                  if (-1 === l3) {
                    n11 = false;
                    continue;
                  }
                  e12[t12 + 12] = a11[l3 + o11 * (o11 + 1)];
                  for (let r13 = 0; r13 < 3; ++r13) e12[t12 + 4 * r13] = a11[l3 + (o11 + 1) * r13];
                }
                if (!n11) {
                  let { globalDimensionNames: e13 } = t11, n12 = Array.from(i11.filter((e14) => -1 !== e14), (t12) => e13[t12]).join(",\xA0");
                  throw Error(`Transform from model dimensions (${r11.modelDimensionNames.join(",\xA0")}) to display dimensions (${n12}) does not have full rank`);
                }
              }(rq, l2.displayDimensionRenderInfo, t10);
            } catch {
              continue;
            }
            eB._E.multiply(rq, l2.viewProjectionMat, rq);
            let u2 = (0, eB.th)(new Float32Array(24), rq), h2 = this.renderScaleTarget.value;
            for (let e12 of r10) {
              let t11 = e12.manifest.lodScales.length - 1;
              !function(e13, t12, r11, n11, i11, s11, a11) {
                let { octree: o11, lodScales: l3, chunkGridSpatialOrigin: u3, chunkShape: h3 } = e13, c2 = l3.length - 1, d2 = t12[0], f2 = t12[4], g2 = t12[8], p2 = t12[1], m2 = t12[5], y2 = t12[9], v2 = t12[3], b2 = t12[7], w2 = t12[11], S2 = t12[15], E2 = v2 > 0 ? 0 : 1, k2 = b2 > 0 ? 0 : 1, I2 = w2 > 0 ? 0 : 1, M2 = r11[16], x2 = r11[17], T2 = r11[18], C2 = r11[19], N2 = -C2 * M2 * v2 + -C2 * x2 * b2 + -C2 * T2 * w2 + S2, $2 = e13.clipLowerBound[0], R2 = e13.clipLowerBound[1], P2 = e13.clipLowerBound[2], O2 = e13.clipUpperBound[0], U2 = e13.clipUpperBound[1], _2 = e13.clipUpperBound[2], A2 = Math.max(Math.sqrt((d2 * i11) ** 2 + (p2 * s11) ** 2), Math.sqrt((f2 * i11) ** 2 + (m2 * s11) ** 2), Math.sqrt((g2 * i11) ** 2 + (y2 * s11) ** 2));
                !function e14(t13, i12, s12) {
                  let c3 = 1 << t13, d3 = 5 * i12, f3 = o11[d3], g3 = o11[d3 + 1], p3 = o11[d3 + 2], m3 = o11[d3 + 3], y3 = o11[d3 + 4], M3 = f3 * c3 * h3[0] + u3[0], x3 = g3 * c3 * h3[1] + u3[1], T3 = p3 * c3 * h3[2] + u3[2], C3 = M3 + c3 * h3[0], L2 = x3 + c3 * h3[1], D2 = T3 + c3 * h3[2];
                  if (M3 = Math.max(M3, $2), x3 = Math.max(x3, R2), T3 = Math.max(T3, P2), C3 = Math.min(C3, O2), L2 = Math.min(L2, U2), D2 = Math.min(D2, _2), (0, eB.Rq)(M3, x3, T3, C3, L2, D2, r11)) {
                    var z2, B2, j2;
                    let r12 = Math.max(N2, v2 * ((z2 = M3) + E2 * (C3 - z2)) + b2 * ((B2 = x3) + k2 * (L2 - B2)) + w2 * ((j2 = T3) + I2 * (D2 - j2)) + S2) / A2;
                    if (0 === s12 || r12 * n11 < s12) {
                      let o12 = l3[t13];
                      if (0 !== o12 && a11(t13, i12, o12 / r12, y3 >>> 31), t13 > 0 && (0 === o12 || r12 * n11 < o12)) {
                        let r13 = 0 === o12 ? s12 : o12, n12 = (2147483647 & y3) >>> 0;
                        for (let i13 = m3; i13 < n12; ++i13) e14(t13 - 1, i13, r13);
                      }
                    }
                  }
                }(c2, o11.length / 5 - 1, 0);
              }(e12.manifest, rq, u2, h2, l2.width, l2.height, (r11, s11, l3, u3) => {
                if (u3) return;
                let h3 = n10.getFragmentChunk(e12, r11, s11);
                ++this.numVisibleChunksNeeded, i10.requestChunk(h3, a10, o10 + 50 - t11 + r11), h3.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable;
              });
            }
          }
        }
      }
      function rJ(e10, t10) {
        let r10, n10;
        let i10 = rA(e10.vertexPositions, e10.indices), s10 = new Uint8Array(i10.length / 3 * 2);
        if (!function(e11, t11) {
          let r11 = t11.length, n11 = 0;
          for (let i11 = 0; i11 < r11; i11 += 3) {
            let r12 = t11[i11], s11 = t11[i11 + 1], a10 = t11[i11 + 2], o10 = 1 / (Math.abs(r12) + Math.abs(s11) + Math.abs(a10));
            a10 < 0 ? (e11[n11] = rL((1 - Math.abs(s11 * o10)) * (r12 < 0 ? -1 : 1)), e11[n11 + 1] = rL((1 - Math.abs(r12 * o10)) * (s11 < 0 ? -1 : 1))) : (e11[n11] = rL(r12 * o10), e11[n11 + 1] = rL(s11 * o10)), n11 += 2;
          }
        }(s10, i10), 4 === e10.indices.BYTES_PER_ELEMENT && e10.vertexPositions.length / 3 < 65535 ? (r10 = new Uint16Array(e10.indices.length)).set(e10.indices) : r10 = e10.indices, t10 === rw.k_.uint10) {
          let t11 = e10.vertexPositions, r11 = t11.length / 3;
          n10 = new Uint32Array(r11);
          for (let e11 = 0, i11 = 0; i11 < r11; e11 += 3, ++i11) n10[i11] = 1023 & t11[e11] | (1023 & t11[e11 + 1]) << 10 | (1023 & t11[e11 + 2]) << 20;
        } else if (t10 === rw.k_.uint16) {
          let t11 = e10.vertexPositions;
          2 === t11.BYTES_PER_ELEMENT ? n10 = t11 : (n10 = new Uint16Array(t11.length)).set(t11);
        } else n10 = e10.vertexPositions;
        return { vertexPositions: n10, vertexNormals: s10, indices: r10, strips: false };
      }
      function rW(e10, t10, r10 = rw.k_.float32) {
        e10.meshData = rJ(t10, r10);
      }
      function rZ(e10, t10, r10) {
        e10.meshData = rJ(t10, r10), e10.subChunkOffsets = t10.subChunkOffsets;
      }
      function rX(e10, t10, r10) {
        let n10 = r10;
        for (let r11 = 0; r11 < 3; ++r11) e10[5 * n10 + r11] = e10[5 * t10 + r11] >>> 1;
        e10[5 * n10 + 3] = t10;
        for (let i10 = t10 + 1; i10 < r10; ++i10) {
          let t11 = e10[5 * i10] >>> 1, r11 = e10[5 * i10 + 1] >>> 1, s10 = e10[5 * i10 + 2] >>> 1;
          (t11 !== e10[5 * n10] || r11 !== e10[5 * n10 + 1] || s10 !== e10[5 * n10 + 2]) && (e10[5 * n10 + 4] = i10, e10[5 * ++n10] = t11, e10[5 * n10 + 1] = r11, e10[5 * n10 + 2] = s10, e10[5 * n10 + 3] = i10);
        }
        return e10[5 * n10 + 4] = r10, ++n10;
      }
      rY = r$([F(rw.nL)], rY);
      let rQ = { id: "encodeCompressedSegmentationUint32" }, rH = { id: "encodeCompressedSegmentationUint64" }, r0 = 0, r1 = [], r22 = /* @__PURE__ */ new Map(), r3 = /* @__PURE__ */ new Map(), r4 = void 0 === navigator.hardwareConcurrency ? 4 : Math.min(12, navigator.hardwareConcurrency), r6 = 0;
      function r8(e10) {
        for (let [t10, r10] of r22) {
          r22.delete(t10), r10.cleanup?.(), e10.postMessage(r10.msg, r10.transfer);
          return;
        }
        r1.push(e10);
      }
      function r5(e10, t10, n10, ...i10) {
        let s10 = r6++, a10 = { t: e10.id, id: s10, args: i10 };
        t10?.throwIfAborted();
        let o10 = new Promise((e11, t11) => {
          r3.set(s10, { resolve: e11, reject: t11 });
        });
        if (0 !== r1.length) r1.pop().postMessage(a10, n10);
        else {
          let e11;
          if (void 0 !== t10) {
            let l2 = function() {
              r22.delete(s10);
              let e12 = r3.get(s10);
              r3.delete(s10), e12.reject(t10.reason);
            };
            t10.addEventListener("abort", l2, { once: true }), e11 = () => {
              t10.removeEventListener("abort", l2);
            };
          }
          r22.set(s10, { msg: a10, transfer: n10, cleanup: e11 }), r3.size > r0 && r0 < r4 && function() {
            ++r0;
            let e12 = new Worker(new URL(r2.p + r2.u("412"), r2.b), Object.assign({}, { type: "module" }, { type: void 0 })), t11 = false;
            e12.onmessage = (r10) => {
              if (!t11) {
                t11 = true, r8(e12);
                return;
              }
              let { id: n11, value: i11, error: s11 } = r10.data;
              r8(e12);
              let a11 = r3.get(n11);
              r3.delete(n11), void 0 !== a11 && (void 0 !== s11 ? a11.reject(s11) : a11.resolve(i11));
            };
          }();
        }
        return o10;
      }
      async function r9(e10, t10, r10) {
        let { spec: n10 } = e10.source;
        if (void 0 !== n10.compressedSegmentationBlockSize) {
          let { dataType: i10 } = n10, s10 = e10.chunkDataSize, a10 = [s10[0], s10[1], s10[2], s10[3] || 1];
          switch (i10) {
            case e9.UINT32:
              e10.data = await r5(rQ, t10, [r10.buffer], r10, a10, n10.compressedSegmentationBlockSize);
              break;
            case e9.UINT64:
              e10.data = await r5(rH, t10, [r10.buffer], r10, a10, n10.compressedSegmentationBlockSize);
              break;
            default:
              throw Error(`Unsupported data type for compressed segmentation: ${e9[i10]}`);
          }
        } else e10.data = r10;
      }
      var r7 = r2(2136);
      let ne = /* @__PURE__ */ new Map();
      for (let [e10, t10] of (ne.set("|u1", { endianness: rS.LITTLE, dataType: e9.UINT8 }), ne.set("|i1", { endianness: rS.LITTLE, dataType: e9.INT8 }), [["<", rS.LITTLE], [">", rS.BIG]])) {
        for (let r10 of ["u", "i"]) ne.set(`${e10}${r10}8`, { endianness: t10, dataType: e9.UINT64 });
        ne.set(`${e10}u2`, { endianness: t10, dataType: e9.UINT16 }), ne.set(`${e10}i2`, { endianness: t10, dataType: e9.INT16 }), ne.set(`${e10}u4`, { endianness: t10, dataType: e9.UINT32 }), ne.set(`${e10}i4`, { endianness: t10, dataType: e9.INT32 }), ne.set(`${e10}f4`, { endianness: t10, dataType: e9.FLOAT32 });
      }
      class nt {
        constructor(e10, t10, r10, n10) {
          __publicField(this, "data");
          __publicField(this, "shape");
          __publicField(this, "dataType");
          __publicField(this, "fortranOrder");
          this.data = e10, this.shape = t10, this.dataType = r10, this.fortranOrder = n10;
        }
      }
      async function nr(e10, t10, r10) {
        let n10 = function(e11) {
          let t11;
          if (147 !== e11[0] || 78 !== e11[1] || 85 !== e11[2] || 77 !== e11[3] || 80 !== e11[4] || 89 !== e11[5]) throw Error("Data does not match npy format.");
          let r11 = e11[6], n11 = e11[7];
          if (1 !== r11 || 0 !== n11) throw Error(`Unsupported npy version ${r11}.${n11}`);
          let i11 = new DataView(e11.buffer, e11.byteOffset, e11.byteLength).getUint16(8, true), s11 = new TextDecoder("utf-8").decode(e11.subarray(10, i11 + 10)), a11 = i11 + 10;
          try {
            t11 = (0, ej.c6)(s11);
          } catch (e12) {
            throw Error(`Failed to parse npy header: ${e12}`);
          }
          let o11 = t11.descr, l3 = t11.shape, u2 = 1;
          if (!Array.isArray(l3)) throw Error("Invalid shape ${JSON.stringify(shape)}");
          for (let e12 of l3) {
            if ("number" != typeof e12) throw Error("Invalid shape ${JSON.stringify(shape)}");
            u2 *= e12;
          }
          let { dataType: h2, endianness: c2 } = function(e12) {
            let t12 = ne.get(e12);
            if (void 0 === t12) throw Error(`Unsupported numpy data type: ${JSON.stringify(e12)}`);
            return t12;
          }(o11), d2 = e7[h2], f2 = te[h2];
          if (d2 * u2 + a11 !== e11.byteLength) throw Error("Expected length does not match length of data");
          let g2 = new f2(e11.buffer, e11.byteOffset + a11, u2);
          return rT(g2, c2, d2), new nt(g2, l3, h2, true === t11.fortran_order);
        }(new Uint8Array(await (0, r7.lL)(r10, "deflate"))), i10 = e10.chunkDataSize, s10 = e10.source, { shape: a10 } = n10;
        if (3 !== a10.length || a10[0] !== i10[2] || a10[1] !== i10[1] || a10[2] !== i10[0]) throw Error(`Shape ${JSON.stringify(a10)} does not match chunkDataSize ${(0, eB.m0)(i10)}`);
        let o10 = n10.dataType, { spec: l2 } = s10;
        if (o10 !== l2.dataType) throw Error(`Data type ${e9[o10]} does not match expected data type ${e9[l2.dataType]}`);
        await r9(e10, t10, n10.data);
      }
      let nn = { id: "decodeJpeg" };
      async function ni(e10, t10, r10) {
        let n10 = e10.chunkDataSize, { uint8Array: i10 } = await r5(nn, t10, [r10], new Uint8Array(r10), void 0, void 0, n10[0] * n10[1] * n10[2], n10[3] || 1, false);
        await r9(e10, t10, i10);
      }
      function ns(e10, t10) {
        let { spec: r10, tempChunkDataSize: n10, tempChunkPosition: i10 } = e10, { upperVoxelBound: s10, rank: a10, baseVoxelOffset: o10 } = r10, l2 = r10.chunkDataSize, u2 = function(e11, t11, r11) {
          let n11 = e11.length;
          for (let i11 = 0; i11 < n11; ++i11) e11[i11] = t11[i11] * r11[i11];
          return e11;
        }(i10, t10.chunkGridPosition, l2), h2 = false;
        for (let e11 = 0; e11 < a10; ++e11) {
          let t11 = Math.min(s10[e11], u2[e11] + l2[e11]);
          (n10[e11] = t11 - u2[e11]) !== l2[e11] && (h2 = true);
        }
        return !function(e11, t11, r11) {
          let n11 = e11.length;
          for (let i11 = 0; i11 < n11; ++i11) e11[i11] = t11[i11] + r11[i11];
        }(u2, u2, o10), h2 ? t10.chunkDataSize = Uint32Array.from(n10) : t10.chunkDataSize = l2, u2;
      }
      class na extends tT {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "tempChunkDataSize");
          __publicField(this, "tempChunkPosition");
          let r10 = this.spec.rank;
          this.tempChunkDataSize = new Uint32Array(r10), this.tempChunkPosition = new Float32Array(r10);
        }
        computeChunkBounds(e10) {
          return ns(this, e10);
        }
      }
      function no(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      na.prototype.chunkConstructor = class extends tx {
        constructor() {
          super(...arguments);
          __publicField(this, "source", null);
          __publicField(this, "data");
          __publicField(this, "chunkDataSize");
        }
        initializeVolumeChunk(e10, t10) {
          super.initializeVolumeChunk(e10, t10), this.chunkDataSize = null, this.data = null;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10);
          let r10 = this.chunkDataSize;
          r10 !== this.source.spec.chunkDataSize && (e10.chunkDataSize = r10);
          let n10 = e10.data = this.data;
          null !== n10 && t10.push(n10.buffer), this.data = null;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = this.gpuMemoryBytes = this.data?.byteLength ?? 0, super.downloadSucceeded();
        }
        freeSystemMemory() {
          this.data = null;
        }
      };
      let nl = /* @__PURE__ */ new Map();
      nl.set("npz", nr), nl.set("jpeg", ni);
      let nu = /* @__PURE__ */ new Map();
      function nh(e10, t10) {
        return em(eI()(e10), t10);
      }
      nu.set("npz", "application/npygz"), nu.set("jpeg", "image/jpeg");
      class nc extends nh(na, rb.Yz) {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkDecoder", nl.get(this.parameters.encoding));
        }
        async download(e10, t10) {
          let { parameters: r10 } = this, n10 = `${r10.baseUrl}/latest/cutout/${r10.collection}/${r10.experiment}/${r10.channel}/${r10.resolution}`;
          {
            let t11 = this.computeChunkBounds(e10), r11 = e10.chunkDataSize;
            for (let e11 = 0; e11 < 3; ++e11) n10 += `/${t11[e11]}:${t11[e11] + r11[e11]}`;
          }
          n10 += "/", void 0 !== r10.window && (n10 += `?window=${r10.window[0]},${r10.window[1]}`);
          let i10 = await rv(this.credentialsProvider, n10, { signal: t10, headers: { Accept: nu.get(r10.encoding) } });
          await this.chunkDecoder(e10, t10, await i10.arrayBuffer());
        }
      }
      nc = no([F()], nc);
      class nd extends nh(rz, rb.i6) {
        download(e10, t10) {
          let { parameters: r10 } = this;
          return rv(this.credentialsProvider, `${r10.baseUrl}${e10.objectId}`, { signal: t10 }).then((e11) => e11.arrayBuffer()).then((t11) => r_(e10, t11, "fragments"));
        }
        downloadFragment(e10, t10) {
          let { parameters: r10 } = this;
          return rv(this.credentialsProvider, `${r10.baseUrl}${e10.fragmentId}`, { signal: t10 }).then((e11) => e11.arrayBuffer()).then((t11) => function(e11, t12) {
            let r11 = new DataView(t12).getUint32(0, true);
            rW(e11, rD(3, t12, rS.LITTLE, 4, r11, void 0, void 0));
          }(e10, t11));
        }
      }
      nd = no([F()], nd);
      var nf = r2(5931);
      function ng(e10) {
        try {
          if ("string" != typeof e10) throw Error(`Expected string, but received ${JSON.stringify(e10)}.`);
          let t10 = document.createElement("canvas").getContext("2d");
          t10.fillStyle = e10;
          let r10 = function(e11) {
            {
              let t11 = e11.match(/^rgba\(([0-9]+), ([0-9]+), ([0-9]+), (0(?:\.[0-9]+)?)\)$/);
              if (null !== t11) return [parseInt(t11[1], 10), parseInt(t11[2], 10), parseInt(t11[3], 10), parseFloat(t11[4])];
            }
            {
              let t11 = e11.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
              if (null !== t11) return [parseInt(t11[1], 16), parseInt(t11[2], 16), parseInt(t11[3], 16), 1];
            }
            throw Error(`Invalid serialized color: ${JSON.stringify(e11)}.`);
          }(t10.fillStyle);
          return eB.vh.fromValues(r10[0] / 255, r10[1] / 255, r10[2] / 255, r10[3]);
        } catch (e11) {
          throw Error(`Failed to parse color specification: ${e11.message}`);
        }
      }
      function np(e10) {
        let t10 = void 0 === e10[3] ? 3 : 4, r10 = 0;
        for (let n10 = 0; n10 < t10; n10++) r10 = (r10 << 8 >>> 0) + Math.min(255, Math.max(0, Math.round(255 * e10[t10 - 1 - n10])));
        return r10;
      }
      function nm(e10) {
        if (void 0 === e10[3] || 1 === e10[3]) {
          let t11 = "#";
          for (let r10 = 0; r10 < 3; ++r10) t11 += ("0" + Math.min(255, Math.max(0, Math.round(255 * e10[r10]))).toString(16)).slice(-2);
          return t11;
        }
        let t10 = "rgba(";
        for (let r10 = 0; r10 < 3; ++r10) 0 !== r10 && (t10 += ", "), t10 += Math.min(255, Math.max(0, Math.round(255 * e10[r10])));
        return t10 + `, ${(0, nf.i)(e10[3])})`;
      }
      k.SN, k.SN, new Uint32Array(new Float64Array(1).buffer), e9.UINT8, e9.INT8, e9.UINT16, e9.INT16, e9.UINT32, e9.INT32, e9.UINT64, e9.FLOAT32, M.gj;
      var ny = ((p = {})[p.POINT = 0] = "POINT", p[p.LINE = 1] = "LINE", p[p.AXIS_ALIGNED_BOUNDING_BOX = 2] = "AXIS_ALIGNED_BOUNDING_BOX", p[p.ELLIPSOID = 3] = "ELLIPSOID", p);
      let nv = [0, 1, 2, 3];
      e9.FLOAT32, e9.UINT32, e9.INT32, e9.UINT16, e9.INT16, e9.UINT8, e9.INT8;
      let nb = { rgb: { serializedBytes: () => 3, alignment: () => 1, serializeCode: (e10, t10) => `dv.setUint16(${t10}, ${e10}, true);dv.setUint8(${t10} + 2, ${e10} >>> 16);`, deserializeCode: (e10, t10) => `${e10} = dv.getUint16(${t10}, true) | (dv.getUint8(${t10} + 2) << 16);`, deserializeJson: (e10) => np(ng(e10).subarray(0, 3)), serializeJson: (e10) => nm(eB.R3.fromValues((e10 >>> 0 & 255) / 255, (e10 >>> 8 & 255) / 255, (e10 >>> 16 & 255) / 255)) }, rgba: { serializedBytes: () => 4, alignment: () => 1, serializeCode: (e10, t10) => `dv.setUint32(${t10}, ${e10}, true);`, deserializeCode: (e10, t10) => `${e10} = dv.getUint32(${t10}, true);`, deserializeJson: (e10) => np(ng(e10)), serializeJson: (e10) => nm(eB.vh.fromValues((e10 >>> 0 & 255) / 255, (e10 >>> 8 & 255) / 255, (e10 >>> 16 & 255) / 255, (e10 >>> 24 & 255) / 255)) }, float32: { serializedBytes: () => 4, alignment: () => 4, serializeCode: (e10, t10) => `dv.setFloat32(${t10}, ${e10}, isLittleEndian);`, deserializeCode: (e10, t10) => `${e10} = dv.getFloat32(${t10}, isLittleEndian);`, deserializeJson: (e10) => (0, ej.nH)(e10), serializeJson: (e10) => e10 }, uint32: { serializedBytes: () => 4, alignment: () => 4, serializeCode: (e10, t10) => `dv.setUint32(${t10}, ${e10}, isLittleEndian);`, deserializeCode: (e10, t10) => `${e10} = dv.getUint32(${t10}, isLittleEndian);`, deserializeJson: (e10) => (0, ej.C$)(e10), serializeJson: (e10) => e10 }, int32: { serializedBytes: () => 4, alignment: () => 4, serializeCode: (e10, t10) => `dv.setInt32(${t10}, ${e10}, isLittleEndian);`, deserializeCode: (e10, t10) => `${e10} = dv.getInt32(${t10}, isLittleEndian);`, deserializeJson: (e10) => (0, ej.C$)(e10), serializeJson: (e10) => e10 }, uint16: { serializedBytes: () => 2, alignment: () => 2, serializeCode: (e10, t10) => `dv.setUint16(${t10}, ${e10}, isLittleEndian);`, deserializeCode: (e10, t10) => `${e10} = dv.getUint16(${t10}, isLittleEndian);`, deserializeJson: (e10) => (0, ej.C$)(e10), serializeJson: (e10) => e10 }, int16: { serializedBytes: () => 2, alignment: () => 2, serializeCode: (e10, t10) => `dv.setInt16(${t10}, ${e10}, isLittleEndian);`, deserializeCode: (e10, t10) => `${e10} = dv.getInt16(${t10}, isLittleEndian);`, deserializeJson: (e10) => (0, ej.C$)(e10), serializeJson: (e10) => e10 }, uint8: { serializedBytes: () => 1, alignment: () => 1, serializeCode: (e10, t10) => `dv.setUint8(${t10}, ${e10});`, deserializeCode: (e10, t10) => `${e10} = dv.getUint8(${t10});`, deserializeJson: (e10) => (0, ej.C$)(e10), serializeJson: (e10) => e10 }, int8: { serializedBytes: () => 2, alignment: () => 1, serializeCode: (e10, t10) => `dv.setInt8(${t10}, ${e10});`, deserializeCode: (e10, t10) => `${e10} = dv.getInt8(${t10});`, deserializeJson: (e10) => (0, ej.C$)(e10), serializeJson: (e10) => e10 } };
      class nw {
        constructor(e10, t10, r10) {
          __publicField(this, "rank");
          __publicField(this, "firstGroupInitialOffset");
          __publicField(this, "propertySpecs");
          __publicField(this, "serializedBytes");
          __publicField(this, "serialize");
          __publicField(this, "deserialize");
          __publicField(this, "propertyGroupBytes");
          if (this.rank = e10, this.firstGroupInitialOffset = t10, this.propertySpecs = r10, 0 === r10.length) {
            this.serializedBytes = t10, this.serialize = this.deserialize = () => {
            }, this.propertyGroupBytes = [t10];
            return;
          }
          let { serializedBytes: n10, offsets: i10, propertyGroupBytes: s10 } = function(e11, t11, r11) {
            let n11 = 0, i11 = r11.length, s11 = Array(i11), a11 = [];
            for (let e12 = 0; e12 < i11; ++e12) s11[e12] = e12;
            let o11 = (t12) => nb[r11[t12].type].alignment(e11);
            s11.sort((e12, t12) => o11(t12) - o11(e12));
            let l3 = 0, u3 = Array(i11), h2 = t11, c2 = () => {
              h2 += (4 - h2 % 4) % 4, n11 += h2, a11[l3] = h2, h2 = 0, ++l3;
            };
            for (let t12 = 0; t12 < i11; ++t12) {
              let n12 = s11[t12], i12 = nb[r11[n12].type], a12 = i12.serializedBytes(e11), o12 = i12.alignment(e11), d2 = (o12 - h2 % o12) % o12, f2 = h2 + d2 + a12;
              f2 + (4 - f2 % 4) % 4 <= 255 ? h2 += d2 : c2(), u3[n12] = { offset: h2, group: l3 }, h2 += a12;
            }
            return c2(), { serializedBytes: n11, offsets: u3, propertyGroupBytes: a11 };
          }(e10, t10, r10);
          this.propertyGroupBytes = s10;
          let a10 = "let groupOffset0 = offset;";
          for (let e11 = 1; e11 < s10.length; ++e11) a10 += `let groupOffset${e11} = groupOffset${e11 - 1} + ${s10[e11 - 1]}*annotationCount;`;
          for (let e11 = 0; e11 < s10.length; ++e11) a10 += `groupOffset${e11} += ${s10[e11]}*annotationIndex;`;
          let o10 = a10, l2 = a10, u2 = r10.length;
          for (let t11 = 0; t11 < u2; ++t11) {
            let { group: n11, offset: s11 } = i10[t11], a11 = nb[r10[t11].type], u3 = `properties[${t11}]`, h2 = `groupOffset${n11} + ${s11}`;
            o10 += a11.serializeCode(u3, h2, e10), l2 += a11.deserializeCode(u3, h2, e10);
          }
          this.serializedBytes = n10, this.serialize = Function("dv", "offset", "annotationIndex", "annotationCount", "isLittleEndian", "properties", o10), this.deserialize = Function("dv", "offset", "annotationIndex", "annotationCount", "isLittleEndian", "properties", l2);
        }
      }
      function nS(e10, t10, r10, n10, i10) {
        for (let s10 = 0; s10 < n10; ++s10) e10.setFloat32(t10, i10[s10], r10), t10 += 4;
        return t10;
      }
      function nE(e10, t10, r10, n10, i10, s10) {
        return t10 = nS(e10, t10, r10, n10, i10), t10 = nS(e10, t10, r10, n10, s10);
      }
      function nk(e10, t10, r10, n10, i10) {
        for (let s10 = 0; s10 < n10; ++s10) i10[s10] = e10.getFloat32(t10, r10), t10 += 4;
        return t10;
      }
      function nI(e10, t10, r10, n10, i10, s10) {
        return t10 = nk(e10, t10, r10, n10, i10), t10 = nk(e10, t10, r10, n10, s10);
      }
      let nM = { 1: { icon: "\uA579", description: "Line", toJSON: (e10) => ({ pointA: Array.from(e10.pointA), pointB: Array.from(e10.pointB) }), restoreState(e10, t10, r10) {
        e10.pointA = (0, ej.uq)(t10, "pointA", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.jz)), e10.pointB = (0, ej.uq)(t10, "pointB", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.jz));
      }, serializedBytes: (e10) => 8 * e10, serialize(e10, t10, r10, n10, i10) {
        nE(e10, t10, r10, n10, i10.pointA, i10.pointB);
      }, deserialize: (e10, t10, r10, n10, i10) => {
        let s10 = new Float32Array(n10), a10 = new Float32Array(n10);
        return nI(e10, t10, r10, n10, s10, a10), { type: 1, pointA: s10, pointB: a10, id: i10, properties: [] };
      }, visitGeometry(e10, t10) {
        t10(e10.pointA, false), t10(e10.pointB, false);
      } }, 0: { icon: "\u26AC", description: "Point", toJSON: (e10) => ({ point: Array.from(e10.point) }), restoreState: (e10, t10, r10) => {
        e10.point = (0, ej.uq)(t10, "point", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.jz));
      }, serializedBytes: (e10) => 4 * e10, serialize: (e10, t10, r10, n10, i10) => {
        nS(e10, t10, r10, n10, i10.point);
      }, deserialize: (e10, t10, r10, n10, i10) => {
        let s10 = new Float32Array(n10);
        return nk(e10, t10, r10, n10, s10), { type: 0, point: s10, id: i10, properties: [] };
      }, visitGeometry(e10, t10) {
        t10(e10.point, false);
      } }, 2: { icon: "\u2751", description: "Bounding Box", toJSON: (e10) => ({ pointA: Array.from(e10.pointA), pointB: Array.from(e10.pointB) }), restoreState: (e10, t10, r10) => {
        e10.pointA = (0, ej.uq)(t10, "pointA", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.jz)), e10.pointB = (0, ej.uq)(t10, "pointB", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.jz));
      }, serializedBytes: (e10) => 8 * e10, serialize(e10, t10, r10, n10, i10) {
        nE(e10, t10, r10, n10, i10.pointA, i10.pointB);
      }, deserialize: (e10, t10, r10, n10, i10) => {
        let s10 = new Float32Array(n10), a10 = new Float32Array(n10);
        return nI(e10, t10, r10, n10, s10, a10), { type: 2, pointA: s10, pointB: a10, id: i10, properties: [] };
      }, visitGeometry(e10, t10) {
        t10(e10.pointA, false), t10(e10.pointB, false);
      } }, 3: { icon: "\u25CE", description: "Ellipsoid", toJSON: (e10) => ({ center: Array.from(e10.center), radii: Array.from(e10.radii) }), restoreState: (e10, t10, r10) => {
        e10.center = (0, ej.uq)(t10, "center", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.jz)), e10.radii = (0, ej.uq)(t10, "radii", (e11) => (0, ej.Iw)(new Float32Array(r10), e11, ej.lu));
      }, serializedBytes: (e10) => 8 * e10, serialize(e10, t10, r10, n10, i10) {
        nE(e10, t10, r10, n10, i10.center, i10.radii);
      }, deserialize: (e10, t10, r10, n10, i10) => {
        let s10 = new Float32Array(n10), a10 = new Float32Array(n10);
        return nI(e10, t10, r10, n10, s10, a10), { type: 3, center: s10, radii: a10, id: i10, properties: [] };
      }, visitGeometry(e10, t10) {
        t10(e10.center, false), t10(e10.radii, true);
      } } };
      M.gj;
      class nx {
        constructor(e10) {
          __publicField(this, "propertySerializers");
          __publicField(this, "annotations");
          this.propertySerializers = e10, this.annotations = [[], [], [], []];
        }
        add(e10) {
          this.annotations[e10.type].push(e10);
        }
        serialize() {
          return function(e10, t10) {
            let r10 = 0, n10 = [];
            for (let i11 of nv) {
              let s11 = t10[i11].serializedBytes;
              n10[i11] = r10, r10 += s11 * e10[i11].length;
            }
            let i10 = [], s10 = [], a10 = new ArrayBuffer(r10), o10 = new DataView(a10), l2 = rE === rS.LITTLE;
            for (let r11 of nv) {
              let a11 = t10[r11], { rank: u2 } = a11, h2 = a11.serialize, c2 = e10[r11];
              i10[r11] = c2.map((e11) => e11.id), s10[r11] = new Map(c2.map((e11, t11) => [e11.id, t11]));
              let d2 = nM[r11].serialize, f2 = n10[r11], g2 = a11.propertyGroupBytes[0];
              for (let e11 = 0, t11 = c2.length; e11 < t11; ++e11) {
                let r12 = c2[e11];
                d2(o10, f2 + e11 * g2, l2, u2, r12), h2(o10, f2, e11, t11, l2, r12.properties);
              }
            }
            return { data: new Uint8Array(a10), typeToIds: i10, typeToOffset: n10, typeToIdMaps: s10 };
          }(this.annotations, this.propertySerializers);
        }
      }
      var nT = r2(7399);
      function nC(e10, t10, r10, n10 = {}) {
        return (0, nT.i)(t10, `${e10.serverUrl}${r10}`, n10);
      }
      var nN = r2(3488), n$ = r2(5105);
      class nR extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "objectId", 0n);
          __publicField(this, "vertexPositions", null);
          __publicField(this, "vertexAttributes", null);
          __publicField(this, "indices", null);
        }
        initializeSkeletonChunk(e10, t10) {
          super.initialize(e10), this.objectId = t10;
        }
        freeSystemMemory() {
          this.vertexPositions = this.indices = null;
        }
        getVertexAttributeBytes() {
          let e10 = this.vertexPositions.byteLength, { vertexAttributes: t10 } = this;
          return null != t10 && t10.forEach((t11) => {
            e10 += t11.byteLength;
          }), e10;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10);
          let r10 = this.vertexPositions, n10 = this.indices;
          e10.numVertices = r10.length / 3, e10.indices = n10, t10.push(n10.buffer);
          let { vertexAttributes: i10 } = this;
          if (null != i10 && i10.length > 0) {
            let n11 = new Uint8Array(this.getVertexAttributeBytes());
            n11.set(new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength));
            let s10 = e10.vertexAttributeOffsets = new Uint32Array(i10.length + 1);
            s10[0] = 0;
            let a10 = r10.byteLength;
            i10.forEach((e11, t11) => {
              s10[t11 + 1] = a10, n11.set(new Uint8Array(e11.buffer, e11.byteOffset, e11.byteLength), a10), a10 += e11.byteLength;
            }), t10.push(n11.buffer), e10.vertexAttributes = n11;
          } else e10.vertexAttributes = new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength), e10.vertexAttributeOffsets = Uint32Array.of(0), r10.buffer !== t10[0] && t10.push(r10.buffer);
          this.vertexPositions = this.indices = this.vertexAttributes = null;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = this.gpuMemoryBytes = this.indices.byteLength + this.getVertexAttributeBytes(), super.downloadSucceeded();
        }
      }
      class nP extends es {
        getChunk(e10) {
          let t10 = re(e10), r10 = this.chunks.get(t10);
          return void 0 === r10 && ((r10 = this.getNewChunk_(nR)).initializeSkeletonChunk(t10, e10), this.addChunk(r10)), r10;
        }
      }
      class nO extends rn(tp(ey(eg))) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "source");
          this.source = this.registerDisposer(e10.getRef(t10.source)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
            this.updateChunkPriorities();
          }));
        }
        updateChunkPriorities() {
          let e10 = this.visibility.value;
          if (e10 === Number.NEGATIVE_INFINITY) return;
          this.chunkManager.registerLayer(this);
          let t10 = tm(e10), r10 = ty(e10), { source: n10, chunkManager: i10 } = this;
          rt(this, (e11) => {
            let s10 = n10.getChunk(e11);
            ++this.numVisibleChunksNeeded, s10.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable, i10.requestChunk(s10, t10, r10 + 60);
          });
        }
      }
      function nU(e10, t10, r10, n10, i10, s10, a10) {
        let o10 = rD(2, t10, r10, n10, i10, s10, a10);
        e10.vertexPositions = o10.vertexPositions, e10.indices = o10.indices;
      }
      async function n_(e10, t10, r10) {
        e10.data = new Uint32Array(r10);
      }
      async function nA(e10, t10, r10, n10 = rE, i10 = 0, s10 = r10.byteLength) {
        let { spec: a10 } = e10.source, { dataType: o10 } = a10, l2 = function(e11) {
          let t11 = 1;
          for (let r11 = 0, n11 = e11.length; r11 < n11; ++r11) t11 *= e11[r11];
          return t11;
        }(e10.chunkDataSize), u2 = e7[o10], h2 = l2 * u2;
        if (h2 !== s10) throw Error(`Raw-format chunk is ${s10} bytes, but ${l2} * ${u2} = ${h2} bytes are expected.`);
        let c2 = tt(o10, r10, i10, s10);
        rT(c2, n10, u2), await r9(e10, t10, c2);
      }
      nO = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F(n$.f)], nO);
      var nL = r2(6235);
      function nD(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      let nz = /* @__PURE__ */ new Map([[nN.ke.RAW, nA], [nN.ke.JPEG, ni], [nN.ke.COMPRESSED_SEGMENTATION, n_]]);
      function nB(e10, t10) {
        e10 && (t10.change_spec = { change_stack_id: e10.changeStackId }, e10.timeStamp && (t10.change_spec.time_stamp = e10.timeStamp), e10.skipEquivalences && (t10.change_spec.skip_equivalences = e10.skipEquivalences));
      }
      function nj(e10, t10) {
        return em(eI()(e10), t10);
      }
      class nF extends nj(na, nN.LV) {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkDecoder", nz.get(this.parameters.encoding));
        }
        applyEncodingParams(e10) {
          let { encoding: t10 } = this.parameters;
          switch (t10) {
            case nN.ke.RAW:
              e10.subvolume_format = "RAW";
              break;
            case nN.ke.JPEG:
              e10.subvolume_format = "SINGLE_IMAGE", e10.image_format_options = { image_format: "JPEG", jpeg_quality: this.parameters.jpegQuality };
              return;
            case nN.ke.COMPRESSED_SEGMENTATION:
              e10.subvolume_format = "RAW", e10.image_format_options = { compressed_segmentation_block_size: (0, eB.m0)(this.spec.compressedSegmentationBlockSize) };
              break;
            default:
              throw Error(`Invalid encoding: ${t10}`);
          }
        }
        async download(e10, t10) {
          let { parameters: r10 } = this, n10 = this.computeChunkBounds(e10), i10 = e10.chunkDataSize, s10 = `/v1/volumes/${r10.volumeId}/subvolume:binary`, a10 = { geometry: { corner: (0, eB.m0)(n10), size: (0, eB.m0)(i10), scale: r10.scaleIndex } };
          this.applyEncodingParams(a10), nB(r10.changeSpec, a10);
          let o10 = await nC(r10.instance, this.credentialsProvider, s10, { method: "POST", body: JSON.stringify(a10), signal: t10 });
          await this.chunkDecoder(e10, t10, await o10.arrayBuffer());
        }
      }
      function nV(e10, t10) {
        let r10 = e10.byteLength, n10 = 0, i10 = new DataView(e10);
        for (; n10 < r10; ) {
          if (n10 + 32 > r10) throw Error("Invalid batch mesh fragment response.");
          let s10 = i10.getBigUint64(n10, true).toString() + "\0";
          n10 += 8;
          let a10 = i10.getUint32(n10, true), o10 = i10.getUint32(n10 + 4, true);
          if (n10 += 8, 0 !== o10 || n10 + a10 + 8 + 8 > r10) throw Error("Invalid batch mesh fragment response.");
          let l2 = s10 + new TextDecoder().decode(new Uint8Array(e10, n10, a10));
          n10 += a10;
          let u2 = i10.getUint32(n10, true), h2 = i10.getUint32(n10 + 4, true);
          n10 += 8;
          let c2 = i10.getUint32(n10, true), d2 = i10.getUint32(n10 + 4, true);
          if (n10 += 8, 0 !== h2 || 0 !== d2) throw Error("Invalid batch mesh fragment response.");
          let f2 = n10 + 12 * c2 + 12 * u2;
          if (f2 > r10) throw Error("Invalid batch mesh fragment response.");
          t10({ fullKey: l2, buffer: e10, verticesOffset: n10, numVertices: u2, indicesOffset: n10 + 12 * u2, numIndices: 3 * c2 }), n10 = f2;
        }
      }
      function nG(e10) {
        let t10 = 0, r10 = 0;
        for (let n11 of e10) t10 += n11.numVertices, r10 += n11.numIndices;
        let n10 = new Float32Array(3 * t10), i10 = new Uint32Array(r10), s10 = 0, a10 = 0;
        for (let t11 of e10) {
          n10.set(new Float32Array(t11.buffer, t11.verticesOffset, 3 * t11.numVertices), 3 * s10);
          let { numIndices: e11 } = t11, r11 = new Uint32Array(t11.buffer, t11.indicesOffset, e11);
          rx(r11, rS.LITTLE);
          for (let t12 = 0; t12 < e11; ++t12) i10[a10++] = r11[t12] + s10;
          s10 += t11.numVertices;
        }
        return rx(n10, rS.LITTLE), { vertexPositions: n10, indices: i10 };
      }
      async function nK(e10, t10, r10, n10) {
        let i10;
        let s10 = [], a10 = 0, o10 = /* @__PURE__ */ new Map();
        for (let [e11, t11] of r10) {
          o10.set(e11, t11), r10.delete(e11);
          let n11 = e11.indexOf("\0"), l3 = e11.substring(0, n11), u2 = e11.substring(n11 + 1);
          if (l3 !== i10 && s10.push({ object_id: l3, fragment_keys: [] }), s10[s10.length - 1].fragment_keys.push(u2), 255 == ++a10) break;
        }
        let l2 = { volume_id: t10.volumeId, mesh_name: t10.meshName, batches: s10 };
        try {
          return await (await nC(t10.instance, e10, "/v1/objects/meshes:batch", { method: "POST", body: JSON.stringify(l2), signal: n10 })).arrayBuffer();
        } finally {
          for (let [e11, t11] of o10) r10.set(e11, t11);
        }
      }
      nF = nD([F()], nF);
      class nq extends nj(rG, nN.f5) {
        constructor() {
          super(...arguments);
          __publicField(this, "listFragmentsParams", (() => {
            let { parameters: e10 } = this, { changeSpec: t10 } = e10;
            return void 0 !== t10 ? `&header.changeStackId=${t10.changeStackId}` : "";
          })());
        }
        download(e10, t10) {
          let { parameters: r10 } = this, n10 = `/v1/objects/${r10.volumeId}/meshes/${r10.info.lods[0].info.name}:listfragments?object_id=${e10.objectId}&return_supervoxel_ids=true` + this.listFragmentsParams;
          return nC(r10.instance, this.credentialsProvider, n10, { signal: t10 }).then((e11) => e11.json()).then((t11) => function(e11, t12) {
            let r11, n11, i10;
            (0, ej.PT)(t12);
            let s10 = e11.source, a10 = (0, ej.uq)(t12, "fragmentKey", ej.zE), o10 = (0, ej.uq)(t12, "supervoxelId", ej.zE), l2 = a10.length;
            if (l2 !== o10.length) throw Error("Expected fragmentKey and supervoxelId arrays to have the same length.");
            let u2 = /* @__PURE__ */ new Map();
            a10.forEach((e12, t13) => {
              let r12 = u2.get(e12);
              void 0 === r12 && (r12 = [], u2.set(e12, r12)), r12.push(o10[t13]);
            });
            let { chunkShape: h2 } = s10.parameters.info, c2 = s10.parameters.info.lods[0].gridShape, d2 = Math.ceil(Math.log2(c2[0])), f2 = Math.ceil(Math.log2(c2[1])), g2 = Math.ceil(Math.log2(c2[2])), p2 = Array.from(u2.entries()).map(([e12, t13]) => ({ fragmentId: e12, corner: function(e13, t14, r12, n12) {
              let i11 = Math.max(t14, r12, n12), s11 = 0, a11 = 0, o11 = 0, l3 = 0;
              for (let u3 = 0; u3 < i11; ++u3) u3 < t14 && (a11 |= Number(e13 >> BigInt(s11++) & BigInt(1)) << u3), u3 < r12 && (o11 |= Number(e13 >> BigInt(s11++) & BigInt(1)) << u3), u3 < n12 && (l3 |= Number(e13 >> BigInt(s11++) & BigInt(1)) << u3);
              return Uint32Array.of(a11, o11, l3);
            }((0, ej.tw)(BigInt("0x" + e12)), d2, f2, g2), supervoxelIds: t13 }));
            p2.sort((e12, t13) => rN(e12.corner[0], e12.corner[1], e12.corner[2], t13.corner[0], t13.corner[1], t13.corner[2]) ? -1 : 1);
            let m2 = 0;
            if (0 === l2) r11 = n11 = eB.b$, i10 = Uint32Array.of(0, 0, 0, 0, 2147483648);
            else {
              let e12 = eB.R3.clone(eB.$k), t13 = eB.R3.clone(eB.b$);
              for (p2.forEach((r12) => {
                let { corner: n12 } = r12;
                for (let r13 = 0; r13 < 3; ++r13) e12[r13] = Math.min(e12[r13], n12[r13]), t13[r13] = Math.max(t13[r13], n12[r13]);
              }), m2 = 1; t13[0] >>> m2 - 1 != e12[0] >>> m2 - 1 || t13[1] >>> m2 - 1 != e12[1] >>> m2 - 1 || t13[2] >>> m2 - 1 != e12[2] >>> m2 - 1; ) ++m2;
              r11 = eB.R3.multiply(e12, e12, h2), n11 = eB.R3.add(t13, eB.R3.multiply(t13, t13, h2), h2);
            }
            let { lods: y2 } = s10.parameters.info, v2 = new Float32Array(Math.max(y2.length, m2));
            for (let e12 = 0; e12 < y2.length; ++e12) v2[e12] = y2[e12].scale;
            if (0 !== l2) {
              let e12 = new Uint32Array(p2.length * v2.length * 5);
              p2.forEach((t14, r13) => {
                e12.set(t14.corner, 5 * r13), e12[5 * r13] = t14.corner[0];
              });
              let t13 = 0, r12 = p2.length;
              for (let n12 = 1; n12 < v2.length; ++n12) {
                let n13 = rX(e12, t13, r12);
                t13 = r12, r12 = n13;
              }
              i10 = e12.slice(0, 5 * r12);
            }
            let b2 = { chunkShape: h2, chunkGridSpatialOrigin: eB.b$, clipLowerBound: r11, clipUpperBound: n11, octree: i10, lodScales: v2, vertexOffsets: new Float32Array(3 * v2.length) };
            e11.manifest = b2, e11.fragmentSupervoxelIds = p2;
          }(e10, t11));
        }
        async downloadFragment(e10, t10) {
          let { parameters: r10 } = this, n10 = e10.manifestChunk, { fragmentSupervoxelIds: i10 } = n10, s10 = n10.manifest, { lod: a10 } = e10, { octree: o10 } = s10, l2 = i10.length, u2 = e10.chunkIndex, h2 = u2;
          for (; h2 >= l2; ) h2 = o10[5 * h2 + 3];
          let c2 = u2 + 1;
          for (; c2 > l2; ) c2 = 2147483647 & o10[5 * c2 - 1];
          let { relativeBlockShape: d2, gridShape: f2 } = r10.info.lods[a10], g2 = Math.ceil(Math.log2(f2[0])), p2 = Math.ceil(Math.log2(f2[1])), m2 = Math.ceil(Math.log2(f2[2])), y2 = /* @__PURE__ */ new Map();
          for (let e11 = h2; e11 < c2; ++e11) {
            let t11 = Math.floor(o10[5 * e11] / d2[0]), r11 = rC(g2, p2, m2, t11, Math.floor(o10[5 * e11 + 1] / d2[1]), Math.floor(o10[5 * e11 + 2] / d2[2])).toString(16).padStart(16, "0");
            for (let t12 of i10[e11].supervoxelIds) y2.set(t12 + "\0" + r11, e11);
          }
          let v2 = Math.max(0, a10 - 1), b2 = [], w2 = Array.from(y2);
          w2.sort((e11, t11) => (0, nL.B)(e11[0], t11[0])), y2 = new Map(w2);
          let S2 = r10.info.lods[a10].info.name;
          await new Promise((n11, i11) => {
            let s11 = 0, a11 = false, o11 = () => {
              if (!a11) {
                for (; 0 !== y2.size; ) ++s11, nK(this.credentialsProvider, { instance: r10.instance, volumeId: r10.volumeId, meshName: S2 }, y2, t10).then((e11) => {
                  --s11, nV(e11, (e12) => {
                    let t11 = y2.get(e12.fullKey);
                    if (!y2.delete(e12.fullKey)) throw Error(`Received unexpected fragment key: ${JSON.stringify(e12.fullKey)}.`);
                    e12.chunkIndex = t11, b2.push(e12);
                  }), o11();
                }).catch((e11) => {
                  a11 = true, i11(e11);
                });
                if (e10.downloadSlots = Math.max(1, s11), 0 === s11) {
                  n11(void 0);
                  return;
                }
              }
            };
            o11();
          }), b2.sort((e11, t11) => e11.chunkIndex - t11.chunkIndex);
          let E2 = 0, k2 = 1 << 3 * (a10 - v2), I2 = new Uint32Array(k2 + 1), M2 = 0;
          for (let e11 of b2) {
            var x2;
            let t11 = e11.chunkIndex, r11 = (x2 = o10[5 * t11] >>> v2, (1 & x2 | o10[5 * t11 + 1] >>> v2 << 1 & 2 | o10[5 * t11 + 2] >>> v2 << 2 & 4) & k2 - 1);
            I2.fill(E2, M2 + 1, r11 + 1), M2 = r11, E2 += e11.numIndices;
          }
          I2.fill(E2, M2 + 1, k2 + 1), rZ(e10, { ...nG(b2), subChunkOffsets: I2 }, rw.k_.float32);
        }
      }
      nq = nD([F()], nq);
      class nY extends nj(rz, nN.i6) {
        constructor() {
          super(...arguments);
          __publicField(this, "listFragmentsParams", (() => {
            let { parameters: e10 } = this, { changeSpec: t10 } = e10;
            return void 0 !== t10 ? `&header.changeStackId=${t10.changeStackId}` : "";
          })());
        }
        download(e10, t10) {
          let { parameters: r10 } = this, n10 = `/v1/objects/${r10.volumeId}/meshes/${r10.meshName}:listfragments?object_id=${e10.objectId}&return_supervoxel_ids=true` + this.listFragmentsParams;
          return nC(r10.instance, this.credentialsProvider, n10, { signal: t10 }).then((e11) => e11.json()).then((t11) => function(e11, t12) {
            (0, ej.PT)(t12);
            let r11 = (0, ej.uq)(t12, "fragmentKey", ej.zE), n11 = (0, ej.uq)(t12, "supervoxelId", ej.zE);
            if (r11.length !== n11.length) throw Error("Expected fragmentKey and supervoxelId arrays to have the same length.");
            let i10 = n11.map((e12, t13) => e12 + "\0" + r11[t13]);
            e11.fragmentIds = function(e12) {
              let t13 = [], r12 = 0, n12 = e12.length;
              for (; r12 < n12; ) t13.push(JSON.stringify(e12.slice(r12, r12 + 255))), r12 += 255;
              return t13;
            }(i10);
          }(e10, t11));
        }
        async downloadFragment(e10, t10) {
          let { parameters: r10 } = this, n10 = /* @__PURE__ */ new Map();
          for (let t11 of JSON.parse(e10.fragmentId)) n10.set(t11, null);
          let i10 = [], { credentialsProvider: s10 } = this;
          for (; 0 !== n10.size; ) nV(await nK(s10, r10, n10, t10), (e11) => {
            if (!n10.delete(e11.fullKey)) throw Error(`Received unexpected fragment key: ${JSON.stringify(e11.fullKey)}.`);
            i10.push(e11);
          });
          rW(e10, nG(i10));
        }
      }
      nY = nD([F()], nY);
      class nJ extends nj(nP, nN.zT) {
        download(e10, t10) {
          let { parameters: r10 } = this, n10 = { object_id: `${e10.objectId}` }, i10 = `/v1/objects/${r10.volumeId}/meshes/${r10.meshName}/skeleton:binary`;
          return nB(r10.changeSpec, n10), nC(r10.instance, this.credentialsProvider, i10, { method: "POST", body: JSON.stringify(n10), signal: t10 }).then((e11) => e11.arrayBuffer()).then((t11) => function(e11, t12) {
            let r11 = new DataView(t12), n11 = r11.getUint32(0, true);
            if (0 !== r11.getUint32(4, true)) throw Error("The number of vertices should not exceed 2^32-1.");
            let i11 = r11.getUint32(8, true);
            if (0 !== r11.getUint32(12, true)) throw Error("The number of edges should not exceed 2^32-1.");
            nU(e11, t12, rS.LITTLE, 16, n11, void 0, i11);
          }(e10, t11));
        }
      }
      nJ = nD([F()], nJ);
      let nW = ["LOCATION", "LINE", "VOLUME"];
      function nZ(e10) {
        let t10 = e10.match(/(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/);
        if (null === t10) throw Error(`Error parsing number triplet: ${JSON.stringify(e10)}.`);
        return eB.R3.fromValues(parseFloat(t10[1]), parseFloat(t10[2]), parseFloat(t10[3]));
      }
      function nX(e10) {
        return e10.volumeId + ":" + e10.changestack + ":";
      }
      function nQ(e10, t10) {
        if (!t10.startsWith(e10)) throw Error(`Received annotation id ${JSON.stringify(t10)} does not have expected prefix of ${JSON.stringify(e10)}.`);
        return t10.substring(e10.length);
      }
      function nH(e10) {
        if (null != e10) return [BigUint64Array.from((0, ej.m7)(e10, ej.tw))];
      }
      function n0(e10, t10, r10) {
        let n10 = (0, ej.uq)(e10, "corner", (e11) => nZ((0, ej.ZE)(e11))), i10 = (0, ej.uq)(e10, "size", (e11) => nZ((0, ej.ZE)(e11))), s10 = (0, ej.uq)(e10, "payload", ej.kt), a10 = (0, ej.uq)(e10, "type", ej.ZE), o10 = (0, ej.uq)(e10, "id", ej.ZE), l2 = nQ(t10, o10), u2 = (0, ej.uq)(e10, "objectLabels", nH);
        if (void 0 !== r10 && l2 !== r10) throw Error(`Received annotation has unexpected id ${JSON.stringify(o10)}.`);
        switch (a10) {
          case "LOCATION": {
            if (eB.R3.equals(i10, eB.b$)) return { type: ny.POINT, id: l2, point: n10, description: s10, relatedSegments: u2, properties: [] };
            let e11 = eB.R3.scale(eB.R3.create(), i10, 0.5), t11 = eB.R3.add(eB.R3.create(), n10, e11);
            return { type: ny.ELLIPSOID, id: l2, center: t11, radii: e11, description: s10, relatedSegments: u2, properties: [] };
          }
          case "LINE":
            return { type: ny.LINE, id: l2, pointA: n10, pointB: eB.R3.add(eB.R3.create(), n10, i10), description: s10, relatedSegments: u2, properties: [] };
          case "VOLUME":
            return { type: ny.AXIS_ALIGNED_BOUNDING_BOX, id: l2, pointA: n10, pointB: eB.R3.add(eB.R3.create(), n10, i10), description: s10, relatedSegments: u2, properties: [] };
          default:
            throw Error(`Unknown spatial annotation type: ${JSON.stringify(a10)}.`);
        }
      }
      let n1 = function(e10, t10) {
        let r10 = [];
        for (let n10 of nv) {
          let i10 = nM[n10];
          r10[n10] = new nw(3, i10.serializedBytes(e10), t10);
        }
        return r10;
      }(3, []);
      function n2(e10, t10) {
        let r10 = new nx(n1), n10 = nX(e10.source.parent.parameters);
        t10.forEach((e11, t11) => {
          try {
            (0, ej.PT)(e11);
            let t12 = (0, ej.uq)(e11, "annotations", (e12) => void 0 === e12 ? [] : e12);
            if (!Array.isArray(t12)) throw Error(`Expected array, but received ${JSON.stringify(typeof t12)}.`);
            for (let e12 of t12) try {
              r10.add(n0(e12, n10));
            } catch (e13) {
              throw Error(`Error parsing annotation: ${e13.message}`);
            }
          } catch (e12) {
            throw Error(`Error parsing ${nW[t11]} annotations: ${e12.message}`);
          }
        }), e10.data = Object.assign(new ra(), r10.serialize());
      }
      function n3(e10) {
        let t10 = e10.indexOf(".");
        return e10.substring(0, t10);
      }
      function n4(e10) {
        return `${Math.round(e10[0])},${Math.round(e10[1])},${Math.round(e10[2])}`;
      }
      function n6(e10, t10) {
        return `${e10.volumeId}:${e10.changestack}:${t10}`;
      }
      function n8(e10) {
        let t10 = e10.description || "", r10 = void 0 === e10.relatedSegments ? void 0 : Array.from(e10.relatedSegments[0], (e11) => e11.toString());
        switch (e10.type) {
          case ny.LINE: {
            let { pointA: n10, pointB: i10 } = e10, s10 = eB.R3.subtract(eB.R3.create(), i10, n10);
            return { type: "LINE", corner: n4(n10), size: n4(s10), object_labels: r10, payload: t10 };
          }
          case ny.AXIS_ALIGNED_BOUNDING_BOX: {
            let { pointA: n10, pointB: i10 } = e10, s10 = function(e11, t11, r11) {
              let n11 = e11.length;
              for (let i11 = 0; i11 < n11; ++i11) e11[i11] = Math.min(t11[i11], r11[i11]);
              return e11;
            }(eB.R3.create(), n10, i10), a10 = function(e11, t11, r11) {
              let n11 = e11.length;
              for (let i11 = 0; i11 < n11; ++i11) e11[i11] = Math.max(t11[i11], r11[i11]);
              return e11;
            }(eB.R3.create(), n10, i10), o10 = eB.R3.subtract(a10, a10, s10);
            return { type: "VOLUME", corner: n4(s10), size: n4(o10), object_labels: r10, payload: t10 };
          }
          case ny.POINT:
            return { type: "LOCATION", corner: n4(e10.point), size: "0,0,0", object_labels: r10, payload: t10 };
          case ny.ELLIPSOID: {
            let n10 = eB.R3.subtract(eB.R3.create(), e10.center, e10.radii), i10 = eB.R3.scale(eB.R3.create(), e10.radii, 2);
            return { type: "LOCATION", corner: n4(n10), size: n4(i10), object_labels: r10, payload: t10 };
          }
        }
      }
      class n5 extends nj(rc, nN.WM) {
        async download(e10, t10) {
          let { parameters: r10 } = this;
          return Promise.all(nW.map((e11) => nC(r10.instance, this.credentialsProvider, `/v1/changes/${r10.volumeId}/${r10.changestack}/spatials:get`, { signal: t10, method: "POST", body: JSON.stringify({ type: e11, ignore_payload: true }) }).then((e12) => e12.json()))).then((t11) => {
            n2(e10, t11);
          });
        }
      }
      n5 = nD([F()], n5);
      class n9 extends nj(rf, nN.Jb) {
        downloadSegmentFilteredGeometry(e10, t10, r10) {
          let { parameters: n10 } = this;
          return Promise.all(nW.map((t11) => nC(n10.instance, this.credentialsProvider, `/v1/changes/${n10.volumeId}/${n10.changestack}/spatials:get`, { signal: r10, method: "POST", body: JSON.stringify({ type: t11, object_labels: [e10.objectId.toString()], ignore_payload: true }) }).then((e11) => e11.json()))).then((t11) => {
            n2(e10, t11);
          });
        }
        downloadMetadata(e10, t10) {
          let { parameters: r10 } = this, n10 = e10.key;
          return nC(r10.instance, this.credentialsProvider, `/v1/changes/${r10.volumeId}/${r10.changestack}/spatials:get`, { signal: t10, method: "POST", body: JSON.stringify({ type: n3(n10), id: n6(r10, n10) }) }).then((e11) => e11.json()).then((t11) => {
            var i10;
            e10.annotation = (i10 = nX(r10), (0, ej.PT)(t11), n0((0, ej.uq)(t11, "annotations", (e11) => (0, ej.Iw)([void 0], e11, ej.PT))[0], i10, n10));
          }, () => {
            e10.annotation = null;
          });
        }
        add(e10) {
          let { parameters: t10 } = this, r10 = n8(e10);
          return nC(t10.instance, this.credentialsProvider, `/v1/changes/${t10.volumeId}/${t10.changestack}/spatials:push`, { method: "POST", body: JSON.stringify({ annotations: [r10] }) }).then((e11) => e11.json()).then((e11) => {
            (0, ej.PT)(e11);
            let t11 = (0, ej.uq)(e11, "ids", ej.zE);
            if (1 !== t11.length) throw Error(`Expected list of 1 id, but received ${JSON.stringify(t11)}.`);
            return nQ(nX(this.parameters), t11[0]);
          });
        }
        update(e10, t10) {
          let { parameters: r10 } = this, n10 = n8(t10);
          return n10.id = n6(r10, e10), nC(r10.instance, this.credentialsProvider, `/v1/changes/${r10.volumeId}/${r10.changestack}/spatials:push`, { method: "POST", body: JSON.stringify({ annotations: [n10] }) }).then((e11) => e11.json());
        }
        delete(e10) {
          let { parameters: t10 } = this;
          return nC(t10.instance, this.credentialsProvider, `/v1/changes/${t10.volumeId}/${t10.changestack}/spatials:delete`, { method: "POST", body: JSON.stringify({ type: n3(e10), ids: [n6(t10, e10)] }) }).then((e11) => e11.json());
        }
      }
      n9 = nD([F()], n9);
      let n7 = { id: "decodePng" };
      var ie = r2(7484);
      class it extends em(eP(na), ie.j) {
        constructor() {
          super(...arguments);
          __publicField(this, "tileKvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
          __publicField(this, "gridShape", (() => {
            let e10 = new Uint32Array(2), { upperVoxelBound: t10, chunkDataSize: r10 } = this.spec;
            for (let n10 = 0; n10 < 2; ++n10) e10[n10] = Math.ceil(t10[n10] / r10[n10]);
            return e10;
          })());
        }
        async download(e10, t10) {
          let r10;
          let { parameters: n10 } = this, { tilesize: i10, overlap: s10, encoding: a10 } = n10, [o10, l2] = e10.chunkGridPosition, u2 = 0 === o10 ? 0 : s10, h2 = 0 === l2 ? 0 : s10, c2 = `${this.tileKvStore.path}/${o10}_${l2}.${n10.format}`, d2 = await this.tileKvStore.store.read(c2, { signal: t10 });
          if (void 0 === d2) return;
          let f2 = new Uint8Array(await d2.response.arrayBuffer()), g2 = 0, p2 = 0;
          switch (a10) {
            case ie.W.PNG: {
              let e11 = await r5(n7, t10, [f2.buffer], f2, void 0, void 0, void 0, 3, 1, false);
              ({ width: g2, height: p2 } = e11), r10 = function(e12, t11, r11) {
                let n11 = new e12.constructor(e12.length);
                for (let i11 = 0; i11 < 3 * t11; i11 += 3) for (let s11 = 0; s11 < r11; s11++) n11[s11 * t11 + i11 / r11] = e12[i11 + s11];
                return n11;
              }(e11.uint8Array, g2 * p2, 3);
              break;
            }
            case ie.W.JPG:
            case ie.W.JPEG: {
              let e11 = await r5(nn, t10, [f2.buffer], f2, void 0, void 0, void 0, 3, false);
              ({ uint8Array: r10, width: g2, height: p2 } = e11);
            }
          }
          if (void 0 !== r10) {
            let t11 = i10 * i10, n11 = g2 * p2, s11 = e10.data = new Uint8Array(3 * t11);
            for (let e11 = 0; e11 < 3; e11++) for (let a11 = 0; a11 < p2; a11++) for (let o11 = 0; o11 < g2; o11++) s11[o11 + a11 * i10 + e11 * t11] = r10[o11 + u2 + (a11 + h2) * g2 + e11 * n11];
          }
        }
      }
      it = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F()], it);
      class ir {
        constructor(e10, t10) {
          __publicField(this, "baseUrl");
          __publicField(this, "nodeKey");
          this.baseUrl = e10, this.nodeKey = t10;
        }
        getNodeApiUrl(e10 = "") {
          return `${this.baseUrl}/api/node/${this.nodeKey}${e10}`;
        }
        getRepoInfoUrl() {
          return `${this.baseUrl}/api/repos/info`;
        }
        getKeyValueUrl(e10, t10) {
          return `${this.getNodeApiUrl()}/${e10}/key/${t10}`;
        }
        getKeyValueRangeUrl(e10, t10, r10) {
          return `${this.getNodeApiUrl()}/${e10}/keyrange/${t10}/${r10}`;
        }
        getKeyValuesUrl(e10) {
          return `${this.getNodeApiUrl()}/${e10}/keyvalues?jsontar=false`;
        }
      }
      function ii(e10, t10) {
        return e10.includes("?") ? e10 += "&" : e10 += "?", e10 += "app=Neuroglancer", t10 && (e10 += `&u=${t10}`), e10;
      }
      function is(e10, t10, r10) {
        return (0, rm.q)(e10, t10, r10, (e11, t11) => {
          let r11 = { ...t11 };
          return e11.token && (r11.headers = { ...r11.headers, Authorization: `Bearer ${e11}` }), r11;
        }, (e11) => {
          let { status: t11 } = e11;
          if (403 === t11 || 401 === t11) return "refresh";
          throw e11;
        });
      }
      var ia = r2(2600);
      class io {
        constructor() {
          __publicField(this, "type");
          __publicField(this, "x");
          __publicField(this, "y");
          __publicField(this, "z");
          __publicField(this, "radius");
          __publicField(this, "parent");
        }
      }
      function il(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      function iu(e10, t10) {
        return em(eI()(e10), t10);
      }
      class ih extends iu(nP, ia.zT) {
        download(e10, t10) {
          let { parameters: r10 } = this, n10 = `${e10.objectId}`, i10 = `${r10.baseUrl}/api/node/${r10.nodeKey}/${r10.dataInstanceKey}/key/` + n10 + "_swc";
          return is(this.credentialsProvider, ii(i10, r10.user), { signal: t10 }).then((e11) => e11.arrayBuffer()).then((t11) => {
            !function(e11, t12) {
              let r11 = function(e12) {
                let t13 = e12.split("\n"), r12 = [], n12 = "-?\\d*(?:\\.\\d+)?", i12 = RegExp("^[ \\t]*(" + ["\\d+", "\\d+", n12, n12, n12, n12, "-1|\\d+"].join(")[ \\t]+(") + ")[ \\t]*$");
                return t13.forEach((e13) => {
                  let t14 = e13.match(i12);
                  if (t14) {
                    let e14 = r12[parseInt(t14[1], 10)] = new io();
                    e14.type = parseInt(t14[2], 10), e14.x = parseFloat(t14[3]), e14.y = parseFloat(t14[4]), e14.z = parseFloat(t14[5]), e14.radius = parseFloat(t14[6]), e14.parent = parseInt(t14[7], 10);
                  }
                }), r12;
              }(t12);
              if (r11.length < 1) throw Error("ERROR parsing swc data");
              let n11 = new Uint32Array(r11.length), i11 = 0, s10 = 0;
              r11.forEach((e12, t13) => {
                e12 && (n11[t13] = i11++, e12.parent >= 0 && ++s10);
              });
              let a10 = new Float32Array(3 * i11), o10 = new Uint32Array(2 * s10), l2 = 0, u2 = 0;
              r11.forEach((e12) => {
                e12 && (a10[3 * l2] = e12.x, a10[3 * l2 + 1] = e12.y, a10[3 * l2 + 2] = e12.z, e12.parent >= 0 && (o10[2 * u2] = l2, o10[2 * u2 + 1] = n11[e12.parent], ++u2), ++l2);
              }), e11.indices = o10, e11.vertexPositions = a10;
            }(e10, new TextDecoder("utf-8").decode(t11));
          });
        }
      }
      ih = il([F()], ih);
      class ic extends iu(rz, ia.i6) {
        download(e10) {
          return e10.fragmentIds = [`${e10.objectId}`], Promise.resolve(void 0);
        }
        downloadFragment(e10, t10) {
          let { parameters: r10 } = this, n10 = new ir(r10.baseUrl, r10.nodeKey).getKeyValueUrl(r10.dataInstanceKey, `${e10.fragmentId}.ngmesh`);
          return is(this.credentialsProvider, ii(n10, r10.user), { signal: t10 }).then((e11) => e11.arrayBuffer()).then((t11) => function(e11, t12) {
            let r11 = new DataView(t12).getUint32(0, true);
            rW(e11, rD(3, t12, rS.LITTLE, 4, r11, void 0, void 0));
          }(e10, t11));
        }
      }
      ic = il([F()], ic);
      class id extends iu(na, ia.Yz) {
        async download(e10, t10) {
          let r10;
          let n10 = this.parameters;
          {
            let t11 = this.computeChunkBounds(e10), n11 = e10.chunkDataSize;
            r10 = this.getPath(t11, n11);
          }
          let i10 = this.getDecoder(n10), s10 = await is(this.credentialsProvider, ii(`${n10.baseUrl}${r10}`, n10.user), { signal: t10 }).then((e11) => e11.arrayBuffer());
          await i10(e10, t10, n10.encoding === ia.ke.JPEG ? s10.slice(16) : s10);
        }
        getPath(e10, t10) {
          let r10 = this.parameters;
          return r10.encoding === ia.ke.JPEG ? `/api/node/${r10.nodeKey}/${r10.dataInstanceKey}/subvolblocks/${t10[0]}_${t10[1]}_${t10[2]}/${e10[0]}_${e10[1]}_${e10[2]}` : r10.encoding === ia.ke.RAW ? `/api/node/${r10.nodeKey}/${r10.dataInstanceKey}/raw/0_1_2/${t10[0]}_${t10[1]}_${t10[2]}/${e10[0]}_${e10[1]}_${e10[2]}/jpeg` : r10.encoding === ia.ke.COMPRESSED_SEGMENTATIONARRAY ? `/api/node/${r10.nodeKey}/${r10.dataInstanceKey}/raw/0_1_2/${t10[0]}_${t10[1]}_${t10[2]}/${e10[0]}_${e10[1]}_${e10[2]}?compression=googlegzip&scale=${r10.dataScale}` : `/api/node/${r10.nodeKey}/${r10.dataInstanceKey}/raw/0_1_2/${t10[0]}_${t10[1]}_${t10[2]}/${e10[0]}_${e10[1]}_${e10[2]}?compression=googlegzip`;
        }
        getDecoder(e10) {
          return e10.encoding === ia.ke.JPEG || e10.encoding === ia.ke.RAW ? ni : n_;
        }
      }
      id = il([F()], id);
      var ig = r2(3078), ip = r2(6923);
      class im {
        constructor() {
          __publicField(this, "url");
        }
      }
      __publicField(im, "RPC_ID", "graphene/ChunkedGraphSource");
      class iy {
        constructor() {
          __publicField(this, "manifestUrl");
          __publicField(this, "fragmentUrl");
          __publicField(this, "lod");
          __publicField(this, "sharding");
          __publicField(this, "nBitsForLayerId");
        }
      }
      __publicField(iy, "RPC_ID", "graphene/MeshSource");
      function iv(e10, t10) {
        return 1n == e10 >> BigInt(64 - t10);
      }
      async function ib(e10) {
        if (e10.response) {
          let t10;
          return "application/json" === e10.response.headers.get("content-type") ? (await e10.response.json()).message : await e10.response.text();
        }
      }
      function iw(e10, t10) {
        let { store: r10, path: n10 } = e10.getKvStore(t10);
        if (!(r10 instanceof ig.Z)) throw Error(`Non-HTTP URL ${JSON.stringify(t10)} not supported`);
        let { fetchOkImpl: i10, baseUrl: s10 } = r10;
        if (s10.includes("?")) throw Error(`Invalid URL ${s10}: query parameters not supported`);
        return { fetchOkImpl: i10, baseUrl: (0, ip.Lj)(s10, n10) };
      }
      var iS = r2(602);
      let iE = Symbol("objectId"), ik = 0;
      class iI extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "asyncMemoize");
        }
        initialize(e10) {
          super.initialize(e10);
        }
        freeSystemMemory() {
          this.asyncMemoize = void 0;
        }
      }
      class iM extends en {
        constructor(e10, t10) {
          super(e10);
          __publicField(this, "encodeKeyFunction");
          __publicField(this, "downloadFunction");
          this.registerDisposer(e10), this.downloadFunction = t10.get, this.encodeKeyFunction = t10.encodeKey ?? ej.hd;
        }
        get(e10, t10) {
          let r10 = this.encodeKeyFunction(e10), n10 = this.chunks.get(r10);
          return void 0 === n10 && ((n10 = this.getNewChunk_(iI)).initialize(r10), this.addChunk(n10)), void 0 === n10.asyncMemoize && (n10.asyncMemoize = (0, X.E7)(async (t11) => {
            try {
              let { data: r11, size: i10 } = await this.downloadFunction(e10, t11);
              return n10.systemMemoryBytes = i10, n10.queueManager.updateChunkState(n10, q.SYSTEM_MEMORY_WORKER), r11;
            } catch (e11) {
              throw n10.queueManager.updateChunkState(n10, q.FAILED), e11;
            }
          })), n10.state === q.SYSTEM_MEMORY_WORKER && n10.chunkManager.queueManager.markRecentlyUsed(n10), n10.asyncMemoize(t10);
        }
      }
      function ix(e10, t10, r10, n10) {
        return e10.chunkManager.memoize.get(`getCachedDecodedUrl:${function(e11) {
          if (e11 instanceof Object) {
            let t11 = e11[iE];
            return void 0 === t11 && (t11 = e11[iE] = ik++), `o${t11}`;
          }
          return "" + JSON.stringify(e11);
        }(r10)}`, () => {
          let t11 = new iM(e10.chunkManager.addRef(), { get: async (t12, n11) => {
            let i10 = await e10.kvStoreContext.read(t12, { ...n11, throwIfMissing: true });
            try {
              return r10(i10, n11);
            } catch (e11) {
              throw Error("Error reading ${url}", { cause: e11 });
            }
          } });
          return t11.registerDisposer(e10.addRef()), t11;
        }).get(t10, n10);
      }
      var iT = r2(4758), iC = r2(4634), iN = r2(6985);
      function i$(e10) {
        return e10 ^= e10 >>> 16, e10 = Math.imul(e10, 2246822507), e10 ^= e10 >>> 13, e10 = Math.imul(e10, 3266489909), e10 ^= e10 >>> 16;
      }
      function iR(e10, t10) {
        return e10 << t10 | e10 >>> 32 - t10;
      }
      let iP = /* @__PURE__ */ new Map([[iS.wC.MURMURHASH3_X86_128, (e10) => {
        let t10, r10, n10, i10, s10, a10;
        return t10 = 0, n10 = 0, i10 = 0, r10 = 0 ^ Math.imul(iR(Math.imul(Number(e10 >> BigInt(32)), 2869860233), 16), 951274213), t10 ^= Math.imul(iR(Math.imul(Number(e10 & BigInt(4294967295)), 597399067), 15), 2869860233), t10 ^= 8, r10 ^= 8, n10 ^= 8, i10 ^= 8, t10 = (t10 = (t10 = t10 + r10 >>> 0) + n10 >>> 0) + i10 >>> 0, r10 = r10 + t10 >>> 0, n10 = n10 + t10 >>> 0, i10 = i10 + t10 >>> 0, t10 = i$(t10), r10 = i$(r10), n10 = i$(n10), i10 = i$(i10), t10 = (t10 = (t10 = t10 + r10 >>> 0) + n10 >>> 0) + i10 >>> 0, r10 = r10 + t10 >>> 0, BigInt(t10) | BigInt(r10) << BigInt(32);
      }], [iS.wC.IDENTITY, (e10) => e10]]);
      function iO(e10, t10) {
        return t10 === iS.qm.GZIP && (e10 = new iC.Ll(e10, "gzip")), e10;
      }
      class iU extends M.gj {
        constructor(e10, t10, r10) {
          super();
          __publicField(this, "base");
          __publicField(this, "sharding");
          __publicField(this, "minishardIndexCache");
          this.base = t10, this.sharding = r10, this.minishardIndexCache = this.registerDisposer(new iM(e10.addRef(), { encodeKey: (e11) => e11.toString(), get: async (e11, n10) => {
            let i10 = e11 & (1n << BigInt(r10.minishardBits)) - 1n, s10 = (1n << BigInt(r10.shardBits)) - 1n & e11 >> BigInt(r10.minishardBits), a10 = t10.path + s10.toString(16).padStart(Math.ceil(r10.shardBits / 4), "0") + ".shard", o10 = new iN.f2(t10.store, a10), l2 = BigInt(16) << BigInt(r10.minishardBits), u2 = await (0, iN.iT)(o10, { ...n10, byteRange: { offset: Number(i10 << 4n), length: 16 }, strictByteRange: true });
            if (void 0 === u2) return { data: void 0, size: 0 };
            let h2 = new DataView(await u2.response.arrayBuffer()), c2 = h2.getBigUint64(0, true), d2 = h2.getBigUint64(8, true);
            if (c2 === d2) return { data: void 0, size: 0 };
            c2 += l2, d2 += l2;
            let f2 = await (await (0, iN.iT)(iO(new iT.uX(o10, { offset: Number(c2), length: Number(d2 - c2) }), r10.minishardIndexEncoding), { ...n10, strictByteRange: true, throwIfMissing: true })).response.arrayBuffer();
            if (f2.byteLength % 24 != 0) throw Error(`Invalid minishard index length: ${f2.byteLength}`);
            let g2 = new BigUint64Array(f2);
            !function(e12, t11, r11 = rE) {
              t11 !== r11 && rM(e12);
            }(g2, rS.LITTLE);
            let p2 = g2.byteLength / 24, m2 = 0n, y2 = l2;
            for (let e12 = 0; e12 < p2; ++e12) {
              let t11 = m2 + g2[e12];
              m2 = g2[e12] = t11;
              let r11 = y2 + g2[p2 + e12];
              g2[p2 + e12] = r11;
              let n11 = r11 + g2[2 * p2 + e12];
              y2 = n11, g2[2 * p2 + e12] = n11;
            }
            return { data: { data: g2, shardPath: a10 }, size: g2.byteLength };
          } }));
        }
        getUrl(e10) {
          return `chunk ${e10} in ${this.base.store.getUrl(this.base.path)}`;
        }
        async findKey(e10, t10) {
          let { sharding: r10 } = this, n10 = iP.get(r10.hash)(e10 >> BigInt(r10.preshiftBits)) & (1n << BigInt(r10.minishardBits + r10.shardBits)) - 1n, i10 = await this.minishardIndexCache.get(n10, t10);
          if (void 0 === i10) return;
          let s10 = function(e11, t11) {
            let r11 = e11.data, n11 = r11.length / 3;
            for (let e12 = 0; e12 < n11; ++e12) {
              if (r11[e12] !== t11) continue;
              let i11 = r11[n11 + e12], s11 = r11[2 * n11 + e12];
              return { offset: Number(i11), length: Number(s11 - i11) };
            }
          }(i10, e10);
          if (void 0 !== s10) return { minishardEntry: s10, shardInfo: { shardPath: i10.shardPath, offset: s10.offset } };
        }
        async readWithShardInfo(e10, t10) {
          let { sharding: r10 } = this, n10 = await this.findKey(e10, t10);
          if (void 0 === n10) return;
          let { minishardEntry: i10, shardInfo: s10 } = n10;
          return { response: await iO(new iT.uX(new iN.f2(this.base.store, s10.shardPath), i10), r10.dataEncoding).read(t10), shardInfo: s10 };
        }
        async stat(e10, t10) {
          let r10 = await this.findKey(e10, t10);
          if (void 0 === r10) return;
          let { sharding: n10 } = this;
          return n10.dataEncoding !== iS.qm.RAW ? { totalSize: void 0 } : { totalSize: r10.minishardEntry.length };
        }
        async read(e10, t10) {
          let r10 = await this.readWithShardInfo(e10, t10);
          if (void 0 !== r10) return r10.response;
        }
        get supportsOffsetReads() {
          return this.sharding.dataEncoding === iS.qm.RAW;
        }
        get supportsSuffixReads() {
          return this.sharding.dataEncoding === iS.qm.RAW;
        }
      }
      function i_(e10, t10, r10) {
        if (void 0 !== r10) return e10.registerDisposer(new iU(e10.chunkManager, t10, r10));
      }
      let iA = 0, iL = { emscripten_notify_memory_growth: (e10) => {
      }, neuroglancer_draco_receive_decoded_mesh: (e10, t10, r10, i10, a10) => {
        let o10 = n.exports.memory, l2 = new Uint32Array(o10.buffer, r10, 3 * e10).slice(), u2 = new Uint32Array(o10.buffer, i10, 3 * t10).slice();
        s = { indices: l2, vertexPositions: u2, subChunkOffsets: new Uint32Array(o10.buffer, a10, iA + 1).slice() };
      }, proc_exit: (e10) => {
        throw `proc exit: ${e10}`;
      } };
      function iD() {
        return void 0 == i && (i = (async () => {
          let e10 = n = (await WebAssembly.instantiateStreaming(fetch(new URL(r2(8522), r2.b)), { env: iL, wasi_snapshot_preview1: iL })).instance;
          return e10.exports._initialize(), e10;
        })()), i;
      }
      async function iz(e10, t10, r10) {
        let n10 = await iD(), i10 = n10.exports.malloc(e10.byteLength);
        new Uint8Array(n10.exports.memory.buffer).set(e10, i10), iA = r10 ? 8 : 1;
        let a10 = n10.exports.neuroglancer_draco_decode(i10, e10.byteLength, r10, t10, true);
        if (0 === a10) {
          let e11 = s;
          if (s = void 0, e11 instanceof Error) throw e11;
          return e11;
        }
        throw Error(`Failed to decode draco mesh: ${a10}`);
      }
      async function iB(e10) {
        let t10 = await iD(), r10 = t10.exports.malloc(e10.byteLength);
        new Uint8Array(t10.exports.memory.buffer).set(e10, r10);
        let n10 = t10.exports.neuroglancer_draco_decode(r10, e10.byteLength, false, 0, false);
        if (0 === n10) {
          let e11 = s;
          if (s = void 0, e11 instanceof Error) throw e11;
          return e11.vertexPositions = new Float32Array(e11.vertexPositions.buffer), e11;
        }
        throw Error(`Failed to decode draco mesh: ${n10}`);
      }
      let ij = { id: "decodeCompresso" };
      async function iF(e10, t10, r10) {
        let n10 = await r5(ij, t10, [r10], new Uint8Array(r10));
        await nA(e10, t10, n10.buffer);
      }
      let iV = { id: "decodeJxl" };
      async function iG(e10, t10, r10) {
        let n10 = e10.chunkDataSize, { uint8Array: i10 } = await r5(iV, t10, [r10], new Uint8Array(r10), n10[0] * n10[1] * n10[2], n10[3] || 1, 1);
        await r9(e10, t10, i10);
      }
      async function iK(e10, t10, r10) {
        let n10 = e10.chunkDataSize, i10 = e10.source.spec.dataType, { uint8Array: s10 } = await r5(n7, t10, [r10], new Uint8Array(r10), void 0, void 0, n10[0] * n10[1] * n10[2], n10[3] || 1, e7[i10], false);
        await nA(e10, t10, s10.buffer);
      }
      function iq(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      function iY(e10) {
        if (void 0 === e10) throw Error("not found");
        return e10;
      }
      let iJ = /* @__PURE__ */ new Map();
      iJ.set(iS.ke.RAW, nA), iJ.set(iS.ke.JPEG, ni), iJ.set(iS.ke.COMPRESSED_SEGMENTATION, n_), iJ.set(iS.ke.COMPRESSO, iF), iJ.set(iS.ke.PNG, iK), iJ.set(iS.ke.JXL, iG);
      class iW extends em(eP(na), iS.Yz) {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkDecoder", iJ.get(this.parameters.encoding));
          __publicField(this, "kvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
          __publicField(this, "shardedKvStore", i_(this, this.kvStore, this.parameters.sharding));
          __publicField(this, "gridShape", (() => {
            let e10 = new Uint32Array(3), { upperVoxelBound: t10, chunkDataSize: r10 } = this.spec;
            for (let n10 = 0; n10 < 3; ++n10) e10[n10] = Math.ceil(t10[n10] / r10[n10]);
            return e10;
          })());
        }
        async download(e10, t10) {
          let r10;
          let { shardedKvStore: n10 } = this;
          if (void 0 === n10) {
            let n11;
            let { kvStore: i10 } = this;
            {
              let t11 = this.computeChunkBounds(e10), r11 = e10.chunkDataSize;
              n11 = `${i10.path}${t11[0]}-${t11[0] + r11[0]}_${t11[1]}-${t11[1] + r11[1]}_${t11[2]}-${t11[2] + r11[2]}`;
            }
            r10 = await i10.store.read(n11, { signal: t10 });
          } else {
            this.computeChunkBounds(e10);
            let { gridShape: i10 } = this, { chunkGridPosition: s10 } = e10, a10 = Math.ceil(Math.log2(i10[0])), o10 = rC(a10, Math.ceil(Math.log2(i10[1])), Math.ceil(Math.log2(i10[2])), s10[0], s10[1], s10[2]);
            r10 = await n10.read(o10, { signal: t10 });
          }
          void 0 !== r10 && await this.chunkDecoder(e10, t10, await r10.response.arrayBuffer());
        }
      }
      function iZ(e10, t10) {
        return r_(e10, t10, "fragments");
      }
      iW = iq([F()], iW);
      class iX extends em(eP(rz), iS.i6) {
        constructor() {
          super(...arguments);
          __publicField(this, "kvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
        }
        async download(e10, t10) {
          let { parameters: r10, kvStore: n10 } = this, i10 = await (0, iN.BF)(n10.store, `${n10.path}${e10.objectId}:${r10.lod}`, { signal: t10, throwIfMissing: true });
          iZ(e10, await i10.response.json());
        }
        async downloadFragment(e10, t10) {
          let { kvStore: r10 } = this, n10 = await (0, iN.BF)(r10.store, `${r10.path}${e10.fragmentId}`, { signal: t10, throwIfMissing: true });
          !function(e11, t11) {
            let r11 = new DataView(t11).getUint32(0, true);
            rW(e11, rD(3, t11, rS.LITTLE, 4, r11, void 0, void 0));
          }(e10, await n10.response.arrayBuffer());
        }
      }
      async function iQ(e10, t10) {
        let { lod: r10 } = e10, n10 = e10.manifestChunk.source;
        rZ(e10, await iz(new Uint8Array(t10), n10.parameters.metadata.vertexQuantizationBits, 0 !== r10), n10.format.vertexPositionFormat);
      }
      iX = iq([F()], iX);
      class iH extends em(eP(rG), iS.f5) {
        constructor() {
          super(...arguments);
          __publicField(this, "kvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
          __publicField(this, "shardedKvStore", i_(this, this.kvStore, this.parameters.metadata.sharding));
        }
        async download(e10, t10) {
          let r10;
          let { shardedKvStore: n10 } = this;
          if (void 0 === n10) {
            let { kvStore: n11 } = this;
            r10 = await n11.store.read(`${n11.path}${e10.objectId}.index`, { signal: t10 });
          } else ({ response: r10, shardInfo: e10.shardInfo } = iY(await n10.readWithShardInfo(e10.objectId, { signal: t10 })));
          !function(e11, t11) {
            let r11;
            if (t11.byteLength < 28 || t11.byteLength % 4 != 0) throw Error(`Invalid index file size: ${t11.byteLength}`);
            let n11 = new DataView(t11), i10 = 0, s10 = eB.R3.fromValues(n11.getFloat32(i10, true), n11.getFloat32(i10 + 4, true), n11.getFloat32(i10 + 8, true));
            i10 += 12;
            let a10 = eB.R3.fromValues(n11.getFloat32(i10, true), n11.getFloat32(i10 + 4, true), n11.getFloat32(i10 + 8, true));
            i10 += 12;
            let o10 = n11.getUint32(i10, true);
            if (i10 += 4, t11.byteLength < i10 + 20 * o10) throw Error(`Invalid index file size for ${o10} lods: ${t11.byteLength}`);
            let l2 = new Float32Array(t11, i10, o10);
            i10 += 4 * o10, rx(l2, rS.LITTLE);
            let u2 = new Float32Array(t11, i10, 3 * o10);
            rx(u2, rS.LITTLE);
            let h2 = new Uint32Array(t11, i10 += 12 * o10, o10);
            i10 += 4 * o10, rx(h2, rS.LITTLE);
            let c2 = h2.reduce((e12, t12) => e12 + t12);
            if (t11.byteLength !== i10 + 16 * c2) throw Error(`Invalid index file size for ${o10} lods and ${c2} total fragments: ${t11.byteLength}`);
            let d2 = new Uint32Array(t11, i10);
            rx(d2, rS.LITTLE);
            let f2 = eB.R3.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), g2 = eB.R3.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), p2 = Math.max(1, l2.length);
            {
              let e12 = 0;
              for (let t12 = 0; t12 < o10; ++t12) {
                let r12 = h2[t12];
                for (let n12 = 0; n12 < 3; ++n12) {
                  let i11 = Number.NEGATIVE_INFINITY, s11 = Number.POSITIVE_INFINITY, a11 = e12 + r12 * n12;
                  for (let e13 = 0; e13 < r12; ++e13) {
                    let t13 = d2[a11 + e13];
                    i11 = Math.max(i11, t13), s11 = Math.min(s11, t13);
                  }
                  if (0 !== r12) {
                    for (; i11 >>> p2 - t12 - 1 != s11 >>> p2 - t12 - 1; ) ++p2;
                    0 === t12 && (f2[n12] = Math.min(f2[n12], (1 << t12) * s11), g2[n12] = Math.max(g2[n12], (1 << t12) * (i11 + 1)));
                  }
                }
                e12 += 4 * r12;
              }
            }
            let m2 = 0;
            {
              let e12 = 0, t12 = 0;
              for (let r12 = 0; r12 < o10; ++r12) {
                let n12 = h2[r12];
                m2 += e12 * (r12 - t12), t12 = r12, e12 = n12, m2 += n12;
              }
              m2 += (p2 - 1 - t12) * e12;
            }
            let y2 = new Uint32Array(5 * m2), v2 = new Float64Array(m2 + 1);
            {
              let t12 = 0, n12 = 0, i11 = 0, s11 = 0;
              for (let e12 = 0; e12 < o10; ++e12) {
                let r12 = h2[e12];
                for (let e13 = 0; e13 < r12; ++e13) {
                  for (let t14 = 0; t14 < 3; ++t14) y2[5 * (n12 + e13) + t14] = d2[s11 + e13 + t14 * r12];
                  let t13 = d2[s11 + e13 + 3 * r12];
                  i11 += t13, v2[n12 + e13 + 1] = i11, 0 === t13 && (y2[5 * (n12 + e13) + 4] = 2147483648);
                }
                for (s11 += 4 * r12, 0 !== e12 && function(e13, t13, r13, n13) {
                  let i12 = t13;
                  for (let t14 = r13; t14 < n13; ++t14) {
                    let n14 = e13[5 * t14], s12 = e13[5 * t14 + 1], a11 = e13[5 * t14 + 2];
                    for (; i12 < r13; ) {
                      let t15 = e13[5 * i12] >>> 1;
                      if (!rN(t15, e13[5 * i12 + 1] >>> 1, e13[5 * i12 + 2] >>> 1, n14, s12, a11)) break;
                      ++i12;
                    }
                    for (e13[5 * t14 + 3] = i12; i12 < r13; ) {
                      let t15 = e13[5 * i12] >>> 1, r14 = e13[5 * i12 + 1] >>> 1, o11 = e13[5 * i12 + 2] >>> 1;
                      if (t15 !== n14 || r14 !== s12 || o11 !== a11) break;
                      ++i12;
                    }
                    e13[5 * t14 + 4] += i12;
                  }
                }(y2, t12, n12, n12 + r12), t12 = n12, n12 += r12; e12 + 1 < p2 && (e12 + 1 >= l2.length || 0 === l2[e12 + 1]); ) {
                  let r13 = rX(y2, t12, n12);
                  v2.fill(i11, n12 + 1, r13 + 1), t12 = n12, n12 = r13, ++e12;
                }
              }
              r11 = y2.slice(0, 5 * n12), e11.offsets = v2.slice(0, n12 + 1);
            }
            let { lodScaleMultiplier: b2 } = e11.source.parameters.metadata, w2 = new Float32Array(p2);
            w2.set(l2, 0);
            for (let e12 = 0; e12 < l2.length; ++e12) w2[e12] *= b2;
            e11.manifest = { chunkShape: s10, chunkGridSpatialOrigin: a10, clipLowerBound: eB.R3.add(f2, a10, eB.R3.multiply(f2, f2, s10)), clipUpperBound: eB.R3.add(g2, a10, eB.R3.multiply(g2, g2, s10)), octree: r11, lodScales: w2, vertexOffsets: u2 };
          }(e10, await iY(r10).response.arrayBuffer());
        }
        async downloadFragment(e10, t10) {
          let r10, n10, i10;
          let { kvStore: s10 } = this, a10 = e10.manifestChunk, o10 = e10.chunkIndex, { shardInfo: l2, offsets: u2 } = a10, h2 = u2[o10], c2 = u2[o10 + 1];
          if (void 0 !== l2) {
            r10 = l2.shardPath;
            let e11 = u2[u2.length - 1], t11 = l2.offset - e11 + h2, s11 = t11 + c2 - h2;
            n10 = t11, i10 = s11;
          } else r10 = `${s10.path}${a10.objectId}`, n10 = h2, i10 = c2;
          let d2 = await (0, iN.BF)(s10.store, r10, { signal: t10, byteRange: { offset: n10, length: i10 - n10 }, throwIfMissing: true, strictByteRange: true });
          await iQ(e10, await d2.response.arrayBuffer());
        }
      }
      async function i0(e10, t10, r10) {
        let { shardedKvStore: n10 } = e10;
        if (void 0 !== n10) return n10.read(t10, { signal: r10 });
        {
          let { kvStore: n11 } = e10;
          return n11.store.read(`${n11.path}${t10}`, { signal: r10 });
        }
      }
      iH = iq([F()], iH);
      class i1 extends em(eP(nP), iS.zT) {
        constructor() {
          super(...arguments);
          __publicField(this, "kvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
          __publicField(this, "shardedKvStore", i_(this, this.kvStore, this.parameters.metadata.sharding));
        }
        async download(e10, t10) {
          let { parameters: r10 } = this, n10 = iY(await i0(this, e10.objectId, t10));
          !function(e11, t11, r11) {
            let n11 = new DataView(t11), i10 = n11.getUint32(0, true), s10 = n11.getUint32(4, true), a10 = 8 + 12 * i10;
            nU(e11, t11, rS.LITTLE, 8, i10, a10, s10), a10 += 8 * s10;
            let o10 = [];
            for (let e12 of r11.values()) {
              let r12 = e7[e12.dataType] * e12.numComponents, n12 = r12 * i10, s11 = new Uint8Array(t11, a10, n12);
              switch (r12) {
                case 2:
                  !function(e13, t12, r13 = rE) {
                    t12 !== r13 && rk(e13);
                  }(s11, rS.LITTLE);
                  break;
                case 4:
                case 8:
                  rx(s11, rS.LITTLE);
              }
              o10.push(s11), a10 += n12;
            }
            e11.vertexAttributes = o10;
          }(e10, await n10.response.arrayBuffer(), r10.metadata.vertexAttributes);
        }
      }
      function i2(e10, t10, r10) {
        let n10;
        let i10 = new DataView(e10);
        if (e10.byteLength <= 8) throw Error("Expected at least 8 bytes");
        let s10 = i10.getUint32(0, true);
        if (0 !== i10.getUint32(4, true)) throw Error("Annotation count too high");
        let a10 = r10.serializedBytes, o10 = 8 + (a10 + 8) * s10;
        if (e10.byteLength !== o10) throw Error(`Expected ${o10} bytes, but received: ${e10.byteLength} bytes`);
        let l2 = 8 + a10 * s10, u2 = Array(s10);
        for (let e11 = 0; e11 < s10; ++e11) u2[e11] = i10.getBigUint64(l2 + 8 * e11, true).toString();
        let h2 = new ra(), c2 = new Uint8Array(e10, 8, a10 * s10), { propertyGroupBytes: d2 } = r10;
        if (d2.length > 1) {
          n10 = new Uint8Array(c2.length);
          let e11 = 0, t11 = 0;
          for (let r11 = 0; r11 < d2.length; ++r11) {
            let i11 = d2[r11];
            for (let r12 = 0; r12 < s10; ++r12) {
              let s11 = e11 + r12 * a10, o11 = t11 + r12 * i11;
              for (let e12 = 0; e12 < i11; ++e12) n10[o11 + e12] = c2[s11 + e12];
            }
            e11 += i11, t11 += i11 * s10;
          }
        } else n10 = c2;
        h2.data = n10;
        let f2 = h2.typeToOffset = Array(nv.length);
        f2.fill(0), f2[t10.type] = 0;
        let g2 = h2.typeToIds = Array(nv.length), p2 = h2.typeToIdMaps = Array(nv.length);
        return g2.fill([]), g2[t10.type] = u2, p2.fill(/* @__PURE__ */ new Map()), p2[t10.type] = new Map(u2.map((e11, t11) => [e11, t11])), h2;
      }
      i1 = iq([F()], i1);
      class i3 extends em(eP(rc), iS.WM) {
        constructor() {
          super(...arguments);
          __publicField(this, "kvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
          __publicField(this, "shardedKvStore", i_(this, this.kvStore, this.parameters.sharding));
        }
        async download(e10, t10) {
          let r10;
          let { shardedKvStore: n10 } = this, { parent: i10 } = this, { chunkGridPosition: s10 } = e10;
          if (void 0 === n10) {
            let { kvStore: e11 } = this, n11 = `${e11.path}${s10.join("_")}`;
            r10 = await e11.store.read(n11, { signal: t10 });
          } else {
            let { upperChunkBound: i11 } = this.spec, { chunkGridPosition: s11 } = e10, a10 = function(e11, t11) {
              let r11 = 0n, n11 = 0, i12 = e11.length;
              for (let s12 = 0; s12 < 32; ++s12) for (let a11 = 0; a11 < i12; ++a11) if (t11[a11] - 1 >>> s12) r11 |= BigInt(1 & e11[a11] >>> s12) << BigInt(n11++);
              return r11;
            }(s11, i11);
            r10 = await n10.read(a10, { signal: t10 });
          }
          void 0 !== r10 && (e10.data = i2(await r10.response.arrayBuffer(), i10.parameters, i10.annotationPropertySerializer));
        }
      }
      i3 = iq([F()], i3);
      class i4 extends em(eP(rf), iS.Jb) {
        constructor() {
          super(...arguments);
          __publicField(this, "kvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.byId.url));
          __publicField(this, "shardedKvStore", i_(this, this.kvStore, this.parameters.byId.sharding));
          __publicField(this, "relationshipIndexSource", this.parameters.relationships.map((e10) => {
            let t10 = this.sharedKvStoreContext.kvStoreContext.getKvStore(e10.url), r10 = i_(this, t10, e10.sharding);
            return { kvStore: t10, shardedKvStore: r10 };
          }));
          __publicField(this, "annotationPropertySerializer", new nw(this.parameters.rank, nM[this.parameters.type].serializedBytes(this.parameters.rank), this.parameters.properties));
        }
        async downloadSegmentFilteredGeometry(e10, t10, r10) {
          let n10 = await i0(this.relationshipIndexSource[t10], e10.objectId, r10);
          void 0 !== n10 && (e10.data = i2(await n10.response.arrayBuffer(), this.parameters, this.annotationPropertySerializer));
        }
        async downloadMetadata(e10, t10) {
          let r10 = BigInt(e10.key), n10 = await i0(this, r10, t10);
          void 0 === n10 ? e10.annotation = null : e10.annotation = function(e11, t11, r11, n11) {
            let i10 = nM[t11.type], s10 = r11.serializedBytes, a10 = t11.relationships.length, o10 = s10 + 4 * a10;
            if (e11.byteLength < o10) throw Error(`Expected at least ${o10} bytes, but received: ${e11.byteLength}`);
            let l2 = new DataView(e11), u2 = i10.deserialize(l2, 0, true, t11.rank, n11);
            r11.deserialize(l2, 0, 0, 1, true, u2.properties = Array(t11.properties.length));
            let h2 = s10, c2 = u2.relatedSegments = [];
            c2.length = a10;
            for (let t12 = 0; t12 < a10; ++t12) {
              let r12 = l2.getUint32(h2, true);
              if (e11.byteLength < o10 + 8 * r12) throw Error(`Expected at least ${o10} bytes, but received: ${e11.byteLength}`);
              h2 += 4;
              let n12 = c2[t12] = new BigUint64Array(r12);
              for (let e12 = 0; e12 < r12; ++e12) n12[e12] = l2.getBigUint64(h2, true), h2 += 8;
            }
            if (h2 !== e11.byteLength) throw Error(`Expected ${h2} bytes, but received: ${e11.byteLength}`);
            return u2;
          }(await n10.response.arrayBuffer(), this.parameters, this.annotationPropertySerializer, e10.key);
        }
      }
      function i6(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      async function i8(e10, t10) {
        rW(e10, await iB(t10));
      }
      i4 = iq([F()], i4);
      class i5 extends em(eP(rz), iy) {
        constructor() {
          super(...arguments);
          __publicField(this, "manifestRequestCount", /* @__PURE__ */ new Map());
          __publicField(this, "newSegments", new t6());
          __publicField(this, "manifestHttpSource", iw(this.sharedKvStoreContext.kvStoreContext, this.parameters.manifestUrl));
          __publicField(this, "fragmentKvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.fragmentUrl));
        }
        addNewSegment(e10) {
          let { newSegments: t10 } = this;
          t10.add(e10), setTimeout(() => {
            t10.delete(e10);
          }, 6e5);
        }
        async download(e10, t10) {
          let { parameters: r10, newSegments: n10, manifestRequestCount: i10 } = this;
          if (iv(e10.objectId, r10.nBitsForLayerId)) return iZ(e10, { fragments: [] });
          let { fetchOkImpl: s10, baseUrl: a10 } = this.manifestHttpSource, o10 = `/manifest/${e10.objectId}:${r10.lod}?verify=1&prepend_seg_ids=1`, l2 = await (await s10(a10 + o10, { signal: t10 })).json();
          if (n10.has(e10.objectId)) {
            let t11 = (i10.get(o10) ?? 0) + 1;
            i10.set(o10, t11), setTimeout(() => {
              this.chunkManager.queueManager.updateChunkState(e10, q.QUEUED);
            }, 2 ** t11 * 1e3);
          } else i10.delete(o10);
          return iZ(e10, l2);
        }
        async downloadFragment(e10, t10) {
          var r10, n10;
          let { response: i10 } = await (r10 = this.fragmentKvStore, n10 = e10.fragmentId, this.parameters.sharding ? function(e11, t11, r11) {
            if (t11 && "~" === t11.charAt(0)) {
              let n11 = t11.substring(1).split(":"), i11 = { offset: Number(n11[1]), length: Number(n11[2]) };
              return (0, iN.BF)(e11.store, `${e11.path}initial/${n11[0]}`, { signal: r11, byteRange: i11, throwIfMissing: true });
            }
            return (0, iN.BF)(e11.store, `${e11.path}dynamic/${t11}`, { signal: r11, throwIfMissing: true });
          }(r10, n10, t10) : (0, iN.BF)(r10.store, `${r10.path}/${n10}`, { signal: t10, throwIfMissing: true }));
          await i8(e10, new Uint8Array(await i10.arrayBuffer()));
        }
        getFragmentKey(e10, t10) {
          return function(e11) {
            if ("~" === e11.charAt(0)) {
              let t11 = e11.substring(1).split(/:(.+)/);
              return { key: t11[0], fragmentId: t11[1] };
            }
            return { key: e11, fragmentId: e11 };
          }(t10);
        }
      }
      i5 = i6([F()], i5);
      class i9 extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkGridPosition");
          __publicField(this, "source", null);
          __publicField(this, "segment");
          __publicField(this, "leaves", new BigUint64Array(0));
          __publicField(this, "chunkDataSize");
        }
        initializeVolumeChunk(e10, t10) {
          super.initialize(e10), this.chunkGridPosition = Float32Array.from(t10);
        }
        initializeChunkedGraphChunk(e10, t10, r10) {
          this.initializeVolumeChunk(e10, t10), this.chunkDataSize = null, this.systemMemoryBytes = 16, this.gpuMemoryBytes = 0, this.segment = r10;
        }
        downloadSucceeded() {
          this.systemMemoryBytes = 16, this.systemMemoryBytes += this.leaves.byteLength, this.queueManager.updateChunkState(this, q.SYSTEM_MEMORY_WORKER), this.priorityTier < Y.RECENT && this.source.chunkManager.scheduleUpdateChunkPriorities(), super.downloadSucceeded();
        }
        freeSystemMemory() {
          this.leaves = new BigUint64Array(0);
        }
      }
      class i7 extends em(eP(es), im) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "spec");
          __publicField(this, "tempChunkDataSize");
          __publicField(this, "tempChunkPosition");
          __publicField(this, "httpSource", iw(this.sharedKvStoreContext.kvStoreContext, this.parameters.url));
          this.spec = t10.spec;
          let r10 = this.spec.rank;
          this.tempChunkDataSize = new Uint32Array(r10), this.tempChunkPosition = new Float32Array(r10);
        }
        async download(e10, t10) {
          let r10 = this.computeChunkBounds(e10), n10 = e10.chunkDataSize, i10 = `${r10[0]}-${r10[0] + n10[0]}_${r10[1]}-${r10[1] + n10[1]}_${r10[2]}-${r10[2] + n10[2]}`, { fetchOkImpl: s10, baseUrl: a10 } = this.httpSource, o10 = s10(`${a10}/${e10.segment}/leaves?int64_as_str=1&bounds=${i10}`, { signal: t10 });
          await this.withErrorMessage(o10, `Fetching leaves of segment ${e10.segment} in region ${i10}: `).then((e11) => e11.json()).then((t11) => {
            var r11;
            e10.leaves = (r11 = t11.leaf_ids, BigUint64Array.from(r11, ej.tw));
          }).catch((e11) => {
            e11 instanceof Error && "AbortError" === e11.name || console.error(e11);
          });
        }
        getChunk(e10, t10) {
          let r10 = `${(0, eB.m0)(e10)}-${t10}`, n10 = this.chunks.get(r10);
          return void 0 === n10 && ((n10 = this.getNewChunk_(i9)).initializeChunkedGraphChunk(r10, e10, t10), this.addChunk(n10)), n10;
        }
        computeChunkBounds(e10) {
          return ns(this, e10);
        }
        async withErrorMessage(e10, t10) {
          return e10.catch(async (e11) => {
            if (e11 instanceof ry.oo && e11.response) {
              let r10 = await ib(e11);
              throw Error(`[${e11.response.status}] ${t10}${r10 ?? ""}`);
            }
            throw e11;
          });
        }
      }
      i7 = i6([F()], i7);
      let se = eB.R3.create(), st = eB.R3.create(), sr = eB.R3.create();
      class sn extends rn(tp(ey(e_))) {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "source");
          __publicField(this, "localPosition");
          __publicField(this, "leafRequestsActive");
          __publicField(this, "nBitsForLayerId");
          __publicField(this, "debouncedupdateDisplayState", (0, e4.Z)(() => {
            this.updateDisplayState();
          }, 100));
          this.source = this.registerDisposer(e10.getRef(t10.source)), this.localPosition = e10.get(t10.localPosition), this.leafRequestsActive = e10.get(t10.leafRequestsActive), this.nBitsForLayerId = e10.get(t10.nBitsForLayerId), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
            this.updateChunkPriorities(), this.debouncedupdateDisplayState();
          }));
        }
        attach(e10) {
          let t10 = () => this.chunkManager.scheduleUpdateChunkPriorities(), { view: r10 } = e10;
          e10.registerDisposer(t10), e10.registerDisposer(r10.projectionParameters.changed.add(t10)), e10.registerDisposer(r10.visibility.changed.add(t10)), e10.state = { displayDimensionRenderInfo: r10.projectionParameters.value.displayDimensionRenderInfo };
        }
        get renderRatioLimit() {
          return 5;
        }
        updateChunkPriorities() {
          let { source: e10, chunkManager: t10 } = this;
          for (let r10 of (t10.registerLayer(this), this.attachments.values())) {
            let { view: n10 } = r10, i10 = n10.visibility.value;
            if (i10 === Number.NEGATIVE_INFINITY) continue;
            let { transformedSource: s10 } = r10.state, a10 = n10.projectionParameters.value;
            if (!s10) continue;
            let o10 = 1.1 * a10.pixelSize, l2 = s10.effectiveVoxelSize;
            if (this.leafRequestsActive.value = this.renderRatioLimit >= o10 / Math.min(...l2), !this.leafRequestsActive.value) continue;
            let u2 = tm(i10), h2 = ty(i10), { chunkLayout: c2 } = s10, { size: d2, finiteRank: f2 } = c2;
            eB.R3.copy(sr, d2);
            for (let e11 = f2; e11 < 3; ++e11) sr[e11] = 0, st[e11] = 0;
            let { centerDataPosition: g2 } = a10;
            c2.globalToLocalSpatial(st, g2), td(a10, this.localPosition.value, s10, tf(a10, c2), (r11) => {
              eB.R3.multiply(se, r11, sr);
              let n11 = -eB.R3.distance(st, se), { curPositionInChunks: i11 } = s10;
              rt(this, (r12, s11) => {
                if (iv(r12, this.nBitsForLayerId.value)) return;
                let a11 = e10.getChunk(i11, r12);
                t10.requestChunk(a11, u2, h2 + n11, q.SYSTEM_MEMORY_WORKER), ++this.numVisibleChunksNeeded, a11.state === q.GPU_MEMORY && ++this.numVisibleChunksAvailable;
              });
            });
          }
        }
        forEachSelectedRootWithLeaves(e10) {
          let { source: t10 } = this;
          for (let r10 of t10.chunks.values()) r10.state === q.SYSTEM_MEMORY_WORKER && r10.priorityTier < Y.RECENT && this.visibleSegments.has(r10.segment) && r10.leaves.length && e10(r10.segment, r10.leaves);
        }
        updateDisplayState() {
          let e10 = /* @__PURE__ */ new Map(), t10 = /* @__PURE__ */ new Map();
          for (let [r10, n10] of (this.forEachSelectedRootWithLeaves((e11, r11) => {
            t10.set(e11, (t10.get(e11) ?? 0) + r11.length);
          }), this.forEachSelectedRootWithLeaves((r11, n11) => {
            e10.has(r11) || (e10.set(r11, new t6()), e10.get(r11).reserve(t10.get(r11)), e10.get(r11).add(r11)), e10.get(r11).add(n11);
          }), e10)) for (let e11 of [...n10].filter((e12) => !this.segmentEquivalences.has(e12))) this.segmentEquivalences.link(r10, e11);
        }
      }
      sn = i6([F("ChunkedGraphLayer")], sn), U("ChunkedGraphLayer:updateSources", function(e10) {
        let t10 = this.get(e10.view), r10 = this.get(e10.layer), n10 = r10.attachments.get(t10);
        n10.state.transformedSource = tM(this, e10.sources, r10)[0][0], n10.state.displayDimensionRenderInfo = e10.displayDimensionRenderInfo, r10.chunkManager.scheduleUpdateChunkPriorities();
      }), U("GrapheneMeshSource:NewSegment", function(e10) {
        this.get(e10.rpcId).addNewSegment(e10.segment);
      });
      let si = { id: "decodeBlosc" }, ss = { id: "decodeZstd" };
      var sa = r2(835);
      async function so(e10, t10, r10, n10) {
        let i10 = new DataView(r10), s10 = i10.getUint16(0, false);
        if (0 !== s10) throw Error(`Unsupported mode: ${s10}.`);
        let a10 = i10.getUint16(2, false);
        if (a10 !== e10.source.spec.rank) throw Error("Number of dimensions must be 3.");
        let o10 = 4, l2 = new Uint32Array(a10);
        for (let e11 = 0; e11 < a10; ++e11) l2[e11] = i10.getUint32(o10, false), o10 += 4;
        e10.chunkDataSize = l2;
        let u2 = new Uint8Array(r10, o10);
        switch (n10) {
          case sa.k.ZLIB:
            u2 = new Uint8Array(await (0, r7.lL)(u2, "deflate"));
            break;
          case sa.k.GZIP:
            u2 = new Uint8Array(await (0, r7.lL)(u2, "gzip"));
            break;
          case sa.k.BLOSC:
            u2 = await r5(si, t10, [u2.buffer], u2);
            break;
          case sa.k.ZSTD:
            u2 = await r5(ss, t10, [u2.buffer], u2);
        }
        await nA(e10, t10, u2.buffer, rS.BIG, u2.byteOffset, u2.byteLength);
      }
      class sl extends em(eP(na), sa.Y) {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkKvStore", this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url));
        }
        async download(e10, t10) {
          let { parameters: r10, chunkKvStore: n10 } = this, { chunkGridPosition: i10 } = e10, s10 = n10.path, a10 = this.spec.rank;
          for (let e11 = 0; e11 < a10; ++e11) 0 !== e11 && (s10 += "/"), s10 += `${i10[e11]}`;
          let o10 = await n10.store.read(s10, { signal: t10 });
          void 0 !== o10 && await so(e10, t10, await o10.response.arrayBuffer(), r10.encoding);
        }
      }
      sl = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F()], sl);
      var su = r2(8551), sh = r2(2147), sc = r2(3853);
      class sd {
        constructor() {
          __publicField(this, "uncompressedData");
          __publicField(this, "header");
        }
      }
      async function sf(e10, t10) {
        let r10 = await e10.response.arrayBuffer();
        (0, su.isCompressed)(r10) && (r10 = await (0, r7.lL)(r10, "gzip", t10.signal));
        let n10 = new sd();
        n10.uncompressedData = r10;
        let i10 = (0, su.readHeader)(r10);
        if (null === i10) throw Error("Failed to parse NIFTI header.");
        return n10.header = i10, { data: n10, size: r10.byteLength };
      }
      async function sg(e10, t10, r10) {
        return (await ix(e10, t10, sf, r10)).header;
      }
      var sp = ((m = sp || {})[m.NONE = 0] = "NONE", m[m.BINARY = 1] = "BINARY", m[m.UINT8 = 2] = "UINT8", m[m.INT16 = 4] = "INT16", m[m.INT32 = 8] = "INT32", m[m.FLOAT32 = 16] = "FLOAT32", m[m.COMPLEX64 = 32] = "COMPLEX64", m[m.FLOAT64 = 64] = "FLOAT64", m[m.RGB24 = 128] = "RGB24", m[m.INT8 = 256] = "INT8", m[m.UINT16 = 512] = "UINT16", m[m.UINT32 = 768] = "UINT32", m[m.INT64 = 1024] = "INT64", m[m.UINT64 = 1280] = "UINT64", m[m.FLOAT128 = 1536] = "FLOAT128", m[m.COMPLEX128 = 1792] = "COMPLEX128", m[m.COMPLEX256 = 2048] = "COMPLEX256", m);
      let sm = /* @__PURE__ */ new Map([[256, { dataType: e9.INT8 }], [2, { dataType: e9.UINT8 }], [4, { dataType: e9.INT16 }], [512, { dataType: e9.UINT16 }], [8, { dataType: e9.INT32 }], [768, { dataType: e9.UINT32 }], [1024, { dataType: e9.UINT64 }], [1280, { dataType: e9.UINT64 }], [16, { dataType: e9.FLOAT32 }]]);
      A(sh._, async function(e10, t10) {
        var r10;
        let n10 = this.get(e10.sharedKvStoreContext), i10 = await sg(n10, e10.url, t10), s10 = sm.get(i10.datatypeCode);
        if (void 0 === s10) throw Error(`Unsupported data type: ${sp[i10.datatypeCode] || i10.datatypeCode}.`);
        let a10 = 1, o10 = "";
        switch (i10.xyzt_units & su.NIFTI1.SPATIAL_UNITS_MASK) {
          case su.NIFTI1.UNITS_METER:
            a10 = 1, o10 = "m";
            break;
          case su.NIFTI1.UNITS_MM:
            a10 = 1e3, o10 = "m";
            break;
          case su.NIFTI1.UNITS_MICRON:
            a10 = 1e6, o10 = "m";
        }
        let l2 = "", u2 = 1;
        switch (i10.xyzt_units & su.NIFTI1.TEMPORAL_UNITS_MASK) {
          case su.NIFTI1.UNITS_SEC:
            l2 = "s", u2 = 1;
            break;
          case su.NIFTI1.UNITS_MSEC:
            l2 = "s", u2 = 1e3;
            break;
          case su.NIFTI1.UNITS_USEC:
            l2 = "s", u2 = 1e6;
            break;
          case su.NIFTI1.UNITS_HZ:
            l2 = "Hz", u2 = 1;
            break;
          case su.NIFTI1.UNITS_RADS:
            l2 = "rad/s", u2 = 1;
        }
        let h2 = [o10, o10, o10, l2, "", "", ""], c2 = Float64Array.of(i10.pixDims[1] / a10, i10.pixDims[2] / a10, i10.pixDims[3] / a10, i10.pixDims[4] / u2, i10.pixDims[5], i10.pixDims[6], i10.pixDims[7]), d2 = Float64Array.of(1 / a10, 1 / a10, 1 / a10, 1 / u2, 1, 1, 1), f2 = ["i", "j", "k", "m", "c^", "c1^", "c2^"], g2 = ["x", "y", "z", "t", "c^", "c1^", "c2^"], p2 = i10.dims[0];
        f2 = f2.slice(0, p2), g2 = g2.slice(0, p2), h2 = h2.slice(0, p2), c2 = c2.slice(0, p2), d2 = d2.slice(0, p2);
        let { quatern_b: m2, quatern_c: y2, quatern_d: v2 } = i10, b2 = Math.sqrt(1 - m2 * m2 - y2 * y2 - v2 * v2), w2 = -1 === i10.pixDims[0] ? -1 : 1, S2 = eB.R3.fromValues(i10.qoffset_x, i10.qoffset_y, i10.qoffset_z);
        r10 = i10.affine, eB._E.fromValues(r10[0][0], r10[1][0], r10[2][0], r10[3][0], r10[0][1], r10[1][1], r10[2][1], r10[3][1], r10[0][2], r10[1][2], r10[2][2], r10[3][2], r10[0][3], r10[1][3], r10[2][3], r10[3][3]);
        let E2 = (0, eB.Fi)(eB._E.create(), S2, eB.gf.fromValues(m2, y2, v2, b2), eB.rn, w2), k2 = sc.XD(Float64Array, p2 + 1), I2 = Math.min(3, p2);
        for (let e11 = 0; e11 < I2; ++e11) {
          for (let t11 = 0; t11 < I2; ++t11) k2[t11 * (p2 + 1) + e11] = E2[4 * t11 + e11];
          k2[p2 * (p2 + 1) + e11] = E2[12 + e11];
        }
        return { value: { rank: p2, sourceNames: f2, viewNames: g2, units: h2, sourceScales: c2, viewScales: d2, description: i10.description, transform: k2, dataType: s10.dataType, volumeSize: Uint32Array.from(i10.dims.slice(1, 1 + p2)) } };
      });
      class sy extends em(eP(na), sh.L) {
        async download(e10, t10) {
          var r10;
          e10.chunkDataSize = this.spec.chunkDataSize;
          let n10 = await (r10 = this.sharedKvStoreContext, ix(r10, this.parameters.url, sf, { signal: t10 })), i10 = (0, su.readImage)(n10.header, n10.uncompressedData);
          await nA(e10, t10, i10, n10.header.littleEndian ? rS.LITTLE : rS.BIG);
        }
      }
      sy = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F()], sy);
      let sv = { id: "parseOBJFromArrayBuffer" };
      var sb = r2(8956);
      function sw(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }
      class sS extends er {
        constructor() {
          super(...arguments);
          __publicField(this, "data", null);
        }
        freeSystemMemory() {
          this.data = null;
        }
        serialize(e10, t10) {
          super.serialize(e10, t10);
          let { vertexPositions: r10, indices: n10, vertexNormals: i10, vertexAttributes: s10 } = this.data;
          e10.vertexPositions = r10, e10.indices = n10, e10.vertexNormals = i10, e10.vertexAttributes = s10;
          let a10 = /* @__PURE__ */ new Set();
          for (let e11 of (a10.add(r10.buffer), a10.add(n10.buffer), a10.add(i10.buffer), s10)) a10.add(e11.buffer);
          t10.push(...a10), this.data = null;
        }
        downloadSucceeded() {
          let { vertexPositions: e10, indices: t10, vertexNormals: r10, vertexAttributes: n10 } = this.data, i10 = this.gpuMemoryBytes = e10.byteLength + t10.byteLength + r10.byteLength;
          for (let e11 of n10) i10 += e11.byteLength;
          this.systemMemoryBytes = this.gpuMemoryBytes = i10, super.downloadSucceeded();
        }
      }
      let sE = /* @__PURE__ */ new Map(), sk = /^(?:([a-zA-Z-+_]+):\/\/)?(.*)$/;
      function sI(e10, t10, r10) {
        return function(e11, t11, r11) {
          let [n10, i10] = function(e12, t12) {
            let r12 = t12.match(sk);
            if (null === r12 || void 0 === r12[1]) throw Error('Data source URL must have the form "<protocol>://<path>".');
            let n11 = r12[1], i11 = e12.get(n11);
            if (void 0 === i11) throw Error(`Unsupported data source: ${JSON.stringify(n11)}.`);
            return [i11, r12[2], n11];
          }(sE, t11);
          return n10.getMesh(e11, i10, r11);
        }(e10, t10.meshSourceUrl, r10);
      }
      class sM extends em(eP(es), sb.J6) {
        getChunk() {
          let e10 = sb.Sk, t10 = this.chunks.get(e10);
          return void 0 === t10 && ((t10 = this.getNewChunk_(sS)).initialize(e10), this.addChunk(t10)), t10;
        }
        async download(e10, t10) {
          let r10 = await sI(this.sharedKvStoreContext, this.parameters, { signal: t10 });
          if ((0, ej.hd)(r10.info) !== (0, ej.hd)(this.parameters.info)) throw Error("Mesh info has changed.");
          void 0 === r10.vertexNormals && (r10.vertexNormals = rA(r10.vertexPositions, r10.indices)), e10.data = r10;
        }
      }
      sM = sw([F()], sM);
      let sx = tp(ey(B));
      class sT extends sx {
        constructor(e10, t10) {
          super(e10, t10);
          __publicField(this, "source");
          this.source = this.registerDisposer(e10.getRef(t10.source)), this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
            this.updateChunkPriorities();
          }));
        }
        updateChunkPriorities() {
          let e10 = this.visibility.value;
          if (e10 === Number.NEGATIVE_INFINITY) return;
          let t10 = tm(e10), r10 = ty(e10), { source: n10, chunkManager: i10 } = this, s10 = n10.getChunk();
          i10.requestChunk(s10, t10, r10 + 50);
        }
      }
      async function sC(e10, t10) {
        let r10 = await e10.response.arrayBuffer();
        return r5(sv, t10.signal, [r10], r10);
      }
      sT = sw([F(sb.V4)], sT), A(sb.Wl, async function(e10, t10) {
        let r10 = this.get(e10.sharedKvStoreContext), n10 = e10.parameters;
        return { value: (await sI(r10, n10, t10)).info };
      }), y = { description: "OBJ", getMesh: (e10, t10, r10) => ix(e10, t10, sC, r10) }, sE.set("obj", y);
      var sN = r2(3074);
      let s$ = /* @__PURE__ */ new Map();
      s$.set("jpg", async (e10, t10, r10) => {
        let n10 = e10.chunkDataSize, { uint8Array: i10 } = await r5(nn, t10, [r10], new Uint8Array(r10), void 0, void 0, n10[0] * n10[1] * n10[2], 3, true);
        await r9(e10, t10, i10);
      }), s$.set("raw16", (e10, t10, r10) => nA(e10, t10, r10, rS.BIG));
      class sR extends em(na, sN.xd) {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkDecoder", s$.get(this.parameters.encoding));
          __publicField(this, "queryString", (() => {
            let { parameters: e10 } = this, t10 = [];
            return void 0 !== e10.channel && t10.push("channels=" + e10.channel), void 0 !== e10.minIntensity && t10.push(`minIntensity=${JSON.stringify(e10.minIntensity)}`), void 0 !== e10.maxIntensity && t10.push(`maxIntensity=${JSON.stringify(e10.maxIntensity)}`), void 0 !== e10.maxTileSpecsToRender && t10.push(`maxTileSpecsToRender=${JSON.stringify(e10.maxTileSpecsToRender)}`), void 0 !== e10.filter && t10.push(`filter=${JSON.stringify(e10.filter)}`), t10.join("&");
          })());
        }
        async download(e10, t10) {
          let r10;
          let { parameters: n10 } = this, { chunkGridPosition: i10 } = e10, s10 = 1 / 2 ** n10.level;
          e10.chunkDataSize = this.spec.chunkDataSize;
          let a10 = e10.chunkDataSize[0] * 2 ** n10.level, o10 = e10.chunkDataSize[1] * 2 ** n10.level, l2 = eB.R3.create();
          l2[0] = i10[0] * a10, l2[1] = i10[1] * o10, l2[2] = i10[2], r10 = "raw16" === n10.encoding ? "raw16-image" : "jpeg-image";
          let u2 = `/render-ws/v1/owner/${n10.owner}/project/${n10.project}/stack/${n10.stack}/z/${l2[2]}/box/${l2[0]},${l2[1]},${a10},${o10},${s10}/${r10}`, h2 = await (0, ry.ru)(`${n10.baseUrl}${u2}?${this.queryString}`, { signal: t10 });
          await this.chunkDecoder(e10, t10, await h2.arrayBuffer());
        }
      }
      sR = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F()], sR);
      let sP = { id: "parseVTKFromArrayBuffer" };
      async function sO(e10, t10) {
        let r10 = await e10.response.arrayBuffer();
        return r5(sP, t10.signal, [r10], r10);
      }
      v = { description: "VTK", getMesh: async (e10, t10, r10) => {
        let n10 = await ix(e10, t10, sO, r10), i10 = { info: { numTriangles: n10.numTriangles, numVertices: n10.numVertices, vertexAttributes: [] }, indices: n10.indices, vertexPositions: n10.vertexPositions, vertexAttributes: [] };
        for (let e11 of n10.vertexAttributes) i10.info.vertexAttributes.push({ name: e11.name, dataType: e9.FLOAT32, numComponents: e11.numComponents }), i10.vertexAttributes.push(e11.data);
        return i10;
      } }, sE.set("vtk", v);
      var sU = r2(6363);
      let s_ = { [sU.i.arrayToArray]: /* @__PURE__ */ new Map(), [sU.i.arrayToBytes]: /* @__PURE__ */ new Map(), [sU.i.bytesToBytes]: /* @__PURE__ */ new Map(), sharding: /* @__PURE__ */ new Map() };
      function sA(e10) {
        e10.kind === sU.i.arrayToBytes && "getShardedKvStore" in e10 ? s_.sharding.set(e10.name, e10) : s_[e10.kind].set(e10.name, e10);
      }
      async function sL(e10, t10, r10) {
        let n10;
        let i10 = e10[sU.i.bytesToBytes];
        for (let e11 = i10.length; e11--; ) {
          let n11 = i10[e11], s11 = s_[sU.i.bytesToBytes].get(n11.name);
          if (void 0 === s11) throw Error(`Unsupported codec: ${JSON.stringify(n11.name)}`);
          t10 = await s11.decode(n11.configuration, t10, r10);
        }
        {
          let i11 = e10[sU.i.arrayToBytes], s11 = s_[sU.i.arrayToBytes].get(i11.name);
          if (void 0 === s11) throw Error(`Unsupported codec: ${JSON.stringify(i11.name)}`);
          n10 = await s11.decode(i11.configuration, e10.arrayInfo[e10.arrayInfo.length - 1], t10, r10);
        }
        let s10 = e10[sU.i.arrayToArray];
        for (let t11 = s10.length; t11--; ) {
          let i11 = s10[t11], a10 = s_[sU.i.arrayToArray].get(i11.name);
          if (void 0 === a10) throw Error(`Unsupported codec: ${JSON.stringify(i11.name)}`);
          n10 = await a10.decode(i11.configuration, e10.arrayInfo[t11], n10, r10);
        }
        return n10;
      }
      sA({ name: "blosc", kind: sU.i.bytesToBytes, decode: (e10, t10, r10) => r5(si, r10, [t10.buffer], t10) }), sA({ name: "zstd", kind: sU.i.bytesToBytes, decode: (e10, t10, r10) => r5(ss, r10, [t10.buffer], t10) }), sA({ name: "bytes", kind: sU.i.arrayToBytes, async decode(e10, t10, r10, n10) {
        let { dataType: i10, chunkShape: s10 } = t10, a10 = s10.reduce((e11, t11) => e11 * t11, 1), o10 = e7[i10], l2 = a10 * o10;
        if (r10.byteLength !== l2) throw Error(`Raw-format chunk is ${r10.byteLength} bytes, but ${a10} * ${o10} = ${l2} bytes are expected.`);
        let u2 = tt(i10, r10.buffer, r10.byteOffset, r10.byteLength);
        return rT(u2, e10.endian, o10), u2;
      } }), sA({ name: "crc32c", kind: sU.i.bytesToBytes, async decode(e10, t10, r10) {
        if (t10.length < 4) throw Error(`Expected buffer of size at least 4 bytes but received: ${t10.length} bytes`);
        return t10.subarray(0, t10.length - 4);
      } });
      var sD = r2(6758);
      for (let [e10, t10] of [["gzip", "gzip"], ["zlib", "deflate"]]) sA({ name: e10, kind: sU.i.bytesToBytes, decode: async (e11, r10, n10) => new Uint8Array(await (0, r7.lL)(r10, t10, n10)) });
      function sz(e10) {
        let { name: t10, configuration: r10 } = function(e11, t11, r11) {
          (0, ej.PT)(e11);
          let n10 = (0, ej.uq)(e11, "name", (e12) => t11((0, ej.ZE)(e12))), i10 = (0, ej.uq)(e11, "configuration", (e12) => (void 0 === e12 ? e12 = {} : (0, ej.PT)(e12), r11(e12, n10)));
          return { name: n10, configuration: i10 };
        }(e10, (e11) => {
          let t11 = sB.get(e11);
          if (void 0 === t11) throw Error(`Unknown codec: ${JSON.stringify(e11)}`);
          return t11;
        }, (e11) => e11);
        return { resolver: t10, configuration: r10 };
      }
      let sB = /* @__PURE__ */ new Map();
      function sj(e10, t10) {
        let r10 = [], n10 = [], i10 = [], s10 = [];
        n10.push(t10);
        let a10 = (0, ej.m7)(e10, sz), o10 = a10.length, l2 = 0;
        for (; l2 < o10; ++l2) {
          let { resolver: e11, configuration: i11 } = a10[l2];
          if (e11.kind !== sU.i.arrayToArray) break;
          let { configuration: s11, encodedArrayInfo: o11 } = e11.resolve(i11, t10);
          n10.push(o11), t10 = o11, r10.push({ kind: sU.i.arrayToArray, name: e11.name, configuration: s11 });
        }
        if (l2 === o10 || a10[l2].resolver.kind !== sU.i.arrayToBytes) throw Error("Missing array -> bytes codec");
        let { codecSpec: u2, layoutInfo: h2, encodedSize: c2, shardingInfo: d2 } = (() => {
          let { resolver: e11, configuration: r11 } = a10[l2], { configuration: n11, shardingInfo: i11, encodedSize: s11 } = e11.resolve(r11, t10);
          if (void 0 !== i11 && l2 + 1 !== o10) throw Error("bytes -> bytes codecs not supported following sharding codec");
          let u3 = e11.getDecodedArrayLayoutInfo(n11, t10);
          return { codecSpec: { name: e11.name, kind: sU.i.arrayToBytes, configuration: n11 }, layoutInfo: u3, encodedSize: s11, shardingInfo: i11 };
        })();
        i10[l2] = h2, s10.push(c2);
        let f2 = [];
        for (++l2; l2 < o10; ) {
          let { resolver: e11, configuration: t11 } = a10[l2];
          if (e11.kind !== sU.i.bytesToBytes) throw Error(`Expected bytes -> bytes codec, but received ${JSON.stringify(e11.name)} of kind ${sU.i[e11.kind]}`);
          let { configuration: r11, encodedSize: n11 } = e11.resolve(t11, c2);
          f2.push({ name: e11.name, kind: e11.kind, configuration: r11 }), s10.push(n11), ++l2;
        }
        for (let e11 = r10.length - 1; e11 >= 0; --e11) i10[e11] = a10[e11].resolver.getDecodedArrayLayoutInfo(r10[e11].configuration, n10[e11], i10[e11 + 1]);
        return { [sU.i.arrayToArray]: r10, [sU.i.arrayToBytes]: u2, [sU.i.bytesToBytes]: f2, arrayInfo: n10, layoutInfo: i10, shardingInfo: d2, encodedSize: s10 };
      }
      let sF = /* @__PURE__ */ new Map([["", { unit: "", scale: 1 }], ["angstrom", { unit: "m", scale: 1e-10 }], ["foot", { unit: "m", scale: 0.3048 }], ["inch", { unit: "m", scale: 0.0254 }], ["mile", { unit: "m", scale: 1609.34 }], ["parsec", { unit: "m", scale: 30856775814913670 }], ["yard", { unit: "m", scale: 0.9144 }], ["minute", { unit: "s", scale: 60 }], ["hour", { unit: "s", scale: 3600 }], ["day", { unit: "s", scale: 86400 }]]);
      for (let e10 of ["meter", "second"]) for (let t10 of eF) {
        let { longPrefix: r10, prefix: n10 } = t10;
        if (void 0 === r10) continue;
        let i10 = { unit: e10[0], scale: 10 ** t10.exponent };
        sF.set(`${r10}${e10}`, i10), sF.set(`${n10}${e10[0]}`, i10);
      }
      var sV = ((b = {})[b.START = 0] = "START", b[b.END = 1] = "END", b);
      w = { name: "sharding_indexed", kind: sU.i.arrayToBytes, resolve(e10, t10) {
        (0, ej.PT)(e10);
        let r10 = (0, ej.uq)(e10, "chunk_shape", (e11) => {
          var r11;
          return r11 = t10.chunkShape.length, (0, ej.Iw)(Array(r11), e11, (e12) => {
            if ("number" != typeof e12 || !Number.isInteger(e12) || e12 <= 0) throw Error(`Expected positive integer, but received: ${JSON.stringify(e12)}`);
            return e12;
          });
        }), n10 = (0, ej.Kh)(e10, "index_location", (e11) => (0, ej.CT)(e11, sV, /^[a-z]+$/), 1), i10 = Array.from(t10.chunkShape, (e11, n11) => {
          let i11 = r10[n11];
          if (e11 % i11 != 0) throw Error(`sub-chunk shape of ${JSON.stringify(i11)} does not evenly divide outer chunk shape of ${JSON.stringify(t10.chunkShape)}`);
          return e11 / i11;
        }), s10 = Array.from(i10);
        s10.push(2);
        let a10 = (0, ej.uq)(e10, "index_codecs", (e11) => sj(e11, { dataType: e9.UINT64, chunkShape: s10 }));
        if (void 0 === a10.encodedSize[a10.encodedSize.length - 1]) throw Error("index_codecs must specify fixed-size encoding");
        let o10 = (0, ej.uq)(e10, "codecs", (e11) => sj(e11, { dataType: t10.dataType, chunkShape: r10 }));
        return { configuration: { indexCodecs: a10, subChunkCodecs: o10, subChunkShape: r10, subChunkGridShape: i10, indexLocation: n10 }, shardingInfo: { subChunkShape: r10, subChunkGridShape: i10, subChunkCodecs: o10 } };
      }, getDecodedArrayLayoutInfo: (e10, t10) => e10.subChunkCodecs.layoutInfo[0] }, sB.set(w.name, w);
      let sG = BigInt("18446744073709551615");
      class sK extends M.gj {
        constructor(e10, t10, r10) {
          super();
          __publicField(this, "configuration");
          __publicField(this, "base");
          __publicField(this, "indexCache");
          __publicField(this, "indexStrides");
          this.configuration = e10, this.base = r10, this.indexCache = this.registerDisposer(new iM(t10.addRef(), { get: async (t11, n11) => {
            let i11;
            let { indexCodecs: s11 } = e10, a11 = s11.encodedSize[s11.encodedSize.length - 1];
            switch (e10.indexLocation) {
              case sV.START:
                i11 = { offset: 0, length: a11 };
                break;
              case sV.END:
                i11 = { suffixLength: a11 };
            }
            let o11 = await r10.read(t11, { ...n11, byteRange: i11 });
            if (void 0 === o11) return { size: 0, data: void 0 };
            let l2 = await sL(e10.indexCodecs, new Uint8Array(await o11.response.arrayBuffer()), n11.signal);
            return { size: l2.byteLength, data: new BigUint64Array(l2.buffer, l2.byteOffset, l2.byteLength / 8) };
          } }));
          let { subChunkGridShape: n10 } = this.configuration, i10 = n10.length, s10 = this.configuration.indexCodecs.layoutInfo[0].physicalToLogicalDimension, a10 = this.indexStrides = Array(i10 + 1), o10 = 1;
          for (let e11 = i10; e11 >= 0; --e11) {
            let t11 = s10[e11];
            a10[t11] = o10, o10 *= t11 === i10 ? 2 : n10[t11];
          }
        }
        async findKey(e10, t10) {
          let r10 = await this.indexCache.get(e10.base, t10);
          if (void 0 === r10) return;
          let n10 = this.configuration.subChunkShape.length, { subChunk: i10 } = e10, { indexStrides: s10 } = this, a10 = 0;
          for (let e11 = 0; e11 < n10; ++e11) a10 += i10[e11] * s10[e11];
          let o10 = r10[a10], l2 = r10[a10 + s10[n10]];
          if (o10 !== sG || l2 !== sG) return { offset: Number(o10), length: Number(l2) };
        }
        async stat(e10, t10) {
          let r10 = await this.findKey(e10, t10);
          if (void 0 !== r10) return { totalSize: r10.length };
        }
        async read(e10, t10) {
          let r10 = await this.findKey(e10, t10);
          if (void 0 !== r10) return new iT.uX(new iN.f2(this.base, e10.base), r10).read(t10);
        }
        getUrl(e10) {
          return `subchunk ${JSON.stringify(e10.subChunk)} within shard ${this.base.getUrl(e10.base)}`;
        }
        get supportsOffsetReads() {
          return true;
        }
        get supportsSuffixReads() {
          return true;
        }
      }
      sA({ name: "sharding_indexed", kind: sU.i.arrayToBytes, getShardedKvStore: (e10, t10, r10) => new sK(e10, t10, r10) }), sA({ name: "transpose", kind: sU.i.arrayToArray, decode: async (e10, t10, r10, n10) => r10 });
      var sq = r2(6252);
      class sY extends em(eP(na), sD.Y) {
        constructor() {
          super(...arguments);
          __publicField(this, "chunkKvStore", function(e10, t10, r10) {
            let n10 = r10.store, i10 = t10;
            for (; ; ) {
              let { shardingInfo: t11 } = i10;
              if (void 0 === t11) break;
              let r11 = i10[sU.i.arrayToBytes], s11 = s_.sharding.get(r11.name);
              if (void 0 === s11) throw Error(`Unsupported codec: ${JSON.stringify(r11.name)}`);
              n10 = s11.getShardedKvStore(r11.configuration, e10, n10), i10 = t11.subChunkCodecs;
            }
            let s10 = i10, a10 = r10.path;
            return { kvStore: n10, getChunkKey: function(e11, r11) {
              let n11 = a10 + r11, i11 = e11.length, s11 = t10;
              for (; void 0 !== s11.shardingInfo; ) {
                let { physicalToLogicalDimension: r12, readChunkShape: a11 } = t10.layoutInfo[t10.layoutInfo.length - 1], { subChunkShape: o10, subChunkGridShape: l2, subChunkCodecs: u2 } = s11.shardingInfo, h2 = Array(i11);
                for (let t11 = 0; t11 < i11; ++t11) {
                  let n12 = r12[i11 - 1 - t11];
                  h2[n12] = Math.floor(e11[t11] * a11[n12] / o10[n12]) % l2[n12];
                }
                n11 = { base: n11, subChunk: h2 }, s11 = u2;
              }
              return n11;
            }, decodeCodecs: s10 };
          }(this.chunkManager, this.parameters.metadata.codecs, this.sharedKvStoreContext.kvStoreContext.getKvStore(this.parameters.url)));
        }
        async download(e10, t10) {
          let r10;
          e10.chunkDataSize = this.spec.chunkDataSize;
          let { parameters: n10 } = this, { chunkGridPosition: i10 } = e10, { metadata: s10 } = n10, a10 = "", o10 = this.spec.rank, { physicalToLogicalDimension: l2 } = s10.codecs.layoutInfo[0];
          s10.chunkKeyEncoding === sq.$.DEFAULT ? (a10 += "c", r10 = s10.dimensionSeparator) : (r10 = "", 0 === o10 && (a10 += "0"));
          let u2 = Array(o10), { readChunkShape: h2 } = s10.codecs.layoutInfo[0], { chunkShape: c2 } = s10;
          for (let e11 = 0; e11 < o10; ++e11) {
            let t11 = l2[o10 - 1 - e11];
            u2[t11] = Math.floor(i10[e11] * h2[t11] / c2[t11]);
          }
          for (let e11 = 0; e11 < o10; ++e11) a10 += `${r10}${u2[e11]}`, r10 = s10.dimensionSeparator;
          let { chunkKvStore: d2 } = this, f2 = await d2.kvStore.read(d2.getChunkKey(i10, a10), { signal: t10 });
          if (void 0 !== f2) {
            let r11 = await sL(d2.decodeCodecs, new Uint8Array(await f2.response.arrayBuffer()), t10);
            await r9(e10, t10, r11);
          }
        }
      }
      function sJ(e10, t10, r10) {
        return e10.rpc.promiseInvoke(eN.Bg, { sharedKvStoreContext: e10.rpcId, url: t10 }, { signal: r10.signal, progressListener: r10.progressListener });
      }
      sY = function(e10, t10, r10, n10) {
        var i10, s10 = arguments.length, a10 = s10 < 3 ? t10 : null === n10 ? n10 = Object.getOwnPropertyDescriptor(t10, r10) : n10;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a10 = Reflect.decorate(e10, t10, r10, n10);
        else for (var o10 = e10.length - 1; o10 >= 0; o10--) (i10 = e10[o10]) && (a10 = (s10 < 3 ? i10(a10) : s10 > 3 ? i10(t10, r10, a10) : i10(t10, r10)) || a10);
        return s10 > 3 && a10 && Object.defineProperty(t10, r10, a10), a10;
      }([F()], sY), r2(7439), r2(2298), r2(8679), A(eN.md, async function(e10, t10) {
        let r10 = this.get(e10.sharedKvStoreContext);
        return { value: await r10.kvStoreContext.stat(e10.url, t10) };
      }), A(eN.cn, async function(e10, t10) {
        let r10 = this.get(e10.sharedKvStoreContext), n10 = await r10.kvStoreContext.read(e10.url, { ...t10, byteRange: e10.byteRange, throwIfMissing: e10.throwIfMissing });
        if (void 0 === n10) return { value: void 0 };
        let i10 = await n10.response.arrayBuffer();
        return { value: { data: i10, offset: n10.offset, totalSize: n10.totalSize }, transfers: [i10] };
      }), A(eN.Bg, async function(e10, t10) {
        let { store: r10, path: n10 } = this.get(e10.sharedKvStoreContext).kvStoreContext.getKvStore(e10.url);
        return { value: await r10.list(n10, t10) };
      }), A(eN.aJ, async function(e10, t10) {
        let r10;
        let { kvStoreContext: n10 } = this.get(e10.sharedKvStoreContext), { url: i10 } = e10, s10 = (0, ip.kw)(i10);
        if (s10 === i10) {
          let e11 = (0, ip.mq)(s10), i11 = n10.getBaseKvStoreProvider(e11);
          void 0 !== i11.completeUrl && (r10 = await i11.completeUrl({ url: e11, ...t10 }));
        } else {
          let e11 = (0, ip.mq)(s10), a10 = n10.getKvStoreAdapterProvider(e11), o10 = i10.slice(0, i10.length - s10.length - 1), l2 = n10.getKvStore(o10);
          void 0 !== a10.completeUrl && (r10 = await a10.completeUrl({ url: e11, base: l2, ...t10 }));
        }
        return { value: r10 };
      });
      class sW extends ig.Z {
        list(e10, t10) {
          return sJ(this.sharedKvStoreContext, this.getUrl(e10), t10);
        }
      }
      (0, ig.X)(eR, sW);
      var sZ = r2(8779), sX = r2(9749);
      let sQ = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
      function sH(e10) {
        let t10 = e10.length, r10 = 0, n10 = "", i10 = 0;
        for (let s10 = 0; s10 < t10; ++s10) for (r10 = r10 << 8 | e10[s10], i10 += 8; i10 >= 5; i10 -= 5) n10 += sQ[r10 >>> i10 - 5 & 31];
        return i10 > 0 && (n10 += sQ[r10 << 5 - i10 & 31]), n10;
      }
      let s0 = Uint8Array.of(73, 67, 69, 240, 159, 167, 138, 67, 72, 85, 78, 75), s1 = s0.length + 24 + 1 + 1 + 1;
      async function s2(e10, t10, r10, n10) {
        if (e10.byteLength < s1) throw Error(`Expected icechunk header of ${s1} bytes, but received: ${e10.byteLength} bytes`);
        let i10 = new DataView(e10), s10 = 0;
        for (let t11 = 0, r11 = s0.length; t11 < r11; ++t11) if (i10.getUint8(t11) !== s0[t11]) throw Error(`Expected magic bytes of ${s0.join()} but received: ${new Uint8Array(e10, 0, r11).join()}`);
        s10 += s0.length, s10 += 24;
        let a10 = i10.getUint8(s10++);
        if (a10 > t10) throw Error(`Expected version <= ${t10} but received: ${a10}`);
        let o10 = i10.getUint8(s10++);
        if (o10 !== r10) throw Error(`Expected file type of ${r10}, but received: ${o10}`);
        let l2 = i10.getUint8(s10++), u2 = new Uint8Array(e10, s10);
        switch (l2) {
          case 0:
            break;
          case 1:
            u2 = new Uint8Array((u2 = await r5(ss, n10, [e10], u2)).buffer, u2.byteOffset, u2.byteLength);
            break;
          default:
            throw Error(`Unknown compression method: ${l2}`);
        }
        return { content: u2, specVersion: a10 };
      }
      async function s3(e10, t10, r10, n10) {
        let { content: i10, specVersion: s10 } = await s2(e10, t10, r10, n10);
        return { content: new sX.SY({ mapsAsObjects: false, int64AsType: "bigint" }).unpack(i10), specVersion: s10, estimatedSize: 3 * e10.byteLength };
      }
      let s4 = sZ.zGw(sZ.bcc([sZ.eE4(Uint8Array)]), sZ.vs((e10) => e10[0])), s6 = sZ.zGw(s4, sZ.kE(12), sZ.vs(sH)), s8 = sZ.zGw(s4, sZ.kE(8), sZ.vs(sH)), s5 = BigInt(Number.MIN_SAFE_INTEGER), s9 = BigInt(Number.MAX_SAFE_INTEGER), s7 = sZ.zGw(sZ.Kvp(), sZ.BF5((e10) => e10 >= s5 && e10 <= s9, `Number outside supported range: [${Number.MIN_SAFE_INTEGER}, ${Number.MAX_SAFE_INTEGER}]`), sZ.vs(Number)), ae = sZ.G0j([s7, sZ.zGw(sZ.Rxh(), sZ._LP())]);
      function at(e10) {
        let t10 = Object.keys(e10);
        return sZ.zGw(sZ.IXX(sZ.YjB()), sZ.kE(t10.length), sZ.vs((e11) => Object.fromEntries(t10.map((t11, r10) => [t11, e11[r10]]))), sZ.cfj(e10));
      }
      function ar(e10, t10, r10) {
        try {
          return { ...sZ.Qc3(e10, r10.content), estimatedSize: r10.estimatedSize };
        } catch (e11) {
          if (sZ.yhs(e11)) throw Error(`Error parsing icechunk ${t10}: ${JSON.stringify(sZ.xHg(e11.issues))}`);
          throw e11;
        }
      }
      let an = sZ.cfj({ Inline: sZ.eE4(Uint8Array) }), ai = sZ.YjB(), as = at({ location: sZ.Z_8(), offset: ae, length: ae, chunksum: ai }), aa = sZ.cfj({ Virtual: as }), ao = at({ id: s6, offset: ae, length: ae }), al = sZ.cfj({ Ref: ao }), au = sZ.zGw(sZ.UID(sZ.Z_8(), sZ.YjB()), sZ.vs(Object.fromEntries), sZ.G0j([an, aa, al])), ah = at({ id: s6, chunks: sZ.UID(s8, sZ.UID(sZ.zGw(sZ.IXX(ae), sZ.vs((e10) => e10.join())), au)) });
      async function ac(e10, t10) {
        return ar(ah, "chunk manifest", await s3(e10, 1, 2, t10));
      }
      function ad(e10) {
        return null !== e10.match(/^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{20}$/);
      }
      let af = at({ id: s6, sizeBytes: ae, numRows: ae }), ag = at({ id: s6 }), ap = sZ.zGw(sZ.UID(sZ.Z_8(), sZ.YjB()), sZ.vs(Object.fromEntries), sZ.G0j([sZ.cfj({ Inline: sZ.YjB() })])), am = sZ.$R3(["Slash", "Dot"]), ay = sZ.UID(sZ.Z_8(), sZ.YjB()), av = at({ name: sZ.Z_8(), configuration: ay }), ab = sZ.zGw(sZ.UID(sZ.Z_8(), sZ.YjB()), sZ.vs((e10) => {
        let t10 = Array.from(e10.values());
        if (1 !== t10.length) throw Error(`Expected a single key, but received: ${JSON.stringify(Array.from(e10.keys()))}`);
        return t10[0];
      })), aw = at({ name: sZ.Z_8(), configuration: ay }), aS = sZ.IXX(sZ.AG3(sZ.Z_8())), aE = at({ shape: sZ.IXX(ae), dataType: sZ.Z_8(), chunkShape: sZ.IXX(ae), chunkKeyEncoding: am, fillValue: ab, codecs: sZ.IXX(av), storageTransformers: sZ.IXX(aw), dimensionNames: sZ.AG3(aS) }), ak = sZ.IXX(ae), aI = at({ objectId: s6, extents: sZ.qXN([ak, ak]) }), aM = sZ.$R3(["Group"]), ax = sZ.cfj({ Array: at({ metadata: aE, manifests: sZ.IXX(aI) }) }), aT = sZ.G0j([aM, sZ.zGw(sZ.UID(sZ.Z_8(), sZ.YjB()), sZ.vs(Object.fromEntries), ax)]), aC = at({ id: s8, path: sZ.zGw(sZ.Z_8(), sZ.vs((e10) => "/" === e10 ? "" : e10.slice(1) + "/")), userAttributes: ap, nodeData: aT }), aN = sZ.zGw(sZ.UID(sZ.Z_8(), aC), sZ.vs((e10) => Array.from(e10.values()).sort((e11, t10) => (0, nL.B)(e11.path, t10.path)))), a$ = at({ id: s6, parentId: sZ.AG3(s6), flushedAt: sZ.Z_8(), message: sZ.Z_8(), metadata: sZ.IMB(sZ.Z_8(), sZ.YjB()), manifestFiles: sZ.zGw(sZ.IXX(af), sZ.vs((e10) => {
        let t10 = /* @__PURE__ */ new Map();
        for (let r10 of e10) t10.set(r10.id, r10);
        return t10;
      })), attributeFiles: sZ.IXX(ag), nodes: aN });
      async function aR(e10, t10) {
        return ar(a$, "snapshot", await s3(e10, 1, 1, t10));
      }
      function aP(e10, t10, r10) {
        if (null != t10) {
          var n10, i10;
          if ("object" != typeof t10 && "function" != typeof t10) throw TypeError("Object expected.");
          if (r10) {
            if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
            n10 = t10[Symbol.asyncDispose];
          }
          if (void 0 === n10) {
            if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
            n10 = t10[Symbol.dispose], r10 && (i10 = n10);
          }
          if ("function" != typeof n10) throw TypeError("Object not disposable.");
          i10 && (n10 = function() {
            try {
              i10.call(this);
            } catch (e11) {
              return Promise.reject(e11);
            }
          }), e10.stack.push({ value: t10, dispose: n10, async: r10 });
        } else r10 && e10.stack.push({ async: true });
        return t10;
      }
      function aO(e10) {
        var t10 = "function" == typeof SuppressedError ? SuppressedError : function(e11, t11, r10) {
          var n10 = Error(r10);
          return n10.name = "SuppressedError", n10.error = e11, n10.suppressed = t11, n10;
        };
        return (aO = function(e11) {
          function r10(r11) {
            e11.error = e11.hasError ? new t10(r11, e11.error, "An error was suppressed during disposal.") : r11, e11.hasError = true;
          }
          var n10, i10 = 0;
          return function t11() {
            for (; n10 = e11.stack.pop(); ) try {
              if (!n10.async && 1 === i10) return i10 = 0, e11.stack.push(n10), Promise.resolve().then(t11);
              if (n10.dispose) {
                var s10 = n10.dispose.call(n10.value);
                if (n10.async) return i10 |= 2, Promise.resolve(s10).then(t11, function(e12) {
                  return r10(e12), t11();
                });
              } else i10 |= 1;
            } catch (e12) {
              r10(e12);
            }
            if (1 === i10) return e11.hasError ? Promise.reject(e11.error) : Promise.resolve();
            if (e11.hasError) throw e11.error;
          }();
        })(e10);
      }
      function aU(e10, t10, r10) {
        let n10 = new iM(e10.chunkManager.addRef(), { get: async (n11, i10) => {
          let s10 = await e10.kvStoreContext.read(n11, { ...i10, throwIfMissing: true });
          try {
            return await r10(s10.response, i10.signal);
          } catch (e11) {
            throw Error(`Error reading icechunk ${t10} from ${n11}`, { cause: e11 });
          }
        } });
        return n10.registerDisposer(e10.addRef()), n10;
      }
      function a_(e10, t10, r10) {
        return e10.chunkManager.memoize.get("icechunk:ref", () => aU(e10, "ref", async (e11) => ({ data: function(e12) {
          if ((0, ej.PT)(e12), 1 !== Object.keys(e12).length) throw Error(`Expected object with only a "snapshot" property, but received: ${JSON.stringify(e12)}`);
          let t11 = (0, ej.uq)(e12, "snapshot", ej.ZE);
          if (!ad(t11)) throw Error(`Expected icechunk snapshot id but received: ${JSON.stringify(t11)}`);
          return t11;
        }(await e11.json()), size: 0 }))).get(t10, r10);
      }
      function aA(e10, t10) {
        let r10, n10;
        let i10 = t10.match(/(?:^|\/)(zarr\.json)$/);
        if (null !== i10) r10 = t10.slice(0, -i10[1].length);
        else {
          let e11 = t10.match(/c(?:[./][0-9]+)*$/);
          if (null === e11) return;
          r10 = t10.slice(0, -e11[0].length);
          let i11 = e11[0].split(/[./]/), s11 = i11.length - 1;
          n10 = Array(s11);
          for (let e12 = 0; e12 < s11; ++e12) n10[e12] = Number(i11[e12 + 1]);
        }
        let s10 = function(e11, t11) {
          let { nodes: r11 } = e11, n11 = eL(r11, t11, (e12, t12) => (0, nL.B)(e12, t12.path));
          if (n11 < 0) throw Error(`Node not found: ${JSON.stringify(t11)}`);
          return r11[n11];
        }(e10, r10);
        if (void 0 === n10) return { node: s10 };
        if ("Group" === s10.nodeData) return;
        let { shape: a10, chunkShape: o10 } = s10.nodeData.Array.metadata, l2 = a10.length;
        if (l2 === n10.length) {
          for (let e11 = 0; e11 < l2; ++e11) if (n10[e11] * o10[e11] >= a10[e11]) return;
          return { node: s10, chunk: n10 };
        }
      }
      async function aL(e10, t10, r10, n10, i10) {
        let { manifests: s10 } = r10.nodeData.Array, a10 = n10.join(), o10 = r10.id;
        for (let r11 of s10) {
          if (!function([e11, t11], r12) {
            for (let n11 = 0, i11 = r12.length; n11 < i11; ++n11) {
              let i12 = r12[n11];
              if (i12 < e11[n11] || i12 >= t11[n11]) return false;
            }
            return true;
          }(r11.extents, n10)) continue;
          let s11 = (await function(e11, t11, r12, n11) {
            return e11.chunkManager.memoize.get("icechunk:manifest", () => aU(e11, "manifest", async (e12, t12) => {
              let r13 = await ac(await e12.arrayBuffer(), t12);
              return { data: r13, size: r13.estimatedSize };
            })).get((0, ip.Yq)(t11, `manifests/${r12}`), n11);
          }(e10, t10, r11.objectId, i10)).chunks.get(o10);
          if (void 0 === s11) continue;
          let l2 = s11.get(a10);
          if (void 0 !== l2) return l2;
        }
      }
      async function aD(e10, t10, r10, n10, i10) {
        let s10;
        let a10 = aA(r10, n10);
        if (void 0 === a10) return;
        let { node: o10, chunk: l2 } = a10;
        if (void 0 === l2) return { totalSize: void 0 };
        let u2 = await aL(e10, t10, o10, l2, i10);
        if (void 0 !== u2) return { totalSize: "Inline" in u2 ? u2.Inline.length : "Virtual" in u2 ? u2.Virtual.length : u2.Ref.length };
      }
      async function az(e10, t10, r10, n10) {
        let i10, s10, a10;
        if ("Inline" in r10) return (0, iT._J)(r10.Inline, n10.byteRange);
        if ("Virtual" in r10) ({ location: a10, offset: i10, length: s10 } = r10.Virtual);
        else {
          var o10, l2;
          let { Ref: e11 } = r10;
          ({ offset: i10, length: s10 } = e11), o10 = t10, l2 = e11.id, a10 = (0, ip.Yq)(o10, `chunks/${l2}`);
        }
        return new iT.uX(e10.kvStoreContext.getFileHandle(a10), { offset: i10, length: s10 }).read(n10);
      }
      async function aB(e10, t10, r10, n10, i10) {
        let s10 = aA(r10, n10);
        if (void 0 === s10) return;
        let { node: a10, chunk: o10 } = s10;
        if (void 0 === o10) {
          let e11 = function(e12) {
            let t12;
            let { userAttributes: r11, nodeData: n11 } = e12;
            return t12 = null === r11 ? /* @__PURE__ */ new Map() : r11.Inline, JSON.stringify("Group" !== n11 ? function(e13, t13) {
              let { shape: r12, chunkShape: n12, chunkKeyEncoding: i11, dataType: s11, fillValue: a11, codecs: o11, storageTransformers: l3, dimensionNames: u2 } = e13;
              return { zarr_format: 3, node_type: "array", shape: r12, data_type: s11, chunk_grid: { name: "regular", configuration: { chunk_shape: n12 } }, chunk_key_encoding: { name: "default", configuration: { separator: "Dot" === i11 ? "." : "/" } }, fill_value: a11, codecs: o11, storage_transformers: l3, dimension_names: u2 ?? void 0, attributes: t13 };
            }(n11.Array.metadata, t12) : { zarr_format: 3, node_type: "group", attributes: t12 }, (e13, t13) => t13 instanceof Map ? Object.fromEntries(t13) : t13);
          }(a10), t11 = new TextEncoder().encode(e11);
          return (0, iT._J)(t11, i10.byteRange);
        }
        let l2 = await aL(e10, t10, a10, o10, i10);
        if (void 0 !== l2) return az(e10, t10, l2, i10);
      }
      let aj = "branch.", aF = "tag.";
      function aV(e10) {
        return e10.length > 0 && !e10.includes("/");
      }
      function aG(e10) {
        if (void 0 !== e10) {
          if (e10.startsWith(aj)) {
            let t10 = e10.substring(aj.length);
            if (!aV(t10)) throw Error(`Invalid branch name: ${JSON.stringify(t10)}`);
            return { branch: decodeURIComponent(t10) };
          }
          if (e10.startsWith(aF)) {
            let t10 = e10.substring(aF.length);
            if (!aV(t10)) throw Error(`Invalid tag name: ${JSON.stringify(t10)}`);
            return { tag: decodeURIComponent(t10) };
          }
          if (ad(e10)) return { snapshot: e10 };
          throw Error(`Invalid ref spec: ${JSON.stringify(e10)}`);
        }
      }
      class aK {
        constructor(e10, t10, r10) {
          __publicField(this, "sharedKvStoreContext");
          __publicField(this, "baseUrl");
          __publicField(this, "refSpec");
          __publicField(this, "snapshot");
          this.sharedKvStoreContext = e10, this.baseUrl = t10, this.refSpec = r10;
        }
        async getSnapshot(e10) {
          let { snapshot: t10 } = this;
          if (void 0 === t10) {
            var r10, n10;
            let i10 = await function(e11, t11, r11, n11) {
              var i11, s10;
              return "snapshot" in r11 ? Promise.resolve(r11.snapshot) : "branch" in r11 ? (i11 = (0, ip.Yq)(t11, `refs/branch.${r11.branch}/`), e11.chunkManager.memoize.get("icechunk:branch", () => {
                let t12 = new iM(e11.chunkManager.addRef(), { get: async (t13, r12) => {
                  let n12 = { stack: [], error: void 0, hasError: false };
                  try {
                    aP(n12, new x.Vi(r12.progressListener, { message: `Resolving icechunk branch at ${t13}` }), false);
                    try {
                      let n13 = (await e11.kvStoreContext.list(t13, { ...r12, responseKeys: "suffix" })).entries.find((e12) => {
                        var t14;
                        return t14 = e12.key, null !== t14.match(/^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{8}\.json$/);
                      });
                      if (void 0 === n13) throw Error("Failed to find any refs");
                      return { data: await a_(e11, (0, ip.Yq)(t13, n13.key), r12), size: 0 };
                    } catch (e12) {
                      throw Error(`Error resolving icechunk branch at ${t13}`, { cause: e12 });
                    }
                  } catch (e12) {
                    n12.error = e12, n12.hasError = true;
                  } finally {
                    aO(n12);
                  }
                } });
                return t12.registerDisposer(e11.addRef()), t12;
              }).get(i11, n11)) : (s10 = (0, ip.Yq)(t11, `refs/tag.${r11.tag}/`), e11.chunkManager.memoize.get("icechunk:tag", () => {
                let t12 = new iM(e11.chunkManager.addRef(), { get: async (t13, r12) => {
                  let n12 = { stack: [], error: void 0, hasError: false };
                  try {
                    aP(n12, new x.Vi(r12.progressListener, { message: `Resolving icechunk tag at ${t13}` }), false);
                    try {
                      let [n13, i12] = await Promise.all([a_(e11, (0, ip.Yq)(t13, "ref.json"), r12), e11.kvStoreContext.stat((0, ip.Yq)(t13, "ref.json.deleted"), r12)]);
                      if (void 0 !== i12) throw Error("Tag is marked as deleted");
                      return { data: n13, size: 0 };
                    } catch (e12) {
                      throw Error(`Error resolving icechunk tag at ${t13}`, { cause: e12 });
                    }
                  } catch (e12) {
                    n12.error = e12, n12.hasError = true;
                  } finally {
                    aO(n12);
                  }
                } });
                return t12.registerDisposer(e11.addRef()), t12;
              }).get(s10, n11));
            }(this.sharedKvStoreContext, this.baseUrl, this.refSpec ?? { branch: "main" }, e10);
            t10 = this.snapshot = await (r10 = this.sharedKvStoreContext, n10 = this.baseUrl, r10.chunkManager.memoize.get("icechunk:snapshot", () => aU(r10, "snapshot", async (e11, t11) => {
              let r11 = await aR(await e11.arrayBuffer(), t11);
              return { data: r11, size: r11.estimatedSize };
            })).get((0, ip.Yq)(n10, `snapshots/${i10}`), e10));
          }
          return t10;
        }
        getUrl(e10) {
          return function(e11, t10) {
            var r10;
            let { baseUrl: n10, refSpec: i10 } = e11, s10 = void 0 === i10 ? "" : `@${"branch" in (r10 = i10) ? aj + (0, ip.aU)(r10.branch) : "tag" in r10 ? aF + (0, ip.aU)(r10.tag) : r10.snapshot}/`;
            return n10 + `|icechunk:${s10}${(0, ip.aU)(t10)}`;
          }(this, e10);
        }
        async stat(e10, t10) {
          let r10 = await this.getSnapshot(t10);
          return aD(this.sharedKvStoreContext, this.baseUrl, r10, e10, t10);
        }
        async read(e10, t10) {
          let r10 = await this.getSnapshot(t10);
          return aB(this.sharedKvStoreContext, this.baseUrl, r10, e10, t10);
        }
        async list(e10, t10) {
          return function(e11, t11) {
            let { nodes: r10 } = e11, n10 = eD(0, r10.length, (e12) => r10[e12].path >= t11), i10 = eD(Math.min(r10.length, n10 + 1), r10.length, (e12) => !r10[e12].path.startsWith(t11)), s10 = { entries: [], directories: [] };
            for (let e12 = n10; e12 < i10; ) {
              let { path: n11 } = r10[e12], a11 = n11.indexOf("/", t11.length);
              if (-1 === a11) ++e12;
              else {
                a11 + 1 === n11.length && s10.directories.push(n11.slice(0, a11));
                let t12 = n11.substring(0, a11 + 1);
                e12 = eD(e12 + 1, i10, (e13) => !r10[e13].path.startsWith(t12));
              }
            }
            let a10 = t11.lastIndexOf("/");
            if ("zarr.json".startsWith(t11.slice(a10 + 1))) {
              let e12 = t11.substring(0, a10 + 1);
              if (eL(r10, e12, (e13, t12) => (0, nL.B)(e13, t12.path)) >= 0) s10.entries.push({ key: e12 + "zarr.json" });
              else throw Error(`Parent node ${JSON.stringify(e12)} not found`);
            }
            return (0, iN.Mt)(s10);
          }(await this.getSnapshot(t10), e10);
        }
        get supportsOffsetReads() {
          return true;
        }
        get supportsSuffixReads() {
          return true;
        }
      }
      async function aq(e10, t10) {
        let r10, n10;
        let { url: i10 } = t10, s10 = i10.suffix ?? "";
        if ("" === s10) return { offset: 0, completions: [{ value: "@", description: "Ref specifier" }] };
        let a10 = s10.match(/^@([^/]*)((?:\/|$).*)/);
        if (null === a10) return;
        let [, o10, l2] = a10;
        if ("" !== l2) {
          aG(o10);
          return;
        }
        if (o10.match(/^(?:(?:(?:t|$)(?:a|$)(?:g|$)(?:\.|$))|(?:(?:b|$)(?:r|$)(?:a|$)(?:n|$)(?:c|$)(?:h|$)(?:\.|$)))/)) {
          let e11 = (0, ip.Vo)(t10.base.path, "refs/");
          r10 = (0, iN.RQ)(t10.base.store, e11 + decodeURIComponent(o10), { signal: t10.signal, progressListener: t10.progressListener }).then(({ directories: t11 }) => t11.map((t12) => {
            let r11 = t12.slice(e11.length);
            return { value: (0, ip.aU)(r11) + "/", description: r11.startsWith("tag.") ? "Tag" : "Branch" };
          }));
        }
        if (o10.match(/^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{0,20}$/)) {
          let e11 = (0, ip.Vo)(t10.base.path, "snapshots/");
          n10 = (0, iN.RQ)(t10.base.store, e11 + o10, { signal: t10.signal, progressListener: t10.progressListener }).then(({ entries: t11 }) => {
            let r11 = [];
            for (let { key: n11 } of t11) {
              let t12 = n11.slice(e11.length);
              ad(t12) && r11.push({ value: t12 + "/", description: "Snapshot" });
            }
            return r11;
          });
        }
        return { offset: 1, completions: [...await r10 ?? [], ...await n10 ?? []] };
      }
      eR.registerKvStoreAdapterProvider(function(e10) {
        return { scheme: "icechunk", description: "Icechunk repository", getKvStore(t10, r10) {
          let { baseUrl: n10, version: i10, path: s10 } = function(e11, t11) {
            (0, ip.uh)(e11);
            try {
              let [, r11, n11] = (e11.suffix ?? "").match(/^(?:@([^/]*)(?:\/|$))?(.*)$/);
              return { baseUrl: t11.store.getUrl((0, ip.V8)(t11.path)), version: aG(r11), path: decodeURIComponent(n11) };
            } catch (t12) {
              throw Error(`Invalid URL: ${e11.url}`, { cause: t12 });
            }
          }(t10, r10);
          return { store: new aK(e10, n10, i10), path: s10 };
        }, completeUrl: (t10) => aq(e10, t10) };
      }), (0, r2(5139).X)(eR, sW), r2(8366);
      var aY = r2(4163), aJ = ((S = {})[S.UNCOMPRESSED = 0] = "UNCOMPRESSED", S[S.ZSTD = 1] = "ZSTD", S);
      async function aW(e10, t10, r10, n10) {
        if (e10.byteLength < 18) throw Error("Unexpected EOF");
        let i10 = new DataView(e10), s10 = i10.getUint32(0, false);
        if (s10 !== t10) throw Error(`Expected magic value 0x${t10.toString(16)} but received 0x${s10.toString(16)}`);
        let a10 = i10.getBigUint64(4, true);
        if (a10 != BigInt(e10.byteLength)) throw Error(`Expected length ${e10.byteLength} but received: ${a10}`);
        let o10 = i10.getUint32(e10.byteLength - 4, true), l2 = (0, aY.buf)(new Uint8Array(e10, 0, e10.byteLength - 4)) >>> 0;
        if (o10 != l2) throw Error(`Expected CRC32c checksum of ${o10}, but received ${l2}`);
        let u2 = i10.getUint8(12);
        if (u2 > r10) throw Error(`Expected version to be <= ${r10}, but received: ${u2}`);
        let h2 = i10.getUint8(13), c2 = new Uint8Array(e10, 14, e10.byteLength - 14 - 4);
        switch (h2) {
          case 0:
            break;
          case 1:
            c2 = await r5(ss, n10, [e10], c2);
            break;
          default:
            throw Error(`Unknown compression format ${h2}`);
        }
        return { reader: { offset: 0, data: new DataView(c2.buffer, c2.byteOffset, c2.byteLength) }, version: u2 };
      }
      function aZ(e10, t10) {
        let { offset: r10, data: n10 } = e10;
        if (r10 + t10 > n10.byteLength) throw Error("Unexpected EOF");
        return e10.offset += t10, new Uint8Array(n10.buffer, n10.byteOffset + r10, t10);
      }
      function aX(e10) {
        let { value: t10, offset: r10 } = function(e11, t11) {
          let r11 = 0, n10 = 0;
          for (let i10 = t11, s10 = e11.byteLength; i10 < s10; ++i10) {
            let t12 = e11.getUint8(i10);
            if (r11 += (127 & t12) << n10, (128 & t12) == 0) {
              if (r11 > Number.MAX_SAFE_INTEGER) throw Error(`Value exceeded ${Number.MAX_SAFE_INTEGER}`);
              return { offset: i10 + 1, value: r11 };
            }
            n10 += 7;
          }
          throw Error("Unexpected EOF");
        }(e10.data, e10.offset);
        return e10.offset = r10, t10;
      }
      function aQ(e10) {
        let { value: t10, offset: r10 } = function(e11, t11) {
          let r11 = 0n, n10 = 0n;
          for (let i10 = t11, s10 = e11.byteLength; i10 < s10; ++i10) {
            let t12 = e11.getUint8(i10);
            if (r11 |= BigInt(127 & t12) << BigInt(n10), (128 & t12) == 0) return { offset: i10 + 1, value: r11 };
            n10 += 7n;
          }
          throw Error("Unexpected EOF");
        }(e10.data, e10.offset);
        return e10.offset = r10, t10;
      }
      function aH(e10, t10) {
        let r10 = aX(e10);
        if (r10 > t10) throw Error(`Expected value <= ${t10}, but received: ${r10}`);
        return r10;
      }
      function a0(e10) {
        let { offset: t10, data: r10 } = e10;
        if (t10 + 1 > r10.byteLength) throw Error("Unexpected EOF");
        return e10.offset += 1, r10.getUint8(t10);
      }
      function a1(e10) {
        let { offset: t10, data: r10 } = e10;
        if (t10 + 8 > r10.byteLength) throw Error("Unexpected EOF");
        return e10.offset += 8, r10.getBigUint64(t10, true);
      }
      function a2(e10) {
        return (t10, r10, n10) => {
          let i10 = [];
          for (let s10 = 0; s10 < r10; ++s10) i10[s10] = e10(t10, n10);
          return i10;
        };
      }
      function a3(e10, t10) {
        let r10 = Object.keys(t10), n10 = [];
        for (let i10 = 0; i10 < e10; ++i10) {
          let e11 = Object.fromEntries(r10.map((e12) => [e12, t10[e12][i10]]));
          n10[i10] = e11;
        }
        return n10;
      }
      function a4(e10, t10) {
        return (r10, n10, i10) => {
          let s10 = Object.fromEntries(Object.entries(e10).map(([e11, t11]) => [e11, t11(r10, n10, i10)])), a10 = a3(n10, s10);
          if (void 0 !== t10) for (let e11 = 0; e11 < n10; ++e11) t10?.(a10[e11], i10);
          return a10;
        };
      }
      let a6 = new Uint8Array(0);
      function a8(e10, t10) {
        let r10 = Math.min(e10.length, t10.length);
        for (let n10 = 0; n10 < r10; ++n10) {
          let r11 = e10[n10] - t10[n10];
          if (0 !== r11) return r11;
        }
        return e10.length - t10.length;
      }
      function a5(e10, t10) {
        let r10 = Math.min(e10.length, t10.length);
        for (let n10 = 0; n10 < r10; ++n10) {
          let r11 = e10[n10] - t10[n10];
          if (0 !== r11) return { offset: n10, difference: r11 };
        }
        return { offset: r10, difference: e10.length - t10.length };
      }
      function a9(...e10) {
        let t10 = 0;
        for (let r11 of e10) t10 += r11.length;
        let r10 = new Uint8Array(t10), n10 = 0;
        for (let t11 of e10) r10.set(t11, n10), n10 += t11.length;
        return r10;
      }
      function a7(e10, t10) {
        return e10.length >= t10.length && a5(e10, t10).offset === t10.length;
      }
      function oe(e10, t10) {
        let { dataFileTable: r10 } = t10, n10 = aX(e10);
        if (n10 >= r10.length) throw Error(`Invalid data file index ${n10}, expected value <= ${r10.length}`);
        return r10[n10];
      }
      Uint8Array.of(0);
      let ot = a4({ dataFile: a2(oe), offset: a2(aQ), length: a2(aQ) }, (e10, t10) => {
        if (or(e10)) {
          if (true !== t10.allowMissing) throw Error("Reference to missing value not allowed");
        } else if (e10.offset + e10.length > BigInt(Number.MAX_SAFE_INTEGER)) throw Error(`Offset=${e10.offset} + length=${e10.length} exceeds maximum of ${Number.MAX_SAFE_INTEGER}`);
      });
      function or(e10) {
        return 0xffffffffffffffffn === e10.offset && 0xffffffffffffffffn === e10.length;
      }
      function on(e10, t10) {
        let r10 = aX(e10), n10 = new Uint16Array(3 * r10);
        for (let t11 = 1, i11 = 3 * r10; t11 < i11; ++t11) n10[t11] = aH(e10, 65535);
        let i10 = [], s10 = a6, a10 = a6, o10 = new TextDecoder("utf-8", { fatal: true });
        for (let l2 = 0; l2 < r10; ++l2) {
          let u2, h2, c2 = n10[l2], d2 = n10[l2 + r10], f2 = n10[l2 + 2 * r10], g2 = c2 + d2;
          if (g2 > 65535) throw Error(`path_length[${l2} = prefix_length(${c2}) + suffix_length(${d2}) = ${g2} > 65535`);
          if (f2 > g2) throw Error(`base_path_length[${l2}] = ${f2} > path_length(${g2}) = prefix_length(${c2}) + suffix_length(${d2})`);
          if (c2 > Math.min(s10.length, f2) && f2 !== s10.length) throw Error(`path_prefix_length[${l2 - 1}] = ${c2} > min(base_path_length[${l2 - 1}] = ${s10.length}, base_path_length[${l2}] = ${f2}) is not valid if base_path_length[${l2 - 1}] != base_path_length[${l2}]`);
          let p2 = c2 + d2 - f2;
          if (0 === f2) u2 = t10, s10 = a6;
          else if (c2 >= f2) u2 = i10[l2 - 1].baseUrl;
          else {
            let r11 = new Uint8Array(f2), n11 = 0, i11 = Math.max(f2 - c2, 0);
            if (c2 > 0) {
              let e11 = Math.min(c2, f2);
              r11.set(s10.subarray(0, e11)), n11 = e11, c2 -= e11;
            }
            0 !== i11 && (r11.set(aZ(e10, i11), n11), d2 -= i11), u2 = (0, ip.Yq)(t10, o10.decode(r11)), s10 = r11;
          }
          if (0 === p2) h2 = "", a10 = a6;
          else if (0 === d2 && p2 === a10.length) h2 = i10[l2 - 1].relativePath;
          else {
            let t11 = new Uint8Array(p2), r11 = 0;
            0 !== c2 && (t11.set(a10.subarray(0, c2), 0), r11 += c2), d2 > 0 && t11.set(aZ(e10, d2), r11), h2 = o10.decode(t11), a10 = t11;
          }
          i10[l2] = { baseUrl: u2, relativePath: h2 };
        }
        return i10;
      }
      async function oi(e10, t10, r10) {
        try {
          let { reader: n10 } = await aW(e10, 215687390, 0, r10), i10 = a0(n10), s10 = on(n10, t10), a10 = aX(n10);
          if (0 === a10) throw Error("Empty b+tree node");
          if (a10 > 1048576) throw Error(`B+tree node has arity ${a10}, which exceeds limit of 1048576`);
          return { height: i10, ...0 === i10 ? function(e11, t11, r11) {
            let { keys: n11, commonPrefix: i11 } = os(e11, r11, false), s11 = function(e12, t12, r12) {
              let n12 = a2(aQ)(e12, r12, {}), i12 = aZ(e12, r12);
              for (let e13 = 0; e13 < r12; ++e13) {
                let t13 = i12[e13];
                if (t13 > 1) throw Error(`value_kind[${e13}]=${t13} is outside valid range [0, 1]`);
                if (0 === t13) {
                  let t14 = n12[e13];
                  if (t14 > BigInt(1048576)) throw Error(`value_length[${e13}]=${t14} exceeds maximum of 1048576 for an inline value`);
                }
              }
              let s12 = Array(r12);
              for (let a11 = 0; a11 < r12; ++a11) {
                if (1 !== i12[a11]) continue;
                let r13 = oe(e12, { dataFileTable: t12 });
                s12[a11] = { dataFile: r13, offset: 0n, length: n12[a11] };
              }
              for (let t13 = 0; t13 < r12; ++t13) {
                if (1 !== i12[t13]) continue;
                let r13 = aQ(e12);
                s12[t13].offset = r13;
              }
              for (let t13 = 0; t13 < r12; ++t13) 0 === i12[t13] && (s12[t13] = aZ(e12, Number(n12[t13])));
              return s12;
            }(e11, t11, r11);
            return { keyPrefix: i11, entries: a3(r11, { key: n11, value: s11 }) };
          }(n10, s10, a10) : function(e11, t11, r11) {
            let { keys: n11, commonPrefix: i11, subtreeCommonPrefixLengths: s11 } = os(e11, r11, true), a11 = oo(e11, r11, { dataFileTable: t11 });
            return { keyPrefix: i11, entries: a3(r11, { key: n11, subtreeCommonPrefixLength: s11, node: a11 }) };
          }(n10, s10, a10), estimatedSize: 3 * n10.data.byteLength };
        } catch (e11) {
          throw Error("Error decoding OCDBT b+tree node", { cause: e11 });
        }
      }
      function os(e10, t10, r10) {
        let n10, i10;
        let s10 = new Uint16Array(2 * t10);
        for (let t11 = 1, r11 = s10.length; t11 < r11; ++t11) s10[t11] = aH(e10, 65535);
        let a10 = s10[t10];
        for (let e11 = 1; e11 < t10; ++e11) a10 = Math.min(a10, s10[e11]);
        if (r10) {
          n10 = new Uint16Array(t10);
          for (let r11 = 0; r11 < t10; ++r11) a10 = Math.min(a10, n10[r11] = aH(e10, 65535));
        }
        a10 = Math.min(s10[t10], a10);
        for (let e11 = 0, i11 = 0; e11 < t10; ++e11) {
          let o11 = s10[e11];
          if (o11 > i11) throw Error(`Child ${e11}: Prefix length of ${o11} exceeds previous key length ${i11}`);
          let l2 = o11 + s10[e11 + t10];
          if (l2 > 65535) throw Error(`Child ${e11}: Key length ${l2} exceeds limit of 65535`);
          if (r10) {
            let t11 = n10[e11];
            if (t11 > l2) throw Error(`Child ${e11}: subtree common prefix length of ${t11} exceeds key length of ${l2}`);
            n10[e11] -= a10;
          }
          i11 = l2;
        }
        let o10 = Array(t10);
        {
          let r11 = aZ(e10, s10[t10]);
          i10 = r11.slice(0, a10), o10[0] = r11.slice(a10);
        }
        for (let r11 = 1; r11 < t10; ++r11) {
          let n11 = s10[r11] - a10, i11 = s10[r11 + t10], l2 = aZ(e10, i11), u2 = o10[r11 - 1];
          if (a8(u2.subarray(n11), l2) >= 0) throw Error("Invalid key order");
          let h2 = new Uint8Array(n11 + i11);
          h2.set(u2.subarray(0, n11)), h2.set(l2, n11), o10[r11] = h2;
        }
        return { keys: o10, subtreeCommonPrefixLengths: n10, commonPrefix: i10 };
      }
      let oa = a4({ numKeys: a2(aQ), numTreeBytes: a2(aQ), numIndirectValueBytes: a2(aQ) }), oo = a4({ location: ot, statistics: oa });
      function ol(e10, t10, r10) {
        if (e10.height !== t10) throw Error(`Expected height of ${t10} but received ${e10.height}`);
        let { keyPrefix: n10 } = e10;
        if (r10.length < n10.length) {
          if (a8(n10, r10) >= 0) return;
        } else if (a8(n10, r10.subarray(0, n10.length)) >= 0 && a8(e10.entries[0].key, r10.subarray(n10.length)) >= 0) return;
        throw Error(`First key [${n10}]+[${e10.entries[0].key}] < inclusive_min [${r10}] specified by parent node`);
      }
      function ou(e10, t10, r10, n10) {
        return t10 === r10 || 0 === n10.length ? r10 : eD(t10, r10, (t11) => {
          let { offset: r11, difference: i10 } = a5(n10, e10[t11].key);
          return i10 < 0 && r11 < n10.length;
        });
      }
      function oh(e10, t10, r10) {
        let n10 = aH(e10, 2 ** t10), i10 = oy(e10, n10, { allowMissing: true, dataFileTable: r10 });
        return function(e11, t11) {
          let r11 = 2 ** t11;
          if (0 === e11.length || e11.length > r11) throw Error(`num_children=${e11.length} outside valid range [1, ${r11}]`);
          for (let [t12, r12] of e11.entries()) {
            if (or(r12.root.location)) {
              if (0 !== r12.rootHeight) throw Error(`non-zero root_height=${r12.rootHeight} for empty generation ${r12.generationNumber}`);
              let { statistics: e12 } = r12.root;
              if (0n !== e12.numKeys || 0n !== e12.numTreeBytes || 0n !== e12.numIndirectValueBytes) throw Error(`non-zero statistics for empty generation_number[${t12}]=${r12.generationNumber}`);
            }
            if (0n === r12.generationNumber) throw Error(`generation_number[${t12}] must be non-zero`);
            if (0 !== t12 && r12.generationNumber <= e11[t12 - 1].generationNumber) throw Error(`generation_number[${t12}]=${r12.generationNumber} <= generation_number[${t12 - 1}]=${e11[t12 - 1].generationNumber}`);
          }
          let n11 = e11.at(-1).generationNumber, i11 = e11[0].generationNumber, s10 = oc(t11, 0, n11);
          if (i11 < s10) throw Error(`Generation range [${i11}, ${n11}] exceeds maximum of [${s10}, ${n11}]`);
        }(i10, t10), i10;
      }
      function oc(e10, t10, r10) {
        return r10 - (r10 - 1n) % (1n << BigInt(e10 * (t10 + 1)));
      }
      function od(e10) {
        let t10 = a0(e10);
        if (0 === t10 || t10 > 16) throw Error(`Expected version_tree_arity_log2 in range [1, 16] but received: ${t10}`);
        return t10;
      }
      async function of(e10, t10, r10) {
        try {
          let { reader: n10 } = await aW(e10, 215683636, 0, r10), i10 = od(n10), s10 = a0(n10), a10 = on(n10, t10);
          return { versionTreeArityLog2: i10, height: s10, entries: 0 === s10 ? oh(n10, i10, a10) : function(e11, t11, r11, n11) {
            let i11 = om(t11);
            if (n11 > i11) throw Error(`height=${n11} exceeds maximum of ${i11} for version_tree_arity_log2=${t11}`);
            let s11 = op(e11, r11, 2 ** t11, n11 - 1);
            return function(e12, t12, r12) {
              let n12 = 2 ** t12;
              if (0 === e12.length || e12.length > n12) throw Error(`num_children=${e12.length} outside valid range [1, ${n12}]`);
              let i12 = 1n << BigInt(t12 * r12);
              for (let [t13, r13] of e12.entries()) {
                if (0n === r13.generationNumber) throw Error(`generation_number[${t13}] must be non-zero`);
                if (0 !== t13) {
                  let n13 = e12[t13 - 1];
                  if (r13.generationNumber <= n13.generationNumber) throw Error(`generation_number[${t13}]=${r13.generationNumber} >= generation_number[${t13 - 1}]=${n13.generationNumber}`);
                  if ((r13.generationNumber - 1n) / i12 == (n13.generationNumber - 1n) / i12) throw Error(`generation_number[${t13}]=${r13.generationNumber} should be in the same child node as generation_number[${t13 - 1}]=${n13.generationNumber}`);
                }
                if (r13.generationNumber % i12 !== 0n) throw Error(`generation_number[${t13}]=${r13.generationNumber} is not a multiple of ${i12}`);
                if (r13.numGenerations > i12) throw Error(`num_generations[${t13}]=${r13.numGenerations} for generation_number=${r13.generationNumber} is greater than ${i12}`);
              }
              let s12 = 1n << BigInt(t12), a11 = e12.at(-1);
              if ((a11.generationNumber - 1n) / i12 / s12 != (e12[0].generationNumber - 1n) / i12 / s12) throw Error(`generation_number[0]=${e12[0].generationNumber} cannot be in the same node as generation_number[${e12.length - 1}]=${a11.generationNumber}`);
            }(s11, t11, n11), s11;
          }(n10, i10, a10, s10), estimatedSize: 3 * n10.data.byteLength };
        } catch (e11) {
          throw Error("Error decoding OCDBT version tree node", { cause: e11 });
        }
      }
      let og = a4({ generationNumber: a2(aQ), location: ot, numGenerations: a2(aQ), commitTime: a2(a1), height: a2((e10, { height: t10 }) => void 0 === t10 ? a0(e10) : t10), cumulativeNumGenerations: a2(() => 0n) });
      function op(e10, t10, r10, n10) {
        let i10 = aH(e10, r10), s10 = og(e10, i10, { dataFileTable: t10, height: n10 });
        return !function(e11) {
          let t11 = 0n;
          for (let r11 of e11) t11 += r11.numGenerations, r11.cumulativeNumGenerations = t11;
        }(s10), s10;
      }
      function om(e10) {
        return Math.floor(63 / e10) - 1;
      }
      let oy = a4({ generationNumber: a2(aQ), rootHeight: a2(a0), root: oo, commitTime: a2(a1) });
      function ov(e10, t10) {
        return "generationNumber" in e10 ? (0, tW._f)(e10.generationNumber, t10.generationNumber) : (0, tW._f)(e10.commitTime, t10.commitTime);
      }
      function ob(e10, t10, r10) {
        if ("generationIndex" in r10) {
          let n10 = r10.generationIndex - e10;
          return n10 < 0n ? 0 : n10 > BigInt(t10.length) ? t10.length : Number(n10);
        }
        return eD(0, t10.length, (e11) => 0 >= ov(r10, t10[e11]));
      }
      function ow(e10, t10) {
        return eD(0, e10.length, (r10) => e10[r10].cumulativeNumGenerations > t10);
      }
      function oS(e10, t10, r10, n10) {
        var i10, s10, a10;
        return "generationIndex" in n10 ? ow(r10, n10.generationIndex - t10) : "generationNumber" in n10 ? (i10 = e10, s10 = r10, a10 = n10.generationNumber, eD(0, s10.length, (e11) => {
          let t11 = s10[e11];
          return oc(i10, t11.height, t11.generationNumber) >= a10;
        })) : oE(r10, n10.commitTime);
      }
      function oE(e10, t10) {
        return Math.max(0, eD(0, e10.length, (r10) => e10[r10].commitTime > t10) - 1);
      }
      function ok(e10, t10, r10) {
        var n10, i10, s10, a10;
        return "generationIndex" in r10 ? (n10 = t10, i10 = r10.generationIndex - e10, eD(0, n10.length, (e11) => {
          let t11 = n10[e11];
          return t11.cumulativeNumGenerations - t11.numGenerations >= i10;
        })) : "generationNumber" in r10 ? (s10 = t10, a10 = r10.generationNumber, eD(0, s10.length, (e11) => s10[e11].generationNumber >= a10)) : oE(t10, r10.commitTime);
      }
      function oI(e10, t10, r10, n10, i10) {
        if (e10.height !== n10) throw Error(`Expected height of ${n10} but received: ${e10.height}`);
        if (e10.versionTreeArityLog2 !== t10.versionTreeArityLog2) throw Error(`Expected version_tree_arity_log2=${t10.versionTreeArityLog2} but received: ${e10.versionTreeArityLog2}`);
        let { generationNumber: s10 } = e10.entries.at(-1);
        if (s10 !== r10) throw Error(`Expected generation number ${r10} but received: ${s10}`);
        let a10 = 0 === e10.height ? BigInt(e10.entries.length) : e10.entries.at(-1).cumulativeNumGenerations;
        if (a10 !== i10) throw Error(`Expected ${i10}, but received: ${a10}`);
      }
      async function oM(e10, t10, r10) {
        try {
          let { reader: n10 } = await aW(e10, 215693866, 0, r10), i10 = function(e11) {
            let t11;
            let r11 = aZ(e11, 16).slice(), n11 = aX(e11);
            if (n11 > 1) throw Error(`Unknown manifest kind: ${n11}`);
            let i11 = aX(e11), s11 = aX(e11), a10 = od(e11), o10 = aX(e11);
            switch (o10) {
              case aJ.UNCOMPRESSED:
                break;
              case aJ.ZSTD:
                t11 = function(e12) {
                  let { offset: t12, data: r12 } = e12;
                  if (t12 + 4 > r12.byteLength) throw Error("Unexpected EOF");
                  return e12.offset += 4, r12.getInt32(t12, true);
                }(e11);
                break;
              default:
                throw Error(`Invalid compression method: ${o10}`);
            }
            return { uuid: r11, manifestKind: n11, maxInlineValueBytes: i11, maxDecodedNodeBytes: s11, versionTreeArityLog2: a10, compressionMethod: o10, zstdLevel: t11 };
          }(n10), s10 = 0 === i10.manifestKind ? function(e11, t11, r11) {
            let n11 = on(e11, r11), i11 = oh(e11, t11.versionTreeArityLog2, n11), s11 = function(e12, t12, r12, n12) {
              let i12 = op(e12, r12, om(t12), void 0);
              return function(e13, t13, r13) {
                let n13 = om(e13);
                for (let [e14, t14] of r13.entries()) {
                  if (0 === t14.height || t14.height > n13) throw Error(`entry_height[${e14}]=${t14.height} outside valid range [1, ${n13}]`);
                  if (0n === t14.generationNumber) throw Error(`generation_number[${e14}] must be non-zero`);
                  if (e14 > 0) {
                    let n14 = r13[e14 - 1];
                    if (t14.generationNumber <= n14.generationNumber) throw Error(`generation_number[${e14}]=${t14.generationNumber} <= generation_number[${e14 - 1}]=${n14.generationNumber}`);
                    if (t14.height >= n14.height) throw Error(`entry_height[${e14}]=${t14.height} >= entry_height[${e14 - 1}]=${n14.height}`);
                  }
                }
                let i13 = r13.length;
                for (let { minGenerationNumber: n14, maxGenerationNumber: s12, height: a10 } of function(e14, t14) {
                  e14 = e14 - 1n >> BigInt(t14) << BigInt(t14);
                  let r14 = 1, n15 = [];
                  for (; 0n !== e14; ) {
                    let i14 = BigInt((r14 + 1) * t14), s13 = e14 - 1n >> i14 << i14, a11 = s13 + 1n;
                    n15.push({ minGenerationNumber: a11, maxGenerationNumber: e14, height: r14 }), ++r14, e14 = s13;
                  }
                  return n15;
                }(t13, e13)) {
                  if (0 === i13) break;
                  let e14 = r13[i13 - 1];
                  if (e14.height !== a10) continue;
                  --i13;
                  let { generationNumber: t14 } = e14;
                  if (t14 < n14 || t14 > s12) throw Error(`generation_number[${i13}]=${t14} is outside expected range [${n14}, ${s12}] for height ${a10}`);
                }
                if (0 !== i13) throw Error(`Unexpected child with generation_number[${i13 - 1}]=${r13[i13 - 1].generationNumber} and entry_height=${r13[i13 - 1].height} given last generation_number=${t13}`);
              }(t12, n12, i12), i12;
            }(e11, t11.versionTreeArityLog2, n11, i11.at(-1).generationNumber);
            return { inlineVersions: i11, versionTreeNodes: s11, numGenerations: BigInt(i11.length) + (s11.at(-1)?.cumulativeNumGenerations ?? 0n) };
          }(n10, i10, t10) : void 0;
          return !function(e11) {
            if (e11.offset !== e11.data.byteLength) throw Error(`Expected EOF at byte ${e11.offset}`);
          }(n10), { config: i10, versionTree: s10, estimatedSize: 3 * n10.data.byteLength };
        } catch (e11) {
          throw Error("Error decoding OCDBT manifest", { cause: e11 });
        }
      }
      function ox(e10) {
        var t10 = "function" == typeof SuppressedError ? SuppressedError : function(e11, t11, r10) {
          var n10 = Error(r10);
          return n10.name = "SuppressedError", n10.error = e11, n10.suppressed = t11, n10;
        };
        return (ox = function(e11) {
          function r10(r11) {
            e11.error = e11.hasError ? new t10(r11, e11.error, "An error was suppressed during disposal.") : r11, e11.hasError = true;
          }
          var n10, i10 = 0;
          return function t11() {
            for (; n10 = e11.stack.pop(); ) try {
              if (!n10.async && 1 === i10) return i10 = 0, e11.stack.push(n10), Promise.resolve().then(t11);
              if (n10.dispose) {
                var s10 = n10.dispose.call(n10.value);
                if (n10.async) return i10 |= 2, Promise.resolve(s10).then(t11, function(e12) {
                  return r10(e12), t11();
                });
              } else i10 |= 1;
            } catch (e12) {
              r10(e12);
            }
            if (1 === i10) return e11.hasError ? Promise.reject(e11.error) : Promise.resolve();
            if (e11.hasError) throw e11.error;
          }();
        })(e10);
      }
      async function oT(e10, t10, r10) {
        var n10;
        let i10 = await (n10 = { baseUrl: t10, relativePath: "manifest.ocdbt" }, e10.chunkManager.memoize.get("ocdbt:manifest", () => {
          let t11 = new iM(e10.chunkManager.addRef(), { get: async (t12, r11) => {
            let n11 = { stack: [], error: void 0, hasError: false };
            try {
              let i11 = (0, ip.Yq)(t12.baseUrl, t12.relativePath);
              !function(e11, t13, r12) {
                if (null != t13) {
                  var n12, i12;
                  if ("object" != typeof t13 && "function" != typeof t13) throw TypeError("Object expected.");
                  if (r12) {
                    if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
                    n12 = t13[Symbol.asyncDispose];
                  }
                  if (void 0 === n12) {
                    if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
                    n12 = t13[Symbol.dispose], r12 && (i12 = n12);
                  }
                  if ("function" != typeof n12) throw TypeError("Object not disposable.");
                  i12 && (n12 = function() {
                    try {
                      i12.call(this);
                    } catch (e12) {
                      return Promise.reject(e12);
                    }
                  }), e11.stack.push({ value: t13, dispose: n12, async: r12 });
                } else r12 && e11.stack.push({ async: true });
              }(n11, new x.Vi(r11.progressListener, { message: `Reading OCDBT manifest from ${i11}` }), false);
              let s10 = await e10.kvStoreContext.read(i11, { ...r11, throwIfMissing: true });
              try {
                let e11 = await oM(await s10.response.arrayBuffer(), t12.baseUrl, r11.signal);
                return { data: e11, size: e11.estimatedSize };
              } catch (e11) {
                throw Error(`Error reading OCDBT manifest from ${i11}`, { cause: e11 });
              }
            } catch (e11) {
              n11.error = e11, n11.hasError = true;
            } finally {
              ox(n11);
            }
          } });
          return t11.registerDisposer(e10.addRef()), t11;
        }).get(n10, r10));
        if (void 0 === i10.versionTree) throw Error("only manifest_kind=single is supported");
        return i10;
      }
      function oC(e10, t10, r10) {
        let n10 = new iM(e10.chunkManager.addRef(), { get: async (n11, i10) => {
          let { dataFile: s10 } = n11, a10 = (0, ip.Yq)(s10.baseUrl, s10.relativePath), o10 = await e10.kvStoreContext.read(a10, { ...i10, throwIfMissing: true, byteRange: { offset: Number(n11.offset), length: Number(n11.length) } });
          try {
            let e11 = await r10(await o10.response.arrayBuffer(), s10.baseUrl, i10.signal);
            return { data: e11, size: e11.estimatedSize };
          } catch (e11) {
            throw Error(`Error reading OCDBT ${t10} from ${a10}`, { cause: e11 });
          }
        }, encodeKey: ({ dataFile: e11, offset: t11, length: r11 }) => JSON.stringify([e11, `${t11}/${r11}`]) });
        return n10.registerDisposer(e10.addRef()), n10;
      }
      function oN(e10, t10, r10) {
        return e10.chunkManager.memoize.get("ocdbt:btree", () => oC(e10, "b+tree node", oi)).get(t10, r10);
      }
      function o$(e10, t10, r10) {
        return e10.chunkManager.memoize.get("ocdbt:versionnode", () => oC(e10, "version tree node", of)).get(t10, r10);
      }
      async function oR(e10, t10, r10, n10) {
        let i10 = [], s10 = /* @__PURE__ */ new Set();
        return or(t10.root.location) || await oP(t10.root, t10.rootHeight, a6, 0, { sharedKvStoreContext: e10, prefix: r10, entries: i10, directories: s10, signal: n10.signal, progressListener: n10.progressListener }), (0, iN.Mt)({ entries: i10, directories: Array.from(s10) });
      }
      async function oP(e10, t10, r10, n10, i10) {
        i10.signal?.throwIfAborted();
        let s10 = await oN(i10.sharedKvStoreContext, e10.location, i10);
        ol(s10, t10, r10.subarray(n10));
        let a10 = a9(r10.subarray(0, n10), s10.keyPrefix), o10 = (e11) => {
          try {
            i10.directories.add(new TextDecoder("utf-8", { fatal: true }).decode(e11));
          } catch {
          }
        }, { prefix: l2 } = i10;
        {
          let { offset: e11, difference: t11 } = a5(l2, a10);
          if (0 !== t11 && e11 < Math.min(l2.length, a10.length)) return;
        }
        if (l2.length < a10.length) {
          let e11 = a10.indexOf(47, l2.length);
          if (-1 !== e11) {
            o10(a10.subarray(0, e11));
            return;
          }
        }
        let u2 = l2.subarray(a10.length);
        if (s10.height > 0) {
          let e11 = s10.entries, [r11, n11] = function(e12, t11) {
            let r12 = Math.max(0, eD(0, e12.length, (r13) => a8(e12[r13].key, t11) > 0) - 1), n12 = ou(e12, r12, e12.length, t11);
            return [r12, n12];
          }(e11, u2), l3 = [];
          for (let s11 = r11; s11 < n11; ) {
            let r12 = e11[s11];
            ++s11;
            let { key: h2 } = r12, { subtreeCommonPrefixLength: c2 } = r12;
            if (c2 > u2.length) {
              let t11 = h2.indexOf(47, u2.length);
              if (-1 !== t11) {
                let r13 = h2.subarray(0, t11);
                o10(a9(a10, r13)), s11 = ou(e11, s11, n11, r13);
                continue;
              }
            }
            l3.push(oP(r12.node, t10 - 1, a9(a10, r12.key), a10.length + r12.subtreeCommonPrefixLength, i10));
          }
          await Promise.all(l3);
        } else {
          let e11 = s10.entries, [t11, r11] = function(e12, t12) {
            let r12 = eD(0, e12.length, (r13) => a8(e12[r13].key, t12) >= 0), n11 = ou(e12, r12, e12.length, t12);
            return [r12, n11];
          }(e11, u2);
          for (let n11 = t11; n11 < r11; ) {
            let t12 = e11[n11];
            ++n11;
            let { key: s11 } = t12, l3 = s11.indexOf(47, u2.length);
            if (-1 !== l3) {
              o10(a9(a10, s11.subarray(0, l3))), n11 = ou(e11, n11, r11, s11.subarray(0, l3 + 1));
              continue;
            }
            try {
              i10.entries.push({ key: new TextDecoder("utf-8", { fatal: true }).decode(a9(a10, s11)) });
            } catch {
            }
          }
        }
      }
      async function oO(e10, t10, r10, n10) {
        if (!or(t10.root.location)) return await oU(e10, t10.root, t10.rootHeight, a6, r10, n10);
      }
      async function oU(e10, t10, r10, n10, i10, s10) {
        for (; ; ) {
          let a10 = await oN(e10, t10.location, s10);
          if (ol(a10, r10, n10), !a7(i10, a10.keyPrefix)) return;
          if (0 === a10.height) return function(e11, t11) {
            let r11 = eL(e11, t11, (e12, t12) => a8(e12, t12.key));
            if (!(r11 < 0)) return e11[r11];
          }(a10.entries, i10);
          let o10 = function(e11, t11) {
            let r11 = eD(0, e11.length, (r12) => a8(e11[r12].key, t11) > 0);
            if (0 === r11) return;
            let n11 = e11[r11 - 1], { subtreeCommonPrefixLength: i11 } = n11;
            if (0 === i11 || a7(t11, n11.key.subarray(0, i11))) return n11;
          }(a10.entries, i10);
          if (void 0 === o10) return;
          let { subtreeCommonPrefixLength: l2 } = o10;
          i10 = i10.subarray(l2), t10 = o10.node, n10 = o10.key.subarray(l2), --r10;
        }
      }
      async function o_(e10, t10, r10) {
        let { value: n10 } = t10;
        if (n10 instanceof Uint8Array) return (0, iT._J)(n10, r10.byteRange);
        let { offset: i10, length: s10, dataFile: { baseUrl: a10, relativePath: o10 } } = n10, { store: l2, path: u2 } = e10.kvStoreContext.getKvStore(a10);
        return await new iT.uX(new iN.f2(l2, u2 + o10), { offset: Number(i10), length: Number(s10) }).read(r10);
      }
      var oA = r2(8274);
      async function oL(e10, t10, r10, n10) {
        return e10.chunkManager.memoize.get("ocdbt:version", () => {
          let t11 = new iM(e10.chunkManager.addRef(), { get: async ({ url: t12, version: r11 }, i10) => {
            let s10 = await oT(e10, t12, i10), a10 = await oD(e10, s10, r11, n10);
            if (void 0 === a10) throw Error(`Version ${(0, oA.ko)(r11)} not found`);
            return { data: a10.ref, size: 0 };
          }, encodeKey: ({ url: e11, version: t12 }) => {
            let r11;
            return void 0 !== t12 && (r11 = (0, oA.ko)(t12)), JSON.stringify([e11, r11]);
          } });
          return t11.registerDisposer(e10.addRef()), t11;
        }).get({ url: t10, version: r10 }, n10);
      }
      async function oD(e10, t10, r10, n10) {
        let { versionTree: i10 } = t10;
        if (void 0 === r10) {
          let { versionTreeNodes: e11, inlineVersions: t11 } = i10, r11 = t11.length - 1;
          return { ref: t11[r11], generationIndex: (e11.at(-1)?.cumulativeNumGenerations ?? 0n) + BigInt(r11) };
        }
        let { ref: s10, generationIndex: a10 } = await oV(e10, t10, r10, n10);
        if (void 0 !== s10) return { ref: s10, generationIndex: a10 };
      }
      async function oz(e10, t10, r10, n10) {
        let { generationIndex: i10 } = await oG(e10, t10, r10, n10);
        return i10;
      }
      async function oB(e10, t10, r10, n10) {
        let { generationIndex: i10 } = await oK(e10, t10, r10, n10);
        return i10;
      }
      function oj(e10) {
        let { isInline: t10, findInLeaf: r10, findInInterior: n10 } = e10;
        async function i10(e11, t11, i11, s10, a10, o10) {
          for (; ; ) {
            let l2 = await o$(e11, s10.location, o10);
            if (oI(l2, t11, s10.generationNumber, s10.height, s10.numGenerations), 0 === l2.height) {
              let e12 = l2.entries, n11 = r10(t11, i11, e12, a10);
              return { ref: e12[n11], generationIndex: i11 + BigInt(n11) };
            }
            let u2 = n10(t11, i11, l2.entries, a10);
            if (void 0 === u2) return { ref: void 0, generationIndex: i11 };
            i11 += (s10 = u2).cumulativeNumGenerations - s10.numGenerations;
          }
        }
        return async function(e11, s10, a10, o10) {
          let { config: l2, versionTree: u2 } = s10, h2 = u2.versionTreeNodes.at(-1)?.cumulativeNumGenerations ?? 0n, { inlineVersions: c2 } = u2;
          if (t10(l2, h2, c2, a10)) {
            let e12 = r10(l2, h2, c2, a10);
            return { ref: c2[e12], generationIndex: h2 + BigInt(e12) };
          }
          let { versionTreeNodes: d2 } = u2;
          if (0 === d2.length) return { ref: void 0, generationIndex: 0n };
          let f2 = n10(l2, 0n, d2, a10);
          return void 0 === f2 ? { ref: void 0, generationIndex: 0n } : await i10(e11, s10.config, 0n + f2.cumulativeNumGenerations - f2.numGenerations, f2, a10, o10);
        };
      }
      function oF(e10, t10, r10) {
        return "generationIndex" in r10 ? r10.generationIndex >= e10 : ov(r10, t10[0]) >= 0;
      }
      let oV = oj({ isInline: (e10, t10, r10, n10) => oF(t10, r10, n10), findInLeaf: (e10, t10, r10, n10) => function(e11, t11, r11) {
        if ("generationNumber" in r11) return function(e12, t12) {
          let r12 = eL(e12, t12, (e13, t13) => (0, tW._f)(e13, t13.generationNumber));
          return r12 < 0 ? e12.length : r12;
        }(t11, r11.generationNumber);
        if (!("generationIndex" in r11)) return function(e12, t12) {
          let r12 = eD(0, e12.length, (r13) => e12[r13].commitTime > t12);
          return 0 === r12 ? e12.length : r12 - 1;
        }(t11, r11.commitTime);
        {
          let { generationIndex: n11 } = r11;
          return (n11 -= e11) < 0n ? -1 : n11 >= BigInt(t11.length) ? t11.length : Number(n11);
        }
      }(t10, r10, n10), findInInterior: (e10, t10, r10, n10) => {
        var i10;
        return i10 = e10.versionTreeArityLog2, "generationIndex" in n10 ? r10[ow(r10, n10.generationIndex - t10)] : "generationNumber" in n10 ? function(e11, t11, r11) {
          let n11 = eD(0, t11.length, (e12) => t11[e12].generationNumber >= r11);
          if (n11 === t11.length) return;
          let i11 = t11[n11];
          if (!(oc(e11, i11.height, i11.generationNumber) > r11)) return i11;
        }(i10, r10, n10.generationNumber) : function(e11, t11) {
          let r11 = eD(0, e11.length, (r12) => e11[r12].commitTime > t11);
          if (0 !== r11) return e11[r11 - 1];
        }(r10, n10.commitTime);
      } }), oG = oj({ isInline: (e10, t10, r10, n10) => oF(t10, r10, n10), findInLeaf: (e10, t10, r10, n10) => ob(t10, r10, n10), findInInterior(e10, t10, r10, n10) {
        let i10 = oS(e10.versionTreeArityLog2, t10, r10, n10);
        return r10[i10];
      } }), oK = oj({ isInline: (e10, t10, r10, n10) => oF(t10, r10, n10), findInLeaf: (e10, t10, r10, n10) => ob(t10, r10, n10), findInInterior(e10, t10, r10, n10) {
        let i10 = ok(t10, r10, n10);
        return r10[i10];
      } });
      var oq = r2(9922);
      class oY {
        constructor(e10, t10, r10) {
          __publicField(this, "sharedKvStoreContext");
          __publicField(this, "baseUrl");
          __publicField(this, "version");
          __publicField(this, "root");
          this.sharedKvStoreContext = e10, this.baseUrl = t10, this.version = r10;
        }
        async getRoot(e10) {
          let { root: t10 } = this;
          return void 0 === t10 && (t10 = this.root = await oL(this.sharedKvStoreContext, this.baseUrl, this.version, e10)), t10;
        }
        getUrl(e10) {
          return (0, oq.k)(this, e10);
        }
        async stat(e10, t10) {
          let r10 = await this.getRoot(t10), n10 = new TextEncoder().encode(e10), i10 = await oO(this.sharedKvStoreContext, r10, n10, t10);
          if (void 0 === i10) return;
          let { value: s10 } = i10;
          return { totalSize: Number(s10.length) };
        }
        async read(e10, t10) {
          let r10 = await this.getRoot(t10), n10 = new TextEncoder().encode(e10), i10 = await oO(this.sharedKvStoreContext, r10, n10, t10);
          if (void 0 !== i10) return await o_(this.sharedKvStoreContext, i10, t10);
        }
        async list(e10, t10) {
          let r10 = await this.getRoot(t10), n10 = new TextEncoder().encode(e10);
          return await oR(this.sharedKvStoreContext, r10, n10, t10);
        }
        get supportsOffsetReads() {
          return true;
        }
        get supportsSuffixReads() {
          return true;
        }
      }
      async function oJ(e10, t10, r10) {
        let n10;
        let { inclusiveMin: i10, exclusiveMax: s10 } = r10, a10 = void 0 === i10 ? { generationIndex: 0n } : i10, o10 = void 0 === s10 ? { generationIndex: t10.versionTree.numGenerations } : s10, { config: l2, versionTree: u2 } = t10, { versionTreeArityLog2: h2 } = l2, c2 = [];
        function d2(e11, t11) {
          let r11 = ob(e11, t11, a10), i11 = ob(e11, t11, o10), s11 = e11 + BigInt(r11);
          (void 0 === n10 || s11 < n10) && (n10 = s11);
          for (let e12 = r11; e12 < i11; ++e12) c2.push(t11[e12]);
        }
        async function f2(e11, t11) {
          r10.signal?.throwIfAborted();
          let n11 = oS(h2, e11, t11, a10), i11 = ok(e11, t11, o10), s11 = [];
          for (let r11 = n11; r11 < i11; ++r11) {
            let n12 = t11[r11];
            s11.push(g2(e11 + n12.cumulativeNumGenerations - n12.numGenerations, n12));
          }
          await Promise.all(s11);
        }
        async function g2(t11, n11) {
          let i11 = await o$(e10, n11.location, r10);
          oI(i11, l2, n11.generationNumber, n11.height, n11.numGenerations), 0 === i11.height ? d2(t11, i11.entries) : await f2(t11, i11.entries);
        }
        return d2(u2.versionTreeNodes.at(-1)?.cumulativeNumGenerations ?? 0n, u2.inlineVersions), await f2(0n, u2.versionTreeNodes), c2.sort((e11, t11) => (0, tW._f)(e11.generationNumber, t11.generationNumber)), { generationIndex: n10 ?? 0n, versions: c2 };
      }
      async function oW(e10, t10, r10, n10, i10, s10) {
        if (n10 <= r10 + i10) {
          let { versions: i11 } = await oJ(e10, t10, { inclusiveMin: { generationIndex: r10 }, exclusiveMax: { generationIndex: n10 }, ...s10 });
          return i11;
        }
        let [{ versions: a10 }, { versions: o10 }] = await Promise.all([r10, n10 - i10 / 2n].map((r11) => oJ(e10, t10, { inclusiveMin: { generationIndex: r11 }, exclusiveMax: { generationIndex: r11 + i10 / 2n }, ...s10 })));
        return [...a10, ...o10];
      }
      async function oZ(e10, t10) {
        let { url: r10 } = t10, n10 = r10.suffix ?? "";
        if ("" === n10) return { offset: 0, completions: [{ value: "@", description: "Version specifier" }] };
        let i10 = n10.match(/^@([^/]*)((?:\/|$).*)/);
        if (null === i10) return;
        let [, s10, a10] = i10;
        if ("" !== a10) {
          (0, oA.wy)(s10);
          return;
        }
        let { base: o10 } = t10, l2 = o10.store.getUrl((0, ip.V8)(o10.path));
        if (!s10.startsWith("v")) {
          let [r11, n11] = (0, oA.Qf)(s10), i11 = { signal: t10.signal, progressListener: t10.progressListener }, a11 = await oT(e10, l2, i11), [o11, u2] = await Promise.all([oz(e10, a11, { commitTime: r11 }, i11), oB(e10, a11, { commitTime: n11 + 1n }, i11)]), h2 = (await oW(e10, a11, o11, u2, 100n, { signal: t10.signal, progressListener: t10.progressListener })).map((e11) => ({ value: `${(0, oA.ZU)(e11.commitTime)}/`, description: `v${e11.generationNumber}` }));
          return h2.reverse(), { offset: 1, completions: h2 };
        }
        if ("v" === s10) {
          let { base: r11 } = t10, n11 = (await oT(e10, r11.store.getUrl(r11.path), t10)).versionTree.inlineVersions.map((e11) => ({ value: `v${e11.generationNumber}/`, description: (0, oA.ZU)(e11.commitTime) }));
          return n11.reverse(), { offset: 1, completions: n11 };
        }
        return { offset: 1, completions: [{ value: `${s10}/` }] };
      }
      eR.registerKvStoreAdapterProvider(function(e10) {
        return { scheme: "ocdbt", description: "OCDBT database", getKvStore(t10, r10) {
          let { baseUrl: n10, version: i10, path: s10 } = (0, oq.r)(t10, r10);
          return { store: new oY(e10, n10, i10), path: s10 };
        }, completeUrl: (t10) => oZ(e10, t10) };
      });
      var oX = r2(3126);
      class oQ extends oX.S {
        list(e10, t10) {
          return sJ(this.sharedKvStoreContext, this.getUrl(e10), t10);
        }
      }
      (0, oX.X)(eR, oQ);
      var oH = r2(4606);
      async function o0(e10, t10, r10) {
        let n10 = Math.min(65557, t10), i10 = await e10(t10 - n10, n10, r10), s10 = function(e11) {
          let t11 = new DataView(e11.buffer, e11.byteOffset, e11.byteLength), r11 = e11.length;
          for (let e12 = r11 - 22; e12 >= 0; --e12) {
            if (101010256 !== t11.getUint32(e12, true) || t11.getUint16(e12 + 20, true) !== r11 - e12 - 22) continue;
            let n11 = t11.getUint16(e12 + 4, true), i11 = t11.getUint16(e12 + 10, true), s11 = t11.getUint32(e12 + 12, true), a11 = t11.getUint32(e12 + 16, true);
            return { eocdrOffset: e12, diskNumber: n11, entryCount: i11, centralDirectorySize: s11, centralDirectoryOffset: a11 };
          }
        }(i10);
        if (void 0 === s10) throw Error("End of central directory record signature not found; either not a zip file or file is truncated.");
        let { eocdrOffset: a10, diskNumber: o10, entryCount: l2, centralDirectorySize: u2, centralDirectoryOffset: h2 } = s10;
        if (0 !== o10) throw Error(`Multi-volume zip files are not supported. This is volume: ${o10}`);
        let c2 = i10.slice(a10 + 22, i10.length);
        return 65535 === l2 || 4294967295 === h2 ? await o1(e10, a10, c2, r10) : await o2(e10, h2, u2, l2, c2, r10);
      }
      async function o1(e10, t10, r10, n10) {
        let i10 = await e10(t10 - 20, 20, n10), s10 = new DataView(i10.buffer, i10.byteOffset, i10.byteLength);
        if (117853008 !== s10.getUint32(0, true)) throw Error("invalid zip64 end of central directory locator signature");
        let a10 = s10.getBigUint64(8, true), o10 = await e10(Number(a10), 56, n10), l2 = new DataView(o10.buffer, o10.byteOffset, o10.byteLength);
        if (101075792 !== l2.getUint32(0, true)) throw Error("invalid zip64 end of central directory record signature");
        let u2 = l2.getBigUint64(32, true), h2 = l2.getBigUint64(40, true);
        return o2(e10, Number(l2.getBigUint64(48, true)), Number(h2), Number(u2), r10, n10);
      }
      async function o2(e10, t10, r10, n10, i10, s10) {
        let a10 = 0, o10 = await e10(t10, r10, s10), l2 = [], u2 = new DataView(o10.buffer, o10.byteOffset, o10.byteLength), h2 = new TextDecoder();
        for (let e11 = 0; e11 < n10; ++e11) {
          let e12 = u2.getUint32(a10 + 0, true);
          if (33639248 !== e12) throw Error(`invalid central directory file header signature: 0x${e12.toString(16)}`);
          let t11 = u2.getUint16(a10 + 4, true), r11 = u2.getUint16(a10 + 6, true), n11 = u2.getUint16(a10 + 8, true), i11 = u2.getUint16(a10 + 10, true), s11 = u2.getUint16(a10 + 12, true), c2 = u2.getUint16(a10 + 14, true), d2 = u2.getUint32(a10 + 16, true), f2 = u2.getUint32(a10 + 20, true), g2 = u2.getUint32(a10 + 24, true), p2 = u2.getUint16(a10 + 28, true), m2 = u2.getUint16(a10 + 30, true), y2 = u2.getUint16(a10 + 32, true), v2 = u2.getUint16(a10 + 36, true), b2 = u2.getUint32(a10 + 38, true), w2 = u2.getUint32(a10 + 42, true);
          if (64 & n11) throw Error("strong encryption is not supported");
          a10 += 46;
          let S2 = o10.subarray(a10, a10 += p2), E2 = [];
          for (let e13 = 0; e13 < m2 - 3; ) {
            let t12 = u2.getUint16(a10 + e13 + 0, true), r12 = u2.getUint16(a10 + e13 + 2, true), n12 = e13 + 4, i12 = n12 + r12;
            if (i12 > m2) throw Error("extra field length exceeds extra field buffer size");
            E2.push({ id: t12, offset: a10 + n12, length: r12 }), e13 = i12;
          }
          a10 += m2;
          let k2 = o10.slice(a10, a10 += y2);
          if (4294967295 === g2 || 4294967295 === f2 || 4294967295 === w2) {
            let e13 = E2.find((e14) => 1 === e14.id);
            if (void 0 === e13) throw Error("expected zip64 extended information extra field");
            let { offset: t12, length: r12 } = e13, n12 = 0;
            if (4294967295 === g2) {
              if (n12 + 8 > r12) throw Error("zip64 extended information extra field does not include uncompressed size");
              g2 = Number(u2.getBigUint64(t12 + n12, true)), n12 += 8;
            }
            if (4294967295 === f2) {
              if (n12 + 8 > r12) throw Error("zip64 extended information extra field does not include compressed size");
              f2 = Number(u2.getBigUint64(t12 + n12, true)), n12 += 8;
            }
            if (4294967295 === w2) {
              if (n12 + 8 > r12) throw Error("zip64 extended information extra field does not include relative header offset");
              w2 = Number(u2.getBigUint64(t12 + n12, true)), n12 += 8;
            }
          }
          let I2 = E2.find((e13) => 28789 === e13.id && e13.length >= 6 && 1 === o10[e13.offset] && u2.getInt32(e13.offset + 1, true) === (0, oH.buf)(S2));
          if (I2 && (S2 = o10.slice(I2.offset + 5, I2.offset + I2.length)), 0 === i11) {
            let e13 = g2;
            if ((1 & n11) != 0 && (e13 += 12), f2 !== e13) throw Error(`compressed/uncompressed size mismatch for stored file: ${f2} != ${e13}`);
          }
          let M2 = h2.decode(S2);
          M2 = M2.replaceAll("\\", "/");
          let x2 = { versionMadeBy: t11, versionNeededToExtract: r11, generalPurposeBitFlag: n11, compressionMethod: i11, lastModFileTime: s11, lastModFileDate: c2, crc32: d2, compressedSize: f2, uncompressedSize: g2, nameBytes: S2, commentBytes: k2, internalFileAttributes: v2, externalFileAttributes: b2, relativeOffsetOfLocalHeader: w2, fileName: M2 };
          l2.push(x2);
        }
        return { commentBytes: i10, entries: l2, sizeEstimate: i10.length + 2 * o10.length };
      }
      async function o3(e10, t10, r10) {
        if (1 & t10.generalPurposeBitFlag) throw Error("encrypted entries not supported");
        let n10 = await e10(t10.relativeOffsetOfLocalHeader, 30, r10), i10 = new DataView(n10.buffer, n10.byteOffset, n10.byteLength), s10 = i10.getUint32(0, true);
        if (67324752 !== s10) throw Error(`invalid local file header signature: 0x${s10.toString(16)}`);
        let a10 = i10.getUint16(26, true), o10 = i10.getUint16(28, true);
        return t10.relativeOffsetOfLocalHeader + n10.length + a10 + o10;
      }
      async function o4(e10, t10, r10) {
        let n10, i10;
        return await o0((i10 = 0, async function(t11, r11, s10) {
          if (void 0 !== n10 && t11 > i10 && t11 + r11 <= i10 + n10.length) return n10.subarray(t11 - i10, t11 + r11 - i10);
          let a10 = await e10(t11, r11, s10);
          return i10 = t11, n10 = a10, a10;
        }), t10, r10);
      }
      var o6 = ((E = {})[E.STORE = 0] = "STORE", E[E.DEFLATE = 8] = "DEFLATE", E);
      function o8(e10) {
        var t10 = "function" == typeof SuppressedError ? SuppressedError : function(e11, t11, r10) {
          var n10 = Error(r10);
          return n10.name = "SuppressedError", n10.error = e11, n10.suppressed = t11, n10;
        };
        return (o8 = function(e11) {
          function r10(r11) {
            e11.error = e11.hasError ? new t10(r11, e11.error, "An error was suppressed during disposal.") : r11, e11.hasError = true;
          }
          var n10, i10 = 0;
          return function t11() {
            for (; n10 = e11.stack.pop(); ) try {
              if (!n10.async && 1 === i10) return i10 = 0, e11.stack.push(n10), Promise.resolve().then(t11);
              if (n10.dispose) {
                var s10 = n10.dispose.call(n10.value);
                if (n10.async) return i10 |= 2, Promise.resolve(s10).then(t11, function(e12) {
                  return r10(e12), t11();
                });
              } else i10 |= 1;
            } catch (e12) {
              r10(e12);
            }
            if (1 === i10) return e11.hasError ? Promise.reject(e11.error) : Promise.resolve();
            if (e11.hasError) throw e11.error;
          }();
        })(e10);
      }
      function o5(e10) {
        return async (t10, r10, n10) => {
          let i10 = await (0, iN.iT)(e10, { throwIfMissing: true, byteRange: { offset: t10, length: r10 }, strictByteRange: true, signal: n10.signal, progressListener: n10.progressListener });
          return new Uint8Array(await i10.response.arrayBuffer());
        };
      }
      async function o9(e10, t10, r10) {
        let n10 = function(e11, t11) {
          var r11, n11;
          let i10 = t11.getUrl();
          return r11 = `zipMetadata:${i10}`, n11 = { get: async (e12, r12) => {
            let n12 = { stack: [], error: void 0, hasError: false };
            try {
              !function(e14, t12, r13) {
                if (null != t12) {
                  var n13, i11;
                  if ("object" != typeof t12 && "function" != typeof t12) throw TypeError("Object expected.");
                  if (r13) {
                    if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
                    n13 = t12[Symbol.asyncDispose];
                  }
                  if (void 0 === n13) {
                    if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
                    n13 = t12[Symbol.dispose], r13 && (i11 = n13);
                  }
                  if ("function" != typeof n13) throw TypeError("Object not disposable.");
                  i11 && (n13 = function() {
                    try {
                      i11.call(this);
                    } catch (e15) {
                      return Promise.reject(e15);
                    }
                  }), e14.stack.push({ value: t12, dispose: n13, async: r13 });
                } else r13 && e14.stack.push({ async: true });
              }(n12, new x.Vi(r12.progressListener, { message: `Reading ZIP central directory from ${i10}` }), false);
              let e13 = await t11.stat(r12);
              if (e13?.totalSize === void 0) throw Error(`Failed to determine ZIP file size: ${i10}`);
              let s10 = await o4(o5(t11), e13.totalSize, r12);
              return function(e14, t12) {
                let r13 = e14.length, n13 = 0;
                for (let i11 = 0; i11 < r13; ++i11) t12(e14[i11], i11, e14) && (e14[n13] = e14[i11], ++n13);
                e14.length = n13;
              }(s10.entries, (e14) => !e14.fileName.endsWith("/")), s10.entries.sort((e14, t12) => (0, nL.B)(e14.fileName, t12.fileName)), { data: s10, size: s10.sizeEstimate };
            } catch (e13) {
              n12.error = e13, n12.hasError = true;
            } finally {
              o8(n12);
            }
          } }, e11.memoize.get(`simpleAsyncCache:${r11}`, () => new iM(e11.addRef(), n11));
        }(e10, t10);
        try {
          return await n10.get(void 0, r10);
        } finally {
          n10.dispose();
        }
      }
      function o7(e10, t10) {
        let { entries: r10 } = e10, n10 = eL(r10, t10, (e11, t11) => (0, nL.B)(e11, t11.fileName));
        if (!(n10 < 0)) return r10[n10];
      }
      class le {
        constructor(e10, t10) {
          __publicField(this, "chunkManager");
          __publicField(this, "base");
          __publicField(this, "metadata");
          this.chunkManager = e10, this.base = t10;
        }
        async getMetadata(e10) {
          let { metadata: t10 } = this;
          return void 0 === t10 && (t10 = this.metadata = await o9(this.chunkManager, this.base, e10)), t10;
        }
        getUrl(e10) {
          return this.base.getUrl() + `|zip:${(0, ip.aU)(e10)}`;
        }
        async stat(e10, t10) {
          let r10 = o7(await this.getMetadata(t10), e10);
          if (void 0 !== r10) return { totalSize: r10.uncompressedSize };
        }
        async read(e10, t10) {
          let r10 = o7(await this.getMetadata(t10), e10);
          if (void 0 === r10) return;
          let { fileDataStart: n10 } = r10;
          void 0 === n10 && (n10 = r10.fileDataStart = await o3(o5(this.base), r10, t10));
          let i10 = new iT.uX(this.base, { offset: n10, length: r10.compressedSize });
          switch (r10.compressionMethod) {
            case o6.STORE:
              break;
            case o6.DEFLATE:
              i10 = new iC.Ll(i10, "deflate-raw");
              break;
            default:
              throw Error(`Unsupported compression method: ${r10.compressionMethod}`);
          }
          return i10.read(t10);
        }
        async list(e10, t10) {
          return function(e11, t11) {
            let { entries: r10 } = e11, n10 = eD(0, r10.length, (e12) => r10[e12].fileName >= t11), i10 = eD(Math.min(r10.length, n10 + 1), r10.length, (e12) => !r10[e12].fileName.startsWith(t11)), s10 = [], a10 = [];
            for (let e12 = n10; e12 < i10; ) {
              let n11 = r10[e12], o10 = n11.fileName.indexOf("/", t11.length);
              if (-1 === o10) s10.push({ key: n11.fileName }), ++e12;
              else {
                a10.push(n11.fileName.substring(0, o10));
                let t12 = n11.fileName.substring(0, o10 + 1);
                e12 = eD(e12 + 1, i10, (e13) => !r10[e13].fileName.startsWith(t12));
              }
            }
            return { entries: s10, directories: a10 };
          }(await this.getMetadata(t10), e10);
        }
        get supportsOffsetReads() {
          return true;
        }
        get supportsSuffixReads() {
          return true;
        }
      }
      eR.registerKvStoreAdapterProvider(function(e10) {
        return { scheme: "zip", description: "ZIP archive", getKvStore: (t10, r10) => ((0, ip.uh)(t10), { store: new le(e10.chunkManager, new iN.f2(r10.store, r10.path)), path: decodeURIComponent(t10.suffix ?? "") }) };
      });
      let lt = new class {
        constructor(e10, t10) {
          __publicField(this, "target");
          __publicField(this, "objects");
          __publicField(this, "nextId");
          __publicField(this, "queue");
          this.target = e10, this.objects = /* @__PURE__ */ new Map(), this.nextId = L, t10 && (this.queue = []), e10.onmessage = (e11) => {
            let t11 = e11.data;
            if (void 0 === O.get(t11.functionName)) throw Error(`Missing RPC function: ${t11.functionName}`);
            O.get(t11.functionName).call(this, t11);
          };
        }
        sendReady() {
          this.invoke(P, {});
        }
        onPeerReady() {
          let { queue: e10 } = this;
          if (void 0 !== e10) for (let { data: t10, transfers: r10 } of (this.queue = void 0, e10)) this.target.postMessage(t10, r10);
        }
        get numObjects() {
          return this.objects.size;
        }
        set(e10, t10) {
          this.objects.set(e10, t10);
        }
        delete(e10) {
          this.objects.delete(e10);
        }
        get(e10) {
          return this.objects.get(e10);
        }
        getRef(e10) {
          let t10 = e10.id, r10 = this.get(t10);
          return r10.referencedGeneration = e10.gen, r10.addRef(), r10;
        }
        getOptionalRef(e10) {
          if (void 0 === e10) return;
          let t10 = e10.id, r10 = this.get(t10);
          return r10.referencedGeneration = e10.gen, r10.addRef(), r10;
        }
        invoke(e10, t10, r10) {
          t10.functionName = e10;
          let { queue: n10 } = this;
          if (void 0 !== n10) {
            n10.push({ data: t10, transfers: r10 });
            return;
          }
          this.target.postMessage(t10, r10);
        }
        promiseInvoke(e10, t10, r10) {
          let n10, i10, s10;
          if (void 0 !== r10 && ({ signal: n10, progressListener: i10, transfers: s10 } = r10), n10?.aborted) return Promise.reject(n10.reason);
          void 0 !== i10 && (t10.progressListener = true);
          let a10 = t10.id = this.newId();
          this.invoke(e10, t10, s10);
          let { promise: o10, resolve: l2, reject: u2 } = void 0 === n10 ? Promise.withResolvers() : (0, I.L0)(n10, () => {
            this.invoke(N, { id: a10 });
          });
          return this.set(a10, { resolve: l2, reject: u2, progressListener: i10 }), o10;
        }
        newId() {
          return T ? this.nextId-- : this.nextId++;
        }
      }(self, false);
      lt.sendReady(), globalThis.rpc = lt;
    } }, t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var s = t[n] = { exports: {} };
      return e[n].call(s.exports, s, s.exports, r), s.exports;
    }
    r.m = e, r.x = () => {
      var e2 = r.O(void 0, ["822", "213", "451", "51"], function() {
        return r(1949);
      });
      return r.O(e2);
    }, r.n = function(e2) {
      var t2 = e2 && e2.__esModule ? function() {
        return e2.default;
      } : function() {
        return e2;
      };
      return r.d(t2, { a: t2 }), t2;
    }, r.d = function(e2, t2) {
      for (var n in t2) r.o(t2, n) && !r.o(e2, n) && Object.defineProperty(e2, n, { enumerable: true, get: t2[n] });
    }, r.f = {}, r.e = function(e2) {
      return Promise.all(Object.keys(r.f).reduce(function(t2, n) {
        return r.f[n](e2, t2), t2;
      }, []));
    }, r.u = function(e2) {
      return "451" === e2 ? "451.f4a0ec14850e18f3.js" : "412" === e2 ? "412.266a2166a0f7c078.js" : "" + e2 + "." + { 213: "e4e7d7e2081b694d", 51: "34ccb8152bac0c2a", 822: "f53317e7d19e4212" }[e2] + ".js";
    }, r.g = function() {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || Function("return this")();
      } catch (e2) {
        if ("object" == typeof window) return window;
      }
    }(), r.o = function(e2, t2) {
      return Object.prototype.hasOwnProperty.call(e2, t2);
    }, r.r = function(e2) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
    }, (() => {
      var e2 = [];
      r.O = function(t2, n, i, s) {
        if (n) {
          s = s || 0;
          for (var a = e2.length; a > 0 && e2[a - 1][2] > s; a--) e2[a] = e2[a - 1];
          e2[a] = [n, i, s];
          return;
        }
        for (var o = 1 / 0, a = 0; a < e2.length; a++) {
          for (var n = e2[a][0], i = e2[a][1], s = e2[a][2], l = true, u = 0; u < n.length; u++) (false & s || o >= s) && Object.keys(r.O).every(function(e3) {
            return r.O[e3](n[u]);
          }) ? n.splice(u--, 1) : (l = false, s < o && (o = s));
          if (l) {
            e2.splice(a--, 1);
            var h = i();
            void 0 !== h && (t2 = h);
          }
        }
        return t2;
      };
    })(), r.rv = function() {
      return "1.2.2";
    }, (() => {
      var e2 = r.x;
      r.x = function() {
        return Promise.all(["822", "213", "451", "51"].map(r.e, r)).then(e2);
      };
    })(), (() => {
      r.g.importScripts && (e2 = r.g.location + "");
      var e2, t2 = r.g.document;
      if (!e2 && t2 && (t2.currentScript && "SCRIPT" === t2.currentScript.tagName.toUpperCase() && (e2 = t2.currentScript.src), !e2)) {
        var n = t2.getElementsByTagName("script");
        if (n.length) for (var i = n.length - 1; i > -1 && (!e2 || !/^http(s?):/.test(e2)); ) e2 = n[i--].src;
      }
      if (!e2) throw Error("Automatic publicPath is not supported in this browser");
      e2 = e2.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), r.p = e2;
    })(), (() => {
      r.b = self.location + "";
      var e2 = { 468: 1 };
      r.f.i = function(t3, n2) {
        e2[t3] || importScripts(r.p + r.u(t3));
      };
      var t2 = globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || [], n = t2.push.bind(t2);
      t2.push = function(t3) {
        var i = t3[0], s = t3[1], a = t3[2];
        for (var o in s) r.o(s, o) && (r.m[o] = s[o]);
        for (a && a(r); i.length; ) e2[i.pop()] = 1;
        n(t3);
      };
    })(), r.ruid = "bundler=rspack@1.2.2", r.x();
  })();
})();
