import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogForRename(props) {
  const {
    status,
    handleClose,
    data,
    rename,
    id,
    currentUrl,
    handleAddNew,
  } = props;

  const [name, setName] = React.useState("");

  const [isNameValid, setIsNameValid] = React.useState("");

  function updateName(event) {
    setName(event.target.value);
    updateFileList(event.target.value);
  }

  function updateFileList(checkName) {
    setIsNameValid(handleAddNew(checkName));
  }

  function handleClickUpdateBtn() {
    if (isNameValid) {
      rename(id, currentUrl, name);
      setName("");
    }
  }
  return (
    <div>
      <Dialog
        open={status}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            error={!isNameValid}
            id={data.textFieldTitle}
            label={data.textFieldTitle}
            type="text"
            helperText={!isNameValid ? "Invalid Name!" : ""}
            onChange={updateName}
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
            onClick={handleClickUpdateBtn}
            color="primary"
            disableElevation
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
