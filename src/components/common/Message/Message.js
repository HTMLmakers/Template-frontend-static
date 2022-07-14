import React from "react";
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

import "./styles.scss"

import {store} from "react-notifications-component";
import {DataAttrColorTheme, DataAttrSize, MessageType} from "../../../services/consts/common";
import NotificationSecondary, {NotificationGroup} from "../../ui-kit/notifications/NotificationSecondary/NotificationSecondary";

import {ReactComponent as IconTrash24} from "../../../assets/img/icons/svg/24/icon-trash-24.svg";
import Icon from "../../ui-kit/icons/Icon/Icon";
import IconWrap from "../../ui-kit/icons/IconWrap/IconWrap";

export const MessageContainer = {
  //container: one of...
  BOTTOM_LEFT: `bottom-left`,
  BOTTOM_RIGHT: `bottom-right`,
  TOP_FULL: `top-full`,
};

export const MessageDismiss = {
  //dismiss: one of...
  TIMEOUT: {
    duration: 10000,
    //click: false,
  },
};


export const createMessage = (type, title, text, isDeleteAction) => {
  const placePic = (type === MessageType.ERROR && isDeleteAction)
    ? {placePic: <IconWrap size={DataAttrSize.M}
                           colorTheme={DataAttrColorTheme.RED_PRIMARY}
                           icon={<Icon size={DataAttrSize.M} icon={<IconTrash24/>}/>}/>}
    : {}

  return <NotificationSecondary size="l"
                                title={title}
                                text={text}
                                type={type}
                                group={NotificationGroup.PRIMARY}
                                {...placePic}
  />
}

export const addMessage = (message, options = {}) => {
  store.addNotification({
    content: message,
    insert: "top",
    container: MessageContainer.BOTTOM_LEFT,
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"],// `animate.css v4` classes
    dismiss: MessageDismiss.TIMEOUT,
    ...options
  })
};

/**
 * Подключаем в верхней части приложения, чтобы оно не конфликтовало с другими абсолютно позиционированными элементами DOM
 * Для создания сообщения - import addMessage, createMessage - addMessage(createMessage(), options)
 */

const Message = () => {
  return <ReactNotification/>
};

export default Message;
