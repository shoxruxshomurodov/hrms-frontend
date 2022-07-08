import React, {useEffect, useState} from 'react';
import EmployeeRelation from "../containers/EmployeeRelation";
import Actions from "../../../Actions";
import {useDispatch, useSelector} from "react-redux";
import {get} from "lodash";
import RelativesScheme from "../../../../../schema/Relatives";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
function EmployeeRelationPage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const {id} = props;

  const getRelatives = () => {
    const storeName = "relatives";
    const entityName = "relatives";
    const scheme = [RelativesScheme];
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `employees-relatives/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };

  const create = (userid,attributes) => {
    setIsFetched("create");
    dispatch({
      type: Actions.EMPLOYEE_RELATION_CREATE.REQUEST,
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
  // useEffect(() => {
  //   getRelatives();
  // },[]);

  // if (!isFetchedAll) {
  //   return <Loader />;
  // }
  return (
    <EmployeeRelation
      userId={id}
      create={create}
      isFetched={isFetched}
      setIsFetched={setIsFetched}
    />
  );
}

export default EmployeeRelationPage;
