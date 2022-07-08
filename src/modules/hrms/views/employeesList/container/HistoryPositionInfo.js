import React, {useState} from 'react';
import {get, isNull} from "lodash";
import {withTranslation} from "react-i18next";
import Actions from "../../../Actions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import Tabs from '../../../../../components/Tabs';
import CurrentPositionInfo from './CurrentPositionInfo';
import ContentLoader from "../../../../../components/Loader/ContentLoader";

function HistoryPositionInfo({t,user,hasAction=false}) {
    const [isFetched, setIsFetched] = useState(false);
    const dispatch = useDispatch();
    const userExperiences = get(user, 'employeesPositionHistories',[]);

    function refreshServices() {
        setIsFetched(true);
        const attributes = {
            employeeId: get(user, 'id'),
            service: "HISTORY_POSITION"
        };
        dispatch({
            type: Actions.EMPLOYEE_REFRESH_SERVICES_DATA.REQUEST,
            payload: {
                attributes,
                cb: {
                    success: (nData, data) => {
                        setIsFetched(false)
                        toast.dismiss();
                        toast.success('Успешно', {
                            position: "top-right",
                            autoClose: 1000,
                        })
                        setIsFetched(false);
                    },
                    fail: (e) => {
                        setIsFetched(false)
                        toast.dismiss();
                        toast.error("Ошибка", {
                            position: "top-right",
                            autoClose: 1000,
                        })
                    },
                },
            },
        });
    }

    return (
        <>
            <div>
            <div className='row'>
            <div className='col col-12'>
            <Tabs  titles={[ "Position history info", "Position info"]}
                    texts={[<>{!isFetched ? <div>
                        <h2 className="h4 g-font-weight-300">Manage your Name, ID and Email Addresses</h2>
                        <p>Below are name, email addresse, contacts and more on file for your account.</p>
                        {!isNull(userExperiences) ?<ul className="row u-timeline-v2-wrap list-unstyled ">
                                 
                                {userExperiences && userExperiences.map((experience,index) => {
                                    return (
                                        <li key={index+1} className="col-md-12 g-mb-30">
                                            <div className="row">
                                                <div className="col-md-3 text-md-right g-pt-20--md g-pr-40--md g-mb-20">
                                                    <h5 className="h6 g-font-weight-700 mb-0">{get(experience, 'startDate')}</h5>
                                                    <h5 className="h6 g-font-weight-700 mb-0">{get(experience, "endDate")}</h5>
                                                    <h4 className="h5 g-font-weight-200">{get(experience, 'positionName')}</h4>
                                                </div>
                                                <div className="col-md-9 g-orientation-left g-pl-40--md">
                                                    <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                                                        <i className="d-block g-width-18 g-height-18  g-bg-beige g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle"/>
                                                    </div>
                                                    <article className="g-pos-rel g-bg-gray-light-v5 g-pa-30">
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
                                                        <header className="g-brd-bottom g-brd-gray-light-v4 g-pb-0 g-mb-10">
                                                            <h4 className="g-font-weight-300">{get(experience, "structureName")}</h4>
                                                        </header>
                                                        <p className="lead mb-0">
                                                            {get(experience, 'companyName')}
                                                        </p>
                                                        <p className="lead mb-0">
                                                            {get(experience, "workplaceAddress")}
                                                        </p>
                                                    </article>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            :
                            <p className={"text-center"}>No Data</p>
                        }
                        <div className={'text-sm-right'}>
                            {!hasAction && <button onClick={refreshServices}
                                    className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}>{t('Refresh')}</button>}
                            {/*<button className={'btn u-btn-primary rounded-0 g-py-12 g-px-25'}>Print to PDF</button>*/}
                        </div>
                        </div>:<ContentLoader />}</>, <CurrentPositionInfo hasAction={hasAction} user={user}/>
                      ]}/>   
                       </div>

                </div>
            </div>
        </>
    );
}

export default withTranslation("HRMS")(HistoryPositionInfo);