import {bpmnRequest, hrmsRequest} from "../../services/api";

class Api {
    // <--- PROFILE API --- >
    static changePassword = (current, password) => {
        return hrmsRequest.post(`oauth/users/change-password`, {
            current,
            password
        });
    };
    static changeAvatar = (file) => {
        return hrmsRequest.post(`oauth/users/change-avatar`, file);
    };
    static avatarIconType = (avatarIconType) => {
        return hrmsRequest.post(`oauth/users/avatar-icon-type`, {avatarIconType});
    };
    static syncFidoService = () => {
        return hrmsRequest.post(`services/sync-fido-service`);
    };
    static syncRegistrationService = () => {
        return hrmsRequest.post(`services/sync-registration-individual-service`);
    };

    static syncEmployeeData = () => {
        return hrmsRequest.post(`employees/sync-data`);
    };
    static syncTaxTinService = () => {
        return hrmsRequest.post(`services/sync-tax-tin-service`);
    };
    static syncPositionCurrent = () => {
        return hrmsRequest.post(`services/sync-position-current`);
    };
    static syncPositionHistory = () => {
        return hrmsRequest.post(`services/sync-position-history`);
    };
    // <--- PROFILE API --- >

    // <--- LANGUAGE API  --->>>>
    static languageCreate = (languages) => {
        return hrmsRequest.post(`language/create`, {languages});
    };
    static languageUpdate = (attributes) => {
        return hrmsRequest.put(`language/translates`, attributes);
    };
    // <--- LANGUAGE  --->>>>

    // <---- STRUCTURE TYPE API ------>>>>
    static structureTypeCreate = (data) => {
        return hrmsRequest.post(`structure-type`, data);
    };
    static structureTypeUpdate = (id, data) => {
        return hrmsRequest.put(`structure-type/${id}`, data);
    };
    static structureTypeDelete = (id) => {
        return hrmsRequest.delete(`structure-type/${id}`);
    };
    // <---- STRUCTURE TYPE API ------>>>>

    // <---- STRUCTURE  API ------>>>>
    static structureCreate = (data) => {
        return hrmsRequest.post(`structure`, data);
    };
    static structureUpdate = (id, data) => {
        return hrmsRequest.put(`structure/${id}`, data);
    };
    static structureDelete = (id) => {
        return hrmsRequest.delete(`structure/${id}`);
    };

    // <---- STRUCTURE  API ------>>>>

    // <---- STRUCTURE RELATION  API ------>>>>
    static structureRelationCreate = (data) => {
        return hrmsRequest.post(`structure-relation`, data);
    };
    static structureRelationDelete = (data) => {
        return hrmsRequest.delete(`structure-relation`, data);
    };
    // <---- STRUCTURE RELATION  API ------>>>>

    // <---- EMPLOYEE INFORMATION DATA ------>>>>
    static getEmployeeInformationData = () => {
        return hrmsRequest.post(`oauth/users/employee-information-data`);
    };
    static setEmployeeInformationRequest = (id, data) => {
        return hrmsRequest.post(`employees/employee-information-request/${id}`, data);
    };
    static getEmployeePositionProfileInfo = () => {
        return hrmsRequest.post(`oauth/users/employee-position-profile-info-get`);
    };
    static setEmployeePositionProfileInfo = (id, data) => {
        return hrmsRequest.post(
            `oauth/users/employee-position-profile-info-set/${id}`,
            data
        );
    };
    // <---- EMPLOYEE INFORMATION DATA ------>>>>

    // <---- DOCUMENT API ------>>>>
    static templateDocumentCreate = (data) => {
        return hrmsRequest.post(`template-document/`, data);
    };
    static templateDocumentUpdate = (id, data) => {
        return hrmsRequest.put(`template-document/${id}`, data);
    };
    static templateDocumentDelete = (id) => {
        return hrmsRequest.delete(`template-document/${id}`);
    };
    static syncTemplateDocument = (id) => {
        return hrmsRequest.post(`template-document/sync/${id}`);
    };
    // <---- DOCUMENT API ------>>>>

