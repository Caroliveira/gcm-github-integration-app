import React, { Component } from "react";
import styles from "../assets/css/components.css";
import {
  Dialog,
  DialogTitle,
  withStyles,
  DialogContent,
  Card,
  Grid,
  CardContent,
  Typography,
} from "@material-ui/core";

class PullRequestsDialog extends Component {
  listPR() {
    const { pullRequests } = this.props.repository;
    if (pullRequests.lenght === 0) return null;
    const list = pullRequests.map((el) => (
      <Card className="card-list">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item>
              <Typography>Título</Typography>
            </Grid>
            <Grid item>{el.title}</Grid>
            <Grid item>
              <Typography>Responsável</Typography>
            </Grid>
            <Grid item>{el.responsable}</Grid>
            <Grid item>
              <Typography>URL</Typography>
            </Grid>
            <Grid item>{el.url}</Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
    return list;
  }
  render() {
    const { open, onClose, repository } = this.props;
    const { pullRequests } = repository;
    const dontExistPR = pullRequests === undefined || pullRequests.length === 0;
    return (
      <Dialog className="dialog" open={open} onClose={onClose}>
        {dontExistPR ? null : (
          <DialogTitle>{`Pull requests do repositório ${repository.name}`}</DialogTitle>
        )}
        <DialogContent>
          {dontExistPR ? (
            <p className="warning-text">Nao há pull requests abertos.</p>
          ) : (
            this.listPR()
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PullRequestsDialog);
