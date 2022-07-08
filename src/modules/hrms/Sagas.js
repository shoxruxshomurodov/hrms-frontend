import {all, call, put, takeLatest} from "redux-saga/effects";
import Actions from "./Actions";
import Api from "../hrms/Api";
import {get} from "lodash";
import Normalizer from "../../services/normalizer";
import StructureScheme from "../../schema/Structure";
import LanguageScheme from "../../schema/Language";
import CountryScheme from "../../schema/Country";
import GspCountryScheme from "../../schema/GspCountry";
import GspRegionScheme from "../../schema/GspRegion";
import RegionScheme from "../../schema/Region";
import DistrictScheme from "../../schema/District";
import GspDistrictScheme from "../../schema/GspDistrict";
import PartyScheme from "../../schema/Party";
import NationalityScheme from "../../schema/Nashion";
import GspNationalityScheme from "../../schema/GspNationality";
import StaffScheme from "../../schema/Staff";
import PositionScheme from "../../schema/Position";
import DiplomaQualificationScheme from "../../schema/DiplomaQualification";
import EducationalInstitutionScheme from "../../schema/EducationalInstitution";
import FacultyScheme from "../../schema/Faculty";
import FormStudyScheme from "../../schema/FormStudy";
import RelativesScheme from "../../schema/Relatives";
import SpecialityScheme from "../../schema/Speciality";
import CompanyScheme from "../../schema/Company";
import EducationScheme from "../../schema/Education";
import EmployeesScheme from "../../schema/Employees";
import BusinessProcessScheme from "../../schema/BusinessProcess";
import NormalizerAction from "../../services/normalizer/actions";
import ValidationResponse from "../../services/helpers/ValidationResponseYii";
import storage from "../../services/storage";
import i18n from "../../services/i18n";
import RequestsScheme from "../../schema/Requests";
import EmployeeRelativesScheme from "../../schema/EmployeeRelatives";
import EmployeeRelatives from "../../schema/EmployeeRelatives";

const i18nLang = i18n();

// CHANGE MODE BEGIN
function* changeMode(action) {
    const {mode} = action.payload;
    yield call(storage.set, "mode", mode);
    yield put({type: Actions.CHANGE_MODE.SUCCESS, payload: {mode}});
}


// CHANGE MODE END
// CHANGE LANGUAGE BEGIN
function* changeLang(action) {
    const {
        payload: {lang}
    } = action;
    try {
        storage.set("lang", lang);
        yield put({type: Actions.CHANGE_LANG.SUCCESS, payload: {lang}});
    } catch (e) {
        yield put({type: Actions.CHANGE_LANG.FAILURE});
    }
}

// CHANGE LANGUAGE END

// GET TRANSLATIONS BEGIN
function* getTranslations(action) {
    const {
        payload: {lang}
    } = action;
    yield i18nLang.changeLanguage(lang);
    yield put({type: Actions.GET_TRANSLATIONS.SUCCESS, payload: {lang}});
}

// GET TRANSLATIONS END

//LANGUAGE_CONTROLLER_UPDATE
function* languageUpdate(action) {
    const {
        payload: {
            attributes,
            formMethods: {setFieldError, setSubmitting},
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.languageUpdate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            LanguageScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "language-update",
                entityName: "language"
            }
        });
        yield put({type: Actions.LANGUAGE_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield call(ValidationResponse.setErrors, e, setFieldError);
        yield put({type: Actions.LANGUAGE_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
    yield call(setSubmitting, false);
}

//LANGUAGE_CONTROLLER_UPDATE

// COUNTRY CONTROLLER

function* countryControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.countryControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "country-create",
                entityName: "country"
            }
        });
        yield put({type: Actions.COUNTRY_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.COUNTRY_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* countryControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.countryControllerUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "country-update",
                entityName: "country"
            }
        });
        yield put({type: Actions.COUNTRY_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.COUNTRY_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* countryControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.countryControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "country-delete",
                entityName: "country"
            }
        });
        yield put({type: Actions.COUNTRY_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.COUNTRY_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// COUNTRY CONTROLLER

// GSP COUNTRY CONTROLLER
function* gspCountryControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspCountryControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspCountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-country-create",
                entityName: "gsp-country"
            }
        });
        yield put({type: Actions.GSP_COUNTRY_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_COUNTRY_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspCountryControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.gspCountryControllerUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspCountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-country-update",
                entityName: "gsp-country"
            }
        });
        yield put({type: Actions.GSP_COUNTRY_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_COUNTRY_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspCountryControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspCountryControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspCountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-country-delete",
                entityName: "gsp-country"
            }
        });
        yield put({type: Actions.GSP_COUNTRY_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_COUNTRY_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// GSP COUNTRY CONTROLLER

// REGION CONTROLLER
function* regionControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.regionControllerCreate, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, RegionScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "region-create",
                entityName: "region"
            }
        });
        yield put({type: Actions.REGION_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.REGION_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* regionControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.regionControllerUpdate, id, attributes);

        const normalizedData = yield call(Normalizer.Normalize, data, RegionScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "region-update",
                entityName: "region"
            }
        });
        yield put({type: Actions.REGION_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.REGION_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* regionControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.regionControllerDelete, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, RegionScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "region-delete",
                entityName: "region"
            }
        });
        yield put({type: Actions.REGION_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.REGION_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// REGION CONTROLLER

// GSP REGION CONTROLLER
function* gspRegionControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspRegionControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspRegionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-region-create",
                entityName: "gsp-region"
            }
        });
        yield put({type: Actions.GSP_REGION_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_REGION_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspRegionControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.gspRegionControllerUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspRegionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-region-update",
                entityName: "gsp-region"
            }
        });
        yield put({type: Actions.GSP_REGION_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_REGION_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspRegionControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspRegionControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspRegionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-region-delete",
                entityName: "gsp-region"
            }
        });
        yield put({type: Actions.GSP_REGION_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_REGION_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// GSP REGION CONTROLLER

// TRANSFER STRUCTURE START
function* getTransformData(action) {
    const {
        data,
        cb = {
            success: () => {
            },
            fail: () => {
            }
        }
    } = action.payload;
    try {
        const result = yield call(Api.structureCreate, data);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(result, "data"),
            StructureScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "create-structure-transfer",
                entityName: "structure"
            }
        });
        yield put({type: Actions.IABS_TRANSFORM.SUCCESS});
        yield call(cb.success, normalizedData, get(result, "data"));
    } catch (e) {
        yield put({type: Actions.IABS_TRANSFORM.FAILURE});
        yield call(cb.fail, e);
    }
}

