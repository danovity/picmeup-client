import React, { Component } from "react";
import Camera from "./containers/Camera/Camera";
import Home from "./containers/Home/Home";
import Register from "./containers/Register/Register";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import Catalogue from "./containers/Catalogue/Catalogue";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  addToCart = product => {
    const updatedCart = this.state.cart;
    updatedCart.push(product);
    this.setState({ cart: updatedCart });
  };

  updateCart = cartList => {
    this.setState({
      cart: cartList
    });
  };

  render() {
    console.log("App Cart:", this.state.cart);
    return (
      <Router>
        <div className="container">
          <Route exact path={"/"} component={() => <Home />} />
          <Route exact path={"/register"} component={() => <Register />} />
          <Route
            exact
            path={"/camera"}
            component={() => <Camera addToCart={this.addToCart} />}
          />
          <Route
            exact
            path={"/catalogue"}
            component={() => (
              <Catalogue addToCart={this.addToCart} cart={this.state.cart} />
            )}
          />
          <Route
            exact
            path={"/shoppingcart"}
            component={() => (
              <ShoppingCart
                updateCart={this.updateCart}
                cart={this.state.cart}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
