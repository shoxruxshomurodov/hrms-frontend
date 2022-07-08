import React from "react";
import Select from "react-select";
import {withTranslation} from "react-i18next";
import {Controller} from "react-hook-form";
import {get} from "lodash";
import {ErrorMessage} from "@hookform/error-message";

const SelectAsync = (props) => {
    let {
        options,
        t,
        defaultValue,
        name,
        register,
        params,
        errors,
        property,
        control,
        label,
        onchange = () => {
        },
        column = [2, 6],
        hideLabel=false,
        ...rest
    } = props;
  return (
    <>
        {!hideLabel && <label
        className={`col-${column[0]} col-form-label text-right`}
        htmlFor={name}
      >
        {label ?? name}
      </label>}
      <div className={`col-${column[1]}`}>
        <Controller
          name={name}
           control={control}
          rules={{ required: defaultValue ? false : true }}
          defaultValue={get(defaultValue,"value")}
          render={({ field: { onChange, onBlur, value, ref, name } }) => {
            return (
              <Select
                name={name}
                ref={ref}
                {...register(name, value ? !params : params)}
                onChange={(event) => {
                  onchange(name, event);
                  onChange(get(event, "value", ""));
                }}
                isClearable={true}
                clearValue={""}
                options={options}
                className="form-control form-control-sm rounded-0"
                isDisabled={get(property, "disabled")}
                menuPlacement={"bottom"}
                onBlur={onBlur}
                placeholder={t("Choose...")}
                defaultValue={defaultValue}
                isSearchable={false}
              />
            );
          }}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages = `${label ?? name} is required` }) => {
            return <small className="form-control-feedback">{messages}</small>;
          }}
        />
      </div>
    </>
  );
};

export default withTranslation("HRMS")(SelectAsync);
