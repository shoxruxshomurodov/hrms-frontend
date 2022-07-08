import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty, isEqual } from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import DocumentScheme from "../../../../../../schema/Document";
import Normalizer from "../../../../../../services/normalizer";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../../components/Loader";
import { Link, withRouter } from "react-router-dom";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import AuthActions from "../../../../../../services/auth/actions";
import LoaderMini from "../../../../../../components/Loader/LoaderMini";
import { ToastContainer } from "react-toastify";
import DataIsEmpty from "../../../../../../components/AccessDenied/DataIsEmpty";
import Pagination from "../../../../../../components/Pagination/custom/Pagination";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import PDFViewer from "../../../../../../components/PdfViewer";
import CopyElement from "../../component/CopyElement";
import Api from "../../../../Api";
import Swal from "sweetalert2";
class View extends Component {
  state = {
    isFetchedIn: false,
    dynamicPage: 1
  };
  componentDidMount() {
    const { id, callToRender, callToRenderCustom, callToRenderTrigger } =
      this.props;
    callToRenderTrigger();
    callToRender(id);
    callToRenderCustom({ pageNumber: 0 });
  }
  onDelete = (id) => {
    const { checkAuth, t, history } = this.props;
    Swal.fire({
      title: t("Do you want to delete this template-document ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        Api.templateDocumentDelete(id)
          .then((_res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Your template-document has been deleted"),
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              history.push("/document");
              checkAuth();
            }, 1000);
          })
          .catch((e) => {
            ErrorNotify(e.response.data.message);
          });
      }
    });
  };

  syncTemplateDocument = () => {
    const { checkAuth, id } = this.props;
    this.setState({ isFetchedIn: "syncTemplateDocument" });
    Api.syncTemplateDocument(id)
      .then((_res) => {
        this.setState({ isFetchedIn: false });
        SuccessNotify("Успешно изменено");
        setTimeout(() => {
          checkAuth();
        }, 1000);
      })
      .catch((e) => {
        this.setState({ isFetchedIn: false });
        ErrorNotify(e.response.data.message);
      });
  };
  handlePagination = (page) => {
    const { callToRenderCustom } = this.props;
    this.setState({ dynamicPage: page });
    callToRenderCustom({ pageNumber: page - 1 });
  };
  onSearch = (character) => {
    const { callToRenderCustom } = this.props;
    callToRenderCustom({ title: character });
  };
  render() {
    let {
      drawToRender,
      entities,
      t,
      isFetched,
      customDocument,
      meta,
      totalPages,
      totalElements
    } = this.props;
    const { isFetchedIn } = this.state;
    const result = Normalizer.Denormalize(
      drawToRender,
      DocumentScheme,
      entities
    );
    let customResult = Normalizer.Denormalize(
      customDocument,
      [DocumentScheme],
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
              { id: 1, title: t("Documents"), url: "/document" },
              { id: 2, title: "Document", url: "/document" },
              { id: 3, title: t("View"), url: "/document" },
              { id: 4, title: get(result, "title"), url: "" }
            ]}
          />
          <div>
            <Link
              to={`/template-document/update/${get(result, "id")}`}
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
                <div className="text-right mb-4">
                  <button
                    className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                    onClick={() =>
                      window.open(get(result, "fileAbsoluteUrl"), "_blank")
                    }
                  >
                    <i className="fa fa-download" />
                    <span className="ml-2">{t("Скачать документ")}</span>
                  </button>
                  <button
                    className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                    onClick={() =>
                      window.open(get(result, "onlyofficeSharedLink"), "_blank")
                    }
                  >
                    <i className="fa fa-pencil" />
                    <span className="ml-2">{t("Редактор")}</span>
                  </button>

                  <button
                    className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                    onClick={this.syncTemplateDocument}
                    disabled={isEqual(isFetchedIn, "syncTemplateDocument")}
                  >
                    {isEqual(isFetchedIn, "syncTemplateDocument") && (
                      <LoaderMini />
                    )}{" "}
                    {!isEqual(isFetchedIn, "syncTemplateDocument") && (
                      <i className="fa fa-refresh" />
                    )}
                    <span className="ml-2">
                      {t("Получить данные документ")}
                    </span>
                  </button>
                </div>
                <div className="g-mb-15">
                  <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Title")} : {get(result, "title")}
                    </span>
                  </h5>
                </div>
                <p>
                  {t("Description")} : {get(result, "description")}
                </p>
              </div>
              <PDFViewer pdf={get(result, "fileAbsoluteUrlForView")} />
            </div>
            <div className="col-md-6">
              <input
                className="form-control u-shadow-v20 g-brd-none g-bg-white g-font-size-16 g-rounded-30 g-px-30 g-py-13 g-mt-10 g-mb-30"
                type="text"
                onChange={(e) => this.onSearch(e.target.value)}
                placeholder="eg. How to fund your research on Ontario?"
              />
              {!isEmpty(customResult) ? (
                customResult.map((result) => {
                  return <CopyElement result={result} />;
                })
              ) : (
                <DataIsEmpty />
              )}
              <Pagination
                currentPage={get(meta, "currentPage", 0)}
                totalCount={get(meta, "totalElements", 40)}
                pageSize={get(meta, "pageSize", 10)}
                onPageChange={this.handlePagination}
              />
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
    drawToRender: get(state, "normalizer.data.template-document-one.result", []),
    customDocument: get(
      state,
      "normalizer.data.custom-template-document.result.content",
      []
    ),
    isFetched: get(state, "normalizer.data.template-document-one.isFetched", false),
    isFetchedCustom: get(
      state,
      "normalizer.data.custom-template-document.isFetched",
      false
    ),
    meta: get(state, "normalizer.data.custom-template-document.result.pageable", {}),
    totalElements: get(
      state,
      "normalizer.data.custom-template-document.result.totalElements",
      0
    ),
    totalPages: get(
      state,
      "normalizer.data.custom-template-document.result.totalPages",
      0
    ),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "template-document-one";
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
    },
    callToRenderCustom: ({ pageNumber, title }) => {
      const storeName = "custom-template-document";
      const entityName = "document";
      const scheme = { content: [DocumentScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "template-document-custom-var",
          config: {
            params: {
              "per-page": 10,
              pageNumber,
              title
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "template-document-one";
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
