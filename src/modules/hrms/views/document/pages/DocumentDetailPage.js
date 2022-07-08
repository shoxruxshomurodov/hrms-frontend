import React from 'react';
import {useParams} from "react-router-dom";
import DocumentDetailContainer from "../containers/DocumentDetailContainer";

const DocumentDetailPage = (props) => {
    const {id} = useParams();
    return (
      <DocumentDetailContainer id={id} {...props} />

    );
};

export default DocumentDetailPage;
