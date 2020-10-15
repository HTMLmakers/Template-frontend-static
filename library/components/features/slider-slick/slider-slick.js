import { SliderSlick } from '../../../js/ui-kit/slider/slider-slick/slider-slick.class';

$(document).ready(() => {
  const slider = new SliderSlick(
    $('.slider-slick__list'),
    {
      fade: false,
      appendDots: $('.slider-slick__pagination'),
    },
  );

  slider.init();
  $('.slider-slick-arrow__next').on('click', () => {
    slider.next();
  });
  $('.slider-slick-arrow__prev').on('click', () => {
    slider.prev();
  });
});
