import React from "react";
import { withRouter } from "react-router-dom";
import RegionView from "../container/view";
const RegionViewPage = (props) => {
  const {id} = props.match.params;
  return <RegionView id={id} />;
};

export default withRouter(RegionViewPage);
