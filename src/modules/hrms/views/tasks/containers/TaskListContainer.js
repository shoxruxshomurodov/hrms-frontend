import React from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {forEach, get} from "lodash";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarTaskList from "../../../../../components/ToolBar/ToolBarTaskList";
import BreadCrumb from "../../../../../components/Breadcrumb";
import ItemHead from "../components/ItemHead";
import ItemBody from "../components/ItemBody";
import TaskScheme from "../../../../../schema/Task";

const TaskListContainer = ({t, match: {params: {encoded}}, user, ...props}) => {

    const BreadCrumbTitles = [
        {id: 1, title: t("Tasks list"), url: "/task/list"},
    ];
    const ItemHeadTitles = [
        {name:"id",title:t("ID")},
        {name:"title",title:t("Title")},
        {name:"processName",title:t("Process name")},
        {name:"createdAt",title:t("Created date")},
        {name:"Status",title:t("Status")},
    ];

    return (
        <GridView
            storeName="user-task-list"
            entityName="task"
            url={`tasks-user/list-full2`}
            scheme={TaskScheme}
            CustomPagination={Pagination}
            CustomToolbar={ToolBarTaskList}
            CustomBreadcrumb={BreadCrumb}
            BreadCrumbTitles={BreadCrumbTitles}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            ComponentHeadTitles={ItemHeadTitles}
            encoded={encoded}
            params={{
                types: ["WAITING"],
                authorities: get(user, 'accessQueryBpms', [])
            }}
            createUrl={''}
            baseUrl={'bpmn'}
            method={'post'}
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

export default withTranslation("HRMS")(withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskListContainer)));
