import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {getLoaderStatus} from "../../../reducers/app/selectors";
import {getConfirmationPopupProps, getInformationPopupProps} from "../../../reducers/popups/selectors";
import {PopupsActionCreator} from "../../../reducers/popups/popups";


import BlockUiPopup from "../../ui-kit/popups/BlockUiPopup/BlockUiPopup";
import ConfirmationPopup from "../../ui-kit/popups/ConfirmationPopup/ConfirmationPopup";
import InformationPopup from "../../ui-kit/popups/InformationPopup/InformationPopup";
import Message from "../../common/Message/Message";

const DefaultModuleComponents = (props) => {

  const isLoaderShowing = useSelector(getLoaderStatus);
  const confirmationPopupProps = useSelector(getConfirmationPopupProps);
  const informationPopupProps = useSelector(getInformationPopupProps);
  const dispatch = useDispatch();


  return (
    <>
      <Message/>

      <BlockUiPopup isOpen={isLoaderShowing}/>

      <ConfirmationPopup width={640}
                         close={() => dispatch(PopupsActionCreator.setConfirmationPopup({isConfirmationPopup: false}))}
                         {...confirmationPopupProps}
      />

      <InformationPopup width={640}
                        close={() => dispatch(PopupsActionCreator.setInformationPopup({isInformationPopup: false}))}
                        {...informationPopupProps}
      />
    </>
  )
};

export default DefaultModuleComponents;
