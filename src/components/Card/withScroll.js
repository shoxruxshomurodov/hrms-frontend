import React from "react";

const withScroll = (props) => {
  const { title = "Project Progress", body } = props;
  return (
    <div className="card border-0 rounded-0 g-mb-50">
      <div className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
        <h3 className="h6 mb-0">
          <i className="icon-layers g-pos-rel g-top-1 g-mr-5" />
          {title}
        </h3>
        <div className="dropdown g-mb-10 g-mb-0--md">
          <span
            className="d-block g-color-primary--hover g-cursor-pointer g-mr-minus-5 g-pa-5"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="icon-options-vertical g-pos-rel g-top-1" />
          </span>
          <div className="dropdown-menu dropdown-menu-right rounded-0 g-mt-10">
            <a className="dropdown-item g-px-10" href="#">
              <i className="icon-layers g-font-size-12 g-color-gray-dark-v5 g-mr-5" />{" "}
              Projects
            </a>
            <a className="dropdown-item g-px-10" href="#">
              <i className="icon-wallet g-font-size-12 g-color-gray-dark-v5 g-mr-5" />{" "}
              Wallets
            </a>
            <a className="dropdown-item g-px-10" href="#">
              <i className="icon-fire g-font-size-12 g-color-gray-dark-v5 g-mr-5" />{" "}
              Reports
            </a>
            <a className="dropdown-item g-px-10" href="#">
              <i className="icon-settings g-font-size-12 g-color-gray-dark-v5 g-mr-5" />{" "}
              Users Setting
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item g-px-10" href="#">
              <i className="icon-plus g-font-size-12 g-color-gray-dark-v5 g-mr-5" />{" "}
              View More
            </a>
          </div>
        </div>
      </div>
      <div className="js-scrollbar card-block u-info-v1-1 g-bg-white-gradient-v1--after g-height-300 g-pa-0 mCustomScrollbar _mCS_1 mCS-autoHide">
        <div
          id="mCSB_1"
          className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
          tabIndex={0}
          style={{ maxHeight: "none" }}
        >
         {body}
        </div>
      </div>
    </div>
  );
};

export default withScroll;
