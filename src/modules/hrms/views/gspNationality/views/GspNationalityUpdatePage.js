import React, { useState, useEffect } from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { ToastContainer,toast } from "react-toastify";
import { get } from "lodash";
import GspNationalityScheme from "../../../../../schema/GspNationality";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
function GspNationalityUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.gps-nationality.result", [])
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "gps-nationality";
    const entityName = "gps-nationality";
    const scheme = GspNationalityScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `gsp-nationality/${id}`,
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
      type: Actions.GSP_NATIONALITY_CONTROLLER_UPDATE.REQUEST,
      payload: {
        id,
        attributes,
        cb: {
          success: () => {
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
  const response = Normalizer.Denormalize(result, GspNationalityScheme, entities);
  const values = [
    {
      id: 1,
      name: "id",
      label:"Id",
      type: "input",
      sort:"number",
      defaultValue: get(response, "id")
    },
    {
      id: 2,
      label:"Title",
      name: "title",
      type: "input",
      defaultValue: get(response, "title")
    },
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/gsp-nationality" },
          {
            id: 2,
            title: "Gsp Nationality",
            url: `/gsp-nationality/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/gsp-nationality/update/${id}`
          },
          { id: 4, title: get(response, "title", ""), url: `` }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/gsp-nationality"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(GspNationalityUpdatePage);
