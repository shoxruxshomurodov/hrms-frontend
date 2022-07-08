import React,{useState} from "react";
import {ErrorMessage} from "@hookform/error-message";

const Checkbox = (props) => {
  const {
    register,
    name,
      label,
    errors,
    params,
    property,
    defaultValue = false,
    control,
    column = [2, 6],
    onChange,
    ...rest
  } = props;
  return (
    <>
        <label
            className={`col-${column[0]} col-form-label text-right`}
            htmlFor={name}
        >
            {label ?? name}
        </label>
        <div className={`col-${column[1]}`}>
            <label className="form-check-inline u-check g-mr-20 mx-0 mb-0">
                <input
                    name={name}
                    {...register(name, params)}
                    className="g-hidden-xs-up g-pos-abs g-top-0 g-right-0"
                    type="checkbox"
                    defaultChecked={defaultValue}
                />
                <div className="u-check-icon-radio-v7">
                    <i className="fa" data-check-icon="" data-uncheck-icon=""></i>
                </div>
            </label>

            <ErrorMessage
                errors={errors}
                name={name}
                render={({messages = `${label ?? name} is required`}) => {
                    return <small className="form-control-feedback">{messages}</small>;
                }}
            />
        </div>
    </>
  );
};

export default Checkbox;
