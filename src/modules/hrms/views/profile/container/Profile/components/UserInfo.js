import React from "react";
import { get } from "lodash";
import { withTranslation } from "react-i18next";

const UserInfo = ({ t, user }) => {
  return (
    <>
      <ul className="list-unstyled">
        {/* Name */}
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("Name")}
            </strong>
            <span className="align-top">{get(user, "name", "")}</span>
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
            <span className="align-top">{get(user, "pinid")}</span>
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
            <span className="align-top">{get(user, "tinid")}</span>
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
              {get(user, "employeesPassport.birthDate")}
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
              {get(user, "employeesPassport.birthCountry.title")}
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
              {get(user, "employeesPassport.docSeries")}
              {get(user, "employeesPassport.docNumber")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>

        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" nationalityName")}
            </strong>
            <span className="align-top">
              {get(user, "employeesPassport.nationality.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t(" birthCountry")}
            </strong>
            <span className="align-top">
              {get(user, "employeesPassport.birthCountry.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("gender")}
            </strong>
            <span className="align-top">
              {get(user, "employeesPassport.gender")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>

        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("docIssueDate")}
            </strong>
            <span className="align-top">
              {get(user, "employeesPassport.docIssueDate")}
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
              {get(user, "employeesPassport.docExpireDate")}
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
              {get(user, "employeesPassport.docIssuePlace")}
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
              {get(user, "employeesPassport.nationality.id")}
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
              {get(user, "employeesPassport.citizenshipCountry.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
          <div className="g-pr-10">
            <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
              {t("residenceCountry")}
            </strong>
            <span className="align-top">
              {get(user, "employeesAddressRegistration.country.title")}
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
              {get(user, "employeesAddressRegistration.region.title")}
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
              {get(user, "employeesAddressRegistration.district.title")}
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
              {get(user, "employeesAddressRegistration.address")}
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
              {get(user, "employeesAddressRegistration.country.title")}
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
              {get(user, "employeesAddressRegistration.district.title")}
            </span>
          </div>
          <span>
            <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
          </span>
        </li>
      </ul>
    </>
  );
};

export default withTranslation("HRMS")(UserInfo);
