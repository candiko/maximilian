import React from "react";
import PropTypes from "prop-types";
import Auxi from "../../../hoc/Auxi";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";

const modal = props => (
  <Auxi>
    <Backdrop show={props.show} clicked={props.closeModal} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1.0" : "0"
      }}
    >
      {props.children}
    </div>
  </Auxi>
);

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default modal;
