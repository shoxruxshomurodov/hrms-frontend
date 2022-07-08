import React from "react";
import { withRouter } from "react-router-dom";
import GspCountryView from "../container/view";
const GspCountryViewPage = (props) => {
  const {id} = props.match.params;
  return <GspCountryView id={id} />;
};

export default withRouter(GspCountryViewPage);
