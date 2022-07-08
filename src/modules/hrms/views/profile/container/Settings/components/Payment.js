import React from "react";

const Payment = (props) => {
  return (
    <div
      className="tab-pane fade active show"
      id="nav-1-1-default-hor-left-underline--3"
      role="tabpanel"
      data-parent="#nav-1-1-default-hor-left-underline"
    >
      <h2 className="h4 g-font-weight-300">Manage your Payment Settings</h2>
      <p className="g-mb-25">Below are the payment options for your account.</p>
      <form>
        {/* Payment Options */}
        <div className="row">
          {/* Visa Card */}
          <div className="col-md-3">
            <label className="u-check w-100 g-mb-25">
              <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-mb-10">
                Visa card
              </strong>
              <input
                className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                type="radio"
                name="profilePayments"
                defaultChecked
              />
              <div className="g-brd-primary--checked g-bg-primary-opacity-0_2--checked g-brd-around g-brd-gray-light-v2 g-rounded-5">
                <div className="media g-pa-12">
                  <div className="media-body align-self-center g-color-blue">
                    <i className="fa fa-cc-visa g-font-size-30 align-self-center mx-auto" />
                  </div>
                  <div className="d-flex align-self-center g-width-20 g-ml-15">
                    <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          {/* End Visa Card */}
          {/* Master Card */}
          <div className="col-md-3">
            <label className="u-check w-100 g-mb-25">
              <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-mb-10">
                Master card
              </strong>
              <input
                className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                type="radio"
                name="profilePayments"
              />
              <div className="g-brd-primary--checked g-bg-primary-opacity-0_2--checked g-brd-around g-brd-gray-light-v2 g-rounded-5">
                <div className="media g-pa-12">
                  <div className="media-body align-self-center g-color-lightred">
                    <i className="fa fa-cc-mastercard g-font-size-30 align-self-center mx-auto" />
                  </div>
                  <div className="d-flex align-self-center g-width-20 g-ml-15">
                    <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          {/* End Master Card */}
          {/* Amazon Payments */}
          <div className="col-md-3">
            <label className="u-check w-100 g-mb-25">
              <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-mb-10">
                Amazon payments
              </strong>
              <input
                className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                type="radio"
                name="profilePayments"
              />
              <div className="g-brd-primary--checked g-bg-primary-opacity-0_2--checked g-brd-around g-brd-gray-light-v2 g-rounded-5">
                <div className="media g-pa-12">
                  <div className="media-body align-self-center g-color-orange">
                    <i className="fa fa-amazon g-font-size-30 align-self-center mx-auto" />
                  </div>
                  <div className="d-flex align-self-center g-width-20 g-ml-15">
                    <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          {/* End Amazon Payments */}
          {/* Paypal */}
          <div className="col-md-3">
            <label className="u-check w-100 g-mb-25">
              <strong className="d-block g-color-gray-dark-v2 g-font-weight-700 g-mb-10">
                Paypal
              </strong>
              <input
                className="g-hidden-xs-up g-pos-abs g-top-10 g-right-10"
                type="radio"
                name="profilePayments"
              />
              <div className="g-brd-primary--checked g-bg-primary-opacity-0_2--checked g-brd-around g-brd-gray-light-v2 g-rounded-5">
                <div className="media g-pa-12">
                  <div className="media-body align-self-center g-color-darkblue">
                    <i className="fa fa-paypal g-font-size-30 align-self-center mx-auto" />
                  </div>
                  <div className="d-flex align-self-center g-width-20 g-ml-15">
                    <div className="u-check-icon-radio-v5 g-pos-rel g-width-20 g-height-20">
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          {/* End Paypal */}
        </div>
        {/* End Payment Options */}
        {/* Card Name and Number */}
        <div className="row">
          {/* Card Name */}
          <div className="col-md-6">
            <div className="form-group g-mb-20">
              <label
                className="g-color-gray-dark-v2 g-font-weight-700 g-mb-10"
                htmlFor="inputGroup1_1"
              >
                Name on card
              </label>
              <div className="input-group g-brd-primary--focus">
                <input
                  className="form-control form-control-md border-right-0 rounded-0 g-py-13 pr-0"
                  type="text"
                  placeholder="John Doe"
                />
                <div className="input-group-append">
                  <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                    <i className="icon-user" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Card Name */}
          {/* Card Number */}
          <div className="col-md-6">
            <div className="form-group g-mb-20">
              <label
                className="g-color-gray-dark-v2 g-font-weight-700 g-mb-10"
                htmlFor="inputGroup1_1"
              >
                Card number
              </label>
              <div className="input-group g-brd-primary--focus">
                <input
                  id="inputGroup1_3"
                  className="form-control form-control-md g-brd-right-none rounded-0 g-py-13"
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  data-mask="9999-9999-9999-9999"
                />
                <div className="input-group-append">
                  <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                    <i className="icon-credit-card" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Card Number */}
        </div>
        {/* End Card Name and Number */}
        {/* Card Expiration Dates and CVV Code */}
        <div className="row">
          {/* Expiration Month */}
          <div className="col-md-4">
            <label
              className="g-color-gray-dark-v2 g-font-weight-700 g-mb-10"
              htmlFor="inputGroup1_1"
            >
              Expiration month
            </label>
            <select
              className="js-custom-select u-select-v1 g-brd-gray-light-v2 g-color-gray-dark-v5 w-100 g-pt-11 g-pb-10"
              data-placeholder="Month"
              data-open-icon="fa fa-angle-down"
              data-close-icon="fa fa-angle-up"
              // style={{ display: "none" }}
            >
              <option selected>Month</option>
              <option value={1}>January</option>
              <option value={1}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          {/* End Expiration Month */}
          {/* Expiration Year */}
          <div className="col-md-4">
            <div className="form-group g-mb-20">
              <label
                className="g-color-gray-dark-v2 g-font-weight-700 g-mb-10"
                htmlFor="inputGroup1_1"
              >
                Expiration year
              </label>
              <div className="input-group g-brd-primary--focus">
                <input
                  className="form-control form-control-md border-right-0 rounded-0 g-py-13 pr-0"
                  type="text"
                  placeholder={2021}
                />
                <div className="input-group-append">
                  <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                    <i className="icon-calendar" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Expiration Year */}
          {/* CVV Code */}
          <div className="col-md-4">
            <div className="form-group g-mb-20">
              <label
                className="g-color-gray-dark-v2 g-font-weight-700 g-mb-10"
                htmlFor="inputGroup1_1"
              >
                CVV code
              </label>
              <div className="input-group g-brd-primary--focus">
                <input
                  className="form-control form-control-md border-right-0 rounded-0 g-py-13 pr-0"
                  type="text"
                  placeholder={2021}
                />
                <div className="input-group-append">
                  <span className="input-group-text g-bg-white g-color-gray-light-v1 rounded-0">
                    <i className="icon-lock" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End CVV Code */}
        </div>
        {/* End Card Expiration Dates and CVV Code */}
        {/* Billing Address */}
        <div className="form-group">
          <label className="d-block g-color-gray-dark-v2 g-font-weight-700 1text-sm-right g-mb-10">
            Billing address
          </label>
          <label className="u-check g-pl-25 mb-0">
            <input
              className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"
              type="checkbox"
            />
            <div className="u-check-icon-checkbox-v4 g-absolute-centered--y g-left-0">
              <i className="fa" data-check-icon="" />
            </div>
            Same as shipping address?
          </label>
        </div>
        {/* End Billing Address */}
        <hr className="g-brd-gray-light-v4 g-my-25" />
        <div className="text-sm-right">
          <a
            className="btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10"
            href="#"
          >
            Cancel
          </a>
          <a className="btn u-btn-primary rounded-0 g-py-12 g-px-25" href="#">
            Save Changes
          </a>
        </div>
      </form>
    </div>
  );
};

export default Payment;
