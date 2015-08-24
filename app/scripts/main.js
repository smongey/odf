/* jshint devel:true */
"use strict";

var l = function (honk) { console.log(honk); };

var odf = {
	$w : $(window),
	$d : $(document),
	$b : $('body')
};



/*
1. Interactions
A. Click
*/

//
odf.$b.on('click', '.cookiemonster a.close', function(e){

	e.preventDefault();
	$('.cookiemonster').addClass('hide');


// Close menu
}).on('click', '.hidden', function(){

	$(this).removeClass('hidden');
	$('.burger').addClass('active');


// Open menu
}).on('click', '.burger', function(){

	odf.animMenuItems(true);

// Close menu
}).on('click', '.menu .close', function(){

	odf.animMenuItems(false);


// Ajax Stuff
}).on('click', '.profile a, .logo, a.front', function(e){

/* 
when article thumb is clicked
	scroll to top
	fade out current page contents

	ajax load contents of desired page
	loop through contents and remove hold class
	pushstate url
	back button should work
*/

	e.preventDefault();

	var url = $(this).context.href.split('/'),
		segment = url[url.length - 1],
		contents = segment + ' #wrap > *';
	l(segment);
	$('#wrap > *').addClass('hold');
	$('html, body').animate({
		scrollTop: 0
	}, 1000, 'easeInOutQuint');
	history.pushState({}, '', $(this).attr("href"));
	setTimeout(function(){
    	$('header').addClass('hidden');
		$('#wrap > *').remove();
		$('#wrap').load(contents, function(){
			setTimeout(function(){
				odf.fadeInSeq();
				initMap();
			}, 0);
		});
	}, 1000);

}).on('click', '.nav li a', function(e) {

	e.preventDefault();

	if ( $('section.article').length > 0 ) {

		var url = $(this).context.href.split('#'),
			anchor = url[url.length - 1];
			hash = '#' + anchor;
		l(anchor);
		
		$('#wrap > *').addClass('hold');
		$('html, body').animate({
			scrollTop: 0
		}, 1000, 'easeInOutQuint');
		odf.animMenuItems(false);
		
		// history.pushState({}, '', $(this).attr("href"));
		setTimeout(function(){
	    	$('header').addClass('hidden');
			$('#wrap > *').remove();
			$('#wrap').load('index.html #wrap > *', function(){
				odf.fadeInSeq();
				initMap();
				l($(hash));
				setTimeout(function(){
					history.pushState({}, '', '/');
					$('html, body').animate({
						scrollTop: $(hash).offset().top
					}, 1500, 'easeInOutQuint');
				}, 500);
			});
		}, 1000);		


	} else {

		var hash = $(this).context.hash,
	  	selector = '.nav li a[href='+ hash +']',
	  	honk = $(hash).offset().top;
		odf.animMenuItems(false);
		$('html, body').animate({
			scrollTop: honk - 0
		}, 1500, 'easeInOutQuint');

	}

}).on('popstate', function(e){

	if (e.originalEvent.state !== null) {
		l(e.originalEvent.state);

		$('#wrap > *').addClass('hold');
		$('html, body').animate({
			scrollTop: 0
		}, 1000, 'easeInOutQuint');
		history.pushState({}, '', $(this).attr("href"));
		setTimeout(function(){
	    	$('header').addClass('hidden');
			$('#wrap > *').remove();
			$('#wrap').load(location.href + ' #wrap > *', function(){
				setTimeout(function(){
					odf.fadeInSeq();
					initMap();
				}, 0);
			});
		}, 1000);
	}

}).on('click', 'a.totop', function(e){

	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 1500, 'easeInOutQuint');

}).on('click', '.hero a.more', function(e){

	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('section.about').offset().top
	}, 800, 'easeInOutQuint');

});


/*
B. Load
*/
odf.$w.load(function(){

	l(window.location.pathname);

	if(window.location.pathname === "/") {

		setTimeout(function(){
			$('#preloader').addClass('out');			
		}, 1200);

		setTimeout(function(){
			// $('#preloader').addClass('out');
			odf.fadeInSeq();
			$('.loading').removeClass('loading');
		}, 1200);

		setTimeout(function(){
			$('#preloader').remove();
		}, 2000);	

	} else {

		odf.fadeInSeq();

	}

});


/*
C. Scroll
*/
odf.$w.scroll(function(e){

	var	$scrollMenu = $('#scroll-menu'),
		scrollButtons = $('.nav li a'),
		arrivalSections = $('.scroll-section');

	arrivalSections.each(function(i) {
		var $section = $(arrivalSections[i]),
			sectionTop = $section.offset().top,
			sectionBottom = (sectionTop + $section.height()),
			name = $section[0].id, 
			anchor = '#' + name,
			scrollBtn = $('.nav li a[href=' + anchor +']');

		if ((e.currentTarget.pageYOffset > (sectionTop - 2)) && (e.currentTarget.pageYOffset < sectionBottom)) {
			scrollBtn.addClass('active');
		} else {
			scrollBtn.removeClass('active');
		}
	});

});


/*
D. Keypress
*/
odf.$d.keypress(function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    	console.log('triggered');
    }
});


