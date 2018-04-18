import React from "react";

const userInput = props => (
  <div>
    <input
      type="text"
      onChange={props.changeUsername}
      value={props.currentName}
    />
  </div>
);

export default userInput;
