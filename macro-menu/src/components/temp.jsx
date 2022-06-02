Skip to content
Product 
Team
Enterprise
Explore 
Marketplace
Pricing 
Search
Sign in
Sign up
musmanrafiq
/
reactjs
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
reactjs/react-exercise/src/controls/reactSelectExample.js /
@musmanrafiq
musmanrafiq updates
Latest commit e747d3b on Dec 25, 2020
 History
 1 contributor
99 lines (92 sloc)  2.36 KB
   
import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const options = [
  { value: "islamabad", label: "Islamabad" },
  { value: "lahore", label: "Lahore" },
  { value: "karachi", label: "Karachi" },
];

class ReactSelectExample extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: {},
      normalSelectOption: null,
    };
  }

  fetchData = (inputValue, callback) => {
    setTimeout(() => {
      fetch(
        "https://my-json-server.typicode.com/typicode/demo/comments/" +
          inputValue,
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
                  label: `${element.body}`,
                  value: element.id,
                });
              });
            } else {
              tempArray.push({
                label: `${data.body}`,
                value: data.id,
              });
            }
          }
          callback(tempArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

  onSearchChange = (selectedOption) => {
    if (selectedOption) {
      this.setState({
        selectedOption,
      });
    }
  };
  handleChange = (normalSelectOption) => {
    this.setState({ normalSelectOption });
  };
  render() {
    return (
      <div style={{ marginLeft: "40%", width: "200px" }}>
        <div>
          <p>Local array</p>
          {this.state.normalSelectOption &&
            `Selected Value : ${this.state.normalSelectOption.value}`}

          <Select
            value={this.state.normalSelectOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>

        <div>
          <p>Remote data</p>
          <AsyncSelect
            value={this.state.selectedOption}
            loadOptions={this.fetchData}
            placeholder="Admin Name"
            onChange={(e) => {
              this.onSearchChange(e);
            }}
            defaultOptions={true}
          />
        </div>
      </div>
    );
  }
}

export default ReactSelectExample;
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete