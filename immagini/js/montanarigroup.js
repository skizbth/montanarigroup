$(document).ready(ON_READY);
function ON_READY() {
	//$('.menu #menu li a').on('mouseOver', function(){
	$('.menu #menu li a').mouseover(function(){
		//$(this).addClass('fadeIn');
		$(this).animate({
			left: '+=20'
			}, 200, function() {
				// animazione completata
			});
	});

	$('.menu #menu li a').mouseout(function(){
		//$(this).removeClass('fadeIn');
		$(this).animate({
			color: '#fff',
			left: '-=20'
			}, 200, function() {
				// animazione completata
			});
	});

}


var bg_counter=1;
var nURL="";
function ON_LOAD(){

	setInterval(function(){
		bg_counter = (bg_counter==4) ? 1 : bg_counter+1;
		nURL = "url('./immagini/0"+bg_counter+".jpg')";
		/*
			$('#glob').animate({opacity:0}, 500).
				css({'background':nURL});
		*/
		$('#glob')
			.animate({opacity:0.6},300,function() {
				$(this)
					.css({
							'z-index':'9999',
							'background-image':nURL
						})
					.animate({
							opacity:1,
							'z-index':'1'
						});
			});
		},4000);

}

function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
    return r;
    }
}
listen("load", window, ON_LOAD);