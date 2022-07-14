import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import cn from "classnames";
import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";
import ElementsWrap from "../../ui-kit/wraps/ElementsWrap/ElementsWrap";
import Desc from "../../ui-kit/texts/Desc/Desc";
import LinkPrimary from "../../ui-kit/links/LinkPrimary/LinkPrimary";

const ControlTotal = (props) => {
  const {size, colorTheme, placeControls, text, value, link, additionalClass, customTagName} = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "control-total": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >

      <ElementsWrap additionalClass="control-total__controls"
                    size={DataAttrSize.XL}>

        {placeControls}

      </ElementsWrap>

      {text && value && (
        <span className="control-total__total">

           <Desc text={`${text} : ${value}`}/>

       </span>
      )}

      {link && (
        <div className="control-total__link">

          <LinkPrimary text={link}
                       size={DataAttrSize.L}
                       colorTheme={DataAttrColorTheme.BLUE_LIGHT_PRIMARY}
          />

        </div>
      )}

    </CustomTag>
  )
};

export default ControlTotal;
