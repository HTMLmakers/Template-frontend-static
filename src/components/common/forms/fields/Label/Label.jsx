import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import {replaceTag} from "../../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../../services/consts/common";
import cn from "classnames";


const Label = (props) => {
  const { size, colorTheme, text, htmlFor, customTagName, additionalClass } = props;

  const CustomTag = replaceTag(`label`, customTagName);

  const componentClasses = cn({
    "label": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               htmlFor={htmlFor}
    >
      {text}
    </CustomTag>
  )
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.GRAY_PRIMARY, DataAttrColorTheme.BLUE_DARK_SECONDARY]),
  htmlFor: PropTypes.string,
  customTagName: PropTypes.string,
  additionalClass: PropTypes.string,
};

export default Label;
