import React, {Component} from "react";
import {BrowserRouter as WebRouter, Redirect, Route, Switch,} from "react-router-dom";
import history from "./history";
import config from "../../config";

// <<--- AUTH WRAPPER --->>
import LayoutManager from "../../views/layouts/LayoutManager";
import AuthLoader from "../auth/context/AuthLoader";
import IsAuth from "../auth/context/IsAuth";
import IsGuest from "../auth/context/IsGuest";
import HasProfile from "../auth/context/HasProfile";
import WithUser from "../auth/context/WithUser";
import AccessDenied from "../../components/AccessDenied/AccessDenied";

// <<--- AUTH WRAPPER --->>
// <<-- LOGIN OR SIGN UP PAGE --->>
import LoginOrSignUpPage from "../../modules/auth/views/loginOrSignUp/Page";
import LoginPage from "../../modules/auth/views/login/Page";
import TokenPage from "../../modules/auth/views/token/Page";
import ResetPasswordPage from "../../modules/auth/views/Reset/Page";
// <<-- LOGIN OR SIGN UP PAGE --->>
// <-- Profile Page -->>>
import ProfileLayout from "../../modules/hrms/views/profile/views/layouts/profile/ProfileLayout";
import OverallPage from "../../modules/hrms/views/profile/views/pages/OverallPage";
import SettingsPage from "../../modules/hrms/views/profile/views/pages/SettingsPage";
import ProfilePage from "../../modules/hrms/views/profile/views/pages/ProfilePage";
import UserPage from "../../modules/hrms/views/profile/views/pages/UserPage";
import ProjectPage from "../../modules/hrms/views/profile/views/pages/ProjectPage";
import CommentPage from "../../modules/hrms/views/profile/views/pages/CommentPage";
import ReviewsPage from "../../modules/hrms/views/profile/views/pages/ReviewsPage";
import HistoryPage from "../../modules/hrms/views/profile/views/pages/HistoryPage";
// <-- Profile Page -->>>
// <--- DOCUMENT --->>
import DocumentPage from "../../modules/hrms/views/template-document/views/pages/Document/DocumentPage";
import DocumentUpdatePage from "../../modules/hrms/views/template-document/views/pages/Document/DocumentUpdatePage";
import TemplateDocumentCreatePage
    from "../../modules/hrms/views/template-document/views/pages/Document/DocumentCreatePage";
import DocumentViewPage from "../../modules/hrms/views/template-document/views/pages/Document/DocumentViewPage";
// <--- DOCUMENT --->>
// <--- CUSTOM-DOCUMENT --->>
import CustomDocumentPage
    from "../../modules/hrms/views/template-document/views/pages/CustomDocumentVariable/CustomDocumentPage";
import CustomDocumentUpdatePage
    from "../../modules/hrms/views/template-document/views/pages/CustomDocumentVariable/CustomDocumentUpdatePage";
import CustomDocumentCreatePage
    from "../../modules/hrms/views/template-document/views/pages/CustomDocumentVariable/CustomDocumentCreatePage";
import CustomDocumentViewPage
    from "../../modules/hrms/views/template-document/views/pages/CustomDocumentVariable/CustomDocumentViewPage";
// <--- CUSTOM-DOCUMENT --->>
// <--- LANGUAGES--->>
import LanguagesPage from "../../modules/hrms/views/language/views/pages/LanguagesPage";
import LanguagesUpdatePage from "../../modules/hrms/views/language/views/pages/LanguagesUpdatePage";
// <--- LANGUAGES --->>
// <--- STRUCTURE-TYPE --->>
import StructureTypePage from "../../modules/hrms/views/structure/views/pages/StructureType/StructureTypePage";
import StructureTypeUpdatePage
    from "../../modules/hrms/views/structure/views/pages/StructureType/StructureTypeUpdatePage";
import StructureTypeCreatePage
    from "../../modules/hrms/views/structure/views/pages/StructureType/StructureTypeCreatePage";
import StructureTypeViewPage from "../../modules/hrms/views/structure/views/pages/StructureType/StructureTypeViewPage";
// <--- STRUCTURE-TYPE --->>
// <--- STRUCTURE --->>
import StructurePage from "../../modules/hrms/views/structure/views/pages/Structure/StructurePage";
import StructureUpdatePage from "../../modules/hrms/views/structure/views/pages/Structure/StructureUpdatePage";
import StructureCreatePage from "../../modules/hrms/views/structure/views/pages/Structure/StructureCreatePage";
import StructureViewPage from "../../modules/hrms/views/structure/views/pages/Structure/StructureViewPage";
// <--- STRUCTURE --->>
// <--- STRUCTURE RELATION --->>
import StructureRelationPage
    from "../../modules/hrms/views/structure/views/pages/StructureRelation/StructureRelationPage";
import StructureRelationCreatePage
    from "../../modules/hrms/views/structure/views/pages/StructureRelation/StructureRelationCreatePage";
import StructureRelationDeletePage
    from "../../modules/hrms/views/structure/views/pages/StructureRelation/StructureRelationDeletePage";
