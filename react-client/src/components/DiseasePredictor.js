import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function DiseasePredictor(props) {
  const [screen, setScreen] = useState("auth");
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(-1);
  const [modelAttr, setModelAttr] = useState({
    age: 0,
    cp: 0,
    sex: 0,
    trestbps: 0,
    chol: 0,
    thalach: 0,
    fbs: 0,
    exang: 0,
  });

  useEffect(() => {
    readCookie();
  }, []);

  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };

  const apiUrl = "http://localhost:3000/api/ml/heartdisease";

  const predictDiseaseProbability = (e) => {
    setShowLoading(true);
    e.preventDefault();
    axios
      .post(apiUrl, modelAttr)
      .then((result) => {
        setShowLoading(false);
        setResult(result);
        setShowModal(true);
      })
      .catch((error) => {
        setShowLoading(false);
        setShowError(true);
      });
  };

  const onChange = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="col-6 div-style">
        <div className="bg-danger text-light title">
          <h2 className="h2-style">Predict Heart Disease</h2>
        </div>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && (
            <span>
              Something went wrong. Our developers are working to fix it!
            </span>
          )}
          <Jumbotron className="bg-light">
            <Form onSubmit={predictDiseaseProbability}>
              <Form.Group>
                <Form.Label>Pulse Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="pulseRate"
                  id="pulseRate"
                  placeholder="Enter pulse rate"
                  value={modelAttr.age}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="outline-danger col-6" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(DiseasePredictor);
