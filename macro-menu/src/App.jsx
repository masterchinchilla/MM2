import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import httpService from "./services/httpService";
import { csValidateObj } from "./services/validationService";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import RouterWrapper from "./components/RouterWrapper.component";
import auth from "./services/authService";
import apiService from "./services/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
library.add(fas);
const App = () => {
  // Mosh recommends using ComponentDidMount to run getCurrentUser from auth service, but there is a reason (I don't remember) why we went with a functional component here and not a class component...
  let serverAuthErrors = "";
  const frontEndHtmlRoot = "http://localhost:3000/";
  const backEndHtmlRoot = "http://localhost:5000/";
  const [currentGRFUser, setCurrentGRFUser] = useState();
  const [leftNavOpen, toggleLeftNavOpen] = useState(false);
  const [rightNavOpen, toggleRightNavOpen] = useState(false);
  function closeNavOnClick(leftRightOrOutside) {
    switch (leftRightOrOutside) {
      case "left":
        toggleLeftNavOpen(leftNavOpen ? false : true);
        toggleRightNavOpen(false);
        break;
      case "right":
        toggleLeftNavOpen(false);
        toggleRightNavOpen(rightNavOpen ? false : true);
        break;
      default:
        toggleLeftNavOpen(false);
        toggleRightNavOpen(false);
    }
  }
  // const [authToken,setAuthToken]=useState();
  async function decodeToken(token) {
    const decodedToken = jwtDecode(token);
    const usersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + usersId;
  }
  async function createNewUser(newUser) {
    const backEndReqUrl = `${backEndHtmlRoot}GRFUsers/add`;
    let savedRecord = null;
    let valErrors = [];
    try {
      let reqRes = await httpService.post(backEndReqUrl, newUser);
      savedRecord = reqRes.data;
      let successMsg = `New User saved successfully.`;
      notifyFn(successMsg, "success");
      const token = reqRes.headers["x-auth-token"];
      auth.loginWithJwt(token);
      const decodedToken = jwtDecode(token);
      setCurrentGRFUser(decodedToken.currentGRFUser);
      const usersId = decodedToken.currentGRFUser._id;
      window.location = "/weekMealPlans/usersWMPs/" + usersId;
    } catch (errs) {
      //valErrorsNestedArray shape:
      //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
      valErrors = parseHTTPResErrs(errs, "all");
      notifyOfErrors(valErrors);
    }
    return { valErrors };
  }
  async function updateUser(updatedUser) {
    let savedRecord = null;
    let valErrors = [];
    const backEndReqUrl = `${backEndHtmlRoot}GRFUsers/update/${updatedUser._id}`;
    try {
      let reqRes = await httpService.put(backEndReqUrl, updatedUser);
      savedRecord = reqRes.data;
      notifyFn("Record updated successfully", "success");
      const token = reqRes.headers["x-auth-token"];
      auth.loginWithJwt(token);
      const decodedToken = jwtDecode(token);
      setCurrentGRFUser(decodedToken.currentGRFUser);
    } catch (errs) {
      //valErrorsNestedArray shape:
      //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
      valErrors = parseHTTPResErrs(errs, "all");
      notifyOfErrors(valErrors);
      return { valErrors };
    }
    return { valErrors };
  }
  function notifyFn(notice, noticeType) {
    switch (noticeType) {
      case "success":
        toast(notice, { type: "success", autoClose: 2000 });
        break;
      default:
        toast(notice, { type: "error", autoClose: 5000 });
    }
  }
  function notifyOfErrors(valErrsNestedArray) {
    for (let i = 0; i < valErrsNestedArray.length; i++) {
      let thisValErrorObj = valErrsNestedArray[i];
      let thisValErrorObjKeys = Object.keys(thisValErrorObj);
      for (let i = 0; i < thisValErrorObjKeys.length; i++) {
        let thisValErrorObjKey = thisValErrorObjKeys[i];
        let thisValErrorObjSubArray = thisValErrorObj[thisValErrorObjKey];
        for (let i = 0; i < thisValErrorObjSubArray.length; i++) {
          let thisValError = thisValErrorObjSubArray[i];
          notifyFn(thisValError, "error");
        }
      }
    }
  }
  function handleParseAndUpdateObjValErrsFn(errs, thisObjsValErrsObj) {
    const valErrors = parseHTTPResErrs(errs);
    return updateThisObjsValErrs(thisObjsValErrsObj, valErrors);
  }
  function updateThisObjsValErrs(thisObjsValErrsObj, valErrsNestedArray) {
    //for valErrsNestedArray, fn expects to receive object with this shape:
    //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
    //for thisObjsValErrsObj, fn expects to receive object with this shape:
    //{prop1Name:[],prop2Name[]}
    for (let i = 0; i < valErrsNestedArray.length; i++) {
      let valErrsArrayKeys = Object.keys(valErrsNestedArray[i]);
      let thisValuesValErrsArrayKey = valErrsArrayKeys[0];
      thisObjsValErrsObj[thisValuesValErrsArrayKey] =
        valErrsNestedArray[i][thisValuesValErrsArrayKey];
    }
    notifyOfErrors(valErrsNestedArray);
    return thisObjsValErrsObj;
  }
  function parseHTTPResErrs(errs) {
    let svrErrMsg = errs.response.data;
    let valErrsNestedArray;
    let errMsgs = [];
    let pattern = /castError/;
    let resStatus = errs.response.status;
    if (resStatus > 400) {
      switch (resStatus) {
        case 401:
          errMsgs.push(
            "You must be logged-in to access the requested record(s)"
          );
          break;
        case 403:
          errMsgs.push(
            "You do not have permission to access the requested record(s)"
          );
          break;
        case 404:
          errMsgs.push("Records not found: IDs/names may be invalid");
          break;
        default:
          if (resStatus > 500) {
            errMsgs.push("Server error: Refresh, wait a moment and try again");
          }
      }
      valErrsNestedArray = [{ all: errMsgs }];
      // } else if (resStatus === 400) {
    } else if (pattern.test(svrErrMsg)) {
      errMsgs.push("Bad request: URL may be invalid");
      valErrsNestedArray = [{ all: errMsgs }];
    } else {
      valErrsNestedArray = errs.response.data;
    }
    return valErrsNestedArray;
  }
  function setAllKeysToSameValue(keysSourceObj, objToUpdate, keyValue) {
    const objKeys = Object.keys(keysSourceObj);
    for (let i = 0; i < objKeys.length; i++) {
      objToUpdate[objKeys[i]] = keyValue;
    }
    return objToUpdate;
  }
  function getRndIntegerFn(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function returnElementKey(
    indexOfObj,
    thisObjName,
    propToUpdate,
    typeOfRecordToChange,
    arrayIndex,
    thisMealTypeCode,
    thisDayOfWeekCode
  ) {
    return `${thisObjName ? thisObjName : "Null"}${
      indexOfObj ? indexOfObj : "Null"
    }ForProp${propToUpdate ? propToUpdate : "Null"}For${
      typeOfRecordToChange ? typeOfRecordToChange : "Null"
    }Num${arrayIndex ? arrayIndex : "Null"}ForMeal${
      thisMealTypeCode ? thisMealTypeCode : "Null"
    }ForDay${thisDayOfWeekCode ? thisDayOfWeekCode : "Null"}ForThisWMP`;
  }
  async function getCSValResultForPropFn(
    typeOfRecordToChange,
    propToUpdate,
    newValue,
    thisObjsValErrsObj,
    parentRecordId
  ) {
    const recordToUpdate = { [propToUpdate]: newValue, _id: parentRecordId };
    const csValResult = await csValidateObj(
      typeOfRecordToChange,
      recordToUpdate
    );
    const newThisObjsValErrsObj = updateThisObjsValErrs(
      thisObjsValErrsObj,
      csValResult
    );
    return newThisObjsValErrsObj;
  }
  function handleTrimEnteredValueFn(untrimmedValue) {
    let trimmedValue = untrimmedValue.trim();
    let trimmedValueWNoDblSpcs = trimmedValue.replace(/  +/g, " ");
    return trimmedValueWNoDblSpcs;
  }
  async function handleGetFullRecordSetFn(typeOfRecordToGet) {
    try {
      const backEndReqResponse = await apiService(
        "get",
        typeOfRecordToGet,
        "all",
        null,
        null
      );
      const fullRecordSet = backEndReqResponse.data;
      return fullRecordSet;
    } catch (errs) {
      const valErrors = parseHTTPResErrs(errs);
      notifyOfErrors(valErrors);
      return [];
    }
  }
  async function handleGetRecordsWFilterFn(
    typeOfRecordToGet,
    srchParam,
    srchParamVal,
    action
  ) {
    let valErrors;
    let foundRecords = [];
    try {
      // callApi(action, recordType, srchParam, srchParamVal, payload);
      const backEndReqResponse = await apiService(
        action,
        typeOfRecordToGet,
        srchParam,
        srchParamVal,
        null
      );
      foundRecords = backEndReqResponse.data;
    } catch (errs) {
      valErrors = parseHTTPResErrs(errs);
      notifyOfErrors(valErrors);
    }
    return { foundRecords, valErrors };
  }
  async function handleSaveUpdateToDbFn(
    typeOfRecordToUpdate,
    updatedRecordFromState
  ) {
    let valErrors;
    try {
      // callApi(action, recordType, srchParam, srchParamVal, payload);
      await apiService(
        `update`,
        typeOfRecordToUpdate,
        `_id`,
        updatedRecordFromState._id,
        updatedRecordFromState
      );
      this.notifyFn("Record updated successfully", "success");
    } catch (errs) {
      valErrors = parseHTTPResErrs(errs);
      notifyOfErrors(valErrors);
    }
    return valErrors;
  }
  function handleGetCurrentUserFn() {
    return auth.getCurrentUser();
  }
  useEffect(() => {
    if (!currentGRFUser) {
      const currentUser = handleGetCurrentUserFn();
      setCurrentGRFUser(currentUser);
    }
  });
  return (
    <React.Fragment>
      <ToastContainer />
      <RouterWrapper
        serverAuthErrors={serverAuthErrors}
        frontEndHtmlRoot={frontEndHtmlRoot}
        backEndHtmlRoot={backEndHtmlRoot}
        currentGRFUser={currentGRFUser}
        leftNavOpen={leftNavOpen}
        rightNavOpen={rightNavOpen}
        closeNavOnClick={closeNavOnClick}
        decodeToken={decodeToken}
        createNewUser={createNewUser}
        updateUser={updateUser}
        notifyFn={notifyFn}
        notifyOfErrors={notifyOfErrors}
        updateThisObjsValErrs={updateThisObjsValErrs}
        parseHTTPResErrs={parseHTTPResErrs}
        setAllKeysToSameValue={setAllKeysToSameValue}
        getRndIntegerFn={getRndIntegerFn}
        returnElementKey={returnElementKey}
        getCSValResultForPropFn={getCSValResultForPropFn}
        trimEnteredValueFn={handleTrimEnteredValueFn}
        onClick={closeNavOnClick}
        parseAndUpdateObjValErrsFn={handleParseAndUpdateObjValErrsFn}
        onGetFullRecordSetFn={handleGetFullRecordSetFn}
        onGetCurrentUserFn={handleGetCurrentUserFn}
        onGetRecordsWFilterFn={handleGetRecordsWFilterFn}
        onSaveUpdateToDbFn={handleSaveUpdateToDbFn}
      />
    </React.Fragment>
  );
};

export default App;
