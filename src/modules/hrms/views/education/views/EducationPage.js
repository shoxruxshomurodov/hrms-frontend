import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import EducationScheme from "../../../../../schema/Education";
import { withTranslation } from "react-i18next";
const EducationPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/education" },
    { id: 2, title: "Education", url: "/education" }
  ];
  const ItemHeadTitles =[
    "ID",
    "Diploma Qualification",
    "Educational Institution",
    "Faculty",
    "Form Study",
    "Speciality",
    "Receipt Date",
    "Expiration Date",
    "Type"
  ];
  return (
    <GridView
      storeName="education"
      entityName="education"
      url="education"
      scheme={EducationScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/education/create"}
    />
  );
};

export default withTranslation("HRMS")(EducationPage);
