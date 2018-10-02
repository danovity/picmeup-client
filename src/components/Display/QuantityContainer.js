import React, { Component } from "react";

export default class QuantityContainer extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
  }

  _increaseQuantity = () => {
    const newQuantity = this.state.quantity + 1;
    this.setState({
      quantity: newQuantity
    });
  };

  _decreaseQuantity = () => {
    let newQuantity = this.state.quantity;
    if (newQuantity > 1) {
      newQuantity--;
      this.setState({
        quantity: newQuantity
      });
    }
  };

  render() {
    const quantity = this.state.quantity;
    return (
      <div className="button__container">
        <div className="button button__minus" onClick={this._decreaseQuantity}>
          -
        </div>
        <div className="pop-up__quantity">{quantity}</div>
        <div className="button button__plus" onClick={this._increaseQuantity}>
          +
        </div>
      </div>
    );
  }
}
