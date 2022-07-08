import React, {memo} from 'react';
import {useParams} from "react-router-dom";
import UpdateContainer from "../containers/UpdateContainer";

const UpdatePage = ({...rest}) => {
    const {id} = useParams();
    return (
        <>
            <UpdateContainer id={id}/>
        </>
    );
};

export default memo(UpdatePage);
