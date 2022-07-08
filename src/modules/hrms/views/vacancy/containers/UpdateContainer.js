import React, {memo, useEffect} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import {entries, get, head, last} from "lodash";
import Normalizer from "../../../../../services/normalizer";
import Loader from "../../../../../components/Loader";
import VacancyScheme from "../../../../../schema/VacancyScheme";

const UpdateContainer = ({
                             t,
                             id,
                             column,
                             vacancyUpdateRequest,
                             getVacancyRequest,
                             entities,
                             vacancy,
                             getSalaryCalcTypes,
                             getWorkExperienceList,
                             getEmploymentList,
                             salaryCalcTypes,
                             workExperienceList,
                             employmentList,
                             ...rest
                         }) => {

    useEffect(() => {
        getSalaryCalcTypes();
        getWorkExperienceList();
        getEmploymentList();
    }, [])

    useEffect(() => {
        getVacancyRequest(id);
    }, [id])

    vacancy = Normalizer.Denormalize(vacancy, {result: VacancyScheme}, entities);


    const update = (data) => {
        const {skills = [],...rest} = data;
        vacancyUpdateRequest({
            id,
            attributes: {...rest,skills:skills.map(({value}) => value)},
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


    const values = [
        {
            id: 1,
            label: t("Title"),
            name: "title",
            type: "input",
            defaultValue: get(vacancy, 'result.title'),
            params: {required: true}
        },
        {
            id: 14,
            label: t("Position"),
            name: "staffId",
            type: "select-pagination",
            url: "staff/free-staff-my-department",
            asyncSelectProperty: ["id", "title"],
            value: {
                value: get(vacancy, 'result.staff.id'),
                label: get(vacancy, 'result.staff.postName')
            },
            params: {required: true}
        },

        {
            id: 2,
            label: t("Specialty"),
            name: "specialityId",
            type: "select-pagination",
            url: "speciality",
            asyncSelectProperty: ["id", "title",],
            value: {
                value: get(vacancy, 'result.specialty.id'),
                label: get(vacancy, 'result.specialty.title')
            },
            params: {required: true}
        },
        {
            id: 3,
            label: t("Country"),
            name: "countryId",
            type: "select-pagination",
            url: "country",
            value: {
                value: get(vacancy, 'result.country.id'),
                label: get(vacancy, 'result.country.title')
            },
            asyncSelectProperty: ["id", "title"],
            params: {required: true},
            property:{disabled:true}
        },
        {
            id: 4,
            label: t("Region"),
            name: "regionId",
            type: "select-pagination",
            url: "region",
            value: {
                value: get(vacancy, 'result.region.id'),
                label: get(vacancy, 'result.region.title')
            },
            asyncSelectProperty: ["id", "title"],
            params: {required: true}
        },
        {
            id: 5,
            label: t("District"),
            name: "districtId",
            type: "select-pagination",
            url: "district",
            value: {
                value: get(vacancy, 'result.district.id'),
                label: get(vacancy, 'result.district.title')
            },
            asyncSelectProperty: ["id", "title"],
            params: {required: true}
        },
        {
            id: 6,
            label: t("salaryAmountFrom"),
            name: "salaryAmountFrom",
            defaultValue: get(vacancy, 'result.salaryAmountFrom'),
            type: "input",
            sort: 'number',
        },
        {
            id: 7,
            label: t("salaryAmountTo"),
            name: "salaryAmountTo",
            defaultValue: get(vacancy, 'result.salaryAmountTo'),
            type: "input",
            sort: 'number',
        },
        {
            id: 8,
            label: t("Salary calculation type"),
            name: "salaryCalcType",
            defaultValue: {
                value: get(vacancy, 'result.salaryCalcType'),
                label: get(vacancy, 'result.salaryCalcType')
            },
            options: entries(get(salaryCalcTypes, 'result', {})).map(entry => ({
                value: head(entry),
                label: last(entry)
            })),
            type: "select"
        },
        {
            id: 9,
            label: t("Address"),
            name: "address",
            defaultValue: get(vacancy, 'result.address'),
            type: "textarea"
        },
        {
            id: 10,
            label: t("Work experience"),
            name: "workExperience",
            defaultValue: {value:get(vacancy, 'result.workExperience'),label:get(vacancy, 'result.workExperience')},
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
            defaultValue: {value:get(vacancy, 'result.employment'),label:get(vacancy, 'result.employment')},
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
            defaultValue: get(vacancy, 'result.detail'),
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
            value: get(vacancy, 'result.skills',[]).map(skill => ({value:get(skill,'id'),label:get(skill,'title')})),
        },
        {
            id: 14,
            label: t("Deadline"),
            name: "deadline",
            type: "datepicker",
            defaultValue: get(vacancy, 'result.deadline'),
            params: {required: true}
        },

    ];

    if (!get(vacancy, 'isFetched', false)) {
        return <Loader/>;
    }

    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Vacancy"), url: "/vacancy"},
                    {id: 3, title: t("Update"), url: ""}
                ]}
            />
            <Form
                formRequest={update}
                values={values}
                cancelLink={"/vacancy"}
                buttonText={"Save"}
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
        entities: get(state, 'normalizer.entities', {}),
        vacancy: get(state, 'normalizer.data.vacancy', {}),
        salaryCalcTypes: get(state, 'apiReducer.data.salary-calc-types', {}),
        workExperienceList: get(state, 'apiReducer.data.work-experience-list', {}),
        employmentList: get(state, 'apiReducer.data.vacancy-employment-list', {})
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        vacancyUpdateRequest: ({
                                   id,
                                   attributes,
                                   url = 'vacancy',
                                   formMethods = {},
                                   scheme = VacancyScheme,
                                   storeName = 'vacancy',
                                   entityName = 'vacancy',
                                   cb
                               }) => {
            dispatch({
                type: ApiActions.OPERATION_UPDATE.REQUEST,
                payload: {
                    attributes,
                    url: `${url}/${id}`,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
        getVacancyRequest: (id) => {
            const storeName = "vacancy";
            const entityName = "vacancy";
            const scheme = VacancyScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `vacancy/${id}`,
                    scheme,
                    storeName,
                    entityName
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


export default withTranslation("HRMS")(connect(makeMapStateToProps, mapDispatchToProps)(memo(UpdateContainer)));