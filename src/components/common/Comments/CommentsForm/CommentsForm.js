import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import Avatar from "../../Avatar/Avatar";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconPhoto24} from "../../../../../common/assets/img/icons/svg/24/icon-photo-24.svg";
import {ReactComponent as IconAt24} from "../../../../../common/assets/img/icons/svg/24/icon-at-24.svg";
import {ReactComponent as IconSend24} from "../../../../../common/assets/img/icons/svg/24/icon-send-24.svg";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import CommentsImage from "../CommentsImage/CommentsImage";


const CommentsForm = (props) => {
  const {size, colorTheme, imageAvatar, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="comments-form"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <Avatar size={DataAttrSize.S}
              colorTheme={DataAttrColorTheme.ORANGE_PRIMARY}
              imageSrc={imageAvatar}
      />

      <form action="" className="comments-form__form">
        <div className="comments-form__form-container">
          <div className="comments-form__field">
            <div className="comments-form__textarea">

              <textarea name="">
              </textarea>

              <span className="comments-form__action">

              <Icon size={DataAttrSize.M}
                    icon={<IconAt24/>}/>

              <Icon size={DataAttrSize.M}
                    icon={<IconPhoto24/>}/>

            </span>
            </div>

            <CommentsImage/>

          </div>

          <span className="comments-form__button">

            <ButtonPrimary size={DataAttrSize.L}
                           colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                           placeBefore={<Icon size={DataAttrSize.M} icon={<IconSend24/>}/>}

            />
          </span>
        </div>
      </form>
    </CustomTag>
  )
};


export default CommentsForm;
