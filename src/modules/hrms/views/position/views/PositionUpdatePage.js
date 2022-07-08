import React, { useState, useEffect } from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { ToastContainer,toast } from "react-toastify";
import { get } from "lodash";
import PositionScheme from "../../../../../schema/Position";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Loader from "../../../../../components/Loader/Loader"
function PositionUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.position.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.position.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "position";
    const entityName = "position";
    const scheme = PositionScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `position/${id}`,
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
      type: Actions.POSITION_CONTROLLER_UPDATE.REQUEST,
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
  const response = Normalizer.Denormalize(result, PositionScheme, entities);
  const status = [{
    value:"ACTIVE",
    label:"ACTIVE"
  },{
    value:"PASSIVE",
    label:"PASSIVE"
  }]
  const values = [
    { id: 1,label:"Title", name: "title", defaultValue:get(response,"title") ,type: "input", params: { required: true } },
    { id: 2,label:"Group",  name: "group",defaultValue:get(response,"group") , type: "input", params: { required: true } },
    { id: 3,label:"Status",  name: "status",options:status,defaultValue:{value:get(response,"status")?.toUpperCase(),label:get(response,"status")?.toUpperCase()}  , type: "select", params: { required: true } },
    { id: 4,label:"Rank",  name: "rank",defaultValue:get(response,"rank") ,sort:"number", type: "input", params: { required: true } },
    { id: 5,label:"Code",  name: "code",defaultValue:get(response,"code") , type: "input", params: { required: true } },
    { id: 6,label:"Description",  name: "description",defaultValue:get(response,"description") , type: "textarea", params: { required: true } },
  ];

  if(!isFetchedProps) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/position" },
          {
            id: 2,
            title: "Position",
            url: "/position"
          },
          {
            id: 3,
            title: t("Update"),
            url: `/position/update/${id}`
          },
          { id: 4, title: get(response, "title", ""), url: `` }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/position"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(PositionUpdatePage);
