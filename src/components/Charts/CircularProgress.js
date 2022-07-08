import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Circular = (props) => {
  const { value = "", title = "Consulting" } = props;
  return (
    <div
      className="g-mr-40 g-mb-20"
      style={{ width: "100px", height: "100px" }}
    >
      <CircularProgressbar value={value} text={`${value}%`} strokeWidth={5} />
      <h4 className="h6 g-font-weight-300 g-mt-5">{title}</h4>
    </div>
  );
};

export default Circular;
