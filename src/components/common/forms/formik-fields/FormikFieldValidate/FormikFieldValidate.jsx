import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";


import Desc from "../../../../ui-kit/texts/Desc/Desc";
import {DataAttrColorTheme, FieldValidateThemeName} from "../../../../../services/consts/common";

const getFormFieldColorTheme = (isTouched, fieldError, isFindError) => {
  if (isTouched && fieldError) return FieldValidateThemeName.ERROR;
  if (isTouched && !fieldError && isFindError) return FieldValidateThemeName.SUCCESS;
  return null;
};

/**
 * Общее описание компонента.
 * Принимает children Field для отображения валидации поля с подсветкой Field и выводом текстового сообщения.
 *
 * @param props.fieldMeta {object} fieldMeta - Метаданные Field.
 *
 * @returns {node} - JSX
 * */

const FormikFieldValidate = (props) => {
  const { fieldMeta, id, isHideFieldValidateMessage } = props;

  const [isFindError, setIsFindError] = useState(false);

  useEffect(() => {
    if (fieldMeta?.error && fieldMeta?.touched) setIsFindError(true);
  }, [fieldMeta])

  const colorTheme = getFormFieldColorTheme(fieldMeta?.touched, fieldMeta?.error, isFindError);

  const getFieldText = () => {
    switch (colorTheme) {
      case FieldValidateThemeName.ERROR:
        return fieldMeta?.error;
      case FieldValidateThemeName.SUCCESS:
        return `Успешно!`;
      default:
        return null;
    }
  };

  return (
    <>
      {React.cloneElement(props.children, {colorTheme, id})}

      {!isHideFieldValidateMessage && colorTheme && (<Desc text={getFieldText()} colorTheme={colorTheme}/>)}
    </>
  );
};

FormikFieldValidate.propTypes = {
  children: PropTypes.element.isRequired,
  fieldMeta: PropTypes.object,
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default FormikFieldValidate;
