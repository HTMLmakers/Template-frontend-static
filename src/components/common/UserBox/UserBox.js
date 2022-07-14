import React from "react";

import "./styles.scss";
import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";
import Image from "../../../assets/img/temp/avatar.jpg";
import Avatar from "../Avatar/Avatar";
import DateTime from "../DateTime/DateTime";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Icon from "../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconEdit24} from "../../../assets/img/icons/svg/24/icon-edit-24.svg";
import {ReactComponent as IconPlus24} from "../../../assets/img/icons/svg/24/icon-plus-24.svg";
import {ReactComponent as IconChartLines24} from "../../../assets/img/icons/svg/24/icon-chart-lines-24.svg";
import {ReactComponent as IconSpeaker24} from "../../../assets/img/icons/svg/24/icon-speaker-24.svg";
import {ReactComponent as IconHeadphone24} from "../../../assets/img/icons/svg/24/icon-headphone-24.svg";
import MarkPrimary from "../../ui-kit/marks/MarkPrimary/MarkPrimary";
import ElementsWrap from "../../ui-kit/wraps/ElementsWrap/ElementsWrap";
import UserInfo from "../UserInfo/UserInfo";



const UserBox = (props) => {
  const {name, surname, patronymic, status, date} = props;

  return (
    <div className="user-box">
      <UserInfo colorTheme={DataAttrColorTheme.BLUE_DARK_SECONDARY}
                name={name}
                surname={surname}
                patronymic={patronymic}
                status={status}
                isAvatarButton
      />

      <div className="user-box__controls">
        <ElementsWrap size={DataAttrSize.M}
                      isNoWrap>

          <ButtonPrimary colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                         placeBefore={<><Icon size={DataAttrSize.M} icon={<IconChartLines24 />} /></>}
          />

          <ButtonPrimary colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                         placeBefore={<><Icon size={DataAttrSize.M} icon={<IconSpeaker24 />} /></>}
          />

          <ButtonPrimary colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                         placeBefore={<><Icon size={DataAttrSize.M} icon={<IconHeadphone24 />} /></>}
          />

          <MarkPrimary value="+2"
                       colorTheme={DataAttrColorTheme.GRAY_TERTIARY}
          />

          <ButtonPrimary colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                         placeBefore={<><Icon size={DataAttrSize.M} icon={<IconPlus24 />} /></>}
          />

        </ElementsWrap>
      </div>

      <span className="user-box__date">
        Дата регистрации:
        <DateTime size={DataAttrSize.M}
                                    colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                                    date={date}
        />
      </span>
    </div>
  )
};

export default UserBox;
