import React, { Component } from "react";
import Creatable from "react-select/creatable";
import _ from "lodash";

class SelectSearchListWCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      newOptionValidationError: "",
    };
  }
  componentDidMount() {
    let newArray = [];
    this.props.options.forEach((element) => {
      newArray.push({
        label: `${element.name}`,
        value: element._id,
      });
    });
    this.setState({ options: newArray });
  }
  handleChange = (e) => {
    if (e) {
      this.props.onUpdateProp(
        this.props.objType,
        this.props.dayOfWeekCode,
        this.props.mealType.code,
        this.props.objTypeToChange,
        this.props.arrayIndex,
        "reactSelect",
        e.value,
        this.props.options
      );
    }
  };
  handleCreate = (e) => {
    let trimmedName = e.trim();
    let newRecordName = trimmedName.replace(/  +/g, " ");
    let newRecordForState = {
      label: newRecordName,
      value: {
        _id: "tempNewObjId1",
        name: newRecordName,
        GRFUser: this.props.thisGRFUser,
        // defaultPrepInstructions: "",
        // photoURL: "",
        // availableMealType: this.props.mealType,
      },
    };
    if (this.props.objTypeToChange === "genRecipe") {
      newRecordForState.value.defaultPrepInstructions = "";
      newRecordForState.value.photoURL = "";
      newRecordForState.value.availableMealType = this.props.mealType;
    }
    let newRecordToSave;
    console.log(newRecordToSave);
    if (this.props.objTypeToChange === "genRecipe") {
      newRecordToSave = {
        name: newRecordName,
        GRFUser: this.props.thisGRFUser._id,
        defaultPrepInstructions: "",
        photoURL: "",
        availableMealType: this.props.mealType._id,
      };
    } else {
      newRecordToSave = {
        name: newRecordName,
        GRFUser: this.props.thisGRFUser._id,
      };
    }
    console.log(newRecordToSave);
    // {
    //   name: newRecordName,
    //   GRFUser: this.props.thisGRFUser._id,
    //   availableMealType: this.props.mealType._id,
    //   defaultPrepInstructions: "",
    //   photoURL: "",
    // };
    this.props.onCreateRecord(
      this.props.objTypeToChange,
      this.props.dayOfWeekCode,
      this.props.mealType.code,
      this.props.arrayIndex,
      newRecordForState.value,
      newRecordToSave
    );
  };
  validateNewName = (e) => {
    let inputValue = e;
    let trimmedName = inputValue.trim();
    let trimmedNameWNoDblSpcs = trimmedName.replace(/  +/g, " ");
    let nameLength = trimmedNameWNoDblSpcs.length;
    if (nameLength >= 3 && nameLength <= 255) {
      this.setState({
        newOptionValidationError: null,
      });
    } else {
      this.setState({
        newOptionValidationError: "Must be between 3 and 255 characters",
      });
    }
  };
  clearValErrorInState = () => {
    this.setState({
      newOptionValidationError: null,
    });
  };
  render() {
    const capitalObjType =
      this.props.objTypeToChange.charAt(0).toUpperCase() +
      this.props.objTypeToChange.slice(1);
    return (
      <div>
        <div
          className="alert alert-danger selectFieldValError"
          hidden={this.state.newOptionValidationError ? false : true}
        >
          {this.state.newOptionValidationError}
        </div>
        <Creatable
          value={{
            label: this.props.objToSelect.name,
            value: this.props.objToSelect._id,
          }}
          options={this.state.options}
          placeholder={
            this.props.objTypeToChange === "genRecipe"
              ? "Select Recipe"
              : `Select ${capitalObjType}`
          }
          isSearchable={true}
          onInputChange={(e) => {
            this.validateNewName(e);
          }}
          onChange={(e) => {
            this.handleChange(e);
          }}
          isDisabled={this.props.thisFormState === "viewing" ? true : false}
          className={this.props.styleClasses}
          onCreateOption={(e) => this.handleCreate(e)}
          isValidNewOption={(e) => {
            let inputValue = e;
            let trimmedName = inputValue.trim();
            let trimmedNameWNoDblSpcs = trimmedName.replace(/  +/g, " ");
            let nameLength = trimmedNameWNoDblSpcs.length;
            if (nameLength >= 3 && nameLength <= 255) {
              return true;
            } else {
              return false;
            }
          }}
          onBlur={this.clearValErrorInState}
        />
      </div>
    );
  }
}
export default SelectSearchListWCreate;
