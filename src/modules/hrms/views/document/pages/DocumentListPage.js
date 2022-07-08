import React from 'react';
import DocumentListContainer from "../containers/DocumentListContainer";

const DocumentListPage = ({match: {params: {encoded}}}) => {
    return (
        <>
            <DocumentListContainer encoded={encoded} />
        </>
    );
};

export default DocumentListPage;
