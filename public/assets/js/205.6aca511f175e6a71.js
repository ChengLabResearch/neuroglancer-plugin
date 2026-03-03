(() => {
  (globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || []).push([["205"], { 5688: function(t, e, r) {
    !function(t2) {
      "use strict";
      function e2(e3) {
        return function(r2, n) {
          for (var i = n.line, o = r2.getLine(i), a = [], l = 0; l < e3.length; l++) {
            var s = function(e4) {
              for (var a2, l2 = n.ch, s2 = 0; ; ) {
                var u2 = l2 <= 0 ? -1 : o.lastIndexOf(e4[0], l2 - 1);
                if (-1 == u2) {
                  if (1 == s2) break;
                  s2 = 1, l2 = o.length;
                  continue;
                }
                if (1 == s2 && u2 < n.ch) break;
                if (a2 = r2.getTokenTypeAt(t2.Pos(i, u2 + 1)), !/^(comment|string)/.test(a2)) return { ch: u2 + 1, tokenType: a2, pair: e4 };
                l2 = u2 - 1;
              }
            }(e3[l]);
            s && a.push(s);
          }
          a.sort(function(t3, e4) {
            return t3.ch - e4.ch;
          });
          for (var l = 0; l < a.length; l++) {
            var u = function(e4) {
              var n2, o2, a2 = 1, l2 = r2.lastLine(), s2 = e4.ch;
              t: for (var u2 = i; u2 <= l2; ++u2) for (var c = r2.getLine(u2), f = u2 == i ? s2 : 0; ; ) {
                var h = c.indexOf(e4.pair[0], f), d = c.indexOf(e4.pair[1], f);
                if (h < 0 && (h = c.length), d < 0 && (d = c.length), (f = Math.min(h, d)) == c.length) break;
                if (r2.getTokenTypeAt(t2.Pos(u2, f + 1)) == e4.tokenType) {
                  if (f == h) ++a2;
                  else if (!--a2) {
                    n2 = u2, o2 = f;
                    break t;
                  }
                }
                ++f;
              }
              return null == n2 || i == n2 ? null : { from: t2.Pos(i, s2), to: t2.Pos(n2, o2) };
            }(a[l]);
            if (u) return u;
          }
          return null;
        };
      }
      t2.registerHelper("fold", "brace", e2([["{", "}"], ["[", "]"]])), t2.registerHelper("fold", "brace-paren", e2([["{", "}"], ["[", "]"], ["(", ")"]])), t2.registerHelper("fold", "import", function(e3, r2) {
        function n(r3) {
          if (r3 < e3.firstLine() || r3 > e3.lastLine()) return null;
          var n2 = e3.getTokenAt(t2.Pos(r3, 1));
          if (/\S/.test(n2.string) || (n2 = e3.getTokenAt(t2.Pos(r3, n2.end + 1))), "keyword" != n2.type || "import" != n2.string) return null;
          for (var i2 = r3, o2 = Math.min(e3.lastLine(), r3 + 10); i2 <= o2; ++i2) {
            var a2 = e3.getLine(i2).indexOf(";");
            if (-1 != a2) return { startCh: n2.end, end: t2.Pos(i2, a2) };
          }
        }
        var i, o = r2.line, a = n(o);
        if (!a || n(o - 1) || (i = n(o - 2)) && i.end.line == o - 1) return null;
        for (var l = a.end; ; ) {
          var s = n(l.line + 1);
          if (null == s) break;
          l = s.end;
        }
        return { from: e3.clipPos(t2.Pos(o, a.startCh + 1)), to: l };
      }), t2.registerHelper("fold", "include", function(e3, r2) {
        function n(r3) {
          if (r3 < e3.firstLine() || r3 > e3.lastLine()) return null;
          var n2 = e3.getTokenAt(t2.Pos(r3, 1));
          if (/\S/.test(n2.string) || (n2 = e3.getTokenAt(t2.Pos(r3, n2.end + 1))), "meta" == n2.type && "#include" == n2.string.slice(0, 8)) return n2.start + 8;
        }
        var i = r2.line, o = n(i);
        if (null == o || null != n(i - 1)) return null;
        for (var a = i; null != n(a + 1); ) ++a;
        return { from: t2.Pos(i, o + 1), to: e3.clipPos(t2.Pos(a)) };
      });
    }(r(4631));
  }, 8657: function(t, e, r) {
    !function(t2) {
      "use strict";
      function e2(e3, r3, i, o) {
        if (i && i.call) {
          var a = i;
          i = null;
        } else var a = n(e3, i, "rangeFinder");
        "number" == typeof r3 && (r3 = t2.Pos(r3, 0));
        var l = n(e3, i, "minFoldSize");
        function s(t3) {
          var n2 = a(e3, r3);
          if (!n2 || n2.to.line - n2.from.line < l) return null;
          if ("fold" === o) return n2;
          for (var i2 = e3.findMarksAt(n2.from), s2 = 0; s2 < i2.length; ++s2) if (i2[s2].__isFold) {
            if (!t3) return null;
            n2.cleared = true, i2[s2].clear();
          }
          return n2;
        }
        var u = s(true);
        if (n(e3, i, "scanUp")) for (; !u && r3.line > e3.firstLine(); ) r3 = t2.Pos(r3.line - 1, 0), u = s(false);
        if (u && !u.cleared && "unfold" !== o) {
          var c = function(t3, e4, r4) {
            var i2 = n(t3, e4, "widget");
            if ("function" == typeof i2 && (i2 = i2(r4.from, r4.to)), "string" == typeof i2) {
              var o2 = document.createTextNode(i2);
              (i2 = document.createElement("span")).appendChild(o2), i2.className = "CodeMirror-foldmarker";
            } else i2 && (i2 = i2.cloneNode(true));
            return i2;
          }(e3, i, u);
          t2.on(c, "mousedown", function(e4) {
            f.clear(), t2.e_preventDefault(e4);
          });
          var f = e3.markText(u.from, u.to, { replacedWith: c, clearOnEnter: n(e3, i, "clearOnEnter"), __isFold: true });
          f.on("clear", function(r4, n2) {
            t2.signal(e3, "unfold", e3, r4, n2);
          }), t2.signal(e3, "fold", e3, u.from, u.to);
        }
      }
      t2.newFoldFunction = function(t3, r3) {
        return function(n2, i) {
          e2(n2, i, { rangeFinder: t3, widget: r3 });
        };
      }, t2.defineExtension("foldCode", function(t3, r3, n2) {
        e2(this, t3, r3, n2);
      }), t2.defineExtension("isFolded", function(t3) {
        for (var e3 = this.findMarksAt(t3), r3 = 0; r3 < e3.length; ++r3) if (e3[r3].__isFold) return true;
      }), t2.commands.toggleFold = function(t3) {
        t3.foldCode(t3.getCursor());
      }, t2.commands.fold = function(t3) {
        t3.foldCode(t3.getCursor(), null, "fold");
      }, t2.commands.unfold = function(t3) {
        t3.foldCode(t3.getCursor(), { scanUp: false }, "unfold");
      }, t2.commands.foldAll = function(e3) {
        e3.operation(function() {
          for (var r3 = e3.firstLine(), n2 = e3.lastLine(); r3 <= n2; r3++) e3.foldCode(t2.Pos(r3, 0), { scanUp: false }, "fold");
        });
      }, t2.commands.unfoldAll = function(e3) {
        e3.operation(function() {
          for (var r3 = e3.firstLine(), n2 = e3.lastLine(); r3 <= n2; r3++) e3.foldCode(t2.Pos(r3, 0), { scanUp: false }, "unfold");
        });
      }, t2.registerHelper("fold", "combine", function() {
        var t3 = Array.prototype.slice.call(arguments, 0);
        return function(e3, r3) {
          for (var n2 = 0; n2 < t3.length; ++n2) {
            var i = t3[n2](e3, r3);
            if (i) return i;
          }
        };
      }), t2.registerHelper("fold", "auto", function(t3, e3) {
        for (var r3 = t3.getHelpers(e3, "fold"), n2 = 0; n2 < r3.length; n2++) {
          var i = r3[n2](t3, e3);
          if (i) return i;
        }
      });
      var r2 = { rangeFinder: t2.fold.auto, widget: "\u2194", minFoldSize: 0, scanUp: false, clearOnEnter: true };
      function n(t3, e3, n2) {
        if (e3 && void 0 !== e3[n2]) return e3[n2];
        var i = t3.options.foldOptions;
        return i && void 0 !== i[n2] ? i[n2] : r2[n2];
      }
      t2.defineOption("foldOptions", null), t2.defineExtension("foldOption", function(t3, e3) {
        return n(this, t3, e3);
      });
    }(r(4631));
  }, 3195: function(t, e, r) {
    !function(t2) {
      "use strict";
      t2.defineOption("foldGutter", false, function(e3, n2, i2) {
        var o2;
        i2 && i2 != t2.Init && (e3.clearGutter(e3.state.foldGutter.options.gutter), e3.state.foldGutter = null, e3.off("gutterClick", s), e3.off("changes", c), e3.off("viewportChange", f), e3.off("fold", h), e3.off("unfold", h), e3.off("swapDoc", c), e3.off("optionChange", u)), n2 && (e3.state.foldGutter = new r2((true === (o2 = n2) && (o2 = {}), null == o2.gutter && (o2.gutter = "CodeMirror-foldgutter"), null == o2.indicatorOpen && (o2.indicatorOpen = "CodeMirror-foldgutter-open"), null == o2.indicatorFolded && (o2.indicatorFolded = "CodeMirror-foldgutter-folded"), o2)), l(e3), e3.on("gutterClick", s), e3.on("changes", c), e3.on("viewportChange", f), e3.on("fold", h), e3.on("unfold", h), e3.on("swapDoc", c), e3.on("optionChange", u));
      });
      var e2 = t2.Pos;
      function r2(t3) {
        this.options = t3, this.from = this.to = 0;
      }
      function n(t3, r3) {
        for (var n2 = t3.findMarks(e2(r3, 0), e2(r3 + 1, 0)), i2 = 0; i2 < n2.length; ++i2) if (n2[i2].__isFold) {
          var o2 = n2[i2].find(-1);
          if (o2 && o2.line === r3) return n2[i2];
        }
      }
      function i(t3) {
        if ("string" != typeof t3) return t3.cloneNode(true);
        var e3 = document.createElement("div");
        return e3.className = t3 + " CodeMirror-guttermarker-subtle", e3;
      }
      function o(t3, r3, o2) {
        var l2 = t3.state.foldGutter.options, s2 = r3 - 1, u2 = t3.foldOption(l2, "minFoldSize"), c2 = t3.foldOption(l2, "rangeFinder"), f2 = "string" == typeof l2.indicatorFolded && a(l2.indicatorFolded), h2 = "string" == typeof l2.indicatorOpen && a(l2.indicatorOpen);
        t3.eachLine(r3, o2, function(r4) {
          ++s2;
          var o3 = null, a2 = r4.gutterMarkers;
          if (a2 && (a2 = a2[l2.gutter]), n(t3, s2)) {
            if (f2 && a2 && f2.test(a2.className)) return;
            o3 = i(l2.indicatorFolded);
          } else {
            var d = e2(s2, 0), p = c2 && c2(t3, d);
            if (p && p.to.line - p.from.line >= u2) {
              if (h2 && a2 && h2.test(a2.className)) return;
              o3 = i(l2.indicatorOpen);
            }
          }
          (o3 || a2) && t3.setGutterMarker(r4, l2.gutter, o3);
        });
      }
      function a(t3) {
        return RegExp("(^|\\s)" + t3 + "(?:$|\\s)\\s*");
      }
      function l(t3) {
        var e3 = t3.getViewport(), r3 = t3.state.foldGutter;
        r3 && (t3.operation(function() {
          o(t3, e3.from, e3.to);
        }), r3.from = e3.from, r3.to = e3.to);
      }
      function s(t3, r3, i2) {
        var o2 = t3.state.foldGutter;
        if (o2) {
          var a2 = o2.options;
          if (i2 == a2.gutter) {
            var l2 = n(t3, r3);
            l2 ? l2.clear() : t3.foldCode(e2(r3, 0), a2);
          }
        }
      }
      function u(t3, e3) {
        "mode" == e3 && c(t3);
      }
      function c(t3) {
        var e3 = t3.state.foldGutter;
        if (e3) {
          var r3 = e3.options;
          e3.from = e3.to = 0, clearTimeout(e3.changeUpdate), e3.changeUpdate = setTimeout(function() {
            l(t3);
          }, r3.foldOnChangeTimeSpan || 600);
        }
      }
      function f(t3) {
        var e3 = t3.state.foldGutter;
        if (e3) {
          var r3 = e3.options;
          clearTimeout(e3.changeUpdate), e3.changeUpdate = setTimeout(function() {
            var r4 = t3.getViewport();
            e3.from == e3.to || r4.from - e3.to > 20 || e3.from - r4.to > 20 ? l(t3) : t3.operation(function() {
              r4.from < e3.from && (o(t3, r4.from, e3.from), e3.from = r4.from), r4.to > e3.to && (o(t3, e3.to, r4.to), e3.to = r4.to);
            });
          }, r3.updateViewportTimeSpan || 400);
        }
      }
      function h(t3, e3) {
        var r3 = t3.state.foldGutter;
        if (r3) {
          var n2 = e3.line;
          n2 >= r3.from && n2 < r3.to && o(t3, n2, n2 + 1);
        }
      }
    }(r(4631), r(8657));
  }, 3256: function(t, e, r) {
    !function(t2) {
      "use strict";
      var e2 = "CodeMirror-lint-markers";
      function r2(t3) {
        t3.parentNode && t3.parentNode.removeChild(t3);
      }
      function n(e3, n2, i2, o2) {
        var a2 = function(e4, r3, n3) {
          var i3 = document.createElement("div");
          function o3(e5) {
            if (!i3.parentNode) return t2.off(document, "mousemove", o3);
            var r4 = Math.max(0, e5.clientY - i3.offsetHeight - 5), n4 = Math.max(0, Math.min(e5.clientX + 5, i3.ownerDocument.defaultView.innerWidth - i3.offsetWidth));
            i3.style.top = r4 + "px", i3.style.left = n4 + "px";
          }
          return i3.className = "CodeMirror-lint-tooltip cm-s-" + e4.options.theme, i3.appendChild(n3.cloneNode(true)), e4.state.lint.options.selfContain ? e4.getWrapperElement().appendChild(i3) : document.body.appendChild(i3), t2.on(document, "mousemove", o3), o3(r3), null != i3.style.opacity && (i3.style.opacity = 1), i3;
        }(e3, n2, i2);
        function l2() {
          if (t2.off(o2, "mouseout", l2), a2) {
            var e4;
            (e4 = a2).parentNode && (null == e4.style.opacity && r2(e4), e4.style.opacity = 0, setTimeout(function() {
              r2(e4);
            }, 600)), a2 = null;
          }
        }
        var s2 = setInterval(function() {
          if (a2) for (var t3 = o2; ; t3 = t3.parentNode) {
            if (t3 && 11 == t3.nodeType && (t3 = t3.host), t3 == document.body) return;
            if (!t3) {
              l2();
              break;
            }
          }
          if (!a2) return clearInterval(s2);
        }, 400);
        t2.on(o2, "mouseout", l2);
      }
      function i(t3, e3, r3) {
        for (var i2 in this.marked = [], e3 instanceof Function && (e3 = { getAnnotations: e3 }), e3 && true !== e3 || (e3 = {}), this.options = {}, this.linterOptions = e3.options || {}, o) this.options[i2] = o[i2];
        for (var i2 in e3) o.hasOwnProperty(i2) ? null != e3[i2] && (this.options[i2] = e3[i2]) : e3.options || (this.linterOptions[i2] = e3[i2]);
        this.timeout = null, this.hasGutter = r3, this.onMouseOver = function(e4) {
          (function(t4, e5) {
            var r4 = e5.target || e5.srcElement;
            if (/\bCodeMirror-lint-mark-/.test(r4.className)) {
              for (var i3 = r4.getBoundingClientRect(), o2 = (i3.left + i3.right) / 2, a2 = (i3.top + i3.bottom) / 2, s2 = t4.findMarksAt(t4.coordsChar({ left: o2, top: a2 }, "client")), u2 = [], c2 = 0; c2 < s2.length; ++c2) {
                var f = s2[c2].__annotation;
                f && u2.push(f);
              }
              u2.length && function(t5, e6, r5) {
                for (var i4 = r5.target || r5.srcElement, o3 = document.createDocumentFragment(), a3 = 0; a3 < e6.length; a3++) {
                  var s3 = e6[a3];
                  o3.appendChild(l(s3));
                }
                n(t5, r5, o3, i4);
              }(t4, u2, e5);
            }
          })(t3, e4);
        }, this.waitingFor = 0;
      }
      var o = { highlightLines: false, tooltips: true, delay: 500, lintOnChange: true, getAnnotations: null, async: false, selfContain: null, formatAnnotation: null, onUpdateLinting: null };
      function a(t3) {
        var r3 = t3.state.lint;
        r3.hasGutter && t3.clearGutter(e2), r3.options.highlightLines && function(t4) {
          t4.eachLine(function(e3) {
            var r4 = e3.wrapClass && /\bCodeMirror-lint-line-\w+\b/.exec(e3.wrapClass);
            r4 && t4.removeLineClass(e3, "wrap", r4[0]);
          });
        }(t3);
        for (var n2 = 0; n2 < r3.marked.length; ++n2) r3.marked[n2].clear();
        r3.marked.length = 0;
      }
      function l(t3) {
        var e3 = t3.severity;
        e3 || (e3 = "error");
        var r3 = document.createElement("div");
        return r3.className = "CodeMirror-lint-message CodeMirror-lint-message-" + e3, void 0 !== t3.messageHTML ? r3.innerHTML = t3.messageHTML : r3.appendChild(document.createTextNode(t3.message)), r3;
      }
      function s(e3) {
        var r3 = e3.state.lint;
        if (r3) {
          var n2 = r3.options, i2 = n2.getAnnotations || e3.getHelper(t2.Pos(0, 0), "lint");
          if (i2) {
            if (n2.async || i2.async) !function(e4, r4) {
              var n3 = e4.state.lint, i3 = ++n3.waitingFor;
              function o3() {
                i3 = -1, e4.off("change", o3);
              }
              e4.on("change", o3), r4(e4.getValue(), function(r5, a2) {
                e4.off("change", o3), n3.waitingFor == i3 && (a2 && r5 instanceof t2 && (r5 = a2), e4.operation(function() {
                  u(e4, r5);
                }));
              }, n3.linterOptions, e4);
            }(e3, i2);
            else {
              var o2 = i2(e3.getValue(), r3.linterOptions, e3);
              if (!o2) return;
              o2.then ? o2.then(function(t3) {
                e3.operation(function() {
                  u(e3, t3);
                });
              }) : e3.operation(function() {
                u(e3, o2);
              });
            }
          }
        }
      }
      function u(r3, i2) {
        var o2 = r3.state.lint;
        if (o2) {
          var s2 = o2.options;
          a(r3);
          for (var u2 = function(t3) {
            for (var e3 = [], r4 = 0; r4 < t3.length; ++r4) {
              var n2 = t3[r4], i3 = n2.from.line;
              (e3[i3] || (e3[i3] = [])).push(n2);
            }
            return e3;
          }(i2), c2 = 0; c2 < u2.length; ++c2) {
            var f = u2[c2];
            if (f) {
              for (var h = null, d = o2.hasGutter && document.createDocumentFragment(), p = 0; p < f.length; ++p) {
                var g, v, m = f[p], y = m.severity;
                y || (y = "error"), g = h, v = y, h = "error" == g ? g : v, s2.formatAnnotation && (m = s2.formatAnnotation(m)), o2.hasGutter && d.appendChild(l(m)), m.to && o2.marked.push(r3.markText(m.from, m.to, { className: "CodeMirror-lint-mark CodeMirror-lint-mark-" + y, __annotation: m }));
              }
              o2.hasGutter && r3.setGutterMarker(c2, e2, function(e3, r4, i3, o3, a2) {
                var l2 = document.createElement("div"), s3 = l2;
                return l2.className = "CodeMirror-lint-marker CodeMirror-lint-marker-" + i3, o3 && ((s3 = l2.appendChild(document.createElement("div"))).className = "CodeMirror-lint-marker CodeMirror-lint-marker-multiple"), false != a2 && t2.on(s3, "mouseover", function(t3) {
                  n(e3, t3, r4, s3);
                }), l2;
              }(r3, d, h, f.length > 1, s2.tooltips)), s2.highlightLines && r3.addLineClass(c2, "wrap", "CodeMirror-lint-line-" + h);
            }
          }
          s2.onUpdateLinting && s2.onUpdateLinting(i2, u2, r3);
        }
      }
      function c(t3) {
        var e3 = t3.state.lint;
        e3 && (clearTimeout(e3.timeout), e3.timeout = setTimeout(function() {
          s(t3);
        }, e3.options.delay));
      }
      t2.defineOption("lint", false, function(r3, n2, o2) {
        if (o2 && o2 != t2.Init && (a(r3), false !== r3.state.lint.options.lintOnChange && r3.off("change", c), t2.off(r3.getWrapperElement(), "mouseover", r3.state.lint.onMouseOver), clearTimeout(r3.state.lint.timeout), delete r3.state.lint), n2) {
          for (var l2 = r3.getOption("gutters"), u2 = false, f = 0; f < l2.length; ++f) l2[f] == e2 && (u2 = true);
          var h = r3.state.lint = new i(r3, n2, u2);
          h.options.lintOnChange && r3.on("change", c), false != h.options.tooltips && "gutter" != h.options.tooltips && t2.on(r3.getWrapperElement(), "mouseover", h.onMouseOver), s(r3);
        }
      }), t2.defineExtension("performLint", function() {
        s(this);
      });
    }(r(4631));
  }, 4631: function(t) {
    var e;
    e = function() {
      "use strict";
      var t2, e2, r, n, i, o, a, l, s, u = navigator.userAgent, c = navigator.platform, f = /gecko\/\d/i.test(u), h = /MSIE \d/.test(u), d = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(u), p = /Edge\/(\d+)/.exec(u), g = h || d || p, v = g && (h ? document.documentMode || 6 : +(p || d)[1]), m = !p && /WebKit\//.test(u), y = m && /Qt\/\d+\.\d+/.test(u), b = !p && /Chrome\/(\d+)/.exec(u), w = b && +b[1], x = /Opera\//.test(u), M = /Apple Computer/.test(navigator.vendor), C = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(u), k = /PhantomJS/.test(u), L = M && (/Mobile\/\w+/.test(u) || navigator.maxTouchPoints > 2), S = /Android/.test(u), T = L || S || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(u), A = L || /Mac/.test(c), N = /\bCrOS\b/.test(u), O = /win/i.test(c), I = x && u.match(/Version\/(\d*\.\d*)/);
      I && (I = Number(I[1])), I && I >= 15 && (x = false, m = true);
      var D = A && (y || x && (null == I || I < 12.11)), W = f || g && v >= 9;
      function F(t10) {
        return RegExp("(^|\\s)" + t10 + "(?:$|\\s)\\s*");
      }
      var H = function(t10, e10) {
        var r10 = t10.className, n10 = F(e10).exec(r10);
        if (n10) {
          var i10 = r10.slice(n10.index + n10[0].length);
          t10.className = r10.slice(0, n10.index) + (i10 ? n10[1] + i10 : "");
        }
      };
      function E(t10) {
        for (var e10 = t10.childNodes.length; e10 > 0; --e10) t10.removeChild(t10.firstChild);
        return t10;
      }
      function P(t10, e10) {
        return E(t10).appendChild(e10);
      }
      function z(t10, e10, r10, n10) {
        var i10 = document.createElement(t10);
        if (r10 && (i10.className = r10), n10 && (i10.style.cssText = n10), "string" == typeof e10) i10.appendChild(document.createTextNode(e10));
        else if (e10) for (var o2 = 0; o2 < e10.length; ++o2) i10.appendChild(e10[o2]);
        return i10;
      }
      function R(t10, e10, r10, n10) {
        var i10 = z(t10, e10, r10, n10);
        return i10.setAttribute("role", "presentation"), i10;
      }
      function B(t10, e10) {
        if (3 == e10.nodeType && (e10 = e10.parentNode), t10.contains) return t10.contains(e10);
        do
          if (11 == e10.nodeType && (e10 = e10.host), e10 == t10) return true;
        while (e10 = e10.parentNode);
      }
      function V(t10) {
        var e10, r10 = t10.ownerDocument || t10;
        try {
          e10 = t10.activeElement;
        } catch (t11) {
          e10 = r10.body || null;
        }
        for (; e10 && e10.shadowRoot && e10.shadowRoot.activeElement; ) e10 = e10.shadowRoot.activeElement;
        return e10;
      }
      function G(t10, e10) {
        var r10 = t10.className;
        F(e10).test(r10) || (t10.className += (r10 ? " " : "") + e10);
      }
      function U(t10, e10) {
        for (var r10 = t10.split(" "), n10 = 0; n10 < r10.length; n10++) r10[n10] && !F(r10[n10]).test(e10) && (e10 += " " + r10[n10]);
        return e10;
      }
      document.createRange ? n = function(t10, e10, r10, n10) {
        var i10 = document.createRange();
        return i10.setEnd(n10 || t10, r10), i10.setStart(t10, e10), i10;
      } : n = function(t10, e10, r10) {
        var n10 = document.body.createTextRange();
        try {
          n10.moveToElementText(t10.parentNode);
        } catch (t11) {
          return n10;
        }
        return n10.collapse(true), n10.moveEnd("character", r10), n10.moveStart("character", e10), n10;
      };
      var j = function(t10) {
        t10.select();
      };
      function q(t10) {
        return t10.display.wrapper.ownerDocument;
      }
      function _(t10) {
        return K(t10.display.wrapper);
      }
      function K(t10) {
        return t10.getRootNode ? t10.getRootNode() : t10.ownerDocument;
      }
      function X(t10) {
        return q(t10).defaultView;
      }
      function $(t10) {
        var e10 = Array.prototype.slice.call(arguments, 1);
        return function() {
          return t10.apply(null, e10);
        };
      }
      function Y(t10, e10, r10) {
        for (var n10 in e10 || (e10 = {}), t10) t10.hasOwnProperty(n10) && (false !== r10 || !e10.hasOwnProperty(n10)) && (e10[n10] = t10[n10]);
        return e10;
      }
      function Z(t10, e10, r10, n10, i10) {
        null == e10 && -1 == (e10 = t10.search(/[^\s\u00a0]/)) && (e10 = t10.length);
        for (var o2 = n10 || 0, a2 = i10 || 0; ; ) {
          var l2 = t10.indexOf("	", o2);
          if (l2 < 0 || l2 >= e10) return a2 + (e10 - o2);
          a2 += l2 - o2, a2 += r10 - a2 % r10, o2 = l2 + 1;
        }
      }
      L ? j = function(t10) {
        t10.selectionStart = 0, t10.selectionEnd = t10.value.length;
      } : g && (j = function(t10) {
        try {
          t10.select();
        } catch (t11) {
        }
      });
      var Q = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = $(this.onTimeout, this);
      };
      function J(t10, e10) {
        for (var r10 = 0; r10 < t10.length; ++r10) if (t10[r10] == e10) return r10;
        return -1;
      }
      Q.prototype.onTimeout = function(t10) {
        t10.id = 0, t10.time <= +/* @__PURE__ */ new Date() ? t10.f() : setTimeout(t10.handler, t10.time - +/* @__PURE__ */ new Date());
      }, Q.prototype.set = function(t10, e10) {
        this.f = e10;
        var r10 = +/* @__PURE__ */ new Date() + t10;
        (!this.id || r10 < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, t10), this.time = r10);
      };
      var tt = { toString: function() {
        return "CodeMirror.Pass";
      } }, te = { scroll: false }, tr = { origin: "*mouse" }, tn = { origin: "+move" };
      function ti(t10, e10, r10) {
        for (var n10 = 0, i10 = 0; ; ) {
          var o2 = t10.indexOf("	", n10);
          -1 == o2 && (o2 = t10.length);
          var a2 = o2 - n10;
          if (o2 == t10.length || i10 + a2 >= e10) return n10 + Math.min(a2, e10 - i10);
          if (i10 += o2 - n10, i10 += r10 - i10 % r10, n10 = o2 + 1, i10 >= e10) return n10;
        }
      }
      var to = [""];
      function ta(t10) {
        for (; to.length <= t10; ) to.push(tl(to) + " ");
        return to[t10];
      }
      function tl(t10) {
        return t10[t10.length - 1];
      }
      function ts(t10, e10) {
        for (var r10 = [], n10 = 0; n10 < t10.length; n10++) r10[n10] = e10(t10[n10], n10);
        return r10;
      }
      function tu() {
      }
      function tc(t10, e10) {
        var r10;
        return Object.create ? r10 = Object.create(t10) : (tu.prototype = t10, r10 = new tu()), e10 && Y(e10, r10), r10;
      }
      var tf = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function th(t10) {
        return /\w/.test(t10) || t10 > "\x80" && (t10.toUpperCase() != t10.toLowerCase() || tf.test(t10));
      }
      function td(t10, e10) {
        return e10 ? !!(e10.source.indexOf("\\w") > -1 && th(t10)) || e10.test(t10) : th(t10);
      }
      function tp(t10) {
        for (var e10 in t10) if (t10.hasOwnProperty(e10) && t10[e10]) return false;
        return true;
      }
      var tg = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function tv(t10) {
        return t10.charCodeAt(0) >= 768 && tg.test(t10);
      }
      function tm(t10, e10, r10) {
        for (; (r10 < 0 ? e10 > 0 : e10 < t10.length) && tv(t10.charAt(e10)); ) e10 += r10;
        return e10;
      }
      function ty(t10, e10, r10) {
        for (var n10 = e10 > r10 ? -1 : 1; ; ) {
          if (e10 == r10) return e10;
          var i10 = (e10 + r10) / 2, o2 = n10 < 0 ? Math.ceil(i10) : Math.floor(i10);
          if (o2 == e10) return t10(o2) ? e10 : r10;
          t10(o2) ? r10 = o2 : e10 = o2 + n10;
        }
      }
      var tb = null;
      function tw(t10, e10, r10) {
        var n10;
        tb = null;
        for (var i10 = 0; i10 < t10.length; ++i10) {
          var o2 = t10[i10];
          if (o2.from < e10 && o2.to > e10) return i10;
          o2.to == e10 && (o2.from != o2.to && "before" == r10 ? n10 = i10 : tb = i10), o2.from == e10 && (o2.from != o2.to && "before" != r10 ? n10 = i10 : tb = i10);
        }
        return null != n10 ? n10 : tb;
      }
      var tx = /* @__PURE__ */ function() {
        var t10 = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, e10 = /[stwN]/, r10 = /[LRr]/, n10 = /[Lb1n]/, i10 = /[1n]/;
        function o2(t11, e11, r11) {
          this.level = t11, this.from = e11, this.to = r11;
        }
        return function(a2, l2) {
          var s2 = "ltr" == l2 ? "L" : "R";
          if (0 == a2.length || "ltr" == l2 && !t10.test(a2)) return false;
          for (var u2 = a2.length, c2 = [], f2 = 0; f2 < u2; ++f2) c2.push(function(t11) {
            if (t11 <= 247) return "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(t11);
            if (1424 <= t11 && t11 <= 1524) return "R";
            if (1536 <= t11 && t11 <= 1785) return "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(t11 - 1536);
            if (1774 <= t11 && t11 <= 2220) return "r";
            if (8192 <= t11 && t11 <= 8203) return "w";
            else if (8204 == t11) return "b";
            else return "L";
          }(a2.charCodeAt(f2)));
          for (var h2 = 0, d2 = s2; h2 < u2; ++h2) {
            var p2 = c2[h2];
            "m" == p2 ? c2[h2] = d2 : d2 = p2;
          }
          for (var g2 = 0, v2 = s2; g2 < u2; ++g2) {
            var m2 = c2[g2];
            "1" == m2 && "r" == v2 ? c2[g2] = "n" : r10.test(m2) && (v2 = m2, "r" == m2 && (c2[g2] = "R"));
          }
          for (var y2 = 1, b2 = c2[0]; y2 < u2 - 1; ++y2) {
            var w2 = c2[y2];
            "+" == w2 && "1" == b2 && "1" == c2[y2 + 1] ? c2[y2] = "1" : "," == w2 && b2 == c2[y2 + 1] && ("1" == b2 || "n" == b2) && (c2[y2] = b2), b2 = w2;
          }
          for (var x2 = 0; x2 < u2; ++x2) {
            var M2 = c2[x2];
            if ("," == M2) c2[x2] = "N";
            else if ("%" == M2) {
              var C2 = void 0;
              for (C2 = x2 + 1; C2 < u2 && "%" == c2[C2]; ++C2) ;
              for (var k2 = x2 && "!" == c2[x2 - 1] || C2 < u2 && "1" == c2[C2] ? "1" : "N", L2 = x2; L2 < C2; ++L2) c2[L2] = k2;
              x2 = C2 - 1;
            }
          }
          for (var S2 = 0, T2 = s2; S2 < u2; ++S2) {
            var A2 = c2[S2];
            "L" == T2 && "1" == A2 ? c2[S2] = "L" : r10.test(A2) && (T2 = A2);
          }
          for (var N2 = 0; N2 < u2; ++N2) if (e10.test(c2[N2])) {
            var O2 = void 0;
            for (O2 = N2 + 1; O2 < u2 && e10.test(c2[O2]); ++O2) ;
            for (var I2 = (N2 ? c2[N2 - 1] : s2) == "L", D2 = I2 == ((O2 < u2 ? c2[O2] : s2) == "L") ? I2 ? "L" : "R" : s2, W2 = N2; W2 < O2; ++W2) c2[W2] = D2;
            N2 = O2 - 1;
          }
          for (var F2, H2 = [], E2 = 0; E2 < u2; ) if (n10.test(c2[E2])) {
            var P2 = E2;
            for (++E2; E2 < u2 && n10.test(c2[E2]); ++E2) ;
            H2.push(new o2(0, P2, E2));
          } else {
            var z2 = E2, R2 = H2.length, B2 = "rtl" == l2 ? 1 : 0;
            for (++E2; E2 < u2 && "L" != c2[E2]; ++E2) ;
            for (var V2 = z2; V2 < E2; ) if (i10.test(c2[V2])) {
              z2 < V2 && (H2.splice(R2, 0, new o2(1, z2, V2)), R2 += B2);
              var G2 = V2;
              for (++V2; V2 < E2 && i10.test(c2[V2]); ++V2) ;
              H2.splice(R2, 0, new o2(2, G2, V2)), R2 += B2, z2 = V2;
            } else ++V2;
            z2 < E2 && H2.splice(R2, 0, new o2(1, z2, E2));
          }
          return "ltr" == l2 && (1 == H2[0].level && (F2 = a2.match(/^\s+/)) && (H2[0].from = F2[0].length, H2.unshift(new o2(0, 0, F2[0].length))), 1 == tl(H2).level && (F2 = a2.match(/\s+$/)) && (tl(H2).to -= F2[0].length, H2.push(new o2(0, u2 - F2[0].length, u2)))), "rtl" == l2 ? H2.reverse() : H2;
        };
      }();
      function tM(t10, e10) {
        var r10 = t10.order;
        return null == r10 && (r10 = t10.order = tx(t10.text, e10)), r10;
      }
      var tC = [], tk = function(t10, e10, r10) {
        if (t10.addEventListener) t10.addEventListener(e10, r10, false);
        else if (t10.attachEvent) t10.attachEvent("on" + e10, r10);
        else {
          var n10 = t10._handlers || (t10._handlers = {});
          n10[e10] = (n10[e10] || tC).concat(r10);
        }
      };
      function tL(t10, e10) {
        return t10._handlers && t10._handlers[e10] || tC;
      }
      function tS(t10, e10, r10) {
        if (t10.removeEventListener) t10.removeEventListener(e10, r10, false);
        else if (t10.detachEvent) t10.detachEvent("on" + e10, r10);
        else {
          var n10 = t10._handlers, i10 = n10 && n10[e10];
          if (i10) {
            var o2 = J(i10, r10);
            o2 > -1 && (n10[e10] = i10.slice(0, o2).concat(i10.slice(o2 + 1)));
          }
        }
      }
      function tT(t10, e10) {
        var r10 = tL(t10, e10);
        if (r10.length) for (var n10 = Array.prototype.slice.call(arguments, 2), i10 = 0; i10 < r10.length; ++i10) r10[i10].apply(null, n10);
      }
      function tA(t10, e10, r10) {
        return "string" == typeof e10 && (e10 = { type: e10, preventDefault: function() {
          this.defaultPrevented = true;
        } }), tT(t10, r10 || e10.type, t10, e10), tF(e10) || e10.codemirrorIgnore;
      }
      function tN(t10) {
        var e10 = t10._handlers && t10._handlers.cursorActivity;
        if (e10) for (var r10 = t10.curOp.cursorActivityHandlers || (t10.curOp.cursorActivityHandlers = []), n10 = 0; n10 < e10.length; ++n10) -1 == J(r10, e10[n10]) && r10.push(e10[n10]);
      }
      function tO(t10, e10) {
        return tL(t10, e10).length > 0;
      }
      function tI(t10) {
        t10.prototype.on = function(t11, e10) {
          tk(this, t11, e10);
        }, t10.prototype.off = function(t11, e10) {
          tS(this, t11, e10);
        };
      }
      function tD(t10) {
        t10.preventDefault ? t10.preventDefault() : t10.returnValue = false;
      }
      function tW(t10) {
        t10.stopPropagation ? t10.stopPropagation() : t10.cancelBubble = true;
      }
      function tF(t10) {
        return null != t10.defaultPrevented ? t10.defaultPrevented : false == t10.returnValue;
      }
      function tH(t10) {
        tD(t10), tW(t10);
      }
      function tE(t10) {
        return t10.target || t10.srcElement;
      }
      function tP(t10) {
        var e10 = t10.which;
        return null == e10 && (1 & t10.button ? e10 = 1 : 2 & t10.button ? e10 = 3 : 4 & t10.button && (e10 = 2)), A && t10.ctrlKey && 1 == e10 && (e10 = 3), e10;
      }
      var tz = function() {
        if (g && v < 9) return false;
        var t10 = z("div");
        return "draggable" in t10 || "dragDrop" in t10;
      }(), tR = 3 != "\n\nb".split(/\n/).length ? function(t10) {
        for (var e10 = 0, r10 = [], n10 = t10.length; e10 <= n10; ) {
          var i10 = t10.indexOf("\n", e10);
          -1 == i10 && (i10 = t10.length);
          var o2 = t10.slice(e10, "\r" == t10.charAt(i10 - 1) ? i10 - 1 : i10), a2 = o2.indexOf("\r");
          -1 != a2 ? (r10.push(o2.slice(0, a2)), e10 += a2 + 1) : (r10.push(o2), e10 = i10 + 1);
        }
        return r10;
      } : function(t10) {
        return t10.split(/\r\n?|\n/);
      }, tB = window.getSelection ? function(t10) {
        try {
          return t10.selectionStart != t10.selectionEnd;
        } catch (t11) {
          return false;
        }
      } : function(t10) {
        var e10;
        try {
          e10 = t10.ownerDocument.selection.createRange();
        } catch (t11) {
        }
        return !!e10 && e10.parentElement() == t10 && 0 != e10.compareEndPoints("StartToEnd", e10);
      }, tV = "oncopy" in (t2 = z("div")) || (t2.setAttribute("oncopy", "return;"), "function" == typeof t2.oncopy), tG = null, tU = {}, tj = {};
      function tq(t10, e10) {
        arguments.length > 2 && (e10.dependencies = Array.prototype.slice.call(arguments, 2)), tU[t10] = e10;
      }
      function t_(t10) {
        if ("string" == typeof t10 && tj.hasOwnProperty(t10)) t10 = tj[t10];
        else if (t10 && "string" == typeof t10.name && tj.hasOwnProperty(t10.name)) {
          var e10 = tj[t10.name];
          "string" == typeof e10 && (e10 = { name: e10 }), (t10 = tc(e10, t10)).name = e10.name;
        } else if ("string" == typeof t10 && /^[\w\-]+\/[\w\-]+\+xml$/.test(t10)) return t_("application/xml");
        else if ("string" == typeof t10 && /^[\w\-]+\/[\w\-]+\+json$/.test(t10)) return t_("application/json");
        return "string" == typeof t10 ? { name: t10 } : t10 || { name: "null" };
      }
      function tK(t10, e10) {
        var r10 = tU[(e10 = t_(e10)).name];
        if (!r10) return tK(t10, "text/plain");
        var n10 = r10(t10, e10);
        if (tX.hasOwnProperty(e10.name)) {
          var i10 = tX[e10.name];
          for (var o2 in i10) i10.hasOwnProperty(o2) && (n10.hasOwnProperty(o2) && (n10["_" + o2] = n10[o2]), n10[o2] = i10[o2]);
        }
        if (n10.name = e10.name, e10.helperType && (n10.helperType = e10.helperType), e10.modeProps) for (var a2 in e10.modeProps) n10[a2] = e10.modeProps[a2];
        return n10;
      }
      var tX = {};
      function t$(t10, e10) {
        if (true === e10) return e10;
        if (t10.copyState) return t10.copyState(e10);
        var r10 = {};
        for (var n10 in e10) {
          var i10 = e10[n10];
          i10 instanceof Array && (i10 = i10.concat([])), r10[n10] = i10;
        }
        return r10;
      }
      function tY(t10, e10) {
        for (var r10; t10.innerMode && (r10 = t10.innerMode(e10)) && r10.mode != t10; ) e10 = r10.state, t10 = r10.mode;
        return r10 || { mode: t10, state: e10 };
      }
      function tZ(t10, e10, r10) {
        return !t10.startState || t10.startState(e10, r10);
      }
      var tQ = function(t10, e10, r10) {
        this.pos = this.start = 0, this.string = t10, this.tabSize = e10 || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r10;
      };
      function tJ(t10, e10) {
        if ((e10 -= t10.first) < 0 || e10 >= t10.size) throw Error("There is no line " + (e10 + t10.first) + " in the document.");
        for (var r10 = t10; !r10.lines; ) for (var n10 = 0; ; ++n10) {
          var i10 = r10.children[n10], o2 = i10.chunkSize();
          if (e10 < o2) {
            r10 = i10;
            break;
          }
          e10 -= o2;
        }
        return r10.lines[e10];
      }
      function t0(t10, e10, r10) {
        var n10 = [], i10 = e10.line;
        return t10.iter(e10.line, r10.line + 1, function(t11) {
          var o2 = t11.text;
          i10 == r10.line && (o2 = o2.slice(0, r10.ch)), i10 == e10.line && (o2 = o2.slice(e10.ch)), n10.push(o2), ++i10;
        }), n10;
      }
      function t1(t10, e10, r10) {
        var n10 = [];
        return t10.iter(e10, r10, function(t11) {
          n10.push(t11.text);
        }), n10;
      }
      function t22(t10, e10) {
        var r10 = e10 - t10.height;
        if (r10) for (var n10 = t10; n10; n10 = n10.parent) n10.height += r10;
      }
      function t3(t10) {
        if (null == t10.parent) return null;
        for (var e10 = t10.parent, r10 = J(e10.lines, t10), n10 = e10.parent; n10; e10 = n10, n10 = n10.parent) for (var i10 = 0; n10.children[i10] != e10; ++i10) r10 += n10.children[i10].chunkSize();
        return r10 + e10.first;
      }
      function t4(t10, e10) {
        var r10 = t10.first;
        t: do {
          for (var n10 = 0; n10 < t10.children.length; ++n10) {
            var i10 = t10.children[n10], o2 = i10.height;
            if (e10 < o2) {
              t10 = i10;
              continue t;
            }
            e10 -= o2, r10 += i10.chunkSize();
          }
          return r10;
        } while (!t10.lines);
        for (var a2 = 0; a2 < t10.lines.length; ++a2) {
          var l2 = t10.lines[a2].height;
          if (e10 < l2) break;
          e10 -= l2;
        }
        return r10 + a2;
      }
      function t5(t10, e10) {
        return e10 >= t10.first && e10 < t10.first + t10.size;
      }
      function t6(t10, e10) {
        return String(t10.lineNumberFormatter(e10 + t10.firstLineNumber));
      }
      function t7(t10, e10, r10) {
        if (void 0 === r10 && (r10 = null), !(this instanceof t7)) return new t7(t10, e10, r10);
        this.line = t10, this.ch = e10, this.sticky = r10;
      }
      function t8(t10, e10) {
        return t10.line - e10.line || t10.ch - e10.ch;
      }
      function t9(t10, e10) {
        return t10.sticky == e10.sticky && 0 == t8(t10, e10);
      }
      function et(t10) {
        return t7(t10.line, t10.ch);
      }
      function ee(t10, e10) {
        return 0 > t8(t10, e10) ? e10 : t10;
      }
      function er(t10, e10) {
        return 0 > t8(t10, e10) ? t10 : e10;
      }
      function en(t10, e10) {
        return Math.max(t10.first, Math.min(e10, t10.first + t10.size - 1));
      }
      function ei(t10, e10) {
        if (e10.line < t10.first) return t7(t10.first, 0);
        var r10, n10, i10, o2 = t10.first + t10.size - 1;
        return e10.line > o2 ? t7(o2, tJ(t10, o2).text.length) : (r10 = e10, n10 = tJ(t10, e10.line).text.length, null == (i10 = r10.ch) || i10 > n10 ? t7(r10.line, n10) : i10 < 0 ? t7(r10.line, 0) : r10);
      }
      function eo(t10, e10) {
        for (var r10 = [], n10 = 0; n10 < e10.length; n10++) r10[n10] = ei(t10, e10[n10]);
        return r10;
      }
      tQ.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, tQ.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, tQ.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, tQ.prototype.next = function() {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++);
      }, tQ.prototype.eat = function(t10) {
        var e10, r10 = this.string.charAt(this.pos);
        if ("string" == typeof t10 ? r10 == t10 : r10 && (t10.test ? t10.test(r10) : t10(r10))) return ++this.pos, r10;
      }, tQ.prototype.eatWhile = function(t10) {
        for (var e10 = this.pos; this.eat(t10); ) ;
        return this.pos > e10;
      }, tQ.prototype.eatSpace = function() {
        for (var t10 = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos;
        return this.pos > t10;
      }, tQ.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, tQ.prototype.skipTo = function(t10) {
        var e10 = this.string.indexOf(t10, this.pos);
        if (e10 > -1) return this.pos = e10, true;
      }, tQ.prototype.backUp = function(t10) {
        this.pos -= t10;
      }, tQ.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = Z(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Z(this.string, this.lineStart, this.tabSize) : 0);
      }, tQ.prototype.indentation = function() {
        return Z(this.string, null, this.tabSize) - (this.lineStart ? Z(this.string, this.lineStart, this.tabSize) : 0);
      }, tQ.prototype.match = function(t10, e10, r10) {
        if ("string" == typeof t10) {
          var n10 = function(t11) {
            return r10 ? t11.toLowerCase() : t11;
          };
          if (n10(this.string.substr(this.pos, t10.length)) == n10(t10)) return false !== e10 && (this.pos += t10.length), true;
        } else {
          var i10 = this.string.slice(this.pos).match(t10);
          return i10 && i10.index > 0 ? null : (i10 && false !== e10 && (this.pos += i10[0].length), i10);
        }
      }, tQ.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, tQ.prototype.hideFirstChars = function(t10, e10) {
        this.lineStart += t10;
        try {
          return e10();
        } finally {
          this.lineStart -= t10;
        }
      }, tQ.prototype.lookAhead = function(t10) {
        var e10 = this.lineOracle;
        return e10 && e10.lookAhead(t10);
      }, tQ.prototype.baseToken = function() {
        var t10 = this.lineOracle;
        return t10 && t10.baseToken(this.pos);
      };
      var ea = function(t10, e10) {
        this.state = t10, this.lookAhead = e10;
      }, el = function(t10, e10, r10, n10) {
        this.state = e10, this.doc = t10, this.line = r10, this.maxLookAhead = n10 || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      function es(t10, e10, r10, n10) {
        var i10 = [t10.state.modeGen], o2 = {};
        em(t10, e10.text, t10.doc.mode, r10, function(t11, e11) {
          return i10.push(t11, e11);
        }, o2, n10);
        for (var a2 = r10.state, l2 = 0; l2 < t10.state.overlays.length; ++l2) !function(n11) {
          r10.baseTokens = i10;
          var l3 = t10.state.overlays[n11], s2 = 1, u2 = 0;
          r10.state = true, em(t10, e10.text, l3.mode, r10, function(t11, e11) {
            for (var r11 = s2; u2 < t11; ) {
              var n12 = i10[s2];
              n12 > t11 && i10.splice(s2, 1, t11, i10[s2 + 1], n12), s2 += 2, u2 = Math.min(t11, n12);
            }
            if (e11) {
              if (l3.opaque) i10.splice(r11, s2 - r11, t11, "overlay " + e11), s2 = r11 + 2;
              else for (; r11 < s2; r11 += 2) {
                var o3 = i10[r11 + 1];
                i10[r11 + 1] = (o3 ? o3 + " " : "") + "overlay " + e11;
              }
            }
          }, o2), r10.state = a2, r10.baseTokens = null, r10.baseTokenPos = 1;
        }(l2);
        return { styles: i10, classes: o2.bgClass || o2.textClass ? o2 : null };
      }
      function eu(t10, e10, r10) {
        if (!e10.styles || e10.styles[0] != t10.state.modeGen) {
          var n10 = ec(t10, t3(e10)), i10 = e10.text.length > t10.options.maxHighlightLength && t$(t10.doc.mode, n10.state), o2 = es(t10, e10, n10);
          i10 && (n10.state = i10), e10.stateAfter = n10.save(!i10), e10.styles = o2.styles, o2.classes ? e10.styleClasses = o2.classes : e10.styleClasses && (e10.styleClasses = null), r10 === t10.doc.highlightFrontier && (t10.doc.modeFrontier = Math.max(t10.doc.modeFrontier, ++t10.doc.highlightFrontier));
        }
        return e10.styles;
      }
      function ec(t10, e10, r10) {
        var n10 = t10.doc, i10 = t10.display;
        if (!n10.mode.startState) return new el(n10, true, e10);
        var o2 = function(t11, e11, r11) {
          for (var n11, i11, o3 = t11.doc, a3 = r11 ? -1 : e11 - (t11.doc.mode.innerMode ? 1e3 : 100), l3 = e11; l3 > a3; --l3) {
            if (l3 <= o3.first) return o3.first;
            var s2 = tJ(o3, l3 - 1), u2 = s2.stateAfter;
            if (u2 && (!r11 || l3 + (u2 instanceof ea ? u2.lookAhead : 0) <= o3.modeFrontier)) return l3;
            var c2 = Z(s2.text, null, t11.options.tabSize);
            (null == i11 || n11 > c2) && (i11 = l3 - 1, n11 = c2);
          }
          return i11;
        }(t10, e10, r10), a2 = o2 > n10.first && tJ(n10, o2 - 1).stateAfter, l2 = a2 ? el.fromSaved(n10, a2, o2) : new el(n10, tZ(n10.mode), o2);
        return n10.iter(o2, e10, function(r11) {
          ef(t10, r11.text, l2);
          var n11 = l2.line;
          r11.stateAfter = n11 == e10 - 1 || n11 % 5 == 0 || n11 >= i10.viewFrom && n11 < i10.viewTo ? l2.save() : null, l2.nextLine();
        }), r10 && (n10.modeFrontier = l2.line), l2;
      }
      function ef(t10, e10, r10, n10) {
        var i10 = t10.doc.mode, o2 = new tQ(e10, t10.options.tabSize, r10);
        for (o2.start = o2.pos = n10 || 0, "" == e10 && eh(i10, r10.state); !o2.eol(); ) ed(i10, o2, r10.state), o2.start = o2.pos;
      }
      function eh(t10, e10) {
        if (t10.blankLine) return t10.blankLine(e10);
        if (t10.innerMode) {
          var r10 = tY(t10, e10);
          if (r10.mode.blankLine) return r10.mode.blankLine(r10.state);
        }
      }
      function ed(t10, e10, r10, n10) {
        for (var i10 = 0; i10 < 10; i10++) {
          n10 && (n10[0] = tY(t10, r10).mode);
          var o2 = t10.token(e10, r10);
          if (e10.pos > e10.start) return o2;
        }
        throw Error("Mode " + t10.name + " failed to advance stream.");
      }
      el.prototype.lookAhead = function(t10) {
        var e10 = this.doc.getLine(this.line + t10);
        return null != e10 && t10 > this.maxLookAhead && (this.maxLookAhead = t10), e10;
      }, el.prototype.baseToken = function(t10) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= t10; ) this.baseTokenPos += 2;
        var e10 = this.baseTokens[this.baseTokenPos + 1];
        return { type: e10 && e10.replace(/( |^)overlay .*/, ""), size: this.baseTokens[this.baseTokenPos] - t10 };
      }, el.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, el.fromSaved = function(t10, e10, r10) {
        return e10 instanceof ea ? new el(t10, t$(t10.mode, e10.state), r10, e10.lookAhead) : new el(t10, t$(t10.mode, e10), r10);
      }, el.prototype.save = function(t10) {
        var e10 = false !== t10 ? t$(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new ea(e10, this.maxLookAhead) : e10;
      };
      var ep = function(t10, e10, r10) {
        this.start = t10.start, this.end = t10.pos, this.string = t10.current(), this.type = e10 || null, this.state = r10;
      };
      function eg(t10, e10, r10, n10) {
        var i10, o2 = t10.doc, a2 = o2.mode;
        e10 = ei(o2, e10);
        var l2, s2 = tJ(o2, e10.line), u2 = ec(t10, e10.line, r10), c2 = new tQ(s2.text, t10.options.tabSize, u2);
        for (n10 && (l2 = []); (n10 || c2.pos < e10.ch) && !c2.eol(); ) c2.start = c2.pos, i10 = ed(a2, c2, u2.state), n10 && l2.push(new ep(c2, i10, t$(o2.mode, u2.state)));
        return n10 ? l2 : new ep(c2, i10, u2.state);
      }
      function ev(t10, e10) {
        if (t10) for (; ; ) {
          var r10 = t10.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!r10) break;
          t10 = t10.slice(0, r10.index) + t10.slice(r10.index + r10[0].length);
          var n10 = r10[1] ? "bgClass" : "textClass";
          null == e10[n10] ? e10[n10] = r10[2] : RegExp("(?:^|\\s)" + r10[2] + "(?:$|\\s)").test(e10[n10]) || (e10[n10] += " " + r10[2]);
        }
        return t10;
      }
      function em(t10, e10, r10, n10, i10, o2, a2) {
        var l2 = r10.flattenSpans;
        null == l2 && (l2 = t10.options.flattenSpans);
        var s2, u2 = 0, c2 = null, f2 = new tQ(e10, t10.options.tabSize, n10), h2 = t10.options.addModeClass && [null];
        for ("" == e10 && ev(eh(r10, n10.state), o2); !f2.eol(); ) {
          if (f2.pos > t10.options.maxHighlightLength ? (l2 = false, a2 && ef(t10, e10, n10, f2.pos), f2.pos = e10.length, s2 = null) : s2 = ev(ed(r10, f2, n10.state, h2), o2), h2) {
            var d2 = h2[0].name;
            d2 && (s2 = "m-" + (s2 ? d2 + " " + s2 : d2));
          }
          if (!l2 || c2 != s2) {
            for (; u2 < f2.start; ) i10(u2 = Math.min(f2.start, u2 + 5e3), c2);
            c2 = s2;
          }
          f2.start = f2.pos;
        }
        for (; u2 < f2.pos; ) {
          var p2 = Math.min(f2.pos, u2 + 5e3);
          i10(p2, c2), u2 = p2;
        }
      }
      var ey = false, eb = false;
      function ew(t10, e10, r10) {
        this.marker = t10, this.from = e10, this.to = r10;
      }
      function ex(t10, e10) {
        if (t10) for (var r10 = 0; r10 < t10.length; ++r10) {
          var n10 = t10[r10];
          if (n10.marker == e10) return n10;
        }
      }
      function eM(t10, e10) {
        if (e10.full) return null;
        var r10 = t5(t10, e10.from.line) && tJ(t10, e10.from.line).markedSpans, n10 = t5(t10, e10.to.line) && tJ(t10, e10.to.line).markedSpans;
        if (!r10 && !n10) return null;
        var i10 = e10.from.ch, o2 = e10.to.ch, a2 = 0 == t8(e10.from, e10.to), l2 = function(t11, e11, r11) {
          var n11;
          if (t11) for (var i11 = 0; i11 < t11.length; ++i11) {
            var o3 = t11[i11], a3 = o3.marker;
            if (null == o3.from || (a3.inclusiveLeft ? o3.from <= e11 : o3.from < e11) || o3.from == e11 && "bookmark" == a3.type && (!r11 || !o3.marker.insertLeft)) {
              var l3 = null == o3.to || (a3.inclusiveRight ? o3.to >= e11 : o3.to > e11);
              (n11 || (n11 = [])).push(new ew(a3, o3.from, l3 ? null : o3.to));
            }
          }
          return n11;
        }(r10, i10, a2), s2 = function(t11, e11, r11) {
          var n11;
          if (t11) for (var i11 = 0; i11 < t11.length; ++i11) {
            var o3 = t11[i11], a3 = o3.marker;
            if (null == o3.to || (a3.inclusiveRight ? o3.to >= e11 : o3.to > e11) || o3.from == e11 && "bookmark" == a3.type && (!r11 || o3.marker.insertLeft)) {
              var l3 = null == o3.from || (a3.inclusiveLeft ? o3.from <= e11 : o3.from < e11);
              (n11 || (n11 = [])).push(new ew(a3, l3 ? null : o3.from - e11, null == o3.to ? null : o3.to - e11));
            }
          }
          return n11;
        }(n10, o2, a2), u2 = 1 == e10.text.length, c2 = tl(e10.text).length + (u2 ? i10 : 0);
        if (l2) for (var f2 = 0; f2 < l2.length; ++f2) {
          var h2 = l2[f2];
          if (null == h2.to) {
            var d2 = ex(s2, h2.marker);
            d2 ? u2 && (h2.to = null == d2.to ? null : d2.to + c2) : h2.to = i10;
          }
        }
        if (s2) for (var p2 = 0; p2 < s2.length; ++p2) {
          var g2 = s2[p2];
          null != g2.to && (g2.to += c2), null == g2.from ? !ex(l2, g2.marker) && (g2.from = c2, u2 && (l2 || (l2 = [])).push(g2)) : (g2.from += c2, u2 && (l2 || (l2 = [])).push(g2));
        }
        l2 && (l2 = eC(l2)), s2 && s2 != l2 && (s2 = eC(s2));
        var v2 = [l2];
        if (!u2) {
          var m2, y2 = e10.text.length - 2;
          if (y2 > 0 && l2) for (var b2 = 0; b2 < l2.length; ++b2) null == l2[b2].to && (m2 || (m2 = [])).push(new ew(l2[b2].marker, null, null));
          for (var w2 = 0; w2 < y2; ++w2) v2.push(m2);
          v2.push(s2);
        }
        return v2;
      }
      function eC(t10) {
        for (var e10 = 0; e10 < t10.length; ++e10) {
          var r10 = t10[e10];
          null != r10.from && r10.from == r10.to && false !== r10.marker.clearWhenEmpty && t10.splice(e10--, 1);
        }
        return t10.length ? t10 : null;
      }
      function ek(t10) {
        var e10 = t10.markedSpans;
        if (e10) {
          for (var r10 = 0; r10 < e10.length; ++r10) e10[r10].marker.detachLine(t10);
          t10.markedSpans = null;
        }
      }
      function eL(t10, e10) {
        if (e10) {
          for (var r10 = 0; r10 < e10.length; ++r10) e10[r10].marker.attachLine(t10);
          t10.markedSpans = e10;
        }
      }
      function eS(t10) {
        return t10.inclusiveLeft ? -1 : 0;
      }
      function eT(t10) {
        return t10.inclusiveRight ? 1 : 0;
      }
      function eA(t10, e10) {
        var r10 = t10.lines.length - e10.lines.length;
        if (0 != r10) return r10;
        var n10 = t10.find(), i10 = e10.find(), o2 = t8(n10.from, i10.from) || eS(t10) - eS(e10);
        if (o2) return -o2;
        var a2 = t8(n10.to, i10.to) || eT(t10) - eT(e10);
        return a2 || e10.id - t10.id;
      }
      function eN(t10, e10) {
        var r10, n10 = eb && t10.markedSpans;
        if (n10) for (var i10 = void 0, o2 = 0; o2 < n10.length; ++o2) (i10 = n10[o2]).marker.collapsed && (e10 ? i10.from : i10.to) == null && (!r10 || 0 > eA(r10, i10.marker)) && (r10 = i10.marker);
        return r10;
      }
      function eO(t10, e10, r10, n10, i10) {
        var o2 = tJ(t10, e10), a2 = eb && o2.markedSpans;
        if (a2) for (var l2 = 0; l2 < a2.length; ++l2) {
          var s2 = a2[l2];
          if (s2.marker.collapsed) {
            var u2 = s2.marker.find(0), c2 = t8(u2.from, r10) || eS(s2.marker) - eS(i10), f2 = t8(u2.to, n10) || eT(s2.marker) - eT(i10);
            if ((!(c2 >= 0) || !(f2 <= 0)) && (!(c2 <= 0) || !(f2 >= 0)) && (c2 <= 0 && (s2.marker.inclusiveRight && i10.inclusiveLeft ? t8(u2.to, r10) >= 0 : t8(u2.to, r10) > 0) || c2 >= 0 && (s2.marker.inclusiveRight && i10.inclusiveLeft ? 0 >= t8(u2.from, n10) : 0 > t8(u2.from, n10)))) return true;
          }
        }
      }
      function eI(t10) {
        for (var e10; e10 = eN(t10, true); ) t10 = e10.find(-1, true).line;
        return t10;
      }
      function eD(t10, e10) {
        var r10 = tJ(t10, e10), n10 = eI(r10);
        return r10 == n10 ? e10 : t3(n10);
      }
      function eW(t10, e10) {
        if (e10 > t10.lastLine()) return e10;
        var r10, n10 = tJ(t10, e10);
        if (!eF(t10, n10)) return e10;
        for (; r10 = eN(n10, false); ) n10 = r10.find(1, true).line;
        return t3(n10) + 1;
      }
      function eF(t10, e10) {
        var r10 = eb && e10.markedSpans;
        if (r10) for (var n10 = void 0, i10 = 0; i10 < r10.length; ++i10) {
          if ((n10 = r10[i10]).marker.collapsed) {
            if (null == n10.from || !n10.marker.widgetNode && 0 == n10.from && n10.marker.inclusiveLeft && function t11(e11, r11, n11) {
              if (null == n11.to) {
                var i11 = n11.marker.find(1, true);
                return t11(e11, i11.line, ex(i11.line.markedSpans, n11.marker));
              }
              if (n11.marker.inclusiveRight && n11.to == r11.text.length) return true;
              for (var o2 = void 0, a2 = 0; a2 < r11.markedSpans.length; ++a2) if ((o2 = r11.markedSpans[a2]).marker.collapsed && !o2.marker.widgetNode && o2.from == n11.to && (null == o2.to || o2.to != n11.from) && (o2.marker.inclusiveLeft || n11.marker.inclusiveRight) && t11(e11, r11, o2)) return true;
            }(t10, e10, n10)) return true;
          }
        }
      }
      function eH(t10) {
        t10 = eI(t10);
        for (var e10 = 0, r10 = t10.parent, n10 = 0; n10 < r10.lines.length; ++n10) {
          var i10 = r10.lines[n10];
          if (i10 == t10) break;
          e10 += i10.height;
        }
        for (var o2 = r10.parent; o2; o2 = (r10 = o2).parent) for (var a2 = 0; a2 < o2.children.length; ++a2) {
          var l2 = o2.children[a2];
          if (l2 == r10) break;
          e10 += l2.height;
        }
        return e10;
      }
      function eE(t10) {
        if (0 == t10.height) return 0;
        for (var e10, r10 = t10.text.length, n10 = t10; e10 = eN(n10, true); ) {
          var i10 = e10.find(0, true);
          n10 = i10.from.line, r10 += i10.from.ch - i10.to.ch;
        }
        for (n10 = t10; e10 = eN(n10, false); ) {
          var o2 = e10.find(0, true);
          r10 -= n10.text.length - o2.from.ch, r10 += (n10 = o2.to.line).text.length - o2.to.ch;
        }
        return r10;
      }
      function eP(t10) {
        var e10 = t10.display, r10 = t10.doc;
        e10.maxLine = tJ(r10, r10.first), e10.maxLineLength = eE(e10.maxLine), e10.maxLineChanged = true, r10.iter(function(t11) {
          var r11 = eE(t11);
          r11 > e10.maxLineLength && (e10.maxLineLength = r11, e10.maxLine = t11);
        });
      }
      var ez = function(t10, e10, r10) {
        this.text = t10, eL(this, e10), this.height = r10 ? r10(this) : 1;
      };
      ez.prototype.lineNo = function() {
        return t3(this);
      }, tI(ez);
      var eR = {}, eB = {};
      function eV(t10, e10) {
        if (!t10 || /^\s*$/.test(t10)) return null;
        var r10 = e10.addModeClass ? eB : eR;
        return r10[t10] || (r10[t10] = t10.replace(/\S+/g, "cm-$&"));
      }
      function eG(t10, e10) {
        var r10 = R("span", null, null, m ? "padding-right: .1px" : null), a2 = { pre: R("pre", [r10], "CodeMirror-line"), content: r10, col: 0, pos: 0, cm: t10, trailingSpace: false, splitSpaces: t10.getOption("lineWrapping") };
        e10.measure = {};
        for (var l2 = 0; l2 <= (e10.rest ? e10.rest.length : 0); l2++) {
          var s2 = l2 ? e10.rest[l2 - 1] : e10.line, u2 = void 0;
          a2.pos = 0, a2.addToken = ej, function(t11) {
            if (null != o) return o;
            var e11 = P(t11, document.createTextNode("A\u062EA")), r11 = n(e11, 0, 1).getBoundingClientRect(), i10 = n(e11, 1, 2).getBoundingClientRect();
            return E(t11), !!r11 && r11.left != r11.right && (o = i10.right - r11.right < 3);
          }(t10.display.measure) && (u2 = tM(s2, t10.doc.direction)) && (a2.addToken = /* @__PURE__ */ function(t11, e11) {
            return function(r11, n10, i10, o2, a3, l3, s3) {
              i10 = i10 ? i10 + " cm-force-border" : "cm-force-border";
              for (var u3 = r11.pos, c3 = u3 + n10.length; ; ) {
                for (var f3 = void 0, h2 = 0; h2 < e11.length && (!((f3 = e11[h2]).to > u3) || !(f3.from <= u3)); h2++) ;
                if (f3.to >= c3) return t11(r11, n10, i10, o2, a3, l3, s3);
                t11(r11, n10.slice(0, f3.to - u3), i10, o2, null, l3, s3), o2 = null, n10 = n10.slice(f3.to - u3), u3 = f3.to;
              }
            };
          }(a2.addToken, u2)), a2.map = [];
          var c2 = e10 != t10.display.externalMeasured && t3(s2);
          (function(t11, e11, r11) {
            var n10 = t11.markedSpans, i10 = t11.text, o2 = 0;
            if (!n10) {
              for (var a3 = 1; a3 < r11.length; a3 += 2) e11.addToken(e11, i10.slice(o2, o2 = r11[a3]), eV(r11[a3 + 1], e11.cm.options));
              return;
            }
            for (var l3, s3, u3, c3, f3, h2, d2, p2 = i10.length, g2 = 0, v2 = 1, m2 = "", y2 = 0; ; ) {
              if (y2 == g2) {
                u3 = c3 = f3 = s3 = "", d2 = null, h2 = null, y2 = 1 / 0;
                for (var b2 = [], w2 = void 0, x2 = 0; x2 < n10.length; ++x2) {
                  var M2 = n10[x2], C2 = M2.marker;
                  if ("bookmark" == C2.type && M2.from == g2 && C2.widgetNode) b2.push(C2);
                  else if (M2.from <= g2 && (null == M2.to || M2.to > g2 || C2.collapsed && M2.to == g2 && M2.from == g2)) {
                    if (null != M2.to && M2.to != g2 && y2 > M2.to && (y2 = M2.to, c3 = ""), C2.className && (u3 += " " + C2.className), C2.css && (s3 = (s3 ? s3 + ";" : "") + C2.css), C2.startStyle && M2.from == g2 && (f3 += " " + C2.startStyle), C2.endStyle && M2.to == y2 && (w2 || (w2 = [])).push(C2.endStyle, M2.to), C2.title && ((d2 || (d2 = {})).title = C2.title), C2.attributes) for (var k2 in C2.attributes) (d2 || (d2 = {}))[k2] = C2.attributes[k2];
                    C2.collapsed && (!h2 || 0 > eA(h2.marker, C2)) && (h2 = M2);
                  } else M2.from > g2 && y2 > M2.from && (y2 = M2.from);
                }
                if (w2) for (var L2 = 0; L2 < w2.length; L2 += 2) w2[L2 + 1] == y2 && (c3 += " " + w2[L2]);
                if (!h2 || h2.from == g2) for (var S2 = 0; S2 < b2.length; ++S2) eq(e11, 0, b2[S2]);
                if (h2 && (h2.from || 0) == g2) {
                  if (eq(e11, (null == h2.to ? p2 + 1 : h2.to) - g2, h2.marker, null == h2.from), null == h2.to) return;
                  h2.to == g2 && (h2 = false);
                }
              }
              if (g2 >= p2) break;
              for (var T2 = Math.min(p2, y2); ; ) {
                if (m2) {
                  var A2 = g2 + m2.length;
                  if (!h2) {
                    var N2 = A2 > T2 ? m2.slice(0, T2 - g2) : m2;
                    e11.addToken(e11, N2, l3 ? l3 + u3 : u3, f3, g2 + N2.length == y2 ? c3 : "", s3, d2);
                  }
                  if (A2 >= T2) {
                    m2 = m2.slice(T2 - g2), g2 = T2;
                    break;
                  }
                  g2 = A2, f3 = "";
                }
                m2 = i10.slice(o2, o2 = r11[v2++]), l3 = eV(r11[v2++], e11.cm.options);
              }
            }
          })(s2, a2, eu(t10, s2, c2)), s2.styleClasses && (s2.styleClasses.bgClass && (a2.bgClass = U(s2.styleClasses.bgClass, a2.bgClass || "")), s2.styleClasses.textClass && (a2.textClass = U(s2.styleClasses.textClass, a2.textClass || ""))), 0 == a2.map.length && a2.map.push(0, 0, a2.content.appendChild(function(t11) {
            if (null == i) {
              var e11 = z("span", "\u200B");
              P(t11, z("span", [e11, document.createTextNode("x")])), 0 != t11.firstChild.offsetHeight && (i = e11.offsetWidth <= 1 && e11.offsetHeight > 2 && !(g && v < 8));
            }
            var r11 = i ? z("span", "\u200B") : z("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
            return r11.setAttribute("cm-text", ""), r11;
          }(t10.display.measure))), 0 == l2 ? (e10.measure.map = a2.map, e10.measure.cache = {}) : ((e10.measure.maps || (e10.measure.maps = [])).push(a2.map), (e10.measure.caches || (e10.measure.caches = [])).push({}));
        }
        if (m) {
          var f2 = a2.content.lastChild;
          (/\bcm-tab\b/.test(f2.className) || f2.querySelector && f2.querySelector(".cm-tab")) && (a2.content.className = "cm-tab-wrap-hack");
        }
        return tT(t10, "renderLine", t10, e10.line, a2.pre), a2.pre.className && (a2.textClass = U(a2.pre.className, a2.textClass || "")), a2;
      }
      function eU(t10) {
        var e10 = z("span", "\u2022", "cm-invalidchar");
        return e10.title = "\\u" + t10.charCodeAt(0).toString(16), e10.setAttribute("aria-label", e10.title), e10;
      }
      function ej(t10, e10, r10, n10, i10, o2, a2) {
        if (e10) {
          var l2, s2 = t10.splitSpaces ? function(t11, e11) {
            if (t11.length > 1 && !/  /.test(t11)) return t11;
            for (var r11 = e11, n11 = "", i11 = 0; i11 < t11.length; i11++) {
              var o3 = t11.charAt(i11);
              " " == o3 && r11 && (i11 == t11.length - 1 || 32 == t11.charCodeAt(i11 + 1)) && (o3 = "\xA0"), n11 += o3, r11 = " " == o3;
            }
            return n11;
          }(e10, t10.trailingSpace) : e10, u2 = t10.cm.state.specialChars, c2 = false;
          if (u2.test(e10)) {
            l2 = document.createDocumentFragment();
            for (var f2 = 0; ; ) {
              u2.lastIndex = f2;
              var h2 = u2.exec(e10), d2 = h2 ? h2.index - f2 : e10.length - f2;
              if (d2) {
                var p2 = document.createTextNode(s2.slice(f2, f2 + d2));
                g && v < 9 ? l2.appendChild(z("span", [p2])) : l2.appendChild(p2), t10.map.push(t10.pos, t10.pos + d2, p2), t10.col += d2, t10.pos += d2;
              }
              if (!h2) break;
              f2 += d2 + 1;
              var m2 = void 0;
              if ("	" == h2[0]) {
                var y2 = t10.cm.options.tabSize, b2 = y2 - t10.col % y2;
                (m2 = l2.appendChild(z("span", ta(b2), "cm-tab"))).setAttribute("role", "presentation"), m2.setAttribute("cm-text", "	"), t10.col += b2;
              } else "\r" == h2[0] || "\n" == h2[0] ? (m2 = l2.appendChild(z("span", "\r" == h2[0] ? "\u240D" : "\u2424", "cm-invalidchar"))).setAttribute("cm-text", h2[0]) : ((m2 = t10.cm.options.specialCharPlaceholder(h2[0])).setAttribute("cm-text", h2[0]), g && v < 9 ? l2.appendChild(z("span", [m2])) : l2.appendChild(m2)), t10.col += 1;
              t10.map.push(t10.pos, t10.pos + 1, m2), t10.pos++;
            }
          } else t10.col += e10.length, l2 = document.createTextNode(s2), t10.map.push(t10.pos, t10.pos + e10.length, l2), g && v < 9 && (c2 = true), t10.pos += e10.length;
          if (t10.trailingSpace = 32 == s2.charCodeAt(e10.length - 1), r10 || n10 || i10 || c2 || o2 || a2) {
            var w2 = r10 || "";
            n10 && (w2 += n10), i10 && (w2 += i10);
            var x2 = z("span", [l2], w2, o2);
            if (a2) for (var M2 in a2) a2.hasOwnProperty(M2) && "style" != M2 && "class" != M2 && x2.setAttribute(M2, a2[M2]);
            return t10.content.appendChild(x2);
          }
          t10.content.appendChild(l2);
        }
      }
      function eq(t10, e10, r10, n10) {
        var i10 = !n10 && r10.widgetNode;
        i10 && t10.map.push(t10.pos, t10.pos + e10, i10), !n10 && t10.cm.display.input.needsContentAttribute && (i10 || (i10 = t10.content.appendChild(document.createElement("span"))), i10.setAttribute("cm-marker", r10.id)), i10 && (t10.cm.display.input.setUneditable(i10), t10.content.appendChild(i10)), t10.pos += e10, t10.trailingSpace = false;
      }
      function e_(t10, e10, r10) {
        this.line = e10, this.rest = function(t11) {
          for (var e11, r11; e11 = eN(t11, false); ) t11 = e11.find(1, true).line, (r11 || (r11 = [])).push(t11);
          return r11;
        }(e10), this.size = this.rest ? t3(tl(this.rest)) - r10 + 1 : 1, this.node = this.text = null, this.hidden = eF(t10, e10);
      }
      function eK(t10, e10, r10) {
        for (var n10, i10 = [], o2 = e10; o2 < r10; o2 = n10) {
          var a2 = new e_(t10.doc, tJ(t10.doc, o2), o2);
          n10 = o2 + a2.size, i10.push(a2);
        }
        return i10;
      }
      var eX = null, e$ = null;
      function eY(t10, e10) {
        var r10 = tL(t10, e10);
        if (r10.length) {
          var n10, i10 = Array.prototype.slice.call(arguments, 2);
          eX ? n10 = eX.delayedCallbacks : e$ ? n10 = e$ : (n10 = e$ = [], setTimeout(eZ, 0));
          for (var o2 = function(t11) {
            n10.push(function() {
              return r10[t11].apply(null, i10);
            });
          }, a2 = 0; a2 < r10.length; ++a2) o2(a2);
        }
      }
      function eZ() {
        var t10 = e$;
        e$ = null;
        for (var e10 = 0; e10 < t10.length; ++e10) t10[e10]();
      }
      function eQ(t10, e10, r10, n10) {
        for (var i10 = 0; i10 < e10.changes.length; i10++) {
          var o2 = e10.changes[i10];
          "text" == o2 ? function(t11, e11) {
            var r11 = e11.text.className, n11 = e0(t11, e11);
            e11.text == e11.node && (e11.node = n11.pre), e11.text.parentNode.replaceChild(n11.pre, e11.text), e11.text = n11.pre, n11.bgClass != e11.bgClass || n11.textClass != e11.textClass ? (e11.bgClass = n11.bgClass, e11.textClass = n11.textClass, e1(t11, e11)) : r11 && (e11.text.className = r11);
          }(t10, e10) : "gutter" == o2 ? e22(t10, e10, r10, n10) : "class" == o2 ? e1(t10, e10) : "widget" == o2 && function(t11, e11, r11) {
            e11.alignable && (e11.alignable = null);
            for (var n11 = F("CodeMirror-linewidget"), i11 = e11.node.firstChild, o3 = void 0; i11; i11 = o3) o3 = i11.nextSibling, n11.test(i11.className) && e11.node.removeChild(i11);
            e3(t11, e11, r11);
          }(t10, e10, n10);
        }
        e10.changes = null;
      }
      function eJ(t10) {
        return t10.node == t10.text && (t10.node = z("div", null, null, "position: relative"), t10.text.parentNode && t10.text.parentNode.replaceChild(t10.node, t10.text), t10.node.appendChild(t10.text), g && v < 8 && (t10.node.style.zIndex = 2)), t10.node;
      }
      function e0(t10, e10) {
        var r10 = t10.display.externalMeasured;
        return r10 && r10.line == e10.line ? (t10.display.externalMeasured = null, e10.measure = r10.measure, r10.built) : eG(t10, e10);
      }
      function e1(t10, e10) {
        (function(t11, e11) {
          var r11 = e11.bgClass ? e11.bgClass + " " + (e11.line.bgClass || "") : e11.line.bgClass;
          if (r11 && (r11 += " CodeMirror-linebackground"), e11.background) r11 ? e11.background.className = r11 : (e11.background.parentNode.removeChild(e11.background), e11.background = null);
          else if (r11) {
            var n10 = eJ(e11);
            e11.background = n10.insertBefore(z("div", null, r11), n10.firstChild), t11.display.input.setUneditable(e11.background);
          }
        })(t10, e10), e10.line.wrapClass ? eJ(e10).className = e10.line.wrapClass : e10.node != e10.text && (e10.node.className = "");
        var r10 = e10.textClass ? e10.textClass + " " + (e10.line.textClass || "") : e10.line.textClass;
        e10.text.className = r10 || "";
      }
      function e22(t10, e10, r10, n10) {
        if (e10.gutter && (e10.node.removeChild(e10.gutter), e10.gutter = null), e10.gutterBackground && (e10.node.removeChild(e10.gutterBackground), e10.gutterBackground = null), e10.line.gutterClass) {
          var i10 = eJ(e10);
          e10.gutterBackground = z("div", null, "CodeMirror-gutter-background " + e10.line.gutterClass, "left: " + (t10.options.fixedGutter ? n10.fixedPos : -n10.gutterTotalWidth) + "px; width: " + n10.gutterTotalWidth + "px"), t10.display.input.setUneditable(e10.gutterBackground), i10.insertBefore(e10.gutterBackground, e10.text);
        }
        var o2 = e10.line.gutterMarkers;
        if (t10.options.lineNumbers || o2) {
          var a2 = eJ(e10), l2 = e10.gutter = z("div", null, "CodeMirror-gutter-wrapper", "left: " + (t10.options.fixedGutter ? n10.fixedPos : -n10.gutterTotalWidth) + "px");
          if (l2.setAttribute("aria-hidden", "true"), t10.display.input.setUneditable(l2), a2.insertBefore(l2, e10.text), e10.line.gutterClass && (l2.className += " " + e10.line.gutterClass), !t10.options.lineNumbers || o2 && o2["CodeMirror-linenumbers"] || (e10.lineNumber = l2.appendChild(z("div", t6(t10.options, r10), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n10.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + t10.display.lineNumInnerWidth + "px"))), o2) for (var s2 = 0; s2 < t10.display.gutterSpecs.length; ++s2) {
            var u2 = t10.display.gutterSpecs[s2].className, c2 = o2.hasOwnProperty(u2) && o2[u2];
            c2 && l2.appendChild(z("div", [c2], "CodeMirror-gutter-elt", "left: " + n10.gutterLeft[u2] + "px; width: " + n10.gutterWidth[u2] + "px"));
          }
        }
      }
      function e3(t10, e10, r10) {
        if (e4(t10, e10.line, e10, r10, true), e10.rest) for (var n10 = 0; n10 < e10.rest.length; n10++) e4(t10, e10.rest[n10], e10, r10, false);
      }
      function e4(t10, e10, r10, n10, i10) {
        if (e10.widgets) for (var o2 = eJ(r10), a2 = 0, l2 = e10.widgets; a2 < l2.length; ++a2) {
          var s2 = l2[a2], u2 = z("div", [s2.node], "CodeMirror-linewidget" + (s2.className ? " " + s2.className : ""));
          s2.handleMouseEvents || u2.setAttribute("cm-ignore-events", "true"), function(t11, e11, r11, n11) {
            if (t11.noHScroll) {
              (r11.alignable || (r11.alignable = [])).push(e11);
              var i11 = n11.wrapperWidth;
              e11.style.left = n11.fixedPos + "px", t11.coverGutter || (i11 -= n11.gutterTotalWidth, e11.style.paddingLeft = n11.gutterTotalWidth + "px"), e11.style.width = i11 + "px";
            }
            t11.coverGutter && (e11.style.zIndex = 5, e11.style.position = "relative", t11.noHScroll || (e11.style.marginLeft = -n11.gutterTotalWidth + "px"));
          }(s2, u2, r10, n10), t10.display.input.setUneditable(u2), i10 && s2.above ? o2.insertBefore(u2, r10.gutter || r10.text) : o2.appendChild(u2), eY(s2, "redraw");
        }
      }
      function e5(t10) {
        if (null != t10.height) return t10.height;
        var e10 = t10.doc.cm;
        if (!e10) return 0;
        if (!B(document.body, t10.node)) {
          var r10 = "position: relative;";
          t10.coverGutter && (r10 += "margin-left: -" + e10.display.gutters.offsetWidth + "px;"), t10.noHScroll && (r10 += "width: " + e10.display.wrapper.clientWidth + "px;"), P(e10.display.measure, z("div", [t10.node], null, r10));
        }
        return t10.height = t10.node.parentNode.offsetHeight;
      }
      function e6(t10, e10) {
        for (var r10 = tE(e10); r10 != t10.wrapper; r10 = r10.parentNode) if (!r10 || 1 == r10.nodeType && "true" == r10.getAttribute("cm-ignore-events") || r10.parentNode == t10.sizer && r10 != t10.mover) return true;
      }
      function e7(t10) {
        return t10.lineSpace.offsetTop;
      }
      function e8(t10) {
        return t10.mover.offsetHeight - t10.lineSpace.offsetHeight;
      }
      function e9(t10) {
        if (t10.cachedPaddingH) return t10.cachedPaddingH;
        var e10 = P(t10.measure, z("pre", "x", "CodeMirror-line-like")), r10 = window.getComputedStyle ? window.getComputedStyle(e10) : e10.currentStyle, n10 = { left: parseInt(r10.paddingLeft), right: parseInt(r10.paddingRight) };
        return isNaN(n10.left) || isNaN(n10.right) || (t10.cachedPaddingH = n10), n10;
      }
      function rt(t10) {
        return 50 - t10.display.nativeBarWidth;
      }
      function re(t10) {
        return t10.display.scroller.clientWidth - rt(t10) - t10.display.barWidth;
      }
      function rr(t10) {
        return t10.display.scroller.clientHeight - rt(t10) - t10.display.barHeight;
      }
      function rn(t10, e10, r10) {
        if (t10.line == e10) return { map: t10.measure.map, cache: t10.measure.cache };
        if (t10.rest) {
          for (var n10 = 0; n10 < t10.rest.length; n10++) if (t10.rest[n10] == e10) return { map: t10.measure.maps[n10], cache: t10.measure.caches[n10] };
          for (var i10 = 0; i10 < t10.rest.length; i10++) if (t3(t10.rest[i10]) > r10) return { map: t10.measure.maps[i10], cache: t10.measure.caches[i10], before: true };
        }
      }
      function ri(t10, e10) {
        if (e10 >= t10.display.viewFrom && e10 < t10.display.viewTo) return t10.display.view[rD(t10, e10)];
        var r10 = t10.display.externalMeasured;
        if (r10 && e10 >= r10.lineN && e10 < r10.lineN + r10.size) return r10;
      }
      function ro(t10, e10) {
        var r10, n10, i10, o2, a2 = t3(e10), l2 = ri(t10, a2);
        l2 && !l2.text ? l2 = null : l2 && l2.changes && (eQ(t10, l2, a2, rT(t10)), t10.curOp.forceUpdate = true), !l2 && (n10 = t3(r10 = eI(r10 = e10)), (i10 = t10.display.externalMeasured = new e_(t10.doc, r10, n10)).lineN = n10, o2 = i10.built = eG(t10, i10), i10.text = o2.pre, P(t10.display.lineMeasure, o2.pre), l2 = i10);
        var s2 = rn(l2, e10, a2);
        return { line: e10, view: l2, rect: null, map: s2.map, cache: s2.cache, before: s2.before, hasHeights: false };
      }
      function ra(t10, e10, r10, i10, o2) {
        e10.before && (r10 = -1);
        var a2, l2 = r10 + (i10 || "");
        return e10.cache.hasOwnProperty(l2) ? a2 = e10.cache[l2] : (e10.rect || (e10.rect = e10.view.text.getBoundingClientRect()), e10.hasHeights || (function(t11, e11, r11) {
          var n10 = t11.options.lineWrapping, i11 = n10 && re(t11);
          if (!e11.measure.heights || n10 && e11.measure.width != i11) {
            var o3 = e11.measure.heights = [];
            if (n10) {
              e11.measure.width = i11;
              for (var a3 = e11.text.firstChild.getClientRects(), l3 = 0; l3 < a3.length - 1; l3++) {
                var s2 = a3[l3], u2 = a3[l3 + 1];
                Math.abs(s2.bottom - u2.bottom) > 2 && o3.push((s2.bottom + u2.top) / 2 - r11.top);
              }
            }
            o3.push(r11.bottom - r11.top);
          }
        }(t10, e10.view, e10.rect), e10.hasHeights = true), (a2 = function(t11, e11, r11, i11) {
          var o3, a3, l3 = rs(e11.map, r11, i11), s2 = l3.node, u2 = l3.start, c2 = l3.end, f2 = l3.collapse;
          if (3 == s2.nodeType) {
            for (var h2 = 0; h2 < 4; h2++) {
              for (; u2 && tv(e11.line.text.charAt(l3.coverStart + u2)); ) --u2;
              for (; l3.coverStart + c2 < l3.coverEnd && tv(e11.line.text.charAt(l3.coverStart + c2)); ) ++c2;
              if ((o3 = g && v < 9 && 0 == u2 && c2 == l3.coverEnd - l3.coverStart ? s2.parentNode.getBoundingClientRect() : function(t12, e12) {
                var r12 = rl;
                if ("left" == e12) for (var n10 = 0; n10 < t12.length && (r12 = t12[n10]).left == r12.right; n10++) ;
                else for (var i12 = t12.length - 1; i12 >= 0 && (r12 = t12[i12]).left == r12.right; i12--) ;
                return r12;
              }(n(s2, u2, c2).getClientRects(), i11)).left || o3.right || 0 == u2) break;
              c2 = u2, u2 -= 1, f2 = "right";
            }
            g && v < 11 && (o3 = function(t12, e12) {
              if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !function(t13) {
                if (null != tG) return tG;
                var e13 = P(t13, z("span", "x")), r13 = e13.getBoundingClientRect(), i13 = n(e13, 0, 1).getBoundingClientRect();
                return tG = Math.abs(r13.left - i13.left) > 1;
              }(t12)) return e12;
              var r12 = screen.logicalXDPI / screen.deviceXDPI, i12 = screen.logicalYDPI / screen.deviceYDPI;
              return { left: e12.left * r12, right: e12.right * r12, top: e12.top * i12, bottom: e12.bottom * i12 };
            }(t11.display.measure, o3));
          } else u2 > 0 && (f2 = i11 = "right"), o3 = t11.options.lineWrapping && (a3 = s2.getClientRects()).length > 1 ? a3["right" == i11 ? a3.length - 1 : 0] : s2.getBoundingClientRect();
          if (g && v < 9 && !u2 && (!o3 || !o3.left && !o3.right)) {
            var d2 = s2.parentNode.getClientRects()[0];
            o3 = d2 ? { left: d2.left, right: d2.left + rS(t11.display), top: d2.top, bottom: d2.bottom } : rl;
          }
          for (var p2 = o3.top - e11.rect.top, m2 = o3.bottom - e11.rect.top, y2 = (p2 + m2) / 2, b2 = e11.view.measure.heights, w2 = 0; w2 < b2.length - 1 && !(y2 < b2[w2]); w2++) ;
          var x2 = w2 ? b2[w2 - 1] : 0, M2 = b2[w2], C2 = { left: ("right" == f2 ? o3.right : o3.left) - e11.rect.left, right: ("left" == f2 ? o3.left : o3.right) - e11.rect.left, top: x2, bottom: M2 };
          return o3.left || o3.right || (C2.bogus = true), t11.options.singleCursorHeightPerLine || (C2.rtop = p2, C2.rbottom = m2), C2;
        }(t10, e10, r10, i10)).bogus || (e10.cache[l2] = a2)), { left: a2.left, right: a2.right, top: o2 ? a2.rtop : a2.top, bottom: o2 ? a2.rbottom : a2.bottom };
      }
      var rl = { left: 0, right: 0, top: 0, bottom: 0 };
      function rs(t10, e10, r10) {
        for (var n10, i10, o2, a2, l2, s2, u2 = 0; u2 < t10.length; u2 += 3) if (l2 = t10[u2], s2 = t10[u2 + 1], e10 < l2 ? (i10 = 0, o2 = 1, a2 = "left") : e10 < s2 ? o2 = (i10 = e10 - l2) + 1 : (u2 == t10.length - 3 || e10 == s2 && t10[u2 + 3] > e10) && (i10 = (o2 = s2 - l2) - 1, e10 >= s2 && (a2 = "right")), null != i10) {
          if (n10 = t10[u2 + 2], l2 == s2 && r10 == (n10.insertLeft ? "left" : "right") && (a2 = r10), "left" == r10 && 0 == i10) for (; u2 && t10[u2 - 2] == t10[u2 - 3] && t10[u2 - 1].insertLeft; ) n10 = t10[(u2 -= 3) + 2], a2 = "left";
          if ("right" == r10 && i10 == s2 - l2) for (; u2 < t10.length - 3 && t10[u2 + 3] == t10[u2 + 4] && !t10[u2 + 5].insertLeft; ) n10 = t10[(u2 += 3) + 2], a2 = "right";
          break;
        }
        return { node: n10, start: i10, end: o2, collapse: a2, coverStart: l2, coverEnd: s2 };
      }
      function ru(t10) {
        if (t10.measure && (t10.measure.cache = {}, t10.measure.heights = null, t10.rest)) for (var e10 = 0; e10 < t10.rest.length; e10++) t10.measure.caches[e10] = {};
      }
      function rc(t10) {
        t10.display.externalMeasure = null, E(t10.display.lineMeasure);
        for (var e10 = 0; e10 < t10.display.view.length; e10++) ru(t10.display.view[e10]);
      }
      function rf(t10) {
        rc(t10), t10.display.cachedCharWidth = t10.display.cachedTextHeight = t10.display.cachedPaddingH = null, t10.options.lineWrapping || (t10.display.maxLineChanged = true), t10.display.lineNumChars = null;
      }
      function rh(t10) {
        return b && S ? -(t10.body.getBoundingClientRect().left - parseInt(getComputedStyle(t10.body).marginLeft)) : t10.defaultView.pageXOffset || (t10.documentElement || t10.body).scrollLeft;
      }
      function rd(t10) {
        return b && S ? -(t10.body.getBoundingClientRect().top - parseInt(getComputedStyle(t10.body).marginTop)) : t10.defaultView.pageYOffset || (t10.documentElement || t10.body).scrollTop;
      }
      function rp(t10) {
        var e10 = eI(t10).widgets, r10 = 0;
        if (e10) for (var n10 = 0; n10 < e10.length; ++n10) e10[n10].above && (r10 += e5(e10[n10]));
        return r10;
      }
      function rg(t10, e10, r10, n10, i10) {
        if (!i10) {
          var o2 = rp(e10);
          r10.top += o2, r10.bottom += o2;
        }
        if ("line" == n10) return r10;
        n10 || (n10 = "local");
        var a2 = eH(e10);
        if ("local" == n10 ? a2 += e7(t10.display) : a2 -= t10.display.viewOffset, "page" == n10 || "window" == n10) {
          var l2 = t10.display.lineSpace.getBoundingClientRect();
          a2 += l2.top + ("window" == n10 ? 0 : rd(q(t10)));
          var s2 = l2.left + ("window" == n10 ? 0 : rh(q(t10)));
          r10.left += s2, r10.right += s2;
        }
        return r10.top += a2, r10.bottom += a2, r10;
      }
      function rv(t10, e10, r10) {
        if ("div" == r10) return e10;
        var n10 = e10.left, i10 = e10.top;
        if ("page" == r10) n10 -= rh(q(t10)), i10 -= rd(q(t10));
        else if ("local" == r10 || !r10) {
          var o2 = t10.display.sizer.getBoundingClientRect();
          n10 += o2.left, i10 += o2.top;
        }
        var a2 = t10.display.lineSpace.getBoundingClientRect();
        return { left: n10 - a2.left, top: i10 - a2.top };
      }
      function rm(t10, e10, r10, n10, i10) {
        var o2, a2;
        return n10 || (n10 = tJ(t10.doc, e10.line)), rg(t10, n10, (o2 = n10, a2 = e10.ch, ra(t10, ro(t10, o2), a2, i10)), r10);
      }
      function ry(t10, e10, r10, n10, i10, o2) {
        function a2(e11, a3) {
          var l3 = ra(t10, i10, e11, a3 ? "right" : "left", o2);
          return a3 ? l3.left = l3.right : l3.right = l3.left, rg(t10, n10, l3, r10);
        }
        n10 = n10 || tJ(t10.doc, e10.line), i10 || (i10 = ro(t10, n10));
        var l2 = tM(n10, t10.doc.direction), s2 = e10.ch, u2 = e10.sticky;
        if (s2 >= n10.text.length ? (s2 = n10.text.length, u2 = "before") : s2 <= 0 && (s2 = 0, u2 = "after"), !l2) return a2("before" == u2 ? s2 - 1 : s2, "before" == u2);
        function c2(t11, e11, r11) {
          return a2(r11 ? t11 - 1 : t11, 1 == l2[e11].level != r11);
        }
        var f2 = tw(l2, s2, u2), h2 = tb, d2 = c2(s2, f2, "before" == u2);
        return null != h2 && (d2.other = c2(s2, h2, "before" != u2)), d2;
      }
      function rb(t10, e10) {
        var r10 = 0;
        e10 = ei(t10.doc, e10), t10.options.lineWrapping || (r10 = rS(t10.display) * e10.ch);
        var n10 = tJ(t10.doc, e10.line), i10 = eH(n10) + e7(t10.display);
        return { left: r10, right: r10, top: i10, bottom: i10 + n10.height };
      }
      function rw(t10, e10, r10, n10, i10) {
        var o2 = t7(t10, e10, r10);
        return o2.xRel = i10, n10 && (o2.outside = n10), o2;
      }
      function rx(t10, e10, r10) {
        var n10 = t10.doc;
        if ((r10 += t10.display.viewOffset) < 0) return rw(n10.first, 0, null, -1, -1);
        var i10 = t4(n10, r10), o2 = n10.first + n10.size - 1;
        if (i10 > o2) return rw(n10.first + n10.size - 1, tJ(n10, o2).text.length, null, 1, 1);
        e10 < 0 && (e10 = 0);
        for (var a2 = tJ(n10, i10); ; ) {
          var l2 = function(t11, e11, r11, n11, i11) {
            i11 -= eH(e11);
            var o3 = ro(t11, e11), a3 = rp(e11), l3 = 0, s3 = e11.text.length, u3 = true, c2 = tM(e11, t11.doc.direction);
            if (c2) {
              var f2 = (t11.options.lineWrapping ? function(t12, e12, r12, n12, i12, o4, a4) {
                var l4 = rM(t12, e12, n12, a4), s4 = l4.begin, u4 = l4.end;
                /\s/.test(e12.text.charAt(u4 - 1)) && u4--;
                for (var c3 = null, f3 = null, h3 = 0; h3 < i12.length; h3++) {
                  var d3 = i12[h3];
                  if (!(d3.from >= u4) && !(d3.to <= s4)) {
                    var p3 = ra(t12, n12, 1 != d3.level ? Math.min(u4, d3.to) - 1 : Math.max(s4, d3.from)).right, g3 = p3 < o4 ? o4 - p3 + 1e9 : p3 - o4;
                    (!c3 || f3 > g3) && (c3 = d3, f3 = g3);
                  }
                }
                return c3 || (c3 = i12[i12.length - 1]), c3.from < s4 && (c3 = { from: s4, to: c3.to, level: c3.level }), c3.to > u4 && (c3 = { from: c3.from, to: u4, level: c3.level }), c3;
              } : function(t12, e12, r12, n12, i12, o4, a4) {
                var l4 = ty(function(l5) {
                  var s5 = i12[l5], u5 = 1 != s5.level;
                  return rk(ry(t12, t7(r12, u5 ? s5.to : s5.from, u5 ? "before" : "after"), "line", e12, n12), o4, a4, true);
                }, 0, i12.length - 1), s4 = i12[l4];
                if (l4 > 0) {
                  var u4 = 1 != s4.level, c3 = ry(t12, t7(r12, u4 ? s4.from : s4.to, u4 ? "after" : "before"), "line", e12, n12);
                  rk(c3, o4, a4, true) && c3.top > a4 && (s4 = i12[l4 - 1]);
                }
                return s4;
              })(t11, e11, r11, o3, c2, n11, i11);
              l3 = (u3 = 1 != f2.level) ? f2.from : f2.to - 1, s3 = u3 ? f2.to : f2.from - 1;
            }
            var h2, d2, p2 = null, g2 = null, v2 = ty(function(e12) {
              var r12 = ra(t11, o3, e12);
              return r12.top += a3, r12.bottom += a3, !!rk(r12, n11, i11, false) && (r12.top <= i11 && r12.left <= n11 && (p2 = e12, g2 = r12), true);
            }, l3, s3), m2 = false;
            if (g2) {
              var y2 = n11 - g2.left < g2.right - n11, b2 = y2 == u3;
              v2 = p2 + (b2 ? 0 : 1), d2 = b2 ? "after" : "before", h2 = y2 ? g2.left : g2.right;
            } else {
              !u3 && (v2 == s3 || v2 == l3) && v2++, d2 = 0 == v2 ? "after" : v2 == e11.text.length ? "before" : ra(t11, o3, v2 - (u3 ? 1 : 0)).bottom + a3 <= i11 == u3 ? "after" : "before";
              var w2 = ry(t11, t7(r11, v2, d2), "line", e11, o3);
              h2 = w2.left, m2 = i11 < w2.top ? -1 : i11 >= w2.bottom ? 1 : 0;
            }
            return rw(r11, v2 = tm(e11.text, v2, 1), d2, m2, n11 - h2);
          }(t10, a2, i10, e10, r10), s2 = function(t11, e11) {
            var r11, n11 = eb && t11.markedSpans;
            if (n11) for (var i11 = 0; i11 < n11.length; ++i11) {
              var o3 = n11[i11];
              o3.marker.collapsed && (null == o3.from || o3.from < e11) && (null == o3.to || o3.to > e11) && (!r11 || 0 > eA(r11, o3.marker)) && (r11 = o3.marker);
            }
            return r11;
          }(a2, l2.ch + (l2.xRel > 0 || l2.outside > 0 ? 1 : 0));
          if (!s2) return l2;
          var u2 = s2.find(1);
          if (u2.line == i10) return u2;
          a2 = tJ(n10, i10 = u2.line);
        }
      }
      function rM(t10, e10, r10, n10) {
        n10 -= rp(e10);
        var i10 = e10.text.length, o2 = ty(function(e11) {
          return ra(t10, r10, e11 - 1).bottom <= n10;
        }, i10, 0);
        return i10 = ty(function(e11) {
          return ra(t10, r10, e11).top > n10;
        }, o2, i10), { begin: o2, end: i10 };
      }
      function rC(t10, e10, r10, n10) {
        r10 || (r10 = ro(t10, e10));
        var i10 = rg(t10, e10, ra(t10, r10, n10), "line").top;
        return rM(t10, e10, r10, i10);
      }
      function rk(t10, e10, r10, n10) {
        return !(t10.bottom <= r10) && (t10.top > r10 || (n10 ? t10.left : t10.right) > e10);
      }
      function rL(t10) {
        if (null != t10.cachedTextHeight) return t10.cachedTextHeight;
        if (null == a) {
          a = z("pre", null, "CodeMirror-line-like");
          for (var e10 = 0; e10 < 49; ++e10) a.appendChild(document.createTextNode("x")), a.appendChild(z("br"));
          a.appendChild(document.createTextNode("x"));
        }
        P(t10.measure, a);
        var r10 = a.offsetHeight / 50;
        return r10 > 3 && (t10.cachedTextHeight = r10), E(t10.measure), r10 || 1;
      }
      function rS(t10) {
        if (null != t10.cachedCharWidth) return t10.cachedCharWidth;
        var e10 = z("span", "xxxxxxxxxx"), r10 = z("pre", [e10], "CodeMirror-line-like");
        P(t10.measure, r10);
        var n10 = e10.getBoundingClientRect(), i10 = (n10.right - n10.left) / 10;
        return i10 > 2 && (t10.cachedCharWidth = i10), i10 || 10;
      }
      function rT(t10) {
        for (var e10 = t10.display, r10 = {}, n10 = {}, i10 = e10.gutters.clientLeft, o2 = e10.gutters.firstChild, a2 = 0; o2; o2 = o2.nextSibling, ++a2) {
          var l2 = t10.display.gutterSpecs[a2].className;
          r10[l2] = o2.offsetLeft + o2.clientLeft + i10, n10[l2] = o2.clientWidth;
        }
        return { fixedPos: rA(e10), gutterTotalWidth: e10.gutters.offsetWidth, gutterLeft: r10, gutterWidth: n10, wrapperWidth: e10.wrapper.clientWidth };
      }
      function rA(t10) {
        return t10.scroller.getBoundingClientRect().left - t10.sizer.getBoundingClientRect().left;
      }
      function rN(t10) {
        var e10 = rL(t10.display), r10 = t10.options.lineWrapping, n10 = r10 && Math.max(5, t10.display.scroller.clientWidth / rS(t10.display) - 3);
        return function(i10) {
          if (eF(t10.doc, i10)) return 0;
          var o2 = 0;
          if (i10.widgets) for (var a2 = 0; a2 < i10.widgets.length; a2++) i10.widgets[a2].height && (o2 += i10.widgets[a2].height);
          return r10 ? o2 + (Math.ceil(i10.text.length / n10) || 1) * e10 : o2 + e10;
        };
      }
      function rO(t10) {
        var e10 = t10.doc, r10 = rN(t10);
        e10.iter(function(t11) {
          var e11 = r10(t11);
          e11 != t11.height && t22(t11, e11);
        });
      }
      function rI(t10, e10, r10, n10) {
        var i10 = t10.display;
        if (!r10 && "true" == tE(e10).getAttribute("cm-not-content")) return null;
        var o2, a2, l2 = i10.lineSpace.getBoundingClientRect();
        try {
          o2 = e10.clientX - l2.left, a2 = e10.clientY - l2.top;
        } catch (t11) {
          return null;
        }
        var s2, u2 = rx(t10, o2, a2);
        if (n10 && u2.xRel > 0 && (s2 = tJ(t10.doc, u2.line).text).length == u2.ch) {
          var c2 = Z(s2, s2.length, t10.options.tabSize) - s2.length;
          u2 = t7(u2.line, Math.max(0, Math.round((o2 - e9(t10.display).left) / rS(t10.display)) - c2));
        }
        return u2;
      }
      function rD(t10, e10) {
        if (e10 >= t10.display.viewTo || (e10 -= t10.display.viewFrom) < 0) return null;
        for (var r10 = t10.display.view, n10 = 0; n10 < r10.length; n10++) if ((e10 -= r10[n10].size) < 0) return n10;
      }
      function rW(t10, e10, r10, n10) {
        null == e10 && (e10 = t10.doc.first), null == r10 && (r10 = t10.doc.first + t10.doc.size), n10 || (n10 = 0);
        var i10 = t10.display;
        if (n10 && r10 < i10.viewTo && (null == i10.updateLineNumbers || i10.updateLineNumbers > e10) && (i10.updateLineNumbers = e10), t10.curOp.viewChanged = true, e10 >= i10.viewTo) eb && eD(t10.doc, e10) < i10.viewTo && rH(t10);
        else if (r10 <= i10.viewFrom) eb && eW(t10.doc, r10 + n10) > i10.viewFrom ? rH(t10) : (i10.viewFrom += n10, i10.viewTo += n10);
        else if (e10 <= i10.viewFrom && r10 >= i10.viewTo) rH(t10);
        else if (e10 <= i10.viewFrom) {
          var o2 = rE(t10, r10, r10 + n10, 1);
          o2 ? (i10.view = i10.view.slice(o2.index), i10.viewFrom = o2.lineN, i10.viewTo += n10) : rH(t10);
        } else if (r10 >= i10.viewTo) {
          var a2 = rE(t10, e10, e10, -1);
          a2 ? (i10.view = i10.view.slice(0, a2.index), i10.viewTo = a2.lineN) : rH(t10);
        } else {
          var l2 = rE(t10, e10, e10, -1), s2 = rE(t10, r10, r10 + n10, 1);
          l2 && s2 ? (i10.view = i10.view.slice(0, l2.index).concat(eK(t10, l2.lineN, s2.lineN)).concat(i10.view.slice(s2.index)), i10.viewTo += n10) : rH(t10);
        }
        var u2 = i10.externalMeasured;
        u2 && (r10 < u2.lineN ? u2.lineN += n10 : e10 < u2.lineN + u2.size && (i10.externalMeasured = null));
      }
      function rF(t10, e10, r10) {
        t10.curOp.viewChanged = true;
        var n10 = t10.display, i10 = t10.display.externalMeasured;
        if (i10 && e10 >= i10.lineN && e10 < i10.lineN + i10.size && (n10.externalMeasured = null), !(e10 < n10.viewFrom) && !(e10 >= n10.viewTo)) {
          var o2 = n10.view[rD(t10, e10)];
          if (null != o2.node) {
            var a2 = o2.changes || (o2.changes = []);
            -1 == J(a2, r10) && a2.push(r10);
          }
        }
      }
      function rH(t10) {
        t10.display.viewFrom = t10.display.viewTo = t10.doc.first, t10.display.view = [], t10.display.viewOffset = 0;
      }
      function rE(t10, e10, r10, n10) {
        var i10, o2 = rD(t10, e10), a2 = t10.display.view;
        if (!eb || r10 == t10.doc.first + t10.doc.size) return { index: o2, lineN: r10 };
        for (var l2 = t10.display.viewFrom, s2 = 0; s2 < o2; s2++) l2 += a2[s2].size;
        if (l2 != e10) {
          if (n10 > 0) {
            if (o2 == a2.length - 1) return null;
            i10 = l2 + a2[o2].size - e10, o2++;
          } else i10 = l2 - e10;
          e10 += i10, r10 += i10;
        }
        for (; eD(t10.doc, r10) != r10; ) {
          if (o2 == (n10 < 0 ? 0 : a2.length - 1)) return null;
          r10 += n10 * a2[o2 - (n10 < 0 ? 1 : 0)].size, o2 += n10;
        }
        return { index: o2, lineN: r10 };
      }
      function rP(t10) {
        for (var e10 = t10.display.view, r10 = 0, n10 = 0; n10 < e10.length; n10++) {
          var i10 = e10[n10];
          !i10.hidden && (!i10.node || i10.changes) && ++r10;
        }
        return r10;
      }
      function rz(t10) {
        t10.display.input.showSelection(t10.display.input.prepareSelection());
      }
      function rR(t10, e10) {
        void 0 === e10 && (e10 = true);
        var r10 = t10.doc, n10 = {}, i10 = n10.cursors = document.createDocumentFragment(), o2 = n10.selection = document.createDocumentFragment(), a2 = t10.options.$customCursor;
        a2 && (e10 = true);
        for (var l2 = 0; l2 < r10.sel.ranges.length; l2++) {
          if (e10 || l2 != r10.sel.primIndex) {
            var s2 = r10.sel.ranges[l2];
            if (!(s2.from().line >= t10.display.viewTo) && !(s2.to().line < t10.display.viewFrom)) {
              var u2 = s2.empty();
              if (a2) {
                var c2 = a2(t10, s2);
                c2 && rB(t10, c2, i10);
              } else (u2 || t10.options.showCursorWhenSelecting) && rB(t10, s2.head, i10);
              u2 || function(t11, e11, r11) {
                var n11 = t11.display, i11 = t11.doc, o3 = document.createDocumentFragment(), a3 = e9(t11.display), l3 = a3.left, s3 = Math.max(n11.sizerWidth, re(t11) - n11.sizer.offsetLeft) - a3.right, u3 = "ltr" == i11.direction;
                function c3(t12, e12, r12, n12) {
                  e12 < 0 && (e12 = 0), e12 = Math.round(e12), n12 = Math.round(n12), o3.appendChild(z("div", null, "CodeMirror-selected", "position: absolute; left: " + t12 + "px;\n                             top: " + e12 + "px; width: " + (null == r12 ? s3 - t12 : r12) + "px;\n                             height: " + (n12 - e12) + "px"));
                }
                function f2(e12, r12, n12) {
                  var o4, a4, f3 = tJ(i11, e12), h3 = f3.text.length;
                  function d3(r13, n13) {
                    return rm(t11, t7(e12, r13), "div", f3, n13);
                  }
                  function p3(e13, r13, n13) {
                    var i12 = rC(t11, f3, null, e13), o5 = "ltr" == r13 == ("after" == n13) ? "left" : "right";
                    return d3("after" == n13 ? i12.begin : i12.end - (/\s/.test(f3.text.charAt(i12.end - 1)) ? 2 : 1), o5)[o5];
                  }
                  var g3 = tM(f3, i11.direction);
                  return function(t12, e13, r13, n13) {
                    if (!t12) return n13(e13, r13, "ltr", 0);
                    for (var i12 = false, o5 = 0; o5 < t12.length; ++o5) {
                      var a5 = t12[o5];
                      (a5.from < r13 && a5.to > e13 || e13 == r13 && a5.to == e13) && (n13(Math.max(a5.from, e13), Math.min(a5.to, r13), 1 == a5.level ? "rtl" : "ltr", o5), i12 = true);
                    }
                    i12 || n13(e13, r13, "ltr");
                  }(g3, r12 || 0, null == n12 ? h3 : n12, function(t12, e13, i12, f4) {
                    var v3, m3, y3, b2, w2 = "ltr" == i12, x2 = d3(t12, w2 ? "left" : "right"), M2 = d3(e13 - 1, w2 ? "right" : "left"), C2 = null == r12 && 0 == t12, k2 = null == n12 && e13 == h3, L2 = 0 == f4, S2 = !g3 || f4 == g3.length - 1;
                    if (M2.top - x2.top <= 3) {
                      var T2 = (u3 ? C2 : k2) && L2, A2 = (u3 ? k2 : C2) && S2, N2 = T2 ? l3 : (w2 ? x2 : M2).left, O2 = A2 ? s3 : (w2 ? M2 : x2).right;
                      c3(N2, x2.top, O2 - N2, x2.bottom);
                    } else w2 ? (v3 = u3 && C2 && L2 ? l3 : x2.left, m3 = u3 ? s3 : p3(t12, i12, "before"), y3 = u3 ? l3 : p3(e13, i12, "after"), b2 = u3 && k2 && S2 ? s3 : M2.right) : (v3 = u3 ? p3(t12, i12, "before") : l3, m3 = !u3 && C2 && L2 ? s3 : x2.right, y3 = !u3 && k2 && S2 ? l3 : M2.left, b2 = u3 ? p3(e13, i12, "after") : s3), c3(v3, x2.top, m3 - v3, x2.bottom), x2.bottom < M2.top && c3(l3, x2.bottom, null, M2.top), c3(y3, M2.top, b2 - y3, M2.bottom);
                    (!o4 || 0 > rV(x2, o4)) && (o4 = x2), 0 > rV(M2, o4) && (o4 = M2), (!a4 || 0 > rV(x2, a4)) && (a4 = x2), 0 > rV(M2, a4) && (a4 = M2);
                  }), { start: o4, end: a4 };
                }
                var h2 = e11.from(), d2 = e11.to();
                if (h2.line == d2.line) f2(h2.line, h2.ch, d2.ch);
                else {
                  var p2 = tJ(i11, h2.line), g2 = tJ(i11, d2.line), v2 = eI(p2) == eI(g2), m2 = f2(h2.line, h2.ch, v2 ? p2.text.length + 1 : null).end, y2 = f2(d2.line, v2 ? 0 : null, d2.ch).start;
                  v2 && (m2.top < y2.top - 2 ? (c3(m2.right, m2.top, null, m2.bottom), c3(l3, y2.top, y2.left, y2.bottom)) : c3(m2.right, m2.top, y2.left - m2.right, m2.bottom)), m2.bottom < y2.top && c3(l3, m2.bottom, null, y2.top);
                }
                r11.appendChild(o3);
              }(t10, s2, o2);
            }
          }
        }
        return n10;
      }
      function rB(t10, e10, r10) {
        var n10 = ry(t10, e10, "div", null, null, !t10.options.singleCursorHeightPerLine), i10 = r10.appendChild(z("div", "\xA0", "CodeMirror-cursor"));
        if (i10.style.left = n10.left + "px", i10.style.top = n10.top + "px", i10.style.height = Math.max(0, n10.bottom - n10.top) * t10.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(t10.getWrapperElement().className)) {
          var o2 = rm(t10, e10, "div", null, null), a2 = o2.right - o2.left;
          i10.style.width = (a2 > 0 ? a2 : t10.defaultCharWidth()) + "px";
        }
        if (n10.other) {
          var l2 = r10.appendChild(z("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          l2.style.display = "", l2.style.left = n10.other.left + "px", l2.style.top = n10.other.top + "px", l2.style.height = (n10.other.bottom - n10.other.top) * 0.85 + "px";
        }
      }
      function rV(t10, e10) {
        return t10.top - e10.top || t10.left - e10.left;
      }
      function rG(t10) {
        if (t10.state.focused) {
          var e10 = t10.display;
          clearInterval(e10.blinker);
          var r10 = true;
          e10.cursorDiv.style.visibility = "", t10.options.cursorBlinkRate > 0 ? e10.blinker = setInterval(function() {
            t10.hasFocus() || r_(t10), e10.cursorDiv.style.visibility = (r10 = !r10) ? "" : "hidden";
          }, t10.options.cursorBlinkRate) : t10.options.cursorBlinkRate < 0 && (e10.cursorDiv.style.visibility = "hidden");
        }
      }
      function rU(t10) {
        t10.hasFocus() || (t10.display.input.focus(), t10.state.focused || rq(t10));
      }
      function rj(t10) {
        t10.state.delayingBlurEvent = true, setTimeout(function() {
          t10.state.delayingBlurEvent && (t10.state.delayingBlurEvent = false, t10.state.focused && r_(t10));
        }, 100);
      }
      function rq(t10, e10) {
        t10.state.delayingBlurEvent && !t10.state.draggingText && (t10.state.delayingBlurEvent = false), "nocursor" != t10.options.readOnly && (t10.state.focused || (tT(t10, "focus", t10, e10), t10.state.focused = true, G(t10.display.wrapper, "CodeMirror-focused"), !t10.curOp && t10.display.selForContextMenu != t10.doc.sel && (t10.display.input.reset(), m && setTimeout(function() {
          return t10.display.input.reset(true);
        }, 20)), t10.display.input.receivedFocus()), rG(t10));
      }
      function r_(t10, e10) {
        !t10.state.delayingBlurEvent && (t10.state.focused && (tT(t10, "blur", t10, e10), t10.state.focused = false, H(t10.display.wrapper, "CodeMirror-focused")), clearInterval(t10.display.blinker), setTimeout(function() {
          t10.state.focused || (t10.display.shift = false);
        }, 150));
      }
      function rK(t10) {
        for (var e10 = t10.display, r10 = e10.lineDiv.offsetTop, n10 = Math.max(0, e10.scroller.getBoundingClientRect().top), i10 = e10.lineDiv.getBoundingClientRect().top, o2 = 0, a2 = 0; a2 < e10.view.length; a2++) {
          var l2 = e10.view[a2], s2 = t10.options.lineWrapping, u2 = void 0, c2 = 0;
          if (!l2.hidden) {
            if (i10 += l2.line.height, g && v < 8) {
              var f2 = l2.node.offsetTop + l2.node.offsetHeight;
              u2 = f2 - r10, r10 = f2;
            } else {
              var h2 = l2.node.getBoundingClientRect();
              u2 = h2.bottom - h2.top, !s2 && l2.text.firstChild && (c2 = l2.text.firstChild.getBoundingClientRect().right - h2.left - 1);
            }
            var d2 = l2.line.height - u2;
            if ((d2 > 5e-3 || d2 < -5e-3) && (i10 < n10 && (o2 -= d2), t22(l2.line, u2), rX(l2.line), l2.rest)) for (var p2 = 0; p2 < l2.rest.length; p2++) rX(l2.rest[p2]);
            if (c2 > t10.display.sizerWidth) {
              var m2 = Math.ceil(c2 / rS(t10.display));
              m2 > t10.display.maxLineLength && (t10.display.maxLineLength = m2, t10.display.maxLine = l2.line, t10.display.maxLineChanged = true);
            }
          }
        }
        Math.abs(o2) > 2 && (e10.scroller.scrollTop += o2);
      }
      function rX(t10) {
        if (t10.widgets) for (var e10 = 0; e10 < t10.widgets.length; ++e10) {
          var r10 = t10.widgets[e10], n10 = r10.node.parentNode;
          n10 && (r10.height = n10.offsetHeight);
        }
      }
      function r$(t10, e10, r10) {
        var n10 = r10 && null != r10.top ? Math.max(0, r10.top) : t10.scroller.scrollTop;
        n10 = Math.floor(n10 - e7(t10));
        var i10 = r10 && null != r10.bottom ? r10.bottom : n10 + t10.wrapper.clientHeight, o2 = t4(e10, n10), a2 = t4(e10, i10);
        if (r10 && r10.ensure) {
          var l2 = r10.ensure.from.line, s2 = r10.ensure.to.line;
          l2 < o2 ? (o2 = l2, a2 = t4(e10, eH(tJ(e10, l2)) + t10.wrapper.clientHeight)) : Math.min(s2, e10.lastLine()) >= a2 && (o2 = t4(e10, eH(tJ(e10, s2)) - t10.wrapper.clientHeight), a2 = s2);
        }
        return { from: o2, to: Math.max(a2, o2 + 1) };
      }
      function rY(t10, e10) {
        var r10 = t10.display, n10 = rL(t10.display);
        e10.top < 0 && (e10.top = 0);
        var i10 = t10.curOp && null != t10.curOp.scrollTop ? t10.curOp.scrollTop : r10.scroller.scrollTop, o2 = rr(t10), a2 = {};
        e10.bottom - e10.top > o2 && (e10.bottom = e10.top + o2);
        var l2 = t10.doc.height + e8(r10), s2 = e10.top < n10, u2 = e10.bottom > l2 - n10;
        if (e10.top < i10) a2.scrollTop = s2 ? 0 : e10.top;
        else if (e10.bottom > i10 + o2) {
          var c2 = Math.min(e10.top, (u2 ? l2 : e10.bottom) - o2);
          c2 != i10 && (a2.scrollTop = c2);
        }
        var f2 = t10.options.fixedGutter ? 0 : r10.gutters.offsetWidth, h2 = t10.curOp && null != t10.curOp.scrollLeft ? t10.curOp.scrollLeft : r10.scroller.scrollLeft - f2, d2 = re(t10) - r10.gutters.offsetWidth, p2 = e10.right - e10.left > d2;
        return p2 && (e10.right = e10.left + d2), e10.left < 10 ? a2.scrollLeft = 0 : e10.left < h2 ? a2.scrollLeft = Math.max(0, e10.left + f2 - (p2 ? 0 : 10)) : e10.right > d2 + h2 - 3 && (a2.scrollLeft = e10.right + (p2 ? 0 : 10) - d2), a2;
      }
      function rZ(t10, e10) {
        null != e10 && (r0(t10), t10.curOp.scrollTop = (null == t10.curOp.scrollTop ? t10.doc.scrollTop : t10.curOp.scrollTop) + e10);
      }
      function rQ(t10) {
        r0(t10);
        var e10 = t10.getCursor();
        t10.curOp.scrollToPos = { from: e10, to: e10, margin: t10.options.cursorScrollMargin };
      }
      function rJ(t10, e10, r10) {
        (null != e10 || null != r10) && r0(t10), null != e10 && (t10.curOp.scrollLeft = e10), null != r10 && (t10.curOp.scrollTop = r10);
      }
      function r0(t10) {
        var e10 = t10.curOp.scrollToPos;
        if (e10) {
          t10.curOp.scrollToPos = null;
          var r10 = rb(t10, e10.from), n10 = rb(t10, e10.to);
          r1(t10, r10, n10, e10.margin);
        }
      }
      function r1(t10, e10, r10, n10) {
        var i10 = rY(t10, { left: Math.min(e10.left, r10.left), top: Math.min(e10.top, r10.top) - n10, right: Math.max(e10.right, r10.right), bottom: Math.max(e10.bottom, r10.bottom) + n10 });
        rJ(t10, i10.scrollLeft, i10.scrollTop);
      }
      function r2(t10, e10) {
        !(2 > Math.abs(t10.doc.scrollTop - e10)) && (f || np(t10, { top: e10 }), r3(t10, e10, true), f && np(t10), nu(t10, 100));
      }
      function r3(t10, e10, r10) {
        e10 = Math.max(0, Math.min(t10.display.scroller.scrollHeight - t10.display.scroller.clientHeight, e10)), (t10.display.scroller.scrollTop != e10 || r10) && (t10.doc.scrollTop = e10, t10.display.scrollbars.setScrollTop(e10), t10.display.scroller.scrollTop != e10 && (t10.display.scroller.scrollTop = e10));
      }
      function r4(t10, e10, r10, n10) {
        e10 = Math.max(0, Math.min(e10, t10.display.scroller.scrollWidth - t10.display.scroller.clientWidth)), ((r10 ? e10 != t10.doc.scrollLeft : !(2 > Math.abs(t10.doc.scrollLeft - e10))) || n10) && (t10.doc.scrollLeft = e10, nm(t10), t10.display.scroller.scrollLeft != e10 && (t10.display.scroller.scrollLeft = e10), t10.display.scrollbars.setScrollLeft(e10));
      }
      function r5(t10) {
        var e10 = t10.display, r10 = e10.gutters.offsetWidth, n10 = Math.round(t10.doc.height + e8(t10.display));
        return { clientHeight: e10.scroller.clientHeight, viewHeight: e10.wrapper.clientHeight, scrollWidth: e10.scroller.scrollWidth, clientWidth: e10.scroller.clientWidth, viewWidth: e10.wrapper.clientWidth, barLeft: t10.options.fixedGutter ? r10 : 0, docHeight: n10, scrollHeight: n10 + rt(t10) + e10.barHeight, nativeBarWidth: e10.nativeBarWidth, gutterWidth: r10 };
      }
      var r6 = function(t10, e10, r10) {
        this.cm = r10;
        var n10 = this.vert = z("div", [z("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i10 = this.horiz = z("div", [z("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        n10.tabIndex = i10.tabIndex = -1, t10(n10), t10(i10), tk(n10, "scroll", function() {
          n10.clientHeight && e10(n10.scrollTop, "vertical");
        }), tk(i10, "scroll", function() {
          i10.clientWidth && e10(i10.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = false, g && v < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };
      r6.prototype.update = function(t10) {
        var e10 = t10.scrollWidth > t10.clientWidth + 1, r10 = t10.scrollHeight > t10.clientHeight + 1, n10 = t10.nativeBarWidth;
        if (r10) {
          this.vert.style.display = "block", this.vert.style.bottom = e10 ? n10 + "px" : "0";
          var i10 = t10.viewHeight - (e10 ? n10 : 0);
          this.vert.firstChild.style.height = Math.max(0, t10.scrollHeight - t10.clientHeight + i10) + "px";
        } else this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (e10) {
          this.horiz.style.display = "block", this.horiz.style.right = r10 ? n10 + "px" : "0", this.horiz.style.left = t10.barLeft + "px";
          var o2 = t10.viewWidth - t10.barLeft - (r10 ? n10 : 0);
          this.horiz.firstChild.style.width = Math.max(0, t10.scrollWidth - t10.clientWidth + o2) + "px";
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && t10.clientHeight > 0 && (0 == n10 && this.zeroWidthHack(), this.checkedZeroWidth = true), { right: r10 ? n10 : 0, bottom: e10 ? n10 : 0 };
      }, r6.prototype.setScrollLeft = function(t10) {
        this.horiz.scrollLeft != t10 && (this.horiz.scrollLeft = t10), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, r6.prototype.setScrollTop = function(t10) {
        this.vert.scrollTop != t10 && (this.vert.scrollTop = t10), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, r6.prototype.zeroWidthHack = function() {
        this.horiz.style.height = this.vert.style.width = A && !C ? "12px" : "18px", this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new Q(), this.disableVert = new Q();
      }, r6.prototype.enableZeroWidthBar = function(t10, e10, r10) {
        t10.style.visibility = "", e10.set(1e3, function n10() {
          var i10 = t10.getBoundingClientRect();
          ("vert" == r10 ? document.elementFromPoint(i10.right - 1, (i10.top + i10.bottom) / 2) : document.elementFromPoint((i10.right + i10.left) / 2, i10.bottom - 1)) != t10 ? t10.style.visibility = "hidden" : e10.set(1e3, n10);
        });
      }, r6.prototype.clear = function() {
        var t10 = this.horiz.parentNode;
        t10.removeChild(this.horiz), t10.removeChild(this.vert);
      };
      var r7 = function() {
      };
      function r8(t10, e10) {
        e10 || (e10 = r5(t10));
        var r10 = t10.display.barWidth, n10 = t10.display.barHeight;
        r9(t10, e10);
        for (var i10 = 0; i10 < 4 && r10 != t10.display.barWidth || n10 != t10.display.barHeight; i10++) r10 != t10.display.barWidth && t10.options.lineWrapping && rK(t10), r9(t10, r5(t10)), r10 = t10.display.barWidth, n10 = t10.display.barHeight;
      }
      function r9(t10, e10) {
        var r10 = t10.display, n10 = r10.scrollbars.update(e10);
        r10.sizer.style.paddingRight = (r10.barWidth = n10.right) + "px", r10.sizer.style.paddingBottom = (r10.barHeight = n10.bottom) + "px", r10.heightForcer.style.borderBottom = n10.bottom + "px solid transparent", n10.right && n10.bottom ? (r10.scrollbarFiller.style.display = "block", r10.scrollbarFiller.style.height = n10.bottom + "px", r10.scrollbarFiller.style.width = n10.right + "px") : r10.scrollbarFiller.style.display = "", n10.bottom && t10.options.coverGutterNextToScrollbar && t10.options.fixedGutter ? (r10.gutterFiller.style.display = "block", r10.gutterFiller.style.height = n10.bottom + "px", r10.gutterFiller.style.width = e10.gutterWidth + "px") : r10.gutterFiller.style.display = "";
      }
      r7.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, r7.prototype.setScrollLeft = function() {
      }, r7.prototype.setScrollTop = function() {
      }, r7.prototype.clear = function() {
      };
      var nt = { native: r6, null: r7 };
      function ne(t10) {
        t10.display.scrollbars && (t10.display.scrollbars.clear(), t10.display.scrollbars.addClass && H(t10.display.wrapper, t10.display.scrollbars.addClass)), t10.display.scrollbars = new nt[t10.options.scrollbarStyle](function(e10) {
          t10.display.wrapper.insertBefore(e10, t10.display.scrollbarFiller), tk(e10, "mousedown", function() {
            t10.state.focused && setTimeout(function() {
              return t10.display.input.focus();
            }, 0);
          }), e10.setAttribute("cm-not-content", "true");
        }, function(e10, r10) {
          "horizontal" == r10 ? r4(t10, e10) : r2(t10, e10);
        }, t10), t10.display.scrollbars.addClass && G(t10.display.wrapper, t10.display.scrollbars.addClass);
      }
      var nr = 0;
      function nn(t10) {
        var e10;
        t10.curOp = { cm: t10, viewChanged: false, startHeight: t10.doc.height, forceUpdate: false, updateInput: 0, typing: false, changeObjs: null, cursorActivityHandlers: null, cursorActivityCalled: 0, selectionChanged: false, updateMaxLine: false, scrollLeft: null, scrollTop: null, scrollToPos: null, focus: false, id: ++nr, markArrays: null }, e10 = t10.curOp, eX ? eX.ops.push(e10) : e10.ownsGroup = eX = { ops: [e10], delayedCallbacks: [] };
      }
      function ni(t10) {
        var e10 = t10.curOp;
        e10 && function(t11, e11) {
          var r10 = t11.ownsGroup;
          if (r10) try {
            !function(t12) {
              var e12 = t12.delayedCallbacks, r11 = 0;
              do {
                for (; r11 < e12.length; r11++) e12[r11].call(null);
                for (var n10 = 0; n10 < t12.ops.length; n10++) {
                  var i10 = t12.ops[n10];
                  if (i10.cursorActivityHandlers) for (; i10.cursorActivityCalled < i10.cursorActivityHandlers.length; ) i10.cursorActivityHandlers[i10.cursorActivityCalled++].call(null, i10.cm);
                }
              } while (r11 < e12.length);
            }(r10);
          } finally {
            eX = null, e11(r10);
          }
        }(e10, function(t11) {
          for (var e11 = 0; e11 < t11.ops.length; e11++) t11.ops[e11].cm.curOp = null;
          (function(t12) {
            for (var e12, r10 = t12.ops, n10 = 0; n10 < r10.length; n10++) (function(t13) {
              var e13 = t13.cm, r11 = e13.display;
              (function(t14) {
                var e14 = t14.display;
                !e14.scrollbarsClipped && e14.scroller.offsetWidth && (e14.nativeBarWidth = e14.scroller.offsetWidth - e14.scroller.clientWidth, e14.heightForcer.style.height = rt(t14) + "px", e14.sizer.style.marginBottom = -e14.nativeBarWidth + "px", e14.sizer.style.borderRightWidth = rt(t14) + "px", e14.scrollbarsClipped = true);
              })(e13), t13.updateMaxLine && eP(e13), t13.mustUpdate = t13.viewChanged || t13.forceUpdate || null != t13.scrollTop || t13.scrollToPos && (t13.scrollToPos.from.line < r11.viewFrom || t13.scrollToPos.to.line >= r11.viewTo) || r11.maxLineChanged && e13.options.lineWrapping, t13.update = t13.mustUpdate && new nf(e13, t13.mustUpdate && { top: t13.scrollTop, ensure: t13.scrollToPos }, t13.forceUpdate);
            })(r10[n10]);
            for (var i10 = 0; i10 < r10.length; i10++) {
              (e12 = r10[i10]).updatedDisplay = e12.mustUpdate && nh(e12.cm, e12.update);
            }
            for (var o2 = 0; o2 < r10.length; o2++) (function(t13) {
              var e13, r11, n11 = t13.cm, i11 = n11.display;
              t13.updatedDisplay && rK(n11), t13.barMeasure = r5(n11), i11.maxLineChanged && !n11.options.lineWrapping && (t13.adjustWidthTo = (e13 = i11.maxLine, r11 = i11.maxLine.text.length, ra(n11, ro(n11, e13), r11, void 0)).left + 3, n11.display.sizerWidth = t13.adjustWidthTo, t13.barMeasure.scrollWidth = Math.max(i11.scroller.clientWidth, i11.sizer.offsetLeft + t13.adjustWidthTo + rt(n11) + n11.display.barWidth), t13.maxScrollLeft = Math.max(0, i11.sizer.offsetLeft + t13.adjustWidthTo - re(n11))), (t13.updatedDisplay || t13.selectionChanged) && (t13.preparedSelection = i11.input.prepareSelection());
            })(r10[o2]);
            for (var a2 = 0; a2 < r10.length; a2++) (function(t13) {
              var e13 = t13.cm;
              null != t13.adjustWidthTo && (e13.display.sizer.style.minWidth = t13.adjustWidthTo + "px", t13.maxScrollLeft < e13.doc.scrollLeft && r4(e13, Math.min(e13.display.scroller.scrollLeft, t13.maxScrollLeft), true), e13.display.maxLineChanged = false);
              var r11 = t13.focus && t13.focus == V(_(e13));
              t13.preparedSelection && e13.display.input.showSelection(t13.preparedSelection, r11), (t13.updatedDisplay || t13.startHeight != e13.doc.height) && r8(e13, t13.barMeasure), t13.updatedDisplay && nv(e13, t13.barMeasure), t13.selectionChanged && rG(e13), e13.state.focused && t13.updateInput && e13.display.input.reset(t13.typing), r11 && rU(t13.cm);
            })(r10[a2]);
            for (var l2 = 0; l2 < r10.length; l2++) (function(t13) {
              var e13 = t13.cm, r11 = e13.display, n11 = e13.doc;
              if (t13.updatedDisplay && nd(e13, t13.update), null != r11.wheelStartX && (null != t13.scrollTop || null != t13.scrollLeft || t13.scrollToPos) && (r11.wheelStartX = r11.wheelStartY = null), null != t13.scrollTop && r3(e13, t13.scrollTop, t13.forceScroll), null != t13.scrollLeft && r4(e13, t13.scrollLeft, true, true), t13.scrollToPos) {
                var i11 = function(t14, e14, r12, n12) {
                  null == n12 && (n12 = 0), t14.options.lineWrapping || e14 != r12 || (r12 = "before" == e14.sticky ? t7(e14.line, e14.ch + 1, "before") : e14, e14 = e14.ch ? t7(e14.line, "before" == e14.sticky ? e14.ch - 1 : e14.ch, "after") : e14);
                  for (var i12, o4 = 0; o4 < 5; o4++) {
                    var a4 = false, l4 = ry(t14, e14), s3 = r12 && r12 != e14 ? ry(t14, r12) : l4, u2 = rY(t14, i12 = { left: Math.min(l4.left, s3.left), top: Math.min(l4.top, s3.top) - n12, right: Math.max(l4.left, s3.left), bottom: Math.max(l4.bottom, s3.bottom) + n12 }), c2 = t14.doc.scrollTop, f2 = t14.doc.scrollLeft;
                    if (null != u2.scrollTop && (r2(t14, u2.scrollTop), Math.abs(t14.doc.scrollTop - c2) > 1 && (a4 = true)), null != u2.scrollLeft && (r4(t14, u2.scrollLeft), Math.abs(t14.doc.scrollLeft - f2) > 1 && (a4 = true)), !a4) break;
                  }
                  return i12;
                }(e13, ei(n11, t13.scrollToPos.from), ei(n11, t13.scrollToPos.to), t13.scrollToPos.margin);
                !function(t14, e14) {
                  if (!tA(t14, "scrollCursorIntoView")) {
                    var r12 = t14.display, n12 = r12.sizer.getBoundingClientRect(), i12 = null, o4 = r12.wrapper.ownerDocument;
                    if (e14.top + n12.top < 0 ? i12 = true : e14.bottom + n12.top > (o4.defaultView.innerHeight || o4.documentElement.clientHeight) && (i12 = false), null != i12 && !k) {
                      var a4 = z("div", "\u200B", null, "position: absolute;\n                         top: " + (e14.top - r12.viewOffset - e7(t14.display)) + "px;\n                         height: " + (e14.bottom - e14.top + rt(t14) + r12.barHeight) + "px;\n                         left: " + e14.left + "px; width: " + Math.max(2, e14.right - e14.left) + "px;");
                      t14.display.lineSpace.appendChild(a4), a4.scrollIntoView(i12), t14.display.lineSpace.removeChild(a4);
                    }
                  }
                }(e13, i11);
              }
              var o3 = t13.maybeHiddenMarkers, a3 = t13.maybeUnhiddenMarkers;
              if (o3) for (var l3 = 0; l3 < o3.length; ++l3) o3[l3].lines.length || tT(o3[l3], "hide");
              if (a3) for (var s2 = 0; s2 < a3.length; ++s2) a3[s2].lines.length && tT(a3[s2], "unhide");
              r11.wrapper.offsetHeight && (n11.scrollTop = e13.display.scroller.scrollTop), t13.changeObjs && tT(e13, "changes", e13, t13.changeObjs), t13.update && t13.update.finish();
            })(r10[l2]);
          })(t11);
        });
      }
      function no(t10, e10) {
        if (t10.curOp) return e10();
        nn(t10);
        try {
          return e10();
        } finally {
          ni(t10);
        }
      }
      function na(t10, e10) {
        return function() {
          if (t10.curOp) return e10.apply(t10, arguments);
          nn(t10);
          try {
            return e10.apply(t10, arguments);
          } finally {
            ni(t10);
          }
        };
      }
      function nl(t10) {
        return function() {
          if (this.curOp) return t10.apply(this, arguments);
          nn(this);
          try {
            return t10.apply(this, arguments);
          } finally {
            ni(this);
          }
        };
      }
      function ns(t10) {
        return function() {
          var e10 = this.cm;
          if (!e10 || e10.curOp) return t10.apply(this, arguments);
          nn(e10);
          try {
            return t10.apply(this, arguments);
          } finally {
            ni(e10);
          }
        };
      }
      function nu(t10, e10) {
        t10.doc.highlightFrontier < t10.display.viewTo && t10.state.highlight.set(e10, $(nc, t10));
      }
      function nc(t10) {
        var e10 = t10.doc;
        if (!(e10.highlightFrontier >= t10.display.viewTo)) {
          var r10 = +/* @__PURE__ */ new Date() + t10.options.workTime, n10 = ec(t10, e10.highlightFrontier), i10 = [];
          e10.iter(n10.line, Math.min(e10.first + e10.size, t10.display.viewTo + 500), function(o2) {
            if (n10.line >= t10.display.viewFrom) {
              var a2 = o2.styles, l2 = o2.text.length > t10.options.maxHighlightLength ? t$(e10.mode, n10.state) : null, s2 = es(t10, o2, n10, true);
              l2 && (n10.state = l2), o2.styles = s2.styles;
              var u2 = o2.styleClasses, c2 = s2.classes;
              c2 ? o2.styleClasses = c2 : u2 && (o2.styleClasses = null);
              for (var f2 = !a2 || a2.length != o2.styles.length || u2 != c2 && (!u2 || !c2 || u2.bgClass != c2.bgClass || u2.textClass != c2.textClass), h2 = 0; !f2 && h2 < a2.length; ++h2) f2 = a2[h2] != o2.styles[h2];
              f2 && i10.push(n10.line), o2.stateAfter = n10.save(), n10.nextLine();
            } else o2.text.length <= t10.options.maxHighlightLength && ef(t10, o2.text, n10), o2.stateAfter = n10.line % 5 == 0 ? n10.save() : null, n10.nextLine();
            if (+/* @__PURE__ */ new Date() > r10) return nu(t10, t10.options.workDelay), true;
          }), e10.highlightFrontier = n10.line, e10.modeFrontier = Math.max(e10.modeFrontier, n10.line), i10.length && no(t10, function() {
            for (var e11 = 0; e11 < i10.length; e11++) rF(t10, i10[e11], "text");
          });
        }
      }
      var nf = function(t10, e10, r10) {
        var n10 = t10.display;
        this.viewport = e10, this.visible = r$(n10, t10.doc, e10), this.editorIsHidden = !n10.wrapper.offsetWidth, this.wrapperHeight = n10.wrapper.clientHeight, this.wrapperWidth = n10.wrapper.clientWidth, this.oldDisplayWidth = re(t10), this.force = r10, this.dims = rT(t10), this.events = [];
      };
      function nh(t10, e10) {
        var r10, n10, i10, o2 = t10.display, a2 = t10.doc;
        if (e10.editorIsHidden) return rH(t10), false;
        if (!e10.force && e10.visible.from >= o2.viewFrom && e10.visible.to <= o2.viewTo && (null == o2.updateLineNumbers || o2.updateLineNumbers >= o2.viewTo) && o2.renderedView == o2.view && 0 == rP(t10)) return false;
        ny(t10) && (rH(t10), e10.dims = rT(t10));
        var l2 = a2.first + a2.size, s2 = Math.max(e10.visible.from - t10.options.viewportMargin, a2.first), u2 = Math.min(l2, e10.visible.to + t10.options.viewportMargin);
        o2.viewFrom < s2 && s2 - o2.viewFrom < 20 && (s2 = Math.max(a2.first, o2.viewFrom)), o2.viewTo > u2 && o2.viewTo - u2 < 20 && (u2 = Math.min(l2, o2.viewTo)), eb && (s2 = eD(t10.doc, s2), u2 = eW(t10.doc, u2));
        var c2 = s2 != o2.viewFrom || u2 != o2.viewTo || o2.lastWrapHeight != e10.wrapperHeight || o2.lastWrapWidth != e10.wrapperWidth;
        r10 = s2, n10 = u2, 0 == (i10 = t10.display).view.length || r10 >= i10.viewTo || n10 <= i10.viewFrom ? (i10.view = eK(t10, r10, n10), i10.viewFrom = r10) : (i10.viewFrom > r10 ? i10.view = eK(t10, r10, i10.viewFrom).concat(i10.view) : i10.viewFrom < r10 && (i10.view = i10.view.slice(rD(t10, r10))), i10.viewFrom = r10, i10.viewTo < n10 ? i10.view = i10.view.concat(eK(t10, i10.viewTo, n10)) : i10.viewTo > n10 && (i10.view = i10.view.slice(0, rD(t10, n10)))), i10.viewTo = n10, o2.viewOffset = eH(tJ(t10.doc, o2.viewFrom)), t10.display.mover.style.top = o2.viewOffset + "px";
        var f2 = rP(t10);
        if (!c2 && 0 == f2 && !e10.force && o2.renderedView == o2.view && (null == o2.updateLineNumbers || o2.updateLineNumbers >= o2.viewTo)) return false;
        var h2 = function(t11) {
          if (t11.hasFocus()) return null;
          var e11 = V(_(t11));
          if (!e11 || !B(t11.display.lineDiv, e11)) return null;
          var r11 = { activeElt: e11 };
          if (window.getSelection) {
            var n11 = X(t11).getSelection();
            n11.anchorNode && n11.extend && B(t11.display.lineDiv, n11.anchorNode) && (r11.anchorNode = n11.anchorNode, r11.anchorOffset = n11.anchorOffset, r11.focusNode = n11.focusNode, r11.focusOffset = n11.focusOffset);
          }
          return r11;
        }(t10);
        return f2 > 4 && (o2.lineDiv.style.display = "none"), function(t11, e11, r11) {
          var n11 = t11.display, i11 = t11.options.lineNumbers, o3 = n11.lineDiv, a3 = o3.firstChild;
          function l3(e12) {
            var r12 = e12.nextSibling;
            return m && A && t11.display.currentWheelTarget == e12 ? e12.style.display = "none" : e12.parentNode.removeChild(e12), r12;
          }
          for (var s3 = n11.view, u3 = n11.viewFrom, c3 = 0; c3 < s3.length; c3++) {
            var f3 = s3[c3];
            if (f3.hidden) ;
            else if (f3.node && f3.node.parentNode == o3) {
              for (; a3 != f3.node; ) a3 = l3(a3);
              var h3 = i11 && null != e11 && e11 <= u3 && f3.lineNumber;
              f3.changes && (J(f3.changes, "gutter") > -1 && (h3 = false), eQ(t11, f3, u3, r11)), h3 && (E(f3.lineNumber), f3.lineNumber.appendChild(document.createTextNode(t6(t11.options, u3)))), a3 = f3.node.nextSibling;
            } else {
              var d2 = function(t12, e12, r12, n12) {
                var i12 = e0(t12, e12);
                return e12.text = e12.node = i12.pre, i12.bgClass && (e12.bgClass = i12.bgClass), i12.textClass && (e12.textClass = i12.textClass), e1(t12, e12), e22(t12, e12, r12, n12), e3(t12, e12, n12), e12.node;
              }(t11, f3, u3, r11);
              o3.insertBefore(d2, a3);
            }
            u3 += f3.size;
          }
          for (; a3; ) a3 = l3(a3);
        }(t10, o2.updateLineNumbers, e10.dims), f2 > 4 && (o2.lineDiv.style.display = ""), o2.renderedView = o2.view, function(t11) {
          if (t11 && t11.activeElt && t11.activeElt != V(K(t11.activeElt)) && (t11.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(t11.activeElt.nodeName) && t11.anchorNode && B(document.body, t11.anchorNode) && B(document.body, t11.focusNode))) {
            var e11 = t11.activeElt.ownerDocument, r11 = e11.defaultView.getSelection(), n11 = e11.createRange();
            n11.setEnd(t11.anchorNode, t11.anchorOffset), n11.collapse(false), r11.removeAllRanges(), r11.addRange(n11), r11.extend(t11.focusNode, t11.focusOffset);
          }
        }(h2), E(o2.cursorDiv), E(o2.selectionDiv), o2.gutters.style.height = o2.sizer.style.minHeight = 0, c2 && (o2.lastWrapHeight = e10.wrapperHeight, o2.lastWrapWidth = e10.wrapperWidth, nu(t10, 400)), o2.updateLineNumbers = null, true;
      }
      function nd(t10, e10) {
        for (var r10 = e10.viewport, n10 = true; ; n10 = false) {
          if (n10 && t10.options.lineWrapping && e10.oldDisplayWidth != re(t10)) n10 && (e10.visible = r$(t10.display, t10.doc, r10));
          else if (r10 && null != r10.top && (r10 = { top: Math.min(t10.doc.height + e8(t10.display) - rr(t10), r10.top) }), e10.visible = r$(t10.display, t10.doc, r10), e10.visible.from >= t10.display.viewFrom && e10.visible.to <= t10.display.viewTo) break;
          if (!nh(t10, e10)) break;
          rK(t10);
          var i10 = r5(t10);
          rz(t10), r8(t10, i10), nv(t10, i10), e10.force = false;
        }
        e10.signal(t10, "update", t10), (t10.display.viewFrom != t10.display.reportedViewFrom || t10.display.viewTo != t10.display.reportedViewTo) && (e10.signal(t10, "viewportChange", t10, t10.display.viewFrom, t10.display.viewTo), t10.display.reportedViewFrom = t10.display.viewFrom, t10.display.reportedViewTo = t10.display.viewTo);
      }
      function np(t10, e10) {
        var r10 = new nf(t10, e10);
        if (nh(t10, r10)) {
          rK(t10), nd(t10, r10);
          var n10 = r5(t10);
          rz(t10), r8(t10, n10), nv(t10, n10), r10.finish();
        }
      }
      function ng(t10) {
        var e10 = t10.gutters.offsetWidth;
        t10.sizer.style.marginLeft = e10 + "px", eY(t10, "gutterChanged", t10);
      }
      function nv(t10, e10) {
        t10.display.sizer.style.minHeight = e10.docHeight + "px", t10.display.heightForcer.style.top = e10.docHeight + "px", t10.display.gutters.style.height = e10.docHeight + t10.display.barHeight + rt(t10) + "px";
      }
      function nm(t10) {
        var e10 = t10.display, r10 = e10.view;
        if (e10.alignWidgets || e10.gutters.firstChild && t10.options.fixedGutter) {
          for (var n10 = rA(e10) - e10.scroller.scrollLeft + t10.doc.scrollLeft, i10 = e10.gutters.offsetWidth, o2 = n10 + "px", a2 = 0; a2 < r10.length; a2++) if (!r10[a2].hidden) {
            t10.options.fixedGutter && (r10[a2].gutter && (r10[a2].gutter.style.left = o2), r10[a2].gutterBackground && (r10[a2].gutterBackground.style.left = o2));
            var l2 = r10[a2].alignable;
            if (l2) for (var s2 = 0; s2 < l2.length; s2++) l2[s2].style.left = o2;
          }
          t10.options.fixedGutter && (e10.gutters.style.left = n10 + i10 + "px");
        }
      }
      function ny(t10) {
        if (!t10.options.lineNumbers) return false;
        var e10 = t10.doc, r10 = t6(t10.options, e10.first + e10.size - 1), n10 = t10.display;
        if (r10.length != n10.lineNumChars) {
          var i10 = n10.measure.appendChild(z("div", [z("div", r10)], "CodeMirror-linenumber CodeMirror-gutter-elt")), o2 = i10.firstChild.offsetWidth, a2 = i10.offsetWidth - o2;
          return n10.lineGutter.style.width = "", n10.lineNumInnerWidth = Math.max(o2, n10.lineGutter.offsetWidth - a2) + 1, n10.lineNumWidth = n10.lineNumInnerWidth + a2, n10.lineNumChars = n10.lineNumInnerWidth ? r10.length : -1, n10.lineGutter.style.width = n10.lineNumWidth + "px", ng(t10.display), true;
        }
        return false;
      }
      function nb(t10, e10) {
        for (var r10 = [], n10 = false, i10 = 0; i10 < t10.length; i10++) {
          var o2 = t10[i10], a2 = null;
          if ("string" != typeof o2 && (a2 = o2.style, o2 = o2.className), "CodeMirror-linenumbers" == o2) {
            if (!e10) continue;
            n10 = true;
          }
          r10.push({ className: o2, style: a2 });
        }
        return e10 && !n10 && r10.push({ className: "CodeMirror-linenumbers", style: null }), r10;
      }
      function nw(t10) {
        var e10 = t10.gutters, r10 = t10.gutterSpecs;
        E(e10), t10.lineGutter = null;
        for (var n10 = 0; n10 < r10.length; ++n10) {
          var i10 = r10[n10], o2 = i10.className, a2 = i10.style, l2 = e10.appendChild(z("div", null, "CodeMirror-gutter " + o2));
          a2 && (l2.style.cssText = a2), "CodeMirror-linenumbers" == o2 && (t10.lineGutter = l2, l2.style.width = (t10.lineNumWidth || 1) + "px");
        }
        e10.style.display = r10.length ? "" : "none", ng(t10);
      }
      function nx(t10) {
        nw(t10.display), rW(t10), nm(t10);
      }
      function nM(t10, e10, r10, n10) {
        this.input = r10, this.scrollbarFiller = z("div", null, "CodeMirror-scrollbar-filler"), this.scrollbarFiller.setAttribute("cm-not-content", "true"), this.gutterFiller = z("div", null, "CodeMirror-gutter-filler"), this.gutterFiller.setAttribute("cm-not-content", "true"), this.lineDiv = R("div", null, "CodeMirror-code"), this.selectionDiv = z("div", null, null, "position: relative; z-index: 1"), this.cursorDiv = z("div", null, "CodeMirror-cursors"), this.measure = z("div", null, "CodeMirror-measure"), this.lineMeasure = z("div", null, "CodeMirror-measure"), this.lineSpace = R("div", [this.measure, this.lineMeasure, this.selectionDiv, this.cursorDiv, this.lineDiv], null, "position: relative; outline: none");
        var i10 = R("div", [this.lineSpace], "CodeMirror-lines");
        this.mover = z("div", [i10], null, "position: relative"), this.sizer = z("div", [this.mover], "CodeMirror-sizer"), this.sizerWidth = null, this.heightForcer = z("div", null, null, "position: absolute; height: 50px; width: 1px;"), this.gutters = z("div", null, "CodeMirror-gutters"), this.lineGutter = null, this.scroller = z("div", [this.sizer, this.heightForcer, this.gutters], "CodeMirror-scroll"), this.scroller.setAttribute("tabIndex", "-1"), this.wrapper = z("div", [this.scrollbarFiller, this.gutterFiller, this.scroller], "CodeMirror"), b && w >= 105 && (this.wrapper.style.clipPath = "inset(0px)"), this.wrapper.setAttribute("translate", "no"), g && v < 8 && (this.gutters.style.zIndex = -1, this.scroller.style.paddingRight = 0), m || f && T || (this.scroller.draggable = true), t10 && (t10.appendChild ? t10.appendChild(this.wrapper) : t10(this.wrapper)), this.viewFrom = this.viewTo = e10.first, this.reportedViewFrom = this.reportedViewTo = e10.first, this.view = [], this.renderedView = null, this.externalMeasured = null, this.viewOffset = 0, this.lastWrapHeight = this.lastWrapWidth = 0, this.updateLineNumbers = null, this.nativeBarWidth = this.barHeight = this.barWidth = 0, this.scrollbarsClipped = false, this.lineNumWidth = this.lineNumInnerWidth = this.lineNumChars = null, this.alignWidgets = false, this.cachedCharWidth = this.cachedTextHeight = this.cachedPaddingH = null, this.maxLine = null, this.maxLineLength = 0, this.maxLineChanged = false, this.wheelDX = this.wheelDY = this.wheelStartX = this.wheelStartY = null, this.shift = false, this.selForContextMenu = null, this.activeTouch = null, this.gutterSpecs = nb(n10.gutters, n10.lineNumbers), nw(this), r10.init(this);
      }
      nf.prototype.signal = function(t10, e10) {
        tO(t10, e10) && this.events.push(arguments);
      }, nf.prototype.finish = function() {
        for (var t10 = 0; t10 < this.events.length; t10++) tT.apply(null, this.events[t10]);
      };
      var nC = 0, nk = null;
      function nL(t10) {
        var e10 = t10.wheelDeltaX, r10 = t10.wheelDeltaY;
        return null == e10 && t10.detail && t10.axis == t10.HORIZONTAL_AXIS && (e10 = t10.detail), null == r10 && t10.detail && t10.axis == t10.VERTICAL_AXIS ? r10 = t10.detail : null == r10 && (r10 = t10.wheelDelta), { x: e10, y: r10 };
      }
      function nS(t10, e10) {
        b && 102 == w && (null == t10.display.chromeScrollHack ? t10.display.sizer.style.pointerEvents = "none" : clearTimeout(t10.display.chromeScrollHack), t10.display.chromeScrollHack = setTimeout(function() {
          t10.display.chromeScrollHack = null, t10.display.sizer.style.pointerEvents = "";
        }, 100));
        var r10 = nL(e10), n10 = r10.x, i10 = r10.y, o2 = nk;
        0 === e10.deltaMode && (n10 = e10.deltaX, i10 = e10.deltaY, o2 = 1);
        var a2 = t10.display, l2 = a2.scroller, s2 = l2.scrollWidth > l2.clientWidth, u2 = l2.scrollHeight > l2.clientHeight;
        if (n10 && s2 || i10 && u2) {
          if (i10 && A && m) {
            t: for (var c2 = e10.target, h2 = a2.view; c2 != l2; c2 = c2.parentNode) for (var d2 = 0; d2 < h2.length; d2++) if (h2[d2].node == c2) {
              t10.display.currentWheelTarget = c2;
              break t;
            }
          }
          if (n10 && !f && !x && null != o2) {
            i10 && u2 && r2(t10, Math.max(0, l2.scrollTop + i10 * o2)), r4(t10, Math.max(0, l2.scrollLeft + n10 * o2)), (!i10 || i10 && u2) && tD(e10), a2.wheelStartX = null;
            return;
          }
          if (i10 && null != o2) {
            var p2 = i10 * o2, g2 = t10.doc.scrollTop, v2 = g2 + a2.wrapper.clientHeight;
            p2 < 0 ? g2 = Math.max(0, g2 + p2 - 50) : v2 = Math.min(t10.doc.height, v2 + p2 + 50), np(t10, { top: g2, bottom: v2 });
          }
          nC < 20 && 0 !== e10.deltaMode && (null == a2.wheelStartX ? (a2.wheelStartX = l2.scrollLeft, a2.wheelStartY = l2.scrollTop, a2.wheelDX = n10, a2.wheelDY = i10, setTimeout(function() {
            if (null != a2.wheelStartX) {
              var t11 = l2.scrollLeft - a2.wheelStartX, e11 = l2.scrollTop - a2.wheelStartY, r11 = e11 && a2.wheelDY && e11 / a2.wheelDY || t11 && a2.wheelDX && t11 / a2.wheelDX;
              a2.wheelStartX = a2.wheelStartY = null, r11 && (nk = (nk * nC + r11) / (nC + 1), ++nC);
            }
          }, 200)) : (a2.wheelDX += n10, a2.wheelDY += i10));
        }
      }
      g ? nk = -0.53 : f ? nk = 15 : b ? nk = -0.7 : M && (nk = -1 / 3);
      var nT = function(t10, e10) {
        this.ranges = t10, this.primIndex = e10;
      };
      nT.prototype.primary = function() {
        return this.ranges[this.primIndex];
      }, nT.prototype.equals = function(t10) {
        if (t10 == this) return true;
        if (t10.primIndex != this.primIndex || t10.ranges.length != this.ranges.length) return false;
        for (var e10 = 0; e10 < this.ranges.length; e10++) {
          var r10 = this.ranges[e10], n10 = t10.ranges[e10];
          if (!t9(r10.anchor, n10.anchor) || !t9(r10.head, n10.head)) return false;
        }
        return true;
      }, nT.prototype.deepCopy = function() {
        for (var t10 = [], e10 = 0; e10 < this.ranges.length; e10++) t10[e10] = new nA(et(this.ranges[e10].anchor), et(this.ranges[e10].head));
        return new nT(t10, this.primIndex);
      }, nT.prototype.somethingSelected = function() {
        for (var t10 = 0; t10 < this.ranges.length; t10++) if (!this.ranges[t10].empty()) return true;
        return false;
      }, nT.prototype.contains = function(t10, e10) {
        e10 || (e10 = t10);
        for (var r10 = 0; r10 < this.ranges.length; r10++) {
          var n10 = this.ranges[r10];
          if (t8(e10, n10.from()) >= 0 && 0 >= t8(t10, n10.to())) return r10;
        }
        return -1;
      };
      var nA = function(t10, e10) {
        this.anchor = t10, this.head = e10;
      };
      function nN(t10, e10, r10) {
        var n10 = t10 && t10.options.selectionsMayTouch, i10 = e10[r10];
        e10.sort(function(t11, e11) {
          return t8(t11.from(), e11.from());
        }), r10 = J(e10, i10);
        for (var o2 = 1; o2 < e10.length; o2++) {
          var a2 = e10[o2], l2 = e10[o2 - 1], s2 = t8(l2.to(), a2.from());
          if (n10 && !a2.empty() ? s2 > 0 : s2 >= 0) {
            var u2 = er(l2.from(), a2.from()), c2 = ee(l2.to(), a2.to()), f2 = l2.empty() ? a2.from() == a2.head : l2.from() == l2.head;
            o2 <= r10 && --r10, e10.splice(--o2, 2, new nA(f2 ? c2 : u2, f2 ? u2 : c2));
          }
        }
        return new nT(e10, r10);
      }
      function nO(t10, e10) {
        return new nT([new nA(t10, e10 || t10)], 0);
      }
      function nI(t10) {
        return t10.text ? t7(t10.from.line + t10.text.length - 1, tl(t10.text).length + (1 == t10.text.length ? t10.from.ch : 0)) : t10.to;
      }
      function nD(t10, e10) {
        if (0 > t8(t10, e10.from)) return t10;
        if (0 >= t8(t10, e10.to)) return nI(e10);
        var r10 = t10.line + e10.text.length - (e10.to.line - e10.from.line) - 1, n10 = t10.ch;
        return t10.line == e10.to.line && (n10 += nI(e10).ch - e10.to.ch), t7(r10, n10);
      }
      function nW(t10, e10) {
        for (var r10 = [], n10 = 0; n10 < t10.sel.ranges.length; n10++) {
          var i10 = t10.sel.ranges[n10];
          r10.push(new nA(nD(i10.anchor, e10), nD(i10.head, e10)));
        }
        return nN(t10.cm, r10, t10.sel.primIndex);
      }
      function nF(t10, e10, r10) {
        return t10.line == e10.line ? t7(r10.line, t10.ch - e10.ch + r10.ch) : t7(r10.line + (t10.line - e10.line), t10.ch);
      }
      function nH(t10) {
        t10.doc.mode = tK(t10.options, t10.doc.modeOption), nE(t10);
      }
      function nE(t10) {
        t10.doc.iter(function(t11) {
          t11.stateAfter && (t11.stateAfter = null), t11.styles && (t11.styles = null);
        }), t10.doc.modeFrontier = t10.doc.highlightFrontier = t10.doc.first, nu(t10, 100), t10.state.modeGen++, t10.curOp && rW(t10);
      }
      function nP(t10, e10) {
        return 0 == e10.from.ch && 0 == e10.to.ch && "" == tl(e10.text) && (!t10.cm || t10.cm.options.wholeLineUpdateBefore);
      }
      function nz(t10, e10, r10, n10) {
        function i10(t11) {
          return r10 ? r10[t11] : null;
        }
        function o2(t11, r11, i11) {
          var o3;
          t11.text = r11, t11.stateAfter && (t11.stateAfter = null), t11.styles && (t11.styles = null), null != t11.order && (t11.order = null), ek(t11), eL(t11, i11), (o3 = n10 ? n10(t11) : 1) != t11.height && t22(t11, o3), eY(t11, "change", t11, e10);
        }
        function a2(t11, e11) {
          for (var r11 = [], o3 = t11; o3 < e11; ++o3) r11.push(new ez(u2[o3], i10(o3), n10));
          return r11;
        }
        var l2 = e10.from, s2 = e10.to, u2 = e10.text, c2 = tJ(t10, l2.line), f2 = tJ(t10, s2.line), h2 = tl(u2), d2 = i10(u2.length - 1), p2 = s2.line - l2.line;
        if (e10.full) t10.insert(0, a2(0, u2.length)), t10.remove(u2.length, t10.size - u2.length);
        else if (nP(t10, e10)) {
          var g2 = a2(0, u2.length - 1);
          o2(f2, f2.text, d2), p2 && t10.remove(l2.line, p2), g2.length && t10.insert(l2.line, g2);
        } else if (c2 == f2) {
          if (1 == u2.length) o2(c2, c2.text.slice(0, l2.ch) + h2 + c2.text.slice(s2.ch), d2);
          else {
            var v2 = a2(1, u2.length - 1);
            v2.push(new ez(h2 + c2.text.slice(s2.ch), d2, n10)), o2(c2, c2.text.slice(0, l2.ch) + u2[0], i10(0)), t10.insert(l2.line + 1, v2);
          }
        } else if (1 == u2.length) o2(c2, c2.text.slice(0, l2.ch) + u2[0] + f2.text.slice(s2.ch), i10(0)), t10.remove(l2.line + 1, p2);
        else {
          o2(c2, c2.text.slice(0, l2.ch) + u2[0], i10(0)), o2(f2, h2 + f2.text.slice(s2.ch), d2);
          var m2 = a2(1, u2.length - 1);
          p2 > 1 && t10.remove(l2.line + 1, p2 - 1), t10.insert(l2.line + 1, m2);
        }
        eY(t10, "change", t10, e10);
      }
      function nR(t10, e10, r10) {
        !function t11(n10, i10, o2) {
          if (n10.linked) for (var a2 = 0; a2 < n10.linked.length; ++a2) {
            var l2 = n10.linked[a2];
            if (l2.doc != i10) {
              var s2 = o2 && l2.sharedHist;
              (!r10 || s2) && (e10(l2.doc, s2), t11(l2.doc, n10, s2));
            }
          }
        }(t10, null, true);
      }
      function nB(t10, e10) {
        if (e10.cm) throw Error("This document is already in use.");
        t10.doc = e10, e10.cm = t10, rO(t10), nH(t10), nV(t10), t10.options.direction = e10.direction, t10.options.lineWrapping || eP(t10), t10.options.mode = e10.modeOption, rW(t10);
      }
      function nV(t10) {
        ("rtl" == t10.doc.direction ? G : H)(t10.display.lineDiv, "CodeMirror-rtl");
      }
      function nG(t10) {
        this.done = [], this.undone = [], this.undoDepth = t10 ? t10.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = t10 ? t10.maxGeneration : 1;
      }
      function nU(t10, e10) {
        var r10 = { from: et(e10.from), to: nI(e10), text: t0(t10, e10.from, e10.to) };
        return nK(t10, r10, e10.from.line, e10.to.line + 1), nR(t10, function(t11) {
          return nK(t11, r10, e10.from.line, e10.to.line + 1);
        }, true), r10;
      }
      function nj(t10) {
        for (; t10.length; ) if (tl(t10).ranges) t10.pop();
        else break;
      }
      function nq(t10, e10, r10, n10) {
        var i10, o2, a2 = t10.history;
        a2.undone.length = 0;
        var l2, s2 = +/* @__PURE__ */ new Date();
        if ((a2.lastOp == n10 || a2.lastOrigin == e10.origin && e10.origin && ("+" == e10.origin.charAt(0) && a2.lastModTime > s2 - (t10.cm ? t10.cm.options.historyEventDelay : 500) || "*" == e10.origin.charAt(0))) && (i10 = a2, l2 = a2.lastOp == n10 ? (nj(i10.done), tl(i10.done)) : i10.done.length && !tl(i10.done).ranges ? tl(i10.done) : i10.done.length > 1 && !i10.done[i10.done.length - 2].ranges ? (i10.done.pop(), tl(i10.done)) : void 0)) o2 = tl(l2.changes), 0 == t8(e10.from, e10.to) && 0 == t8(e10.from, o2.to) ? o2.to = nI(e10) : l2.changes.push(nU(t10, e10));
        else {
          var u2 = tl(a2.done);
          for (u2 && u2.ranges || n_(t10.sel, a2.done), l2 = { changes: [nU(t10, e10)], generation: a2.generation }, a2.done.push(l2); a2.done.length > a2.undoDepth; ) a2.done.shift(), a2.done[0].ranges || a2.done.shift();
        }
        a2.done.push(r10), a2.generation = ++a2.maxGeneration, a2.lastModTime = a2.lastSelTime = s2, a2.lastOp = a2.lastSelOp = n10, a2.lastOrigin = a2.lastSelOrigin = e10.origin, o2 || tT(t10, "historyAdded");
      }
      function n_(t10, e10) {
        var r10 = tl(e10);
        r10 && r10.ranges && r10.equals(t10) || e10.push(t10);
      }
      function nK(t10, e10, r10, n10) {
        var i10 = e10["spans_" + t10.id], o2 = 0;
        t10.iter(Math.max(t10.first, r10), Math.min(t10.first + t10.size, n10), function(r11) {
          r11.markedSpans && ((i10 || (i10 = e10["spans_" + t10.id] = {}))[o2] = r11.markedSpans), ++o2;
        });
      }
      function nX(t10, e10) {
        var r10 = function(t11, e11) {
          var r11 = e11["spans_" + t11.id];
          if (!r11) return null;
          for (var n11 = [], i11 = 0; i11 < e11.text.length; ++i11) n11.push(function(t12) {
            if (!t12) return null;
            for (var e12, r12 = 0; r12 < t12.length; ++r12) t12[r12].marker.explicitlyCleared ? e12 || (e12 = t12.slice(0, r12)) : e12 && e12.push(t12[r12]);
            return e12 ? e12.length ? e12 : null : t12;
          }(r11[i11]));
          return n11;
        }(t10, e10), n10 = eM(t10, e10);
        if (!r10) return n10;
        if (!n10) return r10;
        for (var i10 = 0; i10 < r10.length; ++i10) {
          var o2 = r10[i10], a2 = n10[i10];
          if (o2 && a2) e: for (var l2 = 0; l2 < a2.length; ++l2) {
            for (var s2 = a2[l2], u2 = 0; u2 < o2.length; ++u2) if (o2[u2].marker == s2.marker) continue e;
            o2.push(s2);
          }
          else a2 && (r10[i10] = a2);
        }
        return r10;
      }
      function n$(t10, e10, r10) {
        for (var n10 = [], i10 = 0; i10 < t10.length; ++i10) {
          var o2 = t10[i10];
          if (o2.ranges) {
            n10.push(r10 ? nT.prototype.deepCopy.call(o2) : o2);
            continue;
          }
          var a2 = o2.changes, l2 = [];
          n10.push({ changes: l2 });
          for (var s2 = 0; s2 < a2.length; ++s2) {
            var u2 = a2[s2], c2 = void 0;
            if (l2.push({ from: u2.from, to: u2.to, text: u2.text }), e10) for (var f2 in u2) (c2 = f2.match(/^spans_(\d+)$/)) && J(e10, Number(c2[1])) > -1 && (tl(l2)[f2] = u2[f2], delete u2[f2]);
          }
        }
        return n10;
      }
      function nY(t10, e10, r10, n10) {
        if (!n10) return new nA(r10 || e10, e10);
        var i10 = t10.anchor;
        if (r10) {
          var o2 = 0 > t8(e10, i10);
          o2 != 0 > t8(r10, i10) ? (i10 = e10, e10 = r10) : o2 != 0 > t8(e10, r10) && (e10 = r10);
        }
        return new nA(i10, e10);
      }
      function nZ(t10, e10, r10, n10, i10) {
        null == i10 && (i10 = t10.cm && (t10.cm.display.shift || t10.extend)), n1(t10, new nT([nY(t10.sel.primary(), e10, r10, i10)], 0), n10);
      }
      function nQ(t10, e10, r10) {
        for (var n10 = [], i10 = t10.cm && (t10.cm.display.shift || t10.extend), o2 = 0; o2 < t10.sel.ranges.length; o2++) n10[o2] = nY(t10.sel.ranges[o2], e10[o2], null, i10);
        var a2 = nN(t10.cm, n10, t10.sel.primIndex);
        n1(t10, a2, r10);
      }
      function nJ(t10, e10, r10, n10) {
        var i10 = t10.sel.ranges.slice(0);
        i10[e10] = r10, n1(t10, nN(t10.cm, i10, t10.sel.primIndex), n10);
      }
      nA.prototype.from = function() {
        return er(this.anchor, this.head);
      }, nA.prototype.to = function() {
        return ee(this.anchor, this.head);
      }, nA.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function n0(t10, e10, r10) {
        var n10 = t10.history.done, i10 = tl(n10);
        i10 && i10.ranges ? (n10[n10.length - 1] = e10, n2(t10, e10, r10)) : n1(t10, e10, r10);
      }
      function n1(t10, e10, r10) {
        n2(t10, e10, r10), function(t11, e11, r11, n10) {
          var i10, o2, a2 = t11.history, l2 = n10 && n10.origin;
          r11 == a2.lastSelOp || l2 && a2.lastSelOrigin == l2 && (a2.lastModTime == a2.lastSelTime && a2.lastOrigin == l2 || (i10 = tl(a2.done), "*" == (o2 = l2.charAt(0)) || "+" == o2 && i10.ranges.length == e11.ranges.length && i10.somethingSelected() == e11.somethingSelected() && /* @__PURE__ */ new Date() - t11.history.lastSelTime <= (t11.cm ? t11.cm.options.historyEventDelay : 500))) ? a2.done[a2.done.length - 1] = e11 : n_(e11, a2.done), a2.lastSelTime = +/* @__PURE__ */ new Date(), a2.lastSelOrigin = l2, a2.lastSelOp = r11, n10 && false !== n10.clearRedo && nj(a2.undone);
        }(t10, t10.sel, t10.cm ? t10.cm.curOp.id : NaN, r10);
      }
      function n2(t10, e10, r10) {
        if (tO(t10, "beforeSelectionChange") || t10.cm && tO(t10.cm, "beforeSelectionChange")) {
          var n10, i10;
          i10 = { ranges: (n10 = e10).ranges, update: function(e11) {
            this.ranges = [];
            for (var r11 = 0; r11 < e11.length; r11++) this.ranges[r11] = new nA(ei(t10, e11[r11].anchor), ei(t10, e11[r11].head));
          }, origin: r10 && r10.origin }, tT(t10, "beforeSelectionChange", t10, i10), t10.cm && tT(t10.cm, "beforeSelectionChange", t10.cm, i10), e10 = i10.ranges != n10.ranges ? nN(t10.cm, i10.ranges, i10.ranges.length - 1) : n10;
        }
        var o2 = r10 && r10.bias || (0 > t8(e10.primary().head, t10.sel.primary().head) ? -1 : 1);
        n3(t10, n5(t10, e10, o2, true)), !(r10 && false === r10.scroll) && t10.cm && "nocursor" != t10.cm.getOption("readOnly") && rQ(t10.cm);
      }
      function n3(t10, e10) {
        !e10.equals(t10.sel) && (t10.sel = e10, t10.cm && (t10.cm.curOp.updateInput = 1, t10.cm.curOp.selectionChanged = true, tN(t10.cm)), eY(t10, "cursorActivity", t10));
      }
      function n4(t10) {
        n3(t10, n5(t10, t10.sel, null, false));
      }
      function n5(t10, e10, r10, n10) {
        for (var i10, o2 = 0; o2 < e10.ranges.length; o2++) {
          var a2 = e10.ranges[o2], l2 = e10.ranges.length == t10.sel.ranges.length && t10.sel.ranges[o2], s2 = n7(t10, a2.anchor, l2 && l2.anchor, r10, n10), u2 = a2.head == a2.anchor ? s2 : n7(t10, a2.head, l2 && l2.head, r10, n10);
          (i10 || s2 != a2.anchor || u2 != a2.head) && (i10 || (i10 = e10.ranges.slice(0, o2)), i10[o2] = new nA(s2, u2));
        }
        return i10 ? nN(t10.cm, i10, e10.primIndex) : e10;
      }
      function n6(t10, e10, r10, n10, i10) {
        var o2 = tJ(t10, e10.line);
        if (o2.markedSpans) for (var a2 = 0; a2 < o2.markedSpans.length; ++a2) {
          var l2 = o2.markedSpans[a2], s2 = l2.marker, u2 = "selectLeft" in s2 ? !s2.selectLeft : s2.inclusiveLeft, c2 = "selectRight" in s2 ? !s2.selectRight : s2.inclusiveRight;
          if ((null == l2.from || (u2 ? l2.from <= e10.ch : l2.from < e10.ch)) && (null == l2.to || (c2 ? l2.to >= e10.ch : l2.to > e10.ch))) {
            if (i10 && (tT(s2, "beforeCursorEnter"), s2.explicitlyCleared)) {
              if (o2.markedSpans) {
                --a2;
                continue;
              }
              break;
            }
            if (!s2.atomic) continue;
            if (r10) {
              var f2 = s2.find(n10 < 0 ? 1 : -1), h2 = void 0;
              if ((n10 < 0 ? c2 : u2) && (f2 = n8(t10, f2, -n10, f2 && f2.line == e10.line ? o2 : null)), f2 && f2.line == e10.line && (h2 = t8(f2, r10)) && (n10 < 0 ? h2 < 0 : h2 > 0)) return n6(t10, f2, e10, n10, i10);
            }
            var d2 = s2.find(n10 < 0 ? -1 : 1);
            return (n10 < 0 ? u2 : c2) && (d2 = n8(t10, d2, n10, d2.line == e10.line ? o2 : null)), d2 ? n6(t10, d2, e10, n10, i10) : null;
          }
        }
        return e10;
      }
      function n7(t10, e10, r10, n10, i10) {
        var o2 = n10 || 1, a2 = n6(t10, e10, r10, o2, i10) || !i10 && n6(t10, e10, r10, o2, true) || n6(t10, e10, r10, -o2, i10) || !i10 && n6(t10, e10, r10, -o2, true);
        return a2 || (t10.cantEdit = true, t7(t10.first, 0));
      }
      function n8(t10, e10, r10, n10) {
        return r10 < 0 && 0 == e10.ch ? e10.line > t10.first ? ei(t10, t7(e10.line - 1)) : null : r10 > 0 && e10.ch == (n10 || tJ(t10, e10.line)).text.length ? e10.line < t10.first + t10.size - 1 ? t7(e10.line + 1, 0) : null : new t7(e10.line, e10.ch + r10);
      }
      function n9(t10) {
        t10.setSelection(t7(t10.firstLine(), 0), t7(t10.lastLine()), te);
      }
      function it(t10, e10, r10) {
        var n10 = { canceled: false, from: e10.from, to: e10.to, text: e10.text, origin: e10.origin, cancel: function() {
          return n10.canceled = true;
        } };
        return (r10 && (n10.update = function(e11, r11, i10, o2) {
          e11 && (n10.from = ei(t10, e11)), r11 && (n10.to = ei(t10, r11)), i10 && (n10.text = i10), void 0 !== o2 && (n10.origin = o2);
        }), tT(t10, "beforeChange", t10, n10), t10.cm && tT(t10.cm, "beforeChange", t10.cm, n10), n10.canceled) ? (t10.cm && (t10.cm.curOp.updateInput = 2), null) : { from: n10.from, to: n10.to, text: n10.text, origin: n10.origin };
      }
      function ie(t10, e10, r10) {
        if (t10.cm) {
          if (!t10.cm.curOp) return na(t10.cm, ie)(t10, e10, r10);
          if (t10.cm.state.suppressEdits) return;
        }
        if (!(tO(t10, "beforeChange") || t10.cm && tO(t10.cm, "beforeChange")) || (e10 = it(t10, e10, true))) {
          var n10 = ey && !r10 && function(t11, e11, r11) {
            var n11 = null;
            if (t11.iter(e11.line, r11.line + 1, function(t12) {
              if (t12.markedSpans) for (var e12 = 0; e12 < t12.markedSpans.length; ++e12) {
                var r12 = t12.markedSpans[e12].marker;
                r12.readOnly && (!n11 || -1 == J(n11, r12)) && (n11 || (n11 = [])).push(r12);
              }
            }), !n11) return null;
            for (var i11 = [{ from: e11, to: r11 }], o2 = 0; o2 < n11.length; ++o2) for (var a2 = n11[o2], l2 = a2.find(0), s2 = 0; s2 < i11.length; ++s2) {
              var u2 = i11[s2];
              if (!(0 > t8(u2.to, l2.from) || t8(u2.from, l2.to) > 0)) {
                var c2 = [s2, 1], f2 = t8(u2.from, l2.from), h2 = t8(u2.to, l2.to);
                !(f2 < 0) && (a2.inclusiveLeft || f2) || c2.push({ from: u2.from, to: l2.from }), !(h2 > 0) && (a2.inclusiveRight || h2) || c2.push({ from: l2.to, to: u2.to }), i11.splice.apply(i11, c2), s2 += c2.length - 3;
              }
            }
            return i11;
          }(t10, e10.from, e10.to);
          if (n10) for (var i10 = n10.length - 1; i10 >= 0; --i10) ir(t10, { from: n10[i10].from, to: n10[i10].to, text: i10 ? [""] : e10.text, origin: e10.origin });
          else ir(t10, e10);
        }
      }
      function ir(t10, e10) {
        if (1 != e10.text.length || "" != e10.text[0] || 0 != t8(e10.from, e10.to)) {
          var r10 = nW(t10, e10);
          nq(t10, e10, r10, t10.cm ? t10.cm.curOp.id : NaN), ia(t10, e10, r10, eM(t10, e10));
          var n10 = [];
          nR(t10, function(t11, r11) {
            r11 || -1 != J(n10, t11.history) || (ic(t11.history, e10), n10.push(t11.history)), ia(t11, e10, null, eM(t11, e10));
          });
        }
      }
      function ii(t10, e10, r10) {
        var n10 = t10.cm && t10.cm.state.suppressEdits;
        if (!n10 || r10) {
          for (var i10, o2 = t10.history, a2 = t10.sel, l2 = "undo" == e10 ? o2.done : o2.undone, s2 = "undo" == e10 ? o2.undone : o2.done, u2 = 0; u2 < l2.length && (i10 = l2[u2], r10 ? !i10.ranges || i10.equals(t10.sel) : i10.ranges); u2++) ;
          if (u2 != l2.length) {
            for (o2.lastOrigin = o2.lastSelOrigin = null; ; ) if ((i10 = l2.pop()).ranges) {
              if (n_(i10, s2), r10 && !i10.equals(t10.sel)) {
                n1(t10, i10, { clearRedo: false });
                return;
              }
              a2 = i10;
            } else if (n10) {
              l2.push(i10);
              return;
            } else break;
            var c2 = [];
            n_(a2, s2), s2.push({ changes: c2, generation: o2.generation }), o2.generation = i10.generation || ++o2.maxGeneration;
            for (var f2 = tO(t10, "beforeChange") || t10.cm && tO(t10.cm, "beforeChange"), h2 = i10.changes.length - 1; h2 >= 0; --h2) {
              var d2 = function(r11) {
                var n11 = i10.changes[r11];
                if (n11.origin = e10, f2 && !it(t10, n11, false)) return l2.length = 0, {};
                c2.push(nU(t10, n11));
                var o3 = r11 ? nW(t10, n11) : tl(l2);
                ia(t10, n11, o3, nX(t10, n11)), !r11 && t10.cm && t10.cm.scrollIntoView({ from: n11.from, to: nI(n11) });
                var a3 = [];
                nR(t10, function(t11, e11) {
                  e11 || -1 != J(a3, t11.history) || (ic(t11.history, n11), a3.push(t11.history)), ia(t11, n11, null, nX(t11, n11));
                });
              }(h2);
              if (d2) return d2.v;
            }
          }
        }
      }
      function io(t10, e10) {
        if (0 != e10 && (t10.first += e10, t10.sel = new nT(ts(t10.sel.ranges, function(t11) {
          return new nA(t7(t11.anchor.line + e10, t11.anchor.ch), t7(t11.head.line + e10, t11.head.ch));
        }), t10.sel.primIndex), t10.cm)) {
          rW(t10.cm, t10.first, t10.first - e10, e10);
          for (var r10 = t10.cm.display, n10 = r10.viewFrom; n10 < r10.viewTo; n10++) rF(t10.cm, n10, "gutter");
        }
      }
      function ia(t10, e10, r10, n10) {
        if (t10.cm && !t10.cm.curOp) return na(t10.cm, ia)(t10, e10, r10, n10);
        if (e10.to.line < t10.first) {
          io(t10, e10.text.length - 1 - (e10.to.line - e10.from.line));
          return;
        }
        if (!(e10.from.line > t10.lastLine())) {
          if (e10.from.line < t10.first) {
            var i10 = e10.text.length - 1 - (t10.first - e10.from.line);
            io(t10, i10), e10 = { from: t7(t10.first, 0), to: t7(e10.to.line + i10, e10.to.ch), text: [tl(e10.text)], origin: e10.origin };
          }
          var o2 = t10.lastLine();
          e10.to.line > o2 && (e10 = { from: e10.from, to: t7(o2, tJ(t10, o2).text.length), text: [e10.text[0]], origin: e10.origin }), e10.removed = t0(t10, e10.from, e10.to), r10 || (r10 = nW(t10, e10)), t10.cm ? function(t11, e11, r11) {
            var n11 = t11.doc, i11 = t11.display, o3 = e11.from, a2 = e11.to, l2 = false, s2 = o3.line;
            t11.options.lineWrapping || (s2 = t3(eI(tJ(n11, o3.line))), n11.iter(s2, a2.line + 1, function(t12) {
              if (t12 == i11.maxLine) return l2 = true, true;
            })), n11.sel.contains(e11.from, e11.to) > -1 && tN(t11), nz(n11, e11, r11, rN(t11)), !t11.options.lineWrapping && (n11.iter(s2, o3.line + e11.text.length, function(t12) {
              var e12 = eE(t12);
              e12 > i11.maxLineLength && (i11.maxLine = t12, i11.maxLineLength = e12, i11.maxLineChanged = true, l2 = false);
            }), l2 && (t11.curOp.updateMaxLine = true)), function(t12, e12) {
              if (t12.modeFrontier = Math.min(t12.modeFrontier, e12), !(t12.highlightFrontier < e12 - 10)) {
                for (var r12 = t12.first, n12 = e12 - 1; n12 > r12; n12--) {
                  var i12 = tJ(t12, n12).stateAfter;
                  if (i12 && (!(i12 instanceof ea) || n12 + i12.lookAhead < e12)) {
                    r12 = n12 + 1;
                    break;
                  }
                }
                t12.highlightFrontier = Math.min(t12.highlightFrontier, r12);
              }
            }(n11, o3.line), nu(t11, 400);
            var u2 = e11.text.length - (a2.line - o3.line) - 1;
            e11.full ? rW(t11) : o3.line != a2.line || 1 != e11.text.length || nP(t11.doc, e11) ? rW(t11, o3.line, a2.line + 1, u2) : rF(t11, o3.line, "text");
            var c2 = tO(t11, "changes"), f2 = tO(t11, "change");
            if (f2 || c2) {
              var h2 = { from: o3, to: a2, text: e11.text, removed: e11.removed, origin: e11.origin };
              f2 && eY(t11, "change", t11, h2), c2 && (t11.curOp.changeObjs || (t11.curOp.changeObjs = [])).push(h2);
            }
            t11.display.selForContextMenu = null;
          }(t10.cm, e10, n10) : nz(t10, e10, n10), n2(t10, r10, te), t10.cantEdit && n7(t10, t7(t10.firstLine(), 0)) && (t10.cantEdit = false);
        }
      }
      function il(t10, e10, r10, n10, i10) {
        var o2;
        n10 || (n10 = r10), 0 > t8(n10, r10) && (r10 = (o2 = [n10, r10])[0], n10 = o2[1]), "string" == typeof e10 && (e10 = t10.splitLines(e10)), ie(t10, { from: r10, to: n10, text: e10, origin: i10 });
      }
      function is(t10, e10, r10, n10) {
        r10 < t10.line ? t10.line += n10 : e10 < t10.line && (t10.line = e10, t10.ch = 0);
      }
      function iu(t10, e10, r10, n10) {
        for (var i10 = 0; i10 < t10.length; ++i10) {
          var o2 = t10[i10], a2 = true;
          if (o2.ranges) {
            o2.copied || ((o2 = t10[i10] = o2.deepCopy()).copied = true);
            for (var l2 = 0; l2 < o2.ranges.length; l2++) is(o2.ranges[l2].anchor, e10, r10, n10), is(o2.ranges[l2].head, e10, r10, n10);
            continue;
          }
          for (var s2 = 0; s2 < o2.changes.length; ++s2) {
            var u2 = o2.changes[s2];
            if (r10 < u2.from.line) u2.from = t7(u2.from.line + n10, u2.from.ch), u2.to = t7(u2.to.line + n10, u2.to.ch);
            else if (e10 <= u2.to.line) {
              a2 = false;
              break;
            }
          }
          a2 || (t10.splice(0, i10 + 1), i10 = 0);
        }
      }
      function ic(t10, e10) {
        var r10 = e10.from.line, n10 = e10.to.line, i10 = e10.text.length - (n10 - r10) - 1;
        iu(t10.done, r10, n10, i10), iu(t10.undone, r10, n10, i10);
      }
      function ih(t10, e10, r10, n10) {
        var i10 = e10, o2 = e10;
        return ("number" == typeof e10 ? o2 = tJ(t10, en(t10, e10)) : i10 = t3(e10), null == i10) ? null : (n10(o2, i10) && t10.cm && rF(t10.cm, i10, r10), o2);
      }
      function id(t10) {
        this.lines = t10, this.parent = null;
        for (var e10 = 0, r10 = 0; r10 < t10.length; ++r10) t10[r10].parent = this, e10 += t10[r10].height;
        this.height = e10;
      }
      function ip(t10) {
        this.children = t10;
        for (var e10 = 0, r10 = 0, n10 = 0; n10 < t10.length; ++n10) {
          var i10 = t10[n10];
          e10 += i10.chunkSize(), r10 += i10.height, i10.parent = this;
        }
        this.size = e10, this.height = r10, this.parent = null;
      }
      id.prototype = { chunkSize: function() {
        return this.lines.length;
      }, removeInner: function(t10, e10) {
        for (var r10 = t10, n10 = t10 + e10; r10 < n10; ++r10) {
          var i10 = this.lines[r10];
          this.height -= i10.height, i10.parent = null, ek(i10), eY(i10, "delete");
        }
        this.lines.splice(t10, e10);
      }, collapse: function(t10) {
        t10.push.apply(t10, this.lines);
      }, insertInner: function(t10, e10, r10) {
        this.height += r10, this.lines = this.lines.slice(0, t10).concat(e10).concat(this.lines.slice(t10));
        for (var n10 = 0; n10 < e10.length; ++n10) e10[n10].parent = this;
      }, iterN: function(t10, e10, r10) {
        for (var n10 = t10 + e10; t10 < n10; ++t10) if (r10(this.lines[t10])) return true;
      } }, ip.prototype = { chunkSize: function() {
        return this.size;
      }, removeInner: function(t10, e10) {
        this.size -= e10;
        for (var r10 = 0; r10 < this.children.length; ++r10) {
          var n10 = this.children[r10], i10 = n10.chunkSize();
          if (t10 < i10) {
            var o2 = Math.min(e10, i10 - t10), a2 = n10.height;
            if (n10.removeInner(t10, o2), this.height -= a2 - n10.height, i10 == o2 && (this.children.splice(r10--, 1), n10.parent = null), 0 == (e10 -= o2)) break;
            t10 = 0;
          } else t10 -= i10;
        }
        if (this.size - e10 < 25 && (this.children.length > 1 || !(this.children[0] instanceof id))) {
          var l2 = [];
          this.collapse(l2), this.children = [new id(l2)], this.children[0].parent = this;
        }
      }, collapse: function(t10) {
        for (var e10 = 0; e10 < this.children.length; ++e10) this.children[e10].collapse(t10);
      }, insertInner: function(t10, e10, r10) {
        this.size += e10.length, this.height += r10;
        for (var n10 = 0; n10 < this.children.length; ++n10) {
          var i10 = this.children[n10], o2 = i10.chunkSize();
          if (t10 <= o2) {
            if (i10.insertInner(t10, e10, r10), i10.lines && i10.lines.length > 50) {
              for (var a2 = i10.lines.length % 25 + 25, l2 = a2; l2 < i10.lines.length; ) {
                var s2 = new id(i10.lines.slice(l2, l2 += 25));
                i10.height -= s2.height, this.children.splice(++n10, 0, s2), s2.parent = this;
              }
              i10.lines = i10.lines.slice(0, a2), this.maybeSpill();
            }
            break;
          }
          t10 -= o2;
        }
      }, maybeSpill: function() {
        if (!(this.children.length <= 10)) {
          var t10 = this;
          do {
            var e10 = new ip(t10.children.splice(t10.children.length - 5, 5));
            if (t10.parent) {
              t10.size -= e10.size, t10.height -= e10.height;
              var r10 = J(t10.parent.children, t10);
              t10.parent.children.splice(r10 + 1, 0, e10);
            } else {
              var n10 = new ip(t10.children);
              n10.parent = t10, t10.children = [n10, e10], t10 = n10;
            }
            e10.parent = t10.parent;
          } while (t10.children.length > 10);
          t10.parent.maybeSpill();
        }
      }, iterN: function(t10, e10, r10) {
        for (var n10 = 0; n10 < this.children.length; ++n10) {
          var i10 = this.children[n10], o2 = i10.chunkSize();
          if (t10 < o2) {
            var a2 = Math.min(e10, o2 - t10);
            if (i10.iterN(t10, a2, r10)) return true;
            if (0 == (e10 -= a2)) break;
            t10 = 0;
          } else t10 -= o2;
        }
      } };
      var ig = function(t10, e10, r10) {
        if (r10) for (var n10 in r10) r10.hasOwnProperty(n10) && (this[n10] = r10[n10]);
        this.doc = t10, this.node = e10;
      };
      function iv(t10, e10, r10) {
        eH(e10) < (t10.curOp && t10.curOp.scrollTop || t10.doc.scrollTop) && rZ(t10, r10);
      }
      ig.prototype.clear = function() {
        var t10 = this.doc.cm, e10 = this.line.widgets, r10 = this.line, n10 = t3(r10);
        if (null != n10 && e10) {
          for (var i10 = 0; i10 < e10.length; ++i10) e10[i10] == this && e10.splice(i10--, 1);
          e10.length || (r10.widgets = null);
          var o2 = e5(this);
          t22(r10, Math.max(0, r10.height - o2)), t10 && (no(t10, function() {
            iv(t10, r10, -o2), rF(t10, n10, "widget");
          }), eY(t10, "lineWidgetCleared", t10, this, n10));
        }
      }, ig.prototype.changed = function() {
        var t10 = this, e10 = this.height, r10 = this.doc.cm, n10 = this.line;
        this.height = null;
        var i10 = e5(this) - e10;
        i10 && (eF(this.doc, n10) || t22(n10, n10.height + i10), r10 && no(r10, function() {
          r10.curOp.forceUpdate = true, iv(r10, n10, i10), eY(r10, "lineWidgetChanged", r10, t10, t3(n10));
        }));
      }, tI(ig);
      var im = 0, iy = function(t10, e10) {
        this.lines = [], this.type = e10, this.doc = t10, this.id = ++im;
      };
      function ib(t10, e10, r10, n10, i10) {
        if (n10 && n10.shared) {
          var o2, a2, l2, s2, u2, c2, f2, h2;
          return o2 = t10, a2 = e10, l2 = r10, s2 = n10, u2 = i10, (s2 = Y(s2)).shared = false, f2 = (c2 = [ib(o2, a2, l2, s2, u2)])[0], h2 = s2.widgetNode, nR(o2, function(t11) {
            h2 && (s2.widgetNode = h2.cloneNode(true)), c2.push(ib(t11, ei(t11, a2), ei(t11, l2), s2, u2));
            for (var e11 = 0; e11 < t11.linked.length; ++e11) if (t11.linked[e11].isParent) return;
            f2 = tl(c2);
          }), new iw(c2, f2);
        }
        if (t10.cm && !t10.cm.curOp) return na(t10.cm, ib)(t10, e10, r10, n10, i10);
        var d2 = new iy(t10, i10), p2 = t8(e10, r10);
        if (n10 && Y(n10, d2, false), p2 > 0 || 0 == p2 && false !== d2.clearWhenEmpty) return d2;
        if (d2.replacedWith && (d2.collapsed = true, d2.widgetNode = R("span", [d2.replacedWith], "CodeMirror-widget"), n10.handleMouseEvents || d2.widgetNode.setAttribute("cm-ignore-events", "true"), n10.insertLeft && (d2.widgetNode.insertLeft = true)), d2.collapsed) {
          if (eO(t10, e10.line, e10, r10, d2) || e10.line != r10.line && eO(t10, r10.line, e10, r10, d2)) throw Error("Inserting collapsed marker partially overlapping an existing one");
          eb = true;
        }
        d2.addToHistory && nq(t10, { from: e10, to: r10, origin: "markText" }, t10.sel, NaN);
        var g2, v2 = e10.line, m2 = t10.cm;
        if (t10.iter(v2, r10.line + 1, function(n11) {
          var i11, o3, a3;
          m2 && d2.collapsed && !m2.options.lineWrapping && eI(n11) == m2.display.maxLine && (g2 = true), d2.collapsed && v2 != e10.line && t22(n11, 0), i11 = new ew(d2, v2 == e10.line ? e10.ch : null, v2 == r10.line ? r10.ch : null), (a3 = (o3 = t10.cm && t10.cm.curOp) && window.WeakSet && (o3.markedSpans || (o3.markedSpans = /* @__PURE__ */ new WeakSet()))) && n11.markedSpans && a3.has(n11.markedSpans) ? n11.markedSpans.push(i11) : (n11.markedSpans = n11.markedSpans ? n11.markedSpans.concat([i11]) : [i11], a3 && a3.add(n11.markedSpans)), i11.marker.attachLine(n11), ++v2;
        }), d2.collapsed && t10.iter(e10.line, r10.line + 1, function(e11) {
          eF(t10, e11) && t22(e11, 0);
        }), d2.clearOnEnter && tk(d2, "beforeCursorEnter", function() {
          return d2.clear();
        }), d2.readOnly && (ey = true, (t10.history.done.length || t10.history.undone.length) && t10.clearHistory()), d2.collapsed && (d2.id = ++im, d2.atomic = true), m2) {
          if (g2 && (m2.curOp.updateMaxLine = true), d2.collapsed) rW(m2, e10.line, r10.line + 1);
          else if (d2.className || d2.startStyle || d2.endStyle || d2.css || d2.attributes || d2.title) for (var y2 = e10.line; y2 <= r10.line; y2++) rF(m2, y2, "text");
          d2.atomic && n4(m2.doc), eY(m2, "markerAdded", m2, d2);
        }
        return d2;
      }
      iy.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var t10 = this.doc.cm, e10 = t10 && !t10.curOp;
          if (e10 && nn(t10), tO(this, "clear")) {
            var r10 = this.find();
            r10 && eY(this, "clear", r10.from, r10.to);
          }
          for (var n10 = null, i10 = null, o2 = 0; o2 < this.lines.length; ++o2) {
            var a2 = this.lines[o2], l2 = ex(a2.markedSpans, this);
            t10 && !this.collapsed ? rF(t10, t3(a2), "text") : t10 && (null != l2.to && (i10 = t3(a2)), null != l2.from && (n10 = t3(a2))), a2.markedSpans = function(t11, e11) {
              for (var r11, n11 = 0; n11 < t11.length; ++n11) t11[n11] != e11 && (r11 || (r11 = [])).push(t11[n11]);
              return r11;
            }(a2.markedSpans, l2), null == l2.from && this.collapsed && !eF(this.doc, a2) && t10 && t22(a2, rL(t10.display));
          }
          if (t10 && this.collapsed && !t10.options.lineWrapping) for (var s2 = 0; s2 < this.lines.length; ++s2) {
            var u2 = eI(this.lines[s2]), c2 = eE(u2);
            c2 > t10.display.maxLineLength && (t10.display.maxLine = u2, t10.display.maxLineLength = c2, t10.display.maxLineChanged = true);
          }
          null != n10 && t10 && this.collapsed && rW(t10, n10, i10 + 1), this.lines.length = 0, this.explicitlyCleared = true, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = false, t10 && n4(t10.doc)), t10 && eY(t10, "markerCleared", t10, this, n10, i10), e10 && ni(t10), this.parent && this.parent.clear();
        }
      }, iy.prototype.find = function(t10, e10) {
        null == t10 && "bookmark" == this.type && (t10 = 1);
        for (var r10, n10, i10 = 0; i10 < this.lines.length; ++i10) {
          var o2 = this.lines[i10], a2 = ex(o2.markedSpans, this);
          if (null != a2.from && (r10 = t7(e10 ? o2 : t3(o2), a2.from), -1 == t10)) return r10;
          if (null != a2.to && (n10 = t7(e10 ? o2 : t3(o2), a2.to), 1 == t10)) return n10;
        }
        return r10 && { from: r10, to: n10 };
      }, iy.prototype.changed = function() {
        var t10 = this, e10 = this.find(-1, true), r10 = this, n10 = this.doc.cm;
        e10 && n10 && no(n10, function() {
          var i10 = e10.line, o2 = ri(n10, t3(e10.line));
          if (o2 && (ru(o2), n10.curOp.selectionChanged = n10.curOp.forceUpdate = true), n10.curOp.updateMaxLine = true, !eF(r10.doc, i10) && null != r10.height) {
            var a2 = r10.height;
            r10.height = null;
            var l2 = e5(r10) - a2;
            l2 && t22(i10, i10.height + l2);
          }
          eY(n10, "markerChanged", n10, t10);
        });
      }, iy.prototype.attachLine = function(t10) {
        if (!this.lines.length && this.doc.cm) {
          var e10 = this.doc.cm.curOp;
          e10.maybeHiddenMarkers && -1 != J(e10.maybeHiddenMarkers, this) || (e10.maybeUnhiddenMarkers || (e10.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(t10);
      }, iy.prototype.detachLine = function(t10) {
        if (this.lines.splice(J(this.lines, t10), 1), !this.lines.length && this.doc.cm) {
          var e10 = this.doc.cm.curOp;
          (e10.maybeHiddenMarkers || (e10.maybeHiddenMarkers = [])).push(this);
        }
      }, tI(iy);
      var iw = function(t10, e10) {
        this.markers = t10, this.primary = e10;
        for (var r10 = 0; r10 < t10.length; ++r10) t10[r10].parent = this;
      };
      function ix(t10) {
        return t10.findMarks(t7(t10.first, 0), t10.clipPos(t7(t10.lastLine())), function(t11) {
          return t11.parent;
        });
      }
      iw.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared = true;
          for (var t10 = 0; t10 < this.markers.length; ++t10) this.markers[t10].clear();
          eY(this, "clear");
        }
      }, iw.prototype.find = function(t10, e10) {
        return this.primary.find(t10, e10);
      }, tI(iw);
      var iM = 0, iC = function(t10, e10, r10, n10, i10) {
        if (!(this instanceof iC)) return new iC(t10, e10, r10, n10, i10);
        null == r10 && (r10 = 0), ip.call(this, [new id([new ez("", null)])]), this.first = r10, this.scrollTop = this.scrollLeft = 0, this.cantEdit = false, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r10;
        var o2 = t7(r10, 0);
        this.sel = nO(o2), this.history = new nG(null), this.id = ++iM, this.modeOption = e10, this.lineSep = n10, this.direction = "rtl" == i10 ? "rtl" : "ltr", this.extend = false, "string" == typeof t10 && (t10 = this.splitLines(t10)), nz(this, { from: o2, to: o2, text: t10 }), n1(this, nO(o2), te);
      };
      iC.prototype = tc(ip.prototype, { constructor: iC, iter: function(t10, e10, r10) {
        r10 ? this.iterN(t10 - this.first, e10 - t10, r10) : this.iterN(this.first, this.first + this.size, t10);
      }, insert: function(t10, e10) {
        for (var r10 = 0, n10 = 0; n10 < e10.length; ++n10) r10 += e10[n10].height;
        this.insertInner(t10 - this.first, e10, r10);
      }, remove: function(t10, e10) {
        this.removeInner(t10 - this.first, e10);
      }, getValue: function(t10) {
        var e10 = t1(this, this.first, this.first + this.size);
        return false === t10 ? e10 : e10.join(t10 || this.lineSeparator());
      }, setValue: ns(function(t10) {
        var e10 = t7(this.first, 0), r10 = this.first + this.size - 1;
        ie(this, { from: e10, to: t7(r10, tJ(this, r10).text.length), text: this.splitLines(t10), origin: "setValue", full: true }, true), this.cm && rJ(this.cm, 0, 0), n1(this, nO(e10), te);
      }), replaceRange: function(t10, e10, r10, n10) {
        e10 = ei(this, e10), r10 = r10 ? ei(this, r10) : e10, il(this, t10, e10, r10, n10);
      }, getRange: function(t10, e10, r10) {
        var n10 = t0(this, ei(this, t10), ei(this, e10));
        return false === r10 ? n10 : "" === r10 ? n10.join("") : n10.join(r10 || this.lineSeparator());
      }, getLine: function(t10) {
        var e10 = this.getLineHandle(t10);
        return e10 && e10.text;
      }, getLineHandle: function(t10) {
        if (t5(this, t10)) return tJ(this, t10);
      }, getLineNumber: function(t10) {
        return t3(t10);
      }, getLineHandleVisualStart: function(t10) {
        return "number" == typeof t10 && (t10 = tJ(this, t10)), eI(t10);
      }, lineCount: function() {
        return this.size;
      }, firstLine: function() {
        return this.first;
      }, lastLine: function() {
        return this.first + this.size - 1;
      }, clipPos: function(t10) {
        return ei(this, t10);
      }, getCursor: function(t10) {
        var e10, r10 = this.sel.primary();
        return null == t10 || "head" == t10 ? r10.head : "anchor" == t10 ? r10.anchor : "end" == t10 || "to" == t10 || false === t10 ? r10.to() : r10.from();
      }, listSelections: function() {
        return this.sel.ranges;
      }, somethingSelected: function() {
        return this.sel.somethingSelected();
      }, setCursor: ns(function(t10, e10, r10) {
        n1(this, nO(ei(this, "number" == typeof t10 ? t7(t10, e10 || 0) : t10), null), r10);
      }), setSelection: ns(function(t10, e10, r10) {
        var n10;
        n10 = ei(this, t10), n1(this, nO(n10, ei(this, e10 || t10)), r10);
      }), extendSelection: ns(function(t10, e10, r10) {
        nZ(this, ei(this, t10), e10 && ei(this, e10), r10);
      }), extendSelections: ns(function(t10, e10) {
        nQ(this, eo(this, t10), e10);
      }), extendSelectionsBy: ns(function(t10, e10) {
        nQ(this, eo(this, ts(this.sel.ranges, t10)), e10);
      }), setSelections: ns(function(t10, e10, r10) {
        if (t10.length) {
          for (var n10 = [], i10 = 0; i10 < t10.length; i10++) n10[i10] = new nA(ei(this, t10[i10].anchor), ei(this, t10[i10].head || t10[i10].anchor));
          null == e10 && (e10 = Math.min(t10.length - 1, this.sel.primIndex)), n1(this, nN(this.cm, n10, e10), r10);
        }
      }), addSelection: ns(function(t10, e10, r10) {
        var n10 = this.sel.ranges.slice(0);
        n10.push(new nA(ei(this, t10), ei(this, e10 || t10))), n1(this, nN(this.cm, n10, n10.length - 1), r10);
      }), getSelection: function(t10) {
        for (var e10, r10 = this.sel.ranges, n10 = 0; n10 < r10.length; n10++) {
          var i10 = t0(this, r10[n10].from(), r10[n10].to());
          e10 = e10 ? e10.concat(i10) : i10;
        }
        return false === t10 ? e10 : e10.join(t10 || this.lineSeparator());
      }, getSelections: function(t10) {
        for (var e10 = [], r10 = this.sel.ranges, n10 = 0; n10 < r10.length; n10++) {
          var i10 = t0(this, r10[n10].from(), r10[n10].to());
          false !== t10 && (i10 = i10.join(t10 || this.lineSeparator())), e10[n10] = i10;
        }
        return e10;
      }, replaceSelection: function(t10, e10, r10) {
        for (var n10 = [], i10 = 0; i10 < this.sel.ranges.length; i10++) n10[i10] = t10;
        this.replaceSelections(n10, e10, r10 || "+input");
      }, replaceSelections: ns(function(t10, e10, r10) {
        for (var n10 = [], i10 = this.sel, o2 = 0; o2 < i10.ranges.length; o2++) {
          var a2 = i10.ranges[o2];
          n10[o2] = { from: a2.from(), to: a2.to(), text: this.splitLines(t10[o2]), origin: r10 };
        }
        for (var l2 = e10 && "end" != e10 && function(t11, e11, r11) {
          for (var n11 = [], i11 = t7(t11.first, 0), o3 = i11, a3 = 0; a3 < e11.length; a3++) {
            var l3 = e11[a3], s3 = nF(l3.from, i11, o3), u2 = nF(nI(l3), i11, o3);
            if (i11 = l3.to, o3 = u2, "around" == r11) {
              var c2 = t11.sel.ranges[a3], f2 = 0 > t8(c2.head, c2.anchor);
              n11[a3] = new nA(f2 ? u2 : s3, f2 ? s3 : u2);
            } else n11[a3] = new nA(s3, s3);
          }
          return new nT(n11, t11.sel.primIndex);
        }(this, n10, e10), s2 = n10.length - 1; s2 >= 0; s2--) ie(this, n10[s2]);
        l2 ? n0(this, l2) : this.cm && rQ(this.cm);
      }), undo: ns(function() {
        ii(this, "undo");
      }), redo: ns(function() {
        ii(this, "redo");
      }), undoSelection: ns(function() {
        ii(this, "undo", true);
      }), redoSelection: ns(function() {
        ii(this, "redo", true);
      }), setExtending: function(t10) {
        this.extend = t10;
      }, getExtending: function() {
        return this.extend;
      }, historySize: function() {
        for (var t10 = this.history, e10 = 0, r10 = 0, n10 = 0; n10 < t10.done.length; n10++) !t10.done[n10].ranges && ++e10;
        for (var i10 = 0; i10 < t10.undone.length; i10++) !t10.undone[i10].ranges && ++r10;
        return { undo: e10, redo: r10 };
      }, clearHistory: function() {
        var t10 = this;
        this.history = new nG(this.history), nR(this, function(e10) {
          return e10.history = t10.history;
        }, true);
      }, markClean: function() {
        this.cleanGeneration = this.changeGeneration(true);
      }, changeGeneration: function(t10) {
        return t10 && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
      }, isClean: function(t10) {
        return this.history.generation == (t10 || this.cleanGeneration);
      }, getHistory: function() {
        return { done: n$(this.history.done), undone: n$(this.history.undone) };
      }, setHistory: function(t10) {
        var e10 = this.history = new nG(this.history);
        e10.done = n$(t10.done.slice(0), null, true), e10.undone = n$(t10.undone.slice(0), null, true);
      }, setGutterMarker: ns(function(t10, e10, r10) {
        return ih(this, t10, "gutter", function(t11) {
          var n10 = t11.gutterMarkers || (t11.gutterMarkers = {});
          return n10[e10] = r10, !r10 && tp(n10) && (t11.gutterMarkers = null), true;
        });
      }), clearGutter: ns(function(t10) {
        var e10 = this;
        this.iter(function(r10) {
          r10.gutterMarkers && r10.gutterMarkers[t10] && ih(e10, r10, "gutter", function() {
            return r10.gutterMarkers[t10] = null, tp(r10.gutterMarkers) && (r10.gutterMarkers = null), true;
          });
        });
      }), lineInfo: function(t10) {
        var e10;
        if ("number" == typeof t10) {
          if (!t5(this, t10) || (e10 = t10, !(t10 = tJ(this, t10)))) return null;
        } else if (null == (e10 = t3(t10))) return null;
        return { line: e10, handle: t10, text: t10.text, gutterMarkers: t10.gutterMarkers, textClass: t10.textClass, bgClass: t10.bgClass, wrapClass: t10.wrapClass, widgets: t10.widgets };
      }, addLineClass: ns(function(t10, e10, r10) {
        return ih(this, t10, "gutter" == e10 ? "gutter" : "class", function(t11) {
          var n10 = "text" == e10 ? "textClass" : "background" == e10 ? "bgClass" : "gutter" == e10 ? "gutterClass" : "wrapClass";
          if (t11[n10]) {
            if (F(r10).test(t11[n10])) return false;
            t11[n10] += " " + r10;
          } else t11[n10] = r10;
          return true;
        });
      }), removeLineClass: ns(function(t10, e10, r10) {
        return ih(this, t10, "gutter" == e10 ? "gutter" : "class", function(t11) {
          var n10 = "text" == e10 ? "textClass" : "background" == e10 ? "bgClass" : "gutter" == e10 ? "gutterClass" : "wrapClass", i10 = t11[n10];
          if (!i10) return false;
          if (null == r10) t11[n10] = null;
          else {
            var o2 = i10.match(F(r10));
            if (!o2) return false;
            var a2 = o2.index + o2[0].length;
            t11[n10] = i10.slice(0, o2.index) + (o2.index && a2 != i10.length ? " " : "") + i10.slice(a2) || null;
          }
          return true;
        });
      }), addLineWidget: ns(function(t10, e10, r10) {
        var n10, i10, o2;
        return n10 = this, i10 = new ig(n10, e10, r10), (o2 = n10.cm) && i10.noHScroll && (o2.display.alignWidgets = true), ih(n10, t10, "widget", function(t11) {
          var e11 = t11.widgets || (t11.widgets = []);
          if (null == i10.insertAt ? e11.push(i10) : e11.splice(Math.min(e11.length, Math.max(0, i10.insertAt)), 0, i10), i10.line = t11, o2 && !eF(n10, t11)) {
            var r11 = eH(t11) < n10.scrollTop;
            t22(t11, t11.height + e5(i10)), r11 && rZ(o2, i10.height), o2.curOp.forceUpdate = true;
          }
          return true;
        }), o2 && eY(o2, "lineWidgetAdded", o2, i10, "number" == typeof t10 ? t10 : t3(t10)), i10;
      }), removeLineWidget: function(t10) {
        t10.clear();
      }, markText: function(t10, e10, r10) {
        return ib(this, ei(this, t10), ei(this, e10), r10, r10 && r10.type || "range");
      }, setBookmark: function(t10, e10) {
        var r10 = { replacedWith: e10 && (null == e10.nodeType ? e10.widget : e10), insertLeft: e10 && e10.insertLeft, clearWhenEmpty: false, shared: e10 && e10.shared, handleMouseEvents: e10 && e10.handleMouseEvents };
        return ib(this, t10 = ei(this, t10), t10, r10, "bookmark");
      }, findMarksAt: function(t10) {
        t10 = ei(this, t10);
        var e10 = [], r10 = tJ(this, t10.line).markedSpans;
        if (r10) for (var n10 = 0; n10 < r10.length; ++n10) {
          var i10 = r10[n10];
          (null == i10.from || i10.from <= t10.ch) && (null == i10.to || i10.to >= t10.ch) && e10.push(i10.marker.parent || i10.marker);
        }
        return e10;
      }, findMarks: function(t10, e10, r10) {
        t10 = ei(this, t10), e10 = ei(this, e10);
        var n10 = [], i10 = t10.line;
        return this.iter(t10.line, e10.line + 1, function(o2) {
          var a2 = o2.markedSpans;
          if (a2) for (var l2 = 0; l2 < a2.length; l2++) {
            var s2 = a2[l2];
            !(null != s2.to && i10 == t10.line && t10.ch >= s2.to || null == s2.from && i10 != t10.line || null != s2.from && i10 == e10.line && s2.from >= e10.ch) && (!r10 || r10(s2.marker)) && n10.push(s2.marker.parent || s2.marker);
          }
          ++i10;
        }), n10;
      }, getAllMarks: function() {
        var t10 = [];
        return this.iter(function(e10) {
          var r10 = e10.markedSpans;
          if (r10) for (var n10 = 0; n10 < r10.length; ++n10) null != r10[n10].from && t10.push(r10[n10].marker);
        }), t10;
      }, posFromIndex: function(t10) {
        var e10, r10 = this.first, n10 = this.lineSeparator().length;
        return this.iter(function(i10) {
          var o2 = i10.text.length + n10;
          if (o2 > t10) return e10 = t10, true;
          t10 -= o2, ++r10;
        }), ei(this, t7(r10, e10));
      }, indexFromPos: function(t10) {
        var e10 = (t10 = ei(this, t10)).ch;
        if (t10.line < this.first || t10.ch < 0) return 0;
        var r10 = this.lineSeparator().length;
        return this.iter(this.first, t10.line, function(t11) {
          e10 += t11.text.length + r10;
        }), e10;
      }, copy: function(t10) {
        var e10 = new iC(t1(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
        return e10.scrollTop = this.scrollTop, e10.scrollLeft = this.scrollLeft, e10.sel = this.sel, e10.extend = false, t10 && (e10.history.undoDepth = this.history.undoDepth, e10.setHistory(this.getHistory())), e10;
      }, linkedDoc: function(t10) {
        t10 || (t10 = {});
        var e10 = this.first, r10 = this.first + this.size;
        null != t10.from && t10.from > e10 && (e10 = t10.from), null != t10.to && t10.to < r10 && (r10 = t10.to);
        var n10 = new iC(t1(this, e10, r10), t10.mode || this.modeOption, e10, this.lineSep, this.direction);
        return t10.sharedHist && (n10.history = this.history), (this.linked || (this.linked = [])).push({ doc: n10, sharedHist: t10.sharedHist }), n10.linked = [{ doc: this, isParent: true, sharedHist: t10.sharedHist }], function(t11, e11) {
          for (var r11 = 0; r11 < e11.length; r11++) {
            var n11 = e11[r11], i10 = n11.find(), o2 = t11.clipPos(i10.from), a2 = t11.clipPos(i10.to);
            if (t8(o2, a2)) {
              var l2 = ib(t11, o2, a2, n11.primary, n11.primary.type);
              n11.markers.push(l2), l2.parent = n11;
            }
          }
        }(n10, ix(this)), n10;
      }, unlinkDoc: function(t10) {
        if (t10 instanceof oo && (t10 = t10.doc), this.linked) {
          for (var e10 = 0; e10 < this.linked.length; ++e10) if (this.linked[e10].doc == t10) {
            this.linked.splice(e10, 1), t10.unlinkDoc(this), function(t11) {
              for (var e11 = 0; e11 < t11.length; e11++) !function(e12) {
                var r11 = t11[e12], n10 = [r11.primary.doc];
                nR(r11.primary.doc, function(t12) {
                  return n10.push(t12);
                });
                for (var i10 = 0; i10 < r11.markers.length; i10++) {
                  var o2 = r11.markers[i10];
                  -1 == J(n10, o2.doc) && (o2.parent = null, r11.markers.splice(i10--, 1));
                }
              }(e11);
            }(ix(this));
            break;
          }
        }
        if (t10.history == this.history) {
          var r10 = [t10.id];
          nR(t10, function(t11) {
            return r10.push(t11.id);
          }, true), t10.history = new nG(null), t10.history.done = n$(this.history.done, r10), t10.history.undone = n$(this.history.undone, r10);
        }
      }, iterLinkedDocs: function(t10) {
        nR(this, t10);
      }, getMode: function() {
        return this.mode;
      }, getEditor: function() {
        return this.cm;
      }, splitLines: function(t10) {
        return this.lineSep ? t10.split(this.lineSep) : tR(t10);
      }, lineSeparator: function() {
        return this.lineSep || "\n";
      }, setDirection: ns(function(t10) {
        if ("rtl" != t10 && (t10 = "ltr"), t10 != this.direction && (this.direction = t10, this.iter(function(t11) {
          return t11.order = null;
        }), this.cm)) {
          var e10;
          no(e10 = this.cm, function() {
            nV(e10), rW(e10);
          });
        }
      }) }), iC.prototype.eachLine = iC.prototype.iter;
      var ik = 0;
      function iL(t10) {
        var e10 = this;
        if (iS(e10), !(tA(e10, t10) || e6(e10.display, t10))) {
          tD(t10), g && (ik = +/* @__PURE__ */ new Date());
          var r10 = rI(e10, t10, true), n10 = t10.dataTransfer.files;
          if (!(!r10 || e10.isReadOnly())) {
            if (n10 && n10.length && window.FileReader && window.File) for (var i10 = n10.length, o2 = Array(i10), a2 = 0, l2 = function() {
              ++a2 == i10 && na(e10, function() {
                var t11 = { from: r10 = ei(e10.doc, r10), to: r10, text: e10.doc.splitLines(o2.filter(function(t12) {
                  return null != t12;
                }).join(e10.doc.lineSeparator())), origin: "paste" };
                ie(e10.doc, t11), n0(e10.doc, nO(ei(e10.doc, r10), ei(e10.doc, nI(t11))));
              })();
            }, s2 = function(t11, r11) {
              if (e10.options.allowDropFileTypes && -1 == J(e10.options.allowDropFileTypes, t11.type)) {
                l2();
                return;
              }
              var n11 = new FileReader();
              n11.onerror = function() {
                return l2();
              }, n11.onload = function() {
                var t12 = n11.result;
                if (/[\x00-\x08\x0e-\x1f]{2}/.test(t12)) {
                  l2();
                  return;
                }
                o2[r11] = t12, l2();
              }, n11.readAsText(t11);
            }, u2 = 0; u2 < n10.length; u2++) s2(n10[u2], u2);
            else {
              if (e10.state.draggingText && e10.doc.sel.contains(r10) > -1) {
                e10.state.draggingText(t10), setTimeout(function() {
                  return e10.display.input.focus();
                }, 20);
                return;
              }
              try {
                var c2, f2 = t10.dataTransfer.getData("Text");
                if (f2) {
                  if (e10.state.draggingText && !e10.state.draggingText.copy && (c2 = e10.listSelections()), n2(e10.doc, nO(r10, r10)), c2) for (var h2 = 0; h2 < c2.length; ++h2) il(e10.doc, "", c2[h2].anchor, c2[h2].head, "drag");
                  e10.replaceSelection(f2, "around", "paste"), e10.display.input.focus();
                }
              } catch (t11) {
              }
            }
          }
        }
      }
      function iS(t10) {
        t10.display.dragCursor && (t10.display.lineSpace.removeChild(t10.display.dragCursor), t10.display.dragCursor = null);
      }
      function iT(t10) {
        if (document.getElementsByClassName) {
          for (var e10 = document.getElementsByClassName("CodeMirror"), r10 = [], n10 = 0; n10 < e10.length; n10++) {
            var i10 = e10[n10].CodeMirror;
            i10 && r10.push(i10);
          }
          r10.length && r10[0].operation(function() {
            for (var e11 = 0; e11 < r10.length; e11++) t10(r10[e11]);
          });
        }
      }
      var iA = false;
      function iN(t10) {
        var e10 = t10.display;
        e10.cachedCharWidth = e10.cachedTextHeight = e10.cachedPaddingH = null, e10.scrollbarsClipped = false, t10.setSize();
      }
      for (var iO = { 3: "Pause", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert", 46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 145: "ScrollLock", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 224: "Mod", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete", 63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert" }, iI = 0; iI < 10; iI++) iO[iI + 48] = iO[iI + 96] = String(iI);
      for (var iD = 65; iD <= 90; iD++) iO[iD] = String.fromCharCode(iD);
      for (var iW = 1; iW <= 12; iW++) iO[iW + 111] = iO[iW + 63235] = "F" + iW;
      var iF = {};
      function iH(t10) {
        var e10, r10, n10, i10, o2 = t10.split(/-(?!$)/);
        t10 = o2[o2.length - 1];
        for (var a2 = 0; a2 < o2.length - 1; a2++) {
          var l2 = o2[a2];
          if (/^(cmd|meta|m)$/i.test(l2)) i10 = true;
          else if (/^a(lt)?$/i.test(l2)) e10 = true;
          else if (/^(c|ctrl|control)$/i.test(l2)) r10 = true;
          else if (/^s(hift)?$/i.test(l2)) n10 = true;
          else throw Error("Unrecognized modifier name: " + l2);
        }
        return e10 && (t10 = "Alt-" + t10), r10 && (t10 = "Ctrl-" + t10), i10 && (t10 = "Cmd-" + t10), n10 && (t10 = "Shift-" + t10), t10;
      }
      function iE(t10, e10, r10, n10) {
        var i10 = (e10 = iB(e10)).call ? e10.call(t10, n10) : e10[t10];
        if (false === i10) return "nothing";
        if ("..." === i10) return "multi";
        if (null != i10 && r10(i10)) return "handled";
        if (e10.fallthrough) {
          if ("[object Array]" != Object.prototype.toString.call(e10.fallthrough)) return iE(t10, e10.fallthrough, r10, n10);
          for (var o2 = 0; o2 < e10.fallthrough.length; o2++) {
            var a2 = iE(t10, e10.fallthrough[o2], r10, n10);
            if (a2) return a2;
          }
        }
      }
      function iP(t10) {
        var e10 = "string" == typeof t10 ? t10 : iO[t10.keyCode];
        return "Ctrl" == e10 || "Alt" == e10 || "Shift" == e10 || "Mod" == e10;
      }
      function iz(t10, e10, r10) {
        var n10 = t10;
        return e10.altKey && "Alt" != n10 && (t10 = "Alt-" + t10), (D ? e10.metaKey : e10.ctrlKey) && "Ctrl" != n10 && (t10 = "Ctrl-" + t10), (D ? e10.ctrlKey : e10.metaKey) && "Mod" != n10 && (t10 = "Cmd-" + t10), !r10 && e10.shiftKey && "Shift" != n10 && (t10 = "Shift-" + t10), t10;
      }
      function iR(t10, e10) {
        if (x && 34 == t10.keyCode && t10.char) return false;
        var r10 = iO[t10.keyCode];
        return null != r10 && !t10.altGraphKey && (3 == t10.keyCode && t10.code && (r10 = t10.code), iz(r10, t10, e10));
      }
      function iB(t10) {
        return "string" == typeof t10 ? iF[t10] : t10;
      }
      function iV(t10, e10) {
        for (var r10 = t10.doc.sel.ranges, n10 = [], i10 = 0; i10 < r10.length; i10++) {
          for (var o2 = e10(r10[i10]); n10.length && 0 >= t8(o2.from, tl(n10).to); ) {
            var a2 = n10.pop();
            if (0 > t8(a2.from, o2.from)) {
              o2.from = a2.from;
              break;
            }
          }
          n10.push(o2);
        }
        no(t10, function() {
          for (var e11 = n10.length - 1; e11 >= 0; e11--) il(t10.doc, "", n10[e11].from, n10[e11].to, "+delete");
          rQ(t10);
        });
      }
      function iG(t10, e10, r10) {
        var n10 = tm(t10.text, e10 + r10, r10);
        return n10 < 0 || n10 > t10.text.length ? null : n10;
      }
      function iU(t10, e10, r10) {
        var n10 = iG(t10, e10.ch, r10);
        return null == n10 ? null : new t7(e10.line, n10, r10 < 0 ? "after" : "before");
      }
      function ij(t10, e10, r10, n10, i10) {
        if (t10) {
          "rtl" == e10.doc.direction && (i10 = -i10);
          var o2 = tM(r10, e10.doc.direction);
          if (o2) {
            var a2, l2 = i10 < 0 ? tl(o2) : o2[0], s2 = i10 < 0 == (1 == l2.level) ? "after" : "before";
            if (l2.level > 0 || "rtl" == e10.doc.direction) {
              var u2 = ro(e10, r10), c2 = ra(e10, u2, a2 = i10 < 0 ? r10.text.length - 1 : 0).top;
              a2 = ty(function(t11) {
                return ra(e10, u2, t11).top == c2;
              }, i10 < 0 == (1 == l2.level) ? l2.from : l2.to - 1, a2), "before" == s2 && (a2 = iG(r10, a2, 1));
            } else a2 = i10 < 0 ? l2.to : l2.from;
            return new t7(n10, a2, s2);
          }
        }
        return new t7(n10, i10 < 0 ? r10.text.length : 0, i10 < 0 ? "before" : "after");
      }
      iF.basic = { Left: "goCharLeft", Right: "goCharRight", Up: "goLineUp", Down: "goLineDown", End: "goLineEnd", Home: "goLineStartSmart", PageUp: "goPageUp", PageDown: "goPageDown", Delete: "delCharAfter", Backspace: "delCharBefore", "Shift-Backspace": "delCharBefore", Tab: "defaultTab", "Shift-Tab": "indentAuto", Enter: "newlineAndIndent", Insert: "toggleOverwrite", Esc: "singleSelection" }, iF.pcDefault = { "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo", "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown", "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd", "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find", "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll", "Ctrl-[": "indentLess", "Ctrl-]": "indentMore", "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection", fallthrough: "basic" }, iF.emacsy = { "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd", "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars", "Ctrl-O": "openLine" }, iF.macDefault = { "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo", "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft", "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore", "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find", "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll", "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight", "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd", fallthrough: ["basic", "emacsy"] }, iF.default = A ? iF.macDefault : iF.pcDefault;
      var iq = { selectAll: n9, singleSelection: function(t10) {
        return t10.setSelection(t10.getCursor("anchor"), t10.getCursor("head"), te);
      }, killLine: function(t10) {
        return iV(t10, function(e10) {
          if (!e10.empty()) return { from: e10.from(), to: e10.to() };
          var r10 = tJ(t10.doc, e10.head.line).text.length;
          return e10.head.ch == r10 && e10.head.line < t10.lastLine() ? { from: e10.head, to: t7(e10.head.line + 1, 0) } : { from: e10.head, to: t7(e10.head.line, r10) };
        });
      }, deleteLine: function(t10) {
        return iV(t10, function(e10) {
          return { from: t7(e10.from().line, 0), to: ei(t10.doc, t7(e10.to().line + 1, 0)) };
        });
      }, delLineLeft: function(t10) {
        return iV(t10, function(t11) {
          return { from: t7(t11.from().line, 0), to: t11.from() };
        });
      }, delWrappedLineLeft: function(t10) {
        return iV(t10, function(e10) {
          var r10 = t10.charCoords(e10.head, "div").top + 5;
          return { from: t10.coordsChar({ left: 0, top: r10 }, "div"), to: e10.from() };
        });
      }, delWrappedLineRight: function(t10) {
        return iV(t10, function(e10) {
          var r10 = t10.charCoords(e10.head, "div").top + 5, n10 = t10.coordsChar({ left: t10.display.lineDiv.offsetWidth + 100, top: r10 }, "div");
          return { from: e10.from(), to: n10 };
        });
      }, undo: function(t10) {
        return t10.undo();
      }, redo: function(t10) {
        return t10.redo();
      }, undoSelection: function(t10) {
        return t10.undoSelection();
      }, redoSelection: function(t10) {
        return t10.redoSelection();
      }, goDocStart: function(t10) {
        return t10.extendSelection(t7(t10.firstLine(), 0));
      }, goDocEnd: function(t10) {
        return t10.extendSelection(t7(t10.lastLine()));
      }, goLineStart: function(t10) {
        return t10.extendSelectionsBy(function(e10) {
          return i_(t10, e10.head.line);
        }, { origin: "+move", bias: 1 });
      }, goLineStartSmart: function(t10) {
        return t10.extendSelectionsBy(function(e10) {
          return iK(t10, e10.head);
        }, { origin: "+move", bias: 1 });
      }, goLineEnd: function(t10) {
        return t10.extendSelectionsBy(function(e10) {
          var r10, n10, i10, o2;
          return r10 = t10, n10 = e10.head.line, (o2 = function(t11) {
            for (var e11; e11 = eN(t11, false); ) t11 = e11.find(1, true).line;
            return t11;
          }(i10 = tJ(r10.doc, n10))) != i10 && (n10 = t3(o2)), ij(true, r10, i10, n10, -1);
        }, { origin: "+move", bias: -1 });
      }, goLineRight: function(t10) {
        return t10.extendSelectionsBy(function(e10) {
          var r10 = t10.cursorCoords(e10.head, "div").top + 5;
          return t10.coordsChar({ left: t10.display.lineDiv.offsetWidth + 100, top: r10 }, "div");
        }, tn);
      }, goLineLeft: function(t10) {
        return t10.extendSelectionsBy(function(e10) {
          var r10 = t10.cursorCoords(e10.head, "div").top + 5;
          return t10.coordsChar({ left: 0, top: r10 }, "div");
        }, tn);
      }, goLineLeftSmart: function(t10) {
        return t10.extendSelectionsBy(function(e10) {
          var r10 = t10.cursorCoords(e10.head, "div").top + 5, n10 = t10.coordsChar({ left: 0, top: r10 }, "div");
          return n10.ch < t10.getLine(n10.line).search(/\S/) ? iK(t10, e10.head) : n10;
        }, tn);
      }, goLineUp: function(t10) {
        return t10.moveV(-1, "line");
      }, goLineDown: function(t10) {
        return t10.moveV(1, "line");
      }, goPageUp: function(t10) {
        return t10.moveV(-1, "page");
      }, goPageDown: function(t10) {
        return t10.moveV(1, "page");
      }, goCharLeft: function(t10) {
        return t10.moveH(-1, "char");
      }, goCharRight: function(t10) {
        return t10.moveH(1, "char");
      }, goColumnLeft: function(t10) {
        return t10.moveH(-1, "column");
      }, goColumnRight: function(t10) {
        return t10.moveH(1, "column");
      }, goWordLeft: function(t10) {
        return t10.moveH(-1, "word");
      }, goGroupRight: function(t10) {
        return t10.moveH(1, "group");
      }, goGroupLeft: function(t10) {
        return t10.moveH(-1, "group");
      }, goWordRight: function(t10) {
        return t10.moveH(1, "word");
      }, delCharBefore: function(t10) {
        return t10.deleteH(-1, "codepoint");
      }, delCharAfter: function(t10) {
        return t10.deleteH(1, "char");
      }, delWordBefore: function(t10) {
        return t10.deleteH(-1, "word");
      }, delWordAfter: function(t10) {
        return t10.deleteH(1, "word");
      }, delGroupBefore: function(t10) {
        return t10.deleteH(-1, "group");
      }, delGroupAfter: function(t10) {
        return t10.deleteH(1, "group");
      }, indentAuto: function(t10) {
        return t10.indentSelection("smart");
      }, indentMore: function(t10) {
        return t10.indentSelection("add");
      }, indentLess: function(t10) {
        return t10.indentSelection("subtract");
      }, insertTab: function(t10) {
        return t10.replaceSelection("	");
      }, insertSoftTab: function(t10) {
        for (var e10 = [], r10 = t10.listSelections(), n10 = t10.options.tabSize, i10 = 0; i10 < r10.length; i10++) {
          var o2 = r10[i10].from(), a2 = Z(t10.getLine(o2.line), o2.ch, n10);
          e10.push(ta(n10 - a2 % n10));
        }
        t10.replaceSelections(e10);
      }, defaultTab: function(t10) {
        t10.somethingSelected() ? t10.indentSelection("add") : t10.execCommand("insertTab");
      }, transposeChars: function(t10) {
        return no(t10, function() {
          for (var e10 = t10.listSelections(), r10 = [], n10 = 0; n10 < e10.length; n10++) if (e10[n10].empty()) {
            var i10 = e10[n10].head, o2 = tJ(t10.doc, i10.line).text;
            if (o2) {
              if (i10.ch == o2.length && (i10 = new t7(i10.line, i10.ch - 1)), i10.ch > 0) i10 = new t7(i10.line, i10.ch + 1), t10.replaceRange(o2.charAt(i10.ch - 1) + o2.charAt(i10.ch - 2), t7(i10.line, i10.ch - 2), i10, "+transpose");
              else if (i10.line > t10.doc.first) {
                var a2 = tJ(t10.doc, i10.line - 1).text;
                a2 && (i10 = new t7(i10.line, 1), t10.replaceRange(o2.charAt(0) + t10.doc.lineSeparator() + a2.charAt(a2.length - 1), t7(i10.line - 1, a2.length - 1), i10, "+transpose"));
              }
            }
            r10.push(new nA(i10, i10));
          }
          t10.setSelections(r10);
        });
      }, newlineAndIndent: function(t10) {
        return no(t10, function() {
          for (var e10 = t10.listSelections(), r10 = e10.length - 1; r10 >= 0; r10--) t10.replaceRange(t10.doc.lineSeparator(), e10[r10].anchor, e10[r10].head, "+input");
          e10 = t10.listSelections();
          for (var n10 = 0; n10 < e10.length; n10++) t10.indentLine(e10[n10].from().line, null, true);
          rQ(t10);
        });
      }, openLine: function(t10) {
        return t10.replaceSelection("\n", "start");
      }, toggleOverwrite: function(t10) {
        return t10.toggleOverwrite();
      } };
      function i_(t10, e10) {
        var r10 = tJ(t10.doc, e10), n10 = eI(r10);
        return n10 != r10 && (e10 = t3(n10)), ij(true, t10, n10, e10, 1);
      }
      function iK(t10, e10) {
        var r10 = i_(t10, e10.line), n10 = tJ(t10.doc, r10.line), i10 = tM(n10, t10.doc.direction);
        if (!i10 || 0 == i10[0].level) {
          var o2 = Math.max(r10.ch, n10.text.search(/\S/)), a2 = e10.line == r10.line && e10.ch <= o2 && e10.ch;
          return t7(r10.line, a2 ? 0 : o2, r10.sticky);
        }
        return r10;
      }
      function iX(t10, e10, r10) {
        if ("string" == typeof e10 && !(e10 = iq[e10])) return false;
        t10.display.input.ensurePolled();
        var n10 = t10.display.shift, i10 = false;
        try {
          t10.isReadOnly() && (t10.state.suppressEdits = true), r10 && (t10.display.shift = false), i10 = e10(t10) != tt;
        } finally {
          t10.display.shift = n10, t10.state.suppressEdits = false;
        }
        return i10;
      }
      var i$ = new Q();
      function iY(t10, e10, r10, n10) {
        var i10 = t10.state.keySeq;
        if (i10) {
          if (iP(e10)) return "handled";
          if (/\'$/.test(e10) ? t10.state.keySeq = null : i$.set(50, function() {
            t10.state.keySeq == i10 && (t10.state.keySeq = null, t10.display.input.reset());
          }), iZ(t10, i10 + " " + e10, r10, n10)) return true;
        }
        return iZ(t10, e10, r10, n10);
      }
      function iZ(t10, e10, r10, n10) {
        var i10 = function(t11, e11, r11) {
          for (var n11 = 0; n11 < t11.state.keyMaps.length; n11++) {
            var i11 = iE(e11, t11.state.keyMaps[n11], r11, t11);
            if (i11) return i11;
          }
          return t11.options.extraKeys && iE(e11, t11.options.extraKeys, r11, t11) || iE(e11, t11.options.keyMap, r11, t11);
        }(t10, e10, n10);
        return "multi" == i10 && (t10.state.keySeq = e10), "handled" == i10 && eY(t10, "keyHandled", t10, e10, r10), ("handled" == i10 || "multi" == i10) && (tD(r10), rG(t10)), !!i10;
      }
      function iQ(t10, e10) {
        var r10 = iR(e10, true);
        return !!r10 && (e10.shiftKey && !t10.state.keySeq ? iY(t10, "Shift-" + r10, e10, function(e11) {
          return iX(t10, e11, true);
        }) || iY(t10, r10, e10, function(e11) {
          if ("string" == typeof e11 ? /^go[A-Z]/.test(e11) : e11.motion) return iX(t10, e11);
        }) : iY(t10, r10, e10, function(e11) {
          return iX(t10, e11);
        }));
      }
      var iJ = null;
      function i0(t10) {
        if (!t10.target || t10.target == this.display.input.getField()) {
          if (this.curOp.focus = V(_(this)), !tA(this, t10)) {
            g && v < 11 && 27 == t10.keyCode && (t10.returnValue = false);
            var e10 = t10.keyCode;
            this.display.shift = 16 == e10 || t10.shiftKey;
            var r10 = iQ(this, t10);
            x && (iJ = r10 ? e10 : null, !r10 && 88 == e10 && !tV && (A ? t10.metaKey : t10.ctrlKey) && this.replaceSelection("", null, "cut")), f && !A && !r10 && 46 == e10 && t10.shiftKey && !t10.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != e10 || /\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className) || function(t11) {
              var e11 = t11.display.lineDiv;
              function r11(t12) {
                18 != t12.keyCode && t12.altKey || (H(e11, "CodeMirror-crosshair"), tS(document, "keyup", r11), tS(document, "mouseover", r11));
              }
              G(e11, "CodeMirror-crosshair"), tk(document, "keyup", r11), tk(document, "mouseover", r11);
            }(this);
          }
        }
      }
      function i1(t10) {
        16 == t10.keyCode && (this.doc.sel.shift = false), tA(this, t10);
      }
      function i2(t10) {
        if (t10.target && t10.target != this.display.input.getField() || e6(this.display, t10) || tA(this, t10) || t10.ctrlKey && !t10.altKey || A && t10.metaKey) return;
        var e10, r10 = t10.keyCode, n10 = t10.charCode;
        if (x && r10 == iJ) {
          iJ = null, tD(t10);
          return;
        }
        if (!(x && (!t10.which || t10.which < 10) && iQ(this, t10))) {
          var i10 = String.fromCharCode(null == n10 ? r10 : n10);
          if ("\b" != i10) e10 = this, !iY(e10, "'" + i10 + "'", t10, function(t11) {
            return iX(e10, t11, true);
          }) && this.display.input.onKeyPress(t10);
        }
      }
      var i3 = function(t10, e10, r10) {
        this.time = t10, this.pos = e10, this.button = r10;
      };
      function i4(t10) {
        var e10, r10, n10, i10, o2, a2, u2, c2, f2, h2, d2, p2, y2, b2, w2, x2, C2, k2, L2, S2, T2, O2, I2, D2 = this.display;
        if (!(tA(this, t10) || D2.activeTouch && D2.input.supportsTouch())) {
          if (D2.input.ensurePolled(), D2.shift = t10.shiftKey, e6(D2, t10)) {
            m || (D2.scroller.draggable = false, setTimeout(function() {
              return D2.scroller.draggable = true;
            }, 100));
            return;
          }
          if (!i7(this, t10)) {
            var F2 = rI(this, t10), H2 = tP(t10), E2 = F2 ? (I2 = +/* @__PURE__ */ new Date(), s && s.compare(I2, F2, H2) ? (l = s = null, "triple") : l && l.compare(I2, F2, H2) ? (s = new i3(I2, F2, H2), l = null, "double") : (l = new i3(I2, F2, H2), s = null, "single")) : "single";
            if (X(this).focus(), 1 == H2 && this.state.selectingText && this.state.selectingText(t10), !(F2 && (e10 = this, r10 = H2, n10 = F2, i10 = E2, o2 = t10, a2 = "Click", "double" == i10 ? a2 = "Double" + a2 : "triple" == i10 && (a2 = "Triple" + a2), iY(e10, iz(a2 = (1 == r10 ? "Left" : 2 == r10 ? "Middle" : "Right") + a2, o2), o2, function(t11) {
              if ("string" == typeof t11 && (t11 = iq[t11]), !t11) return false;
              var r11 = false;
              try {
                e10.isReadOnly() && (e10.state.suppressEdits = true), r11 = t11(e10, n10) != tt;
              } finally {
                e10.state.suppressEdits = false;
              }
              return r11;
            })))) {
              1 == H2 ? F2 ? (u2 = this, c2 = F2, f2 = E2, h2 = t10, g ? setTimeout($(rU, u2), 0) : u2.curOp.focus = V(_(u2)), d2 = function(t11, e11, r11) {
                var n11 = t11.getOption("configureMouse"), i11 = n11 ? n11(t11, e11, r11) : {};
                if (null == i11.unit) {
                  var o3 = N ? r11.shiftKey && r11.metaKey : r11.altKey;
                  i11.unit = o3 ? "rectangle" : "single" == e11 ? "char" : "double" == e11 ? "word" : "line";
                }
                return (null == i11.extend || t11.doc.extend) && (i11.extend = t11.doc.extend || r11.shiftKey), null == i11.addNew && (i11.addNew = A ? r11.metaKey : r11.ctrlKey), null == i11.moveOnDrag && (i11.moveOnDrag = !(A ? r11.altKey : r11.ctrlKey)), i11;
              }(u2, f2, h2), y2 = u2.doc.sel, u2.options.dragDrop && tz && !u2.isReadOnly() && "single" == f2 && (p2 = y2.contains(c2)) > -1 && (0 > t8((p2 = y2.ranges[p2]).from(), c2) || c2.xRel > 0) && (t8(p2.to(), c2) > 0 || c2.xRel < 0) ? (b2 = u2, w2 = h2, x2 = c2, C2 = d2, k2 = b2.display, L2 = false, S2 = na(b2, function(t11) {
                m && (k2.scroller.draggable = false), b2.state.draggingText = false, b2.state.delayingBlurEvent && (b2.hasFocus() ? b2.state.delayingBlurEvent = false : rj(b2)), tS(k2.wrapper.ownerDocument, "mouseup", S2), tS(k2.wrapper.ownerDocument, "mousemove", T2), tS(k2.scroller, "dragstart", O2), tS(k2.scroller, "drop", S2), L2 || (tD(t11), C2.addNew || nZ(b2.doc, x2, null, null, C2.extend), m && !M || g && 9 == v ? setTimeout(function() {
                  k2.wrapper.ownerDocument.body.focus({ preventScroll: true }), k2.input.focus();
                }, 20) : k2.input.focus());
              }), T2 = function(t11) {
                L2 = L2 || Math.abs(w2.clientX - t11.clientX) + Math.abs(w2.clientY - t11.clientY) >= 10;
              }, O2 = function() {
                return L2 = true;
              }, m && (k2.scroller.draggable = true), b2.state.draggingText = S2, S2.copy = !C2.moveOnDrag, tk(k2.wrapper.ownerDocument, "mouseup", S2), tk(k2.wrapper.ownerDocument, "mousemove", T2), tk(k2.scroller, "dragstart", O2), tk(k2.scroller, "drop", S2), b2.state.delayingBlurEvent = true, setTimeout(function() {
                return k2.input.focus();
              }, 20), k2.scroller.dragDrop && k2.scroller.dragDrop()) : function(t11, e11, r11, n11) {
                g && rj(t11);
                var i11 = t11.display, o3 = t11.doc;
                tD(e11);
                var a3, l2, s2 = o3.sel, u3 = s2.ranges;
                if (n11.addNew && !n11.extend ? a3 = (l2 = o3.sel.contains(r11)) > -1 ? u3[l2] : new nA(r11, r11) : (a3 = o3.sel.primary(), l2 = o3.sel.primIndex), "rectangle" == n11.unit) n11.addNew || (a3 = new nA(r11, r11)), r11 = rI(t11, e11, true, true), l2 = -1;
                else {
                  var c3 = i5(t11, r11, n11.unit);
                  a3 = n11.extend ? nY(a3, c3.anchor, c3.head, n11.extend) : c3;
                }
                n11.addNew ? -1 == l2 ? (l2 = u3.length, n1(o3, nN(t11, u3.concat([a3]), l2), { scroll: false, origin: "*mouse" })) : u3.length > 1 && u3[l2].empty() && "char" == n11.unit && !n11.extend ? (n1(o3, nN(t11, u3.slice(0, l2).concat(u3.slice(l2 + 1)), 0), { scroll: false, origin: "*mouse" }), s2 = o3.sel) : nJ(o3, l2, a3, tr) : (l2 = 0, n1(o3, new nT([a3], 0), tr), s2 = o3.sel);
                var f3 = r11, h3 = i11.wrapper.getBoundingClientRect(), d3 = 0;
                function p3(e12) {
                  t11.state.selectingText = false, d3 = 1 / 0, e12 && (tD(e12), i11.input.focus()), tS(i11.wrapper.ownerDocument, "mousemove", v2), tS(i11.wrapper.ownerDocument, "mouseup", m2), o3.history.lastSelOrigin = null;
                }
                var v2 = na(t11, function(e12) {
                  0 !== e12.buttons && tP(e12) ? function e13(u4) {
                    var c4 = ++d3, p4 = rI(t11, u4, true, "rectangle" == n11.unit);
                    if (p4) {
                      if (0 != t8(p4, f3)) {
                        t11.curOp.focus = V(_(t11)), function(e14) {
                          if (0 != t8(f3, e14)) {
                            if (f3 = e14, "rectangle" == n11.unit) {
                              for (var i12 = [], u5 = t11.options.tabSize, c5 = Z(tJ(o3, r11.line).text, r11.ch, u5), h4 = Z(tJ(o3, e14.line).text, e14.ch, u5), d4 = Math.min(c5, h4), p5 = Math.max(c5, h4), g3 = Math.min(r11.line, e14.line), v4 = Math.min(t11.lastLine(), Math.max(r11.line, e14.line)); g3 <= v4; g3++) {
                                var m3 = tJ(o3, g3).text, y3 = ti(m3, d4, u5);
                                d4 == p5 ? i12.push(new nA(t7(g3, y3), t7(g3, y3))) : m3.length > y3 && i12.push(new nA(t7(g3, y3), t7(g3, ti(m3, p5, u5))));
                              }
                              i12.length || i12.push(new nA(r11, r11)), n1(o3, nN(t11, s2.ranges.slice(0, l2).concat(i12), l2), { origin: "*mouse", scroll: false }), t11.scrollIntoView(e14);
                            } else {
                              var b3, w3 = a3, x3 = i5(t11, e14, n11.unit), M2 = w3.anchor;
                              t8(x3.anchor, M2) > 0 ? (b3 = x3.head, M2 = er(w3.from(), x3.anchor)) : (b3 = x3.anchor, M2 = ee(w3.to(), x3.head));
                              var C3 = s2.ranges.slice(0);
                              C3[l2] = function(t12, e15) {
                                var r12, n12 = e15.anchor, i13 = e15.head, o4 = tJ(t12.doc, n12.line);
                                if (0 == t8(n12, i13) && n12.sticky == i13.sticky) return e15;
                                var a4 = tM(o4);
                                if (!a4) return e15;
                                var l3 = tw(a4, n12.ch, n12.sticky), s3 = a4[l3];
                                if (s3.from != n12.ch && s3.to != n12.ch) return e15;
                                var u6 = l3 + (s3.from == n12.ch == (1 != s3.level) ? 0 : 1);
                                if (0 == u6 || u6 == a4.length) return e15;
                                if (i13.line != n12.line) r12 = (i13.line - n12.line) * ("ltr" == t12.doc.direction ? 1 : -1) > 0;
                                else {
                                  var c6 = tw(a4, i13.ch, i13.sticky), f4 = c6 - l3 || (i13.ch - n12.ch) * (1 == s3.level ? -1 : 1);
                                  r12 = c6 == u6 - 1 || c6 == u6 ? f4 < 0 : f4 > 0;
                                }
                                var h5 = a4[u6 + (r12 ? -1 : 0)], d5 = r12 == (1 == h5.level), p6 = d5 ? h5.from : h5.to, g4 = d5 ? "after" : "before";
                                return n12.ch == p6 && n12.sticky == g4 ? e15 : new nA(new t7(n12.line, p6, g4), i13);
                              }(t11, new nA(ei(o3, M2), b3)), n1(o3, nN(t11, C3, l2), tr);
                            }
                          }
                        }(p4);
                        var g2 = r$(i11, o3);
                        (p4.line >= g2.to || p4.line < g2.from) && setTimeout(na(t11, function() {
                          d3 == c4 && e13(u4);
                        }), 150);
                      } else {
                        var v3 = u4.clientY < h3.top ? -20 : u4.clientY > h3.bottom ? 20 : 0;
                        v3 && setTimeout(na(t11, function() {
                          d3 == c4 && (i11.scroller.scrollTop += v3, e13(u4));
                        }), 50);
                      }
                    }
                  }(e12) : p3(e12);
                }), m2 = na(t11, p3);
                t11.state.selectingText = m2, tk(i11.wrapper.ownerDocument, "mousemove", v2), tk(i11.wrapper.ownerDocument, "mouseup", m2);
              }(u2, h2, c2, d2)) : tE(t10) == D2.scroller && tD(t10) : 2 == H2 ? (F2 && nZ(this.doc, F2), setTimeout(function() {
                return D2.input.focus();
              }, 20)) : 3 == H2 && (W ? this.display.input.onContextMenu(t10) : rj(this));
            }
          }
        }
      }
      function i5(t10, e10, r10) {
        if ("char" == r10) return new nA(e10, e10);
        if ("word" == r10) return t10.findWordAt(e10);
        if ("line" == r10) return new nA(t7(e10.line, 0), ei(t10.doc, t7(e10.line + 1, 0)));
        var n10 = r10(t10, e10);
        return new nA(n10.from, n10.to);
      }
      function i6(t10, e10, r10, n10) {
        if (e10.touches) i10 = e10.touches[0].clientX, o2 = e10.touches[0].clientY;
        else try {
          i10 = e10.clientX, o2 = e10.clientY;
        } catch (t11) {
          return false;
        }
        if (i10 >= Math.floor(t10.display.gutters.getBoundingClientRect().right)) return false;
        n10 && tD(e10);
        var i10, o2, a2 = t10.display, l2 = a2.lineDiv.getBoundingClientRect();
        if (o2 > l2.bottom || !tO(t10, r10)) return tF(e10);
        o2 -= l2.top - a2.viewOffset;
        for (var s2 = 0; s2 < t10.display.gutterSpecs.length; ++s2) {
          var u2 = a2.gutters.childNodes[s2];
          if (u2 && u2.getBoundingClientRect().right >= i10) {
            var c2 = t4(t10.doc, o2), f2 = t10.display.gutterSpecs[s2];
            return tT(t10, r10, t10, c2, f2.className, e10), tF(e10);
          }
        }
      }
      function i7(t10, e10) {
        return i6(t10, e10, "gutterClick", true);
      }
      function i8(t10, e10) {
        var r10, n10;
        if (!(e6(t10.display, e10) || (r10 = t10, n10 = e10, tO(r10, "gutterContextMenu") && i6(r10, n10, "gutterContextMenu", false)) || tA(t10, e10, "contextmenu"))) W || t10.display.input.onContextMenu(e10);
      }
      function i9(t10) {
        t10.display.wrapper.className = t10.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + t10.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), rf(t10);
      }
      i3.prototype.compare = function(t10, e10, r10) {
        return this.time + 400 > t10 && 0 == t8(e10, this.pos) && r10 == this.button;
      };
      var ot = { toString: function() {
        return "CodeMirror.Init";
      } }, oe = {}, or = {};
      function on(t10, e10, r10) {
        if (!e10 != !(r10 && r10 != ot)) {
          var n10 = t10.display.dragFunctions, i10 = e10 ? tk : tS;
          i10(t10.display.scroller, "dragstart", n10.start), i10(t10.display.scroller, "dragenter", n10.enter), i10(t10.display.scroller, "dragover", n10.over), i10(t10.display.scroller, "dragleave", n10.leave), i10(t10.display.scroller, "drop", n10.drop);
        }
      }
      function oi(t10) {
        t10.options.lineWrapping ? (G(t10.display.wrapper, "CodeMirror-wrap"), t10.display.sizer.style.minWidth = "", t10.display.sizerWidth = null) : (H(t10.display.wrapper, "CodeMirror-wrap"), eP(t10)), rO(t10), rW(t10), rf(t10), setTimeout(function() {
          return r8(t10);
        }, 100);
      }
      function oo(t10, e10) {
        var r10 = this;
        if (!(this instanceof oo)) return new oo(t10, e10);
        this.options = e10 = e10 ? Y(e10) : {}, Y(oe, e10, false);
        var n10 = e10.value;
        "string" == typeof n10 ? n10 = new iC(n10, e10.mode, null, e10.lineSeparator, e10.direction) : e10.mode && (n10.modeOption = e10.mode), this.doc = n10;
        var i10 = new oo.inputStyles[e10.inputStyle](this), o2 = this.display = new nM(t10, n10, i10, e10);
        for (var a2 in o2.wrapper.CodeMirror = this, i9(this), e10.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), ne(this), this.state = { keyMaps: [], overlays: [], modeGen: 0, overwrite: false, delayingBlurEvent: false, focused: false, suppressEdits: false, pasteIncoming: -1, cutIncoming: -1, selectingText: false, draggingText: false, highlight: new Q(), keySeq: null, specialChars: null }, e10.autofocus && !T && o2.input.focus(), g && v < 11 && setTimeout(function() {
          return r10.display.input.reset(true);
        }, 20), function(t11) {
          var e11 = t11.display;
          tk(e11.scroller, "mousedown", na(t11, i4)), g && v < 11 ? tk(e11.scroller, "dblclick", na(t11, function(e12) {
            if (!tA(t11, e12)) {
              var r12 = rI(t11, e12);
              if (!(!r12 || i7(t11, e12) || e6(t11.display, e12))) {
                tD(e12);
                var n12 = t11.findWordAt(r12);
                nZ(t11.doc, n12.anchor, n12.head);
              }
            }
          })) : tk(e11.scroller, "dblclick", function(e12) {
            return tA(t11, e12) || tD(e12);
          }), tk(e11.scroller, "contextmenu", function(e12) {
            return i8(t11, e12);
          }), tk(e11.input.getField(), "contextmenu", function(r12) {
            e11.scroller.contains(r12.target) || i8(t11, r12);
          });
          var r11, n11 = { end: 0 };
          function i11() {
            e11.activeTouch && (r11 = setTimeout(function() {
              return e11.activeTouch = null;
            }, 1e3), (n11 = e11.activeTouch).end = +/* @__PURE__ */ new Date());
          }
          function o3(t12, e12) {
            if (null == e12.left) return true;
            var r12 = e12.left - t12.left, n12 = e12.top - t12.top;
            return r12 * r12 + n12 * n12 > 400;
          }
          tk(e11.scroller, "touchstart", function(i12) {
            if (!tA(t11, i12) && !function(t12) {
              if (1 != t12.touches.length) return false;
              var e12 = t12.touches[0];
              return e12.radiusX <= 1 && e12.radiusY <= 1;
            }(i12) && !i7(t11, i12)) {
              e11.input.ensurePolled(), clearTimeout(r11);
              var o4 = +/* @__PURE__ */ new Date();
              e11.activeTouch = { start: o4, moved: false, prev: o4 - n11.end <= 300 ? n11 : null }, 1 == i12.touches.length && (e11.activeTouch.left = i12.touches[0].pageX, e11.activeTouch.top = i12.touches[0].pageY);
            }
          }), tk(e11.scroller, "touchmove", function() {
            e11.activeTouch && (e11.activeTouch.moved = true);
          }), tk(e11.scroller, "touchend", function(r12) {
            var n12 = e11.activeTouch;
            if (n12 && !e6(e11, r12) && null != n12.left && !n12.moved && /* @__PURE__ */ new Date() - n12.start < 300) {
              var a4, l3 = t11.coordsChar(e11.activeTouch, "page");
              a4 = !n12.prev || o3(n12, n12.prev) ? new nA(l3, l3) : !n12.prev.prev || o3(n12, n12.prev.prev) ? t11.findWordAt(l3) : new nA(t7(l3.line, 0), ei(t11.doc, t7(l3.line + 1, 0))), t11.setSelection(a4.anchor, a4.head), t11.focus(), tD(r12);
            }
            i11();
          }), tk(e11.scroller, "touchcancel", i11), tk(e11.scroller, "scroll", function() {
            e11.scroller.clientHeight && (r2(t11, e11.scroller.scrollTop), r4(t11, e11.scroller.scrollLeft, true), tT(t11, "scroll", t11));
          }), tk(e11.scroller, "mousewheel", function(e12) {
            return nS(t11, e12);
          }), tk(e11.scroller, "DOMMouseScroll", function(e12) {
            return nS(t11, e12);
          }), tk(e11.wrapper, "scroll", function() {
            return e11.wrapper.scrollTop = e11.wrapper.scrollLeft = 0;
          }), e11.dragFunctions = { enter: function(e12) {
            tA(t11, e12) || tH(e12);
          }, over: function(e12) {
            tA(t11, e12) || (function(t12, e13) {
              var r12 = rI(t12, e13);
              if (r12) {
                var n12 = document.createDocumentFragment();
                rB(t12, r12, n12), t12.display.dragCursor || (t12.display.dragCursor = z("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), t12.display.lineSpace.insertBefore(t12.display.dragCursor, t12.display.cursorDiv)), P(t12.display.dragCursor, n12);
              }
            }(t11, e12), tH(e12));
          }, start: function(e12) {
            return function(t12, e13) {
              if (g && (!t12.state.draggingText || +/* @__PURE__ */ new Date() - ik < 100)) {
                tH(e13);
                return;
              }
              if (!(tA(t12, e13) || e6(t12.display, e13)) && (e13.dataTransfer.setData("Text", t12.getSelection()), e13.dataTransfer.effectAllowed = "copyMove", e13.dataTransfer.setDragImage && !M)) {
                var r12 = z("img", null, null, "position: fixed; left: 0; top: 0;");
                r12.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", x && (r12.width = r12.height = 1, t12.display.wrapper.appendChild(r12), r12._top = r12.offsetTop), e13.dataTransfer.setDragImage(r12, 0, 0), x && r12.parentNode.removeChild(r12);
              }
            }(t11, e12);
          }, drop: na(t11, iL), leave: function(e12) {
            tA(t11, e12) || iS(t11);
          } };
          var a3 = e11.input.getField();
          tk(a3, "keyup", function(e12) {
            return i1.call(t11, e12);
          }), tk(a3, "keydown", na(t11, i0)), tk(a3, "keypress", na(t11, i2)), tk(a3, "focus", function(e12) {
            return rq(t11, e12);
          }), tk(a3, "blur", function(e12) {
            return r_(t11, e12);
          });
        }(this), function() {
          if (!iA) {
            var t11;
            tk(window, "resize", function() {
              null == t11 && (t11 = setTimeout(function() {
                t11 = null, iT(iN);
              }, 100));
            }), tk(window, "blur", function() {
              return iT(r_);
            }), iA = true;
          }
        }(), nn(this), this.curOp.forceUpdate = true, nB(this, n10), e10.autofocus && !T || this.hasFocus() ? setTimeout(function() {
          r10.hasFocus() && !r10.state.focused && rq(r10);
        }, 20) : r_(this), or) or.hasOwnProperty(a2) && or[a2](this, e10[a2], ot);
        ny(this), e10.finishInit && e10.finishInit(this);
        for (var l2 = 0; l2 < oa.length; ++l2) oa[l2](this);
        ni(this), m && e10.lineWrapping && "optimizelegibility" == getComputedStyle(o2.lineDiv).textRendering && (o2.lineDiv.style.textRendering = "auto");
      }
      oo.defaults = oe, oo.optionHandlers = or;
      var oa = [];
      function ol(t10, e10, r10, n10) {
        var i10, o2 = t10.doc;
        null == r10 && (r10 = "add"), "smart" == r10 && (o2.mode.indent ? i10 = ec(t10, e10).state : r10 = "prev");
        var a2 = t10.options.tabSize, l2 = tJ(o2, e10), s2 = Z(l2.text, null, a2);
        l2.stateAfter && (l2.stateAfter = null);
        var u2, c2 = l2.text.match(/^\s*/)[0];
        if (n10 || /\S/.test(l2.text)) {
          if ("smart" == r10 && ((u2 = o2.mode.indent(i10, l2.text.slice(c2.length), l2.text)) == tt || u2 > 150)) {
            if (!n10) return;
            r10 = "prev";
          }
        } else u2 = 0, r10 = "not";
        "prev" == r10 ? u2 = e10 > o2.first ? Z(tJ(o2, e10 - 1).text, null, a2) : 0 : "add" == r10 ? u2 = s2 + t10.options.indentUnit : "subtract" == r10 ? u2 = s2 - t10.options.indentUnit : "number" == typeof r10 && (u2 = s2 + r10), u2 = Math.max(0, u2);
        var f2 = "", h2 = 0;
        if (t10.options.indentWithTabs) for (var d2 = Math.floor(u2 / a2); d2; --d2) h2 += a2, f2 += "	";
        if (h2 < u2 && (f2 += ta(u2 - h2)), f2 != c2) return il(o2, f2, t7(e10, 0), t7(e10, c2.length), "+input"), l2.stateAfter = null, true;
        for (var p2 = 0; p2 < o2.sel.ranges.length; p2++) {
          var g2 = o2.sel.ranges[p2];
          if (g2.head.line == e10 && g2.head.ch < c2.length) {
            var v2 = t7(e10, c2.length);
            nJ(o2, p2, new nA(v2, v2));
            break;
          }
        }
      }
      oo.defineInitHook = function(t10) {
        return oa.push(t10);
      };
      var os = null;
      function ou(t10, e10, r10, n10, i10) {
        var o2 = t10.doc;
        t10.display.shift = false, n10 || (n10 = o2.sel);
        var a2 = +/* @__PURE__ */ new Date() - 200, l2 = "paste" == i10 || t10.state.pasteIncoming > a2, s2 = tR(e10), u2 = null;
        if (l2 && n10.ranges.length > 1) {
          if (os && os.text.join("\n") == e10) {
            if (n10.ranges.length % os.text.length == 0) {
              u2 = [];
              for (var c2 = 0; c2 < os.text.length; c2++) u2.push(o2.splitLines(os.text[c2]));
            }
          } else s2.length == n10.ranges.length && t10.options.pasteLinesPerSelection && (u2 = ts(s2, function(t11) {
            return [t11];
          }));
        }
        for (var f2 = t10.curOp.updateInput, h2 = n10.ranges.length - 1; h2 >= 0; h2--) {
          var d2 = n10.ranges[h2], p2 = d2.from(), g2 = d2.to();
          d2.empty() && (r10 && r10 > 0 ? p2 = t7(p2.line, p2.ch - r10) : t10.state.overwrite && !l2 ? g2 = t7(g2.line, Math.min(tJ(o2, g2.line).text.length, g2.ch + tl(s2).length)) : l2 && os && os.lineWise && os.text.join("\n") == s2.join("\n") && (p2 = g2 = t7(p2.line, 0)));
          var v2 = { from: p2, to: g2, text: u2 ? u2[h2 % u2.length] : s2, origin: i10 || (l2 ? "paste" : t10.state.cutIncoming > a2 ? "cut" : "+input") };
          ie(t10.doc, v2), eY(t10, "inputRead", t10, v2);
        }
        e10 && !l2 && of(t10, e10), rQ(t10), t10.curOp.updateInput < 2 && (t10.curOp.updateInput = f2), t10.curOp.typing = true, t10.state.pasteIncoming = t10.state.cutIncoming = -1;
      }
      function oc(t10, e10) {
        var r10 = t10.clipboardData && t10.clipboardData.getData("Text");
        if (r10) return t10.preventDefault(), !e10.isReadOnly() && !e10.options.disableInput && e10.hasFocus() && no(e10, function() {
          return ou(e10, r10, 0, null, "paste");
        }), true;
      }
      function of(t10, e10) {
        if (t10.options.electricChars && t10.options.smartIndent) for (var r10 = t10.doc.sel, n10 = r10.ranges.length - 1; n10 >= 0; n10--) {
          var i10 = r10.ranges[n10];
          if (!(i10.head.ch > 100) && (!n10 || r10.ranges[n10 - 1].head.line != i10.head.line)) {
            var o2 = t10.getModeAt(i10.head), a2 = false;
            if (o2.electricChars) {
              for (var l2 = 0; l2 < o2.electricChars.length; l2++) if (e10.indexOf(o2.electricChars.charAt(l2)) > -1) {
                a2 = ol(t10, i10.head.line, "smart");
                break;
              }
            } else o2.electricInput && o2.electricInput.test(tJ(t10.doc, i10.head.line).text.slice(0, i10.head.ch)) && (a2 = ol(t10, i10.head.line, "smart"));
            a2 && eY(t10, "electricInput", t10, i10.head.line);
          }
        }
      }
      function oh(t10) {
        for (var e10 = [], r10 = [], n10 = 0; n10 < t10.doc.sel.ranges.length; n10++) {
          var i10 = t10.doc.sel.ranges[n10].head.line, o2 = { anchor: t7(i10, 0), head: t7(i10 + 1, 0) };
          r10.push(o2), e10.push(t10.getRange(o2.anchor, o2.head));
        }
        return { text: e10, ranges: r10 };
      }
      function od(t10, e10, r10, n10) {
        t10.setAttribute("autocorrect", r10 ? "on" : "off"), t10.setAttribute("autocapitalize", n10 ? "on" : "off"), t10.setAttribute("spellcheck", !!e10);
      }
      function op() {
        var t10 = z("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), e10 = z("div", [t10], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return m ? t10.style.width = "1000px" : t10.setAttribute("wrap", "off"), L && (t10.style.border = "1px solid black"), e10;
      }
      function og(t10, e10, r10, n10, i10) {
        var o2 = e10, a2 = r10, l2 = tJ(t10, e10.line), s2 = i10 && "rtl" == t10.direction ? -r10 : r10;
        function u2(o3) {
          if ("codepoint" == n10) {
            var a3, u3, c3 = l2.text.charCodeAt(e10.ch + (r10 > 0 ? 0 : -1));
            if (isNaN(c3)) a3 = null;
            else {
              var f3 = r10 > 0 ? c3 >= 55296 && c3 < 56320 : c3 >= 56320 && c3 < 57343;
              a3 = new t7(e10.line, Math.max(0, Math.min(l2.text.length, e10.ch + r10 * (f3 ? 2 : 1))), -r10);
            }
          } else a3 = i10 ? function(t11, e11, r11, n11) {
            var i11, o4 = tM(e11, t11.doc.direction);
            if (!o4) return iU(e11, r11, n11);
            r11.ch >= e11.text.length ? (r11.ch = e11.text.length, r11.sticky = "before") : r11.ch <= 0 && (r11.ch = 0, r11.sticky = "after");
            var a4 = tw(o4, r11.ch, r11.sticky), l3 = o4[a4];
            if ("ltr" == t11.doc.direction && l3.level % 2 == 0 && (n11 > 0 ? l3.to > r11.ch : l3.from < r11.ch)) return iU(e11, r11, n11);
            var s3 = function(t12, r12) {
              return iG(e11, t12 instanceof t7 ? t12.ch : t12, r12);
            }, u4 = function(r12) {
              return t11.options.lineWrapping ? (i11 = i11 || ro(t11, e11), rC(t11, e11, i11, r12)) : { begin: 0, end: e11.text.length };
            }, c4 = u4("before" == r11.sticky ? s3(r11, -1) : r11.ch);
            if ("rtl" == t11.doc.direction || 1 == l3.level) {
              var f4 = 1 == l3.level == n11 < 0, h3 = s3(r11, f4 ? 1 : -1);
              if (null != h3 && (f4 ? h3 <= l3.to && h3 <= c4.end : h3 >= l3.from && h3 >= c4.begin)) return new t7(r11.line, h3, f4 ? "before" : "after");
            }
            var d3 = function(t12, e12, n12) {
              for (var i12 = function(t13, e13) {
                return e13 ? new t7(r11.line, s3(t13, 1), "before") : new t7(r11.line, t13, "after");
              }; t12 >= 0 && t12 < o4.length; t12 += e12) {
                var a5 = o4[t12], l4 = e12 > 0 == (1 != a5.level), u5 = l4 ? n12.begin : s3(n12.end, -1);
                if (a5.from <= u5 && u5 < a5.to || (u5 = l4 ? a5.from : s3(a5.to, -1), n12.begin <= u5 && u5 < n12.end)) return i12(u5, l4);
              }
            }, p3 = d3(a4 + n11, n11, c4);
            if (p3) return p3;
            var g3 = n11 > 0 ? c4.end : s3(c4.begin, -1);
            return null != g3 && !(n11 > 0 && g3 == e11.text.length) && (p3 = d3(n11 > 0 ? 0 : o4.length - 1, n11, u4(g3))) ? p3 : null;
          }(t10.cm, l2, e10, r10) : iU(l2, e10, r10);
          if (null == a3) {
            if (!(!o3 && !((u3 = e10.line + s2) < t10.first) && !(u3 >= t10.first + t10.size) && (e10 = new t7(u3, e10.ch, e10.sticky), l2 = tJ(t10, u3)))) return false;
            e10 = ij(i10, t10.cm, l2, e10.line, s2);
          } else e10 = a3;
          return true;
        }
        if ("char" == n10 || "codepoint" == n10) u2();
        else if ("column" == n10) u2(true);
        else if ("word" == n10 || "group" == n10) for (var c2 = null, f2 = "group" == n10, h2 = t10.cm && t10.cm.getHelper(e10, "wordChars"), d2 = true; !(r10 < 0) || u2(!d2); d2 = false) {
          var p2 = l2.text.charAt(e10.ch) || "\n", g2 = td(p2, h2) ? "w" : f2 && "\n" == p2 ? "n" : !f2 || /\s/.test(p2) ? null : "p";
          if (!f2 || d2 || g2 || (g2 = "s"), c2 && c2 != g2) {
            r10 < 0 && (r10 = 1, u2(), e10.sticky = "after");
            break;
          }
          if (g2 && (c2 = g2), r10 > 0 && !u2(!d2)) break;
        }
        var v2 = n7(t10, e10, o2, a2, true);
        return t9(o2, v2) && (v2.hitSide = true), v2;
      }
      function ov(t10, e10, r10, n10) {
        var i10, o2, a2 = t10.doc, l2 = e10.left;
        if ("page" == n10) {
          var s2 = Math.max(Math.min(t10.display.wrapper.clientHeight, X(t10).innerHeight || a2(t10).documentElement.clientHeight) - 0.5 * rL(t10.display), 3);
          o2 = (r10 > 0 ? e10.bottom : e10.top) + r10 * s2;
        } else "line" == n10 && (o2 = r10 > 0 ? e10.bottom + 3 : e10.top - 3);
        for (; (i10 = rx(t10, l2, o2)).outside; ) {
          if (r10 < 0 ? o2 <= 0 : o2 >= a2.height) {
            i10.hitSide = true;
            break;
          }
          o2 += 5 * r10;
        }
        return i10;
      }
      var om = function(t10) {
        this.cm = t10, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Q(), this.composing = null, this.gracePeriod = false, this.readDOMTimeout = null;
      };
      function oy(t10, e10) {
        var r10 = ri(t10, e10.line);
        if (!r10 || r10.hidden) return null;
        var n10 = tJ(t10.doc, e10.line), i10 = rn(r10, n10, e10.line), o2 = tM(n10, t10.doc.direction), a2 = "left";
        o2 && (a2 = tw(o2, e10.ch) % 2 ? "right" : "left");
        var l2 = rs(i10.map, e10.ch, a2);
        return l2.offset = "right" == l2.collapse ? l2.end : l2.start, l2;
      }
      function ob(t10, e10) {
        return e10 && (t10.bad = true), t10;
      }
      function ow(t10, e10, r10) {
        var n10;
        if (e10 == t10.display.lineDiv) {
          if (!(n10 = t10.display.lineDiv.childNodes[r10])) return ob(t10.clipPos(t7(t10.display.viewTo - 1)), true);
          e10 = null, r10 = 0;
        } else for (n10 = e10; ; n10 = n10.parentNode) {
          if (!n10 || n10 == t10.display.lineDiv) return null;
          if (n10.parentNode && n10.parentNode == t10.display.lineDiv) break;
        }
        for (var i10 = 0; i10 < t10.display.view.length; i10++) {
          var o2 = t10.display.view[i10];
          if (o2.node == n10) return function(t11, e11, r11) {
            var n11 = t11.text.firstChild, i11 = false;
            if (!e11 || !B(n11, e11)) return ob(t7(t3(t11.line), 0), true);
            if (e11 == n11 && (i11 = true, e11 = n11.childNodes[r11], r11 = 0, !e11)) {
              var o3 = t11.rest ? tl(t11.rest) : t11.line;
              return ob(t7(t3(o3), o3.text.length), i11);
            }
            var a2 = 3 == e11.nodeType ? e11 : null, l2 = e11;
            for (!a2 && 1 == e11.childNodes.length && 3 == e11.firstChild.nodeType && (a2 = e11.firstChild, r11 && (r11 = a2.nodeValue.length)); l2.parentNode != n11; ) l2 = l2.parentNode;
            var s2 = t11.measure, u2 = s2.maps;
            function c2(e12, r12, n12) {
              for (var i12 = -1; i12 < (u2 ? u2.length : 0); i12++) for (var o4 = i12 < 0 ? s2.map : u2[i12], a3 = 0; a3 < o4.length; a3 += 3) {
                var l3 = o4[a3 + 2];
                if (l3 == e12 || l3 == r12) {
                  var c3 = t3(i12 < 0 ? t11.line : t11.rest[i12]), f3 = o4[a3] + n12;
                  return (n12 < 0 || l3 != e12) && (f3 = o4[a3 + (n12 ? 1 : 0)]), t7(c3, f3);
                }
              }
            }
            var f2 = c2(a2, l2, r11);
            if (f2) return ob(f2, i11);
            for (var h2 = l2.nextSibling, d2 = a2 ? a2.nodeValue.length - r11 : 0; h2; h2 = h2.nextSibling) {
              if (f2 = c2(h2, h2.firstChild, 0)) return ob(t7(f2.line, f2.ch - d2), i11);
              d2 += h2.textContent.length;
            }
            for (var p2 = l2.previousSibling, g2 = r11; p2; p2 = p2.previousSibling) {
              if (f2 = c2(p2, p2.firstChild, -1)) return ob(t7(f2.line, f2.ch + g2), i11);
              g2 += p2.textContent.length;
            }
          }(o2, e10, r10);
        }
      }
      om.prototype.init = function(t10) {
        var e10 = this, r10 = this, n10 = r10.cm, i10 = r10.div = t10.lineDiv;
        function o2(t11) {
          for (var e11 = t11.target; e11; e11 = e11.parentNode) {
            if (e11 == i10) return true;
            if (/\bCodeMirror-(?:line)?widget\b/.test(e11.className)) break;
          }
          return false;
        }
        function a2(t11) {
          if (!(!o2(t11) || tA(n10, t11))) {
            if (n10.somethingSelected()) os = { lineWise: false, text: n10.getSelections() }, "cut" == t11.type && n10.replaceSelection("", null, "cut");
            else {
              if (!n10.options.lineWiseCopyCut) return;
              var e11 = oh(n10);
              os = { lineWise: true, text: e11.text }, "cut" == t11.type && n10.operation(function() {
                n10.setSelections(e11.ranges, 0, te), n10.replaceSelection("", null, "cut");
              });
            }
            if (t11.clipboardData) {
              t11.clipboardData.clearData();
              var a3 = os.text.join("\n");
              if (t11.clipboardData.setData("Text", a3), t11.clipboardData.getData("Text") == a3) {
                t11.preventDefault();
                return;
              }
            }
            var l2 = op(), s2 = l2.firstChild;
            od(s2), n10.display.lineSpace.insertBefore(l2, n10.display.lineSpace.firstChild), s2.value = os.text.join("\n");
            var u2 = V(K(i10));
            j(s2), setTimeout(function() {
              n10.display.lineSpace.removeChild(l2), u2.focus(), u2 == i10 && r10.showPrimarySelection();
            }, 50);
          }
        }
        i10.contentEditable = true, od(i10, n10.options.spellcheck, n10.options.autocorrect, n10.options.autocapitalize), tk(i10, "paste", function(t11) {
          !(!o2(t11) || tA(n10, t11) || oc(t11, n10)) && v <= 11 && setTimeout(na(n10, function() {
            return e10.updateFromDOM();
          }), 20);
        }), tk(i10, "compositionstart", function(t11) {
          e10.composing = { data: t11.data, done: false };
        }), tk(i10, "compositionupdate", function(t11) {
          e10.composing || (e10.composing = { data: t11.data, done: false });
        }), tk(i10, "compositionend", function(t11) {
          e10.composing && (t11.data != e10.composing.data && e10.readFromDOMSoon(), e10.composing.done = true);
        }), tk(i10, "touchstart", function() {
          return r10.forceCompositionEnd();
        }), tk(i10, "input", function() {
          e10.composing || e10.readFromDOMSoon();
        }), tk(i10, "copy", a2), tk(i10, "cut", a2);
      }, om.prototype.screenReaderLabelChanged = function(t10) {
        t10 ? this.div.setAttribute("aria-label", t10) : this.div.removeAttribute("aria-label");
      }, om.prototype.prepareSelection = function() {
        var t10 = rR(this.cm, false);
        return t10.focus = V(K(this.div)) == this.div, t10;
      }, om.prototype.showSelection = function(t10, e10) {
        t10 && this.cm.display.view.length && ((t10.focus || e10) && this.showPrimarySelection(), this.showMultipleSelections(t10));
      }, om.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, om.prototype.showPrimarySelection = function() {
        var t10 = this.getSelection(), e10 = this.cm, r10 = e10.doc.sel.primary(), i10 = r10.from(), o2 = r10.to();
        if (e10.display.viewTo == e10.display.viewFrom || i10.line >= e10.display.viewTo || o2.line < e10.display.viewFrom) {
          t10.removeAllRanges();
          return;
        }
        var a2 = ow(e10, t10.anchorNode, t10.anchorOffset), l2 = ow(e10, t10.focusNode, t10.focusOffset);
        if (!a2 || a2.bad || !l2 || l2.bad || 0 != t8(er(a2, l2), i10) || 0 != t8(ee(a2, l2), o2)) {
          var s2 = e10.display.view, u2 = i10.line >= e10.display.viewFrom && oy(e10, i10) || { node: s2[0].measure.map[2], offset: 0 }, c2 = o2.line < e10.display.viewTo && oy(e10, o2);
          if (!c2) {
            var h2 = s2[s2.length - 1].measure, d2 = h2.maps ? h2.maps[h2.maps.length - 1] : h2.map;
            c2 = { node: d2[d2.length - 1], offset: d2[d2.length - 2] - d2[d2.length - 3] };
          }
          if (!u2 || !c2) {
            t10.removeAllRanges();
            return;
          }
          var p2, g2 = t10.rangeCount && t10.getRangeAt(0);
          try {
            p2 = n(u2.node, u2.offset, c2.offset, c2.node);
          } catch (t11) {
          }
          p2 && (!f && e10.state.focused ? (t10.collapse(u2.node, u2.offset), p2.collapsed || (t10.removeAllRanges(), t10.addRange(p2))) : (t10.removeAllRanges(), t10.addRange(p2)), g2 && null == t10.anchorNode ? t10.addRange(g2) : f && this.startGracePeriod()), this.rememberSelection();
        }
      }, om.prototype.startGracePeriod = function() {
        var t10 = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          t10.gracePeriod = false, t10.selectionChanged() && t10.cm.operation(function() {
            return t10.cm.curOp.selectionChanged = true;
          });
        }, 20);
      }, om.prototype.showMultipleSelections = function(t10) {
        P(this.cm.display.cursorDiv, t10.cursors), P(this.cm.display.selectionDiv, t10.selection);
      }, om.prototype.rememberSelection = function() {
        var t10 = this.getSelection();
        this.lastAnchorNode = t10.anchorNode, this.lastAnchorOffset = t10.anchorOffset, this.lastFocusNode = t10.focusNode, this.lastFocusOffset = t10.focusOffset;
      }, om.prototype.selectionInEditor = function() {
        var t10 = this.getSelection();
        if (!t10.rangeCount) return false;
        var e10 = t10.getRangeAt(0).commonAncestorContainer;
        return B(this.div, e10);
      }, om.prototype.focus = function() {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() && V(K(this.div)) == this.div || this.showSelection(this.prepareSelection(), true), this.div.focus());
      }, om.prototype.blur = function() {
        this.div.blur();
      }, om.prototype.getField = function() {
        return this.div;
      }, om.prototype.supportsTouch = function() {
        return true;
      }, om.prototype.receivedFocus = function() {
        var t10 = this, e10 = this;
        this.selectionInEditor() ? setTimeout(function() {
          return t10.pollSelection();
        }, 20) : no(this.cm, function() {
          return e10.cm.curOp.selectionChanged = true;
        }), this.polling.set(this.cm.options.pollInterval, function t11() {
          e10.cm.state.focused && (e10.pollSelection(), e10.polling.set(e10.cm.options.pollInterval, t11));
        });
      }, om.prototype.selectionChanged = function() {
        var t10 = this.getSelection();
        return t10.anchorNode != this.lastAnchorNode || t10.anchorOffset != this.lastAnchorOffset || t10.focusNode != this.lastFocusNode || t10.focusOffset != this.lastFocusOffset;
      }, om.prototype.pollSelection = function() {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
          var t10 = this.getSelection(), e10 = this.cm;
          if (S && b && this.cm.display.gutterSpecs.length && function(t11) {
            for (var e11 = t11; e11; e11 = e11.parentNode) if (/CodeMirror-gutter-wrapper/.test(e11.className)) return true;
            return false;
          }(t10.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var r10 = ow(e10, t10.anchorNode, t10.anchorOffset), n10 = ow(e10, t10.focusNode, t10.focusOffset);
            r10 && n10 && no(e10, function() {
              n1(e10.doc, nO(r10, n10), te), (r10.bad || n10.bad) && (e10.curOp.selectionChanged = true);
            });
          }
        }
      }, om.prototype.pollContent = function() {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var t10, e10, r10, n10, i10, o2 = this.cm, a2 = o2.display, l2 = o2.doc.sel.primary(), s2 = l2.from(), u2 = l2.to();
        if (0 == s2.ch && s2.line > o2.firstLine() && (s2 = t7(s2.line - 1, tJ(o2.doc, s2.line - 1).length)), u2.ch == tJ(o2.doc, u2.line).text.length && u2.line < o2.lastLine() && (u2 = t7(u2.line + 1, 0)), s2.line < a2.viewFrom || u2.line > a2.viewTo - 1) return false;
        s2.line == a2.viewFrom || 0 == (t10 = rD(o2, s2.line)) ? (e10 = t3(a2.view[0].line), r10 = a2.view[0].node) : (e10 = t3(a2.view[t10].line), r10 = a2.view[t10 - 1].node.nextSibling);
        var c2 = rD(o2, u2.line);
        if (c2 == a2.view.length - 1 ? (n10 = a2.viewTo - 1, i10 = a2.lineDiv.lastChild) : (n10 = t3(a2.view[c2 + 1].line) - 1, i10 = a2.view[c2 + 1].node.previousSibling), !r10) return false;
        for (var f2 = o2.doc.splitLines(function(t11, e11, r11, n11, i11) {
          var o3 = "", a3 = false, l3 = t11.doc.lineSeparator(), s3 = false;
          function u3() {
            a3 && (o3 += l3, s3 && (o3 += l3), a3 = s3 = false);
          }
          function c3(t12) {
            t12 && (u3(), o3 += t12);
          }
          for (; function e12(r12) {
            if (1 == r12.nodeType) {
              var o4 = r12.getAttribute("cm-text");
              if (o4) {
                c3(o4);
                return;
              }
              var f3, h3 = r12.getAttribute("cm-marker");
              if (h3) {
                var d3, p3 = t11.findMarks(t7(n11, 0), t7(i11 + 1, 0), (d3 = +h3, function(t12) {
                  return t12.id == d3;
                }));
                p3.length && (f3 = p3[0].find(0)) && c3(t0(t11.doc, f3.from, f3.to).join(l3));
                return;
              }
              if ("false" != r12.getAttribute("contenteditable")) {
                var g3 = /^(pre|div|p|li|table|br)$/i.test(r12.nodeName);
                if (/^br$/i.test(r12.nodeName) || 0 != r12.textContent.length) {
                  g3 && u3();
                  for (var v3 = 0; v3 < r12.childNodes.length; v3++) e12(r12.childNodes[v3]);
                  /^(pre|p)$/i.test(r12.nodeName) && (s3 = true), g3 && (a3 = true);
                }
              }
            } else 3 == r12.nodeType && c3(r12.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
          }(e11), e11 != r11; ) e11 = e11.nextSibling, s3 = false;
          return o3;
        }(o2, r10, i10, e10, n10)), h2 = t0(o2.doc, t7(e10, 0), t7(n10, tJ(o2.doc, n10).text.length)); f2.length > 1 && h2.length > 1; ) if (tl(f2) == tl(h2)) f2.pop(), h2.pop(), n10--;
        else if (f2[0] == h2[0]) f2.shift(), h2.shift(), e10++;
        else break;
        for (var d2 = 0, p2 = 0, g2 = f2[0], v2 = h2[0], m2 = Math.min(g2.length, v2.length); d2 < m2 && g2.charCodeAt(d2) == v2.charCodeAt(d2); ) ++d2;
        for (var y2 = tl(f2), b2 = tl(h2), w2 = Math.min(y2.length - (1 == f2.length ? d2 : 0), b2.length - (1 == h2.length ? d2 : 0)); p2 < w2 && y2.charCodeAt(y2.length - p2 - 1) == b2.charCodeAt(b2.length - p2 - 1); ) ++p2;
        if (1 == f2.length && 1 == h2.length && e10 == s2.line) for (; d2 && d2 > s2.ch && y2.charCodeAt(y2.length - p2 - 1) == b2.charCodeAt(b2.length - p2 - 1); ) d2--, p2++;
        f2[f2.length - 1] = y2.slice(0, y2.length - p2).replace(/^\u200b+/, ""), f2[0] = f2[0].slice(d2).replace(/\u200b+$/, "");
        var x2 = t7(e10, d2), M2 = t7(n10, h2.length ? tl(h2).length - p2 : 0);
        if (f2.length > 1 || f2[0] || t8(x2, M2)) return il(o2.doc, f2, x2, M2, "+input"), true;
      }, om.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, om.prototype.reset = function() {
        this.forceCompositionEnd();
      }, om.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, om.prototype.readFromDOMSoon = function() {
        var t10 = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function() {
          if (t10.readDOMTimeout = null, t10.composing) {
            if (!t10.composing.done) return;
            t10.composing = null;
          }
          t10.updateFromDOM();
        }, 80));
      }, om.prototype.updateFromDOM = function() {
        var t10 = this;
        (this.cm.isReadOnly() || !this.pollContent()) && no(this.cm, function() {
          return rW(t10.cm);
        });
      }, om.prototype.setUneditable = function(t10) {
        t10.contentEditable = "false";
      }, om.prototype.onKeyPress = function(t10) {
        0 != t10.charCode && !this.composing && (t10.preventDefault(), this.cm.isReadOnly() || na(this.cm, ou)(this.cm, String.fromCharCode(null == t10.charCode ? t10.keyCode : t10.charCode), 0));
      }, om.prototype.readOnlyChanged = function(t10) {
        this.div.contentEditable = String("nocursor" != t10);
      }, om.prototype.onContextMenu = function() {
      }, om.prototype.resetPosition = function() {
      }, om.prototype.needsContentAttribute = true;
      var ox = function(t10) {
        this.cm = t10, this.prevInput = "", this.pollingFast = false, this.polling = new Q(), this.hasSelection = false, this.composing = null, this.resetting = false;
      };
      ox.prototype.init = function(t10) {
        var e10 = this, r10 = this, n10 = this.cm;
        this.createField(t10);
        var i10 = this.textarea;
        function o2(t11) {
          if (!tA(n10, t11)) {
            if (n10.somethingSelected()) os = { lineWise: false, text: n10.getSelections() };
            else {
              if (!n10.options.lineWiseCopyCut) return;
              var e11 = oh(n10);
              os = { lineWise: true, text: e11.text }, "cut" == t11.type ? n10.setSelections(e11.ranges, null, te) : (r10.prevInput = "", i10.value = e11.text.join("\n"), j(i10));
            }
            "cut" == t11.type && (n10.state.cutIncoming = +/* @__PURE__ */ new Date());
          }
        }
        t10.wrapper.insertBefore(this.wrapper, t10.wrapper.firstChild), L && (i10.style.width = "0px"), tk(i10, "input", function() {
          g && v >= 9 && e10.hasSelection && (e10.hasSelection = null), r10.poll();
        }), tk(i10, "paste", function(t11) {
          !(tA(n10, t11) || oc(t11, n10)) && (n10.state.pasteIncoming = +/* @__PURE__ */ new Date(), r10.fastPoll());
        }), tk(i10, "cut", o2), tk(i10, "copy", o2), tk(t10.scroller, "paste", function(e11) {
          if (!(e6(t10, e11) || tA(n10, e11))) {
            if (!i10.dispatchEvent) {
              n10.state.pasteIncoming = +/* @__PURE__ */ new Date(), r10.focus();
              return;
            }
            var o3 = new Event("paste");
            o3.clipboardData = e11.clipboardData, i10.dispatchEvent(o3);
          }
        }), tk(t10.lineSpace, "selectstart", function(e11) {
          e6(t10, e11) || tD(e11);
        }), tk(i10, "compositionstart", function() {
          var t11 = n10.getCursor("from");
          r10.composing && r10.composing.range.clear(), r10.composing = { start: t11, range: n10.markText(t11, n10.getCursor("to"), { className: "CodeMirror-composing" }) };
        }), tk(i10, "compositionend", function() {
          r10.composing && (r10.poll(), r10.composing.range.clear(), r10.composing = null);
        });
      }, ox.prototype.createField = function(t10) {
        this.wrapper = op(), this.textarea = this.wrapper.firstChild;
        var e10 = this.cm.options;
        od(this.textarea, e10.spellcheck, e10.autocorrect, e10.autocapitalize);
      }, ox.prototype.screenReaderLabelChanged = function(t10) {
        t10 ? this.textarea.setAttribute("aria-label", t10) : this.textarea.removeAttribute("aria-label");
      }, ox.prototype.prepareSelection = function() {
        var t10 = this.cm, e10 = t10.display, r10 = t10.doc, n10 = rR(t10);
        if (t10.options.moveInputWithCursor) {
          var i10 = ry(t10, r10.sel.primary().head, "div"), o2 = e10.wrapper.getBoundingClientRect(), a2 = e10.lineDiv.getBoundingClientRect();
          n10.teTop = Math.max(0, Math.min(e10.wrapper.clientHeight - 10, i10.top + a2.top - o2.top)), n10.teLeft = Math.max(0, Math.min(e10.wrapper.clientWidth - 10, i10.left + a2.left - o2.left));
        }
        return n10;
      }, ox.prototype.showSelection = function(t10) {
        var e10 = this.cm.display;
        P(e10.cursorDiv, t10.cursors), P(e10.selectionDiv, t10.selection), null != t10.teTop && (this.wrapper.style.top = t10.teTop + "px", this.wrapper.style.left = t10.teLeft + "px");
      }, ox.prototype.reset = function(t10) {
        if (!this.contextMenuPending && (!this.composing || !t10)) {
          var e10 = this.cm;
          if (this.resetting = true, e10.somethingSelected()) {
            this.prevInput = "";
            var r10 = e10.getSelection();
            this.textarea.value = r10, e10.state.focused && j(this.textarea), g && v >= 9 && (this.hasSelection = r10);
          } else !t10 && (this.prevInput = this.textarea.value = "", g && v >= 9 && (this.hasSelection = null));
          this.resetting = false;
        }
      }, ox.prototype.getField = function() {
        return this.textarea;
      }, ox.prototype.supportsTouch = function() {
        return false;
      }, ox.prototype.focus = function() {
        if ("nocursor" != this.cm.options.readOnly && (!T || V(K(this.textarea)) != this.textarea)) try {
          this.textarea.focus();
        } catch (t10) {
        }
      }, ox.prototype.blur = function() {
        this.textarea.blur();
      }, ox.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, ox.prototype.receivedFocus = function() {
        this.slowPoll();
      }, ox.prototype.slowPoll = function() {
        var t10 = this;
        !this.pollingFast && this.polling.set(this.cm.options.pollInterval, function() {
          t10.poll(), t10.cm.state.focused && t10.slowPoll();
        });
      }, ox.prototype.fastPoll = function() {
        var t10 = false, e10 = this;
        e10.pollingFast = true, e10.polling.set(20, function r10() {
          e10.poll() || t10 ? (e10.pollingFast = false, e10.slowPoll()) : (t10 = true, e10.polling.set(60, r10));
        });
      }, ox.prototype.poll = function() {
        var t10 = this, e10 = this.cm, r10 = this.textarea, n10 = this.prevInput;
        if (this.contextMenuPending || this.resetting || !e10.state.focused || tB(r10) && !n10 && !this.composing || e10.isReadOnly() || e10.options.disableInput || e10.state.keySeq) return false;
        var i10 = r10.value;
        if (i10 == n10 && !e10.somethingSelected()) return false;
        if (g && v >= 9 && this.hasSelection === i10 || A && /[\uf700-\uf7ff]/.test(i10)) return e10.display.input.reset(), false;
        if (e10.doc.sel == e10.display.selForContextMenu) {
          var o2 = i10.charCodeAt(0);
          if (8203 != o2 || n10 || (n10 = "\u200B"), 8666 == o2) return this.reset(), this.cm.execCommand("undo");
        }
        for (var a2 = 0, l2 = Math.min(n10.length, i10.length); a2 < l2 && n10.charCodeAt(a2) == i10.charCodeAt(a2); ) ++a2;
        return no(e10, function() {
          ou(e10, i10.slice(a2), n10.length - a2, null, t10.composing ? "*compose" : null), i10.length > 1e3 || i10.indexOf("\n") > -1 ? r10.value = t10.prevInput = "" : t10.prevInput = i10, t10.composing && (t10.composing.range.clear(), t10.composing.range = e10.markText(t10.composing.start, e10.getCursor("to"), { className: "CodeMirror-composing" }));
        }), true;
      }, ox.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = false);
      }, ox.prototype.onKeyPress = function() {
        g && v >= 9 && (this.hasSelection = null), this.fastPoll();
      }, ox.prototype.onContextMenu = function(t10) {
        var e10, r10 = this, n10 = r10.cm, i10 = n10.display, o2 = r10.textarea;
        r10.contextMenuPending && r10.contextMenuPending();
        var a2 = rI(n10, t10), l2 = i10.scroller.scrollTop;
        if (a2 && !x) {
          n10.options.resetSelectionOnContextMenu && -1 == n10.doc.sel.contains(a2) && na(n10, n1)(n10.doc, nO(a2), te);
          var s2 = o2.style.cssText, u2 = r10.wrapper.style.cssText, c2 = r10.wrapper.offsetParent.getBoundingClientRect();
          if (r10.wrapper.style.cssText = "position: static", o2.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (t10.clientY - c2.top - 5) + "px; left: " + (t10.clientX - c2.left - 5) + "px;\n      z-index: 1000; background: " + (g ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", m && (e10 = o2.ownerDocument.defaultView.scrollY), i10.input.focus(), m && o2.ownerDocument.defaultView.scrollTo(null, e10), i10.input.reset(), n10.somethingSelected() || (o2.value = r10.prevInput = " "), r10.contextMenuPending = d2, i10.selForContextMenu = n10.doc.sel, clearTimeout(i10.detectingSelectAll), g && v >= 9 && h2(), W) {
            tH(t10);
            var f2 = function() {
              tS(window, "mouseup", f2), setTimeout(d2, 20);
            };
            tk(window, "mouseup", f2);
          } else setTimeout(d2, 50);
        }
        function h2() {
          if (null != o2.selectionStart) {
            var t11 = n10.somethingSelected(), e11 = "\u200B" + (t11 ? o2.value : "");
            o2.value = "\u21DA", o2.value = e11, r10.prevInput = t11 ? "" : "\u200B", o2.selectionStart = 1, o2.selectionEnd = e11.length, i10.selForContextMenu = n10.doc.sel;
          }
        }
        function d2() {
          if (r10.contextMenuPending == d2 && (r10.contextMenuPending = false, r10.wrapper.style.cssText = u2, o2.style.cssText = s2, g && v < 9 && i10.scrollbars.setScrollTop(i10.scroller.scrollTop = l2), null != o2.selectionStart)) {
            (!g || g && v < 9) && h2();
            var t11 = 0, e11 = function() {
              i10.selForContextMenu == n10.doc.sel && 0 == o2.selectionStart && o2.selectionEnd > 0 && "\u200B" == r10.prevInput ? na(n10, n9)(n10) : t11++ < 10 ? i10.detectingSelectAll = setTimeout(e11, 500) : (i10.selForContextMenu = null, i10.input.reset());
            };
            i10.detectingSelectAll = setTimeout(e11, 200);
          }
        }
      }, ox.prototype.readOnlyChanged = function(t10) {
        t10 || this.reset(), this.textarea.disabled = "nocursor" == t10, this.textarea.readOnly = !!t10;
      }, ox.prototype.setUneditable = function() {
      }, ox.prototype.needsContentAttribute = false, function(t10) {
        var e10 = t10.optionHandlers;
        function r10(r11, n10, i10, o2) {
          t10.defaults[r11] = n10, i10 && (e10[r11] = o2 ? function(t11, e11, r12) {
            r12 != ot && i10(t11, e11, r12);
          } : i10);
        }
        t10.defineOption = r10, t10.Init = ot, r10("value", "", function(t11, e11) {
          return t11.setValue(e11);
        }, true), r10("mode", null, function(t11, e11) {
          t11.doc.modeOption = e11, nH(t11);
        }, true), r10("indentUnit", 2, nH, true), r10("indentWithTabs", false), r10("smartIndent", true), r10("tabSize", 4, function(t11) {
          nE(t11), rf(t11), rW(t11);
        }, true), r10("lineSeparator", null, function(t11, e11) {
          if (t11.doc.lineSep = e11, e11) {
            var r11 = [], n10 = t11.doc.first;
            t11.doc.iter(function(t12) {
              for (var i11 = 0; ; ) {
                var o2 = t12.text.indexOf(e11, i11);
                if (-1 == o2) break;
                i11 = o2 + e11.length, r11.push(t7(n10, o2));
              }
              n10++;
            });
            for (var i10 = r11.length - 1; i10 >= 0; i10--) il(t11.doc, e11, r11[i10], t7(r11[i10].line, r11[i10].ch + e11.length));
          }
        }), r10("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(t11, e11, r11) {
          t11.state.specialChars = RegExp(e11.source + (e11.test("	") ? "" : "|	"), "g"), r11 != ot && t11.refresh();
        }), r10("specialCharPlaceholder", eU, function(t11) {
          return t11.refresh();
        }, true), r10("electricChars", true), r10("inputStyle", T ? "contenteditable" : "textarea", function() {
          throw Error("inputStyle can not (yet) be changed in a running editor");
        }, true), r10("spellcheck", false, function(t11, e11) {
          return t11.getInputField().spellcheck = e11;
        }, true), r10("autocorrect", false, function(t11, e11) {
          return t11.getInputField().autocorrect = e11;
        }, true), r10("autocapitalize", false, function(t11, e11) {
          return t11.getInputField().autocapitalize = e11;
        }, true), r10("rtlMoveVisually", !O), r10("wholeLineUpdateBefore", true), r10("theme", "default", function(t11) {
          i9(t11), nx(t11);
        }, true), r10("keyMap", "default", function(t11, e11, r11) {
          var n10 = iB(e11), i10 = r11 != ot && iB(r11);
          i10 && i10.detach && i10.detach(t11, n10), n10.attach && n10.attach(t11, i10 || null);
        }), r10("extraKeys", null), r10("configureMouse", null), r10("lineWrapping", false, oi, true), r10("gutters", [], function(t11, e11) {
          t11.display.gutterSpecs = nb(e11, t11.options.lineNumbers), nx(t11);
        }, true), r10("fixedGutter", true, function(t11, e11) {
          t11.display.gutters.style.left = e11 ? rA(t11.display) + "px" : "0", t11.refresh();
        }, true), r10("coverGutterNextToScrollbar", false, function(t11) {
          return r8(t11);
        }, true), r10("scrollbarStyle", "native", function(t11) {
          ne(t11), r8(t11), t11.display.scrollbars.setScrollTop(t11.doc.scrollTop), t11.display.scrollbars.setScrollLeft(t11.doc.scrollLeft);
        }, true), r10("lineNumbers", false, function(t11, e11) {
          t11.display.gutterSpecs = nb(t11.options.gutters, e11), nx(t11);
        }, true), r10("firstLineNumber", 1, nx, true), r10("lineNumberFormatter", function(t11) {
          return t11;
        }, nx, true), r10("showCursorWhenSelecting", false, rz, true), r10("resetSelectionOnContextMenu", true), r10("lineWiseCopyCut", true), r10("pasteLinesPerSelection", true), r10("selectionsMayTouch", false), r10("readOnly", false, function(t11, e11) {
          "nocursor" == e11 && (r_(t11), t11.display.input.blur()), t11.display.input.readOnlyChanged(e11);
        }), r10("screenReaderLabel", null, function(t11, e11) {
          e11 = "" === e11 ? null : e11, t11.display.input.screenReaderLabelChanged(e11);
        }), r10("disableInput", false, function(t11, e11) {
          e11 || t11.display.input.reset();
        }, true), r10("dragDrop", true, on), r10("allowDropFileTypes", null), r10("cursorBlinkRate", 530), r10("cursorScrollMargin", 0), r10("cursorHeight", 1, rz, true), r10("singleCursorHeightPerLine", true, rz, true), r10("workTime", 100), r10("workDelay", 100), r10("flattenSpans", true, nE, true), r10("addModeClass", false, nE, true), r10("pollInterval", 100), r10("undoDepth", 200, function(t11, e11) {
          return t11.doc.history.undoDepth = e11;
        }), r10("historyEventDelay", 1250), r10("viewportMargin", 10, function(t11) {
          return t11.refresh();
        }, true), r10("maxHighlightLength", 1e4, nE, true), r10("moveInputWithCursor", true, function(t11, e11) {
          e11 || t11.display.input.resetPosition();
        }), r10("tabindex", null, function(t11, e11) {
          return t11.display.input.getField().tabIndex = e11 || "";
        }), r10("autofocus", null), r10("direction", "ltr", function(t11, e11) {
          return t11.doc.setDirection(e11);
        }, true), r10("phrases", null);
      }(oo), e2 = oo.optionHandlers, r = oo.helpers = {}, oo.prototype = { constructor: oo, focus: function() {
        X(this).focus(), this.display.input.focus();
      }, setOption: function(t10, r10) {
        var n10 = this.options, i10 = n10[t10];
        (n10[t10] != r10 || "mode" == t10) && (n10[t10] = r10, e2.hasOwnProperty(t10) && na(this, e2[t10])(this, r10, i10), tT(this, "optionChange", this, t10));
      }, getOption: function(t10) {
        return this.options[t10];
      }, getDoc: function() {
        return this.doc;
      }, addKeyMap: function(t10, e10) {
        this.state.keyMaps[e10 ? "push" : "unshift"](iB(t10));
      }, removeKeyMap: function(t10) {
        for (var e10 = this.state.keyMaps, r10 = 0; r10 < e10.length; ++r10) if (e10[r10] == t10 || e10[r10].name == t10) return e10.splice(r10, 1), true;
      }, addOverlay: nl(function(t10, e10) {
        var r10 = t10.token ? t10 : oo.getMode(this.options, t10);
        if (r10.startState) throw Error("Overlays may not be stateful.");
        (function(t11, e11, r11) {
          for (var n10 = 0, i10 = r11(e11); n10 < t11.length && r11(t11[n10]) <= i10; ) n10++;
          t11.splice(n10, 0, e11);
        })(this.state.overlays, { mode: r10, modeSpec: t10, opaque: e10 && e10.opaque, priority: e10 && e10.priority || 0 }, function(t11) {
          return t11.priority;
        }), this.state.modeGen++, rW(this);
      }), removeOverlay: nl(function(t10) {
        for (var e10 = this.state.overlays, r10 = 0; r10 < e10.length; ++r10) {
          var n10 = e10[r10].modeSpec;
          if (n10 == t10 || "string" == typeof t10 && n10.name == t10) {
            e10.splice(r10, 1), this.state.modeGen++, rW(this);
            return;
          }
        }
      }), indentLine: nl(function(t10, e10, r10) {
        "string" != typeof e10 && "number" != typeof e10 && (e10 = null == e10 ? this.options.smartIndent ? "smart" : "prev" : e10 ? "add" : "subtract"), t5(this.doc, t10) && ol(this, t10, e10, r10);
      }), indentSelection: nl(function(t10) {
        for (var e10 = this.doc.sel.ranges, r10 = -1, n10 = 0; n10 < e10.length; n10++) {
          var i10 = e10[n10];
          if (i10.empty()) i10.head.line > r10 && (ol(this, i10.head.line, t10, true), r10 = i10.head.line, n10 == this.doc.sel.primIndex && rQ(this));
          else {
            var o2 = i10.from(), a2 = i10.to(), l2 = Math.max(r10, o2.line);
            r10 = Math.min(this.lastLine(), a2.line - (a2.ch ? 0 : 1)) + 1;
            for (var s2 = l2; s2 < r10; ++s2) ol(this, s2, t10);
            var u2 = this.doc.sel.ranges;
            0 == o2.ch && e10.length == u2.length && u2[n10].from().ch > 0 && nJ(this.doc, n10, new nA(o2, u2[n10].to()), te);
          }
        }
      }), getTokenAt: function(t10, e10) {
        return eg(this, t10, e10);
      }, getLineTokens: function(t10, e10) {
        return eg(this, t7(t10), e10, true);
      }, getTokenTypeAt: function(t10) {
        t10 = ei(this.doc, t10);
        var e10, r10 = eu(this, tJ(this.doc, t10.line)), n10 = 0, i10 = (r10.length - 1) / 2, o2 = t10.ch;
        if (0 == o2) e10 = r10[2];
        else for (; ; ) {
          var a2 = n10 + i10 >> 1;
          if ((a2 ? r10[2 * a2 - 1] : 0) >= o2) i10 = a2;
          else if (r10[2 * a2 + 1] < o2) n10 = a2 + 1;
          else {
            e10 = r10[2 * a2 + 2];
            break;
          }
        }
        var l2 = e10 ? e10.indexOf("overlay ") : -1;
        return l2 < 0 ? e10 : 0 == l2 ? null : e10.slice(0, l2 - 1);
      }, getModeAt: function(t10) {
        var e10 = this.doc.mode;
        return e10.innerMode ? oo.innerMode(e10, this.getTokenAt(t10).state).mode : e10;
      }, getHelper: function(t10, e10) {
        return this.getHelpers(t10, e10)[0];
      }, getHelpers: function(t10, e10) {
        var n10 = [];
        if (!r.hasOwnProperty(e10)) return n10;
        var i10 = r[e10], o2 = this.getModeAt(t10);
        if ("string" == typeof o2[e10]) i10[o2[e10]] && n10.push(i10[o2[e10]]);
        else if (o2[e10]) for (var a2 = 0; a2 < o2[e10].length; a2++) {
          var l2 = i10[o2[e10][a2]];
          l2 && n10.push(l2);
        }
        else o2.helperType && i10[o2.helperType] ? n10.push(i10[o2.helperType]) : i10[o2.name] && n10.push(i10[o2.name]);
        for (var s2 = 0; s2 < i10._global.length; s2++) {
          var u2 = i10._global[s2];
          u2.pred(o2, this) && -1 == J(n10, u2.val) && n10.push(u2.val);
        }
        return n10;
      }, getStateAfter: function(t10, e10) {
        var r10 = this.doc;
        return ec(this, (t10 = en(r10, null == t10 ? r10.first + r10.size - 1 : t10)) + 1, e10).state;
      }, cursorCoords: function(t10, e10) {
        var r10, n10 = this.doc.sel.primary();
        return ry(this, null == t10 ? n10.head : "object" == typeof t10 ? ei(this.doc, t10) : t10 ? n10.from() : n10.to(), e10 || "page");
      }, charCoords: function(t10, e10) {
        return rm(this, ei(this.doc, t10), e10 || "page");
      }, coordsChar: function(t10, e10) {
        return rx(this, (t10 = rv(this, t10, e10 || "page")).left, t10.top);
      }, lineAtHeight: function(t10, e10) {
        return t10 = rv(this, { top: t10, left: 0 }, e10 || "page").top, t4(this.doc, t10 + this.display.viewOffset);
      }, heightAtLine: function(t10, e10, r10) {
        var n10, i10 = false;
        if ("number" == typeof t10) {
          var o2 = this.doc.first + this.doc.size - 1;
          t10 < this.doc.first ? t10 = this.doc.first : t10 > o2 && (t10 = o2, i10 = true), n10 = tJ(this.doc, t10);
        } else n10 = t10;
        return rg(this, n10, { top: 0, left: 0 }, e10 || "page", r10 || i10).top + (i10 ? this.doc.height - eH(n10) : 0);
      }, defaultTextHeight: function() {
        return rL(this.display);
      }, defaultCharWidth: function() {
        return rS(this.display);
      }, getViewport: function() {
        return { from: this.display.viewFrom, to: this.display.viewTo };
      }, addWidget: function(t10, e10, r10, n10, i10) {
        var o2, a2 = this.display, l2 = (t10 = ry(this, ei(this.doc, t10))).bottom, s2 = t10.left;
        if (e10.style.position = "absolute", e10.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(e10), a2.sizer.appendChild(e10), "over" == n10) l2 = t10.top;
        else if ("above" == n10 || "near" == n10) {
          var u2 = Math.max(a2.wrapper.clientHeight, this.doc.height), c2 = Math.max(a2.sizer.clientWidth, a2.lineSpace.clientWidth);
          ("above" == n10 || t10.bottom + e10.offsetHeight > u2) && t10.top > e10.offsetHeight ? l2 = t10.top - e10.offsetHeight : t10.bottom + e10.offsetHeight <= u2 && (l2 = t10.bottom), s2 + e10.offsetWidth > c2 && (s2 = c2 - e10.offsetWidth);
        }
        e10.style.top = l2 + "px", e10.style.left = e10.style.right = "", "right" == i10 ? (s2 = a2.sizer.clientWidth - e10.offsetWidth, e10.style.right = "0px") : ("left" == i10 ? s2 = 0 : "middle" == i10 && (s2 = (a2.sizer.clientWidth - e10.offsetWidth) / 2), e10.style.left = s2 + "px"), r10 && (null != (o2 = rY(this, { left: s2, top: l2, right: s2 + e10.offsetWidth, bottom: l2 + e10.offsetHeight })).scrollTop && r2(this, o2.scrollTop), null != o2.scrollLeft && r4(this, o2.scrollLeft));
      }, triggerOnKeyDown: nl(i0), triggerOnKeyPress: nl(i2), triggerOnKeyUp: i1, triggerOnMouseDown: nl(i4), execCommand: function(t10) {
        if (iq.hasOwnProperty(t10)) return iq[t10].call(null, this);
      }, triggerElectric: nl(function(t10) {
        of(this, t10);
      }), findPosH: function(t10, e10, r10, n10) {
        var i10 = 1;
        e10 < 0 && (i10 = -1, e10 = -e10);
        for (var o2 = ei(this.doc, t10), a2 = 0; a2 < e10 && !(o2 = og(this.doc, o2, i10, r10, n10)).hitSide; ++a2) ;
        return o2;
      }, moveH: nl(function(t10, e10) {
        var r10 = this;
        this.extendSelectionsBy(function(n10) {
          return r10.display.shift || r10.doc.extend || n10.empty() ? og(r10.doc, n10.head, t10, e10, r10.options.rtlMoveVisually) : t10 < 0 ? n10.from() : n10.to();
        }, tn);
      }), deleteH: nl(function(t10, e10) {
        var r10 = this.doc.sel, n10 = this.doc;
        r10.somethingSelected() ? n10.replaceSelection("", null, "+delete") : iV(this, function(r11) {
          var i10 = og(n10, r11.head, t10, e10, false);
          return t10 < 0 ? { from: i10, to: r11.head } : { from: r11.head, to: i10 };
        });
      }), findPosV: function(t10, e10, r10, n10) {
        var i10 = 1, o2 = n10;
        e10 < 0 && (i10 = -1, e10 = -e10);
        for (var a2 = ei(this.doc, t10), l2 = 0; l2 < e10; ++l2) {
          var s2 = ry(this, a2, "div");
          if (null == o2 ? o2 = s2.left : s2.left = o2, (a2 = ov(this, s2, i10, r10)).hitSide) break;
        }
        return a2;
      }, moveV: nl(function(t10, e10) {
        var r10 = this, n10 = this.doc, i10 = [], o2 = !this.display.shift && !n10.extend && n10.sel.somethingSelected();
        if (n10.extendSelectionsBy(function(a3) {
          if (o2) return t10 < 0 ? a3.from() : a3.to();
          var l2 = ry(r10, a3.head, "div");
          null != a3.goalColumn && (l2.left = a3.goalColumn), i10.push(l2.left);
          var s2 = ov(r10, l2, t10, e10);
          return "page" == e10 && a3 == n10.sel.primary() && rZ(r10, rm(r10, s2, "div").top - l2.top), s2;
        }, tn), i10.length) for (var a2 = 0; a2 < n10.sel.ranges.length; a2++) n10.sel.ranges[a2].goalColumn = i10[a2];
      }), findWordAt: function(t10) {
        var e10 = tJ(this.doc, t10.line).text, r10 = t10.ch, n10 = t10.ch;
        if (e10) {
          var i10 = this.getHelper(t10, "wordChars");
          ("before" == t10.sticky || n10 == e10.length) && r10 ? --r10 : ++n10;
          for (var o2 = e10.charAt(r10), a2 = td(o2, i10) ? function(t11) {
            return td(t11, i10);
          } : /\s/.test(o2) ? function(t11) {
            return /\s/.test(t11);
          } : function(t11) {
            return !/\s/.test(t11) && !td(t11);
          }; r10 > 0 && a2(e10.charAt(r10 - 1)); ) --r10;
          for (; n10 < e10.length && a2(e10.charAt(n10)); ) ++n10;
        }
        return new nA(t7(t10.line, r10), t7(t10.line, n10));
      }, toggleOverwrite: function(t10) {
        (null == t10 || t10 != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? G(this.display.cursorDiv, "CodeMirror-overwrite") : H(this.display.cursorDiv, "CodeMirror-overwrite"), tT(this, "overwriteToggle", this, this.state.overwrite));
      }, hasFocus: function() {
        return this.display.input.getField() == V(_(this));
      }, isReadOnly: function() {
        return !!(this.options.readOnly || this.doc.cantEdit);
      }, scrollTo: nl(function(t10, e10) {
        rJ(this, t10, e10);
      }), getScrollInfo: function() {
        var t10 = this.display.scroller;
        return { left: t10.scrollLeft, top: t10.scrollTop, height: t10.scrollHeight - rt(this) - this.display.barHeight, width: t10.scrollWidth - rt(this) - this.display.barWidth, clientHeight: rr(this), clientWidth: re(this) };
      }, scrollIntoView: nl(function(t10, e10) {
        if (null == t10 ? (t10 = { from: this.doc.sel.primary().head, to: null }, null == e10 && (e10 = this.options.cursorScrollMargin)) : "number" == typeof t10 ? t10 = { from: t7(t10, 0), to: null } : null == t10.from && (t10 = { from: t10, to: null }), t10.to || (t10.to = t10.from), t10.margin = e10 || 0, null != t10.from.line) {
          var r10;
          r10 = t10, r0(this), this.curOp.scrollToPos = r10;
        } else r1(this, t10.from, t10.to, t10.margin);
      }), setSize: nl(function(t10, e10) {
        var r10 = this, n10 = function(t11) {
          return "number" == typeof t11 || /^\d+$/.test(String(t11)) ? t11 + "px" : t11;
        };
        null != t10 && (this.display.wrapper.style.width = n10(t10)), null != e10 && (this.display.wrapper.style.height = n10(e10)), this.options.lineWrapping && rc(this);
        var i10 = this.display.viewFrom;
        this.doc.iter(i10, this.display.viewTo, function(t11) {
          if (t11.widgets) {
            for (var e11 = 0; e11 < t11.widgets.length; e11++) if (t11.widgets[e11].noHScroll) {
              rF(r10, i10, "widget");
              break;
            }
          }
          ++i10;
        }), this.curOp.forceUpdate = true, tT(this, "refresh", this);
      }), operation: function(t10) {
        return no(this, t10);
      }, startOperation: function() {
        return nn(this);
      }, endOperation: function() {
        return ni(this);
      }, refresh: nl(function() {
        var t10 = this.display.cachedTextHeight;
        rW(this), this.curOp.forceUpdate = true, rf(this), rJ(this, this.doc.scrollLeft, this.doc.scrollTop), ng(this.display), (null == t10 || Math.abs(t10 - rL(this.display)) > 0.5 || this.options.lineWrapping) && rO(this), tT(this, "refresh", this);
      }), swapDoc: nl(function(t10) {
        var e10 = this.doc;
        return e10.cm = null, this.state.selectingText && this.state.selectingText(), nB(this, t10), rf(this), this.display.input.reset(), rJ(this, t10.scrollLeft, t10.scrollTop), this.curOp.forceScroll = true, eY(this, "swapDoc", this, e10), e10;
      }), phrase: function(t10) {
        var e10 = this.options.phrases;
        return e10 && Object.prototype.hasOwnProperty.call(e10, t10) ? e10[t10] : t10;
      }, getInputField: function() {
        return this.display.input.getField();
      }, getWrapperElement: function() {
        return this.display.wrapper;
      }, getScrollerElement: function() {
        return this.display.scroller;
      }, getGutterElement: function() {
        return this.display.gutters;
      } }, tI(oo), oo.registerHelper = function(t10, e10, n10) {
        r.hasOwnProperty(t10) || (r[t10] = oo[t10] = { _global: [] }), r[t10][e10] = n10;
      }, oo.registerGlobalHelper = function(t10, e10, n10, i10) {
        oo.registerHelper(t10, e10, i10), r[t10]._global.push({ pred: n10, val: i10 });
      };
      var oM = "iter insert remove copy getEditor constructor".split(" ");
      for (var oC in iC.prototype) iC.prototype.hasOwnProperty(oC) && 0 > J(oM, oC) && (oo.prototype[oC] = /* @__PURE__ */ function(t10) {
        return function() {
          return t10.apply(this.doc, arguments);
        };
      }(iC.prototype[oC]));
      return tI(iC), oo.inputStyles = { textarea: ox, contenteditable: om }, oo.defineMode = function(t10) {
        oo.defaults.mode || "null" == t10 || (oo.defaults.mode = t10), tq.apply(this, arguments);
      }, oo.defineMIME = function(t10, e10) {
        tj[t10] = e10;
      }, oo.defineMode("null", function() {
        return { token: function(t10) {
          return t10.skipToEnd();
        } };
      }), oo.defineMIME("text/plain", "null"), oo.defineExtension = function(t10, e10) {
        oo.prototype[t10] = e10;
      }, oo.defineDocExtension = function(t10, e10) {
        iC.prototype[t10] = e10;
      }, oo.fromTextArea = function(t10, e10) {
        if ((e10 = e10 ? Y(e10) : {}).value = t10.value, !e10.tabindex && t10.tabIndex && (e10.tabindex = t10.tabIndex), !e10.placeholder && t10.placeholder && (e10.placeholder = t10.placeholder), null == e10.autofocus) {
          var r10, n10 = V(K(t10));
          e10.autofocus = n10 == t10 || null != t10.getAttribute("autofocus") && n10 == document.body;
        }
        function i10() {
          t10.value = l2.getValue();
        }
        if (t10.form && (tk(t10.form, "submit", i10), !e10.leaveSubmitMethodAlone)) {
          var o2 = t10.form;
          r10 = o2.submit;
          try {
            var a2 = o2.submit = function() {
              i10(), o2.submit = r10, o2.submit(), o2.submit = a2;
            };
          } catch (t11) {
          }
        }
        e10.finishInit = function(n11) {
          n11.save = i10, n11.getTextArea = function() {
            return t10;
          }, n11.toTextArea = function() {
            n11.toTextArea = isNaN, i10(), t10.parentNode.removeChild(n11.getWrapperElement()), t10.style.display = "", t10.form && (tS(t10.form, "submit", i10), e10.leaveSubmitMethodAlone || "function" != typeof t10.form.submit || (t10.form.submit = r10));
          };
        }, t10.style.display = "none";
        var l2 = oo(function(e11) {
          return t10.parentNode.insertBefore(e11, t10.nextSibling);
        }, e10);
        return l2;
      }, oo.off = tS, oo.on = tk, oo.wheelEventPixels = function(t10) {
        var e10 = nL(t10);
        return e10.x *= nk, e10.y *= nk, e10;
      }, oo.Doc = iC, oo.splitLines = tR, oo.countColumn = Z, oo.findColumn = ti, oo.isWordChar = th, oo.Pass = tt, oo.signal = tT, oo.Line = ez, oo.changeEnd = nI, oo.scrollbarModel = nt, oo.Pos = t7, oo.cmpPos = t8, oo.modes = tU, oo.mimeModes = tj, oo.resolveMode = t_, oo.getMode = tK, oo.modeExtensions = tX, oo.extendMode = function(t10, e10) {
        Y(e10, tX.hasOwnProperty(t10) ? tX[t10] : tX[t10] = {});
      }, oo.copyState = t$, oo.startState = tZ, oo.innerMode = tY, oo.commands = iq, oo.keyMap = iF, oo.keyName = iR, oo.isModifierKey = iP, oo.lookupKey = iE, oo.normalizeKeyMap = function(t10) {
        var e10 = {};
        for (var r10 in t10) if (t10.hasOwnProperty(r10)) {
          var n10 = t10[r10];
          if (/^(name|fallthrough|(de|at)tach)$/.test(r10)) continue;
          if ("..." == n10) {
            delete t10[r10];
            continue;
          }
          for (var i10 = ts(r10.split(" "), iH), o2 = 0; o2 < i10.length; o2++) {
            var a2 = void 0, l2 = void 0;
            o2 == i10.length - 1 ? (l2 = i10.join(" "), a2 = n10) : (l2 = i10.slice(0, o2 + 1).join(" "), a2 = "...");
            var s2 = e10[l2];
            if (s2) {
              if (s2 != a2) throw Error("Inconsistent bindings for " + l2);
            } else e10[l2] = a2;
          }
          delete t10[r10];
        }
        for (var u2 in e10) t10[u2] = e10[u2];
        return t10;
      }, oo.StringStream = tQ, oo.SharedTextMarker = iw, oo.TextMarker = iy, oo.LineWidget = ig, oo.e_preventDefault = tD, oo.e_stopPropagation = tW, oo.e_stop = tH, oo.addClass = G, oo.contains = B, oo.rmClass = H, oo.keyNames = iO, oo.version = "5.65.16", oo;
    }, t.exports = e();
  }, 6876: function(t, e, r) {
    var n;
    n = r(4631), n.defineMode("javascript", function(t2, e2) {
      var r2, i, o = t2.indentUnit, a = e2.statementIndent, l = e2.jsonld, s = e2.json || l, u = false !== e2.trackScope, c = e2.typescript, f = e2.wordCharacters || /[\w$\xa1-\uffff]/, h = function() {
        function t3(t4) {
          return { type: t4, style: "keyword" };
        }
        var e3 = t3("keyword a"), r3 = t3("keyword b"), n2 = t3("keyword c"), i2 = t3("keyword d"), o2 = t3("operator"), a2 = { type: "atom", style: "atom" };
        return { if: t3("if"), while: e3, with: e3, else: r3, do: r3, try: r3, finally: r3, return: i2, break: i2, continue: i2, new: t3("new"), delete: n2, void: n2, throw: n2, debugger: t3("debugger"), var: t3("var"), const: t3("var"), let: t3("var"), function: t3("function"), catch: t3("catch"), for: t3("for"), switch: t3("switch"), case: t3("case"), default: t3("default"), in: o2, typeof: o2, instanceof: o2, true: a2, false: a2, null: a2, undefined: a2, NaN: a2, Infinity: a2, this: t3("this"), class: t3("class"), super: t3("atom"), yield: n2, export: t3("export"), import: t3("import"), extends: n2, await: n2 };
      }(), d = /[+\-*&%=<>!?|~^@]/, p = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
      function g(t3, e3, n2) {
        return r2 = t3, i = n2, e3;
      }
      function v(t3, e3) {
        var r3, n2 = t3.next();
        if ('"' == n2 || "'" == n2) {
          return e3.tokenize = (r3 = n2, function(t4, e4) {
            var n3, i3 = false;
            if (l && "@" == t4.peek() && t4.match(p)) return e4.tokenize = v, g("jsonld-keyword", "meta");
            for (; null != (n3 = t4.next()) && (n3 != r3 || i3); ) i3 = !i3 && "\\" == n3;
            return i3 || (e4.tokenize = v), g("string", "string");
          }), e3.tokenize(t3, e3);
        }
        if ("." == n2 && t3.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return g("number", "number");
        if ("." == n2 && t3.match("..")) return g("spread", "meta");
        if (/[\[\]{}\(\),;\:\.]/.test(n2)) return g(n2);
        if ("=" == n2 && t3.eat(">")) return g("=>", "operator");
        else if ("0" == n2 && t3.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return g("number", "number");
        else if (/\d/.test(n2)) return t3.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), g("number", "number");
        else if ("/" == n2) return t3.eat("*") ? (e3.tokenize = m, m(t3, e3)) : t3.eat("/") ? (t3.skipToEnd(), g("comment", "comment")) : tZ(t3, e3, 1) ? (function(t4) {
          for (var e4, r4 = false, n3 = false; null != (e4 = t4.next()); ) {
            if (!r4) {
              if ("/" == e4 && !n3) return;
              "[" == e4 ? n3 = true : n3 && "]" == e4 && (n3 = false);
            }
            r4 = !r4 && "\\" == e4;
          }
        }(t3), t3.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), g("regexp", "string-2")) : (t3.eat("="), g("operator", "operator", t3.current()));
        else if ("`" == n2) return e3.tokenize = y, y(t3, e3);
        else if ("#" == n2 && "!" == t3.peek()) return t3.skipToEnd(), g("meta", "meta");
        else if ("#" == n2 && t3.eatWhile(f)) return g("variable", "property");
        else if ("<" == n2 && t3.match("!--") || "-" == n2 && t3.match("->") && !/\S/.test(t3.string.slice(0, t3.start))) return t3.skipToEnd(), g("comment", "comment");
        else if (d.test(n2)) return ((">" != n2 || !e3.lexical || ">" != e3.lexical.type) && (t3.eat("=") ? ("!" == n2 || "=" == n2) && t3.eat("=") : /[<>*+\-|&?]/.test(n2) && (t3.eat(n2), ">" == n2 && t3.eat(n2))), "?" == n2 && t3.eat(".")) ? g(".") : g("operator", "operator", t3.current());
        else if (f.test(n2)) {
          t3.eatWhile(f);
          var i2 = t3.current();
          if ("." != e3.lastType) {
            if (h.propertyIsEnumerable(i2)) {
              var o2 = h[i2];
              return g(o2.type, o2.style, i2);
            }
            if ("async" == i2 && t3.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false)) return g("async", "keyword", i2);
          }
          return g("variable", "variable", i2);
        }
      }
      function m(t3, e3) {
        for (var r3, n2 = false; r3 = t3.next(); ) {
          if ("/" == r3 && n2) {
            e3.tokenize = v;
            break;
          }
          n2 = "*" == r3;
        }
        return g("comment", "comment");
      }
      function y(t3, e3) {
        for (var r3, n2 = false; null != (r3 = t3.next()); ) {
          if (!n2 && ("`" == r3 || "$" == r3 && t3.eat("{"))) {
            e3.tokenize = v;
            break;
          }
          n2 = !n2 && "\\" == r3;
        }
        return g("quasi", "string-2", t3.current());
      }
      function b(t3, e3) {
        e3.fatArrowAt && (e3.fatArrowAt = null);
        var r3 = t3.string.indexOf("=>", t3.start);
        if (!(r3 < 0)) {
          if (c) {
            var n2 = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(t3.string.slice(t3.start, r3));
            n2 && (r3 = n2.index);
          }
          for (var i2 = 0, o2 = false, a2 = r3 - 1; a2 >= 0; --a2) {
            var l2 = t3.string.charAt(a2), s2 = "([{}])".indexOf(l2);
            if (s2 >= 0 && s2 < 3) {
              if (!i2) {
                ++a2;
                break;
              }
              if (0 == --i2) {
                "(" == l2 && (o2 = true);
                break;
              }
            } else if (s2 >= 3 && s2 < 6) ++i2;
            else if (f.test(l2)) o2 = true;
            else if (/["'\/`]/.test(l2)) for (; ; --a2) {
              if (0 == a2) return;
              if (t3.string.charAt(a2 - 1) == l2 && "\\" != t3.string.charAt(a2 - 2)) {
                a2--;
                break;
              }
            }
            else if (o2 && !i2) {
              ++a2;
              break;
            }
          }
          o2 && !i2 && (e3.fatArrowAt = a2);
        }
      }
      var w = { atom: true, number: true, variable: true, string: true, regexp: true, this: true, import: true, "jsonld-keyword": true };
      function x(t3, e3, r3, n2, i2, o2) {
        this.indented = t3, this.column = e3, this.type = r3, this.prev = i2, this.info = o2, null != n2 && (this.align = n2);
      }
      function M(t3, e3, r3, n2, i2) {
        var o2 = t3.cc;
        for (C.state = t3, C.stream = i2, C.marked = null, C.cc = o2, C.style = e3, t3.lexical.hasOwnProperty("align") || (t3.lexical.align = true); ; ) if ((o2.length ? o2.pop() : s ? B : z)(r3, n2)) {
          for (; o2.length && o2[o2.length - 1].lex; ) o2.pop()();
          if (C.marked) return C.marked;
          if ("variable" == r3 && function(t4, e4) {
            if (!u) return false;
            for (var r4 = t4.localVars; r4; r4 = r4.next) if (r4.name == e4) return true;
            for (var n3 = t4.context; n3; n3 = n3.prev) for (var r4 = n3.vars; r4; r4 = r4.next) if (r4.name == e4) return true;
          }(t3, n2)) return "variable-2";
          return e3;
        }
      }
      var C = { state: null, column: null, marked: null, cc: null };
      function k() {
        for (var t3 = arguments.length - 1; t3 >= 0; t3--) C.cc.push(arguments[t3]);
      }
      function L() {
        return k.apply(null, arguments), true;
      }
      function S(t3, e3) {
        for (var r3 = e3; r3; r3 = r3.next) if (r3.name == t3) return true;
        return false;
      }
      function T(t3) {
        var r3 = C.state;
        if (C.marked = "def", u) {
          if (r3.context) {
            if ("var" == r3.lexical.info && r3.context && r3.context.block) {
              var n2 = function t4(e3, r4) {
                if (!r4) return null;
                if (r4.block) {
                  var n3 = t4(e3, r4.prev);
                  return n3 ? n3 == r4.prev ? r4 : new N(n3, r4.vars, true) : null;
                }
                return S(e3, r4.vars) ? r4 : new N(r4.prev, new O(e3, r4.vars), false);
              }(t3, r3.context);
              if (null != n2) {
                r3.context = n2;
                return;
              }
            } else if (!S(t3, r3.localVars)) {
              r3.localVars = new O(t3, r3.localVars);
              return;
            }
          }
          e2.globalVars && !S(t3, r3.globalVars) && (r3.globalVars = new O(t3, r3.globalVars));
        }
      }
      function A(t3) {
        return "public" == t3 || "private" == t3 || "protected" == t3 || "abstract" == t3 || "readonly" == t3;
      }
      function N(t3, e3, r3) {
        this.prev = t3, this.vars = e3, this.block = r3;
      }
      function O(t3, e3) {
        this.name = t3, this.next = e3;
      }
      var I = new O("this", new O("arguments", null));
      function D() {
        C.state.context = new N(C.state.context, C.state.localVars, false), C.state.localVars = I;
      }
      function W() {
        C.state.context = new N(C.state.context, C.state.localVars, true), C.state.localVars = null;
      }
      function F() {
        C.state.localVars = C.state.context.vars, C.state.context = C.state.context.prev;
      }
      function H(t3, e3) {
        var r3 = function() {
          var r4 = C.state, n2 = r4.indented;
          if ("stat" == r4.lexical.type) n2 = r4.lexical.indented;
          else for (var i2 = r4.lexical; i2 && ")" == i2.type && i2.align; i2 = i2.prev) n2 = i2.indented;
          r4.lexical = new x(n2, C.stream.column(), t3, null, r4.lexical, e3);
        };
        return r3.lex = true, r3;
      }
      function E() {
        var t3 = C.state;
        t3.lexical.prev && (")" == t3.lexical.type && (t3.indented = t3.lexical.indented), t3.lexical = t3.lexical.prev);
      }
      function P(t3) {
        return function e3(r3) {
          return r3 == t3 ? L() : ";" == t3 || "}" == r3 || ")" == r3 || "]" == r3 ? k() : L(e3);
        };
      }
      function z(t3, e3) {
        if ("var" == t3) return L(H("vardef", e3), tM, P(";"), E);
        if ("keyword a" == t3) return L(H("form"), G, z, E);
        if ("keyword b" == t3) return L(H("form"), z, E);
        if ("keyword d" == t3) return C.stream.match(/^\s*$/, false) ? L() : L(H("stat"), j, P(";"), E);
        if ("debugger" == t3) return L(P(";"));
        if ("{" == t3) return L(H("}"), W, ta, E, F);
        if (";" == t3) return L();
        if ("if" == t3) return "else" == C.state.lexical.info && C.state.cc[C.state.cc.length - 1] == E && C.state.cc.pop()(), L(H("form"), G, z, E, tA);
        if ("function" == t3) return L(tD);
        if ("for" == t3) return L(H("form"), W, tN, z, F, E);
        if ("class" == t3 || c && "interface" == e3) return C.marked = "keyword", L(H("form", "class" == t3 ? t3 : e3), tP, E);
        if ("variable" == t3) {
          if (c && "declare" == e3) return C.marked = "keyword", L(z);
          if (c && ("module" == e3 || "enum" == e3 || "type" == e3) && C.stream.match(/^\s*\w/, false)) return (C.marked = "keyword", "enum" == e3) ? L(t$) : "type" == e3 ? L(tF, P("operator"), tf, P(";")) : L(H("form"), tC, P("{"), H("}"), ta, E, E);
          if (c && "namespace" == e3) return C.marked = "keyword", L(H("form"), B, z, E);
          else if (c && "abstract" == e3) return C.marked = "keyword", L(z);
          else return L(H("stat"), J);
        }
        return "switch" == t3 ? L(H("form"), G, P("{"), H("}", "switch"), W, ta, E, E, F) : "case" == t3 ? L(B, P(":")) : "default" == t3 ? L(P(":")) : "catch" == t3 ? L(H("form"), D, R, z, E, F) : "export" == t3 ? L(H("stat"), tV, E) : "import" == t3 ? L(H("stat"), tU, E) : "async" == t3 ? L(z) : "@" == e3 ? L(B, z) : k(H("stat"), B, P(";"), E);
      }
      function R(t3) {
        if ("(" == t3) return L(tH, P(")"));
      }
      function B(t3, e3) {
        return U(t3, e3, false);
      }
      function V(t3, e3) {
        return U(t3, e3, true);
      }
      function G(t3) {
        return "(" != t3 ? k() : L(H(")"), j, P(")"), E);
      }
      function U(t3, e3, r3) {
        if (C.state.fatArrowAt == C.stream.start) {
          var n2, i2 = r3 ? Y : $;
          if ("(" == t3) return L(D, H(")"), ti(tH, ")"), E, P("=>"), i2, F);
          if ("variable" == t3) return k(D, tC, P("=>"), i2, F);
        }
        var o2 = r3 ? _ : q;
        return w.hasOwnProperty(t3) ? L(o2) : "function" == t3 ? L(tD, o2) : "class" == t3 || c && "interface" == e3 ? (C.marked = "keyword", L(H("form"), tE, E)) : "keyword c" == t3 || "async" == t3 ? L(r3 ? V : B) : "(" == t3 ? L(H(")"), j, P(")"), E, o2) : "operator" == t3 || "spread" == t3 ? L(r3 ? V : B) : "[" == t3 ? L(H("]"), tX, E, o2) : "{" == t3 ? to(te, "}", null, o2) : "quasi" == t3 ? k(K, o2) : "new" == t3 ? L((n2 = r3, function(t4) {
          return "." == t4 ? L(n2 ? Q : Z) : "variable" == t4 && c ? L(tb, n2 ? _ : q) : k(n2 ? V : B);
        })) : L();
      }
      function j(t3) {
        return t3.match(/[;\}\)\],]/) ? k() : k(B);
      }
      function q(t3, e3) {
        return "," == t3 ? L(j) : _(t3, e3, false);
      }
      function _(t3, e3, r3) {
        var n2 = false == r3 ? q : _, i2 = false == r3 ? B : V;
        if ("=>" == t3) return L(D, r3 ? Y : $, F);
        if ("operator" == t3) return /\+\+|--/.test(e3) || c && "!" == e3 ? L(n2) : c && "<" == e3 && C.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false) ? L(H(">"), ti(tf, ">"), E, n2) : "?" == e3 ? L(B, P(":"), i2) : L(i2);
        if ("quasi" == t3) return k(K, n2);
        if (";" != t3) {
          if ("(" == t3) return to(V, ")", "call", n2);
          if ("." == t3) return L(tt, n2);
          if ("[" == t3) return L(H("]"), j, P("]"), E, n2);
          if (c && "as" == e3) return C.marked = "keyword", L(tf, n2);
          if ("regexp" == t3) return C.state.lastType = C.marked = "operator", C.stream.backUp(C.stream.pos - C.stream.start - 1), L(i2);
        }
      }
      function K(t3, e3) {
        return "quasi" != t3 ? k() : "${" != e3.slice(e3.length - 2) ? L(K) : L(j, X);
      }
      function X(t3) {
        if ("}" == t3) return C.marked = "string-2", C.state.tokenize = y, L(K);
      }
      function $(t3) {
        return b(C.stream, C.state), k("{" == t3 ? z : B);
      }
      function Y(t3) {
        return b(C.stream, C.state), k("{" == t3 ? z : V);
      }
      function Z(t3, e3) {
        if ("target" == e3) return C.marked = "keyword", L(q);
      }
      function Q(t3, e3) {
        if ("target" == e3) return C.marked = "keyword", L(_);
      }
      function J(t3) {
        return ":" == t3 ? L(E, z) : k(q, P(";"), E);
      }
      function tt(t3) {
        if ("variable" == t3) return C.marked = "property", L();
      }
      function te(t3, e3) {
        if ("async" == t3) return C.marked = "property", L(te);
        if ("variable" == t3 || "keyword" == C.style) {
          var r3;
          return (C.marked = "property", "get" == e3 || "set" == e3) ? L(tr) : (c && C.state.fatArrowAt == C.stream.start && (r3 = C.stream.match(/^\s*:\s*/, false)) && (C.state.fatArrowAt = C.stream.pos + r3[0].length), L(tn));
        }
        if ("number" == t3 || "string" == t3) return C.marked = l ? "property" : C.style + " property", L(tn);
        if ("jsonld-keyword" == t3) return L(tn);
        if (c && A(e3)) return C.marked = "keyword", L(te);
        else if ("[" == t3) return L(B, tl, P("]"), tn);
        else if ("spread" == t3) return L(V, tn);
        else if ("*" == e3) return C.marked = "keyword", L(te);
        else if (":" == t3) return k(tn);
      }
      function tr(t3) {
        return "variable" != t3 ? k(tn) : (C.marked = "property", L(tD));
      }
      function tn(t3) {
        return ":" == t3 ? L(V) : "(" == t3 ? k(tD) : void 0;
      }
      function ti(t3, e3, r3) {
        function n2(i2, o2) {
          if (r3 ? r3.indexOf(i2) > -1 : "," == i2) {
            var a2 = C.state.lexical;
            return "call" == a2.info && (a2.pos = (a2.pos || 0) + 1), L(function(r4, n3) {
              return r4 == e3 || n3 == e3 ? k() : k(t3);
            }, n2);
          }
          return i2 == e3 || o2 == e3 ? L() : r3 && r3.indexOf(";") > -1 ? k(t3) : L(P(e3));
        }
        return function(r4, i2) {
          return r4 == e3 || i2 == e3 ? L() : k(t3, n2);
        };
      }
      function to(t3, e3, r3) {
        for (var n2 = 3; n2 < arguments.length; n2++) C.cc.push(arguments[n2]);
        return L(H(e3, r3), ti(t3, e3), E);
      }
      function ta(t3) {
        return "}" == t3 ? L() : k(z, ta);
      }
      function tl(t3, e3) {
        if (c) {
          if (":" == t3) return L(tf);
          if ("?" == e3) return L(tl);
        }
      }
      function ts(t3, e3) {
        if (c && (":" == t3 || "in" == e3)) return L(tf);
      }
      function tu(t3) {
        if (c && ":" == t3) return C.stream.match(/^\s*\w+\s+is\b/, false) ? L(B, tc, tf) : L(tf);
      }
      function tc(t3, e3) {
        if ("is" == e3) return C.marked = "keyword", L();
      }
      function tf(t3, e3) {
        return "keyof" == e3 || "typeof" == e3 || "infer" == e3 || "readonly" == e3 ? (C.marked = "keyword", L("typeof" == e3 ? V : tf)) : "variable" == t3 || "void" == e3 ? (C.marked = "type", L(ty)) : "|" == e3 || "&" == e3 ? L(tf) : "string" == t3 || "number" == t3 || "atom" == t3 ? L(ty) : "[" == t3 ? L(H("]"), ti(tf, "]", ","), E, ty) : "{" == t3 ? L(H("}"), td, E, ty) : "(" == t3 ? L(ti(tm, ")"), th, ty) : "<" == t3 ? L(ti(tf, ">"), tf) : "quasi" == t3 ? k(tg, ty) : void 0;
      }
      function th(t3) {
        if ("=>" == t3) return L(tf);
      }
      function td(t3) {
        return t3.match(/[\}\)\]]/) ? L() : "," == t3 || ";" == t3 ? L(td) : k(tp, td);
      }
      function tp(t3, e3) {
        if ("variable" == t3 || "keyword" == C.style) return C.marked = "property", L(tp);
        if ("?" == e3 || "number" == t3 || "string" == t3) return L(tp);
        if (":" == t3) return L(tf);
        if ("[" == t3) return L(P("variable"), ts, P("]"), tp);
        if ("(" == t3) return k(tW, tp);
        else if (!t3.match(/[;\}\)\],]/)) return L();
      }
      function tg(t3, e3) {
        return "quasi" != t3 ? k() : "${" != e3.slice(e3.length - 2) ? L(tg) : L(tf, tv);
      }
      function tv(t3) {
        if ("}" == t3) return C.marked = "string-2", C.state.tokenize = y, L(tg);
      }
      function tm(t3, e3) {
        return "variable" == t3 && C.stream.match(/^\s*[?:]/, false) || "?" == e3 ? L(tm) : ":" == t3 ? L(tf) : "spread" == t3 ? L(tm) : k(tf);
      }
      function ty(t3, e3) {
        return "<" == e3 ? L(H(">"), ti(tf, ">"), E, ty) : "|" == e3 || "." == t3 || "&" == e3 ? L(tf) : "[" == t3 ? L(tf, P("]"), ty) : "extends" == e3 || "implements" == e3 ? (C.marked = "keyword", L(tf)) : "?" == e3 ? L(tf, P(":"), tf) : void 0;
      }
      function tb(t3, e3) {
        if ("<" == e3) return L(H(">"), ti(tf, ">"), E, ty);
      }
      function tw() {
        return k(tf, tx);
      }
      function tx(t3, e3) {
        if ("=" == e3) return L(tf);
      }
      function tM(t3, e3) {
        return "enum" == e3 ? (C.marked = "keyword", L(t$)) : k(tC, tl, tS, tT);
      }
      function tC(t3, e3) {
        return c && A(e3) ? (C.marked = "keyword", L(tC)) : "variable" == t3 ? (T(e3), L()) : "spread" == t3 ? L(tC) : "[" == t3 ? to(tL, "]") : "{" == t3 ? to(tk, "}") : void 0;
      }
      function tk(t3, e3) {
        return "variable" != t3 || C.stream.match(/^\s*:/, false) ? ("variable" == t3 && (C.marked = "property"), "spread" == t3) ? L(tC) : "}" == t3 ? k() : "[" == t3 ? L(B, P("]"), P(":"), tk) : L(P(":"), tC, tS) : (T(e3), L(tS));
      }
      function tL() {
        return k(tC, tS);
      }
      function tS(t3, e3) {
        if ("=" == e3) return L(V);
      }
      function tT(t3) {
        if ("," == t3) return L(tM);
      }
      function tA(t3, e3) {
        if ("keyword b" == t3 && "else" == e3) return L(H("form", "else"), z, E);
      }
      function tN(t3, e3) {
        return "await" == e3 ? L(tN) : "(" == t3 ? L(H(")"), tO, E) : void 0;
      }
      function tO(t3) {
        return "var" == t3 ? L(tM, tI) : "variable" == t3 ? L(tI) : k(tI);
      }
      function tI(t3, e3) {
        return ")" == t3 ? L() : ";" == t3 ? L(tI) : "in" == e3 || "of" == e3 ? (C.marked = "keyword", L(B, tI)) : k(B, tI);
      }
      function tD(t3, e3) {
        return "*" == e3 ? (C.marked = "keyword", L(tD)) : "variable" == t3 ? (T(e3), L(tD)) : "(" == t3 ? L(D, H(")"), ti(tH, ")"), E, tu, z, F) : c && "<" == e3 ? L(H(">"), ti(tw, ">"), E, tD) : void 0;
      }
      function tW(t3, e3) {
        return "*" == e3 ? (C.marked = "keyword", L(tW)) : "variable" == t3 ? (T(e3), L(tW)) : "(" == t3 ? L(D, H(")"), ti(tH, ")"), E, tu, F) : c && "<" == e3 ? L(H(">"), ti(tw, ">"), E, tW) : void 0;
      }
      function tF(t3, e3) {
        return "keyword" == t3 || "variable" == t3 ? (C.marked = "type", L(tF)) : "<" == e3 ? L(H(">"), ti(tw, ">"), E) : void 0;
      }
      function tH(t3, e3) {
        return ("@" == e3 && L(B, tH), "spread" == t3) ? L(tH) : c && A(e3) ? (C.marked = "keyword", L(tH)) : c && "this" == t3 ? L(tl, tS) : k(tC, tl, tS);
      }
      function tE(t3, e3) {
        return "variable" == t3 ? tP(t3, e3) : tz(t3, e3);
      }
      function tP(t3, e3) {
        if ("variable" == t3) return T(e3), L(tz);
      }
      function tz(t3, e3) {
        return "<" == e3 ? L(H(">"), ti(tw, ">"), E, tz) : "extends" == e3 || "implements" == e3 || c && "," == t3 ? ("implements" == e3 && (C.marked = "keyword"), L(c ? tf : B, tz)) : "{" == t3 ? L(H("}"), tR, E) : void 0;
      }
      function tR(t3, e3) {
        return "async" == t3 || "variable" == t3 && ("static" == e3 || "get" == e3 || "set" == e3 || c && A(e3)) && C.stream.match(/^\s+#?[\w$\xa1-\uffff]/, false) ? (C.marked = "keyword", L(tR)) : "variable" == t3 || "keyword" == C.style ? (C.marked = "property", L(tB, tR)) : "number" == t3 || "string" == t3 ? L(tB, tR) : "[" == t3 ? L(B, tl, P("]"), tB, tR) : "*" == e3 ? (C.marked = "keyword", L(tR)) : c && "(" == t3 ? k(tW, tR) : ";" == t3 || "," == t3 ? L(tR) : "}" == t3 ? L() : "@" == e3 ? L(B, tR) : void 0;
      }
      function tB(t3, e3) {
        if ("!" == e3 || "?" == e3) return L(tB);
        if (":" == t3) return L(tf, tS);
        if ("=" == e3) return L(V);
        var r3 = C.state.lexical.prev;
        return k(r3 && "interface" == r3.info ? tW : tD);
      }
      function tV(t3, e3) {
        return "*" == e3 ? (C.marked = "keyword", L(tK, P(";"))) : "default" == e3 ? (C.marked = "keyword", L(B, P(";"))) : "{" == t3 ? L(ti(tG, "}"), tK, P(";")) : k(z);
      }
      function tG(t3, e3) {
        return "as" == e3 ? (C.marked = "keyword", L(P("variable"))) : "variable" == t3 ? k(V, tG) : void 0;
      }
      function tU(t3) {
        return "string" == t3 ? L() : "(" == t3 ? k(B) : "." == t3 ? k(q) : k(tj, tq, tK);
      }
      function tj(t3, e3) {
        return "{" == t3 ? to(tj, "}") : ("variable" == t3 && T(e3), "*" == e3 && (C.marked = "keyword"), L(t_));
      }
      function tq(t3) {
        if ("," == t3) return L(tj, tq);
      }
      function t_(t3, e3) {
        if ("as" == e3) return C.marked = "keyword", L(tj);
      }
      function tK(t3, e3) {
        if ("from" == e3) return C.marked = "keyword", L(B);
      }
      function tX(t3) {
        return "]" == t3 ? L() : k(ti(V, "]"));
      }
      function t$() {
        return k(H("form"), tC, P("{"), H("}"), ti(tY, "}"), E, E);
      }
      function tY() {
        return k(tC, tS);
      }
      function tZ(t3, e3, r3) {
        return e3.tokenize == v && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(e3.lastType) || "quasi" == e3.lastType && /\{\s*$/.test(t3.string.slice(0, t3.pos - (r3 || 0)));
      }
      return D.lex = W.lex = true, F.lex = true, E.lex = true, { startState: function(t3) {
        var r3 = { tokenize: v, lastType: "sof", cc: [], lexical: new x((t3 || 0) - o, 0, "block", false), localVars: e2.localVars, context: e2.localVars && new N(null, null, false), indented: t3 || 0 };
        return e2.globalVars && "object" == typeof e2.globalVars && (r3.globalVars = e2.globalVars), r3;
      }, token: function(t3, e3) {
        if (t3.sol() && (e3.lexical.hasOwnProperty("align") || (e3.lexical.align = false), e3.indented = t3.indentation(), b(t3, e3)), e3.tokenize != m && t3.eatSpace()) return null;
        var n2 = e3.tokenize(t3, e3);
        return "comment" == r2 ? n2 : (e3.lastType = "operator" == r2 && ("++" == i || "--" == i) ? "incdec" : r2, M(e3, n2, r2, i, t3));
      }, indent: function(t3, r3) {
        if (t3.tokenize == m || t3.tokenize == y) return n.Pass;
        if (t3.tokenize != v) return 0;
        var i2, l2 = r3 && r3.charAt(0), s2 = t3.lexical;
        if (!/^\s*else\b/.test(r3)) for (var u2 = t3.cc.length - 1; u2 >= 0; --u2) {
          var c2 = t3.cc[u2];
          if (c2 == E) s2 = s2.prev;
          else if (c2 != tA && c2 != F) break;
        }
        for (; ("stat" == s2.type || "form" == s2.type) && ("}" == l2 || (i2 = t3.cc[t3.cc.length - 1]) && (i2 == q || i2 == _) && !/^[,\.=+\-*:?[\(]/.test(r3)); ) s2 = s2.prev;
        a && ")" == s2.type && "stat" == s2.prev.type && (s2 = s2.prev);
        var f2 = s2.type, h2 = l2 == f2;
        if ("vardef" == f2) return s2.indented + ("operator" == t3.lastType || "," == t3.lastType ? s2.info.length + 1 : 0);
        if ("form" == f2 && "{" == l2) return s2.indented;
        if ("form" == f2) return s2.indented + o;
        if ("stat" == f2) return s2.indented + ("operator" == t3.lastType || "," == t3.lastType || d.test(r3.charAt(0)) || /[,.]/.test(r3.charAt(0)) ? a || o : 0);
        if ("switch" == s2.info && !h2 && false != e2.doubleIndentSwitch) return s2.indented + (/^(?:case|default)\b/.test(r3) ? o : 2 * o);
        else if (s2.align) return s2.column + (h2 ? 0 : 1);
        else return s2.indented + (h2 ? 0 : o);
      }, electricInput: /^\s*(?:case .*?:|default:|\{|\})$/, blockCommentStart: s ? null : "/*", blockCommentEnd: s ? null : "*/", blockCommentContinue: s ? null : " * ", lineComment: s ? null : "//", fold: "brace", closeBrackets: "()[]{}''\"\"``", helperType: s ? "json" : "javascript", jsonldMode: l, jsonMode: s, expressionAllowed: tZ, skipExpression: function(t3) {
        M(t3, "atom", "atom", "true", new n.StringStream("", 2, null));
      } };
    }), n.registerHelper("wordChars", "javascript", /[\w$]/), n.defineMIME("text/javascript", "javascript"), n.defineMIME("text/ecmascript", "javascript"), n.defineMIME("application/javascript", "javascript"), n.defineMIME("application/x-javascript", "javascript"), n.defineMIME("application/ecmascript", "javascript"), n.defineMIME("application/json", { name: "javascript", json: true }), n.defineMIME("application/x-json", { name: "javascript", json: true }), n.defineMIME("application/manifest+json", { name: "javascript", json: true }), n.defineMIME("application/ld+json", { name: "javascript", jsonld: true }), n.defineMIME("text/typescript", { name: "javascript", typescript: true }), n.defineMIME("application/typescript", { name: "javascript", typescript: true });
  }, 4606: function(t, e) {
    var r;
    r = function(t2) {
      t2.version = "1.2.2";
      var e2 = function() {
        for (var t3 = 0, e3 = Array(256), r3 = 0; 256 != r3; ++r3) t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = 1 & (t3 = r3) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1) ? -306674912 ^ t3 >>> 1 : t3 >>> 1, e3[r3] = t3;
        return "undefined" != typeof Int32Array ? new Int32Array(e3) : e3;
      }(), r2 = function(t3) {
        var e3 = 0, r3 = 0, n2 = 0, i2 = "undefined" != typeof Int32Array ? new Int32Array(4096) : Array(4096);
        for (n2 = 0; 256 != n2; ++n2) i2[n2] = t3[n2];
        for (n2 = 0; 256 != n2; ++n2) for (r3 = t3[n2], e3 = 256 + n2; e3 < 4096; e3 += 256) r3 = i2[e3] = r3 >>> 8 ^ t3[255 & r3];
        var o2 = [];
        for (n2 = 1; 16 != n2; ++n2) o2[n2 - 1] = "undefined" != typeof Int32Array ? i2.subarray(256 * n2, 256 * n2 + 256) : i2.slice(256 * n2, 256 * n2 + 256);
        return o2;
      }(e2), n = r2[0], i = r2[1], o = r2[2], a = r2[3], l = r2[4], s = r2[5], u = r2[6], c = r2[7], f = r2[8], h = r2[9], d = r2[10], p = r2[11], g = r2[12], v = r2[13], m = r2[14];
      t2.table = e2, t2.bstr = function(t3, r3) {
        for (var n2 = -1 ^ r3, i2 = 0, o2 = t3.length; i2 < o2; ) n2 = n2 >>> 8 ^ e2[(n2 ^ t3.charCodeAt(i2++)) & 255];
        return ~n2;
      }, t2.buf = function(t3, r3) {
        for (var y = -1 ^ r3, b = t3.length - 15, w = 0; w < b; ) y = m[t3[w++] ^ 255 & y] ^ v[t3[w++] ^ y >> 8 & 255] ^ g[t3[w++] ^ y >> 16 & 255] ^ p[t3[w++] ^ y >>> 24] ^ d[t3[w++]] ^ h[t3[w++]] ^ f[t3[w++]] ^ c[t3[w++]] ^ u[t3[w++]] ^ s[t3[w++]] ^ l[t3[w++]] ^ a[t3[w++]] ^ o[t3[w++]] ^ i[t3[w++]] ^ n[t3[w++]] ^ e2[t3[w++]];
        for (b += 15; w < b; ) y = y >>> 8 ^ e2[(y ^ t3[w++]) & 255];
        return ~y;
      }, t2.str = function(t3, r3) {
        for (var n2 = -1 ^ r3, i2 = 0, o2 = t3.length, a2 = 0, l2 = 0; i2 < o2; ) (a2 = t3.charCodeAt(i2++)) < 128 ? n2 = n2 >>> 8 ^ e2[(n2 ^ a2) & 255] : a2 < 2048 ? n2 = (n2 = n2 >>> 8 ^ e2[(n2 ^ (192 | a2 >> 6 & 31)) & 255]) >>> 8 ^ e2[(n2 ^ (128 | 63 & a2)) & 255] : a2 >= 55296 && a2 < 57344 ? (a2 = (1023 & a2) + 64, l2 = 1023 & t3.charCodeAt(i2++), n2 = (n2 = (n2 = (n2 = n2 >>> 8 ^ e2[(n2 ^ (240 | a2 >> 8 & 7)) & 255]) >>> 8 ^ e2[(n2 ^ (128 | a2 >> 2 & 63)) & 255]) >>> 8 ^ e2[(n2 ^ (128 | l2 >> 6 & 15 | (3 & a2) << 4)) & 255]) >>> 8 ^ e2[(n2 ^ (128 | 63 & l2)) & 255]) : n2 = (n2 = (n2 = n2 >>> 8 ^ e2[(n2 ^ (224 | a2 >> 12 & 15)) & 255]) >>> 8 ^ e2[(n2 ^ (128 | a2 >> 6 & 63)) & 255]) >>> 8 ^ e2[(n2 ^ (128 | 63 & a2)) & 255];
        return ~n2;
      };
    }, "undefined" == typeof DO_NOT_EXPORT_CRC ? r(e) : r({});
  }, 5600: function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, { add: () => A, adjoint: () => d, clone: () => a, copy: () => l, create: () => i, determinant: () => p, equals: () => W, exactEquals: () => D, frob: () => T, fromMat2d: () => M, fromMat4: () => o, fromQuat: () => C, fromRotation: () => w, fromScaling: () => x, fromTranslation: () => b, fromValues: () => s, identity: () => c, invert: () => h, mul: () => F, multiply: () => g, multiplyScalar: () => O, multiplyScalarAndAdd: () => I, normalFromMat4: () => k, projection: () => L, rotate: () => m, scale: () => y, set: () => u, str: () => S, sub: () => H, subtract: () => N, translate: () => v, transpose: () => f });
    var n = r(9685);
    function i() {
      var t2 = new n.WT(9);
      return n.WT != Float32Array && (t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[5] = 0, t2[6] = 0, t2[7] = 0), t2[0] = 1, t2[4] = 1, t2[8] = 1, t2;
    }
    function o(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[4], t2[4] = e2[5], t2[5] = e2[6], t2[6] = e2[8], t2[7] = e2[9], t2[8] = e2[10], t2;
    }
    function a(t2) {
      var e2 = new n.WT(9);
      return e2[0] = t2[0], e2[1] = t2[1], e2[2] = t2[2], e2[3] = t2[3], e2[4] = t2[4], e2[5] = t2[5], e2[6] = t2[6], e2[7] = t2[7], e2[8] = t2[8], e2;
    }
    function l(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[3], t2[4] = e2[4], t2[5] = e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[8] = e2[8], t2;
    }
    function s(t2, e2, r2, i2, o2, a2, l2, s2, u2) {
      var c2 = new n.WT(9);
      return c2[0] = t2, c2[1] = e2, c2[2] = r2, c2[3] = i2, c2[4] = o2, c2[5] = a2, c2[6] = l2, c2[7] = s2, c2[8] = u2, c2;
    }
    function u(t2, e2, r2, n2, i2, o2, a2, l2, s2, u2) {
      return t2[0] = e2, t2[1] = r2, t2[2] = n2, t2[3] = i2, t2[4] = o2, t2[5] = a2, t2[6] = l2, t2[7] = s2, t2[8] = u2, t2;
    }
    function c(t2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 1, t2[5] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 1, t2;
    }
    function f(t2, e2) {
      if (t2 === e2) {
        var r2 = e2[1], n2 = e2[2], i2 = e2[5];
        t2[1] = e2[3], t2[2] = e2[6], t2[3] = r2, t2[5] = e2[7], t2[6] = n2, t2[7] = i2;
      } else t2[0] = e2[0], t2[1] = e2[3], t2[2] = e2[6], t2[3] = e2[1], t2[4] = e2[4], t2[5] = e2[7], t2[6] = e2[2], t2[7] = e2[5], t2[8] = e2[8];
      return t2;
    }
    function h(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = e2[4], l2 = e2[5], s2 = e2[6], u2 = e2[7], c2 = e2[8], f2 = c2 * a2 - l2 * u2, h2 = -c2 * o2 + l2 * s2, d2 = u2 * o2 - a2 * s2, p2 = r2 * f2 + n2 * h2 + i2 * d2;
      return p2 ? (p2 = 1 / p2, t2[0] = f2 * p2, t2[1] = (-c2 * n2 + i2 * u2) * p2, t2[2] = (l2 * n2 - i2 * a2) * p2, t2[3] = h2 * p2, t2[4] = (c2 * r2 - i2 * s2) * p2, t2[5] = (-l2 * r2 + i2 * o2) * p2, t2[6] = d2 * p2, t2[7] = (-u2 * r2 + n2 * s2) * p2, t2[8] = (a2 * r2 - n2 * o2) * p2, t2) : null;
    }
    function d(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = e2[4], l2 = e2[5], s2 = e2[6], u2 = e2[7], c2 = e2[8];
      return t2[0] = a2 * c2 - l2 * u2, t2[1] = i2 * u2 - n2 * c2, t2[2] = n2 * l2 - i2 * a2, t2[3] = l2 * s2 - o2 * c2, t2[4] = r2 * c2 - i2 * s2, t2[5] = i2 * o2 - r2 * l2, t2[6] = o2 * u2 - a2 * s2, t2[7] = n2 * s2 - r2 * u2, t2[8] = r2 * a2 - n2 * o2, t2;
    }
    function p(t2) {
      var e2 = t2[0], r2 = t2[1], n2 = t2[2], i2 = t2[3], o2 = t2[4], a2 = t2[5], l2 = t2[6], s2 = t2[7], u2 = t2[8];
      return e2 * (u2 * o2 - a2 * s2) + r2 * (-u2 * i2 + a2 * l2) + n2 * (s2 * i2 - o2 * l2);
    }
    function g(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = e2[3], l2 = e2[4], s2 = e2[5], u2 = e2[6], c2 = e2[7], f2 = e2[8], h2 = r2[0], d2 = r2[1], p2 = r2[2], g2 = r2[3], v2 = r2[4], m2 = r2[5], y2 = r2[6], b2 = r2[7], w2 = r2[8];
      return t2[0] = h2 * n2 + d2 * a2 + p2 * u2, t2[1] = h2 * i2 + d2 * l2 + p2 * c2, t2[2] = h2 * o2 + d2 * s2 + p2 * f2, t2[3] = g2 * n2 + v2 * a2 + m2 * u2, t2[4] = g2 * i2 + v2 * l2 + m2 * c2, t2[5] = g2 * o2 + v2 * s2 + m2 * f2, t2[6] = y2 * n2 + b2 * a2 + w2 * u2, t2[7] = y2 * i2 + b2 * l2 + w2 * c2, t2[8] = y2 * o2 + b2 * s2 + w2 * f2, t2;
    }
    function v(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = e2[3], l2 = e2[4], s2 = e2[5], u2 = e2[6], c2 = e2[7], f2 = e2[8], h2 = r2[0], d2 = r2[1];
      return t2[0] = n2, t2[1] = i2, t2[2] = o2, t2[3] = a2, t2[4] = l2, t2[5] = s2, t2[6] = h2 * n2 + d2 * a2 + u2, t2[7] = h2 * i2 + d2 * l2 + c2, t2[8] = h2 * o2 + d2 * s2 + f2, t2;
    }
    function m(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = e2[3], l2 = e2[4], s2 = e2[5], u2 = e2[6], c2 = e2[7], f2 = e2[8], h2 = Math.sin(r2), d2 = Math.cos(r2);
      return t2[0] = d2 * n2 + h2 * a2, t2[1] = d2 * i2 + h2 * l2, t2[2] = d2 * o2 + h2 * s2, t2[3] = d2 * a2 - h2 * n2, t2[4] = d2 * l2 - h2 * i2, t2[5] = d2 * s2 - h2 * o2, t2[6] = u2, t2[7] = c2, t2[8] = f2, t2;
    }
    function y(t2, e2, r2) {
      var n2 = r2[0], i2 = r2[1];
      return t2[0] = n2 * e2[0], t2[1] = n2 * e2[1], t2[2] = n2 * e2[2], t2[3] = i2 * e2[3], t2[4] = i2 * e2[4], t2[5] = i2 * e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[8] = e2[8], t2;
    }
    function b(t2, e2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 1, t2[5] = 0, t2[6] = e2[0], t2[7] = e2[1], t2[8] = 1, t2;
    }
    function w(t2, e2) {
      var r2 = Math.sin(e2), n2 = Math.cos(e2);
      return t2[0] = n2, t2[1] = r2, t2[2] = 0, t2[3] = -r2, t2[4] = n2, t2[5] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 1, t2;
    }
    function x(t2, e2) {
      return t2[0] = e2[0], t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = e2[1], t2[5] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 1, t2;
    }
    function M(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = 0, t2[3] = e2[2], t2[4] = e2[3], t2[5] = 0, t2[6] = e2[4], t2[7] = e2[5], t2[8] = 1, t2;
    }
    function C(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = r2 + r2, l2 = n2 + n2, s2 = i2 + i2, u2 = r2 * a2, c2 = n2 * a2, f2 = n2 * l2, h2 = i2 * a2, d2 = i2 * l2, p2 = i2 * s2, g2 = o2 * a2, v2 = o2 * l2, m2 = o2 * s2;
      return t2[0] = 1 - f2 - p2, t2[3] = c2 - m2, t2[6] = h2 + v2, t2[1] = c2 + m2, t2[4] = 1 - u2 - p2, t2[7] = d2 - g2, t2[2] = h2 - v2, t2[5] = d2 + g2, t2[8] = 1 - u2 - f2, t2;
    }
    function k(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = e2[4], l2 = e2[5], s2 = e2[6], u2 = e2[7], c2 = e2[8], f2 = e2[9], h2 = e2[10], d2 = e2[11], p2 = e2[12], g2 = e2[13], v2 = e2[14], m2 = e2[15], y2 = r2 * l2 - n2 * a2, b2 = r2 * s2 - i2 * a2, w2 = r2 * u2 - o2 * a2, x2 = n2 * s2 - i2 * l2, M2 = n2 * u2 - o2 * l2, C2 = i2 * u2 - o2 * s2, k2 = c2 * g2 - f2 * p2, L2 = c2 * v2 - h2 * p2, S2 = c2 * m2 - d2 * p2, T2 = f2 * v2 - h2 * g2, A2 = f2 * m2 - d2 * g2, N2 = h2 * m2 - d2 * v2, O2 = y2 * N2 - b2 * A2 + w2 * T2 + x2 * S2 - M2 * L2 + C2 * k2;
      return O2 ? (O2 = 1 / O2, t2[0] = (l2 * N2 - s2 * A2 + u2 * T2) * O2, t2[1] = (s2 * S2 - a2 * N2 - u2 * L2) * O2, t2[2] = (a2 * A2 - l2 * S2 + u2 * k2) * O2, t2[3] = (i2 * A2 - n2 * N2 - o2 * T2) * O2, t2[4] = (r2 * N2 - i2 * S2 + o2 * L2) * O2, t2[5] = (n2 * S2 - r2 * A2 - o2 * k2) * O2, t2[6] = (g2 * C2 - v2 * M2 + m2 * x2) * O2, t2[7] = (v2 * w2 - p2 * C2 - m2 * b2) * O2, t2[8] = (p2 * M2 - g2 * w2 + m2 * y2) * O2, t2) : null;
    }
    function L(t2, e2, r2) {
      return t2[0] = 2 / e2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = -2 / r2, t2[5] = 0, t2[6] = -1, t2[7] = 1, t2[8] = 1, t2;
    }
    function S(t2) {
      return "mat3(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ", " + t2[3] + ", " + t2[4] + ", " + t2[5] + ", " + t2[6] + ", " + t2[7] + ", " + t2[8] + ")";
    }
    function T(t2) {
      return Math.hypot(t2[0], t2[1], t2[2], t2[3], t2[4], t2[5], t2[6], t2[7], t2[8]);
    }
    function A(t2, e2, r2) {
      return t2[0] = e2[0] + r2[0], t2[1] = e2[1] + r2[1], t2[2] = e2[2] + r2[2], t2[3] = e2[3] + r2[3], t2[4] = e2[4] + r2[4], t2[5] = e2[5] + r2[5], t2[6] = e2[6] + r2[6], t2[7] = e2[7] + r2[7], t2[8] = e2[8] + r2[8], t2;
    }
    function N(t2, e2, r2) {
      return t2[0] = e2[0] - r2[0], t2[1] = e2[1] - r2[1], t2[2] = e2[2] - r2[2], t2[3] = e2[3] - r2[3], t2[4] = e2[4] - r2[4], t2[5] = e2[5] - r2[5], t2[6] = e2[6] - r2[6], t2[7] = e2[7] - r2[7], t2[8] = e2[8] - r2[8], t2;
    }
    function O(t2, e2, r2) {
      return t2[0] = e2[0] * r2, t2[1] = e2[1] * r2, t2[2] = e2[2] * r2, t2[3] = e2[3] * r2, t2[4] = e2[4] * r2, t2[5] = e2[5] * r2, t2[6] = e2[6] * r2, t2[7] = e2[7] * r2, t2[8] = e2[8] * r2, t2;
    }
    function I(t2, e2, r2, n2) {
      return t2[0] = e2[0] + r2[0] * n2, t2[1] = e2[1] + r2[1] * n2, t2[2] = e2[2] + r2[2] * n2, t2[3] = e2[3] + r2[3] * n2, t2[4] = e2[4] + r2[4] * n2, t2[5] = e2[5] + r2[5] * n2, t2[6] = e2[6] + r2[6] * n2, t2[7] = e2[7] + r2[7] * n2, t2[8] = e2[8] + r2[8] * n2, t2;
    }
    function D(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1] && t2[2] === e2[2] && t2[3] === e2[3] && t2[4] === e2[4] && t2[5] === e2[5] && t2[6] === e2[6] && t2[7] === e2[7] && t2[8] === e2[8];
    }
    function W(t2, e2) {
      var r2 = t2[0], i2 = t2[1], o2 = t2[2], a2 = t2[3], l2 = t2[4], s2 = t2[5], u2 = t2[6], c2 = t2[7], f2 = t2[8], h2 = e2[0], d2 = e2[1], p2 = e2[2], g2 = e2[3], v2 = e2[4], m2 = e2[5], y2 = e2[6], b2 = e2[7], w2 = e2[8];
      return Math.abs(r2 - h2) <= n.Ib * Math.max(1, Math.abs(r2), Math.abs(h2)) && Math.abs(i2 - d2) <= n.Ib * Math.max(1, Math.abs(i2), Math.abs(d2)) && Math.abs(o2 - p2) <= n.Ib * Math.max(1, Math.abs(o2), Math.abs(p2)) && Math.abs(a2 - g2) <= n.Ib * Math.max(1, Math.abs(a2), Math.abs(g2)) && Math.abs(l2 - v2) <= n.Ib * Math.max(1, Math.abs(l2), Math.abs(v2)) && Math.abs(s2 - m2) <= n.Ib * Math.max(1, Math.abs(s2), Math.abs(m2)) && Math.abs(u2 - y2) <= n.Ib * Math.max(1, Math.abs(u2), Math.abs(y2)) && Math.abs(c2 - b2) <= n.Ib * Math.max(1, Math.abs(c2), Math.abs(b2)) && Math.abs(f2 - w2) <= n.Ib * Math.max(1, Math.abs(f2), Math.abs(w2));
    }
    var F = g, H = N;
  }, 5975: function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, { add: () => U, adjoint: () => h, clone: () => o, copy: () => a, create: () => i, determinant: () => d, equals: () => X, exactEquals: () => K, frob: () => G, fromQuat: () => F, fromQuat2: () => A, fromRotation: () => C, fromRotationTranslation: () => T, fromRotationTranslationScale: () => D, fromRotationTranslationScaleOrigin: () => W, fromScaling: () => M, fromTranslation: () => x, fromValues: () => l, fromXRotation: () => k, fromYRotation: () => L, fromZRotation: () => S, frustum: () => H, getRotation: () => I, getScaling: () => O, getTranslation: () => N, identity: () => u, invert: () => f, lookAt: () => R, mul: () => $, multiply: () => p, multiplyScalar: () => q, multiplyScalarAndAdd: () => _, ortho: () => z, perspective: () => E, perspectiveFromFieldOfView: () => P, rotate: () => m, rotateX: () => y, rotateY: () => b, rotateZ: () => w, scale: () => v, set: () => s, str: () => V, sub: () => Y, subtract: () => j, targetTo: () => B, translate: () => g, transpose: () => c });
    var n = r(9685);
    function i() {
      var t2 = new n.WT(16);
      return n.WT != Float32Array && (t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0), t2[0] = 1, t2[5] = 1, t2[10] = 1, t2[15] = 1, t2;
    }
    function o(t2) {
      var e2 = new n.WT(16);
      return e2[0] = t2[0], e2[1] = t2[1], e2[2] = t2[2], e2[3] = t2[3], e2[4] = t2[4], e2[5] = t2[5], e2[6] = t2[6], e2[7] = t2[7], e2[8] = t2[8], e2[9] = t2[9], e2[10] = t2[10], e2[11] = t2[11], e2[12] = t2[12], e2[13] = t2[13], e2[14] = t2[14], e2[15] = t2[15], e2;
    }
    function a(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[3], t2[4] = e2[4], t2[5] = e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[8] = e2[8], t2[9] = e2[9], t2[10] = e2[10], t2[11] = e2[11], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15], t2;
    }
    function l(t2, e2, r2, i2, o2, a2, l2, s2, u2, c2, f2, h2, d2, p2, g2, v2) {
      var m2 = new n.WT(16);
      return m2[0] = t2, m2[1] = e2, m2[2] = r2, m2[3] = i2, m2[4] = o2, m2[5] = a2, m2[6] = l2, m2[7] = s2, m2[8] = u2, m2[9] = c2, m2[10] = f2, m2[11] = h2, m2[12] = d2, m2[13] = p2, m2[14] = g2, m2[15] = v2, m2;
    }
    function s(t2, e2, r2, n2, i2, o2, a2, l2, s2, u2, c2, f2, h2, d2, p2, g2, v2) {
      return t2[0] = e2, t2[1] = r2, t2[2] = n2, t2[3] = i2, t2[4] = o2, t2[5] = a2, t2[6] = l2, t2[7] = s2, t2[8] = u2, t2[9] = c2, t2[10] = f2, t2[11] = h2, t2[12] = d2, t2[13] = p2, t2[14] = g2, t2[15] = v2, t2;
    }
    function u(t2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = 1, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 1, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function c(t2, e2) {
      if (t2 === e2) {
        var r2 = e2[1], n2 = e2[2], i2 = e2[3], o2 = e2[6], a2 = e2[7], l2 = e2[11];
        t2[1] = e2[4], t2[2] = e2[8], t2[3] = e2[12], t2[4] = r2, t2[6] = e2[9], t2[7] = e2[13], t2[8] = n2, t2[9] = o2, t2[11] = e2[14], t2[12] = i2, t2[13] = a2, t2[14] = l2;
      } else t2[0] = e2[0], t2[1] = e2[4], t2[2] = e2[8], t2[3] = e2[12], t2[4] = e2[1], t2[5] = e2[5], t2[6] = e2[9], t2[7] = e2[13], t2[8] = e2[2], t2[9] = e2[6], t2[10] = e2[10], t2[11] = e2[14], t2[12] = e2[3], t2[13] = e2[7], t2[14] = e2[11], t2[15] = e2[15];
      return t2;
    }
    function f(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = e2[4], l2 = e2[5], s2 = e2[6], u2 = e2[7], c2 = e2[8], f2 = e2[9], h2 = e2[10], d2 = e2[11], p2 = e2[12], g2 = e2[13], v2 = e2[14], m2 = e2[15], y2 = r2 * l2 - n2 * a2, b2 = r2 * s2 - i2 * a2, w2 = r2 * u2 - o2 * a2, x2 = n2 * s2 - i2 * l2, M2 = n2 * u2 - o2 * l2, C2 = i2 * u2 - o2 * s2, k2 = c2 * g2 - f2 * p2, L2 = c2 * v2 - h2 * p2, S2 = c2 * m2 - d2 * p2, T2 = f2 * v2 - h2 * g2, A2 = f2 * m2 - d2 * g2, N2 = h2 * m2 - d2 * v2, O2 = y2 * N2 - b2 * A2 + w2 * T2 + x2 * S2 - M2 * L2 + C2 * k2;
      return O2 ? (O2 = 1 / O2, t2[0] = (l2 * N2 - s2 * A2 + u2 * T2) * O2, t2[1] = (i2 * A2 - n2 * N2 - o2 * T2) * O2, t2[2] = (g2 * C2 - v2 * M2 + m2 * x2) * O2, t2[3] = (h2 * M2 - f2 * C2 - d2 * x2) * O2, t2[4] = (s2 * S2 - a2 * N2 - u2 * L2) * O2, t2[5] = (r2 * N2 - i2 * S2 + o2 * L2) * O2, t2[6] = (v2 * w2 - p2 * C2 - m2 * b2) * O2, t2[7] = (c2 * C2 - h2 * w2 + d2 * b2) * O2, t2[8] = (a2 * A2 - l2 * S2 + u2 * k2) * O2, t2[9] = (n2 * S2 - r2 * A2 - o2 * k2) * O2, t2[10] = (p2 * M2 - g2 * w2 + m2 * y2) * O2, t2[11] = (f2 * w2 - c2 * M2 - d2 * y2) * O2, t2[12] = (l2 * L2 - a2 * T2 - s2 * k2) * O2, t2[13] = (r2 * T2 - n2 * L2 + i2 * k2) * O2, t2[14] = (g2 * b2 - p2 * x2 - v2 * y2) * O2, t2[15] = (c2 * x2 - f2 * b2 + h2 * y2) * O2, t2) : null;
    }
    function h(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = e2[4], l2 = e2[5], s2 = e2[6], u2 = e2[7], c2 = e2[8], f2 = e2[9], h2 = e2[10], d2 = e2[11], p2 = e2[12], g2 = e2[13], v2 = e2[14], m2 = e2[15];
      return t2[0] = l2 * (h2 * m2 - d2 * v2) - f2 * (s2 * m2 - u2 * v2) + g2 * (s2 * d2 - u2 * h2), t2[1] = -(n2 * (h2 * m2 - d2 * v2) - f2 * (i2 * m2 - o2 * v2) + g2 * (i2 * d2 - o2 * h2)), t2[2] = n2 * (s2 * m2 - u2 * v2) - l2 * (i2 * m2 - o2 * v2) + g2 * (i2 * u2 - o2 * s2), t2[3] = -(n2 * (s2 * d2 - u2 * h2) - l2 * (i2 * d2 - o2 * h2) + f2 * (i2 * u2 - o2 * s2)), t2[4] = -(a2 * (h2 * m2 - d2 * v2) - c2 * (s2 * m2 - u2 * v2) + p2 * (s2 * d2 - u2 * h2)), t2[5] = r2 * (h2 * m2 - d2 * v2) - c2 * (i2 * m2 - o2 * v2) + p2 * (i2 * d2 - o2 * h2), t2[6] = -(r2 * (s2 * m2 - u2 * v2) - a2 * (i2 * m2 - o2 * v2) + p2 * (i2 * u2 - o2 * s2)), t2[7] = r2 * (s2 * d2 - u2 * h2) - a2 * (i2 * d2 - o2 * h2) + c2 * (i2 * u2 - o2 * s2), t2[8] = a2 * (f2 * m2 - d2 * g2) - c2 * (l2 * m2 - u2 * g2) + p2 * (l2 * d2 - u2 * f2), t2[9] = -(r2 * (f2 * m2 - d2 * g2) - c2 * (n2 * m2 - o2 * g2) + p2 * (n2 * d2 - o2 * f2)), t2[10] = r2 * (l2 * m2 - u2 * g2) - a2 * (n2 * m2 - o2 * g2) + p2 * (n2 * u2 - o2 * l2), t2[11] = -(r2 * (l2 * d2 - u2 * f2) - a2 * (n2 * d2 - o2 * f2) + c2 * (n2 * u2 - o2 * l2)), t2[12] = -(a2 * (f2 * v2 - h2 * g2) - c2 * (l2 * v2 - s2 * g2) + p2 * (l2 * h2 - s2 * f2)), t2[13] = r2 * (f2 * v2 - h2 * g2) - c2 * (n2 * v2 - i2 * g2) + p2 * (n2 * h2 - i2 * f2), t2[14] = -(r2 * (l2 * v2 - s2 * g2) - a2 * (n2 * v2 - i2 * g2) + p2 * (n2 * s2 - i2 * l2)), t2[15] = r2 * (l2 * h2 - s2 * f2) - a2 * (n2 * h2 - i2 * f2) + c2 * (n2 * s2 - i2 * l2), t2;
    }
    function d(t2) {
      var e2 = t2[0], r2 = t2[1], n2 = t2[2], i2 = t2[3], o2 = t2[4], a2 = t2[5], l2 = t2[6], s2 = t2[7], u2 = t2[8], c2 = t2[9], f2 = t2[10], h2 = t2[11], d2 = t2[12], p2 = t2[13], g2 = t2[14], v2 = t2[15];
      return (e2 * a2 - r2 * o2) * (f2 * v2 - h2 * g2) - (e2 * l2 - n2 * o2) * (c2 * v2 - h2 * p2) + (e2 * s2 - i2 * o2) * (c2 * g2 - f2 * p2) + (r2 * l2 - n2 * a2) * (u2 * v2 - h2 * d2) - (r2 * s2 - i2 * a2) * (u2 * g2 - f2 * d2) + (n2 * s2 - i2 * l2) * (u2 * p2 - c2 * d2);
    }
    function p(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = e2[3], l2 = e2[4], s2 = e2[5], u2 = e2[6], c2 = e2[7], f2 = e2[8], h2 = e2[9], d2 = e2[10], p2 = e2[11], g2 = e2[12], v2 = e2[13], m2 = e2[14], y2 = e2[15], b2 = r2[0], w2 = r2[1], x2 = r2[2], M2 = r2[3];
      return t2[0] = b2 * n2 + w2 * l2 + x2 * f2 + M2 * g2, t2[1] = b2 * i2 + w2 * s2 + x2 * h2 + M2 * v2, t2[2] = b2 * o2 + w2 * u2 + x2 * d2 + M2 * m2, t2[3] = b2 * a2 + w2 * c2 + x2 * p2 + M2 * y2, b2 = r2[4], w2 = r2[5], x2 = r2[6], M2 = r2[7], t2[4] = b2 * n2 + w2 * l2 + x2 * f2 + M2 * g2, t2[5] = b2 * i2 + w2 * s2 + x2 * h2 + M2 * v2, t2[6] = b2 * o2 + w2 * u2 + x2 * d2 + M2 * m2, t2[7] = b2 * a2 + w2 * c2 + x2 * p2 + M2 * y2, b2 = r2[8], w2 = r2[9], x2 = r2[10], M2 = r2[11], t2[8] = b2 * n2 + w2 * l2 + x2 * f2 + M2 * g2, t2[9] = b2 * i2 + w2 * s2 + x2 * h2 + M2 * v2, t2[10] = b2 * o2 + w2 * u2 + x2 * d2 + M2 * m2, t2[11] = b2 * a2 + w2 * c2 + x2 * p2 + M2 * y2, b2 = r2[12], w2 = r2[13], x2 = r2[14], M2 = r2[15], t2[12] = b2 * n2 + w2 * l2 + x2 * f2 + M2 * g2, t2[13] = b2 * i2 + w2 * s2 + x2 * h2 + M2 * v2, t2[14] = b2 * o2 + w2 * u2 + x2 * d2 + M2 * m2, t2[15] = b2 * a2 + w2 * c2 + x2 * p2 + M2 * y2, t2;
    }
    function g(t2, e2, r2) {
      var n2, i2, o2, a2, l2, s2, u2, c2, f2, h2, d2, p2, g2 = r2[0], v2 = r2[1], m2 = r2[2];
      return e2 === t2 ? (t2[12] = e2[0] * g2 + e2[4] * v2 + e2[8] * m2 + e2[12], t2[13] = e2[1] * g2 + e2[5] * v2 + e2[9] * m2 + e2[13], t2[14] = e2[2] * g2 + e2[6] * v2 + e2[10] * m2 + e2[14], t2[15] = e2[3] * g2 + e2[7] * v2 + e2[11] * m2 + e2[15]) : (n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = e2[3], l2 = e2[4], s2 = e2[5], u2 = e2[6], c2 = e2[7], f2 = e2[8], h2 = e2[9], d2 = e2[10], p2 = e2[11], t2[0] = n2, t2[1] = i2, t2[2] = o2, t2[3] = a2, t2[4] = l2, t2[5] = s2, t2[6] = u2, t2[7] = c2, t2[8] = f2, t2[9] = h2, t2[10] = d2, t2[11] = p2, t2[12] = n2 * g2 + l2 * v2 + f2 * m2 + e2[12], t2[13] = i2 * g2 + s2 * v2 + h2 * m2 + e2[13], t2[14] = o2 * g2 + u2 * v2 + d2 * m2 + e2[14], t2[15] = a2 * g2 + c2 * v2 + p2 * m2 + e2[15]), t2;
    }
    function v(t2, e2, r2) {
      var n2 = r2[0], i2 = r2[1], o2 = r2[2];
      return t2[0] = e2[0] * n2, t2[1] = e2[1] * n2, t2[2] = e2[2] * n2, t2[3] = e2[3] * n2, t2[4] = e2[4] * i2, t2[5] = e2[5] * i2, t2[6] = e2[6] * i2, t2[7] = e2[7] * i2, t2[8] = e2[8] * o2, t2[9] = e2[9] * o2, t2[10] = e2[10] * o2, t2[11] = e2[11] * o2, t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15], t2;
    }
    function m(t2, e2, r2, i2) {
      var o2, a2, l2, s2, u2, c2, f2, h2, d2, p2, g2, v2, m2, y2, b2, w2, x2, M2, C2, k2, L2, S2, T2, A2, N2 = i2[0], O2 = i2[1], I2 = i2[2], D2 = Math.hypot(N2, O2, I2);
      return D2 < n.Ib ? null : (N2 *= D2 = 1 / D2, O2 *= D2, I2 *= D2, o2 = Math.sin(r2), l2 = 1 - (a2 = Math.cos(r2)), s2 = e2[0], u2 = e2[1], c2 = e2[2], f2 = e2[3], h2 = e2[4], d2 = e2[5], p2 = e2[6], g2 = e2[7], v2 = e2[8], m2 = e2[9], y2 = e2[10], b2 = e2[11], w2 = N2 * N2 * l2 + a2, x2 = O2 * N2 * l2 + I2 * o2, M2 = I2 * N2 * l2 - O2 * o2, C2 = N2 * O2 * l2 - I2 * o2, k2 = O2 * O2 * l2 + a2, L2 = I2 * O2 * l2 + N2 * o2, S2 = N2 * I2 * l2 + O2 * o2, T2 = O2 * I2 * l2 - N2 * o2, A2 = I2 * I2 * l2 + a2, t2[0] = s2 * w2 + h2 * x2 + v2 * M2, t2[1] = u2 * w2 + d2 * x2 + m2 * M2, t2[2] = c2 * w2 + p2 * x2 + y2 * M2, t2[3] = f2 * w2 + g2 * x2 + b2 * M2, t2[4] = s2 * C2 + h2 * k2 + v2 * L2, t2[5] = u2 * C2 + d2 * k2 + m2 * L2, t2[6] = c2 * C2 + p2 * k2 + y2 * L2, t2[7] = f2 * C2 + g2 * k2 + b2 * L2, t2[8] = s2 * S2 + h2 * T2 + v2 * A2, t2[9] = u2 * S2 + d2 * T2 + m2 * A2, t2[10] = c2 * S2 + p2 * T2 + y2 * A2, t2[11] = f2 * S2 + g2 * T2 + b2 * A2, e2 !== t2 && (t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2);
    }
    function y(t2, e2, r2) {
      var n2 = Math.sin(r2), i2 = Math.cos(r2), o2 = e2[4], a2 = e2[5], l2 = e2[6], s2 = e2[7], u2 = e2[8], c2 = e2[9], f2 = e2[10], h2 = e2[11];
      return e2 !== t2 && (t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2[3] = e2[3], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2[4] = o2 * i2 + u2 * n2, t2[5] = a2 * i2 + c2 * n2, t2[6] = l2 * i2 + f2 * n2, t2[7] = s2 * i2 + h2 * n2, t2[8] = u2 * i2 - o2 * n2, t2[9] = c2 * i2 - a2 * n2, t2[10] = f2 * i2 - l2 * n2, t2[11] = h2 * i2 - s2 * n2, t2;
    }
    function b(t2, e2, r2) {
      var n2 = Math.sin(r2), i2 = Math.cos(r2), o2 = e2[0], a2 = e2[1], l2 = e2[2], s2 = e2[3], u2 = e2[8], c2 = e2[9], f2 = e2[10], h2 = e2[11];
      return e2 !== t2 && (t2[4] = e2[4], t2[5] = e2[5], t2[6] = e2[6], t2[7] = e2[7], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2[0] = o2 * i2 - u2 * n2, t2[1] = a2 * i2 - c2 * n2, t2[2] = l2 * i2 - f2 * n2, t2[3] = s2 * i2 - h2 * n2, t2[8] = o2 * n2 + u2 * i2, t2[9] = a2 * n2 + c2 * i2, t2[10] = l2 * n2 + f2 * i2, t2[11] = s2 * n2 + h2 * i2, t2;
    }
    function w(t2, e2, r2) {
      var n2 = Math.sin(r2), i2 = Math.cos(r2), o2 = e2[0], a2 = e2[1], l2 = e2[2], s2 = e2[3], u2 = e2[4], c2 = e2[5], f2 = e2[6], h2 = e2[7];
      return e2 !== t2 && (t2[8] = e2[8], t2[9] = e2[9], t2[10] = e2[10], t2[11] = e2[11], t2[12] = e2[12], t2[13] = e2[13], t2[14] = e2[14], t2[15] = e2[15]), t2[0] = o2 * i2 + u2 * n2, t2[1] = a2 * i2 + c2 * n2, t2[2] = l2 * i2 + f2 * n2, t2[3] = s2 * i2 + h2 * n2, t2[4] = u2 * i2 - o2 * n2, t2[5] = c2 * i2 - a2 * n2, t2[6] = f2 * i2 - l2 * n2, t2[7] = h2 * i2 - s2 * n2, t2;
    }
    function x(t2, e2) {
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = 1, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 1, t2[11] = 0, t2[12] = e2[0], t2[13] = e2[1], t2[14] = e2[2], t2[15] = 1, t2;
    }
    function M(t2, e2) {
      return t2[0] = e2[0], t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = e2[1], t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = e2[2], t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function C(t2, e2, r2) {
      var i2, o2, a2, l2 = r2[0], s2 = r2[1], u2 = r2[2], c2 = Math.hypot(l2, s2, u2);
      return c2 < n.Ib ? null : (l2 *= c2 = 1 / c2, s2 *= c2, u2 *= c2, i2 = Math.sin(e2), a2 = 1 - (o2 = Math.cos(e2)), t2[0] = l2 * l2 * a2 + o2, t2[1] = s2 * l2 * a2 + u2 * i2, t2[2] = u2 * l2 * a2 - s2 * i2, t2[3] = 0, t2[4] = l2 * s2 * a2 - u2 * i2, t2[5] = s2 * s2 * a2 + o2, t2[6] = u2 * s2 * a2 + l2 * i2, t2[7] = 0, t2[8] = l2 * u2 * a2 + s2 * i2, t2[9] = s2 * u2 * a2 - l2 * i2, t2[10] = u2 * u2 * a2 + o2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2);
    }
    function k(t2, e2) {
      var r2 = Math.sin(e2), n2 = Math.cos(e2);
      return t2[0] = 1, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = n2, t2[6] = r2, t2[7] = 0, t2[8] = 0, t2[9] = -r2, t2[10] = n2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function L(t2, e2) {
      var r2 = Math.sin(e2), n2 = Math.cos(e2);
      return t2[0] = n2, t2[1] = 0, t2[2] = -r2, t2[3] = 0, t2[4] = 0, t2[5] = 1, t2[6] = 0, t2[7] = 0, t2[8] = r2, t2[9] = 0, t2[10] = n2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function S(t2, e2) {
      var r2 = Math.sin(e2), n2 = Math.cos(e2);
      return t2[0] = n2, t2[1] = r2, t2[2] = 0, t2[3] = 0, t2[4] = -r2, t2[5] = n2, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 1, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function T(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = e2[3], l2 = n2 + n2, s2 = i2 + i2, u2 = o2 + o2, c2 = n2 * l2, f2 = n2 * s2, h2 = n2 * u2, d2 = i2 * s2, p2 = i2 * u2, g2 = o2 * u2, v2 = a2 * l2, m2 = a2 * s2, y2 = a2 * u2;
      return t2[0] = 1 - (d2 + g2), t2[1] = f2 + y2, t2[2] = h2 - m2, t2[3] = 0, t2[4] = f2 - y2, t2[5] = 1 - (c2 + g2), t2[6] = p2 + v2, t2[7] = 0, t2[8] = h2 + m2, t2[9] = p2 - v2, t2[10] = 1 - (c2 + d2), t2[11] = 0, t2[12] = r2[0], t2[13] = r2[1], t2[14] = r2[2], t2[15] = 1, t2;
    }
    function A(t2, e2) {
      var r2 = new n.WT(3), i2 = -e2[0], o2 = -e2[1], a2 = -e2[2], l2 = e2[3], s2 = e2[4], u2 = e2[5], c2 = e2[6], f2 = e2[7], h2 = i2 * i2 + o2 * o2 + a2 * a2 + l2 * l2;
      return h2 > 0 ? (r2[0] = (s2 * l2 + f2 * i2 + u2 * a2 - c2 * o2) * 2 / h2, r2[1] = (u2 * l2 + f2 * o2 + c2 * i2 - s2 * a2) * 2 / h2, r2[2] = (c2 * l2 + f2 * a2 + s2 * o2 - u2 * i2) * 2 / h2) : (r2[0] = (s2 * l2 + f2 * i2 + u2 * a2 - c2 * o2) * 2, r2[1] = (u2 * l2 + f2 * o2 + c2 * i2 - s2 * a2) * 2, r2[2] = (c2 * l2 + f2 * a2 + s2 * o2 - u2 * i2) * 2), T(t2, e2, r2), t2;
    }
    function N(t2, e2) {
      return t2[0] = e2[12], t2[1] = e2[13], t2[2] = e2[14], t2;
    }
    function O(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[4], a2 = e2[5], l2 = e2[6], s2 = e2[8], u2 = e2[9], c2 = e2[10];
      return t2[0] = Math.hypot(r2, n2, i2), t2[1] = Math.hypot(o2, a2, l2), t2[2] = Math.hypot(s2, u2, c2), t2;
    }
    function I(t2, e2) {
      var r2 = new n.WT(3);
      O(r2, e2);
      var i2 = 1 / r2[0], o2 = 1 / r2[1], a2 = 1 / r2[2], l2 = e2[0] * i2, s2 = e2[1] * o2, u2 = e2[2] * a2, c2 = e2[4] * i2, f2 = e2[5] * o2, h2 = e2[6] * a2, d2 = e2[8] * i2, p2 = e2[9] * o2, g2 = e2[10] * a2, v2 = l2 + f2 + g2, m2 = 0;
      return v2 > 0 ? (m2 = 2 * Math.sqrt(v2 + 1), t2[3] = 0.25 * m2, t2[0] = (h2 - p2) / m2, t2[1] = (d2 - u2) / m2, t2[2] = (s2 - c2) / m2) : l2 > f2 && l2 > g2 ? (m2 = 2 * Math.sqrt(1 + l2 - f2 - g2), t2[3] = (h2 - p2) / m2, t2[0] = 0.25 * m2, t2[1] = (s2 + c2) / m2, t2[2] = (d2 + u2) / m2) : f2 > g2 ? (m2 = 2 * Math.sqrt(1 + f2 - l2 - g2), t2[3] = (d2 - u2) / m2, t2[0] = (s2 + c2) / m2, t2[1] = 0.25 * m2, t2[2] = (h2 + p2) / m2) : (m2 = 2 * Math.sqrt(1 + g2 - l2 - f2), t2[3] = (s2 - c2) / m2, t2[0] = (d2 + u2) / m2, t2[1] = (h2 + p2) / m2, t2[2] = 0.25 * m2), t2;
    }
    function D(t2, e2, r2, n2) {
      var i2 = e2[0], o2 = e2[1], a2 = e2[2], l2 = e2[3], s2 = i2 + i2, u2 = o2 + o2, c2 = a2 + a2, f2 = i2 * s2, h2 = i2 * u2, d2 = i2 * c2, p2 = o2 * u2, g2 = o2 * c2, v2 = a2 * c2, m2 = l2 * s2, y2 = l2 * u2, b2 = l2 * c2, w2 = n2[0], x2 = n2[1], M2 = n2[2];
      return t2[0] = (1 - (p2 + v2)) * w2, t2[1] = (h2 + b2) * w2, t2[2] = (d2 - y2) * w2, t2[3] = 0, t2[4] = (h2 - b2) * x2, t2[5] = (1 - (f2 + v2)) * x2, t2[6] = (g2 + m2) * x2, t2[7] = 0, t2[8] = (d2 + y2) * M2, t2[9] = (g2 - m2) * M2, t2[10] = (1 - (f2 + p2)) * M2, t2[11] = 0, t2[12] = r2[0], t2[13] = r2[1], t2[14] = r2[2], t2[15] = 1, t2;
    }
    function W(t2, e2, r2, n2, i2) {
      var o2 = e2[0], a2 = e2[1], l2 = e2[2], s2 = e2[3], u2 = o2 + o2, c2 = a2 + a2, f2 = l2 + l2, h2 = o2 * u2, d2 = o2 * c2, p2 = o2 * f2, g2 = a2 * c2, v2 = a2 * f2, m2 = l2 * f2, y2 = s2 * u2, b2 = s2 * c2, w2 = s2 * f2, x2 = n2[0], M2 = n2[1], C2 = n2[2], k2 = i2[0], L2 = i2[1], S2 = i2[2], T2 = (1 - (g2 + m2)) * x2, A2 = (d2 + w2) * x2, N2 = (p2 - b2) * x2, O2 = (d2 - w2) * M2, I2 = (1 - (h2 + m2)) * M2, D2 = (v2 + y2) * M2, W2 = (p2 + b2) * C2, F2 = (v2 - y2) * C2, H2 = (1 - (h2 + g2)) * C2;
      return t2[0] = T2, t2[1] = A2, t2[2] = N2, t2[3] = 0, t2[4] = O2, t2[5] = I2, t2[6] = D2, t2[7] = 0, t2[8] = W2, t2[9] = F2, t2[10] = H2, t2[11] = 0, t2[12] = r2[0] + k2 - (T2 * k2 + O2 * L2 + W2 * S2), t2[13] = r2[1] + L2 - (A2 * k2 + I2 * L2 + F2 * S2), t2[14] = r2[2] + S2 - (N2 * k2 + D2 * L2 + H2 * S2), t2[15] = 1, t2;
    }
    function F(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = e2[3], a2 = r2 + r2, l2 = n2 + n2, s2 = i2 + i2, u2 = r2 * a2, c2 = n2 * a2, f2 = n2 * l2, h2 = i2 * a2, d2 = i2 * l2, p2 = i2 * s2, g2 = o2 * a2, v2 = o2 * l2, m2 = o2 * s2;
      return t2[0] = 1 - f2 - p2, t2[1] = c2 + m2, t2[2] = h2 - v2, t2[3] = 0, t2[4] = c2 - m2, t2[5] = 1 - u2 - p2, t2[6] = d2 + g2, t2[7] = 0, t2[8] = h2 + v2, t2[9] = d2 - g2, t2[10] = 1 - u2 - f2, t2[11] = 0, t2[12] = 0, t2[13] = 0, t2[14] = 0, t2[15] = 1, t2;
    }
    function H(t2, e2, r2, n2, i2, o2, a2) {
      var l2 = 1 / (r2 - e2), s2 = 1 / (i2 - n2), u2 = 1 / (o2 - a2);
      return t2[0] = 2 * o2 * l2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = 2 * o2 * s2, t2[6] = 0, t2[7] = 0, t2[8] = (r2 + e2) * l2, t2[9] = (i2 + n2) * s2, t2[10] = (a2 + o2) * u2, t2[11] = -1, t2[12] = 0, t2[13] = 0, t2[14] = a2 * o2 * 2 * u2, t2[15] = 0, t2;
    }
    function E(t2, e2, r2, n2, i2) {
      var o2, a2 = 1 / Math.tan(e2 / 2);
      return t2[0] = a2 / r2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = a2, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[11] = -1, t2[12] = 0, t2[13] = 0, t2[15] = 0, null != i2 && i2 !== 1 / 0 ? (o2 = 1 / (n2 - i2), t2[10] = (i2 + n2) * o2, t2[14] = 2 * i2 * n2 * o2) : (t2[10] = -1, t2[14] = -2 * n2), t2;
    }
    function P(t2, e2, r2, n2) {
      var i2 = Math.tan(e2.upDegrees * Math.PI / 180), o2 = Math.tan(e2.downDegrees * Math.PI / 180), a2 = Math.tan(e2.leftDegrees * Math.PI / 180), l2 = Math.tan(e2.rightDegrees * Math.PI / 180), s2 = 2 / (a2 + l2), u2 = 2 / (i2 + o2);
      return t2[0] = s2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = u2, t2[6] = 0, t2[7] = 0, t2[8] = -((a2 - l2) * s2 * 0.5), t2[9] = (i2 - o2) * u2 * 0.5, t2[10] = n2 / (r2 - n2), t2[11] = -1, t2[12] = 0, t2[13] = 0, t2[14] = n2 * r2 / (r2 - n2), t2[15] = 0, t2;
    }
    function z(t2, e2, r2, n2, i2, o2, a2) {
      var l2 = 1 / (e2 - r2), s2 = 1 / (n2 - i2), u2 = 1 / (o2 - a2);
      return t2[0] = -2 * l2, t2[1] = 0, t2[2] = 0, t2[3] = 0, t2[4] = 0, t2[5] = -2 * s2, t2[6] = 0, t2[7] = 0, t2[8] = 0, t2[9] = 0, t2[10] = 2 * u2, t2[11] = 0, t2[12] = (e2 + r2) * l2, t2[13] = (i2 + n2) * s2, t2[14] = (a2 + o2) * u2, t2[15] = 1, t2;
    }
    function R(t2, e2, r2, i2) {
      var o2, a2, l2, s2, c2, f2, h2, d2, p2, g2, v2 = e2[0], m2 = e2[1], y2 = e2[2], b2 = i2[0], w2 = i2[1], x2 = i2[2], M2 = r2[0], C2 = r2[1], k2 = r2[2];
      return Math.abs(v2 - M2) < n.Ib && Math.abs(m2 - C2) < n.Ib && Math.abs(y2 - k2) < n.Ib ? u(t2) : (g2 = 1 / Math.hypot(h2 = v2 - M2, d2 = m2 - C2, p2 = y2 - k2), h2 *= g2, d2 *= g2, p2 *= g2, (g2 = Math.hypot(o2 = w2 * p2 - x2 * d2, a2 = x2 * h2 - b2 * p2, l2 = b2 * d2 - w2 * h2)) ? (o2 *= g2 = 1 / g2, a2 *= g2, l2 *= g2) : (o2 = 0, a2 = 0, l2 = 0), (g2 = Math.hypot(s2 = d2 * l2 - p2 * a2, c2 = p2 * o2 - h2 * l2, f2 = h2 * a2 - d2 * o2)) ? (s2 *= g2 = 1 / g2, c2 *= g2, f2 *= g2) : (s2 = 0, c2 = 0, f2 = 0), t2[0] = o2, t2[1] = s2, t2[2] = h2, t2[3] = 0, t2[4] = a2, t2[5] = c2, t2[6] = d2, t2[7] = 0, t2[8] = l2, t2[9] = f2, t2[10] = p2, t2[11] = 0, t2[12] = -(o2 * v2 + a2 * m2 + l2 * y2), t2[13] = -(s2 * v2 + c2 * m2 + f2 * y2), t2[14] = -(h2 * v2 + d2 * m2 + p2 * y2), t2[15] = 1, t2);
    }
    function B(t2, e2, r2, n2) {
      var i2 = e2[0], o2 = e2[1], a2 = e2[2], l2 = n2[0], s2 = n2[1], u2 = n2[2], c2 = i2 - r2[0], f2 = o2 - r2[1], h2 = a2 - r2[2], d2 = c2 * c2 + f2 * f2 + h2 * h2;
      d2 > 0 && (c2 *= d2 = 1 / Math.sqrt(d2), f2 *= d2, h2 *= d2);
      var p2 = s2 * h2 - u2 * f2, g2 = u2 * c2 - l2 * h2, v2 = l2 * f2 - s2 * c2;
      return (d2 = p2 * p2 + g2 * g2 + v2 * v2) > 0 && (p2 *= d2 = 1 / Math.sqrt(d2), g2 *= d2, v2 *= d2), t2[0] = p2, t2[1] = g2, t2[2] = v2, t2[3] = 0, t2[4] = f2 * v2 - h2 * g2, t2[5] = h2 * p2 - c2 * v2, t2[6] = c2 * g2 - f2 * p2, t2[7] = 0, t2[8] = c2, t2[9] = f2, t2[10] = h2, t2[11] = 0, t2[12] = i2, t2[13] = o2, t2[14] = a2, t2[15] = 1, t2;
    }
    function V(t2) {
      return "mat4(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ", " + t2[3] + ", " + t2[4] + ", " + t2[5] + ", " + t2[6] + ", " + t2[7] + ", " + t2[8] + ", " + t2[9] + ", " + t2[10] + ", " + t2[11] + ", " + t2[12] + ", " + t2[13] + ", " + t2[14] + ", " + t2[15] + ")";
    }
    function G(t2) {
      return Math.hypot(t2[0], t2[1], t2[3], t2[4], t2[5], t2[6], t2[7], t2[8], t2[9], t2[10], t2[11], t2[12], t2[13], t2[14], t2[15]);
    }
    function U(t2, e2, r2) {
      return t2[0] = e2[0] + r2[0], t2[1] = e2[1] + r2[1], t2[2] = e2[2] + r2[2], t2[3] = e2[3] + r2[3], t2[4] = e2[4] + r2[4], t2[5] = e2[5] + r2[5], t2[6] = e2[6] + r2[6], t2[7] = e2[7] + r2[7], t2[8] = e2[8] + r2[8], t2[9] = e2[9] + r2[9], t2[10] = e2[10] + r2[10], t2[11] = e2[11] + r2[11], t2[12] = e2[12] + r2[12], t2[13] = e2[13] + r2[13], t2[14] = e2[14] + r2[14], t2[15] = e2[15] + r2[15], t2;
    }
    function j(t2, e2, r2) {
      return t2[0] = e2[0] - r2[0], t2[1] = e2[1] - r2[1], t2[2] = e2[2] - r2[2], t2[3] = e2[3] - r2[3], t2[4] = e2[4] - r2[4], t2[5] = e2[5] - r2[5], t2[6] = e2[6] - r2[6], t2[7] = e2[7] - r2[7], t2[8] = e2[8] - r2[8], t2[9] = e2[9] - r2[9], t2[10] = e2[10] - r2[10], t2[11] = e2[11] - r2[11], t2[12] = e2[12] - r2[12], t2[13] = e2[13] - r2[13], t2[14] = e2[14] - r2[14], t2[15] = e2[15] - r2[15], t2;
    }
    function q(t2, e2, r2) {
      return t2[0] = e2[0] * r2, t2[1] = e2[1] * r2, t2[2] = e2[2] * r2, t2[3] = e2[3] * r2, t2[4] = e2[4] * r2, t2[5] = e2[5] * r2, t2[6] = e2[6] * r2, t2[7] = e2[7] * r2, t2[8] = e2[8] * r2, t2[9] = e2[9] * r2, t2[10] = e2[10] * r2, t2[11] = e2[11] * r2, t2[12] = e2[12] * r2, t2[13] = e2[13] * r2, t2[14] = e2[14] * r2, t2[15] = e2[15] * r2, t2;
    }
    function _(t2, e2, r2, n2) {
      return t2[0] = e2[0] + r2[0] * n2, t2[1] = e2[1] + r2[1] * n2, t2[2] = e2[2] + r2[2] * n2, t2[3] = e2[3] + r2[3] * n2, t2[4] = e2[4] + r2[4] * n2, t2[5] = e2[5] + r2[5] * n2, t2[6] = e2[6] + r2[6] * n2, t2[7] = e2[7] + r2[7] * n2, t2[8] = e2[8] + r2[8] * n2, t2[9] = e2[9] + r2[9] * n2, t2[10] = e2[10] + r2[10] * n2, t2[11] = e2[11] + r2[11] * n2, t2[12] = e2[12] + r2[12] * n2, t2[13] = e2[13] + r2[13] * n2, t2[14] = e2[14] + r2[14] * n2, t2[15] = e2[15] + r2[15] * n2, t2;
    }
    function K(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1] && t2[2] === e2[2] && t2[3] === e2[3] && t2[4] === e2[4] && t2[5] === e2[5] && t2[6] === e2[6] && t2[7] === e2[7] && t2[8] === e2[8] && t2[9] === e2[9] && t2[10] === e2[10] && t2[11] === e2[11] && t2[12] === e2[12] && t2[13] === e2[13] && t2[14] === e2[14] && t2[15] === e2[15];
    }
    function X(t2, e2) {
      var r2 = t2[0], i2 = t2[1], o2 = t2[2], a2 = t2[3], l2 = t2[4], s2 = t2[5], u2 = t2[6], c2 = t2[7], f2 = t2[8], h2 = t2[9], d2 = t2[10], p2 = t2[11], g2 = t2[12], v2 = t2[13], m2 = t2[14], y2 = t2[15], b2 = e2[0], w2 = e2[1], x2 = e2[2], M2 = e2[3], C2 = e2[4], k2 = e2[5], L2 = e2[6], S2 = e2[7], T2 = e2[8], A2 = e2[9], N2 = e2[10], O2 = e2[11], I2 = e2[12], D2 = e2[13], W2 = e2[14], F2 = e2[15];
      return Math.abs(r2 - b2) <= n.Ib * Math.max(1, Math.abs(r2), Math.abs(b2)) && Math.abs(i2 - w2) <= n.Ib * Math.max(1, Math.abs(i2), Math.abs(w2)) && Math.abs(o2 - x2) <= n.Ib * Math.max(1, Math.abs(o2), Math.abs(x2)) && Math.abs(a2 - M2) <= n.Ib * Math.max(1, Math.abs(a2), Math.abs(M2)) && Math.abs(l2 - C2) <= n.Ib * Math.max(1, Math.abs(l2), Math.abs(C2)) && Math.abs(s2 - k2) <= n.Ib * Math.max(1, Math.abs(s2), Math.abs(k2)) && Math.abs(u2 - L2) <= n.Ib * Math.max(1, Math.abs(u2), Math.abs(L2)) && Math.abs(c2 - S2) <= n.Ib * Math.max(1, Math.abs(c2), Math.abs(S2)) && Math.abs(f2 - T2) <= n.Ib * Math.max(1, Math.abs(f2), Math.abs(T2)) && Math.abs(h2 - A2) <= n.Ib * Math.max(1, Math.abs(h2), Math.abs(A2)) && Math.abs(d2 - N2) <= n.Ib * Math.max(1, Math.abs(d2), Math.abs(N2)) && Math.abs(p2 - O2) <= n.Ib * Math.max(1, Math.abs(p2), Math.abs(O2)) && Math.abs(g2 - I2) <= n.Ib * Math.max(1, Math.abs(g2), Math.abs(I2)) && Math.abs(v2 - D2) <= n.Ib * Math.max(1, Math.abs(v2), Math.abs(D2)) && Math.abs(m2 - W2) <= n.Ib * Math.max(1, Math.abs(m2), Math.abs(W2)) && Math.abs(y2 - F2) <= n.Ib * Math.max(1, Math.abs(y2), Math.abs(F2));
    }
    var $ = p, Y = j;
  }, 1437: function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, { add: () => c, angle: () => P, ceil: () => p, clone: () => a, copy: () => s, create: () => o, cross: () => N, dist: () => _, distance: () => x, div: () => q, divide: () => d, dot: () => A, equals: () => V, exactEquals: () => B, floor: () => g, forEach: () => $, fromValues: () => l, inverse: () => S, len: () => G, length: () => C, lerp: () => O, max: () => m, min: () => v, mul: () => j, multiply: () => h, negate: () => L, normalize: () => T, random: () => I, rotate: () => E, round: () => y, scale: () => b, scaleAndAdd: () => w, set: () => u, sqrDist: () => K, sqrLen: () => X, squaredDistance: () => M, squaredLength: () => k, str: () => R, sub: () => U, subtract: () => f, transformMat2: () => D, transformMat2d: () => W, transformMat3: () => F, transformMat4: () => H, zero: () => z });
    var n, i = r(9685);
    function o() {
      var t2 = new i.WT(2);
      return i.WT != Float32Array && (t2[0] = 0, t2[1] = 0), t2;
    }
    function a(t2) {
      var e2 = new i.WT(2);
      return e2[0] = t2[0], e2[1] = t2[1], e2;
    }
    function l(t2, e2) {
      var r2 = new i.WT(2);
      return r2[0] = t2, r2[1] = e2, r2;
    }
    function s(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2;
    }
    function u(t2, e2, r2) {
      return t2[0] = e2, t2[1] = r2, t2;
    }
    function c(t2, e2, r2) {
      return t2[0] = e2[0] + r2[0], t2[1] = e2[1] + r2[1], t2;
    }
    function f(t2, e2, r2) {
      return t2[0] = e2[0] - r2[0], t2[1] = e2[1] - r2[1], t2;
    }
    function h(t2, e2, r2) {
      return t2[0] = e2[0] * r2[0], t2[1] = e2[1] * r2[1], t2;
    }
    function d(t2, e2, r2) {
      return t2[0] = e2[0] / r2[0], t2[1] = e2[1] / r2[1], t2;
    }
    function p(t2, e2) {
      return t2[0] = Math.ceil(e2[0]), t2[1] = Math.ceil(e2[1]), t2;
    }
    function g(t2, e2) {
      return t2[0] = Math.floor(e2[0]), t2[1] = Math.floor(e2[1]), t2;
    }
    function v(t2, e2, r2) {
      return t2[0] = Math.min(e2[0], r2[0]), t2[1] = Math.min(e2[1], r2[1]), t2;
    }
    function m(t2, e2, r2) {
      return t2[0] = Math.max(e2[0], r2[0]), t2[1] = Math.max(e2[1], r2[1]), t2;
    }
    function y(t2, e2) {
      return t2[0] = Math.round(e2[0]), t2[1] = Math.round(e2[1]), t2;
    }
    function b(t2, e2, r2) {
      return t2[0] = e2[0] * r2, t2[1] = e2[1] * r2, t2;
    }
    function w(t2, e2, r2, n2) {
      return t2[0] = e2[0] + r2[0] * n2, t2[1] = e2[1] + r2[1] * n2, t2;
    }
    function x(t2, e2) {
      return Math.hypot(e2[0] - t2[0], e2[1] - t2[1]);
    }
    function M(t2, e2) {
      var r2 = e2[0] - t2[0], n2 = e2[1] - t2[1];
      return r2 * r2 + n2 * n2;
    }
    function C(t2) {
      return Math.hypot(t2[0], t2[1]);
    }
    function k(t2) {
      var e2 = t2[0], r2 = t2[1];
      return e2 * e2 + r2 * r2;
    }
    function L(t2, e2) {
      return t2[0] = -e2[0], t2[1] = -e2[1], t2;
    }
    function S(t2, e2) {
      return t2[0] = 1 / e2[0], t2[1] = 1 / e2[1], t2;
    }
    function T(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = r2 * r2 + n2 * n2;
      return i2 > 0 && (i2 = 1 / Math.sqrt(i2)), t2[0] = e2[0] * i2, t2[1] = e2[1] * i2, t2;
    }
    function A(t2, e2) {
      return t2[0] * e2[0] + t2[1] * e2[1];
    }
    function N(t2, e2, r2) {
      var n2 = e2[0] * r2[1] - e2[1] * r2[0];
      return t2[0] = t2[1] = 0, t2[2] = n2, t2;
    }
    function O(t2, e2, r2, n2) {
      var i2 = e2[0], o2 = e2[1];
      return t2[0] = i2 + n2 * (r2[0] - i2), t2[1] = o2 + n2 * (r2[1] - o2), t2;
    }
    function I(t2, e2) {
      e2 = e2 || 1;
      var r2 = 2 * i.FD() * Math.PI;
      return t2[0] = Math.cos(r2) * e2, t2[1] = Math.sin(r2) * e2, t2;
    }
    function D(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1];
      return t2[0] = r2[0] * n2 + r2[2] * i2, t2[1] = r2[1] * n2 + r2[3] * i2, t2;
    }
    function W(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1];
      return t2[0] = r2[0] * n2 + r2[2] * i2 + r2[4], t2[1] = r2[1] * n2 + r2[3] * i2 + r2[5], t2;
    }
    function F(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1];
      return t2[0] = r2[0] * n2 + r2[3] * i2 + r2[6], t2[1] = r2[1] * n2 + r2[4] * i2 + r2[7], t2;
    }
    function H(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1];
      return t2[0] = r2[0] * n2 + r2[4] * i2 + r2[12], t2[1] = r2[1] * n2 + r2[5] * i2 + r2[13], t2;
    }
    function E(t2, e2, r2, n2) {
      var i2 = e2[0] - r2[0], o2 = e2[1] - r2[1], a2 = Math.sin(n2), l2 = Math.cos(n2);
      return t2[0] = i2 * l2 - o2 * a2 + r2[0], t2[1] = i2 * a2 + o2 * l2 + r2[1], t2;
    }
    function P(t2, e2) {
      var r2 = t2[0], n2 = t2[1], i2 = e2[0], o2 = e2[1], a2 = r2 * r2 + n2 * n2;
      a2 > 0 && (a2 = 1 / Math.sqrt(a2));
      var l2 = i2 * i2 + o2 * o2;
      l2 > 0 && (l2 = 1 / Math.sqrt(l2));
      var s2 = (r2 * i2 + n2 * o2) * a2 * l2;
      return s2 > 1 ? 0 : s2 < -1 ? Math.PI : Math.acos(s2);
    }
    function z(t2) {
      return t2[0] = 0, t2[1] = 0, t2;
    }
    function R(t2) {
      return "vec2(" + t2[0] + ", " + t2[1] + ")";
    }
    function B(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1];
    }
    function V(t2, e2) {
      var r2 = t2[0], n2 = t2[1], o2 = e2[0], a2 = e2[1];
      return Math.abs(r2 - o2) <= i.Ib * Math.max(1, Math.abs(r2), Math.abs(o2)) && Math.abs(n2 - a2) <= i.Ib * Math.max(1, Math.abs(n2), Math.abs(a2));
    }
    var G = C, U = f, j = h, q = d, _ = x, K = M, X = k, $ = (n = o(), function(t2, e2, r2, i2, o2, a2) {
      var l2, s2;
      for (e2 || (e2 = 2), r2 || (r2 = 0), s2 = i2 ? Math.min(i2 * e2 + r2, t2.length) : t2.length, l2 = r2; l2 < s2; l2 += e2) n[0] = t2[l2], n[1] = t2[l2 + 1], o2(n, n, a2), t2[l2] = n[0], t2[l2 + 1] = n[1];
      return t2;
    });
  }, 7160: function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, { add: () => f, angle: () => B, bezier: () => D, ceil: () => g, clone: () => a, copy: () => u, create: () => o, cross: () => N, dist: () => X, distance: () => M, div: () => K, divide: () => p, dot: () => A, equals: () => j, exactEquals: () => U, floor: () => v, forEach: () => Q, fromValues: () => s, hermite: () => I, inverse: () => S, len: () => Y, length: () => l, lerp: () => O, max: () => y, min: () => m, mul: () => _, multiply: () => d, negate: () => L, normalize: () => T, random: () => W, rotateX: () => P, rotateY: () => z, rotateZ: () => R, round: () => b, scale: () => w, scaleAndAdd: () => x, set: () => c, sqrDist: () => $, sqrLen: () => Z, squaredDistance: () => C, squaredLength: () => k, str: () => G, sub: () => q, subtract: () => h, transformMat3: () => H, transformMat4: () => F, transformQuat: () => E, zero: () => V });
    var n, i = r(9685);
    function o() {
      var t2 = new i.WT(3);
      return i.WT != Float32Array && (t2[0] = 0, t2[1] = 0, t2[2] = 0), t2;
    }
    function a(t2) {
      var e2 = new i.WT(3);
      return e2[0] = t2[0], e2[1] = t2[1], e2[2] = t2[2], e2;
    }
    function l(t2) {
      return Math.hypot(t2[0], t2[1], t2[2]);
    }
    function s(t2, e2, r2) {
      var n2 = new i.WT(3);
      return n2[0] = t2, n2[1] = e2, n2[2] = r2, n2;
    }
    function u(t2, e2) {
      return t2[0] = e2[0], t2[1] = e2[1], t2[2] = e2[2], t2;
    }
    function c(t2, e2, r2, n2) {
      return t2[0] = e2, t2[1] = r2, t2[2] = n2, t2;
    }
    function f(t2, e2, r2) {
      return t2[0] = e2[0] + r2[0], t2[1] = e2[1] + r2[1], t2[2] = e2[2] + r2[2], t2;
    }
    function h(t2, e2, r2) {
      return t2[0] = e2[0] - r2[0], t2[1] = e2[1] - r2[1], t2[2] = e2[2] - r2[2], t2;
    }
    function d(t2, e2, r2) {
      return t2[0] = e2[0] * r2[0], t2[1] = e2[1] * r2[1], t2[2] = e2[2] * r2[2], t2;
    }
    function p(t2, e2, r2) {
      return t2[0] = e2[0] / r2[0], t2[1] = e2[1] / r2[1], t2[2] = e2[2] / r2[2], t2;
    }
    function g(t2, e2) {
      return t2[0] = Math.ceil(e2[0]), t2[1] = Math.ceil(e2[1]), t2[2] = Math.ceil(e2[2]), t2;
    }
    function v(t2, e2) {
      return t2[0] = Math.floor(e2[0]), t2[1] = Math.floor(e2[1]), t2[2] = Math.floor(e2[2]), t2;
    }
    function m(t2, e2, r2) {
      return t2[0] = Math.min(e2[0], r2[0]), t2[1] = Math.min(e2[1], r2[1]), t2[2] = Math.min(e2[2], r2[2]), t2;
    }
    function y(t2, e2, r2) {
      return t2[0] = Math.max(e2[0], r2[0]), t2[1] = Math.max(e2[1], r2[1]), t2[2] = Math.max(e2[2], r2[2]), t2;
    }
    function b(t2, e2) {
      return t2[0] = Math.round(e2[0]), t2[1] = Math.round(e2[1]), t2[2] = Math.round(e2[2]), t2;
    }
    function w(t2, e2, r2) {
      return t2[0] = e2[0] * r2, t2[1] = e2[1] * r2, t2[2] = e2[2] * r2, t2;
    }
    function x(t2, e2, r2, n2) {
      return t2[0] = e2[0] + r2[0] * n2, t2[1] = e2[1] + r2[1] * n2, t2[2] = e2[2] + r2[2] * n2, t2;
    }
    function M(t2, e2) {
      return Math.hypot(e2[0] - t2[0], e2[1] - t2[1], e2[2] - t2[2]);
    }
    function C(t2, e2) {
      var r2 = e2[0] - t2[0], n2 = e2[1] - t2[1], i2 = e2[2] - t2[2];
      return r2 * r2 + n2 * n2 + i2 * i2;
    }
    function k(t2) {
      var e2 = t2[0], r2 = t2[1], n2 = t2[2];
      return e2 * e2 + r2 * r2 + n2 * n2;
    }
    function L(t2, e2) {
      return t2[0] = -e2[0], t2[1] = -e2[1], t2[2] = -e2[2], t2;
    }
    function S(t2, e2) {
      return t2[0] = 1 / e2[0], t2[1] = 1 / e2[1], t2[2] = 1 / e2[2], t2;
    }
    function T(t2, e2) {
      var r2 = e2[0], n2 = e2[1], i2 = e2[2], o2 = r2 * r2 + n2 * n2 + i2 * i2;
      return o2 > 0 && (o2 = 1 / Math.sqrt(o2)), t2[0] = e2[0] * o2, t2[1] = e2[1] * o2, t2[2] = e2[2] * o2, t2;
    }
    function A(t2, e2) {
      return t2[0] * e2[0] + t2[1] * e2[1] + t2[2] * e2[2];
    }
    function N(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = r2[0], l2 = r2[1], s2 = r2[2];
      return t2[0] = i2 * s2 - o2 * l2, t2[1] = o2 * a2 - n2 * s2, t2[2] = n2 * l2 - i2 * a2, t2;
    }
    function O(t2, e2, r2, n2) {
      var i2 = e2[0], o2 = e2[1], a2 = e2[2];
      return t2[0] = i2 + n2 * (r2[0] - i2), t2[1] = o2 + n2 * (r2[1] - o2), t2[2] = a2 + n2 * (r2[2] - a2), t2;
    }
    function I(t2, e2, r2, n2, i2, o2) {
      var a2 = o2 * o2, l2 = a2 * (2 * o2 - 3) + 1, s2 = a2 * (o2 - 2) + o2, u2 = a2 * (o2 - 1), c2 = a2 * (3 - 2 * o2);
      return t2[0] = e2[0] * l2 + r2[0] * s2 + n2[0] * u2 + i2[0] * c2, t2[1] = e2[1] * l2 + r2[1] * s2 + n2[1] * u2 + i2[1] * c2, t2[2] = e2[2] * l2 + r2[2] * s2 + n2[2] * u2 + i2[2] * c2, t2;
    }
    function D(t2, e2, r2, n2, i2, o2) {
      var a2 = 1 - o2, l2 = a2 * a2, s2 = o2 * o2, u2 = l2 * a2, c2 = 3 * o2 * l2, f2 = 3 * s2 * a2, h2 = s2 * o2;
      return t2[0] = e2[0] * u2 + r2[0] * c2 + n2[0] * f2 + i2[0] * h2, t2[1] = e2[1] * u2 + r2[1] * c2 + n2[1] * f2 + i2[1] * h2, t2[2] = e2[2] * u2 + r2[2] * c2 + n2[2] * f2 + i2[2] * h2, t2;
    }
    function W(t2, e2) {
      e2 = e2 || 1;
      var r2 = 2 * i.FD() * Math.PI, n2 = 2 * i.FD() - 1, o2 = Math.sqrt(1 - n2 * n2) * e2;
      return t2[0] = Math.cos(r2) * o2, t2[1] = Math.sin(r2) * o2, t2[2] = n2 * e2, t2;
    }
    function F(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2], a2 = r2[3] * n2 + r2[7] * i2 + r2[11] * o2 + r2[15];
      return a2 = a2 || 1, t2[0] = (r2[0] * n2 + r2[4] * i2 + r2[8] * o2 + r2[12]) / a2, t2[1] = (r2[1] * n2 + r2[5] * i2 + r2[9] * o2 + r2[13]) / a2, t2[2] = (r2[2] * n2 + r2[6] * i2 + r2[10] * o2 + r2[14]) / a2, t2;
    }
    function H(t2, e2, r2) {
      var n2 = e2[0], i2 = e2[1], o2 = e2[2];
      return t2[0] = n2 * r2[0] + i2 * r2[3] + o2 * r2[6], t2[1] = n2 * r2[1] + i2 * r2[4] + o2 * r2[7], t2[2] = n2 * r2[2] + i2 * r2[5] + o2 * r2[8], t2;
    }
    function E(t2, e2, r2) {
      var n2 = r2[0], i2 = r2[1], o2 = r2[2], a2 = r2[3], l2 = e2[0], s2 = e2[1], u2 = e2[2], c2 = i2 * u2 - o2 * s2, f2 = o2 * l2 - n2 * u2, h2 = n2 * s2 - i2 * l2, d2 = i2 * h2 - o2 * f2, p2 = o2 * c2 - n2 * h2, g2 = n2 * f2 - i2 * c2, v2 = 2 * a2;
      return c2 *= v2, f2 *= v2, h2 *= v2, d2 *= 2, p2 *= 2, g2 *= 2, t2[0] = l2 + c2 + d2, t2[1] = s2 + f2 + p2, t2[2] = u2 + h2 + g2, t2;
    }
    function P(t2, e2, r2, n2) {
      var i2 = [], o2 = [];
      return i2[0] = e2[0] - r2[0], i2[1] = e2[1] - r2[1], i2[2] = e2[2] - r2[2], o2[0] = i2[0], o2[1] = i2[1] * Math.cos(n2) - i2[2] * Math.sin(n2), o2[2] = i2[1] * Math.sin(n2) + i2[2] * Math.cos(n2), t2[0] = o2[0] + r2[0], t2[1] = o2[1] + r2[1], t2[2] = o2[2] + r2[2], t2;
    }
    function z(t2, e2, r2, n2) {
      var i2 = [], o2 = [];
      return i2[0] = e2[0] - r2[0], i2[1] = e2[1] - r2[1], i2[2] = e2[2] - r2[2], o2[0] = i2[2] * Math.sin(n2) + i2[0] * Math.cos(n2), o2[1] = i2[1], o2[2] = i2[2] * Math.cos(n2) - i2[0] * Math.sin(n2), t2[0] = o2[0] + r2[0], t2[1] = o2[1] + r2[1], t2[2] = o2[2] + r2[2], t2;
    }
    function R(t2, e2, r2, n2) {
      var i2 = [], o2 = [];
      return i2[0] = e2[0] - r2[0], i2[1] = e2[1] - r2[1], i2[2] = e2[2] - r2[2], o2[0] = i2[0] * Math.cos(n2) - i2[1] * Math.sin(n2), o2[1] = i2[0] * Math.sin(n2) + i2[1] * Math.cos(n2), o2[2] = i2[2], t2[0] = o2[0] + r2[0], t2[1] = o2[1] + r2[1], t2[2] = o2[2] + r2[2], t2;
    }
    function B(t2, e2) {
      var r2 = s(t2[0], t2[1], t2[2]), n2 = s(e2[0], e2[1], e2[2]);
      T(r2, r2), T(n2, n2);
      var i2 = A(r2, n2);
      return i2 > 1 ? 0 : i2 < -1 ? Math.PI : Math.acos(i2);
    }
    function V(t2) {
      return t2[0] = 0, t2[1] = 0, t2[2] = 0, t2;
    }
    function G(t2) {
      return "vec3(" + t2[0] + ", " + t2[1] + ", " + t2[2] + ")";
    }
    function U(t2, e2) {
      return t2[0] === e2[0] && t2[1] === e2[1] && t2[2] === e2[2];
    }
    function j(t2, e2) {
      var r2 = t2[0], n2 = t2[1], o2 = t2[2], a2 = e2[0], l2 = e2[1], s2 = e2[2];
      return Math.abs(r2 - a2) <= i.Ib * Math.max(1, Math.abs(r2), Math.abs(a2)) && Math.abs(n2 - l2) <= i.Ib * Math.max(1, Math.abs(n2), Math.abs(l2)) && Math.abs(o2 - s2) <= i.Ib * Math.max(1, Math.abs(o2), Math.abs(s2));
    }
    var q = h, _ = d, K = p, X = M, $ = C, Y = l, Z = k, Q = (n = o(), function(t2, e2, r2, i2, o2, a2) {
      var l2, s2;
      for (e2 || (e2 = 3), r2 || (r2 = 0), s2 = i2 ? Math.min(i2 * e2 + r2, t2.length) : t2.length, l2 = r2; l2 < s2; l2 += e2) n[0] = t2[l2], n[1] = t2[l2 + 1], n[2] = t2[l2 + 2], o2(n, n, a2), t2[l2] = n[0], t2[l2 + 1] = n[1], t2[l2 + 2] = n[2];
      return t2;
    });
  }, 5659: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="arrowLeftIconTitle">\n    <title id="arrowLeftIconTitle">Arrow Left</title>    \n    <path d="M9 6l-6 6 6 6"/>\n    <path d="M21 12H4"/>\n    <path stroke-linecap="round" d="M3 12h1"/>\n</svg>';
  }, 5966: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="arrowRightIconTitle">\n    <title id="arrowRightIconTitle">Arrow Right</title>    \n    <path d="M15 18l6-6-6-6"/>\n    <path d="M3 12h17"/>\n    <path stroke-linecap="round" d="M21 12h-1"/>\n</svg>';
  }, 4649: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="arrowUpIconTitle">\n    <title id="arrowUpIconTitle">Arrow Up</title>    \n    <path d="M18 9l-6-6-6 6"/>\n    <path d="M12 21V4"/>\n    <path stroke-linecap="round" d="M12 3v1"/>\n</svg>';
  }, 888: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="binIconTitle">\n    <title id="binIconTitle">Bin</title>    \n    <path d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"/>\n</svg>';
  }, 9648: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="cameraIconTitle">\n    <title id="cameraIconTitle">Camera</title>    \n    <path d="M8 7l.74-1.11A2 2 0 0 1 10.404 5h3.192a2 2 0 0 1 1.664.89L16 7h5v11H3V7h5z"/>\n    <circle cx="12" cy="12" r="3"/>\n</svg>';
  }, 5501: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="closeIconTitle">\n    <title id="closeIconTitle">Close</title>    \n    <path d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575"/>\n</svg>';
  }, 936: function(t) {
    "use strict";
    t.exports = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="codeAltIconTitle">\n    <title id="codeAltIconTitle">Code</title>\n    <path d="M7 8L3 12L7 16"/>\n    <path d="M17 16L21 12L17 8"/>\n    <path d="M9 19.5L14.5 5"/>\n</svg>';
  }, 9158: function(t) {
    "use strict";
    t.exports = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="controlsAltIconTitle">\n    <title id="controlsAltIconTitle">Controls</title>\n    <circle cx="9" cy="6" r="2"/>\n    <path d="M4 6H7"/>\n    <path d="M11 6H20"/>\n    <circle cx="9" cy="18" r="2"/>\n    <path d="M4 18H7"/>\n    <path d="M11 18H20"/>\n    <circle cx="15" cy="12" r="2"/>\n    <path d="M4 12H13"/>\n    <path d="M17 12L20 12"/>\n</svg>';
  }, 6516: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="copyIconTitle">\n    <title id="copyIconTitle">Copy</title>    \n    <rect width="12" height="14" x="8" y="7"/>\n    <polyline points="16 3 4 3 4 17"/>\n</svg>';
  }, 2491: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="cursorIconTitle">\n    <title id="cursorIconTitle">Cursor</title>    \n    <polygon points="7 20 7 4 19 16 12 16 7 21"/>\n</svg>';
  }, 8041: function(t) {
    "use strict";
    t.exports = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeCrossedIconTitle">\n	<title id="eyeCrossedIconTitle">Hidden (crossed eye)</title>\n	<path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"/>\n	<circle cx="12" cy="12" r="3"/>\n	<path d="M3 21L20 4"/>\n</svg>';
  }, 7597: function(t) {
    "use strict";
    t.exports = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeIconTitle">\n	<title id="eyeIconTitle">Visible (eye)</title>\n	<path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"/>\n	<circle cx="12" cy="12" r="3"/>\n</svg>';
  }, 194: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="filterIconTitle">\n    <title id="filterIconTitle">Filter</title>    \n    <path d="M10 12.261L4.028 3.972h16L14 12.329V17l-4 3z"/>\n</svg>';
  }, 4797: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="helpIconTitle">\n    <title id="helpIconTitle">Help</title>    \n    <path d="M12 14C12 12 13.576002 11.6652983 14.1186858 11.1239516 14.663127 10.5808518 15 9.82976635 15 9 15 7.34314575 13.6568542 6 12 6 11.1040834 6 10.2998929 6.39272604 9.75018919 7.01541737 9.49601109 7.30334431 9.29624369 7.64043912 9.16697781 8.01061095"/>\n    <line x1="12" y1="17" x2="12" y2="17"/>\n    <circle cx="12" cy="12" r="10"/>\n</svg>';
  }, 7317: function(t) {
    "use strict";
    t.exports = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="layersIconTitle">\n    <title id="layersIconTitle">Layers</title>\n    <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z"/>\n    <path d="M20 12L12 16L4 12"/>\n    <path d="M20 16L12 20L4 16"/>\n</svg>';
  }, 4345: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="listIconTitle">\n    <title id="listIconTitle"/>\n    \n    <path d="M10 7L18 7M10 12L18 12M10 17L18 17"/>\n    <line x1="7" y1="7" x2="7" y2="7"/>\n    <line x1="7" y1="12" x2="7" y2="12"/>\n    <line x1="7" y1="17" x2="7" y2="17"/>\n</svg>';
  }, 7750: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="maximiseIconTitle">\n    <title id="maximiseIconTitle">Maximise View</title>    \n    <polyline points="21 16 21 21 16 21"/>\n    <polyline points="8 21 3 21 3 16"/>\n    <polyline points="16 3 21 3 21 8"/>\n    <polyline points="3 8 3 3 8 3"/>\n</svg>';
  }, 5369: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="pauseIconTitle">\n    <title id="pauseIconTitle">Pause</title>    \n    <rect width="4" height="16" x="5" y="4"/>\n    <rect width="4" height="16" x="15" y="4"/>\n</svg>';
  }, 6434: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="playIconTitle">\n    <title id="playIconTitle">Play</title>    \n    <path d="M20 12L5 21V3z"/>\n</svg>';
  }, 9314: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="plusIconTitle">\n    <title id="plusIconTitle">Plus</title>    \n    <path d="M20 12L4 12M12 4L12 20"/>\n</svg>';
  }, 1607: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="rotateIconTitle">\n    <title id="rotateIconTitle">Rotate</title>    \n    <path d="M22 12l-3 3-3-3"/>\n    <path d="M2 12l3-3 3 3"/>\n    <path d="M19.016 14v-1.95A7.05 7.05 0 0 0 8 6.22"/>\n    <path d="M16.016 17.845A7.05 7.05 0 0 1 5 12.015V10"/>\n    <path stroke-linecap="round" d="M5 10V9"/>\n    <path stroke-linecap="round" d="M19 15v-1"/>\n</svg>';
  }, 2384: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="searchIconTitle">\n    <title id="searchIconTitle">Search</title>    \n    <path d="M14.4121122,14.4121122 L20,20"/>\n    <circle cx="10" cy="10" r="6"/>\n</svg>';
  }, 754: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="settingsIconTitle">\n    <title id="settingsIconTitle">Settings</title>    \n    <path d="M5.03506429,12.7050339 C5.01187484,12.4731696 5,12.2379716 5,12 C5,11.7620284 5.01187484,11.5268304 5.03506429,11.2949661 L3.20577137,9.23205081 L5.20577137,5.76794919 L7.9069713,6.32070904 C8.28729123,6.0461342 8.69629298,5.80882212 9.12862533,5.61412402 L10,3 L14,3 L14.8713747,5.61412402 C15.303707,5.80882212 15.7127088,6.0461342 16.0930287,6.32070904 L18.7942286,5.76794919 L20.7942286,9.23205081 L18.9649357,11.2949661 C18.9881252,11.5268304 19,11.7620284 19,12 C19,12.2379716 18.9881252,12.4731696 18.9649357,12.7050339 L20.7942286,14.7679492 L18.7942286,18.2320508 L16.0930287,17.679291 C15.7127088,17.9538658 15.303707,18.1911779 14.8713747,18.385876 L14,21 L10,21 L9.12862533,18.385876 C8.69629298,18.1911779 8.28729123,17.9538658 7.9069713,17.679291 L5.20577137,18.2320508 L3.20577137,14.7679492 L5.03506429,12.7050339 Z"/>\n    <circle cx="12" cy="12" r="1"/>\n</svg>';
  }, 8086: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="starIconTitle">\n  <title id="starIconTitle">Star</title>  \n  <polygon points="12 17.844 6.183 20.902 7.294 14.425 2.588 9.838 9.092 8.893 12 3 14.908 8.893 21.412 9.838 16.706 14.425 17.817 20.902"/>\n</svg>';
  }, 9045: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="toolIconTitle">\n    <title id="toolIconTitle">Tool</title>    \n    <path d="M9.74292939,13.7429294 C9.19135019,13.9101088 8.60617271,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,7.07370693 2.20990431,6.19643964 2.58474197,5.4131691 L6.94974747,9.77817459 L9.77817459,6.94974747 L5.4131691,2.58474197 C6.19643964,2.20990431 7.07370693,2 8,2 C11.3137085,2 14,4.6862915 14,8 C14,8.88040772 13.8103765,9.71652648 13.4697429,10.4697429 L20.5858636,17.5858636 C21.3669122,18.3669122 21.3669122,19.6332422 20.5858636,20.4142907 L19.9142907,21.0858636 C19.1332422,21.8669122 17.8669122,21.8669122 17.0858636,21.0858636 L9.74292939,13.7429294 Z"/>\n</svg>';
  }, 9730: function(t) {
    "use strict";
    t.exports = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="videoIconTitle">\n    <title id="videoIconTitle">Video</title>    \n    <polygon points="18 12 9 16.9 9 7"/>\n    <circle cx="12" cy="12" r="10"/>\n</svg>';
  }, 2831: function(t, e, r) {
    "use strict";
    r.d(e, { Z: () => d });
    var n = r(3958);
    let i = function(t2, e2) {
      for (var r2 = -1, n2 = null == t2 ? 0 : t2.length, i2 = Array(n2); ++r2 < n2; ) i2[r2] = e2(t2[r2], r2, t2);
      return i2;
    };
    var o = Array.isArray, a = r(9567), l = 1 / 0, s = n.Z ? n.Z.prototype : void 0, u = s ? s.toString : void 0;
    let c = function t2(e2) {
      if ("string" == typeof e2) return e2;
      if (o(e2)) return i(e2, t2) + "";
      if ((0, a.Z)(e2)) return u ? u.call(e2) : "";
      var r2 = e2 + "";
      return "0" == r2 && 1 / e2 == -l ? "-0" : r2;
    };
    var f = /[\\^$.*+?()[\]{}|]/g, h = RegExp(f.source);
    let d = function(t2) {
      var e2;
      return (t2 = null == (e2 = t2) ? "" : c(e2)) && h.test(t2) ? t2.replace(f, "\\$&") : t2;
    };
  } }]);
})();
