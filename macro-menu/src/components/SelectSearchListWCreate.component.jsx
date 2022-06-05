import React, { Component } from "react";
import Creatable from "react-select/creatable";

class SelectSearchListWCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
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
    let newRecipeName = e;
    let newRecordForState = {
      label: newRecipeName,
      value: {
        _id: "tempRecipeId1",
        name: newRecipeName,
        availableMealType: this.props.mealType,
        GRFUser: this.props.thisGRFUser,
        defaultPrepInstructions: "",
        photoURL: "",
      },
    };
    let newRecordToSave = {
      name: newRecipeName,
      availableMealType: this.props.mealType._id,
      GRFUser: this.props.thisGRFUser._id,
      defaultPrepInstructions: "",
      photoURL: "",
    };
    this.props.onCreateRecord(
      this.props.objTypeToChange,
      this.props.dayOfWeekCode,
      this.props.mealType.code,
      this.props.arrayIndex,
      newRecordForState.value,
      newRecordToSave
    );
  };
  render() {
    return (
      <div>
        <Creatable
          value={{
            label: this.props.objToSelect.name,
            value: this.props.objToSelect._id,
          }}
          options={this.state.options}
          placeholder="Select Recipe"
          isSearchable={true}
          onChange={(e) => {
            this.handleChange(e);
          }}
          isDisabled={this.props.thisFormState === "viewing" ? true : false}
          className={this.props.styleClasses}
          onCreateOption={(e) => this.handleCreate(e)}
        />
      </div>
    );
  }
}
export default SelectSearchListWCreate;
