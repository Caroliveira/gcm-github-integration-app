import {
  Clear,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft,
  Search,
  ArrowUpward,
} from "@material-ui/icons";

export default () => ({
  options: {
    actionsColumnIndex: -1,
    sortable: true,
  },
  icons: {
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft,
    ResetSearch: Clear,
    Search: Search,
    SortArrow: ArrowUpward,
  },
  localization: {
    body: {
      emptyDataSourceMessage: "Não há dados disponíveis",
    },
    header: {
      actions: "Ações",
    },
    pagination: {
      labelDisplayedRows: `{from}-{to} de {count}`,
      labelRowsSelect: "Linhas",
      firstTooltip: "Primeira página",
      previousTooltip: "Página anterior",
      nextTooltip: "Próxima página",
      lastTooltip: "Última página",
    },
    toolbar: {
      searchTooltip: "Pesquisar",
      searchPlaceholder: "Pesquisar",
    },
  },
  style: { width: "100%", maxWidth: "1200px", marginTop: "50px" },
});
