import React, { Component } from "react";
import { Link } from "react-router-dom";

const WeekMealPlan = (props) => {
  const thisWeekMealPlan = props.thisWeekMealPlan;
  return (
    <tr>
      <td>{thisWeekMealPlan._id}</td>
      <td>{thisWeekMealPlan.name}</td>
      <td>{thisWeekMealPlan.GRFUser}</td>
      <td>{thisWeekMealPlan.createdAt}</td>
      <td>{thisWeekMealPlan.updatedAt}</td>
      <td>
        <Link
          to={`weekMealPlan/edit/${thisWeekMealPlan._id}`}
          state={{ from: "/thisWeekMealPlan._id" }}
        >
          Edit
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          href="#"
          // onClick={() => {
          //   this.deleteWeekMealPlan(this.state.id);
          // }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};
export default WeekMealPlan;
