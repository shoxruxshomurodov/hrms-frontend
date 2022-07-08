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
function StructureRelationCreatePage(props) {
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
  const [state, setState] = useState(false);

  const getStructure = (params) => {
    const storeName = "structure";
    const entityName = "structure";
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: "structure",
        config: {
          params: params
        },
        scheme: { content: [StructureScheme] },
        storeName: storeName,
        entityName: entityName
      }
    });
  };

  const onchange = (name, event) => {
    setState(event);
    getStructure({
      isDeleted: false,
      orgStructureId: get(event, "value")
    });
  };
  const create = (data) => {
    Api.structureRelationCreate(data)
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

  useEffect(() => {
    getStructure({
      isDeleted: false,
      type: "ORGANIZATION"
    });
  }, []);
  const { t } = props;
  let resultParentID = Normalizer.Denormalize(
    structure,
    [StructureScheme],
    entities
  );
  let resultParentTypeID = Normalizer.Denormalize(
    structureType,
    [StructureScheme],
    entities
  );

  const optionsRelationStructureIdOrg = helper.renderProperty(resultParentID, [
    "id",
    "title"
  ]);
  const relationStructureId = helper.renderProperty(resultParentTypeID, [
    "id",
    "title"
  ]);

  const optionsStructureIdOrg = helper.renderProperty(resultParentID, [
    "id",
    "title"
  ]);
  const StructureId = helper.renderProperty(resultParentTypeID, [
    "id",
    "title"
  ]);
  const type = [{ value: "PARENT", label: "PARENT" }];
  const values = [
    {
      id: 1,
      name: "relationStructureIdOrg",
      type: "select",
      options: optionsRelationStructureIdOrg
    },
    {
      id: 2,
      name: "relationStructureId",
      type: "select",
      custom: (data, render) => {
        if (state) {
          return render;
        }
        return <span className="col-10 text-center">Выберите филиал</span>;
      },
      options: relationStructureId,
      property: { disabled: false }
    },
    {
      id: 3,
      name: "optionsStructureIdOrg",
      type: "select",
      options: optionsStructureIdOrg
    },
    {
      id: 4,
      name: "StructureId",
      type: "select",
      custom: (data, render) => {
        if (state) {
          return render;
        }
        return <span className="col-10 text-center">Выберите филиал</span>;
      },
      options: StructureId,
      property: { disabled: false }
    },
    {
      id: 5,
      name: "type",
      type: "select",
      options: type,
      defaultValue: type,
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
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        onchange={onchange}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/structure-relation"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(StructureRelationCreatePage);
