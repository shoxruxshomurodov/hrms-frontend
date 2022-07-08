import React, {useEffect, memo} from 'react';
import {connect} from "react-redux";
import {entries, get, head, includes, isEqual, isNil, last, orderBy} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import classNames from "classnames";
import {withTranslation} from "react-i18next";


const StatusTimeline = ({
                            t,
                            getProcessStatusList,
                            statusList = {},
                            process = null,
                            currentStates = [],
                            ...rest
                        }) => {
    useEffect(() => {
        if (!isNil(process)) {
            getProcessStatusList(process);
        }
    }, [process])

    statusList = orderBy(entries(statusList).map(status => ({
        type: head(status),
        data: last(status),
        sort: get(last(status), 'sort')
    })), ['sort'], ['desc']);
    return (
        <>
            <ul className="row u-timeline-v2-wrap list-unstyled mt-5">
                {statusList &&
                    statusList.map((status, index) => {
                        return (
                            <li
                                key={index + 1}
                                className="col-md-12 g-mb-10"
                            >
                                <div className="row">
                                    <div className="col-md-3 text-md-right g-pt-20--md g-pr-40--md ">
                                        <h5 className="h6 g-font-weight-700 mb-0">
                                                     <span
                                                         className={'btn u-btn-primary g-rounded-50 '}> {t(get(status, "type"))}</span>
                                        </h5>
                                    </div>
                                    <div className="col-md-9 g-orientation-left g-pl-40--md">
                                        <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                                            <i className={classNames("d-block g-width-18 g-height-18   g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle ", {
                                                'g-bg-primary': includes(currentStates, get(status, "type")),
                                                'g-bg-white': !includes(currentStates, get(status, "type")),
                                                'g-bg-beige': isEqual(last(currentStates), get(status, "type")),
                                            })}/>
                                        </div>
                                        <article className="g-pos-rel g-bg-gray-light-v5 g-pa-15">
                                            <div
                                                className="g-hidden-sm-down u-triangle-inclusive-v1--right g-top-30 g-z-index-2">
                                                <div
                                                    className="u-triangle-inclusive-v1--right__back g-brd-gray-light-v5-right"/>
                                            </div>
                                            <div
                                                className="g-hidden-md-up u-triangle-inclusive-v1--top g-left-20 g-z-index-2">
                                                <div
                                                    className="u-triangle-inclusive-v1--top__back g-brd-gray-light-v5-bottom"/>
                                            </div>
                                            <header
                                                className="g-brd-bottom g-brd-gray-light-v4 g-pb-0 g-mb-10">
                                                <h4 className="g-font-weight-300">
                                                    {t(get(status, "data.name"))}
                                                </h4>
                                            </header>
                                            <p className="lead mb-0">
                                                {t(get(status, "data.description"))}
                                            </p>
                                        </article>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        statusList: get(state, 'apiReducer.data.process-status-list.result', {}),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProcessStatusList: (processName) => {
            const storeName = "process-status-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `data/getStatusesByProcessName?processName=${processName}`,
                    storeName,
                    config: {},
                },
            });
        }
    }
}


export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(memo(StatusTimeline)));