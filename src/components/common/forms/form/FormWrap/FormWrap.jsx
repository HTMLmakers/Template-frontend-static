import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";


const FormWrap = (props) => {
  const { direction } = props;

  return (
    <div className="form-wrap">
      {props.children}
    </div>
  )
};

FormWrap.propTypes = {

};

export default FormWrap;
