import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

const Day = (props) => {
  const thisDay = props.thisDay;
  const formatedCreatedAtDate = dayjs(thisDay.createdAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  const formatedUpdatedAtDate = dayjs(thisDay.updatedAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  return (
    <tr>
      <td>{thisDay._id}</td>
      <td>{thisDay.dayOfWeek}</td>
      <td>
        <Link
          to={{
            pathname: "/weekMealPlans/edit/" + thisDay.weekMealPlan._id,
          }}
        >
          {thisDay.weekMealPlan.name}
        </Link>
      </td>
      <td>{thisDay.name}</td>
      <td>{formatedCreatedAtDate}</td>
      <td>{formatedUpdatedAtDate}</td>
      <td>
        <Link
          to={{
            pathname: "days/edit/" + thisDay._id,
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
            props.onDeleteDay(thisDay._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default Day;
