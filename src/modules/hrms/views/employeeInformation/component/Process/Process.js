import React from "react";
import classNames from "classnames";
import { isEqual } from "lodash";
import {withTranslation} from "react-i18next";

function Process({ process, t }) {
  return (
    <div id="shortcode5">
      <div className="shortcode-html">
        <ul className="row list-inline u-info-v9-1 mb-0">
          <li className="col-md-3 list-inline-item g-mx-0 g-mb-30">
            <div className="u-block-hover text-center g-px-40">
              <div className="g-mb-5">
                <span className="g-width-85 g-height-85 g-color-main g-font-size-50 rounded-circle">
                  <i className="icon-education-024 u-line-icon-pro" />
                </span>
              </div>
              <div className="g-mb-25">
                <span
                  className={classNames(
                    "u-icon-v1 u-shadow-v22 g-font-size-9 rounded-circle",
                    {
                      "g-color-primary g-bg-white": !isEqual(process, 1),
                      "g-color-white g-bg-primary": isEqual(process, 1)
                    }
                  )}
                >
                  <i className="fa fa-check" />
                </span>
              </div>
              <h3 className={classNames( "g-font-weight-600 g-font-size-17 text-uppercase mb-3",
                  {
                    "g-color-primary": isEqual(process, 1)
                  }
              )}
              >
                {t("Basic information")}
              </h3>
              <p>
                {t("We aim high at being focused on building relationships with our\n" +
                    "                clients and community.")}
              </p>
            </div>
          </li>

          <li className="col-md-3 list-inline-item g-mx-0 g-mb-30">
            <div className="u-block-hover text-center g-px-40">
              <div className="g-mb-5">
                <span className="g-width-85 g-height-85 g-color-main g-font-size-50 rounded-circle">
                  <i className="icon-education-073 u-line-icon-pro" />
                </span>
              </div>
              <div className="g-mb-25">
                <span
                  className={classNames(
                    "u-icon-v1 u-shadow-v22 g-font-size-9 rounded-circle",
                    {
                      "g-color-primary g-bg-white": !isEqual(process, 2),
                      "g-color-white g-bg-primary": isEqual(process, 2)
                    }
                  )}
                >
                  <i className="fa fa-check" />
                </span>
              </div>
              <h3 className={classNames( "g-font-weight-600 g-font-size-17 text-uppercase mb-3",
                  {
                    "g-color-primary": isEqual(process, 2)
                  }
              )}
              >
                {t("Labor activity")}
              </h3>
              <p>
                {t("We strive to embrace and drive change in our industry which\n" +
                    "                allows us to keep our clients relevant.")}
              </p>
            </div>
          </li>

          <li className="col-md-3 list-inline-item g-mx-0 g-mb-30">
            <div className="u-block-hover text-center g-px-40">
              <div className="g-mb-5">
                <span className="g-width-85 g-height-85 g-color-main g-font-size-50 rounded-circle">
                  <i className="icon-communication-180 u-line-icon-pro" />
                </span>
              </div>
              <div className="g-mb-25">
                <span
                  className={classNames(
                    "u-icon-v1 u-shadow-v22 g-font-size-9 rounded-circle",
                    {
                      "g-color-primary g-bg-white": !isEqual(process, 3),
                      "g-color-white g-bg-primary": isEqual(process, 3)
                    }
                  )}
                >
                  <i className="fa fa-check" />
                </span>
              </div>
              <h3 className={classNames( "g-font-weight-600 g-font-size-17 text-uppercase mb-3",
                  {
                    "g-color-primary": isEqual(process, 3)
                  }
              )}
              >
                {t("Family composition and relatives")}
              </h3>
              <p>
                {t("At the end of the day, it's important to not let being busy\n" +
                    "                distract us from having fun.")}
              </p>
            </div>
          </li>
          <li className="col-md-3 list-inline-item g-mx-0 g-mb-30">
            <div className="u-block-hover text-center g-px-40">
              <div className="g-mb-5">
                <span className="g-width-85 g-height-85 g-color-main g-font-size-50 rounded-circle">
                  <i className="icon-education-001 u-line-icon-pro" />
                </span>
              </div>
              <div className="g-mb-25">
                <span
                    className={classNames(
                        "u-icon-v1 u-shadow-v22 g-font-size-9 rounded-circle ",
                        {
                          "g-color-primary g-bg-white": !isEqual(process, 4),
                          "g-color-white g-bg-primary": isEqual(process, 4)
                        }
                    )}
                >
                  <i className="fa fa-check" />
                </span>
              </div>
              <h3 className={classNames( "g-font-w      eight-600 g-font-size-17 text-uppercase mb-3",
                  {
                    "g-color-primary": isEqual(process, 4)
                  }
              )}
              >
                {t("About education")}
              </h3>
              <p>
                {t("At the end of the day, it's important to not let being busy\n" +
                    "                distract us from having fun.")}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withTranslation("HRMS")(Process);
