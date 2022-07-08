import React, {memo} from 'react';
import {useParams} from "react-router-dom";
import ViewContainer from "../containers/ViewContainer";

const ViewPage = ({...rest}) => {
    const {id} = useParams();
    return (
        <>
            <ViewContainer
                id={id}
                {...rest}
            />
        </>
    );
};

export default memo(ViewPage);
