import React, {Component} from "react";
import {connect} from "react-redux";
import {get, isEmpty} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import Api from "../../../Api";
import ErrorNotify from "../../../../../components/Sweetalerts/ErrorNotify";
import AuthActions from "../../../../../services/auth/actions";
import {ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import RecruitmentScheme from "../../../../../schema/Recruitment";

class RecruitmentDetailContainer extends Component {
    state = {
        isFetchedIn: false,
        dynamicPage: 1
    };

    componentDidMount() {
        const {id, callToRender, callToRenderTrigger} = this.props;
        callToRenderTrigger();
        callToRender(id);
    }

    onDelete = (id) => {
        const {checkAuth, t, history} = this.props;
        Swal.fire({
            title: t("Do you want to delete this recruitment ?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("O'chirish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545"
        }).then((result) => {
            if (result.isConfirmed) {
                Api.recruitmentDelete(id)
                    .then((_res) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: t("Your structure has been deleted"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            history.push("/recruitment/list");
                            checkAuth();
                        }, 1000);
                    })
                    .catch((e) => {
                        ErrorNotify(e.response.data.message);
                    });
            }
        });
    };

    render() {
        let {drawToRender, entities, t, isFetched} = this.props;
        const result = Normalizer.Denormalize(
            drawToRender,
            RecruitmentScheme,
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
                            {id: 1, title: t("Recruitment"), url: "/recruitment/list"},
                            {id: 2, title: get(result, "employeesDTO.fullName"), url: ""}
                        ]}
                    />
                    <div>
                        {/*<Link*/}
                        {/*    to={`/recruitment/list`}*/}
                        {/*    className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"*/}
                        {/*>*/}
                        {/*    {t("Update Recruitment")}*/}
                        {/*</Link>*/}
                        <button
                            onClick={() => this.onDelete(get(result, "id"))}
                            className="btn btn-sm u-btn-danger rounded-0 g-py-10 g-px-20 ml-2"
                        >
                            {t("Delete Recruitment")}
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
                      {t("Employee")} : {get(result, "employeesDTO.fullName", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Staff")} : {get(result, "staffDTO.title", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Rate")} :{" "}
                        {get(result, "rate", "")}
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
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalizer.data.recruitment-one.result", null),
        isFetched: get(state, "normalizer.data.recruitment-one.isFetched", false),
        entities: get(state, "normalizer.entities", {})
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callToRender: (id) => {
            const storeName = "recruitment-one";
            const entityName = "recruitment";
            const scheme = RecruitmentScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `recruitment/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = "recruitment-one";
            const entityName = "recruitment";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        },
        checkAuth: () => {
            dispatch({
                type: AuthActions.CHECK_AUTH.REQUEST
            });
        }
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(RecruitmentDetailContainer))
);
