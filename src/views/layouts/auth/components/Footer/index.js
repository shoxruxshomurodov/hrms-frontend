import React from "react";
import InputMask from "react-input-mask";
import {withTranslation} from "react-i18next";
const index = (props) => {
  const {
    t,
  } = props;
  return (
    <>
      <section className="g-bg-primary">
        <div className="container g-pt-25 g-pb-10">
          <div className="row justify-content-between align-items-center">
            <div className="col-sm-6 col-md-8 g-mb-15">
              <h3 className="h4 g-color-white g-font-weight-300 text-uppercase mb-0">
                {t("Subscribe to the")}
                <span className="g-font-weight-600"> {t("Newsletter")} </span>
              </h3>
            </div>
            <div className="col-sm-6 col-md-4 g-mb-15">
              <div className="input-group rounded-0">

                <InputMask
                    mask="(99)-999-99-99"
                    name='phone'
                    autoFocus
                    className="form-control g-brd-white g-color-white g-placeholder-white g-bg-transparent rounded-0 g-px-15 g-py-13"
                    placeholder="Enter your phone ..."
                />
                <span className="input-group-addon u-input-group-addon g-width-45 g-brd-white g-color-white">
                  <i className="icon-communication-062 u-line-icon-pro" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="g-bg-gray-dark-v1 g-color-white-opacity-0_8 g-py-20">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-center text-md-left g-mb-10 g-mb-0--md">
              <div className="d-lg-flex">
                <small className="d-block g-font-size-default g-mr-10 g-mb-10 g-mb-0--md">
                  2021 © {t("All Rights Reserved")}.
                </small>
                <ul className="u-list-inline">
                  <li className="list-inline-item">
                    <a
                      className="g-color-white-opacity-0_8 g-color-white--hover"
                      href="#"
                    >
                      {t("Privacy Policy")}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <span>|</span>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="g-color-white-opacity-0_8 g-color-white--hover"
                      href="#"
                    >
                      {t("Terms of Use")}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <span>|</span>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="g-color-white-opacity-0_8 g-color-white--hover"
                      href="#"
                    >
                      {t("License")}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <span>|</span>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="g-color-white-opacity-0_8 g-color-white--hover"
                      href="#"
                    >
                      {t("Support")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 align-self-center">
              <ul className="list-inline text-center text-md-right mb-0">
                <li
                  className="list-inline-item g-mx-10"

                >
                  <a
                    href="#"
                    className="g-color-white-opacity-0_5 g-color-white--hover"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li
                  className="list-inline-item g-mx-10"

                >
                  <a
                    href="#"
                    className="g-color-white-opacity-0_5 g-color-white--hover"
                  >
                    <i className="fa fa-skype" />
                  </a>
                </li>
                <li
                  className="list-inline-item g-mx-10"

                >
                  <a
                    href="#"
                    className="g-color-white-opacity-0_5 g-color-white--hover"
                  >
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
                <li
                  className="list-inline-item g-mx-10"

                >
                  <a
                    href="#"
                    className="g-color-white-opacity-0_5 g-color-white--hover"
                  >
                    <i className="fa fa-pinterest" />
                  </a>
                </li>
                <li
                  className="list-inline-item g-mx-10"

                >
                  <a
                    href="#"
                    className="g-color-white-opacity-0_5 g-color-white--hover"
                  >
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li
                  className="list-inline-item g-mx-10"

                >
                  <a
                    href="#"
                    className="g-color-white-opacity-0_5 g-color-white--hover"
                  >
                    <i className="fa fa-dribbble" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default withTranslation("HRMS")(index);
