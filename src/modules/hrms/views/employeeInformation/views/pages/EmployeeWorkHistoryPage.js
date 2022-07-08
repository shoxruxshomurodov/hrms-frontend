import React, {useEffect} from 'react';
import EmployeeWorkHistory from "../../containers/EmployeeWorkHistory";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {get} from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import Loader from "../../../../../../components/Loader";
import EmployeesScheme from "../../../../../../schema/Employees";

function EmployeeWorkHistoryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetched = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.isFetched", false)
  );
  const getEmployeePositionProfileInfo = () => {
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

  const saveFinished = (userId,data) => {
    history.push("relation");
    /*dispatch({
      type: Actions.EMPLOYEE_POSITION_PROFILE_INFO_SET.REQUEST,
      payload: {
        id:userId,
        data,
        cb: {
          success: (nData, data) => {
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000
            });
            setTimeout(() => {
              history.push("relation");
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
    });*/
  };
  useEffect(() => {
    getEmployeePositionProfileInfo();
  },[]);

  if (!isFetched) {
    return <Loader />;
  }
  return (
      <>
        <EmployeeWorkHistory saveFinished={saveFinished} />
      </>
  );
}
export default EmployeeWorkHistoryPage;
