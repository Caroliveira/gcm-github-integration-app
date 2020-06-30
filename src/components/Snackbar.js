import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export default function SnackbarComponent(props) {
  const { message, onClose, type } = props;
  console.log(message)
  return (
    <Snackbar
      open={message !== ""}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
