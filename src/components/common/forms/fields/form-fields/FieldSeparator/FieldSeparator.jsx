import React from "react";
import Label from "../../Label/Label";
import PropTypes from "prop-types";

import {FieldValidateThemeName} from "../../../../../../services/consts/common";


const FieldSeparator = (props) => {
  const { heading, colorTheme, ...rest } = props;

  return (
    <div className="form-group" data-color-theme={colorTheme} {...rest}>
      {heading && (<Label customTagName="p" text={heading}/>)}
      <div className="form-group-checkbox" style={{display: "flex"}}>
        {props.children.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {(index !== props.children?.length - 1) && (
              <span>/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
};

FieldSeparator.propTypes = {
  heading: PropTypes.string,
  colorTheme: PropTypes.oneOf([FieldValidateThemeName.ERROR, FieldValidateThemeName.SUCCESS]),
};

export default FieldSeparator;
