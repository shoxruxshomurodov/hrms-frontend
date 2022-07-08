import React from "react";
import GridView from "../../../../../../../containers/GridView";
import Pagination from "../../../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../../../containers/Document/component/ItemHead";
import ItemBody from "../../../containers/Document/component/ItemBody";
import BreadCrumb from "../../../../../../../components/Breadcrumb";
import DocumentScheme from "../../../../../../../schema/Document";
import { withTranslation } from "react-i18next";
const DocumentPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Documents"), url: "/document" },
    { id: 2, title: "Document", url: "/document" }
  ];
  const ItemHeadTitles = ["ID", "Title", "Description"];
  return (
    <GridView
      storeName="document"
      entityName="document"
      url="template-document"
      scheme={DocumentScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/template-document/create"}
    />
  );
};

export default withTranslation("HRMS")(DocumentPage);
