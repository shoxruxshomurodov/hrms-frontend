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
import SkillScheme from "../../../../../schema/SkillScheme";

const ListContainer = ({
                           t,
                           encoded,
                           ...rest
                       }) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Skill list"), url: "/skill"},
    ];
    const ItemHeadTitles = [
        "ID",
        "Title",
    ];
    return (
        <GridView
            storeName="skill-list"
            entityName="skill"
            customUrl={'skill'}
            url={`skill`}
            scheme={SkillScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/skill/create'}
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
