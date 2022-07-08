import React, {memo, useEffect, useState} from 'react';
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ApiActions from "../../../../../services/api/Actions";
import DatePicker from "react-datepicker";
import {get} from "lodash";
import moment from "moment";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import CalendarModal from "../components/CalendarModal";
import Actions from "../../../Actions";

const Styled = styled.div`
  .holiday-box {
    display: inline-flex;
    align-items: center;
    margin-top: 10px;

    &.green {
      .box_item {
        background-color: #72c02c;
      }
    }

    .box_item {
      width: 25px;
      height: 25px;
      display: inline-block;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      background-color: #dd4b39;
      margin-right: 5px;
    }
  }
`;

const ListContainer = ({t, match: {params: {encoded}}, getExceptionWorkDays, exceptionWorkDays,setExceptionWorkDay,getExceptionDay,exceptionWorkDay,updateExceptionWorkDay,deleteExceptionDay, ...rest}) => {
    const [startDate, setStartDate] = useState(null);
    const [show, setShow] = useState(false);
    const highlightWithRanges = [
        {
            "react-datepicker__day--highlighted-additional-day": [
                ...get(exceptionWorkDays, 'additionalDays', []).map(day => moment(day).toDate())
            ],
        },
        {
            "react-datepicker__day--highlighted-holiday": [
                ...get(exceptionWorkDays, 'holidays', []).map(day => moment(day).toDate())
            ],
        },
    ];

    useEffect(() => {
        getExceptionWorkDays();
    }, [])

    useEffect(() => {
        if (startDate) {
            getExceptionDay(moment(startDate).format("YYYY-MM-DD"));
            setShow(true);
        }
    }, [startDate])

    return (
        <Styled>
            <div className={'g-pa-20 dark-theme'}>
                <div className="row mb-3 align-items-center">
                    <div className="col-4">
                        <h1 className="g-font-weight-300 g-font-size-28 g-color-black g-mb-10 g-mt-10">{t("Exception work days and holidays")}</h1>
                    </div>
                    <div className="col-6">
                        <div className="holiday-box">
                            <span className={'box_item'}></span> - {t("Holiday")}
                        </div>
                        <div className="holiday-box ml-5 green">
                            <span className={'box_item'}></span> - {t("Work day")}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <DatePicker
                            highlightDates={highlightWithRanges}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            inline
                            monthsShown={10}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {get(exceptionWorkDay,'isFetched',false) && show && <CalendarModal deleteExceptionDay={deleteExceptionDay} updateExceptionWorkDay={updateExceptionWorkDay} type={get(exceptionWorkDay,'result',{})} getExceptionWorkDays={getExceptionWorkDays} openClose={setShow} setStartDate={setStartDate} setShow={setShow}  defaultValue={startDate} setExceptionWorkDay={setExceptionWorkDay}/>}
                    </div>
                </div>
            </div>
        </Styled>
    );
};

const mapStateToProps = (state) => {
    return {
        exceptionWorkDays: get(state, 'apiReducer.data.exception-work-days.result', {}),
        exceptionWorkDay: get(state, 'apiReducer.data.exception-work-day', {}),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getExceptionWorkDays: () => {
            const storeName = "exception-work-days";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `exception-work-days/separate-days`,
                    storeName,
                    config: {},
                },
            });
        },
        getExceptionDay: (day) => {
            const storeName = "exception-work-day";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `exception-work-days/${day}`,
                    storeName,
                    config: {},
                },
            });
        },
        setExceptionWorkDay: ({attributes, cb}) => {
            dispatch({
                type: Actions.SET_EXCEPTION_DAY.REQUEST,
                payload: {
                    attributes,
                    cb
                },
            });
        },
        updateExceptionWorkDay: ({exception_day,attributes, cb}) => {
            dispatch({
                type: Actions.UPDATE_EXCEPTION_DAY.REQUEST,
                payload: {
                    exception_day,
                    attributes,
                    cb
                },
            });
        },
        deleteExceptionDay: ({exception_day, cb}) => {
            dispatch({
                type: Actions.DELETE_EXCEPTION_DAY.REQUEST,
                payload: {
                    exception_day,
                    cb
                },
            });
        }
    }
}

export default withTranslation("HRMS")(withRouter(connect(mapStateToProps, mapDispatchToProps)(memo(ListContainer))));
