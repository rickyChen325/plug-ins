window.onload = function() {
	var oBox = $('box');
	var oBigImgBox = getByClass(oBox, 'big-img-box')[0];
	var oBigImg = getByClass(oBox, 'big-img')[0];
	var oMiddleImgBox = getByClass(oBox, 'middle-img-box')[0];
	var oMiddleImg = getByClass(oBox, 'middle-img')[0];
	var oImageZoom = getByClass(oBox, 'image-zoom')[0];
	var oSmallImgBox = getByClass(oBox, 'small-img-box')[0];
	var aSmallImg = oSmallImgBox.getElementsByTagName("img");
	var oMiddleImgBoxPos = position(oMiddleImgBox);

	//给图片循环添加over事件
	for (var i = 0; i < aSmallImg.length; i++) {
		aSmallImg[i].onmouseover = function() {
			//先去掉所有图片的className
			for (var i = 0; i < aSmallImg.length; i++) {
				aSmallImg[i].className = '';
			}
			//给当前的图片添加className
			this.className = 'active';

			//改变中图片的src
			oMiddleImg.src = this.src;

			//改变大图片的src
			oBigImg.src = this.src;
		}
	}

	//给middle-img-box添加over事件
	oMiddleImgBox.onmouseover = function() {
		oBigImgBox.style.display = "block";
		oImageZoom.style.display = "block";
	}

	//给middle-img-box添加out事件
	oMiddleImgBox.onmouseout = function() {
		oBigImgBox.style.display = "none";
		oImageZoom.style.display = "none";
	}

	//给middle-img-box添加move事件
	oMiddleImgBox.onmousemove = function(evt) {
			var e = evt || window.event;
			var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
			// ie显示有问题
			// oBigImgBox.style.display = "block";
			// oImageZoom.style.display = "block";
			var iLeft = iScrollLeft + e.clientX - oMiddleImgBoxPos.left - oImageZoom.offsetWidth / 2;
			var iTop = iScrollTop + e.clientY - oMiddleImgBoxPos.top - oImageZoom.offsetHeight / 2;
			var iLeftMax = oMiddleImgBox.offsetWidth - oImageZoom.offsetWidth;
			var iTopMax = oMiddleImgBox.offsetHeight - oImageZoom.offsetHeight;

			//判断左右方向
			if (iLeft < 0) {
				iLeft = 0;
			} else if (iLeft > iLeftMax) {
				iLeft = iLeftMax;
			}

			//判断上下方向
			if (iTop < 0) {
				iTop = 0;
			} else if (iTop > iTopMax) {
				iTop = iTopMax;
			}

			oImageZoom.style.left = iLeft + "px";
			oImageZoom.style.top = iTop + "px";

			//设置大图的left和top值
			oBigImg.style.left = -iLeft / iLeftMax * (oBigImg.offsetWidth - oBigImgBox.offsetWidth) + 'px';
			oBigImg.style.top = -iTop / iTopMax * (oBigImg.offsetHeight - oBigImgBox.offsetHeight) + 'px';
		}
		// document.onmousedown = function(evt){
		// 	var e = evt || window.event;
		// 	evt?e.stopPropagation():e.cancelBubble=true;
		// 	evt?e.preventDefault():e.returnValue=false;
		// 	return false;
		// }


}

function $(id) {
	return document.getElementById(id);
}

// function getByClass(oParent, sClass) {
// 	var aEle = oParent.getElementsByTagName("*");
// 	var aResult = [];
// 	for (var i = 0; i < aEle.length; i++) {
// 		if (aEle[i].className.indexOf(sClass) != -1) {
// 			aResult.push(aEle[i]);
// 		}
// 	}
// 	return aResult;
// }

function getByClass(oParent, sClass) {
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b' + sClass + '\\b');
	var i = 0;
	for (i = 0; i < aEle.length; i++) {
		//if(aEle[i].className==sClass)
		//if(aEle[i].className.search(sClass)!=-1)
		if (re.test(aEle[i].className)) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}


// 相对文档根节点的left和top

function position(obj) {
	var oPos = {left: 0, top: 0};
	while (obj) {
		// oPos.left += obj.offsetLeft;
		// oPos.top += obj.offsetTop;
		oPos.left += obj.offsetLeft + parseInt(getStyle(obj, "borderLeftWidth")); //还有border
		oPos.top += obj.offsetTop + parseInt(getStyle(obj, "borderTopWidth"));
		obj = obj.offsetParent;
	}
	return oPos;
}

function getStyle(obj, name) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj)[name];
	} else {
		return obj.currentStyle[name];
	}
}