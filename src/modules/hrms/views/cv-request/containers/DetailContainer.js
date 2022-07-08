import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {find, get, head, isEmpty, isEqual, isNil, trim} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import {withTranslation} from "react-i18next";
import Loader from "../../../../../components/Loader";
import {toast, ToastContainer} from "react-toastify";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {withRouter} from "react-router-dom";
import VacancyScheme from "../../../../../schema/VacancyScheme";
import CvRequest from "../../../../../schema/CvRequest";
import ReactHtmlParser from "react-html-parser";
import Pagination from "../../../../../components/Pagination/custom/Pagination";
import ToolBarStructure from "../../../../../components/ToolBar/ToolBarStructure";
import BreadCrumb from "../../../../../components/Breadcrumb";
import GridView from "../../../../../containers/GridView";
import CandidateHead from "../components/candidate/CandidateHead";
import CandidateBody from "../components/candidate/CandidateBody";

const DetailContainer = ({
                             t,
                             id,
                             entities,
                             history,
                             getVacancy,
                             vacancy,
                             result = {},
                             ...props
                         }) => {


    useEffect(() => {
        getVacancy(id);
    }, [id]);
    vacancy = Normalizer.Denormalize(vacancy, {result: VacancyScheme}, entities);


    if (!get(vacancy, 'isFetched', false)) {
        return <Loader/>;
    }


    return (
        <>
            <div className="flex-display-more">
                <Breadcrumb
                    titles={[
                        {id: 1, title: t("CV"), url: "/CvRequest"},
                        {id: 2, title: get(vacancy, "result.title"), url: ""}
                    ]}
                />
            </div>
            {trim(get(vacancy, 'result.notes', null)) && <div className="row">
                <div className="col-12">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        {ReactHtmlParser(get(vacancy, 'result.notes', ''))}
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-md-5">
                    <h2 className="g-font-weight-300 g-font-size-24 g-color-black g-mb-10 g-mt-10">{t("Vacancy")}</h2>
                    <div className="media-body g-brd-around g-brd-gray-light-v4 g-pa-30">
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Vacancy")} : {get(vacancy, "result.title", "")}
                    </span>
                            </h5>
                        </div>

                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Skills")} : {get(vacancy, "result.skills", []).map(skill => <span key={get(skill, 'id')}
                                                                                            className={'btn u-btn-primary g-rounded-50 g-mr-10 g-mb-15'}>{
                        get(skill, 'title')
                    }</span>)}
                    </span>
                            </h5>
                        </div>

                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Specialty")} : {get(vacancy, "result.specialty.title", "")}
                    </span>
                            </h5>
                        </div>


                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Region")} : {get(vacancy, 'result.region.title')}
                    </span>
                            </h5>
                        </div>

                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("District")} : {get(vacancy, 'result.district.title')}
                    </span>
                            </h5>
                        </div>

                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Employment")} : {get(vacancy, 'result.employment')}
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Work experience")} : {get(vacancy, 'result.workExperience')}
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Salary")} : {`${get(vacancy, 'result.salaryAmountFrom')} - ${get(vacancy, 'result.salaryAmountTo')}`} UZS
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("CV count")} : {get(vacancy, 'result.count')}
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Detail")} : {ReactHtmlParser(get(vacancy, "result.detail", ""))}
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Created date")} : {get(vacancy, 'result.createdDate')}
                    </span>
                            </h5>
                        </div>
                        <div className="g-mb-15">
                            <h5 className="d-flex justify-content-between align-items-center h5 mb-0">
                    <span className="d-block g-mr-10">
                      {t("Published date")} : {get(vacancy, 'result.createdDate')}
                    </span>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <h2 className="g-font-weight-300 g-font-size-24 g-color-black g-mb-10 g-mt-10">{t("Candidates")}</h2>
                    <GridView
                        storeName="cv-request-list"
                        entityName="CvRequest"
                        url={`cv-request`}
                        scheme={CvRequest}
                        CustomPagination={Pagination}
                        CustomToolbar={ToolBarStructure}
                        CustomBreadcrumb={BreadCrumb}
                        BreadCrumbTitles={[]}
                        ComponentHead={CandidateHead}
                        ComponentBody={CandidateBody}
                        ComponentHeadTitles={[t('ID'), t('Name'), t('Status')]}
                        params={{vacancyId: id, pageSize: 50}}
                    />
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        vacancy: get(state, "normalizer.data.vacancy-view", {}),
        entities: get(state, "normalizer.entities", {}),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getVacancy: (id) => {
            const storeName = "vacancy-view";
            const entityName = "vacancy";
            const scheme = VacancyScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `cv-request-vacancy-view/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailContainer))
);
