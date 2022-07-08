import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import DistrictScheme from "../../../../../schema/District";
import { withTranslation } from "react-i18next";
const DistrictPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/district" },
    { id: 2, title: "District", url: "/district" }
  ];
  const ItemHeadTitles = ["ID", "Title","Country","Region"];
  return (
    <GridView
      storeName="district"
      entityName="district"
      url="district"
      scheme={DistrictScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/district/create"}
    />
  );
};

export default withTranslation("HRMS")(DistrictPage);
