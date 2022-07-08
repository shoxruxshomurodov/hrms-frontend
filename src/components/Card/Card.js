import React from "react";

const Card = (props) => {
  const {title="",body} = props;
  return (
    <div className="col-md-6 g-mb-30 g-mb-0--md">
      {body}
    </div>
  );
};

export default Card;
