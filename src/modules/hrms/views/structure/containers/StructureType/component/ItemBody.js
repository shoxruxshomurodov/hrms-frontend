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
          key={get(td, "id")}
          style={{ verticalAlign: "middle" }}
          className={classNames("mode-dark pointer", {
            bg_active: isEqual(isActive, index)
          })}
          onClick={() => setIsActive(index)}
          onDoubleClick={() => history.push(`/structure-type/view/${td.id}`)}
        >
          <td>{get(td, "id", "")}</td>
          <td>{get(td, "title", "")}</td>
          <td>{get(td, "code", "")}</td>
          <td>{get(td, "status", "")}</td>
          <td>{get(td, "level", "")}</td>
          <td>{get(td, "type", "")}</td>
          <td>{get(td, "rating", "")}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
