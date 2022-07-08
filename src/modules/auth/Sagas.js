import {all, call, put, takeLatest} from "redux-saga/effects";
import Actions from "./Actions";
import Api from "./Api";
import Normalizer from "./../../services/normalizer";
import TokenScheme from "./../../schema/Token";
import UserScheme from "./../../schema/User";
import LoginScheme from "./../../schema/Login";
import NormalizerAction from "../../services/normalizer/actions";

function* loginOrSignUpRequest(action) {
  let {
    passport,
    personalIdentificationNumber,
    phone,
    formMethods: { setFieldError, setSubmitting }
  } = action.payload;
  try {
    const { data } = yield call(
      Api.LoginOrSignUp,
      passport,
      personalIdentificationNumber,
      phone
    );
    const { token: tokenData } = data;
    const normalizedData = yield call(
      Normalizer.Normalize,
      tokenData,
      TokenScheme
    );
    yield call(setSubmitting, false);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "signup-token",
        entityName: "token"
      }
    });
    yield put({ type: Actions.LOGIN_OR_SIGN_UP.SUCCESS });
  } catch (e) {
    const errors = e.response.status;
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: {
        errors,
        storeName: "signup-token"
      }
    });
    yield put({ type: Actions.LOGIN_OR_SIGN_UP.FAILURE });
  }
  yield call(setSubmitting, false);
}

function* tokenConfirm(action) {
  const {
    payload: {
      password,
      secret,
      token,
      formMethods: { setFieldError, setSubmitting }
    }
  } = action;
  try {
    const { data } = yield call(Api.TokenConfirm, password, secret, token);
    const normalizedData = yield call(
      Normalizer.Normalize,
      data.login,
      LoginScheme
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "confirm-token",
        entityName: "login"
      }
    });
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        storeName: "welcome"
      }
    });
    yield put({ type: Actions.TOKEN_CONFIRM.SUCCESS });
  } catch (e) {
    const errors = e.response.status;
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: {
        errors,
        storeName: "confirm-token"
      }
    });
    yield put({ type: Actions.TOKEN_CONFIRM.FAILURE });
  }
  yield call(setSubmitting, false);
}

function* login(action) {
  let {
    payload: {
      phone:login,
      password,
      formMethods: {setFieldError, setSubmitting},
      cb = {
        success: () => {
        },
        fail: () => {
        }
      }
    }
  } = action;

  try {
    const { data } = yield call(Api.Login, login, password);
    const normalizedData = yield call(Normalizer.Normalize, data, UserScheme);
    yield call(cb.success, normalizedData, data);
    yield put({ type: Actions.LOGIN.SUCCESS });
  } catch (e) {
    yield call(cb.fail, login, e?.response?.data);
    yield put({ type: Actions.LOGIN.FAILURE });
  }
  yield call(setSubmitting, false);
}

function* loginWithKey(action) {
  const  {certInfo,signedMsg, cb = {
    success: () => {
    },
    fail: () => {
    }
  }} = action.payload;
  try {
    const { data } = yield call(Api.LoginWithKey, certInfo,signedMsg);
    const normalizedData = yield call(Normalizer.Normalize, data, UserScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "login", entityName: "user" }
    });
    yield put({ type: Actions.LOGIN_WITH_KEY.SUCCESS });
    yield call(cb.success, normalizedData, data);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        storeName: "welcome"
      }
    });
  } catch (e) {
    const status = e.response.status;
    const message = e.response.data.message
    const errors = {message,status};
    yield call(cb.fail, login, e?.response?.data);
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: {
        errors,
        storeName: "login"
      }
    });
    yield put({ type: Actions.LOGIN_WITH_KEY.FAILURE });
  }
}

function* resendConfirm(action) {
  const {
    payload: { phone }
  } = action;
  try {
    const { data } = yield call(Api.ResendConfirm, phone);
    const normalizedData = yield call(Normalizer.Normalize, data, TokenScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "resend-confirm-token",
        entityName: "token"
      }
    });
    yield put({ type: Actions.RESEND_CONFIRM.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.RESEND_CONFIRM.FAILURE });
  }
}

function* resetPassword(action) {
  const {
    payload: { phone }
  } = action;
  try {
    const { data } = yield call(Api.ResetPassword, phone);
    const normalizedData = yield call(Normalizer.Normalize, data, TokenScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "reset-password",
        entityName: "token"
      }
    });
    yield put({ type: Actions.PASSWORD_RESET.SUCCESS });
  } catch (e) {
    const errors = e.response.status;
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: {
        errors,
        storeName: "reset-password"
      }
    });
    yield put({ type: Actions.PASSWORD_RESET.FAILURE });
  }
}
export default function* sagas() {
  yield all([
    takeLatest(Actions.LOGIN_OR_SIGN_UP.REQUEST, loginOrSignUpRequest),
    takeLatest(Actions.TOKEN_CONFIRM.REQUEST, tokenConfirm),
    takeLatest(Actions.LOGIN.REQUEST, login),
    takeLatest(Actions.LOGIN_WITH_KEY.REQUEST, loginWithKey),
    takeLatest(Actions.RESEND_CONFIRM.REQUEST, resendConfirm),
    takeLatest(Actions.PASSWORD_RESET.REQUEST, resetPassword),
  ]);
}
