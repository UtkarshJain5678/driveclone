import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogForRename(props) {
  const { status, handleClose, data, rename, id, currentUrl } = props;

  const [name, setName] = React.useState("");

  const updateName = (event) => {
    setName(event.target.value);
  };
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
            id={data.textFieldTitle}
            label={data.textFieldTitle}
            type="text"
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
            onClick={() => {
              rename(id, currentUrl, name);
            }}
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
