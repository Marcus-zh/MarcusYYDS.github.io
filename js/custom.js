"use strict";
function owoBig() {
  var t = 1,
    n = "",
    i = document.createElement("div"),
    c = ((i.id = "owo-big"), document.querySelector("body"));
  c.appendChild(i),
    document
      .getElementById("post-comment")
      .addEventListener("DOMNodeInserted", function (e) {
        e.target.classList &&
          "OwO-body" == e.target.classList.value &&
          ((e = e.target).addEventListener("contextmenu", function (e) {
            return e.preventDefault();
          }),
          e.addEventListener("mouseover", function (a) {
            "IMG" == a.target.tagName &&
              t &&
              ((t = 0),
              (n = setTimeout(function () {
                var e = 3 * a.path[0].clientHeight,
                  t = 3 * a.path[0].clientWidth,
                  n = a.x - a.offsetX - (t - a.path[0].clientWidth) / 2,
                  o =
                    (n + t > c.clientWidth && (n -= n + t - c.clientWidth + 10),
                    n < 0 && (n = 10),
                    a.y - a.offsetY);
                (i.style.height = e + "px"),
                  (i.style.width = t + "px"),
                  (i.style.left = n + "px"),
                  (i.style.top = o + "px"),
                  (i.style.display = "flex"),
                  (i.innerHTML = '<img src="'.concat(a.target.src, '">'));
              }, 300)));
          }),
          e.addEventListener("mouseout", function (e) {
            (i.style.display = "none"), (t = 1), clearTimeout(n);
          }));
      });
}
document.getElementById("post-comment") && owoBig(),
  (window.onscroll = btf.throttle(percent, 50));
var percentFlag = !1;
function percent() {
  var e = document.documentElement.scrollTop || window.pageYOffset,
    t =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight,
    t = Math.round((e / t) * 100),
    n = document.querySelector("#percent"),
    e = e % document.documentElement.clientHeight,
    e =
      (t <= 99 || (t = 99),
      !percentFlag &&
      100 + e >= document.documentElement.clientHeight &&
      document.querySelector("#waterfall")
        ? (console.info(e, document.documentElement.clientHeight),
          setTimeout(function () {
            waterfall("#waterfall");
          }, 500))
        : setTimeout(function () {
            document.querySelector("#waterfall") && waterfall("#waterfall");
          }, 500),
      window.scrollY + document.documentElement.clientHeight),
    o =
      document.getElementById("post-comment") ||
      document.getElementById("footer");
  o.offsetTop + o.offsetHeight / 2 < e || 90 < t
    ? (document.querySelector("#nav-totop").classList.add("long"),
      (n.innerHTML = "返回顶部"),
      (percentFlag = !0))
    : (document.querySelector("#nav-totop").classList.remove("long"),
      (n.innerHTML = t));
}
function ScrollBarElongation() {
  var e = document.documentElement.scrollTop || window.pageYOffset,
    t =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight,
    n = e / t,
    o = document.querySelector(".as-indicator");
  0.1 <= n;
}
function totraveling() {
  btf.snackbarShow(
    "即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",
    !1,
    5e3
  ),
    setTimeout(function () {
      window.open("https://travellings.link/");
    }, "5000");
}
function replaceAll(e, t, n) {
  return e.split(t).join(n);
}
/Mobi|Android|iPhone/i.test(navigator.userAgent) ||
  document.addEventListener("scroll", ScrollBarElongation),
  (window.onkeydown = function (e) {
    123 === e.keyCode &&
      btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1);
  });
