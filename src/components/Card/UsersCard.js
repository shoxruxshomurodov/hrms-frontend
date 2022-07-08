import React from "react";
import UserCard from "./UserCard";
const UsersCard = () => {
  return (
    <div className="card border-0 rounded-0 g-mb-50">
      <div className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
        <h3 className="h6 mb-0">
          <i className="icon-notebook g-pos-rel g-top-1 g-mr-5" /> User Contacts
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
      <div className="card-block g-pa-0">
        <div className="row">
         <UserCard />
         <UserCard />
         <UserCard />
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
