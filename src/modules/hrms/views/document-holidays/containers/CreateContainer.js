import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {get, isEmpty} from "lodash";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Loader from "../../../../../components/Loader";
import Actions from "../../../Actions";
import BusinessProcess from "../../../../../schema/BusinessProcess";
import FormFieldScheme from "../../../../../schema/FormFieldScheme";
import Utils from "../../../../../services/helpers/Utils";
import Select from "react-select";

const DocumentCreateContainer = ({
                                     t,
                                     entities,
                                     getProcessList,
                                     processes,
                                     processesIsFetched,
                                     createDocumentRequest,
                                     isFetchedDocument,
                                     formsWithFields,
                                     ...props
                                 }) => {
    const [formsFieldsInputs, setFormsFieldsInputs] = useState([]);
    const [processName, setProcessName] = useState("")
    useEffect(() => {
        getProcessList();
    }, []);

    useEffect(() => {
        let arrForms = [];
        if (get(formsWithFields, 'result')?.length > 0) {
            get(formsWithFields, 'result', []).map((form, index) => {
                let fieldsInputs = Utils.toFormFieldsToFormInputsArray(form);
                arrForms.push(<Form key={index}
                                    formRequest={(values) => {
                                        createDocumentRequest({bpmnProcessName: processName, formData: values})
                                    }}
                                    values={fieldsInputs}
                                    CustomButton={CustomButton}
                                    cancelLink={"/document-holidays"}
                                    buttonText={t("Send")}
                                    params={{required: true}}
                                    property={{disabled: false}}
                />);
            });
        }


        setFormsFieldsInputs(arrForms);

    }, [formsWithFields]);


    if (!processesIsFetched) {
        return <Loader/>;
    }

    const processDenorm = Normalizer.Denormalize(processes, {content: [BusinessProcess]}, entities);
    const processDenormData = get(processDenorm, "content", []);
    processes = processDenormData.map(({queryId, title}) => ({
        value: queryId,
        label: title
    }));
    const onchange = (event) => {
        const {getProcessFormFields} = props;
        getProcessFormFields(get(event, "value"))
        setProcessName(get(event, "value"))
    };
    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Document holidays"), url: "/document-holidays"},
                    {id: 2, title: t("Create"), url: ""}
                ]}
            />
            <div className={'mt-5'}>
                <h2 className="g-font-weight-300 g-font-size-20 g-color-black g-mb-10 g-mt-10">{t("Select process")}</h2>
                <Select
                    onChange={(event) => {
                        onchange(event);
                    }}
                    isClearable={true}
                    clearValue={""}
                    options={processes}
                    className="form-control form-control-sm rounded-0"
                    menuPlacement={"bottom"}
                    placeholder={t("Choose...")}
                    isSearchable={false}
                />
            </div>
            {
                (isEmpty(formsFieldsInputs) && !isEmpty(processName)) && <Form
                    formRequest={(values={}) => {
                        createDocumentRequest({bpmnProcessName: processName, formData: values})
                    }}
                    values={[]}
                    CustomButton={CustomButton}
                    cancelLink={"/document-holidays"}
                    buttonText={t("Send")}
                    params={{required: true}}
                    property={{disabled: false}}
                />
            }
            {!isFetchedDocument ? <Loader/> : formsFieldsInputs}
            <ToastContainer/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        processes: get(state, 'normalizer.data.business-process-process-list.result', []),
        processesIsFetched: get(state, 'normalizer.data.business-process-process-list.isFetched', false),
        isFetchedDocument: get(state, 'normalizer.data.process-get-form-fields.isFetched', true),
        formsWithFields: get(state, 'normalizer.data.process-get-form-fields', {}),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProcessList: () => {
            const storeName = "business-process-process-list";
            const entityName = "business-process";
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "/business-process",
                    config: {
                        params: {
                            entity: 'DocumentHolidays',
                            isCanStart: true
                        }
                    },
                    scheme: {content: [BusinessProcess]},
                    storeName: storeName,
                    entityName: entityName
                }
            });
        },
        createDocumentRequest: ({bpmnProcessName, formData}) => dispatch({
            type: Actions.CREATE_AND_START_NEW_PROCESS.REQUEST,
            payload: {
                attributes: {bpmnProcessName, formData},
                url:"document-holidays/create/start-new-process",
                cb: {
                    success: (nData, data) => {
                        toast.dismiss();
                        toast.success('Успешно', {
                            position: "top-right",
                            autoClose: 1000,
                        })
                        setTimeout(() => {
                            window.history.back()
                        }, 1500)
                    },
                    fail: (e) => {
                        toast.dismiss();
                        toast.error("Ошибка", {
                            position: "top-right",
                            autoClose: 1000,
                        })
                    },
                }
            }
        }),
        getProcessFormFields: (process_name) => {
            const storeName = "process-get-form-fields";
            const entityName = "form-field";
            const scheme = [{FormFieldScheme}];
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `process/get-form-fields/start/event/${process_name}`,
                    scheme,
                    storeName,
                    entityName,
                    baseUrl: 'bpmn',
                }
            });
        },
    }
}
export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(DocumentCreateContainer));
