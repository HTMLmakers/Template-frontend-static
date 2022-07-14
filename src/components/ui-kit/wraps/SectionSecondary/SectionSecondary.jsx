import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";


const SectionSecondary = (props) => {
  const { size, colorTheme, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "section-secondary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      {props.children}
    </CustomTag>
  )
};

SectionSecondary.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.WHITE]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default SectionSecondary;
