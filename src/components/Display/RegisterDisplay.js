import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import {
  InputAdornment,
  IconButton,
  ListItem,
  List,
  TextField,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Paper
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import axios from "axios";

import classNames from "classnames";

class RegisterDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordConfirmation: "",
      email: "",
      firstName: "",
      lastName: "",
      registered: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowPasswordConfirmation = () => {
    this.setState(state => ({
      showPasswordConfirmation: !state.showPasswordConfirmation
    }));
  };

  userToBeRegistered = () => {
    console.log("userToBeRegistered.");
    console.log("email is,", this.state.email);
    console.log("password is,", this.state.password);
    console.log("passwordConfirmation is,", this.state.passwordConfirmation);

    if (this.state.password === this.state.passwordConfirmation) {
      axios
        .post("/register", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          console.log(response.data);
          this.setState({ registered: true });
        })
        .catch(error => {
          console.log("error is,", error);
          alert("User is already registered.");
        });
    }
  };

  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const { registered } = this.state;

    if (registered) {
      return <Redirect to="/" />;
    }
    return (
      <MuiThemeProvider>
        <div className="display display__home">
          <div className="register">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="display1" color="inherit">
                  New User
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper
              style={{
                marginTop: "1rem",
                marginLeft: "1rem",
                marginRight: "1rem",
                padding: "1rem"
              }}
            >
              <List>
                <ListItem>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-adornment-firstName"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange("firstName")}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-adornment-lastName"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange("lastName")}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-adornment-email"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-adornment-password"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    InputProps={{
                      endAdornment: (
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
                      )
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-adornment-passwordConfirmation"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Confirm Password"
                    value={this.state.passwordConfirmation}
                    onChange={this.handleChange("passwordConfirmation")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPasswordConfirmation}
                          >
                            {this.state.showPasswordConfirmation ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </ListItem>
                <ListItem
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to="/">Already registered? Click to sign in.</Link>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ margin: 0 }}
                    className={classes.button}
                    onClick={this.userToBeRegistered}
                  >
                    Register
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
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
export default withStyles(styles)(RegisterDisplay);
