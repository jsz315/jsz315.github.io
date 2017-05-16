$(function () {
	new Carousel({autoPlay: true, time: 3000, click: function (index) {
		alert("click " + (index + 1));
	}, change: function (index) {
		console.log("active " + (index + 1));
	}});

	$(".content-carousel").eq(0).css("background", "#E5D71D");
	$(".content-carousel").eq(1).css("background", "#42D187");
	$(".content-carousel").eq(2).css("background", "#A140B5");
})

function Carousel(param) {
	var autoPlay = param.autoPlay;
	var timerId = 0;
	var startPot = 0;
	var movePot = 0;
	var $innerCarousel = $(".inner-carousel");
	var curIndex = 0;
	var length = $(".content-carousel").length;

	$(".content-carousel").click(function (e) {
		param.click(curIndex);
	});

	if(autoPlay){
		next();
	}
	param.change(curIndex);

	$innerCarousel.on("touchstart", function (e) {
		startPot = e.changedTouches[0].clientX;
		movePot = startPot;
		$innerCarousel.removeClass("action-carousel");
		clearTimeout(timerId);
	});

	$innerCarousel.on("touchmove", function (e) {
		e.preventDefault();
		var endPot = e.changedTouches[0].clientX;
		var curPot = getPot($innerCarousel.css("left"));
		curPot += endPot - movePot;
		$innerCarousel.css({"left": curPot + "px"});
		movePot = endPot;
	});

	$innerCarousel.on("touchend", function (e) {
		var endPot = e.changedTouches[0].clientX;
		var space = endPot - startPot;
		if(Math.abs(space) > 120){
			if(space > 0){
				curIndex--;
			}
			else {
				curIndex++;
			}
		}
		if(curIndex < 0){
			curIndex = 0;
		}
		if(curIndex > length - 1){
			curIndex = length - 1;
		}
		update();
	});


	function update() {
		var aimPot = -curIndex * $innerCarousel.width();
		$innerCarousel.addClass("action-carousel");
		$innerCarousel.css({"left": aimPot + "px"});
		param.change(curIndex);
		if(autoPlay){
			next();
		}
	}

	function next () {
		timerId = setTimeout(function () {
			if(++curIndex > length - 1){
				curIndex = 0;
			}
			update();
		}, param.time);
	}

	function getPot (str) {
		return parseInt(str);
	}
}