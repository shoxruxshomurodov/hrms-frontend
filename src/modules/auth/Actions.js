import { createRoutine } from "redux-saga-routines";
const LOGIN_OR_SIGN_UP = createRoutine("LOGIN_OR_SIGN_UP");
const TOKEN_CONFIRM = createRoutine("TOKEN_CONFIRM");
const LOGIN = createRoutine("LOGIN");
const LOGIN_WITH_KEY = createRoutine("LOGIN_WITH_KEY");
const PASSWORD_RESET = createRoutine("PASSWORD_RESET");
const RESEND_CONFIRM = createRoutine("RESEND_CONFIRM");
const SET_SIDEBAR_CONDITION = createRoutine("SET_SIDEBAR_CONDITION");
const SHOW_WELCOME_NOTIFY = createRoutine("SHOW_WELCOME_NOTIFY");
export default {
  LOGIN_OR_SIGN_UP,
  TOKEN_CONFIRM,
  LOGIN,
  PASSWORD_RESET,
  RESEND_CONFIRM,
  LOGIN_WITH_KEY,
  SET_SIDEBAR_CONDITION,
  SHOW_WELCOME_NOTIFY
};
