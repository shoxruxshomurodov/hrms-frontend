import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {isEqual, get} from "lodash";
import {withRouter} from "react-router";
import {withTranslation} from "react-i18next";

const ItemBody = ({t,body, history}) => {
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
                key={get(td, "id")}
                style={{verticalAlign: "middle"}}
                className={classNames("mode-dark pointer", {
                    bg_active: isEqual(isActive, index)
                })}
                onClick={() => setIsActive(index)}
                onDoubleClick={() => history.push(`/vacancy/view/${td.id}`)}
            >
                <td className={'text-left'}>{index + 1}</td>
                <td>{get(td, "title", "")}</td>
                <td>{get(td, "staff.title", "")}</td>
                <td>{get(td, "specialty.title", "")}</td>
                <td>{get(td, "country.title", "")}</td>
                <td>{get(td, "region.title", "")}</td>
                <td>{get(td, "district.title", "")}</td>
                <td>{get(td, "isPublished", false) ? t("PUBLISHED") : t("NOT PUBLISHED")}</td>
            </tr>
        ))}
        </tbody>
    );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
