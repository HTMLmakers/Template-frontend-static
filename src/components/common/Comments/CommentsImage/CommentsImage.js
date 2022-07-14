import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import Photo1 from "../../../../assets/img/photo1.jpg";
import Photo2 from "../../../../assets/img/photo2.jpg";
import Photo3 from "../../../../assets/img/photo3.jpg";
import Photo4 from "../../../../assets/img/photo4.jpg";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconTrash24} from "../../../../assets/img/icons/svg/24/icon-trash-24.svg";


const CommentsImage = (props) => {
  const {size, colorTheme, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="comments-image"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <ul className="comments-image__list">
        <li className="comments-image__item">
          <div className="comments-image__pic">

            <img src={Photo1} alt=""/>

            <span className="comments-image__action">

              <ButtonPrimary size={DataAttrSize.M}
                             colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                             placeBefore={<Icon size={DataAttrSize.M} icon={<IconTrash24/>}/>}
              />

            </span>
          </div>
        </li>
        <li className="comments-image__item">
          <div className="comments-image__pic">

            <img src={Photo2} alt=""/>

            <span className="comments-image__action">

              <ButtonPrimary size={DataAttrSize.M}
                             colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                             placeBefore={<Icon size={DataAttrSize.M} icon={<IconTrash24/>}/>}
              />

            </span>
          </div>
        </li>
        <li className="comments-image__item">
          <div className="comments-image__pic">

            <img src={Photo3} alt=""/>

            <span className="comments-image__action">

              <ButtonPrimary size={DataAttrSize.M}
                             colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                             placeBefore={<Icon size={DataAttrSize.M} icon={<IconTrash24/>}/>}
              />

            </span>
          </div>
        </li>
        <li className="comments-image__item">
          <div className="comments-image__pic">

            <img src={Photo4} alt=""/>

            <span className="comments-image__action">

              <ButtonPrimary size={DataAttrSize.M}
                             colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                             placeBefore={<Icon size={DataAttrSize.M} icon={<IconTrash24/>}/>}
              />

            </span>
          </div>
        </li>
      </ul>
    </CustomTag>
  )
};


export default CommentsImage;
