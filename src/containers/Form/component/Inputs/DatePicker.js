import React,{useEffect} from "react";
import {Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {get} from "lodash";

const DatePicker = ({
                        register,
                        name,
                        errors,
                        params,
                        label,
                        property,
                        defaultValue,
                        control,
                        column = [2, 6],
                        hideLabel = false,
                        properties,
                        dateType = "date",
                        setValue=()=>{},
                        ...rest
                    }) => {
    useEffect(() => {
        if (defaultValue) {
            setValue(name,defaultValue);
        }
    }, [defaultValue]);
    return (
        <>
            {!hideLabel && <label className={`col-${column[0]} col-form-label text-right`} htmlFor={name}>
                {label ?? name}
            </label>}
            <div className={`col-${column[1]}`}>
                <Controller
                    name={name}
                    control={control}
                    rules={{required: defaultValue ? false : true}}
                    defaultValue={defaultValue}
                    render={({field}) => (
                        <input
                            {...field}
                            className="form-control rounded-0 form-control-md"
                            type={dateType}
                            defaultValue={defaultValue}
                            id={name}
                            name={name}
                            {...register(name, params)}
                            {...property}
                            min={get(properties, 'turn_off_old_dates', false) ? new Date().toISOString().split('T')[0] : null}
                        />
                    )}
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

export default DatePicker;
