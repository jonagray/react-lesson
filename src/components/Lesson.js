import React, { useState, useEffect, Fragment } from "react";
import LessonDataService from "../services/LessonService";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';

const Lesson = props => {
  const initialLessonState = {
    id: null,
    title: "",
    description: "",
    published: false,
    hideDescription: false,
    hideQuestions: false,
    url: ""
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
            {currentLesson.hideDescription ? (<p></p>) : (
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

            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentLesson.published ? "Published" : "Pending"}
            </div> */}
          </form>

          {/* {currentLesson.published ? (
            // <button
            //   className="badge badge-primary mr-2"
            //   onClick={() => updatePublished(false)}
            // >
            //   UnPublish
            // </button>
          ) : (
            // <button
            //   className="badge badge-primary mr-2"
            //   onClick={() => updatePublished(true)}
            // >
            //   Publish
            // </button>
          )} */}

          {/* <button className="badge badge-danger mr-2" onClick={deleteLesson}>
            Delete
          </button> */}

          {/* <button
            type="submit"
            className="badge badge-success"
            onClick={updateLesson}
          >
            Update
          </button> */}
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