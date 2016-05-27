/**
 * Created by jsz on 2015/8/10.
 */
var soundList = {};     //声音列表
var willPlayList = [];  //将要播放的列表
var groupId = 0;        //当前播放编号
var lineId = 0;         //当前行编号
var groupPlayList = []; //播放组

$(function(){

    var html = modelData("sound", {list:getSoundDataList()});
    $(".sound")[0].innerHTML = html;

    /*
    $(".input-btn").click(function(){
        var n = $(".input-txt").val();
        playLineSound(n);
    });
    */

    initCount();
    setTimeout(initSoundList, 1000);
});

//播放一行数据
function playLineSound(n){
    willPlayList = [];
    var list = n.split(" ");
    for(var i = 0; i < list.length; i++){
        playSound(list[i]);
    }
    startPlayNeed();
}

//初始化计算数据
function initCount(){

    $(".btn").click(function(){
        $(".num-list").empty();
        $(".down-txt").empty();
        $(".up-txt").empty();

        var num = $(".num-txt").val();
        var list = shows(num).toString().split(",");

        $(".down-txt").append(getDown(list, num));
        $(".up-txt").append(getUp(list, num));
    });

    document.onkeydown = function(e){
        if(e.keyCode == 13){
            $(".btn")[0].click();
        }
    };

    $(".all-btn").click(function(){
        $(".num-list").empty();
        for(var i = 0; i <= 27; i++){
            var list = shows(i).toString().split(",");
            var down = getDown(list, i);
            var up = getUp(list, i);
            var data = {num:i, down:down, up:up};
            var html = new EJS({text:$("#num-item")[0].innerHTML, type:"{"}).render(data);
            $(".num-list").append(html);
        }
    });

    $(".auto-btn").click(function(){
        var list = $(".num-list .num-item");
        if(list.length == 0){
            return;
        }
        line = 0;
        groupId = 0;
        groupPlayList = [];
        list.each(function(i, div){
            var list = [];
            var $line = $(this).find(".line");
            if($line.length == 2){
                list.push($line[0].innerText);
            }
            else{
                for(var i = 0; i < $line.length; i++){
                    list.push($line[i].innerText);
                }
            }
            groupPlayList.push(list);
        })
        playLineSound(groupPlayList[0][0]);
    });

    function getDown(list, num){
        var divs = [];
        var leave = num % 3;
        for(var i = 0; i < list.length; i++){
            var str;
            if(i == 0){
                str = num + " / 3 = " +  list[i];
                if(leave != 0){
                    str = str + " 余 " + leave;
                }
            }
            else{
                str = list[i - 1] + " / 3 = " +  list[i];
            }
            divs.push("<div class='line'>" + str + "</div>");
        }
        return divs.join("");
    }

    function getUp(list, num){
        var divs = [];
        var leave = num % 3;
        var count = 3;
        for(var i = 0; i < list.length - 1; i++){
            var str = "3 * " + count + " = " + (3 * count);
            count = 3 * count;
            divs.push("<div class='line'>" + str + "</div>");
        }
        var str = num + " / " + count + " = " + Math.floor(num / count);
        if(leave != 0){
            str = str + " 余 " + leave;
        }
        divs.push("<div class='line'>" + str + "</div>");
        return divs.join("");
    }

    function shows(n){
        var num = Math.floor(n / 3);
        if(num % 3 == 0 && num != 0){
            return num + "," + shows(num);
        }
        else{
            return num;
        }
    }
}

//初始化声音列表
function initSoundList(){
    soundList = {};
    $("audio").each(function(){
        this.playbackRate = 1.8;
        var id = this.getAttribute("id");
        if(id == "music"){
            this.setAttribute("loop", "loop");
            this.removeAttribute("onended");
        }
        soundList[id] = this;
    });
}

//设置声音数据
function getSoundDataList(){
    var list = [];
    for(var i = 0; i <= 10; i++){
        addSound(i);
    }
    addSound("music");
    addSound("cheng");
    addSound("chu");
    addSound("deng");
    addSound("yu");

    function addSound(id){
        var obj = {};
        obj.id = id;
        obj.src = "assets/sod/" + id + ".mp3";
        list.push(obj);
    }
    return list;
}

function playSound(num){
    if(num.match(/^[0-9]*$/)){
        if(num <= 10){
            addWillPlaySound(soundList[num]);
        }
        else if(num < 20){
            addWillPlaySound(soundList[10]);
            addWillPlaySound(soundList[num - 10]);
        }
        else if(num == 20){
            addWillPlaySound(soundList[2]);
            addWillPlaySound(soundList[10]);
        }
        else if(num < 30){
            addWillPlaySound(soundList[2]);
            addWillPlaySound(soundList[10]);
            addWillPlaySound(soundList[num - 20]);
        }
    }
    else if(num == "="){
        addWillPlaySound(soundList["deng"]);
    }
    else if(num == "*"){
        addWillPlaySound(soundList["cheng"]);
    }
    else if(num == "/"){
        addWillPlaySound(soundList["chu"]);
    }
    else if(num == "余"){
        addWillPlaySound(soundList["yu"]);
    }
}

//开始播放声音列表
function startPlayNeed(){
    if(willPlayList.length > 0){
        willPlayList[0].play();
        soundList["music"].play();
    }
}

//添加需要播放的声音
function addWillPlaySound(sod){
    willPlayList.push(sod);
}

//单个声音播放结束
function soundEnd(div){
    willPlayList.shift();

    if(willPlayList.length > 0){
        willPlayList[0].play();
    }
    else{
        soundList["music"].pause();
        var list = groupPlayList[groupId];
        var time = 300;
        if(list){
            if(++lineId == list.length){
                lineId = 0;
                time = 800;
                if(++groupId < groupPlayList.length){
                    list = groupPlayList[groupId];
                }
                else{
                    time = 0;
                }
            }
            if(time > 0){
                setTimeout(function(){
                    playLineSound(list[lineId]);
                }, time);
            }
        }
    }
}

//页面模版数据
function modelData(id, data){
    var html = new EJS({text:$("#" + id)[0].innerHTML, type:"{"}).render(data);
    return html;
}