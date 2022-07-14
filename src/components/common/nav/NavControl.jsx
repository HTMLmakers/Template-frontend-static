import React from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

import {ReactComponent as IconChartLines24} from "../../../assets/img/icons/svg/24/icon-chart-lines-24.svg";
import {ReactComponent as IconBuildings24} from "../../../assets/img/icons/svg/24/icon-buildings-24.svg";
import {ReactComponent as IconRosreestr24} from "../../../assets/img/icons/svg/24/icon-rosreestr-24.svg";
import {ReactComponent as IconSpeaker24} from "../../../assets/img/icons/svg/24/icon-speaker-24.svg";
import {ReactComponent as IconCoin24} from "../../../assets/img/icons/svg/24/icon-coin-24.svg";
import {ReactComponent as IconUsers24} from "../../../assets/img/icons/svg/24/icon-users-24.svg";
import {ReactComponent as IconHeadphone24} from "../../../assets/img/icons/svg/24/icon-headphone-24.svg";
import {ReactComponent as IconUser24} from "../../../assets/img/icons/svg/24/icon-user-24.svg";
import {ReactComponent as IconQuestion24} from "../../../assets/img/icons/svg/24/icon-question-24.svg";
import {ReactComponent as IconFiles24} from "../../../assets/img/icons/svg/24/icon-files-24.svg";
import {ReactComponent as IconPayCard24} from "../../../assets/img/icons/svg/24/icon-pay-card-24.svg";
import {ReactComponent as IconSettings24} from "../../../assets/img/icons/svg/24/icon-settings-24.svg";
import {ReactComponent as IconExit24} from "../../../assets/img/icons/svg/24/icon-exit-24.svg";
import {ReactComponent as IconAddWidgets24} from "../../../assets/img/icons/svg/24/icon-add-widgets-24.svg";

import {
  DataAttrColorTheme,
  DataAttrSize,
  DataAttrState,
  LocationMenu,
  OtherSiteRoute
} from "../../../services/consts/common";
import {moneyFormat} from "../../../services/utils/utils";
import {PopupsActionCreator} from "../../../reducers/popups/popups";
import {createConfirmationData} from "../../ui-kit/popups/ConfirmationPopup/ConfirmationPopup";

import MainNav from "./MainNav/MainNav";
import UserNav from "./UserNav/UserNav";
import PageNav from "./PageNav/PageNav";
import Icon from "../../ui-kit/icons/Icon/Icon";
import LinkSecondary from "../../ui-kit/links/LinkSecondary/LinkSecondary";
import AdaptiveLink from "../AdaptiveLink/AdaptiveLink";


const ControlType = {
  MAIN_NAV: `SIDEBAR`,
  PAGE_NAV: `PAGE_NAV`,
  USER_NAV: `USER_NAV`,
};

const MainNavListName = {
  STATISTIC: `Статистика`,
  HOUSES: `Мои дома`,
  EXTRACTS: `Выписки из ЕГРН`,
  COMPANIES: `Компании и сотрудники`,
  PERSONAL_ACCOUNT:`Мой профиль`,
  MEETINGS: `Собрания жильцов`,
  DEBTOR: `Дебиторская задолженность`,
  CONTROL_ROOM: `Диспетчерская`,
  INFORMATION: `Справочная информация`,
};

const MainNavSubListName = {
  PERSONAL_ACCOUNT: `Аккаунт`,
  DEPOSIT_ACCOUNT: `Пополнить счет`,
  INVOICES: `Выставленные счета`,
  PAYED_MODULES: `Подключенные модули`,
};

const UserNavListName = {
  PROFILE: `Мой профиль`,
};

const UserNavSubListName = {
  SETTINGS: `Настройки аккаунта`,
  DEPOSIT_ACCOUNT:`Личный счёт`,
  INVOICES: `Мои счета`,
  PAYED_MODULES: `Подключенные модули`,
  EXIT: `выход`
};

export const UserNavContent = ({ url, text, iconComponentSrc, handleLogout }) => {
  const location = useLocation();

  return (
    handleLogout
      ? <LinkSecondary text={text}
                       colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                       placeBefore={<Icon size={DataAttrSize.XS} icon={iconComponentSrc}/>}
                       customTagName="span"
                       handleClick={handleLogout}
        />
      : <AdaptiveLink url={url} className="user-nav__link">
          <LinkSecondary text={text}
                         colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                         placeBefore={<Icon size={DataAttrSize.XS} icon={iconComponentSrc}/>}
                         customTagName="span"
                         state={location.pathname.includes(url) ? DataAttrState.HOVER : null}
          />
        </AdaptiveLink>
  )
};


