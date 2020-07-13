(($) => {
  const options = {
    closeExisting: true,
    smallBtn: false,
    toolbar: false,
    touch: false,
  };

  $('[data-uikit-popup-open]').on('click', function (ev) {

    ev.preventDefault();

    const popupName = $(this).data('uikit-popup-open');

    $.fancybox.open($(`[data-uikit-popup=${popupName}]`), options);

    $('.control-close').on('click', () => {
      $.fancybox.close();
    });
  });
})(jQuery);

(($) => {
  const options = {
    default: {
      arrows: false,
      dots: true,
      fade: true,
      speed: 2000,
      autoplay: true
    },
    // 'slider-name-1': {
    //   dots: false,
    //   fade: false
    // }
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

(($) => {
  const options = {
    default: {
      arrows: false,
      dots: true
    },
    'carusel-name-1': {
      slidesToShow: 4
    },
    'carusel-name-2': {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  };

  const $caruselContainer = $('[data-uikit-carusel-container]');

  $caruselContainer.each(function(index, el) {
    const $container = $(el);
    const $carusel = $container.find('[data-uikit-carusel]');
    const $buttonPrev = $container.find('.control-arrow--prev');
    const $buttonNext = $container.find('.control-arrow--next');
    const $pagination = $container.find('.control-pagination');

    options.default.appendDots = $pagination;
    $carusel.slick({...options.default, ...options[$carusel.data('uikit-carusel')]});

    $buttonNext.on('click', function () {
      $carusel.slick('slickNext');
    });
    $buttonPrev.on('click', function () {
      $carusel.slick('slickPrev');
    });

  });
})(jQuery);

(($) => {

  $('[data-uikit-go-to-anchor]').on('click', function (ev) {
    ev.preventDefault();

    const offset = 0;
    const $window = $(window);
    const sectionAnchor = $(this).data('uikit-go-to-anchor');
    const $sectionTarget = $(`[data-uikit-go-to-target=${sectionAnchor}]`);
    const destination = $sectionTarget.offset().top - offset;

    $('html, body').animate({
      scrollTop: destination,
    }, {
      queue: true,
      duration: 800,
      //easing: 'easeOutQuad',

      start: function() {
        $window.bind('mousewheel', function(event) {
          event.preventDefault();
        });
      },

      complete: function() {
        $window.unbind('mousewheel');
      }
    });
  });
})(jQuery);
