import React, { Component } from "react";
import Joi from "joi";
import _ from "lodash";
import httpService from "../../../services/httpService";
import authService from "../../../services/authService";
import {
  csValidateProp,
  csValidate,
  csValidateObj,
} from "../../../services/validationService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import WeekMealPlanCard from "../WeekMealPlanCard.component";
import DaysCard from "../DaysCard.component";
import valSchema from "../../universalJoiValSchemaCS";
import rcrdOrFldNameSnctncCase from "../../../staticRefs/rcrdOrFldNameSnctncCase";
class NewNewWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    const { backEndHtmlRoot, thisGRFUser, match } = this.props;
    const pgReqParams = match.params;
    this.state = {
      rcrdOrFldNameSnctncCase: rcrdOrFldNameSnctncCase,
      typeOfRecordToChange: "weekMealPlan",
      pgReqParams: pgReqParams,
      backEndHtmlRoot: backEndHtmlRoot,
      thisWMPStateObj: {
        thisRecord: { _id: pgReqParams.id, name: "" },
      },
      thisWMPStateBackup: {},
      sunday: {},
      sundayBackup: {},
      monday: {},
      mondayBackup: {},
      tuesday: {},
      tuesdayBackup: {},
      wednesday: {},
      wednesdayBackup: {},
      thursday: {},
      thursdayBackup: {},
      friday: {},
      fridayBackup: {},
      saturday: {},
      saturdayBackup: {},
      allUnitOfMeasures: [],
      allWeightTypes: [],
      allBrands: [],
    };
  }
  getRndIntegerFn = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  notifyFn = (notice, noticeType) => {
    switch (noticeType) {
      case "success":
        toast.success(notice);
        break;
      default:
        toast.error(notice);
    }
  };
  determineThisRecordsUserTypeFn = (recordAuthorId) => {
    const thisUser = this.state.currentGRFUser;
    if (thisUser.isAdmin) {
      return "admin";
    } else {
      if (thisUser._id === recordAuthorId) {
        return "author";
      } else {
        return "viewer";
      }
    }
  };
  setAllKeysToSameValue = (keysSourceObj, objToUpdate, keyValue) => {
    const objKeys = Object.keys(keysSourceObj);
    for (let i = 0; i < objKeys.length; i++) {
      objToUpdate[objKeys[i]] = keyValue;
    }
    return objToUpdate;
  };
  replaceThisRecordInStateObj = (
    thisStateObj,
    updatedRecord,
    typeOfRecordToChange
  ) => {
    switch (typeOfRecordToChange) {
      case "ingredient":
        thisStateObj.thisRecord.genRecipeIngredient.ingredient = updatedRecord;
        break;
      case "genRecipeIngredient" || "genRecipe":
        thisStateObj.thisRecord[typeOfRecordToChange] = updatedRecord;
        break;
      default:
        thisStateObj.thisRecord = updatedRecord;
    }
    return thisStateObj;
  };
  updateStateObjMetaKeyValue = (
    keyObjToUpdate,
    typeOfRecordToChange,
    newValue
  ) => {
    keyObjToUpdate[typeOfRecordToChange] = newValue;
    return keyObjToUpdate;
  };
  getRecordKeyValue = (thisRecord, typeOfRecordToChange, key) => {
    let keyValue;
    switch (typeOfRecordToChange) {
      case "ingredient":
        keyValue = thisRecord.genRecipeIngredient.ingredient[key];
        break;
      case "genRecipeIngredient" || "genRecipe":
        keyValue = thisRecord[typeOfRecordToChange][key];
        break;
      default:
        keyValue = thisRecord[key];
    }
    return keyValue;
  };
  buildInitialStateObj = (thisStateObj, recordTypesArray, thisRecord) => {
    thisStateObj.recordChanged = {};
    thisStateObj.editingForm = {};
    thisStateObj.valErrors = {};
    thisStateObj.userType = {};
    thisStateObj.justCreated = {};
    thisStateObj.recordLoaded = {};
    for (let i = 0; i < recordTypesArray.length; i++) {
      thisStateObj.recordChanged = this.updateStateObjMetaKeyValue(
        thisStateObj.recordChanged,
        recordTypesArray[i],
        false
      );
      thisStateObj.editingForm = this.updateStateObjMetaKeyValue(
        thisStateObj.editingForm,
        recordTypesArray[i],
        false
      );
      let updatedValErrorsObj = this.setAllKeysToSameValue(thisRecord, {}, []);
      thisStateObj.valErrors = this.updateStateObjMetaKeyValue(
        thisStateObj.valErrors,
        recordTypesArray[i],
        updatedValErrorsObj
      );
      let relevantUserId = this.getRecordKeyValue(
        thisRecord,
        recordTypesArray[i],
        "_id"
      );
      let relevantRecordUserType =
        this.determineThisRecordsUserTypeFn(relevantUserId);
      thisStateObj.userType = this.updateStateObjMetaKeyValue(
        thisStateObj.userType,
        recordTypesArray[i],
        relevantRecordUserType
      );
      thisStateObj.justCreated = this.updateStateObjMetaKeyValue(
        thisStateObj.justCreated,
        recordTypesArray[i],
        false
      );
      thisStateObj.recordLoaded = this.updateStateObjMetaKeyValue(
        thisStateObj.recordLoaded,
        recordTypesArray[i],
        false
      );
    }
    return thisStateObj;
  };
  notifyOfErrors = (valErrsNestedArray) => {
    for (let i = 0; i < valErrsNestedArray.length; i++) {
      let thisValErrorObj = valErrsNestedArray[i];
      let thisValErrorObjKeys = Object.keys(thisValErrorObj);
      for (let i = 0; i < thisValErrorObjKeys.length; i++) {
        let thisValErrorObjKey = thisValErrorObjKeys[i];
        let thisValErrorObjSubArray = thisValErrorObj[thisValErrorObjKey];
        for (let i = 0; i < thisValErrorObjSubArray.length; i++) {
          let thisValError = thisValErrorObjSubArray[i];
          this.notifyFn(thisValError, "error");
        }
      }
    }
  };
  updateThisObjsValErrs = (thisObjsValErrsObj, valErrsNestedArray) => {
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
    this.notifyOfErrors(valErrsNestedArray);
    return thisObjsValErrsObj;
  };
  parseHTTPResErrs = (errs, propToDisplayErrs) => {
    let svrErrMsg = errs.response.data;
    let errMsgs = [];
    let pattern = /castError/;
    let resStatus = errs.response.status;
    if (resStatus >= 400) {
      switch (resStatus) {
        case 400:
          if (pattern.test(svrErrMsg)) {
            errMsgs.push("Bad request: URL may be invalid");
          } else {
            errMsgs.push(
              "Something went wrong: Refresh, wait a moment and try again"
            );
          }
          break;
        case 401:
          errMsgs.push("You must be logged-in to access this record");
          break;
        case 403:
          errMsgs.push("You do not have permission to access this record");
          break;
        case 404:
          errMsgs.push("Record not found: ID may be invalid");
          break;
        default:
          if (resStatus >= 500) {
            errMsgs.push("Server error: Refresh, wait a moment and try again");
          }
      }
    }
    let valErrsNestedArray = [{ [propToDisplayErrs]: errMsgs }];
    return valErrsNestedArray;
  };
  getThisWMPFn = async () => {
    const {
      pgReqParams,
      backEndHtmlRoot,
      typeOfRecordToChange,
      thisWMPStateObj,
    } = this.state;
    const thisWMPId = thisWMPStateObj.thisRecord._id;
    const thisRecordJustCreated = pgReqParams.isNewWMP ? true : false;
    const backEndReqUrl = `${backEndHtmlRoot}${typeOfRecordToChange}s/${thisWMPId}1`;
    let stateObjWUpdatedRecord;
    let valErrsObj;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      stateObjWUpdatedRecord = this.replaceThisRecordInStateObj(
        thisWMPStateObj,
        backEndReqResponse.data,
        typeOfRecordToChange
      );
    } catch (errs) {
      const valErrsNestedArray = this.parseHTTPResErrs(errs, "name");
      stateObjWUpdatedRecord = thisWMPStateObj;
      let emptyValErrsObj = { weekMealPlan: { name: [] } };
      valErrsObj = this.updateThisObjsValErrs =
        (emptyValErrsObj, valErrsNestedArray);
    }
    stateObjWUpdatedRecord = this.buildInitialStateObj(
      stateObjWUpdatedRecord,
      ["weekMealPlan"],
      stateObjWUpdatedRecord.thisRecord
    );
    if (valErrsObj) {
      stateObjWUpdatedRecord.valErrors = valErrsObj;
    }
    stateObjWUpdatedRecord.justCreated.weekMealPlan = thisRecordJustCreated;
    stateObjWUpdatedRecord.recordLoaded.weekMealPlan = true;
    console.log(stateObjWUpdatedRecord);
  };
  componentDidMount() {
    const currentGRFUser = authService.getCurrentUser();
    this.setState({ currentGRFUser: currentGRFUser });
    this.getThisWMPFn();
  }
  render() {
    const thisWMPRecordId = this.state.thisWMPStateObj.thisRecord._id;
    const typeOfRecordToChange = this.state.typeOfRecordToChange;
    return (
      <div className="container-fluid pl-4 pr-4">
        <ToastContainer
          key={`toastCntnrFor${typeOfRecordToChange}${thisWMPRecordId}`}
          autoClose={2000}
        />
        <h1>Empty</h1>
        {/* <WeekMealPlanCard
          key={`wmpCardFor${typeOfRecordToChange}${thisWMPRecordId}`}
          thisStateObj={this.state.thisWMPStateObj}
          thisStateObjBackup={this.state.thisWMPStateBackup}
          backEndHtmlRoot={this.state.backEndHtmlRoot}
          validatePropFn={this.handleValidateProp}
          onUpdateWeightsFn={this.handleUpdateWeightsFn}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          onClickCopyFn={this.handleClickCopyFn}
          getRndIntegerFn={this.getRndIntegerFn}
          trimEnteredValueFn={this.handleTrimEnteredValueFn}
        />
        <DaysCard
          key={`daysCardFor${typeOfRecordToChange}${thisWMPRecordId}`}
          thisWMPStateObj={this.state.thisWMPStateObj}
          thisStateObj={this.state.thisWeeksDays}
          thisStateObjBackup={this.state.thisWeeksDaysBackup}
          backEndHtmlRoot={this.state.backEndHtmlRoot}
          currentGRFUser={this.state.currentGRFUser}
          validatePropFn={this.handleValidateProp}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          onCreateNewRecordFn={this.handleCreateNewRecordFn}
          populateMealIngrdntsFn={this.populateMealIngrdntsFn}
          getRndIntegerFn={this.getRndIntegerFn}
          trimEnteredValueFn={this.handleTrimEnteredValueFn}
          allUnitOfMeasures={this.state.allUnitOfMeasures}
          allWeightTypes={this.state.allWeightTypes}
          allBrands={this.state.allBrands}
        /> */}
      </div>
    );
  }
}
export default NewNewWeekMealPlan;
