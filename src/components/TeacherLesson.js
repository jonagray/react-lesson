import React, { useState, useEffect, Fragment } from "react";
import LessonDataService from "../services/LessonService";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';

const TeacherLesson = props => {
  const initialLessonState = {
    id: null,
    title: "",
    description: "",
    published: false,
    hideDescription: false,
    hideQuestions: false,
    url: "",
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
      published: status,
      // hideDescription: status
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

  const updateHideDescription = status => {
    var data = {
      _id: currentLesson._id,
      title: currentLesson.title,
      description: currentLesson.description,
      published: status,
      hideDescription: status
    };

    LessonDataService.update(currentLesson._id, data)
      .then(response => {
        setCurrentLesson({ ...currentLesson, hideDescription: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateHideQuestions = status => {
    var data = {
      _id: currentLesson._id,
      title: currentLesson.title,
      description: currentLesson.description,
      published: status,
      hideDescription: status,
      hideQuestions: status
    };

    LessonDataService.update(currentLesson._id, data)
      .then(response => {
        setCurrentLesson({ ...currentLesson, hideQuestions: status });
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

  const myStyle = {
    paddingTop: "10px",
  };

  return (
    <div>
      {currentLesson ? (

        <div className="edit-form">
          <h4>Lesson</h4>
          <Fragment>
            <div>
              <ReactPlayer
                url={currentLesson.url}
              />
            </div>
          </Fragment>
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


            {currentLesson.hideDescription ? (
              <div>
                <br />
                <p></p>
              </div>
            ) : (
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
              )}

            {currentLesson.hideQuestions ? (<p></p>) : (
              <Fragment>
              <label>Questions</label>
              <Test onOptionSelect={selectedOptions => this.setState({ selectedOptions })}>
                <QuestionGroup questionNumber={0}>
                  <Question>What is the primary subject of this video?</Question>
                  <Option style={{
                    option: {
                      width: "100%"
                    }
                  }}>Option A</Option>
                  <Option style={{
                    option: {
                      width: "100%"
                    }
                  }}>Option B</Option>
                  <Option style={{
                    option: {
                      width: "100%"
                    }
                  }}>Option C</Option>
                  <Option style={{
                    option: {
                      width: "100%"
                    }
                  }}>Option D</Option>
                </QuestionGroup>
              </Test>
              </Fragment>
            )}


            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentLesson.published ? "Published" : "Pending"}
            </div>

            <div className="form-group">
              <label>
                <strong>Description:</strong>
              </label>
              {currentLesson.hideDescription ? "Hidden" : "Viewable"}
            </div>

            <div className="form-group">
              <label>
                <strong>Questions:</strong>
              </label>
              {currentLesson.hideQuestions ? "Hidden" : "Viewable"}
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

          {currentLesson.hideDescription ? (
            <button
              className="badge badge-warning"
              onClick={() => updateHideDescription(false)}
            >
              Show Description
            </button>
          ) : (
              <button
                className="badge badge-warning"
                onClick={() => updateHideDescription(true)}
              >
                Hide Description
              </button>
            )}

          {currentLesson.hideQuestions ? (
            <button
              className="badge badge-warning"
              onClick={() => updateHideQuestions(false)}
            >
              Show Questions
            </button>
          ) : (
              <button
                className="badge badge-warning"
                onClick={() => updateHideQuestions(true)}
              >
                Hide Questions
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

export default TeacherLesson;