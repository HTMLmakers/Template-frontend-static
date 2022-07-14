import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import FormikFieldValidate from "../FormikFieldValidate/FormikFieldValidate";
import FieldSeparatorFormField from "../../fields/form-fields/FieldSeparator/FieldSeparator";


const FieldSeparator = (props) => {
  const { heading, formErrors, formTouched, isHideFieldValidateMessage, ...rest } = props;

  const [isFindError, setIsFindError] = useState(false);

  const errorChildren = props.children.find(child => (
    Object.keys(formErrors).includes(child.props.name) && Object.keys(formTouched).includes(child.props.name)
  ));

  useEffect(() => {
    if (Boolean(errorChildren)) setIsFindError(true)
  }, [formErrors, formTouched])


  return (
    <div className="">
      <FormikFieldValidate fieldMeta={{error: errorChildren ? formErrors[errorChildren.props.name] : null, touched: isFindError}}
                           isHideFieldValidateMessage={isHideFieldValidateMessage}
      >
        <FieldSeparatorFormField heading={heading} {...rest}>
          {props.children.map((children, index) => (
            React.cloneElement(children, {key: index, isHideFieldValidateMessage: true}))
          )}
        </FieldSeparatorFormField>
      </FormikFieldValidate>
    </div>
  )
};

FieldSeparator.propTypes = {
  formErrors: PropTypes.object.isRequired,
  formTouched: PropTypes.object.isRequired,
  heading: PropTypes.string,
  isHideFieldValidateMessage: PropTypes.bool,
};

export default FieldSeparator;
