import React from "react";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import {DataAttrSize} from "../../../services/consts/common";

import InputText from "../forms/fields/form-fields/InputText/InputText";
import Icon from "../../ui-kit/icons/Icon/Icon";
import ButtonIcon from "../../ui-kit/buttons/ButtonIcon/ButtonIcon";

import {ReactComponent as IconSearch24} from "../../../../common/assets/img/icons/svg/24/icon-search-24.svg";
import {ReactComponent as IconClose16} from "../../../../common/assets/img/icons/svg/16/icon-close-16.svg";



const Search = (props) => {
  const {size, colorTheme, placeholder="Поиск по разделу", additionalClass, customTagName} = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "search": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >

      <InputText additionalClass="search__input"
                 placeBefore={<Icon size={DataAttrSize.M} icon={<IconSearch24 />} />}
                 placeAfter={<ButtonIcon placePic={<Icon size={DataAttrSize.S} icon={<IconClose16 />} />} />}
                 placeholder={placeholder}
      />

    </CustomTag>
  )
};

export default Search;
