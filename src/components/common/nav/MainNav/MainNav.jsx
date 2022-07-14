import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import cn from "classnames";

import "./styles.scss";

import {
  DataAttrColorTheme,
  DataAttrSize,
  DataAttrState,
  ElementPosition,
  OtherSiteRoute
} from "../../../../services/consts/common";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import LinkSecondary from "../../../ui-kit/links/LinkSecondary/LinkSecondary";
import LinkPrimary from "../../../ui-kit/links/LinkPrimary/LinkPrimary";

import {ReactComponent as IconDropdown8} from "../../../../assets/img/icons/svg/8/icon-dropdown-8.svg";
import {ReactComponent as IconThreeDots24} from "../../../../assets/img/icons/svg/24/icon-three-dots-24.svg";
import AdaptiveLink from "../../AdaptiveLink/AdaptiveLink";
import Tooltip from "../../../ui-kit/Tooltip/Tooltip";


const AllowTooltip = (props) => {
  return (
    props.size === DataAttrSize.S
      ? <Tooltip text={props.name}
                 colorTheme={DataAttrColorTheme.WHITE}
                 position={ElementPosition.RIGHT}
        >
          {props.children}
        </Tooltip>
      : <>{props.children}</>
  )
};

const navItemRender = (item, index, location, size) => {

  if (size === DataAttrSize.S && item.to === OtherSiteRoute.INFORMATION) return  null;
  
  return (
    <li className="main-nav__item" key={index}>
      <AllowTooltip size={size} name={item.name}>
        <AdaptiveLink url={item.to} className="main-nav__link">
          <LinkSecondary text={item.name}
                         colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                         placeBefore={item.icon}
                         placeAfter={<Icon size={DataAttrSize.XS} icon={<IconDropdown8 />} additionalClass="main-nav__arrow"/>}
                         customTagName="span"
                         state={location.pathname.includes(item.to) ? DataAttrState.HOVER : null}
          />
        </AdaptiveLink>
      </AllowTooltip>

      {item.subLists?.length > 0 && (
        <ul className="main-nav__sublist">
          {item.subLists.map((subItem, index) => (
            <li className="main-nav__subitem" key={index}>
              <AdaptiveLink url={subItem.to} data-state={subItem.isDisabled ? `disabled` : null} className="main-nav__sublink">
                <LinkPrimary text={subItem.name}
                             size={DataAttrSize.L}
                             colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                             customTagName="span"
                             state={location.pathname.includes(subItem.to) ? DataAttrState.HOVER : null}
                />
              </AdaptiveLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
};


const MainNav = (props) => {
  const {size, colorTheme, navContent, additionalClass, customTag} = props;
  const CustomTag = customTag || `nav`;

  const location = useLocation();

  const componentClasses = cn({
    "main-nav": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
         data-size={size}
         data-color-theme={colorTheme}
    >
      <ul className="main-nav__list">
        {navContent.map((item, index)=> navItemRender(item, index, location, size))}

        <li className="main-nav__item main-nav__item--more">
          <a className="main-nav__link">
            <LinkSecondary text=""
                           size={DataAttrSize.L}
                           colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                           customTagName="span"
                           placeBefore={<Icon size={DataAttrSize.M} icon={<IconThreeDots24 />} />}
            />
          </a>
        </li>
      </ul>
    </CustomTag>
  )
};

export default MainNav;
