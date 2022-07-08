import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Actions from "../../Actions";
import { get } from "lodash";
import Utils from "../../../../services/helpers/Utils";
import Normalizer from "../../../../services/normalizer";
import TokenScheme from "../../../../schema/Token";
import SuccessNotify from "../../../../components/Sweetalerts/SuccessNotify";
import Form from "./Form";
import ErrorNotify from "../../../../components/Sweetalerts/ErrorNotify";
import {withTranslation} from "react-i18next";
class Container extends Component {
  reset = (values) => {
    const { ResetPassword} = this.props;
    let { phone } = values;
    phone = phone.replace(/[\s()-]+/gi, "");
    ResetPassword(phone);
  };

  componentDidUpdate(prevProps, _prevState) {
    const { isFetchedToken, tokenId, history, entities, hasError } = this.props;
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
      },2000)

    }
  }

  render() {
    const {isFetchedToken,hasError, t} = this.props;
    return (
      <div className="row justify-content-between">
        <div className="col-md-6 col-lg-5 flex-md-unordered g-mb-80">
          <div className="g-brd-around g-brd-gray-light-v3 g-bg-white rounded g-px-30 g-py-50 mb-4">
            <header className="text-center mb-4">
              <h1 className="h3 g-color-black g-font-weight-300 text-capitalize">
                {t("Reset to your account")}
              </h1>
            </header>
            {/* Form */}
            <Form reset={this.reset} />
            {!hasError && isFetchedToken && SuccessNotify(t("Успешно прошел к следующему шагу"))}
            {hasError && isFetchedToken && ErrorNotify(t("Ошибка на сервере !!!"))}
            {/* End Form */}
          </div>
        </div>
        <div className="col-md-6 flex-md-first g-mb-80">
          <div className="mb-5">
            <h2 className="h1 g-font-weight-300 mb-3">{t("Welcome to HR portal")} </h2>
            <p className="g-color-gray-dark-v5">
              {t("The time has come to bring those ideas and plans to life!")}
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
                    {t("Reliable contracts, multifanctionality &amp; best usage of\n" +
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
    ResetPassword: (phone) => {
      dispatch({
        type: Actions.PASSWORD_RESET.REQUEST,
        payload: { phone }
      });
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchedToken: get(
      state,
      "normalizer.data.reset-password.isFetched",
      false
    ),
    tokenId: get(state, "normalizer.data.reset-password.result", []),
    hasError: get(
      state,
      "normalizer.data.reset-password.hasErrors",
      false
    ),
    entities: get(state, "normalizer.entities", {})
  };
};

export default withTranslation("HRMS")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Container)));
