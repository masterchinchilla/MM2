import React, { Component } from "react";
class CreateMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMeal: this.props.thisMeal,
    };
  }
  render() {
    return <h5>Create Meal</h5>;
  }
}

export default CreateMeal;
