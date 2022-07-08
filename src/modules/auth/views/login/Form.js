import React, {useState} from "react";
import { Formik } from "formik";
import InputMask from "react-input-mask";
import {get, isEqual} from "lodash";
import * as Yup from "yup";
import classNames from "classnames";
import { Link } from 'react-router-dom';
import LoaderMini from "../../../../components/Loader/LoaderMini";
import {withTranslation} from "react-i18next";
const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .min(14, "Номер телефона введен не полностью")
      .required("Номер телефона введен не полностью"),
    password: Yup.string()
        .required("Пожалуйста введите пароль пользователя"),
});
const Form = ({ login,loginWithKey ,activeKey,t}) => {
    const [focus,setFocus] = useState(null)
    return (
        <Formik
            initialValues={{ phone: "" ,password:""}}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
                const phone_number = get(values, "phone",'').replace(/[\s()-]+/gi, '');
                login(phone_number,get(values, "password"), actions);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
              }) => (
        <form className="g-py-15" onSubmit={handleSubmit}>
            <div className="mb-4">
                <div className={classNames("input-group g-brd-primary--focus",{
                    "g-state-focus":isEqual(focus,"phone")
                })}

                     onFocus={() => setFocus("phone")}
                     onBlur={() => setFocus(null)}
                >
                    <div className="input-group-prepend">
                      <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                        <i className="icon-finance-067 u-line-icon-pro" />
                      </span>
                    </div>
                    <InputMask
                        mask="(99)-999-99-99"
                        name='phone'
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        maskChar={null}
                        className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                        placeholder={'(__) -___-__-__'}
                    />
                </div>
                {errors.phone && touched.phone && (
                    <small className="form-control-feedback">{t(errors.phone)}</small>
                )}
            </div>
            <div className="mb-4">
                <div className={classNames("input-group g-brd-primary--focus mb-0",{
                    "g-state-focus":isEqual(focus,"password")
                })}
                     onFocus={() => setFocus("password")}
                     onBlur={() => setFocus(null)}
                >
                    <div className="input-group-prepend">
                      <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                        <i className=" icon-finance-135 u-line-icon-pro" />
                      </span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                        placeholder={"password"}
                    />
                </div>
                {errors.password && touched.password && (
                    <small className="form-control-feedback">{errors.password}</small>
                )}
            </div>
            <div className="row justify-content-between mb-4">
                <div className="col align-self-center text-right">
                    <Link to={`/auth/reset-password?phone=${btoa(get(values,'phone').replace(/[\\s()-]+/gi, ''))}`}
                          style={{ color: "#72c02c" }}
                          className="g-font-size-13 pointer" >
                        {t("Forgot password?")}
                    </Link>
                </div>
            </div>
            <div className="mb-5">
                <button
                    className="btn btn-block u-btn-primary g-py-13"
                    type="submit"
                    disabled={isSubmitting}
                >
                   <span className="mr-1">{isSubmitting && <LoaderMini />}</span>
                    {!isSubmitting && t("Login")}
                </button>
            </div>
            <div className="d-flex justify-content-center text-center g-mb-30">
                <div className="d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v1" />
                <span className="align-self-center g-color-gray-dark-v5 mx-4">
                   {t("OR")}
                  </span>
                <div className="d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v1" />
            </div>
            <div className="mb-5">
                <button
                    type="button"
                    onClick={loginWithKey}
                    disabled={activeKey}
                    className="btn btn-block g-color-white g-bg-lightblue-v3 g-py-13"
                >

                    {/*<span className="mr-1">{activeKey && <LoaderMini />}</span>*/}
                    {t("Login with key")}
                </button>
            </div>
        </form>
            )}
        </Formik>);
};

export default withTranslation("HRMS")(Form);
