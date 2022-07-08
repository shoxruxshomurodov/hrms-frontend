import React from "react";
import { withRouter } from "react-router-dom";
import View from "../container/view";
const EducationViewPage = (props) => {
  const { id } = props.match.params;
  return <View id={id} />;
};
export default withRouter(EducationViewPage);
