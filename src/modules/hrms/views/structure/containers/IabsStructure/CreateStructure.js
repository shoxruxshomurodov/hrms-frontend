import React, { useState, useEffect } from "react";
import CreateForm from "../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../Api";
import ApiActions from "../../../../../../services/api/Actions";
import { get,isNil } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StructureScheme from "../../../../../../schema/Structure";
import StructureTypeScheme from "../../../../../../schema/StructureType";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Normalizer from "../../../../../../services/normalizer";
import helper from "../../../../../../containers/Form/helper";
function StructureCreate(props) {
  const dispatch = useDispatch();
  const structureType = useSelector((state) =>
    get(state, "normalizer.data.structure-type.result.content", [])
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const create = (data) => {
    setIsFetched("Create");
    Api.structureCreate(data)
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно создан");
        props.loadTreeData2("09006")
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
  const { column, defaultValue } = props;

  let resultStructureID = Normalizer.Denormalize(
    structureType,
    [StructureTypeScheme],
    entities
  );
  const optionsStructureID = helper.renderProperty(resultStructureID, [
    "id",
    "title"
  ]);
  const values = [
    { id: 1, name: "title", type: "input" },
    {
      id: 2,
      name: "altAbsCode",
      type: "input",
      defaultValue,
      property: { disabled: true }
    },
    {
      id: 4,
      name: "structureTypeId",
      type: "select",
      options: optionsStructureID
    },
    { id: 5, name: "description", type: "textarea" }
  ];
  return (
    <>
      <h1 className="g-font-weight-300 g-font-size-24 g-color-black g-mb-10 g-mt-10">
        CREATE STRUCTURE
      </h1>
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/structure"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
        column={isNil(column) ? [2,6] : column}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(StructureCreate);
