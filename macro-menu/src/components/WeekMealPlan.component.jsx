import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

const WeekMealPlan = (props) => {
  const thisWeekMealPlan = props.thisWeekMealPlan;
  // const onDeleteWeekMealPlan = props.onDeleteWeekMealPlan;
  return (
    <tr>
      <td>{thisWeekMealPlan._id}</td>
      <td>{thisWeekMealPlan.name}</td>
      <td>{thisWeekMealPlan.GRFUser.handle}</td>
      <td>{thisWeekMealPlan.createdAt}</td>
      <td>{thisWeekMealPlan.updatedAt}</td>
      <td>
        <Link
          to={{
            pathname: "/edit/" + thisWeekMealPlan._id,
          }}
        >
          <button type="button" className="btn btn-primary" href="#">
            edit
          </button>
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          href="#"
          onClick={() => {
            console.log(props);
            props.onDeleteWeekMealPlan(thisWeekMealPlan._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default WeekMealPlan;
