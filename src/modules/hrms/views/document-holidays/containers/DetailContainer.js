import React, {useEffect, useState} from "react";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {get, head, isArray, isEmpty, isEqual, isNil, split, trim} from "lodash";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Loader from "../../../../../components/Loader";
import ApiActions from "../../../../../services/api/Actions";
import DocumentScheme from "../../../../../schema/Document";
import Normalizer from "../../../../../services/normalizer";
import PDFViewer from "../../../../../components/PdfViewer";
import UserTaskFormScheme from "../../../../../schema/UserTaskForm";
import Utils from "../../../../../services/helpers/Utils";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/FormButton";
import {toast} from "react-toastify";
import Actions from "../../../Actions";
import classNames from "classnames";
import {info, sign} from "../../../../../services/certWs";
import OverlayLoader from "../../../../../components/Loader/OverlayLoader";
import Swal from "sweetalert2";
import EImzo from "../../../../../components/E-imzo";

const DetailContainer = ({
                             t,
                             id,
                             entities,
                             getDocument,
                             getDocumentLink,
                             isFetchedDocument,
                             document,
                             documentLink,
                             getDocumentFormWithFields,
                             formsWithFields,
                             tasksUserFormSetValuesReturnResultAndComplete,
                             signDocumentRequest,
                             signDocumentWithEimzoRequest,
                             generateDocsRequest,
                             ...props
                         }) => {


    const [isFetched, setIsFetched] = useState(false);
    const [formsFieldsInputs, setFormsFieldsInputs] = useState([]);
    const [isActive, setIsActive] = useState(1);
    const [certInfo, setCertInfo] = useState({});
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState(null);
    const [documentType, setDocumentType] = useState(null);
    const setActiveEvent = (active) => {
        return setIsActive(active);
    };
    useEffect(() => {
        info(onSuccessInfo);
        getDocument(id);
    }, []);


    useEffect(() => {
        if (get(document, 'bpmnBusinessKey') && get(document, 'bpmnProcessName')) {
            getDocumentFormWithFields(get(document, 'bpmnBusinessKey'), get(document, 'bpmnProcessName'));
        }
        if(id && get(document, 'documentType')){
            setDocumentType(get(document, 'documentType'))
            getDocumentLink(id,get(document, 'documentType'));
        }
    }, [document]);


    useEffect(() => {
        if (!isEmpty(certInfo)) {
            sign(sign('test', onSuccessHash))
        }
    }, [certInfo])

    useEffect(() => {

        const timer = setInterval(() => getDocumentInterval(formsFieldsInputs), 30000);
        return () => {
            clearInterval(timer)
        }
    }, [formsFieldsInputs])

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
                                    eimzo={eimzo}
                                    colBtn={8}
                                    unSign={() => unSignDocument(get(form, "form.code"), get(head(get(formsWithFields, 'result')), 'tasksUser.id'), {})}
                />);
            });
        }

        setFormsFieldsInputs(arrForms);

    }, [formsWithFields, hash]);


    const getDocumentInterval = (data) => {
        if (isEmpty(data)) {
            getDocument(id);
            getDocumentLink(id,get(document, 'documentType'));
        }
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
            }
        });

    };

    document = Normalizer.Denormalize(document, DocumentScheme, entities);
    documentLink = Normalizer.Denormalize(documentLink, [DocumentScheme], entities);


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
                            documentType: head(split(get(document, "bpmnBusinessKey", ""), "_")),
                            ...certInfo,
                            fieldName,
                            fieldType: 'CUSTOM_TYPE',
                            signature: hash,
                            instanceTokenId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenId', null),
                            instanceTokenStateId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenStateId', null)

                        }, cb: {
                            success: () => {
                                setLoading(false);
                                getDocumentFormWithFields(get(document, 'bpmnBusinessKey'), get(document, 'bpmnProcessName'));
                                getDocumentLink(id,get(document, 'documentType'));
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
    }

    const eimzo = (name) => {
        setShow(true);
        setName(name);
    }


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
                if (!isEmpty(pkcs7_64) && !isNil(name) && !isNil(documentType)) {
                    setLoading(true);
                    signDocumentWithEimzoRequest({
                        attributes: {
                            documentId: id,
                            documentType:get(document,'documentType'),
                            fieldName: name,
                            fieldType: 'CUSTOM_TYPE',
                            signature: pkcs7_64,
                            instanceTokenId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenId', null),
                            instanceTokenStateId: get(head(get(formsWithFields, 'result', [])), 'tasksUser.instanceTokenStateId', null),
                            subject: "Sign hash token"

                        }, cb: {
                            success: () => {
                                setLoading(false);
                                getDocumentFormWithFields(get(document, 'bpmnBusinessKey'), get(document, 'bpmnProcessName'));
                                getDocumentLink(id,get(document, 'documentType'));
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

    const generateDocs = () => {
        generateDocsRequest({
            attributes: {documentId: id, documentType: get(document, 'documentType', null)},
            cb: {
                success: () => {
                    getDocumentLink(id,get(document, 'documentType'));
                },
                fail: () => {
                    toast.error('Something went wrong')
                }
            }
        })
    }

    console.log('document',document)


    if (!isFetchedDocument) {
        return <Loader/>;
    }
    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Document Holidays"), url: "/document-holidays"},
                    {id: 2, title: get(document, 'title'), url: ""},
                ]}
            />
            <div className="row mb-3">
                <div className="col-12  ">
                    {show && <EImzo eSign={eSign} onClose={()=>setShow(false)}/>}
                    {
                        isArray(get(document, 'currentState', [])) && get(document, 'currentState', []).map(item =>
                            <span className={'btn u-btn-primary g-rounded-50 g-mr-10 g-mb-15'}>{t(item)}</span>)
                    }

                </div>
            </div>
            {trim(get(document, 'infoNote', '')) && <div className="row">
                <div className="col-12">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        {get(document, 'infoNote', '-')}
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-md-6">
                    <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30 mt-2">
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Title")} : {get(document, "title")}
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Process name")} : {t(get(document, "bpmnProcessName"))}
                    </span>
                            </h5>
                        </div>
                    </div>
                    <div className={'mt-5'}>
                        <h2
                            className="g-font-weight-300 g-font-size-20 g-color-black g-mb-10 g-mt-10">{get(head(get(formsWithFields, 'result')), 'tasksUser.title')}</h2>
                        {formsFieldsInputs}
                    </div>
                </div>
                <div className="col-md-6">
                    <button onClick={generateDocs}
                            className={'btn btn-block u-btn-primary rounded-0 g-py-12 g-px-25 text-white mb-3'}>Generate docs
                    </button>
                    <ul
                        className="nav nav-justified u-nav-v1-1 u-nav-primary g-brd-bottom--md g-brd-bottom-2 g-brd-primary g-mb-20">
                        {isArray(documentLink) &&
                            documentLink.map((d, index) => {
                                return (
                                    <li key={index + 1} className="nav-item">
                <span
                    className={classNames("nav-link g-py-10 pointer", {
                        active: isEqual(index + 1, isActive)
                    })}
                    onClick={() => setActiveEvent(index + 1)}
                >
                  {get(d, "title")}
                </span>
                                    </li>
                                );
                            })}
                    </ul>
                    <div id="nav-1-1-default-hor-left-underline" className="tab-content">
                        {isArray(documentLink) &&
                            documentLink.map((d, index) => {
                                return (
                                    <div
                                        key={index + 1}
                                        className={classNames("tab-pane fade", {
                                            "show active": isEqual(index + 1, isActive)
                                        })}
                                    >
                                        <PDFViewer pdf={get(d, 'fileAbsoluteSrc')}/>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            {
                loading && <OverlayLoader/>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        document: get(state, 'normalizer.data.get-document-one.result', {}),
        documentLink: get(state, 'normalizer.data.get-document-all.result', {}),
        isFetchedDocument: get(state, 'normalizer.data.get-document-one.isFetched', false),
        formsWithFields: get(state, 'normalizer.data.get-document-form-task', {}),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDocumentLink: (documentId,documentType) => {
            const storeName = "get-document-all";
            const entityName = "document";
            const scheme = [DocumentScheme];
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `documents/getAllFiles?documentId=${documentId}&documentType=${documentType}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        getDocument: (id) => {
            const storeName = "get-document-one";
            const entityName = "document";
            const scheme = DocumentScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `document-holidays/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        getDocumentFormWithFields: (business_key, process_name) => {
            const storeName = "get-document-form-task";
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
        signDocumentWithEimzoRequest: ({attributes, cb}) => {
            dispatch({
                type: Actions.DOCUMENT_SIGN_WITH_EIMZO_PROCESS.REQUEST,
                payload: {attributes, cb}
            })
        },
        generateDocsRequest: ({attributes, cb}) => {
            dispatch({
                type: Actions.GENERATE_DOCS.REQUEST,
                payload: {attributes, cb}
            })
        }
    }
}
export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(DetailContainer));
