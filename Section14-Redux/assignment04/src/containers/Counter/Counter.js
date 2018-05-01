import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label="Add 5"
          clicked={() => this.props.onIncrementCounterBy5(5)}
        />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onDecrementCounterBy5(5)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    onIncrementCounterBy5: value => dispatch({ type: "ADD_5", value: value }),
    onDecrementCounterBy5: value => dispatch({ type: "DEC_5", value: value })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
