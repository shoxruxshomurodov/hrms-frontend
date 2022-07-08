import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import RelativesScheme from "../../../../../schema/Relatives";
import { withTranslation } from "react-i18next";
const RelativesPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/relatives" },
    { id: 2, title: "Relatives", url: "/relatives" }
  ];
  const ItemHeadTitles = ["ID","Relation Ship","First Name","Last Name","Middle Name","Address","Work Place","Phone Number"];
  return (
    <GridView
      storeName="relatives"
      entityName="relatives"
      url="relatives"
      scheme={RelativesScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/relatives/create"}
      hideIcon={true}
    />
  );
};

export default withTranslation("HRMS")(RelativesPage);
