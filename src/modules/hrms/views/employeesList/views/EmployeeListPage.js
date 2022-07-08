import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import EmployeesScheme from "../../../../../schema/Employees";

const EmployeeListPage = (props) => {
  const {
    t,
    match: {
      params: {encoded}
    }
  } = props;
  const BreadCrumbTitles = [
    {id: 1, title: t("Справочник"), url: "/employees"},
    {id: 2, title: t("Employee List"), url: "/employees"}
  ];
  const ItemHeadTitles = [
        {key: 'id', name: t("ID")},
        {key: 'name', name: t("Full Name")},
        {key: 'conditionTitle', name: t("Condition Title")},
        {key: 'passport', name: t("Passport")},
        {key: 'pinfl', name: t("Pinfl")}
      ]
  ;

  return (
      <GridView
          storeName="employees-list"
          entityName="employees-list"
          url="employees/all"
          scheme={EmployeesScheme}
          CustomPagination={Pagination}
          CustomToolbar={ToolBarDocument}
          CustomBreadcrumb={BreadCrumb}
          BreadCrumbTitles={BreadCrumbTitles}
          ComponentHead={ItemHead}
          ComponentHeadTitles={ItemHeadTitles}
          ComponentBody={ItemBody}
          encoded={encoded}
          createUrl={"/employees/create"}
          isItemHeadTitleObject={true}
      />
  );
};

export default withTranslation("HRMS")(EmployeeListPage);
