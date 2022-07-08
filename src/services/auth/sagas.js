import {all, call, put, takeLatest} from "redux-saga/effects";
import Actions from "./actions";
import Storage from "./../storage";
import Api from "./Services/ApiService";
import get from "lodash/get";

function* checkAuthRequest(action) {
    try {
        const {data} = yield call(Api.checkAuth, get(action, "payload.token", null));
        yield put({type: Actions.CHECK_AUTH.SUCCESS, payload: {token: get(action, "payload.token", null), user: data}});
    } catch (e) {
        yield put({type: Actions.CHECK_AUTH.FAILURE});
    }
}

function* checkAuthSuccess(action) {
    if (get(action, "payload.token", null)) {
      yield  Storage.set("token", get(action, "payload.token", null));
    }
}

function* checkAuthFailure(action) {
   yield Storage.remove("token");
}

function* logoutAuth() {
    const token = Storage.get("token");
    yield call(Api.logout, token);
    yield put({type: Actions.CHECK_AUTH.REQUEST});
}


export default function* sagas() {
    yield all([
        takeLatest(Actions.CHECK_AUTH.REQUEST, checkAuthRequest),
        takeLatest(Actions.CHECK_AUTH.SUCCESS, checkAuthSuccess),
        takeLatest(Actions.CHECK_AUTH.FAILURE, checkAuthFailure),
        takeLatest(Actions.LOGOUT_AUTH.REQUEST, logoutAuth),
    ]);
}