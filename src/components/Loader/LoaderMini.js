import React, { Component } from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
class LoaderMini extends Component {
  render() {
    const override = css`
      display: inline-block;
      margin: 0 auto;
      border-color: #fff;
    `;
    return <BeatLoader size={5} color="#fff" css={override} />;
  }
}

export default LoaderMini;
