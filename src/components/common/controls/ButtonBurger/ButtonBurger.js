import React from "react";
import cn from "classnames";

import "./styles.scss"

import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import {replaceTag} from "../../../../services/utils/utils";

import Icon from "../../../ui-kit/icons/Icon/Icon";
import ButtonIcon from "../../../ui-kit/buttons/ButtonIcon/ButtonIcon";

import {ReactComponent as IconBurgerMenu24} from "../../../../assets/img/icons/svg/24/icon-burger-menu-24.svg";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";


const ButtonBurger = (props) => {
  const { size, colorTheme, additionalClass, customTag, handleClick, customTagName, ...rest } = props;
  const CustomTag = replaceTag(`button`, customTagName);

  const componentClasses = cn({
    "button-burger": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               onClick={handleClick || null}
               {...rest}
    >
      <ButtonPrimary colorTheme={DataAttrColorTheme.WHITE}
                     placeBefore={<Icon size={DataAttrSize.M} icon={<IconBurgerMenu24 />} />}
                     customTagName="div"
      />
    </CustomTag>
  )
};

export default ButtonBurger;
