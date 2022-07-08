import React, { useState, useEffect } from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { ToastContainer,toast } from "react-toastify";
import { get } from "lodash";
import BusinessProcessScheme from "../../../../../schema/BusinessProcess";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
function BusinessProcessUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
      get(state, "normalizer.data.business-process.result", [])
  );
  const entities = useSelector((state) =>
      get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "business-process";
    const entityName = "business-process";
    const scheme = BusinessProcessScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `business-process/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    const { id } = props.match.params;
    getOne(id);
  }, []);
  const update = (attributes) => {
    const { id } = props.match.params;
    setIsFetched("Update");
    dispatch({
      type: Actions.BUSINESS_PROCESS_UPDATE.REQUEST,
      payload: {
        id,
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
  const { id } = props.match.params;
  const response = Normalizer.Denormalize(result, BusinessProcessScheme, entities);
  const values = [
    { id: 1, label:"Title",name: "title", type: "input", defaultValue:get(response,"title") },
    { id: 2,label:"Process name", name: "processName", type: "input",defaultValue:get(response,"processName")},
    { id: 3,label:"Code", name: "code", type: "input", defaultValue:get(response,"code")},
    { id: 4,label:"Entity", name: "entity", type: "input", defaultValue:get(response,"entity")},
    { id: 5,label:"Data", name: "data", type: "textarea", defaultValue:get(response,"data")},
    { id: 6,label:"Can start", name: "isCanStart", type: "checkbox",defaultValue:get(response,"isCanStart")},
    { id: 7,label:"Version tag", name: "versionTag", type: "input",defaultValue:get(response,"versionTag")},
  ];
  return (
      <>
        <Breadcrumb
            titles={[
              { id: 1, title: t("Справочник"), url: "/business-process" },
              {
                id: 2,
                title: "Business Process",
                url: `/business-process/view/${id}`
              },
              {
                id: 3,
                title: t("Update"),
                url: `/business-process/update/${id}`
              },
              { id: 4, title: get(response, "title", ""), url: `` }
            ]}
        />
        <UpdateForm
            formRequest={update}
            values={values}
            CustomButton={CustomButton}
            cancelLink={"/business-process"}
            buttonText={"Update"}
            isFetched={isFetched}
            params={{ required: false }}
            property={{ disabled: false }}
        />
        <ToastContainer />
      </>
  );
}

export default withTranslation("HRMS")(BusinessProcessUpdatePage);
