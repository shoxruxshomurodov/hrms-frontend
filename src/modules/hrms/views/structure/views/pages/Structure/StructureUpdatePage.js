import React, { useEffect, useState } from "react";
import UpdateForm from "../../../../../../../containers/Form/Form";
import CustomButton from "../../../../../../../containers/Form/component/Common/Button";
import SuccessNotify from "../../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../../components/Sweetalerts/ErrorNotify";
import Api from "../../../../../Api";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StructureScheme from "../../../../../../../schema/Structure";
import Breadcrumb from "../../../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Normalizer from "../../../../../../../services/normalizer";
import ApiActions from "../../../../../../../services/api/Actions";
import Loader from "../../../../../../../components/Loader/Loader";
import EmployeesScheme from "../../../../../../../schema/Employees";
import helper from "../../../../../../../containers/Form/helper";

function StructureUpdatePage(props) {
    const dispatch = useDispatch();
    const result = useSelector((state) =>
        get(state, "normalizer.data.structure.result", [])
    );
    let employees = useSelector((state) => get(state, 'normalizer.data.get-employees-list.result.content', []))
    const isFetchedProps = useSelector((state) =>
        get(state, "normalizer.data.structure.isFetched", false)
    );
    const entities = useSelector((state) =>
        get(state, "normalizer.entities", {})
    );
    const [isFetched, setIsFetched] = useState(false);
    const [state, setState] = useState(false);
    const [staffs, setStaffs] = useState([])

    const getStructure = (id) => {
        const storeName = "structure";
        const entityName = "structure";
        const scheme = StructureScheme;
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `structure/${id}`,
                scheme,
                storeName,
                entityName
            }
        });
    };
    const getEmployeeList =  (staffId) => {
        const storeName = "get-employees-list";
        const entityName = "employee-list";
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "employees/all",
                config: {
                    params: {
                        isDeleted: false,
                        staffId
                    }
                },
                scheme: {content: [EmployeesScheme]},
                storeName: storeName,
                entityName: entityName
            }
        });
    };

    const onchange = (name, event) => {
        getEmployeeList(get(event,"value"))
        setState(event);
    };

    useEffect(() => {
        const {id} = props.match.params;
        getStructure(id);
    }, []);

    const update = (data) => {
        const {id} = props.match.params;
        setIsFetched("Update");
        Api.structureUpdate(id, data)
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

    const {t} = props;
    let structure = Normalizer.Denormalize(result, StructureScheme, entities);
    employees = Normalizer.Denormalize(employees, [EmployeesScheme], entities);
    const optionsEmployees = helper.renderProperty(employees, [
        "id",
        "fullName"
    ],{ id: "", fullName: "No selected" });
    const values = [
        {
            id: 1,
            label: "Title",
            name: "title",
            type: "input",
            defaultValue: get(structure, "title")
        },
        {
            id: 2,
            label: "Structure",
            name: "parentStructureId",
            type: "select-pagination",
            url: "structure",
            value: {value: get(structure, "parentStructure.id"), label: get(structure, "parentStructure.title")},
            asyncSelectProperty: ["id", "title", "altAbsCode"],
            params: {required: false}
        },
        {
            id: 3,
            label: "Structure type",
            name: "structureTypeId",
            type: "select-pagination",
            url: "structure-type",
            value: {value: get(structure, "structureType.id"), label: get(structure, "structureType.title")},
            asyncSelectProperty: ["id", "title", "code"],
            params: {required: false}
        },
        {
            id: 4,
            label: "Status",
            name: "status",
            type: "select",
            defaultValue: {
                value: get(structure, "status")?.toUpperCase(),
                label: get(structure, "status")?.toUpperCase()
            },
            options: [
                {value: "ACTIVE", label: "ACTIVE"},
                {value: "PASSIV", label: "PASSIV"}
            ],
        },
        {
            id: 5,
            label: "Description",
            name: "description",
            type: "textarea",
            defaultValue: get(structure, "description")
        },
        {
            id: 6,
            label: "Staff Alt ID",
            name: "staffId",
            type: "select-pagination",
            url: "staff",
            value: {value: get(structure, "staffAltId"), label: `${get(structure, "staffAltId")} -  ${get(structure, "staffTitle")}`},
            asyncSelectProperty: ["id", 'title',"altId"],
            params: {required: false},
        },
        {
            id: 7,
            name: "employeeId",
            type: "select",
            options: optionsEmployees,
            label: "Employee",
            value: {value: get(structure, "employeeId"), label: get(structure, "employeeName")},
            defaultValue: {value: get(structure, "employeeId"), label: get(structure, "employeeName")},
            params: {required: false},
            custom: (data, render) => {
                if (state || get(structure, "employeeId")) {
                    return render;
                }
            },
        },
    ];


    const {id} = props.match.params;
    if (!isFetchedProps) {
        return <Loader/>
    }
    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Structure"), url: "/structure"},
                    {
                        id: 2,
                        title: "Structure",
                        url: `/structure/view/${id}`
                    },
                    {id: 3, title: t("Update"), url: `/structure/view/${id}`},
                    {id: 4, title: get(structure, "title"), url: ""},

                ]}
            />
            <UpdateForm
                onchange={onchange}
                formRequest={update}
                values={values}
                CustomButton={CustomButton}
                cancelLink={`/structure/view/${id}`}
                buttonText={"Update"}
                isFetched={isFetched}
                params={{required: false}}
                property={{disabled: false}}
            />
            <ToastContainer/>
        </>
    );
}

export default withTranslation("HRMS")(StructureUpdatePage);
