import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {get} from "lodash";
import GspDistrictScheme from "../../../../../schema/GspDistrict";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Loader from "../../../../../components/Loader/Loader";
function GspDistrictUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.gps-district.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.gps-district.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "gps-district";
    const entityName = "gps-district";
    const scheme = GspDistrictScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `gsp-district/${id}`,
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
      type: Actions.GSP_DISTRICT_CONTROLLER_UPDATE.REQUEST,
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
  const response = Normalizer.Denormalize(result, GspDistrictScheme, entities);
  const values = [
    {
      id: 1,
      name: "title",
      type: "input",
      defaultValue: get(response, "title")
    },
    {
      id: 2,
      label: "Gsp Region",
      value: {value: get(response, "gspRegion.id"), label: get(response, "gspRegion.title")},
      name: "gspRegionId",
      url: "gsp-region",
      type: "select-pagination",
      asyncSelectProperty: ["id", "title", "id"],
      params: {required: true}
    },
  ];

  if(!isFetchedProps) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/gsp-district" },
          {
            id: 2,
            title: "Gsp District",
            url: `/gsp-district/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/gsp-district/update/${id}`
          },
          { id: 4, title: get(response, "title", ""), url: `` }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/gsp-district"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(GspDistrictUpdatePage);
