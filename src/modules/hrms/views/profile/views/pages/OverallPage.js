import React from "react";
import Card from "../../../../../../components/Card/Card";
import CardWithScroll from "../../../../../../components/Card/withScroll";
import UsersCard from "../../../../../../components/Card/UsersCard";
import ProducTable from "../../../../../../components/Table/ProducTable";
const OverallPage = () => {
  return (
    <>
      {/* Overall Statistics */}
      <div className="row g-mb-40">
        <Card
          body={
            <div className="g-bg-cyan g-color-white g-pa-25">
              <header className="d-flex text-uppercase g-mb-40">
                <i className="icon-people align-self-center display-4 g-mr-20" />
                <div className="g-line-height-1">
                  <h4 className="h5 g-color-white">Overal Visits</h4>
                  <div
                    className="js-counter g-font-size-30"
                    data-comma-separated="true"
                  >
                    52,147
                  </div>
                </div>
              </header>
              <div className="d-flex justify-content-between text-uppercase g-mb-25">
                <div className="g-line-height-1">
                  <h5 className="h6 g-font-weight-600 g-color-white">
                    Last Week
                  </h5>
                  <div
                    className="js-counter g-font-size-16"
                    data-comma-separated="true"
                  >
                    1,385
                  </div>
                </div>
                <div className="text-right g-line-height-1">
                  <h5 className="h6 g-font-weight-600 g-color-white">
                    Last Month
                  </h5>
                  <div
                    className="js-counter g-font-size-16"
                    data-comma-separated="true"
                  >
                    6,048
                  </div>
                </div>
              </div>
              <h6 className="g-mb-10 g-color-white">
                Project Completeness{" "}
                <span className="float-right g-ml-10">72%</span>
              </h6>
              <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-10">
                <div
                  className="js-hr-progress-bar-indicator progress-bar g-bg-white u-progress-bar--xs"
                  role="progressbar"
                  style={{ width: "72%" }}
                  aria-valuenow={72}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small className="g-font-size-12">11% less than last month</small>
            </div>
          }
        />

        <Card
          body={
            <div className="g-bg-cyan g-color-white g-pa-25">
              <header className="d-flex text-uppercase g-mb-40">
                <i className="icon-people align-self-center display-4 g-mr-20" />
                <div className="g-line-height-1">
                  <h4 className="h5 g-color-white">Overal Visits</h4>
                  <div
                    className="js-counter g-font-size-30"
                    data-comma-separated="true"
                  >
                    52,147
                  </div>
                </div>
              </header>
              <div className="d-flex justify-content-between text-uppercase g-mb-25">
                <div className="g-line-height-1">
                  <h5 className="h6 g-font-weight-600 g-color-white">
                    Last Week
                  </h5>
                  <div
                    className="js-counter g-font-size-16"
                    data-comma-separated="true"
                  >
                    1,385
                  </div>
                </div>
                <div className="text-right g-line-height-1">
                  <h5 className="h6 g-font-weight-600 g-color-white">
                    Last Month
                  </h5>
                  <div
                    className="js-counter g-font-size-16"
                    data-comma-separated="true"
                  >
                    6,048
                  </div>
                </div>
              </div>
              <h6 className="g-mb-10 g-color-white">
                Project Completeness{" "}
                <span className="float-right g-ml-10">72%</span>
              </h6>
              <div className="js-hr-progress-bar progress g-bg-black-opacity-0_1 rounded-0 g-mb-10">
                <div
                  className="js-hr-progress-bar-indicator progress-bar g-bg-white u-progress-bar--xs"
                  role="progressbar"
                  style={{ width: "72%" }}
                  aria-valuenow={72}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small className="g-font-size-12">11% less than last month</small>
            </div>
          }
        />
      </div>
      {/* End Overall Statistics */}
      {/* Projects & Activities Panels */}
      <div className="row g-mb-40">
        <div className="col-lg-6 g-mb-40 g-mb-0--lg">
          {/* Latest Projects Panel */}
          <CardWithScroll
            body={
              <div
                id="mCSB_2_container"
                className="mCSB_container"
                style={{ position: "relative", top: 0, left: 0 }}
                dir="ltr"
              >
                <ul className="list-unstyled">
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img1.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          Unify Template
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        AnhularJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        PHP
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-pink-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img5.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          UX/UI Design and Backend
                        </h5>
                        <span className="small text-nowrap g-color-pink">
                          16 min ago
                        </span>
                      </div>
                      <p>
                        Hac consectetur habitasse platea dictumst, adipiscing
                        elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-color-black g-rounded-20 g-px-10">
                        JavaScript
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        Ruby
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ASP.NET
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-black-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img4.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          React Native App
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ReactJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            }
          />
          {/* End Latest Projects Panel */}
        </div>
        <div className="col-lg-6">
          {/* Activities Panel */}
          <CardWithScroll
            body={
              <div
                id="mCSB_2_container"
                className="mCSB_container"
                style={{ position: "relative", top: 0, left: 0 }}
                dir="ltr"
              >
                <ul className="list-unstyled">
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img1.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          Unify Template
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        AnhularJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        PHP
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-pink-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img5.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          UX/UI Design and Backend
                        </h5>
                        <span className="small text-nowrap g-color-pink">
                          16 min ago
                        </span>
                      </div>
                      <p>
                        Hac consectetur habitasse platea dictumst, adipiscing
                        elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-color-black g-rounded-20 g-px-10">
                        JavaScript
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        Ruby
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ASP.NET
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-black-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img4.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          React Native App
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ReactJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            }
          />
          {/* End Activities Panel */}
        </div>
      </div>
      {/* End Projects & Activities Panels */}
      {/* Projects & News Feeds Panels */}
      <div className="row g-mb-40">
        <div className="col-lg-6 g-mb-40 g-mb-0--lg">
          {/* Notifications Panel */}
          <CardWithScroll
            body={
              <div
                id="mCSB_2_container"
                className="mCSB_container"
                style={{ position: "relative", top: 0, left: 0 }}
                dir="ltr"
              >
                <ul className="list-unstyled">
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img1.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          Unify Template
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        AnhularJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        PHP
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-pink-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img5.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          UX/UI Design and Backend
                        </h5>
                        <span className="small text-nowrap g-color-pink">
                          16 min ago
                        </span>
                      </div>
                      <p>
                        Hac consectetur habitasse platea dictumst, adipiscing
                        elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-color-black g-rounded-20 g-px-10">
                        JavaScript
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        Ruby
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ASP.NET
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-black-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img4.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          React Native App
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ReactJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            }
          />
          {/* End Notifications Panel */}
        </div>
        <div className="col-lg-6">
          {/* News Feeds */}
          <CardWithScroll
            body={
              <div
                id="mCSB_2_container"
                className="mCSB_container"
                style={{ position: "relative", top: 0, left: 0 }}
                dir="ltr"
              >
                <ul className="list-unstyled">
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img1.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          Unify Template
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        AnhularJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        PHP
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-pink-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img5.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          UX/UI Design and Backend
                        </h5>
                        <span className="small text-nowrap g-color-pink">
                          16 min ago
                        </span>
                      </div>
                      <p>
                        Hac consectetur habitasse platea dictumst, adipiscing
                        elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-color-black g-rounded-20 g-px-10">
                        JavaScript
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        Ruby
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ASP.NET
                      </span>
                    </div>
                  </li>
                  <li className="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-black-left rounded g-pa-20 g-mb-10">
                    <div className="d-flex g-mt-2 g-mr-15">
                      <img
                        className="g-width-40 g-height-40 rounded-circle mCS_img_loaded"
                        src="../../assets/img-temp/100x100/img4.jpg"
                        alt="Image Description"
                      />
                    </div>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="h6 g-font-weight-600 g-color-black">
                          React Native App
                        </h5>
                        <span className="small text-nowrap g-color-blue">
                          2 min ago
                        </span>
                      </div>
                      <p>
                        Curabitur hendrerit dolor sit amet consectetur.
                        Adipiscing elitut leosit amet, consectetur eleifend.
                      </p>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        ReactJS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        CSS
                      </span>
                      <span className="u-label u-label--sm g-bg-gray-light-v4 g-color-main g-rounded-20 g-px-10">
                        HTML
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            }
          />
          {/* End News Feeds */}
        </div>
      </div>
      {/* End Projects & News Feeds Panels */}
      {/* User Contacts Panel */}
      <UsersCard />
      {/* End User Contacts Panel */}
      {/* Product Table Panel */}
      <ProducTable />
      {/* End Product Table Panel */}
    </>
  );
};

export default OverallPage;
