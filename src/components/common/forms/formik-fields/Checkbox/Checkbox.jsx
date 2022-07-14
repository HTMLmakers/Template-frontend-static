import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import CheckboxFormField from "../../fields/form-fields/Checkbox/Checkbox";
import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";


const Checkbox = (props) => {
  const { label, name, id, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormField id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <CheckboxFormField size="l" label={label} {...field} {...rest}/>
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default Checkbox;
