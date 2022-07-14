import React from "react";

import "./styles.scss";
import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";
import Icon from "../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconThreeDots24} from "../../../assets/img/icons/svg/24/icon-three-dots-24.svg";
import {ReactComponent as IconPrint24} from "../../../assets/img/icons/svg/24/icon-print-24.svg";
import {ReactComponent as IconArchieve24} from "../../../assets/img/icons/svg/24/icon-archive-24.svg";
import {ReactComponent as IconLink24} from "../../../assets/img/icons/svg/24/icon-link-24.svg";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Desc from "../../ui-kit/texts/Desc/Desc";



const ControlBar = (props) => {
  const {} = props;

  return (
    <div className="control-bar">
      <div className="control-bar__section">
        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                       placeBefore={<Icon size={DataAttrSize.M} icon={<IconPrint24 />} />}
        />
        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                       placeBefore={<Icon size={DataAttrSize.M} icon={<IconArchieve24 />} />}
        />
        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                       placeBefore={<Icon size={DataAttrSize.M} icon={<IconLink24 />} />}
        />
        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                       placeBefore={<Icon size={DataAttrSize.M} icon={<IconThreeDots24 />} />}
        />
        <p className="control-bar__info">
          Показано: 15
        </p>
      </div>
      <div className="control-bar__section">
        <p className="control-bar__info">
          <span>Последние изменения:</span>
          22 янв. 2021 в 12:30
        </p>
        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                       text="Отказаться"
        />
        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                       text="Взять в работу"
        />
      </div>
    </div>
  )
};

export default ControlBar;
