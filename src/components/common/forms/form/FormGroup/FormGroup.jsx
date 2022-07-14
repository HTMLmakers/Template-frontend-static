import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import {DataAttrColorTheme, DataAttrDirection} from "../../../../../services/consts/common";
import Label from "../../fields/Label/Label";


const FormGroup = (props) => {
  const { size, heading, groupDirection="horizontal", groupPosition, ...rest } = props;

  return (
    <div className="form-group"
         data-size={size}
         data-position={groupPosition}
         data-direction={groupDirection}
         {...rest}
    >
      {heading && (<Label additionalClass="form-group__heading" customTagName="p" text={heading}/>)}
      <div className="form-group__content">
        {props.children}
      </div>
    </div>
  )
};

FormGroup.propTypes = {

};

export default FormGroup;
