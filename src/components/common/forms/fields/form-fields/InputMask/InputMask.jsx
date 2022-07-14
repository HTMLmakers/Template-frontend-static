import React from "react";
import ReactInputMask from 'react-input-mask';
import PropTypes from "prop-types";

import InputText from "../InputText/InputText";


const InputMask = (props) => {
  const { mask = `+7 (999) 999-99-99`, value, onChange, onBlur, ...rest } = props;

  return (
    <ReactInputMask mask={mask}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={props.disabled}
    >
      {(inputProps) => <InputText {...inputProps} {...rest}/>}
    </ReactInputMask>
  )
};

InputMask.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  mask: PropTypes.string,
};

export default InputMask;
