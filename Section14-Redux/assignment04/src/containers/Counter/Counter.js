import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

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
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        {this.props.res ? (
          <ul>
            {this.props.res.map((res, index) => (
              <li
                key={res.id}
                onClick={() => this.props.onDeleteResult(res.id)}
              >
                {res.value}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    res: state.res.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onIncrementCounterBy5: value =>
      dispatch({ type: actionTypes.ADD_5, value: value }),
    onDecrementCounterBy5: value =>
      dispatch({ type: actionTypes.DEC_5, value: value }),
    onStoreResult: result =>
      dispatch({ type: actionTypes.STORE_RESULT, value: result }),
    onDeleteResult: id =>
      dispatch({ type: actionTypes.DELETE_RESULT, resultId: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
