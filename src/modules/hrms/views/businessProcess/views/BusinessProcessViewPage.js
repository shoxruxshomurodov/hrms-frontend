import React from "react";
import { withRouter } from "react-router-dom";
import BusinessProcessView from "../container/view";
const BusinessProcessViewPage = (props) => {
  const {id} = props.match.params;
  return <BusinessProcessView id={id} />;
};

export default withRouter(BusinessProcessViewPage);
