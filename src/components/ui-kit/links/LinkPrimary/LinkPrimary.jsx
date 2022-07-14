import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {AttrType, DataAttrColorTheme, DataAttrSize, DataAttrState} from "../../../../services/consts/common";


const LinkPrimary = (props) => {
  const {
    text,
    size,
    colorTheme,
    placeBefore,
    placeAfter,
    state,
    isUnderline,
    type = AttrType.BUTTON,
    additionalClass,
    customTagName,
    href,
    handleClick,
  } = props;

  const CustomTag = replaceTag(`a`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, href);

  const componentClasses = cn({
    "link-primary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               data-underline={isUnderline}
               onClick={handleClick || null}
               {...rest}
    >
      {placeBefore && placeBefore}

      <span className="link-primary__text">{text}</span>

      {placeAfter && placeAfter}
    </CustomTag>
  )
};

LinkPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_LIGHT_PRIMARY,
    DataAttrColorTheme.GRAY_PRIMARY,
    DataAttrColorTheme.BLUE_PRIMARY,
  ]),
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

export default LinkPrimary;
