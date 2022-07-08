import React, {useEffect, useState, memo} from "react";
import {connect} from "react-redux";
import {find, get, head, isEmpty, isEqual, isNil, trim, last, entries, orderBy, includes, split} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import {toast, ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import VacancyScheme from "../../../../../schema/VacancyScheme";
import UserTaskFormScheme from "../../../../../schema/UserTaskForm";
import {info, sign} from "../../../../../services/certWs";
import Utils from "../../../../../services/helpers/Utils";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/FormButton";
import Actions from "../../../Actions";
import BusinessProcess from "../../../../../schema/BusinessProcess";
import FormFieldScheme from "../../../../../schema/FormFieldScheme";
import PDFViewer from "../../../../../components/PdfViewer";
import Tabs from "../../../../../components/Tabs";
import StatusTimeline from "../components/StatusTimeline";
import EImzo from "../../../../../components/E-imzo";

const ViewContainer = ({
                           t,
                           id,
                           callToRender,
                           callToRenderTrigger,
                           drawToRender,
                           entities,
                           isFetched,
                           history,
                           getFormWithFields,
                           formsWithFields,
                           tasksUserFormSetValuesReturnResultAndComplete,
                           signDocumentRequest,
                           getProcessList,
                           processes,
                           getProcessFormFields,
                           processFormsWithFields,
                           startProcessRequest,
                           signDocumentWithEimzoRequest,
                           ...props
                       }) => {

    const [formsFieldsInputs, setFormsFieldsInputs] = useState([]);
    const [certInfo, setCertInfo] = useState({});
    const [hash, setHash] = useState('');
    const [processName, setProcessName] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState(null);

    useEffect(() => {
        info(onSuccessInfo);
        callToRenderTrigger();
        callToRender(id);
        getProcessList();
    }, [])


    useEffect(() => {
        const resultVacancy = Normalizer.Denormalize(
            drawToRender,
            VacancyScheme,
            entities
        );
        if (get(resultVacancy, 'bpmnBusinessKey') && get(resultVacancy, 'bpmnProcessName')) {
            getFormWithFields(get(resultVacancy, 'bpmnBusinessKey'), get(resultVacancy, 'bpmnProcessName'));
        }

    }, [drawToRender]);

    useEffect(() => {
        if (get(processFormsWithFields, 'result')?.length > 0) {
            let arrForms = [];
            get(processFormsWithFields, 'result', []).map((form, index) => {
                let fieldsInputs = Utils.toFormFieldsToFormInputsArray(form);
                arrForms.push(<Form key={index}
                                    formRequest={(values) => {
                                        startProcessRequest({id, bpmnProcessName: processName, formData: values})
                                    }}
                                    values={fieldsInputs}
                                    CustomButton={CustomButton}
                                    cancelLink={"/vacancy"}
                                    buttonText={t("Send")}
                                    params={{required: true}}
                                    property={{disabled: false}}
                                    colBtn={12}
                />);
            });
            setFormsFieldsInputs(arrForms);
        }


    }, [processFormsWithFields]);

    const processDenorm = Normalizer.Denormalize(processes, {content: [BusinessProcess]}, entities);
    const processDenormData = get(processDenorm, "content", []);

    processes = processDenormData.map(({processName, title}) => ({
        value: processName,
        label: title
    }));

    const result = Normalizer.Denormalize(
        drawToRender,
        VacancyScheme,
        entities
    );

    useEffect(() => {
        if (!isEmpty(certInfo)) {
            sign(sign('test', onSuccessHash))
        }
    }, [certInfo])

    useEffect(() => {
        if (get(formsWithFields, 'isFetched', false) && get(formsWithFields, 'result')?.length > 0 && id) {
            let arrForms = [];
            get(formsWithFields, 'result', []).map((form, index) => {
                let fieldsInputs = Utils.toFormFieldsToFormInputsArray(form);
                arrForms.push(<Form key={index}
                                    formRequest={(values) => {
                                        formRequest(
                                            get(form, "form.code"),
                                            get(head(get(formsWithFields, 'result')), 'tasksUser.id'),
                                            findFieldName(get(head(get(formsWithFields, 'result', [])), 'fields', []), 'BOOL'),
                                            values);
                                    }}
                                    values={fieldsInputs}
                                    CustomButton={CustomButton}
                                    cancelLink={null}
                                    buttonText={t("Send")}
                                    property={{disabled: false}}
                                    colBtn={8}
                                    sign={signDocument}
                                    eimzo={eimzo}
                                    hide={true}
                                    unSign={() => unSignDocument(get(form, "form.code"), get(head(get(formsWithFields, 'result')), 'tasksUser.id'), {})}
                />);
            });
            setFormsFieldsInputs(arrForms);
        }

    }, [formsWithFields, hash]);


    const findFieldName = (fields, type = 'BOOL') => {
        return get(find(fields, f => isEqual(get(f, 'fieldType'), type)), 'name', null);
    }

    const unSignDocument = (form_name, tasks_user_id, data) => {
        Swal.fire({
            title: t('Вы хотите отменить?'),
            icon: 'error',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#72c02c',
            confirmButtonText: t('Yes'),
            cancelButtonText: t('No'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                tasksUserFormSetValuesReturnResultAndComplete({
                    form_name, tasks_user_id, data, cb: {
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
                        fail: (e) => {
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000
                            });
                        }
                    }
                });
            }
        });
    }


    const onSuccessInfo = ({certinfo = {}}) => {
        setCertInfo(certinfo)
    }

    const onSuccessHash = (certinfo = {}, hash = '') => {
        if (hash) {
            setHash(hash);
        }
    }
    const eimzo = (name) => {
        setShow(true);
        setName(name);
    }



    const signDocument = (fieldName) => {
        Swal.fire({
            title: t('Вы хотите подписать?'),
            icon: 'warning',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#72c02c',
            confirmButtonText: t('Sign'),
            cancelButtonText: t('Cancel'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((res) => {
            if (res.isConfirmed) {
                if (!isEmpty(certInfo) && !isEmpty(hash)) {
                    setLoading(true);
                    signDocumentRequest({
                        attributes: {
                            documentId: id,
                            documentType: head(split(get(result, "bpmnBusinessKey", ""), "_")),
                            ...certInfo,
                            fieldName,
                            fieldType: 'CUSTOM_TYPE',

                            signature: hash,
                            instanceTokenId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenId', null),
                            instanceTokenStateId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenStateId', null)

                        }, cb: {
                            success: () => {
                                setLoading(false);
                                getFormWithFields(get(result, 'bpmnBusinessKey'), get(result, 'bpmnProcessName'));
                            },
                            fail: () => {
                                setLoading(false);
                            }
                        }
                    })
                } else {
                    toast.warn(t("Please enter key!!!"))
                }
            }
        });
    };

    const detectSignedStatus = (fields, values) => {
        const field = find(fields, field => isEqual(get(field, 'fieldType'), 'CUSTOM_TYPE') && isEqual(get(field, 'type'), 'sign'))
        console.log(fields, values, field)
        if (get(values, `${get(field, 'code')}`) || isNil(field)) {
            return true;
        }
        return false;

    }

    const formRequest = (form_name, tasks_user_id, fieldName, data) => {

        if (includes(['true', 'false'], get(data, `${fieldName}`))) {
            data = {...data, [fieldName]: isEqual(fieldName, 'true') ? true : false}
        }

        const isSigned = detectSignedStatus(get(head(get(formsWithFields, 'result')), 'fields', []), get(head(get(formsWithFields, 'result')), 'values', {}))
        if (isSigned) {
        Swal.fire({
            title: t('Bы подтверждаете?'),
            icon: 'warning',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#72c02c',
            confirmButtonText: t('Send'),
            cancelButtonText: t('Cancel'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                tasksUserFormSetValuesReturnResultAndComplete({
                    form_name, tasks_user_id, data, cb: {
                        success: (nData, data) => {
                            toast.dismiss();
                            toast.success("Успешно", {
                                position: "top-right",
                                autoClose: 1000
                            });
                            setTimeout(() => {
                                history.push('/task')
                            }, 1000);
                        },
                        fail: (e) => {
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000
                            });
                        }
                    }
                });
            }
        });
        } else {
            Swal.fire({
                title: t('Необходимо подписать?'),
                icon: 'error',
                backdrop: 'rgba(0,0,0,0.9)',
                background: 'none',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    title: 'title-color',
                    content: 'text-color',
                    icon: 'icon-color',
                },
            })
        }


    };

    const eSign = (res) => {
        const {pkcs7_64 = null} = res;
        if (!isNil(pkcs7_64)) {
            setShow(false)
        }
        Swal.fire({
            title: t('Вы хотите подписать?'),
            icon: 'warning',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#72c02c',
            confirmButtonText: t('Sign'),
            cancelButtonText: t('Cancel'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((res) => {
            if (res.isConfirmed) {
                if (!isEmpty(pkcs7_64) && !isNil(name) && !isNil(head(split(get(result, "bpmnBusinessKey", ""), "_")))) {
                    setLoading(true);
                    signDocumentWithEimzoRequest({
                        attributes: {
                            documentId: id,
                            documentType: head(split(get(result, "bpmnBusinessKey", ""), "_")),
                            fieldName: name,
                            fieldType: 'CUSTOM_TYPE',
                            signature: pkcs7_64,
                            instanceTokenId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenId', null),
                            instanceTokenStateId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenStateId', null),
                            subject: "Sign hash token"

                        }, cb: {
                            success: () => {
                                setLoading(false);
                                getFormWithFields(get(result, 'bpmnBusinessKey'), get(result, 'bpmnProcessName'));
                            },
                            fail: (data) => {
                                toast.error('Server not working!!!')
                                setLoading(false);
                            }
                        }
                    })
                } else {
                    toast.warn(t("Please enter key!!!"))
                }
            }
        });
    };


    const onchange = (event) => {
        getProcessFormFields(get(event, "value"))
        setProcessName(get(event, "value"))
    };


    if (!isFetched) {
        return <Loader/>;
    }


    return (
        <>
            <div className="flex-display-more">
                <Breadcrumb
                    titles={[
                        {id: 1, title: t("CV"), url: "/cv"},
                        {id: 2, title: get(result, "candidate.username"), url: ""}
                    ]}
                />
            </div>
            {trim(get(result, 'notes', null)) && <div className="row">
                <div className="col-12">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        {get(result, 'notes', '')}
                    </div>
                </div>
            </div>}
            {show && <EImzo eSign={eSign} onClose={()=>setShow(false)}/>}
            <Tabs titles={[t("CV info"), t("Status history")]}
                  texts={[
                      <>{!isEmpty(result) ? (
                          <div className="row">
                              <div className="col-md-6">
                                  <div
                                      className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Candidate username")} : {get(result, "candidate.username", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Vacancy")} : {get(result, "vacancy.title", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Status")} :  <span
                        className={'btn u-btn-primary g-rounded-50 g-mr-10 g-mb-15'}>{
                        t(last(get(result, "currentState", [])))
                    }</span>
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Candidate  degree")} : {get(result, "education", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("University")} : {get(result, "educationalInstitution", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Faculty")} : {get(result, "faculty", "")}
                    </span>
                                          </h5>
                                      </div>

                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Specialization")} : {get(result, "specialization", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Year end")} : {get(result, "yearEnd", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("nativeLanguage")} : {get(result, "nativeLanguage", "")}
                    </span>
                                          </h5>
                                      </div>
                                      <div className="g-mb-15">
                                          <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("aboutMe")} : {get(result, "aboutMe", "")}
                    </span>
                                          </h5>
                                      </div>


                                  </div>


                                  <div className={'mt-5'}>
                                      <h2
                                          className="g-font-weight-300 g-font-size-20 g-color-black g-mb-10 g-mt-10">{get(head(get(formsWithFields, 'result')), 'tasksUser.title', '')}</h2>
                                      {formsFieldsInputs}
                                      {(isEmpty(formsFieldsInputs) && !isEmpty(processName)) &&
                                          <button
                                              onClick={() => startProcessRequest({
                                                  id,
                                                  bpmnProcessName: processName,
                                                  formData: {}
                                              })}

                                              type="submit"
                                              className="btn btn-md u-btn-primary rounded-0 g-width-170">{t("Send")}</button>}
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  {isEqual(get(result, 'file.extension'), 'pdf') &&
                                      <PDFViewer
                                          pdf={get(result, "file.url")}/>}
                                  {(isEqual(get(result, 'file.extension'), 'jpg') || isEqual(get(result, 'file.extension'), 'png')) &&
                                      <img src={get(result, "file.url")}
                                           alt=""
                                           className={'img-fluid'}/>}
                              </div>
                          </div>
                      ) : (
                          <Loader/>
                      )}
                      </>,
                      !isEmpty(result) && <StatusTimeline
                          currentStates={get(result, 'currentState', [])}
                          process={get(result, 'bpmnProcessName', null)}/>
                  ]}/>


            <ToastContainer/>
            {!isFetched && <Loader/>}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalizer.data.cv-one.result", null),
        isFetched: get(state, "normalizer.data.cv-one.isFetched", false),
        entities: get(state, "normalizer.entities", {}),
        formsWithFields: get(state, 'normalizer.data.get-vacancy-form-task', {}),
        processes: get(state, 'normalizer.data.business-process-process-list.result', []),
        processFormsWithFields: get(state, 'normalizer.data.process-get-form-fields', {}),

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        callToRender: (id) => {
            const storeName = "cv-one";
            const entityName = "CvRequest";
            const scheme = VacancyScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `cv-request/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = "cv-one";
            const entityName = "CvRequest";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        },
        getFormWithFields: (business_key, process_name) => {
            const storeName = "get-vacancy-form-task";
            const entityName = "userTaskForm";
            const scheme = [{UserTaskFormScheme}];
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `tasks-user/get/forms/with/fields/by/business_key/${business_key}/process/${process_name}`,
                    storeName,
                    scheme,
                    entityName,
                    baseUrl: 'bpmn'
                }
            });
        },
        getProcessList: (isCanStart = false) => {
            const storeName = "business-process-process-list";
            const entityName = "business-process";
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "/business-process",
                    config: {
                        params: {
                            entity: 'Vacancy',
                            isCanStart: true
                        }
                    },
                    scheme: {content: [BusinessProcess]},
                    storeName: storeName,
                    entityName: entityName
                }
            });
        },
        tasksUserFormSetValuesReturnResultAndComplete: ({form_name, tasks_user_id, data, cb}) => dispatch({
            type: Actions.TASKS_USER_FORM_SET_VALUES_AND_RETURN_VALUES_COMPLETE.REQUEST,
            payload: {form_name, tasks_user_id, data, cb}
        }),
        signDocumentRequest: ({attributes, cb}) => {
            dispatch({
                type: Actions.DOCUMENT_SIGN_PROCESS.REQUEST,
                payload: {attributes, cb}
            })
        },
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
        startProcessRequest: ({id, bpmnProcessName, formData}) => dispatch({
            type: Actions.VACANCY_PROCESS_START.REQUEST,
            payload: {
                id,
                attributes: {bpmnProcessName, formData},
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
        signDocumentWithEimzoRequest: ({attributes, cb}) => {
            dispatch({
                type: Actions.DOCUMENT_SIGN_WITH_EIMZO_PROCESS.REQUEST,
                payload: {attributes, cb}
            })
        },

    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(memo(ViewContainer)))
);
