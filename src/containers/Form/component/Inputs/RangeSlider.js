import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Controller} from "react-hook-form";
import Slider, {Range} from 'rc-slider';
import {get, range} from "lodash";
import {ErrorMessage} from "@hookform/error-message";
import 'rc-slider/assets/index.css';

const Styled = styled.div`

`;
const RangeSlider = ({
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
                         setValue,
                         ...rest
                     }) => {
    const [val, setVal] = useState(0)
    useEffect(() => {
    if(val) {
        setValue(name, val)
    }
    }, [val])
    return (
        <>
            {!hideLabel && <label className={`col-${column[0]} col-form-label text-right`} htmlFor={name}>
                {label ?? name}
            </label>}
            <div className={`col-${column[1]}`}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({field}) => (
                        <Slider
                            min={0}
                            max={parseInt(get(properties,'max',10))}
                            dots={true}
                            step={1}
                            marks={range(0, parseInt(get(properties,'max',10))+1)}
                            onChange={(v) => setVal(v)}
                            trackStyle={{background: '#72c02c'}}
                            handleStyle={{
                                background: '#72c02c',
                                borderColor: '#72c02c'
                            }}
                            activeDotStyle={{
                                borderColor: '#72c02c'
                            }}
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

export default RangeSlider;