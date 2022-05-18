import React, { useState, Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";

const GenRecipe = (props) => {
  const [hideDeleteBarrier, toggleHideDeleteBarrier] = useState(true);
  const [recordChanged, toggleRecordChanged] = useState(false);
  const mealStateObj = props.mealStateObj;
  const thisMeal = mealStateObj.thisMeal;
  const thisObj = thisMeal.genRecipe;
  const thisRecipesIngrdnts = mealStateObj.thisRecipesIngrdnts;
  // const thisFormState = mealStateObj.thisGenRecipeFormState;
  const thisFormState = "editingOrig";
  // const userType = mealStateObj.thisGenRecipeUserType;
  const userType = "admin";
  const handleSubmitFormChange = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/genRecipes/update/" + thisObj._id, thisObj)
      .then(
        // console.log("/weekMealPlans/" + thisMeal.thisMeal.day.weekMealPlan._id)
        (window.location = "/edit/" + thisMeal.day.weekMealPlan._id)
      );
  };
  const handleClickDelete = (thisObj, stateObj) => {
    if (thisRecipesIngrdnts.length === 0) {
      hideDeleteBarrier(false);
    } else {
      handleDeleteGenRecipe();
    }
  };
  const handleDeleteGenRecipe = () => {
    console.log("Base Recipe Deleted");
  };
  const deleteMsg = "Are you sure you want to delete this Base Recipe?";
  return (
    <React.Fragment>
      <div className="deleteWarning" hidden={hideDeleteBarrier}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteMealWarnLabel">
                Cannot Delete Base Recipe with Ingredients
              </h5>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">
                Delete all recipe ingredients before attempting to delete the
                base recipe record
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  hideDeleteBarrier(true);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <form className="card mt-3 mb-3" onSubmit={handleSubmitFormChange}>
        <div className="card-header mealCardHeader">
          <div className="mealGenRecipeSctnHdr">
            <h5 className="formSctnTitle">Recipe Details</h5>
            <EditOptions
              parentObj={thisObj}
              stateObj={"genRecipe"}
              thisFormState={thisFormState}
              userType={userType}
              onClickEditForm={props.onClickEditForm}
              onCancelEditForm={props.onCancelEditForm}
              onSaveFormChanges={props.onSaveFormChanges}
              // onDeleteRecord={props.onDeleteRecord}
              onDelete={handleClickDelete}
              deleteMsg={deleteMsg}
            />
          </div>
        </div>
        <div className="card-body mealCardBody">
          <div className="mealImgNTblRow">
            <div
              className="mealImg"
              style={
                thisObj.photoURL === undefined
                  ? {
                      backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                    }
                  : {
                      backgroundImage: `url(${thisObj.photoURL})`,
                    }
              }
            />
            <h6 className="mealPrepInst">Prep Instructions:</h6>
            <textarea
              className="form-control mealTextArea"
              disabled={thisFormState === "viewing" ? true : false}
              onChange={(e) =>
                props.updateProp(
                  "genRecipe",
                  thisMeal.mealType.code,
                  "defaultPrepInstructions",
                  0,
                  "textArea",
                  e
                )
              }
              value={thisObj.defaultPrepInstructions}
            ></textarea>
          </div>
          <div
            className="accordion accordion-flush"
            id={"mealInnerAccordionFull" + thisObj._id}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"mealInnerAccordionHeader" + thisObj._id}
              >
                <button
                  className="accordion-button collapsed mealInnerAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#mealInnerAccrdn" + thisObj._id}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"mealInnerAccrdn" + thisObj._id}
              className="accordion-collapse collapse"
              aria-labelledby={"#mealInnerAccordionHeader" + thisObj._id}
              data-bs-parent={"#mealInnerAccordionFull" + thisObj._id}
            >
              <div className="accordion-body mealInnerAccordion">
                <div className="form-group mealInputs">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={thisFormState === "viewing" ? true : false}
                    value={thisObj.name}
                    onChange={(e) =>
                      props.updateProp(
                        "genRecipe",
                        thisMeal.mealType.code,
                        "name",
                        0,
                        "text",
                        e
                      )
                    }
                  />
                </div>
                <div className="form-group mealInputs">
                  <label>Img URL</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={thisFormState === "viewing" ? true : false}
                    onChange={(e) =>
                      props.updateProp(
                        "genRecipe",
                        thisMeal.mealType.code,
                        "photoURL",
                        0,
                        "text",
                        e
                      )
                    }
                    value={
                      thisObj.photoURL === undefined ? "" : thisObj.photoURL
                    }
                  />
                </div>
                <div className="form-group mealInputs">
                  <label>Author</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    onChange={() =>
                      console.log(
                        "This is not a real input, it just Display's the author, real input is a select drop-down in the admin menu."
                      )
                    }
                    value={thisObj.GRFUser.handle}
                  />
                </div>
              </div>
              <div
                className="accordion accordion-flush"
                id={"genRecipeAdminAccordionFull" + thisObj._id}
              >
                <div className="accordion-item genRecipeAdminMenuBttn">
                  <h2
                    className="accordion-header"
                    id={"genRecipeAdminAccordionHeader" + thisObj._id}
                  >
                    <button
                      className="accordion-button collapsed mealAdminAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#genRecipeAdminAccrdn" + thisObj._id}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      disabled={userType == "admin" ? false : true}
                    >
                      {userType === "admin" ? (
                        <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                      )}{" "}
                    </button>
                  </h2>
                </div>
                <div
                  id={"genRecipeAdminAccrdn" + thisObj._id}
                  className="accordion-collapse collapse"
                  aria-labelledby={
                    "#genRecipeAdminAccordionHeader" + thisObj._id
                  }
                  data-bs-parent={"#genRecipeAdminAccordionFull" + thisObj._id}
                >
                  <div className="accordion-body mealInnerAccordion">
                    <div className="form-group mealInputs">
                      <label>Meal Type</label>
                      <select
                        required
                        className="form-control form-select"
                        value={JSON.stringify(thisObj.availableMealType)}
                        disabled={thisFormState == "viewing" ? true : false}
                        onChange={(e) =>
                          props.updateProp(
                            "genRecipe",
                            thisMeal.mealType.code,
                            "availableMealType",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.mealTypes.map(function (mealType) {
                          return (
                            <option
                              key={"allMealTypesListItem" + mealType._id}
                              value={JSON.stringify(mealType)}
                            >
                              {mealType.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mealInputs">
                      <label>Author</label>
                      <select
                        required
                        className="form-control form-select"
                        value={JSON.stringify(thisObj.GRFUser)}
                        disabled={thisFormState == "viewing" ? true : false}
                        onChange={(e) =>
                          props.updateProp(
                            "genRecipe",
                            thisMeal.mealType.code,
                            "GRFUser",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.allGRFUsers.map(function (GRFUser) {
                          return (
                            <option
                              key={"allGRFUsersListItem" + GRFUser._id}
                              value={JSON.stringify(GRFUser)}
                            >
                              {GRFUser.handle}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mealInputs">
                      <label>Record ID</label>
                      <input
                        className="form-control"
                        type="text"
                        value={thisObj._id}
                        disabled={true}
                        onChange={() => {
                          console.log("This just displays the ID in a field.");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default GenRecipe;
