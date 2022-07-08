import React, {useEffect, useState} from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {connect} from 'react-redux';
import ApiActions from "../../../../../services/api/Actions";
import {get} from "lodash";
import Normalizer from "../../../../../services/normalizer";
import helper from "../../../../../containers/Form/helper";
import EmployeesScheme from "../../../../../schema/Employees";
import StaffScheme from "../../../../../schema/Staff";
import Actions from "../../../Actions";

const RecruitmentCreateContainer = ({t, getEmployeeList, getStaffList, entities, employees, staff,createRecruitment, ...props}) => {
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        getEmployeeList();
        getStaffList();
    }, []);

    employees = Normalizer.Denormalize(employees, [EmployeesScheme], entities);
    staff = Normalizer.Denormalize(staff, [StaffScheme], entities);


    const optionsEmployees = helper.renderProperty(employees, [
        "id",
        "fullName"
    ]);

    const optionsStaff = helper.renderProperty(staff, [
        "id",
        "title"
    ]);

    const create = (attributes) => {
        setIsFetched("Create");
        createRecruitment({attributes,setIsFetched})
    };
    const values = [
        {
            id: 1,
            name: "employeesId",
            type: "select",
            options: optionsEmployees,
            label: "Employee",
            params: {required: true}
        },
        {id: 2, name: "staffId", type: "select", options: optionsStaff, label: "Staff", params: {required: true}},
        {id: 3, name: "rate", type: "input", label: "Rate", params: {required: true}},
    ];
    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Recruitment List"), url: "/staff"},
                    {id: 3, title: t("Create"), url: "recruitment/list"}
                ]}
            />
            <CreateForm
                formRequest={create}
                values={values}
                CustomButton={CustomButton}
                cancelLink={"/recruitment/list"}
                buttonText={"Create"}
                isFetched={isFetched}
                params={{required: false}}
                property={{disabled: false}}
            />
            <ToastContainer/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        employees: get(state, 'normalizer.data.get-employees-list.result.content', []),
        staff: get(state, 'normalizer.data.get-staff-list.result.content', []),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployeeList: () => {
            const storeName = "get-employees-list";
            const entityName = "employee-list";
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "employees/all",
                    config: {
                        params: {
                            isDeleted: false
                        }
                    },
                    scheme: {content: [EmployeesScheme]},
                    storeName: storeName,
                    entityName: entityName
                }
            });
        },
        getStaffList: () => {
            const storeName = "get-staff-list";
            const entityName = "staff";
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "staff",
                    config: {
                        params: {}
                    },
                    scheme: {content: [StaffScheme]},
                    storeName: storeName,
                    entityName: entityName
                }
            });
        },
        createRecruitment: ({attributes,setIsFetched,}) => {
            dispatch({
                type: Actions.CREATE_RECRUITMENT.REQUEST,
                payload: {
                    attributes,
                    cb: {
                        success: (nData, data) => {
                            setIsFetched(false)
                            toast.dismiss();
                            toast.success('Успешно', {
                                position: "top-right",
                                autoClose: 1000,
                            })
                            setTimeout(() => {
                                window.history.back()
                            }, 1000)
                        },
                        fail: (e) => {
                            setIsFetched(false)
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000,
                            })
                        },
                    },
                },
            });
        }
    }
}

export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(RecruitmentCreateContainer));
