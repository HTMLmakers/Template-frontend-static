//* ==========================================================================
//  Component back-to-top
//  ==========================================================================

$(document).ready(() => {
  const $backToTop = $('.back-to-top');

  $(window).on('scroll', () => {
    if ($(this).scrollTop() > 100) {
      $backToTop.addClass('back-to-top--is-visible');
    } else {
      $backToTop.removeClass('back-to-top--is-visible');
    }
  });

  $backToTop.on('click', () => {
    $('body,html').animate({
      scrollTop: 0,
    }, 800);

    return false;
  });
});
