import React, {useState} from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import {AttrType, DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";
import Header from "../../layout/Header/Header";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import ButtonClose from "../../common/controls/ButtonClose/ButtonClose";
import ElementsWrap from "../wraps/ElementsWrap/ElementsWrap";
import DefaultPopup from "./DefaultPopup";


const CustomPopup = (props) => {
  const {
    isOpen,
    close,
    heading,
    headerDescText,
    headerControlItems,
    headerPlaceAfter,
    success,
    renderBodyComponent,
    renderButtonsBeforeComponent,
    renderButtonsAfterComponent,
    buttonSuccessText = `Сохранить`,
    buttonCloseText = `Отменить`,
    isOnlyCloseButton = false,
    isHideCloseButtons = false,
    isHideClose = false,
    isHideFooter = false,
    isHideButtonsBefore = false,
    isRequiredFields = false,
    formId,
    width,
    height,
    buttonMinWidth,
    ...rest
  } = props;

  const [dataPopup, setDataPopup] = useState({})

  const closePopup = () => {
    setDataPopup({});
    close();
  }
  const successAction = () => {
    success(dataPopup);
    closePopup();
  };

  const successProps = formId ? {form: formId, type: AttrType.SUBMIT} : {handleClick: successAction};

  const setCustomStyles = () => {
    let content= {};

    if (width) content = {...content, maxWidth: width, minWidth: width};
    if (height) content = {...content, minHeight: height};

    return {content};
  }

  return (
    <DefaultPopup isOpen={isOpen}
                  close={closePopup}
                  style={(width || height) ? setCustomStyles() : {}}
                  {...rest}
    >
      <div className="popup"
           data-not-close={isHideClose}>
        <header className="popup__header">
          <Header heading={heading}
                  desc={headerDescText}
                  placeAfter={headerPlaceAfter}
                  controlItems={headerControlItems}
                  size={DataAttrSize.M}
                  customTagName="div"
          />

          {(!isHideCloseButtons && !isHideClose) && (
            <ButtonClose colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                         additionalClass="popup__close"
                         handleClick={closePopup}
            />
          )}
        </header>

        <div className="popup__body">
          {renderBodyComponent(setDataPopup)}
        </div>

        {!isHideFooter && (
          <footer className="popup__footer">
            {isRequiredFields && (<p className="popup__info">* Обязательные для заполнения поля</p>)}

            <div className="popup__controls">

              {!isHideButtonsBefore && (
                <ElementsWrap additionalClass="popup__controls-before">
                  {(!isOnlyCloseButton && renderButtonsBeforeComponent) &&
                  renderButtonsBeforeComponent(dataPopup, setDataPopup)
                  }

                  {(!isOnlyCloseButton && !renderButtonsBeforeComponent) && (
                    <ButtonPrimary size={DataAttrSize.L}
                                   colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
                                   text={buttonSuccessText}
                                   minWidth={buttonMinWidth}
                                   {...successProps}
                    />
                  )}

                  {!isHideCloseButtons && (
                    <ButtonPrimary size={DataAttrSize.L}
                                   colorTheme={DataAttrColorTheme.WHITE_PRIMARY}
                                   text={buttonCloseText}
                                   minWidth={buttonMinWidth}
                                   handleClick={closePopup}
                    />
                  )}
                </ElementsWrap>
              )}

              {(!isOnlyCloseButton && renderButtonsAfterComponent) && (
                <ElementsWrap additionalClass="popup__controls-after">
                  {renderButtonsAfterComponent(dataPopup, setDataPopup)}
                </ElementsWrap>
              )}
            </div>
          </footer>
        )}

      </div>
    </DefaultPopup>
  )
};

CustomPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  headerDescText: PropTypes.string,
  headerControlItems: PropTypes.array,
  headerPlaceAfter: PropTypes.node,
  success: PropTypes.func,
  renderBodyComponent: PropTypes.func,
  renderButtonsBeforeComponent: PropTypes.func,
  renderButtonsAfterComponent: PropTypes.func,
  buttonSuccessText: PropTypes.string,
  buttonCloseText: PropTypes.string,
  isOnlyCloseButton: PropTypes.bool,
  isHideCloseButton: PropTypes.bool,
  isHideFooter: PropTypes.bool,
  isRequiredFields: PropTypes.bool,
  formId: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.string,
  buttonMinWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomPopup;
