import React, {useState} from "react";
import {get, isNil, isEqual, find} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Actions from "../../../../hrms/Actions";
import {toast} from "react-toastify";
import ContentLoader from "../../../../../components/Loader/ContentLoader";
import PDFViewer from "../../../../../components/PdfViewer";

const WorkReference = ({
                           t,
                           user,
                           syncEmployeeWorkReference,
                           callToRender = () => {
                           },
                           hasAction = false,
                           ...rest
                       }) => {
    const [isFetched, setIsFetched] = useState(false);

    const refreshServices = () => {
        setIsFetched(true);
        syncEmployeeWorkReference({
            id: get(user, "id"),
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
                fail: ({message = "ERROR"}) => {
                    setIsFetched(false);
                    toast.dismiss();
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                },
            },
        });
    };

    return (
        <>
            {!isFetched ? (
                <div>
                    {get(user, "employeeReference.workReference.files", []).map(
                        (pdf, index) =>
                            isEqual(get(pdf, "extension"), "pdf") && (
                                <PDFViewer key={index + 1} pdf={get(pdf, "url")}/>
                            )
                    )}

                    {!hasAction && <div className={"text-sm-right g-mt-30"}>
                        <button
                            onClick={refreshServices}
                            className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}
                        >
                            {t("Refresh")}
                        </button>
                        {!isNil(
                            find(get(user, "employeeReference.workReference.files", []), (pdf) =>
                                isEqual(get(pdf, "extension"), "docx")
                            )
                        ) && (
                            <a
                                href={get(
                                    find(get(user, "employeeReference.workReference.files", []), (pdf) =>
                                        isEqual(get(pdf, "extension"), "docx")
                                    ),
                                    "url"
                                )}
                                className={
                                    "btn u-btn-primary rounded-0 g-py-12 g-px-25 text-white"
                                }
                                download
                                target={"_blank"}
                            >
                                Print to WORD
                            </a>
                        )}
                    </div>}
                </div>
            ) : (
                <ContentLoader/>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        syncEmployeeWorkReference: ({id, cb}) =>
            dispatch({
                type: Actions.ASYNC_WORK_REFERENCE.REQUEST,
                payload: {id, cb},
            }),
    };
};

export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(WorkReference)
);
