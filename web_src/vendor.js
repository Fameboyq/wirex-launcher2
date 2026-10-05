(function () {
        const l = document.createElement("link").relList;
        if (l && l.supports && l.supports("modulepreload")) return;
        for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
          o(s);
        new MutationObserver((s) => {
          for (const f of s)
            if (f.type === "childList")
              for (const c of f.addedNodes)
                c.tagName === "LINK" && c.rel === "modulepreload" && o(c);
        }).observe(document, { childList: !0, subtree: !0 });
        function i(s) {
          const f = {};
          return (
            s.integrity && (f.integrity = s.integrity),
            s.referrerPolicy && (f.referrerPolicy = s.referrerPolicy),
            s.crossOrigin === "use-credentials"
              ? (f.credentials = "include")
              : s.crossOrigin === "anonymous"
                ? (f.credentials = "omit")
                : (f.credentials = "same-origin"),
            f
          );
        }
        function o(s) {
          if (s.ep) return;
          s.ep = !0;
          const f = i(s);
          fetch(s.href, f);
        }
      })();
      function _V(a) {
        return a &&
          a.__esModule &&
          Object.prototype.hasOwnProperty.call(a, "default")
          ? a.default
          : a;
      }
      var nV = { exports: {} },
        Ar = {};
      /**
       * @license React
       * react-jsx-runtime.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var bp;
      function z1() {
        if (bp) return Ar;
        bp = 1;
        var a = Symbol.for("react.transitional.element"),
          l = Symbol.for("react.fragment");
        function i(o, s, f) {
          var c = null;
          if (
            (f !== void 0 && (c = "" + f),
            s.key !== void 0 && (c = "" + s.key),
            "key" in s)
          ) {
            f = {};
            for (var q in s) q !== "key" && (f[q] = s[q]);
          } else f = s;
          return (
            (s = f.ref),
            {
              $$typeof: a,
              type: o,
              key: c,
              ref: s !== void 0 ? s : null,
              props: f,
            }
          );
        }
        return ((Ar.Fragment = l), (Ar.jsx = i), (Ar.jsxs = i), Ar);
      }
      var Bp;
      function C1() {
        return (Bp || ((Bp = 1), (nV.exports = z1())), nV.exports);
      }
      var b = C1(),
        aV = { exports: {} },
        gr = {},
        lV = { exports: {} },
        rV = {};
      /**
       * @license React
       * scheduler.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var Rp;
      function Q1() {
        return (
          Rp ||
            ((Rp = 1),
            (function (a) {
              function l(T, P) {
                var _ = T.length;
                T.push(P);
                t: for (; 0 < _; ) {
                  var Kt = (_ - 1) >>> 1,
                    g = T[Kt];
                  if (0 < s(g, P)) ((T[Kt] = P), (T[_] = g), (_ = Kt));
                  else break t;
                }
              }
              function i(T) {
                return T.length === 0 ? null : T[0];
              }
              function o(T) {
                if (T.length === 0) return null;
                var P = T[0],
                  _ = T.pop();
                if (_ !== P) {
                  T[0] = _;
                  t: for (var Kt = 0, g = T.length, J = g >>> 1; Kt < J; ) {
                    var D = 2 * (Kt + 1) - 1,
                      j = T[D],
                      $ = D + 1,
                      ct = T[$];
                    if (0 > s(j, _))
                      $ < g && 0 > s(ct, j)
                        ? ((T[Kt] = ct), (T[$] = _), (Kt = $))
                        : ((T[Kt] = j), (T[D] = _), (Kt = D));
                    else if ($ < g && 0 > s(ct, _))
                      ((T[Kt] = ct), (T[$] = _), (Kt = $));
                    else break t;
                  }
                }
                return P;
              }
              function s(T, P) {
                var _ = T.sortIndex - P.sortIndex;
                return _ !== 0 ? _ : T.id - P.id;
              }
              if (
                ((a.unstable_now = void 0),
                typeof performance == "object" &&
                  typeof performance.now == "function")
              ) {
                var f = performance;
                a.unstable_now = function () {
                  return f.now();
                };
              } else {
                var c = Date,
                  q = c.now();
                a.unstable_now = function () {
                  return c.now() - q;
                };
              }
              var p = [],
                d = [],
                v = 1,
                m = null,
                h = 3,
                y = !1,
                A = !1,
                x = !1,
                Z = !1,
                z = typeof setTimeout == "function" ? setTimeout : null,
                G = typeof clearTimeout == "function" ? clearTimeout : null,
                Y = typeof setImmediate < "u" ? setImmediate : null;
              function L(T) {
                for (var P = i(d); P !== null; ) {
                  if (P.callback === null) o(d);
                  else if (P.startTime <= T)
                    (o(d), (P.sortIndex = P.expirationTime), l(p, P));
                  else break;
                  P = i(d);
                }
              }
              function N(T) {
                if (((x = !1), L(T), !A))
                  if (i(p) !== null) ((A = !0), I || ((I = !0), H()));
                  else {
                    var P = i(d);
                    P !== null && Ft(N, P.startTime - T);
                  }
              }
              var I = !1,
                nt = -1,
                k = 5,
                lt = -1;
              function pt() {
                return Z ? !0 : !(a.unstable_now() - lt < k);
              }
              function w() {
                if (((Z = !1), I)) {
                  var T = a.unstable_now();
                  lt = T;
                  var P = !0;
                  try {
                    t: {
                      ((A = !1), x && ((x = !1), G(nt), (nt = -1)), (y = !0));
                      var _ = h;
                      try {
                        e: {
                          for (
                            L(T), m = i(p);
                            m !== null && !(m.expirationTime > T && pt());
                          ) {
                            var Kt = m.callback;
                            if (typeof Kt == "function") {
                              ((m.callback = null), (h = m.priorityLevel));
                              var g = Kt(m.expirationTime <= T);
                              if (
                                ((T = a.unstable_now()), typeof g == "function")
                              ) {
                                ((m.callback = g), L(T), (P = !0));
                                break e;
                              }
                              (m === i(p) && o(p), L(T));
                            } else o(p);
                            m = i(p);
                          }
                          if (m !== null) P = !0;
                          else {
                            var J = i(d);
                            (J !== null && Ft(N, J.startTime - T), (P = !1));
                          }
                        }
                        break t;
                      } finally {
                        ((m = null), (h = _), (y = !1));
                      }
                      P = void 0;
                    }
                  } finally {
                    P ? H() : (I = !1);
                  }
                }
              }
              var H;
              if (typeof Y == "function")
                H = function () {
                  Y(w);
                };
              else if (typeof MessageChannel < "u") {
                var dt = new MessageChannel(),
                  rt = dt.port2;
                ((dt.port1.onmessage = w),
                  (H = function () {
                    rt.postMessage(null);
                  }));
              } else
                H = function () {
                  z(w, 0);
                };
              function Ft(T, P) {
                nt = z(function () {
                  T(a.unstable_now());
                }, P);
              }
              ((a.unstable_IdlePriority = 5),
                (a.unstable_ImmediatePriority = 1),
                (a.unstable_LowPriority = 4),
                (a.unstable_NormalPriority = 3),
                (a.unstable_Profiling = null),
                (a.unstable_UserBlockingPriority = 2),
                (a.unstable_cancelCallback = function (T) {
                  T.callback = null;
                }),
                (a.unstable_forceFrameRate = function (T) {
                  0 > T || 125 < T
                    ? console.error(
                        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                      )
                    : (k = 0 < T ? Math.floor(1e3 / T) : 5);
                }),
                (a.unstable_getCurrentPriorityLevel = function () {
                  return h;
                }),
                (a.unstable_next = function (T) {
                  switch (h) {
                    case 1:
                    case 2:
                    case 3:
                      var P = 3;
                      break;
                    default:
                      P = h;
                  }
                  var _ = h;
                  h = P;
                  try {
                    return T();
                  } finally {
                    h = _;
                  }
                }),
                (a.unstable_requestPaint = function () {
                  Z = !0;
                }),
                (a.unstable_runWithPriority = function (T, P) {
                  switch (T) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                      break;
                    default:
                      T = 3;
                  }
                  var _ = h;
                  h = T;
                  try {
                    return P();
                  } finally {
                    h = _;
                  }
                }),
                (a.unstable_scheduleCallback = function (T, P, _) {
                  var Kt = a.unstable_now();
                  switch (
                    (typeof _ == "object" && _ !== null
                      ? ((_ = _.delay),
                        (_ = typeof _ == "number" && 0 < _ ? Kt + _ : Kt))
                      : (_ = Kt),
                    T)
                  ) {
                    case 1:
                      var g = -1;
                      break;
                    case 2:
                      g = 250;
                      break;
                    case 5:
                      g = 1073741823;
                      break;
                    case 4:
                      g = 1e4;
                      break;
                    default:
                      g = 5e3;
                  }
                  return (
                    (g = _ + g),
                    (T = {
                      id: v++,
                      callback: P,
                      priorityLevel: T,
                      startTime: _,
                      expirationTime: g,
                      sortIndex: -1,
                    }),
                    _ > Kt
                      ? ((T.sortIndex = _),
                        l(d, T),
                        i(p) === null &&
                          T === i(d) &&
                          (x ? (G(nt), (nt = -1)) : (x = !0), Ft(N, _ - Kt)))
                      : ((T.sortIndex = g),
                        l(p, T),
                        A || y || ((A = !0), I || ((I = !0), H()))),
                    T
                  );
                }),
                (a.unstable_shouldYield = pt),
                (a.unstable_wrapCallback = function (T) {
                  var P = h;
                  return function () {
                    var _ = h;
                    h = P;
                    try {
                      return T.apply(this, arguments);
                    } finally {
                      h = _;
                    }
                  };
                }));
            })(rV)),
          rV
        );
      }
      var Zp;
      function b1() {
        return (Zp || ((Zp = 1), (lV.exports = Q1())), lV.exports);
      }
      var iV = { exports: {} },
        qt = {};
      /**
       * @license React
       * react.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var xp;
      function B1() {
        if (xp) return qt;
        xp = 1;
        var a = Symbol.for("react.transitional.element"),
          l = Symbol.for("react.portal"),
          i = Symbol.for("react.fragment"),
          o = Symbol.for("react.strict_mode"),
          s = Symbol.for("react.profiler"),
          f = Symbol.for("react.consumer"),
          c = Symbol.for("react.context"),
          q = Symbol.for("react.forward_ref"),
          p = Symbol.for("react.suspense"),
          d = Symbol.for("react.memo"),
          v = Symbol.for("react.lazy"),
          m = Symbol.iterator;
        function h(g) {
          return g === null || typeof g != "object"
            ? null
            : ((g = (m && g[m]) || g["@@iterator"]),
              typeof g == "function" ? g : null);
        }
        var y = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          A = Object.assign,
          x = {};
        function Z(g, J, D) {
          ((this.props = g),
            (this.context = J),
            (this.refs = x),
            (this.updater = D || y));
        }
        ((Z.prototype.isReactComponent = {}),
          (Z.prototype.setState = function (g, J) {
            if (typeof g != "object" && typeof g != "function" && g != null)
              throw Error(
                "takes an object of state variables to update or a function which returns an object of state variables.",
              );
            this.updater.enqueueSetState(this, g, J, "setState");
          }),
          (Z.prototype.forceUpdate = function (g) {
            this.updater.enqueueForceUpdate(this, g, "forceUpdate");
          }));
        function z() {}
        z.prototype = Z.prototype;
        function G(g, J, D) {
          ((this.props = g),
            (this.context = J),
            (this.refs = x),
            (this.updater = D || y));
        }
        var Y = (G.prototype = new z());
        ((Y.constructor = G), A(Y, Z.prototype), (Y.isPureReactComponent = !0));
        var L = Array.isArray,
          N = { H: null, A: null, T: null, S: null, V: null },
          I = Object.prototype.hasOwnProperty;
        function nt(g, J, D, j, $, ct) {
          return (
            (D = ct.ref),
            {
              $$typeof: a,
              type: g,
              key: J,
              ref: D !== void 0 ? D : null,
              props: ct,
            }
          );
        }
        function k(g, J) {
          return nt(g.type, J, void 0, void 0, void 0, g.props);
        }
        function lt(g) {
          return typeof g == "object" && g !== null && g.$$typeof === a;
        }
        function pt(g) {
          var J = { "=": "=0", ":": "=2" };
          return (
            "$" +
            g.replace(/[=:]/g, function (D) {
              return J[D];
            })
          );
        }
        var w = /\/+/g;
        function H(g, J) {
          return typeof g == "object" && g !== null && g.key != null
            ? pt("" + g.key)
            : J.toString(36);
        }
        function dt() {}
        function rt(g) {
          switch (g.status) {
            case "fulfilled":
              return g.value;
            case "rejected":
              throw g.reason;
            default:
              switch (
                (typeof g.status == "string"
                  ? g.then(dt, dt)
                  : ((g.status = "pending"),
                    g.then(
                      function (J) {
                        g.status === "pending" &&
                          ((g.status = "fulfilled"), (g.value = J));
                      },
                      function (J) {
                        g.status === "pending" &&
                          ((g.status = "rejected"), (g.reason = J));
                      },
                    )),
                g.status)
              ) {
                case "fulfilled":
                  return g.value;
                case "rejected":
                  throw g.reason;
              }
          }
          throw g;
        }
        function Ft(g, J, D, j, $) {
          var ct = typeof g;
          (ct === "undefined" || ct === "boolean") && (g = null);
          var at = !1;
          if (g === null) at = !0;
          else
            switch (ct) {
              case "bigint":
              case "string":
              case "number":
                at = !0;
                break;
              case "object":
                switch (g.$$typeof) {
                  case a:
                  case l:
                    at = !0;
                    break;
                  case v:
                    return ((at = g._init), Ft(at(g._payload), J, D, j, $));
                }
            }
          if (at)
            return (
              ($ = $(g)),
              (at = j === "" ? "." + H(g, 0) : j),
              L($)
                ? ((D = ""),
                  at != null && (D = at.replace(w, "$&/") + "/"),
                  Ft($, J, D, "", function (Ot) {
                    return Ot;
                  }))
                : $ != null &&
                  (lt($) &&
                    ($ = k(
                      $,
                      D +
                        ($.key == null || (g && g.key === $.key)
                          ? ""
                          : ("" + $.key).replace(w, "$&/") + "/") +
                        at,
                    )),
                  J.push($)),
              1
            );
          at = 0;
          var Xt = j === "" ? "." : j + ":";
          if (L(g))
            for (var ft = 0; ft < g.length; ft++)
              ((j = g[ft]), (ct = Xt + H(j, ft)), (at += Ft(j, J, D, ct, $)));
          else if (((ft = h(g)), typeof ft == "function"))
            for (g = ft.call(g), ft = 0; !(j = g.next()).done; )
              ((j = j.value),
                (ct = Xt + H(j, ft++)),
                (at += Ft(j, J, D, ct, $)));
          else if (ct === "object") {
            if (typeof g.then == "function") return Ft(rt(g), J, D, j, $);
            throw (
              (J = String(g)),
              Error(
                "Objects are not valid as a React child (found: " +
                  (J === "[object Object]"
                    ? "object with keys {" + Object.keys(g).join(", ") + "}"
                    : J) +
                  "). If you meant to render a collection of children, use an array instead.",
              )
            );
          }
          return at;
        }
        function T(g, J, D) {
          if (g == null) return g;
          var j = [],
            $ = 0;
          return (
            Ft(g, j, "", "", function (ct) {
              return J.call(D, ct, $++);
            }),
            j
          );
        }
        function P(g) {
          if (g._status === -1) {
            var J = g._result;
            ((J = J()),
              J.then(
                function (D) {
                  (g._status === 0 || g._status === -1) &&
                    ((g._status = 1), (g._result = D));
                },
                function (D) {
                  (g._status === 0 || g._status === -1) &&
                    ((g._status = 2), (g._result = D));
                },
              ),
              g._status === -1 && ((g._status = 0), (g._result = J)));
          }
          if (g._status === 1) return g._result.default;
          throw g._result;
        }
        var _ =
          typeof reportError == "function"
            ? reportError
            : function (g) {
                if (
                  typeof window == "object" &&
                  typeof window.ErrorEvent == "function"
                ) {
                  var J = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message:
                      typeof g == "object" &&
                      g !== null &&
                      typeof g.message == "string"
                        ? String(g.message)
                        : String(g),
                    error: g,
                  });
                  if (!window.dispatchEvent(J)) return;
                } else if (
                  typeof process == "object" &&
                  typeof process.emit == "function"
                ) {
                  process.emit("uncaughtException", g);
                  return;
                }
                console.error(g);
              };
        function Kt() {}
        return (
          (qt.Children = {
            map: T,
            forEach: function (g, J, D) {
              T(
                g,
                function () {
                  J.apply(this, arguments);
                },
                D,
              );
            },
            count: function (g) {
              var J = 0;
              return (
                T(g, function () {
                  J++;
                }),
                J
              );
            },
            toArray: function (g) {
              return (
                T(g, function (J) {
                  return J;
                }) || []
              );
            },
            only: function (g) {
              if (!lt(g))
                throw Error(
                  "React.Children.only expected to receive a single React element child.",
                );
              return g;
            },
          }),
          (qt.Component = Z),
          (qt.Fragment = i),
          (qt.Profiler = s),
          (qt.PureComponent = G),
          (qt.StrictMode = o),
          (qt.Suspense = p),
          (qt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
            N),
          (qt.__COMPILER_RUNTIME = {
            __proto__: null,
            c: function (g) {
              return N.H.useMemoCache(g);
            },
          }),
          (qt.cache = function (g) {
            return function () {
              return g.apply(null, arguments);
            };
          }),
          (qt.cloneElement = function (g, J, D) {
            if (g == null)
              throw Error(
                "The argument must be a React element, but you passed " +
                  g +
                  ".",
              );
            var j = A({}, g.props),
              $ = g.key,
              ct = void 0;
            if (J != null)
              for (at in (J.ref !== void 0 && (ct = void 0),
              J.key !== void 0 && ($ = "" + J.key),
              J))
                !I.call(J, at) ||
                  at === "key" ||
                  at === "__self" ||
                  at === "__source" ||
                  (at === "ref" && J.ref === void 0) ||
                  (j[at] = J[at]);
            var at = arguments.length - 2;
            if (at === 1) j.children = D;
            else if (1 < at) {
              for (var Xt = Array(at), ft = 0; ft < at; ft++)
                Xt[ft] = arguments[ft + 2];
              j.children = Xt;
            }
            return nt(g.type, $, void 0, void 0, ct, j);
          }),
          (qt.createContext = function (g) {
            return (
              (g = {
                $$typeof: c,
                _currentValue: g,
                _currentValue2: g,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
              }),
              (g.Provider = g),
              (g.Consumer = { $$typeof: f, _context: g }),
              g
            );
          }),
          (qt.createElement = function (g, J, D) {
            var j,
              $ = {},
              ct = null;
            if (J != null)
              for (j in (J.key !== void 0 && (ct = "" + J.key), J))
                I.call(J, j) &&
                  j !== "key" &&
                  j !== "__self" &&
                  j !== "__source" &&
                  ($[j] = J[j]);
            var at = arguments.length - 2;
            if (at === 1) $.children = D;
            else if (1 < at) {
              for (var Xt = Array(at), ft = 0; ft < at; ft++)
                Xt[ft] = arguments[ft + 2];
              $.children = Xt;
            }
            if (g && g.defaultProps)
              for (j in ((at = g.defaultProps), at))
                $[j] === void 0 && ($[j] = at[j]);
            return nt(g, ct, void 0, void 0, null, $);
          }),
          (qt.createRef = function () {
            return { current: null };
          }),
          (qt.forwardRef = function (g) {
            return { $$typeof: q, render: g };
          }),
          (qt.isValidElement = lt),
          (qt.lazy = function (g) {
            return {
              $$typeof: v,
              _payload: { _status: -1, _result: g },
              _init: P,
            };
          }),
          (qt.memo = function (g, J) {
            return { $$typeof: d, type: g, compare: J === void 0 ? null : J };
          }),
          (qt.startTransition = function (g) {
            var J = N.T,
              D = {};
            N.T = D;
            try {
              var j = g(),
                $ = N.S;
              ($ !== null && $(D, j),
                typeof j == "object" &&
                  j !== null &&
                  typeof j.then == "function" &&
                  j.then(Kt, _));
            } catch (ct) {
              _(ct);
            } finally {
              N.T = J;
            }
          }),
          (qt.unstable_useCacheRefresh = function () {
            return N.H.useCacheRefresh();
          }),
          (qt.use = function (g) {
            return N.H.use(g);
          }),
          (qt.useActionState = function (g, J, D) {
            return N.H.useActionState(g, J, D);
          }),
          (qt.useCallback = function (g, J) {
            return N.H.useCallback(g, J);
          }),
          (qt.useContext = function (g) {
            return N.H.useContext(g);
          }),
          (qt.useDebugValue = function () {}),
          (qt.useDeferredValue = function (g, J) {
            return N.H.useDeferredValue(g, J);
          }),
          (qt.useEffect = function (g, J, D) {
            var j = N.H;
            if (typeof D == "function")
              throw Error(
                "useEffect CRUD overload is not enabled in this build of React.",
              );
            return j.useEffect(g, J);
          }),
          (qt.useId = function () {
            return N.H.useId();
          }),
          (qt.useImperativeHandle = function (g, J, D) {
            return N.H.useImperativeHandle(g, J, D);
          }),
          (qt.useInsertionEffect = function (g, J) {
            return N.H.useInsertionEffect(g, J);
          }),
          (qt.useLayoutEffect = function (g, J) {
            return N.H.useLayoutEffect(g, J);
          }),
          (qt.useMemo = function (g, J) {
            return N.H.useMemo(g, J);
          }),
          (qt.useOptimistic = function (g, J) {
            return N.H.useOptimistic(g, J);
          }),
          (qt.useReducer = function (g, J, D) {
            return N.H.useReducer(g, J, D);
          }),
          (qt.useRef = function (g) {
            return N.H.useRef(g);
          }),
          (qt.useState = function (g) {
            return N.H.useState(g);
          }),
          (qt.useSyncExternalStore = function (g, J, D) {
            return N.H.useSyncExternalStore(g, J, D);
          }),
          (qt.useTransition = function () {
            return N.H.useTransition();
          }),
          (qt.version = "19.1.0"),
          qt
        );
      }
      var Tp;
      function $V() {
        return (Tp || ((Tp = 1), (iV.exports = B1())), iV.exports);
      }
      var oV = { exports: {} },
        se = {};
      /**
       * @license React
       * react-dom.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var Gp;
      function R1() {
        if (Gp) return se;
        Gp = 1;
        var a = $V();
        function l(p) {
          var d = "https://react.dev/errors/" + p;
          if (1 < arguments.length) {
            d += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var v = 2; v < arguments.length; v++)
              d += "&args[]=" + encodeURIComponent(arguments[v]);
          }
          return (
            "Minified React error #" +
            p +
            "; visit " +
            d +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        function i() {}
        var o = {
            d: {
              f: i,
              r: function () {
                throw Error(l(522));
              },
              D: i,
              C: i,
              L: i,
              m: i,
              X: i,
              S: i,
              M: i,
            },
            p: 0,
            findDOMNode: null,
          },
          s = Symbol.for("react.portal");
        function f(p, d, v) {
          var m =
            3 < arguments.length && arguments[3] !== void 0
              ? arguments[3]
              : null;
          return {
            $$typeof: s,
            key: m == null ? null : "" + m,
            children: p,
            containerInfo: d,
            implementation: v,
          };
        }
        var c =
          a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
        function q(p, d) {
          if (p === "font") return "";
          if (typeof d == "string") return d === "use-credentials" ? d : "";
        }
        return (
          (se.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
          (se.createPortal = function (p, d) {
            var v =
              2 < arguments.length && arguments[2] !== void 0
                ? arguments[2]
                : null;
            if (
              !d ||
              (d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11)
            )
              throw Error(l(299));
            return f(p, d, null, v);
          }),
          (se.flushSync = function (p) {
            var d = c.T,
              v = o.p;
            try {
              if (((c.T = null), (o.p = 2), p)) return p();
            } finally {
              ((c.T = d), (o.p = v), o.d.f());
            }
          }),
          (se.preconnect = function (p, d) {
            typeof p == "string" &&
              (d
                ? ((d = d.crossOrigin),
                  (d =
                    typeof d == "string"
                      ? d === "use-credentials"
                        ? d
                        : ""
                      : void 0))
                : (d = null),
              o.d.C(p, d));
          }),
          (se.prefetchDNS = function (p) {
            typeof p == "string" && o.d.D(p);
          }),
          (se.preinit = function (p, d) {
            if (typeof p == "string" && d && typeof d.as == "string") {
              var v = d.as,
                m = q(v, d.crossOrigin),
                h = typeof d.integrity == "string" ? d.integrity : void 0,
                y =
                  typeof d.fetchPriority == "string" ? d.fetchPriority : void 0;
              v === "style"
                ? o.d.S(
                    p,
                    typeof d.precedence == "string" ? d.precedence : void 0,
                    { crossOrigin: m, integrity: h, fetchPriority: y },
                  )
                : v === "script" &&
                  o.d.X(p, {
                    crossOrigin: m,
                    integrity: h,
                    fetchPriority: y,
                    nonce: typeof d.nonce == "string" ? d.nonce : void 0,
                  });
            }
          }),
          (se.preinitModule = function (p, d) {
            if (typeof p == "string")
              if (typeof d == "object" && d !== null) {
                if (d.as == null || d.as === "script") {
                  var v = q(d.as, d.crossOrigin);
                  o.d.M(p, {
                    crossOrigin: v,
                    integrity:
                      typeof d.integrity == "string" ? d.integrity : void 0,
                    nonce: typeof d.nonce == "string" ? d.nonce : void 0,
                  });
                }
              } else d == null && o.d.M(p);
          }),
          (se.preload = function (p, d) {
            if (
              typeof p == "string" &&
              typeof d == "object" &&
              d !== null &&
              typeof d.as == "string"
            ) {
              var v = d.as,
                m = q(v, d.crossOrigin);
              o.d.L(p, v, {
                crossOrigin: m,
                integrity:
                  typeof d.integrity == "string" ? d.integrity : void 0,
                nonce: typeof d.nonce == "string" ? d.nonce : void 0,
                type: typeof d.type == "string" ? d.type : void 0,
                fetchPriority:
                  typeof d.fetchPriority == "string" ? d.fetchPriority : void 0,
                referrerPolicy:
                  typeof d.referrerPolicy == "string"
                    ? d.referrerPolicy
                    : void 0,
                imageSrcSet:
                  typeof d.imageSrcSet == "string" ? d.imageSrcSet : void 0,
                imageSizes:
                  typeof d.imageSizes == "string" ? d.imageSizes : void 0,
                media: typeof d.media == "string" ? d.media : void 0,
              });
            }
          }),
          (se.preloadModule = function (p, d) {
            if (typeof p == "string")
              if (d) {
                var v = q(d.as, d.crossOrigin);
                o.d.m(p, {
                  as:
                    typeof d.as == "string" && d.as !== "script"
                      ? d.as
                      : void 0,
                  crossOrigin: v,
                  integrity:
                    typeof d.integrity == "string" ? d.integrity : void 0,
                });
              } else o.d.m(p);
          }),
          (se.requestFormReset = function (p) {
            o.d.r(p);
          }),
          (se.unstable_batchedUpdates = function (p, d) {
            return p(d);
          }),
          (se.useFormState = function (p, d, v) {
            return c.H.useFormState(p, d, v);
          }),
          (se.useFormStatus = function () {
            return c.H.useHostTransitionStatus();
          }),
          (se.version = "19.1.0"),
          se
        );
      }
      var Ep;
      function Z1() {
        if (Ep) return oV.exports;
        Ep = 1;
        function a() {
          if (
            !(
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
            )
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
            } catch (l) {
              console.error(l);
            }
        }
        return (a(), (oV.exports = R1()), oV.exports);
      }
      /**
       * @license React
       * react-dom-client.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var Yp;
      function x1() {
        if (Yp) return gr;
        Yp = 1;
        var a = b1(),
          l = $V(),
          i = Z1();
        function o(t) {
          var e = "https://react.dev/errors/" + t;
          if (1 < arguments.length) {
            e += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var n = 2; n < arguments.length; n++)
              e += "&args[]=" + encodeURIComponent(arguments[n]);
          }
          return (
            "Minified React error #" +
            t +
            "; visit " +
            e +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        function s(t) {
          return !(
            !t ||
            (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
          );
        }
        function f(t) {
          var e = t,
            n = t;
          if (t.alternate) for (; e.return; ) e = e.return;
          else {
            t = e;
            do
              ((e = t),
                (e.flags & 4098) !== 0 && (n = e.return),
                (t = e.return));
            while (t);
          }
          return e.tag === 3 ? n : null;
        }
        function c(t) {
          if (t.tag === 13) {
            var e = t.memoizedState;
            if (
              (e === null &&
                ((t = t.alternate), t !== null && (e = t.memoizedState)),
              e !== null)
            )
              return e.dehydrated;
          }
          return null;
        }
        function q(t) {
          if (f(t) !== t) throw Error(o(188));
        }
        function p(t) {
          var e = t.alternate;
          if (!e) {
            if (((e = f(t)), e === null)) throw Error(o(188));
            return e !== t ? null : t;
          }
          for (var n = t, r = e; ; ) {
            var u = n.return;
            if (u === null) break;
            var V = u.alternate;
            if (V === null) {
              if (((r = u.return), r !== null)) {
                n = r;
                continue;
              }
              break;
            }
            if (u.child === V.child) {
              for (V = u.child; V; ) {
                if (V === n) return (q(u), t);
                if (V === r) return (q(u), e);
                V = V.sibling;
              }
              throw Error(o(188));
            }
            if (n.return !== r.return) ((n = u), (r = V));
            else {
              for (var K = !1, U = u.child; U; ) {
                if (U === n) {
                  ((K = !0), (n = u), (r = V));
                  break;
                }
                if (U === r) {
                  ((K = !0), (r = u), (n = V));
                  break;
                }
                U = U.sibling;
              }
              if (!K) {
                for (U = V.child; U; ) {
                  if (U === n) {
                    ((K = !0), (n = V), (r = u));
                    break;
                  }
                  if (U === r) {
                    ((K = !0), (r = V), (n = u));
                    break;
                  }
                  U = U.sibling;
                }
                if (!K) throw Error(o(189));
              }
            }
            if (n.alternate !== r) throw Error(o(190));
          }
          if (n.tag !== 3) throw Error(o(188));
          return n.stateNode.current === n ? t : e;
        }
        function d(t) {
          var e = t.tag;
          if (e === 5 || e === 26 || e === 27 || e === 6) return t;
          for (t = t.child; t !== null; ) {
            if (((e = d(t)), e !== null)) return e;
            t = t.sibling;
          }
          return null;
        }
        var v = Object.assign,
          m = Symbol.for("react.element"),
          h = Symbol.for("react.transitional.element"),
          y = Symbol.for("react.portal"),
          A = Symbol.for("react.fragment"),
          x = Symbol.for("react.strict_mode"),
          Z = Symbol.for("react.profiler"),
          z = Symbol.for("react.provider"),
          G = Symbol.for("react.consumer"),
          Y = Symbol.for("react.context"),
          L = Symbol.for("react.forward_ref"),
          N = Symbol.for("react.suspense"),
          I = Symbol.for("react.suspense_list"),
          nt = Symbol.for("react.memo"),
          k = Symbol.for("react.lazy"),
          lt = Symbol.for("react.activity"),
          pt = Symbol.for("react.memo_cache_sentinel"),
          w = Symbol.iterator;
        function H(t) {
          return t === null || typeof t != "object"
            ? null
            : ((t = (w && t[w]) || t["@@iterator"]),
              typeof t == "function" ? t : null);
        }
        var dt = Symbol.for("react.client.reference");
        function rt(t) {
          if (t == null) return null;
          if (typeof t == "function")
            return t.$$typeof === dt ? null : t.displayName || t.name || null;
          if (typeof t == "string") return t;
          switch (t) {
            case A:
              return "Fragment";
            case Z:
              return "Profiler";
            case x:
              return "StrictMode";
            case N:
              return "Suspense";
            case I:
              return "SuspenseList";
            case lt:
              return "Activity";
          }
          if (typeof t == "object")
            switch (t.$$typeof) {
              case y:
                return "Portal";
              case Y:
                return (t.displayName || "Context") + ".Provider";
              case G:
                return (t._context.displayName || "Context") + ".Consumer";
              case L:
                var e = t.render;
                return (
                  (t = t.displayName),
                  t ||
                    ((t = e.displayName || e.name || ""),
                    (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
                  t
                );
              case nt:
                return (
                  (e = t.displayName || null),
                  e !== null ? e : rt(t.type) || "Memo"
                );
              case k:
                ((e = t._payload), (t = t._init));
                try {
                  return rt(t(e));
                } catch {}
            }
          return null;
        }
        var Ft = Array.isArray,
          T = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
          P = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
          _ = { pending: !1, data: null, method: null, action: null },
          Kt = [],
          g = -1;
        function J(t) {
          return { current: t };
        }
        function D(t) {
          0 > g || ((t.current = Kt[g]), (Kt[g] = null), g--);
        }
        function j(t, e) {
          (g++, (Kt[g] = t.current), (t.current = e));
        }
        var $ = J(null),
          ct = J(null),
          at = J(null),
          Xt = J(null);
        function ft(t, e) {
          switch ((j(at, e), j(ct, t), j($, null), e.nodeType)) {
            case 9:
            case 11:
              t = (t = e.documentElement) && (t = t.namespaceURI) ? rp(t) : 0;
              break;
            default:
              if (((t = e.tagName), (e = e.namespaceURI)))
                ((e = rp(e)), (t = ip(e, t)));
              else
                switch (t) {
                  case "svg":
                    t = 1;
                    break;
                  case "math":
                    t = 2;
                    break;
                  default:
                    t = 0;
                }
          }
          (D($), j($, t));
        }
        function Ot() {
          (D($), D(ct), D(at));
        }
        function Ze(t) {
          t.memoizedState !== null && j(Xt, t);
          var e = $.current,
            n = ip(e, t.type);
          e !== n && (j(ct, t), j($, n));
        }
        function ye(t) {
          (ct.current === t && (D($), D(ct)),
            Xt.current === t && (D(Xt), (Ur._currentValue = _)));
        }
        var Ae = Object.prototype.hasOwnProperty,
          Rt = a.unstable_scheduleCallback,
          At = a.unstable_cancelCallback,
          ie = a.unstable_shouldYield,
          _e = a.unstable_requestPaint,
          ge = a.unstable_now,
          u3 = a.unstable_getCurrentPriorityLevel,
          Yf = a.unstable_ImmediatePriority,
          Mf = a.unstable_UserBlockingPriority,
          _r = a.unstable_NormalPriority,
          s3 = a.unstable_LowPriority,
          Of = a.unstable_IdlePriority,
          V3 = a.log,
          f3 = a.unstable_setDisableYieldValue,
          Wl = null,
          Xe = null;
        function bn(t) {
          if (
            (typeof V3 == "function" && f3(t),
            Xe && typeof Xe.setStrictMode == "function")
          )
            try {
              Xe.setStrictMode(Wl, t);
            } catch {}
        }
        var We = Math.clz32 ? Math.clz32 : d3,
          c3 = Math.log,
          q3 = Math.LN2;
        function d3(t) {
          return ((t >>>= 0), t === 0 ? 32 : (31 - ((c3(t) / q3) | 0)) | 0);
        }
        var $r = 256,
          ti = 4194304;
        function ra(t) {
          var e = t & 42;
          if (e !== 0) return e;
          switch (t & -t) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
              return 64;
            case 128:
              return 128;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t & 4194048;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              return t & 62914560;
            case 67108864:
              return 67108864;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 0;
            default:
              return t;
          }
        }
        function ei(t, e, n) {
          var r = t.pendingLanes;
          if (r === 0) return 0;
          var u = 0,
            V = t.suspendedLanes,
            K = t.pingedLanes;
          t = t.warmLanes;
          var U = r & 134217727;
          return (
            U !== 0
              ? ((r = U & ~V),
                r !== 0
                  ? (u = ra(r))
                  : ((K &= U),
                    K !== 0
                      ? (u = ra(K))
                      : n || ((n = U & ~t), n !== 0 && (u = ra(n)))))
              : ((U = r & ~V),
                U !== 0
                  ? (u = ra(U))
                  : K !== 0
                    ? (u = ra(K))
                    : n || ((n = r & ~t), n !== 0 && (u = ra(n)))),
            u === 0
              ? 0
              : e !== 0 &&
                  e !== u &&
                  (e & V) === 0 &&
                  ((V = u & -u),
                  (n = e & -e),
                  V >= n || (V === 32 && (n & 4194048) !== 0))
                ? e
                : u
          );
        }
        function Sl(t, e) {
          return (
            (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0
          );
        }
        function p3(t, e) {
          switch (t) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 64:
              return e + 250;
            case 16:
            case 32:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return e + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              return -1;
            case 67108864:
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
              return -1;
            default:
              return -1;
          }
        }
        function Nf() {
          var t = $r;
          return (($r <<= 1), ($r & 4194048) === 0 && ($r = 256), t);
        }
        function Jf() {
          var t = ti;
          return ((ti <<= 1), (ti & 62914560) === 0 && (ti = 4194304), t);
        }
        function ko(t) {
          for (var e = [], n = 0; 31 > n; n++) e.push(t);
          return e;
        }
        function zl(t, e) {
          ((t.pendingLanes |= e),
            e !== 268435456 &&
              ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
        }
        function K3(t, e, n, r, u, V) {
          var K = t.pendingLanes;
          ((t.pendingLanes = n),
            (t.suspendedLanes = 0),
            (t.pingedLanes = 0),
            (t.warmLanes = 0),
            (t.expiredLanes &= n),
            (t.entangledLanes &= n),
            (t.errorRecoveryDisabledLanes &= n),
            (t.shellSuspendCounter = 0));
          var U = t.entanglements,
            F = t.expirationTimes,
            Q = t.hiddenUpdates;
          for (n = K & ~n; 0 < n; ) {
            var E = 31 - We(n),
              O = 1 << E;
            ((U[E] = 0), (F[E] = -1));
            var B = Q[E];
            if (B !== null)
              for (Q[E] = null, E = 0; E < B.length; E++) {
                var R = B[E];
                R !== null && (R.lane &= -536870913);
              }
            n &= ~O;
          }
          (r !== 0 && Pf(t, r, 0),
            V !== 0 &&
              u === 0 &&
              t.tag !== 0 &&
              (t.suspendedLanes |= V & ~(K & ~e)));
        }
        function Pf(t, e, n) {
          ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
          var r = 31 - We(e);
          ((t.entangledLanes |= e),
            (t.entanglements[r] =
              t.entanglements[r] | 1073741824 | (n & 4194090)));
        }
        function kf(t, e) {
          var n = (t.entangledLanes |= e);
          for (t = t.entanglements; n; ) {
            var r = 31 - We(n),
              u = 1 << r;
            ((u & e) | (t[r] & e) && (t[r] |= e), (n &= ~u));
          }
        }
        function Ho(t) {
          switch (t) {
            case 2:
              t = 1;
              break;
            case 8:
              t = 4;
              break;
            case 32:
              t = 16;
              break;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              t = 128;
              break;
            case 268435456:
              t = 134217728;
              break;
            default:
              t = 0;
          }
          return t;
        }
        function jo(t) {
          return (
            (t &= -t),
            2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
          );
        }
        function Hf() {
          var t = P.p;
          return t !== 0
            ? t
            : ((t = window.event), t === void 0 ? 32 : Xp(t.type));
        }
        function v3(t, e) {
          var n = P.p;
          try {
            return ((P.p = t), e());
          } finally {
            P.p = n;
          }
        }
        var Bn = Math.random().toString(36).slice(2),
          oe = "__reactFiber$" + Bn,
          Ke = "__reactProps$" + Bn,
          Ca = "__reactContainer$" + Bn,
          Io = "__reactEvents$" + Bn,
          U3 = "__reactListeners$" + Bn,
          m3 = "__reactHandles$" + Bn,
          jf = "__reactResources$" + Bn,
          Cl = "__reactMarker$" + Bn;
        function Do(t) {
          (delete t[oe],
            delete t[Ke],
            delete t[Io],
            delete t[U3],
            delete t[m3]);
        }
        function Qa(t) {
          var e = t[oe];
          if (e) return e;
          for (var n = t.parentNode; n; ) {
            if ((e = n[Ca] || n[oe])) {
              if (
                ((n = e.alternate),
                e.child !== null || (n !== null && n.child !== null))
              )
                for (t = Vp(t); t !== null; ) {
                  if ((n = t[oe])) return n;
                  t = Vp(t);
                }
              return e;
            }
            ((t = n), (n = t.parentNode));
          }
          return null;
        }
        function ba(t) {
          if ((t = t[oe] || t[Ca])) {
            var e = t.tag;
            if (
              e === 5 ||
              e === 6 ||
              e === 13 ||
              e === 26 ||
              e === 27 ||
              e === 3
            )
              return t;
          }
          return null;
        }
        function Ql(t) {
          var e = t.tag;
          if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
          throw Error(o(33));
        }
        function Ba(t) {
          var e = t[jf];
          return (
            e ||
              (e = t[jf] =
                { hoistableStyles: new Map(), hoistableScripts: new Map() }),
            e
          );
        }
        function _t(t) {
          t[Cl] = !0;
        }
        var If = new Set(),
          Df = {};
        function ia(t, e) {
          (Ra(t, e), Ra(t + "Capture", e));
        }
        function Ra(t, e) {
          for (Df[t] = e, t = 0; t < e.length; t++) If.add(e[t]);
        }
        var h3 = RegExp(
            "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
          ),
          Lf = {},
          wf = {};
        function F3(t) {
          return Ae.call(wf, t)
            ? !0
            : Ae.call(Lf, t)
              ? !1
              : h3.test(t)
                ? (wf[t] = !0)
                : ((Lf[t] = !0), !1);
        }
        function ni(t, e, n) {
          if (F3(e))
            if (n === null) t.removeAttribute(e);
            else {
              switch (typeof n) {
                case "undefined":
                case "function":
                case "symbol":
                  t.removeAttribute(e);
                  return;
                case "boolean":
                  var r = e.toLowerCase().slice(0, 5);
                  if (r !== "data-" && r !== "aria-") {
                    t.removeAttribute(e);
                    return;
                  }
              }
              t.setAttribute(e, "" + n);
            }
        }
        function ai(t, e, n) {
          if (n === null) t.removeAttribute(e);
          else {
            switch (typeof n) {
              case "undefined":
              case "function":
              case "symbol":
              case "boolean":
                t.removeAttribute(e);
                return;
            }
            t.setAttribute(e, "" + n);
          }
        }
        function fn(t, e, n, r) {
          if (r === null) t.removeAttribute(n);
          else {
            switch (typeof r) {
              case "undefined":
              case "function":
              case "symbol":
              case "boolean":
                t.removeAttribute(n);
                return;
            }
            t.setAttributeNS(e, n, "" + r);
          }
        }
        var Lo, _f;
        function Za(t) {
          if (Lo === void 0)
            try {
              throw Error();
            } catch (n) {
              var e = n.stack.trim().match(/\n( *(at )?)/);
              ((Lo = (e && e[1]) || ""),
                (_f =
                  -1 <
                  n.stack.indexOf(`
    at`)
                    ? " (<anonymous>)"
                    : -1 < n.stack.indexOf("@")
                      ? "@unknown:0:0"
                      : ""));
            }
          return (
            `
` +
            Lo +
            t +
            _f
          );
        }
        var wo = !1;
        function _o(t, e) {
          if (!t || wo) return "";
          wo = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            var r = {
              DetermineComponentFrameRoot: function () {
                try {
                  if (e) {
                    var O = function () {
                      throw Error();
                    };
                    if (
                      (Object.defineProperty(O.prototype, "props", {
                        set: function () {
                          throw Error();
                        },
                      }),
                      typeof Reflect == "object" && Reflect.construct)
                    ) {
                      try {
                        Reflect.construct(O, []);
                      } catch (R) {
                        var B = R;
                      }
                      Reflect.construct(t, [], O);
                    } else {
                      try {
                        O.call();
                      } catch (R) {
                        B = R;
                      }
                      t.call(O.prototype);
                    }
                  } else {
                    try {
                      throw Error();
                    } catch (R) {
                      B = R;
                    }
                    (O = t()) &&
                      typeof O.catch == "function" &&
                      O.catch(function () {});
                  }
                } catch (R) {
                  if (R && B && typeof R.stack == "string")
                    return [R.stack, B.stack];
                }
                return [null, null];
              },
            };
            r.DetermineComponentFrameRoot.displayName =
              "DetermineComponentFrameRoot";
            var u = Object.getOwnPropertyDescriptor(
              r.DetermineComponentFrameRoot,
              "name",
            );
            u &&
              u.configurable &&
              Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot",
              });
            var V = r.DetermineComponentFrameRoot(),
              K = V[0],
              U = V[1];
            if (K && U) {
              var F = K.split(`
`),
                Q = U.split(`
`);
              for (
                u = r = 0;
                r < F.length && !F[r].includes("DetermineComponentFrameRoot");
              )
                r++;
              for (
                ;
                u < Q.length && !Q[u].includes("DetermineComponentFrameRoot");
              )
                u++;
              if (r === F.length || u === Q.length)
                for (
                  r = F.length - 1, u = Q.length - 1;
                  1 <= r && 0 <= u && F[r] !== Q[u];
                )
                  u--;
              for (; 1 <= r && 0 <= u; r--, u--)
                if (F[r] !== Q[u]) {
                  if (r !== 1 || u !== 1)
                    do
                      if ((r--, u--, 0 > u || F[r] !== Q[u])) {
                        var E =
                          `
` + F[r].replace(" at new ", " at ");
                        return (
                          t.displayName &&
                            E.includes("<anonymous>") &&
                            (E = E.replace("<anonymous>", t.displayName)),
                          E
                        );
                      }
                    while (1 <= r && 0 <= u);
                  break;
                }
            }
          } finally {
            ((wo = !1), (Error.prepareStackTrace = n));
          }
          return (n = t ? t.displayName || t.name : "") ? Za(n) : "";
        }
        function y3(t) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              return Za(t.type);
            case 16:
              return Za("Lazy");
            case 13:
              return Za("Suspense");
            case 19:
              return Za("SuspenseList");
            case 0:
            case 15:
              return _o(t.type, !1);
            case 11:
              return _o(t.type.render, !1);
            case 1:
              return _o(t.type, !0);
            case 31:
              return Za("Activity");
            default:
              return "";
          }
        }
        function $f(t) {
          try {
            var e = "";
            do ((e += y3(t)), (t = t.return));
            while (t);
            return e;
          } catch (n) {
            return (
              `
Error generating stack: ` +
              n.message +
              `
` +
              n.stack
            );
          }
        }
        function xe(t) {
          switch (typeof t) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
              return t;
            case "object":
              return t;
            default:
              return "";
          }
        }
        function tc(t) {
          var e = t.type;
          return (
            (t = t.nodeName) &&
            t.toLowerCase() === "input" &&
            (e === "checkbox" || e === "radio")
          );
        }
        function A3(t) {
          var e = tc(t) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
            r = "" + t[e];
          if (
            !t.hasOwnProperty(e) &&
            typeof n < "u" &&
            typeof n.get == "function" &&
            typeof n.set == "function"
          ) {
            var u = n.get,
              V = n.set;
            return (
              Object.defineProperty(t, e, {
                configurable: !0,
                get: function () {
                  return u.call(this);
                },
                set: function (K) {
                  ((r = "" + K), V.call(this, K));
                },
              }),
              Object.defineProperty(t, e, { enumerable: n.enumerable }),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (K) {
                  r = "" + K;
                },
                stopTracking: function () {
                  ((t._valueTracker = null), delete t[e]);
                },
              }
            );
          }
        }
        function li(t) {
          t._valueTracker || (t._valueTracker = A3(t));
        }
        function ec(t) {
          if (!t) return !1;
          var e = t._valueTracker;
          if (!e) return !0;
          var n = e.getValue(),
            r = "";
          return (
            t && (r = tc(t) ? (t.checked ? "true" : "false") : t.value),
            (t = r),
            t !== n ? (e.setValue(t), !0) : !1
          );
        }
        function ri(t) {
          if (
            ((t = t || (typeof document < "u" ? document : void 0)),
            typeof t > "u")
          )
            return null;
          try {
            return t.activeElement || t.body;
          } catch {
            return t.body;
          }
        }
        var g3 = /[\n"\\]/g;
        function Te(t) {
          return t.replace(g3, function (e) {
            return "\\" + e.charCodeAt(0).toString(16) + " ";
          });
        }
        function $o(t, e, n, r, u, V, K, U) {
          ((t.name = ""),
            K != null &&
            typeof K != "function" &&
            typeof K != "symbol" &&
            typeof K != "boolean"
              ? (t.type = K)
              : t.removeAttribute("type"),
            e != null
              ? K === "number"
                ? ((e === 0 && t.value === "") || t.value != e) &&
                  (t.value = "" + xe(e))
                : t.value !== "" + xe(e) && (t.value = "" + xe(e))
              : (K !== "submit" && K !== "reset") || t.removeAttribute("value"),
            e != null
              ? tu(t, K, xe(e))
              : n != null
                ? tu(t, K, xe(n))
                : r != null && t.removeAttribute("value"),
            u == null && V != null && (t.defaultChecked = !!V),
            u != null &&
              (t.checked = u && typeof u != "function" && typeof u != "symbol"),
            U != null &&
            typeof U != "function" &&
            typeof U != "symbol" &&
            typeof U != "boolean"
              ? (t.name = "" + xe(U))
              : t.removeAttribute("name"));
        }
        function nc(t, e, n, r, u, V, K, U) {
          if (
            (V != null &&
              typeof V != "function" &&
              typeof V != "symbol" &&
              typeof V != "boolean" &&
              (t.type = V),
            e != null || n != null)
          ) {
            if (!((V !== "submit" && V !== "reset") || e != null)) return;
            ((n = n != null ? "" + xe(n) : ""),
              (e = e != null ? "" + xe(e) : n),
              U || e === t.value || (t.value = e),
              (t.defaultValue = e));
          }
          ((r = r ?? u),
            (r = typeof r != "function" && typeof r != "symbol" && !!r),
            (t.checked = U ? t.checked : !!r),
            (t.defaultChecked = !!r),
            K != null &&
              typeof K != "function" &&
              typeof K != "symbol" &&
              typeof K != "boolean" &&
              (t.name = K));
        }
        function tu(t, e, n) {
          (e === "number" && ri(t.ownerDocument) === t) ||
            t.defaultValue === "" + n ||
            (t.defaultValue = "" + n);
        }
        function xa(t, e, n, r) {
          if (((t = t.options), e)) {
            e = {};
            for (var u = 0; u < n.length; u++) e["$" + n[u]] = !0;
            for (n = 0; n < t.length; n++)
              ((u = e.hasOwnProperty("$" + t[n].value)),
                t[n].selected !== u && (t[n].selected = u),
                u && r && (t[n].defaultSelected = !0));
          } else {
            for (n = "" + xe(n), e = null, u = 0; u < t.length; u++) {
              if (t[u].value === n) {
                ((t[u].selected = !0), r && (t[u].defaultSelected = !0));
                return;
              }
              e !== null || t[u].disabled || (e = t[u]);
            }
            e !== null && (e.selected = !0);
          }
        }
        function ac(t, e, n) {
          if (
            e != null &&
            ((e = "" + xe(e)), e !== t.value && (t.value = e), n == null)
          ) {
            t.defaultValue !== e && (t.defaultValue = e);
            return;
          }
          t.defaultValue = n != null ? "" + xe(n) : "";
        }
        function lc(t, e, n, r) {
          if (e == null) {
            if (r != null) {
              if (n != null) throw Error(o(92));
              if (Ft(r)) {
                if (1 < r.length) throw Error(o(93));
                r = r[0];
              }
              n = r;
            }
            (n == null && (n = ""), (e = n));
          }
          ((n = xe(e)),
            (t.defaultValue = n),
            (r = t.textContent),
            r === n && r !== "" && r !== null && (t.value = r));
        }
        function Ta(t, e) {
          if (e) {
            var n = t.firstChild;
            if (n && n === t.lastChild && n.nodeType === 3) {
              n.nodeValue = e;
              return;
            }
          }
          t.textContent = e;
        }
        var X3 = new Set(
          "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
            " ",
          ),
        );
        function rc(t, e, n) {
          var r = e.indexOf("--") === 0;
          n == null || typeof n == "boolean" || n === ""
            ? r
              ? t.setProperty(e, "")
              : e === "float"
                ? (t.cssFloat = "")
                : (t[e] = "")
            : r
              ? t.setProperty(e, n)
              : typeof n != "number" || n === 0 || X3.has(e)
                ? e === "float"
                  ? (t.cssFloat = n)
                  : (t[e] = ("" + n).trim())
                : (t[e] = n + "px");
        }
        function ic(t, e, n) {
          if (e != null && typeof e != "object") throw Error(o(62));
          if (((t = t.style), n != null)) {
            for (var r in n)
              !n.hasOwnProperty(r) ||
                (e != null && e.hasOwnProperty(r)) ||
                (r.indexOf("--") === 0
                  ? t.setProperty(r, "")
                  : r === "float"
                    ? (t.cssFloat = "")
                    : (t[r] = ""));
            for (var u in e)
              ((r = e[u]), e.hasOwnProperty(u) && n[u] !== r && rc(t, u, r));
          } else for (var V in e) e.hasOwnProperty(V) && rc(t, V, e[V]);
        }
        function eu(t) {
          if (t.indexOf("-") === -1) return !1;
          switch (t) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return !1;
            default:
              return !0;
          }
        }
        var W3 = new Map([
            ["acceptCharset", "accept-charset"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
            ["crossOrigin", "crossorigin"],
            ["accentHeight", "accent-height"],
            ["alignmentBaseline", "alignment-baseline"],
            ["arabicForm", "arabic-form"],
            ["baselineShift", "baseline-shift"],
            ["capHeight", "cap-height"],
            ["clipPath", "clip-path"],
            ["clipRule", "clip-rule"],
            ["colorInterpolation", "color-interpolation"],
            ["colorInterpolationFilters", "color-interpolation-filters"],
            ["colorProfile", "color-profile"],
            ["colorRendering", "color-rendering"],
            ["dominantBaseline", "dominant-baseline"],
            ["enableBackground", "enable-background"],
            ["fillOpacity", "fill-opacity"],
            ["fillRule", "fill-rule"],
            ["floodColor", "flood-color"],
            ["floodOpacity", "flood-opacity"],
            ["fontFamily", "font-family"],
            ["fontSize", "font-size"],
            ["fontSizeAdjust", "font-size-adjust"],
            ["fontStretch", "font-stretch"],
            ["fontStyle", "font-style"],
            ["fontVariant", "font-variant"],
            ["fontWeight", "font-weight"],
            ["glyphName", "glyph-name"],
            ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
            ["glyphOrientationVertical", "glyph-orientation-vertical"],
            ["horizAdvX", "horiz-adv-x"],
            ["horizOriginX", "horiz-origin-x"],
            ["imageRendering", "image-rendering"],
            ["letterSpacing", "letter-spacing"],
            ["lightingColor", "lighting-color"],
            ["markerEnd", "marker-end"],
            ["markerMid", "marker-mid"],
            ["markerStart", "marker-start"],
            ["overlinePosition", "overline-position"],
            ["overlineThickness", "overline-thickness"],
            ["paintOrder", "paint-order"],
            ["panose-1", "panose-1"],
            ["pointerEvents", "pointer-events"],
            ["renderingIntent", "rendering-intent"],
            ["shapeRendering", "shape-rendering"],
            ["stopColor", "stop-color"],
            ["stopOpacity", "stop-opacity"],
            ["strikethroughPosition", "strikethrough-position"],
            ["strikethroughThickness", "strikethrough-thickness"],
            ["strokeDasharray", "stroke-dasharray"],
            ["strokeDashoffset", "stroke-dashoffset"],
            ["strokeLinecap", "stroke-linecap"],
            ["strokeLinejoin", "stroke-linejoin"],
            ["strokeMiterlimit", "stroke-miterlimit"],
            ["strokeOpacity", "stroke-opacity"],
            ["strokeWidth", "stroke-width"],
            ["textAnchor", "text-anchor"],
            ["textDecoration", "text-decoration"],
            ["textRendering", "text-rendering"],
            ["transformOrigin", "transform-origin"],
            ["underlinePosition", "underline-position"],
            ["underlineThickness", "underline-thickness"],
            ["unicodeBidi", "unicode-bidi"],
            ["unicodeRange", "unicode-range"],
            ["unitsPerEm", "units-per-em"],
            ["vAlphabetic", "v-alphabetic"],
            ["vHanging", "v-hanging"],
            ["vIdeographic", "v-ideographic"],
            ["vMathematical", "v-mathematical"],
            ["vectorEffect", "vector-effect"],
            ["vertAdvY", "vert-adv-y"],
            ["vertOriginX", "vert-origin-x"],
            ["vertOriginY", "vert-origin-y"],
            ["wordSpacing", "word-spacing"],
            ["writingMode", "writing-mode"],
            ["xmlnsXlink", "xmlns:xlink"],
            ["xHeight", "x-height"],
          ]),
          S3 =
            /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
        function ii(t) {
          return S3.test("" + t)
            ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            : t;
        }
        var nu = null;
        function au(t) {
          return (
            (t = t.target || t.srcElement || window),
            t.correspondingUseElement && (t = t.correspondingUseElement),
            t.nodeType === 3 ? t.parentNode : t
          );
        }
        var Ga = null,
          Ea = null;
        function oc(t) {
          var e = ba(t);
          if (e && (t = e.stateNode)) {
            var n = t[Ke] || null;
            t: switch (((t = e.stateNode), e.type)) {
              case "input":
                if (
                  ($o(
                    t,
                    n.value,
                    n.defaultValue,
                    n.defaultValue,
                    n.checked,
                    n.defaultChecked,
                    n.type,
                    n.name,
                  ),
                  (e = n.name),
                  n.type === "radio" && e != null)
                ) {
                  for (n = t; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      'input[name="' + Te("" + e) + '"][type="radio"]',
                    ),
                      e = 0;
                    e < n.length;
                    e++
                  ) {
                    var r = n[e];
                    if (r !== t && r.form === t.form) {
                      var u = r[Ke] || null;
                      if (!u) throw Error(o(90));
                      $o(
                        r,
                        u.value,
                        u.defaultValue,
                        u.defaultValue,
                        u.checked,
                        u.defaultChecked,
                        u.type,
                        u.name,
                      );
                    }
                  }
                  for (e = 0; e < n.length; e++)
                    ((r = n[e]), r.form === t.form && ec(r));
                }
                break t;
              case "textarea":
                ac(t, n.value, n.defaultValue);
                break t;
              case "select":
                ((e = n.value), e != null && xa(t, !!n.multiple, e, !1));
            }
          }
        }
        var lu = !1;
        function uc(t, e, n) {
          if (lu) return t(e, n);
          lu = !0;
          try {
            var r = t(e);
            return r;
          } finally {
            if (
              ((lu = !1),
              (Ga !== null || Ea !== null) &&
                (ki(), Ga && ((e = Ga), (t = Ea), (Ea = Ga = null), oc(e), t)))
            )
              for (e = 0; e < t.length; e++) oc(t[e]);
          }
        }
        function bl(t, e) {
          var n = t.stateNode;
          if (n === null) return null;
          var r = n[Ke] || null;
          if (r === null) return null;
          n = r[e];
          t: switch (e) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              ((r = !r.disabled) ||
                ((t = t.type),
                (r = !(
                  t === "button" ||
                  t === "input" ||
                  t === "select" ||
                  t === "textarea"
                ))),
                (t = !r));
              break t;
            default:
              t = !1;
          }
          if (t) return null;
          if (n && typeof n != "function") throw Error(o(231, e, typeof n));
          return n;
        }
        var cn = !(
            typeof window > "u" ||
            typeof window.document > "u" ||
            typeof window.document.createElement > "u"
          ),
          ru = !1;
        if (cn)
          try {
            var Bl = {};
            (Object.defineProperty(Bl, "passive", {
              get: function () {
                ru = !0;
              },
            }),
              window.addEventListener("test", Bl, Bl),
              window.removeEventListener("test", Bl, Bl));
          } catch {
            ru = !1;
          }
        var Rn = null,
          iu = null,
          oi = null;
        function sc() {
          if (oi) return oi;
          var t,
            e = iu,
            n = e.length,
            r,
            u = "value" in Rn ? Rn.value : Rn.textContent,
            V = u.length;
          for (t = 0; t < n && e[t] === u[t]; t++);
          var K = n - t;
          for (r = 1; r <= K && e[n - r] === u[V - r]; r++);
          return (oi = u.slice(t, 1 < r ? 1 - r : void 0));
        }
        function ui(t) {
          var e = t.keyCode;
          return (
            "charCode" in t
              ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
              : (t = e),
            t === 10 && (t = 13),
            32 <= t || t === 13 ? t : 0
          );
        }
        function si() {
          return !0;
        }
        function Vc() {
          return !1;
        }
        function ve(t) {
          function e(n, r, u, V, K) {
            ((this._reactName = n),
              (this._targetInst = u),
              (this.type = r),
              (this.nativeEvent = V),
              (this.target = K),
              (this.currentTarget = null));
            for (var U in t)
              t.hasOwnProperty(U) && ((n = t[U]), (this[U] = n ? n(V) : V[U]));
            return (
              (this.isDefaultPrevented = (
                V.defaultPrevented != null
                  ? V.defaultPrevented
                  : V.returnValue === !1
              )
                ? si
                : Vc),
              (this.isPropagationStopped = Vc),
              this
            );
          }
          return (
            v(e.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                  (n.preventDefault
                    ? n.preventDefault()
                    : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                  (this.isDefaultPrevented = si));
              },
              stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                  (n.stopPropagation
                    ? n.stopPropagation()
                    : typeof n.cancelBubble != "unknown" &&
                      (n.cancelBubble = !0),
                  (this.isPropagationStopped = si));
              },
              persist: function () {},
              isPersistent: si,
            }),
            e
          );
        }
        var oa = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (t) {
              return t.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          Vi = ve(oa),
          Rl = v({}, oa, { view: 0, detail: 0 }),
          z3 = ve(Rl),
          ou,
          uu,
          Zl,
          fi = v({}, Rl, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: Vu,
            button: 0,
            buttons: 0,
            relatedTarget: function (t) {
              return t.relatedTarget === void 0
                ? t.fromElement === t.srcElement
                  ? t.toElement
                  : t.fromElement
                : t.relatedTarget;
            },
            movementX: function (t) {
              return "movementX" in t
                ? t.movementX
                : (t !== Zl &&
                    (Zl && t.type === "mousemove"
                      ? ((ou = t.screenX - Zl.screenX),
                        (uu = t.screenY - Zl.screenY))
                      : (uu = ou = 0),
                    (Zl = t)),
                  ou);
            },
            movementY: function (t) {
              return "movementY" in t ? t.movementY : uu;
            },
          }),
          fc = ve(fi),
          C3 = v({}, fi, { dataTransfer: 0 }),
          Q3 = ve(C3),
          b3 = v({}, Rl, { relatedTarget: 0 }),
          su = ve(b3),
          B3 = v({}, oa, {
            animationName: 0,
            elapsedTime: 0,
            pseudoElement: 0,
          }),
          R3 = ve(B3),
          Z3 = v({}, oa, {
            clipboardData: function (t) {
              return "clipboardData" in t
                ? t.clipboardData
                : window.clipboardData;
            },
          }),
          x3 = ve(Z3),
          T3 = v({}, oa, { data: 0 }),
          cc = ve(T3),
          G3 = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified",
          },
          E3 = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta",
          },
          Y3 = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey",
          };
        function M3(t) {
          var e = this.nativeEvent;
          return e.getModifierState
            ? e.getModifierState(t)
            : (t = Y3[t])
              ? !!e[t]
              : !1;
        }
        function Vu() {
          return M3;
        }
        var O3 = v({}, Rl, {
            key: function (t) {
              if (t.key) {
                var e = G3[t.key] || t.key;
                if (e !== "Unidentified") return e;
              }
              return t.type === "keypress"
                ? ((t = ui(t)), t === 13 ? "Enter" : String.fromCharCode(t))
                : t.type === "keydown" || t.type === "keyup"
                  ? E3[t.keyCode] || "Unidentified"
                  : "";
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Vu,
            charCode: function (t) {
              return t.type === "keypress" ? ui(t) : 0;
            },
            keyCode: function (t) {
              return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
            },
            which: function (t) {
              return t.type === "keypress"
                ? ui(t)
                : t.type === "keydown" || t.type === "keyup"
                  ? t.keyCode
                  : 0;
            },
          }),
          N3 = ve(O3),
          J3 = v({}, fi, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0,
          }),
          qc = ve(J3),
          P3 = v({}, Rl, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: Vu,
          }),
          k3 = ve(P3),
          H3 = v({}, oa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
          j3 = ve(H3),
          I3 = v({}, fi, {
            deltaX: function (t) {
              return "deltaX" in t
                ? t.deltaX
                : "wheelDeltaX" in t
                  ? -t.wheelDeltaX
                  : 0;
            },
            deltaY: function (t) {
              return "deltaY" in t
                ? t.deltaY
                : "wheelDeltaY" in t
                  ? -t.wheelDeltaY
                  : "wheelDelta" in t
                    ? -t.wheelDelta
                    : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          D3 = ve(I3),
          L3 = v({}, oa, { newState: 0, oldState: 0 }),
          w3 = ve(L3),
          _3 = [9, 13, 27, 32],
          fu = cn && "CompositionEvent" in window,
          xl = null;
        cn && "documentMode" in document && (xl = document.documentMode);
        var $3 = cn && "TextEvent" in window && !xl,
          dc = cn && (!fu || (xl && 8 < xl && 11 >= xl)),
          pc = " ",
          Kc = !1;
        function vc(t, e) {
          switch (t) {
            case "keyup":
              return _3.indexOf(e.keyCode) !== -1;
            case "keydown":
              return e.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
              return !0;
            default:
              return !1;
          }
        }
        function Uc(t) {
          return (
            (t = t.detail),
            typeof t == "object" && "data" in t ? t.data : null
          );
        }
        var Ya = !1;
        function t7(t, e) {
          switch (t) {
            case "compositionend":
              return Uc(e);
            case "keypress":
              return e.which !== 32 ? null : ((Kc = !0), pc);
            case "textInput":
              return ((t = e.data), t === pc && Kc ? null : t);
            default:
              return null;
          }
        }
        function e7(t, e) {
          if (Ya)
            return t === "compositionend" || (!fu && vc(t, e))
              ? ((t = sc()), (oi = iu = Rn = null), (Ya = !1), t)
              : null;
          switch (t) {
            case "paste":
              return null;
            case "keypress":
              if (
                !(e.ctrlKey || e.altKey || e.metaKey) ||
                (e.ctrlKey && e.altKey)
              ) {
                if (e.char && 1 < e.char.length) return e.char;
                if (e.which) return String.fromCharCode(e.which);
              }
              return null;
            case "compositionend":
              return dc && e.locale !== "ko" ? null : e.data;
            default:
              return null;
          }
        }
        var n7 = {
          color: !0,
          date: !0,
          datetime: !0,
          "datetime-local": !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function mc(t) {
          var e = t && t.nodeName && t.nodeName.toLowerCase();
          return e === "input" ? !!n7[t.type] : e === "textarea";
        }
        function hc(t, e, n, r) {
          (Ga ? (Ea ? Ea.push(r) : (Ea = [r])) : (Ga = r),
            (e = wi(e, "onChange")),
            0 < e.length &&
              ((n = new Vi("onChange", "change", null, n, r)),
              t.push({ event: n, listeners: e })));
        }
        var Tl = null,
          Gl = null;
        function a7(t) {
          tp(t, 0);
        }
        function ci(t) {
          var e = Ql(t);
          if (ec(e)) return t;
        }
        function Fc(t, e) {
          if (t === "change") return e;
        }
        var yc = !1;
        if (cn) {
          var cu;
          if (cn) {
            var qu = "oninput" in document;
            if (!qu) {
              var Ac = document.createElement("div");
              (Ac.setAttribute("oninput", "return;"),
                (qu = typeof Ac.oninput == "function"));
            }
            cu = qu;
          } else cu = !1;
          yc = cu && (!document.documentMode || 9 < document.documentMode);
        }
        function gc() {
          Tl && (Tl.detachEvent("onpropertychange", Xc), (Gl = Tl = null));
        }
        function Xc(t) {
          if (t.propertyName === "value" && ci(Gl)) {
            var e = [];
            (hc(e, Gl, t, au(t)), uc(a7, e));
          }
        }
        function l7(t, e, n) {
          t === "focusin"
            ? (gc(), (Tl = e), (Gl = n), Tl.attachEvent("onpropertychange", Xc))
            : t === "focusout" && gc();
        }
        function r7(t) {
          if (t === "selectionchange" || t === "keyup" || t === "keydown")
            return ci(Gl);
        }
        function i7(t, e) {
          if (t === "click") return ci(e);
        }
        function o7(t, e) {
          if (t === "input" || t === "change") return ci(e);
        }
        function u7(t, e) {
          return (
            (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e)
          );
        }
        var Se = typeof Object.is == "function" ? Object.is : u7;
        function El(t, e) {
          if (Se(t, e)) return !0;
          if (
            typeof t != "object" ||
            t === null ||
            typeof e != "object" ||
            e === null
          )
            return !1;
          var n = Object.keys(t),
            r = Object.keys(e);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var u = n[r];
            if (!Ae.call(e, u) || !Se(t[u], e[u])) return !1;
          }
          return !0;
        }
        function Wc(t) {
          for (; t && t.firstChild; ) t = t.firstChild;
          return t;
        }
        function Sc(t, e) {
          var n = Wc(t);
          t = 0;
          for (var r; n; ) {
            if (n.nodeType === 3) {
              if (((r = t + n.textContent.length), t <= e && r >= e))
                return { node: n, offset: e - t };
              t = r;
            }
            t: {
              for (; n; ) {
                if (n.nextSibling) {
                  n = n.nextSibling;
                  break t;
                }
                n = n.parentNode;
              }
              n = void 0;
            }
            n = Wc(n);
          }
        }
        function zc(t, e) {
          return t && e
            ? t === e
              ? !0
              : t && t.nodeType === 3
                ? !1
                : e && e.nodeType === 3
                  ? zc(t, e.parentNode)
                  : "contains" in t
                    ? t.contains(e)
                    : t.compareDocumentPosition
                      ? !!(t.compareDocumentPosition(e) & 16)
                      : !1
            : !1;
        }
        function Cc(t) {
          t =
            t != null &&
            t.ownerDocument != null &&
            t.ownerDocument.defaultView != null
              ? t.ownerDocument.defaultView
              : window;
          for (var e = ri(t.document); e instanceof t.HTMLIFrameElement; ) {
            try {
              var n = typeof e.contentWindow.location.href == "string";
            } catch {
              n = !1;
            }
            if (n) t = e.contentWindow;
            else break;
            e = ri(t.document);
          }
          return e;
        }
        function du(t) {
          var e = t && t.nodeName && t.nodeName.toLowerCase();
          return (
            e &&
            ((e === "input" &&
              (t.type === "text" ||
                t.type === "search" ||
                t.type === "tel" ||
                t.type === "url" ||
                t.type === "password")) ||
              e === "textarea" ||
              t.contentEditable === "true")
          );
        }
        var s7 =
            cn && "documentMode" in document && 11 >= document.documentMode,
          Ma = null,
          pu = null,
          Yl = null,
          Ku = !1;
        function Qc(t, e, n) {
          var r =
            n.window === n
              ? n.document
              : n.nodeType === 9
                ? n
                : n.ownerDocument;
          Ku ||
            Ma == null ||
            Ma !== ri(r) ||
            ((r = Ma),
            "selectionStart" in r && du(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
                ).getSelection()),
                (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                })),
            (Yl && El(Yl, r)) ||
              ((Yl = r),
              (r = wi(pu, "onSelect")),
              0 < r.length &&
                ((e = new Vi("onSelect", "select", null, e, n)),
                t.push({ event: e, listeners: r }),
                (e.target = Ma))));
        }
        function ua(t, e) {
          var n = {};
          return (
            (n[t.toLowerCase()] = e.toLowerCase()),
            (n["Webkit" + t] = "webkit" + e),
            (n["Moz" + t] = "moz" + e),
            n
          );
        }
        var Oa = {
            animationend: ua("Animation", "AnimationEnd"),
            animationiteration: ua("Animation", "AnimationIteration"),
            animationstart: ua("Animation", "AnimationStart"),
            transitionrun: ua("Transition", "TransitionRun"),
            transitionstart: ua("Transition", "TransitionStart"),
            transitioncancel: ua("Transition", "TransitionCancel"),
            transitionend: ua("Transition", "TransitionEnd"),
          },
          vu = {},
          bc = {};
        cn &&
          ((bc = document.createElement("div").style),
          "AnimationEvent" in window ||
            (delete Oa.animationend.animation,
            delete Oa.animationiteration.animation,
            delete Oa.animationstart.animation),
          "TransitionEvent" in window || delete Oa.transitionend.transition);
        function sa(t) {
          if (vu[t]) return vu[t];
          if (!Oa[t]) return t;
          var e = Oa[t],
            n;
          for (n in e)
            if (e.hasOwnProperty(n) && n in bc) return (vu[t] = e[n]);
          return t;
        }
        var Bc = sa("animationend"),
          Rc = sa("animationiteration"),
          Zc = sa("animationstart"),
          V7 = sa("transitionrun"),
          f7 = sa("transitionstart"),
          c7 = sa("transitioncancel"),
          xc = sa("transitionend"),
          Tc = new Map(),
          Uu =
            "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
              " ",
            );
        Uu.push("scrollEnd");
        function je(t, e) {
          (Tc.set(t, e), ia(e, [t]));
        }
        var Gc = new WeakMap();
        function Ge(t, e) {
          if (typeof t == "object" && t !== null) {
            var n = Gc.get(t);
            return n !== void 0
              ? n
              : ((e = { value: t, source: e, stack: $f(e) }), Gc.set(t, e), e);
          }
          return { value: t, source: e, stack: $f(e) };
        }
        var Ee = [],
          Na = 0,
          mu = 0;
        function qi() {
          for (var t = Na, e = (mu = Na = 0); e < t; ) {
            var n = Ee[e];
            Ee[e++] = null;
            var r = Ee[e];
            Ee[e++] = null;
            var u = Ee[e];
            Ee[e++] = null;
            var V = Ee[e];
            if (((Ee[e++] = null), r !== null && u !== null)) {
              var K = r.pending;
              (K === null ? (u.next = u) : ((u.next = K.next), (K.next = u)),
                (r.pending = u));
            }
            V !== 0 && Ec(n, u, V);
          }
        }
        function di(t, e, n, r) {
          ((Ee[Na++] = t),
            (Ee[Na++] = e),
            (Ee[Na++] = n),
            (Ee[Na++] = r),
            (mu |= r),
            (t.lanes |= r),
            (t = t.alternate),
            t !== null && (t.lanes |= r));
        }
        function hu(t, e, n, r) {
          return (di(t, e, n, r), pi(t));
        }
        function Ja(t, e) {
          return (di(t, null, null, e), pi(t));
        }
        function Ec(t, e, n) {
          t.lanes |= n;
          var r = t.alternate;
          r !== null && (r.lanes |= n);
          for (var u = !1, V = t.return; V !== null; )
            ((V.childLanes |= n),
              (r = V.alternate),
              r !== null && (r.childLanes |= n),
              V.tag === 22 &&
                ((t = V.stateNode),
                t === null || t._visibility & 1 || (u = !0)),
              (t = V),
              (V = V.return));
          return t.tag === 3
            ? ((V = t.stateNode),
              u &&
                e !== null &&
                ((u = 31 - We(n)),
                (t = V.hiddenUpdates),
                (r = t[u]),
                r === null ? (t[u] = [e]) : r.push(e),
                (e.lane = n | 536870912)),
              V)
            : null;
        }
        function pi(t) {
          if (50 < Vr) throw ((Vr = 0), (Ws = null), Error(o(185)));
          for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
          return t.tag === 3 ? t.stateNode : null;
        }
        var Pa = {};
        function q7(t, e, n, r) {
          ((this.tag = t),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.refCleanup = this.ref = null),
            (this.pendingProps = e),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null));
        }
        function ze(t, e, n, r) {
          return new q7(t, e, n, r);
        }
        function Fu(t) {
          return ((t = t.prototype), !(!t || !t.isReactComponent));
        }
        function qn(t, e) {
          var n = t.alternate;
          return (
            n === null
              ? ((n = ze(t.tag, e, t.key, t.mode)),
                (n.elementType = t.elementType),
                (n.type = t.type),
                (n.stateNode = t.stateNode),
                (n.alternate = t),
                (t.alternate = n))
              : ((n.pendingProps = e),
                (n.type = t.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = t.flags & 65011712),
            (n.childLanes = t.childLanes),
            (n.lanes = t.lanes),
            (n.child = t.child),
            (n.memoizedProps = t.memoizedProps),
            (n.memoizedState = t.memoizedState),
            (n.updateQueue = t.updateQueue),
            (e = t.dependencies),
            (n.dependencies =
              e === null
                ? null
                : { lanes: e.lanes, firstContext: e.firstContext }),
            (n.sibling = t.sibling),
            (n.index = t.index),
            (n.ref = t.ref),
            (n.refCleanup = t.refCleanup),
            n
          );
        }
        function Yc(t, e) {
          t.flags &= 65011714;
          var n = t.alternate;
          return (
            n === null
              ? ((t.childLanes = 0),
                (t.lanes = e),
                (t.child = null),
                (t.subtreeFlags = 0),
                (t.memoizedProps = null),
                (t.memoizedState = null),
                (t.updateQueue = null),
                (t.dependencies = null),
                (t.stateNode = null))
              : ((t.childLanes = n.childLanes),
                (t.lanes = n.lanes),
                (t.child = n.child),
                (t.subtreeFlags = 0),
                (t.deletions = null),
                (t.memoizedProps = n.memoizedProps),
                (t.memoizedState = n.memoizedState),
                (t.updateQueue = n.updateQueue),
                (t.type = n.type),
                (e = n.dependencies),
                (t.dependencies =
                  e === null
                    ? null
                    : { lanes: e.lanes, firstContext: e.firstContext })),
            t
          );
        }
        function Ki(t, e, n, r, u, V) {
          var K = 0;
          if (((r = t), typeof t == "function")) Fu(t) && (K = 1);
          else if (typeof t == "string")
            K = p1(t, n, $.current)
              ? 26
              : t === "html" || t === "head" || t === "body"
                ? 27
                : 5;
          else
            t: switch (t) {
              case lt:
                return (
                  (t = ze(31, n, e, u)),
                  (t.elementType = lt),
                  (t.lanes = V),
                  t
                );
              case A:
                return Va(n.children, u, V, e);
              case x:
                ((K = 8), (u |= 24));
                break;
              case Z:
                return (
                  (t = ze(12, n, e, u | 2)),
                  (t.elementType = Z),
                  (t.lanes = V),
                  t
                );
              case N:
                return (
                  (t = ze(13, n, e, u)),
                  (t.elementType = N),
                  (t.lanes = V),
                  t
                );
              case I:
                return (
                  (t = ze(19, n, e, u)),
                  (t.elementType = I),
                  (t.lanes = V),
                  t
                );
              default:
                if (typeof t == "object" && t !== null)
                  switch (t.$$typeof) {
                    case z:
                    case Y:
                      K = 10;
                      break t;
                    case G:
                      K = 9;
                      break t;
                    case L:
                      K = 11;
                      break t;
                    case nt:
                      K = 14;
                      break t;
                    case k:
                      ((K = 16), (r = null));
                      break t;
                  }
                ((K = 29),
                  (n = Error(o(130, t === null ? "null" : typeof t, ""))),
                  (r = null));
            }
          return (
            (e = ze(K, n, e, u)),
            (e.elementType = t),
            (e.type = r),
            (e.lanes = V),
            e
          );
        }
        function Va(t, e, n, r) {
          return ((t = ze(7, t, r, e)), (t.lanes = n), t);
        }
        function yu(t, e, n) {
          return ((t = ze(6, t, null, e)), (t.lanes = n), t);
        }
        function Au(t, e, n) {
          return (
            (e = ze(4, t.children !== null ? t.children : [], t.key, e)),
            (e.lanes = n),
            (e.stateNode = {
              containerInfo: t.containerInfo,
              pendingChildren: null,
              implementation: t.implementation,
            }),
            e
          );
        }
        var ka = [],
          Ha = 0,
          vi = null,
          Ui = 0,
          Ye = [],
          Me = 0,
          fa = null,
          dn = 1,
          pn = "";
        function ca(t, e) {
          ((ka[Ha++] = Ui), (ka[Ha++] = vi), (vi = t), (Ui = e));
        }
        function Mc(t, e, n) {
          ((Ye[Me++] = dn), (Ye[Me++] = pn), (Ye[Me++] = fa), (fa = t));
          var r = dn;
          t = pn;
          var u = 32 - We(r) - 1;
          ((r &= ~(1 << u)), (n += 1));
          var V = 32 - We(e) + u;
          if (30 < V) {
            var K = u - (u % 5);
            ((V = (r & ((1 << K) - 1)).toString(32)),
              (r >>= K),
              (u -= K),
              (dn = (1 << (32 - We(e) + u)) | (n << u) | r),
              (pn = V + t));
          } else ((dn = (1 << V) | (n << u) | r), (pn = t));
        }
        function gu(t) {
          t.return !== null && (ca(t, 1), Mc(t, 1, 0));
        }
        function Xu(t) {
          for (; t === vi; )
            ((vi = ka[--Ha]),
              (ka[Ha] = null),
              (Ui = ka[--Ha]),
              (ka[Ha] = null));
          for (; t === fa; )
            ((fa = Ye[--Me]),
              (Ye[Me] = null),
              (pn = Ye[--Me]),
              (Ye[Me] = null),
              (dn = Ye[--Me]),
              (Ye[Me] = null));
        }
        var qe = null,
          Nt = null,
          Wt = !1,
          qa = null,
          $e = !1,
          Wu = Error(o(519));
        function da(t) {
          var e = Error(o(418, ""));
          throw (Nl(Ge(e, t)), Wu);
        }
        function Oc(t) {
          var e = t.stateNode,
            n = t.type,
            r = t.memoizedProps;
          switch (((e[oe] = t), (e[Ke] = r), n)) {
            case "dialog":
              (ht("cancel", e), ht("close", e));
              break;
            case "iframe":
            case "object":
            case "embed":
              ht("load", e);
              break;
            case "video":
            case "audio":
              for (n = 0; n < cr.length; n++) ht(cr[n], e);
              break;
            case "source":
              ht("error", e);
              break;
            case "img":
            case "image":
            case "link":
              (ht("error", e), ht("load", e));
              break;
            case "details":
              ht("toggle", e);
              break;
            case "input":
              (ht("invalid", e),
                nc(
                  e,
                  r.value,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name,
                  !0,
                ),
                li(e));
              break;
            case "select":
              ht("invalid", e);
              break;
            case "textarea":
              (ht("invalid", e),
                lc(e, r.value, r.defaultValue, r.children),
                li(e));
          }
          ((n = r.children),
            (typeof n != "string" &&
              typeof n != "number" &&
              typeof n != "bigint") ||
            e.textContent === "" + n ||
            r.suppressHydrationWarning === !0 ||
            lp(e.textContent, n)
              ? (r.popover != null && (ht("beforetoggle", e), ht("toggle", e)),
                r.onScroll != null && ht("scroll", e),
                r.onScrollEnd != null && ht("scrollend", e),
                r.onClick != null && (e.onclick = _i),
                (e = !0))
              : (e = !1),
            e || da(t));
        }
        function Nc(t) {
          for (qe = t.return; qe; )
            switch (qe.tag) {
              case 5:
              case 13:
                $e = !1;
                return;
              case 27:
              case 3:
                $e = !0;
                return;
              default:
                qe = qe.return;
            }
        }
        function Ml(t) {
          if (t !== qe) return !1;
          if (!Wt) return (Nc(t), (Wt = !0), !1);
          var e = t.tag,
            n;
          if (
            ((n = e !== 3 && e !== 27) &&
              ((n = e === 5) &&
                ((n = t.type),
                (n =
                  !(n !== "form" && n !== "button") ||
                  Ns(t.type, t.memoizedProps))),
              (n = !n)),
            n && Nt && da(t),
            Nc(t),
            e === 13)
          ) {
            if (
              ((t = t.memoizedState),
              (t = t !== null ? t.dehydrated : null),
              !t)
            )
              throw Error(o(317));
            t: {
              for (t = t.nextSibling, e = 0; t; ) {
                if (t.nodeType === 8)
                  if (((n = t.data), n === "/$")) {
                    if (e === 0) {
                      Nt = De(t.nextSibling);
                      break t;
                    }
                    e--;
                  } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
                t = t.nextSibling;
              }
              Nt = null;
            }
          } else
            e === 27
              ? ((e = Nt),
                Dn(t.type) ? ((t = Hs), (Hs = null), (Nt = t)) : (Nt = e))
              : (Nt = qe ? De(t.stateNode.nextSibling) : null);
          return !0;
        }
        function Ol() {
          ((Nt = qe = null), (Wt = !1));
        }
        function Jc() {
          var t = qa;
          return (
            t !== null &&
              (he === null ? (he = t) : he.push.apply(he, t), (qa = null)),
            t
          );
        }
        function Nl(t) {
          qa === null ? (qa = [t]) : qa.push(t);
        }
        var Su = J(null),
          pa = null,
          Kn = null;
        function Zn(t, e, n) {
          (j(Su, e._currentValue), (e._currentValue = n));
        }
        function vn(t) {
          ((t._currentValue = Su.current), D(Su));
        }
        function zu(t, e, n) {
          for (; t !== null; ) {
            var r = t.alternate;
            if (
              ((t.childLanes & e) !== e
                ? ((t.childLanes |= e), r !== null && (r.childLanes |= e))
                : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e),
              t === n)
            )
              break;
            t = t.return;
          }
        }
        function Cu(t, e, n, r) {
          var u = t.child;
          for (u !== null && (u.return = t); u !== null; ) {
            var V = u.dependencies;
            if (V !== null) {
              var K = u.child;
              V = V.firstContext;
              t: for (; V !== null; ) {
                var U = V;
                V = u;
                for (var F = 0; F < e.length; F++)
                  if (U.context === e[F]) {
                    ((V.lanes |= n),
                      (U = V.alternate),
                      U !== null && (U.lanes |= n),
                      zu(V.return, n, t),
                      r || (K = null));
                    break t;
                  }
                V = U.next;
              }
            } else if (u.tag === 18) {
              if (((K = u.return), K === null)) throw Error(o(341));
              ((K.lanes |= n),
                (V = K.alternate),
                V !== null && (V.lanes |= n),
                zu(K, n, t),
                (K = null));
            } else K = u.child;
            if (K !== null) K.return = u;
            else
              for (K = u; K !== null; ) {
                if (K === t) {
                  K = null;
                  break;
                }
                if (((u = K.sibling), u !== null)) {
                  ((u.return = K.return), (K = u));
                  break;
                }
                K = K.return;
              }
            u = K;
          }
        }
        function Jl(t, e, n, r) {
          t = null;
          for (var u = e, V = !1; u !== null; ) {
            if (!V) {
              if ((u.flags & 524288) !== 0) V = !0;
              else if ((u.flags & 262144) !== 0) break;
            }
            if (u.tag === 10) {
              var K = u.alternate;
              if (K === null) throw Error(o(387));
              if (((K = K.memoizedProps), K !== null)) {
                var U = u.type;
                Se(u.pendingProps.value, K.value) ||
                  (t !== null ? t.push(U) : (t = [U]));
              }
            } else if (u === Xt.current) {
              if (((K = u.alternate), K === null)) throw Error(o(387));
              K.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
                (t !== null ? t.push(Ur) : (t = [Ur]));
            }
            u = u.return;
          }
          (t !== null && Cu(e, t, n, r), (e.flags |= 262144));
        }
        function mi(t) {
          for (t = t.firstContext; t !== null; ) {
            if (!Se(t.context._currentValue, t.memoizedValue)) return !0;
            t = t.next;
          }
          return !1;
        }
        function Ka(t) {
          ((pa = t),
            (Kn = null),
            (t = t.dependencies),
            t !== null && (t.firstContext = null));
        }
        function ue(t) {
          return Pc(pa, t);
        }
        function hi(t, e) {
          return (pa === null && Ka(t), Pc(t, e));
        }
        function Pc(t, e) {
          var n = e._currentValue;
          if (
            ((e = { context: e, memoizedValue: n, next: null }), Kn === null)
          ) {
            if (t === null) throw Error(o(308));
            ((Kn = e),
              (t.dependencies = { lanes: 0, firstContext: e }),
              (t.flags |= 524288));
          } else Kn = Kn.next = e;
          return n;
        }
        var d7 =
            typeof AbortController < "u"
              ? AbortController
              : function () {
                  var t = [],
                    e = (this.signal = {
                      aborted: !1,
                      addEventListener: function (n, r) {
                        t.push(r);
                      },
                    });
                  this.abort = function () {
                    ((e.aborted = !0),
                      t.forEach(function (n) {
                        return n();
                      }));
                  };
                },
          p7 = a.unstable_scheduleCallback,
          K7 = a.unstable_NormalPriority,
          Lt = {
            $$typeof: Y,
            Consumer: null,
            Provider: null,
            _currentValue: null,
            _currentValue2: null,
            _threadCount: 0,
          };
        function Qu() {
          return { controller: new d7(), data: new Map(), refCount: 0 };
        }
        function Pl(t) {
          (t.refCount--,
            t.refCount === 0 &&
              p7(K7, function () {
                t.controller.abort();
              }));
        }
        var kl = null,
          bu = 0,
          ja = 0,
          Ia = null;
        function v7(t, e) {
          if (kl === null) {
            var n = (kl = []);
            ((bu = 0),
              (ja = Rs()),
              (Ia = {
                status: "pending",
                value: void 0,
                then: function (r) {
                  n.push(r);
                },
              }));
          }
          return (bu++, e.then(kc, kc), e);
        }
        function kc() {
          if (--bu === 0 && kl !== null) {
            Ia !== null && (Ia.status = "fulfilled");
            var t = kl;
            ((kl = null), (ja = 0), (Ia = null));
            for (var e = 0; e < t.length; e++) (0, t[e])();
          }
        }
        function U7(t, e) {
          var n = [],
            r = {
              status: "pending",
              value: null,
              reason: null,
              then: function (u) {
                n.push(u);
              },
            };
          return (
            t.then(
              function () {
                ((r.status = "fulfilled"), (r.value = e));
                for (var u = 0; u < n.length; u++) (0, n[u])(e);
              },
              function (u) {
                for (
                  r.status = "rejected", r.reason = u, u = 0;
                  u < n.length;
                  u++
                )
                  (0, n[u])(void 0);
              },
            ),
            r
          );
        }
        var Hc = T.S;
        T.S = function (t, e) {
          (typeof e == "object" &&
            e !== null &&
            typeof e.then == "function" &&
            v7(t, e),
            Hc !== null && Hc(t, e));
        };
        var va = J(null);
        function Bu() {
          var t = va.current;
          return t !== null ? t : xt.pooledCache;
        }
        function Fi(t, e) {
          e === null ? j(va, va.current) : j(va, e.pool);
        }
        function jc() {
          var t = Bu();
          return t === null ? null : { parent: Lt._currentValue, pool: t };
        }
        var Hl = Error(o(460)),
          Ic = Error(o(474)),
          yi = Error(o(542)),
          Ru = { then: function () {} };
        function Dc(t) {
          return ((t = t.status), t === "fulfilled" || t === "rejected");
        }
        function Ai() {}
        function Lc(t, e, n) {
          switch (
            ((n = t[n]),
            n === void 0 ? t.push(e) : n !== e && (e.then(Ai, Ai), (e = n)),
            e.status)
          ) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw ((t = e.reason), _c(t), t);
            default:
              if (typeof e.status == "string") e.then(Ai, Ai);
              else {
                if (((t = xt), t !== null && 100 < t.shellSuspendCounter))
                  throw Error(o(482));
                ((t = e),
                  (t.status = "pending"),
                  t.then(
                    function (r) {
                      if (e.status === "pending") {
                        var u = e;
                        ((u.status = "fulfilled"), (u.value = r));
                      }
                    },
                    function (r) {
                      if (e.status === "pending") {
                        var u = e;
                        ((u.status = "rejected"), (u.reason = r));
                      }
                    },
                  ));
              }
              switch (e.status) {
                case "fulfilled":
                  return e.value;
                case "rejected":
                  throw ((t = e.reason), _c(t), t);
              }
              throw ((jl = e), Hl);
          }
        }
        var jl = null;
        function wc() {
          if (jl === null) throw Error(o(459));
          var t = jl;
          return ((jl = null), t);
        }
        function _c(t) {
          if (t === Hl || t === yi) throw Error(o(483));
        }
        var xn = !1;
        function Zu(t) {
          t.updateQueue = {
            baseState: t.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, lanes: 0, hiddenCallbacks: null },
            callbacks: null,
          };
        }
        function xu(t, e) {
          ((t = t.updateQueue),
            e.updateQueue === t &&
              (e.updateQueue = {
                baseState: t.baseState,
                firstBaseUpdate: t.firstBaseUpdate,
                lastBaseUpdate: t.lastBaseUpdate,
                shared: t.shared,
                callbacks: null,
              }));
        }
        function Tn(t) {
          return { lane: t, tag: 0, payload: null, callback: null, next: null };
        }
        function Gn(t, e, n) {
          var r = t.updateQueue;
          if (r === null) return null;
          if (((r = r.shared), (St & 2) !== 0)) {
            var u = r.pending;
            return (
              u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
              (r.pending = e),
              (e = pi(t)),
              Ec(t, null, n),
              e
            );
          }
          return (di(t, r, e, n), pi(t));
        }
        function Il(t, e, n) {
          if (
            ((e = e.updateQueue),
            e !== null && ((e = e.shared), (n & 4194048) !== 0))
          ) {
            var r = e.lanes;
            ((r &= t.pendingLanes), (n |= r), (e.lanes = n), kf(t, n));
          }
        }
        function Tu(t, e) {
          var n = t.updateQueue,
            r = t.alternate;
          if (r !== null && ((r = r.updateQueue), n === r)) {
            var u = null,
              V = null;
            if (((n = n.firstBaseUpdate), n !== null)) {
              do {
                var K = {
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: null,
                  next: null,
                };
                (V === null ? (u = V = K) : (V = V.next = K), (n = n.next));
              } while (n !== null);
              V === null ? (u = V = e) : (V = V.next = e);
            } else u = V = e;
            ((n = {
              baseState: r.baseState,
              firstBaseUpdate: u,
              lastBaseUpdate: V,
              shared: r.shared,
              callbacks: r.callbacks,
            }),
              (t.updateQueue = n));
            return;
          }
          ((t = n.lastBaseUpdate),
            t === null ? (n.firstBaseUpdate = e) : (t.next = e),
            (n.lastBaseUpdate = e));
        }
        var Gu = !1;
        function Dl() {
          if (Gu) {
            var t = Ia;
            if (t !== null) throw t;
          }
        }
        function Ll(t, e, n, r) {
          Gu = !1;
          var u = t.updateQueue;
          xn = !1;
          var V = u.firstBaseUpdate,
            K = u.lastBaseUpdate,
            U = u.shared.pending;
          if (U !== null) {
            u.shared.pending = null;
            var F = U,
              Q = F.next;
            ((F.next = null), K === null ? (V = Q) : (K.next = Q), (K = F));
            var E = t.alternate;
            E !== null &&
              ((E = E.updateQueue),
              (U = E.lastBaseUpdate),
              U !== K &&
                (U === null ? (E.firstBaseUpdate = Q) : (U.next = Q),
                (E.lastBaseUpdate = F)));
          }
          if (V !== null) {
            var O = u.baseState;
            ((K = 0), (E = Q = F = null), (U = V));
            do {
              var B = U.lane & -536870913,
                R = B !== U.lane;
              if (R ? (yt & B) === B : (r & B) === B) {
                (B !== 0 && B === ja && (Gu = !0),
                  E !== null &&
                    (E = E.next =
                      {
                        lane: 0,
                        tag: U.tag,
                        payload: U.payload,
                        callback: null,
                        next: null,
                      }));
                t: {
                  var ut = t,
                    it = U;
                  B = e;
                  var Bt = n;
                  switch (it.tag) {
                    case 1:
                      if (((ut = it.payload), typeof ut == "function")) {
                        O = ut.call(Bt, O, B);
                        break t;
                      }
                      O = ut;
                      break t;
                    case 3:
                      ut.flags = (ut.flags & -65537) | 128;
                    case 0:
                      if (
                        ((ut = it.payload),
                        (B = typeof ut == "function" ? ut.call(Bt, O, B) : ut),
                        B == null)
                      )
                        break t;
                      O = v({}, O, B);
                      break t;
                    case 2:
                      xn = !0;
                  }
                }
                ((B = U.callback),
                  B !== null &&
                    ((t.flags |= 64),
                    R && (t.flags |= 8192),
                    (R = u.callbacks),
                    R === null ? (u.callbacks = [B]) : R.push(B)));
              } else
                ((R = {
                  lane: B,
                  tag: U.tag,
                  payload: U.payload,
                  callback: U.callback,
                  next: null,
                }),
                  E === null ? ((Q = E = R), (F = O)) : (E = E.next = R),
                  (K |= B));
              if (((U = U.next), U === null)) {
                if (((U = u.shared.pending), U === null)) break;
                ((R = U),
                  (U = R.next),
                  (R.next = null),
                  (u.lastBaseUpdate = R),
                  (u.shared.pending = null));
              }
            } while (!0);
            (E === null && (F = O),
              (u.baseState = F),
              (u.firstBaseUpdate = Q),
              (u.lastBaseUpdate = E),
              V === null && (u.shared.lanes = 0),
              (kn |= K),
              (t.lanes = K),
              (t.memoizedState = O));
          }
        }
        function $c(t, e) {
          if (typeof t != "function") throw Error(o(191, t));
          t.call(e);
        }
        function tq(t, e) {
          var n = t.callbacks;
          if (n !== null)
            for (t.callbacks = null, t = 0; t < n.length; t++) $c(n[t], e);
        }
        var Da = J(null),
          gi = J(0);
        function eq(t, e) {
          ((t = gn), j(gi, t), j(Da, e), (gn = t | e.baseLanes));
        }
        function Eu() {
          (j(gi, gn), j(Da, Da.current));
        }
        function Yu() {
          ((gn = gi.current), D(Da), D(gi));
        }
        var En = 0,
          vt = null,
          Qt = null,
          It = null,
          Xi = !1,
          La = !1,
          Ua = !1,
          Wi = 0,
          wl = 0,
          wa = null,
          m7 = 0;
        function kt() {
          throw Error(o(321));
        }
        function Mu(t, e) {
          if (e === null) return !1;
          for (var n = 0; n < e.length && n < t.length; n++)
            if (!Se(t[n], e[n])) return !1;
          return !0;
        }
        function Ou(t, e, n, r, u, V) {
          return (
            (En = V),
            (vt = e),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.lanes = 0),
            (T.H = t === null || t.memoizedState === null ? Eq : Yq),
            (Ua = !1),
            (V = n(r, u)),
            (Ua = !1),
            La && (V = aq(e, n, r, u)),
            nq(t),
            V
          );
        }
        function nq(t) {
          T.H = Bi;
          var e = Qt !== null && Qt.next !== null;
          if (
            ((En = 0),
            (It = Qt = vt = null),
            (Xi = !1),
            (wl = 0),
            (wa = null),
            e)
          )
            throw Error(o(300));
          t === null ||
            $t ||
            ((t = t.dependencies), t !== null && mi(t) && ($t = !0));
        }
        function aq(t, e, n, r) {
          vt = t;
          var u = 0;
          do {
            if ((La && (wa = null), (wl = 0), (La = !1), 25 <= u))
              throw Error(o(301));
            if (((u += 1), (It = Qt = null), t.updateQueue != null)) {
              var V = t.updateQueue;
              ((V.lastEffect = null),
                (V.events = null),
                (V.stores = null),
                V.memoCache != null && (V.memoCache.index = 0));
            }
            ((T.H = W7), (V = e(n, r)));
          } while (La);
          return V;
        }
        function h7() {
          var t = T.H,
            e = t.useState()[0];
          return (
            (e = typeof e.then == "function" ? _l(e) : e),
            (t = t.useState()[0]),
            (Qt !== null ? Qt.memoizedState : null) !== t && (vt.flags |= 1024),
            e
          );
        }
        function Nu() {
          var t = Wi !== 0;
          return ((Wi = 0), t);
        }
        function Ju(t, e, n) {
          ((e.updateQueue = t.updateQueue),
            (e.flags &= -2053),
            (t.lanes &= ~n));
        }
        function Pu(t) {
          if (Xi) {
            for (t = t.memoizedState; t !== null; ) {
              var e = t.queue;
              (e !== null && (e.pending = null), (t = t.next));
            }
            Xi = !1;
          }
          ((En = 0),
            (It = Qt = vt = null),
            (La = !1),
            (wl = Wi = 0),
            (wa = null));
        }
        function Ue() {
          var t = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            It === null ? (vt.memoizedState = It = t) : (It = It.next = t),
            It
          );
        }
        function Dt() {
          if (Qt === null) {
            var t = vt.alternate;
            t = t !== null ? t.memoizedState : null;
          } else t = Qt.next;
          var e = It === null ? vt.memoizedState : It.next;
          if (e !== null) ((It = e), (Qt = t));
          else {
            if (t === null)
              throw vt.alternate === null ? Error(o(467)) : Error(o(310));
            ((Qt = t),
              (t = {
                memoizedState: Qt.memoizedState,
                baseState: Qt.baseState,
                baseQueue: Qt.baseQueue,
                queue: Qt.queue,
                next: null,
              }),
              It === null ? (vt.memoizedState = It = t) : (It = It.next = t));
          }
          return It;
        }
        function ku() {
          return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null,
          };
        }
        function _l(t) {
          var e = wl;
          return (
            (wl += 1),
            wa === null && (wa = []),
            (t = Lc(wa, t, e)),
            (e = vt),
            (It === null ? e.memoizedState : It.next) === null &&
              ((e = e.alternate),
              (T.H = e === null || e.memoizedState === null ? Eq : Yq)),
            t
          );
        }
        function Si(t) {
          if (t !== null && typeof t == "object") {
            if (typeof t.then == "function") return _l(t);
            if (t.$$typeof === Y) return ue(t);
          }
          throw Error(o(438, String(t)));
        }
        function Hu(t) {
          var e = null,
            n = vt.updateQueue;
          if ((n !== null && (e = n.memoCache), e == null)) {
            var r = vt.alternate;
            r !== null &&
              ((r = r.updateQueue),
              r !== null &&
                ((r = r.memoCache),
                r != null &&
                  (e = {
                    data: r.data.map(function (u) {
                      return u.slice();
                    }),
                    index: 0,
                  })));
          }
          if (
            (e == null && (e = { data: [], index: 0 }),
            n === null && ((n = ku()), (vt.updateQueue = n)),
            (n.memoCache = e),
            (n = e.data[e.index]),
            n === void 0)
          )
            for (n = e.data[e.index] = Array(t), r = 0; r < t; r++) n[r] = pt;
          return (e.index++, n);
        }
        function Un(t, e) {
          return typeof e == "function" ? e(t) : e;
        }
        function zi(t) {
          var e = Dt();
          return ju(e, Qt, t);
        }
        function ju(t, e, n) {
          var r = t.queue;
          if (r === null) throw Error(o(311));
          r.lastRenderedReducer = n;
          var u = t.baseQueue,
            V = r.pending;
          if (V !== null) {
            if (u !== null) {
              var K = u.next;
              ((u.next = V.next), (V.next = K));
            }
            ((e.baseQueue = u = V), (r.pending = null));
          }
          if (((V = t.baseState), u === null)) t.memoizedState = V;
          else {
            e = u.next;
            var U = (K = null),
              F = null,
              Q = e,
              E = !1;
            do {
              var O = Q.lane & -536870913;
              if (O !== Q.lane ? (yt & O) === O : (En & O) === O) {
                var B = Q.revertLane;
                if (B === 0)
                  (F !== null &&
                    (F = F.next =
                      {
                        lane: 0,
                        revertLane: 0,
                        action: Q.action,
                        hasEagerState: Q.hasEagerState,
                        eagerState: Q.eagerState,
                        next: null,
                      }),
                    O === ja && (E = !0));
                else if ((En & B) === B) {
                  ((Q = Q.next), B === ja && (E = !0));
                  continue;
                } else
                  ((O = {
                    lane: 0,
                    revertLane: Q.revertLane,
                    action: Q.action,
                    hasEagerState: Q.hasEagerState,
                    eagerState: Q.eagerState,
                    next: null,
                  }),
                    F === null ? ((U = F = O), (K = V)) : (F = F.next = O),
                    (vt.lanes |= B),
                    (kn |= B));
                ((O = Q.action),
                  Ua && n(V, O),
                  (V = Q.hasEagerState ? Q.eagerState : n(V, O)));
              } else
                ((B = {
                  lane: O,
                  revertLane: Q.revertLane,
                  action: Q.action,
                  hasEagerState: Q.hasEagerState,
                  eagerState: Q.eagerState,
                  next: null,
                }),
                  F === null ? ((U = F = B), (K = V)) : (F = F.next = B),
                  (vt.lanes |= O),
                  (kn |= O));
              Q = Q.next;
            } while (Q !== null && Q !== e);
            if (
              (F === null ? (K = V) : (F.next = U),
              !Se(V, t.memoizedState) &&
                (($t = !0), E && ((n = Ia), n !== null)))
            )
              throw n;
            ((t.memoizedState = V),
              (t.baseState = K),
              (t.baseQueue = F),
              (r.lastRenderedState = V));
          }
          return (u === null && (r.lanes = 0), [t.memoizedState, r.dispatch]);
        }
        function Iu(t) {
          var e = Dt(),
            n = e.queue;
          if (n === null) throw Error(o(311));
          n.lastRenderedReducer = t;
          var r = n.dispatch,
            u = n.pending,
            V = e.memoizedState;
          if (u !== null) {
            n.pending = null;
            var K = (u = u.next);
            do ((V = t(V, K.action)), (K = K.next));
            while (K !== u);
            (Se(V, e.memoizedState) || ($t = !0),
              (e.memoizedState = V),
              e.baseQueue === null && (e.baseState = V),
              (n.lastRenderedState = V));
          }
          return [V, r];
        }
        function lq(t, e, n) {
          var r = vt,
            u = Dt(),
            V = Wt;
          if (V) {
            if (n === void 0) throw Error(o(407));
            n = n();
          } else n = e();
          var K = !Se((Qt || u).memoizedState, n);
          (K && ((u.memoizedState = n), ($t = !0)), (u = u.queue));
          var U = oq.bind(null, r, u, t);
          if (
            ($l(2048, 8, U, [t]),
            u.getSnapshot !== e ||
              K ||
              (It !== null && It.memoizedState.tag & 1))
          ) {
            if (
              ((r.flags |= 2048),
              _a(9, Ci(), iq.bind(null, r, u, n, e), null),
              xt === null)
            )
              throw Error(o(349));
            V || (En & 124) !== 0 || rq(r, e, n);
          }
          return n;
        }
        function rq(t, e, n) {
          ((t.flags |= 16384),
            (t = { getSnapshot: e, value: n }),
            (e = vt.updateQueue),
            e === null
              ? ((e = ku()), (vt.updateQueue = e), (e.stores = [t]))
              : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)));
        }
        function iq(t, e, n, r) {
          ((e.value = n), (e.getSnapshot = r), uq(e) && sq(t));
        }
        function oq(t, e, n) {
          return n(function () {
            uq(e) && sq(t);
          });
        }
        function uq(t) {
          var e = t.getSnapshot;
          t = t.value;
          try {
            var n = e();
            return !Se(t, n);
          } catch {
            return !0;
          }
        }
        function sq(t) {
          var e = Ja(t, 2);
          e !== null && Re(e, t, 2);
        }
        function Du(t) {
          var e = Ue();
          if (typeof t == "function") {
            var n = t;
            if (((t = n()), Ua)) {
              bn(!0);
              try {
                n();
              } finally {
                bn(!1);
              }
            }
          }
          return (
            (e.memoizedState = e.baseState = t),
            (e.queue = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: Un,
              lastRenderedState: t,
            }),
            e
          );
        }
        function Vq(t, e, n, r) {
          return (
            (t.baseState = n),
            ju(t, Qt, typeof r == "function" ? r : Un)
          );
        }
        function F7(t, e, n, r, u) {
          if (bi(t)) throw Error(o(485));
          if (((t = e.action), t !== null)) {
            var V = {
              payload: u,
              action: t,
              next: null,
              isTransition: !0,
              status: "pending",
              value: null,
              reason: null,
              listeners: [],
              then: function (K) {
                V.listeners.push(K);
              },
            };
            (T.T !== null ? n(!0) : (V.isTransition = !1),
              r(V),
              (n = e.pending),
              n === null
                ? ((V.next = e.pending = V), fq(e, V))
                : ((V.next = n.next), (e.pending = n.next = V)));
          }
        }
        function fq(t, e) {
          var n = e.action,
            r = e.payload,
            u = t.state;
          if (e.isTransition) {
            var V = T.T,
              K = {};
            T.T = K;
            try {
              var U = n(u, r),
                F = T.S;
              (F !== null && F(K, U), cq(t, e, U));
            } catch (Q) {
              Lu(t, e, Q);
            } finally {
              T.T = V;
            }
          } else
            try {
              ((V = n(u, r)), cq(t, e, V));
            } catch (Q) {
              Lu(t, e, Q);
            }
        }
        function cq(t, e, n) {
          n !== null && typeof n == "object" && typeof n.then == "function"
            ? n.then(
                function (r) {
                  qq(t, e, r);
                },
                function (r) {
                  return Lu(t, e, r);
                },
              )
            : qq(t, e, n);
        }
        function qq(t, e, n) {
          ((e.status = "fulfilled"),
            (e.value = n),
            dq(e),
            (t.state = n),
            (e = t.pending),
            e !== null &&
              ((n = e.next),
              n === e
                ? (t.pending = null)
                : ((n = n.next), (e.next = n), fq(t, n))));
        }
        function Lu(t, e, n) {
          var r = t.pending;
          if (((t.pending = null), r !== null)) {
            r = r.next;
            do ((e.status = "rejected"), (e.reason = n), dq(e), (e = e.next));
            while (e !== r);
          }
          t.action = null;
        }
        function dq(t) {
          t = t.listeners;
          for (var e = 0; e < t.length; e++) (0, t[e])();
        }
        function pq(t, e) {
          return e;
        }
        function Kq(t, e) {
          if (Wt) {
            var n = xt.formState;
            if (n !== null) {
              t: {
                var r = vt;
                if (Wt) {
                  if (Nt) {
                    e: {
                      for (var u = Nt, V = $e; u.nodeType !== 8; ) {
                        if (!V) {
                          u = null;
                          break e;
                        }
                        if (((u = De(u.nextSibling)), u === null)) {
                          u = null;
                          break e;
                        }
                      }
                      ((V = u.data), (u = V === "F!" || V === "F" ? u : null));
                    }
                    if (u) {
                      ((Nt = De(u.nextSibling)), (r = u.data === "F!"));
                      break t;
                    }
                  }
                  da(r);
                }
                r = !1;
              }
              r && (e = n[0]);
            }
          }
          return (
            (n = Ue()),
            (n.memoizedState = n.baseState = e),
            (r = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: pq,
              lastRenderedState: e,
            }),
            (n.queue = r),
            (n = xq.bind(null, vt, r)),
            (r.dispatch = n),
            (r = Du(!1)),
            (V = es.bind(null, vt, !1, r.queue)),
            (r = Ue()),
            (u = { state: e, dispatch: null, action: t, pending: null }),
            (r.queue = u),
            (n = F7.bind(null, vt, u, V, n)),
            (u.dispatch = n),
            (r.memoizedState = t),
            [e, n, !1]
          );
        }
        function vq(t) {
          var e = Dt();
          return Uq(e, Qt, t);
        }
        function Uq(t, e, n) {
          if (
            ((e = ju(t, e, pq)[0]),
            (t = zi(Un)[0]),
            typeof e == "object" && e !== null && typeof e.then == "function")
          )
            try {
              var r = _l(e);
            } catch (K) {
              throw K === Hl ? yi : K;
            }
          else r = e;
          e = Dt();
          var u = e.queue,
            V = u.dispatch;
          return (
            n !== e.memoizedState &&
              ((vt.flags |= 2048), _a(9, Ci(), y7.bind(null, u, n), null)),
            [r, V, t]
          );
        }
        function y7(t, e) {
          t.action = e;
        }
        function mq(t) {
          var e = Dt(),
            n = Qt;
          if (n !== null) return Uq(e, n, t);
          (Dt(), (e = e.memoizedState), (n = Dt()));
          var r = n.queue.dispatch;
          return ((n.memoizedState = t), [e, r, !1]);
        }
        function _a(t, e, n, r) {
          return (
            (t = { tag: t, create: n, deps: r, inst: e, next: null }),
            (e = vt.updateQueue),
            e === null && ((e = ku()), (vt.updateQueue = e)),
            (n = e.lastEffect),
            n === null
              ? (e.lastEffect = t.next = t)
              : ((r = n.next), (n.next = t), (t.next = r), (e.lastEffect = t)),
            t
          );
        }
        function Ci() {
          return { destroy: void 0, resource: void 0 };
        }
        function hq() {
          return Dt().memoizedState;
        }
        function Qi(t, e, n, r) {
          var u = Ue();
          ((r = r === void 0 ? null : r),
            (vt.flags |= t),
            (u.memoizedState = _a(1 | e, Ci(), n, r)));
        }
        function $l(t, e, n, r) {
          var u = Dt();
          r = r === void 0 ? null : r;
          var V = u.memoizedState.inst;
          Qt !== null && r !== null && Mu(r, Qt.memoizedState.deps)
            ? (u.memoizedState = _a(e, V, n, r))
            : ((vt.flags |= t), (u.memoizedState = _a(1 | e, V, n, r)));
        }
        function Fq(t, e) {
          Qi(8390656, 8, t, e);
        }
        function yq(t, e) {
          $l(2048, 8, t, e);
        }
        function Aq(t, e) {
          return $l(4, 2, t, e);
        }
        function gq(t, e) {
          return $l(4, 4, t, e);
        }
        function Xq(t, e) {
          if (typeof e == "function") {
            t = t();
            var n = e(t);
            return function () {
              typeof n == "function" ? n() : e(null);
            };
          }
          if (e != null)
            return (
              (t = t()),
              (e.current = t),
              function () {
                e.current = null;
              }
            );
        }
        function Wq(t, e, n) {
          ((n = n != null ? n.concat([t]) : null),
            $l(4, 4, Xq.bind(null, e, t), n));
        }
        function wu() {}
        function Sq(t, e) {
          var n = Dt();
          e = e === void 0 ? null : e;
          var r = n.memoizedState;
          return e !== null && Mu(e, r[1])
            ? r[0]
            : ((n.memoizedState = [t, e]), t);
        }
        function zq(t, e) {
          var n = Dt();
          e = e === void 0 ? null : e;
          var r = n.memoizedState;
          if (e !== null && Mu(e, r[1])) return r[0];
          if (((r = t()), Ua)) {
            bn(!0);
            try {
              t();
            } finally {
              bn(!1);
            }
          }
          return ((n.memoizedState = [r, e]), r);
        }
        function _u(t, e, n) {
          return n === void 0 || (En & 1073741824) !== 0
            ? (t.memoizedState = e)
            : ((t.memoizedState = n),
              (t = bd()),
              (vt.lanes |= t),
              (kn |= t),
              n);
        }
        function Cq(t, e, n, r) {
          return Se(n, e)
            ? n
            : Da.current !== null
              ? ((t = _u(t, n, r)), Se(t, e) || ($t = !0), t)
              : (En & 42) === 0
                ? (($t = !0), (t.memoizedState = n))
                : ((t = bd()), (vt.lanes |= t), (kn |= t), e);
        }
        function Qq(t, e, n, r, u) {
          var V = P.p;
          P.p = V !== 0 && 8 > V ? V : 8;
          var K = T.T,
            U = {};
          ((T.T = U), es(t, !1, e, n));
          try {
            var F = u(),
              Q = T.S;
            if (
              (Q !== null && Q(U, F),
              F !== null && typeof F == "object" && typeof F.then == "function")
            ) {
              var E = U7(F, r);
              tr(t, e, E, Be(t));
            } else tr(t, e, r, Be(t));
          } catch (O) {
            tr(
              t,
              e,
              { then: function () {}, status: "rejected", reason: O },
              Be(),
            );
          } finally {
            ((P.p = V), (T.T = K));
          }
        }
        function A7() {}
        function $u(t, e, n, r) {
          if (t.tag !== 5) throw Error(o(476));
          var u = bq(t).queue;
          Qq(
            t,
            u,
            e,
            _,
            n === null
              ? A7
              : function () {
                  return (Bq(t), n(r));
                },
          );
        }
        function bq(t) {
          var e = t.memoizedState;
          if (e !== null) return e;
          e = {
            memoizedState: _,
            baseState: _,
            baseQueue: null,
            queue: {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: Un,
              lastRenderedState: _,
            },
            next: null,
          };
          var n = {};
          return (
            (e.next = {
              memoizedState: n,
              baseState: n,
              baseQueue: null,
              queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Un,
                lastRenderedState: n,
              },
              next: null,
            }),
            (t.memoizedState = e),
            (t = t.alternate),
            t !== null && (t.memoizedState = e),
            e
          );
        }
        function Bq(t) {
          var e = bq(t).next.queue;
          tr(t, e, {}, Be());
        }
        function ts() {
          return ue(Ur);
        }
        function Rq() {
          return Dt().memoizedState;
        }
        function Zq() {
          return Dt().memoizedState;
        }
        function g7(t) {
          for (var e = t.return; e !== null; ) {
            switch (e.tag) {
              case 24:
              case 3:
                var n = Be();
                t = Tn(n);
                var r = Gn(e, t, n);
                (r !== null && (Re(r, e, n), Il(r, e, n)),
                  (e = { cache: Qu() }),
                  (t.payload = e));
                return;
            }
            e = e.return;
          }
        }
        function X7(t, e, n) {
          var r = Be();
          ((n = {
            lane: r,
            revertLane: 0,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          }),
            bi(t)
              ? Tq(e, n)
              : ((n = hu(t, e, n, r)),
                n !== null && (Re(n, t, r), Gq(n, e, r))));
        }
        function xq(t, e, n) {
          var r = Be();
          tr(t, e, n, r);
        }
        function tr(t, e, n, r) {
          var u = {
            lane: r,
            revertLane: 0,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          };
          if (bi(t)) Tq(e, u);
          else {
            var V = t.alternate;
            if (
              t.lanes === 0 &&
              (V === null || V.lanes === 0) &&
              ((V = e.lastRenderedReducer), V !== null)
            )
              try {
                var K = e.lastRenderedState,
                  U = V(K, n);
                if (((u.hasEagerState = !0), (u.eagerState = U), Se(U, K)))
                  return (di(t, e, u, 0), xt === null && qi(), !1);
              } catch {
              } finally {
              }
            if (((n = hu(t, e, u, r)), n !== null))
              return (Re(n, t, r), Gq(n, e, r), !0);
          }
          return !1;
        }
        function es(t, e, n, r) {
          if (
            ((r = {
              lane: 2,
              revertLane: Rs(),
              action: r,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            bi(t))
          ) {
            if (e) throw Error(o(479));
          } else ((e = hu(t, n, r, 2)), e !== null && Re(e, t, 2));
        }
        function bi(t) {
          var e = t.alternate;
          return t === vt || (e !== null && e === vt);
        }
        function Tq(t, e) {
          La = Xi = !0;
          var n = t.pending;
          (n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
            (t.pending = e));
        }
        function Gq(t, e, n) {
          if ((n & 4194048) !== 0) {
            var r = e.lanes;
            ((r &= t.pendingLanes), (n |= r), (e.lanes = n), kf(t, n));
          }
        }
        var Bi = {
            readContext: ue,
            use: Si,
            useCallback: kt,
            useContext: kt,
            useEffect: kt,
            useImperativeHandle: kt,
            useLayoutEffect: kt,
            useInsertionEffect: kt,
            useMemo: kt,
            useReducer: kt,
            useRef: kt,
            useState: kt,
            useDebugValue: kt,
            useDeferredValue: kt,
            useTransition: kt,
            useSyncExternalStore: kt,
            useId: kt,
            useHostTransitionStatus: kt,
            useFormState: kt,
            useActionState: kt,
            useOptimistic: kt,
            useMemoCache: kt,
            useCacheRefresh: kt,
          },
          Eq = {
            readContext: ue,
            use: Si,
            useCallback: function (t, e) {
              return ((Ue().memoizedState = [t, e === void 0 ? null : e]), t);
            },
            useContext: ue,
            useEffect: Fq,
            useImperativeHandle: function (t, e, n) {
              ((n = n != null ? n.concat([t]) : null),
                Qi(4194308, 4, Xq.bind(null, e, t), n));
            },
            useLayoutEffect: function (t, e) {
              return Qi(4194308, 4, t, e);
            },
            useInsertionEffect: function (t, e) {
              Qi(4, 2, t, e);
            },
            useMemo: function (t, e) {
              var n = Ue();
              e = e === void 0 ? null : e;
              var r = t();
              if (Ua) {
                bn(!0);
                try {
                  t();
                } finally {
                  bn(!1);
                }
              }
              return ((n.memoizedState = [r, e]), r);
            },
            useReducer: function (t, e, n) {
              var r = Ue();
              if (n !== void 0) {
                var u = n(e);
                if (Ua) {
                  bn(!0);
                  try {
                    n(e);
                  } finally {
                    bn(!1);
                  }
                }
              } else u = e;
              return (
                (r.memoizedState = r.baseState = u),
                (t = {
                  pending: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: t,
                  lastRenderedState: u,
                }),
                (r.queue = t),
                (t = t.dispatch = X7.bind(null, vt, t)),
                [r.memoizedState, t]
              );
            },
            useRef: function (t) {
              var e = Ue();
              return ((t = { current: t }), (e.memoizedState = t));
            },
            useState: function (t) {
              t = Du(t);
              var e = t.queue,
                n = xq.bind(null, vt, e);
              return ((e.dispatch = n), [t.memoizedState, n]);
            },
            useDebugValue: wu,
            useDeferredValue: function (t, e) {
              var n = Ue();
              return _u(n, t, e);
            },
            useTransition: function () {
              var t = Du(!1);
              return (
                (t = Qq.bind(null, vt, t.queue, !0, !1)),
                (Ue().memoizedState = t),
                [!1, t]
              );
            },
            useSyncExternalStore: function (t, e, n) {
              var r = vt,
                u = Ue();
              if (Wt) {
                if (n === void 0) throw Error(o(407));
                n = n();
              } else {
                if (((n = e()), xt === null)) throw Error(o(349));
                (yt & 124) !== 0 || rq(r, e, n);
              }
              u.memoizedState = n;
              var V = { value: n, getSnapshot: e };
              return (
                (u.queue = V),
                Fq(oq.bind(null, r, V, t), [t]),
                (r.flags |= 2048),
                _a(9, Ci(), iq.bind(null, r, V, n, e), null),
                n
              );
            },
            useId: function () {
              var t = Ue(),
                e = xt.identifierPrefix;
              if (Wt) {
                var n = pn,
                  r = dn;
                ((n = (r & ~(1 << (32 - We(r) - 1))).toString(32) + n),
                  (e = "«" + e + "R" + n),
                  (n = Wi++),
                  0 < n && (e += "H" + n.toString(32)),
                  (e += "»"));
              } else ((n = m7++), (e = "«" + e + "r" + n.toString(32) + "»"));
              return (t.memoizedState = e);
            },
            useHostTransitionStatus: ts,
            useFormState: Kq,
            useActionState: Kq,
            useOptimistic: function (t) {
              var e = Ue();
              e.memoizedState = e.baseState = t;
              var n = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: null,
                lastRenderedState: null,
              };
              return (
                (e.queue = n),
                (e = es.bind(null, vt, !0, n)),
                (n.dispatch = e),
                [t, e]
              );
            },
            useMemoCache: Hu,
            useCacheRefresh: function () {
              return (Ue().memoizedState = g7.bind(null, vt));
            },
          },
          Yq = {
            readContext: ue,
            use: Si,
            useCallback: Sq,
            useContext: ue,
            useEffect: yq,
            useImperativeHandle: Wq,
            useInsertionEffect: Aq,
            useLayoutEffect: gq,
            useMemo: zq,
            useReducer: zi,
            useRef: hq,
            useState: function () {
              return zi(Un);
            },
            useDebugValue: wu,
            useDeferredValue: function (t, e) {
              var n = Dt();
              return Cq(n, Qt.memoizedState, t, e);
            },
            useTransition: function () {
              var t = zi(Un)[0],
                e = Dt().memoizedState;
              return [typeof t == "boolean" ? t : _l(t), e];
            },
            useSyncExternalStore: lq,
            useId: Rq,
            useHostTransitionStatus: ts,
            useFormState: vq,
            useActionState: vq,
            useOptimistic: function (t, e) {
              var n = Dt();
              return Vq(n, Qt, t, e);
            },
            useMemoCache: Hu,
            useCacheRefresh: Zq,
          },
          W7 = {
            readContext: ue,
            use: Si,
            useCallback: Sq,
            useContext: ue,
            useEffect: yq,
            useImperativeHandle: Wq,
            useInsertionEffect: Aq,
            useLayoutEffect: gq,
            useMemo: zq,
            useReducer: Iu,
            useRef: hq,
            useState: function () {
              return Iu(Un);
            },
            useDebugValue: wu,
            useDeferredValue: function (t, e) {
              var n = Dt();
              return Qt === null ? _u(n, t, e) : Cq(n, Qt.memoizedState, t, e);
            },
            useTransition: function () {
              var t = Iu(Un)[0],
                e = Dt().memoizedState;
              return [typeof t == "boolean" ? t : _l(t), e];
            },
            useSyncExternalStore: lq,
            useId: Rq,
            useHostTransitionStatus: ts,
            useFormState: mq,
            useActionState: mq,
            useOptimistic: function (t, e) {
              var n = Dt();
              return Qt !== null
                ? Vq(n, Qt, t, e)
                : ((n.baseState = t), [t, n.queue.dispatch]);
            },
            useMemoCache: Hu,
            useCacheRefresh: Zq,
          },
          $a = null,
          er = 0;
        function Ri(t) {
          var e = er;
          return ((er += 1), $a === null && ($a = []), Lc($a, t, e));
        }
        function nr(t, e) {
          ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
        }
        function Zi(t, e) {
          throw e.$$typeof === m
            ? Error(o(525))
            : ((t = Object.prototype.toString.call(e)),
              Error(
                o(
                  31,
                  t === "[object Object]"
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t,
                ),
              ));
        }
        function Mq(t) {
          var e = t._init;
          return e(t._payload);
        }
        function Oq(t) {
          function e(S, W) {
            if (t) {
              var C = S.deletions;
              C === null ? ((S.deletions = [W]), (S.flags |= 16)) : C.push(W);
            }
          }
          function n(S, W) {
            if (!t) return null;
            for (; W !== null; ) (e(S, W), (W = W.sibling));
            return null;
          }
          function r(S) {
            for (var W = new Map(); S !== null; )
              (S.key !== null ? W.set(S.key, S) : W.set(S.index, S),
                (S = S.sibling));
            return W;
          }
          function u(S, W) {
            return ((S = qn(S, W)), (S.index = 0), (S.sibling = null), S);
          }
          function V(S, W, C) {
            return (
              (S.index = C),
              t
                ? ((C = S.alternate),
                  C !== null
                    ? ((C = C.index), C < W ? ((S.flags |= 67108866), W) : C)
                    : ((S.flags |= 67108866), W))
                : ((S.flags |= 1048576), W)
            );
          }
          function K(S) {
            return (t && S.alternate === null && (S.flags |= 67108866), S);
          }
          function U(S, W, C, M) {
            return W === null || W.tag !== 6
              ? ((W = yu(C, S.mode, M)), (W.return = S), W)
              : ((W = u(W, C)), (W.return = S), W);
          }
          function F(S, W, C, M) {
            var tt = C.type;
            return tt === A
              ? E(S, W, C.props.children, M, C.key)
              : W !== null &&
                  (W.elementType === tt ||
                    (typeof tt == "object" &&
                      tt !== null &&
                      tt.$$typeof === k &&
                      Mq(tt) === W.type))
                ? ((W = u(W, C.props)), nr(W, C), (W.return = S), W)
                : ((W = Ki(C.type, C.key, C.props, null, S.mode, M)),
                  nr(W, C),
                  (W.return = S),
                  W);
          }
          function Q(S, W, C, M) {
            return W === null ||
              W.tag !== 4 ||
              W.stateNode.containerInfo !== C.containerInfo ||
              W.stateNode.implementation !== C.implementation
              ? ((W = Au(C, S.mode, M)), (W.return = S), W)
              : ((W = u(W, C.children || [])), (W.return = S), W);
          }
          function E(S, W, C, M, tt) {
            return W === null || W.tag !== 7
              ? ((W = Va(C, S.mode, M, tt)), (W.return = S), W)
              : ((W = u(W, C)), (W.return = S), W);
          }
          function O(S, W, C) {
            if (
              (typeof W == "string" && W !== "") ||
              typeof W == "number" ||
              typeof W == "bigint"
            )
              return ((W = yu("" + W, S.mode, C)), (W.return = S), W);
            if (typeof W == "object" && W !== null) {
              switch (W.$$typeof) {
                case h:
                  return (
                    (C = Ki(W.type, W.key, W.props, null, S.mode, C)),
                    nr(C, W),
                    (C.return = S),
                    C
                  );
                case y:
                  return ((W = Au(W, S.mode, C)), (W.return = S), W);
                case k:
                  var M = W._init;
                  return ((W = M(W._payload)), O(S, W, C));
              }
              if (Ft(W) || H(W))
                return ((W = Va(W, S.mode, C, null)), (W.return = S), W);
              if (typeof W.then == "function") return O(S, Ri(W), C);
              if (W.$$typeof === Y) return O(S, hi(S, W), C);
              Zi(S, W);
            }
            return null;
          }
          function B(S, W, C, M) {
            var tt = W !== null ? W.key : null;
            if (
              (typeof C == "string" && C !== "") ||
              typeof C == "number" ||
              typeof C == "bigint"
            )
              return tt !== null ? null : U(S, W, "" + C, M);
            if (typeof C == "object" && C !== null) {
              switch (C.$$typeof) {
                case h:
                  return C.key === tt ? F(S, W, C, M) : null;
                case y:
                  return C.key === tt ? Q(S, W, C, M) : null;
                case k:
                  return ((tt = C._init), (C = tt(C._payload)), B(S, W, C, M));
              }
              if (Ft(C) || H(C))
                return tt !== null ? null : E(S, W, C, M, null);
              if (typeof C.then == "function") return B(S, W, Ri(C), M);
              if (C.$$typeof === Y) return B(S, W, hi(S, C), M);
              Zi(S, C);
            }
            return null;
          }
          function R(S, W, C, M, tt) {
            if (
              (typeof M == "string" && M !== "") ||
              typeof M == "number" ||
              typeof M == "bigint"
            )
              return ((S = S.get(C) || null), U(W, S, "" + M, tt));
            if (typeof M == "object" && M !== null) {
              switch (M.$$typeof) {
                case h:
                  return (
                    (S = S.get(M.key === null ? C : M.key) || null),
                    F(W, S, M, tt)
                  );
                case y:
                  return (
                    (S = S.get(M.key === null ? C : M.key) || null),
                    Q(W, S, M, tt)
                  );
                case k:
                  var Ut = M._init;
                  return ((M = Ut(M._payload)), R(S, W, C, M, tt));
              }
              if (Ft(M) || H(M))
                return ((S = S.get(C) || null), E(W, S, M, tt, null));
              if (typeof M.then == "function") return R(S, W, C, Ri(M), tt);
              if (M.$$typeof === Y) return R(S, W, C, hi(W, M), tt);
              Zi(W, M);
            }
            return null;
          }
          function ut(S, W, C, M) {
            for (
              var tt = null, Ut = null, et = W, ot = (W = 0), ee = null;
              et !== null && ot < C.length;
              ot++
            ) {
              et.index > ot ? ((ee = et), (et = null)) : (ee = et.sibling);
              var gt = B(S, et, C[ot], M);
              if (gt === null) {
                et === null && (et = ee);
                break;
              }
              (t && et && gt.alternate === null && e(S, et),
                (W = V(gt, W, ot)),
                Ut === null ? (tt = gt) : (Ut.sibling = gt),
                (Ut = gt),
                (et = ee));
            }
            if (ot === C.length) return (n(S, et), Wt && ca(S, ot), tt);
            if (et === null) {
              for (; ot < C.length; ot++)
                ((et = O(S, C[ot], M)),
                  et !== null &&
                    ((W = V(et, W, ot)),
                    Ut === null ? (tt = et) : (Ut.sibling = et),
                    (Ut = et)));
              return (Wt && ca(S, ot), tt);
            }
            for (et = r(et); ot < C.length; ot++)
              ((ee = R(et, S, ot, C[ot], M)),
                ee !== null &&
                  (t &&
                    ee.alternate !== null &&
                    et.delete(ee.key === null ? ot : ee.key),
                  (W = V(ee, W, ot)),
                  Ut === null ? (tt = ee) : (Ut.sibling = ee),
                  (Ut = ee)));
            return (
              t &&
                et.forEach(function (ta) {
                  return e(S, ta);
                }),
              Wt && ca(S, ot),
              tt
            );
          }
          function it(S, W, C, M) {
            if (C == null) throw Error(o(151));
            for (
              var tt = null,
                Ut = null,
                et = W,
                ot = (W = 0),
                ee = null,
                gt = C.next();
              et !== null && !gt.done;
              ot++, gt = C.next()
            ) {
              et.index > ot ? ((ee = et), (et = null)) : (ee = et.sibling);
              var ta = B(S, et, gt.value, M);
              if (ta === null) {
                et === null && (et = ee);
                break;
              }
              (t && et && ta.alternate === null && e(S, et),
                (W = V(ta, W, ot)),
                Ut === null ? (tt = ta) : (Ut.sibling = ta),
                (Ut = ta),
                (et = ee));
            }
            if (gt.done) return (n(S, et), Wt && ca(S, ot), tt);
            if (et === null) {
              for (; !gt.done; ot++, gt = C.next())
                ((gt = O(S, gt.value, M)),
                  gt !== null &&
                    ((W = V(gt, W, ot)),
                    Ut === null ? (tt = gt) : (Ut.sibling = gt),
                    (Ut = gt)));
              return (Wt && ca(S, ot), tt);
            }
            for (et = r(et); !gt.done; ot++, gt = C.next())
              ((gt = R(et, S, ot, gt.value, M)),
                gt !== null &&
                  (t &&
                    gt.alternate !== null &&
                    et.delete(gt.key === null ? ot : gt.key),
                  (W = V(gt, W, ot)),
                  Ut === null ? (tt = gt) : (Ut.sibling = gt),
                  (Ut = gt)));
            return (
              t &&
                et.forEach(function (S1) {
                  return e(S, S1);
                }),
              Wt && ca(S, ot),
              tt
            );
          }
          function Bt(S, W, C, M) {
            if (
              (typeof C == "object" &&
                C !== null &&
                C.type === A &&
                C.key === null &&
                (C = C.props.children),
              typeof C == "object" && C !== null)
            ) {
              switch (C.$$typeof) {
                case h:
                  t: {
                    for (var tt = C.key; W !== null; ) {
                      if (W.key === tt) {
                        if (((tt = C.type), tt === A)) {
                          if (W.tag === 7) {
                            (n(S, W.sibling),
                              (M = u(W, C.props.children)),
                              (M.return = S),
                              (S = M));
                            break t;
                          }
                        } else if (
                          W.elementType === tt ||
                          (typeof tt == "object" &&
                            tt !== null &&
                            tt.$$typeof === k &&
                            Mq(tt) === W.type)
                        ) {
                          (n(S, W.sibling),
                            (M = u(W, C.props)),
                            nr(M, C),
                            (M.return = S),
                            (S = M));
                          break t;
                        }
                        n(S, W);
                        break;
                      } else e(S, W);
                      W = W.sibling;
                    }
                    C.type === A
                      ? ((M = Va(C.props.children, S.mode, M, C.key)),
                        (M.return = S),
                        (S = M))
                      : ((M = Ki(C.type, C.key, C.props, null, S.mode, M)),
                        nr(M, C),
                        (M.return = S),
                        (S = M));
                  }
                  return K(S);
                case y:
                  t: {
                    for (tt = C.key; W !== null; ) {
                      if (W.key === tt)
                        if (
                          W.tag === 4 &&
                          W.stateNode.containerInfo === C.containerInfo &&
                          W.stateNode.implementation === C.implementation
                        ) {
                          (n(S, W.sibling),
                            (M = u(W, C.children || [])),
                            (M.return = S),
                            (S = M));
                          break t;
                        } else {
                          n(S, W);
                          break;
                        }
                      else e(S, W);
                      W = W.sibling;
                    }
                    ((M = Au(C, S.mode, M)), (M.return = S), (S = M));
                  }
                  return K(S);
                case k:
                  return ((tt = C._init), (C = tt(C._payload)), Bt(S, W, C, M));
              }
              if (Ft(C)) return ut(S, W, C, M);
              if (H(C)) {
                if (((tt = H(C)), typeof tt != "function")) throw Error(o(150));
                return ((C = tt.call(C)), it(S, W, C, M));
              }
              if (typeof C.then == "function") return Bt(S, W, Ri(C), M);
              if (C.$$typeof === Y) return Bt(S, W, hi(S, C), M);
              Zi(S, C);
            }
            return (typeof C == "string" && C !== "") ||
              typeof C == "number" ||
              typeof C == "bigint"
              ? ((C = "" + C),
                W !== null && W.tag === 6
                  ? (n(S, W.sibling), (M = u(W, C)), (M.return = S), (S = M))
                  : (n(S, W), (M = yu(C, S.mode, M)), (M.return = S), (S = M)),
                K(S))
              : n(S, W);
          }
          return function (S, W, C, M) {
            try {
              er = 0;
              var tt = Bt(S, W, C, M);
              return (($a = null), tt);
            } catch (et) {
              if (et === Hl || et === yi) throw et;
              var Ut = ze(29, et, null, S.mode);
              return ((Ut.lanes = M), (Ut.return = S), Ut);
            } finally {
            }
          };
        }
        var tl = Oq(!0),
          Nq = Oq(!1),
          Oe = J(null),
          tn = null;
        function Yn(t) {
          var e = t.alternate;
          (j(wt, wt.current & 1),
            j(Oe, t),
            tn === null &&
              (e === null || Da.current !== null || e.memoizedState !== null) &&
              (tn = t));
        }
        function Jq(t) {
          if (t.tag === 22) {
            if ((j(wt, wt.current), j(Oe, t), tn === null)) {
              var e = t.alternate;
              e !== null && e.memoizedState !== null && (tn = t);
            }
          } else Mn();
        }
        function Mn() {
          (j(wt, wt.current), j(Oe, Oe.current));
        }
        function mn(t) {
          (D(Oe), tn === t && (tn = null), D(wt));
        }
        var wt = J(0);
        function xi(t) {
          for (var e = t; e !== null; ) {
            if (e.tag === 13) {
              var n = e.memoizedState;
              if (
                n !== null &&
                ((n = n.dehydrated), n === null || n.data === "$?" || ks(n))
              )
                return e;
            } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
              if ((e.flags & 128) !== 0) return e;
            } else if (e.child !== null) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) return null;
              e = e.return;
            }
            ((e.sibling.return = e.return), (e = e.sibling));
          }
          return null;
        }
        function ns(t, e, n, r) {
          ((e = t.memoizedState),
            (n = n(r, e)),
            (n = n == null ? e : v({}, e, n)),
            (t.memoizedState = n),
            t.lanes === 0 && (t.updateQueue.baseState = n));
        }
        var as = {
          enqueueSetState: function (t, e, n) {
            t = t._reactInternals;
            var r = Be(),
              u = Tn(r);
            ((u.payload = e),
              n != null && (u.callback = n),
              (e = Gn(t, u, r)),
              e !== null && (Re(e, t, r), Il(e, t, r)));
          },
          enqueueReplaceState: function (t, e, n) {
            t = t._reactInternals;
            var r = Be(),
              u = Tn(r);
            ((u.tag = 1),
              (u.payload = e),
              n != null && (u.callback = n),
              (e = Gn(t, u, r)),
              e !== null && (Re(e, t, r), Il(e, t, r)));
          },
          enqueueForceUpdate: function (t, e) {
            t = t._reactInternals;
            var n = Be(),
              r = Tn(n);
            ((r.tag = 2),
              e != null && (r.callback = e),
              (e = Gn(t, r, n)),
              e !== null && (Re(e, t, n), Il(e, t, n)));
          },
        };
        function Pq(t, e, n, r, u, V, K) {
          return (
            (t = t.stateNode),
            typeof t.shouldComponentUpdate == "function"
              ? t.shouldComponentUpdate(r, V, K)
              : e.prototype && e.prototype.isPureReactComponent
                ? !El(n, r) || !El(u, V)
                : !0
          );
        }
        function kq(t, e, n, r) {
          ((t = e.state),
            typeof e.componentWillReceiveProps == "function" &&
              e.componentWillReceiveProps(n, r),
            typeof e.UNSAFE_componentWillReceiveProps == "function" &&
              e.UNSAFE_componentWillReceiveProps(n, r),
            e.state !== t && as.enqueueReplaceState(e, e.state, null));
        }
        function ma(t, e) {
          var n = e;
          if ("ref" in e) {
            n = {};
            for (var r in e) r !== "ref" && (n[r] = e[r]);
          }
          if ((t = t.defaultProps)) {
            n === e && (n = v({}, n));
            for (var u in t) n[u] === void 0 && (n[u] = t[u]);
          }
          return n;
        }
        var Ti =
          typeof reportError == "function"
            ? reportError
            : function (t) {
                if (
                  typeof window == "object" &&
                  typeof window.ErrorEvent == "function"
                ) {
                  var e = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message:
                      typeof t == "object" &&
                      t !== null &&
                      typeof t.message == "string"
                        ? String(t.message)
                        : String(t),
                    error: t,
                  });
                  if (!window.dispatchEvent(e)) return;
                } else if (
                  typeof process == "object" &&
                  typeof process.emit == "function"
                ) {
                  process.emit("uncaughtException", t);
                  return;
                }
                console.error(t);
              };
        function Hq(t) {
          Ti(t);
        }
        function jq(t) {
          console.error(t);
        }
        function Iq(t) {
          Ti(t);
        }
        function Gi(t, e) {
          try {
            var n = t.onUncaughtError;
            n(e.value, { componentStack: e.stack });
          } catch (r) {
            setTimeout(function () {
              throw r;
            });
          }
        }
        function Dq(t, e, n) {
          try {
            var r = t.onCaughtError;
            r(n.value, {
              componentStack: n.stack,
              errorBoundary: e.tag === 1 ? e.stateNode : null,
            });
          } catch (u) {
            setTimeout(function () {
              throw u;
            });
          }
        }
        function ls(t, e, n) {
          return (
            (n = Tn(n)),
            (n.tag = 3),
            (n.payload = { element: null }),
            (n.callback = function () {
              Gi(t, e);
            }),
            n
          );
        }
        function Lq(t) {
          return ((t = Tn(t)), (t.tag = 3), t);
        }
        function wq(t, e, n, r) {
          var u = n.type.getDerivedStateFromError;
          if (typeof u == "function") {
            var V = r.value;
            ((t.payload = function () {
              return u(V);
            }),
              (t.callback = function () {
                Dq(e, n, r);
              }));
          }
          var K = n.stateNode;
          K !== null &&
            typeof K.componentDidCatch == "function" &&
            (t.callback = function () {
              (Dq(e, n, r),
                typeof u != "function" &&
                  (Hn === null ? (Hn = new Set([this])) : Hn.add(this)));
              var U = r.stack;
              this.componentDidCatch(r.value, {
                componentStack: U !== null ? U : "",
              });
            });
        }
        function S7(t, e, n, r, u) {
          if (
            ((n.flags |= 32768),
            r !== null && typeof r == "object" && typeof r.then == "function")
          ) {
            if (
              ((e = n.alternate),
              e !== null && Jl(e, n, u, !0),
              (n = Oe.current),
              n !== null)
            ) {
              switch (n.tag) {
                case 13:
                  return (
                    tn === null
                      ? zs()
                      : n.alternate === null && Jt === 0 && (Jt = 3),
                    (n.flags &= -257),
                    (n.flags |= 65536),
                    (n.lanes = u),
                    r === Ru
                      ? (n.flags |= 16384)
                      : ((e = n.updateQueue),
                        e === null ? (n.updateQueue = new Set([r])) : e.add(r),
                        Qs(t, r, u)),
                    !1
                  );
                case 22:
                  return (
                    (n.flags |= 65536),
                    r === Ru
                      ? (n.flags |= 16384)
                      : ((e = n.updateQueue),
                        e === null
                          ? ((e = {
                              transitions: null,
                              markerInstances: null,
                              retryQueue: new Set([r]),
                            }),
                            (n.updateQueue = e))
                          : ((n = e.retryQueue),
                            n === null
                              ? (e.retryQueue = new Set([r]))
                              : n.add(r)),
                        Qs(t, r, u)),
                    !1
                  );
              }
              throw Error(o(435, n.tag));
            }
            return (Qs(t, r, u), zs(), !1);
          }
          if (Wt)
            return (
              (e = Oe.current),
              e !== null
                ? ((e.flags & 65536) === 0 && (e.flags |= 256),
                  (e.flags |= 65536),
                  (e.lanes = u),
                  r !== Wu && ((t = Error(o(422), { cause: r })), Nl(Ge(t, n))))
                : (r !== Wu &&
                    ((e = Error(o(423), { cause: r })), Nl(Ge(e, n))),
                  (t = t.current.alternate),
                  (t.flags |= 65536),
                  (u &= -u),
                  (t.lanes |= u),
                  (r = Ge(r, n)),
                  (u = ls(t.stateNode, r, u)),
                  Tu(t, u),
                  Jt !== 4 && (Jt = 2)),
              !1
            );
          var V = Error(o(520), { cause: r });
          if (
            ((V = Ge(V, n)),
            sr === null ? (sr = [V]) : sr.push(V),
            Jt !== 4 && (Jt = 2),
            e === null)
          )
            return !0;
          ((r = Ge(r, n)), (n = e));
          do {
            switch (n.tag) {
              case 3:
                return (
                  (n.flags |= 65536),
                  (t = u & -u),
                  (n.lanes |= t),
                  (t = ls(n.stateNode, r, t)),
                  Tu(n, t),
                  !1
                );
              case 1:
                if (
                  ((e = n.type),
                  (V = n.stateNode),
                  (n.flags & 128) === 0 &&
                    (typeof e.getDerivedStateFromError == "function" ||
                      (V !== null &&
                        typeof V.componentDidCatch == "function" &&
                        (Hn === null || !Hn.has(V)))))
                )
                  return (
                    (n.flags |= 65536),
                    (u &= -u),
                    (n.lanes |= u),
                    (u = Lq(u)),
                    wq(u, t, n, r),
                    Tu(n, u),
                    !1
                  );
            }
            n = n.return;
          } while (n !== null);
          return !1;
        }
        var _q = Error(o(461)),
          $t = !1;
        function ne(t, e, n, r) {
          e.child = t === null ? Nq(e, null, n, r) : tl(e, t.child, n, r);
        }
        function $q(t, e, n, r, u) {
          n = n.render;
          var V = e.ref;
          if ("ref" in r) {
            var K = {};
            for (var U in r) U !== "ref" && (K[U] = r[U]);
          } else K = r;
          return (
            Ka(e),
            (r = Ou(t, e, n, K, V, u)),
            (U = Nu()),
            t !== null && !$t
              ? (Ju(t, e, u), hn(t, e, u))
              : (Wt && U && gu(e), (e.flags |= 1), ne(t, e, r, u), e.child)
          );
        }
        function td(t, e, n, r, u) {
          if (t === null) {
            var V = n.type;
            return typeof V == "function" &&
              !Fu(V) &&
              V.defaultProps === void 0 &&
              n.compare === null
              ? ((e.tag = 15), (e.type = V), ed(t, e, V, r, u))
              : ((t = Ki(n.type, null, r, e, e.mode, u)),
                (t.ref = e.ref),
                (t.return = e),
                (e.child = t));
          }
          if (((V = t.child), !cs(t, u))) {
            var K = V.memoizedProps;
            if (
              ((n = n.compare),
              (n = n !== null ? n : El),
              n(K, r) && t.ref === e.ref)
            )
              return hn(t, e, u);
          }
          return (
            (e.flags |= 1),
            (t = qn(V, r)),
            (t.ref = e.ref),
            (t.return = e),
            (e.child = t)
          );
        }
        function ed(t, e, n, r, u) {
          if (t !== null) {
            var V = t.memoizedProps;
            if (El(V, r) && t.ref === e.ref)
              if ((($t = !1), (e.pendingProps = r = V), cs(t, u)))
                (t.flags & 131072) !== 0 && ($t = !0);
              else return ((e.lanes = t.lanes), hn(t, e, u));
          }
          return rs(t, e, n, r, u);
        }
        function nd(t, e, n) {
          var r = e.pendingProps,
            u = r.children,
            V = t !== null ? t.memoizedState : null;
          if (r.mode === "hidden") {
            if ((e.flags & 128) !== 0) {
              if (((r = V !== null ? V.baseLanes | n : n), t !== null)) {
                for (u = e.child = t.child, V = 0; u !== null; )
                  ((V = V | u.lanes | u.childLanes), (u = u.sibling));
                e.childLanes = V & ~r;
              } else ((e.childLanes = 0), (e.child = null));
              return ad(t, e, r, n);
            }
            if ((n & 536870912) !== 0)
              ((e.memoizedState = { baseLanes: 0, cachePool: null }),
                t !== null && Fi(e, V !== null ? V.cachePool : null),
                V !== null ? eq(e, V) : Eu(),
                Jq(e));
            else
              return (
                (e.lanes = e.childLanes = 536870912),
                ad(t, e, V !== null ? V.baseLanes | n : n, n)
              );
          } else
            V !== null
              ? (Fi(e, V.cachePool), eq(e, V), Mn(), (e.memoizedState = null))
              : (t !== null && Fi(e, null), Eu(), Mn());
          return (ne(t, e, u, n), e.child);
        }
        function ad(t, e, n, r) {
          var u = Bu();
          return (
            (u = u === null ? null : { parent: Lt._currentValue, pool: u }),
            (e.memoizedState = { baseLanes: n, cachePool: u }),
            t !== null && Fi(e, null),
            Eu(),
            Jq(e),
            t !== null && Jl(t, e, r, !0),
            null
          );
        }
        function Ei(t, e) {
          var n = e.ref;
          if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
          else {
            if (typeof n != "function" && typeof n != "object")
              throw Error(o(284));
            (t === null || t.ref !== n) && (e.flags |= 4194816);
          }
        }
        function rs(t, e, n, r, u) {
          return (
            Ka(e),
            (n = Ou(t, e, n, r, void 0, u)),
            (r = Nu()),
            t !== null && !$t
              ? (Ju(t, e, u), hn(t, e, u))
              : (Wt && r && gu(e), (e.flags |= 1), ne(t, e, n, u), e.child)
          );
        }
        function ld(t, e, n, r, u, V) {
          return (
            Ka(e),
            (e.updateQueue = null),
            (n = aq(e, r, n, u)),
            nq(t),
            (r = Nu()),
            t !== null && !$t
              ? (Ju(t, e, V), hn(t, e, V))
              : (Wt && r && gu(e), (e.flags |= 1), ne(t, e, n, V), e.child)
          );
        }
        function rd(t, e, n, r, u) {
          if ((Ka(e), e.stateNode === null)) {
            var V = Pa,
              K = n.contextType;
            (typeof K == "object" && K !== null && (V = ue(K)),
              (V = new n(r, V)),
              (e.memoizedState =
                V.state !== null && V.state !== void 0 ? V.state : null),
              (V.updater = as),
              (e.stateNode = V),
              (V._reactInternals = e),
              (V = e.stateNode),
              (V.props = r),
              (V.state = e.memoizedState),
              (V.refs = {}),
              Zu(e),
              (K = n.contextType),
              (V.context = typeof K == "object" && K !== null ? ue(K) : Pa),
              (V.state = e.memoizedState),
              (K = n.getDerivedStateFromProps),
              typeof K == "function" &&
                (ns(e, n, K, r), (V.state = e.memoizedState)),
              typeof n.getDerivedStateFromProps == "function" ||
                typeof V.getSnapshotBeforeUpdate == "function" ||
                (typeof V.UNSAFE_componentWillMount != "function" &&
                  typeof V.componentWillMount != "function") ||
                ((K = V.state),
                typeof V.componentWillMount == "function" &&
                  V.componentWillMount(),
                typeof V.UNSAFE_componentWillMount == "function" &&
                  V.UNSAFE_componentWillMount(),
                K !== V.state && as.enqueueReplaceState(V, V.state, null),
                Ll(e, r, V, u),
                Dl(),
                (V.state = e.memoizedState)),
              typeof V.componentDidMount == "function" && (e.flags |= 4194308),
              (r = !0));
          } else if (t === null) {
            V = e.stateNode;
            var U = e.memoizedProps,
              F = ma(n, U);
            V.props = F;
            var Q = V.context,
              E = n.contextType;
            ((K = Pa), typeof E == "object" && E !== null && (K = ue(E)));
            var O = n.getDerivedStateFromProps;
            ((E =
              typeof O == "function" ||
              typeof V.getSnapshotBeforeUpdate == "function"),
              (U = e.pendingProps !== U),
              E ||
                (typeof V.UNSAFE_componentWillReceiveProps != "function" &&
                  typeof V.componentWillReceiveProps != "function") ||
                ((U || Q !== K) && kq(e, V, r, K)),
              (xn = !1));
            var B = e.memoizedState;
            ((V.state = B),
              Ll(e, r, V, u),
              Dl(),
              (Q = e.memoizedState),
              U || B !== Q || xn
                ? (typeof O == "function" &&
                    (ns(e, n, O, r), (Q = e.memoizedState)),
                  (F = xn || Pq(e, n, F, r, B, Q, K))
                    ? (E ||
                        (typeof V.UNSAFE_componentWillMount != "function" &&
                          typeof V.componentWillMount != "function") ||
                        (typeof V.componentWillMount == "function" &&
                          V.componentWillMount(),
                        typeof V.UNSAFE_componentWillMount == "function" &&
                          V.UNSAFE_componentWillMount()),
                      typeof V.componentDidMount == "function" &&
                        (e.flags |= 4194308))
                    : (typeof V.componentDidMount == "function" &&
                        (e.flags |= 4194308),
                      (e.memoizedProps = r),
                      (e.memoizedState = Q)),
                  (V.props = r),
                  (V.state = Q),
                  (V.context = K),
                  (r = F))
                : (typeof V.componentDidMount == "function" &&
                    (e.flags |= 4194308),
                  (r = !1)));
          } else {
            ((V = e.stateNode),
              xu(t, e),
              (K = e.memoizedProps),
              (E = ma(n, K)),
              (V.props = E),
              (O = e.pendingProps),
              (B = V.context),
              (Q = n.contextType),
              (F = Pa),
              typeof Q == "object" && Q !== null && (F = ue(Q)),
              (U = n.getDerivedStateFromProps),
              (Q =
                typeof U == "function" ||
                typeof V.getSnapshotBeforeUpdate == "function") ||
                (typeof V.UNSAFE_componentWillReceiveProps != "function" &&
                  typeof V.componentWillReceiveProps != "function") ||
                ((K !== O || B !== F) && kq(e, V, r, F)),
              (xn = !1),
              (B = e.memoizedState),
              (V.state = B),
              Ll(e, r, V, u),
              Dl());
            var R = e.memoizedState;
            K !== O ||
            B !== R ||
            xn ||
            (t !== null && t.dependencies !== null && mi(t.dependencies))
              ? (typeof U == "function" &&
                  (ns(e, n, U, r), (R = e.memoizedState)),
                (E =
                  xn ||
                  Pq(e, n, E, r, B, R, F) ||
                  (t !== null && t.dependencies !== null && mi(t.dependencies)))
                  ? (Q ||
                      (typeof V.UNSAFE_componentWillUpdate != "function" &&
                        typeof V.componentWillUpdate != "function") ||
                      (typeof V.componentWillUpdate == "function" &&
                        V.componentWillUpdate(r, R, F),
                      typeof V.UNSAFE_componentWillUpdate == "function" &&
                        V.UNSAFE_componentWillUpdate(r, R, F)),
                    typeof V.componentDidUpdate == "function" && (e.flags |= 4),
                    typeof V.getSnapshotBeforeUpdate == "function" &&
                      (e.flags |= 1024))
                  : (typeof V.componentDidUpdate != "function" ||
                      (K === t.memoizedProps && B === t.memoizedState) ||
                      (e.flags |= 4),
                    typeof V.getSnapshotBeforeUpdate != "function" ||
                      (K === t.memoizedProps && B === t.memoizedState) ||
                      (e.flags |= 1024),
                    (e.memoizedProps = r),
                    (e.memoizedState = R)),
                (V.props = r),
                (V.state = R),
                (V.context = F),
                (r = E))
              : (typeof V.componentDidUpdate != "function" ||
                  (K === t.memoizedProps && B === t.memoizedState) ||
                  (e.flags |= 4),
                typeof V.getSnapshotBeforeUpdate != "function" ||
                  (K === t.memoizedProps && B === t.memoizedState) ||
                  (e.flags |= 1024),
                (r = !1));
          }
          return (
            (V = r),
            Ei(t, e),
            (r = (e.flags & 128) !== 0),
            V || r
              ? ((V = e.stateNode),
                (n =
                  r && typeof n.getDerivedStateFromError != "function"
                    ? null
                    : V.render()),
                (e.flags |= 1),
                t !== null && r
                  ? ((e.child = tl(e, t.child, null, u)),
                    (e.child = tl(e, null, n, u)))
                  : ne(t, e, n, u),
                (e.memoizedState = V.state),
                (t = e.child))
              : (t = hn(t, e, u)),
            t
          );
        }
        function id(t, e, n, r) {
          return (Ol(), (e.flags |= 256), ne(t, e, n, r), e.child);
        }
        var is = {
          dehydrated: null,
          treeContext: null,
          retryLane: 0,
          hydrationErrors: null,
        };
        function os(t) {
          return { baseLanes: t, cachePool: jc() };
        }
        function us(t, e, n) {
          return ((t = t !== null ? t.childLanes & ~n : 0), e && (t |= Ne), t);
        }
        function od(t, e, n) {
          var r = e.pendingProps,
            u = !1,
            V = (e.flags & 128) !== 0,
            K;
          if (
            ((K = V) ||
              (K =
                t !== null && t.memoizedState === null
                  ? !1
                  : (wt.current & 2) !== 0),
            K && ((u = !0), (e.flags &= -129)),
            (K = (e.flags & 32) !== 0),
            (e.flags &= -33),
            t === null)
          ) {
            if (Wt) {
              if ((u ? Yn(e) : Mn(), Wt)) {
                var U = Nt,
                  F;
                if ((F = U)) {
                  t: {
                    for (F = U, U = $e; F.nodeType !== 8; ) {
                      if (!U) {
                        U = null;
                        break t;
                      }
                      if (((F = De(F.nextSibling)), F === null)) {
                        U = null;
                        break t;
                      }
                    }
                    U = F;
                  }
                  U !== null
                    ? ((e.memoizedState = {
                        dehydrated: U,
                        treeContext:
                          fa !== null ? { id: dn, overflow: pn } : null,
                        retryLane: 536870912,
                        hydrationErrors: null,
                      }),
                      (F = ze(18, null, null, 0)),
                      (F.stateNode = U),
                      (F.return = e),
                      (e.child = F),
                      (qe = e),
                      (Nt = null),
                      (F = !0))
                    : (F = !1);
                }
                F || da(e);
              }
              if (
                ((U = e.memoizedState),
                U !== null && ((U = U.dehydrated), U !== null))
              )
                return (ks(U) ? (e.lanes = 32) : (e.lanes = 536870912), null);
              mn(e);
            }
            return (
              (U = r.children),
              (r = r.fallback),
              u
                ? (Mn(),
                  (u = e.mode),
                  (U = Yi({ mode: "hidden", children: U }, u)),
                  (r = Va(r, u, n, null)),
                  (U.return = e),
                  (r.return = e),
                  (U.sibling = r),
                  (e.child = U),
                  (u = e.child),
                  (u.memoizedState = os(n)),
                  (u.childLanes = us(t, K, n)),
                  (e.memoizedState = is),
                  r)
                : (Yn(e), ss(e, U))
            );
          }
          if (
            ((F = t.memoizedState),
            F !== null && ((U = F.dehydrated), U !== null))
          ) {
            if (V)
              e.flags & 256
                ? (Yn(e), (e.flags &= -257), (e = Vs(t, e, n)))
                : e.memoizedState !== null
                  ? (Mn(), (e.child = t.child), (e.flags |= 128), (e = null))
                  : (Mn(),
                    (u = r.fallback),
                    (U = e.mode),
                    (r = Yi({ mode: "visible", children: r.children }, U)),
                    (u = Va(u, U, n, null)),
                    (u.flags |= 2),
                    (r.return = e),
                    (u.return = e),
                    (r.sibling = u),
                    (e.child = r),
                    tl(e, t.child, null, n),
                    (r = e.child),
                    (r.memoizedState = os(n)),
                    (r.childLanes = us(t, K, n)),
                    (e.memoizedState = is),
                    (e = u));
            else if ((Yn(e), ks(U))) {
              if (((K = U.nextSibling && U.nextSibling.dataset), K))
                var Q = K.dgst;
              ((K = Q),
                (r = Error(o(419))),
                (r.stack = ""),
                (r.digest = K),
                Nl({ value: r, source: null, stack: null }),
                (e = Vs(t, e, n)));
            } else if (
              ($t || Jl(t, e, n, !1), (K = (n & t.childLanes) !== 0), $t || K)
            ) {
              if (
                ((K = xt),
                K !== null &&
                  ((r = n & -n),
                  (r = (r & 42) !== 0 ? 1 : Ho(r)),
                  (r = (r & (K.suspendedLanes | n)) !== 0 ? 0 : r),
                  r !== 0 && r !== F.retryLane))
              )
                throw ((F.retryLane = r), Ja(t, r), Re(K, t, r), _q);
              (U.data === "$?" || zs(), (e = Vs(t, e, n)));
            } else
              U.data === "$?"
                ? ((e.flags |= 192), (e.child = t.child), (e = null))
                : ((t = F.treeContext),
                  (Nt = De(U.nextSibling)),
                  (qe = e),
                  (Wt = !0),
                  (qa = null),
                  ($e = !1),
                  t !== null &&
                    ((Ye[Me++] = dn),
                    (Ye[Me++] = pn),
                    (Ye[Me++] = fa),
                    (dn = t.id),
                    (pn = t.overflow),
                    (fa = e)),
                  (e = ss(e, r.children)),
                  (e.flags |= 4096));
            return e;
          }
          return u
            ? (Mn(),
              (u = r.fallback),
              (U = e.mode),
              (F = t.child),
              (Q = F.sibling),
              (r = qn(F, { mode: "hidden", children: r.children })),
              (r.subtreeFlags = F.subtreeFlags & 65011712),
              Q !== null
                ? (u = qn(Q, u))
                : ((u = Va(u, U, n, null)), (u.flags |= 2)),
              (u.return = e),
              (r.return = e),
              (r.sibling = u),
              (e.child = r),
              (r = u),
              (u = e.child),
              (U = t.child.memoizedState),
              U === null
                ? (U = os(n))
                : ((F = U.cachePool),
                  F !== null
                    ? ((Q = Lt._currentValue),
                      (F = F.parent !== Q ? { parent: Q, pool: Q } : F))
                    : (F = jc()),
                  (U = { baseLanes: U.baseLanes | n, cachePool: F })),
              (u.memoizedState = U),
              (u.childLanes = us(t, K, n)),
              (e.memoizedState = is),
              r)
            : (Yn(e),
              (n = t.child),
              (t = n.sibling),
              (n = qn(n, { mode: "visible", children: r.children })),
              (n.return = e),
              (n.sibling = null),
              t !== null &&
                ((K = e.deletions),
                K === null
                  ? ((e.deletions = [t]), (e.flags |= 16))
                  : K.push(t)),
              (e.child = n),
              (e.memoizedState = null),
              n);
        }
        function ss(t, e) {
          return (
            (e = Yi({ mode: "visible", children: e }, t.mode)),
            (e.return = t),
            (t.child = e)
          );
        }
        function Yi(t, e) {
          return (
            (t = ze(22, t, null, e)),
            (t.lanes = 0),
            (t.stateNode = {
              _visibility: 1,
              _pendingMarkers: null,
              _retryCache: null,
              _transitions: null,
            }),
            t
          );
        }
        function Vs(t, e, n) {
          return (
            tl(e, t.child, null, n),
            (t = ss(e, e.pendingProps.children)),
            (t.flags |= 2),
            (e.memoizedState = null),
            t
          );
        }
        function ud(t, e, n) {
          t.lanes |= e;
          var r = t.alternate;
          (r !== null && (r.lanes |= e), zu(t.return, e, n));
        }
        function fs(t, e, n, r, u) {
          var V = t.memoizedState;
          V === null
            ? (t.memoizedState = {
                isBackwards: e,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: u,
              })
            : ((V.isBackwards = e),
              (V.rendering = null),
              (V.renderingStartTime = 0),
              (V.last = r),
              (V.tail = n),
              (V.tailMode = u));
        }
        function sd(t, e, n) {
          var r = e.pendingProps,
            u = r.revealOrder,
            V = r.tail;
          if ((ne(t, e, r.children, n), (r = wt.current), (r & 2) !== 0))
            ((r = (r & 1) | 2), (e.flags |= 128));
          else {
            if (t !== null && (t.flags & 128) !== 0)
              t: for (t = e.child; t !== null; ) {
                if (t.tag === 13) t.memoizedState !== null && ud(t, n, e);
                else if (t.tag === 19) ud(t, n, e);
                else if (t.child !== null) {
                  ((t.child.return = t), (t = t.child));
                  continue;
                }
                if (t === e) break t;
                for (; t.sibling === null; ) {
                  if (t.return === null || t.return === e) break t;
                  t = t.return;
                }
                ((t.sibling.return = t.return), (t = t.sibling));
              }
            r &= 1;
          }
          switch ((j(wt, r), u)) {
            case "forwards":
              for (n = e.child, u = null; n !== null; )
                ((t = n.alternate),
                  t !== null && xi(t) === null && (u = n),
                  (n = n.sibling));
              ((n = u),
                n === null
                  ? ((u = e.child), (e.child = null))
                  : ((u = n.sibling), (n.sibling = null)),
                fs(e, !1, u, n, V));
              break;
            case "backwards":
              for (n = null, u = e.child, e.child = null; u !== null; ) {
                if (((t = u.alternate), t !== null && xi(t) === null)) {
                  e.child = u;
                  break;
                }
                ((t = u.sibling), (u.sibling = n), (n = u), (u = t));
              }
              fs(e, !0, n, null, V);
              break;
            case "together":
              fs(e, !1, null, null, void 0);
              break;
            default:
              e.memoizedState = null;
          }
          return e.child;
        }
        function hn(t, e, n) {
          if (
            (t !== null && (e.dependencies = t.dependencies),
            (kn |= e.lanes),
            (n & e.childLanes) === 0)
          )
            if (t !== null) {
              if ((Jl(t, e, n, !1), (n & e.childLanes) === 0)) return null;
            } else return null;
          if (t !== null && e.child !== t.child) throw Error(o(153));
          if (e.child !== null) {
            for (
              t = e.child, n = qn(t, t.pendingProps), e.child = n, n.return = e;
              t.sibling !== null;
            )
              ((t = t.sibling),
                (n = n.sibling = qn(t, t.pendingProps)),
                (n.return = e));
            n.sibling = null;
          }
          return e.child;
        }
        function cs(t, e) {
          return (t.lanes & e) !== 0
            ? !0
            : ((t = t.dependencies), !!(t !== null && mi(t)));
        }
        function z7(t, e, n) {
          switch (e.tag) {
            case 3:
              (ft(e, e.stateNode.containerInfo),
                Zn(e, Lt, t.memoizedState.cache),
                Ol());
              break;
            case 27:
            case 5:
              Ze(e);
              break;
            case 4:
              ft(e, e.stateNode.containerInfo);
              break;
            case 10:
              Zn(e, e.type, e.memoizedProps.value);
              break;
            case 13:
              var r = e.memoizedState;
              if (r !== null)
                return r.dehydrated !== null
                  ? (Yn(e), (e.flags |= 128), null)
                  : (n & e.child.childLanes) !== 0
                    ? od(t, e, n)
                    : (Yn(e), (t = hn(t, e, n)), t !== null ? t.sibling : null);
              Yn(e);
              break;
            case 19:
              var u = (t.flags & 128) !== 0;
              if (
                ((r = (n & e.childLanes) !== 0),
                r || (Jl(t, e, n, !1), (r = (n & e.childLanes) !== 0)),
                u)
              ) {
                if (r) return sd(t, e, n);
                e.flags |= 128;
              }
              if (
                ((u = e.memoizedState),
                u !== null &&
                  ((u.rendering = null),
                  (u.tail = null),
                  (u.lastEffect = null)),
                j(wt, wt.current),
                r)
              )
                break;
              return null;
            case 22:
            case 23:
              return ((e.lanes = 0), nd(t, e, n));
            case 24:
              Zn(e, Lt, t.memoizedState.cache);
          }
          return hn(t, e, n);
        }
        function Vd(t, e, n) {
          if (t !== null)
            if (t.memoizedProps !== e.pendingProps) $t = !0;
            else {
              if (!cs(t, n) && (e.flags & 128) === 0)
                return (($t = !1), z7(t, e, n));
              $t = (t.flags & 131072) !== 0;
            }
          else
            (($t = !1), Wt && (e.flags & 1048576) !== 0 && Mc(e, Ui, e.index));
          switch (((e.lanes = 0), e.tag)) {
            case 16:
              t: {
                t = e.pendingProps;
                var r = e.elementType,
                  u = r._init;
                if (((r = u(r._payload)), (e.type = r), typeof r == "function"))
                  Fu(r)
                    ? ((t = ma(r, t)), (e.tag = 1), (e = rd(null, e, r, t, n)))
                    : ((e.tag = 0), (e = rs(null, e, r, t, n)));
                else {
                  if (r != null) {
                    if (((u = r.$$typeof), u === L)) {
                      ((e.tag = 11), (e = $q(null, e, r, t, n)));
                      break t;
                    } else if (u === nt) {
                      ((e.tag = 14), (e = td(null, e, r, t, n)));
                      break t;
                    }
                  }
                  throw ((e = rt(r) || r), Error(o(306, e, "")));
                }
              }
              return e;
            case 0:
              return rs(t, e, e.type, e.pendingProps, n);
            case 1:
              return (
                (r = e.type),
                (u = ma(r, e.pendingProps)),
                rd(t, e, r, u, n)
              );
            case 3:
              t: {
                if ((ft(e, e.stateNode.containerInfo), t === null))
                  throw Error(o(387));
                r = e.pendingProps;
                var V = e.memoizedState;
                ((u = V.element), xu(t, e), Ll(e, r, null, n));
                var K = e.memoizedState;
                if (
                  ((r = K.cache),
                  Zn(e, Lt, r),
                  r !== V.cache && Cu(e, [Lt], n, !0),
                  Dl(),
                  (r = K.element),
                  V.isDehydrated)
                )
                  if (
                    ((V = { element: r, isDehydrated: !1, cache: K.cache }),
                    (e.updateQueue.baseState = V),
                    (e.memoizedState = V),
                    e.flags & 256)
                  ) {
                    e = id(t, e, r, n);
                    break t;
                  } else if (r !== u) {
                    ((u = Ge(Error(o(424)), e)), Nl(u), (e = id(t, e, r, n)));
                    break t;
                  } else {
                    switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                      case 9:
                        t = t.body;
                        break;
                      default:
                        t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
                    }
                    for (
                      Nt = De(t.firstChild),
                        qe = e,
                        Wt = !0,
                        qa = null,
                        $e = !0,
                        n = Nq(e, null, r, n),
                        e.child = n;
                      n;
                    )
                      ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
                  }
                else {
                  if ((Ol(), r === u)) {
                    e = hn(t, e, n);
                    break t;
                  }
                  ne(t, e, r, n);
                }
                e = e.child;
              }
              return e;
            case 26:
              return (
                Ei(t, e),
                t === null
                  ? (n = dp(e.type, null, e.pendingProps, null))
                    ? (e.memoizedState = n)
                    : Wt ||
                      ((n = e.type),
                      (t = e.pendingProps),
                      (r = $i(at.current).createElement(n)),
                      (r[oe] = e),
                      (r[Ke] = t),
                      le(r, n, t),
                      _t(r),
                      (e.stateNode = r))
                  : (e.memoizedState = dp(
                      e.type,
                      t.memoizedProps,
                      e.pendingProps,
                      t.memoizedState,
                    )),
                null
              );
            case 27:
              return (
                Ze(e),
                t === null &&
                  Wt &&
                  ((r = e.stateNode = fp(e.type, e.pendingProps, at.current)),
                  (qe = e),
                  ($e = !0),
                  (u = Nt),
                  Dn(e.type) ? ((Hs = u), (Nt = De(r.firstChild))) : (Nt = u)),
                ne(t, e, e.pendingProps.children, n),
                Ei(t, e),
                t === null && (e.flags |= 4194304),
                e.child
              );
            case 5:
              return (
                t === null &&
                  Wt &&
                  ((u = r = Nt) &&
                    ((r = n1(r, e.type, e.pendingProps, $e)),
                    r !== null
                      ? ((e.stateNode = r),
                        (qe = e),
                        (Nt = De(r.firstChild)),
                        ($e = !1),
                        (u = !0))
                      : (u = !1)),
                  u || da(e)),
                Ze(e),
                (u = e.type),
                (V = e.pendingProps),
                (K = t !== null ? t.memoizedProps : null),
                (r = V.children),
                Ns(u, V)
                  ? (r = null)
                  : K !== null && Ns(u, K) && (e.flags |= 32),
                e.memoizedState !== null &&
                  ((u = Ou(t, e, h7, null, null, n)), (Ur._currentValue = u)),
                Ei(t, e),
                ne(t, e, r, n),
                e.child
              );
            case 6:
              return (
                t === null &&
                  Wt &&
                  ((t = n = Nt) &&
                    ((n = a1(n, e.pendingProps, $e)),
                    n !== null
                      ? ((e.stateNode = n), (qe = e), (Nt = null), (t = !0))
                      : (t = !1)),
                  t || da(e)),
                null
              );
            case 13:
              return od(t, e, n);
            case 4:
              return (
                ft(e, e.stateNode.containerInfo),
                (r = e.pendingProps),
                t === null ? (e.child = tl(e, null, r, n)) : ne(t, e, r, n),
                e.child
              );
            case 11:
              return $q(t, e, e.type, e.pendingProps, n);
            case 7:
              return (ne(t, e, e.pendingProps, n), e.child);
            case 8:
              return (ne(t, e, e.pendingProps.children, n), e.child);
            case 12:
              return (ne(t, e, e.pendingProps.children, n), e.child);
            case 10:
              return (
                (r = e.pendingProps),
                Zn(e, e.type, r.value),
                ne(t, e, r.children, n),
                e.child
              );
            case 9:
              return (
                (u = e.type._context),
                (r = e.pendingProps.children),
                Ka(e),
                (u = ue(u)),
                (r = r(u)),
                (e.flags |= 1),
                ne(t, e, r, n),
                e.child
              );
            case 14:
              return td(t, e, e.type, e.pendingProps, n);
            case 15:
              return ed(t, e, e.type, e.pendingProps, n);
            case 19:
              return sd(t, e, n);
            case 31:
              return (
                (r = e.pendingProps),
                (n = e.mode),
                (r = { mode: r.mode, children: r.children }),
                t === null
                  ? ((n = Yi(r, n)),
                    (n.ref = e.ref),
                    (e.child = n),
                    (n.return = e),
                    (e = n))
                  : ((n = qn(t.child, r)),
                    (n.ref = e.ref),
                    (e.child = n),
                    (n.return = e),
                    (e = n)),
                e
              );
            case 22:
              return nd(t, e, n);
            case 24:
              return (
                Ka(e),
                (r = ue(Lt)),
                t === null
                  ? ((u = Bu()),
                    u === null &&
                      ((u = xt),
                      (V = Qu()),
                      (u.pooledCache = V),
                      V.refCount++,
                      V !== null && (u.pooledCacheLanes |= n),
                      (u = V)),
                    (e.memoizedState = { parent: r, cache: u }),
                    Zu(e),
                    Zn(e, Lt, u))
                  : ((t.lanes & n) !== 0 &&
                      (xu(t, e), Ll(e, null, null, n), Dl()),
                    (u = t.memoizedState),
                    (V = e.memoizedState),
                    u.parent !== r
                      ? ((u = { parent: r, cache: r }),
                        (e.memoizedState = u),
                        e.lanes === 0 &&
                          (e.memoizedState = e.updateQueue.baseState = u),
                        Zn(e, Lt, r))
                      : ((r = V.cache),
                        Zn(e, Lt, r),
                        r !== u.cache && Cu(e, [Lt], n, !0))),
                ne(t, e, e.pendingProps.children, n),
                e.child
              );
            case 29:
              throw e.pendingProps;
          }
          throw Error(o(156, e.tag));
        }
        function Fn(t) {
          t.flags |= 4;
        }
        function fd(t, e) {
          if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
            t.flags &= -16777217;
          else if (((t.flags |= 16777216), !mp(e))) {
            if (
              ((e = Oe.current),
              e !== null &&
                ((yt & 4194048) === yt
                  ? tn !== null
                  : ((yt & 62914560) !== yt && (yt & 536870912) === 0) ||
                    e !== tn))
            )
              throw ((jl = Ru), Ic);
            t.flags |= 8192;
          }
        }
        function Mi(t, e) {
          (e !== null && (t.flags |= 4),
            t.flags & 16384 &&
              ((e = t.tag !== 22 ? Jf() : 536870912),
              (t.lanes |= e),
              (ll |= e)));
        }
        function ar(t, e) {
          if (!Wt)
            switch (t.tailMode) {
              case "hidden":
                e = t.tail;
                for (var n = null; e !== null; )
                  (e.alternate !== null && (n = e), (e = e.sibling));
                n === null ? (t.tail = null) : (n.sibling = null);
                break;
              case "collapsed":
                n = t.tail;
                for (var r = null; n !== null; )
                  (n.alternate !== null && (r = n), (n = n.sibling));
                r === null
                  ? e || t.tail === null
                    ? (t.tail = null)
                    : (t.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function Gt(t) {
          var e = t.alternate !== null && t.alternate.child === t.child,
            n = 0,
            r = 0;
          if (e)
            for (var u = t.child; u !== null; )
              ((n |= u.lanes | u.childLanes),
                (r |= u.subtreeFlags & 65011712),
                (r |= u.flags & 65011712),
                (u.return = t),
                (u = u.sibling));
          else
            for (u = t.child; u !== null; )
              ((n |= u.lanes | u.childLanes),
                (r |= u.subtreeFlags),
                (r |= u.flags),
                (u.return = t),
                (u = u.sibling));
          return ((t.subtreeFlags |= r), (t.childLanes = n), e);
        }
        function C7(t, e, n) {
          var r = e.pendingProps;
          switch ((Xu(e), e.tag)) {
            case 31:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return (Gt(e), null);
            case 1:
              return (Gt(e), null);
            case 3:
              return (
                (n = e.stateNode),
                (r = null),
                t !== null && (r = t.memoizedState.cache),
                e.memoizedState.cache !== r && (e.flags |= 2048),
                vn(Lt),
                Ot(),
                n.pendingContext &&
                  ((n.context = n.pendingContext), (n.pendingContext = null)),
                (t === null || t.child === null) &&
                  (Ml(e)
                    ? Fn(e)
                    : t === null ||
                      (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                      ((e.flags |= 1024), Jc())),
                Gt(e),
                null
              );
            case 26:
              return (
                (n = e.memoizedState),
                t === null
                  ? (Fn(e),
                    n !== null
                      ? (Gt(e), fd(e, n))
                      : (Gt(e), (e.flags &= -16777217)))
                  : n
                    ? n !== t.memoizedState
                      ? (Fn(e), Gt(e), fd(e, n))
                      : (Gt(e), (e.flags &= -16777217))
                    : (t.memoizedProps !== r && Fn(e),
                      Gt(e),
                      (e.flags &= -16777217)),
                null
              );
            case 27:
              (ye(e), (n = at.current));
              var u = e.type;
              if (t !== null && e.stateNode != null)
                t.memoizedProps !== r && Fn(e);
              else {
                if (!r) {
                  if (e.stateNode === null) throw Error(o(166));
                  return (Gt(e), null);
                }
                ((t = $.current),
                  Ml(e)
                    ? Oc(e)
                    : ((t = fp(u, r, n)), (e.stateNode = t), Fn(e)));
              }
              return (Gt(e), null);
            case 5:
              if ((ye(e), (n = e.type), t !== null && e.stateNode != null))
                t.memoizedProps !== r && Fn(e);
              else {
                if (!r) {
                  if (e.stateNode === null) throw Error(o(166));
                  return (Gt(e), null);
                }
                if (((t = $.current), Ml(e))) Oc(e);
                else {
                  switch (((u = $i(at.current)), t)) {
                    case 1:
                      t = u.createElementNS("http://www.w3.org/2000/svg", n);
                      break;
                    case 2:
                      t = u.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        n,
                      );
                      break;
                    default:
                      switch (n) {
                        case "svg":
                          t = u.createElementNS(
                            "http://www.w3.org/2000/svg",
                            n,
                          );
                          break;
                        case "math":
                          t = u.createElementNS(
                            "http://www.w3.org/1998/Math/MathML",
                            n,
                          );
                          break;
                        case "script":
                          ((t = u.createElement("div")),
                            (t.innerHTML = "<script><\/script>"),
                            (t = t.removeChild(t.firstChild)));
                          break;
                        case "select":
                          ((t =
                            typeof r.is == "string"
                              ? u.createElement("select", { is: r.is })
                              : u.createElement("select")),
                            r.multiple
                              ? (t.multiple = !0)
                              : r.size && (t.size = r.size));
                          break;
                        default:
                          t =
                            typeof r.is == "string"
                              ? u.createElement(n, { is: r.is })
                              : u.createElement(n);
                      }
                  }
                  ((t[oe] = e), (t[Ke] = r));
                  t: for (u = e.child; u !== null; ) {
                    if (u.tag === 5 || u.tag === 6) t.appendChild(u.stateNode);
                    else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                      ((u.child.return = u), (u = u.child));
                      continue;
                    }
                    if (u === e) break t;
                    for (; u.sibling === null; ) {
                      if (u.return === null || u.return === e) break t;
                      u = u.return;
                    }
                    ((u.sibling.return = u.return), (u = u.sibling));
                  }
                  e.stateNode = t;
                  t: switch ((le(t, n, r), n)) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      t = !!r.autoFocus;
                      break t;
                    case "img":
                      t = !0;
                      break t;
                    default:
                      t = !1;
                  }
                  t && Fn(e);
                }
              }
              return (Gt(e), (e.flags &= -16777217), null);
            case 6:
              if (t && e.stateNode != null) t.memoizedProps !== r && Fn(e);
              else {
                if (typeof r != "string" && e.stateNode === null)
                  throw Error(o(166));
                if (((t = at.current), Ml(e))) {
                  if (
                    ((t = e.stateNode),
                    (n = e.memoizedProps),
                    (r = null),
                    (u = qe),
                    u !== null)
                  )
                    switch (u.tag) {
                      case 27:
                      case 5:
                        r = u.memoizedProps;
                    }
                  ((t[oe] = e),
                    (t = !!(
                      t.nodeValue === n ||
                      (r !== null && r.suppressHydrationWarning === !0) ||
                      lp(t.nodeValue, n)
                    )),
                    t || da(e));
                } else
                  ((t = $i(t).createTextNode(r)),
                    (t[oe] = e),
                    (e.stateNode = t));
              }
              return (Gt(e), null);
            case 13:
              if (
                ((r = e.memoizedState),
                t === null ||
                  (t.memoizedState !== null &&
                    t.memoizedState.dehydrated !== null))
              ) {
                if (((u = Ml(e)), r !== null && r.dehydrated !== null)) {
                  if (t === null) {
                    if (!u) throw Error(o(318));
                    if (
                      ((u = e.memoizedState),
                      (u = u !== null ? u.dehydrated : null),
                      !u)
                    )
                      throw Error(o(317));
                    u[oe] = e;
                  } else
                    (Ol(),
                      (e.flags & 128) === 0 && (e.memoizedState = null),
                      (e.flags |= 4));
                  (Gt(e), (u = !1));
                } else
                  ((u = Jc()),
                    t !== null &&
                      t.memoizedState !== null &&
                      (t.memoizedState.hydrationErrors = u),
                    (u = !0));
                if (!u) return e.flags & 256 ? (mn(e), e) : (mn(e), null);
              }
              if ((mn(e), (e.flags & 128) !== 0)) return ((e.lanes = n), e);
              if (
                ((n = r !== null),
                (t = t !== null && t.memoizedState !== null),
                n)
              ) {
                ((r = e.child),
                  (u = null),
                  r.alternate !== null &&
                    r.alternate.memoizedState !== null &&
                    r.alternate.memoizedState.cachePool !== null &&
                    (u = r.alternate.memoizedState.cachePool.pool));
                var V = null;
                (r.memoizedState !== null &&
                  r.memoizedState.cachePool !== null &&
                  (V = r.memoizedState.cachePool.pool),
                  V !== u && (r.flags |= 2048));
              }
              return (
                n !== t && n && (e.child.flags |= 8192),
                Mi(e, e.updateQueue),
                Gt(e),
                null
              );
            case 4:
              return (
                Ot(),
                t === null && Gs(e.stateNode.containerInfo),
                Gt(e),
                null
              );
            case 10:
              return (vn(e.type), Gt(e), null);
            case 19:
              if ((D(wt), (u = e.memoizedState), u === null))
                return (Gt(e), null);
              if (((r = (e.flags & 128) !== 0), (V = u.rendering), V === null))
                if (r) ar(u, !1);
                else {
                  if (Jt !== 0 || (t !== null && (t.flags & 128) !== 0))
                    for (t = e.child; t !== null; ) {
                      if (((V = xi(t)), V !== null)) {
                        for (
                          e.flags |= 128,
                            ar(u, !1),
                            t = V.updateQueue,
                            e.updateQueue = t,
                            Mi(e, t),
                            e.subtreeFlags = 0,
                            t = n,
                            n = e.child;
                          n !== null;
                        )
                          (Yc(n, t), (n = n.sibling));
                        return (j(wt, (wt.current & 1) | 2), e.child);
                      }
                      t = t.sibling;
                    }
                  u.tail !== null &&
                    ge() > Ji &&
                    ((e.flags |= 128),
                    (r = !0),
                    ar(u, !1),
                    (e.lanes = 4194304));
                }
              else {
                if (!r)
                  if (((t = xi(V)), t !== null)) {
                    if (
                      ((e.flags |= 128),
                      (r = !0),
                      (t = t.updateQueue),
                      (e.updateQueue = t),
                      Mi(e, t),
                      ar(u, !0),
                      u.tail === null &&
                        u.tailMode === "hidden" &&
                        !V.alternate &&
                        !Wt)
                    )
                      return (Gt(e), null);
                  } else
                    2 * ge() - u.renderingStartTime > Ji &&
                      n !== 536870912 &&
                      ((e.flags |= 128),
                      (r = !0),
                      ar(u, !1),
                      (e.lanes = 4194304));
                u.isBackwards
                  ? ((V.sibling = e.child), (e.child = V))
                  : ((t = u.last),
                    t !== null ? (t.sibling = V) : (e.child = V),
                    (u.last = V));
              }
              return u.tail !== null
                ? ((e = u.tail),
                  (u.rendering = e),
                  (u.tail = e.sibling),
                  (u.renderingStartTime = ge()),
                  (e.sibling = null),
                  (t = wt.current),
                  j(wt, r ? (t & 1) | 2 : t & 1),
                  e)
                : (Gt(e), null);
            case 22:
            case 23:
              return (
                mn(e),
                Yu(),
                (r = e.memoizedState !== null),
                t !== null
                  ? (t.memoizedState !== null) !== r && (e.flags |= 8192)
                  : r && (e.flags |= 8192),
                r
                  ? (n & 536870912) !== 0 &&
                    (e.flags & 128) === 0 &&
                    (Gt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
                  : Gt(e),
                (n = e.updateQueue),
                n !== null && Mi(e, n.retryQueue),
                (n = null),
                t !== null &&
                  t.memoizedState !== null &&
                  t.memoizedState.cachePool !== null &&
                  (n = t.memoizedState.cachePool.pool),
                (r = null),
                e.memoizedState !== null &&
                  e.memoizedState.cachePool !== null &&
                  (r = e.memoizedState.cachePool.pool),
                r !== n && (e.flags |= 2048),
                t !== null && D(va),
                null
              );
            case 24:
              return (
                (n = null),
                t !== null && (n = t.memoizedState.cache),
                e.memoizedState.cache !== n && (e.flags |= 2048),
                vn(Lt),
                Gt(e),
                null
              );
            case 25:
              return null;
            case 30:
              return null;
          }
          throw Error(o(156, e.tag));
        }
        function Q7(t, e) {
          switch ((Xu(e), e.tag)) {
            case 1:
              return (
                (t = e.flags),
                t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
              );
            case 3:
              return (
                vn(Lt),
                Ot(),
                (t = e.flags),
                (t & 65536) !== 0 && (t & 128) === 0
                  ? ((e.flags = (t & -65537) | 128), e)
                  : null
              );
            case 26:
            case 27:
            case 5:
              return (ye(e), null);
            case 13:
              if (
                (mn(e),
                (t = e.memoizedState),
                t !== null && t.dehydrated !== null)
              ) {
                if (e.alternate === null) throw Error(o(340));
                Ol();
              }
              return (
                (t = e.flags),
                t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
              );
            case 19:
              return (D(wt), null);
            case 4:
              return (Ot(), null);
            case 10:
              return (vn(e.type), null);
            case 22:
            case 23:
              return (
                mn(e),
                Yu(),
                t !== null && D(va),
                (t = e.flags),
                t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
              );
            case 24:
              return (vn(Lt), null);
            case 25:
              return null;
            default:
              return null;
          }
        }
        function cd(t, e) {
          switch ((Xu(e), e.tag)) {
            case 3:
              (vn(Lt), Ot());
              break;
            case 26:
            case 27:
            case 5:
              ye(e);
              break;
            case 4:
              Ot();
              break;
            case 13:
              mn(e);
              break;
            case 19:
              D(wt);
              break;
            case 10:
              vn(e.type);
              break;
            case 22:
            case 23:
              (mn(e), Yu(), t !== null && D(va));
              break;
            case 24:
              vn(Lt);
          }
        }
        function lr(t, e) {
          try {
            var n = e.updateQueue,
              r = n !== null ? n.lastEffect : null;
            if (r !== null) {
              var u = r.next;
              n = u;
              do {
                if ((n.tag & t) === t) {
                  r = void 0;
                  var V = n.create,
                    K = n.inst;
                  ((r = V()), (K.destroy = r));
                }
                n = n.next;
              } while (n !== u);
            }
          } catch (U) {
            Zt(e, e.return, U);
          }
        }
        function On(t, e, n) {
          try {
            var r = e.updateQueue,
              u = r !== null ? r.lastEffect : null;
            if (u !== null) {
              var V = u.next;
              r = V;
              do {
                if ((r.tag & t) === t) {
                  var K = r.inst,
                    U = K.destroy;
                  if (U !== void 0) {
                    ((K.destroy = void 0), (u = e));
                    var F = n,
                      Q = U;
                    try {
                      Q();
                    } catch (E) {
                      Zt(u, F, E);
                    }
                  }
                }
                r = r.next;
              } while (r !== V);
            }
          } catch (E) {
            Zt(e, e.return, E);
          }
        }
        function qd(t) {
          var e = t.updateQueue;
          if (e !== null) {
            var n = t.stateNode;
            try {
              tq(e, n);
            } catch (r) {
              Zt(t, t.return, r);
            }
          }
        }
        function dd(t, e, n) {
          ((n.props = ma(t.type, t.memoizedProps)),
            (n.state = t.memoizedState));
          try {
            n.componentWillUnmount();
          } catch (r) {
            Zt(t, e, r);
          }
        }
        function rr(t, e) {
          try {
            var n = t.ref;
            if (n !== null) {
              switch (t.tag) {
                case 26:
                case 27:
                case 5:
                  var r = t.stateNode;
                  break;
                case 30:
                  r = t.stateNode;
                  break;
                default:
                  r = t.stateNode;
              }
              typeof n == "function" ? (t.refCleanup = n(r)) : (n.current = r);
            }
          } catch (u) {
            Zt(t, e, u);
          }
        }
        function en(t, e) {
          var n = t.ref,
            r = t.refCleanup;
          if (n !== null)
            if (typeof r == "function")
              try {
                r();
              } catch (u) {
                Zt(t, e, u);
              } finally {
                ((t.refCleanup = null),
                  (t = t.alternate),
                  t != null && (t.refCleanup = null));
              }
            else if (typeof n == "function")
              try {
                n(null);
              } catch (u) {
                Zt(t, e, u);
              }
            else n.current = null;
        }
        function pd(t) {
          var e = t.type,
            n = t.memoizedProps,
            r = t.stateNode;
          try {
            t: switch (e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n.autoFocus && r.focus();
                break t;
              case "img":
                n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
            }
          } catch (u) {
            Zt(t, t.return, u);
          }
        }
        function qs(t, e, n) {
          try {
            var r = t.stateNode;
            (w7(r, t.type, n, e), (r[Ke] = e));
          } catch (u) {
            Zt(t, t.return, u);
          }
        }
        function Kd(t) {
          return (
            t.tag === 5 ||
            t.tag === 3 ||
            t.tag === 26 ||
            (t.tag === 27 && Dn(t.type)) ||
            t.tag === 4
          );
        }
        function ds(t) {
          t: for (;;) {
            for (; t.sibling === null; ) {
              if (t.return === null || Kd(t.return)) return null;
              t = t.return;
            }
            for (
              t.sibling.return = t.return, t = t.sibling;
              t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
            ) {
              if (
                (t.tag === 27 && Dn(t.type)) ||
                t.flags & 2 ||
                t.child === null ||
                t.tag === 4
              )
                continue t;
              ((t.child.return = t), (t = t.child));
            }
            if (!(t.flags & 2)) return t.stateNode;
          }
        }
        function ps(t, e, n) {
          var r = t.tag;
          if (r === 5 || r === 6)
            ((t = t.stateNode),
              e
                ? (n.nodeType === 9
                    ? n.body
                    : n.nodeName === "HTML"
                      ? n.ownerDocument.body
                      : n
                  ).insertBefore(t, e)
                : ((e =
                    n.nodeType === 9
                      ? n.body
                      : n.nodeName === "HTML"
                        ? n.ownerDocument.body
                        : n),
                  e.appendChild(t),
                  (n = n._reactRootContainer),
                  n != null || e.onclick !== null || (e.onclick = _i)));
          else if (
            r !== 4 &&
            (r === 27 && Dn(t.type) && ((n = t.stateNode), (e = null)),
            (t = t.child),
            t !== null)
          )
            for (ps(t, e, n), t = t.sibling; t !== null; )
              (ps(t, e, n), (t = t.sibling));
        }
        function Oi(t, e, n) {
          var r = t.tag;
          if (r === 5 || r === 6)
            ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t));
          else if (
            r !== 4 &&
            (r === 27 && Dn(t.type) && (n = t.stateNode),
            (t = t.child),
            t !== null)
          )
            for (Oi(t, e, n), t = t.sibling; t !== null; )
              (Oi(t, e, n), (t = t.sibling));
        }
        function vd(t) {
          var e = t.stateNode,
            n = t.memoizedProps;
          try {
            for (var r = t.type, u = e.attributes; u.length; )
              e.removeAttributeNode(u[0]);
            (le(e, r, n), (e[oe] = t), (e[Ke] = n));
          } catch (V) {
            Zt(t, t.return, V);
          }
        }
        var yn = !1,
          Ht = !1,
          Ks = !1,
          Ud = typeof WeakSet == "function" ? WeakSet : Set,
          te = null;
        function b7(t, e) {
          if (((t = t.containerInfo), (Ms = ro), (t = Cc(t)), du(t))) {
            if ("selectionStart" in t)
              var n = { start: t.selectionStart, end: t.selectionEnd };
            else
              t: {
                n = ((n = t.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                  n = r.anchorNode;
                  var u = r.anchorOffset,
                    V = r.focusNode;
                  r = r.focusOffset;
                  try {
                    (n.nodeType, V.nodeType);
                  } catch {
                    n = null;
                    break t;
                  }
                  var K = 0,
                    U = -1,
                    F = -1,
                    Q = 0,
                    E = 0,
                    O = t,
                    B = null;
                  e: for (;;) {
                    for (
                      var R;
                      O !== n || (u !== 0 && O.nodeType !== 3) || (U = K + u),
                        O !== V || (r !== 0 && O.nodeType !== 3) || (F = K + r),
                        O.nodeType === 3 && (K += O.nodeValue.length),
                        (R = O.firstChild) !== null;
                    )
                      ((B = O), (O = R));
                    for (;;) {
                      if (O === t) break e;
                      if (
                        (B === n && ++Q === u && (U = K),
                        B === V && ++E === r && (F = K),
                        (R = O.nextSibling) !== null)
                      )
                        break;
                      ((O = B), (B = O.parentNode));
                    }
                    O = R;
                  }
                  n = U === -1 || F === -1 ? null : { start: U, end: F };
                } else n = null;
              }
            n = n || { start: 0, end: 0 };
          } else n = null;
          for (
            Os = { focusedElem: t, selectionRange: n }, ro = !1, te = e;
            te !== null;
          )
            if (
              ((e = te),
              (t = e.child),
              (e.subtreeFlags & 1024) !== 0 && t !== null)
            )
              ((t.return = e), (te = t));
            else
              for (; te !== null; ) {
                switch (((e = te), (V = e.alternate), (t = e.flags), e.tag)) {
                  case 0:
                    break;
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if ((t & 1024) !== 0 && V !== null) {
                      ((t = void 0),
                        (n = e),
                        (u = V.memoizedProps),
                        (V = V.memoizedState),
                        (r = n.stateNode));
                      try {
                        var ut = ma(n.type, u, n.elementType === n.type);
                        ((t = r.getSnapshotBeforeUpdate(ut, V)),
                          (r.__reactInternalSnapshotBeforeUpdate = t));
                      } catch (it) {
                        Zt(n, n.return, it);
                      }
                    }
                    break;
                  case 3:
                    if ((t & 1024) !== 0) {
                      if (
                        ((t = e.stateNode.containerInfo),
                        (n = t.nodeType),
                        n === 9)
                      )
                        Ps(t);
                      else if (n === 1)
                        switch (t.nodeName) {
                          case "HEAD":
                          case "HTML":
                          case "BODY":
                            Ps(t);
                            break;
                          default:
                            t.textContent = "";
                        }
                    }
                    break;
                  case 5:
                  case 26:
                  case 27:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    if ((t & 1024) !== 0) throw Error(o(163));
                }
                if (((t = e.sibling), t !== null)) {
                  ((t.return = e.return), (te = t));
                  break;
                }
                te = e.return;
              }
        }
        function md(t, e, n) {
          var r = n.flags;
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              (Nn(t, n), r & 4 && lr(5, n));
              break;
            case 1:
              if ((Nn(t, n), r & 4))
                if (((t = n.stateNode), e === null))
                  try {
                    t.componentDidMount();
                  } catch (K) {
                    Zt(n, n.return, K);
                  }
                else {
                  var u = ma(n.type, e.memoizedProps);
                  e = e.memoizedState;
                  try {
                    t.componentDidUpdate(
                      u,
                      e,
                      t.__reactInternalSnapshotBeforeUpdate,
                    );
                  } catch (K) {
                    Zt(n, n.return, K);
                  }
                }
              (r & 64 && qd(n), r & 512 && rr(n, n.return));
              break;
            case 3:
              if ((Nn(t, n), r & 64 && ((t = n.updateQueue), t !== null))) {
                if (((e = null), n.child !== null))
                  switch (n.child.tag) {
                    case 27:
                    case 5:
                      e = n.child.stateNode;
                      break;
                    case 1:
                      e = n.child.stateNode;
                  }
                try {
                  tq(t, e);
                } catch (K) {
                  Zt(n, n.return, K);
                }
              }
              break;
            case 27:
              e === null && r & 4 && vd(n);
            case 26:
            case 5:
              (Nn(t, n),
                e === null && r & 4 && pd(n),
                r & 512 && rr(n, n.return));
              break;
            case 12:
              Nn(t, n);
              break;
            case 13:
              (Nn(t, n),
                r & 4 && yd(t, n),
                r & 64 &&
                  ((t = n.memoizedState),
                  t !== null &&
                    ((t = t.dehydrated),
                    t !== null && ((n = M7.bind(null, n)), l1(t, n)))));
              break;
            case 22:
              if (((r = n.memoizedState !== null || yn), !r)) {
                ((e = (e !== null && e.memoizedState !== null) || Ht),
                  (u = yn));
                var V = Ht;
                ((yn = r),
                  (Ht = e) && !V
                    ? Jn(t, n, (n.subtreeFlags & 8772) !== 0)
                    : Nn(t, n),
                  (yn = u),
                  (Ht = V));
              }
              break;
            case 30:
              break;
            default:
              Nn(t, n);
          }
        }
        function hd(t) {
          var e = t.alternate;
          (e !== null && ((t.alternate = null), hd(e)),
            (t.child = null),
            (t.deletions = null),
            (t.sibling = null),
            t.tag === 5 && ((e = t.stateNode), e !== null && Do(e)),
            (t.stateNode = null),
            (t.return = null),
            (t.dependencies = null),
            (t.memoizedProps = null),
            (t.memoizedState = null),
            (t.pendingProps = null),
            (t.stateNode = null),
            (t.updateQueue = null));
        }
        var Tt = null,
          me = !1;
        function An(t, e, n) {
          for (n = n.child; n !== null; ) (Fd(t, e, n), (n = n.sibling));
        }
        function Fd(t, e, n) {
          if (Xe && typeof Xe.onCommitFiberUnmount == "function")
            try {
              Xe.onCommitFiberUnmount(Wl, n);
            } catch {}
          switch (n.tag) {
            case 26:
              (Ht || en(n, e),
                An(t, e, n),
                n.memoizedState
                  ? n.memoizedState.count--
                  : n.stateNode &&
                    ((n = n.stateNode), n.parentNode.removeChild(n)));
              break;
            case 27:
              Ht || en(n, e);
              var r = Tt,
                u = me;
              (Dn(n.type) && ((Tt = n.stateNode), (me = !1)),
                An(t, e, n),
                dr(n.stateNode),
                (Tt = r),
                (me = u));
              break;
            case 5:
              Ht || en(n, e);
            case 6:
              if (
                ((r = Tt),
                (u = me),
                (Tt = null),
                An(t, e, n),
                (Tt = r),
                (me = u),
                Tt !== null)
              )
                if (me)
                  try {
                    (Tt.nodeType === 9
                      ? Tt.body
                      : Tt.nodeName === "HTML"
                        ? Tt.ownerDocument.body
                        : Tt
                    ).removeChild(n.stateNode);
                  } catch (V) {
                    Zt(n, e, V);
                  }
                else
                  try {
                    Tt.removeChild(n.stateNode);
                  } catch (V) {
                    Zt(n, e, V);
                  }
              break;
            case 18:
              Tt !== null &&
                (me
                  ? ((t = Tt),
                    sp(
                      t.nodeType === 9
                        ? t.body
                        : t.nodeName === "HTML"
                          ? t.ownerDocument.body
                          : t,
                      n.stateNode,
                    ),
                    yr(t))
                  : sp(Tt, n.stateNode));
              break;
            case 4:
              ((r = Tt),
                (u = me),
                (Tt = n.stateNode.containerInfo),
                (me = !0),
                An(t, e, n),
                (Tt = r),
                (me = u));
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              (Ht || On(2, n, e), Ht || On(4, n, e), An(t, e, n));
              break;
            case 1:
              (Ht ||
                (en(n, e),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function" && dd(n, e, r)),
                An(t, e, n));
              break;
            case 21:
              An(t, e, n);
              break;
            case 22:
              ((Ht = (r = Ht) || n.memoizedState !== null),
                An(t, e, n),
                (Ht = r));
              break;
            default:
              An(t, e, n);
          }
        }
        function yd(t, e) {
          if (
            e.memoizedState === null &&
            ((t = e.alternate),
            t !== null &&
              ((t = t.memoizedState),
              t !== null && ((t = t.dehydrated), t !== null)))
          )
            try {
              yr(t);
            } catch (n) {
              Zt(e, e.return, n);
            }
        }
        function B7(t) {
          switch (t.tag) {
            case 13:
            case 19:
              var e = t.stateNode;
              return (e === null && (e = t.stateNode = new Ud()), e);
            case 22:
              return (
                (t = t.stateNode),
                (e = t._retryCache),
                e === null && (e = t._retryCache = new Ud()),
                e
              );
            default:
              throw Error(o(435, t.tag));
          }
        }
        function vs(t, e) {
          var n = B7(t);
          e.forEach(function (r) {
            var u = O7.bind(null, t, r);
            n.has(r) || (n.add(r), r.then(u, u));
          });
        }
        function Ce(t, e) {
          var n = e.deletions;
          if (n !== null)
            for (var r = 0; r < n.length; r++) {
              var u = n[r],
                V = t,
                K = e,
                U = K;
              t: for (; U !== null; ) {
                switch (U.tag) {
                  case 27:
                    if (Dn(U.type)) {
                      ((Tt = U.stateNode), (me = !1));
                      break t;
                    }
                    break;
                  case 5:
                    ((Tt = U.stateNode), (me = !1));
                    break t;
                  case 3:
                  case 4:
                    ((Tt = U.stateNode.containerInfo), (me = !0));
                    break t;
                }
                U = U.return;
              }
              if (Tt === null) throw Error(o(160));
              (Fd(V, K, u),
                (Tt = null),
                (me = !1),
                (V = u.alternate),
                V !== null && (V.return = null),
                (u.return = null));
            }
          if (e.subtreeFlags & 13878)
            for (e = e.child; e !== null; ) (Ad(e, t), (e = e.sibling));
        }
        var Ie = null;
        function Ad(t, e) {
          var n = t.alternate,
            r = t.flags;
          switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              (Ce(e, t),
                Qe(t),
                r & 4 && (On(3, t, t.return), lr(3, t), On(5, t, t.return)));
              break;
            case 1:
              (Ce(e, t),
                Qe(t),
                r & 512 && (Ht || n === null || en(n, n.return)),
                r & 64 &&
                  yn &&
                  ((t = t.updateQueue),
                  t !== null &&
                    ((r = t.callbacks),
                    r !== null &&
                      ((n = t.shared.hiddenCallbacks),
                      (t.shared.hiddenCallbacks =
                        n === null ? r : n.concat(r))))));
              break;
            case 26:
              var u = Ie;
              if (
                (Ce(e, t),
                Qe(t),
                r & 512 && (Ht || n === null || en(n, n.return)),
                r & 4)
              ) {
                var V = n !== null ? n.memoizedState : null;
                if (((r = t.memoizedState), n === null))
                  if (r === null)
                    if (t.stateNode === null) {
                      t: {
                        ((r = t.type),
                          (n = t.memoizedProps),
                          (u = u.ownerDocument || u));
                        e: switch (r) {
                          case "title":
                            ((V = u.getElementsByTagName("title")[0]),
                              (!V ||
                                V[Cl] ||
                                V[oe] ||
                                V.namespaceURI ===
                                  "http://www.w3.org/2000/svg" ||
                                V.hasAttribute("itemprop")) &&
                                ((V = u.createElement(r)),
                                u.head.insertBefore(
                                  V,
                                  u.querySelector("head > title"),
                                )),
                              le(V, r, n),
                              (V[oe] = t),
                              _t(V),
                              (r = V));
                            break t;
                          case "link":
                            var K = vp("link", "href", u).get(
                              r + (n.href || ""),
                            );
                            if (K) {
                              for (var U = 0; U < K.length; U++)
                                if (
                                  ((V = K[U]),
                                  V.getAttribute("href") ===
                                    (n.href == null || n.href === ""
                                      ? null
                                      : n.href) &&
                                    V.getAttribute("rel") ===
                                      (n.rel == null ? null : n.rel) &&
                                    V.getAttribute("title") ===
                                      (n.title == null ? null : n.title) &&
                                    V.getAttribute("crossorigin") ===
                                      (n.crossOrigin == null
                                        ? null
                                        : n.crossOrigin))
                                ) {
                                  K.splice(U, 1);
                                  break e;
                                }
                            }
                            ((V = u.createElement(r)),
                              le(V, r, n),
                              u.head.appendChild(V));
                            break;
                          case "meta":
                            if (
                              (K = vp("meta", "content", u).get(
                                r + (n.content || ""),
                              ))
                            ) {
                              for (U = 0; U < K.length; U++)
                                if (
                                  ((V = K[U]),
                                  V.getAttribute("content") ===
                                    (n.content == null
                                      ? null
                                      : "" + n.content) &&
                                    V.getAttribute("name") ===
                                      (n.name == null ? null : n.name) &&
                                    V.getAttribute("property") ===
                                      (n.property == null
                                        ? null
                                        : n.property) &&
                                    V.getAttribute("http-equiv") ===
                                      (n.httpEquiv == null
                                        ? null
                                        : n.httpEquiv) &&
                                    V.getAttribute("charset") ===
                                      (n.charSet == null ? null : n.charSet))
                                ) {
                                  K.splice(U, 1);
                                  break e;
                                }
                            }
                            ((V = u.createElement(r)),
                              le(V, r, n),
                              u.head.appendChild(V));
                            break;
                          default:
                            throw Error(o(468, r));
                        }
                        ((V[oe] = t), _t(V), (r = V));
                      }
                      t.stateNode = r;
                    } else Up(u, t.type, t.stateNode);
                  else t.stateNode = Kp(u, r, t.memoizedProps);
                else
                  V !== r
                    ? (V === null
                        ? n.stateNode !== null &&
                          ((n = n.stateNode), n.parentNode.removeChild(n))
                        : V.count--,
                      r === null
                        ? Up(u, t.type, t.stateNode)
                        : Kp(u, r, t.memoizedProps))
                    : r === null &&
                      t.stateNode !== null &&
                      qs(t, t.memoizedProps, n.memoizedProps);
              }
              break;
            case 27:
              (Ce(e, t),
                Qe(t),
                r & 512 && (Ht || n === null || en(n, n.return)),
                n !== null && r & 4 && qs(t, t.memoizedProps, n.memoizedProps));
              break;
            case 5:
              if (
                (Ce(e, t),
                Qe(t),
                r & 512 && (Ht || n === null || en(n, n.return)),
                t.flags & 32)
              ) {
                u = t.stateNode;
                try {
                  Ta(u, "");
                } catch (R) {
                  Zt(t, t.return, R);
                }
              }
              (r & 4 &&
                t.stateNode != null &&
                ((u = t.memoizedProps),
                qs(t, u, n !== null ? n.memoizedProps : u)),
                r & 1024 && (Ks = !0));
              break;
            case 6:
              if ((Ce(e, t), Qe(t), r & 4)) {
                if (t.stateNode === null) throw Error(o(162));
                ((r = t.memoizedProps), (n = t.stateNode));
                try {
                  n.nodeValue = r;
                } catch (R) {
                  Zt(t, t.return, R);
                }
              }
              break;
            case 3:
              if (
                ((no = null),
                (u = Ie),
                (Ie = to(e.containerInfo)),
                Ce(e, t),
                (Ie = u),
                Qe(t),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
              )
                try {
                  yr(e.containerInfo);
                } catch (R) {
                  Zt(t, t.return, R);
                }
              Ks && ((Ks = !1), gd(t));
              break;
            case 4:
              ((r = Ie),
                (Ie = to(t.stateNode.containerInfo)),
                Ce(e, t),
                Qe(t),
                (Ie = r));
              break;
            case 12:
              (Ce(e, t), Qe(t));
              break;
            case 13:
              (Ce(e, t),
                Qe(t),
                t.child.flags & 8192 &&
                  (t.memoizedState !== null) !=
                    (n !== null && n.memoizedState !== null) &&
                  (As = ge()),
                r & 4 &&
                  ((r = t.updateQueue),
                  r !== null && ((t.updateQueue = null), vs(t, r))));
              break;
            case 22:
              u = t.memoizedState !== null;
              var F = n !== null && n.memoizedState !== null,
                Q = yn,
                E = Ht;
              if (
                ((yn = Q || u),
                (Ht = E || F),
                Ce(e, t),
                (Ht = E),
                (yn = Q),
                Qe(t),
                r & 8192)
              )
                t: for (
                  e = t.stateNode,
                    e._visibility = u ? e._visibility & -2 : e._visibility | 1,
                    u && (n === null || F || yn || Ht || ha(t)),
                    n = null,
                    e = t;
                  ;
                ) {
                  if (e.tag === 5 || e.tag === 26) {
                    if (n === null) {
                      F = n = e;
                      try {
                        if (((V = F.stateNode), u))
                          ((K = V.style),
                            typeof K.setProperty == "function"
                              ? K.setProperty("display", "none", "important")
                              : (K.display = "none"));
                        else {
                          U = F.stateNode;
                          var O = F.memoizedProps.style,
                            B =
                              O != null && O.hasOwnProperty("display")
                                ? O.display
                                : null;
                          U.style.display =
                            B == null || typeof B == "boolean"
                              ? ""
                              : ("" + B).trim();
                        }
                      } catch (R) {
                        Zt(F, F.return, R);
                      }
                    }
                  } else if (e.tag === 6) {
                    if (n === null) {
                      F = e;
                      try {
                        F.stateNode.nodeValue = u ? "" : F.memoizedProps;
                      } catch (R) {
                        Zt(F, F.return, R);
                      }
                    }
                  } else if (
                    ((e.tag !== 22 && e.tag !== 23) ||
                      e.memoizedState === null ||
                      e === t) &&
                    e.child !== null
                  ) {
                    ((e.child.return = e), (e = e.child));
                    continue;
                  }
                  if (e === t) break t;
                  for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break t;
                    (n === e && (n = null), (e = e.return));
                  }
                  (n === e && (n = null),
                    (e.sibling.return = e.return),
                    (e = e.sibling));
                }
              r & 4 &&
                ((r = t.updateQueue),
                r !== null &&
                  ((n = r.retryQueue),
                  n !== null && ((r.retryQueue = null), vs(t, n))));
              break;
            case 19:
              (Ce(e, t),
                Qe(t),
                r & 4 &&
                  ((r = t.updateQueue),
                  r !== null && ((t.updateQueue = null), vs(t, r))));
              break;
            case 30:
              break;
            case 21:
              break;
            default:
              (Ce(e, t), Qe(t));
          }
        }
        function Qe(t) {
          var e = t.flags;
          if (e & 2) {
            try {
              for (var n, r = t.return; r !== null; ) {
                if (Kd(r)) {
                  n = r;
                  break;
                }
                r = r.return;
              }
              if (n == null) throw Error(o(160));
              switch (n.tag) {
                case 27:
                  var u = n.stateNode,
                    V = ds(t);
                  Oi(t, V, u);
                  break;
                case 5:
                  var K = n.stateNode;
                  n.flags & 32 && (Ta(K, ""), (n.flags &= -33));
                  var U = ds(t);
                  Oi(t, U, K);
                  break;
                case 3:
                case 4:
                  var F = n.stateNode.containerInfo,
                    Q = ds(t);
                  ps(t, Q, F);
                  break;
                default:
                  throw Error(o(161));
              }
            } catch (E) {
              Zt(t, t.return, E);
            }
            t.flags &= -3;
          }
          e & 4096 && (t.flags &= -4097);
        }
        function gd(t) {
          if (t.subtreeFlags & 1024)
            for (t = t.child; t !== null; ) {
              var e = t;
              (gd(e),
                e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
                (t = t.sibling));
            }
        }
        function Nn(t, e) {
          if (e.subtreeFlags & 8772)
            for (e = e.child; e !== null; )
              (md(t, e.alternate, e), (e = e.sibling));
        }
        function ha(t) {
          for (t = t.child; t !== null; ) {
            var e = t;
            switch (e.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                (On(4, e, e.return), ha(e));
                break;
              case 1:
                en(e, e.return);
                var n = e.stateNode;
                (typeof n.componentWillUnmount == "function" &&
                  dd(e, e.return, n),
                  ha(e));
                break;
              case 27:
                dr(e.stateNode);
              case 26:
              case 5:
                (en(e, e.return), ha(e));
                break;
              case 22:
                e.memoizedState === null && ha(e);
                break;
              case 30:
                ha(e);
                break;
              default:
                ha(e);
            }
            t = t.sibling;
          }
        }
        function Jn(t, e, n) {
          for (
            n = n && (e.subtreeFlags & 8772) !== 0, e = e.child;
            e !== null;
          ) {
            var r = e.alternate,
              u = t,
              V = e,
              K = V.flags;
            switch (V.tag) {
              case 0:
              case 11:
              case 15:
                (Jn(u, V, n), lr(4, V));
                break;
              case 1:
                if (
                  (Jn(u, V, n),
                  (r = V),
                  (u = r.stateNode),
                  typeof u.componentDidMount == "function")
                )
                  try {
                    u.componentDidMount();
                  } catch (Q) {
                    Zt(r, r.return, Q);
                  }
                if (((r = V), (u = r.updateQueue), u !== null)) {
                  var U = r.stateNode;
                  try {
                    var F = u.shared.hiddenCallbacks;
                    if (F !== null)
                      for (
                        u.shared.hiddenCallbacks = null, u = 0;
                        u < F.length;
                        u++
                      )
                        $c(F[u], U);
                  } catch (Q) {
                    Zt(r, r.return, Q);
                  }
                }
                (n && K & 64 && qd(V), rr(V, V.return));
                break;
              case 27:
                vd(V);
              case 26:
              case 5:
                (Jn(u, V, n),
                  n && r === null && K & 4 && pd(V),
                  rr(V, V.return));
                break;
              case 12:
                Jn(u, V, n);
                break;
              case 13:
                (Jn(u, V, n), n && K & 4 && yd(u, V));
                break;
              case 22:
                (V.memoizedState === null && Jn(u, V, n), rr(V, V.return));
                break;
              case 30:
                break;
              default:
                Jn(u, V, n);
            }
            e = e.sibling;
          }
        }
        function Us(t, e) {
          var n = null;
          (t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
            (t = null),
            e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (t = e.memoizedState.cachePool.pool),
            t !== n && (t != null && t.refCount++, n != null && Pl(n)));
        }
        function ms(t, e) {
          ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Pl(t)));
        }
        function nn(t, e, n, r) {
          if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null; ) (Xd(t, e, n, r), (e = e.sibling));
        }
        function Xd(t, e, n, r) {
          var u = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              (nn(t, e, n, r), u & 2048 && lr(9, e));
              break;
            case 1:
              nn(t, e, n, r);
              break;
            case 3:
              (nn(t, e, n, r),
                u & 2048 &&
                  ((t = null),
                  e.alternate !== null && (t = e.alternate.memoizedState.cache),
                  (e = e.memoizedState.cache),
                  e !== t && (e.refCount++, t != null && Pl(t))));
              break;
            case 12:
              if (u & 2048) {
                (nn(t, e, n, r), (t = e.stateNode));
                try {
                  var V = e.memoizedProps,
                    K = V.id,
                    U = V.onPostCommit;
                  typeof U == "function" &&
                    U(
                      K,
                      e.alternate === null ? "mount" : "update",
                      t.passiveEffectDuration,
                      -0,
                    );
                } catch (F) {
                  Zt(e, e.return, F);
                }
              } else nn(t, e, n, r);
              break;
            case 13:
              nn(t, e, n, r);
              break;
            case 23:
              break;
            case 22:
              ((V = e.stateNode),
                (K = e.alternate),
                e.memoizedState !== null
                  ? V._visibility & 2
                    ? nn(t, e, n, r)
                    : ir(t, e)
                  : V._visibility & 2
                    ? nn(t, e, n, r)
                    : ((V._visibility |= 2),
                      el(t, e, n, r, (e.subtreeFlags & 10256) !== 0)),
                u & 2048 && Us(K, e));
              break;
            case 24:
              (nn(t, e, n, r), u & 2048 && ms(e.alternate, e));
              break;
            default:
              nn(t, e, n, r);
          }
        }
        function el(t, e, n, r, u) {
          for (
            u = u && (e.subtreeFlags & 10256) !== 0, e = e.child;
            e !== null;
          ) {
            var V = t,
              K = e,
              U = n,
              F = r,
              Q = K.flags;
            switch (K.tag) {
              case 0:
              case 11:
              case 15:
                (el(V, K, U, F, u), lr(8, K));
                break;
              case 23:
                break;
              case 22:
                var E = K.stateNode;
                (K.memoizedState !== null
                  ? E._visibility & 2
                    ? el(V, K, U, F, u)
                    : ir(V, K)
                  : ((E._visibility |= 2), el(V, K, U, F, u)),
                  u && Q & 2048 && Us(K.alternate, K));
                break;
              case 24:
                (el(V, K, U, F, u), u && Q & 2048 && ms(K.alternate, K));
                break;
              default:
                el(V, K, U, F, u);
            }
            e = e.sibling;
          }
        }
        function ir(t, e) {
          if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null; ) {
              var n = t,
                r = e,
                u = r.flags;
              switch (r.tag) {
                case 22:
                  (ir(n, r), u & 2048 && Us(r.alternate, r));
                  break;
                case 24:
                  (ir(n, r), u & 2048 && ms(r.alternate, r));
                  break;
                default:
                  ir(n, r);
              }
              e = e.sibling;
            }
        }
        var or = 8192;
        function nl(t) {
          if (t.subtreeFlags & or)
            for (t = t.child; t !== null; ) (Wd(t), (t = t.sibling));
        }
        function Wd(t) {
          switch (t.tag) {
            case 26:
              (nl(t),
                t.flags & or &&
                  t.memoizedState !== null &&
                  v1(Ie, t.memoizedState, t.memoizedProps));
              break;
            case 5:
              nl(t);
              break;
            case 3:
            case 4:
              var e = Ie;
              ((Ie = to(t.stateNode.containerInfo)), nl(t), (Ie = e));
              break;
            case 22:
              t.memoizedState === null &&
                ((e = t.alternate),
                e !== null && e.memoizedState !== null
                  ? ((e = or), (or = 16777216), nl(t), (or = e))
                  : nl(t));
              break;
            default:
              nl(t);
          }
        }
        function Sd(t) {
          var e = t.alternate;
          if (e !== null && ((t = e.child), t !== null)) {
            e.child = null;
            do ((e = t.sibling), (t.sibling = null), (t = e));
            while (t !== null);
          }
        }
        function ur(t) {
          var e = t.deletions;
          if ((t.flags & 16) !== 0) {
            if (e !== null)
              for (var n = 0; n < e.length; n++) {
                var r = e[n];
                ((te = r), Cd(r, t));
              }
            Sd(t);
          }
          if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; ) (zd(t), (t = t.sibling));
        }
        function zd(t) {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              (ur(t), t.flags & 2048 && On(9, t, t.return));
              break;
            case 3:
              ur(t);
              break;
            case 12:
              ur(t);
              break;
            case 22:
              var e = t.stateNode;
              t.memoizedState !== null &&
              e._visibility & 2 &&
              (t.return === null || t.return.tag !== 13)
                ? ((e._visibility &= -3), Ni(t))
                : ur(t);
              break;
            default:
              ur(t);
          }
        }
        function Ni(t) {
          var e = t.deletions;
          if ((t.flags & 16) !== 0) {
            if (e !== null)
              for (var n = 0; n < e.length; n++) {
                var r = e[n];
                ((te = r), Cd(r, t));
              }
            Sd(t);
          }
          for (t = t.child; t !== null; ) {
            switch (((e = t), e.tag)) {
              case 0:
              case 11:
              case 15:
                (On(8, e, e.return), Ni(e));
                break;
              case 22:
                ((n = e.stateNode),
                  n._visibility & 2 && ((n._visibility &= -3), Ni(e)));
                break;
              default:
                Ni(e);
            }
            t = t.sibling;
          }
        }
        function Cd(t, e) {
          for (; te !== null; ) {
            var n = te;
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                On(8, n, e);
                break;
              case 23:
              case 22:
                if (
                  n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null
                ) {
                  var r = n.memoizedState.cachePool.pool;
                  r != null && r.refCount++;
                }
                break;
              case 24:
                Pl(n.memoizedState.cache);
            }
            if (((r = n.child), r !== null)) ((r.return = n), (te = r));
            else
              t: for (n = t; te !== null; ) {
                r = te;
                var u = r.sibling,
                  V = r.return;
                if ((hd(r), r === n)) {
                  te = null;
                  break t;
                }
                if (u !== null) {
                  ((u.return = V), (te = u));
                  break t;
                }
                te = V;
              }
          }
        }
        var R7 = {
            getCacheForType: function (t) {
              var e = ue(Lt),
                n = e.data.get(t);
              return (n === void 0 && ((n = t()), e.data.set(t, n)), n);
            },
          },
          Z7 = typeof WeakMap == "function" ? WeakMap : Map,
          St = 0,
          xt = null,
          mt = null,
          yt = 0,
          zt = 0,
          be = null,
          Pn = !1,
          al = !1,
          hs = !1,
          gn = 0,
          Jt = 0,
          kn = 0,
          Fa = 0,
          Fs = 0,
          Ne = 0,
          ll = 0,
          sr = null,
          he = null,
          ys = !1,
          As = 0,
          Ji = 1 / 0,
          Pi = null,
          Hn = null,
          ae = 0,
          jn = null,
          rl = null,
          il = 0,
          gs = 0,
          Xs = null,
          Qd = null,
          Vr = 0,
          Ws = null;
        function Be() {
          if ((St & 2) !== 0 && yt !== 0) return yt & -yt;
          if (T.T !== null) {
            var t = ja;
            return t !== 0 ? t : Rs();
          }
          return Hf();
        }
        function bd() {
          Ne === 0 && (Ne = (yt & 536870912) === 0 || Wt ? Nf() : 536870912);
          var t = Oe.current;
          return (t !== null && (t.flags |= 32), Ne);
        }
        function Re(t, e, n) {
          (((t === xt && (zt === 2 || zt === 9)) ||
            t.cancelPendingCommit !== null) &&
            (ol(t, 0), In(t, yt, Ne, !1)),
            zl(t, n),
            ((St & 2) === 0 || t !== xt) &&
              (t === xt &&
                ((St & 2) === 0 && (Fa |= n), Jt === 4 && In(t, yt, Ne, !1)),
              an(t)));
        }
        function Bd(t, e, n) {
          if ((St & 6) !== 0) throw Error(o(327));
          var r =
              (!n && (e & 124) === 0 && (e & t.expiredLanes) === 0) || Sl(t, e),
            u = r ? G7(t, e) : Cs(t, e, !0),
            V = r;
          do {
            if (u === 0) {
              al && !r && In(t, e, 0, !1);
              break;
            } else {
              if (((n = t.current.alternate), V && !x7(n))) {
                ((u = Cs(t, e, !1)), (V = !1));
                continue;
              }
              if (u === 2) {
                if (((V = e), t.errorRecoveryDisabledLanes & V)) var K = 0;
                else
                  ((K = t.pendingLanes & -536870913),
                    (K = K !== 0 ? K : K & 536870912 ? 536870912 : 0));
                if (K !== 0) {
                  e = K;
                  t: {
                    var U = t;
                    u = sr;
                    var F = U.current.memoizedState.isDehydrated;
                    if (
                      (F && (ol(U, K).flags |= 256),
                      (K = Cs(U, K, !1)),
                      K !== 2)
                    ) {
                      if (hs && !F) {
                        ((U.errorRecoveryDisabledLanes |= V),
                          (Fa |= V),
                          (u = 4));
                        break t;
                      }
                      ((V = he),
                        (he = u),
                        V !== null &&
                          (he === null ? (he = V) : he.push.apply(he, V)));
                    }
                    u = K;
                  }
                  if (((V = !1), u !== 2)) continue;
                }
              }
              if (u === 1) {
                (ol(t, 0), In(t, e, 0, !0));
                break;
              }
              t: {
                switch (((r = t), (V = u), V)) {
                  case 0:
                  case 1:
                    throw Error(o(345));
                  case 4:
                    if ((e & 4194048) !== e) break;
                  case 6:
                    In(r, e, Ne, !Pn);
                    break t;
                  case 2:
                    he = null;
                    break;
                  case 3:
                  case 5:
                    break;
                  default:
                    throw Error(o(329));
                }
                if ((e & 62914560) === e && ((u = As + 300 - ge()), 10 < u)) {
                  if ((In(r, e, Ne, !Pn), ei(r, 0, !0) !== 0)) break t;
                  r.timeoutHandle = op(
                    Rd.bind(
                      null,
                      r,
                      n,
                      he,
                      Pi,
                      ys,
                      e,
                      Ne,
                      Fa,
                      ll,
                      Pn,
                      V,
                      2,
                      -0,
                      0,
                    ),
                    u,
                  );
                  break t;
                }
                Rd(r, n, he, Pi, ys, e, Ne, Fa, ll, Pn, V, 0, -0, 0);
              }
            }
            break;
          } while (!0);
          an(t);
        }
        function Rd(t, e, n, r, u, V, K, U, F, Q, E, O, B, R) {
          if (
            ((t.timeoutHandle = -1),
            (O = e.subtreeFlags),
            (O & 8192 || (O & 16785408) === 16785408) &&
              ((vr = { stylesheets: null, count: 0, unsuspend: K1 }),
              Wd(e),
              (O = U1()),
              O !== null))
          ) {
            ((t.cancelPendingCommit = O(
              Md.bind(null, t, e, V, n, r, u, K, U, F, E, 1, B, R),
            )),
              In(t, V, K, !Q));
            return;
          }
          Md(t, e, V, n, r, u, K, U, F);
        }
        function x7(t) {
          for (var e = t; ; ) {
            var n = e.tag;
            if (
              (n === 0 || n === 11 || n === 15) &&
              e.flags & 16384 &&
              ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
            )
              for (var r = 0; r < n.length; r++) {
                var u = n[r],
                  V = u.getSnapshot;
                u = u.value;
                try {
                  if (!Se(V(), u)) return !1;
                } catch {
                  return !1;
                }
              }
            if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
              ((n.return = e), (e = n));
            else {
              if (e === t) break;
              for (; e.sibling === null; ) {
                if (e.return === null || e.return === t) return !0;
                e = e.return;
              }
              ((e.sibling.return = e.return), (e = e.sibling));
            }
          }
          return !0;
        }
        function In(t, e, n, r) {
          ((e &= ~Fs),
            (e &= ~Fa),
            (t.suspendedLanes |= e),
            (t.pingedLanes &= ~e),
            r && (t.warmLanes |= e),
            (r = t.expirationTimes));
          for (var u = e; 0 < u; ) {
            var V = 31 - We(u),
              K = 1 << V;
            ((r[V] = -1), (u &= ~K));
          }
          n !== 0 && Pf(t, n, e);
        }
        function ki() {
          return (St & 6) === 0 ? (fr(0), !1) : !0;
        }
        function Ss() {
          if (mt !== null) {
            if (zt === 0) var t = mt.return;
            else
              ((t = mt),
                (Kn = pa = null),
                Pu(t),
                ($a = null),
                (er = 0),
                (t = mt));
            for (; t !== null; ) (cd(t.alternate, t), (t = t.return));
            mt = null;
          }
        }
        function ol(t, e) {
          var n = t.timeoutHandle;
          (n !== -1 && ((t.timeoutHandle = -1), $7(n)),
            (n = t.cancelPendingCommit),
            n !== null && ((t.cancelPendingCommit = null), n()),
            Ss(),
            (xt = t),
            (mt = n = qn(t.current, null)),
            (yt = e),
            (zt = 0),
            (be = null),
            (Pn = !1),
            (al = Sl(t, e)),
            (hs = !1),
            (ll = Ne = Fs = Fa = kn = Jt = 0),
            (he = sr = null),
            (ys = !1),
            (e & 8) !== 0 && (e |= e & 32));
          var r = t.entangledLanes;
          if (r !== 0)
            for (t = t.entanglements, r &= e; 0 < r; ) {
              var u = 31 - We(r),
                V = 1 << u;
              ((e |= t[u]), (r &= ~V));
            }
          return ((gn = e), qi(), n);
        }
        function Zd(t, e) {
          ((vt = null),
            (T.H = Bi),
            e === Hl || e === yi
              ? ((e = wc()), (zt = 3))
              : e === Ic
                ? ((e = wc()), (zt = 4))
                : (zt =
                    e === _q
                      ? 8
                      : e !== null &&
                          typeof e == "object" &&
                          typeof e.then == "function"
                        ? 6
                        : 1),
            (be = e),
            mt === null && ((Jt = 1), Gi(t, Ge(e, t.current))));
        }
        function xd() {
          var t = T.H;
          return ((T.H = Bi), t === null ? Bi : t);
        }
        function Td() {
          var t = T.A;
          return ((T.A = R7), t);
        }
        function zs() {
          ((Jt = 4),
            Pn || ((yt & 4194048) !== yt && Oe.current !== null) || (al = !0),
            ((kn & 134217727) === 0 && (Fa & 134217727) === 0) ||
              xt === null ||
              In(xt, yt, Ne, !1));
        }
        function Cs(t, e, n) {
          var r = St;
          St |= 2;
          var u = xd(),
            V = Td();
          ((xt !== t || yt !== e) && ((Pi = null), ol(t, e)), (e = !1));
          var K = Jt;
          t: do
            try {
              if (zt !== 0 && mt !== null) {
                var U = mt,
                  F = be;
                switch (zt) {
                  case 8:
                    (Ss(), (K = 6));
                    break t;
                  case 3:
                  case 2:
                  case 9:
                  case 6:
                    Oe.current === null && (e = !0);
                    var Q = zt;
                    if (((zt = 0), (be = null), ul(t, U, F, Q), n && al)) {
                      K = 0;
                      break t;
                    }
                    break;
                  default:
                    ((Q = zt), (zt = 0), (be = null), ul(t, U, F, Q));
                }
              }
              (T7(), (K = Jt));
              break;
            } catch (E) {
              Zd(t, E);
            }
          while (!0);
          return (
            e && t.shellSuspendCounter++,
            (Kn = pa = null),
            (St = r),
            (T.H = u),
            (T.A = V),
            mt === null && ((xt = null), (yt = 0), qi()),
            K
          );
        }
        function T7() {
          for (; mt !== null; ) Gd(mt);
        }
        function G7(t, e) {
          var n = St;
          St |= 2;
          var r = xd(),
            u = Td();
          xt !== t || yt !== e
            ? ((Pi = null), (Ji = ge() + 500), ol(t, e))
            : (al = Sl(t, e));
          t: do
            try {
              if (zt !== 0 && mt !== null) {
                e = mt;
                var V = be;
                e: switch (zt) {
                  case 1:
                    ((zt = 0), (be = null), ul(t, e, V, 1));
                    break;
                  case 2:
                  case 9:
                    if (Dc(V)) {
                      ((zt = 0), (be = null), Ed(e));
                      break;
                    }
                    ((e = function () {
                      ((zt !== 2 && zt !== 9) || xt !== t || (zt = 7), an(t));
                    }),
                      V.then(e, e));
                    break t;
                  case 3:
                    zt = 7;
                    break t;
                  case 4:
                    zt = 5;
                    break t;
                  case 7:
                    Dc(V)
                      ? ((zt = 0), (be = null), Ed(e))
                      : ((zt = 0), (be = null), ul(t, e, V, 7));
                    break;
                  case 5:
                    var K = null;
                    switch (mt.tag) {
                      case 26:
                        K = mt.memoizedState;
                      case 5:
                      case 27:
                        var U = mt;
                        if (!K || mp(K)) {
                          ((zt = 0), (be = null));
                          var F = U.sibling;
                          if (F !== null) mt = F;
                          else {
                            var Q = U.return;
                            Q !== null ? ((mt = Q), Hi(Q)) : (mt = null);
                          }
                          break e;
                        }
                    }
                    ((zt = 0), (be = null), ul(t, e, V, 5));
                    break;
                  case 6:
                    ((zt = 0), (be = null), ul(t, e, V, 6));
                    break;
                  case 8:
                    (Ss(), (Jt = 6));
                    break t;
                  default:
                    throw Error(o(462));
                }
              }
              E7();
              break;
            } catch (E) {
              Zd(t, E);
            }
          while (!0);
          return (
            (Kn = pa = null),
            (T.H = r),
            (T.A = u),
            (St = n),
            mt !== null ? 0 : ((xt = null), (yt = 0), qi(), Jt)
          );
        }
        function E7() {
          for (; mt !== null && !ie(); ) Gd(mt);
        }
        function Gd(t) {
          var e = Vd(t.alternate, t, gn);
          ((t.memoizedProps = t.pendingProps), e === null ? Hi(t) : (mt = e));
        }
        function Ed(t) {
          var e = t,
            n = e.alternate;
          switch (e.tag) {
            case 15:
            case 0:
              e = ld(n, e, e.pendingProps, e.type, void 0, yt);
              break;
            case 11:
              e = ld(n, e, e.pendingProps, e.type.render, e.ref, yt);
              break;
            case 5:
              Pu(e);
            default:
              (cd(n, e), (e = mt = Yc(e, gn)), (e = Vd(n, e, gn)));
          }
          ((t.memoizedProps = t.pendingProps), e === null ? Hi(t) : (mt = e));
        }
        function ul(t, e, n, r) {
          ((Kn = pa = null), Pu(e), ($a = null), (er = 0));
          var u = e.return;
          try {
            if (S7(t, u, e, n, yt)) {
              ((Jt = 1), Gi(t, Ge(n, t.current)), (mt = null));
              return;
            }
          } catch (V) {
            if (u !== null) throw ((mt = u), V);
            ((Jt = 1), Gi(t, Ge(n, t.current)), (mt = null));
            return;
          }
          e.flags & 32768
            ? (Wt || r === 1
                ? (t = !0)
                : al || (yt & 536870912) !== 0
                  ? (t = !1)
                  : ((Pn = t = !0),
                    (r === 2 || r === 9 || r === 3 || r === 6) &&
                      ((r = Oe.current),
                      r !== null && r.tag === 13 && (r.flags |= 16384))),
              Yd(e, t))
            : Hi(e);
        }
        function Hi(t) {
          var e = t;
          do {
            if ((e.flags & 32768) !== 0) {
              Yd(e, Pn);
              return;
            }
            t = e.return;
            var n = C7(e.alternate, e, gn);
            if (n !== null) {
              mt = n;
              return;
            }
            if (((e = e.sibling), e !== null)) {
              mt = e;
              return;
            }
            mt = e = t;
          } while (e !== null);
          Jt === 0 && (Jt = 5);
        }
        function Yd(t, e) {
          do {
            var n = Q7(t.alternate, t);
            if (n !== null) {
              ((n.flags &= 32767), (mt = n));
              return;
            }
            if (
              ((n = t.return),
              n !== null &&
                ((n.flags |= 32768),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
              !e && ((t = t.sibling), t !== null))
            ) {
              mt = t;
              return;
            }
            mt = t = n;
          } while (t !== null);
          ((Jt = 6), (mt = null));
        }
        function Md(t, e, n, r, u, V, K, U, F) {
          t.cancelPendingCommit = null;
          do ji();
          while (ae !== 0);
          if ((St & 6) !== 0) throw Error(o(327));
          if (e !== null) {
            if (e === t.current) throw Error(o(177));
            if (
              ((V = e.lanes | e.childLanes),
              (V |= mu),
              K3(t, n, V, K, U, F),
              t === xt && ((mt = xt = null), (yt = 0)),
              (rl = e),
              (jn = t),
              (il = n),
              (gs = V),
              (Xs = u),
              (Qd = r),
              (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
                ? ((t.callbackNode = null),
                  (t.callbackPriority = 0),
                  N7(_r, function () {
                    return (kd(), null);
                  }))
                : ((t.callbackNode = null), (t.callbackPriority = 0)),
              (r = (e.flags & 13878) !== 0),
              (e.subtreeFlags & 13878) !== 0 || r)
            ) {
              ((r = T.T),
                (T.T = null),
                (u = P.p),
                (P.p = 2),
                (K = St),
                (St |= 4));
              try {
                b7(t, e, n);
              } finally {
                ((St = K), (P.p = u), (T.T = r));
              }
            }
            ((ae = 1), Od(), Nd(), Jd());
          }
        }
        function Od() {
          if (ae === 1) {
            ae = 0;
            var t = jn,
              e = rl,
              n = (e.flags & 13878) !== 0;
            if ((e.subtreeFlags & 13878) !== 0 || n) {
              ((n = T.T), (T.T = null));
              var r = P.p;
              P.p = 2;
              var u = St;
              St |= 4;
              try {
                Ad(e, t);
                var V = Os,
                  K = Cc(t.containerInfo),
                  U = V.focusedElem,
                  F = V.selectionRange;
                if (
                  K !== U &&
                  U &&
                  U.ownerDocument &&
                  zc(U.ownerDocument.documentElement, U)
                ) {
                  if (F !== null && du(U)) {
                    var Q = F.start,
                      E = F.end;
                    if ((E === void 0 && (E = Q), "selectionStart" in U))
                      ((U.selectionStart = Q),
                        (U.selectionEnd = Math.min(E, U.value.length)));
                    else {
                      var O = U.ownerDocument || document,
                        B = (O && O.defaultView) || window;
                      if (B.getSelection) {
                        var R = B.getSelection(),
                          ut = U.textContent.length,
                          it = Math.min(F.start, ut),
                          Bt = F.end === void 0 ? it : Math.min(F.end, ut);
                        !R.extend && it > Bt && ((K = Bt), (Bt = it), (it = K));
                        var S = Sc(U, it),
                          W = Sc(U, Bt);
                        if (
                          S &&
                          W &&
                          (R.rangeCount !== 1 ||
                            R.anchorNode !== S.node ||
                            R.anchorOffset !== S.offset ||
                            R.focusNode !== W.node ||
                            R.focusOffset !== W.offset)
                        ) {
                          var C = O.createRange();
                          (C.setStart(S.node, S.offset),
                            R.removeAllRanges(),
                            it > Bt
                              ? (R.addRange(C), R.extend(W.node, W.offset))
                              : (C.setEnd(W.node, W.offset), R.addRange(C)));
                        }
                      }
                    }
                  }
                  for (O = [], R = U; (R = R.parentNode); )
                    R.nodeType === 1 &&
                      O.push({
                        element: R,
                        left: R.scrollLeft,
                        top: R.scrollTop,
                      });
                  for (
                    typeof U.focus == "function" && U.focus(), U = 0;
                    U < O.length;
                    U++
                  ) {
                    var M = O[U];
                    ((M.element.scrollLeft = M.left),
                      (M.element.scrollTop = M.top));
                  }
                }
                ((ro = !!Ms), (Os = Ms = null));
              } finally {
                ((St = u), (P.p = r), (T.T = n));
              }
            }
            ((t.current = e), (ae = 2));
          }
        }
        function Nd() {
          if (ae === 2) {
            ae = 0;
            var t = jn,
              e = rl,
              n = (e.flags & 8772) !== 0;
            if ((e.subtreeFlags & 8772) !== 0 || n) {
              ((n = T.T), (T.T = null));
              var r = P.p;
              P.p = 2;
              var u = St;
              St |= 4;
              try {
                md(t, e.alternate, e);
              } finally {
                ((St = u), (P.p = r), (T.T = n));
              }
            }
            ae = 3;
          }
        }
        function Jd() {
          if (ae === 4 || ae === 3) {
            ((ae = 0), _e());
            var t = jn,
              e = rl,
              n = il,
              r = Qd;
            (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
              ? (ae = 5)
              : ((ae = 0), (rl = jn = null), Pd(t, t.pendingLanes));
            var u = t.pendingLanes;
            if (
              (u === 0 && (Hn = null),
              jo(n),
              (e = e.stateNode),
              Xe && typeof Xe.onCommitFiberRoot == "function")
            )
              try {
                Xe.onCommitFiberRoot(
                  Wl,
                  e,
                  void 0,
                  (e.current.flags & 128) === 128,
                );
              } catch {}
            if (r !== null) {
              ((e = T.T), (u = P.p), (P.p = 2), (T.T = null));
              try {
                for (var V = t.onRecoverableError, K = 0; K < r.length; K++) {
                  var U = r[K];
                  V(U.value, { componentStack: U.stack });
                }
              } finally {
                ((T.T = e), (P.p = u));
              }
            }
            ((il & 3) !== 0 && ji(),
              an(t),
              (u = t.pendingLanes),
              (n & 4194090) !== 0 && (u & 42) !== 0
                ? t === Ws
                  ? Vr++
                  : ((Vr = 0), (Ws = t))
                : (Vr = 0),
              fr(0));
          }
        }
        function Pd(t, e) {
          (t.pooledCacheLanes &= e) === 0 &&
            ((e = t.pooledCache), e != null && ((t.pooledCache = null), Pl(e)));
        }
        function ji(t) {
          return (Od(), Nd(), Jd(), kd());
        }
        function kd() {
          if (ae !== 5) return !1;
          var t = jn,
            e = gs;
          gs = 0;
          var n = jo(il),
            r = T.T,
            u = P.p;
          try {
            ((P.p = 32 > n ? 32 : n), (T.T = null), (n = Xs), (Xs = null));
            var V = jn,
              K = il;
            if (((ae = 0), (rl = jn = null), (il = 0), (St & 6) !== 0))
              throw Error(o(331));
            var U = St;
            if (
              ((St |= 4),
              zd(V.current),
              Xd(V, V.current, K, n),
              (St = U),
              fr(0, !1),
              Xe && typeof Xe.onPostCommitFiberRoot == "function")
            )
              try {
                Xe.onPostCommitFiberRoot(Wl, V);
              } catch {}
            return !0;
          } finally {
            ((P.p = u), (T.T = r), Pd(t, e));
          }
        }
        function Hd(t, e, n) {
          ((e = Ge(n, e)),
            (e = ls(t.stateNode, e, 2)),
            (t = Gn(t, e, 2)),
            t !== null && (zl(t, 2), an(t)));
        }
        function Zt(t, e, n) {
          if (t.tag === 3) Hd(t, t, n);
          else
            for (; e !== null; ) {
              if (e.tag === 3) {
                Hd(e, t, n);
                break;
              } else if (e.tag === 1) {
                var r = e.stateNode;
                if (
                  typeof e.type.getDerivedStateFromError == "function" ||
                  (typeof r.componentDidCatch == "function" &&
                    (Hn === null || !Hn.has(r)))
                ) {
                  ((t = Ge(n, t)),
                    (n = Lq(2)),
                    (r = Gn(e, n, 2)),
                    r !== null && (wq(n, r, e, t), zl(r, 2), an(r)));
                  break;
                }
              }
              e = e.return;
            }
        }
        function Qs(t, e, n) {
          var r = t.pingCache;
          if (r === null) {
            r = t.pingCache = new Z7();
            var u = new Set();
            r.set(e, u);
          } else
            ((u = r.get(e)), u === void 0 && ((u = new Set()), r.set(e, u)));
          u.has(n) ||
            ((hs = !0), u.add(n), (t = Y7.bind(null, t, e, n)), e.then(t, t));
        }
        function Y7(t, e, n) {
          var r = t.pingCache;
          (r !== null && r.delete(e),
            (t.pingedLanes |= t.suspendedLanes & n),
            (t.warmLanes &= ~n),
            xt === t &&
              (yt & n) === n &&
              (Jt === 4 ||
              (Jt === 3 && (yt & 62914560) === yt && 300 > ge() - As)
                ? (St & 2) === 0 && ol(t, 0)
                : (Fs |= n),
              ll === yt && (ll = 0)),
            an(t));
        }
        function jd(t, e) {
          (e === 0 && (e = Jf()),
            (t = Ja(t, e)),
            t !== null && (zl(t, e), an(t)));
        }
        function M7(t) {
          var e = t.memoizedState,
            n = 0;
          (e !== null && (n = e.retryLane), jd(t, n));
        }
        function O7(t, e) {
          var n = 0;
          switch (t.tag) {
            case 13:
              var r = t.stateNode,
                u = t.memoizedState;
              u !== null && (n = u.retryLane);
              break;
            case 19:
              r = t.stateNode;
              break;
            case 22:
              r = t.stateNode._retryCache;
              break;
            default:
              throw Error(o(314));
          }
          (r !== null && r.delete(e), jd(t, n));
        }
        function N7(t, e) {
          return Rt(t, e);
        }
        var Ii = null,
          sl = null,
          bs = !1,
          Di = !1,
          Bs = !1,
          ya = 0;
        function an(t) {
          (t !== sl &&
            t.next === null &&
            (sl === null ? (Ii = sl = t) : (sl = sl.next = t)),
            (Di = !0),
            bs || ((bs = !0), P7()));
        }
        function fr(t, e) {
          if (!Bs && Di) {
            Bs = !0;
            do
              for (var n = !1, r = Ii; r !== null; ) {
                if (t !== 0) {
                  var u = r.pendingLanes;
                  if (u === 0) var V = 0;
                  else {
                    var K = r.suspendedLanes,
                      U = r.pingedLanes;
                    ((V = (1 << (31 - We(42 | t) + 1)) - 1),
                      (V &= u & ~(K & ~U)),
                      (V =
                        V & 201326741 ? (V & 201326741) | 1 : V ? V | 2 : 0));
                  }
                  V !== 0 && ((n = !0), wd(r, V));
                } else
                  ((V = yt),
                    (V = ei(
                      r,
                      r === xt ? V : 0,
                      r.cancelPendingCommit !== null || r.timeoutHandle !== -1,
                    )),
                    (V & 3) === 0 || Sl(r, V) || ((n = !0), wd(r, V)));
                r = r.next;
              }
            while (n);
            Bs = !1;
          }
        }
        function J7() {
          Id();
        }
        function Id() {
          Di = bs = !1;
          var t = 0;
          ya !== 0 && (_7() && (t = ya), (ya = 0));
          for (var e = ge(), n = null, r = Ii; r !== null; ) {
            var u = r.next,
              V = Dd(r, e);
            (V === 0
              ? ((r.next = null),
                n === null ? (Ii = u) : (n.next = u),
                u === null && (sl = n))
              : ((n = r), (t !== 0 || (V & 3) !== 0) && (Di = !0)),
              (r = u));
          }
          fr(t);
        }
        function Dd(t, e) {
          for (
            var n = t.suspendedLanes,
              r = t.pingedLanes,
              u = t.expirationTimes,
              V = t.pendingLanes & -62914561;
            0 < V;
          ) {
            var K = 31 - We(V),
              U = 1 << K,
              F = u[K];
            (F === -1
              ? ((U & n) === 0 || (U & r) !== 0) && (u[K] = p3(U, e))
              : F <= e && (t.expiredLanes |= U),
              (V &= ~U));
          }
          if (
            ((e = xt),
            (n = yt),
            (n = ei(
              t,
              t === e ? n : 0,
              t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
            )),
            (r = t.callbackNode),
            n === 0 ||
              (t === e && (zt === 2 || zt === 9)) ||
              t.cancelPendingCommit !== null)
          )
            return (
              r !== null && r !== null && At(r),
              (t.callbackNode = null),
              (t.callbackPriority = 0)
            );
          if ((n & 3) === 0 || Sl(t, n)) {
            if (((e = n & -n), e === t.callbackPriority)) return e;
            switch ((r !== null && At(r), jo(n))) {
              case 2:
              case 8:
                n = Mf;
                break;
              case 32:
                n = _r;
                break;
              case 268435456:
                n = Of;
                break;
              default:
                n = _r;
            }
            return (
              (r = Ld.bind(null, t)),
              (n = Rt(n, r)),
              (t.callbackPriority = e),
              (t.callbackNode = n),
              e
            );
          }
          return (
            r !== null && r !== null && At(r),
            (t.callbackPriority = 2),
            (t.callbackNode = null),
            2
          );
        }
        function Ld(t, e) {
          if (ae !== 0 && ae !== 5)
            return ((t.callbackNode = null), (t.callbackPriority = 0), null);
          var n = t.callbackNode;
          if (ji() && t.callbackNode !== n) return null;
          var r = yt;
          return (
            (r = ei(
              t,
              t === xt ? r : 0,
              t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
            )),
            r === 0
              ? null
              : (Bd(t, r, e),
                Dd(t, ge()),
                t.callbackNode != null && t.callbackNode === n
                  ? Ld.bind(null, t)
                  : null)
          );
        }
        function wd(t, e) {
          if (ji()) return null;
          Bd(t, e, !0);
        }
        function P7() {
          t1(function () {
            (St & 6) !== 0 ? Rt(Yf, J7) : Id();
          });
        }
        function Rs() {
          return (ya === 0 && (ya = Nf()), ya);
        }
        function _d(t) {
          return t == null || typeof t == "symbol" || typeof t == "boolean"
            ? null
            : typeof t == "function"
              ? t
              : ii("" + t);
        }
        function $d(t, e) {
          var n = e.ownerDocument.createElement("input");
          return (
            (n.name = e.name),
            (n.value = e.value),
            t.id && n.setAttribute("form", t.id),
            e.parentNode.insertBefore(n, e),
            (t = new FormData(t)),
            n.parentNode.removeChild(n),
            t
          );
        }
        function k7(t, e, n, r, u) {
          if (e === "submit" && n && n.stateNode === u) {
            var V = _d((u[Ke] || null).action),
              K = r.submitter;
            K &&
              ((e = (e = K[Ke] || null)
                ? _d(e.formAction)
                : K.getAttribute("formAction")),
              e !== null && ((V = e), (K = null)));
            var U = new Vi("action", "action", null, r, u);
            t.push({
              event: U,
              listeners: [
                {
                  instance: null,
                  listener: function () {
                    if (r.defaultPrevented) {
                      if (ya !== 0) {
                        var F = K ? $d(u, K) : new FormData(u);
                        $u(
                          n,
                          { pending: !0, data: F, method: u.method, action: V },
                          null,
                          F,
                        );
                      }
                    } else
                      typeof V == "function" &&
                        (U.preventDefault(),
                        (F = K ? $d(u, K) : new FormData(u)),
                        $u(
                          n,
                          { pending: !0, data: F, method: u.method, action: V },
                          V,
                          F,
                        ));
                  },
                  currentTarget: u,
                },
              ],
            });
          }
        }
        for (var Zs = 0; Zs < Uu.length; Zs++) {
          var xs = Uu[Zs],
            H7 = xs.toLowerCase(),
            j7 = xs[0].toUpperCase() + xs.slice(1);
          je(H7, "on" + j7);
        }
        (je(Bc, "onAnimationEnd"),
          je(Rc, "onAnimationIteration"),
          je(Zc, "onAnimationStart"),
          je("dblclick", "onDoubleClick"),
          je("focusin", "onFocus"),
          je("focusout", "onBlur"),
          je(V7, "onTransitionRun"),
          je(f7, "onTransitionStart"),
          je(c7, "onTransitionCancel"),
          je(xc, "onTransitionEnd"),
          Ra("onMouseEnter", ["mouseout", "mouseover"]),
          Ra("onMouseLeave", ["mouseout", "mouseover"]),
          Ra("onPointerEnter", ["pointerout", "pointerover"]),
          Ra("onPointerLeave", ["pointerout", "pointerover"]),
          ia(
            "onChange",
            "change click focusin focusout input keydown keyup selectionchange".split(
              " ",
            ),
          ),
          ia(
            "onSelect",
            "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
              " ",
            ),
          ),
          ia("onBeforeInput", [
            "compositionend",
            "keypress",
            "textInput",
            "paste",
          ]),
          ia(
            "onCompositionEnd",
            "compositionend focusout keydown keypress keyup mousedown".split(
              " ",
            ),
          ),
          ia(
            "onCompositionStart",
            "compositionstart focusout keydown keypress keyup mousedown".split(
              " ",
            ),
          ),
          ia(
            "onCompositionUpdate",
            "compositionupdate focusout keydown keypress keyup mousedown".split(
              " ",
            ),
          ));
        var cr =
            "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
              " ",
            ),
          I7 = new Set(
            "beforetoggle cancel close invalid load scroll scrollend toggle"
              .split(" ")
              .concat(cr),
          );
        function tp(t, e) {
          e = (e & 4) !== 0;
          for (var n = 0; n < t.length; n++) {
            var r = t[n],
              u = r.event;
            r = r.listeners;
            t: {
              var V = void 0;
              if (e)
                for (var K = r.length - 1; 0 <= K; K--) {
                  var U = r[K],
                    F = U.instance,
                    Q = U.currentTarget;
                  if (((U = U.listener), F !== V && u.isPropagationStopped()))
                    break t;
                  ((V = U), (u.currentTarget = Q));
                  try {
                    V(u);
                  } catch (E) {
                    Ti(E);
                  }
                  ((u.currentTarget = null), (V = F));
                }
              else
                for (K = 0; K < r.length; K++) {
                  if (
                    ((U = r[K]),
                    (F = U.instance),
                    (Q = U.currentTarget),
                    (U = U.listener),
                    F !== V && u.isPropagationStopped())
                  )
                    break t;
                  ((V = U), (u.currentTarget = Q));
                  try {
                    V(u);
                  } catch (E) {
                    Ti(E);
                  }
                  ((u.currentTarget = null), (V = F));
                }
            }
          }
        }
        function ht(t, e) {
          var n = e[Io];
          n === void 0 && (n = e[Io] = new Set());
          var r = t + "__bubble";
          n.has(r) || (ep(e, t, 2, !1), n.add(r));
        }
        function Ts(t, e, n) {
          var r = 0;
          (e && (r |= 4), ep(n, t, r, e));
        }
        var Li = "_reactListening" + Math.random().toString(36).slice(2);
        function Gs(t) {
          if (!t[Li]) {
            ((t[Li] = !0),
              If.forEach(function (n) {
                n !== "selectionchange" &&
                  (I7.has(n) || Ts(n, !1, t), Ts(n, !0, t));
              }));
            var e = t.nodeType === 9 ? t : t.ownerDocument;
            e === null || e[Li] || ((e[Li] = !0), Ts("selectionchange", !1, e));
          }
        }
        function ep(t, e, n, r) {
          switch (Xp(e)) {
            case 2:
              var u = F1;
              break;
            case 8:
              u = y1;
              break;
            default:
              u = ws;
          }
          ((n = u.bind(null, e, n, t)),
            (u = void 0),
            !ru ||
              (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
              (u = !0),
            r
              ? u !== void 0
                ? t.addEventListener(e, n, { capture: !0, passive: u })
                : t.addEventListener(e, n, !0)
              : u !== void 0
                ? t.addEventListener(e, n, { passive: u })
                : t.addEventListener(e, n, !1));
        }
        function Es(t, e, n, r, u) {
          var V = r;
          if ((e & 1) === 0 && (e & 2) === 0 && r !== null)
            t: for (;;) {
              if (r === null) return;
              var K = r.tag;
              if (K === 3 || K === 4) {
                var U = r.stateNode.containerInfo;
                if (U === u) break;
                if (K === 4)
                  for (K = r.return; K !== null; ) {
                    var F = K.tag;
                    if ((F === 3 || F === 4) && K.stateNode.containerInfo === u)
                      return;
                    K = K.return;
                  }
                for (; U !== null; ) {
                  if (((K = Qa(U)), K === null)) return;
                  if (
                    ((F = K.tag), F === 5 || F === 6 || F === 26 || F === 27)
                  ) {
                    r = V = K;
                    continue t;
                  }
                  U = U.parentNode;
                }
              }
              r = r.return;
            }
          uc(function () {
            var Q = V,
              E = au(n),
              O = [];
            t: {
              var B = Tc.get(t);
              if (B !== void 0) {
                var R = Vi,
                  ut = t;
                switch (t) {
                  case "keypress":
                    if (ui(n) === 0) break t;
                  case "keydown":
                  case "keyup":
                    R = N3;
                    break;
                  case "focusin":
                    ((ut = "focus"), (R = su));
                    break;
                  case "focusout":
                    ((ut = "blur"), (R = su));
                    break;
                  case "beforeblur":
                  case "afterblur":
                    R = su;
                    break;
                  case "click":
                    if (n.button === 2) break t;
                  case "auxclick":
                  case "dblclick":
                  case "mousedown":
                  case "mousemove":
                  case "mouseup":
                  case "mouseout":
                  case "mouseover":
                  case "contextmenu":
                    R = fc;
                    break;
                  case "drag":
                  case "dragend":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "dragstart":
                  case "drop":
                    R = Q3;
                    break;
                  case "touchcancel":
                  case "touchend":
                  case "touchmove":
                  case "touchstart":
                    R = k3;
                    break;
                  case Bc:
                  case Rc:
                  case Zc:
                    R = R3;
                    break;
                  case xc:
                    R = j3;
                    break;
                  case "scroll":
                  case "scrollend":
                    R = z3;
                    break;
                  case "wheel":
                    R = D3;
                    break;
                  case "copy":
                  case "cut":
                  case "paste":
                    R = x3;
                    break;
                  case "gotpointercapture":
                  case "lostpointercapture":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "pointerup":
                    R = qc;
                    break;
                  case "toggle":
                  case "beforetoggle":
                    R = w3;
                }
                var it = (e & 4) !== 0,
                  Bt = !it && (t === "scroll" || t === "scrollend"),
                  S = it ? (B !== null ? B + "Capture" : null) : B;
                it = [];
                for (var W = Q, C; W !== null; ) {
                  var M = W;
                  if (
                    ((C = M.stateNode),
                    (M = M.tag),
                    (M !== 5 && M !== 26 && M !== 27) ||
                      C === null ||
                      S === null ||
                      ((M = bl(W, S)), M != null && it.push(qr(W, M, C))),
                    Bt)
                  )
                    break;
                  W = W.return;
                }
                0 < it.length &&
                  ((B = new R(B, ut, null, n, E)),
                  O.push({ event: B, listeners: it }));
              }
            }
            if ((e & 7) === 0) {
              t: {
                if (
                  ((B = t === "mouseover" || t === "pointerover"),
                  (R = t === "mouseout" || t === "pointerout"),
                  B &&
                    n !== nu &&
                    (ut = n.relatedTarget || n.fromElement) &&
                    (Qa(ut) || ut[Ca]))
                )
                  break t;
                if (
                  (R || B) &&
                  ((B =
                    E.window === E
                      ? E
                      : (B = E.ownerDocument)
                        ? B.defaultView || B.parentWindow
                        : window),
                  R
                    ? ((ut = n.relatedTarget || n.toElement),
                      (R = Q),
                      (ut = ut ? Qa(ut) : null),
                      ut !== null &&
                        ((Bt = f(ut)),
                        (it = ut.tag),
                        ut !== Bt || (it !== 5 && it !== 27 && it !== 6)) &&
                        (ut = null))
                    : ((R = null), (ut = Q)),
                  R !== ut)
                ) {
                  if (
                    ((it = fc),
                    (M = "onMouseLeave"),
                    (S = "onMouseEnter"),
                    (W = "mouse"),
                    (t === "pointerout" || t === "pointerover") &&
                      ((it = qc),
                      (M = "onPointerLeave"),
                      (S = "onPointerEnter"),
                      (W = "pointer")),
                    (Bt = R == null ? B : Ql(R)),
                    (C = ut == null ? B : Ql(ut)),
                    (B = new it(M, W + "leave", R, n, E)),
                    (B.target = Bt),
                    (B.relatedTarget = C),
                    (M = null),
                    Qa(E) === Q &&
                      ((it = new it(S, W + "enter", ut, n, E)),
                      (it.target = C),
                      (it.relatedTarget = Bt),
                      (M = it)),
                    (Bt = M),
                    R && ut)
                  )
                    e: {
                      for (it = R, S = ut, W = 0, C = it; C; C = Vl(C)) W++;
                      for (C = 0, M = S; M; M = Vl(M)) C++;
                      for (; 0 < W - C; ) ((it = Vl(it)), W--);
                      for (; 0 < C - W; ) ((S = Vl(S)), C--);
                      for (; W--; ) {
                        if (it === S || (S !== null && it === S.alternate))
                          break e;
                        ((it = Vl(it)), (S = Vl(S)));
                      }
                      it = null;
                    }
                  else it = null;
                  (R !== null && np(O, B, R, it, !1),
                    ut !== null && Bt !== null && np(O, Bt, ut, it, !0));
                }
              }
              t: {
                if (
                  ((B = Q ? Ql(Q) : window),
                  (R = B.nodeName && B.nodeName.toLowerCase()),
                  R === "select" || (R === "input" && B.type === "file"))
                )
                  var tt = Fc;
                else if (mc(B))
                  if (yc) tt = o7;
                  else {
                    tt = r7;
                    var Ut = l7;
                  }
                else
                  ((R = B.nodeName),
                    !R ||
                    R.toLowerCase() !== "input" ||
                    (B.type !== "checkbox" && B.type !== "radio")
                      ? Q && eu(Q.elementType) && (tt = Fc)
                      : (tt = i7));
                if (tt && (tt = tt(t, Q))) {
                  hc(O, tt, n, E);
                  break t;
                }
                (Ut && Ut(t, B, Q),
                  t === "focusout" &&
                    Q &&
                    B.type === "number" &&
                    Q.memoizedProps.value != null &&
                    tu(B, "number", B.value));
              }
              switch (((Ut = Q ? Ql(Q) : window), t)) {
                case "focusin":
                  (mc(Ut) || Ut.contentEditable === "true") &&
                    ((Ma = Ut), (pu = Q), (Yl = null));
                  break;
                case "focusout":
                  Yl = pu = Ma = null;
                  break;
                case "mousedown":
                  Ku = !0;
                  break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                  ((Ku = !1), Qc(O, n, E));
                  break;
                case "selectionchange":
                  if (s7) break;
                case "keydown":
                case "keyup":
                  Qc(O, n, E);
              }
              var et;
              if (fu)
                t: {
                  switch (t) {
                    case "compositionstart":
                      var ot = "onCompositionStart";
                      break t;
                    case "compositionend":
                      ot = "onCompositionEnd";
                      break t;
                    case "compositionupdate":
                      ot = "onCompositionUpdate";
                      break t;
                  }
                  ot = void 0;
                }
              else
                Ya
                  ? vc(t, n) && (ot = "onCompositionEnd")
                  : t === "keydown" &&
                    n.keyCode === 229 &&
                    (ot = "onCompositionStart");
              (ot &&
                (dc &&
                  n.locale !== "ko" &&
                  (Ya || ot !== "onCompositionStart"
                    ? ot === "onCompositionEnd" && Ya && (et = sc())
                    : ((Rn = E),
                      (iu = "value" in Rn ? Rn.value : Rn.textContent),
                      (Ya = !0))),
                (Ut = wi(Q, ot)),
                0 < Ut.length &&
                  ((ot = new cc(ot, t, null, n, E)),
                  O.push({ event: ot, listeners: Ut }),
                  et
                    ? (ot.data = et)
                    : ((et = Uc(n)), et !== null && (ot.data = et)))),
                (et = $3 ? t7(t, n) : e7(t, n)) &&
                  ((ot = wi(Q, "onBeforeInput")),
                  0 < ot.length &&
                    ((Ut = new cc("onBeforeInput", "beforeinput", null, n, E)),
                    O.push({ event: Ut, listeners: ot }),
                    (Ut.data = et))),
                k7(O, t, Q, n, E));
            }
            tp(O, e);
          });
        }
        function qr(t, e, n) {
          return { instance: t, listener: e, currentTarget: n };
        }
        function wi(t, e) {
          for (var n = e + "Capture", r = []; t !== null; ) {
            var u = t,
              V = u.stateNode;
            if (
              ((u = u.tag),
              (u !== 5 && u !== 26 && u !== 27) ||
                V === null ||
                ((u = bl(t, n)),
                u != null && r.unshift(qr(t, u, V)),
                (u = bl(t, e)),
                u != null && r.push(qr(t, u, V))),
              t.tag === 3)
            )
              return r;
            t = t.return;
          }
          return [];
        }
        function Vl(t) {
          if (t === null) return null;
          do t = t.return;
          while (t && t.tag !== 5 && t.tag !== 27);
          return t || null;
        }
        function np(t, e, n, r, u) {
          for (var V = e._reactName, K = []; n !== null && n !== r; ) {
            var U = n,
              F = U.alternate,
              Q = U.stateNode;
            if (((U = U.tag), F !== null && F === r)) break;
            ((U !== 5 && U !== 26 && U !== 27) ||
              Q === null ||
              ((F = Q),
              u
                ? ((Q = bl(n, V)), Q != null && K.unshift(qr(n, Q, F)))
                : u || ((Q = bl(n, V)), Q != null && K.push(qr(n, Q, F)))),
              (n = n.return));
          }
          K.length !== 0 && t.push({ event: e, listeners: K });
        }
        var D7 = /\r\n?/g,
          L7 = /\u0000|\uFFFD/g;
        function ap(t) {
          return (typeof t == "string" ? t : "" + t)
            .replace(
              D7,
              `
`,
            )
            .replace(L7, "");
        }
        function lp(t, e) {
          return ((e = ap(e)), ap(t) === e);
        }
        function _i() {}
        function bt(t, e, n, r, u, V) {
          switch (n) {
            case "children":
              typeof r == "string"
                ? e === "body" || (e === "textarea" && r === "") || Ta(t, r)
                : (typeof r == "number" || typeof r == "bigint") &&
                  e !== "body" &&
                  Ta(t, "" + r);
              break;
            case "className":
              ai(t, "class", r);
              break;
            case "tabIndex":
              ai(t, "tabindex", r);
              break;
            case "dir":
            case "role":
            case "viewBox":
            case "width":
            case "height":
              ai(t, n, r);
              break;
            case "style":
              ic(t, r, V);
              break;
            case "data":
              if (e !== "object") {
                ai(t, "data", r);
                break;
              }
            case "src":
            case "href":
              if (r === "" && (e !== "a" || n !== "href")) {
                t.removeAttribute(n);
                break;
              }
              if (
                r == null ||
                typeof r == "function" ||
                typeof r == "symbol" ||
                typeof r == "boolean"
              ) {
                t.removeAttribute(n);
                break;
              }
              ((r = ii("" + r)), t.setAttribute(n, r));
              break;
            case "action":
            case "formAction":
              if (typeof r == "function") {
                t.setAttribute(
                  n,
                  "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
                );
                break;
              } else
                typeof V == "function" &&
                  (n === "formAction"
                    ? (e !== "input" && bt(t, e, "name", u.name, u, null),
                      bt(t, e, "formEncType", u.formEncType, u, null),
                      bt(t, e, "formMethod", u.formMethod, u, null),
                      bt(t, e, "formTarget", u.formTarget, u, null))
                    : (bt(t, e, "encType", u.encType, u, null),
                      bt(t, e, "method", u.method, u, null),
                      bt(t, e, "target", u.target, u, null)));
              if (r == null || typeof r == "symbol" || typeof r == "boolean") {
                t.removeAttribute(n);
                break;
              }
              ((r = ii("" + r)), t.setAttribute(n, r));
              break;
            case "onClick":
              r != null && (t.onclick = _i);
              break;
            case "onScroll":
              r != null && ht("scroll", t);
              break;
            case "onScrollEnd":
              r != null && ht("scrollend", t);
              break;
            case "dangerouslySetInnerHTML":
              if (r != null) {
                if (typeof r != "object" || !("__html" in r))
                  throw Error(o(61));
                if (((n = r.__html), n != null)) {
                  if (u.children != null) throw Error(o(60));
                  t.innerHTML = n;
                }
              }
              break;
            case "multiple":
              t.multiple = r && typeof r != "function" && typeof r != "symbol";
              break;
            case "muted":
              t.muted = r && typeof r != "function" && typeof r != "symbol";
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "ref":
              break;
            case "autoFocus":
              break;
            case "xlinkHref":
              if (
                r == null ||
                typeof r == "function" ||
                typeof r == "boolean" ||
                typeof r == "symbol"
              ) {
                t.removeAttribute("xlink:href");
                break;
              }
              ((n = ii("" + r)),
                t.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  "xlink:href",
                  n,
                ));
              break;
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
              r != null && typeof r != "function" && typeof r != "symbol"
                ? t.setAttribute(n, "" + r)
                : t.removeAttribute(n);
              break;
            case "inert":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
              r && typeof r != "function" && typeof r != "symbol"
                ? t.setAttribute(n, "")
                : t.removeAttribute(n);
              break;
            case "capture":
            case "download":
              r === !0
                ? t.setAttribute(n, "")
                : r !== !1 &&
                    r != null &&
                    typeof r != "function" &&
                    typeof r != "symbol"
                  ? t.setAttribute(n, r)
                  : t.removeAttribute(n);
              break;
            case "cols":
            case "rows":
            case "size":
            case "span":
              r != null &&
              typeof r != "function" &&
              typeof r != "symbol" &&
              !isNaN(r) &&
              1 <= r
                ? t.setAttribute(n, r)
                : t.removeAttribute(n);
              break;
            case "rowSpan":
            case "start":
              r == null ||
              typeof r == "function" ||
              typeof r == "symbol" ||
              isNaN(r)
                ? t.removeAttribute(n)
                : t.setAttribute(n, r);
              break;
            case "popover":
              (ht("beforetoggle", t), ht("toggle", t), ni(t, "popover", r));
              break;
            case "xlinkActuate":
              fn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
              break;
            case "xlinkArcrole":
              fn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
              break;
            case "xlinkRole":
              fn(t, "http://www.w3.org/1999/xlink", "xlink:role", r);
              break;
            case "xlinkShow":
              fn(t, "http://www.w3.org/1999/xlink", "xlink:show", r);
              break;
            case "xlinkTitle":
              fn(t, "http://www.w3.org/1999/xlink", "xlink:title", r);
              break;
            case "xlinkType":
              fn(t, "http://www.w3.org/1999/xlink", "xlink:type", r);
              break;
            case "xmlBase":
              fn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
              break;
            case "xmlLang":
              fn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
              break;
            case "xmlSpace":
              fn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
              break;
            case "is":
              ni(t, "is", r);
              break;
            case "innerText":
            case "textContent":
              break;
            default:
              (!(2 < n.length) ||
                (n[0] !== "o" && n[0] !== "O") ||
                (n[1] !== "n" && n[1] !== "N")) &&
                ((n = W3.get(n) || n), ni(t, n, r));
          }
        }
        function Ys(t, e, n, r, u, V) {
          switch (n) {
            case "style":
              ic(t, r, V);
              break;
            case "dangerouslySetInnerHTML":
              if (r != null) {
                if (typeof r != "object" || !("__html" in r))
                  throw Error(o(61));
                if (((n = r.__html), n != null)) {
                  if (u.children != null) throw Error(o(60));
                  t.innerHTML = n;
                }
              }
              break;
            case "children":
              typeof r == "string"
                ? Ta(t, r)
                : (typeof r == "number" || typeof r == "bigint") &&
                  Ta(t, "" + r);
              break;
            case "onScroll":
              r != null && ht("scroll", t);
              break;
            case "onScrollEnd":
              r != null && ht("scrollend", t);
              break;
            case "onClick":
              r != null && (t.onclick = _i);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "innerHTML":
            case "ref":
              break;
            case "innerText":
            case "textContent":
              break;
            default:
              if (!Df.hasOwnProperty(n))
                t: {
                  if (
                    n[0] === "o" &&
                    n[1] === "n" &&
                    ((u = n.endsWith("Capture")),
                    (e = n.slice(2, u ? n.length - 7 : void 0)),
                    (V = t[Ke] || null),
                    (V = V != null ? V[n] : null),
                    typeof V == "function" && t.removeEventListener(e, V, u),
                    typeof r == "function")
                  ) {
                    (typeof V != "function" &&
                      V !== null &&
                      (n in t
                        ? (t[n] = null)
                        : t.hasAttribute(n) && t.removeAttribute(n)),
                      t.addEventListener(e, r, u));
                    break t;
                  }
                  n in t
                    ? (t[n] = r)
                    : r === !0
                      ? t.setAttribute(n, "")
                      : ni(t, n, r);
                }
          }
        }
        function le(t, e, n) {
          switch (e) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
              break;
            case "img":
              (ht("error", t), ht("load", t));
              var r = !1,
                u = !1,
                V;
              for (V in n)
                if (n.hasOwnProperty(V)) {
                  var K = n[V];
                  if (K != null)
                    switch (V) {
                      case "src":
                        r = !0;
                        break;
                      case "srcSet":
                        u = !0;
                        break;
                      case "children":
                      case "dangerouslySetInnerHTML":
                        throw Error(o(137, e));
                      default:
                        bt(t, e, V, K, n, null);
                    }
                }
              (u && bt(t, e, "srcSet", n.srcSet, n, null),
                r && bt(t, e, "src", n.src, n, null));
              return;
            case "input":
              ht("invalid", t);
              var U = (V = K = u = null),
                F = null,
                Q = null;
              for (r in n)
                if (n.hasOwnProperty(r)) {
                  var E = n[r];
                  if (E != null)
                    switch (r) {
                      case "name":
                        u = E;
                        break;
                      case "type":
                        K = E;
                        break;
                      case "checked":
                        F = E;
                        break;
                      case "defaultChecked":
                        Q = E;
                        break;
                      case "value":
                        V = E;
                        break;
                      case "defaultValue":
                        U = E;
                        break;
                      case "children":
                      case "dangerouslySetInnerHTML":
                        if (E != null) throw Error(o(137, e));
                        break;
                      default:
                        bt(t, e, r, E, n, null);
                    }
                }
              (nc(t, V, U, F, Q, K, u, !1), li(t));
              return;
            case "select":
              (ht("invalid", t), (r = K = V = null));
              for (u in n)
                if (n.hasOwnProperty(u) && ((U = n[u]), U != null))
                  switch (u) {
                    case "value":
                      V = U;
                      break;
                    case "defaultValue":
                      K = U;
                      break;
                    case "multiple":
                      r = U;
                    default:
                      bt(t, e, u, U, n, null);
                  }
              ((e = V),
                (n = K),
                (t.multiple = !!r),
                e != null ? xa(t, !!r, e, !1) : n != null && xa(t, !!r, n, !0));
              return;
            case "textarea":
              (ht("invalid", t), (V = u = r = null));
              for (K in n)
                if (n.hasOwnProperty(K) && ((U = n[K]), U != null))
                  switch (K) {
                    case "value":
                      r = U;
                      break;
                    case "defaultValue":
                      u = U;
                      break;
                    case "children":
                      V = U;
                      break;
                    case "dangerouslySetInnerHTML":
                      if (U != null) throw Error(o(91));
                      break;
                    default:
                      bt(t, e, K, U, n, null);
                  }
              (lc(t, r, u, V), li(t));
              return;
            case "option":
              for (F in n)
                if (n.hasOwnProperty(F) && ((r = n[F]), r != null))
                  switch (F) {
                    case "selected":
                      t.selected =
                        r && typeof r != "function" && typeof r != "symbol";
                      break;
                    default:
                      bt(t, e, F, r, n, null);
                  }
              return;
            case "dialog":
              (ht("beforetoggle", t),
                ht("toggle", t),
                ht("cancel", t),
                ht("close", t));
              break;
            case "iframe":
            case "object":
              ht("load", t);
              break;
            case "video":
            case "audio":
              for (r = 0; r < cr.length; r++) ht(cr[r], t);
              break;
            case "image":
              (ht("error", t), ht("load", t));
              break;
            case "details":
              ht("toggle", t);
              break;
            case "embed":
            case "source":
            case "link":
              (ht("error", t), ht("load", t));
            case "area":
            case "base":
            case "br":
            case "col":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "track":
            case "wbr":
            case "menuitem":
              for (Q in n)
                if (n.hasOwnProperty(Q) && ((r = n[Q]), r != null))
                  switch (Q) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(o(137, e));
                    default:
                      bt(t, e, Q, r, n, null);
                  }
              return;
            default:
              if (eu(e)) {
                for (E in n)
                  n.hasOwnProperty(E) &&
                    ((r = n[E]), r !== void 0 && Ys(t, e, E, r, n, void 0));
                return;
              }
          }
          for (U in n)
            n.hasOwnProperty(U) &&
              ((r = n[U]), r != null && bt(t, e, U, r, n, null));
        }
        function w7(t, e, n, r) {
          switch (e) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
              break;
            case "input":
              var u = null,
                V = null,
                K = null,
                U = null,
                F = null,
                Q = null,
                E = null;
              for (R in n) {
                var O = n[R];
                if (n.hasOwnProperty(R) && O != null)
                  switch (R) {
                    case "checked":
                      break;
                    case "value":
                      break;
                    case "defaultValue":
                      F = O;
                    default:
                      r.hasOwnProperty(R) || bt(t, e, R, null, r, O);
                  }
              }
              for (var B in r) {
                var R = r[B];
                if (
                  ((O = n[B]), r.hasOwnProperty(B) && (R != null || O != null))
                )
                  switch (B) {
                    case "type":
                      V = R;
                      break;
                    case "name":
                      u = R;
                      break;
                    case "checked":
                      Q = R;
                      break;
                    case "defaultChecked":
                      E = R;
                      break;
                    case "value":
                      K = R;
                      break;
                    case "defaultValue":
                      U = R;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (R != null) throw Error(o(137, e));
                      break;
                    default:
                      R !== O && bt(t, e, B, R, r, O);
                  }
              }
              $o(t, K, U, F, Q, E, V, u);
              return;
            case "select":
              R = K = U = B = null;
              for (V in n)
                if (((F = n[V]), n.hasOwnProperty(V) && F != null))
                  switch (V) {
                    case "value":
                      break;
                    case "multiple":
                      R = F;
                    default:
                      r.hasOwnProperty(V) || bt(t, e, V, null, r, F);
                  }
              for (u in r)
                if (
                  ((V = r[u]),
                  (F = n[u]),
                  r.hasOwnProperty(u) && (V != null || F != null))
                )
                  switch (u) {
                    case "value":
                      B = V;
                      break;
                    case "defaultValue":
                      U = V;
                      break;
                    case "multiple":
                      K = V;
                    default:
                      V !== F && bt(t, e, u, V, r, F);
                  }
              ((e = U),
                (n = K),
                (r = R),
                B != null
                  ? xa(t, !!n, B, !1)
                  : !!r != !!n &&
                    (e != null
                      ? xa(t, !!n, e, !0)
                      : xa(t, !!n, n ? [] : "", !1)));
              return;
            case "textarea":
              R = B = null;
              for (U in n)
                if (
                  ((u = n[U]),
                  n.hasOwnProperty(U) && u != null && !r.hasOwnProperty(U))
                )
                  switch (U) {
                    case "value":
                      break;
                    case "children":
                      break;
                    default:
                      bt(t, e, U, null, r, u);
                  }
              for (K in r)
                if (
                  ((u = r[K]),
                  (V = n[K]),
                  r.hasOwnProperty(K) && (u != null || V != null))
                )
                  switch (K) {
                    case "value":
                      B = u;
                      break;
                    case "defaultValue":
                      R = u;
                      break;
                    case "children":
                      break;
                    case "dangerouslySetInnerHTML":
                      if (u != null) throw Error(o(91));
                      break;
                    default:
                      u !== V && bt(t, e, K, u, r, V);
                  }
              ac(t, B, R);
              return;
            case "option":
              for (var ut in n)
                if (
                  ((B = n[ut]),
                  n.hasOwnProperty(ut) && B != null && !r.hasOwnProperty(ut))
                )
                  switch (ut) {
                    case "selected":
                      t.selected = !1;
                      break;
                    default:
                      bt(t, e, ut, null, r, B);
                  }
              for (F in r)
                if (
                  ((B = r[F]),
                  (R = n[F]),
                  r.hasOwnProperty(F) && B !== R && (B != null || R != null))
                )
                  switch (F) {
                    case "selected":
                      t.selected =
                        B && typeof B != "function" && typeof B != "symbol";
                      break;
                    default:
                      bt(t, e, F, B, r, R);
                  }
              return;
            case "img":
            case "link":
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
            case "menuitem":
              for (var it in n)
                ((B = n[it]),
                  n.hasOwnProperty(it) &&
                    B != null &&
                    !r.hasOwnProperty(it) &&
                    bt(t, e, it, null, r, B));
              for (Q in r)
                if (
                  ((B = r[Q]),
                  (R = n[Q]),
                  r.hasOwnProperty(Q) && B !== R && (B != null || R != null))
                )
                  switch (Q) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (B != null) throw Error(o(137, e));
                      break;
                    default:
                      bt(t, e, Q, B, r, R);
                  }
              return;
            default:
              if (eu(e)) {
                for (var Bt in n)
                  ((B = n[Bt]),
                    n.hasOwnProperty(Bt) &&
                      B !== void 0 &&
                      !r.hasOwnProperty(Bt) &&
                      Ys(t, e, Bt, void 0, r, B));
                for (E in r)
                  ((B = r[E]),
                    (R = n[E]),
                    !r.hasOwnProperty(E) ||
                      B === R ||
                      (B === void 0 && R === void 0) ||
                      Ys(t, e, E, B, r, R));
                return;
              }
          }
          for (var S in n)
            ((B = n[S]),
              n.hasOwnProperty(S) &&
                B != null &&
                !r.hasOwnProperty(S) &&
                bt(t, e, S, null, r, B));
          for (O in r)
            ((B = r[O]),
              (R = n[O]),
              !r.hasOwnProperty(O) ||
                B === R ||
                (B == null && R == null) ||
                bt(t, e, O, B, r, R));
        }
        var Ms = null,
          Os = null;
        function $i(t) {
          return t.nodeType === 9 ? t : t.ownerDocument;
        }
        function rp(t) {
          switch (t) {
            case "http://www.w3.org/2000/svg":
              return 1;
            case "http://www.w3.org/1998/Math/MathML":
              return 2;
            default:
              return 0;
          }
        }
        function ip(t, e) {
          if (t === 0)
            switch (e) {
              case "svg":
                return 1;
              case "math":
                return 2;
              default:
                return 0;
            }
          return t === 1 && e === "foreignObject" ? 0 : t;
        }
        function Ns(t, e) {
          return (
            t === "textarea" ||
            t === "noscript" ||
            typeof e.children == "string" ||
            typeof e.children == "number" ||
            typeof e.children == "bigint" ||
            (typeof e.dangerouslySetInnerHTML == "object" &&
              e.dangerouslySetInnerHTML !== null &&
              e.dangerouslySetInnerHTML.__html != null)
          );
        }
        var Js = null;
        function _7() {
          var t = window.event;
          return t && t.type === "popstate"
            ? t === Js
              ? !1
              : ((Js = t), !0)
            : ((Js = null), !1);
        }
        var op = typeof setTimeout == "function" ? setTimeout : void 0,
          $7 = typeof clearTimeout == "function" ? clearTimeout : void 0,
          up = typeof Promise == "function" ? Promise : void 0,
          t1 =
            typeof queueMicrotask == "function"
              ? queueMicrotask
              : typeof up < "u"
                ? function (t) {
                    return up.resolve(null).then(t).catch(e1);
                  }
                : op;
        function e1(t) {
          setTimeout(function () {
            throw t;
          });
        }
        function Dn(t) {
          return t === "head";
        }
        function sp(t, e) {
          var n = e,
            r = 0,
            u = 0;
          do {
            var V = n.nextSibling;
            if ((t.removeChild(n), V && V.nodeType === 8))
              if (((n = V.data), n === "/$")) {
                if (0 < r && 8 > r) {
                  n = r;
                  var K = t.ownerDocument;
                  if (
                    (n & 1 && dr(K.documentElement), n & 2 && dr(K.body), n & 4)
                  )
                    for (n = K.head, dr(n), K = n.firstChild; K; ) {
                      var U = K.nextSibling,
                        F = K.nodeName;
                      (K[Cl] ||
                        F === "SCRIPT" ||
                        F === "STYLE" ||
                        (F === "LINK" &&
                          K.rel.toLowerCase() === "stylesheet") ||
                        n.removeChild(K),
                        (K = U));
                    }
                }
                if (u === 0) {
                  (t.removeChild(V), yr(e));
                  return;
                }
                u--;
              } else
                n === "$" || n === "$?" || n === "$!"
                  ? u++
                  : (r = n.charCodeAt(0) - 48);
            else r = 0;
            n = V;
          } while (n);
          yr(e);
        }
        function Ps(t) {
          var e = t.firstChild;
          for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
            var n = e;
            switch (((e = e.nextSibling), n.nodeName)) {
              case "HTML":
              case "HEAD":
              case "BODY":
                (Ps(n), Do(n));
                continue;
              case "SCRIPT":
              case "STYLE":
                continue;
              case "LINK":
                if (n.rel.toLowerCase() === "stylesheet") continue;
            }
            t.removeChild(n);
          }
        }
        function n1(t, e, n, r) {
          for (; t.nodeType === 1; ) {
            var u = n;
            if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
              if (!r && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
            } else if (r) {
              if (!t[Cl])
                switch (e) {
                  case "meta":
                    if (!t.hasAttribute("itemprop")) break;
                    return t;
                  case "link":
                    if (
                      ((V = t.getAttribute("rel")),
                      V === "stylesheet" && t.hasAttribute("data-precedence"))
                    )
                      break;
                    if (
                      V !== u.rel ||
                      t.getAttribute("href") !==
                        (u.href == null || u.href === "" ? null : u.href) ||
                      t.getAttribute("crossorigin") !==
                        (u.crossOrigin == null ? null : u.crossOrigin) ||
                      t.getAttribute("title") !==
                        (u.title == null ? null : u.title)
                    )
                      break;
                    return t;
                  case "style":
                    if (t.hasAttribute("data-precedence")) break;
                    return t;
                  case "script":
                    if (
                      ((V = t.getAttribute("src")),
                      (V !== (u.src == null ? null : u.src) ||
                        t.getAttribute("type") !==
                          (u.type == null ? null : u.type) ||
                        t.getAttribute("crossorigin") !==
                          (u.crossOrigin == null ? null : u.crossOrigin)) &&
                        V &&
                        t.hasAttribute("async") &&
                        !t.hasAttribute("itemprop"))
                    )
                      break;
                    return t;
                  default:
                    return t;
                }
            } else if (e === "input" && t.type === "hidden") {
              var V = u.name == null ? null : "" + u.name;
              if (u.type === "hidden" && t.getAttribute("name") === V) return t;
            } else return t;
            if (((t = De(t.nextSibling)), t === null)) break;
          }
          return null;
        }
        function a1(t, e, n) {
          if (e === "") return null;
          for (; t.nodeType !== 3; )
            if (
              ((t.nodeType !== 1 ||
                t.nodeName !== "INPUT" ||
                t.type !== "hidden") &&
                !n) ||
              ((t = De(t.nextSibling)), t === null)
            )
              return null;
          return t;
        }
        function ks(t) {
          return (
            t.data === "$!" ||
            (t.data === "$?" && t.ownerDocument.readyState === "complete")
          );
        }
        function l1(t, e) {
          var n = t.ownerDocument;
          if (t.data !== "$?" || n.readyState === "complete") e();
          else {
            var r = function () {
              (e(), n.removeEventListener("DOMContentLoaded", r));
            };
            (n.addEventListener("DOMContentLoaded", r), (t._reactRetry = r));
          }
        }
        function De(t) {
          for (; t != null; t = t.nextSibling) {
            var e = t.nodeType;
            if (e === 1 || e === 3) break;
            if (e === 8) {
              if (
                ((e = t.data),
                e === "$" ||
                  e === "$!" ||
                  e === "$?" ||
                  e === "F!" ||
                  e === "F")
              )
                break;
              if (e === "/$") return null;
            }
          }
          return t;
        }
        var Hs = null;
        function Vp(t) {
          t = t.previousSibling;
          for (var e = 0; t; ) {
            if (t.nodeType === 8) {
              var n = t.data;
              if (n === "$" || n === "$!" || n === "$?") {
                if (e === 0) return t;
                e--;
              } else n === "/$" && e++;
            }
            t = t.previousSibling;
          }
          return null;
        }
        function fp(t, e, n) {
          switch (((e = $i(n)), t)) {
            case "html":
              if (((t = e.documentElement), !t)) throw Error(o(452));
              return t;
            case "head":
              if (((t = e.head), !t)) throw Error(o(453));
              return t;
            case "body":
              if (((t = e.body), !t)) throw Error(o(454));
              return t;
            default:
              throw Error(o(451));
          }
        }
        function dr(t) {
          for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
          Do(t);
        }
        var Je = new Map(),
          cp = new Set();
        function to(t) {
          return typeof t.getRootNode == "function"
            ? t.getRootNode()
            : t.nodeType === 9
              ? t
              : t.ownerDocument;
        }
        var Xn = P.d;
        P.d = { f: r1, r: i1, D: o1, C: u1, L: s1, m: V1, X: c1, S: f1, M: q1 };
        function r1() {
          var t = Xn.f(),
            e = ki();
          return t || e;
        }
        function i1(t) {
          var e = ba(t);
          e !== null && e.tag === 5 && e.type === "form" ? Bq(e) : Xn.r(t);
        }
        var fl = typeof document > "u" ? null : document;
        function qp(t, e, n) {
          var r = fl;
          if (r && typeof e == "string" && e) {
            var u = Te(e);
            ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
              typeof n == "string" && (u += '[crossorigin="' + n + '"]'),
              cp.has(u) ||
                (cp.add(u),
                (t = { rel: t, crossOrigin: n, href: e }),
                r.querySelector(u) === null &&
                  ((e = r.createElement("link")),
                  le(e, "link", t),
                  _t(e),
                  r.head.appendChild(e))));
          }
        }
        function o1(t) {
          (Xn.D(t), qp("dns-prefetch", t, null));
        }
        function u1(t, e) {
          (Xn.C(t, e), qp("preconnect", t, e));
        }
        function s1(t, e, n) {
          Xn.L(t, e, n);
          var r = fl;
          if (r && t && e) {
            var u = 'link[rel="preload"][as="' + Te(e) + '"]';
            e === "image" && n && n.imageSrcSet
              ? ((u += '[imagesrcset="' + Te(n.imageSrcSet) + '"]'),
                typeof n.imageSizes == "string" &&
                  (u += '[imagesizes="' + Te(n.imageSizes) + '"]'))
              : (u += '[href="' + Te(t) + '"]');
            var V = u;
            switch (e) {
              case "style":
                V = cl(t);
                break;
              case "script":
                V = ql(t);
            }
            Je.has(V) ||
              ((t = v(
                {
                  rel: "preload",
                  href: e === "image" && n && n.imageSrcSet ? void 0 : t,
                  as: e,
                },
                n,
              )),
              Je.set(V, t),
              r.querySelector(u) !== null ||
                (e === "style" && r.querySelector(pr(V))) ||
                (e === "script" && r.querySelector(Kr(V))) ||
                ((e = r.createElement("link")),
                le(e, "link", t),
                _t(e),
                r.head.appendChild(e)));
          }
        }
        function V1(t, e) {
          Xn.m(t, e);
          var n = fl;
          if (n && t) {
            var r = e && typeof e.as == "string" ? e.as : "script",
              u =
                'link[rel="modulepreload"][as="' +
                Te(r) +
                '"][href="' +
                Te(t) +
                '"]',
              V = u;
            switch (r) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                V = ql(t);
            }
            if (
              !Je.has(V) &&
              ((t = v({ rel: "modulepreload", href: t }, e)),
              Je.set(V, t),
              n.querySelector(u) === null)
            ) {
              switch (r) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                  if (n.querySelector(Kr(V))) return;
              }
              ((r = n.createElement("link")),
                le(r, "link", t),
                _t(r),
                n.head.appendChild(r));
            }
          }
        }
        function f1(t, e, n) {
          Xn.S(t, e, n);
          var r = fl;
          if (r && t) {
            var u = Ba(r).hoistableStyles,
              V = cl(t);
            e = e || "default";
            var K = u.get(V);
            if (!K) {
              var U = { loading: 0, preload: null };
              if ((K = r.querySelector(pr(V)))) U.loading = 5;
              else {
                ((t = v(
                  { rel: "stylesheet", href: t, "data-precedence": e },
                  n,
                )),
                  (n = Je.get(V)) && js(t, n));
                var F = (K = r.createElement("link"));
                (_t(F),
                  le(F, "link", t),
                  (F._p = new Promise(function (Q, E) {
                    ((F.onload = Q), (F.onerror = E));
                  })),
                  F.addEventListener("load", function () {
                    U.loading |= 1;
                  }),
                  F.addEventListener("error", function () {
                    U.loading |= 2;
                  }),
                  (U.loading |= 4),
                  eo(K, e, r));
              }
              ((K = { type: "stylesheet", instance: K, count: 1, state: U }),
                u.set(V, K));
            }
          }
        }
        function c1(t, e) {
          Xn.X(t, e);
          var n = fl;
          if (n && t) {
            var r = Ba(n).hoistableScripts,
              u = ql(t),
              V = r.get(u);
            V ||
              ((V = n.querySelector(Kr(u))),
              V ||
                ((t = v({ src: t, async: !0 }, e)),
                (e = Je.get(u)) && Is(t, e),
                (V = n.createElement("script")),
                _t(V),
                le(V, "link", t),
                n.head.appendChild(V)),
              (V = { type: "script", instance: V, count: 1, state: null }),
              r.set(u, V));
          }
        }
        function q1(t, e) {
          Xn.M(t, e);
          var n = fl;
          if (n && t) {
            var r = Ba(n).hoistableScripts,
              u = ql(t),
              V = r.get(u);
            V ||
              ((V = n.querySelector(Kr(u))),
              V ||
                ((t = v({ src: t, async: !0, type: "module" }, e)),
                (e = Je.get(u)) && Is(t, e),
                (V = n.createElement("script")),
                _t(V),
                le(V, "link", t),
                n.head.appendChild(V)),
              (V = { type: "script", instance: V, count: 1, state: null }),
              r.set(u, V));
          }
        }
        function dp(t, e, n, r) {
          var u = (u = at.current) ? to(u) : null;
          if (!u) throw Error(o(446));
          switch (t) {
            case "meta":
            case "title":
              return null;
            case "style":
              return typeof n.precedence == "string" &&
                typeof n.href == "string"
                ? ((e = cl(n.href)),
                  (n = Ba(u).hoistableStyles),
                  (r = n.get(e)),
                  r ||
                    ((r = {
                      type: "style",
                      instance: null,
                      count: 0,
                      state: null,
                    }),
                    n.set(e, r)),
                  r)
                : { type: "void", instance: null, count: 0, state: null };
            case "link":
              if (
                n.rel === "stylesheet" &&
                typeof n.href == "string" &&
                typeof n.precedence == "string"
              ) {
                t = cl(n.href);
                var V = Ba(u).hoistableStyles,
                  K = V.get(t);
                if (
                  (K ||
                    ((u = u.ownerDocument || u),
                    (K = {
                      type: "stylesheet",
                      instance: null,
                      count: 0,
                      state: { loading: 0, preload: null },
                    }),
                    V.set(t, K),
                    (V = u.querySelector(pr(t))) &&
                      !V._p &&
                      ((K.instance = V), (K.state.loading = 5)),
                    Je.has(t) ||
                      ((n = {
                        rel: "preload",
                        as: "style",
                        href: n.href,
                        crossOrigin: n.crossOrigin,
                        integrity: n.integrity,
                        media: n.media,
                        hrefLang: n.hrefLang,
                        referrerPolicy: n.referrerPolicy,
                      }),
                      Je.set(t, n),
                      V || d1(u, t, n, K.state))),
                  e && r === null)
                )
                  throw Error(o(528, ""));
                return K;
              }
              if (e && r !== null) throw Error(o(529, ""));
              return null;
            case "script":
              return (
                (e = n.async),
                (n = n.src),
                typeof n == "string" &&
                e &&
                typeof e != "function" &&
                typeof e != "symbol"
                  ? ((e = ql(n)),
                    (n = Ba(u).hoistableScripts),
                    (r = n.get(e)),
                    r ||
                      ((r = {
                        type: "script",
                        instance: null,
                        count: 0,
                        state: null,
                      }),
                      n.set(e, r)),
                    r)
                  : { type: "void", instance: null, count: 0, state: null }
              );
            default:
              throw Error(o(444, t));
          }
        }
        function cl(t) {
          return 'href="' + Te(t) + '"';
        }
        function pr(t) {
          return 'link[rel="stylesheet"][' + t + "]";
        }
        function pp(t) {
          return v({}, t, {
            "data-precedence": t.precedence,
            precedence: null,
          });
        }
        function d1(t, e, n, r) {
          t.querySelector('link[rel="preload"][as="style"][' + e + "]")
            ? (r.loading = 1)
            : ((e = t.createElement("link")),
              (r.preload = e),
              e.addEventListener("load", function () {
                return (r.loading |= 1);
              }),
              e.addEventListener("error", function () {
                return (r.loading |= 2);
              }),
              le(e, "link", n),
              _t(e),
              t.head.appendChild(e));
        }
        function ql(t) {
          return '[src="' + Te(t) + '"]';
        }
        function Kr(t) {
          return "script[async]" + t;
        }
        function Kp(t, e, n) {
          if ((e.count++, e.instance === null))
            switch (e.type) {
              case "style":
                var r = t.querySelector(
                  'style[data-href~="' + Te(n.href) + '"]',
                );
                if (r) return ((e.instance = r), _t(r), r);
                var u = v({}, n, {
                  "data-href": n.href,
                  "data-precedence": n.precedence,
                  href: null,
                  precedence: null,
                });
                return (
                  (r = (t.ownerDocument || t).createElement("style")),
                  _t(r),
                  le(r, "style", u),
                  eo(r, n.precedence, t),
                  (e.instance = r)
                );
              case "stylesheet":
                u = cl(n.href);
                var V = t.querySelector(pr(u));
                if (V)
                  return ((e.state.loading |= 4), (e.instance = V), _t(V), V);
                ((r = pp(n)),
                  (u = Je.get(u)) && js(r, u),
                  (V = (t.ownerDocument || t).createElement("link")),
                  _t(V));
                var K = V;
                return (
                  (K._p = new Promise(function (U, F) {
                    ((K.onload = U), (K.onerror = F));
                  })),
                  le(V, "link", r),
                  (e.state.loading |= 4),
                  eo(V, n.precedence, t),
                  (e.instance = V)
                );
              case "script":
                return (
                  (V = ql(n.src)),
                  (u = t.querySelector(Kr(V)))
                    ? ((e.instance = u), _t(u), u)
                    : ((r = n),
                      (u = Je.get(V)) && ((r = v({}, n)), Is(r, u)),
                      (t = t.ownerDocument || t),
                      (u = t.createElement("script")),
                      _t(u),
                      le(u, "link", r),
                      t.head.appendChild(u),
                      (e.instance = u))
                );
              case "void":
                return null;
              default:
                throw Error(o(443, e.type));
            }
          else
            e.type === "stylesheet" &&
              (e.state.loading & 4) === 0 &&
              ((r = e.instance),
              (e.state.loading |= 4),
              eo(r, n.precedence, t));
          return e.instance;
        }
        function eo(t, e, n) {
          for (
            var r = n.querySelectorAll(
                'link[rel="stylesheet"][data-precedence],style[data-precedence]',
              ),
              u = r.length ? r[r.length - 1] : null,
              V = u,
              K = 0;
            K < r.length;
            K++
          ) {
            var U = r[K];
            if (U.dataset.precedence === e) V = U;
            else if (V !== u) break;
          }
          V
            ? V.parentNode.insertBefore(t, V.nextSibling)
            : ((e = n.nodeType === 9 ? n.head : n),
              e.insertBefore(t, e.firstChild));
        }
        function js(t, e) {
          (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
            t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
            t.title == null && (t.title = e.title));
        }
        function Is(t, e) {
          (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
            t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
            t.integrity == null && (t.integrity = e.integrity));
        }
        var no = null;
        function vp(t, e, n) {
          if (no === null) {
            var r = new Map(),
              u = (no = new Map());
            u.set(n, r);
          } else
            ((u = no), (r = u.get(n)), r || ((r = new Map()), u.set(n, r)));
          if (r.has(t)) return r;
          for (
            r.set(t, null), n = n.getElementsByTagName(t), u = 0;
            u < n.length;
            u++
          ) {
            var V = n[u];
            if (
              !(
                V[Cl] ||
                V[oe] ||
                (t === "link" && V.getAttribute("rel") === "stylesheet")
              ) &&
              V.namespaceURI !== "http://www.w3.org/2000/svg"
            ) {
              var K = V.getAttribute(e) || "";
              K = t + K;
              var U = r.get(K);
              U ? U.push(V) : r.set(K, [V]);
            }
          }
          return r;
        }
        function Up(t, e, n) {
          ((t = t.ownerDocument || t),
            t.head.insertBefore(
              n,
              e === "title" ? t.querySelector("head > title") : null,
            ));
        }
        function p1(t, e, n) {
          if (n === 1 || e.itemProp != null) return !1;
          switch (t) {
            case "meta":
            case "title":
              return !0;
            case "style":
              if (
                typeof e.precedence != "string" ||
                typeof e.href != "string" ||
                e.href === ""
              )
                break;
              return !0;
            case "link":
              if (
                typeof e.rel != "string" ||
                typeof e.href != "string" ||
                e.href === "" ||
                e.onLoad ||
                e.onError
              )
                break;
              switch (e.rel) {
                case "stylesheet":
                  return (
                    (t = e.disabled),
                    typeof e.precedence == "string" && t == null
                  );
                default:
                  return !0;
              }
            case "script":
              if (
                e.async &&
                typeof e.async != "function" &&
                typeof e.async != "symbol" &&
                !e.onLoad &&
                !e.onError &&
                e.src &&
                typeof e.src == "string"
              )
                return !0;
          }
          return !1;
        }
        function mp(t) {
          return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
        }
        var vr = null;
        function K1() {}
        function v1(t, e, n) {
          if (vr === null) throw Error(o(475));
          var r = vr;
          if (
            e.type === "stylesheet" &&
            (typeof n.media != "string" ||
              matchMedia(n.media).matches !== !1) &&
            (e.state.loading & 4) === 0
          ) {
            if (e.instance === null) {
              var u = cl(n.href),
                V = t.querySelector(pr(u));
              if (V) {
                ((t = V._p),
                  t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function" &&
                    (r.count++, (r = ao.bind(r)), t.then(r, r)),
                  (e.state.loading |= 4),
                  (e.instance = V),
                  _t(V));
                return;
              }
              ((V = t.ownerDocument || t),
                (n = pp(n)),
                (u = Je.get(u)) && js(n, u),
                (V = V.createElement("link")),
                _t(V));
              var K = V;
              ((K._p = new Promise(function (U, F) {
                ((K.onload = U), (K.onerror = F));
              })),
                le(V, "link", n),
                (e.instance = V));
            }
            (r.stylesheets === null && (r.stylesheets = new Map()),
              r.stylesheets.set(e, t),
              (t = e.state.preload) &&
                (e.state.loading & 3) === 0 &&
                (r.count++,
                (e = ao.bind(r)),
                t.addEventListener("load", e),
                t.addEventListener("error", e)));
          }
        }
        function U1() {
          if (vr === null) throw Error(o(475));
          var t = vr;
          return (
            t.stylesheets && t.count === 0 && Ds(t, t.stylesheets),
            0 < t.count
              ? function (e) {
                  var n = setTimeout(function () {
                    if ((t.stylesheets && Ds(t, t.stylesheets), t.unsuspend)) {
                      var r = t.unsuspend;
                      ((t.unsuspend = null), r());
                    }
                  }, 6e4);
                  return (
                    (t.unsuspend = e),
                    function () {
                      ((t.unsuspend = null), clearTimeout(n));
                    }
                  );
                }
              : null
          );
        }
        function ao() {
          if ((this.count--, this.count === 0)) {
            if (this.stylesheets) Ds(this, this.stylesheets);
            else if (this.unsuspend) {
              var t = this.unsuspend;
              ((this.unsuspend = null), t());
            }
          }
        }
        var lo = null;
        function Ds(t, e) {
          ((t.stylesheets = null),
            t.unsuspend !== null &&
              (t.count++,
              (lo = new Map()),
              e.forEach(m1, t),
              (lo = null),
              ao.call(t)));
        }
        function m1(t, e) {
          if (!(e.state.loading & 4)) {
            var n = lo.get(t);
            if (n) var r = n.get(null);
            else {
              ((n = new Map()), lo.set(t, n));
              for (
                var u = t.querySelectorAll(
                    "link[data-precedence],style[data-precedence]",
                  ),
                  V = 0;
                V < u.length;
                V++
              ) {
                var K = u[V];
                (K.nodeName === "LINK" ||
                  K.getAttribute("media") !== "not all") &&
                  (n.set(K.dataset.precedence, K), (r = K));
              }
              r && n.set(null, r);
            }
            ((u = e.instance),
              (K = u.getAttribute("data-precedence")),
              (V = n.get(K) || r),
              V === r && n.set(null, u),
              n.set(K, u),
              this.count++,
              (r = ao.bind(this)),
              u.addEventListener("load", r),
              u.addEventListener("error", r),
              V
                ? V.parentNode.insertBefore(u, V.nextSibling)
                : ((t = t.nodeType === 9 ? t.head : t),
                  t.insertBefore(u, t.firstChild)),
              (e.state.loading |= 4));
          }
        }
        var Ur = {
          $$typeof: Y,
          Provider: null,
          Consumer: null,
          _currentValue: _,
          _currentValue2: _,
          _threadCount: 0,
        };
        function h1(t, e, n, r, u, V, K, U) {
          ((this.tag = 1),
            (this.containerInfo = t),
            (this.pingCache = this.current = this.pendingChildren = null),
            (this.timeoutHandle = -1),
            (this.callbackNode =
              this.next =
              this.pendingContext =
              this.context =
              this.cancelPendingCommit =
                null),
            (this.callbackPriority = 0),
            (this.expirationTimes = ko(-1)),
            (this.entangledLanes =
              this.shellSuspendCounter =
              this.errorRecoveryDisabledLanes =
              this.expiredLanes =
              this.warmLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = ko(0)),
            (this.hiddenUpdates = ko(null)),
            (this.identifierPrefix = r),
            (this.onUncaughtError = u),
            (this.onCaughtError = V),
            (this.onRecoverableError = K),
            (this.pooledCache = null),
            (this.pooledCacheLanes = 0),
            (this.formState = U),
            (this.incompleteTransitions = new Map()));
        }
        function hp(t, e, n, r, u, V, K, U, F, Q, E, O) {
          return (
            (t = new h1(t, e, n, K, U, F, Q, O)),
            (e = 1),
            V === !0 && (e |= 24),
            (V = ze(3, null, null, e)),
            (t.current = V),
            (V.stateNode = t),
            (e = Qu()),
            e.refCount++,
            (t.pooledCache = e),
            e.refCount++,
            (V.memoizedState = { element: r, isDehydrated: n, cache: e }),
            Zu(V),
            t
          );
        }
        function Fp(t) {
          return t ? ((t = Pa), t) : Pa;
        }
        function yp(t, e, n, r, u, V) {
          ((u = Fp(u)),
            r.context === null ? (r.context = u) : (r.pendingContext = u),
            (r = Tn(e)),
            (r.payload = { element: n }),
            (V = V === void 0 ? null : V),
            V !== null && (r.callback = V),
            (n = Gn(t, r, e)),
            n !== null && (Re(n, t, e), Il(n, t, e)));
        }
        function Ap(t, e) {
          if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
            var n = t.retryLane;
            t.retryLane = n !== 0 && n < e ? n : e;
          }
        }
        function Ls(t, e) {
          (Ap(t, e), (t = t.alternate) && Ap(t, e));
        }
        function gp(t) {
          if (t.tag === 13) {
            var e = Ja(t, 67108864);
            (e !== null && Re(e, t, 67108864), Ls(t, 67108864));
          }
        }
        var ro = !0;
        function F1(t, e, n, r) {
          var u = T.T;
          T.T = null;
          var V = P.p;
          try {
            ((P.p = 2), ws(t, e, n, r));
          } finally {
            ((P.p = V), (T.T = u));
          }
        }
        function y1(t, e, n, r) {
          var u = T.T;
          T.T = null;
          var V = P.p;
          try {
            ((P.p = 8), ws(t, e, n, r));
          } finally {
            ((P.p = V), (T.T = u));
          }
        }
        function ws(t, e, n, r) {
          if (ro) {
            var u = _s(r);
            if (u === null) (Es(t, e, r, io, n), Wp(t, r));
            else if (g1(u, t, e, n, r)) r.stopPropagation();
            else if ((Wp(t, r), e & 4 && -1 < A1.indexOf(t))) {
              for (; u !== null; ) {
                var V = ba(u);
                if (V !== null)
                  switch (V.tag) {
                    case 3:
                      if (
                        ((V = V.stateNode),
                        V.current.memoizedState.isDehydrated)
                      ) {
                        var K = ra(V.pendingLanes);
                        if (K !== 0) {
                          var U = V;
                          for (
                            U.pendingLanes |= 2, U.entangledLanes |= 2;
                            K;
                          ) {
                            var F = 1 << (31 - We(K));
                            ((U.entanglements[1] |= F), (K &= ~F));
                          }
                          (an(V), (St & 6) === 0 && ((Ji = ge() + 500), fr(0)));
                        }
                      }
                      break;
                    case 13:
                      ((U = Ja(V, 2)),
                        U !== null && Re(U, V, 2),
                        ki(),
                        Ls(V, 2));
                  }
                if (((V = _s(r)), V === null && Es(t, e, r, io, n), V === u))
                  break;
                u = V;
              }
              u !== null && r.stopPropagation();
            } else Es(t, e, r, null, n);
          }
        }
        function _s(t) {
          return ((t = au(t)), $s(t));
        }
        var io = null;
        function $s(t) {
          if (((io = null), (t = Qa(t)), t !== null)) {
            var e = f(t);
            if (e === null) t = null;
            else {
              var n = e.tag;
              if (n === 13) {
                if (((t = c(e)), t !== null)) return t;
                t = null;
              } else if (n === 3) {
                if (e.stateNode.current.memoizedState.isDehydrated)
                  return e.tag === 3 ? e.stateNode.containerInfo : null;
                t = null;
              } else e !== t && (t = null);
            }
          }
          return ((io = t), null);
        }
        function Xp(t) {
          switch (t) {
            case "beforetoggle":
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "toggle":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
              return 2;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
              return 8;
            case "message":
              switch (u3()) {
                case Yf:
                  return 2;
                case Mf:
                  return 8;
                case _r:
                case s3:
                  return 32;
                case Of:
                  return 268435456;
                default:
                  return 32;
              }
            default:
              return 32;
          }
        }
        var tV = !1,
          Ln = null,
          wn = null,
          _n = null,
          mr = new Map(),
          hr = new Map(),
          $n = [],
          A1 =
            "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
              " ",
            );
        function Wp(t, e) {
          switch (t) {
            case "focusin":
            case "focusout":
              Ln = null;
              break;
            case "dragenter":
            case "dragleave":
              wn = null;
              break;
            case "mouseover":
            case "mouseout":
              _n = null;
              break;
            case "pointerover":
            case "pointerout":
              mr.delete(e.pointerId);
              break;
            case "gotpointercapture":
            case "lostpointercapture":
              hr.delete(e.pointerId);
          }
        }
        function Fr(t, e, n, r, u, V) {
          return t === null || t.nativeEvent !== V
            ? ((t = {
                blockedOn: e,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: V,
                targetContainers: [u],
              }),
              e !== null && ((e = ba(e)), e !== null && gp(e)),
              t)
            : ((t.eventSystemFlags |= r),
              (e = t.targetContainers),
              u !== null && e.indexOf(u) === -1 && e.push(u),
              t);
        }
        function g1(t, e, n, r, u) {
          switch (e) {
            case "focusin":
              return ((Ln = Fr(Ln, t, e, n, r, u)), !0);
            case "dragenter":
              return ((wn = Fr(wn, t, e, n, r, u)), !0);
            case "mouseover":
              return ((_n = Fr(_n, t, e, n, r, u)), !0);
            case "pointerover":
              var V = u.pointerId;
              return (mr.set(V, Fr(mr.get(V) || null, t, e, n, r, u)), !0);
            case "gotpointercapture":
              return (
                (V = u.pointerId),
                hr.set(V, Fr(hr.get(V) || null, t, e, n, r, u)),
                !0
              );
          }
          return !1;
        }
        function Sp(t) {
          var e = Qa(t.target);
          if (e !== null) {
            var n = f(e);
            if (n !== null) {
              if (((e = n.tag), e === 13)) {
                if (((e = c(n)), e !== null)) {
                  ((t.blockedOn = e),
                    v3(t.priority, function () {
                      if (n.tag === 13) {
                        var r = Be();
                        r = Ho(r);
                        var u = Ja(n, r);
                        (u !== null && Re(u, n, r), Ls(n, r));
                      }
                    }));
                  return;
                }
              } else if (
                e === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
              ) {
                t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
              }
            }
          }
          t.blockedOn = null;
        }
        function oo(t) {
          if (t.blockedOn !== null) return !1;
          for (var e = t.targetContainers; 0 < e.length; ) {
            var n = _s(t.nativeEvent);
            if (n === null) {
              n = t.nativeEvent;
              var r = new n.constructor(n.type, n);
              ((nu = r), n.target.dispatchEvent(r), (nu = null));
            } else
              return ((e = ba(n)), e !== null && gp(e), (t.blockedOn = n), !1);
            e.shift();
          }
          return !0;
        }
        function zp(t, e, n) {
          oo(t) && n.delete(e);
        }
        function X1() {
          ((tV = !1),
            Ln !== null && oo(Ln) && (Ln = null),
            wn !== null && oo(wn) && (wn = null),
            _n !== null && oo(_n) && (_n = null),
            mr.forEach(zp),
            hr.forEach(zp));
        }
        function uo(t, e) {
          t.blockedOn === e &&
            ((t.blockedOn = null),
            tV ||
              ((tV = !0),
              a.unstable_scheduleCallback(a.unstable_NormalPriority, X1)));
        }
        var so = null;
        function Cp(t) {
          so !== t &&
            ((so = t),
            a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
              so === t && (so = null);
              for (var e = 0; e < t.length; e += 3) {
                var n = t[e],
                  r = t[e + 1],
                  u = t[e + 2];
                if (typeof r != "function") {
                  if ($s(r || n) === null) continue;
                  break;
                }
                var V = ba(n);
                V !== null &&
                  (t.splice(e, 3),
                  (e -= 3),
                  $u(
                    V,
                    { pending: !0, data: u, method: n.method, action: r },
                    r,
                    u,
                  ));
              }
            }));
        }
        function yr(t) {
          function e(F) {
            return uo(F, t);
          }
          (Ln !== null && uo(Ln, t),
            wn !== null && uo(wn, t),
            _n !== null && uo(_n, t),
            mr.forEach(e),
            hr.forEach(e));
          for (var n = 0; n < $n.length; n++) {
            var r = $n[n];
            r.blockedOn === t && (r.blockedOn = null);
          }
          for (; 0 < $n.length && ((n = $n[0]), n.blockedOn === null); )
            (Sp(n), n.blockedOn === null && $n.shift());
          if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
            for (r = 0; r < n.length; r += 3) {
              var u = n[r],
                V = n[r + 1],
                K = u[Ke] || null;
              if (typeof V == "function") K || Cp(n);
              else if (K) {
                var U = null;
                if (V && V.hasAttribute("formAction")) {
                  if (((u = V), (K = V[Ke] || null))) U = K.formAction;
                  else if ($s(u) !== null) continue;
                } else U = K.action;
                (typeof U == "function"
                  ? (n[r + 1] = U)
                  : (n.splice(r, 3), (r -= 3)),
                  Cp(n));
              }
            }
        }
        function eV(t) {
          this._internalRoot = t;
        }
        ((Vo.prototype.render = eV.prototype.render =
          function (t) {
            var e = this._internalRoot;
            if (e === null) throw Error(o(409));
            var n = e.current,
              r = Be();
            yp(n, r, t, e, null, null);
          }),
          (Vo.prototype.unmount = eV.prototype.unmount =
            function () {
              var t = this._internalRoot;
              if (t !== null) {
                this._internalRoot = null;
                var e = t.containerInfo;
                (yp(t.current, 2, null, t, null, null), ki(), (e[Ca] = null));
              }
            }));
        function Vo(t) {
          this._internalRoot = t;
        }
        Vo.prototype.unstable_scheduleHydration = function (t) {
          if (t) {
            var e = Hf();
            t = { blockedOn: null, target: t, priority: e };
            for (
              var n = 0;
              n < $n.length && e !== 0 && e < $n[n].priority;
              n++
            );
            ($n.splice(n, 0, t), n === 0 && Sp(t));
          }
        };
        var Qp = l.version;
        if (Qp !== "19.1.0") throw Error(o(527, Qp, "19.1.0"));
        P.findDOMNode = function (t) {
          var e = t._reactInternals;
          if (e === void 0)
            throw typeof t.render == "function"
              ? Error(o(188))
              : ((t = Object.keys(t).join(",")), Error(o(268, t)));
          return (
            (t = p(e)),
            (t = t !== null ? d(t) : null),
            (t = t === null ? null : t.stateNode),
            t
          );
        };
        var W1 = {
          bundleType: 0,
          version: "19.1.0",
          rendererPackageName: "react-dom",
          currentDispatcherRef: T,
          reconcilerVersion: "19.1.0",
        };
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
          var fo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!fo.isDisabled && fo.supportsFiber)
            try {
              ((Wl = fo.inject(W1)), (Xe = fo));
            } catch {}
        }
        return (
          (gr.createRoot = function (t, e) {
            if (!s(t)) throw Error(o(299));
            var n = !1,
              r = "",
              u = Hq,
              V = jq,
              K = Iq,
              U = null;
            return (
              e != null &&
                (e.unstable_strictMode === !0 && (n = !0),
                e.identifierPrefix !== void 0 && (r = e.identifierPrefix),
                e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
                e.onCaughtError !== void 0 && (V = e.onCaughtError),
                e.onRecoverableError !== void 0 && (K = e.onRecoverableError),
                e.unstable_transitionCallbacks !== void 0 &&
                  (U = e.unstable_transitionCallbacks)),
              (e = hp(t, 1, !1, null, null, n, r, u, V, K, U, null)),
              (t[Ca] = e.current),
              Gs(t),
              new eV(e)
            );
          }),
          (gr.hydrateRoot = function (t, e, n) {
            if (!s(t)) throw Error(o(299));
            var r = !1,
              u = "",
              V = Hq,
              K = jq,
              U = Iq,
              F = null,
              Q = null;
            return (
              n != null &&
                (n.unstable_strictMode === !0 && (r = !0),
                n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
                n.onUncaughtError !== void 0 && (V = n.onUncaughtError),
                n.onCaughtError !== void 0 && (K = n.onCaughtError),
                n.onRecoverableError !== void 0 && (U = n.onRecoverableError),
                n.unstable_transitionCallbacks !== void 0 &&
                  (F = n.unstable_transitionCallbacks),
                n.formState !== void 0 && (Q = n.formState)),
              (e = hp(t, 1, !0, e, n ?? null, r, u, V, K, U, F, Q)),
              (e.context = Fp(null)),
              (n = e.current),
              (r = Be()),
              (r = Ho(r)),
              (u = Tn(r)),
              (u.callback = null),
              Gn(n, u, r),
              (n = r),
              (e.current.lanes = n),
              zl(e, n),
              an(e),
              (t[Ca] = e.current),
              Gs(t),
              new Vo(e)
            );
          }),
          (gr.version = "19.1.0"),
          gr
        );
      }
      var Mp;
      function T1() {
        if (Mp) return aV.exports;
        Mp = 1;
        function a() {
          if (
            !(
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
            )
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
            } catch (l) {
              console.error(l);
            }
        }
        return (a(), (aV.exports = x1()), aV.exports);
      }
      var G1 = T1(),
        X = $V(),
        Xr = {},
        Op;
      function E1() {
        if (Op) return Xr;
        ((Op = 1),
          Object.defineProperty(Xr, "__esModule", { value: !0 }),
          (Xr.parse = c),
          (Xr.serialize = d));
        const a = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
          l = /^[\u0021-\u003A\u003C-\u007E]*$/,
          i =
            /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
          o = /^[\u0020-\u003A\u003D-\u007E]*$/,
          s = Object.prototype.toString,
          f = (() => {
            const h = function () {};
            return ((h.prototype = Object.create(null)), h);
          })();
        function c(h, y) {
          const A = new f(),
            x = h.length;
          if (x < 2) return A;
          const Z = y?.decode || v;
          let z = 0;
          do {
            const G = h.indexOf("=", z);
            if (G === -1) break;
            const Y = h.indexOf(";", z),
              L = Y === -1 ? x : Y;
            if (G > L) {
              z = h.lastIndexOf(";", G - 1) + 1;
              continue;
            }
            const N = q(h, z, G),
              I = p(h, G, N),
              nt = h.slice(N, I);
            if (A[nt] === void 0) {
              let k = q(h, G + 1, L),
                lt = p(h, L, k);
              const pt = Z(h.slice(k, lt));
              A[nt] = pt;
            }
            z = L + 1;
          } while (z < x);
          return A;
        }
        function q(h, y, A) {
          do {
            const x = h.charCodeAt(y);
            if (x !== 32 && x !== 9) return y;
          } while (++y < A);
          return A;
        }
        function p(h, y, A) {
          for (; y > A; ) {
            const x = h.charCodeAt(--y);
            if (x !== 32 && x !== 9) return y + 1;
          }
          return A;
        }
        function d(h, y, A) {
          const x = A?.encode || encodeURIComponent;
          if (!a.test(h)) throw new TypeError(`argument name is invalid: ${h}`);
          const Z = x(y);
          if (!l.test(Z)) throw new TypeError(`argument val is invalid: ${y}`);
          let z = h + "=" + Z;
          if (!A) return z;
          if (A.maxAge !== void 0) {
            if (!Number.isInteger(A.maxAge))
              throw new TypeError(`option maxAge is invalid: ${A.maxAge}`);
            z += "; Max-Age=" + A.maxAge;
          }
          if (A.domain) {
            if (!i.test(A.domain))
              throw new TypeError(`option domain is invalid: ${A.domain}`);
            z += "; Domain=" + A.domain;
          }
          if (A.path) {
            if (!o.test(A.path))
              throw new TypeError(`option path is invalid: ${A.path}`);
            z += "; Path=" + A.path;
          }
          if (A.expires) {
            if (!m(A.expires) || !Number.isFinite(A.expires.valueOf()))
              throw new TypeError(`option expires is invalid: ${A.expires}`);
            z += "; Expires=" + A.expires.toUTCString();
          }
          if (
            (A.httpOnly && (z += "; HttpOnly"),
            A.secure && (z += "; Secure"),
            A.partitioned && (z += "; Partitioned"),
            A.priority)
          )
            switch (
              typeof A.priority == "string" ? A.priority.toLowerCase() : void 0
            ) {
              case "low":
                z += "; Priority=Low";
                break;
              case "medium":
                z += "; Priority=Medium";
                break;
              case "high":
                z += "; Priority=High";
                break;
              default:
                throw new TypeError(
                  `option priority is invalid: ${A.priority}`,
                );
            }
          if (A.sameSite)
            switch (
              typeof A.sameSite == "string"
                ? A.sameSite.toLowerCase()
                : A.sameSite
            ) {
              case !0:
              case "strict":
                z += "; SameSite=Strict";
                break;
              case "lax":
                z += "; SameSite=Lax";
                break;
              case "none":
                z += "; SameSite=None";
                break;
              default:
                throw new TypeError(
                  `option sameSite is invalid: ${A.sameSite}`,
                );
            }
          return z;
        }
        function v(h) {
          if (h.indexOf("%") === -1) return h;
          try {
            return decodeURIComponent(h);
          } catch {
            return h;
          }
        }
        function m(h) {
          return s.call(h) === "[object Date]";
        }
        return Xr;
      }
      E1();
      var Np = "popstate";
      function Y1(a = {}) {
        function l(o, s) {
          let { pathname: f, search: c, hash: q } = o.location;
          return zV(
            "",
            { pathname: f, search: c, hash: q },
            (s.state && s.state.usr) || null,
            (s.state && s.state.key) || "default",
          );
        }
        function i(o, s) {
          return typeof s == "string" ? s : Tr(s);
        }
        return O1(l, i, null, a);
      }
      function Yt(a, l) {
        if (a === !1 || a === null || typeof a > "u") throw new Error(l);
      }
      function un(a, l) {
        if (!a) {
          typeof console < "u" && console.warn(l);
          try {
            throw new Error(l);
          } catch {}
        }
      }
      function M1() {
        return Math.random().toString(36).substring(2, 10);
      }
      function Jp(a, l) {
        return { usr: a.state, key: a.key, idx: l };
      }
      function zV(a, l, i = null, o) {
        return {
          pathname: typeof a == "string" ? a : a.pathname,
          search: "",
          hash: "",
          ...(typeof l == "string" ? Fl(l) : l),
          state: i,
          key: (l && l.key) || o || M1(),
        };
      }
      function Tr({ pathname: a = "/", search: l = "", hash: i = "" }) {
        return (
          l && l !== "?" && (a += l.charAt(0) === "?" ? l : "?" + l),
          i && i !== "#" && (a += i.charAt(0) === "#" ? i : "#" + i),
          a
        );
      }
      function Fl(a) {
        let l = {};
        if (a) {
          let i = a.indexOf("#");
          i >= 0 && ((l.hash = a.substring(i)), (a = a.substring(0, i)));
          let o = a.indexOf("?");
          (o >= 0 && ((l.search = a.substring(o)), (a = a.substring(0, o))),
            a && (l.pathname = a));
        }
        return l;
      }
      function O1(a, l, i, o = {}) {
        let { window: s = document.defaultView, v5Compat: f = !1 } = o,
          c = s.history,
          q = "POP",
          p = null,
          d = v();
        d == null && ((d = 0), c.replaceState({ ...c.state, idx: d }, ""));
        function v() {
          return (c.state || { idx: null }).idx;
        }
        function m() {
          q = "POP";
          let Z = v(),
            z = Z == null ? null : Z - d;
          ((d = Z), p && p({ action: q, location: x.location, delta: z }));
        }
        function h(Z, z) {
          q = "PUSH";
          let G = zV(x.location, Z, z);
          d = v() + 1;
          let Y = Jp(G, d),
            L = x.createHref(G);
          try {
            c.pushState(Y, "", L);
          } catch (N) {
            if (N instanceof DOMException && N.name === "DataCloneError")
              throw N;
            s.location.assign(L);
          }
          f && p && p({ action: q, location: x.location, delta: 1 });
        }
        function y(Z, z) {
          q = "REPLACE";
          let G = zV(x.location, Z, z);
          d = v();
          let Y = Jp(G, d),
            L = x.createHref(G);
          (c.replaceState(Y, "", L),
            f && p && p({ action: q, location: x.location, delta: 0 }));
        }
        function A(Z) {
          let z =
              s.location.origin !== "null"
                ? s.location.origin
                : s.location.href,
            G = typeof Z == "string" ? Z : Tr(Z);
          return (
            (G = G.replace(/ $/, "%20")),
            Yt(
              z,
              `No window.location.(origin|href) available to create URL for href: ${G}`,
            ),
            new URL(G, z)
          );
        }
        let x = {
          get action() {
            return q;
          },
          get location() {
            return a(s, c);
          },
          listen(Z) {
            if (p)
              throw new Error("A history only accepts one active listener");
            return (
              s.addEventListener(Np, m),
              (p = Z),
              () => {
                (s.removeEventListener(Np, m), (p = null));
              }
            );
          },
          createHref(Z) {
            return l(s, Z);
          },
          createURL: A,
          encodeLocation(Z) {
            let z = A(Z);
            return { pathname: z.pathname, search: z.search, hash: z.hash };
          },
          push: h,
          replace: y,
          go(Z) {
            return c.go(Z);
          },
        };
        return x;
      }
      function dv(a, l, i = "/") {
        return N1(a, l, i, !1);
      }
      function N1(a, l, i, o) {
        let s = typeof l == "string" ? Fl(l) : l,
          f = Sn(s.pathname || "/", i);
        if (f == null) return null;
        let c = pv(a);
        J1(c);
        let q = null;
        for (let p = 0; q == null && p < c.length; ++p) {
          let d = tm(f);
          q = _1(c[p], d, o);
        }
        return q;
      }
      function pv(a, l = [], i = [], o = "") {
        let s = (f, c, q) => {
          let p = {
            relativePath: q === void 0 ? f.path || "" : q,
            caseSensitive: f.caseSensitive === !0,
            childrenIndex: c,
            route: f,
          };
          p.relativePath.startsWith("/") &&
            (Yt(
              p.relativePath.startsWith(o),
              `Absolute route path "${p.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
            ),
            (p.relativePath = p.relativePath.slice(o.length)));
          let d = Wn([o, p.relativePath]),
            v = i.concat(p);
          (f.children &&
            f.children.length > 0 &&
            (Yt(
              f.index !== !0,
              `Index routes must not have child routes. Please remove all child routes from route path "${d}".`,
            ),
            pv(f.children, l, v, d)),
            !(f.path == null && !f.index) &&
              l.push({ path: d, score: L1(d, f.index), routesMeta: v }));
        };
        return (
          a.forEach((f, c) => {
            if (f.path === "" || !f.path?.includes("?")) s(f, c);
            else for (let q of Kv(f.path)) s(f, c, q);
          }),
          l
        );
      }
      function Kv(a) {
        let l = a.split("/");
        if (l.length === 0) return [];
        let [i, ...o] = l,
          s = i.endsWith("?"),
          f = i.replace(/\?$/, "");
        if (o.length === 0) return s ? [f, ""] : [f];
        let c = Kv(o.join("/")),
          q = [];
        return (
          q.push(...c.map((p) => (p === "" ? f : [f, p].join("/")))),
          s && q.push(...c),
          q.map((p) => (a.startsWith("/") && p === "" ? "/" : p))
        );
      }
      function J1(a) {
        a.sort((l, i) =>
          l.score !== i.score
            ? i.score - l.score
            : w1(
                l.routesMeta.map((o) => o.childrenIndex),
                i.routesMeta.map((o) => o.childrenIndex),
              ),
        );
      }
      var P1 = /^:[\w-]+$/,
        k1 = 3,
        H1 = 2,
        j1 = 1,
        I1 = 10,
        D1 = -2,
        Pp = (a) => a === "*";
      function L1(a, l) {
        let i = a.split("/"),
          o = i.length;
        return (
          i.some(Pp) && (o += D1),
          l && (o += H1),
          i
            .filter((s) => !Pp(s))
            .reduce((s, f) => s + (P1.test(f) ? k1 : f === "" ? j1 : I1), o)
        );
      }
      function w1(a, l) {
        return a.length === l.length &&
          a.slice(0, -1).every((o, s) => o === l[s])
          ? a[a.length - 1] - l[l.length - 1]
          : 0;
      }
      function _1(a, l, i = !1) {
        let { routesMeta: o } = a,
          s = {},
          f = "/",
          c = [];
        for (let q = 0; q < o.length; ++q) {
          let p = o[q],
            d = q === o.length - 1,
            v = f === "/" ? l : l.slice(f.length) || "/",
            m = zo(
              { path: p.relativePath, caseSensitive: p.caseSensitive, end: d },
              v,
            ),
            h = p.route;
          if (
            (!m &&
              d &&
              i &&
              !o[o.length - 1].route.index &&
              (m = zo(
                {
                  path: p.relativePath,
                  caseSensitive: p.caseSensitive,
                  end: !1,
                },
                v,
              )),
            !m)
          )
            return null;
          (Object.assign(s, m.params),
            c.push({
              params: s,
              pathname: Wn([f, m.pathname]),
              pathnameBase: lm(Wn([f, m.pathnameBase])),
              route: h,
            }),
            m.pathnameBase !== "/" && (f = Wn([f, m.pathnameBase])));
        }
        return c;
      }
      function zo(a, l) {
        typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
        let [i, o] = $1(a.path, a.caseSensitive, a.end),
          s = l.match(i);
        if (!s) return null;
        let f = s[0],
          c = f.replace(/(.)\/+$/, "$1"),
          q = s.slice(1);
        return {
          params: o.reduce((d, { paramName: v, isOptional: m }, h) => {
            if (v === "*") {
              let A = q[h] || "";
              c = f.slice(0, f.length - A.length).replace(/(.)\/+$/, "$1");
            }
            const y = q[h];
            return (
              m && !y
                ? (d[v] = void 0)
                : (d[v] = (y || "").replace(/%2F/g, "/")),
              d
            );
          }, {}),
          pathname: f,
          pathnameBase: c,
          pattern: a,
        };
      }
      function $1(a, l = !1, i = !0) {
        un(
          a === "*" || !a.endsWith("*") || a.endsWith("/*"),
          `Route path "${a}" will be treated as if it were "${a.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/, "/*")}".`,
        );
        let o = [],
          s =
            "^" +
            a
              .replace(/\/*\*?$/, "")
              .replace(/^\/*/, "/")
              .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
              .replace(
                /\/:([\w-]+)(\?)?/g,
                (c, q, p) => (
                  o.push({ paramName: q, isOptional: p != null }),
                  p ? "/?([^\\/]+)?" : "/([^\\/]+)"
                ),
              );
        return (
          a.endsWith("*")
            ? (o.push({ paramName: "*" }),
              (s += a === "*" || a === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
            : i
              ? (s += "\\/*$")
              : a !== "" && a !== "/" && (s += "(?:(?=\\/|$))"),
          [new RegExp(s, l ? void 0 : "i"), o]
        );
      }
      function tm(a) {
        try {
          return a
            .split("/")
            .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
            .join("/");
        } catch (l) {
          return (
            un(
              !1,
              `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`,
            ),
            a
          );
        }
      }
      function Sn(a, l) {
        if (l === "/") return a;
        if (!a.toLowerCase().startsWith(l.toLowerCase())) return null;
        let i = l.endsWith("/") ? l.length - 1 : l.length,
          o = a.charAt(i);
        return o && o !== "/" ? null : a.slice(i) || "/";
      }
      function em(a, l = "/") {
        let {
          pathname: i,
          search: o = "",
          hash: s = "",
        } = typeof a == "string" ? Fl(a) : a;
        return {
          pathname: i ? (i.startsWith("/") ? i : nm(i, l)) : l,
          search: rm(o),
          hash: im(s),
        };
      }
      function nm(a, l) {
        let i = l.replace(/\/+$/, "").split("/");
        return (
          a.split("/").forEach((s) => {
            s === ".." ? i.length > 1 && i.pop() : s !== "." && i.push(s);
          }),
          i.length > 1 ? i.join("/") : "/"
        );
      }
      function uV(a, l, i, o) {
        return `Cannot include a '${a}' character in a manually specified \`to.${l}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
      }
      function am(a) {
        return a.filter(
          (l, i) => i === 0 || (l.route.path && l.route.path.length > 0),
        );
      }
      function vv(a) {
        let l = am(a);
        return l.map((i, o) =>
          o === l.length - 1 ? i.pathname : i.pathnameBase,
        );
      }
      function Uv(a, l, i, o = !1) {
        let s;
        typeof a == "string"
          ? (s = Fl(a))
          : ((s = { ...a }),
            Yt(
              !s.pathname || !s.pathname.includes("?"),
              uV("?", "pathname", "search", s),
            ),
            Yt(
              !s.pathname || !s.pathname.includes("#"),
              uV("#", "pathname", "hash", s),
            ),
            Yt(
              !s.search || !s.search.includes("#"),
              uV("#", "search", "hash", s),
            ));
        let f = a === "" || s.pathname === "",
          c = f ? "/" : s.pathname,
          q;
        if (c == null) q = i;
        else {
          let m = l.length - 1;
          if (!o && c.startsWith("..")) {
            let h = c.split("/");
            for (; h[0] === ".."; ) (h.shift(), (m -= 1));
            s.pathname = h.join("/");
          }
          q = m >= 0 ? l[m] : "/";
        }
        let p = em(s, q),
          d = c && c !== "/" && c.endsWith("/"),
          v = (f || c === ".") && i.endsWith("/");
        return (
          !p.pathname.endsWith("/") && (d || v) && (p.pathname += "/"),
          p
        );
      }
      var Wn = (a) => a.join("/").replace(/\/\/+/g, "/"),
        lm = (a) => a.replace(/\/+$/, "").replace(/^\/*/, "/"),
        rm = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
        im = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a);
      function om(a) {
        return (
          a != null &&
          typeof a.status == "number" &&
          typeof a.statusText == "string" &&
          typeof a.internal == "boolean" &&
          "data" in a
        );
      }
      var mv = ["POST", "PUT", "PATCH", "DELETE"];
      new Set(mv);
      var um = ["GET", ...mv];
      new Set(um);
      var yl = X.createContext(null);
      yl.displayName = "DataRouter";
      var Go = X.createContext(null);
      Go.displayName = "DataRouterState";
      var hv = X.createContext({ isTransitioning: !1 });
      hv.displayName = "ViewTransition";
      var sm = X.createContext(new Map());
      sm.displayName = "Fetchers";
      var Vm = X.createContext(null);
      Vm.displayName = "Await";
      var sn = X.createContext(null);
      sn.displayName = "Navigation";
      var kr = X.createContext(null);
      kr.displayName = "Location";
      var Qn = X.createContext({ outlet: null, matches: [], isDataRoute: !1 });
      Qn.displayName = "Route";
      var tf = X.createContext(null);
      tf.displayName = "RouteError";
      function fm(a, { relative: l } = {}) {
        Yt(
          Hr(),
          "useHref() may be used only in the context of a <Router> component.",
        );
        let { basename: i, navigator: o } = X.useContext(sn),
          { hash: s, pathname: f, search: c } = jr(a, { relative: l }),
          q = f;
        return (
          i !== "/" && (q = f === "/" ? i : Wn([i, f])),
          o.createHref({ pathname: q, search: c, hash: s })
        );
      }
      function Hr() {
        return X.useContext(kr) != null;
      }
      function Vn() {
        return (
          Yt(
            Hr(),
            "useLocation() may be used only in the context of a <Router> component.",
          ),
          X.useContext(kr).location
        );
      }
      var Fv =
        "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
      function yv(a) {
        X.useContext(sn).static || X.useLayoutEffect(a);
      }
      function Eo() {
        let { isDataRoute: a } = X.useContext(Qn);
        return a ? gm() : cm();
      }
      function cm() {
        Yt(
          Hr(),
          "useNavigate() may be used only in the context of a <Router> component.",
        );
        let a = X.useContext(yl),
          { basename: l, navigator: i } = X.useContext(sn),
          { matches: o } = X.useContext(Qn),
          { pathname: s } = Vn(),
          f = JSON.stringify(vv(o)),
          c = X.useRef(!1);
        return (
          yv(() => {
            c.current = !0;
          }),
          X.useCallback(
            (p, d = {}) => {
              if ((un(c.current, Fv), !c.current)) return;
              if (typeof p == "number") {
                i.go(p);
                return;
              }
              let v = Uv(p, JSON.parse(f), s, d.relative === "path");
              (a == null &&
                l !== "/" &&
                (v.pathname = v.pathname === "/" ? l : Wn([l, v.pathname])),
                (d.replace ? i.replace : i.push)(v, d.state, d));
            },
            [l, i, f, s, a],
          )
        );
      }
      X.createContext(null);
      function jr(a, { relative: l } = {}) {
        let { matches: i } = X.useContext(Qn),
          { pathname: o } = Vn(),
          s = JSON.stringify(vv(i));
        return X.useMemo(
          () => Uv(a, JSON.parse(s), o, l === "path"),
          [a, s, o, l],
        );
      }
      function qm(a, l) {
        return Av(a, l);
      }
      function Av(a, l, i, o) {
        Yt(
          Hr(),
          "useRoutes() may be used only in the context of a <Router> component.",
        );
        let { navigator: s, static: f } = X.useContext(sn),
          { matches: c } = X.useContext(Qn),
          q = c[c.length - 1],
          p = q ? q.params : {},
          d = q ? q.pathname : "/",
          v = q ? q.pathnameBase : "/",
          m = q && q.route;
        {
          let G = (m && m.path) || "";
          gv(
            d,
            !m || G.endsWith("*") || G.endsWith("*?"),
            `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${G}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${G}"> to <Route path="${G === "/" ? "*" : `${G}/*`}">.`,
          );
        }
        let h = Vn(),
          y;
        if (l) {
          let G = typeof l == "string" ? Fl(l) : l;
          (Yt(
            v === "/" || G.pathname?.startsWith(v),
            `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${G.pathname}" was given in the \`location\` prop.`,
          ),
            (y = G));
        } else y = h;
        let A = y.pathname || "/",
          x = A;
        if (v !== "/") {
          let G = v.replace(/^\//, "").split("/");
          x = "/" + A.replace(/^\//, "").split("/").slice(G.length).join("/");
        }
        let Z =
          !f && i && i.matches && i.matches.length > 0
            ? i.matches
            : dv(a, { pathname: x });
        (un(
          m || Z != null,
          `No routes matched location "${y.pathname}${y.search}${y.hash}" `,
        ),
          un(
            Z == null ||
              Z[Z.length - 1].route.element !== void 0 ||
              Z[Z.length - 1].route.Component !== void 0 ||
              Z[Z.length - 1].route.lazy !== void 0,
            `Matched leaf route at location "${y.pathname}${y.search}${y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
          ));
        let z = Um(
          Z &&
            Z.map((G) =>
              Object.assign({}, G, {
                params: Object.assign({}, p, G.params),
                pathname: Wn([
                  v,
                  s.encodeLocation
                    ? s.encodeLocation(G.pathname).pathname
                    : G.pathname,
                ]),
                pathnameBase:
                  G.pathnameBase === "/"
                    ? v
                    : Wn([
                        v,
                        s.encodeLocation
                          ? s.encodeLocation(G.pathnameBase).pathname
                          : G.pathnameBase,
                      ]),
              }),
            ),
          c,
          i,
          o,
        );
        return l && z
          ? X.createElement(
              kr.Provider,
              {
                value: {
                  location: {
                    pathname: "/",
                    search: "",
                    hash: "",
                    state: null,
                    key: "default",
                    ...y,
                  },
                  navigationType: "POP",
                },
              },
              z,
            )
          : z;
      }
      function dm() {
        let a = Am(),
          l = om(a)
            ? `${a.status} ${a.statusText}`
            : a instanceof Error
              ? a.message
              : JSON.stringify(a),
          i = a instanceof Error ? a.stack : null,
          o = "rgba(200,200,200, 0.5)",
          s = { padding: "0.5rem", backgroundColor: o },
          f = { padding: "2px 4px", backgroundColor: o },
          c = null;
        return (
          console.error(
            "Error handled by React Router default ErrorBoundary:",
            a,
          ),
          (c = X.createElement(
            X.Fragment,
            null,
            X.createElement("p", null, "💿 Hey developer 👋"),
            X.createElement(
              "p",
              null,
              "You can provide a way better UX than this when your app throws errors by providing your own ",
              X.createElement("code", { style: f }, "ErrorBoundary"),
              " or",
              " ",
              X.createElement("code", { style: f }, "errorElement"),
              " prop on your route.",
            ),
          )),
          X.createElement(
            X.Fragment,
            null,
            X.createElement("h2", null, "Unexpected Application Error!"),
            X.createElement("h3", { style: { fontStyle: "italic" } }, l),
            i ? X.createElement("pre", { style: s }, i) : null,
            c,
          )
        );
      }
      var pm = X.createElement(dm, null),
        Km = class extends X.Component {
          constructor(a) {
            (super(a),
              (this.state = {
                location: a.location,
                revalidation: a.revalidation,
                error: a.error,
              }));
          }
          static getDerivedStateFromError(a) {
            return { error: a };
          }
          static getDerivedStateFromProps(a, l) {
            return l.location !== a.location ||
              (l.revalidation !== "idle" && a.revalidation === "idle")
              ? {
                  error: a.error,
                  location: a.location,
                  revalidation: a.revalidation,
                }
              : {
                  error: a.error !== void 0 ? a.error : l.error,
                  location: l.location,
                  revalidation: a.revalidation || l.revalidation,
                };
          }
          componentDidCatch(a, l) {
            console.error(
              "React Router caught the following error during render",
              a,
              l,
            );
          }
          render() {
            return this.state.error !== void 0
              ? X.createElement(
                  Qn.Provider,
                  { value: this.props.routeContext },
                  X.createElement(tf.Provider, {
                    value: this.state.error,
                    children: this.props.component,
                  }),
                )
              : this.props.children;
          }
        };
      function vm({ routeContext: a, match: l, children: i }) {
        let o = X.useContext(yl);
        return (
          o &&
            o.static &&
            o.staticContext &&
            (l.route.errorElement || l.route.ErrorBoundary) &&
            (o.staticContext._deepestRenderedBoundaryId = l.route.id),
          X.createElement(Qn.Provider, { value: a }, i)
        );
      }
      function Um(a, l = [], i = null, o = null) {
        if (a == null) {
          if (!i) return null;
          if (i.errors) a = i.matches;
          else if (l.length === 0 && !i.initialized && i.matches.length > 0)
            a = i.matches;
          else return null;
        }
        let s = a,
          f = i?.errors;
        if (f != null) {
          let p = s.findIndex((d) => d.route.id && f?.[d.route.id] !== void 0);
          (Yt(
            p >= 0,
            `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`,
          ),
            (s = s.slice(0, Math.min(s.length, p + 1))));
        }
        let c = !1,
          q = -1;
        if (i)
          for (let p = 0; p < s.length; p++) {
            let d = s[p];
            if (
              ((d.route.HydrateFallback || d.route.hydrateFallbackElement) &&
                (q = p),
              d.route.id)
            ) {
              let { loaderData: v, errors: m } = i,
                h =
                  d.route.loader &&
                  !v.hasOwnProperty(d.route.id) &&
                  (!m || m[d.route.id] === void 0);
              if (d.route.lazy || h) {
                ((c = !0), q >= 0 ? (s = s.slice(0, q + 1)) : (s = [s[0]]));
                break;
              }
            }
          }
        return s.reduceRight((p, d, v) => {
          let m,
            h = !1,
            y = null,
            A = null;
          i &&
            ((m = f && d.route.id ? f[d.route.id] : void 0),
            (y = d.route.errorElement || pm),
            c &&
              (q < 0 && v === 0
                ? (gv(
                    "route-fallback",
                    !1,
                    "No `HydrateFallback` element provided to render during initial hydration",
                  ),
                  (h = !0),
                  (A = null))
                : q === v &&
                  ((h = !0), (A = d.route.hydrateFallbackElement || null))));
          let x = l.concat(s.slice(0, v + 1)),
            Z = () => {
              let z;
              return (
                m
                  ? (z = y)
                  : h
                    ? (z = A)
                    : d.route.Component
                      ? (z = X.createElement(d.route.Component, null))
                      : d.route.element
                        ? (z = d.route.element)
                        : (z = p),
                X.createElement(vm, {
                  match: d,
                  routeContext: {
                    outlet: p,
                    matches: x,
                    isDataRoute: i != null,
                  },
                  children: z,
                })
              );
            };
          return i && (d.route.ErrorBoundary || d.route.errorElement || v === 0)
            ? X.createElement(Km, {
                location: i.location,
                revalidation: i.revalidation,
                component: y,
                error: m,
                children: Z(),
                routeContext: { outlet: null, matches: x, isDataRoute: !0 },
              })
            : Z();
        }, null);
      }
      function ef(a) {
        return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
      }
      function mm(a) {
        let l = X.useContext(yl);
        return (Yt(l, ef(a)), l);
      }
      function hm(a) {
        let l = X.useContext(Go);
        return (Yt(l, ef(a)), l);
      }
      function Fm(a) {
        let l = X.useContext(Qn);
        return (Yt(l, ef(a)), l);
      }
      function nf(a) {
        let l = Fm(a),
          i = l.matches[l.matches.length - 1];
        return (
          Yt(
            i.route.id,
            `${a} can only be used on routes that contain a unique "id"`,
          ),
          i.route.id
        );
      }
      function ym() {
        return nf("useRouteId");
      }
      function Am() {
        let a = X.useContext(tf),
          l = hm("useRouteError"),
          i = nf("useRouteError");
        return a !== void 0 ? a : l.errors?.[i];
      }
      function gm() {
        let { router: a } = mm("useNavigate"),
          l = nf("useNavigate"),
          i = X.useRef(!1);
        return (
          yv(() => {
            i.current = !0;
          }),
          X.useCallback(
            async (s, f = {}) => {
              (un(i.current, Fv),
                i.current &&
                  (typeof s == "number"
                    ? a.navigate(s)
                    : await a.navigate(s, { fromRouteId: l, ...f })));
            },
            [a, l],
          )
        );
      }
      var kp = {};
      function gv(a, l, i) {
        !l && !kp[a] && ((kp[a] = !0), un(!1, i));
      }
      X.memo(Xm);
      function Xm({ routes: a, future: l, state: i }) {
        return Av(a, void 0, i, l);
      }
      function mo(a) {
        Yt(
          !1,
          "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
        );
      }
      function Wm({
        basename: a = "/",
        children: l = null,
        location: i,
        navigationType: o = "POP",
        navigator: s,
        static: f = !1,
      }) {
        Yt(
          !Hr(),
          "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
        );
        let c = a.replace(/^\/*/, "/"),
          q = X.useMemo(
            () => ({ basename: c, navigator: s, static: f, future: {} }),
            [c, s, f],
          );
        typeof i == "string" && (i = Fl(i));
        let {
            pathname: p = "/",
            search: d = "",
            hash: v = "",
            state: m = null,
            key: h = "default",
          } = i,
          y = X.useMemo(() => {
            let A = Sn(p, c);
            return A == null
              ? null
              : {
                  location: {
                    pathname: A,
                    search: d,
                    hash: v,
                    state: m,
                    key: h,
                  },
                  navigationType: o,
                };
          }, [c, p, d, v, m, h, o]);
        return (
          un(
            y != null,
            `<Router basename="${c}"> is not able to match the URL "${p}${d}${v}" because it does not start with the basename, so the <Router> won't render anything.`,
          ),
          y == null
            ? null
            : X.createElement(
                sn.Provider,
                { value: q },
                X.createElement(kr.Provider, { children: l, value: y }),
              )
        );
      }
      function Sm({ children: a, location: l }) {
        return qm(CV(a), l);
      }
      function CV(a, l = []) {
        let i = [];
        return (
          X.Children.forEach(a, (o, s) => {
            if (!X.isValidElement(o)) return;
            let f = [...l, s];
            if (o.type === X.Fragment) {
              i.push.apply(i, CV(o.props.children, f));
              return;
            }
            (Yt(
              o.type === mo,
              `[${typeof o.type == "string" ? o.type : o.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
            ),
              Yt(
                !o.props.index || !o.props.children,
                "An index route cannot have child routes.",
              ));
            let c = {
              id: o.props.id || f.join("-"),
              caseSensitive: o.props.caseSensitive,
              element: o.props.element,
              Component: o.props.Component,
              index: o.props.index,
              path: o.props.path,
              loader: o.props.loader,
              action: o.props.action,
              hydrateFallbackElement: o.props.hydrateFallbackElement,
              HydrateFallback: o.props.HydrateFallback,
              errorElement: o.props.errorElement,
              ErrorBoundary: o.props.ErrorBoundary,
              hasErrorBoundary:
                o.props.hasErrorBoundary === !0 ||
                o.props.ErrorBoundary != null ||
                o.props.errorElement != null,
              shouldRevalidate: o.props.shouldRevalidate,
              handle: o.props.handle,
              lazy: o.props.lazy,
            };
            (o.props.children && (c.children = CV(o.props.children, f)),
              i.push(c));
          }),
          i
        );
      }
      var ho = "get",
        Fo = "application/x-www-form-urlencoded";
      function Yo(a) {
        return a != null && typeof a.tagName == "string";
      }
      function zm(a) {
        return Yo(a) && a.tagName.toLowerCase() === "button";
      }
      function Cm(a) {
        return Yo(a) && a.tagName.toLowerCase() === "form";
      }
      function Qm(a) {
        return Yo(a) && a.tagName.toLowerCase() === "input";
      }
      function bm(a) {
        return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
      }
      function Bm(a, l) {
        return a.button === 0 && (!l || l === "_self") && !bm(a);
      }
      var co = null;
      function Rm() {
        if (co === null)
          try {
            (new FormData(document.createElement("form"), 0), (co = !1));
          } catch {
            co = !0;
          }
        return co;
      }
      var Zm = new Set([
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain",
      ]);
      function sV(a) {
        return a != null && !Zm.has(a)
          ? (un(
              !1,
              `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fo}"`,
            ),
            null)
          : a;
      }
      function xm(a, l) {
        let i, o, s, f, c;
        if (Cm(a)) {
          let q = a.getAttribute("action");
          ((o = q ? Sn(q, l) : null),
            (i = a.getAttribute("method") || ho),
            (s = sV(a.getAttribute("enctype")) || Fo),
            (f = new FormData(a)));
        } else if (
          zm(a) ||
          (Qm(a) && (a.type === "submit" || a.type === "image"))
        ) {
          let q = a.form;
          if (q == null)
            throw new Error(
              'Cannot submit a <button> or <input type="submit"> without a <form>',
            );
          let p = a.getAttribute("formaction") || q.getAttribute("action");
          if (
            ((o = p ? Sn(p, l) : null),
            (i =
              a.getAttribute("formmethod") || q.getAttribute("method") || ho),
            (s =
              sV(a.getAttribute("formenctype")) ||
              sV(q.getAttribute("enctype")) ||
              Fo),
            (f = new FormData(q, a)),
            !Rm())
          ) {
            let { name: d, type: v, value: m } = a;
            if (v === "image") {
              let h = d ? `${d}.` : "";
              (f.append(`${h}x`, "0"), f.append(`${h}y`, "0"));
            } else d && f.append(d, m);
          }
        } else {
          if (Yo(a))
            throw new Error(
              'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
            );
          ((i = ho), (o = null), (s = Fo), (c = a));
        }
        return (
          f && s === "text/plain" && ((c = f), (f = void 0)),
          {
            action: o,
            method: i.toLowerCase(),
            encType: s,
            formData: f,
            body: c,
          }
        );
      }
      function af(a, l) {
        if (a === !1 || a === null || typeof a > "u") throw new Error(l);
      }
      async function Tm(a, l) {
        if (a.id in l) return l[a.id];
        try {
          let i = await import(a.module);
          return ((l[a.id] = i), i);
        } catch (i) {
          return (
            console.error(
              `Error loading route module \`${a.module}\`, reloading page...`,
            ),
            console.error(i),
            window.__reactRouterContext &&
              window.__reactRouterContext.isSpaMode,
            window.location.reload(),
            new Promise(() => {})
          );
        }
      }
      function Gm(a) {
        return a == null
          ? !1
          : a.href == null
            ? a.rel === "preload" &&
              typeof a.imageSrcSet == "string" &&
              typeof a.imageSizes == "string"
            : typeof a.rel == "string" && typeof a.href == "string";
      }
      async function Em(a, l, i) {
        let o = await Promise.all(
          a.map(async (s) => {
            let f = l.routes[s.route.id];
            if (f) {
              let c = await Tm(f, i);
              return c.links ? c.links() : [];
            }
            return [];
          }),
        );
        return Nm(
          o
            .flat(1)
            .filter(Gm)
            .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
            .map((s) =>
              s.rel === "stylesheet"
                ? { ...s, rel: "prefetch", as: "style" }
                : { ...s, rel: "prefetch" },
            ),
        );
      }
      function Hp(a, l, i, o, s, f) {
        let c = (p, d) => (i[d] ? p.route.id !== i[d].route.id : !0),
          q = (p, d) =>
            i[d].pathname !== p.pathname ||
            (i[d].route.path?.endsWith("*") &&
              i[d].params["*"] !== p.params["*"]);
        return f === "assets"
          ? l.filter((p, d) => c(p, d) || q(p, d))
          : f === "data"
            ? l.filter((p, d) => {
                let v = o.routes[p.route.id];
                if (!v || !v.hasLoader) return !1;
                if (c(p, d) || q(p, d)) return !0;
                if (p.route.shouldRevalidate) {
                  let m = p.route.shouldRevalidate({
                    currentUrl: new URL(
                      s.pathname + s.search + s.hash,
                      window.origin,
                    ),
                    currentParams: i[0]?.params || {},
                    nextUrl: new URL(a, window.origin),
                    nextParams: p.params,
                    defaultShouldRevalidate: !0,
                  });
                  if (typeof m == "boolean") return m;
                }
                return !0;
              })
            : [];
      }
      function Ym(a, l, { includeHydrateFallback: i } = {}) {
        return Mm(
          a
            .map((o) => {
              let s = l.routes[o.route.id];
              if (!s) return [];
              let f = [s.module];
              return (
                s.clientActionModule && (f = f.concat(s.clientActionModule)),
                s.clientLoaderModule && (f = f.concat(s.clientLoaderModule)),
                i &&
                  s.hydrateFallbackModule &&
                  (f = f.concat(s.hydrateFallbackModule)),
                s.imports && (f = f.concat(s.imports)),
                f
              );
            })
            .flat(1),
        );
      }
      function Mm(a) {
        return [...new Set(a)];
      }
      function Om(a) {
        let l = {},
          i = Object.keys(a).sort();
        for (let o of i) l[o] = a[o];
        return l;
      }
      function Nm(a, l) {
        let i = new Set();
        return (
          new Set(l),
          a.reduce((o, s) => {
            let f = JSON.stringify(Om(s));
            return (i.has(f) || (i.add(f), o.push({ key: f, link: s })), o);
          }, [])
        );
      }
      var Jm = new Set([100, 101, 204, 205]);
      function Pm(a, l) {
        let i =
          typeof a == "string"
            ? new URL(
                a,
                typeof window > "u"
                  ? "server://singlefetch/"
                  : window.location.origin,
              )
            : a;
        return (
          i.pathname === "/"
            ? (i.pathname = "_root.data")
            : l && Sn(i.pathname, l) === "/"
              ? (i.pathname = `${l.replace(/\/$/, "")}/_root.data`)
              : (i.pathname = `${i.pathname.replace(/\/$/, "")}.data`),
          i
        );
      }
      function Xv() {
        let a = X.useContext(yl);
        return (
          af(
            a,
            "You must render this element inside a <DataRouterContext.Provider> element",
          ),
          a
        );
      }
      function km() {
        let a = X.useContext(Go);
        return (
          af(
            a,
            "You must render this element inside a <DataRouterStateContext.Provider> element",
          ),
          a
        );
      }
      var lf = X.createContext(void 0);
      lf.displayName = "FrameworkContext";
      function Wv() {
        let a = X.useContext(lf);
        return (
          af(
            a,
            "You must render this element inside a <HydratedRouter> element",
          ),
          a
        );
      }
      function Hm(a, l) {
        let i = X.useContext(lf),
          [o, s] = X.useState(!1),
          [f, c] = X.useState(!1),
          {
            onFocus: q,
            onBlur: p,
            onMouseEnter: d,
            onMouseLeave: v,
            onTouchStart: m,
          } = l,
          h = X.useRef(null);
        (X.useEffect(() => {
          if ((a === "render" && c(!0), a === "viewport")) {
            let x = (z) => {
                z.forEach((G) => {
                  c(G.isIntersecting);
                });
              },
              Z = new IntersectionObserver(x, { threshold: 0.5 });
            return (
              h.current && Z.observe(h.current),
              () => {
                Z.disconnect();
              }
            );
          }
        }, [a]),
          X.useEffect(() => {
            if (o) {
              let x = setTimeout(() => {
                c(!0);
              }, 100);
              return () => {
                clearTimeout(x);
              };
            }
          }, [o]));
        let y = () => {
            s(!0);
          },
          A = () => {
            (s(!1), c(!1));
          };
        return i
          ? a !== "intent"
            ? [f, h, {}]
            : [
                f,
                h,
                {
                  onFocus: Wr(q, y),
                  onBlur: Wr(p, A),
                  onMouseEnter: Wr(d, y),
                  onMouseLeave: Wr(v, A),
                  onTouchStart: Wr(m, y),
                },
              ]
          : [!1, h, {}];
      }
      function Wr(a, l) {
        return (i) => {
          (a && a(i), i.defaultPrevented || l(i));
        };
      }
      function jm({ page: a, ...l }) {
        let { router: i } = Xv(),
          o = X.useMemo(
            () => dv(i.routes, a, i.basename),
            [i.routes, a, i.basename],
          );
        return o ? X.createElement(Dm, { page: a, matches: o, ...l }) : null;
      }
      function Im(a) {
        let { manifest: l, routeModules: i } = Wv(),
          [o, s] = X.useState([]);
        return (
          X.useEffect(() => {
            let f = !1;
            return (
              Em(a, l, i).then((c) => {
                f || s(c);
              }),
              () => {
                f = !0;
              }
            );
          }, [a, l, i]),
          o
        );
      }
      function Dm({ page: a, matches: l, ...i }) {
        let o = Vn(),
          { manifest: s, routeModules: f } = Wv(),
          { basename: c } = Xv(),
          { loaderData: q, matches: p } = km(),
          d = X.useMemo(() => Hp(a, l, p, s, o, "data"), [a, l, p, s, o]),
          v = X.useMemo(() => Hp(a, l, p, s, o, "assets"), [a, l, p, s, o]),
          m = X.useMemo(() => {
            if (a === o.pathname + o.search + o.hash) return [];
            let A = new Set(),
              x = !1;
            if (
              (l.forEach((z) => {
                let G = s.routes[z.route.id];
                !G ||
                  !G.hasLoader ||
                  ((!d.some((Y) => Y.route.id === z.route.id) &&
                    z.route.id in q &&
                    f[z.route.id]?.shouldRevalidate) ||
                  G.hasClientLoader
                    ? (x = !0)
                    : A.add(z.route.id));
              }),
              A.size === 0)
            )
              return [];
            let Z = Pm(a, c);
            return (
              x &&
                A.size > 0 &&
                Z.searchParams.set(
                  "_routes",
                  l
                    .filter((z) => A.has(z.route.id))
                    .map((z) => z.route.id)
                    .join(","),
                ),
              [Z.pathname + Z.search]
            );
          }, [c, q, o, s, d, l, a, f]),
          h = X.useMemo(() => Ym(v, s), [v, s]),
          y = Im(v);
        return X.createElement(
          X.Fragment,
          null,
          m.map((A) =>
            X.createElement("link", {
              key: A,
              rel: "prefetch",
              as: "fetch",
              href: A,
              ...i,
            }),
          ),
          h.map((A) =>
            X.createElement("link", {
              key: A,
              rel: "modulepreload",
              href: A,
              ...i,
            }),
          ),
          y.map(({ key: A, link: x }) =>
            X.createElement("link", { key: A, ...x }),
          ),
        );
      }
      function Lm(...a) {
        return (l) => {
          a.forEach((i) => {
            typeof i == "function" ? i(l) : i != null && (i.current = l);
          });
        };
      }
      var Sv =
        typeof window < "u" &&
        typeof window.document < "u" &&
        typeof window.document.createElement < "u";
      try {
        Sv && (window.__reactRouterVersion = "7.5.2");
      } catch {}
      function wm({ basename: a, children: l, window: i }) {
        let o = X.useRef();
        o.current == null && (o.current = Y1({ window: i, v5Compat: !0 }));
        let s = o.current,
          [f, c] = X.useState({ action: s.action, location: s.location }),
          q = X.useCallback(
            (p) => {
              X.startTransition(() => c(p));
            },
            [c],
          );
        return (
          X.useLayoutEffect(() => s.listen(q), [s, q]),
          X.createElement(Wm, {
            basename: a,
            children: l,
            location: f.location,
            navigationType: f.action,
            navigator: s,
          })
        );
      }
      var zv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
        Cv = X.forwardRef(function (
          {
            onClick: l,
            discover: i = "render",
            prefetch: o = "none",
            relative: s,
            reloadDocument: f,
            replace: c,
            state: q,
            target: p,
            to: d,
            preventScrollReset: v,
            viewTransition: m,
            ...h
          },
          y,
        ) {
          let { basename: A } = X.useContext(sn),
            x = typeof d == "string" && zv.test(d),
            Z,
            z = !1;
          if (typeof d == "string" && x && ((Z = d), Sv))
            try {
              let lt = new URL(window.location.href),
                pt = d.startsWith("//") ? new URL(lt.protocol + d) : new URL(d),
                w = Sn(pt.pathname, A);
              pt.origin === lt.origin && w != null
                ? (d = w + pt.search + pt.hash)
                : (z = !0);
            } catch {
              un(
                !1,
                `<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
              );
            }
          let G = fm(d, { relative: s }),
            [Y, L, N] = Hm(o, h),
            I = e9(d, {
              replace: c,
              state: q,
              target: p,
              preventScrollReset: v,
              relative: s,
              viewTransition: m,
            });
          function nt(lt) {
            (l && l(lt), lt.defaultPrevented || I(lt));
          }
          let k = X.createElement("a", {
            ...h,
            ...N,
            href: Z || G,
            onClick: z || f ? l : nt,
            ref: Lm(y, L),
            target: p,
            "data-discover": !x && i === "render" ? "true" : void 0,
          });
          return Y && !x
            ? X.createElement(
                X.Fragment,
                null,
                k,
                X.createElement(jm, { page: G }),
              )
            : k;
        });
      Cv.displayName = "Link";
      var _m = X.forwardRef(function (
        {
          "aria-current": l = "page",
          caseSensitive: i = !1,
          className: o = "",
          end: s = !1,
          style: f,
          to: c,
          viewTransition: q,
          children: p,
          ...d
        },
        v,
      ) {
        let m = jr(c, { relative: d.relative }),
          h = Vn(),
          y = X.useContext(Go),
          { navigator: A, basename: x } = X.useContext(sn),
          Z = y != null && i9(m) && q === !0,
          z = A.encodeLocation ? A.encodeLocation(m).pathname : m.pathname,
          G = h.pathname,
          Y =
            y && y.navigation && y.navigation.location
              ? y.navigation.location.pathname
              : null;
        (i ||
          ((G = G.toLowerCase()),
          (Y = Y ? Y.toLowerCase() : null),
          (z = z.toLowerCase())),
          Y && x && (Y = Sn(Y, x) || Y));
        const L = z !== "/" && z.endsWith("/") ? z.length - 1 : z.length;
        let N = G === z || (!s && G.startsWith(z) && G.charAt(L) === "/"),
          I =
            Y != null &&
            (Y === z || (!s && Y.startsWith(z) && Y.charAt(z.length) === "/")),
          nt = { isActive: N, isPending: I, isTransitioning: Z },
          k = N ? l : void 0,
          lt;
        typeof o == "function"
          ? (lt = o(nt))
          : (lt = [
              o,
              N ? "active" : null,
              I ? "pending" : null,
              Z ? "transitioning" : null,
            ]
              .filter(Boolean)
              .join(" "));
        let pt = typeof f == "function" ? f(nt) : f;
        return X.createElement(
          Cv,
          {
            ...d,
            "aria-current": k,
            className: lt,
            ref: v,
            style: pt,
            to: c,
            viewTransition: q,
          },
          typeof p == "function" ? p(nt) : p,
        );
      });
      _m.displayName = "NavLink";
      var $m = X.forwardRef(
        (
          {
            discover: a = "render",
            fetcherKey: l,
            navigate: i,
            reloadDocument: o,
            replace: s,
            state: f,
            method: c = ho,
            action: q,
            onSubmit: p,
            relative: d,
            preventScrollReset: v,
            viewTransition: m,
            ...h
          },
          y,
        ) => {
          let A = l9(),
            x = r9(q, { relative: d }),
            Z = c.toLowerCase() === "get" ? "get" : "post",
            z = typeof q == "string" && zv.test(q),
            G = (Y) => {
              if ((p && p(Y), Y.defaultPrevented)) return;
              Y.preventDefault();
              let L = Y.nativeEvent.submitter,
                N = L?.getAttribute("formmethod") || c;
              A(L || Y.currentTarget, {
                fetcherKey: l,
                method: N,
                navigate: i,
                replace: s,
                state: f,
                relative: d,
                preventScrollReset: v,
                viewTransition: m,
              });
            };
          return X.createElement("form", {
            ref: y,
            method: Z,
            action: x,
            onSubmit: o ? p : G,
            ...h,
            "data-discover": !z && a === "render" ? "true" : void 0,
          });
        },
      );
      $m.displayName = "Form";
      function t9(a) {
        return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
      }
      function Qv(a) {
        let l = X.useContext(yl);
        return (Yt(l, t9(a)), l);
      }
      function e9(
        a,
        {
          target: l,
          replace: i,
          state: o,
          preventScrollReset: s,
          relative: f,
          viewTransition: c,
        } = {},
      ) {
        let q = Eo(),
          p = Vn(),
          d = jr(a, { relative: f });
        return X.useCallback(
          (v) => {
            if (Bm(v, l)) {
              v.preventDefault();
              let m = i !== void 0 ? i : Tr(p) === Tr(d);
              q(a, {
                replace: m,
                state: o,
                preventScrollReset: s,
                relative: f,
                viewTransition: c,
              });
            }
          },
          [p, q, d, i, o, l, a, s, f, c],
        );
      }
      var n9 = 0,
        a9 = () => `__${String(++n9)}__`;
      function l9() {
        let { router: a } = Qv("useSubmit"),
          { basename: l } = X.useContext(sn),
          i = ym();
        return X.useCallback(
          async (o, s = {}) => {
            let {
              action: f,
              method: c,
              encType: q,
              formData: p,
              body: d,
            } = xm(o, l);
            if (s.navigate === !1) {
              let v = s.fetcherKey || a9();
              await a.fetch(v, i, s.action || f, {
                preventScrollReset: s.preventScrollReset,
                formData: p,
                body: d,
                formMethod: s.method || c,
                formEncType: s.encType || q,
                flushSync: s.flushSync,
              });
            } else
              await a.navigate(s.action || f, {
                preventScrollReset: s.preventScrollReset,
                formData: p,
                body: d,
                formMethod: s.method || c,
                formEncType: s.encType || q,
                replace: s.replace,
                state: s.state,
                fromRouteId: i,
                flushSync: s.flushSync,
                viewTransition: s.viewTransition,
              });
          },
          [a, l, i],
        );
      }
      function r9(a, { relative: l } = {}) {
        let { basename: i } = X.useContext(sn),
          o = X.useContext(Qn);
        Yt(o, "useFormAction must be used inside a RouteContext");
        let [s] = o.matches.slice(-1),
          f = { ...jr(a || ".", { relative: l }) },
          c = Vn();
        if (a == null) {
          f.search = c.search;
          let q = new URLSearchParams(f.search),
            p = q.getAll("index");
          if (p.some((v) => v === "")) {
            (q.delete("index"),
              p.filter((m) => m).forEach((m) => q.append("index", m)));
            let v = q.toString();
            f.search = v ? `?${v}` : "";
          }
        }
        return (
          (!a || a === ".") &&
            s.route.index &&
            (f.search = f.search
              ? f.search.replace(/^\?/, "?index&")
              : "?index"),
          i !== "/" &&
            (f.pathname = f.pathname === "/" ? i : Wn([i, f.pathname])),
          Tr(f)
        );
      }
      function i9(a, l = {}) {
        let i = X.useContext(hv);
        Yt(
          i != null,
          "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
        );
        let { basename: o } = Qv("useViewTransitionState"),
          s = jr(a, { relative: l.relative });
        if (!i.isTransitioning) return !1;
        let f = Sn(i.currentLocation.pathname, o) || i.currentLocation.pathname,
          c = Sn(i.nextLocation.pathname, o) || i.nextLocation.pathname;
        return zo(s.pathname, c) != null || zo(s.pathname, f) != null;
      }
      new TextEncoder();
      [...Jm];
      const rf = X.createContext({});
      function of(a) {
        const l = X.useRef(null);
        return (l.current === null && (l.current = a()), l.current);
      }
      const uf = typeof window < "u",
        bv = uf ? X.useLayoutEffect : X.useEffect,
        Mo = X.createContext(null),
        sf = X.createContext({
          transformPagePoint: (a) => a,
          isStatic: !1,
          reducedMotion: "never",
        });
      class o9 extends X.Component {
        getSnapshotBeforeUpdate(l) {
          const i = this.props.childRef.current;
          if (i && l.isPresent && !this.props.isPresent) {
            const o = i.offsetParent,
              s = (o instanceof HTMLElement && o.offsetWidth) || 0,
              f = this.props.sizeRef.current;
            ((f.height = i.offsetHeight || 0),
              (f.width = i.offsetWidth || 0),
              (f.top = i.offsetTop),
              (f.left = i.offsetLeft),
              (f.right = s - f.width - f.left));
          }
          return null;
        }
        componentDidUpdate() {}
        render() {
          return this.props.children;
        }
      }
      function u9({ children: a, isPresent: l, anchorX: i }) {
        const o = X.useId(),
          s = X.useRef(null),
          f = X.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
          { nonce: c } = X.useContext(sf);
        return (
          X.useInsertionEffect(() => {
            const {
              width: q,
              height: p,
              top: d,
              left: v,
              right: m,
            } = f.current;
            if (l || !s.current || !q || !p) return;
            const h = i === "left" ? `left: ${v}` : `right: ${m}`;
            s.current.dataset.motionPopId = o;
            const y = document.createElement("style");
            return (
              c && (y.nonce = c),
              document.head.appendChild(y),
              y.sheet &&
                y.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${q}px !important;
            height: ${p}px !important;
            ${h}px !important;
            top: ${d}px !important;
          }
        `),
              () => {
                document.head.removeChild(y);
              }
            );
          }, [l]),
          b.jsx(o9, {
            isPresent: l,
            childRef: s,
            sizeRef: f,
            children: X.cloneElement(a, { ref: s }),
          })
        );
      }
      const s9 = ({
        children: a,
        initial: l,
        isPresent: i,
        onExitComplete: o,
        custom: s,
        presenceAffectsLayout: f,
        mode: c,
        anchorX: q,
      }) => {
        const p = of(V9),
          d = X.useId();
        let v = !0,
          m = X.useMemo(
            () => (
              (v = !1),
              {
                id: d,
                initial: l,
                isPresent: i,
                custom: s,
                onExitComplete: (h) => {
                  p.set(h, !0);
                  for (const y of p.values()) if (!y) return;
                  o && o();
                },
                register: (h) => (p.set(h, !1), () => p.delete(h)),
              }
            ),
            [i, p, o],
          );
        return (
          f && v && (m = { ...m }),
          X.useMemo(() => {
            p.forEach((h, y) => p.set(y, !1));
          }, [i]),
          X.useEffect(() => {
            !i && !p.size && o && o();
          }, [i]),
          c === "popLayout" &&
            (a = b.jsx(u9, { isPresent: i, anchorX: q, children: a })),
          b.jsx(Mo.Provider, { value: m, children: a })
        );
      };
      function V9() {
        return new Map();
      }
      function Bv(a = !0) {
        const l = X.useContext(Mo);
        if (l === null) return [!0, null];
        const { isPresent: i, onExitComplete: o, register: s } = l,
          f = X.useId();
        X.useEffect(() => {
          if (a) return s(f);
        }, [a]);
        const c = X.useCallback(() => a && o && o(f), [f, o, a]);
        return !i && o ? [!1, c] : [!0];
      }
      const qo = (a) => a.key || "";
      function jp(a) {
        const l = [];
        return (
          X.Children.forEach(a, (i) => {
            X.isValidElement(i) && l.push(i);
          }),
          l
        );
      }
      const Ip = ({
        children: a,
        custom: l,
        initial: i = !0,
        onExitComplete: o,
        presenceAffectsLayout: s = !0,
        mode: f = "sync",
        propagate: c = !1,
        anchorX: q = "left",
      }) => {
        const [p, d] = Bv(c),
          v = X.useMemo(() => jp(a), [a]),
          m = c && !p ? [] : v.map(qo),
          h = X.useRef(!0),
          y = X.useRef(v),
          A = of(() => new Map()),
          [x, Z] = X.useState(v),
          [z, G] = X.useState(v);
        bv(() => {
          ((h.current = !1), (y.current = v));
          for (let N = 0; N < z.length; N++) {
            const I = qo(z[N]);
            m.includes(I) ? A.delete(I) : A.get(I) !== !0 && A.set(I, !1);
          }
        }, [z, m.length, m.join("-")]);
        const Y = [];
        if (v !== x) {
          let N = [...v];
          for (let I = 0; I < z.length; I++) {
            const nt = z[I],
              k = qo(nt);
            m.includes(k) || (N.splice(I, 0, nt), Y.push(nt));
          }
          return (f === "wait" && Y.length && (N = Y), G(jp(N)), Z(v), null);
        }
        const { forceRender: L } = X.useContext(rf);
        return b.jsx(b.Fragment, {
          children: z.map((N) => {
            const I = qo(N),
              nt = c && !p ? !1 : v === z || m.includes(I),
              k = () => {
                if (A.has(I)) A.set(I, !0);
                else return;
                let lt = !0;
                (A.forEach((pt) => {
                  pt || (lt = !1);
                }),
                  lt && (L?.(), G(y.current), c && d?.(), o && o()));
              };
            return b.jsx(
              s9,
              {
                isPresent: nt,
                initial: !h.current || i ? void 0 : !1,
                custom: l,
                presenceAffectsLayout: s,
                mode: f,
                onExitComplete: nt ? void 0 : k,
                anchorX: q,
                children: N,
              },
              I,
            );
          }),
        });
      };
      function Vf(a, l) {
        a.indexOf(l) === -1 && a.push(l);
      }
      function ff(a, l) {
        const i = a.indexOf(l);
        i > -1 && a.splice(i, 1);
      }
      const zn = (a, l, i) => (i > l ? l : i < a ? a : i);
      let cf = () => {};
      const Cn = {},
        Rv = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a),
        Zv = (a) => /^0[^.\s]+$/u.test(a);
      function qf(a) {
        let l;
        return () => (l === void 0 && (l = a()), l);
      }
      const He = (a) => a,
        f9 = (a, l) => (i) => l(a(i)),
        Ir = (...a) => a.reduce(f9),
        Gr = (a, l, i) => {
          const o = l - a;
          return o === 0 ? 1 : (i - a) / o;
        };
      class df {
        constructor() {
          this.subscriptions = [];
        }
        add(l) {
          return (Vf(this.subscriptions, l), () => ff(this.subscriptions, l));
        }
        notify(l, i, o) {
          const s = this.subscriptions.length;
          if (s)
            if (s === 1) this.subscriptions[0](l, i, o);
            else
              for (let f = 0; f < s; f++) {
                const c = this.subscriptions[f];
                c && c(l, i, o);
              }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
      const ln = (a) => a * 1e3,
        rn = (a) => a / 1e3;
      function xv(a, l) {
        return l ? a * (1e3 / l) : 0;
      }
      const Tv = (a, l, i) =>
          (((1 - 3 * i + 3 * l) * a + (3 * i - 6 * l)) * a + 3 * l) * a,
        c9 = 1e-7,
        q9 = 12;
      function d9(a, l, i, o, s) {
        let f,
          c,
          q = 0;
        do
          ((c = l + (i - l) / 2),
            (f = Tv(c, o, s) - a),
            f > 0 ? (i = c) : (l = c));
        while (Math.abs(f) > c9 && ++q < q9);
        return c;
      }
      function Dr(a, l, i, o) {
        if (a === l && i === o) return He;
        const s = (f) => d9(f, 0, 1, a, i);
        return (f) => (f === 0 || f === 1 ? f : Tv(s(f), l, o));
      }
      const Gv = (a) => (l) =>
          l <= 0.5 ? a(2 * l) / 2 : (2 - a(2 * (1 - l))) / 2,
        Ev = (a) => (l) => 1 - a(1 - l),
        Yv = Dr(0.33, 1.53, 0.69, 0.99),
        pf = Ev(Yv),
        Mv = Gv(pf),
        Ov = (a) =>
          (a *= 2) < 1 ? 0.5 * pf(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))),
        Kf = (a) => 1 - Math.sin(Math.acos(a)),
        Nv = Ev(Kf),
        Jv = Gv(Kf),
        p9 = Dr(0.42, 0, 1, 1),
        K9 = Dr(0, 0, 0.58, 1),
        Pv = Dr(0.42, 0, 0.58, 1),
        v9 = (a) => Array.isArray(a) && typeof a[0] != "number",
        kv = (a) => Array.isArray(a) && typeof a[0] == "number",
        U9 = {
          linear: He,
          easeIn: p9,
          easeInOut: Pv,
          easeOut: K9,
          circIn: Kf,
          circInOut: Jv,
          circOut: Nv,
          backIn: pf,
          backInOut: Mv,
          backOut: Yv,
          anticipate: Ov,
        },
        m9 = (a) => typeof a == "string",
        Dp = (a) => {
          if (kv(a)) {
            cf(a.length === 4);
            const [l, i, o, s] = a;
            return Dr(l, i, o, s);
          } else if (m9(a)) return U9[a];
          return a;
        },
        po = [
          "setup",
          "read",
          "resolveKeyframes",
          "preUpdate",
          "update",
          "preRender",
          "render",
          "postRender",
        ],
        Lp = { value: null };
      function h9(a, l) {
        let i = new Set(),
          o = new Set(),
          s = !1,
          f = !1;
        const c = new WeakSet();
        let q = { delta: 0, timestamp: 0, isProcessing: !1 },
          p = 0;
        function d(m) {
          (c.has(m) && (v.schedule(m), a()), p++, m(q));
        }
        const v = {
          schedule: (m, h = !1, y = !1) => {
            const x = y && s ? i : o;
            return (h && c.add(m), x.has(m) || x.add(m), m);
          },
          cancel: (m) => {
            (o.delete(m), c.delete(m));
          },
          process: (m) => {
            if (((q = m), s)) {
              f = !0;
              return;
            }
            ((s = !0),
              ([i, o] = [o, i]),
              i.forEach(d),
              l && Lp.value && Lp.value.frameloop[l].push(p),
              (p = 0),
              i.clear(),
              (s = !1),
              f && ((f = !1), v.process(m)));
          },
        };
        return v;
      }
      const F9 = 40;
      function Hv(a, l) {
        let i = !1,
          o = !0;
        const s = { delta: 0, timestamp: 0, isProcessing: !1 },
          f = () => (i = !0),
          c = po.reduce((Y, L) => ((Y[L] = h9(f, l ? L : void 0)), Y), {}),
          {
            setup: q,
            read: p,
            resolveKeyframes: d,
            preUpdate: v,
            update: m,
            preRender: h,
            render: y,
            postRender: A,
          } = c,
          x = () => {
            const Y = Cn.useManualTiming ? s.timestamp : performance.now();
            ((i = !1),
              Cn.useManualTiming ||
                (s.delta = o
                  ? 1e3 / 60
                  : Math.max(Math.min(Y - s.timestamp, F9), 1)),
              (s.timestamp = Y),
              (s.isProcessing = !0),
              q.process(s),
              p.process(s),
              d.process(s),
              v.process(s),
              m.process(s),
              h.process(s),
              y.process(s),
              A.process(s),
              (s.isProcessing = !1),
              i && l && ((o = !1), a(x)));
          },
          Z = () => {
            ((i = !0), (o = !0), s.isProcessing || a(x));
          };
        return {
          schedule: po.reduce((Y, L) => {
            const N = c[L];
            return (
              (Y[L] = (I, nt = !1, k = !1) => (i || Z(), N.schedule(I, nt, k))),
              Y
            );
          }, {}),
          cancel: (Y) => {
            for (let L = 0; L < po.length; L++) c[po[L]].cancel(Y);
          },
          state: s,
          steps: c,
        };
      }
      const {
        schedule: Mt,
        cancel: na,
        state: re,
        steps: VV,
      } = Hv(
        typeof requestAnimationFrame < "u" ? requestAnimationFrame : He,
        !0,
      );
      let yo;
      function y9() {
        yo = void 0;
      }
      const Fe = {
          now: () => (
            yo === void 0 &&
              Fe.set(
                re.isProcessing || Cn.useManualTiming
                  ? re.timestamp
                  : performance.now(),
              ),
            yo
          ),
          set: (a) => {
            ((yo = a), queueMicrotask(y9));
          },
        },
        jv = (a) => (l) => typeof l == "string" && l.startsWith(a),
        vf = jv("--"),
        A9 = jv("var(--"),
        Uf = (a) => (A9(a) ? g9.test(a.split("/*")[0].trim()) : !1),
        g9 =
          /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
        Al = {
          test: (a) => typeof a == "number",
          parse: parseFloat,
          transform: (a) => a,
        },
        Er = { ...Al, transform: (a) => zn(0, 1, a) },
        Ko = { ...Al, default: 1 },
        br = (a) => Math.round(a * 1e5) / 1e5,
        mf = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
      function X9(a) {
        return a == null;
      }
      const W9 =
          /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
        hf = (a, l) => (i) =>
          !!(
            (typeof i == "string" && W9.test(i) && i.startsWith(a)) ||
            (l && !X9(i) && Object.prototype.hasOwnProperty.call(i, l))
          ),
        Iv = (a, l, i) => (o) => {
          if (typeof o != "string") return o;
          const [s, f, c, q] = o.match(mf);
          return {
            [a]: parseFloat(s),
            [l]: parseFloat(f),
            [i]: parseFloat(c),
            alpha: q !== void 0 ? parseFloat(q) : 1,
          };
        },
        S9 = (a) => zn(0, 255, a),
        fV = { ...Al, transform: (a) => Math.round(S9(a)) },
        Wa = {
          test: hf("rgb", "red"),
          parse: Iv("red", "green", "blue"),
          transform: ({ red: a, green: l, blue: i, alpha: o = 1 }) =>
            "rgba(" +
            fV.transform(a) +
            ", " +
            fV.transform(l) +
            ", " +
            fV.transform(i) +
            ", " +
            br(Er.transform(o)) +
            ")",
        };
      function z9(a) {
        let l = "",
          i = "",
          o = "",
          s = "";
        return (
          a.length > 5
            ? ((l = a.substring(1, 3)),
              (i = a.substring(3, 5)),
              (o = a.substring(5, 7)),
              (s = a.substring(7, 9)))
            : ((l = a.substring(1, 2)),
              (i = a.substring(2, 3)),
              (o = a.substring(3, 4)),
              (s = a.substring(4, 5)),
              (l += l),
              (i += i),
              (o += o),
              (s += s)),
          {
            red: parseInt(l, 16),
            green: parseInt(i, 16),
            blue: parseInt(o, 16),
            alpha: s ? parseInt(s, 16) / 255 : 1,
          }
        );
      }
      const QV = { test: hf("#"), parse: z9, transform: Wa.transform },
        Lr = (a) => ({
          test: (l) =>
            typeof l == "string" && l.endsWith(a) && l.split(" ").length === 1,
          parse: parseFloat,
          transform: (l) => `${l}${a}`,
        }),
        ea = Lr("deg"),
        on = Lr("%"),
        st = Lr("px"),
        C9 = Lr("vh"),
        Q9 = Lr("vw"),
        wp = {
          ...on,
          parse: (a) => on.parse(a) / 100,
          transform: (a) => on.transform(a * 100),
        },
        dl = {
          test: hf("hsl", "hue"),
          parse: Iv("hue", "saturation", "lightness"),
          transform: ({ hue: a, saturation: l, lightness: i, alpha: o = 1 }) =>
            "hsla(" +
            Math.round(a) +
            ", " +
            on.transform(br(l)) +
            ", " +
            on.transform(br(i)) +
            ", " +
            br(Er.transform(o)) +
            ")",
        },
        fe = {
          test: (a) => Wa.test(a) || QV.test(a) || dl.test(a),
          parse: (a) =>
            Wa.test(a) ? Wa.parse(a) : dl.test(a) ? dl.parse(a) : QV.parse(a),
          transform: (a) =>
            typeof a == "string"
              ? a
              : a.hasOwnProperty("red")
                ? Wa.transform(a)
                : dl.transform(a),
        },
        b9 =
          /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
      function B9(a) {
        return (
          isNaN(a) &&
          typeof a == "string" &&
          (a.match(mf)?.length || 0) + (a.match(b9)?.length || 0) > 0
        );
      }
      const Dv = "number",
        Lv = "color",
        R9 = "var",
        Z9 = "var(",
        _p = "${}",
        x9 =
          /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
      function Yr(a) {
        const l = a.toString(),
          i = [],
          o = { color: [], number: [], var: [] },
          s = [];
        let f = 0;
        const q = l
          .replace(
            x9,
            (p) => (
              fe.test(p)
                ? (o.color.push(f), s.push(Lv), i.push(fe.parse(p)))
                : p.startsWith(Z9)
                  ? (o.var.push(f), s.push(R9), i.push(p))
                  : (o.number.push(f), s.push(Dv), i.push(parseFloat(p))),
              ++f,
              _p
            ),
          )
          .split(_p);
        return { values: i, split: q, indexes: o, types: s };
      }
      function wv(a) {
        return Yr(a).values;
      }
      function _v(a) {
        const { split: l, types: i } = Yr(a),
          o = l.length;
        return (s) => {
          let f = "";
          for (let c = 0; c < o; c++)
            if (((f += l[c]), s[c] !== void 0)) {
              const q = i[c];
              q === Dv
                ? (f += br(s[c]))
                : q === Lv
                  ? (f += fe.transform(s[c]))
                  : (f += s[c]);
            }
          return f;
        };
      }
      const T9 = (a) => (typeof a == "number" ? 0 : a);
      function G9(a) {
        const l = wv(a);
        return _v(a)(l.map(T9));
      }
      const aa = {
        test: B9,
        parse: wv,
        createTransformer: _v,
        getAnimatableNone: G9,
      };
      function cV(a, l, i) {
        return (
          i < 0 && (i += 1),
          i > 1 && (i -= 1),
          i < 1 / 6
            ? a + (l - a) * 6 * i
            : i < 1 / 2
              ? l
              : i < 2 / 3
                ? a + (l - a) * (2 / 3 - i) * 6
                : a
        );
      }
      function E9({ hue: a, saturation: l, lightness: i, alpha: o }) {
        ((a /= 360), (l /= 100), (i /= 100));
        let s = 0,
          f = 0,
          c = 0;
        if (!l) s = f = c = i;
        else {
          const q = i < 0.5 ? i * (1 + l) : i + l - i * l,
            p = 2 * i - q;
          ((s = cV(p, q, a + 1 / 3)),
            (f = cV(p, q, a)),
            (c = cV(p, q, a - 1 / 3)));
        }
        return {
          red: Math.round(s * 255),
          green: Math.round(f * 255),
          blue: Math.round(c * 255),
          alpha: o,
        };
      }
      function Co(a, l) {
        return (i) => (i > 0 ? l : a);
      }
      const Et = (a, l, i) => a + (l - a) * i,
        qV = (a, l, i) => {
          const o = a * a,
            s = i * (l * l - o) + o;
          return s < 0 ? 0 : Math.sqrt(s);
        },
        Y9 = [QV, Wa, dl],
        M9 = (a) => Y9.find((l) => l.test(a));
      function $p(a) {
        const l = M9(a);
        if (!l) return !1;
        let i = l.parse(a);
        return (l === dl && (i = E9(i)), i);
      }
      const tK = (a, l) => {
          const i = $p(a),
            o = $p(l);
          if (!i || !o) return Co(a, l);
          const s = { ...i };
          return (f) => (
            (s.red = qV(i.red, o.red, f)),
            (s.green = qV(i.green, o.green, f)),
            (s.blue = qV(i.blue, o.blue, f)),
            (s.alpha = Et(i.alpha, o.alpha, f)),
            Wa.transform(s)
          );
        },
        bV = new Set(["none", "hidden"]);
      function O9(a, l) {
        return bV.has(a) ? (i) => (i <= 0 ? a : l) : (i) => (i >= 1 ? l : a);
      }
      function N9(a, l) {
        return (i) => Et(a, l, i);
      }
      function Ff(a) {
        return typeof a == "number"
          ? N9
          : typeof a == "string"
            ? Uf(a)
              ? Co
              : fe.test(a)
                ? tK
                : k9
            : Array.isArray(a)
              ? $v
              : typeof a == "object"
                ? fe.test(a)
                  ? tK
                  : J9
                : Co;
      }
      function $v(a, l) {
        const i = [...a],
          o = i.length,
          s = a.map((f, c) => Ff(f)(f, l[c]));
        return (f) => {
          for (let c = 0; c < o; c++) i[c] = s[c](f);
          return i;
        };
      }
      function J9(a, l) {
        const i = { ...a, ...l },
          o = {};
        for (const s in i)
          a[s] !== void 0 && l[s] !== void 0 && (o[s] = Ff(a[s])(a[s], l[s]));
        return (s) => {
          for (const f in o) i[f] = o[f](s);
          return i;
        };
      }
      function P9(a, l) {
        const i = [],
          o = { color: 0, var: 0, number: 0 };
        for (let s = 0; s < l.values.length; s++) {
          const f = l.types[s],
            c = a.indexes[f][o[f]],
            q = a.values[c] ?? 0;
          ((i[s] = q), o[f]++);
        }
        return i;
      }
      const k9 = (a, l) => {
        const i = aa.createTransformer(l),
          o = Yr(a),
          s = Yr(l);
        return o.indexes.var.length === s.indexes.var.length &&
          o.indexes.color.length === s.indexes.color.length &&
          o.indexes.number.length >= s.indexes.number.length
          ? (bV.has(a) && !s.values.length) || (bV.has(l) && !o.values.length)
            ? O9(a, l)
            : Ir($v(P9(o, s), s.values), i)
          : Co(a, l);
      };
      function tU(a, l, i) {
        return typeof a == "number" &&
          typeof l == "number" &&
          typeof i == "number"
          ? Et(a, l, i)
          : Ff(a)(a, l);
      }
      const H9 = (a) => {
          const l = ({ timestamp: i }) => a(i);
          return {
            start: () => Mt.update(l, !0),
            stop: () => na(l),
            now: () => (re.isProcessing ? re.timestamp : Fe.now()),
          };
        },
        eU = (a, l, i = 10) => {
          let o = "";
          const s = Math.max(Math.round(l / i), 2);
          for (let f = 0; f < s; f++) o += a(f / (s - 1)) + ", ";
          return `linear(${o.substring(0, o.length - 2)})`;
        },
        Qo = 2e4;
      function yf(a) {
        let l = 0;
        const i = 50;
        let o = a.next(l);
        for (; !o.done && l < Qo; ) ((l += i), (o = a.next(l)));
        return l >= Qo ? 1 / 0 : l;
      }
      function j9(a, l = 100, i) {
        const o = i({ ...a, keyframes: [0, l] }),
          s = Math.min(yf(o), Qo);
        return {
          type: "keyframes",
          ease: (f) => o.next(s * f).value / l,
          duration: rn(s),
        };
      }
      const I9 = 5;
      function nU(a, l, i) {
        const o = Math.max(l - I9, 0);
        return xv(i - a(o), l - o);
      }
      const Pt = {
          stiffness: 100,
          damping: 10,
          mass: 1,
          velocity: 0,
          duration: 800,
          bounce: 0.3,
          visualDuration: 0.3,
          restSpeed: { granular: 0.01, default: 2 },
          restDelta: { granular: 0.005, default: 0.5 },
          minDuration: 0.01,
          maxDuration: 10,
          minDamping: 0.05,
          maxDamping: 1,
        },
        dV = 0.001;
      function D9({
        duration: a = Pt.duration,
        bounce: l = Pt.bounce,
        velocity: i = Pt.velocity,
        mass: o = Pt.mass,
      }) {
        let s,
          f,
          c = 1 - l;
        ((c = zn(Pt.minDamping, Pt.maxDamping, c)),
          (a = zn(Pt.minDuration, Pt.maxDuration, rn(a))),
          c < 1
            ? ((s = (d) => {
                const v = d * c,
                  m = v * a,
                  h = v - i,
                  y = BV(d, c),
                  A = Math.exp(-m);
                return dV - (h / y) * A;
              }),
              (f = (d) => {
                const m = d * c * a,
                  h = m * i + i,
                  y = Math.pow(c, 2) * Math.pow(d, 2) * a,
                  A = Math.exp(-m),
                  x = BV(Math.pow(d, 2), c);
                return ((-s(d) + dV > 0 ? -1 : 1) * ((h - y) * A)) / x;
              }))
            : ((s = (d) => {
                const v = Math.exp(-d * a),
                  m = (d - i) * a + 1;
                return -dV + v * m;
              }),
              (f = (d) => {
                const v = Math.exp(-d * a),
                  m = (i - d) * (a * a);
                return v * m;
              })));
        const q = 5 / a,
          p = w9(s, f, q);
        if (((a = ln(a)), isNaN(p)))
          return { stiffness: Pt.stiffness, damping: Pt.damping, duration: a };
        {
          const d = Math.pow(p, 2) * o;
          return {
            stiffness: d,
            damping: c * 2 * Math.sqrt(o * d),
            duration: a,
          };
        }
      }
      const L9 = 12;
      function w9(a, l, i) {
        let o = i;
        for (let s = 1; s < L9; s++) o = o - a(o) / l(o);
        return o;
      }
      function BV(a, l) {
        return a * Math.sqrt(1 - l * l);
      }
      const _9 = ["duration", "bounce"],
        $9 = ["stiffness", "damping", "mass"];
      function eK(a, l) {
        return l.some((i) => a[i] !== void 0);
      }
      function th(a) {
        let l = {
          velocity: Pt.velocity,
          stiffness: Pt.stiffness,
          damping: Pt.damping,
          mass: Pt.mass,
          isResolvedFromDuration: !1,
          ...a,
        };
        if (!eK(a, $9) && eK(a, _9))
          if (a.visualDuration) {
            const i = a.visualDuration,
              o = (2 * Math.PI) / (i * 1.2),
              s = o * o,
              f = 2 * zn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(s);
            l = { ...l, mass: Pt.mass, stiffness: s, damping: f };
          } else {
            const i = D9(a);
            ((l = { ...l, ...i, mass: Pt.mass }),
              (l.isResolvedFromDuration = !0));
          }
        return l;
      }
      function bo(a = Pt.visualDuration, l = Pt.bounce) {
        const i =
          typeof a != "object"
            ? { visualDuration: a, keyframes: [0, 1], bounce: l }
            : a;
        let { restSpeed: o, restDelta: s } = i;
        const f = i.keyframes[0],
          c = i.keyframes[i.keyframes.length - 1],
          q = { done: !1, value: f },
          {
            stiffness: p,
            damping: d,
            mass: v,
            duration: m,
            velocity: h,
            isResolvedFromDuration: y,
          } = th({ ...i, velocity: -rn(i.velocity || 0) }),
          A = h || 0,
          x = d / (2 * Math.sqrt(p * v)),
          Z = c - f,
          z = rn(Math.sqrt(p / v)),
          G = Math.abs(Z) < 5;
        (o || (o = G ? Pt.restSpeed.granular : Pt.restSpeed.default),
          s || (s = G ? Pt.restDelta.granular : Pt.restDelta.default));
        let Y;
        if (x < 1) {
          const N = BV(z, x);
          Y = (I) => {
            const nt = Math.exp(-x * z * I);
            return (
              c -
              nt *
                (((A + x * z * Z) / N) * Math.sin(N * I) + Z * Math.cos(N * I))
            );
          };
        } else if (x === 1)
          Y = (N) => c - Math.exp(-z * N) * (Z + (A + z * Z) * N);
        else {
          const N = z * Math.sqrt(x * x - 1);
          Y = (I) => {
            const nt = Math.exp(-x * z * I),
              k = Math.min(N * I, 300);
            return (
              c -
              (nt * ((A + x * z * Z) * Math.sinh(k) + N * Z * Math.cosh(k))) / N
            );
          };
        }
        const L = {
          calculatedDuration: (y && m) || null,
          next: (N) => {
            const I = Y(N);
            if (y) q.done = N >= m;
            else {
              let nt = N === 0 ? A : 0;
              x < 1 && (nt = N === 0 ? ln(A) : nU(Y, N, I));
              const k = Math.abs(nt) <= o,
                lt = Math.abs(c - I) <= s;
              q.done = k && lt;
            }
            return ((q.value = q.done ? c : I), q);
          },
          toString: () => {
            const N = Math.min(yf(L), Qo),
              I = eU((nt) => L.next(N * nt).value, N, 30);
            return N + "ms " + I;
          },
          toTransition: () => {},
        };
        return L;
      }
      bo.applyToOptions = (a) => {
        const l = j9(a, 100, bo);
        return (
          (a.ease = l.ease),
          (a.duration = ln(l.duration)),
          (a.type = "keyframes"),
          a
        );
      };
      function RV({
        keyframes: a,
        velocity: l = 0,
        power: i = 0.8,
        timeConstant: o = 325,
        bounceDamping: s = 10,
        bounceStiffness: f = 500,
        modifyTarget: c,
        min: q,
        max: p,
        restDelta: d = 0.5,
        restSpeed: v,
      }) {
        const m = a[0],
          h = { done: !1, value: m },
          y = (k) => (q !== void 0 && k < q) || (p !== void 0 && k > p),
          A = (k) =>
            q === void 0
              ? p
              : p === void 0 || Math.abs(q - k) < Math.abs(p - k)
                ? q
                : p;
        let x = i * l;
        const Z = m + x,
          z = c === void 0 ? Z : c(Z);
        z !== Z && (x = z - m);
        const G = (k) => -x * Math.exp(-k / o),
          Y = (k) => z + G(k),
          L = (k) => {
            const lt = G(k),
              pt = Y(k);
            ((h.done = Math.abs(lt) <= d), (h.value = h.done ? z : pt));
          };
        let N, I;
        const nt = (k) => {
          y(h.value) &&
            ((N = k),
            (I = bo({
              keyframes: [h.value, A(h.value)],
              velocity: nU(Y, k, h.value),
              damping: s,
              stiffness: f,
              restDelta: d,
              restSpeed: v,
            })));
        };
        return (
          nt(0),
          {
            calculatedDuration: null,
            next: (k) => {
              let lt = !1;
              return (
                !I && N === void 0 && ((lt = !0), L(k), nt(k)),
                N !== void 0 && k >= N ? I.next(k - N) : (!lt && L(k), h)
              );
            },
          }
        );
      }
      function eh(a, l, i) {
        const o = [],
          s = i || Cn.mix || tU,
          f = a.length - 1;
        for (let c = 0; c < f; c++) {
          let q = s(a[c], a[c + 1]);
          if (l) {
            const p = Array.isArray(l) ? l[c] || He : l;
            q = Ir(p, q);
          }
          o.push(q);
        }
        return o;
      }
      function nh(a, l, { clamp: i = !0, ease: o, mixer: s } = {}) {
        const f = a.length;
        if ((cf(f === l.length), f === 1)) return () => l[0];
        if (f === 2 && l[0] === l[1]) return () => l[1];
        const c = a[0] === a[1];
        a[0] > a[f - 1] && ((a = [...a].reverse()), (l = [...l].reverse()));
        const q = eh(l, o, s),
          p = q.length,
          d = (v) => {
            if (c && v < a[0]) return l[0];
            let m = 0;
            if (p > 1) for (; m < a.length - 2 && !(v < a[m + 1]); m++);
            const h = Gr(a[m], a[m + 1], v);
            return q[m](h);
          };
        return i ? (v) => d(zn(a[0], a[f - 1], v)) : d;
      }
      function ah(a, l) {
        const i = a[a.length - 1];
        for (let o = 1; o <= l; o++) {
          const s = Gr(0, l, o);
          a.push(Et(i, 1, s));
        }
      }
      function lh(a) {
        const l = [0];
        return (ah(l, a.length - 1), l);
      }
      function rh(a, l) {
        return a.map((i) => i * l);
      }
      function ih(a, l) {
        return a.map(() => l || Pv).splice(0, a.length - 1);
      }
      function Br({
        duration: a = 300,
        keyframes: l,
        times: i,
        ease: o = "easeInOut",
      }) {
        const s = v9(o) ? o.map(Dp) : Dp(o),
          f = { done: !1, value: l[0] },
          c = rh(i && i.length === l.length ? i : lh(l), a),
          q = nh(c, l, { ease: Array.isArray(s) ? s : ih(l, s) });
        return {
          calculatedDuration: a,
          next: (p) => ((f.value = q(p)), (f.done = p >= a), f),
        };
      }
      const oh = (a) => a !== null;
      function Af(a, { repeat: l, repeatType: i = "loop" }, o, s = 1) {
        const f = a.filter(oh),
          q = s < 0 || (l && i !== "loop" && l % 2 === 1) ? 0 : f.length - 1;
        return !q || o === void 0 ? f[q] : o;
      }
      const uh = {
        decay: RV,
        inertia: RV,
        tween: Br,
        keyframes: Br,
        spring: bo,
      };
      function aU(a) {
        typeof a.type == "string" && (a.type = uh[a.type]);
      }
      class gf {
        constructor() {
          ((this.count = 0), this.updateFinished());
        }
        get finished() {
          return this._finished;
        }
        updateFinished() {
          (this.count++,
            (this._finished = new Promise((l) => {
              this.resolve = l;
            })));
        }
        notifyFinished() {
          this.resolve();
        }
        then(l, i) {
          return this.finished.then(l, i);
        }
      }
      const sh = (a) => a / 100;
      class lU extends gf {
        constructor(l) {
          (super(),
            (this.state = "idle"),
            (this.startTime = null),
            (this.isStopped = !1),
            (this.currentTime = 0),
            (this.holdTime = null),
            (this.playbackSpeed = 1),
            (this.stop = () => {
              const { motionValue: i } = this.options;
              if (
                (i && i.updatedAt !== Fe.now() && this.tick(Fe.now()),
                (this.isStopped = !0),
                this.state === "idle")
              )
                return;
              this.teardown();
              const { onStop: o } = this.options;
              o && o();
            }),
            (this.options = l),
            this.initAnimation(),
            this.play(),
            l.autoplay === !1 && this.pause());
        }
        initAnimation() {
          const { options: l } = this;
          aU(l);
          const {
            type: i = Br,
            repeat: o = 0,
            repeatDelay: s = 0,
            repeatType: f,
            velocity: c = 0,
          } = l;
          let { keyframes: q } = l;
          const p = i || Br;
          p !== Br &&
            typeof q[0] != "number" &&
            ((this.mixKeyframes = Ir(sh, tU(q[0], q[1]))), (q = [0, 100]));
          const d = p({ ...l, keyframes: q });
          (f === "mirror" &&
            (this.mirroredGenerator = p({
              ...l,
              keyframes: [...q].reverse(),
              velocity: -c,
            })),
            d.calculatedDuration === null && (d.calculatedDuration = yf(d)));
          const { calculatedDuration: v } = d;
          ((this.calculatedDuration = v),
            (this.resolvedDuration = v + s),
            (this.totalDuration = this.resolvedDuration * (o + 1) - s),
            (this.generator = d));
        }
        updateTime(l) {
          const i = Math.round(l - this.startTime) * this.playbackSpeed;
          this.holdTime !== null
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = i);
        }
        tick(l, i = !1) {
          const {
            generator: o,
            totalDuration: s,
            mixKeyframes: f,
            mirroredGenerator: c,
            resolvedDuration: q,
            calculatedDuration: p,
          } = this;
          if (this.startTime === null) return o.next(0);
          const {
            delay: d = 0,
            keyframes: v,
            repeat: m,
            repeatType: h,
            repeatDelay: y,
            type: A,
            onUpdate: x,
            finalKeyframe: Z,
          } = this.options;
          (this.speed > 0
            ? (this.startTime = Math.min(this.startTime, l))
            : this.speed < 0 &&
              (this.startTime = Math.min(l - s / this.speed, this.startTime)),
            i ? (this.currentTime = l) : this.updateTime(l));
          const z = this.currentTime - d * (this.playbackSpeed >= 0 ? 1 : -1),
            G = this.playbackSpeed >= 0 ? z < 0 : z > s;
          ((this.currentTime = Math.max(z, 0)),
            this.state === "finished" &&
              this.holdTime === null &&
              (this.currentTime = s));
          let Y = this.currentTime,
            L = o;
          if (m) {
            const k = Math.min(this.currentTime, s) / q;
            let lt = Math.floor(k),
              pt = k % 1;
            (!pt && k >= 1 && (pt = 1),
              pt === 1 && lt--,
              (lt = Math.min(lt, m + 1)),
              !!(lt % 2) &&
                (h === "reverse"
                  ? ((pt = 1 - pt), y && (pt -= y / q))
                  : h === "mirror" && (L = c)),
              (Y = zn(0, 1, pt) * q));
          }
          const N = G ? { done: !1, value: v[0] } : L.next(Y);
          f && (N.value = f(N.value));
          let { done: I } = N;
          !G &&
            p !== null &&
            (I =
              this.playbackSpeed >= 0
                ? this.currentTime >= s
                : this.currentTime <= 0);
          const nt =
            this.holdTime === null &&
            (this.state === "finished" || (this.state === "running" && I));
          return (
            nt && A !== RV && (N.value = Af(v, this.options, Z, this.speed)),
            x && x(N.value),
            nt && this.finish(),
            N
          );
        }
        then(l, i) {
          return this.finished.then(l, i);
        }
        get duration() {
          return rn(this.calculatedDuration);
        }
        get time() {
          return rn(this.currentTime);
        }
        set time(l) {
          ((l = ln(l)),
            (this.currentTime = l),
            this.startTime === null ||
            this.holdTime !== null ||
            this.playbackSpeed === 0
              ? (this.holdTime = l)
              : this.driver &&
                (this.startTime = this.driver.now() - l / this.playbackSpeed));
        }
        get speed() {
          return this.playbackSpeed;
        }
        set speed(l) {
          this.updateTime(Fe.now());
          const i = this.playbackSpeed !== l;
          ((this.playbackSpeed = l), i && (this.time = rn(this.currentTime)));
        }
        play() {
          if (this.isStopped) return;
          const { driver: l = H9, onPlay: i, startTime: o } = this.options;
          (this.driver || (this.driver = l((f) => this.tick(f))), i && i());
          const s = this.driver.now();
          (this.state === "finished"
            ? (this.updateFinished(), (this.startTime = s))
            : this.holdTime !== null
              ? (this.startTime = s - this.holdTime)
              : this.startTime || (this.startTime = o ?? s),
            this.state === "finished" &&
              this.speed < 0 &&
              (this.startTime += this.calculatedDuration),
            (this.holdTime = null),
            (this.state = "running"),
            this.driver.start());
        }
        pause() {
          ((this.state = "paused"),
            this.updateTime(Fe.now()),
            (this.holdTime = this.currentTime));
        }
        complete() {
          (this.state !== "running" && this.play(),
            (this.state = "finished"),
            (this.holdTime = null));
        }
        finish() {
          (this.teardown(), (this.state = "finished"));
          const { onComplete: l } = this.options;
          l && l();
        }
        cancel() {
          ((this.holdTime = null),
            (this.startTime = 0),
            this.tick(0),
            this.teardown());
        }
        teardown() {
          (this.notifyFinished(),
            (this.state = "idle"),
            this.stopDriver(),
            (this.startTime = this.holdTime = null));
        }
        stopDriver() {
          this.driver && (this.driver.stop(), (this.driver = void 0));
        }
        sample(l) {
          return ((this.startTime = 0), this.tick(l, !0));
        }
        attachTimeline(l) {
          return (
            this.options.allowFlatten &&
              ((this.options.type = "keyframes"),
              (this.options.ease = "linear"),
              this.initAnimation()),
            l.observe(this)
          );
        }
      }
      function Vh(a) {
        for (let l = 1; l < a.length; l++) a[l] ?? (a[l] = a[l - 1]);
      }
      const Sa = (a) => (a * 180) / Math.PI,
        ZV = (a) => {
          const l = Sa(Math.atan2(a[1], a[0]));
          return xV(l);
        },
        fh = {
          x: 4,
          y: 5,
          translateX: 4,
          translateY: 5,
          scaleX: 0,
          scaleY: 3,
          scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
          rotate: ZV,
          rotateZ: ZV,
          skewX: (a) => Sa(Math.atan(a[1])),
          skewY: (a) => Sa(Math.atan(a[2])),
          skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2,
        },
        xV = (a) => ((a = a % 360), a < 0 && (a += 360), a),
        nK = ZV,
        aK = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
        lK = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]),
        ch = {
          x: 12,
          y: 13,
          z: 14,
          translateX: 12,
          translateY: 13,
          translateZ: 14,
          scaleX: aK,
          scaleY: lK,
          scale: (a) => (aK(a) + lK(a)) / 2,
          rotateX: (a) => xV(Sa(Math.atan2(a[6], a[5]))),
          rotateY: (a) => xV(Sa(Math.atan2(-a[2], a[0]))),
          rotateZ: nK,
          rotate: nK,
          skewX: (a) => Sa(Math.atan(a[4])),
          skewY: (a) => Sa(Math.atan(a[1])),
          skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2,
        };
      function rK(a) {
        return a.includes("scale") ? 1 : 0;
      }
      function TV(a, l) {
        if (!a || a === "none") return rK(l);
        const i = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
        let o, s;
        if (i) ((o = ch), (s = i));
        else {
          const q = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
          ((o = fh), (s = q));
        }
        if (!s) return rK(l);
        const f = o[l],
          c = s[1].split(",").map(dh);
        return typeof f == "function" ? f(c) : c[f];
      }
      const qh = (a, l) => {
        const { transform: i = "none" } = getComputedStyle(a);
        return TV(i, l);
      };
      function dh(a) {
        return parseFloat(a.trim());
      }
      const gl = [
          "transformPerspective",
          "x",
          "y",
          "z",
          "translateX",
          "translateY",
          "translateZ",
          "scale",
          "scaleX",
          "scaleY",
          "rotate",
          "rotateX",
          "rotateY",
          "rotateZ",
          "skew",
          "skewX",
          "skewY",
        ],
        Xl = new Set(gl),
        iK = (a) => a === Al || a === st,
        ph = new Set(["x", "y", "z"]),
        Kh = gl.filter((a) => !ph.has(a));
      function vh(a) {
        const l = [];
        return (
          Kh.forEach((i) => {
            const o = a.getValue(i);
            o !== void 0 &&
              (l.push([i, o.get()]), o.set(i.startsWith("scale") ? 1 : 0));
          }),
          l
        );
      }
      const ml = {
        width: ({ x: a }, { paddingLeft: l = "0", paddingRight: i = "0" }) =>
          a.max - a.min - parseFloat(l) - parseFloat(i),
        height: ({ y: a }, { paddingTop: l = "0", paddingBottom: i = "0" }) =>
          a.max - a.min - parseFloat(l) - parseFloat(i),
        top: (a, { top: l }) => parseFloat(l),
        left: (a, { left: l }) => parseFloat(l),
        bottom: ({ y: a }, { top: l }) => parseFloat(l) + (a.max - a.min),
        right: ({ x: a }, { left: l }) => parseFloat(l) + (a.max - a.min),
        x: (a, { transform: l }) => TV(l, "x"),
        y: (a, { transform: l }) => TV(l, "y"),
      };
      ml.translateX = ml.x;
      ml.translateY = ml.y;
      const za = new Set();
      let GV = !1,
        EV = !1,
        YV = !1;
      function rU() {
        if (EV) {
          const a = Array.from(za).filter((o) => o.needsMeasurement),
            l = new Set(a.map((o) => o.element)),
            i = new Map();
          (l.forEach((o) => {
            const s = vh(o);
            s.length && (i.set(o, s), o.render());
          }),
            a.forEach((o) => o.measureInitialState()),
            l.forEach((o) => {
              o.render();
              const s = i.get(o);
              s &&
                s.forEach(([f, c]) => {
                  o.getValue(f)?.set(c);
                });
            }),
            a.forEach((o) => o.measureEndState()),
            a.forEach((o) => {
              o.suspendedScrollY !== void 0 &&
                window.scrollTo(0, o.suspendedScrollY);
            }));
        }
        ((EV = !1), (GV = !1), za.forEach((a) => a.complete(YV)), za.clear());
      }
      function iU() {
        za.forEach((a) => {
          (a.readKeyframes(), a.needsMeasurement && (EV = !0));
        });
      }
      function Uh() {
        ((YV = !0), iU(), rU(), (YV = !1));
      }
      class Xf {
        constructor(l, i, o, s, f, c = !1) {
          ((this.isComplete = !1),
            (this.isAsync = !1),
            (this.needsMeasurement = !1),
            (this.isScheduled = !1),
            (this.unresolvedKeyframes = [...l]),
            (this.onComplete = i),
            (this.name = o),
            (this.motionValue = s),
            (this.element = f),
            (this.isAsync = c));
        }
        scheduleResolve() {
          ((this.isScheduled = !0),
            this.isAsync
              ? (za.add(this),
                GV || ((GV = !0), Mt.read(iU), Mt.resolveKeyframes(rU)))
              : (this.readKeyframes(), this.complete()));
        }
        readKeyframes() {
          const {
            unresolvedKeyframes: l,
            name: i,
            element: o,
            motionValue: s,
          } = this;
          if (l[0] === null) {
            const f = s?.get(),
              c = l[l.length - 1];
            if (f !== void 0) l[0] = f;
            else if (o && i) {
              const q = o.readValue(i, c);
              q != null && (l[0] = q);
            }
            (l[0] === void 0 && (l[0] = c), s && f === void 0 && s.set(l[0]));
          }
          Vh(l);
        }
        setFinalKeyframe() {}
        measureInitialState() {}
        renderEndStyles() {}
        measureEndState() {}
        complete(l = !1) {
          ((this.isComplete = !0),
            this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, l),
            za.delete(this));
        }
        cancel() {
          this.isComplete || ((this.isScheduled = !1), za.delete(this));
        }
        resume() {
          this.isComplete || this.scheduleResolve();
        }
      }
      const mh = (a) => a.startsWith("--");
      function hh(a, l, i) {
        mh(l) ? a.style.setProperty(l, i) : (a.style[l] = i);
      }
      const Fh = qf(() => window.ScrollTimeline !== void 0),
        yh = {};
      function Ah(a, l) {
        const i = qf(a);
        return () => yh[l] ?? i();
      }
      const oU = Ah(() => {
          try {
            document
              .createElement("div")
              .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
          } catch {
            return !1;
          }
          return !0;
        }, "linearEasing"),
        Cr = ([a, l, i, o]) => `cubic-bezier(${a}, ${l}, ${i}, ${o})`,
        oK = {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          circIn: Cr([0, 0.65, 0.55, 1]),
          circOut: Cr([0.55, 0, 1, 0.45]),
          backIn: Cr([0.31, 0.01, 0.66, -0.59]),
          backOut: Cr([0.33, 1.53, 0.69, 0.99]),
        };
      function uU(a, l) {
        if (a)
          return typeof a == "function"
            ? oU()
              ? eU(a, l)
              : "ease-out"
            : kv(a)
              ? Cr(a)
              : Array.isArray(a)
                ? a.map((i) => uU(i, l) || oK.easeOut)
                : oK[a];
      }
      function gh(
        a,
        l,
        i,
        {
          delay: o = 0,
          duration: s = 300,
          repeat: f = 0,
          repeatType: c = "loop",
          ease: q = "easeOut",
          times: p,
        } = {},
        d = void 0,
      ) {
        const v = { [l]: i };
        p && (v.offset = p);
        const m = uU(q, s);
        Array.isArray(m) && (v.easing = m);
        const h = {
          delay: o,
          duration: s,
          easing: Array.isArray(m) ? "linear" : m,
          fill: "both",
          iterations: f + 1,
          direction: c === "reverse" ? "alternate" : "normal",
        };
        return (d && (h.pseudoElement = d), a.animate(v, h));
      }
      function sU(a) {
        return typeof a == "function" && "applyToOptions" in a;
      }
      function Xh({ type: a, ...l }) {
        return sU(a) && oU()
          ? a.applyToOptions(l)
          : (l.duration ?? (l.duration = 300),
            l.ease ?? (l.ease = "easeOut"),
            l);
      }
      class Wh extends gf {
        constructor(l) {
          if ((super(), (this.finishedTime = null), (this.isStopped = !1), !l))
            return;
          const {
            element: i,
            name: o,
            keyframes: s,
            pseudoElement: f,
            allowFlatten: c = !1,
            finalKeyframe: q,
            onComplete: p,
          } = l;
          ((this.isPseudoElement = !!f),
            (this.allowFlatten = c),
            (this.options = l),
            cf(typeof l.type != "string"));
          const d = Xh(l);
          ((this.animation = gh(i, o, s, d, f)),
            d.autoplay === !1 && this.animation.pause(),
            (this.animation.onfinish = () => {
              if (((this.finishedTime = this.time), !f)) {
                const v = Af(s, this.options, q, this.speed);
                (this.updateMotionValue
                  ? this.updateMotionValue(v)
                  : hh(i, o, v),
                  this.animation.cancel());
              }
              (p?.(), this.notifyFinished());
            }),
            (this.animation.oncancel = () => this.notifyFinished()));
        }
        play() {
          this.isStopped ||
            (this.animation.play(),
            this.state === "finished" && this.updateFinished());
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.finish?.();
        }
        cancel() {
          try {
            this.animation.cancel();
          } catch {}
        }
        stop() {
          if (this.isStopped) return;
          this.isStopped = !0;
          const { state: l } = this;
          l === "idle" ||
            l === "finished" ||
            (this.updateMotionValue
              ? this.updateMotionValue()
              : this.commitStyles(),
            this.isPseudoElement || this.cancel());
        }
        commitStyles() {
          this.isPseudoElement || this.animation.commitStyles?.();
        }
        get duration() {
          const l = this.animation.effect?.getComputedTiming?.().duration || 0;
          return rn(Number(l));
        }
        get time() {
          return rn(Number(this.animation.currentTime) || 0);
        }
        set time(l) {
          ((this.finishedTime = null), (this.animation.currentTime = ln(l)));
        }
        get speed() {
          return this.animation.playbackRate;
        }
        set speed(l) {
          (l < 0 && (this.finishedTime = null),
            (this.animation.playbackRate = l));
        }
        get state() {
          return this.finishedTime !== null
            ? "finished"
            : this.animation.playState;
        }
        get startTime() {
          return Number(this.animation.startTime);
        }
        set startTime(l) {
          this.animation.startTime = l;
        }
        attachTimeline({ timeline: l, observe: i }) {
          return (
            this.allowFlatten &&
              this.animation.effect?.updateTiming({ easing: "linear" }),
            (this.animation.onfinish = null),
            l && Fh() ? ((this.animation.timeline = l), He) : i(this)
          );
        }
      }
      const VU = { anticipate: Ov, backInOut: Mv, circInOut: Jv };
      function Sh(a) {
        return a in VU;
      }
      function zh(a) {
        typeof a.ease == "string" && Sh(a.ease) && (a.ease = VU[a.ease]);
      }
      const uK = 10;
      class Ch extends Wh {
        constructor(l) {
          (zh(l),
            aU(l),
            super(l),
            l.startTime && (this.startTime = l.startTime),
            (this.options = l));
        }
        updateMotionValue(l) {
          const {
            motionValue: i,
            onUpdate: o,
            onComplete: s,
            element: f,
            ...c
          } = this.options;
          if (!i) return;
          if (l !== void 0) {
            i.set(l);
            return;
          }
          const q = new lU({ ...c, autoplay: !1 }),
            p = ln(this.finishedTime ?? this.time);
          (i.setWithVelocity(q.sample(p - uK).value, q.sample(p).value, uK),
            q.stop());
        }
      }
      const sK = (a, l) =>
        l === "zIndex"
          ? !1
          : !!(
              typeof a == "number" ||
              Array.isArray(a) ||
              (typeof a == "string" &&
                (aa.test(a) || a === "0") &&
                !a.startsWith("url("))
            );
      function Qh(a) {
        const l = a[0];
        if (a.length === 1) return !0;
        for (let i = 0; i < a.length; i++) if (a[i] !== l) return !0;
      }
      function bh(a, l, i, o) {
        const s = a[0];
        if (s === null) return !1;
        if (l === "display" || l === "visibility") return !0;
        const f = a[a.length - 1],
          c = sK(s, l),
          q = sK(f, l);
        return !c || !q ? !1 : Qh(a) || ((i === "spring" || sU(i)) && o);
      }
      const Bh = new Set(["opacity", "clipPath", "filter", "transform"]),
        Rh = qf(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
      function Zh(a) {
        const {
          motionValue: l,
          name: i,
          repeatDelay: o,
          repeatType: s,
          damping: f,
          type: c,
        } = a;
        if (!l || !l.owner || !(l.owner.current instanceof HTMLElement))
          return !1;
        const { onUpdate: q, transformTemplate: p } = l.owner.getProps();
        return (
          Rh() &&
          i &&
          Bh.has(i) &&
          (i !== "transform" || !p) &&
          !q &&
          !o &&
          s !== "mirror" &&
          f !== 0 &&
          c !== "inertia"
        );
      }
      const xh = 40;
      class Th extends gf {
        constructor({
          autoplay: l = !0,
          delay: i = 0,
          type: o = "keyframes",
          repeat: s = 0,
          repeatDelay: f = 0,
          repeatType: c = "loop",
          keyframes: q,
          name: p,
          motionValue: d,
          element: v,
          ...m
        }) {
          (super(),
            (this.stop = () => {
              this._animation
                ? (this._animation.stop(), this.stopTimeline?.())
                : this.keyframeResolver?.cancel();
            }),
            (this.createdAt = Fe.now()));
          const h = {
              autoplay: l,
              delay: i,
              type: o,
              repeat: s,
              repeatDelay: f,
              repeatType: c,
              name: p,
              motionValue: d,
              element: v,
              ...m,
            },
            y = v?.KeyframeResolver || Xf;
          ((this.keyframeResolver = new y(
            q,
            (A, x, Z) => this.onKeyframesResolved(A, x, h, !Z),
            p,
            d,
            v,
          )),
            this.keyframeResolver?.scheduleResolve());
        }
        onKeyframesResolved(l, i, o, s) {
          this.keyframeResolver = void 0;
          const {
            name: f,
            type: c,
            velocity: q,
            delay: p,
            isHandoff: d,
            onUpdate: v,
          } = o;
          ((this.resolvedAt = Fe.now()),
            bh(l, f, c, q) ||
              ((Cn.instantAnimations || !p) && v?.(Af(l, o, i)),
              (l[0] = l[l.length - 1]),
              (o.duration = 0),
              (o.repeat = 0)));
          const h = {
              startTime: s
                ? this.resolvedAt
                  ? this.resolvedAt - this.createdAt > xh
                    ? this.resolvedAt
                    : this.createdAt
                  : this.createdAt
                : void 0,
              finalKeyframe: i,
              ...o,
              keyframes: l,
            },
            y =
              !d && Zh(h)
                ? new Ch({ ...h, element: h.motionValue.owner.current })
                : new lU(h);
          (y.finished.then(() => this.notifyFinished()).catch(He),
            this.pendingTimeline &&
              ((this.stopTimeline = y.attachTimeline(this.pendingTimeline)),
              (this.pendingTimeline = void 0)),
            (this._animation = y));
        }
        get finished() {
          return this._animation ? this.animation.finished : this._finished;
        }
        then(l, i) {
          return this.finished.finally(l).then(() => {});
        }
        get animation() {
          return (this._animation || Uh(), this._animation);
        }
        get duration() {
          return this.animation.duration;
        }
        get time() {
          return this.animation.time;
        }
        set time(l) {
          this.animation.time = l;
        }
        get speed() {
          return this.animation.speed;
        }
        get state() {
          return this.animation.state;
        }
        set speed(l) {
          this.animation.speed = l;
        }
        get startTime() {
          return this.animation.startTime;
        }
        attachTimeline(l) {
          return (
            this._animation
              ? (this.stopTimeline = this.animation.attachTimeline(l))
              : (this.pendingTimeline = l),
            () => this.stop()
          );
        }
        play() {
          this.animation.play();
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.complete();
        }
        cancel() {
          this.animation.cancel();
        }
      }
      const Gh = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
      function Eh(a) {
        const l = Gh.exec(a);
        if (!l) return [,];
        const [, i, o, s] = l;
        return [`--${i ?? o}`, s];
      }
      function fU(a, l, i = 1) {
        const [o, s] = Eh(a);
        if (!o) return;
        const f = window.getComputedStyle(l).getPropertyValue(o);
        if (f) {
          const c = f.trim();
          return Rv(c) ? parseFloat(c) : c;
        }
        return Uf(s) ? fU(s, l, i + 1) : s;
      }
      function Wf(a, l) {
        return a?.[l] ?? a?.default ?? a;
      }
      const cU = new Set([
          "width",
          "height",
          "top",
          "left",
          "right",
          "bottom",
          ...gl,
        ]),
        Yh = { test: (a) => a === "auto", parse: (a) => a },
        qU = (a) => (l) => l.test(a),
        dU = [Al, st, on, ea, Q9, C9, Yh],
        VK = (a) => dU.find(qU(a));
      function Mh(a) {
        return typeof a == "number"
          ? a === 0
          : a !== null
            ? a === "none" || a === "0" || Zv(a)
            : !0;
      }
      const Oh = new Set(["brightness", "contrast", "saturate", "opacity"]);
      function Nh(a) {
        const [l, i] = a.slice(0, -1).split("(");
        if (l === "drop-shadow") return a;
        const [o] = i.match(mf) || [];
        if (!o) return a;
        const s = i.replace(o, "");
        let f = Oh.has(l) ? 1 : 0;
        return (o !== i && (f *= 100), l + "(" + f + s + ")");
      }
      const Jh = /\b([a-z-]*)\(.*?\)/gu,
        MV = {
          ...aa,
          getAnimatableNone: (a) => {
            const l = a.match(Jh);
            return l ? l.map(Nh).join(" ") : a;
          },
        },
        fK = { ...Al, transform: Math.round },
        Ph = {
          rotate: ea,
          rotateX: ea,
          rotateY: ea,
          rotateZ: ea,
          scale: Ko,
          scaleX: Ko,
          scaleY: Ko,
          scaleZ: Ko,
          skew: ea,
          skewX: ea,
          skewY: ea,
          distance: st,
          translateX: st,
          translateY: st,
          translateZ: st,
          x: st,
          y: st,
          z: st,
          perspective: st,
          transformPerspective: st,
          opacity: Er,
          originX: wp,
          originY: wp,
          originZ: st,
        },
        Sf = {
          borderWidth: st,
          borderTopWidth: st,
          borderRightWidth: st,
          borderBottomWidth: st,
          borderLeftWidth: st,
          borderRadius: st,
          radius: st,
          borderTopLeftRadius: st,
          borderTopRightRadius: st,
          borderBottomRightRadius: st,
          borderBottomLeftRadius: st,
          width: st,
          maxWidth: st,
          height: st,
          maxHeight: st,
          top: st,
          right: st,
          bottom: st,
          left: st,
          padding: st,
          paddingTop: st,
          paddingRight: st,
          paddingBottom: st,
          paddingLeft: st,
          margin: st,
          marginTop: st,
          marginRight: st,
          marginBottom: st,
          marginLeft: st,
          backgroundPositionX: st,
          backgroundPositionY: st,
          ...Ph,
          zIndex: fK,
          fillOpacity: Er,
          strokeOpacity: Er,
          numOctaves: fK,
        },
        kh = {
          ...Sf,
          color: fe,
          backgroundColor: fe,
          outlineColor: fe,
          fill: fe,
          stroke: fe,
          borderColor: fe,
          borderTopColor: fe,
          borderRightColor: fe,
          borderBottomColor: fe,
          borderLeftColor: fe,
          filter: MV,
          WebkitFilter: MV,
        },
        pU = (a) => kh[a];
      function KU(a, l) {
        let i = pU(a);
        return (
          i !== MV && (i = aa),
          i.getAnimatableNone ? i.getAnimatableNone(l) : void 0
        );
      }
      const Hh = new Set(["auto", "none", "0"]);
      function jh(a, l, i) {
        let o = 0,
          s;
        for (; o < a.length && !s; ) {
          const f = a[o];
          (typeof f == "string" &&
            !Hh.has(f) &&
            Yr(f).values.length &&
            (s = a[o]),
            o++);
        }
        if (s && i) for (const f of l) a[f] = KU(i, s);
      }
      class Ih extends Xf {
        constructor(l, i, o, s, f) {
          super(l, i, o, s, f, !0);
        }
        readKeyframes() {
          const { unresolvedKeyframes: l, element: i, name: o } = this;
          if (!i || !i.current) return;
          super.readKeyframes();
          for (let p = 0; p < l.length; p++) {
            let d = l[p];
            if (typeof d == "string" && ((d = d.trim()), Uf(d))) {
              const v = fU(d, i.current);
              (v !== void 0 && (l[p] = v),
                p === l.length - 1 && (this.finalKeyframe = d));
            }
          }
          if ((this.resolveNoneKeyframes(), !cU.has(o) || l.length !== 2))
            return;
          const [s, f] = l,
            c = VK(s),
            q = VK(f);
          if (c !== q)
            if (iK(c) && iK(q))
              for (let p = 0; p < l.length; p++) {
                const d = l[p];
                typeof d == "string" && (l[p] = parseFloat(d));
              }
            else this.needsMeasurement = !0;
        }
        resolveNoneKeyframes() {
          const { unresolvedKeyframes: l, name: i } = this,
            o = [];
          for (let s = 0; s < l.length; s++)
            (l[s] === null || Mh(l[s])) && o.push(s);
          o.length && jh(l, o, i);
        }
        measureInitialState() {
          const { element: l, unresolvedKeyframes: i, name: o } = this;
          if (!l || !l.current) return;
          (o === "height" && (this.suspendedScrollY = window.pageYOffset),
            (this.measuredOrigin = ml[o](
              l.measureViewportBox(),
              window.getComputedStyle(l.current),
            )),
            (i[0] = this.measuredOrigin));
          const s = i[i.length - 1];
          s !== void 0 && l.getValue(o, s).jump(s, !1);
        }
        measureEndState() {
          const { element: l, name: i, unresolvedKeyframes: o } = this;
          if (!l || !l.current) return;
          const s = l.getValue(i);
          s && s.jump(this.measuredOrigin, !1);
          const f = o.length - 1,
            c = o[f];
          ((o[f] = ml[i](
            l.measureViewportBox(),
            window.getComputedStyle(l.current),
          )),
            c !== null &&
              this.finalKeyframe === void 0 &&
              (this.finalKeyframe = c),
            this.removedTransforms?.length &&
              this.removedTransforms.forEach(([q, p]) => {
                l.getValue(q).set(p);
              }),
            this.resolveNoneKeyframes());
        }
      }
      function Dh(a, l, i) {
        if (a instanceof EventTarget) return [a];
        if (typeof a == "string") {
          let o = document;
          const s = i?.[a] ?? o.querySelectorAll(a);
          return s ? Array.from(s) : [];
        }
        return Array.from(a);
      }
      const { schedule: zf } = Hv(queueMicrotask, !1),
        we = { x: !1, y: !1 };
      function vU() {
        return we.x || we.y;
      }
      function Lh(a) {
        return a === "x" || a === "y"
          ? we[a]
            ? null
            : ((we[a] = !0),
              () => {
                we[a] = !1;
              })
          : we.x || we.y
            ? null
            : ((we.x = we.y = !0),
              () => {
                we.x = we.y = !1;
              });
      }
      function UU(a, l) {
        const i = Dh(a),
          o = new AbortController(),
          s = { passive: !0, ...l, signal: o.signal };
        return [i, s, () => o.abort()];
      }
      function cK(a) {
        return !(a.pointerType === "touch" || vU());
      }
      function wh(a, l, i = {}) {
        const [o, s, f] = UU(a, i),
          c = (q) => {
            if (!cK(q)) return;
            const { target: p } = q,
              d = l(p, q);
            if (typeof d != "function" || !p) return;
            const v = (m) => {
              cK(m) && (d(m), p.removeEventListener("pointerleave", v));
            };
            p.addEventListener("pointerleave", v, s);
          };
        return (
          o.forEach((q) => {
            q.addEventListener("pointerenter", c, s);
          }),
          f
        );
      }
      const mU = (a, l) => (l ? (a === l ? !0 : mU(a, l.parentElement)) : !1),
        Cf = (a) =>
          a.pointerType === "mouse"
            ? typeof a.button != "number" || a.button <= 0
            : a.isPrimary !== !1,
        _h = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
      function $h(a) {
        return _h.has(a.tagName) || a.tabIndex !== -1;
      }
      const Qr = new WeakSet();
      function qK(a) {
        return (l) => {
          l.key === "Enter" && a(l);
        };
      }
      function pV(a, l) {
        a.dispatchEvent(
          new PointerEvent("pointer" + l, { isPrimary: !0, bubbles: !0 }),
        );
      }
      const tF = (a, l) => {
        const i = a.currentTarget;
        if (!i) return;
        const o = qK(() => {
          if (Qr.has(i)) return;
          pV(i, "down");
          const s = qK(() => {
              pV(i, "up");
            }),
            f = () => pV(i, "cancel");
          (i.addEventListener("keyup", s, l), i.addEventListener("blur", f, l));
        });
        (i.addEventListener("keydown", o, l),
          i.addEventListener(
            "blur",
            () => i.removeEventListener("keydown", o),
            l,
          ));
      };
      function dK(a) {
        return Cf(a) && !vU();
      }
      function eF(a, l, i = {}) {
        const [o, s, f] = UU(a, i),
          c = (q) => {
            const p = q.currentTarget;
            if (!dK(q) || Qr.has(p)) return;
            Qr.add(p);
            const d = l(p, q),
              v = (y, A) => {
                (window.removeEventListener("pointerup", m),
                  window.removeEventListener("pointercancel", h),
                  !(!dK(y) || !Qr.has(p)) &&
                    (Qr.delete(p),
                    typeof d == "function" && d(y, { success: A })));
              },
              m = (y) => {
                v(
                  y,
                  p === window ||
                    p === document ||
                    i.useGlobalTarget ||
                    mU(p, y.target),
                );
              },
              h = (y) => {
                v(y, !1);
              };
            (window.addEventListener("pointerup", m, s),
              window.addEventListener("pointercancel", h, s));
          };
        return (
          o.forEach((q) => {
            ((i.useGlobalTarget ? window : q).addEventListener(
              "pointerdown",
              c,
              s,
            ),
              q instanceof HTMLElement &&
                (q.addEventListener("focus", (d) => tF(d, s)),
                !$h(q) && !q.hasAttribute("tabindex") && (q.tabIndex = 0)));
          }),
          f
        );
      }
      const pK = 30,
        nF = (a) => !isNaN(parseFloat(a));
      class aF {
        constructor(l, i = {}) {
          ((this.version = "12.9.1"),
            (this.canTrackVelocity = null),
            (this.events = {}),
            (this.updateAndNotify = (o, s = !0) => {
              const f = Fe.now();
              (this.updatedAt !== f && this.setPrevFrameValue(),
                (this.prev = this.current),
                this.setCurrent(o),
                this.current !== this.prev &&
                  this.events.change?.notify(this.current),
                s && this.events.renderRequest?.notify(this.current));
            }),
            (this.hasAnimated = !1),
            this.setCurrent(l),
            (this.owner = i.owner));
        }
        setCurrent(l) {
          ((this.current = l),
            (this.updatedAt = Fe.now()),
            this.canTrackVelocity === null &&
              l !== void 0 &&
              (this.canTrackVelocity = nF(this.current)));
        }
        setPrevFrameValue(l = this.current) {
          ((this.prevFrameValue = l), (this.prevUpdatedAt = this.updatedAt));
        }
        onChange(l) {
          return this.on("change", l);
        }
        on(l, i) {
          this.events[l] || (this.events[l] = new df());
          const o = this.events[l].add(i);
          return l === "change"
            ? () => {
                (o(),
                  Mt.read(() => {
                    this.events.change.getSize() || this.stop();
                  }));
              }
            : o;
        }
        clearListeners() {
          for (const l in this.events) this.events[l].clear();
        }
        attach(l, i) {
          ((this.passiveEffect = l), (this.stopPassiveEffect = i));
        }
        set(l, i = !0) {
          !i || !this.passiveEffect
            ? this.updateAndNotify(l, i)
            : this.passiveEffect(l, this.updateAndNotify);
        }
        setWithVelocity(l, i, o) {
          (this.set(i),
            (this.prev = void 0),
            (this.prevFrameValue = l),
            (this.prevUpdatedAt = this.updatedAt - o));
        }
        jump(l, i = !0) {
          (this.updateAndNotify(l),
            (this.prev = l),
            (this.prevUpdatedAt = this.prevFrameValue = void 0),
            i && this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect());
        }
        get() {
          return this.current;
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          const l = Fe.now();
          if (
            !this.canTrackVelocity ||
            this.prevFrameValue === void 0 ||
            l - this.updatedAt > pK
          )
            return 0;
          const i = Math.min(this.updatedAt - this.prevUpdatedAt, pK);
          return xv(
            parseFloat(this.current) - parseFloat(this.prevFrameValue),
            i,
          );
        }
        start(l) {
          return (
            this.stop(),
            new Promise((i) => {
              ((this.hasAnimated = !0),
                (this.animation = l(i)),
                this.events.animationStart &&
                  this.events.animationStart.notify());
            }).then(() => {
              (this.events.animationComplete &&
                this.events.animationComplete.notify(),
                this.clearAnimation());
            })
          );
        }
        stop() {
          (this.animation &&
            (this.animation.stop(),
            this.events.animationCancel &&
              this.events.animationCancel.notify()),
            this.clearAnimation());
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          (this.events.destroy?.notify(),
            this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect());
        }
      }
      function Mr(a, l) {
        return new aF(a, l);
      }
      const lF = [...dU, fe, aa],
        rF = (a) => lF.find(qU(a)),
        hU = (a, l) => (l && typeof a == "number" ? l.transform(a) : a),
        FU = X.createContext({ strict: !1 }),
        KK = {
          animation: [
            "animate",
            "variants",
            "whileHover",
            "whileTap",
            "exit",
            "whileInView",
            "whileFocus",
            "whileDrag",
          ],
          exit: ["exit"],
          drag: ["drag", "dragControls"],
          focus: ["whileFocus"],
          hover: ["whileHover", "onHoverStart", "onHoverEnd"],
          tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
          pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
          inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
          layout: ["layout", "layoutId"],
        },
        hl = {};
      for (const a in KK)
        hl[a] = { isEnabled: (l) => KK[a].some((i) => !!l[i]) };
      function iF(a) {
        for (const l in a) hl[l] = { ...hl[l], ...a[l] };
      }
      const oF = new Set([
        "animate",
        "exit",
        "variants",
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "custom",
        "inherit",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "_dragX",
        "_dragY",
        "onHoverStart",
        "onHoverEnd",
        "onViewportEnter",
        "onViewportLeave",
        "globalTapTarget",
        "ignoreStrict",
        "viewport",
      ]);
      function Bo(a) {
        return (
          a.startsWith("while") ||
          (a.startsWith("drag") && a !== "draggable") ||
          a.startsWith("layout") ||
          a.startsWith("onTap") ||
          a.startsWith("onPan") ||
          a.startsWith("onLayout") ||
          oF.has(a)
        );
      }
      let yU = (a) => !Bo(a);
      function uF(a) {
        a && (yU = (l) => (l.startsWith("on") ? !Bo(l) : a(l)));
      }
      try {
        uF(require("@emotion/is-prop-valid").default);
      } catch {}
      function sF(a, l, i) {
        const o = {};
        for (const s in a)
          (s === "values" && typeof a.values == "object") ||
            ((yU(s) ||
              (i === !0 && Bo(s)) ||
              (!l && !Bo(s)) ||
              (a.draggable && s.startsWith("onDrag"))) &&
              (o[s] = a[s]));
        return o;
      }
      function VF(a) {
        if (typeof Proxy > "u") return a;
        const l = new Map(),
          i = (...o) => a(...o);
        return new Proxy(i, {
          get: (o, s) =>
            s === "create" ? a : (l.has(s) || l.set(s, a(s)), l.get(s)),
        });
      }
      const Oo = X.createContext({});
      function No(a) {
        return (
          a !== null && typeof a == "object" && typeof a.start == "function"
        );
      }
      function Or(a) {
        return typeof a == "string" || Array.isArray(a);
      }
      const Qf = [
          "animate",
          "whileInView",
          "whileFocus",
          "whileHover",
          "whileTap",
          "whileDrag",
          "exit",
        ],
        bf = ["initial", ...Qf];
      function Jo(a) {
        return No(a.animate) || bf.some((l) => Or(a[l]));
      }
      function AU(a) {
        return !!(Jo(a) || a.variants);
      }
      function fF(a, l) {
        if (Jo(a)) {
          const { initial: i, animate: o } = a;
          return {
            initial: i === !1 || Or(i) ? i : void 0,
            animate: Or(o) ? o : void 0,
          };
        }
        return a.inherit !== !1 ? l : {};
      }
      function cF(a) {
        const { initial: l, animate: i } = fF(a, X.useContext(Oo));
        return X.useMemo(() => ({ initial: l, animate: i }), [vK(l), vK(i)]);
      }
      function vK(a) {
        return Array.isArray(a) ? a.join(" ") : a;
      }
      const qF = Symbol.for("motionComponentSymbol");
      function pl(a) {
        return (
          a &&
          typeof a == "object" &&
          Object.prototype.hasOwnProperty.call(a, "current")
        );
      }
      function dF(a, l, i) {
        return X.useCallback(
          (o) => {
            (o && a.onMount && a.onMount(o),
              l && (o ? l.mount(o) : l.unmount()),
              i && (typeof i == "function" ? i(o) : pl(i) && (i.current = o)));
          },
          [l],
        );
      }
      const Bf = (a) => a.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
        pF = "framerAppearId",
        gU = "data-" + Bf(pF),
        XU = X.createContext({});
      function KF(a, l, i, o, s) {
        const { visualElement: f } = X.useContext(Oo),
          c = X.useContext(FU),
          q = X.useContext(Mo),
          p = X.useContext(sf).reducedMotion,
          d = X.useRef(null);
        ((o = o || c.renderer),
          !d.current &&
            o &&
            (d.current = o(a, {
              visualState: l,
              parent: f,
              props: i,
              presenceContext: q,
              blockInitialAnimation: q ? q.initial === !1 : !1,
              reducedMotionConfig: p,
            })));
        const v = d.current,
          m = X.useContext(XU);
        v &&
          !v.projection &&
          s &&
          (v.type === "html" || v.type === "svg") &&
          vF(d.current, i, s, m);
        const h = X.useRef(!1);
        X.useInsertionEffect(() => {
          v && h.current && v.update(i, q);
        });
        const y = i[gU],
          A = X.useRef(
            !!y &&
              !window.MotionHandoffIsComplete?.(y) &&
              window.MotionHasOptimisedAnimation?.(y),
          );
        return (
          bv(() => {
            v &&
              ((h.current = !0),
              (window.MotionIsMounted = !0),
              v.updateFeatures(),
              zf.render(v.render),
              A.current &&
                v.animationState &&
                v.animationState.animateChanges());
          }),
          X.useEffect(() => {
            v &&
              (!A.current &&
                v.animationState &&
                v.animationState.animateChanges(),
              A.current &&
                (queueMicrotask(() => {
                  window.MotionHandoffMarkAsComplete?.(y);
                }),
                (A.current = !1)));
          }),
          v
        );
      }
      function vF(a, l, i, o) {
        const {
          layoutId: s,
          layout: f,
          drag: c,
          dragConstraints: q,
          layoutScroll: p,
          layoutRoot: d,
          layoutCrossfade: v,
        } = l;
        ((a.projection = new i(
          a.latestValues,
          l["data-framer-portal-id"] ? void 0 : WU(a.parent),
        )),
          a.projection.setOptions({
            layoutId: s,
            layout: f,
            alwaysMeasureLayout: !!c || (q && pl(q)),
            visualElement: a,
            animationType: typeof f == "string" ? f : "both",
            initialPromotionConfig: o,
            crossfade: v,
            layoutScroll: p,
            layoutRoot: d,
          }));
      }
      function WU(a) {
        if (a)
          return a.options.allowProjection !== !1 ? a.projection : WU(a.parent);
      }
      function UF({
        preloadedFeatures: a,
        createVisualElement: l,
        useRender: i,
        useVisualState: o,
        Component: s,
      }) {
        a && iF(a);
        function f(q, p) {
          let d;
          const v = { ...X.useContext(sf), ...q, layoutId: mF(q) },
            { isStatic: m } = v,
            h = cF(q),
            y = o(q, m);
          if (!m && uf) {
            hF();
            const A = FF(v);
            ((d = A.MeasureLayout),
              (h.visualElement = KF(s, y, v, l, A.ProjectionNode)));
          }
          return b.jsxs(Oo.Provider, {
            value: h,
            children: [
              d && h.visualElement
                ? b.jsx(d, { visualElement: h.visualElement, ...v })
                : null,
              i(s, q, dF(y, h.visualElement, p), y, m, h.visualElement),
            ],
          });
        }
        f.displayName = `motion.${typeof s == "string" ? s : `create(${s.displayName ?? s.name ?? ""})`}`;
        const c = X.forwardRef(f);
        return ((c[qF] = s), c);
      }
      function mF({ layoutId: a }) {
        const l = X.useContext(rf).id;
        return l && a !== void 0 ? l + "-" + a : a;
      }
      function hF(a, l) {
        X.useContext(FU).strict;
      }
      function FF(a) {
        const { drag: l, layout: i } = hl;
        if (!l && !i) return {};
        const o = { ...l, ...i };
        return {
          MeasureLayout:
            l?.isEnabled(a) || i?.isEnabled(a) ? o.MeasureLayout : void 0,
          ProjectionNode: o.ProjectionNode,
        };
      }
      const Nr = {};
      function yF(a) {
        for (const l in a)
          ((Nr[l] = a[l]), vf(l) && (Nr[l].isCSSVariable = !0));
      }
      function SU(a, { layout: l, layoutId: i }) {
        return (
          Xl.has(a) ||
          a.startsWith("origin") ||
          ((l || i !== void 0) && (!!Nr[a] || a === "opacity"))
        );
      }
      const ce = (a) => !!(a && a.getVelocity),
        AF = {
          x: "translateX",
          y: "translateY",
          z: "translateZ",
          transformPerspective: "perspective",
        },
        gF = gl.length;
      function XF(a, l, i) {
        let o = "",
          s = !0;
        for (let f = 0; f < gF; f++) {
          const c = gl[f],
            q = a[c];
          if (q === void 0) continue;
          let p = !0;
          if (
            (typeof q == "number"
              ? (p = q === (c.startsWith("scale") ? 1 : 0))
              : (p = parseFloat(q) === 0),
            !p || i)
          ) {
            const d = hU(q, Sf[c]);
            if (!p) {
              s = !1;
              const v = AF[c] || c;
              o += `${v}(${d}) `;
            }
            i && (l[c] = d);
          }
        }
        return (
          (o = o.trim()),
          i ? (o = i(l, s ? "" : o)) : s && (o = "none"),
          o
        );
      }
      function Rf(a, l, i) {
        const { style: o, vars: s, transformOrigin: f } = a;
        let c = !1,
          q = !1;
        for (const p in l) {
          const d = l[p];
          if (Xl.has(p)) {
            c = !0;
            continue;
          } else if (vf(p)) {
            s[p] = d;
            continue;
          } else {
            const v = hU(d, Sf[p]);
            p.startsWith("origin") ? ((q = !0), (f[p] = v)) : (o[p] = v);
          }
        }
        if (
          (l.transform ||
            (c || i
              ? (o.transform = XF(l, a.transform, i))
              : o.transform && (o.transform = "none")),
          q)
        ) {
          const { originX: p = "50%", originY: d = "50%", originZ: v = 0 } = f;
          o.transformOrigin = `${p} ${d} ${v}`;
        }
      }
      const Zf = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {},
      });
      function zU(a, l, i) {
        for (const o in l) !ce(l[o]) && !SU(o, i) && (a[o] = l[o]);
      }
      function WF({ transformTemplate: a }, l) {
        return X.useMemo(() => {
          const i = Zf();
          return (Rf(i, l, a), Object.assign({}, i.vars, i.style));
        }, [l]);
      }
      function SF(a, l) {
        const i = a.style || {},
          o = {};
        return (zU(o, i, a), Object.assign(o, WF(a, l)), o);
      }
      function zF(a, l) {
        const i = {},
          o = SF(a, l);
        return (
          a.drag &&
            a.dragListener !== !1 &&
            ((i.draggable = !1),
            (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none"),
            (o.touchAction =
              a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`)),
          a.tabIndex === void 0 &&
            (a.onTap || a.onTapStart || a.whileTap) &&
            (i.tabIndex = 0),
          (i.style = o),
          i
        );
      }
      const CF = [
        "animate",
        "circle",
        "defs",
        "desc",
        "ellipse",
        "g",
        "image",
        "line",
        "filter",
        "marker",
        "mask",
        "metadata",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "rect",
        "stop",
        "switch",
        "symbol",
        "svg",
        "text",
        "tspan",
        "use",
        "view",
      ];
      function xf(a) {
        return typeof a != "string" || a.includes("-")
          ? !1
          : !!(CF.indexOf(a) > -1 || /[A-Z]/u.test(a));
      }
      const QF = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
        bF = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function BF(a, l, i = 1, o = 0, s = !0) {
        a.pathLength = 1;
        const f = s ? QF : bF;
        a[f.offset] = st.transform(-o);
        const c = st.transform(l),
          q = st.transform(i);
        a[f.array] = `${c} ${q}`;
      }
      function CU(
        a,
        {
          attrX: l,
          attrY: i,
          attrScale: o,
          pathLength: s,
          pathSpacing: f = 1,
          pathOffset: c = 0,
          ...q
        },
        p,
        d,
      ) {
        if ((Rf(a, q, d), p)) {
          a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
          return;
        }
        ((a.attrs = a.style), (a.style = {}));
        const { attrs: v, style: m } = a;
        (v.transform && ((m.transform = v.transform), delete v.transform),
          (m.transform || v.transformOrigin) &&
            ((m.transformOrigin = v.transformOrigin ?? "50% 50%"),
            delete v.transformOrigin),
          m.transform && ((m.transformBox = "fill-box"), delete v.transformBox),
          l !== void 0 && (v.x = l),
          i !== void 0 && (v.y = i),
          o !== void 0 && (v.scale = o),
          s !== void 0 && BF(v, s, f, c, !1));
      }
      const QU = () => ({ ...Zf(), attrs: {} }),
        bU = (a) => typeof a == "string" && a.toLowerCase() === "svg";
      function RF(a, l, i, o) {
        const s = X.useMemo(() => {
          const f = QU();
          return (
            CU(f, l, bU(o), a.transformTemplate),
            { ...f.attrs, style: { ...f.style } }
          );
        }, [l]);
        if (a.style) {
          const f = {};
          (zU(f, a.style, a), (s.style = { ...f, ...s.style }));
        }
        return s;
      }
      function ZF(a = !1) {
        return (i, o, s, { latestValues: f }, c) => {
          const p = (xf(i) ? RF : zF)(o, f, c, i),
            d = sF(o, typeof i == "string", a),
            v = i !== X.Fragment ? { ...d, ...p, ref: s } : {},
            { children: m } = o,
            h = X.useMemo(() => (ce(m) ? m.get() : m), [m]);
          return X.createElement(i, { ...v, children: h });
        };
      }
      function UK(a) {
        const l = [{}, {}];
        return (
          a?.values.forEach((i, o) => {
            ((l[0][o] = i.get()), (l[1][o] = i.getVelocity()));
          }),
          l
        );
      }
      function Tf(a, l, i, o) {
        if (typeof l == "function") {
          const [s, f] = UK(o);
          l = l(i !== void 0 ? i : a.custom, s, f);
        }
        if (
          (typeof l == "string" && (l = a.variants && a.variants[l]),
          typeof l == "function")
        ) {
          const [s, f] = UK(o);
          l = l(i !== void 0 ? i : a.custom, s, f);
        }
        return l;
      }
      function Ao(a) {
        return ce(a) ? a.get() : a;
      }
      function xF(
        { scrapeMotionValuesFromProps: a, createRenderState: l },
        i,
        o,
        s,
      ) {
        return { latestValues: TF(i, o, s, a), renderState: l() };
      }
      const BU = (a) => (l, i) => {
        const o = X.useContext(Oo),
          s = X.useContext(Mo),
          f = () => xF(a, l, o, s);
        return i ? f() : of(f);
      };
      function TF(a, l, i, o) {
        const s = {},
          f = o(a, {});
        for (const h in f) s[h] = Ao(f[h]);
        let { initial: c, animate: q } = a;
        const p = Jo(a),
          d = AU(a);
        l &&
          d &&
          !p &&
          a.inherit !== !1 &&
          (c === void 0 && (c = l.initial), q === void 0 && (q = l.animate));
        let v = i ? i.initial === !1 : !1;
        v = v || c === !1;
        const m = v ? q : c;
        if (m && typeof m != "boolean" && !No(m)) {
          const h = Array.isArray(m) ? m : [m];
          for (let y = 0; y < h.length; y++) {
            const A = Tf(a, h[y]);
            if (A) {
              const { transitionEnd: x, transition: Z, ...z } = A;
              for (const G in z) {
                let Y = z[G];
                if (Array.isArray(Y)) {
                  const L = v ? Y.length - 1 : 0;
                  Y = Y[L];
                }
                Y !== null && (s[G] = Y);
              }
              for (const G in x) s[G] = x[G];
            }
          }
        }
        return s;
      }
      function Gf(a, l, i) {
        const { style: o } = a,
          s = {};
        for (const f in o)
          (ce(o[f]) ||
            (l.style && ce(l.style[f])) ||
            SU(f, a) ||
            i?.getValue(f)?.liveStyle !== void 0) &&
            (s[f] = o[f]);
        return s;
      }
      const GF = {
        useVisualState: BU({
          scrapeMotionValuesFromProps: Gf,
          createRenderState: Zf,
        }),
      };
      function RU(a, l, i) {
        const o = Gf(a, l, i);
        for (const s in a)
          if (ce(a[s]) || ce(l[s])) {
            const f =
              gl.indexOf(s) !== -1
                ? "attr" + s.charAt(0).toUpperCase() + s.substring(1)
                : s;
            o[f] = a[s];
          }
        return o;
      }
      const EF = {
        useVisualState: BU({
          scrapeMotionValuesFromProps: RU,
          createRenderState: QU,
        }),
      };
      function YF(a, l) {
        return function (
          o,
          { forwardMotionProps: s } = { forwardMotionProps: !1 },
        ) {
          const c = {
            ...(xf(o) ? EF : GF),
            preloadedFeatures: a,
            useRender: ZF(s),
            createVisualElement: l,
            Component: o,
          };
          return UF(c);
        };
      }
      function Jr(a, l, i) {
        const o = a.getProps();
        return Tf(o, l, i !== void 0 ? i : o.custom, a);
      }
      const OV = (a) => Array.isArray(a);
      function MF(a, l, i) {
        a.hasValue(l) ? a.getValue(l).set(i) : a.addValue(l, Mr(i));
      }
      function OF(a) {
        return OV(a) ? a[a.length - 1] || 0 : a;
      }
      function NF(a, l) {
        const i = Jr(a, l);
        let { transitionEnd: o = {}, transition: s = {}, ...f } = i || {};
        f = { ...f, ...o };
        for (const c in f) {
          const q = OF(f[c]);
          MF(a, c, q);
        }
      }
      function JF(a) {
        return !!(ce(a) && a.add);
      }
      function NV(a, l) {
        const i = a.getValue("willChange");
        if (JF(i)) return i.add(l);
        if (!i && Cn.WillChange) {
          const o = new Cn.WillChange("auto");
          (a.addValue("willChange", o), o.add(l));
        }
      }
      function ZU(a) {
        return a.props[gU];
      }
      const PF = (a) => a !== null;
      function kF(a, { repeat: l, repeatType: i = "loop" }, o) {
        const s = a.filter(PF),
          f = l && i !== "loop" && l % 2 === 1 ? 0 : s.length - 1;
        return s[f];
      }
      const HF = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
        jF = (a) => ({
          type: "spring",
          stiffness: 550,
          damping: a === 0 ? 2 * Math.sqrt(550) : 30,
          restSpeed: 10,
        }),
        IF = { type: "keyframes", duration: 0.8 },
        DF = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
        LF = (a, { keyframes: l }) =>
          l.length > 2
            ? IF
            : Xl.has(a)
              ? a.startsWith("scale")
                ? jF(l[1])
                : HF
              : DF;
      function wF({
        when: a,
        delay: l,
        delayChildren: i,
        staggerChildren: o,
        staggerDirection: s,
        repeat: f,
        repeatType: c,
        repeatDelay: q,
        from: p,
        elapsed: d,
        ...v
      }) {
        return !!Object.keys(v).length;
      }
      const Ef =
        (a, l, i, o = {}, s, f) =>
        (c) => {
          const q = Wf(o, a) || {},
            p = q.delay || o.delay || 0;
          let { elapsed: d = 0 } = o;
          d = d - ln(p);
          const v = {
            keyframes: Array.isArray(i) ? i : [null, i],
            ease: "easeOut",
            velocity: l.getVelocity(),
            ...q,
            delay: -d,
            onUpdate: (h) => {
              (l.set(h), q.onUpdate && q.onUpdate(h));
            },
            onComplete: () => {
              (c(), q.onComplete && q.onComplete());
            },
            name: a,
            motionValue: l,
            element: f ? void 0 : s,
          };
          (wF(q) || Object.assign(v, LF(a, v)),
            v.duration && (v.duration = ln(v.duration)),
            v.repeatDelay && (v.repeatDelay = ln(v.repeatDelay)),
            v.from !== void 0 && (v.keyframes[0] = v.from));
          let m = !1;
          if (
            ((v.type === !1 || (v.duration === 0 && !v.repeatDelay)) &&
              ((v.duration = 0), v.delay === 0 && (m = !0)),
            (Cn.instantAnimations || Cn.skipAnimations) &&
              ((m = !0), (v.duration = 0), (v.delay = 0)),
            (v.allowFlatten = !q.type && !q.ease),
            m && !f && l.get() !== void 0)
          ) {
            const h = kF(v.keyframes, q);
            if (h !== void 0) {
              Mt.update(() => {
                (v.onUpdate(h), v.onComplete());
              });
              return;
            }
          }
          return new Th(v);
        };
      function _F({ protectedKeys: a, needsAnimating: l }, i) {
        const o = a.hasOwnProperty(i) && l[i] !== !0;
        return ((l[i] = !1), o);
      }
      function xU(a, l, { delay: i = 0, transitionOverride: o, type: s } = {}) {
        let {
          transition: f = a.getDefaultTransition(),
          transitionEnd: c,
          ...q
        } = l;
        o && (f = o);
        const p = [],
          d = s && a.animationState && a.animationState.getState()[s];
        for (const v in q) {
          const m = a.getValue(v, a.latestValues[v] ?? null),
            h = q[v];
          if (h === void 0 || (d && _F(d, v))) continue;
          const y = { delay: i, ...Wf(f || {}, v) },
            A = m.get();
          if (
            A !== void 0 &&
            !m.isAnimating &&
            !Array.isArray(h) &&
            h === A &&
            !y.velocity
          )
            continue;
          let x = !1;
          if (window.MotionHandoffAnimation) {
            const z = ZU(a);
            if (z) {
              const G = window.MotionHandoffAnimation(z, v, Mt);
              G !== null && ((y.startTime = G), (x = !0));
            }
          }
          (NV(a, v),
            m.start(
              Ef(
                v,
                m,
                h,
                a.shouldReduceMotion && cU.has(v) ? { type: !1 } : y,
                a,
                x,
              ),
            ));
          const Z = m.animation;
          Z && p.push(Z);
        }
        return (
          c &&
            Promise.all(p).then(() => {
              Mt.update(() => {
                c && NF(a, c);
              });
            }),
          p
        );
      }
      function JV(a, l, i = {}) {
        const o = Jr(
          a,
          l,
          i.type === "exit" ? a.presenceContext?.custom : void 0,
        );
        let { transition: s = a.getDefaultTransition() || {} } = o || {};
        i.transitionOverride && (s = i.transitionOverride);
        const f = o ? () => Promise.all(xU(a, o, i)) : () => Promise.resolve(),
          c =
            a.variantChildren && a.variantChildren.size
              ? (p = 0) => {
                  const {
                    delayChildren: d = 0,
                    staggerChildren: v,
                    staggerDirection: m,
                  } = s;
                  return $F(a, l, d + p, v, m, i);
                }
              : () => Promise.resolve(),
          { when: q } = s;
        if (q) {
          const [p, d] = q === "beforeChildren" ? [f, c] : [c, f];
          return p().then(() => d());
        } else return Promise.all([f(), c(i.delay)]);
      }
      function $F(a, l, i = 0, o = 0, s = 1, f) {
        const c = [],
          q = (a.variantChildren.size - 1) * o,
          p = s === 1 ? (d = 0) => d * o : (d = 0) => q - d * o;
        return (
          Array.from(a.variantChildren)
            .sort(ty)
            .forEach((d, v) => {
              (d.notify("AnimationStart", l),
                c.push(
                  JV(d, l, { ...f, delay: i + p(v) }).then(() =>
                    d.notify("AnimationComplete", l),
                  ),
                ));
            }),
          Promise.all(c)
        );
      }
      function ty(a, l) {
        return a.sortNodePosition(l);
      }
      function ey(a, l, i = {}) {
        a.notify("AnimationStart", l);
        let o;
        if (Array.isArray(l)) {
          const s = l.map((f) => JV(a, f, i));
          o = Promise.all(s);
        } else if (typeof l == "string") o = JV(a, l, i);
        else {
          const s = typeof l == "function" ? Jr(a, l, i.custom) : l;
          o = Promise.all(xU(a, s, i));
        }
        return o.then(() => {
          a.notify("AnimationComplete", l);
        });
      }
      function TU(a, l) {
        if (!Array.isArray(l)) return !1;
        const i = l.length;
        if (i !== a.length) return !1;
        for (let o = 0; o < i; o++) if (l[o] !== a[o]) return !1;
        return !0;
      }
      const ny = bf.length;
      function GU(a) {
        if (!a) return;
        if (!a.isControllingVariants) {
          const i = a.parent ? GU(a.parent) || {} : {};
          return (
            a.props.initial !== void 0 && (i.initial = a.props.initial),
            i
          );
        }
        const l = {};
        for (let i = 0; i < ny; i++) {
          const o = bf[i],
            s = a.props[o];
          (Or(s) || s === !1) && (l[o] = s);
        }
        return l;
      }
      const ay = [...Qf].reverse(),
        ly = Qf.length;
      function ry(a) {
        return (l) =>
          Promise.all(l.map(({ animation: i, options: o }) => ey(a, i, o)));
      }
      function iy(a) {
        let l = ry(a),
          i = mK(),
          o = !0;
        const s = (p) => (d, v) => {
          const m = Jr(a, v, p === "exit" ? a.presenceContext?.custom : void 0);
          if (m) {
            const { transition: h, transitionEnd: y, ...A } = m;
            d = { ...d, ...A, ...y };
          }
          return d;
        };
        function f(p) {
          l = p(a);
        }
        function c(p) {
          const { props: d } = a,
            v = GU(a.parent) || {},
            m = [],
            h = new Set();
          let y = {},
            A = 1 / 0;
          for (let Z = 0; Z < ly; Z++) {
            const z = ay[Z],
              G = i[z],
              Y = d[z] !== void 0 ? d[z] : v[z],
              L = Or(Y),
              N = z === p ? G.isActive : null;
            N === !1 && (A = Z);
            let I = Y === v[z] && Y !== d[z] && L;
            if (
              (I && o && a.manuallyAnimateOnMount && (I = !1),
              (G.protectedKeys = { ...y }),
              (!G.isActive && N === null) ||
                (!Y && !G.prevProp) ||
                No(Y) ||
                typeof Y == "boolean")
            )
              continue;
            const nt = oy(G.prevProp, Y);
            let k = nt || (z === p && G.isActive && !I && L) || (Z > A && L),
              lt = !1;
            const pt = Array.isArray(Y) ? Y : [Y];
            let w = pt.reduce(s(z), {});
            N === !1 && (w = {});
            const { prevResolvedValues: H = {} } = G,
              dt = { ...H, ...w },
              rt = (P) => {
                ((k = !0),
                  h.has(P) && ((lt = !0), h.delete(P)),
                  (G.needsAnimating[P] = !0));
                const _ = a.getValue(P);
                _ && (_.liveStyle = !1);
              };
            for (const P in dt) {
              const _ = w[P],
                Kt = H[P];
              if (y.hasOwnProperty(P)) continue;
              let g = !1;
              (OV(_) && OV(Kt) ? (g = !TU(_, Kt)) : (g = _ !== Kt),
                g
                  ? _ != null
                    ? rt(P)
                    : h.add(P)
                  : _ !== void 0 && h.has(P)
                    ? rt(P)
                    : (G.protectedKeys[P] = !0));
            }
            ((G.prevProp = Y),
              (G.prevResolvedValues = w),
              G.isActive && (y = { ...y, ...w }),
              o && a.blockInitialAnimation && (k = !1),
              k &&
                (!(I && nt) || lt) &&
                m.push(
                  ...pt.map((P) => ({ animation: P, options: { type: z } })),
                ));
          }
          if (h.size) {
            const Z = {};
            if (typeof d.initial != "boolean") {
              const z = Jr(
                a,
                Array.isArray(d.initial) ? d.initial[0] : d.initial,
              );
              z && z.transition && (Z.transition = z.transition);
            }
            (h.forEach((z) => {
              const G = a.getBaseTarget(z),
                Y = a.getValue(z);
              (Y && (Y.liveStyle = !0), (Z[z] = G ?? null));
            }),
              m.push({ animation: Z }));
          }
          let x = !!m.length;
          return (
            o &&
              (d.initial === !1 || d.initial === d.animate) &&
              !a.manuallyAnimateOnMount &&
              (x = !1),
            (o = !1),
            x ? l(m) : Promise.resolve()
          );
        }
        function q(p, d) {
          if (i[p].isActive === d) return Promise.resolve();
          (a.variantChildren?.forEach((m) => m.animationState?.setActive(p, d)),
            (i[p].isActive = d));
          const v = c(p);
          for (const m in i) i[m].protectedKeys = {};
          return v;
        }
        return {
          animateChanges: c,
          setActive: q,
          setAnimateFunction: f,
          getState: () => i,
          reset: () => {
            ((i = mK()), (o = !0));
          },
        };
      }
      function oy(a, l) {
        return typeof l == "string"
          ? l !== a
          : Array.isArray(l)
            ? !TU(l, a)
            : !1;
      }
      function Aa(a = !1) {
        return {
          isActive: a,
          protectedKeys: {},
          needsAnimating: {},
          prevResolvedValues: {},
        };
      }
      function mK() {
        return {
          animate: Aa(!0),
          whileInView: Aa(),
          whileHover: Aa(),
          whileTap: Aa(),
          whileDrag: Aa(),
          whileFocus: Aa(),
          exit: Aa(),
        };
      }
      class la {
        constructor(l) {
          ((this.isMounted = !1), (this.node = l));
        }
        update() {}
      }
      class uy extends la {
        constructor(l) {
          (super(l), l.animationState || (l.animationState = iy(l)));
        }
        updateAnimationControlsSubscription() {
          const { animate: l } = this.node.getProps();
          No(l) && (this.unmountControls = l.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          const { animate: l } = this.node.getProps(),
            { animate: i } = this.node.prevProps || {};
          l !== i && this.updateAnimationControlsSubscription();
        }
        unmount() {
          (this.node.animationState.reset(), this.unmountControls?.());
        }
      }
      let sy = 0;
      class Vy extends la {
        constructor() {
          (super(...arguments), (this.id = sy++));
        }
        update() {
          if (!this.node.presenceContext) return;
          const { isPresent: l, onExitComplete: i } = this.node.presenceContext,
            { isPresent: o } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || l === o) return;
          const s = this.node.animationState.setActive("exit", !l);
          i &&
            !l &&
            s.then(() => {
              i(this.id);
            });
        }
        mount() {
          const { register: l, onExitComplete: i } =
            this.node.presenceContext || {};
          (i && i(this.id), l && (this.unmount = l(this.id)));
        }
        unmount() {}
      }
      const fy = { animation: { Feature: uy }, exit: { Feature: Vy } };
      function Pr(a, l, i, o = { passive: !0 }) {
        return (a.addEventListener(l, i, o), () => a.removeEventListener(l, i));
      }
      function wr(a) {
        return { point: { x: a.pageX, y: a.pageY } };
      }
      const cy = (a) => (l) => Cf(l) && a(l, wr(l));
      function Rr(a, l, i, o) {
        return Pr(a, l, cy(i), o);
      }
      function EU({ top: a, left: l, right: i, bottom: o }) {
        return { x: { min: l, max: i }, y: { min: a, max: o } };
      }
      function qy({ x: a, y: l }) {
        return { top: l.min, right: a.max, bottom: l.max, left: a.min };
      }
      function dy(a, l) {
        if (!l) return a;
        const i = l({ x: a.left, y: a.top }),
          o = l({ x: a.right, y: a.bottom });
        return { top: i.y, left: i.x, bottom: o.y, right: o.x };
      }
      const YU = 1e-4,
        py = 1 - YU,
        Ky = 1 + YU,
        MU = 0.01,
        vy = 0 - MU,
        Uy = 0 + MU;
      function pe(a) {
        return a.max - a.min;
      }
      function my(a, l, i) {
        return Math.abs(a - l) <= i;
      }
      function hK(a, l, i, o = 0.5) {
        ((a.origin = o),
          (a.originPoint = Et(l.min, l.max, a.origin)),
          (a.scale = pe(i) / pe(l)),
          (a.translate = Et(i.min, i.max, a.origin) - a.originPoint),
          ((a.scale >= py && a.scale <= Ky) || isNaN(a.scale)) && (a.scale = 1),
          ((a.translate >= vy && a.translate <= Uy) || isNaN(a.translate)) &&
            (a.translate = 0));
      }
      function Zr(a, l, i, o) {
        (hK(a.x, l.x, i.x, o ? o.originX : void 0),
          hK(a.y, l.y, i.y, o ? o.originY : void 0));
      }
      function FK(a, l, i) {
        ((a.min = i.min + l.min), (a.max = a.min + pe(l)));
      }
      function hy(a, l, i) {
        (FK(a.x, l.x, i.x), FK(a.y, l.y, i.y));
      }
      function yK(a, l, i) {
        ((a.min = l.min - i.min), (a.max = a.min + pe(l)));
      }
      function xr(a, l, i) {
        (yK(a.x, l.x, i.x), yK(a.y, l.y, i.y));
      }
      const AK = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
        Kl = () => ({ x: AK(), y: AK() }),
        gK = () => ({ min: 0, max: 0 }),
        jt = () => ({ x: gK(), y: gK() });
      function ke(a) {
        return [a("x"), a("y")];
      }
      function KV(a) {
        return a === void 0 || a === 1;
      }
      function PV({ scale: a, scaleX: l, scaleY: i }) {
        return !KV(a) || !KV(l) || !KV(i);
      }
      function Xa(a) {
        return (
          PV(a) ||
          OU(a) ||
          a.z ||
          a.rotate ||
          a.rotateX ||
          a.rotateY ||
          a.skewX ||
          a.skewY
        );
      }
      function OU(a) {
        return XK(a.x) || XK(a.y);
      }
      function XK(a) {
        return a && a !== "0%";
      }
      function Ro(a, l, i) {
        const o = a - i,
          s = l * o;
        return i + s;
      }
      function WK(a, l, i, o, s) {
        return (s !== void 0 && (a = Ro(a, s, o)), Ro(a, i, o) + l);
      }
      function kV(a, l = 0, i = 1, o, s) {
        ((a.min = WK(a.min, l, i, o, s)), (a.max = WK(a.max, l, i, o, s)));
      }
      function NU(a, { x: l, y: i }) {
        (kV(a.x, l.translate, l.scale, l.originPoint),
          kV(a.y, i.translate, i.scale, i.originPoint));
      }
      const SK = 0.999999999999,
        zK = 1.0000000000001;
      function Fy(a, l, i, o = !1) {
        const s = i.length;
        if (!s) return;
        l.x = l.y = 1;
        let f, c;
        for (let q = 0; q < s; q++) {
          ((f = i[q]), (c = f.projectionDelta));
          const { visualElement: p } = f.options;
          (p && p.props.style && p.props.style.display === "contents") ||
            (o &&
              f.options.layoutScroll &&
              f.scroll &&
              f !== f.root &&
              Ul(a, { x: -f.scroll.offset.x, y: -f.scroll.offset.y }),
            c && ((l.x *= c.x.scale), (l.y *= c.y.scale), NU(a, c)),
            o && Xa(f.latestValues) && Ul(a, f.latestValues));
        }
        (l.x < zK && l.x > SK && (l.x = 1), l.y < zK && l.y > SK && (l.y = 1));
      }
      function vl(a, l) {
        ((a.min = a.min + l), (a.max = a.max + l));
      }
      function CK(a, l, i, o, s = 0.5) {
        const f = Et(a.min, a.max, s);
        kV(a, l, i, f, o);
      }
      function Ul(a, l) {
        (CK(a.x, l.x, l.scaleX, l.scale, l.originX),
          CK(a.y, l.y, l.scaleY, l.scale, l.originY));
      }
      function JU(a, l) {
        return EU(dy(a.getBoundingClientRect(), l));
      }
      function yy(a, l, i) {
        const o = JU(a, i),
          { scroll: s } = l;
        return (s && (vl(o.x, s.offset.x), vl(o.y, s.offset.y)), o);
      }
      const PU = ({ current: a }) => (a ? a.ownerDocument.defaultView : null),
        QK = (a, l) => Math.abs(a - l);
      function Ay(a, l) {
        const i = QK(a.x, l.x),
          o = QK(a.y, l.y);
        return Math.sqrt(i ** 2 + o ** 2);
      }
      class kU {
        constructor(
          l,
          i,
          {
            transformPagePoint: o,
            contextWindow: s,
            dragSnapToOrigin: f = !1,
          } = {},
        ) {
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.contextWindow = window),
            (this.updatePoint = () => {
              if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
              const m = UV(this.lastMoveEventInfo, this.history),
                h = this.startEvent !== null,
                y = Ay(m.offset, { x: 0, y: 0 }) >= 3;
              if (!h && !y) return;
              const { point: A } = m,
                { timestamp: x } = re;
              this.history.push({ ...A, timestamp: x });
              const { onStart: Z, onMove: z } = this.handlers;
              (h ||
                (Z && Z(this.lastMoveEvent, m),
                (this.startEvent = this.lastMoveEvent)),
                z && z(this.lastMoveEvent, m));
            }),
            (this.handlePointerMove = (m, h) => {
              ((this.lastMoveEvent = m),
                (this.lastMoveEventInfo = vV(h, this.transformPagePoint)),
                Mt.update(this.updatePoint, !0));
            }),
            (this.handlePointerUp = (m, h) => {
              this.end();
              const {
                onEnd: y,
                onSessionEnd: A,
                resumeAnimation: x,
              } = this.handlers;
              if (
                (this.dragSnapToOrigin && x && x(),
                !(this.lastMoveEvent && this.lastMoveEventInfo))
              )
                return;
              const Z = UV(
                m.type === "pointercancel"
                  ? this.lastMoveEventInfo
                  : vV(h, this.transformPagePoint),
                this.history,
              );
              (this.startEvent && y && y(m, Z), A && A(m, Z));
            }),
            !Cf(l))
          )
            return;
          ((this.dragSnapToOrigin = f),
            (this.handlers = i),
            (this.transformPagePoint = o),
            (this.contextWindow = s || window));
          const c = wr(l),
            q = vV(c, this.transformPagePoint),
            { point: p } = q,
            { timestamp: d } = re;
          this.history = [{ ...p, timestamp: d }];
          const { onSessionStart: v } = i;
          (v && v(l, UV(q, this.history)),
            (this.removeListeners = Ir(
              Rr(this.contextWindow, "pointermove", this.handlePointerMove),
              Rr(this.contextWindow, "pointerup", this.handlePointerUp),
              Rr(this.contextWindow, "pointercancel", this.handlePointerUp),
            )));
        }
        updateHandlers(l) {
          this.handlers = l;
        }
        end() {
          (this.removeListeners && this.removeListeners(),
            na(this.updatePoint));
        }
      }
      function vV(a, l) {
        return l ? { point: l(a.point) } : a;
      }
      function bK(a, l) {
        return { x: a.x - l.x, y: a.y - l.y };
      }
      function UV({ point: a }, l) {
        return {
          point: a,
          delta: bK(a, HU(l)),
          offset: bK(a, gy(l)),
          velocity: Xy(l, 0.1),
        };
      }
      function gy(a) {
        return a[0];
      }
      function HU(a) {
        return a[a.length - 1];
      }
      function Xy(a, l) {
        if (a.length < 2) return { x: 0, y: 0 };
        let i = a.length - 1,
          o = null;
        const s = HU(a);
        for (; i >= 0 && ((o = a[i]), !(s.timestamp - o.timestamp > ln(l))); )
          i--;
        if (!o) return { x: 0, y: 0 };
        const f = rn(s.timestamp - o.timestamp);
        if (f === 0) return { x: 0, y: 0 };
        const c = { x: (s.x - o.x) / f, y: (s.y - o.y) / f };
        return (c.x === 1 / 0 && (c.x = 0), c.y === 1 / 0 && (c.y = 0), c);
      }
      function Wy(a, { min: l, max: i }, o) {
        return (
          l !== void 0 && a < l
            ? (a = o ? Et(l, a, o.min) : Math.max(a, l))
            : i !== void 0 &&
              a > i &&
              (a = o ? Et(i, a, o.max) : Math.min(a, i)),
          a
        );
      }
      function BK(a, l, i) {
        return {
          min: l !== void 0 ? a.min + l : void 0,
          max: i !== void 0 ? a.max + i - (a.max - a.min) : void 0,
        };
      }
      function Sy(a, { top: l, left: i, bottom: o, right: s }) {
        return { x: BK(a.x, i, s), y: BK(a.y, l, o) };
      }
      function RK(a, l) {
        let i = l.min - a.min,
          o = l.max - a.max;
        return (
          l.max - l.min < a.max - a.min && ([i, o] = [o, i]),
          { min: i, max: o }
        );
      }
      function zy(a, l) {
        return { x: RK(a.x, l.x), y: RK(a.y, l.y) };
      }
      function Cy(a, l) {
        let i = 0.5;
        const o = pe(a),
          s = pe(l);
        return (
          s > o
            ? (i = Gr(l.min, l.max - o, a.min))
            : o > s && (i = Gr(a.min, a.max - s, l.min)),
          zn(0, 1, i)
        );
      }
      function Qy(a, l) {
        const i = {};
        return (
          l.min !== void 0 && (i.min = l.min - a.min),
          l.max !== void 0 && (i.max = l.max - a.min),
          i
        );
      }
      const HV = 0.35;
      function by(a = HV) {
        return (
          a === !1 ? (a = 0) : a === !0 && (a = HV),
          { x: ZK(a, "left", "right"), y: ZK(a, "top", "bottom") }
        );
      }
      function ZK(a, l, i) {
        return { min: xK(a, l), max: xK(a, i) };
      }
      function xK(a, l) {
        return typeof a == "number" ? a : a[l] || 0;
      }
      const By = new WeakMap();
      class Ry {
        constructor(l) {
          ((this.openDragLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = jt()),
            (this.visualElement = l));
        }
        start(l, { snapToCursor: i = !1 } = {}) {
          const { presenceContext: o } = this.visualElement;
          if (o && o.isPresent === !1) return;
          const s = (v) => {
              const { dragSnapToOrigin: m } = this.getProps();
              (m ? this.pauseAnimation() : this.stopAnimation(),
                i && this.snapToCursor(wr(v).point));
            },
            f = (v, m) => {
              const {
                drag: h,
                dragPropagation: y,
                onDragStart: A,
              } = this.getProps();
              if (
                h &&
                !y &&
                (this.openDragLock && this.openDragLock(),
                (this.openDragLock = Lh(h)),
                !this.openDragLock)
              )
                return;
              ((this.isDragging = !0),
                (this.currentDirection = null),
                this.resolveConstraints(),
                this.visualElement.projection &&
                  ((this.visualElement.projection.isAnimationBlocked = !0),
                  (this.visualElement.projection.target = void 0)),
                ke((Z) => {
                  let z = this.getAxisMotionValue(Z).get() || 0;
                  if (on.test(z)) {
                    const { projection: G } = this.visualElement;
                    if (G && G.layout) {
                      const Y = G.layout.layoutBox[Z];
                      Y && (z = pe(Y) * (parseFloat(z) / 100));
                    }
                  }
                  this.originPoint[Z] = z;
                }),
                A && Mt.postRender(() => A(v, m)),
                NV(this.visualElement, "transform"));
              const { animationState: x } = this.visualElement;
              x && x.setActive("whileDrag", !0);
            },
            c = (v, m) => {
              const {
                dragPropagation: h,
                dragDirectionLock: y,
                onDirectionLock: A,
                onDrag: x,
              } = this.getProps();
              if (!h && !this.openDragLock) return;
              const { offset: Z } = m;
              if (y && this.currentDirection === null) {
                ((this.currentDirection = Zy(Z)),
                  this.currentDirection !== null &&
                    A &&
                    A(this.currentDirection));
                return;
              }
              (this.updateAxis("x", m.point, Z),
                this.updateAxis("y", m.point, Z),
                this.visualElement.render(),
                x && x(v, m));
            },
            q = (v, m) => this.stop(v, m),
            p = () =>
              ke(
                (v) =>
                  this.getAnimationState(v) === "paused" &&
                  this.getAxisMotionValue(v).animation?.play(),
              ),
            { dragSnapToOrigin: d } = this.getProps();
          this.panSession = new kU(
            l,
            {
              onSessionStart: s,
              onStart: f,
              onMove: c,
              onSessionEnd: q,
              resumeAnimation: p,
            },
            {
              transformPagePoint: this.visualElement.getTransformPagePoint(),
              dragSnapToOrigin: d,
              contextWindow: PU(this.visualElement),
            },
          );
        }
        stop(l, i) {
          const o = this.isDragging;
          if ((this.cancel(), !o)) return;
          const { velocity: s } = i;
          this.startAnimation(s);
          const { onDragEnd: f } = this.getProps();
          f && Mt.postRender(() => f(l, i));
        }
        cancel() {
          this.isDragging = !1;
          const { projection: l, animationState: i } = this.visualElement;
          (l && (l.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0));
          const { dragPropagation: o } = this.getProps();
          (!o &&
            this.openDragLock &&
            (this.openDragLock(), (this.openDragLock = null)),
            i && i.setActive("whileDrag", !1));
        }
        updateAxis(l, i, o) {
          const { drag: s } = this.getProps();
          if (!o || !vo(l, s, this.currentDirection)) return;
          const f = this.getAxisMotionValue(l);
          let c = this.originPoint[l] + o[l];
          (this.constraints &&
            this.constraints[l] &&
            (c = Wy(c, this.constraints[l], this.elastic[l])),
            f.set(c));
        }
        resolveConstraints() {
          const { dragConstraints: l, dragElastic: i } = this.getProps(),
            o =
              this.visualElement.projection &&
              !this.visualElement.projection.layout
                ? this.visualElement.projection.measure(!1)
                : this.visualElement.projection?.layout,
            s = this.constraints;
          (l && pl(l)
            ? this.constraints ||
              (this.constraints = this.resolveRefConstraints())
            : l && o
              ? (this.constraints = Sy(o.layoutBox, l))
              : (this.constraints = !1),
            (this.elastic = by(i)),
            s !== this.constraints &&
              o &&
              this.constraints &&
              !this.hasMutatedConstraints &&
              ke((f) => {
                this.constraints !== !1 &&
                  this.getAxisMotionValue(f) &&
                  (this.constraints[f] = Qy(
                    o.layoutBox[f],
                    this.constraints[f],
                  ));
              }));
        }
        resolveRefConstraints() {
          const { dragConstraints: l, onMeasureDragConstraints: i } =
            this.getProps();
          if (!l || !pl(l)) return !1;
          const o = l.current,
            { projection: s } = this.visualElement;
          if (!s || !s.layout) return !1;
          const f = yy(o, s.root, this.visualElement.getTransformPagePoint());
          let c = zy(s.layout.layoutBox, f);
          if (i) {
            const q = i(qy(c));
            ((this.hasMutatedConstraints = !!q), q && (c = EU(q)));
          }
          return c;
        }
        startAnimation(l) {
          const {
              drag: i,
              dragMomentum: o,
              dragElastic: s,
              dragTransition: f,
              dragSnapToOrigin: c,
              onDragTransitionEnd: q,
            } = this.getProps(),
            p = this.constraints || {},
            d = ke((v) => {
              if (!vo(v, i, this.currentDirection)) return;
              let m = (p && p[v]) || {};
              c && (m = { min: 0, max: 0 });
              const h = s ? 200 : 1e6,
                y = s ? 40 : 1e7,
                A = {
                  type: "inertia",
                  velocity: o ? l[v] : 0,
                  bounceStiffness: h,
                  bounceDamping: y,
                  timeConstant: 750,
                  restDelta: 1,
                  restSpeed: 10,
                  ...f,
                  ...m,
                };
              return this.startAxisValueAnimation(v, A);
            });
          return Promise.all(d).then(q);
        }
        startAxisValueAnimation(l, i) {
          const o = this.getAxisMotionValue(l);
          return (
            NV(this.visualElement, l),
            o.start(Ef(l, o, 0, i, this.visualElement, !1))
          );
        }
        stopAnimation() {
          ke((l) => this.getAxisMotionValue(l).stop());
        }
        pauseAnimation() {
          ke((l) => this.getAxisMotionValue(l).animation?.pause());
        }
        getAnimationState(l) {
          return this.getAxisMotionValue(l).animation?.state;
        }
        getAxisMotionValue(l) {
          const i = `_drag${l.toUpperCase()}`,
            o = this.visualElement.getProps(),
            s = o[i];
          return (
            s ||
            this.visualElement.getValue(
              l,
              (o.initial ? o.initial[l] : void 0) || 0,
            )
          );
        }
        snapToCursor(l) {
          ke((i) => {
            const { drag: o } = this.getProps();
            if (!vo(i, o, this.currentDirection)) return;
            const { projection: s } = this.visualElement,
              f = this.getAxisMotionValue(i);
            if (s && s.layout) {
              const { min: c, max: q } = s.layout.layoutBox[i];
              f.set(l[i] - Et(c, q, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          const { drag: l, dragConstraints: i } = this.getProps(),
            { projection: o } = this.visualElement;
          if (!pl(i) || !o || !this.constraints) return;
          this.stopAnimation();
          const s = { x: 0, y: 0 };
          ke((c) => {
            const q = this.getAxisMotionValue(c);
            if (q && this.constraints !== !1) {
              const p = q.get();
              s[c] = Cy({ min: p, max: p }, this.constraints[c]);
            }
          });
          const { transformTemplate: f } = this.visualElement.getProps();
          ((this.visualElement.current.style.transform = f
            ? f({}, "")
            : "none"),
            o.root && o.root.updateScroll(),
            o.updateLayout(),
            this.resolveConstraints(),
            ke((c) => {
              if (!vo(c, l, null)) return;
              const q = this.getAxisMotionValue(c),
                { min: p, max: d } = this.constraints[c];
              q.set(Et(p, d, s[c]));
            }));
        }
        addListeners() {
          if (!this.visualElement.current) return;
          By.set(this.visualElement, this);
          const l = this.visualElement.current,
            i = Rr(l, "pointerdown", (p) => {
              const { drag: d, dragListener: v = !0 } = this.getProps();
              d && v && this.start(p);
            }),
            o = () => {
              const { dragConstraints: p } = this.getProps();
              pl(p) &&
                p.current &&
                (this.constraints = this.resolveRefConstraints());
            },
            { projection: s } = this.visualElement,
            f = s.addEventListener("measure", o);
          (s &&
            !s.layout &&
            (s.root && s.root.updateScroll(), s.updateLayout()),
            Mt.read(o));
          const c = Pr(window, "resize", () =>
              this.scalePositionWithinConstraints(),
            ),
            q = s.addEventListener(
              "didUpdate",
              ({ delta: p, hasLayoutChanged: d }) => {
                this.isDragging &&
                  d &&
                  (ke((v) => {
                    const m = this.getAxisMotionValue(v);
                    m &&
                      ((this.originPoint[v] += p[v].translate),
                      m.set(m.get() + p[v].translate));
                  }),
                  this.visualElement.render());
              },
            );
          return () => {
            (c(), i(), f(), q && q());
          };
        }
        getProps() {
          const l = this.visualElement.getProps(),
            {
              drag: i = !1,
              dragDirectionLock: o = !1,
              dragPropagation: s = !1,
              dragConstraints: f = !1,
              dragElastic: c = HV,
              dragMomentum: q = !0,
            } = l;
          return {
            ...l,
            drag: i,
            dragDirectionLock: o,
            dragPropagation: s,
            dragConstraints: f,
            dragElastic: c,
            dragMomentum: q,
          };
        }
      }
      function vo(a, l, i) {
        return (l === !0 || l === a) && (i === null || i === a);
      }
      function Zy(a, l = 10) {
        let i = null;
        return (
          Math.abs(a.y) > l ? (i = "y") : Math.abs(a.x) > l && (i = "x"),
          i
        );
      }
      class xy extends la {
        constructor(l) {
          (super(l),
            (this.removeGroupControls = He),
            (this.removeListeners = He),
            (this.controls = new Ry(l)));
        }
        mount() {
          const { dragControls: l } = this.node.getProps();
          (l && (this.removeGroupControls = l.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || He));
        }
        unmount() {
          (this.removeGroupControls(), this.removeListeners());
        }
      }
      const TK = (a) => (l, i) => {
        a && Mt.postRender(() => a(l, i));
      };
      class Ty extends la {
        constructor() {
          (super(...arguments), (this.removePointerDownListener = He));
        }
        onPointerDown(l) {
          this.session = new kU(l, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: PU(this.node),
          });
        }
        createPanHandlers() {
          const {
            onPanSessionStart: l,
            onPanStart: i,
            onPan: o,
            onPanEnd: s,
          } = this.node.getProps();
          return {
            onSessionStart: TK(l),
            onStart: TK(i),
            onMove: o,
            onEnd: (f, c) => {
              (delete this.session, s && Mt.postRender(() => s(f, c)));
            },
          };
        }
        mount() {
          this.removePointerDownListener = Rr(
            this.node.current,
            "pointerdown",
            (l) => this.onPointerDown(l),
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          (this.removePointerDownListener(),
            this.session && this.session.end());
        }
      }
      const go = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
      function GK(a, l) {
        return l.max === l.min ? 0 : (a / (l.max - l.min)) * 100;
      }
      const Sr = {
          correct: (a, l) => {
            if (!l.target) return a;
            if (typeof a == "string")
              if (st.test(a)) a = parseFloat(a);
              else return a;
            const i = GK(a, l.target.x),
              o = GK(a, l.target.y);
            return `${i}% ${o}%`;
          },
        },
        Gy = {
          correct: (a, { treeScale: l, projectionDelta: i }) => {
            const o = a,
              s = aa.parse(a);
            if (s.length > 5) return o;
            const f = aa.createTransformer(a),
              c = typeof s[0] != "number" ? 1 : 0,
              q = i.x.scale * l.x,
              p = i.y.scale * l.y;
            ((s[0 + c] /= q), (s[1 + c] /= p));
            const d = Et(q, p, 0.5);
            return (
              typeof s[2 + c] == "number" && (s[2 + c] /= d),
              typeof s[3 + c] == "number" && (s[3 + c] /= d),
              f(s)
            );
          },
        };
      class Ey extends X.Component {
        componentDidMount() {
          const {
              visualElement: l,
              layoutGroup: i,
              switchLayoutGroup: o,
              layoutId: s,
            } = this.props,
            { projection: f } = l;
          (yF(Yy),
            f &&
              (i.group && i.group.add(f),
              o && o.register && s && o.register(f),
              f.root.didUpdate(),
              f.addEventListener("animationComplete", () => {
                this.safeToRemove();
              }),
              f.setOptions({
                ...f.options,
                onExitComplete: () => this.safeToRemove(),
              })),
            (go.hasEverUpdated = !0));
        }
        getSnapshotBeforeUpdate(l) {
          const {
              layoutDependency: i,
              visualElement: o,
              drag: s,
              isPresent: f,
            } = this.props,
            c = o.projection;
          return (
            c &&
              ((c.isPresent = f),
              s || l.layoutDependency !== i || i === void 0 || l.isPresent !== f
                ? c.willUpdate()
                : this.safeToRemove(),
              l.isPresent !== f &&
                (f
                  ? c.promote()
                  : c.relegate() ||
                    Mt.postRender(() => {
                      const q = c.getStack();
                      (!q || !q.members.length) && this.safeToRemove();
                    }))),
            null
          );
        }
        componentDidUpdate() {
          const { projection: l } = this.props.visualElement;
          l &&
            (l.root.didUpdate(),
            zf.postRender(() => {
              !l.currentAnimation && l.isLead() && this.safeToRemove();
            }));
        }
        componentWillUnmount() {
          const {
              visualElement: l,
              layoutGroup: i,
              switchLayoutGroup: o,
            } = this.props,
            { projection: s } = l;
          s &&
            (s.scheduleCheckAfterUnmount(),
            i && i.group && i.group.remove(s),
            o && o.deregister && o.deregister(s));
        }
        safeToRemove() {
          const { safeToRemove: l } = this.props;
          l && l();
        }
        render() {
          return null;
        }
      }
      function jU(a) {
        const [l, i] = Bv(),
          o = X.useContext(rf);
        return b.jsx(Ey, {
          ...a,
          layoutGroup: o,
          switchLayoutGroup: X.useContext(XU),
          isPresent: l,
          safeToRemove: i,
        });
      }
      const Yy = {
        borderRadius: {
          ...Sr,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: Sr,
        borderTopRightRadius: Sr,
        borderBottomLeftRadius: Sr,
        borderBottomRightRadius: Sr,
        boxShadow: Gy,
      };
      function My(a, l, i) {
        const o = ce(a) ? a : Mr(a);
        return (o.start(Ef("", o, l, i)), o.animation);
      }
      function Oy(a) {
        return a instanceof SVGElement && a.tagName !== "svg";
      }
      const Ny = (a, l) => a.depth - l.depth;
      class Jy {
        constructor() {
          ((this.children = []), (this.isDirty = !1));
        }
        add(l) {
          (Vf(this.children, l), (this.isDirty = !0));
        }
        remove(l) {
          (ff(this.children, l), (this.isDirty = !0));
        }
        forEach(l) {
          (this.isDirty && this.children.sort(Ny),
            (this.isDirty = !1),
            this.children.forEach(l));
        }
      }
      function Py(a, l) {
        const i = Fe.now(),
          o = ({ timestamp: s }) => {
            const f = s - i;
            f >= l && (na(o), a(f - l));
          };
        return (Mt.setup(o, !0), () => na(o));
      }
      const IU = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        ky = IU.length,
        EK = (a) => (typeof a == "string" ? parseFloat(a) : a),
        YK = (a) => typeof a == "number" || st.test(a);
      function Hy(a, l, i, o, s, f) {
        s
          ? ((a.opacity = Et(0, i.opacity ?? 1, jy(o))),
            (a.opacityExit = Et(l.opacity ?? 1, 0, Iy(o))))
          : f && (a.opacity = Et(l.opacity ?? 1, i.opacity ?? 1, o));
        for (let c = 0; c < ky; c++) {
          const q = `border${IU[c]}Radius`;
          let p = MK(l, q),
            d = MK(i, q);
          if (p === void 0 && d === void 0) continue;
          (p || (p = 0),
            d || (d = 0),
            p === 0 || d === 0 || YK(p) === YK(d)
              ? ((a[q] = Math.max(Et(EK(p), EK(d), o), 0)),
                (on.test(d) || on.test(p)) && (a[q] += "%"))
              : (a[q] = d));
        }
        (l.rotate || i.rotate) &&
          (a.rotate = Et(l.rotate || 0, i.rotate || 0, o));
      }
      function MK(a, l) {
        return a[l] !== void 0 ? a[l] : a.borderRadius;
      }
      const jy = DU(0, 0.5, Nv),
        Iy = DU(0.5, 0.95, He);
      function DU(a, l, i) {
        return (o) => (o < a ? 0 : o > l ? 1 : i(Gr(a, l, o)));
      }
      function OK(a, l) {
        ((a.min = l.min), (a.max = l.max));
      }
      function Pe(a, l) {
        (OK(a.x, l.x), OK(a.y, l.y));
      }
      function NK(a, l) {
        ((a.translate = l.translate),
          (a.scale = l.scale),
          (a.originPoint = l.originPoint),
          (a.origin = l.origin));
      }
      function JK(a, l, i, o, s) {
        return (
          (a -= l),
          (a = Ro(a, 1 / i, o)),
          s !== void 0 && (a = Ro(a, 1 / s, o)),
          a
        );
      }
      function Dy(a, l = 0, i = 1, o = 0.5, s, f = a, c = a) {
        if (
          (on.test(l) &&
            ((l = parseFloat(l)), (l = Et(c.min, c.max, l / 100) - c.min)),
          typeof l != "number")
        )
          return;
        let q = Et(f.min, f.max, o);
        (a === f && (q -= l),
          (a.min = JK(a.min, l, i, q, s)),
          (a.max = JK(a.max, l, i, q, s)));
      }
      function PK(a, l, [i, o, s], f, c) {
        Dy(a, l[i], l[o], l[s], l.scale, f, c);
      }
      const Ly = ["x", "scaleX", "originX"],
        wy = ["y", "scaleY", "originY"];
      function kK(a, l, i, o) {
        (PK(a.x, l, Ly, i ? i.x : void 0, o ? o.x : void 0),
          PK(a.y, l, wy, i ? i.y : void 0, o ? o.y : void 0));
      }
      function HK(a) {
        return a.translate === 0 && a.scale === 1;
      }
      function LU(a) {
        return HK(a.x) && HK(a.y);
      }
      function jK(a, l) {
        return a.min === l.min && a.max === l.max;
      }
      function _y(a, l) {
        return jK(a.x, l.x) && jK(a.y, l.y);
      }
      function IK(a, l) {
        return (
          Math.round(a.min) === Math.round(l.min) &&
          Math.round(a.max) === Math.round(l.max)
        );
      }
      function wU(a, l) {
        return IK(a.x, l.x) && IK(a.y, l.y);
      }
      function DK(a) {
        return pe(a.x) / pe(a.y);
      }
      function LK(a, l) {
        return (
          a.translate === l.translate &&
          a.scale === l.scale &&
          a.originPoint === l.originPoint
        );
      }
      class $y {
        constructor() {
          this.members = [];
        }
        add(l) {
          (Vf(this.members, l), l.scheduleRender());
        }
        remove(l) {
          if (
            (ff(this.members, l),
            l === this.prevLead && (this.prevLead = void 0),
            l === this.lead)
          ) {
            const i = this.members[this.members.length - 1];
            i && this.promote(i);
          }
        }
        relegate(l) {
          const i = this.members.findIndex((s) => l === s);
          if (i === 0) return !1;
          let o;
          for (let s = i; s >= 0; s--) {
            const f = this.members[s];
            if (f.isPresent !== !1) {
              o = f;
              break;
            }
          }
          return o ? (this.promote(o), !0) : !1;
        }
        promote(l, i) {
          const o = this.lead;
          if (l !== o && ((this.prevLead = o), (this.lead = l), l.show(), o)) {
            (o.instance && o.scheduleRender(),
              l.scheduleRender(),
              (l.resumeFrom = o),
              i && (l.resumeFrom.preserveOpacity = !0),
              o.snapshot &&
                ((l.snapshot = o.snapshot),
                (l.snapshot.latestValues =
                  o.animationValues || o.latestValues)),
              l.root && l.root.isUpdating && (l.isLayoutDirty = !0));
            const { crossfade: s } = l.options;
            s === !1 && o.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach((l) => {
            const { options: i, resumingFrom: o } = l;
            (i.onExitComplete && i.onExitComplete(),
              o && o.options.onExitComplete && o.options.onExitComplete());
          });
        }
        scheduleRender() {
          this.members.forEach((l) => {
            l.instance && l.scheduleRender(!1);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
      }
      function tA(a, l, i) {
        let o = "";
        const s = a.x.translate / l.x,
          f = a.y.translate / l.y,
          c = i?.z || 0;
        if (
          ((s || f || c) && (o = `translate3d(${s}px, ${f}px, ${c}px) `),
          (l.x !== 1 || l.y !== 1) && (o += `scale(${1 / l.x}, ${1 / l.y}) `),
          i)
        ) {
          const {
            transformPerspective: d,
            rotate: v,
            rotateX: m,
            rotateY: h,
            skewX: y,
            skewY: A,
          } = i;
          (d && (o = `perspective(${d}px) ${o}`),
            v && (o += `rotate(${v}deg) `),
            m && (o += `rotateX(${m}deg) `),
            h && (o += `rotateY(${h}deg) `),
            y && (o += `skewX(${y}deg) `),
            A && (o += `skewY(${A}deg) `));
        }
        const q = a.x.scale * l.x,
          p = a.y.scale * l.y;
        return (
          (q !== 1 || p !== 1) && (o += `scale(${q}, ${p})`),
          o || "none"
        );
      }
      const mV = ["", "X", "Y", "Z"],
        eA = { visibility: "hidden" },
        wK = 1e3;
      let nA = 0;
      function hV(a, l, i, o) {
        const { latestValues: s } = l;
        s[a] && ((i[a] = s[a]), l.setStaticValue(a, 0), o && (o[a] = 0));
      }
      function _U(a) {
        if (((a.hasCheckedOptimisedAppear = !0), a.root === a)) return;
        const { visualElement: l } = a.options;
        if (!l) return;
        const i = ZU(l);
        if (window.MotionHasOptimisedAnimation(i, "transform")) {
          const { layout: s, layoutId: f } = a.options;
          window.MotionCancelOptimisedAnimation(i, "transform", Mt, !(s || f));
        }
        const { parent: o } = a;
        o && !o.hasCheckedOptimisedAppear && _U(o);
      }
      function $U({
        attachResizeListener: a,
        defaultParent: l,
        measureScroll: i,
        checkIsScrollRoot: o,
        resetTransform: s,
      }) {
        return class {
          constructor(c = {}, q = l?.()) {
            ((this.id = nA++),
              (this.animationId = 0),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.isProjectionDirty = !1),
              (this.isSharedProjectionDirty = !1),
              (this.isTransformDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.hasCheckedOptimisedAppear = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.hasTreeAnimated = !1),
              (this.updateScheduled = !1),
              (this.scheduleUpdate = () => this.update()),
              (this.projectionUpdateScheduled = !1),
              (this.checkUpdateFailed = () => {
                this.isUpdating &&
                  ((this.isUpdating = !1), this.clearAllSnapshots());
              }),
              (this.updateProjection = () => {
                ((this.projectionUpdateScheduled = !1),
                  this.nodes.forEach(rA),
                  this.nodes.forEach(VA),
                  this.nodes.forEach(fA),
                  this.nodes.forEach(iA));
              }),
              (this.resolvedRelativeTargetAt = 0),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.latestValues = c),
              (this.root = q ? q.root || q : this),
              (this.path = q ? [...q.path, q] : []),
              (this.parent = q),
              (this.depth = q ? q.depth + 1 : 0));
            for (let p = 0; p < this.path.length; p++)
              this.path[p].shouldResetTransform = !0;
            this.root === this && (this.nodes = new Jy());
          }
          addEventListener(c, q) {
            return (
              this.eventHandlers.has(c) || this.eventHandlers.set(c, new df()),
              this.eventHandlers.get(c).add(q)
            );
          }
          notifyListeners(c, ...q) {
            const p = this.eventHandlers.get(c);
            p && p.notify(...q);
          }
          hasListeners(c) {
            return this.eventHandlers.has(c);
          }
          mount(c, q = this.root.hasTreeAnimated) {
            if (this.instance) return;
            ((this.isSVG = Oy(c)), (this.instance = c));
            const { layoutId: p, layout: d, visualElement: v } = this.options;
            if (
              (v && !v.current && v.mount(c),
              this.root.nodes.add(this),
              this.parent && this.parent.children.add(this),
              q && (d || p) && (this.isLayoutDirty = !0),
              a)
            ) {
              let m;
              const h = () => (this.root.updateBlockedByResize = !1);
              a(c, () => {
                ((this.root.updateBlockedByResize = !0),
                  m && m(),
                  (m = Py(h, 250)),
                  go.hasAnimatedSinceResize &&
                    ((go.hasAnimatedSinceResize = !1), this.nodes.forEach($K)));
              });
            }
            (p && this.root.registerSharedNode(p, this),
              this.options.animate !== !1 &&
                v &&
                (p || d) &&
                this.addEventListener(
                  "didUpdate",
                  ({
                    delta: m,
                    hasLayoutChanged: h,
                    hasRelativeLayoutChanged: y,
                    layout: A,
                  }) => {
                    if (this.isTreeAnimationBlocked()) {
                      ((this.target = void 0), (this.relativeTarget = void 0));
                      return;
                    }
                    const x =
                        this.options.transition ||
                        v.getDefaultTransition() ||
                        KA,
                      {
                        onLayoutAnimationStart: Z,
                        onLayoutAnimationComplete: z,
                      } = v.getProps(),
                      G = !this.targetLayout || !wU(this.targetLayout, A),
                      Y = !h && y;
                    if (
                      this.options.layoutRoot ||
                      this.resumeFrom ||
                      Y ||
                      (h && (G || !this.currentAnimation))
                    ) {
                      (this.resumeFrom &&
                        ((this.resumingFrom = this.resumeFrom),
                        (this.resumingFrom.resumingFrom = void 0)),
                        this.setAnimationOrigin(m, Y));
                      const L = {
                        ...Wf(x, "layout"),
                        onPlay: Z,
                        onComplete: z,
                      };
                      ((v.shouldReduceMotion || this.options.layoutRoot) &&
                        ((L.delay = 0), (L.type = !1)),
                        this.startAnimation(L));
                    } else
                      (h || $K(this),
                        this.isLead() &&
                          this.options.onExitComplete &&
                          this.options.onExitComplete());
                    this.targetLayout = A;
                  },
                ));
          }
          unmount() {
            (this.options.layoutId && this.willUpdate(),
              this.root.nodes.remove(this));
            const c = this.getStack();
            (c && c.remove(this),
              this.parent && this.parent.children.delete(this),
              (this.instance = void 0),
              na(this.updateProjection));
          }
          blockUpdate() {
            this.updateManuallyBlocked = !0;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = !1;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return (
              this.isAnimationBlocked ||
              (this.parent && this.parent.isTreeAnimationBlocked()) ||
              !1
            );
          }
          startUpdate() {
            this.isUpdateBlocked() ||
              ((this.isUpdating = !0),
              this.nodes && this.nodes.forEach(cA),
              this.animationId++);
          }
          getTransformTemplate() {
            const { visualElement: c } = this.options;
            return c && c.getProps().transformTemplate;
          }
          willUpdate(c = !0) {
            if (
              ((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())
            ) {
              this.options.onExitComplete && this.options.onExitComplete();
              return;
            }
            if (
              (window.MotionCancelOptimisedAnimation &&
                !this.hasCheckedOptimisedAppear &&
                _U(this),
              !this.root.isUpdating && this.root.startUpdate(),
              this.isLayoutDirty)
            )
              return;
            this.isLayoutDirty = !0;
            for (let v = 0; v < this.path.length; v++) {
              const m = this.path[v];
              ((m.shouldResetTransform = !0),
                m.updateScroll("snapshot"),
                m.options.layoutRoot && m.willUpdate(!1));
            }
            const { layoutId: q, layout: p } = this.options;
            if (q === void 0 && !p) return;
            const d = this.getTransformTemplate();
            ((this.prevTransformTemplateValue = d
              ? d(this.latestValues, "")
              : void 0),
              this.updateSnapshot(),
              c && this.notifyListeners("willUpdate"));
          }
          update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
              (this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(_K));
              return;
            }
            (this.isUpdating || this.nodes.forEach(uA),
              (this.isUpdating = !1),
              this.nodes.forEach(sA),
              this.nodes.forEach(aA),
              this.nodes.forEach(lA),
              this.clearAllSnapshots());
            const q = Fe.now();
            ((re.delta = zn(0, 1e3 / 60, q - re.timestamp)),
              (re.timestamp = q),
              (re.isProcessing = !0),
              VV.update.process(re),
              VV.preRender.process(re),
              VV.render.process(re),
              (re.isProcessing = !1));
          }
          didUpdate() {
            this.updateScheduled ||
              ((this.updateScheduled = !0), zf.read(this.scheduleUpdate));
          }
          clearAllSnapshots() {
            (this.nodes.forEach(oA), this.sharedNodes.forEach(qA));
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled ||
              ((this.projectionUpdateScheduled = !0),
              Mt.preRender(this.updateProjection, !1, !0));
          }
          scheduleCheckAfterUnmount() {
            Mt.postRender(() => {
              this.isLayoutDirty
                ? this.root.didUpdate()
                : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            this.snapshot ||
              !this.instance ||
              ((this.snapshot = this.measure()),
              this.snapshot &&
                !pe(this.snapshot.measuredBox.x) &&
                !pe(this.snapshot.measuredBox.y) &&
                (this.snapshot = void 0));
          }
          updateLayout() {
            if (
              !this.instance ||
              (this.updateScroll(),
              !(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty)
            )
              return;
            if (this.resumeFrom && !this.resumeFrom.instance)
              for (let p = 0; p < this.path.length; p++)
                this.path[p].updateScroll();
            const c = this.layout;
            ((this.layout = this.measure(!1)),
              (this.layoutCorrected = jt()),
              (this.isLayoutDirty = !1),
              (this.projectionDelta = void 0),
              this.notifyListeners("measure", this.layout.layoutBox));
            const { visualElement: q } = this.options;
            q &&
              q.notify(
                "LayoutMeasure",
                this.layout.layoutBox,
                c ? c.layoutBox : void 0,
              );
          }
          updateScroll(c = "measure") {
            let q = !!(this.options.layoutScroll && this.instance);
            if (
              (this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === c &&
                (q = !1),
              q)
            ) {
              const p = o(this.instance);
              this.scroll = {
                animationId: this.root.animationId,
                phase: c,
                isRoot: p,
                offset: i(this.instance),
                wasRoot: this.scroll ? this.scroll.isRoot : p,
              };
            }
          }
          resetTransform() {
            if (!s) return;
            const c =
                this.isLayoutDirty ||
                this.shouldResetTransform ||
                this.options.alwaysMeasureLayout,
              q = this.projectionDelta && !LU(this.projectionDelta),
              p = this.getTransformTemplate(),
              d = p ? p(this.latestValues, "") : void 0,
              v = d !== this.prevTransformTemplateValue;
            c &&
              (q || Xa(this.latestValues) || v) &&
              (s(this.instance, d),
              (this.shouldResetTransform = !1),
              this.scheduleRender());
          }
          measure(c = !0) {
            const q = this.measurePageBox();
            let p = this.removeElementScroll(q);
            return (
              c && (p = this.removeTransform(p)),
              vA(p),
              {
                animationId: this.root.animationId,
                measuredBox: q,
                layoutBox: p,
                latestValues: {},
                source: this.id,
              }
            );
          }
          measurePageBox() {
            const { visualElement: c } = this.options;
            if (!c) return jt();
            const q = c.measureViewportBox();
            if (!(this.scroll?.wasRoot || this.path.some(UA))) {
              const { scroll: d } = this.root;
              d && (vl(q.x, d.offset.x), vl(q.y, d.offset.y));
            }
            return q;
          }
          removeElementScroll(c) {
            const q = jt();
            if ((Pe(q, c), this.scroll?.wasRoot)) return q;
            for (let p = 0; p < this.path.length; p++) {
              const d = this.path[p],
                { scroll: v, options: m } = d;
              d !== this.root &&
                v &&
                m.layoutScroll &&
                (v.wasRoot && Pe(q, c),
                vl(q.x, v.offset.x),
                vl(q.y, v.offset.y));
            }
            return q;
          }
          applyTransform(c, q = !1) {
            const p = jt();
            Pe(p, c);
            for (let d = 0; d < this.path.length; d++) {
              const v = this.path[d];
              (!q &&
                v.options.layoutScroll &&
                v.scroll &&
                v !== v.root &&
                Ul(p, { x: -v.scroll.offset.x, y: -v.scroll.offset.y }),
                Xa(v.latestValues) && Ul(p, v.latestValues));
            }
            return (Xa(this.latestValues) && Ul(p, this.latestValues), p);
          }
          removeTransform(c) {
            const q = jt();
            Pe(q, c);
            for (let p = 0; p < this.path.length; p++) {
              const d = this.path[p];
              if (!d.instance || !Xa(d.latestValues)) continue;
              PV(d.latestValues) && d.updateSnapshot();
              const v = jt(),
                m = d.measurePageBox();
              (Pe(v, m),
                kK(
                  q,
                  d.latestValues,
                  d.snapshot ? d.snapshot.layoutBox : void 0,
                  v,
                ));
            }
            return (Xa(this.latestValues) && kK(q, this.latestValues), q);
          }
          setTargetDelta(c) {
            ((this.targetDelta = c),
              this.root.scheduleUpdateProjection(),
              (this.isProjectionDirty = !0));
          }
          setOptions(c) {
            this.options = {
              ...this.options,
              ...c,
              crossfade: c.crossfade !== void 0 ? c.crossfade : !0,
            };
          }
          clearMeasurements() {
            ((this.scroll = void 0),
              (this.layout = void 0),
              (this.snapshot = void 0),
              (this.prevTransformTemplateValue = void 0),
              (this.targetDelta = void 0),
              (this.target = void 0),
              (this.isLayoutDirty = !1));
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent &&
              this.relativeParent.resolvedRelativeTargetAt !== re.timestamp &&
              this.relativeParent.resolveTargetDelta(!0);
          }
          resolveTargetDelta(c = !1) {
            const q = this.getLead();
            (this.isProjectionDirty ||
              (this.isProjectionDirty = q.isProjectionDirty),
              this.isTransformDirty ||
                (this.isTransformDirty = q.isTransformDirty),
              this.isSharedProjectionDirty ||
                (this.isSharedProjectionDirty = q.isSharedProjectionDirty));
            const p = !!this.resumingFrom || this !== q;
            if (
              !(
                c ||
                (p && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                this.parent?.isProjectionDirty ||
                this.attemptToResolveRelativeTarget ||
                this.root.updateBlockedByResize
              )
            )
              return;
            const { layout: v, layoutId: m } = this.options;
            if (!(!this.layout || !(v || m))) {
              if (
                ((this.resolvedRelativeTargetAt = re.timestamp),
                !this.targetDelta && !this.relativeTarget)
              ) {
                const h = this.getClosestProjectingParent();
                h && h.layout && this.animationProgress !== 1
                  ? ((this.relativeParent = h),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = jt()),
                    (this.relativeTargetOrigin = jt()),
                    xr(
                      this.relativeTargetOrigin,
                      this.layout.layoutBox,
                      h.layout.layoutBox,
                    ),
                    Pe(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
              if (
                !(!this.relativeTarget && !this.targetDelta) &&
                (this.target ||
                  ((this.target = jt()), (this.targetWithTransforms = jt())),
                this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target
                  ? (this.forceRelativeParentToResolveTarget(),
                    hy(
                      this.target,
                      this.relativeTarget,
                      this.relativeParent.target,
                    ))
                  : this.targetDelta
                    ? (this.resumingFrom
                        ? (this.target = this.applyTransform(
                            this.layout.layoutBox,
                          ))
                        : Pe(this.target, this.layout.layoutBox),
                      NU(this.target, this.targetDelta))
                    : Pe(this.target, this.layout.layoutBox),
                this.attemptToResolveRelativeTarget)
              ) {
                this.attemptToResolveRelativeTarget = !1;
                const h = this.getClosestProjectingParent();
                h &&
                !!h.resumingFrom == !!this.resumingFrom &&
                !h.options.layoutScroll &&
                h.target &&
                this.animationProgress !== 1
                  ? ((this.relativeParent = h),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = jt()),
                    (this.relativeTargetOrigin = jt()),
                    xr(this.relativeTargetOrigin, this.target, h.target),
                    Pe(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
            }
          }
          getClosestProjectingParent() {
            if (
              !(
                !this.parent ||
                PV(this.parent.latestValues) ||
                OU(this.parent.latestValues)
              )
            )
              return this.parent.isProjecting()
                ? this.parent
                : this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return !!(
              (this.relativeTarget ||
                this.targetDelta ||
                this.options.layoutRoot) &&
              this.layout
            );
          }
          calcProjection() {
            const c = this.getLead(),
              q = !!this.resumingFrom || this !== c;
            let p = !0;
            if (
              ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
                (p = !1),
              q &&
                (this.isSharedProjectionDirty || this.isTransformDirty) &&
                (p = !1),
              this.resolvedRelativeTargetAt === re.timestamp && (p = !1),
              p)
            )
              return;
            const { layout: d, layoutId: v } = this.options;
            if (
              ((this.isTreeAnimating = !!(
                (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
              )),
              this.isTreeAnimating ||
                (this.targetDelta = this.relativeTarget = void 0),
              !this.layout || !(d || v))
            )
              return;
            Pe(this.layoutCorrected, this.layout.layoutBox);
            const m = this.treeScale.x,
              h = this.treeScale.y;
            (Fy(this.layoutCorrected, this.treeScale, this.path, q),
              c.layout &&
                !c.target &&
                (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
                ((c.target = c.layout.layoutBox),
                (c.targetWithTransforms = jt())));
            const { target: y } = c;
            if (!y) {
              this.prevProjectionDelta &&
                (this.createProjectionDeltas(), this.scheduleRender());
              return;
            }
            (!this.projectionDelta || !this.prevProjectionDelta
              ? this.createProjectionDeltas()
              : (NK(this.prevProjectionDelta.x, this.projectionDelta.x),
                NK(this.prevProjectionDelta.y, this.projectionDelta.y)),
              Zr(
                this.projectionDelta,
                this.layoutCorrected,
                y,
                this.latestValues,
              ),
              (this.treeScale.x !== m ||
                this.treeScale.y !== h ||
                !LK(this.projectionDelta.x, this.prevProjectionDelta.x) ||
                !LK(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
                ((this.hasProjected = !0),
                this.scheduleRender(),
                this.notifyListeners("projectionUpdate", y)));
          }
          hide() {
            this.isVisible = !1;
          }
          show() {
            this.isVisible = !0;
          }
          scheduleRender(c = !0) {
            if ((this.options.visualElement?.scheduleRender(), c)) {
              const q = this.getStack();
              q && q.scheduleRender();
            }
            this.resumingFrom &&
              !this.resumingFrom.instance &&
              (this.resumingFrom = void 0);
          }
          createProjectionDeltas() {
            ((this.prevProjectionDelta = Kl()),
              (this.projectionDelta = Kl()),
              (this.projectionDeltaWithTransform = Kl()));
          }
          setAnimationOrigin(c, q = !1) {
            const p = this.snapshot,
              d = p ? p.latestValues : {},
              v = { ...this.latestValues },
              m = Kl();
            ((!this.relativeParent ||
              !this.relativeParent.options.layoutRoot) &&
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
              (this.attemptToResolveRelativeTarget = !q));
            const h = jt(),
              y = p ? p.source : void 0,
              A = this.layout ? this.layout.source : void 0,
              x = y !== A,
              Z = this.getStack(),
              z = !Z || Z.members.length <= 1,
              G = !!(
                x &&
                !z &&
                this.options.crossfade === !0 &&
                !this.path.some(pA)
              );
            this.animationProgress = 0;
            let Y;
            ((this.mixTargetDelta = (L) => {
              const N = L / 1e3;
              (tv(m.x, c.x, N),
                tv(m.y, c.y, N),
                this.setTargetDelta(m),
                this.relativeTarget &&
                  this.relativeTargetOrigin &&
                  this.layout &&
                  this.relativeParent &&
                  this.relativeParent.layout &&
                  (xr(
                    h,
                    this.layout.layoutBox,
                    this.relativeParent.layout.layoutBox,
                  ),
                  dA(this.relativeTarget, this.relativeTargetOrigin, h, N),
                  Y &&
                    _y(this.relativeTarget, Y) &&
                    (this.isProjectionDirty = !1),
                  Y || (Y = jt()),
                  Pe(Y, this.relativeTarget)),
                x &&
                  ((this.animationValues = v),
                  Hy(v, d, this.latestValues, N, G, z)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                (this.animationProgress = N));
            }),
              this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
          }
          startAnimation(c) {
            (this.notifyListeners("animationStart"),
              this.currentAnimation && this.currentAnimation.stop(),
              this.resumingFrom &&
                this.resumingFrom.currentAnimation &&
                this.resumingFrom.currentAnimation.stop(),
              this.pendingAnimation &&
                (na(this.pendingAnimation), (this.pendingAnimation = void 0)),
              (this.pendingAnimation = Mt.update(() => {
                ((go.hasAnimatedSinceResize = !0),
                  (this.currentAnimation = My(0, wK, {
                    ...c,
                    onUpdate: (q) => {
                      (this.mixTargetDelta(q), c.onUpdate && c.onUpdate(q));
                    },
                    onStop: () => {},
                    onComplete: () => {
                      (c.onComplete && c.onComplete(),
                        this.completeAnimation());
                    },
                  })),
                  this.resumingFrom &&
                    (this.resumingFrom.currentAnimation =
                      this.currentAnimation),
                  (this.pendingAnimation = void 0));
              })));
          }
          completeAnimation() {
            this.resumingFrom &&
              ((this.resumingFrom.currentAnimation = void 0),
              (this.resumingFrom.preserveOpacity = void 0));
            const c = this.getStack();
            (c && c.exitAnimationComplete(),
              (this.resumingFrom =
                this.currentAnimation =
                this.animationValues =
                  void 0),
              this.notifyListeners("animationComplete"));
          }
          finishAnimation() {
            (this.currentAnimation &&
              (this.mixTargetDelta && this.mixTargetDelta(wK),
              this.currentAnimation.stop()),
              this.completeAnimation());
          }
          applyTransformsToTarget() {
            const c = this.getLead();
            let {
              targetWithTransforms: q,
              target: p,
              layout: d,
              latestValues: v,
            } = c;
            if (!(!q || !p || !d)) {
              if (
                this !== c &&
                this.layout &&
                d &&
                t3(
                  this.options.animationType,
                  this.layout.layoutBox,
                  d.layoutBox,
                )
              ) {
                p = this.target || jt();
                const m = pe(this.layout.layoutBox.x);
                ((p.x.min = c.target.x.min), (p.x.max = p.x.min + m));
                const h = pe(this.layout.layoutBox.y);
                ((p.y.min = c.target.y.min), (p.y.max = p.y.min + h));
              }
              (Pe(q, p),
                Ul(q, v),
                Zr(
                  this.projectionDeltaWithTransform,
                  this.layoutCorrected,
                  q,
                  v,
                ));
            }
          }
          registerSharedNode(c, q) {
            (this.sharedNodes.has(c) || this.sharedNodes.set(c, new $y()),
              this.sharedNodes.get(c).add(q));
            const d = q.options.initialPromotionConfig;
            q.promote({
              transition: d ? d.transition : void 0,
              preserveFollowOpacity:
                d && d.shouldPreserveFollowOpacity
                  ? d.shouldPreserveFollowOpacity(q)
                  : void 0,
            });
          }
          isLead() {
            const c = this.getStack();
            return c ? c.lead === this : !0;
          }
          getLead() {
            const { layoutId: c } = this.options;
            return c ? this.getStack()?.lead || this : this;
          }
          getPrevLead() {
            const { layoutId: c } = this.options;
            return c ? this.getStack()?.prevLead : void 0;
          }
          getStack() {
            const { layoutId: c } = this.options;
            if (c) return this.root.sharedNodes.get(c);
          }
          promote({
            needsReset: c,
            transition: q,
            preserveFollowOpacity: p,
          } = {}) {
            const d = this.getStack();
            (d && d.promote(this, p),
              c && ((this.projectionDelta = void 0), (this.needsReset = !0)),
              q && this.setOptions({ transition: q }));
          }
          relegate() {
            const c = this.getStack();
            return c ? c.relegate(this) : !1;
          }
          resetSkewAndRotation() {
            const { visualElement: c } = this.options;
            if (!c) return;
            let q = !1;
            const { latestValues: p } = c;
            if (
              ((p.z ||
                p.rotate ||
                p.rotateX ||
                p.rotateY ||
                p.rotateZ ||
                p.skewX ||
                p.skewY) &&
                (q = !0),
              !q)
            )
              return;
            const d = {};
            p.z && hV("z", c, d, this.animationValues);
            for (let v = 0; v < mV.length; v++)
              (hV(`rotate${mV[v]}`, c, d, this.animationValues),
                hV(`skew${mV[v]}`, c, d, this.animationValues));
            c.render();
            for (const v in d)
              (c.setStaticValue(v, d[v]),
                this.animationValues && (this.animationValues[v] = d[v]));
            c.scheduleRender();
          }
          getProjectionStyles(c) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) return eA;
            const q = { visibility: "" },
              p = this.getTransformTemplate();
            if (this.needsReset)
              return (
                (this.needsReset = !1),
                (q.opacity = ""),
                (q.pointerEvents = Ao(c?.pointerEvents) || ""),
                (q.transform = p ? p(this.latestValues, "") : "none"),
                q
              );
            const d = this.getLead();
            if (!this.projectionDelta || !this.layout || !d.target) {
              const y = {};
              return (
                this.options.layoutId &&
                  ((y.opacity =
                    this.latestValues.opacity !== void 0
                      ? this.latestValues.opacity
                      : 1),
                  (y.pointerEvents = Ao(c?.pointerEvents) || "")),
                this.hasProjected &&
                  !Xa(this.latestValues) &&
                  ((y.transform = p ? p({}, "") : "none"),
                  (this.hasProjected = !1)),
                y
              );
            }
            const v = d.animationValues || d.latestValues;
            (this.applyTransformsToTarget(),
              (q.transform = tA(
                this.projectionDeltaWithTransform,
                this.treeScale,
                v,
              )),
              p && (q.transform = p(v, q.transform)));
            const { x: m, y: h } = this.projectionDelta;
            ((q.transformOrigin = `${m.origin * 100}% ${h.origin * 100}% 0`),
              d.animationValues
                ? (q.opacity =
                    d === this
                      ? (v.opacity ?? this.latestValues.opacity ?? 1)
                      : this.preserveOpacity
                        ? this.latestValues.opacity
                        : v.opacityExit)
                : (q.opacity =
                    d === this
                      ? v.opacity !== void 0
                        ? v.opacity
                        : ""
                      : v.opacityExit !== void 0
                        ? v.opacityExit
                        : 0));
            for (const y in Nr) {
              if (v[y] === void 0) continue;
              const { correct: A, applyTo: x, isCSSVariable: Z } = Nr[y],
                z = q.transform === "none" ? v[y] : A(v[y], d);
              if (x) {
                const G = x.length;
                for (let Y = 0; Y < G; Y++) q[x[Y]] = z;
              } else
                Z
                  ? (this.options.visualElement.renderState.vars[y] = z)
                  : (q[y] = z);
            }
            return (
              this.options.layoutId &&
                (q.pointerEvents =
                  d === this ? Ao(c?.pointerEvents) || "" : "none"),
              q
            );
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            (this.root.nodes.forEach((c) => c.currentAnimation?.stop()),
              this.root.nodes.forEach(_K),
              this.root.sharedNodes.clear());
          }
        };
      }
      function aA(a) {
        a.updateLayout();
      }
      function lA(a) {
        const l = a.resumeFrom?.snapshot || a.snapshot;
        if (a.isLead() && a.layout && l && a.hasListeners("didUpdate")) {
          const { layoutBox: i, measuredBox: o } = a.layout,
            { animationType: s } = a.options,
            f = l.source !== a.layout.source;
          s === "size"
            ? ke((v) => {
                const m = f ? l.measuredBox[v] : l.layoutBox[v],
                  h = pe(m);
                ((m.min = i[v].min), (m.max = m.min + h));
              })
            : t3(s, l.layoutBox, i) &&
              ke((v) => {
                const m = f ? l.measuredBox[v] : l.layoutBox[v],
                  h = pe(i[v]);
                ((m.max = m.min + h),
                  a.relativeTarget &&
                    !a.currentAnimation &&
                    ((a.isProjectionDirty = !0),
                    (a.relativeTarget[v].max = a.relativeTarget[v].min + h)));
              });
          const c = Kl();
          Zr(c, i, l.layoutBox);
          const q = Kl();
          f
            ? Zr(q, a.applyTransform(o, !0), l.measuredBox)
            : Zr(q, i, l.layoutBox);
          const p = !LU(c);
          let d = !1;
          if (!a.resumeFrom) {
            const v = a.getClosestProjectingParent();
            if (v && !v.resumeFrom) {
              const { snapshot: m, layout: h } = v;
              if (m && h) {
                const y = jt();
                xr(y, l.layoutBox, m.layoutBox);
                const A = jt();
                (xr(A, i, h.layoutBox),
                  wU(y, A) || (d = !0),
                  v.options.layoutRoot &&
                    ((a.relativeTarget = A),
                    (a.relativeTargetOrigin = y),
                    (a.relativeParent = v)));
              }
            }
          }
          a.notifyListeners("didUpdate", {
            layout: i,
            snapshot: l,
            delta: q,
            layoutDelta: c,
            hasLayoutChanged: p,
            hasRelativeLayoutChanged: d,
          });
        } else if (a.isLead()) {
          const { onExitComplete: i } = a.options;
          i && i();
        }
        a.options.transition = void 0;
      }
      function rA(a) {
        a.parent &&
          (a.isProjecting() ||
            (a.isProjectionDirty = a.parent.isProjectionDirty),
          a.isSharedProjectionDirty ||
            (a.isSharedProjectionDirty = !!(
              a.isProjectionDirty ||
              a.parent.isProjectionDirty ||
              a.parent.isSharedProjectionDirty
            )),
          a.isTransformDirty ||
            (a.isTransformDirty = a.parent.isTransformDirty));
      }
      function iA(a) {
        a.isProjectionDirty =
          a.isSharedProjectionDirty =
          a.isTransformDirty =
            !1;
      }
      function oA(a) {
        a.clearSnapshot();
      }
      function _K(a) {
        a.clearMeasurements();
      }
      function uA(a) {
        a.isLayoutDirty = !1;
      }
      function sA(a) {
        const { visualElement: l } = a.options;
        (l &&
          l.getProps().onBeforeLayoutMeasure &&
          l.notify("BeforeLayoutMeasure"),
          a.resetTransform());
      }
      function $K(a) {
        (a.finishAnimation(),
          (a.targetDelta = a.relativeTarget = a.target = void 0),
          (a.isProjectionDirty = !0));
      }
      function VA(a) {
        a.resolveTargetDelta();
      }
      function fA(a) {
        a.calcProjection();
      }
      function cA(a) {
        a.resetSkewAndRotation();
      }
      function qA(a) {
        a.removeLeadSnapshot();
      }
      function tv(a, l, i) {
        ((a.translate = Et(l.translate, 0, i)),
          (a.scale = Et(l.scale, 1, i)),
          (a.origin = l.origin),
          (a.originPoint = l.originPoint));
      }
      function ev(a, l, i, o) {
        ((a.min = Et(l.min, i.min, o)), (a.max = Et(l.max, i.max, o)));
      }
      function dA(a, l, i, o) {
        (ev(a.x, l.x, i.x, o), ev(a.y, l.y, i.y, o));
      }
      function pA(a) {
        return a.animationValues && a.animationValues.opacityExit !== void 0;
      }
      const KA = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
        nv = (a) =>
          typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().includes(a),
        av = nv("applewebkit/") && !nv("chrome/") ? Math.round : He;
      function lv(a) {
        ((a.min = av(a.min)), (a.max = av(a.max)));
      }
      function vA(a) {
        (lv(a.x), lv(a.y));
      }
      function t3(a, l, i) {
        return (
          a === "position" ||
          (a === "preserve-aspect" && !my(DK(l), DK(i), 0.2))
        );
      }
      function UA(a) {
        return a !== a.root && a.scroll?.wasRoot;
      }
      const mA = $U({
          attachResizeListener: (a, l) => Pr(a, "resize", l),
          measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
          }),
          checkIsScrollRoot: () => !0,
        }),
        FV = { current: void 0 },
        e3 = $U({
          measureScroll: (a) => ({ x: a.scrollLeft, y: a.scrollTop }),
          defaultParent: () => {
            if (!FV.current) {
              const a = new mA({});
              (a.mount(window),
                a.setOptions({ layoutScroll: !0 }),
                (FV.current = a));
            }
            return FV.current;
          },
          resetTransform: (a, l) => {
            a.style.transform = l !== void 0 ? l : "none";
          },
          checkIsScrollRoot: (a) =>
            window.getComputedStyle(a).position === "fixed",
        }),
        hA = {
          pan: { Feature: Ty },
          drag: { Feature: xy, ProjectionNode: e3, MeasureLayout: jU },
        };
      function rv(a, l, i) {
        const { props: o } = a;
        a.animationState &&
          o.whileHover &&
          a.animationState.setActive("whileHover", i === "Start");
        const s = "onHover" + i,
          f = o[s];
        f && Mt.postRender(() => f(l, wr(l)));
      }
      class FA extends la {
        mount() {
          const { current: l } = this.node;
          l &&
            (this.unmount = wh(
              l,
              (i, o) => (
                rv(this.node, o, "Start"),
                (s) => rv(this.node, s, "End")
              ),
            ));
        }
        unmount() {}
      }
      class yA extends la {
        constructor() {
          (super(...arguments), (this.isActive = !1));
        }
        onFocus() {
          let l = !1;
          try {
            l = this.node.current.matches(":focus-visible");
          } catch {
            l = !0;
          }
          !l ||
            !this.node.animationState ||
            (this.node.animationState.setActive("whileFocus", !0),
            (this.isActive = !0));
        }
        onBlur() {
          !this.isActive ||
            !this.node.animationState ||
            (this.node.animationState.setActive("whileFocus", !1),
            (this.isActive = !1));
        }
        mount() {
          this.unmount = Ir(
            Pr(this.node.current, "focus", () => this.onFocus()),
            Pr(this.node.current, "blur", () => this.onBlur()),
          );
        }
        unmount() {}
      }
      function iv(a, l, i) {
        const { props: o } = a;
        if (a.current instanceof HTMLButtonElement && a.current.disabled)
          return;
        a.animationState &&
          o.whileTap &&
          a.animationState.setActive("whileTap", i === "Start");
        const s = "onTap" + (i === "End" ? "" : i),
          f = o[s];
        f && Mt.postRender(() => f(l, wr(l)));
      }
      class AA extends la {
        mount() {
          const { current: l } = this.node;
          l &&
            (this.unmount = eF(
              l,
              (i, o) => (
                iv(this.node, o, "Start"),
                (s, { success: f }) => iv(this.node, s, f ? "End" : "Cancel")
              ),
              { useGlobalTarget: this.node.props.globalTapTarget },
            ));
        }
        unmount() {}
      }
      const jV = new WeakMap(),
        yV = new WeakMap(),
        gA = (a) => {
          const l = jV.get(a.target);
          l && l(a);
        },
        XA = (a) => {
          a.forEach(gA);
        };
      function WA({ root: a, ...l }) {
        const i = a || document;
        yV.has(i) || yV.set(i, {});
        const o = yV.get(i),
          s = JSON.stringify(l);
        return (
          o[s] || (o[s] = new IntersectionObserver(XA, { root: a, ...l })),
          o[s]
        );
      }
      function SA(a, l, i) {
        const o = WA(l);
        return (
          jV.set(a, i),
          o.observe(a),
          () => {
            (jV.delete(a), o.unobserve(a));
          }
        );
      }
      const zA = { some: 0, all: 1 };
      class CA extends la {
        constructor() {
          (super(...arguments),
            (this.hasEnteredView = !1),
            (this.isInView = !1));
        }
        startObserver() {
          this.unmount();
          const { viewport: l = {} } = this.node.getProps(),
            { root: i, margin: o, amount: s = "some", once: f } = l,
            c = {
              root: i ? i.current : void 0,
              rootMargin: o,
              threshold: typeof s == "number" ? s : zA[s],
            },
            q = (p) => {
              const { isIntersecting: d } = p;
              if (
                this.isInView === d ||
                ((this.isInView = d), f && !d && this.hasEnteredView)
              )
                return;
              (d && (this.hasEnteredView = !0),
                this.node.animationState &&
                  this.node.animationState.setActive("whileInView", d));
              const { onViewportEnter: v, onViewportLeave: m } =
                  this.node.getProps(),
                h = d ? v : m;
              h && h(p);
            };
          return SA(this.node.current, c, q);
        }
        mount() {
          this.startObserver();
        }
        update() {
          if (typeof IntersectionObserver > "u") return;
          const { props: l, prevProps: i } = this.node;
          ["amount", "margin", "root"].some(QA(l, i)) && this.startObserver();
        }
        unmount() {}
      }
      function QA({ viewport: a = {} }, { viewport: l = {} } = {}) {
        return (i) => a[i] !== l[i];
      }
      const bA = {
          inView: { Feature: CA },
          tap: { Feature: AA },
          focus: { Feature: yA },
          hover: { Feature: FA },
        },
        BA = { layout: { ProjectionNode: e3, MeasureLayout: jU } },
        IV = { current: null },
        n3 = { current: !1 };
      function RA() {
        if (((n3.current = !0), !!uf))
          if (window.matchMedia) {
            const a = window.matchMedia("(prefers-reduced-motion)"),
              l = () => (IV.current = a.matches);
            (a.addListener(l), l());
          } else IV.current = !1;
      }
      const ZA = new WeakMap();
      function xA(a, l, i) {
        for (const o in l) {
          const s = l[o],
            f = i[o];
          if (ce(s)) a.addValue(o, s);
          else if (ce(f)) a.addValue(o, Mr(s, { owner: a }));
          else if (f !== s)
            if (a.hasValue(o)) {
              const c = a.getValue(o);
              c.liveStyle === !0 ? c.jump(s) : c.hasAnimated || c.set(s);
            } else {
              const c = a.getStaticValue(o);
              a.addValue(o, Mr(c !== void 0 ? c : s, { owner: a }));
            }
        }
        for (const o in i) l[o] === void 0 && a.removeValue(o);
        return l;
      }
      const ov = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
      ];
      class TA {
        scrapeMotionValuesFromProps(l, i, o) {
          return {};
        }
        constructor(
          {
            parent: l,
            props: i,
            presenceContext: o,
            reducedMotionConfig: s,
            blockInitialAnimation: f,
            visualState: c,
          },
          q = {},
        ) {
          ((this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.KeyframeResolver = Xf),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () =>
              this.notify("Update", this.latestValues)),
            (this.render = () => {
              this.current &&
                (this.triggerBuild(),
                this.renderInstance(
                  this.current,
                  this.renderState,
                  this.props.style,
                  this.projection,
                ));
            }),
            (this.renderScheduledAt = 0),
            (this.scheduleRender = () => {
              const h = Fe.now();
              this.renderScheduledAt < h &&
                ((this.renderScheduledAt = h), Mt.render(this.render, !1, !0));
            }));
          const { latestValues: p, renderState: d } = c;
          ((this.latestValues = p),
            (this.baseTarget = { ...p }),
            (this.initialValues = i.initial ? { ...p } : {}),
            (this.renderState = d),
            (this.parent = l),
            (this.props = i),
            (this.presenceContext = o),
            (this.depth = l ? l.depth + 1 : 0),
            (this.reducedMotionConfig = s),
            (this.options = q),
            (this.blockInitialAnimation = !!f),
            (this.isControllingVariants = Jo(i)),
            (this.isVariantNode = AU(i)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(l && l.current)));
          const { willChange: v, ...m } = this.scrapeMotionValuesFromProps(
            i,
            {},
            this,
          );
          for (const h in m) {
            const y = m[h];
            p[h] !== void 0 && ce(y) && y.set(p[h], !1);
          }
        }
        mount(l) {
          ((this.current = l),
            ZA.set(l, this),
            this.projection &&
              !this.projection.instance &&
              this.projection.mount(l),
            this.parent &&
              this.isVariantNode &&
              !this.isControllingVariants &&
              (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach((i, o) => this.bindToMotionValue(o, i)),
            n3.current || RA(),
            (this.shouldReduceMotion =
              this.reducedMotionConfig === "never"
                ? !1
                : this.reducedMotionConfig === "always"
                  ? !0
                  : IV.current),
            this.parent && this.parent.children.add(this),
            this.update(this.props, this.presenceContext));
        }
        unmount() {
          (this.projection && this.projection.unmount(),
            na(this.notifyUpdate),
            na(this.render),
            this.valueSubscriptions.forEach((l) => l()),
            this.valueSubscriptions.clear(),
            this.removeFromVariantTree && this.removeFromVariantTree(),
            this.parent && this.parent.children.delete(this));
          for (const l in this.events) this.events[l].clear();
          for (const l in this.features) {
            const i = this.features[l];
            i && (i.unmount(), (i.isMounted = !1));
          }
          this.current = null;
        }
        bindToMotionValue(l, i) {
          this.valueSubscriptions.has(l) && this.valueSubscriptions.get(l)();
          const o = Xl.has(l);
          o && this.onBindTransform && this.onBindTransform();
          const s = i.on("change", (q) => {
              ((this.latestValues[l] = q),
                this.props.onUpdate && Mt.preRender(this.notifyUpdate),
                o &&
                  this.projection &&
                  (this.projection.isTransformDirty = !0));
            }),
            f = i.on("renderRequest", this.scheduleRender);
          let c;
          (window.MotionCheckAppearSync &&
            (c = window.MotionCheckAppearSync(this, l, i)),
            this.valueSubscriptions.set(l, () => {
              (s(), f(), c && c(), i.owner && i.stop());
            }));
        }
        sortNodePosition(l) {
          return !this.current ||
            !this.sortInstanceNodePosition ||
            this.type !== l.type
            ? 0
            : this.sortInstanceNodePosition(this.current, l.current);
        }
        updateFeatures() {
          let l = "animation";
          for (l in hl) {
            const i = hl[l];
            if (!i) continue;
            const { isEnabled: o, Feature: s } = i;
            if (
              (!this.features[l] &&
                s &&
                o(this.props) &&
                (this.features[l] = new s(this)),
              this.features[l])
            ) {
              const f = this.features[l];
              f.isMounted ? f.update() : (f.mount(), (f.isMounted = !0));
            }
          }
        }
        triggerBuild() {
          this.build(this.renderState, this.latestValues, this.props);
        }
        measureViewportBox() {
          return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : jt();
        }
        getStaticValue(l) {
          return this.latestValues[l];
        }
        setStaticValue(l, i) {
          this.latestValues[l] = i;
        }
        update(l, i) {
          ((l.transformTemplate || this.props.transformTemplate) &&
            this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = l),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = i));
          for (let o = 0; o < ov.length; o++) {
            const s = ov[o];
            this.propEventSubscriptions[s] &&
              (this.propEventSubscriptions[s](),
              delete this.propEventSubscriptions[s]);
            const f = "on" + s,
              c = l[f];
            c && (this.propEventSubscriptions[s] = this.on(s, c));
          }
          ((this.prevMotionValues = xA(
            this,
            this.scrapeMotionValuesFromProps(l, this.prevProps, this),
            this.prevMotionValues,
          )),
            this.handleChildMotionValue && this.handleChildMotionValue());
        }
        getProps() {
          return this.props;
        }
        getVariant(l) {
          return this.props.variants ? this.props.variants[l] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode
            ? this
            : this.parent
              ? this.parent.getClosestVariantNode()
              : void 0;
        }
        addVariantChild(l) {
          const i = this.getClosestVariantNode();
          if (i)
            return (
              i.variantChildren && i.variantChildren.add(l),
              () => i.variantChildren.delete(l)
            );
        }
        addValue(l, i) {
          const o = this.values.get(l);
          i !== o &&
            (o && this.removeValue(l),
            this.bindToMotionValue(l, i),
            this.values.set(l, i),
            (this.latestValues[l] = i.get()));
        }
        removeValue(l) {
          this.values.delete(l);
          const i = this.valueSubscriptions.get(l);
          (i && (i(), this.valueSubscriptions.delete(l)),
            delete this.latestValues[l],
            this.removeValueFromRenderState(l, this.renderState));
        }
        hasValue(l) {
          return this.values.has(l);
        }
        getValue(l, i) {
          if (this.props.values && this.props.values[l])
            return this.props.values[l];
          let o = this.values.get(l);
          return (
            o === void 0 &&
              i !== void 0 &&
              ((o = Mr(i === null ? void 0 : i, { owner: this })),
              this.addValue(l, o)),
            o
          );
        }
        readValue(l, i) {
          let o =
            this.latestValues[l] !== void 0 || !this.current
              ? this.latestValues[l]
              : (this.getBaseTargetFromProps(this.props, l) ??
                this.readValueFromInstance(this.current, l, this.options));
          return (
            o != null &&
              (typeof o == "string" && (Rv(o) || Zv(o))
                ? (o = parseFloat(o))
                : !rF(o) && aa.test(i) && (o = KU(l, i)),
              this.setBaseTarget(l, ce(o) ? o.get() : o)),
            ce(o) ? o.get() : o
          );
        }
        setBaseTarget(l, i) {
          this.baseTarget[l] = i;
        }
        getBaseTarget(l) {
          const { initial: i } = this.props;
          let o;
          if (typeof i == "string" || typeof i == "object") {
            const f = Tf(this.props, i, this.presenceContext?.custom);
            f && (o = f[l]);
          }
          if (i && o !== void 0) return o;
          const s = this.getBaseTargetFromProps(this.props, l);
          return s !== void 0 && !ce(s)
            ? s
            : this.initialValues[l] !== void 0 && o === void 0
              ? void 0
              : this.baseTarget[l];
        }
        on(l, i) {
          return (
            this.events[l] || (this.events[l] = new df()),
            this.events[l].add(i)
          );
        }
        notify(l, ...i) {
          this.events[l] && this.events[l].notify(...i);
        }
      }
      class a3 extends TA {
        constructor() {
          (super(...arguments), (this.KeyframeResolver = Ih));
        }
        sortInstanceNodePosition(l, i) {
          return l.compareDocumentPosition(i) & 2 ? 1 : -1;
        }
        getBaseTargetFromProps(l, i) {
          return l.style ? l.style[i] : void 0;
        }
        removeValueFromRenderState(l, { vars: i, style: o }) {
          (delete i[l], delete o[l]);
        }
        handleChildMotionValue() {
          this.childSubscription &&
            (this.childSubscription(), delete this.childSubscription);
          const { children: l } = this.props;
          ce(l) &&
            (this.childSubscription = l.on("change", (i) => {
              this.current && (this.current.textContent = `${i}`);
            }));
        }
      }
      function l3(a, { style: l, vars: i }, o, s) {
        Object.assign(a.style, l, s && s.getProjectionStyles(o));
        for (const f in i) a.style.setProperty(f, i[f]);
      }
      function GA(a) {
        return window.getComputedStyle(a);
      }
      class EA extends a3 {
        constructor() {
          (super(...arguments),
            (this.type = "html"),
            (this.renderInstance = l3));
        }
        readValueFromInstance(l, i) {
          if (Xl.has(i)) return qh(l, i);
          {
            const o = GA(l),
              s = (vf(i) ? o.getPropertyValue(i) : o[i]) || 0;
            return typeof s == "string" ? s.trim() : s;
          }
        }
        measureInstanceViewportBox(l, { transformPagePoint: i }) {
          return JU(l, i);
        }
        build(l, i, o) {
          Rf(l, i, o.transformTemplate);
        }
        scrapeMotionValuesFromProps(l, i, o) {
          return Gf(l, i, o);
        }
      }
      const r3 = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
      ]);
      function YA(a, l, i, o) {
        l3(a, l, void 0, o);
        for (const s in l.attrs)
          a.setAttribute(r3.has(s) ? s : Bf(s), l.attrs[s]);
      }
      class MA extends a3 {
        constructor() {
          (super(...arguments),
            (this.type = "svg"),
            (this.isSVGTag = !1),
            (this.measureInstanceViewportBox = jt));
        }
        getBaseTargetFromProps(l, i) {
          return l[i];
        }
        readValueFromInstance(l, i) {
          if (Xl.has(i)) {
            const o = pU(i);
            return (o && o.default) || 0;
          }
          return ((i = r3.has(i) ? i : Bf(i)), l.getAttribute(i));
        }
        scrapeMotionValuesFromProps(l, i, o) {
          return RU(l, i, o);
        }
        build(l, i, o) {
          CU(l, i, this.isSVGTag, o.transformTemplate);
        }
        renderInstance(l, i, o, s) {
          YA(l, i, o, s);
        }
        mount(l) {
          ((this.isSVGTag = bU(l.tagName)), super.mount(l));
        }
      }

const OA = (a, l) =>
          xf(a) ? new MA(l) : new EA(l, { allowProjection: a !== X.Fragment }),
        NA = YF({ ...fy, ...bA, ...hA, ...BA }, OA),
        Xo = VF(NA);

var gV = { exports: {} };
      /*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ var uv;
      function Wg() {
        return (
          uv ||
            ((uv = 1),
            (function (a) {
              (function () {
                var l = {}.hasOwnProperty;
                function i() {
                  for (var f = "", c = 0; c < arguments.length; c++) {
                    var q = arguments[c];
                    q && (f = s(f, o(q)));
                  }
                  return f;
                }
                function o(f) {
                  if (typeof f == "string" || typeof f == "number") return f;
                  if (typeof f != "object") return "";
                  if (Array.isArray(f)) return i.apply(null, f);
                  if (
                    f.toString !== Object.prototype.toString &&
                    !f.toString.toString().includes("[native code]")
                  )
                    return f.toString();
                  var c = "";
                  for (var q in f) l.call(f, q) && f[q] && (c = s(c, q));
                  return c;
                }
                function s(f, c) {
                  return c ? (f ? f + " " + c : f + c) : f;
                }
                a.exports
                  ? ((i.default = i), (a.exports = i))
                  : (window.classNames = i);
              })();
            })(gV)),
          gV.exports
        );
      }
      var Sg = Wg();
      const zg = _V(Sg),
        Cg = ["xxl", "xl", "lg", "md", "sm", "xs"],
        Qg = "xs",
        o3 = X.createContext({
          prefixes: {},
          breakpoints: Cg,
          minBreakpoint: Qg,
        }),
        { Consumer: jX, Provider: IX } = o3;
      function bg(a, l) {
        const { prefixes: i } = X.useContext(o3);
        return a || i[l] || l;
      }
      var XV = { exports: {} },
        WV,
        sv;
      function Bg() {
        if (sv) return WV;
        sv = 1;
        var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        return ((WV = a), WV);
      }
      var SV, Vv;
      function Rg() {
        if (Vv) return SV;
        Vv = 1;
        var a = Bg();
        function l() {}
        function i() {}
        return (
          (i.resetWarningCache = l),
          (SV = function () {
            function o(c, q, p, d, v, m) {
              if (m !== a) {
                var h = new Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
                );
                throw ((h.name = "Invariant Violation"), h);
              }
            }
            o.isRequired = o;
            function s() {
              return o;
            }
            var f = {
              array: o,
              bigint: o,
              bool: o,
              func: o,
              number: o,
              object: o,
              string: o,
              symbol: o,
              any: o,
              arrayOf: s,
              element: o,
              elementType: o,
              instanceOf: s,
              node: o,
              objectOf: s,
              oneOf: s,
              oneOfType: s,
              shape: s,
              exact: s,
              checkPropTypes: i,
              resetWarningCache: l,
            };
            return ((f.PropTypes = f), f);
          }),
          SV
        );
      }
      var fv;
      function Zg() {
        return (fv || ((fv = 1), (XV.exports = Rg()())), XV.exports);
      }
      var xg = Zg();
      const zr = _V(xg);
      (zr.string, zr.bool, zr.bool, zr.bool, zr.bool);
      const Po = X.forwardRef(
        (
          {
            bsPrefix: a,
            className: l,
            fluid: i = !1,
            rounded: o = !1,
            roundedCircle: s = !1,
            thumbnail: f = !1,
            ...c
          },
          q,
        ) => (
          (a = bg(a, "img")),
          b.jsx("img", {
            ref: q,
            ...c,
            className: zg(
              l,
              i && `${a}-fluid`,
              o && "rounded",
              s && "rounded-circle",
              f && `${a}-thumbnail`,
            ),
          })
        ),
      );
      Po.displayName = "Image";

var So = { exports: {} },
        NX = So.exports,
        qv;
      function JX() {
        return (
          qv ||
            ((qv = 1),
            (function (a, l) {
              (function (i, o) {
                a.exports = o();
              })(NX, function () {
                return (function (i) {
                  function o(f) {
                    if (s[f]) return s[f].exports;
                    var c = (s[f] = { exports: {}, id: f, loaded: !1 });
                    return (
                      i[f].call(c.exports, c, c.exports, o),
                      (c.loaded = !0),
                      c.exports
                    );
                  }
                  var s = {};
                  return ((o.m = i), (o.c = s), (o.p = "dist/"), o(0));
                })([
                  function (i, o, s) {
                    function f(rt) {
                      return rt && rt.__esModule ? rt : { default: rt };
                    }
                    var c =
                        Object.assign ||
                        function (rt) {
                          for (var Ft = 1; Ft < arguments.length; Ft++) {
                            var T = arguments[Ft];
                            for (var P in T)
                              Object.prototype.hasOwnProperty.call(T, P) &&
                                (rt[P] = T[P]);
                          }
                          return rt;
                        },
                      q = s(1),
                      p = (f(q), s(6)),
                      d = f(p),
                      v = s(7),
                      m = f(v),
                      h = s(8),
                      y = f(h),
                      A = s(9),
                      x = f(A),
                      Z = s(10),
                      z = f(Z),
                      G = s(11),
                      Y = f(G),
                      L = s(14),
                      N = f(L),
                      I = [],
                      nt = !1,
                      k = {
                        offset: 120,
                        delay: 0,
                        easing: "ease",
                        duration: 400,
                        disable: !1,
                        once: !1,
                        startEvent: "DOMContentLoaded",
                        throttleDelay: 99,
                        debounceDelay: 50,
                        disableMutationObserver: !1,
                      },
                      lt = function () {
                        var rt =
                          arguments.length > 0 &&
                          arguments[0] !== void 0 &&
                          arguments[0];
                        if ((rt && (nt = !0), nt))
                          return (
                            (I = (0, Y.default)(I, k)),
                            (0, z.default)(I, k.once),
                            I
                          );
                      },
                      pt = function () {
                        ((I = (0, N.default)()), lt());
                      },
                      w = function () {
                        I.forEach(function (rt, Ft) {
                          (rt.node.removeAttribute("data-aos"),
                            rt.node.removeAttribute("data-aos-easing"),
                            rt.node.removeAttribute("data-aos-duration"),
                            rt.node.removeAttribute("data-aos-delay"));
                        });
                      },
                      H = function (rt) {
                        return (
                          rt === !0 ||
                          (rt === "mobile" && x.default.mobile()) ||
                          (rt === "phone" && x.default.phone()) ||
                          (rt === "tablet" && x.default.tablet()) ||
                          (typeof rt == "function" && rt() === !0)
                        );
                      },
                      dt = function (rt) {
                        ((k = c(k, rt)), (I = (0, N.default)()));
                        var Ft = document.all && !window.atob;
                        return H(k.disable) || Ft
                          ? w()
                          : (k.disableMutationObserver ||
                              y.default.isSupported() ||
                              (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                              (k.disableMutationObserver = !0)),
                            document
                              .querySelector("body")
                              .setAttribute("data-aos-easing", k.easing),
                            document
                              .querySelector("body")
                              .setAttribute("data-aos-duration", k.duration),
                            document
                              .querySelector("body")
                              .setAttribute("data-aos-delay", k.delay),
                            k.startEvent === "DOMContentLoaded" &&
                            ["complete", "interactive"].indexOf(
                              document.readyState,
                            ) > -1
                              ? lt(!0)
                              : k.startEvent === "load"
                                ? window.addEventListener(
                                    k.startEvent,
                                    function () {
                                      lt(!0);
                                    },
                                  )
                                : document.addEventListener(
                                    k.startEvent,
                                    function () {
                                      lt(!0);
                                    },
                                  ),
                            window.addEventListener(
                              "resize",
                              (0, m.default)(lt, k.debounceDelay, !0),
                            ),
                            window.addEventListener(
                              "orientationchange",
                              (0, m.default)(lt, k.debounceDelay, !0),
                            ),
                            window.addEventListener(
                              "scroll",
                              (0, d.default)(function () {
                                (0, z.default)(I, k.once);
                              }, k.throttleDelay),
                            ),
                            k.disableMutationObserver ||
                              y.default.ready("[data-aos]", pt),
                            I);
                      };
                    i.exports = { init: dt, refresh: lt, refreshHard: pt };
                  },
                  function (i, o) {},
                  ,
                  ,
                  ,
                  ,
                  function (i, o) {
                    (function (s) {
                      function f(H, dt, rt) {
                        function Ft(At) {
                          var ie = $,
                            _e = ct;
                          return (
                            ($ = ct = void 0),
                            (Ze = At),
                            (Xt = H.apply(_e, ie))
                          );
                        }
                        function T(At) {
                          return (
                            (Ze = At),
                            (ft = setTimeout(Kt, dt)),
                            ye ? Ft(At) : Xt
                          );
                        }
                        function P(At) {
                          var ie = At - Ot,
                            _e = At - Ze,
                            ge = dt - ie;
                          return Ae ? pt(ge, at - _e) : ge;
                        }
                        function _(At) {
                          var ie = At - Ot,
                            _e = At - Ze;
                          return (
                            Ot === void 0 ||
                            ie >= dt ||
                            ie < 0 ||
                            (Ae && _e >= at)
                          );
                        }
                        function Kt() {
                          var At = w();
                          return _(At)
                            ? g(At)
                            : void (ft = setTimeout(Kt, P(At)));
                        }
                        function g(At) {
                          return (
                            (ft = void 0),
                            Rt && $ ? Ft(At) : (($ = ct = void 0), Xt)
                          );
                        }
                        function J() {
                          (ft !== void 0 && clearTimeout(ft),
                            (Ze = 0),
                            ($ = Ot = ct = ft = void 0));
                        }
                        function D() {
                          return ft === void 0 ? Xt : g(w());
                        }
                        function j() {
                          var At = w(),
                            ie = _(At);
                          if ((($ = arguments), (ct = this), (Ot = At), ie)) {
                            if (ft === void 0) return T(Ot);
                            if (Ae) return ((ft = setTimeout(Kt, dt)), Ft(Ot));
                          }
                          return (
                            ft === void 0 && (ft = setTimeout(Kt, dt)),
                            Xt
                          );
                        }
                        var $,
                          ct,
                          at,
                          Xt,
                          ft,
                          Ot,
                          Ze = 0,
                          ye = !1,
                          Ae = !1,
                          Rt = !0;
                        if (typeof H != "function") throw new TypeError(h);
                        return (
                          (dt = v(dt) || 0),
                          q(rt) &&
                            ((ye = !!rt.leading),
                            (Ae = "maxWait" in rt),
                            (at = Ae ? lt(v(rt.maxWait) || 0, dt) : at),
                            (Rt = "trailing" in rt ? !!rt.trailing : Rt)),
                          (j.cancel = J),
                          (j.flush = D),
                          j
                        );
                      }
                      function c(H, dt, rt) {
                        var Ft = !0,
                          T = !0;
                        if (typeof H != "function") throw new TypeError(h);
                        return (
                          q(rt) &&
                            ((Ft = "leading" in rt ? !!rt.leading : Ft),
                            (T = "trailing" in rt ? !!rt.trailing : T)),
                          f(H, dt, { leading: Ft, maxWait: dt, trailing: T })
                        );
                      }
                      function q(H) {
                        var dt = typeof H > "u" ? "undefined" : m(H);
                        return !!H && (dt == "object" || dt == "function");
                      }
                      function p(H) {
                        return (
                          !!H &&
                          (typeof H > "u" ? "undefined" : m(H)) == "object"
                        );
                      }
                      function d(H) {
                        return (
                          (typeof H > "u" ? "undefined" : m(H)) == "symbol" ||
                          (p(H) && k.call(H) == A)
                        );
                      }
                      function v(H) {
                        if (typeof H == "number") return H;
                        if (d(H)) return y;
                        if (q(H)) {
                          var dt =
                            typeof H.valueOf == "function" ? H.valueOf() : H;
                          H = q(dt) ? dt + "" : dt;
                        }
                        if (typeof H != "string") return H === 0 ? H : +H;
                        H = H.replace(x, "");
                        var rt = z.test(H);
                        return rt || G.test(H)
                          ? Y(H.slice(2), rt ? 2 : 8)
                          : Z.test(H)
                            ? y
                            : +H;
                      }
                      var m =
                          typeof Symbol == "function" &&
                          typeof Symbol.iterator == "symbol"
                            ? function (H) {
                                return typeof H;
                              }
                            : function (H) {
                                return H &&
                                  typeof Symbol == "function" &&
                                  H.constructor === Symbol &&
                                  H !== Symbol.prototype
                                  ? "symbol"
                                  : typeof H;
                              },
                        h = "Expected a function",
                        y = NaN,
                        A = "[object Symbol]",
                        x = /^\s+|\s+$/g,
                        Z = /^[-+]0x[0-9a-f]+$/i,
                        z = /^0b[01]+$/i,
                        G = /^0o[0-7]+$/i,
                        Y = parseInt,
                        L =
                          (typeof s > "u" ? "undefined" : m(s)) == "object" &&
                          s &&
                          s.Object === Object &&
                          s,
                        N =
                          (typeof self > "u" ? "undefined" : m(self)) ==
                            "object" &&
                          self &&
                          self.Object === Object &&
                          self,
                        I = L || N || Function("return this")(),
                        nt = Object.prototype,
                        k = nt.toString,
                        lt = Math.max,
                        pt = Math.min,
                        w = function () {
                          return I.Date.now();
                        };
                      i.exports = c;
                    }).call(
                      o,
                      (function () {
                        return this;
                      })(),
                    );
                  },
                  function (i, o) {
                    (function (s) {
                      function f(w, H, dt) {
                        function rt(Rt) {
                          var At = j,
                            ie = $;
                          return (
                            (j = $ = void 0),
                            (Ot = Rt),
                            (at = w.apply(ie, At))
                          );
                        }
                        function Ft(Rt) {
                          return (
                            (Ot = Rt),
                            (Xt = setTimeout(_, H)),
                            Ze ? rt(Rt) : at
                          );
                        }
                        function T(Rt) {
                          var At = Rt - ft,
                            ie = Rt - Ot,
                            _e = H - At;
                          return ye ? lt(_e, ct - ie) : _e;
                        }
                        function P(Rt) {
                          var At = Rt - ft,
                            ie = Rt - Ot;
                          return (
                            ft === void 0 ||
                            At >= H ||
                            At < 0 ||
                            (ye && ie >= ct)
                          );
                        }
                        function _() {
                          var Rt = pt();
                          return P(Rt)
                            ? Kt(Rt)
                            : void (Xt = setTimeout(_, T(Rt)));
                        }
                        function Kt(Rt) {
                          return (
                            (Xt = void 0),
                            Ae && j ? rt(Rt) : ((j = $ = void 0), at)
                          );
                        }
                        function g() {
                          (Xt !== void 0 && clearTimeout(Xt),
                            (Ot = 0),
                            (j = ft = $ = Xt = void 0));
                        }
                        function J() {
                          return Xt === void 0 ? at : Kt(pt());
                        }
                        function D() {
                          var Rt = pt(),
                            At = P(Rt);
                          if (((j = arguments), ($ = this), (ft = Rt), At)) {
                            if (Xt === void 0) return Ft(ft);
                            if (ye) return ((Xt = setTimeout(_, H)), rt(ft));
                          }
                          return (Xt === void 0 && (Xt = setTimeout(_, H)), at);
                        }
                        var j,
                          $,
                          ct,
                          at,
                          Xt,
                          ft,
                          Ot = 0,
                          Ze = !1,
                          ye = !1,
                          Ae = !0;
                        if (typeof w != "function") throw new TypeError(m);
                        return (
                          (H = d(H) || 0),
                          c(dt) &&
                            ((Ze = !!dt.leading),
                            (ye = "maxWait" in dt),
                            (ct = ye ? k(d(dt.maxWait) || 0, H) : ct),
                            (Ae = "trailing" in dt ? !!dt.trailing : Ae)),
                          (D.cancel = g),
                          (D.flush = J),
                          D
                        );
                      }
                      function c(w) {
                        var H = typeof w > "u" ? "undefined" : v(w);
                        return !!w && (H == "object" || H == "function");
                      }
                      function q(w) {
                        return (
                          !!w &&
                          (typeof w > "u" ? "undefined" : v(w)) == "object"
                        );
                      }
                      function p(w) {
                        return (
                          (typeof w > "u" ? "undefined" : v(w)) == "symbol" ||
                          (q(w) && nt.call(w) == y)
                        );
                      }
                      function d(w) {
                        if (typeof w == "number") return w;
                        if (p(w)) return h;
                        if (c(w)) {
                          var H =
                            typeof w.valueOf == "function" ? w.valueOf() : w;
                          w = c(H) ? H + "" : H;
                        }
                        if (typeof w != "string") return w === 0 ? w : +w;
                        w = w.replace(A, "");
                        var dt = Z.test(w);
                        return dt || z.test(w)
                          ? G(w.slice(2), dt ? 2 : 8)
                          : x.test(w)
                            ? h
                            : +w;
                      }
                      var v =
                          typeof Symbol == "function" &&
                          typeof Symbol.iterator == "symbol"
                            ? function (w) {
                                return typeof w;
                              }
                            : function (w) {
                                return w &&
                                  typeof Symbol == "function" &&
                                  w.constructor === Symbol &&
                                  w !== Symbol.prototype
                                  ? "symbol"
                                  : typeof w;
                              },
                        m = "Expected a function",
                        h = NaN,
                        y = "[object Symbol]",
                        A = /^\s+|\s+$/g,
                        x = /^[-+]0x[0-9a-f]+$/i,
                        Z = /^0b[01]+$/i,
                        z = /^0o[0-7]+$/i,
                        G = parseInt,
                        Y =
                          (typeof s > "u" ? "undefined" : v(s)) == "object" &&
                          s &&
                          s.Object === Object &&
                          s,
                        L =
                          (typeof self > "u" ? "undefined" : v(self)) ==
                            "object" &&
                          self &&
                          self.Object === Object &&
                          self,
                        N = Y || L || Function("return this")(),
                        I = Object.prototype,
                        nt = I.toString,
                        k = Math.max,
                        lt = Math.min,
                        pt = function () {
                          return N.Date.now();
                        };
                      i.exports = f;
                    }).call(
                      o,
                      (function () {
                        return this;
                      })(),
                    );
                  },
                  function (i, o) {
                    function s(v) {
                      var m = void 0,
                        h = void 0;
                      for (m = 0; m < v.length; m += 1)
                        if (
                          ((h = v[m]),
                          (h.dataset && h.dataset.aos) ||
                            (h.children && s(h.children)))
                        )
                          return !0;
                      return !1;
                    }
                    function f() {
                      return (
                        window.MutationObserver ||
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver
                      );
                    }
                    function c() {
                      return !!f();
                    }
                    function q(v, m) {
                      var h = window.document,
                        y = f(),
                        A = new y(p);
                      ((d = m),
                        A.observe(h.documentElement, {
                          childList: !0,
                          subtree: !0,
                          removedNodes: !0,
                        }));
                    }
                    function p(v) {
                      v &&
                        v.forEach(function (m) {
                          var h = Array.prototype.slice.call(m.addedNodes),
                            y = Array.prototype.slice.call(m.removedNodes),
                            A = h.concat(y);
                          if (s(A)) return d();
                        });
                    }
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var d = function () {};
                    o.default = { isSupported: c, ready: q };
                  },
                  function (i, o) {
                    function s(h, y) {
                      if (!(h instanceof y))
                        throw new TypeError(
                          "Cannot call a class as a function",
                        );
                    }
                    function f() {
                      return (
                        navigator.userAgent ||
                        navigator.vendor ||
                        window.opera ||
                        ""
                      );
                    }
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var c = (function () {
                        function h(y, A) {
                          for (var x = 0; x < A.length; x++) {
                            var Z = A[x];
                            ((Z.enumerable = Z.enumerable || !1),
                              (Z.configurable = !0),
                              "value" in Z && (Z.writable = !0),
                              Object.defineProperty(y, Z.key, Z));
                          }
                        }
                        return function (y, A, x) {
                          return (A && h(y.prototype, A), x && h(y, x), y);
                        };
                      })(),
                      q =
                        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                      p =
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                      d =
                        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
                      v =
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                      m = (function () {
                        function h() {
                          s(this, h);
                        }
                        return (
                          c(h, [
                            {
                              key: "phone",
                              value: function () {
                                var y = f();
                                return !(!q.test(y) && !p.test(y.substr(0, 4)));
                              },
                            },
                            {
                              key: "mobile",
                              value: function () {
                                var y = f();
                                return !(!d.test(y) && !v.test(y.substr(0, 4)));
                              },
                            },
                            {
                              key: "tablet",
                              value: function () {
                                return this.mobile() && !this.phone();
                              },
                            },
                          ]),
                          h
                        );
                      })();
                    o.default = new m();
                  },
                  function (i, o) {
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var s = function (c, q, p) {
                        var d = c.node.getAttribute("data-aos-once");
                        q > c.position
                          ? c.node.classList.add("aos-animate")
                          : typeof d < "u" &&
                            (d === "false" || (!p && d !== "true")) &&
                            c.node.classList.remove("aos-animate");
                      },
                      f = function (c, q) {
                        var p = window.pageYOffset,
                          d = window.innerHeight;
                        c.forEach(function (v, m) {
                          s(v, d + p, q);
                        });
                      };
                    o.default = f;
                  },
                  function (i, o, s) {
                    function f(d) {
                      return d && d.__esModule ? d : { default: d };
                    }
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var c = s(12),
                      q = f(c),
                      p = function (d, v) {
                        return (
                          d.forEach(function (m, h) {
                            (m.node.classList.add("aos-init"),
                              (m.position = (0, q.default)(m.node, v.offset)));
                          }),
                          d
                        );
                      };
                    o.default = p;
                  },
                  function (i, o, s) {
                    function f(d) {
                      return d && d.__esModule ? d : { default: d };
                    }
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var c = s(13),
                      q = f(c),
                      p = function (d, v) {
                        var m = 0,
                          h = 0,
                          y = window.innerHeight,
                          A = {
                            offset: d.getAttribute("data-aos-offset"),
                            anchor: d.getAttribute("data-aos-anchor"),
                            anchorPlacement: d.getAttribute(
                              "data-aos-anchor-placement",
                            ),
                          };
                        switch (
                          (A.offset &&
                            !isNaN(A.offset) &&
                            (h = parseInt(A.offset)),
                          A.anchor &&
                            document.querySelectorAll(A.anchor) &&
                            (d = document.querySelectorAll(A.anchor)[0]),
                          (m = (0, q.default)(d).top),
                          A.anchorPlacement)
                        ) {
                          case "top-bottom":
                            break;
                          case "center-bottom":
                            m += d.offsetHeight / 2;
                            break;
                          case "bottom-bottom":
                            m += d.offsetHeight;
                            break;
                          case "top-center":
                            m += y / 2;
                            break;
                          case "bottom-center":
                            m += y / 2 + d.offsetHeight;
                            break;
                          case "center-center":
                            m += y / 2 + d.offsetHeight / 2;
                            break;
                          case "top-top":
                            m += y;
                            break;
                          case "bottom-top":
                            m += d.offsetHeight + y;
                            break;
                          case "center-top":
                            m += d.offsetHeight / 2 + y;
                        }
                        return (
                          A.anchorPlacement || A.offset || isNaN(v) || (h = v),
                          m + h
                        );
                      };
                    o.default = p;
                  },
                  function (i, o) {
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var s = function (f) {
                      for (
                        var c = 0, q = 0;
                        f && !isNaN(f.offsetLeft) && !isNaN(f.offsetTop);
                      )
                        ((c +=
                          f.offsetLeft -
                          (f.tagName != "BODY" ? f.scrollLeft : 0)),
                          (q +=
                            f.offsetTop -
                            (f.tagName != "BODY" ? f.scrollTop : 0)),
                          (f = f.offsetParent));
                      return { top: q, left: c };
                    };
                    o.default = s;
                  },
                  function (i, o) {
                    Object.defineProperty(o, "__esModule", { value: !0 });
                    var s = function (f) {
                      return (
                        (f = f || document.querySelectorAll("[data-aos]")),
                        Array.prototype.map.call(f, function (c) {
                          return { node: c };
                        })
                      );
                    };
                    o.default = s;
                  },
                ]);
              });
            })(So)),
          So.exports
        );
      }
