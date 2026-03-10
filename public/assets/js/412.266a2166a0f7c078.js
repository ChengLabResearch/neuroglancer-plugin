(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  (() => {
    "use strict";
    var e = { 4472: function(e2, t2, r2) {
      e2.exports = r2.p + "../wasm/e431fe7ba8d0a870.wasm";
    }, 1088: function(e2, t2, r2) {
      e2.exports = r2.p + "../wasm/5b383a2480cdc3ac.wasm";
    }, 9266: function(e2, t2, r2) {
      e2.exports = r2.p + "../wasm/def6161ec2354b02.wasm";
    }, 7376: function(e2, t2, r2) {
      let n, i, a;
      r2(549), r2(2679);
      let o = /* @__PURE__ */ new Map();
      function s(e3, t3) {
        o.set(e3.id, t3);
      }
      function c(e3, t3 = 1) {
        let r3 = e3.length, n2 = Array(r3), i2 = n2[0] = t3;
        for (let t4 = 1; t4 < r3; ++t4) i2 *= e3[t4 - 1], n2[t4] = i2;
        return n2;
      }
      function l(e3, t3, r3) {
        let n2 = new e3.constructor(e3.length);
        for (let i2 = 0; i2 < t3 * r3; i2 += r3) for (let a2 = 0; a2 < r3; a2++) n2[a2 * t3 + i2 / r3] = e3[i2 + a2];
        return n2;
      }
      w = self, self.onmessage = async (e3) => {
        let { t: t3, id: r3, args: n2 } = e3.data;
        try {
          let e4 = o.get(t3);
          if (void 0 === e4) throw Error(`Internal error: async computation operation ${JSON.stringify(t3)} is not registered.  Registered handlers: ${JSON.stringify(Array.from(o.keys()))}`);
          let { value: i2, transfer: a2 } = await e4(...n2);
          w.postMessage({ id: r3, value: i2 }, { transfer: a2 });
        } catch (e4) {
          w.postMessage({ id: r3, error: e4 });
        }
      }, self.postMessage(null);
      class f {
        constructor(e3, t3 = 16) {
          __publicField(this, "data");
          __publicField(this, "length", 0);
          this.data = new e3(t3);
        }
        resize(e3) {
          let { data: t3 } = this;
          if (e3 > t3.length) {
            let r3 = new t3.constructor(Math.max(e3, 2 * t3.length));
            r3.set(t3.subarray(0, this.length)), this.data = r3;
          }
          this.length = e3;
        }
        get view() {
          return this.data.subarray(0, this.length);
        }
        shrinkToFit() {
          this.data = this.data.slice(0, length);
        }
        clear() {
          this.length = 0;
        }
        appendArray(e3) {
          let { length: t3 } = this;
          this.resize(t3 + e3.length), this.data.set(e3, t3);
        }
        eraseRange(e3, t3) {
          this.data.copyWithin(e3, t3, this.length), this.length -= t3 - e3;
        }
      }
      let h = Function("outputData", "outputOffset", "encodingBuffer", "indexBuffer", "encodedBits", "encodedSize32Bits", (() => {
        let e3 = "switch (encodedBits) { case 0: break;";
        for (let t3 of [1, 2, 4, 8, 16, 32]) {
          e3 += `case ${t3}:for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {let word = 0;`;
          let r3 = 32 / t3;
          for (let n2 = 0; n2 < r3; ++n2) e3 += `word |= indexBuffer[encodingBuffer[elementIndex + ${n2}]] << (${n2 * t3});`;
          e3 += `outputData[outputOffset + wordIndex] = word;elementIndex += ${r3};} break;`;
        }
        return e3 + "}";
      })());
      function u(e3, t3, r3, n2, i2 = 0, a2 = c(n2, 1)) {
        let o2 = e3.length, s2 = n2[3];
        e3.resize(o2 + s2);
        for (let l2 = 0; l2 < s2; ++l2) e3.data[o2 + l2] = e3.length, function(e4, t4, r4, n3, i3 = 0, a3 = c(n3, 1)) {
          let o3 = /* @__PURE__ */ new Map(), s3 = [, , ,], l3 = 2;
          for (let e5 = 0; e5 < 3; ++e5) l3 *= s3[e5] = Math.ceil(n3[e5] / t4[e5]);
          let f2 = s3[0], u2 = s3[1], x2 = s3[2], w2 = n3[0], C2 = n3[1], P2 = n3[2], I2 = t4[0], k2 = t4[1], A2 = t4[2], S2 = e4.length, T2 = S2, M2 = [0, 0, 0];
          e4.resize(S2 + l3);
          let E2 = a3[0], O2 = a3[1], L2 = a3[2];
          for (let n4 = 0; n4 < x2; ++n4) {
            M2[2] = Math.min(A2, P2 - n4 * A2);
            for (let s4 = 0; s4 < u2; ++s4) {
              M2[1] = Math.min(k2, C2 - s4 * k2);
              for (let c2 = 0; c2 < f2; ++c2) {
                M2[0] = Math.min(I2, w2 - c2 * I2);
                let l4 = n4 * A2 * L2 + s4 * k2 * O2 + c2 * I2 * E2, f3 = e4.length - S2, [u3, x3] = function(e5, t5, r5, n5, i4, a4, o4, s5) {
                  let c3, l5;
                  let f4 = i4[0], u4 = i4[1], x4 = i4[2], w3 = n5[0], C4 = n5[1], P3 = n5[2], I3 = r5[0], k3 = r5[1], A3 = r5[2];
                  if (A3 -= k3 * u4, k3 -= I3 * f4, f4 * u4 * x4 == 0) return [0, 0];
                  let S3 = w3 * C4 * P3 + 31;
                  d.length < S3 && (d = new Uint32Array(S3), y = new Uint32Array(S3), b = new Uint32Array(S3));
                  let T3 = 2 * Math.ceil(S3 * (e5 instanceof Uint32Array ? 1 : 2) / 2);
                  p.length < T3 && (p = new Uint32Array(T3), m = new Uint32Array(T3), g = new BigUint64Array(p.buffer), v = new BigUint64Array(m.buffer)), e5 instanceof Uint32Array ? (c3 = p, l5 = m) : (c3 = g, l5 = v);
                  let M3 = d.subarray(0, S3);
                  M3.fill(0);
                  let E3 = y, O3 = b, L3 = 0;
                  {
                    let r6 = e5[t5];
                    r6 ? --r6 : ++r6;
                    let n6 = t5, i5 = 0, a5 = w3 - f4, o5 = w3 * C4 - w3 * u4;
                    for (let t6 = 0; t6 < x4; ++t6, n6 += A3, i5 += o5) for (let t7 = 0; t7 < u4; ++t7, n6 += k3, i5 += a5) for (let t8 = 0; t8 < f4; ++t8, n6 += I3) {
                      let t9 = e5[n6];
                      t9 !== r6 && (r6 = c3[L3] = t9, E3[L3] = L3++), M3[i5++] = L3;
                    }
                  }
                  E3.subarray(0, L3).sort((e6, t6) => {
                    let r6 = c3[e6], n6 = c3[t6];
                    return r6 < n6 ? -1 : r6 > n6 ? 1 : 0;
                  });
                  let D2 = -1;
                  {
                    let e6 = c3[E3[0]];
                    e6 ? --e6 : ++e6;
                    for (let t6 = 0; t6 < L3; ++t6) {
                      let r6 = E3[t6], n6 = c3[r6];
                      n6 !== e6 && (e6 = l5[++D2] = n6), O3[r6 + 1] = D2;
                    }
                    ++D2;
                  }
                  return function(e6, t6, r6, n6, i5, a5, o5, s6, c4) {
                    let l6;
                    if (1 === i5) l6 = 0;
                    else for (l6 = 1; 1 << l6 < i5; ) l6 *= 2;
                    let f5 = Math.ceil(l6 * n6 / 32), u5 = e6.length, d2 = f5, p2 = false, m2 = a5.subarray(0, i5 * c4).join(), g2 = r6.get(m2);
                    void 0 === g2 && (p2 = true, d2 += i5 * c4, g2 = u5 + f5 - t6, r6.set(m2, g2)), e6.resize(u5 + d2);
                    let v2 = e6.data;
                    if (h(v2, u5, o5, s6, l6, f5), p2) {
                      let e7 = u5 + f5;
                      for (let t7 = 0, r7 = i5 * c4; t7 < r7; ++t7) v2[e7++] = a5[t7];
                    }
                    return [l6, g2];
                  }(s5, a4, o4, w3 * C4 * P3, D2, m, M3, O3, e5 instanceof Uint32Array ? 1 : 2);
                }(r4, i3 + l4, a3, t4, M2, S2, o3, e4), C3 = e4.data;
                C3[T2++] = x3 | u3 << 24, C3[T2++] = f3;
              }
            }
          }
        }(e3, t3, r3, n2, i2 + a2[3] * l2, a2);
      }
      let d = new Uint32Array(0), p = d, m = d, g = new BigUint64Array(), v = g, y = d, b = d, x = new f(Uint32Array, 2e4);
      s({ id: "encodeCompressedSegmentationUint32" }, async (e3, t3, r3) => (x.clear(), u(x, r3, e3, t3), { value: x.view })), s({ id: "encodeCompressedSegmentationUint64" }, async (e3, t3, r3) => (x.clear(), u(x, r3, e3, t3), { value: x.view })), !function(e3) {
        var t3 = function() {
          var e4 = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
          function t4() {
          }
          function r4(e5, t5, r5) {
            return 64 * ((e5.blocksPerLine + 1) * t5 + r5);
          }
          function n3(e5) {
            return e5 <= 0 ? 0 : e5 >= 255 ? 255 : e5;
          }
          return t4.prototype = { parse: function(t5) {
            function n4() {
              var e5 = t5[i3] << 8 | t5[i3 + 1];
              return i3 += 2, e5;
            }
            var i3 = 0;
            t5.length;
            var a3 = null, o3 = null, s3 = [], c3 = [], l3 = [], f3 = n4();
            if (65496 !== f3) throw "SOI not found";
            for (f3 = n4(); 65497 !== f3; ) {
              switch (f3) {
                case 65504:
                case 65505:
                case 65506:
                case 65507:
                case 65508:
                case 65509:
                case 65510:
                case 65511:
                case 65512:
                case 65513:
                case 65514:
                case 65515:
                case 65516:
                case 65517:
                case 65518:
                case 65519:
                case 65534:
                  var h3 = function() {
                    var e5 = n4(), r5 = t5.subarray(i3, i3 + e5 - 2);
                    return i3 += r5.length, r5;
                  }();
                  65504 === f3 && 74 === h3[0] && 70 === h3[1] && 73 === h3[2] && 70 === h3[3] && 0 === h3[4] && (a3 = { version: { major: h3[5], minor: h3[6] }, densityUnits: h3[7], xDensity: h3[8] << 8 | h3[9], yDensity: h3[10] << 8 | h3[11], thumbWidth: h3[12], thumbHeight: h3[13], thumbData: h3.subarray(14, 14 + 3 * h3[12] * h3[13]) }), 65518 === f3 && 65 === h3[0] && 100 === h3[1] && 111 === h3[2] && 98 === h3[3] && 101 === h3[4] && 0 === h3[5] && (o3 = { version: h3[6], flags0: h3[7] << 8 | h3[8], flags1: h3[9] << 8 | h3[10], transformCode: h3[11] });
                  break;
                case 65499:
                  for (var u3, d2, p2, m2, g2, v2, y2 = n4() + i3 - 2; i3 < y2; ) {
                    var b2 = t5[i3++], x2 = new Uint16Array(64);
                    if (b2 >> 4 == 0) for (m2 = 0; m2 < 64; m2++) x2[e4[m2]] = t5[i3++];
                    else if (b2 >> 4 == 1) for (m2 = 0; m2 < 64; m2++) x2[e4[m2]] = n4();
                    else throw "DQT: invalid table spec";
                    s3[15 & b2] = x2;
                  }
                  break;
                case 65472:
                case 65473:
                case 65474:
                  if (u3) throw "Only single frame JPEGs supported";
                  n4(), (u3 = {}).extended = 65473 === f3, u3.progressive = 65474 === f3, u3.precision = t5[i3++], u3.scanLines = n4(), u3.samplesPerLine = n4(), u3.components = [], u3.componentIds = {};
                  var w2, C2 = t5[i3++], P2 = 0, I2 = 0;
                  for (p2 = 0; p2 < C2; p2++) {
                    w2 = t5[i3];
                    var k2 = t5[i3 + 1] >> 4, A2 = 15 & t5[i3 + 1];
                    P2 < k2 && (P2 = k2), I2 < A2 && (I2 = A2);
                    var S2 = t5[i3 + 2];
                    g2 = u3.components.push({ h: k2, v: A2, quantizationTable: s3[S2] }), u3.componentIds[w2] = g2 - 1, i3 += 3;
                  }
                  u3.maxH = P2, u3.maxV = I2, function(e5) {
                    for (var t6 = Math.ceil(e5.samplesPerLine / 8 / e5.maxH), r5 = Math.ceil(e5.scanLines / 8 / e5.maxV), n5 = 0; n5 < e5.components.length; n5++) {
                      D2 = e5.components[n5];
                      var i4 = Math.ceil(Math.ceil(e5.samplesPerLine / 8) * D2.h / e5.maxH), a4 = Math.ceil(Math.ceil(e5.scanLines / 8) * D2.v / e5.maxV), o4 = t6 * D2.h, s4 = 64 * (r5 * D2.v) * (o4 + 1);
                      D2.blockData = new Int16Array(s4), D2.blocksPerLine = i4, D2.blocksPerColumn = a4;
                    }
                    e5.mcusPerLine = t6, e5.mcusPerColumn = r5;
                  }(u3);
                  break;
                case 65476:
                  var T2 = n4();
                  for (p2 = 2; p2 < T2; ) {
                    var M2 = t5[i3++], E2 = new Uint8Array(16), O2 = 0;
                    for (m2 = 0; m2 < 16; m2++, i3++) O2 += E2[m2] = t5[i3];
                    var L2 = new Uint8Array(O2);
                    for (m2 = 0; m2 < O2; m2++, i3++) L2[m2] = t5[i3];
                    p2 += 17 + O2, (M2 >> 4 == 0 ? l3 : c3)[15 & M2] = function(e5, t6) {
                      for (var r5, n5, i4 = 0, a4 = [], o4 = 16; o4 > 0 && !e5[o4 - 1]; ) o4--;
                      a4.push({ children: [], index: 0 });
                      var s4, c4 = a4[0];
                      for (r5 = 0; r5 < o4; r5++) {
                        for (n5 = 0; n5 < e5[r5]; n5++) {
                          for ((c4 = a4.pop()).children[c4.index] = t6[i4]; c4.index > 0; ) c4 = a4.pop();
                          for (c4.index++, a4.push(c4); a4.length <= r5; ) a4.push(s4 = { children: [], index: 0 }), c4.children[c4.index] = s4.children, c4 = s4;
                          i4++;
                        }
                        r5 + 1 < o4 && (a4.push(s4 = { children: [], index: 0 }), c4.children[c4.index] = s4.children, c4 = s4);
                      }
                      return a4[0].children;
                    }(E2, L2);
                  }
                  break;
                case 65501:
                  n4(), d2 = n4();
                  break;
                case 65498:
                  n4();
                  var D2, U2 = t5[i3++], z2 = [];
                  for (p2 = 0; p2 < U2; p2++) {
                    var F2 = u3.componentIds[t5[i3++]];
                    D2 = u3.components[F2];
                    var B2 = t5[i3++];
                    D2.huffmanTableDC = l3[B2 >> 4], D2.huffmanTableAC = c3[15 & B2], z2.push(D2);
                  }
                  var $2 = t5[i3++], R2 = t5[i3++], _2 = t5[i3++], q2 = function(t6, n5, i4, a4, o4, s4, c4, l4, f4) {
                    i4.precision, i4.samplesPerLine, i4.scanLines;
                    var h4, u4, d3, p3 = i4.mcusPerLine, m3 = i4.progressive;
                    i4.maxH, i4.maxV;
                    var g3 = n5, v3 = 0, y3 = 0;
                    function b3() {
                      if (y3 > 0) return y3--, v3 >> y3 & 1;
                      if (255 === (v3 = t6[n5++])) {
                        var e5 = t6[n5++];
                        if (e5) throw "unexpected marker: " + (v3 << 8 | e5).toString(16);
                      }
                      return y3 = 7, v3 >>> 7;
                    }
                    function x3(e5) {
                      for (var t7 = e5; ; ) {
                        if ("number" == typeof (t7 = t7[b3()])) return t7;
                        if ("object" != typeof t7) throw "invalid huffman sequence";
                      }
                    }
                    function w3(e5) {
                      for (var t7 = 0; e5 > 0; ) t7 = t7 << 1 | b3(), e5--;
                      return t7;
                    }
                    function C3(e5) {
                      if (1 === e5) return 1 === b3() ? 1 : -1;
                      var t7 = w3(e5);
                      return t7 >= 1 << e5 - 1 ? t7 : t7 + (-1 << e5) + 1;
                    }
                    var P3, I3 = 0, k3 = 0, A3 = a4.length;
                    L3 = m3 ? 0 === s4 ? 0 === l4 ? function(e5, t7) {
                      var r5 = x3(e5.huffmanTableDC), n6 = 0 === r5 ? 0 : C3(r5) << f4;
                      e5.blockData[t7] = e5.pred += n6;
                    } : function(e5, t7) {
                      e5.blockData[t7] |= b3() << f4;
                    } : 0 === l4 ? function(t7, r5) {
                      if (I3 > 0) {
                        I3--;
                        return;
                      }
                      for (var n6 = s4; n6 <= c4; ) {
                        var i5 = x3(t7.huffmanTableAC), a5 = 15 & i5, o5 = i5 >> 4;
                        if (0 === a5) {
                          if (o5 < 15) {
                            I3 = w3(o5) + (1 << o5) - 1;
                            break;
                          }
                          n6 += 16;
                          continue;
                        }
                        var l5 = e4[n6 += o5];
                        t7.blockData[r5 + l5] = C3(a5) * (1 << f4), n6++;
                      }
                    } : function(t7, r5) {
                      for (var n6, i5, a5 = s4, o5 = 0; a5 <= c4; ) {
                        var l5 = e4[a5];
                        switch (k3) {
                          case 0:
                            if (n6 = 15 & (i5 = x3(t7.huffmanTableAC)), o5 = i5 >> 4, 0 === n6) o5 < 15 ? (I3 = w3(o5) + (1 << o5), k3 = 4) : (o5 = 16, k3 = 1);
                            else {
                              if (1 !== n6) throw "invalid ACn encoding";
                              P3 = C3(n6), k3 = o5 ? 2 : 3;
                            }
                            continue;
                          case 1:
                          case 2:
                            t7.blockData[r5 + l5] ? t7.blockData[r5 + l5] += b3() << f4 : 0 == --o5 && (k3 = 2 === k3 ? 3 : 0);
                            break;
                          case 3:
                            t7.blockData[r5 + l5] ? t7.blockData[r5 + l5] += b3() << f4 : (t7.blockData[r5 + l5] = P3 << f4, k3 = 0);
                            break;
                          case 4:
                            t7.blockData[r5 + l5] && (t7.blockData[r5 + l5] += b3() << f4);
                        }
                        a5++;
                      }
                      4 === k3 && 0 == --I3 && (k3 = 0);
                    } : function(t7, r5) {
                      var n6 = x3(t7.huffmanTableDC), i5 = 0 === n6 ? 0 : C3(n6);
                      t7.blockData[r5] = t7.pred += i5;
                      for (var a5 = 1; a5 < 64; ) {
                        var o5 = x3(t7.huffmanTableAC), s5 = 15 & o5, c5 = o5 >> 4;
                        if (0 === s5) {
                          if (c5 < 15) break;
                          a5 += 16;
                          continue;
                        }
                        var l5 = e4[a5 += c5];
                        t7.blockData[r5 + l5] = C3(s5), a5++;
                      }
                    };
                    var S3, T3, M3, E3, O3, L3, D3, U3 = 0;
                    for (h4 = 1 === A3 ? a4[0].blocksPerLine * a4[0].blocksPerColumn : p3 * i4.mcusPerColumn, o4 || (o4 = h4); U3 < h4; ) {
                      for (T3 = 0; T3 < A3; T3++) a4[T3].pred = 0;
                      if (I3 = 0, 1 === A3) for (O3 = 0, S3 = a4[0]; O3 < o4; O3++) (function(e5, t7, n6) {
                        var i5 = n6 / e5.blocksPerLine | 0, a5 = n6 % e5.blocksPerLine, o5 = r4(e5, i5, a5);
                        t7(e5, o5);
                      })(S3, L3, U3), U3++;
                      else for (O3 = 0; O3 < o4; O3++) {
                        for (T3 = 0; T3 < A3; T3++) for (M3 = 0, u4 = (S3 = a4[T3]).h, d3 = S3.v; M3 < d3; M3++) for (E3 = 0; E3 < u4; E3++) !function(e5, t7, n6, i5, a5) {
                          var o5 = (n6 / p3 | 0) * e5.v + i5, s5 = n6 % p3 * e5.h + a5, c5 = r4(e5, o5, s5);
                          t7(e5, c5);
                        }(S3, L3, U3, M3, E3);
                        U3++;
                      }
                      if (y3 = 0, (D3 = t6[n5] << 8 | t6[n5 + 1]) <= 65280) throw "marker was not found";
                      if (D3 >= 65488 && D3 <= 65495) n5 += 2;
                      else break;
                    }
                    return n5 - g3;
                  }(t5, i3, u3, z2, d2, $2, R2, _2 >> 4, 15 & _2);
                  i3 += q2;
                  break;
                case 65535:
                  255 !== t5[i3] && i3--;
                  break;
                default:
                  if (255 === t5[i3 - 3] && t5[i3 - 2] >= 192 && t5[i3 - 2] <= 254) {
                    i3 -= 3;
                    break;
                  }
                  throw "unknown JPEG marker " + f3.toString(16);
              }
              f3 = n4();
            }
            for (p2 = 0, this.width = u3.samplesPerLine, this.height = u3.scanLines, this.jfif = a3, this.adobe = o3, this.components = []; p2 < u3.components.length; p2++) D2 = u3.components[p2], this.components.push({ output: function(e5, t6) {
              for (var n5 = t6.blocksPerLine, i4 = t6.blocksPerColumn, a4 = new Int16Array(64), o4 = 0; o4 < i4; o4++) for (var s4 = 0; s4 < n5; s4++) {
                var c4 = r4(t6, o4, s4);
                !function(e6, t7, r5) {
                  for (var n6, i5, a5, o5, s5, c5, l4, f4, h4, u4, d3, p3, m3, g3, v3, y3, b3, x3 = e6.quantizationTable, w3 = e6.blockData, C3 = 0; C3 < 64; C3 += 8) {
                    if (h4 = w3[t7 + C3], u4 = w3[t7 + C3 + 1], d3 = w3[t7 + C3 + 2], p3 = w3[t7 + C3 + 3], m3 = w3[t7 + C3 + 4], g3 = w3[t7 + C3 + 5], v3 = w3[t7 + C3 + 6], y3 = w3[t7 + C3 + 7], h4 *= x3[C3], (u4 | d3 | p3 | m3 | g3 | v3 | y3) == 0) {
                      b3 = 5793 * h4 + 512 >> 10, r5[C3] = b3, r5[C3 + 1] = b3, r5[C3 + 2] = b3, r5[C3 + 3] = b3, r5[C3 + 4] = b3, r5[C3 + 5] = b3, r5[C3 + 6] = b3, r5[C3 + 7] = b3;
                      continue;
                    }
                    u4 *= x3[C3 + 1], d3 *= x3[C3 + 2], p3 *= x3[C3 + 3], m3 *= x3[C3 + 4], g3 *= x3[C3 + 5], v3 *= x3[C3 + 6], y3 *= x3[C3 + 7], n6 = 5793 * h4 + 128 >> 8, i5 = 5793 * m3 + 128 >> 8, a5 = d3, o5 = v3, s5 = 2896 * (u4 - y3) + 128 >> 8, f4 = 2896 * (u4 + y3) + 128 >> 8, c5 = p3 << 4, l4 = g3 << 4, i5 = (n6 = n6 + i5 + 1 >> 1) - i5, b3 = 3784 * a5 + 1567 * o5 + 128 >> 8, a5 = 1567 * a5 - 3784 * o5 + 128 >> 8, o5 = b3, l4 = (s5 = s5 + l4 + 1 >> 1) - l4, c5 = (f4 = f4 + c5 + 1 >> 1) - c5, o5 = (n6 = n6 + o5 + 1 >> 1) - o5, a5 = (i5 = i5 + a5 + 1 >> 1) - a5, b3 = 2276 * s5 + 3406 * f4 + 2048 >> 12, s5 = 3406 * s5 - 2276 * f4 + 2048 >> 12, f4 = b3, b3 = 799 * c5 + 4017 * l4 + 2048 >> 12, c5 = 4017 * c5 - 799 * l4 + 2048 >> 12, l4 = b3, r5[C3] = n6 + f4, r5[C3 + 7] = n6 - f4, r5[C3 + 1] = i5 + l4, r5[C3 + 6] = i5 - l4, r5[C3 + 2] = a5 + c5, r5[C3 + 5] = a5 - c5, r5[C3 + 3] = o5 + s5, r5[C3 + 4] = o5 - s5;
                  }
                  for (var P3 = 0; P3 < 8; ++P3) {
                    if (h4 = r5[P3], u4 = r5[P3 + 8], d3 = r5[P3 + 16], p3 = r5[P3 + 24], m3 = r5[P3 + 32], g3 = r5[P3 + 40], (u4 | d3 | p3 | m3 | g3 | (v3 = r5[P3 + 48]) | (y3 = r5[P3 + 56])) == 0) {
                      b3 = (b3 = 5793 * h4 + 8192 >> 14) < -2040 ? 0 : b3 >= 2024 ? 255 : b3 + 2056 >> 4, w3[t7 + P3] = b3, w3[t7 + P3 + 8] = b3, w3[t7 + P3 + 16] = b3, w3[t7 + P3 + 24] = b3, w3[t7 + P3 + 32] = b3, w3[t7 + P3 + 40] = b3, w3[t7 + P3 + 48] = b3, w3[t7 + P3 + 56] = b3;
                      continue;
                    }
                    n6 = 5793 * h4 + 2048 >> 12, i5 = 5793 * m3 + 2048 >> 12, a5 = d3, o5 = v3, s5 = 2896 * (u4 - y3) + 2048 >> 12, f4 = 2896 * (u4 + y3) + 2048 >> 12, c5 = p3, l4 = g3, i5 = (n6 = (n6 + i5 + 1 >> 1) + 4112) - i5, b3 = 3784 * a5 + 1567 * o5 + 2048 >> 12, a5 = 1567 * a5 - 3784 * o5 + 2048 >> 12, o5 = b3, l4 = (s5 = s5 + l4 + 1 >> 1) - l4, c5 = (f4 = f4 + c5 + 1 >> 1) - c5, o5 = (n6 = n6 + o5 + 1 >> 1) - o5, a5 = (i5 = i5 + a5 + 1 >> 1) - a5, b3 = 2276 * s5 + 3406 * f4 + 2048 >> 12, s5 = 3406 * s5 - 2276 * f4 + 2048 >> 12, f4 = b3, b3 = 799 * c5 + 4017 * l4 + 2048 >> 12, c5 = 4017 * c5 - 799 * l4 + 2048 >> 12, l4 = b3, h4 = n6 + f4, y3 = n6 - f4, u4 = i5 + l4, v3 = i5 - l4, d3 = a5 + c5, g3 = a5 - c5, h4 = h4 < 16 ? 0 : h4 >= 4080 ? 255 : h4 >> 4, u4 = u4 < 16 ? 0 : u4 >= 4080 ? 255 : u4 >> 4, d3 = d3 < 16 ? 0 : d3 >= 4080 ? 255 : d3 >> 4, p3 = (p3 = o5 + s5) < 16 ? 0 : p3 >= 4080 ? 255 : p3 >> 4, m3 = (m3 = o5 - s5) < 16 ? 0 : m3 >= 4080 ? 255 : m3 >> 4, g3 = g3 < 16 ? 0 : g3 >= 4080 ? 255 : g3 >> 4, v3 = v3 < 16 ? 0 : v3 >= 4080 ? 255 : v3 >> 4, y3 = y3 < 16 ? 0 : y3 >= 4080 ? 255 : y3 >> 4, w3[t7 + P3] = h4, w3[t7 + P3 + 8] = u4, w3[t7 + P3 + 16] = d3, w3[t7 + P3 + 24] = p3, w3[t7 + P3 + 32] = m3, w3[t7 + P3 + 40] = g3, w3[t7 + P3 + 48] = v3, w3[t7 + P3 + 56] = y3;
                  }
                }(t6, c4, a4);
              }
              return t6.blockData;
            }(0, D2), scaleX: D2.h / u3.maxH, scaleY: D2.v / u3.maxV, blocksPerLine: D2.blocksPerLine, blocksPerColumn: D2.blocksPerColumn });
            this.numComponents = this.components.length;
          }, _getLinearizedBlockData: function(e5, t5) {
            var r5, n4, i3, a3, o3, s3, c3, l3, f3, h3, u3, d2 = this.width / e5, p2 = this.height / t5, m2 = 0, g2 = this.components.length, v2 = e5 * t5 * g2, y2 = new Uint8Array(v2), b2 = new Uint32Array(e5);
            for (c3 = 0; c3 < g2; c3++) {
              for (o3 = 0, n4 = (r5 = this.components[c3]).scaleX * d2, i3 = r5.scaleY * p2, m2 = c3, u3 = r5.output, a3 = r5.blocksPerLine + 1 << 3; o3 < e5; o3++) l3 = 0 | o3 * n4, b2[o3] = (4294967288 & l3) << 3 | 7 & l3;
              for (s3 = 0; s3 < t5; s3++) for (o3 = 0, h3 = a3 * (4294967288 & (l3 = 0 | s3 * i3)) | (7 & l3) << 3; o3 < e5; o3++) y2[m2] = u3[h3 + b2[o3]], m2 += g2;
            }
            var x2 = this.decodeTransform;
            if (x2) for (c3 = 0; c3 < v2; ) for (l3 = 0, f3 = 0; l3 < g2; l3++, c3++, f3 += 2) y2[c3] = (y2[c3] * x2[f3] >> 8) + x2[f3 + 1];
            return y2;
          }, _isColorConversionNeeded: function() {
            return !!this.adobe && !!this.adobe.transformCode || 3 === this.numComponents;
          }, _convertYccToRgb: function(e5) {
            for (var t5, r5, i3, a3 = 0, o3 = e5.length; a3 < o3; a3 += 3) t5 = e5[a3], r5 = e5[a3 + 1], i3 = e5[a3 + 2], e5[a3] = n3(t5 - 179.456 + 1.402 * i3), e5[a3 + 1] = n3(t5 + 135.459 - 0.344 * r5 - 0.714 * i3), e5[a3 + 2] = n3(t5 - 226.816 + 1.772 * r5);
            return e5;
          }, _convertYcckToRgb: function(e5) {
            for (var t5, r5, i3, a3, o3 = 0, s3 = 0, c3 = e5.length; s3 < c3; s3 += 4) {
              t5 = e5[s3], r5 = e5[s3 + 1];
              var l3 = -122.67195406894 + r5 * (-660635669420364e-19 * r5 + 437130475926232e-18 * (i3 = e5[s3 + 2]) - 54080610064599e-18 * t5 + 48449797120281e-17 * (a3 = e5[s3 + 3]) - 0.154362151871126) + i3 * (-957964378445773e-18 * i3 + 817076911346625e-18 * t5 - 0.00477271405408747 * a3 + 1.53380253221734) + t5 * (961250184130688e-18 * t5 - 0.00266257332283933 * a3 + 0.48357088451265) + a3 * (-336197177618394e-18 * a3 + 0.484791561490776), f3 = 107.268039397724 + r5 * (219927104525741e-19 * r5 - 640992018297945e-18 * i3 + 659397001245577e-18 * t5 + 426105652938837e-18 * a3 - 0.176491792462875) + i3 * (-778269941513683e-18 * i3 + 0.00130872261408275 * t5 + 770482631801132e-18 * a3 - 0.151051492775562) + t5 * (0.00126935368114843 * t5 - 0.00265090189010898 * a3 + 0.25802910206845) + a3 * (-318913117588328e-18 * a3 - 0.213742400323665), h3 = -20.810012546947 + r5 * (-570115196973677e-18 * r5 - 263409051004589e-19 * i3 + 0.0020741088115012 * t5 - 0.00288260236853442 * a3 + 0.814272968359295) + i3 * (-153496057440975e-19 * i3 - 132689043961446e-18 * t5 + 560833691242812e-18 * a3 - 0.195152027534049) + t5 * (0.00174418132927582 * t5 - 0.00255243321439347 * a3 + 0.116935020465145) + a3 * (-343531996510555e-18 * a3 + 0.24165260232407);
              e5[o3++] = n3(l3), e5[o3++] = n3(f3), e5[o3++] = n3(h3);
            }
            return e5;
          }, _convertYcckToCmyk: function(e5) {
            for (var t5, r5, i3, a3 = 0, o3 = e5.length; a3 < o3; a3 += 4) t5 = e5[a3], r5 = e5[a3 + 1], i3 = e5[a3 + 2], e5[a3] = n3(434.456 - t5 - 1.402 * i3), e5[a3 + 1] = n3(119.541 - t5 + 0.344 * r5 + 0.714 * i3), e5[a3 + 2] = n3(481.816 - t5 - 1.772 * r5);
            return e5;
          }, _convertCmykToRgb: function(e5) {
            for (var t5, r5, n4, i3, a3 = 0, o3 = 1 / 255 / 255, s3 = 0, c3 = e5.length; s3 < c3; s3 += 4) {
              t5 = e5[s3], r5 = e5[s3 + 1];
              var l3 = t5 * (-4.387332384609988 * t5 + 54.48615194189176 * r5 + 18.82290502165302 * (n4 = e5[s3 + 2]) + 212.25662451639585 * (i3 = e5[s3 + 3]) - 72734.4411664936) + r5 * (1.7149763477362134 * r5 - 5.6096736904047315 * n4 - 17.873870861415444 * i3 - 1401.7366389350734) + n4 * (-2.5217340131683033 * n4 - 21.248923337353073 * i3 + 4465.541406466231) - i3 * (21.86122147463605 * i3 + 48317.86113160301), f3 = t5 * (8.841041422036149 * t5 + 60.118027045597366 * r5 + 6.871425592049007 * n4 + 31.159100130055922 * i3 - 20220.756542821975) + r5 * (-15.310361306967817 * r5 + 17.575251261109482 * n4 + 131.35250912493976 * i3 - 48691.05921601825) + n4 * (4.444339102852739 * n4 + 9.8632861493405 * i3 - 6341.191035517494) - i3 * (20.737325471181034 * i3 + 47890.15695978492), h3 = t5 * (0.8842522430003296 * t5 + 8.078677503112928 * r5 + 30.89978309703729 * n4 - 0.23883238689178934 * i3 - 3616.812083916688) + r5 * (10.49593273432072 * r5 + 63.02378494754052 * n4 + 50.606957656360734 * i3 - 28620.90484698408) + n4 * (0.03296041114873217 * n4 + 115.60384449646641 * i3 - 49363.43385999684) - i3 * (22.33816807309886 * i3 + 45932.16563550634);
              e5[a3++] = l3 >= 0 ? 255 : l3 <= -16581375 ? 0 : 255 + l3 * o3 | 0, e5[a3++] = f3 >= 0 ? 255 : f3 <= -16581375 ? 0 : 255 + f3 * o3 | 0, e5[a3++] = h3 >= 0 ? 255 : h3 <= -16581375 ? 0 : 255 + h3 * o3 | 0;
            }
            return e5;
          }, getData: function(e5, t5, r5) {
            if (this.numComponents > 4) throw "Unsupported color mode";
            var n4 = this._getLinearizedBlockData(e5, t5);
            if (3 === this.numComponents) return this._convertYccToRgb(n4);
            if (4 === this.numComponents) {
              if (this._isColorConversionNeeded()) return r5 ? this._convertYcckToRgb(n4) : this._convertYcckToCmyk(n4);
              if (r5) return this._convertCmykToRgb(n4);
            }
            return n4;
          } }, t4;
        }(), r3 = function() {
          var e4 = [{ qe: 22017, nmps: 1, nlps: 1, switchFlag: 1 }, { qe: 13313, nmps: 2, nlps: 6, switchFlag: 0 }, { qe: 6145, nmps: 3, nlps: 9, switchFlag: 0 }, { qe: 2753, nmps: 4, nlps: 12, switchFlag: 0 }, { qe: 1313, nmps: 5, nlps: 29, switchFlag: 0 }, { qe: 545, nmps: 38, nlps: 33, switchFlag: 0 }, { qe: 22017, nmps: 7, nlps: 6, switchFlag: 1 }, { qe: 21505, nmps: 8, nlps: 14, switchFlag: 0 }, { qe: 18433, nmps: 9, nlps: 14, switchFlag: 0 }, { qe: 14337, nmps: 10, nlps: 14, switchFlag: 0 }, { qe: 12289, nmps: 11, nlps: 17, switchFlag: 0 }, { qe: 9217, nmps: 12, nlps: 18, switchFlag: 0 }, { qe: 7169, nmps: 13, nlps: 20, switchFlag: 0 }, { qe: 5633, nmps: 29, nlps: 21, switchFlag: 0 }, { qe: 22017, nmps: 15, nlps: 14, switchFlag: 1 }, { qe: 21505, nmps: 16, nlps: 14, switchFlag: 0 }, { qe: 20737, nmps: 17, nlps: 15, switchFlag: 0 }, { qe: 18433, nmps: 18, nlps: 16, switchFlag: 0 }, { qe: 14337, nmps: 19, nlps: 17, switchFlag: 0 }, { qe: 13313, nmps: 20, nlps: 18, switchFlag: 0 }, { qe: 12289, nmps: 21, nlps: 19, switchFlag: 0 }, { qe: 10241, nmps: 22, nlps: 19, switchFlag: 0 }, { qe: 9217, nmps: 23, nlps: 20, switchFlag: 0 }, { qe: 8705, nmps: 24, nlps: 21, switchFlag: 0 }, { qe: 7169, nmps: 25, nlps: 22, switchFlag: 0 }, { qe: 6145, nmps: 26, nlps: 23, switchFlag: 0 }, { qe: 5633, nmps: 27, nlps: 24, switchFlag: 0 }, { qe: 5121, nmps: 28, nlps: 25, switchFlag: 0 }, { qe: 4609, nmps: 29, nlps: 26, switchFlag: 0 }, { qe: 4353, nmps: 30, nlps: 27, switchFlag: 0 }, { qe: 2753, nmps: 31, nlps: 28, switchFlag: 0 }, { qe: 2497, nmps: 32, nlps: 29, switchFlag: 0 }, { qe: 2209, nmps: 33, nlps: 30, switchFlag: 0 }, { qe: 1313, nmps: 34, nlps: 31, switchFlag: 0 }, { qe: 1089, nmps: 35, nlps: 32, switchFlag: 0 }, { qe: 673, nmps: 36, nlps: 33, switchFlag: 0 }, { qe: 545, nmps: 37, nlps: 34, switchFlag: 0 }, { qe: 321, nmps: 38, nlps: 35, switchFlag: 0 }, { qe: 273, nmps: 39, nlps: 36, switchFlag: 0 }, { qe: 133, nmps: 40, nlps: 37, switchFlag: 0 }, { qe: 73, nmps: 41, nlps: 38, switchFlag: 0 }, { qe: 37, nmps: 42, nlps: 39, switchFlag: 0 }, { qe: 21, nmps: 43, nlps: 40, switchFlag: 0 }, { qe: 9, nmps: 44, nlps: 41, switchFlag: 0 }, { qe: 5, nmps: 45, nlps: 42, switchFlag: 0 }, { qe: 1, nmps: 45, nlps: 43, switchFlag: 0 }, { qe: 22017, nmps: 46, nlps: 46, switchFlag: 0 }];
          function t4(e5, t5, r4) {
            this.data = e5, this.bp = t5, this.dataEnd = r4, this.chigh = e5[t5], this.clow = 0, this.byteIn(), this.chigh = this.chigh << 7 & 65535 | this.clow >> 9 & 127, this.clow = this.clow << 7 & 65535, this.ct -= 7, this.a = 32768;
          }
          return t4.prototype = { byteIn: function() {
            var e5 = this.data, t5 = this.bp;
            255 === e5[t5] ? e5[t5 + 1] > 143 ? (this.clow += 65280, this.ct = 8) : (t5++, this.clow += e5[t5] << 9, this.ct = 7, this.bp = t5) : (t5++, this.clow += t5 < this.dataEnd ? e5[t5] << 8 : 65280, this.ct = 8, this.bp = t5), this.clow > 65535 && (this.chigh += this.clow >> 16, this.clow &= 65535);
          }, readBit: function(t5, r4) {
            var n3, i3 = t5[r4] >> 1, a3 = 1 & t5[r4], o3 = e4[i3], s3 = o3.qe, c3 = this.a - s3;
            if (this.chigh < s3) c3 < s3 ? (c3 = s3, n3 = a3, i3 = o3.nmps) : (c3 = s3, n3 = 1 ^ a3, 1 === o3.switchFlag && (a3 = n3), i3 = o3.nlps);
            else {
              if (this.chigh -= s3, (32768 & c3) != 0) return this.a = c3, a3;
              c3 < s3 ? (n3 = 1 ^ a3, 1 === o3.switchFlag && (a3 = n3), i3 = o3.nlps) : (n3 = a3, i3 = o3.nmps);
            }
            do
              0 === this.ct && this.byteIn(), c3 <<= 1, this.chigh = this.chigh << 1 & 65535 | this.clow >> 15 & 1, this.clow = this.clow << 1 & 65535, this.ct--;
            while ((32768 & c3) == 0);
            return this.a = c3, t5[r4] = i3 << 1 | a3, n3;
          } }, t4;
        }(), n2 = function() {
          var e4 = { LL: 0, LH: 1, HL: 1, HH: 2 };
          function t4() {
            this.failOnCorruptedImage = false;
          }
          function n3(e5, t5, r4) {
            var n4, i4, a3, o4, s3 = r4.xcb_, c3 = r4.ycb_, l4 = 1 << s3, f4 = 1 << c3, h3 = t5.tbx0 >> s3, u3 = t5.tby0 >> c3, d3 = t5.tbx1 + l4 - 1 >> s3, p3 = t5.tby1 + f4 - 1 >> c3, m3 = t5.resolution.precinctParameters, g3 = [], v3 = [];
            for (i4 = u3; i4 < p3; i4++) for (n4 = h3; n4 < d3; n4++) if ((a3 = { cbx: n4, cby: i4, tbx0: l4 * n4, tby0: f4 * i4, tbx1: l4 * (n4 + 1), tby1: f4 * (i4 + 1) }).tbx0_ = Math.max(t5.tbx0, a3.tbx0), a3.tby0_ = Math.max(t5.tby0, a3.tby0), a3.tbx1_ = Math.min(t5.tbx1, a3.tbx1), a3.tby1_ = Math.min(t5.tby1, a3.tby1), o4 = Math.floor((a3.tbx0_ - t5.tbx0) / m3.precinctWidthInSubband) + Math.floor((a3.tby0_ - t5.tby0) / m3.precinctHeightInSubband) * m3.numprecinctswide, a3.precinctNumber = o4, a3.subbandType = t5.type, a3.Lblock = 3, !(a3.tbx1_ <= a3.tbx0_) && !(a3.tby1_ <= a3.tby0_)) {
              g3.push(a3);
              var y3 = v3[o4];
              void 0 !== y3 ? (n4 < y3.cbxMin ? y3.cbxMin = n4 : n4 > y3.cbxMax && (y3.cbxMax = n4), i4 < y3.cbyMin ? y3.cbxMin = i4 : i4 > y3.cbyMax && (y3.cbyMax = i4)) : v3[o4] = y3 = { cbxMin: n4, cbyMin: i4, cbxMax: n4, cbyMax: i4 }, a3.precinct = y3;
            }
            t5.codeblockParameters = { codeblockWidth: s3, codeblockHeight: c3, numcodeblockwide: d3 - h3 + 1, numcodeblockhigh: p3 - u3 + 1 }, t5.codeblocks = g3, t5.precincts = v3;
          }
          function i3(e5, t5, r4) {
            for (var n4 = [], i4 = e5.subbands, a3 = 0, o4 = i4.length; a3 < o4; a3++) for (var s3 = i4[a3].codeblocks, c3 = 0, l4 = s3.length; c3 < l4; c3++) {
              var f4 = s3[c3];
              f4.precinctNumber === t5 && n4.push(f4);
            }
            return { layerNumber: r4, codeblocks: n4 };
          }
          function o3(e5) {
            for (var t5 = e5.SIZ, r4 = e5.currentTile.index, n4 = e5.tiles[r4], a3 = n4.codingStyleDefaultParameters.layersCount, o4 = t5.Csiz, s3 = 0, c3 = 0; c3 < o4; c3++) s3 = Math.max(s3, n4.components[c3].codingStyleParameters.decompositionLevelsCount);
            var l4 = 0, f4 = 0, h3 = 0, u3 = 0;
            this.nextPacket = function() {
              for (; l4 < a3; l4++) {
                for (; f4 <= s3; f4++) {
                  for (; h3 < o4; h3++) {
                    var e6 = n4.components[h3];
                    if (!(f4 > e6.codingStyleParameters.decompositionLevelsCount)) {
                      for (var t6 = e6.resolutions[f4], r5 = t6.precinctParameters.numprecincts; u3 < r5; ) {
                        var c4 = i3(t6, u3, l4);
                        return u3++, c4;
                      }
                      u3 = 0;
                    }
                  }
                  h3 = 0;
                }
                f4 = 0;
              }
              throw Error("JPX Error: Out of packets");
            };
          }
          function l3(e5) {
            for (var t5 = e5.SIZ, r4 = e5.currentTile.index, n4 = e5.tiles[r4], a3 = n4.codingStyleDefaultParameters.layersCount, o4 = t5.Csiz, s3 = 0, c3 = 0; c3 < o4; c3++) s3 = Math.max(s3, n4.components[c3].codingStyleParameters.decompositionLevelsCount);
            var l4 = 0, f4 = 0, h3 = 0, u3 = 0;
            this.nextPacket = function() {
              for (; l4 <= s3; l4++) {
                for (; f4 < a3; f4++) {
                  for (; h3 < o4; h3++) {
                    var e6 = n4.components[h3];
                    if (!(l4 > e6.codingStyleParameters.decompositionLevelsCount)) {
                      for (var t6 = e6.resolutions[l4], r5 = t6.precinctParameters.numprecincts; u3 < r5; ) {
                        var c4 = i3(t6, u3, f4);
                        return u3++, c4;
                      }
                      u3 = 0;
                    }
                  }
                  h3 = 0;
                }
                f4 = 0;
              }
              throw Error("JPX Error: Out of packets");
            };
          }
          function f3(e5) {
            var t5, r4, n4, a3, o4 = e5.SIZ, s3 = e5.currentTile.index, c3 = e5.tiles[s3], l4 = c3.codingStyleDefaultParameters.layersCount, f4 = o4.Csiz, h3 = 0;
            for (n4 = 0; n4 < f4; n4++) {
              var u3 = c3.components[n4];
              h3 = Math.max(h3, u3.codingStyleParameters.decompositionLevelsCount);
            }
            var d3 = new Int32Array(h3 + 1);
            for (r4 = 0; r4 <= h3; ++r4) {
              var p3 = 0;
              for (n4 = 0; n4 < f4; ++n4) {
                var m3 = c3.components[n4].resolutions;
                r4 < m3.length && (p3 = Math.max(p3, m3[r4].precinctParameters.numprecincts));
              }
              d3[r4] = p3;
            }
            t5 = 0, r4 = 0, n4 = 0, a3 = 0, this.nextPacket = function() {
              for (; r4 <= h3; r4++) {
                for (; a3 < d3[r4]; a3++) {
                  for (; n4 < f4; n4++) {
                    var e6 = c3.components[n4];
                    if (!(r4 > e6.codingStyleParameters.decompositionLevelsCount)) {
                      var o5 = e6.resolutions[r4], s4 = o5.precinctParameters.numprecincts;
                      if (!(a3 >= s4)) {
                        for (; t5 < l4; ) {
                          var u4 = i3(o5, a3, t5);
                          return t5++, u4;
                        }
                        t5 = 0;
                      }
                    }
                  }
                  n4 = 0;
                }
                a3 = 0;
              }
              throw Error("JPX Error: Out of packets");
            };
          }
          function d2(e5) {
            var t5 = e5.SIZ, r4 = e5.currentTile.index, n4 = e5.tiles[r4], a3 = n4.codingStyleDefaultParameters.layersCount, o4 = t5.Csiz, s3 = g2(n4), c3 = 0, l4 = 0, f4 = 0, h3 = 0, u3 = 0;
            this.nextPacket = function() {
              for (; u3 < s3.maxNumHigh; u3++) {
                for (; h3 < s3.maxNumWide; h3++) {
                  for (; f4 < o4; f4++) {
                    for (var e6 = n4.components[f4], t6 = e6.codingStyleParameters.decompositionLevelsCount; l4 <= t6; l4++) {
                      var r5 = e6.resolutions[l4], d3 = s3.components[f4].resolutions[l4], p3 = m2(h3, u3, d3, s3, r5);
                      if (null !== p3) {
                        for (; c3 < a3; ) {
                          var g3 = i3(r5, p3, c3);
                          return c3++, g3;
                        }
                        c3 = 0;
                      }
                    }
                    l4 = 0;
                  }
                  f4 = 0;
                }
                h3 = 0;
              }
              throw Error("JPX Error: Out of packets");
            };
          }
          function p2(e5) {
            var t5 = e5.SIZ, r4 = e5.currentTile.index, n4 = e5.tiles[r4], a3 = n4.codingStyleDefaultParameters.layersCount, o4 = t5.Csiz, s3 = g2(n4), c3 = 0, l4 = 0, f4 = 0, h3 = 0, u3 = 0;
            this.nextPacket = function() {
              for (; f4 < o4; ++f4) {
                for (var e6 = n4.components[f4], t6 = s3.components[f4], r5 = e6.codingStyleParameters.decompositionLevelsCount; u3 < t6.maxNumHigh; u3++) {
                  for (; h3 < t6.maxNumWide; h3++) {
                    for (; l4 <= r5; l4++) {
                      var d3 = e6.resolutions[l4], p3 = t6.resolutions[l4], g3 = m2(h3, u3, p3, t6, d3);
                      if (null !== g3) {
                        for (; c3 < a3; ) {
                          var v3 = i3(d3, g3, c3);
                          return c3++, v3;
                        }
                        c3 = 0;
                      }
                    }
                    l4 = 0;
                  }
                  h3 = 0;
                }
                u3 = 0;
              }
              throw Error("JPX Error: Out of packets");
            };
          }
          function m2(e5, t5, r4, n4, i4) {
            var a3 = e5 * n4.minWidth, o4 = t5 * n4.minHeight;
            if (a3 % r4.width != 0 || o4 % r4.height != 0) return null;
            var s3 = o4 / r4.width * i4.precinctParameters.numprecinctswide;
            return a3 / r4.height + s3;
          }
          function g2(e5) {
            for (var t5 = e5.components.length, r4 = Number.MAX_VALUE, n4 = Number.MAX_VALUE, i4 = 0, a3 = 0, o4 = Array(t5), s3 = 0; s3 < t5; s3++) {
              for (var c3 = e5.components[s3], l4 = c3.codingStyleParameters.decompositionLevelsCount, f4 = Array(l4 + 1), h3 = Number.MAX_VALUE, u3 = Number.MAX_VALUE, d3 = 0, p3 = 0, m3 = 1, g3 = l4; g3 >= 0; --g3) {
                var v3 = c3.resolutions[g3], y3 = m3 * v3.precinctParameters.precinctWidth, b3 = m3 * v3.precinctParameters.precinctHeight;
                h3 = Math.min(h3, y3), u3 = Math.min(u3, b3), d3 = Math.max(d3, v3.precinctParameters.numprecinctswide), p3 = Math.max(p3, v3.precinctParameters.numprecinctshigh), f4[g3] = { width: y3, height: b3 }, m3 <<= 1;
              }
              r4 = Math.min(r4, h3), n4 = Math.min(n4, u3), i4 = Math.max(i4, d3), a3 = Math.max(a3, p3), o4[s3] = { resolutions: f4, minWidth: h3, minHeight: u3, maxNumWide: d3, maxNumHigh: p3 };
            }
            return { components: o4, minWidth: r4, minHeight: n4, maxNumWide: i4, maxNumHigh: a3 };
          }
          t4.prototype = { parse: function(e5) {
            if (65359 === s2(e5, 0)) {
              this.parseCodestream(e5, 0, e5.length);
              return;
            }
            for (var t5 = 0, r4 = e5.length; t5 < r4; ) {
              var n4 = 8, i4 = c2(e5, t5), a3 = c2(e5, t5 + 4);
              if (t5 += n4, 1 === i4 && (i4 = 4294967296 * c2(e5, t5) + c2(e5, t5 + 4), t5 += 8, n4 += 8), 0 === i4 && (i4 = r4 - t5 + n4), i4 < n4) throw Error("JPX Error: Invalid box field size");
              var o4 = i4 - n4, l4 = true;
              switch (a3) {
                case 1785737832:
                  l4 = false;
                  break;
                case 1668246642:
                  var f4 = e5[t5];
                  if (e5[t5 + 1], e5[t5 + 2], 1 === f4) {
                    var d3 = c2(e5, t5 + 3);
                    switch (d3) {
                      case 16:
                      case 17:
                      case 18:
                        break;
                      default:
                        h2("Unknown colorspace " + d3);
                    }
                  } else 2 === f4 && u2("ICC profile not supported");
                  break;
                case 1785737827:
                  this.parseCodestream(e5, t5, t5 + o4);
                  break;
                case 1783636e3:
                  218793738 !== c2(e5, t5) && h2("Invalid JP2 signature");
                  break;
                case 1783634458:
                case 1718909296:
                case 1920099697:
                case 1919251232:
                case 1768449138:
                  break;
                default:
                  var p3 = String.fromCharCode(a3 >> 24 & 255, a3 >> 16 & 255, a3 >> 8 & 255, 255 & a3);
                  h2("Unsupported header type " + a3 + " (" + p3 + ")");
              }
              l4 && (t5 += o4);
            }
          }, parseImageProperties: function(e5) {
            for (var t5 = e5.getByte(); t5 >= 0; ) if (65361 == (t5 << 8 | (t5 = e5.getByte()))) {
              e5.skip(4);
              var r4 = e5.getInt32() >>> 0, n4 = e5.getInt32() >>> 0, i4 = e5.getInt32() >>> 0, a3 = e5.getInt32() >>> 0;
              e5.skip(16);
              var o4 = e5.getUint16();
              this.width = r4 - i4, this.height = n4 - a3, this.componentsCount = o4, this.bitsPerComponent = 8;
              return;
            }
            throw Error("JPX Error: No size marker found in JPX stream");
          }, parseCodestream: function(t5, i4, u3) {
            var m3 = {};
            try {
              for (var g3 = false, x3 = i4; x3 + 1 < u3; ) {
                var P2 = s2(t5, x3);
                x3 += 2;
                var I2, k2, A2, S2, T2, M2, E2 = 0;
                switch (P2) {
                  case 65359:
                    m3.mainHeader = true;
                    break;
                  case 65497:
                    break;
                  case 65361:
                    E2 = s2(t5, x3);
                    var O2 = {};
                    O2.Xsiz = c2(t5, x3 + 4), O2.Ysiz = c2(t5, x3 + 8), O2.XOsiz = c2(t5, x3 + 12), O2.YOsiz = c2(t5, x3 + 16), O2.XTsiz = c2(t5, x3 + 20), O2.YTsiz = c2(t5, x3 + 24), O2.XTOsiz = c2(t5, x3 + 28), O2.YTOsiz = c2(t5, x3 + 32);
                    var L2 = s2(t5, x3 + 36);
                    O2.Csiz = L2;
                    var D2 = [];
                    I2 = x3 + 38;
                    for (var U2 = 0; U2 < L2; U2++) {
                      var z2, F2, B2 = { precision: (127 & t5[I2]) + 1, isSigned: !!(128 & t5[I2]), XRsiz: t5[I2 + 1], YRsiz: t5[I2 + 1] };
                      z2 = B2, F2 = O2, z2.x0 = Math.ceil(F2.XOsiz / z2.XRsiz), z2.x1 = Math.ceil(F2.Xsiz / z2.XRsiz), z2.y0 = Math.ceil(F2.YOsiz / z2.YRsiz), z2.y1 = Math.ceil(F2.Ysiz / z2.YRsiz), z2.width = z2.x1 - z2.x0, z2.height = z2.y1 - z2.y0, D2.push(B2);
                    }
                    m3.SIZ = O2, m3.components = D2, function(e5, t6) {
                      for (var r4, n4 = e5.SIZ, i5 = [], a3 = Math.ceil((n4.Xsiz - n4.XTOsiz) / n4.XTsiz), o4 = Math.ceil((n4.Ysiz - n4.YTOsiz) / n4.YTsiz), s3 = 0; s3 < o4; s3++) for (var c3 = 0; c3 < a3; c3++) (r4 = {}).tx0 = Math.max(n4.XTOsiz + c3 * n4.XTsiz, n4.XOsiz), r4.ty0 = Math.max(n4.YTOsiz + s3 * n4.YTsiz, n4.YOsiz), r4.tx1 = Math.min(n4.XTOsiz + (c3 + 1) * n4.XTsiz, n4.Xsiz), r4.ty1 = Math.min(n4.YTOsiz + (s3 + 1) * n4.YTsiz, n4.Ysiz), r4.width = r4.tx1 - r4.tx0, r4.height = r4.ty1 - r4.ty0, r4.components = [], i5.push(r4);
                      e5.tiles = i5;
                      for (var l4 = n4.Csiz, f4 = 0; f4 < l4; f4++) for (var h3 = t6[f4], u4 = 0, d3 = i5.length; u4 < d3; u4++) {
                        var p3 = {};
                        r4 = i5[u4], p3.tcx0 = Math.ceil(r4.tx0 / h3.XRsiz), p3.tcy0 = Math.ceil(r4.ty0 / h3.YRsiz), p3.tcx1 = Math.ceil(r4.tx1 / h3.XRsiz), p3.tcy1 = Math.ceil(r4.ty1 / h3.YRsiz), p3.width = p3.tcx1 - p3.tcx0, p3.height = p3.tcy1 - p3.tcy0, r4.components[f4] = p3;
                      }
                    }(m3, D2), m3.QCC = [], m3.COC = [];
                    break;
                  case 65372:
                    E2 = s2(t5, x3);
                    var $2 = {};
                    switch (I2 = x3 + 2, k2 = t5[I2++], 31 & k2) {
                      case 0:
                        S2 = 8, T2 = true;
                        break;
                      case 1:
                        S2 = 16, T2 = false;
                        break;
                      case 2:
                        S2 = 16, T2 = true;
                        break;
                      default:
                        throw Error("JPX Error: Invalid SQcd value " + k2);
                    }
                    for ($2.noQuantization = 8 === S2, $2.scalarExpounded = T2, $2.guardBits = k2 >> 5, A2 = []; I2 < E2 + x3; ) {
                      var R2 = {};
                      8 === S2 ? (R2.epsilon = t5[I2++] >> 3, R2.mu = 0) : (R2.epsilon = t5[I2] >> 3, R2.mu = (7 & t5[I2]) << 8 | t5[I2 + 1], I2 += 2), A2.push(R2);
                    }
                    $2.SPqcds = A2, m3.mainHeader ? m3.QCD = $2 : (m3.currentTile.QCD = $2, m3.currentTile.QCC = []);
                    break;
                  case 65373:
                    E2 = s2(t5, x3);
                    var _2, q2 = {};
                    switch (I2 = x3 + 2, m3.SIZ.Csiz < 257 ? _2 = t5[I2++] : (_2 = s2(t5, I2), I2 += 2), k2 = t5[I2++], 31 & k2) {
                      case 0:
                        S2 = 8, T2 = true;
                        break;
                      case 1:
                        S2 = 16, T2 = false;
                        break;
                      case 2:
                        S2 = 16, T2 = true;
                        break;
                      default:
                        throw Error("JPX Error: Invalid SQcd value " + k2);
                    }
                    for (q2.noQuantization = 8 === S2, q2.scalarExpounded = T2, q2.guardBits = k2 >> 5, A2 = []; I2 < E2 + x3; ) R2 = {}, 8 === S2 ? (R2.epsilon = t5[I2++] >> 3, R2.mu = 0) : (R2.epsilon = t5[I2] >> 3, R2.mu = (7 & t5[I2]) << 8 | t5[I2 + 1], I2 += 2), A2.push(R2);
                    q2.SPqcds = A2, m3.mainHeader ? m3.QCC[_2] = q2 : m3.currentTile.QCC[_2] = q2;
                    break;
                  case 65362:
                    E2 = s2(t5, x3);
                    var J2 = {};
                    I2 = x3 + 2;
                    var N2 = t5[I2++];
                    J2.entropyCoderWithCustomPrecincts = !!(1 & N2), J2.sopMarkerUsed = !!(2 & N2), J2.ephMarkerUsed = !!(4 & N2), J2.progressionOrder = t5[I2++], J2.layersCount = s2(t5, I2), I2 += 2, J2.multipleComponentTransform = t5[I2++], J2.decompositionLevelsCount = t5[I2++], J2.xcb = (15 & t5[I2++]) + 2, J2.ycb = (15 & t5[I2++]) + 2;
                    var X2 = t5[I2++];
                    if (J2.selectiveArithmeticCodingBypass = !!(1 & X2), J2.resetContextProbabilities = !!(2 & X2), J2.terminationOnEachCodingPass = !!(4 & X2), J2.verticalyStripe = !!(8 & X2), J2.predictableTermination = !!(16 & X2), J2.segmentationSymbolUsed = !!(32 & X2), J2.reversibleTransformation = t5[I2++], J2.entropyCoderWithCustomPrecincts) {
                      for (var H2 = []; I2 < E2 + x3; ) {
                        var G = t5[I2++];
                        H2.push({ PPx: 15 & G, PPy: G >> 4 });
                      }
                      J2.precinctsSizes = H2;
                    }
                    var Y = [];
                    if (J2.selectiveArithmeticCodingBypass && Y.push("selectiveArithmeticCodingBypass"), J2.resetContextProbabilities && Y.push("resetContextProbabilities"), J2.terminationOnEachCodingPass && Y.push("terminationOnEachCodingPass"), J2.verticalyStripe && Y.push("verticalyStripe"), J2.predictableTermination && Y.push("predictableTermination"), Y.length > 0) throw g3 = true, Error("JPX Error: Unsupported COD options (" + Y.join(", ") + ")");
                    m3.mainHeader ? m3.COD = J2 : (m3.currentTile.COD = J2, m3.currentTile.COC = []);
                    break;
                  case 65424:
                    E2 = s2(t5, x3), (M2 = {}).index = s2(t5, x3 + 2), M2.length = c2(t5, x3 + 4), M2.dataEnd = M2.length + x3 - 2, M2.partIndex = t5[x3 + 8], M2.partsCount = t5[x3 + 9], m3.mainHeader = false, 0 === M2.partIndex && (M2.COD = m3.COD, M2.COC = m3.COC.slice(0), M2.QCD = m3.QCD, M2.QCC = m3.QCC.slice(0)), m3.currentTile = M2;
                    break;
                  case 65427:
                    M2 = m3.currentTile, 0 === M2.partIndex && (function(e5, t6) {
                      for (var r4 = e5.SIZ.Csiz, n4 = e5.tiles[t6], i5 = 0; i5 < r4; i5++) {
                        var a3 = n4.components[i5], o4 = void 0 !== e5.currentTile.QCC[i5] ? e5.currentTile.QCC[i5] : e5.currentTile.QCD;
                        a3.quantizationParameters = o4;
                        var s3 = void 0 !== e5.currentTile.COC[i5] ? e5.currentTile.COC[i5] : e5.currentTile.COD;
                        a3.codingStyleParameters = s3;
                      }
                      n4.codingStyleDefaultParameters = e5.currentTile.COD;
                    }(m3, M2.index), function(e5) {
                      for (var t6 = e5.SIZ, r4 = e5.currentTile.index, i5 = e5.tiles[r4], a3 = t6.Csiz, s3 = 0; s3 < a3; s3++) {
                        for (var c3 = i5.components[s3], h3 = c3.codingStyleParameters.decompositionLevelsCount, u4 = [], m4 = [], g4 = 0; g4 <= h3; g4++) {
                          var v3, y3 = function(e6, t7, r5) {
                            var n4 = t7.codingStyleParameters, i6 = {};
                            return n4.entropyCoderWithCustomPrecincts ? (i6.PPx = n4.precinctsSizes[r5].PPx, i6.PPy = n4.precinctsSizes[r5].PPy) : (i6.PPx = 15, i6.PPy = 15), i6.xcb_ = r5 > 0 ? Math.min(n4.xcb, i6.PPx - 1) : Math.min(n4.xcb, i6.PPx), i6.ycb_ = r5 > 0 ? Math.min(n4.ycb, i6.PPy - 1) : Math.min(n4.ycb, i6.PPy), i6;
                          }(0, c3, g4), b3 = {}, x4 = 1 << h3 - g4;
                          if (b3.trx0 = Math.ceil(c3.tcx0 / x4), b3.try0 = Math.ceil(c3.tcy0 / x4), b3.trx1 = Math.ceil(c3.tcx1 / x4), b3.try1 = Math.ceil(c3.tcy1 / x4), b3.resLevel = g4, function(e6, t7, r5) {
                            var n4 = 1 << r5.PPx, i6 = 1 << r5.PPy, a4 = 0 === t7.resLevel, o4 = 1 << r5.PPx + (a4 ? 0 : -1), s4 = 1 << r5.PPy + (a4 ? 0 : -1), c4 = t7.trx1 > t7.trx0 ? Math.ceil(t7.trx1 / n4) - Math.floor(t7.trx0 / n4) : 0, l4 = t7.try1 > t7.try0 ? Math.ceil(t7.try1 / i6) - Math.floor(t7.try0 / i6) : 0;
                            t7.precinctParameters = { precinctWidth: n4, precinctHeight: i6, numprecinctswide: c4, numprecinctshigh: l4, numprecincts: c4 * l4, precinctWidthInSubband: o4, precinctHeightInSubband: s4 };
                          }(0, b3, y3), u4.push(b3), 0 === g4) (v3 = {}).type = "LL", v3.tbx0 = Math.ceil(c3.tcx0 / x4), v3.tby0 = Math.ceil(c3.tcy0 / x4), v3.tbx1 = Math.ceil(c3.tcx1 / x4), v3.tby1 = Math.ceil(c3.tcy1 / x4), v3.resolution = b3, n3(e5, v3, y3), m4.push(v3), b3.subbands = [v3];
                          else {
                            var w3 = 1 << h3 - g4 + 1, C3 = [];
                            (v3 = {}).type = "HL", v3.tbx0 = Math.ceil(c3.tcx0 / w3 - 0.5), v3.tby0 = Math.ceil(c3.tcy0 / w3), v3.tbx1 = Math.ceil(c3.tcx1 / w3 - 0.5), v3.tby1 = Math.ceil(c3.tcy1 / w3), v3.resolution = b3, n3(e5, v3, y3), m4.push(v3), C3.push(v3), (v3 = {}).type = "LH", v3.tbx0 = Math.ceil(c3.tcx0 / w3), v3.tby0 = Math.ceil(c3.tcy0 / w3 - 0.5), v3.tbx1 = Math.ceil(c3.tcx1 / w3), v3.tby1 = Math.ceil(c3.tcy1 / w3 - 0.5), v3.resolution = b3, n3(e5, v3, y3), m4.push(v3), C3.push(v3), (v3 = {}).type = "HH", v3.tbx0 = Math.ceil(c3.tcx0 / w3 - 0.5), v3.tby0 = Math.ceil(c3.tcy0 / w3 - 0.5), v3.tbx1 = Math.ceil(c3.tcx1 / w3 - 0.5), v3.tby1 = Math.ceil(c3.tcy1 / w3 - 0.5), v3.resolution = b3, n3(e5, v3, y3), m4.push(v3), C3.push(v3), b3.subbands = C3;
                          }
                        }
                        c3.resolutions = u4, c3.subbands = m4;
                      }
                      var P3 = i5.codingStyleDefaultParameters.progressionOrder;
                      switch (P3) {
                        case 0:
                          i5.packetsIterator = new o3(e5);
                          break;
                        case 1:
                          i5.packetsIterator = new l3(e5);
                          break;
                        case 2:
                          i5.packetsIterator = new f3(e5);
                          break;
                        case 3:
                          i5.packetsIterator = new d2(e5);
                          break;
                        case 4:
                          i5.packetsIterator = new p2(e5);
                          break;
                        default:
                          throw Error("JPX Error: Unsupported progression order " + P3);
                      }
                    }(m3)), E2 = M2.dataEnd - x3, function(e5, t6, r4, n4) {
                      var i5, o4 = 0, s3 = 0, c3 = false;
                      function l4(e6) {
                        for (; s3 < e6; ) {
                          var n5 = t6[r4 + o4];
                          o4++, c3 ? (i5 = i5 << 7 | n5, s3 += 7, c3 = false) : (i5 = i5 << 8 | n5, s3 += 8), 255 === n5 && (c3 = true);
                        }
                        return s3 -= e6, i5 >>> s3 & (1 << e6) - 1;
                      }
                      function f4(e6) {
                        return 255 === t6[r4 + o4 - 1] && t6[r4 + o4] === e6 ? (o4 += 1, true) : 255 === t6[r4 + o4] && t6[r4 + o4 + 1] === e6 && (o4 += 2, true);
                      }
                      function h3() {
                        s3 = 0, c3 && (o4++, c3 = false);
                      }
                      for (var u4 = e5.currentTile.index, d3 = e5.tiles[u4], p3 = e5.COD.sopMarkerUsed, m4 = e5.COD.ephMarkerUsed, g4 = d3.packetsIterator; o4 < n4; ) {
                        h3(), p3 && f4(145) && (o4 += 4);
                        var b3 = g4.nextPacket();
                        if (l4(1)) {
                          for (var x4, w3 = b3.layerNumber, C3 = [], P3 = 0, I3 = b3.codeblocks.length; P3 < I3; P3++) {
                            var k3 = (x4 = b3.codeblocks[P3]).precinct, A3 = x4.cbx - k3.cbxMin, S3 = x4.cby - k3.cbyMin, T3 = false, M3 = false;
                            if (void 0 !== x4.included) T3 = !!l4(1);
                            else {
                              if (void 0 !== (k3 = x4.precinct).inclusionTree) O3 = k3.inclusionTree;
                              else {
                                var E3, O3, L3, D3 = k3.cbxMax - k3.cbxMin + 1, U3 = k3.cbyMax - k3.cbyMin + 1;
                                O3 = new y2(D3, U3, w3), L3 = new v2(D3, U3), k3.inclusionTree = O3, k3.zeroBitPlanesTree = L3;
                              }
                              if (O3.reset(A3, S3, w3)) for (; ; ) if (l4(1)) {
                                if (!O3.nextLevel()) {
                                  x4.included = true, T3 = M3 = true;
                                  break;
                                }
                              } else {
                                O3.incrementValue(w3);
                                break;
                              }
                            }
                            if (T3) {
                              if (M3) {
                                for ((L3 = k3.zeroBitPlanesTree).reset(A3, S3); ; ) if (l4(1)) {
                                  if (!L3.nextLevel()) break;
                                } else L3.incrementValue();
                                x4.zeroBitPlanes = L3.value;
                              }
                              for (var z3 = function() {
                                if (0 === l4(1)) return 1;
                                if (0 === l4(1)) return 2;
                                var e6 = l4(2);
                                return e6 < 3 ? e6 + 3 : (e6 = l4(5)) < 31 ? e6 + 6 : (e6 = l4(7)) + 37;
                              }(); l4(1); ) x4.Lblock++;
                              var F3 = a2(z3), B3 = l4((z3 < 1 << F3 ? F3 - 1 : F3) + x4.Lblock);
                              C3.push({ codeblock: x4, codingpasses: z3, dataLength: B3 });
                            }
                          }
                          for (h3(), m4 && f4(146); C3.length > 0; ) {
                            var $3 = C3.shift();
                            void 0 === (x4 = $3.codeblock).data && (x4.data = []), x4.data.push({ data: t6, start: r4 + o4, end: r4 + o4 + $3.dataLength, codingpasses: $3.codingpasses }), o4 += $3.dataLength;
                          }
                        }
                      }
                    }(m3, t5, x3, E2);
                    break;
                  case 65365:
                  case 65367:
                  case 65368:
                  case 65380:
                    E2 = s2(t5, x3);
                    break;
                  case 65363:
                    throw Error("JPX Error: Codestream code 0xFF53 (COC) is not implemented");
                  default:
                    throw Error("JPX Error: Unknown codestream code: " + P2.toString(16));
                }
                x3 += E2;
              }
            } catch (e5) {
              if (g3 || this.failOnCorruptedImage) throw e5;
              h2("Trying to recover from " + e5.message);
            }
            this.tiles = function(t6) {
              for (var n4 = t6.SIZ, i5 = t6.components, a3 = n4.Csiz, o4 = [], s3 = 0, c3 = t6.tiles.length; s3 < c3; s3++) {
                var l4 = t6.tiles[s3], f4 = [];
                for (h3 = 0; h3 < a3; h3++) f4[h3] = function(t7, n5, i6) {
                  for (var a4 = n5.components[i6], o5 = a4.codingStyleParameters, s4 = a4.quantizationParameters, c4 = o5.decompositionLevelsCount, l5 = s4.SPqcds, f5 = s4.scalarExpounded, h4 = s4.guardBits, u5 = o5.segmentationSymbolUsed, d4 = t7.components[i6].precision, p4 = o5.reversibleTransformation, m5 = p4 ? new C2() : new w2(), g5 = [], v4 = 0, y4 = 0; y4 <= c4; y4++) {
                    for (var x5 = a4.resolutions[y4], P4 = x5.trx1 - x5.trx0, I4 = x5.try1 - x5.try0, k4 = new Float32Array(P4 * I4), A4 = 0, S4 = x5.subbands.length; A4 < S4; A4++) {
                      f5 ? (T4 = l5[v4].mu, M4 = l5[v4].epsilon, v4++) : (T4 = l5[0].mu, M4 = l5[0].epsilon + (y4 > 0 ? 1 - y4 : 0));
                      var T4, M4, E4 = x5.subbands[A4], O4 = e4[E4.type];
                      !function(e5, t8, n6, i7, a5, o6, s5, c5) {
                        for (var l6 = i7.tbx0, f6 = i7.tby0, h5 = i7.tbx1 - i7.tbx0, u6 = i7.codeblocks, d5 = "H" === i7.type.charAt(0) ? 1 : 0, p5 = "H" === i7.type.charAt(1) ? t8 : 0, m6 = 0, g6 = u6.length; m6 < g6; ++m6) {
                          var v5, y5, x6, w3, C3, P5, I5, k5, A5 = u6[m6], S5 = A5.tbx1_ - A5.tbx0_, T5 = A5.tby1_ - A5.tby0_;
                          if (0 !== S5 && 0 !== T5 && void 0 !== A5.data) {
                            v5 = new b2(S5, T5, A5.subbandType, A5.zeroBitPlanes, o6), y5 = 2;
                            var M5 = A5.data, E5 = 0, O5 = 0;
                            for (x6 = 0, w3 = M5.length; x6 < w3; x6++) E5 += (C3 = M5[x6]).end - C3.start, O5 += C3.codingpasses;
                            var L5 = new Uint8Array(E5), D4 = 0;
                            for (x6 = 0, w3 = M5.length; x6 < w3; x6++) {
                              var U4 = (C3 = M5[x6]).data.subarray(C3.start, C3.end);
                              L5.set(U4, D4), D4 += U4.length;
                            }
                            var z4 = new r3(L5, 0, E5);
                            for (v5.setDecoder(z4), x6 = 0; x6 < O5; x6++) {
                              switch (y5) {
                                case 0:
                                  v5.runSignificancePropogationPass();
                                  break;
                                case 1:
                                  v5.runMagnitudeRefinementPass();
                                  break;
                                case 2:
                                  v5.runCleanupPass(), c5 && v5.checkSegmentationSymbol();
                              }
                              y5 = (y5 + 1) % 3;
                            }
                            var F4 = A5.tbx0_ - l6 + (A5.tby0_ - f6) * h5, B4 = v5.coefficentsSign, $4 = v5.coefficentsMagnitude, R4 = v5.bitsDecoded, _4 = s5 ? 0 : 0.5;
                            D4 = 0;
                            var q4 = "LL" !== i7.type;
                            for (x6 = 0; x6 < T5; x6++) {
                              var J3 = 2 * (F4 / h5 | 0) * (t8 - h5) + d5 + p5;
                              for (P5 = 0; P5 < S5; P5++) {
                                if (0 !== (I5 = $4[D4])) {
                                  I5 = (I5 + _4) * a5, 0 !== B4[D4] && (I5 = -I5), k5 = R4[D4];
                                  var N3 = q4 ? J3 + (F4 << 1) : F4;
                                  s5 && k5 >= o6 ? e5[N3] = I5 : e5[N3] = I5 * (1 << o6 - k5);
                                }
                                F4++, D4++;
                              }
                              F4 += h5 - S5;
                            }
                          }
                        }
                      }(k4, P4, 0, E4, p4 ? 1 : Math.pow(2, d4 + O4 - M4) * (1 + T4 / 2048), h4 + M4 - 1, p4, u5);
                    }
                    g5.push({ width: P4, height: I4, items: k4 });
                  }
                  var L4 = m5.calculate(g5, a4.tcx0, a4.tcy0);
                  return { left: a4.tcx0, top: a4.tcy0, width: L4.width, height: L4.height, items: L4.items };
                }(t6, l4, h3);
                var h3, u4, d3, p3, m4, g4, v3, y3, x4, P3, I3, k3, A3, S3, T3, M3, E3 = f4[0], O3 = new Uint8Array(E3.items.length * a3), L3 = { left: E3.left, top: E3.top, width: E3.width, height: E3.height, items: O3 }, D3 = 0;
                if (l4.codingStyleDefaultParameters.multipleComponentTransform) {
                  var U3 = 4 === a3, z3 = f4[0].items, F3 = f4[1].items, B3 = f4[2].items, $3 = U3 ? f4[3].items : null;
                  d3 = (128 << (u4 = i5[0].precision - 8)) + 0.5, m4 = -(g4 = 0.5 * (p3 = 255 * (1 << u4)));
                  var R3 = l4.components[0], _3 = a3 - 3;
                  if (y3 = z3.length, R3.codingStyleParameters.reversibleTransformation) for (v3 = 0; v3 < y3; v3++, D3 += _3) x4 = z3[v3] + d3, P3 = F3[v3], k3 = (A3 = x4 - ((I3 = B3[v3]) + P3 >> 2)) + I3, S3 = A3 + P3, O3[D3++] = k3 <= 0 ? 0 : k3 >= p3 ? 255 : k3 >> u4, O3[D3++] = A3 <= 0 ? 0 : A3 >= p3 ? 255 : A3 >> u4, O3[D3++] = S3 <= 0 ? 0 : S3 >= p3 ? 255 : S3 >> u4;
                  else for (v3 = 0; v3 < y3; v3++, D3 += _3) x4 = z3[v3] + d3, P3 = F3[v3], k3 = x4 + 1.402 * (I3 = B3[v3]), A3 = x4 - 0.34413 * P3 - 0.71414 * I3, S3 = x4 + 1.772 * P3, O3[D3++] = k3 <= 0 ? 0 : k3 >= p3 ? 255 : k3 >> u4, O3[D3++] = A3 <= 0 ? 0 : A3 >= p3 ? 255 : A3 >> u4, O3[D3++] = S3 <= 0 ? 0 : S3 >= p3 ? 255 : S3 >> u4;
                  if (U3) for (v3 = 0, D3 = 3; v3 < y3; v3++, D3 += 4) T3 = $3[v3], O3[D3] = T3 <= m4 ? 0 : T3 >= g4 ? 255 : T3 + d3 >> u4;
                } else for (h3 = 0; h3 < a3; h3++) {
                  var q3 = f4[h3].items;
                  for (d3 = (128 << (u4 = i5[h3].precision - 8)) + 0.5, m4 = -(p3 = 127.5 * (1 << u4)), D3 = h3, v3 = 0, y3 = q3.length; v3 < y3; v3++) M3 = q3[v3], O3[D3] = M3 <= m4 ? 0 : M3 >= p3 ? 255 : M3 + d3 >> u4, D3 += a3;
                }
                o4.push(L3);
              }
              return o4;
            }(m3), this.width = m3.SIZ.Xsiz - m3.SIZ.XOsiz, this.height = m3.SIZ.Ysiz - m3.SIZ.YOsiz, this.componentsCount = m3.SIZ.Csiz;
          } };
          var v2 = function() {
            function e5(e6, t5) {
              var r4 = a2(Math.max(e6, t5)) + 1;
              this.levels = [];
              for (var n4 = 0; n4 < r4; n4++) {
                var i4 = { width: e6, height: t5, items: [] };
                this.levels.push(i4), e6 = Math.ceil(e6 / 2), t5 = Math.ceil(t5 / 2);
              }
            }
            return e5.prototype = { reset: function(e6, t5) {
              for (var r4, n4 = 0, i4 = 0; n4 < this.levels.length; ) {
                var a3 = e6 + t5 * (r4 = this.levels[n4]).width;
                if (void 0 !== r4.items[a3]) {
                  i4 = r4.items[a3];
                  break;
                }
                r4.index = a3, e6 >>= 1, t5 >>= 1, n4++;
              }
              n4--, (r4 = this.levels[n4]).items[r4.index] = i4, this.currentLevel = n4, delete this.value;
            }, incrementValue: function() {
              var e6 = this.levels[this.currentLevel];
              e6.items[e6.index]++;
            }, nextLevel: function() {
              var e6 = this.currentLevel, t5 = this.levels[e6], r4 = t5.items[t5.index];
              return --e6 < 0 ? (this.value = r4, false) : (this.currentLevel = e6, (t5 = this.levels[e6]).items[t5.index] = r4, true);
            } }, e5;
          }(), y2 = function() {
            function e5(e6, t5, r4) {
              var n4 = a2(Math.max(e6, t5)) + 1;
              this.levels = [];
              for (var i4 = 0; i4 < n4; i4++) {
                for (var o4 = new Uint8Array(e6 * t5), s3 = 0, c3 = o4.length; s3 < c3; s3++) o4[s3] = r4;
                var l4 = { width: e6, height: t5, items: o4 };
                this.levels.push(l4), e6 = Math.ceil(e6 / 2), t5 = Math.ceil(t5 / 2);
              }
            }
            return e5.prototype = { reset: function(e6, t5, r4) {
              for (var n4 = 0; n4 < this.levels.length; ) {
                var i4 = this.levels[n4], a3 = e6 + t5 * i4.width;
                i4.index = a3;
                var o4 = i4.items[a3];
                if (255 === o4) break;
                if (o4 > r4) return this.currentLevel = n4, this.propagateValues(), false;
                e6 >>= 1, t5 >>= 1, n4++;
              }
              return this.currentLevel = n4 - 1, true;
            }, incrementValue: function(e6) {
              var t5 = this.levels[this.currentLevel];
              t5.items[t5.index] = e6 + 1, this.propagateValues();
            }, propagateValues: function() {
              for (var e6 = this.currentLevel, t5 = this.levels[e6], r4 = t5.items[t5.index]; --e6 >= 0; ) (t5 = this.levels[e6]).items[t5.index] = r4;
            }, nextLevel: function() {
              var e6 = this.currentLevel, t5 = this.levels[e6], r4 = t5.items[t5.index];
              return t5.items[t5.index] = 255, !(--e6 < 0) && (this.currentLevel = e6, (t5 = this.levels[e6]).items[t5.index] = r4, true);
            } }, e5;
          }(), b2 = function() {
            var e5 = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]), t5 = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]), r4 = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);
            function n4(n5, i4, a3, o4, s3) {
              this.width = n5, this.height = i4, this.contextLabelTable = "HH" === a3 ? r4 : "HL" === a3 ? t5 : e5;
              var c3 = n5 * i4;
              this.neighborsSignificance = new Uint8Array(c3), this.coefficentsSign = new Uint8Array(c3), this.coefficentsMagnitude = s3 > 14 ? new Uint32Array(c3) : s3 > 6 ? new Uint16Array(c3) : new Uint8Array(c3), this.processingFlags = new Uint8Array(c3);
              var l4 = new Uint8Array(c3);
              if (0 !== o4) for (var f4 = 0; f4 < c3; f4++) l4[f4] = o4;
              this.bitsDecoded = l4, this.reset();
            }
            return n4.prototype = { setDecoder: function(e6) {
              this.decoder = e6;
            }, reset: function() {
              this.contexts = new Int8Array(19), this.contexts[0] = 8, this.contexts[17] = 92, this.contexts[18] = 6;
            }, setNeighborsSignificance: function(e6, t6, r5) {
              var n5, i4 = this.neighborsSignificance, a3 = this.width, o4 = this.height, s3 = t6 > 0, c3 = t6 + 1 < a3;
              e6 > 0 && (n5 = r5 - a3, s3 && (i4[n5 - 1] += 16), c3 && (i4[n5 + 1] += 16), i4[n5] += 4), e6 + 1 < o4 && (n5 = r5 + a3, s3 && (i4[n5 - 1] += 16), c3 && (i4[n5 + 1] += 16), i4[n5] += 4), s3 && (i4[r5 - 1] += 1), c3 && (i4[r5 + 1] += 1), i4[r5] |= 128;
            }, runSignificancePropogationPass: function() {
              for (var e6 = this.decoder, t6 = this.width, r5 = this.height, n5 = this.coefficentsMagnitude, i4 = this.coefficentsSign, a3 = this.neighborsSignificance, o4 = this.processingFlags, s3 = this.contexts, c3 = this.contextLabelTable, l4 = this.bitsDecoded, f4 = 0; f4 < r5; f4 += 4) for (var h3 = 0; h3 < t6; h3++) for (var u3 = f4 * t6 + h3, d3 = 0; d3 < 4; d3++, u3 += t6) {
                var p3 = f4 + d3;
                if (p3 >= r5) break;
                if (o4[u3] &= -2, !n5[u3] && a3[u3]) {
                  var m3 = c3[a3[u3]];
                  if (e6.readBit(s3, m3)) {
                    var g3 = this.decodeSignBit(p3, h3, u3);
                    i4[u3] = g3, n5[u3] = 1, this.setNeighborsSignificance(p3, h3, u3), o4[u3] |= 2;
                  }
                  l4[u3]++, o4[u3] |= 1;
                }
              }
            }, decodeSignBit: function(e6, t6, r5) {
              var n5, i4, a3, o4, s3, c3, l4 = this.width, f4 = this.height, h3 = this.coefficentsMagnitude, u3 = this.coefficentsSign;
              o4 = t6 > 0 && 0 !== h3[r5 - 1], t6 + 1 < l4 && 0 !== h3[r5 + 1] ? (a3 = u3[r5 + 1], n5 = o4 ? 1 - a3 - (i4 = u3[r5 - 1]) : 1 - a3 - a3) : n5 = o4 ? 1 - (i4 = u3[r5 - 1]) - i4 : 0;
              var d3 = 3 * n5;
              return o4 = e6 > 0 && 0 !== h3[r5 - l4], e6 + 1 < f4 && 0 !== h3[r5 + l4] ? (a3 = u3[r5 + l4], n5 = o4 ? 1 - a3 - (i4 = u3[r5 - l4]) + d3 : 1 - a3 - a3 + d3) : n5 = o4 ? 1 - (i4 = u3[r5 - l4]) - i4 + d3 : d3, n5 >= 0 ? (s3 = 9 + n5, c3 = this.decoder.readBit(this.contexts, s3)) : (s3 = 9 - n5, c3 = 1 ^ this.decoder.readBit(this.contexts, s3)), c3;
            }, runMagnitudeRefinementPass: function() {
              for (var e6, t6 = this.decoder, r5 = this.width, n5 = this.height, i4 = this.coefficentsMagnitude, a3 = this.neighborsSignificance, o4 = this.contexts, s3 = this.bitsDecoded, c3 = this.processingFlags, l4 = r5 * n5, f4 = 4 * r5, h3 = 0; h3 < l4; h3 = e6) {
                e6 = Math.min(l4, h3 + f4);
                for (var u3 = 0; u3 < r5; u3++) for (var d3 = h3 + u3; d3 < e6; d3 += r5) if (i4[d3] && (1 & c3[d3]) == 0) {
                  var p3 = 16;
                  (2 & c3[d3]) != 0 && (c3[d3] ^= 2, p3 = 0 == (127 & a3[d3]) ? 15 : 14);
                  var m3 = t6.readBit(o4, p3);
                  i4[d3] = i4[d3] << 1 | m3, s3[d3]++, c3[d3] |= 1;
                }
              }
            }, runCleanupPass: function() {
              for (var e6 = this.decoder, t6 = this.width, r5 = this.height, n5 = this.neighborsSignificance, i4 = this.coefficentsMagnitude, a3 = this.coefficentsSign, o4 = this.contexts, s3 = this.contextLabelTable, c3 = this.bitsDecoded, l4 = this.processingFlags, f4 = 2 * t6, h3 = 3 * t6, u3 = 0; u3 < r5; u3 = g3) {
                g3 = Math.min(u3 + 4, r5);
                for (var d3 = u3 * t6, p3 = u3 + 3 < r5, m3 = 0; m3 < t6; m3++) {
                  var g3, v3, y3 = d3 + m3, b3 = p3 && 0 === l4[y3] && 0 === l4[y3 + t6] && 0 === l4[y3 + f4] && 0 === l4[y3 + h3] && 0 === n5[y3] && 0 === n5[y3 + t6] && 0 === n5[y3 + f4] && 0 === n5[y3 + h3], x3 = 0, w3 = y3, C3 = u3;
                  if (b3) {
                    if (!e6.readBit(o4, 18)) {
                      c3[y3]++, c3[y3 + t6]++, c3[y3 + f4]++, c3[y3 + h3]++;
                      continue;
                    }
                    0 != (x3 = e6.readBit(o4, 17) << 1 | e6.readBit(o4, 17)) && (C3 = u3 + x3, w3 += x3 * t6), v3 = this.decodeSignBit(C3, m3, w3), a3[w3] = v3, i4[w3] = 1, this.setNeighborsSignificance(C3, m3, w3), l4[w3] |= 2, w3 = y3;
                    for (var P2 = u3; P2 <= C3; P2++, w3 += t6) c3[w3]++;
                    x3++;
                  }
                  for (C3 = u3 + x3; C3 < g3; C3++, w3 += t6) if (!i4[w3] && (1 & l4[w3]) == 0) {
                    var I2 = s3[n5[w3]];
                    1 === e6.readBit(o4, I2) && (v3 = this.decodeSignBit(C3, m3, w3), a3[w3] = v3, i4[w3] = 1, this.setNeighborsSignificance(C3, m3, w3), l4[w3] |= 2), c3[w3]++;
                  }
                }
              }
            }, checkSegmentationSymbol: function() {
              var e6 = this.decoder, t6 = this.contexts;
              if (10 != (e6.readBit(t6, 17) << 3 | e6.readBit(t6, 17) << 2 | e6.readBit(t6, 17) << 1 | e6.readBit(t6, 17))) throw Error("JPX Error: Invalid segmentation symbol");
            } }, n4;
          }(), x2 = function() {
            function e5() {
            }
            return e5.prototype.calculate = function(e6, t5, r4) {
              for (var n4 = e6[0], i4 = 1, a3 = e6.length; i4 < a3; i4++) n4 = this.iterate(n4, e6[i4], t5, r4);
              return n4;
            }, e5.prototype.extend = function(e6, t5, r4) {
              var n4 = t5 - 1, i4 = t5 + 1, a3 = t5 + r4 - 2, o4 = t5 + r4;
              e6[n4--] = e6[i4++], e6[o4++] = e6[a3--], e6[n4--] = e6[i4++], e6[o4++] = e6[a3--], e6[n4--] = e6[i4++], e6[o4++] = e6[a3--], e6[n4] = e6[i4], e6[o4] = e6[a3];
            }, e5.prototype.iterate = function(e6, t5, r4, n4) {
              var i4 = e6.width, a3 = e6.height, o4 = e6.items, s3 = t5.width, c3 = t5.height, l4 = t5.items;
              for (m3 = 0, d3 = 0; d3 < a3; d3++) for (p3 = 0, g3 = 2 * d3 * s3; p3 < i4; p3++, m3++, g3 += 2) l4[g3] = o4[m3];
              o4 = e6.items = null;
              var f4 = new Float32Array(s3 + 8);
              if (1 === s3) {
                if ((1 & r4) != 0) for (y3 = 0, m3 = 0; y3 < c3; y3++, m3 += s3) l4[m3] *= 0.5;
              } else for (y3 = 0, m3 = 0; y3 < c3; y3++, m3 += s3) f4.set(l4.subarray(m3, m3 + s3), 4), this.extend(f4, 4, s3), this.filter(f4, 4, s3), l4.set(f4.subarray(4, 4 + s3), m3);
              var h3 = 16, u3 = [];
              for (d3 = 0; d3 < h3; d3++) u3.push(new Float32Array(c3 + 8));
              var d3, p3, m3, g3, v3, y3, b3, x3 = 0;
              if (e6 = 4 + c3, 1 === c3) {
                if ((1 & n4) != 0) for (v3 = 0; v3 < s3; v3++) l4[v3] *= 0.5;
              } else for (v3 = 0; v3 < s3; v3++) {
                if (0 === x3) {
                  for (h3 = Math.min(s3 - v3, h3), m3 = v3, g3 = 4; g3 < e6; m3 += s3, g3++) for (b3 = 0; b3 < h3; b3++) u3[b3][g3] = l4[m3 + b3];
                  x3 = h3;
                }
                var w3 = u3[--x3];
                if (this.extend(w3, 4, c3), this.filter(w3, 4, c3), 0 === x3) for (g3 = 4, m3 = v3 - h3 + 1; g3 < e6; m3 += s3, g3++) for (b3 = 0; b3 < h3; b3++) l4[m3 + b3] = u3[b3][g3];
              }
              return { width: s3, height: c3, items: l4 };
            }, e5;
          }(), w2 = function() {
            function e5() {
              x2.call(this);
            }
            return e5.prototype = Object.create(x2.prototype), e5.prototype.filter = function(e6, t5, r4) {
              var n4, i4, a3, o4, s3 = r4 >> 1;
              t5 |= 0;
              for (n4 = t5 - 3, i4 = s3 + 4; i4--; n4 += 2) e6[n4] *= 0.8128930661159609;
              for (a3 = 0.443506852043971 * e6[(n4 = t5 - 2) - 1], i4 = s3 + 3; i4--; n4 += 2) if (o4 = 0.443506852043971 * e6[n4 + 1], e6[n4] = 1.230174104914001 * e6[n4] - a3 - o4, i4--) n4 += 2, a3 = 0.443506852043971 * e6[n4 + 1], e6[n4] = 1.230174104914001 * e6[n4] - a3 - o4;
              else break;
              for (a3 = 0.882911075530934 * e6[(n4 = t5 - 1) - 1], i4 = s3 + 2; i4--; n4 += 2) if (o4 = 0.882911075530934 * e6[n4 + 1], e6[n4] -= a3 + o4, i4--) n4 += 2, a3 = 0.882911075530934 * e6[n4 + 1], e6[n4] -= a3 + o4;
              else break;
              for (a3 = -0.052980118572961 * e6[(n4 = t5) - 1], i4 = s3 + 1; i4--; n4 += 2) if (o4 = -0.052980118572961 * e6[n4 + 1], e6[n4] -= a3 + o4, i4--) n4 += 2, a3 = -0.052980118572961 * e6[n4 + 1], e6[n4] -= a3 + o4;
              else break;
              if (0 !== s3) for (a3 = -1.586134342059924 * e6[(n4 = t5 + 1) - 1], i4 = s3; i4--; n4 += 2) if (o4 = -1.586134342059924 * e6[n4 + 1], e6[n4] -= a3 + o4, i4--) n4 += 2, a3 = -1.586134342059924 * e6[n4 + 1], e6[n4] -= a3 + o4;
              else break;
            }, e5;
          }(), C2 = function() {
            function e5() {
              x2.call(this);
            }
            return e5.prototype = Object.create(x2.prototype), e5.prototype.filter = function(e6, t5, r4) {
              var n4, i4, a3 = r4 >> 1;
              for (t5 |= 0, n4 = t5, i4 = a3 + 1; i4--; n4 += 2) e6[n4] -= e6[n4 - 1] + e6[n4 + 1] + 2 >> 2;
              for (n4 = t5 + 1, i4 = a3; i4--; n4 += 2) e6[n4] += e6[n4 - 1] + e6[n4 + 1] >> 1;
            }, e5;
          }();
          return t4;
        }(), i2 = function() {
          function e4() {
          }
          function t4(e5, t5, r4) {
            this.data = e5, this.start = t5, this.end = r4;
          }
          function n3(e5, t5, r4) {
            var n4 = e5.getContexts(t5), i4 = 1;
            function a3(e6) {
              for (var t6 = 0, a4 = 0; a4 < e6; a4++) {
                var o4 = r4.readBit(n4, i4);
                i4 = i4 < 256 ? i4 << 1 | o4 : (i4 << 1 | o4) & 511 | 256, t6 = t6 << 1 | o4;
              }
              return t6 >>> 0;
            }
            var o3 = a3(1), s3 = a3(1) ? a3(1) ? a3(1) ? a3(1) ? a3(1) ? a3(32) + 4436 : a3(12) + 340 : a3(8) + 84 : a3(6) + 20 : a3(4) + 4 : a3(2);
            return 0 === o3 ? s3 : s3 > 0 ? -s3 : null;
          }
          function i3(e5, t5, r4) {
            for (var n4 = e5.getContexts("IAID"), i4 = 1, a3 = 0; a3 < r4; a3++) {
              var o3 = t5.readBit(n4, i4);
              i4 = i4 << 1 | o3;
            }
            return r4 < 31 ? i4 & (1 << r4) - 1 : 2147483647 & i4;
          }
          e4.prototype = { getContexts: function(e5) {
            return e5 in this ? this[e5] : this[e5] = new Int8Array(65536);
          } }, t4.prototype = { get decoder() {
            return l2(this, "decoder", new r3(this.data, this.start, this.end));
          }, get contextCache() {
            return l2(this, "contextCache", new e4());
          } };
          var h3 = ["SymbolDictionary", null, null, null, "IntermediateTextRegion", null, "ImmediateTextRegion", "ImmediateLosslessTextRegion", null, null, null, null, null, null, null, null, "patternDictionary", null, null, null, "IntermediateHalftoneRegion", null, "ImmediateHalftoneRegion", "ImmediateLosslessHalftoneRegion", null, null, null, null, null, null, null, null, null, null, null, null, "IntermediateGenericRegion", null, "ImmediateGenericRegion", "ImmediateLosslessGenericRegion", "IntermediateGenericRefinementRegion", null, "ImmediateGenericRefinementRegion", "ImmediateLosslessGenericRefinementRegion", null, null, null, null, "PageInformation", "EndOfPage", "EndOfStripe", "EndOfFile", "Profiles", "Tables", null, null, null, null, null, null, null, null, "Extension"], u3 = [[{ x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: -4, y: 0 }, { x: -3, y: 0 }, { x: -2, y: 0 }, { x: -1, y: 0 }], [{ x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 }, { x: 2, y: -2 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: -3, y: 0 }, { x: -2, y: 0 }, { x: -1, y: 0 }], [{ x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: -2, y: 0 }, { x: -1, y: 0 }], [{ x: -3, y: -1 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: -4, y: 0 }, { x: -3, y: 0 }, { x: -2, y: 0 }, { x: -1, y: 0 }]], d2 = [{ coding: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }], reference: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }, { coding: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }], reference: [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }], p2 = [39717, 1941, 229, 405], m2 = [32, 8];
          function g2(e5, t5, r4, n4, i4, a3, o3, s3) {
            if (e5 && f2("JBIG2 error: MMR encoding is not supported"), 0 === n4 && !a3 && !i4 && 4 === o3.length && 3 === o3[0].x && -1 === o3[0].y && -3 === o3[1].x && -1 === o3[1].y && 2 === o3[2].x && -2 === o3[2].y && -2 === o3[3].x && -2 === o3[3].y) return function(e6, t6, r5) {
              var n5, i5, a4, o4, s4, c4, l4, f3 = r5.decoder, h5 = r5.contextCache.getContexts("GB"), u4 = [];
              for (i5 = 0; i5 < t6; i5++) for (a4 = 0, s4 = u4[i5] = new Uint8Array(e6), c4 = i5 < 1 ? s4 : u4[i5 - 1], n5 = (l4 = i5 < 2 ? s4 : u4[i5 - 2])[0] << 13 | l4[1] << 12 | l4[2] << 11 | c4[0] << 7 | c4[1] << 6 | c4[2] << 5 | c4[3] << 4; a4 < e6; a4++) s4[a4] = o4 = f3.readBit(h5, n5), n5 = (31735 & n5) << 1 | (a4 + 3 < e6 ? l4[a4 + 3] << 11 : 0) | (a4 + 4 < e6 ? c4[a4 + 4] << 4 : 0) | o4;
              return u4;
            }(t5, r4, s3);
            var c3 = !!a3, l3 = u3[n4].concat(o3);
            l3.sort(function(e6, t6) {
              return e6.y - t6.y || e6.x - t6.x;
            });
            var h4 = l3.length, d3 = new Int8Array(h4), m3 = new Int8Array(h4), g3 = [], v3 = 0, y3 = 0, b3 = 0, x3 = 0;
            for (A2 = 0; A2 < h4; A2++) d3[A2] = l3[A2].x, m3[A2] = l3[A2].y, y3 = Math.min(y3, l3[A2].x), b3 = Math.max(b3, l3[A2].x), x3 = Math.min(x3, l3[A2].y), A2 < h4 - 1 && l3[A2].y === l3[A2 + 1].y && l3[A2].x === l3[A2 + 1].x - 1 ? v3 |= 1 << h4 - 1 - A2 : g3.push(A2);
            var w3 = g3.length, C2 = new Int8Array(w3), P2 = new Int8Array(w3), I2 = new Uint16Array(w3);
            for (k2 = 0; k2 < w3; k2++) A2 = g3[k2], C2[k2] = l3[A2].x, P2[k2] = l3[A2].y, I2[k2] = 1 << h4 - 1 - A2;
            for (var k2, A2, S2, T2, M2, E2, O2, L2 = -y3, D2 = -x3, U2 = t5 - b3, z2 = p2[n4], F2 = new Uint8Array(t5), B2 = [], $2 = s3.decoder, R2 = s3.contextCache.getContexts("GB"), _2 = 0, q2 = 0, J2 = 0; J2 < r4; J2++) {
              if (i4 && (_2 ^= $2.readBit(R2, z2))) {
                B2.push(F2);
                continue;
              }
              for (F2 = new Uint8Array(F2), B2.push(F2), S2 = 0; S2 < t5; S2++) {
                if (c3 && a3[J2][S2]) {
                  F2[S2] = 0;
                  continue;
                }
                if (S2 >= L2 && S2 < U2 && J2 >= D2) for (A2 = 0, q2 = q2 << 1 & v3; A2 < w3; A2++) T2 = J2 + P2[A2], M2 = S2 + C2[A2], (E2 = B2[T2][M2]) && (q2 |= E2 = I2[A2]);
                else for (A2 = 0, q2 = 0, O2 = h4 - 1; A2 < h4; A2++, O2--) (M2 = S2 + d3[A2]) >= 0 && M2 < t5 && (T2 = J2 + m3[A2]) >= 0 && (E2 = B2[T2][M2]) && (q2 |= E2 << O2);
                var N2 = $2.readBit(R2, q2);
                F2[S2] = N2;
              }
            }
            return B2;
          }
          function v2(e5, t5, r4, n4, i4, a3, o3, s3, c3) {
            var l3 = d2[r4].coding;
            0 === r4 && (l3 = l3.concat([s3[0]]));
            var h4 = l3.length, u4 = new Int32Array(h4), p3 = new Int32Array(h4);
            for (E2 = 0; E2 < h4; E2++) u4[E2] = l3[E2].x, p3[E2] = l3[E2].y;
            var g3 = d2[r4].reference;
            0 === r4 && (g3 = g3.concat([s3[1]]));
            var v3 = g3.length, y3 = new Int32Array(v3), b3 = new Int32Array(v3);
            for (E2 = 0; E2 < v3; E2++) y3[E2] = g3[E2].x, b3[E2] = g3[E2].y;
            for (var x3 = n4[0].length, w3 = n4.length, C2 = m2[r4], P2 = [], I2 = c3.decoder, k2 = c3.contextCache.getContexts("GR"), A2 = 0, S2 = 0; S2 < t5; S2++) {
              o3 && (A2 ^= I2.readBit(k2, C2)) && f2("JBIG2 error: prediction is not supported");
              var T2 = new Uint8Array(e5);
              P2.push(T2);
              for (var M2 = 0; M2 < e5; M2++) {
                var E2, O2, L2, D2 = 0;
                for (E2 = 0; E2 < h4; E2++) O2 = S2 + p3[E2], L2 = M2 + u4[E2], O2 < 0 || L2 < 0 || L2 >= e5 ? D2 <<= 1 : D2 = D2 << 1 | P2[O2][L2];
                for (E2 = 0; E2 < v3; E2++) O2 = S2 + b3[E2] + a3, L2 = M2 + y3[E2] + i4, O2 < 0 || O2 >= w3 || L2 < 0 || L2 >= x3 ? D2 <<= 1 : D2 = D2 << 1 | n4[O2][L2];
                var U2 = I2.readBit(k2, D2);
                T2[M2] = U2;
              }
            }
            return P2;
          }
          function y2(e5, t5, r4, a3, o3, s3, c3, l3, h4, u4, d3, p3, m3, g3, y3, b3, x3) {
            e5 && f2("JBIG2 error: huffman is not supported");
            var w3 = [];
            for (T2 = 0; T2 < a3; T2++) {
              if (M2 = new Uint8Array(r4), o3) for (var C2 = 0; C2 < r4; C2++) M2[C2] = o3;
              w3.push(M2);
            }
            var P2 = x3.decoder, I2 = x3.contextCache, k2 = -n3(I2, "IADT", P2), A2 = 0;
            for (T2 = 0; T2 < s3; ) {
              k2 += n3(I2, "IADT", P2);
              for (var S2 = A2 += n3(I2, "IAFS", P2); ; ) {
                var T2, M2, E2, O2, L2, D2 = 1 === c3 ? 0 : n3(I2, "IAIT", P2), U2 = c3 * k2 + D2, z2 = i3(I2, P2, h4), F2 = t5 && n3(I2, "IARI", P2), B2 = l3[z2], $2 = B2[0].length, R2 = B2.length;
                if (F2) {
                  var _2 = n3(I2, "IARDW", P2), q2 = n3(I2, "IARDH", P2), J2 = n3(I2, "IARDX", P2), N2 = n3(I2, "IARDY", P2);
                  $2 += _2, R2 += q2, B2 = v2($2, R2, y3, B2, (_2 >> 1) + J2, (q2 >> 1) + N2, false, b3, x3);
                }
                var X2 = U2 - (1 & p3 ? 0 : R2), H2 = S2 - (2 & p3 ? $2 : 0);
                if (u4) {
                  for (E2 = 0; E2 < R2; E2++) if (M2 = w3[H2 + E2]) {
                    L2 = B2[E2];
                    var G = Math.min(r4 - X2, $2);
                    switch (m3) {
                      case 0:
                        for (O2 = 0; O2 < G; O2++) M2[X2 + O2] |= L2[O2];
                        break;
                      case 2:
                        for (O2 = 0; O2 < G; O2++) M2[X2 + O2] ^= L2[O2];
                        break;
                      default:
                        f2("JBIG2 error: operator " + m3 + " is not supported");
                    }
                  }
                  S2 += R2 - 1;
                } else {
                  for (O2 = 0; O2 < R2; O2++) if (M2 = w3[X2 + O2]) switch (L2 = B2[O2], m3) {
                    case 0:
                      for (E2 = 0; E2 < $2; E2++) M2[H2 + E2] |= L2[E2];
                      break;
                    case 2:
                      for (E2 = 0; E2 < $2; E2++) M2[H2 + E2] ^= L2[E2];
                      break;
                    default:
                      f2("JBIG2 error: operator " + m3 + " is not supported");
                  }
                  S2 += $2 - 1;
                }
                T2++;
                var Y = n3(I2, "IADS", P2);
                if (null === Y) break;
                S2 += Y + d3;
              }
            }
            return w3;
          }
          function b2(e5, t5) {
            return { width: c2(e5, t5), height: c2(e5, t5 + 4), x: c2(e5, t5 + 8), y: c2(e5, t5 + 12), combinationOperator: 7 & e5[t5 + 16] };
          }
          function x2() {
          }
          function w2() {
          }
          return x2.prototype = { onPageInformation: function(e5) {
            this.currentPageInfo = e5;
            var t5 = new Uint8Array((e5.width + 7 >> 3) * e5.height);
            if (e5.defaultPixelValue) for (var r4 = 0, n4 = t5.length; r4 < n4; r4++) t5[r4] = 255;
            this.buffer = t5;
          }, drawBitmap: function(e5, t5) {
            var r4, n4, i4, a3, o3 = this.currentPageInfo, s3 = e5.width, c3 = e5.height, l3 = o3.width + 7 >> 3, h4 = o3.combinationOperatorOverride ? e5.combinationOperator : o3.combinationOperator, u4 = this.buffer, d3 = 128 >> (7 & e5.x), p3 = e5.y * l3 + (e5.x >> 3);
            switch (h4) {
              case 0:
                for (r4 = 0; r4 < c3; r4++) {
                  for (n4 = 0, i4 = d3, a3 = p3; n4 < s3; n4++) t5[r4][n4] && (u4[a3] |= i4), !(i4 >>= 1) && (i4 = 128, a3++);
                  p3 += l3;
                }
                break;
              case 2:
                for (r4 = 0; r4 < c3; r4++) {
                  for (n4 = 0, i4 = d3, a3 = p3; n4 < s3; n4++) t5[r4][n4] && (u4[a3] ^= i4), !(i4 >>= 1) && (i4 = 128, a3++);
                  p3 += l3;
                }
                break;
              default:
                f2("JBIG2 error: operator " + h4 + " is not supported");
            }
          }, onImmediateGenericRegion: function(e5, r4, n4, i4) {
            var a3 = e5.info, o3 = new t4(r4, n4, i4), s3 = g2(e5.mmr, a3.width, a3.height, e5.template, e5.prediction, null, e5.at, o3);
            this.drawBitmap(a3, s3);
          }, onImmediateLosslessGenericRegion: function() {
            this.onImmediateGenericRegion.apply(this, arguments);
          }, onSymbolDictionary: function(e5, r4, o3, s3, c3, l3) {
            e5.huffman && f2("JBIG2 error: huffman is not supported");
            var h4, u4 = this.symbols;
            u4 || (this.symbols = u4 = {});
            for (var d3 = [], p3 = 0, m3 = o3.length; p3 < m3; p3++) d3 = d3.concat(u4[o3[p3]]);
            var b3 = new t4(s3, c3, l3);
            u4[r4] = function(e6, t5, r5, o4, s4, c4, l4, h5, u5, d4, p4) {
              e6 && f2("JBIG2 error: huffman is not supported");
              for (var m4 = [], b4 = 0, x3 = a2(r5.length + o4), w3 = p4.decoder, C2 = p4.contextCache; m4.length < o4; ) {
                b4 += n3(C2, "IADH", w3);
                for (var P2 = 0; ; ) {
                  var I2, k2 = n3(C2, "IADW", w3);
                  if (null === k2) break;
                  if (P2 += k2, t5) {
                    var A2 = n3(C2, "IAAI", w3);
                    if (A2 > 1) I2 = y2(e6, t5, P2, b4, 0, A2, 1, r5.concat(m4), x3, 0, 0, 1, 0, c4, u5, d4, p4);
                    else {
                      var S2 = i3(C2, w3, x3), T2 = n3(C2, "IARDX", w3), M2 = n3(C2, "IARDY", w3);
                      I2 = v2(P2, b4, u5, S2 < r5.length ? r5[S2] : m4[S2 - r5.length], T2, M2, false, d4, p4);
                    }
                  } else I2 = g2(false, P2, b4, l4, false, null, h5, p4);
                  m4.push(I2);
                }
              }
              for (var E2 = [], O2 = [], L2 = false, D2 = r5.length + o4; O2.length < D2; ) {
                for (var U2 = n3(C2, "IAEX", w3); U2--; ) O2.push(L2);
                L2 = !L2;
              }
              for (var z2 = 0, F2 = r5.length; z2 < F2; z2++) O2[z2] && E2.push(r5[z2]);
              for (var B2 = 0; B2 < o4; z2++, B2++) O2[z2] && E2.push(m4[B2]);
              return E2;
            }(e5.huffman, e5.refinement, d3, e5.numberOfNewSymbols, e5.numberOfExportedSymbols, h4, e5.template, e5.at, e5.refinementTemplate, e5.refinementAt, b3);
          }, onImmediateTextRegion: function(e5, r4, n4, i4, o3) {
            for (var s3, c3 = e5.info, l3 = this.symbols, f3 = [], h4 = 0, u4 = r4.length; h4 < u4; h4++) f3 = f3.concat(l3[r4[h4]]);
            var d3 = a2(f3.length), p3 = new t4(n4, i4, o3), m3 = y2(e5.huffman, e5.refinement, c3.width, c3.height, e5.defaultPixelValue, e5.numberOfSymbolInstances, e5.stripSize, f3, d3, e5.transposed, e5.dsOffset, e5.referenceCorner, e5.combinationOperator, s3, e5.refinementTemplate, e5.refinementAt, p3);
            this.drawBitmap(c3, m3);
          }, onImmediateLosslessTextRegion: function() {
            this.onImmediateTextRegion.apply(this, arguments);
          } }, w2.prototype = { parseChunks: function(e5) {
            return function(e6) {
              for (var t5 = new x2(), r4 = 0, n4 = e6.length; r4 < n4; r4++) {
                var i4 = e6[r4];
                !function(e7, t6) {
                  for (var r5 = 0, n5 = e7.length; r5 < n5; r5++) !function(e8, t7) {
                    var r6, n6, i5, a3, l3 = e8.header, h4 = e8.data, u4 = e8.start, d3 = e8.end;
                    switch (l3.type) {
                      case 0:
                        var p3 = {}, m3 = s2(h4, u4);
                        if (p3.huffman = !!(1 & m3), p3.refinement = !!(2 & m3), p3.huffmanDHSelector = m3 >> 2 & 3, p3.huffmanDWSelector = m3 >> 4 & 3, p3.bitmapSizeSelector = m3 >> 6 & 1, p3.aggregationInstancesSelector = m3 >> 7 & 1, p3.bitmapCodingContextUsed = !!(256 & m3), p3.bitmapCodingContextRetained = !!(512 & m3), p3.template = m3 >> 10 & 3, p3.refinementTemplate = m3 >> 12 & 1, u4 += 2, !p3.huffman) {
                          for (i5 = 0, a3 = 0 === p3.template ? 4 : 1, n6 = []; i5 < a3; i5++) n6.push({ x: o2(h4, u4), y: o2(h4, u4 + 1) }), u4 += 2;
                          p3.at = n6;
                        }
                        if (p3.refinement && !p3.refinementTemplate) {
                          for (i5 = 0, n6 = []; i5 < 2; i5++) n6.push({ x: o2(h4, u4), y: o2(h4, u4 + 1) }), u4 += 2;
                          p3.refinementAt = n6;
                        }
                        p3.numberOfExportedSymbols = c2(h4, u4), u4 += 4, p3.numberOfNewSymbols = c2(h4, u4), u4 += 4, r6 = [p3, l3.number, l3.referredTo, h4, u4, d3];
                        break;
                      case 6:
                      case 7:
                        var g3 = {};
                        g3.info = b2(h4, u4);
                        var v3 = s2(h4, u4 += 17);
                        if (u4 += 2, g3.huffman = !!(1 & v3), g3.refinement = !!(2 & v3), g3.stripSize = 1 << (v3 >> 2 & 3), g3.referenceCorner = v3 >> 4 & 3, g3.transposed = !!(64 & v3), g3.combinationOperator = v3 >> 7 & 3, g3.defaultPixelValue = v3 >> 9 & 1, g3.dsOffset = v3 << 17 >> 27, g3.refinementTemplate = v3 >> 15 & 1, g3.huffman) {
                          var y3 = s2(h4, u4);
                          u4 += 2, g3.huffmanFS = 3 & y3, g3.huffmanDS = y3 >> 2 & 3, g3.huffmanDT = y3 >> 4 & 3, g3.huffmanRefinementDW = y3 >> 6 & 3, g3.huffmanRefinementDH = y3 >> 8 & 3, g3.huffmanRefinementDX = y3 >> 10 & 3, g3.huffmanRefinementDY = y3 >> 12 & 3, g3.huffmanRefinementSizeSelector = !!(14 & y3);
                        }
                        if (g3.refinement && !g3.refinementTemplate) {
                          for (i5 = 0, n6 = []; i5 < 2; i5++) n6.push({ x: o2(h4, u4), y: o2(h4, u4 + 1) }), u4 += 2;
                          g3.refinementAt = n6;
                        }
                        g3.numberOfSymbolInstances = c2(h4, u4), u4 += 4, g3.huffman && f2("JBIG2 error: huffman is not supported"), r6 = [g3, l3.referredTo, h4, u4, d3];
                        break;
                      case 38:
                      case 39:
                        var x3 = {};
                        x3.info = b2(h4, u4), u4 += 17;
                        var w3 = h4[u4++];
                        if (x3.mmr = !!(1 & w3), x3.template = w3 >> 1 & 3, x3.prediction = !!(8 & w3), !x3.mmr) {
                          for (i5 = 0, a3 = 0 === x3.template ? 4 : 1, n6 = []; i5 < a3; i5++) n6.push({ x: o2(h4, u4), y: o2(h4, u4 + 1) }), u4 += 2;
                          x3.at = n6;
                        }
                        r6 = [x3, h4, u4, d3];
                        break;
                      case 48:
                        var C2 = { width: c2(h4, u4), height: c2(h4, u4 + 4), resolutionX: c2(h4, u4 + 8), resolutionY: c2(h4, u4 + 12) };
                        4294967295 === C2.height && delete C2.height;
                        var P2 = h4[u4 + 16];
                        s2(h4, u4 + 17), C2.lossless = !!(1 & P2), C2.refinement = !!(2 & P2), C2.defaultPixelValue = P2 >> 2 & 1, C2.combinationOperator = P2 >> 3 & 3, C2.requiresBuffer = !!(32 & P2), C2.combinationOperatorOverride = !!(64 & P2), r6 = [C2];
                        break;
                      case 49:
                      case 50:
                      case 51:
                      case 62:
                        break;
                      default:
                        f2("JBIG2 error: segment type " + l3.typeName + "(" + l3.type + ") is not implemented");
                    }
                    var I2 = "on" + l3.typeName;
                    I2 in t7 && t7[I2].apply(t7, r6);
                  }(e7[r5], t6);
                }(function(e7, t6, r5, n5) {
                  for (var i5 = [], a3 = r5; a3 < n5; ) {
                    var o3 = function(e8, t7) {
                      var r6, n6, i6 = {};
                      i6.number = c2(e8, t7);
                      var a4 = e8[t7 + 4], o4 = 63 & a4;
                      h3[o4] || f2("JBIG2 error: invalid segment type: " + o4), i6.type = o4, i6.typeName = h3[o4], i6.deferredNonRetain = !!(128 & a4);
                      var l4 = e8[t7 + 5], u5 = l4 >> 5 & 7, d4 = [31 & l4], p3 = t7 + 6;
                      if (7 === l4) {
                        u5 = 536870911 & c2(e8, p3 - 1), p3 += 3;
                        var m3 = u5 + 7 >> 3;
                        for (d4[0] = e8[p3++]; --m3 > 0; ) d4.push(e8[p3++]);
                      } else (5 === l4 || 6 === l4) && f2("JBIG2 error: invalid referred-to flags");
                      i6.retainBits = d4;
                      var g3 = i6.number <= 256 ? 1 : i6.number <= 65536 ? 2 : 4, v3 = [];
                      for (r6 = 0; r6 < u5; r6++) {
                        var y3 = 1 === g3 ? e8[p3] : 2 === g3 ? s2(e8, p3) : c2(e8, p3);
                        v3.push(y3), p3 += g3;
                      }
                      if (i6.referredTo = v3, 64 & a4 ? (i6.pageAssociation = c2(e8, p3), p3 += 4) : i6.pageAssociation = e8[p3++], i6.length = c2(e8, p3), p3 += 4, 4294967295 === i6.length) {
                        if (38 === o4) {
                          var x3 = b2(e8, p3), w3 = e8[p3 + 17], C2 = new Uint8Array(6);
                          for (1 & w3 || (C2[0] = 255, C2[1] = 172), C2[2] = x3.height >>> 24 & 255, C2[3] = x3.height >> 16 & 255, C2[4] = x3.height >> 8 & 255, C2[5] = 255 & x3.height, r6 = p3, n6 = e8.length; r6 < n6; r6++) {
                            for (var P2 = 0; P2 < 6 && C2[P2] === e8[r6 + P2]; ) P2++;
                            if (6 === P2) {
                              i6.length = r6 + 6;
                              break;
                            }
                          }
                          4294967295 === i6.length && f2("JBIG2 error: segment end was not found");
                        } else f2("JBIG2 error: invalid unknown segment length");
                      }
                      return i6.headerEnd = p3, i6;
                    }(t6, a3);
                    a3 = o3.headerEnd;
                    var l3 = { header: o3, data: t6 };
                    if (e7.randomAccess || (l3.start = a3, a3 += o3.length, l3.end = a3), i5.push(l3), 51 === o3.type) break;
                  }
                  if (e7.randomAccess) for (var u4 = 0, d3 = i5.length; u4 < d3; u4++) i5[u4].start = a3, a3 += i5[u4].header.length, i5[u4].end = a3;
                  return i5;
                }({}, i4.data, i4.start, i4.end), t5);
              }
              return t5;
            }(e5);
          } }, w2;
        }();
        function a2(e4) {
          for (var t4 = 1, r4 = 0; e4 > t4; ) t4 <<= 1, r4++;
          return r4;
        }
        function o2(e4, t4) {
          return e4[t4] << 24 >> 24;
        }
        function s2(e4, t4) {
          return e4[t4] << 8 | e4[t4 + 1];
        }
        function c2(e4, t4) {
          return (e4[t4] << 24 | e4[t4 + 1] << 16 | e4[t4 + 2] << 8 | e4[t4 + 3]) >>> 0;
        }
        function l2(e4, t4, r4) {
          return Object.defineProperty(e4, t4, { value: r4, enumerable: true, configurable: true, writable: false }), r4;
        }
        var f2 = function() {
          throw console.error.apply(console, arguments), Error("PDFJS error: " + arguments[0]);
        }, h2 = function() {
          console.warn.apply(console, arguments);
        }, u2 = function() {
          console.info.apply(console, arguments);
        };
        i2.prototype.parse = function(e4) {
          var t4 = 0, r4 = e4.length;
          (151 !== e4[t4] || 74 !== e4[t4 + 1] || 66 !== e4[t4 + 2] || 50 !== e4[t4 + 3] || 13 !== e4[t4 + 4] || 10 !== e4[t4 + 5] || 26 !== e4[t4 + 6] || 10 !== e4[t4 + 7]) && f2("JBIG2 error: invalid header");
          var n3 = {};
          t4 += 8;
          var i3 = e4[t4++];
          n3.randomAccess = !(1 & i3), 2 & i3 || (n3.numberOfPages = c2(e4, t4), t4 += 4);
          for (var a3 = this.parseChunks([{ data: e4, start: t4, end: r4 }]), o3 = a3.currentPageInfo.width, s3 = a3.currentPageInfo.height, l3 = a3.buffer, e4 = new Uint8Array(o3 * s3), h3 = 0, u3 = 0, d2 = 0; d2 < s3; d2++) for (var p2, m2 = 0, g2 = 0; g2 < o3; g2++) m2 || (m2 = 128, p2 = l3[u3++]), e4[h3++] = p2 & m2 ? 0 : 255, m2 >>= 1;
          this.width = o3, this.height = s3, this.data = e4;
        }, e3.JpegImage = t3, e3.JpxImage = n2, e3.Jbig2Image = i2;
      }(C || (C = {}));
      var w, C, P = C.JpegImage;
      C.JpxImage, C.Jbig2Image, s({ id: "decodeJpeg" }, async (e3, t3, r3, n2, i2, a2) => {
        let o2;
        let s2 = new P();
        if (s2.parse(e3), void 0 !== t3 && t3 !== s2.width || void 0 !== r3 && r3 !== s2.height || void 0 !== n2 && s2.width * s2.height !== n2) throw Error(`JPEG data does not have the expected dimensions: width=${s2.width}, height=${s2.height}, expected width=${t3}, expected height=${r3}, expected area=${n2}`);
        if (t3 = s2.width, r3 = s2.height, void 0 !== i2 && s2.numComponents !== i2) throw Error(`JPEG data does not have the expected number of components: components=${s2.numComponents}, expected=${i2}`);
        if (i2 = s2.numComponents, 1 === s2.numComponents) o2 = s2.getData(s2.width, s2.height, false);
        else if (3 === s2.numComponents) {
          if (o2 = s2.getData(s2.width, s2.height, false), a2) {
            let e4 = t3 * r3, n3 = new Uint8Array(e4);
            for (let t4 = 0; t4 < e4; ++t4) n3[t4] = o2[3 * t4];
            o2 = n3;
          } else o2 = l(o2, s2.width * s2.height, 3);
        } else throw Error(`JPEG data has an unsupported number of components: components=${s2.numComponents}`);
        return { value: { width: t3, height: r3, numComponents: i2, uint8Array: o2 }, transfer: [o2.buffer] };
      });
      let I = { emscripten_notify_memory_growth: () => {
      }, proc_exit: (e3) => {
        throw `proc exit: ${e3}`;
      } }, k = [137, 80, 78, 71, 13, 10, 26, 10], A = ["I", "H", "D", "R"];
      async function S(e3, t3, i2, a2, o2, s2, c2) {
        let f2 = await (void 0 === n && (n = (async () => {
          let e4 = (await WebAssembly.instantiateStreaming(fetch(new URL(r2(9266), r2.b)), { env: I, wasi_snapshot_preview1: I })).instance;
          return e4.exports._initialize(), e4;
        })()), n), { sx: h2, sy: u2, dataWidth: d2, numChannels: p2 } = function(e4) {
          function t4(e5, t5) {
            return e5.every((e6, r4) => e6 === t5[r4]);
          }
          if (e4.length < 12) throw Error(`png: Invalid image size: ${e4.length}`);
          if (!t4(k, e4)) throw Error(`png: didn't match magic numbers: ${e4.slice(0, 8)}`);
          let r3 = new DataView(e4.buffer, k.length), n2 = r3.getUint32(0, false);
          if (e4.length < k.length + n2 + 12) throw Error(`png: Invalid image size: ${e4.length}`);
          let i3 = [4, 5, 6, 7].map((e5) => String.fromCharCode(r3.getUint8(e5)));
          if (!t4(i3, A)) throw Error(`png: Invalid header code (should be IHDR): ${i3}`);
          let a3 = r3.getUint32(8, false), o3 = r3.getUint32(12, false), s3 = r3.getUint8(16), c3 = r3.getUint8(17), l2 = r3.getUint8(18), f3 = r3.getUint8(19), h3 = r3.getUint8(20);
          if (0 === a3 || 0 === o3) throw Error(`png: 0 is not a valid width or height. width: ${a3} height: ${o3}`);
          if (0 !== l2) throw Error(`png: Invalid compression method Only 0 is supported (DEFLATE). Got: ${l2}`);
          if (0 !== f3) throw Error(`png: Invalid filter method. Only 0 (adaptive filtering) is supported. Got: ${f3}`);
          if (h3 > 1) throw Error(`png: invalid interlace method. Only 0 (no interlace) and 1 (adam7) are supported. Got: ${h3}`);
          let u3 = [1, 2, 4, 8, 16];
          if (-1 === u3.indexOf(s3)) throw Error(`png: invalid bit depth. Got: ${s3} Valid Depths: ${u3}`);
          let d3 = s3 <= 8 ? 1 : 2, p3 = 1;
          if (0 === c3) ;
          else if (2 === c3) {
            if (8 !== s3 && 16 !== s3) throw Error(`png: invalid bit depth for RGB colorspace. Got: ${s3}`);
            p3 = 3;
          } else if (3 === c3) d3 = 1, p3 = 3;
          else if (6 === c3) {
            if (8 !== s3 && 16 !== s3) throw Error(`png: invalid bit depth for RGBA colorspace. Got: ${s3}`);
            p3 = 4;
          } else if (4 === c3) {
            if (8 !== s3 && 16 !== s3) throw Error(`png: invalid bit depth for grayscale + alpha channel colorspace. Got: ${s3}`);
            p3 = 2;
          } else throw Error(`png: Invalid color space: ${c3}`);
          return { sx: a3, sy: o3, dataWidth: d3, numChannels: p3 };
        }(e3);
        if (c2 && (d2 = 1, p2 = 1), void 0 !== t3 && h2 !== t3 || void 0 !== i2 && u2 !== i2 || void 0 !== a2 && h2 * u2 !== a2 || void 0 !== o2 && o2 !== p2 || s2 !== d2) throw Error(`png: Image decode parameters did not match expected chunk parameters.  Expected: width: ${t3} height: ${i2} area: ${a2} channels: ${o2} bytes per pixel: ${s2}.  Decoded:  width: ${h2} height: ${u2} channels: ${p2} bytes per pixel: ${d2}.  Convert to Grayscale? ${c2}`);
        let m2 = h2 * u2 * d2 * p2;
        if (m2 < 0) throw Error(`png: Failed to decode png image size. image size: ${m2}`);
        let g2 = f2.exports.malloc(e3.byteLength), v2 = f2.exports.malloc(m2);
        new Uint8Array(f2.exports.memory.buffer).set(e3, g2);
        let y2 = f2.exports.png_decompress(g2, e3.byteLength, v2, m2, c2);
        try {
          if (0 !== y2) throw Error(`png: Failed to decode png image. decoder code: ${y2}`);
          let e4 = new Uint8Array(f2.exports.memory.buffer, v2, m2);
          return 1 !== p2 && (e4 = l(e4, h2 * u2, p2)), { width: h2, height: u2, numComponents: p2, uint8Array: e4.slice(0) };
        } finally {
          f2.exports.free(g2), f2.exports.free(v2);
        }
      }
      async function T(e3, t3, r3) {
        try {
          var n2, i2, a2;
          let o2 = (n2 = e3 instanceof Response ? e3 : new Response(e3), i2 = t3, a2 = r3, n2.body.pipeThrough(new DecompressionStream(i2), { signal: a2 }));
          return await new Response(o2).arrayBuffer();
        } catch {
          throw r3?.throwIfAborted(), Error(`Failed to decode ${t3}`);
        }
      }
      async function M(e3) {
        let t3;
        return !function(e4) {
          let t4 = new Uint8Array(e4.buffer, e4.byteOffset, e4.byteLength);
          return t4.length >= 3 && 31 === t4[0] && 139 === t4[1] && 8 === t4[2];
        }(t3 = e3 instanceof ArrayBuffer ? new Uint8Array(e3) : new Uint8Array(e3.buffer, e3.byteOffset, e3.byteLength)) ? t3 : new Uint8Array(await T(t3, "gzip"));
      }
      s({ id: "decodePng" }, async (e3, t3, r3, n2, i2, a2, o2) => {
        let s2 = await S(e3, t3, r3, n2, i2, a2, o2);
        return { value: s2, transfer: [s2.uint8Array.buffer] };
      }), s({ id: "decodeBlosc" }, async (e3) => {
        let { default: t3 } = await r2.e("733").then(r2.bind(r2, 2925)), n2 = t3.fromConfig({ id: "blosc" }), i2 = await n2.decode(e3);
        return { value: i2, transfer: [i2.buffer] };
      }), s({ id: "decodeZstd" }, async (e3) => {
        let { default: t3 } = await r2.e("174").then(r2.bind(r2, 8165)), n2 = t3.fromConfig({ id: "blosc" }), i2 = await n2.decode(e3);
        return { value: i2, transfer: [i2.buffer] };
      }), s({ id: "parseOBJFromArrayBuffer" }, async (e3) => {
        let t3 = new TextDecoder().decode(await M(e3));
        t3 = t3.replace(/#.*/g, "");
        let r3 = new f(Float32Array), n2 = new f(Uint32Array);
        for (let e4 of t3.matchAll(/^v\s+([-0-9.eE]+)\s+([-0-9.eE]+)\s+([-0-9.eE]+)\s*$/gm)) r3.appendArray([parseFloat(e4[1]), parseFloat(e4[2]), parseFloat(e4[3])]);
        for (let e4 of t3.matchAll(/^f\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*$/gm)) n2.appendArray([parseInt(e4[1], 10) - 1, parseInt(e4[2], 10) - 1, parseInt(e4[3], 10) - 1]);
        r3.shrinkToFit(), n2.shrinkToFit();
        let i2 = { info: { numVertices: r3.length / 3, numTriangles: n2.length / 3, vertexAttributes: [] }, vertexPositions: r3.view, indices: n2.view, vertexAttributes: [] }, a2 = i2.vertexPositions.byteLength + i2.indices.byteLength;
        return console.log(i2), { value: { data: i2, size: a2 }, transfer: [i2.indices.buffer, i2.vertexPositions.buffer] };
      });
      let E = {};
      async function O() {
        return void 0 === i && (i = (async () => (await WebAssembly.instantiateStreaming(fetch(new URL(r2(1088), r2.b)), { env: E, wasi_snapshot_preview1: E })).instance)()), i;
      }
      let L = [0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10];
      async function D(e3, t3, r3, n2) {
        let i2 = await O();
        !function(e4) {
          let t4 = e4.length;
          if (t4 < 12) throw Error(`jxl: Invalid image size: ${t4}`);
          if (t4 >= 1 && 255 === e4[0]) {
            if (t4 < 2) throw Error(`jxl: Not enough bytes. Got: ${t4}`);
            if (10 === e4[1]) return;
            throw Error("jxl: Invalid codestream.");
          }
          if (!L.every((t5, r4) => t5 === e4[r4])) throw Error(`jxl: didn't match magic numbers: ${e4.slice(0, 12)}`);
        }(e3);
        let a2 = (t3 || (t3 = 0)) * n2 * (r3 || (r3 = 1)), o2 = i2.exports.malloc(e3.byteLength);
        new Uint8Array(i2.exports.memory.buffer).set(e3, o2);
        let s2 = null;
        try {
          let n3 = i2.exports.width(o2, e3.byteLength, a2), c2 = i2.exports.height(o2, e3.byteLength, a2);
          if (n3 <= 0 || c2 <= 0) throw Error(`jxl: Decoding failed. Width (${n3}) and/or height (${c2}) invalid.`);
          if (void 0 !== t3 && n3 * c2 !== t3) throw Error(`jxl: Expected width and height (${n3} x ${c2}, ${n3 * c2}) to match area: ${t3}.`);
          if (s2 = i2.exports.decode(o2, e3.byteLength, a2), 0 === s2) throw Error("jxl: Decoding failed. Null pointer returned.");
          let l2 = new Uint8Array(i2.exports.memory.buffer, s2, a2);
          return { width: n3 || 0, height: c2 || 0, numComponents: r3 || 1, uint8Array: l2.slice(0) };
        } finally {
          i2.exports.free(o2, e3.byteLength), s2 && i2.exports.free(s2, a2);
        }
      }
      s({ id: "decodeJxl" }, async (e3, t3, r3, n2) => {
        let i2 = await D(e3, t3, r3, n2);
        return { value: i2, transfer: [i2.uint8Array.buffer] };
      });
      let U = { emscripten_notify_memory_growth: () => {
      }, proc_exit: (e3) => {
        throw `proc exit: ${e3}`;
      } };
      async function z(e3) {
        let t3 = await (void 0 === a && (a = (async () => {
          let e4 = (await WebAssembly.instantiateStreaming(fetch(new URL(r2(4472), r2.b)), { env: U, wasi_snapshot_preview1: U })).instance;
          return e4.exports._initialize(), e4;
        })()), a), { sx: n2, sy: i2, sz: o2, dataWidth: s2 } = function(e4) {
          if (!(99 === e4[0] && 112 === e4[1] && 115 === e4[2] && 111 === e4[3])) throw Error("compresso: didn't match magic numbers");
          if (e4[4] > 1) throw Error("compresso: didn't match format version");
          let t4 = new DataView(e4.buffer, 0), r3 = e4[5], n3 = t4.getUint16(6, true);
          return { sx: n3, sy: t4.getUint16(8, true), sz: t4.getUint16(10, true), dataWidth: r3 };
        }(e3), c2 = n2 * i2 * o2, l2 = c2 * s2;
        if (l2 < 0) throw Error(`Failed to decode compresso image. image size: ${l2}`);
        let f2 = t3.exports.malloc(l2), h2 = t3.exports.malloc(e3.byteLength);
        new Uint8Array(t3.exports.memory.buffer).set(e3, h2);
        let u2 = t3.exports.compresso_decompress(h2, e3.byteLength, f2);
        try {
          if (0 !== u2) throw Error(`Failed to decode compresso image. decoder code: ${u2}`);
          return new Uint8Array(t3.exports.memory.buffer, f2, c2 * s2).slice(0);
        } finally {
          t3.exports.free(h2), t3.exports.free(f2);
        }
      }
      s({ id: "decodeCompresso" }, async (e3) => {
        let t3 = await z(e3);
        return { value: t3, transfer: [t3.buffer] };
      });
      let F = /^[ \t]*#[ \t]+vtk[ \t]+DataFile[ \t]+Version[ \t]+([^\s]+)[ \t]*\n(.*)\n[ \t]*(ASCII|BINARY)[ \t]*\n[ \t]*DATASET[ \t]+([^ ]+)[ \t]*\n/, B = /^[ \t]*POINT_DATA[ \t]+([0-9]+)[ \t]*$/, $ = /^[ \t]*POINTS[ \t]+([0-9]+)[ \t]+([^\s]+)[ \t]*$/, R = /^[ \t]*SCALARS[ \t]+([^\s]+)[ \t]+([^\s]+)(?:[ \t]+([0-9]+))?[ \t]*$/, _ = /^[ \t]*LOOKUP_TABLE[ \t]+([^\s]+)[ \t]*$/, q = /^[ \t]*POLYGONS[ \t]+([0-9]+)[ \t]+([0-9]+)[ \t]*$/, J = /^[ \t]*3[ \t]+([0-9]+)[ \t]+([0-9]+)[ \t]+([0-9]+)[ \t]*$/, N = /^[ \t]*$/;
      class X {
        constructor(e3, t3, r3, n2, i2, a2) {
          __publicField(this, "header");
          __publicField(this, "numVertices");
          __publicField(this, "vertexPositions");
          __publicField(this, "numTriangles");
          __publicField(this, "indices");
          __publicField(this, "vertexAttributes");
          this.header = e3, this.numVertices = t3, this.vertexPositions = r3, this.numTriangles = n2, this.indices = i2, this.vertexAttributes = a2;
        }
      }
      let H = /* @__PURE__ */ new Map([["POLYDATA", function(e3, t3) {
        let r3, n2;
        let i2 = new TextDecoder().decode(t3).split("\n"), a2 = i2.length, o2 = 0, s2 = -1, c2 = -1, l2 = [];
        function f2(e4, t4, r4, n3) {
          let s3 = RegExp("^[ 	]*" + "([^s]+)[ 	]+".repeat(r4 - 1) + "([^s]+)[ 	]*$");
          if (a2 - o2 < t4) throw Error(`VTK data ended unexpectedly while parsing ${e4}.`);
          let c3 = new Float32Array(t4 * r4), l3 = 0;
          for (let n4 = 0; n4 < t4; ++n4) {
            let t5 = i2[o2++], a3 = t5.match(s3);
            if (null === a3) throw Error(`Failed to parse ${e4} line ${n4}: ${JSON.stringify(t5)}.`);
            for (let e5 = 0; e5 < r4; ++e5) c3[l3++] = parseFloat(a3[e5 + 1]);
          }
          return c3;
        }
        for (; o2 < a2; ) {
          let e4;
          let t4 = i2[o2];
          if (t4.match(N)) {
            ++o2;
            continue;
          }
          if (null !== (e4 = t4.match($))) {
            ++o2, function(e5, t5) {
              if (void 0 !== n2) throw Error("POINTS specified more than once.");
              s2 = e5, r3 = f2("POINTS", e5, 3, t5);
            }(parseInt(e4[1], 10), e4[2]);
            continue;
          }
          if (null !== (e4 = t4.match(q))) {
            ++o2, function(e5, t5) {
              if (void 0 !== n2) throw Error("VERTICES specified more than once.");
              if (a2 - o2 < e5) throw Error("VTK data ended unexpectedly");
              if (t5 !== 4 * e5) throw Error("Only triangular faces are supported.");
              c2 = e5, n2 = new Uint32Array(3 * e5);
              let r4 = 0;
              for (let t6 = 0; t6 < e5; ++t6) {
                let e6 = i2[o2++].match(J);
                if (null === e6) throw Error(`Failed to parse indices for face ${t6}`);
                n2[r4++] = parseInt(e6[1], 10), n2[r4++] = parseInt(e6[2], 10), n2[r4++] = parseInt(e6[3], 10);
              }
            }(parseInt(e4[1], 10), parseInt(e4[2], 10));
            continue;
          }
          if (null !== (e4 = t4.match(B))) {
            ++o2, function(e5) {
              if (s2 !== e5) throw Error(`Number of vertices specified in POINT_DATA section (${e5}) must match number of points (${s2}).`);
              for (; o2 < a2; ) {
                let e6 = i2[o2];
                if (e6.match(N)) {
                  ++o2;
                  continue;
                }
                let t5 = e6.match(R);
                if (null !== t5) {
                  let e7;
                  e7 = void 0 === t5[3] ? 1 : parseInt(t5[3], 10), ++o2, function(e8, t6, r4) {
                    if (o2 === a2) throw Error("Expected LOOKUP_TABLE directive.");
                    let n3 = i2[o2++], c3 = n3.match(_);
                    if (null === c3) throw Error(`Expected LOOKUP_TABLE directive in ${JSON.stringify(n3)}.`);
                    let h2 = c3[1], u2 = f2(`SCALARS(${e8})`, s2, r4, t6);
                    l2.push({ name: e8, data: u2, numComponents: r4, dataType: t6, tableName: h2 });
                  }(t5[1], t5[2], e7);
                }
              }
            }(parseInt(e4[1], 10));
            break;
          }
          throw Error(`Failed to parse VTK line ${JSON.stringify(t4)}.`);
        }
        if (void 0 === r3) throw Error("Vertex positions not specified.");
        if (void 0 === n2) throw Error("Indices not specified.");
        return new X(e3, s2, r3, c2, n2, l2);
      }]]);
      s({ id: "parseVTKFromArrayBuffer" }, async (e3) => {
        let t3 = function(e4) {
          let t4 = new TextDecoder().decode(new Uint8Array(e4.buffer, e4.byteOffset, Math.min(e4.byteLength, 1e3))).match(F);
          if (null === t4) throw Error("Failed to parse VTK file header.");
          let r3 = t4[0].length, n2 = t4[4], i2 = t4[3], a2 = { version: t4[1], comment: t4[2], datasetType: n2, dataFormat: i2 }, o2 = new Uint8Array(e4.buffer, e4.byteOffset + r3, e4.byteLength - r3);
          if ("ASCII" === i2) {
            let e5 = H.get(n2);
            if (void 0 === e5) throw Error(`VTK dataset type ${JSON.stringify(n2)} is not supported.`);
            return e5(a2, o2);
          }
          throw Error(`VTK data format ${JSON.stringify(i2)} is not supported.`);
        }(await M(e3));
        return { value: { data: t3, size: function(e4) {
          let t4 = e4.vertexPositions.byteLength + e4.indices.byteLength;
          for (let r3 of e4.vertexAttributes) t4 += r3.data.byteLength;
          return t4;
        }(t3) }, transfer: [t3.indices.buffer, t3.vertexPositions.buffer, ...Array.from(t3.vertexAttributes.values()).map((e4) => e4.data.buffer)] };
      });
    } }, t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var a = t[n] = { exports: {} };
      return e[n].call(a.exports, a, a.exports, r), a.exports;
    }
    r.m = e, r.x = () => {
      var e2 = r.O(void 0, ["822"], function() {
        return r(7376);
      });
      return r.O(e2);
    }, r.d = function(e2, t2) {
      for (var n in t2) r.o(t2, n) && !r.o(e2, n) && Object.defineProperty(e2, n, { enumerable: true, get: t2[n] });
    }, r.f = {}, r.e = function(e2) {
      return Promise.all(Object.keys(r.f).reduce(function(t2, n) {
        return r.f[n](e2, t2), t2;
      }, []));
    }, r.u = function(e2) {
      return "822" === e2 ? "822.f53317e7d19e4212.js" : "" + e2 + "." + { 174: "50e353543e20d218", 733: "3e4d41581f5b1eae" }[e2] + ".js";
    }, r.g = function() {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || Function("return this")();
      } catch (e2) {
        if ("object" == typeof window) return window;
      }
    }(), r.o = function(e2, t2) {
      return Object.prototype.hasOwnProperty.call(e2, t2);
    }, (() => {
      var e2 = [];
      r.O = function(t2, n, i, a) {
        if (n) {
          a = a || 0;
          for (var o = e2.length; o > 0 && e2[o - 1][2] > a; o--) e2[o] = e2[o - 1];
          e2[o] = [n, i, a];
          return;
        }
        for (var s = 1 / 0, o = 0; o < e2.length; o++) {
          for (var n = e2[o][0], i = e2[o][1], a = e2[o][2], c = true, l = 0; l < n.length; l++) (false & a || s >= a) && Object.keys(r.O).every(function(e3) {
            return r.O[e3](n[l]);
          }) ? n.splice(l--, 1) : (c = false, a < s && (s = a));
          if (c) {
            e2.splice(o--, 1);
            var f = i();
            void 0 !== f && (t2 = f);
          }
        }
        return t2;
      };
    })(), r.rv = function() {
      return "1.2.2";
    }, (() => {
      var e2 = r.x;
      r.x = function() {
        return r.e("822").then(e2);
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
      if (r.g.importScripts && /^blob:/.test(r.p)) r.p = self.location.origin + "/assets/js/";
    })(), (() => {
      r.b = self.location + "";
      var e2 = { 412: 1 };
      r.f.i = function(t3, n2) {
        e2[t3] || importScripts(r.p + r.u(t3));
      };
      var t2 = globalThis.webpackChunkneuroglancer = globalThis.webpackChunkneuroglancer || [], n = t2.push.bind(t2);
      t2.push = function(t3) {
        var i = t3[0], a = t3[1], o = t3[2];
        for (var s in a) r.o(a, s) && (r.m[s] = a[s]);
        for (o && o(r); i.length; ) e2[i.pop()] = 1;
        n(t3);
      };
    })(), r.ruid = "bundler=rspack@1.2.2", r.x();
  })();
})();
