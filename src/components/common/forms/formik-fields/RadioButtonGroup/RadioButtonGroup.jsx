import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import RadioButtonGroupFormField from "../../fields/form-fields/RadioButtonGroup/RadioButtonGroup";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";

/*const exampleOptions = [
  {label: `Checkbox 1`, value: `1`, ...args},
  {label: `Checkbox 2`, value: `2`, ...args},
  {label: `Checkbox 3`, value: `3`, ...args},
]*/


const RadioButtonGroup = (props) => {
  const { name, options, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="form-group-wrap">
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <RadioButtonGroupFormField options={options} {...field} {...rest}/>
          </FormikFieldValidate>
        </div>
      )}
    </Field>
  )
};

RadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default RadioButtonGroup;
