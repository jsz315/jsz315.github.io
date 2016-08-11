/**
 * Created by jiangsizhi on 2016/8/11.
 */
$(function(){
    $(".ps-txt").val(getSaveData("ps"));
    $(".ls-txt").val(getSaveData("ls"));

    $(".data-btn").click(function(){
        var str = $(".input-txt").val();
        var list = str.split("\n");
        var aim = [];
        var ps = $(".ps-txt").val();
        var ls = $(".ls-txt").val();
        setSaveData("ps", ps);
        setSaveData("ls", ls);
        for(var i = 0; i < list.length; i++){
            aim.push(ps + list[i] + ls);
        }
        $(".output-txt").val(aim.join("\n"));
    });

    $(".img-btn").click(function(){
        var str = $(".output-txt").val();
        var list = str.split("\n");
        var aim = [];
        for(var i = 0; i < list.length; i++){
            var li = '<li class="img-item"><a target="_blank" href="' + list[i] + '"><img src="' + list[i] + '"></a></li>';
            aim.push(li);
        }
        $(".img-list")[0].innerHTML = aim.join("");
    });

    function getSaveData(key){
        var str = localStorage.getItem(key);
        if(!str){
            str = "";
        }
        return str;
    }

    function setSaveData(key, value){
        localStorage.setItem(key, value);
    }
});