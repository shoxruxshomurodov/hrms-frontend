import React from "react";
import { withRouter } from "react-router-dom";
import GspRegionView from "../container/view";
const GspRegionViewPage = (props) => {
  const {id} = props.match.params;
  return <GspRegionView id={id} />;
};

export default withRouter(GspRegionViewPage);
