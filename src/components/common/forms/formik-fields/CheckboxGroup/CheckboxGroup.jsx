import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import CheckboxGroupFormField from "../../fields/form-fields/CheckboxGroup/CheckboxGroup";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";

/*const exampleOptions = [
  {label: `Checkbox 1`, value: `1`, ...args},
  {label: `Checkbox 2`, value: `2`, ...args},
  {label: `Checkbox 3`, value: `3`, ...args},
]*/


const CheckboxGroup = (props) => {
  const { name, options, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="">
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <CheckboxGroupFormField options={options} {...field} {...rest}/>
          </FormikFieldValidate>
        </div>
      )}
    </Field>
  )
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default CheckboxGroup;
