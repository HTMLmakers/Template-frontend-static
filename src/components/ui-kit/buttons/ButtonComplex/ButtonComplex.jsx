import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {
  AttrType,
  DataAttrColorTheme,
  DataAttrSize,
  DataAttrState,
  DataAttrWidth
} from "../../../../services/consts/common";


const ButtonComplex = (props) => {
  const {
    textPrimary,
    textSecondary,
    size,
    colorTheme,
    additionalClass,
    placeBefore,
    placeAfter,
    state,
    width,
    customTagName,
    type = AttrType.BUTTON,
    href,
    handleClick,
    ...next
  } = props;

  const CustomTag = replaceTag(`button`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, href);

  const componentClasses = cn({
    "button-complex": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               data-width={width}
               onClick={handleClick || null}
               {...rest}
               {...next}
    >
      {placeBefore && (<div className="button-complex__icon">{placeBefore}</div>)}

      {(textPrimary || textSecondary) && (
        <div className="button-complex__content">
          {textPrimary && (<span className="button-complex__text-primary">{textPrimary}</span>)}
          {textSecondary && (<span className="button-complex__text-secondary">{textSecondary}</span>)}
        </div>
      )}

      {placeAfter && (<div className="button-complex__icon">{placeAfter}</div>)}
    </CustomTag>
  )
};

ButtonComplex.propTypes = {
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.BLUE_PRIMARY, DataAttrColorTheme.RED_PRIMARY]),
  additionalClass: PropTypes.string,
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.HOVER, DataAttrState.ACTIVE, DataAttrState.DISABLED]),
  width: PropTypes.oneOf([DataAttrWidth.FULL_WIDTH]),
  customTagName: PropTypes.string,
  type: PropTypes.oneOf([AttrType.BUTTON, AttrType.SUBMIT]),
  href: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ButtonComplex;
