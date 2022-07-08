import React from "react";
import classNames from "classnames";
import { get } from "lodash";
const Input = (props) => {
  const { defaultValue, property, type = "text" } = props;
  return (
    <input
      className={classNames("form-control rounded-0 form-control-md", {
        disabled: get(property, "disabled")
      })}
      defaultValue={defaultValue}
      readOnly={get(property, "disabled")}
      type={type}
    />
  );
};

export default Input;
