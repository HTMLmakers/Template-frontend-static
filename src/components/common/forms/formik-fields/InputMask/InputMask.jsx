import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";
import InputMaskFormField from "../../fields/form-fields/InputMask/InputMask";


const InputMask = (props) => {
  const { label, name, id, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormField label={label} id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <InputMaskFormField size="l" {...field} {...rest} />
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default InputMask;
