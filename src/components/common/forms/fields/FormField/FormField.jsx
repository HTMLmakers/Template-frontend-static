import React from "react";
import PropTypes from "prop-types";

import Label from "../Label/Label";

/**
 * Общее описание компонента.
 *
 * Контейнер для любого элемента формы.
 *
 * @param props.label {string} label - Лэйбл элемента формы (кроме чекбокс и радио).
 * @param props.id {string} id - Уникальный идентификатор элемента формы.
 *
 * Пример: <FormField label="Фамилия" id="uniqueId">
             <InputText size="l" />
           </FormField>
 *
 *
 * @returns {node} - JSX
 * */

const FormField = (props) => {
  const { label, id } = props;

  return  (
    <div className="form-field">
      {label
        ? <>
            <Label text={label} htmlFor={id}/>
            {React.cloneElement(props.children, {id})}
          </>
        : React.cloneElement(props.children, {id})
      }
    </div>
  )
};

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default FormField;
