import React from 'react'

const ProducTable = () => {
  return (
    <div className="card border-0">
        <div className="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
          <h3 className="h6 mb-0">
            <i className="icon-directions g-pos-rel g-top-1 g-mr-5" /> Product
            Table
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
          {/* Product Table */}
          <div className="table-responsive">
            <table className="table table-bordered u-table--v2">
              <thead className="text-uppercase g-letter-spacing-1">
                <tr>
                  <th className="g-font-weight-300 g-color-black">
                    Product Name
                  </th>
                  <th className="g-font-weight-300 g-color-black g-min-width-200">
                    Locations
                  </th>
                  <th className="g-font-weight-300 g-color-black">Status</th>
                  <th className="g-font-weight-300 g-color-black">Contacts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-middle text-nowrap">
                    <h4 className="h6 g-mb-2">Lenovo Group</h4>
                    <div
                      className="js-rating g-font-size-12 g-color-primary"
                      data-rating="3.5"
                    >
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
                            width: "70%"
                          }}
                        >
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                        <div
                          className="g-rating-backward"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex">
                      <i className="icon-location-pin g-font-size-18 g-color-gray-dark-v5 g-pos-rel g-top-5 g-mr-7" />
                      <span>389ZA2 DeClaudine, CA, USA</span>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a
                      className="btn btn-block u-btn-primary g-rounded-50 g-py-5"
                      href="#"
                    >
                      <i className="fa fa-arrows-v g-mr-5" /> Middle
                    </a>
                  </td>
                  <td className="align-middle text-nowrap">
                    <span className="d-block g-mb-5">
                      <i className="icon-phone g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      +1 4768 97655
                    </span>
                    <span className="d-block">
                      <i className="icon-envelope g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      contact@lenovo.com
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle text-nowrap">
                    <h4 className="h6 g-mb-2">Samsung Electronics</h4>
                    <div
                      className="js-rating g-font-size-12 g-color-primary"
                      data-rating="4.5"
                    >
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
                            width: "90%"
                          }}
                        >
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                        <div
                          className="g-rating-backward"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex">
                      <i className="icon-location-pin g-font-size-18 g-color-gray-dark-v5 g-pos-rel g-top-5 g-mr-7" />
                      <span>738AD Lorena Spur, London, UK</span>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a
                      className="btn btn-block u-btn-pink g-rounded-50 g-py-5"
                      href="#"
                    >
                      <i className="fa fa-level-up g-mr-5" /> High
                    </a>
                  </td>
                  <td className="align-middle text-nowrap">
                    <span className="d-block g-mb-5">
                      <i className="icon-phone g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      +44 7689 7655
                    </span>
                    <span className="d-block">
                      <i className="icon-envelope g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      users@samsung.com
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle text-nowrap">
                    <h4 className="h6 g-mb-2">Sony Corp.</h4>
                    <div
                      className="js-rating g-font-size-12 g-color-primary"
                      data-rating={2}
                    >
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
                            width: "40%"
                          }}
                        >
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                        <div
                          className="g-rating-backward"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex">
                      <i className="icon-location-pin g-font-size-18 g-color-gray-dark-v5 g-pos-rel g-top-5 g-mr-7" />
                      <span>044C1 Port Dickson, BC, Canada</span>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a
                      className="btn btn-block u-btn-cyan g-rounded-50 g-py-5"
                      href="#"
                    >
                      <i className="fa fa-sort-amount-desc g-mr-5" /> Deep
                    </a>
                  </td>
                  <td className="align-middle text-nowrap">
                    <span className="d-block g-mb-5">
                      <i className="icon-phone g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      +1 0739 3644
                    </span>
                    <span className="d-block">
                      <i className="icon-envelope g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      clients@sony.com
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle text-nowrap">
                    <h4 className="h6 g-mb-2">Apple Inc.</h4>
                    <div
                      className="js-rating g-font-size-12 g-color-primary"
                      data-rating={5}
                    >
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
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                        <div
                          className="g-rating-backward"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex">
                      <i className="icon-location-pin g-font-size-18 g-color-gray-dark-v5 g-pos-rel g-top-5 g-mr-7" />
                      <span>07W2 Donell Lodge, NY, USA</span>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a
                      className="btn btn-block u-btn-purple g-rounded-50 g-py-5"
                      href="#"
                    >
                      <i className="fa fa-level-down g-mr-5" /> Down
                    </a>
                  </td>
                  <td className="align-middle text-nowrap">
                    <span className="d-block g-mb-5">
                      <i className="icon-phone g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      +1 6589-96451
                    </span>
                    <span className="d-block">
                      <i className="icon-envelope g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      mail@appple.com
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle text-nowrap">
                    <h4 className="h6 g-mb-2">Dell Corporation</h4>
                    <div
                      className="js-rating g-font-size-12 g-color-primary"
                      data-rating={4}
                    >
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
                            width: "80%"
                          }}
                        >
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                        <div
                          className="g-rating-backward"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                          <i
                            className="fa fa-star-o"
                            style={{
                              marginLeft: "2px",
                              marginRight: "2px"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex">
                      <i className="icon-location-pin g-font-size-18 g-color-gray-dark-v5 g-pos-rel g-top-5 g-mr-7" />
                      <span>1A9WA4 Wanderben, Berlin, Germany</span>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a
                      className="btn btn-block u-btn-deeporange g-rounded-50 g-py-5"
                      href="#"
                    >
                      <i className="fa fa-bolt g-mr-5" /> Stabile
                    </a>
                  </td>
                  <td className="align-middle text-nowrap">
                    <span className="d-block g-mb-5">
                      <i className="icon-phone g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      +49 3868 4792
                    </span>
                    <span className="d-block">
                      <i className="icon-envelope g-font-size-16 g-color-gray-dark-v5 g-pos-rel g-top-2 g-mr-5" />{" "}
                      clients@dell.com
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* End Product Table */}
        </div>
      </div>
  )
}

export default ProducTable
