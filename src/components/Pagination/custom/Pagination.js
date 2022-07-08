import React from "react";
import classnames from "classnames";
import {usePagination, DOTS} from "./usePagination";
import {withTranslation} from "react-i18next";

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        t,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <nav
            aria-label="Page Navigation"
            style={{marginTop: "10px"}}
            className="text-center"
        >
            <ul className="list-inline">
                <li
                    className={classnames("list-inline-item float-sm-left", {
                        disabled: currentPage === 1
                    })}
                    onClick={onPrevious}
                >
          <span className="u-pagination-v1__item u-pagination-v1-4 g-rounded-50 g-pa-7-16 dark-pagination">
            <span aria-hidden="true">
              <i className="fa fa-angle-left g-mr-5"></i>
                {t("Previous")}
            </span>
            <span className="sr-only">{t("Previous")}</span>
          </span>
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li className="list-inline-item g-hidden-sm-down dark-pagination">
                                &#8230;
                            </li>
                        );
                    }
                    return (
                        <li
                            key={index}
                            className="list-inline-item g-hidden-sm-down dark-pagination"
                            onClick={() => onPageChange(pageNumber)}
                        >
              <span
                  className={classnames(
                      "u-pagination-v1__item u-pagination-v1-4 g-rounded-50 g-pa-7-14 dark-pagination",
                      {
                          "u-pagination-v1-4--active": pageNumber === currentPage
                      }
                  )}
              >
                {pageNumber}
              </span>
                        </li>
                    );
                })}
                <li
                    className={classnames("list-inline-item float-sm-right", {
                        disabled: currentPage === lastPage
                    })}
                    onClick={onNext}
                >
          <span className="u-pagination-v1__item u-pagination-v1-4 g-rounded-50 g-pa-7-16 dark-pagination">
            <span aria-hidden="true">
                {t("Next")}
                <i className="fa fa-angle-right g-ml-5"></i>
            </span>
            <span className="sr-only"> {t("Next")}</span>
          </span>
                </li>
            </ul>
        </nav>
    );
};

export default withTranslation("HRMS")(Pagination);
