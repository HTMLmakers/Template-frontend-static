import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";
import SelectFormField from "../../fields/form-fields/Select/Select";


const Select = (props) => {
  const { label, name, id, options, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta, form }) => (
        <FormField label={label} id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <SelectFormField options={options} {...field} {...rest}
                             value={options.find(option => option.value === field.value) || ''}
                             onChange={(option) => form.setFieldValue(field.name, option.value)}
            />
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isHideFieldValidateMessage: PropTypes.bool,
};

export default Select;
