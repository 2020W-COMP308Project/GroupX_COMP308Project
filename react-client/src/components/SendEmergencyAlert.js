import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function SendEmergencyAlert(props) {

  // initial values for an alert
  const [alert, setAlert] = useState({
    message: "Emergency!!", // default message
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/alert/create";

  const saveAlert = (e) => {

    setShowLoading(true);
    e.preventDefault();
    // set a value to each field
    const data = {
      message: alert.message,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
          console.log("error: " + showError);
        } else {
          props.history.push("/api/alerts");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setAlert({ ...alert, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid  d-flex justify-content-center">
      <div className="col-6 div-style">
        <div className="bg-danger text-light title">
          {" "}
          <h2 className="h2-style">Send Emergency Alert</h2>
        </div>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && (
            <span>
              There is something wrong... Not able register with given
              information
            </span>
          )}
          <Jumbotron className="bg-light">
            <Form onSubmit={saveAlert}>
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  Message
              </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  name="message"
                  id="message"
                  className="textarea"
                  value={alert.message}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="outline-danger col-6" type="submit">
                  Send Alert
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SendEmergencyAlert);
