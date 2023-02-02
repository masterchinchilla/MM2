import React, { Component } from "react";
import _ from "lodash";
import httpService from "../services/httpService";
import authService from "../services/authService";
import { csValidateObj } from "../services/validationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";
import NewWeekMealPlanCard from "./NewWeekMealPlanCard.component";
import rcrdOrFldNameSnctncCase from "../staticRefs/rcrdOrFldNameSnctncCase";
import rcrdOrFldNameSntncCaseAndPropTypForVal from "../staticRefs/rcrdOrFldNameSntncCaseAndPropTypForVal";
import daysOfWeek from "../staticRefs/daysOfWeek";
import mealTypes from "../staticRefs/mealTypes";
import newRecordTemplates from "../staticRefs/newRecordTemplates";
import NewCreateDayButton from "./NewCreateDayButton.component";
import NewDayCard from "./NewDayCard.component";
import CustomHeading from "./CustomHeading.component";
import ShoppingList from "./ShoppingList.component";
class NewNewWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    const { backEndHtmlRoot, thisGRFUser, match } = this.props;
    const pgReqParams = match.params;
    const thisWMPId = pgReqParams.id;
    this.player = React.createRef();
    this.state = {
      mode: "builder",
      copyingWMP: false,
      showWMPCopyProgressBar: false,
      numOfWMPItemsToCopy: 0,
      currentGRFUser: thisGRFUser,
      rcrdOrFldNameSnctncCase: rcrdOrFldNameSnctncCase,
      daysOfWeek: daysOfWeek,
      mealTypes: mealTypes,
      newRecordTemplates: newRecordTemplates,
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
      allGenRecipes: [],
      pantryItems: [],
    };
  }
  getRndIntegerFn = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  notifyFn = (notice, noticeType) => {
    this.props.notifyFn(notice, noticeType);
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
      case "genRecipeIngredient":
        thisStateObj.thisRecord[typeOfRecordToChange] = retrievedRecord;
        break;
      case "genRecipe":
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
      case "genRecipeIngredient":
        keyValue = thisRecord[typeOfRecordToChange][key];
        break;
      case "genRecipe":
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
    thisStateObj.allowCopy = {};
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
      let recordForKeys = {};
      let relevantUserId;
      switch (recordTypesArray[i]) {
        case "ingredient":
          recordForKeys = thisRecord.genRecipeIngredient[recordTypesArray[i]];
          relevantUserId = recordForKeys.GRFUser._id;
          break;
        case "genRecipeIngredient":
          recordForKeys = thisRecord[recordTypesArray[i]];
          relevantUserId = recordForKeys.genRecipe.GRFUser._id;
          break;
        case "genRecipe":
          recordForKeys = thisRecord[recordTypesArray[i]];
          relevantUserId = recordForKeys.GRFUser._id;
          break;
        default:
          recordForKeys = thisRecord;
          relevantUserId = this.state.currentGRFUser._id;
          if (recordTypesArray[i] === "weekMealPlan") {
            thisStateObj.allowCopy.weekMealPlan = true;
          }
      }
      let updatedValErrorsObj = this.setAllKeysToSameValue(
        recordForKeys,
        {},
        []
      );
      thisStateObj.valErrors = this.updateStateObjMetaKeyValue(
        thisStateObj.valErrors,
        recordTypesArray[i],
        updatedValErrorsObj
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
      thisStateObj.recordLoaded = true;
      let hasChildrenBoolValue =
        recordTypesArray[i] === "genRecipeIngredient" ||
        recordTypesArray[i] === "ingredient"
          ? true
          : false;
      thisStateObj.hasChildren = this.updateStateObjMetaKeyValue(
        thisStateObj.hasChildren,
        recordTypesArray[i],
        hasChildrenBoolValue
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
  parseHTTPResErrs = (errs) => {
    let svrErrMsg = errs.response.data;
    let valErrsNestedArray;
    // = [{ [propToDisplayErrs]: errMsgs }];
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
          if (resStatus >= 500) {
            errMsgs.push("Server error: Refresh, wait a moment and try again");
          }
      }
      valErrsNestedArray = [{ all: errMsgs }];
    } else if (resStatus === 400) {
      if (pattern.test(svrErrMsg)) {
        errMsgs.push("Bad request: URL may be invalid");
        valErrsNestedArray = [{ all: errMsgs }];
      } else {
        console.log(errs.response.data.valErrorsArray);
        valErrsNestedArray = errs.response.data.valErrorsArray;
      }
    }
    return valErrsNestedArray;
  };
  assembleStateObjWNewRcrd = (
    recordsArray,
    typeOfRecord,
    recordTypesForStateObj
  ) => {
    let stateObjsArray = [];
    for (let i = 0; i < recordsArray.length; i++) {
      let stateObjWUpdatedRecord = this.replaceThisRecordInStateObj(
        {},
        recordsArray[i],
        typeOfRecord
      );
      stateObjWUpdatedRecord = this.buildInitialStateObj(
        stateObjWUpdatedRecord,
        recordTypesForStateObj,
        recordsArray[i]
      );
      stateObjsArray.push(stateObjWUpdatedRecord);
    }
    return stateObjsArray;
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
      stateObjsArray = this.assembleStateObjWNewRcrd(
        recordsArray,
        typeOfRecordToGet,
        recordTypesForStateObj
      );
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
  getThisGenRcpsGenRcpIngrdnts = async (thisMealGenRecipeId) => {
    let recipeIngrdntsReqURL = `${this.state.backEndHtmlRoot}genRecipeIngredients/thisGenRecipesGenRecipeIngredients/${thisMealGenRecipeId}`;
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
    return thisGenRcpsGenRcpIngrdnts;
  };
  updateMealWGenRcpsGenRcpIngrdnts = async (thisMealStateObjToUpdate) => {
    let thisMealGenRecipeId = thisMealStateObjToUpdate.thisRecord.genRecipe._id;
    let thisGenRcpsGenRcpIngrdnts = await this.getThisGenRcpsGenRcpIngrdnts(
      thisMealGenRecipeId
    );
    thisMealStateObjToUpdate.thisGenRcpsGenRcpIngrdnts =
      thisGenRcpsGenRcpIngrdnts;
    thisMealStateObjToUpdate.hasChildren.genRecipe =
      thisGenRcpsGenRcpIngrdnts.length > 0 ? true : false;
    return thisMealStateObjToUpdate;
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
    let countOfLinkedMealIngrdnts = 0;
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
          thisMealStateObjToUpdate =
            await this.updateMealWGenRcpsGenRcpIngrdnts(
              thisMealStateObjToUpdate
            );
          let thisMealsId = thisMealStateObjToUpdate.thisRecord._id;
          let getMealsIngrdntsResult = await this.getThisMealsIngrdnts(
            thisMealsId
          );
          let thisMealsIngrdnts = getMealsIngrdntsResult
            ? getMealsIngrdntsResult
            : [];
          thisMealStateObjToUpdate.thisMealsIngrdnts = thisMealsIngrdnts;
          countOfLinkedMealIngrdnts += getMealsIngrdntsResult.length;
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
      return {
        thisDayStateObj: thisDayStateObj,
        countOfLinkedMeals: countOfLinkedMeals,
        countOfLinkedMealIngrdnts: countOfLinkedMealIngrdnts,
      };
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
    let countOfLinkedMeals = 0;
    let countOfLinkedMealIngrdnts = 0;
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
          countOfLinkedMeals += getDaysMealsResults.countOfLinkedMeals;
          countOfLinkedMealIngrdnts +=
            getDaysMealsResults.countOfLinkedMealIngrdnts;
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
      return {
        state: state,
        countOfLinkedDays: countOfLinkedDays,
        countOfLinkedMeals: countOfLinkedMeals,
        countOfLinkedMealIngrdnts: countOfLinkedMealIngrdnts,
      };
    }
  };
  getFullRecordSet = async (typeOfRecordToChange) => {
    const backEndHtmlRoot = this.state.backEndHtmlRoot;
    const backEndReqUrl = `${backEndHtmlRoot}${typeOfRecordToChange}s/`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      return backEndReqResponse.data;
    } catch (errs) {
      const valErrors = this.parseHTTPResErrs(errs, "all");
      this.notifyOfErrors(valErrors);
      return [];
    }
  };
  getAllUOMsWTsBrndsNRecipes = async () => {
    let allUnitOfMeasures = await this.getFullRecordSet("unitOfMeasure");
    let allWeightTypes = await this.getFullRecordSet("weightType");
    let allBrands = await this.getFullRecordSet("brand");
    let allGenRecipes = await this.getFullRecordSet("genRecipe");
    return {
      allUnitOfMeasures: allUnitOfMeasures,
      allWeightTypes: allWeightTypes,
      allBrands: allBrands,
      allGenRecipes: allGenRecipes,
    };
  };
  handleGetUsersPantryItemsFn = async (backEndHtmlRoot, currentGRFUser) => {
    const backEndReqUrl = `${backEndHtmlRoot}pantryItems/thisUsersPantry/${currentGRFUser._id}`;
    let pantryItemsReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "pantryItem",
      ["pantryItem"]
    );
    console.log(pantryItemsReqResult);
    if (pantryItemsReqResult.valErrors) {
      this.notifyFn(
        "Could not get user's Pantry Items, try refreshing the page."
      );
    } else {
      return pantryItemsReqResult.stateObjsArray;
    }
  };
  handleChangePantryItemFnQtyHave = (shoppingListItem, newValue) => {
    let pantryItemId = shoppingListItem.pantryItem.thisRecord._id;
    let pantryItems = this.state.pantryItems;
    let matchingPantryItemIndex = pantryItems.findIndex(
      (item) => item.thisRecord._id === pantryItemId
    );
    let matchingPantryItem = pantryItems[matchingPantryItemIndex];
    matchingPantryItem.thisRecord.qtyHave = newValue;
    pantryItems[matchingPantryItemIndex] = matchingPantryItem;
    this.setState({ pantryItems: pantryItems });
  };
  getThisWMPFn = async () => {
    let state = this.state;
    let { thisWMPStateObj, backEndHtmlRoot, pgReqParams, currentGRFUser } =
      state;
    let thisWMPRecord = thisWMPStateObj.thisRecord;
    let thisWMPId = thisWMPRecord._id;
    const backEndReqUrl = `${backEndHtmlRoot}weekMealPlans/${thisWMPId}`;
    let wmpReqResult = await this.getRecordsFromBackEnd(
      backEndReqUrl,
      "weekMealPlan",
      ["weekMealPlan"]
    );
    console.log(wmpReqResult);
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
      let countOfLinkedMeals = getWeeksDaysResult.countOfLinkedMeals;
      let countOfLinkedMealIngrdnts =
        getWeeksDaysResult.countOfLinkedMealIngrdnts;
      updatedState.thisWMPStateObj.hasChildren.weekMealPlan =
        countOfLinkedDays > 0 ? true : false;
      const { allUnitOfMeasures, allWeightTypes, allBrands, allGenRecipes } =
        await this.getAllUOMsWTsBrndsNRecipes();
      updatedState.allUnitOfMeasures = allUnitOfMeasures;
      updatedState.allWeightTypes = allWeightTypes;
      updatedState.allBrands = allBrands;
      updatedState.allGenRecipes = allGenRecipes;
      updatedState.countOfLinkedDays = countOfLinkedDays;
      updatedState.countOfLinkedMeals = countOfLinkedMeals;
      updatedState.countOfLinkedMealIngrdnts = countOfLinkedMealIngrdnts;
      this.player.current.stop();
      state.pantryItems = await this.handleGetUsersPantryItemsFn(
        backEndHtmlRoot,
        currentGRFUser
      );
      this.setState(updatedState);
    }
  };
  handleCopyWMPFn = async () => {
    let state = this.state;
    state = this.handleLockAllFromEditing(state);
    state.copyingWMP = true;
    this.setState(state);
    let thisWMPStateObj = state.thisWMPStateObj;
    const origWMPId = thisWMPStateObj.thisRecord._id;
    const backEndReqUrl = `${state.backEndHtmlRoot}weekMealPlans/copy/${origWMPId}`;
    let wmpCopyReqResult;
    try {
      wmpCopyReqResult = await httpService.post(backEndReqUrl);
    } catch (errs) {
      this.notifyFn("WMP copy failed, refresh and try again.", "error");
      state = this.handleExitFormEdit(state, false);
      state.copyingWMP = false;
      this.setState(state);
    }
    if (!wmpCopyReqResult.data.ok) {
      this.notifyFn("WMP copy failed, refresh and try again.", "error");
      state = this.handleExitFormEdit(state, false);
      state.copyingWMP = false;
      this.setState(state);
    } else {
      const savedWMPCopyId = wmpCopyReqResult.data.wmpCopy._id;
      window.location = `/weekMealPlansNewNew/edit/${savedWMPCopyId}/true`;
    }
  };
  componentDidMount() {
    const currentGRFUser = authService.getCurrentUser();
    this.setState({ currentGRFUser: currentGRFUser }, () => {
      this.getThisWMPFn();
    });
  }
  getCSValResultForProp = async (
    typeOfRecordToChange,
    propToUpdate,
    newValue,
    thisObjsValErrsObj,
    parentRecordId
  ) => {
    const recordToUpdate = { [propToUpdate]: newValue, _id: parentRecordId };
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
      thisValErrsObj,
      thisWMPStateObj.thisRecord._id
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
  populateMissingMealIngrdnts = async (thisMealStateObj) => {
    let thisMealWUpdtdGenRcpIngrdnts =
      await this.updateMealWGenRcpsGenRcpIngrdnts(thisMealStateObj);
    const thisMealsGenRcpIngrdnts =
      thisMealWUpdtdGenRcpIngrdnts.thisGenRcpsGenRcpIngrdnts;
    const thisMealsExistingIngrdnts =
      thisMealWUpdtdGenRcpIngrdnts.thisMealsIngrdnts;
    let newMealIngrdntsArray = [];
    for (let i = 0; i < thisMealsGenRcpIngrdnts.length; i++) {
      let thisGenRcpIngrdnt = thisMealsGenRcpIngrdnts[i];
      let oldMealIngrdntMatchingGenRcpIngrdnt =
        thisMealsExistingIngrdnts.filter(
          (mealIngrdnt) =>
            mealIngrdnt.thisRecord.genRecipeIngredient._id ===
            thisGenRcpIngrdnt._id
        );
      let newMealIngrdntRecord;
      if (oldMealIngrdntMatchingGenRcpIngrdnt.length > 0) {
        newMealIngrdntRecord =
          oldMealIngrdntMatchingGenRcpIngrdnt[0].thisRecord;
      } else {
        newMealIngrdntRecord = {
          _id: `new${this.getRndIntegerFn(10000000, 99999999)}`,
          qty: thisGenRcpIngrdnt.defaultQty,
          genRecipeIngredient: thisGenRcpIngrdnt,
          meal: thisMealStateObj.thisRecord,
          createdAt: "",
          updatedAt: "",
        };
      }
      newMealIngrdntsArray.push(newMealIngrdntRecord);
    }
    let recordTypesArray = [
      "mealIngredient",
      "genRecipeIngredient",
      "ingredient",
    ];
    let newStateObjsArray = this.assembleStateObjWNewRcrd(
      newMealIngrdntsArray,
      "mealIngredient",
      recordTypesArray
    );
    thisMealStateObj.thisMealsIngrdnts = newStateObjsArray;
    return thisMealStateObj;
  };
  handleCreateNewRecordInDb = async (typeOfRecordToCreate, newRecordToSave) => {
    console.log(newRecordToSave);
    const reqUrl = `${this.state.backEndHtmlRoot}${typeOfRecordToCreate}s/add`;
    // let savedRecord = null;
    let savedRecord = newRecordToSave;
    let valErrors = [];
    //  = [{ name: ["name too long", "name too short"] }];
    // try {
    //   let reqRes = await httpService.post(reqUrl, newRecordToSave);
    //   savedRecord = reqRes.data;
    savedRecord._id = this.getRndIntegerFn(10000000, 99999999);
    savedRecord.createdAt = "";
    savedRecord.updatedAt = "";
    let typeOfRcrdToCreateSntcCase =
      rcrdOrFldNameSnctncCase[typeOfRecordToCreate];
    let successMsg = `New ${typeOfRcrdToCreateSntcCase} saved successfully.`;
    this.notifyFn(successMsg, "success");
    // } catch (errs) {
    // valErrorsNestedArray shape:
    // [{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
    //   valErrors = this.parseHTTPResErrs(errs, "all");
    //   this.notifyOfErrors(valErrors);
    // }
    return { savedRecord, valErrors };
  };
  handleCreateNewRecordFn = async (
    typeOfRecordToCreate,
    thisDayOfWeekCode,
    thisMealTypeCode,
    newName
  ) => {
    let state = this.state;
    let newRecordToSave = {};
    let recordTypesForStateObj;
    let thisDayStateObj = thisDayOfWeekCode ? state[thisDayOfWeekCode] : null;
    let thisDayOfWeek = thisDayOfWeekCode
      ? thisDayStateObj.thisRecord.dayOfWeek
      : null;
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj[thisMealTypeCode]
      : null;
    let thisMealType = thisMealTypeCode
      ? thisMealStateObj.thisRecord.mealType
      : null;
    switch (typeOfRecordToCreate) {
      case "day":
        let thisWMPRecord = state.thisWMPStateObj.thisRecord;
        let newDayName = `${thisWMPRecord.name} - ${thisDayOfWeek.name}`;
        newRecordToSave =
          state.newRecordTemplates.newDayByDayOfWeek[thisDayOfWeekCode];
        newRecordToSave.weekMealPlan = thisWMPRecord;
        newRecordToSave.name = newDayName;
        recordTypesForStateObj = [typeOfRecordToCreate];
        break;
      case "meal":
        let thisDayRecord = thisDayStateObj.thisRecord;
        newRecordToSave =
          state.newRecordTemplates.newMealByAvlMealType[thisMealTypeCode];
        newRecordToSave.day = thisDayRecord;
        recordTypesForStateObj = ["meal", "genRecipe"];
        break;
      case "genRecipe":
        newRecordToSave = {
          name: newName,
          availableMealType: thisMealType,
          GRFUser: state.currentGRFUser,
          defaultPrepInstructions: "",
          photoURL: "",
        };
        break;
      case "genRecipeIngredient":
        newRecordToSave = {
          defaultQty: 0.0,
          ingredient: state.newRecordTemplates.defaultIngredient,
          genRecipe: thisMealStateObj.thisRecord.genRecipe,
        };
        break;
      case "ingredient":
        newRecordToSave = state.newRecordTemplates.newIngredient;
        newRecordToSave.name = newName;
        newRecordToSave.GRFUser = state.currentGRFUser;
        break;
      default:
        newRecordToSave = { name: newName, GRFUser: state.currentGRFUser };
    }
    let createNewRecordResult = await this.handleCreateNewRecordInDb(
      typeOfRecordToCreate,
      newRecordToSave
    );
    if (createNewRecordResult.valErrors.length < 1) {
      newRecordToSave._id = createNewRecordResult.savedRecord._id;
      newRecordToSave.createdAt = createNewRecordResult.savedRecord.createdAt;
      newRecordToSave.updatedAt = createNewRecordResult.savedRecord.updatedAt;
      createNewRecordResult.savedRecord = newRecordToSave;
    }
    return createNewRecordResult;
  };
  handleCreateNewObjFn = async (
    typeOfRecordToCreate,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    newName
  ) => {
    let state = this.state;
    let thisDayStateObj = state[thisDayOfWeekCode];
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj[thisMealTypeCode]
      : null;
    let thisMealIngrdntStateObj =
      arrayIndex || arrayIndex === 0
        ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
        : null;
    let typeOfRecordToChange;
    let existingValue;
    switch (typeOfRecordToCreate) {
      case "day":
        typeOfRecordToChange = null;
        existingValue = thisDayStateObj.thisRecord;
        break;
      case "meal":
        typeOfRecordToChange = null;
        existingValue = thisMealStateObj.thisRecord;
        break;
      case "genRecipe":
        typeOfRecordToChange = "meal";
        existingValue = thisMealStateObj.thisRecord.genRecipe;
        break;
      case "genRecipeIngredient":
        typeOfRecordToChange = "mealIngredient";
        existingValue = thisMealIngrdntStateObj.thisRecord.genRecipeIngredient;
        break;
      case "ingredient":
        typeOfRecordToChange = "genRecipeIngredient";
        existingValue =
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient.ingredient;
        break;
      default:
        typeOfRecordToChange = "ingredient";
        existingValue =
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient.ingredient[
            typeOfRecordToCreate
          ];
    }
    let createNewRecordResult = await this.handleCreateNewRecordFn(
      typeOfRecordToCreate,
      thisDayOfWeekCode,
      thisMealTypeCode,
      newName
    );
    let savedRecord = createNewRecordResult.savedRecord;
    let createNewValErrs = createNewRecordResult.valErrors;
    //valErrorsNestedArray shape:
    //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
    let valueToSaveToState;
    let justCreated;
    if (createNewValErrs.length > 0) {
      valueToSaveToState = existingValue;
    } else {
      valueToSaveToState = savedRecord;
      justCreated = true;
    }
    if (typeOfRecordToChange) {
      this.handleUpdateMealOrChildPropFn(
        typeOfRecordToCreate,
        valueToSaveToState,
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        arrayIndex,
        createNewValErrs,
        justCreated
      );
    } else if (createNewValErrs.length < 1) {
      this.handleCreateNewDayOrMealFn(
        typeOfRecordToCreate,
        thisDayOfWeekCode,
        thisMealTypeCode,
        valueToSaveToState
      );
    } else {
      console.log("errors creating record");
      return;
    }
  };
  handleCreateNewDayOrMealFn = async (
    typeOfRecordToCreate,
    thisDayOfWeekCode,
    thisMealTypeCode,
    newRecord
  ) => {
    let state = this.state;
    let countOfLinkedDays = state.countOfLinkedDays;
    let countOfLinkedMeals = state.countOfLinkedMeals;
    let thisWMPStateObj = state.thisWMPStateObj;
    let recordTypesForStateObj =
      typeOfRecordToCreate === "day" ? ["day"] : ["meal", "genRecipe"];
    let newStateObj = { thisRecord: newRecord };
    newStateObj = this.buildInitialStateObj(
      newStateObj,
      recordTypesForStateObj,
      newRecord
    );
    newStateObj.recordLoaded = true;
    let thisDayStateObj;
    if (typeOfRecordToCreate === "day") {
      countOfLinkedDays++;
      let mealTypes = this.state.mealTypes;
      for (let i = 0; i < mealTypes.length; i++) {
        newStateObj[mealTypes[i].code] = {
          thisRecord: {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
            mealType: mealTypes[i],
            day: newRecord,
          },
          recordLoaded: true,
        };
      }
      thisDayStateObj = newStateObj;

      thisWMPStateObj.hasChildren.weekMealPlan = true;
    } else {
      countOfLinkedMeals++;
      newStateObj.thisGenRcpsGenRcpIngrdnts = [];
      newStateObj.thisMealsIngrdnts = [];
      thisDayStateObj = this.state[thisDayOfWeekCode];
      thisDayStateObj[thisMealTypeCode] = newStateObj;
      thisDayStateObj.hasChildren.day = true;
    }
    this.setState({
      thisWMPStateObj: thisWMPStateObj,
      [thisDayOfWeekCode]: thisDayStateObj,
      countOfLinkedDays: countOfLinkedDays,
      countOfLinkedMeals: countOfLinkedMeals,
    });
  };
  handleSaveNewMealIngrdntsToDB = async (mealStateObj) => {
    let pattern = /new/;
    let thisMealsIngrdntStateObjsArray = mealStateObj.thisMealsIngrdnts;
    let valErrors = [];
    for (let i = 0; i < thisMealsIngrdntStateObjsArray.length; i++) {
      let thisMealIngrdntStateObj = thisMealsIngrdntStateObjsArray[i];
      let thisMealIngrdntRecord = thisMealIngrdntStateObj.thisRecord;
      let testResult = pattern.test(thisMealIngrdntRecord._id);
      let theseValErrors;
      let createMealIngrdntResult;
      if (testResult) {
        let mealIngrdntRcrdToSave = _.pick(thisMealIngrdntRecord, [
          "qty",
          "genRecipeIngredient",
          "meal",
        ]);
        createMealIngrdntResult = await this.handleCreateNewRecordInDb(
          "mealIngredient",
          mealIngrdntRcrdToSave
        );
        theseValErrors = createMealIngrdntResult.valErrors;
        if (theseValErrors.length > 0) {
          theseValErrors.map((valErr) => {
            valErrors.push(valErr);
          });
          thisMealsIngrdntStateObjsArray.splice(i, 1);
          this.notifyFn(
            "A Meal Ingredient save failed, refresh and try 'Populate Ingredients' again",
            "error"
          );
        } else {
          thisMealIngrdntRecord._id = createMealIngrdntResult.savedRecord._id;
          let thisIngrdntRecord =
            thisMealIngrdntRecord.genRecipeIngredient.ingredient;
          thisMealIngrdntStateObj.thisRecord = thisMealIngrdntRecord;
          thisMealsIngrdntStateObjsArray[i] = thisMealIngrdntStateObj;
        }
      }
    }
    mealStateObj.thisMealsIngrdnts = thisMealsIngrdntStateObjsArray;
    return { valErrors, mealStateObj };
  };
  handleAddNewToFullRcrdSet = (state, typeOfCreatedRecord, newRecord) => {
    const capitalRecordType =
      typeOfCreatedRecord.charAt(0).toUpperCase() +
      typeOfCreatedRecord.slice(1);
    let fullRecordSet = state[`all${capitalRecordType}s`];
    fullRecordSet.push(newRecord);
    state[`all${capitalRecordType}s`] = fullRecordSet;
    return state;
  };
  handleDeleteOldMealIngrdntsFrmDb = async (
    mealStateObjBackup,
    mealStateObj
  ) => {
    let newMealIngrdntsArray = mealStateObj.thisMealsIngrdnts;
    let oldMealIngrdntsArray = mealStateObjBackup.thisMealsIngrdnts;
    let valErrors = [];
    for (let i = 0; i < oldMealIngrdntsArray.length; i++) {
      let thisMealIngrdntStateObj = oldMealIngrdntsArray[i];
      let thisMealIngrdntRecord = thisMealIngrdntStateObj.thisRecord;
      let thisMealInrdntId = thisMealIngrdntRecord._id;
      let deleteMealIngrdntOk = await this.handleDeleteRecordFn(
        "mealIngredient",
        thisMealInrdntId
      );
      if (!deleteMealIngrdntOk) {
        let errorMsg = `Meal Ingredient with ID ${thisMealInrdntId} could not be deleted`;
        newMealIngrdntsArray.push(thisMealIngrdntStateObj);
        valErrors.push({ all: [errorMsg] });
        this.notifyFn(
          `${errorMsg}, it has been restored to this meal's ingredients list so you can try manually deleting it from there.`,
          "error"
        );
      }
    }
    mealStateObj.thisMealsIngrdnts = newMealIngrdntsArray;
    return { valErrors, mealStateObj };
  };
  handleRestoreMissingMealIngrdnts = async (
    mealStateObj,
    thisDayOfWeekCode,
    thisMealTypeCode
  ) => {
    let state = this.state;
    mealStateObj = await this.populateMissingMealIngrdnts(mealStateObj);
    let saveMealIngrdntsResult = await this.handleSaveNewMealIngrdntsToDB(
      mealStateObj
    );
    mealStateObj = saveMealIngrdntsResult.mealStateObj;
    let thisDayStateObj = state[thisDayOfWeekCode];
    let countOfLinkedMealIngrdnts = state.countOfLinkedMealIngrdnts;
    countOfLinkedMealIngrdnts++;
    thisDayStateObj[thisMealTypeCode] = mealStateObj;
    this.setState({
      [thisDayOfWeekCode]: thisDayStateObj,
      countOfLinkedMealIngrdnts: countOfLinkedMealIngrdnts,
    });
  };
  hndlSaveNewIngrdntsAndDltOldOnes = async (
    stateObjToUpdate,
    thisMealStateObjBackup
  ) => {
    let saveMealIngrdntsResult = await this.handleSaveNewMealIngrdntsToDB(
      stateObjToUpdate
    );
    stateObjToUpdate = saveMealIngrdntsResult.mealStateObj;
    let deleteMealIngrdntsResult = await this.handleDeleteOldMealIngrdntsFrmDb(
      thisMealStateObjBackup,
      stateObjToUpdate
    );
    if (deleteMealIngrdntsResult.valErrors.length > 0) {
      stateObjToUpdate = deleteMealIngrdntsResult.mealStateObj;
    }
    return stateObjToUpdate;
  };
  hndlDraftMlIngrdntsForRcpChnge = async (mealStateObj) => {
    mealStateObj = await this.populateMissingMealIngrdnts(mealStateObj);
    let thisMealsNewMlMlIngrdnts = mealStateObj.thisMealsIngrdnts;
    let recordTypesArray = [
      "mealIngredient",
      "genRecipeIngredient",
      "ingredient",
    ];
    for (let i = 0; i < thisMealsNewMlMlIngrdnts.length; i++) {
      let thisMealIngrdntStateObj = thisMealsNewMlMlIngrdnts[i];
      for (let i = 0; i < recordTypesArray.length; i++) {
        thisMealIngrdntStateObj.userType = this.updateStateObjMetaKeyValue(
          thisMealIngrdntStateObj.userType,
          recordTypesArray[i],
          "viewer"
        );
      }
      thisMealsNewMlMlIngrdnts[i] = thisMealIngrdntStateObj;
    }
    mealStateObj.thisMealsIngrdnts = thisMealsNewMlMlIngrdnts;
    return mealStateObj;
  };
  handleUpdateMealOrChildPropFn = async (
    propToUpdate,
    updatedValueOrObj,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    createNewValErrs,
    justCreated
  ) => {
    let updatedValue = updatedValueOrObj.updatedValue;
    console.log(updatedValue);
    let newValue;
    const propTypeForVal =
      rcrdOrFldNameSntncCaseAndPropTypForVal[propToUpdate]["propTypeForVal"];
    if (propTypeForVal === "float" && updatedValue !== "") {
      let newValueAsNumber = JSON.parse(updatedValue);
      let newValueAsFloat =
        Math.round((newValueAsNumber + Number.EPSILON) * 100) / 100;
      newValue = newValueAsFloat;
    } else {
      newValue = updatedValue;
    }
    let pattern = /missing/;
    let state = this.state;
    if (typeOfRecordToChange === "pantryItem") {
      this.handleChangePantryItemFnQtyHave(
        updatedValueOrObj.shoppingListItem,
        newValue
      );
      return;
    }
    const daysOfWeek = state.daysOfWeek;
    const mealTypes = state.mealTypes;
    let thisDayStateObj = state[thisDayOfWeekCode];
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj[thisMealTypeCode]
      : null;
    let thisMealIngrdntStateObj =
      arrayIndex === 0 || arrayIndex
        ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
        : null;
    let stateObjToUpdate;
    let updatedRecord;
    switch (typeOfRecordToChange) {
      case "meal":
        stateObjToUpdate = thisMealStateObj;
        updatedRecord = stateObjToUpdate.thisRecord;
        break;
      case "genRecipe":
        stateObjToUpdate = thisMealStateObj;
        updatedRecord = stateObjToUpdate.thisRecord.genRecipe;
        break;
      default:
        stateObjToUpdate = thisMealIngrdntStateObj;
        switch (typeOfRecordToChange) {
          case "mealIngredient":
            updatedRecord = stateObjToUpdate.thisRecord;
            break;
          case "genRecipeIngredient":
            updatedRecord = stateObjToUpdate.thisRecord.genRecipeIngredient;
            break;
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
        let localDayId = localDayStateObj.thisRecord._id;
        let testResult = pattern.test(localDayId);
        if (!testResult) {
          for (let i = 0; i < mealTypes.length; i++) {
            let localMealTypeCode = mealTypes[i].code;
            let localMealStateObj = localDayStateObj[localMealTypeCode];
            let localMealId = localMealStateObj.thisRecord._id;
            let testResult = pattern.test(localMealId);
            if (!testResult) {
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
                    let localSubRecordId =
                      localRecord[typeOfRecordToChange]["_id"];
                    if (changedRecordId === localSubRecordId) {
                      localRecord[typeOfRecordToChange][propToUpdate] =
                        newValue;
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
            }

            localDayStateObj[localMealTypeCode] = localMealStateObj;
          }
        }

        state[localDayOfWeekCode] = localDayStateObj;
      }
    }
    let thisValErrsObj = stateObjToUpdate.valErrors[typeOfRecordToChange];
    let updatedValErrsObj;
    let okToUpdateProp;
    if (createNewValErrs) {
      updatedValErrsObj = thisValErrsObj;
      if (createNewValErrs.length > 0) {
        okToUpdateProp = false;
      } else {
        okToUpdateProp = true;
      }
    } else {
      okToUpdateProp = true;
    }
    if (okToUpdateProp) {
      switch (typeOfRecordToChange) {
        case "meal":
          stateObjToUpdate.thisRecord = updatedRecord;
          if (propToUpdate === "genRecipe") {
            stateObjToUpdate.userChangedThisMealRecipe = true;
            if (!justCreated) {
              stateObjToUpdate = await this.hndlDraftMlIngrdntsForRcpChnge(
                stateObjToUpdate
              );
            } else {
              stateObjToUpdate.thisMealsIngrdnts = [];
              stateObjToUpdate.thisGenRcpsGenRcpIngrdnts = [];
            }
          }
          break;
        case "mealIngredient":
          stateObjToUpdate.thisRecord = updatedRecord;
          break;
        case "genRecipe":
          stateObjToUpdate.thisRecord[typeOfRecordToChange] = updatedRecord;
          break;
        case "genRecipeIngredient":
          stateObjToUpdate.thisRecord[typeOfRecordToChange] = updatedRecord;
          break;
        default:
          stateObjToUpdate.thisRecord["genRecipeIngredient"][
            typeOfRecordToChange
          ] = updatedRecord;
      }
      stateObjToUpdate.recordChanged[typeOfRecordToChange] = true;
      if (justCreated) {
        if (
          propToUpdate !== "unitOfMeasure" &&
          propToUpdate !== "weightType" &&
          propToUpdate !== "brand"
        ) {
          stateObjToUpdate.justCreated[propToUpdate] = true;
        }
        if (
          propToUpdate === "unitOfMeasure" ||
          propToUpdate === "weightType" ||
          propToUpdate === "brand" ||
          propToUpdate === "genRecipe"
        ) {
          state = this.handleAddNewToFullRcrdSet(state, propToUpdate, newValue);
        }
      } else {
        updatedValErrsObj = thisValErrsObj;
        await this.getCSValResultForProp(
          typeOfRecordToChange,
          propToUpdate,
          newValue,
          thisValErrsObj,
          updatedRecord._id
        );
      }
    } else {
      let combinedValErrsArray = [];
      for (let i = 0; i < createNewValErrs.length; i++) {
        let thisValErrObj = createNewValErrs[i];
        let thisValErrObjKeys = Object.keys(thisValErrObj);
        for (let i = 0; i < thisValErrObjKeys.length; i++) {
          let thisValErrObjSubArray = thisValErrObj[thisValErrObjKeys[i]];
          for (let i = 0; i < thisValErrObjSubArray.length; i++) {
            let thisValErr = thisValErrObjSubArray[i];
            combinedValErrsArray.push(thisValErr);
          }
        }
      }
      updatedValErrsObj[propToUpdate] = combinedValErrsArray;
    }
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
  handleLockAllFromEditing = (state) => {
    let pattern = /missing/;
    let { daysOfWeek, mealTypes } = state;
    console.log(daysOfWeek, mealTypes);
    state.thisWMPStateObj.editingForm.weekMealPlan = false;
    state.thisWMPStateObj.userType.weekMealPlan = "viewer";
    state.thisWMPStateObj.allowCopy.weekMealPlan = false;
    for (let i = 0; i < daysOfWeek.length; i++) {
      let localDayOfWeekCode = daysOfWeek[i].code;
      let thisDayStateObj = state[localDayOfWeekCode];
      let thisDayId = thisDayStateObj.thisRecord._id;
      let testResult = pattern.test(thisDayId);
      if (!testResult) {
        thisDayStateObj.editingForm.day = false;
        thisDayStateObj.userType.day = "viewer";

        for (let i = 0; i < mealTypes.length; i++) {
          let localMealTypeCode = mealTypes[i].code;
          let thisMealStateObj = thisDayStateObj[localMealTypeCode];
          let thisMealId = thisMealStateObj.thisRecord._id;
          let testResult = pattern.test(thisMealId);
          if (!testResult) {
            thisMealStateObj.editingForm = { meal: false, genRecipe: false };
            thisMealStateObj.userType = { meal: "viewer", genRecipe: "viewer" };
            let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            for (let i = 0; i < thisMealsIngrdnts.length; i++) {
              let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
              thisMealIngrdntStateObj.editingForm = {
                mealIngredient: false,
                genRecipeIngredient: false,
                ingredient: false,
              };
              thisMealIngrdntStateObj.userType = {
                mealIngredient: "viewer",
                genRecipeIngredient: "viewer",
                ingredient: "viewer",
              };
              thisMealsIngrdnts[i] = thisMealIngrdntStateObj;
            }
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisDayStateObj[localMealTypeCode] = thisMealStateObj;
          }
        }
        state[localDayOfWeekCode] = thisDayStateObj;
      }
    }
    return state;
  };
  handleBackupStateObjs = (state) => {
    let pattern = /missing/;
    let { daysOfWeek } = state;
    state.thisWMPStateBackup = _.cloneDeep(state.thisWMPStateObj);
    for (let i = 0; i < daysOfWeek.length; i++) {
      let localDayOfWeekCode = daysOfWeek[i].code;
      let thisDayStateObj = state[localDayOfWeekCode];
      let thisDayId = thisDayStateObj.thisRecord._id;
      let testResult = pattern.test(thisDayId);
      if (!testResult) {
        let thisDayStateObjBackup = _.cloneDeep(thisDayStateObj);
        state[`${localDayOfWeekCode}Backup`] = thisDayStateObjBackup;
      }
    }
    return state;
  };
  handleStartEditingFn = (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    let pattern = /missing/;
    let state = this.state;
    state = this.handleBackupStateObjs(state);
    state = this.handleLockAllFromEditing(state);
    let { daysOfWeek, mealTypes } = state;
    if (typeOfRecordToChange === "weekMealPlan") {
      state.thisWMPStateObj.editingForm.weekMealPlan = true;
      let prevWMPUserType = state.thisWMPStateBackup.userType.weekMealPlan;
      state.thisWMPStateObj.userType.weekMealPlan = prevWMPUserType;
    } else {
      for (let i = 0; i < daysOfWeek.length; i++) {
        let localDayOfWeekCode = daysOfWeek[i].code;
        let thisDayStateObj = state[localDayOfWeekCode];
        let thisDayId = thisDayStateObj.thisRecord._id;
        let testResult = pattern.test(thisDayId);
        if (!testResult) {
          let thisDayStateObjBackup = state[`${localDayOfWeekCode}Backup`];
          if (
            thisDayOfWeekCode === localDayOfWeekCode &&
            typeOfRecordToChange === "day"
          ) {
            thisDayStateObj.editingForm.day = true;
            let prevDayUserType = thisDayStateObjBackup.userType.day;
            thisDayStateObj.userType.day = prevDayUserType;
          } else {
            for (let i = 0; i < mealTypes.length; i++) {
              let localMealTypeCode = mealTypes[i].code;
              let thisMealStateObj = thisDayStateObj[localMealTypeCode];
              let thisMealId = thisMealStateObj.thisRecord._id;
              let testResult = pattern.test(thisMealId);
              if (!testResult) {
                let thisMealStateObjBackup =
                  thisDayStateObjBackup[localMealTypeCode];
                if (thisMealTypeCode === localMealTypeCode) {
                  if (
                    typeOfRecordToChange === "meal" ||
                    typeOfRecordToChange === "genRecipe"
                  ) {
                    thisMealStateObj.editingForm[typeOfRecordToChange] = true;
                    thisMealStateObj.userType[typeOfRecordToChange] =
                      thisMealStateObjBackup.userType[typeOfRecordToChange];
                  } else {
                    let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
                    for (let i = 0; i < thisMealsIngrdnts.length; i++) {
                      let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
                      let thisMealIngrdntStateObjBackup =
                        thisMealStateObjBackup.thisMealsIngrdnts[i];
                      if (arrayIndex === i) {
                        thisMealIngrdntStateObj.editingForm[
                          typeOfRecordToChange
                        ] = true;
                        thisMealIngrdntStateObj.userType[typeOfRecordToChange] =
                          thisMealIngrdntStateObjBackup.userType[
                            typeOfRecordToChange
                          ];
                      }
                      thisMealsIngrdnts[i] = thisMealIngrdntStateObj;
                    }
                    thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
                  }
                  thisDayStateObj[localMealTypeCode] = thisMealStateObj;
                }
              }
            }
          }
          state[localDayOfWeekCode] = thisDayStateObj;
        }
      }
    }
    this.setState(state);
  };
  handleUpdateWeightsFn = (weightsObj, e) => {
    e.preventDefault();
    let state = this.state;
    let thisWMPStateObj = state.thisWMPStateObj;
    let thisRecord = thisWMPStateObj.thisRecord;
    thisRecord.breakfastWeight = weightsObj.breakfast;
    thisRecord.snack1Weight = weightsObj.snack1;
    thisRecord.lunchWeight = weightsObj.lunch;
    thisRecord.snack2Weight = weightsObj.snack2;
    thisRecord.dinnerWeight = weightsObj.dinner;
    thisRecord.dessertWeight = weightsObj.dessert;
    thisWMPStateObj.thisRecord = thisRecord;
    thisWMPStateObj.recordChanged.weekMealPlan = true;
    state.thisWMPStateObj = thisWMPStateObj;
    this.setState(state);
  };
  handleCancelEditFn = () => {
    let state = this.handleExitFormEdit(this.state, true);
    this.setState(state);
  };
  handleSaveUpdateToDbFn = async (
    typeOfRecordToUpdate,
    updatedRecordFromState
  ) => {
    console.log(updatedRecordFromState);
    const url = `${this.state.backEndHtmlRoot}${typeOfRecordToUpdate}s/update/${updatedRecordFromState._id}`;
    let valErrors = [];
    try {
      await httpService.put(url, updatedRecordFromState);
      this.notifyFn("Record updated successfully", "success");
    } catch (errs) {
      // valErrorsNestedArray shape:
      // [{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
      valErrors = this.parseHTTPResErrs(errs);
    }
    return valErrors;
  };
  handleDeleteRecordFn = async (typeOfRecordToDelete, idOfRecordToDelete) => {
    const url = `${this.state.backEndHtmlRoot}${typeOfRecordToDelete}s/${idOfRecordToDelete}`;
    let deleteOk;
    try {
      await httpService.delete(url, idOfRecordToDelete);
      deleteOk = true;
      this.notifyFn("Record deleted successfully", "success");
    } catch (errs) {
      //valErrorsNestedArray shape:
      //[{prop1Name:[errMsg1,errMsg2]},{prop2Name:[errMsg1,errMsg2]}]
      let valErrors = this.parseHTTPResErrs(errs, "all");
      this.notifyOfErrors(valErrors);
      deleteOk = false;
    }
    return deleteOk;
  };
  handleExitFormEdit = (state, restoreFromBackup) => {
    let pattern = /missing/;
    state.thisWMPStateObj = restoreFromBackup
      ? _.cloneDeep(state.thisWMPStateBackup)
      : this.buildInitialStateObj(
          state.thisWMPStateObj,
          ["weekMealPlan"],
          state.thisWMPStateObj.thisRecord
        );
    state.thisWMPStateObj.justCreated.weekMealPlan = false;
    state.thisWMPStateBackup = {};
    let daysOfWeek = state.daysOfWeek;
    for (let i = 0; i < daysOfWeek.length; i++) {
      let thisDayOfWeek = daysOfWeek[i];
      let thisDayOfWeekCode = thisDayOfWeek.code;
      let thisDayStateObj = state[thisDayOfWeekCode];
      let thisDayRecord = thisDayStateObj.thisRecord;
      let thisDayRecordId = thisDayRecord._id;
      let testResult = pattern.test(thisDayRecordId);
      if (!testResult) {
        state.thisWMPStateObj.hasChildren.weekMealPlan = true;
        let thisDayStateObjBackup = state[`${thisDayOfWeekCode}Backup`];
        thisDayStateObj = restoreFromBackup
          ? _.cloneDeep(thisDayStateObjBackup)
          : this.buildInitialStateObj(thisDayStateObj, ["day"], thisDayRecord);
        state[`${thisDayOfWeekCode}Backup`] = {};
        let mealTypes = state.mealTypes;
        for (let i = 0; i < mealTypes.length; i++) {
          let thisMealType = mealTypes[i];
          let thisMealTypeCode = thisMealType.code;
          let thisMealStateObj = thisDayStateObj[thisMealTypeCode];
          let thisMealRecord = thisMealStateObj.thisRecord;
          let thisMealRecordId = thisMealRecord._id;
          let testResult = pattern.test(thisMealRecordId);
          if (!testResult) {
            thisDayStateObj.hasChildren.day = true;
            let thisMealStateObjBackup = thisDayStateObjBackup
              ? thisDayStateObjBackup[thisMealTypeCode]
              : null;
            thisMealStateObj = restoreFromBackup
              ? _.cloneDeep(thisMealStateObjBackup)
              : this.buildInitialStateObj(
                  thisMealStateObj,
                  ["meal", "genRecipe"],
                  thisMealRecord
                );
            let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            thisMealStateObj.hasChildren = {
              meal: thisMealsIngrdnts.length > 0 ? true : false,
              genRecipe:
                thisMealStateObj.thisGenRcpsGenRcpIngrdnts.length > 0
                  ? true
                  : false,
            };
            for (let i = 0; i < thisMealsIngrdnts.length; i++) {
              let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
              let thisMealIngrdntRecord = thisMealIngrdntStateObj.thisRecord;
              let thisMealIngrdntId = thisMealIngrdntRecord._id;
              let thisMealIngrdntStateObjBackup = null;
              if (restoreFromBackup) {
                let thisMealsBackupIngrdnts =
                  thisMealStateObjBackup.thisMealsIngrdnts;
                thisMealIngrdntStateObjBackup = thisMealsBackupIngrdnts.filter(
                  (mealIngrdnt) =>
                    mealIngrdnt.thisRecord._id === thisMealIngrdntId
                );
                if (thisMealIngrdntStateObjBackup) {
                  thisMealIngrdntStateObj = _.cloneDeep(
                    thisMealIngrdntStateObjBackup[0]
                  );
                }
              }
              thisMealIngrdntStateObj = this.buildInitialStateObj(
                thisMealIngrdntStateObj,
                ["mealIngredient", "genRecipeIngredient", "ingredient"],
                thisMealIngrdntRecord
              );
              thisMealsIngrdnts[i] = thisMealIngrdntStateObj;
            }
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
          }
          thisDayStateObj[thisMealTypeCode] = thisMealStateObj;
        }
      }
      state[thisDayOfWeekCode] = thisDayStateObj;
    }
    return state;
  };
  handleDetermineIfHasChildrenFn = (
    state,
    thisDayOfWeekCode,
    thisMealTypeCode
  ) => {
    let pattern = /missing/;
    let thisDayStateObj = thisDayOfWeekCode ? state[thisDayOfWeekCode] : null;
    let arrayOfChildren = [];
    if (thisMealTypeCode) {
      arrayOfChildren = thisDayStateObj[thisMealTypeCode]["thisMealsIngrdnts"];
    } else {
      let stateObjToCheck;
      let arrayToLoop;
      if (thisDayStateObj) {
        stateObjToCheck = thisDayStateObj;
        arrayToLoop = state.mealTypes;
      } else {
        stateObjToCheck = state;
        arrayToLoop = state.daysOfWeek;
      }
      for (let i = 0; i < arrayToLoop.length; i++) {
        let thisStateObj = stateObjToCheck[arrayToLoop[i].code];
        let thisRecordId = thisStateObj.thisRecord._id;
        let testResult = pattern.test(thisRecordId);
        if (!testResult) {
          arrayOfChildren.push(thisRecordId);
        }
      }
    }
    return arrayOfChildren.length > 0 ? true : false;
  };
  handleDeleteObjFn = async (
    typeOfRecordToDelete,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    let state = this.state;
    let thisDayOfWeek;
    if (thisDayOfWeekCode) {
      let matchingDaysOfWeek = state.daysOfWeek.filter(
        (dayOfWeek) => dayOfWeek.code === thisDayOfWeekCode
      );
      thisDayOfWeek = matchingDaysOfWeek[0];
    } else {
      thisDayOfWeek = null;
    }
    let thisMealType;
    if (thisMealTypeCode) {
      let matchingMealTypes = state.mealTypes.filter(
        (mealType) => mealType.code === thisMealTypeCode
      );
      thisMealType = matchingMealTypes[0];
    } else {
      thisMealType = null;
    }
    let thisDayStateObj = thisDayOfWeekCode ? state[thisDayOfWeekCode] : null;
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj[thisMealTypeCode]
      : null;
    let thisMealsIngrdnts =
      arrayIndex || arrayIndex === 0
        ? thisMealStateObj.thisMealsIngrdnts
        : null;
    let thisMealIngrdntStateObj =
      arrayIndex || arrayIndex === 0
        ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
        : null;
    let idOfRecordToDelete;
    let rplcmntPlchldrStateObj = {};
    let rplcmentPlchldrRcrd;
    switch (typeOfRecordToDelete) {
      case "weekMealPlan":
        idOfRecordToDelete = state.thisWMPStateObj.thisRecord._id;
        break;
      case "day":
        idOfRecordToDelete = thisDayStateObj.thisRecord._id;
        rplcmentPlchldrRcrd = {
          name: "",
          dayOfWeek: thisDayOfWeek,
          weekMealPlan: state.thisWMPStateObj.thisRecord,
        };
        break;
      case "meal":
        idOfRecordToDelete = thisMealStateObj.thisRecord._id;
        rplcmentPlchldrRcrd = {
          mealType: thisMealType,
          day: thisDayStateObj.thisRecord,
          genRecipe:
            state.newRecordTemplates.defaultGenRecipesByMealType[
              thisMealTypeCode
            ],
        };
        break;
      default:
        idOfRecordToDelete = thisMealIngrdntStateObj.thisRecord._id;
    }
    let deleteOk = await this.handleDeleteRecordFn(
      typeOfRecordToDelete,
      idOfRecordToDelete
    );
    if (!deleteOk) {
      return;
    } else {
      if (typeOfRecordToDelete === "weekMealPlan") {
        window.location = `/`;
      } else {
        if (typeOfRecordToDelete === "day" || typeOfRecordToDelete === "meal") {
          rplcmentPlchldrRcrd._id = `missing${this.getRndIntegerFn(
            10000000,
            99999999
          )}`;
          let recordTypesForStateObj =
            typeOfRecordToDelete === "meal"
              ? ["meal", "genRecipe"]
              : [typeOfRecordToDelete];
          rplcmntPlchldrStateObj.thisRecord = rplcmentPlchldrRcrd;
          rplcmntPlchldrStateObj = this.buildInitialStateObj(
            rplcmntPlchldrStateObj,
            recordTypesForStateObj,
            rplcmentPlchldrRcrd
          );
        }
        switch (typeOfRecordToDelete) {
          case "day":
            state[thisDayOfWeekCode] = rplcmntPlchldrStateObj;
            state.thisWMPStateObj.hasChildren.weekMealPlan =
              this.handleDetermineIfHasChildrenFn(state, null, null);
            state.countOfLinkedDays--;
            break;
          case "meal":
            thisDayStateObj[thisMealTypeCode] = rplcmntPlchldrStateObj;
            thisDayStateObj.hasChildren.day =
              this.handleDetermineIfHasChildrenFn(
                state,
                thisDayOfWeekCode,
                null
              );
            state[thisDayOfWeekCode] = thisDayStateObj;
            state.countOfLinkedMeals--;
            break;
          default:
            let filteredMealIngrdnts = thisMealsIngrdnts.filter(
              (mealIngrdnt) => mealIngrdnt.thisRecord._id !== idOfRecordToDelete
            );
            thisMealStateObj.thisMealsIngrdnts = filteredMealIngrdnts;
            thisMealStateObj.hasChildren.meal =
              filteredMealIngrdnts.length > 0 ? true : false;
            thisDayStateObj[thisMealTypeCode] = thisMealStateObj;
            state[thisDayOfWeekCode] = thisDayStateObj;
            state.countOfLinkedMealIngrdnts--;
        }
        state = this.handleExitFormEdit(state, false);
        this.setState(state);
      }
    }
  };
  handleTrimEnteredValueFn = (untrimmedValue) => {
    let trimmedValue = untrimmedValue.trim();
    let trimmedValueWNoDblSpcs = trimmedValue.replace(/  +/g, " ");
    return trimmedValueWNoDblSpcs;
  };
  handleAddIngrdntToRecipeFn = async (thisDayOfWeekCode, thisMealTypeCode) => {
    let state = this.state;
    let thisDayStateObj = state[thisDayOfWeekCode];
    let thisMealStateObj = thisDayStateObj[thisMealTypeCode];
    let thisMealRecord = thisMealStateObj.thisRecord;
    let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
    let thisMealsIngrdntsLength = thisMealsIngrdnts.length;
    let newGenRecipeIngredient =
      state.newRecordTemplates.newGenRcpIngrdntsByMealType[thisMealTypeCode];
    newGenRecipeIngredient.genRecipe = thisMealRecord.genRecipe;
    let createNewGenRcpIngrdntResult = await this.handleCreateNewRecordInDb(
      "genRecipeIngredient",
      newGenRecipeIngredient
    );
    if (createNewGenRcpIngrdntResult.valErrors.length < 1) {
      let savedGenRcpIngrdnt = createNewGenRcpIngrdntResult.savedRecord;
      let updatedNewGenRcpIngrdnt = {
        _id: savedGenRcpIngrdnt._id,
        defaultQty: savedGenRcpIngrdnt._id,
        ingredient: newGenRecipeIngredient.ingredient,
        genRecipe: newGenRecipeIngredient.genRecipe,
        createdAt: savedGenRcpIngrdnt.createdAt,
        updatedAt: savedGenRcpIngrdnt.updatedAt,
      };
      let newMealIngredient = {
        qty: 0,
        genRecipeIngredient: updatedNewGenRcpIngrdnt,
        meal: thisMealRecord,
      };
      let createNewMealIngrdntResult = await this.handleCreateNewRecordInDb(
        "mealIngredient",
        newMealIngredient
      );
      if (createNewMealIngrdntResult.valErrors.length > 0) {
        this.notifyFn(
          "Unable to create Meal Ingredient, refresh and try 'Populate Ingredients'",
          "error"
        );
      } else {
        let recordTypesForStateObj = [
          "mealIngredient",
          "genRecipeIngredient",
          "ingredient",
        ];
        let savedMealIngrdnt = createNewMealIngrdntResult.savedRecord;
        let newRecord = {
          _id: savedMealIngrdnt._id,
          qty: savedMealIngrdnt.qty,
          genRecipeIngredient: updatedNewGenRcpIngrdnt,
          meal: thisMealRecord,
          createdAt: savedMealIngrdnt.createdAt,
          updatedAt: savedMealIngrdnt.updatedAt,
        };
        let newStateObj = { thisRecord: newRecord };
        newStateObj = this.buildInitialStateObj(
          newStateObj,
          recordTypesForStateObj,
          newRecord
        );
        newStateObj.justCreated.genRecipeIngredient = true;
        thisMealsIngrdnts.push(newStateObj);
        thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
        thisMealStateObj.hasChildren.meal = true;
        thisDayStateObj[thisMealTypeCode] = thisMealStateObj;
        let countOfLinkedMealIngrdnts = state.countOfLinkedMealIngrdnts;
        countOfLinkedMealIngrdnts++;
        this.setState({
          [thisDayOfWeekCode]: thisDayStateObj,
          countOfLinkedMealIngrdnts: countOfLinkedMealIngrdnts,
        });
        this.handleStartEditingFn(
          "genRecipeIngredient",
          thisDayOfWeekCode,
          thisMealTypeCode,
          thisMealsIngrdntsLength++
        );
      }
    }
  };
  handleSaveChangesFn = async (
    typeOfRecordToSave,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    let state = this.state;
    let countOfLinkedMealIngrdnts = state.countOfLinkedMealIngrdnts;
    console.log(typeOfRecordToSave);
    let thisDayStateObj = thisDayOfWeekCode ? state[thisDayOfWeekCode] : null;
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj[thisMealTypeCode]
      : null;
    let thisMealIngrdntStateObj =
      arrayIndex || arrayIndex === 0
        ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
        : null;
    let stateObjToUpdate;

    let recordToSave;
    if (typeOfRecordToSave === "weekMealPlan") {
      stateObjToUpdate = state.thisWMPStateObj;
    } else if (
      typeOfRecordToSave === "meal" ||
      typeOfRecordToSave === "genRecipe"
    ) {
      stateObjToUpdate = thisMealStateObj;
    } else {
      stateObjToUpdate = thisMealIngrdntStateObj;
    }
    if (typeOfRecordToSave === "ingredient") {
      recordToSave = stateObjToUpdate.thisRecord.genRecipeIngredient.ingredient;
    } else if (
      typeOfRecordToSave === "genRecipe" ||
      typeOfRecordToSave === "genRecipeIngredient"
    ) {
      recordToSave = stateObjToUpdate.thisRecord[typeOfRecordToSave];
    } else {
      recordToSave = stateObjToUpdate.thisRecord;
    }
    if (
      typeOfRecordToSave === "meal" &&
      stateObjToUpdate.userChangedThisMealRecipe
    ) {
      let thisDayStateObjBackup = state[`${thisDayOfWeekCode}Backup`];
      let thisMealStateObjBackup = thisDayStateObjBackup[thisMealTypeCode];
      let lengthOfOldMealIngrdnts =
        thisMealStateObjBackup.thisMealsIngrdnts.length;
      stateObjToUpdate = await this.hndlSaveNewIngrdntsAndDltOldOnes(
        stateObjToUpdate,
        thisMealStateObjBackup
      );
      let lengthOfNewMealIngrdnts = stateObjToUpdate.thisMealsIngrdnts.length;
      if (lengthOfOldMealIngrdnts !== lengthOfNewMealIngrdnts) {
        countOfLinkedMealIngrdnts -= lengthOfOldMealIngrdnts;
        countOfLinkedMealIngrdnts += lengthOfNewMealIngrdnts;
      }
    }
    let valErrors = await this.handleSaveUpdateToDbFn(
      typeOfRecordToSave,
      recordToSave
    );
    if (valErrors.length > 0) {
      let valErrObjToUpdate = stateObjToUpdate.valErrors[typeOfRecordToSave];
      valErrObjToUpdate = this.updateThisObjsValErrs(
        valErrObjToUpdate,
        valErrors
      );
      stateObjToUpdate.valErrors[typeOfRecordToSave] = valErrObjToUpdate;
      if (typeOfRecordToSave === "weekMealPlan") {
        state.thisWMPStateObj = stateObjToUpdate;
        this.setState({ thisWMPStateObj: stateObjToUpdate });
      } else {
        if (thisMealIngrdntStateObj) {
          thisMealStateObj.thisMealsIngrdnts[arrayIndex] = stateObjToUpdate;
        }
        if (thisMealStateObj) {
          thisDayStateObj[thisMealTypeCode] = thisMealStateObj;
        }
        this.setState({ [thisDayOfWeekCode]: thisDayStateObj });
      }
    } else {
      state = this.handleExitFormEdit(state, false);
      state.countOfLinkedMealIngrdnts = countOfLinkedMealIngrdnts;
      this.setState(state);
    }
  };
  renderDay = (thisDayOfWeekCode, thisDayOfWeekName) => {
    let { thisWMPStateObj } = this.state;
    let wmpUserType = thisWMPStateObj.userType.weekMealPlan;
    let pattern = /missing/;
    let thisDayStateObj = this.state[thisDayOfWeekCode];
    let thisDayStateObjBackup = this.state[`${thisDayOfWeekCode}Backup`];
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
                onCreateNewRecordFn: this.handleCreateNewObjFn,
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
            commonData: {
              daysOfWeek: this.state.daysOfWeek,
              mealTypes: this.state.mealTypes,
              backEndHtmlRoot: this.state.backEndHtmlRoot,
              allUnitOfMeasures: this.state.allUnitOfMeasures,
              allWeightTypes: this.state.allWeightTypes,
              allBrands: this.state.allBrands,
              allGenRecipes: this.state.allGenRecipes,
            },
            commonMethods: {
              getRndIntegerFn: this.getRndIntegerFn,
              returnElementKey: this.returnElementKey,
              onCreateNewRecordFn: this.handleCreateNewObjFn,
              onUpdatePropFn: this.handleUpdateMealOrChildPropFn,
              onSaveChangesFn: this.handleSaveChangesFn,
              onStartEditingFn: this.handleStartEditingFn,
              onCancelEditFn: this.handleCancelEditFn,
              onDeleteObjFn: this.handleDeleteObjFn,
              trimEnteredValueFn: this.handleTrimEnteredValueFn,
            },
          }}
          specificProps={{
            specificData: {
              thisStateObj: thisDayStateObj,
              thisStateObjBackup: thisDayStateObjBackup,
            },
            specificMethods: {
              populateMissingMealIngrdnts:
                this.handleRestoreMissingMealIngrdnts,
              onAddIngrdntToRecipeFn: this.handleAddIngrdntToRecipeFn,
            },
          }}
        />
      );
    }
  };
  render() {
    const thisWMPRecordId = this.state.thisWMPStateObj.thisRecord._id;
    const typeOfRecordToChange = this.state.typeOfRecordToChange;
    const wmpRecordLoaded = this.state.thisWMPStateObj.recordLoaded;
    return (
      <React.Fragment>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              disabled={!wmpRecordLoaded}
              className={
                this.state.mode === "builder"
                  ? "nav-link active tabLink"
                  : "nav-link tabLink"
              }
              onClick={() => this.setState({ mode: "builder" })}
            >
              <FontAwesomeIcon icon="fa-solid fa-hammer" />
              <span className="tabNavTitle">Builder</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              disabled={!wmpRecordLoaded}
              className={
                this.state.mode === "shoppingList"
                  ? "nav-link active tabLink"
                  : "nav-link tabLink"
              }
              onClick={() => this.setState({ mode: "shoppingList" })}
            >
              <FontAwesomeIcon icon="fa-solid fa-list-check" />
              <span className="tabNavTitle">Shopping List</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              disabled={!wmpRecordLoaded}
              className={
                this.state.mode === "spreadsheet"
                  ? "nav-link active tabLink"
                  : "nav-link tabLink"
              }
              onClick={() => this.setState({ mode: "spreadsheet" })}
            >
              <FontAwesomeIcon icon="fa-solid fa-table" />
              <span className="tabNavTitle">Spreadsheet</span>
            </a>
          </li>
        </ul>
        <div
          className="lottieCont"
          hidden={this.state.thisWMPStateObj.recordLoaded}
        >
          <div className="lottieSubCont">
            <span className="lottieText">Loading...</span>
            <Player
              autoplay
              loop
              src={
                "https://assets2.lottiefiles.com/packages/lf20_6yhhrbk6.json"
              }
              className="lottiePlayer"
              ref={this.player}
            />
          </div>
        </div>
        <div className="wmpCopyCont" hidden={!this.state.copyingWMP}>
          <div className="wmpCopySubCont">
            <span className="wmpCopyText">Copying WMP...</span>
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        </div>
        <div
          className="container-fluid pl-4 pr-4"
          hidden={this.state.mode === "builder" ? false : true}
        >
          <NewWeekMealPlanCard
            commonProps={{
              commonData: { backEndHtmlRoot: this.state.backEndHtmlRoot },
              commonMethods: {
                getRndIntegerFn: this.getRndIntegerFn,
                returnElementKey: this.returnElementKey,
                onCreateNewRecordFn: this.handleCreateNewRecordFn,
                onUpdatePropFn: this.handleUpdateWMPPropFn,
                onSaveChangesFn: this.handleSaveChangesFn,
                onStartEditingFn: this.handleStartEditingFn,
                onCancelEditFn: this.handleCancelEditFn,
                onDeleteObjFn: this.handleDeleteObjFn,
                trimEnteredValueFn: this.handleTrimEnteredValueFn,
                onCopyWMPFn: this.handleCopyWMPFn,
              },
            }}
            specificProps={{
              specificData: {
                thisStateObj: this.state.thisWMPStateObj,
                thisStateObjBackup: this.state.thisWMPStateBackup,
              },
              specificMethods: {
                onUpdateWeightsFn: this.handleUpdateWeightsFn,
              },
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
        <div
          className="container-fluid pl-4 pr-4"
          hidden={this.state.mode === "shoppingList" ? false : true}
        >
          <ShoppingList
            commonProps={{
              commonData: {
                currentGRFUser: this.state.currentGRFUser,
                daysOfWeek: this.state.daysOfWeek,
                mealTypes: this.state.mealTypes,
              },
              commonMethods: {
                getRndIntegerFn: this.getRndIntegerFn,
                returnElementKey: this.returnElementKey,
                onUpdatePropFn: this.handleUpdateMealOrChildPropFn,
                trimEnteredValueFn: this.handleTrimEnteredValueFn,
              },
            }}
            specificProps={{
              specificData: {
                sunday: this.state.sunday,
                monday: this.state.monday,
                tuesday: this.state.tuesday,
                wednesday: this.state.wednesday,
                thursday: this.state.thursday,
                friday: this.state.friday,
                saturday: this.state.saturday,
                pantryItems: this.state.pantryItems,
                recordLoaded: wmpRecordLoaded,
              },
              specificMethods: {},
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default NewNewWeekMealPlan;
