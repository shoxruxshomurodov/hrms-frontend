import React, {useState} from "react";
import CreateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../../Api";
import Breadcrumb from "../../../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {ToastContainer} from "react-toastify";

function StructureTypeCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const create = (data) => {
    setIsFetched("Create");
    Api.structureTypeCreate(data)
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
  const optionsType = [
    {
      value: "ORGANIZATION",
      label: "ORGANIZATION"
    },
    {
      value: "ADMINISTRATION",
      label: "ADMINISTRATION"
    },
    {
      value: "REGULAR",
      label: "REGULAR"
    }
  ];
  const values = [
    { id: 1, name: "title", type: "input" },
    {
      id: 2,
      label: "Structure Type",
      name: "structureTypeId",
      type: "select-pagination",
      url: "structure-type",
      asyncSelectProperty: ["id", "title", "code"],
      params: {required: true}
    },
    {
      id: 3,
      label: "Type",
      name: "type",
      type: "select",
      options: optionsType,
      params: {required: true}
    },
    {id: 4, label: "Rating", sort: "number", name: "rating", type: "input"}
  ];
  const {t} = props;

  return (
    <>
      <Breadcrumb
        titles={[
          {id: 1, title: t("Structure"), url: "/structure-type"},
          {id: 2, title: "Structure Type", url: "/structure-type"},
          {id: 3, title: t("Create"), url: ""}
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/structure-type"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: true }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(StructureTypeCreatePage);
