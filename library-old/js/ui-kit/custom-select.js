(($) => {
  const $select = $('.form-field__custom-select');

  $select.selectize({
    onChange() {
      // for jQuery Validation Plugin
      $select.focus().trigger('click');
    },
  });
})(jQuery);
