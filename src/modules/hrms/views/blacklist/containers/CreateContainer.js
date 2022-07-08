import React, {memo} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import BlacklistEmployeeScheme from "../../../../../schema/BlacklistEmployeeScheme";

const CreateContainer = ({
                             t,
                             column,
                             addEmployeeToBlacklistRequest,
                             ...props
                         }) => {


    const create = (data) => {
        addEmployeeToBlacklistRequest({
            attributes:data,
            formMethods: {},
            cb: {
                success: (nData, data) => {

                    toast.dismiss();
                    toast.success("Успешно", {
                        position: "top-right",
                        autoClose: 1000
                    });
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                },
            }
        })
    };


    const employeeValues = [
        {
            id: 13,
            label: t("Employee"),
            name: "empId",
            type: "select-pagination",
            url: "employees/all",
            asyncSelectProperty: ["id", "fullName"],
            params: {required: true},
        },
        {
            id: 1,
            label: t("Expire date"),
            name: "expiredAt",
            type: "datepicker",
            params: {required: true}
        },
    ];

    const userValues = [
        {
            id: 13,
            label: t("User"),
            name: "empId",
            type: "select-pagination",
            url: "employees/all",
            asyncSelectProperty: ["id", "fullName"],
            params: {required: true},
        },
        {
            id: 1,
            label: t("Expire date"),
            name: "expiredAt",
            type: "datepicker",
            params: {required: true}
        },
    ];


    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Blacklist"), url: "/blacklist-employee"},
                    {id: 3, title: t("Create"), url: ""}
                ]}
            />
            <Form
                formRequest={create}
                values={employeeValues}
                cancelLink={"/blacklist-employee"}
                buttonText={t("Add  blacklist")}
                CustomButton={CustomButton}
                isFetched={true}
                params={{required: false}}
                property={{disabled: false}}
                column={column ?? [2, 6]}
            />

            {/*<Form*/}
            {/*    formRequest={create}*/}
            {/*    values={userValues}*/}
            {/*    cancelLink={"/blacklist-employee"}*/}
            {/*    buttonText={t("Add  blacklist")}*/}
            {/*    CustomButton={CustomButton}*/}
            {/*    isFetched={true}*/}
            {/*    params={{required: false}}*/}
            {/*    property={{disabled: false}}*/}
            {/*    column={column ?? [2, 6]}*/}
            {/*/>*/}
        </>
    );
};

const makeMapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {

    return {
        addEmployeeToBlacklistRequest: ({
                                        attributes,
                                        url = 'blacklist-employee/create-for-employee',
                                        formMethods = {},
                                        scheme = BlacklistEmployeeScheme,
                                        storeName = 'blacklist-employee',
                                        entityName = 'blacklistEmployee',
                                        cb = {}
                                    }) => {
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    url,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
        addUserToBlacklistRequest: ({
                                            attributes,
                                            url = 'blacklist-employee/create-for-employee',
                                            formMethods = {},
                                            scheme = BlacklistEmployeeScheme,
                                            storeName = 'blacklist-user',
                                            entityName = 'blacklistEmployee',
                                            cb = {}
                                        }) => {
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    url,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
    }
}


export default withTranslation("HRMS")(connect(makeMapStateToProps, mapDispatchToProps)(memo(CreateContainer)));