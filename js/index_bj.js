function setBackground(h) {
  var imgUrl;

  switch (true) {
    case h >= 0 && h < 6:
    case h >= 19 && h <= 24:
      imgUrl = "https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/site-backgound.jpg";
      break;
    case h >= 6 && h < 7:
    case h >= 18 && h < 19:
      imgUrl = "https://bu.dusays.com/2022/09/16/6323d377528a3.jpg";
      break;
    case h >= 7 && h < 18:
      imgUrl = "https://bu.dusays.com/2022/09/16/63242685d8c4d.jpg";
      break;
  }

  document.getElementById("page-header").style.backgroundImage = `url()`;
}

var nowTime = new Date();
var h = nowTime.getHours();
setBackground(h);
