import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import ToggleFormField from "../../fields/form-fields/Toggle/Toggle";
import FormField from "../../fields/FormField/FormField";
import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";


const Toggle = (props) => {
  const { label, name, id, isHideFieldValidateMessage, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormField id={id || name}>
          <FormikFieldValidate fieldMeta={meta} isHideFieldValidateMessage={isHideFieldValidateMessage}>
            <ToggleFormField size="l" label={label} {...field} {...rest}/>
          </FormikFieldValidate>
        </FormField>
      )}
    </Field>
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default Toggle;
