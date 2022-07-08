import React from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import { get } from "lodash";
const Inputmask = ({
  mask,
  property,
  defaultValue,
  type,
  beforeMaskedValueChange = {}
}) => {
  return (
    <InputMask
      mask={mask}
      maskChar={null}
      className={classNames("form-control g-py-10 g-px-15", {
        disabled: get(property, "disabled")
      })}
      defaultValue={defaultValue}
      type={type}
      beforeMaskedValueChange={beforeMaskedValueChange}
    />
  );
};

export default Inputmask;
