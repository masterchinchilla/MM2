import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewInputCore from "./NewInputCore.component";
const typeOfRecordToChange = "GRFUser";
const arrayIndex = null;
const thisMealTypeCode = "";
const thisDayOfWeekCode = "";
const pWordHasCapLetterPattern = /[A-Z]/;
const pWordHasLCaseLetterPattern = /[a-z]/;
const pWordHasNumPattern = /\d/;
const pWordHasSpCharPattern = /[^\w\s]/;
const CreateEditPassword = (props) => {
  const {
    password,
    fieldsDisabled,
    valErrors,
    recordLoaded,
    onUpdatePWordFn,
    trimEnteredValueFn,
    getRndIntegerFn,
    returnElementKey,
    inputOnKeyUpFn,
  } = props;
  const [showPassword, toggleShowPWordStateFn] = useState(false);
  const [pWordHasCapLetter, togglePWordHasCapLetterStateFn] = useState(false);
  const [pWordHasLCaseLetter, togglePWordHasLCaseLetterStateFn] =
    useState(false);
  const [pWordHasNum, togglePWordHasNumStateFn] = useState(false);
  const [pWordHasSpChar, togglePWordHasSpCharStateFn] = useState(false);
  const [pWordLengthOk, togglePWordLengthOkStateFn] = useState(false);
  const handleChangePasswordFn = (
    propToUpdate,
    typedPWord,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    const localPWordHasCapLetter = pWordHasCapLetterPattern.test(typedPWord);
    console.log(localPWordHasCapLetter);
    togglePWordHasCapLetterStateFn(localPWordHasCapLetter);
    const localPWordHasLCaseLetter =
      pWordHasLCaseLetterPattern.test(typedPWord);
    console.log(localPWordHasLCaseLetter);
    togglePWordHasLCaseLetterStateFn(localPWordHasLCaseLetter);
    const localPWordHasNum = pWordHasNumPattern.test(typedPWord);
    console.log(localPWordHasNum);
    togglePWordHasNumStateFn(localPWordHasNum);
    const localPWordHasSpChar = pWordHasSpCharPattern.test(typedPWord);
    console.log(localPWordHasSpChar);
    togglePWordHasSpCharStateFn(localPWordHasSpChar);
    const localPWordLengthOk = typedPWord.length > 7 && typedPWord.length < 101;
    console.log(localPWordLengthOk);
    togglePWordLengthOkStateFn(localPWordLengthOk);
    const pWordOk =
      localPWordHasCapLetter &&
      localPWordHasLCaseLetter &&
      localPWordHasNum &&
      localPWordHasSpChar &&
      localPWordLengthOk
        ? true
        : false;
    console.log(pWordOk);
    onUpdatePWordFn(typedPWord, pWordOk);
  };
  useEffect(() => {
    if (fieldsDisabled) {
      toggleShowPWordStateFn(false);
      togglePWordHasCapLetterStateFn(false);
      togglePWordHasLCaseLetterStateFn(false);
      togglePWordHasNumStateFn(false);
      togglePWordHasSpCharStateFn(false);
      togglePWordLengthOkStateFn(false);
    }
  });
  return (
    <div className="pWordStrngthChckerFrmGrp">
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
            onUpdatePropFn: handleChangePasswordFn,
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
            valErrors: valErrors,
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
      {/* <label>
        <span className="requiredFldLbl">* </span>Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        value={password}
        onChange={handleChangePasswordFn}
        disabled={fieldsDisabled}
      /> */}
      <div className="rgstrShwPWrdRow">
        <div className="form-check checkboxInputInline">
          <input
            className="form-check-input"
            type="checkbox"
            value={showPassword}
            id="flexCheckDefault"
            onChange={() => toggleShowPWordStateFn(!showPassword)}
            checked={showPassword}
            disabled={fieldsDisabled}
          />
          <label className="form-check-label">Show Password?</label>
        </div>
        <FontAwesomeIcon
          icon="fa-solid fa-check"
          className="pWordStrngthChkMrk"
          hidden={
            !pWordHasCapLetter ||
            !pWordHasLCaseLetter ||
            !pWordHasNum ||
            !pWordHasSpChar ||
            !pWordLengthOk
          }
        />
      </div>
      <div className="pWordStrengthChckr form-control">
        <h6 className="rgstrStrengthChckrHdr">Password Requirements:</h6>
        <div className="form-check rgstrFrmChckItm">
          <input
            className="form-check-input rgstrChckBox"
            type="checkbox"
            value={pWordHasCapLetter}
            onChange={() => {}}
            checked={pWordHasCapLetter}
            readOnly
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            At least 1 Capital A-Z
          </label>
        </div>
        <div className="form-check rgstrFrmChckItm">
          <input
            className="form-check-input rgstrChckBox"
            type="checkbox"
            value={pWordHasLCaseLetter}
            onChange={() => {}}
            checked={pWordHasLCaseLetter}
            readOnly
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            At least 1 lowercase a-z
          </label>
        </div>
        <div className="form-check rgstrFrmChckItm">
          <input
            className="form-check-input rgstrChckBox"
            type="checkbox"
            value={pWordHasNum}
            onChange={() => {}}
            checked={pWordHasNum}
            readOnly
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            At least 1 number
          </label>
        </div>
        <div className="form-check rgstrFrmChckItm">
          <input
            className="form-check-input rgstrChckBox"
            type="checkbox"
            value={pWordHasSpChar}
            onChange={() => {}}
            checked={pWordHasSpChar}
            readOnly
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            At least 1 special character
          </label>
        </div>
        <div className="form-check rgstrFrmChckItm">
          <input
            className="form-check-input rgstrChckBox"
            type="checkbox"
            value={pWordLengthOk}
            onChange={() => {}}
            checked={pWordLengthOk}
            readOnly
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            8-100 characters
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateEditPassword;
