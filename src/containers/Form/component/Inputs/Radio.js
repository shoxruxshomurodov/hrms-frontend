import React, {useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {withTranslation} from "react-i18next";
import {isEmpty, get} from "lodash";
import classNames from "classnames";

const Radio = (props) => {
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
        options = [],
        t,
        hide = false,
        ...rest
    } = props;
    return (
        <>
            <label
                className={classNames(`col-${column[0]} col-form-label text-right`)}
                htmlFor={name}
            >
                {label ?? name}
            </label>
            {
                isEmpty(options) ? <div className={`col-${column[1]}`}>
                    <div className={classNames("row")}>
                        <div className="col-md-4">
                            <label className="u-check w-100  d-flex align-items-center g-mb-0">

                                <input
                                    className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                                    type="radio"
                                    value="false"
                                    defaultChecked
                                    {...register(name, params)}
                                />
                                <div className=" g-bg-primary-opacity-0_2--checked g-brd-around  g-rounded-5">
                                    <div className="d-flex align-self-center g-width-20 ">
                                        <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                                            <i/>
                                        </div>
                                    </div>
                                </div>
                                <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-ml-10">
                                    {t("No")}
                                </strong>
                            </label>
                        </div>
                        <div className="col-md-4">
                            <label className="u-check w-100  d-flex align-items-center g-mb-0">
                                <input
                                    className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                                    type="radio"
                                    value="true"
                                    {...register(name, params)}
                                />
                                <div className=" g-bg-primary-opacity-0_2--checked g-brd-around  g-rounded-5">
                                    <div className="d-flex align-self-center g-width-20 ">
                                        <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                                            <i/>
                                        </div>
                                    </div>
                                </div>
                                <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-ml-10 ">
                                    {t("Yes")}
                                </strong>
                            </label>
                        </div>
                    </div>

                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({messages = `${label ?? name} is required`}) => {
                            return <small className="form-control-feedback">{messages}</small>;
                        }}
                    />
                </div> : <div className={`col-${column[1]}`}>
                    <div className="row">
                        {
                            options && options.map(option => <div className="col-md-4">
                                <label className="u-check w-100  d-flex align-items-center g-mb-0">

                                    <input
                                        className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                                        type="radio"
                                        value={get(option, 'value')}
                                        {...register(name, params)}
                                    />
                                    <div className=" g-bg-primary-opacity-0_2--checked g-brd-around  g-rounded-5">
                                        <div className="d-flex align-self-center g-width-20 ">
                                            <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                                                <i/>
                                            </div>
                                        </div>
                                    </div>
                                    <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-ml-10">
                                        {t(get(option, 'label'))}
                                    </strong>
                                </label>
                            </div>)
                        }

                    </div>

                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({messages = `${label ?? name} is required`}) => {
                            return <small className="form-control-feedback">{messages}</small>;
                        }}
                    />
                </div>
            }

        </>
    );
};

export default withTranslation("HRMS")(Radio);
