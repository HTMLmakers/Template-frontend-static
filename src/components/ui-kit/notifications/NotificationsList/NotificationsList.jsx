import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";


import {Operation} from "../../../../reducers/notifications/notifications";
import {AppOperation} from "../../../../reducers/app/app";
import {getNotifications, getNotificationsPagination} from "../../../../reducers/notifications/selectors";
import {DataAttrSize, MessageType} from "../../../../services/consts/common";

import NotificationSecondary, {NotificationGroup} from "../NotificationSecondary/NotificationSecondary";
import PropTypes from "prop-types";
import {dateParse} from "../../../../services/utils/utils";


const NotificationsList = (props) => {
  const { isResetAll, setIsResetAll, setFooterText } = props;

  const notifications = useSelector(getNotifications);
  const pagination = useSelector(getNotificationsPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setFooterText(`Уведомлений: ${pagination.objectsCount}`)
  }, [pagination])

  useEffect(() => {
    if (isResetAll) {
      alert("пока отключено")
      //deleteNotifications([280, 281]); //TODO: вернуть notifications.map(n => n.id)
      setIsResetAll(false);
    }
  }, [isResetAll])

  const deleteNotifications = (notificationsIds) => {
    if (notificationsIds.length) {
      return dispatch(Operation.deleteNotifications(notificationsIds))
        .then(() => dispatch(AppOperation.fetchUserStatistic()))
    }
  };

  const dangerouslyHTML = (str, searchValue, newValue) => {
    if (searchValue && newValue) return (<span dangerouslySetInnerHTML={{__html: str.replace(searchValue, newValue)}}/>)
    return (<span dangerouslySetInnerHTML={{__html: str}}/>);
  };

  const notifyFormat = (notify) => {
    let regExp = new RegExp(`${notify.title}`, `gi`)

    if (notify.type === 'HOUSE_SPECIFIED') {

      return dangerouslyHTML(notify.notify, regExp, `<b>${notify.title}</b><br/>`)
    }
    if (notify.type === 'REESTR_READY') {
      return dangerouslyHTML(notify.notify, regExp, `<b>${notify.title}</b><br/>`)
    }
    if (notify.type === 'ACTUALIZATION_READY') {
      return dangerouslyHTML(notify.notify, regExp, `<b>${notify.title}</b><br/>`)
    }
  };


  return (
    <>
      {notifications.map((notify, index) => (
        <NotificationSecondary key={index}
                               size={DataAttrSize.L}
                               text={notifyFormat(notify)}
                               date={dateParse(notify.createdAt, `dd MMMM 'в' HH:mm`)}
                               type={MessageType.SUCCESS}
                               group={NotificationGroup.SECONDARY}
                               handleClose={() => deleteNotifications([notify.id])}
        />
        )
      )}
    </>
  )
};

NotificationsList.propTypes = {
  isResetAll: PropTypes.bool.isRequired,
  setIsResetAll: PropTypes.func.isRequired,
  setFooterText: PropTypes.func.isRequired,
};

NotificationsList.defaultProps = {
  isClearAll: false,
}

export default NotificationsList;
