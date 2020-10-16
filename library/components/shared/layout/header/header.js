//  ==========================================================================
//  Component header
//  ==========================================================================

$(document).ready(() => {
  const $header = $('.header');

  $(window).on('scroll', () => {
    if ($(this).scrollTop() > 0) {
      $header.addClass('header--fixed');
    } else {
      $header.removeClass('header--fixed');
    }
  });
});
