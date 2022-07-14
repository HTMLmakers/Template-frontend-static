import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import DateTime from "../../DateTime/DateTime";
import Avatar from "../../Avatar/Avatar";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import CommentsMessage from "../CommentsMessage/CommentsMessage";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconPlay24} from "../../../../assets/img/icons/svg/24/icon-play-24.svg";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";


const CommentsItem = (props) => {
  const {size, colorTheme, person, personAction, text, imageAvatar, control, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="comments-item"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="comments-item__date">

        <DateTime date="22 янв. 2021"
                  time="в 12:00"
        />

      </div>

      <div className="comments-item__content">

        <Avatar size={DataAttrSize.S}
                colorTheme={DataAttrColorTheme.ORANGE_PRIMARY}
                imageSrc={imageAvatar}
        />

        <CommentsMessage control={control}
                         person={person}
                         personAction={personAction}
                         text={text}
        />

        <ButtonPrimary text="2:34"
                       size={DataAttrSize.L}
                       colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                       placeBefore={<Icon size={DataAttrSize.M} icon={<IconPlay24/>}/>}

        />
      </div>
    </CustomTag>
  )
};


export default CommentsItem;
