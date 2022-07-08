import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import { isEqual, get } from "lodash";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
const ItemBody = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { body, history } = props;
  const ref = useRef(false);
  useEffect(() => {
    const pageClickEventDropdown = (e) => {
      if (
          ref.current !== null &&
          !ref.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", pageClickEventDropdown);
    }
    return () => {
      window.removeEventListener("click", pageClickEventDropdown);
    };
  }, [isActive]);
  return (
      <tbody ref={ref}>
      {body.map((td, index) => (
          <tr
              key={td.id}
              style={{ verticalAlign: "middle" }}
              className={classNames("mode-dark pointer text-left", {
                bg_active: isEqual(isActive, index)
              })}
              onClick={() => setIsActive(index)}
              onDoubleClick={() => history.push(`/business-process/view/${td.id}`)}
          >
            <td>{get(td, "id", "")}</td>
            <td>{get(td, "title", "")}</td>
            <td>{get(td, "processName", "")}</td>
            <td>{get(td, "code", "")}</td>
            <td>{get(td, "entity", "")}</td>
            <td>{get(td, "versionTag", "")}</td>
          </tr>
      ))}
      </tbody>
  );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
