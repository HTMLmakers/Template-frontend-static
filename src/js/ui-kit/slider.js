(($) => {
  const options = {
    default: {
      arrows: false,
      dots: true,
      fade: true,
      speed: 2000,
      autoplay: true
    },
    'slider': {
      ...this.default
    }
    //,
    //'slider-name-1': {
    //
    //}
  };

  const $sliderContainer = $('[data-uikit-slider-container]');

  $sliderContainer.each(function(index, el) {
    const $container = $(el);
    const $slider = $container.find('[data-uikit-slider]');
    const $buttonPrev = $container.find('.control-arrow--prev');
    const $buttonNext = $container.find('.control-arrow--next');
    const $pagination = $container.find('.control-pagination');

    options.default.appendDots = $pagination;
    $slider.slick({...options.default, ...options[$slider.data('uikit-slider')]});

    $buttonNext.on('click', function () {
      $slider.slick('slickNext');
    });
    $buttonPrev.on('click', function () {
      $slider.slick('slickPrev');
    });

  });
})(jQuery);
