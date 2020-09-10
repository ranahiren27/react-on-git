import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./home.css";

export default class Home extends Component {
  onHide() {
    return;
  }
  render() {
    return (
      <Modal
        onHide={this.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={true}
        centered
      >
        <Modal.Header style={{ background: "rgb(20,20,40)", color: "wheat" }}>
          <h2>Welcome to Basic CRUD Op</h2>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "rgb(20,20,40)",
            boxShadow: "10px 10px 9px rgb(0,0,0)",
          }}
        >
          <div className="App">
            <Link to="create">
              <Button>Add New User</Button>
            </Link>
            <Link to="view">
              <Button>View Users</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
