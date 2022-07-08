import React, { useState } from "react";
import classNames from "classnames";
import { isEqual, isNil, includes, get } from "lodash";
import man1 from "../../assets/profile/man1.svg";
import woman1 from "../../assets/profile/woman1.svg";
import Utils from "../../services/helpers/Utils";

const VerticalTab = ({ user, ...props }) => {
  const [isActive, setIsActive] = useState(1);
  const [showAvatar, setShowAvatar] = useState(false);
  const {
    titles = [
      " Edit Profile",
      "Security Settings",
      " Payment Options",
      " Notification Settings",
    ],
    texts = ["jahongir", "react developer", "Javhar aka", "PHP developer"],
    avatar,
    gender,
    reloadPhoto = () => {
    },
  } = props;
  const setActiveEvent = (active) => {
    return setIsActive(active);
  };
  const findAvatar = isEqual(gender, "MALE") ? man1 : woman1;
  return (
    <div className={"row"}>
      <div className={"col-lg-3 g-mb-50 g-mb-0--lg"}>
        <div className="u-block-hover g-pos-rel">
          <figure>
            <img
              className="img-fluid w-100 u-block-hover__main--zoom-v1"
              src={
                showAvatar || isNil(avatar) || includes(avatar, "undefined")
                  ? findAvatar
                  : avatar
              }
              alt="Image Description"
            />
          </figure>
          <figcaption className="u-block-hover__additional--fade g-bg-black-opacity-0_5 g-pa-30">
            <div className="u-block-hover__additional--fade u-block-hover__additional--fade-up g-flex-middle">
              <ul className="list-inline text-center g-flex-middle-item--bottom g-mb-20">
                <li className="list-inline-item align-middle g-mx-7">
                  <a
                    className="u-icon-v1 u-icon-size--md g-color-white"
                    href="#"
                  >
                    <i
                      className="hs-admin-eye"
                      onClick={() => setShowAvatar((showAvatar) => !showAvatar)}
                    ></i>
                  </a>
                </li>
                {isNil(avatar) ||
                  (includes(avatar, "undefined") && (
                    <li
                      onClick={reloadPhoto}
                      className="list-inline-item align-middle g-mx-7"
                    >
                      <a className="u-icon-v1 u-icon-size--md g-color-white g-cursor-pointer">
                        <i className="hs-admin-reload"></i>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </figcaption>
          <span className="g-pos-abs g-top-20 g-left-0">
            <a className="btn btn-sm u-btn-primary rounded-0" href="#">
              {Utils.getEmployeeNameAndSurname(get(user, "name"))}
            </a>
            <small className="d-block g-bg-black g-color-white g-pa-5">
              {get(user, "employeesCurrentPosition.positionName")}
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
                    className={`${get(title, "icon")} g-pos-rel g-top-1 g-mr-8`}
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
  );
};

export default VerticalTab;
