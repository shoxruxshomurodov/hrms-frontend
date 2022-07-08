import React, { useState } from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import { useDispatch } from 'react-redux';
import Actions from "../../../Actions";
function PositionCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch()
  const create = (attributes) => {
    setIsFetched("Create");
    dispatch({
      type: Actions.POSITION_CONTROLLER_CREATE.REQUEST,
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
  const status = [{
    value:"ACTIVE",
    label:"ACTIVE"
  },{
    value:"PASSIVE",
    label:"PASSIVE"
  }]
  const values = [
    { id: 1,label:"Title", name: "title", type: "input", params: { required: true } },
    { id: 2,label:"Group",  name: "group", type: "input", params: { required: true } },
    { id: 3,label:"Status",  name: "status", type: "select",options:status, params: { required: true } },
    { id: 4,label:"Rank",  name: "rank",sort:"number", type: "input", params: { required: true } },
    { id: 5,label:"Code",  name: "code", type: "input", params: { required: true } },
    { id: 6,label:"Description",  name: "description", type: "textarea", params: { required: true } },
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/position" },
          { id: 2, title: "Position", url: "/position" },
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/position"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(PositionCreatePage);
