import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {get, head, isEmpty, isNil, split, trim} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import Api from "../../../Api";
import ErrorNotify from "../../../../../components/Sweetalerts/ErrorNotify";
import {toast, ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import UserTaskFormScheme from "../../../../../schema/UserTaskForm";
import Utils from "../../../../../services/helpers/Utils";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/FormButton";
import Actions from "../../../Actions";
import BusinessProcess from "../../../../../schema/BusinessProcess";
import Select from "react-select";
import FormFieldScheme from "../../../../../schema/FormFieldScheme";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import classNames from "classnames";
import VacationGraphic from "../../../../../schema/VacationGraphic";
import {info, sign} from "../../../../../services/certWs";

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
                           getProcessList,
                           processes,
                           getProcessFormFields,
                           processFormsWithFields,
                           startProcessRequest,
                           signDocumentRequest,
                           ...props
                       }) => {

    const [formsFieldsInputs, setFormsFieldsInputs] = useState([]);
    const [certInfo, setCertInfo] = useState({});
    const [hash, setHash] = useState('');
    const [processName, setProcessName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        info(onSuccessInfo);
        callToRenderTrigger();
        callToRender(id);
        getProcessList();
    }, [])


    useEffect(() => {
        const resultVacation= Normalizer.Denormalize(
            drawToRender,
            VacationGraphic,
            entities
        );
        if (get(resultVacation, 'bpmnBusinessKey') && get(resultVacation, 'bpmnProcessName')) {
            getFormWithFields(get(resultVacation, 'bpmnBusinessKey'), get(resultVacation, 'bpmnProcessName'));
        }
    }, [drawToRender]);

    useEffect(() => {
        let arrForms = [];
        if (get(processFormsWithFields, 'result')?.length > 0) {
            get(processFormsWithFields, 'result', []).map((form, index) => {
                let fieldsInputs = Utils.toFormFieldsToFormInputsArray(form);
                arrForms.push(<Form key={index}
                                    formRequest={(values) => {
                                        startProcessRequest({id, bpmnProcessName: processName, formData: values})
                                    }}
                                    values={fieldsInputs}
                                    CustomButton={CustomButton}
                                    cancelLink={"/VacationGraphic"}
                                    buttonText={t("Send")}
                                    params={{required: true}}
                                    property={{disabled: false}}
                                    colBtn={12}
                />);
            });
        }

        setFormsFieldsInputs(arrForms);

    }, [processFormsWithFields]);

    const processDenorm = Normalizer.Denormalize(processes, {content: [BusinessProcess]}, entities);
    const processDenormData = get(processDenorm, "content", []);
    processes = processDenormData.map(({processName, title}) => ({
        value: processName,
        label: title
    }));

    const result = Normalizer.Denormalize(
        drawToRender,
        VacationGraphic,
        entities
    );

    useEffect(() => {
        if (!isEmpty(certInfo)) {
            sign(sign('test', onSuccessHash))
        }
    }, [certInfo])

    useEffect(() => {
        let arrForms = [];
        if (get(formsWithFields, 'isFetched') && get(formsWithFields, 'result')?.length > 0 && id) {
            get(formsWithFields, 'result', []).map((form, index) => {
                let fieldsInputs = Utils.toFormFieldsToFormInputsArray(form);
                arrForms.push(<Form key={index}
                                    formRequest={(values) => {
                                        formRequest(get(form, "form.code"), get(head(get(formsWithFields, 'result')), 'tasksUser.id'), values);
                                    }}
                                    values={fieldsInputs}
                                    CustomButton={CustomButton}
                                    cancelLink={null}
                                    buttonText={t("Send")}
                                    property={{disabled: false}}
                                    sign={signDocument}
                                    colBtn={8}
                                    unSign={() => unSignDocument(get(form, "form.code"), get(head(get(formsWithFields, 'result')), 'tasksUser.id'), {})}
                />);
            });
        }

        setFormsFieldsInputs(arrForms);

    }, [formsWithFields,hash]);


    const onDelete = (id) => {
        Swal.fire({
            title: t("Do you want to delete this vacation graphic ?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("O'chirish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545"
        }).then((result) => {
            if (result.isConfirmed) {
                Api.vacationGraphicDelete(id)
                    .then((_res) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: t("Vacation graphic has been deleted"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            history.push("/VacationGraphic");
                        }, 1000);
                    })
                    .catch((e) => {
                        ErrorNotify(e.response.data.message);
                    });
            }
        });
    };

    const onSuccessInfo = ({certinfo = {}}) => {
        setCertInfo(certinfo)
    }

    const onSuccessHash = (certinfo = {}, hash = '') => {
        if (hash) {
            setHash(hash);
        }
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


    const formRequest = (form_name, tasks_user_id, data) => {
        Swal.fire({
            title: t('Вы хотите отправить?'),
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
                        {id: 1, title: t("Vacation graphic"), url: "/VacationGraphic"},
                        {id: 2, title: get(result, "employee.name"), url: ""}
                    ]}
                />
                <div>
                    <Link
                        to={`/VacationGraphic/update/${get(result, "id")}`}
                        className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                    >
                        {t("Update vacation graphic")}
                    </Link>
                    <button
                        onClick={() => onDelete(get(result, "id"))}
                        className="btn btn-sm u-btn-danger rounded-0 g-py-10 g-px-20 ml-2"
                    >
                        {t("Delete vacation graphic")}
                    </button>
                </div>
            </div>
            {trim(get(result, 'notes', null)) && <div className="row">
                <div className="col-12">
                    <div className={classNames("alert  alert-dismissible fade show", {
                        "alert-warning": !get(result, "isPublished", false),
                        "alert-success": get(result, "isPublished", false)
                    })} role="alert">
                        {!get(result, "isPublished", false) && <h4 className="h5">
                            <i className="fa fa-exclamation-triangle"></i>
                            Warning!
                        </h4>}
                        {get(result, "isPublished", false) && <h4 className="h5">
                            <i className="fa fa-check-circle-o"></i> Success!
                        </h4>}
                        {ReactHtmlParser(get(result, 'notes', ''))}
                    </div>
                </div>
            </div>}
            {!isEmpty(result) ? (
                <div className="row">
                    <div className="col-md-6">
                        <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                            <div className="row align-items-center g-mb-10">
                                <div className="col-md-4">
                                    <h3 className="h4 g-font-weight-300 g-mb-0">
                                        {t("Month")}
                                    </h3>
                                </div>
                                <div className="col-md-8">
                                    <div className="shortcode-html">
                                        <p className={'g-mb-0'}>{get(result, "month", 0)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center g-mb-10">
                                <div className="col-md-4">
                                    <h3 className="h4 g-font-weight-300 g-mb-0">
                                        {t("Year")}
                                    </h3>
                                </div>
                                <div className="col-md-8">
                                    <div className="shortcode-html">
                                        <p className={'g-mb-0'}>{get(result, "year", 0)}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {(!get(result, 'isProcessPending', false) && !get(result, 'isPublished')) &&
                            <div className={'mt-5'}>
                                <h2 className="g-font-weight-300 g-font-size-20 g-color-black g-mb-10 g-mt-10">{t("Process")}</h2>
                                <Select
                                    onChange={(event) => {
                                        onchange(event);
                                    }}
                                    isClearable={true}
                                    clearValue={""}
                                    options={processes}
                                    className="form-control form-control-sm rounded-0"
                                    menuPlacement={"bottom"}
                                    placeholder="Choose..."
                                    isSearchable={false}
                                />
                            </div>
                        }
                        <div className={'mt-5'}>
                            <h2
                                className="g-font-weight-300 g-font-size-20 g-color-black g-mb-10 g-mt-10">{get(head(get(formsWithFields, 'result')), 'tasksUser.title', '')}</h2>
                            {formsFieldsInputs}
                            {(isEmpty(formsFieldsInputs) && !isEmpty(processName)) && <button
                                onClick={() => startProcessRequest({id, bpmnProcessName: processName, formData: {}})}

                                type="submit"
                                className="btn btn-md u-btn-primary rounded-0 g-width-170">{t("Send")}</button>}
                        </div>
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
            <ToastContainer/>
            {!isFetched && <Loader/>}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalizer.data.vacation-graphic-one.result", null),
        isFetched: get(state, "normalizer.data.vacation-graphic-one.isFetched", false),
        entities: get(state, "normalizer.entities", {}),
        formsWithFields: get(state, 'normalizer.data.get-vacancy-form-task', {}),
        processes: get(state, 'normalizer.data.business-process-process-list.result', []),
        processFormsWithFields: get(state, 'normalizer.data.process-get-form-fields', {}),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        callToRender: (id) => {
            const storeName = "vacation-graphic-one";
            const entityName = "VacationGraphic";
            const scheme = VacationGraphic;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `vacation-graphic/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = "vacation-graphic-one";
            const entityName = "VacationGraphic";
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
                            entity: 'VacationGraphic',
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
        signDocumentRequest: ({attributes, cb}) => {
            dispatch({
                type: Actions.DOCUMENT_SIGN_PROCESS.REQUEST,
                payload: {attributes, cb}
            })
        },
        startProcessRequest: ({id, bpmnProcessName, formData}) => dispatch({
            type: Actions.VACATION_GRAPHIC_START.REQUEST,
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
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewContainer))
);
