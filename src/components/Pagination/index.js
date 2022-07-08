import React, { useState } from "react";
import { get, isEqual } from "lodash";
import classNames from "classnames";

const Pagination = (props) => {
  const { meta, handlePagination, page = get(meta, "currentPage") } = props;
  const [active, setActive] = useState(page);
  const setPrev = () => {
    if (active >= 1) {
      setActive(active - 1);
      handlePagination(active - 1);
    }
  };
  const setNext = () => {
    if (active < pages.length) {
      setActive(active+1);
      handlePagination(active+1 );
    }
  };
  let pages = [...Array(get(meta, "totalPages")).keys()];
  return (
    <nav aria-label="Page Navigation" style={{marginTop:"10px"}}>
      <ul className="list-inline">
        {((pages && active > pages[1]) || true) && (
          <li className="list-inline-item" onClick={setPrev}>
            <span className="u-pagination-v1__item u-pagination-v1-2 g-rounded-50 g-pa-7-16 dark-pagination">
              <span aria-hidden="true">
                <i className="fa fa-angle-left" />
              </span>
              <span className="sr-only">Previous</span>
            </span>
          </li>
        )}
        {pages &&
          pages.map((page, index) => {
            return (
              <li
                className="list-inline-item g-hidden-sm-down dark-pagination"
                onClick={() => {
                  setActive(index+1);
                  handlePagination(index+1);
                }}
                key={index}
              >
                <span
                  className={classNames(
                    "u-pagination-v1__item u-pagination-v1-2 g-rounded-50 g-pa-7-14 dark-pagination",
                    {
                      "u-pagination-v1-2--active": isEqual(active, index+1)
                    }
                  )}
                >
                  {page+1}
                </span>
              </li>
            );
          })}
        {(active < pages.length || true) && (
          <li className="list-inline-item" onClick={setNext}>
            <span className="u-pagination-v1__item u-pagination-v1-2 g-rounded-50 g-pa-7-16 dark-pagination">
              <span aria-hidden="true">
                <i className="fa fa-angle-right" />
              </span>
              <span className="sr-only">Next</span>
            </span>
          </li>
        )}

        <li className="list-inline-item float-right">
          <span className="u-pagination-v1__item-info g-pa-7-14">
            Page {get(meta, "currentPage")} of {get(meta, "totalPages")}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
