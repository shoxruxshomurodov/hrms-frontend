import React, { useState } from "react";
import MaleAvatars from "../../profile/components/DefaultAvatarCard/MaleAvatars";
import FemaleAvatars from "../../profile/components/DefaultAvatarCard/FemaleAvatars";
import {useSelector} from "react-redux";
import { get, isEqual } from "lodash";
import { withTranslation } from "react-i18next";
import Process from "../component/Process/Process";
import LoaderMini from "./../../../../../components/Loader/LoaderMini";
const EmployeePhoto = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => get(state, "authCheck.user", null));
  const { t , saveFinished} = props;
  return (
    <div className="container-semiboxed">
      <Process process={4} />
      <div
        id="modal-type-aftersometime"
        className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
        style={{ display: "block", width: "70%", margin: "auto" }}
        data-modal-type="aftersometime"
        data-effect="fadein"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{t("O'zingiz uchun surat tanlang")}</h4>
          {isActive && (
            <button
              onClick={saveFinished(get(user,'id'))}
              className="btn u-btn-primary rounded-0"
            >
              {isEqual(isLoading, "loading") ? (
                <LoaderMini />
              ) : (
                t("Save and finished")
              )}
            </button>
          )}
        </div>
        <hr />
        {isEqual(get(user, "fidoGspIdentity.gender"), "1") ? (
          <MaleAvatars isActive={isActive} setIsActive={setIsActive} />
        ) : (
          <FemaleAvatars isActive={isActive} setIsActive={setIsActive} />
        )}
      </div>
    </div>
  );
};

export default withTranslation("HRMS")(EmployeePhoto);
