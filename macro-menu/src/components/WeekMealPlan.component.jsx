import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

const WeekMealPlan = (props) => {
  const thisWeekMealPlan = props.thisWeekMealPlan;
  const formatedCreatedAtDate = dayjs(thisWeekMealPlan.createdAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  const formatedUpdatedAtDate = dayjs(thisWeekMealPlan.updatedAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  return (
    <tr>
      <td>{thisWeekMealPlan._id}</td>
      <td>{thisWeekMealPlan.name}</td>
      <td>
        <Link
          to={{
            pathname: "/grfusers/edit/" + thisWeekMealPlan.GRFUser._id,
          }}
        >
          {thisWeekMealPlan.GRFUser.handle}
        </Link>
      </td>
      <td>{formatedCreatedAtDate}</td>
      <td>{formatedUpdatedAtDate}</td>
      <td>
        <Link
          to={{
            pathname: "/weekMealPlans/edit/" + thisWeekMealPlan._id,
          }}
        >
          <button type="button" className="btn btn-primary" href="#">
            edit
          </button>
        </Link>
        <Link
          to={{
            pathname: "/weekmealplan/admin/" + thisWeekMealPlan._id,
          }}
        >
          <button type="button" className="btn btn-primary" href="#">
            edit admin
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
