import React, {useEffect, useState} from 'react';
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
import EmployeeRelation from "../../employeeInformation/containers/EmployeeRelation";
import RelativesScheme from "../../../../../schema/Relatives";
import Normalizer from "../../../../../services/normalizer";
import RequestsScheme from "../../../../../schema/Requests";
function EmployeeRequestsRelationsPage() {
    const [isFetched, setIsFetched] = useState(false);
    const {id,requestAbleId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const isFetchedAll = useSelector((state) =>
        get(state, "normalizer.data.relatives.isFetched", false)
    );

    const getRelatives = () => {
        const storeName = "relatives";
        const entityName = "relatives";
        const scheme = [RelativesScheme];
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `requests/request-employee-relatives/${id}`,
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
                            history.push("/employee-requests/view/"+id+"/"+requestAbleId+"/education");
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
            type: Actions.RELATIVES_CREATE.REQUEST,
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
        getRelatives();
    },[]);

    if (!isFetchedAll) {
        return <Loader />;
    }
    return (
        <EmployeeRelation
            userId={requestAbleId}
            create={create}
            isFetched={isFetched}
            setIsFetched={setIsFetched}
            saveFinished={saveFinished}
        />
    );
}

export default EmployeeRequestsRelationsPage;
