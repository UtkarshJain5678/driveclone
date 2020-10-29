import React from "react";
import { Divider } from "@material-ui/core";
import AppBar from "./components/appBar";
import Dashboard from "./components/dashboard";
import Breadcrumb from "./components/breadcrumb";
import Error from "./components/error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { apiData } from "./data/data.js";

function generateKey() {
  return Math.floor(Math.random() * 983175875);
}

function App() {
  const [data, setData] = React.useState(apiData);

  const filterFolderData = function (alteredData, match) {
    const filteredFolderList = alteredData.folderList.filter(
      (item) => item.id === +match
    );
    return filteredFolderList[0];
  };

  // below code is for folder addition

  const addNewFolder = (folderName, url) => {
    let returnedData = { ...data };
    const newFolder = {
      id: generateKey(),
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
        return;
      }
    }
    filteredData.folderList = [...filteredData.folderList, newFolder];
    setData(returnedData);
  };

  // below code is for file addition

  const addNewFile = (fileName, url) => {
    let returnedData = { ...data };
    const newFile = {
      id: generateKey(),
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
        return;
      }
    }
    filteredData.fileList = [...filteredData.fileList, newFile];
    setData(returnedData);
  };

  // remove file starts from here

  const removeFile = (id, url) => {
    let returnedData = { ...data };
    if (url === "/") {
      const filteredData = returnedData.fileList.filter(
        (item) => item.id !== id
      );
      returnedData.fileList = [...filteredData];
      setData(returnedData);
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
    const newFileList = filteredData.fileList.filter((item) => item.id !== id);
    filteredData.fileList = [...newFileList];
    setData(returnedData);
  };

  // code for folder delete

  const removeFolder = (id, url) => {
    let returnedData = { ...data };
    if (url === "/") {
      const filteredData = returnedData.folderList.filter(
        (item) => item.id !== id
      );
      returnedData.folderList = [...filteredData];
      setData(returnedData);
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
    const newFileList = filteredData.folderList.filter(
      (item) => item.id !== id
    );
    filteredData.folderList = [...newFileList];
    setData(returnedData);
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
      <Breadcrumb />
      <Divider />
      <Switch>
        <Route
          exact
          path="/:id*"
          render={(props) => (
            <Dashboard
              {...props}
              data={data}
              getData={getData}
              addNewFolder={addNewFolder}
              addNewFile={addNewFile}
              removeFile={removeFile}
              removeFolder={removeFolder}
            />
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <Dashboard
              {...props}
              data={data}
              getData={getData}
              addNewFolder={addNewFolder}
              addNewFile={addNewFile}
              removeFile={removeFile}
              removeFolder={removeFolder}
            />
          )}
        />
        <Route path="/error" render={(props) => <Error {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
