import React, { Component } from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import styles from "../assets/css/pages.css";
import { getRepositories, deleteRepository } from "../services";
import Snackbar from "../components/Snackbar";
import ContributorsModal from "../components/ContributorsModal";
import PullRequestsDialog from "../components/PullRequestsDialog";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
  withStyles,
} from "@material-ui/core";
import { Delete, Group, Description } from "@material-ui/icons";

class SavedRepositories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      errorMessage: "",
      loadingTable: true,
      deleteError: "",
      deleteSuccess: "",
      confirmDelete: false,
      repository: "",
      contributorsModal: false,
      pullRequestsDialog: false,
    };
  }

  async componentDidMount() {
    const repositories = await getRepositories();
    repositories.message
      ? this.setState({
          errorMessage: repositories.message,
          loadingTable: false,
        })
      : this.setState({ repositories: repositories, loadingTable: false });
  }

  async deleteRepo(id) {
    const res = await deleteRepository(id);
    if (res.message) {
      this.setState({ deleteError: res.message });
    } else {
      this.setState({
        loadingTable: true,
        deleteSuccess: "Repositório removido com sucesso!",
      });
      const repositories = await getRepositories();
      repositories.message
        ? this.setState({
            errorMessage: repositories.message,
            loadingTable: false,
          })
        : this.setState({ repositories: repositories, loadingTable: false });
    }
  }
  table() {
    const { repositories } = this.state;
    return (
      <MaterialTable
        {...tableDefaults()}
        title={"Repositórios salvos"}
        columns={[
          { title: "Nome", field: "name" },
          { title: "Responsável", field: "owner" },
          { title: "URL", field: "url" },
          { title: "Linguagem", field: "language" },
        ]}
        data={repositories}
        actions={[
          {
            icon: Description,
            tooltip: "Pull requests",
            onClick: async (evt, rowData) =>
              this.setState({ pullRequestsDialog: true, repository: rowData }),
          },
          {
            icon: Group,
            tooltip: "Contribuidores",
            onClick: async (evt, rowData) =>
              this.setState({ contributorsModal: true, repository: rowData }),
          },
          {
            icon: Delete,
            tooltip: "Remover repositório",
            onClick: async (evt, rowData) =>
              this.setState({ confirmDelete: true, repository: rowData }),
          },
        ]}
      />
    );
  }
  render() {
    const {
      errorMessage,
      repositories,
      loadingTable,
      deleteError,
      deleteSuccess,
      confirmDelete,
      repository,
      contributorsModal,
      pullRequestsDialog,
    } = this.state;
    return (
      <>
        {loadingTable ? (
          <LinearProgress />
        ) : (
          <Box display="flex" justifyContent="center" className="sim">
            {repositories.length === 0 ? (
              <p className="main-text">
                {errorMessage === ""
                  ? "Não há repositórios salvos =("
                  : errorMessage}
              </p>
            ) : (
              this.table()
            )}
          </Box>
        )}
        <Dialog
          open={confirmDelete}
          onClose={() => this.setState({ confirmDelete: false })}
        >
          <DialogTitle>
            Certeza que deseja remover esse repositório?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.setState({ confirmDelete: false })}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                this.setState({ confirmDelete: false });
                this.deleteRepo(repository._id);
              }}
              color="primary"
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <PullRequestsDialog
          open={pullRequestsDialog}
          repository={repository}
          onClose={() => this.setState({ pullRequestsDialog: false })}
        />
        <ContributorsModal
          open={contributorsModal}
          repository={repository}
          onClose={() => this.setState({ contributorsModal: false })}
        />
        <Snackbar
          message={deleteError}
          onClose={() => this.setState({ deleteError: "" })}
          type="error"
        />
        <Snackbar
          message={deleteSuccess}
          onClose={() => this.setState({ deleteSuccess: "" })}
          type="success"
        />
      </>
    );
  }
}

export default withStyles(styles)(SavedRepositories);
