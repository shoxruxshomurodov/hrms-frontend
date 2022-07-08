import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { isEqual, isNil, includes, get } from "lodash";
import man1 from "../../../../../../assets/profile/man1.svg";
import woman1 from "../../../../../../assets/profile/man1.svg";
import Utils from "../../../../../../services/helpers/Utils";
import ModalAvatar from "../../../../../../components/Modal/ModalAvatar";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const VerticalTab = ({
  user,
  titles,
  texts,
  avatar,
  gender,
  reloadPhoto,
  ChangeAvatar,
  isFetched,
  t,
  ...props
}) => {
  const [isActive, setIsActive] = useState(1);
  const [showAvatar, setShowAvatar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  const [isModalActive, setIsModalActive] = useState(
    get(props, "location.pathname", "").slice(1)
  );

  useEffect(() => {
    setIsModalActive(get(props, "location.pathname", "").slice(1));

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

  const setActiveEvent = (active) => {
    return setIsActive(active);
  };

  const modalAction = () => {
    setOpenModal(!openModal);
  };

  const findAvatar = isEqual(gender, "MALE") ? man1 : woman1;

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
      <div className={"row"}>
        <div className={"col-lg-3 g-mb-50 g-mb-0--lg"}>
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
                    <a
                      className="u-icon-v1 u-icon-size--md g-color-white"
                      href="#"
                    >
                      <i className="icon-notebook u-line-icon-pro" />
                    </a>
                  </li>
                  <li className="list-inline-item align-middle g-mx-7">
                    <a
                      className="u-icon-v1 u-icon-size--md g-color-white"
                      href="#"
                    >
                      <i className="icon-settings u-line-icon-pro" />
                    </a>
                  </li>
                </ul>
                {/* End Figure Social Icons */}
              </div>
            </figcaption>
            <span className="g-pos-abs g-top-20 g-left-0">
              <a className="btn btn-sm u-btn-primary rounded-0" href="#">
                {Utils.getEmployeeNameAndSurname(get(user, "name"))}
              </a>
              <small className="d-block g-bg-black g-color-white g-pa-5">
                {t("Developer")}
              </small>
            </span>
          </div>

          <ul className="list-group list-group-border-0 g-mb-40">
            {titles &&
              titles.map((title, index) => {
                return (
                  <li
                    key={index}
                    className={classNames(
                      "list-group-item pointer list-group-item-action nav-item",
                      {
                        active: isEqual(index + 1, isActive),
                      }
                    )}
                    onClick={() => setActiveEvent(index + 1)}
                  >
                    <i
                      className={`${get(
                        title,
                        "icon"
                      )} g-pos-rel g-top-1 g-mr-8`}
                    ></i>{" "}
                    {get(title, "title")}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={"col-md-9"}>
          <div id="nav-1-1-default-hor-left-underline" className="tab-content ">
            {texts &&
              texts.map((text, index) => {
                return (
                  <div
                    className={classNames("tab-pane fade", {
                      "show active": isEqual(index + 1, isActive),
                    })}
                    key={index}
                  >
                    {text}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation("HRMS")(withRouter(VerticalTab));
