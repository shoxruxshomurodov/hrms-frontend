import React, {memo, useEffect} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import {get} from "lodash";
import SkillScheme from "../../../../../schema/SkillScheme";
import Normalizer from "../../../../../services/normalizer";
import Loader from "../../../../../components/Loader";

const UpdateContainer = ({
                             t,
                             id,
                             column,
                             skillUpdateRequest,
                             getSkillRequest,
                             entities,
                             skill,
                             ...rest
                         }) => {

    useEffect(() => {
        getSkillRequest(id);
    }, [id])

    skill = Normalizer.Denormalize(skill, {result: SkillScheme}, entities);


    const update = (data) => {
        skillUpdateRequest({
            id,
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
            defaultValue: get(skill, 'result.title'),
            params: {required: true}
        },

    ];

    if (!get(skill, 'isFetched', false)) {
        return <Loader/>;
    }

    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Skill"), url: "/skill"},
                    {id: 3, title: t("Update"), url: ""}
                ]}
            />
            <Form
                formRequest={update}
                values={values}
                cancelLink={"/skill"}
                buttonText={"Save"}
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
    return {
        entities: get(state, 'normalizer.entities', {}),
        skill: get(state, 'normalizer.data.skill', {})
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        skillUpdateRequest: ({
                                 id,
                                 attributes,
                                 url = 'skill',
                                 formMethods = {},
                                 scheme = SkillScheme,
                                 storeName = 'skill',
                                 entityName = 'skill',
                                 cb
                             }) => {
            dispatch({
                type: ApiActions.OPERATION_UPDATE.REQUEST,
                payload: {
                    attributes,
                    url: `${url}/${id}`,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
        getSkillRequest: (id) => {
            const storeName = "skill";
            const entityName = "skill";
            const scheme = SkillScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `skill/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        }
    }
}


export default withTranslation("HRMS")(connect(makeMapStateToProps, mapDispatchToProps)(memo(UpdateContainer)));