function* removeTransformData(action) {
    const {
        data,
        cb = {
            success: () => {
            },
            fail: () => {
            }
        }
    } = action.payload;
    try {
        const result = yield call(Api.structureDelete, data);
        const {data: removedTransfer} = result;
        const normalizedData = yield call(
            Normalizer.Normalize,
            removedTransfer,
            StructureScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "remove-structure-transfer",
                entityName: "structure"
            }
        });
        yield put({type: Actions.IABS_TRANSFORM_REMOVE.SUCCESS});
        yield call(cb.success, normalizedData, removedTransfer);
    } catch (e) {
        yield put({type: Actions.IABS_TRANSFORM_REMOVE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* updateTransformData(action) {
    const {
        id,
        data,
        cb = {
            success: () => {
            },
            fail: () => {
            }
        }
    } = action.payload;
    try {
        const result = yield call(Api.structureUpdate, id, data);
        const {data: updatedTransfer} = result;

        const normalizedData = yield call(Normalizer.Normalize, updatedTransfer, [
            StructureScheme
        ]);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "iabs-structure-hierarchy-view",
                entityName: "structure"
            }
        });
        yield put({type: Actions.IABS_TRANSFORM_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, updatedTransfer);
    } catch (e) {
        yield put({type: Actions.IABS_TRANSFORM_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// TRANSFER STRUCTURE END

// <--- EMPLOYEE INFORMATION --->>>
function* setEmployeeInformationRequest(action) {
    const {
        id,
        data,
        cb = {
            success: () => {
            },
            fail: () => {
            }
        }
    } = action.payload;
    try {
        const result = yield call(Api.setEmployeeInformationRequest, id, data);
        yield put({
            type: Actions.EMPLOYEE_INFORMATION_REQUEST.SUCCESS,
            payload: {result: get(result, "data")}
        });
        yield call(cb.success, result);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_INFORMATION_REQUEST.FAILURE});
        yield call(cb.fail, e);
    }
}

function* setEmployeePositionProfileInfo(action) {
    const {
        id,
        data,
        cb = {
            success: () => {
            },
            fail: () => {
            }
        }
    } = action.payload;
    try {
        const result = yield call(Api.setEmployeePositionProfileInfo, id, data);
        yield put({
            type: Actions.EMPLOYEE_POSITION_PROFILE_INFO_SET.SUCCESS,
            payload: {result: get(result, "data")}
        });
        yield call(cb.success, result);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_POSITION_PROFILE_INFO_SET.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE INFORMATION --->>>

// DISTRICT CONTROLLER
function* districtControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.districtControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "district-create",
                entityName: "district"
            }
        });
        yield put({type: Actions.DISTRICT_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.DISTRICT_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* districtControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.districtControllerUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "district-update",
                entityName: "district"
            }
        });
        yield put({type: Actions.DISTRICT_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.DISTRICT_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* districtControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.districtControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "district-delete",
                entityName: "district"
            }
        });
        yield put({type: Actions.DISTRICT_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.DISTRICT_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// DISTRICT CONTROLLER

// GSP DISTRICT CONTROLLER
function* gspDistrictControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspDistrictControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspDistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-district-create",
                entityName: "gsp-district"
            }
        });
        yield put({type: Actions.GSP_DISTRICT_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_DISTRICT_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspDistrictControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(
            Api.gspDistrictControllerUpdate,
            id,
            attributes
        );

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspDistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-district-update",
                entityName: "gsp-district"
            }
        });
        yield put({type: Actions.GSP_DISTRICT_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_DISTRICT_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspDistrictControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspDistrictControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspDistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-district-delete",
                entityName: "gsp-district"
            }
        });
        yield put({type: Actions.GSP_DISTRICT_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_DISTRICT_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// GSP DISTRICT CONTROLLER

// PARTY CONTROLLER
function* partyControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.partyControllerCreate, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, PartyScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "party-create",
                entityName: "party"
            }
        });
        yield put({type: Actions.PARTY_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.PARTY_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* partyControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.partyControllerUpdate, id, attributes);

        const normalizedData = yield call(Normalizer.Normalize, data, PartyScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "party-update",
                entityName: "party"
            }
        });
        yield put({type: Actions.PARTY_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.PARTY_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* partyControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.partyControllerDelete, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, PartyScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "party-delete",
                entityName: "party"
            }
        });
        yield put({type: Actions.PARTY_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.PARTY_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// PARTY CONTROLLER

// NATIONALITY CONTROLLER
function* nationalityControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.nationalityControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            NationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "nationality-create",
                entityName: "nationality"
            }
        });
        yield put({type: Actions.NATIONALITY_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.NATIONALITY_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* nationalityControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(
            Api.nationalityControllerUpdate,
            id,
            attributes
        );
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            NationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "nationality-update",
                entityName: "nationality"
            }
        });
        yield put({type: Actions.NATIONALITY_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.NATIONALITY_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* nationalityControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.nationalityControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            NationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "nationality-delete",
                entityName: "nationality"
            }
        });
        yield put({type: Actions.NATIONALITY_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.NATIONALITY_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// NATIONALITY CONTROLLER

// GSP NATIONALITY CONTROLLER
function* gspNationalityControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspNationalityControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspNationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-nationality-create",
                entityName: "gsp-nationality"
            }
        });
        yield put({type: Actions.GSP_NATIONALITY_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_NATIONALITY_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspNationalityControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(
            Api.gspNationalityControllerUpdate,
            id,
            attributes
        );
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspNationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-nationality-update",
                entityName: "gsp-nationality"
            }
        });
        yield put({type: Actions.GSP_NATIONALITY_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_NATIONALITY_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* gspNationalityControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.gspNationalityControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            GspNationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "gsp-nationality-delete",
                entityName: "gsp-nationality"
            }
        });
        yield put({type: Actions.GSP_NATIONALITY_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.GSP_NATIONALITY_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// GSP NATIONALITY CONTROLLER

// STAFF CONTROLLER
function* staffControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.staffControllerCreate, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, StaffScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "staff-create",
                entityName: "staff"
            }
        });
        yield put({type: Actions.STAFF_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.STAFF_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* staffControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.staffControllerUpdate, id, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, StaffScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "staff-update",
                entityName: "staff"
            }
        });
        yield put({type: Actions.STAFF_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.STAFF_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* staffControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.staffControllerDelete, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, StaffScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "staff-delete",
                entityName: "staff"
            }
        });
        yield put({type: Actions.STAFF_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.STAFF_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* staffControllerClose(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.staffControllerClose, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, StaffScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "staff-close",
                entityName: "staff"
            }
        });
        yield put({type: Actions.STAFF_CONTROLLER_CLOSE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.STAFF_CONTROLLER_CLOSE.FAILURE});
        yield call(cb.fail, e);
    }
}

// STAFF CONTROLLER

