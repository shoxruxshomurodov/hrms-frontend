import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import StaffScheme from "../../../../../schema/Staff"
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
      title: t("Do you want to delete staff ?"),
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
  onClose = (id) => {
    const { t, callToClose } = this.props;
    Swal.fire({
      title: t("Do you want to close staff ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("Yopish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        callToClose(id);
      }
    });
  };
  render() {
    let { drawToRender, entities, t, isFetched } = this.props;
    const result = Normalizer.Denormalize(
      drawToRender,
      StaffScheme,
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
              { id: 1, title: t("Справочник"), url: "/staff" },
              { id: 2, title: "Staff", url: "/staff" },
              { id: 3, title: t("View"), url: "/staff" },
              { id: 4, title: get(result, "title"), url: "" }
            ]}
          />
          <div>
            <Link
              to={`/staff/update/${get(result, "id")}`}
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
            <button
              onClick={() => this.onClose(get(result, "id"))}
              className="btn btn-sm u-btn-outline-primary rounded-0 g-py-10 g-px-20 ml-2"
            >
              {t("Close")}
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
                      {t("ID")} : {get(result, "id")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Title")} : {get(result, "title")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Structure")} : {get(result, "structure.title")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Position")} : {get(result, "position.title")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Status")} : {get(result, "status")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Code")} : {get(result, "code")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Rank")} : {get(result, "rank")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Rate")} : {get(result, "rate")}
                    </span>
                  </h5>
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Description")} : {get(result, "description")}
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
    drawToRender: get(state, "normalizer.data.staff-one.result", []),
    isFetched: get(state, "normalizer.data.staff-one.isFetched", false),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "staff-one";
      const entityName = "staff";
      const scheme = StaffScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `staff/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "staff-one";
      const entityName = "staff";
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
        type: Actions.STAFF_CONTROLLER_DELETE.REQUEST,
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
    },
    callToClose: (attributes) => {
      dispatch({
        type: Actions.STAFF_CONTROLLER_CLOSE.REQUEST,
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
