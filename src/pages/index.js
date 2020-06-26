import React, { Component } from "react";
import SavedRepositories from "./SavedRepositories";
import GitRepositories from "./GitRepositories";
import styles from "../assets/css/layout.css";
import { AppBar, Tabs, Tab, withStyles } from "@material-ui/core";

class Home extends Component {
  state = { selected: "Git" };
  render() {
    const { selected } = this.state;
    console.log(selected === "Git" ? true : false);
    return (
      <>
        <AppBar position="static" className="header">
          <img className="logo" src="/gcm-logo.png" alt="GCM logo" />
          <Tabs
            value={selected}
            onChange={(e, vl) => this.setState({ selected: vl })}
            centered
          >
            <Tab value="Git" id="Git" label="Git Repositories" />
            <Tab value="Saved" id="Saved" label="Saved Repositories" />
          </Tabs>
        </AppBar>
        <div className="content">{selected === "Git" ? <GitRepositories /> : <SavedRepositories />}</div>
        <footer className="footer">
          Desenvolvido por
          <a href="https://caroliveira.herokuapp.com/">
            <img
              src="/logo-carol.png"
              className="caroliveira"
              alt="Caroliveira logo"
            />
          </a>
        </footer>
      </>
    );
  }
}

export default withStyles(styles)(Home);
