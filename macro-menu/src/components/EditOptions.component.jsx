import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOptions = (props) => {
  const userIsAuthor = props.userIsAuthor;
  const thisFormState = props.thisFormState;
  console.log(props);
  const hideIcon = (icon, userIsAuthor, thisFormState) => {
    if (icon == "copy") {
      if (thisFormState == "viewing") {
        return false;
      } else {
        return true;
      }
    } else if (icon == "edit") {
      if (userIsAuthor == "true") {
        return false;
      } else {
        return true;
      }
    } else if (icon == "cancel" || icon == "save") {
      if (thisFormState == "viewing") {
        return true;
      } else {
        return false;
      }
    } else {
      if (thisFormState == "viewing" || thisFormState == "editingCopy") {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <div className="iconGroup m-1">
      <FontAwesomeIcon
        icon="fa-solid fa-copy"
        size="xl"
        className="p-1"
        hidden={hideIcon("copy", userIsAuthor, thisFormState)}
      />
      <FontAwesomeIcon
        icon="fa-solid fa-pen-to-square"
        size="xl"
        className="p-1"
        hidden={hideIcon("edit", userIsAuthor, thisFormState)}
      />
      <FontAwesomeIcon
        icon="fa-solid fa-circle-xmark"
        size="xl"
        className="p-1"
        hidden={hideIcon("cancel", userIsAuthor, thisFormState)}
      />
      <FontAwesomeIcon
        icon="fa-solid fa-floppy-disk"
        size="xl"
        className="p-1"
        hidden={hideIcon("save", userIsAuthor, thisFormState)}
      />
      <FontAwesomeIcon
        icon="fa-solid fa-trash-can"
        size="xl"
        className="p-1"
        hidden={hideIcon("delete", userIsAuthor, thisFormState)}
      />
    </div>
  );
};

export default EditOptions;
