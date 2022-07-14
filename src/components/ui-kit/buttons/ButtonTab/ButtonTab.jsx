import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {
  AttrType,
  DataAttrColorTheme,
  DataAttrSize,
  DataAttrState,
  DataAttrWidth
} from "../../../../services/consts/common";
import {identifyTypeTagProps, replaceTag} from "../../../../services/utils/utils";
import Icon from "../../icons/Icon/Icon";

import {ReactComponent as IconDropdown8} from "../../../../assets/img/icons/svg/8/icon-dropdown-8.svg";


const ButtonTab = (props) => {
  const {
    text,
    size,
    colorTheme,
    additionalClass,
    placeAfter,
    state,
    isSelection,
    width,
    customTagName,
    type = AttrType.BUTTON,
    href,
    handleClick,
    ...next
  } = props;

  const CustomTag = replaceTag(`button`, customTagName);
  let rest = identifyTypeTagProps(CustomTag, type, href);

  const componentClasses = cn({
    "button-tab": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-state={state}
               data-width={width}
               data-selection={isSelection}
               onClick={handleClick || null}
               title="лвоарывлоарывлоар ылвоар ылвоар ылвоар ылвоарыловар"
               {...rest}
               {...next}
    >
      <span className="button-tab__text">{text}</span>

      {isSelection && (<Icon size={DataAttrSize.XS} icon= {<IconDropdown8 />} />)}

      {placeAfter && placeAfter}

    </CustomTag>
  )
};

ButtonTab.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.DEFAULT]),
  additionalClass: PropTypes.string,
  placeAfter: PropTypes.node,
  state: PropTypes.oneOf([
    DataAttrState.FOCUS,
    DataAttrState.HOVER,
    DataAttrState.ACTIVE,
    DataAttrState.DISABLED,
    DataAttrState.CURRENT
  ]),
  isSelection: PropTypes.bool,
  width: PropTypes.oneOf([DataAttrWidth.FULL_WIDTH]),
  customTagName: PropTypes.string,
  type: PropTypes.oneOf([AttrType.BUTTON, AttrType.SUBMIT]),
  href: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ButtonTab;
