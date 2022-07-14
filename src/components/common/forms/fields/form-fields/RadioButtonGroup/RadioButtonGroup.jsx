import React from "react";
import PropTypes from "prop-types";

import {DataAttrColorTheme, DataAttrSize, DataAttrState} from "../../../../../../services/consts/common";
import Label from "../../Label/Label";
import FormField from "../../FormField/FormField";
import RadioButton from "../RadioButton/RadioButton";
import FormGroup from "../../../form/FormGroup/FormGroup";

/*const exampleOptions = [
  {label: `Checkbox 1`, value: `1`, id: ``, onChange: () => ``, ...args},
  {label: `Checkbox 2`, value: `2`, id: ``, onChange: () => ``, ..args},
  {label: `Checkbox 3`, value: `3`, id: ``, onChange: () => ``, ..args},
]*/


const RadioButtonGroup = (props) => {
  const { size, options, heading, groupDirection, groupPosition, name, value, colorTheme, ...rest } = props;

  return (
    <FormGroup size={size}
               heading={heading}
               groupDirection={groupDirection}
               groupPosition={groupPosition}
               data-color-theme={colorTheme}
    >
      {options.map((option, index) => (
        <FormField key={index}>
          <RadioButton name={name} defaultChecked={value?.includes(option.value)} {...rest} {...option} />
        </FormField>
      ))}
    </FormGroup>
  )
};

RadioButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
      onChange: PropTypes.func,
      id: PropTypes.string,
    })
  ).isRequired,
  //value: PropTypes.string.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func,
  heading: PropTypes.string,
  groupDirection: PropTypes.string,
  groupPosition: PropTypes.string,
  name: PropTypes.string,
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.RED_PRIMARY, DataAttrColorTheme.GREEN_PRIMARY,]),
};

export default RadioButtonGroup;
