/**
 * Created by jiangsizhi on 2016/8/11.
 */
var txtKeys = ["url", "start", "end", "total", "server", "filter-reg", "find-reg", "replace-reg", "front", "after", "width", "height", "server-status", "data-status"];
$(function(){

    setupPageJump();

    // $(".nav li").click(function(e){
    //     var $div = $(e.currentTarget);
    //     $div.addClass("active").siblings().removeClass("active");
    //     var index = $div.index();
    //     $(".page li").eq(index).show().siblings().hide();
    // })

    readData(txtKeys);

    if($("#server-status")[0].checked){
        $("#server-content").collapse('show');
    }
    else{
        $("#server-content").collapse('hide');
    }

    if($("#data-status")[0].checked){
        $("#data-content").collapse('show');
    }
    else{
        $("#data-content").collapse('hide');
    }

    $("#start-btn").click(function(){
        var url = $("#url").val();
        var start = $("#start").val();
        var end = $("#end").val();
        var total = $("#total").val();
        start = parseInt(start);
        end = parseInt(end);
        var list = [];
        for(var i = start; i <= end; i++){
            var n = getFomratNum(total, i);
            var aim = url.replace("###", n);
            list.push(aim);
        }
        $("#aim-data").val(list.join("\n"));
        saveData(txtKeys);
    })

    $("#server-btn").click(function(){
        fetchData();
        saveData(txtKeys);
    })

    $("#filter-btn").click(function(){
        var reg = $("#filter-reg").val();
        var webs = $("#webs-data").val();
        var reg = new RegExp(reg, "g");
        var m;
        var list = [];
        while(m = reg.exec(webs)){
            console.log(m[1])
            list.push(m[1]);
        }
        $("#filter-data,#aim-data").val(list.join("\n"));
        saveData(txtKeys);
    })
    
    $("#deal-btn").click(function(){
        var find = $("#find-reg").val();
        var replace = $("#replace-reg").val();
        var front = $("#front").val();
        var after = $("#after").val();
        var fetch = $("#filter-data").val();
        var list = fetch.split("\n");
        var aim = [];
        for(var i = 0; i < list.length; i++){
            var str = list[i];
            if(find != ""){
                var reg = new RegExp(find, "ig");
                str = str.replace(reg, replace);
            }
            str = front + str + after;
            aim.push(str);
        }
        $("#deal-data,#aim-data").val(aim.join("\n"));
        saveData(txtKeys);
    });

    $("#show-btn").click(function(){
        var data = $("#aim-data").val();
        var width = $("#width").val();
        var height = $("#height").val();
        width = width == "" ? "auto" : width;
        height = height == "" ? "auto" : height;
        var list = data.split("\n");
        $(".img-list")[0].innerHTML = modelData("img-item", {list: list, width: width, height: height});
        
        saveData(txtKeys);
    });

    $("#auto-btn").click(function(){

        if($("#server-status")[0].checked){

            fetchData().then(()=>{
                $("#filter-btn").click();
                if($("#data-status")[0].checked){
                    $("#deal-btn").click();
                }
                $("#show-btn").click();
            })
            
        }
        else{
            $("#start-btn").click();
            $("#show-btn").click();
        }

        saveData(txtKeys);
    })

    $("#server-status").click(function(e){
        if(this.checked){
            $("#server-content").collapse('show');
        }
        else{
            $("#server-content").collapse('hide');
        }
    })
   
    $("#data-status").click(function(e){
        if(this.checked){
            $("#data-content").collapse('show');
        }
        else{
            $("#data-content").collapse('hide');
        }
    })
    
});

function fetchData(){
    $("#webs-data").val("请求数据...");
    return new Promise(resolve=>{
        var url = $("#url").val();
        var start = $("#start").val();
        var end = $("#end").val();
        var total = $("#total").val();
        var server = $("#server").val();
        start = parseInt(start);
        end = parseInt(end);
        var list = [];
        for(var i = start; i <= end; i++){
            var n = getFomratNum(total, i);
            var aim = url.replace("###", n);
            aim = server + "?url=" + aim;
            list.push(getHtml(aim));
        }
        Promise.all(list).then(res=>{
            console.log("请求完成");
            $("#webs-data").val(res[0]);
            resolve();
        })
    })
}