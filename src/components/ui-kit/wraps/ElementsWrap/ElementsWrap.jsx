import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrSize, ElementPosition} from "../../../../services/consts/common";


const ElementsWrap = (props) => {
  const { size, direction = "horizontal", isNoWrap, align = ElementPosition.LEFT, additionalClass, customTagName } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "elements-wrap": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-direction={direction}
               data-align={align}
               data-nowrap={isNoWrap}
    >
      {props.children}
    </CustomTag>
  )
};

ElementsWrap.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  direction: PropTypes.string,
  align: PropTypes.oneOf([ElementPosition.LEFT, ElementPosition.CENTER, ElementPosition.RIGHT]),
  isNoWrap: PropTypes.bool,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default ElementsWrap;
