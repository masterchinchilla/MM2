// import React, { Component } from "react";
// import { Link, useParams } from "react-router-dom";
// import dayjs from "dayjs";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import EditOptions from "./EditOptions.component";

// const Day = (props) => {
//   const thisDay = props.thisDay;
//   const thisFormState = props.thisFormState;
//   const formatedCreatedAtDate = dayjs(thisDay.createdAt).format(
//     "dddd, MMMM D, YYYY h:mm A"
//   );
//   const formatedUpdatedAtDate = dayjs(thisDay.updatedAt).format(
//     "dddd, MMMM D, YYYY h:mm A"
//   );
//   return (
//     <div className="accordion mt-4" id="accordionExample">
//       <div className="accordion-item">
//         <h2 className="accordion-header" id="headingOne">
//           <button
//             className="accordion-button"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target={"#dayAccrdn" + thisDay._id}
//             aria-expanded="true"
//             aria-controls="collapseOne"
//           >
//             <EditOptions thisFormState={thisFormState} />
//             <div className="accrdnTitle">{props.thisDay.dayOfWeek}</div>
//           </button>
//         </h2>
//         <div
//           id={"dayAccrdn" + thisDay._id}
//           className="accordion-collapse collapse show"
//           aria-labelledby="headingOne"
//           data-bs-parent="#accordionExample"
//         >
//           <div className="accordion-body">
//             <strong>This is the first item's accordion body.</strong> It is
//             shown by default, until the collapse plugin adds the appropriate
//             classes that we use to style each element. These classes control the
//             overall appearance, as well as the showing and hiding via CSS
//             transitions. You can modify any of this with custom CSS or
//             overriding our default variables. It's also worth noting that just
//             about any HTML can go within the <code>.accordion-body</code>,
//             though the transition does limit overflow.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Day;
