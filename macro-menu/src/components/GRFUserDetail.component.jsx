import React, { useState, Component } from "react";
import axios from "axios";
import Joi from "joi";
import _ from "lodash";
import InputWSearchUnique from "./InputWSearchUnique.component";
const GRFUserDetail = (props) => {
  const backEndHtmlRoot = props.backEndHtmlRoot;
  let currentGRFUser = {
    _id: "",
    userGroups: "GRFUser",
    handle: "Not Signed-In",
  };
  currentGRFUser = props.location.state.currentGRFUser;
  const objType = "GRFUser";
  const [namePrefix, updateNamePrefix] = useState(currentGRFUser.namePrefix);
  const [givenName, updateGivenName] = useState(currentGRFUser.givenName);
  const [middleName, updateMiddleName] = useState(currentGRFUser.middleName);
  const [familyName, updateFamilyName] = useState(currentGRFUser.familyName);
  const [nameSuffix, updateNameSuffix] = useState(currentGRFUser.nameSuffix);
  const [email, updateEmail] = useState(currentGRFUser.email);
  const [handle, updateHandle] = useState(currentGRFUser.handle);
  const [photoURL, updatePhotoURL] = useState(currentGRFUser.photoURL);
  const [certURL, updateCertURL] = useState(currentGRFUser.certURL);
  const [certName, updateCertName] = useState(currentGRFUser.certName);
  const [namePrefixValError, updateNamePrefixValError] = useState(null);
  const [givenNameValError, updateGivenNameValError] = useState(null);
  const [middleNameValError, updateMiddleNameValError] = useState(null);
  const [familyNameValError, updateFamilyNameValError] = useState(null);
  const [nameSuffixValError, updateNameSuffixValError] = useState(null);
  const [emailValError, updateEmailValError] = useState(null);
  const [handleValError, updateHandleValError] = useState(null);
  const [photoURLValError, updatePhotoURLValError] = useState(null);
  const [certURLValError, updateCertURLValError] = useState(null);
  const [certNameValError, updateCertNameValError] = useState(null);
  const [saveDisabled, toggleSaveDisabled] = useState(false);
  const orig = _.cloneDeep(currentGRFUser.handle);
  const parentObjOld = _.cloneDeep(currentGRFUser);
  const thisFormState = "editingOrig";
  const formGroupClasses = "form-group mb-2";

  const usersId = currentGRFUser._id;
  const verified = currentGRFUser.verified;
  const valSchema = Joi.object({
    namePrefix: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(0)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      }),
    givenName: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(1)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      })
      .required(),
    middleName: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(0)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      }),
    familyName: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(1)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      })
      .required(),
    nameSuffix: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(0)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      }),
    email: Joi.string()
      .trim()
      .min(6)
      .required()
      .email({ tlds: { allow: false } }),
    handle: Joi.string().trim().regex(/^\S/).min(3).max(100).required(),
    photoURL: Joi.string().trim().uri(),
    certURL: Joi.string().trim().min(4).uri(),
    certName: Joi.string().trim().min(1).max(300),
  });
  function handleUpdateProp(propValue, propName) {
    let thisPropValue;
    if (propName === "handle") {
      thisPropValue = propValue;
    } else {
      thisPropValue = propValue.target.value;
    }
    const rule = valSchema.extract(propName);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: thisPropValue };
    const { error } = subSchema.validate(objToValidate);
    let validationError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
      toggleSaveDisabled(true);
    } else {
      validationError = null;
      toggleSaveDisabled(false);
    }
    switch (propName) {
      case "namePrefix":
        updateNamePrefix(thisPropValue);
        updateNamePrefixValError(validationError);
        break;
      case "givenName":
        updateGivenName(thisPropValue);
        updateGivenNameValError(validationError);
        break;
      case "middleName":
        updateMiddleName(thisPropValue);
        updateMiddleNameValError(validationError);
        break;
      case "familyName":
        updateFamilyName(thisPropValue);
        updateFamilyNameValError(validationError);
        break;
      case "nameSuffix":
        updateNameSuffix(thisPropValue);
        updateNameSuffixValError(validationError);
        break;
      case "email":
        updateEmail(thisPropValue);
        updateEmailValError(validationError);
        break;
      case "handle":
        updateHandle(thisPropValue);
        updateHandleValError(validationError);
        break;
      case "photoURL":
        updatePhotoURL(thisPropValue);
        updatePhotoURLValError(validationError);
        break;
      case "certURL":
        updateCertURL(thisPropValue);
        updateCertURLValError(validationError);
        break;
      case "certName":
        updateCertName(thisPropValue);
        updateCertNameValError(validationError);
        break;
    }
  }
  function handleSubmit(e) {
    const thisGRFUser = {
      namePrefix: namePrefix,
      givenName: givenName,
      middleName: middleName,
      familyName: familyName,
      nameSuffix: nameSuffix,
      email: email,
      password: currentGRFUser.password,
      handle: handle,
      photoURL: photoURL,
      certURL: certURL,
      certName: certName,
      verified: verified,
    };
    axios
      .post("http://localhost:5000/grfusers/update/" + usersId, thisGRFUser)
      .then((response) => console.log(response.data))
      .then((window.location = "/weekMealPlans/usersWMPs/" + usersId));
  }
  return (
    <div className="card ms-4 me-4 registerCard">
      <div className="card-header">
        <h1>GRF User Profile</h1>
      </div>
      <div className="card-body">
        <form className="registerForm">
          <div className="registerFormRow1">
            <fieldset className="registerBox1">
              <legend>Name</legend>
              <div className="form-group mb-2">
                <label className="form-label">Prefix</label>
                <input
                  type="text"
                  className="form-control"
                  value={namePrefix}
                  onChange={(e) => handleUpdateProp(e, "namePrefix")}
                />
                {namePrefixValError ? (
                  <div className="alert alert-danger">{namePrefixValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">
                  <span className="requiredFldLbl">* </span>Given Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={givenName}
                  onChange={(e) => handleUpdateProp(e, "givenName")}
                />
                {givenNameValError ? (
                  <div className="alert alert-danger">{givenNameValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Middle</label>
                <input
                  type="text"
                  className="form-control"
                  value={middleName}
                  onChange={(e) => handleUpdateProp(e, "middleName")}
                />
                {middleNameValError ? (
                  <div className="alert alert-danger">{middleNameValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">
                  <span className="requiredFldLbl">* </span>Family Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={familyName}
                  onChange={(e) => handleUpdateProp(e, "familyName")}
                />
                {familyNameValError ? (
                  <div className="alert alert-danger">{familyNameValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Suffix</label>
                <input
                  type="text"
                  className="form-control"
                  value={nameSuffix}
                  onChange={(e) => handleUpdateProp(e, "nameSuffix")}
                />
                {nameSuffixValError ? (
                  <div className="alert alert-danger">{nameSuffixValError}</div>
                ) : null}
              </div>
            </fieldset>
            <fieldset className="registerBox2">
              <div className="form-group mb-2">
                <label className="form-label">
                  <span className="requiredFldLbl">* </span>Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => handleUpdateProp(e, "email")}
                />
                {emailValError ? (
                  <div className="alert alert-danger">{emailValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">
                  <span className="requiredFldLbl">* </span>Handle
                </label>
                <InputWSearchUnique
                  backEndHtmlRoot={backEndHtmlRoot}
                  objType={objType}
                  propName={"handle"}
                  localPropValue={handle}
                  origPropValue={orig}
                  propNameSentenceCase={"Handle"}
                  fieldDisabled={false}
                  propType={"text"}
                  valErrorUpdateFn={updateHandleValError}
                  toggleSaveDisabledFn={toggleSaveDisabled}
                  changeLocalPropFn={handleUpdateProp}
                  changeParentPropFn={handleUpdateProp}
                />
                {handleValError ? (
                  <div className="alert alert-danger">{handleValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2 userPhotoURLFrmGrp">
                <label className="form-label userPhotoURLLabel">
                  Photo URL
                </label>
                <div
                  className="userPhotoPreview"
                  style={
                    !photoURL
                      ? {
                          backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                          width: "100px",
                          height: "100px",
                        }
                      : {
                          backgroundImage: `url(${photoURL})`,
                          width: "100px",
                          height: "100px",
                        }
                  }
                ></div>
                <input
                  type="text"
                  className="form-control userPhotoURLInput"
                  value={photoURL}
                  onChange={(e) => handleUpdateProp(e, "photoURL")}
                />
                {photoURLValError ? (
                  <div className="alert alert-danger userPhotoURLValError">
                    {photoURLValError}
                  </div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Cert URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={certURL}
                  onChange={(e) => handleUpdateProp(e, "certURL")}
                />
                {certURLValError ? (
                  <div className="alert alert-danger">{certURLValError}</div>
                ) : null}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Cert Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={certName}
                  onChange={(e) => handleUpdateProp(e, "certName")}
                />
                {certNameValError ? (
                  <div className="alert alert-danger">{certNameValError}</div>
                ) : null}
              </div>
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheck"
                />
                <label className="form-check-label">Verified?</label>
              </div>
            </fieldset>
          </div>
          <div className="form-group registerFrmGrp">
            <button
              type="button"
              className={"btn btn-lg btn-primary registerSubmit"}
              disabled={saveDisabled}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GRFUserDetail;
