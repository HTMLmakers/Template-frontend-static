import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrHeadingLevel, DataAttrSize} from "../../../services/consts/common";
import Heading from "../../ui-kit/texts/Heading/Heading";
import Icon from "../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconSupport40} from "../../../assets/img/icons/svg/40/icon-support-40.svg";
import IconWrap from "../../ui-kit/icons/IconWrap/IconWrap";
import Desc from "../../ui-kit/texts/Desc/Desc";
import cn from "classnames";


const HelpWidget = (props) => {
  const { size, colorTheme, title, desc, additionalDesc, placePic, handleClick, additionalClass, customTagName, ...rest } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "help-widget": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               onClick={handleClick || null}
               {...rest}
    >
      <div className="help-widget__wrap">

        {title && (
          <Heading text={title}
                   level={DataAttrHeadingLevel.LEVEL_7}
                   customTagName="h6"
                   additionalClass="help-widget__title"
          />
        )}

        {desc && (
          <Desc text={desc}
                additionalClass="help-widget__desc"
          />
        )}


        {additionalDesc && (
          <Desc text={additionalDesc}
                size={DataAttrSize.M}
                additionalClass="help-widget__info"
          />
        )}
      </div>
      {placePic && placePic}
    </CustomTag>
  )
};


export default HelpWidget;
