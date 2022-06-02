import React, { Component } from "react";
import AsyncSelect from "react-select/async";

class AsyncSelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchData = (inputValue, callback) => {
    console.log(this.props.url);
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
              });
            } else {
              tempArray.push({
                label: `${data.body}`,
                value: JSON.stringify(data),
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
        "reactSelect",
        e.value,
        []
      );
    }
  };
  render() {
    return (
      <div>
        <AsyncSelect
          value={{
            label: this.props.objToSelect.name,
            value: JSON.stringify(this.props.objToSelect),
          }}
          loadOptions={this.fetchData}
          placeholder={this.props.objType}
          onSearchChange
          onChange={(e) => {
            console.log(e);
            this.onSearchChange(e);
          }}
          defaultOptions={true}
          isDisabled={this.props.thisFormState === "viewing" ? true : false}
          className={this.props.styleClasses}
        />
      </div>
    );
  }
}
export default AsyncSelectList;
