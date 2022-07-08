import React from "react";
import GridView from "../../../../../../../containers/GridView";
import Pagination from "../../../../../../../components/Pagination/custom/Pagination";
import ToolBarStructureRelation from "../../../../../../../components/ToolBar/ToolBarStructureRelation";
import ItemHead from "../../../containers/StructureRelation/component/ItemHead";
import ItemBody from "../../../containers/StructureRelation/component/ItemHead";
import BreadCrumb from "../../../../../../../components/Breadcrumb";
import StructureScheme from "../../../../../../../schema/Structure";
import { withTranslation } from "react-i18next";
const StructureRelationPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Structure"), url: "/structure" },
    { id: 2, title: "Structure Relation", url: "/structure" }
  ];
  const ItemHeadTitles = ["ID", "Title", "Code","Status","Level","Type","Rating"];
  return (
    <GridView
      storeName="structure-relation"
      entityName="structure"
      url="structure-relation"
      scheme={StructureScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarStructureRelation}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentBody={ItemBody}
      ComponentHeadTitles={ItemHeadTitles}
      encoded={encoded}
      createUrl="/structure-relation/create"
    />
  );
};

export default withTranslation("HRMS")(StructureRelationPage);
