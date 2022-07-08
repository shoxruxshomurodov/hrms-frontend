import React, { useState } from "react";
import classNames from "classnames";
import { isEqual, get } from "lodash";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
const ItemBody = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { body, history } = props;
  return (
    <tbody>
      {body.map((td, index) => (
        <tr
          key={td.id}
          style={{ verticalAlign: "middle" }}
          className={classNames("mode-dark pointer", {
            bg_active: isEqual(isActive, index)
          })}
          onClick={() => setIsActive(index)}
          onDoubleClick={() => history.push(`/employee-requests/view/${td.id}/${td.requestAbleId}`)}
        >
          <td>{get(td, "id", "")}</td>
          <td>{get(td, "profile.lastName", "")+ " " + get(td, "profile.firstName", "") + " " + get(td, "profile.patronymicName", "")}</td>
          <td>{get(td, "status", "")}</td>
          <td>{get(td, "profile.passportSeries", "") + " " + get(td, "profile.passportNumber", "")}</td>
          <td>{get(td, "profile.pnfl", "")}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
