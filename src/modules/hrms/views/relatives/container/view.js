import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import RelativesScheme from "../../../../../schema/Relatives";
import Normalizer from "../../../../../services/normalizer";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../components/Loader";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Swal from "sweetalert2";
import Actions from "../../../Actions";
class View extends Component {
  componentDidMount() {
    const { id, callToRender, callToRenderTrigger } = this.props;
    callToRenderTrigger();
    callToRender(id);
  }
  onDelete = (id) => {
    const { t, callToDelete } = this.props;
    Swal.fire({
      title: t("Do you want to delete this relatives ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        callToDelete(id);
      }
    });
  };

  render() {
    let { drawToRender, entities, t, isFetched } = this.props;
    const result = Normalizer.Denormalize(
      drawToRender,
      RelativesScheme,
      entities
    );
    if (!isFetched) {
      return <Loader />;
    }
    return (
      <>
        <div className="flex-display-more">
          <Breadcrumb
            titles={[
              { id: 1, title: t("Справочник"), url: "/relatives" },
              { id: 2, title: "Relatives", url: "/relatives" },
              { id: 3, title: t("View"), url: "/relatives" },
              { id: 4, title: get(result, "firstname"), url: "" }
            ]}
          />
          <div>
            <button
              onClick={() => this.onDelete(get(result, "id"))}
              className="btn btn-sm u-btn-danger rounded-0 g-py-10 g-px-20 ml-2"
            >
              {t("Delete")}
            </button>
          </div>
        </div>
        {!isEmpty(result) ? (
          <div className="row">
            <div className="col-md-6">
              <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("First Name")} : {get(result, "firstname")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("LastName")} : {get(result, "lastname")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Middle Name")} : {get(result, "patronymic")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Birth Date")} : {get(result, "birthdate")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Birth Country")} : {get(result, "birthplace")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Passport")} : {get(result, "passport")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Pnfl")} : {get(result, "personalIdentificationNumber")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Отношение")} : {get(result, "relationship")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Work Place")} : {get(result, "workplace")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Address")} : {get(result, "address")}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        <ToastContainer />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalizer.data.relatives-one.result", []),
    isFetched: get(state, "normalizer.data.relatives-one.isFetched", false),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "relatives-one";
      const entityName = "relatives";
      const scheme = RelativesScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `relatives/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "relatives-one";
      const entityName = "relatives";
      dispatch({
        type: ApiActions.GET_ONE.TRIGGER,
        payload: {
          storeName,
          entityName
        }
      });
    },
    callToDelete: (attributes) => {
      dispatch({
        type: Actions.RELATIVES_DELETE.REQUEST,
        payload: {
          attributes,
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
            fail: (e) => {
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 1000
              });
            }
          }
        }
      });
    }
  };
};
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(View))
);
