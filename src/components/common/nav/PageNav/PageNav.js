import React from "react";

import "./styles.scss";

import {ElementPosition} from "../../../../services/consts/common";
import ElementsWrap from "../../../ui-kit/wraps/ElementsWrap/ElementsWrap";
import ButtonTab from "../../../ui-kit/buttons/ButtonTab/ButtonTab";
import DropDown from "../../../ui-kit/DropDown/DropDown";

import MarkPrimary from "../../../ui-kit/marks/MarkPrimary/MarkPrimary";
import LinkTertiary from "../../../ui-kit/links/LinkTertiary/LinkTertiary";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {useWindowDimensions} from "../../../../services/hooks/hooks";


const controlItemRender = (item, index) => {
  return (
    <React.Fragment key={index}>
      {item}
    </React.Fragment>
  )
};

const navItemRender = (item, isLink = false) => {
  let elem;

  if (isLink) {
    elem  = (
      <LinkTertiary text={item.name}
                    placeAfter={item.mark ? <MarkPrimary value={item.mark} /> : null}
      />
    )
  } else {
    elem = (
      <ButtonTab text={item.name}
                 customTagName="span"
                 placeAfter={item.mark ? <MarkPrimary value={item.mark}/> : null}
                 state={item.isDisabled ? `disabled` : null}
      />
    )
  }

  return (
    <React.Fragment key={item.id}>
      <NavLink to={item.to} data-state={item.isDisabled ? `disabled` : null} className="">
        {elem}
      </NavLink>
    </React.Fragment>
  )
};

const dropdownContentRender = (arr) => {
  return (
    [{
      lists: arr.map((item, i) => ({
          id: item.id,
          content: navItemRender(item, true),
          disabled: item.isDisabled
      }))
    }]
  )
};

const PageNav = (props) => {
  const { size, colorTheme, placeNavAddControl, placeNav } = props;

  const [currentWidth] = useWindowDimensions();

  const location = useLocation();

  const currentItem = placeNav?.find(item => item.to === location.pathname);

  const countPlaceNav = (placeNav, isRestMenu = false) => {
    if (!isRestMenu) {
      if (currentWidth >= 1024 && currentWidth <= 1279) return placeNav.slice(0, 3); //3 шт.
      if (currentWidth >= 768 && currentWidth <= 1023) return placeNav.slice(0, 2); //2 шт.
      if (currentWidth >= 360 && currentWidth <= 767) return []; //0 шт. - все в меню
      return placeNav; // все
    } else {
      if (currentWidth >= 1024 && currentWidth <= 1279) return placeNav.slice(3,); //3 шт.
      if (currentWidth >= 768 && currentWidth <= 1023) return placeNav.slice(2,); //2 шт.
      if (currentWidth >= 360 && currentWidth <= 767) return placeNav.filter(item => item?.to !== currentItem?.to); // все, кроме текущего
      return []; //0 шт. - все в строке
    }
  };

  const isContextMenuShow = currentWidth <= 1279 && countPlaceNav(placeNav, true).length > 0;

  return (
    <nav className="page-nav"
               data-size={size}
               data-color-theme={colorTheme}
    >
      {placeNavAddControl && (
        <ElementsWrap additionalClass="page-nav__add-controls"
                      isNoWrap
        >
          {placeNavAddControl.map(controlItemRender)}
        </ElementsWrap>
      )}

      {placeNav && (
        <ElementsWrap additionalClass="page-nav__list"
                      isNoWrap
        >
          {countPlaceNav(placeNav).map((item) => navItemRender(item))}

          {isContextMenuShow && (
            <DropDown dropDownContent={dropdownContentRender(countPlaceNav(placeNav, true))}
                      position={ElementPosition.CENTER}
            >
              <ButtonTab text={currentWidth <= 767 ? currentItem?.name : `Еще...`}
                         placeAfter={currentWidth <= 767 ? <MarkPrimary value={currentItem.mark}/> : null}
                         isSelection
              />
            </DropDown>
          )}
        </ElementsWrap>
      )}
    </nav>
  )
};

export default PageNav;
