/*! WOW wow.js - v1.3.0 - 2016-10-04
 * https://wowjs.uk
 * Copyright (c) 2016 Thomas Grainger; Licensed MIT */
! function(a, b) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], b);
    else if ("undefined" != typeof exports) b(module, exports);
    else {
        var c = {
            exports: {}
        };
        b(c, c.exports), a.WOW = c.exports
    }
}(this, function(a, b) {
    "use strict";

    function c(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

    function d(a, b) {
        return b.indexOf(a) >= 0
    }

    function e(a, b) {
        for (var c in b)
            if (null == a[c]) {
                var d = b[c];
                a[c] = d
            }
        return a
    }

    function f(a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
    }

    function g(a) {
        var b = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
            c = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            d = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
            e = void 0;
        return null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
    }

    function h(a, b) {
        null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) && a["on" + b]()
    }

    function i(a, b, c) {
        null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
    }

    function j(a, b, c) {
        null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
    }

    function k() {
        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
    }
    Object.defineProperty(b, "__esModule", {
        value: !0
    });
    var l, m, n = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b
            }
        }(),
        o = window.WeakMap || window.MozWeakMap || function() {
            function a() {
                c(this, a), this.keys = [], this.values = []
            }
            return n(a, [{
                key: "get",
                value: function(a) {
                    for (var b = 0; b < this.keys.length; b++) {
                        var c = this.keys[b];
                        if (c === a) return this.values[b]
                    }
                }
            }, {
                key: "set",
                value: function(a, b) {
                    for (var c = 0; c < this.keys.length; c++) {
                        var d = this.keys[c];
                        if (d === a) return this.values[c] = b, this
                    }
                    return this.keys.push(a), this.values.push(b), this
                }
            }]), a
        }(),
        p = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (m = l = function() {
            function a() {
                c(this, a), "undefined" != typeof console && null !== console && (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))
            }
            return n(a, [{
                key: "observe",
                value: function() {}
            }]), a
        }(), l.notSupported = !0, m),
        q = window.getComputedStyle || function(a) {
            var b = /(\-([a-z]){1})/g;
            return {
                getPropertyValue: function(c) {
                    "float" === c && (c = "styleFloat"), b.test(c) && c.replace(b, function(a, b) {
                        return b.toUpperCase()
                    });
                    var d = a.currentStyle;
                    return (null != d ? d[c] : void 0) || null
                }
            }
        },
        r = function() {
            function a() {
                var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                c(this, a), this.defaults = {
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: !0,
                    live: !0,
                    callback: null,
                    scrollContainer: null,
                    resetAnimation: !0
                }, this.animate = function() {
                    return "requestAnimationFrame" in window ? function(a) {
                        return window.requestAnimationFrame(a)
                    } : function(a) {
                        return a()
                    }
                }(), this.vendors = ["moz", "webkit"], this.start = this.start.bind(this), this.resetAnimation = this.resetAnimation.bind(this), this.scrollHandler = this.scrollHandler.bind(this), this.scrollCallback = this.scrollCallback.bind(this), this.scrolled = !0, this.config = e(b, this.defaults), null != b.scrollContainer && (this.config.scrollContainer = document.querySelector(b.scrollContainer)), this.animationNameCache = new o, this.wowEvent = g(this.config.boxClass)
            }
            return n(a, [{
                key: "init",
                value: function() {
                    this.element = window.document.documentElement, d(document.readyState, ["interactive", "complete"]) ? this.start() : i(document, "DOMContentLoaded", this.start), this.finished = []
                }
            }, {
                key: "start",
                value: function() {
                    var a = this;
                    if (this.stopped = !1, this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass)), this.all = this.boxes.slice(0), this.boxes.length)
                        if (this.disabled()) this.resetStyle();
                        else
                            for (var b = 0; b < this.boxes.length; b++) {
                                var c = this.boxes[b];
                                this.applyStyle(c, !0)
                            }
                    if (this.disabled() || (i(this.config.scrollContainer || window, "scroll", this.scrollHandler), i(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) {
                        var d = new p(function(b) {
                            for (var c = 0; c < b.length; c++)
                                for (var d = b[c], e = 0; e < d.addedNodes.length; e++) {
                                    var f = d.addedNodes[e];
                                    a.doSync(f)
                                }
                        });
                        d.observe(document.body, {
                            childList: !0,
                            subtree: !0
                        })
                    }
                }
            }, {
                key: "stop",
                value: function() {
                    this.stopped = !0, j(this.config.scrollContainer || window, "scroll", this.scrollHandler), j(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval)
                }
            }, {
                key: "sync",
                value: function() {
                    p.notSupported && this.doSync(this.element)
                }
            }, {
                key: "doSync",
                value: function(a) {
                    if ("undefined" != typeof a && null !== a || (a = this.element), 1 === a.nodeType) {
                        a = a.parentNode || a;
                        for (var b = a.querySelectorAll("." + this.config.boxClass), c = 0; c < b.length; c++) {
                            var e = b[c];
                            d(e, this.all) || (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), this.scrolled = !0)
                        }
                    }
                }
            }, {
                key: "show",
                value: function(a) {
                    return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), h(a, this.wowEvent), this.config.resetAnimation && (i(a, "animationend", this.resetAnimation), i(a, "oanimationend", this.resetAnimation), i(a, "webkitAnimationEnd", this.resetAnimation), i(a, "MSAnimationEnd", this.resetAnimation)), a
                }
            }, {
                key: "applyStyle",
                value: function(a, b) {
                    var c = this,
                        d = a.getAttribute("data-wow-duration"),
                        e = a.getAttribute("data-wow-delay"),
                        f = a.getAttribute("data-wow-iteration");
                    return this.animate(function() {
                        return c.customStyle(a, b, d, e, f)
                    })
                }
            }, {
                key: "resetStyle",
                value: function() {
                    for (var a = 0; a < this.boxes.length; a++) {
                        var b = this.boxes[a];
                        b.style.visibility = "visible"
                    }
                }
            }, {
                key: "resetAnimation",
                value: function(a) {
                    if (a.type.toLowerCase().indexOf("animationend") >= 0) {
                        var b = a.target || a.srcElement;
                        b.className = b.className.replace(this.config.animateClass, "").trim()
                    }
                }
            }, {
                key: "customStyle",
                value: function(a, b, c, d, e) {
                    return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                        animationDuration: c
                    }), d && this.vendorSet(a.style, {
                        animationDelay: d
                    }), e && this.vendorSet(a.style, {
                        animationIterationCount: e
                    }), this.vendorSet(a.style, {
                        animationName: b ? "none" : this.cachedAnimationName(a)
                    }), a
                }
            }, {
                key: "vendorSet",
                value: function(a, b) {
                    for (var c in b)
                        if (b.hasOwnProperty(c)) {
                            var d = b[c];
                            a["" + c] = d;
                            for (var e = 0; e < this.vendors.length; e++) {
                                var f = this.vendors[e];
                                a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = d
                            }
                        }
                }
            }, {
                key: "vendorCSS",
                value: function(a, b) {
                    for (var c = q(a), d = c.getPropertyCSSValue(b), e = 0; e < this.vendors.length; e++) {
                        var f = this.vendors[e];
                        d = d || c.getPropertyCSSValue("-" + f + "-" + b)
                    }
                    return d
                }
            }, {
                key: "animationName",
                value: function(a) {
                    var b = void 0;
                    try {
                        b = this.vendorCSS(a, "animation-name").cssText
                    } catch (c) {
                        b = q(a).getPropertyValue("animation-name")
                    }
                    return "none" === b ? "" : b
                }
            }, {
                key: "cacheAnimationName",
                value: function(a) {
                    return this.animationNameCache.set(a, this.animationName(a))
                }
            }, {
                key: "cachedAnimationName",
                value: function(a) {
                    return this.animationNameCache.get(a)
                }
            }, {
                key: "scrollHandler",
                value: function() {
                    this.scrolled = !0
                }
            }, {
                key: "scrollCallback",
                value: function() {
                    if (this.scrolled) {
                        this.scrolled = !1;
                        for (var a = [], b = 0; b < this.boxes.length; b++) {
                            var c = this.boxes[b];
                            if (c) {
                                if (this.isVisible(c)) {
                                    this.show(c);
                                    continue
                                }
                                a.push(c)
                            }
                        }
                        this.boxes = a, this.boxes.length || this.config.live || this.stop()
                    }
                }
            }, {
                key: "offsetTop",
                value: function(a) {
                    for (; void 0 === a.offsetTop;) a = a.parentNode;
                    for (var b = a.offsetTop; a.offsetParent;) a = a.offsetParent, b += a.offsetTop;
                    return b
                }
            }, {
                key: "isVisible",
                value: function(a) {
                    var b = a.getAttribute("data-wow-offset") || this.config.offset,
                        c = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
                        d = c + Math.min(this.element.clientHeight, k()) - b,
                        e = this.offsetTop(a),
                        f = e + a.clientHeight;
                    return d >= e && f >= c
                }
            }, {
                key: "disabled",
                value: function() {
                    return !this.config.mobile && f(navigator.userAgent)
                }
            }]), a
        }();
    b["default"] = r, a.exports = b["default"]
});


