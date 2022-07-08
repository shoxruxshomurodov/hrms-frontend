// @flow
import * as React from 'react';
import StructureCreateForHierarchyContainer from "../../Structure/StructureCreateForHierarchyContainer";

export default function CreateStructureModal({organization,createStructure = () => {},openClose}) {
    return (
        <div
            className="custombox-overlay custombox-fadein custombox-open"
            style={{backgroundColor: "#00000078", opacity: 1}}
        >
            <div
                className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
                style={{animationDuration: "300ms", animationDelay: "150ms"}}
                onClick={(e) => {
                    if(e.currentTarget === e.target){
                        openClose(false);
                    }
                }
                }
            >
                <div
                    id="modal1"
                    className="text-left g-bg-white  g-pa-20"
                    style={{display: "block", width: 800,minHeight:"400px"}}
                >
                    <h1>Create Child Structure</h1>
                    <StructureCreateForHierarchyContainer createStructure={createStructure} organization={organization}/>
                </div>
            </div>
        </div>
    );
};