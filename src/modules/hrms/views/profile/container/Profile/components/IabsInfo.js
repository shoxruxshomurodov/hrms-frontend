import React, {useState} from "react";
import {get, isNil} from "lodash";
import {withTranslation} from "react-i18next";
import Actions from "../../../../../Actions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import ContentLoader from "../../../../../../../components/Loader/ContentLoader";


const IabsInfo = ({t, user, reloadInfoFromIabsRequest}) => {
    const [isFetched, setIsFetched] = useState(false);
    const dispatch = useDispatch();

    function refreshServices() {
        setIsFetched(true);
        const attributes = {
            employeeId: get(user, "id"),
            service: "PASSPORT",
        };
        dispatch({
            type: Actions.EMPLOYEE_REFRESH_SERVICES_DATA.REQUEST,
            payload: {
                attributes,
                cb: {
                    success: (nData, data) => {
                        setIsFetched(false);
                        toast.dismiss();
                        toast.success("Успешно", {
                            position: "top-right",
                            autoClose: 1000,
                        });
                        setIsFetched(false);
                    },
                    fail: (e) => {
                        setIsFetched(false);
                        toast.dismiss();
                        toast.error(e.response.data.message, {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    },
                },
            },
        });
    }

    const iabs = get(user, "altEmp");
    const attributes = [
        {
            label: t("Name"),
            value:
                get(iabs, "lastName") +
                " " +
                get(iabs, "firstName") +
                " " +
                get(iabs, "middleName"),
        },
        {label: t("Pinfl"), value: get(iabs, "inps")},
        {
            label: t("passport"),
            value: get(iabs, "passportSeria") + get(iabs, "passportNumber"),
        },
        // {label: t("Inn"), value: get(iabs, "inn")},
        {label: t("Department"), value: get(iabs, "departmentName")},
        {label: t("Position"), value: get(iabs, "postName")},
        {label: t("МФО"), value: get(iabs, "filial")},
        {label: t("Employee ID"), value: get(iabs, "empId")},
        {label: t("Staffing ID"), value: get(iabs, "staffingId")},
        {label: t("tabNum"), value: get(iabs, "tabNum")},
    ];
    return (
        <>
            <div>
                <div className="row">
                    {/*{!isNil(get(user, "altEmp", null)) ? (*/}
                        <div className="col col-12">
                            {!isFetched ? (
                                <>
                                    <div className="text-right">
                                        {/*{isNil(get(user, "altId", null)) && (*/}
                                        <button
                                            onClick={() => reloadInfoFromIabsRequest({id:get(user,'id')})}
                                            className="btn btn-sm u-btn-outline-cyan rounded-0 g-py-10 g-px-20 ml-2"
                                        >
                                            <i className={"hs-admin-reload mr-2"}></i> IABS
                                        </button>
                                        {/*)}*/}
                                    </div>
                                    <h2 className="h4 g-font-weight-300">
                                        Manage your Name, ID and Email Addresses
                                    </h2>
                                    <p>
                                        Below are name, email addresse, contacts and more on file
                                        for your account.
                                    </p>
                                    <ul className="list-unstyled g-mb-30">
                                        {attributes.map((item, index) => {
                                            return (
                                                <li
                                                    key={index + 1}
                                                    className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15"
                                                >
                                                    <div className="g-pr-10">
                                                        <strong
                                                            className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
                                                            {get(item, "label")}
                                                        </strong>
                                                        <span className="align-top">
                              {get(item, "value")}
                            </span>
                                                    </div>
                                                    <span>
                            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1"/>
                          </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className={"text-sm-right"}>
                                        <button onClick={refreshServices}
                                                className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}>{t('Refresh')}</button>
                                    </div>
                                </>
                            ) : (
                                <ContentLoader/>
                            )}
                        </div>
                    {/*) : (*/}
                    {/*    <div className={"col-12 p-5 text-center"}>*/}
                    {/*        <h2 className="h4 g-font-weight-300">Not employee</h2>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </>
    );
};

export default withTranslation("HRMS")(IabsInfo);
