/**
 * Created by jiangsizhi on 2017/3/21.
 */
$(function(){
    $(".url").val(localStorage.getItem("url"));
    $(".param").val(localStorage.getItem("param"));
    $(".way").val(localStorage.getItem("way"));

    $(".btn").click(function(){
        var url = $(".url").val();
        var param = $(".param").val();
        var way = $(".way").val().toLowerCase();
        localStorage.setItem("url", url);
        localStorage.setItem("param", param);
        localStorage.setItem("way", way);
        $(".result").val("");
        $[way](url + "?v=" + Math.random(), getParam(param), function(str){
            $(".result").val(JSON.stringify(str));
        });
    });

    function getParam(str){
        var obj = {};
        var list = str.split("\n");
        for(var i = 0; i < list.length; i++){
            var temp = list[i].split(":");
            if(temp.length > 1){
                obj[temp[0]] = temp[1];
            }
        }
        return obj;
    }
});