import React, { useState, useEffect } from "react";
import DayControlAndDisabledFields from "./DayControlAndDisabledFields.component";
import DayMealsAndMacros from "./DayMealsAndMacros.component";

const DayCard = (props) => {
  return (
    <div className="card mt-3 mb-3">
      <DayControlAndDisabledFields {...props} />
      <DayMealsAndMacros {...props} />
    </div>
  );
};

export default DayCard;
