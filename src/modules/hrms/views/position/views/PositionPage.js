import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import PositionScheme from "../../../../../schema/Position";
import { withTranslation } from "react-i18next";
const PositionPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/position" },
    { id: 2, title: "Position", url: "/position" }
  ];
  const ItemHeadTitles = [
    "ID",
    "Title",
    "Code",
    "Status"
  ];
  return (
    <GridView
      storeName="position"
      entityName="position"
      url="position"
      scheme={PositionScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/position/create"}
      params={{isDeleted:false}}
    />
  );
};

export default withTranslation("HRMS")(PositionPage);
