import React, { useState,memo } from "react";
import classNames from "classnames";
import { isEqual } from "lodash";
const Tabs = (props) => {
  const [isActive, setIsActive] = useState(1);
  const {
    titles = [
      " Edit Profile",
      "Security Settings",
      // " Payment Options",
      // " Notification Settings"
    ],
    texts = ["jahongir", "react developer", "Javhar aka", "PHP developer"]
  } = props;
  const setActiveEvent = (active) => {
    return setIsActive(active);
  };
  return (
    <>
      <ul className="nav nav-justified u-nav-v1-1 u-nav-primary g-brd-bottom--md g-brd-bottom-2 g-brd-primary g-mb-20">
        {titles &&
          titles.map((title, index) => {
            return (
              <li key={index+1} className="nav-item">
                <span
                  className={classNames("nav-link g-py-10 pointer", {
                    active: isEqual(index + 1, isActive)
                  })}
                  onClick={() => setActiveEvent(index + 1)}
                >
                  {title}
                </span>
              </li>
            );
          })}
      </ul>
      <div id="nav-1-1-default-hor-left-underline" className="tab-content">
        {texts &&
          texts.map((text, index) => {
            return (
              <div
                  key={index+1}
                className={classNames("tab-pane fade", {
                  "show active": isEqual(index + 1, isActive)
                })}
              >
                {text}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default memo(Tabs);
