import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";
import LoaderMini from "../../../../../../../../components/Loader/LoaderMini";
import { get, isEqual} from "lodash";
import {toast, ToastContainer} from "react-toastify";
import Action from "../../../../../../Actions";
import { connect } from "react-redux";
import SelectPaginate from "../AsyncPagionation/SelectPagination";
import NormalizerAction from "../../../../../../../../services/normalizer/actions";

const UpdateScheme = Yup.object().shape({
  altAbsCode: Yup.string(),
  altAbsDepId: Yup.string(),
  description: Yup.string(),
  parentStructureId: Yup.string(),
  structureTypeId: Yup.string(),
  title: Yup.string().required("title введен не полностью")
});
class FormChangeParent extends Component {
  state = {
    isFetched: null
  };
  updateTransfer = (data) => {
    const {callToUpdateTransfer,setStateCustom,transferInfo} = this.props;
    const id = get(transferInfo,"node.id")
    callToUpdateTransfer({id,data})
    setStateCustom("isShowUpdateTransfer", false)
  };

  render() {
    const {
      t,
      transferInfo,
      setStateCustom,
    } = this.props;
    const { isFetched } = this.state;
    return (
      <>
        <Formik
          initialValues={{
            description: "",
            parentStructureId: get(transferInfo, "node.parentNode.id", ""),
            status:get(transferInfo, "node.status", ""),
            title: get(transferInfo, "node.title")
          }}
          validationSchema={UpdateScheme}
          onSubmit={(values) => {
            this.updateTransfer(values);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit, setFieldValue
            }) => (
            <form
              className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
              onSubmit={handleSubmit}
            >
              <div className="form-group g-mb-25 row">
                <label
                  className="col-2 col-form-label text-right"
                  htmlFor="exampleInputPassword1"
                >
                  {t("Title")}
                </label>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control
                    rounded-0 form-control-md"
                    id="exampleInputPassword1"
                    placeholder="enter title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && (
                    <small className="form-control-feedback">
                      {errors.title}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group g-mb-25 row">
                <label
                  className="col-2 col-form-label text-right"
                  htmlFor="exampleInputEmail1"
                >
                  {t("Status")}
                </label>
                <div className="col-6">
                  <select
                    name="status"
                    value={values.status}
                    className="form-control form-control-md rounded-0"
                    onChange={handleChange}
                  >
                    <option value="">Выбирать</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PASSIVE ">PASSIVE</option>
                  </select>
                  {errors.status && touched.status && (
                    <small className="form-control-feedback">
                      {errors.status}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group g-mb-25 row">
                <label
                  className="col-2 col-form-label text-right"
                  htmlFor="exampleInputEmail1"
                >
                  {t("parentStructureId")}
                </label>
                <div className="col-6">
                  <SelectPaginate
                    url="structure"
                    onChange={(value) => {
                      setFieldValue('parentStructureId', parseInt(value.value));
                    }}
                    params={{
                      isDeleted: false,
                      parentStructureId: this.props.rootStructureId
                    }}
                    property={["id","title","altAbsCode"]}
                    value={{value:get(transferInfo, "node.parentNode.id", ""),label:get(transferInfo, "node.parentNode.title", "")}}
                    name="parentStructureId"
                    defaultValue={{value:get(transferInfo, "node.parentNode.id", ""),label:get(transferInfo, "node.parentNode.title", "")}}
                  />
                  {errors.parentStructureId && touched.parentStructureId && (
                    <small className="form-control-feedback">
                      {errors.parentStructureId}
                    </small>
                  )}
                </div>
              </div>

              <div className="form-group g-mb-25 row">
                <label
                  className="col-2 col-form-label text-right"
                  htmlFor="exampleInputPassword1"
                >
                  {t("description")}
                </label>
                <div className="col-6">
                  <textarea
                    className="form-control rounded-0 form-control-md"
                    id="exampleTextarea"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    defaultValue={""}
                  />

                  {errors.description && touched.description && (
                    <small className="form-control-feedback">
                      {errors.description}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-6 offset-2">
                <button
                  type="submit"
                  className="btn btn-md u-btn-primary rounded-0"
                  disabled={isEqual(isFetched, "create")}
                >
                  {isEqual(isFetched, "transfer") && <LoaderMini />}
                  {!isEqual(isFetched, "transfer") && t("Update transfer")}
                </button>
                <button
                  onClick={() => setStateCustom("isShowUpdateTransfer", false)}
                  className="btn btn-md rounded-0 ml-2"
                  type={"button"}
                >
                  <span className="ml-2">{t("Cancel")}</span>
                </button>
              </div>
            </form>
          )}
        </Formik>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    structure: get(state, "normalizer.data.structure.result.content", []),
    structureType: get(
      state,
      "normalizer.data.structure-type.result.content",
      []
    ),
    isFetched: get(state, "normalizer.data.structure.isFetched", false),
    entities: get(state, "normalizer.entities", {})
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    callToUpdateTransfer:({id,data}) => {
      dispatch({
        type: NormalizerAction.NORMALIZE.TRIGGER,
        payload: {
          storeName: "update-structure-transfer",
          entityName: "structure"
        }
      });
      dispatch({
        type: Action.IABS_TRANSFORM_UPDATE.REQUEST,
        payload: {
          id,
          data,
          cb: {
            success: (nData, data) => {
              toast.dismiss();
              toast.success('Успешно', {
                position: "top-right",
                autoClose:2000,
              })
            },
            fail: (e) => {
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 2000,
              })
            },
          },
        }
      });
    },
  };
};
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(FormChangeParent)
);
