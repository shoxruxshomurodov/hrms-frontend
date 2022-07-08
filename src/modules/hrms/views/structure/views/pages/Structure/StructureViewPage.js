import React from "react";
import { withRouter } from "react-router-dom";
import StructureView from "../../../containers/Structure/View";
const StructureViewPage = (props) => {
  const { id } = props.match.params;
  return <StructureView id={id} />;
};

export default withRouter(StructureViewPage);
