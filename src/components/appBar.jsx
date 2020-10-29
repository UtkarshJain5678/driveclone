import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar as Bar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#ffff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#2b2b2b",
  },
}));

export default function AppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Bar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="bold">Drive Clone</Box>
          </Typography>
        </Toolbar>
      </Bar>
    </div>
  );
}
