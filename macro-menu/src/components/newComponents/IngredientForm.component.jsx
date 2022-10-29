import React, { useState, useEffect } from "react";
const IngredientForm = (props) => {
  const { getRndIntegerFn } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          genRecipeIngredient: {
            ingredient: {
              _id: null,
              photoURL: "",
            },
          },
        },
        justCreated: { ingredient: false },
        recordLoaded: false,
      };
  const { thisRecord, justCreated } = thisStateObj;
  const { genRecipeIngredient } = thisRecord;
  const { _id, photoURL } = thisRecord.genRecipeIngredient.ingredient;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  return (
    <form
      className={
        justCreated.ingredient
          ? "ingrdntFrm subCardHeaderFocused"
          : "ingrdntFrm"
      }
    >
      <div className="ingrdntFrmHdr">
        <h6 className="ingrdntHdr">Base Ingredient</h6>
        <div
          className="ingrdntPicDiv"
          style={
            !photoURL
              ? {
                  backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                }
              : {
                  backgroundImage: `url(${photoURL})`,
                }
          }
        ></div>
      </div>
      <div
        className="accordion accordion-flush"
        id={"ingrdntAccrdnFull" + thisRecordId}
      >
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"ingrdntAccrdnHdr" + thisRecordId}
          >
            <button
              className={
                justCreated.ingredient
                  ? "accordion-button mealInnerAccrdnBttn open"
                  : "accordion-button mealInnerAccrdnBttn collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#ingrdntAccrdnBdy" + thisRecordId}
            ></button>
          </h2>
        </div>
        <div
          id={"ingrdntAccrdnBdy" + thisRecordId}
          className={
            justCreated.ingredient
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#ingrdntAccrdnHdr" + thisRecordId}
          data-bs-parent={"#ingrdntAccrdnFull" + thisRecordId}
        >
          <div className="accordion-body ingrdntInnrAccrdn"></div>
          <div
            className="accordion accordion-flush ingrdntAdminMenu"
            id={"ingrdntAdminMenuAccrdnFull" + thisRecordId}
          >
            <div className="accordion-item genRecipeAdminMenuBttn">
              <h2
                className="accordion-header"
                id={"ingrdntAdminMenuAccrdnHdr" + thisRecordId}
              >
                <button
                  className="accordion-button collapsed mealAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#ingrdntAdminMenuAccrdnBdy" + thisRecordId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"ingrdntAdminMenuAccrdnBdy" + thisRecordId}
              className="accordion-collapse collapse"
              aria-labelledby={"#ingrdntAdminMenuAccrdnHdr" + thisRecordId}
              data-bs-parent={"#ingrdntAdminMenuAccrdnFull" + thisRecordId}
            >
              <div className="accordion-body ingrdntInnerAccrdn"></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default IngredientForm;
