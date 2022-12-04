import React, { Component } from "react";
import Joi from "joi";
import _ from "lodash";
import httpService from "../../services/httpService";
import authService from "../../services/authService";
import { csValidateProp, csValidate } from "../../services/validationService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import WeekMealPlanCard from "./WeekMealPlanCard.component";
import DaysCard from "./DaysCard.component";
import valSchema from "../universalJoiValSchemaCS";
class NewWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    const { backEndHtmlRoot, thisGRFUser, match } = this.props;
    const pgReqParams = match.params;
    const mealTypeCodes = [
      "breakfast",
      "snack1",
      "lunch",
      "snack2",
      "dinner",
      "dessert",
    ];
    const dayOfWeekCodes = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const rcrdOrFldNameSnctncCase = {
      GRFUser: "Author",
      weekMealPlan: "Week Meal Plan",
      day: "Day",
      meal: "Meal",
      genRecipe: "Recipe",
      mealIngredient: "Meal Ingredient",
      genRecipeIngredient: "Recipe Ingredient",
      ingredient: "Base Ingredient",
      unitOfMeasure: "UOM",
      weightType: "Weight Type",
      brand: "Brand",
      name: "Name",
      qty: "Qty",
      defaultQty: "Default Qty",
      photoURL: "Photo URL",
      dayOfWeek: "Day of Week",
      mealType: "Meal Type",
      defaultMealType: "Meal Type",
      defaultPrepInstructions: "Prep Instructions",
      calories: "Calories",
      carbs: "Carbs",
      protein: "Protein",
      fat: "Fat",
      fiber: "Fiber",
      createdAt: "Date Created",
      updatedAt: "Last Update",
    };
    this.state = {
      rcrdOrFldNameSnctncCase: rcrdOrFldNameSnctncCase,
      dayOfWeekCodes: dayOfWeekCodes,
      mealTypeCodes: mealTypeCodes,
      typeOfRecordToChange: "weekMealPlan",
      pgReqParams: pgReqParams,
      backEndHtmlRoot: backEndHtmlRoot,
      currentGRFUser: thisGRFUser,
      thisWMPStateObj: {
        thisRecord: { _id: pgReqParams.id },
        recordLoaded: false,
        valErrors: {
          _id: [],
          GRFUser: [],
          name: [],
          createdAt: [],
          updatedAt: [],
          breakfastWeight: [],
          snack1Weight: [],
          lunchWeight: [],
          snack2Weight: [],
          dinnerWeight: [],
          dessertWeight: [],
          calsBudget: [],
          carbsBudget: [],
          proteinBudget: [],
          fatBudget: [],
          fiberBudget: [],
        },
      },
      thisWMPStateBackup: {},
      thisWeeksDays: {},
      thisWeeksDaysBackup: {},
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
  handleClickCancelFn = () => {
    let state = this.state;
    state.thisWMPStateObj = state.thisWMPStateBackup;
    state.thisWMPStateBackup = {};
    state.thisWeeksDays = state.thisWeeksDaysBackup;
    state.thisWeeksDaysBackup = {};
    this.setState(state);
  };
  handleClickSaveFn = () => {
    console.log("clicked Save");
  };
  handleDeleteRecordFn = (
    typeOfRecordToDelete,
    typeOfRecordToDeleteSentenceCase,
    recordId
  ) => {
    let deleteRecordUrl = `${this.state.backEndHtmlRoot}${typeOfRecordToDelete}s/${recordId}`;
    httpService
      .delete(deleteRecordUrl, recordId)
      .then(
        this.notifyFn(
          `${typeOfRecordToDeleteSentenceCase} successfully deleted`,
          "success"
        )
      )
      .catch((errs) => {
        this.updateStateWValErrs(errs);
      });
  };
  handleClickDeleteFn = (
    typeOfRecordToChange,
    // typeOfRecordToChangeSentenceCase,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    let typeOfRecordToChangeSentenceCase = typeOfRecordToChange;
    let pattern = /missing/;
    let recordIdToDelete;
    let state = this.state;
    let thisWMPStateObj = state.thisWMPStateObj;
    let thisWeeksDays = state.thisWeeksDays;
    let thisDayStateObj;
    let thisMealStateObj;
    let thisMealIngrdntStateObj;
    let okToDelete;
    let deleteValErrors = [];
    if (thisDayOfWeekCode) {
      thisDayStateObj = thisWeeksDays[thisDayOfWeekCode];
      let thisDaysMeals = thisDayStateObj.thisDaysMeals;
      if (thisMealTypeCode) {
        thisMealStateObj = thisDaysMeals[thisMealTypeCode];

        if (arrayIndex || arrayIndex === 0) {
          thisMealIngrdntStateObj =
            thisMealStateObj.thisMealsIngrdnts[arrayIndex];
          let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
          switch (typeOfRecordToChange) {
            case "mealIngredient":
              recordIdToDelete = thisMealIngrdntStateObj.thisRecord._id;
              let newThisMealsIngrdnts = thisMealsIngrdnts.filter(
                (mealIngrdnt) => mealIngrdnt.thisRecord._id !== recordIdToDelete
              );
              thisMealStateObj.thisMealsIngrdnts = newThisMealsIngrdnts;
            // break;
            // case "genRecipeIngredient":

            //   break;
          }
        } else {
          switch (typeOfRecordToChange) {
            case "meal":
              if (thisMealIngrdntStateObj.thisMealsIngrdnts.length > 0) {
                okToDelete = false;
                deleteValErrors.push(
                  "Delete all Meal Ingredients before trying to delete meal"
                );

                return;
              } else {
              }
              break;
          }
        }
        thisDayStateObj.thisDaysMeals[thisMealTypeCode] = thisMealStateObj;
        thisWeeksDays[thisDayOfWeekCode] = thisDayStateObj;
        state.thisWeeksDays = thisWeeksDays;
      } else {
        for (let i = 0; i < state.mealTypeCodes.length; i++) {
          let thisMeal = thisDaysMeals[state.mealTypeCodes[i]];
          let thisMealId = thisMeal.thisRecord._id;
          let testResult = pattern.test(thisMealId);
          if (!testResult) {
            okToDelete = false;
            deleteValErrors.push(
              "Delete all Meals before trying to delete Day"
            );
            return;
          }
        }
      }
    } else {
      recordIdToDelete = thisWMPStateObj.thisRecord._id;
      console.log(recordIdToDelete);
      window.location = "/";
      // for (let i = 0; i < state.dayOfWeekCodes.length; i++) {
      //   let thisWeekDay = thisWeeksDays[state.dayOfWeekCodes[i]];
      //   let thisDayId = thisWeekDay.thisRecord._id;
      //   let testResult = pattern.test(thisDayId);
      //   if (!testResult) {
      //     okToDelete = false;
      //     deleteValErrors.push("Delete all Days before trying to delete Week");
      //     return;
      //   }
      // }
      // if(okToDelete){
      // this.handleDeleteRecordFn(typeOfRecordToChange, typeOfRecordToChangeSentenceCase,recordIdToDelete);

      // };
    }
    if (okToDelete) {
      // this.handleDeleteRecordFn(
      //   typeOfRecordToChange,
      //   typeOfRecordToCreateSentenceCase,
      //   recordIdToDelete
      // );
      this.setState(state);
    } else {
      for (let i = 0; i < deleteValErrors.length; i++) {
        this.notifyFn(deleteValErrors[i], "error");
      }
      this.handleClickCancelFn();
    }
  };
  handleUpdateWeightsFn = () => {
    console.log("weights updated");
  };
  handleUpdateWeightsFn = (weightsObj, e) => {
    e.preventDefault();
    let thisWMPStateObj = this.state.thisWMPStateObj;
    let thisWMP = thisWMPStateObj.thisRecord;
    thisWMP.breakfastWeight = weightsObj.breakfast;
    thisWMP.snack1Weight = weightsObj.snack1;
    thisWMP.lunchWeight = weightsObj.lunch;
    thisWMP.snack2Weight = weightsObj.snack2;
    thisWMP.dinnerWeight = weightsObj.dinner;
    thisWMP.dessertWeight = weightsObj.dessert;
    thisWMPStateObj.thisRecord = thisWMP;
    thisWMPStateObj.recordChanged = true;
    this.setState({ thisWMPStateObj: thisWMPStateObj });
  };
  handleClickCopyFn = () => {
    console.log("clicked copy");
  };
  handleCreateNewRecordFn = (
    typeOfRecordToChange,
    typeOfRecordToCreate,
    typeOfRecordToCreateSentenceCase,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    newRecord
    // objRefPropsJustCreatedArray
  ) => {
    let createRecordUrl = `${this.state.backEndHtmlRoot}${typeOfRecordToCreate}s/add`;
    // ${
    //   objRefPropsJustCreatedArray.length > 0
    //     ? `/${objRefPropsJustCreatedArray}`
    //     : ``
    // }`;
    httpService
      .post(createRecordUrl, newRecord)
      .then((response) => {
        newRecord._id = response.data._id;
        this.notifyFn(
          `New ${typeOfRecordToCreateSentenceCase} successfully created`,
          "success"
        );
        if (!thisDayOfWeekCode) {
          let thisStateObjToUpdate = `all${typeOfRecordToCreateSentenceCase}s`;
          let allTypeOfRecord = this.state[thisStateObjToUpdate];
          allTypeOfRecord.push(newRecord);
          this.setState({ [thisStateObjToUpdate]: allTypeOfRecord });
        } else {
          let e = { target: { value: newRecord } };
          this.handleUpdatePropFn(
            typeOfRecordToChange,
            thisDayOfWeekCode,
            thisMealTypeCode,
            typeOfRecordToCreate,
            arrayIndex,
            "createableSelect",
            e,
            [],
            true
          );
        }
      })
      .catch((errs) => {
        this.updateStateWValErrs(errs);
      });
  };
  updateStateWValErrs = (errs) => {
    let errResponse = errs.response ? errs.response : null;
    if (errResponse) {
      let errData = errResponse.data ? errResponse.data : { data: null };
      if (errData) {
        let errMsg = errData.errorMsg ? errData.errorMsg : { errorMsg: null };
        if (errMsg) {
          this.notifyFn(errMsg, "error");
        } else {
          let valErrorsArray = errData.valErrorsArray
            ? errData.valErrorsArray
            : { valErrorsArray: null };
          if (valErrorsArray) {
            for (let i = 0; i < valErrorsArray.length; i++) {
              let thisValErrorObj = valErrorsArray[i];
              let thisValErrorObjKeys = Object.keys(thisValErrorObj);
              for (let i = 0; i < thisValErrorObjKeys.length; i++) {
                let thisValErrorObjKey = thisValErrorObjKeys[i];
                let thisValError = thisValErrorObj[thisValErrorObjKey];
                // valErrorsObjToUpdate[thisValErrorObjKey] = thisValError;
                this.notifyFn(thisValError, "error");
              }
            }
          } else {
            this.notifyFn("Something went wrong...", "error");
            console.log(errData);
          }
        }
      } else {
        this.notifyFn("Something went wrong...", "error");
        console.log(errResponse);
      }
    } else {
      this.notifyFn("Something went wrong...", "error");
      console.log(errs);
    }
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
    for (let i = 0; i < valErrsNestedArray.length; i++) {
      let valErrsArrayKeys = Object.keys(valErrsNestedArray[i]);
      let thisValuesValErrsArrayKey = valErrsArrayKeys[0];
      thisObjsValErrsObj[thisValuesValErrsArrayKey] =
        valErrsNestedArray[i][thisValuesValErrsArrayKey];
    }
    this.notifyOfErrors(valErrsNestedArray);
    return thisObjsValErrsObj;
  };
  populateMealIngrdntsFn = () => {
    console.log("populating meal Ingredients");
  };
  handleTrimEnteredValueFn = (untrimmedValue) => {
    let trimmedValue = untrimmedValue.trim();
    let trimmedValueWNoDblSpcs = trimmedValue.replace(/  +/g, " ");
    return trimmedValueWNoDblSpcs;
  };
  handleValidateProp = (propType, propToUpdate, newPropValue) => {
    const rule = valSchema.extract(propType);
    const subSchema = Joi.object({ [propToUpdate]: rule });
    const objToValidate = { [propToUpdate]: newPropValue };
    const { error } = subSchema.validate(objToValidate);
    let valErrorDetails = error ? error.details : [];
    let valErrorsArray = [];
    if (valErrorDetails) {
      valErrorDetails.map((valError) => {
        valErrorsArray.push(valError.message);
      });
    }
    return valErrorsArray;
  };
  handleUpdatePropFn = async (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    propType,
    e,
    thisRecordJustCreated
  ) => {
    let newValue = e.target.value;
    // let newValueValErrors = [];
    let state = this.state;
    const typeOfRcrdToChngSntncCase =
      state.rcrdOrFldNameSnctncCase[typeOfRecordToChange];
    const prpToUpdtSntncCase = state.rcrdOrFldNameSnctncCase[propToUpdate];
    const propsArray = [
      {
        thisPropsName: propToUpdate,
        thisPropNameSentenceCase: prpToUpdtSntncCase,
        thisPropsValue: newValue,
        thisPropTypeForVal: propType,
      },
    ];
    // let csValResult;
    let thisWMPStateObj = state.thisWMPStateObj;
    let thisWeeksDays = state.thisWeeksDays;
    let thisDayStateObj;
    let thisMealStateObj;
    let thisMealJustCreated;
    let thisMealIngrdntStateObj;
    if (thisDayOfWeekCode) {
      thisDayStateObj = thisWeeksDays[thisDayOfWeekCode];
    }
    if (thisMealTypeCode) {
      thisMealStateObj = thisDayStateObj.thisDaysMeals[thisMealTypeCode];
    }
    if (arrayIndex || arrayIndex === 0) {
      thisMealIngrdntStateObj = thisMealStateObj.thisMealsIngrdnts[arrayIndex];
    }
    let thisRecordId;
    const getCSValResult = async (thisObjsValErrsObj) => {
      const csValResult = await csValidate(
        typeOfRecordToChange,
        typeOfRcrdToChngSntncCase,
        thisRecordId,
        propsArray
      );
      const thisObjsValErrsObjNew = this.updateThisObjsValErrs(
        thisObjsValErrsObj,
        csValResult
      );
      // newValueValErrors.push(csValResult);
      return thisObjsValErrsObjNew;
    };
    switch (typeOfRecordToChange) {
      case "weekMealPlan":
        thisRecordId = thisWMPStateObj.thisRecord._id;
        thisWMPStateObj.thisRecord[propToUpdate] = newValue;
        const wmpValErrs = thisWMPStateObj.valErrors;
        const wmpValErrsNew = await getCSValResult(wmpValErrs);
        thisWMPStateObj.valErrors = wmpValErrsNew;
        thisWMPStateObj.recordChanged = true;
        state.thisWMPStateObj = thisWMPStateObj;
        break;
      case "thisWeeksDays":
        let thisNewDayStateObj = thisWeeksDays[thisDayOfWeekCode];
        thisNewDayStateObj.thisRecord = newValue;
        thisNewDayStateObj.userType = this.determineThisRecordsUserTypeFn(
          thisWMPStateObj.thisRecord.GRFUser._id
        );
        thisWeeksDays[thisDayOfWeekCode] = thisNewDayStateObj;
        break;
      case "day":
        thisRecordId = thisDayStateObj.thisRecord._id;
        const dayValErrs = thisDayStateObj.valErrors;
        const dayValErrsNew = await getCSValResult(dayValErrs);
        thisDayStateObj.valErrors = dayValErrsNew;
        thisDayStateObj.thisRecord[propToUpdate] = newValue;
        thisDayStateObj.recordChanged = true;
        break;
      case "thisDaysMeals":
        let thisNewMealStateObj =
          thisDayStateObj.thisDaysMeals[thisMealTypeCode];
        thisNewMealStateObj.thisRecord = newValue;
        thisNewMealStateObj = this.resetRecordStateObjFn(
          thisNewMealStateObj,
          newValue,
          "meal"
        );
        thisNewMealStateObj = this.resetRecordStateObjFn(
          thisNewMealStateObj,
          newValue.genRecipe,
          "genRecipe"
        );
        thisNewMealStateObj.thisRecipesIngrdnts =
          await this.getThisGenRecipesGenRecipeIngrdntsFn(
            newValue.genRecipe,
            state.backEndHtmlRoot
          );
        // thisNewMealStateObj.userType = {
        //   meal: this.determineThisRecordsUserTypeFn(
        //     thisWMPStateObj.thisRecord.GRFUser._id
        //   ),
        //   genRecipe: this.determineThisRecordsUserTypeFn(
        //     newValue.genRecipe.GRFUser._id
        //   ),
        // };
        thisNewMealStateObj.recordChanged.meal = true;
        thisNewMealStateObj.editingForm.meal = true;
        thisNewMealStateObj.recordLoaded = true;
        thisDayStateObj[thisMealTypeCode] = thisNewMealStateObj;
        break;
      case "meal":
        thisRecordId = thisMealStateObj.thisRecord._id;
        const mealValErrs = thisMealStateObj.valErrors.meal;
        const mealValErrsNew = await getCSValResult(mealValErrs);
        thisMealStateObj.valErrors.meal = mealValErrsNew;
        thisMealStateObj.thisRecord[propToUpdate] = newValue;
        thisMealStateObj.recordChanged.meal = true;
        thisMealStateObj.recordsJustCreated.genRecipe =
          propToUpdate === "genRecipe" && thisRecordJustCreated ? true : false;
        break;
      case "genRecipe" || "genRecipeIngredient" || "ingredient":
        let dayOfWeekCodes = state.dayOfWeekCodes;
        let pattern = /missing/;
        for (let i = 0; i < dayOfWeekCodes.length; i++) {
          let thisLocalDayStateObj = thisWeeksDays[dayOfWeekCodes[i]];
          let thisLocalDayStateObjId = thisLocalDayStateObj.thisRecord._id;
          let mealTypeCodes = state.mealTypeCodes;
          let testResult = pattern.test(thisLocalDayStateObjId);
          if (!testResult) {
            for (let i = 0; i < mealTypeCodes.length; i++) {
              let thisLocalMealStateObj =
                thisLocalDayStateObj.thisDaysMeals[mealTypeCodes[i]];
              let thisMealRecord = thisLocalMealStateObj.thisRecord;
              let thisMealsId = thisMealRecord._id;
              let testResult = pattern.test(thisMealsId);
              if (!testResult) {
                let mealStateObjsRecipeId =
                  thisMealStateObj.thisRecord.genRecipe._id;
                let thisMealsGenRecipeIdLocal = thisMealRecord.genRecipe._id;
                if (
                  typeOfRecordToChange === "genRecipe" &&
                  thisMealsGenRecipeIdLocal === mealStateObjsRecipeId
                ) {
                  thisLocalMealStateObj.thisRecord.genRecipe[propToUpdate] =
                    newValue;
                  // if (propToUpdate === "genRecipe" && thisRecordJustCreated) {
                  //   thisLocalMealStateObj.propRefObjsJustCreated.meal.push(
                  //     "genRecipe"
                  //   );
                  // }
                }
                let thisMealsIngrdntsLocal =
                  thisLocalMealStateObj.thisMealsIngrdnts;
                for (let i = 0; i < thisMealsIngrdntsLocal.length; i++) {
                  let thisMealIngrdntLocal = thisMealsIngrdntsLocal[i];
                  let thisGenRecipeIngrdntLocal =
                    thisMealIngrdntLocal.thisRecord.genRecipeIngredient;
                  let thisIngredientLocal =
                    thisGenRecipeIngrdntLocal.ingredient;
                  let thisIngrdntIdLocal = thisIngredientLocal._id;
                  if (
                    typeOfRecordToChange === "genRecipe" ||
                    typeOfRecordToChange === "genRecipeIngredient"
                  ) {
                    if (thisMealsGenRecipeIdLocal === mealStateObjsRecipeId) {
                      if (typeOfRecordToChange === "genRecipe") {
                        thisGenRecipeIngrdntLocal.genRecipe[propToUpdate] =
                          newValue;
                      } else if (
                        typeOfRecordToChange === "genRecipeIngredient"
                      ) {
                        thisIngredientLocal[propToUpdate] = newValue;
                      }
                    }
                  } else {
                    let thisIngrdntStateObj =
                      thisMealIngrdntStateObj.thisRecord.genRecipeIngredient
                        .ingredient;
                    let thisIngrdntStateObjId = thisIngrdntStateObj._id;
                    if (thisIngrdntIdLocal === thisIngrdntStateObjId) {
                      thisIngredientLocal[propToUpdate] = newValue;
                    }
                  }
                  thisGenRecipeIngrdntLocal.ingredient = thisIngredientLocal;
                  thisMealIngrdntLocal.thisRecord.genRecipeIngredient =
                    thisGenRecipeIngrdntLocal;
                  thisMealsIngrdntsLocal[i] = thisMealIngrdntLocal;
                }
                thisLocalMealStateObj.thisMealsIngrdnts =
                  thisMealsIngrdntsLocal;
              }
              thisLocalDayStateObj.thisDaysMeals[mealTypeCodes[i]] =
                thisLocalMealStateObj;
            }
            thisWeeksDays[dayOfWeekCodes[i]] = thisLocalDayStateObj;
          }
        }
      case "genRecipe":
        thisRecordId = thisMealStateObj.thisRecord.genRecipe._id;
        thisMealStateObj.thisRecord.genRecipe[propToUpdate] = newValue;
        const genRecipeValErrs = thisMealStateObj.valErrors.genRecipe;
        const genRecipeValErrsNew = await getCSValResult(genRecipeValErrs);
        thisMealStateObj.valErrors.genRecipe = genRecipeValErrsNew;
        thisMealStateObj.recordChanged.genRecipe = true;
        break;
      case "mealIngredient":
        thisRecordId = thisMealIngrdntStateObj.thisRecord._id;
        thisMealIngrdntStateObj.thisRecord[propToUpdate] = newValue;
        const mealIngredientValErrs =
          thisMealIngrdntStateObj.valErrors.mealIngredient;
        const mealIngredientValErrsNew = await getCSValResult(
          mealIngredientValErrs
        );
        thisMealIngrdntStateObj.valErrors.mealIngredient =
          mealIngredientValErrsNew;
        thisMealIngrdntStateObj.recordChanged.mealIngredient = true;
        break;
      case "genRecipeIngredient":
        thisRecordId =
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient._id;
        thisMealIngrdntStateObj.thisRecord.genRecipeIngredient[propToUpdate] =
          newValue;
        const genRecipeIngredientValErrs =
          thisMealIngrdntStateObj.valErrors.genRecipeIngredient;
        const genRecipeIngredientValErrsNew = await getCSValResult(
          genRecipeIngredientValErrs
        );
        thisMealIngrdntStateObj.valErrors.genRecipeIngredient =
          genRecipeIngredientValErrsNew;
        thisMealIngrdntStateObj.recordChanged.genRecipeIngredient = true;
        thisMealIngrdntStateObj.thisRecordJustCreated.ingredient =
          propToUpdate === "ingredient" && thisRecordJustCreated ? true : false;
        break;
      case "ingredient":
        thisRecordId =
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient.ingredient._id;
        thisMealIngrdntStateObj.thisRecord.genRecipeIngredient.ingredient[
          propToUpdate
        ] = newValue;
        const ingredientValErrs = thisMealIngrdntStateObj.valErrors.ingredient;
        const ingredientValErrsNew = await getCSValResult(ingredientValErrs);
        thisMealIngrdntStateObj.valErrors.ingredient = ingredientValErrsNew;
        thisMealIngrdntStateObj.recordChanged.ingredient = true;
        break;
    }

    if (thisMealIngrdntStateObj) {
      thisMealStateObj.thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
    }
    if (thisMealStateObj) {
      thisDayStateObj.thisDaysMeals[thisMealTypeCode] = thisMealStateObj;
    }
    if (thisDayStateObj) {
      thisWeeksDays[thisDayOfWeekCode] = thisDayStateObj;
      state.thisWeeksDays = thisWeeksDays;
    }
    // this.notifyOfErrors(newValueValErrors);
    this.setState(state);
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
  resetRecordValErrorsFn = (
    recordStateObj,
    thisRecord,
    typeOfRecordToChange
  ) => {
    let thisValErrorObjToUpdate = {};
    const valErrorPropNames = Object.keys(thisRecord);
    valErrorPropNames.map((propName) => {
      thisValErrorObjToUpdate[propName] = [];
    });
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.valErrors = thisValErrorObjToUpdate;
    } else {
      recordStateObj.valErrors = recordStateObj.valErrors
        ? recordStateObj.valErrors
        : {};
      recordStateObj.valErrors[typeOfRecordToChange] = thisValErrorObjToUpdate;
    }
    return recordStateObj;
  };
  resetRecordEditingFormFn = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.editingForm = false;
    } else {
      recordStateObj.editingForm = recordStateObj.editingForm
        ? recordStateObj.editingForm
        : {};
      recordStateObj.editingForm[typeOfRecordToChange] = false;
    }
    return recordStateObj;
  };
  resetRecordUserTypeFn = (
    recordStateObj,
    typeOfRecordToChange,
    recordAuthorId
  ) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.userType =
        this.determineThisRecordsUserTypeFn(recordAuthorId);
    } else {
      recordStateObj.userType = recordStateObj.userType
        ? recordStateObj.userType
        : {};
      recordStateObj.userType[typeOfRecordToChange] =
        this.determineThisRecordsUserTypeFn(recordAuthorId);
    }
    return recordStateObj;
  };
  resetRecordChangedFn = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.recordChanged = false;
    } else {
      recordStateObj.recordChanged = recordStateObj.recordChanged
        ? recordStateObj.recordChanged
        : {};
      recordStateObj.recordChanged[typeOfRecordToChange] = false;
    }
    return recordStateObj;
  };
  resetRecordsJustCreatedFn = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.thisRecordJustCreated = false;
    } else {
      recordStateObj.recordsJustCreated = recordStateObj.justCreated
        ? recordStateObj.recordsJustCreated
        : {};
      recordStateObj.recordsJustCreated[typeOfRecordToChange] = false;
    }
    return recordStateObj;
  };
  resetPropRefObjsJustCreatedFn = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.propRefObjsJustCreated = [];
    } else {
      recordStateObj.propRefObjsJustCreated =
        recordStateObj.propRefObjsJustCreated
          ? recordStateObj.propRefObjsJustCreated
          : {};
      recordStateObj.propRefObjsJustCreated[typeOfRecordToChange] = [];
    }
    return recordStateObj;
  };
  resetRecordStateObjFn = (
    recordStateObj,
    thisRecord,
    typeOfRecordToChange
  ) => {
    let authorId;
    recordStateObj = this.resetRecordValErrorsFn(
      recordStateObj,
      thisRecord,
      typeOfRecordToChange
    );

    switch (typeOfRecordToChange) {
      case "day":
        authorId = thisRecord.weekMealPlan.GRFUser._id;
        break;
      case "meal":
        authorId = thisRecord.day.weekMealPlan.GRFUser._id;

        // recordStateObj = this.resetRecordValErrors(
        //   recordStateObj,
        //   thisRecord.genRecipe,
        //   "genRecipe"
        // );

        break;
      case "mealIngredient":
        authorId = thisRecord.meal.day.weekMealPlan.GRFUser._id;
        // recordStateObj = this.resetRecordValErrors(
        //   recordStateObj,
        //   thisRecord.genRecipeIngredient,
        //   "genRecipeIngredient"
        // );
        // recordStateObj = this.resetRecordValErrors(
        //   recordStateObj,
        //   thisRecord.genRecipeIngredient.ingredient,
        //   "ingredient"
        // );
        break;
      case "genRecipeIngredient":
        authorId = thisRecord.genRecipe.GRFUser._id;
        break;
      default:
        authorId = thisRecord.GRFUser._id;
    }

    recordStateObj = this.resetRecordEditingFormFn(
      recordStateObj,
      typeOfRecordToChange
    );

    recordStateObj = this.resetRecordUserTypeFn(
      recordStateObj,
      typeOfRecordToChange,
      authorId
    );

    recordStateObj = this.resetRecordChangedFn(
      recordStateObj,
      typeOfRecordToChange
    );
    recordStateObj = this.resetRecordsJustCreatedFn(
      recordStateObj,
      typeOfRecordToChange
    );
    // recordStateObj = this.resetPropRefObjsJustCreatedFn(
    //   recordStateObj,
    //   typeOfRecordToChange
    // );
    return recordStateObj;
  };
  getThisGenRecipesGenRecipeIngrdntsFn = async (
    thisGenRecipe,
    backEndHtmlRoot
  ) => {
    const { _id } = thisGenRecipe;
    const backEndReqUrl = `${backEndHtmlRoot}genRecipeIngredients/thisGenRecipesGenRecipeIngredients/${_id}`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      return backEndReqResponse.data;
    } catch (errs) {
      this.updateStateWValErrs(errs);
      return;
    }
  };
  getThisMealsIngrdntsFn = async (thisMealStateObj, backEndHtmlRoot) => {
    const { thisRecord } = thisMealStateObj;
    const { _id } = thisRecord;
    const backEndReqUrl = `${backEndHtmlRoot}mealIngredients/thisMealsMealIngredients/${_id}`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      const reqResponseRecords = backEndReqResponse.data;

      let thisMealsIngrdnts = [];
      for (let i = 0; i < reqResponseRecords.length; i++) {
        let thisMealIngrdntStateObj = {};

        thisMealIngrdntStateObj.thisRecord = reqResponseRecords[i];
        thisMealIngrdntStateObj = this.resetRecordStateObjFn(
          thisMealIngrdntStateObj,
          thisMealIngrdntStateObj.thisRecord,
          "mealIngredient"
        );
        thisMealIngrdntStateObj = this.resetRecordStateObjFn(
          thisMealIngrdntStateObj,
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient,
          "genRecipeIngredient"
        );
        thisMealIngrdntStateObj = this.resetRecordStateObjFn(
          thisMealIngrdntStateObj,
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient.ingredient,
          "ingredient"
        );
        thisMealIngrdntStateObj.arrayIndex = [i];
        thisMealIngrdntStateObj.recordLoaded = true;
        thisMealsIngrdnts.push(thisMealIngrdntStateObj);
      }
      thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
      return thisMealStateObj;
    } catch (errs) {
      this.updateStateWValErrs(errs);
      return;
    }
  };
  getThisDaysMealsFn = async (thisDayStateObj, backEndHtmlRoot) => {
    const defaultRecipeIds = {
      breakfastId: "62577f516682e3955e98b1d0",
      snack1Id: "62577a7d93011a9b47306e6f",
      lunchId: "62577f666682e3955e98b1d1",
      snack2Id: "62577f786682e3955e98b1d2",
      dinnerId: "62577f8b6682e3955e98b1d3",
      dessertId: "62577f9c6682e3955e98b1d4",
    };

    const thisDayId = thisDayStateObj.thisRecord._id;
    const backEndReqUrl = `${backEndHtmlRoot}meals/mealsOfThisDay/${thisDayId}`;
    let mealTypeCodes = this.state.mealTypeCodes;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);

      const reqResponseRecords = backEndReqResponse.data;

      thisDayStateObj.thisDaysMeals = {};
      for (let i = 0; i < mealTypeCodes.length; i++) {
        let thisMealStateObj = { valErrors: { meal: {}, genRecipe: {} } };
        let thisNewMealStateObj;
        const thisMealData = reqResponseRecords.filter(
          (meal) => meal.mealType.code === mealTypeCodes[i]
        )[0];

        if (thisMealData) {
          thisMealStateObj.thisRecord = thisMealData;
          thisMealStateObj = this.resetRecordStateObjFn(
            thisMealStateObj,
            thisMealData,
            "meal"
          );
          thisMealStateObj = this.resetRecordStateObjFn(
            thisMealStateObj,
            thisMealData.genRecipe,
            "genRecipe"
          );
          thisMealStateObj.thisRecipesIngrdnts =
            await this.getThisGenRecipesGenRecipeIngrdntsFn(
              thisMealData.genRecipe,
              backEndHtmlRoot
            );
          thisNewMealStateObj = await this.getThisMealsIngrdntsFn(
            thisMealStateObj,
            backEndHtmlRoot
          );
          thisNewMealStateObj.recordLoaded = true;
          // thisMealStateObj.recordLoaded = true;
          // thisMealStateObj.thisRecipeIngrdnts
          //   ? true
          //   : false;
        } else {
          let thisDefaultRecipeId = defaultRecipeIds[`${mealTypeCodes[i]}Id`];
          let thisDefaultGenRecipe = {
            _id: thisDefaultRecipeId,
            name: " ",
            availableMealType: { code: mealTypeCodes[i] },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoURL: "",
          };
          thisNewMealStateObj = thisMealStateObj;
          thisNewMealStateObj.thisRecord = {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
            genRecipe: thisDefaultGenRecipe,
          };
          thisNewMealStateObj.userType = {
            meal: this.determineThisRecordsUserTypeFn(
              thisDayStateObj.thisRecord.weekMealPlan.GRFUser._id
            ),
            genRecipe: this.determineThisRecordsUserTypeFn(
              thisDefaultGenRecipe.GRFUser._id
            ),
          };
          thisNewMealStateObj.thisMealsIngrdnts = [];
        }
        thisDayStateObj.thisDaysMeals[mealTypeCodes[i]] = thisNewMealStateObj;
      }
      return thisDayStateObj;
    } catch (errs) {
      this.updateStateWValErrs(errs);
      return;
    }
  };
  getThisWMPsDaysFn = async (thisWMP, backEndHtmlRoot, wmpJustCreated) => {
    let wmpId = thisWMP._id;
    let thisWeeksDays = {};
    let dayOfWeekCodes = this.state.dayOfWeekCodes;
    const backEndReqUrl = `${backEndHtmlRoot}days/daysofthiswmp/${wmpId}`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);

      const reqResponseRecords = backEndReqResponse.data;

      for (let i = 0; i < dayOfWeekCodes.length; i++) {
        let thisDayStateObj = { valErrors: {} };
        const thisDayData = reqResponseRecords.filter(
          (day) => day.dayOfWeek.code === dayOfWeekCodes[i]
        )[0];

        if (thisDayData) {
          thisDayStateObj.thisRecord = thisDayData;

          thisDayStateObj = this.resetRecordStateObjFn(
            thisDayStateObj,
            thisDayData,
            "day"
          );
          if (wmpJustCreated) {
            thisDayStateObj.propRefObjsJustCreated = ["weekMealPlan"];
          }
          thisDayStateObj = await this.getThisDaysMealsFn(
            thisDayStateObj,
            backEndHtmlRoot
          );
        } else {
          thisDayStateObj.thisRecord = {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
            weekMealPlan: thisWMP,
          };
        }
        thisDayStateObj.recordLoaded = true;
        thisWeeksDays[dayOfWeekCodes[i]] = thisDayStateObj;
      }
      return thisWeeksDays;
      // this.setState({ thisWeeksDays: thisWeeksDays });
    } catch (errs) {
      this.updateStateWValErrs(errs);
      return;
    }
  };
  // getThisWMPFn = async () => {
  //   const {
  //     pgReqParams,
  //     backEndHtmlRoot,
  //     typeOfRecordToChange,
  //     thisWMPStateObj,
  //   } = this.state;
  //   const thisWMPId = thisWMPStateObj.thisRecord._id;
  //   const thisRecordJustCreated = pgReqParams.isNewWMP ? true : false;
  //   const backEndReqUrl = `${backEndHtmlRoot}${typeOfRecordToChange}s/${thisWMPId}`;
  //   try {
  //     const backEndReqResponse = await httpService.get(backEndReqUrl);

  //     const reqResponseRecord = backEndReqResponse.data;
  //     thisWMPStateObj.thisRecord = reqResponseRecord;
  //     thisWMPStateObj.recordLoaded = true;
  //     let thisNewWMPStateObj;

  //     thisNewWMPStateObj = this.resetRecordStateObjFn(
  //       thisWMPStateObj,
  //       reqResponseRecord,
  //       "weekMealPlan"
  //     );
  //     let newState = {};
  //     thisNewWMPStateObj.thisRecordJustCreated = thisRecordJustCreated;
  //     newState.thisWMPStateObj = thisNewWMPStateObj;
  //     let thisWeeksDays = await this.getThisWMPsDaysFn(
  //       thisWMPStateObj.thisRecord,
  //       backEndHtmlRoot,
  //       thisRecordJustCreated
  //     );
  //     newState.thisWeeksDays = thisWeeksDays;
  // newState.thisWMPStateObj.recordLoaded = true;
  //     this.setState({
  //       thisWMPStateObj: newState.thisWMPStateObj,
  //       thisWeeksDays: newState.thisWeeksDays,
  //     });
  //   } catch (errs) {
  //     this.updateStateWValErrs(errs);
  //     return;
  //   }
  // };
  getThisWMPFn = () => {
    const {
      pgReqParams,
      backEndHtmlRoot,
      typeOfRecordToChange,
      thisWMPStateObj,
    } = this.state;
    const thisWMPId = thisWMPStateObj.thisRecord._id;
    const thisRecordJustCreated = pgReqParams.isNewWMP ? true : false;
    const backEndReqUrl = `${backEndHtmlRoot}${typeOfRecordToChange}s/${thisWMPId}`;
    httpService
      .get(backEndReqUrl)
      .then((backEndReqResponse) => {
        const reqResponseRecord = backEndReqResponse.data;
        thisWMPStateObj.thisRecord = reqResponseRecord;
        // thisWMPStateObj.recordLoaded = true;
        let thisNewWMPStateObj;
        thisNewWMPStateObj = this.resetRecordStateObjFn(
          thisWMPStateObj,
          reqResponseRecord,
          "weekMealPlan"
        );
        let newState = {};
        thisNewWMPStateObj.thisRecordJustCreated = thisRecordJustCreated;
        newState.thisWMPStateObj = thisNewWMPStateObj;
        this.getThisWMPsDaysFn(
          thisWMPStateObj.thisRecord,
          backEndHtmlRoot,
          thisRecordJustCreated
        )
          .then((thisWeeksDays) => {
            newState.thisWeeksDays = thisWeeksDays;
            newState.thisWMPStateObj.recordLoaded = true;
            this.setState({
              thisWMPStateObj: newState.thisWMPStateObj,
              thisWeeksDays: newState.thisWeeksDays,
            });
          })
          .catch((errs) => {
            this.updateStateWValErrs(errs);
            return;
          });
      })
      .catch((errs) => {
        this.updateStateWValErrs(errs);
        return;
      });
  };
  handleClickEditFn = (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    // console.log(typeOfRecordToChange, thisDayOfWeekCode, thisMealTypeCode);
    let state = this.state;
    let pattern = /missing/;
    state.thisWMPStateBackup = _.cloneDeep(state.thisWMPStateObj);
    state.thisWeeksDaysBackup = _.cloneDeep(state.thisWeeksDays);
    state.thisWMPStateObj.userType = "viewer";
    let thisRecordsAuthorId;
    let dayOfWeekCodes = state.dayOfWeekCodes;
    let mealTypeCodes = state.mealTypeCodes;
    let thisWeeksDays = state.thisWeeksDays;
    let thisDayStateObj = thisDayOfWeekCode
      ? thisWeeksDays[thisDayOfWeekCode]
      : null;
    let thisMealStateObj = thisMealTypeCode
      ? thisDayStateObj.thisDaysMeals[thisMealTypeCode]
      : null;
    // console.log(thisMealStateObj);
    let thisMealIngrdntStateObj =
      arrayIndex || arrayIndex === 0
        ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
        : null;
    // console.log(thisMealIngrdntStateObj);
    for (let i = 0; i < dayOfWeekCodes.length; i++) {
      let thisDayStateObjLocal = thisWeeksDays[dayOfWeekCodes[i]];

      let testResult = pattern.test(thisDayStateObjLocal.thisRecord._id);

      if (!testResult) {
        thisDayStateObjLocal.userType = "viewer";
        let thisDaysMeals = thisDayStateObjLocal.thisDaysMeals;

        for (let i = 0; i < mealTypeCodes.length; i++) {
          let thisMealStateObjLocal = thisDaysMeals[mealTypeCodes[i]];

          let testResult = pattern.test(thisMealStateObjLocal.thisRecord._id);

          if (!testResult) {
            thisMealStateObjLocal.userType = {
              meal: "viewer",
              genRecipe: "viewer",
            };
            let thisMealsIngrdnts = thisMealStateObjLocal.thisMealsIngrdnts;

            for (let i = 0; i < thisMealsIngrdnts.length; i++) {
              let thisMealIngrdntStateObjLocal = thisMealsIngrdnts[i];

              thisMealIngrdntStateObjLocal.userType = {
                mealIngredient: "viewer",
                genRecipeIngredient: "viewer",
                ingredient: "viewer",
              };
              thisMealsIngrdnts[i] = thisMealIngrdntStateObjLocal;
            }
            thisMealStateObjLocal.thisMealsIngrdnts = thisMealsIngrdnts;
          }
          thisDaysMeals[mealTypeCodes[i]] = thisMealStateObjLocal;
        }
        thisDayStateObjLocal.thisDaysMeals = thisDaysMeals;
      }
      thisWeeksDays[dayOfWeekCodes[i]] = thisDayStateObjLocal;
    }
    switch (typeOfRecordToChange) {
      case "weekMealPlan" || "day" || "meal" || "mealIngredient":
        thisRecordsAuthorId = state.thisWMPStateObj.thisRecord.GRFUser._id;
      case "weekMealPlan":
        state.thisWMPStateObj.userType =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        state.thisWMPStateObj.editingForm = true;
        break;
      case "day":
        thisDayStateObj.userType =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisDayStateObj.editingForm = true;
        break;
      case "meal":
        thisMealStateObj.userType.meal =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealStateObj.editingForm.meal = true;
        break;
      case "genRecipe" || "genRecipeIngredient":
        thisRecordsAuthorId = thisMealStateObj.thisRecord.genRecipe.GRFUser._id;
      case "genRecipe":
        thisMealStateObj.userType.genRecipe =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealStateObj.editingForm.genRecipe = true;
        break;
      case "mealIngredient":
        // console.log(thisMealIngrdntStateObj);
        thisMealIngrdntStateObj.userType.mealIngredient =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealIngrdntStateObj.editingForm.mealIngredient = true;
        break;
      case "genRecipeIngredient":
        thisMealIngrdntStateObj.userType.genRecipeIngredient =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealIngrdntStateObj.editingForm.genRecipeIngredient = true;
        break;
      case "ingredient":
        thisRecordsAuthorId =
          thisMealIngrdntStateObj.thisRecord.genRecipeIngredient.ingredient
            .GRFUser._id;
        thisMealIngrdntStateObj.userType.ingredient =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealIngrdntStateObj.editingForm.ingredient = true;
        break;
    }
    switch (typeOfRecordToChange) {
      case "ingredient" || "genRecipeIngredient" || "mealIngredient":
        thisMealStateObj.thisMealsIngrdnts[arrayIndex] =
          thisMealIngrdntStateObj;
      case !"day" || !"weekMealPlan":
        thisDayStateObj.thisDaysMeals[thisMealTypeCode] = thisMealStateObj;
      case !"weekMealPlan":
        thisWeeksDays[thisDayOfWeekCode] = thisDayStateObj;
        state.thisWeeksDays = thisWeeksDays;
        break;
    }
    this.setState(state);
  };
  getFullRecordSet = async (typeOfRecordToChange) => {
    const backEndHtmlRoot = this.state.backEndHtmlRoot;
    const backEndReqUrl = `${backEndHtmlRoot}${typeOfRecordToChange}s/`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      return backEndReqResponse.data;
    } catch (errs) {
      this.updateStateWValErrs(errs);
      return [];
    }
  };
  getAllUOMsWTsAndBrands = async () => {
    let allUnitOfMeasures = await this.getFullRecordSet("unitOfMeasure");
    let allWeightTypes = await this.getFullRecordSet("weightType");
    let allBrands = await this.getFullRecordSet("brand");
    this.setState({
      allUnitOfMeasures: allUnitOfMeasures,
      allWeightTypes: allWeightTypes,
      allBrands: allBrands,
    });
  };
  componentDidMount() {
    const currentGRFUser = authService.getCurrentUser();
    this.setState({ currentGRFUser: currentGRFUser });
    this.getThisWMPFn();
    this.getAllUOMsWTsAndBrands();
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
        <WeekMealPlanCard
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
        />
      </div>
    );
  }
}
export default NewWeekMealPlan;
