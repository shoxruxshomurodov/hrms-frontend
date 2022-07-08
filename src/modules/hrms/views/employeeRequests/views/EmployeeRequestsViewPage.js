import React, {useEffect} from "react";
import Actions from "../../../Actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {useParams} from 'react-router-dom';
import ApiActions from "../../../../../services/api/Actions";
import EmployeeInfo from "../../employeeInformation/containers/EmployeeInfo";
import EmployeeRegistrationProfileScheme from "../../../../../schema/EmployeeRegistrationProfile";
import Loader from "../../../../../components/Loader";
import {get} from "lodash";

function EmployeeRequestsViewPage(props) {
    const {id,requestAbleId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const isFetched = useSelector((state) =>
        get(state, "normalizer.data.get-employee-information-view-data.isFetched", false)
    );
    const employeeInformationData = (id) => {
        const storeName = "get-employee-information-view-data";
        const entityName = "employeeRegistrationProfile";
        const scheme = EmployeeRegistrationProfileScheme;
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `requests/request-employee-data/${id}`,
                scheme,
                storeName,
                entityName
            }
        });
    };

    const saveFinished = (userId,data) => {
        dispatch({
            type: Actions.EMPLOYEE_INFORMATION_REQUEST.REQUEST,
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
                            history.push("/employee-requests/view/"+id+'/'+requestAbleId+'/work-history');
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
        employeeInformationData(id);
    },[]);

    if (!isFetched) {
        return <Loader />;
    }
    return (
        <EmployeeInfo saveFinished={saveFinished} />
    );
}

export default EmployeeRequestsViewPage;
