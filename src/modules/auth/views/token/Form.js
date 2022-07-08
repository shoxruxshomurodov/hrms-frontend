import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import * as Yup from "yup";
import classNames from "classnames";
import InputMask from "react-input-mask";
import {withTranslation} from "react-i18next";
const TokenSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Пожалуйста введите код пользователя")
    .required("Пожалуйста введите пароль пользователя"),
  password_confirm: Yup.string()
    .min(8, "Пожалуйста введите код пользователя")
    .required("Пожалуйста введите пароль пользователя")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  secret: Yup.string()
    .min(5, "Пожалуйста введите код пользователя")
    .required("Пожалуйста введите код пользователя")
});
const Form = ({t, confirm, resend, token }) => {
  const [focus, setFocus] = useState(null);
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    setTimer(120);
    const intervalId = setInterval(
      () =>
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            return 0;
          }
        }),
      1000
    );
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <Formik
      initialValues={{
        password: "",
        password_confirm: "",
        secret: ""
      }}
      validationSchema={TokenSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        confirm(values, { setSubmitting, setFieldError });
      }}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting
      }) => (
        <form className="g-py-15" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div
              className={classNames("input-group g-brd-primary--focus", {
                "g-state-focus": isEqual(focus, "password")
              })}
              onFocus={() => setFocus("password")}
              onBlur={() => setFocus(null)}
            >
              <div className="input-group-prepend">
                <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                  <i className="icon-finance-002 u-line-icon-pro" />
                </span>
              </div>
              <input
                className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                name="password"
                type="password"
                placeholder={t("password")}
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.password}
                autoFocus={true}
              />
            </div>
            {errors.password && (
              <small className="form-control-feedback">{t(errors.password)}</small>
            )}
          </div>
          <div className="mb-4">
            <div
              className={classNames("input-group g-brd-primary--focus mb-0", {
                "g-state-focus": isEqual(focus, "password_confirm")
              })}
              onFocus={() => setFocus("password_confirm")}
              onBlur={() => setFocus(null)}
            >
              <div className="input-group-prepend">
                <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                  <i className="icon-finance-002 u-line-icon-pro" />
                </span>
              </div>
              <input
                className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                name="password_confirm"
                type="password"
                placeholder={t("password confirm")}
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.password_confirm}
              />
            </div>
            {errors.password_confirm && (
              <small className="form-control-feedback">
                {t(errors.password_confirm)}
              </small>
            )}
          </div>
          <div className="mb-4">
            <div
              className={classNames("input-group g-brd-primary--focus mb-0", {
                "g-state-focus": isEqual(focus, "secret")
              })}
              onFocus={() => setFocus("secret")}
              onBlur={() => setFocus(null)}
            >
              <div className="input-group-prepend">
                <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                  <i className="icon-media-002 u-line-icon-pro" />
                </span>
              </div>
                <InputMask
                    mask="99999"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secret}
                    name="secret"
                    className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                    placeholder={t('code')}
                    maskChar={null}
                    autoFocus
                />
            </div>
            {errors.secret && (
              <small className="form-control-feedback">{t(errors.secret)}</small>
            )}
          </div>
          <div className="row justify-content-between mb-4">
            <div className="col align-self-center text-right">
              {timer > 0 ? (
                <span
                  className={classNames("spinner__custom", {
                    spinner__custom_disabled: isEqual(timer, 0)
                  })}
                >
                  {timer > 0 ? timer : "0"}
                </span>
              ) : (
                <span
                  onClick={resend}
                  className="g-font-size-13 text-success pointer"
                >
                    {t("повторно отправить пароль")}
                </span>
              )}
            </div>
          </div>
          <div className="mb-5">
            <button
              className="btn btn-block u-btn-primary g-py-13"
              type="submit"
              disabled={isSubmitting}
            >
                {t("Подтверждать")}
            </button>
          </div>
          <div className="d-flex justify-content-center text-center g-mb-30">
            <div className="d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v1" />
            <span className="align-self-center g-color-gray-dark-v5 mx-4">
                {t("OR")}
            </span>
            <div className="d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v1" />
          </div>
          <div className="row no-gutters">
            <div className="col-6">
              <button
                className="btn btn-block u-btn-facebook g-py-13 mr-2"
                type="button"
              >
                <i className="mr-1 fa fa-facebook" />
                {t("Facebook")}
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-block u-btn-twitter g-py-13 ml-2"
                type="button"
              >
                <i className="mr-1 fa fa-twitter" />
                {t("Twitter")}
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default withTranslation("HRMS")(Form);