/*! Parallaxie */
! function(e) {
    e.fn.parallaxie = function(o) {
        o = e.extend({
            speed: .2,
            repeat: "no-repeat",
            size: "cover",
            pos_x: "center",
            offset: 0
        }, o);
        return this.each(function() {
            var a = e(this),
                t = a.data("parallaxie");
            "object" != typeof t && (t = {}), t = e.extend({}, o, t);
            var s = a.data("image");
            if (void 0 === s) {
                if (!(s = a.css("background-image"))) return;
                var n = t.offset + (a.offset().top - e(window).scrollTop()) * (1 - t.speed);
                a.css({
                    "background-image": s,
                    "background-size": t.size,
                    "background-repeat": t.repeat,
                    "background-attachment": "fixed",
                    "background-position": t.pos_x + " " + n + "px"
                }), e(window).scroll(function() {
                    var o = t.offset + (a.offset().top - e(window).scrollTop()) * (1 - t.speed);
                    a.data("pos_y", o), a.css("background-position", t.pos_x + " " + o + "px")
                })
            }
        }), this
    }
}(jQuery);


/*! data-splitting */

! function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Splitting = t()
}(this, function() {
    "use strict"
    var u = document,
        l = u.createTextNode.bind(u)

    function d(n, t, e) {
        n.style.setProperty(t, e)
    }

    function f(n, t) {
        return n.appendChild(t)
    }

    function p(n, t, e, r) {
        var i = u.createElement("span")
        return t && (i.className = t), e && (!r && i.setAttribute("data-" + t, e), i.textContent = e), n && f(n, i) || i
    }

    function h(n, t) {
        return n.getAttribute("data-" + t)
    }

    function m(n, t) {
        return n && 0 != n.length ? n.nodeName ? [n] : [].slice.call(n[0].nodeName ? n : (t || u).querySelectorAll(n)) : []
    }

    function o(n) {
        for (var t = []; n--;) t[n] = []
        return t
    }

    function g(n, t) {
        n && n.some(t)
    }

    function c(t) {
        return function(n) {
            return t[n]
        }
    }
    var a = {}

    function n(n, t, e, r) {
        return {
            by: n,
            depends: t,
            key: e,
            split: r
        }
    }

    function e(n) {
        return function t(e, n, r) {
            var i = r.indexOf(e)
            if (-1 == i) r.unshift(e), g(a[e].depends, function(n) {
                t(n, e, r)
            })
            else {
                var u = r.indexOf(n)
                r.splice(i, 1), r.splice(u, 0, e)
            }
            return r
        }(n, 0, []).map(c(a))
    }

    function t(n) {
        a[n.by] = n
    }

    function v(n, r, i, u, o) {
        n.normalize()
        var c = [],
            a = document.createDocumentFragment()
        u && c.push(n.previousSibling)
        var s = []
        return m(n.childNodes).some(function(n) {
            if (!n.tagName || n.hasChildNodes()) {
                if (n.childNodes && n.childNodes.length) return s.push(n), void c.push.apply(c, v(n, r, i, u, o))
                var t = n.wholeText || "",
                    e = t.trim()
                e.length && (" " === t[0] && s.push(l(" ")), g(e.split(i), function(n, t) {
                    t && o && s.push(p(a, "whitespace", " ", o))
                    var e = p(a, r, n)
                    c.push(e), s.push(e)
                }), " " === t[t.length - 1] && s.push(l(" ")))
            } else s.push(n)
        }), g(s, function(n) {
            f(a, n)
        }), n.innerHTML = "", f(n, a), c
    }
    var s = 0
    var i = "words",
        r = n(i, s, "word", function(n) {
            return v(n, "word", /\s+/, 0, 1)
        }),
        y = "chars",
        w = n(y, [i], "char", function(n, e, t) {
            var r = []
            return g(t[i], function(n, t) {
                r.push.apply(r, v(n, "char", "", e.whitespace && t))
            }), r
        })

    function b(t) {
        var f = (t = t || {}).key
        return m(t.target || "[data-splitting]").map(function(a) {
            var s = a["ðŸŒ"]
            if (!t.force && s) return s
            s = a["ðŸŒ"] = {
                el: a
            }
            var n = e(t.by || h(a, "splitting") || y),
                l = function(n, t) {
                    for (var e in t) n[e] = t[e]
                    return n
                }({}, t)
            return g(n, function(n) {
                if (n.split) {
                    var t = n.by,
                        e = (f ? "-" + f : "") + n.key,
                        r = n.split(a, l, s)
                    e && (i = a, c = (o = "--" + e) + "-index", g(u = r, function(n, t) {
                        Array.isArray(n) ? g(n, function(n) {
                            d(n, c, t)
                        }) : d(n, c, t)
                    }), d(i, o + "-total", u.length)), s[t] = r, a.classList.add(t)
                }
                var i, u, o, c
            }), a.classList.add("splitting"), s
        })
    }

    function N(n, t, e) {
        var r = m(t.matching || n.children, n),
            i = {}
        return g(r, function(n) {
            var t = Math.round(n[e]);
            (i[t] || (i[t] = [])).push(n)
        }), Object.keys(i).map(Number).sort(x).map(c(i))
    }

    function x(n, t) {
        return n - t
    }
    b.html = function(n) {
        var t = (n = n || {}).target = p()
        return t.innerHTML = n.content, b(n), t.outerHTML
    }, b.add = t
    var T = n("lines", [i], "line", function(n, t, e) {
            return N(n, {
                matching: e[i]
            }, "offsetTop")
        }),
        L = n("items", s, "item", function(n, t) {
            return m(t.matching || n.children, n)
        }),
        k = n("rows", s, "row", function(n, t) {
            return N(n, t, "offsetTop")
        }),
        A = n("cols", s, "col", function(n, t) {
            return N(n, t, "offsetLeft")
        }),
        C = n("grid", ["rows", "cols"]),
        M = "layout",
        S = n(M, s, s, function(n, t) {
            var e = t.rows = +(t.rows || h(n, "rows") || 1),
                r = t.columns = +(t.columns || h(n, "columns") || 1)
            if (t.image = t.image || h(n, "image") || n.currentSrc || n.src, t.image) {
                var i = m("img", n)[0]
                t.image = i && (i.currentSrc || i.src)
            }
            t.image && d(n, "background-image", "url(" + t.image + ")")
            for (var u = e * r, o = [], c = p(s, "cell-grid"); u--;) {
                var a = p(c, "cell")
                p(a, "cell-inner"), o.push(a)
            }
            return f(n, c), o
        }),
        H = n("cellRows", [M], "row", function(n, t, e) {
            var r = t.rows,
                i = o(r)
            return g(e[M], function(n, t, e) {
                i[Math.floor(t / (e.length / r))].push(n)
            }), i
        }),
        O = n("cellColumns", [M], "col", function(n, t, e) {
            var r = t.columns,
                i = o(r)
            return g(e[M], function(n, t) {
                i[t % r].push(n)
            }), i
        }),
        j = n("cells", ["cellRows", "cellColumns"], "cell", function(n, t, e) {
            return e[M]
        })
    return t(r), t(w), t(T), t(L), t(k), t(A), t(C), t(S), t(H), t(O), t(j), b
})




