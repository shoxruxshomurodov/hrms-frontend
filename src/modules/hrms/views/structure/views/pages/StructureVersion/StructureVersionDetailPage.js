import React from 'react';
import StructureVersionDetailContainer from "../../../containers/StructureVersion/StructureVersionDetailContainer";
import {useParams} from "react-router-dom";

const StructureVersionDetailPage = ({...rest}) => {
    const {id} = useParams();
    return (
        <>
            <StructureVersionDetailContainer id={id} {...rest} />
        </>
    );
};

export default StructureVersionDetailPage;
