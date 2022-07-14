import React from "react";
import ReactLoader from "react-loader-spinner";
import PropTypes from "prop-types";

import DefaultPopup from "../DefaultPopup";

const blockUiStyle = {
  content: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    background: `transparent`,
    border: `none`,
  },
  overlay: {zIndex: 99999},
};

const BlockUiPopup = (props) => {
  const { isOpen } = props;

  return (
    <DefaultPopup isOpen={isOpen}
                  close={() => null}
                  shouldCloseOnOverlayClick={false}
                  style={blockUiStyle}
    >
      <ReactLoader
        type="Circles"
        color="#21268A" //data-color="$color-blue-dark-primary"
        height={100}
        width={100}
      />
    </DefaultPopup>
  )
};

BlockUiPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default BlockUiPopup;
