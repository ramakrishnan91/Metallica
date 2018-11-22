import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import config from "../config.json";
import { isAuthenticatedUser } from "./../redux/Actions";

const styles = {
  root: {
    display: "flex"
  },
  tabs: {
    flexGrow: 2
  },
  profileLink: {
    textDecoration: "none"
  }
};

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
      token: "",
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.googleResponse = this.googleResponse.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({
      isAuthenticated: false,
      token: "",
      user: null,
      anchorEl: null
    });
    this.props.publishAuthenticatedUser(false);
  };

  googleResponse = response => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("http://localhost:4000/api/v1/auth/google", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
          this.props.publishAuthenticatedUser(true);
        }
      });
    });
  };

  handleFailure = error => {
    alert(error);
  };

  googleLogin = (
    <div>
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.googleResponse}
        onFailure={this.onFailure}
      />
    </div>
  );

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.root}>
          <Toolbar>
            <Tabs
              className={classes.tabs}
              value={0}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="TRADES" />
              <Tab label="TRANSFERS" disabled />
              <Tab label="TRANSPORTS" disabled />
            </Tabs>

            {!this.state.isAuthenticated && this.googleLogin}

            {this.state.isAuthenticated && (
              <div>
                <IconButton
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  className={classes.iconButton}
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar src={this.state.user.picture} />
                </IconButton>

                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-appbar"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <MenuItem onClick={this.handleClose}>
                              <a
                                className={classes.profileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={this.state.user.plus}
                              >
                                Profile
                              </a>
                            </MenuItem>
                            <MenuItem onClick={this.handleLogout}>
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapDisptachToProps = dispatch => {
  return {
    publishAuthenticatedUser: isAuthenticated => {
      dispatch(isAuthenticatedUser(isAuthenticated));
    }
  };
};

export default connect(
  null,
  mapDisptachToProps
)(withStyles(styles)(NavBar));
