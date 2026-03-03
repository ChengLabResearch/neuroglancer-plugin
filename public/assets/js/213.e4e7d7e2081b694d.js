"use strict";
(() => {
  (globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || []).push([["213"], { 9685: function(t, n, r) {
    r.d(n, { FD: () => o, Ib: () => a, WT: () => e });
    var a = 1e-6, e = "undefined" != typeof Float32Array ? Float32Array : Array, o = Math.random;
    Math.hypot || (Math.hypot = function() {
      for (var t2 = 0, n2 = arguments.length; n2--; ) t2 += arguments[n2] * arguments[n2];
      return Math.sqrt(t2);
    });
  }, 2945: function(t, n, r) {
    r.r(n), r.d(n, { add: () => L, calculateW: () => x, clone: () => E, conjugate: () => F, copy: () => S, create: () => M, dot: () => $, equals: () => G, exactEquals: () => B, exp: () => T, fromEuler: () => W, fromMat3: () => D, fromValues: () => P, getAngle: () => b, getAxisAngle: () => m, identity: () => v, invert: () => w, len: () => Q, length: () => N, lerp: () => C, ln: () => Z, mul: () => V, multiply: () => p, normalize: () => Y, pow: () => j, random: () => I, rotateX: () => g, rotateY: () => y, rotateZ: () => q, rotationTo: () => H, scale: () => k, set: () => z, setAxes: () => K, setAxisAngle: () => d, slerp: () => A, sqlerp: () => J, sqrLen: () => X, squaredLength: () => U, str: () => O });
    var a, e, o, u, i, c, f = r(9685), l = r(5600), s = r(7160), h = r(8333);
    function M() {
      var t2 = new f.WT(4);
      return f.WT != Float32Array && (t2[0] = 0, t2[1] = 0, t2[2] = 0), t2[3] = 1, t2;
    }
    function v(t2) {
      return t2[0] = 0, t2[1] = 0, t2[2] = 0, t2[3] = 1, t2;
    }
    function d(t2, n2, r2) {
      var a2 = Math.sin(r2 *= 0.5);
      return t2[0] = a2 * n2[0], t2[1] = a2 * n2[1], t2[2] = a2 * n2[2], t2[3] = Math.cos(r2), t2;
    }
    function m(t2, n2) {
      var r2 = 2 * Math.acos(n2[3]), a2 = Math.sin(r2 / 2);
      return a2 > f.Ib ? (t2[0] = n2[0] / a2, t2[1] = n2[1] / a2, t2[2] = n2[2] / a2) : (t2[0] = 1, t2[1] = 0, t2[2] = 0), r2;
    }
    function b(t2, n2) {
      var r2 = $(t2, n2);
      return Math.acos(2 * r2 * r2 - 1);
    }
    function p(t2, n2, r2) {
      var a2 = n2[0], e2 = n2[1], o2 = n2[2], u2 = n2[3], i2 = r2[0], c2 = r2[1], f2 = r2[2], l2 = r2[3];
      return t2[0] = a2 * l2 + u2 * i2 + e2 * f2 - o2 * c2, t2[1] = e2 * l2 + u2 * c2 + o2 * i2 - a2 * f2, t2[2] = o2 * l2 + u2 * f2 + a2 * c2 - e2 * i2, t2[3] = u2 * l2 - a2 * i2 - e2 * c2 - o2 * f2, t2;
    }
    function g(t2, n2, r2) {
      r2 *= 0.5;
      var a2 = n2[0], e2 = n2[1], o2 = n2[2], u2 = n2[3], i2 = Math.sin(r2), c2 = Math.cos(r2);
      return t2[0] = a2 * c2 + u2 * i2, t2[1] = e2 * c2 + o2 * i2, t2[2] = o2 * c2 - e2 * i2, t2[3] = u2 * c2 - a2 * i2, t2;
    }
    function y(t2, n2, r2) {
      r2 *= 0.5;
      var a2 = n2[0], e2 = n2[1], o2 = n2[2], u2 = n2[3], i2 = Math.sin(r2), c2 = Math.cos(r2);
      return t2[0] = a2 * c2 - o2 * i2, t2[1] = e2 * c2 + u2 * i2, t2[2] = o2 * c2 + a2 * i2, t2[3] = u2 * c2 - e2 * i2, t2;
    }
    function q(t2, n2, r2) {
      r2 *= 0.5;
      var a2 = n2[0], e2 = n2[1], o2 = n2[2], u2 = n2[3], i2 = Math.sin(r2), c2 = Math.cos(r2);
      return t2[0] = a2 * c2 + e2 * i2, t2[1] = e2 * c2 - a2 * i2, t2[2] = o2 * c2 + u2 * i2, t2[3] = u2 * c2 - o2 * i2, t2;
    }
    function x(t2, n2) {
      var r2 = n2[0], a2 = n2[1], e2 = n2[2];
      return t2[0] = r2, t2[1] = a2, t2[2] = e2, t2[3] = Math.sqrt(Math.abs(1 - r2 * r2 - a2 * a2 - e2 * e2)), t2;
    }
    function T(t2, n2) {
      var r2 = n2[0], a2 = n2[1], e2 = n2[2], o2 = n2[3], u2 = Math.sqrt(r2 * r2 + a2 * a2 + e2 * e2), i2 = Math.exp(o2), c2 = u2 > 0 ? i2 * Math.sin(u2) / u2 : 0;
      return t2[0] = r2 * c2, t2[1] = a2 * c2, t2[2] = e2 * c2, t2[3] = i2 * Math.cos(u2), t2;
    }
    function Z(t2, n2) {
      var r2 = n2[0], a2 = n2[1], e2 = n2[2], o2 = n2[3], u2 = Math.sqrt(r2 * r2 + a2 * a2 + e2 * e2), i2 = u2 > 0 ? Math.atan2(u2, o2) / u2 : 0;
      return t2[0] = r2 * i2, t2[1] = a2 * i2, t2[2] = e2 * i2, t2[3] = 0.5 * Math.log(r2 * r2 + a2 * a2 + e2 * e2 + o2 * o2), t2;
    }
    function j(t2, n2, r2) {
      return Z(t2, n2), k(t2, t2, r2), T(t2, t2), t2;
    }
    function A(t2, n2, r2, a2) {
      var e2, o2, u2, i2, c2, l2 = n2[0], s2 = n2[1], h2 = n2[2], M2 = n2[3], v2 = r2[0], d2 = r2[1], m2 = r2[2], b2 = r2[3];
      return (o2 = l2 * v2 + s2 * d2 + h2 * m2 + M2 * b2) < 0 && (o2 = -o2, v2 = -v2, d2 = -d2, m2 = -m2, b2 = -b2), 1 - o2 > f.Ib ? (u2 = Math.sin(e2 = Math.acos(o2)), i2 = Math.sin((1 - a2) * e2) / u2, c2 = Math.sin(a2 * e2) / u2) : (i2 = 1 - a2, c2 = a2), t2[0] = i2 * l2 + c2 * v2, t2[1] = i2 * s2 + c2 * d2, t2[2] = i2 * h2 + c2 * m2, t2[3] = i2 * M2 + c2 * b2, t2;
    }
    function I(t2) {
      var n2 = f.FD(), r2 = f.FD(), a2 = f.FD(), e2 = Math.sqrt(1 - n2), o2 = Math.sqrt(n2);
      return t2[0] = e2 * Math.sin(2 * Math.PI * r2), t2[1] = e2 * Math.cos(2 * Math.PI * r2), t2[2] = o2 * Math.sin(2 * Math.PI * a2), t2[3] = o2 * Math.cos(2 * Math.PI * a2), t2;
    }
    function w(t2, n2) {
      var r2 = n2[0], a2 = n2[1], e2 = n2[2], o2 = n2[3], u2 = r2 * r2 + a2 * a2 + e2 * e2 + o2 * o2, i2 = u2 ? 1 / u2 : 0;
      return t2[0] = -r2 * i2, t2[1] = -a2 * i2, t2[2] = -e2 * i2, t2[3] = o2 * i2, t2;
    }
    function F(t2, n2) {
      return t2[0] = -n2[0], t2[1] = -n2[1], t2[2] = -n2[2], t2[3] = n2[3], t2;
    }
    function D(t2, n2) {
      var r2, a2 = n2[0] + n2[4] + n2[8];
      if (a2 > 0) r2 = Math.sqrt(a2 + 1), t2[3] = 0.5 * r2, r2 = 0.5 / r2, t2[0] = (n2[5] - n2[7]) * r2, t2[1] = (n2[6] - n2[2]) * r2, t2[2] = (n2[1] - n2[3]) * r2;
      else {
        var e2 = 0;
        n2[4] > n2[0] && (e2 = 1), n2[8] > n2[3 * e2 + e2] && (e2 = 2);
        var o2 = (e2 + 1) % 3, u2 = (e2 + 2) % 3;
        r2 = Math.sqrt(n2[3 * e2 + e2] - n2[3 * o2 + o2] - n2[3 * u2 + u2] + 1), t2[e2] = 0.5 * r2, r2 = 0.5 / r2, t2[3] = (n2[3 * o2 + u2] - n2[3 * u2 + o2]) * r2, t2[o2] = (n2[3 * o2 + e2] + n2[3 * e2 + o2]) * r2, t2[u2] = (n2[3 * u2 + e2] + n2[3 * e2 + u2]) * r2;
      }
      return t2;
    }
    function W(t2, n2, r2, a2) {
      var e2 = 0.5 * Math.PI / 180, o2 = Math.sin(n2 *= e2), u2 = Math.cos(n2), i2 = Math.sin(r2 *= e2), c2 = Math.cos(r2), f2 = Math.sin(a2 *= e2), l2 = Math.cos(a2);
      return t2[0] = o2 * c2 * l2 - u2 * i2 * f2, t2[1] = u2 * i2 * l2 + o2 * c2 * f2, t2[2] = u2 * c2 * f2 - o2 * i2 * l2, t2[3] = u2 * c2 * l2 + o2 * i2 * f2, t2;
    }
    function O(t2) {
      return "quat(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ", " + t2[3] + ")";
    }
    var E = h.clone, P = h.fromValues, S = h.copy, z = h.set, L = h.add, V = p, k = h.scale, $ = h.dot, C = h.lerp, N = h.length, Q = N, U = h.squaredLength, X = U, Y = h.normalize, B = h.exactEquals, G = h.equals, H = (a = s.create(), e = s.fromValues(1, 0, 0), o = s.fromValues(0, 1, 0), function(t2, n2, r2) {
      var u2 = s.dot(n2, r2);
      return u2 < -0.999999 ? (s.cross(a, e, n2), 1e-6 > s.len(a) && s.cross(a, o, n2), s.normalize(a, a), d(t2, a, Math.PI), t2) : u2 > 0.999999 ? (t2[0] = 0, t2[1] = 0, t2[2] = 0, t2[3] = 1, t2) : (s.cross(a, n2, r2), t2[0] = a[0], t2[1] = a[1], t2[2] = a[2], t2[3] = 1 + u2, Y(t2, t2));
    }), J = (u = M(), i = M(), function(t2, n2, r2, a2, e2, o2) {
      return A(u, n2, e2, o2), A(i, r2, a2, o2), A(t2, u, i, 2 * o2 * (1 - o2)), t2;
    }), K = (c = l.create(), function(t2, n2, r2, a2) {
      return c[0] = r2[0], c[3] = r2[1], c[6] = r2[2], c[1] = a2[0], c[4] = a2[1], c[7] = a2[2], c[2] = -n2[0], c[5] = -n2[1], c[8] = -n2[2], Y(t2, D(t2, c));
    });
  }, 8333: function(t, n, r) {
    r.r(n), r.d(n, { add: () => l, ceil: () => v, clone: () => u, copy: () => c, create: () => o, cross: () => F, dist: () => C, distance: () => q, div: () => $, divide: () => M, dot: () => w, equals: () => L, exactEquals: () => z, floor: () => d, forEach: () => X, fromValues: () => i, inverse: () => A, len: () => Q, length: () => T, lerp: () => D, max: () => b, min: () => m, mul: () => k, multiply: () => h, negate: () => j, normalize: () => I, random: () => W, round: () => p, scale: () => g, scaleAndAdd: () => y, set: () => f, sqrDist: () => N, sqrLen: () => U, squaredDistance: () => x, squaredLength: () => Z, str: () => S, sub: () => V, subtract: () => s, transformMat4: () => O, transformQuat: () => E, zero: () => P });
    var a, e = r(9685);
    function o() {
      var t2 = new e.WT(4);
      return e.WT != Float32Array && (t2[0] = 0, t2[1] = 0, t2[2] = 0, t2[3] = 0), t2;
    }
    function u(t2) {
      var n2 = new e.WT(4);
      return n2[0] = t2[0], n2[1] = t2[1], n2[2] = t2[2], n2[3] = t2[3], n2;
    }
    function i(t2, n2, r2, a2) {
      var o2 = new e.WT(4);
      return o2[0] = t2, o2[1] = n2, o2[2] = r2, o2[3] = a2, o2;
    }
    function c(t2, n2) {
      return t2[0] = n2[0], t2[1] = n2[1], t2[2] = n2[2], t2[3] = n2[3], t2;
    }
    function f(t2, n2, r2, a2, e2) {
      return t2[0] = n2, t2[1] = r2, t2[2] = a2, t2[3] = e2, t2;
    }
    function l(t2, n2, r2) {
      return t2[0] = n2[0] + r2[0], t2[1] = n2[1] + r2[1], t2[2] = n2[2] + r2[2], t2[3] = n2[3] + r2[3], t2;
    }
    function s(t2, n2, r2) {
      return t2[0] = n2[0] - r2[0], t2[1] = n2[1] - r2[1], t2[2] = n2[2] - r2[2], t2[3] = n2[3] - r2[3], t2;
    }
    function h(t2, n2, r2) {
      return t2[0] = n2[0] * r2[0], t2[1] = n2[1] * r2[1], t2[2] = n2[2] * r2[2], t2[3] = n2[3] * r2[3], t2;
    }
    function M(t2, n2, r2) {
      return t2[0] = n2[0] / r2[0], t2[1] = n2[1] / r2[1], t2[2] = n2[2] / r2[2], t2[3] = n2[3] / r2[3], t2;
    }
    function v(t2, n2) {
      return t2[0] = Math.ceil(n2[0]), t2[1] = Math.ceil(n2[1]), t2[2] = Math.ceil(n2[2]), t2[3] = Math.ceil(n2[3]), t2;
    }
    function d(t2, n2) {
      return t2[0] = Math.floor(n2[0]), t2[1] = Math.floor(n2[1]), t2[2] = Math.floor(n2[2]), t2[3] = Math.floor(n2[3]), t2;
    }
    function m(t2, n2, r2) {
      return t2[0] = Math.min(n2[0], r2[0]), t2[1] = Math.min(n2[1], r2[1]), t2[2] = Math.min(n2[2], r2[2]), t2[3] = Math.min(n2[3], r2[3]), t2;
    }
    function b(t2, n2, r2) {
      return t2[0] = Math.max(n2[0], r2[0]), t2[1] = Math.max(n2[1], r2[1]), t2[2] = Math.max(n2[2], r2[2]), t2[3] = Math.max(n2[3], r2[3]), t2;
    }
    function p(t2, n2) {
      return t2[0] = Math.round(n2[0]), t2[1] = Math.round(n2[1]), t2[2] = Math.round(n2[2]), t2[3] = Math.round(n2[3]), t2;
    }
    function g(t2, n2, r2) {
      return t2[0] = n2[0] * r2, t2[1] = n2[1] * r2, t2[2] = n2[2] * r2, t2[3] = n2[3] * r2, t2;
    }
    function y(t2, n2, r2, a2) {
      return t2[0] = n2[0] + r2[0] * a2, t2[1] = n2[1] + r2[1] * a2, t2[2] = n2[2] + r2[2] * a2, t2[3] = n2[3] + r2[3] * a2, t2;
    }
    function q(t2, n2) {
      return Math.hypot(n2[0] - t2[0], n2[1] - t2[1], n2[2] - t2[2], n2[3] - t2[3]);
    }
    function x(t2, n2) {
      var r2 = n2[0] - t2[0], a2 = n2[1] - t2[1], e2 = n2[2] - t2[2], o2 = n2[3] - t2[3];
      return r2 * r2 + a2 * a2 + e2 * e2 + o2 * o2;
    }
    function T(t2) {
      return Math.hypot(t2[0], t2[1], t2[2], t2[3]);
    }
    function Z(t2) {
      var n2 = t2[0], r2 = t2[1], a2 = t2[2], e2 = t2[3];
      return n2 * n2 + r2 * r2 + a2 * a2 + e2 * e2;
    }
    function j(t2, n2) {
      return t2[0] = -n2[0], t2[1] = -n2[1], t2[2] = -n2[2], t2[3] = -n2[3], t2;
    }
    function A(t2, n2) {
      return t2[0] = 1 / n2[0], t2[1] = 1 / n2[1], t2[2] = 1 / n2[2], t2[3] = 1 / n2[3], t2;
    }
    function I(t2, n2) {
      var r2 = n2[0], a2 = n2[1], e2 = n2[2], o2 = n2[3], u2 = r2 * r2 + a2 * a2 + e2 * e2 + o2 * o2;
      return u2 > 0 && (u2 = 1 / Math.sqrt(u2)), t2[0] = r2 * u2, t2[1] = a2 * u2, t2[2] = e2 * u2, t2[3] = o2 * u2, t2;
    }
    function w(t2, n2) {
      return t2[0] * n2[0] + t2[1] * n2[1] + t2[2] * n2[2] + t2[3] * n2[3];
    }
    function F(t2, n2, r2, a2) {
      var e2 = r2[0] * a2[1] - r2[1] * a2[0], o2 = r2[0] * a2[2] - r2[2] * a2[0], u2 = r2[0] * a2[3] - r2[3] * a2[0], i2 = r2[1] * a2[2] - r2[2] * a2[1], c2 = r2[1] * a2[3] - r2[3] * a2[1], f2 = r2[2] * a2[3] - r2[3] * a2[2], l2 = n2[0], s2 = n2[1], h2 = n2[2], M2 = n2[3];
      return t2[0] = s2 * f2 - h2 * c2 + M2 * i2, t2[1] = -(l2 * f2) + h2 * u2 - M2 * o2, t2[2] = l2 * c2 - s2 * u2 + M2 * e2, t2[3] = -(l2 * i2) + s2 * o2 - h2 * e2, t2;
    }
    function D(t2, n2, r2, a2) {
      var e2 = n2[0], o2 = n2[1], u2 = n2[2], i2 = n2[3];
      return t2[0] = e2 + a2 * (r2[0] - e2), t2[1] = o2 + a2 * (r2[1] - o2), t2[2] = u2 + a2 * (r2[2] - u2), t2[3] = i2 + a2 * (r2[3] - i2), t2;
    }
    function W(t2, n2) {
      n2 = n2 || 1;
      do
        i2 = (r2 = 2 * e.FD() - 1) * r2 + (a2 = 2 * e.FD() - 1) * a2;
      while (i2 >= 1);
      do
        c2 = (o2 = 2 * e.FD() - 1) * o2 + (u2 = 2 * e.FD() - 1) * u2;
      while (c2 >= 1);
      var r2, a2, o2, u2, i2, c2, f2 = Math.sqrt((1 - i2) / c2);
      return t2[0] = n2 * r2, t2[1] = n2 * a2, t2[2] = n2 * o2 * f2, t2[3] = n2 * u2 * f2, t2;
    }
    function O(t2, n2, r2) {
      var a2 = n2[0], e2 = n2[1], o2 = n2[2], u2 = n2[3];
      return t2[0] = r2[0] * a2 + r2[4] * e2 + r2[8] * o2 + r2[12] * u2, t2[1] = r2[1] * a2 + r2[5] * e2 + r2[9] * o2 + r2[13] * u2, t2[2] = r2[2] * a2 + r2[6] * e2 + r2[10] * o2 + r2[14] * u2, t2[3] = r2[3] * a2 + r2[7] * e2 + r2[11] * o2 + r2[15] * u2, t2;
    }
    function E(t2, n2, r2) {
      var a2 = n2[0], e2 = n2[1], o2 = n2[2], u2 = r2[0], i2 = r2[1], c2 = r2[2], f2 = r2[3], l2 = f2 * a2 + i2 * o2 - c2 * e2, s2 = f2 * e2 + c2 * a2 - u2 * o2, h2 = f2 * o2 + u2 * e2 - i2 * a2, M2 = -u2 * a2 - i2 * e2 - c2 * o2;
      return t2[0] = l2 * f2 + -(M2 * u2) + -(s2 * c2) - -(h2 * i2), t2[1] = s2 * f2 + -(M2 * i2) + -(h2 * u2) - -(l2 * c2), t2[2] = h2 * f2 + -(M2 * c2) + -(l2 * i2) - -(s2 * u2), t2[3] = n2[3], t2;
    }
    function P(t2) {
      return t2[0] = 0, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2;
    }
    function S(t2) {
      return "vec4(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ", " + t2[3] + ")";
    }
    function z(t2, n2) {
      return t2[0] === n2[0] && t2[1] === n2[1] && t2[2] === n2[2] && t2[3] === n2[3];
    }
    function L(t2, n2) {
      var r2 = t2[0], a2 = t2[1], o2 = t2[2], u2 = t2[3], i2 = n2[0], c2 = n2[1], f2 = n2[2], l2 = n2[3];
      return Math.abs(r2 - i2) <= e.Ib * Math.max(1, Math.abs(r2), Math.abs(i2)) && Math.abs(a2 - c2) <= e.Ib * Math.max(1, Math.abs(a2), Math.abs(c2)) && Math.abs(o2 - f2) <= e.Ib * Math.max(1, Math.abs(o2), Math.abs(f2)) && Math.abs(u2 - l2) <= e.Ib * Math.max(1, Math.abs(u2), Math.abs(l2));
    }
    var V = s, k = h, $ = M, C = q, N = x, Q = T, U = Z, X = (a = o(), function(t2, n2, r2, e2, o2, u2) {
      var i2, c2;
      for (n2 || (n2 = 4), r2 || (r2 = 0), c2 = e2 ? Math.min(e2 * n2 + r2, t2.length) : t2.length, i2 = r2; i2 < c2; i2 += n2) a[0] = t2[i2], a[1] = t2[i2 + 1], a[2] = t2[i2 + 2], a[3] = t2[i2 + 3], o2(a, a, u2), t2[i2] = a[0], t2[i2 + 1] = a[1], t2[i2 + 2] = a[2], t2[i2 + 3] = a[3];
      return t2;
    });
  }, 3958: function(t, n, r) {
    r.d(n, { Z: () => a });
    let a = r(2415).Z.Symbol;
  }, 2415: function(t, n, r) {
    r.d(n, { Z: () => o });
    var a = "object" == typeof global && global && global.Object === Object && global, e = "object" == typeof self && self && self.Object === Object && self;
    let o = a || e || Function("return this")();
  }, 2902: function(t, n, r) {
    r.d(n, { Z: () => p });
    var a = r(8641), e = r(2415);
    let o = function() {
      return e.Z.Date.now();
    };
    var u = /\s/;
    let i = function(t2) {
      for (var n2 = t2.length; n2-- && u.test(t2.charAt(n2)); ) ;
      return n2;
    };
    var c = /^\s+/, f = r(9567), l = 0 / 0, s = /^[-+]0x[0-9a-f]+$/i, h = /^0b[01]+$/i, M = /^0o[0-7]+$/i, v = parseInt;
    let d = function(t2) {
      if ("number" == typeof t2) return t2;
      if ((0, f.Z)(t2)) return l;
      if ((0, a.Z)(t2)) {
        var n2, r2 = "function" == typeof t2.valueOf ? t2.valueOf() : t2;
        t2 = (0, a.Z)(r2) ? r2 + "" : r2;
      }
      if ("string" != typeof t2) return 0 === t2 ? t2 : +t2;
      t2 = (n2 = t2) ? n2.slice(0, i(n2) + 1).replace(c, "") : n2;
      var e2 = h.test(t2);
      return e2 || M.test(t2) ? v(t2.slice(2), e2 ? 2 : 8) : s.test(t2) ? l : +t2;
    };
    var m = Math.max, b = Math.min;
    let p = function(t2, n2, r2) {
      var e2, u2, i2, c2, f2, l2, s2 = 0, h2 = false, M2 = false, v2 = true;
      if ("function" != typeof t2) throw TypeError("Expected a function");
      function p2(n3) {
        var r3 = e2, a2 = u2;
        return e2 = u2 = void 0, s2 = n3, c2 = t2.apply(a2, r3);
      }
      function g(t3) {
        var r3 = t3 - l2, a2 = t3 - s2;
        return void 0 === l2 || r3 >= n2 || r3 < 0 || M2 && a2 >= i2;
      }
      function y() {
        var t3, r3, a2, e3 = o();
        if (g(e3)) return q(e3);
        f2 = setTimeout(y, (t3 = e3 - l2, r3 = e3 - s2, a2 = n2 - t3, M2 ? b(a2, i2 - r3) : a2));
      }
      function q(t3) {
        return (f2 = void 0, v2 && e2) ? p2(t3) : (e2 = u2 = void 0, c2);
      }
      function x() {
        var t3, r3 = o(), a2 = g(r3);
        if (e2 = arguments, u2 = this, l2 = r3, a2) {
          if (void 0 === f2) return s2 = t3 = l2, f2 = setTimeout(y, n2), h2 ? p2(t3) : c2;
          if (M2) return clearTimeout(f2), f2 = setTimeout(y, n2), p2(l2);
        }
        return void 0 === f2 && (f2 = setTimeout(y, n2)), c2;
      }
      return n2 = d(n2) || 0, (0, a.Z)(r2) && (h2 = !!r2.leading, i2 = (M2 = "maxWait" in r2) ? m(d(r2.maxWait) || 0, n2) : i2, v2 = "trailing" in r2 ? !!r2.trailing : v2), x.cancel = function() {
        void 0 !== f2 && clearTimeout(f2), s2 = 0, e2 = l2 = u2 = f2 = void 0;
      }, x.flush = function() {
        return void 0 === f2 ? c2 : q(o());
      }, x;
    };
  }, 8641: function(t, n, r) {
    r.d(n, { Z: () => a });
    let a = function(t2) {
      var n2 = typeof t2;
      return null != t2 && ("object" == n2 || "function" == n2);
    };
  }, 9567: function(t, n, r) {
    r.d(n, { Z: () => h });
    var a = r(3958), e = Object.prototype, o = e.hasOwnProperty, u = e.toString, i = a.Z ? a.Z.toStringTag : void 0;
    let c = function(t2) {
      var n2 = o.call(t2, i), r2 = t2[i];
      try {
        t2[i] = void 0;
        var a2 = true;
      } catch (t3) {
      }
      var e2 = u.call(t2);
      return a2 && (n2 ? t2[i] = r2 : delete t2[i]), e2;
    };
    var f = Object.prototype.toString, l = a.Z ? a.Z.toStringTag : void 0;
    let s = function(t2) {
      return null == t2 ? void 0 === t2 ? "[object Undefined]" : "[object Null]" : l && l in Object(t2) ? c(t2) : f.call(t2);
    }, h = function(t2) {
      return "symbol" == typeof t2 || null != t2 && "object" == typeof t2 && "[object Symbol]" == s(t2);
    };
  }, 8709: function(t, n, r) {
    r.d(n, { Z: () => o });
    var a = r(2902), e = r(8641);
    let o = function(t2, n2, r2) {
      var o2 = true, u = true;
      if ("function" != typeof t2) throw TypeError("Expected a function");
      return (0, e.Z)(r2) && (o2 = "leading" in r2 ? !!r2.leading : o2, u = "trailing" in r2 ? !!r2.trailing : u), (0, a.Z)(t2, n2, { leading: o2, maxWait: n2, trailing: u });
    };
  } }]);
})();
