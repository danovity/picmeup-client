import React, { Component } from "react";
import RegisterDisplay from "../../components/Display/RegisterDisplay";
const Fragment = React.Fragment;

export default class Camera extends Component {
  render() {
    console.log("Register.");
    return (
      <Fragment>
        <RegisterDisplay />
      </Fragment>
    );
  }
}
