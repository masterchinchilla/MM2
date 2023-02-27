import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const pWordHasCapLetterPattern = /[A-Z]/;
const pWordHasLCaseLetterPattern = /[a-z]/;
const pWordHasNumPattern = /\d/;
const pWordHasSpCharPattern = /[^\w\s]/;
const CreateEditPassword = ({
  pWordFromParent,
  editingForm,
  onUpdatePWordFn,
}) => {
  const [showPassword, toggleShowPWordStateFn] = useState(false);
  const [localPassword, updateLocalPasswordStateFn] = useState(pWordFromParent);
  const [pWordHasCapLetter, togglePWordHasCapLetterStateFn] = useState(false);
  const [pWordHasLCaseLetter, togglePWordHasLCaseLetterStateFn] =
    useState(false);
  const [pWordHasNum, togglePWordHasNumStateFn] = useState(false);
  const [pWordHasSpChar, togglePWordHasSpCharStateFn] = useState(false);
  const [pWordLengthOk, togglePWordLengthOkStateFn] = useState(false);
  const handleChangePasswordFn = (e) => {
    const typedPWord = e.target.value;
    updateLocalPasswordStateFn(typedPWord.trim());
    togglePWordHasCapLetterStateFn(pWordHasCapLetterPattern.test(typedPWord));
    togglePWordHasLCaseLetterStateFn(
      pWordHasLCaseLetterPattern.test(typedPWord)
    );
    togglePWordHasNumStateFn(pWordHasNumPattern.test(typedPWord));
    togglePWordHasSpCharStateFn(pWordHasSpCharPattern.test(typedPWord));
    togglePWordLengthOkStateFn(
      typedPWord.length > 7 && typedPWord.length < 101
    );
    const pWordOk =
      pWordHasCapLetter &&
      pWordHasLCaseLetter &&
      pWordHasNum &&
      pWordHasSpChar &&
      pWordLengthOk;
    onUpdatePWordFn(localPassword, pWordOk);
  };
  useEffect(() => {
    toggleShowPWordStateFn(false);
    updateLocalPasswordStateFn(pWordFromParent);
    togglePWordHasCapLetterStateFn(false);
    togglePWordHasLCaseLetterStateFn(false);
    togglePWordHasNumStateFn(false);
    togglePWordHasSpCharStateFn(false);
    togglePWordLengthOkStateFn(false);
  }, []);
  return (
    <div className="form-group mb-4">
      <label className="form-label">
        <span className="requiredFldLbl">* </span>Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        value={localPassword}
        onChange={handleChangePasswordFn}
        disabled={!editingForm}
      />
      <div className="rgstrShwPWrdRow">
        <div className="form-check rgstrShwPwrdChck">
          <input
            className="form-check-input"
            type="checkbox"
            value={showPassword}
            id="flexCheckDefault"
            onChange={(e) => toggleShowPWordStateFn(e.target.value)}
            checked={showPassword}
            disabled={!editingForm}
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
