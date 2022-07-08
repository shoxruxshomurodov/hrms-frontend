import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainLayout from "./main/MainLayout";
import AuthLayout from "./auth/AuthLayout";
import ErrorLayout from "./error/ErrorLayout";
import EmployeeLayout from "./employee/EmployeeLayout";

class LayoutManager extends Component {
  getLayout = (pathname) => {
    if (pathname === "/") {
      return "main";
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return "auth";
    }
    if (/^\/employee(?=\/|$)/i.test(pathname)) {
      return "employee";
    }
    if (/^\/error(?=\/|$)/i.test(pathname)) {
      return "error";
    }
    return "main";
  };

  getLayouts = () => {
    return {
      main: MainLayout,
      auth: AuthLayout,
      error: ErrorLayout,
      employee:EmployeeLayout
    };
  };

  render() {
    const {
      children,
      location: { pathname }
    } = this.props;
    const Layout = this.getLayouts()[this.getLayout(pathname)];
    return (
      <main>
        <Layout>{children}</Layout>
      </main>
    );
  }
}

export default withRouter(LayoutManager);
