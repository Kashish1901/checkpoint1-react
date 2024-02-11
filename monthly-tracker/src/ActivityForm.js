import React from "react";

class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (title.trim()) {
      this.props.onAddActivity(title);
      this.setState({ title: "" });
    }
  };
  handlechange = (e) => {
    this.setState({ title: e.target.value });
  };
  render() {
    const { title } = this.state;
    return (
      <>
        <center>
          <form onSubmit={this.handleSubmit}>
            <input
              value={title}
              type="text"
              placeholder="e.g. coding"
              onChange={this.handlechange}
            />
            <button type="submit">Add Activity</button>
          </form>
        </center>
      </>
    );
  }
}

export default ActivityForm;
