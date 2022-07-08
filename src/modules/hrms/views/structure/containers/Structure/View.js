import React, {Component} from "react";
import {connect} from "react-redux";
import {get, head, isEmpty, isEqual, last, split} from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import Normalizer from "../../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../../components/Loader";
import Api from "../../../../Api";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import AuthActions from "../../../../../../services/auth/actions";
import {toast, ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import StructureScheme from "../../../../../../schema/Structure";
import {Link, withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import GridView from "../../../../../../containers/GridView";
import Pagination from "../../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "./component/structure/ToolBarStructure";
import BreadCrumb from "../../../../../../components/Breadcrumb";
import ItemHead from "./component/structure/ItemHead";
import ItemBody from "./component/structure/ItemBody";
import StructureVarScheme from "../../../../../../schema/StructureVarScheme";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import CustomButton from "../../../../../../containers/Form/component/Common/Button";
import Form from "../../../../../../containers/Form/Form";

class View extends Component {
    state = {
        isFetchedIn: false,
        dynamicPage: 1,
        showAddModal: false,
        editModal: false,
        editId: null
    };

    componentDidMount() {
        const {id, callToRender, callToRenderTrigger} = this.props;
        callToRenderTrigger();
        callToRender(id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {getOne} = this.props;
        const {editId} = this.state;
        const {editId: prevEditId} = prevState;
        if (!isEqual(prevEditId, editId) && editId) {
            getOne(editId)
        }
    }

    onDelete = (id) => {
        const {checkAuth, t, history} = this.props;
        Swal.fire({
            title: t("Do you want to structure this structure ?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("O'chirish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545"
        }).then((result) => {
            if (result.isConfirmed) {
                Api.structureDelete(id)
                    .then((_res) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: t("Your structure has been deleted"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            history.push("/structure");
                            checkAuth();
                        }, 1000);
                    })
                    .catch((e) => {
                        ErrorNotify(e.response.data.message);
                    });
            }
        });
    };

    removeVar = (id) => {
        const {checkAuth, t, history, deleteRequest} = this.props;

        Swal.fire({
            title: t("Do you want delete this var ?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("O'chirish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRequest({id})
            }
        });
    }

    render() {
        let {drawToRender, entities, t, isFetched, id, addRequest, varOne, updateRequest} = this.props;
        let {showAddModal, editModal, editId} = this.state;
        const result = Normalizer.Denormalize(
            drawToRender,
            StructureScheme,
            entities
        );
        const resultVar = Normalizer.Denormalize(
            varOne,
            StructureVarScheme,
            entities
        );
        console.log('resultVar', resultVar)

        const create = (values) => {
            addRequest({
                attributes: {...values, structureId: id},
                formMethods: {},
                cb: {
                    success: (nData, data) => {
                        this.setState({...this.state, showAddModal: false})
                        toast.dismiss();
                        toast.success("Успешно", {
                            position: "top-right",
                            autoClose: 1000
                        });
                    },
                }
            })
        }

        const edit = (values) => {
            updateRequest({
                id: editId,
                attributes: {...values, structureId: id},
                formMethods: {},
                cb: {
                    success: (nData, data) => {
                        this.setState({...this.state, editModal: false})
                        toast.dismiss();
                        toast.success("Успешно", {
                            position: "top-right",
                            autoClose: 1000
                        });
                    },
                }
            })
        }


        const ItemHeadTitles = [
            t("ID"),
            t("Title"),
            t("Description"),
            t("Code"),
            t("Value"),
            t("Actions")
        ];

        const values = [
            {
                id: 1,
                label: t("Title"),
                name: "title",
                type: "input",
                params: {required: true}
            },
            {
                id: 2,
                label: t("Description"),
                name: "description",
                type: "textarea",
                params: {required: true}
            },
            {
                id: 3,
                label: t("Code"),
                name: "code",
                type: "input",
                params: {required: true}
            },
            {
                id: 4,
                label: t("Value"),
                name: "value",
                type: "input",
                params: {required: true}
            },
        ];

        const editValues = [
            {
                id: 1,
                label: t("Title"),
                name: "title",
                type: "input",
                defaultValue: get(resultVar, 'title'),
                params: {required: true}
            },
            {
                id: 2,
                label: t("Description"),
                name: "description",
                type: "textarea",
                defaultValue: get(resultVar, 'description'),
                params: {required: true}
            },
            {
                id: 3,
                label: t("Code"),
                name: "code",
                type: "input",
                defaultValue: get(resultVar, 'code'),
                params: {required: true}
            },
            {
                id: 4,
                label: t("Value"),
                name: "value",
                type: "input",
                defaultValue: get(resultVar, 'value'),
                params: {required: true}
            },
        ];
        if (!isFetched) {
            return <Loader/>;
        }
        return (
            <>
                <div className="flex-display-more">
                    <Breadcrumb
                        titles={[
                            {id: 1, title: t("Structure"), url: "/structure"},
                            {id: 2, title: t("Structure"), url: "/structure"},
                            {id: 3, title: t("View"), url: "/structure"},
                            {id: 4, title: get(result, "title"), url: ""}
                        ]}
                    />
                    <Rodal visible={showAddModal} onClose={() => this.setState({...this.state, showAddModal: false})}>
                        <Form
                            formRequest={create}
                            values={values}
                            cancelLink={"/"}
                            buttonText={"Create"}
                            CustomButton={CustomButton}
                            isFetched={true}
                            params={{required: false}}
                            property={{disabled: false}}
                            column={[4, 8]}
                        />
                    </Rodal>
                    <Rodal visible={editModal} onClose={() => this.setState({...this.state, editModal: false})}>
                        <Form
                            formRequest={edit}
                            values={editValues}
                            cancelLink={"/"}
                            buttonText={"Edit"}
                            CustomButton={CustomButton}
                            isFetched={true}
                            params={{required: false}}
                            property={{disabled: false}}
                            column={[4, 8]}
                        />
                    </Rodal>
                    <div>
                        <Link
                            to={`/structure/update/${get(result, "id")}`}
                            className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                        >
                            {t("Update Document")}
                        </Link>
                        <button
                            onClick={() => this.onDelete(get(result, "id"))}
                            className="btn btn-sm u-btn-danger rounded-0 g-py-10 g-px-20 ml-2"
                        >
                            {t("Delete Document")}
                        </button>
                    </div>
                </div>
                {!isEmpty(result) ? (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Title")} : {get(result, "title", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("altAbsCode")} : {get(result, "altAbsCode", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("autonomousLevel")} :{" "}
                        {get(result, "autonomousLevel", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("code")} : {get(result, "code", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("description")} : {get(result, "description", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("ID")} : {get(result, "id", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("isAutonomous")} :{" "}
                        {JSON.stringify(get(result, "isAutonomous", ""))}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("level")} : {get(result, "level", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("orgStructureLevel")} :{" "}
                        {get(result, "orgStructureLevel", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("status")} : {get(result, "status", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("type")} : {get(result, "type", "")}
                    </span>
                                    </h5>
                                </div>
                                <div className="g-mb-15">
                                    <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("typeRating")} : {get(result, "typeRating", "")}
                    </span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <GridView
                                storeName="structureVar"
                                entityName="structureVar"
                                url={`template-document-custom-var-structure?structureId=${id}`}
                                scheme={StructureVarScheme}
                                CustomPagination={Pagination}
                                CustomToolbar={ToolBarStructure}
                                CustomBreadcrumb={BreadCrumb}
                                BreadCrumbTitles={[]}
                                ComponentHead={ItemHead}
                                ComponentBody={ItemBody}
                                ComponentHeadTitles={ItemHeadTitles}
                                encoded={null}
                                params={{pageSize: 15}}
                                actions={{
                                    add: () => {
                                        this.setState({...this.state, showAddModal: true})
                                    }, remove: (id) => {
                                        this.removeVar(id)
                                    }, update: (id) => {
                                        this.setState({...this.state, editModal: true, editId: id})
                                    }
                                }}
                            />
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
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalizer.data.structure-one.result", []),
        isFetched: get(state, "normalizer.data.structure-one.isFetched", false),
        meta: get(state, "normalizer.data.structure-one.result.pageable", {}),
        totalElements: get(
            state,
            "normalizer.data.structure-one.result.totalElements",
            0
        ),
        totalPages: get(state, "normalizer.data.structure-one.result.totalPages", 0),
        varOne: get(state, "normalizer.data.structure-var-one.result", null),
        entities: get(state, "normalizer.entities", [])
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callToRender: (id) => {
            const storeName = "structure-one";
            const entityName = "structure";
            const scheme = StructureScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `structure/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = "structure-one";
            const entityName = "structure";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        },
        addRequest: ({
                         attributes,
                         url = 'template-document-custom-var-structure',
                         formMethods = {},
                         scheme = StructureVarScheme,
                         storeName = 'structureVar',
                         entityName = 'structureVar',
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
        deleteRequest: ({
                            id,
                            url = 'template-document-custom-var-structure',
                            config = {},
                            formMethods = {},
                            scheme = StructureVarScheme,
                            storeName = 'structureVar',
                            entityName = 'structureVar'
                        }) => {
            dispatch({
                type: ApiActions.OPERATION_DELETE.REQUEST,
                payload: {
                    id,
                    url: `${url}/${id}`,
                    config,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb: {
                        success: (nData, data) => {
                            toast.dismiss();
                            toast.success("Успешно", {
                                position: "top-right",
                                autoClose: 1000
                            });
                        },
                        fail: (e) => {
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000
                            });
                        }
                    }
                }
            });
        },
        updateRequest: ({
                            id,
                            attributes,
                            url = 'template-document-custom-var-structure',
                            formMethods = {},
                            scheme = StructureVarScheme,
                            storeName = 'structureVar',
                            entityName = 'structureVar',
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
        getOne: (id) => {
            const storeName = "structure-var-one";
            const entityName = "structureVar";
            const scheme = StructureVarScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `template-document-custom-var-structure/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        checkAuth: () => {
            dispatch({
                type: AuthActions.CHECK_AUTH.REQUEST
            });
        }
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(View))
);
