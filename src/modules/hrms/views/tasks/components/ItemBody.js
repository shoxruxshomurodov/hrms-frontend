import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import { isEqual, get } from "lodash";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import moment from "moment";
const ItemBody = ({t,body,history}) => {
    const [isActive, setIsActive] = useState(false);
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
                key={get(td,"id")}
                style={{ verticalAlign: "middle" }}
                className={classNames("mode-dark pointer", {
                    bg_active: isEqual(isActive, index)
                })}
                onClick={() => setIsActive(index)}
                onDoubleClick={() => history.push(`/task/view/${td.id}`)}
            >
                <td className={'text-left'}>{index+1}</td>
                <td>{get(td, "title", "")}</td>
                <td>{t(get(td, "processName", ""))}</td>
                <td>{moment(get(td,'createdAt')).format("DD-MM-YYYY")}</td>
                <td>{get(td, "status", "")}</td>
            </tr>
        ))}
        </tbody>
    );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