/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * @licence MIT
 * @preserve
 */
! function(i) {
    if ("function" == typeof define && define.amd) define(["jquery"], i);
    else if ("object" == typeof module && module.exports) {
        var t = require("jquery");
        i(t), module.exports = t
    } else i(jQuery)
}(function(i) {
    function t(i) {
        this.init(i)
    }
    t.prototype = {
        value: 0,
        size: 100,
        startAngle: -Math.PI,
        thickness: "auto",
        fill: {
            gradient: ["#3aeabb", "#fdd250"]
        },
        emptyFill: "rgba(0, 0, 0, .1)",
        animation: {
            duration: 1200,
            easing: "circleProgressEasing"
        },
        animationStartValue: 0,
        reverse: !1,
        lineCap: "butt",
        insertMode: "prepend",
        constructor: t,
        el: null,
        canvas: null,
        ctx: null,
        radius: 0,
        arcFill: null,
        lastFrameValue: 0,
        init: function(t) {
            i.extend(this, t), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw(), this.el.trigger("circle-inited")
        },
        initWidget: function() {
            this.canvas || (this.canvas = i("<canvas>")["prepend" == this.insertMode ? "prependTo" : "appendTo"](this.el)[0]);
            var t = this.canvas;
            if (t.width = this.size, t.height = this.size, this.ctx = t.getContext("2d"), window.devicePixelRatio > 1) {
                var e = window.devicePixelRatio;
                t.style.width = t.style.height = this.size + "px", t.width = t.height = this.size * e, this.ctx.scale(e, e)
            }
        },
        initFill: function() {
            function t() {
                var t = i("<canvas>")[0];
                t.width = e.size, t.height = e.size, t.getContext("2d").drawImage(g, 0, 0, r, r), e.arcFill = e.ctx.createPattern(t, "no-repeat"), e.drawFrame(e.lastFrameValue)
            }
            var e = this,
                a = this.fill,
                n = this.ctx,
                r = this.size;
            if (!a) throw Error("The fill is not specified!");
            if ("string" == typeof a && (a = {
                    color: a
                }), a.color && (this.arcFill = a.color), a.gradient) {
                var s = a.gradient;
                if (1 == s.length) this.arcFill = s[0];
                else if (s.length > 1) {
                    for (var l = a.gradientAngle || 0, o = a.gradientDirection || [r / 2 * (1 - Math.cos(l)), r / 2 * (1 + Math.sin(l)), r / 2 * (1 + Math.cos(l)), r / 2 * (1 - Math.sin(l))], h = n.createLinearGradient.apply(n, o), c = 0; c < s.length; c++) {
                        var d = s[c],
                            u = c / (s.length - 1);
                        i.isArray(d) && (u = d[1], d = d[0]), h.addColorStop(u, d)
                    }
                    this.arcFill = h
                }
            }
            if (a.image) {
                var g;
                a.image instanceof Image ? g = a.image : (g = new Image, g.src = a.image), g.complete ? t() : g.onload = t
            }
        },
        draw: function() {
            this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value)
        },
        drawFrame: function(i) {
            this.lastFrameValue = i, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(i), this.drawArc(i)
        },
        drawArc: function(i) {
            if (0 !== i) {
                var t = this.ctx,
                    e = this.radius,
                    a = this.getThickness(),
                    n = this.startAngle;
                t.save(), t.beginPath(), this.reverse ? t.arc(e, e, e - a / 2, n - 2 * Math.PI * i, n) : t.arc(e, e, e - a / 2, n, n + 2 * Math.PI * i), t.lineWidth = a, t.lineCap = this.lineCap, t.strokeStyle = this.arcFill, t.stroke(), t.restore()
            }
        },
        drawEmptyArc: function(i) {
            var t = this.ctx,
                e = this.radius,
                a = this.getThickness(),
                n = this.startAngle;
            i < 1 && (t.save(), t.beginPath(), i <= 0 ? t.arc(e, e, e - a / 2, 0, 2 * Math.PI) : this.reverse ? t.arc(e, e, e - a / 2, n, n - 2 * Math.PI * i) : t.arc(e, e, e - a / 2, n + 2 * Math.PI * i, n), t.lineWidth = a, t.strokeStyle = this.emptyFill, t.stroke(), t.restore())
        },
        drawAnimated: function(t) {
            var e = this,
                a = this.el,
                n = i(this.canvas);
            n.stop(!0, !1), a.trigger("circle-animation-start"), n.css({
                animationProgress: 0
            }).animate({
                animationProgress: 1
            }, i.extend({}, this.animation, {
                step: function(i) {
                    var n = e.animationStartValue * (1 - i) + t * i;
                    e.drawFrame(n), a.trigger("circle-animation-progress", [i, n])
                }
            })).promise().always(function() {
                a.trigger("circle-animation-end")
            })
        },
        getThickness: function() {
            return i.isNumeric(this.thickness) ? this.thickness : this.size / 14
        },
        getValue: function() {
            return this.value
        },
        setValue: function(i) {
            this.animation && (this.animationStartValue = this.lastFrameValue), this.value = i, this.draw()
        }
    }, i.circleProgress = {
        defaults: t.prototype
    }, i.easing.circleProgressEasing = function(i) {
        return i < .5 ? (i = 2 * i, .5 * i * i * i) : (i = 2 - 2 * i, 1 - .5 * i * i * i)
    }, i.fn.circleProgress = function(e, a) {
        var n = "circle-progress",
            r = this.data(n);
        if ("widget" == e) {
            if (!r) throw Error('Calling "widget" method on not initialized instance is forbidden');
            return r.canvas
        }
        if ("value" == e) {
            if (!r) throw Error('Calling "value" method on not initialized instance is forbidden');
            if ("undefined" == typeof a) return r.getValue();
            var s = arguments[1];
            return this.each(function() {
                i(this).data(n).setValue(s)
            })
        }
        return this.each(function() {
            var a = i(this),
                r = a.data(n),
                s = i.isPlainObject(e) ? e : {};
            if (r) r.init(s);
            else {
                var l = i.extend({}, a.data());
                "string" == typeof l.fill && (l.fill = JSON.parse(l.fill)), "string" == typeof l.animation && (l.animation = JSON.parse(l.animation)), s = i.extend(l, s), s.el = a, r = new t(s), a.data(n, r)
            }
        })
    }
});