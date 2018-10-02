import React from "react";
import { Link } from "react-router-dom";
import {
  shoppingcartPage__URL,
  cameraPage__URL,
  cataloguePage__URL
} from "../../config/keys";
import SvgIcon from "react-icons-kit";
import { ic_camera_alt } from "react-icons-kit/md/ic_camera_alt";
import { ic_search } from "react-icons-kit/md/ic_search";
import { ic_shopping_cart } from "react-icons-kit/md/ic_shopping_cart";

const Fragment = React.Fragment;

const Navigation = ({ activeButton }) => {
  const currentNavLayout = () => {
    console.log("activeButton is,", activeButton);
    switch (activeButton) {
      case "camera":
        return (
          <section className="navigation">
            <div className="camera active">
              <SvgIcon size={30} icon={ic_camera_alt} />
            </div>
            <Link to={cataloguePage__URL} className="catalogue">
              <SvgIcon size={30} icon={ic_search} />
            </Link>
            <Link to={shoppingcartPage__URL} className="shopping-cart">
              <SvgIcon size={30} icon={ic_shopping_cart} />
            </Link>
          </section>
        );
      case "catalogue":
        return (
          <section className="navigation">
            <Link to={cameraPage__URL} className="camera">
              <SvgIcon size={30} icon={ic_camera_alt} />
            </Link>
            <div className="catalogue active">
              <SvgIcon size={30} icon={ic_search} />
            </div>
            <Link to={shoppingcartPage__URL} className="shopping-cart">
              <SvgIcon size={30} icon={ic_shopping_cart} />
            </Link>
          </section>
        );
      case "shopping-cart":
        return (
          <section className="navigation">
            <Link to={cameraPage__URL} className="camera">
              <SvgIcon size={30} icon={ic_camera_alt} />
            </Link>
            <Link to={cataloguePage__URL} className="catalogue">
              <SvgIcon size={30} icon={ic_search} />
            </Link>
            <div className="shopping-cart active">
              <SvgIcon size={30} icon={ic_shopping_cart} />
            </div>
          </section>
        );
      default:
        break;
    }
  };

  return <Fragment>{currentNavLayout()}</Fragment>;
};

export default Navigation;
