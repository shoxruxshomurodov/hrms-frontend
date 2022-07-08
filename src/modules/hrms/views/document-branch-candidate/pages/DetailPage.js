import React from 'react';
import {useParams} from "react-router-dom";
import DetailContainer from "../containers/DetailContainer";

const DetailPage = (props) => {
    const {id} = useParams();
    return (
        <DetailContainer id={id} {...props} />
    );
};

export default DetailPage;
