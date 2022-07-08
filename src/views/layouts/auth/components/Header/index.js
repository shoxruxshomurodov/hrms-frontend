import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { isEqual } from "lodash";
import hrLogo from "../../../../../assets/Hr.svg";
const Header = (props) => {
  const {
    right_nav_btn,
    location: { pathname }
  } = props;
  return (
    <header id="js-header" className="u-header u-header--static">
      <div className="u-header__section u-header__section--light g-bg-white g-transition-0_3 g-py-10">
        <nav className="js-mega-menu navbar navbar-expand-lg hs-menu-initialized hs-menu-horizontal">
          <div className="container">
            {/* Responsive Toggle Button */}
            <button
              className="navbar-toggler navbar-toggler-right btn g-line-height-1 g-brd-none g-pa-0 g-pos-abs g-top-minus-3 g-right-0"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="navBar"
              data-toggle="collapse"
              data-target="#navBar"
            >
              <span className="hamburger hamburger--slider">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </span>
            </button>
            {/* End Responsive Toggle Button */}
            {/* Logo */}
            <img src={hrLogo} alt="logo" />
            {/* End Logo */}

            <div className="d-inline-block g-hidden-md-down g-pos-rel g-valign-middle g-pl-30 g-pl-0--lg">
              <Link
                  to={isEqual(pathname, "/auth") ? "/auth/login" : "/auth"}
                  className="btn u-btn-outline-primary g-font-size-13 text-uppercase g-py-10 g-px-15"
              >
                {right_nav_btn}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default withRouter(Header);
