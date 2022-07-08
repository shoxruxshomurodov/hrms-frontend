import React, { Component } from "react";
import LoginContainer from "./Container";

class LoginPage extends Component {
  render() {
    const { user_id } = this.props.match.params;
    return <LoginContainer user_id={user_id} />;
  }
}

export default LoginPage;
