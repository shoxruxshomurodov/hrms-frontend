import React from "react";
import {ErrorMessage} from "@hookform/error-message";
import InputMask from "react-input-mask";
import classNames from "classnames";
import {get} from "lodash";

const Inputmask = ({
                       register,
                       name,
                       label,
                       mask = "(99)-999-99-99",
                       sort,
                       property,
                       errors,
                       params,
                       defaultValue,
                       beforeMaskedValueChange = {},
                       column = [2, 6],
                       hideLabel=false
                   }) => {
  return (
    <>
        {!hideLabel &&  <label
          className={`col-${column[0]}  g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10 col-form-label text-right`}
          htmlFor={name}
      >
        {label ?? name}
      </label>}
     <div className={`col-${column[1]}`}>
         {get(property,'hasAppend',false) ? <div className={'input-group g-brd-primary--focus'}>
             <InputMask
                 mask={mask}
                 name={name}
                 maskChar={null}
                 {...register(name, params)}
                 className={classNames(`form-control g-py-10 g-px-15 ${get(property, 'className', '')}`, {
                     disabled: get(property, "disabled")
                 })}
                 defaultValue={defaultValue}
                 type={sort}
                 placeholder={get(property, 'placeholder', '')}
                 beforeMaskedValueChange={beforeMaskedValueChange}
             />
             <div className="input-group-append"><span
                 className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0"><i
                 className="icon-user"></i></span></div>
         </div> :  <InputMask
             mask={mask}
             name={name}
             maskChar={null}
             {...register(name, params)}
             className={classNames(`form-control g-py-10 g-px-15 ${get(property, 'className', '')}`, {
                 disabled: get(property, "disabled")
             })}
             defaultValue={defaultValue}
             type={sort}
             placeholder={get(property, 'placeholder', '')}
             beforeMaskedValueChange={beforeMaskedValueChange}
         />}
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

export default Inputmask;
