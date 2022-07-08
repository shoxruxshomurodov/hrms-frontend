import React from "react";
import GridView from "../../../../../containers/GridView";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarDocument from "../../../../../components/ToolBar/ToolBarDocument";
import ItemHead from "../component/ItemHead";
import ItemBody from "../component/ItemBody";
import BreadCrumb from "../../../../../components/Breadcrumb";
import SpecialityScheme from "../../../../../schema/Speciality";
import { withTranslation } from "react-i18next";
const SpecialityPage = (props) => {
  const {
    t,
    match: {
      params: { encoded }
    }
  } = props;
  const BreadCrumbTitles = [
    { id: 1, title: t("Справочник"), url: "/speciality" },
    { id: 2, title: "Speciality", url: "/speciality" }
  ];
  const ItemHeadTitles = ["ID", "Title"];
  return (
    <GridView
      storeName="speciality"
      entityName="speciality"
      url="speciality"
      scheme={SpecialityScheme}
      CustomPagination={Pagination}
      CustomToolbar={ToolBarDocument}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      createUrl={"/speciality/create"}
    />
  );
};

export default withTranslation("HRMS")(SpecialityPage);
