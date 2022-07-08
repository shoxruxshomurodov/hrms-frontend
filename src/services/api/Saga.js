import {all, call, put, takeEvery} from "redux-saga/effects";
import Actions from "./Actions";
import Api from "./Api";
import Normalizer from "../normalizer";
import NormalizerAction from "../normalizer/actions";
import {toast} from "react-toastify";

function* getAll(action) {
  const {
    url,
    config,
    scheme,
    storeName,
    entityName,
    callback,
    baseUrl = 'hrms',
    method = 'get',
    cb = {
      success: () => {
      },
      fail: () => {
      }
    }
  } = action.payload;
  try {
    const { data } = yield call(Api.getAll, url, config,baseUrl,method);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName, entityName }
    });
    try {
      yield call(callback, data);
    } catch (e) {}
    yield put({ type: Actions.GET_ALL.SUCCESS, payload: normalizedData });
    yield call(cb.success, normalizedData, data);
  } catch (e) {
    yield put({
      type: Actions.GET_ALL.FAILURE,
      payload: { storeName, errors: e?.response?.data }
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e?.response?.data }
    });
    yield call(cb.fail, e);
  }
}
function* getAllTrigger(action) {
  const {
    payload: { storeName }
  } = action;
  yield put({
    type: NormalizerAction.NORMALIZE.TRIGGER,
    payload: { storeName }
  });
}
function* getOneTrigger(action) {
  const {
    payload: { storeName }
  } = action;
  yield put({
    type: NormalizerAction.NORMALIZE.TRIGGER,
    payload: { storeName }
  });
}
function* getOne(action) {
  const {
    payload: { url, config, scheme = {}, storeName, entityName, callback, baseUrl = 'hrms' }
  } = action;
  try {
    const { data } = yield call(Api.getOne, url, config,baseUrl);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName, entityName }
    });
    try {
      yield call(callback, data);
    } catch (e) {}
    yield put({ type: Actions.GET_ONE.SUCCESS, payload: normalizedData });
  } catch (e) {
    yield put({
      type: Actions.GET_ONE.FAILURE,
      payload: { storeName, errors: e.response.data }
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e.response.data }
    });
  }
}

function* getData(action) {
  const { url, storeName, config = {}, callback = () => {} } = action.payload;
  try {
    const { data } = yield call(Api.getData, url, config);
    yield put({
      type: Actions.GET_DATA.SUCCESS,
      payload: { result: data, storeName }
    });
    try {
      yield call(callback, data);
    } catch (e) {}
  } catch (e) {
    yield put({
      type: Actions.GET_DATA.FAILURE,
      payload: { storeName, errors: e.response.data }
    });
  }
}

function* getDataTrigger(action) {
  const {
    payload: {storeName}
  } = action;
  yield put({type: Actions.GET_DATA.TRIGGER, payload: {storeName}});
}

function* deleteItemRequest(action) {
  const {
    payload: {
      id,
      url,
      config = {},
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {
        },
        fail: () => {
        }
      }
    }
  } = action;
  try {
    const {data} = yield call(Api.remove, url, config);
    yield call(cb.success, data);
    yield put({type: Actions.OPERATION_DELETE.SUCCESS, payload: {id, storeName, scheme, entityName}});
  } catch (e) {
    yield put({
      type: Actions.OPERATION_DELETE.FAILURE,
    });
    yield call(cb.fail, e);
  }
}

function* addItemRequest(action) {
  const {
    payload: {
      attributes,
      url,
      formMethods = {
        setIsFetched: () => {
        }
      },
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {
        },
        fail: () => {
        }
      }
    }
  } = action;
  try {
    const {data} = yield call(Api.add, url, attributes);
    const normalizedData = yield call(
        Normalizer.Normalize,
        data,
        scheme
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: `${entityName}-create`,
        entityName: entityName
      }
    });
    yield put({type: Actions.OPERATION_ADD.SUCCESS, payload: {...normalizedData, storeName, scheme, entityName}});
    yield call(cb.success, normalizedData,data);
  } catch (e) {
    yield put({
      type: Actions.OPERATION_ADD.FAILURE,
    });
    toast.dismiss();
    toast.error("Ошибка", {
      position: "top-right",
      autoClose: 1000
    });
    formMethods.setIsFetched(false)
  }
}


function* updateItemRequest(action) {
  const {
    payload: {
      attributes,
      url,
      formMethods = {
        setIsFetched: () => {
        }
      },
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {
        },
        fail: () => {
        }
      }
    }
  } = action;
  try {
    const {data} = yield call(Api.update, url, attributes);
    const normalizedData = yield call(
        Normalizer.Normalize,
        data,
        scheme
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: `${entityName}-update`,
        entityName: entityName
      }
    });
    yield put({type: Actions.OPERATION_UPDATE.SUCCESS});
    yield call(cb.success, normalizedData,data);
  } catch (e) {
    yield put({
      type: Actions.OPERATION_UPDATE.FAILURE,
    });
    toast.dismiss();
    toast.error("Ошибка", {
      position: "top-right",
      autoClose: 1000
    });
    formMethods.setIsFetched(false)
  }
}

export default function* sagas() {
  yield all([
    takeEvery(Actions.GET_ALL.REQUEST, getAll),
    takeEvery(Actions.GET_ONE.REQUEST, getOne),
    takeEvery(Actions.GET_ALL.TRIGGER, getAllTrigger),
    takeEvery(Actions.GET_ONE.TRIGGER, getOneTrigger),
    takeEvery(Actions.GET_DATA.REQUEST, getData),
    takeEvery(Actions.GET_DATA.TRIGGER, getDataTrigger),
    takeEvery(Actions.OPERATION_DELETE.REQUEST, deleteItemRequest),
    takeEvery(Actions.OPERATION_ADD.REQUEST, addItemRequest),
    takeEvery(Actions.OPERATION_UPDATE.REQUEST, updateItemRequest),
  ]);
}
