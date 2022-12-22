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
import NewWeekMealPlanCard from "./NewWeekMealPlanCard.component";
import DaysCard from "../DaysCard.component";
import valSchema from "../../universalJoiValSchemaCS";
import rcrdOrFldNameSnctncCase from "../../../staticRefs/rcrdOrFldNameSnctncCase";
import daysOfWeek from "../../../staticRefs/daysOfWeek";
import mealTypes from "../../../staticRefs/mealTypes";
import NewCreateDayButton from "./NewCreateDayButton.component";
import NewDayCard from "./NewDayCard.component";
import CustomHeading from "../CustomHeading.component";
class NewNewWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    const { backEndHtmlRoot, thisGRFUser, match } = this.props;
    const pgReqParams = match.params;
    const thisWMPId = pgReqParams.id;
    this.state = {
      rcrdOrFldNameSnctncCase: rcrdOrFldNameSnctncCase,
      daysOfWeek: daysOfWeek,
      mealTypes: mealTypes,
      typeOfRecordToChange: "weekMealPlan",
      pgReqParams: pgReqParams,
      backEndHtmlRoot: backEndHtmlRoot,
      thisWMPStateObj: {
        thisRecord: { _id: thisWMPId, name: "" },
        recordLoaded: false,
        userType: { weekMealPlan: "viewer" },
      },
      thisWMPStateBackup: {},
      sunday: { thisRecord: { _id: `wmp${thisWMPId}Sunday` } },
      sundayBackup: {},
      monday: { thisRecord: { _id: `wmp${thisWMPId}Monday` } },
      mondayBackup: {},
      tuesday: { thisRecord: { _id: `wmp${thisWMPId}Tuesday` } },
      tuesdayBackup: {},
      wednesday: { thisRecord: { _id: `wmp${thisWMPId}Wednesday` } },
      wednesdayBackup: {},
      thursday: { thisRecord: { _id: `wmp${thisWMPId}Thursday` } },
      thursdayBackup: {},
      friday: { thisRecord: { _id: `wmp${thisWMPId}Friday` } },
      fridayBackup: {},
      saturday: { thisRecord: { _id: `wmp${thisWMPId}Saturday` } },
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
    retrievedRecord,
    typeOfRecordToChange
  ) => {
    switch (typeOfRecordToChange) {
      case "ingredient":
        thisStateObj.thisRecord.genRecipeIngredient.ingredient =
          retrievedRecord;
        break;
      case "genRecipeIngredient" || "genRecipe":
        thisStateObj.thisRecord[typeOfRecordToChange] = retrievedRecord;
        break;
      default:
        thisStateObj.thisRecord = retrievedRecord;
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
    thisStateObj.hasChildren = {};
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
      thisStateObj.hasChildren = this.updateStateObjMetaKeyValue(
        thisStateObj.hasChildren,
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
  getThisDaysMealsFn = async (thisDayStateObj) => {
    let thisDayRecord = thisDayStateObj.thisRecord;
    let thisDaysId = thisDayRecord._id;
    const { mealTypes, backEndHtmlRoot } = this.state;
    const backEndReqUrl = `${backEndHtmlRoot}meals/mealsOfThisDay/${thisDaysId}`;
    let daysMealsReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "meal",
      ["meal", "genRecipe"]
    );
    let countOfLinkedMeals = 0;
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
          thisMealStateObjToUpdate.hasChildren.genRecipe =
            thisGenRcpsGenRcpIngrdnts.length > 0 ? true : false;
          let getMealsIngrdntsResult = await this.getThisMealsIngrdnts(
            thisMealsId
          );
          thisMealStateObjToUpdate.thisMealsIngrdnts = getMealsIngrdntsResult
            ? getMealsIngrdntsResult
            : [];
          thisMealStateObjToUpdate.hasChildren.meal =
            getMealsIngrdntsResult.length > 0 ? true : false;
          thisDayStateObj[mealTypes[i].code] = thisMealStateObjToUpdate;
          countOfLinkedMeals++;
        } else {
          thisDayStateObj[mealTypes[i].code] = {
            thisRecord: {
              _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
              mealType: mealTypes[i],
              day: thisDayRecord,
            },
            recordLoaded: true,
          };
        }
      }
      return { thisDayStateObj: thisDayStateObj, countOfLinkedMeals };
    }
  };
  getThisWeeksDaysFn = async (state, thisWMPRecord) => {
    const thisWMPId = thisWMPRecord._id;
    const daysOfWeek = state.daysOfWeek;
    const backEndReqUrl = `${state.backEndHtmlRoot}days/daysofthiswmp/${thisWMPId}`;
    let wmpsDaysReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "day",
      ["day"]
    );

    let countOfLinkedDays = 0;
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
          let getDaysMealsResults = await this.getThisDaysMealsFn(
            thisDayStateObjToUpdate
          );
          thisDayStateObjToUpdate = getDaysMealsResults.thisDayStateObj;
          let countOfLinkedMeals = getDaysMealsResults.countOfLinkedMeals;
          thisDayStateObjToUpdate.hasChildren.day =
            countOfLinkedMeals > 0 ? true : false;
          state[thisDayOfWeek.code] = thisDayStateObjToUpdate;
          countOfLinkedDays++;
        } else {
          state[thisDayOfWeek.code] = {
            thisRecord: {
              _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
              dayOfWeek: daysOfWeek[i],
              weekMealPlan: thisWMPRecord,
            },
          };
        }
      }
      return { state: state, countOfLinkedDays: countOfLinkedDays };
    }
  };
  getThisWMPFn = async () => {
    let state = this.state;
    let { thisWMPStateObj, backEndHtmlRoot, pgReqParams } = state;
    let thisWMPRecord = thisWMPStateObj.thisRecord;
    let thisWMPId = thisWMPRecord._id;
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
      let getWeeksDaysResult = await this.getThisWeeksDaysFn(
        state,
        thisWMPRecord
      );
      let updatedState = getWeeksDaysResult.state;
      let countOfLinkedDays = getWeeksDaysResult.countOfLinkedDays;
      updatedState.thisWMPStateObj.hasChildren.weekMealPlan =
        countOfLinkedDays > 0 ? true : false;
      this.setState(state);
    }
  };
  componentDidMount() {
    const currentGRFUser = authService.getCurrentUser();
    this.setState({ currentGRFUser: currentGRFUser });
    this.getThisWMPFn();
  }
  handleCopyWMPFn = () => {
    console.log("copy wmp");
  };
  handleCreateNewRecordFn = (
    typeOfRecordToCreate,
    thisDayOfWeekCode,
    thisMealTypeCode
  ) => {
    console.log("create new record");
  };
  getCSValResultForProp = async (
    typeOfRecordToChange,
    propToUpdate,
    newValue,
    thisObjsValErrsObj
  ) => {
    const recordToUpdate = { [propToUpdate]: newValue };
    const csValResult = await csValidateObj(
      typeOfRecordToChange,
      recordToUpdate
    );
    const newThisObjsValErrsObj = this.updateThisObjsValErrs(
      thisObjsValErrsObj,
      csValResult
    );
    return newThisObjsValErrsObj;
  };
  handleUpdateWMPPropFn = async (propToUpdate, newValue) => {
    let thisWMPStateObj = this.state.thisWMPStateObj;
    thisWMPStateObj.thisRecord[propToUpdate] = newValue;
    let thisValErrsObj = thisWMPStateObj.valErrors.weekMealPlan;
    let updatedValErrsObj = await this.getCSValResultForProp(
      "weekMealPlan",
      propToUpdate,
      newValue,
      thisValErrsObj
    );
    thisWMPStateObj.valErrors.weekMealPlan = updatedValErrsObj;
    thisWMPStateObj.recordChanged.weekMealPlan = true;
    this.setState({ thisWMPStateObj: thisWMPStateObj });
  };
  returnElementKey = (
    indexOfObj,
    thisObjName,
    propToUpdate,
    typeOfRecordToChange,
    arrayIndex,
    thisMealTypeCode,
    thisDayOfWeekCode
  ) => {
    return `${thisObjName ? thisObjName : "Null"}${
      indexOfObj ? indexOfObj : "Null"
    }ForProp${propToUpdate ? propToUpdate : "Null"}For${
      typeOfRecordToChange ? typeOfRecordToChange : "Null"
    }Num${arrayIndex ? arrayIndex : "Null"}ForMeal${
      thisMealTypeCode ? thisMealTypeCode : "Null"
    }ForDay${thisDayOfWeekCode ? thisDayOfWeekCode : "Null"}ForThisWMP`;
  };
  handleUpdateMealOrChildPropFn = async (
    propToUpdate,
    newValue,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    let state = this.state;
    const daysOfWeek = state.daysOfWeek;
    const mealTypes = state.mealTypes;
    let thisDayStateObj = state[thisDayOfWeekCode];
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj[thisMealTypeCode]
      : null;
    let thisMealIngrdntStateObj = arrayIndex
      ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
      : null;
    let stateObjToUpdate;
    let updatedRecord;
    switch (typeOfRecordToChange) {
      case "meal" || "genRecipe":
        stateObjToUpdate = thisMealStateObj;
        if (typeOfRecordToChange === "meal") {
          updatedRecord = stateObjToUpdate.thisRecord;
        } else {
          updatedRecord = stateObjToUpdate.thisRecord.genRecipe;
        }
        break;
      default:
        stateObjToUpdate = thisMealIngrdntStateObj;
        switch (typeOfRecordToChange) {
          case "mealIngredient":
            updatedRecord = stateObjToUpdate.thisRecord;
            break;
          case "genRecipeIngredient":
            updatedRecord = stateObjToUpdate.thisRecord[typeOfRecordToChange];
          default:
            updatedRecord =
              stateObjToUpdate.thisRecord["genRecipeIngredient"][
                typeOfRecordToChange
              ];
        }
    }
    updatedRecord[propToUpdate] = newValue;
    if (
      typeOfRecordToChange === "meal" ||
      typeOfRecordToChange === "mealIngredient"
    ) {
    } else {
      let changedRecordId = updatedRecord._id;
      for (let i = 0; i < daysOfWeek.length; i++) {
        let localDayOfWeekCode = daysOfWeek[i].code;
        let localDayStateObj = state[localDayOfWeekCode];
        for (let i = 0; i < mealTypes.length; i++) {
          let localMealTypeCode = mealTypes[i].code;
          let localMealStateObj = localDayStateObj[localMealTypeCode];
          if (typeOfRecordToChange === "genRecipe") {
            let localRecord = localMealStateObj.thisRecord;
            let localSubRecordId = localRecord[typeOfRecordToChange]["_id"];
            if (changedRecordId === localSubRecordId) {
              localRecord[typeOfRecordToChange][propToUpdate] = newValue;
            }
            localMealStateObj.thisRecord = localRecord;
          } else {
            let localMealsIngrdnts = localMealStateObj.thisMealsIngrdnts;
            for (let i = 0; i < localMealsIngrdnts.length; i++) {
              let localMealIngrdntStateObj = localMealsIngrdnts[i];
              let localRecord = localMealIngrdntStateObj.thisRecord;
              if (typeOfRecordToChange === "genRecipeIngredient") {
                let localSubRecordId = localRecord[typeOfRecordToChange]["_id"];
                if (changedRecordId === localSubRecordId) {
                  localRecord[typeOfRecordToChange][propToUpdate] = newValue;
                }
              } else {
                let localSubRecordId =
                  localRecord["genRecipeIngredient"][typeOfRecordToChange][
                    "_id"
                  ];
                if (changedRecordId === localSubRecordId) {
                  localRecord["genRecipeIngredient"][typeOfRecordToChange][
                    propToUpdate
                  ] = newValue;
                }
              }
              localMealIngrdntStateObj.thisRecord = localRecord;
              localMealsIngrdnts[i] = localMealIngrdntStateObj;
            }
            localMealStateObj.thisMealsIngrdnts = localMealsIngrdnts;
          }
          localDayStateObj[localMealTypeCode] = localMealStateObj;
        }
        state[localDayOfWeekCode] = localDayStateObj;
      }
    }
    switch (typeOfRecordToChange) {
      case "meal" || "mealIngredient":
        stateObjToUpdate.thisRecord = updatedRecord;
        break;
      case "genRecipe" || "genRecipeIngredient":
        stateObjToUpdate.thisRecord[typeOfRecordToChange] = updatedRecord;
        break;
      default:
        stateObjToUpdate.thisRecord["genRecipeIngredient"][
          typeOfRecordToChange
        ] = updatedRecord;
    }
    stateObjToUpdate.recordChanged[typeOfRecordToChange] = true;
    let thisValErrsObj = stateObjToUpdate.valErrors[typeOfRecordToChange];
    let updatedValErrsObj = await this.getCSValResult(
      typeOfRecordToChange,
      updatedRecord,
      propToUpdate,
      newValue,
      thisValErrsObj
    );
    stateObjToUpdate.valErrors[typeOfRecordToChange] = updatedValErrsObj;
    if (thisMealIngrdntStateObj) {
      thisMealIngrdntStateObj = stateObjToUpdate;
      thisMealStateObj.thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
    } else {
      thisMealStateObj = stateObjToUpdate;
    }
    thisDayStateObj[thisMealTypeCode] = thisMealStateObj;
    state[thisDayOfWeekCode] = thisDayStateObj;
    this.setState(state);
  };
  handleSaveChangesFn = () => {
    console.log("save changes");
  };
  handleStartEditingFn = (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    let pattern = /missing/;
    let state = this.state;
    let { daysOfWeek, mealTypes } = state;
    state.thisWMPStateBackup = _.cloneDeep(state.thisWMPStateObj);
    state.thisWMPStateObj.userType.weekMealPlan = "viewer";
    if (typeOfRecordToChange === "weekMealPlan") {
      state.thisWMPStateObj.editingForm.weekMealPlan = true;
    }
    for (let i = 0; i < daysOfWeek.length; i++) {
      let localDayOfWeekCode = daysOfWeek[i].code;
      let thisDayStateObj = state[localDayOfWeekCode];
      let thisDayId = thisDayStateObj.thisRecord._id;
      let testResult = pattern.test(thisDayId);
      if (!testResult) {
        let thisDayStateObjBackup = _.cloneDeep(thisDayStateObj);
        state[`${localDayOfWeekCode}Backup`] = thisDayStateObjBackup;
        if (
          thisDayOfWeekCode === localDayOfWeekCode &&
          typeOfRecordToChange === "day"
        ) {
          thisDayStateObj.editingForm.day = true;
        } else {
          thisDayStateObj.userType.day = "viewer";
        }
        for (let i = 0; i < mealTypes.length; i++) {
          let localMealTypeCode = mealTypes[i].code;
          let thisMealStateObj = thisDayStateObj[localMealTypeCode];
          let thisMealId = thisMealStateObj.thisRecord._id;
          let testResult = pattern.test(thisMealId);
          if (!testResult) {
            let thisMealStateObjBackup =
              thisDayStateObjBackup[localMealTypeCode];
            thisMealStateObj.userType = { meal: "viewer", genRecipe: "viewer" };
            if (thisMealTypeCode === localMealTypeCode) {
              if (
                typeOfRecordToChange === "meal" ||
                typeOfRecordToChange === "genRecipe"
              ) {
                thisMealStateObj.editingForm[typeOfRecordToChange] = true;
                thisMealStateObj.userType[typeOfRecordToChange] =
                  thisMealStateObjBackup.userType[typeOfRecordToChange];
              }
            }
            let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            for (let i = 0; i < thisMealsIngrdnts.length; i++) {
              let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
              let thisMealIngrdntStateObjBackup =
                thisMealStateObjBackup.thisMealsIngrdnts[i];
              thisMealIngrdntStateObj.userType = {
                mealIngredient: "viewer",
                genRecipeIngredient: "viewer",
                ingredient: "viewer",
              };
              if (arrayIndex === i) {
                if (
                  typeOfRecordToChange === "mealIngredient" ||
                  typeOfRecordToChange === "genRecipeIngredient" ||
                  typeOfRecordToChange === "ingredient"
                ) {
                  thisMealIngrdntStateObj.editingForm[
                    typeOfRecordToChange
                  ] = true;
                  thisMealIngrdntStateObj.userType[typeOfRecordToChange] =
                    thisMealIngrdntStateObjBackup.userType[
                      typeOfRecordToChange
                    ];
                }
              }
              thisMealsIngrdnts[i] = thisMealIngrdntStateObj;
            }
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisDayStateObj[localMealTypeCode] = thisMealStateObj;
          }
        }
        state[localDayOfWeekCode] = thisDayStateObj;
      }
    }
    this.setState(state);
  };
  handleCancelEditFn = () => {
    let pattern = /missing/;
    let state = this.state;
    let restoredWMPStateObj = _.cloneDeep(state.thisWMPStateBackup);
    state.thisWMPStateObj = restoredWMPStateObj;
    state.thisWMPStateBackup = {};
    for (let i = 0; i < state.daysOfWeek.length; i++) {
      let thisDayStateObj = state[daysOfWeek[i].code];
      let thisDaysId = thisDayStateObj.thisRecord._id;
      let testResult = pattern.test(thisDaysId);
      if (!testResult) {
        let restoredDayStateObj = _.cloneDeep(
          state[`${daysOfWeek[i].code}Backup`]
        );
        state[daysOfWeek[i].code] = restoredDayStateObj;
        state[`${daysOfWeek[i].code}Backup`] = {};
      }
    }
    this.setState(state);
  };
  handleDeleteObjFn = () => {
    console.log("delete obj");
  };
  renderDay = (thisDayOfWeekCode, thisDayOfWeekName) => {
    let { thisWMPStateObj } = this.state;
    let wmpUserType = thisWMPStateObj.userType.weekMealPlan;
    let pattern = /missing/;
    let thisDayStateObj = this.state[thisDayOfWeekCode];
    let thisDaysId = thisDayStateObj.thisRecord._id;
    let testResult = pattern.test(thisDaysId);
    if (testResult) {
      if (wmpUserType === "admin" || wmpUserType === "author") {
        return (
          <NewCreateDayButton
            commonProps={{
              commonData: {},
              commonMethods: {
                returnElementKey: this.returnElementKey,
                onCreateNewRecordFn: this.handleCreateNewRecordFn,
              },
            }}
            specificProps={{
              specificData: { thisStateObj: thisDayStateObj },
              specificMethods: {},
            }}
          />
        );
      } else {
        return (
          <div className="alert alert-secondary" role="alert">
            <em>
              <span>No {thisDayOfWeekName}</span> Meal Plan added to this
              week...
            </em>
          </div>
        );
      }
    } else {
      return (
        <NewDayCard
          commonProps={{
            commonData: {},
            commonMethods: {
              getRndIntegerFn: this.getRndIntegerFn,
              returnElementKey: this.returnElementKey,
              onCreateNewRecordFn: this.handleCreateNewRecordFn,
              onUpdatePropFn: this.handleUpdateMealOrChildPropFn,
              onSaveChangesFn: this.handleSaveChangesFn,
              onStartEditingFn: this.handleStartEditingFn,
              onCancelEditFn: this.handleCancelEditFn,
              onDeleteObjFn: this.handleDeleteObjFn,
            },
          }}
          specificProps={{
            specificData: { thisStateObj: thisDayStateObj },
            specificMethods: {},
          }}
        />
      );
    }
  };
  render() {
    const thisWMPRecordId = this.state.thisWMPStateObj.thisRecord._id;
    const typeOfRecordToChange = this.state.typeOfRecordToChange;
    const wmpRecordLoaded =
      this.state.thisWMPStateObj.recordLoaded.weekMealPlan;
    return (
      <div className="container-fluid pl-4 pr-4">
        <ToastContainer
          key={`toastCntnrFor${typeOfRecordToChange}${thisWMPRecordId}`}
          autoClose={2000}
        />
        <NewWeekMealPlanCard
          commonProps={{
            commonData: {},
            commonMethods: {
              getRndIntegerFn: this.getRndIntegerFn,
              returnElementKey: this.returnElementKey,
              onCreateNewRecordFn: this.handleCreateNewRecordFn,
              onUpdatePropFn: this.handleUpdateWMPPropFn,
              onSaveChangesFn: this.handleSaveChangesFn,
              onStartEditingFn: this.handleStartEditingFn,
              onCancelEditFn: this.handleCancelEditFn,
              onDeleteObjFn: this.handleDeleteObjFn,
            },
          }}
          specificProps={{
            specificData: { thisStateObj: this.state.thisWMPStateObj },
            specificMethods: {},
          }}
        />
        <div className="card mt-3 mb-3">
          <div className="card-header">
            <CustomHeading
              key={`customDayMealPlnsHeadingFor${typeOfRecordToChange}${thisWMPRecordId}`}
              headingLvl={2}
              recordLoaded={wmpRecordLoaded}
              headingText="Day Meal Plans"
              hdngIsReqFormLbl={false}
              editingForm={false}
              headingClasses="card-title"
            />
          </div>
          <div className="card-body">
            <div
              className="accordion accordion-flush"
              id={"accordionFull" + thisWMPRecordId}
            >
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={"accordionHeader" + thisWMPRecordId}
                >
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#dayAccrdn" + thisWMPRecordId}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  ></button>
                </h2>
              </div>
              <div
                id={"dayAccrdn" + thisWMPRecordId}
                className="accordion-collapse collapse show"
                aria-labelledby={"#accordionHeader" + thisWMPRecordId}
                data-bs-parent={"#accordionFull" + thisWMPRecordId}
              >
                <div className="accordion-body wkDaysAccrdnBdy">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.getThisWMPFn}
                  >
                    Reload
                  </button>
                  {this.renderDay("sunday", "Sunday")}
                  {this.renderDay("monday", "Monday")}
                  {this.renderDay("tuesday", "Tuesday")}
                  {this.renderDay("wednesday", "Wednesday")}
                  {this.renderDay("thursday", "Thursday")}
                  {this.renderDay("friday", "Friday")}
                  {this.renderDay("saturday", "Saturday")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NewNewWeekMealPlan;
