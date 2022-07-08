import React from "react";
const Checkbox = ({ defaultChecked, onChange }) => {
  return (
    <label className="form-check-inline u-check g-pl-25">
    <input
      className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"
      type="checkbox"
      defaultChecked={defaultChecked}
      onChange={(event) => {
        onChange(event);
      }}
    />
    <div className="u-check-icon-checkbox-v6 g-absolute-centered--y g-left-0">
      <i className="fa" data-check-icon="" />
    </div>
  </label>
  );
};

export default Checkbox;
