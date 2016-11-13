var vue = null;
var $state = null;
var choseId = localStorage.getItem("choseId");

$(function(){

	$state = $(".state-tip");

	$state.click(function(){
		//location.reload();
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
		num = parseInt(num);
		if(!choseId){
			alert("请先选择");
			return;
		}
		requestVote(num);
	});

});

function refresh(){
	if(window["html5"]){
		window["html5"].refresh();
	}
}

function requestVote(n){
	if(window["html5"]){
		window["html5"].requestVote(choseId);
	}
}

function onRequestVote(){
	$state.text("投票成功");
	setTimeout(function(){
		$state.text("");
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
	//return Math.floor(Math.random() * 3) - 1;
	return b.value - a.value;
}