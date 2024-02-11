import React from "react";

function ActivityBox({ checked, onClick, date }) {
  return (
    <div
      className={`activity-box ${checked ? "checked" : ""}`}
      onClick={onClick}
    >
      {date}
    </div>
  );
}

export default ActivityBox;
