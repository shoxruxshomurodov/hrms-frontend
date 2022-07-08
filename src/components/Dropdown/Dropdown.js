import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
const Dropdown = ({ children,button }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const pageClickEventDropdown = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdown(!dropdown);
      }
    };

    if (dropdown) {
      window.addEventListener("click", pageClickEventDropdown);
    }
    return () => {
      window.removeEventListener("click", pageClickEventDropdown);
    };
  }, [dropdown]);
  return (
    <div className="g-pos-rel g-hidden-sm-down g-mr-5">
      <a
        onClick={() => setDropdown((prev) => !prev)}
        className={classnames(
          "d-block text-uppercase u-header-icon-v1 g-pos-rel g-width-40 g-height-40 rounded-circle g-font-size-20",
          {
            active: dropdown
          }
        )}
      >
        {button}
      </a>
      <div
        className={classnames(
          "g-absolute-centered--x g-width-340 g-max-width-400 g-mt-17 rounded u-dropdown--css-animation",
          {
            "u-dropdown--hidden": !dropdown,
            fadeIn: dropdown
          }
        )}
        aria-labelledby="messagesInvoker"
        style={{ animationDuration: "300ms" }}
        ref={dropdownRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
