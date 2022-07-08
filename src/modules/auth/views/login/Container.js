import React, {useEffect, useState} from "react";
import Form from "./Form";
import {connect} from 'react-redux';
import Actions from '../../Actions';
import AuthActions from '../../../../services/auth/actions';
import {get} from 'lodash';
import Loader from "../../../../components/Loader";
import {withRouter} from 'react-router-dom';
import {info, sign} from "../../../../services/certWs";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import SweetAlertModal from "../../../../components/Sweetalerts/SweetAlertModal";
import Normalizer from "../../../../services/normalizer";
import UserScheme from "../../../../schema/User";

const LoginContainer = ({
                          t,
                          loginRequest,
                          loginWithKeyRequest,
                          checkAuth,
                          isFetched,
                          history,
                          data,
                          welcomeNotifySuccess,
                          isFetchedUser,
                          user,
                          entities,
                          ...rest
                        }) => {
  const [activeKey, setActiveKey] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [phone, setPhone] = useState(null);
  const login = (phone, password, formMethods) => {
    setShowRegisterModal(false);
    loginRequest({
      phone, password, formMethods, 
      cb: {
        success: (nData, data) => {
          toast.dismiss();
           checkAuth(get(data, 'access_token', null));
           welcomeNotifySuccess();
           history.push('/profile');
        },
        fail: (phone,data) => {
          toast.dismiss();
          if (!get(data, 'data.exist', false)) {
            setShowRegisterModal(true);
            setPhone(phone);
          } else {
            toast.error(`Ошибка: ${get(data, 'message', null)}`, {
              position: "top-right",
              autoClose: 2000
            });
          }
        }
      }
    });
  };

  const loginWithKey = () => {
    sign("authWithKey", loginWithKeyRequest)
    closeInterval();
  };
  const initInterVal = () => {
    document.wsInitKey = setInterval(() => {
      keyListener();
    }, 8000);
  };

  const changeActiveKeyState = (state) => {
    setActiveKey(state);
  }

  const closeInterval = () => {
    clearInterval(document.wsInitKey);
    changeActiveKeyState(false)
  }

  const keyListener = () => {
    info(() => {
    }, false, closeInterval);
  };

  useEffect(() => {
    if(isFetched && !activeKey) {
      const result = Normalizer.Denormalize(data,UserScheme,entities)
      checkAuth(get(result, 'access_token', null));
      welcomeNotifySuccess();
      history.push('/profile');
    }
  }, [isFetched]);
  useEffect(() => {
    keyListener();
    initInterVal();
    return () => {
      clearInterval(document.wsInitKey);
      changeActiveKeyState(true)
    }
  }, []);


  return (
      <>
        {isFetchedUser ?
            <div className="row justify-content-between">
              <div className="col-md-6 col-lg-5 flex-md-unordered g-mb-80">
                <div className="g-brd-around g-brd-gray-light-v3 g-bg-white rounded g-px-30 g-py-50">
                  <header className="text-center mb-4">
                    <h1 className="h3 g-color-black g-font-weight-300 text-capitalize">
                      {t("Login in")}
                    </h1>
                  </header>
                  {/* Form */}
                  <p className="g-mb-0 text-center">{t("Please enter your mobile phone number")}.</p>
                  <Form activeKey={activeKey} isFetchedUser={isFetchedUser} loginWithKey={loginWithKey} login={login}/>
                </div>
              </div>
              <div className="col-md-6 flex-md-first g-mb-80">
                <div className="mb-5">
                  <h2 className="h1 g-font-weight-300 mb-3">{t("Welcome to HR portal")}</h2>
                  <p className="g-color-gray-dark-v5">
                    {t("The time has come to bring those ideas and plans to life!")}
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-10">
                    {/* Icon Blocks */}
                    <div className="media mb-4">
                      <div className="d-flex mr-3">
                    <span className="align-self-center u-icon-v1 u-icon-size--lg g-color-primary">
                      <i className="icon-cursor u-line-icon-pro"/>
                    </span>
                      </div>
                      <div className="media-body align-self-center">
                        <h3 className="h5">{t("Все данные о сотрудниках в один клик")}</h3>
                        <p className="g-color-gray-dark-v5 mb-0">
                          {t("Быстро находите любую информацию по сотрудникам: история позиций и зарплат, количество отпускных дней и многое другое. Легко разграничиваете права доступа остальных сотрудников к информации о коллегах.")}
                        </p>
                      </div>
                    </div>
                    {/* End Icon Blocks */}
                    {/* Icon Blocks */}
                    <div className="media mb-4">
                      <div className="d-flex mr-3">
                    <span className="align-self-center u-icon-v1 u-icon-size--lg g-color-primary">
                      <i className="icon-user-follow u-line-icon-pro"/>
                    </span>
                      </div>
                      <div className="media-body align-self-center">
                        <h3 className="h5">{t("Автоматизация адаптации новых сотрудников")}

                        </h3>
                        <p className="g-color-gray-dark-v5 mb-0">
                          {t("Атоматизируйте назначение задач, когда новые сотрудники присоединяются к компании. Разработайте чек-лист, конкретные этапы и дедлайны для выполнения на основе Ваших собственных правил. Настройте процессы и система всем напомнит сама.")}

                        </p>
                      </div>
                    </div>
                    {/* End Icon Blocks */}
                    {/* Icon Blocks */}
                    <div className="media">
                      <div className="d-flex mr-3">
                    <span className="align-self-center u-icon-v1 u-icon-size--lg g-color-primary">
                      <i className="icon-calendar u-line-icon-pro"/>
                    </span>
                      </div>
                      <div className="media-body align-self-center">
                        <h3 className="h5">{t("HR Календарь - не упустить ничего важного")}
                        </h3>
                        <p className="g-color-gray-dark-v5 mb-0">
                          {t(' Не держите в голове или разных календарях даты дней рождения, годовщин выхода на работу, начала или окончания испытательного срока, праздников и отпусков. Теперь они будут в одном календаре.')}

                        </p>
                      </div>
                    </div>
                    {/* End Icon Blocks */}
                  </div>
                </div>
              </div>
              <ToastContainer/>
              {showRegisterModal && <SweetAlertModal icon={'warning'} confirmButtonText={'Рўйхатдан ўтиш'} confirm = {() => history.push(`/auth?phone=${btoa(phone)}`)} />}
            </div>
            : <Loader/>}
      </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: ({phone, password, formMethods, cb}) => {
      dispatch({
        type: Actions.LOGIN.REQUEST,
        payload: {phone, password, formMethods, cb},
      });
    },
    loginWithKeyRequest: (certInfo, signedMsg,cb) => {
      dispatch({
        type: Actions.LOGIN_WITH_KEY.REQUEST,
        payload: {certInfo, signedMsg,cb},
      });
    },
    checkAuth: (token) => {
      dispatch({
        type: AuthActions.CHECK_AUTH.REQUEST,
        payload: { token },
      });
    },
    welcomeNotifySuccess: () => {
      dispatch({
        type: Actions.SHOW_WELCOME_NOTIFY.SUCCESS,
      });
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchedUser:get(state,"authCheck.isFetched",false),
    isFetched:get(state,"normalizer.data.login.isFetched",false),
    data:get(state,"normalizer.data.login.result",{}),
    entities: get(state, 'normalizer.entities', {}),
  };
};
export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer)));
