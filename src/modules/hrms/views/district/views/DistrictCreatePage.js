import React, {useState} from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {connect, useDispatch} from 'react-redux';
import Actions from "../../../Actions";
import DistrictScheme from "../../../../../schema/District";
import ApiActions from "../../../../../services/api/Actions";

const DistrictCreatePage = ({t, callToAdd, ...rest}) => {
  const [isFetched, setIsFetched] = useState(false);
  const create = (attributes) => {
    setIsFetched("Create");
    callToAdd({attributes, formMethods: {setIsFetched}});
  };
  const values = [
    { id: 1, name: "title", type: "input", params: { required: true } },
    { id: 2,label:"Region", name: "regionId", type: "select-pagination",url:"region",asyncSelectProperty:["id","title","code"], params: { required: true } },
  ];
  return (
    <>
      <Breadcrumb
          titles={[
            {id: 1, title: t("Справочник"), url: "/district"},
            {id: 2, title: "District", url: "/district"},
            {id: 3, title: t("Create"), url: ""}
          ]}
      />
      <CreateForm
          formRequest={create}
          values={values}
          CustomButton={CustomButton}
          cancelLink={"/district"}
          buttonText={"Create"}
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
    callToAdd: ({
                  attributes,
                  url = 'district/',
                  formMethods = {},
                  scheme = DistrictScheme,
                  storeName = 'district',
                  entityName = 'district'
                }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          url,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("HRMS")(DistrictCreatePage));
