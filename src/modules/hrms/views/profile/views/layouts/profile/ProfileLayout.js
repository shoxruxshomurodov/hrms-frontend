import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { withRouter } from "react-router-dom";
import Api from "../../../../../Api";
import AuthActions from "../../../../../../../services/auth/actions";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import { ToastContainer } from "react-toastify";
import { withTranslation } from "react-i18next";
import ProfileProvider from "../../../../../../../context/profile/ProfileProvider";
const ProfileLayout = ({ children, checkAuth }) => {
  const [isFetched, setIsFetched] = useState(false);

  const ChangeAvatar = (file) => {
    const formData = new FormData();
    formData.append("file", get(file, "file"));
    setIsFetched(true);
    Api.changeAvatar(formData)
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Изображение было успешно загружено");
        setTimeout(() => {
          checkAuth();
        }, 1500);
      })
      .catch((e) => {
        setIsFetched(true);
        ErrorNotify("Изображение не загружено");
      });
  };

  return (
    <div className={"container"}>
      <div className="row">
        <ProfileProvider value={{ isFetched, changeAvatar: ChangeAvatar }}>
          <div className="col">{children}</div>
        </ProfileProvider>
        <ToastContainer />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => {
      dispatch({
        type: AuthActions.CHECK_AUTH.REQUEST,
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: get(state, "authCheck.user", {}),
    isFetchedInitial: get(state, "auth.welcome", false),
  };
};

export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileLayout))
);
