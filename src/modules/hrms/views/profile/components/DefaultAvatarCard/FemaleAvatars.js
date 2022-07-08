import React from 'react'
import woman1 from "../../../../../../assets/profile/woman1.svg"
import woman2 from "../../../../../../assets/profile/woman2.svg"
import woman3 from "../../../../../../assets/profile/woman3.svg"
const FemaleAvatars = ({AvatarIconType}) => {
  return (
    <div id="shortcode6">
        <div className="shortcode-html">
          <div className="row">
            <div className="col-lg-4 g-mb-30">
              {/* Article */}
              <article className="u-shadow-v1-4 pointer" onClick={() =>AvatarIconType("woman1")} >
                <img className="img-fluid w-100" src={woman1} alt="Image Description" />
                <div className="g-bg-white g-pa-25">
                  <ul className="list-inline small g-color-gray-dark-v4 g-mb-20">
                    <li className="list-inline-item">
                      <a className="text-uppercase btn btn-xs u-btn-pink rounded-0" href="#">Tech</a>
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">July 02, 2017</li>
                  </ul>
                  <h3 className="h2 g-font-weight-300 g-mb-40">
                    <a className="u-link-v5 g-color-main g-color-primary--hover" href="#">There are many great solutions in Unify for your business</a>
                  </h3>
                  <div className="media g-font-size-12">
                    <img className="d-flex rounded-circle g-width-30 g-height-30 g-mr-10" src="../../assets/img-temp/100x100/img14.jpg" alt="Image Description" />
                    <div className="media-body align-self-center">
                      <a className="u-link-v5 text-uppercase g-color-main g-color-primary--hover" href="#">Jane Doe</a>
                    </div>
                    <div className="align-self-center">
                      <a className="u-link-v5 g-color-main g-color-primary--hover g-mr-10" href="#">
                        <i className="icon-bubbles align-middle g-mr-2" />
                        124
                      </a>
                      <a className="u-link-v5 g-color-main g-color-primary--hover" href="#">
                        <i className="icon-eye align-middle g-mr-2" />
                        237
                      </a>
                    </div>
                  </div>
                </div>
              </article>
              {/* End Article */}
            </div>
            <div className="col-lg-4 g-mb-30">
              {/* Article */}
              <article className="u-shadow-v1-4 pointer" onClick={() =>AvatarIconType("woman2")}>
                <img className="img-fluid w-100" src={woman2} alt="Image Description" />
                <div className="g-bg-white g-pa-25">
                  <ul className="list-inline small g-color-gray-dark-v4 g-mb-20">
                    <li className="list-inline-item">
                      <a className="text-uppercase btn btn-xs u-btn-yellow rounded-0" href="#">Business</a>
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">July 02, 2017</li>
                  </ul>
                  <h3 className="h2 g-font-weight-300 g-mb-40">
                    <a className="u-link-v5 g-color-main g-color-primary--hover" href="#">Focused on helping our clients to build a great business</a>
                  </h3>
                  <div className="media g-font-size-12">
                    <img className="d-flex rounded-circle g-width-30 g-height-30 g-mr-10" src="../../assets/img-temp/100x100/img5.jpg" alt="Image Description" />
                    <div className="media-body align-self-center">
                      <a className="u-link-v5 text-uppercase g-color-main g-color-primary--hover" href="#">Kathy Reyes</a>
                    </div>
                    <div className="align-self-center">
                      <a className="u-link-v5 g-color-main g-color-primary--hover g-mr-10" href="#">
                        <i className="icon-bubbles align-middle g-mr-2" />
                        24
                      </a>
                      <a className="u-link-v5 g-color-main g-color-primary--hover" href="#">
                        <i className="icon-eye align-middle g-mr-2" />
                        108
                      </a>
                    </div>
                  </div>
                </div>
              </article>
              {/* End Article */}
            </div>
            <div className="col-lg-4 g-mb-30">
              {/* Article */}
              <article className="u-shadow-v1-4 pointer" onClick={() =>AvatarIconType("woman3")} >
                <img className="img-fluid w-100" src={woman3} alt="Image Description" />
                <div className="g-bg-white g-pa-25">
                  <ul className="list-inline small g-color-gray-dark-v4 g-mb-20">
                    <li className="list-inline-item">
                      <a className="text-uppercase btn btn-xs u-btn-darkpurple rounded-0" href="#">UX Design</a>
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">July 02, 2017</li>
                  </ul>
                  <h3 className="h2 g-font-weight-300 g-mb-40">
                    <a className="u-link-v5 g-color-main g-color-primary--hover" href="#">We build your website to realise your vision and best product</a>
                  </h3>
                  <div className="media g-font-size-12">
                    <img className="d-flex rounded-circle g-width-30 g-height-30 g-mr-10" src="../../assets/img-temp/100x100/img4.jpg" alt="Image Description" />
                    <div className="media-body align-self-center">
                      <a className="u-link-v5 text-uppercase g-color-main g-color-primary--hover" href="#">David Gates</a>
                    </div>
                    <div className="align-self-center">
                      <a className="u-link-v5 g-color-main g-color-primary--hover g-mr-10" href="#">
                        <i className="icon-bubbles align-middle g-mr-2" />
                        17
                      </a>
                      <a className="u-link-v5 g-color-main g-color-primary--hover" href="#">
                        <i className="icon-eye align-middle g-mr-2" />
                        66
                      </a>
                    </div>
                  </div>
                </div>
              </article>
              {/* End Article */}
            </div>
          </div>
        </div>
      </div>
  )
}

export default FemaleAvatars
