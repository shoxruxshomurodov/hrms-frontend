import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import DiplomaQualificationScheme from "../../../../../schema/DiplomaQualification";
import { withTranslation } from "react-i18next";
const DiplomaQualificationPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/diploma-qualification" },
    { id: 2, title: "Diploma qualification", url: "/diploma-qualification" }
  ];
  const ItemHeadTitles = ["ID", "Title"];
  return (
    <GridView
      storeName="diploma-qualification"
      entityName="diploma-qualification"
      url="diploma-qualification"
      scheme={DiplomaQualificationScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/diploma-qualification/create"}
    />
  );
};

export default withTranslation("HRMS")(DiplomaQualificationPage);
