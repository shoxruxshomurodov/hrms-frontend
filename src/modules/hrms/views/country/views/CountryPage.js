import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import CountryScheme from "../../../../../schema/Country";
import { withTranslation } from "react-i18next";
const CountryPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/country" },
    { id: 2, title: "Country", url: "/country" }
  ];
  const ItemHeadTitles = ["ID", "Title"];
  return (
    <GridView
      storeName="country"
      entityName="country"
      url="country"
      scheme={CountryScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/country/create"}
    />
  );
};

export default withTranslation("HRMS")(CountryPage);
