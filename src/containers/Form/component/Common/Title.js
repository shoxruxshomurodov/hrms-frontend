import React from "react";
import classNames from "classnames";

const Title = (props) => {
  const { title, className } = props;
  return (
    <h1
      className={classNames(
        "g-font-weight-300 g-letter-spacing-1 g-mb-15",
        className
      )}
    >
      {title}
    </h1>
  );
};

export default Title;
