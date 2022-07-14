import React from "react";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import Desc from "../../ui-kit/texts/Desc/Desc";


const Copyright = (props) => {
  const {size, colorTheme, additionalClass, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "copyright": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}

    >
      <Desc text={<>Реестр Дома <br/>© {new Date().getFullYear()} Все права защищены</>} /> {/* tex={props.text} */}
    </CustomTag>
  )
};

export default Copyright;
