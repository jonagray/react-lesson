import React, { useState } from "react";
import LessonDataService from "../services/LessonService";

const AddLesson = () => {
  const initialLessonState = {
    id: null,
    title: "",
    description: "",
    published: false,
    url: ""
  };
  const [lesson, setLesson] = useState(initialLessonState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLesson({ ...lesson, [name]: value });
  };

  const saveLesson = () => {
    var data = {
      title: lesson.title,
      description: lesson.description,
      url: lesson.url
    };

    LessonDataService.create(data)
      .then(response => {
        setLesson({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          url: response.data.url
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newLesson = () => {
    setLesson(initialLessonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newLesson}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={lesson.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={lesson.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              required
              value={lesson.url}
              onChange={handleInputChange}
              name="url"
            />
          </div>

          <button onClick={saveLesson} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLesson;