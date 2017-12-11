var vue = null;
var $state = null;
var choseId = localStorage.getItem("choseId");
var aim = 1;
var old = 0;
var timerId = 0;

$(function(){

	$state = $(".state-tip");

	$state.click(function(){
		refresh();
	});

	if(window["html5"]){
		window["html5"].requestData();
	}
	else{
		update();
	}

	$(".get-btn").click(function(){
		requestData();
	});

	$(".vote-btn").click(function(){
		var num = this.getAttribute("data-num");
		aim = parseInt(num);
		if(!choseId){
			alert("请先选择");
			return;
		}
		old = getCurrentNumber();
		clearTimeout(timerId);
		requestVote();
	});

});

function getCurrentNumber(){
	for (var i = 0; i < vue.data.length; i++) {
		if(vue.data[i].key == "3518838242"){
			var num = parseInt(vue.data[i].value);
			return num;
		}
	}
	return 0;
}

function refresh(){
	if(window["html5"]){
		window["html5"].refresh();
	}
}

function requestVote(){
	if(window["html5"]){
		window["html5"].requestVote(choseId);
	}
}

function onRequestVote(){
	$state.text("投票成功");
	setTimeout(function(){
		$state.text("原票数：" + old);
		var now = getCurrentNumber();
		var num = now - old;
		if(num < aim){
			timerId = setTimeout(requestVote, Math.floor(Math.random() * 30000 + 10000));
		}

	}, 1000);
}

function requestData(){
	if(window["html5"]){
		window["html5"].requestData();
	}
}

function onRequestData(str){
	var data = JSON.parse(str);
	init(data);
}

function init(data){
	var map = data.map;
	var list = [];
	for(var i in map){
		list.push({key: i, value: map[i]});
	}
	list.sort(sortNumber);
	list = list.slice(0, 10);
	for (var i = 0; i < list.length; i++) {
		console.log(list[i].value);
		if(list[i].key == choseId){
			list[i].chosed = true;
		}
		else{
			list[i].chosed = false;
		}
	}
	if(vue){
		vue.data = list;
	}
	else{
		vue = new Vue({
			el: ".param-list",
			data: {
				data: list
			},
			methods: {
				check: function(item){
					if(item.key == "3518838242"){
						return "param-aim";
					}
					else{
						return "";
					}
				},
				selecte: function(item){
					choseId = item.key;
					localStorage.setItem("choseId", choseId);
					
					for (var i = 0; i < vue.data.length; i++) {
						vue.data[i].chosed = false;
					}
					item.chosed = true;

				}

			}
		});
		$(".param-list").show();
	}
}


function update(){
	var url = "js/data.js";

	$.ajax({
		url: url,
		dataType: "json",
		success: function(data){
			init(data);
		},
		error: function(){

		}
	});
}

function sortNumber(a, b){
	return b.value - a.value;
}