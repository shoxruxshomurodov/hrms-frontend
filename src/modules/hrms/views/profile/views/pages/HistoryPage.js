import React ,{useState}from "react";
import {useSelector,useDispatch} from "react-redux";
import {get, isEqual} from "lodash";
import LoaderMini from "../../../../../../components/Loader/LoaderMini";
import { withTranslation} from "react-i18next";
import Api from "../../../../Api";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import AuthActions from "../../../../../../services/auth/actions";
const HistoryPage = ({t}) => {
    const [isFetched,setIsFetched] = useState(false);
    const dispatch = useDispatch()
  const userExperiences = useSelector(state =>  get(state,"authCheck.user.positionHistory.experiences.anyType"));
   const syncCurrentPosition = () => {
       setIsFetched("syncCurrentPosition")
        Api.syncPositionCurrent()
            .then(_res => {
                setIsFetched(false)
                SuccessNotify('Успешно изменено')
                setTimeout(() => {
                    dispatch({
                        type: AuthActions.CHECK_AUTH.REQUEST,
                    });
                },1000)
            })
            .catch(e => {
                setIsFetched(false)
                ErrorNotify("Произошла ошибка")
            });
    }
    const syncPositionHistory = () => {
        setIsFetched("syncPositionHistory")
        Api.syncPositionHistory()
            .then(_res => {
                setIsFetched(false)
                SuccessNotify('Успешно изменено')
                setTimeout(() => {
                    dispatch({
                        type: AuthActions.CHECK_AUTH.REQUEST,
                    });
                },1000)
            })
            .catch(e => {
                setIsFetched(false)
                ErrorNotify("Произошла ошибка")
            });
    }
  return (
    <>
      {/* Timeline Box */}
      <ul className="row u-timeline-v2-wrap list-unstyled">
        {userExperiences && userExperiences.map(experience => {
          return (
              <li className="col-md-12 g-mb-40">
                <div className="row">
                  {/* Timeline Date */}
                  <div className="col-md-3 text-md-right g-pt-20--md g-pr-40--md g-mb-20">
                    <h5 className="h6 g-font-weight-700 mb-0">{get(experience,'start_date')}</h5>
                    <h4 className="h4 g-font-weight-300">{get(experience,'company_name')}</h4>
                  </div>
                  {/* End Timeline Date */}
                  {/* Timeline Content */}
                  <div className="col-md-9 g-orientation-left g-pl-40--md">
                    {/* Timeline Dot */}
                    <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                      <i className="d-block g-width-18 g-height-18 g-bg-primary g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle" />
                    </div>
                    {/* End Timeline Dot */}
                    <article className="g-pos-rel g-bg-gray-light-v5 g-pa-30">
                      {/* Timeline Arrow */}
                      <div className="g-hidden-sm-down u-triangle-inclusive-v1--right g-top-30 g-z-index-2">
                        <div className="u-triangle-inclusive-v1--right__back g-brd-gray-light-v5-right" />
                      </div>
                      <div className="g-hidden-md-up u-triangle-inclusive-v1--top g-left-20 g-z-index-2">
                        <div className="u-triangle-inclusive-v1--top__back g-brd-gray-light-v5-bottom" />
                      </div>
                      {/* End Timeline Arrow */}
                      <header className="g-brd-bottom g-brd-gray-light-v4 g-pb-10 g-mb-25">
                        <h3 className="g-font-weight-300">{get(experience,"structure_name")}</h3>
                      </header>
                      <p className="lead g-mb-25">
                        {get(experience,"workplace_address")}
                      </p>
                      {/*<img*/}
                      {/*    className="g-height-120 g-width-120 g-mb-25 g-mr-20"*/}
                      {/*    src="../../assets/img-temp/100x100/img11.jpg"*/}
                      {/*    alt="Image description"*/}
                      {/*/>*/}
                      {/*<img*/}
                      {/*    className="g-height-120 g-width-120 g-mb-25 g-mr-20"*/}
                      {/*    src="../../assets/img-temp/100x100/img12.jpg"*/}
                      {/*    alt="Image description"*/}
                      {/*/>*/}
                      {/*<img*/}
                      {/*    className="g-height-120 g-width-120 g-mb-25"*/}
                      {/*    src="../../assets/img-temp/100x100/img13.jpg"*/}
                      {/*    alt="Image description"*/}
                      {/*/>*/}
                      <p className="lead mb-0">
                        {get(experience,"position_name")}
                      </p>
                      <p className="lead mb-0">
                        {get(experience,"end_date")}
                      </p>
                    </article>
                  </div>
                  {/* End Timeline Content */}
                </div>
              </li>
          )
        })}
      </ul>
      {/* End Timeline Box */}
       <div className="text-right">
           <button
               className="btn u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
               onClick={syncCurrentPosition}
               disabled={isEqual(isFetched,'syncCurrentPosition')}
           >
               {isEqual(isFetched,'syncCurrentPosition') && <LoaderMini />}  <span>{t("Получить текущаю должность")}</span>
           </button>
           <button
               className="btn u-btn-primary rounded-0 g-py-12 g-px-25 ml-1"
               onClick={syncPositionHistory}
               disabled={isEqual(isFetched,'syncPositionHistory')}
           >
               {isEqual(isFetched,'syncPositionHistory') && <LoaderMini />}   <span>{t("Получить стаж, историю должностей")}</span>
           </button>
       </div>
    </>
  );
};

export default withTranslation("HRMS")(HistoryPage);
