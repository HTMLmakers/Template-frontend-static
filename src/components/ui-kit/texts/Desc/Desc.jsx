import React from "react";
import PropTypes from "prop-types";
import cn from "classnames"

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";


const Desc = (props) => {
  const { text, size, colorTheme, weight, additionalClass, customTagName, ...rest } = props;
  const CustomTag = replaceTag(`p`, customTagName);

  const componentClasses = cn({
    "desc": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-weight={weight}
               {...rest}
    >
      {text}
    </CustomTag>
  )
};

Desc.propTypes = {
  text: PropTypes.node.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S, DataAttrSize.XS]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_DARK_SECONDARY,
    DataAttrColorTheme.GRAY_PRIMARY,
    DataAttrColorTheme.INHERIT
  ]),
  weight: PropTypes.string,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Desc;
