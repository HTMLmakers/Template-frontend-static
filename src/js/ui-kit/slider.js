(($) => {
  const options = {
    mode: 'fade',
    slideWidth: 0,
    controls: false,
    responsive: true,
    pagerSelector: '.slider__pagination',
  };

  const slider = $('.slider__list').bxSlider(options);

  $('.slider__next').on('click', () => {
    slider.goToNextSlide();
  });

  $('.slider__prev').on('click', () => {
    slider.goToPrevSlide();
  });
})(jQuery);
