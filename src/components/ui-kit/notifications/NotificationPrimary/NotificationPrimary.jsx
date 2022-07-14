import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize, MessageType} from "../../../../services/consts/common";
import Icon from "../../icons/Icon/Icon";

import {ReactComponent as IconAlertTriangle16} from "../../../../../common/assets/img/icons/svg/16/icon-alert-triangle-16.svg";
import {ReactComponent as IconInfo16} from "../../../../../common/assets/img/icons/svg/16/icon-info-16.svg";
import {ReactComponent as IconStatusBlock16} from "../../../../../common/assets/img/icons/svg/16/icon-status-block-16.svg";
import {ReactComponent as IconCheck16} from "../../../../../common/assets/img/icons/svg/16/icon-check-16.svg";

const createIcon = (iconComponentSrc) => (<Icon size={DataAttrSize.S} icon={iconComponentSrc}/>);


const NotificationPrimary = (props) => {
  const { size, colorTheme, icon, text, type, isNoIcon, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`div`, customTagName);


  const renderIcon = () => {
    switch (MessageType[type]) {
      case MessageType.WARNING:
        return createIcon(<IconAlertTriangle16/>)
      case MessageType.INFO:
        return createIcon(<IconInfo16/>)
      case MessageType.ERROR:
        return createIcon(<IconStatusBlock16/>)
      case MessageType.SUCCESS:
        return createIcon(<IconCheck16/>)
      default: return null
    }
  };

  const renderColorTheme = () => {
    switch (MessageType[type]) {
      case MessageType.WARNING:
        return DataAttrColorTheme.ORANGE_PRIMARY
      case MessageType.INFO:
        return DataAttrColorTheme.VELVET_PRIMARY
      case MessageType.ERROR:
        return DataAttrColorTheme.RED_PRIMARY
      case MessageType.SUCCESS:
        return DataAttrColorTheme.GREEN_PRIMARY
      default: return null
    }
  };

  const componentClasses = cn({
    "notification-primary": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme ? colorTheme : renderColorTheme()}
               data-type={type}
    >
      {(!isNoIcon && icon) && icon}
      {(!isNoIcon && !icon) && renderIcon()}

      <span className="notification-primary__text">{text}</span>
    </CustomTag>
  )
};

NotificationPrimary.propType = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    MessageType.INFO,
    MessageType.SUCCESS,
    MessageType.WARNING,
    MessageType.ERROR
  ]).isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.ORANGE_PRIMARY,
    DataAttrColorTheme.VELVET_PRIMARY,
    DataAttrColorTheme.RED_PRIMARY,
    DataAttrColorTheme.GREEN_PRIMARY,
  ]),
  icon: PropTypes.element,
  isNoIcon: PropTypes.bool,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default NotificationPrimary;
