import React, {memo} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import SkillScheme from "../../../../../schema/SkillScheme";

const CreateContainer = ({t, column, vacancyAddRequest, ...props}) => {

    const create = (data) => {
        vacancyAddRequest({
            attributes: {...data},
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
            label: "Title",
            name: "title",
            type: "input",
            params: {required: true}
        },

    ];

    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Skill"), url: "/skill"},
                    {id: 3, title: t("Create"), url: ""}
                ]}
            />
            <Form
                formRequest={create}
                values={values}
                cancelLink={"/skill"}
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
        vacancyAddRequest: ({
                                attributes,
                                url = 'skill',
                                formMethods = {},
                                scheme = SkillScheme,
                                storeName = 'skill',
                                entityName = 'skill',
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