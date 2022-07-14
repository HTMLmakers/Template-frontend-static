import { SliderSlick } from '../../../js/ui-kit/slider/slider-slick/slider-slick.class';
import { PopupFancybox } from '../../../js/ui-kit/popup/popup-fancybox/popup-fancybox.class';

$(document).ready(() => {
  const slider = new SliderSlick(
    $('.slider-slick__list'),
    {
      fade: false,
      appendDots: $('.slider-slick__pagination'),
    },
  );
  const popup = new PopupFancybox(
    $('.slider-slick__popup'),
    {
      beforeShow() {
        console.log('beforeShow');
      },
      afterShow() {
        console.log('afterShow');
      },
    },
  );

  slider.init();
  $('.slider-slick-arrow__next').on('click', () => {
    slider.next();
  });
  $('.slider-slick-arrow__prev').on('click', () => {
    slider.prev();
  });

  $('.slider-slick__button').on('click', () => {
    popup.open();
  });
});
