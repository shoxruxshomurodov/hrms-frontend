import  React from 'react';
import {useState} from 'react';
import CreateForm from "../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../containers/Form/component/Common/Button";
import {toast, ToastContainer} from "react-toastify";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Actions from "../../../../Actions";

const StructureCreateForHierarchyContainer = ({ t, column, organization,createStructure = () =>{}, ...rest}) => {

    const [isFetched, setIsFetched] = useState(false);

    const create = (data) => {
        data = {...data, rootStructureId: organization.id}
        setIsFetched("Create");
        createStructure({attributes:data,setIsFetched});
    };


    const values = [
        { id: 1,label:"Title", name: "title", type: "input", params: { required: true } },
        {
            id: 4,
            label:"Structure Type",
            name: "structureTypeId",
            type: "select-pagination",
            url:"structure-type",
            asyncSelectProperty:["id","title","title"],
            params: { required: true }
        }
    ];
    return (
        <>
            <CreateForm
                formRequest={create}
                values={values}
                CustomButton={CustomButton}
                cancelLink={null}
                buttonText={"Create"}
                isFetched={isFetched}
                params={{required: false}}
                property={{disabled: false}}
                column={column ?? [2, 6]}
            />
            <ToastContainer/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("HRMS")(StructureCreateForHierarchyContainer));