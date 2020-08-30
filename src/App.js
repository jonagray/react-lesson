import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddLesson from "./components/AddLesson";
import Lesson from "./components/Lesson";
import LessonsList from "./components/LessonsList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/lessons" className="navbar-brand">
            ArchieMD
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/lessons"} className="nav-link">
                Lessons
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/lessons"]} component={LessonsList} />
            <Route exact path="/add" component={AddLesson} />
            <Route path="/lessons/:id" component={Lesson} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;