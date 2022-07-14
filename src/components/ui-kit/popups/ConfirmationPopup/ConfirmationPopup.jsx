import React from "react";
import PropTypes from "prop-types";

import {ReactComponent as IconQuestion24} from "../../../../assets/img/icons/svg/24/icon-question-24.svg";

import {DataAttrColorTheme, DataAttrSize, MessageType} from "../../../../services/consts/common";

import CustomPopup from "../CustomPopup";
import Icon from "../../icons/Icon/Icon";
import NotificationSecondary, {NotificationGroup} from "../../notifications/NotificationSecondary/NotificationSecondary";
import ButtonPrimary from "../../buttons/ButtonPrimary/ButtonPrimary";

export const createConfirmationData = (title, text, IconSrcComponent = null, messageType = null, success) => (
  {
    isConfirmationPopup: true,
    confirmationPopupTitle: title,
    confirmationPopupText: text,
    confirmationPopupIconSrcComponent: IconSrcComponent,
    confirmationPopupMessageType: messageType,
    confirmationPopupSuccess: success
  }
);

const renderColorTheme = (messageType) => {
  switch (messageType) {
    case MessageType.ERROR:
      return DataAttrColorTheme.RED_PRIMARY
    case MessageType.SUCCESS:
      return DataAttrColorTheme.GREEN_PRIMARY
    case MessageType.WARNING:
      return DataAttrColorTheme.ORANGE_PRIMARY
    case MessageType.INFO:
      return DataAttrColorTheme.VELVET_PRIMARY
    default:
     return DataAttrColorTheme.BLUE_PRIMARY
  }
};


const ConfirmationPopup = (props) => {
  const {
    isOpen,
    close,
    iconSrcComponent,
    text,
    messageType,
    success,
    ...rest
  } = props;

  return (
    <CustomPopup isOpen={isOpen}
                 close={close}
                 success={success}
                 buttonMinWidth={96}
                 buttonCloseText="Нет"
                 renderButtonsBeforeComponent={() => (
                   <ButtonPrimary size={DataAttrSize.L}
                                  colorTheme={renderColorTheme(messageType)}
                                  text="Да"
                                  minWidth={96}
                                  handleClick={success}
                   />
                 )}
                 renderBodyComponent={() => (
                   <NotificationSecondary icon={<Icon size={DataAttrSize.M}
                                                      icon={iconSrcComponent ? iconSrcComponent : <IconQuestion24/>} />}
                                          text={text}
                                          type={messageType}
                                          group={NotificationGroup.TERTIARY}
                                          isHideClose
                   />
                 )}
                 {...rest}
    />
  )
};

ConfirmationPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  buttonMinWidth: PropTypes.string,
  success: PropTypes.func.isRequired,
  iconSrcComponent: PropTypes.node,
  messageType: PropTypes.oneOf([
    MessageType.INFO,
    MessageType.SUCCESS,
    MessageType.WARNING,
    MessageType.ERROR,
    null
  ]),
};

export default ConfirmationPopup;
