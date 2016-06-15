/**
 * Created by jiangsizhi on 2016/6/14.
 */

var core = new Core();
var tool = new Tool();

$(function(){
    var $will = $(".will-add .txt");
    var $did = $(".did-add .txt");

    $(".debug-btn").click(function(){
        core.willList = [];
        for(var i = 0; i < 20; i++){
            var n = tool.getRandomNumber(8);
            core.willList.push(n);
        }
        $will.val(tool.getTextByList(core.willList));
    });

    $(".play-btn").click(function(){
        if(core.willList.length == 0){
            core.willList = tool.getListByText($will.val());
        }
        next();
    });

    function next(){
        if(core.willList.length > 0){
            var num = core.willList.shift();
            core.didList.unshift(num);
            tool.showDialog(num);
            $will.val(tool.getTextByList(core.willList));
            $did.val(tool.getTextByList(core.didList));
        }
    }
});

function Core(){
    var instance = {};
    instance.willList = [];
    instance.didList = [];
    return instance;
}

function Tool(){
    var instance = {};
    instance.getTextByList = function(list){
        return list.join("\n");
    };
    instance.getListByText = function(str){
        var list = str.match(/\d+/g);
        list = list ? list : [];
        return list;
    };
    instance.showDialog = function(num){
        var url = "tencent://message/?uin=" + num + "&Site=&menu=yes";
        location.href = url;
    };
    instance.getRandomNumber = function(length){
        var str = "";
        str += Math.floor(Math.random() * 9) + 1;
        while(str.length < length){
            var n = Math.floor(Math.random() * 10);
            str += n;
        }
        return str;
    };
    return instance;
}