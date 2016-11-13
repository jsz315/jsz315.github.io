$(function(){

	update();

	$(".get-btn").click(function(){
		update();
	});

});


(function(){
	var list = [];
	for(var p = 4; p <= 11; p++){
		var $li = $("#page" + p + " li.wsite-text[id*=inside_]");
		for (var i = 0; i < $li.length; i++) {
			var name = $.trim($li[i].innerText);
			var id = $li[i].getAttribute("id").split("_")[1];
			list.push("<div>" + name + "=" + id + "</div>");
			console.log(name + "=" + id);
		}
	}
	document.write(list.join(""));
	//JSON.stringify(list);
})();


function update(){
	var url = "js/data.js";

	$.ajax({
		url: url,
		dataType: "json",
		success: function(data){
			var map = data.map;
			var list = [];
			for(var i in map){
				list.push({key: i, value: map[i]});
			}
			list.sort(sortNumber);
			list = list.slice(0, 10);
			for (var i = 0; i < list.length; i++) {
				console.log(list[i].value);
			}
			new Vue({
				el: ".param-list",
				data: {
					data: list
				}
			})
			
		},
		error: function(){

		}
	});
}

function sortNumber(a, b){
	return b.value - a.value;
}