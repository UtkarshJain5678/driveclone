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
import { Description, MoreVert, Edit, Delete } from "@material-ui/icons";
import DialogForRename from "./dialogForRename";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fileStyle: {
    maxWidth: 300,
    width: 300,
    padding: "0px 10px 0px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileDataStyle: {
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

export default function FileList(props) {
  const { list, removeFile, currentUrl, renameFile, handleAddNewFile } = props;
  const classes = useStyles();

  function Item(props) {
    const { id, name } = props;
    return (
      <Paper variant="outlined" className={classes.fileStyle}>
        <Box className={classes.fileDataStyle}>
          <Box mr={3}>
            <Description color="primary" />
          </Box>
          <Typography noWrap>{name}</Typography>
        </Box>
        <GetMenu
          id={id}
          handleAddNewFile={handleAddNewFile}
          removeFile={removeFile}
          currentUrl={currentUrl}
          renameFile={renameFile}
        />
      </Paper>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {list.length > 0 ? (
          list.map((item, index) => (
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
            <Alert severity="info">Empty File List!</Alert>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

function GetMenu(props) {
  const { id, currentUrl, removeFile, renameFile, handleAddNewFile } = props;
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
        <MoreVert color="inherit" />
      </IconButton>
      <Menu
        id={`file-menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClickDialogOpen();
            handleClose();
          }}
        >
          <Edit />
          <Typography style={{ marginLeft: 5 }}>Rename</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            removeFile(id, currentUrl);
            handleClose();
          }}
        >
          <Delete />
          <Typography style={{ marginLeft: 5 }}>Delete</Typography>
        </MenuItem>
      </Menu>
      <DialogForRename
        status={dialogStatus}
        handleClose={handleDialogClose}
        handleAddNew={handleAddNewFile}
        data={{ title: "Rename File", textFieldTitle: "New Name" }}
        rename={renameFile}
        id={id}
        currentUrl={currentUrl}
      />
    </>
  );
}
