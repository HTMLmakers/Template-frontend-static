import React from "react";

import "./styles.scss";
import {DataAttrColorTheme, DataAttrHeadingLevel, DataAttrSize} from "../../../services/consts/common";
import Icon from "../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconThreeDots24} from "../../../assets/img/icons/svg/24/icon-three-dots-24.svg";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Avatar from "../Avatar/Avatar";
import {replaceTag} from "../../../services/utils/utils";
import Heading from "../../ui-kit/texts/Heading/Heading";
import Desc from "../../ui-kit/texts/Desc/Desc";
import ElementsList from "../ElementsList/ElementsList";


const WorkerInfoBar = (props) => {
  const {size, colorTheme, avatar, name, desc, placeComponents, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="worker-info-bar"
               data-size={size}
               data-color-theme={colorTheme}
    >

      <div className="worker-info-bar__content">

        <Avatar imageSrc={avatar}/>

        <div className="worker-info-bar__wrap">

          <Heading text={name}
                   level={DataAttrHeadingLevel.LEVEL_5}
          />

          <Desc text={desc}/>

          <ElementsList elements={placeComponents}
                        elementsCount="4"
                        counterSize={DataAttrSize.XL}
          />

        </div>
      </div>

      <div className="worker-info-bar__controls">

        <ButtonPrimary size={DataAttrSize.M}
                       colorTheme={DataAttrColorTheme.GRAY_SECONDARY}
                       placeBefore={<Icon size={DataAttrSize.M} icon={<IconThreeDots24/>}/>}
        />

      </div>


    </CustomTag>
  )
};

export default WorkerInfoBar;
