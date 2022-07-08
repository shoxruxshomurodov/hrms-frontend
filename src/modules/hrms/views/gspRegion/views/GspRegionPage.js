import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import GspRegionScheme from "../../../../../schema/GspRegion";
import { withTranslation } from "react-i18next";
const GspRegionPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/gsp-region" },
    { id: 2, title: "Gsp Region", url: "/gsp-region" }
  ];
  const ItemHeadTitles = ["ID", "Title","Gsp Country","Region"];
  return (
    <GridView
      storeName="gsp-region"
      entityName="gsp-region"
      url="gsp-region"
      scheme={GspRegionScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/gsp-region/create"}
    />
  );
};

export default withTranslation("HRMS")(GspRegionPage);
