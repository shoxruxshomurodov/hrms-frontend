import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import config from "./../../config";
import storage from "../storage";

const options = {
  fallbackLng: storage.get("lang", config.DEFAULT_LANG_CODE),
  ns: [config.PROJECT_ID],
  defaultNS: config.PROJECT_ID,
  keySeparator: false,
  saveMissing: true,
  react: {
    useSuspense: false,
    wait: true,
  },
  interpolation: {
    escapeValue: true,
    formatSeparator: ",",
  },
  docflow: {
    wait: true,
  },
};

options.backend = {
  loadPath: `${config.API_ROOT}language/{{lng}}`,
  addPath: `${config.API_ROOT}language/create`,
};
export default () => {
  i18n.use(XHR).init(options);
  return i18n;
};
