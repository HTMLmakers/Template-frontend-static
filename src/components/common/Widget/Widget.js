import React from "react";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import Heading from "../../ui-kit/texts/Heading/Heading";
import Desc from "../../ui-kit/texts/Desc/Desc";
import ElementsWrap from "../../ui-kit/wraps/ElementsWrap/ElementsWrap";


const Widget = (props) => {
  const {size, colorTheme, heading, desc, placeComponents, placeComponentsSize, placeIcon, placeImage, additionalClass, customTagName} = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "widget": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="widget__main">
        {heading && (
          <div className="widget__heading">
            <Heading text={heading}
                     customTagName="p"
            />
          </div>
        )}

        {desc && (
          <div className="widget__desc">
            <Desc text={desc} />
          </div>
        )}

        {placeComponents && (
          <ElementsWrap size={placeComponentsSize} additionalClass="widget__place">
            {placeComponents}
          </ElementsWrap>
        )}
      </div>

      <div className="widget__add">
        {placeIcon && (
          <div className="widget__icon">
            {placeIcon}
          </div>
        )}

        {placeImage && (
          <div className="widget__image">
            <img src={placeImage} alt="" />
          </div>
        )}
      </div>
    </CustomTag>
  )
};


export default Widget;
