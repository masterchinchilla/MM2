import React, { Component } from "react";
import Joi from "joi";
import _ from "lodash";
import httpService from "../../services/httpService";
import authService from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import WeekMealPlanCard from "./WeekMealPlanCard.component";
import DaysCard from "./DaysCard.component";
import valSchema from "../universalJoiValSchema";
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
    this.state = {
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

  handleClickCancelFn = () => {
    console.log("clicked Cancel");
  };
  handleUpdatePropFn = () => {
    console.log("updated Prop");
  };
  handleClickSaveFn = () => {
    console.log("clicked Save");
  };
  handleClickDeleteFn = () => {
    console.log("clicked Delete");
  };
  handleUpdateWeightsFn = () => {
    console.log("weights updated");
  };
  handleClickCopyFn = () => {
    console.log("clicked copy");
  };
  handleCreateNewRecordFn = (
    typeOfRecordToChange,
    typeOfRecordToCreate,
    propType,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    newRecordForState,
    newRecordToSave
  ) => {
    console.log("created new record");
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
    let validationError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
    } else {
      validationError = null;
    }
    return validationError;
  };
  notify = (notice, noticeType) => {
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
  resetRecordJustCreatedFn = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.justCreated = false;
    } else {
      recordStateObj.justCreated = recordStateObj.justCreated
        ? recordStateObj.justCreated
        : {};
      recordStateObj.justCreated[typeOfRecordToChange] = false;
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
    recordStateObj = this.resetRecordJustCreatedFn(
      recordStateObj,
      typeOfRecordToChange
    );

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
    } catch (error) {
      this.notify(error, "error");
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
        thisMealIngrdntStateObj.recordLoaded = true;
        thisMealsIngrdnts.push(thisMealIngrdntStateObj);
      }
      thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
      return thisMealStateObj;
    } catch (error) {
      this.notify(error, "error");
      return;
    }
  };
  getThisDaysMealsFn = async (thisDayStateObj, backEndHtmlRoot) => {
    const thisDayId = thisDayStateObj.thisRecord._id;
    const backEndReqUrl = `${backEndHtmlRoot}meals/mealsOfThisDay/${thisDayId}`;
    let thisDaysMealsBackup = {};
    let mealTypeCodes = this.state.mealTypeCodes;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);

      const reqResponseRecords = backEndReqResponse.data;

      thisDayStateObj.thisDaysMeals = {};
      for (let i = 0; i < mealTypeCodes.length; i++) {
        thisDaysMealsBackup[mealTypeCodes[i]] = {};

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
          thisNewMealStateObj = thisMealStateObj;
          thisNewMealStateObj.thisRecord = {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
          };
          thisNewMealStateObj.thisMealsIngrdnts = [];
        }
        thisDayStateObj.thisDaysMeals[mealTypeCodes[i]] = thisNewMealStateObj;
      }
      return { thisDayStateObj, thisDaysMealsBackup };
    } catch (error) {
      this.notify(error, "error");
      return;
    }
  };
  getThisWMPsDaysFn = async (wmpId, backEndHtmlRoot) => {
    let thisWeeksDays = {};
    let thisWeeksDaysBackup = {};
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
          let thisDayStateObjAndBackup = await this.getThisDaysMealsFn(
            thisDayStateObj,
            backEndHtmlRoot
          );
          thisDayStateObj = thisDayStateObjAndBackup.thisDayStateObj;
          thisWeeksDaysBackup[dayOfWeekCodes[i]] =
            thisDayStateObjAndBackup.thisDaysMealsBackup;
        } else {
          thisDayStateObj.thisRecord = {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
          };
        }
        thisDayStateObj.recordLoaded = true;
        thisWeeksDays[dayOfWeekCodes[i]] = thisDayStateObj;
      }

      return { thisWeeksDays, thisWeeksDaysBackup };
    } catch (error) {
      this.notify(error, "error");
      return;
    }
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
    const backEndReqUrl = `${backEndHtmlRoot}${typeOfRecordToChange}s/${thisWMPId}`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);

      const reqResponseRecord = backEndReqResponse.data;
      thisWMPStateObj.thisRecord = reqResponseRecord;
      thisWMPStateObj.recordLoaded = true;
      let thisNewWMPStateObj;

      thisNewWMPStateObj = this.resetRecordStateObjFn(
        thisWMPStateObj,
        reqResponseRecord,
        "weekMealPlan"
      );
      let newState = {};
      thisNewWMPStateObj.justCreated = thisRecordJustCreated;
      newState.thisWMPStateObj = thisNewWMPStateObj;
      let thisWeeksDaysAndBackup = await this.getThisWMPsDaysFn(
        thisWMPId,
        backEndHtmlRoot
      );

      newState.thisWeeksDays = thisWeeksDaysAndBackup.thisWeeksDays;
      newState.thisWeeksDaysBackup = thisWeeksDaysAndBackup.thisWeeksDaysBackup;
      this.setState({
        thisWMPStateObj: newState.thisWMPStateObj,
        thisWeeksDays: newState.thisWeeksDays,
        thisWeeksDaysBackup: newState.thisWeeksDaysBackup,
      });
    } catch (error) {
      this.notify(error, "error");
      return;
    }
  };
  handleClickEditFn = (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
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
    let thisMealIngrdntStateObj = arrayIndex
      ? thisMealStateObj.thisMealsIngrdnts[arrayIndex]
      : null;
    for (let i = 0; i < dayOfWeekCodes.length; i++) {
      let thisDayStateObjLocal = thisWeeksDays[dayOfWeekCodes[i]];
      let testResult = thisDayStateObjLocal.thisRecord._id;
      if (!testResult) {
        thisDayStateObjLocal.userType = "viewer";
        let thisDaysMeals = thisDayStateObjLocal.thisDaysMeals;
        for (let i = 0; i < mealTypeCodes.length; i++) {
          let thisMealStateObjLocal = thisDaysMeals[mealTypeCodes[i]];
          let testResult = thisMealStateObjLocal.thisRecord._id;
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
        state.thisWMPStateObj.editingRecord = true;
        break;
      case "day":
        thisDayStateObj.userType =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisDayStateObj.editingRecord = true;
        break;
      case "meal":
        thisMealStateObj.userType.meal =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealStateObj.editingRecord.meal = true;
        break;
      case "genRecipe" || "genRecipeIngredient":
        thisRecordsAuthorId = thisMealStateObj.thisRecord.genRecipe.GRFUser._id;
      case "genRecipe":
        thisMealStateObj.userType.genRecipe =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealStateObj.editingRecord.genRecipe = true;
        break;
      case "mealIngredient":
        thisMealIngrdntStateObj.userType.mealIngredient =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealIngrdntStateObj.editingRecord.mealIngredient = true;
        break;
      case "genRecipeIngredient":
        thisMealIngrdntStateObj.userType.genRecipeIngredient =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealIngrdntStateObj.editingRecord.genRecipeIngredient = true;
        break;
      case "ingredient":
        thisRecordsAuthorId =
          thisMealIngrdntStateObj.thisRecord.ingredient.GRFUser._id;
        thisMealIngrdntStateObj.userType.ingredient =
          this.determineThisRecordsUserTypeFn(thisRecordsAuthorId);
        thisMealIngrdntStateObj.editingRecord.ingredient = true;
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
