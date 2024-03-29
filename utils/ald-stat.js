!function () {
  var t = "5.4.1",
      a = "log",
      e = require("./ald-stat-conf.js"),
      s = 0,
      n = 0,
      o = 0,
      r = 0;function _(t) {
    var a = swan.getStorageSync("aldstat_uuid");return a || (a = "" + Date.now() + Math.floor(1e7 * Math.random()), swan.setStorageSync("aldstat_uuid", a), t.aldstat_is_first_open = !0), a;
  }function d() {
    swan.request({ url: "https://" + a + ".aldwx.com/config/app.json", header: { AldStat: "MiniApp-Stat" }, method: "GET", success: function (t) {
        if (200 === t.statusCode) for (var a in t.data) swan.setStorageSync(a, t.data[a]);
      } });
  }function i(t, a, e) {
    if (t[a]) {
      var s = t[a];t[a] = function (t) {
        e.call(this, t, a), s.call(this, t);
      };
    } else t[a] = function (t) {
      e.call(this, t, a);
    };
  }function l(t, a, e) {
    if (t[a]) {
      var s = t[a];t[a] = function (t) {
        var n = s.call(this, t);return e.call(this, [t, n], a), n;
      };
    } else t[a] = function (t) {
      e.call(this, t, a);
    };
  }var c = function (t) {
    swan.login({ success: function (a) {
        swan.getUserInfo({ success: function (a) {
            t(a);
          } });
      } });
  },
      u = function (t, e, n) {
    "undefined" == typeof arguments[1] && (e = "GET"), "undefined" == typeof arguments[2] && (n = "d.html");var o = 0,
        r = function () {
      s += 1, t.rq_c = s, swan.request({ url: "https://" + a + ".aldwx.com/" + n, data: t, header: { AldStat: "MiniApp-Stat" }, method: e, success: function () {}, fail: function () {
          2 > o && (o++, t.retryTimes = o, r());
        } });
    };r();
  },
      p = function (a, s, n, o) {
    var r = { ak: e.app_key, uu: _(a), at: a.aldstat_access_token, st: Date.now(), tp: n, ev: s, v: t };o && (r.ct = o), a.aldstat_qr && (r.qr = a.aldstat_qr), u(r, "GET", "d.html");
  },
      f = function (a, s, n, o) {
    "undefined" == typeof a.aldstat_showoption && (a.aldstat_showoption = {});var r = { ak: e.app_key, wsr: a.aldstat_showoption, uu: _(a), at: a.aldstat_access_token, st: Date.now(), tp: n, ev: s, nt: a.aldstat_network_type, pm: a.aldstat_phone_model, pr: a.aldstat_pixel_ratio, ww: a.aldstat_window_width, wh: a.aldstat_window_height, lang: a.aldstat_language, wv: a.aldstat_wechat_version, lat: a.aldstat_lat, lng: a.aldstat_lng, spd: a.aldstat_speed, v: t };o && (r.ct = o), a.aldstat_location_name && (r.ln = a.aldstat_location_name), a.aldstat_src && (r.sr = a.aldstat_src), a.aldstat_qr && (r.qr = a.aldstat_qr), u(r, "GET", "d.html");
  };function h(t) {
    this.app = t;
  }h.prototype.debug = function (t) {
    f(this.app, "debug", 0, t);
  }, h.prototype.warn = function (t) {
    f(this.app, "debug", 1, t);
  }, h.prototype.error = function (t) {
    p(this.app, "debug", 2, t);
  }, h.prototype.sendEvent = function (t, a) {
    if (!t || t.length >= 255) return !1;if (!q(t)) return !1;if ("object" == typeof a) A(a) && f(this.app, "event", t, JSON.stringify(a));else if ("string" == typeof a && a.length <= 255) {
      if (q(a)) {
        var e = String(a),
            s = new Object();s[e] = a, f(this.app, "event", t, a);
      }
    } else f(this.app, "event", t, !1);
  };var g = function () {
    var t = this;t.aldstat_duration += Date.now() - t.aldstat_showtime, m(t, "app", "unLaunch");
  },
      w = function (t, a, e) {
    "undefined" != typeof swan.getShareInfo ? swan.getShareInfo({ shareTicket: a, success: function (a) {
        f(t, "event", "ald_share_" + e, JSON.stringify(a));
      }, fail: function () {
        f(t, "event", "ald_share_" + e, "1");
      } }) : f(t, "event", "ald_share_" + e, "1");
  },
      v = function (t) {
    d(), this.aldstat = new h(this);var a = swan.getStorageSync("aldstat_src");a && (this.aldstat_src = a);var s = _(this);this.aldstat_uuid = s, this.aldstat_timestamp = Date.now(), this.aldstat_showtime = Date.now(), this.aldstat_duration = 0;var n = this;n.aldstat_error_count = 0, n.aldstat_page_count = 1, n.aldstat_first_page = 0, this.aldstat_showoption = "undefined" != typeof t ? t : {};var o = function () {
      swan.getNetworkType({ success: function (t) {
          n.aldstat_network_type = t.networkType;
        }, complete: r });
    },
        r = function () {
      swan.getSystemInfo({ success: function (t) {
          n.aldstat_vsdk_version = "undefined" == typeof t.SDKVersion ? "1.0.0" : t.SDKVersion, n.aldstat_phone_model = t.model, n.aldstat_pixel_ratio = t.pixelRatio, n.aldstat_window_width = t.windowWidth, n.aldstat_window_height = t.windowHeight, n.aldstat_language = t.language, n.aldstat_wechat_version = t.version, n.aldstat_sv = t.system, n.aldstat_wvv = t.platform;
        }, complete: function () {
          e.getLocation && l(), e.getUserinfo && i();
        } });
    },
        i = function () {
      c(function (t) {
        var a = swan.getStorageSync("aldstat_uuid");t.userInfo.uu = a, u(t.userInfo, "GET", "u.html");
      });
    },
        l = function () {
      swan.getLocation({ type: "wgs84", success: function (t) {
          n.aldstat_lat = t.latitude, n.aldstat_lng = t.longitude, n.aldstat_speed = t.speed;
        } });
    };o();var p = swan.getStorageSync("app_session_key_create_launch_upload");p ? p > 0 && "number" == typeof p && (n.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())) : n.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random()), m(n, "app", "launch");
  },
      y = function (t, a) {
    var e = getApp();"undefined" == typeof this.aldstat_error_count ? this.aldstat_error_count = 1 : this.aldstat_error_count++, f(e, "event", "ald_error_message", JSON.stringify(t));
  },
      m = function (a, s, d) {
    var i = swan.getStorageSync("app_" + d + "_upload");if (!(!i && "launch" !== d || 1 > i && "number" == typeof i)) {
      "undefined" == typeof a.aldstat_timestamp && (a.aldstat_timestamp = Date.now()), a.aldstat_duration += Date.now() - a.aldstat_showtime;var l = swan.getSystemInfoSync();a.aldstat_vsdk_version = "undefined" == typeof l.SDKVersion ? "1.0.0" : l.SDKVersion, a.aldstat_phone_model = l.model, a.aldstat_pixel_ratio = l.pixelRatio, a.aldstat_window_width = l.windowWidth, a.aldstat_window_height = l.windowHeight, a.aldstat_language = l.language, a.aldstat_wechat_version = l.version;var c = { ak: e.app_key, waid: e.appid, wst: e.appsecret, uu: _(a), at: a.aldstat_access_token, wsr: a.aldstat_showoption, st: a.aldstat_timestamp, dr: a.aldstat_duration, et: Date.now(), pc: a.aldstat_page_count, fp: a.aldstat_first_page, lp: a.aldstat_last_page, life: d, ec: a.aldstat_error_count, nt: a.aldstat_network_type, pm: a.aldstat_phone_model, wsdk: a.aldstat_vsdk_version, pr: a.aldstat_pixel_ratio, ww: a.aldstat_window_width, wh: a.aldstat_window_height, lang: a.aldstat_language, wv: a.aldstat_wechat_version, lat: a.aldstat_lat, lng: a.aldstat_lng, spd: a.aldstat_speed, v: t, ev: s, sv: a.aldstat_sv, wvv: a.aldstat_wvv };"launch" === d ? n += 1 : "show" === d ? o += 1 : r += 1, c.la_c = n, c.as_c = o, c.ah_c = r, a.page_share_count && "number" == typeof a.page_share_count && (c.sc = a.page_share_count), a.aldstat_is_first_open && (c.ifo = "true"), a.aldstat_location_name && (c.ln = a.aldstat_location_name), a.aldstat_src && (c.sr = a.aldstat_src), a.aldstat_qr && (c.qr = a.aldstat_qr), a.ald_share_src && (c.usr = a.ald_share_src), u(c, "GET", "d.html");
    }
  },
      S = function (t) {
    this.aldstat_showtime = Date.now(), this.aldstat_showoption = "undefined" != typeof t ? t : {};var a = swan.getStorageSync("app_session_key_create_show_upload");a && a > 0 && "number" == typeof a && (this.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())), this.aldstat_duration += Date.now() - this.aldstat_showtime, m(this, "app", "show"), "undefined" != typeof t && ("undefined" != typeof t.shareTicket ? w(this, t.shareTicket, "click") : "undefined" != typeof t.query && "undefined" != typeof t.query.ald_share_src && w(this, "0", "click"));
  },
      x = function (t, a) {
    var e = this;e.aldstat_is_first_open && (e.aldstat_is_first_open = !1), e.aldstat_duration += Date.now() - e.aldstat_showtime, m(e, "app", "hide");
  },
      k = App;App = function (t) {
    i(t, "onLaunch", v), i(t, "onUnlaunch", g), i(t, "onShow", S), i(t, "onHide", x), i(t, "onError", y), k(t);
  };function D(t) {
    for (var a in t) return !1;return !0;
  }function q(t) {
    if (!t && "string" == typeof t) return !1;var a = t.replace(/\s+/g, "_");return (/^(?!_)(?!.*?_$)[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(a) ? !0 : !1
    );
  }function A(t) {
    for (var a in t) {
      if ("object" == typeof t[a]) return !1;if ("string" === a) return q(a);if ("string" == typeof t[a]) return q(t[a]);
    }return !0;
  }var T = function (t, a) {
    var e = getApp();I(e, this, "hide");
  },
      b = function (t, a) {
    var e = getApp();I(e, this, "unload");
  },
      M = function (t, a) {
    var e = swan.getStorageSync("aldstat_src");"undefined" != typeof swan.showShareMenu;var s = getApp();if (e && (s.aldstat_src = e), !D(t)) {
      "undefined" != typeof t.aldsrc && (e ? s.aldstat_qr = t.aldsrc : (swan.setStorageSync("aldstat_src", t.aldsrc), s.aldstat_src = t.aldsrc, s.aldstat_qr = t.aldsrc));var n = swan.getStorageSync("aldstat_uuid");"undefined" != typeof t.ald_share_src && (s.ald_share_src = t.ald_share_src), this.aldstat_page_args = JSON.stringify(t);
    }I(s, this, "load");
  },
      I = function (a, s, n) {
    var o = swan.getStorageSync("page_" + n + "_upload");if (!(!o && "show" !== n || 1 > o && "number" == typeof o)) {
      s.aldstat_start_time = Date.now(), s.aldstat_error_count = 0, a.aldstat_page_count ? a.aldstat_page_count++ : a.aldstat_page_count = 1, a.aldstat_first_page || (a.aldstat_first_page = s.route, s.aldstat_is_first_page = !0), a.aldstat_last_page = s.route;var r = { uu: _(a), at: a.aldstat_access_token, wsr: a.aldstat_showoption, ak: e.app_key, ev: "page", st: s.aldstat_start_time, dr: Date.now() - s.aldstat_start_time, pp: s.route, life: n, sc: s.page_share_count, ec: s.aldstat_error_count, nt: a.aldstat_network_type, pm: a.aldstat_phone_model, pr: a.aldstat_pixel_ratio, ww: a.aldstat_window_width, wh: a.aldstat_window_height, lang: a.aldstat_language, wv: a.aldstat_wechat_version, lat: a.aldstat_lat, lng: a.aldstat_lng, spd: a.aldstat_speed, v: t, wsdk: a.aldstat_vsdk_version, sv: a.aldstat_sv, wvv: a.aldstat_wvv };s.aldstat_is_first_page && (r.ifp = "true"), a.aldstat_page_last_page && (r.lp = a.aldstat_page_last_page), a.aldstat_location_name && (r.ln = a.aldstat_location_name), s.aldstat_page_args && (r.ag = s.aldstat_page_args), a.aldstat_src && (r.sr = a.aldstat_src), a.aldstat_qr && (r.qr = a.aldstat_qr), a.ald_share_src && (r.usr = a.ald_share_src), a.aldstat_page_last_page = s.route, u(r, "GET", "d.html");
    }
  },
      E = function (t, a) {
    var e = getApp();I(e, this, "show");
  },
      O = function (t, a) {
    var e = getApp();f(e, "event", "ald_pulldownrefresh", 1);
  },
      G = function (t, a) {
    var e = getApp();f(e, "event", "ald_reachbottom", 1);
  },
      j = Page,
      N = function (t, a) {
    var s = this,
        n = getApp();if (console.log(t[1]), "undefined" != typeof t && "undefined" != typeof t[1]) {
      var o = swan.getStorageSync("aldstat_uuid"),
          r = swan.getStorageSync(o),
          _ = "";if ("undefined" !== n.ald_share_src && n.ald_share_src) {
        _ = n.ald_share_src;var d = _.split(",");d.length >= 3 && (d.shift(), _ = d.toString()), "" !== _ && (_ = _ + "," + o);
      } else _ = swan.getStorageSync("aldstat_uuid");t[1].path && "undefined" !== t[1].path || (t[1].path = e.defaultPath ? e.defaultPath : s.route), t[1].path += -1 != t[1].path.indexOf("?") ? "&ald_share_src=" + _ : "?ald_share_src=" + _, f(n, "event", "ald_share_chain", { path: n.aldstat_last_page, chain: _ }), "" === r || "undefined" == typeof r ? (swan.setStorageSync(o, 1), r = 1, n.page_share_count = r) : (r = parseInt(swan.getStorageSync(o)) + 1, n.page_share_count = r, swan.setStorageSync(o, r)), ("undefined" == typeof e.getShareUserInfo || e.getShareUserInfo === !0) && c(function (t) {
        var a = swan.getStorageSync("aldstat_uuid");t.userInfo.uu = a, u(t.userInfo, "GET", "u.html");
      });var i = t[1];"undefined" == typeof t[1].success && (t[1].success = function (t) {}), "undefined" == typeof t[1].fail && (t[1].fail = function (t) {});var l = t[1].fail,
          p = t[1].success;return t[1].success = function (t) {
        var a = new Array();if ("object" == typeof t.shareTickets) for (var e = 0; e < t.shareTickets.length; e++) w(n, t.shareTickets[e], "user");f(n, "event", "ald_share_status", JSON.stringify(t)), p(t);
      }, t[1].fail = function (t) {
        f(n, "event", "ald_share_status", "fail"), l(t);
      }, t[1];
    }
  },
      U = function (t) {
    var a = new Object();if (-1 != t.indexOf("?")) for (var e = t.split("?")[1], s = e.split("&"), n = 0; n < s.length; n++) a[s[n].split("=")[0]] = unescape(s[n].split("=")[1]);else a = t;return a;
  };Page = function (t) {
    i(t, "onLoad", M), i(t, "onUnload", b), i(t, "onShow", E), i(t, "onHide", T), i(t, "onReachBottom", G), i(t, "onPullDownRefresh", O), "undefined" != typeof t.onShareAppMessage && l(t, "onShareAppMessage", N), j(t);
  };
}();