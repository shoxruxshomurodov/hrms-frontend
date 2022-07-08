import React from "react";
import { Link } from "react-router-dom";
import LoaderMini from "../../../../components/Loader/LoaderMini";
import { withTranslation } from "react-i18next";
import { isEqual } from "lodash";
const Button = (props) => {
  const { cancelLink, isFetched, t, buttonText } = props;
  return (
    <div className="col-6 offset-2">
      <button
        type="submit"
        className="btn btn-md u-btn-primary rounded-0"
        disabled={isEqual(isFetched, buttonText)}
      >
        {isEqual(isFetched, buttonText) ? <LoaderMini /> : t(buttonText)}
      </button>
      <Link to={cancelLink} className="btn btn-md rounded-0 ml-2">
        <span className="ml-2">{t("Cancel")}</span>
      </Link>
    </div>
  );
};

export default withTranslation("HRMS")(Button);
