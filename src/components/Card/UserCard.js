import React from 'react'
import img5 from "../../assets/img5.jpg"
const UserCard = () => {
  return (
    <div className="col-md-4 g-mb-30 g-mb-0--md">
    <figure className="g-bg-white g-brd-around g-brd-gray-light-v4 g-brd-cyan--hover g-transition-0_2 text-center">
      <div className="g-py-40 g-px-20">
        <img
          className="g-width-100 g-height-100 rounded-circle g-mb-20"
          src={img5}
          alt="Image Description"
        />
        <h4 className="h5 g-mb-5">Mikel Andrews</h4>
        <div className="d-block">
          <span className="g-color-cyan g-font-size-default g-mr-3">
            <i className="icon-user" />
          </span>
          <em className="g-color-gray-dark-v4 g-font-style-normal g-font-size-default">
            Employee
          </em>
        </div>
      </div>
      <hr className="g-brd-gray-light-v4 g-my-0" />
      <ul className="row list-inline g-py-20 g-ma-0">
        <li className="col g-brd-right g-brd-gray-light-v4">
          <a
            className="u-icon-v1 u-icon-size--sm g-color-gray-dark-v5 g-bg-transparent g-color-cyan--hover"
            href="#"
          >
            <i className="icon-speech" />
          </a>
        </li>
        <li className="col g-brd-right g-brd-gray-light-v4">
          <a
            className="u-icon-v1 u-icon-size--sm g-color-gray-dark-v5 g-bg-transparent g-color-red--hover"
            href="#"
          >
            <i className="icon-envelope-letter" />
          </a>
        </li>
        <li className="col">
          <a
            className="u-icon-v1 u-icon-size--sm g-color-gray-dark-v5 g-bg-transparent g-color-purple--hover"
            href="#"
          >
            <i className="icon-screen-smartphone" />
          </a>
        </li>
      </ul>
    </figure>
  </div>
  )
}

export default UserCard
