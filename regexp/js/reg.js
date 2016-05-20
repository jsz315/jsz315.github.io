$(function(){
	$(".url-box .btn").click(function(){
		var url = $(".url-box .input-txt").val();
		$.post("/reg/url", {url: url}, function(data){
			$(".data-txt").val(data);
		});

	});

	$(".match-btn").click(function(){
		var str = $(".data-txt").val();
		var regexp = new RegExp($(".find").val(), $(".param").val());
		var rs = str.match(regexp);
		
		$(".source")[0].innerHTML = regexp.source;
		rs && $(".result-txt").val(rs.join("\n"));
	});

	$(".exec-btn").click(function(){
		var str = $(".data-txt").val();
		var regexp = new RegExp($(".find").val(), $(".param").val());
		var rs = null;
		var list = [];
		while(rs = regexp.exec(str)){
			rs.shift();
			list.push("[" + rs.join(", ") + "]");
		}
		
		$(".source")[0].innerHTML = regexp.source;
		$(".result-txt").val(list.join("\n"));
	});	

	$(".replace-btn").click(function(){
		var str = $(".data-txt").val();
		var regexp = new RegExp($(".find").val(), $(".param").val());
		var rs = str.replace(regexp, $(".replace").val());
		
		$(".source")[0].innerHTML = regexp.source;
		$(".result-txt").val(rs);
	});

	$(".split-btn").click(function(){
		var str = $(".data-txt").val();
		var regexp = new RegExp($(".find").val(), $(".param").val());
		var rs = str.split(regexp);
		
		$(".source")[0].innerHTML = regexp.source;
		rs && $(".result-txt").val(rs.join("\n"));
	});

});