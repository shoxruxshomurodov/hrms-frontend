import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEqual } from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import DocumentScheme from "../../../../../../schema/Document";
import Normalizer from "../../../../../../services/normalizer";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../../components/Loader";
import AuthActions from "../../../../../../services/auth/actions";
import { ToastContainer } from "react-toastify";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../Api";
import Swal from "sweetalert2";

class View extends Component {
  componentDidMount() {
    const { id, callToRender, callToRenderTrigger } = this.props;
    callToRenderTrigger();
    callToRender(id);
  }
  onDelete = (id) => {
    const { checkAuth, t, history } = this.props;
    Swal.fire({
      title: t("Do you want to delete this custom template-document ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        Api.templateCustomDocumentDelete(id)
          .then((_res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Your custom template-document has been deleted"),
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              history.push("/custom-document");
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
    let { drawToRender, entities, t, isFetched } = this.props;
    const result = Normalizer.Denormalize(
      drawToRender,
      DocumentScheme,
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
              { id: 1, title: t("Documents"), url: "/custom-document" },
              { id: 2, title: "Document", url: "/custom-document" },
              { id: 3, title: t("View") },
              { id: 4, title: get(result, "title") }
            ]}
          />
          <div>
            <Link
              to={`/custom-document/update/${get(result, "id")}`}
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
        <div className="media g-mb-30">
          <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
            <div id="shortcode15">
              <div className="shortcode-html">
                <dl className="row">
                  <dt className="col-sm-2 text-right">{t("Title")}:</dt>
                  <dd className="col-sm-10">{get(result, "title")}</dd>
                </dl>
                <dl className="row">
                  <dt className="col-sm-2 text-right">{t("Code")}:</dt>
                  <dd className="col-sm-10">{get(result, "code")}</dd>
                </dl>
                <dl className="row">
                  <dt className="col-sm-2 text-right">{t("Value")}:</dt>
                  <dd className="col-sm-10">{get(result, "value")}</dd>
                </dl>
                <dl className="row">
                  <dt className="col-sm-2 text-right">{t("Description")}:</dt>
                  <dd className="col-sm-10">{get(result, "description")}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToRender: get(state, "normalizer.data.custom-template-document-one.result", []),
    isFetched: get(state, "normalizer.data.custom-template-document-one.isFetched"),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "custom-template-document-one";
      const entityName = "document";
      const scheme = DocumentScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `template-document-custom-var/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "custom-template-document-one";
      const entityName = "document";
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
