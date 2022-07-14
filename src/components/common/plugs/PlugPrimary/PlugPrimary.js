import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import Heading from "../../../ui-kit/texts/Heading/Heading";
import {DataAttrColorTheme, DataAttrHeadingLevel, DataAttrSize} from "../../../../services/consts/common";
import Desc from "../../../ui-kit/texts/Desc/Desc";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconPlus24} from "../../../../assets/img/icons/svg/24/icon-plus-24.svg";
import ButtonPrimary from "../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";

import Image from "../../../../assets/img/img_2.jpg"

const PlugPrimary = (props) => {
  const {
    size,
    heading = "Начните работу с добавления дома",
    desc = "Свободу слова не задушить, пусть даже в провинциях ещё есть чем поживиться текст в пару строк",
    imgSrc = Image,
    button = <ButtonPrimary text="Добавить дом"
                            colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                            placeBefore={<Icon size={DataAttrSize.M}
                                               icon={<IconPlus24/>}/>}
             />,
    colorTheme,
    customTagName
  } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="plug-primary"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="plug-primary__content">

        <img className="plug-primary__img"
             src={imgSrc}
             alt=""/>

        <Heading text={heading}
                 level={DataAttrHeadingLevel.LEVEL_5}
        />

        <Desc text={desc}/>

        {button}

      </div>
    </CustomTag>
  )
};


export default PlugPrimary;
