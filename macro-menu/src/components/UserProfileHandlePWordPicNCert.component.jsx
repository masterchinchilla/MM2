import React from "react";
const typeOfRecordToChange = "GRFUser";
const thisDayOfWeekCode = "";
const thisMealTypeCode = "";
const arrayIndex = null;
const UserProfileHandlePWordPicNCert = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { backEndHtmlRoot } = commonData;
  const {
    onUpdatePropFn,
    returnElementKey,
    getRndIntegerFn,
    trimEnteredValueFn,
    closeNavOnClick,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const {
    thisStateObj,
    userIsNew,
    passwordState,
    localHandle,
    origHandle,
    handleValErrors,
  } = specificData;
  const {
    onChangePasswordFn,
    updateHandleStateFn,
    updateHandleValErrorsStateFn,
  } = specificMethods;
  const {
    thisRecord,
    userType,
    editingForm,
    recordChanged,
    valErrors,
    saveDisabled,
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
  return (
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
            origPropValue: origHandle,
          },
          specificMethods: {
            changeLocalPropFn: updateHandleStateFn,
            updatePropValErrorsStateFn: updateHandleValErrorsStateFn,
          },
        }}
      />
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
        <label className="form-check-label vrfdFrmChckLbl">Verified?</label>
      </div>
    </fieldset>
  );
};

export default UserProfileHandlePWordPicNCert;
