import React from "react";
import { withRouter } from "react-router-dom";
import DocumentView from "../../../containers/Document/View";
const DocumentViewPage = (props) => {
  const {id} = props.match.params;
  return <DocumentView id={id} />;
};

export default withRouter(DocumentViewPage);
