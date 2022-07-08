import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import CompanyScheme from "../../../../../schema/Company";
import { withTranslation } from "react-i18next";
const CompanyPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/company" },
    { id: 2, title: "Company", url: "/company" }
  ];
  const ItemHeadTitles = ["ID", "Title","Tin"];
  return (
    <GridView
      storeName="company"
      entityName="company"
      url="company"
      scheme={CompanyScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/company/create"}
    />
  );
};

export default withTranslation("HRMS")(CompanyPage);
