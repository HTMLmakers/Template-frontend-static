import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";

const IconWrap = (props) => {
  const { size, colorTheme, icon, isMarkNotice, additionalClass, customTagName, handleClick, ...rest } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "icon-wrap": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-mark-notice={isMarkNotice}
               onClick={handleClick || null}
               {...rest}
    >
      {icon}
    </CustomTag>
  )
};

IconWrap.propTypes = {
  icon: PropTypes.element.isRequired,
  size: PropTypes.oneOf([DataAttrSize.XL, DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.GRAY_PRIMARY_LIGHT,
    DataAttrColorTheme.GRAY_SECONDARY,
    DataAttrColorTheme.GRAY_TERTIARY,
    DataAttrColorTheme.GRAY_QUATERNARY,
    DataAttrColorTheme.BLUE_DARK_SECONDARY,
    DataAttrColorTheme.GREEN_PRIMARY,
    DataAttrColorTheme.ORANGE_PRIMARY,
    DataAttrColorTheme.RED_PRIMARY,
    DataAttrColorTheme.VELVET_PRIMARY,
  ]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  isMarkNotice: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default IconWrap;
