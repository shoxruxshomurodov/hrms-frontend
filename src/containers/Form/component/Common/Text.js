import React from "react";
import classNames from "classnames";

const Text = (props) => {
  const { text, className } = props;
  return (
    <p className={classNames("h4 g-font-weight-300", className)}>{text}</p>
  );
};

export default Text;
