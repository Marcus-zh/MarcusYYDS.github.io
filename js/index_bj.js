// var now = new Date();
// var hour = now.getHours();
// var header = document.getElementsByTagName("header")[0];
// if (hour >= 6 && hour < 7){
//     header.style.backgroundImage = url(https://bu.dusays.com/2022/09/16/6323d377528a3.jpg)
// }
// if (hour >= 7 && hour < 18){
//     header.style.backgroundImage = url(https://bu.dusays.com/2022/09/16/63242685d8c4d.jpg)
//     currentTimeHtml = "<header class="full_page nav-fixed is-top-bar" id="page-header" style="background-image: url('https://bu.dusays.com/2022/09/16/63242685d8c4d.jpg')"
// }
// if (hour >= 18 && hour < 19){
// document.write("<header class="full_page nav-fixed is-top-bar" id="page-header" style="background-image: url('ttps://bu.dusays.com/2022/09/16/6323d377528a3.jpg')"");
// }
// if (hour >= 19 && hour <7){
// document.write("<header class="full_page nav-fixed is-top-bar" id="page-header" style="background-image: url('https://bu.dusays.com/2022/09/16/63242685d8c4d.jpg')"");
// }

// setInterval(() => {
//     let create_time = Math.round(new Date('2022-08-09 00:00:00').getTime() / 1000); //在此行修改建站时间
//     let timestamp = Math.round((new Date().getTime()) / 1000);
//     let second = timestamp - create_time;
//     let time = new Array(0, 0, 0, 0, 0);
  
//     var nol = function(h){
//       return h>9?h:'0'+h;
//     }
//     if (second >= 365 * 24 * 3600) {
//       time[0] = parseInt(second / (365 * 24 * 3600));
//       second %= 365 * 24 * 3600;
//     }
//     if (second >= 24 * 3600) {
//       time[1] = parseInt(second / (24 * 3600));
//       second %= 24 * 3600;
//     }
//     if (second >= 3600) {
//       time[2] = nol(parseInt(second / 3600));
//       second %= 3600;
//     }
//     if (second >= 60) {
//       time[3] = nol(parseInt(second / 60));
//       second %= 60;
//     }
//     if (second > 0) {
//       time[4] = nol(second);
//     }
//     if ((Number(time[2])<18) && (Number(time[2])>8)){
//         header.style.backgroundImage = url('https://bu.dusays.com/2022/09/16/63242685d8c4d.jpg');
//     }
//     else{
//       currentTimeHtml ="<img class='boardsign' src='https://img.shields.io/badge/Marcus的小窝-放学了-6adea8?style=social&logo=Minetest' title='耶,放学啦!~'><div id='runtime'>" + time[0] + ' YEAR ' + time[1] + ' DAYS ' + time[2] + ' : ' + time[3] + ' : ' + time[4] + '</div>';
//     }
//     document.getElementById("workboard").innerHTML = currentTimeHtml;
//   }, 1000);

var nowTime = new Date();
var h = nowTime.getHours();

function morning(){
    document.getElementById('page-header').style.backgroundImage="url(https://bu.dusays.com/2022/09/16/63242685d8c4d.jpg)"
}
function afternoon(){
    document.getElementById('page-header').style.backgroundImage="url(https://bu.dusays.com/2022/09/16/6323d377528a3.jpg)"
}
function night(){
    document.getElementById('page-header').style.backgroundImage="url(https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/site-backgound.jpg)"
}


if (h >= 6 && h < 7){
    afternoon();
}
if (h >= 7 && h < 18){
    morning();
}
if (h >= 18 && h < 19){
    afternoon();
}
if (h >= 20 && h < 6){
    night();
}
