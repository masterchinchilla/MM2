import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const GRFUser = (props) => {
  const thisGRFUser = props.thisGRFUser;
  const formatedCreatedAtDate = dayjs(thisGRFUser.createdAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  const formatedUpdatedAtDate = dayjs(thisGRFUser.updatedAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  return (
    <tr>
      <td>{thisGRFUser._id}</td>
      <td>{thisGRFUser.namePrefix}</td>
      <td>{thisGRFUser.givenName}</td>
      <td>{thisGRFUser.middleName}</td>
      <td>{thisGRFUser.familyName}</td>
      <td>{thisGRFUser.nameSuffix}</td>
      <td>{thisGRFUser.email}</td>
      <td>{thisGRFUser.password}</td>
      <td>{thisGRFUser.handle}</td>
      <td>{thisGRFUser.certURL}</td>
      <td>{thisGRFUser.certName}</td>
      <td>{formatedCreatedAtDate}</td>
      <td>{formatedUpdatedAtDate}</td>
      <td>
        <Link
          to={{
            pathname: "/grfusers/edit/" + thisGRFUser._id,
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
            props.onDeleteGRFUser(thisGRFUser._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default GRFUser;
