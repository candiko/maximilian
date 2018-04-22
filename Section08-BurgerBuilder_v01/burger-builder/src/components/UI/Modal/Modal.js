import React, { Component } from "react";
import PropTypes from "prop-types";
import Auxi from "../../../hoc/Auxi/Auxi";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log("[Modal] WillUpdate.");
  }

  render() {
    return (
      <Auxi>
        <Backdrop show={this.props.show} clicked={this.props.closeModal} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1.0" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxi>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
