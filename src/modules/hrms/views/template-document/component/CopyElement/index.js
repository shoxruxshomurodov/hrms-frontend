import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { get } from "lodash";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SuccessNotify from "../../../../../../components/Sweetalerts/SuccessNotify";
import { ToastContainer } from "react-toastify";
const CopyElement = (props) => {
  const { t, result } = props;
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(get(result, "code"));

  useEffect(() => {
    if (copied) {
      SuccessNotify("Перевод скопирован.");
    }
  },[count]);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h3 className="h4 g-font-weight-300">
            <code>{get(result, "code")}</code>
          </h3>
          <CopyToClipboard
            text={value}
            onCopy={() => {
              setCopied(true);
              setCount(count + 1);
            }}
          >
            <span className="js-copy u-link-v5  g-color-main  g-color-primary--hover pointer">
              <i className="fa fa-clone mr-1" />
              {t("Copy code")}
            </span>
          </CopyToClipboard>
        </div>
        <div className="col-md-6">
          <div id="shortcode2">
            <div className="shortcode-html">
              <blockquote className="blockquote g-mb-30">
                <p className="m-b-0">{get(result, "value")}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{get(result, "description")}</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <hr className="g-brd-gray-light-v4 g-my-30" />
      <ToastContainer />
    </>
  );
};

export default withTranslation("HRMS")(CopyElement);
