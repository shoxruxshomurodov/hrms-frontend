import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
import Actions from "../../../../../Actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Tabs from "../../../../../../../components/Tabs";
import AddressInfo from "./AddressInfo";
import ContentLoader from "../../../../../../../components/Loader/ContentLoader";
import EmployeesScheme from "../../../../../../../schema/Employees";
import ApiActions from "../../../../../../../services/api/Actions";
import { useSelector } from "react-redux";
import Normalizer from "../../../../../../../services/normalizer";

const PassportInfo = ({ t, user }) => {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const refreshServices = () => {
    setIsFetched(true);
    const attributes = {
      employeeId: get(user, "id"),
      service: "PASSPORT",
    };
    dispatch({
      type: Actions.EMPLOYEE_REFRESH_SERVICES_DATA.REQUEST,
      payload: {
        attributes,
        cb: {
          success: (nData, data) => {
            setIsFetched(false);
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000,
            });
            setIsFetched(false);
          },
          fail: (e) => {
            setIsFetched(false);
            toast.dismiss();
            toast.error(e.response.data.message, {
              position: "top-right",
              autoClose: 3000,
            });
          },
        },
      },
    });
  };

  const passport = get(user, "employeesPassport");
  const attributes = [
    { label: t("Name"), value: get(passport, "fullNameInter") },
    { label: t("Pinfl"), value: get(passport, "pinfl") },
    {
      label: t("passport"),
      value: get(passport, "docSeries") + get(passport, "docNumber"),
    },
    { label: t("birthDate"), value: get(passport, "birthDate") },
    { label: t("birthCountry"), value: get(passport, "birthCountry.title") },
    { label: t("birthPlace"), value: get(passport, "birthPlace") },
    { label: t("gender"), value: get(passport, "gender") },
    { label: t("docIssueDate"), value: get(passport, "docIssueDate") },
    { label: t("docExpireDate"), value: get(passport, "docExpireDate") },
    { label: t("nationality"), value: get(passport, "nationality.title") },
    { label: t("docIssuePlace"), value: get(passport, "docIssuePlace") },
    { label: t("firstName"), value: get(passport, "firstName") },
    { label: t("lastName"), value: get(passport, "lastName") },
    { label: t("middleName"), value: get(passport, "middleName") },
  ];
  return (
    <>
      <div>
        <div className="row">
          <div className="col col-12">
            <Tabs
              titles={[t("Passport Info"), t("Address Info")]}
              texts={[
                <>
                  {!isFetched ? (
                    <>
                      <h2 className="h4 g-font-weight-300">
                        Manage your Name, ID and Email Addresses
                      </h2>
                      <p>
                        Below are name, email addresse, contacts and more on
                        file for your account.
                      </p>
                      <ul className="list-unstyled g-mb-30">
                        {attributes.map((item, index) => {
                          return (
                            <li
                              key={index + 1}
                              className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15"
                            >
                              <div className="g-pr-10">
                                <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">
                                  {item.label}
                                </strong>
                                <span className="align-top">{item.value}</span>
                              </div>
                              <span>
                                <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1" />
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className={"text-sm-right"}>
                        <button
                          onClick={refreshServices}
                          className={
                            "btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"
                          }
                        >
                          {t("Refresh")}
                        </button>
                        {/*<button className={'btn u-btn-primary rounded-0 g-py-12 g-px-25'}>Print to PDF</button>*/}
                      </div>
                    </>
                  ) : (
                    <ContentLoader />
                  )}
                </>,
                <AddressInfo user={user} />,
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation("HRMS")(PassportInfo);
