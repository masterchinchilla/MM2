import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateEditPassword from "./CreateEditPassword.component";
import CustomHeading from "./CustomHeading.component";
import NewFormControl from "./NewFormControl.component";
import NewInputCore from "./NewInputCore.component";
import NewInputWSearchUniqueNew from "./NewInputWSearchUniqueNew.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
const typeOfRecordToChange = "GRFUser";
const thisDayOfWeekCode = "";
const thisMealTypeCode = "";
const arrayIndex = null;
const UserProfileCard = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { backEndHtmlRoot } = commonData;
  const {
    onUpdatePropFn,
    returnElementKey,
    getRndIntegerFn,
    trimEnteredValueFn,
    onStartEditingFn,
    onCancelEditFn,
    onSaveChangesFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj, userIsNew, passwordState, origHandle } = specificData;
  const { onChangePasswordFn } = specificMethods;
  const {
    thisRecord,
    userType,
    editingForm,
    recordChanged,
    valErrors,
    recordLoaded,
  } = thisStateObj;
  const {
    _id,
    namePrefix,
    givenName,
    middleName,
    familyName,
    nameSuffix,
    email,
    handle,
    password,
    certURL,
    certName,
    verified,
    photoURL,
    isAdmin,
    createdAt,
    updatedAt,
  } = thisRecord;
  const {
    showPassword,
    pWordHasCapLetter,
    pWordHasLCaseLetter,
    pWordHasNum,
    pWordHasSpChar,
    pWordLengthOk,
  } = passwordState;
  const thisRecordId = _id;
  const fieldsDisabled = editingForm ? false : true;
  const inputOnKeyUpFn = () => {};
  const [localHandle, updateHandleStateFn] = useState(handle);
  const [handleValErrors, updateHandleValErrorsStateFn] = useState(
    valErrors.GRFUser.handle
  );
  const [saveDisabled, toggleSaveDisabledStateFn] = useState(true);
  const [changesCancelled, toggleChangesCancelled] = useState(false);
  function handleCancelEditFn() {
    updateHandleValErrorsStateFn(valErrors.GRFUser.handle);
    toggleChangesCancelled(true);
    onCancelEditFn();
  }
  useEffect(() => {
    if (
      handleValErrors.length > 0 ||
      valErrors.GRFUser.namePrefix.length > 0 ||
      valErrors.GRFUser.givenName.length > 0 ||
      valErrors.GRFUser.middleName.length > 0 ||
      valErrors.GRFUser.familyName.length > 0 ||
      valErrors.GRFUser.nameSuffix.length > 0 ||
      valErrors.GRFUser.email.length > 0 ||
      valErrors.GRFUser.password.length > 0 ||
      valErrors.GRFUser.photoURL.length > 0 ||
      valErrors.GRFUser.certURL.length > 0 ||
      valErrors.GRFUser.certName.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  useEffect(() => {
    updateHandleStateFn(handle);
    updateHandleValErrorsStateFn(valErrors.GRFUser.handle);
  }, [recordLoaded]);
  return (
    <div className="card ms-4 me-4 registerCard">
      <div className="card-header">
        <CustomHeading
          key={`customCarddHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={1}
          recordLoaded={recordLoaded}
          headingText={userIsNew ? "New User" : "Update Profile"}
          hdngIsReqFormLbl={false}
          editingForm={editingForm}
          headingClasses="card-title"
        />
        <NewFormControl
          key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
          commonProps={{
            commonData: {},
            commonMethods: {
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: handleCancelEditFn,
              onSaveChangesFn: onSaveChangesFn,
              onDeleteObjFn: () => {},
              onCopyWMPFn: () => {},
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              recordChanged: recordChanged,
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              arrayIndex: arrayIndex,
              userType: userType,
              editingForm: editingForm,
              saveDisabled: saveDisabled,
              hasChildren: false,
              saveWarning: "",
              deleteWarning: "",
              deleteChildrenWarning: "",
              recordLoaded: recordLoaded,
            },
            specificMethods: {},
          }}
        />
      </div>
      <div
        className={
          userIsNew
            ? "grfUserSubCardHeader cardHeaderFocused"
            : "grfUserSubCardHeader"
        }
      >
        <CustomHeading
          key={`customHandleHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={5}
          recordLoaded={recordLoaded}
          headingText={"Handle:"}
          hdngIsReqFormLbl={true}
          editingForm={editingForm}
          headingClasses="grfUserSubCardHeading"
        />
        <NewInputWSearchUniqueNew
          commonProps={{
            commonData: { backEndHtmlRoot: backEndHtmlRoot },
            commonMethods: {
              onUpdatePropFn: onUpdatePropFn,
              returnElementKey: returnElementKey,
              getRndIntegerFn: getRndIntegerFn,
              trimEnteredValueFn: trimEnteredValueFn,
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              formGroupClasses: "form-group",
              label: "Handle",
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              propToUpdate: "handle",
              arrayIndex: arrayIndex,
              fieldDisabled: fieldsDisabled,
              valErrors: handleValErrors,
              inputClasses: "form-control",
              isRequired: true,
              recordLoaded: recordLoaded,
              propNameSentenceCase: "Handle",
              localPropValue: localHandle,
              excludeLabel: true,
              origPropValue: origHandle,
              thisRecordId: thisRecordId,
            },
            specificMethods: {
              changeLocalPropFn: updateHandleStateFn,
              updatePropValErrorsStateFn: updateHandleValErrorsStateFn,
            },
          }}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement wmpInnerAccordion"
        id={"gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#gnRcpIngrdntFrmAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"gnRcpIngrdntFrmAccrdn" + thisRecordId}
          className="accordion-collapse collapse"
          aria-labelledby={"#gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          data-bs-parent={"#gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
        >
          <div className="accordion-body">
            <ReadOnlyInputCore
              key={`readOnlyInputForIsAdminFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Is Admin? "
              inputClasses="form-control"
              propType="text"
              propValue={isAdmin}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.GRFUser.isAdmin}
              getRndIntegerFn={getRndIntegerFn}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForCreatedDtFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Created "
              inputClasses="form-control"
              propType="text"
              propValue={createdAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.GRFUser.createdAt}
              getRndIntegerFn={getRndIntegerFn}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForUpdatedDtFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Last Update "
              inputClasses="form-control"
              propType="text"
              propValue={updatedAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.GRFUser.updatedAt}
              getRndIntegerFn={getRndIntegerFn}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForIdFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Record ID "
              inputClasses="form-control"
              propType="text"
              propValue={_id}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.GRFUser._id}
              getRndIntegerFn={getRndIntegerFn}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <form className="registerForm">
          <div className="registerFormRow1">
            <fieldset className="registerBox1">
              <legend>Name</legend>
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "prefix",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Prefix",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "namePrefix",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.namePrefix,
                    inputClasses: "form-control",
                    isRequired: false,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "text",
                    propValue: namePrefix,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "givenName",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Given Name",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "givenName",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.givenName,
                    inputClasses: "form-control",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "text",
                    propValue: givenName,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "middleName",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Middle",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "middleName",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.middleName,
                    inputClasses: "form-control",
                    isRequired: false,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "text",
                    propValue: middleName,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "familyName",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Family Name",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "familyName",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.familyName,
                    inputClasses: "form-control",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "text",
                    propValue: familyName,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "nameSuffix",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Suffix",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "nameSuffix",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.nameSuffix,
                    inputClasses: "form-control",
                    isRequired: false,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "text",
                    propValue: nameSuffix,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
            </fieldset>
            <fieldset className="registerBox2">
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
                    onUpdatePropFn: onUpdatePropFn,
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
                    valErrors: valErrors.GRFUser.email,
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
              {userIsNew ? (
                <CreateEditPassword
                  password={password}
                  fieldsDisabled={fieldsDisabled}
                  valErrors={valErrors.GRFUser.password}
                  recordLoaded={recordLoaded}
                  onUpdatePWordFn={onChangePasswordFn}
                  trimEnteredValueFn={trimEnteredValueFn}
                  getRndIntegerFn={getRndIntegerFn}
                  returnElementKey={returnElementKey}
                  inputOnKeyUpFn={inputOnKeyUpFn}
                />
              ) : (
                ""
              )}

              <div className="form-group mb-2 userPhotoURLFrmGrp">
                <label className="userPhotoURLLabel">Photo URL</label>
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
                <NewInputCore
                  key={returnElementKey(
                    null,
                    "NewInputCore",
                    "photoURL",
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
                      onUpdatePropFn: onUpdatePropFn,
                      trimEnteredValueFn: trimEnteredValueFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      typeOfRecordToChange: typeOfRecordToChange,
                      formGroupClasses: "form-group",
                      label: "Photo URL",
                      thisDayOfWeekCode: thisDayOfWeekCode,
                      thisMealTypeCode: thisMealTypeCode,
                      propToUpdate: "photoURL",
                      arrayIndex: arrayIndex,
                      fieldDisabled: fieldsDisabled,
                      valErrors: valErrors.GRFUser.photoURL,
                      inputClasses: "form-control userPhotoURLInput",
                      isRequired: false,
                      recordLoaded: recordLoaded,
                      excludeLabel: true,
                      inputTypeForHtml: "url",
                      propValue: photoURL,
                    },
                    specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                  }}
                />
              </div>
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "certURL",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Cert URL",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "certURL",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.certURL,
                    inputClasses: "form-control",
                    isRequired: false,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "url",
                    propValue: certURL,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "certName",
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
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "form-group",
                    label: "Cert Name",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "certName",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.GRFUser.certName,
                    inputClasses: "form-control",
                    isRequired: false,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "text",
                    propValue: certName,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <div className="form-check mt-4 checkboxInputInline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={verified}
                  id="flexCheck"
                  disabled
                />
                <label className="form-check-label vrfdFrmChckLbl">
                  Verified?
                </label>
              </div>
            </fieldset>
          </div>
          <div
            className={`form-group registerFrmGrp`}
            hidden={userIsNew ? false : true}
          >
            <p className={`alreadyRegistered`}>
              Already registered?&nbsp;
              <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileCard;
