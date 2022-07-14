import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import {replaceTag} from "../../../../services/utils/utils";
import IconWrap from "../../icons/IconWrap/IconWrap";
import Icon from "../../icons/Icon/Icon";
import {ReactComponent as IconInfo16} from "../../../../assets/img/icons/svg/16/icon-info-16.svg";
import Tooltip from "../../Tooltip/Tooltip";


const Value = (props) => {
  const { size, colorTheme, title, value, text, discount, additionalClass, customTagName } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "value": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      {(discount || title) && (
      <div className="value__header">
        {title && (
          <span className="value__title">
            {`${title}:`}
          </span>
        )}
        {discount && (
          <>
            <del className="value__del-text">
              {`${value} ${text}`}
            </del>
            <span className="value__discount">
              {`-${discount}%`}
            </span>

            <Tooltip colorTheme={DataAttrColorTheme.WHITE}
                     text={<><b>Информация об условиях: </b> <br />
                       Действует до 21 янв. 2021 или подобный текст </>}
                     position={'top'}
            >
              <Icon size={DataAttrSize.S}
                    colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                    icon={<IconInfo16 />} />
            </Tooltip>
          </>
        )}
      </div>
      )}
      <div className="value__body">
        {(discount && value) && `${(value - (value * discount / 100))}${text}`}
        {(!discount && value) && value}
        {(!discount && text) && text}
      </div>
    </CustomTag>
  )
};

Value.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_DARK_SECONDARY,
    DataAttrColorTheme.GRAY_PRIMARY,
    DataAttrColorTheme.INHERIT
  ]),
  value: PropTypes.number,
  text: PropTypes.string,
  discount: PropTypes.number,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Value;
