import React from "react";
import cn from "classnames";

import "./styles.scss"
import {DataAttrSize} from "../../../../services/consts/common";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";

import {ReactComponent as IconClose24} from "../../../../assets/img/icons/svg/24/icon-close-24.svg";


const ButtonClose = (props) => {
  const { size, colorTheme, additionalClass, customTag, handleClick, ...rest } = props;
  const CustomTag = customTag || `button`;

  const componentClasses = cn({
    "button-close": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               onClick={handleClick || null}
               {...rest}
    >
      <ButtonPrimary placeBefore={<Icon size={DataAttrSize.M} icon={<IconClose24 />} />}
                     customTagName="div"
      />
    </CustomTag>
  )
};

export default ButtonClose;