// <--- STRUCTURE RELATION --->>
// <--- IABS STRUCTURE --->
import IabsStructurePage from "../../modules/hrms/views/structure/views/pages/Iabs/IabsPage";
// <--- IABS STRUCTURE --->
// <---- INFORMATION --->
import EmployeeInfoPage from "../../modules/hrms/views/employeeInformation/views/pages/EmployeeInfoPage";
import EmployeeWorkHistoryPage from "../../modules/hrms/views/employeeInformation/views/pages/EmployeeWorkHistoryPage";
import EmployeeRelationPage from "../../modules/hrms/views/employeeInformation/views/pages/EmployeeRelationPage";
import EmployeePhotoPage from "../../modules/hrms/views/employeeInformation/views/pages/EmployeePhotoPage";
import EmployeeEducationPage from "../../modules/hrms/views/employeeInformation/views/pages/EmployeeEducationPage";
// <---- INFORMATION --->
// <---- COUNTRY CONTROLLER --->
import CountryControllerPage from "../../modules/hrms/views/country/views/CountryPage";
import CountryControllerCreatePage from "../../modules/hrms/views/country/views/CountryCreatePage";
import CountryControllerUpdatePage from "../../modules/hrms/views/country/views/CountryUpdatePage";
import CountryControllerViewPage from "../../modules/hrms/views/country/views/CountryViewPage";
// <---- COUNTRY CONTROLLER --->
// <---- REGION CONTROLLER --->
import RegionControllerPage from "../../modules/hrms/views/region/views/RegionPage";
import RegionControllerCreatePage from "../../modules/hrms/views/region/views/RegionCreatePage";
import RegionControllerUpdatePage from "../../modules/hrms/views/region/views/RegionUpdatePage";
import RegionControllerViewPage from "../../modules/hrms/views/region/views/RegionViewPage";
// <---- REGION CONTROLLER --->
// <---- GSP COUNTRY CONTROLLER --->
import GspCountryControllerPage from "../../modules/hrms/views/gspCountry/views/GspCountryPage";
import GspCountryControllerCreatePage from "../../modules/hrms/views/gspCountry/views/GspCountryCreatePage";
import GspCountryControllerUpdatePage from "../../modules/hrms/views/gspCountry/views/GspCountryUpdatePage";
import GspCountryControllerViewPage from "../../modules/hrms/views/gspCountry/views/GspCountryViewPage";
// <---- GSP COUNTRY CONTROLLER --->
// <---- GSP REGION CONTROLLER --->
import GspRegionControllerPage from "../../modules/hrms/views/gspRegion/views/GspRegionPage";
import GspRegionControllerCreatePage from "../../modules/hrms/views/gspRegion/views/GspRegionCreatePage";
import GspRegionControllerUpdatePage from "../../modules/hrms/views/gspRegion/views/GspRegionUpdatePage";
import GspRegionControllerViewPage from "../../modules/hrms/views/gspRegion/views/GspRegionViewPage";
// <---- GSP REGION CONTROLLER --->
// <---- DISTRICT CONTROLLER --->
import DistrictControllerPage from "../../modules/hrms/views/district/views/DistrictPage";
import DistrictControllerCreatePage from "../../modules/hrms/views/district/views/DistrictCreatePage";
import DistrictControllerUpdatePage from "../../modules/hrms/views/district/views/DistrictUpdatePage";
import DistrictControllerViewPage from "../../modules/hrms/views/district/views/DistrictViewPage";
// <---- DISTRICT CONTROLLER --->
// <---- GSP DISTRICT CONTROLLER --->
import GspDistrictPage from "../../modules/hrms/views/gspDistrict/views/GspDistrictPage";
import GspDistrictCreatePage from "../../modules/hrms/views/gspDistrict/views/GspDistrictCreatePage";
import GspDistrictUpdatePage from "../../modules/hrms/views/gspDistrict/views/GspDistrictUpdatePage";
import GspDistrictViewPage from "../../modules/hrms/views/gspDistrict/views/GspDistrictViewPage";
// <---- GSP DISTRICT CONTROLLER --->
// <---- PARTY CONTROLLER --->
import PartyPage from "../../modules/hrms/views/party/views/PartyPage";
import PartyCreatePage from "../../modules/hrms/views/party/views/PartyCreatePage";
import PartyUpdatePage from "../../modules/hrms/views/party/views/PartyUpdatePage";
import PartyViewPage from "../../modules/hrms/views/party/views/PartyViewPage";
// <---- PARTY CONTROLLER --->
// <---- NATIONALITY CONTROLLER --->
import NationalityPage from "../../modules/hrms/views/nationality/views/NationalityPage";
import NationalityCreatePage from "../../modules/hrms/views/nationality/views/NationalityCreatePage";
import NationalityUpdatePage from "../../modules/hrms/views/nationality/views/NationalityUpdatePage";
import NationalityViewPage from "../../modules/hrms/views/nationality/views/NationalityViewPage";
// <---- NATIONALITY CONTROLLER --->
// <---- GSP NATIONALITY CONTROLLER --->
import GspNationalityPage from "../../modules/hrms/views/gspNationality/views/GspNationalityPage";
import GspNationalityCreatePage from "../../modules/hrms/views/gspNationality/views/GspNationalityCreatePage";
import GspNationalityUpdatePage from "../../modules/hrms/views/gspNationality/views/GspNationalityUpdatePage";
import GspNationalityViewPage from "../../modules/hrms/views/gspNationality/views/GspNationalityViewPage";
// <---- GSP NATIONALITY CONTROLLER --->
// <---- STAFF CONTROLLER --->
import StaffPage from "../../modules/hrms/views/staff/views/StaffPage";
import StaffCreatePage from "../../modules/hrms/views/staff/views/StaffCreatePage";
import StaffUpdatePage from "../../modules/hrms/views/staff/views/StaffUpdatePage";
import StaffViewPage from "../../modules/hrms/views/staff/views/StaffViewPage";
// <---- STAFF CONTROLLER --->
// <---- POSITION CONTROLLER --->
import PositionPage from "../../modules/hrms/views/position/views/PositionPage";
import PositionCreatePage from "../../modules/hrms/views/position/views/PositionCreatePage";
import PositionUpdatePage from "../../modules/hrms/views/position/views/PositionUpdatePage";
import PositionViewPage from "../../modules/hrms/views/position/views/PositionViewPage";
// <---- POSITION CONTROLLER --->
// <--- SETTINGS --->>
import SettingPage from "../../modules/hrms/views/settings/views/SettingsPage";
// <--- SETTINGS --->>
// <---- DIPLOMA QUALIFICATION --->>>>
import DiplomaQualificationCreatePage
    from "../../modules/hrms/views/diplomaQualification/views/DiplomaQualificationCreatePage";
