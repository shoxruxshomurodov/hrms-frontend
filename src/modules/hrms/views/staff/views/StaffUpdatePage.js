import React, { useState, useEffect } from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { ToastContainer,toast } from "react-toastify";
import { get } from "lodash";
import StaffScheme from "../../../../../schema/Staff";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Loader from "../../../../../components/Loader/Loader";
function StaffUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.staff.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.staff.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "staff";
    const entityName = "staff";
    const scheme = StaffScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `staff/${id}`,
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
      type: Actions.STAFF_CONTROLLER_UPDATE.REQUEST,
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
  const response = Normalizer.Denormalize(result, StaffScheme, entities);
  const status = [{
    value:"ACTIVE",
    label:"ACTIVE"
  },{
    value:"PASSIVE",
    label:"PASSIVE"
  }]
  const values = [
    {id: 1,label:"Title", defaultValue:get(response,"title"), name: "title", type: "input", params: {required: true}},
    {id: 2, label:"Structure",value:{value:get(response,"structure.id"),label:get(response,"structure.title")}, name: "structure_id", type: "select-pagination", url:"structure",asyncSelectProperty:["id","title","altAbsCode"], params: {required: true}},
    {id: 3, name: "status", type: "select",options:status, defaultValue:{value:get(response,"status")?.toUpperCase(),label:get(response,"status")?.toUpperCase()} ,label:"Status", params: {required: true}},
    {id: 4,label:"Rate",sort:"number", name: "rate",defaultValue:get(response,"rate"), type: "input", params: {required: true}},
    {id: 5,label:"Rank" ,name: "rank",sort:"number",defaultValue:get(response,"rank"), type: "input", params: {required: true}},
    {id: 6,label:"Position", name: "position_id",value:{value:get(response,"position.id"),label:get(response,"position.title")}, type: "select-pagination",url:"position",asyncSelectProperty:["id","title","code"], params: {required: true}},
    {id: 7,label:"Code",defaultValue:get(response,"code"), name: "code", type: "input", params: {required: true}},
    {id: 8,label:"Description",defaultValue:get(response,"description"), name: "description", type: "textarea", params: {required: true}},
  ];

  if(!isFetchedProps) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/staff" },
          {
            id: 2,
            title: "Staff",
            url: `/staff/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/staff/update/${id}`
          },
          { id: 4, title: get(response, "title", ""), url: `` }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/staff"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(StaffUpdatePage);
