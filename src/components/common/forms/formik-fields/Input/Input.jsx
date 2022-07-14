import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import InputTextFormField from "../../fields/form-fields/InputText/InputText";
import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";


const Input = (props) => {
  const { label, name, id, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormField label={label} id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <InputTextFormField size="l" {...field} {...rest}/>
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default Input;
