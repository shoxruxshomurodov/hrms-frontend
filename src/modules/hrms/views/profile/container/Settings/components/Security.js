import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { withTranslation} from "react-i18next";
const ChangePasswordSchema = Yup.object().shape({
    current: Yup.string()
        .min(8, "Пожалуйста, введите старый пароль пользователя")
        .required("Пожалуйста, введите старый пароль пользователя"),
    password: Yup.string()
        .min(8, "Пожалуйста, введите старый пароль пользователя")
        .required("Пожалуйста введите новый пароль пользователя"),
    password_confirm: Yup.string()
        .min(8, "Пожалуйста, введите старый пароль пользователя")
        .required("Пожалуйста введите новый пароль пользователя")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
function Security({changePassword,t}) {
    return (
        <div
            className="tab-pane fade active show"
            id="nav-1-1-default-hor-left-underline--2"
            data-parent="#nav-1-1-default-hor-left-underline"
        >
            <h2 className="h4 g-font-weight-300">{t("Security Settings")}</h2>
            <p className="g-mb-25">
                {t("Reset your password, change verifications and so on.")}
            </p>
            <Formik
                initialValues={{
                    current:"",
                    password: "",
                    password_confirm: "",
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values) => {
                    changePassword(values);
                }}
            >
                {({
                      values,
                      errors,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                  }) => (
            <form onSubmit={handleSubmit}>
                {/* Current Password */}
                <div className="form-group row g-mb-25">
                    <label
                        className="col-sm-3 col-form-label g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10">
                        {t(" Current password")}
                    </label>
                    <div className="col-sm-9">
                        <div className="input-group g-brd-primary--focus">
                            <input
                                className="form-control form-control-md border-right-0 rounded-0 g-py-13 pr-0"
                                name="current"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values={values.current}
                                autoFocus={true}
                                type="password"
                                placeholder="Current password"
                            />
                            <div className="input-group-append">
                              <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                                <i className="icon-lock"/>
                              </span>
                            </div>
                        </div>
                        {errors.current && <small className="form-control-feedback">{t(errors.current)}</small>}
                    </div>
                </div>
                {/* End Current Password */}
                {/* New Password */}
                <div className="form-group row g-mb-25">
                    <label
                        className="col-sm-3 col-form-label g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10">
                        {t("New password")}
                    </label>
                    <div className="col-sm-9">
                        <div className="input-group g-brd-primary--focus">
                            <input
                                className="form-control form-control-md border-right-0 rounded-0 g-py-13 pr-0"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values={values.password}
                                autoFocus={true}
                                type="password"
                                placeholder="New password"
                            />
                            <div className="input-group-append">
                              <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                                <i className="icon-lock"/>
                              </span>
                            </div>
                        </div>
                        {errors.password && <small className="form-control-feedback">{t(errors.password)}</small>}
                    </div>
                </div>
                {/* End New Password */}
                {/* Verify Password */}
                <div className="form-group row g-mb-25">
                    <label
                        className="col-sm-3 col-form-label g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10">
                        {t("  Verify password")}
                    </label>
                    <div className="col-sm-9">
                        <div className="input-group g-brd-primary--focus">
                            <input
                                className="form-control form-control-md border-right-0 rounded-0 g-py-13 pr-0"
                                name="password_confirm"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values={values.password_confirm}
                                type="password"
                                placeholder="Verify password"
                            />
                            <div className="input-group-append">
                              <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                                <i className="icon-lock"/>
                              </span>
                            </div>
                        </div>
                        {errors.password_confirm && <small className="form-control-feedback">{t(errors.password_confirm)}</small>}
                    </div>
                </div>
                {/* End Verify Password */}
                {/* Login Verification */}
                {/*<div className="form-group row g-mb-25">*/}
                {/*    <label*/}
                {/*        className="col-sm-3 col-form-label g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10">*/}
                {/*        {t("  Login verification")}*/}
                {/*    </label>*/}
                {/*    <div className="col-sm-9">*/}
                {/*        <label className="form-check-inline u-check g-pl-25">*/}
                {/*            <input*/}
                {/*                className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"*/}
                {/*                type="checkbox"*/}
                {/*            />*/}
                {/*            <div className="u-check-icon-checkbox-v4 g-absolute-centered--y g-left-0">*/}
                {/*                <i className="fa" data-check-icon=""/>*/}
                {/*            </div>*/}
                {/*            {t(" Verify login requests")}*/}
                {/*        </label>*/}
                {/*        <small className="d-block text-muted">*/}
                {/*            {t(" You need to add a phone to your profile account to\n" +*/}
                {/*                "                            enable this feature.")}*/}
                {/*        </small>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* End Login Verification */}
                {/* Password Reset */}
                {/*<div className="form-group row g-mb-25">*/}
                {/*    <label*/}
                {/*        className="col-sm-3 col-form-label g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10">*/}
                {/*        {t(" Password reset")}*/}
                {/*    </label>*/}
                {/*    <div className="col-sm-9">*/}
                {/*        <label className="form-check-inline u-check g-pl-25">*/}
                {/*            <input*/}
                {/*                className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"*/}
                {/*                type="checkbox"*/}
                {/*            />*/}
                {/*            <div className="u-check-icon-checkbox-v4 g-absolute-centered--y g-left-0">*/}
                {/*                <i className="fa" data-check-icon=""/>*/}
                {/*            </div>*/}
                {/*            {t(" Require personal information to reset my password")}*/}
                {/*        </label>*/}
                {/*        <small className="d-block text-muted">*/}
                {/*            {t(" When you check this box, you will be required to\n" +*/}
                {/*                "                            verify additional information before you can request\n" +*/}
                {/*                "                            a password reset with just your email address.")}*/}
                {/*        </small>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* End Password Reset */}
                {/* Save Password */}
                {/*<div className="form-group row g-mb-25">*/}
                {/*    <label*/}
                {/*        className="col-sm-3 col-form-label g-color-gray-dark-v2 g-font-weight-700 text-sm-right g-mb-10">*/}
                {/*        {t("  Save password")}*/}
                {/*    </label>*/}
                {/*    <div className="col-sm-9">*/}
                {/*        <label className="form-check-inline u-check mx-0">*/}
                {/*            <input*/}
                {/*                className="g-hidden-xs-up g-pos-abs g-top-0 g-right-0"*/}
                {/*                name="savePassword"*/}
                {/*                type="checkbox"*/}
                {/*            />*/}
                {/*            <div className="u-check-icon-radio-v7">*/}
                {/*                <i className="d-inline-block"/>*/}
                {/*            </div>*/}
                {/*        </label>*/}
                {/*        <small className="d-block text-muted">*/}
                {/*            {t("   When you check this box, you will be saved\n" +*/}
                {/*                "                            automatically login to your profile account. Also,\n" +*/}
                {/*                "                            you will be always logged in all our services.")}*/}
                {/*        </small>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* End Save Password */}
                <hr className="g-brd-gray-light-v4 g-my-25"/>
                <div className="text-sm-right">
                    <a
                        className="btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"
                        href="#"
                    >
                        {t("  Cancel")}
                    </a>
                    <button className="btn u-btn-primary rounded-0 g-py-12 g-px-25"
                       type="submit"
                    >
                        {t("Save Changes")}
                    </button>
                </div>
            </form>
                )}
            </Formik>

        </div>
    );
}

export default withTranslation("HRMS")(Security);
