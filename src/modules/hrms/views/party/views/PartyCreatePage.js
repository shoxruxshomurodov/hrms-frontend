import React, { useState } from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import { useDispatch } from 'react-redux';
import Actions from "../../../Actions";
function PartyCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch()
  const create = (attributes) => {
    setIsFetched("Create");
    dispatch({
      type: Actions.PARTY_CONTROLLER_CREATE.REQUEST,
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
    { id: 1, name: "title", type: "input", params: { required: true } },
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/party" },
          { id: 2, title: "Party", url: "/party" },
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/party"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(PartyCreatePage);
