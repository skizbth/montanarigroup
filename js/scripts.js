/*include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/jquery.mousewheel.js");
include("js/jquery-ui-1.8.11.custom.min.js");
include("js/cScroll.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/forms.js");
include("js/jcarousellite_1.0.1.min.js");
include("js/jquery.cycle.all.min.js");
include("js/MathUtils.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
*/
var MSIE = false,
    content, mh, h, w, defColor,
    splash, sh, currItem = 0;

$(document).ready(ON_READY);
function ON_READY() {

    /*SUPERFISH MENU*/   
/*
    $('.menu #menu').superfish({

	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
*/

	$('.menu #menu li a').one('blur', function(){
		$(this).toggleClass('fadeIn');
	});

}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();

    initGallery();

    $('.scroll').cScroll({
        duration: 500,
        easing: 'easeOutExpo',
        step:'190px'
    });
    $('.scrollUp').click(function(){
        $(this).parent().siblings('.scroll').cScroll('up');
		return false;
    });
    $('.scrollDown').click(function(){
		$(this).parent().siblings('.scroll').cScroll('down');
		return false;
    });
    
    //content switch
    content = $('#content');
    w = parseInt(content.css('width'));
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'visibility':'hidden'});	
            hideSplashQ();
        },
        actFu:function(_){            
            if(_.curr){
                switch(_.n){
                    case 0: 
                       showSplash();
                    break;
                    default:
                        hideSplash(); 
                    break;
                }
                switchGallery(_.n);
                
                h = parseInt( _.curr.outerHeight(true));
                content.children('ul').css({'height':h});
                                
                _.curr
                    .css({'top':'-1500px','visibility':'visible'}).stop(true).delay(100).show().animate({'top':'0px'},{duration:900,easing:'easeInOutExpo'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'top':'1500px'},{duration:900,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'visibility':'hidden'});
                            }
                        }
		              });
            }            
  		}
    });
    defColor = $('#menu>li>a').eq(0).css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_splash',
        hoverIn:function(li){
            $('>a', li).stop().animate({color: '#fff'},400,'easeOutExpo');
            $('>strong',li).stop().animate({'height':'55px'},400,'easeOutExpo');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('> a', li).stop().animate({color: defColor},600,'easeOutExpo');
                $('>strong',li).stop().animate({'height':'0'},600,'easeOutExpo');
            }
        }
    })
    .navs(function(n){	
   	    $('#content').tabs(n);
   	});
    
    setTimeout(function(){  $('body').css({'overflow':'visible'}); },300);    
    addAllListeners();
    
    $(window).trigger('resize');
    mh = parseInt($('body').css('minHeight'));
}

$(window).resize(function (){
    if (content) {
        content.stop().animate({'top':(windowH()-parseInt(content.children('>ul').height()))*.5},500,'easeOutCubic')
    }
    if (splash){
        splash.stop().animate({'marginTop':(windowH()-parseInt(splash.height()))*.5},500,'easeOutCubic')
    }
});

function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
    return r;
    }
}
listen("load", window, ON_LOAD);