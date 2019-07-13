/**
 * Created by jiangsizhi on 2016/8/11.
 */
$(function(){

    addJump();

    readData(["url", "start", "end", "reg", "find", "replace", "before", "after", "width", "height"]);

    $(".web-list-create").click(function(){
        var url = $(".url").val();
        var start = $(".start").val();
        var end = $(".end").val();
        var total = $(".total").val();
        start = parseInt(start);
        end = parseInt(end);
        var list = [];
        for(var i = start; i <= end; i++){
            var n = getFomratNum(total, i);
            var aim = url.replace("###", n);
            list.push(aim);
        }
        $(".webs").val(list.join("\n"));
        $(".data").val(list.join("\n"));
        saveData(["url", "start", "end"]);
    });

    $(".web-grab").click(function(){
        var reg = $(".reg").val();
        var webs = $(".webs").val();
        var urls = webs.split("\n");
        var param = {};
        param.urls = JSON.stringify(urls);
        param.reg = reg;
        $.post("http://127.0.0.1:3000/grab", param, function(str){
            $(".fetch").val(str);
            $(".data").val(str);
        });
        saveData(["reg"]);
    });

    $(".deal-with").click(function(){
        var find = $(".find").val();
        var replace = $(".replace").val();
        var before = $(".before").val();
        var after = $(".after").val();
        var fetch = $(".fetch").val();
        var list = fetch.split("\n");
        var aim = [];
        for(var i = 0; i < list.length; i++){
            var str = list[i];
            if(find != ""){
                var reg = new RegExp(find, "ig");
                str = str.replace(reg, replace);
            }
            str = before + str + after;
            aim.push(str);
        }
        $(".data").val(aim.join("\n"));
        saveData(["find", "replace", "before", "after"]);
    });

    $(".img-show").click(function(){
        var data = $(".data").val();
        var width = $(".width").val();
        var height = $(".height").val();
        width = width == "" ? "auto" : width;
        height = height == "" ? "auto" : height;
        var list = data.split("\n");
        $(".img-list")[0].innerHTML = modelData("img-item", {list: list, width: width, height: height});
        saveData(["width", "height"]);
    });
});

function saveData(list){
    for(var i = 0; i < list.length; i++){
        var key = list[i];
        var value = $("." + key).val();
        localStorage.setItem(key, value);
    }
}

function readData(list){
    for(var i = 0; i < list.length; i++){
        var key = list[i];
        var value = localStorage.getItem(key);
        $("." + key).val(value);
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

function addJump(){
    const VID = "JUMP_PAGE";
    const TYPE_TOP = "▲";
    const TYPE_BOTTOM = "▼";

    if(!document.querySelector(VID)){
        addDiv(TYPE_TOP);
        addDiv(TYPE_BOTTOM);
    }

    function addDiv(type){
        var div = document.createElement("div");
        div.className = VID;
        document.body.appendChild(div);
        div.style.display = "block";
        div.style.color = "#ffffff";
        div.style.textAlign = "center";
        div.style.lineHeight = "40px";
        div.style.width = "40px";
        div.style.height = "40px";
        div.style.position = "fixed";
        div.style.bottom = type == TYPE_BOTTOM ? "20px" : "70px";
        div.style.right = "20px";
        div.style.zIndex = "3000";
        div.style.background = "rgba(0, 0, 0, 0.4)";
        div.style.borderRadius = "8px";
        div.style.cursor = "pointer";
        div.innerHTML = type;

        div.onclick = function(){
            if(type == TYPE_BOTTOM){
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            }
            else{
                document.documentElement.scrollTop = 0;
            }
            
        }
    }

}