import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { withRouter } from "react-router-dom";
import { isEqual } from "lodash";
import {withTranslation} from "react-i18next";
class AuthLayout extends Component {
  render() {
    const {
      children,
        t,
      location: { pathname }
    } = this.props;
    const name = isEqual(pathname, "/auth") ? t("SIGN IN") : t("SIGN UP");
    return (
      <>
        <Header right_nav_btn={name} />
        <section
          className="container g-pt-40 g-pb-15"
          style={{ minHeight: "80vh" }}
        >
          {children}
        </section>
        <Footer />
      </>
    );
  }
}

export default withTranslation("HRMS")(withRouter(AuthLayout));
