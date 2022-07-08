import React, { useState } from "react";
import { get, isNil } from "lodash";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import TableBase from "../../../../../../../components/Table/TableBase";
import Actions from "../../../../../Actions";
import { toast } from "react-toastify";
import ContentLoader from "../../../../../../../components/Loader/ContentLoader";

const RelationInfo = ({
  t,
  relatives = [],
  id = null,
  asyncEmployeeRelatives,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const refreshServices = () => {
    setLoading(true);
    asyncEmployeeRelatives({
      id,
      cb: {
        success: (nData, data) => {
          toast.dismiss();
          toast.success("Успешно", {
            position: "top-right",
            autoClose: 1000,
          });
          setLoading(false);
        },
        fail: (e) => {
          setLoading(false);
          toast.dismiss();
          toast.error("Ошибка", {
            position: "top-right",
            autoClose: 1000,
          });
        },
      },
    });
  };
  return (
    <>
      {!loading ? (
        <>
          <h2 className="h4 g-font-weight-300">
            Manage your Name, ID and Email Addresses
          </h2>
          <p>
            Below are name, email addresse, contacts and more on file for your
            account.
          </p>
          {!isNil(relatives) ? (
            <TableBase
              head={["ID", "Relation", "Full Name", "Address", "Work Place"]}
            >
              {relatives &&
                relatives.map((relative) => {
                  return (
                    <tr
                      key={relative.id}
                      style={{ verticalAlign: "middle" }}
                      className="mode-dark"
                    >
                      <td>{get(relative, "id", "")}</td>
                      <td>{get(relative, "relationship", "")}</td>
                      <td>
                        {get(relative, "firstName", "")}{" "}
                        {get(relative, "lastName", "")}{" "}
                        {get(relative, "middleName", "")}
                      </td>
                      <td>{get(relative, "address", "")}</td>
                      <td>{get(relative, "workplace", "")}</td>
                    </tr>
                  );
                })}
            </TableBase>
          ) : (
            <p className={"text-center"}>No Data</p>
          )}

          <div className={"text-sm-right"}>
            <button
              onClick={refreshServices}
              className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}
            >
              {t("Refresh")}
            </button>
            {/*<button className={'btn u-btn-primary rounded-0 g-py-12 g-px-25'}>Print to PDF</button>*/}
          </div>
        </>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    asyncEmployeeRelatives: ({ id, cb }) =>
      dispatch({
        type: Actions.ASYNC_EMPLOYEE_RELATIVES.REQUEST,
        payload: { id, cb },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("HRMS")(RelationInfo));
