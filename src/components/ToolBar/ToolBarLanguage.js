import React from "react";
import PerPage from "../PerPage";
import { withTranslation } from "react-i18next";
import { withRouter} from "react-router";
import {Link} from "react-router-dom";
import { isEqual, get } from "lodash";
const ToolBarLanguage = (props) => {
  const {
    t,
    pageSize,
    onPerPage,
    search = "",
    onSearch,
    location,
    createUrl
  } = props;
  return (
    <div className="media-md align-items-center g-mb-10">
      <div className="media d-md-flex align-items-center ml-auto">
        {isEqual(get(location, "pathname"), "/language") && (
          <span
            className="d-flex align-items-center u-link-v5 g-color-secondary g-color-primary--hover g-ml-15 g-ml-45--md pointer"
            onClick={() =>
              window.open("https://translate.google.com/?hl=ru", "_blank")
            }
          >
            <i className="hs-admin-share g-font-size-18" />
            <span className="g-hidden-sm-down g-ml-10">
              {t("Google Переводчик")}
            </span>
          </span>
        )}
        {!isEqual(get(location, "pathname"), "/language") && (
            <Link
                to={createUrl}
                className="d-flex align-items-center u-link-v5 g-color-secondary g-color-primary--hover"
            >
              <i className="hs-admin-plus g-font-size-18" />
              <span className="g-hidden-sm-down g-ml-10">{t("Create")} </span>
            </Link>
        )}
        <PerPage value={pageSize} className="g-ml-15" onPerPage={onPerPage} />
        <div className="d-flex g-ml-15 g-ml-55--md">
          <div className="input-group g-pos-rel g-width-320--md">
            <input
              id="datatableSearch2"
              name="content"
              className="form-control g-font-size-default g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-rounded-20 g-pl-20 g-pr-50 g-py-10"
              onChange={(e) => onSearch(e)}
              type="text"
              placeholder={t("Search for text...")}
              value={search}
              autoFocus={true}
            />
            <button
              className="btn g-pos-abs g-top-0 g-right-0 g-z-index-2 g-width-60 h-100 g-bg-transparent g-font-size-16 g-color-primary g-color-secondary--hover rounded-0"
              type="submit"
            >
              <i className="hs-admin-search g-absolute-centered" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("HRMS")(withRouter(ToolBarLanguage));
