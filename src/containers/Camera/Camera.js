import React, { Component } from "react";
import CameraDisplayRevTwo from "../../components/Display/CameraDisplayRevTwo";
import Navigation from "../../components/Navigation/Navigation";

const Fragment = React.Fragment;

export default class Camera extends Component {
  render() {
    const { addToCart } = this.props;
    console.log("Camera");
    return (
      <Fragment>
        <CameraDisplayRevTwo addToCart={addToCart} />
        <Navigation activeButton={"camera"} />
      </Fragment>
    );
  }
}
