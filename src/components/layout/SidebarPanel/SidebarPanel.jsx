import React, {useState} from "react";

import "./styles.scss";

import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";

import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import MarkPrimary from "../../ui-kit/marks/MarkPrimary/MarkPrimary";
import Scroll from "../../ui-kit/Scroll/Scroll";


const SidebarPanel = (props) => {
  const {
    title,
    buttonText,
    size,
    position,
    isInnerOffset,
    isOuterOffset,
    isNotBorderRadius,
  } = props;

  const [isResetAll, setIsResetAll] = useState(false);
  const [footerText, setFooterText] = useState(``);


  return (
    <div className="sidebar-panel"
         data-size={size}
         data-inner-offset={isInnerOffset}
         data-outer-offset={isOuterOffset}
         data-not-border-radius={isNotBorderRadius}
         data-position={position}
    >
      <header className="sidebar-panel__header">
        <div className="sidebar-panel__header-section">
          <h3 className="sidebar-panel__title">{title}</h3>
          {/*<MarkPrimary value="2"
                       size={DataAttrSize.L}
                       colorTheme={DataAttrColorTheme.ORANGE_PRIMARY}
          />*/}
        </div>
        <div className="sidebar-panel__header-section">
          <ButtonPrimary size={DataAttrSize.L}
                         colorTheme={DataAttrColorTheme.GRAY_SECONDARY}
                         text={buttonText}
                         handleClick={() => setIsResetAll(true)}
          />
          {/*Крестик в SidebarDrop*/}
        </div>
      </header>

        <div className="sidebar-panel__body" style={{width: 450}}>
          <Scroll>
            {React.cloneElement(props.children, {isResetAll, setIsResetAll, setFooterText})}
          </Scroll>
        </div>

      <footer className="sidebar-panel__footer">
        <span className="sidebar-panel__desc">
          {footerText && footerText}
        </span>
      </footer>
    </div>
  )
};

export default SidebarPanel;
