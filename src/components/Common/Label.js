import React from "react";
import { withTranslation } from "react-i18next";
const Label = (props) => {
  const { t, column = 2, title } = props;
  return (
    <label className={`col-${column} col-form-label text-right`}>
      {t(title)}
    </label>
  );
};

export default withTranslation("HRMS")(Label);
