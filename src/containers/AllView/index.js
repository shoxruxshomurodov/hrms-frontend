import React, { Component } from "react";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../components/Loader";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
class AllView extends Component {
  componentDidMount() {
    const { id, callToRender, callToRenderTrigger } = this.props;
    callToRenderTrigger();
    callToRender(id);
  }
  render() {
    let {
      allView,
      entities,
      isFetched,
      scheme,
      CustomNavigator: Navigator,
      CustomView: View,
      BreadCrumbTitles,
      CustomLeftSide,
      CustomRightSide,
      CustomFooter: Footer,
      methods,
    } = this.props;
    const result = Normalizer.Denormalize(allView, scheme, entities);
    if (!isFetched) {
      return <Loader />;
    }
    return (
      <>
        <Navigator
          left={CustomLeftSide}
          methods={methods}
          right={CustomRightSide}
          titles={BreadCrumbTitles}
        />
        {!isEmpty(result) ? <View methods={methods} /> : <Loader />}
        {Footer && <Footer />}
        <ToastContainer />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    allView: get(state, `normalizer.data.${ownProps.storeName}.result`, []),
    isFetched: get(state,`normalizer.data.${ownProps.storeName}.isFetched`,false),
    entities: get(state, "normalizer.entities", [])
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    callToRender: (id) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      const scheme = ownProps.scheme;
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `${ownProps.storeName}/${id}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    callToRenderTrigger: () => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName,
          entityName
        }
      });
    }
  };
};
export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(AllView))
);
