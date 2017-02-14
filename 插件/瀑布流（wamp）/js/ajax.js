function urlParamsHandler(o) {
	var arr = [];
	for(var key in o) {
		arr.push(encodeURIComponent(key)+"="+encodeURIComponent(o[key]));
	}
	return arr.join("&");
}
//ajax的封装
function ajax(o) {//method url isAsync data headerData success error
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(!o.method) {
		o.method = "get";
	}
	if(!((typeof o.isAsync) == "boolean")) {
		o.isAsync = true;
	}
	if(o.method.toLowerCase() == "get") {
		if(o.data) {
			o.url = o.url+"?t="+new Date().getTime()+"&"+urlParamsHandler(o.data);
		} else {
			o.url = o.url+"?t="+new Date().getTime()
		}
		xhr.open("get", o.url, o.isAsync);
		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key, o.headerData[key]);
			}
		}
		xhr.send()
	} else {
		xhr.open("post", o.url, o.isAsync);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key, o.headerData[key]);
			}
		}
		xhr.send(urlParamsHandler(o.data));
	}

	if(o.isAsync) {
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					if(o.success) {
						o.success(xhr.responseText);
					}
				} else {
					if(o.error) {
						o.error(xhr.responseText);
					}
				}
			}
		}
	} else {
		if(xhr.status==200) {
			if(o.success) {
				o.success(xhr.responseText);
			}
		} else {
			if(o.error) {
				o.error(xhr.responseText);
			}
		}
	}
	
}