import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "./components/appBar";
import Dashboard from "./components/dashboard";
import Breadcrumb from "./components/breadcrumb";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { apiData } from "./data/data.js";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function generateID() {
  return Math.floor(Math.random() * 983175875);
}

// This is Main App function

function App() {
  const classes = useStyles();
  const [data, setData] = React.useState(apiData);

  const [isLoading, setIsLoading] = React.useState(false);
  const handleLoadingOn = () => {
    setIsLoading(true);
  };
  const handleLoadingOff = () => {
    setIsLoading(false);
  };

  const filterFolderData = function (alteredData, match) {
    const filteredFolderList = alteredData.folderList.filter(
      (item) => item.id === +match
    );
    return filteredFolderList[0];
  };

  // below code is for folder addition

  const addNewFolder = (folderName, url) => {
    handleLoadingOn();
    let returnedData = { ...data };
    const newFolder = {
      id: generateID(),
      name: folderName,
      folderList: [],
      fileList: [],
    };
    if (url === "/") {
      returnedData.folderList.push(newFolder);
    }
    let getNestedIds = url.split("/").filter((item) => item);
    let filteredData = { ...returnedData };
    for (let i = 0; i < getNestedIds.length; i++) {
      filteredData = filterFolderData(filteredData, getNestedIds[i]);
      if (filteredData === null) {
        handleLoadingOff();
        return;
      }
    }
    filteredData.folderList = [...filteredData.folderList, newFolder];
    setData(returnedData);
    handleLoadingOff();
  };

  // below code is for file addition

  const addNewFile = (fileName, url) => {
    handleLoadingOn();
    let returnedData = { ...data };
    const newFile = {
      id: generateID(),
      name: fileName,
      path: "",
    };
    if (url === "/") {
      returnedData.fileList.push(newFile);
    }
    let getNestedIds = url.split("/").filter((item) => item);
    let filteredData = { ...returnedData };
    for (let i = 0; i < getNestedIds.length; i++) {
      filteredData = filterFolderData(filteredData, getNestedIds[i]);
      if (filteredData === null) {
        handleLoadingOff();
        return;
      }
    }
    filteredData.fileList = [...filteredData.fileList, newFile];
    setData(returnedData);
    handleLoadingOff();
  };

  // remove file starts from here

  const removeFile = (id, url) => {
    handleLoadingOn();
    let returnedData = { ...data };
    if (url === "/") {
      const filteredData = returnedData.fileList.filter(
        (item) => item.id !== id
      );
      returnedData.fileList = [...filteredData];
      setData(returnedData);
      handleLoadingOff();
      return;
    }
    let getNestedIds = url.split("/").filter((item) => item);
    let filteredData = { ...returnedData };
    for (let i = 0; i < getNestedIds.length; i++) {
      filteredData = filterFolderData(filteredData, getNestedIds[i]);
      if (filteredData === null) {
        handleLoadingOff();
        return;
      }
    }
    const newFileList = filteredData.fileList.filter((item) => item.id !== id);
    filteredData.fileList = [...newFileList];
    setData(returnedData);
    handleLoadingOff();
  };

  // code for folder delete

  const removeFolder = (id, url) => {
    handleLoadingOn();
    let returnedData = { ...data };
    if (url === "/") {
      const filteredData = returnedData.folderList.filter(
        (item) => item.id !== id
      );
      returnedData.folderList = [...filteredData];
      setData(returnedData);
      handleLoadingOff();
      return;
    }
    let getNestedIds = url.split("/").filter((item) => item);
    let filteredData = { ...returnedData };
    for (let i = 0; i < getNestedIds.length; i++) {
      filteredData = filterFolderData(filteredData, getNestedIds[i]);
      if (filteredData === null) {
        handleLoadingOff();
        return;
      }
    }
    const newFileList = filteredData.folderList.filter(
      (item) => item.id !== id
    );
    filteredData.folderList = [...newFileList];
    setData(returnedData);
    handleLoadingOff();
  };

  // code for rename folder

  const renameFolder = (id, url, newName) => {
    handleLoadingOn();
    let returnedData = { ...data };
    if (url === "/") {
      // this code can be reduced
      const filteredData = returnedData.folderList.map((item) => {
        if (item.id === id) {
          const copyFolder = { ...item };
          copyFolder.name = newName;
          return copyFolder;
        }
        return item;
      });
      returnedData.folderList = [...filteredData];
      setData(returnedData);
      handleLoadingOff();
      return;
    }
    let getNestedIds = url.split("/").filter((item) => item);
    let filteredData = { ...returnedData };
    for (let i = 0; i < getNestedIds.length; i++) {
      filteredData = filterFolderData(filteredData, getNestedIds[i]);
      console.log(filteredData);
      if (filteredData === null) {
        return;
      }
    }
    const newFolderList = filteredData.folderList.map((item) => {
      if (item.id === id) {
        const copyFolder = { ...item };
        copyFolder.name = newName;
        return copyFolder;
      }
      return item;
    });
    filteredData.folderList = [...newFolderList];
    setData(returnedData);
    handleLoadingOff();
  };

  // code for rename file name

  const renameFile = (id, url, newName) => {
    handleLoadingOn();
    let returnedData = { ...data };
    if (url === "/") {
      // this code can be reduced
      const filteredData = returnedData.fileList.map((item) => {
        if (item.id === id) {
          const copyFolder = { ...item };
          copyFolder.name = newName;
          return copyFolder;
        }
        return item;
      });
      returnedData.fileList = [...filteredData];
      setData(returnedData);
      handleLoadingOff();
      return;
    }
    let getNestedIds = url.split("/").filter((item) => item);
    let filteredData = { ...returnedData };
    for (let i = 0; i < getNestedIds.length; i++) {
      filteredData = filterFolderData(filteredData, getNestedIds[i]);
      if (filteredData === null) {
        return;
      }
    }
    const newFileList = filteredData.fileList.map((item) => {
      if (item.id === id) {
        const copyFolder = { ...item };
        copyFolder.name = newName;
        return copyFolder;
      }
      return item;
    });
    filteredData.fileList = [...newFileList];
    setData(returnedData);
    handleLoadingOff();
  };

  // get data from above data which is in state

  const filterGetData = function (alteredData, match) {
    for (let i = 0; i < alteredData.folderList.length; i++) {
      if (alteredData.folderList[i].id === +match) {
        return alteredData.folderList[i];
      }
    }
    return null;
  };

  const getData = function (url) {
    let returnedData = { ...data };
    if (url === "/") {
      return returnedData;
    }
    let getNestedIds = url.split("/").filter((item) => item);
    for (let i = 0; i < getNestedIds.length; i++) {
      returnedData = filterGetData(returnedData, getNestedIds[i]);
      if (returnedData === null) {
        return null;
      }
    }

    return returnedData;
  };

  return (
    <Router>
      <AppBar />
      <Breadcrumb getData={getData} />
      <Divider />
      <Switch>
        <Route
          exact
          path="/*"
          render={(props) => (
            <Dashboard
              {...props}
              data={data}
              getData={getData}
              addNewFolder={addNewFolder}
              addNewFile={addNewFile}
              removeFile={removeFile}
              removeFolder={removeFolder}
              renameFolder={renameFolder}
              renameFile={renameFile}
            />
          )}
        />
      </Switch>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Router>
  );
}

export default App;
