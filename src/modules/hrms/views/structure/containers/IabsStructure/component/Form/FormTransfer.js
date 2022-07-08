import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";
import LoaderMini from "../../../../../../../../components/Loader/LoaderMini";
import { get, isEqual,} from "lodash";
import {toast, ToastContainer} from "react-toastify";
import Action from "../../../../../../Actions";
import { connect } from "react-redux";
import SelectPaginate from "../AsyncPagionation/SelectPagination";
import NormalizerAction from "../../../../../../../../services/normalizer/actions";

const CreateScheme = Yup.object().shape({
  altAbsCode: Yup.string(),
  altAbsDepId: Yup.string(),
  description: Yup.string(),
  parentStructureId: Yup.string(),
  structureTypeId: Yup.string(),
  title: Yup.string().required("title введен не полностью")
});
class FormTransfer extends Component {
  state = {
    isFetched: null
  };


  transfer = (data) => {
    const {callToTransfer,setStateCustom} = this.props;
    callToTransfer({data})
    setStateCustom("isShowTransfer", false)
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
            altAbsCode: get(transferInfo, "node.code"),
            altAbsDepId: get(transferInfo, "node.depId"),
            description: "",
            parentStructureId: get(transferInfo, "node.structureParent.id", "") ?? "",
            structureTypeId: "",
            title: get(transferInfo, "node.title")
          }}
          validationSchema={CreateScheme}
          onSubmit={(values) => {
            this.transfer(values);
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
                    disabled={true}
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
                  htmlFor="exampleInputPassword1"
                >
                  {t("altAbsCode")}
                </label>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control
              rounded-0 form-control-md"
                    id="exampleInputPassword1"
                    placeholder="enter altAbsCode"
                    name="altAbsCode"
                    value={values.altAbsCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={true}
                  />
                  {errors.altAbsCode && touched.altAbsCode && (
                    <small className="form-control-feedback">
                      {errors.altAbsCode}
                    </small>
                  )}
                </div>
              </div>

              <div className="form-group g-mb-25 row">
                <label
                  className="col-2 col-form-label text-right"
                  htmlFor="exampleInputPassword1"
                >
                  {t("altAbsDepId")}
                </label>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control
              rounded-0 form-control-md"
                    id="exampleInputPassword1"
                    placeholder="enter altAbsDepId"
                    name="altAbsDepId"
                    value={values.altAbsDepId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={true}
                  />
                  {errors.altAbsDepId && touched.altAbsDepId && (
                    <small className="form-control-feedback">
                      {errors.altAbsDepId}
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
                    params={ {
                      isDeleted: false,
                      parentStructureId: this.props.parentStructureId,
                      rootStructureId: this.props.rootStructureId,
                    }}
                    property={["id","title","altAbsCode"]}
                    value={{value:get(transferInfo, "node.parent.id", ""),label:get(transferInfo, "node.parent.title", "")}}
                    name="parentStructureId"
                    defaultValue={{value:get(transferInfo, "node.parent.id", ""),label:get(transferInfo, "node.parent.title", "")}}
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
                  htmlFor="exampleInputEmail1"
                >
                  {t("structureTypeId")}
                </label>
                <div className="col-6">
                  <SelectPaginate
                    url="structure-type"
                    onChange={(value) => {
                      setFieldValue('structureTypeId', value.value);
                    }}
                    params={{
                      isDeleted: false,
                    }}
                    property={["id","title","id"]}
                    value={values.structureTypeId}
                    name="structureTypeId"

                  />
                  {errors.structureTypeId && touched.structureTypeId && (
                    <small className="form-control-feedback">
                      {errors.structureTypeId}
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
                  {!isEqual(isFetched, "transfer") && t("Transfer")}
                </button>
                <button
                  onClick={() => setStateCustom("isShowTransfer", false)}
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
    callToTransfer:({data}) => {
      dispatch({
        type: NormalizerAction.NORMALIZE.TRIGGER,
        payload: {
          storeName: "create-structure-transfer",
          entityName: "structure"
        }
      });
      dispatch({
        type: Action.IABS_TRANSFORM.REQUEST,
        payload: {
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
  connect(mapStateToProps, mapDispatchToProps)(FormTransfer)
);
