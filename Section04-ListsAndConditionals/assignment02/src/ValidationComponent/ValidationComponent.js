import React from "react";

const validationComponent = props => {
  let output = "";
  props.textLength < 5
    ? (output = "Text is too short. Write something more...")
    : (output = "Text is long enough. Well done, padawan.");

  return <div>{output}</div>;
};

export default validationComponent;
