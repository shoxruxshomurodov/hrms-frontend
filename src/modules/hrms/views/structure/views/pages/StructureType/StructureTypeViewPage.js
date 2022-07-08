import React from "react";
import { withRouter } from "react-router-dom";
import StructureTypeView from "../../../containers/StructureType/View";
const StructureTypeViewPage = (props) => {
  const { id } = props.match.params;
  return <StructureTypeView id={id} />;
};

export default withRouter(StructureTypeViewPage);
