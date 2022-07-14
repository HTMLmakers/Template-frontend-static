import React from "react";
import cn from "classnames";

import "./styles.scss"

import {ReactComponent as ImgLogo} from "../../../assets/img/logo.svg";


const Logo = (props) => {
  const {size, colorTheme, additionalClass, customTag, handleClick, href, ...rest} = props;
  const CustomTag = customTag || `div`;
  const isLink = CustomTag === `a`;

  const componentClasses = cn({
    "logo": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               href={isLink && (href || "/")}
               data-size={size}
               data-color-theme={colorTheme}
               onClick={handleClick || null}
               {...rest}
    >
      <ImgLogo />
    </CustomTag>
  )
};

export default Logo;