    // <---- CUSTOM DOCUMENT VARIABLE API ------>>>>
    static templateCustomDocumentCreate = (data) => {
        return hrmsRequest.post(`template-document-custom-var/`, data);
    };
    static templateCustomDocumentUpdate = (id, data) => {
        return hrmsRequest.put(`template-document-custom-var/${id}`, data);
    };
    static templateCustomDocumentDelete = (id) => {
        return hrmsRequest.delete(`template-document-custom-var/${id}`);
    };
    // <---- CUSTOM DOCUMENT VARIABLE API ------>>>>

    // <---- COUNTRY CONTROLLER  ------>>>>
    static countryControllerCreate = (data) => {
        return hrmsRequest.post(`country/`, data);
    };
    static countryControllerUpdate = (id, data) => {
        return hrmsRequest.put(`country/${id}`, data);
    };
    static countryControllerDelete = (id) => {
        return hrmsRequest.delete(`country/${id}`);
    };
    // <---- COUNTRY  CONTROLLER  ------>>>>

    // <---- GSP COUNTRY CONTROLLER  ------>>>>
    static gspCountryControllerCreate = (data) => {
        return hrmsRequest.post(`gsp-country/`, data);
    };
    static gspCountryControllerUpdate = (id, data) => {
        return hrmsRequest.put(`gsp-country/${id}`, data);
    };
    static gspCountryControllerDelete = (id) => {
        return hrmsRequest.delete(`gsp-country/${id}`);
    };
    // <---- GSP COUNTRY  CONTROLLER  ------>>>>

    // <---- REGION CONTROLLER  ------>>>>
    static regionControllerCreate = (data) => {
        return hrmsRequest.post(`region/`, data);
    };
    static regionControllerUpdate = (id, data) => {
        return hrmsRequest.put(`region/${id}`, data);
    };
    static regionControllerDelete = (id) => {
        return hrmsRequest.delete(`region/${id}`);
    };
    // <---- REGION  CONTROLLER  ------>>>>

    // <---- GSP REGION CONTROLLER  ------>>>>
    static gspRegionControllerCreate = (data) => {
        return hrmsRequest.post(`gsp-region/`, data);
    };
    static gspRegionControllerUpdate = (id, data) => {
        return hrmsRequest.put(`gsp-region/${id}`, data);
    };
    static gspRegionControllerDelete = (id) => {
        return hrmsRequest.delete(`gsp-region/${id}`);
    };
    // <---- GSP REGION  CONTROLLER  ------>>>>

    // <---- DISTRICT CONTROLLER  ------>>>>
    static districtControllerCreate = (data) => {
        return hrmsRequest.post(`district/`, data);
    };
    static districtControllerUpdate = (id, data) => {
        return hrmsRequest.put(`district/${id}`, data);
    };
    static districtControllerDelete = (id) => {
        return hrmsRequest.delete(`district/${id}`);
    };
    // <---- DISTRICT  CONTROLLER  ------>>>>

    // <---- GSP DISTRICT CONTROLLER  ------>>>>
    static gspDistrictControllerCreate = (data) => {
        return hrmsRequest.post(`gsp-district/`, data);
    };
    static gspDistrictControllerUpdate = (id, data) => {
        return hrmsRequest.put(`gsp-district/${id}`, data);
    };
    static gspDistrictControllerDelete = (id) => {
        return hrmsRequest.delete(`gsp-district/${id}`);
    };
    // <---- GSP DISTRICT  CONTROLLER  ------>>>>

    // <---- PARTY CONTROLLER  ------>>>>
    static partyControllerCreate = (data) => {
        return hrmsRequest.post(`party/`, data);
    };
    static partyControllerUpdate = (id, data) => {
        return hrmsRequest.put(`party/${id}`, data);
    };
    static partyControllerDelete = (id) => {
        return hrmsRequest.delete(`party/${id}`);
    };
    // <---- PARTY CONTROLLER  ------>>>>

    // <---- NATIONALITY CONTROLLER  ------>>>>
    static nationalityControllerCreate = (data) => {
        return hrmsRequest.post(`nationality/`, data);
    };
    static nationalityControllerUpdate = (id, data) => {
        return hrmsRequest.put(`nationality/${id}`, data);
    };
    static nationalityControllerDelete = (id) => {
        return hrmsRequest.delete(`nationality/${id}`);
    };
    // <---- NATIONALITY CONTROLLER  ------>>>>

