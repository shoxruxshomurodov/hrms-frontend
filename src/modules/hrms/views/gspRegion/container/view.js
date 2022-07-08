import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import GspRegionScheme from "../../../../../schema/GspRegion";
import Normalizer from "../../../../../services/normalizer";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../components/Loader";
import { Link, withRouter } from "react-router-dom";
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
      title: t("Do you want to delete this gsp region ?"),
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
      GspRegionScheme,
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
              { id: 1, title: t("Справочник"), url: "/gsp-region" },
              { id: 2, title: "Gsp Region", url: "/gsp-region" },
              { id: 3, title: t("View"), url: "/gsp-region" },
              { id: 4, title: get(result, "title"), url: "" }
            ]}
          />
          <div>
            <Link
              to={`/gsp-region/update/${get(result, "id")}`}
              className="btn btn-sm u-btn-outline-primary rounded-0 g-py-10 g-px-20 ml-2"
            >
              {t("Update")}
            </Link>
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
                      {t("Title")} : {get(result, "title")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("ID")} : {get(result, "id")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Region Id")} : {get(result, "region.id")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Region Title")} : {get(result, "region.title")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Country Title")} : {get(result, "region.country.title")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Country ID")} : {get(result, "region.country.id")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("GSP Country ID")} : {get(result, "gspCountry.id")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("GSP Country title")} : {get(result, "gspCountry.title")}
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
    drawToRender: get(state, "normalizer.data.gsp-region-one.result", []),
    isFetched: get(state, "normalizer.data.gsp-region-one.isFetched", false),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "gsp-region-one";
      const entityName = "gsp-region";
      const scheme = GspRegionScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `gsp-region/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "gsp-region-one";
      const entityName = "gsp-region";
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
        type: Actions.GSP_REGION_CONTROLLER_DELETE.REQUEST,
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
