import React from "react";

import "./styles.scss";
import MirLogo from "../../../assets/img/mir-logo.svg";
import VisaLogo from "../../../assets/img/visa-logo.svg";
import MastercardLogo from "../../../assets/img/mastercard-logo.svg";


const PaymentSystem = () => {

  return (
     <ul className="payment-system">
       <li className="payment-system__item">
         <img className="payment-system__logo" src={MirLogo} alt="МИР"/>
       </li>
       <li className="payment-system__item">
         <img className="payment-system__logo" src={VisaLogo} alt="Visa"/>
       </li>
       <li className="payment-system__item">
         <img className="payment-system__logo" src={MastercardLogo} alt="Mastercard"/>
       </li>
     </ul>
  )
};


export default PaymentSystem;
