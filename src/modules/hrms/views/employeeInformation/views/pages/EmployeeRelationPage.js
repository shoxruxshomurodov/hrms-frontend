import React, {useEffect, useState} from 'react';
import EmployeeRelation from "../../containers/EmployeeRelation";
import Actions from "../../../../Actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {get} from "lodash";
import RelativesScheme from "../../../../../../schema/Relatives";
import ApiActions from "../../../../../../services/api/Actions";
import {toast} from "react-toastify";
import Loader from "../../../../../../components/Loader";
import EmployeesScheme from "../../../../../../schema/Employees";
import EmployeeRelativesScheme from "../../../../../../schema/EmployeeRelatives";
function EmployeeRelationPage() {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) =>
      get(state, "authCheck.user.id", null)
  );
  const isFetchedAll = useSelector((state) =>
      get(state, "normalizer.data.employeeRelatives.isFetched", false)
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

  const getRelatives = () => {
    const storeName = "employeeRelatives";
    const entityName = "employeeRelatives";
    const scheme = [EmployeeRelativesScheme];
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `employees-relatives/current-employee-relatives`,
        scheme,
        storeName,
        entityName
      }
    });
  };

  const saveFinished = (userId,data) => {
    dispatch({
      type: Actions.RELATIVES_UPDATE.REQUEST,
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
    });
  };
  const create = (userid,attributes) => {
    setIsFetched("create");
    dispatch({
      type: Actions.EMPLOYEE_RELATIVES_CREATE.REQUEST,
      payload: {
        id:userid,
        attributes,
        cb: {
          success: (nData, data) => {
            setIsFetched(false);
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          fail: (e) => {
            setIsFetched(false);
            toast.dismiss();
            toast.error(get(e, "response.data.message"), {
              position: "top-right",
              autoClose: 1000
            });
          }
        }
      }
    });
  };
  useEffect(() => {

    getEmployeePositionProfileInfo();
    getRelatives();
  },[]);

  if (!isFetchedAll) {
    return <Loader />;
  }
  return (
      <EmployeeRelation
          userId={userId}
          create={create}
          isFetched={isFetched}
          setIsFetched={setIsFetched}
          saveFinished={saveFinished}
      />
  );
}

export default EmployeeRelationPage;
