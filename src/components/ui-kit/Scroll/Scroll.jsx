import React from "react";
import Scrollbar from "react-scrollbars-custom";
import cn from "classnames";
import PropTypes from "prop-types";

import "./styles.scss";
import {replaceTag} from "../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";


const Scroll = (props) => {
  const { size, colorTheme, additionalClass, customTagName } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "scroll": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      <Scrollbar translateContentSizeYToHolder={true} {...props}>
        {props.children}
      </Scrollbar>
    </CustomTag>
  )
};

Scroll.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.GRAY_SECONDARY]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
}

export default Scroll;
