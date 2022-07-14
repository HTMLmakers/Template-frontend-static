import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";


const MarkPrimary = (props) => {
  const { value, size, colorTheme, isMarkNotice, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "mark-primary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-mark-notice={isMarkNotice}
    >
      {value}
    </CustomTag>
  )
};

MarkPrimary.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.oneOf([DataAttrSize.XXL, DataAttrSize.XL, DataAttrSize.L, DataAttrSize.M, DataAttrSize.S, DataAttrSize.XS]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_DARK_SECONDARY,
    DataAttrColorTheme.GRAY_PRIMARY,
    DataAttrColorTheme.GRAY_TERTIARY,
    DataAttrColorTheme.ORANGE_PRIMARY,
  ]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  isMarkNotice: PropTypes.bool,
};

export default MarkPrimary;
