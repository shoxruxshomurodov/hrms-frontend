import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { get, isNil } from "lodash";
import AvatarEditor from "react-avatar-editor";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Slider from "material-ui/Slider";
import LoaderMini from "../Loader/LoaderMini";
import {withTranslation} from "react-i18next";

const ModalAvatar = ({ modalRef, ChangeAvatar, avatar, modalAction,isFetched,t }) => {
  const [file, selectFiles] = useFileUpload();
  const [zoom, setZoom] = useState(1);
  const handleZoomSlider = (event, value) => {
    setZoom(value);
  };
  return (
    <div
      id="activityMenu"
      ref={modalRef}
      className="js-custom-scroll bg-white u-header-sidebar g-pos-fix g-top-0 g-left-auto g-right-0 g-z-index-4 g-width-300 g-width-400--sm g-height-100vh u-dropdown--css-animation mCustomScrollbar _mCS_2 mCS-autoHide fadeInRight"
      aria-labelledby="activityInvoker"
      style={{ animationDuration: "300ms", overflow: "visible" }}
    >
      <div className="u-header-dropdown-bordered-v1 g-pa-20">
        <a
          id="activityInvokerClose"
          className="pull-right pointer g-color-lightblue-v2 target-of-invoker-has-dropdowns active"
          aria-controls="activityMenu"
          aria-haspopup="true"
          aria-expanded="true"
          data-dropdown-event="click"
          data-dropdown-target="#activityMenu"
          data-dropdown-type="css-animation"
          data-dropdown-animation-in="fadeInRight"
          data-dropdown-animation-out="fadeOutRight"
          data-dropdown-duration={300}
          onClick={() => modalAction(false)}
        >
          <i className="hs-admin-close" />
        </a>
        <h4 className="text-uppercase g-font-size-default g-letter-spacing-0_5 g-mr-20 g-mb-0">
          {t(" Rasm yuklash")}
        </h4>
      </div>
      <MuiThemeProvider>
        <div className="upload__image">
          <AvatarEditor
            image={get(file, "source") || avatar}
            width={220}
            height={220}
            border={20}
            color={[0, 0, 0, 0.6]}
            rotate={0}
            scale={zoom}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <label
              style={{
                fontSize: 12,
                marginRight: 10,
                paddingBottom: 22,
                fontWeight: 600
              }}
            >
              {t("Zoom")}
            </label>
            <Slider
              min={1}
              max={10}
              step={0.1}
              value={zoom}
              onChange={handleZoomSlider}
              style={{ width: 200 }}
            />
          </div>
          <button
            className="btn btn-md u-btn-primary mt-3"
            onClick={() =>
              selectFiles(
                { accept: "image/*" },
                ({ name, size, source, file }) => {
              
                }
              )
            }
          >
            {t("Rasm tanlang")}
          </button>
        </div>
      </MuiThemeProvider>
      <button
        className="btn btn-md u-btn-primary ml-auto d-block mr-3"
        onClick={() => ChangeAvatar(file)}
        disabled={isNil(file) || isFetched}
      >
        {isFetched && <LoaderMini />}
        <span>{t("yuklash")}</span>
      </button>
    </div>
  );
};

export default withTranslation("HRMS")(ModalAvatar);
