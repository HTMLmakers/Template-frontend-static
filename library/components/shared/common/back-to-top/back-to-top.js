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
