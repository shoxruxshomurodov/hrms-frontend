import React from "react";
import { Link } from "react-router-dom";
import LoaderMini from "../../../../components/Loader/LoaderMini";
import { withTranslation } from "react-i18next";
import { isEqual } from "lodash";
const Button = ({ cancelLink, isFetched, t, buttonText,col=6}) => {
  return (
    <div className={`col-${col} offset-2`}>
      <button
        type="submit"
        className="btn btn-md u-btn-primary rounded-0 g-width-170"
        disabled={isEqual(isFetched, buttonText)}
      >
        {isEqual(isFetched, buttonText) ? <LoaderMini /> : t(buttonText)}
      </button>
        {cancelLink ? <Link to={cancelLink} className="btn btn-md  u-btn-darkgray g-width-170  ml-2 rounded-0">
        <span className="ml-2">{t("Cancel")}</span>
      </Link> : ""}
    </div>
  );
};

export default withTranslation("HRMS")(Button);
