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
import VacationGraphic from "../../../../../schema/VacationGraphic";
import BlacklistEmployeeScheme from "../../../../../schema/BlacklistEmployeeScheme";

const ListContainer = ({t, match: {params: {encoded}}, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Blacklist employee"), url: "/blacklist-employee"},
    ];
    const ItemHeadTitles = [
        t("ID"),
        t("Employee"),
        t("Expire date"),
    ];
    return (
        <GridView
            storeName="blacklist-employee"
            entityName="blacklistEmployee"
            url={`blacklist-employee`}
            scheme={BlacklistEmployeeScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/blacklist-employee/create'}
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
