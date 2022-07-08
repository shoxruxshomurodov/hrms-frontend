import { all, call, put, takeLatest } from "redux-saga/effects";
import Normalizer from "../../services/normalizer";
import NormalizerAction from "../../services/normalizer/actions";
import Actions from "./Actions";
function* requestSaveAllData(action) {
  const {
    payload: {
      attributes,
      cb = {
        success: () => {},
        fail: () => {}
      },
      scheme,
      storeName,
      entityName,
      Api,
      callback = () => {}
    }
  } = action;
  try {
    const { data } = yield call(Api, attributes);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: storeName,
        entityName: entityName
      }
    });
    yield put({ type: Actions.SAVE_ALL_DATA.SUCCESS });
    yield call(cb.success, normalizedData, data);
    yield call(callback);
  } catch (e) {
    yield put({ type: Actions.SAVE_ALL_DATA.SUCCESS });
    yield call(cb.fail, e);
  }
}

export default function* sagas() {
  yield all([takeLatest(Actions.SAVE_ALL_DATA.REQUEST, requestSaveAllData)]);
}