var marcus = {
    showLoading: function () {
      document.querySelector("#loading-box").classList.remove("loaded");
    },
    hideLoading: function () {
      document.querySelector("#loading-box").classList.add("loaded");
    },
    switchCommentBarrage: function () {
      document.querySelector(".comment-barrage") &&
        ($(".comment-barrage").is(":visible")
          ? ($(".comment-barrage").hide(),
            $(".menu-commentBarrage-text").text("显示热评"),
            btf.snackbarShow("✨ 已关闭评论弹幕"),
            localStorage.setItem("commentBarrageSwitch", "false"))
          : $(".comment-barrage").is(":hidden") &&
            ($(".comment-barrage").show(),
            $(".menu-commentBarrage-text").text("关闭热评"),
            btf.snackbarShow("✨ 已开启评论弹幕"),
            localStorage.removeItem("commentBarrageSwitch")));
    },
    initIndexEssay: function () {
      setTimeout(function () {
        var e = new Swiper(".essay_bar_swiper_container", {
            passiveListeners: !0,
            direction: "vertical",
            loop: !0,
            autoplay: { disableOnInteraction: !0, delay: 3e3 },
            mousewheel: !0,
          }),
          t = document.getElementById("bbtalk");
        null !== t &&
          ((t.onmouseenter = function () {
            e.autoplay.stop();
          }),
          (t.onmouseleave = function () {
            e.autoplay.start();
          }));
      }, 100);
    },
    diffDate: function (e) {
      var t,
        n,
        o = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        a = new Date(),
        e = new Date(e),
        a = a.getTime() - e.getTime(),
        i = 864e5;
      return o
        ? ((o = a / i),
          (t = a / 36e5),
          (n = a / 6e4),
          1 <= a / 2592e6
            ? e.toLocaleDateString().replace(/\//g, "-")
            : 1 <= o
            ? parseInt(o) + " " + GLOBAL_CONFIG.date_suffix.day
            : 1 <= t
            ? parseInt(t) + " " + GLOBAL_CONFIG.date_suffix.hour
            : 1 <= n
            ? parseInt(n) + " " + GLOBAL_CONFIG.date_suffix.min
            : GLOBAL_CONFIG.date_suffix.just)
        : parseInt(a / i);
    },
    changeTimeInEssay: function () {
      document.querySelector("#bber") &&
        document.querySelectorAll("#bber time").forEach(function (e) {
          var t = e.getAttribute("datetime");
          (e.innerText = marcus.diffDate(t, !0)), (e.style.display = "inline");
        });
    },
    changeTimeInAlbumDetail: function () {
      document.querySelector("#album_detail") &&
        document.querySelectorAll("#album_detail time").forEach(function (e) {
          var t = e.getAttribute("datetime");
          (e.innerText = marcus.diffDate(t, !0)), (e.style.display = "inline");
        });
    },
    reflashEssayWaterFall: function () {
      document.querySelector("#waterfall") &&
        setTimeout(function () {
          waterfall("#waterfall"),
            document.getElementById("waterfall").classList.add("show");
        }, 500);
    },
    commentText: function (e) {
      ("undefined" != e && "null" != e) || (e = "好棒！");
      var t = document.getElementsByClassName("el-textarea__inner")[0],
        n = document.createEvent("HTMLEvents");
      t &&
        (n.initEvent("input", !0, !0),
        (e = replaceAll(e, "\n", "\n> ")),
        (t.value = "> " + e + "\n\n"),
        t.dispatchEvent(n),
        (e = document.querySelector("#post-comment").offsetTop),
        window.scrollTo(0, e - 80),
        t.focus(),
        t.setSelectionRange(-1, -1),
        document.getElementById("comment-tips") &&
          document.getElementById("comment-tips").classList.add("show"));
    },
    sayhi: function () {
      console.log(1),
        document.querySelector("#author-info__sayhi") &&
          (document.getElementById("author-info__sayhi").innerHTML =
            getTimeState() + "！我是");
    },
  },
  getTimeState = function () {
    var e = new Date().getHours(),
      t = "";
    return (
      0 <= e && e <= 5
        ? (t = "晚安😴")
        : 5 < e && e <= 10
        ? (t = "早上好👋")
        : 10 < e && e <= 14
        ? (t = "中午好👋")
        : 14 < e && e <= 18
        ? (t = "下午好👋")
        : 18 < e && e <= 24 && (t = "晚上好👋"),
      t
    );
  };
document.addEventListener("pjax:send", function () {
  marcus.showLoading;
}),
  (document.getElementById("page-name").innerText =
    document.title.split(" | Marcus")[0]),
// var mySwiper = new Swiper('#stickyList', {
//       direction: 'horizontal',
//       speed: 600,
//       loop: true,
//       effect : 'fade',
//       loopPreventsSlide: false,
//       autoplay: {
//         delay: 20000,
//       },
//       mousewheel: false,
//       pagination: {
//           el: ".swiper-pagination",
//           dynamicBullets: true,
//       },
//     })
  marcus.initIndexEssay(),
  marcus.changeTimeInEssay(),
  marcus.changeTimeInAlbumDetail(),
  marcus.reflashEssayWaterFall(),
  marcus.sayhi();
