import React, { useState } from "react";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
import Actions from "../../../../../Actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ContentLoader from "../../../../../../../components/Loader/ContentLoader";

const AddressInfo = ({ t, user }) => {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  function refreshServices() {
    setIsFetched(true);
    const attributes = {
      employeeId: get(user, "id"),
      service: "ADDRESS_REGISTRATION",
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
            toast.error("Ошибка", {
              position: "top-right",
              autoClose: 1000,
            });
          },
        },
      },
    });
  }

  const address = get(user, "employeesAddressRegistration");
  const attributes = [
    { label: t("address"), value: get(address, "address") },
    { label: t("cadastre"), value: get(address, "cadastre") },
    { label: t("registrationDate"), value: get(address, "registrationDate") },
    { label: t("country"), value: get(address, "country.title") },
    { label: t("region"), value: get(address, "region.title") },
    { label: t("district"), value: get(address, "district.title") },
  ];
  return (
    <>
      {!isFetched ? (
        <div>
          <h2 className="h4 g-font-weight-300">
            Manage your Name, ID and Email Addresses
          </h2>
          <p>
            Below are name, email addresse, contacts and more on file for your
            account.
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
              className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}
            >
              {t("Refresh")}
            </button>
            {/*<button className={'btn u-btn-primary rounded-0 g-py-12 g-px-25'}>Print to PDF</button>*/}
          </div>
        </div>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

export default withTranslation("HRMS")(AddressInfo);
