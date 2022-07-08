import React, {useEffect} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {get} from "lodash";

const Input = ({
                   register,
                   name,
                   label,
                   sort = "text",
                   errors,
                   params,
                   property,
                   defaultValue,
                   setValue = () => {
                   },
                   column = [2, 6],
                   hideLabel = false,
                   ...rest
               }) => {
    useEffect(() => {
        if (defaultValue) {
            setValue(name,defaultValue)
        }
    }, [defaultValue])
    return (
        <>
            {!hideLabel && <label
                className={`col-${column[0]} col-form-label text-right`}
                htmlFor={name}
            >
                {label ?? name}
            </label>}
            <div className={`col-${column[1]}`}>
                <input
                    type={sort}
                    className="form-control rounded-0 form-control-md"
                    name={name}
                    {...register(name, params)}
                    readOnly={get(property, "disabled")}
                    defaultValue={defaultValue}
                />
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

export default Input;
