/* jshint devel:true */
// console.log('\'Allo \'Allo!');

$('.cookiemonster a.close').on('click', function(e){
	e.preventDefault();
	$('.cookiemonster').addClass('hide');
});

$(document).keypress(function (e) {
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

var lastScrollTop = 0;

// $(document).ready(function(){
// 	$('.nav li').each(function(i) {
// 	  $(this).delay(i*500).addClass('loadin');
// 	  // console.log('menu')
// 	});
// });


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


$(window).scroll(function(e) {

	var st = $(this).scrollTop();
    

	// if ($(window).scrollTop() > $(window).height()) { 
 //    	$('header').removeClass('hidden');
 //    	// console.log('greater');
	// } else {
	// 	// console.log('not greater');
 //    	$('header').addClass('hidden');
	// }


    if(st > lastScrollTop) {
        console.log('downscroll');
    	$('header').addClass('hidden');
    } else {
        console.log('upscroll');
        // if ($(window).scrollTop() > $(window).height()) { 
        	$('header').removeClass('hidden');
        // }
    }

    lastScrollTop = st;

    if ($(window).scrollTop() < 100) { 
    	$('header').addClass('hidden');
    }

});