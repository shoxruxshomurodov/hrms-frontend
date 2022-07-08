import React, {useState} from 'react';
import {connect} from "react-redux";
import CreateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import Actions from "../../../../../Actions";
import {toast} from "react-toastify";
import Loader from "../../../../../../../components/Loader";

const AttachFilialsToBlockModal = ({
                                       templateId: structureIdTemplate = null, openClose = () => {
    }, setStructureHierarchyAsTemplate
                                   }) => {
    const [loading,setLoading] = useState(false);
    const create = ({rootStructuresIds = []}) => {
        setLoading(true)
        rootStructuresIds = rootStructuresIds.map(({value}) => value);
        setStructureHierarchyAsTemplate({attributes: {rootStructuresIds, structureIdTemplate}, cb: {success: () => {
                    setLoading(false);
                    toast.dismiss();
                    toast.success('Успешно', {
                        position: "top-right",
                        autoClose: 3000,
                    })
                    openClose();
                },
                fail: ({message="ERROR"}) => {
                    setLoading(false);
                    toast.dismiss();
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    openClose();
                },}})
    };

    const values = [
        {
            id: 1,
            label: "Root structure",
            name: "rootStructuresIds",
            type: "select-pagination",
            url: "structure?type=ORGANIZATION",
            asyncSelectProperty: ["id", "title", "altAbsCode"],
            params: {required: true},
            isMulti: true,
            column: [2, 10],
            attrSearch:"altAbsCode"
        },
    ];
    if(loading){
        return <Loader />;
    }
    return (
        <div
            className="custombox-overlay custombox-fadein custombox-open"
            style={{backgroundColor: "#00000078", opacity: 1}}
        >
            <div
                className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
                style={{animationDuration: "300ms", animationDelay: "150ms"}}
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        openClose(false);
                    }
                }
                }
            >
                <div
                    id="modal1"
                    className="text-left g-bg-white  g-pa-20"
                    style={{display: "block", width: 800, minHeight: "400px"}}
                >
                    <h1>Attach template to root structure</h1>
                    <CreateForm
                        formRequest={create}
                        values={values}
                        CustomButton={CustomButton}
                        cancelLink={null}
                        buttonText={"Create"}
                        params={{required: false}}
                        property={{disabled: false}}
                    />
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        setStructureHierarchyAsTemplate: ({attributes, cb}) => {
            dispatch({type: Actions.SET_STRUCTURE_HIERARCHY_AS_TEMPLATE.REQUEST, payload: {attributes, cb}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachFilialsToBlockModal);
