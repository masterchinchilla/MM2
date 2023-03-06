import React, { Component } from "react";
import _ from "lodash";
import UserProfileCard from "./UserProfileCard.component";

class UserProfileParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisStateObj: {
        recordLoaded: false,
      },
      thisStateObjBackup: {},
    };
  }
  determineIfSaveDisabled = async (thisStateObj) => {
    const { thisRecord, valErrors } = thisStateObj;
    const thisValErrsObj = valErrors.GRFUser;
    console.log(thisValErrsObj);
    const objKeys = Object.keys(thisValErrsObj);
    const propsReqForSave = {
      givenName: true,
      familyName: true,
      email: true,
      password: true,
      handle: true,
    };
    let countOfValErrs = 0;
    for (let i = 0; i < objKeys.length; i++) {
      const thisObjKey = objKeys[i];
      console.log(thisObjKey);
      const thisPropsValErrsArray = thisValErrsObj[thisObjKey];
      console.log(thisPropsValErrsArray);
      const numOfLocalValErrs = thisPropsValErrsArray.length;
      console.log(numOfLocalValErrs);
      if (numOfLocalValErrs > 0) {
        countOfValErrs += numOfLocalValErrs;
        console.log(countOfValErrs);
      } else {
        const thisPropInRecord = thisRecord[thisObjKey];
        const thisPropReqForSave = propsReqForSave[thisObjKey] ? true : false;
        countOfValErrs += thisPropReqForSave ? (thisPropInRecord ? 0 : 1) : 0;
      }
    }
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
    const { thisStateObj } = this.state;
    const { thisRecord, valErrors } = thisStateObj;
    thisStateObj.thisRecord[propToUpdate] = trimmedWNoDblSpcs;
    thisStateObj.recordChanged = true;
    let thisValErrsObj = valErrors.GRFUser;
    let thisPropsValErrsArray = thisValErrsObj[propToUpdate];
    thisValErrsObj = await this.props.getCSValResultForPropFn(
      "GRFUser",
      propToUpdate,
      trimmedWNoDblSpcs,
      thisValErrsObj,
      thisRecord._id
    );
    console.log(thisValErrsObj);

    thisStateObj.saveDisabled = await this.determineIfSaveDisabled(
      thisStateObj
    );
    console.log(thisStateObj.saveDisabled);
    this.setState({
      thisStateObj: thisStateObj,
    });
  };
  handleSetDefaultStateFn = (userIsNew, currentUser) => {
    const thisStateObj = {
      thisRecord: {
        _id: currentUser ? currentUser._id : "",
        namePrefix: currentUser
          ? currentUser.namePrefix
            ? currentUser.namePrefix
            : ""
          : "",
        givenName: currentUser ? currentUser.givenName : "",
        middleName: currentUser
          ? currentUser.middleName
            ? currentUser.middleName
            : ""
          : "",
        familyName: currentUser ? currentUser.familyName : "",
        nameSuffix: currentUser
          ? currentUser.nameSuffix
            ? currentUser.nameSuffix
            : ""
          : "",
        email: currentUser ? currentUser.email : "",
        password: currentUser ? currentUser.password : "",
        handle: currentUser ? currentUser.handle : "",
        certURL: currentUser
          ? currentUser.certURL
            ? currentUser.certURL
            : ""
          : "",
        certName: currentUser
          ? currentUser.certName
            ? currentUser.certName
            : ""
          : "",
        verified: currentUser
          ? currentUser.verified
            ? currentUser.verified
            : false
          : false,
        photoURL: currentUser
          ? currentUser.photoURL
            ? currentUser.photoURL
            : ""
          : "",
        createdAt: currentUser
          ? currentUser.createdAt
            ? currentUser.createdAt
            : ""
          : "",
        updatedAt: currentUser
          ? currentUser.updatedAt
            ? currentUser.updatedAt
            : ""
          : "",
        isAdmin: currentUser
          ? currentUser.isAdmin
            ? currentUser.isAdmin
            : false
          : false,
      },
      recordLoaded: true,
      userType: currentUser
        ? currentUser.isAdmin
          ? "admin"
          : "author"
        : "author",
      editingForm: userIsNew ? true : false,
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
    const thisStateObjBackup = _.cloneDeep(thisStateObj);
    this.setState({
      thisStateObj: thisStateObj,
      userIsNew: userIsNew,
      passwordState: passwordState,
      thisStateObjBackup: thisStateObjBackup,
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
    const { thisStateObj } = this.state;
    thisStateObj.editingForm = true;
    const thisStateObjBackup = _.cloneDeep(thisStateObj);
    this.setState({
      thisStateObj: thisStateObj,
      thisStateObjBackup: thisStateObjBackup,
    });
  };
  handleSaveChangesFn = async (
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) => {
    const { createNewUser, updateUser } = this.props;
    const { thisStateObj, userIsNew } = this.state;
    const { thisRecord } = thisStateObj;
    let valErrors;
    if (userIsNew) {
      valErrors = await createNewUser(thisRecord);
    } else {
      valErrors = await updateUser(thisRecord);
    }
    if (valErrors.length > 0) {
      let valErrObjToUpdate = thisStateObj.valErrors.GRFUser;
      valErrObjToUpdate = this.props.updateThisObjsValErrs(
        valErrObjToUpdate,
        valErrors
      );
      thisStateObj.valErrors.GRFUser = valErrObjToUpdate;
      this.setState({ thisStateObj: thisStateObj });
    } else {
      this.handleSetDefaultStateFn(false, thisRecord);
    }
  };
  handleChangePasswordFn = (newPassword, passwordOk) => {
    const { thisStateObj } = this.state;
    const { thisRecord, recordChanged, valErrors } = thisStateObj;
    const currentPWord = thisRecord.password;
    const pWordChanged = currentPWord !== newPassword;
    if (pWordChanged) {
      if (!passwordOk) {
        thisStateObj.saveDisabled = true;
        valErrors.GRFUser.password = [
          "Password does not meet minimum requirements",
        ];
      } else {
        valErrors.GRFUser.password = [];
        thisStateObj.saveDisabled = this.determineIfSaveDisabled(thisStateObj);
      }
      thisStateObj.thisRecord.password = newPassword;

      thisStateObj.recordChanged = recordChanged || pWordChanged ? true : false;
      thisStateObj.valErrors = valErrors;
      this.setState({
        thisStateObj: thisStateObj,
      });
    }
  };
  updateHandleValErrorsStateFn = (handleValErrors) => {
    const { thisStateObj } = this.state;
    thisStateObj.valErrors.GRFUser.handle = handleValErrors;
    this.setState({
      thisStateObj: thisStateObj,
    });
  };
  handleUpdateHandleFn = (newValue) => {
    this.handleUpdatePropFn("handle", newValue, "GRFUser", "", "", null);
  };
  componentDidMount() {
    console.log("mounted");
    const { currentUser } = this.props;
    const userIsNew = this.handleSetIsNewPerParams();
    this.handleSetDefaultStateFn(userIsNew, currentUser);
  }
  handleDeleteObjFn = () => {};

  render() {
    if (this.state.thisStateObj.recordLoaded) {
      const typeOfRecordToChange = "GRFUser";
      const { thisStateObj, userIsNew, passwordState, thisStateObjBackup } =
        this.state;
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
        closeNavOnClick,
      } = this.props;
      return (
        <div className="pageContent" onClick={() => closeNavOnClick("outside")}>
          <UserProfileCard
            commonProps={{
              commonData: { backEndHtmlRoot: backEndHtmlRoot },
              commonMethods: {
                getRndIntegerFn: getRndIntegerFn,
                returnElementKey: returnElementKey,
                onUpdatePropFn: this.handleUpdatePropFn,
                onSaveChangesFn: this.handleSaveChangesFn,
                onStartEditingFn: this.handleStartEditingFn,
                onCancelEditFn: this.handleCancelEditFn,
                onDeleteObjFn: this.handleDeleteObjFn,
                trimEnteredValueFn: trimEnteredValueFn,
              },
            }}
            specificProps={{
              specificData: {
                thisStateObj: thisStateObj,
                userIsNew: userIsNew,
                passwordState: passwordState,
                origHandle: thisStateObjBackup.thisRecord.handle,
              },
              specificMethods: {
                onChangePasswordFn: this.handleChangePasswordFn,
              },
            }}
          />
        </div>
      );
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default UserProfileParent;
