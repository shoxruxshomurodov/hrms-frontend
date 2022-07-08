import React from "react";
import PerPage from "../PerPage";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
const ToolBarDocument = (props) => {
  const { t, pageSize, onPerPage, search = "", onSearch, createUrl } = props;
  return (
    <div className="media-md align-items-center g-mb-10">
      <div className="d-flex g-mb-15 g-mb-0--md">
        <h3 className="g-font-weight-400 g-font-size-16 g-color-black mb-0">{t("This section provides an overview of employee information for CRM.")}</h3>
      </div>
      <div className="media d-md-flex align-items-center ml-auto">
        <Link
          to={createUrl}
          className="d-flex align-items-center u-link-v5 g-color-secondary g-color-primary--hover"
        >
          <i className="hs-admin-plus g-font-size-18" />
          <span className="g-hidden-sm-down g-ml-10">{t("Create")} </span>
        </Link>
        <PerPage value={pageSize} className="g-ml-15 g-ml-55--md" onPerPage={onPerPage} t={t} />
        <div className="d-flex g-ml-15 g-ml-55--md">
          <div className="input-group g-pos-rel g-width-320--md">
            <input
              id="datatableSearch2"
              className="form-control g-font-size-default g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-rounded-20 g-pl-20 g-pr-50 g-py-10"
              onChange={(e) => onSearch(e)}
              name="title"
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

export default withTranslation("HRMS")(withRouter(ToolBarDocument));
