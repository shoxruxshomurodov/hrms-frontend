import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import { isEqual, get } from "lodash";
import { withRouter } from "react-router";
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
          className={classNames("mode-dark pointer", {
            bg_active: isEqual(isActive, index)
          })}
          onClick={() => setIsActive(index)}
          onDoubleClick={() => history.push(`/diploma-qualification/view/${td.id}`)}
        >
          <td>{get(td, "id", "")}</td>
          <td>{get(td, "title", "")}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
