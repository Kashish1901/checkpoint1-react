import React from "react";
import ActivityBox from "./ActivityBox";

class Calendar extends React.Component {
  handleDelete = (activityId) => {
    const { onDelete } = this.props;
    onDelete(activityId);
  };
  render() {
    const { activities, onToggleBox } = this.props;
    return (
      <div className="calendar ">
        {activities.map((activity) => (
          <div key={activity.id} className="flex">
            <div className="heading">
              <h2 className="title">{activity.title}</h2>
              <span>{activity.month}</span>
            </div>
            <div className="box-container">
              {activity.boxes.map((box, index) => (
                <ActivityBox
                  key={index}
                  checked={box.checked}
                  onClick={() => onToggleBox(activity.id, index)}
                  date={box.date}
                />
              ))}
            </div>
            <button
              className="btn"
              onClick={() => this.handleDelete(activity.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
