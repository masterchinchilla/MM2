import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
const WMPNameAndDisabledFieldsSubForm = (props) => {
  const { thisStateObj, getRndIntegerFn } = props;
  const thisWMP = thisStateObj.thisWMP;
  return (
    <React.Fragment>
      <div
        className={
          thisStateObj.thisWMPJustCreated === true
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      ></div>
      <div className="card-body wmpCardBody">
        <div
          className="accordion accordion-flush"
          id={"wmpHiddenAccordionFull" + getRndIntegerFn(10000000, 99999999)}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={
                "wmpHiddenAccordionHeader" + getRndIntegerFn(10000000, 99999999)
              }
            >
              <button
                className="accordion-button collapsed wmpAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#wmpHiddenAccrdn" + getRndIntegerFn(10000000, 99999999)
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"wmpHiddenAccrdn" + getRndIntegerFn(10000000, 99999999)}
            className="accordion-collapse collapse"
            aria-labelledby={
              "#wmpHiddenAccordionHeader" + getRndIntegerFn(10000000, 99999999)
            }
            data-bs-parent={
              "#wmpHiddenAccordionFull" + getRndIntegerFn(10000000, 99999999)
            }
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <div className="form-group">
                <label>Author </label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={thisWMP.GRFUser.handle}
                  onChange={() => {}}
                />
              </div>
              <div className="form-group">
                <label>Record Id</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={getRndIntegerFn(10000000, 99999999)}
                  onChange={() => {}}
                />
              </div>
              <div className="form-group">
                <label>Created</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={dayjs(thisWMP.createdAt).format(
                    "dddd, MMMM D, YYYY h:mm A"
                  )}
                  onChange={() => {}}
                />
              </div>
              <div className="form-group">
                <label>Last Update</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={dayjs(thisWMP.updatedAt).format(
                    "dddd, MMMM D, YYYY h:mm A"
                  )}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WMPNameAndDisabledFieldsSubForm;
