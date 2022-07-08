import React from "react";
import { render } from "react-dom";
import "./assets/css/index.css";
import Router from "./services/router";
import Store from "./services/store";
import I18n from "./services/i18n/Provider";
import i18n from "./services/i18n";
import moment from "moment";
import reportWebVitals from "./services/web-vitals";
import Auth from "./services/auth/context/Auth";
import storage from "./services/storage";
import * as serviceWorker from "./serviceWorker";
const i18nLang = i18n();

window.onload = function () {
  try {
    i18nLang.changeLanguage(storage.get("lang") ? storage.get("lang") : "ru");
    moment.locale(storage.get("lang") ? storage.get("lang") : "ru");
  } catch (e) {
    moment.locale("ru");
  }
};
render(
  <Store>
    <I18n>
      <Auth>
        <Router />
      </Auth>
    </I18n>
  </Store>,
  document.getElementById("root")
);

serviceWorker.unregister();
reportWebVitals();
