(($) => {
  $('.form-field').each((index, el) => {
    init($(el), $(el).find('.focus, input, textarea, select'));
  });

  function init($el, $area) {
    const $formField = $el;
    const $formFieldArea = $area;

    $formFieldArea.on('focus', () => {
      setFocusState($formField);

      console.log('focus');
    });

    $formFieldArea.on('blur', () => {
      setBlurState($formField);
    });

    setFilledState($formFieldArea, $formField);
    $formFieldArea.on('keyup', () => {
      setFilledState($formFieldArea, $formField);
    });
  }

  function setFocusState($field) {
    $field.addClass('form-field--is-focused');
  }

  function setBlurState($field) {
    $field.removeClass('form-field--is-focused');
  }

  function setFilledState($area, $field) {
    if ($area.val()) {
      $field.addClass('form-field--is-filled');
    } else {
      $field.removeClass('form-field--is-filled');
    }
  }
})(jQuery);
