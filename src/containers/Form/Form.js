import React from "react";
import {useForm} from "react-hook-form";
import helper from "./helper";
import {get} from "lodash";

const Form = ({colBtn = 6, ...props}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        setValue,
        getValues,
        watch
    } = useForm();
    const onSubmit = (data) => {
        const {formRequest} = props;
        formRequest(data);
    };
    const {
        CustomButton,
        values = [],
        sign = () => {
        },
        cancelLink,
        isFetched,
        buttonText,
        disabled = false,
        column=[2,6],
        unSign = () => {
        },
        eimzo = () => {
        }
    } = props;
    const attrs = {register, errors, control, setValue, watch, getValues, sign, unSign,eimzo,column, ...props};
    return (
        <form
            className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30 "
            onSubmit={handleSubmit(onSubmit)}
        >
            {values &&
                values.map((value) => {
                    return (
                        <div className="form-group g-mb-25 row align-items-center" key={get(value, "id", 1)}>
                            {helper.choose({value, attrs, setValue})}
                        </div>
                    );
                })}
            <CustomButton
                col={colBtn}
                buttonText={buttonText}
                cancelLink={cancelLink}
                isFetched={isFetched}
                disabled={disabled}
                sign={sign}
            />
        </form>
    );
};

export default Form;
