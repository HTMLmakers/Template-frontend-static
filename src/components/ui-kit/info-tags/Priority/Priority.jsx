import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./styles.scss";

import {replaceTag} from "../../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../../services/consts/common";
import Icon from "../../icons/Icon/Icon";

import {ReactComponent as IconArrowsOne16} from "../../../../assets/img/icons/svg/16/icon-arrows-one-16.svg";
import {ReactComponent as IconArrowsTwo16} from "../../../../assets/img/icons/svg/16/icon-arrows-two-16.svg";
import {ReactComponent as IconArrowsThree16} from "../../../../assets/img/icons/svg/16/icon-arrows-three-16.svg";


export const DataAttrTypePriority = {
  HIGH: `high`,
  LOW: `low`,
  MEDIUM: `medium`,
};

const PriorityValue = {
  [DataAttrTypePriority.HIGH] : {
    colorTheme: DataAttrColorTheme.BLUE_DARK_SECONDARY,
    text: 'Высокий',
    icon: <IconArrowsThree16 />
  },
  [DataAttrTypePriority.MEDIUM] : {
    colorTheme: DataAttrColorTheme.GRAY_PRIMARY,
    text: 'Средний',
    icon: <IconArrowsTwo16 />
  },
  [DataAttrTypePriority.LOW] : {
    colorTheme: DataAttrColorTheme.GRAY_SECONDARY,
    text: 'Низкий',
    icon: <IconArrowsOne16 />
  }
};


const Priority = (props) => {
  const { size, type, additionalClass, customTagName } = props;

  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "priority": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={PriorityValue[type]?.colorTheme}
               data-type={type}
    >
      <span className="priority__icon-wrap">
        <Icon size={DataAttrSize.S} icon={PriorityValue[type]?.icon} />
      </span>

      <span className="priority__text">
        {PriorityValue[type]?.text}
      </span>
    </CustomTag>
  )
};

Priority.propTypes = {
  type: PropTypes.oneOf([
    DataAttrTypePriority.HIGH,
    DataAttrTypePriority.MEDIUM,
    DataAttrTypePriority.LOW
  ]).isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Priority;
