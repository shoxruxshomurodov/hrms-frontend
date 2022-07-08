import React, {useState} from "react";
import {get, isNil, isArray} from "lodash";
import {withTranslation} from "react-i18next";
import TableBase from "../../../../../../../components/Table/TableBase";
import Actions from "../../../../../Actions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import ContentLoader from "../../../../../../../components/Loader/ContentLoader";

const EducationInfo = (props) => {
    const {education = [], user, t} = props;
    const [isFetched, setIsFetched] = useState(false);
    const dispatch = useDispatch();

    function refreshServices() {
        setIsFetched(true);
        const attributes = {
            employeeId: get(user, "id"),
            service: "QUALIFICATION",
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
                        toast.error("Ошибка", {
                            position: "top-right",
                            autoClose: 1000,
                        });
                    },
                },
            },
        });
    }

    return (
        <div>
            {!isFetched ? (
                <>
                    <h2 className="h4 g-font-weight-300">
                        Manage your Name, ID and Email Addresses
                    </h2>
                    <p>
                        Below are name, email addresse, contacts and more on file for your
                        account.
                    </p>
                    {!isNil(education) ? (
                        <>
                            <TableBase
                                head={[
                                    "ID",
                                    "University",
                                    "Faculty",
                                    "Diploma number and seria",
                                    "Years of study",
                                ]}
                            >
                                {isArray(education) &&
                                    education.map((edu) => {
                                        return (
                                            <tr
                                                key={edu.id}
                                                style={{verticalAlign: "middle"}}
                                                className="mode-dark"
                                            >
                                                <td>{get(edu, "id", "")}</td>
                                                <td>{get(edu, "educationalInstitution.title", "")}</td>
                                                <td>{get(edu, "faculty.title", "")}</td>
                                                <td>{`${get(edu, "diplomaSerial", "")}${get(
                                                    edu,
                                                    "diplomaNumber",
                                                    ""
                                                )}`}</td>
                                                <td>{get(edu, "educationStartedDate", "")} - {!isNil(get(edu, "diplomaGivenDate", ""))
                                                    ? get(edu, "diplomaGivenDate", "")
                                                    : t("Incomplete")}</td>
                                            </tr>
                                        );
                                    })}
                            </TableBase>
                        </>
                    ) : (
                        <p className={"text-center"}>No Data</p>
                    )}
                    <div className={"text-sm-right"}>
                        <button
                            onClick={refreshServices}
                            className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 "}
                        >
                            {t("Refresh")}
                        </button>
                    </div>
                </>
            ) : <ContentLoader/>}
        </div>

    );
};

export default withTranslation("HRMS")(EducationInfo);
