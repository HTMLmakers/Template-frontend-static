import React from "react";

import "./styles.scss";

import {ReactComponent as IconCheck24} from "../../../../../common/assets/img/icons/svg/24/icon-check-24.svg";
import {ReactComponent as IconInfo24} from "../../../../../common/assets/img/icons/svg/24/icon-info-24.svg";
import {ReactComponent as IconError24} from "../../../../../common/assets/img/icons/svg/24/icon-disabled-24.svg";
import {ReactComponent as IconClose16} from "../../../../../common/assets/img/icons/svg/16/icon-close-16.svg";


import {DataAttrColorTheme, DataAttrSize, MessageType} from "../../../../services/consts/common";

import {replaceTag} from "../../../../services/utils/utils";
import Icon from "../../icons/Icon/Icon";
import IconWrap from "../../icons/IconWrap/IconWrap";
import Desc from "../../texts/Desc/Desc";
import {ReactComponent as IconBell24} from "../../../../assets/img/icons/svg/24/icon-bell-24.svg";
import cn from "classnames";
import PropTypes from "prop-types";

export const NotificationGroup = {
  PRIMARY: `primary`,
  SECONDARY: `secondary`,
  TERTIARY: `tertiary`,
};

const createIconWrap = (colorTheme, iconComponentSrc, icon = null) => (
  <IconWrap size={DataAttrSize.M}
            colorTheme={colorTheme}
            icon={icon
              ? icon
              : <Icon size={DataAttrSize.M} icon={iconComponentSrc}/>
            }
  />
);


const NotificationSecondary = (props) => {
  const {
    size,
    colorTheme,
    placePic,
    icon,
    title,
    text,
    date,
    type,
    group,
    isNoIcon,
    isHideClose,
    handleClose,
    additionalClass,
    customTagName
  } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const renderColorTheme = () => {
    if ((group === NotificationGroup.PRIMARY) || (group === NotificationGroup.TERTIARY)) {
      switch (MessageType[type]) {
        case MessageType.SUCCESS:
          return DataAttrColorTheme.GREEN_PRIMARY
        case MessageType.WARNING:
          return DataAttrColorTheme.ORANGE_PRIMARY
        case MessageType.INFO:
          return DataAttrColorTheme.VELVET_PRIMARY
        case MessageType.ERROR:
          return DataAttrColorTheme.RED_PRIMARY
        default:
          return null
      }
    }
  };

  const renderIcon = () => {
    if (group === NotificationGroup.PRIMARY) {
      switch (MessageType[type]) {
        case MessageType.SUCCESS:
          return createIconWrap(DataAttrColorTheme.GREEN_PRIMARY, <IconCheck24/>)
        case MessageType.WARNING:
          return createIconWrap(DataAttrColorTheme.ORANGE_PRIMARY, <IconInfo24/>)
        case MessageType.INFO:
          return createIconWrap(DataAttrColorTheme.VELVET_PRIMARY, <IconInfo24/>)
        case MessageType.ERROR:
          return createIconWrap(DataAttrColorTheme.RED_PRIMARY, <IconError24/>)
        default:
          return null
      }
    }

    if (group === NotificationGroup.SECONDARY) {
      switch (MessageType[type]) {
        case MessageType.SUCCESS:
          return createIconWrap(DataAttrColorTheme.GREEN_PRIMARY, <IconBell24/>)
        case MessageType.WARNING:
          return createIconWrap(DataAttrColorTheme.ORANGE_PRIMARY, <IconBell24/>)
        case MessageType.INFO:
          return createIconWrap(DataAttrColorTheme.VELVET_PRIMARY, <IconBell24/>)
        case MessageType.ERROR:
          return createIconWrap(DataAttrColorTheme.RED_PRIMARY, <IconBell24/>)
        default:
          return createIconWrap(DataAttrColorTheme.GRAY_SECONDARY, <IconBell24/>)
      }
    }

    if (group === NotificationGroup.TERTIARY) {
      switch (MessageType[type]) {
        case MessageType.SUCCESS:
        case MessageType.WARNING:
        case MessageType.INFO:
        case MessageType.ERROR:
        default:
          return createIconWrap(DataAttrColorTheme.GRAY_TERTIARY, null, icon)
      }
    }
  };

  const componentClasses = cn({
    "notification-secondary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme ? colorTheme : renderColorTheme()}
               data-type={type}
               data-group={group}
    >
      {!isNoIcon && (
        <div className="notification-secondary__pic">
          {placePic ? placePic : renderIcon()}
        </div>
      )}

      <div className="notification-secondary__content">
        {title && (
          <div className="notification-secondary__title">
            <Desc text={title}/>
          </div>
        )}

        <div className="notification-secondary__desc">
          <Desc text={text}/>
        </div>

        {date && (
          <div className="notification-secondary__date">
            <Desc text={date}/>
          </div>
        )}
      </div>

      {!isHideClose &&
        <div className="notification-secondary__close">
          <Icon size={DataAttrSize.S} icon={<IconClose16/>} handleClick={handleClose}/>
        </div>
      }
    </CustomTag>
  )
};

NotificationSecondary.propType = {
  text: PropTypes.string.isRequired,
  group: PropTypes.oneOf([
    NotificationGroup.PRIMARY,
    NotificationGroup.SECONDARY,
    NotificationGroup.TERTIARY
  ]).isRequired,
  type: PropTypes.oneOf([
    MessageType.INFO,
    MessageType.SUCCESS,
    MessageType.WARNING,
    MessageType.ERROR
  ]),
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.DEFAULT,
    DataAttrColorTheme.ORANGE_PRIMARY,
    DataAttrColorTheme.VELVET_PRIMARY,
    DataAttrColorTheme.RED_PRIMARY,
    DataAttrColorTheme.GREEN_PRIMARY,
  ]),
  isNoIcon: PropTypes.bool,
  placePic: PropTypes.element,
  icon: PropTypes.element,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  isHideClose: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default NotificationSecondary;
