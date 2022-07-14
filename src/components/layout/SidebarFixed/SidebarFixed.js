import React from "react";

import "./styles.scss";

import {ReactComponent as IconBurgerMenu24} from "../../../assets/img/icons/svg/24/icon-burger-menu-24.svg";
import {ReactComponent as IconChartLines24} from "../../../assets/img/icons/svg/24/icon-chart-lines-24.svg";
import {ReactComponent as IconBuildings24} from "../../../assets/img/icons/svg/24/icon-buildings-24.svg";
import {ReactComponent as IconRosreestr24} from "../../../assets/img/icons/svg/24/icon-rosreestr-24.svg";
import {ReactComponent as IconSpeaker24} from "../../../assets/img/icons/svg/24/icon-speaker-24.svg";
import {ReactComponent as IconCoin24} from "../../../assets/img/icons/svg/24/icon-coin-24.svg";
import {ReactComponent as IconUsers24} from "../../../assets/img/icons/svg/24/icon-users-24.svg";
import {ReactComponent as IconHeadphone24} from "../../../assets/img/icons/svg/24/icon-headphone-24.svg";
import {ReactComponent as IconJudgeHat24} from "../../../assets/img/icons/svg/24/icon-judge-hat-24.svg";
import {ReactComponent as IconUser24} from "../../../assets/img/icons/svg/24/icon-user-24.svg";
import {ReactComponent as IconThreeDots24} from "../../../assets/img/icons/svg/24/icon-three-dots-24.svg";
import {ReactComponent as IconMessage24} from "../../../assets/img/icons/svg/24/icon-message-24.svg";
import {ReactComponent as IconQuestion24} from "../../../assets/img/icons/svg/24/icon-question-24.svg";

import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";
import {SidebarDropClassName} from "../SidebarDrop/SidebarDrop";
import {useHandleSidebarDropShowing} from "../../../services/hooks/hooks";

import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Icon from "../../ui-kit/icons/Icon/Icon";
import {ControlType, NavControl} from "../../common/nav/NavControl";
import ButtonBurger from "../../common/controls/ButtonBurger/ButtonBurger";
import IconWrap from "../../ui-kit/icons/IconWrap/IconWrap";
import {ReactComponent as IconSupport40} from "../../../assets/img/icons/svg/40/icon-support-40.svg";
import HelpWidget from "../../common/HelpWidget/HelpWidget";
import {ReactComponent as IconSearch24} from "../../../assets/img/icons/svg/24/icon-search-24.svg";
import ButtonIcon from "../../ui-kit/buttons/ButtonIcon/ButtonIcon";


const SidebarFixed = (props) => {
  const { locationMenu } = props;

  const handleSidebarDropOpen = useHandleSidebarDropShowing(SidebarDropClassName.SLIDE_MAIN_NAV);

  return (
    <div className="sidebar-fixed">
      <div className="sidebar-fixed__wrap">
        <header className="sidebar-fixed__header">

          <ButtonBurger size={DataAttrSize.L}
                        colorTheme={DataAttrColorTheme.BLUE_DARK_PRIMARY}
                        handleClick={handleSidebarDropOpen}
          />

        </header>

        <div className="sidebar-fixed__body">
          <NavControl control={ControlType.MAIN_NAV}
                      locationMenu={locationMenu}
                      size={DataAttrSize.S}
                      colorTheme={DataAttrColorTheme.BLUE_DARK_PRIMARY}
          />
        </div>
        <footer className="sidebar-fixed__footer">

          <HelpWidget size={DataAttrSize.S}
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

          <HelpWidget size={DataAttrSize.S}
                      placePic={<ButtonPrimary size={DataAttrSize.L}
                                               colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                                               placeBefore={<Icon size={DataAttrSize.M} icon={<IconMessage24 />} />}
                                               additionalClass="button-bitrix-widget"
                      />}
                      customTagName="a"
          />

          <ButtonIcon placePic={<Icon size={DataAttrSize.M}
                                      icon={<IconQuestion24 />}
                                      colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                      />}
                      customTagName="a"
                      href="aaaa"
          />


        </footer>
      </div>
    </div>
  )
};

export default SidebarFixed;
