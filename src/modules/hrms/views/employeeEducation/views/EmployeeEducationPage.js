import React, {useState} from 'react';
import EmployeeEducation from "../containers/EmployeeEducation";
import {useDispatch} from "react-redux";
import Actions from "../../../Actions"
import {toast} from "react-toastify"
function EmployeeEducationPage(props) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let {id:employeeId} = props;
  const create = (attributes) => {
    attributes = {employeeId,...attributes}
    setLoading("create");
    dispatch({
      type: Actions.EMPLOYEE_EDUCATION_CREATE.REQUEST,
      payload: {
        attributes,
        cb: {
          success: () => {
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
  return (
    <EmployeeEducation
      id={employeeId}
      create={create}
      isLoading={isLoading}
      setLoading={setLoading}
    />
  );
}

export default EmployeeEducationPage;
