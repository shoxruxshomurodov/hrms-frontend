import React from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

const MenuItem = ({ to, icon, title, t, style }) => {
  return (
    <li
      className="u-sidebar-navigation-v1-menu-item u-side-nav--has-sub-menu u-side-nav--top-level-menu-item pointer"
      style={style}
    >
      <NavLink
        className="media u-side-nav--top-level-menu-link u-side-nav--hide-on-hidden g-px-15 g-py-12"
        to={to}
      >
        <span className="d-flex align-self-center g-pos-rel g-font-size-18 g-mr-18">
          {icon}
        </span>
        <span className="media-body align-self-center">{t(title)}</span>
      </NavLink>
    </li>
  );
};

export default withTranslation("HRMS")(MenuItem);
