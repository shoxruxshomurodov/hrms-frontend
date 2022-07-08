import React from "react";
import GridView from "../../../../../../containers/GridView";
import Pagination from "../../../../../../components/Pagination/custom/Pagination";
import ToolBarLanguage from "../../../../../../components/ToolBar/ToolBarLanguage";
import ItemHead from "../../component/ItemHead"
import ItemBody from "../../component/ItemBody"
import BreadCrumb from "../../../../../../components/Breadcrumb";
import LanguageScheme from "../../../../../../schema/Language";
import {withTranslation} from "react-i18next";

const LanguagesPage = ({t, match: {params: {encoded}}}) => {

  const BreadCrumbTitles = [{id: 1, title: t("Language"), url: `/language`}];
  const ItemHeadTitles = [t("ID"), t("Title"), "UZ", "RU"]
  return (
      <GridView
          storeName="language"
          entityName="language"
          url="language/list"
          scheme={LanguageScheme}
          CustomPagination={Pagination}
      CustomToolbar={ToolBarLanguage}
      CustomBreadcrumb={BreadCrumb}
      BreadCrumbTitles={BreadCrumbTitles}
      ComponentHead={ItemHead}
      ComponentHeadTitles={ItemHeadTitles}
      ComponentBody={ItemBody}
      encoded={encoded}
      params={{locale:"en"}}
    />
  );
};

export default withTranslation("HRMS")(LanguagesPage);
