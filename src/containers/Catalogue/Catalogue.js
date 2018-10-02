import React, { Component } from "react";
import CatalogueDisplay from "../../components/Display/CatalogueDisplay";
import Navigation from "../../components/Navigation/Navigation";
const Fragment = React.Fragment;

export default class Catalogue extends Component {
  render() {
    const { addToCart } = this.props;
    console.log("Catalogue");
    return (
      <Fragment>
        <CatalogueDisplay addToCart={addToCart} />
        <Navigation activeButton={"catalogue"} />
      </Fragment>
    );
  }
}
