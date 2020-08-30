import React, { useState, useEffect } from "react";
import LessonDataService from "../services/LessonService";
import { Link } from "react-router-dom";

const Lesson = props => {
  const initialLessonState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentLesson, setCurrentLesson] = useState(initialLessonState);
  const [message, setMessage] = useState("");

  const getLesson = id => {
    LessonDataService.get(id)
      .then(response => {
        setCurrentLesson(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getLesson(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentLesson({ ...currentLesson, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      _id: currentLesson._id,
      title: currentLesson.title,
      description: currentLesson.description,
      published: status
    };

    LessonDataService.update(currentLesson._id, data)
      .then(response => {
        setCurrentLesson({ ...currentLesson, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateLesson = () => {
    LessonDataService.update(currentLesson._id, currentLesson)
      .then(response => {
        console.log(response.data);
        setMessage("The lesson was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteLesson = () => {
    LessonDataService.remove(currentLesson._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/lessons");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentLesson ? (
        <div className="edit-form">
          <h4>Lesson</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentLesson.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentLesson.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentLesson.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentLesson.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteLesson}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateLesson}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a lesson...</p>
        </div>
      )}
    </div>
  );
};

export default Lesson;