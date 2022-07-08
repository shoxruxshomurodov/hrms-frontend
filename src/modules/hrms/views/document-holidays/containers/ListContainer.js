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
import DocHolidays from "../../../../../schema/DocHolidays";

const ListContainer = ({t, match: {params: {encoded}}, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Document holidays"), url: "/document-holidays"},
    ];
    const ItemHeadTitles = [
        {name:'id',title:t("ID")},
        {name:'title',title:t("Title")},
        {name:'bpmnProcessName',title:t("Process name")},
        {name:'status',title:t("Status")},
    ];
    return (
        <GridView
            storeName="docHolidays"
            entityName="docHolidays"
            url={`document-holidays`}
            scheme={DocHolidays}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/document-holidays/create'}
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