    // <---- GSP NATIONALITY CONTROLLER  ------>>>>
    static gspNationalityControllerCreate = (data) => {
        return hrmsRequest.post(`gsp-nationality/`, data);
    };
    static gspNationalityControllerUpdate = (id, data) => {
        return hrmsRequest.put(`gsp-nationality/${id}`, data);
    };
    static gspNationalityControllerDelete = (id) => {
        return hrmsRequest.delete(`gsp-nationality/${id}`);
    };
    // <---- GSP NATIONALITY CONTROLLER  ------>>>>

    // <---- STAFF CONTROLLER  ------>>>>
    static staffControllerCreate = (data) => {
        return hrmsRequest.post(`staff/`, data);
    };
    static staffList = () => {
        return hrmsRequest.get(`staff/`);
    };
    static staffControllerUpdate = (id, data) => {
        return hrmsRequest.put(`staff/${id}`, data);
    };
    static staffControllerDelete = (id) => {
        return hrmsRequest.delete(`staff/${id}`);
    };
    static staffControllerClose = (id) => {
        return hrmsRequest.post(`staff/${id}`);
    };
    // <---- STAFF CONTROLLER  ------>>>>

    // <---- POSITION CONTROLLER  ------>>>>
    static positionControllerCreate = (data) => {
        return hrmsRequest.post(`position/`, data);
    };
    static positionControllerUpdate = (id, data) => {
        return hrmsRequest.put(`position/${id}`, data);
    };
    static positionControllerDelete = (id) => {
        return hrmsRequest.delete(`position/${id}`);
    };
    // <---- POSITION CONTROLLER  ------>>>>

    // <--- IABS LINK ----->>>>
    static linkAbsCountryToCoreCountry = ({iabsCode, countryId}) => {
        return hrmsRequest.put(`iabs/link/country/${iabsCode}/${countryId}`);
    };

    static linkAbsDistrictToCoreDistrict = ({iabsCode, districtId}) => {
        return hrmsRequest.put(`iabs/link/district/${iabsCode}/${districtId}`);
    };

    static linkAbsNationToCoreNationality = ({iabsCode, nationalityId}) => {
        return hrmsRequest.put(`iabs/link/nation/${iabsCode}/${nationalityId}`);
    };

    static linkAbsPartyToCoreParty = ({iabsCode, partyId}) => {
        return hrmsRequest.put(`iabs/link/party/${iabsCode}/${partyId}`);
    };

    static linkAbsRegionToCoreRegion = ({iabsCode, regionId}) => {
        return hrmsRequest.put(`iabs/link/region/${iabsCode}/${regionId}`);
    };
    static linkAbsPostionToCorePostion = ({iabsCode: iabs_post_code, positionId: position_id}) => {
        return hrmsRequest.get(`iabsHrSPosts/link/${iabs_post_code}/${position_id}`);
    };
    // <--- IABS LINK ----->>>>

    // <--- IABS LOAD --->
    static iabsLoadCountries = () => {
        return hrmsRequest.post(`iabs/load-countries`);
    };
    static iabsLoadDistricts = () => {
        return hrmsRequest.post(`iabs/load-districts`);
    };
    static iabsLoadNations = () => {
        return hrmsRequest.post(`iabs/load-nations`);
    };
    static iabsLoadParties = () => {
        return hrmsRequest.post(`iabs/load-parties`);
    };
    static iabsLoadRegions = () => {
        return hrmsRequest.post(`iabs/load-regions`);
    };
    // <--- IABS LOAD --->

    // <---- DIPLOMA QUALIFICATION ---->
    static diplomaQualificationCreate = (data) => {
        return hrmsRequest.post(`diploma-qualification/`, data);
    };
    static diplomaQualificationUpdate = (id, data) => {
        return hrmsRequest.put(`diploma-qualification/${id}`, data);
    };
    static diplomaQualificationDelete = (id) => {
        return hrmsRequest.delete(`diploma-qualification/${id}`);
    };
    // <----- DIPLOMA QUALIFICATION ---->

    // <---- EDUCATIONAL INSTITUTION ---->
    static educationalInstitutionCreate = (data) => {
        return hrmsRequest.post(`educational-institution/`, data);
    };
    static educationalInstitutionUpdate = (id, data) => {
        return hrmsRequest.put(`educational-institution/${id}`, data);
    };
    static educationalInstitutionDelete = (id) => {
        return hrmsRequest.delete(`educational-institution/${id}`);
    };
    // <----- EDUCATIONAL INSTITUTION  ---->

