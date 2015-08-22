/* jshint devel:true */
// console.log('\'Allo \'Allo!');
function l(honk) {
	console.log(honk);
}

var $w = $(window),
	$d = $(document);





$('.cookiemonster a.close').on('click', function(e){
	e.preventDefault();
	$('.cookiemonster').addClass('hide');
});

$d.keypress(function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 103) {
    	$('.grid').toggleClass('active');
    	console.log('triggered');
    }
});

$('.hidden').on('click', function(){
	$(this).removeClass('hidden');
	$('.burger').addClass('active');
});


// Change width value on page load
$d.ready(function(){
    responsive_resize();
});

// Change width value on user resize, after DOM
$w.resize(function(){
     responsive_resize();
});

function responsive_resize(){

	var current_width = $w.width();
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
}


function animMenuItems(what) {

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
}



$('.burger').on('click', function(){
	animMenuItems(true);
});

$('.menu .close').on('click', function(){
	animMenuItems(false);
})


var lastScrollTop = 0;

function menuReveal(event) {
	
	var st = $(this).scrollTop();

	if(st > lastScrollTop) {
    
    	$('header').addClass('hidden');
    
    } else {
    
        $('header').removeClass('hidden');
    
    }

    lastScrollTop = st;

    if ($w.scrollTop() < 100) { 
    
    	$('header').addClass('hidden');
    
    }
}


// $(window).scroll(function(e) {

// 	$.throttle( 250, menuReveal );
// 	// menuReveal();

// });



if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 499) {

	console.log('is phone');

	$('body').bind( 'touchmove', function(e){
		menuReveal();
	});
	
} else {

	console.log('is not phone');
	$w.scroll( $.throttle( 100, menuReveal ) );

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

		  el.css('opacity', 0)
	  } 
	});

	$w.scroll(function(event) {
	  
	  allMods.each(function(i, el) {
	    var el = $(el);
	    if (el.visible(true)) {
	      el.addClass("come-in"); 
	    } 
	  });
	  
	});
}


$w.load(function(){
	$(".hold").each(function(i,el) {
		var $this = $(this);
		setTimeout(function() {
			$this.removeClass('hold');
		}, i*200); // milliseconds
	});
});








$w.scroll(function(e){

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


$('.nav li a').click(function(e) {
  e.preventDefault();

  var hash = $(this).context.hash,
  	selector = '.nav li a[href='+ hash +']',
  	honk = $(hash).offset().top;

	animMenuItems(false);

	// scroll window to section
	$('body').animate({
		scrollTop: honk - 0
	}, 1000);

	return false
});






























