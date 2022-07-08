import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {get} from "lodash";
import EmployeeRegistrationProfileScheme from "../../../../../schema/EmployeeRegistrationProfile";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import {useParams} from 'react-router';
import Loader from "../../../../../components/Loader";
import EmployeeInfo from "../../employeeInformation/containers/EmployeeInfo";
import EmployeeWorkHistory from "../../employeeInformation/containers/EmployeeWorkHistory";
import Actions from "../../../Actions";
import EmployeePositionHistoryProfileScheme from "../../../../../schema/EmployeePositionHistoryProfile";
function EmployeeRequestsWorkHistoryPage() {
    const {id,requestAbleId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const isFetched = useSelector((state) =>
        get(state, "normalizer.data.get-employee-position-history-view-data.isFetched", false)
    );
    const getEmployeePositionProfileInfo = (id) => {
        const storeName = "get-employee-position-history-view-data";
        const entityName = "employeePositionHistoryProfile";
        const scheme = EmployeePositionHistoryProfileScheme;
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `requests/request-employee-position-profile-info-get/${id}`,
                scheme,
                storeName,
                entityName
            }
        });
    };

    const saveFinished = (userId,data) => {
        dispatch({
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
                            history.push("/employee-requests/view/"+id+"/"+requestAbleId+"/relation");
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
    useEffect(() => {
        getEmployeePositionProfileInfo(id);
    },[]);

    if (!isFetched) {
        return <Loader />;
    }
    return (
        <EmployeeWorkHistory saveFinished={saveFinished} />
    );
}

export default EmployeeRequestsWorkHistoryPage;
