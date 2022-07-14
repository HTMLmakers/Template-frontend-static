import React from "react";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";


const DateTime = (props) => {
  const {size, colorTheme, date, time, isWrap, additionalClass, customTagName} = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "date-time": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
               data-wrap={isWrap}
    >
      <span className="date-time__date">
        {date}
      </span>

      {time && (
        <span className="date-time__time">
          {time}
        </span>
      )}
    </CustomTag>
  )
};

export default DateTime;
