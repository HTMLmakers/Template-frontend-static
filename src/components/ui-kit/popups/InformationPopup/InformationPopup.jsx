import React from "react";
import PropTypes from "prop-types";

import {ReactComponent as IconInfo24} from "../../../../assets/img/icons/svg/24/icon-info-24.svg";

import {DataAttrSize, MessageType} from "../../../../services/consts/common";

import CustomPopup from "../CustomPopup";
import Icon from "../../icons/Icon/Icon";
import NotificationSecondary, {NotificationGroup} from "../../notifications/NotificationSecondary/NotificationSecondary";

export const setInformationData = (title, text, IconSrcComponent = null, messageType = null) => ({
  isInformationPopup: true,
  informationPopupTitle: title,
  informationPopupText: text,
  informationPopupIconSrcComponent: IconSrcComponent,
  informationPopupMessageType: messageType,
});


const InformationPopup = (props) => {
  const {
    isOpen,
    close,
    iconSrcComponent,
    text,
    messageType,
    ...rest
  } = props;

  return (
    <CustomPopup isOpen={isOpen}
                 close={close}
                 buttonCloseText="Закрыть"
                 isOnlyCloseButton
                 renderBodyComponent={() => (
                   <NotificationSecondary icon={<Icon size={DataAttrSize.M}
                                                      icon={iconSrcComponent ? iconSrcComponent : <IconInfo24/>} />}
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

InformationPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  iconSrcComponent: PropTypes.node,
  messageType: PropTypes.oneOf([
    MessageType.INFO,
    MessageType.SUCCESS,
    MessageType.WARNING,
    MessageType.ERROR,
    null,
  ]),
};

export default InformationPopup;
