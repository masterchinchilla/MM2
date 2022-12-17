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
import daysOfWeek from "../../../staticRefs/daysOfWeek";
import mealTypes from "../../../staticRefs/mealTypes";
class NewNewWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    const { backEndHtmlRoot, thisGRFUser, match } = this.props;
    const pgReqParams = match.params;
    this.state = {
      rcrdOrFldNameSnctncCase: rcrdOrFldNameSnctncCase,
      daysOfWeek: daysOfWeek,
      mealTypes: mealTypes,
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
        true
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
          if (resStatus >= 500) {
            errMsgs.push("Server error: Refresh, wait a moment and try again");
          }
      }
    }
    let valErrsNestedArray = [{ [propToDisplayErrs]: errMsgs }];
    return valErrsNestedArray;
  };
  getRecordsFromBackEnd = async (
    backEndReqUrl,
    typeOfRecordToGet,
    recordTypesForStateObj
  ) => {
    let valErrors;
    let stateObjsArray = [];
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      const recordsArray = backEndReqResponse.data;
      for (let i = 0; i < recordsArray.length; i++) {
        let stateObjWUpdatedRecord = this.replaceThisRecordInStateObj(
          {},
          recordsArray[i],
          typeOfRecordToGet
        );
        stateObjWUpdatedRecord = this.buildInitialStateObj(
          stateObjWUpdatedRecord,
          recordTypesForStateObj,
          recordsArray[i]
        );
        stateObjsArray.push(stateObjWUpdatedRecord);
      }
    } catch (errs) {
      //valErrorsNestedArray shape:
      //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
      valErrors = this.parseHTTPResErrs(errs, "all");
      this.notifyOfErrors(valErrors);
    }
    return { stateObjsArray, valErrors };
  };
  getThisMealsIngrdnts = async (thisMealsId) => {
    const backEndHtmlRoot = this.state.backEndHtmlRoot;
    const backEndReqUrl = `${backEndHtmlRoot}mealIngredients/thisMealsMealIngredients/${thisMealsId}`;
    let thisMlsIngrdntsReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "mealIngredient",
      ["mealIngredient", "genRecipeIngredient", "ingredient"]
    );
    return thisMlsIngrdntsReqResult.stateObjsArray;
  };
  getThisDaysMealsFn = async (thisDaysId) => {
    const { mealTypes, backEndHtmlRoot } = this.state;
    const backEndReqUrl = `${backEndHtmlRoot}meals/mealsOfThisDay/${thisDaysId}`;
    let thisDaysMeals = {};
    let daysMealsReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "meal",
      ["meal", "genRecipe"]
    );
    if (daysMealsReqResult.valErrors) {
      return {};
    } else {
      for (let i = 0; i < mealTypes.length; i++) {
        let thisMealType = mealTypes[i];
        let thisMealsFromBackEndArray =
          daysMealsReqResult.stateObjsArray.filter(
            (meal) => meal.thisRecord.mealType._id === thisMealType._id
          );
        if (thisMealsFromBackEndArray.length > 0) {
          let thisMealStateObjToUpdate = thisMealsFromBackEndArray[0];
          let thisMealGenRecipeId =
            thisMealStateObjToUpdate.thisRecord.genRecipe._id;
          let recipeIngrdntsReqURL = `${backEndHtmlRoot}genRecipeIngredients/thisGenRecipesGenRecipeIngredients/${thisMealGenRecipeId}`;
          let thisGenRcpsGenRcpIngrdnts;
          try {
            let genRcpsIngrdntsReqResult = await httpService.get(
              recipeIngrdntsReqURL
            );
            thisGenRcpsGenRcpIngrdnts = genRcpsIngrdntsReqResult.data;
          } catch (errs) {
            //valErrorsNestedArray shape:
            //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
            let valErrors = this.parseHTTPResErrs(errs, "all");
            this.notifyOfErrors(valErrors);
            thisGenRcpsGenRcpIngrdnts = [];
          }
          let thisMealsId = thisMealStateObjToUpdate.thisRecord._id;
          thisMealStateObjToUpdate.thisGenRcpsGenRcpIngrdnts =
            thisGenRcpsGenRcpIngrdnts;
          thisMealStateObjToUpdate.thisMealsIngrdnts =
            await this.getThisMealsIngrdnts(thisMealsId);
          thisDaysMeals[mealTypes[i].code] = thisMealStateObjToUpdate;
        } else {
          thisDaysMeals[mealTypes[i].code] = {
            thisRecord: {
              _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
            },
          };
        }
      }
      return thisDaysMeals;
    }
  };
  getThisWeeksDaysFn = async (state, thisWMPId) => {
    const daysOfWeek = state.daysOfWeek;
    const backEndReqUrl = `${state.backEndHtmlRoot}days/daysofthiswmp/${thisWMPId}`;
    let wmpsDaysReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "day",
      ["day"]
    );
    if (wmpsDaysReqResult.valErrors) {
      return;
    } else {
      for (let i = 0; i < daysOfWeek.length; i++) {
        let thisDayOfWeek = daysOfWeek[i];
        let thisDOWFromBackEndArray = wmpsDaysReqResult.stateObjsArray.filter(
          (day) => day.thisRecord.dayOfWeek._id === thisDayOfWeek._id
        );
        if (thisDOWFromBackEndArray.length > 0) {
          let thisDayStateObjToUpdate = thisDOWFromBackEndArray[0];
          thisDayStateObjToUpdate.thisDaysMeals = await this.getThisDaysMealsFn(
            thisDayStateObjToUpdate.thisRecord._id
          );
          state[thisDayOfWeek.code] = thisDayStateObjToUpdate;
        } else {
          state[thisDayOfWeek.code] = {
            thisRecord: {
              _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
            },
          };
        }
      }
      this.setState(state);
    }
  };
  getThisWMPFn = async () => {
    let state = this.state;
    let { thisWMPStateObj, backEndHtmlRoot, pgReqParams } = state;
    let thisWMPId = thisWMPStateObj.thisRecord._id;
    const backEndReqUrl = `${backEndHtmlRoot}weekMealPlans/${thisWMPId}`;
    let wmpReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "weekMealPlan",
      ["weekMealPlan"]
    );
    if (wmpReqResult.valErrors) {
      return;
    } else {
      const thisRecordJustCreated = pgReqParams.isNewWMP ? true : false;
      thisWMPStateObj = wmpReqResult.stateObjsArray[0];

      thisWMPStateObj.justCreated.weekMealPlan = thisRecordJustCreated;
      state.thisWMPStateObj = thisWMPStateObj;
      this.getThisWeeksDaysFn(state, thisWMPId);
    }
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
