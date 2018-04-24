import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Course from "../Course/Course";
import Header from "../../components/Header/Header";
import "./Courses.css";

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: "Angular - The Complete Guide" },
      { id: 2, title: "Vue - The Complete Guide" },
      { id: 3, title: "PWA - The Complete Guide" }
    ],
    show: false,
    selectedCourse: null
  };

  clickCourseHandler = course_id => {
    this.setState({ show: true, selectedCourse: course_id });
  };

  render() {
    return (
      <div>
        {this.state.show ? (
          <Route
            path={`${this.props.match.url}/:course_id`}
            component={Course}
          />
        ) : (
          <div>
            <Header />
            <h1>Amazing Udemy Courses</h1>
            <section className="Courses">
              {this.state.courses.map(course => {
                return (
                  <Link
                    to={{
                      pathname: `/courses/${course.id}`,
                      search: `?course_title=${course.title}`
                    }}
                    key={course.id}
                    onClick={() => this.clickCourseHandler(course.id)}
                  >
                    <article className="Course" course_id={course.id}>
                      {course.title}
                    </article>
                  </Link>
                );
              })}
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Courses;
