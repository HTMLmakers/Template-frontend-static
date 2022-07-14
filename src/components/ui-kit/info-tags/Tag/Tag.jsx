import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";


const Tag = (props) => {
  const { text, size, colorTheme, placeBefore, placeAfter, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "tag": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      {placeBefore && placeBefore}

      <span className="tag__text">{text}</span>

      {placeAfter && placeAfter}
    </CustomTag>
  )
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.GRAY_TERTIARY,
    DataAttrColorTheme.GRAY_TERTIARY_LIGHT,
    DataAttrColorTheme.BLUE_PRIMARY_LIGHT,
    DataAttrColorTheme.RED_PRIMARY_LIGHT,
    DataAttrColorTheme.GREEN_PRIMARY,
  ]),
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Tag;
