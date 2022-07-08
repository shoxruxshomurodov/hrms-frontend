import React, {memo} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import VacationGraphic from "../../../../../schema/VacationGraphic";
import {split,head,last} from "lodash";

const CreateContainer = ({
                             t,
                             column,
                             vacationGraphicAddRequest,
                             ...props
                         }) => {


    const create = (data) => {
         const {date,...rest} = data;

        vacationGraphicAddRequest({
            attributes: {...rest,month:last(split(date,"-")),year:head(split(date,"-"))},
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
            label: t("Date"),
            name: "date",
            type: "datepicker",
            dateType:"month",
            params: {required: true}
        }
    ];


    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Vacation graphic"), url: "/VacationGraphic"},
                    {id: 3, title: t("Create"), url: ""}
                ]}
            />
            <Form
                formRequest={create}
                values={values}
                cancelLink={"/VacationGraphic"}
                buttonText={"Create"}
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
        vacationGraphicAddRequest: ({
                                        attributes,
                                        url = 'vacation-graphic',
                                        formMethods = {},
                                        scheme = VacationGraphic,
                                        storeName = 'vacation-graphic',
                                        entityName = 'vacationGraphic',
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