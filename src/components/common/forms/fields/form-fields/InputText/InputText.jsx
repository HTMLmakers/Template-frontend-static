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


const InputText = (props) => {
  const {
    size,
    colorTheme,
    id,
    name,
    type = `text`,
    placeBefore,
    placeAfter,
    placeholder = "Введите значение",
    state,
    customTagName,
    handleClick,
    additionalClass,
    ...rest
  } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "input-text": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               onClick={handleClick || null}
    >
      {placeBefore && (
        <span className="input-text__place-before">
          {placeBefore}
        </span>
      )}

      <input type={type} id={id || name} name={name} placeholder={placeholder} {...rest}/>

      {placeAfter && (
        <span className="input-text__place-after">
          {placeAfter}
        </span>
      )}
    </CustomTag>
  )
};

InputText.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.DEFAULT,
    FieldValidateThemeName.ERROR,
    FieldValidateThemeName.SUCCESS
  ]),
  placeBefore: PropTypes.node,
  placeAfter: PropTypes.node,
  placeholder: PropTypes.string,
  state: PropTypes.oneOf([DataAttrState.FOCUS, DataAttrState.DISABLED]),
  customTagName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  handleClick: PropTypes.func,
};

export default InputText;
