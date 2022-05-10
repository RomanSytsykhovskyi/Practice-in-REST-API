import React, { Component } from "react";

class University extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.props };
  }

  shouldComponentUpdate(prevProps, prevState) {
    for (let key in prevState) {
      if (this.state[key] !== prevState[key]) {
        return true;
      }
    }
    return false;
  }

  render() {
    //console.log("University");
    return (
      <div className="university">
        <div className="topUniversity">
          <h2>{this.state.name}</h2>
          <h3>{this.state.city}</h3>
        </div>
        <div className="bottomUniversity">
          <button onClick={() => this.state.clickHandler(this.state.id)}>
            Read more
          </button>
        </div>
      </div>
    );
  }
}

export default University;
