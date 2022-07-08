import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import GspDistrictScheme from "../../../../../schema/GspDistrict";
import { withTranslation } from "react-i18next";
const GspDistrictPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/gsp-district" },
    { id: 2, title: "Gsp District", url: "/gsp-district" }
  ];
  const ItemHeadTitles = [
    "ID",
    "Title",
    "District",
    "Gsp Country",
    "Gsp Region",
  ];
  return (
    <GridView
      storeName="gsp-district"
      entityName="gsp-district"
      url="gsp-district"
      scheme={GspDistrictScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/gsp-district/create"}
    />
  );
};

export default withTranslation("HRMS")(GspDistrictPage);
