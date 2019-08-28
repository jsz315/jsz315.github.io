
function saveData(list){
    for(var i = 0; i < list.length; i++){
        var key = list[i];
        var value;
        if(key.indexOf("-status") != -1){
            value = $("#" + key)[0].checked ? 1 : 0
        }
        else if(key.indexOf("-opt") != -1){
            value = $("#" + key)[0].checked ? 1 : 0
        }
        else{
            value = $("#" + key).val();
        }
        localStorage.setItem(key, value);
    }
}

function readData(list, data){
    for(var i = 0; i < list.length; i++){
        var key = list[i];
        var value = data ? data[key] : localStorage.getItem(key);
        if(key.indexOf("-status") != -1){
            $("#" + key)[0].checked = value == 1;
        }
        else if(key.indexOf("-opt") != -1){
            $("#" + key)[0].checked = value == 1;
        }
        else{
            $("#" + key).val(value);
        }
    }
}

function modelData(id, data){
    var html = new EJS({text:$("#" + id)[0].innerHTML, type:"{"}).render(data);
    return html;
}

function getFomratNum(total, i){
    var num = Number(total);
    if(isNaN(num) || num == 0){
        return i;
    }
    var list = new Array(Number(num)).fill(0);
    list.push(i);
    var str = list.join("");
    return str.substr(-num);
}

async function getHtml(url){
    return new Promise(resolve=>{
        $.get(url, function(data){
            resolve(data);
        })
    })
}

async function getWeb(server, data){
    return new Promise(resolve=>{
        $.ajax({
			type:'post',
			url:server,
			contentType:'application/json;charset=utf-8',
			//数据格式是json串，商品信息
			data: JSON.stringify({
                url: data.url,
                method: data.method,
                authen: data.authen
            }),
			success:function(data){//返回json结果
				resolve(data);
			}
		});
        // $.post(server, {
        //     url: data.url,
        //     method: data.method,
        //     authen: data.authen
        // },function(data){
        //     resolve(data);
        // })
    })
}