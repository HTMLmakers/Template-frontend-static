import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";


const Heading = (props) => {
  const { text, level, size, colorTheme, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`h${level}`, customTagName);

  const componentClasses = cn({
    "heading": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-level={level}
               data-size={size}
               data-color-theme={colorTheme}
    >
      {text}
    </CustomTag>
  )
};

Heading.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  level: PropTypes.number,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_DARK_SECONDARY,
    DataAttrColorTheme.INHERIT
  ]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Heading;