const NavControl = (props) => {
  const { control, locationMenu, person, handleLogout, ...rest } = props;

  const dispatch = useDispatch();

  const logout = (logoutFunc) => {
    dispatch(PopupsActionCreator.setConfirmationPopup(
      createConfirmationData(
        `Выход`,
        `Вы действительно хотите выйти?`,
        null,
        null,
        () => {
          logoutFunc();
          dispatch(PopupsActionCreator.setConfirmationPopup({isConfirmationPopup: false}))
        }
      )
    ))
  };

  const mainNavContent = [
    {
      name: MainNavListName.STATISTIC,
      icon: <Icon icon={<IconChartLines24 />} />,
      to: locationMenu === LocationMenu.CORE ? `/statistic` : OtherSiteRoute.NEW_SITE_STATISTIC,
      subLists: [],
      isDisabled: false,
    },
    {
      name: MainNavListName.HOUSES,
      icon: <Icon icon={<IconBuildings24 />} />,
      to: locationMenu === LocationMenu.CORE ? `/houses` : OtherSiteRoute.NEW_SITE,
      subLists: [],
      isDisabled: false,
    },
    {
      name: MainNavListName.EXTRACTS,
      icon: <Icon icon={<IconRosreestr24 />} type={"stroke"} />,
      to: locationMenu === LocationMenu.CORE ? `/extracts` : OtherSiteRoute.NEW_SITE_EXTRACTS,
      subLists: [],
      isDisabled: false,
    },
    {
      name: MainNavListName.MEETINGS,
      icon:  <Icon icon={<IconSpeaker24 />} />,
      to: locationMenu === LocationMenu.CALCULATOR ? `/` : OtherSiteRoute.CALCULATOR,
      //TODO: дописать список роутов табов калькулятора
      subLists: locationMenu === LocationMenu.CALCULATOR
        ? [{
            name: "Заявки и задачи1",
            icon: false,
            to: "",
            isDisabled: false,
          },
          {
            name: "Заявки и задачи2",
            icon: false,
            to: "",
            isDisabled: false,
          },]
        : [],
      isDisabled: false,
    },
    {
      name: MainNavListName.DEBTOR,
      icon: <Icon icon={<IconCoin24 />} />,
      to: locationMenu === LocationMenu.DEBTOR ? `/` : OtherSiteRoute.DEBTOR,
      //TODO: дописать список роутов страниц дебиторки
      subLists: locationMenu === LocationMenu.DEBTOR
        ? [{
            name: "Заявки и задачи1",
            icon: false,
            to: "",
            isDisabled: false,
          },
          {
            name: "Заявки и задачи2",
            icon: false,
            to: "",
            isDisabled: false,
          },]
        : [],
      isDisabled: false,
    },
    {
      name: MainNavListName.COMPANIES,
      icon: <Icon icon={<IconUsers24 />} />,
      to: locationMenu === LocationMenu.CORE ? `/companies` : OtherSiteRoute.NEW_SITE_COMPANIES,
      subLists: [],
      isDisabled: false,
    },
    {
      name: MainNavListName.CONTROL_ROOM,
      icon: <Icon icon={<IconHeadphone24 />} />,
      to: locationMenu === LocationMenu.CONTROL_ROOM ? `/` : OtherSiteRoute.CONTROL_ROOM,
      //TODO: дописать список роутов страниц диспетчерской
      subLists: locationMenu === LocationMenu.CONTROL_ROOM
        ? [{
            name: "Заявки и задачи",
            icon: false,
            to: "",
            isDisabled: false,
          },
          {
            name: "Обработка звонков",
            icon: false,
            to: "/simple-components",
            isDisabled: false,
          },
          {
            name: "Сотрудники и службы",
            icon: false,
            to: "",
            isDisabled: false,
          },
          {
            name: "Контакты",
            icon: false,
            to: "",
            isDisabled: false,
          },]
        : [],
    },
    {
      name: MainNavListName.PERSONAL_ACCOUNT,
      icon: <Icon icon={<IconUser24 />} />,
      to: locationMenu === LocationMenu.CORE ? `/profile` : OtherSiteRoute.NEW_SITE_PERSONAL_ACCOUNT,
      subLists: locationMenu === LocationMenu.CORE
        ? [{
            name: MainNavSubListName.PERSONAL_ACCOUNT,
            icon: false,
            to: `/profile/personal-account`,
            isDisabled: false,
          },
          {
            name: MainNavSubListName.DEPOSIT_ACCOUNT,
            icon: false,
            to: `/profile/deposit-account`,
            isDisabled: false,
          },
          {
            name: MainNavSubListName.INVOICES,
            icon: false,
            to: `/profile/invoices`,
            isDisabled: false,
          },
          {
            name: MainNavSubListName.PAYED_MODULES,
            icon: false,
            to: `/profile/payed-modules`,
            isDisabled: false,
          },
          ]
        : [],
      isDisabled: false,
    },
    {
      name: MainNavListName.INFORMATION,
      icon: <Icon icon={<IconQuestion24 />} />,
      to: OtherSiteRoute.INFORMATION,
      subLists: [
        /*{name: NavMainListItemName.QUESTIONS, to: OtherSiteRoute.QUESTIONS, target: `_blank`,},
        {name: NavMainListItemName.SERVICES_COST, to: OtherSiteRoute.SERVICES_PRICE, target: `_blank`,},
        {name: NavMainListItemName.CONTACTS, to: OtherSiteRoute.CONTACTS, target: `_blank`,},*/
      ],
      isDisabled: false,
    },
  ];

  const userNavContent = [
    {
      title: UserNavListName.PROFILE,
      lists: [
        {
          id: 1,
          content: <UserNavContent text={UserNavSubListName.SETTINGS}
                                   url={locationMenu === LocationMenu.CORE ? `/profile/personal-account` : OtherSiteRoute.NEW_SITE_PERSONAL_ACCOUNT}
                                   iconComponentSrc={<IconSettings24 />}/>,
          disabled: false
        },
        {
          id: 2,
          content: <UserNavContent text={<>{UserNavSubListName.DEPOSIT_ACCOUNT}&nbsp;<b>{moneyFormat(person?.account) || 0}&nbsp;₽</b></>}
                                   url={locationMenu === LocationMenu.CORE ? `/profile/deposit-account` : OtherSiteRoute.NEW_SITE_DEPOSIT_ACCOUNT}
                                   iconComponentSrc={<IconPayCard24 />}/>,
          disabled: false
        },
        {
          id: 3,
          content: <UserNavContent text={UserNavSubListName.INVOICES}
                                   url={locationMenu === LocationMenu.CORE ? `/profile/invoices` : OtherSiteRoute.NEW_SITE_INVOICES}
                                   iconComponentSrc={<IconFiles24 />}/>,
          disabled: false
        },
        {
          id: 4,
          content: <UserNavContent text={UserNavSubListName.PAYED_MODULES}
                                   url={locationMenu === LocationMenu.CORE ? `/profile/payed-modules` : OtherSiteRoute.NEW_SITE_COMPANIES}
                                   iconComponentSrc={<IconAddWidgets24 />}/>,
          disabled: false
        },
        {
          id: 5,
          content: <UserNavContent text={UserNavSubListName.EXIT}
                                   iconComponentSrc={<IconExit24 />}
                                   handleLogout={() => logout(handleLogout)}/>,
          disabled: false
        },
      ]
    },
  ];

  switch (control) {
    case ControlType.MAIN_NAV:
      return <MainNav navContent={mainNavContent} {...rest} />
    case ControlType.USER_NAV:
      return <UserNav navContent={userNavContent} person={person} {...rest} />
    case ControlType.PAGE_NAV:
      return <PageNav {...rest}/>
    default:
      return null;
  }
};

NavControl.propTypes = {
  control: PropTypes.oneOf([ControlType.PAGE_NAV, ControlType.MAIN_NAV, ControlType.USER_NAV]).isRequired,
  locationMenu: PropTypes.oneOf([LocationMenu.CORE, LocationMenu.CALCULATOR, LocationMenu.DEBTOR]),
  person: PropTypes.object,
  handleLogout: PropTypes.func,
};

export {NavControl, ControlType, MainNavListName, UserNavListName};
