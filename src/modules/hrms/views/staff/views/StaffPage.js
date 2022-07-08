import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import StaffScheme from "../../../../../schema/Staff";
import { withTranslation } from "react-i18next";
const StaffPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/staff" },
    { id: 2, title: "Staff", url: "/staff" }
  ];
  const ItemHeadTitles = [
    "ID",
    "Title",
    "Code",
    "Status"
  ];
  return (
    <GridView
      storeName="staff"
      entityName="staff"
      url="staff"
      scheme={StaffScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/staff/create"}
      params={{isDeleted:false}}
    />
  );
};

export default withTranslation("HRMS")(StaffPage);
