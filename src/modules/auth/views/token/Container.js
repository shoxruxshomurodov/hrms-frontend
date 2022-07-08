import React, { Component } from "react";
import Form from "./Form";
import { connect } from "react-redux";
import Actions from "./../../Actions";
import AuthActions from "./../../../../services/auth/actions";
import {get,isEqual} from "lodash";
import Normalizer from "../../../../services/normalizer";
import LoginScheme from "../../../../schema/Login";
import Utils from "../../../../services/helpers/Utils";
import { withRouter } from "react-router-dom";
import TokenScheme from "../../../../schema/Token";
import ErrorNotify from "../../../../components/Sweetalerts/ErrorNotify";
import {withTranslation} from "react-i18next";
class Container extends Component {
  confirm = (data, actions) => {
    const { password, secret } = data;
    const { confirmToken, token } = this.props;
    confirmToken(password, secret, token, actions);
  };

  resend = () => {
    const { resendConfirm, resetId, entities,tokenId,match } = this.props;
    const resetData = Normalizer.Denormalize(resetId, TokenScheme, entities);
    const signUpData = Normalizer.Denormalize(tokenId, TokenScheme, entities);
    const data = get(resetData, "data") || get(signUpData, "data") || atob(match?.params?.phone);
    resendConfirm(data);
  };
  componentDidUpdate(prevProps, _prevState) {
    const {
      isFetchedConfirm,
      tokenConfirmId,
      entities,
      history,
      checkAuth,
      isFetchedResend,
      resendPassword
    } = this.props;
    if (
      !Utils.isEqualsArrsAttr(prevProps, this.props, [
        "isFetchedConfirm",
        "tokenConfirmId"
      ]) &&
      isFetchedConfirm
    ) {
      const tokenConfirm = Normalizer.Denormalize(
        tokenConfirmId,
        LoginScheme,
        entities
      );
      if (tokenConfirm.hasOwnProperty("access_token")) {
        checkAuth(get(tokenConfirm, "access_token", null));
        history.push(`/profile`);
      }
    }
    if (
      !Utils.isEqualsArrsAttr(prevProps, this.props, [
        "isFetchedResend",
        "resendPassword"
      ]) &&
      isFetchedResend
    ) {
      const data = Normalizer.Denormalize(
        resendPassword,
        TokenScheme,
        entities
      );
      history.push(`/auth/token/${get(data, "token")}/${btoa(get(data,'data'))}`);
    }
  }
  render() {
    const {t, token ,hasError,isFetchedConfirm,error} = this.props;
    return (
      <div className="row justify-content-between">
        <div className="col-md-6 col-lg-5 flex-md-unordered g-mb-80">
          <div className="g-brd-around g-brd-gray-light-v3 g-bg-white rounded g-px-30 g-py-50 mb-4">
            <header className="text-center mb-4">
              <h1 className="h3 g-color-black g-font-weight-300 text-capitalize">
                {t("Token Confirm to your account")}
              </h1>
            </header>
            {/* Form */}
            <Form resend={this.resend} token={token} confirm={this.confirm} />
            {isEqual(error, 400) &&
              hasError &&
              isFetchedConfirm &&
              ErrorNotify("Что-то не так !!!")}
            {isEqual(error, 500) &&
              hasError &&
              isFetchedConfirm &&
              ErrorNotify("Ошибка на сервере !!!")}
            {/* End Form */}
          </div>
          <div className="text-center">
            <p className="g-color-gray-dark-v5 mb-0">
              {t("Don't have an account?")}{" "}
              <a className="g-font-weight-600" href="page-signup-12.html">
                {t("signup")}
              </a>
            </p>
          </div>
        </div>
        <div className="col-md-6 flex-md-first g-mb-80">
          <div className="mb-5">
            <h2 className="h1 g-font-weight-300 mb-3">{t("Welcome to Unify")}</h2>
            <p className="g-color-gray-dark-v5">
              {t("The time has come to bring those ideas and plans to life. This is\n" +
                  "              where we really begin to visualize your napkin sketches and make\n" +
                  "              them into beautiful pixels.")}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-9">
              {/* Icon Blocks */}
              <div className="media mb-4">
                <div className="d-flex mr-3">
                  <span className="align-self-center u-icon-v1 u-icon-size--lg g-color-primary">
                    <i className="icon-finance-168 u-line-icon-pro" />
                  </span>
                </div>
                <div className="media-body align-self-center">
                  <h3 className="h5">{t("Reliable contracts")}</h3>
                  <p className="g-color-gray-dark-v5 mb-0">
                    {t(" Reliable contracts, multifanctionality &amp; best usage of\n" +
                        "                    Unify template")}
                  </p>
                </div>
              </div>
              {/* End Icon Blocks */}
              {/* Icon Blocks */}
              <div className="media mb-4">
                <div className="d-flex mr-3">
                  <span className="align-self-center u-icon-v1 u-icon-size--lg g-color-primary">
                    <i className="icon-finance-193 u-line-icon-pro" />
                  </span>
                </div>
                <div className="media-body align-self-center">
                  <h3 className="h5">{t("Security")}</h3>
                  <p className="g-color-gray-dark-v5 mb-0">
                    {t("Secure &amp; integrated options to create individual &amp;\n" +
                        "                    business websites")}
                  </p>
                </div>
              </div>
              {/* End Icon Blocks */}
              {/* Icon Blocks */}
              <div className="media">
                <div className="d-flex mr-3">
                  <span className="align-self-center u-icon-v1 u-icon-size--lg g-color-primary">
                    <i className="icon-finance-122 u-line-icon-pro" />
                  </span>
                </div>
                <div className="media-body align-self-center">
                  <h3 className="h5">{t("Maintain")}</h3>
                  <p className="g-color-gray-dark-v5 mb-0">
                    {t("We get it, you're busy and it's important that someone keeps\n" +
                        "                    up with marketing")}
                  </p>
                </div>
              </div>
              {/* End Icon Blocks */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    confirmToken: (password, secret, token, formMethods) => {
      dispatch({
        type: Actions.TOKEN_CONFIRM.REQUEST,
        payload: { password, secret, token, formMethods }
      });
    },
    resendConfirm: (phone) => {
      dispatch({
        type: Actions.RESEND_CONFIRM.REQUEST,
        payload: { phone }
      });
    },
    checkAuth: (token) => {
      dispatch({
        type: AuthActions.CHECK_AUTH.REQUEST,
        payload: { token }
      });
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchedConfirm: get(
      state,
      "normalizer.data.confirm-token.isFetched",
      false
    ),
    tokenConfirmId: get(state, "normalizer.data.confirm-token.result", []),
    tokenId: get(state, "normalizer.data.signup-token.result", []),
    resendPassword: get(
      state,
      "normalizer.data.resend-confirm-token.result",
      []
    ),
    resetId: get(state, "normalizer.data.reset-password.result", []),
    isFetchedResend: get(
      state,
      "normalizer.data.resend-confirm-token.isFetched",
      false
    ),
    entities: get(state, "normalizer.entities", {}),
    hasError: get(state, "normalizer.data.confirm-token.hasErrors", false),
    error: get(state, "normalizer.data.confirm-token.errors", ""),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation("HRMS")(Container)));
