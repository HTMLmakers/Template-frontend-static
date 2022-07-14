import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import DatePickerFormField from "../../fields/form-fields/DatePicker/DatePicker";
import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";


const DatePicker = (props) => {
  const { label, name, id, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta, form }) => (
        <FormField label={label} id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <DatePickerFormField {...field} onChange={(date) => form.setFieldValue(field.name, date)} {...rest}/>
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default DatePicker;
