import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import TimePickerFormField from "../../fields/form-fields/TimePicker/TimePicker";
import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";


const TimePicker = (props) => {
  const { label, name, id, isHideFieldValidateMessage,...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta, form }) => (
        <FormField label={label} id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <TimePickerFormField {...field} onChange={(date) => form.setFieldValue(field.name, date)} {...rest}/>
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

TimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default TimePicker;
