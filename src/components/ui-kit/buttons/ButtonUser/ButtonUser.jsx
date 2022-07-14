import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import {AttrType, DataAttrSize, DataAttrState, DataAttrWidth} from "../../../../services/consts/common";


const ButtonUser = (props) => {
  const {
    size,
    width,
    additionalClass,
    textPrimary,
    textSecondary,
    placeBefore,
    placeAfter,
    state,
    customTagName,
    type = AttrType.BUTTON,
    ...next
  } = props;

  const CustomTag = replaceTag(`button`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, ``);

  const componentClasses = cn({
    "button-user": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-state={state}
               data-width={width}
               {...rest}
               {...next}
    >
      {placeBefore && placeBefore}

      {(textPrimary || textSecondary) && (
        <div className="button-user__content">
          {textSecondary && (<span className="button-user__text-secondary">{textSecondary}</span>)}

          {textPrimary && (<span className="button-user__text-primary">{textPrimary}</span>)}
        </div>
      )}

      {placeAfter && placeAfter}
    </CustomTag>
  )
};

ButtonUser.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L]),
  width: PropTypes.oneOf([DataAttrWidth.FULL_WIDTH]),
  additionalClass: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.HOVER, DataAttrState.ACTIVE, DataAttrState.DISABLED]),
  customTagName: PropTypes.string,
  type: PropTypes.oneOf([AttrType.BUTTON]),
};

export default ButtonUser;