// POSITION CONTROLLER
function* positionControllerCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.positionControllerCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            PositionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "position-create",
                entityName: "position"
            }
        });
        yield put({type: Actions.POSITION_CONTROLLER_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.POSITION_CONTROLLER_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* positionControllerUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.positionControllerUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            PositionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "position-update",
                entityName: "position"
            }
        });
        yield put({type: Actions.POSITION_CONTROLLER_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.POSITION_CONTROLLER_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* positionControllerDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.positionControllerDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            PositionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "position-delete",
                entityName: "position"
            }
        });
        yield put({type: Actions.POSITION_CONTROLLER_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.POSITION_CONTROLLER_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// POSITION CONTROLLER

// IABS LINK
function* linkAbsCountryToCoreCountry(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.linkAbsCountryToCoreCountry, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CountryScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "link-country",
                entityName: "country"
            }
        });
        yield put({type: Actions.LINK_ABS_COUNTRY_TO_CORE_COUNTRY.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.LINK_ABS_COUNTRY_TO_CORE_COUNTRY.FAILURE});
        yield call(cb.fail, e);
    }
}

function* linkAbsDistrictToCoreDistrict(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.linkAbsDistrictToCoreDistrict, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DistrictScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "link-district",
                entityName: "district"
            }
        });
        yield put({type: Actions.LINK_ABS_DISTRICT_TO_CORE_DISTRICT.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.LINK_ABS_DISTRICT_TO_CORE_DISTRICT.FAILURE});
        yield call(cb.fail, e);
    }
}

function* linkAbsNationToCoreNationality(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.linkAbsNationToCoreNationality, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            NationalityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "link-nationality",
                entityName: "nationality"
            }
        });
        yield put({type: Actions.LINK_ABS_NATION_TO_CORE_NATIONALITY.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.LINK_ABS_NATION_TO_CORE_NATIONALITY.FAILURE});
        yield call(cb.fail, e);
    }
}

function* linkAbsPartyToCoreParty(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.linkAbsPartyToCoreParty, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, PartyScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "link-party",
                entityName: "party"
            }
        });
        yield put({type: Actions.LINK_ABS_PARTY_TO_CORE_PARTY.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.LINK_ABS_PARTY_TO_CORE_PARTY.FAILURE});
        yield call(cb.fail, e);
    }
}

function* linkAbsRegionToCoreRegion(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.linkAbsRegionToCoreRegion, attributes);
        const normalizedData = yield call(Normalizer.Normalize, data, RegionScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "link-region",
                entityName: "region"
            }
        });
        yield put({type: Actions.LINK_ABS_REGION_TO_CORE_REGION.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.LINK_ABS_REGION_TO_CORE_REGION.FAILURE});
        yield call(cb.fail, e);
    }
}

// IABS LINK

/// <--- IABS LOAD --->>
function* iabsLoadCountries(action) {
    const {
        payload: {
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.iabsLoadCountries);
        yield put({type: Actions.IABS_LOAD_COUNTRIES.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.IABS_LOAD_COUNTRIES.FAILURE});
        yield call(cb.fail, e);
    }
}

function* iabsLoadDistricts(action) {
    const {
        payload: {
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.iabsLoadDistricts);
        yield put({type: Actions.IABS_LOAD_DISTRICTS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.IABS_LOAD_DISTRICTS.FAILURE});
        yield call(cb.fail, e);
    }
}

function* iabsLoadNations(action) {
    const {
        payload: {
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.iabsLoadNations);
        yield put({type: Actions.IABS_LOAD_NATIONS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.IABS_LOAD_NATIONS.FAILURE});
        yield call(cb.fail, e);
    }
}

function* iabsLoadParties(action) {
    const {
        payload: {
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.iabsLoadParties);
        yield put({type: Actions.IABS_LOAD_PARTIES.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.IABS_LOAD_PARTIES.FAILURE});
        yield call(cb.fail, e);
    }
}

function* iabsLoadRegions(action) {
    const {
        payload: {
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.iabsLoadRegions);
        yield call(cb.success, data);
        yield put({type: Actions.IABS_LOAD_REGIONS.SUCCESS});
    } catch (e) {
        yield call(cb.fail, e);
        yield put({type: Actions.IABS_LOAD_REGIONS.FAILURE});
    }
}

/// <--- IABS LOAD --->>

// DIPLOMA QUALIFICATION CONTROLLER
function* diplomaQualificationCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.diplomaQualificationCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DiplomaQualificationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "diploma-qualification-create",
                entityName: "diploma-qualification"
            }
        });
        yield put({type: Actions.DIPLOMA_QUALIFICATION_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.DIPLOMA_QUALIFICATION_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* diplomaQualificationUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.diplomaQualificationUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DiplomaQualificationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "diploma-qualification-update",
                entityName: "diploma-qualification"
            }
        });
        yield put({type: Actions.DIPLOMA_QUALIFICATION_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.DIPLOMA_QUALIFICATION_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* diplomaQualificationDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.diplomaQualificationDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            DiplomaQualificationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "diploma-qualification-delete",
                entityName: "diploma-qualification"
            }
        });
        yield put({type: Actions.DIPLOMA_QUALIFICATION_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.DIPLOMA_QUALIFICATION_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// DIPLOMA QUALIFICATION CONTROLLER

// EDUCATIONAL INSTITUTION CONTROLLER
function* educationalInstitutionCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.educationalInstitutionCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationalInstitutionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "educational-institution-create",
                entityName: "educational-institution"
            }
        });
        yield put({type: Actions.EDUCATIONAL_INSTITUTION_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATIONAL_INSTITUTION_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* educationalInstitutionUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(
            Api.educationalInstitutionUpdate,
            id,
            attributes
        );

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationalInstitutionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "educational-institution-update",
                entityName: "educational-institution"
            }
        });
        yield put({type: Actions.EDUCATIONAL_INSTITUTION_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATIONAL_INSTITUTION_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* educationalInstitutionDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.educationalInstitutionDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationalInstitutionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "educational-institution-delete",
                entityName: "educational-institution"
            }
        });
        yield put({type: Actions.EDUCATIONAL_INSTITUTION_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATIONAL_INSTITUTION_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// EDUCATIONAL INSTITUTION CONTROLLER

// FACULTY CONTROLLER
function* facultyCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.facultyCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            FacultyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "faculty-create",
                entityName: "faculty"
            }
        });
        yield put({type: Actions.FACULTY_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.FACULTY_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* facultyUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.facultyUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            FacultyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "faculty-update",
                entityName: "faculty"
            }
        });
        yield put({type: Actions.FACULTY_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.FACULTY_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* facultyDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.facultyDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            FacultyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "faculty-delete",
                entityName: "faculty"
            }
        });
        yield put({type: Actions.FACULTY_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.FACULTY_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// FACULTY CONTROLLER

// FORM STUDY CONTROLLER
function* formStudyCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.formStudyCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            FormStudyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "form-study-create",
                entityName: "form-study"
            }
        });
        yield put({type: Actions.FORM_STUDY_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.FORM_STUDY_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* formStudyUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.formStudyUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            FormStudyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "form-study-update",
                entityName: "form-study"
            }
        });
        yield put({type: Actions.FORM_STUDY_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.FORM_STUDY_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* formStudyDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.formStudyDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            FormStudyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "form-study-delete",
                entityName: "form-study"
            }
        });
        yield put({type: Actions.FORM_STUDY_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.FORM_STUDY_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// FORM STUDY CONTROLLER

// RELATIVES CONTROLLER
function* relativesCreate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.relativesCreate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            RelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "relatives",
                entityName: "relatives"
            }
        });
        yield put({type: Actions.RELATIVES_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.RELATIVES_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* relativesUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.relativesUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            RelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "relatives-update",
                entityName: "relatives"
            }
        });
        yield put({type: Actions.RELATIVES_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.RELATIVES_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* relativesDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.relativesDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            RelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "relatives-delete",
                entityName: "relatives"
            }
        });
        yield put({type: Actions.RELATIVES_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.RELATIVES_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// RELATIVES CONTROLLER

// SPECIALITY CONTROLLER
function* specialityCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.specialityCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            SpecialityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "speciality-create",
                entityName: "speciality"
            }
        });
        yield put({type: Actions.SPECIALITY_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.SPECIALITY_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* specialityUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.specialityUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            SpecialityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "speciality-update",
                entityName: "speciality"
            }
        });
        yield put({type: Actions.SPECIALITY_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.SPECIALITY_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* specialityDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.specialityDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            SpecialityScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "speciality-delete",
                entityName: "speciality"
            }
        });
        yield put({type: Actions.SPECIALITY_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.SPECIALITY_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// SPECIALITY CONTROLLER

// COMPANY CONTROLLER
function* companyCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.companyCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CompanyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "company-create",
                entityName: "company"
            }
        });
        yield put({type: Actions.COMPANY_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.COMPANY_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* companyUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.companyUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CompanyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "company-update",
                entityName: "company"
            }
        });
        yield put({type: Actions.COMPANY_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.COMPANY_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* companyDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.companyDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            CompanyScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "company-delete",
                entityName: "company"
            }
        });
        yield put({type: Actions.COMPANY_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.COMPANY_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// COMPANY CONTROLLER

// EDUCATION CONTROLLER
function* educationCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.educationCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education-create",
                entityName: "education"
            }
        });
        yield put({type: Actions.EDUCATION_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATION_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* educationCreateByUser(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.educationCreateByUser, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education-create-by-user",
                entityName: "education"
            }
        });
        yield put({type: Actions.EDUCATION_CREATE_BY_USER.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATION_CREATE_BY_USER.FAILURE});
        yield call(cb.fail, e);
    }
}

function* educationUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.educationUpdate, id, attributes);

        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education-update",
                entityName: "education"
            }
        });
        yield put({type: Actions.EDUCATION_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATION_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* educationDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.educationDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education-delete",
                entityName: "education"
            }
        });
        yield put({type: Actions.EDUCATION_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EDUCATION_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// EDUCATION CONTROLLER


// EMPLOYEE_REGISTER_REQUESTS_CREATE
function* employeeRegisterRequestCreate(action) {
    const {
        payload: {
            data,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const result = yield call(Api.employeeRegisterRequestCreate, data);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(result, "data"),
            RequestsScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employee-register-request-create",
                entityName: "requests"
            }
        });
        yield put({type: Actions.EMPLOYEE_REGISTER_REQUEST_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, get(result, "data"));
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_REGISTER_REQUEST_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* employeeRequestConfirm(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const result = yield call(Api.employeeRequestConfirm, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            get(result, "data"),
            RequestsScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employee-register-request-confirm",
                entityName: "requests"
            }
        });
        yield put({type: Actions.EMPLOYEE_REQUEST_CONFIRM.SUCCESS});
        yield call(cb.success, normalizedData, get(result, "data"));
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_REQUEST_CONFIRM.FAILURE});
        yield call(cb.fail, e);
    }
}

// EDUCATION CONTROLLER


//USER TASKS
function* tasksUserFormSetValuesReturnAndComplete(action) {
    const {form_name, tasks_user_id, data: valuesData, cb} = action.payload;
    try {
        const {data} = yield call(Api.tasksUserFormSetValuesReturnResultAndComplete, form_name, tasks_user_id, valuesData);
        yield put({type: Actions.TASKS_USER_FORM_SET_VALUES_AND_RETURN_VALUES_COMPLETE.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.TASKS_USER_FORM_SET_VALUES_AND_RETURN_VALUES_COMPLETE.FAILURE});
        yield call(cb.fail, e);
    }
}

//USER TASKS

//DOCUMENT
function* createNewDocument(action) {
    const {attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.createNewDocument, attributes);
        yield put({type: Actions.CREATE_NEW_DOCUMENT.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.CREATE_NEW_DOCUMENT.FAILURE});
        yield call(cb.fail, e);
    }
}

//DOCUMENT

function* linkAbsPositionToCorePosition(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.linkAbsPostionToCorePostion, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            PositionScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "link-position",
                entityName: "position"
            }
        });
        yield put({type: Actions.LINK_ABS_POSITION_TO_CORE_POSITION.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.LINK_ABS_POSITION_TO_CORE_POSITION.FAILURE});
        yield call(cb.fail, e);
    }
}


//DOCUMENT
function* createRecruitment(action) {
    const {attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.createRecruitment, attributes);
        yield put({type: Actions.CREATE_RECRUITMENT.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.CREATE_RECRUITMENT.FAILURE});
        yield call(cb.fail, e);
    }
}

//DOCUMENT
// <--- EMPLOYEE CREATE

function* employeeCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees",
                entityName: "employees"
            }
        });
        yield put({type: Actions.EMPLOYEE_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE CREATE

// <--- EMPLOYEE UPDATE
function* employeeUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.employeeUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-update",
                entityName: "employees"
            }
        });
        yield put({type: Actions.EMPLOYEE_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* employeeRefreshServicesData(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.employeeRefreshServices, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.EMPLOYEE_REFRESH_SERVICES_DATA.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_REFRESH_SERVICES_DATA.FAILURE});
        yield call(cb.fail, e);
    }
}


// <--- EMPLOYEE UPDATE

// <--- EDUCATION_CREATE_BY_DOCUMENT

