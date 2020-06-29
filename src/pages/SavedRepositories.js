import React, { Component } from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import styles from "../assets/css/pages.css";
import { getRepositories } from "../services";
import { Alert } from "@material-ui/lab";
import { Box, Snackbar, withStyles } from "@material-ui/core";

class SavedRepositories extends Component {
  state = {
    repositories: [],
    errorMessage: "",
  };
  async componentDidMount() {
    const repositories = await getRepositories();
    repositories.message
      ? this.setState({ errorMessage: repositories.message })
      : this.setState({ repositories: repositories });
  }
  table() {
    const { repositories } = this.state;
    return (
      <MaterialTable
        {...tableDefaults()}
        title={"Repositórios salvos"}
        columns={[{ title: "Nome", field: "name" }]}
        data={repositories}
      />
    );
  }
  render() {
    const { errorMessage, repositories } = this.state;
    return (
      <>
        <Box display="flex" justifyContent="center" className="sim">
          {repositories.length === 0 ? (
            <p className="main-text">
              Não há repositórios salvos =C
            </p>
          ) : (
            this.table()
          )}
        </Box>
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={6000}
          onClose={() => this.setState({ errorMessage: "" })}
        >
          <Alert
            onClose={() => this.setState({ errorMessage: "" })}
            severity="error"
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default withStyles(styles)(SavedRepositories)