import DiplomaQualificationPage from "../../modules/hrms/views/diplomaQualification/views/DiplomaQualificationPage";
import DiplomaQualificationUpdatePage
    from "../../modules/hrms/views/diplomaQualification/views/DiplomaQualificationUpdatePage";
import DiplomaQualificationViewPage
    from "../../modules/hrms/views/diplomaQualification/views/DiplomaQualificationViewPage";
// <---- DIPLOMA QUALIFICATION --->>>>
// <--- EDUCATIONAL INSTITUTION --->>
import EducationalInstitutionCreatePage
    from "../../modules/hrms/views/educationalInstitution/views/EducationalInstitutionCreatePage";
import EducationalInstitutionPage
    from "../../modules/hrms/views/educationalInstitution/views/EducationalInstitutitonPage";
import EducationalInstitutionUpdatePage
    from "../../modules/hrms/views/educationalInstitution/views/EducatinalInstitutionUpdatePage";
import EducationalInstitutionViewPage
    from "../../modules/hrms/views/educationalInstitution/views/EducatinalInstitutionViewPage";
// <--- EDUCATIONAL INSTITUTION --->>
// <--- FACULTY --->>
import FacultyPage from "../../modules/hrms/views/faculty/views/FacultyPage";
import FacultyCreatePage from "../../modules/hrms/views/faculty/views/FacultyCreatePage";
import FacultyUpdatePage from "../../modules/hrms/views/faculty/views/FacultyUpdatePage";
import FacultyViewPage from "../../modules/hrms/views/faculty/views/FacultyViewPage";
// <--- FACULTY --->>
// <--- FORM STUDY -->>>
import FormStudyPage from "../../modules/hrms/views/formStudy/views/FormStudyPage";
import FormStudyCreatePage from "../../modules/hrms/views/formStudy/views/FormStudyCreatePage";
import FormStudyUpdatePage from "../../modules/hrms/views/formStudy/views/FormStudyUpdatePage";
import FormStudyViewPage from "../../modules/hrms/views/formStudy/views/FormStudyViewPage";
// <--- FORM STUDY -->>>
// <--- RELATIVES --->>
import RelativesPage from "../../modules/hrms/views/relatives/views/RelativesPage";
import RelativesCreatePage from "../../modules/hrms/views/relatives/views/RelativesCreatePage";
import RelativesUpdatePage from "../../modules/hrms/views/relatives/views/RelativesUpdatePage";
import RelativesViewPage from "../../modules/hrms/views/relatives/views/RelativesViewPage";
// <--- RELATIVES --->>
// <--- SPECIALITY --->>
import SpecialityPage from "../../modules/hrms/views/speciality/views/SpecialityPage";
import SpecialityCreatePage from "../../modules/hrms/views/speciality/views/SpecialityCreatePage";
import SpecialityUpdatePage from "../../modules/hrms/views/speciality/views/SpecialityUpdatePage";
import SpecialityViewPage from "../../modules/hrms/views/speciality/views/SpecialityViewPage";
// <--- SPECIALITY --->>
// <--- COMPANY --->>
import CompanyPage from "../../modules/hrms/views/company/views/CompanyPage";
import CompanyCreatePage from "../../modules/hrms/views/company/views/CompanyCreatePage";
import CompanyUpdatePage from "../../modules/hrms/views/company/views/CompanyUpdatePage";
import CompanyViewPage from "../../modules/hrms/views/company/views/CompanyViewPage";
// <--- COMPANY --->>
// <--- EDUCATION --->>
import EducationPage from "../../modules/hrms/views/education/views/EducationPage";
import EducationCreatePage from "../../modules/hrms/views/education/views/EducationCreatePage";
import EducationUpdatePage from "../../modules/hrms/views/education/views/EducationUpdatePage";
import EducationViewPage from "../../modules/hrms/views/education/views/EducationViewPage";
import TaskDetailPage from "../../modules/hrms/views/tasks/pages/TaskDetailPage";
import TasksListPage from "../../modules/hrms/views/tasks/pages/TasksListPage";
import EmployeeRequestsPage from "../../modules/hrms/views/employeeRequests/views/EmployeeRequestsPage";
import EmployeeRequestsViewPage from "../../modules/hrms/views/employeeRequests/views/EmployeeRequestsViewPage";