    // <---- FACULTY ---->
    static facultyCreate = (data) => {
        return hrmsRequest.post(`faculty/`, data);
    };
    static facultyUpdate = (id, data) => {
        return hrmsRequest.put(`faculty/${id}`, data);
    };
    static facultyDelete = (id) => {
        return hrmsRequest.delete(`faculty/${id}`);
    };
    // <----- FACULTY  ---->

    // <---- FORM STUDY ---->
    static formStudyCreate = (data) => {
        return hrmsRequest.post(`form-study/`, data);
    };
    static formStudyUpdate = (id, data) => {
        return hrmsRequest.put(`form-study/${id}`, data);
    };
    static formStudyDelete = (id) => {
        return hrmsRequest.delete(`form-study/${id}`);
    };
    // <----- FORM STUDY  ---->

    // <---- RELATIVES ---->
    static relativesCreate = (id, data) => {
        return hrmsRequest.post(`relatives/create-by-user/${id}`, data);
    };
    static relativesUpdate = (id, data) => {
        return hrmsRequest.put(`relatives/${id}`, data);
    };
    static relativesDelete = (id) => {
        return hrmsRequest.delete(`relatives/${id}`);
    };
    // <----- RELATIVES ---->

    // <---- SPECIALITY ---->
    static specialityCreate = (data) => {
        return hrmsRequest.post(`speciality/`, data);
    };
    static specialityUpdate = (id, data) => {
        return hrmsRequest.put(`speciality/${id}`, data);
    };
    static specialityDelete = (id) => {
        return hrmsRequest.delete(`speciality/${id}`);
    };
    // <----- SPECIALITY  ---->

    // <---- COMPANY ---->
    static companyCreate = (data) => {
        return hrmsRequest.post(`company/`, data);
    };
    static companyUpdate = (id, data) => {
        return hrmsRequest.put(`company/${id}`, data);
    };
    static companyDelete = (id) => {
        return hrmsRequest.delete(`company/${id}`);
    };
    // <----- COMPANY  ---->

    // <---- EDUCATION ---->
    static educationCreate = (data) => {
        return hrmsRequest.post(`education/`, data);
    };
    static educationCreateByUser = (id, data) => {
        return hrmsRequest.post(`education/create-by-user/${id}`, data);
    };
    static educationUpdate = (id, data) => {
        return hrmsRequest.put(`education/${id}`, data);
    };
    static educationDelete = (id) => {
        return hrmsRequest.delete(`education/${id}`);
    };

    // <----- EDUCATION  ---->

//  <--- tasks --->
    static getFormsWithFields = (tasks_user_id) => {
        return bpmnRequest.get(`/tasks-user/get/forms/with/fields/by/tasks-user/${tasks_user_id}`);
    }

    static tasksUserFormSetValuesReturnResult = (formName, tasksUserId, data = {}) => {
        return bpmnRequest.post(`tasks-user/form/set/values/${formName}/${tasksUserId}/result`, data);
    }

    static tasksUserFormSetValuesReturnResultAndComplete = (formName, tasksUserId, data = {}) => {
        return bpmnRequest.post(`tasks-user/form/set/values/${formName}/${tasksUserId}/complete`, data);
    }
//  <--- tasks --->


    // <---- EMPLOYEE_REGISTER_REQUEST ---->
    static employeeRegisterRequestCreate = (data) => {
        return hrmsRequest.post(`requests/send-request-employee-register`, data);
    };
    static employeeRegisterRequestUpdate = (id, data) => {
        return hrmsRequest.put(`requests/employee/${id}`, data);
    };
    static employeeRegisterRequestDelete = (id) => {
        return hrmsRequest.delete(`requests/employee/${id}`);
    };

    static employeeRequestConfirm = (id) => {
        return hrmsRequest.post(`requests/confirm/${id}`);
    };

    // <----- EMPLOYEE_REGISTER_REQUEST  ---->

    // <---- DOCUMENT ---->
    static createNewDocument = (attributes) => {
        return hrmsRequest.post(`document`, attributes);
    };
    static createAndStartNewProcess = (attributes, url) => {
        return hrmsRequest.post(`${url}`, attributes);
    };
    // <----- DOCUMENT  ---->

