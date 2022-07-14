import React, {forwardRef} from "react";
import ReactDatePicker, {CalendarContainer} from 'react-datepicker';
import PropTypes from 'prop-types';
import { getMonth, getYear } from 'date-fns';
import { ru } from 'date-fns/locale';
import _ from 'lodash';

import 'react-datepicker/dist/react-datepicker.css';
import "./styles.scss";

import {DataAttrColorTheme, DataAttrSize} from "../../../../../../services/consts/common";
import InputText from "../InputText/InputText";
import Icon from "../../../../../ui-kit/icons/Icon/Icon";

import {ReactComponent as IconArrowLeft16} from "../../../../../../assets/img/icons/svg/16/icon-arrow-left-16.svg";
import {ReactComponent as IconArrowRight16} from "../../../../../../assets/img/icons/svg/16/icon-arrow-right-16.svg";
import {ReactComponent as IconCalendar24} from "../../../../../../assets/img/icons/svg/24/icon-calendar-24.svg";
import {ReactComponent as IconClock24} from "../../../../../../assets/img/icons/svg/24/icon-clock-24.svg";
import {ReactComponent as IconAddUser16} from "../../../../../../assets/img/icons/svg/16/icon-add-user-16.svg";
import ButtonIcon from "../../../../../ui-kit/buttons/ButtonIcon/ButtonIcon";
import LinkPrimary from "../../../../../ui-kit/links/LinkPrimary/LinkPrimary";


const months = [
  `Январь`,
  `Февраль`,
  `Март`,
  `Апрель`,
  `Май`,
  `Июнь`,
  `Июль`,
  `Август`,
  `Сентябрь`,
  `Октябрь`,
  `Ноябрь`,
  `Декабрь`,
];

const years = _.range(1990, getYear(new Date()) + 1, 1);

const CustomInput = forwardRef((props, ref) => {
  const { value, onClick, onChange, placeholder, autoComplete, isTimePicker, ...rest } = props;

  return (
    <InputText value={value}
               onChange={onChange}
               handleClick={onClick}
               placeholder={placeholder || ``}
               autoComplete={autoComplete || `off`}
               placeAfter={<Icon size={DataAttrSize.M}
                                 icon={isTimePicker ? <IconClock24/> : <IconCalendar24 />}/>}
               {...rest}
    />
  )
});

const renderCustomHeader = (props) => {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  } = props;

  return (
    <div className="react-datepicker__control"
         style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}
    >
      <ButtonIcon additionalClass="react-datepicker__control-prev"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  placePic={<Icon size={DataAttrSize.S} icon={<IconArrowLeft16 />} />}
      />

      <div className="react-datepicker__selects">
        <select value={months[getMonth(date)]}
                onChange={({target: {value}}) => changeMonth(months.indexOf(value))}
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={getYear(date)}
                onChange={({target: {value}}) => changeYear(value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <ButtonIcon additionalClass="react-datepicker__control-next"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  placePic={<Icon size={DataAttrSize.S} icon={<IconArrowRight16 />} />}
      />
    </div>
  )
};

const renderCustomContainer = (props) => {
  const { className, children, onChange } = props;

  return (
    <CalendarContainer className={className}>
      <div className="react-datepicker__triangle"
           style={{position: "absolute", left: "0px", transform: "translate(85px, 0px)"}}
      />
      <div>
        {children}
        <div className="react-datepicker__footer">
          <LinkPrimary text="сбросить"
                       colorTheme={DataAttrColorTheme.GRAY_PRIMARY}
                       handleClick={() => onChange(``)}
          />
        </div>
      </div>
    </CalendarContainer>
  );
};


const DatePicker = (props) => {
  const { size, state, value, onChange, dateFormat, showTimeSelectOnly, ...rest } = props;

  return (
    <div className="date-picker"
         data-attr-color-theme={props.colorTheme}
    >
      <ReactDatePicker
        customInput={<CustomInput size={size} state={state} isTimePicker={showTimeSelectOnly}/>}
        calendarContainer={(props) => renderCustomContainer({onChange, ...props})}
        renderCustomHeader={renderCustomHeader}
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat || "dd.MM.yyyy"}
        locale={ru}
        showTimeSelectOnly={showTimeSelectOnly}
        {...rest}
      />
    </div>
  );
};

DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  showTimeSelectOnly: PropTypes.bool,
};

export default DatePicker;
