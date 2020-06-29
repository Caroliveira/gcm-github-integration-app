import React, { Component } from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import { Box } from "@material-ui/core";
import { getRepositories } from "../services";

export default class SavedRepositories extends Component {
  state = {
    repositories: []
  }
  async componentDidMount() {
    this.setState({ repositories: await getRepositories() });
  }
  table() {
    const { repositories } = this.state;
    return (
      <MaterialTable
        {...tableDefaults()}
        title={"Repositórios salvos"}
        columns={[{ title: "Nome", field: "name" }]}
        data={repositories}
        style={{ width: "100%", maxWidth: "900px" }}
      />
    );
  }
  render() {
    return (
      <>
        <Box display="flex" justifyContent="center" className="sim">
          {this.table()}
        </Box>
      </>
    );
  }
}
