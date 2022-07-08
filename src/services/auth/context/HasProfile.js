import React, { Component } from "react";
import Consumer from "./Consumer";
import { isNil } from 'lodash';

class HasProfile extends Component {
  render() {
    const { children, fallback} = this.props;
    return (
      <Consumer>
        {({ isAuthenticated = false,user }) => {
          return isAuthenticated && user && !isNil(user) ? children : fallback;
        }}
      </Consumer>
    );
  }
}

export default HasProfile;
