import React, { Component } from "react";
import "./viewUsers.css";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as viewUsersActions from "../../store/viewUsers/actions";
export default class ViewUsers extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <div className="component-view-users">Hello! component viewUsers</div>
    );
  }
}
// export default connect(
//     ({ viewUsers }) => ({ ...viewUsers }),
//     dispatch => bindActionCreators({ ...viewUsersActions }, dispatch)
//   )( viewUsers );
