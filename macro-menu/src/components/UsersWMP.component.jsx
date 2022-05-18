import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const UsersWMP = (props) => {
  const thisWMP = props.thisWMP;
  const formatedCreatedAtDate = dayjs(thisWMP.createdAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  const formatedUpdatedAtDate = dayjs(thisWMP.updatedAt).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  return (
    <tr>
      <td>
        <Link
          to={{
            pathname: "/edit/" + thisWMP._id,
          }}
        >
          <button type="button" className="btn btn-primary" href="#">
            view
          </button>
        </Link>
        <Link
          to={{
            pathname: "/edit2/" + thisWMP._id,
          }}
        >
          <button type="button" className="btn btn-primary" href="#">
            view
          </button>
        </Link>
      </td>
      <td>{thisWMP.name}</td>
      <td>{thisWMP.GRFUser.handle}</td>
      <td>{formatedCreatedAtDate}</td>
      <td>{formatedUpdatedAtDate}</td>
      <td>{thisWMP._id}</td>
    </tr>
  );
};

export default UsersWMP;
