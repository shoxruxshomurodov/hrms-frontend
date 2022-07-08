import React, { useState } from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Actions from "../../../Actions";
function BusinessProcessCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const create = (attributes) => {
    setIsFetched("Create");
    dispatch({
      type: Actions.BUSINESS_PROCESS_CREATE.REQUEST,
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
        },

      }
    });
  };
  const { t } = props;
  const values = [
    { id: 1, label:"Title",name: "title", type: "input", params: { required: true } },
    { id: 2,label:"Process name", name: "processName", type: "input", params: { required: true } },
    { id: 3,label:"Code", name: "code", type: "input", params: { required: true } },
    { id: 4,label:"Entity", name: "entity", type: "input", params: { required: true } },
    { id: 5,label:"Data", name: "data", type: "textarea", params: { required: true } },
    { id: 6,label:"Can start", name: "isCanStart", type: "checkbox" },
    { id: 7,label:"Version tag", name: "versionTag", type: "input" },
  ];
  return (
      <>
        <Breadcrumb
            titles={[
              { id: 1, title: t("Справочник"), url: "/business-process" },
              { id: 2, title: ("Business process"), url: "/business-process" },
              { id: 3, title: t("Create"), url: "" }
            ]}
        />
        <CreateForm
            formRequest={create}
            values={values}
            CustomButton={CustomButton}
            cancelLink={"/business-process"}
            buttonText={"Create"}
            isFetched={isFetched}
            params={{ required: false }}
            property={{ disabled: false }}
        />
        <ToastContainer />
      </>
  );
}

export default withTranslation("HRMS")(BusinessProcessCreatePage);
