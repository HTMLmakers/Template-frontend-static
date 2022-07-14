import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import cn from "classnames";

export const DataAttrType = {
  LIGHT: `light`,
  EXTRALIGHT: `extralight`,
};


const Status = (props) => {
  const { text, size, colorTheme, placeBefore, placeAfter, additionalClass, customTagName, type } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "status": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-type={type}
    >
      {(placeBefore && (type !== DataAttrType.LIGHT)) && placeBefore}

      {text && (<span className="status__text">{text}</span>)}

      {(placeAfter && (type !== DataAttrType.LIGHT)) && placeAfter}
    </CustomTag>
  )
};

Status.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_PRIMARY_LIGHT,
    DataAttrColorTheme.ORANGE_PRIMARY_LIGHT,
    DataAttrColorTheme.VELVET_PRIMARY_LIGHT,
    DataAttrColorTheme.GRAY_SECONDARY_LIGHT,
    DataAttrColorTheme.GREEN_PRIMARY_LIGHT,
    DataAttrColorTheme.RED_PRIMARY_LIGHT,
    DataAttrColorTheme.YELLOW_PRIMARY_LIGHT,
  ]),
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  type: PropTypes.oneOf([DataAttrType.LIGHT, DataAttrType.EXTRALIGHT]),
};

export default Status;
