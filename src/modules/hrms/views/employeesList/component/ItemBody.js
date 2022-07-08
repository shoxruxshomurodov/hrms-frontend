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
          onDoubleClick={() => history.push(`/employees/view/${td.id}`)}
        >
          <td>{get(td, "id", "")}</td>
          <td>{get(td, "fullName", "")}</td>
          <td>{get(td, "conditionTitle", "")}</td>
          <td>{get(td, "passport.passport", "")}</td>
          <td>{get(td, "passport.pinfl", "")}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
