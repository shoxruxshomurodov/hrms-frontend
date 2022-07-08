import React, {useEffect, useState} from "react";
import CreateForm from "../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {connect} from 'react-redux';
import ApiActions from "../../../../../../services/api/Actions";
import {get} from "lodash";
import Normalizer from "../../../../../../services/normalizer";
import helper from "../../../../../../containers/Form/helper";
import Actions from "../../../../Actions";
import StructureVersionScheme from "../../../../../../schema/StructureVersion";

const StructureVersionCreateContainer = ({t, getStructureVersionList, entities,createStructureVersion,structureVersionList, ...rest}) => {
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        getStructureVersionList();
    }, []);

    structureVersionList = Normalizer.Denormalize(structureVersionList, [StructureVersionScheme], entities);

    const optionsStructureVersionList = helper.renderProperty(structureVersionList, [
        "id",
        "title"
    ]);

    const create = (attributes) => {
        setIsFetched("Create");
        createStructureVersion({attributes,setIsFetched})
    };
    const values = [
        {
            id: 1,
            name: "parentId",
            type: "select",
            options: optionsStructureVersionList,
            label: "Parent structure",
            params: {required:false}
        },
        {id: 3, name: "title", type: "input", label: "Title", params: {required: true}},
    ];
    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Structure Version List"), url: "/structure-version/list"},
                    {id: 2, title: t("Create"), url: "#"}
                ]}
            />
            <CreateForm
                formRequest={create}
                values={values}
                CustomButton={CustomButton}
                cancelLink={"/structure-version/list"}
                buttonText={"Create"}
                isFetched={isFetched}
                params={{required: false}}
                property={{disabled: false}}
            />
            <ToastContainer/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        structureVersionList: get(state, 'normalizer.data.get-structure-version-list.result.content', []),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStructureVersionList: () => {
            const storeName = "get-structure-version-list";
            const entityName = "structure-version";
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "structure-version",
                    config: {
                        params: {
                            isDeleted: false
                        }
                    },
                    scheme: {content: [StructureVersionScheme]},
                    storeName: storeName,
                    entityName: entityName
                }
            });
        },

        createStructureVersion: ({attributes,setIsFetched,}) => {
            dispatch({
                type: Actions.CREATE_STRUCTURE_VERSION.REQUEST,
                payload: {
                    attributes,
                    cb: {
                        success: (nData, data) => {
                            setIsFetched(false)
                            toast.dismiss();
                            toast.success('Успешно', {
                                position: "top-right",
                                autoClose: 1000,
                            })
                            setTimeout(() => {
                                window.history.back()
                            }, 1000)
                        },
                        fail: (e) => {
                            setIsFetched(false)
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000,
                            })
                        },
                    },
                },
            });
        }
    }
}

export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(StructureVersionCreateContainer));
