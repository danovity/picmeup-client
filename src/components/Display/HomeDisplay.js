import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { Component } from "react";
import { Redirect } from "react-router";
import Popup from "reactjs-popup";
import Typist from "react-typist";

import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";

import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Button,
  withStyles,
  Paper
} from "@material-ui/core";
import axios from "axios";
import classNames from "classnames";

class HomeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      password: "",
      email: "",
      weight: "",
      weightRange: "",
      showPassword: false,
      open: false,
      redirect: false,
      register: false,
      renderMsg: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  userSignIn = () => {
    console.log("userSignIn");
    console.log("email is,", this.state.email);
    console.log("password is,", this.state.password);

    axios
      .post("https://famous-dialect-217523.appspot.com/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        document.cookie = response.data.token;
        this.setState({ redirect: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  redirectToRegister = () => {
    this.setState({ register: true });
  };

  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  onHeaderTyped = () => {
    this.setState({ renderMsg: true });
  };

  render() {
    const { classes } = this.props;
    const { redirect, register } = this.state;
    if (redirect) {
      return <Redirect to="/catalogue" />;
    } else if (register) {
      this.setState({ register: false });
      return <Redirect to="/register" />;
    }
    return (
      <div className="display display__home">
        <AppBar position="static">
          <Toolbar>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={event => this.openModal()}
            >
              Sign In
            </Button>
          </Toolbar>
        </AppBar>
        <Paper
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "5rem",
            backgroundImage:
              "linear-gradient(to right bottom, rgb(10,13,30,1),rgb(19,25,55,0.98) )",
            color: "white"
          }}
        >
          <div className="TypistExample">
            <Typist
              className="TypistExample-header"
              avgTypingSpeed={40}
              startDelay={2000}
              onTypingDone={this.onHeaderTyped}
            >
              <p style={{ fontSize: "5rem", color: "#f50057" }}>Pic.Me.Up</p>
            </Typist>
            <div className="TypistExample-content" style={{ fontSize: "3rem" }}>
              {this.state.renderMsg ? (
                <Typist
                  className="TypistExample-message"
                  cursor={{ hideWhenDone: true }}
                >
                  * Snap and Shop
                  <Typist.Delay ms={1250} />
                  <br />* Android Only
                  <Typist.Delay ms={1250} />
                  <br />* iOS coming for versio
                  <Typist.Delay ms={500} />n 2.0
                  <Typist.Backspace count={22} delay={1000} />
                  <Typist.Delay ms={750} />
                  pending...
                  <Typist.Delay ms={1250} />
                  <br />
                  {""}
                </Typist>
              ) : null}
            </div>
          </div>
        </Paper>

        <Popup
          open={this.state.open}
          modal
          onClose={this.closeModal}
          closeOnDocumentClick
          contentStyle={{
            width: "auto",
            background: "none",
            border: "none"
          }}
        >
          <MuiThemeProvider>
            <div className="pop-up__signin">
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit">
                    SIGN IN
                  </Typography>
                </Toolbar>
              </AppBar>
              <FormControl
                className={classes.margin}
                style={{ position: "initial", padding: "1rem" }}
              >
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="adornment-email">Email</InputLabel>
                  <Input
                    id="adornment-email"
                    onChange={this.handleChange("email")}
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircle style={{ marginRight: "1.2rem" }} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={event => this.userSignIn(event)}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={event => this.redirectToRegister(event)}
              >
                Register
              </Button>
            </div>
          </MuiThemeProvider>
        </Popup>
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
export default withStyles(styles)(HomeDisplay);
