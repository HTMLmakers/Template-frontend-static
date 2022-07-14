import React from "react";
import PropTypes from 'prop-types';

import DatePicker from "../DatePicker/DatePicker";


const TimePicker = (props) => {
  const { size, state, timeFormat, timeIntervals, timeCaption, value, onChange, ...rest } = props;

  return (
    <DatePicker
      size={size}
      state={state}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={timeIntervals || 15}
      timeCaption={timeCaption || "Время"}
      dateFormat={timeFormat || "HH:mm"}
      timeFormat={timeFormat || "HH:mm"}
      //calendarContainer={null}
      selected={value}
      onChange={onChange}
      {...rest}
    />
  );
};

TimePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  timeCaption: PropTypes.string,
};

export default TimePicker;
