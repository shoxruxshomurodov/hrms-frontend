import React, {memo} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import TemplateDocumentAssignScheme from "../../../../../schema/TemplateDocumentAssignScheme";

const CreateContainer = ({
                             t,
                             column,
                             templateDocumentAssignAddRequest,
                             ...props
                         }) => {


    const create = (data) => {


        templateDocumentAssignAddRequest({
            attributes: data,
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


    const values = [
        {
            id: 1,
            label: t("Document type"),
            name: "documentType",
            type: "input",
            params: {required: true}
        },
        {
            id: 2,
            label: t("Business process"),
            name: "businessProcessId",
            type: "select-pagination",
            url: "business-process",
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
        },
        {
            id: 3,
            label: t("Template document"),
            name: "templateDocumentId",
            type: "select-pagination",
            url: "template-document",
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
        },
        {
            id: 4,
            label: t("Notice"),
            name: "documentType",
            type: "textarea",
        },
        {
            id: 5,
            label: t("Expression"),
            name: "expr",
            type: "textarea",
        },
    ];


    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Template document assign"), url: "/template-document-assign"},
                    {id: 3, title: t("Create"), url: ""}
                ]}
            />
            <Form
                formRequest={create}
                values={values}
                cancelLink={"/template-document-assign"}
                buttonText={t("Create")}
                CustomButton={CustomButton}
                isFetched={true}
                params={{required: false}}
                property={{disabled: false}}
                column={column ?? [2, 6]}
            />
        </>
    );
};

const makeMapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {

    return {
        templateDocumentAssignAddRequest: ({
                                        attributes,
                                        url = 'template-document-assign',
                                        formMethods = {},
                                        scheme = TemplateDocumentAssignScheme,
                                        storeName = 'template-document-assign',
                                        entityName = 'templateDocumentAssign',
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