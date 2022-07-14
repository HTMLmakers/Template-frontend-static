import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize, DataAttrSvgType} from "../../../../services/consts/common";


const Icon = (props) => {
  const {
    icon,
    size,
    colorTheme,
    type = DataAttrSvgType.FILL,
    additionalClass,
    customTagName,
    handleClick,
    ...rest
  } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "icon-svg": true,
    [additionalClass]: additionalClass,
  });

  const handleClickIcon = (e) => {
    e.stopPropagation();
    handleClick();
  };

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-type={type}
               onClick={(e) => handleClick ? handleClickIcon(e) : null}
               {...rest}
    >
      {icon}
    </CustomTag>
  )
};

Icon.propTypes = {
  icon: PropTypes.element.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S, DataAttrSize.XS]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.DEFAULT,
    DataAttrColorTheme.WHITE,
    DataAttrColorTheme.BLUE_PRIMARY,
    DataAttrColorTheme.BLUE_LIGHT_PRIMARY,
    DataAttrColorTheme.BLUE_DARK_PRIMARY,
    DataAttrColorTheme.ORANGE_PRIMARY,
    DataAttrColorTheme.YELLOW_PRIMARY,
    DataAttrColorTheme.GREEN_PRIMARY,
    DataAttrColorTheme.AZURE_PRIMARY,
    DataAttrColorTheme.VELVET_PRIMARY,
    DataAttrColorTheme.RED_PRIMARY,
  ]),
  type: PropTypes.oneOf([DataAttrSvgType.FILL, DataAttrSvgType.STROKE]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Icon;
