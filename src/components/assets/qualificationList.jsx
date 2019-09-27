import React from "react"
const qualificationObject = [
    { value: "Mineure" },
    { value: "Majeure" },
    { value: "Observation" },
    { value: "Autre" }
]

var qualification = qualificationObject.map((item, i) => {
    return (
      <option key={i} value={item.value}>
        {item.value}
      </option>
    );
  });

export default qualification;