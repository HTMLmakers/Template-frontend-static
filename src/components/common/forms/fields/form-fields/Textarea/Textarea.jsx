import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../../../services/utils/utils";
import {
  DataAttrColorTheme,
  DataAttrSize,
  DataAttrState,
  FieldValidateThemeName
} from "../../../../../../services/consts/common";


const Textarea = (props) => {
  const {
    size,
    colorTheme,
    state,
    placeholder = "Введите значение",
    id,
    name,
    customHeight,
    customTagName,
    additionalClass,
    ...rest } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "textarea": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               style={{height: customHeight}}
    >
      <textarea id={id || name} name={name} placeholder={placeholder} {...rest} />
    </CustomTag>
  )
};

Textarea.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.DEFAULT,
    FieldValidateThemeName.ERROR,
    FieldValidateThemeName.SUCCESS
  ]),
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.DISABLED]),
  customTagName: PropTypes.string,
};

export default Textarea;
