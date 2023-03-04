import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
// import { csValidateObj } from "../services/validationService";
import CustomHeading from "./CustomHeading.component";
import NewInputCore from "./NewInputCore.component";

const NewLogin = (props) => {
  const {
    parseAndUpdateObjValErrsFn,
    decodeToken,
    getRndIntegerFn,
    returnElementKey,
    trimEnteredValueFn,
    closeNavOnClick,
  } = props;
  const [email, updateEmailStateFn] = useState("");
  const [password, updatePasswordStateFn] = useState("");
  const [showPassword, toggleShowPasswordStateFn] = useState(false);
  const [emailValErrs, updateEmailValErrsStateFn] = useState([]);
  const [passwordValErrs, updatePasswordValErrsStateFn] = useState([]);
  //   async function handleValLogin() {
  //     const csValResult = await csValidateObj("GRFUser", {
  //       email: email,
  //       password: password,
  //     });
  //     return updateThisObjsValErrs({ email: [], password: [] }, csValResult);
  //   }
  function updateStateWValErrs(thisObjsValErrsObj) {
    const emailErrs = thisObjsValErrsObj.email;
    const passwordErrs = thisObjsValErrsObj.password;
    if (emailErrs.length > 0) {
      updateEmailValErrsStateFn(emailErrs);
    }
    if (passwordErrs.length > 0) {
      updatePasswordValErrsStateFn(passwordErrs);
    }
    return emailErrs.length < 1 && passwordErrs.length < 1;
  }
  async function handleSubmitFn(e) {
    e.preventDefault();
    // const thisObjsValErrsObj = await handleValLogin();
    // const valIsOk = updateStateWValErrs(thisObjsValErrsObj);
    // if (valIsOk) {
    try {
      const token = await login(email, password);
      decodeToken(token);
    } catch (errs) {
      let thisObjsValErrsObj;
      thisObjsValErrsObj = parseAndUpdateObjValErrsFn(errs, thisObjsValErrsObj);
      //     const valErrors = parseHTTPResErrs(errs);
      //   const thisObjsValErrsObj = updateThisObjsValErrs(
      //     { email: [], password: [] },
      //     valErrors
      //   );
      updateStateWValErrs(thisObjsValErrsObj);
    }
    // }
  }
  function handleUpdatePropFn(
    propToUpdate,
    trimmedWNoDblSpcs,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) {
    if (propToUpdate === "email") {
      updateEmailStateFn(trimmedWNoDblSpcs);
      updateEmailValErrsStateFn([]);
    } else {
      updatePasswordStateFn(trimmedWNoDblSpcs);
      updatePasswordValErrsStateFn([]);
    }
  }
  const typeOfRecordToChange = "Login";
  const recordLoaded = true;
  const editingForm = true;
  const arrayIndex = null;
  const thisMealTypeCode = "";
  const thisDayOfWeekCode = "";
  const fieldsDisabled = false;
  function inputOnKeyUpFn() {}
  return (
    <div className="pageContent" onClick={() => closeNavOnClick("outside")}>
      <div className="card m-5 loginCard">
        <div className="card-header">
          <CustomHeading
            key={`customCarddHeadingFor${typeOfRecordToChange}`}
            headingLvl={3}
            recordLoaded={recordLoaded}
            headingText={"Login"}
            hdngIsReqFormLbl={false}
            editingForm={editingForm}
            headingClasses="card-title"
          />
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmitFn}>
            <NewInputCore
              key={returnElementKey(
                null,
                "NewInputCore",
                "email",
                typeOfRecordToChange,
                arrayIndex,
                thisMealTypeCode,
                thisDayOfWeekCode
              )}
              commonProps={{
                commonData: {},
                commonMethods: {
                  getRndIntegerFn: getRndIntegerFn,
                  returnElementKey: returnElementKey,
                  onUpdatePropFn: handleUpdatePropFn,
                  trimEnteredValueFn: trimEnteredValueFn,
                },
              }}
              specificProps={{
                specificData: {
                  typeOfRecordToChange: typeOfRecordToChange,
                  formGroupClasses: "form-group",
                  label: "Email",
                  thisDayOfWeekCode: thisDayOfWeekCode,
                  thisMealTypeCode: thisMealTypeCode,
                  propToUpdate: "email",
                  arrayIndex: arrayIndex,
                  fieldDisabled: fieldsDisabled,
                  valErrors: emailValErrs,
                  inputClasses: "form-control",
                  isRequired: true,
                  recordLoaded: recordLoaded,
                  excludeLabel: false,
                  inputTypeForHtml: "email",
                  propValue: email,
                },
                specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
              }}
            />
            <NewInputCore
              key={returnElementKey(
                null,
                "NewInputCore",
                "password",
                typeOfRecordToChange,
                arrayIndex,
                thisMealTypeCode,
                thisDayOfWeekCode
              )}
              commonProps={{
                commonData: {},
                commonMethods: {
                  getRndIntegerFn: getRndIntegerFn,
                  returnElementKey: returnElementKey,
                  onUpdatePropFn: handleUpdatePropFn,
                  trimEnteredValueFn: trimEnteredValueFn,
                },
              }}
              specificProps={{
                specificData: {
                  typeOfRecordToChange: typeOfRecordToChange,
                  formGroupClasses: "form-group",
                  label: "Password",
                  thisDayOfWeekCode: thisDayOfWeekCode,
                  thisMealTypeCode: thisMealTypeCode,
                  propToUpdate: "password",
                  arrayIndex: arrayIndex,
                  fieldDisabled: fieldsDisabled,
                  valErrors: passwordValErrs,
                  inputClasses: "form-control",
                  isRequired: true,
                  recordLoaded: recordLoaded,
                  excludeLabel: false,
                  inputTypeForHtml: showPassword ? "text" : "password",
                  propValue: password,
                },
                specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
              }}
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={showPassword}
                id="flexCheckDefault"
                onChange={toggleShowPasswordStateFn}
                checked={showPassword}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password?
              </label>
            </div>
            <div className="form-group submitBttnWRightErrs">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary loginSubmit"
                disabled={
                  email !== "" &&
                  password !== "" &&
                  emailValErrs.length < 1 &&
                  passwordValErrs.length < 1
                    ? false
                    : true
                }
              />
            </div>
            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="createOrEditUser/true">Register Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
