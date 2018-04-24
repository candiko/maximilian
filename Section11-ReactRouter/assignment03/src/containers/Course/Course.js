import React, { Component } from "react";
import Header from "../../components/Header/Header";

class Course extends Component {
  render() {
    const query = new URLSearchParams(this.props.location.search);
    let course_title = null;
    for (let param of query.entries()) {
      course_title = param[1];
    }
    return (
      <div>
        <Header />
        <h1>{course_title}</h1>
        <p>
          You selected the Course with ID: {this.props.match.params.course_id}
        </p>
      </div>
    );
  }
}

export default Course;
