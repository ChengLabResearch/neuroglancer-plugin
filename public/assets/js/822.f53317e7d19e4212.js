"use strict";
(() => {
  (globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || []).push([["822"], { 2679: function(t, n, r) {
    r(3882);
    var e = r(3233);
    t.exports = e.f("asyncDispose");
  }, 549: function(t, n, r) {
    r(4071);
    var e = r(3233);
    t.exports = e.f("dispose");
  }, 5085: function(t, n, r) {
    var e = r(9821), o = r(4263), i = TypeError;
    t.exports = function(t2) {
      if (e(t2)) return t2;
      throw new i(o(t2) + " is not a function");
    };
  }, 6539: function(t, n, r) {
    var e = r(6840), o = String, i = TypeError;
    t.exports = function(t2) {
      if (e(t2)) return t2;
      throw new i(o(t2) + " is not an object");
    };
  }, 2185: function(t, n, r) {
    var e = r(2814), o = e({}.toString), i = e("".slice);
    t.exports = function(t2) {
      return i(o(t2), 8, -1);
    };
  }, 8590: function(t) {
    t.exports = function(t2, n) {
      return { enumerable: !(1 & t2), configurable: !(2 & t2), writable: !(4 & t2), value: n };
    };
  }, 8711: function(t, n, r) {
    var e = r(456), o = Object.defineProperty;
    t.exports = function(t2, n2) {
      try {
        o(e, t2, { value: n2, configurable: true, writable: true });
      } catch (r2) {
        e[t2] = n2;
      }
      return n2;
    };
  }, 1360: function(t, n, r) {
    var e = r(1455);
    t.exports = !e(function() {
      return 7 !== Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1];
    });
  }, 3837: function(t, n, r) {
    var e = r(456), o = r(6840), i = e.document, u = o(i) && o(i.createElement);
    t.exports = function(t2) {
      return u ? i.createElement(t2) : {};
    };
  }, 7579: function(t, n, r) {
    var e = r(456).navigator, o = e && e.userAgent;
    t.exports = o ? String(o) : "";
  }, 1033: function(t, n, r) {
    var e, o, i = r(456), u = r(7579), c = i.process, f = i.Deno, a = c && c.versions || f && f.version, s = a && a.v8;
    s && (o = (e = s.split("."))[0] > 0 && e[0] < 4 ? 1 : +(e[0] + e[1])), !o && u && (!(e = u.match(/Edge\/(\d+)/)) || e[1] >= 74) && (e = u.match(/Chrome\/(\d+)/)) && (o = +e[1]), t.exports = o;
  }, 1455: function(t) {
    t.exports = function(t2) {
      try {
        return !!t2();
      } catch (t3) {
        return true;
      }
    };
  }, 5707: function(t, n, r) {
    var e = r(1455);
    t.exports = !e(function() {
      var t2 = function() {
      }.bind();
      return "function" != typeof t2 || t2.hasOwnProperty("prototype");
    });
  }, 7494: function(t, n, r) {
    var e = r(5707), o = Function.prototype.call;
    t.exports = e ? o.bind(o) : function() {
      return o.apply(o, arguments);
    };
  }, 2814: function(t, n, r) {
    var e = r(5707), o = Function.prototype, i = o.call, u = e && o.bind.bind(i, i);
    t.exports = e ? u : function(t2) {
      return function() {
        return i.apply(t2, arguments);
      };
    };
  }, 6451: function(t, n, r) {
    var e = r(456), o = r(9821);
    t.exports = function(t2, n2) {
      var r2;
      return arguments.length < 2 ? o(r2 = e[t2]) ? r2 : void 0 : e[t2] && e[t2][n2];
    };
  }, 6780: function(t, n, r) {
    var e = r(5085), o = r(9700);
    t.exports = function(t2, n2) {
      var r2 = t2[n2];
      return o(r2) ? void 0 : e(r2);
    };
  }, 456: function(t, n, r) {
    var e = function(t2) {
      return t2 && t2.Math === Math && t2;
    };
    t.exports = e("object" == typeof globalThis && globalThis) || e("object" == typeof window && window) || e("object" == typeof self && self) || e("object" == typeof r.g && r.g) || e("object" == typeof this && this) || /* @__PURE__ */ function() {
      return this;
    }() || Function("return this")();
  }, 5848: function(t, n, r) {
    var e = r(2814), o = r(7670), i = e({}.hasOwnProperty);
    t.exports = Object.hasOwn || function(t2, n2) {
      return i(o(t2), n2);
    };
  }, 8980: function(t, n, r) {
    var e = r(1360), o = r(1455), i = r(3837);
    t.exports = !e && !o(function() {
      return 7 !== Object.defineProperty(i("div"), "a", { get: function() {
        return 7;
      } }).a;
    });
  }, 4677: function(t, n, r) {
    var e = r(2814), o = r(1455), i = r(2185), u = Object, c = e("".split);
    t.exports = o(function() {
      return !u("z").propertyIsEnumerable(0);
    }) ? function(t2) {
      return "String" === i(t2) ? c(t2, "") : u(t2);
    } : u;
  }, 9821: function(t) {
    var n = "object" == typeof document && document.all;
    t.exports = void 0 === n && void 0 !== n ? function(t2) {
      return "function" == typeof t2 || t2 === n;
    } : function(t2) {
      return "function" == typeof t2;
    };
  }, 9700: function(t) {
    t.exports = function(t2) {
      return null == t2;
    };
  }, 6840: function(t, n, r) {
    var e = r(9821);
    t.exports = function(t2) {
      return "object" == typeof t2 ? null !== t2 : e(t2);
    };
  }, 3294: function(t) {
    t.exports = false;
  }, 3139: function(t, n, r) {
    var e = r(6451), o = r(9821), i = r(6711), u = r(6254), c = Object;
    t.exports = u ? function(t2) {
      return "symbol" == typeof t2;
    } : function(t2) {
      var n2 = e("Symbol");
      return o(n2) && i(n2.prototype, c(t2));
    };
  }, 8235: function(t, n, r) {
    var e = r(1360), o = r(8980), i = r(7174), u = r(6539), c = r(1051), f = TypeError, a = Object.defineProperty, s = Object.getOwnPropertyDescriptor, p = "enumerable", l = "configurable", v = "writable";
    n.f = e ? i ? function(t2, n2, r2) {
      if (u(t2), n2 = c(n2), u(r2), "function" == typeof t2 && "prototype" === n2 && "value" in r2 && v in r2 && !r2[v]) {
        var e2 = s(t2, n2);
        e2 && e2[v] && (t2[n2] = r2.value, r2 = { configurable: l in r2 ? r2[l] : e2[l], enumerable: p in r2 ? r2[p] : e2[p], writable: false });
      }
      return a(t2, n2, r2);
    } : a : function(t2, n2, r2) {
      if (u(t2), n2 = c(n2), u(r2), o) try {
        return a(t2, n2, r2);
      } catch (t3) {
      }
      if ("get" in r2 || "set" in r2) throw new f("Accessors not supported");
      return "value" in r2 && (t2[n2] = r2.value), t2;
    };
  }, 3895: function(t, n, r) {
    var e = r(1360), o = r(7494), i = r(322), u = r(8590), c = r(621), f = r(1051), a = r(5848), s = r(8980), p = Object.getOwnPropertyDescriptor;
    n.f = e ? p : function(t2, n2) {
      if (t2 = c(t2), n2 = f(n2), s) try {
        return p(t2, n2);
      } catch (t3) {
      }
      if (a(t2, n2)) return u(!o(i.f, t2, n2), t2[n2]);
    };
  }, 6711: function(t, n, r) {
    var e = r(2814);
    t.exports = e({}.isPrototypeOf);
  }, 322: function(t, n) {
    var r = {}.propertyIsEnumerable, e = Object.getOwnPropertyDescriptor, o = e && !r.call({ 1: 2 }, 1);
    n.f = o ? function(t2) {
      var n2 = e(this, t2);
      return !!n2 && n2.enumerable;
    } : r;
  }, 626: function(t, n, r) {
    var e = r(7494), o = r(9821), i = r(6840), u = TypeError;
    t.exports = function(t2, n2) {
      var r2, c;
      if ("string" === n2 && o(r2 = t2.toString) && !i(c = e(r2, t2)) || o(r2 = t2.valueOf) && !i(c = e(r2, t2)) || "string" !== n2 && o(r2 = t2.toString) && !i(c = e(r2, t2))) return c;
      throw new u("Can't convert object to primitive value");
    };
  }, 1728: function(t, n, r) {
    var e = r(456);
    t.exports = e;
  }, 6124: function(t, n, r) {
    var e = r(9700), o = TypeError;
    t.exports = function(t2) {
      if (e(t2)) throw new o("Can't call method on " + t2);
      return t2;
    };
  }, 2223: function(t, n, r) {
    var e = r(3294), o = r(456), i = r(8711), u = "__core-js_shared__", c = t.exports = o[u] || i(u, {});
    (c.versions || (c.versions = [])).push({ version: "3.40.0", mode: e ? "pure" : "global", copyright: "\xA9 2014-2025 Denis Pushkarev (zloirock.ru)", license: "https://github.com/zloirock/core-js/blob/v3.40.0/LICENSE", source: "https://github.com/zloirock/core-js" });
  }, 9263: function(t, n, r) {
    var e = r(2223);
    t.exports = function(t2, n2) {
      return e[t2] || (e[t2] = n2 || {});
    };
  }, 5946: function(t, n, r) {
    var e = r(1033), o = r(1455), i = r(456).String;
    t.exports = !!Object.getOwnPropertySymbols && !o(function() {
      var t2 = Symbol("symbol detection");
      return !i(t2) || !(Object(t2) instanceof Symbol) || !Symbol.sham && e && e < 41;
    });
  }, 621: function(t, n, r) {
    var e = r(4677), o = r(6124);
    t.exports = function(t2) {
      return e(o(t2));
    };
  }, 7670: function(t, n, r) {
    var e = r(6124), o = Object;
    t.exports = function(t2) {
      return o(e(t2));
    };
  }, 7967: function(t, n, r) {
    var e = r(7494), o = r(6840), i = r(3139), u = r(6780), c = r(626), f = r(8583), a = TypeError, s = f("toPrimitive");
    t.exports = function(t2, n2) {
      if (!o(t2) || i(t2)) return t2;
      var r2, f2 = u(t2, s);
      if (f2) {
        if (void 0 === n2 && (n2 = "default"), !o(r2 = e(f2, t2, n2)) || i(r2)) return r2;
        throw new a("Can't convert object to primitive value");
      }
      return void 0 === n2 && (n2 = "number"), c(t2, n2);
    };
  }, 1051: function(t, n, r) {
    var e = r(7967), o = r(3139);
    t.exports = function(t2) {
      var n2 = e(t2, "string");
      return o(n2) ? n2 : n2 + "";
    };
  }, 4263: function(t) {
    var n = String;
    t.exports = function(t2) {
      try {
        return n(t2);
      } catch (t3) {
        return "Object";
      }
    };
  }, 8508: function(t, n, r) {
    var e = r(2814), o = 0, i = Math.random(), u = e(1 .toString);
    t.exports = function(t2) {
      return "Symbol(" + (void 0 === t2 ? "" : t2) + ")_" + u(++o + i, 36);
    };
  }, 6254: function(t, n, r) {
    var e = r(5946);
    t.exports = e && !Symbol.sham && "symbol" == typeof Symbol.iterator;
  }, 7174: function(t, n, r) {
    var e = r(1360), o = r(1455);
    t.exports = e && o(function() {
      return 42 !== Object.defineProperty(function() {
      }, "prototype", { value: 42, writable: false }).prototype;
    });
  }, 9478: function(t, n, r) {
    var e = r(1728), o = r(5848), i = r(3233), u = r(8235).f;
    t.exports = function(t2) {
      var n2 = e.Symbol || (e.Symbol = {});
      o(n2, t2) || u(n2, t2, { value: i.f(t2) });
    };
  }, 3233: function(t, n, r) {
    var e = r(8583);
    n.f = e;
  }, 8583: function(t, n, r) {
    var e = r(456), o = r(9263), i = r(5848), u = r(8508), c = r(5946), f = r(6254), a = e.Symbol, s = o("wks"), p = f ? a.for || a : a && a.withoutSetter || u;
    t.exports = function(t2) {
      return i(s, t2) || (s[t2] = c && i(a, t2) ? a[t2] : p("Symbol." + t2)), s[t2];
    };
  }, 3882: function(t, n, r) {
    var e = r(456), o = r(9478), i = r(8235).f, u = r(3895).f, c = e.Symbol;
    if (o("asyncDispose"), c) {
      var f = u(c, "asyncDispose");
      f.enumerable && f.configurable && f.writable && i(c, "asyncDispose", { value: f.value, enumerable: false, configurable: false, writable: false });
    }
  }, 4071: function(t, n, r) {
    var e = r(456), o = r(9478), i = r(8235).f, u = r(3895).f, c = e.Symbol;
    if (o("dispose"), c) {
      var f = u(c, "dispose");
      f.enumerable && f.configurable && f.writable && i(c, "dispose", { value: f.value, enumerable: false, configurable: false, writable: false });
    }
  } }]);
})();
