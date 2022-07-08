import React,{useState,useRef,useEffect} from "react";
import { Formik  } from "formik";
import InputMask from "react-input-mask";
import {isEqual} from "lodash";
import classNames from "classnames";
import * as Yup from "yup";
import {withTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .min(14, "Номер телефона введен не полностью")
    .required("Номер телефона введен не полностью")
});

const Form = ({ reset, t}) => {
    const [focus,setFocus] = useState(null);
    const {search}  = useLocation();
    const query = new URLSearchParams(search);
    const initialValues = {
        phone: atob(query.get('phone'))
    };

  return (
    <Formik
      enableReinitialize = {true}
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
          reset(values, actions);
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
                  <i className="icon-media-002 u-line-icon-pro" />
                </span>
              </div>
              <InputMask
                mask="(99)-999-99-99"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                name="phone"
                className="form-control g-color-black g-brd-gray-light-v3 g-py-15 g-px-15"
                placeholder={'(__) -___-__-__'}
                maskChar={null}
                autoFocus
              />
            </div>
            {errors.phone && touched.phone && (
              <small className="form-control-feedback">{t(errors.phone)}</small>
            )}
          </div>
          <div className="mb-5">
            <button
              className="btn btn-block u-btn-primary g-py-13"
              type="submit"
              disabled={isSubmitting}
            >
                {t("Reset password")}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default withTranslation("HRMS")(Form);
