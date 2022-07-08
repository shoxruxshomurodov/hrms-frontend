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

const ListContainer = ({t, match: {params: {encoded}}, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Vacancy list"), url: "/vacancy/list"},
    ];
    const ItemHeadTitles = [
        t("ID"),
        t("Title"),
        t("Position"),
        t("Specialty"),
        t("Country"),
        t("Region"),
        t("District"),
        t("Status")
    ];
    return (
        <GridView
            storeName="vacancy"
            entityName="vacancy"
            url={`vacancy?isDeleted=false`}
            scheme={VacancyScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/vacancy/create'}
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
