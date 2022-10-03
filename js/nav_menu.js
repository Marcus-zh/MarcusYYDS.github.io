// 返回顶部 显示网页阅读进度
window.onscroll = percent;// 执行函数
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round(a / b * 100), // 计算百分比
        btn = document.querySelector("#percent"); // 获取图标

        result<=99||(result=99),btn.innerHTML=result
}

document.getElementById("page-name").innerText=document.title.split(" | Marcus")[0];
// function percent() {
//     var e = document.documentElement.scrollTop || window.pageYOffset,
//       t =
//         Math.max(
//           document.body.scrollHeight,
//           document.documentElement.scrollHeight,
//           document.body.offsetHeight,
//           document.documentElement.offsetHeight,
//           document.body.clientHeight,
//           document.documentElement.clientHeight
//         ) - document.documentElement.clientHeight,
//       n = Math.round((e / t) * 100),
//       o = document.querySelector("#percent"),
//       d = window.scrollY + document.documentElement.clientHeight,
//       c =
//         document.getElementById("post-comment") ||
//         document.getElementById("footer");
//     c.offsetTop + c.offsetHeight / 2 < d || 90 < n
//       ? (document.querySelector("#nav-totop").classList.add("long"),
//         (o.innerHTML = "返回顶部"))
//       : (document.querySelector("#nav-totop").classList.remove("long"),
//         (o.innerHTML = n));
//   }
//   document.getElementById("post-comment") && owoBig(),
//     (window.onscroll = percent),
//     (document.getElementById("page-name").innerText =
//       document.title.split(" | Marcus")[0]),
//     (window.onkeydown = function (e) {
//       123 === e.keyCode &&
//         btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3);
//     });