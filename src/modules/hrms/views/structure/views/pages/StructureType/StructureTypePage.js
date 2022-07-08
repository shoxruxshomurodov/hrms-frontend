import React from "react";
import GridView from "../../../../../../../containers/GridView";
import Pagination from "../../../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "../../../../../../../components/ToolBar/ToolBarStructure";
import ItemHead from "../../../containers/StructureType/component/ItemHead";
import ItemBody from "../../../containers/StructureType/component/ItemBody";
import BreadCrumb from "../../../../../../../components/Breadcrumb";
import StructureScheme from "../../../../../../../schema/Structure";
import { withTranslation } from "react-i18next";
const StructureTypePage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Structure"), url: "/structure-type"},
    { id: 2, title: "Structure Type", url: "/structure-type"}
  ];
  const ItemHeadTitles = [
    "ID",
    "Title",
    "Code",
    "Status",
    "Level",
    "Type",
    "Rating"
  ];
  return (
    <GridView
      storeName="structure-type"
      entityName="structure"
      url="structure-type"
      scheme={StructureScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarStructure}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentBody={ItemBody}
      ComponentHeadTitles={ItemHeadTitles}
      encoded={encoded}
      createUrl="/structure-type/create"
      params={{isDeleted:false}}
    />
  );
};

export default withTranslation("HRMS")(StructureTypePage);
