import React, { Component } from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import {
  getOrgRepo,
  getUserRepo,
  getRepoContributors,
  getRepoOpenPullRequests,
  saveRepository,
} from "../services";
import styles from "../assets/css/pages.css";
import { Save, Search, HourglassEmpty } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import {
  AppBar,
  Box,
  Grid,
  TextField,
  Snackbar,
  withStyles,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

class GitRepositories extends Component {
  state = {
    type: "user",
    name: "",
    showName: "",
    nameNotFilled: false,
    repo: [],
    errorMessage: "",
    successMessage: "",
    loadingSave: false,
    loadingTable: false,
  };

  async searchRepo(e) {
    e.preventDefault();
    const { name, type } = this.state;
    if (name === "") this.setState({ nameNotFilled: true });
    else {
      const repo =
        type === "user" ? await getUserRepo(name) : await getOrgRepo(name);
      repo.message
        ? this.setState({ errorMessage: repo.message })
        : this.setState({ repo: repo, showName: name });
    }
    this.setState({ loadingTable: false });
  }

  searchBar() {
    const { type, name, nameNotFilled } = this.state;
    return (
      <AppBar position="static" className="search-bar">
        <form>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                select
                fullWidth
                label="Tipo"
                value={type}
                onChange={(evt) => this.setState({ type: evt.target.value })}
                SelectProps={{ native: true }}
                variant="outlined"
                size="small"
              >
                <option key="user" value="user">
                  Usuário
                </option>
                <option key="org" value="org">
                  Organização
                </option>
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                required
                error={nameNotFilled}
                helperText={nameNotFilled ? "Campo obrigatório!" : null}
                label="Nome"
                value={name}
                InputLabelProps={{ shrink: true }}
                onChange={(evt) =>
                  this.setState({
                    name: evt.target.value,
                    nameNotFilled: false,
                  })
                }
              />
            </Grid>
            <Grid item>
              <IconButton
                type="submit"
                onClick={(e) => {
                  this.setState({ loadingTable: true });
                  this.searchRepo(e);
                }}
              >
                <Search />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </AppBar>
    );
  }

  async saveRepo(repo) {
    const { showName } = this.state;
    const rawContributors = await getRepoContributors(showName, repo.name);
    const rawOpenPR = await getRepoOpenPullRequests(showName, repo.name);
    const contributors = rawContributors.map((el) => ({
      login: el.login,
      url: el.html_url,
      contributions: el.contributions,
    }));
    const firstsOpenPR = rawOpenPR.slice(0, 3);
    const openPR = firstsOpenPR.map((el) => ({
      title: el.title,
      url: el.html_url,
      responsable: el.user.login,
    }));
    const repository = {
      name: showName,
      url: repo.html_url,
      language: repo.language,
      contributors: contributors,
      pullRequests: openPR,
    };
    const res = await saveRepository(repository);
    res.message
      ? this.setState({ loadingSave: false, errorMessage: res.message })
      : this.setState({
          loadingSave: false,
          successMessage: "Repositório salvo com sucesso!",
        });
  }

  table() {
    const { repo, showName, loadingSave } = this.state;
    return (
      <MaterialTable
        {...tableDefaults()}
        title={`Repositórios de ${showName}`}
        columns={[{ title: "Nome", field: "name" }]}
        data={repo}
        actions={[
          {
            icon: loadingSave ? HourglassEmpty : Save,
            tooltip: "Salvar repositório",
            onClick: async (evt, rowData) => {
              this.setState({ loadingSave: true });
              this.saveRepo(rowData);
            },
          },
        ]}
      />
    );
  }

  render() {
    const { errorMessage, successMessage, repo, loadingTable } = this.state;
    return (
      <>
        {this.searchBar()}
        {loadingTable ? (
          <LinearProgress />
        ) : (
          <Box display="flex" justifyContent="center" className="sim">
            {repo.length === 0 ? (
              <p className="main-text">
                Digite o nome do usuário ou organização para continuar.
              </p>
            ) : (
              this.table()
            )}
          </Box>
        )}
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
        <Snackbar
          open={successMessage !== ""}
          autoHideDuration={6000}
          onClose={() => this.setState({ successMessage: "" })}
        >
          <Alert
            onClose={() => this.setState({ successMessage: "" })}
            severity="success"
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default withStyles(styles)(GitRepositories);
