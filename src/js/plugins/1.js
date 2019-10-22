// fixed Section
function fixedSection(){
	var itemTarget = $('.nav-global');
	var itemActive = $('.header__section.mod_theme__fixed');

	var scrollTrigger = itemTarget.offset().top + itemTarget.height();

	$(window).on('scroll', function() {
		if($(window).scrollTop() >= scrollTrigger ) {
			itemActive.addClass('is_active');
		}
		else {
			itemActive.removeClass('is_active');
		}


	}).trigger('scroll');
}