    // <---- RECRUITMENT ---->
    static createRecruitment = (attributes) => {
        return hrmsRequest.post(`recruitment`, {...attributes});
    };
    static recruitmentDelete = (id) => {
        return hrmsRequest.delete(`recruitment/${id}`);
    };
    // <----- RECRUITMENT  ---->

    // <----- EMPLOYEE CREATE , UPDATE , DELETE  ---->
    static employeeCreate = (data) => {
        return hrmsRequest.post(`/employees`, data);
    };
    static employeeUpdate = (id, data) => {
        return hrmsRequest.put(`employees/${id}`, data);
    };
    static employeeDelete = (id) => {
        return hrmsRequest.delete(`employees/${id}`);
    };
    static employeeCreateByDocument = (data) => {
        return hrmsRequest.post(`employees/create-by-passport-pinid`, data);
    };

    static employeeRefreshServices = (data) => {
        return hrmsRequest.post(`employees/refresh-services-data`, data);
    };

    // --------------------------------------

    static employeeEducationCreate = (data) => {
        return hrmsRequest.post(`employees-education`, data);
    };
    static employeeEducationUpdate = (id, data) => {
        return hrmsRequest.put(`employees-education/${id}`, data);
    };
    static employeeEducationDelete = (id) => {
        return hrmsRequest.delete(`employees-education/${id}`);
    };

    static employeeRelativesCreate = (data) => {
        return hrmsRequest.post(`employees-relatives`, data);
    };
    static employeeRelativesUpdate = (id, data) => {
        return hrmsRequest.put(`employees-relatives/${id}`, data);
    };
    static employeeRelativesDelete = (id) => {
        return hrmsRequest.delete(`employees-relatives/${id}`);
    };
    // <----- EMPLOYEE CREATE , UPDATE ,DELETE ---->

    // <---- STRUCTURE VERSION  API ------>>>>
    static structureVersionCreate = (data) => {
        return hrmsRequest.post(`structure-version`, data);
    };
    static structureVersionUpdate = (id, data) => {
        return hrmsRequest.put(`structure-version/${id}`, data);
    };
    static structureVersionDelete = (id) => {
        return hrmsRequest.delete(`structure-version/${id}`);
    };

    // <---- STRUCTURE VERSION API ------>>>>


    // <---- EMPLOYEE RELATIVES ---->
    static employeeRelativesCreate = (id, data) => {
        return hrmsRequest.post(`employees-relatives/create-by-current-employee/${id}`, data);
    };
    static employeeRelativesUpdate = (id, data) => {
        return hrmsRequest.put(`employees-relatives/${id}`, data);
    };
    static employeeRelativesDelete = (id) => {
        return hrmsRequest.delete(`employees-relatives/${id}`);
    };
    // <----- EMPLOYEE RELATIVES ---->

    // <---- structureLinkBatch API ------>>>>
    static structureLinkBatch = (data) => {
        return hrmsRequest.post(`structure-hierarchies/hierarchy-link-batch`, data);
    };
    // <---- structureLinkBatch API ------>>>>

    // <---- structureLinkBatch API ------>>>>
    static structureAbsSync = (id) => {
        return hrmsRequest.post(`iabs/load-departments-by-filial/${id}`);
    };
    // <---- structureLinkBatch API ------>>>>

    // <---- structureAbsSyncFilials API ------>>>>
    static structureAbsSyncFilials = (id) => {
        return hrmsRequest.post(`iabs/v1/iabs/load-filials`);
    };
    // <---- structureAbsSyncFilials API ------>>>>

    static reloadEmployeeProfilePhoto = (id) => {
        return hrmsRequest.post(`employees/sync-passport-photo/${id}`);
    };
    static reloadEmployeeInfoFromIabs = (id) => {
        return hrmsRequest.get(`employees/sync-alt-id/${id}`);
    };
    static syncEmployeeVaccine = (id) => {
        return hrmsRequest.post(`employees/sync-vaccine/${id}`);
    };
    static asyncEmployeeRelatives = (id) => {
        return hrmsRequest.post(`employees/sync-relatives/${id}`);
    };

