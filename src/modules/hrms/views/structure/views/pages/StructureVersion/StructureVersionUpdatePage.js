import React from 'react';
import {useParams} from "react-router-dom";
import StructureVersionUpdateContainer from "../../../containers/StructureVersion/StructureVersionUpdateContainer";

const StructureVersionUpdatePage = ({...rest}) => {
    const {id} = useParams();
    return (
        <>
          <StructureVersionUpdateContainer id={id} {...rest}/>
        </>
    );
};

export default StructureVersionUpdatePage;
