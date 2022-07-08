import React from "react";
import { withRouter } from "react-router-dom";
import CustomDocumentView from "../../../containers/CustomDocumentVariable/View";
const CustomDocumentViewPage = (props) => {
  const { id } = props.match.params;
  return <CustomDocumentView id={id} />;
};

export default withRouter(CustomDocumentViewPage);
