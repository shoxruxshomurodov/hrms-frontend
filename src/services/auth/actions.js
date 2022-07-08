import {createRoutine} from "redux-saga-routines";

const CHECK_AUTH = createRoutine("CHECK_AUTH");
const LOGOUT_AUTH = createRoutine("LOGOUT_AUTH");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    CHECK_AUTH,
    LOGOUT_AUTH
}