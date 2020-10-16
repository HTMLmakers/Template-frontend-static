import { defaultOptions, SliderSlick } from './slider-slick.class';

$(document).ready(() => {
  const $sliderContainer = $('[data-ui-kit--slider-container]');

  $sliderContainer.each((index, el) => {
    const $container = $(el);
    const $slider = $container.find('[data-ui-kit--slider-list]');
    const $buttonNext = $container.find('[data-ui-kit--slider-next-button]');
    const $buttonPrev = $container.find('[data-ui-kit--slider-prev-button]');
    const options = $slider.data('ui-kit--slider-options');

    defaultOptions.appendDots = $container.find('[data-ui-kit--slider-pagination]');

    const slider = new SliderSlick(
      $slider,
      { ...defaultOptions, ...options },
    );

    slider.init();
    $buttonNext.on('click', () => {
      slider.next();
    });
    $buttonPrev.on('click', () => {
      slider.prev();
    });
  });
});
