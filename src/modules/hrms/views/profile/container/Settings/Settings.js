import React, { Component, useState } from "react";
import Tabs from "../../../../../../components/Tabs";
import { get } from "lodash";
import EditProfile from "./components/EditProfile";
import Security from "./components/Security";
import Payment from "./components/Payment";
import Notification from "./components/Notification";
import { connect, useDispatch } from "react-redux";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import AuthActions from "../../../../../../services/auth/actions";
import Api from "../../../../Api";
import { ToastContainer } from "react-toastify";
import { withTranslation } from "react-i18next";
import EmployeesScheme from "../../../../../../schema/Employees";
import ApiActions from "../../../../../../services/api/Actions";
const Settings = ({ checkAuth, employee, ...props }) => {
  const [isFetched, setIsFetched] = useState(false);

  const changePassword = (values) => {
    const { current, password } = values;
    Api.changePassword(current, password)
      .then((_res) => {
        SuccessNotify("Успешно изменено");
        setTimeout(() => {
          checkAuth();
        }, 1500);
      })
      .catch((e) => {
        ErrorNotify("Неправильный старый пароль");
      });
  };

  const syncFidoService = () => {
    setIsFetched("syncFidoService");
    Api.syncFidoService()
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно изменено");
        setTimeout(() => {
          checkAuth();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify("Произошла ошибка");
      });
  };

  const syncRegistrationService = () => {
    setIsFetched("syncRegistrationService");
    Api.syncRegistrationService()
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно изменено");
        setTimeout(() => {
          checkAuth();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify("Произошла ошибка");
      });
  };

  const syncTaxTinService = () => {
    setIsFetched("syncTaxTinService");
    Api.syncTaxTinService()
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно изменено");
        setTimeout(() => {
          checkAuth();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify("Произошла ошибка");
      });
  };

  const syncEmployeeData = () => {
    setIsFetched("syncEmployeeData");
    Api.syncEmployeeData()
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно изменено");
        setTimeout(() => {
          checkAuth();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify("Произошла ошибка");
      });
  };

  return (
    <>
      <Tabs
        texts={[
          <EditProfile
            employee={employee}
            syncFidoService={syncFidoService}
            syncRegistrationService={syncRegistrationService}
            syncTaxTinService={syncTaxTinService}
            syncEmployeeData={syncEmployeeData}
            isFetched={isFetched}
          />,
          <Security changePassword={changePassword} />,
          <Payment />,
          <Notification />,
        ]}
      />
      <ToastContainer />
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFetched: get(state, "authCheck.isFetched", false),
    user: get(state, "authCheck.user", {}),
  };
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
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(Settings)
);
