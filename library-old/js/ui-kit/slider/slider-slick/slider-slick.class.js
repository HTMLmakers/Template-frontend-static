export const defaultOptions = {
  arrows: false,
  dots: true,
  fade: true,
  speed: 2000,
  autoplay: true,
};

export class SliderSlick {
  constructor($slider, options) {
    this.$slider = $slider;
    this.options = options;
  }

  init() {
    this.$slider.slick({ ...defaultOptions, ...this.options });
  }

  next() {
    this.$slider.slick('slickNext');
  }

  prev() {
    this.$slider.slick('slickPrev');
  }
}