    static setStructureTypeAllChild = ({parentStructureId, structureTypeId}) => {
        return hrmsRequest.post(`structure/set/structure/type/child/all?parentStructureId=${parentStructureId}&structureTypeId=${structureTypeId}`);
    };
    static asyncEmployeeConviction = (id) => {
        return hrmsRequest.post(`employees/sync-conviction/${id}`);
    };
    static asyncPsychoInfo = (id) => {
        return hrmsRequest.post(`employees/sync-psycho/${id}`);
    };

    static asyncNarcoInfo = (id) => {
        return hrmsRequest.post(`employees/sync-narco/${id}`);
    };

    static asyncCvInfo = (id) => {
        return hrmsRequest.post(`employees/sync-cv/${id}`);
    };

    static asyncWorkReference = (id) => {
        return hrmsRequest.post(`employees/sync-work-reference/${id}`);
    };

    static setStructureHierarchyAsTemplate = (attributes) => {
        return hrmsRequest.post(`structure-hierarchies/set-structure-hierarchy-as-template`, attributes);
    };
    // <---- BUSINESS PROCESS   ------>>>>
    static businessProcessCreate = (data) => {
        return hrmsRequest.post(`business-process/`, data);
    };
    static businessProcessUpdate = (id, data) => {
        return hrmsRequest.put(`business-process/${id}`, data);
    };
    static businessProcessDelete = (id) => {
        return hrmsRequest.delete(`business-process/${id}`);
    };
    // <---- BUSINESS PROCESS    ------>>>>

    // <---- DOCUMENT PROCESS    ------>>>>
    static documentProcessCreate = (data) => {
        return bpmnRequest.post(`/v1/document`, data);
    };
    static documentSignProcess = (params) => {
        return hrmsRequest.post(`signature-document/sign`, {
            ...params
        });
    };
    static documentSignWithEimzoProcess = (params) => {
        return hrmsRequest.post(`signature-document/sign-eimzo`, {
            ...params
        });
    };
    // <---- DOCUMENT PROCESS    ------>>>>

    static skillDelete = (id) => {
        return hrmsRequest.delete(`skill/${id}`);
    };

    static vacancyDelete = (id) => {
        return hrmsRequest.delete(`vacancy/${id}`);
    };

    static vacancyProcessStart = (id, attributes) => {
        return hrmsRequest.post(`vacancy/start/process/${id}`, attributes);
    };

    static postUpdateStructure = (rootStructureId) => {
        return hrmsRequest.post(`structure/postUpdateStructure/${rootStructureId}`);
    };

    static vacationGraphicDelete = (id) => {
        return hrmsRequest.delete(`vacation-graphic/${id}`);
    };

    static vacationGraphicProcessStart = (id, attributes) => {
        return hrmsRequest.post(`vacation-graphic/start/process/${id}`, attributes);
    };

    static setExceptionDay = (attributes) => {
        return hrmsRequest.post(`exception-work-days`, attributes);
    };

    static updateExceptionDay = (exception_day, attributes) => {
        return hrmsRequest.put(`exception-work-days/${exception_day}`, attributes);
    };

    static deleteExceptionDay = (exception_day) => {
        return hrmsRequest.delete(`exception-work-days/${exception_day}`);
    };

    static generateDocs = (params) => {
        return hrmsRequest.post(`documents/GenerateAllAssignsTemplateDocuments`, params);
    };

    static blacklistDelete = (id) => {
        return hrmsRequest.delete(`blacklist-employee/${id}`);
    };

    static templetDocumentAssignDelete = (id) => {
        return hrmsRequest.delete(`template-document-assign/${id}`);
    };

    static fileUpload = (formData) => {
        return hrmsRequest.post(`file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    static uploadEmployeeFiles = (params) => {
        return hrmsRequest.post(`employee-files`, params);
    };

    static uploadCandidateFiles = (params) => {
        return hrmsRequest.post(`document-branch-candidate-files`, params);
    };

    static branchCandidateDocumentDelete = (id) => {
        return hrmsRequest.delete(`document-branch-candidate/${id}`);
    };


    static templateDocumentCustomVarStructureDelete = (id) => {
        return hrmsRequest.delete(`template-document-custom-var-structure/${id}`);
    };


    static migrateFilialData = (mfo) => {
        return hrmsRequest.post(`iabs/load-and-migrate-all-filial-data?filial=${mfo}`);
    };

}

export default Api;
