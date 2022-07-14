import React from "react";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import {DataAttrColorTheme} from "../../../services/consts/common";
import LinkPrimary from "../../ui-kit/links/LinkPrimary/LinkPrimary";
import Desc from "../../ui-kit/texts/Desc/Desc";


const ContactInfo = (props) => {
  const {size, colorTheme, additionalClass, customTagName} = props;

  const CustomTag = replaceTag(`address`, customTagName);

  const componentClasses = cn({
    "contact-info": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}

    >
      <div className="contact-info__phone">
        <Desc text="+7 (903) 941-02-27" />
      </div>
      <div className="contact-info__mail">
        <LinkPrimary text="support@reestrdoma.ru"
                     href="mailto:support@reestrdoma.ru"
                     colorTheme={DataAttrColorTheme.BLUE_LIGHT_PRIMARY}
        />
      </div>
    </CustomTag>
  )
};

export default ContactInfo;
