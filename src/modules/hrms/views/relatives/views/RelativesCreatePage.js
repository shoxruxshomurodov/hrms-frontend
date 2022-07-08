import React, { useState } from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Actions from "../../../Actions";
function RelativesCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const create = (attributes) => {
    setIsFetched("Create");
    dispatch({
      type: Actions.RELATIVES_CREATE.REQUEST,
      payload: {
        attributes,
        cb: {
          success: (nData, data) => {
            setIsFetched(false);
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000
            });
            setTimeout(() => {
              window.history.back();
            }, 1000);
          },
          fail: (e) => {
            setIsFetched(false);
            toast.dismiss();
            toast.error("Ошибка", {
              position: "top-right",
              autoClose: 1000
            });
          }
        }
      }
    });
  };
  const { t } = props;
  const relationShip = [
    { value: "FATHER", label: "FATHER" },
    { value: "MOTHER", label: "MOTHER" },
    { value: "BROTHER", label: "BROTHER" },
    { value: "SISTER", label: "SISTER" },
    { value: "LITTLE_BROTHER", label: "LITTLE_BROTHER" },
    { value: "LITTLE_SISTER", label: "LITTLE_SISTER" },
    { value: "HUSBAND", label: "HUSBAND" },
    { value: "WIFE", label: "WIFE" },
    { value: "FATHER_IN_LAW", label: "FATHER_IN_LAW" },
    { value: "MOTHER_IN_LAW", label: "MOTHER_IN_LAW" },
    { value: "SON", label: "SON" },
    { value: "DAUGHTER", label: "DAUGHTER" },
    { value: "EX_HUSBAND", label: "EX_HUSBAND" },
    { value: "EX_WIFE", label: "EX_WIFE" }
  ];
  const values = [
    { id: 1,label:"User Id", name: "userId", sort:"number", type: "input", params: { required: true } },
    { id: 2, label:"Title",name: "passport", type: "input", params: { required: true } },
    {
      id: 3,
      label: "Personal Identification Number",
      name: "personalIdentificationNumber",
      type: "input",
      params: { required: true }
    },
    {
      id: 4,
      label: "Relationship",
      name: "relationship",
      type: "select",
      options: relationShip,
      params: { required: true }
    }
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/relatives" },
          { id: 2, title: "Relatives", url: "/relatives" },
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/relatives"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(RelativesCreatePage);
