import React from "react";
import cn from "classnames";

import "./styles.scss";

import {DataAttrHeadingLevel, DataAttrSize} from "../../../services/consts/common";
import Heading from "../../ui-kit/texts/Heading/Heading";
import Desc from "../../ui-kit/texts/Desc/Desc";
import ElementsWrap from "../../ui-kit/wraps/ElementsWrap/ElementsWrap";
import ControlListAdaptive from "../../common/ControlListAdaptive/ControlListAdaptive";
import {replaceTag} from "../../../services/utils/utils";
import {ControlType, NavControl} from "../../common/nav/NavControl";


const Header = (props) => {
  const { size, heading, desc, placeAfter, isNavigation, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`header`, customTagName);

  const componentClasses = cn({
    "header": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
            data-size={size}>
      <div className="header__wrap">
        <div className="header__main">
          <div className="header__heading">
            <Heading text={heading}
                     level={DataAttrHeadingLevel.LEVEL_1}
            />
          </div>

          {desc && (
            <div className="header__desc">
              <Desc text={desc}/>
            </div>
          )}

          {(placeAfter || isNavigation) && (
            <div className="header__place-after">
              {isNavigation
                ? <NavControl control={ControlType.PAGE_NAV}
                              placeNav={props.placeNav}
                              placeNavAddControl={props.placeNavAddControl}
                              size={DataAttrSize.L}
                  />
                : placeAfter && placeAfter
              }
            </div>
          )}
        </div>

        {props.controlItems && (
          <ElementsWrap additionalClass="header__controls"
                        isNoWrap
          >
            <ControlListAdaptive controlItems={props.controlItems}/>
          </ElementsWrap>
        )}
      </div>
    </CustomTag>
  )
};

export default Header;
