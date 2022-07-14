import React from "react";
import {DataAttrColorTheme} from "../../../services/consts/common";

import ContextMenu from "../controls/ContextMenu/ContextMenu";
import {useWindowDimensions} from "../../../services/hooks/hooks";


export const ControlFixedPos = {
  START: `START`,
  END: `END`,
};

const controlItemRender = (item) => {
  return (
    <React.Fragment key={item.id}>
      {item.components[0]}
    </React.Fragment>
  )
};

const dropdownContentRender = (arr) => {
  return (
    [{
      lists: arr.map((item, i) => ({
        id: item.id,
        content: item.components[1],
        disabled: item.isDisabled
      }))
    }]
  )
};


const ControlListAdaptive = (props) => {
  const { size, colorTheme, controlItems } = props;

  const [currentWidth] = useWindowDimensions();

  const countControlItems = (controlItems, position = false) => {
    switch (position) {
      case ControlFixedPos.START:
        return controlItems.filter(it => it.fixed === ControlFixedPos.START);
      case ControlFixedPos.END:
        return controlItems.filter(it => it.fixed === ControlFixedPos.END);
      default:
        return controlItems.filter(it => !it.fixed);
    }
  };

  const isContextMenuShow = (currentWidth <= 767) && countControlItems(controlItems).length > 0;

  return (
    <>
      {currentWidth > 767 && (
        controlItems.map(controlItemRender)
      )}

      {currentWidth <= 767 && (
        <>
          {countControlItems(controlItems, ControlFixedPos.START).map(controlItemRender)}

          {isContextMenuShow && (
            <ContextMenu dropDownContent={dropdownContentRender(countControlItems(controlItems))}
                         colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
            />
          )}

          {countControlItems(controlItems, ControlFixedPos.END).map(controlItemRender)}
        </>
      )}
    </>
  )
};

export default ControlListAdaptive;
