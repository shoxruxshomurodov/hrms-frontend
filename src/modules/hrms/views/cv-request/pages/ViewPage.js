import React from 'react';
import {useParams} from "react-router-dom";
import ViewContainer from "../containers/ViewContainer";

const Viewpage = ({
                      ...rest
                  }) => {
    const {id} = useParams();
    return (
        <>
            <ViewContainer id={id} />
        </>
    );
};

export default Viewpage;
