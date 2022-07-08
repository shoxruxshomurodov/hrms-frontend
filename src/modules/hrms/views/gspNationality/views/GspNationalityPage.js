import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import GspNationalityScheme from "../../../../../schema/GspNationality";
import { withTranslation } from "react-i18next";
const GspNationalityPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/gsp-nationality" },
    { id: 2, title: "Gsp Nationality", url: "/gsp-nationality" }
  ];
  const ItemHeadTitles = [
    "ID",
    "Title",
    "Nationality"
  ];
  return (
    <GridView
      storeName="gsp-nationality"
      entityName="gsp-nationality"
      url="gsp-nationality"
      scheme={GspNationalityScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/gsp-nationality/create"}
    />
  );
};

export default withTranslation("HRMS")(GspNationalityPage);
