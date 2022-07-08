import React, {useEffect, useState} from "react";
import {get, isNil} from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import StructureScheme from "../../../../../../schema/Structure";
import StructureLinkBatchItem from "../../../../../../schema/StructureLinkBatchItem";
import Normalizer from "../../../../../../services/normalizer";
import Loader from "../../../../../../components/Loader";
import Actions from "../../../../Actions";
import SortableTree from "react-sortable-tree";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import CreateStructureModal from "./components/CreateStructureModal";
import ContentLoader from "../../../../../../components/Loader/ContentLoader";
import {toast} from "react-toastify";
import StructureTypeScheme from "../../../../../../schema/StructureType";
import Swal from "sweetalert2";
import AttachFilialsToBlockModal from "./components/AttachFilialToBlockModal";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";

const Styled = styled.div`
  height: 800px;

  .structure-type-list {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 99;
    background-color: #f5f9f9;
    min-width: 250px;
    list-style-type: none;
    display: none;
    padding-left: 0;

    li {
      color: #8c8f92;
      text-align: left;
      font-size: 16px;
      transition: 0.3s ease;
      padding: 10px 20px;

      &:hover {
        background-color: #fff;
        color: #8cd54a;
      }
    }
  }

  .structure-select-btn {
    position: relative;

    &:hover {
      .structure-type-list {
        display: block;
      }
    }
  }
`;
const StructureHierarchyCreateContainer = ({
                                               t,
                                               entities,
                                               getUnselectedStructureList,
                                               structureUnselectedList,
                                               getSelectedStructureList,
                                               structureSelectedList,
                                               orgOne,
                                               getOrganization,
                                               structureLinkBatchIsFetched,
                                               structureLinkBatch,
                                               structureSyncAbs,
                                               structureAbsSyncIsFetched,
                                               callToAdd,
                                               getStructureTypeList,
                                               types,
                                               setStructureTypeAllChild,
                                               postUpdateStructure
                                           }) => {
    const {id} = useParams();

    const [isOpenCreateModal, openCreateModal] = useState(false);
    const [templateId, setTemplateId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingUnselectedList, setLoadingUnselectedList] = useState(false);
    const [typeLoading, setTypeLoading] = useState(false);

    useEffect(() => {
        getOrganization(id);
        getStructureTypeList();
    }, []);

    const orgOneIsFetched = get(orgOne, "isFetched", false);
    const organizationData = Normalizer.Denormalize(
        orgOne,
        {result: StructureScheme},
        entities
    );
    const organization = get(organizationData, "result");

    const [unSelectedTree, setUnSelectedTree] = useState(
        get(structureUnselectedList, "result", [])
    );
    const [selectedTree, setSelectedTree] = useState(
        get(structureSelectedList, "result", [])
    );

    useEffect(() => {
        getSelectedStructureList(id);
    }, []);

    useEffect(() => {
        if (structureAbsSyncIsFetched) {
            getUnselectedStructureList(id);
            getSelectedStructureList(id);
        }
    }, [structureAbsSyncIsFetched]);

    useEffect(() => {
        if (structureUnselectedList) {
            setUnSelectedTree(get(structureUnselectedList, "result"));
        }
    }, [structureUnselectedList]);

    useEffect(() => {
        if (structureSelectedList) {
            setSelectedTree(get(structureSelectedList, "result"));
        }
    }, [structureSelectedList]);

    useEffect(() => {
        if (get(structureUnselectedList, "isFetched")) {
            setLoadingUnselectedList(false);
        }
    }, [structureUnselectedList]);

    useEffect(() => {
        if (structureLinkBatchIsFetched) {
            setLoading(false);
        }
    }, [structureLinkBatchIsFetched]);

    useEffect(() => {
        if (structureAbsSyncIsFetched) {
            setLoadingUnselectedList(false);
        }
    }, [structureAbsSyncIsFetched]);

    structureUnselectedList = Normalizer.Denormalize(
        structureUnselectedList,
        {result: [StructureLinkBatchItem]},
        entities
    );
    structureSelectedList = Normalizer.Denormalize(
        structureSelectedList,
        {result: [StructureLinkBatchItem]},
        entities
    );

    types = Normalizer.Denormalize(
        types,
        {result: {content: [StructureTypeScheme]}},
        entities
    );

    if (!get(orgOne, "isFetched", false)) {
        return <Loader/>;
    }

    if (!get(structureSelectedList, "isFetched", false)) {
        return <Loader/>;
    }

    if (!orgOneIsFetched) {
        return <Loader/>;
    }

    if (loading) {
        return <Loader/>;
    }

    if (typeLoading) {
        return <Loader/>;
    }

    const createNewVersionAndSubmit = () => {
        setLoading(true);
        structureLinkBatch(id, selectedTree);
    };

    const getUnselectedList = (orgId) => {
        if (orgId) {
            setLoadingUnselectedList(true);
            getUnselectedStructureList(orgId);
        }
    };

    const createStructure = ({attributes, setIsFetched}) => {
        callToAdd({
            attributes,
            formMethods: {openCreateModal, setLoadingUnselectedList, setIsFetched},
            cb: {}
        });
    };
    const postUpdate = (id) => {
        postUpdateStructure(id);
    }

    const setStructureType = (parentStructureId, structureTypeId) => {
        Swal.fire({
            title: t("Do you want to continue?"),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t("Davom etish"),
            denyButtonText: t("Rad etish"),
            denyButtonColor: "#000",
            confirmButtonColor: "#dc3545"
        }).then((result) => {
            if (result.isConfirmed) {
                setTypeLoading(true);
                setStructureTypeAllChild({
                    attributes: {parentStructureId, structureTypeId},
                    cb: {
                        success: (data) => {
                            setTypeLoading(false);
                            toast.dismiss();
                            toast.success("Успешно", {
                                position: "top-right",
                                autoClose: 3000
                            });
                            getSelectedStructureList(id);
                        },
                        fail: ({message = "ERROR"}) => {
                            setTypeLoading(false);
                            toast.dismiss();
                            toast.error(message, {
                                position: "top-right",
                                autoClose: 3000
                            });
                        }
                    }
                });
            }
        });
    };

    const BreadCrumbTitles = [
        {id: 1, title: t("Structure Hierarchy"), url: "/structure-hierarchy"},
        {
            id: 2,
            title: get(organization, "region.title"),
            url: `/structure-hierarchy/region/${get(organization, "region.id")}`
        },
        {id: 3, title: get(organization, "title"), url: `#`}
    ];


    return (
        <>
            <Breadcrumb titles={BreadCrumbTitles}/>
            <div className={"row"}>
                <div className="col-sm-12">
                    <button
                        className="btn btn-primary"
                        onClick={() => openCreateModal(true)}
                    >
                        Create
                    </button>
                    <button
                        className="btn btn-danger ml-3"
                        onClick={() => {
                            setLoadingUnselectedList(true);
                            structureSyncAbs(get(organization, "altAbsCode"));
                        }}
                    >
                        Abs Sync
                    </button>
                    <button
                        className="btn btn-info ml-3"
                        disabled={loading}
                        onClick={() => getUnselectedList(get(organization, "id"))}
                    >
                        Unselected list Sync
                    </button>
                    <button
                        className="btn btn-primary ml-3"
                        disabled={loading}
                        onClick={() => postUpdate(id)}
                    >
                        Update
                    </button>
                </div>
                <div className="col-sm-6">
                    <h1 className="g-font-weight-300 g-font-size-28 g-color-black g-mb-10 g-mt-10">
                        Unselected list
                    </h1>
                    {loadingUnselectedList ? (
                        <ContentLoader/>
                    ) : (
                        <Styled>
                            <SortableTree
                                treeData={unSelectedTree}
                                dndType="structuresDndType"
                                shouldCopyOnOutsideDrop={false}
                                toggleExpandedForAll={true}
                                onChange={(newTreeData) => setUnSelectedTree(newTreeData)}
                                generateNodeProps={({node, path}) => {
                                    const {hasAltCode} = node;
                                    if (!hasAltCode) {
                                        return {
                                            style: {
                                                boxShadow: `0 0 0 1px red`,
                                                textShadow: `1px 1px 1px red`
                                            }
                                        };
                                    }
                                }}
                            />
                        </Styled>
                    )}
                </div>
                <div className="col-sm-6">
                    <h1 className="g-font-weight-300 g-font-size-28 g-color-black g-mb-10 g-mt-10">
                        Selected list
                    </h1>
                    <Styled>
                        <SortableTree
                            treeData={selectedTree}
                            dndType="structuresDndType"
                            shouldCopyOnOutsideDrop={false}
                            toggleExpandedForAll={true}
                            onChange={(newTreeData) => setSelectedTree(newTreeData)}
                            generateNodeProps={({node, path}) => {
                                let {
                                    hasAltCode,
                                    title,
                                    children,
                                    structureId,
                                    structureTypeTitle
                                } = node;
                                if (!isNil(children)) {
                                    if (!hasAltCode) {
                                        return {
                                            buttons: [
                                                <button
                                                    className={
                                                        "btn btn-primary btn-sm structure-select-btn"
                                                    }
                                                >
                                                    <i className={"hs-admin-angle-down"}></i>
                                                    <ul className={"structure-type-list"}>
                                                        {get(types, "result.content", []).map(
                                                            ({id, title}) => (
                                                                <li
                                                                    onClick={() =>
                                                                        setStructureType(structureId, id)
                                                                    }
                                                                    key={id}
                                                                >
                                                                    {title}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </button>,
                                                <button
                                                    className={"btn btn-info btn-sm ml-1"}
                                                    onClick={() => setTemplateId(structureId)}
                                                >
                                                    <i className={"icon-link"}></i>
                                                </button>
                                            ],
                                            style: {
                                                boxShadow: `0 0 0 1px red`,
                                                textShadow: `1px 1px 1px red`
                                            }
                                        };
                                    }
                                    return {
                                        title: [
                                            <div>
                                                {title}{" "}
                                                {!isNil(structureTypeTitle) && (
                                                    <span
                                                        className={
                                                            "d-inline-block text-center g-min-width-35 g-bg-cyan g-font-size-10 g-color-white g-rounded-15 g-px-8 g-py-1"
                                                        }
                                                    >
                            {structureTypeTitle}
                          </span>
                                                )}
                                            </div>
                                        ],
                                        buttons: [
                                            <button
                                                className={
                                                    "btn btn-primary btn-sm structure-select-btn"
                                                }
                                            >
                                                <i className={"hs-admin-angle-down"}></i>
                                                <ul className={"structure-type-list"}>
                                                    {get(types, "result.content", []).map(
                                                        ({id, title}) => (
                                                            <li
                                                                onClick={() =>
                                                                    setStructureType(structureId, id)
                                                                }
                                                                key={id}
                                                            >
                                                                {title}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </button>
                                        ]
                                    };
                                } else {
                                    return {
                                        title: [
                                            <div>
                                                {title}{" "}
                                                {!isNil(structureTypeTitle) && (
                                                    <span
                                                        className={
                                                            "d-inline-block text-center g-min-width-35 g-bg-cyan g-font-size-10 g-color-white g-rounded-15 g-px-8 g-py-1"
                                                        }
                                                    >
                            {structureTypeTitle}
                          </span>
                                                )}
                                            </div>
                                        ]
                                    };
                                }
                            }}
                        />
                    </Styled>
                    <hr/>
                    <button
                        className="btn btn-primary col-sm-12"
                        style={{
                            height: "40px"
                        }}
                        onClick={() => createNewVersionAndSubmit()}
                    >
                        {t("Save")}
                    </button>
                </div>
            </div>
            {/*<div className="row">*/}
            {/*    <div className="col-sm-12">*/}
            {/*        <button*/}
            {/*            className="btn btn-primary col-sm-12"*/}
            {/*            style={{*/}
            {/*                height: '40px'*/}
            {/*            }}*/}
            {/*            onClick={() => createNewVersionAndSubmit()}*/}
            {/*        >Создать*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {isOpenCreateModal ? (
                <CreateStructureModal
                    createStructure={createStructure}
                    organization={organization}
                    openClose={openCreateModal}
                />
            ) : (
                ""
            )}
            {!isNil(templateId) && (
                <AttachFilialsToBlockModal
                    templateId={templateId}
                    openClose={() => setTemplateId(null)}
                />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, "normalizer.entities", {}),
        structureUnselectedList: get(
            state,
            "normalizer.data.structure-unselected-list",
            {}
        ),
        structureSelectedList: get(
            state,
            "normalizer.data.structure-selected-list",
            {}
        ),
        orgOne: get(state, "normalizer.data.structure-org-one", {}),
        selectedStructureList: get(state, "hrms.structure_list", {}),
        structureLinkBatchIsFetched: get(
            state,
            "hrms.structureLinkBatchIsFetched",
            false
        ),
        structureAbsSyncIsFetched: get(state, "hrms.structureAbsSync", false),
        types: get(state, "normalizer.data.structure-type-list", {})
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrganization: (id) => {
            const storeName = "structure-org-one";
            const entityName = "structure";
            const scheme = StructureScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `/structure/${id}`,
                    params: {},
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        getStructureTypeList: () => {
            const storeName = "structure-type-list";
            const entityName = "structure-type";
            const scheme = {content: [StructureTypeScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/structure-type`,
                    params: {},
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        getUnselectedStructureList: (orgId) => {
            const storeName = "structure-unselected-list";
            const entityName = "structure";
            const scheme = [StructureLinkBatchItem];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/structure-hierarchies/unselected/structures/${orgId}`,
                    params: {},
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        getSelectedStructureList: (orgId) => {
            const storeName = "structure-selected-list";
            const entityName = "structure";
            const scheme = [StructureLinkBatchItem];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/structure-hierarchies/selected/structures/${orgId}`,
                    params: {},
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        changeStructureHierarchy: (result) => {
            dispatch({
                type: Actions.STRUCTURE_CHANGE_HIERARCHY.REQUEST,
                payload: {
                    result
                }
            });
        },
        structureLinkBatch: (rootStructureId, links) => {
            dispatch({
                type: Actions.STRUCTURE_LINK_BATCH.REQUEST,
                payload: {
                    attributes: {
                        rootStructureId,
                        links
                    }
                }
            });
        },
        structureSyncAbs: (altCode) => {
            dispatch({
                type: Actions.STRUCTURE_ABS_SYNC.REQUEST,
                payload: {
                    altCode
                }
            });
        },
        postUpdateStructure: (rootStructureId) => {
            dispatch({
                type: Actions.POST_UPDATE_STRUCTURE.REQUEST,
                payload: {
                    rootStructureId
                }
            });
        },
        setStructureTypeAllChild: ({attributes, cb}) => {
            dispatch({
                type: Actions.SET_STRUCTURE_TYPE_CHILD_ALL.REQUEST,
                payload: {
                    attributes,
                    cb
                }
            });
        },
        callToAdd: ({
                        attributes,
                        url = "structure",
                        formMethods = {},
                        scheme = StructureScheme,
                        storeName = "structure-unselected-list",
                        entityName = "structure"
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
                    cb: {
                        success: (nData, data) => {
                            toast.dismiss();
                            toast.success("Успешно", {
                                position: "top-right",
                                autoClose: 1000
                            });
                            // formMethods.openCreateModal(false);
                            // formMethods.setLoadingUnselectedList(false);
                        }
                    }
                }
            });
        }
    };
};
export default withTranslation("HRMS")(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StructureHierarchyCreateContainer)
);
