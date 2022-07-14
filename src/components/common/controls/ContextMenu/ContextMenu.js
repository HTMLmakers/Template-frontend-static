import React from "react";
import cn from "classnames";

import "./styles.scss"

import {DataAttrSize, ElementPosition} from "../../../../services/consts/common";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import DropDown from "../../../ui-kit/DropDown/DropDown";
import Icon from "../../../ui-kit/icons/Icon/Icon";

import {ReactComponent as IconThreeDots24} from "../../../../assets/img/icons/svg/24/icon-three-dots-24.svg";


const ContextMenu = (props) => {
  const {size, colorTheme, additionalClass, customTag} = props;
  const CustomTag = customTag || `div`;

  const componentClasses = cn({
    "context-menu": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      <DropDown dropDownContent={props.dropDownContent}
                position={ElementPosition.RIGHT}
      >
        <ButtonPrimary placeBefore={<Icon size={DataAttrSize.M} icon={<IconThreeDots24 />} />}
        />
      </DropDown>
    </CustomTag>
  )
};

export default ContextMenu;
