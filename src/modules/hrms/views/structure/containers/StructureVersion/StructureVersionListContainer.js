import React from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get} from "lodash";
import GridView from "../../../../../../containers/GridView";
import Pagination from "../../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "../../../../../../components/ToolBar/ToolBarStructure";
import BreadCrumb from "../../../../../../components/Breadcrumb";
import ItemHead from "../../components/ItemHead";
import ItemBody from "../../components/ItemBody";
import StructureVersionScheme from "../../../../../../schema/StructureVersion";

const StructureVersionListContainer = ({t, match: {params: {encoded}}, user, ...rest}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Structure version list"), url: "/structure-version-list"},
    ];
    const ItemHeadTitles = [
        "ID",
        "Title",
        "Created date",
    ];
    return (
        <GridView
            storeName="structure-version-list"
            entityName="structure-version"
            url={`structure-version`}
            scheme={StructureVersionScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarStructure}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{}}
            createUrl={'/structure-version/create'}
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

export default withTranslation("HRMS")(withRouter(connect(mapStateToProps, mapDispatchToProps)(StructureVersionListContainer)));
