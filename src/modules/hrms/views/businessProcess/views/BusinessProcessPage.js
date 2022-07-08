import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import BusinessProcessScheme from "../../../../../schema/BusinessProcess";
import { withTranslation } from "react-i18next";
const BusinessProcessPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/business-process" },
    { id: 2, title: t("Business Process"), url: "/business-process" }
  ];
  const ItemHeadTitles = ["ID", "Title","Process name","Code","Entity","Version"];
  return (
      <GridView
          storeName="business-process"
          entityName="business-process"
          url="business-process"
          scheme={BusinessProcessScheme}
          CustomPagination={Pagination}
          CustomToolbar={ToolBarDocument}
          CustomBreadcrumb={BreadCrumb}
          BreadCrumbTitles={BreadCrumbTitles}
          ComponentHead={ItemHead}
          ComponentHeadTitles={ItemHeadTitles}
          ComponentBody={ItemBody}
          encoded={encoded}
          createUrl={"/business-process/create"}
      />
  );
};

export default withTranslation("HRMS")(BusinessProcessPage);