/*
E. Doc Ready
*/
odf.$d.ready(function(){

    odf.responsiveClasses();

	// setTimeout(function(){
		$('#preloader').removeClass('loading');
	// }, 100);

});

/*
F. Resize
*/
odf.$w.resize(function(){

    odf.responsiveClasses();

});



// Functions

odf.responsiveClasses = function(){
	var current_width = odf.$w.width();
	//do something with the width value here!
	if(current_width < 499) {
		$('body').removeClass("tablet sdesktop desktop super").addClass("phone");
	} else if(current_width > 500 && current_width < 849) {
		$('body').removeClass("phone sdesktop desktop super").addClass("tablet");
	} else if (current_width > 850 && current_width < 1100) {
		$('body').removeClass("phone tablet desktop super").addClass("sdesktop");
	} else if (current_width > 1101 && current_width < 1439) {
		$('body').removeClass("phone tablet sdesktop super").addClass("desktop");
	} else if (current_width > 1440) {
		$('body').removeClass("phone tablet sdesktop desktop").addClass("super");
	}
	if(current_width < 650){
		$('body').addClass("mobile");
	}
	if(current_width > 651){
	  $('body').removeClass("mobile");
	}
};

odf.animMenuItems = function(what) {

	if( what === true) {

		$('.menu').addClass('open');

		$(".lang li").each(function(i,el) {
		    var $this = $(this);
		    setTimeout(function() {
		        $this.addClass('loadin');
		    }, i*50); // milliseconds
		});

		$(".nav li").each(function(i,el) {
		    var $this = $(this);
		    setTimeout(function() {
		        $this.addClass('loadin');
		    }, i*50); // milliseconds
		});

		setTimeout(function(){
			$('.menu .close').addClass('loadin');
		}, 200);
		setTimeout(function(){
			$('.menu .close').addClass('active');
		}, 350);

	} else {

		$('.menu .close').removeClass('active');

		$('.menu .close').removeClass('loadin');

		$(".lang li").removeClass('loadin');
		
		$($(".nav li").get().reverse()).each(function(i,el) {
		    var $this = $(this);
		    setTimeout(function() {
		        $this.removeClass('loadin');
		    }, i*50); // milliseconds
		});



		setTimeout(function(){
			$('.menu').removeClass('open');
		}, 100);

	}
};

var lastScrollTop = 0;
odf.menuReveal = function(event) {
	
	var st = $(this).scrollTop();

	if(st > lastScrollTop) {

		$('header').addClass('hidden');

	} else {

	    $('header').removeClass('hidden');

	}

	lastScrollTop = st;

	if (odf.$w.scrollTop() < 100) { 

		$('header').addClass('hidden');

	}

};

odf.fadeInSeq = function() {
	$(".hold").each(function(i,el) {
		var $this = $(this);
		setTimeout(function() {
			$this.removeClass('hold');
		}, i*200); // milliseconds
	});
};

odf.readDeviceOrientation = function() {
    if (Math.abs(window.orientation) === 90) {
        $('body').addClass('landscape');
    } else {
    	// Portrait
    }
};



// Touch support with menu on handheld devices

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 499) {

	l('is phone');

	odf.$b.bind('touchmove', function(e){
		
		odf.menuReveal();
	
	});
	
} else {

	l('is not phone');
	odf.$w.scroll( $.throttle( 100, odf.menuReveal ) );

	(function($) {

	  /**
	   * Copyright 2012, Digital Fusion
	   * Licensed under the MIT license.
	   * http://teamdf.com/jquery-plugins/license/
	   *
	   * @author Sam Sehnert
	   * @desc A small plugin that checks whether elements are within
	   *     the user visible viewport of a web browser.
	   *     only accounts for vertical position, not horizontal.
	   */

	  $.fn.visible = function(partial) {
	    
	      var $t            = $(this),
	          $w            = $(window),
	          viewTop       = $w.scrollTop(),
	          viewBottom    = viewTop + $w.height(),
	          _top          = $t.offset().top + 150,
	          _bottom       = _top + $t.height(),
	          compareTop    = partial === true ? _bottom : _top,
	          compareBottom = partial === true ? _top : _bottom;
	    
	    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	  };
	    
	})(jQuery);

	var allMods = $(".anim");

	allMods.each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
	    el.addClass("already-visible"); 
	  } else {

		  el.css('opacity', 0);
	  } 
	});

	odf.$w.scroll(function(event) {
	  
	  allMods.each(function(i, el) {
	    var el = $(el);
	    if (el.visible(true)) {
	      el.addClass("come-in"); 
	    } 
	  });
	  
	});
}

// Landscape view check
window.onorientationchange = odf.readDeviceOrientation;



// Gmaps

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.950574, lng: 11.057841},
	zoom: 16,        
	zoomControl: false,
	scaleControl: false,
	scrollwheel: false,
	disableDefaultUI: true,
	styles: mapStyle,
	draggable: false
	// mapTypeId: google.maps.MapTypeId.SATELLITE
  });
  // map.setTilt(45);
}

var mapStyle = [
  {
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "simplified" }
    ]
  }
];
