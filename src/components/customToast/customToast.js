import React from "react";
import { Toast } from "react-bootstrap";
import "./customToast.css";

export default class CustomToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  setShow = (state) => {
    this.setState({ show: state });
  };
  render() {
    return (
      <Toast
        onClose={() => this.setShow(false)}
        show={this.state.show}
        delay={3000}
        autohide
      >
        <Toast.Body>{this.props.msg}</Toast.Body>
      </Toast>
    );
  }
}
