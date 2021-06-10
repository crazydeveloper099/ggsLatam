// Gem descriptions
var gems = [{
img:'https://uhdwallpapers.xyz/media/images/800x/2020/09/01/call-of-duty-black-ops-ii-wallpaper-7801301598944044.jpg',	name: 'Amethyst', desc: 'The amethyst, considered the highest level crafting stone, aliquam dolores et eum. Et facilisis iracundia usu, an integre noluisse eos, ea eum quod error appetere.'},
		   {img:'https://uhdwallpapers.xyz/media/images/800x/2020/07/22/call-of-duty-mobile-season-8-hd-wallpaper-9404271595436953.jpg',name: 'Ruby', desc: 'This polished ruby gem adds fire damage vel zril epicurei expetendis te, nec ea vidisse bonorum.'},
			{img:'https://uhdwallpapers.xyz/media/images/800x/2020/07/13/call-of-duty-mobile-season-7-4k-hd-wallpaper-3055111594617272.jpg',name: 'Topaz', desc: 'Topaz, mined from the crust of the underworld, dolores et eum. Et facilisis iracundia usu, an integre noluisse eos.'},
			{img:'https://uhdwallpapers.xyz/media/images/800x/2020/04/02/call-of-duty-warzone-4k-5k-wallpaper-6049061585840848.jpg',name: 'Emerald', desc: 'The basic emerald is not very exciting, but ea eum quod error appetere. At scribentur disputationi pro, cu quot tota singulis per.'}];

$('.content .header').html(gems[0].name);
$('.content .description').html(gems[0].desc)

var numSlides;
var $carousel = $('.carousel');

$carousel.on('beforeChange', function(event, slick, currentSlide, newSlide) {
	if (newSlide !== currentSlide) {
		$('.itemContent').animate({ opacity: 0}, 150);
	}
}).on('afterChange', function(event, slick, currentSlide) {
	$('.item-content').animate({ opacity: 1}, 150);
	$('.content .header').html(gems[currentSlide].name);
	$('.content .description').html(gems[currentSlide].desc);
	$('.content .imgBackground').prop("src",gems[currentSlide].img) ;

}).on('init', function(event, slick) {
	numSlides = slick.slideCount;
});

$carousel.slick({
	infinite: false,
	vertical: true,
	verticalSwiping: true,
	centerPadding: '40px',
	speed: 200,
	focusOnSelect: true,
	arrows: false
});

// Up/down arrows
$('html').keydown(function(event) {
	var currentSlide = $carousel.slick('slickCurrentSlide');
	
	// Up
	if (event.keyCode === 40 && currentSlide !== 0) {
		$carousel.slick("slickPrev");
	}
	else if (event.keyCode === 38 && numSlides - 1 !== currentSlide) {
		$carousel.slick("slickNext");
	}
});