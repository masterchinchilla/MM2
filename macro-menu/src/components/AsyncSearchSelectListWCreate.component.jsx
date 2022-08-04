import React, { Component } from "react";
// import AsyncSelect from "react-select/async";
// import { ActionMeta, OnChangeValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

class AsyncSearchSelectListWCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {},
    };
  }

  fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      fetch(
        this.props.url + inputValue,
        // "http://localhost:5000/ingredients/ingredientsByName/" + inputValue,
        {
          method: "GET",
        }
      )
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          const tempArray = [];
          if (data) {
            if (data.length) {
              data.forEach((element) => {
                tempArray.push({
                  label: `${element.name}`,
                  value: JSON.stringify(element),
                });
                // if (this.state.newItem !== {}) {
                //   let newItem = this.state.newItem;
                //   tempArray.push({
                //     label: `${newItem.name}`,
                //     value: JSON.stringify(newItem),
                //   });
                // }
              });
            }
            // else {
            //   tempArray.push({
            //     label: "No Match...",
            //     value: {},
            //   });
            // }
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
  handleCreate = (e) => {
    let newIngrdntName = e;
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
  render() {
    return (
      <div>
        <AsyncCreatableSelect
          value={{
            label: this.props.objToSelect.name,
            value: JSON.stringify(this.props.objToSelect),
          }}
          loadOptions={this.fetchData}
          placeholder={this.props.objType}
          onSearchChange
          onChange={(e) => {
            this.onSearchChange(e);
          }}
          defaultOptions={true}
          isDisabled={this.props.thisFormState === "viewing" ? true : false}
          className={this.props.styleClasses}
          onCreateOption={(e) => this.handleCreate(e)}
          allowCreateWhileLoading={false}
        />
      </div>
    );
  }
}
export default AsyncSearchSelectListWCreate;
