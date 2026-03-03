(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  (globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || []).push([["451"], { 4606: function(t, e) {
    var n;
    n = function(t2) {
      t2.version = "1.2.2";
      var e2 = function() {
        for (var t3 = 0, e3 = Array(256), n3 = 0; 256 != n3; ++n3) t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = n3) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1, e3[n3] = t3;
        return "undefined" != typeof Int32Array ? new Int32Array(e3) : e3;
      }(), n2 = function(t3) {
        var e3 = 0, n3 = 0, i2 = 0, r2 = "undefined" != typeof Int32Array ? new Int32Array(4096) : Array(4096);
        for (i2 = 0; 256 != i2; ++i2) r2[i2] = t3[i2];
        for (i2 = 0; 256 != i2; ++i2) for (n3 = t3[i2], e3 = 256 + i2; e3 < 4096; e3 += 256) n3 = r2[e3] = n3 >>> 8 ^ t3[255 & n3];
        var s2 = [];
        for (i2 = 1; 16 != i2; ++i2) s2[i2 - 1] = "undefined" != typeof Int32Array ? r2.subarray(256 * i2, 256 * i2 + 256) : r2.slice(256 * i2, 256 * i2 + 256);
        return s2;
      }(e2), i = n2[0], r = n2[1], s = n2[2], a = n2[3], o = n2[4], u = n2[5], l = n2[6], f = n2[7], h = n2[8], c = n2[9], d = n2[10], p = n2[11], g = n2[12], y = n2[13], v = n2[14];
      t2.table = e2, t2.bstr = function(t3, n3) {
        for (var i2 = -1 ^ n3, r2 = 0, s2 = t3.length; r2 < s2; ) i2 = i2 >>> 8 ^ e2[(i2 ^ t3.charCodeAt(r2++)) & 255];
        return ~i2;
      }, t2.buf = function(t3, n3) {
        for (var m = -1 ^ n3, b = t3.length - 15, _ = 0; _ < b; ) m = v[t3[_++] ^ 255 & m] ^ y[t3[_++] ^ m >> 8 & 255] ^ g[t3[_++] ^ m >> 16 & 255] ^ p[t3[_++] ^ m >>> 24] ^ d[t3[_++]] ^ c[t3[_++]] ^ h[t3[_++]] ^ f[t3[_++]] ^ l[t3[_++]] ^ u[t3[_++]] ^ o[t3[_++]] ^ a[t3[_++]] ^ s[t3[_++]] ^ r[t3[_++]] ^ i[t3[_++]] ^ e2[t3[_++]];
        for (b += 15; _ < b; ) m = m >>> 8 ^ e2[(m ^ t3[_++]) & 255];
        return ~m;
      }, t2.str = function(t3, n3) {
        for (var i2 = -1 ^ n3, r2 = 0, s2 = t3.length, a2 = 0, o2 = 0; r2 < s2; ) (a2 = t3.charCodeAt(r2++)) < 128 ? i2 = i2 >>> 8 ^ e2[(i2 ^ a2) & 255] : a2 < 2048 ? i2 = (i2 = i2 >>> 8 ^ e2[(i2 ^ (192 | a2 >> 6 & 31)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | 63 & a2)) & 255] : a2 >= 55296 && a2 < 57344 ? (a2 = (1023 & a2) + 64, o2 = 1023 & t3.charCodeAt(r2++), i2 = (i2 = (i2 = (i2 = i2 >>> 8 ^ e2[(i2 ^ (240 | a2 >> 8 & 7)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | a2 >> 2 & 63)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | o2 >> 6 & 15 | (3 & a2) << 4)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | 63 & o2)) & 255]) : i2 = (i2 = (i2 = i2 >>> 8 ^ e2[(i2 ^ (224 | a2 >> 12 & 15)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | a2 >> 6 & 63)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | 63 & a2)) & 255];
        return ~i2;
      };
    }, "undefined" == typeof DO_NOT_EXPORT_CRC ? n(e) : n({});
  }, 4163: function(t, e) {
    var n;
    n = function(t2) {
      t2.version = "1.2.2";
      var e2 = function() {
        for (var t3 = 0, e3 = Array(256), n3 = 0; 256 != n3; ++n3) t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = n3) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1) ? -2097792136 ^ t3 >>> 1 : t3 >>> 1, e3[n3] = t3;
        return "undefined" != typeof Int32Array ? new Int32Array(e3) : e3;
      }(), n2 = function(t3) {
        var e3 = 0, n3 = 0, i2 = 0, r2 = "undefined" != typeof Int32Array ? new Int32Array(4096) : Array(4096);
        for (i2 = 0; 256 != i2; ++i2) r2[i2] = t3[i2];
        for (i2 = 0; 256 != i2; ++i2) for (n3 = t3[i2], e3 = 256 + i2; e3 < 4096; e3 += 256) n3 = r2[e3] = n3 >>> 8 ^ t3[255 & n3];
        var s2 = [];
        for (i2 = 1; 16 != i2; ++i2) s2[i2 - 1] = "undefined" != typeof Int32Array ? r2.subarray(256 * i2, 256 * i2 + 256) : r2.slice(256 * i2, 256 * i2 + 256);
        return s2;
      }(e2), i = n2[0], r = n2[1], s = n2[2], a = n2[3], o = n2[4], u = n2[5], l = n2[6], f = n2[7], h = n2[8], c = n2[9], d = n2[10], p = n2[11], g = n2[12], y = n2[13], v = n2[14];
      t2.table = e2, t2.bstr = function(t3, n3) {
        for (var i2 = -1 ^ n3, r2 = 0, s2 = t3.length; r2 < s2; ) i2 = i2 >>> 8 ^ e2[(i2 ^ t3.charCodeAt(r2++)) & 255];
        return ~i2;
      }, t2.buf = function(t3, n3) {
        for (var m = -1 ^ n3, b = t3.length - 15, _ = 0; _ < b; ) m = v[t3[_++] ^ 255 & m] ^ y[t3[_++] ^ m >> 8 & 255] ^ g[t3[_++] ^ m >> 16 & 255] ^ p[t3[_++] ^ m >>> 24] ^ d[t3[_++]] ^ c[t3[_++]] ^ h[t3[_++]] ^ f[t3[_++]] ^ l[t3[_++]] ^ u[t3[_++]] ^ o[t3[_++]] ^ a[t3[_++]] ^ s[t3[_++]] ^ r[t3[_++]] ^ i[t3[_++]] ^ e2[t3[_++]];
        for (b += 15; _ < b; ) m = m >>> 8 ^ e2[(m ^ t3[_++]) & 255];
        return ~m;
      }, t2.str = function(t3, n3) {
        for (var i2 = -1 ^ n3, r2 = 0, s2 = t3.length, a2 = 0, o2 = 0; r2 < s2; ) (a2 = t3.charCodeAt(r2++)) < 128 ? i2 = i2 >>> 8 ^ e2[(i2 ^ a2) & 255] : a2 < 2048 ? i2 = (i2 = i2 >>> 8 ^ e2[(i2 ^ (192 | a2 >> 6 & 31)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | 63 & a2)) & 255] : a2 >= 55296 && a2 < 57344 ? (a2 = (1023 & a2) + 64, o2 = 1023 & t3.charCodeAt(r2++), i2 = (i2 = (i2 = (i2 = i2 >>> 8 ^ e2[(i2 ^ (240 | a2 >> 8 & 7)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | a2 >> 2 & 63)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | o2 >> 6 & 15 | (3 & a2) << 4)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | 63 & o2)) & 255]) : i2 = (i2 = (i2 = i2 >>> 8 ^ e2[(i2 ^ (224 | a2 >> 12 & 15)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | a2 >> 6 & 63)) & 255]) >>> 8 ^ e2[(i2 ^ (128 | 63 & a2)) & 255];
        return ~i2;
      };
    }, "undefined" == typeof DO_NOT_EXPORT_CRC ? n(e) : n({});
  }, 5600: function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, { add: () => S, adjoint: () => d, clone: () => a, copy: () => o, create: () => r, determinant: () => p, equals: () => O, exactEquals: () => C, frob: () => w, fromMat2d: () => M, fromMat4: () => s, fromQuat: () => x, fromRotation: () => _, fromScaling: () => I, fromTranslation: () => b, fromValues: () => u, identity: () => f, invert: () => c, mul: () => k, multiply: () => g, multiplyScalar: () => N, multiplyScalarAndAdd: () => F, normalFromMat4: () => E, projection: () => A, rotate: () => v, scale: () => m, set: () => l, str: () => U, sub: () => B, subtract: () => T, translate: () => y, transpose: () => h });
    var i = n(9685);
    function r() {
      var t2 = new i.WT(9);
      return i.WT != Float32Array && (t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[5] = 0, t2[6] = 0, t2[7] = 0), t2[0] = 1, t2[4] = 1, t2[8] = 1, t2;
    }
    function s(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[4], t2[4] = e2[5], t2[5] = e2[6], t2[6] = e2[8], t2[7] = e2[9], t2[8] = e2[10], t2;
    }
    function a(t2) {
      var e2 = new i.WT(9);
      return e2[0] = t2[0], e2[1] = t2[1], e2[2] = t2[2], e2[3] = t2[3], e2[4] = t2[4], e2[5] = t2[5], e2[6] = t2[6], e2[7] = t2[7], e2[8] = t2[8], e2;
    }
    function o(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[3], t2[4] = e2[4], t2[5] = e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[8] = e2[8], t2;
    }
    function u(t2, e2, n2, r2, s2, a2, o2, u2, l2) {
      var f2 = new i.WT(9);
      return f2[0] = t2, f2[1] = e2, f2[2] = n2, f2[3] = r2, f2[4] = s2, f2[5] = a2, f2[6] = o2, f2[7] = u2, f2[8] = l2, f2;
    }
    function l(t2, e2, n2, i2, r2, s2, a2, o2, u2, l2) {
      return t2[0] = e2, t2[1] = n2, t2[2] = i2, t2[3] = r2, t2[4] = s2, t2[5] = a2, t2[6] = o2, t2[7] = u2, t2[8] = l2, t2;
    }
    function f(t2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 1, t2[5] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 1, t2;
    }
    function h(t2, e2) {
      if (t2 === e2) {
        var n2 = e2[1], i2 = e2[2], r2 = e2[5];
        t2[1] = e2[3], t2[2] = e2[6], t2[3] = n2, t2[5] = e2[7], t2[6] = i2, t2[7] = r2;
      } else t2[0] = e2[0], t2[1] = e2[3], t2[2] = e2[6], t2[3] = e2[1], t2[4] = e2[4], t2[5] = e2[7], t2[6] = e2[2], t2[7] = e2[5], t2[8] = e2[8];
      return t2;
    }
    function c(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = e2[4], o2 = e2[5], u2 = e2[6], l2 = e2[7], f2 = e2[8], h2 = f2 * a2 - o2 * l2, c2 = -f2 * s2 + o2 * u2, d2 = l2 * s2 - a2 * u2, p2 = n2 * h2 + i2 * c2 + r2 * d2;
      return p2 ? (p2 = 1 / p2, t2[0] = h2 * p2, t2[1] = (-f2 * i2 + r2 * l2) * p2, t2[2] = (o2 * i2 - r2 * a2) * p2, t2[3] = c2 * p2, t2[4] = (f2 * n2 - r2 * u2) * p2, t2[5] = (-o2 * n2 + r2 * s2) * p2, t2[6] = d2 * p2, t2[7] = (-l2 * n2 + i2 * u2) * p2, t2[8] = (a2 * n2 - i2 * s2) * p2, t2) : null;
    }
    function d(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = e2[4], o2 = e2[5], u2 = e2[6], l2 = e2[7], f2 = e2[8];
      return t2[0] = a2 * f2 - o2 * l2, t2[1] = r2 * l2 - i2 * f2, t2[2] = i2 * o2 - r2 * a2, t2[3] = o2 * u2 - s2 * f2, t2[4] = n2 * f2 - r2 * u2, t2[5] = r2 * s2 - n2 * o2, t2[6] = s2 * l2 - a2 * u2, t2[7] = i2 * u2 - n2 * l2, t2[8] = n2 * a2 - i2 * s2, t2;
    }
    function p(t2) {
      var e2 = t2[0], n2 = t2[1], i2 = t2[2], r2 = t2[3], s2 = t2[4], a2 = t2[5], o2 = t2[6], u2 = t2[7], l2 = t2[8];
      return e2 * (l2 * s2 - a2 * u2) + n2 * (-l2 * r2 + a2 * o2) + i2 * (u2 * r2 - s2 * o2);
    }
    function g(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = e2[3], o2 = e2[4], u2 = e2[5], l2 = e2[6], f2 = e2[7], h2 = e2[8], c2 = n2[0], d2 = n2[1], p2 = n2[2], g2 = n2[3], y2 = n2[4], v2 = n2[5], m2 = n2[6], b2 = n2[7], _2 = n2[8];
      return t2[0] = c2 * i2 + d2 * a2 + p2 * l2, t2[1] = c2 * r2 + d2 * o2 + p2 * f2, t2[2] = c2 * s2 + d2 * u2 + p2 * h2, t2[3] = g2 * i2 + y2 * a2 + v2 * l2, t2[4] = g2 * r2 + y2 * o2 + v2 * f2, t2[5] = g2 * s2 + y2 * u2 + v2 * h2, t2[6] = m2 * i2 + b2 * a2 + _2 * l2, t2[7] = m2 * r2 + b2 * o2 + _2 * f2, t2[8] = m2 * s2 + b2 * u2 + _2 * h2, t2;
    }
    function y(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = e2[3], o2 = e2[4], u2 = e2[5], l2 = e2[6], f2 = e2[7], h2 = e2[8], c2 = n2[0], d2 = n2[1];
      return t2[0] = i2, t2[1] = r2, t2[2] = s2, t2[3] = a2, t2[4] = o2, t2[5] = u2, t2[6] = c2 * i2 + d2 * a2 + l2, t2[7] = c2 * r2 + d2 * o2 + f2, t2[8] = c2 * s2 + d2 * u2 + h2, t2;
    }
    function v(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = e2[3], o2 = e2[4], u2 = e2[5], l2 = e2[6], f2 = e2[7], h2 = e2[8], c2 = Math.sin(n2), d2 = Math.cos(n2);
      return t2[0] = d2 * i2 + c2 * a2, t2[1] = d2 * r2 + c2 * o2, t2[2] = d2 * s2 + c2 * u2, t2[3] = d2 * a2 - c2 * i2, t2[4] = d2 * o2 - c2 * r2, t2[5] = d2 * u2 - c2 * s2, t2[6] = l2, t2[7] = f2, t2[8] = h2, t2;
    }
    function m(t2, e2, n2) {
      var i2 = n2[0], r2 = n2[1];
      return t2[0] = i2 * e2[0], t2[1] = i2 * e2[1], t2[2] = i2 * e2[2], t2[3] = r2 * e2[3], t2[4] = r2 * e2[4], t2[5] = r2 * e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[8] = e2[8], t2;
    }
    function b(t2, e2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 1, t2[5] = 0, t2[6] = e2[0], t2[7] = e2[1], t2[8] = 1, t2;
    }
    function _(t2, e2) {
      var n2 = Math.sin(e2), i2 = Math.cos(e2);
      return t2[0] = i2, t2[1] = n2, t2[2] = 0, t2[3] = -n2, t2[4] = i2, t2[5] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 1, t2;
    }
    function I(t2, e2) {
      return t2[0] = e2[0], t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = e2[1], t2[5] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 1, t2;
    }
    function M(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = 0, t2[3] = e2[2], t2[4] = e2[3], t2[5] = 0, t2[6] = e2[4], t2[7] = e2[5], t2[8] = 1, t2;
    }
    function x(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = n2 + n2, o2 = i2 + i2, u2 = r2 + r2, l2 = n2 * a2, f2 = i2 * a2, h2 = i2 * o2, c2 = r2 * a2, d2 = r2 * o2, p2 = r2 * u2, g2 = s2 * a2, y2 = s2 * o2, v2 = s2 * u2;
      return t2[0] = 1 - h2 - p2, t2[3] = f2 - v2, t2[6] = c2 + y2, t2[1] = f2 + v2, t2[4] = 1 - l2 - p2, t2[7] = d2 - g2, t2[2] = c2 - y2, t2[5] = d2 + g2, t2[8] = 1 - l2 - h2, t2;
    }
    function E(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = e2[4], o2 = e2[5], u2 = e2[6], l2 = e2[7], f2 = e2[8], h2 = e2[9], c2 = e2[10], d2 = e2[11], p2 = e2[12], g2 = e2[13], y2 = e2[14], v2 = e2[15], m2 = n2 * o2 - i2 * a2, b2 = n2 * u2 - r2 * a2, _2 = n2 * l2 - s2 * a2, I2 = i2 * u2 - r2 * o2, M2 = i2 * l2 - s2 * o2, x2 = r2 * l2 - s2 * u2, E2 = f2 * g2 - h2 * p2, A2 = f2 * y2 - c2 * p2, U2 = f2 * v2 - d2 * p2, w2 = h2 * y2 - c2 * g2, S2 = h2 * v2 - d2 * g2, T2 = c2 * v2 - d2 * y2, N2 = m2 * T2 - b2 * S2 + _2 * w2 + I2 * U2 - M2 * A2 + x2 * E2;
      return N2 ? (N2 = 1 / N2, t2[0] = (o2 * T2 - u2 * S2 + l2 * w2) * N2, t2[1] = (u2 * U2 - a2 * T2 - l2 * A2) * N2, t2[2] = (a2 * S2 - o2 * U2 + l2 * E2) * N2, t2[3] = (r2 * S2 - i2 * T2 - s2 * w2) * N2, t2[4] = (n2 * T2 - r2 * U2 + s2 * A2) * N2, t2[5] = (i2 * U2 - n2 * S2 - s2 * E2) * N2, t2[6] = (g2 * x2 - y2 * M2 + v2 * I2) * N2, t2[7] = (y2 * _2 - p2 * x2 - v2 * b2) * N2, t2[8] = (p2 * M2 - g2 * _2 + v2 * m2) * N2, t2) : null;
    }
    function A(t2, e2, n2) {
      return t2[0] = 2 / e2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = -2 / n2, t2[5] = 0, t2[6] = -1, t2[7] = 1, t2[8] = 1, t2;
    }
    function U(t2) {
      return "mat3(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ", " + t2[3] + ", " + t2[4] + ", " + t2[5] + ", " + t2[6] + ", " + t2[7] + ", " + t2[8] + ")";
    }
    function w(t2) {
      return Math.hypot(t2[0], t2[1], t2[2], t2[3], t2[4], t2[5], t2[6], t2[7], t2[8]);
    }
    function S(t2, e2, n2) {
      return t2[0] = e2[0] + n2[0], t2[1] = e2[1] + n2[1], t2[2] = e2[2] + n2[2], t2[3] = e2[3] + n2[3], t2[4] = e2[4] + n2[4], t2[5] = e2[5] + n2[5], t2[6] = e2[6] + n2[6], t2[7] = e2[7] + n2[7], t2[8] = e2[8] + n2[8], t2;
    }
    function T(t2, e2, n2) {
      return t2[0] = e2[0] - n2[0], t2[1] = e2[1] - n2[1], t2[2] = e2[2] - n2[2], t2[3] = e2[3] - n2[3], t2[4] = e2[4] - n2[4], t2[5] = e2[5] - n2[5], t2[6] = e2[6] - n2[6], t2[7] = e2[7] - n2[7], t2[8] = e2[8] - n2[8], t2;
    }
    function N(t2, e2, n2) {
      return t2[0] = e2[0] * n2, t2[1] = e2[1] * n2, t2[2] = e2[2] * n2, t2[3] = e2[3] * n2, t2[4] = e2[4] * n2, t2[5] = e2[5] * n2, t2[6] = e2[6] * n2, t2[7] = e2[7] * n2, t2[8] = e2[8] * n2, t2;
    }
    function F(t2, e2, n2, i2) {
      return t2[0] = e2[0] + n2[0] * i2, t2[1] = e2[1] + n2[1] * i2, t2[2] = e2[2] + n2[2] * i2, t2[3] = e2[3] + n2[3] * i2, t2[4] = e2[4] + n2[4] * i2, t2[5] = e2[5] + n2[5] * i2, t2[6] = e2[6] + n2[6] * i2, t2[7] = e2[7] + n2[7] * i2, t2[8] = e2[8] + n2[8] * i2, t2;
    }
    function C(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1] && t2[2] === e2[2] && t2[3] === e2[3] && t2[4] === e2[4] && t2[5] === e2[5] && t2[6] === e2[6] && t2[7] === e2[7] && t2[8] === e2[8];
    }
    function O(t2, e2) {
      var n2 = t2[0], r2 = t2[1], s2 = t2[2], a2 = t2[3], o2 = t2[4], u2 = t2[5], l2 = t2[6], f2 = t2[7], h2 = t2[8], c2 = e2[0], d2 = e2[1], p2 = e2[2], g2 = e2[3], y2 = e2[4], v2 = e2[5], m2 = e2[6], b2 = e2[7], _2 = e2[8];
      return Math.abs(n2 - c2) <= i.Ib * Math.max(1, Math.abs(n2), Math.abs(c2)) && Math.abs(r2 - d2) <= i.Ib * Math.max(1, Math.abs(r2), Math.abs(d2)) && Math.abs(s2 - p2) <= i.Ib * Math.max(1, Math.abs(s2), Math.abs(p2)) && Math.abs(a2 - g2) <= i.Ib * Math.max(1, Math.abs(a2), Math.abs(g2)) && Math.abs(o2 - y2) <= i.Ib * Math.max(1, Math.abs(o2), Math.abs(y2)) && Math.abs(u2 - v2) <= i.Ib * Math.max(1, Math.abs(u2), Math.abs(v2)) && Math.abs(l2 - m2) <= i.Ib * Math.max(1, Math.abs(l2), Math.abs(m2)) && Math.abs(f2 - b2) <= i.Ib * Math.max(1, Math.abs(f2), Math.abs(b2)) && Math.abs(h2 - _2) <= i.Ib * Math.max(1, Math.abs(h2), Math.abs(_2));
    }
    var k = g, B = T;
  }, 5975: function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, { add: () => G, adjoint: () => c, clone: () => s, copy: () => a, create: () => r, determinant: () => d, equals: () => W, exactEquals: () => Z, frob: () => j, fromQuat: () => k, fromQuat2: () => S, fromRotation: () => x, fromRotationTranslation: () => w, fromRotationTranslationScale: () => C, fromRotationTranslationScaleOrigin: () => O, fromScaling: () => M, fromTranslation: () => I, fromValues: () => o, fromXRotation: () => E, fromYRotation: () => A, fromZRotation: () => U, frustum: () => B, getRotation: () => F, getScaling: () => N, getTranslation: () => T, identity: () => l, invert: () => h, lookAt: () => P, mul: () => K, multiply: () => p, multiplyScalar: () => Y, multiplyScalarAndAdd: () => X, ortho: () => q, perspective: () => D, perspectiveFromFieldOfView: () => z, rotate: () => v, rotateX: () => m, rotateY: () => b, rotateZ: () => _, scale: () => y, set: () => u, str: () => L, sub: () => $, subtract: () => V, targetTo: () => R, translate: () => g, transpose: () => f });
    var i = n(9685);
    function r() {
      var t2 = new i.WT(16);
      return i.WT != Float32Array && (t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0), t2[0] = 1, t2[5] = 1, t2[10] = 1, t2[15] = 1, t2;
    }
    function s(t2) {
      var e2 = new i.WT(16);
      return e2[0] = t2[0], e2[1] = t2[1], e2[2] = t2[2], e2[3] = t2[3], e2[4] = t2[4], e2[5] = t2[5], e2[6] = t2[6], e2[7] = t2[7], e2[8] = t2[8], e2[9] = t2[9], e2[10] = t2[10], e2[11] = t2[11], e2[12] = t2[12], e2[13] = t2[13], e2[14] = t2[14], e2[15] = t2[15], e2;
    }
    function a(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[3], t2[4] = e2[4], t2[5] = e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[8] = e2[8], t2[9] = e2[9], t2[10] = e2[10], t2[11] = e2[11], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15], t2;
    }
    function o(t2, e2, n2, r2, s2, a2, o2, u2, l2, f2, h2, c2, d2, p2, g2, y2) {
      var v2 = new i.WT(16);
      return v2[0] = t2, v2[1] = e2, v2[2] = n2, v2[3] = r2, v2[4] = s2, v2[5] = a2, v2[6] = o2, v2[7] = u2, v2[8] = l2, v2[9] = f2, v2[10] = h2, v2[11] = c2, v2[12] = d2, v2[13] = p2, v2[14] = g2, v2[15] = y2, v2;
    }
    function u(t2, e2, n2, i2, r2, s2, a2, o2, u2, l2, f2, h2, c2, d2, p2, g2, y2) {
      return t2[0] = e2, t2[1] = n2, t2[2] = i2, t2[3] = r2, t2[4] = s2, t2[5] = a2, t2[6] = o2, t2[7] = u2, t2[8] = l2, t2[9] = f2, t2[10] = h2, t2[11] = c2, t2[12] = d2, t2[13] = p2, t2[14] = g2, t2[15] = y2, t2;
    }
    function l(t2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = 1, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 1, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function f(t2, e2) {
      if (t2 === e2) {
        var n2 = e2[1], i2 = e2[2], r2 = e2[3], s2 = e2[6], a2 = e2[7], o2 = e2[11];
        t2[1] = e2[4], t2[2] = e2[8], t2[3] = e2[12], t2[4] = n2, t2[6] = e2[9], t2[7] = e2[13], t2[8] = i2, t2[9] = s2, t2[11] = e2[14], t2[12] = r2, t2[13] = a2, t2[14] = o2;
      } else t2[0] = e2[0], t2[1] = e2[4], t2[2] = e2[8], t2[3] = e2[12], t2[4] = e2[1], t2[5] = e2[5], t2[6] = e2[9], t2[7] = e2[13], t2[8] = e2[2], t2[9] = e2[6], t2[10] = e2[10], t2[11] = e2[14], t2[12] = e2[3], t2[13] = e2[7], t2[14] = e2[11], t2[15] = e2[15];
      return t2;
    }
    function h(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = e2[4], o2 = e2[5], u2 = e2[6], l2 = e2[7], f2 = e2[8], h2 = e2[9], c2 = e2[10], d2 = e2[11], p2 = e2[12], g2 = e2[13], y2 = e2[14], v2 = e2[15], m2 = n2 * o2 - i2 * a2, b2 = n2 * u2 - r2 * a2, _2 = n2 * l2 - s2 * a2, I2 = i2 * u2 - r2 * o2, M2 = i2 * l2 - s2 * o2, x2 = r2 * l2 - s2 * u2, E2 = f2 * g2 - h2 * p2, A2 = f2 * y2 - c2 * p2, U2 = f2 * v2 - d2 * p2, w2 = h2 * y2 - c2 * g2, S2 = h2 * v2 - d2 * g2, T2 = c2 * v2 - d2 * y2, N2 = m2 * T2 - b2 * S2 + _2 * w2 + I2 * U2 - M2 * A2 + x2 * E2;
      return N2 ? (N2 = 1 / N2, t2[0] = (o2 * T2 - u2 * S2 + l2 * w2) * N2, t2[1] = (r2 * S2 - i2 * T2 - s2 * w2) * N2, t2[2] = (g2 * x2 - y2 * M2 + v2 * I2) * N2, t2[3] = (c2 * M2 - h2 * x2 - d2 * I2) * N2, t2[4] = (u2 * U2 - a2 * T2 - l2 * A2) * N2, t2[5] = (n2 * T2 - r2 * U2 + s2 * A2) * N2, t2[6] = (y2 * _2 - p2 * x2 - v2 * b2) * N2, t2[7] = (f2 * x2 - c2 * _2 + d2 * b2) * N2, t2[8] = (a2 * S2 - o2 * U2 + l2 * E2) * N2, t2[9] = (i2 * U2 - n2 * S2 - s2 * E2) * N2, t2[10] = (p2 * M2 - g2 * _2 + v2 * m2) * N2, t2[11] = (h2 * _2 - f2 * M2 - d2 * m2) * N2, t2[12] = (o2 * A2 - a2 * w2 - u2 * E2) * N2, t2[13] = (n2 * w2 - i2 * A2 + r2 * E2) * N2, t2[14] = (g2 * b2 - p2 * I2 - y2 * m2) * N2, t2[15] = (f2 * I2 - h2 * b2 + c2 * m2) * N2, t2) : null;
    }
    function c(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = e2[4], o2 = e2[5], u2 = e2[6], l2 = e2[7], f2 = e2[8], h2 = e2[9], c2 = e2[10], d2 = e2[11], p2 = e2[12], g2 = e2[13], y2 = e2[14], v2 = e2[15];
      return t2[0] = o2 * (c2 * v2 - d2 * y2) - h2 * (u2 * v2 - l2 * y2) + g2 * (u2 * d2 - l2 * c2), t2[1] = -(i2 * (c2 * v2 - d2 * y2) - h2 * (r2 * v2 - s2 * y2) + g2 * (r2 * d2 - s2 * c2)), t2[2] = i2 * (u2 * v2 - l2 * y2) - o2 * (r2 * v2 - s2 * y2) + g2 * (r2 * l2 - s2 * u2), t2[3] = -(i2 * (u2 * d2 - l2 * c2) - o2 * (r2 * d2 - s2 * c2) + h2 * (r2 * l2 - s2 * u2)), t2[4] = -(a2 * (c2 * v2 - d2 * y2) - f2 * (u2 * v2 - l2 * y2) + p2 * (u2 * d2 - l2 * c2)), t2[5] = n2 * (c2 * v2 - d2 * y2) - f2 * (r2 * v2 - s2 * y2) + p2 * (r2 * d2 - s2 * c2), t2[6] = -(n2 * (u2 * v2 - l2 * y2) - a2 * (r2 * v2 - s2 * y2) + p2 * (r2 * l2 - s2 * u2)), t2[7] = n2 * (u2 * d2 - l2 * c2) - a2 * (r2 * d2 - s2 * c2) + f2 * (r2 * l2 - s2 * u2), t2[8] = a2 * (h2 * v2 - d2 * g2) - f2 * (o2 * v2 - l2 * g2) + p2 * (o2 * d2 - l2 * h2), t2[9] = -(n2 * (h2 * v2 - d2 * g2) - f2 * (i2 * v2 - s2 * g2) + p2 * (i2 * d2 - s2 * h2)), t2[10] = n2 * (o2 * v2 - l2 * g2) - a2 * (i2 * v2 - s2 * g2) + p2 * (i2 * l2 - s2 * o2), t2[11] = -(n2 * (o2 * d2 - l2 * h2) - a2 * (i2 * d2 - s2 * h2) + f2 * (i2 * l2 - s2 * o2)), t2[12] = -(a2 * (h2 * y2 - c2 * g2) - f2 * (o2 * y2 - u2 * g2) + p2 * (o2 * c2 - u2 * h2)), t2[13] = n2 * (h2 * y2 - c2 * g2) - f2 * (i2 * y2 - r2 * g2) + p2 * (i2 * c2 - r2 * h2), t2[14] = -(n2 * (o2 * y2 - u2 * g2) - a2 * (i2 * y2 - r2 * g2) + p2 * (i2 * u2 - r2 * o2)), t2[15] = n2 * (o2 * c2 - u2 * h2) - a2 * (i2 * c2 - r2 * h2) + f2 * (i2 * u2 - r2 * o2), t2;
    }
    function d(t2) {
      var e2 = t2[0], n2 = t2[1], i2 = t2[2], r2 = t2[3], s2 = t2[4], a2 = t2[5], o2 = t2[6], u2 = t2[7], l2 = t2[8], f2 = t2[9], h2 = t2[10], c2 = t2[11], d2 = t2[12], p2 = t2[13], g2 = t2[14], y2 = t2[15];
      return (e2 * a2 - n2 * s2) * (h2 * y2 - c2 * g2) - (e2 * o2 - i2 * s2) * (f2 * y2 - c2 * p2) + (e2 * u2 - r2 * s2) * (f2 * g2 - h2 * p2) + (n2 * o2 - i2 * a2) * (l2 * y2 - c2 * d2) - (n2 * u2 - r2 * a2) * (l2 * g2 - h2 * d2) + (i2 * u2 - r2 * o2) * (l2 * p2 - f2 * d2);
    }
    function p(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = e2[3], o2 = e2[4], u2 = e2[5], l2 = e2[6], f2 = e2[7], h2 = e2[8], c2 = e2[9], d2 = e2[10], p2 = e2[11], g2 = e2[12], y2 = e2[13], v2 = e2[14], m2 = e2[15], b2 = n2[0], _2 = n2[1], I2 = n2[2], M2 = n2[3];
      return t2[0] = b2 * i2 + _2 * o2 + I2 * h2 + M2 * g2, t2[1] = b2 * r2 + _2 * u2 + I2 * c2 + M2 * y2, t2[2] = b2 * s2 + _2 * l2 + I2 * d2 + M2 * v2, t2[3] = b2 * a2 + _2 * f2 + I2 * p2 + M2 * m2, b2 = n2[4], _2 = n2[5], I2 = n2[6], M2 = n2[7], t2[4] = b2 * i2 + _2 * o2 + I2 * h2 + M2 * g2, t2[5] = b2 * r2 + _2 * u2 + I2 * c2 + M2 * y2, t2[6] = b2 * s2 + _2 * l2 + I2 * d2 + M2 * v2, t2[7] = b2 * a2 + _2 * f2 + I2 * p2 + M2 * m2, b2 = n2[8], _2 = n2[9], I2 = n2[10], M2 = n2[11], t2[8] = b2 * i2 + _2 * o2 + I2 * h2 + M2 * g2, t2[9] = b2 * r2 + _2 * u2 + I2 * c2 + M2 * y2, t2[10] = b2 * s2 + _2 * l2 + I2 * d2 + M2 * v2, t2[11] = b2 * a2 + _2 * f2 + I2 * p2 + M2 * m2, b2 = n2[12], _2 = n2[13], I2 = n2[14], M2 = n2[15], t2[12] = b2 * i2 + _2 * o2 + I2 * h2 + M2 * g2, t2[13] = b2 * r2 + _2 * u2 + I2 * c2 + M2 * y2, t2[14] = b2 * s2 + _2 * l2 + I2 * d2 + M2 * v2, t2[15] = b2 * a2 + _2 * f2 + I2 * p2 + M2 * m2, t2;
    }
    function g(t2, e2, n2) {
      var i2, r2, s2, a2, o2, u2, l2, f2, h2, c2, d2, p2, g2 = n2[0], y2 = n2[1], v2 = n2[2];
      return e2 === t2 ? (t2[12] = e2[0] * g2 + e2[4] * y2 + e2[8] * v2 + e2[12], t2[13] = e2[1] * g2 + e2[5] * y2 + e2[9] * v2 + e2[13], t2[14] = e2[2] * g2 + e2[6] * y2 + e2[10] * v2 + e2[14], t2[15] = e2[3] * g2 + e2[7] * y2 + e2[11] * v2 + e2[15]) : (i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = e2[3], o2 = e2[4], u2 = e2[5], l2 = e2[6], f2 = e2[7], h2 = e2[8], c2 = e2[9], d2 = e2[10], p2 = e2[11], t2[0] = i2, t2[1] = r2, t2[2] = s2, t2[3] = a2, t2[4] = o2, t2[5] = u2, t2[6] = l2, t2[7] = f2, t2[8] = h2, t2[9] = c2, t2[10] = d2, t2[11] = p2, t2[12] = i2 * g2 + o2 * y2 + h2 * v2 + e2[12], t2[13] = r2 * g2 + u2 * y2 + c2 * v2 + e2[13], t2[14] = s2 * g2 + l2 * y2 + d2 * v2 + e2[14], t2[15] = a2 * g2 + f2 * y2 + p2 * v2 + e2[15]), t2;
    }
    function y(t2, e2, n2) {
      var i2 = n2[0], r2 = n2[1], s2 = n2[2];
      return t2[0] = e2[0] * i2, t2[1] = e2[1] * i2, t2[2] = e2[2] * i2, t2[3] = e2[3] * i2, t2[4] = e2[4] * r2, t2[5] = e2[5] * r2, t2[6] = e2[6] * r2, t2[7] = e2[7] * r2, t2[8] = e2[8] * s2, t2[9] = e2[9] * s2, t2[10] = e2[10] * s2, t2[11] = e2[11] * s2, t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15], t2;
    }
    function v(t2, e2, n2, r2) {
      var s2, a2, o2, u2, l2, f2, h2, c2, d2, p2, g2, y2, v2, m2, b2, _2, I2, M2, x2, E2, A2, U2, w2, S2, T2 = r2[0], N2 = r2[1], F2 = r2[2], C2 = Math.hypot(T2, N2, F2);
      return C2 < i.Ib ? null : (T2 *= C2 = 1 / C2, N2 *= C2, F2 *= C2, s2 = Math.sin(n2), o2 = 1 - (a2 = Math.cos(n2)), u2 = e2[0], l2 = e2[1], f2 = e2[2], h2 = e2[3], c2 = e2[4], d2 = e2[5], p2 = e2[6], g2 = e2[7], y2 = e2[8], v2 = e2[9], m2 = e2[10], b2 = e2[11], _2 = T2 * T2 * o2 + a2, I2 = N2 * T2 * o2 + F2 * s2, M2 = F2 * T2 * o2 - N2 * s2, x2 = T2 * N2 * o2 - F2 * s2, E2 = N2 * N2 * o2 + a2, A2 = F2 * N2 * o2 + T2 * s2, U2 = T2 * F2 * o2 + N2 * s2, w2 = N2 * F2 * o2 - T2 * s2, S2 = F2 * F2 * o2 + a2, t2[0] = u2 * _2 + c2 * I2 + y2 * M2, t2[1] = l2 * _2 + d2 * I2 + v2 * M2, t2[2] = f2 * _2 + p2 * I2 + m2 * M2, t2[3] = h2 * _2 + g2 * I2 + b2 * M2, t2[4] = u2 * x2 + c2 * E2 + y2 * A2, t2[5] = l2 * x2 + d2 * E2 + v2 * A2, t2[6] = f2 * x2 + p2 * E2 + m2 * A2, t2[7] = h2 * x2 + g2 * E2 + b2 * A2, t2[8] = u2 * U2 + c2 * w2 + y2 * S2, t2[9] = l2 * U2 + d2 * w2 + v2 * S2, t2[10] = f2 * U2 + p2 * w2 + m2 * S2, t2[11] = h2 * U2 + g2 * w2 + b2 * S2, e2 !== t2 && (t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2);
    }
    function m(t2, e2, n2) {
      var i2 = Math.sin(n2), r2 = Math.cos(n2), s2 = e2[4], a2 = e2[5], o2 = e2[6], u2 = e2[7], l2 = e2[8], f2 = e2[9], h2 = e2[10], c2 = e2[11];
      return e2 !== t2 && (t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[3], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2[4] = s2 * r2 + l2 * i2, t2[5] = a2 * r2 + f2 * i2, t2[6] = o2 * r2 + h2 * i2, t2[7] = u2 * r2 + c2 * i2, t2[8] = l2 * r2 - s2 * i2, t2[9] = f2 * r2 - a2 * i2, t2[10] = h2 * r2 - o2 * i2, t2[11] = c2 * r2 - u2 * i2, t2;
    }
    function b(t2, e2, n2) {
      var i2 = Math.sin(n2), r2 = Math.cos(n2), s2 = e2[0], a2 = e2[1], o2 = e2[2], u2 = e2[3], l2 = e2[8], f2 = e2[9], h2 = e2[10], c2 = e2[11];
      return e2 !== t2 && (t2[4] = e2[4], t2[5] = e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2[0] = s2 * r2 - l2 * i2, t2[1] = a2 * r2 - f2 * i2, t2[2] = o2 * r2 - h2 * i2, t2[3] = u2 * r2 - c2 * i2, t2[8] = s2 * i2 + l2 * r2, t2[9] = a2 * i2 + f2 * r2, t2[10] = o2 * i2 + h2 * r2, t2[11] = u2 * i2 + c2 * r2, t2;
    }
    function _(t2, e2, n2) {
      var i2 = Math.sin(n2), r2 = Math.cos(n2), s2 = e2[0], a2 = e2[1], o2 = e2[2], u2 = e2[3], l2 = e2[4], f2 = e2[5], h2 = e2[6], c2 = e2[7];
      return e2 !== t2 && (t2[8] = e2[8], t2[9] = e2[9], t2[10] = e2[10], t2[11] = e2[11], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2[0] = s2 * r2 + l2 * i2, t2[1] = a2 * r2 + f2 * i2, t2[2] = o2 * r2 + h2 * i2, t2[3] = u2 * r2 + c2 * i2, t2[4] = l2 * r2 - s2 * i2, t2[5] = f2 * r2 - a2 * i2, t2[6] = h2 * r2 - o2 * i2, t2[7] = c2 * r2 - u2 * i2, t2;
    }
    function I(t2, e2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = 1, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 1, t2[11] = 0, t2[12] = e2[0], t2[13] = e2[1], t2[14] = e2[2], t2[15] = 1, t2;
    }
    function M(t2, e2) {
      return t2[0] = e2[0], t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = e2[1], t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = e2[2], t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function x(t2, e2, n2) {
      var r2, s2, a2, o2 = n2[0], u2 = n2[1], l2 = n2[2], f2 = Math.hypot(o2, u2, l2);
      return f2 < i.Ib ? null : (o2 *= f2 = 1 / f2, u2 *= f2, l2 *= f2, r2 = Math.sin(e2), a2 = 1 - (s2 = Math.cos(e2)), t2[0] = o2 * o2 * a2 + s2, t2[1] = u2 * o2 * a2 + l2 * r2, t2[2] = l2 * o2 * a2 - u2 * r2, t2[3] = 0, t2[4] = o2 * u2 * a2 - l2 * r2, t2[5] = u2 * u2 * a2 + s2, t2[6] = l2 * u2 * a2 + o2 * r2, t2[7] = 0, t2[8] = o2 * l2 * a2 + u2 * r2, t2[9] = u2 * l2 * a2 - o2 * r2, t2[10] = l2 * l2 * a2 + s2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2);
    }
    function E(t2, e2) {
      var n2 = Math.sin(e2), i2 = Math.cos(e2);
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = i2, t2[6] = n2, t2[7] = 0, t2[8] = 0, t2[9] = -n2, t2[10] = i2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function A(t2, e2) {
      var n2 = Math.sin(e2), i2 = Math.cos(e2);
      return t2[0] = i2, t2[1] = 0, t2[2] = -n2, t2[3] = 0, t2[4] = 0, t2[5] = 1, t2[6] = 0, t2[7] = 0, t2[8] = n2, t2[9] = 0, t2[10] = i2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function U(t2, e2) {
      var n2 = Math.sin(e2), i2 = Math.cos(e2);
      return t2[0] = i2, t2[1] = n2, t2[2] = 0, t2[3] = 0, t2[4] = -n2, t2[5] = i2, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 1, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function w(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = e2[3], o2 = i2 + i2, u2 = r2 + r2, l2 = s2 + s2, f2 = i2 * o2, h2 = i2 * u2, c2 = i2 * l2, d2 = r2 * u2, p2 = r2 * l2, g2 = s2 * l2, y2 = a2 * o2, v2 = a2 * u2, m2 = a2 * l2;
      return t2[0] = 1 - (d2 + g2), t2[1] = h2 + m2, t2[2] = c2 - v2, t2[3] = 0, t2[4] = h2 - m2, t2[5] = 1 - (f2 + g2), t2[6] = p2 + y2, t2[7] = 0, t2[8] = c2 + v2, t2[9] = p2 - y2, t2[10] = 1 - (f2 + d2), t2[11] = 0, t2[12] = n2[0], t2[13] = n2[1], t2[14] = n2[2], t2[15] = 1, t2;
    }
    function S(t2, e2) {
      var n2 = new i.WT(3), r2 = -e2[0], s2 = -e2[1], a2 = -e2[2], o2 = e2[3], u2 = e2[4], l2 = e2[5], f2 = e2[6], h2 = e2[7], c2 = r2 * r2 + s2 * s2 + a2 * a2 + o2 * o2;
      return c2 > 0 ? (n2[0] = (u2 * o2 + h2 * r2 + l2 * a2 - f2 * s2) * 2 / c2, n2[1] = (l2 * o2 + h2 * s2 + f2 * r2 - u2 * a2) * 2 / c2, n2[2] = (f2 * o2 + h2 * a2 + u2 * s2 - l2 * r2) * 2 / c2) : (n2[0] = (u2 * o2 + h2 * r2 + l2 * a2 - f2 * s2) * 2, n2[1] = (l2 * o2 + h2 * s2 + f2 * r2 - u2 * a2) * 2, n2[2] = (f2 * o2 + h2 * a2 + u2 * s2 - l2 * r2) * 2), w(t2, e2, n2), t2;
    }
    function T(t2, e2) {
      return t2[0] = e2[12], t2[1] = e2[13], t2[2] = e2[14], t2;
    }
    function N(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[4], a2 = e2[5], o2 = e2[6], u2 = e2[8], l2 = e2[9], f2 = e2[10];
      return t2[0] = Math.hypot(n2, i2, r2), t2[1] = Math.hypot(s2, a2, o2), t2[2] = Math.hypot(u2, l2, f2), t2;
    }
    function F(t2, e2) {
      var n2 = new i.WT(3);
      N(n2, e2);
      var r2 = 1 / n2[0], s2 = 1 / n2[1], a2 = 1 / n2[2], o2 = e2[0] * r2, u2 = e2[1] * s2, l2 = e2[2] * a2, f2 = e2[4] * r2, h2 = e2[5] * s2, c2 = e2[6] * a2, d2 = e2[8] * r2, p2 = e2[9] * s2, g2 = e2[10] * a2, y2 = o2 + h2 + g2, v2 = 0;
      return y2 > 0 ? (v2 = 2 * Math.sqrt(y2 + 1), t2[3] = 0.25 * v2, t2[0] = (c2 - p2) / v2, t2[1] = (d2 - l2) / v2, t2[2] = (u2 - f2) / v2) : o2 > h2 && o2 > g2 ? (v2 = 2 * Math.sqrt(1 + o2 - h2 - g2), t2[3] = (c2 - p2) / v2, t2[0] = 0.25 * v2, t2[1] = (u2 + f2) / v2, t2[2] = (d2 + l2) / v2) : h2 > g2 ? (v2 = 2 * Math.sqrt(1 + h2 - o2 - g2), t2[3] = (d2 - l2) / v2, t2[0] = (u2 + f2) / v2, t2[1] = 0.25 * v2, t2[2] = (c2 + p2) / v2) : (v2 = 2 * Math.sqrt(1 + g2 - o2 - h2), t2[3] = (u2 - f2) / v2, t2[0] = (d2 + l2) / v2, t2[1] = (c2 + p2) / v2, t2[2] = 0.25 * v2), t2;
    }
    function C(t2, e2, n2, i2) {
      var r2 = e2[0], s2 = e2[1], a2 = e2[2], o2 = e2[3], u2 = r2 + r2, l2 = s2 + s2, f2 = a2 + a2, h2 = r2 * u2, c2 = r2 * l2, d2 = r2 * f2, p2 = s2 * l2, g2 = s2 * f2, y2 = a2 * f2, v2 = o2 * u2, m2 = o2 * l2, b2 = o2 * f2, _2 = i2[0], I2 = i2[1], M2 = i2[2];
      return t2[0] = (1 - (p2 + y2)) * _2, t2[1] = (c2 + b2) * _2, t2[2] = (d2 - m2) * _2, t2[3] = 0, t2[4] = (c2 - b2) * I2, t2[5] = (1 - (h2 + y2)) * I2, t2[6] = (g2 + v2) * I2, t2[7] = 0, t2[8] = (d2 + m2) * M2, t2[9] = (g2 - v2) * M2, t2[10] = (1 - (h2 + p2)) * M2, t2[11] = 0, t2[12] = n2[0], t2[13] = n2[1], t2[14] = n2[2], t2[15] = 1, t2;
    }
    function O(t2, e2, n2, i2, r2) {
      var s2 = e2[0], a2 = e2[1], o2 = e2[2], u2 = e2[3], l2 = s2 + s2, f2 = a2 + a2, h2 = o2 + o2, c2 = s2 * l2, d2 = s2 * f2, p2 = s2 * h2, g2 = a2 * f2, y2 = a2 * h2, v2 = o2 * h2, m2 = u2 * l2, b2 = u2 * f2, _2 = u2 * h2, I2 = i2[0], M2 = i2[1], x2 = i2[2], E2 = r2[0], A2 = r2[1], U2 = r2[2], w2 = (1 - (g2 + v2)) * I2, S2 = (d2 + _2) * I2, T2 = (p2 - b2) * I2, N2 = (d2 - _2) * M2, F2 = (1 - (c2 + v2)) * M2, C2 = (y2 + m2) * M2, O2 = (p2 + b2) * x2, k2 = (y2 - m2) * x2, B2 = (1 - (c2 + g2)) * x2;
      return t2[0] = w2, t2[1] = S2, t2[2] = T2, t2[3] = 0, t2[4] = N2, t2[5] = F2, t2[6] = C2, t2[7] = 0, t2[8] = O2, t2[9] = k2, t2[10] = B2, t2[11] = 0, t2[12] = n2[0] + E2 - (w2 * E2 + N2 * A2 + O2 * U2), t2[13] = n2[1] + A2 - (S2 * E2 + F2 * A2 + k2 * U2), t2[14] = n2[2] + U2 - (T2 * E2 + C2 * A2 + B2 * U2), t2[15] = 1, t2;
    }
    function k(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = e2[3], a2 = n2 + n2, o2 = i2 + i2, u2 = r2 + r2, l2 = n2 * a2, f2 = i2 * a2, h2 = i2 * o2, c2 = r2 * a2, d2 = r2 * o2, p2 = r2 * u2, g2 = s2 * a2, y2 = s2 * o2, v2 = s2 * u2;
      return t2[0] = 1 - h2 - p2, t2[1] = f2 + v2, t2[2] = c2 - y2, t2[3] = 0, t2[4] = f2 - v2, t2[5] = 1 - l2 - p2, t2[6] = d2 + g2, t2[7] = 0, t2[8] = c2 + y2, t2[9] = d2 - g2, t2[10] = 1 - l2 - h2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function B(t2, e2, n2, i2, r2, s2, a2) {
      var o2 = 1 / (n2 - e2), u2 = 1 / (r2 - i2), l2 = 1 / (s2 - a2);
      return t2[0] = 2 * s2 * o2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = 2 * s2 * u2, t2[6] = 0, t2[7] = 0, t2[8] = (n2 + e2) * o2, t2[9] = (r2 + i2) * u2, t2[10] = (a2 + s2) * l2, t2[11] = -1, t2[12] = 0, t2[13] = 0, t2[14] = a2 * s2 * 2 * l2, t2[15] = 0, t2;
    }
    function D(t2, e2, n2, i2, r2) {
      var s2, a2 = 1 / Math.tan(e2 / 2);
      return t2[0] = a2 / n2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = a2, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[11] = -1, t2[12] = 0, t2[13] = 0, t2[15] = 0, null != r2 && r2 !== 1 / 0 ? (s2 = 1 / (i2 - r2), t2[10] = (r2 + i2) * s2, t2[14] = 2 * r2 * i2 * s2) : (t2[10] = -1, t2[14] = -2 * i2), t2;
    }
    function z(t2, e2, n2, i2) {
      var r2 = Math.tan(e2.upDegrees * Math.PI / 180), s2 = Math.tan(e2.downDegrees * Math.PI / 180), a2 = Math.tan(e2.leftDegrees * Math.PI / 180), o2 = Math.tan(e2.rightDegrees * Math.PI / 180), u2 = 2 / (a2 + o2), l2 = 2 / (r2 + s2);
      return t2[0] = u2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = l2, t2[6] = 0, t2[7] = 0, t2[8] = -((a2 - o2) * u2 * 0.5), t2[9] = (r2 - s2) * l2 * 0.5, t2[10] = i2 / (n2 - i2), t2[11] = -1, t2[12] = 0, t2[13] = 0, t2[14] = i2 * n2 / (n2 - i2), t2[15] = 0, t2;
    }
    function q(t2, e2, n2, i2, r2, s2, a2) {
      var o2 = 1 / (e2 - n2), u2 = 1 / (i2 - r2), l2 = 1 / (s2 - a2);
      return t2[0] = -2 * o2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = -2 * u2, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 2 * l2, t2[11] = 0, t2[12] = (e2 + n2) * o2, t2[13] = (r2 + i2) * u2, t2[14] = (a2 + s2) * l2, t2[15] = 1, t2;
    }
    function P(t2, e2, n2, r2) {
      var s2, a2, o2, u2, f2, h2, c2, d2, p2, g2, y2 = e2[0], v2 = e2[1], m2 = e2[2], b2 = r2[0], _2 = r2[1], I2 = r2[2], M2 = n2[0], x2 = n2[1], E2 = n2[2];
      return Math.abs(y2 - M2) < i.Ib && Math.abs(v2 - x2) < i.Ib && Math.abs(m2 - E2) < i.Ib ? l(t2) : (g2 = 1 / Math.hypot(c2 = y2 - M2, d2 = v2 - x2, p2 = m2 - E2), c2 *= g2, d2 *= g2, p2 *= g2, (g2 = Math.hypot(s2 = _2 * p2 - I2 * d2, a2 = I2 * c2 - b2 * p2, o2 = b2 * d2 - _2 * c2)) ? (s2 *= g2 = 1 / g2, a2 *= g2, o2 *= g2) : (s2 = 0, a2 = 0, o2 = 0), (g2 = Math.hypot(u2 = d2 * o2 - p2 * a2, f2 = p2 * s2 - c2 * o2, h2 = c2 * a2 - d2 * s2)) ? (u2 *= g2 = 1 / g2, f2 *= g2, h2 *= g2) : (u2 = 0, f2 = 0, h2 = 0), t2[0] = s2, t2[1] = u2, t2[2] = c2, t2[3] = 0, t2[4] = a2, t2[5] = f2, t2[6] = d2, t2[7] = 0, t2[8] = o2, t2[9] = h2, t2[10] = p2, t2[11] = 0, t2[12] = -(s2 * y2 + a2 * v2 + o2 * m2), t2[13] = -(u2 * y2 + f2 * v2 + h2 * m2), t2[14] = -(c2 * y2 + d2 * v2 + p2 * m2), t2[15] = 1, t2);
    }
    function R(t2, e2, n2, i2) {
      var r2 = e2[0], s2 = e2[1], a2 = e2[2], o2 = i2[0], u2 = i2[1], l2 = i2[2], f2 = r2 - n2[0], h2 = s2 - n2[1], c2 = a2 - n2[2], d2 = f2 * f2 + h2 * h2 + c2 * c2;
      d2 > 0 && (f2 *= d2 = 1 / Math.sqrt(d2), h2 *= d2, c2 *= d2);
      var p2 = u2 * c2 - l2 * h2, g2 = l2 * f2 - o2 * c2, y2 = o2 * h2 - u2 * f2;
      return (d2 = p2 * p2 + g2 * g2 + y2 * y2) > 0 && (p2 *= d2 = 1 / Math.sqrt(d2), g2 *= d2, y2 *= d2), t2[0] = p2, t2[1] = g2, t2[2] = y2, t2[3] = 0, t2[4] = h2 * y2 - c2 * g2, t2[5] = c2 * p2 - f2 * y2, t2[6] = f2 * g2 - h2 * p2, t2[7] = 0, t2[8] = f2, t2[9] = h2, t2[10] = c2, t2[11] = 0, t2[12] = r2, t2[13] = s2, t2[14] = a2, t2[15] = 1, t2;
    }
    function L(t2) {
      return "mat4(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ", " + t2[3] + ", " + t2[4] + ", " + t2[5] + ", " + t2[6] + ", " + t2[7] + ", " + t2[8] + ", " + t2[9] + ", " + t2[10] + ", " + t2[11] + ", " + t2[12] + ", " + t2[13] + ", " + t2[14] + ", " + t2[15] + ")";
    }
    function j(t2) {
      return Math.hypot(t2[0], t2[1], t2[3], t2[4], t2[5], t2[6], t2[7], t2[8], t2[9], t2[10], t2[11], t2[12], t2[13], t2[14], t2[15]);
    }
    function G(t2, e2, n2) {
      return t2[0] = e2[0] + n2[0], t2[1] = e2[1] + n2[1], t2[2] = e2[2] + n2[2], t2[3] = e2[3] + n2[3], t2[4] = e2[4] + n2[4], t2[5] = e2[5] + n2[5], t2[6] = e2[6] + n2[6], t2[7] = e2[7] + n2[7], t2[8] = e2[8] + n2[8], t2[9] = e2[9] + n2[9], t2[10] = e2[10] + n2[10], t2[11] = e2[11] + n2[11], t2[12] = e2[12] + n2[12], t2[13] = e2[13] + n2[13], t2[14] = e2[14] + n2[14], t2[15] = e2[15] + n2[15], t2;
    }
    function V(t2, e2, n2) {
      return t2[0] = e2[0] - n2[0], t2[1] = e2[1] - n2[1], t2[2] = e2[2] - n2[2], t2[3] = e2[3] - n2[3], t2[4] = e2[4] - n2[4], t2[5] = e2[5] - n2[5], t2[6] = e2[6] - n2[6], t2[7] = e2[7] - n2[7], t2[8] = e2[8] - n2[8], t2[9] = e2[9] - n2[9], t2[10] = e2[10] - n2[10], t2[11] = e2[11] - n2[11], t2[12] = e2[12] - n2[12], t2[13] = e2[13] - n2[13], t2[14] = e2[14] - n2[14], t2[15] = e2[15] - n2[15], t2;
    }
    function Y(t2, e2, n2) {
      return t2[0] = e2[0] * n2, t2[1] = e2[1] * n2, t2[2] = e2[2] * n2, t2[3] = e2[3] * n2, t2[4] = e2[4] * n2, t2[5] = e2[5] * n2, t2[6] = e2[6] * n2, t2[7] = e2[7] * n2, t2[8] = e2[8] * n2, t2[9] = e2[9] * n2, t2[10] = e2[10] * n2, t2[11] = e2[11] * n2, t2[12] = e2[12] * n2, t2[13] = e2[13] * n2, t2[14] = e2[14] * n2, t2[15] = e2[15] * n2, t2;
    }
    function X(t2, e2, n2, i2) {
      return t2[0] = e2[0] + n2[0] * i2, t2[1] = e2[1] + n2[1] * i2, t2[2] = e2[2] + n2[2] * i2, t2[3] = e2[3] + n2[3] * i2, t2[4] = e2[4] + n2[4] * i2, t2[5] = e2[5] + n2[5] * i2, t2[6] = e2[6] + n2[6] * i2, t2[7] = e2[7] + n2[7] * i2, t2[8] = e2[8] + n2[8] * i2, t2[9] = e2[9] + n2[9] * i2, t2[10] = e2[10] + n2[10] * i2, t2[11] = e2[11] + n2[11] * i2, t2[12] = e2[12] + n2[12] * i2, t2[13] = e2[13] + n2[13] * i2, t2[14] = e2[14] + n2[14] * i2, t2[15] = e2[15] + n2[15] * i2, t2;
    }
    function Z(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1] && t2[2] === e2[2] && t2[3] === e2[3] && t2[4] === e2[4] && t2[5] === e2[5] && t2[6] === e2[6] && t2[7] === e2[7] && t2[8] === e2[8] && t2[9] === e2[9] && t2[10] === e2[10] && t2[11] === e2[11] && t2[12] === e2[12] && t2[13] === e2[13] && t2[14] === e2[14] && t2[15] === e2[15];
    }
    function W(t2, e2) {
      var n2 = t2[0], r2 = t2[1], s2 = t2[2], a2 = t2[3], o2 = t2[4], u2 = t2[5], l2 = t2[6], f2 = t2[7], h2 = t2[8], c2 = t2[9], d2 = t2[10], p2 = t2[11], g2 = t2[12], y2 = t2[13], v2 = t2[14], m2 = t2[15], b2 = e2[0], _2 = e2[1], I2 = e2[2], M2 = e2[3], x2 = e2[4], E2 = e2[5], A2 = e2[6], U2 = e2[7], w2 = e2[8], S2 = e2[9], T2 = e2[10], N2 = e2[11], F2 = e2[12], C2 = e2[13], O2 = e2[14], k2 = e2[15];
      return Math.abs(n2 - b2) <= i.Ib * Math.max(1, Math.abs(n2), Math.abs(b2)) && Math.abs(r2 - _2) <= i.Ib * Math.max(1, Math.abs(r2), Math.abs(_2)) && Math.abs(s2 - I2) <= i.Ib * Math.max(1, Math.abs(s2), Math.abs(I2)) && Math.abs(a2 - M2) <= i.Ib * Math.max(1, Math.abs(a2), Math.abs(M2)) && Math.abs(o2 - x2) <= i.Ib * Math.max(1, Math.abs(o2), Math.abs(x2)) && Math.abs(u2 - E2) <= i.Ib * Math.max(1, Math.abs(u2), Math.abs(E2)) && Math.abs(l2 - A2) <= i.Ib * Math.max(1, Math.abs(l2), Math.abs(A2)) && Math.abs(f2 - U2) <= i.Ib * Math.max(1, Math.abs(f2), Math.abs(U2)) && Math.abs(h2 - w2) <= i.Ib * Math.max(1, Math.abs(h2), Math.abs(w2)) && Math.abs(c2 - S2) <= i.Ib * Math.max(1, Math.abs(c2), Math.abs(S2)) && Math.abs(d2 - T2) <= i.Ib * Math.max(1, Math.abs(d2), Math.abs(T2)) && Math.abs(p2 - N2) <= i.Ib * Math.max(1, Math.abs(p2), Math.abs(N2)) && Math.abs(g2 - F2) <= i.Ib * Math.max(1, Math.abs(g2), Math.abs(F2)) && Math.abs(y2 - C2) <= i.Ib * Math.max(1, Math.abs(y2), Math.abs(C2)) && Math.abs(v2 - O2) <= i.Ib * Math.max(1, Math.abs(v2), Math.abs(O2)) && Math.abs(m2 - k2) <= i.Ib * Math.max(1, Math.abs(m2), Math.abs(k2));
    }
    var K = p, $ = V;
  }, 7160: function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, { add: () => h, angle: () => R, bezier: () => C, ceil: () => g, clone: () => a, copy: () => l, create: () => s, cross: () => T, dist: () => W, distance: () => M, div: () => Z, divide: () => p, dot: () => S, equals: () => V, exactEquals: () => G, floor: () => y, forEach: () => Q, fromValues: () => u, hermite: () => F, inverse: () => U, len: () => $, length: () => o, lerp: () => N, max: () => m, min: () => v, mul: () => X, multiply: () => d, negate: () => A, normalize: () => w, random: () => O, rotateX: () => z, rotateY: () => q, rotateZ: () => P, round: () => b, scale: () => _, scaleAndAdd: () => I, set: () => f, sqrDist: () => K, sqrLen: () => H, squaredDistance: () => x, squaredLength: () => E, str: () => j, sub: () => Y, subtract: () => c, transformMat3: () => B, transformMat4: () => k, transformQuat: () => D, zero: () => L });
    var i, r = n(9685);
    function s() {
      var t2 = new r.WT(3);
      return r.WT != Float32Array && (t2[0] = 0, t2[1] = 0, t2[2] = 0), t2;
    }
    function a(t2) {
      var e2 = new r.WT(3);
      return e2[0] = t2[0], e2[1] = t2[1], e2[2] = t2[2], e2;
    }
    function o(t2) {
      return Math.hypot(t2[0], t2[1], t2[2]);
    }
    function u(t2, e2, n2) {
      var i2 = new r.WT(3);
      return i2[0] = t2, i2[1] = e2, i2[2] = n2, i2;
    }
    function l(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2;
    }
    function f(t2, e2, n2, i2) {
      return t2[0] = e2, t2[1] = n2, t2[2] = i2, t2;
    }
    function h(t2, e2, n2) {
      return t2[0] = e2[0] + n2[0], t2[1] = e2[1] + n2[1], t2[2] = e2[2] + n2[2], t2;
    }
    function c(t2, e2, n2) {
      return t2[0] = e2[0] - n2[0], t2[1] = e2[1] - n2[1], t2[2] = e2[2] - n2[2], t2;
    }
    function d(t2, e2, n2) {
      return t2[0] = e2[0] * n2[0], t2[1] = e2[1] * n2[1], t2[2] = e2[2] * n2[2], t2;
    }
    function p(t2, e2, n2) {
      return t2[0] = e2[0] / n2[0], t2[1] = e2[1] / n2[1], t2[2] = e2[2] / n2[2], t2;
    }
    function g(t2, e2) {
      return t2[0] = Math.ceil(e2[0]), t2[1] = Math.ceil(e2[1]), t2[2] = Math.ceil(e2[2]), t2;
    }
    function y(t2, e2) {
      return t2[0] = Math.floor(e2[0]), t2[1] = Math.floor(e2[1]), t2[2] = Math.floor(e2[2]), t2;
    }
    function v(t2, e2, n2) {
      return t2[0] = Math.min(e2[0], n2[0]), t2[1] = Math.min(e2[1], n2[1]), t2[2] = Math.min(e2[2], n2[2]), t2;
    }
    function m(t2, e2, n2) {
      return t2[0] = Math.max(e2[0], n2[0]), t2[1] = Math.max(e2[1], n2[1]), t2[2] = Math.max(e2[2], n2[2]), t2;
    }
    function b(t2, e2) {
      return t2[0] = Math.round(e2[0]), t2[1] = Math.round(e2[1]), t2[2] = Math.round(e2[2]), t2;
    }
    function _(t2, e2, n2) {
      return t2[0] = e2[0] * n2, t2[1] = e2[1] * n2, t2[2] = e2[2] * n2, t2;
    }
    function I(t2, e2, n2, i2) {
      return t2[0] = e2[0] + n2[0] * i2, t2[1] = e2[1] + n2[1] * i2, t2[2] = e2[2] + n2[2] * i2, t2;
    }
    function M(t2, e2) {
      return Math.hypot(e2[0] - t2[0], e2[1] - t2[1], e2[2] - t2[2]);
    }
    function x(t2, e2) {
      var n2 = e2[0] - t2[0], i2 = e2[1] - t2[1], r2 = e2[2] - t2[2];
      return n2 * n2 + i2 * i2 + r2 * r2;
    }
    function E(t2) {
      var e2 = t2[0], n2 = t2[1], i2 = t2[2];
      return e2 * e2 + n2 * n2 + i2 * i2;
    }
    function A(t2, e2) {
      return t2[0] = -e2[0], t2[1] = -e2[1], t2[2] = -e2[2], t2;
    }
    function U(t2, e2) {
      return t2[0] = 1 / e2[0], t2[1] = 1 / e2[1], t2[2] = 1 / e2[2], t2;
    }
    function w(t2, e2) {
      var n2 = e2[0], i2 = e2[1], r2 = e2[2], s2 = n2 * n2 + i2 * i2 + r2 * r2;
      return s2 > 0 && (s2 = 1 / Math.sqrt(s2)), t2[0] = e2[0] * s2, t2[1] = e2[1] * s2, t2[2] = e2[2] * s2, t2;
    }
    function S(t2, e2) {
      return t2[0] * e2[0] + t2[1] * e2[1] + t2[2] * e2[2];
    }
    function T(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = n2[0], o2 = n2[1], u2 = n2[2];
      return t2[0] = r2 * u2 - s2 * o2, t2[1] = s2 * a2 - i2 * u2, t2[2] = i2 * o2 - r2 * a2, t2;
    }
    function N(t2, e2, n2, i2) {
      var r2 = e2[0], s2 = e2[1], a2 = e2[2];
      return t2[0] = r2 + i2 * (n2[0] - r2), t2[1] = s2 + i2 * (n2[1] - s2), t2[2] = a2 + i2 * (n2[2] - a2), t2;
    }
    function F(t2, e2, n2, i2, r2, s2) {
      var a2 = s2 * s2, o2 = a2 * (2 * s2 - 3) + 1, u2 = a2 * (s2 - 2) + s2, l2 = a2 * (s2 - 1), f2 = a2 * (3 - 2 * s2);
      return t2[0] = e2[0] * o2 + n2[0] * u2 + i2[0] * l2 + r2[0] * f2, t2[1] = e2[1] * o2 + n2[1] * u2 + i2[1] * l2 + r2[1] * f2, t2[2] = e2[2] * o2 + n2[2] * u2 + i2[2] * l2 + r2[2] * f2, t2;
    }
    function C(t2, e2, n2, i2, r2, s2) {
      var a2 = 1 - s2, o2 = a2 * a2, u2 = s2 * s2, l2 = o2 * a2, f2 = 3 * s2 * o2, h2 = 3 * u2 * a2, c2 = u2 * s2;
      return t2[0] = e2[0] * l2 + n2[0] * f2 + i2[0] * h2 + r2[0] * c2, t2[1] = e2[1] * l2 + n2[1] * f2 + i2[1] * h2 + r2[1] * c2, t2[2] = e2[2] * l2 + n2[2] * f2 + i2[2] * h2 + r2[2] * c2, t2;
    }
    function O(t2, e2) {
      e2 = e2 || 1;
      var n2 = 2 * r.FD() * Math.PI, i2 = 2 * r.FD() - 1, s2 = Math.sqrt(1 - i2 * i2) * e2;
      return t2[0] = Math.cos(n2) * s2, t2[1] = Math.sin(n2) * s2, t2[2] = i2 * e2, t2;
    }
    function k(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2], a2 = n2[3] * i2 + n2[7] * r2 + n2[11] * s2 + n2[15];
      return a2 = a2 || 1, t2[0] = (n2[0] * i2 + n2[4] * r2 + n2[8] * s2 + n2[12]) / a2, t2[1] = (n2[1] * i2 + n2[5] * r2 + n2[9] * s2 + n2[13]) / a2, t2[2] = (n2[2] * i2 + n2[6] * r2 + n2[10] * s2 + n2[14]) / a2, t2;
    }
    function B(t2, e2, n2) {
      var i2 = e2[0], r2 = e2[1], s2 = e2[2];
      return t2[0] = i2 * n2[0] + r2 * n2[3] + s2 * n2[6], t2[1] = i2 * n2[1] + r2 * n2[4] + s2 * n2[7], t2[2] = i2 * n2[2] + r2 * n2[5] + s2 * n2[8], t2;
    }
    function D(t2, e2, n2) {
      var i2 = n2[0], r2 = n2[1], s2 = n2[2], a2 = n2[3], o2 = e2[0], u2 = e2[1], l2 = e2[2], f2 = r2 * l2 - s2 * u2, h2 = s2 * o2 - i2 * l2, c2 = i2 * u2 - r2 * o2, d2 = r2 * c2 - s2 * h2, p2 = s2 * f2 - i2 * c2, g2 = i2 * h2 - r2 * f2, y2 = 2 * a2;
      return f2 *= y2, h2 *= y2, c2 *= y2, d2 *= 2, p2 *= 2, g2 *= 2, t2[0] = o2 + f2 + d2, t2[1] = u2 + h2 + p2, t2[2] = l2 + c2 + g2, t2;
    }
    function z(t2, e2, n2, i2) {
      var r2 = [], s2 = [];
      return r2[0] = e2[0] - n2[0], r2[1] = e2[1] - n2[1], r2[2] = e2[2] - n2[2], s2[0] = r2[0], s2[1] = r2[1] * Math.cos(i2) - r2[2] * Math.sin(i2), s2[2] = r2[1] * Math.sin(i2) + r2[2] * Math.cos(i2), t2[0] = s2[0] + n2[0], t2[1] = s2[1] + n2[1], t2[2] = s2[2] + n2[2], t2;
    }
    function q(t2, e2, n2, i2) {
      var r2 = [], s2 = [];
      return r2[0] = e2[0] - n2[0], r2[1] = e2[1] - n2[1], r2[2] = e2[2] - n2[2], s2[0] = r2[2] * Math.sin(i2) + r2[0] * Math.cos(i2), s2[1] = r2[1], s2[2] = r2[2] * Math.cos(i2) - r2[0] * Math.sin(i2), t2[0] = s2[0] + n2[0], t2[1] = s2[1] + n2[1], t2[2] = s2[2] + n2[2], t2;
    }
    function P(t2, e2, n2, i2) {
      var r2 = [], s2 = [];
      return r2[0] = e2[0] - n2[0], r2[1] = e2[1] - n2[1], r2[2] = e2[2] - n2[2], s2[0] = r2[0] * Math.cos(i2) - r2[1] * Math.sin(i2), s2[1] = r2[0] * Math.sin(i2) + r2[1] * Math.cos(i2), s2[2] = r2[2], t2[0] = s2[0] + n2[0], t2[1] = s2[1] + n2[1], t2[2] = s2[2] + n2[2], t2;
    }
    function R(t2, e2) {
      var n2 = u(t2[0], t2[1], t2[2]), i2 = u(e2[0], e2[1], e2[2]);
      w(n2, n2), w(i2, i2);
      var r2 = S(n2, i2);
      return r2 > 1 ? 0 : r2 < -1 ? Math.PI : Math.acos(r2);
    }
    function L(t2) {
      return t2[0] = 0, t2[1] = 0, t2[2] = 0, t2;
    }
    function j(t2) {
      return "vec3(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ")";
    }
    function G(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1] && t2[2] === e2[2];
    }
    function V(t2, e2) {
      var n2 = t2[0], i2 = t2[1], s2 = t2[2], a2 = e2[0], o2 = e2[1], u2 = e2[2];
      return Math.abs(n2 - a2) <= r.Ib * Math.max(1, Math.abs(n2), Math.abs(a2)) && Math.abs(i2 - o2) <= r.Ib * Math.max(1, Math.abs(i2), Math.abs(o2)) && Math.abs(s2 - u2) <= r.Ib * Math.max(1, Math.abs(s2), Math.abs(u2));
    }
    var Y = c, X = d, Z = p, W = M, K = x, $ = o, H = E, Q = (i = s(), function(t2, e2, n2, r2, s2, a2) {
      var o2, u2;
      for (e2 || (e2 = 3), n2 || (n2 = 0), u2 = r2 ? Math.min(r2 * e2 + n2, t2.length) : t2.length, o2 = n2; o2 < u2; o2 += e2) i[0] = t2[o2], i[1] = t2[o2 + 1], i[2] = t2[o2 + 2], s2(i, i, a2), t2[o2] = i[0], t2[o2 + 1] = i[1], t2[o2 + 2] = i[2];
      return t2;
    });
  }, 7256: function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: true }), e.NIFTIEXTENSION = void 0, e.NIFTIEXTENSION = class {
      constructor(t2, e2, n, i) {
        __publicField(this, "esize");
        __publicField(this, "ecode");
        __publicField(this, "edata");
        __publicField(this, "littleEndian");
        if (t2 % 16 != 0) throw Error("This does not appear to be a NIFTI extension");
        this.esize = t2, this.ecode = e2, this.edata = n, this.littleEndian = i;
      }
      toArrayBuffer() {
        let t2 = new Uint8Array(this.esize), e2 = new Uint8Array(this.edata);
        t2.set(e2, 8);
        let n = new DataView(t2.buffer);
        return n.setInt32(0, this.esize, this.littleEndian), n.setInt32(4, this.ecode, this.littleEndian), t2.buffer;
      }
    };
  }, 8551: function(t, e, n) {
    "use strict";
    var i = this && this.__createBinding || (Object.create ? function(t2, e2, n2, i2) {
      void 0 === i2 && (i2 = n2);
      var r2 = Object.getOwnPropertyDescriptor(e2, n2);
      (!r2 || ("get" in r2 ? !e2.__esModule : r2.writable || r2.configurable)) && (r2 = { enumerable: true, get: function() {
        return e2[n2];
      } }), Object.defineProperty(t2, i2, r2);
    } : function(t2, e2, n2, i2) {
      void 0 === i2 && (i2 = n2), t2[i2] = e2[n2];
    }), r = this && this.__setModuleDefault || (Object.create ? function(t2, e2) {
      Object.defineProperty(t2, "default", { enumerable: true, value: e2 });
    } : function(t2, e2) {
      t2.default = e2;
    }), s = this && this.__importStar || function(t2) {
      if (t2 && t2.__esModule) return t2;
      var e2 = {};
      if (null != t2) for (var n2 in t2) "default" !== n2 && Object.prototype.hasOwnProperty.call(t2, n2) && i(e2, t2, n2);
      return r(e2, t2), e2;
    };
    Object.defineProperty(e, "__esModule", { value: true }), e.readExtensionData = e.readExtension = e.readImage = e.hasExtension = e.readHeader = e.decompress = e.isCompressed = e.isNIFTI = e.isNIFTI2 = e.isNIFTI1 = e.NIFTIEXTENSION = e.Utils = e.NIFTI2 = e.NIFTI1 = void 0;
    let a = s(n(7632)), o = n(8244), u = n(5655), l = n(9145);
    var f = n(8244);
    Object.defineProperty(e, "NIFTI1", { enumerable: true, get: function() {
      return f.NIFTI1;
    } });
    var h = n(5655);
    Object.defineProperty(e, "NIFTI2", { enumerable: true, get: function() {
      return h.NIFTI2;
    } });
    var c = n(9145);
    Object.defineProperty(e, "Utils", { enumerable: true, get: function() {
      return c.Utils;
    } });
    var d = n(7256);
    function p(t2, e2 = false) {
      var n2, i2, r2, s2;
      return !(t2.byteLength < o.NIFTI1.STANDARD_HEADER_SIZE) && (i2 = (n2 = new DataView(t2)).getUint8(o.NIFTI1.MAGIC_NUMBER_LOCATION), r2 = n2.getUint8(o.NIFTI1.MAGIC_NUMBER_LOCATION + 1), s2 = n2.getUint8(o.NIFTI1.MAGIC_NUMBER_LOCATION + 2), !!e2 && i2 === o.NIFTI1.MAGIC_NUMBER2[0] && r2 === o.NIFTI1.MAGIC_NUMBER2[1] && s2 === o.NIFTI1.MAGIC_NUMBER2[2] || !!(i2 === o.NIFTI1.MAGIC_NUMBER[0] && r2 === o.NIFTI1.MAGIC_NUMBER[1] && s2 === o.NIFTI1.MAGIC_NUMBER[2]));
    }
    function g(t2, e2 = false) {
      var n2, i2, r2, s2;
      return !(t2.byteLength < o.NIFTI1.STANDARD_HEADER_SIZE) && (i2 = (n2 = new DataView(t2)).getUint8(u.NIFTI2.MAGIC_NUMBER_LOCATION), r2 = n2.getUint8(u.NIFTI2.MAGIC_NUMBER_LOCATION + 1), s2 = n2.getUint8(u.NIFTI2.MAGIC_NUMBER_LOCATION + 2), !!e2 && i2 === u.NIFTI2.MAGIC_NUMBER2[0] && r2 === u.NIFTI2.MAGIC_NUMBER2[1] && s2 === u.NIFTI2.MAGIC_NUMBER2[2] || !!(i2 === u.NIFTI2.MAGIC_NUMBER[0] && r2 === u.NIFTI2.MAGIC_NUMBER[1] && s2 === u.NIFTI2.MAGIC_NUMBER[2]));
    }
    function y(t2) {
      var e2, n2, i2;
      return !!t2 && (n2 = (e2 = new DataView(t2)).getUint8(0), i2 = e2.getUint8(1), n2 === l.Utils.GUNZIP_MAGIC_COOKIE1 || i2 === l.Utils.GUNZIP_MAGIC_COOKIE2);
    }
    function v(t2) {
      return a.decompressSync(new Uint8Array(t2)).buffer;
    }
    Object.defineProperty(e, "NIFTIEXTENSION", { enumerable: true, get: function() {
      return d.NIFTIEXTENSION;
    } }), e.isNIFTI1 = p, e.isNIFTI2 = g, e.isNIFTI = function(t2, e2 = false) {
      return p(t2, e2) || g(t2, e2);
    }, e.isCompressed = y, e.decompress = v, e.readHeader = function(t2, e2 = false) {
      var n2 = null;
      return y(t2) && (t2 = v(t2)), p(t2, e2) ? n2 = new o.NIFTI1() : g(t2, e2) && (n2 = new u.NIFTI2()), n2 ? n2.readHeader(t2) : console.error("That file does not appear to be NIFTI!"), n2;
    }, e.hasExtension = function(t2) {
      return 0 != t2.extensionFlag[0];
    }, e.readImage = function(t2, e2) {
      var n2 = t2.vox_offset, i2 = 1, r2 = 1;
      t2.dims[4] && (i2 = t2.dims[4]), t2.dims[5] && (r2 = t2.dims[5]);
      var s2 = t2.dims[1] * t2.dims[2] * t2.dims[3] * i2 * r2 * (t2.numBitsPerVoxel / 8);
      return e2.slice(n2, n2 + s2);
    }, e.readExtension = function(t2, e2) {
      var n2 = t2.getExtensionLocation(), i2 = t2.extensionSize;
      return e2.slice(n2, n2 + i2);
    }, e.readExtensionData = function(t2, e2) {
      var n2 = t2.getExtensionLocation(), i2 = t2.extensionSize;
      return e2.slice(n2 + 8, n2 + i2);
    };
  }, 8244: function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: true }), e.NIFTI1 = void 0;
    let i = n(9145);
    const _r = class _r {
      constructor() {
        __publicField(this, "littleEndian", false);
        __publicField(this, "dim_info", 0);
        __publicField(this, "dims", []);
        __publicField(this, "intent_p1", 0);
        __publicField(this, "intent_p2", 0);
        __publicField(this, "intent_p3", 0);
        __publicField(this, "intent_code", 0);
        __publicField(this, "datatypeCode", 0);
        __publicField(this, "numBitsPerVoxel", 0);
        __publicField(this, "slice_start", 0);
        __publicField(this, "slice_end", 0);
        __publicField(this, "slice_code", 0);
        __publicField(this, "pixDims", []);
        __publicField(this, "vox_offset", 0);
        __publicField(this, "scl_slope", 1);
        __publicField(this, "scl_inter", 0);
        __publicField(this, "xyzt_units", 0);
        __publicField(this, "cal_max", 0);
        __publicField(this, "cal_min", 0);
        __publicField(this, "slice_duration", 0);
        __publicField(this, "toffset", 0);
        __publicField(this, "description", "");
        __publicField(this, "aux_file", "");
        __publicField(this, "intent_name", "");
        __publicField(this, "qform_code", 0);
        __publicField(this, "sform_code", 0);
        __publicField(this, "quatern_a", 0);
        __publicField(this, "quatern_b", 0);
        __publicField(this, "quatern_c", 0);
        __publicField(this, "quatern_d", 0);
        __publicField(this, "qoffset_x", 0);
        __publicField(this, "qoffset_y", 0);
        __publicField(this, "qoffset_z", 0);
        __publicField(this, "affine", [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
        __publicField(this, "qfac", 1);
        __publicField(this, "quatern_R");
        __publicField(this, "magic", "0");
        __publicField(this, "isHDR", false);
        __publicField(this, "extensionFlag", [0, 0, 0, 0]);
        __publicField(this, "extensionSize", 0);
        __publicField(this, "extensionCode", 0);
        __publicField(this, "extensions", []);
        __publicField(this, "getDatatypeCodeString", function(t2) {
          if (t2 === _r.TYPE_UINT8) return "1-Byte Unsigned Integer";
          if (t2 === _r.TYPE_INT16) return "2-Byte Signed Integer";
          if (t2 === _r.TYPE_INT32) return "4-Byte Signed Integer";
          if (t2 === _r.TYPE_FLOAT32) return "4-Byte Float";
          if (t2 === _r.TYPE_FLOAT64) return "8-Byte Float";
          else if (t2 === _r.TYPE_RGB24) return "RGB";
          else if (t2 === _r.TYPE_INT8) return "1-Byte Signed Integer";
          else if (t2 === _r.TYPE_UINT16) return "2-Byte Unsigned Integer";
          else if (t2 === _r.TYPE_UINT32) return "4-Byte Unsigned Integer";
          else if (t2 === _r.TYPE_INT64) return "8-Byte Signed Integer";
          else if (t2 === _r.TYPE_UINT64) return "8-Byte Unsigned Integer";
          else return "Unknown";
        });
        __publicField(this, "getTransformCodeString", function(t2) {
          return t2 === _r.XFORM_SCANNER_ANAT ? "Scanner" : t2 === _r.XFORM_ALIGNED_ANAT ? "Aligned" : t2 === _r.XFORM_TALAIRACH ? "Talairach" : t2 === _r.XFORM_MNI_152 ? "MNI" : "Unknown";
        });
        __publicField(this, "getUnitsCodeString", function(t2) {
          if (t2 === _r.UNITS_METER) return "Meters";
          if (t2 === _r.UNITS_MM) return "Millimeters";
          if (t2 === _r.UNITS_MICRON) return "Microns";
          if (t2 === _r.UNITS_SEC) return "Seconds";
          if (t2 === _r.UNITS_MSEC) return "Milliseconds";
          else if (t2 === _r.UNITS_USEC) return "Microseconds";
          else if (t2 === _r.UNITS_HZ) return "Hz";
          else if (t2 === _r.UNITS_PPM) return "PPM";
          else if (t2 === _r.UNITS_RADS) return "Rads";
          else return "Unknown";
        });
        __publicField(this, "nifti_mat33_mul", function(t2, e2) {
          var n2, i2, r2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
          for (n2 = 0; n2 < 3; n2 += 1) for (i2 = 0; i2 < 3; i2 += 1) r2[n2][i2] = t2[n2][0] * e2[0][i2] + t2[n2][1] * e2[1][i2] + t2[n2][2] * e2[2][i2];
          return r2;
        });
        __publicField(this, "nifti_mat33_determ", function(t2) {
          var e2, n2, i2, r2, s, a, o, u, l;
          return e2 = t2[0][0], n2 = t2[0][1], i2 = t2[0][2], r2 = t2[1][0], s = t2[1][1], a = t2[1][2], o = t2[2][0], u = t2[2][1], e2 * s * (l = t2[2][2]) - e2 * u * a - r2 * n2 * l + r2 * u * i2 + o * n2 * a - o * s * i2;
        });
      }
      readHeader(t2) {
        var e2, n2, s, a, o = new DataView(t2), u = i.Utils.getIntAt(o, 0, this.littleEndian);
        if (u !== _r.MAGIC_COOKIE && (this.littleEndian = true, u = i.Utils.getIntAt(o, 0, this.littleEndian)), u !== _r.MAGIC_COOKIE) throw Error("This does not appear to be a NIFTI file!");
        for (e2 = 0, this.dim_info = i.Utils.getByteAt(o, 39); e2 < 8; e2 += 1) a = 40 + 2 * e2, this.dims[e2] = i.Utils.getShortAt(o, a, this.littleEndian);
        for (e2 = 0, this.intent_p1 = i.Utils.getFloatAt(o, 56, this.littleEndian), this.intent_p2 = i.Utils.getFloatAt(o, 60, this.littleEndian), this.intent_p3 = i.Utils.getFloatAt(o, 64, this.littleEndian), this.intent_code = i.Utils.getShortAt(o, 68, this.littleEndian), this.datatypeCode = i.Utils.getShortAt(o, 70, this.littleEndian), this.numBitsPerVoxel = i.Utils.getShortAt(o, 72, this.littleEndian), this.slice_start = i.Utils.getShortAt(o, 74, this.littleEndian); e2 < 8; e2 += 1) a = 76 + 4 * e2, this.pixDims[e2] = i.Utils.getFloatAt(o, a, this.littleEndian);
        if (this.vox_offset = i.Utils.getFloatAt(o, 108, this.littleEndian), this.scl_slope = i.Utils.getFloatAt(o, 112, this.littleEndian), this.scl_inter = i.Utils.getFloatAt(o, 116, this.littleEndian), this.slice_end = i.Utils.getShortAt(o, 120, this.littleEndian), this.slice_code = i.Utils.getByteAt(o, 122), this.xyzt_units = i.Utils.getByteAt(o, 123), this.cal_max = i.Utils.getFloatAt(o, 124, this.littleEndian), this.cal_min = i.Utils.getFloatAt(o, 128, this.littleEndian), this.slice_duration = i.Utils.getFloatAt(o, 132, this.littleEndian), this.toffset = i.Utils.getFloatAt(o, 136, this.littleEndian), this.description = i.Utils.getStringAt(o, 148, 228), this.aux_file = i.Utils.getStringAt(o, 228, 252), this.qform_code = i.Utils.getShortAt(o, 252, this.littleEndian), this.sform_code = i.Utils.getShortAt(o, 254, this.littleEndian), this.quatern_b = i.Utils.getFloatAt(o, 256, this.littleEndian), this.quatern_c = i.Utils.getFloatAt(o, 260, this.littleEndian), this.quatern_d = i.Utils.getFloatAt(o, 264, this.littleEndian), this.quatern_a = Math.sqrt(1 - (Math.pow(this.quatern_b, 2) + Math.pow(this.quatern_c, 2) + Math.pow(this.quatern_d, 2))), this.qoffset_x = i.Utils.getFloatAt(o, 268, this.littleEndian), this.qoffset_y = i.Utils.getFloatAt(o, 272, this.littleEndian), this.qoffset_z = i.Utils.getFloatAt(o, 276, this.littleEndian), this.qform_code < 1 && this.sform_code < 1 && (this.affine[0][0] = this.pixDims[1], this.affine[1][1] = this.pixDims[2], this.affine[2][2] = this.pixDims[3]), this.qform_code > 0 && this.sform_code < this.qform_code) {
          let t3 = this.quatern_a, e3 = this.quatern_b, i2 = this.quatern_c, r2 = this.quatern_d;
          for (n2 = 0, this.qfac = 0 === this.pixDims[0] ? 1 : this.pixDims[0], this.quatern_R = [[t3 * t3 + e3 * e3 - i2 * i2 - r2 * r2, 2 * e3 * i2 - 2 * t3 * r2, 2 * e3 * r2 + 2 * t3 * i2], [2 * e3 * i2 + 2 * t3 * r2, t3 * t3 + i2 * i2 - e3 * e3 - r2 * r2, 2 * i2 * r2 - 2 * t3 * e3], [2 * e3 * r2 - 2 * t3 * i2, 2 * i2 * r2 + 2 * t3 * e3, t3 * t3 + r2 * r2 - i2 * i2 - e3 * e3]]; n2 < 3; n2 += 1) for (s = 0; s < 3; s += 1) this.affine[n2][s] = this.quatern_R[n2][s] * this.pixDims[s + 1], 2 === s && (this.affine[n2][s] *= this.qfac);
          this.affine[0][3] = this.qoffset_x, this.affine[1][3] = this.qoffset_y, this.affine[2][3] = this.qoffset_z;
        } else if (this.sform_code > 0) for (n2 = 0; n2 < 3; n2 += 1) for (s = 0; s < 4; s += 1) a = 280 + (4 * n2 + s) * 4, this.affine[n2][s] = i.Utils.getFloatAt(o, a, this.littleEndian);
        if (this.affine[3][0] = 0, this.affine[3][1] = 0, this.affine[3][2] = 0, this.affine[3][3] = 1, this.intent_name = i.Utils.getStringAt(o, 328, 344), this.magic = i.Utils.getStringAt(o, 344, 348), this.isHDR = this.magic === String.fromCharCode.apply(null, _r.MAGIC_NUMBER2), o.byteLength > _r.MAGIC_COOKIE) {
          this.extensionFlag[0] = i.Utils.getByteAt(o, 348), this.extensionFlag[1] = i.Utils.getByteAt(o, 349), this.extensionFlag[2] = i.Utils.getByteAt(o, 350), this.extensionFlag[3] = i.Utils.getByteAt(o, 351);
          let t3 = true;
          !this.isHDR && this.vox_offset <= 352 && (t3 = false), o.byteLength <= 368 && (t3 = false), t3 && this.extensionFlag[0] && (this.extensions = i.Utils.getExtensionsAt(o, this.getExtensionLocation(), this.littleEndian, this.vox_offset), this.extensionSize = this.extensions[0].esize, this.extensionCode = this.extensions[0].ecode);
        }
      }
      toFormattedString() {
        var t2 = i.Utils.formatNumber, e2 = "";
        return e2 += "Dim Info = " + this.dim_info + "\n" + ("Image Dimensions (1-8): " + this.dims[0] + ", " + this.dims[1] + ", " + this.dims[2] + ", " + this.dims[3] + ", " + this.dims[4] + ", " + this.dims[5] + ", " + this.dims[6] + ", " + this.dims[7]) + "\n" + ("Intent Parameters (1-3): " + this.intent_p1 + ", " + this.intent_p2 + ", " + this.intent_p3) + "\n" + ("Intent Code = " + this.intent_code) + "\n" + ("Datatype = " + this.datatypeCode + " (" + this.getDatatypeCodeString(this.datatypeCode)) + ")\n" + ("Bits Per Voxel = " + this.numBitsPerVoxel) + "\n" + ("Slice Start = " + this.slice_start) + "\n" + ("Voxel Dimensions (1-8): " + t2(this.pixDims[0]) + ", " + t2(this.pixDims[1]) + ", " + t2(this.pixDims[2]) + ", " + t2(this.pixDims[3]) + ", " + t2(this.pixDims[4]) + ", " + t2(this.pixDims[5]) + ", " + t2(this.pixDims[6]) + ", " + t2(this.pixDims[7])) + "\n" + ("Image Offset = " + this.vox_offset) + "\n" + ("Data Scale:  Slope = " + t2(this.scl_slope) + "  Intercept = " + t2(this.scl_inter)) + "\n" + ("Slice End = " + this.slice_end) + "\n" + ("Slice Code = " + this.slice_code) + "\n" + ("Units Code = " + this.xyzt_units + " (" + this.getUnitsCodeString(_r.SPATIAL_UNITS_MASK & this.xyzt_units) + ", " + this.getUnitsCodeString(_r.TEMPORAL_UNITS_MASK & this.xyzt_units)) + ")\n" + ("Display Range:  Max = " + t2(this.cal_max) + "  Min = " + t2(this.cal_min)) + "\n" + ("Slice Duration = " + this.slice_duration) + "\n" + ("Time Axis Shift = " + this.toffset) + "\n" + ('Description: "' + this.description) + '"\n' + ('Auxiliary File: "' + this.aux_file) + '"\n' + ("Q-Form Code = " + this.qform_code + " (" + this.getTransformCodeString(this.qform_code)) + ")\n" + ("S-Form Code = " + this.sform_code + " (" + this.getTransformCodeString(this.sform_code)) + ")\n" + ("Quaternion Parameters:  b = " + t2(this.quatern_b) + "  c = " + t2(this.quatern_c) + "  d = " + t2(this.quatern_d)) + "\n" + ("Quaternion Offsets:  x = " + this.qoffset_x + "  y = " + this.qoffset_y + "  z = " + this.qoffset_z) + "\n" + ("S-Form Parameters X: " + t2(this.affine[0][0]) + ", " + t2(this.affine[0][1]) + ", " + t2(this.affine[0][2]) + ", " + t2(this.affine[0][3])) + "\n" + ("S-Form Parameters Y: " + t2(this.affine[1][0]) + ", " + t2(this.affine[1][1]) + ", " + t2(this.affine[1][2]) + ", " + t2(this.affine[1][3])) + "\n" + ("S-Form Parameters Z: " + t2(this.affine[2][0]) + ", " + t2(this.affine[2][1]) + ", " + t2(this.affine[2][2]) + ", " + t2(this.affine[2][3])) + "\n" + ('Intent Name: "' + this.intent_name) + '"\n', this.extensionFlag[0] && (e2 += "Extension: Size = " + this.extensionSize + "  Code = " + this.extensionCode + "\n"), e2;
      }
      getQformMat() {
        return this.convertNiftiQFormToNiftiSForm(this.quatern_b, this.quatern_c, this.quatern_d, this.qoffset_x, this.qoffset_y, this.qoffset_z, this.pixDims[1], this.pixDims[2], this.pixDims[3], this.pixDims[0]);
      }
      convertNiftiQFormToNiftiSForm(t2, e2, n2, i2, r2, s, a, o, u, l) {
        var f, h, c, d, p = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], g = t2, y = e2, v = n2;
        return p[3][0] = p[3][1] = p[3][2] = 0, p[3][3] = 1, (f = 1 - (g * g + y * y + v * v)) < 1e-7 ? (f = 1 / Math.sqrt(g * g + y * y + v * v), g *= f, y *= f, v *= f, f = 0) : f = Math.sqrt(f), h = a > 0 ? a : 1, c = o > 0 ? o : 1, d = u > 0 ? u : 1, l < 0 && (d = -d), p[0][0] = (f * f + g * g - y * y - v * v) * h, p[0][1] = 2 * (g * y - f * v) * c, p[0][2] = 2 * (g * v + f * y) * d, p[1][0] = 2 * (g * y + f * v) * h, p[1][1] = (f * f + y * y - g * g - v * v) * c, p[1][2] = 2 * (y * v - f * g) * d, p[2][0] = 2 * (g * v - f * y) * h, p[2][1] = 2 * (y * v + f * g) * c, p[2][2] = (f * f + v * v - y * y - g * g) * d, p[0][3] = i2, p[1][3] = r2, p[2][3] = s, p;
      }
      convertNiftiSFormToNEMA(t2) {
        var e2, n2, i2, r2, s, a, o, u, l, f, h, c, d, p, g, y, v, m, b, _, I, M, x, E, A, U, w, S, T, N, F, C, O;
        if (p = 0, U = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], w = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], e2 = t2[0][0], n2 = t2[0][1], i2 = t2[0][2], r2 = t2[1][0], s = t2[1][1], a = t2[1][2], o = t2[2][0], u = t2[2][1], l = t2[2][2], 0 === (f = Math.sqrt(e2 * e2 + r2 * r2 + o * o)) || (e2 /= f, r2 /= f, o /= f, 0 === (f = Math.sqrt(n2 * n2 + s * s + u * u)))) return null;
        if (n2 /= f, s /= f, u /= f, Math.abs(f = e2 * n2 + r2 * s + o * u) > 1e-4) {
          if (n2 -= f * e2, s -= f * r2, u -= f * o, 0 === (f = Math.sqrt(n2 * n2 + s * s + u * u))) return null;
          n2 /= f, s /= f, u /= f;
        }
        if (0 === (f = Math.sqrt(i2 * i2 + a * a + l * l)) ? (i2 = r2 * u - o * s, a = o * n2 - u * e2, l = e2 * s - r2 * n2) : (i2 /= f, a /= f, l /= f), Math.abs(f = e2 * i2 + r2 * a + o * l) > 1e-4) {
          if (i2 -= f * e2, a -= f * r2, l -= f * o, 0 === (f = Math.sqrt(i2 * i2 + a * a + l * l))) return null;
          i2 /= f, a /= f, l /= f;
        }
        if (Math.abs(f = n2 * i2 + s * a + u * l) > 1e-4) {
          if (i2 -= f * n2, a -= f * s, l -= f * u, 0 === (f = Math.sqrt(i2 * i2 + a * a + l * l))) return null;
          i2 /= f, a /= f, l /= f;
        }
        if (U[0][0] = e2, U[0][1] = n2, U[0][2] = i2, U[1][0] = r2, U[1][1] = s, U[1][2] = a, U[2][0] = o, U[2][1] = u, U[2][2] = l, 0 === (h = this.nifti_mat33_determ(U))) return null;
        for (c = 1, A = -666, m = I = M = x = 1, b = 2, _ = 3; c <= 3; c += 1) for (d = 1; d <= 3; d += 1) if (c !== d) {
          for (p = 1; p <= 3; p += 1) if (!(c === p || d === p)) for (g = -1, w[0][0] = w[0][1] = w[0][2] = w[1][0] = w[1][1] = w[1][2] = w[2][0] = w[2][1] = w[2][2] = 0; g <= 1; g += 2) for (y = -1; y <= 1; y += 2) for (v = -1; v <= 1; v += 2) w[0][c - 1] = g, w[1][d - 1] = y, w[2][p - 1] = v, this.nifti_mat33_determ(w) * h > 0 && (f = (E = this.nifti_mat33_mul(w, U))[0][0] + E[1][1] + E[2][2]) > A && (A = f, m = c, b = d, _ = p, I = g, M = y, x = v);
        }
        switch (S = T = N = F = C = O = "", m * I) {
          case 1:
            S = "X", F = "+";
            break;
          case -1:
            S = "X", F = "-";
            break;
          case 2:
            S = "Y", F = "+";
            break;
          case -2:
            S = "Y", F = "-";
            break;
          case 3:
            S = "Z", F = "+";
            break;
          case -3:
            S = "Z", F = "-";
        }
        switch (b * M) {
          case 1:
            T = "X", C = "+";
            break;
          case -1:
            T = "X", C = "-";
            break;
          case 2:
            T = "Y", C = "+";
            break;
          case -2:
            T = "Y", C = "-";
            break;
          case 3:
            T = "Z", C = "+";
            break;
          case -3:
            T = "Z", C = "-";
        }
        switch (_ * x) {
          case 1:
            N = "X", O = "+";
            break;
          case -1:
            N = "X", O = "-";
            break;
          case 2:
            N = "Y", O = "+";
            break;
          case -2:
            N = "Y", O = "-";
            break;
          case 3:
            N = "Z", O = "+";
            break;
          case -3:
            N = "Z", O = "-";
        }
        return S + T + N + F + C + O;
      }
      getExtensionLocation() {
        return _r.MAGIC_COOKIE + 4;
      }
      getExtensionSize(t2) {
        return i.Utils.getIntAt(t2, this.getExtensionLocation(), this.littleEndian);
      }
      getExtensionCode(t2) {
        return i.Utils.getIntAt(t2, this.getExtensionLocation() + 4, this.littleEndian);
      }
      addExtension(t2, e2 = -1) {
        -1 == e2 ? this.extensions.push(t2) : this.extensions.splice(e2, 0, t2), this.vox_offset += t2.esize;
      }
      removeExtension(t2) {
        let e2 = this.extensions[t2];
        e2 && (this.vox_offset -= e2.esize), this.extensions.splice(t2, 1);
      }
      toArrayBuffer(t2 = false) {
        let e2 = 352;
        if (t2) for (let t3 of this.extensions) e2 += t3.esize;
        let n2 = new Uint8Array(e2), i2 = new DataView(n2.buffer);
        i2.setInt32(0, 348, this.littleEndian), i2.setUint8(39, this.dim_info);
        for (let t3 = 0; t3 < 8; t3++) i2.setUint16(40 + 2 * t3, this.dims[t3], this.littleEndian);
        i2.setFloat32(56, this.intent_p1, this.littleEndian), i2.setFloat32(60, this.intent_p2, this.littleEndian), i2.setFloat32(64, this.intent_p3, this.littleEndian), i2.setInt16(68, this.intent_code, this.littleEndian), i2.setInt16(70, this.datatypeCode, this.littleEndian), i2.setInt16(72, this.numBitsPerVoxel, this.littleEndian), i2.setInt16(74, this.slice_start, this.littleEndian);
        for (let t3 = 0; t3 < 8; t3++) i2.setFloat32(76 + 4 * t3, this.pixDims[t3], this.littleEndian);
        i2.setFloat32(108, this.vox_offset, this.littleEndian), i2.setFloat32(112, this.scl_slope, this.littleEndian), i2.setFloat32(116, this.scl_inter, this.littleEndian), i2.setInt16(120, this.slice_end, this.littleEndian), i2.setUint8(122, this.slice_code), i2.setUint8(123, this.xyzt_units), i2.setFloat32(124, this.cal_max, this.littleEndian), i2.setFloat32(128, this.cal_min, this.littleEndian), i2.setFloat32(132, this.slice_duration, this.littleEndian), i2.setFloat32(136, this.toffset, this.littleEndian), n2.set(Buffer.from(this.description), 148), n2.set(Buffer.from(this.aux_file), 228), i2.setInt16(252, this.qform_code, this.littleEndian), i2.setInt16(254, this.sform_code, this.littleEndian), i2.setFloat32(256, this.quatern_b, this.littleEndian), i2.setFloat32(260, this.quatern_c, this.littleEndian), i2.setFloat32(264, this.quatern_d, this.littleEndian), i2.setFloat32(268, this.qoffset_x, this.littleEndian), i2.setFloat32(272, this.qoffset_y, this.littleEndian), i2.setFloat32(276, this.qoffset_z, this.littleEndian);
        let r2 = this.affine.flat();
        for (let t3 = 0; t3 < 12; t3++) i2.setFloat32(280 + 4 * t3, r2[t3], this.littleEndian);
        if (n2.set(Buffer.from(this.intent_name), 328), n2.set(Buffer.from(this.magic), 344), t2) {
          n2.set(Uint8Array.from([1, 0, 0, 0]), 348);
          let t3 = this.getExtensionLocation();
          for (let e3 of this.extensions) i2.setInt32(t3, e3.esize, e3.littleEndian), i2.setInt32(t3 + 4, e3.ecode, e3.littleEndian), n2.set(new Uint8Array(e3.edata), t3 + 8), t3 += e3.esize;
        } else n2.set(new Uint8Array(4).fill(0), 348);
        return n2.buffer;
      }
    };
    __publicField(_r, "TYPE_NONE", 0);
    __publicField(_r, "TYPE_BINARY", 1);
    __publicField(_r, "TYPE_UINT8", 2);
    __publicField(_r, "TYPE_INT16", 4);
    __publicField(_r, "TYPE_INT32", 8);
    __publicField(_r, "TYPE_FLOAT32", 16);
    __publicField(_r, "TYPE_COMPLEX64", 32);
    __publicField(_r, "TYPE_FLOAT64", 64);
    __publicField(_r, "TYPE_RGB24", 128);
    __publicField(_r, "TYPE_INT8", 256);
    __publicField(_r, "TYPE_UINT16", 512);
    __publicField(_r, "TYPE_UINT32", 768);
    __publicField(_r, "TYPE_INT64", 1024);
    __publicField(_r, "TYPE_UINT64", 1280);
    __publicField(_r, "TYPE_FLOAT128", 1536);
    __publicField(_r, "TYPE_COMPLEX128", 1792);
    __publicField(_r, "TYPE_COMPLEX256", 2048);
    __publicField(_r, "XFORM_UNKNOWN", 0);
    __publicField(_r, "XFORM_SCANNER_ANAT", 1);
    __publicField(_r, "XFORM_ALIGNED_ANAT", 2);
    __publicField(_r, "XFORM_TALAIRACH", 3);
    __publicField(_r, "XFORM_MNI_152", 4);
    __publicField(_r, "SPATIAL_UNITS_MASK", 7);
    __publicField(_r, "TEMPORAL_UNITS_MASK", 56);
    __publicField(_r, "UNITS_UNKNOWN", 0);
    __publicField(_r, "UNITS_METER", 1);
    __publicField(_r, "UNITS_MM", 2);
    __publicField(_r, "UNITS_MICRON", 3);
    __publicField(_r, "UNITS_SEC", 8);
    __publicField(_r, "UNITS_MSEC", 16);
    __publicField(_r, "UNITS_USEC", 24);
    __publicField(_r, "UNITS_HZ", 32);
    __publicField(_r, "UNITS_PPM", 40);
    __publicField(_r, "UNITS_RADS", 48);
    __publicField(_r, "MAGIC_COOKIE", 348);
    __publicField(_r, "STANDARD_HEADER_SIZE", 348);
    __publicField(_r, "MAGIC_NUMBER_LOCATION", 344);
    __publicField(_r, "MAGIC_NUMBER", [110, 43, 49]);
    __publicField(_r, "MAGIC_NUMBER2", [110, 105, 49]);
    __publicField(_r, "EXTENSION_HEADER_SIZE", 8);
    let r = _r;
    e.NIFTI1 = r;
  }, 5655: function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: true }), e.NIFTI2 = void 0;
    let i = n(8244), r = n(9145);
    const _s = class _s {
      constructor() {
        __publicField(this, "littleEndian", false);
        __publicField(this, "dim_info", 0);
        __publicField(this, "dims", []);
        __publicField(this, "intent_p1", 0);
        __publicField(this, "intent_p2", 0);
        __publicField(this, "intent_p3", 0);
        __publicField(this, "intent_code", 0);
        __publicField(this, "datatypeCode", 0);
        __publicField(this, "numBitsPerVoxel", 0);
        __publicField(this, "slice_start", 0);
        __publicField(this, "slice_end", 0);
        __publicField(this, "slice_code", 0);
        __publicField(this, "pixDims", []);
        __publicField(this, "vox_offset", 0);
        __publicField(this, "scl_slope", 1);
        __publicField(this, "scl_inter", 0);
        __publicField(this, "xyzt_units", 0);
        __publicField(this, "cal_max", 0);
        __publicField(this, "cal_min", 0);
        __publicField(this, "slice_duration", 0);
        __publicField(this, "toffset", 0);
        __publicField(this, "description", "");
        __publicField(this, "aux_file", "");
        __publicField(this, "intent_name", "");
        __publicField(this, "qform_code", 0);
        __publicField(this, "sform_code", 0);
        __publicField(this, "quatern_b", 0);
        __publicField(this, "quatern_c", 0);
        __publicField(this, "quatern_d", 0);
        __publicField(this, "qoffset_x", 0);
        __publicField(this, "qoffset_y", 0);
        __publicField(this, "qoffset_z", 0);
        __publicField(this, "affine", [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
        __publicField(this, "magic", "0");
        __publicField(this, "extensionFlag", [0, 0, 0, 0]);
        __publicField(this, "extensions", []);
        __publicField(this, "extensionSize", 0);
        __publicField(this, "extensionCode", 0);
        __publicField(this, "getExtensionLocation", function() {
          return _s.MAGIC_COOKIE + 4;
        });
        __publicField(this, "getExtensionSize", i.NIFTI1.prototype.getExtensionSize);
        __publicField(this, "getExtensionCode", i.NIFTI1.prototype.getExtensionCode);
        __publicField(this, "addExtension", i.NIFTI1.prototype.addExtension);
        __publicField(this, "removeExtension", i.NIFTI1.prototype.removeExtension);
        __publicField(this, "getDatatypeCodeString", i.NIFTI1.prototype.getDatatypeCodeString);
        __publicField(this, "getTransformCodeString", i.NIFTI1.prototype.getTransformCodeString);
        __publicField(this, "getUnitsCodeString", i.NIFTI1.prototype.getUnitsCodeString);
        __publicField(this, "getQformMat", i.NIFTI1.prototype.getQformMat);
        __publicField(this, "convertNiftiQFormToNiftiSForm", i.NIFTI1.prototype.convertNiftiQFormToNiftiSForm);
        __publicField(this, "convertNiftiSFormToNEMA", i.NIFTI1.prototype.convertNiftiSFormToNEMA);
        __publicField(this, "nifti_mat33_mul", i.NIFTI1.prototype.nifti_mat33_mul);
        __publicField(this, "nifti_mat33_determ", i.NIFTI1.prototype.nifti_mat33_determ);
      }
      readHeader(t2) {
        var e2, n2, i2, a, o = new DataView(t2), u = r.Utils.getIntAt(o, 0, this.littleEndian);
        if (u !== _s.MAGIC_COOKIE && (this.littleEndian = true, u = r.Utils.getIntAt(o, 0, this.littleEndian)), u !== _s.MAGIC_COOKIE) throw Error("This does not appear to be a NIFTI file!");
        for (e2 = 0, this.magic = r.Utils.getStringAt(o, 4, 12), this.datatypeCode = r.Utils.getShortAt(o, 12, this.littleEndian), this.numBitsPerVoxel = r.Utils.getShortAt(o, 14, this.littleEndian); e2 < 8; e2 += 1) a = 16 + 8 * e2, this.dims[e2] = r.Utils.getLongAt(o, a, this.littleEndian);
        for (e2 = 0, this.intent_p1 = r.Utils.getDoubleAt(o, 80, this.littleEndian), this.intent_p2 = r.Utils.getDoubleAt(o, 88, this.littleEndian), this.intent_p3 = r.Utils.getDoubleAt(o, 96, this.littleEndian); e2 < 8; e2 += 1) a = 104 + 8 * e2, this.pixDims[e2] = r.Utils.getDoubleAt(o, a, this.littleEndian);
        for (n2 = 0, this.vox_offset = r.Utils.getLongAt(o, 168, this.littleEndian), this.scl_slope = r.Utils.getDoubleAt(o, 176, this.littleEndian), this.scl_inter = r.Utils.getDoubleAt(o, 184, this.littleEndian), this.cal_max = r.Utils.getDoubleAt(o, 192, this.littleEndian), this.cal_min = r.Utils.getDoubleAt(o, 200, this.littleEndian), this.slice_duration = r.Utils.getDoubleAt(o, 208, this.littleEndian), this.toffset = r.Utils.getDoubleAt(o, 216, this.littleEndian), this.slice_start = r.Utils.getLongAt(o, 224, this.littleEndian), this.slice_end = r.Utils.getLongAt(o, 232, this.littleEndian), this.description = r.Utils.getStringAt(o, 240, 320), this.aux_file = r.Utils.getStringAt(o, 320, 344), this.qform_code = r.Utils.getIntAt(o, 344, this.littleEndian), this.sform_code = r.Utils.getIntAt(o, 348, this.littleEndian), this.quatern_b = r.Utils.getDoubleAt(o, 352, this.littleEndian), this.quatern_c = r.Utils.getDoubleAt(o, 360, this.littleEndian), this.quatern_d = r.Utils.getDoubleAt(o, 368, this.littleEndian), this.qoffset_x = r.Utils.getDoubleAt(o, 376, this.littleEndian), this.qoffset_y = r.Utils.getDoubleAt(o, 384, this.littleEndian), this.qoffset_z = r.Utils.getDoubleAt(o, 392, this.littleEndian); n2 < 3; n2 += 1) for (i2 = 0; i2 < 4; i2 += 1) a = 400 + (4 * n2 + i2) * 8, this.affine[n2][i2] = r.Utils.getDoubleAt(o, a, this.littleEndian);
        this.affine[3][0] = 0, this.affine[3][1] = 0, this.affine[3][2] = 0, this.affine[3][3] = 1, this.slice_code = r.Utils.getIntAt(o, 496, this.littleEndian), this.xyzt_units = r.Utils.getIntAt(o, 500, this.littleEndian), this.intent_code = r.Utils.getIntAt(o, 504, this.littleEndian), this.intent_name = r.Utils.getStringAt(o, 508, 524), this.dim_info = r.Utils.getByteAt(o, 524), o.byteLength > _s.MAGIC_COOKIE && (this.extensionFlag[0] = r.Utils.getByteAt(o, 540), this.extensionFlag[1] = r.Utils.getByteAt(o, 541), this.extensionFlag[2] = r.Utils.getByteAt(o, 542), this.extensionFlag[3] = r.Utils.getByteAt(o, 543), this.extensionFlag[0] && (this.extensions = r.Utils.getExtensionsAt(o, this.getExtensionLocation(), this.littleEndian, this.vox_offset), this.extensionSize = this.extensions[0].esize, this.extensionCode = this.extensions[0].ecode));
      }
      toFormattedString() {
        var t2 = r.Utils.formatNumber, e2 = "";
        return e2 + ("Datatype = " + +this.datatypeCode + " (" + this.getDatatypeCodeString(this.datatypeCode) + ")\n" + ("Bits Per Voxel =  = " + this.numBitsPerVoxel) + "\n" + ("Image Dimensions (1-8): " + this.dims[0] + ", " + this.dims[1] + ", " + this.dims[2] + ", " + this.dims[3] + ", " + this.dims[4] + ", " + this.dims[5] + ", " + this.dims[6] + ", " + this.dims[7]) + "\n" + ("Intent Parameters (1-3): " + this.intent_p1 + ", " + this.intent_p2 + ", " + this.intent_p3) + "\n" + ("Voxel Dimensions (1-8): " + t2(this.pixDims[0]) + ", " + t2(this.pixDims[1]) + ", " + t2(this.pixDims[2]) + ", " + t2(this.pixDims[3]) + ", " + t2(this.pixDims[4]) + ", " + t2(this.pixDims[5]) + ", " + t2(this.pixDims[6]) + ", " + t2(this.pixDims[7])) + "\n" + ("Image Offset = " + this.vox_offset) + "\n" + ("Data Scale:  Slope = " + t2(this.scl_slope) + "  Intercept = " + t2(this.scl_inter)) + "\n" + ("Display Range:  Max = " + t2(this.cal_max) + "  Min = " + t2(this.cal_min)) + "\n" + ("Slice Duration = " + this.slice_duration) + "\n" + ("Time Axis Shift = " + this.toffset) + "\n" + ("Slice Start = " + this.slice_start) + "\n" + ("Slice End = " + this.slice_end) + "\n" + ('Description: "' + this.description) + '"\n' + ('Auxiliary File: "' + this.aux_file) + '"\n' + ("Q-Form Code = " + this.qform_code + " (" + this.getTransformCodeString(this.qform_code)) + ")\n" + ("S-Form Code = " + this.sform_code + " (" + this.getTransformCodeString(this.sform_code)) + ")\n" + ("Quaternion Parameters:  b = " + t2(this.quatern_b) + "  c = " + t2(this.quatern_c) + "  d = " + t2(this.quatern_d)) + "\n" + ("Quaternion Offsets:  x = " + this.qoffset_x + "  y = " + this.qoffset_y + "  z = " + this.qoffset_z) + "\n" + ("S-Form Parameters X: " + t2(this.affine[0][0]) + ", " + t2(this.affine[0][1]) + ", " + t2(this.affine[0][2]) + ", " + t2(this.affine[0][3])) + "\n" + ("S-Form Parameters Y: " + t2(this.affine[1][0]) + ", " + t2(this.affine[1][1]) + ", " + t2(this.affine[1][2]) + ", " + t2(this.affine[1][3])) + "\n" + ("S-Form Parameters Z: " + t2(this.affine[2][0]) + ", " + t2(this.affine[2][1]) + ", " + t2(this.affine[2][2]) + ", " + t2(this.affine[2][3])) + "\n" + ("Slice Code = " + this.slice_code) + "\n" + ("Units Code = " + this.xyzt_units + " (" + this.getUnitsCodeString(i.NIFTI1.SPATIAL_UNITS_MASK & this.xyzt_units) + ", " + this.getUnitsCodeString(i.NIFTI1.TEMPORAL_UNITS_MASK & this.xyzt_units)) + ")\n" + ("Intent Code = " + this.intent_code) + "\n" + ('Intent Name: "' + this.intent_name) + '"\n' + ("Dim Info = " + this.dim_info) + "\n");
      }
      toArrayBuffer(t2 = false) {
        let e2 = 544;
        if (t2) for (let t3 of this.extensions) e2 += t3.esize;
        let n2 = new Uint8Array(e2), i2 = new DataView(n2.buffer);
        i2.setInt32(0, 540, this.littleEndian), n2.set(Buffer.from(this.magic), 4), i2.setInt16(12, this.datatypeCode, this.littleEndian), i2.setInt16(14, this.numBitsPerVoxel, this.littleEndian);
        for (let t3 = 0; t3 < 8; t3++) i2.setBigInt64(16 + 8 * t3, BigInt(this.dims[t3]), this.littleEndian);
        i2.setFloat64(80, this.intent_p1, this.littleEndian), i2.setFloat64(88, this.intent_p2, this.littleEndian), i2.setFloat64(96, this.intent_p3, this.littleEndian);
        for (let t3 = 0; t3 < 8; t3++) i2.setFloat64(104 + 8 * t3, this.pixDims[t3], this.littleEndian);
        i2.setBigInt64(168, BigInt(this.vox_offset), this.littleEndian), i2.setFloat64(176, this.scl_slope, this.littleEndian), i2.setFloat64(184, this.scl_inter, this.littleEndian), i2.setFloat64(192, this.cal_max, this.littleEndian), i2.setFloat64(200, this.cal_min, this.littleEndian), i2.setFloat64(208, this.slice_duration, this.littleEndian), i2.setFloat64(216, this.toffset, this.littleEndian), i2.setBigInt64(224, BigInt(this.slice_start), this.littleEndian), i2.setBigInt64(232, BigInt(this.slice_end), this.littleEndian), n2.set(Buffer.from(this.description), 240), n2.set(Buffer.from(this.aux_file), 320), i2.setInt32(344, this.qform_code, this.littleEndian), i2.setInt32(348, this.sform_code, this.littleEndian), i2.setFloat64(352, this.quatern_b, this.littleEndian), i2.setFloat64(360, this.quatern_c, this.littleEndian), i2.setFloat64(368, this.quatern_d, this.littleEndian), i2.setFloat64(376, this.qoffset_x, this.littleEndian), i2.setFloat64(384, this.qoffset_y, this.littleEndian), i2.setFloat64(392, this.qoffset_z, this.littleEndian);
        let r2 = this.affine.flat();
        for (let t3 = 0; t3 < 12; t3++) i2.setFloat64(400 + 8 * t3, r2[t3], this.littleEndian);
        if (i2.setInt32(496, this.slice_code, this.littleEndian), i2.setInt32(500, this.xyzt_units, this.littleEndian), i2.setInt32(504, this.intent_code, this.littleEndian), n2.set(Buffer.from(this.intent_name), 508), i2.setUint8(524, this.dim_info), t2) {
          n2.set(Uint8Array.from([1, 0, 0, 0]), 540);
          let t3 = this.getExtensionLocation();
          for (let e3 of this.extensions) i2.setInt32(t3, e3.esize, e3.littleEndian), i2.setInt32(t3 + 4, e3.ecode, e3.littleEndian), n2.set(new Uint8Array(e3.edata), t3 + 8), t3 += e3.esize;
        } else n2.set(new Uint8Array(4).fill(0), 540);
        return n2.buffer;
      }
    };
    __publicField(_s, "MAGIC_COOKIE", 540);
    __publicField(_s, "MAGIC_NUMBER_LOCATION", 4);
    __publicField(_s, "MAGIC_NUMBER", [110, 43, 50, 0, 13, 10, 26, 10]);
    __publicField(_s, "MAGIC_NUMBER2", [110, 105, 50, 0, 13, 10, 26, 10]);
    let s = _s;
    e.NIFTI2 = s;
  }, 9145: function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: true }), e.Utils = void 0;
    let i = n(7256);
    const _r = class _r {
      static getStringAt(t2, e2, n2) {
        var i2, r2, s = "";
        for (i2 = e2; i2 < n2; i2 += 1) 0 !== (r2 = t2.getUint8(i2)) && (s += String.fromCharCode(r2));
        return s;
      }
      static getIntAt(t2, e2, n2) {
        return t2.getInt32(e2, n2);
      }
      static getFloatAt(t2, e2, n2) {
        return t2.getFloat32(e2, n2);
      }
      static getDoubleAt(t2, e2, n2) {
        return t2.getFloat64(e2, n2);
      }
      static getLongAt(t2, e2, n2) {
        var i2, s = [], a = 0;
        for (i2 = 0; i2 < 8; i2 += 1) s[i2] = _r.getByteAt(t2, e2 + i2);
        for (i2 = s.length - 1; i2 >= 0; i2--) a = 256 * a + s[i2];
        return a;
      }
      static getExtensionsAt(t2, e2, n2, s) {
        let a = [], o = e2;
        for (; o < s; ) {
          let e3 = n2, u = _r.getIntAt(t2, o, n2);
          if (!u) break;
          if (u + o > s && (e3 = !e3, (u = _r.getIntAt(t2, o, e3)) + o > s)) throw Error("This does not appear to be a valid NIFTI extension");
          if (u % 16 != 0) throw Error("This does not appear to be a NIFTI extension");
          let l = _r.getIntAt(t2, o + 4, e3), f = t2.buffer.slice(o + 8, o + u);
          console.log("extensionByteIndex: " + (o + 8) + " esize: " + u), console.log(f);
          let h = new i.NIFTIEXTENSION(u, l, f, e3);
          a.push(h), o += u;
        }
        return a;
      }
      static toArrayBuffer(t2) {
        var e2, n2, i2;
        for (i2 = 0, n2 = new Uint8Array(e2 = new ArrayBuffer(t2.length)); i2 < t2.length; i2 += 1) n2[i2] = t2[i2];
        return e2;
      }
      static isString(t2) {
        return "string" == typeof t2 || t2 instanceof String;
      }
      static formatNumber(t2, e2) {
        let n2;
        return n2 = _r.isString(t2) ? Number(t2) : t2, parseFloat(n2 = e2 ? n2.toPrecision(5) : n2.toPrecision(7));
      }
      static makeCRCTable() {
        let t2;
        let e2 = [];
        for (var n2 = 0; n2 < 256; n2++) {
          t2 = n2;
          for (var i2 = 0; i2 < 8; i2++) t2 = 1 & t2 ? 3988292384 ^ t2 >>> 1 : t2 >>> 1;
          e2[n2] = t2;
        }
        return e2;
      }
      static crc32(t2) {
        _r.crcTable || (_r.crcTable = _r.makeCRCTable());
        let e2 = _r.crcTable, n2 = -1;
        for (var i2 = 0; i2 < t2.byteLength; i2++) n2 = n2 >>> 8 ^ e2[(n2 ^ t2.getUint8(i2)) & 255];
        return (-1 ^ n2) >>> 0;
      }
    };
    __publicField(_r, "crcTable", null);
    __publicField(_r, "GUNZIP_MAGIC_COOKIE1", 31);
    __publicField(_r, "GUNZIP_MAGIC_COOKIE2", 139);
    __publicField(_r, "getByteAt", function(t2, e2) {
      return t2.getInt8(e2);
    });
    __publicField(_r, "getShortAt", function(t2, e2, n2) {
      return t2.getInt16(e2, n2);
    });
    let r = _r;
    e.Utils = r;
  }, 7632: function(t, e) {
    "use strict";
    var n = {}, i = {};
    i.default = function(t10, e2, i2, r2, s2) {
      var a2 = new Worker(n[e2] || (n[e2] = URL.createObjectURL(new Blob([t10 + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'], { type: "text/javascript" }))));
      return a2.onmessage = function(t11) {
        var e3 = t11.data, n2 = e3.$e$;
        if (n2) {
          var i3 = Error(n2[0]);
          i3.code = n2[1], i3.stack = n2[2], s2(i3, null);
        } else s2(null, e3);
      }, a2.postMessage(i2, r2), a2;
    };
    var r = Uint8Array, s = Uint16Array, a = Int32Array, o = new r([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), u = new r([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), l = new r([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), f = function(t10, e2) {
      for (var n2 = new s(31), i2 = 0; i2 < 31; ++i2) n2[i2] = e2 += 1 << t10[i2 - 1];
      for (var r2 = new a(n2[30]), i2 = 1; i2 < 30; ++i2) for (var o2 = n2[i2]; o2 < n2[i2 + 1]; ++o2) r2[o2] = o2 - n2[i2] << 5 | i2;
      return { b: n2, r: r2 };
    }, h = f(o, 2), c = h.b, d = h.r;
    c[28] = 258, d[258] = 28;
    for (var p = f(u, 0), g = p.b, y = p.r, v = new s(32768), m = 0; m < 32768; ++m) {
      var b = (43690 & m) >> 1 | (21845 & m) << 1;
      b = (61680 & (b = (52428 & b) >> 2 | (13107 & b) << 2)) >> 4 | (3855 & b) << 4, v[m] = ((65280 & b) >> 8 | (255 & b) << 8) >> 1;
    }
    for (var _ = function(t10, e2, n2) {
      for (var i2, r2 = t10.length, a2 = 0, o2 = new s(e2); a2 < r2; ++a2) t10[a2] && ++o2[t10[a2] - 1];
      var u2 = new s(e2);
      for (a2 = 1; a2 < e2; ++a2) u2[a2] = u2[a2 - 1] + o2[a2 - 1] << 1;
      if (n2) {
        i2 = new s(1 << e2);
        var l2 = 15 - e2;
        for (a2 = 0; a2 < r2; ++a2) if (t10[a2]) for (var f2 = a2 << 4 | t10[a2], h2 = e2 - t10[a2], c2 = u2[t10[a2] - 1]++ << h2, d2 = c2 | (1 << h2) - 1; c2 <= d2; ++c2) i2[v[c2] >> l2] = f2;
      } else for (a2 = 0, i2 = new s(r2); a2 < r2; ++a2) t10[a2] && (i2[a2] = v[u2[t10[a2] - 1]++] >> 15 - t10[a2]);
      return i2;
    }, I = new r(288), m = 0; m < 144; ++m) I[m] = 8;
    for (var m = 144; m < 256; ++m) I[m] = 9;
    for (var m = 256; m < 280; ++m) I[m] = 7;
    for (var m = 280; m < 288; ++m) I[m] = 8;
    for (var M = new r(32), m = 0; m < 32; ++m) M[m] = 5;
    var x = _(I, 9, 0), E = _(I, 9, 1), A = _(M, 5, 0), U = _(M, 5, 1), w = function(t10) {
      for (var e2 = t10[0], n2 = 1; n2 < t10.length; ++n2) t10[n2] > e2 && (e2 = t10[n2]);
      return e2;
    }, S = function(t10, e2, n2) {
      var i2 = e2 / 8 | 0;
      return (t10[i2] | t10[i2 + 1] << 8) >> (7 & e2) & n2;
    }, T = function(t10, e2) {
      var n2 = e2 / 8 | 0;
      return (t10[n2] | t10[n2 + 1] << 8 | t10[n2 + 2] << 16) >> (7 & e2);
    }, N = function(t10) {
      return (t10 + 7) / 8 | 0;
    }, F = function(t10, e2, n2) {
      return (null == e2 || e2 < 0) && (e2 = 0), (null == n2 || n2 > t10.length) && (n2 = t10.length), new r(t10.subarray(e2, n2));
    };
    e.FlateErrorCode = { UnexpectedEOF: 0, InvalidBlockType: 1, InvalidLengthLiteral: 2, InvalidDistance: 3, StreamFinished: 4, NoStreamHandler: 5, InvalidHeader: 6, NoCallback: 7, InvalidUTF8: 8, ExtraFieldTooLong: 9, InvalidDate: 10, FilenameTooLong: 11, StreamFinishing: 12, InvalidZipData: 13, UnknownCompressionMethod: 14 };
    var C = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], O = function(t10, e2, n2) {
      var i2 = Error(e2 || C[t10]);
      if (i2.code = t10, Error.captureStackTrace && Error.captureStackTrace(i2, O), !n2) throw i2;
      return i2;
    }, k = function(t10, e2, n2, i2) {
      var s2 = t10.length, a2 = i2 ? i2.length : 0;
      if (!s2 || e2.f && !e2.l) return n2 || new r(0);
      var f2 = !n2, h2 = f2 || 2 != e2.i, d2 = e2.i;
      f2 && (n2 = new r(3 * s2));
      var p2 = function(t11) {
        var e3 = n2.length;
        if (t11 > e3) {
          var i3 = new r(Math.max(2 * e3, t11));
          i3.set(n2), n2 = i3;
        }
      }, y2 = e2.f || 0, v2 = e2.p || 0, m2 = e2.b || 0, b2 = e2.l, I2 = e2.d, M2 = e2.m, x2 = e2.n, A2 = 8 * s2;
      do {
        if (!b2) {
          y2 = S(t10, v2, 1);
          var C2 = S(t10, v2 + 1, 3);
          if (v2 += 3, C2) {
            if (1 == C2) b2 = E, I2 = U, M2 = 9, x2 = 5;
            else if (2 == C2) {
              var k2 = S(t10, v2, 31) + 257, B2 = S(t10, v2 + 10, 15) + 4, D2 = k2 + S(t10, v2 + 5, 31) + 1;
              v2 += 14;
              for (var z2 = new r(D2), q2 = new r(19), P2 = 0; P2 < B2; ++P2) q2[l[P2]] = S(t10, v2 + 3 * P2, 7);
              v2 += 3 * B2;
              for (var R2 = w(q2), L2 = (1 << R2) - 1, j2 = _(q2, R2, 1), P2 = 0; P2 < D2; ) {
                var G2 = j2[S(t10, v2, L2)];
                v2 += 15 & G2;
                var V2 = G2 >> 4;
                if (V2 < 16) z2[P2++] = V2;
                else {
                  var Y2 = 0, X2 = 0;
                  for (16 == V2 ? (X2 = 3 + S(t10, v2, 3), v2 += 2, Y2 = z2[P2 - 1]) : 17 == V2 ? (X2 = 3 + S(t10, v2, 7), v2 += 3) : 18 == V2 && (X2 = 11 + S(t10, v2, 127), v2 += 7); X2--; ) z2[P2++] = Y2;
                }
              }
              var Z2 = z2.subarray(0, k2), W2 = z2.subarray(k2);
              M2 = w(Z2), x2 = w(W2), b2 = _(Z2, M2, 1), I2 = _(W2, x2, 1);
            } else O(1);
          } else {
            var V2 = N(v2) + 4, K2 = t10[V2 - 4] | t10[V2 - 3] << 8, $2 = V2 + K2;
            if ($2 > s2) {
              d2 && O(0);
              break;
            }
            h2 && p2(m2 + K2), n2.set(t10.subarray(V2, $2), m2), e2.b = m2 += K2, e2.p = v2 = 8 * $2, e2.f = y2;
            continue;
          }
          if (v2 > A2) {
            d2 && O(0);
            break;
          }
        }
        h2 && p2(m2 + 131072);
        for (var H2 = (1 << M2) - 1, Q2 = (1 << x2) - 1, J2 = v2; ; J2 = v2) {
          var Y2 = b2[T(t10, v2) & H2], tt2 = Y2 >> 4;
          if ((v2 += 15 & Y2) > A2) {
            d2 && O(0);
            break;
          }
          if (Y2 || O(2), tt2 < 256) n2[m2++] = tt2;
          else if (256 == tt2) {
            J2 = v2, b2 = null;
            break;
          } else {
            var te2 = tt2 - 254;
            if (tt2 > 264) {
              var P2 = tt2 - 257, tn2 = o[P2];
              te2 = S(t10, v2, (1 << tn2) - 1) + c[P2], v2 += tn2;
            }
            var ti2 = I2[T(t10, v2) & Q2], tr2 = ti2 >> 4;
            ti2 || O(3), v2 += 15 & ti2;
            var W2 = g[tr2];
            if (tr2 > 3) {
              var tn2 = u[tr2];
              W2 += T(t10, v2) & (1 << tn2) - 1, v2 += tn2;
            }
            if (v2 > A2) {
              d2 && O(0);
              break;
            }
            h2 && p2(m2 + 131072);
            var ts2 = m2 + te2;
            if (m2 < W2) {
              var ta2 = a2 - W2, to2 = Math.min(W2, ts2);
              for (ta2 + m2 < 0 && O(3); m2 < to2; ++m2) n2[m2] = i2[ta2 + m2];
            }
            for (; m2 < ts2; ++m2) n2[m2] = n2[m2 - W2];
          }
        }
        e2.l = b2, e2.p = J2, e2.b = m2, e2.f = y2, b2 && (y2 = 1, e2.m = M2, e2.d = I2, e2.n = x2);
      } while (!y2);
      return m2 != n2.length && f2 ? F(n2, 0, m2) : n2.subarray(0, m2);
    }, B = function(t10, e2, n2) {
      n2 <<= 7 & e2;
      var i2 = e2 / 8 | 0;
      t10[i2] |= n2, t10[i2 + 1] |= n2 >> 8;
    }, D = function(t10, e2, n2) {
      n2 <<= 7 & e2;
      var i2 = e2 / 8 | 0;
      t10[i2] |= n2, t10[i2 + 1] |= n2 >> 8, t10[i2 + 2] |= n2 >> 16;
    }, z = function(t10, e2) {
      for (var n2 = [], i2 = 0; i2 < t10.length; ++i2) t10[i2] && n2.push({ s: i2, f: t10[i2] });
      var a2 = n2.length, o2 = n2.slice();
      if (!a2) return { t: V, l: 0 };
      if (1 == a2) {
        var u2 = new r(n2[0].s + 1);
        return u2[n2[0].s] = 1, { t: u2, l: 1 };
      }
      n2.sort(function(t11, e3) {
        return t11.f - e3.f;
      }), n2.push({ s: -1, f: 25001 });
      var l2 = n2[0], f2 = n2[1], h2 = 0, c2 = 1, d2 = 2;
      for (n2[0] = { s: -1, f: l2.f + f2.f, l: l2, r: f2 }; c2 != a2 - 1; ) l2 = n2[n2[h2].f < n2[d2].f ? h2++ : d2++], f2 = n2[h2 != c2 && n2[h2].f < n2[d2].f ? h2++ : d2++], n2[c2++] = { s: -1, f: l2.f + f2.f, l: l2, r: f2 };
      for (var p2 = o2[0].s, i2 = 1; i2 < a2; ++i2) o2[i2].s > p2 && (p2 = o2[i2].s);
      var g2 = new s(p2 + 1), y2 = q(n2[c2 - 1], g2, 0);
      if (y2 > e2) {
        var i2 = 0, v2 = 0, m2 = y2 - e2, b2 = 1 << m2;
        for (o2.sort(function(t11, e3) {
          return g2[e3.s] - g2[t11.s] || t11.f - e3.f;
        }); i2 < a2; ++i2) {
          var _2 = o2[i2].s;
          if (g2[_2] > e2) v2 += b2 - (1 << y2 - g2[_2]), g2[_2] = e2;
          else break;
        }
        for (v2 >>= m2; v2 > 0; ) {
          var I2 = o2[i2].s;
          g2[I2] < e2 ? v2 -= 1 << e2 - g2[I2]++ - 1 : ++i2;
        }
        for (; i2 >= 0 && v2; --i2) {
          var M2 = o2[i2].s;
          g2[M2] == e2 && (--g2[M2], ++v2);
        }
        y2 = e2;
      }
      return { t: new r(g2), l: y2 };
    }, q = function(t10, e2, n2) {
      return -1 == t10.s ? Math.max(q(t10.l, e2, n2 + 1), q(t10.r, e2, n2 + 1)) : e2[t10.s] = n2;
    }, P = function(t10) {
      for (var e2 = t10.length; e2 && !t10[--e2]; ) ;
      for (var n2 = new s(++e2), i2 = 0, r2 = t10[0], a2 = 1, o2 = function(t11) {
        n2[i2++] = t11;
      }, u2 = 1; u2 <= e2; ++u2) if (t10[u2] == r2 && u2 != e2) ++a2;
      else {
        if (!r2 && a2 > 2) {
          for (; a2 > 138; a2 -= 138) o2(32754);
          a2 > 2 && (o2(a2 > 10 ? a2 - 11 << 5 | 28690 : a2 - 3 << 5 | 12305), a2 = 0);
        } else if (a2 > 3) {
          for (o2(r2), --a2; a2 > 6; a2 -= 6) o2(8304);
          a2 > 2 && (o2(a2 - 3 << 5 | 8208), a2 = 0);
        }
        for (; a2--; ) o2(r2);
        a2 = 1, r2 = t10[u2];
      }
      return { c: n2.subarray(0, i2), n: e2 };
    }, R = function(t10, e2) {
      for (var n2 = 0, i2 = 0; i2 < e2.length; ++i2) n2 += t10[i2] * e2[i2];
      return n2;
    }, L = function(t10, e2, n2) {
      var i2 = n2.length, r2 = N(e2 + 2);
      t10[r2] = 255 & i2, t10[r2 + 1] = i2 >> 8, t10[r2 + 2] = 255 ^ t10[r2], t10[r2 + 3] = 255 ^ t10[r2 + 1];
      for (var s2 = 0; s2 < i2; ++s2) t10[r2 + s2 + 4] = n2[s2];
      return (r2 + 4 + i2) * 8;
    }, j = function(t10, e2, n2, i2, r2, a2, f2, h2, c2, d2, p2) {
      B(e2, p2++, n2), ++r2[256];
      for (var g2, y2, v2, m2, b2 = z(r2, 15), E2 = b2.t, U2 = b2.l, w2 = z(a2, 15), S2 = w2.t, T2 = w2.l, N2 = P(E2), F2 = N2.c, C2 = N2.n, O2 = P(S2), k2 = O2.c, q2 = O2.n, j2 = new s(19), G2 = 0; G2 < F2.length; ++G2) ++j2[31 & F2[G2]];
      for (var G2 = 0; G2 < k2.length; ++G2) ++j2[31 & k2[G2]];
      for (var V2 = z(j2, 7), Y2 = V2.t, X2 = V2.l, Z2 = 19; Z2 > 4 && !Y2[l[Z2 - 1]]; --Z2) ;
      var W2 = d2 + 5 << 3, K2 = R(r2, I) + R(a2, M) + f2, $2 = R(r2, E2) + R(a2, S2) + f2 + 14 + 3 * Z2 + R(j2, Y2) + 2 * j2[16] + 3 * j2[17] + 7 * j2[18];
      if (c2 >= 0 && W2 <= K2 && W2 <= $2) return L(e2, p2, t10.subarray(c2, c2 + d2));
      if (B(e2, p2, 1 + ($2 < K2)), p2 += 2, $2 < K2) {
        g2 = _(E2, U2, 0), y2 = E2, v2 = _(S2, T2, 0), m2 = S2;
        var H2 = _(Y2, X2, 0);
        B(e2, p2, C2 - 257), B(e2, p2 + 5, q2 - 1), B(e2, p2 + 10, Z2 - 4), p2 += 14;
        for (var G2 = 0; G2 < Z2; ++G2) B(e2, p2 + 3 * G2, Y2[l[G2]]);
        p2 += 3 * Z2;
        for (var Q2 = [F2, k2], J2 = 0; J2 < 2; ++J2) for (var tt2 = Q2[J2], G2 = 0; G2 < tt2.length; ++G2) {
          var te2 = 31 & tt2[G2];
          B(e2, p2, H2[te2]), p2 += Y2[te2], te2 > 15 && (B(e2, p2, tt2[G2] >> 5 & 127), p2 += tt2[G2] >> 12);
        }
      } else g2 = x, y2 = I, v2 = A, m2 = M;
      for (var G2 = 0; G2 < h2; ++G2) {
        var tn2 = i2[G2];
        if (tn2 > 255) {
          var te2 = tn2 >> 18 & 31;
          D(e2, p2, g2[te2 + 257]), p2 += y2[te2 + 257], te2 > 7 && (B(e2, p2, tn2 >> 23 & 31), p2 += o[te2]);
          var ti2 = 31 & tn2;
          D(e2, p2, v2[ti2]), p2 += m2[ti2], ti2 > 3 && (D(e2, p2, tn2 >> 5 & 8191), p2 += u[ti2]);
        } else D(e2, p2, g2[tn2]), p2 += y2[tn2];
      }
      return D(e2, p2, g2[256]), p2 + y2[256];
    }, G = new a([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), V = new r(0), Y = function(t10, e2, n2, i2, l2, f2) {
      var h2 = f2.z || t10.length, c2 = new r(i2 + h2 + 5 * (1 + Math.ceil(h2 / 7e3)) + l2), p2 = c2.subarray(i2, c2.length - l2), g2 = f2.l, v2 = 7 & (f2.r || 0);
      if (e2) {
        v2 && (p2[0] = f2.r >> 3);
        for (var m2 = G[e2 - 1], b2 = m2 >> 13, _2 = 8191 & m2, I2 = (1 << n2) - 1, M2 = f2.p || new s(32768), x2 = f2.h || new s(I2 + 1), E2 = Math.ceil(n2 / 3), A2 = 2 * E2, U2 = function(e3) {
          return (t10[e3] ^ t10[e3 + 1] << E2 ^ t10[e3 + 2] << A2) & I2;
        }, w2 = new a(25e3), S2 = new s(288), T2 = new s(32), C2 = 0, O2 = 0, k2 = f2.i || 0, B2 = 0, D2 = f2.w || 0, z2 = 0; k2 + 2 < h2; ++k2) {
          var q2 = U2(k2), P2 = 32767 & k2, R2 = x2[q2];
          if (M2[P2] = R2, x2[q2] = P2, D2 <= k2) {
            var V2 = h2 - k2;
            if ((C2 > 7e3 || B2 > 24576) && (V2 > 423 || !g2)) {
              v2 = j(t10, p2, 0, w2, S2, T2, O2, B2, z2, k2 - z2, v2), B2 = C2 = O2 = 0, z2 = k2;
              for (var Y2 = 0; Y2 < 286; ++Y2) S2[Y2] = 0;
              for (var Y2 = 0; Y2 < 30; ++Y2) T2[Y2] = 0;
            }
            var X2 = 2, Z2 = 0, W2 = _2, K2 = P2 - R2 & 32767;
            if (V2 > 2 && q2 == U2(k2 - K2)) for (var $2 = Math.min(b2, V2) - 1, H2 = Math.min(32767, k2), Q2 = Math.min(258, V2); K2 <= H2 && --W2 && P2 != R2; ) {
              if (t10[k2 + X2] == t10[k2 + X2 - K2]) {
                for (var J2 = 0; J2 < Q2 && t10[k2 + J2] == t10[k2 + J2 - K2]; ++J2) ;
                if (J2 > X2) {
                  if (X2 = J2, Z2 = K2, J2 > $2) break;
                  for (var tt2 = Math.min(K2, J2 - 2), te2 = 0, Y2 = 0; Y2 < tt2; ++Y2) {
                    var tn2 = k2 - K2 + Y2 & 32767, ti2 = M2[tn2], tr2 = tn2 - ti2 & 32767;
                    tr2 > te2 && (te2 = tr2, R2 = tn2);
                  }
                }
              }
              R2 = M2[P2 = R2], K2 += P2 - R2 & 32767;
            }
            if (Z2) {
              w2[B2++] = 268435456 | d[X2] << 18 | y[Z2];
              var ts2 = 31 & d[X2], ta2 = 31 & y[Z2];
              O2 += o[ts2] + u[ta2], ++S2[257 + ts2], ++T2[ta2], D2 = k2 + X2, ++C2;
            } else w2[B2++] = t10[k2], ++S2[t10[k2]];
          }
        }
        for (k2 = Math.max(k2, D2); k2 < h2; ++k2) w2[B2++] = t10[k2], ++S2[t10[k2]];
        v2 = j(t10, p2, g2, w2, S2, T2, O2, B2, z2, k2 - z2, v2), g2 || (f2.r = 7 & v2 | p2[v2 / 8 | 0] << 3, v2 -= 7, f2.h = x2, f2.p = M2, f2.i = k2, f2.w = D2);
      } else {
        for (var k2 = f2.w || 0; k2 < h2 + g2; k2 += 65535) {
          var to2 = k2 + 65535;
          to2 >= h2 && (p2[v2 / 8 | 0] = g2, to2 = h2), v2 = L(p2, v2 + 1, t10.subarray(k2, to2));
        }
        f2.i = h2;
      }
      return F(c2, 0, i2 + N(v2) + l2);
    }, X = function() {
      for (var t10 = new Int32Array(256), e2 = 0; e2 < 256; ++e2) {
        for (var n2 = e2, i2 = 9; --i2; ) n2 = (1 & n2 && -306674912) ^ n2 >>> 1;
        t10[e2] = n2;
      }
      return t10;
    }(), Z = function() {
      var t10 = -1;
      return { p: function(e2) {
        for (var n2 = t10, i2 = 0; i2 < e2.length; ++i2) n2 = X[255 & n2 ^ e2[i2]] ^ n2 >>> 8;
        t10 = n2;
      }, d: function() {
        return ~t10;
      } };
    }, W = function() {
      var t10 = 1, e2 = 0;
      return { p: function(n2) {
        for (var i2 = t10, r2 = e2, s2 = 0 | n2.length, a2 = 0; a2 != s2; ) {
          for (var o2 = Math.min(a2 + 2655, s2); a2 < o2; ++a2) r2 += i2 += n2[a2];
          i2 = (65535 & i2) + 15 * (i2 >> 16), r2 = (65535 & r2) + 15 * (r2 >> 16);
        }
        t10 = i2, e2 = r2;
      }, d: function() {
        return t10 %= 65521, e2 %= 65521, (255 & t10) << 24 | (65280 & t10) << 8 | (255 & e2) << 8 | e2 >> 8;
      } };
    }, K = function(t10, e2, n2, i2, s2) {
      if (!s2 && (s2 = { l: 1 }, e2.dictionary)) {
        var a2 = e2.dictionary.subarray(-32768), o2 = new r(a2.length + t10.length);
        o2.set(a2), o2.set(t10, a2.length), t10 = o2, s2.w = a2.length;
      }
      return Y(t10, null == e2.level ? 6 : e2.level, null == e2.mem ? s2.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t10.length)))) : 20 : 12 + e2.mem, n2, i2, s2);
    }, $ = function(t10, e2) {
      var n2 = {};
      for (var i2 in t10) n2[i2] = t10[i2];
      for (var i2 in e2) n2[i2] = e2[i2];
      return n2;
    }, H = function(t10, e2, n2) {
      for (var i2 = t10(), r2 = t10.toString(), s2 = r2.slice(r2.indexOf("[") + 1, r2.lastIndexOf("]")).replace(/\s+/g, "").split(","), a2 = 0; a2 < i2.length; ++a2) {
        var o2 = i2[a2], u2 = s2[a2];
        if ("function" == typeof o2) {
          e2 += ";" + u2 + "=";
          var l2 = o2.toString();
          if (o2.prototype) {
            if (-1 != l2.indexOf("[native code]")) {
              var f2 = l2.indexOf(" ", 8) + 1;
              e2 += l2.slice(f2, l2.indexOf("(", f2));
            } else for (var h2 in e2 += l2, o2.prototype) e2 += ";" + u2 + ".prototype." + h2 + "=" + o2.prototype[h2].toString();
          } else e2 += l2;
        } else n2[u2] = o2;
      }
      return e2;
    }, Q = [], J = function(t10) {
      var e2 = [];
      for (var n2 in t10) t10[n2].buffer && e2.push((t10[n2] = new t10[n2].constructor(t10[n2])).buffer);
      return e2;
    }, tt = function(t10, e2, n2, r2) {
      if (!Q[n2]) {
        for (var s2 = "", a2 = {}, o2 = t10.length - 1, u2 = 0; u2 < o2; ++u2) s2 = H(t10[u2], s2, a2);
        Q[n2] = { c: H(t10[o2], s2, a2), e: a2 };
      }
      var l2 = $({}, Q[n2].e);
      return (0, i.default)(Q[n2].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + e2.toString() + "}", n2, l2, J(l2), r2);
    }, te = function() {
      return [r, s, a, o, u, l, c, g, E, U, v, C, _, w, S, T, N, F, O, k, tN, to, tu];
    }, tn = function() {
      return [r, s, a, o, u, l, d, y, x, I, A, M, v, G, V, _, B, D, z, q, P, R, L, j, N, F, Y, K, tU, to];
    }, ti = function() {
      return [ty, tb, tg, Z, X];
    }, tr = function() {
      return [tv, tm];
    }, ts = function() {
      return [t_, tg, W];
    }, ta = function() {
      return [tI];
    }, to = function(t10) {
      return postMessage(t10, [t10.buffer]);
    }, tu = function(t10) {
      return t10 && { out: t10.size && new r(t10.size), dictionary: t10.dictionary };
    }, tl = function(t10, e2, n2, i2, r2, s2) {
      var a2 = tt(n2, i2, r2, function(t11, e3) {
        a2.terminate(), s2(t11, e3);
      });
      return a2.postMessage([t10, e2], e2.consume ? [t10.buffer] : []), function() {
        a2.terminate();
      };
    }, tf = function(t10) {
      return t10.ondata = function(t11, e2) {
        return postMessage([t11, e2], [t11.buffer]);
      }, function(e2) {
        e2.data.length ? (t10.push(e2.data[0], e2.data[1]), postMessage([e2.data[0].length])) : t10.flush();
      };
    }, th = function(t10, e2, n2, i2, r2, s2, a2) {
      var o2, u2 = tt(t10, i2, r2, function(t11, n3) {
        t11 ? (u2.terminate(), e2.ondata.call(e2, t11)) : Array.isArray(n3) ? 1 == n3.length ? (e2.queuedSize -= n3[0], e2.ondrain && e2.ondrain(n3[0])) : (n3[1] && u2.terminate(), e2.ondata.call(e2, t11, n3[0], n3[1])) : a2(n3);
      });
      u2.postMessage(n2), e2.queuedSize = 0, e2.push = function(t11, n3) {
        e2.ondata || O(5), o2 && e2.ondata(O(4, 0, 1), null, !!n3), e2.queuedSize += t11.length, u2.postMessage([t11, o2 = n3], [t11.buffer]);
      }, e2.terminate = function() {
        u2.terminate();
      }, s2 && (e2.flush = function() {
        u2.postMessage([]);
      });
    }, tc = function(t10, e2) {
      return t10[e2] | t10[e2 + 1] << 8;
    }, td = function(t10, e2) {
      return (t10[e2] | t10[e2 + 1] << 8 | t10[e2 + 2] << 16 | t10[e2 + 3] << 24) >>> 0;
    }, tp = function(t10, e2) {
      return td(t10, e2) + 4294967296 * td(t10, e2 + 4);
    }, tg = function(t10, e2, n2) {
      for (; n2; ++e2) t10[e2] = n2, n2 >>>= 8;
    }, ty = function(t10, e2) {
      var n2 = e2.filename;
      if (t10[0] = 31, t10[1] = 139, t10[2] = 8, t10[8] = e2.level < 2 ? 4 : 9 == e2.level ? 2 : 0, t10[9] = 3, 0 != e2.mtime && tg(t10, 4, Math.floor(new Date(e2.mtime || Date.now()) / 1e3)), n2) {
        t10[3] = 8;
        for (var i2 = 0; i2 <= n2.length; ++i2) t10[i2 + 10] = n2.charCodeAt(i2);
      }
    }, tv = function(t10) {
      (31 != t10[0] || 139 != t10[1] || 8 != t10[2]) && O(6, "invalid gzip data");
      var e2 = t10[3], n2 = 10;
      4 & e2 && (n2 += (t10[10] | t10[11] << 8) + 2);
      for (var i2 = (e2 >> 3 & 1) + (e2 >> 4 & 1); i2 > 0; i2 -= !t10[n2++]) ;
      return n2 + (2 & e2);
    }, tm = function(t10) {
      var e2 = t10.length;
      return (t10[e2 - 4] | t10[e2 - 3] << 8 | t10[e2 - 2] << 16 | t10[e2 - 1] << 24) >>> 0;
    }, tb = function(t10) {
      return 10 + (t10.filename ? t10.filename.length + 1 : 0);
    }, t_ = function(t10, e2) {
      var n2 = e2.level;
      if (t10[0] = 120, t10[1] = (0 == n2 ? 0 : n2 < 6 ? 1 : 9 == n2 ? 3 : 2) << 6 | (e2.dictionary && 32), t10[1] |= 31 - (t10[0] << 8 | t10[1]) % 31, e2.dictionary) {
        var i2 = W();
        i2.p(e2.dictionary), tg(t10, 2, i2.d());
      }
    }, tI = function(t10, e2) {
      return ((15 & t10[0]) != 8 || t10[0] >> 4 > 7 || (t10[0] << 8 | t10[1]) % 31) && O(6, "invalid zlib data"), (t10[1] >> 5 & 1) == +!e2 && O(6, "invalid zlib data: " + (32 & t10[1] ? "need" : "unexpected") + " dictionary"), (t10[1] >> 3 & 4) + 2;
    };
    function tM(t10, e2) {
      return "function" == typeof t10 && (e2 = t10, t10 = {}), this.ondata = e2, t10;
    }
    var tx = function() {
      function t10(t11, e2) {
        if ("function" == typeof t11 && (e2 = t11, t11 = {}), this.ondata = e2, this.o = t11 || {}, this.s = { l: 0, i: 32768, w: 32768, z: 32768 }, this.b = new r(98304), this.o.dictionary) {
          var n2 = this.o.dictionary.subarray(-32768);
          this.b.set(n2, 32768 - n2.length), this.s.i = 32768 - n2.length;
        }
      }
      return t10.prototype.p = function(t11, e2) {
        this.ondata(K(t11, this.o, 0, 0, this.s), e2);
      }, t10.prototype.push = function(t11, e2) {
        this.ondata || O(5), this.s.l && O(4);
        var n2 = t11.length + this.s.z;
        if (n2 > this.b.length) {
          if (n2 > 2 * this.b.length - 32768) {
            var i2 = new r(-32768 & n2);
            i2.set(this.b.subarray(0, this.s.z)), this.b = i2;
          }
          var s2 = this.b.length - this.s.z;
          this.b.set(t11.subarray(0, s2), this.s.z), this.s.z = this.b.length, this.p(this.b, false), this.b.set(this.b.subarray(-32768)), this.b.set(t11.subarray(s2), 32768), this.s.z = t11.length - s2 + 32768, this.s.i = 32766, this.s.w = 32768;
        } else this.b.set(t11, this.s.z), this.s.z += t11.length;
        this.s.l = 1 & e2, (this.s.z > this.s.w + 8191 || e2) && (this.p(this.b, e2 || false), this.s.w = this.s.i, this.s.i -= 2);
      }, t10.prototype.flush = function() {
        this.ondata || O(5), this.s.l && O(4), this.p(this.b, false), this.s.w = this.s.i, this.s.i -= 2;
      }, t10;
    }();
    e.Deflate = tx;
    var tE = function(t10, e2) {
      th([tn, function() {
        return [tf, tx];
      }], this, tM.call(this, t10, e2), function(t11) {
        onmessage = tf(new tx(t11.data));
      }, 6, 1);
    };
    function tA(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), tl(t10, e2, [tn], function(t11) {
        return to(tU(t11.data[0], t11.data[1]));
      }, 0, n2);
    }
    function tU(t10, e2) {
      return K(t10, e2 || {}, 0, 0);
    }
    e.AsyncDeflate = tE, e.deflate = tA, e.deflateSync = tU;
    var tw = function() {
      function t10(t11, e2) {
        "function" == typeof t11 && (e2 = t11, t11 = {}), this.ondata = e2;
        var n2 = t11 && t11.dictionary && t11.dictionary.subarray(-32768);
        this.s = { i: 0, b: n2 ? n2.length : 0 }, this.o = new r(32768), this.p = new r(0), n2 && this.o.set(n2);
      }
      return t10.prototype.e = function(t11) {
        if (this.ondata || O(5), this.d && O(4), this.p.length) {
          if (t11.length) {
            var e2 = new r(this.p.length + t11.length);
            e2.set(this.p), e2.set(t11, this.p.length), this.p = e2;
          }
        } else this.p = t11;
      }, t10.prototype.c = function(t11) {
        this.s.i = +(this.d = t11 || false);
        var e2 = this.s.b, n2 = k(this.p, this.s, this.o);
        this.ondata(F(n2, e2, this.s.b), this.d), this.o = F(n2, this.s.b - 32768), this.s.b = this.o.length, this.p = F(this.p, this.s.p / 8 | 0), this.s.p &= 7;
      }, t10.prototype.push = function(t11, e2) {
        this.e(t11), this.c(e2);
      }, t10;
    }();
    e.Inflate = tw;
    var tS = function(t10, e2) {
      th([te, function() {
        return [tf, tw];
      }], this, tM.call(this, t10, e2), function(t11) {
        onmessage = tf(new tw(t11.data));
      }, 7, 0);
    };
    function tT(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), tl(t10, e2, [te], function(t11) {
        return to(tN(t11.data[0], tu(t11.data[1])));
      }, 1, n2);
    }
    function tN(t10, e2) {
      return k(t10, { i: 2 }, e2 && e2.out, e2 && e2.dictionary);
    }
    e.AsyncInflate = tS, e.inflate = tT, e.inflateSync = tN;
    var tF = function() {
      function t10(t11, e2) {
        this.c = Z(), this.l = 0, this.v = 1, tx.call(this, t11, e2);
      }
      return t10.prototype.push = function(t11, e2) {
        this.c.p(t11), this.l += t11.length, tx.prototype.push.call(this, t11, e2);
      }, t10.prototype.p = function(t11, e2) {
        var n2 = K(t11, this.o, this.v && tb(this.o), e2 && 8, this.s);
        this.v && (ty(n2, this.o), this.v = 0), e2 && (tg(n2, n2.length - 8, this.c.d()), tg(n2, n2.length - 4, this.l)), this.ondata(n2, e2);
      }, t10.prototype.flush = function() {
        tx.prototype.flush.call(this);
      }, t10;
    }();
    e.Gzip = tF, e.Compress = tF;
    var tC = function(t10, e2) {
      th([tn, ti, function() {
        return [tf, tx, tF];
      }], this, tM.call(this, t10, e2), function(t11) {
        onmessage = tf(new tF(t11.data));
      }, 8, 1);
    };
    function tO(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), tl(t10, e2, [tn, ti, function() {
        return [tk];
      }], function(t11) {
        return to(tk(t11.data[0], t11.data[1]));
      }, 2, n2);
    }
    function tk(t10, e2) {
      e2 || (e2 = {});
      var n2 = Z(), i2 = t10.length;
      n2.p(t10);
      var r2 = K(t10, e2, tb(e2), 8), s2 = r2.length;
      return ty(r2, e2), tg(r2, s2 - 8, n2.d()), tg(r2, s2 - 4, i2), r2;
    }
    e.AsyncGzip = tC, e.AsyncCompress = tC, e.gzip = tO, e.compress = tO, e.gzipSync = tk, e.compressSync = tk;
    var tB = function() {
      function t10(t11, e2) {
        this.v = 1, this.r = 0, tw.call(this, t11, e2);
      }
      return t10.prototype.push = function(t11, e2) {
        if (tw.prototype.e.call(this, t11), this.r += t11.length, this.v) {
          var n2 = this.p.subarray(this.v - 1), i2 = n2.length > 3 ? tv(n2) : 4;
          if (i2 > n2.length) {
            if (!e2) return;
          } else this.v > 1 && this.onmember && this.onmember(this.r - n2.length);
          this.p = n2.subarray(i2), this.v = 0;
        }
        tw.prototype.c.call(this, e2), !this.s.f || this.s.l || e2 || (this.v = N(this.s.p) + 9, this.s = { i: 0 }, this.o = new r(0), this.push(new r(0), e2));
      }, t10;
    }();
    e.Gunzip = tB;
    var tD = function(t10, e2) {
      var n2 = this;
      th([te, tr, function() {
        return [tf, tw, tB];
      }], this, tM.call(this, t10, e2), function(t11) {
        var e3 = new tB(t11.data);
        e3.onmember = function(t12) {
          return postMessage(t12);
        }, onmessage = tf(e3);
      }, 9, 0, function(t11) {
        return n2.onmember && n2.onmember(t11);
      });
    };
    function tz(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), tl(t10, e2, [te, tr, function() {
        return [tq];
      }], function(t11) {
        return to(tq(t11.data[0], t11.data[1]));
      }, 3, n2);
    }
    function tq(t10, e2) {
      var n2 = tv(t10);
      return n2 + 8 > t10.length && O(6, "invalid gzip data"), k(t10.subarray(n2, -8), { i: 2 }, e2 && e2.out || new r(tm(t10)), e2 && e2.dictionary);
    }
    e.AsyncGunzip = tD, e.gunzip = tz, e.gunzipSync = tq;
    var tP = function() {
      function t10(t11, e2) {
        this.c = W(), this.v = 1, tx.call(this, t11, e2);
      }
      return t10.prototype.push = function(t11, e2) {
        this.c.p(t11), tx.prototype.push.call(this, t11, e2);
      }, t10.prototype.p = function(t11, e2) {
        var n2 = K(t11, this.o, this.v && (this.o.dictionary ? 6 : 2), e2 && 4, this.s);
        this.v && (t_(n2, this.o), this.v = 0), e2 && tg(n2, n2.length - 4, this.c.d()), this.ondata(n2, e2);
      }, t10.prototype.flush = function() {
        tx.prototype.flush.call(this);
      }, t10;
    }();
    function tR(t10, e2) {
      e2 || (e2 = {});
      var n2 = W();
      n2.p(t10);
      var i2 = K(t10, e2, e2.dictionary ? 6 : 2, 4);
      return t_(i2, e2), tg(i2, i2.length - 4, n2.d()), i2;
    }
    e.Zlib = tP, e.AsyncZlib = function(t10, e2) {
      th([tn, ts, function() {
        return [tf, tx, tP];
      }], this, tM.call(this, t10, e2), function(t11) {
        onmessage = tf(new tP(t11.data));
      }, 10, 1);
    }, e.zlib = function(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), tl(t10, e2, [tn, ts, function() {
        return [tR];
      }], function(t11) {
        return to(tR(t11.data[0], t11.data[1]));
      }, 4, n2);
    }, e.zlibSync = tR;
    var tL = function() {
      function t10(t11, e2) {
        tw.call(this, t11, e2), this.v = t11 && t11.dictionary ? 2 : 1;
      }
      return t10.prototype.push = function(t11, e2) {
        if (tw.prototype.e.call(this, t11), this.v) {
          if (this.p.length < 6 && !e2) return;
          this.p = this.p.subarray(tI(this.p, this.v - 1)), this.v = 0;
        }
        e2 && (this.p.length < 4 && O(6, "invalid zlib data"), this.p = this.p.subarray(0, -4)), tw.prototype.c.call(this, e2);
      }, t10;
    }();
    e.Unzlib = tL;
    var tj = function(t10, e2) {
      th([te, ta, function() {
        return [tf, tw, tL];
      }], this, tM.call(this, t10, e2), function(t11) {
        onmessage = tf(new tL(t11.data));
      }, 11, 0);
    };
    function tG(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), tl(t10, e2, [te, ta, function() {
        return [tV];
      }], function(t11) {
        return to(tV(t11.data[0], tu(t11.data[1])));
      }, 5, n2);
    }
    function tV(t10, e2) {
      return k(t10.subarray(tI(t10, e2 && e2.dictionary), -4), { i: 2 }, e2 && e2.out, e2 && e2.dictionary);
    }
    e.AsyncUnzlib = tj, e.unzlib = tG, e.unzlibSync = tV;
    var tY = function() {
      function t10(t11, e2) {
        this.o = tM.call(this, t11, e2) || {}, this.G = tB, this.I = tw, this.Z = tL;
      }
      return t10.prototype.i = function() {
        var t11 = this;
        this.s.ondata = function(e2, n2) {
          t11.ondata(e2, n2);
        };
      }, t10.prototype.push = function(t11, e2) {
        if (this.ondata || O(5), this.s) this.s.push(t11, e2);
        else {
          if (this.p && this.p.length) {
            var n2 = new r(this.p.length + t11.length);
            n2.set(this.p), n2.set(t11, this.p.length);
          } else this.p = t11;
          this.p.length > 2 && (this.s = 31 == this.p[0] && 139 == this.p[1] && 8 == this.p[2] ? new this.G(this.o) : (15 & this.p[0]) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(this.o) : new this.Z(this.o), this.i(), this.s.push(this.p, e2), this.p = null);
        }
      }, t10;
    }();
    e.Decompress = tY;
    var tX = function() {
      function t10(t11, e2) {
        tY.call(this, t11, e2), this.queuedSize = 0, this.G = tD, this.I = tS, this.Z = tj;
      }
      return t10.prototype.i = function() {
        var t11 = this;
        this.s.ondata = function(e2, n2, i2) {
          t11.ondata(e2, n2, i2);
        }, this.s.ondrain = function(e2) {
          t11.queuedSize -= e2, t11.ondrain && t11.ondrain(e2);
        };
      }, t10.prototype.push = function(t11, e2) {
        this.queuedSize += t11.length, tY.prototype.push.call(this, t11, e2);
      }, t10;
    }();
    e.AsyncDecompress = tX, e.decompress = function(t10, e2, n2) {
      return n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7), 31 == t10[0] && 139 == t10[1] && 8 == t10[2] ? tz(t10, e2, n2) : (15 & t10[0]) != 8 || t10[0] >> 4 > 7 || (t10[0] << 8 | t10[1]) % 31 ? tT(t10, e2, n2) : tG(t10, e2, n2);
    }, e.decompressSync = function(t10, e2) {
      return 31 == t10[0] && 139 == t10[1] && 8 == t10[2] ? tq(t10, e2) : (15 & t10[0]) != 8 || t10[0] >> 4 > 7 || (t10[0] << 8 | t10[1]) % 31 ? tN(t10, e2) : tV(t10, e2);
    };
    var tZ = function(t10, e2, n2, i2) {
      for (var s2 in t10) {
        var a2 = t10[s2], o2 = e2 + s2, u2 = i2;
        Array.isArray(a2) && (u2 = $(i2, a2[1]), a2 = a2[0]), a2 instanceof r ? n2[o2] = [a2, u2] : (n2[o2 += "/"] = [new r(0), u2], tZ(a2, o2, n2, i2));
      }
    }, tW = "undefined" != typeof TextEncoder && new TextEncoder(), tK = "undefined" != typeof TextDecoder && new TextDecoder(), t$ = 0;
    try {
      tK.decode(V, { stream: true }), t$ = 1;
    } catch (t10) {
    }
    var tH = function(t10) {
      for (var e2 = "", n2 = 0; ; ) {
        var i2 = t10[n2++], r2 = (i2 > 127) + (i2 > 223) + (i2 > 239);
        if (n2 + r2 > t10.length) return { s: e2, r: F(t10, n2 - 1) };
        r2 ? 3 == r2 ? e2 += String.fromCharCode(55296 | (i2 = ((15 & i2) << 18 | (63 & t10[n2++]) << 12 | (63 & t10[n2++]) << 6 | 63 & t10[n2++]) - 65536) >> 10, 56320 | 1023 & i2) : 1 & r2 ? e2 += String.fromCharCode((31 & i2) << 6 | 63 & t10[n2++]) : e2 += String.fromCharCode((15 & i2) << 12 | (63 & t10[n2++]) << 6 | 63 & t10[n2++]) : e2 += String.fromCharCode(i2);
      }
    }, tQ = function() {
      function t10(t11) {
        this.ondata = t11, t$ ? this.t = new TextDecoder() : this.p = V;
      }
      return t10.prototype.push = function(t11, e2) {
        if (this.ondata || O(5), e2 = !!e2, this.t) {
          this.ondata(this.t.decode(t11, { stream: true }), e2), e2 && (this.t.decode().length && O(8), this.t = null);
          return;
        }
        this.p || O(4);
        var n2 = new r(this.p.length + t11.length);
        n2.set(this.p), n2.set(t11, this.p.length);
        var i2 = tH(n2), s2 = i2.s, a2 = i2.r;
        e2 ? (a2.length && O(8), this.p = null) : this.p = a2, this.ondata(s2, e2);
      }, t10;
    }();
    e.DecodeUTF8 = tQ;
    var tJ = function() {
      function t10(t11) {
        this.ondata = t11;
      }
      return t10.prototype.push = function(t11, e2) {
        this.ondata || O(5), this.d && O(4), this.ondata(t1(t11), this.d = e2 || false);
      }, t10;
    }();
    function t1(t10, e2) {
      if (e2) {
        for (var n2 = new r(t10.length), i2 = 0; i2 < t10.length; ++i2) n2[i2] = t10.charCodeAt(i2);
        return n2;
      }
      if (tW) return tW.encode(t10);
      for (var s2 = t10.length, a2 = new r(t10.length + (t10.length >> 1)), o2 = 0, u2 = function(t11) {
        a2[o2++] = t11;
      }, i2 = 0; i2 < s2; ++i2) {
        if (o2 + 5 > a2.length) {
          var l2 = new r(o2 + 8 + (s2 - i2 << 1));
          l2.set(a2), a2 = l2;
        }
        var f2 = t10.charCodeAt(i2);
        f2 < 128 || e2 ? u2(f2) : (f2 < 2048 ? u2(192 | f2 >> 6) : (f2 > 55295 && f2 < 57344 ? (u2(240 | (f2 = 65536 + (1047552 & f2) | 1023 & t10.charCodeAt(++i2)) >> 18), u2(128 | f2 >> 12 & 63)) : u2(224 | f2 >> 12), u2(128 | f2 >> 6 & 63)), u2(128 | 63 & f2));
      }
      return F(a2, 0, o2);
    }
    function t0(t10, e2) {
      if (e2) {
        for (var n2 = "", i2 = 0; i2 < t10.length; i2 += 16384) n2 += String.fromCharCode.apply(null, t10.subarray(i2, i2 + 16384));
        return n2;
      }
      if (tK) return tK.decode(t10);
      var r2 = tH(t10), s2 = r2.s, n2 = r2.r;
      return n2.length && O(8), s2;
    }
    e.EncodeUTF8 = tJ, e.strToU8 = t1, e.strFromU8 = t0;
    var t2 = function(t10) {
      return 1 == t10 ? 3 : t10 < 6 ? 2 : 9 == t10 ? 1 : 0;
    }, t3 = function(t10, e2) {
      return e2 + 30 + tc(t10, e2 + 26) + tc(t10, e2 + 28);
    }, t5 = function(t10, e2, n2) {
      var i2 = tc(t10, e2 + 28), r2 = t0(t10.subarray(e2 + 46, e2 + 46 + i2), !(2048 & tc(t10, e2 + 8))), s2 = e2 + 46 + i2, a2 = td(t10, e2 + 20), o2 = n2 && 4294967295 == a2 ? t4(t10, s2) : [a2, td(t10, e2 + 24), td(t10, e2 + 42)], u2 = o2[0], l2 = o2[1], f2 = o2[2];
      return [tc(t10, e2 + 10), u2, l2, r2, s2 + tc(t10, e2 + 30) + tc(t10, e2 + 32), f2];
    }, t4 = function(t10, e2) {
      for (; 1 != tc(t10, e2); e2 += 4 + tc(t10, e2 + 2)) ;
      return [tp(t10, e2 + 12), tp(t10, e2 + 4), tp(t10, e2 + 20)];
    }, t6 = function(t10) {
      var e2 = 0;
      if (t10) for (var n2 in t10) {
        var i2 = t10[n2].length;
        i2 > 65535 && O(9), e2 += i2 + 4;
      }
      return e2;
    }, t8 = function(t10, e2, n2, i2, r2, s2, a2, o2) {
      var u2 = i2.length, l2 = n2.extra, f2 = o2 && o2.length, h2 = t6(l2);
      tg(t10, e2, null != a2 ? 33639248 : 67324752), e2 += 4, null != a2 && (t10[e2++] = 20, t10[e2++] = n2.os), t10[e2] = 20, e2 += 2, t10[e2++] = n2.flag << 1 | (s2 < 0 && 8), t10[e2++] = r2 && 8, t10[e2++] = 255 & n2.compression, t10[e2++] = n2.compression >> 8;
      var c2 = new Date(null == n2.mtime ? Date.now() : n2.mtime), d2 = c2.getFullYear() - 1980;
      if ((d2 < 0 || d2 > 119) && O(10), tg(t10, e2, d2 << 25 | c2.getMonth() + 1 << 21 | c2.getDate() << 16 | c2.getHours() << 11 | c2.getMinutes() << 5 | c2.getSeconds() >> 1), e2 += 4, -1 != s2 && (tg(t10, e2, n2.crc), tg(t10, e2 + 4, s2 < 0 ? -s2 - 2 : s2), tg(t10, e2 + 8, n2.size)), tg(t10, e2 + 12, u2), tg(t10, e2 + 14, h2), e2 += 16, null != a2 && (tg(t10, e2, f2), tg(t10, e2 + 6, n2.attrs), tg(t10, e2 + 10, a2), e2 += 14), t10.set(i2, e2), e2 += u2, h2) for (var p2 in l2) {
        var g2 = l2[p2], y2 = g2.length;
        tg(t10, e2, +p2), tg(t10, e2 + 2, y2), t10.set(g2, e2 + 4), e2 += 4 + y2;
      }
      return f2 && (t10.set(o2, e2), e2 += f2), e2;
    }, t7 = function(t10, e2, n2, i2, r2) {
      tg(t10, e2, 101010256), tg(t10, e2 + 8, n2), tg(t10, e2 + 10, n2), tg(t10, e2 + 12, i2), tg(t10, e2 + 16, r2);
    }, t9 = function() {
      function t10(t11) {
        this.filename = t11, this.c = Z(), this.size = 0, this.compression = 0;
      }
      return t10.prototype.process = function(t11, e2) {
        this.ondata(null, t11, e2);
      }, t10.prototype.push = function(t11, e2) {
        this.ondata || O(5), this.c.p(t11), this.size += t11.length, e2 && (this.crc = this.c.d()), this.process(t11, e2 || false);
      }, t10;
    }();
    e.ZipPassThrough = t9;
    var et = function() {
      function t10(t11, e2) {
        var n2 = this;
        e2 || (e2 = {}), t9.call(this, t11), this.d = new tx(e2, function(t12, e3) {
          n2.ondata(null, t12, e3);
        }), this.compression = 8, this.flag = t2(e2.level);
      }
      return t10.prototype.process = function(t11, e2) {
        try {
          this.d.push(t11, e2);
        } catch (t12) {
          this.ondata(t12, null, e2);
        }
      }, t10.prototype.push = function(t11, e2) {
        t9.prototype.push.call(this, t11, e2);
      }, t10;
    }();
    e.ZipDeflate = et;
    var ee = function() {
      function t10(t11, e2) {
        var n2 = this;
        e2 || (e2 = {}), t9.call(this, t11), this.d = new tE(e2, function(t12, e3, i2) {
          n2.ondata(t12, e3, i2);
        }), this.compression = 8, this.flag = t2(e2.level), this.terminate = this.d.terminate;
      }
      return t10.prototype.process = function(t11, e2) {
        this.d.push(t11, e2);
      }, t10.prototype.push = function(t11, e2) {
        t9.prototype.push.call(this, t11, e2);
      }, t10;
    }();
    e.AsyncZipDeflate = ee;
    var en = function() {
      function t10(t11) {
        this.ondata = t11, this.u = [], this.d = 1;
      }
      return t10.prototype.add = function(t11) {
        var e2 = this;
        if (this.ondata || O(5), 2 & this.d) this.ondata(O(4 + (1 & this.d) * 8, 0, 1), null, false);
        else {
          var n2 = t1(t11.filename), i2 = n2.length, s2 = t11.comment, a2 = s2 && t1(s2), o2 = i2 != t11.filename.length || a2 && s2.length != a2.length, u2 = i2 + t6(t11.extra) + 30;
          i2 > 65535 && this.ondata(O(11, 0, 1), null, false);
          var l2 = new r(u2);
          t8(l2, 0, t11, n2, o2, -1);
          var f2 = [l2], h2 = function() {
            for (var t12 = 0, n3 = f2; t12 < n3.length; t12++) {
              var i3 = n3[t12];
              e2.ondata(null, i3, false);
            }
            f2 = [];
          }, c2 = this.d;
          this.d = 0;
          var d2 = this.u.length, p2 = $(t11, { f: n2, u: o2, o: a2, t: function() {
            t11.terminate && t11.terminate();
          }, r: function() {
            if (h2(), c2) {
              var t12 = e2.u[d2 + 1];
              t12 ? t12.r() : e2.d = 1;
            }
            c2 = 1;
          } }), g2 = 0;
          t11.ondata = function(n3, i3, s3) {
            if (n3) e2.ondata(n3, i3, s3), e2.terminate();
            else if (g2 += i3.length, f2.push(i3), s3) {
              var a3 = new r(16);
              tg(a3, 0, 134695760), tg(a3, 4, t11.crc), tg(a3, 8, g2), tg(a3, 12, t11.size), f2.push(a3), p2.c = g2, p2.b = u2 + g2 + 16, p2.crc = t11.crc, p2.size = t11.size, c2 && p2.r(), c2 = 1;
            } else c2 && h2();
          }, this.u.push(p2);
        }
      }, t10.prototype.end = function() {
        var t11 = this;
        if (2 & this.d) {
          this.ondata(O(4 + (1 & this.d) * 8, 0, 1), null, true);
          return;
        }
        this.d ? this.e() : this.u.push({ r: function() {
          1 & t11.d && (t11.u.splice(-1, 1), t11.e());
        }, t: function() {
        } }), this.d = 3;
      }, t10.prototype.e = function() {
        for (var t11 = 0, e2 = 0, n2 = 0, i2 = 0, s2 = this.u; i2 < s2.length; i2++) {
          var a2 = s2[i2];
          n2 += 46 + a2.f.length + t6(a2.extra) + (a2.o ? a2.o.length : 0);
        }
        for (var o2 = new r(n2 + 22), u2 = 0, l2 = this.u; u2 < l2.length; u2++) {
          var a2 = l2[u2];
          t8(o2, t11, a2, a2.f, a2.u, -a2.c - 2, e2, a2.o), t11 += 46 + a2.f.length + t6(a2.extra) + (a2.o ? a2.o.length : 0), e2 += a2.b;
        }
        t7(o2, t11, this.u.length, n2, e2), this.ondata(null, o2, true), this.d = 2;
      }, t10.prototype.terminate = function() {
        for (var t11 = 0, e2 = this.u; t11 < e2.length; t11++) e2[t11].t();
        this.d = 2;
      }, t10;
    }();
    e.Zip = en, e.zip = function(t10, e2, n2) {
      n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7);
      var i2 = {};
      tZ(t10, "", i2, e2);
      var s2 = Object.keys(i2), a2 = s2.length, o2 = 0, u2 = 0, l2 = a2, f2 = Array(a2), h2 = [], c2 = function() {
        for (var t11 = 0; t11 < h2.length; ++t11) h2[t11]();
      }, d2 = function(t11, e3) {
        eo(function() {
          n2(t11, e3);
        });
      };
      eo(function() {
        d2 = n2;
      });
      var p2 = function() {
        var t11 = new r(u2 + 22), e3 = o2, n3 = u2 - o2;
        u2 = 0;
        for (var i3 = 0; i3 < l2; ++i3) {
          var s3 = f2[i3];
          try {
            var a3 = s3.c.length;
            t8(t11, u2, s3, s3.f, s3.u, a3);
            var h3 = 30 + s3.f.length + t6(s3.extra), c3 = u2 + h3;
            t11.set(s3.c, c3), t8(t11, o2, s3, s3.f, s3.u, a3, u2, s3.m), o2 += 16 + h3 + (s3.m ? s3.m.length : 0), u2 = c3 + a3;
          } catch (t12) {
            return d2(t12, null);
          }
        }
        t7(t11, o2, f2.length, n3, e3), d2(null, t11);
      };
      a2 || p2();
      for (var g2 = function(t11) {
        var e3 = s2[t11], n3 = i2[e3], r2 = n3[0], l3 = n3[1], g3 = Z(), y3 = r2.length;
        g3.p(r2);
        var v2 = t1(e3), m2 = v2.length, b2 = l3.comment, _2 = b2 && t1(b2), I2 = _2 && _2.length, M2 = t6(l3.extra), x2 = 0 == l3.level ? 0 : 8, E2 = function(n4, i3) {
          if (n4) c2(), d2(n4, null);
          else {
            var r3 = i3.length;
            f2[t11] = $(l3, { size: y3, crc: g3.d(), c: i3, f: v2, m: _2, u: m2 != e3.length || _2 && b2.length != I2, compression: x2 }), o2 += 30 + m2 + M2 + r3, u2 += 76 + 2 * (m2 + M2) + (I2 || 0) + r3, --a2 || p2();
          }
        };
        if (m2 > 65535 && E2(O(11, 0, 1), null), x2) {
          if (y3 < 16e4) try {
            E2(null, tU(r2, l3));
          } catch (t12) {
            E2(t12, null);
          }
          else h2.push(tA(r2, l3, E2));
        } else E2(null, r2);
      }, y2 = 0; y2 < l2; ++y2) g2(y2);
      return c2;
    }, e.zipSync = function(t10, e2) {
      e2 || (e2 = {});
      var n2 = {}, i2 = [];
      tZ(t10, "", n2, e2);
      var s2 = 0, a2 = 0;
      for (var o2 in n2) {
        var u2 = n2[o2], l2 = u2[0], f2 = u2[1], h2 = 0 == f2.level ? 0 : 8, c2 = t1(o2), d2 = c2.length, p2 = f2.comment, g2 = p2 && t1(p2), y2 = g2 && g2.length, v2 = t6(f2.extra);
        d2 > 65535 && O(11);
        var m2 = h2 ? tU(l2, f2) : l2, b2 = m2.length, _2 = Z();
        _2.p(l2), i2.push($(f2, { size: l2.length, crc: _2.d(), c: m2, f: c2, m: g2, u: d2 != o2.length || g2 && p2.length != y2, o: s2, compression: h2 })), s2 += 30 + d2 + v2 + b2, a2 += 76 + 2 * (d2 + v2) + (y2 || 0) + b2;
      }
      for (var I2 = new r(a2 + 22), M2 = s2, x2 = a2 - s2, E2 = 0; E2 < i2.length; ++E2) {
        var c2 = i2[E2];
        t8(I2, c2.o, c2, c2.f, c2.u, c2.c.length);
        var A2 = 30 + c2.f.length + t6(c2.extra);
        I2.set(c2.c, c2.o + A2), t8(I2, s2, c2, c2.f, c2.u, c2.c.length, c2.o, c2.m), s2 += 16 + A2 + (c2.m ? c2.m.length : 0);
      }
      return t7(I2, s2, i2.length, x2, M2), I2;
    };
    var ei = function() {
      function t10() {
      }
      return t10.prototype.push = function(t11, e2) {
        this.ondata(null, t11, e2);
      }, t10.compression = 0, t10;
    }();
    e.UnzipPassThrough = ei;
    var er = function() {
      function t10() {
        var t11 = this;
        this.i = new tw(function(e2, n2) {
          t11.ondata(null, e2, n2);
        });
      }
      return t10.prototype.push = function(t11, e2) {
        try {
          this.i.push(t11, e2);
        } catch (t12) {
          this.ondata(t12, null, e2);
        }
      }, t10.compression = 8, t10;
    }();
    e.UnzipInflate = er;
    var es = function() {
      function t10(t11, e2) {
        var n2 = this;
        e2 < 32e4 ? this.i = new tw(function(t12, e3) {
          n2.ondata(null, t12, e3);
        }) : (this.i = new tS(function(t12, e3, i2) {
          n2.ondata(t12, e3, i2);
        }), this.terminate = this.i.terminate);
      }
      return t10.prototype.push = function(t11, e2) {
        this.i.terminate && (t11 = F(t11, 0)), this.i.push(t11, e2);
      }, t10.compression = 8, t10;
    }();
    e.AsyncUnzipInflate = es;
    var ea = function() {
      function t10(t11) {
        this.onfile = t11, this.k = [], this.o = { 0: ei }, this.p = V;
      }
      return t10.prototype.push = function(t11, e2) {
        var n2 = this;
        if (this.onfile || O(5), this.p || O(4), this.c > 0) {
          var i2 = Math.min(this.c, t11.length), s2 = t11.subarray(0, i2);
          if (this.c -= i2, this.d ? this.d.push(s2, !this.c) : this.k[0].push(s2), (t11 = t11.subarray(i2)).length) return this.push(t11, e2);
        } else {
          var a2 = 0, o2 = 0, u2 = void 0, l2 = void 0;
          this.p.length ? t11.length ? ((l2 = new r(this.p.length + t11.length)).set(this.p), l2.set(t11, this.p.length)) : l2 = this.p : l2 = t11;
          for (var f2 = l2.length, h2 = this.c, c2 = h2 && this.d, d2 = this; o2 < f2 - 4 && "break" !== function() {
            var t12 = td(l2, o2);
            if (67324752 == t12) {
              a2 = 1, u2 = o2, d2.d = null, d2.c = 0;
              var e3 = tc(l2, o2 + 6), i3 = tc(l2, o2 + 8), r2 = 8 & e3, s3 = tc(l2, o2 + 26), c3 = tc(l2, o2 + 28);
              if (f2 > o2 + 30 + s3 + c3) {
                var p3, g2, y2 = [];
                d2.k.unshift(y2), a2 = 2;
                var v2 = td(l2, o2 + 18), m2 = td(l2, o2 + 22), b2 = t0(l2.subarray(o2 + 30, o2 += 30 + s3), !(2048 & e3));
                4294967295 == v2 ? (v2 = (p3 = r2 ? [-2] : t4(l2, o2))[0], m2 = p3[1]) : r2 && (v2 = -1), o2 += c3, d2.c = v2;
                var _2 = { name: b2, compression: i3, start: function() {
                  if (_2.ondata || O(5), v2) {
                    var t13 = n2.o[i3];
                    t13 || _2.ondata(O(14, "unknown compression type " + i3, 1), null, false), (g2 = v2 < 0 ? new t13(b2) : new t13(b2, v2, m2)).ondata = function(t14, e5, n3) {
                      _2.ondata(t14, e5, n3);
                    };
                    for (var e4 = 0; e4 < y2.length; e4++) {
                      var r3 = y2[e4];
                      g2.push(r3, false);
                    }
                    n2.k[0] == y2 && n2.c ? n2.d = g2 : g2.push(V, true);
                  } else _2.ondata(null, V, true);
                }, terminate: function() {
                  g2 && g2.terminate && g2.terminate();
                } };
                v2 >= 0 && (_2.size = v2, _2.originalSize = m2), d2.onfile(_2);
              }
              return "break";
            }
            if (h2) {
              if (134695760 == t12) return u2 = o2 += 12 + (-2 == h2 && 8), a2 = 3, d2.c = 0, "break";
              if (33639248 == t12) return u2 = o2 -= 4, a2 = 3, d2.c = 0, "break";
            }
          }(); ++o2) ;
          if (this.p = V, h2 < 0) {
            var p2 = a2 ? l2.subarray(0, u2 - 12 - (-2 == h2 && 8) - (134695760 == td(l2, u2 - 16) && 4)) : l2.subarray(0, o2);
            c2 ? c2.push(p2, !!a2) : this.k[+(2 == a2)].push(p2);
          }
          if (2 & a2) return this.push(l2.subarray(o2), e2);
          this.p = l2.subarray(o2);
        }
        e2 && (this.c && O(13), this.p = null);
      }, t10.prototype.register = function(t11) {
        this.o[t11.compression] = t11;
      }, t10;
    }();
    e.Unzip = ea;
    var eo = "function" == typeof queueMicrotask ? queueMicrotask : "function" == typeof setTimeout ? setTimeout : function(t10) {
      t10();
    };
    e.unzip = function(t10, e2, n2) {
      n2 || (n2 = e2, e2 = {}), "function" != typeof n2 && O(7);
      var i2 = [], s2 = function() {
        for (var t11 = 0; t11 < i2.length; ++t11) i2[t11]();
      }, a2 = {}, o2 = function(t11, e3) {
        eo(function() {
          n2(t11, e3);
        });
      };
      eo(function() {
        o2 = n2;
      });
      for (var u2 = t10.length - 22; 101010256 != td(t10, u2); --u2) if (!u2 || t10.length - u2 > 65558) return o2(O(13, 0, 1), null), s2;
      var l2 = tc(t10, u2 + 8);
      if (l2) {
        var f2 = l2, h2 = td(t10, u2 + 16), c2 = 4294967295 == h2 || 65535 == f2;
        if (c2) {
          var d2 = td(t10, u2 - 12);
          (c2 = 101075792 == td(t10, d2)) && (f2 = l2 = td(t10, d2 + 32), h2 = td(t10, d2 + 48));
        }
        for (var p2 = e2 && e2.filter, g2 = 0; g2 < f2; ++g2) !function(e3) {
          var n3 = t5(t10, h2, c2), u3 = n3[0], f3 = n3[1], d3 = n3[2], g3 = n3[3], y2 = n3[4], v2 = t3(t10, n3[5]);
          h2 = y2;
          var m2 = function(t11, e4) {
            t11 ? (s2(), o2(t11, null)) : (e4 && (a2[g3] = e4), --l2 || o2(null, a2));
          };
          if (!p2 || p2({ name: g3, size: f3, originalSize: d3, compression: u3 })) {
            if (u3) {
              if (8 == u3) {
                var b2 = t10.subarray(v2, v2 + f3);
                if (d3 < 524288 || f3 > 0.8 * d3) try {
                  m2(null, tN(b2, { out: new r(d3) }));
                } catch (t11) {
                  m2(t11, null);
                }
                else i2.push(tT(b2, { size: d3 }, m2));
              } else m2(O(14, "unknown compression type " + u3, 1), null);
            } else m2(null, F(t10, v2, v2 + f3));
          } else m2(null, null);
        }(0);
      } else o2(null, {});
      return s2;
    }, e.unzipSync = function(t10, e2) {
      for (var n2 = {}, i2 = t10.length - 22; 101010256 != td(t10, i2); --i2) (!i2 || t10.length - i2 > 65558) && O(13);
      var s2 = tc(t10, i2 + 8);
      if (!s2) return {};
      var a2 = td(t10, i2 + 16), o2 = 4294967295 == a2 || 65535 == s2;
      if (o2) {
        var u2 = td(t10, i2 - 12);
        (o2 = 101075792 == td(t10, u2)) && (s2 = td(t10, u2 + 32), a2 = td(t10, u2 + 48));
      }
      for (var l2 = e2 && e2.filter, f2 = 0; f2 < s2; ++f2) {
        var h2 = t5(t10, a2, o2), c2 = h2[0], d2 = h2[1], p2 = h2[2], g2 = h2[3], y2 = h2[4], v2 = t3(t10, h2[5]);
        a2 = y2, (!l2 || l2({ name: g2, size: d2, originalSize: p2, compression: c2 })) && (c2 ? 8 == c2 ? n2[g2] = tN(t10.subarray(v2, v2 + d2), { out: new r(p2) }) : O(14, "unknown compression type " + c2) : n2[g2] = F(t10, v2, v2 + d2));
      }
      return n2;
    };
  }, 9749: function(t, e, n) {
    "use strict";
    let i, r, s, a, o, u, l, f;
    n.d(e, { SY: () => B });
    try {
      h = new TextDecoder();
    } catch (t2) {
    }
    var h, c, d, p, g, y, v, m, b, _, I, M = 0;
    let x = [];
    var E = x, A = 0, U = {}, w = 0, S = 0, T = [], N = { useRecords: false, mapsAsObjects: true };
    class F {
    }
    let C = new F();
    C.name = "MessagePack 0xC1";
    var O = false, k = 2;
    try {
      Function("");
    } catch (t2) {
      k = 1 / 0;
    }
    class B {
      constructor(t2) {
        t2 && (false === t2.useRecords && void 0 === t2.mapsAsObjects && (t2.mapsAsObjects = true), !t2.sequential || false === t2.trusted || (t2.trusted = true, t2.structures || false == t2.useRecords || (t2.structures = [], t2.maxSharedStructures || (t2.maxSharedStructures = 0))), t2.structures ? t2.structures.sharedLength = t2.structures.length : t2.getStructures && ((t2.structures = []).uninitialized = true, t2.structures.sharedLength = 0), t2.int64AsNumber && (t2.int64AsType = "number")), Object.assign(this, t2);
      }
      unpack(t2, e2) {
        if (c) return tf(() => (th(), this ? this.unpack(t2, e2) : B.prototype.unpack.call(N, t2, e2)));
        t2.buffer || t2.constructor !== ArrayBuffer || (t2 = "undefined" != typeof Buffer ? Buffer.from(t2) : new Uint8Array(t2)), "object" == typeof e2 ? (d = e2.end || t2.length, M = e2.start || 0) : (M = 0, d = e2 > -1 ? e2 : t2.length), A = 0, S = 0, g = null, E = x, y = null, c = t2;
        try {
          m = t2.dataView || (t2.dataView = new DataView(t2.buffer, t2.byteOffset, t2.byteLength));
        } catch (e3) {
          if (c = null, t2 instanceof Uint8Array) throw e3;
          throw Error("Source must be a Uint8Array or Buffer but was a " + (t2 && "object" == typeof t2 ? t2.constructor.name : typeof t2));
        }
        return this instanceof B ? (U = this, this.structures ? p = this.structures : (!p || p.length > 0) && (p = [])) : (U = N, (!p || p.length > 0) && (p = [])), D(e2);
      }
      unpackMultiple(t2, e2) {
        let n2, i2 = 0;
        try {
          O = true;
          let r2 = t2.length, s2 = this ? this.unpack(t2, r2) : td.unpack(t2, r2);
          if (e2) {
            if (false === e2(s2, i2, M)) return;
            for (; M < r2; ) if (i2 = M, false === e2(D(), i2, M)) return;
          } else {
            for (n2 = [s2]; M < r2; ) i2 = M, n2.push(D());
            return n2;
          }
        } catch (t3) {
          throw t3.lastPosition = i2, t3.values = n2, t3;
        } finally {
          O = false, th();
        }
      }
      _mergeStructures(t2, e2) {
        _ && (t2 = _.call(this, t2)), Object.isFrozen(t2 = t2 || []) && (t2 = t2.map((t3) => t3.slice(0)));
        for (let e3 = 0, n2 = t2.length; e3 < n2; e3++) {
          let n3 = t2[e3];
          n3 && (n3.isShared = true, e3 >= 32 && (n3.highByte = e3 - 32 >> 5));
        }
        for (let n2 in t2.sharedLength = t2.length, e2 || []) if (n2 >= 0) {
          let i2 = t2[n2], r2 = e2[n2];
          r2 && (i2 && ((t2.restoreStructures || (t2.restoreStructures = []))[n2] = i2), t2[n2] = r2);
        }
        return this.structures = t2;
      }
      decode(t2, e2) {
        return this.unpack(t2, e2);
      }
    }
    function D(t2) {
      try {
        let e2;
        if (!U.trusted && !O) {
          let t3 = p.sharedLength || 0;
          t3 < p.length && (p.length = t3);
        }
        if (U.randomAccessStructure && c[M] < 64 && c[M] >= 32 && b ? (e2 = b(c, M, d, U), c = null, !(t2 && t2.lazy) && e2 && (e2 = e2.toJSON()), M = d) : e2 = q(), y && (M = y.postBundlePosition, y = null), O && (p.restoreStructures = null), M == d) p && p.restoreStructures && z(), p = null, c = null, v && (v = null);
        else if (M > d) throw Error("Unexpected end of MessagePack data");
        else if (!O) {
          let t3;
          try {
            t3 = JSON.stringify(e2, (t4, e3) => "bigint" == typeof e3 ? `${e3}n` : e3).slice(0, 100);
          } catch (e3) {
            t3 = "(JSON view not available " + e3 + ")";
          }
          throw Error("Data read, but end of buffer not reached " + t3);
        }
        return e2;
      } catch (t3) {
        throw p && p.restoreStructures && z(), th(), (t3 instanceof RangeError || t3.message.startsWith("Unexpected end of buffer") || M > d) && (t3.incomplete = true), t3;
      }
    }
    function z() {
      for (let t2 in p.restoreStructures) p[t2] = p.restoreStructures[t2];
      p.restoreStructures = null;
    }
    function q() {
      let t2 = c[M++];
      if (t2 < 160) {
        if (t2 < 128) {
          if (t2 < 64) return t2;
          {
            let e2 = p[63 & t2] || U.getStructures && j()[63 & t2];
            return e2 ? (e2.read || (e2.read = R(e2, 63 & t2)), e2.read()) : t2;
          }
        }
        if (t2 < 144) {
          if (t2 -= 128, U.mapsAsObjects) {
            let e2 = {};
            for (let n2 = 0; n2 < t2; n2++) {
              let t3 = ti();
              "__proto__" === t3 && (t3 = "__proto_"), e2[t3] = q();
            }
            return e2;
          }
          {
            let e2 = /* @__PURE__ */ new Map();
            for (let n2 = 0; n2 < t2; n2++) e2.set(q(), q());
            return e2;
          }
        }
        {
          let e2 = Array(t2 -= 144);
          for (let n2 = 0; n2 < t2; n2++) e2[n2] = q();
          return U.freezeData ? Object.freeze(e2) : e2;
        }
      }
      if (t2 < 192) {
        let e2 = t2 - 160;
        if (S >= M) return g.slice(M - w, (M += e2) - w);
        if (0 == S && d < 140) {
          let t3 = e2 < 16 ? Q(e2) : H(e2);
          if (null != t3) return t3;
        }
        return G(e2);
      }
      {
        let e2;
        switch (t2) {
          case 192:
            return null;
          case 193:
            if (y) {
              if ((e2 = q()) > 0) return y[1].slice(y.position1, y.position1 += e2);
              return y[0].slice(y.position0, y.position0 -= e2);
            }
            return C;
          case 194:
            return false;
          case 195:
            return true;
          case 196:
            if (void 0 === (e2 = c[M++])) throw Error("Unexpected end of buffer");
            return tt(e2);
          case 197:
            return e2 = m.getUint16(M), M += 2, tt(e2);
          case 198:
            return e2 = m.getUint32(M), M += 4, tt(e2);
          case 199:
            return te(c[M++]);
          case 200:
            return e2 = m.getUint16(M), M += 2, te(e2);
          case 201:
            return e2 = m.getUint32(M), M += 4, te(e2);
          case 202:
            if (e2 = m.getFloat32(M), U.useFloat32 > 2) {
              let t3 = tc[(127 & c[M]) << 1 | c[M + 1] >> 7];
              return M += 4, (t3 * e2 + (e2 > 0 ? 0.5 : -0.5) >> 0) / t3;
            }
            return M += 4, e2;
          case 203:
            return e2 = m.getFloat64(M), M += 8, e2;
          case 204:
            return c[M++];
          case 205:
            return e2 = m.getUint16(M), M += 2, e2;
          case 206:
            return e2 = m.getUint32(M), M += 4, e2;
          case 207:
            return "number" === U.int64AsType ? e2 = 4294967296 * m.getUint32(M) + m.getUint32(M + 4) : "string" === U.int64AsType ? e2 = m.getBigUint64(M).toString() : "auto" === U.int64AsType ? (e2 = m.getBigUint64(M)) <= BigInt(2) << BigInt(52) && (e2 = Number(e2)) : e2 = m.getBigUint64(M), M += 8, e2;
          case 208:
            return m.getInt8(M++);
          case 209:
            return e2 = m.getInt16(M), M += 2, e2;
          case 210:
            return e2 = m.getInt32(M), M += 4, e2;
          case 211:
            return "number" === U.int64AsType ? e2 = 4294967296 * m.getInt32(M) + m.getUint32(M + 4) : "string" === U.int64AsType ? e2 = m.getBigInt64(M).toString() : "auto" === U.int64AsType ? (e2 = m.getBigInt64(M)) >= BigInt(-2) << BigInt(52) && e2 <= BigInt(2) << BigInt(52) && (e2 = Number(e2)) : e2 = m.getBigInt64(M), M += 8, e2;
          case 212:
            if (114 == (e2 = c[M++])) return ts(63 & c[M++]);
            {
              let t3 = T[e2];
              if (t3) {
                if (t3.read) return M++, t3.read(q());
                if (t3.noBuffer) return M++, t3();
                return t3(c.subarray(M, ++M));
              }
              throw Error("Unknown extension " + e2);
            }
          case 213:
            if (114 == (e2 = c[M])) return M++, ts(63 & c[M++], c[M++]);
            return te(2);
          case 214:
            return te(4);
          case 215:
            return te(8);
          case 216:
            return te(16);
          case 217:
            if (e2 = c[M++], S >= M) return g.slice(M - w, (M += e2) - w);
            return V(e2);
          case 218:
            if (e2 = m.getUint16(M), M += 2, S >= M) return g.slice(M - w, (M += e2) - w);
            return Y(e2);
          case 219:
            if (e2 = m.getUint32(M), M += 4, S >= M) return g.slice(M - w, (M += e2) - w);
            return X(e2);
          case 220:
            return e2 = m.getUint16(M), M += 2, W(e2);
          case 221:
            return e2 = m.getUint32(M), M += 4, W(e2);
          case 222:
            return e2 = m.getUint16(M), M += 2, K(e2);
          case 223:
            return e2 = m.getUint32(M), M += 4, K(e2);
          default:
            if (t2 >= 224) return t2 - 256;
            if (void 0 === t2) {
              let t3 = Error("Unexpected end of MessagePack data");
              throw t3.incomplete = true, t3;
            }
            throw Error("Unknown MessagePack token " + t2);
        }
      }
    }
    let P = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    function R(t2, e2) {
      function n2() {
        if (n2.count++ > k) {
          let n3 = t2.read = Function("r", "return function(){return " + (U.freezeData ? "Object.freeze" : "") + "({" + t2.map((t3) => "__proto__" === t3 ? "__proto_:r()" : P.test(t3) ? t3 + ":r()" : "[" + JSON.stringify(t3) + "]:r()").join(",") + "})}")(q);
          return 0 === t2.highByte && (t2.read = L(e2, t2.read)), n3();
        }
        let i2 = {};
        for (let e3 = 0, n3 = t2.length; e3 < n3; e3++) {
          let n4 = t2[e3];
          "__proto__" === n4 && (n4 = "__proto_"), i2[n4] = q();
        }
        return U.freezeData ? Object.freeze(i2) : i2;
      }
      return (n2.count = 0, 0 === t2.highByte) ? L(e2, n2) : n2;
    }
    let L = (t2, e2) => function() {
      let n2 = c[M++];
      if (0 === n2) return e2();
      let i2 = t2 < 32 ? -(t2 + (n2 << 5)) : t2 + (n2 << 5), r2 = p[i2] || j()[i2];
      if (!r2) throw Error("Record id is not defined for " + i2);
      return r2.read || (r2.read = R(r2, t2)), r2.read();
    };
    function j() {
      let t2 = tf(() => (c = null, U.getStructures()));
      return p = U._mergeStructures(t2, p);
    }
    var G = Z, V = Z, Y = Z, X = Z;
    function Z(t2) {
      let e2;
      if (t2 < 16 && (e2 = Q(t2))) return e2;
      if (t2 > 64 && h) return h.decode(c.subarray(M, M += t2));
      let n2 = M + t2, i2 = [];
      for (e2 = ""; M < n2; ) {
        let t3 = c[M++];
        if ((128 & t3) == 0) i2.push(t3);
        else if ((224 & t3) == 192) {
          let e3 = 63 & c[M++];
          i2.push((31 & t3) << 6 | e3);
        } else if ((240 & t3) == 224) {
          let e3 = 63 & c[M++], n3 = 63 & c[M++];
          i2.push((31 & t3) << 12 | e3 << 6 | n3);
        } else if ((248 & t3) == 240) {
          let e3 = 63 & c[M++], n3 = (7 & t3) << 18 | e3 << 12 | (63 & c[M++]) << 6 | 63 & c[M++];
          n3 > 65535 && (n3 -= 65536, i2.push(n3 >>> 10 & 1023 | 55296), n3 = 56320 | 1023 & n3), i2.push(n3);
        } else i2.push(t3);
        i2.length >= 4096 && (e2 += $.apply(String, i2), i2.length = 0);
      }
      return i2.length > 0 && (e2 += $.apply(String, i2)), e2;
    }
    function W(t2) {
      let e2 = Array(t2);
      for (let n2 = 0; n2 < t2; n2++) e2[n2] = q();
      return U.freezeData ? Object.freeze(e2) : e2;
    }
    function K(t2) {
      if (U.mapsAsObjects) {
        let e2 = {};
        for (let n2 = 0; n2 < t2; n2++) {
          let t3 = ti();
          "__proto__" === t3 && (t3 = "__proto_"), e2[t3] = q();
        }
        return e2;
      }
      {
        let e2 = /* @__PURE__ */ new Map();
        for (let n2 = 0; n2 < t2; n2++) e2.set(q(), q());
        return e2;
      }
    }
    var $ = String.fromCharCode;
    function H(t2) {
      let e2 = M, n2 = Array(t2);
      for (let i2 = 0; i2 < t2; i2++) {
        let t3 = c[M++];
        if ((128 & t3) > 0) {
          M = e2;
          return;
        }
        n2[i2] = t3;
      }
      return $.apply(String, n2);
    }
    function Q(t2) {
      if (t2 < 4) {
        if (t2 < 2) {
          if (0 === t2) return "";
          {
            let t3 = c[M++];
            if ((128 & t3) > 1) {
              M -= 1;
              return;
            }
            return $(t3);
          }
        }
        {
          let e2 = c[M++], n2 = c[M++];
          if ((128 & e2) > 0 || (128 & n2) > 0) {
            M -= 2;
            return;
          }
          if (t2 < 3) return $(e2, n2);
          let i2 = c[M++];
          if ((128 & i2) > 0) {
            M -= 3;
            return;
          }
          return $(e2, n2, i2);
        }
      }
      {
        let e2 = c[M++], n2 = c[M++], i2 = c[M++], r2 = c[M++];
        if ((128 & e2) > 0 || (128 & n2) > 0 || (128 & i2) > 0 || (128 & r2) > 0) {
          M -= 4;
          return;
        }
        if (t2 < 6) {
          if (4 === t2) return $(e2, n2, i2, r2);
          {
            let t3 = c[M++];
            if ((128 & t3) > 0) {
              M -= 5;
              return;
            }
            return $(e2, n2, i2, r2, t3);
          }
        }
        if (t2 < 8) {
          let s2 = c[M++], a2 = c[M++];
          if ((128 & s2) > 0 || (128 & a2) > 0) {
            M -= 6;
            return;
          }
          if (t2 < 7) return $(e2, n2, i2, r2, s2, a2);
          let o2 = c[M++];
          if ((128 & o2) > 0) {
            M -= 7;
            return;
          }
          return $(e2, n2, i2, r2, s2, a2, o2);
        }
        {
          let s2 = c[M++], a2 = c[M++], o2 = c[M++], u2 = c[M++];
          if ((128 & s2) > 0 || (128 & a2) > 0 || (128 & o2) > 0 || (128 & u2) > 0) {
            M -= 8;
            return;
          }
          if (t2 < 10) {
            if (8 === t2) return $(e2, n2, i2, r2, s2, a2, o2, u2);
            {
              let t3 = c[M++];
              if ((128 & t3) > 0) {
                M -= 9;
                return;
              }
              return $(e2, n2, i2, r2, s2, a2, o2, u2, t3);
            }
          }
          if (t2 < 12) {
            let l2 = c[M++], f2 = c[M++];
            if ((128 & l2) > 0 || (128 & f2) > 0) {
              M -= 10;
              return;
            }
            if (t2 < 11) return $(e2, n2, i2, r2, s2, a2, o2, u2, l2, f2);
            let h2 = c[M++];
            if ((128 & h2) > 0) {
              M -= 11;
              return;
            }
            return $(e2, n2, i2, r2, s2, a2, o2, u2, l2, f2, h2);
          }
          {
            let l2 = c[M++], f2 = c[M++], h2 = c[M++], d2 = c[M++];
            if ((128 & l2) > 0 || (128 & f2) > 0 || (128 & h2) > 0 || (128 & d2) > 0) {
              M -= 12;
              return;
            }
            if (t2 < 14) {
              if (12 === t2) return $(e2, n2, i2, r2, s2, a2, o2, u2, l2, f2, h2, d2);
              {
                let t3 = c[M++];
                if ((128 & t3) > 0) {
                  M -= 13;
                  return;
                }
                return $(e2, n2, i2, r2, s2, a2, o2, u2, l2, f2, h2, d2, t3);
              }
            }
            {
              let p2 = c[M++], g2 = c[M++];
              if ((128 & p2) > 0 || (128 & g2) > 0) {
                M -= 14;
                return;
              }
              if (t2 < 15) return $(e2, n2, i2, r2, s2, a2, o2, u2, l2, f2, h2, d2, p2, g2);
              let y2 = c[M++];
              if ((128 & y2) > 0) {
                M -= 15;
                return;
              }
              return $(e2, n2, i2, r2, s2, a2, o2, u2, l2, f2, h2, d2, p2, g2, y2);
            }
          }
        }
      }
    }
    function J() {
      let t2, e2 = c[M++];
      if (e2 < 192) t2 = e2 - 160;
      else switch (e2) {
        case 217:
          t2 = c[M++];
          break;
        case 218:
          t2 = m.getUint16(M), M += 2;
          break;
        case 219:
          t2 = m.getUint32(M), M += 4;
          break;
        default:
          throw Error("Expected string");
      }
      return Z(t2);
    }
    function tt(t2) {
      return U.copyBuffers ? Uint8Array.prototype.slice.call(c, M, M += t2) : c.subarray(M, M += t2);
    }
    function te(t2) {
      let e2 = c[M++];
      if (T[e2]) {
        let n2;
        return T[e2](c.subarray(M, n2 = M += t2), (t3) => {
          M = t3;
          try {
            return q();
          } finally {
            M = n2;
          }
        });
      }
      throw Error("Unknown extension type " + e2);
    }
    var tn = Array(4096);
    function ti() {
      let t2, e2 = c[M++];
      if (!(e2 >= 160) || !(e2 < 192)) return M--, tr(q());
      if (e2 -= 160, S >= M) return g.slice(M - w, (M += e2) - w);
      if (!(0 == S && d < 180)) return G(e2);
      let n2 = (e2 << 5 ^ (e2 > 1 ? m.getUint16(M) : e2 > 0 ? c[M] : 0)) & 4095, i2 = tn[n2], r2 = M, s2 = M + e2 - 3, a2 = 0;
      if (i2 && i2.bytes == e2) {
        for (; r2 < s2; ) {
          if ((t2 = m.getUint32(r2)) != i2[a2++]) {
            r2 = 1879048192;
            break;
          }
          r2 += 4;
        }
        for (s2 += 3; r2 < s2; ) if ((t2 = c[r2++]) != i2[a2++]) {
          r2 = 1879048192;
          break;
        }
        if (r2 === s2) return M = r2, i2.string;
        s2 -= 3, r2 = M;
      }
      for (i2 = [], tn[n2] = i2, i2.bytes = e2; r2 < s2; ) t2 = m.getUint32(r2), i2.push(t2), r2 += 4;
      for (s2 += 3; r2 < s2; ) t2 = c[r2++], i2.push(t2);
      let o2 = e2 < 16 ? Q(e2) : H(e2);
      return null != o2 ? i2.string = o2 : i2.string = G(e2);
    }
    function tr(t2) {
      if ("string" == typeof t2) return t2;
      if ("number" == typeof t2 || "boolean" == typeof t2 || "bigint" == typeof t2) return t2.toString();
      if (null == t2) return t2 + "";
      throw Error("Invalid property type for record", typeof t2);
    }
    let ts = (t2, e2) => {
      let n2 = q().map(tr), i2 = t2;
      void 0 !== e2 && (t2 = t2 < 32 ? -((e2 << 5) + t2) : (e2 << 5) + t2, n2.highByte = e2);
      let r2 = p[t2];
      return r2 && (r2.isShared || O) && ((p.restoreStructures || (p.restoreStructures = []))[t2] = r2), p[t2] = n2, n2.read = R(n2, i2), n2.read();
    };
    T[0] = () => {
    }, T[0].noBuffer = true, T[66] = (t2) => {
      let e2 = t2.length, n2 = BigInt(128 & t2[0] ? t2[0] - 256 : t2[0]);
      for (let i2 = 1; i2 < e2; i2++) n2 <<= BigInt(8), n2 += BigInt(t2[i2]);
      return n2;
    };
    let ta = { Error, TypeError, ReferenceError };
    T[101] = () => {
      let t2 = q();
      return (ta[t2[0]] || Error)(t2[1], { cause: t2[2] });
    }, T[105] = (t2) => {
      let e2;
      if (false === U.structuredClone) throw Error("Structured clone extension is disabled");
      let n2 = m.getUint32(M - 4);
      v || (v = /* @__PURE__ */ new Map());
      let i2 = c[M], r2 = { target: e2 = i2 >= 144 && i2 < 160 || 220 == i2 || 221 == i2 ? [] : {} };
      v.set(n2, r2);
      let s2 = q();
      return r2.used ? Object.assign(e2, s2) : (r2.target = s2, s2);
    }, T[112] = (t2) => {
      if (false === U.structuredClone) throw Error("Structured clone extension is disabled");
      let e2 = m.getUint32(M - 4), n2 = v.get(e2);
      return n2.used = true, n2.target;
    }, T[115] = () => new Set(q());
    let to = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map((t2) => t2 + "Array"), tu = "object" == typeof globalThis ? globalThis : window;
    T[116] = (t2) => {
      let e2 = t2[0], n2 = to[e2];
      if (!n2) {
        if (16 === e2) {
          let e3 = new ArrayBuffer(t2.length - 1);
          return new Uint8Array(e3).set(t2.subarray(1)), e3;
        }
        throw Error("Could not find typed array for code " + e2);
      }
      return new tu[n2](Uint8Array.prototype.slice.call(t2, 1).buffer);
    }, T[120] = () => {
      let t2 = q();
      return new RegExp(t2[0], t2[1]);
    };
    let tl = [];
    function tf(t2) {
      I && I();
      let e2 = d, n2 = M, i2 = A, r2 = w, s2 = S, a2 = g, o2 = E, u2 = v, l2 = y, f2 = new Uint8Array(c.slice(0, d)), h2 = p, b2 = p.slice(0, p.length), _2 = U, x2 = O, T2 = t2();
      return d = e2, M = n2, A = i2, w = r2, S = s2, g = a2, E = o2, v = u2, y = l2, c = f2, O = x2, (p = h2).splice(0, p.length, ...b2), U = _2, m = new DataView(c.buffer, c.byteOffset, c.byteLength), T2;
    }
    function th() {
      c = null, v = null, p = null;
    }
    T[98] = (t2) => {
      let e2 = (t2[0] << 24) + (t2[1] << 16) + (t2[2] << 8) + t2[3], n2 = M;
      return M += e2 - t2.length, y = tl, (y = [J(), J()]).position0 = 0, y.position1 = 0, y.postBundlePosition = M, M = n2, q();
    }, T[255] = (t2) => 4 == t2.length ? new Date((16777216 * t2[0] + (t2[1] << 16) + (t2[2] << 8) + t2[3]) * 1e3) : 8 == t2.length ? new Date(((t2[0] << 22) + (t2[1] << 14) + (t2[2] << 6) + (t2[3] >> 2)) / 1e6 + ((3 & t2[3]) * 4294967296 + 16777216 * t2[4] + (t2[5] << 16) + (t2[6] << 8) + t2[7]) * 1e3) : 12 == t2.length ? new Date(((t2[0] << 24) + (t2[1] << 16) + (t2[2] << 8) + t2[3]) / 1e6 + ((128 & t2[4] ? -281474976710656 : 0) + 1099511627776 * t2[6] + 4294967296 * t2[7] + 16777216 * t2[8] + (t2[9] << 16) + (t2[10] << 8) + t2[11]) * 1e3) : /* @__PURE__ */ new Date("invalid");
    let tc = Array(147);
    for (let t2 = 0; t2 < 256; t2++) tc[t2] = +("1e" + Math.floor(45.15 - 0.30103 * t2));
    var td = new B({ useRecords: false });
    td.unpack, td.unpackMultiple, td.unpack, new Uint8Array(new Float32Array(1).buffer, 0, 4);
    try {
      i = new TextEncoder();
    } catch (t2) {
    }
    let tp = "undefined" != typeof Buffer, tg = tp ? function(t2) {
      return Buffer.allocUnsafeSlow(t2);
    } : Uint8Array, ty = tp ? Buffer : Uint8Array, tv = tp ? 4294967296 : 2144337920, tm = 0, tb = null, t_ = /[\u0080-\uFFFF]/, tI = Symbol("record-id");
    function tM(t2, e2, n2, i2) {
      let r2 = t2.byteLength;
      if (r2 + 1 < 256) {
        var { target: s2, position: a2 } = n2(4 + r2);
        s2[a2++] = 199, s2[a2++] = r2 + 1;
      } else if (r2 + 1 < 65536) {
        var { target: s2, position: a2 } = n2(5 + r2);
        s2[a2++] = 200, s2[a2++] = r2 + 1 >> 8, s2[a2++] = r2 + 1 & 255;
      } else {
        var { target: s2, position: a2, targetView: o2 } = n2(7 + r2);
        s2[a2++] = 201, o2.setUint32(a2, r2 + 1), a2 += 4;
      }
      s2[a2++] = 116, s2[a2++] = e2, t2.buffer || (t2 = new Uint8Array(t2)), s2.set(new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), a2);
    }
    function tx(t2, e2) {
      let n2 = t2.byteLength;
      if (n2 < 256) {
        var i2, r2, { target: i2, position: r2 } = e2(n2 + 2);
        i2[r2++] = 196, i2[r2++] = n2;
      } else if (n2 < 65536) {
        var { target: i2, position: r2 } = e2(n2 + 3);
        i2[r2++] = 197, i2[r2++] = n2 >> 8, i2[r2++] = 255 & n2;
      } else {
        var { target: i2, position: r2, targetView: s2 } = e2(n2 + 5);
        i2[r2++] = 198, s2.setUint32(r2, n2), r2 += 4;
      }
      i2.set(t2, r2);
    }
    function tE(t2, e2, n2) {
      if (tb.length > 0) {
        u.setUint32(tb.position + t2, tm + n2 - tb.position - t2), tb.stringsPosition = tm - t2;
        let i2 = tb;
        tb = null, e2(i2[0]), e2(i2[1]);
      }
    }
    s = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, F], r = [{ pack(t2, e2, n2) {
      let i2 = t2.getTime() / 1e3;
      if ((this.useTimestamp32 || 0 === t2.getMilliseconds()) && i2 >= 0 && i2 < 4294967296) {
        let { target: t3, targetView: n3, position: r2 } = e2(6);
        t3[r2++] = 214, t3[r2++] = 255, n3.setUint32(r2, i2);
      } else if (i2 > 0 && i2 < 4294967296) {
        let { target: n3, targetView: r2, position: s2 } = e2(10);
        n3[s2++] = 215, n3[s2++] = 255, r2.setUint32(s2, 4e6 * t2.getMilliseconds() + (i2 / 1e3 / 4294967296 >> 0)), r2.setUint32(s2 + 4, i2);
      } else if (isNaN(i2)) {
        if (this.onInvalidDate) return e2(0), n2(this.onInvalidDate());
        let { target: t3, targetView: i3, position: r2 } = e2(3);
        t3[r2++] = 212, t3[r2++] = 255, t3[r2++] = 255;
      } else {
        let { target: n3, targetView: r2, position: s2 } = e2(15);
        n3[s2++] = 199, n3[s2++] = 12, n3[s2++] = 255, r2.setUint32(s2, 1e6 * t2.getMilliseconds()), r2.setBigInt64(s2 + 4, BigInt(Math.floor(i2)));
      }
    } }, { pack(t2, e2, n2) {
      if (this.setAsEmptyObject) return e2(0), n2({});
      let i2 = Array.from(t2), { target: r2, position: s2 } = e2(this.moreTypes ? 3 : 0);
      this.moreTypes && (r2[s2++] = 212, r2[s2++] = 115, r2[s2++] = 0), n2(i2);
    } }, { pack(t2, e2, n2) {
      let { target: i2, position: r2 } = e2(this.moreTypes ? 3 : 0);
      this.moreTypes && (i2[r2++] = 212, i2[r2++] = 101, i2[r2++] = 0), n2([t2.name, t2.message, t2.cause]);
    } }, { pack(t2, e2, n2) {
      let { target: i2, position: r2 } = e2(this.moreTypes ? 3 : 0);
      this.moreTypes && (i2[r2++] = 212, i2[r2++] = 120, i2[r2++] = 0), n2([t2.source, t2.flags]);
    } }, { pack(t2, e2) {
      this.moreTypes ? tM(t2, 16, e2) : tx(tp ? Buffer.from(t2) : new Uint8Array(t2), e2);
    } }, { pack(t2, e2) {
      let n2 = t2.constructor;
      n2 !== ty && this.moreTypes ? tM(t2, to.indexOf(n2.name), e2) : tx(t2, e2);
    } }, { pack(t2, e2) {
      let { target: n2, position: i2 } = e2(1);
      n2[i2] = 193;
    } }];
    let tA = new class extends B {
      constructor(t2) {
        let e2, n2, h2, c2;
        super(t2), this.offset = 0;
        let d2 = ty.prototype.utf8Write ? function(t3, e3) {
          return a.utf8Write(t3, e3, a.byteLength - e3);
        } : !!i && !!i.encodeInto && function(t3, e3) {
          return i.encodeInto(t3, a.subarray(e3)).written;
        }, p2 = this;
        t2 || (t2 = {});
        let g2 = t2 && t2.sequential, y2 = t2.structures || t2.saveStructures, v2 = t2.maxSharedStructures;
        if (null == v2 && (v2 = y2 ? 32 : 0), v2 > 8160) throw Error("Maximum maxSharedStructure is 8160");
        t2.structuredClone && void 0 == t2.moreTypes && (this.moreTypes = true);
        let m2 = t2.maxOwnStructures;
        null == m2 && (m2 = y2 ? 32 : 64), this.structures || false == t2.useRecords || (this.structures = []);
        let b2 = v2 > 32 || m2 + v2 > 64, _2 = v2 + 64, I2 = v2 + m2 + 64;
        if (I2 > 8256) throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
        let M2 = [], x2 = 0, E2 = 0;
        this.pack = this.encode = function(t3, i2) {
          let r2;
          if (a || (u = (a = new tg(8192)).dataView || (a.dataView = new DataView(a.buffer, 0, 8192)), tm = 0), (l = a.length - 10) - tm < 2048 ? (u = (a = new tg(a.length)).dataView || (a.dataView = new DataView(a.buffer, 0, a.length)), l = a.length - 10, tm = 0) : tm = tm + 7 & 2147483640, e2 = tm, i2 & tC && (tm += 255 & i2), c2 = p2.structuredClone ? /* @__PURE__ */ new Map() : null, p2.bundleStrings && "string" != typeof t3 ? (tb = []).size = 1 / 0 : tb = null, h2 = p2.structures) {
            h2.uninitialized && (h2 = p2._mergeStructures(p2.getStructures()));
            let t4 = h2.sharedLength || 0;
            if (t4 > v2) throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + h2.sharedLength);
            if (!h2.transitions) {
              h2.transitions = /* @__PURE__ */ Object.create(null);
              for (let e3 = 0; e3 < t4; e3++) {
                let t5 = h2[e3];
                if (!t5) continue;
                let n3, i3 = h2.transitions;
                for (let e4 = 0, r3 = t5.length; e4 < r3; e4++) {
                  let r4 = t5[e4];
                  (n3 = i3[r4]) || (n3 = i3[r4] = /* @__PURE__ */ Object.create(null)), i3 = n3;
                }
                i3[tI] = e3 + 64;
              }
              this.lastNamedStructuresLength = t4;
            }
            g2 || (h2.nextId = t4 + 64);
          }
          n2 && (n2 = false);
          try {
            p2.randomAccessStructure && t3 && t3.constructor && t3.constructor === Object ? B2(t3) : w2(t3);
            let n3 = tb;
            if (tb && tE(e2, w2, 0), c2 && c2.idsToInsert) {
              let t4 = c2.idsToInsert.sort((t5, e3) => t5.offset > e3.offset ? 1 : -1), i3 = t4.length, r3 = -1;
              for (; n3 && i3 > 0; ) {
                let s4 = t4[--i3].offset + e2;
                s4 < n3.stringsPosition + e2 && -1 === r3 && (r3 = 0), s4 > n3.position + e2 ? r3 >= 0 && (r3 += 6) : (r3 >= 0 && (u.setUint32(n3.position + e2, u.getUint32(n3.position + e2) + r3), r3 = -1), n3 = n3.previous, i3++);
              }
              r3 >= 0 && n3 && u.setUint32(n3.position + e2, u.getUint32(n3.position + e2) + r3), (tm += 6 * t4.length) > l && C2(tm), p2.offset = tm;
              let s3 = function(t5, e3) {
                let n4;
                let i4 = 6 * e3.length, r4 = t5.length - i4;
                for (; n4 = e3.pop(); ) {
                  let e4 = n4.offset, s4 = n4.id;
                  t5.copyWithin(e4 + i4, e4, r4);
                  let a2 = e4 + (i4 -= 6);
                  t5[a2++] = 214, t5[a2++] = 105, t5[a2++] = s4 >> 24, t5[a2++] = s4 >> 16 & 255, t5[a2++] = s4 >> 8 & 255, t5[a2++] = 255 & s4, r4 = e4;
                }
                return t5;
              }(a.subarray(e2, tm), t4);
              return c2 = null, s3;
            }
            if (p2.offset = tm, i2 & tN) return a.start = e2, a.end = tm, a;
            return a.subarray(e2, tm);
          } catch (t4) {
            throw r2 = t4, t4;
          } finally {
            if (h2 && (A2(), n2 && p2.saveStructures)) {
              var s2, o2;
              let n3 = h2.sharedLength || 0, u2 = a.subarray(e2, tm), l2 = (s2 = h2, o2 = p2, s2.isCompatible = (t4) => {
                let e3 = !t4 || (o2.lastNamedStructuresLength || 0) === t4.length;
                return e3 || o2._mergeStructures(t4), e3;
              }, s2);
              if (!r2) {
                if (false === p2.saveStructures(l2, l2.isCompatible)) return p2.pack(t3, i2);
                return p2.lastNamedStructuresLength = n3, a.length > 1073741824 && (a = null), u2;
              }
            }
            a.length > 1073741824 && (a = null), i2 & tF && (tm = e2);
          }
        };
        let A2 = () => {
          E2 < 10 && E2++;
          let t3 = h2.sharedLength || 0;
          if (h2.length > t3 && !g2 && (h2.length = t3), x2 > 1e4) h2.transitions = null, E2 = 0, x2 = 0, M2.length > 0 && (M2 = []);
          else if (M2.length > 0 && !g2) {
            for (let t4 = 0, e3 = M2.length; t4 < e3; t4++) M2[t4][tI] = 0;
            M2 = [];
          }
        }, U2 = (t3) => {
          var e3 = t3.length;
          e3 < 16 ? a[tm++] = 144 | e3 : e3 < 65536 ? (a[tm++] = 220, a[tm++] = e3 >> 8, a[tm++] = 255 & e3) : (a[tm++] = 221, u.setUint32(tm, e3), tm += 4);
          for (let n3 = 0; n3 < e3; n3++) w2(t3[n3]);
        }, w2 = (t3) => {
          tm > l && (a = C2(tm));
          var n3, i2 = typeof t3;
          if ("string" === i2) {
            let i3, r2 = t3.length;
            if (tb && r2 >= 4 && r2 < 4096) {
              if ((tb.size += r2) > 21760) {
                let t4, n5;
                let i4 = (tb[0] ? 3 * tb[0].length + tb[1].length : 0) + 10;
                tm + i4 > l && (a = C2(tm + i4)), tb.position ? (n5 = tb, a[tm] = 200, tm += 3, a[tm++] = 98, t4 = tm - e2, tm += 4, tE(e2, w2, 0), u.setUint16(t4 + e2 - 3, tm - e2 - t4)) : (a[tm++] = 214, a[tm++] = 98, t4 = tm - e2, tm += 4), (tb = ["", ""]).previous = n5, tb.size = 0, tb.position = t4;
              }
              let n4 = t_.test(t3);
              tb[n4 ? 0 : 1] += t3, a[tm++] = 193, w2(n4 ? -r2 : r2);
              return;
            }
            i3 = r2 < 32 ? 1 : r2 < 256 ? 2 : r2 < 65536 ? 3 : 5;
            let s2 = 3 * r2;
            if (tm + s2 > l && (a = C2(tm + s2)), r2 < 64 || !d2) {
              let e3, s3, o2, u2 = tm + i3;
              for (e3 = 0; e3 < r2; e3++) (s3 = t3.charCodeAt(e3)) < 128 ? a[u2++] = s3 : (s3 < 2048 ? a[u2++] = s3 >> 6 | 192 : ((64512 & s3) == 55296 && (64512 & (o2 = t3.charCodeAt(e3 + 1))) == 56320 ? (s3 = 65536 + ((1023 & s3) << 10) + (1023 & o2), e3++, a[u2++] = s3 >> 18 | 240, a[u2++] = s3 >> 12 & 63 | 128) : a[u2++] = s3 >> 12 | 224, a[u2++] = s3 >> 6 & 63 | 128), a[u2++] = 63 & s3 | 128);
              n3 = u2 - tm - i3;
            } else n3 = d2(t3, tm + i3);
            n3 < 32 ? a[tm++] = 160 | n3 : n3 < 256 ? (i3 < 2 && a.copyWithin(tm + 2, tm + 1, tm + 1 + n3), a[tm++] = 217, a[tm++] = n3) : n3 < 65536 ? (i3 < 3 && a.copyWithin(tm + 3, tm + 2, tm + 2 + n3), a[tm++] = 218, a[tm++] = n3 >> 8, a[tm++] = 255 & n3) : (i3 < 5 && a.copyWithin(tm + 5, tm + 3, tm + 3 + n3), a[tm++] = 219, u.setUint32(tm, n3), tm += 4), tm += n3;
          } else if ("number" === i2) {
            if (t3 >>> 0 === t3) t3 < 32 || t3 < 128 && false === this.useRecords || t3 < 64 && !this.randomAccessStructure ? a[tm++] = t3 : t3 < 256 ? (a[tm++] = 204, a[tm++] = t3) : t3 < 65536 ? (a[tm++] = 205, a[tm++] = t3 >> 8, a[tm++] = 255 & t3) : (a[tm++] = 206, u.setUint32(tm, t3), tm += 4);
            else if (t3 >> 0 === t3) t3 >= -32 ? a[tm++] = 256 + t3 : t3 >= -128 ? (a[tm++] = 208, a[tm++] = t3 + 256) : t3 >= -32768 ? (a[tm++] = 209, u.setInt16(tm, t3), tm += 2) : (a[tm++] = 210, u.setInt32(tm, t3), tm += 4);
            else {
              let e3;
              if ((e3 = this.useFloat32) > 0 && t3 < 4294967296 && t3 >= -2147483648) {
                let n4;
                if (a[tm++] = 202, u.setFloat32(tm, t3), e3 < 4 || (n4 = t3 * tc[(127 & a[tm]) << 1 | a[tm + 1] >> 7]) >> 0 === n4) {
                  tm += 4;
                  return;
                }
                tm--;
              }
              a[tm++] = 203, u.setFloat64(tm, t3), tm += 8;
            }
          } else if ("object" === i2 || "function" === i2) {
            if (t3) {
              if (c2) {
                let n4 = c2.get(t3);
                if (n4) {
                  if (!n4.id) {
                    let t4 = c2.idsToInsert || (c2.idsToInsert = []);
                    n4.id = t4.push(n4);
                  }
                  a[tm++] = 214, a[tm++] = 112, u.setUint32(tm, n4.id), tm += 4;
                  return;
                }
                c2.set(t3, { offset: tm - e2 });
              }
              let o2 = t3.constructor;
              if (o2 === Object) F2(t3);
              else if (o2 === Array) U2(t3);
              else if (o2 === Map) {
                if (this.mapAsEmptyObject) a[tm++] = 128;
                else for (let [e3, i3] of ((n3 = t3.size) < 16 ? a[tm++] = 128 | n3 : n3 < 65536 ? (a[tm++] = 222, a[tm++] = n3 >> 8, a[tm++] = 255 & n3) : (a[tm++] = 223, u.setUint32(tm, n3), tm += 4), t3)) w2(e3), w2(i3);
              } else {
                for (let e3 = 0, n4 = r.length; e3 < n4; e3++) if (t3 instanceof s[e3]) {
                  let n5, i3 = r[e3];
                  if (i3.write) {
                    i3.type && (a[tm++] = 212, a[tm++] = i3.type, a[tm++] = 0);
                    let e4 = i3.write.call(this, t3);
                    e4 === t3 ? Array.isArray(t3) ? U2(t3) : F2(t3) : w2(e4);
                    return;
                  }
                  let s2 = a, o3 = u, f2 = tm;
                  a = null;
                  try {
                    n5 = i3.pack.call(this, t3, (t4) => (a = s2, s2 = null, (tm += t4) > l && C2(tm), { target: a, targetView: u, position: tm - t4 }), w2);
                  } finally {
                    s2 && (a = s2, u = o3, tm = f2, l = a.length - 10);
                  }
                  n5 && (n5.length + tm > l && C2(n5.length + tm), tm = function(t4, e4, n6, i4) {
                    let r2 = t4.length;
                    switch (r2) {
                      case 1:
                        e4[n6++] = 212;
                        break;
                      case 2:
                        e4[n6++] = 213;
                        break;
                      case 4:
                        e4[n6++] = 214;
                        break;
                      case 8:
                        e4[n6++] = 215;
                        break;
                      case 16:
                        e4[n6++] = 216;
                        break;
                      default:
                        r2 < 256 ? (e4[n6++] = 199, e4[n6++] = r2) : (r2 < 65536 ? (e4[n6++] = 200, e4[n6++] = r2 >> 8) : (e4[n6++] = 201, e4[n6++] = r2 >> 24, e4[n6++] = r2 >> 16 & 255, e4[n6++] = r2 >> 8 & 255), e4[n6++] = 255 & r2);
                    }
                    return e4[n6++] = i4, e4.set(t4, n6), n6 += r2;
                  }(n5, a, tm, i3.type));
                  return;
                }
                if (Array.isArray(t3)) U2(t3);
                else {
                  if (t3.toJSON) {
                    let e3 = t3.toJSON();
                    if (e3 !== t3) return w2(e3);
                  }
                  if ("function" === i2) return w2(this.writeFunction && this.writeFunction(t3));
                  F2(t3);
                }
              }
            } else a[tm++] = 192;
          } else if ("boolean" === i2) a[tm++] = t3 ? 195 : 194;
          else if ("bigint" === i2) {
            if (t3 < BigInt(1) << BigInt(63) && t3 >= -(BigInt(1) << BigInt(63))) a[tm++] = 211, u.setBigInt64(tm, t3);
            else if (t3 < BigInt(1) << BigInt(64) && t3 > 0) a[tm++] = 207, u.setBigUint64(tm, t3);
            else if (this.largeBigIntToFloat) a[tm++] = 203, u.setFloat64(tm, Number(t3));
            else if (this.largeBigIntToString) return w2(t3.toString());
            else if (this.useBigIntExtension && t3 < BigInt(2) ** BigInt(1023) && t3 > -(BigInt(2) ** BigInt(1023))) {
              let e3;
              a[tm++] = 199, tm++, a[tm++] = 66;
              let n4 = [];
              do {
                let i3 = t3 & BigInt(255);
                e3 = (i3 & BigInt(128)) === (t3 < BigInt(0) ? BigInt(128) : BigInt(0)), n4.push(i3), t3 >>= BigInt(8);
              } while (!((t3 === BigInt(0) || t3 === BigInt(-1)) && e3));
              a[tm - 2] = n4.length;
              for (let t4 = n4.length; t4 > 0; ) a[tm++] = Number(n4[--t4]);
              return;
            } else throw RangeError(t3 + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
            tm += 8;
          } else if ("undefined" === i2) this.encodeUndefinedAsNil ? a[tm++] = 192 : (a[tm++] = 212, a[tm++] = 0, a[tm++] = 0);
          else throw Error("Unknown type: " + i2);
        }, S2 = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (t3) => {
          let e3, n3;
          if (this.skipValues) for (let n4 in e3 = [], t3) ("function" != typeof t3.hasOwnProperty || t3.hasOwnProperty(n4)) && !this.skipValues.includes(t3[n4]) && e3.push(n4);
          else e3 = Object.keys(t3);
          let i2 = e3.length;
          if (i2 < 16 ? a[tm++] = 128 | i2 : i2 < 65536 ? (a[tm++] = 222, a[tm++] = i2 >> 8, a[tm++] = 255 & i2) : (a[tm++] = 223, u.setUint32(tm, i2), tm += 4), this.coercibleKeyAsNumber) for (let r2 = 0; r2 < i2; r2++) {
            let i3 = Number(n3 = e3[r2]);
            w2(isNaN(i3) ? n3 : i3), w2(t3[n3]);
          }
          else for (let r2 = 0; r2 < i2; r2++) w2(n3 = e3[r2]), w2(t3[n3]);
        } : (t3) => {
          a[tm++] = 222;
          let n3 = tm - e2;
          tm += 2;
          let i2 = 0;
          for (let e3 in t3) ("function" != typeof t3.hasOwnProperty || t3.hasOwnProperty(e3)) && (w2(e3), w2(t3[e3]), i2++);
          if (i2 > 65535) throw Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
          a[n3++ + e2] = i2 >> 8, a[n3 + e2] = 255 & i2;
        }, T2 = false === this.useRecords ? S2 : t2.progressiveRecords && !b2 ? (t3) => {
          let n3, i2, r2 = h2.transitions || (h2.transitions = /* @__PURE__ */ Object.create(null)), s2 = tm++ - e2;
          for (let a2 in t3) if ("function" != typeof t3.hasOwnProperty || t3.hasOwnProperty(a2)) {
            if (i2 = r2[a2]) r2 = i2;
            else {
              let o2 = Object.keys(t3), u2 = r2;
              r2 = h2.transitions;
              let l2 = 0;
              for (let t4 = 0, e3 = o2.length; t4 < e3; t4++) {
                let e4 = o2[t4];
                !(i2 = r2[e4]) && (i2 = r2[e4] = /* @__PURE__ */ Object.create(null), l2++), r2 = i2;
              }
              s2 + e2 + 1 == tm ? (tm--, O2(r2, o2, l2)) : k2(r2, o2, s2, l2), n3 = true, r2 = u2[a2];
            }
            w2(t3[a2]);
          }
          if (!n3) {
            let n4 = r2[tI];
            n4 ? a[s2 + e2] = n4 : k2(r2, Object.keys(t3), s2, 0);
          }
        } : (t3) => {
          let e3, n3 = h2.transitions || (h2.transitions = /* @__PURE__ */ Object.create(null)), i2 = 0;
          for (let r3 in t3) ("function" != typeof t3.hasOwnProperty || t3.hasOwnProperty(r3)) && (!(e3 = n3[r3]) && (e3 = n3[r3] = /* @__PURE__ */ Object.create(null), i2++), n3 = e3);
          let r2 = n3[tI];
          for (let e4 in r2 ? r2 >= 96 && b2 ? (a[tm++] = (31 & (r2 -= 96)) + 96, a[tm++] = r2 >> 5) : a[tm++] = r2 : O2(n3, n3.__keys__ || Object.keys(t3), i2), t3) ("function" != typeof t3.hasOwnProperty || t3.hasOwnProperty(e4)) && w2(t3[e4]);
        }, N2 = "function" == typeof this.useRecords && this.useRecords, F2 = N2 ? (t3) => {
          N2(t3) ? T2(t3) : S2(t3);
        } : T2, C2 = (t3) => {
          let n3;
          if (t3 > 16777216) {
            if (t3 - e2 > tv) throw Error("Packed buffer would be larger than maximum buffer size");
            n3 = Math.min(tv, 4096 * Math.round(Math.max((t3 - e2) * (t3 > 67108864 ? 1.25 : 2), 4194304) / 4096));
          } else n3 = (Math.max(t3 - e2 << 2, a.length - 1) >> 12) + 1 << 12;
          let i2 = new tg(n3);
          return u = i2.dataView || (i2.dataView = new DataView(i2.buffer, 0, n3)), t3 = Math.min(t3, a.length), a.copy ? a.copy(i2, 0, e2, t3) : i2.set(a.slice(e2, t3)), tm -= e2, e2 = 0, l = i2.length - 10, a = i2;
        }, O2 = (t3, e3, i2) => {
          let r2 = h2.nextId;
          r2 || (r2 = 64), r2 < _2 && this.shouldShareStructure && !this.shouldShareStructure(e3) ? ((r2 = h2.nextOwnId) < I2 || (r2 = _2), h2.nextOwnId = r2 + 1) : (r2 >= I2 && (r2 = _2), h2.nextId = r2 + 1);
          let s2 = e3.highByte = r2 >= 96 && b2 ? r2 - 96 >> 5 : -1;
          t3[tI] = r2, t3.__keys__ = e3, h2[r2 - 64] = e3, r2 < _2 ? (e3.isShared = true, h2.sharedLength = r2 - 63, n2 = true, s2 >= 0 ? (a[tm++] = (31 & r2) + 96, a[tm++] = s2) : a[tm++] = r2) : (s2 >= 0 ? (a[tm++] = 213, a[tm++] = 114, a[tm++] = (31 & r2) + 96, a[tm++] = s2) : (a[tm++] = 212, a[tm++] = 114, a[tm++] = r2), i2 && (x2 += E2 * i2), M2.length >= m2 && (M2.shift()[tI] = 0), M2.push(t3), w2(e3));
        }, k2 = (t3, n3, i2, r2) => {
          let s2 = a, u2 = tm, f2 = l, h3 = e2;
          tm = 0, e2 = 0, (a = o) || (o = a = new tg(8192)), l = a.length - 10, O2(t3, n3, r2), o = a;
          let c3 = tm;
          if (a = s2, tm = u2, l = f2, e2 = h3, c3 > 1) {
            let t4 = tm + c3 - 1;
            t4 > l && C2(t4);
            let n4 = i2 + e2;
            a.copyWithin(n4 + c3, n4 + 1, tm), a.set(o.slice(0, c3), n4), tm = t4;
          } else a[i2 + e2] = o[0];
        }, B2 = (t3) => {
          let i2 = f(t3, a, e2, tm, h2, C2, (t4, e3, i3) => {
            if (i3) return n2 = true;
            tm = e3;
            let r2 = a;
            return (w2(t4), A2(), r2 !== a) ? { position: tm, targetView: u, target: a } : tm;
          }, this);
          if (0 === i2) return F2(t3);
          tm = i2;
        };
      }
      useBuffer(t2) {
        (a = t2).dataView || (a.dataView = new DataView(a.buffer, a.byteOffset, a.byteLength)), tm = 0;
      }
      set position(t2) {
        tm = t2;
      }
      get position() {
        return tm;
      }
      clearSharedData() {
        this.structures && (this.structures = []), this.typedStructs && (this.typedStructs = []);
      }
    }({ useRecords: false });
    tA.pack, tA.pack;
    let { NEVER: tU, ALWAYS: tw, DECIMAL_ROUND: tS, DECIMAL_FIT: tT } = { NEVER: 0, ALWAYS: 1, DECIMAL_ROUND: 3, DECIMAL_FIT: 4 }, tN = 512, tF = 1024, tC = 2048;
  }, 8779: function(t, e, n) {
    "use strict";
    function i(t2) {
      return { lang: t2?.lang ?? l?.lang, message: t2?.message, abortEarly: t2?.abortEarly ?? l?.abortEarly, abortPipeEarly: t2?.abortPipeEarly ?? l?.abortPipeEarly };
    }
    function r(t2) {
      let e2 = typeof t2;
      return "string" === e2 ? `"${t2}"` : "number" === e2 || "bigint" === e2 || "boolean" === e2 ? `${t2}` : "object" === e2 || "function" === e2 ? (t2 && Object.getPrototypeOf(t2)?.constructor?.name) ?? "null" : e2;
    }
    function s(t2, e2, n2, i2, s2) {
      var a2, o2, u2, l2;
      let d2 = s2 && "input" in s2 ? s2.input : n2.value, p2 = s2?.expected ?? t2.expects ?? null, g2 = s2?.received ?? r(d2), y2 = { kind: t2.kind, type: t2.type, input: d2, expected: p2, received: g2, message: `Invalid ${e2}: ${p2 ? `Expected ${p2} but r` : "R"}eceived ${g2}`, requirement: t2.requirement, path: s2?.path, issues: s2?.issues, lang: i2.lang, abortEarly: i2.abortEarly, abortPipeEarly: i2.abortPipeEarly }, v2 = "schema" === t2.kind, m2 = s2?.message ?? t2.message ?? (a2 = t2.reference, o2 = y2.lang, c?.get(a2)?.get(o2)) ?? (v2 ? (u2 = y2.lang, h?.get(u2)) : null) ?? i2.message ?? (l2 = y2.lang, f?.get(l2));
      m2 && (y2.message = "function" == typeof m2 ? m2(y2) : m2), v2 && (n2.typed = false), n2.issues ? n2.issues.push(y2) : n2.issues = [y2];
    }
    function a(t2) {
      return { version: 1, vendor: "valibot", validate: (e2) => t2["~run"]({ value: e2 }, i()) };
    }
    function o(t2, e2) {
      let n2 = [...new Set(t2)];
      return n2.length > 1 ? `(${n2.join(` ${e2} `)})` : n2[0] ?? "never";
    }
    function u(t2) {
      return t2 instanceof d;
    }
    n.d(e, { $R3: () => w, AG3: () => A, BF5: () => p, G0j: () => k, IMB: () => S, IXX: () => I, Kvp: () => M, Qc3: () => B, Rxh: () => U, UID: () => E, YjB: () => _, Z_8: () => F, _LP: () => g, bcc: () => C, cfj: () => T, eE4: () => x, kE: () => y, qXN: () => N, vs: () => v, xHg: () => m, yhs: () => u, zGw: () => D });
    var l, f, h, c, d = class extends Error {
      constructor(t2) {
        super(t2[0].message), this.name = "ValiError", this.issues = t2;
      }
    };
    function p(t2, e2) {
      return { kind: "validation", type: "check", reference: p, async: false, expects: null, requirement: t2, message: e2, "~run"(t3, e3) {
        return t3.typed && !this.requirement(t3.value) && s(this, "input", t3, e3), t3;
      } };
    }
    function g(t2) {
      return { kind: "validation", type: "integer", reference: g, async: false, expects: null, requirement: Number.isInteger, message: t2, "~run"(t3, e2) {
        return t3.typed && !this.requirement(t3.value) && s(this, "integer", t3, e2), t3;
      } };
    }
    function y(t2, e2) {
      return { kind: "validation", type: "length", reference: y, async: false, expects: `${t2}`, requirement: t2, message: e2, "~run"(t3, e3) {
        return t3.typed && t3.value.length !== this.requirement && s(this, "length", t3, e3, { received: `${t3.value.length}` }), t3;
      } };
    }
    function v(t2) {
      return { kind: "transformation", type: "transform", reference: v, async: false, operation: t2, "~run"(t3) {
        return t3.value = this.operation(t3.value), t3;
      } };
    }
    function m(t2) {
      let e2 = {};
      for (let n2 of t2) if (n2.path) {
        let t3 = function(t4) {
          if (t4.path) {
            let e3 = "";
            for (let n3 of t4.path) {
              if ("string" != typeof n3.key && "number" != typeof n3.key) return null;
              e3 ? e3 += `.${n3.key}` : e3 += n3.key;
            }
            return e3;
          }
          return null;
        }(n2);
        t3 ? (e2.nested || (e2.nested = {}), e2.nested[t3] ? e2.nested[t3].push(n2.message) : e2.nested[t3] = [n2.message]) : e2.other ? e2.other.push(n2.message) : e2.other = [n2.message];
      } else e2.root ? e2.root.push(n2.message) : e2.root = [n2.message];
      return e2;
    }
    function b(t2, e2, n2) {
      return "function" == typeof t2.default ? t2.default(e2, n2) : t2.default;
    }
    function _() {
      return { kind: "schema", type: "any", reference: _, expects: "any", async: false, get "~standard"() {
        return a(this);
      }, "~run": (t2) => (t2.typed = true, t2) };
    }
    function I(t2, e2) {
      return { kind: "schema", type: "array", reference: I, expects: "Array", async: false, item: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n2 = t3.value;
        if (Array.isArray(n2)) {
          t3.typed = true, t3.value = [];
          for (let i2 = 0; i2 < n2.length; i2++) {
            let r2 = n2[i2], s2 = this.item["~run"]({ value: r2 }, e3);
            if (s2.issues) {
              let a2 = { type: "array", origin: "value", input: n2, key: i2, value: r2 };
              for (let e4 of s2.issues) e4.path ? e4.path.unshift(a2) : e4.path = [a2], t3.issues?.push(e4);
              if (t3.issues || (t3.issues = s2.issues), e3.abortEarly) {
                t3.typed = false;
                break;
              }
            }
            s2.typed || (t3.typed = false), t3.value.push(s2.value);
          }
        } else s(this, "type", t3, e3);
        return t3;
      } };
    }
    function M(t2) {
      return { kind: "schema", type: "bigint", reference: M, expects: "bigint", async: false, message: t2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e2) {
        return "bigint" == typeof t3.value ? t3.typed = true : s(this, "type", t3, e2), t3;
      } };
    }
    function x(t2, e2) {
      return { kind: "schema", type: "instance", reference: x, expects: t2.name, async: false, class: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        return t3.value instanceof this.class ? t3.typed = true : s(this, "type", t3, e3), t3;
      } };
    }
    function E(t2, e2, n2) {
      return { kind: "schema", type: "map", reference: E, expects: "Map", async: false, key: t2, value: e2, message: n2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n3 = t3.value;
        if (n3 instanceof Map) for (let [i2, r2] of (t3.typed = true, t3.value = /* @__PURE__ */ new Map(), n3)) {
          let s2 = this.key["~run"]({ value: i2 }, e3);
          if (s2.issues) {
            let a3 = { type: "map", origin: "key", input: n3, key: i2, value: r2 };
            for (let e4 of s2.issues) e4.path ? e4.path.unshift(a3) : e4.path = [a3], t3.issues?.push(e4);
            if (t3.issues || (t3.issues = s2.issues), e3.abortEarly) {
              t3.typed = false;
              break;
            }
          }
          let a2 = this.value["~run"]({ value: r2 }, e3);
          if (a2.issues) {
            let s3 = { type: "map", origin: "value", input: n3, key: i2, value: r2 };
            for (let e4 of a2.issues) e4.path ? e4.path.unshift(s3) : e4.path = [s3], t3.issues?.push(e4);
            if (t3.issues || (t3.issues = a2.issues), e3.abortEarly) {
              t3.typed = false;
              break;
            }
          }
          s2.typed && a2.typed || (t3.typed = false), t3.value.set(s2.value, a2.value);
        }
        else s(this, "type", t3, e3);
        return t3;
      } };
    }
    function A(t2, e2) {
      return { kind: "schema", type: "nullable", reference: A, expects: `(${t2.expects} | null)`, async: false, wrapped: t2, default: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        return null === t3.value && (void 0 !== this.default && (t3.value = b(this, t3, e3)), null === t3.value) ? (t3.typed = true, t3) : this.wrapped["~run"](t3, e3);
      } };
    }
    function U(t2) {
      return { kind: "schema", type: "number", reference: U, expects: "number", async: false, message: t2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e2) {
        return "number" != typeof t3.value || isNaN(t3.value) ? s(this, "type", t3, e2) : t3.typed = true, t3;
      } };
    }
    function w(t2, e2) {
      return { kind: "schema", type: "picklist", reference: w, expects: o(t2.map(r), "|"), async: false, options: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        return this.options.includes(t3.value) ? t3.typed = true : s(this, "type", t3, e3), t3;
      } };
    }
    function S(t2, e2, n2) {
      return { kind: "schema", type: "record", reference: S, expects: "Object", async: false, key: t2, value: e2, message: n2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n3 = t3.value;
        if (n3 && "object" == typeof n3) {
          for (let i2 in t3.typed = true, t3.value = {}, n3) if (Object.hasOwn(n3, i2) && "__proto__" !== i2 && "prototype" !== i2 && "constructor" !== i2) {
            let r2 = n3[i2], s2 = this.key["~run"]({ value: i2 }, e3);
            if (s2.issues) {
              let a3 = { type: "object", origin: "key", input: n3, key: i2, value: r2 };
              for (let e4 of s2.issues) e4.path = [a3], t3.issues?.push(e4);
              if (t3.issues || (t3.issues = s2.issues), e3.abortEarly) {
                t3.typed = false;
                break;
              }
            }
            let a2 = this.value["~run"]({ value: r2 }, e3);
            if (a2.issues) {
              let s3 = { type: "object", origin: "value", input: n3, key: i2, value: r2 };
              for (let e4 of a2.issues) e4.path ? e4.path.unshift(s3) : e4.path = [s3], t3.issues?.push(e4);
              if (t3.issues || (t3.issues = a2.issues), e3.abortEarly) {
                t3.typed = false;
                break;
              }
            }
            s2.typed && a2.typed || (t3.typed = false), s2.typed && (t3.value[s2.value] = a2.value);
          }
        } else s(this, "type", t3, e3);
        return t3;
      } };
    }
    function T(t2, e2) {
      return { kind: "schema", type: "strict_object", reference: T, expects: "Object", async: false, entries: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n2 = t3.value;
        if (n2 && "object" == typeof n2) {
          for (let i2 in t3.typed = true, t3.value = {}, this.entries) {
            let r2 = this.entries[i2];
            if (i2 in n2 || ("exact_optional" === r2.type || "optional" === r2.type || "nullish" === r2.type) && void 0 !== r2.default) {
              let s2 = i2 in n2 ? n2[i2] : b(r2), a2 = r2["~run"]({ value: s2 }, e3);
              if (a2.issues) {
                let r3 = { type: "object", origin: "value", input: n2, key: i2, value: s2 };
                for (let e4 of a2.issues) e4.path ? e4.path.unshift(r3) : e4.path = [r3], t3.issues?.push(e4);
                if (t3.issues || (t3.issues = a2.issues), e3.abortEarly) {
                  t3.typed = false;
                  break;
                }
              }
              a2.typed || (t3.typed = false), t3.value[i2] = a2.value;
            } else if (void 0 !== r2.fallback) t3.value[i2] = "function" == typeof r2.fallback ? r2.fallback(void 0, void 0) : r2.fallback;
            else if ("exact_optional" !== r2.type && "optional" !== r2.type && "nullish" !== r2.type && (s(this, "key", t3, e3, { input: void 0, expected: `"${i2}"`, path: [{ type: "object", origin: "key", input: n2, key: i2, value: n2[i2] }] }), e3.abortEarly)) break;
          }
          if (!t3.issues || !e3.abortEarly) {
            for (let i2 in n2) if (!(i2 in this.entries)) {
              s(this, "key", t3, e3, { input: i2, expected: "never", path: [{ type: "object", origin: "key", input: n2, key: i2, value: n2[i2] }] });
              break;
            }
          }
        } else s(this, "type", t3, e3);
        return t3;
      } };
    }
    function N(t2, e2) {
      return { kind: "schema", type: "strict_tuple", reference: N, expects: "Array", async: false, items: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n2 = t3.value;
        if (Array.isArray(n2)) {
          t3.typed = true, t3.value = [];
          for (let i2 = 0; i2 < this.items.length; i2++) {
            let r2 = n2[i2], s2 = this.items[i2]["~run"]({ value: r2 }, e3);
            if (s2.issues) {
              let a2 = { type: "array", origin: "value", input: n2, key: i2, value: r2 };
              for (let e4 of s2.issues) e4.path ? e4.path.unshift(a2) : e4.path = [a2], t3.issues?.push(e4);
              if (t3.issues || (t3.issues = s2.issues), e3.abortEarly) {
                t3.typed = false;
                break;
              }
            }
            s2.typed || (t3.typed = false), t3.value.push(s2.value);
          }
          !(t3.issues && e3.abortEarly) && this.items.length < n2.length && s(this, "type", t3, e3, { input: n2[this.items.length], expected: "never", path: [{ type: "array", origin: "value", input: n2, key: this.items.length, value: n2[this.items.length] }] });
        } else s(this, "type", t3, e3);
        return t3;
      } };
    }
    function F(t2) {
      return { kind: "schema", type: "string", reference: F, expects: "string", async: false, message: t2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e2) {
        return "string" == typeof t3.value ? t3.typed = true : s(this, "type", t3, e2), t3;
      } };
    }
    function C(t2, e2) {
      return { kind: "schema", type: "tuple", reference: C, expects: "Array", async: false, items: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n2 = t3.value;
        if (Array.isArray(n2)) {
          t3.typed = true, t3.value = [];
          for (let i2 = 0; i2 < this.items.length; i2++) {
            let r2 = n2[i2], s2 = this.items[i2]["~run"]({ value: r2 }, e3);
            if (s2.issues) {
              let a2 = { type: "array", origin: "value", input: n2, key: i2, value: r2 };
              for (let e4 of s2.issues) e4.path ? e4.path.unshift(a2) : e4.path = [a2], t3.issues?.push(e4);
              if (t3.issues || (t3.issues = s2.issues), e3.abortEarly) {
                t3.typed = false;
                break;
              }
            }
            s2.typed || (t3.typed = false), t3.value.push(s2.value);
          }
        } else s(this, "type", t3, e3);
        return t3;
      } };
    }
    function O(t2) {
      let e2;
      if (t2) for (let n2 of t2) e2 ? e2.push(...n2.issues) : e2 = n2.issues;
      return e2;
    }
    function k(t2, e2) {
      return { kind: "schema", type: "union", reference: k, expects: o(t2.map((t3) => t3.expects), "|"), async: false, options: t2, message: e2, get "~standard"() {
        return a(this);
      }, "~run"(t3, e3) {
        let n2, i2, r2;
        for (let s2 of this.options) {
          let a2 = s2["~run"]({ value: t3.value }, e3);
          if (a2.typed) {
            if (a2.issues) i2 ? i2.push(a2) : i2 = [a2];
            else {
              n2 = a2;
              break;
            }
          } else r2 ? r2.push(a2) : r2 = [a2];
        }
        if (n2) return n2;
        if (i2) {
          if (1 === i2.length) return i2[0];
          s(this, "type", t3, e3, { issues: O(i2) }), t3.typed = true;
        } else {
          if (r2?.length === 1) return r2[0];
          s(this, "type", t3, e3, { issues: O(r2) });
        }
        return t3;
      } };
    }
    function B(t2, e2, n2) {
      let r2 = t2["~run"]({ value: e2 }, i(n2));
      if (r2.issues) throw new d(r2.issues);
      return r2.value;
    }
    function D(...t2) {
      return { ...t2[0], pipe: t2, get "~standard"() {
        return a(this);
      }, "~run"(e2, n2) {
        for (let i2 of t2) if ("metadata" !== i2.kind) {
          if (e2.issues && ("schema" === i2.kind || "transformation" === i2.kind)) {
            e2.typed = false;
            break;
          }
          e2.issues && (n2.abortEarly || n2.abortPipeEarly) || (e2 = i2["~run"](e2, n2));
        }
        return e2;
      } };
    }
  } }]);
})();
