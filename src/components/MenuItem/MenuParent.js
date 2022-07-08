/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import useResizeObserver from "use-resize-observer";
import { withTranslation } from "react-i18next";

const MenuParent = ({ children, icon = "", title = "", height, t, style }) => {
  const [menuOpen, set] = useState(false);
  const [ref] = useResizeObserver();
  const handleBtnClick = () => set(!menuOpen);
  const props = useSpring({
    height: menuOpen ? height : 0
  });
  return (
    <li
      className="u-sidebar-navigation-v1-menu-item u-side-nav--top-level-menu-item pointer"
      style={style}
    >
      <a
        className="media u-side-nav--top-level-menu-link u-side-nav--hide-on-hidden g-px-15 g-py-12"
        onClick={handleBtnClick}
      >
        <span className="d-flex align-self-center g-pos-rel g-font-size-18 g-mr-18">
          {icon}
        </span>
        <span className="media-body align-self-center">{t(title)}</span>
        <span className="d-flex align-self-center u-side-nav--control-icon ">
          <i className={`hs-admin-angle-${menuOpen ? "down" : "right"}`} />
        </span>
      </a>
      <animated.div
        style={{
          ...props,
          overflowX: "hidden",
          position: "relative"
        }}
        className="menu"
      >
        <ul ref={ref}>{children}</ul>
      </animated.div>
    </li>
  );
};
export default withTranslation("HRMS")(MenuParent);
