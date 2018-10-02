import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";
import PopupContainer from "./PopupContainer";
import { withStyles, Button } from "@material-ui/core";
import SvgIcon from "react-icons-kit";
import { ic_cloud_upload } from "react-icons-kit/md/ic_cloud_upload";

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

class CameraDisplayRevTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      open: false,
      result: null,
      popupDisplayContent: null
    };
  }

  onTakePhoto(dataUri) {
    // Do stuff with the photo...

    console.log("takePhoto");
    console.log(dataUri);
    document.querySelector("#camera--output").src = dataUri;
    this.setState({ selectedFile: dataUri });
  }

  onCameraError(error) {
    console.error("onCameraError", error);
  }

  onCameraStart(stream) {
    console.log("onCameraStart");
    console.log(this.state.selectedFile);
  }

  onCameraStop() {
    console.log("onCameraStop");
    console.log(this.state.selectedFile);
  }

  onSubmitDataUriToServer = () => {
    console.log("Submit button pressed.");
    console.log(document.querySelector("#camera--output").src);

    let imgData = document.querySelector("#camera--output").src;

    const formData = new FormData();
    formData.append("image", imgData);

    axios.post("famous-dialect-217523.appspot.com/annotations", formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
  };

  renderPopup = () => {
    if (this.state.result === "not found") {
      return (
        <div className="pop-up">
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">Not Found</div>
            <div className="pop-up__product-price">$3.99</div>
          </div>
          <div className="pop-up__middle-row">
            <div className="pop-up__label">qty</div>
            <div className="button__container">
              <div className="button button__minus">-</div>
              <div className="pop-up__quantity">1</div>
              <div className="button button__plus">+</div>
            </div>
          </div>
          <div className="pop-up__bottom-row">
            <div className="button button__cancel" onClick={this.closeModal}>
              Cancel
            </div>
            <div className="button button__add">Add</div>
          </div>
        </div>
      );
    } else if (this.state.result === "found") {
      const product = this.state.popupDisplayContent;
      return (
        <div className="pop-up">
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
          <div className="pop-up__top-row">
            <div className="pop-up__product-name">{product.product_name}</div>
            <div className="pop-up__product-price">
              ${product.price_in_cents / 100}
            </div>
          </div>
          <div className="pop-up__middle-row">
            <div className="pop-up__label">qty</div>
            <div className="button__container">
              <div className="button button__minus">-</div>
              <div className="pop-up__quantity">1</div>
              <div className="button button__plus">+</div>
            </div>
          </div>
          <div className="pop-up__bottom-row">
            <div className="button button__cancel" onClick={this.closeModal}>
              Cancel
            </div>
            <div className="button button__add" onClick={this._addItemToCart}>
              Add
            </div>
          </div>
        </div>
      );
    }
  };

  _addItemToCart = () => {
    console.log("_addItemToCart.");
    const { addToCart } = this.props;
    addToCart(this.state.popupDisplayContent);
    this.closeModal();
  };

  uploadHandler = () => {
    console.log("uploadHandler is clicked.");
    var file = dataURLtoFile(this.state.selectedFile, "hello.jpeg");
    console.log(document.cookie);
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("/annotations", formData, {
        headers: {
          "x-access-token": document.cookie
        }
      })
      .then(result => {
        if (result.data.type === "not found") {
          console.log("not found");
          this.setState({ open: true, result: "not found" });
        } else if (result.data.type === "found") {
          console.log("found");
          this.setState({
            open: true,
            result: "found",
            popupDisplayContent: result.data.product[0]
          });
        }
      })
      .catch(error => {
        console.log("error is,", error);
      });
  };

  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false, popupDisplayContent: null });
  };

  render() {
    const { classes } = this.props;
    const popup = this.state.popupDisplayContent ? (
      <PopupContainer
        open={this.state.open}
        product={this.state.popupDisplayContent}
        closeModal={this.closeModal}
        addToCart={this.props.addToCart}
      />
    ) : (
      <PopupContainer
        open={this.state.open}
        product={null}
        closeModal={this.closeModal}
        addToCart={this.props.addToCart}
      />
    );
    return (
      <div className="display">
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
          onCameraError={error => {
            this.onCameraError(error);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={{ width: 1080, height: 480 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          isMaxResolution={false}
          isImageMirror={false}
          isDisplayStartCameraError={true}
          sizeFactor={1}
          onCameraStart={stream => {
            this.onCameraStart(stream);
          }}
          onCameraStop={() => {
            this.onCameraStop();
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img src="//:0" alt="" id="camera--output" className="taken" />

          <Button
            variant="contained"
            size="large"
            color="secondary"
            style={{ margin: 0, width: "50%" }}
            className={classes.button}
            onClick={this.uploadHandler}
          >
            <SvgIcon size={30} icon={ic_cloud_upload} />
          </Button>
        </div>

        {popup}
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

export default withStyles(styles)(CameraDisplayRevTwo);
