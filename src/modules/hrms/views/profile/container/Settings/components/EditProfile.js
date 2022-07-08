import React, { useEffect } from "react";
import Utils from "../../../../../../../services/helpers/Utils";
import LoaderMini from "../../../../../../../components/Loader/LoaderMini";
import { get, isEqual } from "lodash";
import { withTranslation } from "react-i18next";
import EmployeesScheme from "../../../../../../../schema/Employees";
import ApiActions from "../../../../../../../services/api/Actions";
import { useDispatch, useSelector } from "react-redux";
import Normalizer from "../../../../../../../services/normalizer";
const EditProfile = ({
  t,
  syncFidoService,
  syncEmployeeData,
  syncRegistrationService,
  syncTaxTinService,
  isFetched,
  employee,
}) => {
  // const resultEmployeeId = useSelector((state) =>
  //   get(
  //     state,
  //     "normalizer.data.get-employee-information-view-data.result",
  //     null
  //   )
  // );
  // const isFetchedEmployee = useSelector((state) =>
  //   get(
  //     state,
  //     "normalizer.data.get-employee-information-view-data.isFetched",
  //     false
  //   )
  // );
  // const entities = useSelector((state) =>
  //   get(state, "normalizer.entities", {})
  // );
  // const employee = Normalizer.Denormalize(
  //   resultEmployeeId,
  //   EmployeesScheme,
  //   entities
  // );

  // const dispatch = useDispatch();
  // const getEmployeePositionProfileInfo = () => {
  //   const storeName = "get-employee-information-view-data";
  //   const entityName = "employees";
  //   const scheme = EmployeesScheme;
  //   dispatch({
  //     type: ApiActions.GET_ONE.REQUEST,
  //     payload: {
  //       url: `/employees/current-user-employee`,
  //       scheme,
  //       storeName,
  //       entityName,
  //     },
  //   });
  // };
  // useEffect(() => {
  //   getEmployeePositionProfileInfo();
  // }, []);
  return (
    <div
      className="tab-pane fade active show"
      id="nav-1-1-default-hor-left-underline--1"
      role="tabpanel"
      data-parent="#nav-1-1-default-hor-left-underline"
    >
      <h2 className="h4 g-font-weight-300">
        {t(" Manage your Name, ID and Email Addresses")}
      </h2>
      <p>
        {t(
          " Below are name, email addresse, contacts and more on file\n" +
            "                for your account."
        )}
      </p>
      <ul className="list-unstyled g-mb-30">
        {/* Name */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("Name")}
            </strong>
            <span className="align-top">{get(employee, "name", "")}</span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Name */}
        {/* Your ID */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" PNFL")}
            </strong>
            <span className="align-top">{get(employee, "pinid")}</span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Your ID */}
        {/* Company Name */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("Inn")}
            </strong>
            <span className="align-top">{get(employee, "tinid")}</span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Company Name */}
        {/* Position */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" birthDate")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.birthDate")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Position */}
        {/* Primary Email Address */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("birthPlace")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.birthCountry.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Primary Email Address */}
        {/* Linked Account */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" Password Serias")}
            </strong>
            <span className="align-top">
              {" "}
              {get(employee, "employeesPassport.docSeries")}-
              {get(employee, "employeesPassport.docNumber")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Linked Account */}
        {/* Website */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" nationalityName")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.nationality.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Website */}
        {/* Phone Number */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" birthCountry")}
            </strong>
            <span className="align-top">
              {" "}
              {get(employee, "employeesPassport.birthCountry.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Phone Number */}
        {/* Office Number */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("gender")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.gender")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Office Number */}
        {/* Address */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("docIssueDate")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.docIssueDate")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        {/* End Address */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("  docExpireDate")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.docExpireDate")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" docIssuePlace")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.docIssuePlace")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" nationalityId")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.nationality.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("citizenship")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesPassport.citizenshipCountry.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("  residenceCountry")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesAddressRegistration.country.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" residenceRegion")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesAddressRegistration.region.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" residenceDistrict")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesAddressRegistration.district.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("address")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesAddressRegistration.address")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("country")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesAddressRegistration.country.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("district")}
            </strong>
            <span className="align-top">
              {get(employee, "employeesAddressRegistration.district.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
      </ul>
      <div className="text-sm-right">
        {/*       <button
          className="btn u-btn-primary rounded-0 g-py-12 g-px-25"
          onClick={syncFidoService}
          disabled={isEqual(isFetched, "syncFidoService")}
        >
          {isEqual(isFetched, "syncFidoService") && <LoaderMini />}{" "}
          <span>{t("Получить паспортные личные данные")}</span>
        </button>*/}
        <button
          className="btn u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={syncEmployeeData}
          disabled={isEqual(isFetched, "syncEmployeeData")}
        >
          {isEqual(isFetched, "syncEmployeeData") && <LoaderMini />}{" "}
          <span>{t("Получить личные данные")}</span>
        </button>
        {/*      <button
          className="btn u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={syncTaxTinService}
          disabled={isEqual(isFetched, "syncTaxTinService")}
        >
          {isEqual(isFetched, "syncTaxTinService") && <LoaderMini />}{" "}
          <span>{t("Получить данные из налога")}</span>
        </button>*/}
        {/*        <button
          className="btn u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
          onClick={syncRegistrationService}
          disabled={isEqual(isFetched, "syncRegistrationService")}
        >
          {isEqual(isFetched, "syncRegistrationService") && <LoaderMini />}{" "}
          <span>{t("Получить данные прописки")}</span>
        </button>*/}
      </div>
    </div>
  );
};

export default withTranslation("HRMS")(EditProfile);
