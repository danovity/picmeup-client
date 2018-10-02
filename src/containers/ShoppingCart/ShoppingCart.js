import React, { Component } from "react";
import CartDisplay from "../../components/Display/CartDisplay";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class ShoppingCart extends Component {
  render() {
    const { cart } = this.props;
    console.log("ShoppingCart");
    return (
      <Fragment>
        <CartDisplay cart={cart} updateCart={this.props.updateCart} />
        <Navigation activeButton={"shopping-cart"} />
      </Fragment>
    );
  }
}
