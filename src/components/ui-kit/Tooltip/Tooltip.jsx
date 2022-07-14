import React from "react";
import PropTypes from "prop-types";
import Tippy from '@tippyjs/react';
import cn from "classnames";

import 'tippy.js/dist/tippy.css';
import "./styles.scss";

import {DataAttrColorTheme, DataAttrSize, ElementPosition} from "../../../services/consts/common";
import {replaceTag} from "../../../services/utils/utils";
import Icon from "../icons/Icon/Icon";
import ButtonIcon from "../buttons/ButtonIcon/ButtonIcon";

import {ReactComponent as IconClose24} from "../../../assets/img/icons/svg/24/icon-close-24.svg";

//TODO: props isNoWrap будет означать что триггер будет без обертки, но нужно будет от чилдрена передавать ссылку
// на элемент через forwardRef

const Tooltip = (props) => {
  const { text, size, colorTheme, position, isClickable, additionalClass, customTagName, ...rest } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "tooltip": true,
    [additionalClass]: additionalClass,
  });

  const customTooltip = (size, colorTheme, type, text) => {
    return (
      <CustomTag className={componentClasses}
                 data-size={size}
                 data-color-theme={colorTheme}
                 data-behavior={type}
                 {...rest}
      >
        <div className="tooltip__content">
          {text}
        </div>
        <ButtonIcon placePic={<Icon size={DataAttrSize.M} icon={<IconClose24 />} />}/>
      </CustomTag>
    )
  };

  return (
    <Tippy content={customTooltip(size, colorTheme, isClickable ? `click` : `hover`, text)}
           trigger={isClickable ? `click` : `mouseenter focus`}
           placement={position || ElementPosition.TOP}
           theme={`${colorTheme}`}
           appendTo={() => document.body}
           interactive={isClickable} // - возможность навести на тултип и взаимодействовать с содержимым
           hideOnClick={!isClickable} //- закрыть только по клику на триггер
           onShow={(instance) => {
             instance.popper.querySelector(`.button-icon`)
             .addEventListener('click', () => instance.hide());
           }}
           maxWidth={'none'}
    >
      <div className="tooltip-trigger">{props.children}</div>
    </Tippy>
  )
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf([
    ElementPosition.LEFT,
    ElementPosition.TOP,
    ElementPosition.BOTTOM,
    ElementPosition.RIGHT
  ]),
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_PRIMARY,
    DataAttrColorTheme.WHITE,
    DataAttrColorTheme.ORANGE_PRIMARY
  ]),
  isClickable: PropTypes.bool,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Tooltip;
