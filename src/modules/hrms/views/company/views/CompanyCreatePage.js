import React, { useState } from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import { useDispatch } from 'react-redux';
import Actions from "../../../Actions";
function CompanyCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch()
  const create = (attributes) => {
    setIsFetched("Create");
    dispatch({
      type: Actions.COMPANY_CREATE.REQUEST,
      payload: {
        attributes,
        cb: {
          success: (nData, data) => {
            setIsFetched(false)
            toast.dismiss();
            toast.success('Успешно', {
              position: "top-right",
              autoClose:1000,
            })
            setTimeout(() => {
              window.history.back()
            },1000)
          },
          fail: (e) => {
            setIsFetched(false)
            toast.dismiss();
            toast.error("Ошибка", {
              position: "top-right",
              autoClose: 1000,
            })
          },
        },
      },
    });
  };
  const { t } = props;
  const values = [
    { id: 1,label:"Tin", name: "tin", sort:"number", type: "input", params: { required: true } },
    { id: 2,label:"Title", name: "title", type: "input", params: { required: true } },
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/company" },
          { id: 2, title: "Company", url: "/company" },
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/company"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(CompanyCreatePage);
