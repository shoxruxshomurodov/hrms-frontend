import React, {useState} from 'react';
import {get, head, isNil} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Actions from "../../../Actions";
import {toast} from "react-toastify";
import ContentLoader from "../../../../../components/Loader/ContentLoader";


const VaccineCertificate = ({t, user, syncEmployeeVaccineCertificate,callToRender = ()=>{},hasAction = false, ...rest}) => {
    const [isFetched, setIsFetched] = useState(false);

    const refreshServices = () => {
        setIsFetched(true);
        syncEmployeeVaccineCertificate({
            id: get(user, 'id'),
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
                fail: ({message="ERROR"}) => {
                    setIsFetched(false)
                    toast.dismiss();
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 3000,
                    })
                },
            },
        })
    }


    return (
        <>
            {!isFetched ? <div>
                { !isNil(get(user, 'healthcare')) &&  <div>
                    <h2 className="h4 g-font-weight-300">Manage your Name, ID and Email Addresses</h2>
                    <p>Below are name, email addresse, contacts and more on file for your account.</p>
                    <div
                        className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 ">
                        <h3 className="h6 mb-0">Бемор</h3>
                    </div>
                    <ul className="list-unstyled g-mb-30">
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Ф.И.О
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(user, 'healthcare.covidCertificate.data.fullName')}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Манзил
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(user, 'healthcare.covidCertificate.data.address')}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Касалхона
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(user, 'healthcare.covidCertificate.data.hospital')}</span>
                        </li>

                    </ul>
                    <div
                        className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 ">
                        <h3 className="h6 mb-0">Вакцина ҳақида маълумот</h3>
                    </div>
                    <ul className="list-unstyled g-mb-30">
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Вакцина номи
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(head(get(user, 'healthcare.covidCertificate.data.vaccineGroups', [])), 'vaccine_name')}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Холати
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(head(get(user, 'healthcare.covidCertificate.data.vaccineGroups', [])), 'status')}</span>
                        </li>
                    </ul>
                {get(head(get(user,'healthcare.covidCertificate.data.vaccineGroups',[])),'vaccines',[]).map((vaccine,index)=><div key={index+1}>
                    <div
                        className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 ">
                        <h3 className="h6 mb-0">Эмлаш босқичлари ({index + 1}-босқич)</h3>
                    </div>
                    <ul className="list-unstyled g-mb-30">
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Ваксиналаш босқичи
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(vaccine, 'step', index + 1)}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Ваксиналаш санаси
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(vaccine, 'get_date')}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Ваксина дозаси
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(vaccine, 'dose')}</span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                            <strong
                                className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10 g-pl-15">
                                Ваксина серияси ва рақами
                            </strong>
                            <span
                                className="align-top g-pr-15">{get(vaccine, 'series')}</span>
                        </li>

                    </ul>
                </div>)
                }
                </div>}

                <div className={'text-sm-right'}>
                    {!hasAction &&  <><button onClick={refreshServices}
                            className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}>{t('Refresh')}</button>
                    { !isNil(get(user, 'healthcare')) &&  <a href={get(head(get(user,'healthcare.covidCertificate.data.vaccineGroups',[])),'certificate')} className={'btn u-btn-primary rounded-0 g-py-12 g-px-25 text-white'} download target={'_blank'}>Print to PDF</a>}
                    </>}
                </div>
            </div> : <ContentLoader/>}
        </>
    );
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        syncEmployeeVaccineCertificate: ({id,cb}) => dispatch({type:Actions.ASYNC_VACCINE_CERTIFICATE.REQUEST,payload:{id,cb}})
    }
}

export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(VaccineCertificate));
