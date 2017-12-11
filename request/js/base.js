var vue = null;

$(function(){
	$(".param-list").hide();
	$(".url-txt").val(getCookie("url"));
	$(".form-txt").val(decodeURI(getCookie("form")));


	$(".fetch-btn").click(function(){
		fetchPostData();
	});

	$(".btn-list .btn").click(function(){
		$(".result-txt").val("");
		var url = $(".url-txt").val();
		setCookie("url", url);
		
		if(!vue){
			alert("没有提交参数");
			return;
		}
		var param = {};
		var $key = $(".param-label");
		var $value = $(".param-txt");
		for(var i = 0; i < $key.length; i++){
			var key = $key[i].innerHTML;
			var value = $value[i].value;
			console.log(key + "=" + value);
			param[key] = value;
		}

		if($(this).index() == 0){
			$.get(url, param, function(str){
				console.log(str);
				$(".result-txt").val(getJsonStr(str));
			});
		}
		else{
			$.post(url, param, function(str){
				console.log(str);
				$(".result-txt").val(getJsonStr(str));
			});
		}
	});

});

function getJsonStr(obj){
	if(typeof(obj) == "string"){
		return obj;
	}
	return JSON.stringify(obj);
}

function fetchGetData(){
	var url = $(".url-txt").val();
	setCookie("url", url);
	var n = url.indexOf("?");
	if(n == -1){
		return [];
	}
	var search = url.substr(n + 1);
	var data = [];
	var list = search.split("&");
	for(var i = 0; i < list.length; i++){
		var temp = list[i].split("=");
		data.push(temp.join(":"));
	}
	return data;
}

function fetchPostData(){
	var form = $(".form-txt").val();
	setCookie("form", encodeURI(form));
	var data = [];
	var param = {};
	var list = fetchGetData();
	list = list.concat(form.split("\n"));
	for(var i = 0; i < list.length; i++){
		var temp = list[i].split(":");
		if(temp.length >= 2){
			var item = {};
			data.push(item);
			item.key = temp[0];
			temp.splice(0, 1);
			item.value = temp.join(":");
			param[item.key] = item.value;
		}
	}
	if(vue){
		vue.data = data;
	}
	else{
		vue = new Vue({
			el: ".param-list",
			data: {
				data: data
			}
		});
	}

	$(".param-list").show();
	return param;
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    if(!exdays){
        exdays = 30;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}