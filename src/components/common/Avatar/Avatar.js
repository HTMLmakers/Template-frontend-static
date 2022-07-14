import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {randomInteger, replaceTag} from "../../../services/utils/utils";
import {DataAttrBg, DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";


const AVATAR_COLOR_THEMES = [
  DataAttrColorTheme.BLUE_PRIMARY,
  DataAttrColorTheme.BLUE_LIGHT_PRIMARY,
  DataAttrColorTheme.ORANGE_PRIMARY,
  DataAttrColorTheme.YELLOW_PRIMARY,
  DataAttrColorTheme.GREEN_PRIMARY,
  DataAttrColorTheme.AZURE_PRIMARY,
  DataAttrColorTheme.VELVET_PRIMARY,
  DataAttrColorTheme.RED_PRIMARY,
];

const AVATAR_ROTATES = [
  DataAttrBg.ROTATE_0,
  DataAttrBg.ROTATE_90,
  DataAttrBg.ROTATE_180,
  DataAttrBg.ROTATE_270,
];

const Avatar = (props) => {
  const { size, colorTheme, imageSrc, lastName, firstName, text, bg, additionalClass, customTagName } = props;

  const CustomTag = replaceTag(`div`, customTagName);
  const allowSrcUrl = imageSrc?.match(/.(jpg|png|jpeg|gif)$/ig);

  const componentClasses = cn({
    "avatar": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme || AVATAR_COLOR_THEMES[randomInteger(0, AVATAR_COLOR_THEMES.length - 1)]}
               data-bg={bg || AVATAR_ROTATES[randomInteger(0, AVATAR_ROTATES.length - 1)]}
    >
      {allowSrcUrl
        ? <img className="avatar__img"
               src={imageSrc}
               alt=""
          />
        :
          <div className="avatar__plug">
            <span className="avatar__name">
              {text || `${lastName ? lastName[0] : ''}${firstName ? firstName[0] : ''}`}
            </span>
          </div>
      }
    </CustomTag>
  )
};

Avatar.propTypes = {
  size: PropTypes.oneOf([
    DataAttrSize.XXXXL,
    DataAttrSize.XXXL,
    DataAttrSize.XXL,
    DataAttrSize.XL,
    DataAttrSize.L,
    DataAttrSize.M,
    DataAttrSize.S,
    DataAttrSize.XS,
  ]),
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_PRIMARY,
    DataAttrColorTheme.BLUE_LIGHT_PRIMARY,
    DataAttrColorTheme.ORANGE_PRIMARY,
    DataAttrColorTheme.YELLOW_PRIMARY,
    DataAttrColorTheme.GREEN_PRIMARY,
    DataAttrColorTheme.AZURE_PRIMARY,
    DataAttrColorTheme.VELVET_PRIMARY,
    DataAttrColorTheme.RED_PRIMARY,
  ]),
  imageSrc: PropTypes.string,
  text: PropTypes.string,
  bg: PropTypes.oneOf([DataAttrBg.ROTATE_0, DataAttrBg.ROTATE_90, DataAttrBg.ROTATE_180, DataAttrBg.ROTATE_270]),
  componentClasses: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Avatar;