// <--- EDUCATION --->>
// <--- DOCUMENT --->
import DocumentListPage from "../../modules/hrms/views/document/pages/DocumentListPage";
import DocumentCreatePage from "../../modules/hrms/views/document/pages/DocumentCreatePage";
import DocumentDetailPage from "../../modules/hrms/views/document/pages/DocumentDetailPage";
// <--- DOCUMENT --->
// <--- EMPLOYEE -->
import EmployeeRequestsWorkHistoryPage
    from "../../modules/hrms/views/employeeRequests/views/EmployeeRequestsWorkHistoryPage";
import EmployeeRequestsRelationsPage
    from "../../modules/hrms/views/employeeRequests/views/EmployeeRequestsRelationsPage";
import EmployeeRequestsEducationPage
    from "../../modules/hrms/views/employeeRequests/views/EmployeeRequestsEducationPage";
import EmployeeListPage from "../../modules/hrms/views/employeesList/views/EmployeeListPage";

import EmployeeListViewPage from "../../modules/hrms/views/employeesList/views/EmployeeListViewPage";
import RecruitmentListPage from "../../modules/hrms/views/recruitment/pages/RecruitmentListPage";
import RecruitmentCreatePage from "../../modules/hrms/views/recruitment/pages/RecruitmentCreatePage";
import RecruitmentDetailPage from "../../modules/hrms/views/recruitment/pages/RecruitmentDetailPage";

// <--- DOCUMENT --->
import EmployeeUpdatePage from "../../modules/hrms/views/employeesList/views/EmployeeUpdatePage";
import EmployeeCreatePage from "../../modules/hrms/views/employeesList/views/EmployeeCreatePage";
import StructureVersionListPage
    from "../../modules/hrms/views/structure/views/pages/StructureVersion/StructureVersionListPage";
import StructureVersionCreatePage
    from "../../modules/hrms/views/structure/views/pages/StructureVersion/StructureVersionCreatePage";
import StructureVersionDetailPage
    from "../../modules/hrms/views/structure/views/pages/StructureVersion/StructureVersionDetailPage";
import StructureVersionUpdatePage
    from "../../modules/hrms/views/structure/views/pages/StructureVersion/StructureVersionUpdatePage";
import StructureHierarchyPage
    from "../../modules/hrms/views/structure/views/pages/StructureHierarchy/StructureHierarchyPage";
import StructureHierarchyOrganizationsPage
    from "../../modules/hrms/views/structure/views/pages/StructureHierarchy/StructureHierarchyOrganizationsPage";
import StructureHierarchyOrganizationsByRegionPage
    from "../../modules/hrms/views/structure/views/pages/StructureHierarchy/StructureHierarchyOrganizationsByRegionPage";
import StaffingListPage from "../../modules/hrms/views/staffing/pages/StaffingListPage";
// <--- EMPLOYEE -->
// BUSINESS-PROCESS
import BusinessProcessPage from "../../modules/hrms/views/businessProcess/views/BusinessProcessPage";
import BusinessProcessCreatePage from "../../modules/hrms/views/businessProcess/views/BusinessProcessCreatePage";
import BusinessProcessUpdatePage from "../../modules/hrms/views/businessProcess/views/BusinessProcessUpdatePage"
import BusinessProcessViewPage from "../../modules/hrms/views/businessProcess/views/BusinessProcessViewPage";
// BUSINESS-PROCESS
//VACANCY
import VacancyListPage from "../../modules/hrms/views/vacancy/pages/ListPage";
import VacancyCreatePage from "../../modules/hrms/views/vacancy/pages/CreatePage";
import VacancyViewPage from "../../modules/hrms/views/vacancy/pages/ViewPage";
import VacancyUpdatePage from "../../modules/hrms/views/vacancy/pages/UpdatePage";
//VACANCY
//SKILL
import SkillListPage from "../../modules/hrms/views/skill/pages/ListPage";
import SkillCreatePage from "../../modules/hrms/views/skill/pages/CreatePage";
import SkillViewPage from "../../modules/hrms/views/skill/pages/ViewPage";
import SkillUpdatePage from "../../modules/hrms/views/skill/pages/UpdatePage";
//SKILL

