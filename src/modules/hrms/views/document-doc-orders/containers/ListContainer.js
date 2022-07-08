import React from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import BreadCrumb from "../../../../../components/Breadcrumb";
import ItemHead from "../components/ItemHead";
import ItemBody from "../components/ItemBody";
import ToolBarStructure from "../../../../../components/ToolBar/ToolBarStructure";
import DocRequestScheme from "../../../../../schema/DocRequestScheme";

const ListContainer = ({t, match: {params: {encoded}}, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Document orders"), url: "/DocumentDocOrders"},
    ];
    const ItemHeadTitles = [
        {name:'id',title:t("ID")},
        {name:'title',title:t("Title")},
        {name:'bpmnProcessName',title:t("Process name")},
        {name:'status',title:t("Status")},
    ];
    return (
        <GridView
            storeName="DocumentDocOrders"
            entityName="DocumentDocOrders"
            url={`document-doc-orders?isDeleted=false`}
            scheme={DocRequestScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/DocumentDocOrders/create'}
        />
    );
};

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default withTranslation("HRMS")(withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer)));
