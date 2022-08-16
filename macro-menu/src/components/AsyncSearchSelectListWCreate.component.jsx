import React, { Component } from "react";
// import { Popover } from "@mui/material";
// import AsyncSelect from "react-select/async";
// import { ActionMeta, OnChangeValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

class AsyncSearchSelectListWCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validNewName: "",
      newOptionValidationError: "",
      searchMatches: false,
    };
  }

  fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      let trimmedName = inputValue.trim();
      let trimmedNameWNoDblSpcs = trimmedName.replace(/  +/g, " ");
      fetch(this.props.url + trimmedNameWNoDblSpcs, {
        method: "GET",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          const tempArray = [];
          if (data.length > 0) {
            this.setState({
              searchMatches: true,
            });
            data.forEach((element) => {
              tempArray.push({
                label: `${element.name}`,
                value: JSON.stringify(element),
              });
            });
          } else {
            let nameLength = trimmedNameWNoDblSpcs.length;
            if (nameLength >= 3 && nameLength <= 255) {
              this.setState({
                searchMatches: false,
                newOptionValidationError: "",
                validNewName: trimmedNameWNoDblSpcs,
              });
            } else {
              this.setState({
                searchMatches: false,
                newOptionValidationError:
                  "Must be between 3 and 255 characters",
                validNewName: "",
              });
            }
          }
          callback(tempArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  onSearchChange = (e) => {
    if (e) {
      this.props.onUpdateProp(
        this.props.objType,
        this.props.dayOfWeekCode,
        this.props.mealTypeCode,
        this.props.objTypeToChange,
        this.props.arrayIndex,
        "asyncReactSelect",
        e.value,
        []
      );
    }
  };
  handleCreate = () => {
    let newIngrdntName = this.state.validNewName;
    let newRecordForState = {
      label: newIngrdntName,
      value: {
        _id: "tempIngredientId1",
        name: newIngrdntName,
        calories: 1,
        carbs: 1,
        protein: 1,
        fat: 1,
        fiber: 1,
        unitOfMeasure: {
          _id: "627691779fa56aa1fe318390",
          name: "",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
        weightType: {
          _id: "627695899fa56aa1fe318396",
          name: "",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
        photoURL: "",
        GRFUser: this.props.thisGRFUser,
        brand: {
          _id: "627691b69fa56aa1fe318393",
          name: "",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
      },
    };
    let newRecordToSave = {
      name: newIngrdntName,
      calories: 1,
      carbs: 1,
      protein: 1,
      fat: 1,
      fiber: 1,
      unitOfMeasure: "627691779fa56aa1fe318390",
      weightType: "627695899fa56aa1fe318396",
      photoURL: "",
      GRFUser: this.props.thisGRFUser._id,
      brand: "627691b69fa56aa1fe318393",
    };
    this.props.onCreateRecord(
      this.props.objTypeToChange,
      this.props.dayOfWeekCode,
      this.props.mealTypeCode,
      this.props.arrayIndex,
      newRecordForState.value,
      newRecordToSave
    );
  };
  clearSearchResOrValErrorInState = () => {
    this.setState({
      searchMatches: false,
      newOptionValidationError: "",
      validNewName: "",
    });
  };
  render() {
    return (
      <div>
        <div
          className="alert alert-danger selectFieldValError"
          hidden={this.state.newOptionValidationError ? false : true}
        >
          {this.state.newOptionValidationError}
        </div>
        <AsyncCreatableSelect
          value={{
            label: this.props.objToSelect.name,
            value: JSON.stringify(this.props.objToSelect),
          }}
          loadOptions={this.fetchData}
          placeholder={this.props.objType}
          onChange={(e) => {
            this.onSearchChange(e);
          }}
          defaultOptions={true}
          isDisabled={this.props.thisFormState === "viewing" ? true : false}
          className={this.props.styleClasses}
          onCreateOption={this.handleCreate}
          allowCreateWhileLoading={false}
          isValidNewOption={(e) => {
            let newIngrdntName = e;
            let trimmedName = newIngrdntName.trim();
            let trimmedNameWNoDblSpcs = trimmedName.replace(/  +/g, " ");
            let nameLength = trimmedNameWNoDblSpcs.length;
            if (nameLength >= 3 && nameLength <= 255) {
              return true;
            } else {
              return false;
            }
          }}
          onBlur={this.clearSearchResOrValErrorInState}
        />
      </div>
    );
  }
}
export default AsyncSearchSelectListWCreate;
