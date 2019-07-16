
function saveData(list){
    for(var i = 0; i < list.length; i++){
        var key = list[i];
        var value = $("#" + key).val();
        if(key.indexOf("-status") != -1){
            value = $("#" + key)[0].checked ? 1 : 0
        }
        localStorage.setItem(key, value);
    }
}

function readData(list){
    for(var i = 0; i < list.length; i++){
        var key = list[i];
        var value = localStorage.getItem(key);
        if(key.indexOf("-status") != -1){
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