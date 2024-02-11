import React from "react";
import Header from "./Header";
import ActivityForm from "./ActivityForm";
import Calendar from "./Calendar";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  addActivity = (title) => {
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = monthNames[currentMonthIndex];
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(
      currentYear,
      currentMonthIndex + 1,
      0
    ).getDate();
    const newActivity = {
      id: Date.now(),
      month: currentMonth,
      title,
      boxes: Array(daysInMonth)
        .fill(false)
        .map((_, index) => {
          const date = new Date(currentYear, currentMonthIndex, index + 1);

          return {
            date: date.getDate(), // Get the day of the month
            checked: false, // Initial state for checkbox
          };
        }), // 30 boxes representing days
    };
    this.setState((prevState) => ({
      activities: [...prevState.activities, newActivity],
    }));
    localStorage.setItem(
      "activities",
      JSON.stringify([...this.state.activities, newActivity])
    );
  };
  onDeleteActivity = (activityId) => {
    this.setState(
      (prevState) => ({
        activities: prevState.activities.filter(
          (activity) => activity.id !== activityId
        ),
      }),
      () => {
        localStorage.setItem(
          "activities",
          JSON.stringify(this.state.activities)
        );
      }
    );
  };
  toggleBox = (activityId, index) => {
    this.setState((prevState) => ({
      activities: prevState.activities.map((activity) => {
        if (activity.id === activityId) {
          const updatedBoxes = [...activity.boxes];
          updatedBoxes[index].checked = !updatedBoxes[index].checked;
          return { ...activity, boxes: updatedBoxes };
        }
        return activity;
      }),
    }));
    localStorage.setItem("activities", JSON.stringify(this.state.activities));
  };

  render() {
    const { activities } = this.state;
    return (
      <div className="App">
        <center>
          <Header />
          <ActivityForm onAddActivity={this.addActivity} />
          <Calendar
            activities={activities}
            onToggleBox={this.toggleBox}
            onDelete={this.onDeleteActivity}
          />
        </center>
      </div>
    );
  }
}

export default App;
