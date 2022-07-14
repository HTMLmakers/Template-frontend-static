import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {AttrType, DataAttrColorTheme, DataAttrSize, DataAttrState} from "../../../../services/consts/common";


const LinkTertiary = (props) => {
  const {
    text,
    size,
    colorTheme,
    placeAfter,
    state,
    type = AttrType.BUTTON,
    href,
    additionalClass,
    customTagName,
    handleClick,
  } = props;

  const CustomTag = replaceTag(`a`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, href);

  const componentClasses = cn({
    "link-tertiary": true,
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
      <span className="link-tertiary__text">{text}</span>

      {placeAfter && (<span className="link-tertiary__place-after">{placeAfter}</span>)}
    </CustomTag>
  )
};

LinkTertiary.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_DARK_SECONDARY,
    DataAttrColorTheme.GRAY_PRIMARY,
  ]),
  placeAfter: PropTypes.node,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.HOVER, DataAttrState.ACTIVE, DataAttrState.DISABLED]),
  type: PropTypes.oneOf([AttrType.BUTTON, AttrType.SUBMIT]),
  href: PropTypes.string,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  handleClick: PropTypes.func,
};

export default LinkTertiary;
