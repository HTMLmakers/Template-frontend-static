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
import Label from "../../Label/Label";


const RadioButton = (props) => {
  const { size, colorTheme, id, name, label,  state, customTagName, additionalClass, ...rest } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "radio-button": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
    >
      <label className="radio-button__wrap">
        <input type="radio" id={id} name={name} defaultChecked={Boolean(props.value)} {...rest} />
        <span className="radio-button__custom"/>
        {label && (<Label text={label} customTagName="span" />)}
      </label>
    </CustomTag>
  )
};

RadioButton.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.DEFAULT,
    FieldValidateThemeName.ERROR,
    FieldValidateThemeName.SUCCESS
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  state: PropTypes.oneOf([
    DataAttrState.FOCUS,
    DataAttrState.HOVER,
    DataAttrState.DISABLED,
    DataAttrState.CHECKED
  ]),
  customTagName: PropTypes.string,
  additionalClass: PropTypes.string,
};

export default RadioButton;
