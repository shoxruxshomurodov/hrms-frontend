import React from "react";
import { withRouter } from "react-router-dom";
import CountryView from "../container/view";
const CountryViewPage = (props) => {
  const {id} = props.match.params;
  return <CountryView id={id} />;
};

export default withRouter(CountryViewPage);
