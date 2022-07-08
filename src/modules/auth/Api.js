import {hrmsRequest} from "./../../services/api";

class Api {
  static LoginOrSignUp = (passport,personalIdentificationNumber, phone) => {
    return hrmsRequest.post("oauth/users", {
      passport,
      personalIdentificationNumber,
      phone
    });
  };

  static TokenConfirm = (password,secret,token) => {
    return hrmsRequest.post("oauth/users/confirm", {
      password,
      secret,
      token
    });
  };

  static Login = (login,password) => {
    return hrmsRequest.post(`oauth/users/login`,{
      login,
      password,
    },);
  };
  static LoginWithKey = (certInfo,signedMsg) => {
    return hrmsRequest.post(`oauth/users/login-with-cert`,{certInfo,signedMsg});
  };
  static ResendConfirm = (phone) => {
    return hrmsRequest.post(`oauth/users/resend-confirm`, {phone});
}
  static ResetPassword = (phone) => {
    return hrmsRequest.post(`oauth/users/reset-password`, {phone});
  }
}

export default Api;
