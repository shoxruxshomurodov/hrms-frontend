import React from "react";
import man1 from "../../../../../../assets/profile/man1.svg";
import man2 from "../../../../../../assets/profile/man2.svg";
import man3 from "../../../../../../assets/profile/man3.svg";
import classNames from "classnames";
import { isEqual } from "lodash";
const MaleAvatars = ({isActive,setIsActive}) => {
  return (
    <div id="shortcode6">
      <div className="shortcode-html">
        <div className="row">
          <div className="col-lg-4 g-mb-30 d-flex justify-content-center">
            {/* Article */}
            <article
              className="u-shadow-v1-4 pointer"
              onClick={() => {
                setIsActive("man1");
              }}
            >
              <img
                className={classNames("img-fluid w-100", {
                  active: isEqual(isActive, "man1")
                })}
                width="200"
                height="200"
                src={man1}
                alt="Image Description"
              />
            </article>
            {/* End Article */}
          </div>
          <div className="col-lg-4 g-mb-30 d-flex justify-content-center">
            {/* Article */}
            <article
              className="u-shadow-v1-4 pointer "
              onClick={() => {
                setIsActive("man2");
              }}
            >
              <img
                className={classNames("img-fluid w-100", {
                  active: isEqual(isActive, "man2")
                })}
                src={man2}
                alt="Image Description"
              />
            </article>
            {/* End Article */}
          </div>
          <div className="col-lg-4 g-mb-30 d-flex justify-content-center">
            {/* Article */}
            <article
              className="u-shadow-v1-4 pointer"
              onClick={() => {
                setIsActive("man3");
              }}
            >
              <img
                className={classNames("img-fluid w-100", {
                  active: isEqual(isActive, "man3")
                })}
                src={man3}
                alt="Image Description"
              />
            </article>
            {/* End Article */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaleAvatars;
