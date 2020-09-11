import React, { Component } from "react";
import { Link } from "react-router-dom";
import { store } from "../../store";
import { FaRegHandPointLeft } from "react-icons/fa";
import { InputGroup, FormControl, Modal, Button } from "react-bootstrap";
import CustomToast from "../customToast/customToast";
import Loader from "react-loader-spinner";
import * as _ from "lodash";
import { addUser, updateUser } from "../../services";
import "./createUser.css";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      email: "",
      DOB: "",
      Bio: "",
      FirstNameErr: false,
      LastNameErr: false,
      emailErr: false,
      DOBErr: false,
      BioErr: false,
      toastMsg: "",
      loading: true,
      update: false,
    };
    this.isUpdate();
  }
  isUpdate = async () => {
    await this.setState({ loading: true });
    const id = this.props.match.params.id;
    const data = store.getState();
    if (this.props.match.params.id !== undefined && data !== undefined) {
      const user = data.filter((_user) => _user._id === id);
      if (user.length === 0) {
        await this.setState({ update: false });
        await this.setState({ toastMsg: `User with id ${id} is not exists!!` });
      } else {
        await this.setState({ update: true });
        const { FirstName, LastName, email, DOB, Bio } = user[0];
        const tempDate = new Date(DOB);
        const month =
          tempDate.getMonth() + 1 < 10
            ? `0${tempDate.getMonth() + 1}`
            : tempDate.getMonth() + 1;

        await this.setState({
          FirstName,
          LastName,
          email,
          DOB: `${tempDate.getFullYear()}-${month}-${tempDate.getDate()}`,
          Bio,
        });
      }
    }
    await this.setState({ loading: false });
  };
  FirstNameChange = async (e) => {
    await this.setState({ FirstName: e.target.value });
    if (_.isEmpty(this.state.FirstName)) {
      await this.setState({ FirstNameErr: true });
    } else {
      await this.setState({ FirstNameErr: false });
    }
  };
  LastNameChange = async (e) => {
    await this.setState({ LastName: e.target.value });
    if (_.isEmpty(this.state.LastName)) {
      await this.setState({ LastNameErr: true });
    } else {
      await this.setState({ LastNameErr: false });
    }
  };
  emailChange = async (e) => {
    const emailIdRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    await this.setState({ email: e.target.value });
    if (_.isEmpty(this.state.email) || !emailIdRegEx.test(this.state.email)) {
      await this.setState({ emailErr: true });
    } else {
      await this.setState({ emailErr: false });
    }
  };
  DOBChange = async (e) => {
    await this.setState({ DOB: e.target.value });
    console.log(this.state.DOB);
    if (_.isEmpty(this.state.DOB)) {
      await this.setState({ DOBErr: true });
    } else {
      await this.setState({ DOBErr: false });
    }
  };
  BioChange = async (e) => {
    await this.setState({ Bio: e.target.value });
    if (_.isEmpty(this.state.Bio)) {
      await this.setState({ BioErr: true });
    } else {
      await this.setState({ BioNameErr: false });
    }
  };
  validation = async () => {
    if (_.isEmpty(this.state.FirstName)) {
      await this.setState({ FirstNameErr: true });
      return false;
    }
    if (_.isEmpty(this.state.LastName)) {
      await this.setState({ LastNameErr: true });
      return false;
    }
    const emailIdRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (_.isEmpty(this.state.email) || !emailIdRegEx.test(this.state.email)) {
      await this.setState({ emailErr: true });
      return false;
    }
    if (_.isEmpty(this.state.DOB)) {
      await this.setState({ DOBErr: true });
      return false;
    }
    if (_.isEmpty(this.state.Bio)) {
      await this.setState({ BioErr: true });
      return false;
    }
    return true;
  };
  handleSubmit = async (e) => {
    await this.setState({ loading: true });
    e.preventDefault();
    if (await this.validation()) {
      const state = this.state;
      const { FirstName, LastName, email, DOB, Bio } = state;
      try {
        let response;
        if (!this.state.update) {
          response = await addUser({
            FirstName,
            LastName,
            email,
            DOB,
            Bio,
          });
        }
        if (this.state.update) {
          response = await updateUser(
            {
              FirstName,
              LastName,
              email,
              DOB,
              Bio,
            },
            this.props.match.params.id
          );
        }
        console.log(response);
        if (response.data.isBoom) {
          await this.setState({
            toastMsg: response.data.output.payload.message,
          });
        } else {
          const msg = this.state.update
            ? `User with id ${this.props.match.params.id} is updated Successfully!!`
            : "New User Added Successfully!!";
          await this.setState({ toastMsg: msg });
          if (!this.state.update) {
            this.setState({
              FirstName: "",
              LastName: "",
              email: "",
              DOB: "",
              Bio: "",
            });
          }
        }
      } catch (error) {}
    }
    await this.setState({ loading: false });
  };
  render() {
    var today = new Date().toISOString().split("T")[0];
    const state = this.state;
    const { FirstNameErr, LastNameErr, emailErr, DOBErr, BioErr } = this.state;
    const errorStyle = { border: "1px solid red" };
    const FirstNameStyle = FirstNameErr ? errorStyle : {};
    const LastNameStyle = LastNameErr ? errorStyle : {};
    const emailStyle = emailErr ? errorStyle : {};
    const DOBStyle = DOBErr ? errorStyle : {};
    const BioStyle = BioErr ? errorStyle : {};
    console.log(this.state.update);

    return (
      <div>
        <Modal
          onHide={(e) => {
            return;
          }}
          size="lg"
          show={true}
          centered
        >
          <Modal.Header style={{ background: "rgb(20,20,40)", color: "wheat" }}>
            {!this.state.update && <h2>Add New User</h2>}
            {this.state.update && <h2>Update User Details</h2>}
          </Modal.Header>

          <Modal.Body
            style={{
              background: "rgb(20,20,40)",
              boxShadow: "10px 10px 9px rgb(0,0,0)",
            }}
          >
            {this.state.loading && (
              <Loader
                style={{ textAlign: "center" }}
                type="Audio"
                color="#00BFFF"
                height={80}
                width={80}
              />
            )}
            {!this.state.loading && (
              <form>
                <InputGroup className="mb-3 form-input">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="form-input" id="basic-addon1">
                      First Name
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="First Name"
                    value={state.FirstName}
                    onChange={this.FirstNameChange}
                    style={FirstNameStyle}
                  />
                </InputGroup>
                <InputGroup className="mb-3 form-input">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="form-input" id="basic-addon1">
                      Last Name
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Last Name"
                    value={state.LastName}
                    onChange={this.LastNameChange}
                    style={LastNameStyle}
                  />
                </InputGroup>
                <InputGroup className="mb-3 form-input">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="form-input" id="basic-addon1">
                      Email
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Email"
                    value={state.email}
                    onChange={this.emailChange}
                    style={emailStyle}
                    type="email"
                  />
                </InputGroup>
                <InputGroup className="mb-3 form-input">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="form-input" id="basic-addon1">
                      Date Of Birth
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Date Of Birth"
                    value={state.DOB}
                    style={DOBStyle}
                    onChange={this.DOBChange}
                    type="date"
                    min={today}
                  />
                </InputGroup>
                <InputGroup className="mb-3 form-input">
                  <InputGroup.Prepend>
                    <InputGroup.Text className="form-input">
                      Sort Bio:
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    value={state.Bio}
                    onChange={this.BioChange}
                    style={BioStyle}
                  />
                </InputGroup>
                <br />
                <div id="msg"></div>
                <InputGroup className="mb-3">
                  {!this.state.update && (
                    <FormControl
                      onClick={this.handleSubmit}
                      type="submit"
                      value="Add User"
                    />
                  )}
                  {this.state.update && (
                    <FormControl
                      onClick={this.handleSubmit}
                      type="submit"
                      value="Update User"
                    />
                  )}
                </InputGroup>
                <Link to="">
                  <Button>
                    <FaRegHandPointLeft /> Back
                  </Button>
                </Link>
                {!_.isEmpty(this.state.toastMsg) && (
                  <div>
                    <CustomToast msg={this.state.toastMsg} />
                  </div>
                )}{" "}
              </form>
            )}{" "}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
