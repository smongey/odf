function l(e){console.log(e)}function responsive_resize(){var e=$w.width();499>e?$("body").removeClass("tablet sdesktop desktop super").addClass("phone"):e>500&&849>e?$("body").removeClass("phone sdesktop desktop super").addClass("tablet"):e>850&&1100>e?$("body").removeClass("phone tablet desktop super").addClass("sdesktop"):e>1101&&1439>e?$("body").removeClass("phone tablet sdesktop super").addClass("desktop"):e>1440&&$("body").removeClass("phone tablet sdesktop desktop").addClass("super"),650>e&&$("body").addClass("mobile"),e>651&&$("body").removeClass("mobile")}function animMenuItems(e){e===!0?($(".menu").addClass("open"),$(".lang li").each(function(e,o){var s=$(this);setTimeout(function(){s.addClass("loadin")},50*e)}),$(".nav li").each(function(e,o){var s=$(this);setTimeout(function(){s.addClass("loadin")},50*e)}),setTimeout(function(){$(".menu .close").addClass("loadin")},200),setTimeout(function(){$(".menu .close").addClass("active")},350)):($(".menu .close").removeClass("active"),$(".menu .close").removeClass("loadin"),$(".lang li").removeClass("loadin"),$($(".nav li").get().reverse()).each(function(e,o){var s=$(this);setTimeout(function(){s.removeClass("loadin")},50*e)}),setTimeout(function(){$(".menu").removeClass("open")},100))}function menuReveal(e){var o=$(this).scrollTop();console.log(o),o>lastScrollTop?$("header").addClass("hidden"):$("header").removeClass("hidden"),lastScrollTop=o,$w.scrollTop()<100&&$("header").addClass("hidden")}var $w=$(window),$d=$(document);$(".cookiemonster a.close").on("click",function(e){e.preventDefault(),$(".cookiemonster").addClass("hide")}),$d.keypress(function(e){console.log(e.keyCode),103==e.keyCode&&($(".grid").toggleClass("active"),console.log("triggered"))}),$(".hidden").on("click",function(){$(this).removeClass("hidden"),$(".burger").addClass("active")}),$d.ready(function(){responsive_resize()}),$w.resize(function(){responsive_resize()}),$(".burger").on("click",function(){animMenuItems(!0)}),$(".menu .close").on("click",function(){animMenuItems(!1)});var lastScrollTop=0;if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||$(window).width()<499)console.log("is phone"),$("body").bind("touchmove",function(e){menuReveal()});else{console.log("is not phone"),$w.scroll($.throttle(100,menuReveal)),function(e){e.fn.visible=function(o){var s=e(this),n=e(window),l=n.scrollTop(),a=l+n.height(),i=s.offset().top+150,t=i+s.height(),d=o===!0?t:i,c=o===!0?i:t;return a>=c&&d>=l}}(jQuery);var allMods=$(".anim");allMods.each(function(e,o){var o=$(o);o.visible(!0)?o.addClass("already-visible"):o.css("opacity",0)}),$w.scroll(function(e){allMods.each(function(e,o){var o=$(o);o.visible(!0)&&o.addClass("come-in")})})}$w.load(function(){$(".hold").each(function(e,o){var s=$(this);setTimeout(function(){s.removeClass("hold")},200*e)})});