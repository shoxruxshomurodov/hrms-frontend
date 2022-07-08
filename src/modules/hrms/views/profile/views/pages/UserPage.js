import React from "react";
import UserCard from "../../../../../../components/Card/UserCard";
import Pagination from "../../../../../../components/Pagination";
const User = () => {
  return (
    <>
      {/* User Contacts */}
      <div className="row g-mb-40">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      {/* End User Contacts */}
      {/* User Contacts */}
      <div className="row g-mb-40">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      {/* End User Contacts */}
      {/* User Contacts */}
      <div className="row g-mb-40">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      {/* End User Contacts */}
      {/* User Contacts */}
      <div className="row g-mb-40">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      {/* End User Contacts */}
      {/* Pagination */}
      <Pagination />
      {/* End Pagination */}
    </>
  );
};

export default User;
