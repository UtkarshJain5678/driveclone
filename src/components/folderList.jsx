import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { Folder, MoreVert, Edit, Launch, Delete } from "@material-ui/icons";
import DialogForRename from "./dialogForRename";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  folderStyle: {
    maxWidth: 300,
    width: 300,
    padding: "0px 10px 0px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  folderDataStyle: {
    flexGrow: 1,
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  gridStyle: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FolderList(props) {
  const {
    list,
    navigateToFolder,
    currentUrl,
    removeFolder,
    renameFolder,
    handleAddNewFolder,
  } = props;
  const classes = useStyles();

  function Item(props) {
    const { id, name } = props;
    return (
      <>
        <Paper variant="outlined" className={classes.folderStyle}>
          <Box
            className={classes.folderDataStyle}
            onClick={() => navigateToFolder(id)}
          >
            <Box mr={3}>
              <Folder color="inherit" />
            </Box>
            <Typography noWrap>
              {name.length > 18 ? name.slice(0, 18) + ".." : name}
            </Typography>
          </Box>
          <GetMenu
            id={id}
            navigateToFolder={navigateToFolder}
            removeFolder={removeFolder}
            currentUrl={currentUrl}
            renameFolder={renameFolder}
            handleAddNewFolder={handleAddNewFolder}
          />
        </Paper>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {list.length > 0 ? (
          list.map((item) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={item.id}
              className={classes.gridStyle}
            >
              <Item name={item.name} id={item.id} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={4} md={3}>
            <Alert severity="info">Empty Folder List!</Alert>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

function GetMenu(props) {
  const {
    id,
    currentUrl,
    navigateToFolder,
    removeFolder,
    renameFolder,
    handleAddNewFolder,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const handleClickDialogOpen = () => {
    setDialogStatus(true);
  };

  const handleDialogClose = () => {
    setDialogStatus(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls={`file-menu-${id}`}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id={`file-menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigateToFolder(id)}>
          <Launch />
          <Typography style={{ marginLeft: 5 }}>Open</Typography>
        </MenuItem>
        <MenuItem onClick={handleClickDialogOpen}>
          <Edit />
          <Typography style={{ marginLeft: 5 }}>Rename</Typography>
        </MenuItem>
        <MenuItem onClick={() => removeFolder(id, currentUrl)}>
          {" "}
          <Delete />
          <Typography style={{ marginLeft: 5 }}>Delete</Typography>
        </MenuItem>
      </Menu>
      <DialogForRename
        status={dialogStatus}
        handleClose={handleDialogClose}
        handleAddNew={handleAddNewFolder}
        data={{ title: "Rename Folder", textFieldTitle: "New Name" }}
        rename={renameFolder}
        id={id}
        currentUrl={currentUrl}
      />
    </>
  );
}
