/* jshint devel:true */
console.log('\'Allo \'Allo!');

$('.cookiemonster a.close').on('click', function(e){
	e.preventDefault();
	$('.cookiemonster').addClass('hide');
});