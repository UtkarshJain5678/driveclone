import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Fab, Menu, MenuItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import FolderList from "./folderList";
import FileList from "./fileList";
import DialogForm from "./dialogForm";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dashboardMainStyle: {
    padding: 25,
  },
  fabBtn: {
    background: "#2b2b2b",
    position: "fixed",
    bottom: "5%",
    right: "5%",
    "&:hover": {
      background: "royalblue",
    },
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const { addNewFolder, addNewFile, removeFile, removeFolder, getData } = props;
  const mainData = getData(props.match.url);

  const history = useHistory();

  const [fabMenuStatus, setfabMenuStatus] = React.useState(null);
  const [dialogData, setDialogData] = React.useState({});
  const [dialogStatus, setDialogStatus] = React.useState(false);

  const handleFabOpen = (event) => {
    setfabMenuStatus(event.currentTarget);
  };

  const handleFabClose = () => {
    setfabMenuStatus(null);
  };

  const handleNewFolderClick = () => {
    handleFabClose();
    handleClickDialogOpen();
    const newDialogData = {
      id: 10,
      title: "New Folder Name",
      textFieldTitle: "Name",
    };
    setDialogData(newDialogData);
  };

  const handleNewFileClick = () => {
    handleFabClose();
    handleClickDialogOpen();
    const newDialogData = {
      id: 20,
      title: "New File Name",
      textFieldTitle: "Name",
    };
    setDialogData(newDialogData);
  };

  const handleClickDialogOpen = () => {
    setDialogStatus(true);
  };

  const handleDialogClose = () => {
    setDialogStatus(false);
  };

  function navigateToFolder(id) {
    if (props.match.url === "/") {
      history.push(`${props.match.url}${id}`);
    } else {
      history.push(`${props.match.url}/${id}`);
    }
  }

  return (
    <div className={classes.dashboardMainStyle}>
      <Box mb={4}>
        <Typography component="h4" variant="h4">
          <Box fontWeight="bold">Folders</Box>
        </Typography>
        <Box mt={3}>
          <FolderList
            list={mainData.folderList}
            navigateToFolder={navigateToFolder}
            currentUrl={props.match.url}
            removeFolder={removeFolder}
          />
        </Box>
      </Box>
      <Box mb={4}>
        <Typography component="h4" variant="h4">
          <Box fontWeight="bold">Files</Box>
        </Typography>
        <Box mt={3}>
          <FileList
            list={mainData.fileList}
            currentUrl={props.match.url}
            removeFile={removeFile}
          />
        </Box>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleFabOpen}
        className={classes.fabBtn}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <AddIcon />
      </Fab>
      {/* open click fab below menu should open */}
      <Menu
        id="simple-menu"
        anchorEl={fabMenuStatus}
        keepMounted
        open={Boolean(fabMenuStatus)}
        onClose={handleFabClose}
      >
        <MenuItem onClick={handleNewFolderClick}>Add New Folder</MenuItem>
        <MenuItem onClick={handleNewFileClick}>Add New File</MenuItem>
      </Menu>

      {/* open dialog according to user action on fab button*/}
      <DialogForm
        status={dialogStatus}
        handleClose={handleDialogClose}
        addNewFolder={addNewFolder}
        addNewFile={addNewFile}
        currentUrl={props.match.url}
        data={dialogData}
      />
    </div>
  );
}
