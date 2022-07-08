import React, {useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CustomDatePicker = ({
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
                              setValue,
                              ...rest
                          }) => {
    const [startDate, setStartDate] = useState(null);
    useEffect(() => {
        if (startDate) {
            setValue(name, moment(startDate).format("YYYY-MM-DD"));
        }

    }, [startDate])
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    return (
        <>
            {!hideLabel && <label className={`col-${column[0]} col-form-label text-right`} htmlFor={name}>
                {label ?? name}
            </label>}
            <div className={`col-${column[1]}`}>
                <Controller
                    name={name}
                    control={control}
                    rules={{required: startDate ? false : true}}
                    render={({field}) => (
                        <DatePicker
                            placeholderText='Select date'
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            filterDate={isWeekday}
                            className={"form-control rounded-0 form-control-md"}
                            minDate={moment().toDate()}
                            dateFormat="yyyy-MM-dd"
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

export default CustomDatePicker;
