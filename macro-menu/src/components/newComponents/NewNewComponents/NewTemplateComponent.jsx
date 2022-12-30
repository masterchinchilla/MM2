import React from "react";
//template to paste in parent:
{
  /* <ThisComponentName
  commonProps={{
    commonData: { backEndHtmlRoot: backEndHtmlRoot },
    commonMethods: {
      getRndIntegerFn: getRndIntegerFn,
      returnElementKey: returnElementKey,
      onUpdatePropFn: onUpdatePropFn,
      onSaveChangesFn: onSaveChangesFn,
      onStartEditingFn: onStartEditingFn,
      onCancelEditFn: onCancelEditFn,
      onDeleteObjFn: onDeleteObjFn,
      trimEnteredValueFn: trimEnteredValueFn,
    },
  }}
  specificProps={{
    specificData: {
      thisStateObj:{},
      thisStateObjBackup: {},
    },
    specificMethods: {},
  }}
/>; */
}
const ThisComponentName = (props) => {
  const typeOfRecordToChange = "meal";
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { thisStateObjBackup } = specificData;
  const {} = specificMethods;
  let thisStateObj = specificData.thisStateObj.recordLoaded
    ? specificData.thisStateObj
    : {
        recordLoaded: false,
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          createdAt: "",
          updatedAt: "",
        },
        editingForm: { [typeOfRecordToChange]: false },
        valErrors: {
          [typeOfRecordToChange]: { _id: [], createdAt: [], updatedAt: [] },
        },
        recordChanged: {},
        justCreated: {},
        userType: {},
        hasChildren: {},
      };
  const {
    recordLoaded,
    thisRecord,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
  } = thisStateObj;
  const { _id, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id;
  return <div>Empty</div>;
};

export default ThisComponentName;
