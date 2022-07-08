import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {get} from "lodash";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import Loader from "../../../../../components/Loader";
import Action from "../../../Actions";
import EmployeeEducation from "../../employeeInformation/containers/EmployeeEducation";
import EducationScheme from "../../../../../schema/Education";

function EmployeeRequestsEducationPage() {
    const [isLoading, setLoading] = useState(false);
    const {id,requestAbleId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const isFetchedAll = useSelector((state) =>
        get(state, "normalizer.data.education.isFetched", false)
    );

    const getEmployeeEducation = () => {

        const storeNameTrigger = "education";
        const entityNameTrigger = "education";
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeNameTrigger,
                entityNameTrigger
            }
        });

        const storeName = "education";
        const entityName = "education";
        const scheme = [EducationScheme];
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `education/user-educations/${requestAbleId}`,
                scheme,
                storeName,
                entityName
            }
        });
    };

    const saveFinished = (userId,data) => {
        confirmAlert({
            title: "Сохранить информацию",
            message: "Вы уверены?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        dispatch({
                            type: Action.EMPLOYEE_REQUEST_CONFIRM.REQUEST,
                            payload: {
                                id,
                                cb: {
                                    success: (nData, data) => {
                                        toast.dismiss();
                                        toast.success("Успешно", {
                                            position: "top-right",
                                            autoClose: 1000
                                        });
                                        setTimeout(() => {
                                            history.push("/employee-requests");
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
                    }
                },
                {
                    label: "No",
                    onClick: () => {

                    }
                }
            ]
        });

    };


    const create = (userid,attributes) => {
        setLoading("create");
        dispatch({
            type: Action.EDUCATION_CREATE_BY_USER.REQUEST,
            payload: {
                id:userid,
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
        getEmployeeEducation();
    },[]);

    if (!isFetchedAll) {
        return <Loader />;
    }
    return (
        <EmployeeEducation
            userId={requestAbleId}
            create={create}
            isLoading={isLoading}
            setLoading={setLoading}
            saveFinished={saveFinished}
        />
    );
}

export default EmployeeRequestsEducationPage;
