import React, {useEffect} from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get, entries, last, head} from "lodash";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "../../../../../components/ToolBar/ToolBarStructure";
import BreadCrumb from "../../../../../components/Breadcrumb";
import ItemHead from "../components/ItemHead";
import ItemBody from "../components/ItemBody";
import TaskScheme from "../../../../../schema/Task";
import ApiActions from "../../../../../services/api/Actions";

const DocumentListContainer = ({t, encoded, getDocumentStateTypes, stateTypes, triggerProcessFormFields, ...props}) => {

    useEffect(() => {
        triggerProcessFormFields();
        getDocumentStateTypes();
    }, [])

    const BreadCrumbTitles = [
        {id: 1, title: t("Document list"), url: "/document/list"},
    ];
    const ItemHeadTitles = [
        {name:'id',title:t("ID")},
        {name:'title',title:t("Title")},
        {name:'bpmnProcessName',title:t("Process name")},
        {name:'status',title:t("Status")},
    ];
    return (
        <GridView
            storeName="document-list"
            entityName="task"
            url={`document`}
            scheme={TaskScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/document/create'}
            hasStateFilter={true}
            stateTypesList={entries(stateTypes).map(item => ({value: head(item), label: t(last(item))}))}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        stateTypes: get(state, 'apiReducer.data.document-state-types-list.result', {})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDocumentStateTypes: () => {
            const storeName = "document-state-types-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `documentStates/types`,
                    storeName,
                    config: {},
                },
            });
        },
        triggerProcessFormFields: () => {
            const storeName = "process-get-form-fields";
            const entityName = "form-field";
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        },
    }
}

export default withTranslation("HRMS")(withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer)));
