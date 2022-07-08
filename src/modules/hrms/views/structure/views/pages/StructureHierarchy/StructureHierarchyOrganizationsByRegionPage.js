import React from 'react';
import StructureHierarchyOrganizationsByRegionContainer
    from "../../../containers/StructureHierarchy/StructureHierarchyOrganizationsByRegionContainer";


const StructureHierarchyOrganizationsByRegionPage = ({match:{params:{id}} = {params:{id:null}},...rest}) => {
    return (
        <StructureHierarchyOrganizationsByRegionContainer id={id} {...rest}/>

    );
};

export default StructureHierarchyOrganizationsByRegionPage;
