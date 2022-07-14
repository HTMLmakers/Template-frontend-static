import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import TextareaFormField from "../../fields/form-fields/Textarea/Textarea";
import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";


const Textarea = (props) => {
  const {label, name, id, isHideFieldValidateMessage,...rest} = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormField label={label} id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <TextareaFormField size="l" {...field} {...rest}/>
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default Textarea;
