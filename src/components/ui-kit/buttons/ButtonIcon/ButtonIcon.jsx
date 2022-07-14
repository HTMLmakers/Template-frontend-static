import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {AttrType, DataAttrState} from "../../../../services/consts/common";


const ButtonIcon = (props) => {
  const { additionalClass, placePic, state, customTagName, type = AttrType.BUTTON, ...next } = props;
  const CustomTag = replaceTag(`button`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, ``);

  const componentClasses = cn({
    "button-icon": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-state={state}
               {...rest}
               {...next}
    >
      {placePic}
    </CustomTag>
  )
};

ButtonIcon.propTypes = {
  additionalClass: PropTypes.string,
  placePic: PropTypes.node,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.HOVER, DataAttrState.ACTIVE, DataAttrState.DISABLED]),
  customTagName: PropTypes.string,
  type: PropTypes.oneOf([AttrType.BUTTON]),
};

export default ButtonIcon;
