import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import GspCountryScheme from "../../../../../schema/GspCountry";
import { withTranslation } from "react-i18next";
import RequestsScheme from "../../../../../schema/Requests";
const EmployeeRequestsPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/employee-request" },
    { id: 2, title: "Employee Requests", url: "/employee-request" }
  ];
  const ItemHeadTitles = ["ID", "Full Name","Status","Passport","Pinfl"];
  return (
    <GridView
      storeName="employee-requests"
      entityName="employee-requests"
      url="requests/employee-requests"
      scheme={RequestsScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/requests/create"}
      params={{
        requestAbleType:"com.hrms.entity.AuthUser"
      }}
    />
  );
};

export default withTranslation("HRMS")(EmployeeRequestsPage);
