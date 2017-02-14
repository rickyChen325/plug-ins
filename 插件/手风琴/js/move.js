/*
 	完美动画函数：
 		obj:要运动的节点对象
 		json:{属性：目标值，属性：目标值....}  (透明度使用属性：opacity:100) 透明度的值是0-100；  里面的opacity 和  filter会自动做转换。
 		fn：回调函数，在运动执行完毕后执行。
*/
function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;//这一次运动都结束了——>所有的值都到了
		for(var attr in json) {
			// 取当前值
			var iCur = 0;
			if(attr=="opacity") {
				iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			// 计算速度
			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);

			// 检测停止
			if(iCur!=json[attr]) {//每隔30ms都会赋值为true，都会检测停止
				bStop = false;
			} 

			if(attr=="opacity") {
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")"
				obj.style.opacity = (iCur + iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
		if(bStop) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30)
}

function getStyle(obj, name) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name]
	}
}