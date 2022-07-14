import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {AttrType, DataAttrColorTheme, DataAttrSize, DataAttrState} from "../../../../services/consts/common";


const LinkSecondary = (props) => {
  const {
    text,
    size,
    colorTheme,
    placeBefore,
    placeAfter,
    state,
    type = AttrType.BUTTON,
    additionalClass,
    customTagName,
    href,
    handleClick,
  } = props;

  const CustomTag = replaceTag(`a`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, href);

  const componentClasses = cn({
    "link-secondary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               onClick={handleClick || null}
               {...rest}
    >
      {placeBefore && placeBefore}

      <span className="link-secondary__text">{text}</span>

      {placeAfter && placeAfter}
    </CustomTag>
  )
};

LinkSecondary.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.GRAY_PRIMARY]),
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.HOVER, DataAttrState.ACTIVE, DataAttrState.DISABLED]),
  isUnderline: PropTypes.bool,
  type: PropTypes.oneOf([AttrType.BUTTON, AttrType.SUBMIT]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  href: PropTypes.string,
  handleClick: PropTypes.func,
};

export default LinkSecondary;
