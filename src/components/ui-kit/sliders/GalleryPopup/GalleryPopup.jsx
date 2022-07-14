import React from "react";


import DefaultPopup from "../../popups/DefaultPopup";
import Gallery from "../Gallery/Gallery";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import ButtonClose from "../../../common/controls/ButtonClose/ButtonClose";

const galleryStyle = {
  content: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    minWidth: `90vw`,
    minHeight: `90vh`,
  },
};


const GalleryPopup = (props) => {
  const { isOpen, close, imagesSrcFull, imagesSrcThumbnail, initialSlide, ...rest } = props;


  return (
    <DefaultPopup isOpen={isOpen}
                  close={close}
                  shouldCloseOnOverlayClick={true}
                  style={galleryStyle}
                  {...rest}
    >
      <div>
        <ButtonClose size={DataAttrSize.L}
                     colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                     handleClick={close}
                     style={{position: "fixed", zIndex: 999, top: 10, right: 10}}
        />
        <div style={{minWidth: "80vw", minHeight: "80vh", display: `flex`, alignItems: `center`, justifyContent: `center`}}>
          <Gallery imagesSrcFull={imagesSrcFull}
                   imagesSrcThumbnail={imagesSrcThumbnail}
                   initialSlide={initialSlide}
          />
        </div>
      </div>
    </DefaultPopup>
  )
};

export default GalleryPopup;
