import React from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import BreadCrumb from "../../../../../components/Breadcrumb";
import ItemHead from "../components/ItemHead";
import ItemBody from "../components/ItemBody";
import VacancyScheme from "../../../../../schema/VacancyScheme";
import ToolBarStructure from "../../../../../components/ToolBar/ToolBarStructure";
import TemplateDocumentAssignScheme from "../../../../../schema/TemplateDocumentAssignScheme";

const ListContainer = ({t, match: {params: {encoded}}, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Template document assign list"), url: "/template-document-assign"},
    ];
    const ItemHeadTitles = [
        t("ID"),
        t("Document type"),
        t("Process"),
        t("Document template"),
        t("Expression"),
    ];
    return (
        <GridView
            storeName="template-document-assign"
            entityName="templateDocumentAssign"
            url={`template-document-assign`}
            scheme={TemplateDocumentAssignScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/template-document-assign/create'}
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
