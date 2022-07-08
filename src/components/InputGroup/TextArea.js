import React from "react";
const TextArea = ({ property, defaultValue, onChange }) => {
  return (
    <textarea
      className="form-control rounded-0 form-control-md"
      {...property}
      defaultValue={defaultValue}
      onChange={(event) => {
        onChange(event);
      }}
    />
  );
};

export default TextArea;
