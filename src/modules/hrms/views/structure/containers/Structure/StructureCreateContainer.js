// @flow
import * as React from 'react';
import {useState} from "react";
import Api from "../../../../Api";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import CreateForm from "../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../containers/Form/component/Common/Button";
import {ToastContainer} from "react-toastify";
import {withTranslation} from "react-i18next";

const StructureCreateContainer = function (props) {

    const [isFetched, setIsFetched] = useState(false);
    const create = (data) => {
        setIsFetched("Create");
        Api.structureCreate(data)
            .then((_res) => {
                setIsFetched(false);
                SuccessNotify("Успешно создан");
                setTimeout(() => {
                    window.history.back();
                }, 1000);
            })
            .catch((e) => {
                setIsFetched(false);
                ErrorNotify(e.response.data.message);
            });
    };
    const { t,column } = props;

    const values = [
        { id: 1,label:"Title", name: "title", type: "input", params: { required: true } },
        {
            id: 2,
            label:"AltAbsCode",
            name: "altAbsCode",
            type: "input",
            params: { required: false }
        },
        {
            id: 3,
            label:"Structure Root",
            name: "rootStructureId",
            type: "select-pagination",
            url:"structure",
            asyncSelectProperty:["id","title","altAbsCode","regionTitle"],
            isGrouped:true,
            params: { required: false,isDeleted:false,type:'ORGANIZATION'}
        },
        {
            id: 4,
            label:"Structure Type",
            name: "structureTypeId",
            type: "select-pagination",
            url:"structure-type",
            asyncSelectProperty:["id","title","code"],
            params: { required: true }
        },
        { id: 5, label:"Description", name: "description", type: "textarea" },
        { id: 6, label:"Staff Alt ID", name: "staffAltId", type: "input" }
    ];
    return (
        <>
            <Breadcrumb
                titles={[
                    { id: 1, title: t("Structure"), url: "/structure" },
                    { id: 2, title: "Structure", url: "/structure" },
                    { id: 3, title: t("Create"), url: "" }
                ]}
            />
            <CreateForm
                formRequest={create}
                values={values}
                CustomButton={CustomButton}
                cancelLink={"/structure"}
                buttonText={"Create"}
                isFetched={isFetched}
                params={{ required: false }}
                property={{ disabled: false }}
                column={column ?? [2, 6]}
            />
            <ToastContainer />
        </>
    );
};

export default withTranslation("HRMS")(StructureCreateContainer);