import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Fab, Menu, MenuItem } from "@material-ui/core";
import { CreateNewFolder, AttachFile, Add } from "@material-ui/icons";

import { FILE_CODE, FOLDER_CODE } from "./services/globalData";
import FolderList from "./folderList";
import FileList from "./fileList";
import DialogForm from "./dialogForm";
import Error from "./error";

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

  const {
    addNewFolder,
    addNewFile,
    removeFile,
    removeFolder,
    getData,
    renameFolder,
    renameFile,
  } = props;
  const mainData = getData(props.match.url);

  const history = useHistory();

  const [fabMenuStatus, setfabMenuStatus] = React.useState(null);
  const [dialogData, setDialogData] = React.useState({});
  const [dialogStatus, setDialogStatus] = React.useState(false);

  if (mainData === null) {
    return <Error />;
  }

  // fab button action

  const handleFabOpen = (event) => {
    setfabMenuStatus(event.currentTarget);
  };

  const handleFabClose = () => {
    setfabMenuStatus(null);
  };

  // input dialog action

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

  // code to handle which dialog should get open

  const handleNewFolderClick = () => {
    handleFabClose();
    handleClickDialogOpen();
    const newDialogData = {
      id: FOLDER_CODE,
      title: "New Folder Name",
      textFieldTitle: "Name",
    };
    setDialogData(newDialogData);
  };

  const handleNewFileClick = () => {
    handleFabClose();
    handleClickDialogOpen();
    const newDialogData = {
      id: FILE_CODE,
      title: "New File Name",
      textFieldTitle: "Name",
    };
    setDialogData(newDialogData);
  };

  // code to check duplication in folderlist and file list

  const checkDuplicateFolderName = (name) => {
    if (
      mainData.folderList.filter(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      ).length > 0
    ) {
      return true;
    }
    return false;
  };

  const checkDuplicateFileName = (name) => {
    if (
      mainData.fileList.filter(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      ).length > 0
    ) {
      return true;
    }
    return false;
  };

  const handleAddNewFolder = (name) => {
    if (name.trim() === "") {
      return false;
    }
    if (checkDuplicateFolderName(name)) {
      return false;
    }
    return true;
  };

  const handleAddNewFile = (name) => {
    if (name.trim() === "") {
      return false;
    }
    if (checkDuplicateFileName(name)) {
      return false;
    }
    return true;
  };

  return (
    <div className={classes.dashboardMainStyle}>
      <Box mb={4}>
        <Typography component="h6" variant="h6">
          <Box fontWeight="bold">Folders</Box>
        </Typography>
        <Box mt={3}>
          <FolderList
            list={mainData.folderList}
            navigateToFolder={navigateToFolder}
            currentUrl={props.match.url}
            removeFolder={removeFolder}
            renameFolder={renameFolder}
            handleAddNewFolder={handleAddNewFolder}
          />
        </Box>
      </Box>
      <Box mb={4}>
        <Typography component="h6" variant="h6">
          <Box fontWeight="bold">Files</Box>
        </Typography>
        <Box mt={3}>
          <FileList
            list={mainData.fileList}
            currentUrl={props.match.url}
            removeFile={removeFile}
            renameFile={renameFile}
            handleAddNewFile={handleAddNewFile}
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
        <Add />
      </Fab>
      {/* open click fab below menu should open */}
      <Menu
        id="simple-menu"
        anchorEl={fabMenuStatus}
        keepMounted
        open={Boolean(fabMenuStatus)}
        onClose={handleFabClose}
      >
        <MenuItem onClick={handleNewFolderClick}>
          {" "}
          <CreateNewFolder />
          <Typography style={{ marginLeft: 5 }}>Add New Folder</Typography>
        </MenuItem>
        <MenuItem onClick={handleNewFileClick}>
          <AttachFile />
          <Typography style={{ marginLeft: 5 }}>Add New File</Typography>
        </MenuItem>
      </Menu>

      {/* open dialog according to user action on fab button*/}
      <DialogForm
        status={dialogStatus}
        mainData={mainData}
        handleClose={handleDialogClose}
        handleAddNewFolder={handleAddNewFolder}
        handleAddNewFile={handleAddNewFile}
        addNewFolder={addNewFolder}
        addNewFile={addNewFile}
        currentUrl={props.match.url}
        dialogData={dialogData}
      />
    </div>
  );
}
