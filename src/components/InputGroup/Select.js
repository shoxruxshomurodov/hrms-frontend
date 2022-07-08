import React from "react";
import { get } from "lodash";
import classNames from "classnames";
const Select = ({ options, defaultValue, property, onChange }) => {
  return (
    <select
      className={classNames("form-control rounded-0 form-control-md", {
        disabled: get(property, "disabled")
      })}
      defaultValue={defaultValue}
      onChange={(event) => {
        onChange(event);
      }}
    >
      {options &&
        options.map((option) => {
          return (
            <option key={get(option, "value")} value={get(option, "value")}>
              {get(option, "label")}
            </option>
          );
        })}
    </select>
  );
};

export default Select;
