import React, {useEffect, useState} from "react";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {connect,} from "react-redux";
import {useHistory} from "react-router-dom";
import {get, head, last, split, includes} from "lodash";
import Actions from "../../../Actions";
import ApiActions from "../../../../../services/api/Actions";
import UserTaskFormScheme from "../../../../../schema/UserTaskForm";
import Utils from "../../../../../services/helpers/Utils";
import Form from "../../../../../containers/Form/Form";
import Loader from "../../../../../components/Loader";

const TaskDetailContainer = ({
                                 id,
                                 t,
                                 getTaskForm,
                                 formsWithFields,
                                 tasksUserFormSetValuesReturnResultAndComplete,
                                 callToRenderTrigger,
                                 ...props
                             }) => {
    const [isFetched, setIsFetched] = useState(false);
    const [formsFieldsInputs, setFormsFieldsInputs] = useState([]);
    const history = useHistory();
    useEffect(() => {
        if (id) {
            getTaskForm(id);
        }
    }, [id]);

    useEffect(() => {
        let arrForms = [];
        if (get(formsWithFields, 'isFetched') && get(formsWithFields, 'result').length > 0 && id) {
            get(formsWithFields, 'result', []).map((form, index) => {
                let fieldsInputs = Utils.toFormFieldsToFormInputsArray(form);
                arrForms.push(<Form key={index}
                                    formRequest={(values) => {
                                        formRequest(get(form, "form.code"), id, values);
                                    }}
                                    values={fieldsInputs}
                                    CustomButton={CustomButton}
                                    cancelLink={null}
                                    buttonText={t("Send")}
                                    params={{required: true}}
                                    property={{disabled: false}}
                                    colBtn={8}
                />);
            });
        }

        setFormsFieldsInputs(arrForms);

    }, [formsWithFields]);

    useEffect(() => {
        callToRenderTrigger();
        if (get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey')) {
            if (includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'document') || includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'vacancy') || includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'CvRequest') || includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'VacationGraphic') ||  includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'DocumentDocOrders') || includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'DocumentDocRequests')  || includes(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), 'DocumentBranchCandidate')) {
                history.push(`/${head(split(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), "_", 2))}/view/${last(split(get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey'), "_", 2))}`)
            }

        }
    }, [get(head(get(formsWithFields, 'result')), 'tasksUser.businessKey')])


    const formRequest = (form_name, tasks_user_id, data) => {

        tasksUserFormSetValuesReturnResultAndComplete({
            form_name, tasks_user_id, data, cb: {
                success: (nData, data) => {
                    setIsFetched(false);
                    toast.dismiss();
                    toast.success("Успешно", {
                        position: "top-right",
                        autoClose: 1000
                    });
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                },
                fail: (e) => {
                    setIsFetched(false);
                    toast.dismiss();
                    toast.error("Ошибка", {
                        position: "top-right",
                        autoClose: 1000
                    });
                }
            }
        });
    };
    if (!get(formsWithFields, 'isFetched')) {
        return <Loader/>;
    }

    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Tasks"), url: "/task/list"},
                    {id: 3, title: t("Create"), url: ""}
                ]}
            />
            {formsFieldsInputs}
            <ToastContainer/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        formsWithFields: get(state, 'normalizer.data.user-task-form', {}),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTaskForm: (tasks_user_id) => {
            const storeName = "user-task-form";
            const entityName = "userTaskForm";
            const scheme = [{UserTaskFormScheme}];
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `/tasks-user/get/forms/with/fields/by/tasks-user/${tasks_user_id}`,
                    scheme,
                    storeName,
                    entityName,
                    baseUrl: 'bpmn'
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = "user-task-form";
            const entityName = "userTaskForm";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        },
        tasksUserFormSetValuesReturnResultAndComplete: ({form_name, tasks_user_id, data, cb}) => dispatch({
            type: Actions.TASKS_USER_FORM_SET_VALUES_AND_RETURN_VALUES_COMPLETE.REQUEST,
            payload: {form_name, tasks_user_id, data, cb}
        }),
    }
}

export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(TaskDetailContainer));
