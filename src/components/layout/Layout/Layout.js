import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

import "./styles.scss";

import {DataAttrColorTheme, ElementPosition, RoutePosition} from "../../../services/consts/common";
import {AppOperation} from "../../../reducers/app/app";
import {Operation as NotificationsOperation} from "../../../reducers/notifications/notifications";
import {getOpenSidebarDropClassNames} from "../../../reducers/app/selectors";

import SideBar from "../SideBar/SideBar";
import SidebarFixed from "../../layout/SidebarFixed/SidebarFixed";
import MainHeader from "../MainHeader/MainHeader";
import MainFooter from "../MainFooter/MainFooter";
import SidebarDrop, {SidebarDropClassName} from "../../layout/SidebarDrop/SidebarDrop";
import NotificationsList from "../../ui-kit/notifications/NotificationsList/NotificationsList";
import SidebarPanel from "../SidebarPanel/SidebarPanel";
import DefaultModuleComponents from "../DefaultModuleComponents/DefaultModuleComponents";


const Layout = (props) => {
  const { renderRoutes, sideBarCustom, locationMenu, person, handleLogout, isHideDefaultModuleComponents } = props;

  const dispatch = useDispatch();
  const openSidebarDropClassNames = useSelector(getOpenSidebarDropClassNames);

  useEffect(() => {
    dispatch(AppOperation.fetchUserStatistic())
    dispatch(NotificationsOperation.fetchNotifications())
    setInterval(() => {
      dispatch(NotificationsOperation.fetchNotifications())
    }, 600000)
  }, [])

  return (
    <div className="layout">
      <div className="layout__container">
        <div className="layout__row">
          <aside className="layout__sidebar-primary layout__col">
            {sideBarCustom && sideBarCustom}

            {!sideBarCustom && (
              <>
                <SidebarFixed locationMenu={locationMenu}/>
                <SidebarDrop position={ElementPosition.LEFT}
                             isNotBorderRadius
                             additionalClass={SidebarDropClassName.SLIDE_MAIN_NAV}
                             colorThemeCloseButton={DataAttrColorTheme.BLUE_SENARY}
                >
                  <SideBar locationMenu={locationMenu}
                           person={person}
                  />
                </SidebarDrop>
              </>
            )}
          </aside>

          <div className="layout__base layout__col">

            <header className="layout__header">
              <MainHeader locationMenu={locationMenu}
                          person={person}
                          handleLogout={handleLogout}
              />
            </header>

            <main className="layout__main">
              {renderRoutes(RoutePosition.MAIN)}
            </main>

            <footer className="layout__footer">
              <MainFooter />
            </footer>

          </div>

          <aside className="layout__sidebar-secondary layout__col">
            <SidebarDrop position={ElementPosition.RIGHT}
                         additionalClass={SidebarDropClassName.SLIDE_PAGE}
                         isNotBorderRadius
            >
              {openSidebarDropClassNames.includes(SidebarDropClassName.SLIDE_PAGE) && (
                renderRoutes(RoutePosition.SLIDE)
              )}
            </SidebarDrop>

            <SidebarDrop position={ElementPosition.RIGHT}
                         additionalClass={SidebarDropClassName.SLIDE_NOTIFICATIONS}
                         isOuterOffset
            >
              <SidebarPanel title="Уведомления"
                            buttonText="Очистить все"
              >
                <NotificationsList/>
              </SidebarPanel>
            </SidebarDrop>
          </aside>

        </div>

        {!isHideDefaultModuleComponents && <DefaultModuleComponents/>}
      </div>
    </div>
  )
};

Layout.propTypes = {
  renderRoutes: PropTypes.func.isRequired,
  sideBarCustom: PropTypes.element,
};


export default Layout;
