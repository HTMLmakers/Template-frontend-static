import React, {createRef, useEffect, useState} from "react";
import PropTypes from "prop-types";

import {ReactComponent as IconArrowRight16} from "../../../../assets/img/icons/svg/16/icon-arrow-right-16.svg";
import {ReactComponent as IconDownload24} from "../../../../assets/img/icons/svg/24/icon-download-24.svg";

import {DataAttrColorTheme, DataAttrSize, ElementPosition} from "../../../../services/consts/common";

import Slider from "../Slider/Slider";
import ButtonPrimary from "../../buttons/ButtonPrimary/ButtonPrimary";
import Tooltip from "../../Tooltip/Tooltip";
import Icon from "../../icons/Icon/Icon";


const Gallery = (props) => {
  const { imagesSrcFull, imagesSrcThumbnail, initialSlide = 0, ...rest } = props;

  const [fullSize, setFullSize] = useState(null);
  const [thumbnailSize, setThumbnailSize] = useState(null);
  const [asNavForIndex, setAsNavForIndex] = useState(initialSlide);

  const fullSizeRef = createRef();
  const thumbnailRef = createRef();

  useEffect(() => {
    setFullSize(fullSizeRef.current);
    setThumbnailSize(thumbnailRef.current);
  }, []);


  return (
    <div style={{maxWidth: 900, maxHeight: 600}}>
      <div className="full-size">
        <Slider asNavFor={thumbnailSize}
                initialSlide={initialSlide}
                dots={false}
                arrows={false}
                responsive={false}
                slidesToShow={1}
                fade={true}
                ref={fullSizeRef}
                beforeChange={(current, next) => setAsNavForIndex(next)}
        >
          {imagesSrcFull.map((imageSrc, index) => (
            <div key={index} style={{position: "relative"}}>
              <div>
                <img src={imageSrc} alt=""/>
              </div>

              <div style={{display: "inline-block", position: "absolute", bottom: 0, right: 0}}>
                <Tooltip colorTheme={DataAttrColorTheme.WHITE}
                         text="Скачать изображение"
                         position={ElementPosition.TOP}
                >
                  <ButtonPrimary colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                                 customTagName="a"
                                 href={imagesSrcFull[asNavForIndex]}
                                 placeBefore={<Icon icon={<IconDownload24 />} />}
                  />
                </Tooltip>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="thumbnails-size" style={{maxWidth: 200}}>
        <Slider asNavFor={fullSize}
                initialSlide={initialSlide}
                dots={false}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                arrowIconSrc={<IconArrowRight16/>}
                //centerMode={true}
                ref={thumbnailRef}
                {...rest}
        >
          {imagesSrcThumbnail.map((imageSrc, index) => (
            <div key={index} >
              <img src={imageSrc} alt="" style={{maxWidth: 50}}/>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
};

Gallery.propTypes = {
  imagesSrcFull: PropTypes.arrayOf(PropTypes.string).isRequired,
  imagesSrcThumbnail: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSlide: PropTypes.number,
};

export default Gallery;
