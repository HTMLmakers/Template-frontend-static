//  ==========================================================================
//  Component header-fixed
//  ==========================================================================

$(document).ready(() => {
  const $headerFixed = $('.header-fixed');

  $(window).on('scroll', () => {
    if ($(this).scrollTop() > 100) {
      $headerFixed.addClass('header-fixed--visible');
    } else {
      $headerFixed.removeClass('header-fixed--visible');
    }
  });
});
