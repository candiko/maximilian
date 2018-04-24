import React from "react";
import { NavLink } from "react-router-dom";

const header = props => (
  <div>
    <header>
      <nav>
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/courses">Courses</a>
        </li>
      </nav>
      <br />
      <nav>
        <li>
          <NavLink to="/">Link => Home</NavLink>
        </li>
        <li>
          <NavLink to="/users">Link => Users</NavLink>
        </li>
        <li>
          <NavLink to="/courses">Link => Courses</NavLink>
        </li>
        <li>
          <NavLink to="/instructions">Link => Instructions</NavLink>
        </li>
      </nav>
    </header>
  </div>
);

export default header;
