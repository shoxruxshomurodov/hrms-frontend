import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { isEqual } from "lodash";
import {withTranslation} from "react-i18next";
function PerPage({ onPerPage, value,t }) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const pageClickEventDropdown = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShow(!show);
      }
      if (
        dropdownRef.current !== null &&
        dropdownRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    if (show) {
      window.addEventListener("click", pageClickEventDropdown);
    }
    return () => {
      window.removeEventListener("click", pageClickEventDropdown);
    };
  }, [show]);
  return (
    <div className="d-flex align-items-center ml-3 g-ml-15 g-ml-55--md">
      <span className="g-hidden-sm-down g-color-gray-dark-v6 g-mr-12">
        {t("Show")}:
      </span>
      <div className="u-select--v1 g-pr-20 mt-1">
        <div className="dropdown bootstrap-select js-select u-select--v1-select w-100 show mt-2">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-toggle="dropdown"
            role="button"
            data-id="datatableEntries1"
            title="5 Entries"
            aria-expanded="true"
            onClick={() => setShow(!show)}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">
                  <span className="d-flex align-items-center g-line-height-1_2 g-color-black">
                    {value} {t("Entries")}
                  </span>
                </div>
              </div>{" "}
            </div>
          </button>
          <div
            className={classNames("dropdown-menu", {
              show: isEqual(show, true),
              hide: isEqual(show, false)
            })}
            role="combobox"
            x-placement="bottom-start"
          >
            <div
              className="inner hide"
              role="listbox"
              aria-expanded="true"
              tabIndex={-1}
            >
              <ul className="dropdown-menu inner" ref={dropdownRef}>
                <li className="selected active">
                  <a
                    role="option"
                    className={classNames("dropdown-item", {
                      "active selected": isEqual(value, 10)
                    })}
                    onClick={() => onPerPage(10)}
                    aria-disabled="false"
                    tabIndex={0}
                    aria-selected="true"
                  >
                    <span className=" bs-ok-default check-mark" />
                    <span className="text">
                      <span className="d-flex align-items-center g-line-height-1_2 g-color-black">
                        10 {t("Entries")}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="selected active">
                  <a
                    role="option"
                    className={classNames("dropdown-item", {
                      "active selected": isEqual(value, 25)
                    })}
                    onClick={() => onPerPage(25)}
                    aria-disabled="false"
                    tabIndex={0}
                    aria-selected="true"
                  >
                    <span className=" bs-ok-default check-mark" />
                    <span className="text">
                      <span className="d-flex align-items-center g-line-height-1_2 g-color-black">
                        25 {t("Entries")}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    role="option"
                    className={classNames("dropdown-item", {
                      "active selected": isEqual(value, 50)
                    })}
                    onClick={() => onPerPage(50)}
                    aria-disabled="false"
                    tabIndex={0}
                    aria-selected="false"
                  >
                    <span className=" bs-ok-default check-mark" />
                    <span className="text">
                      <span className="d-flex align-items-center g-line-height-1_2 g-color-black">
                        50 {t("Entries")}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    role="option"
                    className={classNames("dropdown-item", {
                      "active selected": isEqual(value, 100)
                    })}
                    onClick={() => onPerPage(100)}
                    aria-disabled="false"
                    tabIndex={0}
                    aria-selected="false"
                  >
                    <span className=" bs-ok-default check-mark" />
                    <span className="text">
                      <span className="d-flex align-items-center g-line-height-1_2 g-color-black">
                        100 {t("Entries")}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <i className="hs-admin-angle-down g-absolute-centered--y g-right-0 g-color-gray-light-v6" />
      </div>
    </div>
  );
}

export default withTranslation("HRMS")(PerPage);
