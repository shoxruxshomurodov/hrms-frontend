import React, {useEffect, useState} from 'react';
import EmployeeEducation from "../../containers/EmployeeEducation";
import Actions from "../../../../Actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory,useParams} from "react-router-dom";
import {get} from "lodash";
import ApiActions from "../../../../../../services/api/Actions";
import EducationScheme from "../../../../../../schema/Education";
import {toast} from "react-toastify";
import Action from "../../../../Actions";
import Loader from "../../../../../../components/Loader";
import EmployeeEducationsScheme from "../../../../../../schema/EmployeeEducations";
import EmployeesScheme from "../../../../../../schema/Employees";
function EmployeeEducationPage() {
  const [isLoading, setLoading] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) =>
      get(state, "authCheck.user.id", null)
  );
  const isFetchedAll = useSelector((state) =>
      get(state, "normalizer.data.employeeEducations.isFetched", false)
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

  const getEmployeeEducation = () => {
    const storeNameTrigger = "employeeEducations";
    const entityNameTrigger = "employeeEducations";
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeNameTrigger,
        entityNameTrigger
      }
    });

    const storeName = "employeeEducations";
    const entityName = "employeeEducations";
    const scheme = [EmployeeEducationsScheme];
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `employees-education/current-employee-educations`,
        scheme,
        storeName,
        entityName
      }
    });
  };

  const saveFinished = (userId,data) => {
    toast.dismiss();
    toast.success("Успешно", {
      position: "top-right",
      autoClose: 1000
    });
    setTimeout(() => {
      history.push("/employee/photo");
    }, 1500);
  };


  const create = (employeeId,attributes) => {
    setLoading("create");
    attributes = {employeeId,...attributes};
    dispatch({
      type: Action.EMPLOYEE_EDUCATION_CREATE.REQUEST,
      payload: {
        attributes,
        cb: {
          success: (nData, data) => {
            setLoading(false);
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
            setLoading(false);
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

  useEffect(() => {
    getEmployeePositionProfileInfo();
    getEmployeeEducation();
  },[]);

  if (!isFetchedAll) {
    return <Loader />;
  }
  return (
      <EmployeeEducation
          userId={userId}
          create={create}
          isLoading={isLoading}
          setLoading={setLoading}
          saveFinished={saveFinished}
      />
  );
}
export default EmployeeEducationPage;
