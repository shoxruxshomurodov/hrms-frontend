import React, {memo, useEffect, useState, useMemo} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {entries, get, head, last} from "lodash";
import {useHistory} from "react-router-dom";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import VacancyScheme from "../../../../../schema/VacancyScheme";
import Loader from "../../../../../components/Loader";
import SkillScheme from "../../../../../schema/SkillScheme";
import Speciality from "../../../../../schema/Speciality";

const CreateContainer = ({
                             t,
                             column,
                             vacancyAddRequest,
                             getSalaryCalcTypes,
                             salaryCalcTypes,
                             getWorkExperienceList,
                             workExperienceList,
                             getEmploymentList,
                             employmentList,
                             skillAddRequest,
                             getFreePositionList,
                             freePositionList,
                             specialtyAddRequest,
                             ...props
                         }) => {

    const [regionId, setRegionId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [length, setLength] = useState(0);
    const history = useHistory();

    useEffect(() => {
        getSalaryCalcTypes();
        getWorkExperienceList();
        getEmploymentList();
        getFreePositionList();
    }, [])


    const create = (data) => {
        const {skills = [], ...rest} = data;

        vacancyAddRequest({
            attributes: {...rest, skills: skills.map(({value}) => value)},
            formMethods: {},
            cb: {
                success: (nData, data) => {

                    toast.dismiss();
                    toast.success("Успешно", {
                        position: "top-right",
                        autoClose: 1000
                    });
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                },
            }
        })
    };

    const createValue = (data) => {
        skillAddRequest({
            attributes: {...data},
            formMethods: {},
            cb: {
                success: (nData, data) => {
                    window.location.reload()
                    toast.dismiss();
                    toast.success("Успешно", {
                        position: "top-right",
                        autoClose: 1000
                    });
                },
            }
        })
    };

    const createSpecialty = (data) => {
        specialtyAddRequest({
            attributes: {...data},
            formMethods: {},
            cb: {
                success: (nData, data) => {
                    window.location.reload()
                    toast.dismiss();
                    toast.success("Успешно", {
                        position: "top-right",
                        autoClose: 1000
                    });
                },
            }
        })
    };

    const values = [
        {
            id: 1,
            label: t("Title"),
            name: "title",
            type: "input",
            params: {required: true}
        },


        {
            id: 2,
            label: t("Specialty"),
            name: "specialityId",
            type: "select-pagination",
            url: "speciality",
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
            creatable: true,
            create: (value) => createSpecialty({title: value})
        },
        {
            id: 3,
            label: t("Country"),
            name: "countryId",
            type: "select-pagination",
            url: "country",
            value: {
                value: 507,
                label: '507 - Узбекистан'
            },
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
            property: {disabled: true}
        },
        {
            id: 4,
            label: t("Region"),
            name: "regionId",
            type: "select-pagination",
            url: "vacancy/regions-list",
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
            // property: {disabled: length == 1},
            getDependentValue: (value) => setRegionId(value)
        },
        {
            id: 5,
            label: t("District"),
            name: "districtId",
            type: "select-pagination",
            url: "district",
            asyncSelectProperty: ["id", "title"],
            params: {required: true, regionId},
            getDependentValue: (value) => setDistrictId(value)
        },
        {
            id: 14,
            label: t("Position"),
            name: "staffId",
            url: `vacancy/free-staff?regionId=${regionId}&districtId=${districtId}`,
            asyncSelectProperty: ["id", "title"],
            type: "select-pagination",
            params: {required: true}
        },
        {
            id: 6,
            label: t("salaryAmountFrom"),
            name: "salaryAmountFrom",
            type: "input",
            sort: 'number',
        },
        {
            id: 7,
            label: t("salaryAmountTo"),
            name: "salaryAmountTo",
            type: "input",
            sort: 'number',
        },
        {
            id: 8,
            label: t("Salary calculation type"),
            name: "salaryCalcType",
            options: entries(get(salaryCalcTypes, 'result', {})).map(entry => ({
                value: head(entry),
                label: last(entry)
            })),
            type: "radio"
        },
        {
            id: 9,
            label: t("Address"),
            name: "address",
            type: "textarea"
        },
        {
            id: 10,
            label: t("Work experience"),
            name: "workExperience",
            options: entries(get(workExperienceList, 'result', {})).map(entry => ({
                value: head(entry),
                label: last(entry)
            })),
            type: "select"
        },
        {
            id: 11,
            label: t("Employment"),
            name: "employment",
            options: entries(get(employmentList, 'result', {})).map(entry => ({
                value: head(entry),
                label: last(entry)
            })),
            type: "select"
        },

        {
            id: 12,
            label: t("Detail"),
            name: "detail",
            type: "ckeditor"
        },
        {
            id: 13,
            label: t("Skills"),
            name: "skills",
            type: "select-pagination",
            url: "skill",
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
            isMulti: true,
            creatable: true,
            create: (value) => createValue({title: value})
        },
        {
            id: 14,
            label: t("Deadline"),
            name: "deadline",
            type: "datepicker",
            params: {required: true}
        },
    ];

    if (!get(salaryCalcTypes, 'isFetched', false) || !get(workExperienceList, 'isFetched', false)) {
        return <Loader/>;
    }


    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Vacancy"), url: "/vacancy"},
                    {id: 3, title: t("Create"), url: ""}
                ]}
            />
            <Form
                formRequest={create}
                values={values}
                cancelLink={"/vacancy"}
                buttonText={"Create"}
                CustomButton={CustomButton}
                isFetched={true}
                params={{required: false}}
                property={{disabled: false}}
                column={column ?? [2, 6]}
            />
        </>
    );
};

const makeMapStateToProps = (state) => {
    return {
        salaryCalcTypes: get(state, 'apiReducer.data.salary-calc-types', {}),
        workExperienceList: get(state, 'apiReducer.data.work-experience-list', {}),
        employmentList: get(state, 'apiReducer.data.vacancy-employment-list', {}),
        freePositionList: get(state, 'apiReducer.data.vacancy-free-position-list', {})
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        vacancyAddRequest: ({
                                attributes,
                                url = 'vacancy',
                                formMethods = {},
                                scheme = VacancyScheme,
                                storeName = 'vacancy',
                                entityName = 'vacancy',
                                cb = {}
                            }) => {
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    url,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
        skillAddRequest: ({
                              attributes,
                              url = 'skill',
                              formMethods = {},
                              scheme = SkillScheme,
                              storeName = 'skill',
                              entityName = 'skill',
                              cb = {}
                          }) => {
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    url,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
        specialtyAddRequest: ({
                              attributes,
                              url = 'speciality/',
                              formMethods = {},
                              scheme = Speciality,
                              storeName = 'specialty',
                              entityName = 'specialty',
                              cb = {}
                          }) => {
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    url,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },

        getSalaryCalcTypes: () => {
            const storeName = "salary-calc-types";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `vacancy/vacancy-salary-calc-type-list`,
                    storeName,
                    config: {},
                },
            });
        },

        getWorkExperienceList: () => {
            const storeName = "work-experience-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `vacancy/vacancy-work-experience-list`,
                    storeName,
                    config: {},
                },
            });
        },

        getEmploymentList: () => {
            const storeName = "vacancy-employment-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `vacancy/vacancy-employment`,
                    storeName,
                    config: {},
                },
            });
        },
        getFreePositionList: () => {
            const storeName = "vacancy-free-position-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `staff/free-staff-my-department`,
                    storeName,
                    config: {},
                },
            });
        },

    }
}


export default withTranslation("HRMS")(connect(makeMapStateToProps, mapDispatchToProps)(memo(CreateContainer)));