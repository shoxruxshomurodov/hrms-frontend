import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import GspCountryScheme from "../../../../../schema/GspCountry";
import { withTranslation } from "react-i18next";
const GspCountryPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/gsp-country" },
    { id: 2, title: "Gsp Country", url: "/gsp-country" }
  ];
  const ItemHeadTitles = ["ID", "Title","Country"];
  return (
    <GridView
      storeName="gsp-country"
      entityName="gsp-country"
      url="gsp-country"
      scheme={GspCountryScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/gsp-country/create"}
    />
  );
};

export default withTranslation("HRMS")(GspCountryPage);
