import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import NationalityScheme from "../../../../../schema/Nashion";
import { withTranslation } from "react-i18next";
const NationalityPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/nationality" },
    { id: 2, title: "Nationality", url: "/nationality" }
  ];
  const ItemHeadTitles = ["ID", "Title"];
  return (
    <GridView
      storeName="nationality"
      entityName="nationality"
      url="nationality"
      scheme={NationalityScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/nationality/create"}
    />
  );
};

export default withTranslation("HRMS")(NationalityPage);
