import React from 'react';
import {useParams} from "react-router-dom";
import RecruitmentDetailContainer from "../containers/RecruitmentDetailContainer";

const RecruitmentDetailPage = (props) => {
    const {id} = useParams();
    return (
        <RecruitmentDetailContainer id={id} {...props} />
    );
};

export default RecruitmentDetailPage;
