import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

import "./styles.scss";

import {ReactComponent as IconPayCard24} from "../../../assets/img/icons/svg/24/icon-pay-card-24.svg";
import {ReactComponent as IconBasket24} from "../../../assets/img/icons/svg/24/icon-basket-24.svg";
import {ReactComponent as IconBell24} from "../../../assets/img/icons/svg/24/icon-bell-24.svg";
import {ReactComponent as IconBurgerMenu24} from "../../../../common/assets/img/icons/svg/24/icon-burger-menu-24.svg";

import {DataAttrColorTheme, DataAttrSize, LocationMenu, OtherSiteRoute} from "../../../services/consts/common";
import {ControlType, NavControl} from "../../common/nav/NavControl";
import {moneyFormat} from "../../../services/utils/utils";
import {useHandleSidebarDropShowing} from "../../../services/hooks/hooks";
import {SidebarDropClassName} from "../SidebarDrop/SidebarDrop";
import {getUserStatistic} from "../../../reducers/app/selectors";

import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Icon from "../../ui-kit/icons/Icon/Icon";
import Search from "../../common/Search/Search";


const MainHeader = (props) => {
  const { locationMenu, person, handleLogout } = props;

  const history = useHistory();
  const handleSidebarDropOpen = useHandleSidebarDropShowing(SidebarDropClassName.SLIDE_NOTIFICATIONS);
  const userStatistic = useSelector(getUserStatistic);


  return (
    <header className="main-header">
      <div className="main-header__wrap">
        <div className="main-header__search">

          <Search />

        </div>
        <div className="main-header__controls">

          <ButtonPrimary additionalClass="main-header__personal-account"
                         text={`${moneyFormat(person?.account) || 0} ₽`}
                         colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                         placeBefore={<Icon size={DataAttrSize.M} icon={<IconPayCard24 />} />}
                         handleClick={() => {locationMenu === LocationMenu.CORE
                           ? history.push(`/profile/deposit-account`)
                           : window.location.href = OtherSiteRoute.NEW_SITE_DEPOSIT_ACCOUNT
                         }}
          />
          <ButtonPrimary additionalClass="main-header__cart"
                         text={userStatistic.cartStats?.sum ? `${userStatistic.cartStats?.sum} ₽` : null }
                         colorTheme={userStatistic.invoiceStats?.NOT_FORMED
                           ? DataAttrColorTheme.ORANGE_PRIMARY_LIGHT
                           : DataAttrColorTheme.WHITE_PRIMARY
                         }
                         placeBefore={<Icon size={DataAttrSize.M} icon={<IconBasket24 />} />}
                         isMarkNotice={!!userStatistic.invoiceStats?.NOT_FORMED}
                         handleClick={() => {locationMenu === LocationMenu.CORE
                           ? history.push(`/cart`)
                           : window.location.href = OtherSiteRoute.NEW_SITE_CART
                         }}
          />
          <ButtonPrimary colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                         placeBefore={<Icon size={DataAttrSize.M} icon={<IconBell24 />} />}
                         handleClick={handleSidebarDropOpen}
                         isMarkNotice={!!userStatistic.notifyStats?.notRead}
          />

          <NavControl control={ControlType.USER_NAV}
                      locationMenu={locationMenu}
                      person={person}
                      handleLogout={handleLogout}
          />

          <ButtonPrimary additionalClass="main-header__toggle"
                         colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                         placeBefore={<Icon size={DataAttrSize.M} icon={<IconBurgerMenu24 />} />}
          />

        </div>
      </div>
    </header>
  )
};

export default MainHeader;
