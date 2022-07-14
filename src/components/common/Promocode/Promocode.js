import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import Heading from "../../ui-kit/texts/Heading/Heading";
import {DataAttrHeadingLevel} from "../../../services/consts/common";
import Desc from "../../ui-kit/texts/Desc/Desc";


const Promocode = (props) => {
  const {size, colorTheme, desc, icon, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="promocode"
               data-size={size}
               data-color-theme={colorTheme}

    >
      <div className="promocode__heading">
        <Heading text="Промокод"
                 level={DataAttrHeadingLevel.LEVEL_6} />
      </div>

      <div className="promocode__desc">

        <Desc text={desc ? desc : "Введите 9-значный промокод"} />

      </div>

      <form action="" className="promocode__form">
        <div className="promocode__form-field">
          <input type="text" className="promocode__input" placeholder="XXX-XXX-XXX" maxLength="11"/>

          {icon ? (
            <span className="promocode__icon">
              {icon}
            </span>
          ) : (
            <span className="promocode__button">
              <ButtonPrimary text="Применить" size="s" colorTheme="white-primary"/>
            </span>
          )}
        </div>
      </form>
    </CustomTag>
  )
};

export default Promocode;
