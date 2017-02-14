function $(id) {
	return document.getElementById(id);
}

window.onload = function() {
	var userName = $("userName");
	var pwd = $("pwd");
	var pwd2 = $("pwd2"); 
	var email = $("email");
	var mobile = $("mobile");
	var ck = $("ck");
	var btn = $("btn");
	var regs = {
		userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/
	}


	userName.onfocus = userName.onblur = userName.onkeyup = function(evt) {
		var e = evt || window.event;
		checkUserName(e);
	};
	function checkUserName(_e) {
		var type;
		if(_e) {
			type = _e.type;
		}
		var value = userName.value;
		var box = userName.parentNode;
		var tip = box.nextElementSibling;
		var span = tip.lastElementChild;
		// 1、获得焦点，内容为空，tip默认提示
		if(type=="focus") {
			if(value=="") {
				box.className = "box";
				tip.className = "tip default";
				span.innerHTML = "支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
				return false;
			}
		}
		if(type=="blur") {
			if(value=="") {
				box.className = "box";
				tip.className = "tip hide";
				return false;
			}
		}
		if(value=="") {
        	box.className = "box error";
        	tip.className = "tip error";
        	span.innerHTML = "用户名不能为空";
        	return false;
        } else if(regs.userNameReg.test(value)) {
        	box.className = "box right";
        	tip.className = "tip hide";
        	return true;
        } else {
        	box.className = "box error";
        	tip.className = "tip error";
        	span.innerHTML = "格式错误，仅支持汉字、字母、数字、“-”“_”的组合";
        	return false;
        }
	}
}