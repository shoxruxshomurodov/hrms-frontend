import React, { useState } from "react";
import { Formik } from "formik";
import InputMask from "react-input-mask";
import { get, isEqual } from "lodash";
import LoaderMini from "../../../../components/Loader/LoaderMini";
import classNames from "classnames";
import * as Yup from "yup";
import {withTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
const SignupSchema = Yup.object().shape({
  passport: Yup.string()
    .min(9, "Пожалуйста введите Паспорт Серии пользователя")
    .required("Пожалуйста введите Паспорт Серии пользователя"),
  personalIdentificationNumber: Yup.string()
    .min(14, "Пожалуйста введите ИНПС пользователя")
    .required("Пожалуйста введите ИНПС пользователя"),
  phone: Yup.string()
    .min(14, "Номер телефона введен не полностью")
    .required("Номер телефона введен не полностью")
});

const Form = ({ loginOrSignUp, isFetchedToken, hasError, t }) => {
  const [focus, setFocus] = useState(null);
    const {search}  = useLocation();
    const query = new URLSearchParams(search);

  return (
    <Formik
        enableReinitialize={true}
      initialValues={{
        passport: "",
        personalIdentificationNumber: "",
        phone: atob(query.get('phone'))
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        loginOrSignUp(values, actions);
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
            <div
              className={classNames("input-group g-brd-primary--focus", {
                "g-state-focus": isEqual(focus, "passport")
              })}
              onFocus={() => setFocus("passport")}
              onBlur={() => setFocus(null)}
            >
              <div className="input-group-prepend">
                <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                  <i className="icon-finance-067 u-line-icon-pro" />
                </span>
              </div>
              <InputMask
                mask="aa9999999"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passport.toUpperCase()}
                name="passport"
                className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                placeholder={"AA1234567"}
                autoFocus={true}
                maskChar={null}
              />
            </div>
            {errors.passport && touched.passport && (
              <small className="form-control-feedback">{errors.passport}</small>
            )}
          </div>

          <div className="mb-4">
            <div
              className={classNames("input-group g-brd-primary--focus", {
                "g-state-focus": isEqual(focus, "personalIdentificationNumber")
              })}
              onFocus={() => setFocus("personalIdentificationNumber")}
              onBlur={() => setFocus(null)}
            >
              <div className="input-group-prepend">
                <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                  <i className="icon-finance-067 u-line-icon-pro" />
                </span>
              </div>
              <InputMask
                mask="99999999999999"
                onChange={handleChange}
                onBlur={handleBlur}
                maskChar={null}
                value={values.personalIdentificationNumber}
                name="personalIdentificationNumber"
                className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                placeholder="30607996820017"
              />
            </div>
            {errors.personalIdentificationNumber &&
              touched.personalIdentificationNumber && (
                <small className="form-control-feedback">
                  {errors.personalIdentificationNumber}
                </small>
              )}
          </div>
          <div className="mb-4">
            <div
              className={classNames("input-group g-brd-primary--focus", {
                "g-state-focus": isEqual(focus, "phone")
              })}
              onFocus={() => setFocus("phone")}
              onBlur={() => setFocus(null)}
            >
              <div className="input-group-prepend">
                <span className="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v3 g-color-gray-dark-v5">
                  <i className="icon-media-002 u-line-icon-pro" />
                </span>
              </div>
              <InputMask
                mask="(99)-999-99-99"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                name="phone"
                type="tel"
                className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                placeholder={"(__) -___-__-__"}
                maskChar={null}
              />
            </div>
            {errors.phone && touched.phone && (
              <small className="form-control-feedback">{errors.phone}</small>
            )}
          </div>
          <div className="mb-5">
            <button
              className="btn btn-block u-btn-primary g-py-13"
              type="submit"
              disabled={isSubmitting}
            >
               {isSubmitting && <LoaderMini />}
                {!isSubmitting && t("Sign Up")}

            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default withTranslation("HRMS")(Form);
