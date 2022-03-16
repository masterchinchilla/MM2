import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOptions = (props) => {
  // console.log(props);
  const parentObj = props.parentObj;
  const userIsAuthor = props.userIsAuthor;
  const thisFormState = props.thisFormState;
  const thisReference = props.thisReference;
  const thisId = props.thisId;
  const onSubmitFormChange = props.onSubmitFormChange;
  const onClickCopy = props.onClickCopy;
  const onClickEdit = props.onClickEdit;
  const onCancel = props.onCancel;
  const onDeleteDay = props.onDeleteDay;
  const hideIcon = (icon, userIsAuthor, thisFormState) => {
    let iconHidden = false;
    switch (icon) {
      case "copy":
        if (thisFormState == "editingCopy" || thisFormState == "creating") {
          iconHidden = true;
        } else {
          iconHidden = false;
        }
        break;
      case "edit":
        if (userIsAuthor == true && thisFormState == "viewing") {
          iconHidden = false;
        } else {
          iconHidden = true;
        }
        break;
      case "cancel":
        if (thisFormState == "viewing") {
          iconHidden = true;
        } else {
          iconHidden = false;
        }
        break;
      case "save":
        if (parentObj == "Day") {
          iconHidden = true;
        } else {
          if (thisFormState == "viewing") {
            iconHidden = true;
          } else {
            iconHidden = false;
          }
          return;
        }
        break;
      case "delete":
        if (thisFormState == "editingOrig") {
          iconHidden = false;
        } else {
          iconHidden = true;
        }
    }
    return iconHidden;
  };
  return (
    <div className="iconGroup m-1">
      <button type="button" onClick={onClickCopy} className="iconBttn">
        <FontAwesomeIcon
          icon="fa-solid fa-copy"
          size="xl"
          className="p-1"
          hidden={hideIcon("copy", userIsAuthor, thisFormState)}
        />
      </button>
      <button type="button" onClick={onClickEdit} className="iconBttn">
        <FontAwesomeIcon
          icon="fa-solid fa-pen-to-square"
          size="xl"
          className="p-1"
          hidden={hideIcon("edit", userIsAuthor, thisFormState)}
        />
      </button>
      <button type="button" onClick={onCancel} className="iconBttn">
        <FontAwesomeIcon
          icon="fa-solid fa-circle-xmark"
          size="xl"
          className="p-1"
          hidden={hideIcon("cancel", userIsAuthor, thisFormState)}
        />
      </button>
      <button
        type="submit"
        value="submit"
        // className="btn btn-warning m-3"
        // style={{ color: "white" }}
        onClick={onSubmitFormChange}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-floppy-disk"
          size="xl"
          className="p-1"
          hidden={hideIcon("save", userIsAuthor, thisFormState)}
        />
      </button>
      <button type="button" onClick={onDeleteDay(thisId)} className="iconBttn">
        <FontAwesomeIcon
          icon="fa-solid fa-trash-can"
          size="xl"
          className="p-1"
          hidden={hideIcon("delete", userIsAuthor, thisFormState)}
        />
      </button>
    </div>
  );
};

export default EditOptions;
