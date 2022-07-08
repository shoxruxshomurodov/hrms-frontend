import React, { Component } from "react";
import get from "lodash/get";
import Provider from "./Provider";
import { connect } from "react-redux";
import Actions from "../actions";
import Utils from "../../helpers/Utils";
class Auth extends Component {
  componentDidMount() {
    const {checkAuth} = this.props;
    checkAuth();
}
  render() {
    const {
      children,
      isAuthenticated,
      isFetched,
      user,
      permissionsNames,
      rolesNames,
    } = this.props;
    return (
      <Provider
        value={{
          isAuthenticated,
          isFetched,
          user,
          userCan: (can = "", cant = "", exceptCant = "") => {
            return Utils.hasAccess({
              permissions: permissionsNames ?? [],
              roles: rolesNames ?? [],
              can,
              cant,
              exceptCant,
            });
          },
        }}
      >
        {children}
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () =>
      dispatch({
        type: Actions.CHECK_AUTH.REQUEST,
      }),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isAuthenticated: get(state.authCheck, "isAuthenticated", false),
    isFetched: get(state.authCheck, "isFetched", false),
    user: get(state.authCheck, "user", {}),
    permissionsNames: get(state.authCheck, "user.authorities", []),
    rolesNames: get(state.authCheck, "user.authorities", []),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
