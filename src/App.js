import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from './services/auth.service';

import AddLesson from "./components/AddLesson";
import Lesson from "./components/Lesson";
import LessonsList from "./components/LessonsList";
import TeacherLesson from "./components/TeacherLesson";
import TeacherLessonsList from './components/TeacherLessonsList';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            ArchieMD
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/lessons-teacher"} className="nav-link">
                  Edit Lessons
                </Link>
              </li>
            )}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
             </Link>
              </li>
            )}


            {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )} */}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/lessons/published"} className="nav-link">
                  Student Lessons
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
              </div>
            )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={["/lessons/published"]} component={LessonsList} />

            {/* <Route exact path={["/lessons"]} component={LessonsList} /> */}
            {/* <Route exact path={["/lessons"]} component={StudentLessonsList} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/add" component={AddLesson} />
            <Route path="/lessons/:id" component={Lesson} />
            <Route exact path={["/lessons-teacher"]} component={TeacherLessonsList} />
            <Route path="/lessons-edit/:id" component={TeacherLesson} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           <a href="/lessons" className="navbar-brand">
//             ArchieMD
//           </a>
//           <div className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <Link to={"/lessons"} className="nav-link">
//                 Lessons
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/add"} className="nav-link">
//                 Add
//               </Link>
//             </li>
//           </div>
//         </nav>

//         <div className="container mt-3">
//           <Switch>
//             <Route exact path={["/", "/lessons"]} component={LessonsList} />
//             <Route exact path="/add" component={AddLesson} />
//             <Route path="/lessons/:id" component={Lesson} />
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;