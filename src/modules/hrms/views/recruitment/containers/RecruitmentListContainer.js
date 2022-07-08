import React from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get} from "lodash";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "../../../../../components/ToolBar/ToolBarStructure";
import BreadCrumb from "../../../../../components/Breadcrumb";
import ItemHead from "../components/ItemHead";
import ItemBody from "../components/ItemBody";
import RecruitmentScheme from "../../../../../schema/Recruitment";

const RecruitmentListContainer = ({t, match: {params: {encoded}}, user, ...props}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Recruitment list"), url: "/recruitment"},
    ];
    const ItemHeadTitles = [
        "ID",
        "Employee",
        "Staff",
        "Rate"
    ];
    return (
        <GridView
            storeName="recruitment"
            entityName="recruitment"
            url={`recruitment`}
            scheme={RecruitmentScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/recruitment/create'}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        user: get(state, 'authCheck.user', {})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default withTranslation("HRMS")(withRouter(connect(mapStateToProps, mapDispatchToProps)(RecruitmentListContainer)));
