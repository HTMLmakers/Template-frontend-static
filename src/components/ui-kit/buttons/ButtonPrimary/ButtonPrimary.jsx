import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {AttrType, DataAttrColorTheme, DataAttrSize, DataAttrState, DataAttrWidth} from "../../../../services/consts/common";


const ButtonPrimary = (props) => {
  const {
    size,
    colorTheme,
    text,
    textValue,
    additionalClass,
    placeBefore,
    placeAfter,
    state,
    width,
    minWidth,
    isMarkNotice,
    customTagName,
    type = AttrType.BUTTON,
    isBeforeSeparator,
    href,
    handleClick,
    ...next
  } = props;

  const CustomTag = replaceTag(`button`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, href);


  const componentClasses = cn({
    "button-primary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               data-width={width}
               data-mark-notice={isMarkNotice}
               data-before-separator={isBeforeSeparator}
               style={{minWidth}}
               onClick={handleClick || null}
               {...rest}
               {...next}
    >
      {placeBefore && placeBefore}

      {(text || textValue) && (
        <span className="button-primary__text">
          {text}
          {textValue && (
            <span className="button-primary__text-value">
              {textValue}
            </span>
          )}
        </span>
      )}

      {placeAfter && placeAfter}
    </CustomTag>
  )
};

ButtonPrimary.propTypes = {
  text: PropTypes.string,
  textValue: PropTypes.string,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_PRIMARY,
    DataAttrColorTheme.BLUE_SECONDARY,
    DataAttrColorTheme.GRAY_PRIMARY,
    DataAttrColorTheme.GRAY_QUATERNARY,
    DataAttrColorTheme.WHITE_PRIMARY,
    DataAttrColorTheme.WHITE_SECONDARY,
    DataAttrColorTheme.RED_PRIMARY,
    DataAttrColorTheme.ORANGE_PRIMARY_LIGHT
  ]),
  additionalClass: PropTypes.string,
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.HOVER, DataAttrState.ACTIVE, DataAttrState.DISABLED]),
  width: PropTypes.oneOf([DataAttrWidth.FULL_WIDTH]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customTagName: PropTypes.string,
  type: PropTypes.oneOf([AttrType.BUTTON, AttrType.SUBMIT]),
  href: PropTypes.string,
  handleClick: PropTypes.func,
  isMarkNotice: PropTypes.bool,
  isBeforeSeparator: PropTypes.bool,
};

export default ButtonPrimary;
