import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { Home, Folder } from "@material-ui/icons";
import { withRouter, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  breadcrumbStyle: {
    padding: 25,
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function Breadcrumb(props) {
  const classes = useStyles();
  const history = useHistory();

  const {
    location: { pathname },
    getData,
  } = props;

  const allPaths = pathname.split("/").filter((id) => id);

  if (getData(pathname) === null) {
    return null;
  }

  return (
    <div className={classes.breadcrumbStyle}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => history.push("/")}
          className={classes.link}
        >
          <Home className={classes.icon} />
          Home
        </Link>
        {allPaths.map((path, index) => {
          const linkTo = `/${allPaths.slice(0, index + 1).join("/")}`;
          const { name } = getData(linkTo);
          return index === allPaths.length - 1 ? (
            <Typography
              color="textPrimary"
              className={classes.link}
              key={path + index}
            >
              <Folder className={classes.icon} />
              {name}
            </Typography>
          ) : (
            <Link
              color="inherit"
              onClick={() => history.push(linkTo)}
              className={classes.link}
              key={path + index}
            >
              <Folder className={classes.icon} />
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default withRouter(Breadcrumb);
