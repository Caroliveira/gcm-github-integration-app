import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export default function SnackbarComponent(props) {
  const { message, onClose, type } = props;
  return (
    <Snackbar
      open={message !== ""}
      autoHideDuration={6000}
      onClose={() => onClose}
    >
      <Alert onClose={() => onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
