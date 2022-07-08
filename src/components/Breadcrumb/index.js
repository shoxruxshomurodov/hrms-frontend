import React, { Component } from "react";
import { Link } from "react-router-dom";
import {get, isEmpty, isEqual} from "lodash";
import {withTranslation} from "react-i18next";
import classNames from "classnames";
class Breadcrumb extends Component {
  render() {
    const { titles,t } = this.props;
    return (
      <>
        <div>
          <ul className="u-list-inline g-color-gray-dark-v6">
            {!isEmpty(titles) && <li className="list-inline-item g-mr-10">
              <Link
                className="u-link-v5 g-color-gray-dark-v6 g-color-primary--hover g-valign-middle"
                to={"/profile"}
              >
                {t("Home")}
              </Link>
              <i className="hs-admin-angle-right g-font-size-12 g-color-gray-light-v6 g-valign-middle g-ml-10" />
            </li>}
            {titles &&
              titles.map((title, index) => {
                const link =
                  !isEqual(
                    get(titles[titles.length - 1], "id", "#"),
                    index + 1
                  ) ? get(title, "url", "#") : "#";
                return (
                  <li className="list-inline-item g-mr-10 " key={index}>
                    <Link
                      to={link}
                      className={classNames("u-link-v5 g-color-gray-dark-v6 g-color-primary--hover g-valign-middle",{'g-color-primary':isEqual(index+1,titles.length)})}

                    >
                      {get(title, "title")}
                    </Link>
                    {!isEqual(
                      get(titles[titles.length - 1], "id"),
                      index + 1
                    ) && (
                      <i className="hs-admin-angle-right g-font-size-12 g-color-gray-light-v6 g-valign-middle g-ml-10" />
                    )}
                  </li>
                );
              })}
          </ul>
          <div className="row">
            <div className="col-12">
              <h1 className="g-font-weight-300 g-font-size-28 g-color-black g-mb-10 g-mt-10">
                {t(get(titles[titles.length - 1], "title"))}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation("HRMS")(Breadcrumb);
