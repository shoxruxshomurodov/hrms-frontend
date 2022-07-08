import React, {useEffect} from 'react';
import EmployeeInfo from "../../containers/EmployeeInfo";
import Actions from "../../../../Actions";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../../../services/api/Actions";
import {useHistory} from "react-router-dom";
import EmployeeRegistrationProfileScheme from "../../../../../../schema/EmployeeRegistrationProfile";
import {get} from "lodash";
import Loader from "../../../../../../components/Loader";
import EmployeesScheme from "../../../../../../schema/Employees";


function EmployeeInfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetched = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.isFetched", false)
  );

  const saveFinished = (id,data) => {
    dispatch({
      type: Actions.EMPLOYEE_INFORMATION_REQUEST.REQUEST,
      payload: {
        id,
        data,
        cb: {
          success: (nData, data) => {
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000
            });
            setTimeout(() => {
              history.push("work-history");
            }, 1500);
          },
          fail: (e) => {
            toast.dismiss();
            toast.error("Ошибка", {
              position: "top-right",
              autoClose: 1000
            });
          }
        }
      }
    });
  };
  const employeeInformationData = () => {
    const storeName = "get-employee-information-view-data";
    const entityName = "employees";
    const scheme = EmployeesScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/employees/current-user-employee`,
        scheme,
        storeName,
        entityName
      }
    });
  };

  useEffect(() => {
    employeeInformationData();
  },[]);

  if (!isFetched) {
    return <Loader />;
  }

  return (
      <EmployeeInfo saveFinished={saveFinished}/>
  );
}

export default EmployeeInfoPage;
