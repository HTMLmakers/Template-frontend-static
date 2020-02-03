(($) => {
  const $toggle = $('.toggle');
  //const $toggleInfluence = $('.class');

  $toggle.on('click', () => {
    $toggle.toggleClass('toggle--is-active');
    //$toggleInfluence.toggleClass('mod');
  });
})(jQuery);
