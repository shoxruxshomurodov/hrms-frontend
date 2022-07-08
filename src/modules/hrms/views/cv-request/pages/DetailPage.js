import React, {memo} from 'react';
import DetailContainer from "../containers/DetailContainer";
import {useParams} from "react-router-dom";

const DetailPage = ({
                        ...rest
                    }) => {
    const {id} = useParams();
    return (
        <>
            <DetailContainer id={id}/>
        </>
    );
};

export default memo(DetailPage);