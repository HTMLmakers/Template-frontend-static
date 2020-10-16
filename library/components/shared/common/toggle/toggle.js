//* ==========================================================================
//  Component toggle
//  ==========================================================================

$(document).ready(() => {
  const $toggle = $('.toggle');

  $toggle.on('click', () => {
    $toggle.toggleClass('toggle--is-active');
  });
});
