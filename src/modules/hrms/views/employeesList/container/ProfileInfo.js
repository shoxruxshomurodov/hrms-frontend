import React, { useState } from "react";
import { get, includes, isEqual, isNil } from "lodash";
import man1 from "../../../../../assets/profile/man1.svg";
import woman1 from "../../../../../assets/profile/woman1.svg";
import Utils from "../../../../../services/helpers/Utils";
import moment from "moment";
import CircleProgressbar from "../../circle-progressbar";
import { withTranslation } from "react-i18next";

const ProfileInfo = ({ user = {}, avatar, t, gender, ...rest }) => {
  const findAvatar = isEqual(gender, "MALE") ? man1 : woman1;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  return (
    <>
      <div className="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40">
        <div className="row">
          <div className="col-lg-4 g-mb-40 g-mb-0--lg">
            <div className="g-mb-20">
              <img
                className="img-fluid w-100"
                src={
                  isNil(avatar) || includes(avatar, "undefined")
                    ? findAvatar
                    : avatar
                }
                alt="Image Description"
              />
            </div>
            <a
              className="btn btn-block u-btn-darkgray g-rounded-50 g-py-12 g-mb-10"
              href="#"
              onClick={() =>
                setShowPhoneNumber((showPhoneNumber) => !showPhoneNumber)
              }
            >
              <i className="icon-call-in g-pos-rel g-top-1 g-mr-5" />{" "}
              {showPhoneNumber
                ? Utils.getFormattedPhoneNumber(
                    get(user, "authUser.username", "")
                  )
                : t("Contact Me")}
            </a>
          </div>
          <div className="col-lg-8">
            <div className="d-flex align-items-center justify-content-sm-between g-mb-5">
              <h2 className="g-font-weight-300 g-mr-10">
                {get(user, "employeesPassport.lastName")}{" "}
                {get(user, "employeesPassport.firstName")} <br />{" "}
                {get(user, "employeesPassport.middleName")}
              </h2>
              <ul className="list-inline mb-0">
                <li className="list-inline-item g-mx-2">
                  <a
                    className="u-icon-v1 u-icon-size--sm u-icon-slide-up--hover g-color-gray-light-v1 g-bg-gray-light-v5 g-color-gray-light-v1--hover rounded-circle"
                    href="#"
                  >
                    <i className="g-font-size-default g-line-height-1 u-icon__elem-regular fa fa-linkedin" />
                    <i className="g-font-size-default g-line-height-0_8 u-icon__elem-hover fa fa-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
            <h4 className="h6 g-font-weight-300 g-mb-10">
              <i className="icon-badge g-pos-rel g-top-1 g-mr-5 g-color-gray-dark-v5" />{" "}
              {get(user, "employeesCurrentPosition.positionName")}
            </h4>
            <ul className="list-inline g-font-weight-300">
              <li className="list-inline-item g-mr-20">
                <i className="icon-location-pin g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5" />
                {get(user, "employeesPassport.birthPlace")}
              </li>
              <li className="list-inline-item g-mr-20">
                <i className="icon-calendar g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5" />{" "}
                {get(user, "employeesPassport.birthDate")}
              </li>
              <li className="list-inline-item g-mr-20">
                <i className="icon-link g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5" />
                {get(user, "employeesPassport.nationality.title")}
              </li>
            </ul>
            <hr className="g-brd-gray-light-v4 g-my-20" />
            <p className="lead g-line-height-1_8">
              {get(user, "employeesCurrentPosition.structureName")}
            </p>
            <hr className="g-brd-gray-light-v4 g-my-20" />
            <div className="d-flex flex-wrap text-center">
              <div className="g-mr-40 g-mb-20 g-mb-0--xl">
                <div
                  className="js-pie g-color-purple g-mb-5"
                  data-circles-value={54}
                  data-circles-max-value={100}
                  data-circles-bg-color="#d3b6c6"
                  data-circles-fg-color="#9b6bcc"
                  data-circles-radius={30}
                  data-circles-stroke-width={3}
                  data-circles-additional-text="%"
                  data-circles-duration={2000}
                  data-circles-scroll-animate="true"
                  data-circles-font-size={14}
                  id="hs-pie-1"
                >
                  <CircleProgressbar />
                </div>
                <h4 className="h6 g-font-weight-300">{t("Consulting")}</h4>
              </div>
              <div className="g-mr-40 g-mb-20 g-mb-0--xl">
                <div
                  className="js-pie g-color-blue g-mb-5"
                  data-circles-value={72}
                  data-circles-max-value={100}
                  data-circles-bg-color="#bee3f7"
                  data-circles-fg-color="#3498db"
                  data-circles-radius={30}
                  data-circles-stroke-width={3}
                  data-circles-additional-text="%"
                  data-circles-duration={2000}
                  data-circles-scroll-animate="true"
                  data-circles-font-size={14}
                  id="hs-pie-2"
                >
                  <CircleProgressbar
                    percentage={72}
                    pathColor={"#3498db"}
                    textColor={"#3498db"}
                    trailColor={"#bee3f7"}
                  />
                </div>
                <h4 className="h6 g-font-weight-300">{t("Branding")}</h4>
              </div>
              <div className="g-mr-40 g-mb-20 g-mb-0--xl">
                <div
                  className="js-pie g-color-lightred g-mb-5"
                  data-circles-value={81}
                  data-circles-max-value={100}
                  data-circles-bg-color="#ffc2bb"
                  data-circles-fg-color="#e74c3c"
                  data-circles-radius={30}
                  data-circles-stroke-width={3}
                  data-circles-additional-text="%"
                  data-circles-duration={2000}
                  data-circles-scroll-animate="true"
                  data-circles-font-size={14}
                  id="hs-pie-3"
                >
                  <CircleProgressbar
                    percentage={81}
                    pathColor={"#e74c3c"}
                    textColor={"#e74c3c"}
                    trailColor={"#ffc2bb"}
                  />
                </div>
                <h4 className="h6 g-font-weight-300">{t("Copywriting")}</h4>
              </div>
              <div className="g-mr-40 g-mb-20 g-mb-0--xl">
                <div
                  className="js-pie g-color-primary g-mb-5"
                  data-circles-value={83}
                  data-circles-max-value={100}
                  data-circles-bg-color="#c9ff97"
                  data-circles-fg-color="#72c02c"
                  data-circles-radius={30}
                  data-circles-stroke-width={3}
                  data-circles-additional-text="%"
                  data-circles-duration={2000}
                  data-circles-scroll-animate="true"
                  data-circles-font-size={14}
                  id="hs-pie-4"
                >
                  <CircleProgressbar
                    percentage={83}
                    pathColor={"#72c02c"}
                    textColor={"#72c02c"}
                    trailColor={"#c9ff97"}
                  />
                </div>
                <h4 className="h6 g-font-weight-300">{t("Marketing")}</h4>
              </div>
              <div className="g-mb-20 g-mb-0--lg">
                <div
                  className="js-pie g-mb-5"
                  data-circles-value={92}
                  data-circles-max-value={100}
                  data-circles-bg-color="#eeeeee"
                  data-circles-fg-color="#111111"
                  data-circles-radius={30}
                  data-circles-stroke-width={3}
                  data-circles-additional-text="%"
                  data-circles-duration={2000}
                  data-circles-scroll-animate="true"
                  data-circles-font-size={14}
                  id="hs-pie-5"
                >
                  <CircleProgressbar
                    percentage={92}
                    pathColor={"#111111"}
                    textColor={"#111111"}
                    trailColor={"#eeeeee"}
                  />
                </div>
                <h4 className="h6 g-font-weight-300">{t("Management")}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card border-0 rounded-0 g-mb-40">
        <div className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
          <h3 className="h6 mb-0">
            <i className="icon-options-vertical g-pos-rel g-top-1" />{" "}
            {t("Тажриба")}
          </h3>
        </div>
        {!isNil(get(user, "employeesPositionHistories", null)) && (
          <div
            className=" card-block u-info-v1-1 g-bg-white-gradient-v1--after g-height-300 g-pa-0  _mCS_2 mCS-autoHide"
            style={{ overflow: "visible" }}
          >
            <div
              className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
              style={{ maxHeight: "none" }}
              tabIndex={0}
            >
              <div
                className="mCSB_container"
                style={{ position: "relative", top: 0, left: 0 }}
                dir="ltr"
              >
                <ul className="row u-timeline-v2-wrap list-unstyled">
                  {get(user, "employeesPositionHistories", []).map(
                    (item, index) => (
                      <li
                        key={index + 1}
                        className="col-md-12 g-brd-bottom g-brd-0--md g-brd-gray-light-v4 g-pb-30 g-pb-0--md g-mb-30 g-mb-0--md"
                      >
                        <div className="row">
                          <div className="col-md-3 align-self-center text-md-right g-pr-40--md g-mb-20 g-mb-0--md">
                            <h4 className="h5 g-font-weight-300">
                              {get(item, "positionName")}
                            </h4>
                            <h5 className="h6 g-font-weight-300 mb-0">
                              {moment(get(item, "startDate")).format("YYYY")} -{" "}
                              {isNil(get(item, "endDate", null))
                                ? "Current"
                                : moment(get(item, "endDate", "")).format(
                                    "YYYY"
                                  )}
                            </h5>
                          </div>
                          <div className="col-md-9 align-self-center g-orientation-left g-pl-40--md">
                            <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                              <i className="d-block g-width-18 g-height-18 g-bg-primary g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle" />
                            </div>
                            <article className="g-pa-10--md">
                              <h3 className="h4 g-font-weight-300">
                                {get(item, "structureName")}
                              </h3>
                              <p className="mb-0">
                                {" "}
                                {get(item, "companyName")}
                              </p>
                              <p className="mb-0">
                                {" "}
                                {get(item, "workplaceAddress")}.
                              </p>
                            </article>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="card border-0 rounded-0 g-mb-40">
        <div className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
          <h3 className="h6 mb-0">
            <i className="icon-options-vertical g-pos-rel g-top-1" />{" "}
            {t("Қариндошлари")}
          </h3>
        </div>
        <div
          className=" card-block u-info-v1-1 g-bg-white-gradient-v1--after g-height-300 g-pa-0  _mCS_2 mCS-autoHide"
          style={{ overflow: "visible" }}
        >
          <div
            className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
            style={{ maxHeight: "none" }}
            tabIndex={0}
          >
            <div
              className="mCSB_container"
              style={{ position: "relative", top: 0, left: 0 }}
              dir="ltr"
            >
              <ul className="row u-timeline-v2-wrap list-unstyled">
                {!isNil(get(user, "employeesRelatives", null)) &&
                  get(user, "employeesRelatives", []).map((item, index) => (
                    <li
                      key={index + 1}
                      className="col-md-12 g-brd-bottom g-brd-0--md g-brd-gray-light-v4 g-pb-30 g-pb-0--md g-mb-30 g-mb-0--md"
                    >
                      <div className="row">
                        <div className="col-md-3 align-self-center text-md-right g-pr-40--md g-mb-20 g-mb-0--md">
                          <h4 className="h5 g-font-weight-300">
                            {get(item, "relationship")}
                          </h4>
                          <h5 className="h6 g-font-weight-300 mb-0">
                            {get(item, "birthdate")}
                          </h5>
                        </div>
                        <div className="col-md-9 align-self-center g-orientation-left g-pl-40--md">
                          <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                            <i className="d-block g-width-18 g-height-18 g-bg-primary g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle" />
                          </div>
                          <article className="g-pa-10--md">
                            <h3 className="h4 g-font-weight-300">
                              {get(item, "lastName")} {get(item, "firstName")}{" "}
                              {get(item, "middleName")}
                            </h3>
                            <p className="mb-0"> {get(item, "address")}</p>
                            <p className="mb-0"> {get(item, "workplace")}</p>
                          </article>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {/* End Panel Body */}
      </div>
    </>
  );
};

export default withTranslation("HRMS")(ProfileInfo);
