import React from "react";
import img5 from "../../assets/img5.jpg"
const Comment = () => {
  return (
    <div className="card border-0 g-mb-40">
      <div className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
        <h3 className="h6 mb-0">
          <i className="icon-heart g-pos-rel g-top-1 g-mr-5" /> Reviews{" "}
          <small>(option 1)</small>
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
        <div className="media g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-20">
          <img
            className="d-flex g-width-50 g-height-50 rounded-circle g-mt-2 g-mr-20"
            src={img5}
            alt="Image Description"
          />
          <div className="media-body">
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center g-mb-15 g-mb-10--sm">
              <header className="g-mb-5 g-mb-0--sm">
                <h5 className="h4 g-font-weight-300 g-mr-10 g-mb-5">
                  James Coolman
                </h5>
                <div className="js-rating g-color-yellow" data-rating={5}>
                  <div
                    className="g-rating"
                    style={{
                      display: "inline-block",
                      position: "relative",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                      marginLeft: "-2px",
                      marginRight: "-2px"
                    }}
                  >
                    <div
                      className="g-rating-forward"
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        height: "100%",
                        overflow: "hidden",
                        width: "100%"
                      }}
                    >
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                    </div>
                    <div
                      className="g-rating-backward"
                      style={{ position: "relative", zIndex: 1 }}
                    >
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                    </div>
                  </div>
                </div>
              </header>
              <div className="text-nowrap g-font-size-12">
                <span className="text-muted">2 days ago</span>
              </div>
            </div>
            <p>
              First of all, thank you very much for making this theme! It is
              beautiful both when looked at in the browser and especially also
              when looking at the HTML, CSS etc. source code. Close too
              Bootstrap, great technical quality and documentation: your theme
              is clearly the best! And I've really looked at and compared *lots*
              of them! :-)
            </p>
            <ul className="list-inline my-0">
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-like g-pos-rel g-top-1 g-mr-3" /> 214
                </a>
              </li>
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-dislike g-pos-rel g-top-1 g-mr-3" /> 35
                </a>
              </li>
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-share g-pos-rel g-top-1 g-mr-3" /> 52
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="media g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-20">
          <img
            className="d-flex g-width-50 g-height-50 rounded-circle g-mt-2 g-mr-20"
            src={img5}
            alt="Image Description"
          />
          <div className="media-body">
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center g-mb-15 g-mb-10--sm">
              <header className="g-mb-5 g-mb-0--sm">
                <h5 className="h4 g-font-weight-300 g-mr-10 g-mb-5">
                  David Lee
                </h5>
                <div className="js-rating g-color-yellow" data-rating={5}>
                  <div
                    className="g-rating"
                    style={{
                      display: "inline-block",
                      position: "relative",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                      marginLeft: "-2px",
                      marginRight: "-2px"
                    }}
                  >
                    <div
                      className="g-rating-forward"
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        height: "100%",
                        overflow: "hidden",
                        width: "100%"
                      }}
                    >
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                    </div>
                    <div
                      className="g-rating-backward"
                      style={{ position: "relative", zIndex: 1 }}
                    >
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                    </div>
                  </div>
                </div>
              </header>
              <div className="text-nowrap g-font-size-12">
                <span className="text-muted">3 days ago</span>
              </div>
            </div>
            <p>
              Thanks a lot. You have no idea how much I appreciate all your
              help. You are not just a great designer but an amazing human
              being, because so many people won't give a rat ass about what
              happen to their clients AFTER THE SALE, and you are not. Again,
              thanks a lot
            </p>
            <ul className="list-inline my-0">
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-like g-pos-rel g-top-1 g-mr-3" /> 178
                </a>
              </li>
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-dislike g-pos-rel g-top-1 g-mr-3" /> 14
                </a>
              </li>
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-share g-pos-rel g-top-1 g-mr-3" /> 12
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="media g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-20">
          <img
            className="d-flex g-width-50 g-height-50 rounded-circle g-mt-2 g-mr-20"
            src={img5}
            alt="Image Description"
          />
          <div className="media-body">
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center g-mb-15 g-mb-10--sm">
              <header className="g-mb-5 g-mb-0--sm">
                <h5 className="h4 g-font-weight-300 g-mr-10 g-mb-5">
                  Sally Manning
                </h5>
                <div className="js-rating g-color-yellow" data-rating={5}>
                  <div
                    className="g-rating"
                    style={{
                      display: "inline-block",
                      position: "relative",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                      marginLeft: "-2px",
                      marginRight: "-2px"
                    }}
                  >
                    <div
                      className="g-rating-forward"
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        height: "100%",
                        overflow: "hidden",
                        width: "100%"
                      }}
                    >
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                    </div>
                    <div
                      className="g-rating-backward"
                      style={{ position: "relative", zIndex: 1 }}
                    >
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                      <i
                        className="fa fa-star-o"
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                      />
                    </div>
                  </div>
                </div>
              </header>
              <div className="text-nowrap g-font-size-12">
                <span className="text-muted">2 days ago</span>
              </div>
            </div>
            <p>
              First of all, thank you very much for making this theme! It is
              beautiful both when looked at in the browser and especially also
              when looking at the HTML, CSS etc. source code. Close too
              Bootstrap, great technical quality and documentation: your theme
              is clearly the best! And I've really looked at and compared *lots*
              of them! :-)
            </p>
            <ul className="list-inline my-0">
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-like g-pos-rel g-top-1 g-mr-3" /> 214
                </a>
              </li>
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-dislike g-pos-rel g-top-1 g-mr-3" /> 35
                </a>
              </li>
              <li className="list-inline-item g-mr-20">
                <a
                  className="g-color-gray-dark-v5 g-text-underline--none--hover"
                  href="#"
                >
                  <i className="icon-share g-pos-rel g-top-1 g-mr-3" /> 52
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a className="btn btn-block u-btn-darkgray rounded-0 g-py-10" href="#">
          Load More
        </a>
      </div>
    </div>
  );
};

export default Comment;
