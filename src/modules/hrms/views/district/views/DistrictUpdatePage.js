import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {connect, useDispatch, useSelector} from "react-redux";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {get} from "lodash";
import DistrictScheme from "../../../../../schema/District";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";

const DistrictUpdatePage = ({t,match:{params:{id}},callToUpdate}) => {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
      get(state, "normalizer.data.district.result", [])
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);

  const getOne = (id) => {
    const storeName = "district";
    const entityName = "district";
    const scheme = DistrictScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `district/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };

  useEffect(() => {
    getOne(id);
  }, []);
  const update = (attributes) => {
    setIsFetched("Update");
    callToUpdate({id,attributes,formMethods: {setIsFetched}})
  };
  const response = Normalizer.Denormalize(result, DistrictScheme, entities);
  const values = [
    {
      id: 1,
      name: "title",
      type: "input",
      defaultValue: get(response, "title")
    },
    {
      id:2,
      name:"mapSvg",
      type:"textarea",
      defaultValue: get(response, "textarea")
    }
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/district" },
          {
            id: 2,
            title: "District",
            url: `/district/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/district/update/${id}`
          },
          {id: 4, title: get(response, "title", ""), url: ``}
        ]}
      />
      <UpdateForm
          formRequest={update}
          values={values}
          CustomButton={CustomButton}
          cancelLink={"/district"}
          buttonText={"Update"}
          isFetched={isFetched}
          params={{required: false}}
          property={{disabled: false}}
      />
      <ToastContainer/>
    </>
  );
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    callToUpdate: ({
                     id,
                     attributes,
                     url = 'district',
                     formMethods = {},
                     scheme = DistrictScheme,
                     storeName = 'district',
                     entityName = 'district'
                   }) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          url:`${url}/${id}`,
          formMethods,
          scheme,
          storeName,
          entityName,
          cb: {
            success: (nData, data) => {
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 1000
              });
              setTimeout(() => {
                window.history.back();
              }, 1000);
            },
          }
        }
      });
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("HRMS")(DistrictUpdatePage));
