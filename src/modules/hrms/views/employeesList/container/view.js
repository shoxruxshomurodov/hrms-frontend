import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {get, isEmpty, isNil} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import EmployeesScheme from "../../../../../schema/Employees";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import {withRouter} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import VerticalTab from "../../../../../components/Tabs/Vertical";
import EducationInfo from "../container/EducationInfo";
import RelationInfo from "../container/RelationInfo";
import Actions from "../../../Actions";
import Swal from "sweetalert2";
import PassportInfo from "./PassportInfo";
import HistoryPositionInfo from "./HistoryPositionInfo";
import TaxInfo from "./TaxInfo";
import EmployeesProfileImageScheme from "../../../../../schema/EmployeesProfileImage";
import ProfileInfo from "./ProfileInfo";
import VaccineCertificate from "./VaccineCertificate";
import ConvictionInfo from "./ConvictionInfo";
import PsychoInfo from "./PsychoInfo";
import NarcoInfo from "./NarcoInfo";
import IabsInfo from "./IabsInfo";
import CvInfo from "./CvInfo";
import TreeNodeComponent from "../../../../../components/TreeNode";
import WorkReference from "./WorkReference";
import EmployeeFiles from "./EmployeeFiles";

const View = ({
                  t,
                  callToDelete,
                  id,
                  callToRender,
                  callToRenderTrigger,
                  getEmployeesProfileImage,
                  reloadEmployeeProfileImgRequest,
                  drawToRender,
                  entities,
                  isFetched,
                  employeeProfileImageResult,
                  isFetchedEmployeeProfileImage,
                  reloadInfoFromIabsRequest,
                  getDepartmentStaffingList,
                  departmentStaffingList,
                  hasAction = false,
              }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        callToRenderTrigger();
        callToRender(id);
        getEmployeesProfileImage(id);
    }, []);

    const reloadPhoto = () => {
        setLoading(true);
        reloadEmployeeProfileImgRequest({
            id,
            cb: {
                success: () => {
                    setLoading(false);
                    getEmployeesProfileImage(id);
                },
                fail: ({message = "ERROR"}) => {
                    toast.error(message);
                    setLoading(false);
                },
            },
        });
    };

    const reloadInfoFromIabs = () => {
        setLoading(true);
        reloadInfoFromIabsRequest({
            id,
            cb: {
                success: ({message = "SUCCESS"}) => {
                    setLoading(false);
                    callToRender(id);
                    toast.success(message);
                },
                fail: ({message = "ERROR"}) => {
                    toast.error(message);
                    setLoading(false);
                },
            },
        });
    };

    const onDelete = (id) => {
        Swal.fire({
            title: t("Do you want to delete this employee ?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("O'chirish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545",
        }).then((result) => {
            if (result.isConfirmed) {
                callToDelete(id);
            }
        });
    };

    const result = Normalizer.Denormalize(
        drawToRender,
        EmployeesScheme,
        entities
    );

    useEffect(() => {
        if (get(result, "structure.id")) {
            getDepartmentStaffingList({id: get(result, "structure.id")});
        }
    }, [get(result, "structure.id")]);
    const employeeProfileImage = Normalizer.Denormalize(
        employeeProfileImageResult,
        EmployeesProfileImageScheme,
        entities
    );

    if (!isFetched || loading) {
        return <Loader/>;
    }


    return (
        <>
            <div className="container">
                <div className="flex-display-more mb-3 ">
                    {!hasAction && <Breadcrumb
                        titles={[
                            {id: 1, title: t("Справочник"), url: "/employees"},
                            {id: 2, title: t("Employee List"), url: "/employees"},
                            {id: 3, title: t("View"), url: "/employees"},
                            {id: 4, title: get(result, "name"), url: "#"},
                        ]}
                    />}
                    <div>
                        {!hasAction &&  <button
                            onClick={reloadInfoFromIabs}
                            className="btn btn-sm u-btn-outline-cyan rounded-0 g-py-10 g-px-20 ml-2"
                        >
                            <i className={"hs-admin-reload mr-2"}></i> IABS
                        </button>}
                    </div>
                </div>
                {!isEmpty(result) ? (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="media-body g-brd-around  g-pa-0">
                                <VerticalTab
                                    user={result}
                                    reloadPhoto={reloadPhoto}
                                    gender={get(result, "employeesPassport.gender")}
                                    avatar={
                                        isFetchedEmployeeProfileImage
                                            ? `data:image/jpeg;base64,${get(
                                                employeeProfileImage,
                                                "url"
                                            )}`
                                            : ""
                                    }
                                    titles={[
                                        {title: t("Profile"), icon: "icon-cursor"},
                                        {
                                            title: t("Info"),
                                            icon: "icon-home",
                                        },
                                        {title: t("Position Info"), icon: "icon-briefcase"},
                                        {
                                            title: t("Tax Info"),
                                            icon: "icon-cursor",
                                        },
                                        {title: t("Education Info"), icon: "icon-notebook"},
                                        {
                                            title: t("Relation Info"),
                                            icon: "icon-user",
                                        },
                                        {
                                            title: t("Vaccine certificate"),
                                            icon: "hs-admin-receipt",
                                        },
                                        {
                                            title: t("Conviction info"),
                                            icon: "hs-admin-receipt",
                                        },
                                        {
                                            title: t("Psycho info"),
                                            icon: "hs-admin-user",
                                        },
                                        {
                                            title: t("Narcology info"),
                                            icon: "hs-admin-receipt",
                                        },
                                        {
                                            title: t("IABS info"),
                                            icon: "hs-admin-user",
                                        },
                                        {
                                            title: t("CV"),
                                            icon: "hs-admin-receipt",
                                        },
                                        {
                                            title: t("Work reference"),
                                            icon: "hs-admin-receipt",
                                        },
                                         {
                                            title: t("File upload"),
                                            icon: "hs-admin-receipt",
                                        }
                                    ]}
                                    texts={[
                                        <ProfileInfo
                                            gender={get(result, "employeesPassport.gender")}
                                            t={t}
                                            avatar={
                                                isFetchedEmployeeProfileImage
                                                    ? `data:image/jpeg;base64,${get(
                                                        employeeProfileImage,
                                                        "url"
                                                    )}`
                                                    : ""
                                            }
                                            user={result}
                                        />,
                                        <PassportInfo hasAction={hasAction} user={result}/>,
                                        <HistoryPositionInfo hasAction={hasAction} user={result}/>,
                                        <TaxInfo hasAction={hasAction} user={result}/>,
                                        <EducationInfo
                                            hasAction={hasAction}
                                            user={result}
                                            education={get(result, "employeesQualifications", [])}
                                        />,
                                        <RelationInfo
                                            hasAction={hasAction}
                                            id={get(result, "id", null)}
                                            relatives={get(result, "employeesRelatives")}
                                        />,
                                        <VaccineCertificate
                                            hasAction={hasAction}
                                            user={result}
                                            callToRender={callToRender}
                                        />,
                                        <ConvictionInfo
                                            hasAction={hasAction}
                                            user={result}/>,
                                        <PsychoInfo
                                            hasAction={hasAction}
                                            user={result}/>,
                                        <NarcoInfo  hasAction={hasAction} user={result}/>,
                                        <IabsInfo hasAction={hasAction} user={result}/>,
                                        <CvInfo hasAction={hasAction} user={result}/>,
                                        <WorkReference hasAction={hasAction} user={result}/>,
                                        <EmployeeFiles hasAction={hasAction}  user={result}/>,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader/>
                )}
                <ToastContainer/>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {!hasAction && <TreeNodeComponent data={departmentStaffingList}/>}
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalizer.data.employees.result", []),
        isFetched: get(state, "normalizer.data.employees.isFetched", false),
        entities: get(state, "normalizer.entities", []),
        employeeProfileImageResult: get(
            state,
            "normalizer.data.employeesProfileImage.result",
            []
        ),
        isFetchedEmployeeProfileImage: get(
            state,
            "normalizer.data.employeesProfileImage.isFetched",
            []
        ),
        departmentStaffingList: get(
            state,
            "apiReducer.data.department-staffing-list.result",
            []
        ),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callToRender: (id) => {
            const storeName = "employees";
            const entityName = "employees";
            const scheme = EmployeesScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `employees/${id}`,
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        reloadEmployeeProfileImgRequest: ({id, cb}) =>
            dispatch({
                type: Actions.RELOAD_EMPLOYEE_PROFILE_PHOTO.REQUEST,
                payload: {id, cb},
            }),
        getEmployeesProfileImage: (id) => {
            const storeName = "employeesProfileImage";
            const entityName = "employeesProfileImage";
            const scheme = EmployeesProfileImageScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `employees/passport-photo/${id}`,
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        callToRenderTrigger: () => {
            const storeName = "employees";
            const entityName = "employees";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName,
                },
            });
        },
        callToDelete: (attributes) => {
            dispatch({
                type: Actions.EMPLOYEE_DELETE.REQUEST,
                payload: {
                    attributes,
                    cb: {
                        success: (nData, data) => {
                            toast.dismiss();
                            toast.success("Успешно", {
                                position: "top-right",
                                autoClose: 1000,
                            });
                            setTimeout(() => {
                                window.history.back();
                            }, 1000);
                        },
                        fail: (e) => {
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000,
                            });
                        },
                    },
                },
            });
        },
        reloadInfoFromIabsRequest: ({id, cb}) => {
            dispatch({
                type: Actions.RELOAD_EMPLOYEE_INFO_FROM_IABS.REQUEST,
                payload: {
                    id,
                    cb,
                },
            });
        },
        getDepartmentStaffingList: ({id}) => {
            const storeName = "department-staffing-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `report/staff-tree-department2?structureId=${id}`,
                    storeName,
                    config: {},
                },
            });
        },
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(View))
);
