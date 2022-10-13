import React, { Component } from "react";
import Creatable from "react-select/creatable";
import _ from "lodash";

class SelectSearchListWCreate extends Component {
  constructor(props) {
    super(props);
    const {
      options,
      objToSelect,
      objType,
      dayOfWeekCode,
      mealType,
      objTypeToChange,
      arrayIndex,
      thisGRFUser,
      thisFormState,
      styleClasses,
    } = this.props;
    this.state = {
      options: [],
      filteredOptions: [],
      newOptionValidationError: null,
      selectedOption: {},
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
    this.setState({
      options: newArray,
      selectedOption: this.props.objToSelect,
    });
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
        this.props.options,
        "objRef"
      );
    }
    this.setState({
      newOptionValidationError: null,
    });
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
    if (this.props.objTypeToChange === "genRecipe") {
      newRecordToSave = {
        name: newRecordName,
        GRFUser: this.props.thisGRFUser,
        defaultPrepInstructions: "",
        photoURL: "",
        availableMealType: this.props.mealType,
      };
    } else {
      newRecordToSave = {
        name: newRecordName,
        GRFUser: this.props.thisGRFUser,
      };
    }
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
    const regexObj = new RegExp(trimmedNameWNoDblSpcs, "i");
    let filteredOptions = this.state.options.filter((option) => {
      return regexObj.test(option.label);
    });
    if (filteredOptions.length < 1) {
      let nameLength = trimmedNameWNoDblSpcs.length;
      if (nameLength >= 3 && nameLength <= 255) {
        this.setState({
          newOptionValidationError: null,
        });
      } else {
        if (nameLength > 0) {
          this.setState({
            newOptionValidationError: "Must be between 3 and 255 characters",
          });
        } else {
          this.setState({
            newOptionValidationError: null,
          });
        }
      }
    } else {
      this.setState({
        newOptionValidationError: null,
      });
    }
  };
  clearValErrorInState = () => {
    console.log("blurred");
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
