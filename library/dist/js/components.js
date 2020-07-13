//  ==========================================================================
//  Component header
//  ==========================================================================

(($) => {
  const $header = $('.header');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $header.addClass('header--fixed');
    } else {
      $header.removeClass('header--fixed');
    }
  });

})(jQuery);

//  ==========================================================================
//  Component header-fixed
//  ==========================================================================

(($) => {
  const $headerFixed = $('.header-fixed');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $headerFixed.addClass('header-fixed--visible');
    } else {
      $headerFixed.removeClass('header-fixed--visible');
    }
  });

})(jQuery);

//* ==========================================================================
//  Component back-to-top
//  ==========================================================================

(($) => {
  const $backToTop = $('.back-to-top');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $backToTop.addClass('back-to-top--is-visible');
    } else {
      $backToTop.removeClass('back-to-top--is-visible');
    }
  });
  $backToTop.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

})(jQuery);

(($) => {
  const $toggle = $('.toggle');
  //const $toggleInfluence = $('.class');

  $toggle.on('click', () => {
    $toggle.toggleClass('toggle--is-active');
    //$toggleInfluence.toggleClass('mod');
  });
})(jQuery);
