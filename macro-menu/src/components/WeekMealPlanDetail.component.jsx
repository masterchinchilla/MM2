import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Day from "./Day.component";
import DayDetail from "./DayDetail.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import CreateDay from "./CreateDay.component";

export default class WeekMealPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGRFUser = this.onChangeGRFUser.bind(this);
    // this.assignDays = this.assignDays.bind(this);
    // this.renderDay = this.renderDay.bind(this);
    // this.renderEmptyDay = this.renderEmptyDay.bind(this);
    this.handleSubmitFormChange = this.handleSubmitFormChange.bind(this);
    this.handleClickCopy = this.handleClickCopy.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDeleteDay = this.handleDeleteDay.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    // this.daysList = this.daysList.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    const lifeCycleStages = [
      "viewing",
      "editingOrig",
      "editingCopy",
      "creating",
    ];

    this.state = {
      id: "",
      name: "",
      GRFUsers: [],
      GRFUser: "",
      thisWeeksDays: [],
      thisFormState: "viewing",
      userIsAuthor: true,
      sun: undefined,
      mon: undefined,
      tues: undefined,
      wed: undefined,
      thurs: undefined,
      fri: undefined,
      sat: undefined,
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          GRFUser: response.data.GRFUser,
        });
      });
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          GRFUsers: response.data.map((GRFUser) => GRFUser),
        });
      }
    });
    axios
      .get(
        "http://localhost:5000/days/daysofthiswmp/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          thisWeeksDays: response.data.map((day) => day),
          sun: response.data.filter((day) => day.dayOfWeek == "Sunday")[0],
          mon: response.data.filter((day) => day.dayOfWeek == "Monday")[0],
          tues: response.data.filter((day) => day.dayOfWeek == "Tuesday")[0],
          wed: response.data.filter((day) => day.dayOfWeek == "Wednesday")[0],
          thurs: response.data.filter((day) => day.dayOfWeek == "Thursday")[0],
          fri: response.data.filter((day) => day.dayOfWeek == "Friday")[0],
          sat: response.data.filter((day) => day.dayOfWeek == "Saturday")[0],
        });
      });
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeGRFUser = (e) => {
    this.setState({
      GRFUser: e.target.value,
    });
  };
  handleSubmitFormChange = () => {
    // e.preventDefault();
    const weekMealPlan = {
      id: this.state.id,
      name: this.state.name,
      GRFUser: this.state.GRFUser,
    };
    axios
      .post(
        "http://localhost:5000/weekMealPlans/update/" + weekMealPlan.id,
        weekMealPlan
      )
      .then(console.log("updated"));
    // .then((window.location = "/edit/" + weekMealPlan.id));
  };
  handleClickCopy = () => {
    console.log("Clicked Copy");
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
  };
  handleDelete = () => {
    console.log("Clicked Delete");
  };
  update = () => {
    this.forceUpdate();
  };
  handleDeleteDay = (id, day) => {
    axios
      .delete("http://localhost:5000/days/" + id)
      .then((response) => console.log(response.data))
      .then((window.location = "/edit/" + this.state.id));
  };
  handleCreate = () => {
    console.log("Clicked Create");
  };
  // handleUpdateWeekDays = (newDay, dayOfWeekShort) => {
  //   this.setState({ dayOfWeekShort: newDay });
  // };
  rerenderParentCallback = () => {
    this.forceUpdate();
    console.log("rerender function was called.");
  };
  // daysList = () => {
  //   return this.state.thisWeeksDays.map((e) => {
  //     return (
  //       <DayDetail
  //         thisDay={e}
  //         onDeleteDay={this.handleDeleteDay}
  //         key={e._id}
  //         onSubmitFormChange={this.handleSubmitFormChange}
  //         onClickCopy={this.handleClickCopy}
  //         onClickEdit={this.handleClickEdit}
  //         onCancel={this.handleCancel}
  //         onDelete={this.handleDelete}
  //       />
  //     );
  //   });
  // };
  // assignDays = () => {
  //   let daysCount;
  //   const daysList = this.state.thisWeeksDays;
  //   for (daysCount = 0; daysCount < daysList.length; daysCount++) {
  //     const thisDay = daysList[daysCount];
  //     switch (thisDay.dayOfWeek) {
  //       case "Sunday":
  //         this.setState({ sun: thisDay });
  //         break;
  //       case "Monday":
  //         this.setState({ mon: thisDay });
  //         break;
  //       case "Tuesday":
  //         this.setState({ tues: thisDay });
  //         break;
  //       case "Wednesday":
  //         this.setState({ wed: thisDay });
  //         break;
  //       case "Thursday":
  //         this.setState({ thurs: thisDay });
  //         break;
  //       case "Friday":
  //         this.setState({ fri: thisDay });
  //         break;
  //       case "Saturday":
  //         this.setState({ sat: thisDay });
  //         break;
  //     }
  //   }
  // };
  // renderEmptyDay = (dayToRender, dayOfWeek) => {
  //   return (
  //     <div>
  //       <button
  //         type="button"
  //         className="button button-primary"
  //         onClick={this.handleCreate}
  //       >
  //         <FontAwesomeIcon
  //           icon="fa-solid fa-circle-plus"
  //           size="xl"
  //           className="p-1"
  //           dayOfWeek={dayOfWeek}
  //         />
  //         Add New
  //       </button>
  //     </div>
  //   );
  // };
  renderDay = (dayToRender, dayOfWeek, dayOfWeekShort) => {
    if (dayToRender === undefined) {
      return (
        <CreateDay
          weekMealPlanId={this.state.id}
          weekMealPlanName={this.state.name}
          dayOfWeek={dayOfWeek}
          dayOfWeekShort={dayOfWeekShort}
          thisFormState="missing"
          rerenderParentCallback={this.rerenderParentCallback}
        />
      );
    } else {
      return (
        console.log(dayToRender),
        (
          <DayDetail
            thisDay={dayToRender}
            // onDelete={this.handleDelete}
            key={dayToRender._id}
            // onSubmitFormChange={this.handleSubmitFormChange}
            // onClickCopy={this.handleClickCopy}
            // onClickEdit={this.handleClickEdit}
            // onCancel={this.handleCancel}
            onDeleteDay={this.handleDeleteDay}
          />
        )
      );
    }
  };
  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <h1>Week Meal Plan Detail</h1>
        <form>
          <div className="form-group">
            <label>Plan Name</label>
            <div className="inputRowWRightIcons">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                disabled={this.state.thisFormState == "viewing" ? true : false}
              />
              <EditOptions
                parentObj={"WMP"}
                userIsAuthor={this.state.userIsAuthor}
                thisFormState={this.state.thisFormState}
                onSubmitFormChange={this.handleSubmitFormChange}
                onClickCopy={this.handleClickCopy}
                onClickEdit={this.handleClickEdit}
                onCancel={this.handleCancel}
              />
            </div>
          </div>
          <div hidden={true} className="form-group mt-2">
            <label>Author: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.GRFUser.handle}
              onChange={this.onChangeGRFUser}
            >
              {this.state.GRFUsers.map(function (GRFUser) {
                return (
                  <option key={GRFUser._id} value={GRFUser._id}>
                    {GRFUser.handle}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="form-group mt-2 mb-4">
            <Link
              to={{
                pathname: "/",
              }}
            >
              <button type="button" className="btn btn-primary" href="#">
                &lt;&nbsp;go back
              </button>
            </Link>
            <input
              type="submit"
              value="save changes"
              className="btn btn-warning m-3"
              style={{ color: "white" }}
            />
          </div> */}
        </form>
        {/* <table className="table table-light">
          <thead className="thead thead-light">
            <tr>
              <th scope="col">Record ID</th>
              <th scope="col">Day of Week</th>
              <th scope="col">Week Meal Plan Day is part of</th>
              <th scope="col">Created</th>
              <th scope="col">Last Update</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table> */}
        {/* <div>{this.daysList()}</div> */}
        <div>
          {this.renderDay(this.state.sun, "Sunday", "sun")}
          {this.renderDay(this.state.mon, "Monday", "mon")}
          {this.renderDay(this.state.tues, "Tuesday", "tues")}
          {this.renderDay(this.state.wed, "Wednesday", "wed")}
          {this.renderDay(this.state.thurs, "Thursday", "thurs")}
          {this.renderDay(this.state.fri, "Friday", "fri")}
          {this.renderDay(this.state.sat, "Saturday", "sat")}
        </div>
      </div>
    );
  }
}
