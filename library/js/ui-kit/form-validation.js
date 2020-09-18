(($) => {
  const $form = $('.form');

  const messages = {
    required: 'Данное поле обязательно для заполнения!',
    success: 'Успешно!',
  };

  $form.each((index, el) => {
    $(el).validate({
      rules: {
        your_input: {
          required: true,
        },
        your_checkbox: {
          required: true,
        },
        your_select: {
          required: true,
        },
        your_select2: {
          required: true,
        },
      },
      messages: {
        your_input: {
          required: messages.required,
        },
        your_checkbox: {
          required: messages.required,
        },
        your_select: {
          required: messages.required,
        },
        your_select2: {
          required: messages.required,
        },
      },
      errorElement: 'span',
      errorClass: 'form-field__message form-field__message--error',
      errorPlacement(error, element) {
        const $field = $(element).parents('.form-field');

        error.appendTo($field);
      },
      highlight(element) {
        const $field = $(element).parents('.form-field');
        const $message = $field.find('.form-field__message');

        setErrorState($field, $message);
      },
      unhighlight(element) {
        const $field = $(element).parents('.form-field');
        const $message = $field.find('.form-field__message');

        setSuccessState($field, $message);
      },
      // for Selectize Plugin
      ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input',
    });
  });

  function setErrorState($field, $message) {
    $field
      .addClass('form-field--is-error')
      .removeClass('form-field--is--success');
    $message
      .addClass('form-field__message--error')
      .removeClass('form-field__message--success');
  }

  function setSuccessState($field, $message) {
    $field
      .addClass('form-field--is--success')
      .removeClass('form-field--is-error');
    $message
      .addClass('form-field__message--success')
      .removeClass('form-field__message--error');

    setTimeout(() => $message.show().text(messages.success));
  }
})(jQuery);
