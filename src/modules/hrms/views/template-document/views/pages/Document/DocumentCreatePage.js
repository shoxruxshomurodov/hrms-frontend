import React, { useState } from "react";
import CreateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../../Api";
import Breadcrumb from "../../../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

function DocumentCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const create = (data) => {
    setIsFetched("Create");
    Api.templateDocumentCreate(data)
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно создан");
        setTimeout(() => {
          window.history.back();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify(e.response.data.message);
      });
  };
  const { t } = props;
  const values = [
    { id: 1, name: "title", type: "input", params: { required: true } },
    { id: 2, name: "description", type: "textarea" }
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Documents"), url: "/document" },
          { id: 2, title: "Document", url: "/document" },
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/document"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(DocumentCreatePage);
