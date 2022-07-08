import React, {Component} from 'react';
import {get, isEqual} from "lodash";
import LoaderMini from "../../../../../components/Loader/LoaderMini";
import {withTranslation} from "react-i18next";
import Actions from "../../../Actions";
import {toast, ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Breadcrumb from "../../../../../components/Breadcrumb";
class SettingsPage extends Component {
  state = {
    isFetched:false
  }
  changeState = (state) => {
    this.setState({isFetched: state})
  }
  loadCountries = () => {
    const {callToLoadCountries} = this.props;
    callToLoadCountries(this.changeState)
    this.setState({isFetched:"load-countries"})
  }
  loadDistricts = () => {
    const {callToLoadDistricts} = this.props;
    callToLoadDistricts(this.changeState);
    this.setState({isFetched:"load-districts"})
  }
  loadNations = () => {
    const {callToLoadNations} = this.props;
    callToLoadNations(this.changeState)
    this.setState({isFetched:"load-nations"})
  }
  loadParties = () => {
    const {callToLoadParties} = this.props;
    callToLoadParties(this.changeState)
    this.setState({isFetched:"load-parties"})
  }
  loadRegions = () => {
    const {callToLoadRegions} = this.props;
    callToLoadRegions(this.changeState)
    this.setState({isFetched:"load-regions"})
  }

  render() {
    const {t} = this.props;
    const {isFetched} = this.state;
    const titles = [
      { id: 1, title: t("Справочник"), url: "/setting" },
      { id: 2, title: "Setting", url: "/setting" }
    ];
    return (
      <>
      <Breadcrumb titles={titles} />
      <div>
        <button
          className="btn btn-sm u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
           onClick={this.loadCountries}
          disabled={isEqual(isFetched,'load-countries')}
        >
          {isEqual(isFetched,'load-countries') && <LoaderMini />}  <span>{t("Загрузить страны")}</span>
        </button>
        <button
          className="btn btn-sm u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={this.loadDistricts}
          disabled={isEqual(isFetched,'load-districts')}
        >
          {isEqual(isFetched,'load-districts') && <LoaderMini />}  <span>{t("Загрузить районы")}</span>
        </button>
        <button
          className="btn btn-sm u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={this.loadNations}
          disabled={isEqual(isFetched,'load-nations')}
        >
          {isEqual(isFetched,'load-nations') && <LoaderMini />}  <span>{t("Загрузить национальность")}</span>
        </button>
        <button
          className="btn btn-sm u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={this.loadParties}
          disabled={isEqual(isFetched,'load-parties')}
        >
          {isEqual(isFetched,'load-parties') && <LoaderMini />}  <span>{t("Загрузить партий")}</span>
        </button>
        <button
          className="btn btn-sm u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={this.loadRegions}
          disabled={isEqual(isFetched,'load-regions')}
        >
          {isEqual(isFetched,'load-regions') && <LoaderMini />}  <span>{t("Загрузить регионы")}</span>
        </button>
        <ToastContainer />
      </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetched: get(state, "normalizer.data.isFetched", false),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callToLoadCountries: (callback) => {
      dispatch({
        type: Actions.IABS_LOAD_COUNTRIES.REQUEST,
        payload: {
          cb: {
            success: (nData, data) => {
              callback(false)
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 2000
              });
            },
            fail: (e) => {
              callback(false)
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 2000
              });
            }
          }
        }
      });
    },
    callToLoadDistricts: (callback) => {

      dispatch({
        type: Actions.IABS_LOAD_DISTRICTS.REQUEST,
        payload: {
          cb: {
            success: (nData, data) => {
              callback(false)
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 1500
              });
            },
            fail: (e) => {
              callback(false)
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 1500
              });
            }
          }
        }
      });
    },
    callToLoadNations: (callback) => {

      dispatch({
        type: Actions.IABS_LOAD_NATIONS.REQUEST,
        payload: {
          cb: {
            success: (nData, data) => {
              callback(false)
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 1500
              });
            },
            fail: (e) => {
              callback(false)
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 1500
              });
            }
          }
        }
      });
    },
    callToLoadParties: (callback) => {
      dispatch({
        type: Actions.IABS_LOAD_PARTIES.REQUEST,
        payload: {
          cb: {
            success: (nData, data) => {
              callback(false)
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 1500
              });
            },
            fail: (e) => {
              callback(false)
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 1500
              });
            }
          }
        }
      });
    },
    callToLoadRegions: (callback) => {
      dispatch({
        type: Actions.IABS_LOAD_REGIONS.REQUEST,
        payload: {
          cb: {
            success: (nData, data) => {
              callback(false)
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 1500
              });
            },
            fail: (e) => {
              callback(false)
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 1500
              });
            }
          }
        }
      });
    },
  };
};
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(SettingsPage))
);
