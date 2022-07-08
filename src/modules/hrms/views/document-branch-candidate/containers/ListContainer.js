import React from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import BreadCrumb from "../../../../../components/Breadcrumb";
import ItemHead from "../components/ItemHead";
import ItemBody from "../components/ItemBody";
import ToolBarStructure from "../components/Toolbar";
import DocBranchCandidateScheme from "../../../../../schema/DocBranchCandidateScheme";

const ListContainer = ({t, match: {params: {encoded}}, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Document branch candidate"), url: "/DocumentBranchCandidate"},
    ];
    const ItemHeadTitles = [
        {name:'id',title:t("ID")},
        {name:'title',title:t("Title")},
        {name:'bpmnProcessName',title:t("Process name")},
        {name:'vacancyRegionTitle',title:t("Region")},
        {name:'vacancyDistrictTitle',title:t("District")},
        {name:'currentOnStructureTitle',title:t("Department")},
        {name:'vacancyPositionTitle',title:t("Position")},
        {name:'status',title:t("Status")},
    ];
    return (
        <GridView
            storeName="DocumentBranchCandidate"
            entityName="DocumentBranchCandidate"
            url={`document-branch-candidate?isDeleted=false`}
            scheme={DocBranchCandidateScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/DocumentBranchCandidate/create'}
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
