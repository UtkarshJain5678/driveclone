import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { FOLDER_CODE } from "./services/globalData";

export default function DialogForm(props) {
  const {
    status,
    handleClose,
    dialogData,
    handleAddNewFolder,
    handleAddNewFile,
    addNewFile,
    addNewFolder,
    currentUrl,
  } = props;

  const [name, setName] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(true);

  function updateName(event) {
    setName(event.target.value);
    if (dialogData.id === FOLDER_CODE) {
      updateFolderList(event.target.value);
    } else {
      updateFileList(event.target.value);
    }
  }

  function updateFolderList(checkName) {
    setIsNameValid(handleAddNewFolder(checkName));
  }

  function updateFileList(checkName) {
    setIsNameValid(handleAddNewFile(checkName));
  }

  function handleAddNameBtnClick() {
    if (isNameValid) {
      if (dialogData.id === FOLDER_CODE) {
        if (name === "") {
          updateFolderList("");
        } else {
          addNewFolder(name, currentUrl);
          handleClose();
        }
      } else {
        if (name === "") {
          updateFileList("");
        } else {
          addNewFile(name, currentUrl);
          handleClose();
        }
      }
    }
  }

  return (
    <div>
      <Dialog
        open={status}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogData.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            error={!isNameValid}
            helperText={!isNameValid ? "Invalid Name!" : ""}
            id={dialogData.textFieldTitle}
            label={dialogData.textFieldTitle}
            type="text"
            onChange={(event) => updateName(event)}
            autoComplete="off"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            elevation={0}
            color="primary"
            onClick={handleAddNameBtnClick}
            disableElevation
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
