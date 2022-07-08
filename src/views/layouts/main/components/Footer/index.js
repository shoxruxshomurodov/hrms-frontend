import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="u-footer--bottom-sticky g-bg-white g-color-gray-dark-v6 g-brd-top g-brd-gray-light-v7 g-pa-20"
    >
      <div className="row align-items-center">
        {/* Footer Nav */}
        <div className="col-md-4 g-mb-10 g-mb-0--md">
          <ul className="list-inline text-center text-md-left mb-0">
            <li className="list-inline-item">
              <a
                className="g-color-gray-dark-v6 g-color-secondary--hover"
                href="#"
              >
                FAQ
              </a>
            </li>
            <li className="list-inline-item">
              <span className="g-color-gray-dark-v6">|</span>
            </li>
            <li className="list-inline-item">
              <a
                className="g-color-gray-dark-v6 g-color-secondary--hover"
                href="#"
              >
                Support
              </a>
            </li>
            <li className="list-inline-item">
              <span className="g-color-gray-dark-v6">|</span>
            </li>
            <li className="list-inline-item">
              <a
                className="g-color-gray-dark-v6 g-color-secondary--hover"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        {/* End Footer Nav */}
        {/* Footer Socials */}
        <div className="col-md-4 g-mb-10 g-mb-0--md">
          <ul className="list-inline g-font-size-16 text-center mb-0">
            <li className="list-inline-item g-mx-10">
              <a href="#" className="g-color-facebook g-color-secondary--hover">
                <i className="fa fa-facebook-square" />
              </a>
            </li>
            <li className="list-inline-item g-mx-10">
              <a
                href="#"
                className="g-color-google-plus g-color-secondary--hover"
              >
                <i className="fa fa-google-plus" />
              </a>
            </li>
            <li className="list-inline-item g-mx-10">
              <a href="#" className="g-color-black g-color-secondary--hover">
                <i className="fa fa-github" />
              </a>
            </li>
            <li className="list-inline-item g-mx-10">
              <a href="#" className="g-color-twitter g-color-secondary--hover">
                <i className="fa fa-twitter" />
              </a>
            </li>
          </ul>
        </div>
        {/* End Footer Socials */}
        {/* Footer Copyrights */}
        <div className="col-md-4 text-center text-md-right">
          <small className="d-block g-font-size-default">
            © 2020 Htmlstream. All Rights Reserved.
          </small>
        </div>
        {/* End Footer Copyrights */}
      </div>
    </footer>
  );
};

export default Footer;
