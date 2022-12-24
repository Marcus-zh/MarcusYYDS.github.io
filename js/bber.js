"use strict";


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