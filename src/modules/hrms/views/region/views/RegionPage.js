import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import RegionScheme from "../../../../../schema/Region";
import { withTranslation } from "react-i18next";
const RegionPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/region" },
    { id: 2, title: "Region", url: "/region" }
  ];
  const ItemHeadTitles = ["ID", "Title","Country"];
  return (
    <GridView
      storeName="region"
      entityName="region"
      url="region"
      scheme={RegionScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/region/create"}
    />
  );
};

export default withTranslation("HRMS")(RegionPage);
