import React from "react";

const DatePicker = ({ defaultValue ,onChange}) => {
  return (
    <input
      className="form-control rounded-0 form-control-md"
      onChange={(event) => {
        onChange(event);
      }}
      type="date"
      defaultValue={defaultValue}
    />
  );
};

export default DatePicker;
