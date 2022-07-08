import React, { useState, useEffect } from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { ToastContainer,toast } from "react-toastify";
import { get } from "lodash";
import GspRegionScheme from "../../../../../schema/GspRegion";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Loader from "../../../../../components/Loader/Loader";
function GspRegionUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.gsp-region.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.gsp-region.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getGspRegion = (id) => {
    const storeName = "gsp-region";
    const entityName = "gsp-region";
    const scheme = GspRegionScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `gsp-region/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    const { id } = props.match.params;
    getGspRegion(id);
  }, []);
  const update = (attributes) => {
    const { id } = props.match.params;
    setIsFetched("Update");
    dispatch({
      type: Actions.GSP_REGION_CONTROLLER_UPDATE.REQUEST,
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
  const response = Normalizer.Denormalize(result, GspRegionScheme, entities);

  const values = [
    {
      id: 1,
      name: "title",
      type: "input",
      defaultValue: get(response, "title")
    },
    { id: 2, label:"Gsp Country", name: "gspCountryId", type: "select-pagination",url:"gsp-country",asyncSelectProperty:["id", "title", "id"],value:{value:get(response,"gspCountry.id"),label:get(response,"gspCountry.title")}, params: { required: true } },
  ];
  if(!isFetchedProps) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/gsp-region" },
          {
            id: 2,
            title: "Gsp Region",
            url: `/gsp-region/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/gsp-region/update/${id}`
          },
          { id: 4, title: get(response, "title", ""), url: `` }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/gsp-region"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(GspRegionUpdatePage);
