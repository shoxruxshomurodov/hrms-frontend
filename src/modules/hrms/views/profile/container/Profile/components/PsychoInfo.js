import React, { useState } from "react";
import { get, isNil, isEqual } from "lodash";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Actions from "../../../../../Actions";
import { toast } from "react-toastify";
import ContentLoader from "../../../../../../../components/Loader/ContentLoader";
import PDFViewer from "../../../../../../../components/PdfViewer";
import classNames from "classnames";

const PsychoInfo = ({
  t,
  user,
  syncEmployeePsychoInfo,
  callToRender = () => {},
  ...rest
}) => {
  const [isFetched, setIsFetched] = useState(false);

  const refreshServices = () => {
    setIsFetched(true);
    syncEmployeePsychoInfo({
      id: get(user, "id"),
      cb: {
        success: (nData, data) => {
          setIsFetched(false);
          toast.dismiss();
          toast.success("Успешно", {
            position: "top-right",
            autoClose: 1000,
          });
          setIsFetched(false);
        },
        fail: ({ message = "ERROR" }) => {
          setIsFetched(false);
          toast.dismiss();
          toast.error(message, {
            position: "top-right",
            autoClose: 3000,
          });
        },
      },
    });
  };

  return (
    <>
      {!isFetched ? (
        <div>
          {!isNil(get(user, "employeeReference.psycho", null)) && (
            <>
              <h2 className="h4 g-font-weight-300">
                {get(user, "employeeReference.psycho.title", null)}
              </h2>
              <div id="shortcode4">
                <div className="shortcode-html">
                  <div
                    className={classNames(
                      "g-brd-around g-brd-gray-light-v4 g-brd-2  g-line-height-1_8 g-pa-30 g-mb-30",
                      {
                        "g-brd-red-top": get(
                          user,
                          "employeeReference.psycho.isFound"
                        ),
                        "g-brd-green-top": !get(
                          user,
                          "employeeReference.psycho.isFound",
                          false
                        ),
                      }
                    )}
                    role="alert"
                  >
                    <h3
                      className={classNames("g-font-weight-300", {
                        "g-color-green": !get(
                          user,
                          "employeeReference.psycho.isFound",
                          false
                        ),
                        "g-color-red": get(
                          user,
                          "employeeReference.psycho.isFound"
                        ),
                      })}
                    >
                      {get(user, "employeeReference.psycho.response", null)}{" "}
                    </h3>
                    <p className="mb-0">
                      Мазкур ҳужжат Вазирлар Маҳкамасининг 2017 йил
                      сентябридаги728-сон қарори билан тасдиқланган Ўзбекистон
                      Республикаси Ягонаинтерактив давлат хизматлари портали
                      тўғрисидаги
                      низомгамувофиқшакиллантирилганэлектронҳужжатнингнусхасиҳисобланади.
                      Электрон ҳужжатнинг нусхасида кўрсатилганмаълумотлар
                      тўғрилигини текшириш учун hr.xb.uz веб-сайтига ўтингва
                      электрон ҳужжатнинг ноёб рақамини киритинг ёки
                      мобилтелефон ёрдамида QR-кодни сканер қилинг. Диққат!
                      ВазирларМаҳкамасининг 2017 йил сентябридаги 728-сон қарори
                      мувофиқэлектрон ҳужжатлардаги маълумотлар қонуний
                      ҳисобланади
                    </p>
                  </div>
                </div>
              </div>
              {isEqual(
                get(user, "employeeReference.psycho.file.extension"),
                "pdf"
              ) && (
                <PDFViewer
                  pdf={get(user, "employeeReference.psycho.file.url")}
                />
              )}
            </>
          )}

          <div className={"text-sm-right g-mt-30"}>
            <button
              onClick={refreshServices}
              className={"btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"}
            >
              {t("Refresh")}
            </button>
            {!isNil(get(user, "employeeReference.psycho", null)) && (
              <a
                href={get(user, "employeeReference.psycho.file.url")}
                target={"_blank"}
                className={
                  "btn u-btn-primary rounded-0 g-py-12 g-px-25 text-white"
                }
                download
              >
                Print to PDF
              </a>
            )}
          </div>
        </div>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    syncEmployeePsychoInfo: ({ id, cb }) =>
      dispatch({
        type: Actions.ASYNC_EMPLOYEE_PSYCHO_INFO.REQUEST,
        payload: { id, cb },
      }),
  };
};

export default withTranslation("HRMS")(
  connect(mapStateToProps, mapDispatchToProps)(PsychoInfo)
);
