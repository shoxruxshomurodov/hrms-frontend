import React, { Component } from "react";
import Header from "../main/components/Header";
import Footer from "../main/components/Footer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutAlert from "../../../components/Sweetalerts/LogOut";
import HomeNotify from "../../../components/Sweetalerts/LogIn";
import AuthActions from "../../../services/auth/actions";
import Actions from "../../../modules/hrms/Actions";
import NormalizerAction from "../../../services/normalizer/actions";
import { get, isNull } from "lodash";
import storage from "../../../services/storage";
import { ToastContainer } from "react-toastify";
class EmployeeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false,
    };
  }

  componentDidMount() {
    const { trigger } = this.props;
    trigger();
  }
  logOut = () => {
    this.setState({ logOut: true });
  };
  notLogOut = () => {
    this.setState({ logOut: false });
  };

  changeUrl = (lang) => {
    const { changeLang, getTranslations } = this.props;
    changeLang(lang);
    getTranslations(lang);
  };
  render() {
    const { children, logoutAuth, user, isFetchedWelcome, lang } = this.props;
    const { logOut } = this.state;
    return (
      <div className={`layout-column ${storage.get("mode")}`}>
        <Header
          lang={lang}
          changeUrl={this.changeUrl}
          user={user}
          logOut={this.logOut}
        />
        <main className="container-fluid px-0 g-pt-65">
          <div className="row no-gutters g-pos-rel g-overflow-x-hidden">
            <div className="col g-ml-45 g-ml-0--lg g-pb-65--md">
              <div className="g-pa-20 dark-theme" style={{ minHeight: "90vh" }}>
                {children}
              </div>
              {logOut && (
                <LogOutAlert
                  logoutAuth={logoutAuth}
                  notLogOut={this.notLogOut}
                />
              )}
              {!isNull(get(user, "avatarIconType", null)) &&
                isFetchedWelcome && (
                  <HomeNotify title="Добро пожаловать в нашу систему" />
                )}
              <Footer />
            </div>
          </div>
        </main>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: get(state, "authCheck.user", null),
    isFetched: get(state, "authCheck.isFetched", false),
    isFetchedWelcome: get(state, "normalizer.data.welcome.isFetched", false),
    mode: get(state, "hrms.mode", storage.get("mode")),
    lang: get(
      state,
      "hrms.lang",
      storage.get("lang") ? storage.get("lang") : "ru"
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAuth: () => {
      dispatch({
        type: AuthActions.LOGOUT_AUTH.REQUEST,
      });
    },
    changeLang: (lang) => {
      dispatch({
        type: Actions.CHANGE_LANG.REQUEST,
        payload: { lang },
      });
    },
    getTranslations: (lang) => {
      dispatch({
        type: Actions.GET_TRANSLATIONS.REQUEST,
        payload: { lang },
      });
    },
    trigger: () => {
      dispatch({
        type: NormalizerAction.NORMALIZE.TRIGGER,
        payload: {
          storeName: "welcome",
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeLayout));
