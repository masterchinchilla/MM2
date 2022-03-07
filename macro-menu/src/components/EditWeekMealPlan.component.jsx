// import React, { Component, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const EditWeekMealPlan = (props) => {
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [GRFUsers, setGRFUsers] = useState([]);
//   const [GRFUser, setGRFUser] = useState("");
//   onChangeName = (e) => {
//     setName(e.target.value);
//   };
//   onChangeGRFUser = (e) => {
//     setGRFUser(e.target.value);
//   };
//   onSubmitWMPChange = (e) => {
//     e.preventDefault();
//     const weekMealPlan = {
//       id: id,
//       name: name,
//       GRFUser: GRFUser,
//     };
//     axios.post(
//       "http://localhost:5000/weekMealPlans/update/" + id,
//       weekMealPlan
//     );
//   };
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/weekMealPlans/" + props.match.params.id)
//       .then((response) => {
//         setId(response.data._id);
//         setName(response.data.name);
//         setGRFUser(response.data.GRFUser);
//       });
//     axios.get("http://localhost:5000/GRFUsers/").then((response) => {
//       if (response.data.length > 0) {
//         setGRFUsers({
//           GRFUsers: response.data.map((GRFUser) => GRFUser.handle),
//         });
//       }
//     });
//   });
//   return (
//     <div className="container-fluid pl-4 pr-4">
//       <h1>Edit Week Meal Plan</h1>
//       <form onSubmit={this.onSubmitWMPChange}>
//         <div className="form-group">
//           <label>Name: </label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={this.onChangeName}
//           />
//         </div>
//         <div className="form-group">
//           <label>Author: </label>
//           <select
//             ref="userInput"
//             required
//             className="form-control"
//             value={GRFUser}
//             onChange={this.onChangeGRFUser}
//           >
//             {GRFUsers.map(function (GRFUser) {
//               return (
//                 <option key={GRFUser} value={GRFUser}>
//                   {GRFUser}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         <div className="form-group mt-4 mb-4">
//           <input
//             type="submit"
//             value="Save Changes"
//             className="btn btn-primary"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };
// export default EditWeekMealPlan;