//CV
import CvRequestListPage from "../../modules/hrms/views/cv-request/pages/ListPage";
import CvRequestViewPage from "../../modules/hrms/views/cv-request/pages/ViewPage";
import CvRequestDetailPage from "../../modules/hrms/views/cv-request/pages/DetailPage";
//CV

//VACATION GRAPHIC
import VacationGraphicListPage from "../../modules/hrms/views/vacation-graphic/pages/ListPage";
import VacationGraphicCreatePage from "../../modules/hrms/views/vacation-graphic/pages/CreatePage";
import VacationGraphicViewPage from "../../modules/hrms/views/vacation-graphic/pages/ViewPage";
import VacationGraphicUpdatePage from "../../modules/hrms/views/vacation-graphic/pages/UpdatePage";

//!VACATION GRAPHIC

//EXCEPTION WORK DAYS
import CalendarListPage from "../../modules/hrms/views/calendar/pages/ListPage";
//!EXCEPTION WORK DAYS

//DOCUMENT DOC REQUESTS
import DocRequestsListPage from "../../modules/hrms/views/document-doc-requests/pages/ListPage";
import DocRequestsCreatePage from "../../modules/hrms/views/document-doc-requests/pages/CreatePage";
import DocRequestsDetailPage from "../../modules/hrms/views/document-doc-requests/pages/DetailPage";

//!DOCUMENT DOC REQUESTS

//DOCUMENT DOC ORDERS

import DocOrdersListPage from "../../modules/hrms/views/document-doc-orders/pages/ListPage";
import DocOrdersCreatePage from "../../modules/hrms/views/document-doc-orders/pages/CreatePage";
import DocOrdersDetailPage from "../../modules/hrms/views/document-doc-orders/pages/DetailPage";

//!DOCUMENT DOC ORDERS

//DOCUMENT HOLIDAYS

import DocHolidaysListPage from "../../modules/hrms/views/document-holidays/pages/ListPage";
import DocHolidaysCreatePage from "../../modules/hrms/views/document-holidays/pages/CreatePage";
import DocHolidaysDetailPage from "../../modules/hrms/views/document-holidays/pages/DetailPage";

//!DOCUMENT HOLIDAYS


//TEMPLATE DOCUMENT ASSIGN

import TemplateDocumentAssignListPage from "../../modules/hrms/views/template-document-assign/pages/ListPage";
import TemplateDocumentAssignCreatePage from "../../modules/hrms/views/template-document-assign/pages/CreatePage";
import TemplateDocumentAssignDetailPage from "../../modules/hrms/views/template-document-assign/pages/ViewPage";
import TemplateDocumentAssignUpdatePage from "../../modules/hrms/views/template-document-assign/pages/UpdatePage";

//!TEMPLATE DOCUMENT ASSIGN

//BLACKLIST EMPLOYEE

import BlacklistEmployeeListPage from "../../modules/hrms/views/blacklist/pages/ListPage";
import BlacklistCreatePage from "../../modules/hrms/views/blacklist/pages/CreatePage";
import BlacklistViewPage from "../../modules/hrms/views/blacklist/pages/ViewPage";

//!BLACKLIST EMPLOYEE


//DOCUMENT BRANCH CANDIDATES

import DocBranchCandidatesListPage from "../../modules/hrms/views/document-branch-candidate/pages/ListPage";
import DocBranchCandidatesCreatePage from "../../modules/hrms/views/document-branch-candidate/pages/CreatePage";
import DocBranchCandidateDetailPage from "../../modules/hrms/views/document-branch-candidate/pages/DetailPage";

//!DOCUMENT BRANCH CANDIDATES