function* employeeCreateByDocument(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeCreateByDocument, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees",
                entityName: "employees"
            }
        });
        yield put({type: Actions.EMPLOYEE_CREATE_BY_DOCUMENT.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_CREATE_BY_DOCUMENT.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EDUCATION_CREATE_BY_DOCUMENT

// <--- EMPLOYEE EDUCATION CREATE
function* employeeEducationCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeEducationCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education",
                entityName: "education"
            }
        });
        yield put({type: Actions.EMPLOYEE_EDUCATION_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_EDUCATION_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE EDUCATION CREATE

// <--- EMPLOYEE EDUCATION UPDATE
function* employeeEducationUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.employeeEducationUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education-update",
                entityName: "education"
            }
        });
        yield put({type: Actions.EMPLOYEE_EDUCATION_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_EDUCATION_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE EDUCATION UPDATE

// <--- EMPLOYEE EDUCATION DELETE
function* employeeEducationDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeEducationDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EducationScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "education-delete",
                entityName: "education"
            }
        });
        yield put({type: Actions.EMPLOYEE_EDUCATION_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_EDUCATION_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE EDUCATION DELETE


// <--- EMPLOYEE RELATION CREATE
function* employeeRelationCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeRelativesCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeeRelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employeeRelatives",
                entityName: "employeeRelatives"
            }
        });
        yield put({type: Actions.EMPLOYEE_RELATIVES_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_RELATIVES_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE RELATION CREATE

// <--- EMPLOYEE RELATION UPDATE
function* employeeRelationUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.employeeRelativesUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            RelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "relatives-update",
                entityName: "relatives"
            }
        });
        yield put({type: Actions.EMPLOYEE_RELATION_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_RELATION_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE RELATION UPDATE

// <--- EMPLOYEE RELATION DELETE
function* employeeRelationDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeRelativesDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            RelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "relatives-delete",
                entityName: "relatives"
            }
        });
        yield put({type: Actions.EMPLOYEE_RELATION_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_RELATION_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE RELATION DELETE

// <--- EMPLOYEE CREATE

function* structureVersionCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.structureVersionCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "structure-version-list",
                entityName: "structure-version"
            }
        });
        yield put({type: Actions.CREATE_STRUCTURE_VERSION.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.CREATE_STRUCTURE_VERSION.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE CREATE

// <--- EMPLOYEE structureLinkBatch

function* structureLinkBatch(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.structureLinkBatch, attributes);
        yield put({type: Actions.STRUCTURE_LINK_BATCH.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.STRUCTURE_LINK_BATCH.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- EMPLOYEE CREATE


// EMPLOYEE RELATIVES CONTROLLER
function* employeeRelativesCreate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeRelativesCreate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeeRelatives
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "relatives",
                entityName: "relatives"
            }
        });
        yield put({type: Actions.RELATIVES_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.RELATIVES_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* employeeRelativesUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.employeeRelativesUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeeRelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employeeRelatives-update",
                entityName: "employeeRelatives"
            }
        });
        yield put({type: Actions.EMPLOYEE_RELATIVES_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_RELATIVES_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* employeeRelativesDelete(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.employeeRelativesDelete, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeeRelativesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employeeRelatives-delete",
                entityName: "employeeRelatives"
            }
        });
        yield put({type: Actions.EMPLOYEE_RELATIVES_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.EMPLOYEE_RELATIVES_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* structureAbsSync(action) {
    const {
        payload: {
            altCode,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.structureAbsSync, altCode);
        yield put({type: Actions.STRUCTURE_ABS_SYNC.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.STRUCTURE_ABS_SYNC.FAILURE});
        yield call(cb.fail, e);
    }
}


function* structureAbsSyncFilials(action) {
    const {
        payload: {
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.structureAbsSyncFilials);
        yield put({type: Actions.STRUCTURE_ABS_SYNC_FILIALS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.STRUCTURE_ABS_SYNC_FILIALS.FAILURE});
        yield call(cb.fail, e);
    }
}

function* createStructure(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.structureCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            StructureScheme
        );

        yield put({
            type: NormalizerAction.CHANGE_NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "structure-create",
                changedStoreName: "structure-unselected-list",
                entityName: "structure"
            }
        });
        yield put({type: Actions.CREATE_STRUCTURE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.CREATE_STRUCTURE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* reloadEmployeeProfilePhoto(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.reloadEmployeeProfilePhoto, id);
        yield put({type: Actions.RELOAD_EMPLOYEE_PROFILE_PHOTO.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.RELOAD_EMPLOYEE_PROFILE_PHOTO.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* reloadEmployeeInfoFromIabs(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.reloadEmployeeInfoFromIabs, id);
        yield put({type: Actions.RELOAD_EMPLOYEE_INFO_FROM_IABS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.RELOAD_EMPLOYEE_INFO_FROM_IABS.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* asyncVaccineCertificate(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.syncEmployeeVaccine, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_VACCINE_CERTIFICATE.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_VACCINE_CERTIFICATE.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}


function* refreshEmployeeRelatives(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.asyncEmployeeRelatives, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_EMPLOYEE_RELATIVES.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_EMPLOYEE_RELATIVES.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* setStructureTypeChildAll(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.setStructureTypeAllChild, attributes);
        yield put({type: Actions.SET_STRUCTURE_TYPE_CHILD_ALL.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.SET_STRUCTURE_TYPE_CHILD_ALL.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* refreshEmployeeConviction(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.asyncEmployeeConviction, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_EMPLOYEE_CONVICTION.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_EMPLOYEE_CONVICTION.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* refreshEmployeePsychoInfo(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.asyncPsychoInfo, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_EMPLOYEE_PSYCHO_INFO.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_EMPLOYEE_PSYCHO_INFO.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* refreshEmployeeNarcoInfo(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.asyncNarcoInfo, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_EMPLOYEE_NARCO_INFO.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_EMPLOYEE_NARCO_INFO.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* refreshEmployeeCv(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.asyncCvInfo, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_EMPLOYEE_CV.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_EMPLOYEE_CV.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

function* refreshWorkReference(action) {
    const {
        payload: {
            id,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.asyncWorkReference, id);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            EmployeesScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "employees-refresh-services",
                entityName: "employees"
            }
        });
        yield put({type: Actions.ASYNC_WORK_REFERENCE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.ASYNC_WORK_REFERENCE.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}


function* setStructurehierarchyAsTemplate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.setStructureHierarchyAsTemplate, attributes);
        yield put({type: Actions.SET_STRUCTURE_HIERARCHY_AS_TEMPLATE.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.SET_STRUCTURE_HIERARCHY_AS_TEMPLATE.FAILURE});
        yield call(cb.fail, e?.response?.data);
    }
}

// <--- BUSINESS PROCESS CREATE
function* businessProcessCreate(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.businessProcessCreate, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            BusinessProcessScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "business-process-create",
                entityName: "business-process"
            }
        });
        yield put({type: Actions.BUSINESS_PROCESS_CREATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.BUSINESS_PROCESS_CREATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- BUSINESS PROCESS CREATE

// <--- BUSINESS PROCESS UPDATE
function* businessProcessUpdate(action) {
    const {
        payload: {
            id,
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;

    try {
        const {data} = yield call(Api.businessProcessUpdate, id, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            BusinessProcessScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "business-process-update",
                entityName: "business-process"
            }
        });
        yield put({type: Actions.BUSINESS_PROCESS_UPDATE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.BUSINESS_PROCESS_UPDATE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- BUSINESS PROCESS UPDATE

// <--- BUSINESS PROCESS DELETE
function* businessProcessDelete(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.businessProcessDelete, attributes);
        const normalizedData = yield call(
            Normalizer.Normalize,
            data,
            BusinessProcessScheme
        );
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "business-process-delete",
                entityName: "business-process"
            }
        });
        yield put({type: Actions.BUSINESS_PROCESS_DELETE.SUCCESS});
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({type: Actions.BUSINESS_PROCESS_DELETE.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- BUSINESS PROCESS DELETE

// <--- DOCUMENT SIGN PROCESS
function* documentSignProcess(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.documentSignProcess, attributes);
        yield put({type: Actions.DOCUMENT_SIGN_PROCESS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.DOCUMENT_SIGN_PROCESS.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- DOCUMENT SIGN PROCESS

// <--- DOCUMENT SIGN PROCESS
function* documentSignWithEimzoProcess(action) {
    const {
        payload: {
            attributes,
            cb = {
                success: () => {
                },
                fail: () => {
                }
            }
        }
    } = action;
    try {
        const {data} = yield call(Api.documentSignWithEimzoProcess, attributes);
        yield put({type: Actions.DOCUMENT_SIGN_WITH_EIMZO_PROCESS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.DOCUMENT_SIGN_WITH_EIMZO_PROCESS.FAILURE});
        yield call(cb.fail, e);
    }
}

// <--- DOCUMENT SIGN PROCESS

// VACANCY PROCESS
function* vacancyProcessStart(action) {
    const {id, attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.vacancyProcessStart, id, attributes);
        yield put({type: Actions.VACANCY_PROCESS_START.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.VACANCY_PROCESS_START.FAILURE});
        yield call(cb.fail, e);
    }
}

// !!VACANCY PROCESS

// VACATION GRAPHIC
function* vacationGraphicProcessStart(action) {
    const {id, attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.vacationGraphicProcessStart, id, attributes);
        yield put({type: Actions.VACATION_GRAPHIC_START.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.VACATION_GRAPHIC_START.FAILURE});
        yield call(cb.fail, e);
    }
}

// !!VACATION GRAPHIC


// POST UPDATE STRUCTURE
function* postUpdateStructure(action) {
    const {rootStructureId, cb} = action.payload;
    try {
        const {data} = yield call(Api.postUpdateStructure, rootStructureId);
        yield put({type: Actions.POST_UPDATE_STRUCTURE.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.POST_UPDATE_STRUCTURE.FAILURE});
        yield call(cb.fail, e);
    }
}

// !!POST UPDATE STRUCTURE

// SET EXCEPTION DAY
function* setExceptionDay(action) {
    const {attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.setExceptionDay, attributes);
        yield put({type: Actions.SET_EXCEPTION_DAY.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.SET_EXCEPTION_DAY.FAILURE});
        yield call(cb.fail, e);
    }
}

// !!SET EXCEPTION DAY

// UPDATE EXCEPTION DAY
function* updateExceptionDay(action) {
    const {exception_day, attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.updateExceptionDay, exception_day, attributes);
        yield put({type: Actions.UPDATE_EXCEPTION_DAY.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.UPDATE_EXCEPTION_DAY.FAILURE});
        yield call(cb.fail, e);
    }
}

// !!UPDATE EXCEPTION DAY

// DELETE EXCEPTION DAY
function* deleteExceptionDay(action) {
    const {exception_day, cb} = action.payload;
    try {
        const {data} = yield call(Api.deleteExceptionDay, exception_day);
        yield put({type: Actions.DELETE_EXCEPTION_DAY.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.DELETE_EXCEPTION_DAY.FAILURE});
        yield call(cb.fail, e);
    }
}

// !!DELETE EXCEPTION DAY

//DOCUMENT REQUEST
function* createAndStartNewProcess(action) {
    const {attributes, url, cb} = action.payload;
    try {
        const {data} = yield call(Api.createAndStartNewProcess, attributes, url);
        yield put({type: Actions.CREATE_AND_START_NEW_PROCESS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.CREATE_AND_START_NEW_PROCESS.FAILURE});
        yield call(cb.fail, e);
    }
}

//DOCUMENT REQUEST

//GENERATE DOCUMENT REQUEST
function* generateDocs(action) {
    const {attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.generateDocs, attributes);
        yield put({type: Actions.GENERATE_DOCS.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.GENERATE_DOCS.FAILURE});
        yield call(cb.fail, e);
    }
}

//GENERATE DOCUMENT REQUEST

function* uploadEmployeeFiles(action) {
    const {attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.uploadEmployeeFiles, attributes);
        yield put({type: Actions.UPLOAD_EMPLOYEE_FILE.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.UPLOAD_EMPLOYEE_FILE.FAILURE});
        yield call(cb.fail, e);
    }
}

function* uploadCandidateFiles(action) {
    const {attributes, cb} = action.payload;
    try {
        const {data} = yield call(Api.uploadCandidateFiles, attributes);
        yield put({type: Actions.UPLOAD_CANDIDATE_FILE.SUCCESS});
        yield call(cb.success, data);
    } catch (e) {
        yield put({type: Actions.UPLOAD_CANDIDATE_FILE.FAILURE});
        yield call(cb.fail, e);
    }
}



export default function* sagas() {
    yield all([
        takeLatest(Actions.CHANGE_MODE.REQUEST, changeMode),
        takeLatest(Actions.CHANGE_LANG.REQUEST, changeLang),
        takeLatest(Actions.GET_TRANSLATIONS.REQUEST, getTranslations),
        takeLatest(Actions.LANGUAGE_CONTROLLER_UPDATE.REQUEST, languageUpdate),
        takeLatest(Actions.IABS_TRANSFORM.REQUEST, getTransformData),
        takeLatest(Actions.IABS_TRANSFORM_REMOVE.REQUEST, removeTransformData),
        takeLatest(Actions.IABS_TRANSFORM_UPDATE.REQUEST, updateTransformData),
        takeLatest(
            Actions.COUNTRY_CONTROLLER_CREATE.REQUEST,
            countryControllerCreate
        ),
        takeLatest(
            Actions.COUNTRY_CONTROLLER_UPDATE.REQUEST,
            countryControllerUpdate
        ),
        takeLatest(
            Actions.COUNTRY_CONTROLLER_DELETE.REQUEST,
            countryControllerDelete
        ),
        takeLatest(
            Actions.REGION_CONTROLLER_CREATE.REQUEST,
            regionControllerCreate
        ),
        takeLatest(
            Actions.REGION_CONTROLLER_UPDATE.REQUEST,
            regionControllerUpdate
        ),
        takeLatest(
            Actions.REGION_CONTROLLER_DELETE.REQUEST,
            regionControllerDelete
        ),
        takeLatest(
            Actions.GSP_COUNTRY_CONTROLLER_CREATE.REQUEST,
            gspCountryControllerCreate
        ),
        takeLatest(
            Actions.GSP_COUNTRY_CONTROLLER_UPDATE.REQUEST,
            gspCountryControllerUpdate
        ),
        takeLatest(
            Actions.GSP_COUNTRY_CONTROLLER_DELETE.REQUEST,
            gspCountryControllerDelete
        ),
        takeLatest(
            Actions.GSP_REGION_CONTROLLER_CREATE.REQUEST,
            gspRegionControllerCreate
        ),
        takeLatest(
            Actions.GSP_REGION_CONTROLLER_UPDATE.REQUEST,
            gspRegionControllerUpdate
        ),
        takeLatest(
            Actions.GSP_REGION_CONTROLLER_DELETE.REQUEST,
            gspRegionControllerDelete
        ),
        takeLatest(
            Actions.DISTRICT_CONTROLLER_CREATE.REQUEST,
            districtControllerCreate
        ),
        takeLatest(
            Actions.DISTRICT_CONTROLLER_UPDATE.REQUEST,
            districtControllerUpdate
        ),
        takeLatest(
            Actions.DISTRICT_CONTROLLER_DELETE.REQUEST,
            districtControllerDelete
        ),
        takeLatest(
            Actions.GSP_DISTRICT_CONTROLLER_CREATE.REQUEST,
            gspDistrictControllerCreate
        ),
        takeLatest(
            Actions.GSP_DISTRICT_CONTROLLER_UPDATE.REQUEST,
            gspDistrictControllerUpdate
        ),
        takeLatest(
            Actions.GSP_DISTRICT_CONTROLLER_DELETE.REQUEST,
            gspDistrictControllerDelete
        ),
        takeLatest(Actions.PARTY_CONTROLLER_CREATE.REQUEST, partyControllerCreate),
        takeLatest(Actions.PARTY_CONTROLLER_UPDATE.REQUEST, partyControllerUpdate),
        takeLatest(Actions.PARTY_CONTROLLER_DELETE.REQUEST, partyControllerDelete),
        takeLatest(
            Actions.NATIONALITY_CONTROLLER_CREATE.REQUEST,
            nationalityControllerCreate
        ),
        takeLatest(
            Actions.NATIONALITY_CONTROLLER_UPDATE.REQUEST,
            nationalityControllerUpdate
        ),
        takeLatest(
            Actions.NATIONALITY_CONTROLLER_DELETE.REQUEST,
            nationalityControllerDelete
        ),
        takeLatest(
            Actions.GSP_NATIONALITY_CONTROLLER_CREATE.REQUEST,
            gspNationalityControllerCreate
        ),
        takeLatest(
            Actions.GSP_NATIONALITY_CONTROLLER_UPDATE.REQUEST,
            gspNationalityControllerUpdate
        ),
        takeLatest(
            Actions.GSP_NATIONALITY_CONTROLLER_DELETE.REQUEST,
            gspNationalityControllerDelete
        ),
        takeLatest(
            Actions.EMPLOYEE_INFORMATION_REQUEST.REQUEST,
            setEmployeeInformationRequest
        ),
        takeLatest(
            Actions.EMPLOYEE_POSITION_PROFILE_INFO_SET.REQUEST,
            setEmployeePositionProfileInfo
        ),
        takeLatest(
            Actions.LINK_ABS_COUNTRY_TO_CORE_COUNTRY.REQUEST,
            linkAbsCountryToCoreCountry
        ),
        takeLatest(
            Actions.LINK_ABS_DISTRICT_TO_CORE_DISTRICT.REQUEST,
            linkAbsDistrictToCoreDistrict
        ),
        takeLatest(
            Actions.LINK_ABS_NATION_TO_CORE_NATIONALITY.REQUEST,
            linkAbsNationToCoreNationality
        ),
        takeLatest(
            Actions.LINK_ABS_PARTY_TO_CORE_PARTY.REQUEST,
            linkAbsPartyToCoreParty
        ),
        takeLatest(
            Actions.LINK_ABS_REGION_TO_CORE_REGION.REQUEST,
            linkAbsRegionToCoreRegion
        ),
        takeLatest(Actions.STAFF_CONTROLLER_CREATE.REQUEST, staffControllerCreate),
        takeLatest(Actions.STAFF_CONTROLLER_UPDATE.REQUEST, staffControllerUpdate),
        takeLatest(Actions.STAFF_CONTROLLER_DELETE.REQUEST, staffControllerDelete),
        takeLatest(Actions.STAFF_CONTROLLER_CLOSE.REQUEST, staffControllerClose),
        takeLatest(
            Actions.POSITION_CONTROLLER_CREATE.REQUEST,
            positionControllerCreate
        ),
        takeLatest(
            Actions.POSITION_CONTROLLER_UPDATE.REQUEST,
            positionControllerUpdate
        ),
        takeLatest(
            Actions.POSITION_CONTROLLER_DELETE.REQUEST,
            positionControllerDelete
        ),
        takeLatest(Actions.IABS_LOAD_COUNTRIES.REQUEST, iabsLoadCountries),
        takeLatest(Actions.IABS_LOAD_DISTRICTS.REQUEST, iabsLoadDistricts),
        takeLatest(Actions.IABS_LOAD_NATIONS.REQUEST, iabsLoadNations),
        takeLatest(Actions.IABS_LOAD_PARTIES.REQUEST, iabsLoadParties),
        takeLatest(Actions.IABS_LOAD_REGIONS.REQUEST, iabsLoadRegions),
        takeLatest(
            Actions.DIPLOMA_QUALIFICATION_CREATE.REQUEST,
            diplomaQualificationCreate
        ),
        takeLatest(
            Actions.DIPLOMA_QUALIFICATION_UPDATE.REQUEST,
            diplomaQualificationUpdate
        ),
        takeLatest(
            Actions.DIPLOMA_QUALIFICATION_DELETE.REQUEST,
            diplomaQualificationDelete
        ),
        takeLatest(
            Actions.EDUCATIONAL_INSTITUTION_CREATE.REQUEST,
            educationalInstitutionCreate
        ),
        takeLatest(
            Actions.EDUCATIONAL_INSTITUTION_UPDATE.REQUEST,
            educationalInstitutionUpdate
        ),
        takeLatest(
            Actions.EDUCATIONAL_INSTITUTION_DELETE.REQUEST,
            educationalInstitutionDelete
        ),
        takeLatest(Actions.FACULTY_CREATE.REQUEST, facultyCreate),
        takeLatest(Actions.FACULTY_UPDATE.REQUEST, facultyUpdate),
        takeLatest(Actions.FACULTY_DELETE.REQUEST, facultyDelete),
        takeLatest(Actions.FORM_STUDY_CREATE.REQUEST, formStudyCreate),
        takeLatest(Actions.FORM_STUDY_UPDATE.REQUEST, formStudyUpdate),
        takeLatest(Actions.FORM_STUDY_DELETE.REQUEST, formStudyDelete),
        takeLatest(Actions.RELATIVES_CREATE.REQUEST, relativesCreate),
        takeLatest(Actions.RELATIVES_UPDATE.REQUEST, relativesUpdate),
        takeLatest(Actions.RELATIVES_DELETE.REQUEST, relativesDelete),
        takeLatest(Actions.SPECIALITY_CREATE.REQUEST, specialityCreate),
        takeLatest(Actions.SPECIALITY_UPDATE.REQUEST, specialityUpdate),
        takeLatest(Actions.SPECIALITY_DELETE.REQUEST, specialityDelete),
        takeLatest(Actions.COMPANY_CREATE.REQUEST, companyCreate),
        takeLatest(Actions.COMPANY_UPDATE.REQUEST, companyUpdate),
        takeLatest(Actions.COMPANY_DELETE.REQUEST, companyDelete),
        takeLatest(Actions.EDUCATION_CREATE.REQUEST, educationCreate),
        takeLatest(Actions.EDUCATION_CREATE_BY_USER.REQUEST, educationCreateByUser),
        takeLatest(Actions.EDUCATION_UPDATE.REQUEST, educationUpdate),
        takeLatest(Actions.EDUCATION_DELETE.REQUEST, educationDelete),
        takeLatest(Actions.TASKS_USER_FORM_SET_VALUES_AND_RETURN_VALUES_COMPLETE.REQUEST, tasksUserFormSetValuesReturnAndComplete),
        takeLatest(Actions.EDUCATION_DELETE.REQUEST, educationDelete),
        takeLatest(Actions.EMPLOYEE_REGISTER_REQUEST_CREATE.REQUEST, employeeRegisterRequestCreate),
        takeLatest(Actions.CREATE_NEW_DOCUMENT.REQUEST, createNewDocument),
        takeLatest(Actions.EMPLOYEE_REQUEST_CONFIRM.REQUEST, employeeRequestConfirm),
        takeLatest(Actions.LINK_ABS_POSITION_TO_CORE_POSITION.REQUEST, linkAbsPositionToCorePosition),
        takeLatest(Actions.CREATE_RECRUITMENT.REQUEST, createRecruitment),
        takeLatest(Actions.EMPLOYEE_CREATE.REQUEST, employeeCreate),
        takeLatest(Actions.EMPLOYEE_UPDATE.REQUEST, employeeUpdate),
        takeLatest(Actions.EMPLOYEE_EDUCATION_CREATE.REQUEST, employeeEducationCreate),
        takeLatest(Actions.EMPLOYEE_EDUCATION_UPDATE.REQUEST, employeeEducationUpdate),
        takeLatest(Actions.EMPLOYEE_EDUCATION_DELETE.REQUEST, employeeEducationDelete),
        takeLatest(Actions.EMPLOYEE_RELATION_CREATE.REQUEST, employeeRelationCreate),
        takeLatest(Actions.EMPLOYEE_RELATION_UPDATE.REQUEST, employeeRelationUpdate),
        takeLatest(Actions.EMPLOYEE_RELATION_DELETE.REQUEST, employeeRelationDelete),
        takeLatest(Actions.CREATE_STRUCTURE_VERSION.REQUEST, structureVersionCreate),
        takeLatest(Actions.EMPLOYEE_RELATIVES_CREATE.REQUEST, employeeRelativesCreate),
        takeLatest(Actions.EMPLOYEE_RELATIVES_UPDATE.REQUEST, employeeRelativesUpdate),
        takeLatest(Actions.EMPLOYEE_RELATIVES_DELETE.REQUEST, employeeRelativesDelete),
        takeLatest(Actions.CREATE_STRUCTURE_VERSION.REQUEST, structureVersionCreate),
        takeLatest(Actions.STRUCTURE_LINK_BATCH.REQUEST, structureLinkBatch),
        takeLatest(Actions.STRUCTURE_ABS_SYNC.REQUEST, structureAbsSync),
        takeLatest(Actions.STRUCTURE_ABS_SYNC_FILIALS.REQUEST, structureAbsSyncFilials),
        takeLatest(Actions.EMPLOYEE_CREATE_BY_DOCUMENT.REQUEST, employeeCreateByDocument),
        takeLatest(Actions.EMPLOYEE_REFRESH_SERVICES_DATA.REQUEST, employeeRefreshServicesData),
        takeLatest(Actions.CREATE_STRUCTURE.REQUEST, createStructure),
        takeLatest(Actions.RELOAD_EMPLOYEE_PROFILE_PHOTO.REQUEST, reloadEmployeeProfilePhoto),
        takeLatest(Actions.RELOAD_EMPLOYEE_INFO_FROM_IABS.REQUEST, reloadEmployeeInfoFromIabs),
        takeLatest(Actions.ASYNC_VACCINE_CERTIFICATE.REQUEST, asyncVaccineCertificate),
        takeLatest(Actions.ASYNC_EMPLOYEE_RELATIVES.REQUEST, refreshEmployeeRelatives),
        takeLatest(Actions.SET_STRUCTURE_TYPE_CHILD_ALL.REQUEST, setStructureTypeChildAll),
        takeLatest(Actions.ASYNC_EMPLOYEE_CONVICTION.REQUEST, refreshEmployeeConviction),
        takeLatest(Actions.ASYNC_EMPLOYEE_PSYCHO_INFO.REQUEST, refreshEmployeePsychoInfo),
        takeLatest(Actions.ASYNC_EMPLOYEE_NARCO_INFO.REQUEST, refreshEmployeeNarcoInfo),
        takeLatest(Actions.ASYNC_EMPLOYEE_CV.REQUEST, refreshEmployeeCv),
        takeLatest(Actions.ASYNC_WORK_REFERENCE.REQUEST, refreshWorkReference),
        takeLatest(Actions.SET_STRUCTURE_HIERARCHY_AS_TEMPLATE.REQUEST, setStructurehierarchyAsTemplate),
        takeLatest(
            Actions.BUSINESS_PROCESS_CREATE.REQUEST,
            businessProcessCreate
        ),
        takeLatest(
            Actions.BUSINESS_PROCESS_UPDATE.REQUEST,
            businessProcessUpdate
        ),
        takeLatest(
            Actions.BUSINESS_PROCESS_DELETE.REQUEST,
            businessProcessDelete
        ),
        takeLatest(
            Actions.DOCUMENT_SIGN_PROCESS.REQUEST,
            documentSignProcess
        ),
        takeLatest(
            Actions.DOCUMENT_SIGN_WITH_EIMZO_PROCESS.REQUEST,
            documentSignWithEimzoProcess
        ),
        takeLatest(
            Actions.VACANCY_PROCESS_START.REQUEST,
            vacancyProcessStart
        ),
        takeLatest(
            Actions.POST_UPDATE_STRUCTURE.REQUEST,
            postUpdateStructure
        ),
        takeLatest(
            Actions.VACATION_GRAPHIC_START.REQUEST,
            vacationGraphicProcessStart
        ),
        takeLatest(
            Actions.SET_EXCEPTION_DAY.REQUEST,
            setExceptionDay
        ),
        takeLatest(
            Actions.UPDATE_EXCEPTION_DAY.REQUEST,
            updateExceptionDay
        ),
        takeLatest(
            Actions.DELETE_EXCEPTION_DAY.REQUEST,
            deleteExceptionDay
        ),
        takeLatest(
            Actions.CREATE_AND_START_NEW_PROCESS.REQUEST,
            createAndStartNewProcess
        ),
        takeLatest(
            Actions.GENERATE_DOCS.REQUEST,
            generateDocs
        ),
        takeLatest(
            Actions.UPLOAD_EMPLOYEE_FILE.REQUEST,
            uploadEmployeeFiles
        ),

        takeLatest(
            Actions.UPLOAD_CANDIDATE_FILE.REQUEST,
            uploadCandidateFiles
        ),

    ]);
}
