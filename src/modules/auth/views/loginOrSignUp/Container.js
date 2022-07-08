import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
import CountUp from "react-countup";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { get, isEqual } from "lodash";
import Utils from "../../../../services/helpers/Utils";
import Normalizer from "../../../../services/normalizer";
import TokenScheme from "../../../../schema/Token";
import Form from "./Form";
import ErrorNotify from "../../../../components/Sweetalerts/ErrorNotify";
import SuccessNotify from "../../../../components/Sweetalerts/SuccessNotify";
import WarnNotify from "../../../../components/Sweetalerts/WarnNotify";
import MapUzb from "./MapUzb";
import {withTranslation} from "react-i18next";

class Container extends Component {
  state = {
    content: "",
    phone: "",
  };
  loginOrSignUp = (data, formMethods) => {
    let { passport, personalIdentificationNumber, phone } = data;
    phone = phone.replace(/[\s()-]+/gi, "");
    const { loginOrSignUpDispatch } = this.props;
    loginOrSignUpDispatch(
      passport,
      personalIdentificationNumber,
      phone,
      formMethods
    );
  };
  componentDidUpdate(prevProps, prevState) {
    const { isFetchedToken, tokenId, history, entities, error, hasError } = this.props;
    if (
      !Utils.isEqualsArrsAttr(prevProps, this.props, [
        "isFetchedToken",
        "tokenId"
      ]) &&
      isFetchedToken &&
      !hasError
    ) {
      const data = Normalizer.Denormalize(tokenId, TokenScheme, entities);
      setTimeout(() => {
        history.push(`/auth/token/${get(data, "token")}/${btoa(get(data,'data'))}`);
      }, 2000);
    }
    if (isEqual(error, 410) && hasError) {
      setTimeout(() => {
        history.push(`/auth/login`);
      }, 2000);
    }
  }
  worldMap = (data) => {
    this.setState({ content: data });
  };
  render() {
    const { hasError, isFetchedToken, error, t } = this.props;
    return (
      <div className="row">
        <div className="col-lg-5 flex-lg-unordered g-mb-80">
          <div className="g-brd-around g-brd-gray-light-v3 g-bg-white rounded g-px-30 g-py-30 ">
            <header className="text-center mb-4">
              <h1
                className={classNames(
                  "h3 g-color-black g-font-weight-300 text-capitalize"
                )}
              >
                {t("Registration")}
              </h1>
            </header>
            <p className="g-mb-0 text-center">{t("Please enter your passport data and mobile phone number")}.</p>
            <Form
              hasError={hasError}
              isFetchedToken={isFetchedToken}
              loginOrSignUp={this.loginOrSignUp}
            />
            {isEqual(error, 400) &&
              hasError &&
              isFetchedToken &&
              ErrorNotify(t("Что-то не так !!!"))}
            {isEqual(error, 500) &&
              hasError &&
              isFetchedToken &&
              ErrorNotify(t("Ошибка на сервере !!!"))}
            {!hasError &&
              isFetchedToken &&
              SuccessNotify(t("Успешно прошел к следующему шагу"))}
            {isEqual(error, 410) &&
              hasError &&
              isFetchedToken &&
              WarnNotify(t("У вас есть аккаунт !!!"))}
          </div>
        </div>
        <div className="col-lg-7 flex-lg-first g-mb-80">
          <div className="g-pr-20--lg">
            <div className="mb-5">
              <h2 className="h1 g-font-weight-300 mb-3">{t("Welcome to HR portal")} </h2>
              <p className="g-color-gray-dark-v5">
                {t("The time has come to bring those ideas and plans to life!")}
              </p>
            </div>
            <div className="row text-center mb-5">
              <div className="col-sm-4 g-mb-10">
                {/* Counters */}
                <div className="g-bg-gray-light-v5 g-pa-20">
                  <div className="js-counter g-color-gray-dark-v5 g-font-weight-300 g-font-size-30 g-line-height-1">
                    <CountUp end={52147} duration={10} />
                  </div>
                  <div className="d-inline-block g-width-10 g-height-2 g-bg-gray-dark-v5 mb-1" />
                  <h4 className="g-color-gray-dark-v4 g-font-size-12 text-uppercase">
                    Code Lines
                  </h4>
                </div>
                {/* End Counters */}
              </div>
              <div className="col-sm-4 g-mb-10">
                {/* Counters */}
                <div className="g-bg-gray-light-v5 g-pa-20">
                  <div className="js-counter g-color-gray-dark-v5 g-font-weight-300 g-font-size-30 g-line-height-1">
                    <CountUp end={24583} duration={7} />
                  </div>
                  <div className="d-inline-block g-width-10 g-height-2 g-bg-gray-dark-v5 mb-1" />
                  <h4 className="g-color-gray-dark-v4 g-font-size-12 text-uppercase">
                    Projects
                  </h4>
                </div>
                {/* End Counters */}
              </div>
              <div className="col-sm-4 g-mb-10">
                {/* Counters */}
                <div className="g-bg-gray-light-v5 g-pa-20">
                  <div className="js-counter g-color-gray-dark-v5 g-font-weight-300 g-font-size-30 g-line-height-1">
                    <CountUp end={7348} duration={6} />
                  </div>
                  <div className="d-inline-block g-width-10 g-height-2 g-bg-gray-dark-v5 mb-1" />
                  <h4 className="g-color-gray-dark-v4 g-font-size-12 text-uppercase">
                    Working Hours
                  </h4>
                </div>
                {/* End Counters */}
              </div>
            </div>
            <div className="text-center">
              <h2 className="h4 mb-4">
                Join more than{" "}
                <span className="g-color-primary">
                  <CountUp end={13000} duration={5} />{" "}
                </span>
                members
              </h2>
              <MapUzb />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginOrSignUpDispatch: (
      passport,
      personalIdentificationNumber,
      phone,
      formMethods
    ) => {
      dispatch({
        type: Actions.LOGIN_OR_SIGN_UP.REQUEST,
        payload: { passport, personalIdentificationNumber, phone, formMethods }
      });
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchedToken: get(state, "normalizer.data.signup-token.isFetched", false),
    tokenId: get(state, "normalizer.data.signup-token.result", []),
    error: get(state, "normalizer.data.signup-token.errors", ""),
    hasError: get(state, "normalizer.data.signup-token.hasErrors", false),
    entities: get(state, "normalizer.entities", {}),

  };
};
export default withTranslation("HRMS")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Container)));
