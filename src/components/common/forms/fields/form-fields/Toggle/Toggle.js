import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize, DataAttrState} from "../../../../../../services/consts/common";
import Label from "../../Label/Label";


const Toggle = (props) => {
  const { size, colorTheme, id, name, label, state, type="checkbox", customTagName, additionalClass, ...rest } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "toggle": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
    >
      <label className="toggle__wrap">
        <input type={type} id={id} name={name} defaultChecked={Boolean(props.value)} {...rest} />
        <span className="toggle__custom" />
          {label && (<Label text={label} customTagName="span" />)}
      </label>
    </CustomTag>
  )
};

Toggle.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.DEFAULT,]),
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  state: PropTypes.oneOf([
    DataAttrState.HOVER,
    DataAttrState.DISABLED,
    DataAttrState.CHECKED
  ]),
  customTagName: PropTypes.string,
  additionalClass: PropTypes.string,
};

export default Toggle;
