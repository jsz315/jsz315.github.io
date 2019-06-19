/**
 * Created by jiangsizhi on 2016/8/11.
 */
$(function(){

    readData(["url", "start", "end", "reg", "find", "replace", "before", "after", "width", "height"]);

    $(".web-list-create").click(function(){
        var url = $(".url").val();
        var start = $(".start").val();
        var end = $(".end").val();
        start = parseInt(start);
        end = parseInt(end);
        var list = [];
        for(var i = start; i <= end; i++){
            var aim = url.replace("###", i);
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