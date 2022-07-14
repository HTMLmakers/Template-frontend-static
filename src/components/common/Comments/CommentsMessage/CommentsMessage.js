import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrSize} from "../../../../services/consts/common";
import {ReactComponent as IconEdit16} from "../../../../../common/assets/img/icons/svg/16/icon-edit-16.svg";
import {ReactComponent as IconClose16} from "../../../../../common/assets/img/icons/svg/16/icon-close-16.svg";

import Icon from "../../../ui-kit/icons/Icon/Icon";
import Desc from "../../../ui-kit/texts/Desc/Desc";
import CommentsImage from "../CommentsImage/CommentsImage";


const CommentsMessage = (props) => {
  const {size, colorTheme, person, personAction, control, text, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="comments-message"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="comments-message__header">
        <p className="comments-message__person">
          {person}
          <span className="comments-message__person-action">
            {personAction}
          </span>
        </p>

        {control && (
          <div className="comments-message__control">

            <Icon size={DataAttrSize.S}
                  icon={<IconEdit16 />}
            />

            <Icon size={DataAttrSize.S}
                  icon={<IconClose16 />}
            />
          </div>
        )}
      </div>

      <div className="comments-message__body">
        <div className="comments-message__text">

          <Desc text={text} />

        </div>

        <CommentsImage />

      </div>
    </CustomTag>
  )
};


export default CommentsMessage;
