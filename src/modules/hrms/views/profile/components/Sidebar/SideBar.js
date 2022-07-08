import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { isEqual, get, isNull } from "lodash";
import CardWithScroll from "../../../../../../components/Card/withScroll";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import ModalAvatar from "../../../../../../components/Modal/ModalAvatar";
import { useSelector } from "react-redux";
import Utils from "../../../../../../services/helpers/Utils";
import { withTranslation } from "react-i18next";
const SideBar = (props) => {
  const [isActive, setIsActive] = useState(
    get(props, "location.pathname", "").slice(1)
  );
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  const user = useSelector((state) => get(state, "authCheck.user", {}));
  const addActive = (active) => {
    setIsActive(active);
  };
  useEffect(() => {
    setIsActive(get(props, "location.pathname", "").slice(1));

    const pageClickEvent = (e) => {
      if (modalRef.current !== null && !modalRef.current.contains(e.target)) {
        setOpenModal(!openModal);
      }
    };
    if (openModal) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [openModal, get(props, "location.pathname", "").slice(1)]);

  const modalAction = () => {
    setOpenModal(!openModal);
  };
  const avatar = isNull(get(user, "avatar"))
    ? Utils.takeAvatar(get(user, "avatarIconType"))
    : get(user, "avatar");
  let { t, ChangeAvatar, isFetched } = props;
  return (
    <>
      {openModal && (
        <ModalAvatar
          avatar={avatar}
          openModal={openModal}
          ChangeAvatar={ChangeAvatar}
          modalRef={modalRef}
          modalAction={modalAction}
          isFetched={isFetched}
        />
      )}
      <div className="u-block-hover g-pos-rel">
        <figure className="m-0">
          <img
            className="img-fluid w-100 u-block-hover__main--zoom-v1"
            src={avatar}
            alt="Image Description"
          />
        </figure>
        <figcaption className="u-block-hover__additional--fade g-bg-black-opacity-0_5 g-pa-30">
          <div className="u-block-hover__additional--fade u-block-hover__additional--fade-up g-flex-middle">
            {/* Figure Social Icons */}
            <ul className="list-inline text-center g-flex-middle-item--bottom g-mb-20">
              <li className="list-inline-item align-middle g-mx-7">
                <a
                  className="u-icon-v1 u-icon-size--md g-color-white pointer jahongir"
                  onClick={modalAction}
                >
                  <i className="icon-note u-line-icon-pro" />
                </a>
              </li>
              <li className="list-inline-item align-middle g-mx-7">
                <a className="u-icon-v1 u-icon-size--md g-color-white" href="#">
                  <i className="icon-notebook u-line-icon-pro" />
                </a>
              </li>
              <li className="list-inline-item align-middle g-mx-7">
                <a className="u-icon-v1 u-icon-size--md g-color-white" href="#">
                  <i className="icon-settings u-line-icon-pro" />
                </a>
              </li>
            </ul>
            {/* End Figure Social Icons */}
          </div>
        </figcaption>
        <span className="g-pos-abs g-top-20 g-left-0">
          <a className="btn btn-sm u-btn-primary rounded-0" href="#">
            {Utils.capitalizeFirstLetter(
              get(user, "fidoGspIdentity.firstName", "")
            ).charAt(0)}
            .
            {Utils.capitalizeFirstLetter(
              get(user, "fidoGspIdentity.lastName", "")
            )}
          </a>
          <small className="d-block g-bg-black g-color-white g-pa-5">
            {t("Developer")}
          </small>
        </span>
      </div>
      <div className="list-group  list-group-border-0 g-mb-40">
        <Link
          to="/profile"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "profile"),
            }
          )}
          onClick={() => addActive("profile")}
        >
          <span>
            <i className="icon-cursor g-pos-rel g-top-1 g-mr-8" />{" "}
            {t("Profile")}
          </span>
        </Link>

        {/* <Link
          to="/user"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "user"),
            }
          )}
          onClick={() => addActive("user")}
        >
          <span>
            <i className="icon-notebook g-pos-rel g-top-1 g-mr-8" />
            {t("Users Contacts")}
          </span>
        </Link> */}

        {/* <Link
          to="/project"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "project"),
            }
          )}
          onClick={() => addActive("project")}
        >
          <span>
            <i className="icon-layers g-pos-rel g-top-1 g-mr-8" />{" "}
            {t("My Projects")}
          </span>
          <span
            className={classNames(
              "u-label g-font-size-11 g-rounded-20 g-px-10",
              {
                "g-bg-primary": !isEqual(isActive, "project"),
                "g-bg-white text-dark": isEqual(isActive, "project"),
              }
            )}
          >
            9
          </span>
        </Link> */}
        {/* End My Projects */}
        {/* Comments */}
        {/* <Link
          to="/comment"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "comment"),
            }
          )}
          onClick={() => addActive("comment")}
        >
          <span>
            <i className="icon-bubbles g-pos-rel g-top-1 g-mr-8" />{" "}
            {t("Comments")}
          </span>
          <span className="u-label g-font-size-11 g-bg-pink g-rounded-20 g-px-8">
            24
          </span>
        </Link> */}
        {/* End Comments */}
        {/* Reviews */}
        {/* <Link
          to="/reviews"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "reviews"),
            }
          )}
          onClick={() => addActive("reviews")}
        >
          <span>
            <i className="icon-heart g-pos-rel g-top-1 g-mr-8" />
            {t(" Reviews")}
          </span>
        </Link> */}
        {/* End Reviews */}
        {/* History */}
        {/* <Link
          to="/history"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "history"),
            }
          )}
          onClick={() => addActive("history")}
        >
          <span>
            <i className="icon-fire g-pos-rel g-top-1 g-mr-8" /> {t("History")}
          </span>
        </Link> */}
        {/* End History */}
        {/* Settings */}
        <Link
          to="/settings"
          className={classNames(
            "list-group-item list-group-item-action justify-content-between",
            {
              active: isEqual(isActive, "settings"),
            }
          )}
          onClick={() => addActive("settings")}
        >
          <span>
            <i className="icon-settings g-pos-rel g-top-1 g-mr-8" />{" "}
            {t("Settings")}
          </span>
          <span
            className={classNames(
              "u-label g-font-size-11 g-rounded-20 g-px-10",
              {
                "g-bg-primary": !isEqual(isActive, "settings"),
                "g-bg-white text-dark": isEqual(isActive, "settings"),
              }
            )}
          >
            3
          </span>
        </Link>
        {/* End Settings */}
      </div>
      {/*<CardWithScroll*/}
      {/*  title="Project Progress"*/}
      {/*  body={*/}
      {/*    <div*/}
      {/*      id="mCSB_1_container"*/}
      {/*      className="mCSB_container"*/}
      {/*      dir="ltr"*/}
      {/*      style={{ position: "relative", top: "0px", left: "0px" }}*/}
      {/*    >*/}
      {/*      <div className="g-mb-20">*/}
      {/*        <h6 className="g-mb-10">*/}
      {/*          {t(" Web Design")}{" "}*/}
      {/*          <span className="float-right g-ml-10">68%</span>*/}
      {/*        </h6>*/}
      {/*        <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-5">*/}
      {/*          <div*/}
      {/*            className="js-hr-progress-bar-indicator progress-bar g-bg-cyan u-progress-bar--xs"*/}
      {/*            role="progressbar"*/}
      {/*            aria-valuenow={68}*/}
      {/*            aria-valuemin={0}*/}
      {/*            aria-valuemax={100}*/}
      {/*            style={{ width: "68%" }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <small className="g-font-size-12">*/}
      {/*          {t("11% more than last week")}*/}
      {/*        </small>*/}
      {/*      </div>*/}
      {/*      <div className="g-mb-20">*/}
      {/*        <h6 className="g-mb-10">*/}
      {/*          {t("Dribbble Shots")}{" "}*/}
      {/*          <span className="float-right g-ml-10">62%</span>*/}
      {/*        </h6>*/}
      {/*        <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-5">*/}
      {/*          <div*/}
      {/*            className="js-hr-progress-bar-indicator progress-bar g-bg-pink u-progress-bar--xs"*/}
      {/*            role="progressbar"*/}
      {/*            aria-valuenow={62}*/}
      {/*            aria-valuemin={0}*/}
      {/*            aria-valuemax={100}*/}
      {/*            style={{ width: "62%" }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <small className="g-font-size-12">*/}
      {/*          {t("20% less than last week")}*/}
      {/*        </small>*/}
      {/*      </div>*/}
      {/*      <div className="g-mb-20">*/}
      {/*        <h6 className="g-mb-10">*/}
      {/*          {t("Unify Project")}{" "}*/}
      {/*          <span className="float-right g-ml-10">93%</span>*/}
      {/*        </h6>*/}
      {/*        <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-5">*/}
      {/*          <div*/}
      {/*            className="js-hr-progress-bar-indicator progress-bar g-bg-primary u-progress-bar--xs"*/}
      {/*            role="progressbar"*/}
      {/*            aria-valuenow={93}*/}
      {/*            aria-valuemin={0}*/}
      {/*            aria-valuemax={100}*/}
      {/*            style={{ width: "93%" }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <small className="g-font-size-12">17% more than last week</small>*/}
      {/*      </div>*/}
      {/*      <div className="g-mb-20">*/}
      {/*        <h6 className="g-mb-10">*/}
      {/*          {t("WordPress Coding")}*/}
      {/*          <span className="float-right g-ml-10">74%</span>*/}
      {/*        </h6>*/}
      {/*        <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-5">*/}
      {/*          <div*/}
      {/*            className="js-hr-progress-bar-indicator progress-bar g-bg-black u-progress-bar--xs"*/}
      {/*            role="progressbar"*/}
      {/*            aria-valuenow={74}*/}
      {/*            aria-valuemin={0}*/}
      {/*            aria-valuemax={100}*/}
      {/*            style={{ width: "74%" }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <small className="g-font-size-12">35% more than last week</small>*/}
      {/*      </div>*/}
      {/*      <div className="g-mb-20">*/}
      {/*        <h6 className="g-mb-10">*/}
      {/*          {t(" Pixeel Ltd ")}*/}
      {/*          <span className="float-right g-ml-10">86%</span>*/}
      {/*        </h6>*/}
      {/*        <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-5">*/}
      {/*          <div*/}
      {/*            className="js-hr-progress-bar-indicator progress-bar g-bg-darkpurple u-progress-bar--xs"*/}
      {/*            role="progressbar"*/}
      {/*            aria-valuenow={86}*/}
      {/*            aria-valuemin={0}*/}
      {/*            aria-valuemax={100}*/}
      {/*            style={{ width: "86%" }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <small className="g-font-size-12">42% more than last week</small>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*/>*/}
    </>
  );
};

export default withTranslation("HRMS")(withRouter(SideBar));
