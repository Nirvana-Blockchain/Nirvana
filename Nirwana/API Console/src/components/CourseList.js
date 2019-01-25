import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import io from "socket.io-client";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AppConfig from "../config";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class CourseList extends Component {
  getNodeStatus() {
    fetch(AppConfig.config.serverUrl + `/eth/getNodeStatus`)
      .then(response => response.json())
      .then(data => {
        var peerCount = data.peerCount;
        if (peerCount > 0) {
          this.setState({ peerCount: "Connected : Peers " + peerCount });
        } else {
          this.setState({ peerCount: "Not Connected" });
        }
        this.getAccounts();
        this.setupSocket(this);
      })
      .catch(e => e);
  }

  getCode() {
    fetch(AppConfig.config.serverUrl + `/eth/getCode`)
      .then(response => response.json())
      .then(data => {})
      .catch(e => e);
  }

  getBlock() {
    fetch(AppConfig.config.serverUrl + `/eth/getBlock`)
      .then(response => response.json())
      .then(data => {})
      .catch(e => e);
  }

  getAccounts = () => {
    fetch(AppConfig.config.serverUrl + `/eth/getAccounts`)
      .then(response => response.json())
      .then(data => {
        this.setState({ accountList: data.data });
      })
      .catch(e => e);
  };

  createAccount = () => {
    var that = this;
    var payload = { password: this.state.password };
    fetch(AppConfig.config.serverUrl + `/personal/newAccount`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.getAccounts();
        alert(JSON.stringify(data));
      });
  };

  setTheState(payload) {
    this.setState(payload);
  }
  setupSocket(cls) {
    const socket = io("http://5bbbd2db.ngrok.io", { transport: ["websocket"] });

    socket.on("connect", function() {
      console.log("Socket Connected");
      cls.setState({ eventLister: "Connected" });
    });
    socket.on("event", function(data) {
      console.log("Socket event");
    });
    socket.on("disconnect", function() {
      console.log("Socket disconnect");
    });

    socket.on("news", function() {
      console.log("Socket emit new ");
    });

    socket.on("NodeStatus", function() {
      console.log("Socket emit new ");
    });
  }

  styles = theme => ({
    root: {
      display: "flex"
    },
    groot: {
      flexGrow: 1,
      backgroundColor: "red"
    },
    paper: {
      height: "100%"
    },
    control: {
      padding: theme.spacing.unit * 2
    }
  });

  constructor() {
    super();
    this.state = {
      accountList: [],
      searchString: "",
      password: "",
      account: "",
      dense: false,
      secondary: false,
      peerCount: "0",
      eventLister: "Not Connected"
    };
  }

  componentWillMount() {
    this.getNodeStatus();
  }

  handleChange = event => {
    console.log(event);
    this.setState({ account: event.target.value });
  };

  setPassword = event => {
    if (event.target.value) {
      this.setState({ password: event.target.value });
    } else {
      this.setState({ password: "" });
    }
  };

  render() {
    console.log("account list is ", this.state.accountList);
    const { classes } = this.props;
    const { dense, secondary } = this.state;
    return (
      <div>
        <div>
          Node Status-> {this.state.peerCount}
          Event Listener-> {this.state.eventLister}
          <TextField
            style={{ padding: 24 }}
            id="searchInput"
            placeholder="Enter Pasword"
            margin="normal"
            value={this.state.password}
            onChange={this.setPassword}
          />
          <TextField
            style={{ padding: 24 }}
            id="searchInput"
            placeholder="Enter Passphrase"
            margin="normal"
            onChange={this.onSearchInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.createAccount}
          >
            Create Account
          </Button>
          <FormControl style={{ minWidth: 160 }}>
            <InputLabel htmlFor="accont">Select Account</InputLabel>

            <Select
              value={this.state.account}
              onChange={this.handleChange}
              inputProps={{
                name: "account",
                id: "accont"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.accountList.map(value => (
                <MenuItem value={value}>
                  <em>{value} account</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Lock Account
          </Button>
          <Button variant="contained" color="primary">
            Unloack Account
          </Button>
        </div>
        <div>
          <Grid container style={{ backgroundColor: "white", height: 800 }}>
            <Grid
              container
              xs={12}
              alignItems="center"
              direction="ro"
              justify="center"
            >
              <Grid key={2} item xs={2} style={{ height: "100%" }}>
                <Paper style={{ height: "100%" }}>Left</Paper>
              </Grid>

              <Grid key={2} item xs={8} style={{ height: "100%" }}>
                <Paper style={{ height: "100%" }}>Center</Paper>
              </Grid>

              <Grid
                key={2}
                item
                xs={2}
                backgroundColor="red"
                style={{ height: "100%" }}
                alignItems="center"
                direction="row"
                justify="center"
              >
                <Grid key={2} item style={{ height: "50%" }}>
                  <Paper style={{ height: "100%" }}>
                    <List component="nav" style={{ width: 300 }}>
                      {"             Account List"}
                      {this.state.accountList.map(value => (
                        <ListItem
                          button
                          selected={this.state.selectedIndex === 2}
                          onClick={event => this.handleListItemClick(event, 2)}
                        >
                          <ListItemText primary={value} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>

                <Grid key={2} item style={{ height: "50%" }}>
                  <Paper style={{ height: "100%" }}>Bottom</Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div>
          <div />
        </div>
      </div>
    );
  }
}
export default CourseList;
