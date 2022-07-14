import React from "react";

import "./styles.scss";

import {DataAttrColorTheme, DataAttrHeadingLevel} from "../../../services/consts/common";
import Avatar from "../Avatar/Avatar";
import Icon from "../../ui-kit/icons/Icon/Icon";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";

import {ReactComponent as IconEdit24} from "../../../assets/img/icons/svg/24/icon-edit-24.svg";
import {replaceTag} from "../../../services/utils/utils";
import cn from "classnames";
import Heading from "../../ui-kit/texts/Heading/Heading";


const UserInfo = (props) => {
  const { size, colorTheme, avatarImageSrc, name, surname, patronymic, status, isAvatarButton, customTagName, additionalClass } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "user-info": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="user-info__avatar">
        <Avatar colorTheme={DataAttrColorTheme.ORANGE_PRIMARY}
                imageSrc={avatarImageSrc}
                lastName={surname}
                firstName={name}
        />
        {isAvatarButton && (
          <ButtonPrimary colorTheme={DataAttrColorTheme.BLUE_SECONDARY}
                         placeAfter={<Icon icon={<IconEdit24 />} />}
          />
        )}
      </div>
      <div className="user-info__content">
        <Heading text={<><span>{surname}</span> {name} {patronymic}</>}
                 level={DataAttrHeadingLevel.LEVEL_5}
                 additionalClass="user-info__name"
        />
        <span className="user-info__status">
          {status}
        </span>
      </div>

    </CustomTag>
  )
};

export default UserInfo;
