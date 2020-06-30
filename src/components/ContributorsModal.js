import React, { Component } from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import { Modal, withStyles } from "@material-ui/core";
import styles from "../assets/css/components.css";
import { Close } from "@material-ui/icons";

class ContributorsModal extends Component {
  render() {
    const { onClose, open, repository } = this.props;
    return (
      <Modal open={open} onClose={onClose} className="modal">
        <MaterialTable
          {...tableDefaults()}
          title={`Contribuidores do repositório ${repository.name}`}
          columns={[
            { title: "Nome", field: "login" },
            { title: "URL", field: "url" },
            { title: "Contribuições", field: "contributions" },
          ]}
          data={repository.contributors}
          actions={[
            {
              icon: Close,
              tooltip: "Fechar",
              onClick: onClose,
              isFreeAction: true
            },
          ]}
          options={{ search: false }}
        />
      </Modal>
    );
  }
}
export default withStyles(styles)(ContributorsModal);
