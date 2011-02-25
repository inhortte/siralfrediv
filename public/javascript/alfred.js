var covers = ['confetti', 'fulcrumical', 'stomp', 'devil', 'juice', 'upthecity', 'ondatra'];

(function($) {
    var cache = [];
    // Arguments are image paths relative to the current page.
    // arguments[0] is the path to be added to each image in arguments[1].
    $.preLoadImages = function() {
	var args_len = arguments[1].length;
	for (var i = args_len; i--;) {
	    var cacheImage = document.createElement('img');
	    cacheImage.src = arguments[0] + arguments[0][i];
	    cache.push(cacheImage);
	}
    }

    $.fadeOutIn = function() {
	$(this).fadeOut('slow');
    }

    $.changeHomePhoto = function(me) {
	$(me).attr('src', '/images/covers/' + covers[Math.floor(Math.random()*(covers.length))] + '.jpg');
    }
})(jQuery)

$(document).ready(function() {
    var pathname = window.location.pathname;
    if(pathname.substr(-4) == 'home') {
	jQuery.preLoadImages('images/covers/', covers);
    }
    var timer = setInterval(function () {
	var home_img = $("#home_img img");
	$.changeHomePhoto(home_img);
    }, 3000);
});
