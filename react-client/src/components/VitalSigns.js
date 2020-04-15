import React, { useState, useEffect } from "react";
import axios from "axios";
import {Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function VitalSigns(props) {
    const [screen, setScreen] = useState("auth");

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

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("http://localhost:3000/patients");
            setUser(result.data);
            setShowLoading(false);
        };

        readCookie();
        fetchData();
    }, []);

    const nurseId = screen;

    const [vital, setVital] = useState({
        _id: "",
        bodyTemperature: "",
        heartRate: "",
        bloodPressure: "",
        respiratoryRate: "",
        nurse: "",
        patient: "",
        created: "",
    });

    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const apiUrl = "http://localhost:3000/api/clinicalVisit/create";

    const saveVital = (e) => {
        setShowLoading(true);
        let currDateTime = new Date();
        e.preventDefault();
        const data = {
            bodyTemperature: vital.bodyTemperature,
            heartRate: vital.heartRate,
            bloodPressure: vital.bloodPressure,
            respiratoryRate: vital.respiratoryRate,
            nurse: nurseId,
            patient: vital.patient,
            created: currDateTime
        };

        axios
        .post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            if (result.data.screen === "error") {
            setShowError(true);
            console.log("error: " + showError);
            } else {
            props.history.push("/home");
            }
        })
        .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setVital({ ...vital, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid col-12 div-right">
        <div className="span12 div-style">
            <div className="bg-danger text-light title">
            {" "}
            <h2 className="h2-style">Add Vital Signs</h2>
            </div>

            {showLoading && (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            )}
            <div className="container-fluid margins">
            {showError && (
                <span>
                There is something wrong...
                </span>
            )}
            <Jumbotron className="bg-light">
                <Form onSubmit={saveVital}>
                <Form.Group>
                    <Form.Label>Body Temperature</Form.Label>
                    <Form.Control
                    type="number"
                    name="bodyTemperature"
                    id="bodyTemperature"
                    placeholder="Enter body temperature"
                    value={vital.bodyTemperature}
                    onChange={onChange}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Heart Rate</Form.Label>
                    <Form.Control
                    type="number"
                    name="heartRate"
                    id="heartRate"
                    placeholder="Enter heart rate."
                    value={vital.heartRate}
                    onChange={onChange}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control
                    type="number"
                    name="bloodPressure"
                    id="bloodPressure"
                    placeholder="Enter a blood pressure."
                    value={vital.bloodPressure}
                    onChange={onChange}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Respiratory Rate</Form.Label>
                    <Form.Control
                    type="number"
                    name="respiratoryRate"
                    id="respiratoryRate"
                    placeholder="Enter respiratory rate."
                    value={vital.respiratoryRate}
                    onChange={onChange}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Patient</Form.Label>
                    <Form.Control as="select"
                    name="patient"
                    id="patient"
                    value={vital.patient}
                    onChange={onChange}
                    required>
                    <option selected disabled value="">Please select a patient below</option>
                    {user.map((item, idx) => (
                        <option
                            key={idx}
                            value={item._id}
                        >
                        {
                            "Name: " +
                            item.lastName +
                            ", " +
                            item.firstName + 
                            " | Username: " +
                            item.username
                        }
                        </option>
                      ))}
                    </Form.Control>
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

export default withRouter(VitalSigns);