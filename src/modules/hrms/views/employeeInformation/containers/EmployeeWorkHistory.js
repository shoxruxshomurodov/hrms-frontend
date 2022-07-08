import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import TableBase from "../../../../../components/Table/TableBase";
import { get, isEqual, isNil } from "lodash";
import Process from "../../employeeInformation/component/Process/Process";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Loader from "../../../../../components/Loader";
import LoaderMini from "../../../../../components/Loader/LoaderMini";
import Normalizer from "../../../../../services/normalizer";
import EmployeesScheme from "../../../../../schema/Employees";
const EmployeeWorkHistory = (props) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const resultUserId = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.result", null)
  );
  const isFetched = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.isFetched", false)
  );
  const entities = useSelector((state) =>
      get(state, "normalizer.entities", {})
  );

  const employee = Normalizer.Denormalize(resultUserId, EmployeesScheme, entities);
  const current = get(employee,'employeesCurrentPosition');
  const history =  get(employee,'employeesPositionHistories',[]);



  if (!isFetched) {
    return <Loader />;
  }
  return (
    <div className="container-semiboxed">
      <Process process={2} />
      <div className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30">
        <Formik
          initialValues={{
            structureName: get(current, "structureName"),
            positionName: get(current, "positionName")
          }}
          onSubmit={(values, actions) => {
            const { saveFinished } = props;
            const data ={ current: { ...current, ...values }, history };
            saveFinished(resultUserId,data);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group row g-mb-25">
                <label
                  className="col-2 col-form-label text-right"
                  htmlFor={"F.I.O"}
                >
                  Подразделение
                </label>
                <div className="col-4">
                  <input
                    className="form-control rounded-0 form-control-md"
                    type="text"
                    name="structureName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.structureName}
                    autoFocus={true}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="form-group row g-mb-25">
                <label className="col-2 col-form-label text-right">
                  Должность{" "}
                </label>
                <div className="col-4">
                  <input
                    className="form-control rounded-0 form-control-md"
                    type="text"
                    name="positionName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.positionName}
                    disabled={true}
                    autoFocus={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TableBase
                    head={[
                      "№",
                      "Название компании",
                      "Адрес компании",
                      "Полное название подразделения",
                      "Должность"
                    ]}
                    hideIcon={true}
                  >
                    {!isNil(history) &&
                      history.map((r, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{get(r, "companyName")}</td>
                            <td>{get(r, "companyAddress")}</td>
                            <td>{get(r, "structureName")}</td>
                            <td>{get(r, "positionName")}</td>
                          </tr>
                        );
                      })}
                  </TableBase>
                </div>
              </div>
              <div className="text-sm-right g-mt-25">
                <button
                  type="submit"
                  className="btn btn-md u-btn-darkgray rounded-0 g-py-12 g-px-25 btn-block"
                >
                  {isEqual(isLoading, "Loading") ? (
                    <LoaderMini />
                  ) : (
                    "  Save and Next"
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeWorkHistory;
