import React, {useEffect} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {get} from "lodash";
import {withTranslation} from "react-i18next";

const TextArea = ({
                      t,
                      register,
                      name,
                      params,
                      label,
                      errors,
                      property,
                      defaultValue,
                      setValue = () => {
                      },
                      column = [2, 6],
                      validations = {},
                      ...rest
                  }) => {
    useEffect(()=>{
        if(defaultValue){
            setValue(name,defaultValue)
        }
    },[defaultValue])
    return (
        <>
            <label
                className={`col-${column[0]} col-form-label text-right`}
                htmlFor={name}
            >
                {label ? t(`${label}`) : name}
            </label>
            <div className={`col-${column[1]}`}>
        <textarea
            className="form-control rounded-0 form-control-md"
            {...register(name, {required: get(validations, 'required') ? true : false, ...params})}
            {...property}
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

export default withTranslation("HRMS")(TextArea);
