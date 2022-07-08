import React from "react";
import { withRouter } from "react-router-dom";
import DistrictView from "../container/view";
const DistrictViewPage = (props) => {
  const {id} = props.match.params;
  return <DistrictView id={id} />;
};

export default withRouter(DistrictViewPage);
