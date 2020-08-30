import React, { useState, useEffect } from "react";
import LessonDataService from "../services/LessonService";
import { Link } from "react-router-dom";

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveLessons();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveLessons = () => {
    LessonDataService.getAll()
      .then(response => {
        setLessons(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveLessons();
    setCurrentLesson(null);
    setCurrentIndex(-1);
  };

  const setActiveLesson = (lesson, index) => {
    setCurrentLesson(lesson);
    setCurrentIndex(index);
  };

  const removeAllLessons = () => {
    LessonDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    LessonDataService.findByTitle(searchTitle)
      .then(response => {
        setLessons(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lessons List</h4>

        <ul className="list-group">
          {lessons &&
            lessons.map((lesson, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveLesson(lesson, index)}
                key={index}
              >
                {lesson.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllLessons}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentLesson ? (
          <div>
            <h4>Lesson</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentLesson.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentLesson.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentLesson.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/lessons/" + currentLesson._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a lesson...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsList;