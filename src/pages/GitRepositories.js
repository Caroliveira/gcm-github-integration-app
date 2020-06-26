import React, { Component } from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import { AddCircle } from "@material-ui/icons";
import { getRepo } from "../services";

export default class GitRepositories extends Component {
  state = { repo: [] };
  async componentDidMount() {
    this.setState({ repo: await getRepo("Caroliveira") });
  }
  render() {
    console.log(this.state.repo);
    return (
      <div className="table">
        <MaterialTable
          {...tableDefaults()}
          title="Tabela"
          columns={[
            { title: "Nome", field: "name" },
            { title: "Sobrenome", field: "surname" },
          ]}
          data={[
            { name: "Fulana", surname: "da Silva" },
            { name: "Beltrana", surname: "Sauro" },
          ]}
          actions={[
            {
              icon: AddCircle,
              tooltip: "Adicionar",
              isFreeAction: true,
              // onClick: async (evt, rowData) =>
            },
          ]}
        />
      </div>
    );
  }
}
