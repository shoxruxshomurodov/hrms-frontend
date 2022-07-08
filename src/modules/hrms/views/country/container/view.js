import React, {Component} from "react";
import {connect} from "react-redux";
import {get, isEmpty, isNil} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import CountryScheme from "../../../../../schema/Country";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import {Link, withRouter} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Swal from "sweetalert2";
import Actions from "../../../Actions";
import SelectAsyncPaginate from "../../../../../components/InputGroup/SelectAsyncPaginate";

class View extends Component {
  state = {
    iabsCode: null,
  }

  componentDidMount() {
    const {id, callToRender, callToRenderTrigger} = this.props;
    callToRenderTrigger();
    callToRender(id);
  }
  onDelete = (id) => {
    const { t, callToDelete } = this.props;
    Swal.fire({
      title: t("Do you want to delete this country ?"),
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

  filterBy = (name,value) => {
    this.setState({iabsCode:value})
  }
  onLink = (countryId) => {
    const {callToLink} = this.props;
    const {iabsCode} = this.state;
    callToLink({iabsCode,countryId})
  }
  render() {
    let { drawToRender, entities, t, isFetched} = this.props;
    const {iabsCode} = this.state;
    const result = Normalizer.Denormalize(
      drawToRender,
      CountryScheme,
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
              { id: 1, title: t("Справочник"), url: "/country" },
              { id: 2, title: "Country", url: "/country" },
              { id: 3, title: t("View"), url: "/country" },
              { id: 4, title: get(result, "title"), url: "" }
            ]}
          />
          <div>
            <Link
              to={`/country/update/${get(result, "id")}`}
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
            <>
              <div className="row">
                <div className="col-md-6">
                  <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                    <div className="g-mb-15">
                      <div className="d-flex g-mb-15">
                        <SelectAsyncPaginate
                          url="iabs/countries"
                          attrSearch={"name"}
                          onChange={this.filterBy}
                          property={["code","name","code"]}
                        />
                        <button
                            onClick={() => this.onLink(get(result, "id"))}
                            className="btn btn-sm u-btn-primary rounded-0 g-py-10 g-px-20 ml-2"
                            disabled={isNil(iabsCode) && true}
                        >
                          {t("Link")}
                        </button>
                      </div>
                      <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Id")} : {get(result, "id")}
                    </span>
                      </h5>
                      <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Title")} : {get(result, "title")}
                    </span>
                      </h5>
                      <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Code")} : {get(result, "code")}
                    </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </>
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
    drawToRender: get(state, "normalizer.data.country-one.result", []),
    isFetched: get(state, "normalizer.data.country-one.isFetched", false),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToRender: (id) => {
      const storeName = "country-one";
      const entityName = "country";
      const scheme = CountryScheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `country/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = "country-one";
      const entityName = "country";
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
        type: Actions.COUNTRY_CONTROLLER_DELETE.REQUEST,
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
    callToLink: (attributes) => {
      dispatch({
        type: Actions.LINK_ABS_COUNTRY_TO_CORE_COUNTRY.REQUEST,
        payload: {
          attributes,
          cb: {
            success: (nData, data) => {
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 1000
              });
              // setTimeout(() => {
              //   window.location.reload();
              // }, 500);
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
  };
};
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(View))
);
