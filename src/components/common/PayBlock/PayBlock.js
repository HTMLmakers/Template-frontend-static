import React from "react";

import "./styles.scss";
import ButtonPrimary from "../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import {
  DataAttrColorTheme,
  DataAttrSize,
} from "../../../services/consts/common";

import Label from "../forms/fields/Label/Label";
import InputText from "../forms/fields/form-fields/InputText/InputText";

import Desc from "../../ui-kit/texts/Desc/Desc";
import PaymentSystem from "../PaymentSystems/PaymentSystems";
import Value from "../../ui-kit/texts/Value/Value";


const PayBlock = (props) => {
  const {title, desc, isPayInvoice, placeBefore} = props;

  return (
    <div className="pay-block" data-pay-invoice={isPayInvoice}>
      <header className="pay-block__header">
        <h3 className="pay-block__title">{title}</h3>

        <Desc text={desc}
              size={DataAttrSize.S}
              colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
        />

      </header>

      <div className="pay-block__body">
        <form action="" className="pay-block__form">
            <div className="pay-block__form-body">
              {!isPayInvoice && (
                <div className="pay-block__input-wrap">

                  <Label text="Сумма, ₽" />

                  <InputText />

                </div>
              )}

              {isPayInvoice && (
                <Value size={DataAttrSize.L}
                       value={27663}
                       text="₽"
                       discount={10}
                />
              )}

            </div>
          <footer className="pay-block__form-footer">

            {isPayInvoice && placeBefore}

            <ButtonPrimary text="Оплатить картой"
                           size={DataAttrSize.L}
                           colorTheme={DataAttrColorTheme.BLUE_PRIMARY}
            />

            <ButtonPrimary text="Выставить счёт"
                           size={DataAttrSize.L}
                           colorTheme={DataAttrColorTheme.BLUE_SECONDARY}
            />
          </footer>
        </form>
      </div>

      <footer className="pay-block__footer">
        <PaymentSystem />
      </footer>
    </div>
  )
};

export default PayBlock;
