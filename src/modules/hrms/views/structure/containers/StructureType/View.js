import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import Normalizer from "../../../../../../services/normalizer";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../../components/Loader";
import Api from "../../../../Api";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import AuthActions from "../../../../../../services/auth/actions";
import { ToastContainer } from "react-toastify";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import PDFViewer from "../../../../../../components/PdfViewer";
import StructureScheme from "../../../../../../schema/Structure";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
class View extends Component {
  state = {
    isFetchedIn: false,
    dynamicPage: 1
  };
  componentDidMount() {
    const { id, callToRender, callToRenderTrigger } = this.props;
    callToRenderTrigger();
    callToRender(id);
  }

  onDelete = (id) => {
    const { checkAuth, t, history } = this.props;
    Swal.fire({
      title: t("Do you want to delete this structure type ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        Api.structureTypeDelete(id)
          .then((_res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Your structure type has been deleted"),
              showConfirmButton: false,
              timer: 1000
            });
            setTimeout(() => {
              history.push("/structure-type");
              checkAuth();
            }, 1000);
          })
          .catch((e) => {
            ErrorNotify(e.response.data.message);
          });
      }
    });
  };
  render() {
    let {
      drawToRender,
      entities,
      t,
      isFetched,
      meta,
      totalPages,
      totalElements
    } = this.props;
    const result = Normalizer.Denormalize(
      drawToRender,
      StructureScheme,
      entities
    );
    const { dynamicPage } = this.state;
    meta = { totalElements, totalPages, currentPage: dynamicPage, ...meta };
    if (!isFetched) {
      return <Loader />;
    }
    return (
      <>
        <div className="flex-display-more">
          <Breadcrumb
            titles={[
              { id: 1, title: t("Structure"), url: "/structure" },
              { id: 2, title: "Structure Type", url: "/structure-type" },
              { id: 3, title: t("View"), url: "/structure-type" },
              { id: 4, title: get(result, "title"), url: "" }
            ]}
          />
          <div>
            <Link
              to={`/structure-type/update/${get(result, "id")}`}
              className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
            >
              {t("Update Document")}
            </Link>
            <button
              onClick={() => this.onDelete(get(result, "id"))}
              className="btn btn-sm u-btn-danger rounded-0 g-py-10 g-px-20 ml-2"
            >
              {t("Delete Document")}
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
                </div>
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Code")} : {get(result, "code")}
                    </span>
                  </h5>
                </div>
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Status")} : {get(result, "status")}
                    </span>
                  </h5>
                </div>
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Type")} : {JSON.stringify(get(result, "type"))}
                    </span>
                  </h5>
                </div>
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Level")} : {get(result, "level")}
                    </span>
                  </h5>
                </div>
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Rating")} : {get(result, "rating")}
                    </span>
                  </h5>
                </div>
              </div>
              <PDFViewer pdf={get(result, "fileAbsoluteUrlForView")} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
        <ToastContainer />
        {!isFetched && <Loader />}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalizer.data.structure-type-one.result", []),
    isFetched: get(state, "normalizer.data.structure-type-one.isFetched", false),
    meta: get(state, "normalizer.data.structure-type-one.result.pageable", {}),
    totalElements: get(
      state,
      "normalizer.data.structure-type-one.result.totalElements",
      0
    ),
    totalPages: get(
      state,
      "normalizer.data.structure-type-one.result.totalPages",
      0
    ),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "structure-type-one";
      const entityName = "structure";
      const scheme = StructureScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `structure-type/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "structure-type-one";
      const entityName = "structure";
      dispatch({
        type: ApiActions.GET_ONE.TRIGGER,
        payload: {
          storeName,
          entityName
        }
      });
    },
    checkAuth: () => {
      dispatch({
        type: AuthActions.CHECK_AUTH.REQUEST
      });
    }
  };
};
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(View))
);