class Router extends Component {
    render() {
        return (
            <WebRouter history={history}>
                <AuthLoader>
                    <LayoutManager>
                        <IsAuth>
                            <HasProfile>
                                <WithUser>
                                    {({userCan}) => {
                                        return (
                                            <Switch>
                                                <Route
                                                    exact
                                                    path="/settings"
                                                    render={() => {
                                                        return userCan(config.ROLES.USER) ? (
                                                            <ProfileLayout>
                                                                <SettingsPage/>
                                                            </ProfileLayout>
                                                        ) : (
                                                            <AccessDenied/>
                                                        );
                                                    }}
                                                />
                                                <Route
                                                    exact
                                                    path="/profile"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <ProfilePage/>
                                                        </ProfileLayout>
                                                    )}
                                                />
                                                <Route
                                                    exact
                                                    path="/user"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <UserPage/>
                                                        </ProfileLayout>
                                                    )}
                                                />

                                                <Route
                                                    exact
                                                    path="/project"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <ProjectPage/>
                                                        </ProfileLayout>
                                                    )}
                                                />

                                                <Route
                                                    exact
                                                    path="/comment"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <CommentPage/>
                                                        </ProfileLayout>
                                                    )}
                                                />

                                                <Route
                                                    exact
                                                    path="/reviews"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <ReviewsPage/>
                                                        </ProfileLayout>
                                                    )}
                                                />

                                                <Route
                                                    exact
                                                    path="/history"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <HistoryPage/>
                                                        </ProfileLayout>
                                                    )}
                                                />
                                                <Route
                                                    exact
                                                    path="/overall"
                                                    render={() => (
                                                        <ProfileLayout>
                                                            <OverallPage/>
                                                        </ProfileLayout>
                                                    )}
                                                />
                                                <Route
                                                    exact
                                                    path="/document/create"
                                                    component={DocumentCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/document", "/document/:encoded"]}
                                                    component={DocumentPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/template-document/create"
                                                    component={TemplateDocumentCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/template-document/:encoded"
                                                    component={DocumentPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/template-document/update/:id"
                                                    component={DocumentUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/template-document/view/:id"
                                                    component={DocumentViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/custom-document"
                                                    component={CustomDocumentPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/custom-document/create"
                                                    component={CustomDocumentCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/custom-document/:encoded"
                                                    component={CustomDocumentPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/custom-document/update/:id"
                                                    component={CustomDocumentUpdatePage}
                                                />

                                                <Route
                                                    exact
                                                    path="/custom-document/view/:id"
                                                    component={CustomDocumentViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/language"
                                                    component={LanguagesPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/language/:encoded"
                                                    component={LanguagesPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/language/update/:id"
                                                    component={LanguagesUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-type"
                                                    component={StructureTypePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-type/create"
                                                    component={StructureTypeCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-type/:encoded"
                                                    component={StructureTypePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-type/update/:id"
                                                    component={StructureTypeUpdatePage}
                                                />

                                                <Route
                                                    exact
                                                    path="/structure-type/view/:id"
                                                    component={StructureTypeViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure"
                                                    component={StructurePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure/create"
                                                    component={StructureCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure/:encoded"
                                                    component={StructurePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure/update/:id"
                                                    component={StructureUpdatePage}
                                                />

                                                <Route
                                                    exact
                                                    path="/structure/view/:id"
                                                    component={StructureViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/structure-relation"
                                                    component={StructureRelationPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-relation/create"
                                                    component={StructureRelationCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-relation/delete"
                                                    component={StructureRelationDeletePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-relation/:encoded"
                                                    component={StructureRelationPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-version/list"
                                                    component={StructureVersionListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-version/create"
                                                    component={StructureVersionCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-version/view/:id"
                                                    component={StructureVersionDetailPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-version/update/:id"
                                                    component={StructureVersionUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-hierarchy/organizations"
                                                    component={StructureHierarchyOrganizationsPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-hierarchy"
                                                    component={StructureHierarchyOrganizationsPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-hierarchy/:id"
                                                    component={StructureHierarchyPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/structure-hierarchy/region/:id"
                                                    component={
                                                        StructureHierarchyOrganizationsByRegionPage
                                                    }
                                                />
                                                <Route
                                                    exact
                                                    path="/iabs/structure"
                                                    component={IabsStructurePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee/information"
                                                    component={EmployeeInfoPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee/work-history"
                                                    component={EmployeeWorkHistoryPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee/relation"
                                                    component={EmployeeRelationPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee/education"
                                                    component={EmployeeEducationPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee/photo"
                                                    component={EmployeePhotoPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/country"
                                                    component={CountryControllerPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/country/create"
                                                    component={CountryControllerCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/country/:encoded"
                                                    component={CountryControllerPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/country/update/:id"
                                                    component={CountryControllerUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/country/view/:id"
                                                    component={CountryControllerViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/region"
                                                    component={RegionControllerPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/region/create"
                                                    component={RegionControllerCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/region/:encoded"
                                                    component={RegionControllerPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/region/update/:id"
                                                    component={RegionControllerUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/region/view/:id"
                                                    component={RegionControllerViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-country"
                                                    component={GspCountryControllerPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-country/create"
                                                    component={GspCountryControllerCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-country/:encoded"
                                                    component={GspCountryControllerPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-country/update/:id"
                                                    component={GspCountryControllerUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-country/view/:id"
                                                    component={GspCountryControllerViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-region"
                                                    component={GspRegionControllerPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-region/create"
                                                    component={GspRegionControllerCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-country/:encoded"
                                                    component={GspRegionControllerPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-region/update/:id"
                                                    component={GspRegionControllerUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-region/view/:id"
                                                    component={GspRegionControllerViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/district"
                                                    component={DistrictControllerPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/district/create"
                                                    component={DistrictControllerCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/district/:encoded"
                                                    component={DistrictControllerPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/district/update/:id"
                                                    component={DistrictControllerUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/district/view/:id"
                                                    component={DistrictControllerViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-district"
                                                    component={GspDistrictPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-district/create"
                                                    component={GspDistrictCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-district/:encoded"
                                                    component={GspDistrictPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-district/update/:id"
                                                    component={GspDistrictUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-district/view/:id"
                                                    component={GspDistrictViewPage}
                                                />

                                                <Route exact path="/party" component={PartyPage}/>

                                                <Route
                                                    exact
                                                    path="/party/create"
                                                    component={PartyCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/party/:encoded"
                                                    component={PartyPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/party/update/:id"
                                                    component={PartyUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/party/view/:id"
                                                    component={PartyViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/nationality"
                                                    component={NationalityPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/nationality/create"
                                                    component={NationalityCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/nationality/:encoded"
                                                    component={NationalityPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/nationality/update/:id"
                                                    component={NationalityUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/nationality/view/:id"
                                                    component={NationalityViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-nationality"
                                                    component={GspNationalityPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/gsp-nationality/create"
                                                    component={GspNationalityCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-nationality/:encoded"
                                                    component={GspNationalityPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-nationality/update/:id"
                                                    component={GspNationalityUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/gsp-nationality/view/:id"
                                                    component={GspNationalityViewPage}
                                                />

                                                <Route exact path="/staff" component={StaffPage}/>

                                                <Route
                                                    exact
                                                    path="/staff/create"
                                                    component={StaffCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/staff/:encoded"
                                                    component={StaffPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/staff/update/:id"
                                                    component={StaffUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/staff/view/:id"
                                                    component={StaffViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/position"
                                                    component={PositionPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/position/create"
                                                    component={PositionCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/position/:encoded"
                                                    component={PositionPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/position/update/:id"
                                                    component={PositionUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/position/view/:id"
                                                    component={PositionViewPage}
                                                />
                                                <Route exact path="/setting" component={SettingPage}/>

                                                <Route
                                                    exact
                                                    path="/diploma-qualification"
                                                    component={DiplomaQualificationPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/diploma-qualification/create"
                                                    component={DiplomaQualificationCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/diploma-qualification/:encoded"
                                                    component={DiplomaQualificationPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/diploma-qualification/update/:id"
                                                    component={DiplomaQualificationUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/diploma-qualification/view/:id"
                                                    component={DiplomaQualificationViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/educational-institution"
                                                    component={EducationalInstitutionPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/educational-institution/create"
                                                    component={EducationalInstitutionCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/educational-institution/:encoded"
                                                    component={EducationalInstitutionPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/educational-institution/update/:id"
                                                    component={EducationalInstitutionUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/educational-institution/view/:id"
                                                    component={EducationalInstitutionViewPage}
                                                />

                                                <Route exact path="/faculty" component={FacultyPage}/>

                                                <Route
                                                    exact
                                                    path="/faculty/create"
                                                    component={FacultyCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/faculty/:encoded"
                                                    component={FacultyPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/faculty/update/:id"
                                                    component={FacultyUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/faculty/view/:id"
                                                    component={FacultyViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/form-study"
                                                    component={FormStudyPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/form-study/create"
                                                    component={FormStudyCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/form-study/:encoded"
                                                    component={FormStudyPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/form-study/update/:id"
                                                    component={FormStudyUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/form-study/view/:id"
                                                    component={FormStudyViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/relatives"
                                                    component={RelativesPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/relatives/create"
                                                    component={RelativesCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/relatives/:encoded"
                                                    component={RelativesPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/relatives/update/:id"
                                                    component={RelativesUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/relatives/view/:id"
                                                    component={RelativesViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/speciality"
                                                    component={SpecialityPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/speciality/create"
                                                    component={SpecialityCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/speciality/:encoded"
                                                    component={SpecialityPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/speciality/update/:id"
                                                    component={SpecialityUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/speciality/view/:id"
                                                    component={SpecialityViewPage}
                                                />

                                                <Route exact path="/company" component={CompanyPage}/>

                                                <Route
                                                    exact
                                                    path="/company/create"
                                                    component={CompanyCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/company/:encoded"
                                                    component={CompanyPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/company/update/:id"
                                                    component={CompanyUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/company/view/:id"
                                                    component={CompanyViewPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/education"
                                                    component={EducationPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/education/create"
                                                    component={EducationCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/education/:encoded"
                                                    component={EducationPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/education/update/:id"
                                                    component={EducationUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/education/view/:id"
                                                    component={EducationViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/task"
                                                    component={TasksListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/document-list", "/document-list/:encoded"]}
                                                    component={DocumentListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/document/view/:id"
                                                    component={DocumentDetailPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/task/view/:id"
                                                    component={TaskDetailPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/employee-requests"
                                                    component={EmployeeRequestsPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee-requests/:encoded"
                                                    component={EmployeeRequestsPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee-requests/view/:id/:requestAbleId"
                                                    component={EmployeeRequestsViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee-requests/view/:id/:requestAbleId/work-history"
                                                    component={EmployeeRequestsWorkHistoryPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee-requests/view/:id/:requestAbleId/work-history"
                                                    component={EmployeeRequestsWorkHistoryPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee-requests/view/:id/:requestAbleId/relation"
                                                    component={EmployeeRequestsRelationsPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employee-requests/view/:id/:requestAbleId/education"
                                                    component={EmployeeRequestsEducationPage}
                                                />

                                                <Route
                                                    exact
                                                    path={["/employees", "/employees-list/:encoded"]}
                                                    component={EmployeeListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employees/view/:id"
                                                    component={EmployeeListViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/recruitment", "/recruitment/:encoded"]}
                                                    component={RecruitmentListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/recruitment/create"
                                                    component={RecruitmentCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/recruitment/view/:id"
                                                    component={RecruitmentDetailPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employees/create"
                                                    component={EmployeeCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/employees/update/:id"
                                                    component={EmployeeUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/staffing/list"
                                                    component={StaffingListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/business-process"
                                                    component={BusinessProcessPage}
                                                />

                                                <Route
                                                    exact
                                                    path="/business-process/create"
                                                    component={BusinessProcessCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/business-process/:encoded"
                                                    component={BusinessProcessPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/business-process/update/:id"
                                                    component={BusinessProcessUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/business-process/view/:id"
                                                    component={BusinessProcessViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/vacancy/create"
                                                    component={VacancyCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/vacancy","/vacancy/:encoded"]}
                                                    component={VacancyListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/vacancy/view/:id"
                                                    component={VacancyViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/vacancy/update/:id"
                                                    component={VacancyUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path="/skill/create"
                                                    component={SkillCreatePage}
                                                />

                                                <Route
                                                    exact
                                                    path={["/skill", "/skill/:encoded"]}
                                                    component={SkillListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/skill/view/:id"
                                                    component={SkillViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/skill/update/:id"
                                                    component={SkillUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/CvRequest", "/CvRequest/:encoded"]}
                                                    component={CvRequestListPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/CvRequest/view/:id"
                                                    component={CvRequestViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path="/CvRequest/detail/:id"
                                                    component={CvRequestDetailPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/VacationGraphic/create"}
                                                    component={VacationGraphicCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/VacationGraphic", "/VacationGraphic/:encoded"]}
                                                    component={VacationGraphicListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/VacationGraphic/view/:id"}
                                                    component={VacationGraphicViewPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/VacationGraphic/update/:id"}
                                                    component={VacationGraphicUpdatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/calendar"}
                                                    component={CalendarListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/DocumentDocRequests/create"}
                                                    component={DocRequestsCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={["/DocumentDocRequests", "/DocumentDocRequests/:encoded"]}
                                                    component={DocRequestsListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/DocumentDocRequests/view/:id"}
                                                    component={DocRequestsDetailPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/DocumentDocOrders/create"}
                                                    component={DocOrdersCreatePage}
                                                />


                                                <Route
                                                    exact
                                                    path={["/DocumentDocOrders", "/DocumentDocOrders/:encoded"]}
                                                    component={DocOrdersListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/DocumentDocOrders/view/:id"}
                                                    component={DocOrdersDetailPage}
                                                />

                                                <Route
                                                    exact
                                                    path={"/document-holidays"}
                                                    component={DocHolidaysListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/document-holidays/create"}
                                                    component={DocHolidaysCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/document-holidays/view/:id"}
                                                    component={DocHolidaysDetailPage}
                                                />


                                                <Route
                                                    exact
                                                    path={["/template-document-assign","/template-document-assign/:encoded"]}
                                                    component={TemplateDocumentAssignListPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/template-document-assign/create"}
                                                    component={TemplateDocumentAssignCreatePage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/template-document-assign/view/:id"}
                                                    component={TemplateDocumentAssignDetailPage}
                                                />
                                                <Route
                                                    exact
                                                    path={"/template-document-assign/update/:id"}
                                                    component={TemplateDocumentAssignUpdatePage}
                                                />


                                                <Route
                                                    exact
                                                    path={"/DocumentBranchCandidate/create"}
                                                    component={DocBranchCandidatesCreatePage}
                                                />


                                                <Route
                                                    exact
                                                    path={["/DocumentBranchCandidate", "/DocumentBranchCandidate/:encoded"]}
                                                    component={DocBranchCandidatesListPage}
                                                />

                                                <Route
                                                    exact
                                                    path={"/DocumentBranchCandidate/view/:id"}
                                                    component={DocBranchCandidateDetailPage}
                                                />

                                                <Route
                                                    exact
                                                    path={"/blacklist-employee/create"}
                                                    component={BlacklistCreatePage}
                                                />

                                                <Route
                                                    exact
                                                    path={["/blacklist-employee","/blacklist-employee/:encoded"]}
                                                    component={BlacklistEmployeeListPage}
                                                />

                                                <Route
                                                    exact
                                                    path={"/blacklist-employee/view/:id"}
                                                    component={BlacklistViewPage}
                                                />


                                                <Redirect exact to="/profile"/>
                                            </Switch>
                                        );
                                    }}
                                </WithUser>
                            </HasProfile>
                        </IsAuth>
                        <IsGuest>
                            <Switch>
                                <Route exact path="/auth/login" component={LoginPage}/>
                                <Route
                                    exact
                                    path="/auth/token/:token/:phone"
                                    component={TokenPage}
                                />
                                <Route exact path="/auth" component={LoginOrSignUpPage}/>
                                <Route
                                    exact
                                    path="/auth/reset-password"
                                    component={ResetPasswordPage}
                                />
                                <Redirect to="/auth/login"/>
                            </Switch>
                        </IsGuest>
                    </LayoutManager>
                </AuthLoader>
            </WebRouter>
        );
    }
}

export default Router;
