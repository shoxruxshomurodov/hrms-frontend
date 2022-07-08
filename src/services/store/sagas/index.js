import { all } from "redux-saga/effects";
import normalizer from "../../../services/normalizer/sagas";
import auth from "../../../modules/auth/Sagas";
import authCheck from "../../auth/sagas";
import api from "../../api/Saga";
import hrms from "../../../modules/hrms/Sagas";
import saveAll from "../../../modules/hrms/SaveAllSaga";
export default function* sagas() {
  yield all([auth(), authCheck(), normalizer(), api(), hrms(), saveAll()]);
}
