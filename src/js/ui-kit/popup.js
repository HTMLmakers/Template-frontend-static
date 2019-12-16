(($) => {
  const options = {
    closeExisting: true,
    smallBtn: false,
    toolbar: false,
    touch: false,
  };

  $('[data-uikit-popup-open]').on('click', function (ev) {
    const popupName = $(this).data('uikit-popup-open');

    ev.preventDefault();

    $.fancybox.open($(`[data-uikit-popup=${popupName}]`), options);
  });

  $('.popup__close').on('click', () => {
    $.fancybox.close();
  });
})(jQuery);
