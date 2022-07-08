import React, {useState} from "react";
import { withTranslation } from "react-i18next";
const Base = ({ head = [], className = "", children, t,hideIcon=false,thClass='' }) => {

  return (
    <table className={`table table-striped ${className}`}>
      <thead>
        <tr className={` g-col-border-top-0`}>
          {head &&
            head.map((th, index) => {
              return (
                <th key={index} className={`${thClass}`}>
                  <div className="flex-display-more">
                    <span>{t(th)}</span>
                    {!hideIcon && <span className="d-flex flex-column pointer g-width-10 g-line-height-1 g-font-size-10">
                      <a className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-up" />
                      </a>
                      <a className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-down" />
                      </a>
                    </span>}
                  </div>
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default withTranslation("HRMS")(Base);
