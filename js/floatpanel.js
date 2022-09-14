// 新增的内容
var arr = document.getElementsByClassName('element-class');
//把element-class替换成你想要添加特效的元素的类名
for(var i = 0;i<arr.length;i++){
    arr[i].classList.add('wowpanels');
  }
// 原来的内容
var ANGLE = 45; //控制浮动角度，数值越大，浮动幅度越大。
var panel= document.getElementsByClassName('wowpanels');
for(var i = 0;i<panel.length;i++){
  floatable(panel[i]);
  }
function floatable (content) {
  content.addEventListener('mouseout', e => {
    content.style.transform = `perspective(300px)
                   rotateX(0deg)
                   rotateY(0deg)
                   rotateZ(0deg)`;
  });
  content.addEventListener('mousemove', e => {
    var w = content.clientWidth;
    var h = content.clientHeight;
    var y = (e.offsetX - w * 0.5) / w * ANGLE;
    var x = (1 - (e.offsetY - h * 0.5)) / h * ANGLE;

    content.style.transform = `perspective(300px)
                   rotateX(${x}deg)
                   rotateY(${y}deg)`;
  });
}
var ANGLE = 45; //控制浮动角度，数值越大，浮动幅度越大。

var panel= document.getElementsByClassName('wowpanels');
for(var i = 0;i<panel.length;i++){
	floatable(panel[i]);
  }
function floatable (content) {
	content.addEventListener('mouseout', e => {
		content.style.transform = `perspective(300px)
								   rotateX(0deg)
								   rotateY(0deg)
								   rotateZ(0deg)`;
	});
	content.addEventListener('mousemove', e => {
		var w = content.clientWidth;
		var h = content.clientHeight;
		var y = (e.offsetX - w * 0.5) / w * ANGLE;
		var x = (1 - (e.offsetY - h * 0.5)) / h * ANGLE;

		content.style.transform = `perspective(300px)
								   rotateX(${x}deg)
								   rotateY(${y}deg)`;
	});
}