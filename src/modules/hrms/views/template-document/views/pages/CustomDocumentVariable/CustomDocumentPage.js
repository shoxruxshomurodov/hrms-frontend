import React from "react";
import GridView from "../../../../../../../containers/GridView";
import Pagination from "../../../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../../../containers/CustomDocumentVariable/component/ItemHead";
import ItemBody from "../../../containers/CustomDocumentVariable/component/ItemBody";
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
    { id: 1, title: t("Documents"), url: "/custom-document" },
    { id: 2, title: "Custom Document Variable", url: "/custom-document" }
  ];
  const ItemHeadTitles = ["ID","Title", "Description", "Code", "Value"];
  return (
    <GridView
      storeName="custom-document"
      entityName="document"
      url="template-document-custom-var"
      scheme={DocumentScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl="/custom-document/create"
    />
  );
};

export default withTranslation("HRMS")(DocumentPage);
