"use strict";

function owoBig() {
    var t = 1,
        n = "",
        i = document.createElement("div"),
        c = (i.id = "owo-big", document.querySelector("body"));
    c.appendChild(i), document.getElementById("post-comment").addEventListener("DOMNodeInserted", function(e) {
        e.target.classList && (e.target.classList.value, 1) && ((e = e.target).addEventListener("contextmenu", function(e) {
            return e.preventDefault()
        }), e.addEventListener("mouseover", function(a) {
            "IMG" == a.target.tagName && t && (t = 0, n = setTimeout(function() {
                var e = 3 * a.path[0].clientHeight,
                    t = 3 * a.path[0].clientWidth,
                    n = a.x - a.offsetX - (t - a.path[0].clientWidth) / 2,
                    o = (n + t > c.clientWidth && (n -= n + t - c.clientWidth + 10), n < 0 && (n = 10), a.y - a.offsetY);
                i.style.height = e + "px", i.style.width = t + "px", i.style.left = n + "px", i.style.top = o + "px", i.style.display = "flex", i.innerHTML = '<img src="'.concat(a.target.src, '">')
            }, 300))
        }), e.addEventListener("mouseout", function(e) {
            i.style.display = "none", t = 1, clearTimeout(n)
        }))
    })
}

function percent() {
    var e = document.documentElement.scrollTop || window.pageYOffset,
        t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
        e = Math.round(e / t * 100),
        t = document.querySelector("#percent"),
        n = (e <= 99 || (e = 99), window.scrollY + document.documentElement.clientHeight),
        o = document.getElementById("post-comment") || document.getElementById("footer");
    o.offsetTop + o.offsetHeight / 2 < n || 90 < e ? (document.querySelector("#nav-totop").classList.add("long"), t.innerHTML = "返回顶部") : (document.querySelector("#nav-totop").classList.remove("long"), t.innerHTML = e)
}

function totraveling() {
    btf.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性", !1, 5e3), setTimeout(function() {
        window.open("https://travellings.link/")
    }, "5000")
}
document.getElementById("post-comment") && owoBig(), window.onscroll = btf.throttle(percent, 10), document.getElementById("page-name").innerText = document.title.split(" | 安知鱼")[0], window.onkeydown = function(e) {
    123 === e.keyCode && btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1)
};
var anzhiyu = {
    showLoading: function() {
        document.querySelector("#loading-box").classList.remove("loaded")
    },
    hideLoading: function() {
        document.querySelector("#loading-box").classList.add("loaded")
    },
    switchCommentBarrage: function() {
        document.querySelector(".comment-barrage") && ($(".comment-barrage").is(":visible") ? ($(".comment-barrage").hide(), $(".menu-commentBarrage-text").text("显示热评"), btf.snackbarShow("✨ 已关闭评论弹幕"), localStorage.setItem("commentBarrageSwitch", "false")) : $(".comment-barrage").is(":hidden") && ($(".comment-barrage").show(), $(".menu-commentBarrage-text").text("关闭热评"), btf.snackbarShow("✨ 已开启评论弹幕"), localStorage.removeItem("commentBarrageSwitch")))
    },
    initIndexEssay: function() {
        var e = new Swiper(".essay_bar_swiper_container", {
                passiveListeners: !0,
                direction: "vertical",
                loop: !0,
                autoplay: {
                    disableOnInteraction: !0,
                    delay: 3e3
                },
                mousewheel: !0
            }),
            t = document.getElementById("bbtalk");
        null !== t && (t.onmouseenter = function() {
            e.autoplay.stop()
        }, t.onmouseleave = function() {
            e.autoplay.start()
        })
    },
    diffDate: function(e, t) {
        var n, o, t = 1 < arguments.length && void 0 !== t && t,
            a = new Date,
            e = new Date(e),
            a = a.getTime() - e.getTime();
        return t ? (t = a / 864e5, n = a / 36e5, o = a / 6e4, 12 < a / 2592e6 ? e.toLocaleDateString() : 7 <= t ? e.toLocaleDateString().substr(5) : 1 <= t ? parseInt(t) + "" + GLOBAL_CONFIG.date_suffix.day : 1 <= n || 1 <= o ? "最近" : GLOBAL_CONFIG.date_suffix.just) : parseInt(a / 864e5)
    },
    changeTimeInEssay: function() {
        document.querySelector("#bber") && document.querySelectorAll("#bber time").forEach(function(e) {
            var t = e.getAttribute("datetime");
            e.innerText = anzhiyu.diffDate(t, !0), e.style.display = "inline"
        })
    },
    reflashEssayWaterFall: function() {
        document.querySelector("#waterfall") && setTimeout(function() {
            waterfall("#waterfall"), document.getElementById("waterfall").classList.add("show")
        }, 500)
    },
    commentText: function(e) {
        var t = document.getElementsByClassName("el-textarea__inner")[0],
            n = document.createEvent("HTMLEvents"),
            e = (n.initEvent("input", !0, !0), replaceAll(e, "\n", "\n> ")),
            e = (t.value = "> " + e + "\n\n", t.dispatchEvent(n), document.querySelector("#post-comment").offsetTop);
        window.scrollTo(0, e - 80), t.focus(), t.setSelectionRange(-1, -1), document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show")
    }
};

function replaceAll(e, t, n) {
    return e.split(t).join(n)
}
document.addEventListener("pjax:send", function() {
    anzhiyu.showLoading
}), document.addEventListener("pjax:complete", function() {
    anzhiyu.hideLoading(), anzhiyu.initIndexEssay(), anzhiyu.changeTimeInEssay(), anzhiyu.reflashEssayWaterFall(), initCommentBarrage()
}), anzhiyu.initIndexEssay(), anzhiyu.changeTimeInEssay(), anzhiyu.reflashEssayWaterFall();