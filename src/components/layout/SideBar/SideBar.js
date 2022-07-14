import React from "react";
import cn from "classnames";

import "./styles.scss";

import {DataAttrColorTheme, DataAttrSize, OtherSiteRoute} from "../../../services/consts/common";
import {replaceTag} from "../../../services/utils/utils";

import HelpWidget from "../../common/HelpWidget/HelpWidget";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Scroll from "../../ui-kit/Scroll/Scroll";
import Logo from "../../common/Logo/Logo";
import {ControlType, NavControl} from "../../common/nav/NavControl";
import UserInfo from "../../common/UserInfo/UserInfo";
import IconWrap from "../../ui-kit/icons/IconWrap/IconWrap";
import Icon from "../../ui-kit/icons/Icon/Icon";

import {ReactComponent as IconSupport40} from "../../../assets/img/icons/svg/40/icon-support-40.svg";
import {ReactComponent as IconMessage24} from "../../../assets/img/icons/svg/24/icon-message-24.svg";


const SideBar = (props) => {
  const { person, locationMenu, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "sidebar": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}>
      <Scroll>

      <header className="sidebar__header">
        <Logo size={DataAttrSize.M}
              colorTheme={DataAttrColorTheme.WHITE}
              customTag="a"
              href={OtherSiteRoute.OLD_SITE}
        />
      </header>

      <div className="sidebar__add">

        <UserInfo colorTheme={DataAttrColorTheme.WHITE}
                  avatarImageSrc={`${process.env.REACT_APP_URL}${person?.avatar}`}
                  name={person.firstName}
                  surname={person.lastName}
                  patronymic={person.patronymic}
                  status={person.statusAccount}
        />

      </div>

      <div className="sidebar__body">
        <NavControl control={ControlType.MAIN_NAV}
                    locationMenu={locationMenu}
        />
      </div>
      <footer className="sidebar__footer">
        <div className="sidebar__footer-section">
          <HelpWidget title="Нужна помощь?"
                      desc="Звоните! С удовольствием вам поможем!"
                      additionalDesc="+7 (903) 941-02-27"
                      placePic={<IconWrap size={DataAttrSize.XL}
                                          colorTheme={DataAttrColorTheme.GRAY_QUATERNARY}
                                          icon={<Icon size={DataAttrSize.L}
                                                      colorTheme={DataAttrColorTheme.VELVET_PRIMARY}
                                                      icon={<IconSupport40 />}
                                          />}
                      />}
                      customTagName="a"
                      href="tel:+79039410227"
          />
        </div>
        <div className="sidebar__footer-section">
          <HelpWidget title="Он-лайн консультация"
                      desc="Наши консультанты ответят вам в самое ближайшее время!"
                      placePic={<ButtonPrimary size={DataAttrSize.L}
                                               colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                                               placeBefore={<Icon size={DataAttrSize.M} icon={<IconMessage24 />} />}
                                               additionalClass="button-bitrix-widget"
                      />}
                      customTagName="a"
          />
        </div>
      </footer>
      </Scroll>
    </CustomTag>
  )
};

export default SideBar;
