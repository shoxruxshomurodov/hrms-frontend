import React from "react";
import FormChangeParent from "../Form/FormChangeParent"
import { withTranslation } from "react-i18next";
const ModalChangeParent = (props) => {
  const { setStateCustom,transferInfo,rootStructureId,loadTreeData2,isShowedModal ,t,filial} = props;
  return (
    <>
      <div
        className="custombox-overlay custombox-fadein custombox-open"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      />
      <div
        className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
        style={{ animationDuration: "300ms", animationDelay: "150ms" }}
      >
        <div
          id="modal1"
          className="text-left g-bg-white g-overflow-y-auto g-pa-20"
          style={{ display: "block", width: 1000 }}
        >
          <button
            type="button"
            className="close"
            onClick={() => setStateCustom("isShowUpdateTransfer", false)}
          >
            <i className="hs-icon hs-icon-close" />
          </button>
          <h4 className="g-mb-20">{t("STRUCTURE CHANGE PARENT")}</h4>
          <FormChangeParent filial={filial} loadTreeData2={loadTreeData2} isShowedModal={isShowedModal} setStateCustom={setStateCustom} rootStructureId={rootStructureId} transferInfo={transferInfo} />
        </div>
      </div>
    </>
  );
};

export default withTranslation("HRMS")(ModalChangeParent);
