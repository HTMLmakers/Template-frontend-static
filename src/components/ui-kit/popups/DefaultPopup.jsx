import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";


const DefaultPopup = (props) => {
  const { isOpen, close, ...rest } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      closeTimeoutMS={500}
      {...rest}
    >
      {props.children}
    </ReactModal>
  )
};

DefaultPopup.propStyles = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default DefaultPopup;
