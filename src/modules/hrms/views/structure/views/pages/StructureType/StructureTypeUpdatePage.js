import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../../Api";
import {get} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import StructureTypeScheme from "../../../../../../../schema/StructureType";
import Breadcrumb from "../../../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {ToastContainer} from "react-toastify";
import Normalizer from "../../../../../../../services/normalizer";
import ApiActions from "../../../../../../../services/api/Actions";
import Loader from "../../../../../../../components/Loader/Loader";

function StructureTypeUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.structure-type.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.structure-type.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const update = (data) => {
    const {id} = props.match.params;
    setIsFetched("Update");
    Api.structureTypeUpdate(id, data)
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно создан");
        setTimeout(() => {
          window.history.back();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify(e.response.data.message);
      });
  };
  const getStructureType = (id) => {
    const storeName = "structure-type";
    const entityName = "structure-type";
    const scheme = StructureTypeScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `structure-type/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    const { id } = props.match.params;
    getStructureType(id);
  }, []);
  const { t } = props;
  const optionsType = [
    {
      value: "ORGANIZATION",
      label: "ORGANIZATION"
    },
    {
      value: "ADMINISTRATION",
      label: "ADMINISTRATION"
    },
    {
      value: "REGULAR",
      label: "REGULAR"
    }
  ];

  const structureType = Normalizer.Denormalize(
    result,
    StructureTypeScheme,
    entities
  );
  const values = [
    {
      id: 1,
      label: "Title",
      name: "title",
      type: "input",
      defaultValue: get(structureType, "title")
    },
    {
      id: 2,
      label: "Rating",
      sort: "number",
      name: "rating",
      type: "input",
      defaultValue: get(structureType, "rating")
    },
    {
      id: 3,
      name: "type",
      type: "select",
      options: optionsType,
      defaultValue: {
        value: get(structureType, "type"),
        label: get(structureType, "type")
      }
    }
  ];
  const {id} = props.match.params;
  if (!isFetchedProps) {
    return <Loader/>
  }
  return (
    <>
      <Breadcrumb
        titles={[
          {id: 1, title: t("Structure"), url: "/structure-type"},
          {
            id: 2,
            title: "Structure Type",
            url: `/structure-type`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/structure-type/view/${id}`
          },
          { id: 4, title: get(structureType, "title"), url: "" }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={`/structure-type/view/${id}`}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(StructureTypeUpdatePage);
