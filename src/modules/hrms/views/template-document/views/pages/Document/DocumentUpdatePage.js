import React, { useState, useEffect } from "react";
import UpdateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../../Api";
import Breadcrumb from "../../../../../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { get } from "lodash";
import DocumentScheme from "../../../../../../../schema/Document";
import ApiActions from "../../../../../../../services/api/Actions";
import Normalizer from "../../../../../../../services/normalizer";
function DocumentUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.document.result", [])
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getDocument = (id) => {
    const storeName = "document";
    const entityName = "document";
    const scheme = DocumentScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `template-document/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    const { id } = props.match.params;
    getDocument(id);
  }, []);
  const update = (data) => {
    const { id } = props.match.params;
    setIsFetched("Update");
    Api.templateDocumentUpdate(id, data)
      .then((_res) => {
        setIsFetched(false);
        SuccessNotify("Успешно Обновлено");
        setTimeout(() => {
          window.history.back();
        }, 1000);
      })
      .catch((e) => {
        setIsFetched(false);
        ErrorNotify(e.response.data.message);
      });
  };
  const { t } = props;
  const { id } = props.match.params;
  const documents = Normalizer.Denormalize(result, DocumentScheme, entities);
  const values = [
    {
      id: 1,
      name: "title",
      type: "input",
      defaultValue: get(documents, "title")
    },
    {
      id: 2,
      name: "description",
      type: "textarea",
      defaultValue: get(documents, "description")
    },
    {
      id: 3,
      name: "code",
      type: "input",
      defaultValue: get(documents, "code")
    },
    {
      id: 3,
      name: "businessProcess",
      type: "input",
      defaultValue: get(documents, "businessProcess")
    },
    {
      id: 4,
      name: "data",
      type: "textarea",
      defaultValue: get(documents, "textarea")
    }
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Documents"), url: "/document" },
          {
            id: 2,
            title: "Document",
            url: `/document/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/document/update/${id}`
          },
          { id: 4, title: get(documents, "title", ""), url: `` }
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={`/template-document/view/${get(documents, "id", "")}`}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(DocumentUpdatePage);
