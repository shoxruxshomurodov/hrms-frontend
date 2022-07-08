import React, { useState } from "react";
import MaleAvatars from "../../../profile/components/DefaultAvatarCard/MaleAvatars";
import FemaleAvatars from "../../../profile/components/DefaultAvatarCard/FemaleAvatars";
import {useDispatch, useSelector} from "react-redux";
import { get, isEqual } from "lodash";
import { withTranslation } from "react-i18next";
import Process from "../../component/Process/Process";
import Api from "../../../../Api";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../../../../components/Sweetalerts/ErrorNotify";
import LoaderMini from "./../../../../../../components/Loader/LoaderMini";
import Action from "../../../../Actions";
import { useHistory } from "react-router";
import {toast} from "react-toastify";
const EmployeePhotoPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => get(state, "authCheck.user", null));
  const AvatarIconType = () => {
    setIsLoading("loading");
    Api.avatarIconType(isActive)
        .then((_res) => {
          SuccessNotify("Изображение было успешно загружено");
          setIsLoading(false);
          setTimeout(() => {
            history.push("/")
          }, 1000);
        })
        .catch((e) => {
          setIsLoading(false);
          ErrorNotify("Изображение не загружено");
        });
  };
  const saveFinished = () => {
    const attributes = {
      requestAbleId:get(user,'id')
    };
      AvatarIconType();
    setIsLoading("loading");
    toast.dismiss();
    toast.success("Успешно", {
      position: "top-right",
      autoClose: 1000
    });
    setTimeout(() => {
      history.push("/profile");
    }, 1500);
  };
  const { t } = props;
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
            <h4 className="g-mb-20">{t("O'zingiz uchun surat tanlang")}</h4>
            {isActive && (
                <button
                    onClick={saveFinished}
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

export default withTranslation("HRMS")(EmployeePhotoPage);
