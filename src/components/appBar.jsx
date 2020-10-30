import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar as Bar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { withRouter, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#ffff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#2b2b2b",
  },
}));

function AppBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Bar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            aria-label="icon"
            onClick={() => history.push("/")}
          >
            <ChangeHistoryIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="bold">Drive Clone</Box>
          </Typography>
        </Toolbar>
      </Bar>
    </div>
  );
}

export default withRouter(AppBar);
