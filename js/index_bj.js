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

if (h >= 0 && h < 6){
    night();
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
if (h >= 19 && h <= 24){
    night();
}
