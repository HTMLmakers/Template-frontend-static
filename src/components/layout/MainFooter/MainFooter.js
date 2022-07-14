import React from "react";

import "./styles.scss";

import Copyright from "../../common/Copyright/Copyright";
import ContactInfo from "../../common/ContactInfo/ContactInfo";


const MainFooter = () => {

  return (
    <footer className="main-footer">
      <div className="main-footer__wrap">
        <div className="main-footer__copyright">

          <Copyright/>

        </div>
        <div className="main-footer__contact-info">

          <ContactInfo/>

        </div>
      </div>
    </footer>
  )
};

export default MainFooter;
