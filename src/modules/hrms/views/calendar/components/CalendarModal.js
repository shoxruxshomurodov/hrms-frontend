import React, {useState} from 'react';
import {connect} from "react-redux";
import Actions from "../../../Actions";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import {withTranslation} from "react-i18next";
import moment from "moment";
import {get, isEmpty} from "lodash";

const CalendarModal = ({
                           t,
                           openClose = () => {
                           },
                           defaultValue = null,
                           setExceptionWorkDay,
                           getExceptionWorkDays,
                           setShow,
                           setStartDate,
                           type = {},
                           updateExceptionWorkDay,
                           deleteExceptionDay
                       }) => {
    const [loading, setLoading] = useState(false);
    console.log('type', type)
    const create = (attributes) => {
        setLoading(true);
        if (isEmpty(type)) {
            setExceptionWorkDay({
                attributes: {...attributes, exceptionDate: moment(defaultValue).format("YYYY-MM-DD")}, cb: {
                    success: () => {
                        openClose(false);
                        getExceptionWorkDays();
                        setShow(false);
                        setStartDate(null);
                    },
                    fail: () => {

                    }
                }
            });
        } else {
            updateExceptionWorkDay({
                exception_day: get(type, 'exceptionDate'),
                attributes: {...attributes}, cb: {
                    success: () => {
                        openClose(false);
                        getExceptionWorkDays();
                        setShow(false);
                        setStartDate(null);
                    },
                    fail: () => {

                    }
                }
            });
        }
    };


    const values = [
        {
            id: 1,
            label: t("Day"),
            name: "exceptionDate",
            type: "input",
            defaultValue: moment(defaultValue).format("YYYY-MM-DD"),
            params: {required: true, disabled: true, value: moment(defaultValue).format("YYYY-MM-DD")},
        },
        {
            id: 1,
            label: t("Type"),
            name: "type",
            type: "select",
            defaultValue: {
                value: get(type, 'type'),
                label: get(type, 'type', "").split("_").join(" ")
            },
            options: [{value: 'ADDITIONAL_DAYS', label: 'ADDITIONAL DAYS'}, {value: 'HOLIDAYS', label: 'HOLIDAYS'}],
            params: {required: true},
        },
    ];

    if (loading) {
        // return <Loader/>;
    }

    return (
        <div
            className="custombox-overlay custombox-fadein custombox-open"
            style={{backgroundColor: "#00000078", opacity: 1}}
        >
            <div
                className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
                style={{animationDuration: "300ms", animationDelay: "150ms"}}
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        openClose(false);
                    }
                }
                }
            >
                <div
                    id="modal1"
                    className="text-left g-bg-white  g-pa-20"
                    style={{display: "block", width: 800, minHeight: "400px"}}
                >
                    <h1>{t("Set holiday or work day")}</h1>
                    <CreateForm
                        formRequest={create}
                        values={values}
                        CustomButton={isEmpty(type) ? CustomButton : () => <div className={'row'}>
                            <div className="col-6 offset-2">
                                <div className="d-flex">
                                    <button type="submit"
                                            className="btn btn-md u-btn-primary rounded-0 g-width-170">{t("Update")}
                                    </button>
                                    <button type="button" onClick={() => {
                                        deleteExceptionDay({
                                            exception_day: get(type, 'exceptionDate'),
                                            cb: {
                                                success: () => {
                                                    openClose(false);
                                                    getExceptionWorkDays();
                                                    setShow(false);
                                                    setStartDate(null);
                                                },
                                                fail: () => {
                                                    alert('ERROR')
                                                    openClose(false);
                                                }
                                            }
                                        })
                                    }}
                                            className="btn btn-md  u-btn-danger g-width-170  ml-2 rounded-0"><span
                                        className="ml-2">{t("Delete")}</span></button>
                                </div>
                            </div>
                        </div>}
                        cancelLink={null}
                        buttonText={"Create"}
                        params={{required: false}}
                        property={{disabled: false}}
                    />
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        setExceptionDay: ({attributes, cb}) => {
            dispatch({type: Actions.SET_EXCEPTION_DAY.REQUEST, payload: {attributes, cb}})
        }
    }
}

export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(CalendarModal));
