import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {isEqual, get} from "lodash";
import {withRouter} from "react-router";
import {withTranslation} from "react-i18next";
import {Edit2, Trash2} from 'react-feather'

const ItemBody = ({
                      t, body, history, remove = () => {
    }, update = () => {
    }
                  }) => {
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
                className={classNames("mode-dark ", {
                    bg_active: isEqual(isActive, index)
                })}

            >
                <td className={'text-left'}>{index + 1}</td>
                <td>{get(td, "title", "")}</td>
                <td>{get(td, "description", "")}</td>
                <td>{get(td, "code", "")}</td>
                <td>{get(td, "value", "")}</td>
                <td className={'text-center'}>
                    <Edit2 onClick={() => update(get(td, 'id'))} size={18} color={'#72c02c'}
                           className={'cursor-pointer'}
                           style={{marginRight: '10px'}}/>
                    <Trash2 onClick={() => remove(get(td, 'id'))} size={18} color={'#e62154'}
                            className={'cursor-pointer'}/>
                </td>
            </tr>
        ))}
        </tbody>
    );
};

export default withTranslation("HRMS")(withRouter(ItemBody));
