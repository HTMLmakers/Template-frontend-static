import React from "react";
import PropTypes from "prop-types";

import Input from "./formik-fields/Input/Input";
import InputMask from "./formik-fields/InputMask/InputMask";
import Textarea from "./formik-fields/Textarea/Textarea";
import Checkbox from "./formik-fields/Checkbox/Checkbox";
import CheckboxGroup from "./formik-fields/CheckboxGroup/CheckboxGroup";
import RadioButton from "./formik-fields/RadioButton/RadioButton";
import RadioButtonGroup from "./formik-fields/RadioButtonGroup/RadioButtonGroup";
import Select from "./formik-fields/Select/Select";
import DatePicker from "./formik-fields/DatePicker/DatePicker";
import TimePicker from "./formik-fields/TimePicker/TimePicker";
import FieldSeparator from "./formik-fields/FieldSeparator/FieldSeparator";
import Toggle from "./formik-fields/Toggle/Toggle";

export const ControlType = {
  INPUT: `input`,
  INPUT_MASK: `mask`,
  TEXTAREA: `textarea`,
  SELECT: `select`,
  RADIO: `radio`,
  RADIO_GROUP: `radioGroup`,
  CHECKBOX: `checkbox`,
  CHECKBOX_GROUP: `checkboxGroup`,
  DATE: `date`,
  TIME: `time`,
  FIELD_SEPARATOR: `separator`,
  TOGGLE: `toggle`,
};


const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case ControlType.INPUT:
      return <Input {...rest} />
    case ControlType.INPUT_MASK:
      return <InputMask {...rest} />
    case ControlType.TEXTAREA:
      return <Textarea {...rest} />
    case ControlType.CHECKBOX:
      return <Checkbox {...rest} />
    case ControlType.CHECKBOX_GROUP:
      return <CheckboxGroup {...rest} />
    case ControlType.RADIO:
      return <RadioButton {...rest} />
    case ControlType.RADIO_GROUP:
      return <RadioButtonGroup {...rest} />
    case ControlType.SELECT:
      return <Select {...rest} />
    case ControlType.DATE:
      return <DatePicker {...rest} />
    case ControlType.TIME:
      return <TimePicker {...rest} />
    case ControlType.TOGGLE:
      return <Toggle {...rest} />
    case ControlType.FIELD_SEPARATOR:
      return (
        <FieldSeparator {...rest}>
          {props.children}
        </FieldSeparator>
      )
    default: return null;
  }
};

FormikControl.propTypes = {
  control: PropTypes.oneOf([
    ControlType.INPUT,
    ControlType.INPUT_MASK,
    ControlType.TEXTAREA,
    ControlType.CHECKBOX,
    ControlType.CHECKBOX_GROUP,
    ControlType.RADIO,
    ControlType.RADIO_GROUP,
    ControlType.SELECT,
    ControlType.DATE,
    ControlType.TIME,
    ControlType.FIELD_SEPARATOR,
    ControlType.TOGGLE,
  ]).isRequired,
};

export default FormikControl;
