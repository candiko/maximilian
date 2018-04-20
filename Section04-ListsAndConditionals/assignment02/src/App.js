import React, { Component } from "react";
import ValidationComponent from "./ValidationComponent/ValidationComponent";
import CharComponent from "./CharComponent/CharComponent";
import "./App.css";

class App extends Component {
  state = {
    textLength: "",
    inputText: []
  };

  inputChangeHandler = event => {
    const inputText = event.target.value.split("");
    this.setState({
      textLength: inputText.length,
      inputText: inputText
    });
  };

  charClickHandler = index => {
    const alteredInputText = [...this.state.inputText];
    alteredInputText.splice("index", 1);
    this.setState({
      inputText: alteredInputText,
      textLength: alteredInputText.length
    });
  };

  render() {
    const chars = this.state.inputText;
    const charBoxes = chars.map((char, index) => {
      return (
        <CharComponent
          key={index}
          char={char}
          click={() => this.charClickHandler(index)}
        />
      );
    });
    const inputValue = [...this.state.inputText];
    const string = inputValue.join("");

    return (
      <div>
        <div>
          <input
            type="text"
            onChange={this.inputChangeHandler}
            value={string}
          />
          <p>{this.state.textLength}</p>
          <ValidationComponent textLength={this.state.textLength} />
        </div>
        <div>{charBoxes}</div>
      </div>
    );
  }
}

export default App;
