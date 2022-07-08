import React from "react";
import GridView from "../../../../../../../containers/GridView";
import Pagination from "../../../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "../../../../../../../components/ToolBar/ToolBarStructure";
import ItemHead from "../../../containers/Structure/component/ItemHead";
import ItemBody from "../../../containers/Structure/component/ItemBody";
import BreadCrumb from "../../../../../../../components/Breadcrumb";
import StructureScheme from "../../../../../../../schema/Structure";
import { withTranslation } from "react-i18next";
const StructurePage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Structure"), url: "/structure" },
    { id: 2, title: "Structure", url: "/structure" }
  ];
  const ItemHeadTitles = [
    "ID",
    "Title",
    "altAbsCode",
    "status",
    "rootStructureId",
    "structureTypeId"
  ];
  return (
    <GridView
      storeName="structure"
      entityName="structure"
      url="structure"
      scheme={StructureScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarStructure}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentBody={ItemBody}
      ComponentHeadTitles={ItemHeadTitles}
      encoded={encoded}
      params={{ isDeleted: false }}
      createUrl="/structure/create"
      hasSelectFilter={true}
    />
  );
};

export default withTranslation("HRMS")(StructurePage);
