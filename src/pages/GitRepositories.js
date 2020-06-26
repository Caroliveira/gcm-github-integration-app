import React from "react";
import MaterialTable from "material-table";
import tableDefaults from "../utils/tableDefaults";
import { AddCircle } from "@material-ui/icons";

export default function GitRepositories() {
  return (
    <div  className="table">
      <MaterialTable
        {...tableDefaults()}
        title="Tabela"
        columns={[
          { title: "Nome", field: "name" },
          { title: "Sobrenome", field: "surname" },
        ]}
        data={[
          {name: "Fulana", surname: "da Silva"},
          {name: "Beltrana", surname: "Sauro"},
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
