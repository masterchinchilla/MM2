import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewFormControl from "./NewFormControl.component";
import NewInputCore from "./NewInputCore.component";
import NewInputWSearchUniqueNew from "./NewInputWSearchUniqueNew.component";
import CustomHeading from "./CustomHeading.component";
import CreateEditPassword from "./CreateEditPassword.component";

class UserProfileParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GRFUserStateObj: {
        recordLoaded: false,
      },
    };
  }
  determineIfSaveDisabled = (thisValErrsObj) => {
    const objKeys = Object.keys(thisValErrsObj);
    console.log(objKeys);
    let countOfValErrs = 0;
    for (let i = 0; i < objKeys.length; i++) {
      let thisObjKey = objKeys[i];
      console.log(thisObjKey);
      let thisPropsValErrsArray = thisValErrsObj[thisObjKey];
      console.log(thisPropsValErrsArray);
      countOfValErrs += thisPropsValErrsArray.length;
    }
    console.log(countOfValErrs);
    return countOfValErrs > 0 ? true : false;
  };
  handleUpdatePropFn = async (
    propToUpdate,
    trimmedWNoDblSpcs,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    console.log(propToUpdate, trimmedWNoDblSpcs);
    const { GRFUserStateObj } = this.state;
    const { thisRecord, valErrors } = GRFUserStateObj;
    let thisValErrsObj = valErrors.GRFUser;
    thisValErrsObj = await this.props.getCSValResultForPropFn(
      "GRFUser",
      propToUpdate,
      trimmedWNoDblSpcs,
      thisValErrsObj,
      thisRecord._id
    );
    console.log(thisValErrsObj);
    GRFUserStateObj.thisRecord[propToUpdate] = trimmedWNoDblSpcs;
    GRFUserStateObj.recordChanged = true;
    GRFUserStateObj.saveDisabled = this.determineIfSaveDisabled(thisValErrsObj);
    this.setState({
      GRFUserStateObj: GRFUserStateObj,
    });
  };
  handleSetDefaultStateFn = (userIsNew, currentUser) => {
    const GRFUserStateObj = {
      thisRecord: {
        _id: currentUser._id,
        namePrefix: currentUser.namePrefix ? currentUser.namePrefix : "",
        givenName: currentUser.givenName,
        middleName: currentUser.middleName ? currentUser.middleName : "",
        familyName: currentUser.familyName,
        nameSuffix: currentUser.nameSuffix ? currentUser.nameSuffix : "",
        email: currentUser.email,
        password: currentUser.password,
        handle: currentUser.handle,
        certURL: currentUser.certURL ? currentUser.certURL : "",
        certName: currentUser.certName ? currentUser.certName : "",
        verified: currentUser.verified ? currentUser.verified : false,
        photoURL: currentUser.photoURL ? currentUser.photoURL : "",
        createdAt: currentUser.createdAt ? currentUser.createdAt : "",
        updatedAt: currentUser.updatedAt ? currentUser.updatedAt : "",
        isAdmin: currentUser.isAdmin ? currentUser.isAdmin : false,
      },
      recordLoaded: true,
      userType: currentUser.isAdmin
        ? currentUser.isAdmin
          ? "admin"
          : "author"
        : "author",
      editingForm: false,
      recordChanged: false,
      saveDisabled: true,
      valErrors: {
        GRFUser: {
          _id: [],
          namePrefix: [],
          givenName: [],
          middleName: [],
          familyName: [],
          nameSuffix: [],
          email: [],
          password: [],
          handle: [],
          certURL: [],
          certName: [],
          verified: [],
          photoURL: [],
          createdAt: [],
          updatedAt: [],
          isAdmin: [],
        },
      },
    };
    const passwordState = {
      showPassword: false,
      pWordHasCapLetter: false,
      pWordHasLCaseLetter: false,
      pWordHasNum: false,
      pWordHasSpChar: false,
      pWordLengthOk: false,
    };
    this.setState({
      GRFUserStateObj: GRFUserStateObj,
      userIsNew: userIsNew,
      passwordState: passwordState,
    });
  };
  handleSetIsNewPerParams = () => {
    const { match } = this.props;
    const pgReqParams = match.params;
    return pgReqParams.isNew;
  };
  handleCancelEditFn = () => {
    const { currentUser } = this.props;
    const userIsNew = this.handleSetIsNewPerParams();
    this.handleSetDefaultStateFn(userIsNew, currentUser);
  };
  handleStartEditingFn = (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    const { GRFUserStateObj } = this.state;
    GRFUserStateObj.editingForm = true;
    this.setState({
      GRFUserStateObj: GRFUserStateObj,
    });
  };
  handleSaveChangesFn = async (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    const { createNewUser, updateUser } = this.props;
    const { GRFUserStateObj, userIsNew } = this.state;
    const { thisRecord } = GRFUserStateObj;
    let valErrors;
    if (userIsNew) {
      valErrors = await createNewUser(thisRecord);
    } else {
      valErrors = await updateUser(thisRecord);
    }
    if (valErrors.length > 0) {
      let valErrObjToUpdate = GRFUserStateObj.valErrors.GRFUser;
      valErrObjToUpdate = this.props.updateThisObjsValErrs(
        valErrObjToUpdate,
        valErrors
      );
      GRFUserStateObj.valErrors.GRFUser = valErrObjToUpdate;
      this.setState({ GRFUserStateObj: GRFUserStateObj });
    } else {
      this.handleSetDefaultStateFn(false, thisRecord);
    }
  };
  handleChangePasswordFn = (newPassword, passwordOk) => {
    const { GRFUserStateObj } = this.state;
    const { thisRecord, recordChanged, valErrors } = GRFUserStateObj;
    const currentPWord = thisRecord.password;
    const pWordChanged = currentPWord !== newPassword;
    if (pWordChanged) {
      if (!passwordOk) {
        GRFUserStateObj.saveDisabled = true;
        // valErrors.GRFUser.password = [
        //   "Password does not meet minimum requirements",
        // ];
      } else {
        // valErrors.GRFUser.password = [];
        GRFUserStateObj.saveDisabled = this.determineIfSaveDisabled(
          valErrors.GRFUser
        );
      }
      GRFUserStateObj.thisRecord.password = newPassword;

      GRFUserStateObj.recordChanged =
        recordChanged || pWordChanged ? true : false;
      GRFUserStateObj.valErrors = valErrors;
      this.setState({
        GRFUserStateObj: GRFUserStateObj,
      });
    }
  };
  //   const typedPWord = e.target.value;
  //   const pWordHasCapLetterPattern = /[A-Z]/;
  //   const pWordHasLCaseLetterPattern = /[a-z]/;
  //   const pWordHasNumPattern = /\d/;
  //   const pWordHasSpCharPattern = /[^\w\s]/;
  //   const pWordHasCapLetter = pWordHasCapLetterPattern.test(typedPWord);
  //   const pWordHasLCaseLetter = pWordHasLCaseLetterPattern.test(typedPWord);
  //   const pWordHasNum = pWordHasNumPattern.test(typedPWord);
  //   const pWordHasSpChar = pWordHasSpCharPattern.test(typedPWord);
  //   const pWordLengthOk = typedPWord.length > 7 && typedPWord.length < 101;
  //   this.setState({
  //     password: typedPWord,
  //     pWordHasCapLetter: pWordHasCapLetter,
  //     pWordHasLCaseLetter: pWordHasLCaseLetter,
  //     pWordHasNum: pWordHasNum,
  //     pWordHasSpChar: pWordHasSpChar,
  //     pWordLengthOk: pWordLengthOk,
  //     recordChanged: true,
  //   });
  // };
  // toggleShowPasswordFn = (e) => {
  //   this.setState({ showPassword: e.target.checked });
  // };
  updateHandleValErrorsStateFn = (handleValErrors) => {
    const { GRFUserStateObj } = this.state;
    GRFUserStateObj.valErrors.GRFUser.handle = handleValErrors;
    this.setState({
      GRFUserStateObj: GRFUserStateObj,
    });
  };
  handleUpdateHandleFn = (newValue) => {
    this.handleUpdatePropFn("handle", newValue, "GRFUser", "", "", null);
  };
  componentDidMount() {
    const { currentUser } = this.props;
    const userIsNew = this.handleSetIsNewPerParams();
    this.handleSetDefaultStateFn(userIsNew, currentUser);
  }
  render() {
    if (this.state.GRFUserStateObj.recordLoaded) {
      const typeOfRecordToChange = "GRFUser";
      const { GRFUserStateObj, userIsNew, passwordState } = this.state;
      const {
        thisRecord,
        userType,
        editingForm,
        recordChanged,
        valErrors,
        saveDisabled,
        recordLoaded,
      } = GRFUserStateObj;
      const {
        _id,
        namePrefix,
        givenName,
        middleName,
        familyName,
        nameSuffix,
        email,
        password,
        handle,
        certURL,
        certName,
        verified,
        photoURL,
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
      const thisDayOfWeekCode = "";
      const thisMealTypeCode = "";
      const arrayIndex = null;
      const fieldsDisabled = editingForm ? false : true;
      const inputOnKeyUpFn = () => {};
      const {
        backEndHtmlRoot,
        returnElementKey,
        getRndIntegerFn,
        trimEnteredValueFn,
      } = this.props;
      return (
        <div className="pageContent">
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
                    onStartEditingFn: this.handleStartEditingFn,
                    onCancelEditFn: this.handleCancelEditFn,
                    onSaveChangesFn: this.handleSaveChangesFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                        onUpdatePWordFn={this.handleChangePasswordFn}
                        trimEnteredValueFn={trimEnteredValueFn}
                        getRndIntegerFn={getRndIntegerFn}
                        returnElementKey={returnElementKey}
                        inputOnKeyUpFn={inputOnKeyUpFn}
                      />
                    ) : (
                      ""
                    )}

                    {/* <div className="form-group mb-4">
                      <label className="form-label">
                        <span className="requiredFldLbl">* </span>Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={this.handleChangePasswordFn}
                      />
                      <div className="rgstrShwPWrdRow">
                        <div className="form-check rgstrShwPwrdChck">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={showPassword}
                            id="flexCheckDefault"
                            onChange={this.toggleShowPasswordFn}
                            checked={showPassword}
                          />
                          <label className="form-check-label">
                            Show Password?
                          </label>
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
                        <h6 className="rgstrStrengthChckrHdr">
                          Password Requirements:
                        </h6>
                        <div className="form-check rgstrFrmChckItm">
                          <input
                            className="form-check-input rgstrChckBox"
                            type="checkbox"
                            value={pWordHasCapLetter}
                            onChange={() => {}}
                            checked={pWordHasCapLetter}
                            readOnly
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            8-100 characters
                          </label>
                        </div>
                      </div>
                    </div> */}
                    <NewInputWSearchUniqueNew
                      commonProps={{
                        commonData: { backEndHtmlRoot: backEndHtmlRoot },
                        commonMethods: {
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          valErrors: valErrors.GRFUser.handle,
                          inputClasses: "form-control",
                          isRequired: true,
                          recordLoaded: recordLoaded,
                          propNameSentenceCase: "Handle",
                          localPropValue: handle,
                          origPropValue: handle,
                        },
                        specificMethods: {
                          changeLocalPropFn: this.handleUpdateHandleFn,
                          updatePropValErrorsStateFn:
                            this.updateHandleValErrorsStateFn,
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
                            onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                          onUpdatePropFn: this.handleUpdatePropFn,
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
                <div className="form-group registerFrmGrp">
                  <p className="alreadyRegistered">
                    Already registered?&nbsp;
                    <Link to="/">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default UserProfileParent;
