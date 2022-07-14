import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme} from "../../../../services/consts/common";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconBasket24} from "../../../../assets/img/icons/svg/24/icon-basket-24.svg";
import IconWrap from "../../../ui-kit/icons/IconWrap/IconWrap";
import Desc from "../../../ui-kit/texts/Desc/Desc";

const PlugSecondary = (props) => {

  const {
    size,
    component = <IconWrap colorTheme={DataAttrColorTheme.GRAY_SECONDARY}
                          icon={<Icon colorTheme={DataAttrColorTheme.WHITE}
                                      icon={<IconBasket24/>}/>}
                />,
    desc = "Пока ничего не добавлено",
    colorTheme,
    customTagName
  } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="plug-secondary"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="plug-secondary__content">

        {component}

        <Desc text={desc}/>

      </div>
    </CustomTag>
  )
};


export default PlugSecondary;
