import React from "react";
import FormTransfer from "../Form/FormTransfer";
import { withTranslation } from "react-i18next";
const ModalAdded = (props) => {
  const { setStateCustom,transferInfo,parentStructureId,rootStructureId,loadTreeData2,isShowedModal ,t,filial,loadTreeData} = props;
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
            onClick={() => setStateCustom("isShowTransfer", false)}
          >
            <i className="hs-icon hs-icon-close" />
          </button>
          <h4 className="g-mb-20">{t("STRUCTURE TRANSFER")}</h4>
          <FormTransfer filial={filial} loadTreeData={loadTreeData} loadTreeData2={loadTreeData2} isShowedModal={isShowedModal} setStateCustom={setStateCustom} parentStructureId={parentStructureId} rootStructureId={rootStructureId} transferInfo={transferInfo} />
        </div>
      </div>
    </>
  );
};

export default withTranslation("HRMS")(ModalAdded);
