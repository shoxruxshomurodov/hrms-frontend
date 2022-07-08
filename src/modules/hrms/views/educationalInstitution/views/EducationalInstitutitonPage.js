import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import EducationalInstitutionScheme from "../../../../../schema/EducationalInstitution";
import { withTranslation } from "react-i18next";
const EducationalInstitutitonPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/educational-institution" },
    { id: 2, title: "Educational Institution", url: "/educational-institution" }
  ];
  const ItemHeadTitles = ["ID", "Title"];
  return (
    <GridView
      storeName="educational-institution"
      entityName="educational-institution"
      url="educational-institution"
      scheme={EducationalInstitutionScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/educational-institution/create"}
    />
  );
};

export default withTranslation("HRMS")(EducationalInstitutitonPage);
