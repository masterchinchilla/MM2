import React, { Component } from "react";
import Joi from "joi";
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
    this.state = {
      typeOfRecordToChange: "weekMealPlan",
      pgReqParams: pgReqParams,
      backEndHtmlRoot: backEndHtmlRoot,
      currentGRFUser: thisGRFUser,
      thisWMPStateObj: {
        thisRecord: { _id: pgReqParams.id },
        recordLoaded: false,
        valErrors: {},
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
  handleClickEditFn = () => {
    console.log("clicked Edit");
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
  determineThisRecordsUserType = (recordAuthorId) => {
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
  resetRecordValErrors = (recordStateObj, thisRecord, typeOfRecordToChange) => {
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
      recordStateObj.valErrors = {};
      recordStateObj.valErrors[typeOfRecordToChange] = thisValErrorObjToUpdate;
    }
    return recordStateObj;
  };
  resetRecordEditingForm = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.editingForm = false;
    } else {
      recordStateObj.editingForm = {};
      recordStateObj.editingForm[typeOfRecordToChange] = false;
    }
    return recordStateObj;
  };
  resetRecordUserType = (
    recordStateObj,
    typeOfRecordToChange,
    recordAuthorId
  ) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.userType =
        this.determineThisRecordsUserType(recordAuthorId);
    } else {
      recordStateObj.userType = {};
      recordStateObj.userType[typeOfRecordToChange] =
        this.determineThisRecordsUserType(recordAuthorId);
    }
    return recordStateObj;
  };
  resetRecordChanged = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.recordChanged = false;
    } else {
      recordStateObj.recordChanged = {};
      recordStateObj.recordChanged[typeOfRecordToChange] = false;
    }
    return recordStateObj;
  };
  resetRecordJustCreated = (recordStateObj, typeOfRecordToChange) => {
    if (
      typeOfRecordToChange === "weekMealPlan" ||
      typeOfRecordToChange === "day"
    ) {
      recordStateObj.justCreated = false;
    } else {
      recordStateObj.justCreated = {};
      recordStateObj.justCreated[typeOfRecordToChange] = false;
    }
    return recordStateObj;
  };
  resetRecordStateObj = (recordStateObj, thisRecord, typeOfRecordToChange) => {
    let authorId;
    recordStateObj = this.resetRecordValErrors(
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

        recordStateObj = this.resetRecordValErrors(
          recordStateObj,
          thisRecord.genRecipe,
          "genRecipe"
        );

        break;
      case "mealIngredient":
        authorId = thisRecord.meal.day.weekMealPlan.GRFUser._id;
        recordStateObj = this.resetRecordValErrors(
          recordStateObj,
          thisRecord.genRecipeIngredient,
          "genRecipeIngredient"
        );
        recordStateObj = this.resetRecordValErrors(
          recordStateObj,
          thisRecord.genRecipeIngredient.ingredient,
          "ingredient"
        );
        break;
      case "genRecipeIngredient":
        authorId = thisRecord.genRecipe.GRFUser._id;
        break;
      default:
        authorId = thisRecord.GRFUser._id;
    }

    recordStateObj = this.resetRecordEditingForm(
      recordStateObj,
      typeOfRecordToChange
    );

    recordStateObj = this.resetRecordUserType(
      recordStateObj,
      typeOfRecordToChange,
      authorId
    );

    recordStateObj = this.resetRecordChanged(
      recordStateObj,
      typeOfRecordToChange
    );
    recordStateObj = this.resetRecordJustCreated(
      recordStateObj,
      typeOfRecordToChange
    );

    return recordStateObj;
  };
  getThisGenRecipesGenRecipeIngrdnts = async (
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
  getThisMealsIngrdnts = async (thisMealStateObj, backEndHtmlRoot) => {
    const { thisRecord } = thisMealStateObj;
    const { _id } = thisRecord;
    const backEndReqUrl = `${backEndHtmlRoot}meals/mealsOfThisDay/${_id}`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);
      const reqResponseRecords = backEndReqResponse.data;
      let thisMealsIngrdnts = [];
      for (let i = 0; i < reqResponseRecords.length; i++) {
        let thisMealIngrdntStateObj;
        thisMealIngrdntStateObj.thisRecord = reqResponseRecords[i];
        thisMealIngrdntStateObj = this.resetRecordStateObj(
          thisMealIngrdntStateObj,
          thisMealIngrdntStateObj.thisRecord,
          "mealIngredient"
        );
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

    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);

      const reqResponseRecords = backEndReqResponse.data;
      const mealTypes = [
        "breakfast",
        "snack1",
        "lunch",
        "snack2",
        "dinner",
        "dessert",
      ];
      for (let i = 0; i < mealTypes.length; i++) {
        let thisMealStateObj = { valErrors: { meal: {}, genRecipe: {} } };
        const thisMealData = reqResponseRecords.filter(
          (meal) => meal.mealType.code === mealTypes[i]
        )[0];
        thisDayStateObj.thisDaysMeals = {};
        if (thisMealData) {
          thisMealStateObj.thisRecord = thisMealData;
          try {
            thisMealStateObj = this.resetRecordStateObj(
              thisMealStateObj,
              thisMealData,
              "meal"
            );
          } catch (error) {
            console.log(error);
          }

          // thisMealStateObj.thisRecipeIngrdnts =
          //   await this.getThisGenRecipesGenRecipeIngrdnts(
          //     thisMealData.genRecipe,
          //     backEndHtmlRoot
          //   );
          // thisMealStateObj = await this.getThisMealsIngrdnts(
          //   thisMealStateObj,
          //   backEndHtmlRoot
          // );
        } else {
          thisMealStateObj.thisRecord = {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
          };
        }
        thisDayStateObj.thisDaysMeals[mealTypes[i]] = thisMealStateObj;
      }
      return thisDayStateObj;
    } catch (error) {
      this.notify(error, "error");
      return;
    }
  };
  getThisWMPsDaysFn = async (wmpId, backEndHtmlRoot) => {
    let thisWeeksDays = {};
    const backEndReqUrl = `${backEndHtmlRoot}days/daysofthiswmp/${wmpId}`;
    try {
      const backEndReqResponse = await httpService.get(backEndReqUrl);

      const reqResponseRecords = backEndReqResponse.data;
      const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      for (let i = 0; i < daysOfWeek.length; i++) {
        let thisDayStateObj = { valErrors: {} };
        const thisDayData = reqResponseRecords.filter(
          (day) => day.dayOfWeek.code === daysOfWeek[i]
        )[0];

        if (thisDayData) {
          thisDayStateObj.thisRecord = thisDayData;

          thisDayStateObj = this.resetRecordStateObj(
            thisDayStateObj,
            thisDayData,
            "day"
          );

          thisDayStateObj = await this.getThisDaysMealsFn(
            thisDayStateObj,
            backEndHtmlRoot
          );
        } else {
          thisDayStateObj.thisRecord = {
            _id: `missing${this.getRndIntegerFn(10000000, 99999999)}`,
          };
        }
        thisDayStateObj.recordLoaded = true;
        thisWeeksDays[daysOfWeek[i]] = thisDayStateObj;
      }

      return thisWeeksDays;
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

      thisNewWMPStateObj = this.resetRecordStateObj(
        thisWMPStateObj,
        reqResponseRecord,
        "weekMealPlan"
      );
      let newState = {};
      thisNewWMPStateObj.justCreated = thisRecordJustCreated;
      newState.thisWMPStateObj = thisNewWMPStateObj;
      let thisNewWeeksDays = await this.getThisWMPsDaysFn(
        thisWMPId,
        backEndHtmlRoot
      );
      newState.thisWeeksDays = thisNewWeeksDays;
      this.setState({
        thisWMPStateObj: thisNewWMPStateObj,
        thisWeeksDays: thisNewWeeksDays,
      });
    } catch (error) {
      this.notify(error, "error");
      return;
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
