import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {get} from "lodash";
import CompanyScheme from "../../../../../schema/Company";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Loader from "../../../../../components/Loader/Loader";

function CompanyUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.company.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.company.result", [])
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "company";
    const entityName = "company";
    const scheme = CompanyScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `company/${id}`,
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
      type: Actions.COMPANY_UPDATE.REQUEST,
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
  const {id} = props.match.params;
  const response = Normalizer.Denormalize(result, CompanyScheme, entities);
  const values = [
    {
      id: 1,
      label: "Tin",
      name: "tin",
      sort:"number",
      type: "input",
      defaultValue: get(response, "tin")
    },
    {
      id: 2,
      label: "Title",
      name: "title",
      type: "input",
      defaultValue: get(response, "title")
    },

  ];
  if (!isFetchedProps) {
    return <Loader/>
  }
  return (
    <>
      <Breadcrumb
        titles={[
          {id: 1, title: t("Справочник"), url: "/company"},
          {
            id: 2,
            title: "Company",
            url: `/company/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/company/update/${id}`
          },
          {id: 4, title: get(response, "title", ""), url: ``}
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/company"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(CompanyUpdatePage);
