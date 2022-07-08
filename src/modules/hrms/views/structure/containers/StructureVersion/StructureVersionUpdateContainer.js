import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../Api";
import {get,isEqual,find} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {ToastContainer} from "react-toastify";
import Normalizer from "../../../../../../services/normalizer";
import ApiActions from "../../../../../../services/api/Actions";
import Loader from "../../../../../../components/Loader/Loader";
import StructureVersionScheme from "../../../../../../schema/StructureVersion";
import helper from "../../../../../../containers/Form/helper";

const StructureVersionUpdateContainer = ({id,t,...rest}) => {
    const dispatch = useDispatch();
    const result = useSelector((state) =>
        get(state, "normalizer.data.structure-version-one.result", [])
    );
    const isFetchedProps = useSelector((state) =>
        get(state, "normalizer.data.structure-version-one.isFetched", false)
    );
    const isFetchedList = useSelector((state) =>
        get(state, "normalizer.data.get-structure-version-list.isFetched", false)
    );
    const entities = useSelector((state) =>
        get(state, "normalizer.entities", {})
    );

    const structureList = useSelector((state) =>
        get(state, "normalizer.data.get-structure-version-list.result.content", [])
    );

    const [isFetched, setIsFetched] = useState(false);
    const update = (data) => {
        setIsFetched("Update");
        Api.structureVersionUpdate(id, data)
            .then((_res) => {
                setIsFetched(false);
                SuccessNotify("Успешно создан");
                setTimeout(() => {
                    window.history.back();
                }, 1000);
            })
            .catch((e) => {
                setIsFetched(false);
                ErrorNotify(e.response.data.message);
            });
    };
    const getStructureVersion = (id) => {
        const storeName = "structure-version-one";
        const entityName = "structure-version";
        const scheme = StructureVersionScheme;
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `structure-version/${id}`,
                scheme,
                storeName,
                entityName
            }
        });
    };

    const getStructureVersionList = () => {
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
    };

    useEffect(() => {
        getStructureVersionList();
        getStructureVersion(id);
    }, []);


    const structureVersion = Normalizer.Denormalize(
        result,
        StructureVersionScheme,
        entities
    );
    const structureVersionList = Normalizer.Denormalize(
        structureList,
        [StructureVersionScheme],
        entities
    );

    const optionsStructureVersionList = helper.renderProperty(structureVersionList, [
        "id",
        "title"
    ]);
    const values = [

        {
            id: 1,
            name: "type",
            type: "select",
            options: optionsStructureVersionList,
            defaultValue: {
               ...optionsStructureVersionList.find(({value}) => value == get(structureVersion,'parentId'))
            }
        },
        {
            id: 2,
            label: "Title",
            name: "title",
            type: "input",
            defaultValue: get(structureVersion, "title")
        },
    ];

    if (!isFetchedList || !isFetchedProps) {
        return <Loader/>
    }
    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Structure version"), url: "/structure-version"},
                    {
                        id: 2,
                        title: "Structure Version",
                        url: `/structure-version/list`
                    },
                    {
                        id: 3,
                        title: t("Update"),
                        url: `/structure-version/view/${id}`
                    },
                    { id: 4, title: get(structureVersion, "title"), url: "" }
                ]}
            />
            <UpdateForm
                formRequest={update}
                values={values}
                CustomButton={CustomButton}
                cancelLink={`/structure-version/view/${id}`}
                buttonText={"Update"}
                isFetched={isFetched}
                params={{ required: false }}
                property={{ disabled: false }}
            />
            <ToastContainer />
        </>
    );
}

export default withTranslation("HRMS")(StructureVersionUpdateContainer);
