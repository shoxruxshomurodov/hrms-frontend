import React, { Component } from "react";
import Parallax from "parallax-js";
import classNames from "classnames";
import get from "lodash/get";

class ParallaxAnimation extends Component {
  componentDidMount() {
    this.parallax = new Parallax(this.scene, {
      relativeInput: true,
      hoverOnly: true,
    });
  }

  componentWillUnmount() {
    this.parallax.disable();
  }
  render() {
    const { parallaxImages: images } = this.props;
    return (
      <ul ref={(el) => (this.scene = el)} className="scene">
        {images &&
          images.map((image) => (
            <li
              className={classNames("layer particle", get(image, "className"))}
              data-depth={get(image, "speed")}
            >
              <img src={get(image, "img")} alt="img" />
            </li>
          ))}
      </ul>
    );
  }
}

export default ParallaxAnimation;
