import React, {useRef} from "react";

import "./styles.scss";
import {useElementDimensions, useHandleSidebarDropShowing} from "../../../services/hooks/hooks";
import cn from "classnames";
import {useSelector} from "react-redux";
import {getOpenSidebarDropClassNames} from "../../../reducers/app/selectors";
import ButtonClose from "../../common/controls/ButtonClose/ButtonClose";
import {DataAttrColorTheme} from "../../../services/consts/common";

export const SidebarDropClassName = {
  SLIDE_PAGE: `slide-page`,
  SLIDE_MAIN_NAV: `slide-main-nav`,
  SLIDE_NOTIFICATIONS: `slide-notifications`,
};


const SidebarDrop = (props) => {
  const { size, colorTheme, colorThemeCloseButton, position, isOuterOffset, isNotBorderRadius, additionalClass } = props;

  const sidebarRef = useRef();
  const openSidebarDropClassNames = useSelector(getOpenSidebarDropClassNames);
  const [currentWidth] = useElementDimensions(sidebarRef);
  const handleSidebarDropClose = useHandleSidebarDropShowing(additionalClass, false);

  const defaultStyle = {[position]: `-${(currentWidth + 32)}px`};

  const componentClasses = cn({
    "sidebar-drop": true,
    "sidebar-drop--hide": true,
    [additionalClass]: additionalClass,
  });

  return (
    <div className={componentClasses}
         data-size={size}
         data-color-theme={colorTheme}
         data-outer-offset={isOuterOffset}
         data-not-border-radius={isNotBorderRadius}
         data-position={position}
         style={openSidebarDropClassNames.includes(additionalClass) ? null : defaultStyle}
         ref={sidebarRef}
    >
      <ButtonClose colorTheme={colorThemeCloseButton}
                   handleClick={handleSidebarDropClose}
                   additionalClass="sidebar-drop__close"
      />
      {props.children}
    </div>
  )
};

export default SidebarDrop;
