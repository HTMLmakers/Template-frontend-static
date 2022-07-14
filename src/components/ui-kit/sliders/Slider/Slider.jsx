import React from "react";
import SlickSlider from "react-slick";
import cn from "classnames";
import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {ReactComponent as IconArrowsOne16} from "../../../../assets/img/icons/svg/16/icon-arrows-one-16.svg";

import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";

import Icon from "../../icons/Icon/Icon";
import IconWrap from "../../icons/IconWrap/IconWrap";


const SampleArrow = (props) => {
  const { className, onClick, iconSrc } = props;

  return (
    <IconWrap size={DataAttrSize.S}
              additionalClass={className}
              colorTheme={DataAttrColorTheme.GRAY}
              icon={<Icon size={DataAttrSize.L}
                          colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                          icon={iconSrc ? iconSrc : <IconArrowsOne16 />} />
              }
              handleClick={onClick}
    />
  )
};

const defaultSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 4560,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 1680,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
      }
    },
  ],
};


const Slider = React.forwardRef((props, ref) => {
  const { additionalClass, arrowIconSrc, ...rest } = props;

  const componentClasses = cn({
    "slider": true,
    [additionalClass]: additionalClass,
  });

  return (
    <div className={componentClasses}>
      <SlickSlider nextArrow={<SampleArrow iconSrc={arrowIconSrc} />}
                   prevArrow={<SampleArrow iconSrc={arrowIconSrc} />}
                   ref={ref}
                   {...defaultSettings}
                   {...rest}
      >
        {props.children}
      </SlickSlider>
    </div>
  )
});

Slider.propTypes = {
  additionalClass: PropTypes.string,
  arrowIconSrc: PropTypes.node,
};

export default Slider;
