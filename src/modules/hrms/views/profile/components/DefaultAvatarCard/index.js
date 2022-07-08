import React from "react";
import MaleAvatars from "./MaleAvatars";
import FemaleAvatars from "./FemaleAvatars";
import { get, isEqual } from "lodash";
const Avatars = ({ user, AvatarIconType }) => {
  return (
    <div
      className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
      style={{
        animationDuration: "300ms",
        animationDelay: "150ms",
        backgroundColor: "rgba(0, 0, 0,0.8)"
      }}
    >
      <div
        id="modal-type-aftersometime"
        className="js-autonomous-popup text-left g-max-width-600 g-bg-white g-overflow-y-auto g-pa-20"
        style={{ display: "block", width: "50%" }}
        data-modal-type="aftersometime"
        data-effect="fadein"
      >
        <h4 className="g-mb-20">O'zingiz uchun surat tanlang</h4>
        <hr />
        {isEqual(get(user, "fidoGspIdentity.gender"), "1") ? (
          <MaleAvatars AvatarIconType={AvatarIconType} />
        ) : (
          <FemaleAvatars AvatarIconType={AvatarIconType} />
        )}
      </div>
    </div>
  );
};

export default Avatars;
