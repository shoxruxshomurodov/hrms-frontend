import React, {useEffect} from "react";
import {connect} from "react-redux";
import {get, isEmpty} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import Api from "../../../Api";
import ErrorNotify from "../../../../../components/Sweetalerts/ErrorNotify";
import {ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import SkillScheme from "../../../../../schema/SkillScheme";
import BlacklistEmployeeScheme from "../../../../../schema/BlacklistEmployeeScheme";
import TemplateDocumentAssignScheme from "../../../../../schema/TemplateDocumentAssignScheme";

const ViewContainer = ({
                           t,
                           id,
                           callToRender,
                           callToRenderTrigger,
                           drawToRender,
                           entities,
                           isFetched,
                           history,
                           ...props
                       }) => {

    useEffect(() => {
        callToRenderTrigger();
        callToRender(id);
    }, [])

    const onDelete = (id) => {
        Swal.fire({
            title: t("Do you want to delete this template?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("O'chirish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545"
        }).then((result) => {
            if (result.isConfirmed) {
                Api.templetDocumentAssignDelete(id)
                    .then((_res) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: t("Your template  has been deleted"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            history.push("/template-document-assign");
                        }, 1000);
                    })
                    .catch((e) => {
                        ErrorNotify(e.response.data.message);
                    });
            }
        });
    };


    const result = Normalizer.Denormalize(
        drawToRender,
        TemplateDocumentAssignScheme,
        entities
    );


    if (!isFetched) {
        return <Loader/>;
    }

    return (
        <>
            <div className="flex-display-more">
                <Breadcrumb
                    titles={[
                        {id: 1, title: t("Template document assign"), url: "/template-document-assign"},
                        {id: 2, title: get(result, "title"), url: ""}
                    ]}
                />
                <div>
                    <Link
                        to={`/blacklist-employee/update/${get(result, "id", null)}`}
                        className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                    >
                        {t("Update")}
                    </Link>
                    <button
                        onClick={() => onDelete(get(result, "id", null))}
                        className="btn btn-sm u-btn-danger rounded-0 g-py-10 g-px-20 ml-2"
                    >
                        {t("Delete")}
                    </button>
                </div>
            </div>
            {!isEmpty(result) ? (
                <div className="row">
                    <div className="col-md-6">
                        <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                            <div className="g-mb-15">
                                <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("ID")} : {get(result, "id", "")}
                    </span>
                                </h5>
                            </div>
                            <div className="g-mb-15">
                                <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Document type")} : {get(result, "documentType", "")}
                    </span>
                                </h5>
                            </div>
                            <div className="g-mb-15">
                                <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("businessProcessId")} : {get(result, "businessProcessId", "")}
                    </span>
                                </h5>
                            </div>
                            <div className="g-mb-15">
                                <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("templateDocumentId")} : {get(result, "templateDocumentId", "")}
                    </span>
                                </h5>
                            </div>
                            <div className="g-mb-15">
                                <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("notice")} : {get(result, "notice", "")}
                    </span>
                                </h5>
                            </div>
                            <div className="g-mb-15">
                                <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Expression")} : {get(result, "expr", "")}
                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
            <ToastContainer/>
            {!isFetched && <Loader/>}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalizer.data.template-document-assign-one.result", null),
        isFetched: get(state, "normalizer.data.template-document-assign-one.isFetched", false),
        entities: get(state, "normalizer.entities", {})
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        callToRender: (id) => {
            const storeName = "template-document-assign-one";
            const entityName = "blacklistEmployee";
            const scheme = TemplateDocumentAssignScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `template-document-assign/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = "template-document-assign-one";
            const entityName = "templateDocumentAssign";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        },
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewContainer))
);
