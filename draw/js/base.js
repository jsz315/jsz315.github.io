/**
 * Created by Administrator on 2017/5/27 0027.
 */
var w = window.screen.width;
var h = window.screen.height;
var chars = "1234567890()_+qwertasdghcjzbbmjkyioupl<SADWYUTIUPLMZNCBVF".split("");
var timer = 0;
var clickTime = 0;

function $(id){
    return document.getElementById(id);
}

window.onload = function () {
    $("cartoon").style.display = "none";
    $("random").onclick = function(){
        showCartoon(false);
    };

    $("order").onclick = function(){
        showCartoon(true);
    };

    $("canvas").onclick = function(){
        if(Date.now() - clickTime < 300){
            $("cartoon").style.display = "none";
            $("btns").style.display = "block";
            clearInterval(timer);
        }
        clickTime = Date.now();
    };

    function showCartoon(isOrder){
        $("btns").style.display = "none";
        $("cartoon").style.display = "block";
        var str = $("word").value;
        str = str.replace(/\s/ig, "");
        if(str != ""){
            chars = str;
        }
        play(isOrder);
    }

};


 function play(isOrder){
    var canvas = $("canvas");
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext("2d");
    context.font = "15px Verdana";
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, w, h);

    var size = 16;
    var row = Math.ceil(w / size);
    var lines = [];
    for(var i = 0; i < row; i++){
        var line = new Line(context, i * size, size);
        lines.push(line);
    }

    timer = setInterval(function(){
        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, w, h);
        context.fillStyle = "#0d8200";
        drawLines();
    }, 30);

    function drawLines(){
        for(var i = 0; i < row; i++){
            lines[i].draw(isOrder);
        }
    }
}

function Line(context, x, size){
    var instance = {};
    var pot = size;
    var total = chars.length;
    var char = "";
    var cid = 0;
    instance.draw = function (isOrder) {
        if(isOrder){
            char = chars[cid];
            if(++cid == total){
                cid = 0;
            }
        }
        else{
            char = chars[Math.floor(Math.random() * total)];
        }

        context.fillText(char, x, pot);
        pot += size;
        if(pot > h && Math.random() > 0.7){
            pot = 0;
        }
    };
    return instance;
}

