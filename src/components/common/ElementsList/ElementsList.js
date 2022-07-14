import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import {DataAttrColorTheme} from "../../../services/consts/common";
import MarkPrimary from "../../ui-kit/marks/MarkPrimary/MarkPrimary";

const ElementsList = (props) => {

  const {size, elements, elementsCount = 3, counterSize, colorTheme, customTagName} = props;

  const CustomTag = replaceTag(`ul`, customTagName);

  return (
    <CustomTag className="elements-list"
               data-size={size}
               data-color-theme={colorTheme}

    >
      {elements.slice(0, elementsCount).map((person, index) => (
        <li className="elements-list__item" key={index}>
          {person}
        </li>
      ))}

      {elements.length > elementsCount && (
        <li className="elements-list__item">

          <MarkPrimary value={`+${elements.length - elementsCount}`}
                       size={counterSize}
                       colorTheme={DataAttrColorTheme.GRAY_TERTIARY}
          />

        </li>
      )}
    </CustomTag>
  )
};

export default ElementsList;
