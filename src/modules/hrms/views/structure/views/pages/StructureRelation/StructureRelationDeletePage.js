import React, { useState, useEffect } from "react";
import CreateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../../Api";
import ApiActions from "../../../../../../../services/api/Actions";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StructureScheme from "../../../../../../../schema/Structure";
import StructureTypeScheme from "../../../../../../../schema/StructureType";
import Breadcrumb from "../../../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Normalizer from "../../../../../../../services/normalizer";
import helper from "../../../../../../../containers/Form/helper";
function StructureRelationDeletePage(props) {
  const dispatch = useDispatch();
  const structure = useSelector((state) =>
    get(state, "normalizer.data.structure.result.content", [])
  );
  const structureType = useSelector((state) =>
    get(state, "normalizer.data.structure-type.result.content", [])
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const deleted = (data) => {
    setIsFetched("Delete");
    Api.structureRelationDelete(data)
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно Удалено");
        setTimeout(() => {
          window.history.back();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify(e.response.data.message);
      });
  };

  const getStructure = () => {
    const storeName = "structure";
    const entityName = "structure";
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        method: "post",
        url: "structure",
        config: {
          params: {
            isDeleted: false
          }
        },
        scheme: { content: [StructureScheme] },
        storeName: storeName,
        entityName: entityName
      }
    });
  };

  const getStructureType = () => {
    const storeName = "structure-type";
    const entityName = "structure-type";
    const scheme = { content: [StructureTypeScheme] };
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: "structure-type",
        config: {
          params: {
            isDeleted: false
          }
        },
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    getStructure();
    getStructureType();
  }, []);
  const { t } = props;
  let resultParentID = Normalizer.Denormalize(
    structure,
    [StructureScheme],
    entities
  );
  let resultStructureID = Normalizer.Denormalize(
    structureType,
    [StructureTypeScheme],
    entities
  );
  const optionsParentID = helper.renderProperty(resultParentID, [
    "id",
    "title"
  ]);
  const optionsStructureID = helper.renderProperty(resultStructureID, [
    "id",
    "title"
  ]);
  const type = [{ value: "PARENT", label: "PARENT" }];
  const values = [
    {
      id: 1,
      name: "relationStructureId",
      type: "select",
      options: optionsParentID
    },
    { id: 2, name: "structureId", type: "select", options: optionsStructureID },
    {
      id: 3,
      name: "type",
      type: "select",
      options: type,
      property: { disabled: false },
      params: { required: false }
    }
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Structure"), url: "/structure" },
          { id: 2, title: "Structure Relation", url: "/structure-relation" },
          { id: 3, title: t("Delete"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={deleted}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/structure-relation"}
        buttonText={"Delete"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(StructureRelationDeletePage);
